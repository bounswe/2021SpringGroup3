const Joi = require('joi');

exports.objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

exports.password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

exports.activityStream = Joi.object().keys({
  context: Joi.string().required(),
  summary: Joi.string().required(),
  type: Joi.string().required(),
  actor: Joi.object().keys({
    type: Joi.string().required(),
    name: Joi.string().required(),
  }),
  object: Joi.object().keys({
    type: Joi.string().required(),
    name: Joi.string().required(),
  }),
});
