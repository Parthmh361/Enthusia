const express = require('express');
const router = express.Router();
const SITCodeSprint = require('../models/codeSprint');

// Create a new SIT CodeSprint entry
router.post('/', async (req, res) => {
  try {
    const { teamName, captainName, captainEmail, captainContact, college, teamMembers, city } = req.body;

    if (teamMembers.length !== 3) {
      return res.status(400).json({ message: 'SIT CodeSprint requires exactly 3 team members.' });
    }

    const newCodeSprint = new SITCodeSprint({ teamName, captainName, captainEmail, captainContact, college, teamMembers, city });
    const savedCodeSprint = await newCodeSprint.save();
    res.status(201).json(savedCodeSprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all SIT CodeSprint entries
router.get('/', async (req, res) => {
  try {
    const entries = await SITCodeSprint.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific SIT CodeSprint entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await SITCodeSprint.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a SIT CodeSprint entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCodeSprint = await SITCodeSprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCodeSprint) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(updatedCodeSprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a SIT CodeSprint entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCodeSprint = await SITCodeSprint.findByIdAndDelete(req.params.id);
    if (!deletedCodeSprint) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
