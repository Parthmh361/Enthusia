const express = require('express');
const router = express.Router();
const SITank = require('../models/sitank');

// Create a new SITank entry
router.post('/', async (req, res) => {
  try {
    const { teamName, captainName, captainEmail, captainContact, college, teamMembers, city } = req.body;

    if (teamMembers.length !== 3) {
      return res.status(400).json({ message: 'SITank requires exactly 3 team members.' });
    }

    const newSITank = new SITank({ teamName, captainName, captainEmail, captainContact, college, teamMembers, city });
    const savedSITank = await newSITank.save();
    res.status(201).json(savedSITank);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all SITank entries
router.get('/', async (req, res) => {
  try {
    const entries = await SITank.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific SITank entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await SITank.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a SITank entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSITank = await SITank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSITank) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(updatedSITank);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a SITank entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSITank = await SITank.findByIdAndDelete(req.params.id);
    if (!deletedSITank) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
