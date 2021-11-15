const { formatters } = require('../utils');
const { Community } = require('../models');

exports.getCommunities = async ({ token, isModerator, isMember }) => {
  const query = {};
  // intended
  if (typeof isModerator === 'boolean') {
    if (isModerator) {
      query.moderators = {
        $in: [token.user._id],
      };
    } else {
      query.moderators = {
        $nin: [token.user._id],
      };
    }
  }
  if (typeof isMember === 'boolean') {
    if (isMember) {
      query.members = {
        $in: [token.user._id],
      };
    } else {
      query.members = {
        $nin: [token.user._id],
      };
    }
  }
  const communities = await Community.find(query).lean();
  return formatters.formatCommunities(communities);
};

exports.createCommunity = async ({ token, name, iconUrl }) => {
  const community = await Community.create({
    name,
    iconUrl,
    creator: token.user._id,
    moderators: [token.user._id],
    members: [token.user._id],
  });
  return {
    message: 'Community  is created',
    community: formatters.formatPreviewCommunity(community),
  };
};
