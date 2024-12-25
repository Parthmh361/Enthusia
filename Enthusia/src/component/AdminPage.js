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
  const [messages, setMessages] = useState([]); // For storing messages
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [sortOption, setSortOption] = useState('');

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
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">Admin Dashboard</Typography>

      {/* Event Buttons */}
      <Box mb={3} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" onClick={() => handleEventClick('hackathon')}>Hackathon</Button>
        <Button variant="contained" onClick={() => handleEventClick('sitank')}>SITank</Button>
        <Button variant="contained" onClick={() => handleEventClick('codesprint')}>Code Sprint</Button>
        <Button variant="contained" onClick={() => handleEventClick('messages')}>Messages</Button> {/* New Messages Button */}
      </Box>

      {/* Render Teams or Messages based on selected event */}
      {selectedEvent === 'hackathon' && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>Hackathon Teams</Typography>
          <Grid container spacing={3}>
            {hackathonTeams.map((team) => (
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
            {sitankTeams.map((team) => (
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
            {codeSprintTeams.map((team) => (
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
            {messages.map((message) => (
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
    </Container>
  );
};

export default AdminPage;
