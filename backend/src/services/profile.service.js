const { formatters } = require('../utils');
const { User } = require('../models');

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
