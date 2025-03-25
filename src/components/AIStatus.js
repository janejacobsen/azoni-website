import React from "react";

const AIStatus = ({ aiInventory, aiWoodcuttingXP }) => {
  // Calculate AI's woodcutting level (RuneScape-like progression)
  const aiLevel = Math.floor(Math.sqrt(aiWoodcuttingXP / 50));

  return (
    <div style={{
      position: "absolute",
      top: "10px",
      right: "250px",
      width: "200px",
      background: "rgba(0, 0, 0, 0.7)",
      color: "white",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "14px"
    }}>
      <h3>Azoni AI</h3>
      <p>Woodcutting Level: {aiLevel}</p>
      <p>XP: {aiWoodcuttingXP}</p>
      <h4>Inventory:</h4>
      {Object.keys(aiInventory).length === 0 ? (
        <p>Empty</p>
      ) : (
        Object.entries(aiInventory).map(([item, count]) => (
          <div key={item}>{item.replace("/trees/", "").replace(".png", "")}: {count}</div>
        ))
      )}
    </div>
  );
};

export default AIStatus;
