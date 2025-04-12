import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ChatWithGPT.css";
import getSystemPrompt from "../utils/getSystemPrompt";

const ChatWithGPT = () => {
  const getWelcomeMessage = (tone) => {
    switch (tone) {
      case "professional":
        return "Welcome. I'm Azoni-GPT, here to answer any questions you have about Charlton Smith.";
      case "casual":
        return "Hey! I’m Azoni-GPT — wanna know what Charlton’s been building lately?";
      default:
        return "Hi! I'm Azoni-GPT. Ask me anything about Charlton Smith — his background, projects, or passions.";
    }
  };

  const [tone, setTone] = useState("friendly");
  const [messages, setMessages] = useState([getSystemPrompt(tone), { role: "assistant", content: getWelcomeMessage(tone) }]);
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
    const welcome = { role: "assistant", content: getWelcomeMessage(newTone) };
  
    // Keep only user/assistant messages (drop old system + welcome)
    const userMessages = messages.filter(m => m.role !== "system" && m.role !== "assistant" && m.role !== "user");
  
    setMessages([newPrompt, welcome, ...userMessages]);
  };

  const handleSubmit = async (e = null, customInput = null) => {
    if (e) e.preventDefault();
  
    const message = customInput || input;
    if (!message.trim()) return;
  
    const userMessage = { role: "user", content: message };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // 2-second cooldown

    try {
      // const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      //   model: "gpt-4",
      //   messages: updatedMessages,
      //   temperature: 0.7
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      //     "Content-Type": "application/json"
      //   }
      // });
      // const usage = response.data.usage;
      // console.log("Prompt tokens:", usage.prompt_tokens);
      // console.log("Completion tokens:", usage.completion_tokens);
      const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
        model: "openai/gpt-3.5-turbo", // or try mistralai/mixtral-8x7b or anthropic/claude-3-opus
        messages: updatedMessages,
        temperature: 0.7
      }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://azoni.ai",   // optional but recommended
          "X-Title": "AzoniGPT"                 // your app’s title
        }
      });
      
      console.log(response)
      
      const assistantReply = response.data.choices[0].message;
      setMessages([...updatedMessages, assistantReply]);
  
      await axios.post("https://tweet-logger.onrender.com/log", {
        user_message: userMessage.content,
        assistant_reply: assistantReply.content
      });
  
    } catch (error) {
      console.error("Error during chat or logging:", error);

      const fallbackReply = {
        role: "assistant",
        content: "Sorry, I'm currently unavailable. Please try again in a moment!"
      };
      setMessages([...updatedMessages, fallbackReply]);
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
          {["professional", "friendly", "casual"].map((t) => (
            <button
              key={t}
              onClick={() => handleToneChange(t)}
              className={tone === t ? "active-tone" : ""}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="preset-questions">
          {presetQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(null, q)} // 👈 auto-submit
            >
              {q}
            </button>
          ))}
        </div>
        </div>
        <div className="chat-box">
          {messages.filter((msg) => msg.role !== "system").map((msg, i) => (
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
