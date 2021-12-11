/* eslint-disable security/detect-non-literal-regexp */
const httpStatus = require('http-status');

const { formatters, baseUtil } = require('../utils');
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

exports.createCommunity = async ({ token, name, iconUrl, description, isPrivate }) => {
  if ((await Community.countDocuments({ name: new RegExp(`^${name}$`, 'i') })) > 0) {
    throw new ApiError(httpStatus.CONFLICT, 'Community name should be unique. This is case insensitive');
  }
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
    .populate({ path: 'pendingMembers', model: 'User', select: ['_id', 'username', 'profilePhotoUrl'] })
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
  if (community.members && new Set(community.members.map((m) => m.toString())).has(token.user._id.toString())) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already a member of this community');
  }
  if (!community.isPrivate) {
    if (
      community.pendingMembers &&
      new Set(community.pendingMembers.map((m) => m.toString())).has(token.user._id.toString())
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You already requested to join this community');
    }
    community = await Community.findByIdAndUpdate(
      community._id,
      {
        $addToSet: {
          pendingMembers: token.user._id,
        },
      },
      { new: true }
    );
    return formatters.formatCommunityDetails(community, token.user);
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
  return {
    ...formatters.formatCommunityDetails(community, token.user),
    joinStatus: community.isPrivate ? 'waiting' : 'joined',
  };
};

exports.leaveCommunity = async ({ userId, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  community = await Community.findByIdAndUpdate(
    community._id,
    {
      $pull: {
        members: userId,
        moderators: userId,
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

exports.kickFromCommunity = async ({ token, userId, communityId }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (community.moderators && new Set(community.moderators.map((m) => m.toString())).has(token.user._id)) {
    if (!baseUtil.checkIfObjectIdArrayIncludesId(community.members, userId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User is not a member of this community');
    }
    if (!baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, userId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You can not kick another moderator from a community');
    }
    await exports.leaveCommunity({ userId, communityId });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You need to be a moderator to kick someone from community');
  }
  return {
    message: 'User has been kicked from the community',
  };
};

exports.approveJoinRequest = async ({ token, userId, communityId }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (community.moderators && new Set(community.moderators.map((m) => m.toString())).has(token.user._id)) {
    if (baseUtil.checkIfObjectIdArrayIncludesId(community.pendingMembers, userId)) {
      if (!baseUtil.checkIfObjectIdArrayIncludesId(community.members, userId)) {
        await Community.findByIdAndUpdate(community._id, {
          $addToSet: {
            members: userId,
          },
          $pull: {
            pendingMembers: userId,
          },
        });
      } else {
        // to be sure
        await Community.findByIdAndUpdate(community._id, {
          $pull: {
            pendingMembers: userId,
          },
        });
        throw new ApiError(httpStatus.BAD_REQUEST, 'This user is already a member of this community');
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'This user has not requested to join this community');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You need to be a moderator to approve a join request');
  }
  return {
    message: 'Join request is approved',
  };
};

exports.rejectJoinRequest = async ({ token, userId, communityId }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (community.moderators && new Set(community.moderators.map((m) => m.toString())).has(token.user._id)) {
    if (baseUtil.checkIfObjectIdArrayIncludesId(community.pendingMembers, userId)) {
      if (!baseUtil.checkIfObjectIdArrayIncludesId(community.members, userId)) {
        await Community.findByIdAndUpdate(community._id, {
          $pull: {
            pendingMembers: userId,
          },
        });
      } else {
        // to be sure
        await Community.findByIdAndUpdate(community._id, {
          $pull: {
            pendingMembers: userId,
          },
        });
        throw new ApiError(httpStatus.BAD_REQUEST, 'This user is already a member of this community');
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'This user has not requested to join this community');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You need to be a moderator to reject a join request');
  }
  return {
    message: 'Join request is rejected',
  };
};

exports.updateCommunity = async ({ name, iconUrl, description, isPrivate, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (
    (await Community.countDocuments({
      name: new RegExp(`^${name}$`, 'i'),
      _id: {
        $nin: [communityId],
      },
    })) > 0
  ) {
    throw new ApiError(httpStatus.CONFLICT, 'Community name should be unique. This is case insensitive');
  }
  community = await Community.findByIdAndUpdate(community._id, {
    name,
    iconUrl,
    description,
    isPrivate,
  });
  return {
    message: 'Community  is updated',
    community: formatters.formatPreviewCommunity(community),
  };
};
