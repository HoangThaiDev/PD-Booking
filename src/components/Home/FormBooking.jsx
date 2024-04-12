// Import Modules
import React, { useRef, useState } from "react";
import "./css/formBooking.css";

// Import Components
import { DatePicker, Row, Col, ConfigProvider } from "antd";

// Import Icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { RxDividerHorizontal } from "react-icons/rx";

export default function FormBooking() {
  // Create + use Hooks
  const [showPopup, setShowPopup] = useState(false);
  const cityRef = useRef("");
  const [options, setOptions] = useState({
    rooms: 0,
    adults: 0,
    children: 0,
  });

  const [dateString, setDateString] = useState({
    startDate: "",
    endDate: "",
  });

  // Create + use Event Handlers
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
    const startDate = new Date(value[0].$d);
    const startDay = startDate.getDate().toString().padStart(2, "0");
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const startYear = startDate.getFullYear();
    const formattedStartDate = `${startDay}/${startMonth}/${startYear}`;

    const endDate = new Date(value[1].$d);
    const endDay = endDate.getDate().toString().padStart(2, "0");
    const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const endYear = endDate.getFullYear();
    const formattedEndDate = `${endDay}/${endMonth}/${endYear}`;

    setDateString({ startDate: formattedStartDate, endDate: formattedEndDate });
  };

  const searchHotelHandler = (event) => {
    event.preventDefault();
    console.log(options, dateString, cityRef.current.value);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            multipleItemBorderColor: "#14e50d !important",
          },
        },
      }}
    >
      <div id="formBooking">
        <form className="formBooking-container" onSubmit={searchHotelHandler}>
          <Row className="formBooking-row">
            <Col xl={6}>
              <DatePicker.RangePicker
                className="formBooking-date"
                placeholder={["Check In", "Check Out"]}
                popupClassName="formBooking-popup"
                onChange={changeDatePickerHandler}
              />
            </Col>

            <Col className="form-input" xl={6}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                className="form-input__city"
                type="text"
                placeholder="Vd: Hà Nội, Phú Quốc..."
                ref={cityRef}
              />
            </Col>

            <Col className="form-input" xl={7}>
              <label htmlFor="guest">Guests</label>
              <div onClick={() => setShowPopup(!showPopup)}>
                <input
                  type="text"
                  id="guest"
                  value={`${options.rooms} Room, ${options.adults} Adult, ${options.children} Chilren`}
                  readOnly
                />
                <MdKeyboardArrowDown className="icon-dropdown" />
              </div>
              {showPopup && (
                <div className="form-input-dropdown">
                  <div className="form-dropdown-flex">
                    <label>Adults</label>
                    <p>
                      <GoPlus
                        className="icon-quantity-increase"
                        onClick={() => getValueOfOptionHandler("adults", "i")}
                      />
                      <span>{options.adults}</span>
                      <RxDividerHorizontal
                        className="icon-quantity-decrease"
                        onClick={() => getValueOfOptionHandler("adults", "d")}
                      />
                    </p>
                  </div>

                  <div className="form-dropdown-flex">
                    <label>Children</label>
                    <p>
                      <GoPlus
                        className="icon-quantity-increase"
                        onClick={() => getValueOfOptionHandler("children", "i")}
                      />
                      <span>{options.children}</span>
                      <RxDividerHorizontal
                        className="icon-quantity-decrease"
                        onClick={() => getValueOfOptionHandler("children", "d")}
                      />
                    </p>
                  </div>

                  <div className="form-dropdown-flex">
                    <label>Rooms</label>
                    <p>
                      <GoPlus
                        className="icon-quantity-increase"
                        onClick={() => getValueOfOptionHandler("rooms", "i")}
                      />
                      <span>{options.rooms}</span>
                      <RxDividerHorizontal
                        className="icon-quantity-decrease"
                        onClick={() => getValueOfOptionHandler("rooms", "d")}
                      />
                    </p>
                  </div>
                </div>
              )}
            </Col>

            <Col xl={4} className="formBooking-search">
              <button type="submit" className="btn-search">
                Check Availability
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </ConfigProvider>
  );
}
