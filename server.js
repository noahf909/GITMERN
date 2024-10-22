const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Correctly use bodyParser to parse incoming JSON data
app.use(bodyParser.json());  // This parses JSON requests

// Optional: Use bodyParser to parse URL-encoded data (from form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Setting custom headers for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// Start the Node + Express server on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
