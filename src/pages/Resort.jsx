// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import About from "../components/Resort/About";
import ListResort from "../components/Resort/ListResort";
const banner =
  "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497253.jpg";

export default function Resort({ resorts }) {
  return (
    <div>
      <Header
        banner={banner}
        title="Resort, paradise of relaxation"
        content="Find comfortable, relaxing resorts, flawless scenery and new
        experiences"
      />
      <About />
      <ListResort resorts={resorts} />
    </div>
  );
}
