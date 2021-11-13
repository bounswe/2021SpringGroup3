const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    timezone: { type: String },
    lastActiveAt: { type: Date, default: Date.now },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      private: true, // used by the toJSON plugin
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: 'user',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, isDeleted: false, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
