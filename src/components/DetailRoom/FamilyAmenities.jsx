// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/familyAmenities.module.css";

// Import Logos
import LogoPool from "../../assets/Images Room/Logo Room/swimming-pool.png";
import LogoBabyCrital from "../../assets/Images Room/Logo Room/baby-crib.png";
import LogoWashingMachine from "../../assets/Images Room/Logo Room/washing-machine.png";

export default function FamilyAmenities() {
  // Create Array Content + Logo JSX
  const DUMMY_FAMILY_AMENITIES = [
    {
      id: "1",
      img: LogoPool,
      content: "Kids Swimming Pool",
    },
    {
      id: "2",
      img: LogoBabyCrital,
      content: "Extra Beds/Baby Crib",
    },
    {
      id: "3",
      img: LogoWashingMachine,
      content: "Washing Machine",
    },
  ];

  return (
    <div className={classes["family-amenities"]}>
      <h3>Family-friendly Amenities</h3>
      <div className={classes["amenities__list"]}>
        {DUMMY_FAMILY_AMENITIES.map((amenity) => (
          <div className={classes["amenity__item"]} key={amenity.id}>
            <img src={amenity.img} alt={amenity.img} />
            <p>{amenity.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
