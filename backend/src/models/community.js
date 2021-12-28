const mongoose = require('mongoose');

const communitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    iconUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
    },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true, index: true },
    moderators: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', index: true }],
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', index: true }],
    memberCount: { type: Number, default: 0 },
    pendingMembers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', index: true }],
    pendingModerators: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', index: true }],
    isCreatorDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
