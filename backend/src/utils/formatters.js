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


exports.formatPostDetail = function (community, post) {
  return {
    id: post._id.toString(),
    userName: post.creator.username,
    userImageUrl: post.creator.userImageUrl,
    communityName: community.name,
    date: post.createdAt,
    textFieldNames: post.textFields,
    numberFieldsNames: post.numberFields,
    dateFieldNames: post.dateFields
  };
};

exports.formatPostTypeDetail = function (postType) {
  return {
    name: postType.name,
    textFieldNames: postType.textFieldNames,
    numberFieldNames: postType.numberFieldsNames,
    dateFieldNames: postType.dateFieldNames,
    linkFieldNames: postType.linkFieldNames,
    locationFieldNames: postType.locationFieldNames,
    numberFieldsNames: post.numberFields,
    dateFieldNames: post.dateFields
  };
};
