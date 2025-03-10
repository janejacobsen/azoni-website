import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TryAzoni from "../components/TryAzoni";
import GameCanvas from "../components/GameCanvas";

import "../styles/App.css";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <section className="card">
          <h2 className="game-title">Home</h2>
          <GameCanvas />
        </section>
      </main>
      <TryAzoni />
      <Footer />
    </div>
  );
};

export default Home;
