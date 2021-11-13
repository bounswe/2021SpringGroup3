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
