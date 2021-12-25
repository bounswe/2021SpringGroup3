const moment = require('moment');
const { baseUtil } = require('../utils');

const DEFAULT_PROFILE_PHOTO_URL = 'https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png';

const formatProfilePhotoUrl = (user, isFollowing = false) => {
  let profilePhotoUrl = DEFAULT_PROFILE_PHOTO_URL;
  if (user.profilePhotoUrl && (user.profilePhotoUrl.isPublic || isFollowing) && user.profilePhotoUrl.length > 0) {
    profilePhotoUrl = user.profilePhotoUrl.value;
  }
  return profilePhotoUrl;
};

const formatCreator = function (creator, isFollowing = false) {
  if (creator) {
    return {
      id: creator._id.toString(),
      username: creator.username,
      profilePhotoUrl: formatProfilePhotoUrl(creator, isFollowing),
      isPrivate: creator.isPrivate || false,
    };
  }
  return {
    isDeleted: true,
  };
};

const formatUserPreview = (user, isFollowing = false) => {
  return {
    id: user._id.toString(),
    username: user.username,
    profilePhotoUrl: formatProfilePhotoUrl(user, isFollowing),
    isPrivate: user.isPrivate || false,
    followerCount: user.followerCount || 0,
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
    isPrivate: user.isPrivate || false,
  };
};

exports.formatUsers = function (users = [], user) {
  return users.map((u) => formatUserPreview(u, baseUtil.checkIfObjectIdArrayIncludesId(u.followers, user._id.toString())));
};

exports.formatPreviewCommunity = function (community) {
  return {
    id: community._id.toString(),
    name: community.name,
    iconUrl: community.iconUrl,
    description: community.description,
    isPrivate: community.isPrivate,
    memberCount: community.memberCount || 0,
  };
};

exports.formatCommunityDetails = function (community, user) {
  const com = {
    ...exports.formatPreviewCommunity(community),
    user: formatCreator(
      community.creator,
      baseUtil.checkIfObjectIdArrayIncludesId(community.creator.followers, user._id.toString())
    ),
    members: (community.members || []).map(formatUserPreview),
    moderators: (community.moderators || []).map(formatUserPreview),
    isModerator: baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, user._id.toString()),
    isMember: baseUtil.checkIfObjectIdArrayIncludesId(community.members, user._id.toString()),
    isPendingMember: baseUtil.checkIfObjectIdArrayIncludesId(community.pendingMembers, user._id.toString()),
    isPendingModerator: baseUtil.checkIfObjectIdArrayIncludesId(community.pendingModerators, user._id.toString()),
    memberCount: community.memberCount || (community.members || []).length,
  };
  const modSet = new Set(com.moderators.map((m) => m.id));
  com.members = com.members.map((m) => ({
    ...m,
    isMod: modSet.has(m.id),
  }));
  com.members.sort((x, y) => (x.isMod == y.isMod ? 0 : x.isMod ? -1 : 1));
  if (com.isModerator) {
    com.pendingMembers = (community.pendingMembers || []).map(formatUserPreview);
    com.pendingModerators = (community.pendingModerators || []).map(formatUserPreview);
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
    user: formatCreator(post.creator, baseUtil.checkIfObjectIdArrayIncludesId(post.creator.followers, user._id.toString())),
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
    isLiked: baseUtil.checkIfObjectIdArrayIncludesId(post.likers, user._id.toString()),
    likeCount: post.likers.length,
    tags: post.tags,
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
    isPrivate: user.isPrivate || false,
    followerCount: user.followerCount,
  };
};

const getValueFromProfileField = (field, isFollowing) => {
  if (field && (field.isPublic || isFollowing)) return field.value;
  return '';
};

exports.formatOtherProfile = function (profile, user) {
  const isFollowing = baseUtil.checkIfObjectIdArrayIncludesId(profile.followers, user._id.toString());
  return {
    username: profile.username,
    profilePhotoUrl: getValueFromProfileField(profile.profilePhotoUrl, isFollowing),
    bio: getValueFromProfileField(profile.bio, isFollowing),
    birthday: getValueFromProfileField(profile.birthday, isFollowing),
    location: getValueFromProfileField(profile.location, isFollowing),
    isPrivate: profile.isPrivate || false,
    followerCount: user.followerCount,
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
    isPrivate: user.isPrivate || false,
    followers: (user.followers || []).map((f) => exports.formatOtherProfile(f, user)),
    pendingFollowers: (user.followers || []).map((f) => exports.formatOtherProfile(f, user)),
  };
};

exports.formatComments = function (comments = [], user) {
  return comments.map((comment) => ({
    id: comment._id.toString(),
    text: comment.text,
    user: formatCreator(comment.user, baseUtil.checkIfObjectIdArrayIncludesId(comment.user.followers, user._id.toString())),
  }));
};
