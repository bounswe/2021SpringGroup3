/* eslint-disable security/detect-non-literal-regexp */
const httpStatus = require('http-status');
const _ = require('lodash');

const { formatters, baseUtil } = require('../utils');
const { User, Community, PostType, Post, Comment, CommunityACS} = require('../models');
const ApiError = require('../utils/ApiError');
const onesignalService = require('./onesignal.service');

const populateCommunity = async (communityId) => {
  return Community.findById(communityId)
    .populate('creator')
    .populate({ path: 'members', model: 'User' })
    .populate({ path: 'moderators', model: 'User' })
    .populate({ path: 'pendingMembers', model: 'User' })
    .populate({ path: 'pendingModerators', model: 'User' });
};

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

  const acs = await CommunityACS.create({
    summary: `${token.user.username} created community ${name}`,
    type: 'Create',
    actor: token.user,
    object: community,
  });
  console.log(acs);

  return {
    message: 'Community  is created',
    community: formatters.formatPreviewCommunity(community),
  };
};

exports.getCommunityDetail = async ({ token, communityId }) => {
  const community = await populateCommunity(communityId);
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  return formatters.formatCommunityDetails(community, token.user);
};

exports.joinCommunity = async ({ token, communityId }) => {
  let community = await Community.findById(communityId).populate('moderators').lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (community.members && new Set(community.members.map((m) => m.toString())).has(token.user._id.toString())) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already a member of this community');
  }
  if (community.isPrivate) {
    if (baseUtil.checkIfObjectIdArrayIncludesId(community.pendingMembers, token.user._id.toString())) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You already requested to join this community');
    }
    await Community.findByIdAndUpdate(community._id, {
      $addToSet: {
        pendingMembers: token.user._id,
      },
    });
    const notificationIds = community.moderators
      .filter((m) => m.notificationId && m.notificationId.length)
      .map((m) => m.notificationId);
    if (notificationIds.length) {
      onesignalService.createNotification({
        message: `${token.user.username} wants to join ${community.name}`,
        data: {
          communityId,
          userId: token.user._id.toString(),
        },
        notificationIds,
      });
    }
  } else {
    community = await Community.findByIdAndUpdate(
      community._id,
      {
        $addToSet: {
          members: token.user._id,
        },
      },
      { new: true }
    );

    const acs = await CommunityACS.create({
      summary: `${token.user.username} joined community ${community.name}`,
      type: 'Join',
      actor: token.user,
      object: community,
    });
    console.log(acs);
  }
  community = await populateCommunity(communityId);
  return {
    ...formatters.formatCommunityDetails(community, token.user),
    joinStatus: community.isPrivate ? 'waiting' : 'joined',
  };
};

exports.removeUserFromCommunity = async ({ user, userId, communityId }) => {
  const community = await Community.findByIdAndUpdate(
    communityId,
    {
      $pull: {
        members: userId,
        moderators: userId,
      },
      $inc: {
        memberCount: -1,
      },
    },
    { new: true }
  );
  if (community.moderators.length === 0) {
    if (community.members.length !== 0) {
      await Community.findByIdAndUpdate(
        community._id,
        {
          $addToSet: {
            moderators: _.sample(community.members),
          },
        },
        { new: true }
      );
    } else {
      await PostType.deleteMany({ community: community._id });
      await Community.findByIdAndDelete(community._id);
    }
  }
  const user2 = await User.findById(userId).lean();
  const acs = await CommunityACS.create({
    summary: `${user.username} removed ${user2.username} from the community ${community.name}`,
    type: 'Remove',
    actor: user,
    object: community,
    target: user2,
  });
  console.log(acs);
};

exports.leaveCommunity = async ({ token, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (!baseUtil.checkIfObjectIdArrayIncludesId(community.members, token.user._id.toString())) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not a member of this community');
  }
  exports.removeUserFromCommunity({ user: token.user, userId: token.user._id, communityId: community._id });
  community = await populateCommunity(communityId);
  return {
    ...formatters.formatCommunityDetails(community, token.user),
    message: 'You left the community!',
  };
};

