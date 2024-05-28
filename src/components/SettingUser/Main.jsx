// Import Hooks
import React from "react";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/main.module.css";

export default function Main() {
  // Create + use Hooks
  const { user } = useSelector((state) => state.user);

  return (
    <div className={classes.main}>
      <div className={classes["main__container"]}>
        <h1 className={classes["main__title"]}>
          Hi {user.username}. Wellcome to my Paradise!
        </h1>
        <p></p>
      </div>
    </div>
  );
}
