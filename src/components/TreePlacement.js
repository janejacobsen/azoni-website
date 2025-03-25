import React, { useState, useEffect } from "react";

const treeData = [
  { image: "/trees/tree1.png", size: 40, chopTime: 3 },
  { image: "/trees/tree2.png", size: 45, chopTime: 4 },
  { image: "/trees/tree3.png", size: 50, chopTime: 5 },
  { image: "/trees/tree4.png", size: 35, chopTime: 3 },
  { image: "/trees/tree5.png", size: 55, chopTime: 6 },
  { image: "/trees/tree6.png", size: 42, chopTime: 4 },
  { image: "/trees/tree7.png", size: 48, chopTime: 5 },
  { image: "/trees/tree8.png", size: 38, chopTime: 3 },
  { image: "/trees/tree9.png", size: 52, chopTime: 6 },
  { image: "/trees/tree10.png", size: 60, chopTime: 7 },
];

const Tree = ({ x, y, image, size, chopTime, playerX, playerY, onChop }) => {
  const [chopping, setChopping] = useState(false);
  const [progress, setProgress] = useState(0);

  const startChopping = () => {
    // const distance = Math.sqrt((playerX - (x + size / 2)) ** 2 + (playerY - (y + size / 2)) ** 2);
    console.log(playerX, playerY)
    console.log(x, y)
    if (Math.abs(x - playerX) > 75 || Math.abs(y - playerY) > 75) {
      console.log("Too far to chop this tree.");
      return;
    }

    if (!chopping) {
      setChopping(true);
      let timeElapsed = 0;
      const interval = setInterval(() => {
        timeElapsed += 100;
        setProgress((timeElapsed / (chopTime * 1000)) * 100);
        if (timeElapsed >= chopTime * 1000) {
          clearInterval(interval);
          setChopping(false);
          setProgress(0);
          onChop();
        }
      }, 100);
    }
  };

  return (
    <div
      onClick={startChopping}
      style={{
        position: "absolute",
        left: Math.max(0, Math.min(x, window.innerWidth - size)),
        top: Math.max(0, Math.min(y, window.innerHeight - size)),
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        cursor: "pointer",
      }}
    >
      {chopping && (
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "5px",
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "limegreen",
              transition: "width 0.1s linear",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

const TreePlacement = ({ trees, setTrees, playerX, playerY, onChopTree }) => {

  useEffect(() => {
    if (trees.length === 0) {
      const staticTrees = [
        { x: 1280, y: 520 },
        { x: 1240, y: 500 },
        { x: 1200, y: 560 },
        { x: 1160, y: 480 },
      ].map(tree => {
        const treeType = treeData[Math.floor(Math.random() * treeData.length)];
        return { ...tree, image: treeType.image, size: treeType.size, chopTime: treeType.chopTime };
      });

      const randomTrees = Array.from({ length: 5 }).map(() => {
        const treeType = treeData[Math.floor(Math.random() * treeData.length)];
        return {
          x: Math.random() * (1400 - 50) + 50, // Random X between 50 and 1400
          y: Math.random() * (700 - 50) + 50,  // Random Y between 50 and 700
          image: treeType.image,
          size: treeType.size,
          chopTime: treeType.chopTime,
        };
      });

      setTrees([...staticTrees, ...randomTrees]);
    }
  }, []);

  const handleChop = (index) => {
    const choppedTree = trees[index];
    onChopTree(choppedTree); // Award XP & inventory update

    // Remove tree from state
    setTrees(prevTrees => prevTrees.filter((_, i) => i !== index));

    // Respawn tree after delay
    setTimeout(() => {
      const treeType = treeData[Math.floor(Math.random() * treeData.length)];
      setTrees(prevTrees => [...prevTrees, {
        x: Math.random() * (1400 - 50) + 50,
        y: Math.random() * (700 - 50) + 50,
        image: treeType.image,
        size: treeType.size,
        chopTime: treeType.chopTime,
      }]);
    }, 30000); // Respawn after 30 seconds
  };

  return (
    <>
      {trees.map((tree, index) => (
        <Tree key={index} x={tree.x} y={tree.y} image={tree.image} size={tree.size} chopTime={tree.chopTime} playerX={playerX} playerY={playerY} onChop={() => handleChop(index)} />
      ))}
    </>
  );
};

export default TreePlacement;
