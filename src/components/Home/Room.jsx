// Import Modules
import React, { useEffect, useState } from "react";
import "./css/room.css";
import axios from "axios";

// Import Components
import { Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";

// Import Icons
import { FaWifi } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineSmokeFree } from "react-icons/md";
import { LuUsers } from "react-icons/lu";

export default function Room() {
  // Create + use Hooks
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/rooms");
        const modifiedRooms = data.slice(0, 3);
        setRooms(modifiedRooms);
        setIsLoading(!isLoading);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, []);

  // Create + use event Handlers
  const navigateResortDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`city/${modifiedName}`, { state: id });
  };

  return (
    <div id="room">
      <div className="room-container">
        <div className="room-header">
          <Row className="room-header__row">
            <Col className="room-header__col" xl={10}>
              <h1>The Rooms </h1>
            </Col>
            <Col className="room-header__col" xl={10}>
              <Link to="rooms">Discover All Rooms</Link>
            </Col>
          </Row>
        </div>
        <div className="room-flex">
          <Row className="room-row">
            {isLoading &&
              rooms.length > 0 &&
              rooms.map((room) => (
                <Col key={room._id} className="room-col">
                  <img
                    className="room-img"
                    src={room.photos[1]}
                    alt={room.photos[1]}
                  />
                  <div className="room-card">
                    <h1 className="room-card-name">{room.name}</h1>
                    <div className="room-card-notes">
                      <p className="card-note-wifi">
                        <FaWifi className="icon icon-wifi" />
                        Free
                      </p>
                      <p className="card-note-smoking">
                        <MdOutlineSmokeFree className="icon icon-smoke" />
                        Non-Smoking
                      </p>
                      <p className="card-note-user">
                        <LuUsers className="icon icon-users" />
                        {room.detail.maxPeople} Guests
                      </p>
                      <p className="card-note-bed">
                        <IoBedOutline className="icon icon-bed" />
                        {room.detail.bed}
                      </p>
                    </div>
                    <p className="room-card-desc">
                      {room.size}, located on the west side of the resort in a
                      private tropical garden with a plunge pool and a private
                      outdoor shower.
                    </p>
                  </div>
                  <div>
                    <button
                      className="room-link"
                      onClick={() =>
                        navigateResortDetailHandler(room._id, room.name)
                      }
                    >
                      Discover More
                    </button>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
