const Joi = require('joi');

const profileField = Joi.object()
  .keys({
    value: Joi.string().required(),
    isPublic: Joi.boolean().required(),
  })
  .required();

exports.setProfile = {
  body: Joi.object()
    .keys({
      profilePhotoUrl: profileField,
      bio: profileField,
      birthday: profileField,
      location: profileField,
    })
    .required(),
};
