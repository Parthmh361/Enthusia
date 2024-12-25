// backend/routes/subscribeRoutes.js

const express = require('express');
const Subscriber = require('../models/subscriber');
const router = express.Router();

// POST route to subscribe a user
router.post('/', async (req, res) => {
    const { email } = req.body;

    // Check if the email is valid
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    try {
        // Check if the email already exists in the database
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        // Create a new subscriber
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        return res.status(200).json({ message: 'Subscribed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error subscribing, please try again' });
    }
});

// GET route to retrieve all subscribers (if needed)
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscribers' });
    }
});

module.exports = router;
