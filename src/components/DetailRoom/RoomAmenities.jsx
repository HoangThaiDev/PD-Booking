// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/roomAmenities.module.css";

// Import Logos
import AirConditioner from "../../assets/Images Room/room Amenities/air-conditioner.png";
import Wifi from "../../assets/Images Room/room Amenities/wifi-signal.png";
import Slipper from "../../assets/Images Room/room Amenities/slippers.png";
import Shampoo from "../../assets/Images Room/room Amenities/shampoo.png";
import Pet from "../../assets/Images Room/room Amenities/veterinary.png";
import TV from "../../assets/Images Room/room Amenities/tv-monitor.png";
import Towels from "../../assets/Images Room/room Amenities/towel.png";
import HairDryer from "../../assets/Images Room/room Amenities/hair-dryer.png";
import CoffeeMachine from "../../assets/Images Room/room Amenities/coffee-machine.png";
import WelcomDrink from "../../assets/Images Room/room Amenities/welcome-drink.png";

// Create Array Content + Logo JSX
const DUMMY_ROOM_AMENITIES = [
  {
    id: "1",
    img: AirConditioner,
    content: "Air conditioner",
  },
  {
    id: "2",
    img: Wifi,
    content: "Wifi & Internet",
  },
  {
    id: "3",
    img: Slipper,
    content: "Slippers",
  },
  {
    id: "4",
    img: Shampoo,
    content: "Shampoo",
  },
  {
    id: "5",
    img: Pet,
    content: "Pet Friendly",
  },
  {
    id: "6",
    img: TV,
    content: "Cable TV",
  },
  {
    id: "7",
    img: Towels,
    content: "Towels",
  },
  {
    id: "8",
    img: HairDryer,
    content: "Hair Dryer",
  },
  {
    id: "9",
    img: CoffeeMachine,
    content: "Espresso Machine",
  },
  {
    id: "10",
    img: WelcomDrink,
    content: "Welcome Drinks",
  },
];

export default function FamilyAmenities() {
  return (
    <div className={classes["room-amenities"]}>
      <h3>Room Amenities</h3>
      <div className={classes["amenities__list"]}>
        {DUMMY_ROOM_AMENITIES.map((amenity) => (
          <div className={classes["amenity__item"]} key={amenity.id}>
            <img src={amenity.img} alt={amenity.img} />
            <p>{amenity.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
