const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const postService = require('../services/post.service');

exports.getPosts = catchAsync(async (req, res) => {
  const result = await postService.getPosts({
    token: req.token,
    communityId: req.query.communityId,
    sortBy: req.query.sortBy,
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
    tags: req.body.tags,
  });
  res.status(httpStatus.CREATED).send(result);
});

exports.getPostDetail = catchAsync(async (req, res) => {
  const result = await postService.getPostDetail({
    token: req.token,
    communityId: req.query.communityId,
    postId: req.query.postId,
  });
  res.send(result);
});

exports.likePost = catchAsync(async (req, res) => {
  const result = await postService.likePost({
    token: req.token,
    communityId: req.query.communityId,
    postId: req.query.postId,
  });
  res.send(result);
});

exports.createComment = catchAsync(async (req, res) => {
  const result = await postService.createComment({
    token: req.token,
    text: req.body.text,
    postId: req.query.postId,
  });
  res.send(result);
});

exports.deletePost = catchAsync(async (req, res) => {
  const result = await postService.deletePost({
    token: req.token,
    postId: req.query.postId,
  });
  res.send(result);
});

exports.getHomepage = catchAsync(async (req, res) => {
  const result = await postService.getHomepage({
    token: req.token,
  });
  res.send(result);
});

exports.search = catchAsync(async (req, res) => {
  const result = await postService.search({
    token: req.token,
    communityId: req.query.communityId,
    tag: req.query.tag,
    postTypeId: req.query.postTypeId,
    sortBy: req.query.sortBy,
  });
  res.send(result);
});

exports.advancedSearch = catchAsync(async (req, res) => {
  const result = await postService.advancedSearch({
    token: req.token,
    communityId: req.body.communityId,
    postTypeId: req.body.postTypeId,
    textFields: req.body.textFields,
    numberFields: req.body.numberFields,
    dateFields: req.body.dateFields,
    linkFields: req.body.linkFields,
    locationFields: req.body.locationFields,
    tag: req.body.tag,
  });
  res.send(result);
});
