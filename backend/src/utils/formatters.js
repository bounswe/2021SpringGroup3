const moment = require('moment');

const formatCreator = function (creator) {
  return {
    id: creator._id.toString(),
    username: creator.username,
    imageUrl: creator.imageUrl,
  };
};

exports.formatUserToken = function ({ tokenCode, language, user }) {
  return { token: tokenCode, user: exports.formatUser(user, language) };
};

exports.formatUser = function (user) {
  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
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

exports.formatCommunityDetails = function (community, user) {
  return {
    ...exports.formatPreviewCommunity(community),
    user: formatCreator(community.creator),
    isMember: community.members && community.members.includes(user._id),
    isModerator: community.moderators && community.moderators.includes(user._id),
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
    user: formatCreator(post.creator),
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
    id: postType._id.toString(),
    name: postType.name,
    textFieldNames: postType.textFieldNames,
    numberFieldNames: postType.numberFieldNames,
    dateFieldNames: postType.dateFieldNames,
    linkFieldNames: postType.linkFieldNames,
    locationFieldNames: postType.locationFieldNames,
  };
};

exports.formatProfile = function (user) {
  return {
    username: user.username,
    profilePhotoUrl: user.profilePhotoUrl?.value || '',
    bio: user.bio?.value || '',
    birthday: user.birthday?.value || '',
    location: user.location || '',
  };
};

const defaultProfileField = {
  value: '',
  isPublic: true,
};

exports.formatProfileSettings = function (user) {
  return {
    username: user.username,
    profilePhotoUrl: user.profilePhotoUrl || defaultProfileField,
    bio: user.bio || defaultProfileField,
    birthday: user.birthday || defaultProfileField,
    location: user.location || defaultProfileField,
  };
};
