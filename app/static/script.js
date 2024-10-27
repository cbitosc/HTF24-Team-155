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

// Add event listener for 'Enter' key
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Check if the pressed key is 'Enter'
        event.preventDefault(); // Prevent default action (e.g., adding a new line)
        document.getElementById('send-button').click(); // Simulate a click on the send button
    }
});

// Function to display a message in the chatbox
function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    
    // Create a container for the message
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    
    // Add avatar for AI responses only
    if (sender === 'ai') {
        const avatar = document.createElement('img');
        avatar.src = 'path/to/ai-avatar.png'; // Update with the actual path to the AI avatar
        avatar.classList.add('avatar');
        messageContainer.appendChild(avatar); // Append the avatar to the message container
    }
    
    // Append message text to the container
    messageContainer.appendChild(document.createTextNode(message));
    
    messageDiv.appendChild(messageContainer);
    
    document.getElementById('messages').appendChild(messageDiv);
    // Auto-scroll to latest message
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight; 
}
let timerElement = document.getElementById('timer');
let time = 0; // Time in seconds

function updateTimer() {
    time++;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

setInterval(updateTimer, 1000); // Update the timer every second
