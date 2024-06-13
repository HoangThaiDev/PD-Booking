// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import About from "../components/City/About";
import ListCity from "../components/City/ListCity";
import banner from "../assets/Images Banner/banner-city.jpg";

export default function City({ cities }) {
  return (
    <div className="city">
      <Header
        banner={banner}
        title="Cities of Vietnam, a Touch of Elegance"
        content="Look for cities that are laid-back, friendly, gourmet, and culturally
        unique"
        cities={cities}
      />

      <About />
      <ListCity cities={cities} />
    </div>
  );
}
