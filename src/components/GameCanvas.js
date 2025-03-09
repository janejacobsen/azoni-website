import React, { useEffect, useRef, useState } from "react";
import CharacterSelection from "./CharacterSelection";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [players, setPlayers] = useState({});
  const [playerName, setPlayerName] = useState("");
  const [playerAvatar, setPlayerAvatar] = useState("");
  const [ws, setWs] = useState(null);

  // ✅ Start WebSocket connection AFTER character selection is complete
  useEffect(() => {
    if (!playerName || !playerAvatar) return;

    const newWs = new WebSocket("wss://aae8-73-97-95-199.ngrok-free.app/ws"); // Replace with actual WebSocket URL

    newWs.onopen = () => {
      console.log("WebSocket Connected ✅");
      newWs.send(JSON.stringify({ name: playerName, avatar: playerAvatar })); // ✅ Send both name and avatar
    };

    newWs.onmessage = (event) => {
      const updatedPlayers = JSON.parse(event.data);
      setPlayers(updatedPlayers); // ✅ Update player positions
    };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, [playerName, playerAvatar]);

  // ✅ Fix movement issue
  useEffect(() => {
    const move = (dx, dy) => {
      if (ws) ws.send(JSON.stringify({ type: "move", dx, dy }));
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

  // ✅ Ensure canvas re-renders when players update
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const drawGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Object.keys(players).forEach((id) => {
        const { x, y, avatar, name } = players[id];

        const img = new Image();
        img.src = avatar;
        img.onload = () => {
          ctx.drawImage(img, x, y, 40, 40); // ✅ Ensure proper avatar scaling
          ctx.fillStyle = "black";
          ctx.font = "14px Arial";
          ctx.textAlign = "center";
          ctx.fillText(name, x + 20, y - 5);
        };
      });
    };

    drawGame();
  }, [players]); // ✅ Re-run when players change

  return (
    <div style={{ position: "relative", width: "800px", height: "500px" }}>
      {!playerName || !playerAvatar ? (
        <CharacterSelection onConfirm={(name, avatar) => {
          setPlayerName(name);
          setPlayerAvatar(avatar);
        }} />
      ) : (
        <canvas ref={canvasRef} className="game-canvas" width="800" height="500"></canvas>
      )}
    </div>
  );
};

export default GameCanvas;
