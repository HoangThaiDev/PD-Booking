// Import Modules
import React from "react";
import "./css/about.css";

// Import Components
import logoHotel from "../../assets/resort.png";

export default function About() {
  return (
    <div id="about">
      <div className="about-container">
        <img src={logoHotel} alt="logo" />
        <p className="about__content">WELCOME TO PARADISE RESORT</p>
        <h1 className="about__title">
          In the Heart of the South Pacific, Outstanding Views
        </h1>
        <p className="about__desc">
          Nestled in the heart of the Pacific Islands resort, on the edge of a
          tranquil and beautiful Garden Island, Paradise is a haven of warmth,
          tranquility and rejuvenation. Bathed in brilliant sunshine and clear
          skies, it offers stunning views of palm-lined beaches and gorgeous
          coral reefs.
        </p>
      </div>
    </div>
  );
}
