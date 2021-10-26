const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { coreUtil, baseUtil, formatters } = require('../utils');
const { UserToken, User } = require('../models');
const config = require('../config/config');

exports.logout = async ({ token }) => {
  await UserToken.findByIdAndDelete(token._id);
  return {};
};

exports.login = async ({ email, password }) => {
  const userWithEmail = await User.findOne({ email });
  if (coreUtil.isNull(userWithEmail)) {
    throw new ApiError(httpStatus.BAD_REQUEST, config.env === 'production' ? 'Password does not match' : 'User not found');
  } else if (!(await userWithEmail.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
  }
  const newUserToken = (
    await UserToken.create({
      tokenCode: Date.now() + baseUtil.sha1(userWithEmail._id.toString() + Date.now()),
      user: userWithEmail._id,
    })
  ).toObject();

  return formatters.formatUserToken({
    ...newUserToken,
    user: userWithEmail,
  });
};

exports.register = async ({ email, password, name }) => {
  const userWithEmail = await User.findOne({ email }).lean();
  if (!coreUtil.isNull(userWithEmail)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
  }
  await User.create({
    email,
    password,
    name,
  });
  return {};
};