exports.kickFromCommunity = async ({ token, userId, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, token.user._id.toString())) {
    if (!baseUtil.checkIfObjectIdArrayIncludesId(community.members, userId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User is not a member of this community');
    }
    if (baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, userId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You can not kick another moderator from a community');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You need to be a moderator to kick someone from community');
  }
  community = await Community.findByIdAndUpdate(community._id, {
    $pull: {
      members: userId,
    },
    $inc: {
      memberCount: -1,
    },
  });
  community = await populateCommunity(communityId);
  const user2 = await User.findById(userId).lean();
  const acs = await CommunityACS.create({
    summary: `${token.user.username} removed ${user2.username} from the community ${community.name}`,
    type: 'Remove',
    actor: token.user,
    object: community,
    target: user2,
  });
  console.log(acs);
  return {
    ...formatters.formatCommunityDetails(community, token.user),
    message: 'User has been kicked from the community',
  };
};

exports.approveJoinRequest = async ({ token, userId, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, token.user._id.toString())) {
    if (baseUtil.checkIfObjectIdArrayIncludesId(community.pendingMembers, userId)) {
      if (!baseUtil.checkIfObjectIdArrayIncludesId(community.members, userId)) {
        await Community.findByIdAndUpdate(community._id, {
          $addToSet: {
            members: userId,
          },
          $pull: {
            pendingMembers: userId,
          },
          $inc: {
            memberCount: 1,
          },
        });
        const user2 = await User.findById(userId).lean();
        const acs = await CommunityACS.create({
          summary: `${token.user.username} accepted ${user2.username} 's join request to the community ${community.name}`,
          type: 'Accept',
          actor: token.user,
          object: community,
          target: user2,
        });
        console.log(acs);
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
  community = await populateCommunity(communityId);
  const user = await User.findById(userId).lean();
  if (user.notificationId) {
    onesignalService.createNotification({
      message: `Your join request for ${community.name} is accepted`,
      data: {
        communityId,
      },
      notificationIds: [user.notificationId],
    });
  }
  return {
    ...formatters.formatCommunityDetails(community, token.user),
    message: 'Join request is approved',
  };
};

exports.rejectJoinRequest = async ({ token, userId, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, token.user._id.toString())) {
    if (baseUtil.checkIfObjectIdArrayIncludesId(community.pendingMembers, userId)) {
      if (!baseUtil.checkIfObjectIdArrayIncludesId(community.members, userId)) {
        community = await Community.findByIdAndUpdate(
          community._id,
          {
            $pull: {
              pendingMembers: userId,
            },
          },
          { new: true }
        );
        const user2 = await User.findById(userId).lean();
        const acs = await CommunityACS.create({
          summary: `${token.user.username} rejected ${user2.username} 's join request to the community ${community.name}`,
          type: 'Reject',
          actor: token.user,
          object: community,
          target: user2,
        });
        console.log(acs);
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
  community = await populateCommunity(communityId);
  const user = await User.findById(userId).lean();
  if (user.notificationId) {
    onesignalService.createNotification({
      message: `Your join request for ${community.name} is rejected`,
      data: {
        communityId,
      },
      notificationIds: [user.notificationId],
    });
  }
  return {
    ...formatters.formatCommunityDetails(community, token.user),
    message: 'Join request is rejected',
  };
};

exports.updateCommunity = async ({ token, name, iconUrl, description, isPrivate, communityId }) => {
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
  community = await Community.findByIdAndUpdate(
    community._id,
    {
      name,
      iconUrl,
      description,
      isPrivate,
    },
    { new: true }
  );
  const acs = await CommunityACS.create({
    summary: `${token.user.username} updated the community ${community.name}`,
    type: 'Update',
    actor: token.user,
    object: community,
  });
  console.log(acs);
  return {
    message: 'Community  is updated',
    community: formatters.formatPreviewCommunity(community),
  };
};

exports.rejectModeratorRequest = async ({ token, userId, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, token.user._id.toString())) {
    if (baseUtil.checkIfObjectIdArrayIncludesId(community.pendingModerators, userId)) {
      if (!baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, userId)) {
        await Community.findByIdAndUpdate(community._id, {
          $pull: {
            pendingModerators: userId,
          },
        });
        const user2 = await User.findById(userId).lean();
        const acs = await CommunityACS.create({
          summary: `${token.user.username} rejected ${user2.username} 's moderator request to community ${community.name}`,
          type: 'Reject',
          actor: token.user,
          object: community,
          target: user2,
        });
        console.log(acs);
      } else {
        // to be sure
        await Community.findByIdAndUpdate(community._id, {
          $pull: {
            pendingModerators: userId,
          },
        });
        throw new ApiError(httpStatus.BAD_REQUEST, 'This user is already a moderator of this community');
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'This user has not requested to become a moderator for this community');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You need to be a moderator to reject a moderator join request');
  }
  community = await populateCommunity(communityId);
  const user = await User.findById(userId).lean();
  if (user.notificationId) {
    onesignalService.createNotification({
      message: `Your moderator join request for ${community.name} is rejected`,
      data: {
        communityId,
      },
      notificationIds: [user.notificationId],
    });
  }
  return {
    ...formatters.formatCommunityDetails(community, token.user),
    message: 'Moderator request is rejected',
  };
};

exports.joinModerators = async ({ token, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already a moderator of this community');
  }
  if (baseUtil.checkIfObjectIdArrayIncludesId(community.pendingModerators, token.user._id.toString())) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You already requested to become a moderator of this community');
  }
  community = await Community.findByIdAndUpdate(
    community._id,
    {
      $addToSet: {
        pendingModerators: token.user._id,
      },
    },
    { new: true }
  );
  const acs = await CommunityACS.create({
    summary: `${token.user.username} requested to be the moderator of the community ${community.name}`,
    type: 'Offer',
    actor: token.user,
    object: community,
  });
  console.log(acs);
  community = await populateCommunity(communityId);
  return formatters.formatCommunityDetails(community, token.user);
};

exports.approveModeratorRequest = async ({ token, userId, communityId }) => {
  let community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, token.user._id.toString())) {
    if (baseUtil.checkIfObjectIdArrayIncludesId(community.pendingModerators, userId)) {
      if (!baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, userId)) {
        await Community.findByIdAndUpdate(community._id, {
          $addToSet: {
            moderators: userId,
          },
          $pull: {
            pendingModerators: userId,
          },
        });
        const user2 = await User.findById(userId).lean();
        const acs = await CommunityACS.create({
          summary: `${token.user.username} accepted ${user2.username} 's moderator request to the community ${community.name}`,
          type: 'Offer',
          actor: token.user,
          object: community,
          target: user2,
        });
        console.log(acs);
      } else {
        // to be sure
        await Community.findByIdAndUpdate(community._id, {
          $pull: {
            pendingModerators: userId,
          },
        });
        throw new ApiError(httpStatus.BAD_REQUEST, 'This user is already a moderator of this community');
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'This user has not requested to become a moderator for this community');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You need to be a moderator to approve a moderator join request');
  }
  community = await populateCommunity(communityId);
  const user = await User.findById(userId).lean();
  if (user.notificationId) {
    onesignalService.createNotification({
      message: `Your moderator join request for ${community.name} is accepted`,
      data: {
        communityId,
      },
      notificationIds: [user.notificationId],
    });
  }
  return {
    ...formatters.formatCommunityDetails(community, token.user),
    message: 'Moderator request is approved',
  };
};

exports.deleteCommunity = async ({ token, communityId }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if (baseUtil.checkIfObjectIdArrayIncludesId(community.moderators, token.user._id.toString())) {
    const posts = await Post.find({ community: community._id });
    await Comment.deleteMany({
      _id: {
        $in: posts.map((p) => p._id),
      },
    });
    await Post.deleteMany({
      _id: {
        $in: posts.map((p) => p._id),
      },
    });
    await PostType.deleteMany({ community: community._id });
    await Community.findByIdAndDelete(community._id);
    const acs = await CommunityACS.create({
      summary: `${token.user.username} deleted the community ${community.name}`,
      type: 'Delete',
      actor: token.user,
      object: community,
    });
    console.log(acs);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You need to be a moderator to delete this community');
  }
  return {
    message: 'Community  is deleted',
  };
};

exports.searchCommunity = async ({ query }) => {
  const communities = await Community.find({
    name: { $regex: query, $options: 'i' },
  }).lean();
  return formatters.formatCommunities(communities);
};

exports.recommend = async () => {
  const communities = await Community.find().sort({ memberCount: -1, createdAt: -1 }).limit(10).lean();
  return formatters.formatCommunities(communities);
};
