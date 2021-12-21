const mongoose = require('mongoose');

const subSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const commentSchema = mongoose.Schema(
  {
    context: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    community: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Community',
    },
    type: {
      type: String,
      required: true,
    },
    actor: subSchema,
    object: subSchema,
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
