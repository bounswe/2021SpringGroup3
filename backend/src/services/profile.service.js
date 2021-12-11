const httpStatus = require('http-status');
const { formatters } = require('../utils');
const { User, Community, Post } = require('../models');
const ApiError = require('../utils/ApiError');

exports.getProfile = async ({ token }) => {
  return formatters.formatProfile(token.user);
};

exports.deleteProfile = async ({ token }) => {
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
        moderators: token.user._id,
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
  await Post.updateMany(
    { creator: token.user._id },
    {
      $set: {
        creator: undefined,
        isCreatorDeleted: true,
      },
    }
  );
  await User.deleteOne({ _id: token.user._id });
};

exports.getProfileSettings = async ({ token }) => {
  return formatters.formatProfileSettings(token.user);
};

exports.setProfile = async ({ token, body }) => {
  const user = await User.findByIdAndUpdate(
    token.user._id,
    {
      $set: body,
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
