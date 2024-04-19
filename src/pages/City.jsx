// Import Modules
import React from "react";
import classes from "./css/city.module.css";

// Import Components
import Header from "../UI/Header";
import About from "../components/City/About";
import ListCity from "../components/City/ListCity";
const banner =
  "https://img.freepik.com/free-photo/chinese-asian-night-modern-china-city_1417-875.jpg?t=st=1712995293~exp=1712998893~hmac=eb1b3fcc12c7154178e411dfec015e83c4c7774cfe026927bc85684a173156fd&w=1380";

export default function City({ city }) {
  return (
    <div className={classes.city}>
      <Header
        banner={banner}
        title="Cities of Vietnam, a Touch of Elegance"
        content="Look for cities that are laid-back, friendly, gourmet, and culturally
        unique"
      />
      <About />
      <ListCity city={city} />
    </div>
  );
}
