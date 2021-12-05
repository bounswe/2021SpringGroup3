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
