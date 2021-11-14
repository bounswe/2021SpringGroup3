const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { coreUtil, baseUtil, formatters } = require('../utils');
const { UserToken, User } = require('../models');

exports.logout = async ({ token }) => {
  await UserToken.findByIdAndDelete(token._id);
  return {
    message: 'Logout is success',
  };
};

exports.login = async ({ email, password }) => {
  const userWithEmail = await User.findOne({ email });
  if (coreUtil.isNull(userWithEmail) || !(await userWithEmail.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong email or password');
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

exports.register = async ({ email, password, username }) => {
  const userWithEmail = await User.findOne({ $or: [{ email }, { username }] }).lean();
  if (!coreUtil.isNull(userWithEmail)) {
    if (userWithEmail.email === email) {
      throw new ApiError(httpStatus.CONFLICT, 'Email is already taken');
    } else if (userWithEmail.username === username) {
      throw new ApiError(httpStatus.CONFLICT, 'Username is already taken');
    }
  }
  await User.create({
    email,
    password,
    username,
  });
  return {
    message: 'Register is success',
  };
};
