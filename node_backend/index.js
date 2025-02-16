const express = require('express');
const path = require('path');
const cors = require('cors'); // Enable CORS for external access

const app = express();
const port = process.env.PORT || 3000; // Use dynamic port for hosting

// Enable CORS
app.use(cors());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Serve index.html as default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
