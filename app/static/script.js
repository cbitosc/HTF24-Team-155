// Get references to the send button and chat input field
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
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        displayMessage(data.response, 'ai'); // Display chatbot response
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage("I'm having trouble responding right now. Please try again later.", 'ai');
    });
};

// Add event listener for form submission (optional)
document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    document.getElementById('send-button').click(); // Trigger the send button click
});

// Function to display a message in the chatbox
function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    document.getElementById('messages').appendChild(messageDiv);
    // Auto-scroll to latest message
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight; 
}
