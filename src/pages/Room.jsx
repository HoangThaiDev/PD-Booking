// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import About from "../components/Room/About";
import ListResort from "../components/Room/ListRoom";
const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/04/spacejoy-FX61rYaAfCQ-unsplash.jpg";

export default function Room({ room }) {
  return (
    <div>
      <Header
        banner={banner}
        title="Rooms, a heavenly place to relax"
        content="Look for rooms that are relaxing, comfortable, convenient, and have
        beautiful views"
      />
      <About />
      <ListResort room={room} />
    </div>
  );
}
