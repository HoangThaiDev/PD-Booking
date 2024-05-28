// Import Modules
import axios from "axios";
import { API_ROOT } from "../../utils/constant";

// Import Hooks
import React, { useState } from "react";

// Import File CSS
import classes from "./css/about.module.css";

// Import Components
import { Row, Col } from "antd";
import ListRoom from "../Room/ListRoom";

export default function About({ resort }) {
  // Create + use Hooks
  const [indexImage, setIndexImage] = useState(0);
  const [showRooms, setShowRooms] = useState(false);
  const [typeRooms, setTypeRooms] = useState([]);

  // Create + use event Handlers
  const changeImageHandler = (index) => {
    setIndexImage(index);
  };

  const navigateRoomHandler = async () => {
    try {
      const { data } = await axios.post(`${API_ROOT}/resorts/detail/rooms`, {
        roomIds: resort.rooms,
      });
      setTypeRooms(data);
      setShowRooms(!showRooms);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.about}>
      <div className={classes["about__container"]}>
        <Row className={classes["about__row"]}>
          <Col
            className={classes["about__col"]}
            xs={24}
            sm={24}
            md={11}
            xl={12}
          >
            <div className={classes["about__resort"]}>
              <div className={classes["resort__card"]}>
                <h3 className={classes["card__name"]}>{resort.name}</h3>
                <div className={classes["card__description"]}>
                  <h4 className={classes["desc-title"]}>Description Resort</h4>
                  <p className={classes["desc-content"]}>{resort.desc}</p>
                </div>
                <div className={classes["card__information"]}>
                  <h4 className={classes["info-title"]}>Information Resort</h4>
                  <p className={classes["info__address"]}>
                    Address: <span>{resort.address}</span>
                  </p>
                  <p className={classes["info__price"]}>
                    From: <span>{resort.cheapestPrice} VNĐ / Night</span>
                  </p>
                  <p className={classes["info__rating"]}>
                    Rating: <span>{resort.rating}</span>
                  </p>
                  <p className={classes["info__rooms"]}>
                    Type Rooms: <span>{resort.rooms.length}</span>
                  </p>
                  <button
                    className={classes["btn-view"]}
                    type="button"
                    onClick={() => navigateRoomHandler()}
                  >
                    {!showRooms ? "Show Rooms" : "Close Room"}
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col
            className={classes["about__col"]}
            xs={24}
            sm={24}
            md={12}
            xl={11}
          >
            <img
              className={classes["image-active"]}
              src={resort.photos[indexImage]}
              alt="current-image-resort"
            />
            <div className={classes["image__list"]}>
              {resort.photos.map((r, i) => (
                <div key={i}>
                  <img
                    className={classes["image__item"]}
                    src={resort.photos[i]}
                    alt={resort.photos[i]}
                    onClick={() => changeImageHandler(i)}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
        {showRooms && typeRooms.length > 0 && (
          <div className={classes["room__list"]}>
            <ListRoom rooms={typeRooms} stateShowAddressDetail={false} />
          </div>
        )}
      </div>
    </div>
  );
}
