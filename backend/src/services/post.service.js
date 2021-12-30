const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { formatters, baseUtil } = require('../utils');
const { PostType, Community, Post, Comment, PostACS, CommentACS } = require('../models');

exports.getPosts = async ({ token, communityId, sortBy }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }

  const posts = await Post.find({
    community: community._id,
  })
    .sort({ [sortBy]: -1 })
    .populate(['creator', 'postType'])
    .lean();
  return formatters.formatPosts(
    posts.map((p) => ({ ...p, community })),
    token.user
  );
};

const validateField = (fieldNames, field, fieldName, onlyShouldNotExists = false) => {
  const errors = [];
  const fieldNameSet = new Set(fieldNames);
  const fieldSet = new Set(field.map((f) => f.name));
  const dbMinusReq = [...fieldNameSet].filter((x) => !fieldSet.has(x));
  const reqMinusDb = [...fieldSet].filter((x) => !fieldNameSet.has(x));
  if (dbMinusReq.length && !onlyShouldNotExists) {
    errors.push(`${dbMinusReq.join(', ')} should exist in ${fieldName}`);
  }
  if (reqMinusDb.length) {
    errors.push(`${reqMinusDb.join(', ')} should not exist in ${fieldName}`);
  }
  return errors;
};

exports.createPost = async ({
  token,
  communityId,
  postTypeId,
  textFields = [],
  numberFields = [],
  dateFields = [],
  linkFields = [],
  locationFields = [],
  tags = [],
}) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (!community.members || !community.members.map((m) => m.toString()).includes(token.user._id.toString())) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not a member of this community. You need to be a member to create a post'
    );
  }
  const postType = await PostType.findById(postTypeId).lean();
  if (!postType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post type does not exist');
  }
  if (postType.community.toString() !== communityId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post type does not exist in this community');
  }
  let errors = validateField(postType.textFieldNames, textFields, 'textFields');
  errors = errors.concat(validateField(postType.numberFieldNames, numberFields, 'numberFields'));
  errors = errors.concat(validateField(postType.dateFieldNames, dateFields, 'dateFields'));
  errors = errors.concat(validateField(postType.linkFieldNames, linkFields, 'linkFields'));
  errors = errors.concat(validateField(postType.locationFieldNames, locationFields, 'locationFields'));
  if (errors.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, errors.join('. '));
  }
  const post = await Post.create({
    community: community._id,
    postType: postType._id,
    creator: token.user._id,
    textFields,
    numberFields,
    dateFields,
    linkFields,
    locationFields,
    tags,
  });
  const acs = await PostACS.create({
    summary: `${token.user.username} created a post`,
    type: 'Create',
    actor: token.user,
    object: post,
  });
  console.log(acs);
  return {
    message: 'Post is created',
    post: {
      id: post._id.toString(),
    },
    community: formatters.formatPreviewCommunity(community),
  };
};

exports.getPostDetail = async ({ token, communityId, postId }) => {
  const post = await Post.findById(postId).populate(['creator', 'community', 'postType']).lean();
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post does not exist');
  }
  if (post.community._id.toString() !== communityId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community ID does not match');
  }
  const comments = await Comment.find({ post: post._id })
    .sort({
      createdAt: 1,
    })
    .populate({
      path: 'user',
      model: 'User',
    });
  return {
    ...formatters.formatPostDetail(post, token.user),
    comments: formatters.formatComments(comments, token.user),
    commentCount: comments.length,
  };
};

exports.likePost = async ({ token, postId }) => {
  let post = await Post.findById(postId).populate(['creator', 'community', 'postType']).lean();
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post does not exist');
  }
  if (!baseUtil.checkIfObjectIdArrayIncludesId(post.community.members, token.user._id.toString())) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You need to be a member of this community to like the post');
  }
  post = await Post.findByIdAndUpdate(
    post._id,
    {
      $addToSet: {
        likers: token.user._id,
      },
    },
    { new: true }
  )
    .populate(['creator', 'community', 'postType'])
    .lean();
  const acs = await PostACS.create({
    summary: `${token.user.username} liked a post`,
    type: 'Like',
    actor: token.user,
    object: post,
  });
  console.log(acs);
  return formatters.formatPostDetail(post, token.user);
};

exports.deletePost = async ({ token, postId }) => {
  const post = await Post.findById(postId).populate(['community']).lean();
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post does not exist');
  }
  if (
    (post.community.moderators &&
      new Set(post.community.moderators.map((m) => m.toString())).has(token.user._id.toString())) ||
    (post.creator && post.creator.toString() === token.user._id)
  ) {
    await Post.deleteOne({ _id: post._id });
    await Comment.deleteMany({ post: post._id });
    const acs = await PostACS.create({
      summary: `${token.user.username} deleted a post`,
      type: 'Delete',
      actor: token.user,
      object: post,
    });
    console.log(acs);
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You need to be the creator of the post or moderator of the community it belongs to delete it'
    );
  }
  return {
    message: 'Post has been deleted',
  };
};

exports.createComment = async ({ token, postId, text }) => {
  const post = await Post.findById(postId).populate(['community']).lean();
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post does not exist');
  }
  if (
    (post.community.members && new Set(post.community.members.map((m) => m.toString())).has(token.user._id.toString())) ||
    (post.creator && post.creator.toString() === token.user._id)
  ) {
    const comment = await Comment.create({
      text,
      post: post._id,
      user: token.user._id,
    });
    const acs = await CommentACS.create({
      summary: `${token.user.username} created a comment`,
      type: 'Create',
      actor: token.user,
      object: comment,
    });
    console.log(acs);
    const comments = await Comment.find({ post: post._id })
      .sort({
        createdAt: 1,
      })
      .populate({
        path: 'user',
        model: 'User',
      });
    return {
      comments: formatters.formatComments(comments, token.user),
    };
  }
  throw new ApiError(
    httpStatus.BAD_REQUEST,
    'You need to be the creator of the post or member of the community it belongs to post a comment for it'
  );
};

