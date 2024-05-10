// Import Modules
import React from "react";
import classes from "./css/about.module.css";
import { useDispatch, useSelector } from "react-redux";
import { modalImageRoomAction } from "../../redux/store";

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
import ModalImageRoom from "../../UI/ModalImageRoom";

export default function About({ room }) {
  // Create + use Hook
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.modalImageRoom);

  // Create + use event Handlers
  const showModalImageRoom = (path) => {
    dispatch(modalImageRoomAction.showModalImageRoom(path));
  };

  return (
    <div className={classes.about}>
      <div className={classes["about__container"]}>
        <Row className={classes["about__row"]}>
          <Col
            className={classes["about__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={14}
          >
            <h2 className={classes["about__name"]}>{room.name}</h2>
            <p className={classes["about__breakcrum"]}>
              Private Pool / Ocean View / Single Level
            </p>
            <div className={classes["rooms__item-card"]}>
              <span className={classes["card-flex"]}>
                <FaWifi className={`${classes.icon} ${classes["icon-wifi"]}`} />
                <p className={classes["card__note-wifi"]}>Free</p>
              </span>
              <span className={classes["card-flex"]}>
                <MdOutlineSmokeFree
                  className={`${classes.icon} ${classes["icon-smoke"]}`}
                />
                <p className={classes["card__note-smoking"]}>Non-Smoking</p>
              </span>
              <span className={classes["card-flex"]}>
                <LuUsers
                  className={`${classes.icon} ${classes["icon-users"]}`}
                />
                <p className={classes["card__note-user"]}>
                  {room.detail.maxPeople} Guests
                </p>
              </span>
              <span className={classes["card-flex"]}>
                <IoBedOutline
                  className={`${classes.icon} ${classes["icon-bed"]}`}
                />
                <p className={classes["card__note-bed"]}>{room.detail.bed}</p>
              </span>
            </div>
            <div className={classes["about__images"]}>
              {room.photos.map((r) => (
                <img
                  key={r}
                  className={classes["image__item"]}
                  src={r}
                  alt={r}
                  onClick={() => showModalImageRoom(r)}
                />
              ))}
            </div>
            {showModal && <ModalImageRoom />}
            <FamilyAmenities />
            <RoomAmenities />
          </Col>
          <Col
            className={classes["about__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={9}
          >
            <FormBooking room={room} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
