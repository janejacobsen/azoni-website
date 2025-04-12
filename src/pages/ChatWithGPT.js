import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ChatWithGPT.css";
import getSystemPrompt from "../utils/getSystemPrompt";

const ChatWithGPT = () => {
  const [messages, setMessages] = useState([getSystemPrompt("friendly")]);
  const [, setTone] = useState("friendly");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const presetQuestions = [
    "What’s Charlton’s background?",
    "What is Azoni AI?",
    "What projects has Charlton built?",
    "What makes Charlton a strong hire?",
    "What are some fun facts about Charlton?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleToneChange = (newTone) => {
    setTone(newTone);
    const newPrompt = getSystemPrompt(newTone);
    const rest = messages.filter(msg => msg.role !== "system");
    setMessages([newPrompt, ...rest]);
  };

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
        <div className="chat-controls">
          <div className="tone-toggle">
            <span>🧠 Tone:</span>
            <button onClick={() => handleToneChange("professional")}>Professional</button>
            <button onClick={() => handleToneChange("friendly")}>Friendly</button>
            <button onClick={() => handleToneChange("casual")}>Casual</button>
          </div>
          <div className="preset-questions">
            {presetQuestions.map((q, i) => (
              <button key={i} onClick={() => setInput(q)}>{q}</button>
            ))}
          </div>
        </div>
        <div className="chat-box">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${msg.role === "user" ? "user" : "assistant"} fade-in`}
            >
              <div className="chat-meta">
                <span className="chat-name">
                  {msg.role === "user" ? "You " : "Azoni "}
                </span>
                <span className="chat-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="chat-content">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble assistant fade-in">
              <em>Azoni is typing...</em>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit" className="chat-button">
            Send
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ChatWithGPT;
