const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');
const tutorRoutes = require('./routes/tutor');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Routes
app.use('/api/tutor', tutorRoutes);

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// HTTPS credentials (for local development)
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

// HTTPS server
const PORT = process.env.PORT || 5000;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ HTTPS Server running at https://localhost:${PORT}`);
});
