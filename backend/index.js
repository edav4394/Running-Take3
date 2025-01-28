// index.js (CommonJS style)
const dotenv = require('dotenv');
dotenv.config(); // Loads variables from .env into process.env

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Set up Express
const app = express();
app.use(cors());
app.use(express.json()); // no need for bodyParser in modern Express

// Import and use routes
const chatRoutes = require('./routes/chatRoutes');
// All routes in chatRoutes will be prefixed with "/api"
app.use('/api', chatRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
