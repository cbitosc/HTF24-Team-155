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

        'unease': [
            'It sounds like you’re feeling unsettled. Would you like to talk about it?',
            'Identifying the source of your unease can be helpful. Can we explore that?',
            'Consider jotting down your thoughts; it might help clarify your feelings.',
            'It’s important to recognize these feelings. Let’s work through them together.',
            'You deserve to feel at peace. Would you like some tips on calming your mind?'
        ],
        'apprehension': [
            'Apprehension can be difficult. Is there a specific situation you’re worried about?',
            'Have you thought about how you can prepare for the situation?',
            'Sometimes talking it out helps. What are your thoughts on the matter?',
            'Consider focusing on the present moment; it can alleviate some apprehension.',
            'Remember, it’s okay to feel this way. Let’s discuss what’s bothering you.'
        ],
        'worry': [
            'Worrying can be exhausting. What’s been on your mind lately?',
            'Have you tried any techniques to manage your worry? Talking can help.',
            'It might help to write down your worries. Would you like to give it a try?',
            'Sharing your concerns with someone can also bring relief. Can I help?',
            'Remember, it’s okay to seek support when you’re feeling overwhelmed.'
        ],
        'fear': [
            'Fear can be paralyzing. Would you like to explore what you’re afraid of?',
            'Talking about your fears can help diminish their power. What are your thoughts?',
            'Have you considered confronting your fear in small steps?',
            'Remember, fear is a common feeling. You’re not alone in this.',
            'Can I assist you in finding resources to help you cope with your fears?'
        ],
        'bye': [
            'Thank you for chatting! Take care and feel free to return if you need support.',
            'Goodbye! Remember, you are not alone. Reach out whenever you need.',
            'It was nice talking to you! Wishing you all the best.',
            'Thanks for the conversation! Stay safe and take care of yourself.',
            'See you next time! Take care!'
        ],
        'thanks': [
            'You’re welcome! If you have more questions or need support, I’m here for you.',
            'I’m glad to help! Don’t hesitate to return if you need anything else.',
            'Thank you for chatting! Your well-being is important.',
            'It was my pleasure! Remember to take care of yourself.',
            'Anytime! I’m here whenever you need support.'
        ],
        'thank you': [
            'You’re welcome! If you have more questions or need support, I’m here for you.',
            'I’m glad to help! Don’t hesitate to return if you need anything else.',
            'Thank you for chatting! Your well-being is important.',
            'It was my pleasure! Remember to take care of yourself.',
            'Anytime! I’m here whenever you need support.'
        ],
        'general': [
            'I’m here to support you. What’s on your mind?',
            'Feel free to share whatever you’re comfortable discussing. I’m here to listen.',
            'If you have any specific topics in mind, let’s talk about those.',
            'It’s okay to just want to chat. I’m here for you.',
            'Your feelings matter; let’s talk about what you need right now.'
        ],
        'stress': [
            'It can be tough to handle stress. A short break might help you clear your mind.',
            'How about taking a few minutes to breathe deeply? It might help relieve some tension.',
            'Do you have any activities that help you unwind? Sometimes a hobby can be a good distraction.',
            'Consider jotting down your thoughts. Writing can be a great way to process stress.',
            'Remember, it’s okay to ask for help when things feel overwhelming.'
        ],
        'pressure': [
            'Feeling pressure can be stressful. What’s causing you to feel this way?',
            'It might help to take a step back and evaluate the situation. What do you think?',
            'Have you tried breaking tasks into smaller steps? It can make things feel more manageable.',
            'Consider talking to someone who can provide support. Would you like help finding someone?',
            'Remember, it’s okay to take things one step at a time.'
        ],
        'tension': [
            'Tension can build up easily. Have you tried stretching or relaxing exercises?',
            'Identifying the source of your tension can help. Would you like to discuss it?',
            'Physical activity can sometimes release tension. What do you think about going for a walk?',
            'Deep breathing can also be helpful. Would you like to try it together?',
            'Remember, it’s important to take care of yourself during stressful times.'
        ],
        'distress': [
            'I’m here for you. What’s causing you distress right now?',
            'Talking about your feelings can often bring relief. Would you like to share?',
            'Have you considered seeking support from someone you trust? It can make a difference.',
            'It’s important to acknowledge your feelings. Let’s work through them together.',
            'You’re not alone in this. Many people experience distress; let’s talk about it.'
        ],
        'overwhelm': [
            'Feeling overwhelmed can be tough. What’s on your mind that’s causing this?',
            'Have you thought about taking a short break to clear your mind?',
            'Sometimes prioritizing tasks can help. Would you like some tips on that?',
            'Consider talking it out with someone who can provide perspective. I’m here to help.',
            'You deserve to feel calm and collected. Let’s explore ways to achieve that.'
        ],
        'help': [
            'It’s great that you’re reaching out for help. What’s on your mind?',
            'Remember, seeking help is a sign of strength. How can I assist you?',
            'Talking things through can often bring clarity. What would you like to discuss?',
            'You don’t have to go through this alone; I’m here to support you.',
            'Let’s work together to find solutions that work for you.'
        ],
        'support': [
            'I’m here to support you. What are you currently struggling with?',
            'Sometimes, just talking can be incredibly supportive. Would you like to share?',
            'Have you reached out to anyone else for support? It can be helpful.',
            'Let’s discuss what kind of support you feel you need right now.',
            'Remember, you deserve to have support during difficult times.'
        ],
        'sad': [
            'I’m here to listen. Talking to someone close might also bring comfort.',
            'It’s perfectly okay to feel sad sometimes. Would you like to share more about it?',
            'Engaging in activities you love can sometimes lift your spirits. What do you think?',
            'Consider doing something small for yourself today; it can make a difference.',
            'Would you like some suggestions for self-care activities?'
        ],
        'melancholy': [
            'Feeling melancholy can be challenging. What’s been weighing on your mind?',
            'Sometimes, expressing your feelings through art or writing can be therapeutic. Would you like to try?',
            'It’s important to acknowledge how you feel. Would you like to share more?',
            'Consider surrounding yourself with supportive people during these times.',
            'You’re not alone in feeling this way; let’s talk about it.'
        ],
        'depressed': [
            'I’m sorry to hear you’re feeling this way. It’s important to talk about it.',
            'Have you reached out to someone who can provide support? It can help.',
            'Sometimes, just sharing how you feel can lighten the load. What’s on your mind?',
            'Engaging in small, enjoyable activities might help you feel better. Want some ideas?',
            'You’re not alone, and it’s okay to seek help when you need it.'
        ],
        'lonely': [
            'Loneliness can be very difficult. I’m here to listen if you want to share.',
            'Consider reaching out to a friend or family member; connection can help.',
            'Joining a group or club can also help ease feelings of loneliness. Have you thought about that?',
            'What are some activities you enjoy? Engaging in them can provide comfort.',
            'You’re not alone in feeling this way; let’s talk about how you’re feeling.'
        ],
        'helplessness': [
            'Feeling helpless can be tough. What’s making you feel this way?',
            'Sometimes discussing your feelings can provide a new perspective. Would you like to share?',
            'Consider focusing on small steps you can take to regain a sense of control.',
            'It’s important to reach out for support when you’re feeling this way.',
            'You’re not alone in this; let’s work together to find some hope.'
        ],
        'suicidal': [
            'I’m really sorry to hear that you’re feeling this way. It’s important to talk to someone who can help you, like a mental health professional.',
            'Please reach out to a trusted friend or a helpline immediately. You don’t have to face this alone.',
            'Your feelings matter, and getting support is crucial. I’m here to talk if you need me.',
            'You’re not alone, and there are people who want to help you. Please consider reaching out for support.',
            'I care about your well-being. If you’re in crisis, please seek immediate help.'
        ],
        'tired': [
            'Feeling tired can be a sign that you need rest. Have you had enough sleep lately?',
            'Consider taking short breaks throughout the day. It can help rejuvenate your energy.',
            'Engaging in some light exercise might also help boost your energy levels.',
            'Are there any activities that help you recharge? Let’s explore those.',
            'It’s important to listen to your body. What can you do to take care of yourself right now?'
        ],
        'low energy': [
            'Low energy can be challenging. Have you had enough rest and nourishment?',
            'Consider light exercises or stretching; it might help invigorate you.',
            'Engaging in activities you love can sometimes provide an energy boost.',
            'Let’s talk about your daily routine; are there adjustments we can make?',
            'You deserve to feel energized; let’s work together to explore some ideas.'
        ],
        'sleep deprived': [
            'Sleep deprivation can take a toll on your mental health. Have you considered creating a bedtime routine?',
            'Avoiding screens before bed can help. What do you think about that?',
            'Let’s explore some relaxation techniques to help you wind down before sleep.',
            'It’s essential to prioritize sleep for your well-being. Are there changes you can make to your routine?',
            'Remember, you’re not alone in this struggle. Let’s talk about it.'
        ],
        'insomnia': [
            'Insomnia can be frustrating. Have you tried any relaxation techniques before bed?',
            'Creating a calming bedtime routine can sometimes help. Would you like suggestions?',
            'Consider avoiding caffeine and heavy meals before bedtime; it might improve sleep quality.',
            'Keeping a sleep diary can help identify patterns. Would you like to try that?',
            'You deserve restful sleep. Let’s discuss some strategies that might help.'
        ],
        'overthinking': [
            'Overthinking can lead to stress. Have you tried mindfulness or grounding techniques?',
            'Sometimes, jotting down your thoughts can provide clarity. Would you like to try that?',
            'Engaging in physical activities can also help redirect your focus. What do you think?',
            'Consider setting a timer for worry time; it can help contain those thoughts.',
            'You’re not alone in this; let’s explore some techniques together.'
        ],
        'addiction': [
            'Addiction can be tough to face. Are you currently seeking support?',
            'Have you considered talking to a professional about your feelings?',
            'It’s important to address addiction; you deserve support and guidance.',
            'What steps have you taken so far? Let’s discuss how I can assist you.',
            'You’re not alone in this journey. Let’s work together to find a path forward.'
        ],
        'restlessness': [
            'Restlessness can be challenging. What’s on your mind that’s causing it?',
            'Consider engaging in physical activity; it can help channel that energy.',
            'Mindfulness practices can also provide a sense of calm. Would you like suggestions?',
            'Let’s talk about ways to help you feel more grounded right now.',
            'You deserve to find peace. Let’s work on that together.'
        ],
        'frustration': [
            'Frustration can be tough to manage. What’s causing you to feel this way?',
            'Sometimes discussing your feelings can bring clarity. I’m here to listen.',
            'Have you considered taking a break? It can help clear your mind.',
            'Let’s talk about some strategies to cope with frustration together.',
            'You’re not alone in feeling frustrated; let’s explore how to address it.'
        ],
        'nightmares': [
            'Nightmares can be unsettling. Would you like to talk about them?',
            'Sometimes discussing your dreams can provide insight. I’m here to listen.',
            'Consider creating a calming bedtime routine to promote restful sleep.',
            'Let’s explore some relaxation techniques to help ease your mind before sleep.',
            'You deserve peaceful sleep; let’s work on that together.'
        ],
        'lack of empathy': [
            'It’s tough to feel like there’s a lack of empathy around you. What’s been happening?',
            'Have you reached out to talk about your feelings? It can be helpful.',
            'Consider surrounding yourself with supportive people who understand your feelings.',
            'You deserve to be heard. Let’s talk about how you’re feeling.',
            'Remember, you’re not alone. Let’s explore ways to find understanding.'
        ],
        'no will to live': [
            'I’m really sorry to hear that you’re feeling this way. It’s crucial to talk to someone who can help, like a mental health professional.',
            'Please reach out to a trusted friend or a helpline immediately. You don’t have to face this alone.',
            'Your feelings matter, and getting support is vital. I’m here to talk if you need me.',
            'You’re not alone, and there are people who want to help you. Please consider reaching out for support.',
            'I care about your well-being. If you’re in crisis, please seek immediate help.'
        ],
        'spiraling': [
            'It sounds like you’re feeling overwhelmed. Can you identify what’s causing this spiraling?',
            'Have you thought about grounding techniques to help regain your focus?',
            'Sometimes talking it out can bring clarity. I’m here to listen if you want to share.',
            'Consider taking a break to clear your mind. It can help center your thoughts.',
            'You deserve to feel in control. Let’s talk about steps you can take to ground yourself.'
        ],
        'general': [
            'Feel free to share anything on your mind. I’m here to support you.',
            'I’m here for you. What would you like to talk about today?',
            'Let’s discuss what’s bothering you. Your feelings are important.',
            'I’m ready to listen. Please share what you’re thinking.',
            'How can I assist you right now? I’m here to help.'
        ],
        'panic attack': [
            'Panic attacks can be very distressing. I’m here to help. Would you like to try some breathing exercises?',
            'Grounding techniques can be helpful during a panic attack. Would you like me to guide you?',
            'It’s important to remind yourself that you’re safe. Let’s work on that together.',
            'Consider talking to someone you trust about your feelings. It can provide relief.',
            'You’re not alone in this. Let’s talk about how to manage those feelings.'
        ]
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