// src/data/projects.js

const projects = [
  {
    title: "Azoni AI",
    slug: "azoni-ai",
    description: "Customize AI agents with unique personalities.",
    image: "/projects/seal.png",
    github: "https://github.com/azoni/azoni-package",
    details: `
      <h3>Overview</h3>
      <p>Azoni AI is a platform for creating and interacting with unique AI agents powered by LLMs like GPT-4. Each agent can have its own name, memory, and personality traits.</p>

      <h3>Features</h3>
      <ul>
        <li>Persistent agent memory and mood</li>
        <li>Custom starter messages and prompts</li>
        <li>WebSocket integration with multiplayer world</li>
        <li>Switch between LLMs (OpenAI, DeepSeek, Grok)</li>
      </ul>

      <h3>Stack</h3>
      <p>React, Flask, OpenAI API, PostgreSQL, WebSockets</p>
    `
  },
  {
    title: "A Dawn of Heroes",
    slug: "a-dawn-of-heroes",
    description: "Volunteer developer working on a persistent world in Neverwinter Nights.",
    image: "/projects/nwn.png",
    github: "https://github.com/azoni/adoh-dps",
    details: `
      <h3>About</h3>
      <p>A Dawn of Heroes is a community-driven Neverwinter Nights server focused on long-term progression, immersive storytelling, and quality-of-life enhancements for players. As part of the developer team, I’ve contributed to rebalancing game mechanics, improving player experience, and extending the game's core scripting systems.</p>

      <h3>Highlights</h3>
      <ul>
        <li>
          Reworked weapons and combat to be more balanced and rewarding for all classes.
        </li>
        <li>
          Added custom mechanics such as item prefixes, scaling stats, and environmental triggers using NWScript.
        </li>
        <li>
        Implemented QoL improvements including restructured loot tables, persistent banking, and modular NPC behaviors.
        </li>
      </ul>

      <h3>Stack</h3>
      <p>NWScript (Neverwinter’s scripting language)</p>
      <p>Object-Oriented Design</p>
      <p>Python (for external tools and automation)</p>
    `
  },
  {
    title: "DustBunny",
    slug: "dustbunny",
    description: "OpenSea bidding platform built for speed and automation.",
    image: "/projects/opensea.png",
    github: "https://github.com/azoni/dustbunny",
    images: [
      "/projects/dustbunny1.png",
      "/projects/dustbunny2.png",
      "/projects/dustbunny3.png",
    ],
    details: `
      <h3>Overview</h3>
      <p>DustBunny is a Python-based bidding bot for OpenSea that helps place and manage bids on NFT collections at scale.</p>

      <h3>Features</h3>
      <ul>
        <li>Live floor tracking</li>
        <li>Automated bid rotation</li>
        <li>Gas optimization and failure handling</li>
      </ul>

      <h3>Stack</h3>
      <p>Python, Web3.py, Redis, Etherscan API</p>
    `
  },
  {
    title: "Oli Fitness",
    slug: "oli-fitness",
    description: "Startup fitness platform for community-driven workouts and progress tracking.",
    image: "/projects/oli.png",
    github: "https://github.com/azoni/oli",
    details: `
      <h3>What It Is</h3>
      <p>Built for a startup, this platform allows users to log fitness sessions, view their analytics, and share workouts socially.</p>

      <h3>Features</h3>
      <ul>
        <li>Personal dashboards</li>
        <li>Community leaderboards</li>
        <li></li>
      </ul>
    `
  },
  {
    title: "HashMaps",
    slug: "hashmaps",
    description: "T-Mobile Hackathon",
    image: "/projects/tmobile.png",
    github: "https://github.com/azoni/hashmaps",
    images: [
      "/projects/tmobile1.png",
    ],
    details: `
      <h3>About</h3>
      <p>Hackathon 1st place</p>

      <h3>Highlights</h3>
      <ul>
        <li>Real-time geolocation of users</li>
        <li></li>
        <li></li>
      </ul>

      <h3>Built With</h3>
      <p>React Native, Firebase, Google Maps</p>
    `
  }
];

export default projects;
