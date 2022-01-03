const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { coreUtil, baseUtil, formatters } = require('../utils');
const { UserACS, UserToken, User } = require('../models');

exports.logout = async ({ token }) => {
  await UserToken.findByIdAndDelete(token._id);
  return {
    message: 'Logout is success',
  };
};

exports.login = async ({ username, password }) => {
  const userWithEmail = await User.findOne({
    $or: [
      {
        username,
      },
      {
        email: username,
      },
    ],
  });
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
  const user = await User.create({
    email,
    password,
    username,
  });
  const acs = await UserACS.create({
    summary: `${username} created an account`,
    type: 'Create',
    actor: user,
    object: user,
  });
  console.log(acs);

  return {
    message: 'Register is success',
  };
};

exports.changePassword = async ({ token, password }) => {
  await UserToken.deleteMany({
    _id: {
      $nin: [token._id],
    },
    user: token.user._id,
  });
  const user = await User.findById(token.user._id);
  user.set({
    password,
  });
  user.save();
  const acs = await UserACS.create({
    summary: `${user.username} changed password`,
    type: 'Update',
    actor: user,
    object: user,
  });
  console.log(acs);

  return {
    message: 'Your password has changed successfully',
  };
};
