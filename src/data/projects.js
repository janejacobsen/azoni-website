// src/data/projects.js

const projects = [
  {
    title: "Azoni AI",
    slug: "azoni-ai",
    description: "Customize AI agents with unique personalities.",
    image: "/projects/seal.png",
    images: [
      "/projects/ape.png",
      "/projects/bear.png",
    ],
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
      <p></p>

      <h3>Highlights</h3>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <h3>Stack</h3>
      <p>Python</p>
    `
  },
  {
    title: "DustBunny",
    slug: "dustbunny",
    description: "OpenSea bidding platform built for speed and automation.",
    image: "/projects/opensea.png",
    github: "https://github.com/azoni/dustbunny",
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
      "/projects/ape.png",
      "/projects/bear.png",
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
