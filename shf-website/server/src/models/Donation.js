const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
    trim: true
  },
  donorEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  donorPhone: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'UGX'
  },
  paymentMethod: {
    type: String,
    enum: ['mobile-money', 'card', 'bank'],
    required: true
  },
  transactionId: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonationCategory'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);