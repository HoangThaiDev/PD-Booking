// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import About from "../components/City/About";
import ListCity from "../components/City/ListCity";
const banner =
  "https://a.storyblok.com/f/88871/1408x744/8f2b7c30e8/chongqing-headerbild-jpg.jpg";

export default function City({ cities }) {
  return (
    <div className="city">
      <Header
        banner={banner}
        title="Cities of Vietnam, a Touch of Elegance"
        content="Look for cities that are laid-back, friendly, gourmet, and culturally
        unique"
      />
      <About />
      <ListCity cities={cities} />
    </div>
  );
}
