require('http-status');
const {
  UserACS,
  CommunityACS,
  PostACS,
  PostTypeACS,
  CommentACS,
  User,
  Community,
  Comment,
  Post,
  PostType,
} = require('../models');
const { formatters } = require('../utils');

exports.getACS = async ({ acsType }) => {
  let acs;
  if (acsType === 'User') {
    acs = await UserACS.find().sort({ createdAt: -1 }).limit(10).lean();
  } else if (acsType === 'Post') {
    acs = await PostACS.find().sort({ createdAt: -1 }).limit(10).lean();
  } else if (acsType === 'Community') {
    acs = await CommunityACS.find().sort({ createdAt: -1 }).limit(10).lean();
  } else if (acsType === 'Comment') {
    acs = await CommentACS.find().sort({ createdAt: -1 }).limit(10).lean();
  } else if (acsType === 'PostType') {
    acs = await PostTypeACS.find().sort({ createdAt: -1 }).limit(10).lean();
  }
  return acs;
};

exports.getACSDetail = async ({ objectId, acsType }) => {
  let acs;
  let object;
  let target;
  if (acsType === 'User') {
    acs = await UserACS.findById(objectId).lean();
    object = await User.findById(acs.object).lean();
  } else if (acsType === 'Post') {
    acs = await PostACS.findById(objectId).lean();
    object = await Post.findById(acs.object).lean();
  } else if (acsType === 'Community') {
    acs = await CommunityACS.findById(objectId).lean();
    object = await Community.findById(acs.object).lean();
    target = await User.findById(acs.target).lean();
  } else if (acsType === 'Comment') {
    acs = await CommentACS.findById(objectId).lean();
    object = await Comment.findById(acs.object).lean();
  } else if (acsType === 'PostType') {
    acs = await PostTypeACS.findById(objectId).lean();
    object = await PostType.findById(acs.object).lean();
  }
  const actor = await User.findById(acs.actor);

  return formatters.formatACS(acs, actor, object, target);
};