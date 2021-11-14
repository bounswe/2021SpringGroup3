const Joi = require('joi');
const { objectId } = require('./custom.validation');

const fieldName = Joi.string();

exports.createPostType = {
  body: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      name: Joi.string().required(),
      textFieldNames: Joi.array().items(fieldName).min(0).max(10).required(),
      numberFieldNames: Joi.array().items(fieldName).min(0).max(10).required(),
      dateFieldNames: Joi.array().items(fieldName).min(0).max(10).required(),
      linkFieldNames: Joi.array().items(fieldName).min(0).max(10).required(),
      locationFieldNames: Joi.array().items(fieldName).min(0).max(10).required(),
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