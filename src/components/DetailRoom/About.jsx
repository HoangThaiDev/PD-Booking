// Import Modules
import React from "react";
import classes from "./css/about.module.css";

// Import Components
import { Row, Col } from "antd";
import FamilyAmenities from "./FamilyAmenities";
import RoomAmenities from "./RoomAmenities";

// Import Icons
import { FaWifi } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineSmokeFree } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import FormBooking from "./FormBooking";

export default function About({ room }) {
  return (
    <div className={classes.about}>
      <div className={classes["about__container"]}>
        <Row className={classes["about__row"]}>
          <Col className={classes["about__col"]} xl={14}>
            <h2 className={classes["about__name"]}>{room.name}</h2>
            <p className={classes["about__breakcrum"]}>
              Private Pool / Ocean View / Single Level
            </p>
            <div className={classes["rooms__item-card"]}>
              <p className={classes["card__note-wifi"]}>
                <FaWifi className={`${classes.icon} ${classes["icon-wifi"]}`} />
                Free
              </p>
              <p className={classes["card__note-smoking"]}>
                <MdOutlineSmokeFree
                  className={`${classes.icon} ${classes["icon-smoke"]}`}
                />
                Non-Smoking
              </p>
              <p className={classes["card__note-user"]}>
                <LuUsers
                  className={`${classes.icon} ${classes["icon-users"]}`}
                />
                {room.detail.maxPeople} Guests
              </p>
              <p className={classes["card__note-bed"]}>
                <IoBedOutline
                  className={`${classes.icon} ${classes["icon-bed"]}`}
                />
                {room.detail.bed}
              </p>
            </div>
            <div className={classes["about__images"]}>
              {room.photos.map((r) => (
                <img
                  key={r}
                  className={classes["image__item"]}
                  src={r}
                  alt={r}
                />
              ))}
            </div>
            <FamilyAmenities />
            <RoomAmenities />
          </Col>
          <Col className={classes["about__col"]} xl={9}>
            <FormBooking room={room} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
