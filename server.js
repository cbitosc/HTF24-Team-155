const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "app/static" directory
app.use(express.static(path.join(__dirname, 'app', 'static')));

// Render the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'templates', 'index.html'));
});

// Sample endpoint for handling chat messages
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;

    // Here you would typically process the message and generate a response
    // For now, let's just echo back the user message as an example
    const aiResponse = `You said: "${userMessage}"`; // Replace this with actual logic

    res.json({ response: aiResponse }); // Send response back to the client
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