exports.getHomepage = async ({ token }) => {
  const communities = await Community.find({
    members: {
      $in: [token.user._id],
    },
  });
  const posts = await Post.find({
    community: {
      $in: communities.map((c) => c._id),
    },
  })
    .sort({ createdAt: -1 })
    .populate(['creator', 'community', 'postType'])
    .lean();
  return formatters.formatPosts(posts, token.user);
};

exports.search = async ({ token, communityId, tag, postTypeId, sortBy }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (community.isPrivate && !baseUtil.checkIfObjectIdArrayIncludesId(community.members, token.user._id.toString())) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You need to be a member of this community to search it's posts");
  }
  let posts = [];
  if (!postTypeId) {
    posts = await Post.find({
      $and: [{ community: community._id }, { 'tags.name': { $regex: tag, $options: 'i' } }],
    })
      .sort({ [sortBy]: -1 })
      .populate(['community', 'creator', 'postType'])
      .lean();
  } else {
    const postType = await PostType.findById(postTypeId).lean();
    if (!postType) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post Type does not exist');
    }
    if (postType.community.toString() !== communityId) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post type does not exist in this community');
    }
    posts = await Post.find({
      community: community._id,
      postType: postType._id,
    })
      .sort({ [sortBy]: -1 })
      .populate(['community', 'creator', 'postType'])
      .lean();
  }
  return formatters.formatPosts(
    posts.map((p) => ({ ...p, community })),
    token.user
  );
};

function toRad(Value) {
  return (Value * Math.PI) / 180;
}

// This function takes in latitude and longitude of two locations
// and returns the distance between them as the crow flies (in meters)
function calcCrow(coords1, coords2) {
  // var R = 6.371; // km
  const R = 6371000;
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

exports.advancedSearch = async ({
  token,
  communityId,
  postTypeId,
  sortBy,
  textFields,
  numberFields,
  dateFields,
  linkFields,
  locationFields,
  tag,
}) => {
  const postType = await PostType.findById(postTypeId).populate('community').lean();
  if (!postType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post Type does not exist');
  }
  if (postType.community._id.toString() !== communityId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community ID does not match');
  }
  if (
    postType.community.isPrivate &&
    !baseUtil.checkIfObjectIdArrayIncludesId(postType.community.members, token.user._id.toString())
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You need to be a member of this community to search it's posts");
  }
  let errors = validateField(postType.textFieldNames, textFields || [], 'textFields', true);
  errors = errors.concat(validateField(postType.numberFieldNames, numberFields || [], 'numberFields', true));
  errors = errors.concat(validateField(postType.dateFieldNames, dateFields || [], 'dateFields', true));
  errors = errors.concat(validateField(postType.linkFieldNames, linkFields || [], 'linkFields', true));
  errors = errors.concat(validateField(postType.locationFieldNames, locationFields || [], 'locationFields', true));
  if (errors.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, errors.join('. '));
  }
  let posts = await Post.find({
    postType: postType._id,
  })
    .sort({ [sortBy]: -1 })
    .populate(['community', 'creator', 'postType'])
    .lean();

  if (textFields && textFields.length) {
    posts = posts.filter((p) => {
      let isValid = true;
      textFields.forEach((t) => {
        const textField = p.textFields.find((te) => te.name === t.name);
        if (!textField.value.includes(t.value)) {
          isValid = false;
        }
      });
      return isValid;
    });
  }

  if (numberFields && numberFields.length) {
    posts = posts.filter((p) => {
      let isValid = true;
      numberFields.forEach((t) => {
        const numberField = p.numberFields.find((te) => te.name === t.name);
        if (t.value.start && numberField.value < t.value.start) {
          isValid = false;
        }
        if (t.value.end && numberField.value > t.value.end) {
          isValid = false;
        }
      });
      return isValid;
    });
  }

  if (linkFields && linkFields.length) {
    posts = posts.filter((p) => {
      let isValid = true;
      linkFields.forEach((t) => {
        const linkField = p.linkFields.find((te) => te.name === t.name);
        if (!linkField.value.includes(t.value)) {
          isValid = false;
        }
      });
      return isValid;
    });
  }

  if (dateFields && dateFields.length) {
    posts = posts.filter((p) => {
      let isValid = true;
      dateFields.forEach((t) => {
        const dateField = p.dateFields.find((te) => te.name === t.name);
        if (t.value.start && new Date(dateField.value) < new Date(t.value.start)) {
          isValid = false;
        }
        if (t.value.end && new Date(dateField.value) > new Date(t.value.end)) {
          isValid = false;
        }
      });
      return isValid;
    });
  }

  if (locationFields && locationFields.length) {
    posts = posts.filter((p) => {
      let isValid = true;
      locationFields.forEach((t) => {
        const locationField = p.locationFields.find((te) => te.name === t.name);
        const locationFieldCoords = {
          lat: locationField.value.geo.latitude,
          lng: locationField.value.geo.longitude,
        };
        const reqCoords = {
          lat: t.value.geo.latitude,
          lng: t.value.geo.longitude,
        };
        if (calcCrow(locationFieldCoords, reqCoords) > t.value.geo.range) {
          isValid = false;
        }
      });
      return isValid;
    });
  }

  if (tag && tag.length) {
    posts = posts.filter((p) => {
      return p.tags.filter((t) => t.includes(tag)).length > 0;
    });
  }

  return formatters.formatPosts(
    posts.map((p) => ({ ...p, community: postType.community })),
    token.user
  );
};
