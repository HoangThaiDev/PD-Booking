// Import Modules
import React from "react";
import classes from "./css/city.module.css";

// Import Components
import Header from "../components/City/Header";
import About from "../components/City/About";
import ListCity from "../components/City/ListCity";

export default function City({ city }) {
  return (
    <div className={classes.city}>
      <Header />
      <About />
      <ListCity city={city} />
    </div>
  );
}
