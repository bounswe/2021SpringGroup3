const Joi = require('joi');
const { objectId } = require('./custom.validation');

exports.createCommunity = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      iconUrl: Joi.string().uri(),
        description: Joi.string().required(),
        isPrivate: Joi.boolean().required()
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
