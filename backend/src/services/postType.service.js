const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { formatters } = require('../utils');
const { PostType, Community } = require('../models');

exports.getPostTypes = async ({ communityId }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  const postTypes = await PostType.find({
    community: communityId,
  }).lean();
  return {
    postTypes: formatters.formatPostTypes(postTypes),
  };
};

exports.createPostType = async ({
  token,
  communityId,
  name,
  textFieldNames,
  numberFieldNames,
  dateFieldNames,
  linkFieldNames,
  locationFieldNames,
}) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  const postyType = await PostType.create({
    name,
    creator: token.user._id,
    moderators: [token.user._id],
    textFieldNames,
    numberFieldNames,
    dateFieldNames,
    linkFieldNames,
    locationFieldNames,
  });
  return {
    message: 'Post type  is created',
    postyType: formatters.formatPreviewPostType(postyType),
  };
};
