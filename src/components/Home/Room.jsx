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

export default function Room({ rooms }) {
  // Create + use Hooks
  const sliceRooms = useMemo(() => rooms.slice(0, 3), [rooms]);
  const navigate = useNavigate();

  // Create + use event Handlers
  const navigateRoomDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`room/${modifiedName}`, { state: { id: id } });
  };

  return (
    <div className={classes.room}>
      <div className={classes["room__container"]}>
        <div className={classes["room__header"]}>
          <Row className={classes["room__row"]}>
            <Col
              className={classes["room__col"]}
              xs={24}
              sm={10}
              md={10}
              lg={10}
              xl={10}
            >
              <h1>The Rooms </h1>
            </Col>
            <Col
              className={classes["room__col"]}
              xs={24}
              sm={10}
              md={10}
              lg={10}
              xl={10}
            >
              <Link to="/rooms">Discover All Rooms</Link>
            </Col>
          </Row>
        </div>
        <div className={classes["room__flex"]}>
          <Row className={classes["room__row"]}>
            {sliceRooms.map((room) => (
              <Col key={room._id} className={classes["room__col"]}>
                <img
                  className={classes["room__img"]}
                  src={room.photos[1]}
                  alt={room.photos[1]}
                />
                <div className={classes["room__card"]}>
                  <h1 className={classes["room__card-name"]}>{room.name}</h1>
                  <div className={classes["room__card-notes"]}>
                    <span className={classes["note-flex"]}>
                      <FaWifi
                        className={`${classes.icon} ${classes["icon-wifi"]}`}
                      />
                      <p className={classes["card__note-wifi"]}>Free</p>
                    </span>
                    <span className={classes["note-flex"]}>
                      <MdOutlineSmokeFree
                        className={`${classes.icon} ${classes["icon-smoke"]}`}
                      />
                      <p className={classes["card__note-smoking"]}>
                        Non-Smoking
                      </p>
                    </span>
                    <span className={classes["note-flex"]}>
                      <LuUsers
                        className={`${classes.icon} ${classes["icon-users"]}`}
                      />
                      <p className={classes["card__note-user"]}>
                        {room.detail.maxPeople} Guests
                      </p>
                    </span>
                    <span className={classes["note-flex"]}>
                      <IoBedOutline
                        className={`${classes.icon} ${classes["icon-bed"]}`}
                      />
                      <p className={classes["card__note-bed"]}>
                        {room.detail.bed}
                      </p>
                    </span>
                  </div>
                  <p className={classes["room__card-desc"]}>
                    {room.size}, located on the west side of the resort in a
                    private tropical garden with a plunge pool and a private
                    outdoor shower.
                  </p>
                </div>
                <div className={classes["room__footer"]}>
                  <button
                    className={classes["room__link"]}
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
