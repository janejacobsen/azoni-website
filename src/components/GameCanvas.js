import React, { useEffect, useRef, useState } from "react";

const ws = new WebSocket("wss://aae8-73-97-95-199.ngrok-free.app/ws"); // Replace with your public WebSocket URL

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [players, setPlayers] = useState({});

  useEffect(() => {
    ws.onmessage = (event) => {
      const updatedPlayers = JSON.parse(event.data);
      setPlayers(updatedPlayers); // Store all player positions
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const move = (dx, dy) => {
      ws.send(JSON.stringify({ type: "move", dx, dy }));
    };

    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" || event.key === "w") move(0, -5);
      if (event.key === "ArrowDown" || event.key === "s") move(0, 5);
      if (event.key === "ArrowLeft" || event.key === "a") move(-5, 0);
      if (event.key === "ArrowRight" || event.key === "d") move(5, 0);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Object.keys(players).forEach((id) => {
        const { x, y, color } = players[id];
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 30, 30);
      });
      requestAnimationFrame(drawGame);
    };

    drawGame();
  }, [players]);

  return <canvas ref={canvasRef} className="game-canvas" width="800" height="500"></canvas>;
};

export default GameCanvas;
