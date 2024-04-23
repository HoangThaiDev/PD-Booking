// Import Modules
import React, { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Import Components
import About from "../components/DetailRoom/About";
import Header from "../UI/Header";

function DetailRoom() {
  // Create + use Hooks
  const { state } = useLocation();
  const [room, setRoom] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetailRoom = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/rooms/detail/${state.id}`
        );

        setRoom(data);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailRoom();
  }, [state.id]);

  return (
    <div>
      {isLoading && Object.keys(room).length > 0 && (
        <>
          <Header
            banner={room.photos[0]}
            title="Detail Room"
            content="The room is filled with style, design, color, coolness and comfort"
            showFormBooking={false}
          />
          <About room={room} />
        </>
      )}
    </div>
  );
}

export default memo(DetailRoom);
