const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

exports.login = catchAsync(async (req, res) => {
  const result = await authService.login({
    email: req.body.email,
    password: req.body.password,
    uniqueId: req.body.uniqueId,
  });
  res.send(result);
});

exports.logout = catchAsync(async (req, res) => {
  const result = await authService.logout({
    token: req.token,
    uniqueId: req.body.uniqueId,
  });
  res.send(result);
});

exports.register = catchAsync(async (req, res) => {
  const result = await authService.register({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });
  res.status(httpStatus.CREATED).send(result);
});
