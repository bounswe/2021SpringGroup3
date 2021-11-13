const Joi = require('joi');

exports.createCommunity = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      iconUrl: Joi.string().uri().required(),
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
