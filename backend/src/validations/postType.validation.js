const Joi = require('joi');
const { objectId } = require('./custom.validation');

const fieldName = Joi.string();

exports.createPostType = {
  body: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      name: Joi.string().required(),
      textFieldNames: Joi.array().items(fieldName).max(10),
      numberFieldNames: Joi.array().items(fieldName).max(10),
      dateFieldNames: Joi.array().items(fieldName).max(10),
      linkFieldNames: Joi.array().items(fieldName).max(10),
      locationFieldNames: Joi.array().items(fieldName).max(10),
    })
    .required(),
};

exports.getPostTypes = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.getPostTypeDetail = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      postTypeId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.searchPostTypes = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      query: Joi.string().required(),
    })
    .required(),
};
