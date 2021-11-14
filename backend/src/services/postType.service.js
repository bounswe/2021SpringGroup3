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
    community: community._id,
  }).lean();
  return formatters.formatPostTypes(postTypes);
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
  const allFields = [textFieldNames, numberFieldNames, dateFieldNames, linkFieldNames, locationFieldNames].filter(
    (f) => f.length > 0
  );
  if (!allFields.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have to enter at least one fieldName');
  }
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  const postyType = await PostType.create({
    name,
    community: community._id,
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

exports.getPostTypeDetail = async ({ communityId, postTypeId }) => {
  const postType = await PostType.findById(postTypeId).lean();

  if (!postType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post Type does not exist');
  }
  return formatters.formatPostTypeDetail(postType);
};