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

const tagField = Joi.object().keys({
  name: Joi.string().required(),
  id: Joi.string().required(),
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
      tags: Joi.array().items(tagField).max(10),
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
      communityId: Joi.string().custom(objectId).required(),
      postId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.unlikePost = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
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
  query: Joi.object()
    .keys({
      postId: Joi.string().custom(objectId).required(),
    })
    .required(),
  body: Joi.object()
    .keys({
      text: Joi.string().min(2).max(300).required(),
    })
    .required(),
};

exports.search = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      sortBy: Joi.string().valid('createdAt', 'likeCount').default('createdAt'),
      tag: Joi.string().allow('', null),
      postTypeId: Joi.string().custom(objectId).allow('', null),
    })
    .required(),
};

exports.advancedSearch = {
  body: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      postTypeId: Joi.string().custom(objectId).required(),
      textFields: Joi.array().items(textField).max(10),
      numberFields: Joi.array()
        .items(
          Joi.object().keys({
            name: Joi.string().required(),
            value: {
              start: Joi.number(),
              end: Joi.number().when('start', { is: null, then: Joi.number().required(), otherwise: Joi.number() }),
            },
          })
        )
        .max(10),
      dateFields: Joi.array()
        .items(
          Joi.object().keys({
            name: Joi.string().required(),
            value: {
              start: Joi.string().isoDate(),
              end: Joi.string()
                .isoDate()
                .when('start', { is: null, then: Joi.string().isoDate().required(), otherwise: Joi.string().isoDate() }),
            },
          })
        )
        .max(10),
      linkFields: Joi.array().items(textField).max(10),
      locationFields: Joi.array()
        .items(
          Joi.object().keys({
            name: Joi.string().required(),
            value: {
              geo: {
                longitude: Joi.number().required(),
                latitude: Joi.number().required(),
                range: Joi.number().positive().required(),
              },
            },
          })
        )
        .max(10),
      tag: Joi.string().allow('', null),
    })
    .required(),
};
