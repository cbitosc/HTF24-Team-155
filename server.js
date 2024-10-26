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

// Variable to track the last response type
let lastResponseType = 'general';

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
        'anxiety': [
            'I understand. Deep breathing can help; would you like to try a simple exercise?',
            'It can be tough to manage anxiety. Have you tried grounding techniques?',
            'Talking to someone can really help. Do you want to share what’s on your mind?',
            'Mindfulness can be a great tool. Would you like to explore that?',
            'You’re not alone in feeling this way. Let’s talk about it.'
        ],
        'stress': [
            'It can be tough to handle stress. A short break might help you clear your mind.',
            'How about taking a few minutes to breathe deeply? It might help relieve some tension.',
            'Do you have any activities that help you unwind? Sometimes a hobby can be a good distraction.',
            'Consider jotting down your thoughts. Writing can be a great way to process stress.',
            'Remember, it’s okay to ask for help when things feel overwhelming.'
        ],
        'sad': [
            'I’m here to listen. Talking to someone close might also bring comfort.',
            'It’s perfectly okay to feel sad sometimes. Would you like to share more about it?',
            'Engaging in activities you love can sometimes lift your spirits. What do you think?',
            'Consider doing something small for yourself today; it can make a difference.',
            'Would you like some suggestions for self-care activities?'
        ],
        'suicidal': [
            'Please reach out to a friend or mental health professional. You don’t have to go through this alone.',
            'It’s really important to talk to someone who can help. Can I assist you in finding support?',
            'You are valued, and your feelings matter. I encourage you to seek professional help.',
            'Remember, there are people who care and want to help you. Please talk to someone.',
            'You’re not alone; help is available. Can I provide you with some resources?'
        ],
        'depression': [
            'You’re not alone. Consider small steps toward self-care, and talking to someone might be a relief.',
            'Have you considered reaching out to someone who can support you? Talking helps.',
            'Try to engage in activities that bring you joy, even if they feel small. What do you think?',
            'Creating a daily routine can sometimes help. Would you like tips on that?',
            'It’s okay to seek help. Would you like to explore that option?'
        ],
        'lonely': [
            'Many feel this way sometimes. Connecting with others, even a short chat, might help.',
            'Have you thought about reaching out to a friend or family member? They might be willing to chat.',
            'Joining a group or community can also help. Would you like to know about options?',
            'Feeling lonely can be tough. Let’s talk about it if you’d like.',
            'Would you like suggestions for activities that can help connect you with others?'
        ],
        'insomnia': [
            'Good sleep hygiene can help. Try reducing screen time and create a calming pre-sleep routine.',
            'Consider relaxation techniques before bed, such as meditation or reading.',
            'A consistent sleep schedule might be beneficial. Have you tried going to bed and waking up at the same time?',
            'Limiting caffeine intake in the afternoon can also help improve your sleep quality.',
            'Have you tried creating a comfortable sleeping environment? It can make a big difference.'
        ],
        'overthinking': [
            'I know it can be overwhelming. Sometimes, writing down your thoughts helps put things in perspective.',
            'Taking a break and doing something enjoyable can also help your mind relax.',
            'Have you tried mindfulness or meditation techniques? They can be very calming.',
            'Talking things out can also help clarify your thoughts. Would you like to do that?',
            'Creating a list of priorities may help you focus on what’s important. Would you like tips on that?'
        ],
        'addiction': [
            'Seeking help from professionals can be a strong step forward. There’s always support available.',
            'Connecting with a support group can also be beneficial. Would you like help finding resources?',
            'It’s great that you’re recognizing this. Small steps can lead to positive changes.',
            'Have you considered speaking to a therapist? They can provide personalized support.',
            'You don’t have to face this alone; there are people ready to help you.'
        ],
        'frustration': [
            'It’s okay to feel frustrated. Taking deep breaths can help release some of that tension.',
            'Sometimes stepping away from the situation can give you a fresh perspective. Would you like to talk about it?',
            'Do you have strategies that help you cope with frustration? Let’s explore them.',
            'Physical activity can also be a great outlet for frustration. Would you like some suggestions?',
            'It’s helpful to express what you’re feeling. Would you like to share more?'
        ],
        'nightmares': [
            'Nightmares can be distressing. Calming activities before bed may help create a more restful sleep.',
            'Talking about your nightmares can help reduce their impact. Would you like to do that?',
            'Creating a soothing bedtime routine might also improve your sleep quality.',
            'Have you considered keeping a dream journal? It can help you process your feelings.',
            'Sometimes understanding what triggers your nightmares can be beneficial. Would you like to explore this?'
        ],
        'panic attack': [
            'Try grounding exercises. Focus on things you can see, hear, touch, and breathe slowly.',
            'Have you considered using breathing techniques to help calm your body during a panic attack?',
            'Talking to someone who understands can help. Would you like to share what you’re experiencing?',
            'Recognizing the signs of a panic attack can help you manage it better. Would you like tips on that?',
            'It’s important to take care of yourself during these moments. Let’s talk about strategies that work for you.'
        ],
        'general': [
            'Feel free to share anything on your mind. I’m here to support you.',
            'I’m here for you. What would you like to talk about today?',
            'Let’s discuss what’s bothering you. Your feelings are important.',
            'I’m ready to listen. Please share what you’re thinking.',
            'How can I assist you right now? I’m here to help.'
        ]
    };

    // Check for a matching keyword in the user's input
    for (let keyword in responses) {
        if (userInput.includes(keyword)) {
            let replies = responses[keyword]; // Get array of responses
            let randomIndex = Math.floor(Math.random() * replies.length); // Generate a random index based on the array length
            
            // Update last response type
            lastResponseType = keyword;
            return replies[randomIndex]; // Return the response at the random index
        }
    }
    
    // If no keyword matches, check last response type
    if (lastResponseType !== 'general') {
        lastResponseType = 'general'; // Reset to general if the last response was specific
        const generalReplies = responses['general'];
        const randomGeneralIndex = Math.floor(Math.random() * generalReplies.length); // Get random index for general responses
        return generalReplies[randomGeneralIndex]; // Return a random general response
    }
    
    // Return a general response only if it was the last response
    const generalReplies = responses['general'];
    const randomGeneralIndex = Math.floor(Math.random() * generalReplies.length);
    return generalReplies[randomGeneralIndex]; // Return a random general response
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
