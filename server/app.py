from config import app, db, openai
from flask import jsonify, request
from models import Message

# Initialize an empty conversation history
conversation = []

# Define route handlers
@app.route('/')
def index():
    return "Hello World!"

@app.route("/chat", methods=["POST"])
def chatbot():
    try:
        user_input = request.json.get("input")
        print("User Input:", user_input)

        # Add the user's message to the conversation
        conversation.append({"role": "user", "content": user_input})

        # Call the OpenAI API to get a response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversation,
            temperature=0.7,  # You can adjust temperature for response randomness
            max_tokens=150,   # Adjust max_tokens as needed
        )

        bot_response = response.choices[0].message["content"]

        # Add the bot's response to the conversation
        conversation.append({"role": "assistant", "content": bot_response})

        return jsonify({"botResponse": bot_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5555, debug=True)
