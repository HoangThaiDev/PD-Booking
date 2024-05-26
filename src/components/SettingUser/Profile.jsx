// Import Modules
import React, { useRef, useState } from "react";
import classes from "./css/profile.module.css";
import "../../UI/css/messageAlert.css";
import { API_ROOT } from "../../utils/constant";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Components
import { Row, Col, message } from "antd";

// Import Icons
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function Profile() {
  // Create + use Hooks
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { user, detail } = useSelector((state) => state.user);

  const [errorMessages, setErrorMessages] = useState({
    firstname: {
      message: "",
      showError: false,
    },
    lastname: {
      message: "",
      showError: false,
    },
    country: {
      message: "",
      showError: false,
    },
    city: {
      message: "",
      showError: false,
    },
    address: {
      message: "",
      showError: false,
    },
    phone: {
      message: "",
      showError: false,
    },
  });

  const firstnameRef = useRef("");
  const lastnameRef = useRef("");
  const countryRef = useRef("");
  const addressRef = useRef("");
  const cityRef = useRef("");
  const phoneRef = useRef("");

  // Create + use event handlers
  const updatedUserHandler = async (event) => {
    event.preventDefault();

    const valueFormUpdateUser = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      country: countryRef.current.value,
      city: cityRef.current.value,
      address: addressRef.current.value,
      phone: phoneRef.current.value,
    };

    try {
      const response = await axios.post(
        `${API_ROOT}/users/updated/${user.userId}`,
        { valueFormUpdateUser }
      );
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: response.data.message,
          className: "message-success",
          icon: <FaCheck />,
        });
        setTimeout(() => {
          navigate("/setting-user");
        }, 1000);
      }
    } catch (error) {
      const { session, messages } = error.response.data;
      if (!session) {
        const updatedErrorMessages = { ...errorMessages };
        messages.forEach((errorData) => {
          const { path, message, showError } = errorData;
          const field = path[0];

          // Updated Error Messages
          updatedErrorMessages[field] = {
            message,
            showError,
          };
          setErrorMessages(updatedErrorMessages);
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
  };

  return (
    <form className={classes.main} onSubmit={updatedUserHandler}>
      <div className={classes["main__container"]}>
        {contextHolder} {/* Alert Action */}
        <h1 className={classes["main__title"]}>Profile User</h1>
        <Row className={classes["main__row"]}>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={11}
            md={24}
            lg={11}
            xl={11}
          >
            <div className={classes["main__item"]}>
              <label htmlFor="firstname">Firstname * </label>
              <input
                type="text"
                id="firstname"
                className={classes["item-input"]}
                ref={firstnameRef}
                placeholder={detail && detail.firstname}
              />
              {errorMessages.firstname.showError && (
                <p className={classes["error-message"]}>
                  <span>(&#8902;)</span> {errorMessages.firstname.message}
                </p>
              )}
            </div>
          </Col>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={11}
            md={24}
            lg={11}
            xl={11}
          >
            <div className={classes["main__item"]}>
              <label htmlFor="lastname">Lastname * </label>
              <input
                type="text"
                id="lastname"
                placeholder={detail && detail.lastname}
                className={classes["item-input"]}
                ref={lastnameRef}
              />
              {errorMessages.lastname.showError && (
                <p className={classes["error-message"]}>
                  <span>(&#8902;)</span> {errorMessages.lastname.message}
                </p>
              )}
            </div>
          </Col>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={11}
            md={24}
            lg={11}
            xl={11}
          >
            <div className={classes["main__item"]}>
              <label htmlFor="country">Country * </label>
              <input
                type="text"
                id="country"
                placeholder={detail && detail.country}
                className={classes["item-input"]}
                ref={countryRef}
              />
              {errorMessages.country.showError && (
                <p className={classes["error-message"]}>
                  <span>(&#8902;)</span> {errorMessages.country.message}
                </p>
              )}
            </div>
          </Col>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={11}
            md={24}
            lg={11}
            xl={11}
          >
            <div className={classes["main__item"]}>
              <label htmlFor="city">City * </label>
              <input
                type="text"
                id="city"
                placeholder={detail && detail.city}
                className={classes["item-input"]}
                ref={cityRef}
              />
              {errorMessages.city.showError && (
                <p className={classes["error-message"]}>
                  <span>(&#8902;)</span> {errorMessages.city.message}
                </p>
              )}
            </div>
          </Col>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
          >
            <div className={classes["main__item"]}>
              <label htmlFor="address">Address * </label>
              <input
                type="text"
                id="address"
                placeholder={detail && detail.streetAddress}
                className={classes["item-input"]}
                ref={addressRef}
              />
              {errorMessages.address.showError && (
                <p className={classes["error-message"]}>
                  <span>(&#8902;)</span> {errorMessages.address.message}
                </p>
              )}
            </div>
          </Col>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
          >
            <div className={classes["main__item"]}>
              <label htmlFor="phone">Phone * </label>
              <input
                type="text"
                id="phone"
                placeholder={detail && detail.phoneNumber}
                className={classes["item-input"]}
                ref={phoneRef}
              />
              {errorMessages.phone.showError && (
                <p className={classes["error-message"]}>
                  <span>(&#8902;)</span> {errorMessages.phone.message}
                </p>
              )}
            </div>
          </Col>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
          >
            <button type="submit" className={classes["item-btn"]}>
              Save Change
            </button>
          </Col>
        </Row>
      </div>
    </form>
  );
}
