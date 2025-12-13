const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  goals: [{
    type: String,
    required: true
  }],
  photos: [{
    type: String // URLs to Cloudinary images
  }],
  beneficiaryStories: [{
    name: {
      type: String,
      required: true
    },
    story: {
      type: String,
      required: true
    },
    photo: {
      type: String // URL to Cloudinary image
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Program', programSchema);