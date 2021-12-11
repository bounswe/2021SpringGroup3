const moment = require('moment');
const { baseUtil } = require('../utils');

const DEFAULT_PROFILE_PHOTO_URL = 'https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png';

const formatProfilePhotoUrl = (user) => {
  let profilePhotoUrl = DEFAULT_PROFILE_PHOTO_URL;
  if (user.profilePhotoUrl && user.profilePhotoUrl.isPublic && user.profilePhotoUrl.length > 0) {
    profilePhotoUrl = user.profilePhotoUrl.value;
  }
  return profilePhotoUrl;
};

const formatCreator = function (creator) {
  if (creator) {
    return {
      id: creator._id.toString(),
      username: creator.username,
      profilePhotoUrl: formatProfilePhotoUrl(creator),
    };
  }
  return {
    isDeleted: true,
  };
};

const formatUserPreview = (user) => {
  return {
    id: user._id.toString(),
    username: user.username,
    profilePhotoUrl: formatProfilePhotoUrl(user),
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
    profilePhotoUrl: formatProfilePhotoUrl(user),
  };
};

exports.formatPreviewCommunity = function (community) {
  return {
    id: community._id.toString(),
    name: community.name,
    iconUrl: community.iconUrl,
    description: community.description,
    isPrivate: community.isPrivate,
  };
};

exports.formatCommunityDetails = function (community, user) {
  const com = {
    ...exports.formatPreviewCommunity(community),
    user: formatCreator(community.creator),
    members: (community.members || []).map(formatUserPreview),
    moderators: (community.moderators || []).map(formatUserPreview),
    isModerator: baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, user._id.toString()),
    isMember: baseUtil.checkIfObjectIdArrayIncludesId(community.members, user._id.toString()),
    isPendingMember: baseUtil.checkIfObjectIdArrayIncludesId(community.pendingMembers, user._id.toString()),
  };
  if (com.isModerator) {
    com.pendingMembers = (community.pendingMembers || []).map(formatUserPreview);
  }
  return com;
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
    likeCount: post.likers.length,
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

exports.formatOtherProfile = function (user) {
  return {
    username: user.username,
    profilePhotoUrl: user.profilePhotoUrl && user.profilePhotoUrl.isPublic ? user.profilePhotoUrl.value : '',
    bio: user.bio && user.bio.isPublic ? user.bio.value : '',
    birthday: user.birthday && user.birthday.isPublic ? user.birthday.value : '',
    location: user.location && user.location.isPublic ? user.location : '',
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

exports.formatComments = function (comments = []) {
  return comments.map((comment) => ({
    id: comment._id.toString(),
    text: comment.text,
    user: exports.formatCreator(comment.user),
  }));
};
