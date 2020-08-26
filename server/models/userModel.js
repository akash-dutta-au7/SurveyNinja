const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    linkedInId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
