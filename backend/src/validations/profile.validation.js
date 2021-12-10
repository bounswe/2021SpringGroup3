const Joi = require('joi');

const profileField = Joi.object()
  .keys({
    value: Joi.string().required(),
    isPublic: Joi.boolean().required(),
  })
  .required();

const locationField = Joi.object().keys({
  value: Joi.object().required(),
  isPublic: Joi.boolean().required(),
  description: Joi.string().required(),
});

exports.setProfile = {
  body: Joi.object()
    .keys({
      profilePhoto: Joi.object()
        .keys({
          value: Joi.string().base64().required(),
          isPublic: Joi.boolean().required(),
        })
        .required(),
      bio: profileField,
      birthday: profileField,
      location: locationField,
    })
    .required(),
};
