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
        'nervousness': [
            'Feeling nervous is normal. Have you considered some relaxation techniques?',
            'Would you like to talk about what’s making you feel this way?',
            'It can help to acknowledge your feelings. What’s on your mind?',
            'Try focusing on your breath. It can help ground you in the moment.',
            'Remember, it’s okay to feel nervous; you’re not alone.'
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
            'Melancholy can be a heavy feeling. Would you like to talk about what’s causing it?',
            'It might help to reflect on your feelings. What’s on your mind?',
            'Writing down your thoughts can sometimes clarify feelings of melancholy.',
            'Consider reaching out to someone to share how you’re feeling; it can help.',
            'You’re not alone in feeling this way. Let’s talk about it together.'
        ],
        'sorrow': [
            'Sorrow can be difficult to process. I’m here if you want to share.',
            'Have you thought about expressing your feelings through writing or art?',
            'Talking about your feelings can often bring relief. Would you like to do that?',
            'Consider spending time in nature; it can be healing during tough times.',
            'You deserve to take the time to heal. What would help you right now?'
        ],
        'grief': [
            'Grief can be a heavy burden. Would you like to talk about what you’re grieving?',
            'Have you considered seeking support groups for those who are grieving? It can help.',
            'Talking about memories can sometimes ease the pain of grief. Would you like to share?',
            'It’s important to allow yourself to feel and process your grief. I’m here for you.',
            'Remember, there’s no timeline for grief. You’re allowed to feel however you need.'
        ],
        'emotional turmoil': [
            'Emotional turmoil can feel chaotic. What’s currently causing you this distress?',
            'Talking through your feelings can sometimes bring clarity. Would you like to share?',
            'Consider engaging in activities that help ground you, such as meditation or yoga.',
            'It might be beneficial to keep a journal to process your emotions. Have you tried that?',
            'Remember, it’s okay to feel overwhelmed. You’re not alone in this.'
        ],
        'depression': [
            'I’m here for you. Have you been able to speak with anyone about how you’re feeling?',
            'It’s important to talk about depression. Would you like to discuss your feelings?',
            'Consider reaching out for professional help. It can be a vital step towards healing.',
            'Engaging in self-care activities can sometimes make a difference. Would you like suggestions?',
            'You’re not alone in this. Many people face depression, and there is support available.'
        ],
        'helplessness': [
            'Feeling helpless can be overwhelming. What’s currently making you feel this way?',
            'It’s important to talk about these feelings. Would you like to share more?',
            'Consider breaking tasks into smaller steps; it can help reduce feelings of helplessness.',
            'Reaching out to someone for support can often bring relief. I’m here for you.',
            'You’re not alone in feeling this way; let’s talk about it together.'
        ],
        'loneliness': [
            'Loneliness can feel heavy. I’m here to listen if you’d like to share.',
            'Have you thought about reaching out to someone to connect? It can help.',
            'Engaging in activities you enjoy can sometimes ease feelings of loneliness.',
            'Consider joining groups or activities that align with your interests; it can help connect you with others.',
            'You deserve connection and support. Let’s explore ways to find that.'
        ],
        'isolation': [
            'Isolation can be tough. Would you like to share what you’re experiencing?',
            'Reaching out to friends or family can help reduce feelings of isolation. Can I assist you with that?',
            'Consider finding a community group that interests you; connecting with others can be helpful.',
            'Have you thought about engaging in online communities? It can provide support.',
            'Remember, you’re not alone; I’m here for you whenever you need to talk.'
        ],
        'alienation': [
            'Feeling alienated can be painful. What’s causing you to feel this way?',
            'It might help to talk about your feelings of alienation. Can we explore that together?',
            'Connecting with people who share your interests can help alleviate feelings of alienation.',
            'Have you considered expressing your feelings through art or writing?',
            'Remember, it’s okay to seek support. You don’t have to face this alone.'
        ],
        'abandonment': [
            'Feelings of abandonment can be overwhelming. What’s on your mind?',
            'It’s important to talk about these feelings. Would you like to share more?',
            'Have you considered reaching out to someone who can provide support?',
            'You’re not alone in feeling this way; let’s talk about it together.',
            'Consider practicing self-compassion; you deserve kindness and understanding.'
        ],
        'disappointment': [
            'Disappointment can be difficult to process. What’s currently bothering you?',
            'Talking about your feelings can sometimes bring relief. Would you like to do that?',
            'Consider reflecting on what you can learn from this experience.',
            'It’s important to give yourself time to feel and heal. How can I support you?',
            'Remember, it’s okay to feel disappointed. Let’s talk about it together.'
        ],
        'incompetent': [
            'Feeling incompetent can be tough. Would you like to share what’s making you feel this way?',
            'It’s important to recognize your strengths as well. Can we explore that together?',
            'Consider journaling your accomplishments, no matter how small; it can help change your perspective.',
            'You’re capable of more than you realize. Let’s work on building your confidence.',
            'Remember, everyone struggles at times; you’re not alone in feeling this way.'
        ],
        'low energy': [
            'Low energy can be draining. Have you been getting enough rest?',
            'Consider taking short breaks to recharge during the day. What do you think?',
            'Sometimes, a change of scenery can help boost your energy. Would you like some suggestions?',
            'Engaging in light physical activity can also help. Have you tried it?',
            'Remember, it’s okay to take things slow. You deserve to take care of yourself.'
        ],
        'tired': [
            'Feeling tired can be a sign to slow down. Have you been getting enough rest?',
            'Consider setting aside some time for relaxation or self-care activities.',
            'It might help to evaluate your daily routine; are there areas you could adjust?',
            'Remember, it’s important to listen to your body’s needs. What can you do for yourself right now?',
            'You deserve to take breaks and care for your well-being.'
        ],
        'sleep deprived': [
            'Sleep deprivation can significantly impact your well-being. What’s keeping you from sleeping well?',
            'Consider establishing a calming bedtime routine. Would you like some tips?',
            'Have you tried techniques such as deep breathing or meditation to help you sleep?',
            'It’s important to prioritize rest; your body needs it to function well.',
            'Remember, you’re not alone; many people experience sleep difficulties.'
        ],
        'insomniac': [
            'Insomnia can be frustrating. What’s on your mind that might be affecting your sleep?',
            'Consider seeking professional help if insomnia persists; there are effective treatments available.',
            'Engaging in relaxation techniques before bed can sometimes help. Would you like to learn more?',
            'Have you evaluated your sleep environment? Making adjustments can often improve sleep quality.',
            'Remember, it’s okay to ask for help when dealing with insomnia.'
        ],
        'insomnia': [
            'Insomnia can be difficult to manage. What are some factors contributing to your sleep issues?',
            'Consider practicing good sleep hygiene. Would you like suggestions?',
            'Talking to someone about your concerns can sometimes help alleviate anxiety around sleep.',
            'It’s important to prioritize rest; have you been able to do that lately?',
            'You’re not alone in this; many people struggle with insomnia.'
        ],
        'overthinking': [
            'Overthinking can be exhausting. What thoughts are currently consuming your mind?',
            'Consider practicing mindfulness techniques to help ground yourself in the present moment.',
            'Have you tried writing down your thoughts? It can sometimes bring clarity.',
            'Talking through your thoughts can also help. I’m here to listen.',
            'Remember, it’s okay to take a break from your thoughts. You deserve peace of mind.'
        ],
        'addiction': [
            'Addiction can be a tough battle. What are you currently struggling with?',
            'It’s important to seek help when dealing with addiction. Would you like resources or support?',
            'Consider reaching out to a support group; it can provide a sense of community.',
            'Talking about your experiences can sometimes lighten the burden. Would you like to share?',
            'Remember, recovery is a journey; you don’t have to face it alone.'
        ],
        'restlessness': [
            'Restlessness can be frustrating. What’s causing you to feel this way?',
            'Engaging in physical activity can sometimes help relieve restlessness. Have you tried it?',
            'Consider taking a moment to breathe deeply and refocus your mind.',
            'It might help to engage in a hobby or activity that keeps your hands busy.',
            'Remember, it’s okay to feel restless; let’s explore ways to find calm together.'
        ],
        'frustration': [
            'Frustration can be overwhelming. What’s currently bothering you?',
            'Have you considered taking a step back to reassess the situation?',
            'Talking about your feelings can often bring clarity. Would you like to share?',
            'Remember, it’s okay to feel frustrated; you’re not alone in this.',
            'Let’s explore some strategies to help you cope with your frustration.'
        ],
        'nightmares': [
            'Nightmares can be distressing. Have you been experiencing them often?',
            'Consider establishing a calming bedtime routine; it might help reduce nightmares.',
            'Talking about your dreams can sometimes alleviate their impact. Would you like to share?',
            'Have you tried relaxation techniques before bed? They can promote better sleep.',
            'Remember, you’re not alone; many people experience nightmares from time to time.'
        ],
        'lack of empathy': [
            'A lack of empathy can be difficult to deal with. What’s on your mind?',
            'Consider discussing your feelings with someone you trust; it can help.',
            'It’s important to have your feelings validated. I’m here to listen.',
            'Have you thought about reaching out to a support group? It can provide connection.',
            'Remember, you deserve understanding and support during tough times.'
        ],
        'no will to live': [
            'I’m really sorry to hear that you’re feeling this way. It’s important to talk to someone who can help.',
            'Please consider reaching out to a professional or a helpline; they can provide support.',
            'You’re not alone in this; many people care about you. Would you like help finding someone to talk to?',
            'Your feelings are valid, and it’s okay to seek help when you need it.',
            'I’m here to listen and support you. Please let me know how I can help.'
        ],
        'spiraling': [
            'It sounds like you’re feeling out of control. Would you like to talk about what’s causing this?',
            'Consider taking a moment to breathe deeply; it can help center you.',
            'Have you thought about reaching out to someone for support during this time?',
            'Writing down your thoughts can sometimes bring clarity. Would you like to try that?',
            'Remember, it’s okay to seek help when you’re feeling overwhelmed.'
        ],
        'panic attack': [
            'Panic attacks can be terrifying. Have you experienced this before?',
            'Try focusing on your breath. Inhale deeply through your nose, hold for a few seconds, and exhale slowly.',
            'Have you considered speaking with a professional about your panic attacks? It can be helpful.',
            'It might help to have a grounding technique ready for when you feel a panic attack coming on.',
            'Remember, you’re not alone in this; many people experience panic attacks, and there is help available.'
        ]
    };

    // Check for specific keywords in user input and return a random response
    for (let keyword in responses) {
        if (userInput.includes(keyword)) {
            const responseList = responses[keyword];
            lastResponseType = keyword; // Update the last response type
            return responseList[Math.floor(Math.random() * responseList.length)];
        }
    }

    // Default response if no keywords are found
    return "I'm here to listen. Please share more about what you're feeling.";
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});