// Import Modules
import React from "react";
import classes from "./css/header.module.css";

// Import Components
import FormBooking from "../../UI/FormBooking";
const banner =
  "https://img.freepik.com/free-photo/chinese-asian-night-modern-china-city_1417-875.jpg?t=st=1712995293~exp=1712998893~hmac=eb1b3fcc12c7154178e411dfec015e83c4c7774cfe026927bc85684a173156fd&w=1380";

export default function Header() {
  return (
    <div className={classes.header}>
      <img className={classes["header__img"]} src={banner} alt="banner" />
      <div className={classes["header-introduce"]}>
        <h1 className={classes["intro__title"]}>
          Cities of Vietnam, a Touch of Elegance
        </h1>
        <p className={classes["intro__content"]}>
          Look for cities that are laid-back, friendly, gourmet, and culturally
          unique
        </p>
      </div>
      <FormBooking />
    </div>
  );
}
