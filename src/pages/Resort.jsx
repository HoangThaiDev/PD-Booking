// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import About from "../components/Resort/About";
import ListResort from "../components/Resort/ListResort";
import banner from "../assets/Images Banner/banner-resort.webp";

export default function Resort({ cities, resorts }) {
  return (
    <div>
      <Header
        banner={banner}
        title="Resort, paradise of relaxation"
        content="Find comfortable, relaxing resorts, flawless scenery and new
        experiences"
        cities={cities}
      />
      <About />
      <ListResort resorts={resorts} />
    </div>
  );
}
