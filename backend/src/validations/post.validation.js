const Joi = require('joi');
const { objectId } = require('./custom.validation');

const textField = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.string().required(),
});

const dateField = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.string().isoDate().required(),
});

const numberField = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.number().required(),
});

const linkField = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.string().uri().required(),
});

const locationField = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.object().required(),
});

exports.createPost = {
  body: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      postTypeId: Joi.string().custom(objectId).required(),
      textFields: Joi.array().items(textField).max(10),
      numberFields: Joi.array().items(numberField).max(10),
      dateFields: Joi.array().items(dateField).max(10),
      linkFields: Joi.array().items(linkField).max(10),
      locationFields: Joi.array().items(locationField).max(10),
      tags: Joi.array().items(Joi.string()),
    })
    .required(),
};

exports.getPosts = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      sortBy: Joi.string().valid('createdAt', 'likeCount').default('createdAt'),
    })
    .required(),
};

exports.getPostDetail = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      postId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.likePost = {
  query: Joi.object()
    .keys({
      postId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.deletePost = {
  query: Joi.object()
    .keys({
      postId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.createComment = {
  body: Joi.object()
    .keys({
      text: Joi.string().min(2).max(300).required(),
      postId: Joi.string().custom(objectId).required(),
    })
    .required(),
};
