const httpStatus = require('http-status');

const { formatters } = require('../utils');
const { Community, Post } = require('../models');
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

exports.createCommunity = async ({ token, name, iconUrl, description, isPrivate }) => {
  const community = await Community.create({
    name,
    iconUrl,
    description,
    isPrivate,
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
  const community = await Community.findById(communityId)
    .populate('creator')
    .populate({ path: 'members', model: 'User', select: ['_id', 'username', 'profilePhotoUrl'] })
    .populate({ path: 'moderators', model: 'User', select: ['_id', 'username', 'profilePhotoUrl'] })
    .exec();
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

exports.leaveCommunity = async ({ token, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  community = await Community.findByIdAndUpdate(
    community._id,
    {
      $pull: {
        members: token.user._id,
        moderators: token.user._id,
      },
    },
    { new: true }
  );
  if (community.moderators.length === 0) {
    if (community.members.length !== 0) {
      community = await Community.findByIdAndUpdate(
        community._id,
        {
          $addToSet: {
            moderators: community.members[0],
          },
        },
        { new: true }
      );
    } else {
      Community.deleteOne(community._id);
    }
  }
  return {
    message: 'You left the community!',
  };
};

exports.deleteCommunity = async ({ token, communityId }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (community.moderators && new Set(community.moderators.map((m) => m.toString())).has(token.user._id.toString())) {
    await Post.deleteMany({ community: community._id });
    await Community.deleteOne({ _id: community._id });
  }
  return {};
};
