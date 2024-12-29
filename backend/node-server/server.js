require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Example endpoint: Save warranty information
app.post('/warranties', (req, res) => {
  const warrantyData = req.body;
  console.log('Received warranty data:', warrantyData);
  res.status(200).json({ message: 'Warranty saved successfully!' });
});

// Endpoint to communicate with the Python server
app.post('/predict', async (req, res) => {
  const { productData } = req.body;

  try {
    const pythonResponse = await axios.post(`${process.env.PYTHON_SERVER_URL}/predict`, { productData });
    res.status(200).json(pythonResponse.data);
  } catch (error) {
    console.error('Error communicating with Python server:', error.message);
    res.status(500).json({ error: 'Failed to process prediction request.' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Node.js server is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
});
