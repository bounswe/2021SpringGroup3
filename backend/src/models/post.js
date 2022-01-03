const mongoose = require('mongoose');

const stringField = new mongoose.Schema(
  {
    name: { type: String },
    value: { type: String },
  },
  {
    _id: false,
  }
);

const numberField = new mongoose.Schema(
  {
    name: { type: String },
    value: { type: Number },
  },
  {
    _id: false,
  }
);

const dateField = new mongoose.Schema(
  {
    name: { type: String },
    value: { type: Date },
  },
  {
    _id: false,
  }
);

const locationField = new mongoose.Schema(
  {
    name: { type: String },
    value: { type: Object },
  },
  {
    _id: false,
  }
);

const tagField = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
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
    community: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Community',
      required: true,
      index: true,
    },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true, index: true },
    textFields: [stringField],
    numberFields: [numberField],
    dateFields: [dateField],
    linkFields: [stringField],
    locationFields: [locationField],
    likeCount: { type: Number, default: 0 },
    likers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', index: true }],
    tags: [tagField],
    isCreatorDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
