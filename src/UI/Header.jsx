// Import Modules
import React from "react";
import classes from "./css/header.module.css";

// Import Components
import FormBooking from "./FormBooking";

export default function Header({
  banner,
  title,
  content,
  showFormBooking = true,
}) {
  return (
    <div className={classes.header}>
      <img className={classes["header__img"]} src={banner} alt="banner" />
      <div className={classes["header__introduce"]}>
        <h1 className={classes["intro__title"]}>{title}</h1>
        <p className={classes["intro__content"]}>{content}</p>
      </div>
      {showFormBooking && <FormBooking />}
    </div>
  );
}
