const express = require('express');
const webHookRouter = express.Router();
const Webhook = require('../models/webhook');

// POST route to receive webhook and save to MongoDB
webHookRouter.post('/receive', async (req, res) => {
    try {
        // Log the received webhook data
        console.log("Webhook received: ", req.body);

        const { ticker, action, strategy } = req.body;

        // Check if the required data is available
        if (!ticker || !action || !strategy) {
            return res.status(400).json({ message: 'Missing required data' });
        }

        // Create a new Webhook document and save it to MongoDB
        const webhookData = new Webhook({
            ticker: ticker,
            action: action,
            strategy: strategy
        });

        await webhookData.save();  // Save the data in MongoDB

        // Send an acknowledgment back to the webhook sender
        res.status(200).json({ message: 'Webhook received and saved to MongoDB!' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ message: 'Error processing webhook' });
    }
});


// GET route to retrieve all webhook entries
webHookRouter.get('/', async (req, res) => {
    try {
        const webhooks = await Webhook.find();  // Retrieve all webhook data from MongoDB
        res.status(200).json(webhooks);
    } catch (error) {
        console.error('Error fetching webhooks:', error);
        res.status(500).json({ message: 'Error fetching webhooks' });
    }
});

// DELETE route to delete all webhook entries (useful for cleanup)
webHookRouter.delete('/', async (req, res) => {
    try {
        await Webhook.deleteMany();  // Delete all webhook records
        res.status(200).json({ message: 'All webhooks deleted successfully!' });
    } catch (error) {
        console.error('Error deleting webhooks:', error);
        res.status(500).json({ message: 'Error deleting webhooks' });
    }
});

module.exports = webHookRouter;
