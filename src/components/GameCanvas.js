import React, { useEffect, useRef, useState } from "react";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [players, setPlayers] = useState({});
  const [playerName, setPlayerName] = useState("");  // ✅ Store name
  const [nameSubmitted, setNameSubmitted] = useState(false);  // ✅ Hide input after submit
  const [ws, setWs] = useState(null); // ✅ Store WebSocket instance

  // ✅ Initialize WebSocket connection AFTER the name is submitted
  useEffect(() => {
    if (!nameSubmitted) return;

    const newWs = new WebSocket("wss://aae8-73-97-95-199.ngrok-free.app/ws"); // Replace with actual WebSocket URL

    newWs.onopen = () => {
      console.log("WebSocket Connected ✅");
      newWs.send(JSON.stringify({ name: playerName })); // ✅ Send name ONLY after connection
    };

    newWs.onmessage = (event) => {
      const updatedPlayers = JSON.parse(event.data);
      setPlayers(updatedPlayers);
    };

    setWs(newWs); // ✅ Store WebSocket in state

    return () => {
      newWs.close();
    };
  }, [nameSubmitted]);

  useEffect(() => {
    const move = (dx, dy) => {
      if (ws) ws.send(JSON.stringify({ type: "move", dx, dy })); // ✅ Only send if ws is defined
    };

    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" || event.key === "w") move(0, -5);
      if (event.key === "ArrowDown" || event.key === "s") move(0, 5);
      if (event.key === "ArrowLeft" || event.key === "a") move(-5, 0);
      if (event.key === "ArrowRight" || event.key === "d") move(5, 0);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ws]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const drawGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Object.keys(players).forEach((id) => {
        const { x, y, color, name } = players[id];

        // Draw player rectangle
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 30, 30);

        // Draw player name above rectangle
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(name, x + 15, y - 5);
      });
      requestAnimationFrame(drawGame);
    };

    drawGame();
  }, [players]);

  // ✅ Handle name input submission
  const handleNameSubmit = (e) => {
    if (e.key === "Enter" && playerName.trim() !== "") {
      setNameSubmitted(true);  // ✅ Hide input and start game
    }
  };

  return (
    <div style={{ position: "relative", width: "800px", height: "500px" }}>
      <canvas ref={canvasRef} className="game-canvas" width="800" height="500"></canvas>

      {!nameSubmitted && (
        <input
          type="text"
          placeholder="Enter your name..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={handleNameSubmit}
          autoFocus
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "10px",
            fontSize: "18px",
            textAlign: "center",
            borderRadius: "5px",
            border: "2px solid black",
            outline: "none"
          }}
        />
      )}
    </div>
  );
};

export default GameCanvas;
