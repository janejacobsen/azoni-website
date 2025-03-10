import React, { useState, useEffect} from "react";
import "../styles/Skills.css";

const Skills = ({woodcuttingXP}) => {
  const [woodcuttingLevel, setWoodcuttingLevel] = useState(1);
  const [xpProgress, setXpProgress] = useState(0);

  // XP required Formula: 50 * level ^ 2
  const getXPForLevel = (level) => 50 * level * level;

  useEffect(() => {
    let level = 1;
    while (woodcuttingXP >= getXPForLevel(level)) {
      level++;
    }
    setWoodcuttingLevel(level - 1);
    const prevXP = getXPForLevel(level - 1);
    const nextXP = getXPForLevel(level);
    setXpProgress(((woodcuttingXP - prevXP) / (nextXP - prevXP)) * 100);
  }, [woodcuttingXP]);

  return (
    <div className="skills-ui">
      <h3>Skills</h3>
      <div className="skill">
        <span>Woodcutting (Lv {woodcuttingLevel})</span>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${xpProgress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Skills;