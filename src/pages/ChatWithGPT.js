import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ChatWithGPT.css";


const ChatWithGPT = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-4",
        messages: updatedMessages,
        temperature: 0.7
      }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      const assistantReply = response.data.choices[0].message;
      const newMessages = [...updatedMessages, assistantReply];
      setMessages(newMessages);

      // Log to your Flask app
      await axios.post("https://tweet-logger.onrender.com/log", {
        user_message: userMessage.content,
        assistant_reply: assistantReply.content
      });

    } catch (error) {
      console.error("Error during chat or logging:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <Header />
      <div className="chat-container">
        <h1 className="chat-heading">Azoni-GPT</h1>

        <div className="chat-box">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.role === "user" ? "user" : "assistant"}`}
            >
              <strong>{msg.role === "user" ? "You" : "Azoni"}:</strong> {msg.content}
            </div>
          ))}
          {loading && <p className="italic text-neutral-400">Azoni is typing...</p>}
        </div>

        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit" className="chat-button">Send</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ChatWithGPT;
