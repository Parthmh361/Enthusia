const express = require('express');
const router = express.Router()
const Contact = require("../models/contact");
router.post('/', (req, res) => {
    const { name, email, message } = req.body;
  
    const newContact = new Contact({ name, email, message });
  
    newContact.save()
      .then(() => res.status(201).json({ message: 'Message sent successfully!' }))
      .catch((err) => res.status(500).json({ error: 'Error sending message' }));
  });
  
  // Fetch all messages
  router.get('/', (req, res) => {
    Contact.find()
      .sort({ createdAt: -1 })
      .then(contact => res.json(contact))
      .catch((err) => res.status(500).json({ error: 'Error fetching messages' }));
  });
  module.exports = router;