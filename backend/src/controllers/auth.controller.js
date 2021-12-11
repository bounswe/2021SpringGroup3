const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

exports.login = catchAsync(async (req, res) => {
  const result = await authService.login({
    username: req.body.username,
    password: req.body.password,
  });
  res.send(result);
});

exports.logout = catchAsync(async (req, res) => {
  const result = await authService.logout({
    token: req.token,
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

exports.changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword({
    token: req.token,
    password: req.body.password,
  });
  res.send(result);
});
