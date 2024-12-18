const express = require('express');
const router = express.Router();
const TeamInfo = require('../models/teamInfo'); 

// @route   GET /api/teams
//This is to  Get all team entries
router.get('/', async (req, res) => {
  try {
    const teams = await TeamInfo.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/teams/:id
// This is to Get a single team entry by ID, we can also use teamname or captan name
router.get('/:id', async (req, res) => {
  try {
    const team = await TeamInfo.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   POST /api/teams
// This is to  Create a new team entry
router.post('/', async (req, res) => {
  try {
    const {
      teamName,
      teamCaptainName,
      teamCaptainContact,
      teamCaptainEmail,
      teamMemberName,
      teamMemberEmail,
      contact,
      collegeName,
      city,
    } = req.body;

    const newTeam = new TeamInfo({
      teamName,
      teamCaptainName,
      teamCaptainContact,
      teamCaptainEmail,
      teamMemberName,
      teamMemberEmail,
      contact,
      collegeName,
      city,
    });

    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create entry', error: error.message });
  }
});

// @route   PUT /api/teams/:id
// This is to Update a team entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTeam = await TeamInfo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, 
    });

    if (!updatedTeam) return res.status(404).json({ message: 'Team not found' });

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update entry', error: error.message });
  }
});

// @route   DELETE /api/teams/:id
// This is to Delete a team entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeam = await TeamInfo.findByIdAndDelete(req.params.id);
    if (!deletedTeam) return res.status(404).json({ message: 'Team not found' });

    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete entry', error: error.message });
  }
});

module.exports = router;
