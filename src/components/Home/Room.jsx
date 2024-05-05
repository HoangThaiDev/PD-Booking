// Import Modules
import React, { useMemo } from "react";
import classes from "./css/room.module.css";

// Import Components
import { Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";

// Import Icons
import { FaWifi } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineSmokeFree } from "react-icons/md";
import { LuUsers } from "react-icons/lu";

export default function Room({ room }) {
  // Create + use Hooks
  const sliceRoom = useMemo(() => room.slice(0, 3), [room]);
  const navigate = useNavigate();

  // Create + use event Handlers
  const navigateRoomDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`room/${modifiedName}`, { state: { id: id } });
  };

  return (
    <div className={classes.room}>
      <div className={classes["room-container"]}>
        <div className={classes["room-header"]}>
          <Row className={classes["room-header__row"]}>
            <Col className={classes["room-header__col"]} xl={10}>
              <h1>The Rooms </h1>
            </Col>
            <Col className={classes["room-header__col"]} xl={10}>
              <Link to="rooms">Discover All Rooms</Link>
            </Col>
          </Row>
        </div>
        <div className={classes["room-flex"]}>
          <Row className={classes["room-row"]}>
            {sliceRoom.map((room) => (
              <Col key={room._id} className={classes["room-col"]}>
                <img
                  className={classes["room-img"]}
                  src={room.photos[1]}
                  alt={room.photos[1]}
                />
                <div className={classes["room-card"]}>
                  <h1 className={classes["room-card-name"]}>{room.name}</h1>
                  <div className={classes["room-card-notes"]}>
                    <p className={classes["card-note-wifi"]}>
                      <FaWifi
                        className={`${classes.icon} ${classes["icon-wifi"]}`}
                      />
                      Free
                    </p>
                    <p className={classes["card-note-smoking"]}>
                      <MdOutlineSmokeFree
                        className={`${classes.icon} ${classes["icon-smoke"]}`}
                      />
                      Non-Smoking
                    </p>
                    <p className={classes["card-note-user"]}>
                      <LuUsers
                        className={`${classes.icon} ${classes["icon-users"]}`}
                      />
                      {room.detail.maxPeople} Guests
                    </p>
                    <p className={classes["card-note-bed"]}>
                      <IoBedOutline
                        className={`${classes.icon} ${classes["icon-bed"]}`}
                      />
                      {room.detail.bed}
                    </p>
                  </div>
                  <p className={classes["room-card-desc"]}>
                    {room.size}, located on the west side of the resort in a
                    private tropical garden with a plunge pool and a private
                    outdoor shower.
                  </p>
                </div>
                <div>
                  <button
                    className={classes["room-link"]}
                    onClick={() =>
                      navigateRoomDetailHandler(room._id, room.name)
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
