const Joi = require('joi');
const { objectId } = require('./custom.validation');

exports.createCommunity = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      iconUrl: Joi.string().uri(),
      description: Joi.string().required(),
      isPrivate: Joi.boolean().required(),
    })
    .required(),
};

exports.getCommunities = {
  query: Joi.object()
    .keys({
      isMember: Joi.boolean(),
      isModerator: Joi.boolean(),
    })
    .required(),
};

exports.getCommunityDetail = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.joinCommunity = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.leaveCommunity = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.kickFromCommunity = {
  query: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      userId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.updateCommunity = {
  body: Joi.object()
    .keys({
      communityId: Joi.string().custom(objectId).required(),
      name: Joi.string().min(2).max(30),
      iconUrl: Joi.string().uri(),
      description: Joi.string(),
      isPrivate: Joi.boolean(),
    })
    .required(),
};

exports.searchCommunity = {
  query: Joi.object()
    .keys({
      query: Joi.string().required(),
    })
    .required(),
};
