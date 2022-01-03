const mongoose = require('mongoose');

const postTypeACSSchema = mongoose.Schema(
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
      ref: 'PostType',
    },

    objectType: {
      type: String,
      default: 'PostType',
    },
  },
  {
    timestamps: true,
  }
);

const PostTypeACS = mongoose.model('PostTypeACS', postTypeACSSchema);

module.exports = PostTypeACS;
