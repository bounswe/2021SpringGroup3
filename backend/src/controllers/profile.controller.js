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
    token: req.token,
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

exports.search = catchAsync(async (req, res) => {
  const result = await profileService.search({
    token: req.token,
    query: req.query.query,
    communityId: req.query.communityId,
  });
  res.send(result);
});

exports.recommend = catchAsync(async (req, res) => {
  const result = await profileService.recommend({
    token: req.token,
  });
  res.send(result);
});

exports.followProfile = catchAsync(async (req, res) => {
  const result = await profileService.followProfile({
    token: req.token,
    userId: req.query.userId,
  });
  res.send(result);
});

exports.unfollowProfile = catchAsync(async (req, res) => {
  const result = await profileService.unfollowProfile({
    token: req.token,
    userId: req.query.userId,
  });
  res.send(result);
});

exports.rejectFollowRequest = catchAsync(async (req, res) => {
  const result = await profileService.rejectFollowRequest({
    token: req.token,
    userId: req.query.userId,
  });
  res.send(result);
});

exports.approveFollowRequest = catchAsync(async (req, res) => {
  const result = await profileService.approveFollowRequest({
    token: req.token,
    userId: req.query.userId,
  });
  res.send(result);
});
