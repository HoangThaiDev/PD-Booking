// Import Modules
import classes from "./css/home.module.css";

// Import Components
import About from "../components/Home/About";
import City from "../components/Home/City";
import Resort from "../components/Home/Resort";
import Room from "../components/Home/Room";
import Header from "../components/Home/Header";

export default function Home({ cities, resorts, rooms }) {
  return (
    <div className={classes.home}>
      <Header cities={cities} />
      <About />
      <City cities={cities} />
      <Resort resorts={resorts} />
      <Room rooms={rooms} />
    </div>
  );
}
