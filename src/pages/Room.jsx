// Import Modules
import React from "react";

// Import Hooks
import { useSelector } from "react-redux";

// Import Components
import Header from "../UI/Header";
import About from "../components/Room/About";
import ListRoom from "../components/Room/ListRoom";
import banner from "../assets/Images Banner/banner-room.jpg";

export default function Room({ rooms, cities }) {
  // Create + use Hooks
  const filteredRooms = useSelector((state) => state.updatedRoom.rooms);

  return (
    <div>
      <Header
        banner={banner}
        title="Rooms, a heavenly place to relax"
        content="Look for rooms that are relaxing, comfortable, convenient, and have
        beautiful views"
        cities={cities}
      />
      <About />
      <ListRoom rooms={rooms} filteredRooms={filteredRooms} />
    </div>
  );
}
