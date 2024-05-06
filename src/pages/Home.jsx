// Import Modules
import classes from "./css/home.module.css";

// Import Components
import About from "../components/Home/About";
import City from "../components/Home/City";
import Resort from "../components/Home/Resort";
import Room from "../components/Home/Room";
import Header from "../components/Home/Header";

export default function Home({ city, resort, room }) {
  return (
    <div className={classes.home}>
      <Header />
      <About />
      {/* <City city={city} /> */}
      {/* <Resort resort={resort} /> */}
      {/* <Room room={room} /> */}
    </div>
  );
}
