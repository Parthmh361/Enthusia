const mongoose = require('mongoose');

const teamInfoSchema = new mongoose.Schema({
  teamName: { 
    type: String, 
    required: true,
    trim: true 
  },
  teamCaptainName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  teamCaptainContact: { 
    type: String, 
    required: true,
    trim: true 
  },
  teamCaptainEmail: { 
    type: String, 
    required: true, 
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] // Email validation
  },
  teamMemberName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  teamMemberEmail: { 
    type: String, 
    required: true, 
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] // Email validation
  },
  contact: { 
    type: String, 
    required: true,
    trim: true 
  },
  collegeName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  city: { 
    type: String, 
    required: true,
    trim: true 
  },
}, { timestamps: true }); 


const TeamInfo = mongoose.model('TeamInfo', teamInfoSchema);

module.exports = TeamInfo;
