const mongoose = require('mongoose');

const postyTypeSchema = mongoose.Schema(
  {
    community: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Community',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostType = mongoose.model('Post-Type', postyTypeSchema);

module.exports = PostType;
