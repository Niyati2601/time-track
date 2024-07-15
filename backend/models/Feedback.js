// models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['general', 'personal'],
    required: true
  },
  projectName: {
    type: String,
    required: function() {
      return this.type === 'personal';
    }
  },
  employee: {
    type: String,
    required: function() {
      return this.type === 'personal';
    }
  },
  description: {
    type: String,
    required: true,
    maxlength: 1024
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
