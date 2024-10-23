// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/header.module.css";

// Import Components
import banner from "../../assets/Images Banner/banner-home.jpg";
import FormBooking from "../../UI/FormBooking";

export default function Header({ cities }) {
  // Create + use variables
  const listNameCities = cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  return (
    <div className={classes.header}>
      <img className={classes["header__img"]} src={banner} alt="banner" />

      <div className={classes["header__introduce"]}>
        <h1 className={classes["intro__title"]}>
          Vietnam's Resort Search System
        </h1>
        <p className={classes["intro__content"]}>
          Look for resorts that are comfortable, relaxing, friendly, and
          reasonably priced
        </p>
      </div>

      <FormBooking listNameCities={listNameCities} />
    </div>
  );
}
