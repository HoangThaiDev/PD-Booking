// Import Modules
import React from "react";
import classes from "./css/about.module.css";

// Import Components
import logoHotel from "../../assets/resort.png";
import SlideImage from "../../UI/SlideImage";

// Import Images Hotel
import image1 from "../../assets/Images Hotel/img-75-683x1024.jpg";
import image2 from "../../assets/Images Hotel/img-76-683x1024.jpg";
import image3 from "../../assets/Images Hotel/img-77-1-683x1024.jpg";
import image4 from "../../assets/Images Hotel/img-78-1-683x1024.jpg";

export default function About() {
  const dataImagesBackground = [image1, image2, image3, image4];
  return (
    <div className={classes.about}>
      <div className={classes["about-container"]}>
        <img src={logoHotel} alt="logo" />
        <p className={classes["about__content"]}>WELCOME TO PARADISE SYSTEM</p>
        <h1 className={classes["about__title"]}>
          Discover the Perfect Getaway in Vietnam
        </h1>
        <p className={classes["about__desc"]}>
          PARADISE is a unique online platform, providing search and booking
          services for resorts in Vietnam. With PARADISE, visitors can easily
          discover and choose great vacation destinations, from beautiful but
          pristine coastal resorts to luxury resorts in the middle of a vibrant
          city.
        </p>
      </div>
      <SlideImage images={dataImagesBackground} />
    </div>
  );
}
