import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TryAzoni from "../components/TryAzoni";
import "../styles/App.css";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <section className="card">
          <h2 className="card-title">Under construction! This website does nothing.</h2>
          <p className="card-text">
            Azoni AI is a Python library that enables you to customize AI agents
            with unique personalities and behaviors.
          </p>
          <button className="btn learn-more">Learn More</button>
        </section>
        <section className="card">
          <h2 className="card-title">Install Azoni AI</h2>
          <p className="card-text">Run this command:</p>
          <div className="code-block">pip install azoni</div>
        </section>
      </main>
      <TryAzoni />
      <Footer />
    </div>
  );
};

export default Home;
