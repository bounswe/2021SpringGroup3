const mongoose = require('mongoose');

const communityACSSchema = mongoose.Schema(
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
      ref: 'Community',
    },
    target: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      default: null,
    },
    objectType: {
      type: String,
      default: 'Community',
    },
  },
  {
    timestamps: true,
  }
);

const CommunityACS = mongoose.model('CommunityACS', communityACSSchema);

module.exports = CommunityACS;
