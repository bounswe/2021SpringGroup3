const httpStatus = require('http-status');
const short = require('short-uuid');
const fs = require('fs-extra');
const { formatters } = require('../utils');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

exports.getProfile = async ({ token }) => {
  return formatters.formatProfile(token.user);
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
        profilePhoto: {
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
