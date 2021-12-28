const mongoose = require('mongoose');

const postACSSchema = mongoose.Schema(
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
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

const PostACS = mongoose.model('PostACS', postACSSchema);

module.exports = PostACS;
