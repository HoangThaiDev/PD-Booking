// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import About from "../components/Resort/About";
import ListResort from "../components/Resort/ListResort";
const banner =
  "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497253.jpg?t=st=1713162857~exp=1713166457~hmac=bab9be026e53af31930aae829b587163d0502fa14ac4fc7d352b395c34837119&w=1380";

export default function Resort({ resort }) {
  return (
    <div>
      <Header
        banner={banner}
        title="Resort, paradise of relaxation"
        content="Find comfortable, relaxing resorts, flawless scenery and new
        experiences"
      />
      <About />
      <ListResort resort={resort} />
    </div>
  );
}
