import React, { useEffect, useState } from "react";
import "../styles/AICharacter.css";

const AICharacter = ({ isTyping }) => {
  const [aiPlayer, setAiPlayer] = useState({
    name: "Azoni AI",
    avatar: "/avatars/seal.png",
    x: Math.random() * 700 + 50,
    y: Math.random() * 400 + 50,
    isMoving: true,
  });

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
    </>
  );
};

export default AICharacter;
