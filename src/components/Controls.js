import React from "react";
import "../styles/Controls.css";

const Controls = () => {
  return (
    <div className="controls-container">
      <h4>Game Controls</h4>
      <ul>
        <li><strong>WASD / Arrow Keys:</strong> Move</li>
        <li><strong>Enter:</strong> Start typing / Send message</li>
        <li><strong>Escape:</strong> Cancel typing</li>
        <li><strong>Click:</strong> Move to position</li>
      </ul>
    </div>
  )
};

export default Controls;
