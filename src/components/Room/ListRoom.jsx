// Import Modules
import axios from "axios";

// Import Hooks
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Import File CSS
import classes from "./css/listRoom.module.css";

// Import Components
import { Row, Col } from "antd";
import PaginationCusTom from "../../UI/Pagination";

// Import Icons
import { FaSearch } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineSmokeFree } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { MdOutlineRefresh } from "react-icons/md";
import { roomAction } from "../../redux/store";
import { API_ROOT } from "../../utils/constant";

export default function ListRoom({
  rooms,
  filteredRooms,
  stateShowAddressDetail = true,
}) {
  // Slice array Room
  const sliceRoomsHandler = useCallback((array) => {
    return array.slice(0, 4);
  }, []);

  // Create + use Hooks
  const [roomsData, setRoomsData] = useState(rooms);
  const [sliceRooms, setSliceRooms] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameRoomRef = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Setup Value Default for state of Hook useLocation()
  useEffect(() => {
    // Check condition when rooms fitered by valuee
    if (filteredRooms?.length > 0) {
      const updatedRoom = sliceRoomsHandler(filteredRooms);
      setRoomsData(filteredRooms);
      setSliceRooms(updatedRoom);
      setIsLoading(true);
    } else {
      const updatedRoom = sliceRoomsHandler(rooms);
      setRoomsData(rooms);
      setSliceRooms(updatedRoom);
      setIsLoading(true);
    }
  }, [rooms, filteredRooms]);

  // Create + use event Handlers
  const findRoomByNameHandler = async () => {
    try {
      const response = await axios.post(`${API_ROOT}/rooms/search`, {
        name: nameRoomRef.current.value,
      });
      if (response.status === 200) {
        const updatedRoom = sliceRoomsHandler(response.data);
        setRoomsData(response.data);
        setSliceRooms(updatedRoom);
        setRefreshPage(true);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const getSliceRoomHandler = useCallback((value, restart) => {
    setSliceRooms(value);
    setRefreshPage(restart);
  }, []);

  const navigateRoomDetailHandler = (id, nameRoom, nameCity, nameResort) => {
    const modifiedName = nameRoom.split(" ").join("-");
    navigate(`/room/detail/${modifiedName}`, {
      state: { roomId: id, nameCity, nameResort },
    });
  };

  const refreshDataRoomHandler = () => {
    nameRoomRef.current.value = "";
    const updatedRoom = sliceRoomsHandler(rooms);
    setRoomsData(rooms);
    setSliceRooms(updatedRoom);
    setRefreshPage(true);
    dispatch(roomAction.resetRooms());
  };

  return (
    <div className={classes.rooms}>
      <div className={classes["rooms__container"]}>
        {isLoading && (
          <>
            <h1 className={classes["rooms__title"]}>Browse All rooms</h1>
            <Row className={classes["rooms__options"]}>
              <Col className={classes.col} xs={24} sm={16} md={16} xl={10}>
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
                  <MdOutlineRefresh
                    className={classes.iconRefresh}
                    onClick={refreshDataRoomHandler}
                  />
                </div>
              </Col>
            </Row>

            {sliceRooms.length > 0 &&
              sliceRooms.map((r) => (
                <Row className={classes["rooms__list"]} key={r._id}>
                  <Col
                    className={classes["rooms__item"]}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={11}
                  >
                    <img
                      className={classes["rooms__img"]}
                      src={r.photos[1]}
                      alt={r.photos[1]}
                    />
                    <p className={classes["rooms__price"]}>
                      FROM: {r.price} VNĐ
                    </p>
                  </Col>
                  <Col
                    className={classes["rooms__item"]}
                    xs={24}
                    sm={24}
                    md={11}
                    lg={11}
                    xl={12}
                  >
                    <p className={classes["rooms__item-breakcrum"]}>
                      Private Pool / Ocean View / Single Level
                    </p>
                    <h3 className={classes["rooms__item-name"]}>{r.name}</h3>
                    <div className={classes["rooms__item-card"]}>
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
                          {r.detail.maxPeople} Guests
                        </p>
                      </span>
                      <span className={classes["note-flex"]}>
                        <IoBedOutline
                          className={`${classes.icon} ${classes["icon-bed"]}`}
                        />
                        <p className={classes["card__note-bed"]}>
                          {r.detail.bed}
                        </p>
                      </span>
                    </div>
                    <p className={classes["rooms__item-desc"]}>
                      {r.size}, located on the west side of the resort in a
                      private tropical garden with a plunge pool and a private
                      outdoor shower.
                    </p>
                    <div>
                      <button
                        className={classes["rooms__btn-link"]}
                        onClick={() =>
                          navigateRoomDetailHandler(
                            r._id,
                            r.name,
                            r.nameCity,
                            r.nameResort
                          )
                        }
                      >
                        Discover More
                      </button>
                    </div>

                    {/* Show Detail Room about Resort + City if in Page Rooms */}
                    {stateShowAddressDetail && (
                      <div className={classes["rooms__footer"]}>
                        <p className={classes["footer__title"]}>
                          <span className={classes["footer__title-resort"]}>
                            {r.nameResort}
                          </span>
                          -
                          <span className={classes["footer__title-city"]}>
                            {r.nameCity}
                          </span>
                        </p>
                      </div>
                    )}
                  </Col>
                </Row>
              ))}
            <Row className={classes["rooms__pagination"]}>
              <Col
                className={classes.col}
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
              >
                <PaginationCusTom
                  data={roomsData}
                  onSaveSliceData={getSliceRoomHandler}
                  pageSize={sliceRooms.length}
                  refresh={refreshPage}
                />
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}
