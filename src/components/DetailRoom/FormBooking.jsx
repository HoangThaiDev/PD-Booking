// Import Modules
import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { checkFormBooking } from "../../middeware/checkValidateForm";
import { useNavigate } from "react-router-dom";
import { API_ROOT } from "../../utils/constant";
import "./css/formBooking.css";
import "../../UI/css/messageAlert.css";

// Import Components
import { DatePicker, Row, Col, ConfigProvider, message } from "antd";

// Import Icons
import { RxDividerHorizontal } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function FormBooking({ room }) {
  // Create +use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const {
    adults: adultsValue,
    children: childrenValue,
    startDate,
    endDate,
  } = useSelector((state) => state.options);

  const [options, setOptions] = useState({
    adults: adultsValue,
    children: childrenValue,
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
  const navigate = useNavigate();

  // Updated Date Booking from Options Value Of User
  useEffect(() => {
    if (startDate.length > 0 && endDate.length > 0) {
      const startDateConvert = moment(startDate, "DD MM YYYY");
      const endDateConvert = moment(endDate, "DD MM YYYY");
      setDateString((prev) => {
        return {
          ...prev,
          startDate: startDateConvert,
          endDate: endDateConvert,
        };
      });
    }
  }, [startDate, endDate]);

  // Create + use event Handlers
  const totalCost = useMemo(() => {
    let sum = 0;

    const priceOptions =
      serviceOptions.roomClean + serviceOptions.massage + serviceOptions.daySpa;
    const priceRoom = parseInt(room.discount_price.replace(/\./g, ""));
    let checkDateString =
      moment(dateString.startDate).isSame(dateString.endDate) ||
      moment(dateString.startDate).isAfter(dateString.endDate);

    if (
      dateString.startDate.length === 0 ||
      dateString.endDate.length === 0 ||
      checkDateString
    ) {
      return 0;
    }

    const dateDiff = dateString.endDate.diff(dateString.startDate, "day");

    sum = dateDiff * Number(priceRoom) * selectedRooms.length + priceOptions;

    return sum.toLocaleString("us-US").replace(/\,/g, ".");
  }, [dateString, serviceOptions, selectedRooms]);

  const changeDateCheckInHandler = (date) => {
    if (!date) {
      return false;
    }
    const formattedStartDate = new moment(date.$d);
    setDateString((prev) => {
      return { ...prev, startDate: formattedStartDate };
    });
  };

  const changeDateCheckOutHandler = (date, dateString) => {
    if (!date) {
      return false;
    }
    const formattedEndDate = new moment(date.$d);
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

  const updatedServiceOptions = useMemo(() => {
    return {
      roomClean: serviceOptions.roomClean
        .toLocaleString("us-US")
        .replace(/\,/g, "."),
      massage: serviceOptions.massage
        .toLocaleString("us-US")
        .replace(/\,/g, "."),
      daySpa: serviceOptions.daySpa.toLocaleString("us-US").replace(/\,/g, "."),
    };
  }, [serviceOptions]);

  const submitBookingHandler = async (event) => {
    event.preventDefault();

    // Check user sign in ?
    if (!isLoggedIn) {
      messageApi.open({
        type: "error",
        content: "You need to Sign In account to use Booking!",
        className: "message-error",
        icon: <MdError />,
      });
      return false;
    }

    const valueFormBooking = {
      roomId: room._id,
      name: room.name,
      photo: room.photos[0],
      startDate: moment(dateString.startDate).format("DD/MM/YYYY"),
      endDate: moment(dateString.endDate).format("DD/MM/YYYY"),
      options: options,
      price: room.discount_price,
      maxPeople: room.detail.maxPeople,
      rooms: selectedRooms,
      totalPrice: totalCost,
      serviceOptions: updatedServiceOptions,
      status: "Booking",
    };

    const isCheckValid = checkFormBooking(valueFormBooking);

    if (!isCheckValid.state) {
      messageApi.open({
        type: "error",
        content: isCheckValid.message,
        className: "message-error",
        icon: <MdError />,
      });
      return false;
    }
    if (isCheckValid.state) {
      try {
        const response = await axios.post(`${API_ROOT}/carts/add-cart`, {
          valueFormBooking,
          user,
        });

        if (response.status === 200) {
          messageApi.open({
            type: "success",
            content: response.data.message,
            className: "message-success",
            icon: <FaCheck />,
          });
          setTimeout(() => {
            navigate("/carts");
          }, 1000);
        }
      } catch (error) {
        if (error.response.data.showErrorOfCart) {
          messageApi.open({
            type: "error",
            content: error.response.data.message,
            className: "message-error",
            icon: <MdError />,
          });
          return false;
        }
        messageApi.open({
          type: "error",
          content: error.response.data.message,
          className: "message-error",
          icon: <MdError />,
        });
        if (error.response.data.session) {
          setTimeout(() => {
            window.location.replace("/login");
          }, 1000);
        }
      }
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
      {contextHolder} {/* Alert Action */}
      <form className="formBooking" onSubmit={submitBookingHandler}>
        <div className="formBooking__container">
          <Row className="formBooking__header">
            <Col
              className="formBooking__header__col"
              xs={24}
              sm={10}
              md={10}
              lg={10}
              xl={10}
            >
              <p>RESERVE:</p>
            </Col>
            <Col
              className="formBooking__header__col"
              xs={24}
              sm={13}
              md={13}
              lg={13}
              xl={13}
            >
              <p>
                From: <span>{room.price}</span> VND/Night
              </p>
              <p>
                Sale: <span>{room.discount_price}</span> VND/Night
              </p>
            </Col>
          </Row>

          <div className="formDate__container">
            <DatePicker
              placeholder="Check In"
              className="formDate-checkIn"
              popupClassName="formDatePopup-checkIn"
              onChange={changeDateCheckInHandler}
            />
            <DatePicker
              placeholder="Check Out"
              className="formDate-checkOut"
              popupClassName="formDatePopup-checkOut"
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
              <Col
                className="option__title"
                xs={10}
                sm={10}
                md={10}
                lg={10}
                xl={10}
              >
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
              <Col
                className="option__price"
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <p>250.000 VND / Night</p>
              </Col>
            </Row>
            <Row className="service-options">
              <Col
                className="option__title"
                xs={10}
                sm={10}
                md={10}
                lg={10}
                xl={10}
              >
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
              <Col
                className="option__price"
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <p>500.000 VND / Day</p>
              </Col>
            </Row>
            <Row className="service-options">
              <Col
                className="option__title"
                xs={10}
                sm={10}
                md={10}
                lg={10}
                xl={10}
              >
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
              <Col
                className="option__price"
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
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
                <p>{totalCost} VND</p>
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
