// Import Modules
import {
  convertFromStartDate,
  convertFromEndDate,
} from "../middeware/convertFromDate";
import axios from "axios";
import { roomAction, optionsAction } from "../redux/store";
import { API_ROOT } from "../utils/constant";

// Import Hooks
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import File CSS
import classes from "./css/formBooking.module.css";
import "./css/ant-design/datePicker.css";
import "./css/ant-design/select.css";

// Import Components
import { DatePicker, Row, Col, Select, ConfigProvider } from "antd";

// Import Icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { RxDividerHorizontal } from "react-icons/rx";

export default function FormBooking({ listNameCities }) {
  // Create + use Hooks
  const [showPopup, setShowPopup] = useState(false);
  const [valueCity, seValueCity] = useState("");
  const [options, setOptions] = useState({
    rooms: 0,
    adults: 0,
    children: 0,
  });

  const [dateString, setDateString] = useState({
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use Event Handlers
  const getValueCityHandler = (value) => {
    seValueCity(value);
  };

  const getValueOfOptionHandler = (name, operation) => {
    if (operation === "d" && options[name] <= 0) {
      return false;
    }
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
      };
    });
  };

  const changeDatePickerHandler = (value) => {
    const formattedStartDate = convertFromStartDate(value[0].$d);
    const formattedEndDate = convertFromEndDate(value[1].$d);
    setDateString({ startDate: formattedStartDate, endDate: formattedEndDate });
  };

  const searchHotelHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_ROOT}/rooms/find-room`, {
        nameCity: valueCity,
        options: options,
        dateBooking: dateString,
      });

      if (response.status === 200) {
        const userOptions = {
          date: dateString,
          options: options,
        };
        dispatch(optionsAction.saveValueOptions(userOptions)); // Save options value of user choice in store Redux
        dispatch(roomAction.updatedRooms(response.data)); // Save filtered rooms in store Redux
        navigate("/rooms");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            activeBorderColor: "#B99D75 !important",
            hoverBg: "transparent !important",
            activeBg: "transparent !important",
            cellRangeBorderColor: "#B99D75 !important",
          },
        },
      }}
    >
      <div className={classes.formBooking}>
        <form
          className={classes["formBooking-container"]}
          onSubmit={searchHotelHandler}
        >
          <Row className={classes["formBooking-row"]}>
            <Col xs={24} md={24} lg={24} xl={6}>
              <DatePicker.RangePicker
                className="formBooking-date"
                placeholder={["Check In", "Check Out"]}
                popupClassName="formBooking-popup"
                onChange={changeDatePickerHandler}
              />
            </Col>

            <Col className={classes["form-input"]} xs={24} xl={6}>
              <label htmlFor="city">City</label>
              <Select
                className="form-input__city"
                popupClassName="popup-form-city"
                allowClear={true}
                placeholder="Choose City"
                onChange={getValueCityHandler}
                options={listNameCities}
              />
            </Col>

            <Col className={classes["form-input"]} xs={24} xl={7}>
              <label htmlFor="guest">Guests</label>
              <div onClick={() => setShowPopup(!showPopup)}>
                <input
                  type="text"
                  id="guest"
                  className={classes["form-input__options"]}
                  value={`${options.rooms} Room, ${options.adults} Adult, ${options.children} Chilren`}
                  readOnly
                />
                <MdKeyboardArrowDown className={classes["icon-dropdown"]} />
              </div>
              {showPopup && (
                <div className={classes["form-input-dropdown"]}>
                  <div className={classes["form-dropdown-flex"]}>
                    <label>Adults</label>
                    <p>
                      <GoPlus
                        className={classes["icon-quantity-increase"]}
                        onClick={() => getValueOfOptionHandler("adults", "i")}
                      />
                      <span>{options.adults}</span>
                      <RxDividerHorizontal
                        className={classes["icon-quantity-decrease"]}
                        onClick={() => getValueOfOptionHandler("adults", "d")}
                      />
                    </p>
                  </div>

                  <div className={classes["form-dropdown-flex"]}>
                    <label>Children</label>
                    <p>
                      <GoPlus
                        className={classes["icon-quantity-increase"]}
                        onClick={() => getValueOfOptionHandler("children", "i")}
                      />
                      <span>{options.children}</span>
                      <RxDividerHorizontal
                        className={classes["icon-quantity-decrease"]}
                        onClick={() => getValueOfOptionHandler("children", "d")}
                      />
                    </p>
                  </div>

                  <div className={classes["form-dropdown-flex"]}>
                    <label>Rooms</label>
                    <p>
                      <GoPlus
                        className={classes["icon-quantity-increase"]}
                        onClick={() => getValueOfOptionHandler("rooms", "i")}
                      />
                      <span>{options.rooms}</span>
                      <RxDividerHorizontal
                        className={classes["icon-quantity-decrease"]}
                        onClick={() => getValueOfOptionHandler("rooms", "d")}
                      />
                    </p>
                  </div>
                </div>
              )}
            </Col>

            <Col
              className={classes["formBooking-search"]}
              xs={24}
              md={24}
              xl={4}
            >
              <button type="submit" className={classes["btn-search"]}>
                Check Availability
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </ConfigProvider>
  );
}
