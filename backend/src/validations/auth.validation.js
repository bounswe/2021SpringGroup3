const Joi = require('joi');
const { password } = require('./custom.validation');

exports.login = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      uniqueId: Joi.string().required(),
    })
    .required(),
};

exports.register = {
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required(),
      password: Joi.string().custom(password).required(),
      name: Joi.string().min(2).max(30).required(),
    })
    .required(),
};
