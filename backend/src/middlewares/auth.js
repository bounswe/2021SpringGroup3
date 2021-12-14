/* eslint-disable no-async-promise-executor */
const httpStatus = require('http-status');

const { UserToken, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { coreUtil, Constants } = require('../utils');
const config = require('../config/config');

const auth = () => async (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    const path = req.baseUrl + req.path;
    // no need to check token
    if (
      ['/auth/login', '/auth/register'].includes(path) ||
      (path.includes('docs') && config.env !== 'production') ||
      path.includes('images')
    )
      return next();
    if (coreUtil.isNull(req.headers.authorization)) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
    }
    const tokenWithUser = await UserToken.findOne({ tokenCode: req.headers.authorization })
      .populate({
        path: 'user',
      })
      .lean();
    if (tokenWithUser && tokenWithUser.user) {
      let shouldUpdateUserLastActiveAt = false;
      if (coreUtil.isNull(tokenWithUser.user.lastActiveAt)) {
        shouldUpdateUserLastActiveAt = true;
      } else if (Date.now() - tokenWithUser.user.lastActiveAt.getTime() > Constants.USER_ACTIVE_DURATION) {
        shouldUpdateUserLastActiveAt = true;
      }
      if (shouldUpdateUserLastActiveAt) {
        User.findByIdAndUpdate(
          tokenWithUser.user._id,
          {
            $set: {
              lastActiveAt: new Date(),
              lastActiveAtL: coreUtil.toTimezone(tokenWithUser.timezone),
            },
          },
          { fields: { _id: 1 } }
        ).exec();
      }
      req.token = tokenWithUser;
      resolve();
    } else {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
    }
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
