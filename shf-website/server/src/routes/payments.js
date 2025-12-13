const express = require('express');
const router = express.Router();
const crypto = require('crypto');
require('dotenv').config();

// Import models
const Donation = require('../models/Donation');

// Flutterwave webhook endpoint
router.post('/flutterwave/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    // Verify the webhook signature
    const hash = crypto
      .createHmac('sha256', process.env.FLUTTERWAVE_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['verif-hash']) {
      console.error('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    // Parse the payload
    const payload = JSON.parse(req.body);
    
    // Handle different event types
    switch (payload.event) {
      case 'charge.completed':
        // Update donation status
        const donation = await Donation.findOne({ transactionId: payload.data.tx_ref });
        
        if (donation) {
          donation.status = payload.data.status;
          await donation.save();
          
          console.log(`Donation ${donation._id} updated to status: ${payload.data.status}`);
        } else {
          console.log(`Donation with transaction ID ${payload.data.tx_ref} not found`);
        }
        break;
        
      case 'transfer.completed':
        // Handle transfer completions if needed
        console.log('Transfer completed:', payload.data);
        break;
        
      default:
        console.log('Unhandled event type:', payload.event);
    }
    
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

module.exports = router;