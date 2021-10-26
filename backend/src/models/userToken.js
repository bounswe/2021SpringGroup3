const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const userTokenSchema = mongoose.Schema(
  {
    tokenCode: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

userTokenSchema.plugin(toJSON);

const UserToken = mongoose.model('User_Token', userTokenSchema);

module.exports = UserToken;
