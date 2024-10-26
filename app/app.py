from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>Welcome to the Mental Health Chatbot</h1><p>Use /chat to interact.</p>"

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = get_response(user_input)  # Call the response function
    return jsonify({'response': response})

def get_response(user_input):
    # Simple logic based on keywords
    if "anxiety" in user_input.lower():
        return "It's okay to feel anxious. Consider practicing deep breathing."
    elif "stress" in user_input.lower():
        return "Stress can be managed with meditation and exercise."
    elif "depression" in user_input.lower():
        return "It's important to talk to someone. You're not alone."
    else:
        return "I'm here to help. Can you tell me more about what you're feeling?"

if __name__ == '__main__':
    app.run(debug=True)
