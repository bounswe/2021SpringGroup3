const Joi = require('joi');
const { objectId } = require('./custom.validation');

const profileField = Joi.object().keys({
  value: Joi.string(),
  isPublic: Joi.boolean(),
});

const locationField = Joi.object().keys({
  value: Joi.object(),
  isPublic: Joi.boolean(),
  description: Joi.string(),
});

exports.setProfile = {
  body: Joi.object()
    .keys({
      profilePhoto: Joi.object().keys({
        value: Joi.string().base64().required(),
        isPublic: Joi.boolean().required(),
      }),
      bio: profileField,
      birthday: profileField,
      location: locationField,
      isPublic: Joi.boolean(),
    })
    .required(),
};

exports.getOtherProfile = {
  query: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId).required(),
    })
    .required(),
};

exports.setNotificationId = {
  body: Joi.object()
    .keys({
      notificationId: Joi.string().required(),
    })
    .required(),
};

exports.search = {
  query: Joi.object().keys({
    query: Joi.string().allow('', null).required(),
    communityId: Joi.string().custom(objectId),
  }),
};

exports.follow = {
  query: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId).required(),
    })
    .required(),
};
