document.getElementById('send-button').onclick = function() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return; // Do not send empty messages

    displayMessage(userInput, 'user'); // Display user message
    document.getElementById('user-input').value = ''; // Clear input field

    // Send user input to the backend API
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        displayMessage(data.response, 'ai'); // Display chatbot response
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage("Sorry, there was an error processing your request.", 'ai');
    });
};

function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('chatbox').scrollTop = chatbox.scrollHeight; // Auto-scroll to latest message
}
