// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/about.module.css";

// Import Components
import SlideImage from "../../UI/SlideImage";
import LogoCity from "../../assets/resort.png";

// Import Images
import ImageCity1 from "../../assets/Images Resort/imageResort1.jpg";
import ImageCity2 from "../../assets/Images Resort/imageResort2.webp";
import ImageCity3 from "../../assets/Images Resort/imageResort3.jpg";
import ImageCity4 from "../../assets/Images Resort/imageResort4.jpg";

export default function About() {
  // Create + use variables
  const dataImageCity = [ImageCity1, ImageCity2, ImageCity3, ImageCity4];

  return (
    <div className={classes.about}>
      <div className={classes["about__container"]}>
        <img src={LogoCity} alt="logoCity" />
        <h1 className={classes["about__title"]}>Resorts in Vietnam</h1>
        <p className={classes["about__content"]}>
          Vietnam has many resorts with unique styles, bringing with them the
          unique culture of each city, giving us many new experiences in
          culture, cuisine, fashion, and architecture. Come here and rest at the
          resorts.
        </p>
      </div>
      <SlideImage images={dataImageCity} />
    </div>
  );
}
