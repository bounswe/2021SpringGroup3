/* eslint-disable no-nested-ternary */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');
const short = require('short-uuid');
const fs = require('fs-extra');
const { formatters, baseUtil } = require('../utils');
const { User, Community, Post, Comment, UserACS, CommunityACS, PostACS, CommentACS } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const communityService = require('./community.service');

exports.getProfile = async ({ token }) => {
  return formatters.formatProfile(token.user);
};

exports.deleteProfile = async ({ token }) => {
  const communities = await Community.find({
    moderators: {
      $in: [token.user._id],
    },
  });
  await Promise.all([
    communities.map((c) =>
      communityService.removeUserFromCommunity({
        user: token.user,
        userId: token.user._id,
        communityId: c._id,
      })
    ),
  ]);
  await Community.updateMany(
    {
      members: {
        $in: [token.user._id],
      },
    },
    {
      $pull: {
        members: token.user._id,
      },
      $inc: {
        memberCount: -1,
      },
    }
  );
  await Community.updateMany(
    {
      pendingMembers: {
        $in: [token.user._id],
      },
    },
    {
      $pull: {
        pendingMembers: token.user._id,
      },
    }
  );
  await Community.updateMany(
    { creator: token.user._id },
    {
      $set: {
        creator: undefined,
        isCreatorDeleted: true,
      },
    }
  );
  const posts = await Post.find({ creator: token.user._id });
  await Post.deleteMany({ creator: token.user._id });
  await Comment.deleteMany({
    $or: [
      {
        user: token.user._id,
      },
      {
        _id: {
          $in: posts.map((p) => p._id),
        },
      },
    ],
  });
  await User.updateMany(
    {
      followers: {
        $in: [token.user._id],
      },
    },
    {
      $pull: {
        followers: token.user._id,
      },
      $inc: {
        followerCount: -1,
      },
    }
  );
  await User.updateMany(
    {
      pendingFollowers: {
        $in: [token.user._id],
      },
    },
    {
      $pull: {
        pendingFollowers: token.user._id,
      },
      $inc: {
        pendingFollowerCount: -1,
      },
    }
  );
  const acs = await UserACS.create({
    summary: `${token.user.username} deleted his/her account`,
    type: 'Delete',
    actor: token.user,
    object: token.user,
  });
  console.log(acs);
  await User.deleteOne({ _id: token.user._id });
};

exports.getProfileSettings = async ({ token }) => {
  const profile = await User.findById(token.user._id).populate(['followers', 'pendingFollowers']).lean();
  return formatters.formatProfileSettings(profile);
};

exports.setProfile = async ({ token, body }) => {
  const update = {};
  if (typeof body.isPublic === 'boolean') {
    update.isPrivate = body.isPublic;
  }
  for (const key in body) {
    if (body[key].value !== null && body[key].value !== undefined) {
      update[`${key}.value`] = body[key].value;
    }
    if (typeof body[key].isPublic === 'boolean') {
      update[`${key}.isPublic`] = body[key].isPublic;
    }
  }
  delete update.profilePhoto;
  if (body.profilePhoto) {
    const path = `images/profiles/${token.user._id.toString()}/${short.generate()}.jpg`;
    await fs.outputFile(path, body.profilePhoto.value, { encoding: 'base64' });
    update.profilePhotoUrl = {
      value: `${config.serverUrl}${path}`,
      isPublic:
        typeof body.profilePhoto.isPublic === 'boolean' ? body.profilePhoto.isPublic : token.user.profilePhoto.isPublic,
    };
  }
  await User.findByIdAndUpdate(token.user._id, {
    $set: update,
  });
  const user = await User.findById(token.user._id).populate(['followers', 'pendingFollowers']).lean();
  await UserACS.create({
    summary: `${token.user.username} updated his/her profile`,
    type: 'Update',
    actor: token.user,
    object: token.user,
  });
  return formatters.formatProfileSettings(user);
};

exports.getOtherProfile = async ({ userId, token }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  return {
    ...formatters.formatOtherProfile(user, token.user),
    followStatus: baseUtil.checkIfObjectIdArrayIncludesId(user.followers, token.user._id.toString())
      ? 'followed'
      : baseUtil.checkIfObjectIdArrayIncludesId(user.pendingFollowers, token.user._id.toString())
      ? 'waiting'
      : undefined,
  };
};

exports.setNotificationId = async ({ token, notificationId }) => {
  await User.findByIdAndUpdate(token.user._id, {
    $set: {
      notificationId,
    },
  });
  return {
    message: 'Notification id is set',
  };
};

