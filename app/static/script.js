document.getElementById('send-button').onclick = function() {
    const userInput = document.getElementById('user-input').value;
    displayMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    // Simulate AI response
    setTimeout(() => {
        const aiResponse = getAIResponse(userInput);
        displayMessage(aiResponse, 'ai');
    }, 1000);
};

function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('chatbox').scrollTop = chatbox.scrollHeight;
}

function getAIResponse(input) {
    const keywords = [
        'anxiety', 'stress', 'help', 'sad', 'emotional', 'suicide', 'helplessness', 
        'suicidal', 'depressed', 'lonely', 'loneliness', 'alone', 'give up', 'hate', 
        'i cant do this anymore', 'depression', 'disappointment', 'incompetent', 
        'lack of validation', 'low energy', 'tired', 'sleep deprived', 'insomniac', 
        'insomnia', 'overthinking', 'addiction', 'restlessness', 'frustration', 
        'nightmares', 'lack of empathy', 'no will to live', 'spiralling', 'panic attack'
    ];

    if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
        return "It sounds like you're going through a tough time. Here are some resources that might help: \n1. Meditation techniques \n2. Breathing exercises \n3. Daily affirmations \n4. Exercise and nutrition recommendations \n5. Self-love practices. \nIf you're in immediate distress, please call the National Helpline: 1-800-273-8255.";
    } else {
        return "I'm here to listen. Can you tell me more about what you're feeling?";
    }
}
document.getElementById('send-button').onclick = function() {
    const userInput = document.getElementById('user-input').value;
    displayMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    // Simulate AI response
    setTimeout(() => {
        const aiResponse = getAIResponse(userInput);
        displayMessage(aiResponse, 'ai');
    }, 1000);
};

function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('chatbox').scrollTop = chatbox.scrollHeight;
}

function getAIResponse(input) {
    const keywords = [
        'anxiety', 'stress', 'help', 'sad', 'emotional', 'suicide', 'helplessness', 
        'suicidal', 'depressed', 'lonely', 'loneliness', 'alone', 'give up', 'hate', 
        'i cant do this anymore', 'depression', 'disappointment', 'incompetent', 
        'lack of validation', 'low energy', 'tired', 'sleep deprived', 'insomniac', 
        'insomnia', 'overthinking', 'addiction', 'restlessness', 'frustration', 
        'nightmares', 'lack of empathy', 'no will to live', 'spiralling', 'panic attack'
    ];

    if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
        return "It sounds like you're going through a tough time. Here are some resources that might help: \n1. Meditation techniques \n2. Breathing exercises \n3. Daily affirmations \n4. Exercise and nutrition recommendations \n5. Self-love practices. \nIf you're in immediate distress, please call the National Helpline: 1-800-273-8255.";
    } else {
        return "I'm here to listen. Can you tell me more about what you're feeling?";
    }
}