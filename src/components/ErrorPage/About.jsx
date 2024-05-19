// Import Modules
import React from "react";
import classes from "./css/about.module.css";

// Import Components
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className={classes["about__container"]}>
      <h1 className={classes["about__title"]}>Page Not Found</h1>
      <p className={classes["about__content"]}>
        Sorry but we couldn't find the page you are looking for. It might have
        been moved or deleted.
      </p>
      <Link to="/" className={classes["about__link"]}>
        Back to Home
      </Link>
    </div>
  );
}
