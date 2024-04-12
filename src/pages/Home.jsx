// Import Modules
import React from "react";
import "./css/home.css";

// Import Components
import About from "../components/Home/About";
import City from "../components/Home/City";
import Resort from "../components/Home/Resort";
import Room from "../components/Home/Room";

export default function Home() {
  return (
    <div id="home">
      <About />
      <City />
      <Resort />
      <Room />
    </div>
  );
}
