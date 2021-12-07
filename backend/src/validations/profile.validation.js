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
    description: Joi.string().required()
});

exports.setProfile = {
  body: Joi.object()
    .keys({
      profilePhotoUrl: profileField,
      bio: profileField,
      birthday: profileField,
      location: locationField,
    })
    .required(),
};