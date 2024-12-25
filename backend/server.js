const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const hackathonRoutes = require('./routes/hackathon');
const sitankRoutes = require('./routes/sitank');
const codeSprintRoutes = require('./routes/codeSprint');
const contactRoutes = require("./routes/contact");
const subscribeRoutes = require("./routes/subscriber");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/api/hackathon', hackathonRoutes);
app.use('/api/sitank', sitankRoutes);
app.use('/api/codeSprint', codeSprintRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscribe', subscribeRoutes);
// Database connection
mongoose.connect("mongodb+srv://parthchoudhari3612:qsefthikp@cluster0.ccucqrl.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
