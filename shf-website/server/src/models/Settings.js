const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteTitle: {
    type: String,
    default: 'Southern Hemisphere Foundation'
  },
  siteDescription: {
    type: String,
    default: 'Empowering orphaned and underprivileged children in Uganda'
  },
  contactEmail: {
    type: String,
    default: 'southernhemispherefoundation@gmail.com'
  },
  phoneNumbers: [{
    type: String
  }],
  whatsappNumbers: [{
    type: String
  }],
  address: {
    type: String,
    default: 'Bunamwaya, Makindye, Wakiso District, Uganda'
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  primaryColor: {
    type: String,
    default: '#0A3D62'
  },
  secondaryColor: {
    type: String,
    default: '#3DC1D3'
  },
  accentColor: {
    type: String,
    default: '#F6B93B'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);