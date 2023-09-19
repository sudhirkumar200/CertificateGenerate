const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3001; // Set your desired port

app.use(express.json());

// Middleware to set CORS headers (replace 'your-domain.com' with your domain)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'your-domain.com'); // Replace with your domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serve your React build (assuming you have a 'build' folder)
app.use(express.static('build'));

// Proxy route to fetch and serve the image
app.get('/proxy-image', (req, res) => {
  const imageUrl = '/public/QuizCerti.jpg'; // Replace with the actual image URL
  request(imageUrl).pipe(res);
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
