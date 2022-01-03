const mongoose = require('mongoose');

const userACSSchema = mongoose.Schema(
  {
    context: {
      type: String,
      required: true,
      default: 'https://www.w3.org/ns/activitystreams',
    },
    summary: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    actor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },

    object: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },

    objectType: {
      type: String,
      default: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const UserACS = mongoose.model('UserACS', userACSSchema);

module.exports = UserACS;
