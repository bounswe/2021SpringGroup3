const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { postTypeService } = require('../services');

exports.getPostTypes = catchAsync(async (req, res) => {
  const result = await postTypeService.getPostTypes({
    communityId: req.query.communityId,
  });
  res.send(result);
});

exports.createPostType = catchAsync(async (req, res) => {
  const result = await postTypeService.createPostType({
    token: req.token,
    communityId: req.body.communityId,
    name: req.body.name,
    textFieldNames: req.body.textFieldNames,
    numberFieldNames: req.body.numberFieldNames,
    dateFieldNames: req.body.dateFieldNames,
    linkFieldNames: req.body.linkFieldNames,
    locationFieldNames: req.body.locationFieldNames,
  });
  res.status(httpStatus.CREATED).send(result);
});

exports.getPostTypeDetail = catchAsync(async (req, res) => {
  const result = await postTypeService.getPostTypeDetail({
    communityId: req.query.communityId,
    postTypeId: req.query.postTypeId,
  });
  res.send(result);
});
