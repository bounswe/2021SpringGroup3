const mongoose = require('mongoose');

const postTypeSchema = mongoose.Schema(
  {
    community: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Community',
      required: true,
      index: true,
    },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true, index: true },
    name: {
      type: String,
      trim: true,
      index: true,
      required: true,
    },
    textFieldNames: [{ type: String }],
    numberFieldNames: [{ type: String }],
    dateFieldNames: [{ type: String }],
    linkFieldNames: [{ type: String }],
    locationFieldNames: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const PostType = mongoose.model('Post_Type', postTypeSchema);

module.exports = PostType;
