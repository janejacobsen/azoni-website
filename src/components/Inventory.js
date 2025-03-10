import React from "react";

const Inventory = ({ inventory, isOpen, onClose }) => {
  if (!isOpen) return null; // Hide inventory if not open

  return (
    <div style={{
      position: "absolute",
      top: "200px",
      right: "20px",
      width: "200px",
      background: "rgba(0, 0, 0, 0.7)",
      color: "white",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "14px"
    }}>
      <button onClick={onClose} style={{ float: "right", background: "red", color: "white", border: "none", cursor: "pointer" }}>X</button>
      <h3>Inventory</h3>
      {Object.keys(inventory).length === 0 ? (
        <p>Empty</p>
      ) : (
        Object.entries(inventory).map(([item, count]) => (
          <div key={item}>{item.replace("/trees/", "").replace(".png", "")}: {count}</div>
        ))
      )}
    </div>
  );
};

export default Inventory;
