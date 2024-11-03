from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer

# Initialize Flask app
app = Flask(__name__)

# Load the fine-tuned model and tokenizer
# Change this line:

# To this line (removing the './'):
model = AutoModelForCausalLM.from_pretrained('fine_tuned_model')

tokenizer = AutoTokenizer.from_pretrained('./fine_tuned_model')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_text = data['text']  # Get the input text from the request
    inputs = tokenizer.encode(input_text, return_tensors='pt')

    # Generate predictions
    outputs = model.generate(inputs, max_length=100)
    predicted_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({'response': predicted_text})

if __name__ == '__main__':
    app.run(debug=True)
