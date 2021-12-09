const httpStatus = require('http-status');
const { formatters } = require('../utils');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

exports.getProfile = async ({ token }) => {
  return formatters.formatProfile(token.user);
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
