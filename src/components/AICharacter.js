import React, { useEffect, useState, useRef } from "react";
import "../styles/AICharacter.css";

const AICharacter = ({ isTyping, chatHistory, sendMessageToAI, players }) => {
  const [aiPlayer, setAiPlayer] = useState({
    name: "Azoni AI",
    avatar: "/avatars/seal.png",
    x: Math.random() * 700 + 50,
    y: Math.random() * 400 + 50,
    isMoving: true,
    chat: "",
  });

  const lastRepliedMessage = useRef(null);

  const checkProximity = (player) => {
    const distance = Math.sqrt(
      Math.pow(player.x - aiPlayer.x, 2) + Math.pow(player.y - aiPlayer.y, 2)
    );
    return distance < 100;
  };

  useEffect(() => {
    if (!aiPlayer.isMoving || isTyping) return;

    const moveAI = () => {
      setAiPlayer((prev) => ({
        ...prev,
        x: prev.x + (Math.random() * 20 - 10),
        y: prev.y + (Math.random() * 20 - 10),
      }));
    };

    const aiInterval = setInterval(moveAI, 2000);
    return () => clearInterval(aiInterval);
  }, [aiPlayer.isMoving, isTyping]);

  useEffect(() => {
    if (!chatHistory || chatHistory.length === 0) return;
    const lastMessage = chatHistory[chatHistory.length - 1];
    const nearbyPlayers = Object.values(players || {}).filter(checkProximity);
    
    if (
      lastMessage.text.toLowerCase().includes("ai bot") && 
      nearbyPlayers.length > 0 && 
      lastRepliedMessage.current !== lastMessage.text // Ensure AI only responds once
    ) {
      lastRepliedMessage.current = lastMessage.text; // Store the last responded message
      setAiPlayer((prev) => ({ ...prev, isMoving: false, chat: "Thinking..." }));
      sendMessageToAI(lastMessage.text);
    }
  }, [chatHistory, sendMessageToAI, players]);

  return (
    <>
      <img
        src={aiPlayer.avatar}
        alt="AI Character"
        className="ai-character"
        style={{ left: aiPlayer.x, top: aiPlayer.y }}
      />
      <div className="ai-name" style={{ left: aiPlayer.x, top: aiPlayer.y - 20 }}>
        {aiPlayer.name}
      </div>
      {aiPlayer.chat && (
        <div className="ai-chat-bubble" style={{ left: aiPlayer.x, top: aiPlayer.y - 40 }}>
          {aiPlayer.chat}
        </div>
      )}
    </>
  );
};

export default AICharacter;
