const mongoose = require('mongoose');
const { createHash, compareHashValues } = require('../helpers/crypto.js');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.pre('remove', async function (next) {
  await this.model('Course').deleteMany({ author: this._id });
  next();
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await createHash(this.password);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return compareHashValues(enteredPassword, this.password);
};

UserSchema.virtual('ownCourses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'author',
  justOne: false,
});

module.exports = mongoose.model('User', UserSchema);
