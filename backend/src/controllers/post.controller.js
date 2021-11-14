const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

exports.getPosts = catchAsync(async (req, res) => {
  const result = await postService.getPosts({
    communityId: req.query.communityId,
  });
  res.send(result);
});

exports.createPost = catchAsync(async (req, res) => {
  const result = await postService.createPost({
    token: req.token,
    communityId: req.body.communityId,
    postTypeId: req.body.postTypeId,
    textFields: req.body.textFields,
    numberFields: req.body.numberFields,
    dateFields: req.body.dateFields,
    linkFields: req.body.linkFields,
    locationFields: req.body.locationFields,
  });
  res.status(httpStatus.CREATED).send(result);
});
