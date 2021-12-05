const { formatters } = require('../utils');
const { User } = require('../models');

exports.getProfile = async ({ token }) => {
  return formatters.formatProfile(token.user);
};

exports.getProfileSettings = async ({ token }) => {
  return formatters.getProfileSettings(token.user);
};

exports.setProfile = async ({ token, body }) => {
  const user = await User.findByIdAndUpdate(token.user._id, {
    $set: body,
  });
  return formatters.getProfileSettings(user);
};
