import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Button, Grid, Card, CardContent, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';

const AdminPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hackathonTeams, setHackathonTeams] = useState([]);
  const [sitankTeams, setSitankTeams] = useState([]);
  const [codeSprintTeams, setCodeSprintTeams] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('alphabetical');

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

    // Fetch messages from the backend
    axios.get('http://localhost:5000/api/contact')
      .then(response => setMessages(response.data))
      .catch(error => console.error("Error fetching messages:", error));

    // Fetch subscribers
    axios.get('http://localhost:5000/api/subscribe')
      .then(response => setSubscribers(response.data))
      .catch(error => console.error("Error fetching subscribers:", error));
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Filter and sort the data based on the search query and sort option
  const filterAndSort = (data) => {
    // Filter by search query (based on email or team name)
    const filteredData = data.filter(item => 
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.teamName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) // for messages
    );

    // Sort the filtered data
    return filteredData.sort((a, b) => {
      if (sortOption === 'alphabetical') {
        return a.email?.localeCompare(b.email) || a.teamName?.localeCompare(b.teamName) || a.name?.localeCompare(b.name);
      } else if (sortOption === 'firstRegistered') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">Admin Dashboard</Typography>

      {/* Event Buttons */}
      <Box mb={3} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" onClick={() => handleEventClick('hackathon')}>Hackathon</Button>
        <Button variant="contained" onClick={() => handleEventClick('sitank')}>SITank</Button>
        <Button variant="contained" onClick={() => handleEventClick('codesprint')}>Code Sprint</Button>
        <Button variant="contained" onClick={() => handleEventClick('messages')}>Messages</Button>
        <Button variant="contained" onClick={() => handleEventClick('subscribers')}>Subscribers</Button> {/* New Subscribers Button */}
      </Box>

      {/* Search and Sort Bar */}
      <Box mb={3} display="flex" justifyContent="space-between">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FormControl variant="outlined" style={{ width: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="alphabetical">Alphabetical</MenuItem>
            <MenuItem value="firstRegistered">First Registered</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Render Teams or Messages based on selected event */}
      {selectedEvent === 'hackathon' && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>Hackathon Teams</Typography>
          <Grid container spacing={3}>
            {filterAndSort(hackathonTeams).map((team) => (
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
        </Box>
      )}

      {selectedEvent === 'sitank' && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>SITank Teams</Typography>
          <Grid container spacing={3}>
            {filterAndSort(sitankTeams).map((team) => (
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
        </Box>
      )}

      {selectedEvent === 'codesprint' && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>Code Sprint Teams</Typography>
          <Grid container spacing={3}>
            {filterAndSort(codeSprintTeams).map((team) => (
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
        </Box>
      )}

      {selectedEvent === 'messages' && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>Messages from Users</Typography>
          <Grid container spacing={3}>
            {filterAndSort(messages).map((message) => (
              <Grid item xs={12} sm={6} md={4} key={message._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{message.name}</Typography>
                    <Typography variant="body2">Email: {message.email}</Typography>
                    <Typography variant="body2">Message: {message.message}</Typography>
                    <Typography variant="body2" color="textSecondary">{new Date(message.createdAt).toLocaleString()}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {selectedEvent === 'subscribers' && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>Subscribers</Typography>
          <Grid container spacing={3}>
            {filterAndSort(subscribers).map((subscriber) => (
              <Grid item xs={12} sm={6} md={4} key={subscriber._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{subscriber.email}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Registered on: {new Date(subscriber.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

    </Container>
  );
};

export default AdminPage;
