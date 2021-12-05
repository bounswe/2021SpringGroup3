const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { formatters } = require('../utils');
const { User } = require('../models');

exports.getProfile = async ({ token }) => {
  return formatters.formatProfile(token.user);
};
