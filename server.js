const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app/static'))); // Serve static files
app.set('views', path.join(__dirname, 'app/templates')); // Set views directory
app.set('view engine', 'ejs'); // Use EJS as template engine

// Routes
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
        'anxiety': 'I understand. Deep breathing can help; would you like to try a simple exercise?',
        'stress': 'It can be tough to handle stress. A short break might help you clear your mind.',
        'sad': 'I’m here to listen. Talking to someone close might also bring comfort.',
        'suicidal': 'Please reach out to a friend or mental health professional. You don’t have to go through this alone.',
        'depression': 'You’re not alone. Consider small steps toward self-care, and talking to someone might be a relief.',
        'lonely': 'Many feel this way sometimes. Connecting with others, even a short chat, might help.',
        'insomnia': 'Good sleep hygiene can help. Try reducing screen time and create a calming pre-sleep routine.',
        'overthinking': 'I know it can be overwhelming. Sometimes, writing down your thoughts helps put things in perspective.',
        'addiction': 'Seeking help from professionals can be a strong step forward. There’s always support available.',
        'frustration': 'It’s okay to feel frustrated. Taking deep breaths can help release some of that tension.',
        'nightmares': 'Nightmares can be distressing. Calming activities before bed may help create a more restful sleep.',
        'panic attack': 'Try grounding exercises. Focus on things you can see, hear, touch, and breathe slowly.',
        'general': 'Feel free to share anything on your mind. I’m here to support you.'
    };

    // Check for a matching keyword in the user's input
    for (const keyword in responses) {
        if (userInput.includes(keyword)) {
            return responses[keyword]; // Return the matched response
        }
    }
    return responses['general']; // Default response if no keyword is matched
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
