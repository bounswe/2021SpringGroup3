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
    (f) => f && f.length > 0
  );
  if (!allFields.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have to enter at least one fieldName');
  }
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  if ((await PostType.countDocuments({ name: new RegExp(`^${name}$`), community: communityId })) > 0) {
    throw new ApiError(httpStatus.CONFLICT, 'Post type with this name exists in this community');
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
    community: formatters.formatPreviewCommunity(community),
  };
};

exports.getPostTypeDetail = async ({ communityId, postTypeId }) => {
  const postType = await PostType.findById(postTypeId).lean();

  if (!postType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post Type does not exist');
  }
  if (postType.community.toString() !== communityId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community ID does not match');
  }
  return formatters.formatPostTypeDetail(postType);
};
