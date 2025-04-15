import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ChatWithGPT.css";
import { GPT_MODES } from "../data/GPTModes";

const ChatWithGPT = () => {

  const [tone, setTone] = useState("friendly");
  // const [messages, setMessages] = useState([getSystemPrompt(tone), { role: "assistant", content: getWelcomeMessage(tone) }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [chatMode, setChatMode] = useState("azoni"); // "azoni" or "pdf"
  const gptConfig = GPT_MODES[chatMode];
  const [messages, setMessages] = useState(() => {
    const initialConfig = GPT_MODES["azoni"];
    return [
      gptConfig.systemPrompt(tone),
      { role: "assistant", content: initialConfig.welcomeMessage(tone) }
    ];
  });
  const [pdfName] = useState(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleToneChange = (newTone) => {
    setTone(newTone);
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

    // const endpoint =
    //   chatMode === "pdf"
    //     ? "https://your-backend/pdf-chat" // ← this will be your Flask PDF endpoint
    //     : "https://openrouter.ai/api/v1/chat/completions";
    console.log(gptConfig)
    console.log(updatedMessages)
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
      const response = await axios.post(gptConfig.endpoint, {
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
      console.log("API response data:", response.data);
      console.log(response)
      
      console.log("Full API response:", response);
      console.log("System prompt:", gptConfig.systemPrompt(tone))

      const choices = response?.data?.choices;
      if (!choices || choices.length === 0) {
        throw new Error("No choices returned from API.");
      }
      const assistantReply = choices[0].message;
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
  useEffect(() => {
    setMessages([
      gptConfig.systemPrompt(tone),
      { role: "assistant", content: gptConfig.welcomeMessage(tone) }
    ]);
    setInput("");
  }, [chatMode, gptConfig, tone]);

  return (
    <div className="container">
      <Header />
      <div className="chat-container">
        
      <h1 className="chat-heading">{gptConfig.name}</h1>
      <div className="chat-mode-toggle">
          <button
            className={chatMode === "azoni" ? "active" : ""}
            onClick={() => setChatMode("azoni")}
          >
            Azoni-GPT
          </button>
          <button
            className={chatMode === "pdf" ? "active" : ""}
            onClick={() => setChatMode("pdf")}
          >
            PDF-GPT
          </button>
          <button
            className={chatMode === "fab" ? "active" : ""}
            onClick={() => setChatMode("fab")}
          >
            FAB-GPT
          </button>
          <button
            className={chatMode === "bench" ? "active" : ""}
            onClick={() => setChatMode("bench")}
          >
            BENCH-GPT
          </button>
        </div>
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
          {gptConfig.presetQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(null, q)} // 👈 auto-submit
            >
              {q}
            </button>
          ))}
        </div>
        </div>
        
        {chatMode === "pdf" && (
          <div className="pdf-upload">
            <label>
              Upload PDF:
              <input
                type="file"
                accept="application/pdf"
                onChange={async (e) => {
                }}
              />
            </label>
            {pdfName && <p>📎 {pdfName} loaded</p>}
          </div>
        )}
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
