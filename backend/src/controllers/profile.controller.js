const catchAsync = require('../utils/catchAsync');
const { profileService } = require('../services');

exports.getProfile = catchAsync(async (req, res) => {
  const result = await profileService.getProfile({
    token: req.token,
  });
  res.send(result);
});

exports.deleteProfile = catchAsync(async (req, res) => {
  const result = await profileService.deleteProfile({
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

exports.getOtherProfile = catchAsync(async (req, res) => {
  const result = await profileService.getOtherProfile({
    userId: req.query.userId,
  });
  res.send(result);
});

exports.setNotificationId = catchAsync(async (req, res) => {
  const result = await profileService.setNotificationId({
    token: req.token,
    notificationId: req.body.notificationId,
  });
  res.send(result);
});
