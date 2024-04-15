// Import Modules
import React from "react";
import classes from "./css/header.module.css";

// Import Components
import FormBooking from "../Home/FormBooking";
const banner =
  "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497253.jpg?t=st=1713162857~exp=1713166457~hmac=bab9be026e53af31930aae829b587163d0502fa14ac4fc7d352b395c34837119&w=1380";

export default function Header() {
  return (
    <div className={classes.header}>
      <img className={classes["header__img"]} src={banner} alt="banner" />
      <div className={classes["header-introduce"]}>
        <h1 className={classes["intro__title"]}>
          Resort, paradise of relaxation
        </h1>
        <p className={classes["intro__content"]}>
          Find comfortable, relaxing resorts, flawless scenery and new
          experiences
        </p>
      </div>
      <FormBooking />
    </div>
  );
}
