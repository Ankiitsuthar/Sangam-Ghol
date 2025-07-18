// const mongoose = require('mongoose');

// const newsletterSchema = new mongoose.Schema({
//     email: String,
// });

// module.exports = mongoose.model('Newsletter', newsletterSchema);
// backend/models/Newsletter.js
const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate subscriptions
    trim: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
