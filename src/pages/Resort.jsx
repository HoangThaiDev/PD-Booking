// Import Modules
import React from "react";

// Import Components
import Header from "../components/Resort/Header";
import About from "../components/Resort/About";
import ListResort from "../components/Resort/ListResort";

export default function Resort({ resort }) {
  return (
    <div>
      <Header />
      <About />
      <ListResort resort={resort} />
    </div>
  );
}
