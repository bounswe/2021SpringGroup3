/* eslint-disable no-async-promise-executor */
const httpStatus = require('http-status');

const { UserToken, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { roleRights, roles } = require('../config/roles');
const { coreUtil, Constants } = require('../utils');

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
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
        const userRights = roleRights.get(tokenWithUser.user.role === roles.admin ? roles.admin : roles.user);
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights) {
          return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden. You don't have access"));
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
