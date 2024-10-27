const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app/static')));
app.use(express.static(path.join(__dirname, 'images'))); // Serve static files
app.set('views', path.join(__dirname, 'app/templates')); // Set views directory
app.set('view engine', 'ejs'); // Use EJS as template engine
app.use('/images', express.static(path.join(__dirname, '../images'))); // Serve images

app.get('/', (req, res) => {
    res.render('index'); // Render the index view
});

// Chat API endpoint
app.post('/api/chat', (req, res) => {
    const userInput = req.body.message; // Capture the user input
    console.log("User Input:", userInput); // Log user input for debugging

    if (!userInput) {
        return res.json({ response: "I'm having trouble responding right now. Please try again later." });
    }

    const response = getAIResponse(userInput.toLowerCase()); // Get AI response based on user input
    console.log("Bot Response:", response); // Log the response for debugging
    res.json({ response }); // Send the response back to the client
});

// Function to generate AI responses based on keywords
function getAIResponse(userInput) {
    const responses = {
        'anxiety': [
            'I understand. Deep breathing can help; would you like to try a simple exercise?',
            'It can be tough to manage anxiety. Have you tried grounding techniques?',
            'Talking to someone can really help. Do you want to share what’s on your mind?',
            'Mindfulness can be a great tool. Would you like to explore that?',
            'You’re not alone in feeling this way. Let’s talk about it.'
        ],
        'nervousness': [
            'Feeling nervous is normal. Have you considered some relaxation techniques?',
            'Would you like to talk about what’s making you feel this way?',
            'It can help to acknowledge your feelings. What’s on your mind?',
            'Try focusing on your breath. It can help ground you in the moment.',
            'Remember, it’s okay to feel nervous; you’re not alone.'
        ],
        'breathing': [
            'Let’s try a simple breathing exercise together. Inhale deeply through your nose for 4 seconds, hold for 4 seconds, and exhale slowly through your mouth for 4 seconds. Repeat a few times.',
            'Breathe in for a count of 4, hold for 4, and exhale for a count of 4. Let’s do this a few times together.',
            'Take a deep breath in for 4 seconds, hold it for 4 seconds, then exhale slowly for 6 seconds. Feel the tension release.',
            'Let’s practice square breathing: inhale for 4 seconds, hold for 4, exhale for 4, and hold for 4. Repeat this several times.',
            'Focus on your breath. Inhale for 4 seconds, hold, then exhale slowly. Let’s do this together to calm your mind.'
        ],
        // Additional keyword responses...
        'general': [
            'I’m here to support you. What’s on your mind?',
            'Feel free to share whatever you’re comfortable discussing. I’m here to listen.',
            'If you have any specific topics in mind, let’s talk about those.',
            'It’s okay to just want to chat. I’m here for you.',
            'Your feelings matter; let’s talk about what you need right now.'
        ],
        // Add more keywords and responses as needed
    };

    // Check for keywords in user input
    for (let keyword in responses) {
        if (userInput.includes(keyword)) {
            // Select a random response from the list
            return responses[keyword][Math.floor(Math.random() * responses[keyword].length)];
        }
    }

    // Default response if no keywords matched
    return responses['general'][Math.floor(Math.random() * responses['general'].length)];
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
