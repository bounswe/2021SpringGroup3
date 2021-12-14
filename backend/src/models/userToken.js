const mongoose = require('mongoose');

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

const UserToken = mongoose.model('User_Token', userTokenSchema);

module.exports = UserToken;
