const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      index: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    timezone: { type: String },
    lastActiveAt: { type: Date, default: Date.now },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      private: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    profilePhotoUrl: {
      value: {
        type: String,
        default: 'https://mocah.org/thumbs/108-cat__screaming_cat_image.jpg',
      },
      isPublic: {
        type: Boolean,
        default: true,
      },
    },
    bio: {
      value: {
        type: String,
      },
      isPublic: {
        type: Boolean,
        default: true,
      },
    },
    birthday: {
      value: {
        type: String,
      },
      isPublic: {
        type: Boolean,
        default: true,
      },
    },
    location: {
      value: {
        type: Object,
      },
      isPublic: {
        type: Boolean,
        default: true,
      },
      description: {
        type: String,
        default: '',
      },
      notificationId: {
        type: String,
      },
    },
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', index: true }],
    followerCount: {
      type: Number,
      default: 0,
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
