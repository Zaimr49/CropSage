from flask import Flask, request, jsonify
from ai71 import AI71
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Your AI71 API key
AI71_API_KEY = "<--API-KEY-->"
client = AI71(AI71_API_KEY)

@app.route('/api/generate', methods=['POST'])
def generate_response():
    try:
        data = request.json
        user_input = data.get('prompt')

        if not user_input:
            return jsonify({'error': 'Invalid input'}), 400

        messages = [{"role": "system", "content": "You are a helpful assistant specialized in crop, agriculture, irrigation, and plant diseases. You only have knowledge about these topics and nothing else."},
                    {"role": "user", "content": user_input}]

        # Set optimal hyperparameters
        max_tokens = 256
        temperature = 0.2
        top_p = 0.9
        frequency_penalty = 0.2
        # stop_sequence = "\n\n"

        content = ""
        for chunk in client.chat.completions.create(
            messages=messages,
            model="tiiuae/falcon-7b-instruct",
            stream=True,
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            # stop=[stop_sequence],
        ):
            delta_content = chunk.choices[0].delta.content
            if delta_content:
                content += delta_content

        return jsonify({'response': content})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
