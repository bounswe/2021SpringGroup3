const mongoose = require('mongoose');

const commentACSSchema = mongoose.Schema(
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
      ref: 'Comment',
    },
  },
  {
    timestamps: true,
  }
);

const CommentACS = mongoose.model('CommentACS', commentACSSchema);

module.exports = CommentACS;