exports.search = async ({ token, query, communityId }) => {
  if (communityId) {
    const community = await Community.findById(communityId).populate({
      path: 'members',
      match: {
        username: { $regex: query, $options: 'i' },
      },
      options: { sort: { followerCount: -1 } },
    });
    return formatters.formatUsers(community.members, token.user);
  }

  const users = await User.find({
    username: { $regex: query, $options: 'i' },
  })
    .sort({ followerCount: -1 })
    .lean();
  return formatters.formatUsers(users, token.user);
};

exports.recommend = async ({ token }) => {
  const users = await User.find().sort({ followerCount: -1, createdAt: -1 }).limit(100).lean();
  return formatters.formatUsers(users, token.user);
};

exports.followProfile = async ({ token, userId }) => {
  let user = await User.findById(userId).lean();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (baseUtil.checkIfObjectIdArrayIncludesId(user.followers, token.user._id.toString())) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already following this user');
  }
  if (user.isPrivate) {
    if (baseUtil.checkIfObjectIdArrayIncludesId(user.pendingFollowers, token.user._id.toString())) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You already have a follow request for this user');
    }
    await User.findByIdAndUpdate(user._id, {
      $addToSet: {
        pendingFollowers: token.user._id,
      },
      $inc: {
        pendingFollowerCount: 1,
      },
    });
    await UserACS.create({
      summary: `${token.user.username} wants to follow ${user.username}`,
      type: 'Request',
      actor: token.user,
      object: user,
    });
  } else {
    user = await User.findByIdAndUpdate(
      user._id,
      {
        $addToSet: {
          followers: token.user._id,
        },
        $inc: {
          followerCount: 1,
        },
      },
      { new: true }
    );
    await UserACS.create({
      summary: `${token.user.username} followed ${user.username}`,
      type: 'Follow',
      actor: token.user,
      object: user,
    });
  }
  return {
    ...formatters.formatOtherProfile(user, token.user),
    followStatus: user.isPrivate ? 'waiting' : 'followed',
  };
};

exports.unfollowProfile = async ({ token, userId }) => {
  let user = await User.findById(userId).lean();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (!baseUtil.checkIfObjectIdArrayIncludesId(user.followers, token.user._id.toString())) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not following this user');
  }
  user = await User.findByIdAndUpdate(
    user._id,
    {
      $pull: {
        followers: token.user._id,
      },
      $inc: {
        followerCount: -1,
      },
    },
    { new: true }
  );
  return formatters.formatOtherProfile(user, token.user);
};

exports.approveFollowRequest = async ({ token, userId }) => {
  if (!baseUtil.checkIfObjectIdArrayIncludesId(token.user.pendingFollowers, userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This user does not have a follow request for you');
  }
  const user = await User.findById(userId).lean();
  if (!user) {
    // to be safe
    await User.findByIdAndUpdate(token.user._id, {
      $pull: {
        pendingFollowers: user._id,
      },
      $inc: {
        pendingFollowerCount: -1,
      },
    });
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  await User.findByIdAndUpdate(token.user._id, {
    $addToSet: {
      followers: user._id,
    },
    $pull: {
      pendingFollowers: user._id,
    },
    $inc: {
      followerCount: 1,
      pendingFollowerCount: -1,
    },
  });
  return exports.getProfileSettings({ token });
};

exports.rejectFollowRequest = async ({ token, userId }) => {
  if (!baseUtil.checkIfObjectIdArrayIncludesId(token.user.pendingFollowers, userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This user does not have a follow request for you');
  }
  const user = await User.findById(userId).lean();
  if (!user) {
    // to be safe
    await User.findByIdAndUpdate(token.user._id, {
      $pull: {
        pendingFollowers: user._id,
      },
      $inc: {
        pendingFollowerCount: -1,
      },
    });
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  await User.findByIdAndUpdate(token.user._id, {
    $pull: {
      pendingFollowers: user._id,
    },
    $inc: {
      pendingFollowerCount: -1,
    },
  });
  return exports.getProfileSettings({ token });
};

exports.getNotifications = async ({ token }) => {
  let notifications = await UserACS.find({
    object: token.user._id,
  }).lean();

  notifications = notifications.concat(
    await CommunityACS.find({
      target: token.user._id,
    }).lean()
  );

  const posts = await Post.find({ creator: token.user._id });
  notifications = notifications.concat(
    await PostACS.find({
      object: { $in: posts },
    }).lean()
  );

  const communities = await Community.find({ moderators: { $in: [token.user._id] } });
  notifications = notifications.concat(
    await CommunityACS.find({
      object: { $in: communities },
    }).lean()
  );

  notifications = notifications.concat(
    await CommentACS.find({
      'object.post': { $in: posts },
    }).lean()
  );
  notifications = notifications.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return formatters.formatNotifications(notifications, token.user);
};
