import React, { useEffect, useRef, useState, useCallback } from "react";
import CharacterSelection from "./CharacterSelection";
import AICharacter from "./AICharacter";
import Controls from "./Controls";
import Skills from "./Skills";
import TreePlacement from "./TreePlacement";
import Inventory from "./Inventory";
import AIStatus from "./AIStatus";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/GameCanvas.css";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [players, setPlayers] = useState({}); 
  const [playerX, setPlayerX] = useState("");
  const [playerY, setPlayerY] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerAvatar, setPlayerAvatar] = useState("");
  const [ws, setWs] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [woodcuttingXP, setWoodcuttingXP] = useState(0);
  const [inventory, setInventory] = useState({});
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [tradeRequest, setTradeRequest] = useState(null); // Track active trade requests
  // eslint-disable-next-line no-unused-vars
  const [activeTrade, setActiveTrade] = useState(null);
  const [aiInventory, setAiInventory] = useState({});
  const [aiWoodcuttingXP, setAiWoodcuttingXP] = useState(0);
  const [trees, setTrees] = useState([]);

  const acceptTrade = (trader) => {
    console.log(`Accepted trade with ${trader}`);
    setTradeRequest(null); // Remove the request popup
    setActiveTrade({ with: trader, offered: {}, received: {} }); // Open trade UI
  };
  const handlePlayerClick = (playerId) => {
    if (playerId !== playerName) {
      setTradeRequest({ from: playerName, to: playerId });
      console.log(`Trade request sent to ${playerId}`);
    }
  };

  useEffect(() => {
    const toggleInventory = (event) => {
      if (event.key === "i" || event.key === "I") {
        setIsInventoryOpen((prev) => !prev);
      }
    };
  
    window.addEventListener("keydown", toggleInventory);
    return () => window.removeEventListener("keydown", toggleInventory);
  }, []);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (chatRef.current) {
      setTimeout(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 0);
      
    }
  };
  // useEffect(() => {
  //   if (chatRef.current) {
  //     chatRef.current.scrollTop = chatRef.current.scrollHeight;
  //   }
  // }, [chatMessage]); // Runs whenever chatHistory updates

  useEffect(() => {
    if (!playerName || !playerAvatar) return;

    const newWs = new WebSocket("wss://ebb2-73-97-95-199.ngrok-free.app/ws");

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
  
  const handleChopTree = (tree) => {
    console.log(`Chopped ${tree.index}! Gained ${tree.chopTime * 10} XP.`);
    setWoodcuttingXP(prevXP => prevXP + tree.chopTime * 10);
    ws.send(JSON.stringify({ type: "chat", text: `Chopped! Gained ${tree.chopTime * 10} XP.` }));
    // Later, we will add XP, inventory updates, and tree respawn logic here.
    console.log(inventory)
    setInventory((prev) => ({
      ...prev, 
      [tree.image]: (prev[tree.image] || 0) + Math.floor(Math.random() * 3) + 1 // 1- 3
    }));
  };
  
  const sendChat = useCallback(() => {
    if (ws && chatMessage.trim() !== "") {
      ws.send(JSON.stringify({ type: "chat", text: chatMessage }));
      // Directly execute escape logic
      setTimeout(scrollToBottom, 10); // Ensures scrolling after the message renders
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
        return;
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
      
      Object.keys(players).forEach((id) => {
        const player = players[id];
        const distance = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
        console.log(distance, x, y)
        if (distance < 30) {
          handlePlayerClick(player.name); // Send trade request if player is clicked
        }
      });
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setPlayerX(x)
        setPlayerY(y)
        const img = new Image();
        img.src = avatar;
        img.onload = () => {
          ctx.drawImage(img, x, y, 40, 40); // ✅ Ensure proper avatar scaling
          ctx.fillStyle = "black";
          ctx.font = "14px Arial";
          ctx.textAlign = "center";
          ctx.fillText(name, x + 20, y + 55);

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
  const startAIWoodcutting = () => {
    if (trees.length === 0) {
      setChatHistory((prev) => [...prev, { name: "Azoni AI", text: "I don't see any trees!" }]);
      return;
    }
    setChatHistory((prev) => [...prev, { name: "Azoni AI", text: "I don't see any trees!" }]);
    console.log(trees)
    const aiPlayer = players["Azoni AI"];
    if (!aiPlayer) return;
  
    // Find the closest tree
    const nearestTree = trees.reduce((closest, tree) => {
      const aiDistance = Math.sqrt((aiPlayer.x - tree.x) ** 2 + (aiPlayer.y - tree.y) ** 2);
      const closestDistance = Math.sqrt((aiPlayer.x - closest.x) ** 2 + (aiPlayer.y - closest.y) ** 2);
      return aiDistance < closestDistance ? tree : closest;
    }, trees[0]);
  
    // Move AI to the tree (simulate movement over time)
    const moveInterval = setInterval(() => {
      const dx = nearestTree.x - aiPlayer.x;
      const dy = nearestTree.y - aiPlayer.y;
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
        clearInterval(moveInterval);
        chopTreeAI(nearestTree);
      } else {
        aiPlayer.x += dx * 0.1;
        aiPlayer.y += dy * 0.1;
        setPlayers({ ...players, "Azoni AI": aiPlayer });
      }
    }, 100);
  };
  const chopTreeAI = (tree) => {
    setChatHistory((prev) => [...prev, { name: "Azoni AI", text: "I'm chopping the tree!" }]);

    setTimeout(() => {
      setChatHistory((prev) => [...prev, { name: "Azoni AI", text: "I got some logs!" }]);

      // Award XP
      setAiWoodcuttingXP((prevXP) => prevXP + tree.chopTime * 10);

      // Add logs to AI's inventory
      setAiInventory((prev) => ({
        ...prev,
        [tree.image]: (prev[tree.image] || 0) + Math.floor(Math.random() * 3) + 1, // Random 1-3 logs
      }));

      // Remove the tree and respawn it
      setTrees((prevTrees) => prevTrees.filter((t) => t !== tree));
      setTimeout(() => setTrees([...trees, tree]), 30000);
    }, tree.chopTime * 1000);
  };

  const sendMessageToAI = async (message) => {
    setChatHistory((prev) => [...prev, { name: "You", text: message }]);
    if (message.toLowerCase().includes("cut wood") || message.toLowerCase().includes("chop trees")) {
      startAIWoodcutting();
      return;
    }
  
    setChatHistory((prev) => [...prev, { name: "Azoni AI", text: "I don't understand." }]);
  };

  return (
    <div className="container">
      <Header />
      <div className="main">
        <h2>Under Construction</h2>
      </div>
      
      <div style={{ position: "relative", width: "100%", height: "700px", border: "2px solid black", marginTop: "20px" }}>
        {!playerName || !playerAvatar ? (
          <CharacterSelection onConfirm={(name, avatar) => {
            setPlayerName(name);
            setPlayerAvatar(avatar);
          }} />
        ) : (
          <>
            <Controls />
            <Inventory inventory={inventory} isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} />
            {tradeRequest && tradeRequest.to === playerName && (
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0, 0, 0, 0.8)",
                color: "white",
                padding: "20px",
                borderRadius: "10px"
              }}>
                <p>{tradeRequest.from} wants to trade with you!</p>
                <button onClick={() => acceptTrade(tradeRequest.from)}>Accept</button>
                <button onClick={() => setTradeRequest(null)}>Decline</button>
              </div>
            )}
            {activeTrade && (
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0, 0, 0, 0.9)",
                color: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "300px"
              }}>
                <h3>Trading with {activeTrade.with}</h3>
                <p>Your Offer: {JSON.stringify(activeTrade.offered)}</p>
                <p>Their Offer: {JSON.stringify(activeTrade.received)}</p>
                <button onClick={() => setActiveTrade(null)}>Cancel Trade</button>
              </div>
            )}
            <button
              onClick={() => setIsInventoryOpen((prev) => !prev)}
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                width: "50px",
                height: "50px",
                background: "url('/icons/inventory.png') no-repeat center",
                backgroundSize: "contain",
                border: "none",
                cursor: "pointer"
              }}
            ></button>
            <AIStatus aiInventory={aiInventory} aiWoodcuttingXP={aiWoodcuttingXP} />
            <Skills woodcuttingXP={woodcuttingXP}/>
            <TreePlacement trees={trees} setTrees={setTrees} playerX={playerX} playerY={playerY} onChopTree={handleChopTree} />
            <canvas ref={canvasRef} className="game-canvas"></canvas>
            <AICharacter isTyping={isTyping} chatHistory={chatHistory} sendMessageToAI={sendMessageToAI} players={players} />
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
                width: "50%",
                padding: "5px",
                fontSize: "14px",
              }}
            />
            
            <div 
              ref={chatRef} 
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
              {chatHistory.slice(-100).map((msg, index) => (
                <div key={index}>
                  <strong>{msg.name}:</strong> {msg.text}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GameCanvas;
