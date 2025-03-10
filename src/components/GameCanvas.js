import React, { useEffect, useRef, useState, useCallback } from "react";
import CharacterSelection from "./CharacterSelection";
import AICharacter from "./AICharacter";
import "../styles/GameCanvas.css";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [players, setPlayers] = useState({}); 
  const [chatHistory, setChatHistory] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerAvatar, setPlayerAvatar] = useState("");
  const [ws, setWs] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!playerName || !playerAvatar) return;

    const newWs = new WebSocket("wss://e111-73-97-95-199.ngrok-free.app/ws");

    newWs.onopen = () => {
      console.log("WebSocket Connected ✅");
      newWs.send(JSON.stringify({ name: playerName, avatar: playerAvatar }));
    };

    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.players) setPlayers(data.players);
      if (data.chatHistory) setChatHistory(data.chatHistory);
    };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, [playerName, playerAvatar]);

  const sendChat = useCallback(() => {
    if (ws && chatMessage.trim() !== "") {
      ws.send(JSON.stringify({ type: "chat", text: chatMessage }));
      setChatMessage("");
      setIsTyping(false);
      inputRef.current?.blur();
    }
  }, [ws, chatMessage]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Escape") {
      setChatMessage("");
      setIsTyping(false);
      inputRef.current?.blur();
      return;
    }
    if (event.key === "Enter") {
      if (isTyping) {
        sendChat();
      } else {
        setIsTyping(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  }, [isTyping, sendChat]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target !== inputRef.current) {
        setIsTyping(false);
      }
    };

    const handleCanvasClick = (event) => {
      if (!ws) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ws.send(JSON.stringify({ type: "moveTo", x, y }));
    };

    const move = (dx, dy) => {
      if (!isTyping && ws) ws.send(JSON.stringify({ type: "move", dx, dy }));
    };

    const handleKeyDown = (event) => {
      if (!isTyping) {
        if (event.key === "ArrowUp" || event.key === "w") move(0, -5);
        if (event.key === "ArrowDown" || event.key === "s") move(0, 5);
        if (event.key === "ArrowLeft" || event.key === "a") move(-5, 0);
        if (event.key === "ArrowRight" || event.key === "d") move(5, 0);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleClickOutside);
    canvasRef.current?.addEventListener("click", handleCanvasClick);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      canvasRef.current?.removeEventListener("click", handleCanvasClick);
    };
  }, [handleKeyPress, isTyping, ws]);

  // ✅ Ensure canvas re-renders when players update
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvasRef.current) {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const drawGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Object.keys(players).forEach((id) => {
        const { x, y, avatar, name, chat } = players[id];

        const img = new Image();
        img.src = avatar;
        img.onload = () => {
          ctx.drawImage(img, x, y, 40, 40); // ✅ Ensure proper avatar scaling
          ctx.fillStyle = "black";
          ctx.font = "14px Arial";
          ctx.textAlign = "center";
          ctx.fillText(name, x + 20, y + 50);

          // ✅ Draw chat bubble if player has a message
          if (chat) {
            ctx.font = "12px Arial";
            const padding = 10; // Padding around text
            const textMetrics = ctx.measureText(chat);
            const textWidth = textMetrics.width;
            const bubbleWidth = textWidth + padding * 2;
            const bubbleHeight = 20;

            // Adjust bubble position to center it above the avatar
            const bubbleX = x + 20 - bubbleWidth / 2; // Centering relative to avatar
            const bubbleY = y - 30; // Position bubble above the avatar

            // Draw the chat bubble
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 10);
            ctx.fill();
            ctx.stroke();

            // Draw the text centered within the bubble
            ctx.fillStyle = "black";
            ctx.textAlign = "center"; // Ensure text is centered horizontally
            ctx.textBaseline = "middle"; // Ensure text is centered vertically
            ctx.fillText(chat, bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2);
          }
        };
      });
    };

    drawGame();
  }, [players]); // ✅ Re-run when players change
  return (
    <div style={{ position: "relative", width: "100%", height: "700px", border: "2px solid black" }}>
      {!playerName || !playerAvatar ? (
        <CharacterSelection onConfirm={(name, avatar) => {
          setPlayerName(name);
          setPlayerAvatar(avatar);
        }} />
      ) : (
        <>
          <canvas ref={canvasRef} className="game-canvas"></canvas>
          <AICharacter isTyping={isTyping} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              width: "auto",
              padding: "5px",
              fontSize: "14px",
            }}
          />
          
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              left: "10px",
              width: "50%",
              height: "150px",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              padding: "5px",
              fontSize: "12px",
              overflowY: "auto",
            }}
          >
            {chatHistory.slice(-10).map((msg, index) => (
              <div key={index}>
                <strong>{msg.name}:</strong> {msg.text}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GameCanvas;
