import React, { useState } from "react";

function Chatbot() {
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    // Add the user's message to the conversation
    const userMessage = { role: "user", content: input };
    setConversation([...conversation, userMessage]);

    // Clear the input field
    setInput("");

    // Send the user's message to the server to get the AI response
    fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the AI response to the conversation
        const aiMessage = { role: "ai", content: data.botResponse };
        setConversation([...conversation, aiMessage]);
      })
      .catch((error) => {
        console.error("Error sending message to server:", error);
      });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <div className="chatbot-messages">
          {conversation.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
