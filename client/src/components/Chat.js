// src/components/Chatbot.js
import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Append user message to conversation
    setConversation([...conversation, { role: "user", content: input }]);
    setInput("");

    // Make an API call to GPT-3
    try {
      const response = await axios.post("/chat", { input });
      const botResponse = response.data;
      // Append bot response to conversation
      setConversation([...conversation, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("Error fetching response from the API: ", error);
    }
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
};

export default Chatbot;
