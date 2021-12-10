const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { communityService } = require('../services');

exports.getCommunities = catchAsync(async (req, res) => {
  const result = await communityService.getCommunities({
    token: req.token,
    isModerator: req.query.isModerator,
    isMember: req.query.isMember,
  });
  res.send(result);
});

exports.createCommunity = catchAsync(async (req, res) => {
  const result = await communityService.createCommunity({
    token: req.token,
    name: req.body.name,
    iconUrl: req.body.iconUrl,
    description: req.body.description,
    isPrivate: req.body.isPrivate,
  });
  res.status(httpStatus.CREATED).send(result);
});

exports.getCommunityDetail = catchAsync(async (req, res) => {
  const result = await communityService.getCommunityDetail({
    token: req.token,
    communityId: req.query.communityId,
  });
  res.send(result);
});

exports.joinCommunity = catchAsync(async (req, res) => {
  const result = await communityService.joinCommunity({
    token: req.token,
    communityId: req.query.communityId,
  });
  res.send(result);
});

exports.leaveCommunity = catchAsync(async (req, res) => {
  const result = await communityService.leaveCommunity({
    userId: req.token.user._id,
    communityId: req.query.communityId,
  });
  res.send(result);
});

exports.kickFromCommunity = catchAsync(async (req, res) => {
  const result = await communityService.kickFromCommunity({
    token: req.token,
    communityId: req.query.communityId,
    userId: req.query.userId,
  });
  res.send(result);
});
