const Joi = require('joi');

exports.setProfile = {
  body: Joi.object().keys({}).required(),
};
