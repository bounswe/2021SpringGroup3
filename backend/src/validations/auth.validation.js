const Joi = require('joi');
const { password } = require('./custom.validation');

exports.login = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().custom(password).required(),
    })
    .required(),
};

exports.register = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().custom(password).required(),
      username: Joi.string().min(2).max(30).required(),
    })
    .required(),
};
