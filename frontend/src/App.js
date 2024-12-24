import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Card, CardContent, Typography, Box
} from '@mui/material';

const AdminPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hackathonTeams, setHackathonTeams] = useState([]);
  const [sitankTeams, setSitankTeams] = useState([]);
  const [codeSprintTeams, setCodeSprintTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState(''); // Filter based on date (e.g., 'Last 30 days')
  const [sortOption, setSortOption] = useState(''); // Sort option (First Enrolled or Alphabetical)

  useEffect(() => {
    // Fetch Hackathon teams
    axios.get('http://localhost:5000/api/hackathon')
      .then(response => setHackathonTeams(response.data))
      .catch(error => console.error("Error fetching Hackathon teams:", error));

    // Fetch SITank teams
    axios.get('http://localhost:5000/api/sitank')
      .then(response => setSitankTeams(response.data))
      .catch(error => console.error("Error fetching SITank teams:", error));

    // Fetch CodeSprint teams
    axios.get('http://localhost:5000/api/codesprint')
      .then(response => setCodeSprintTeams(response.data))
      .catch(error => console.error("Error fetching CodeSprint teams:", error));
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Sort Teams based on selected option
  const sortTeams = (teams) => {
    if (sortOption === 'alphabetical') {
      return teams.sort((a, b) => a.teamName.localeCompare(b.teamName)); // Sort alphabetically by team name
    } else if (sortOption === 'firstEnrolled') {
      return teams.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by creation date (first enrolled)
    }
    return teams;
  };

  // Search and Filter logic
  const filteredTeams = (teams) => {
    return sortTeams(
      teams
        .filter(team => team.teamName.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(team => {
          if (!filterDate) return true;
          const teamDate = new Date(team.createdAt);
          const currentDate = new Date();
          const timeDiff = currentDate - teamDate;
          const daysDiff = timeDiff / (1000 * 3600 * 24);
          
          if (filterDate === 'Last 30 days' && daysDiff <= 30) return true;
          if (filterDate === 'Last 60 days' && daysDiff <= 60) return true;
          return false;
        })
    );
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">Admin Dashboard</Typography>

      <Box mb={3} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" onClick={() => handleEventClick('hackathon')}>Hackathon</Button>
        <Button variant="contained" onClick={() => handleEventClick('sitank')}>SITank</Button>
        <Button variant="contained" onClick={() => handleEventClick('codesprint')}>Code Sprint</Button>
      </Box>

      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        {/* Search Bar */}
        <TextField
          label="Search by Team Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        
        {/* Filter by Date */}
        <FormControl fullWidth>
          <InputLabel>Filter by Date</InputLabel>
          <Select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            label="Filter by Date"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Last 30 days">Last 30 days</MenuItem>
            <MenuItem value="Last 60 days">Last 60 days</MenuItem>
          </Select>
        </FormControl>

        {/* Sort By Option */}
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="alphabetical">Alphabetical Order</MenuItem>
            <MenuItem value="firstEnrolled">First Enrolled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Render Teams based on the selected event */}
      <Grid container spacing={3}>
        {selectedEvent === 'hackathon' && filteredTeams(hackathonTeams).map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{team.teamName}</Typography>
                <Typography variant="body2">Captain: {team.captainName}</Typography>
                <Typography variant="body2">Email: {team.captainEmail}</Typography>
                <Typography variant="body2">Contact: {team.captainContact}</Typography>
                <Typography variant="body2">College: {team.college}</Typography>
                <Typography variant="body2">City: {team.city}</Typography>
                <Typography variant="subtitle2" mt={2}>Members:</Typography>
                {team.teamMembers.map((member, index) => (
                  <Typography key={index} variant="body2">{member.name} ({member.college})</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {selectedEvent === 'sitank' && filteredTeams(sitankTeams).map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{team.teamName}</Typography>
                <Typography variant="body2">Captain: {team.captainName}</Typography>
                <Typography variant="body2">Email: {team.captainEmail}</Typography>
                <Typography variant="body2">Contact: {team.captainContact}</Typography>
                <Typography variant="body2">College: {team.college}</Typography>
                <Typography variant="body2">City: {team.city}</Typography>
                <Typography variant="subtitle2" mt={2}>Members:</Typography>
                {team.teamMembers.map((member, index) => (
                  <Typography key={index} variant="body2">{member.name} ({member.college})</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {selectedEvent === 'codesprint' && filteredTeams(codeSprintTeams).map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{team.teamName}</Typography>
                <Typography variant="body2">Captain: {team.captainName}</Typography>
                <Typography variant="body2">Email: {team.captainEmail}</Typography>
                <Typography variant="body2">Contact: {team.captainContact}</Typography>
                <Typography variant="body2">College: {team.college}</Typography>
                <Typography variant="body2">City: {team.city}</Typography>
                <Typography variant="subtitle2" mt={2}>Members:</Typography>
                {team.teamMembers.map((member, index) => (
                  <Typography key={index} variant="body2">{member.name} ({member.college})</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminPage;
