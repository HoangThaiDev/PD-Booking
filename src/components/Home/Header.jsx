// Import Modules
import React from "react";
import classes from "./css/header.module.css";

// Import Components
import banner from "../../assets/banner.jpg";
import FormBooking from "../../UI/FormBooking";
import { Link } from "react-router-dom";

export default function Header() {
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
        {/* Link Mobile Booking */}
        <div className={classes["introduce__footer"]}>
          <Link to="/rooms" className={classes["btn-booking"]}>
            Book Your Stay
          </Link>
        </div>
      </div>

      <div className={classes.formBooking}>
        <FormBooking />
      </div>
    </div>
  );
}
