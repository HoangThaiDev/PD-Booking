// Import Modules
import React, { useCallback, useRef, useState } from "react";
import classes from "./css/listRoom.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Components
import { Row, Col } from "antd";
import PaginationCusTom from "../../UI/Pagination";

// Import Icons
import { FaSearch } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineSmokeFree } from "react-icons/md";
import { LuUsers } from "react-icons/lu";

export default function ListRoom({ room }) {
  // Create + use Hooks
  const [rooms, setRooms] = useState(room.slice(0, 4));
  const nameRoomRef = useRef("");
  const navigate = useNavigate();

  // Create + use event Handlers
  const findRoomByNameHandler = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/rooms/search", {
        name: nameRoomRef.current.value,
      });
      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSliceRoomHandler = useCallback((value) => {
    setRooms(value);
  }, []);

  const navigateRoomDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`/room/${modifiedName}`, { state: { id: id } });
  };

  return (
    <div className={classes.rooms}>
      <div className={classes["rooms__container"]}>
        <h1 className={classes["rooms__title"]}>Browse All rooms</h1>
        <Row className={classes["rooms__options"]}>
          <Col className={classes.col} xl={9}>
            <div>
              <input
                className={classes["input-search"]}
                type="text"
                placeholder="Search Your Room...."
                ref={nameRoomRef}
              />
              <FaSearch
                className={classes.iconSearch}
                onClick={findRoomByNameHandler}
              />
            </div>
          </Col>
          <Col className={classes.col} xl={10}>
            <PaginationCusTom
              data={room}
              onSaveSliceData={getSliceRoomHandler}
              pageSize={4}
            />
          </Col>
        </Row>
        {rooms.length > 0 &&
          rooms.map((r) => (
            <Row className={classes["rooms__list"]} key={r._id}>
              <Col className={classes["rooms__item"]} xl={11}>
                <img
                  className={classes["rooms__img"]}
                  src={r.photos[1]}
                  alt={r.photos[1]}
                />
                <p className={classes["rooms__price"]}>FROM: {r.price} VNĐ</p>
              </Col>
              <Col className={classes["rooms__item"]} xl={12}>
                <p className={classes["rooms__item-breakcrum"]}>
                  Private Pool / Ocean View / Single Level
                </p>
                <h3 className={classes["rooms__item-name"]}>{r.name}</h3>
                <div className={classes["rooms__item-card"]}>
                  <p className={classes["card__note-wifi"]}>
                    <FaWifi
                      className={`${classes.icon} ${classes["icon-wifi"]}`}
                    />
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
                    {r.detail.maxPeople} Guests
                  </p>
                  <p className={classes["card__note-bed"]}>
                    <IoBedOutline
                      className={`${classes.icon} ${classes["icon-bed"]}`}
                    />
                    {r.detail.bed}
                  </p>
                </div>
                <p className={classes["rooms__item-desc"]}>
                  {r.size}, located on the west side of the resort in a private
                  tropical garden with a plunge pool and a private outdoor
                  shower.
                </p>
                <div>
                  <button
                    className={classes["rooms__btn-link"]}
                    onClick={() => navigateRoomDetailHandler(r._id, r.name)}
                  >
                    Discover More
                  </button>
                </div>
              </Col>
            </Row>
          ))}
      </div>
    </div>
  );
}
