const moment = require('moment');

exports.formatUserToken = function ({ tokenCode, language, user }) {
  return { token: tokenCode, user: exports.formatUser(user, language) };
};

exports.formatUser = function (user) {
  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
    role: user.role,
    isActivated: user.isActivated,
  };
};

exports.formatPreviewCommunity = function (community) {
  return {
    id: community._id.toString(),
    name: community.name,
    iconUrl: community.iconUrl,
  };
};

exports.formatCommunities = function (communities = []) {
  return communities.map(exports.formatPreviewCommunity);
};

exports.formatPreviewPostType = function (postType) {
  return {
    id: postType._id.toString(),
    name: postType.name,
  };
};

exports.formatPostTypes = function (postTypes = []) {
  return postTypes.map(exports.formatPreviewPostType);
};

exports.formatPostDetail = function (post, user) {
  return {
    id: post._id.toString(),
    user: {
      id: post.creator._id.toString(),
      username: post.creator.username,
      imageUrl: post.creator.imageUrl,
    },
    community: {
      id: post.community._id.toString(),
      name: post.community.name,
    },
    date: moment(post.createdAt).format('MM/DD/YYYY HH:mm'),
    textFieldNames: post.textFields,
    numberFieldNames: post.numberFields,
    dateFieldNames: post.dateFields,
    linkFieldNames: post.linkFields,
    locationFieldNames: post.locationFields,
    isLiked: post.likers.includes(user._id),
  };
};

exports.formatPosts = function (posts = [], user) {
  return posts.map((post) => exports.formatPostDetail(post, user));
};

exports.formatPostTypeDetail = function (postType) {
  return {
    name: postType.name,
    textFieldNames: postType.textFieldNames,
    numberFieldNames: postType.numberFieldsNames,
    dateFieldNames: postType.dateFieldNames,
    linkFieldNames: postType.linkFieldNames,
    locationFieldNames: postType.locationFieldNames,
  };
};
