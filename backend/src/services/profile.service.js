const httpStatus = require('http-status');
const short = require('short-uuid');
const fs = require('fs-extra');
const { formatters } = require('../utils');
const { User, Community, Post, Comment } = require('../models');
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
        userId: token.user._id,
        communityId: c._id,
      })
    ),
  ]);
  await Community.updateMany(
    {
      $or: [
        {
          members: {
            $in: [token.user._id],
          },
        },
        {
          pendingMembers: {
            $in: [token.user._id],
          },
        },
      ],
    },
    {
      $pull: {
        members: token.user._id,
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
  await User.deleteOne({ _id: token.user._id });
};

exports.getProfileSettings = async ({ token }) => {
  return formatters.formatProfileSettings(token.user);
};

exports.setProfile = async ({ token, body }) => {
  const path = `images/profiles/${token.user._id.toString()}/${short.generate()}.jpg`;
  await fs.outputFile(path, body.profilePhoto.value, { encoding: 'base64' });
  const user = await User.findByIdAndUpdate(
    token.user._id,
    {
      $set: {
        ...body,
        profilePhotoUrl: {
          value: `${config.serverUrl}${path}`,
          isPublic: body.profilePhoto.isPublic,
        },
      },
    },
    { new: true }
  );
  return formatters.formatProfileSettings(user);
};

exports.getOtherProfile = async ({ userId }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  return formatters.formatOtherProfile(user);
};
