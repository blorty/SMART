from config import app, db, openai
from flask import jsonify, request
from models import Message

# Define route handlers
@app.route('/')
def index():
    return "Hello World!"

@app.route("/chat", methods=["POST"])
def chatbot():
    try:
        user_input = request.json.get("input")
        
        # Call the OpenAI API to get a response
        response = openai.Completion.create(
            engine="davinci",  # You can choose another engine if needed
            prompt=user_input,
            max_tokens=50,  # Adjust the number of tokens as needed
        )
        
        bot_response = response.choices[0].text

        return jsonify({"botResponse": bot_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5555, debug=True)