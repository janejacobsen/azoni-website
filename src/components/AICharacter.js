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

  const lastSeenMessages = useRef(new Set());
  const hasNoticedPlayer = useRef(false);

  const checkProximity = (player) => {
    const distance = Math.sqrt(
      Math.pow(player.x - aiPlayer.x, 2) + Math.pow(player.y - aiPlayer.y, 2)
    );
    return distance < 100;
  };
  useEffect(() => {
    const nearbyPlayers = Object.values(players || {}).filter(checkProximity);
    if (nearbyPlayers.length > 0) {
      setAiPlayer((prev) => ({ ...prev, isMoving: false }));
      hasNoticedPlayer.current = true;
    } else if (hasNoticedPlayer.current) {
      setAiPlayer((prev) => ({ ...prev, isMoving: true }));
      hasNoticedPlayer.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);
  
  useEffect(() => {
    if (isTyping) return;

    const moveAI = () => {
      setAiPlayer((prev) => {
        if (!prev.isMoving) return prev; // Ensure AI only moves if allowed
        return {
          ...prev,
          x: prev.x + (Math.random() * 20 - 10),
          y: prev.y + (Math.random() * 20 - 10),
        };
      });
    };

    const aiInterval = setInterval(moveAI, 2000);
    return () => clearInterval(aiInterval);
  }, [isTyping]);

  useEffect(() => {
    if (!chatHistory || chatHistory.length === 0) return;
    const lastMessage = chatHistory[chatHistory.length - 1];
    const nearbyPlayers = Object.values(players || {}).filter(checkProximity);
    
    if (
      lastMessage.text && // Ensure the message is not empty
      !lastMessage.name.includes("Azoni AI") && // Prevent AI from responding to itself
      nearbyPlayers.length > 0 && 
      !lastSeenMessages.current.has(lastMessage.text) // Ensure AI only responds once per message in range
    ) {
      lastSeenMessages.current.add(lastMessage.text); // Store the seen message
      setAiPlayer((prev) => ({ ...prev, chat: "Thinking..." }));
      
      sendMessageToAI(lastMessage.text, nearbyPlayers.map(p => p.name)).then(response => {
        setAiPlayer((prev) => ({ ...prev, chat: response }));
        setTimeout(() => {
          setAiPlayer((prev) => ({ ...prev, chat: "" }));
        }, 5000);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatHistory, sendMessageToAI, players]);

  return (
    <>
      <img
        src={aiPlayer.avatar}
        alt="AI Character"
        style={{
          position: "absolute",
          left: aiPlayer.x,
          top: aiPlayer.y,
          width: "60px",
          height: "60px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: aiPlayer.x,
          top: aiPlayer.y - 20,
          background: "white",
          padding: "2px 5px",
          borderRadius: "5px",
        }}
      >
        {/* {aiPlayer.name} */}
      </div>
      {aiPlayer.chat && (
        <div
          style={{
            position: "absolute",
            left: aiPlayer.x,
            top: aiPlayer.y - 40,
            background: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {aiPlayer.chat}
        </div>
      )}
    </>
  );
};

export default AICharacter;