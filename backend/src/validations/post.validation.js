const Joi = require('joi');
const { objectId } = require('./custom.validation');

const textField = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.string().required(),
});

const numberField = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.number().required(),
});

const linkField = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.string().uri().required(),
});

exports.createPost = {
  body: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      name: Joi.string().required(),
      textFields: Joi.array().items(textField).min(0).max(10).required(),
      numberFields: Joi.array().items(numberField).min(0).max(10).required(),
      dateFields: Joi.array().items(textField).min(0).max(10).required(),
      linkFields: Joi.array().items(linkField).min(1).max(10).required(),
      locationFields: Joi.array().items(textField).min(0).max(10).required(),
    })
    .required(),
};

exports.getPosts = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
    })
    .required(),
};
