const mongoose = require('mongoose');

const field = new mongoose.Schema(
  {
    name: { type: String },
    value: { type: String },
  },
  {
    _id: false,
  }
);

const postSchema = mongoose.Schema(
  {
    postType: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Post_Type',
      required: true,
      index: true,
    },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true, index: true },
    name: {
      type: String,
      trim: true,
      index: true,
      required: true,
      unique: true,
    },
    textFields: [field],
    numberFields: [field],
    dateFields: [field],
    linkFields: [field],
    locationFields: [field],
    likeCount: { type: Number, default: 0 },
    likers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Community',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
