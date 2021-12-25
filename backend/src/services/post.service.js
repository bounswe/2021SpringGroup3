const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { formatters, baseUtil } = require('../utils');
const { PostType, Community, Post, Comment } = require('../models');

exports.getPosts = async ({ token, communityId, sortBy }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }

  const posts = await Post.find({
    community: community._id,
  })
    .sort({ [sortBy]: -1 })
    .populate(['creator'])
    .lean();
  return formatters.formatPosts(
    posts.map((p) => ({ ...p, community })),
    token.user
  );
};

const validateField = (fieldNames, field, fieldName) => {
  const errors = [];
  const fieldNameSet = new Set(fieldNames);
  const fieldSet = new Set(field.map((f) => f.name));
  const dbMinusReq = [...fieldNameSet].filter((x) => !fieldSet.has(x));
  const reqMinusDb = [...fieldSet].filter((x) => !fieldNameSet.has(x));
  if (dbMinusReq.length) {
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
  return {
    message: 'Post is created',
    post: {
      id: post._id.toString(),
    },
    community: formatters.formatPreviewCommunity(community),
  };
};

exports.getPostDetail = async ({ token, communityId, postId }) => {
  const post = await Post.findById(postId).populate(['creator', 'community']).lean();
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
  };
};

exports.likePost = async ({ token, postId }) => {
  let post = await Post.findById(postId).populate(['creator', 'community']).lean();
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
  );
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
    await Comment.create({
      text,
      post: post._id,
      user: token.user._id,
    });
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
    .populate(['creator', 'community'])
    .lean();
  return formatters.formatPosts(posts, token.user);
};

exports.search = async ({ token, communityId, tag, postTypeId, sortBy }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  let posts = [];
  if (tag) {
    posts = await Post.find({
      community: community._id,
      tags: {
        $in: [new RegExp(tag, 'i')],
      },
    })
      .sort({ [sortBy]: -1 })
      .populate(['creator'])
      .lean();
  } else {
    const postType = await PostType.findById(postTypeId).lean();
    if (!postType) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post Type does not exist');
    }
    posts = await Post.find({
      community: community._id,
      postType: postType._id,
    })
      .sort({ [sortBy]: -1 })
      .populate(['creator'])
      .lean();
  }
  console.log(posts);
  return formatters.formatPosts(
    posts.map((p) => ({ ...p, community })),
    token.user
  );
};
