// Import Modules
import React from "react";
import classes from "./css/about.module.css";

// Import Components
import SlideImage from "../../UI/SlideImage";
import LogoCity from "../../assets/buildings.png";

// Import Images
import ImageCity1 from "../../assets/Images City/ImageCity2.webp";
import ImageCity2 from "../../assets/Images City/imageCity2.jpg";
import ImageCity3 from "../../assets/Images City/ImageCity3.jpg";
import ImageCity4 from "../../assets/Images City/ImageCity4.jpg";

export default function About() {
  const dataImageCity = [ImageCity1, ImageCity2, ImageCity3, ImageCity4];

  // Create + use Hooks

  // Create + use event Handlers

  return (
    <div className={classes.about}>
      <div className={classes["about__container"]}>
        <img src={LogoCity} alt="logoCity" />
        <h1 className={classes["about__title"]}>Cities in Vietnam</h1>
        <p className={classes["about__content"]}>
          Vietnam is a country with many cities known for their unique beauty,
          renowned for its exceptional cuisine and rich cultural heritage. Each
          city offers a distinct experience with its own characteristic
          features. Come and explore!
        </p>
      </div>
      <SlideImage images={dataImageCity} />
    </div>
  );
}
