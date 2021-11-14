const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { formatters } = require('../utils');
const { PostType, Community, Post } = require('../models');

exports.getPosts = async ({ communityId }) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  const postTypes = await PostType.find({
    community: community._id,
  }).lean();
  return formatters.formatPostTypes(postTypes);
};

const validateField = (fieldNames, field, fieldName) => {
  const errors = [];
  const fieldNameSet = new Set(fieldNames);
  const fieldSet = new Set(field.map((f) => f.name));
  const dbMinusReq = [...fieldNameSet].filter((x) => !fieldSet.has(x));
  const reqMinusDb = [...fieldSet].filter((x) => !fieldNameSet.has(x));
  if (dbMinusReq.length) {
    errors.push(`${dbMinusReq.join(', ')} should exist in ${fieldName}`);
  }
  if (reqMinusDb.length) {
    errors.push(`${reqMinusDb.join(', ')} should not exist in ${fieldName}`);
  }
  return errors;
};

exports.createPost = async ({
  token,
  communityId,
  postTypeId,
  textFields,
  numberFields,
  dateFields,
  linkFields,
  locationFields,
}) => {
  const community = await Community.findById(communityId).lean();
  if (!community) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Community does not exist');
  }
  const postType = await PostType.findById(postTypeId).lean();
  if (!postType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post type does not exist');
  }
  let errors = validateField(postType.textFieldNames, textFields, 'textFields');
  errors = errors.concat(validateField(postType.numberFieldNames, numberFields, 'numberFields'));
  errors = errors.concat(validateField(postType.dateFieldNames, dateFields, 'dateFields'));
  errors = errors.concat(validateField(postType.linkFieldNames, linkFields, 'linkFields'));
  errors = errors.concat(validateField(postType.locationFieldNames, locationFields, 'locationFields'));
  if (errors.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, errors.join('. '));
  }
  await Post.create({
    community: community._id,
    postType: postType._id,
    creator: token.user._id,
    textFields,
    numberFields,
    dateFields,
    linkFields,
    locationFields,
  });
  return {
    message: 'Post is created',
  };
};

exports.getPostDetail = async ({ communityId, postId }) => {
  const post = await Post.findById(postId).populate(["creator","community"]).lean();
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post does not exist');
  }
  if (post.community._id.toString()!=communityId){
    throw new ApiError(httpStatus.NOT_FOUND, 'Community ID does not match');
  }
  return formatters.formatPostDetail(community, post);
};
