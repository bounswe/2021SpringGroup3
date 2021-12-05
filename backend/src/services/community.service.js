const httpStatus = require('http-status');

const { formatters } = require('../utils');
const { Community } = require('../models');
const ApiError = require('../utils/ApiError');

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

exports.getCommunityDetail = async ({ token, communityId }) => {
  const community = await Community.findById(communityId).populate('creator').lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  return formatters.formatCommunityDetails(community, token.user);
};

exports.joinCommunity = async ({ token, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  community = await Community.findByIdAndUpdate(
    community._id,
    {
      $addToSet: {
        members: token.user._id,
      },
    },
    { new: true }
  );
  return formatters.formatCommunityDetails(community, token.user);
};
