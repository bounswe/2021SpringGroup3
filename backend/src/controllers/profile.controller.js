const catchAsync = require('../utils/catchAsync');
const { profileService } = require('../services');

exports.getProfile = catchAsync(async (req, res) => {
  const result = await profileService.getProfile({
    token: req.token,
  });
  res.send(result);
});

exports.getProfileSettings = catchAsync(async (req, res) => {
  const result = await profileService.getProfileSettings({
    token: req.token,
  });
  res.send(result);
});

exports.setProfile = catchAsync(async (req, res) => {
  const result = await profileService.setProfile({
    token: req.token,
    body: req.body,
  });
  res.send(result);
});
