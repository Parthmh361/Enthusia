const mongoose = require('mongoose');

const codeSprintSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  captainName: { type: String, required: true },
  captainEmail: { type: String, required: true },
  captainContact: { type: String, required: true },
  college: { type: String, required: true },
  teamMembers: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      college: { type: String, required: true },
    },
  ],
  city: { type: String, required: true },
});

const SITCodeSprint = mongoose.model('SITCodeSprint', codeSprintSchema);

module.exports = SITCodeSprint;
