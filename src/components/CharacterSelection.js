import React, { useState } from "react";
import "../styles/CharacterSelection.css"; // ✅ Import new styles

const defaultAvatars = [
  "/avatars/sack.png",
  "/avatars/seal.png",
];

const CharacterSelection = ({ onConfirm }) => {
  const [playerName, setPlayerName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatars[0]);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);

  const handleAvatarSelect = (avatar) => {
    setUploadedAvatar(null);
    setSelectedAvatar(avatar);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedAvatar(e.target.result);
        setSelectedAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && playerName.trim() !== "" && selectedAvatar) {
      onConfirm(playerName, selectedAvatar);
    }
  };

  return (
    <div className="character-selection">
      <h2>Select Your Avatar</h2>
      <input
        type="text"
        placeholder="Enter your name..."
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onKeyDown={handleKeyPress}
        className="name-input"
      />

      <div className="avatar-options">
        {defaultAvatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={`avatar ${selectedAvatar === avatar ? "selected" : ""}`}
            onClick={() => handleAvatarSelect(avatar)}
          />
        ))}
      </div>

      <div className="upload-section">
        <p>Or upload your own:</p>
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
      </div>

      {uploadedAvatar && (
        <div className="avatar-preview">
          <img src={uploadedAvatar} alt="Uploaded Avatar" className="avatar" />
        </div>
      )}

      <button className="confirm-button" onClick={() => onConfirm(playerName, selectedAvatar)}>
        Start Game
      </button>
    </div>
  );
};

export default CharacterSelection;
