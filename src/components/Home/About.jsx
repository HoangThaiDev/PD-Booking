// Import Modules
import React from "react";
import "./css/about.css";

// Import Components
import logoHotel from "../../assets/resort.png";
import SlideImageHotel from "./SlideImageHotel";

export default function About() {
  return (
    <div id="about">
      <div className="about-container">
        <img src={logoHotel} alt="logo" />
        <p className="about__content">WELCOME TO PARADISE SYSTEM</p>
        <h1 className="about__title">
          Discover the Perfect Getaway in Vietnam
        </h1>
        <p className="about__desc">
          PARADISE is a unique online platform, providing search and booking
          services for resorts in Vietnam. With PARADISE, visitors can easily
          discover and choose great vacation destinations, from beautiful but
          pristine coastal resorts to luxury resorts in the middle of a vibrant
          city.
        </p>
      </div>
      <SlideImageHotel />
    </div>
  );
}
