// Import Modules
import React, { useRef, useState } from "react";
import "./css/formBooking.css";

// Import Components
import { DatePicker, Row, Col, ConfigProvider } from "antd";

// Import Icons
import { RxDividerHorizontal } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

export default function FormBooking({ room }) {
  // Create +use Hooks
  const [options, setOptions] = useState({
    rooms: 0,
    adults: 0,
    children: 0,
  });

  const [dateString, setDateString] = useState({
    startDate: "",
    endDate: "",
  });

  const [serviceOptions, setServiceOptions] = useState({
    roomClean: 0,
    massage: 0,
    daySpa: 0,
  });

  const [selectedRooms, setSelectedRooms] = useState([]);
  // Create + use event Handlers
  const changeDateCheckInHandler = (date) => {
    const startDate = new Date(date.$d);
    const startDay = startDate.getDate().toString().padStart(2, "0");
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const startYear = startDate.getFullYear();
    const formattedStartDate = `${startDay}/${startMonth}/${startYear}`;
    setDateString((prev) => {
      return { ...prev, startDate: formattedStartDate };
    });
  };

  const changeDateCheckOutHandler = (date) => {
    const endDate = new Date(date.$d);
    const endDay = endDate.getDate().toString().padStart(2, "0");
    const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const endYear = endDate.getFullYear();
    const formattedEndDate = `${endDay}/${endMonth}/${endYear}`;
    setDateString((prev) => {
      return { ...prev, endDate: formattedEndDate };
    });
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

  const getPriceFromServiceHandler = (event, nameService) => {
    const numberPriceService = parseInt(event.target.value.replace(/\./g, ""));
    const serviceChecked = event.target.checked ? numberPriceService : 0;
    setServiceOptions((prev) => ({
      ...prev,
      [nameService]: serviceChecked,
    }));
  };

  const getNumberRoomHandler = (event, r) => {
    if (event.target.checked) {
      setSelectedRooms([...selectedRooms, r]);
    } else {
      const filteredSelectedRooms = selectedRooms.filter((room) => room !== r);
      setSelectedRooms(filteredSelectedRooms);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            hoverBorderColor: "#b99d75",
            hoverBg: "#b99d75",
          },
        },
      }}
    >
      <form className="formBooking">
        <div className="formBooking__container">
          <Row className="formBooking__header">
            <Col className="formBooking__header__col" xl={10}>
              <p>RESERVE:</p>
            </Col>
            <Col className="formBooking__header__col" xl={13}>
              <p>
                From: <span>4.000.000</span> VND/Night
              </p>
              <p>
                Sale: <span>4.000.000</span> VND/Night
              </p>
            </Col>
          </Row>

          <div className="formDate__container">
            <DatePicker
              placeholder="Check In"
              className="formDate-checkIn"
              onChange={changeDateCheckInHandler}
            />
            <DatePicker
              placeholder="Check Out"
              className="formDate-checkOut"
              onChange={changeDateCheckOutHandler}
            />
          </div>

          <div className="form__adult-quantity">
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
          <div className="form__children-quantity">
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

          <div className="selectRooms">
            <p>Select Rooms:</p>
            <div className="selectRooms__row">
              {room.numberRooms.map((r, i) => (
                <div className="checkbox" key={i}>
                  <input
                    type="checkbox"
                    id={r}
                    onClick={(event) => getNumberRoomHandler(event, r)}
                  />
                  <label htmlFor={r}>{r}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-service">
            <p>Extra Services:</p>
            <Row className="service-options">
              <Col className="option__title" xl={10}>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    id="room-clean"
                    value="250.000"
                    onClick={(event) =>
                      getPriceFromServiceHandler(event, "roomClean")
                    }
                  />
                  <label htmlFor="room-clean">Room Clean</label>
                </div>
              </Col>
              <Col className="option__price" xl={10}>
                <p>250.000 VND / Night</p>
              </Col>
            </Row>
            <Row className="service-options">
              <Col className="option__title" xl={10}>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    id="massage"
                    value="500.000"
                    onClick={(event) =>
                      getPriceFromServiceHandler(event, "massage")
                    }
                  />
                  <label htmlFor="massage">Massage</label>
                </div>
              </Col>
              <Col className="option__price" xl={10}>
                <p>500.000 VND / Day</p>
              </Col>
            </Row>
            <Row className="service-options">
              <Col className="option__title" xl={10}>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    id="day-spa"
                    value="1.000.000"
                    onClick={(event) =>
                      getPriceFromServiceHandler(event, "daySpa")
                    }
                  />
                  <label htmlFor="day-spa">Day Spa</label>
                </div>
              </Col>
              <Col className="option__price" xl={10}>
                <p>1.000.000 VND / Day</p>
              </Col>
            </Row>
          </div>

          <span className="border"></span>

          <div className="totalPrice">
            <Row className="totalPrice__row">
              <Col className="totalPrice__col" xl={10}>
                <p>Total Cost:</p>
              </Col>
              <Col className="totalPrice__col" xl={10}>
                <p>10.000.000 VND</p>
              </Col>
            </Row>
            <button type="submit" className="btn-submit">
              Book Your Stay Now
            </button>
          </div>
        </div>
      </form>
    </ConfigProvider>
  );
}
