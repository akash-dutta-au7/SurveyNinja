const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
    },
    linkedInId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
