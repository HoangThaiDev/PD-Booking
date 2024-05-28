// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/about.module.css";

// Import Components
import SlideImage from "../../UI/SlideImage";
import LogoRoom from "../../assets/bed.png";

// Import Images
import ImageCity1 from "../../assets/Images Room/imageRoom1.avif";
import ImageCity2 from "../../assets/Images Room/imageRoom2.avif";
import ImageCity3 from "../../assets/Images Room/imageRoom3.jpg";
import ImageCity4 from "../../assets/Images Room/imageRoom4.jpg";

export default function About() {
  // Create + use variables
  const dataImageCity = [ImageCity1, ImageCity2, ImageCity3, ImageCity4];

  return (
    <div className={classes.about}>
      <div className={classes["about__container"]}>
        <img src={LogoRoom} alt="logoRoom" />
        <h1 className={classes["about__title"]}>Rooms in Resorts</h1>
        <p className={classes["about__content"]}>
          Here, you can search for room types according to your needs, style,
          environment and beautiful scenery to enjoy and relax. Come here and
          search!
        </p>
      </div>
      <SlideImage images={dataImageCity} />
    </div>
  );
}
