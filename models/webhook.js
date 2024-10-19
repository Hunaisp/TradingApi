const mongoose = require('mongoose');

// Define the schema for the webhook data
const webhookSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ['buy', 'sell']  // Only allow 'buy' or 'sell' values
    },
    strategy: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now  // Automatically set the current date and time
    }
});

// Create the model from the schema
const Webhook = mongoose.model('Webhook', webhookSchema);

module.exports = Webhook;
