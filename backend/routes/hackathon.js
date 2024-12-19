const express = require('express');
const router = express.Router();
const Hackathon = require('../models/hackathon');

// Create a new Hackathon entry
router.post('/', async (req, res) => {
  try {
    const { teamName, captainName, captainEmail, captainContact, college, teamMembers, city } = req.body;

    if (teamMembers.length !== 4) {
      return res.status(400).json({ message: 'Hackathon requires exactly 4 team members.' });
    }

    const newHackathon = new Hackathon({ teamName, captainName, captainEmail, captainContact, college, teamMembers, city });
    const savedHackathon = await newHackathon.save();
    res.status(201).json(savedHackathon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all Hackathon entries
router.get('/', async (req, res) => {
  try {
    const entries = await Hackathon.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific Hackathon entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Hackathon.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Hackathon entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedHackathon = await Hackathon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHackathon) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(updatedHackathon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a Hackathon entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedHackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!deletedHackathon) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
