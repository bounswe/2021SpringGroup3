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

const activityStreamSchema = mongoose.Schema(
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

const ActivityStream = mongoose.model('Activity_Stream', activityStreamSchema);

module.exports = ActivityStream;
