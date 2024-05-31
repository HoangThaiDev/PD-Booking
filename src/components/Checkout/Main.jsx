// Import Modules
import axios from "axios";
import { API_ROOT } from "../../utils/constant";

// Import Hooks
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/main.module.css";
import "../../UI/css/messageAlert.css";

// Import Components
import { Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import FormInfoUser from "./FormInfoUser";
import Order from "./Order";

// Import Icons
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function Main() {
  // Create + use Hooks
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.checkout);

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const countryRef = useRef("");
  const addressRef = useRef("");
  const cityRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");
  const orderNoteRef = useRef("");

  const [errorMessages, setErrorMessages] = useState({
    firstName: {
      message: "",
      showError: false,
    },
    lastName: {
      message: "",
      showError: false,
    },
    country: {
      message: "",
      showError: false,
    },
    address: {
      message: "",
      showError: false,
    },
    city: {
      message: "",
      showError: false,
    },
    phone: {
      message: "",
      showError: false,
    },
    email: {
      message: "",
      showError: false,
    },
  });

  // Create + use event Handlers

  const updateCheckoutOfUserHandler = async (event) => {
    event.preventDefault();
    if (Object.keys(cart).length === 0) {
      messageApi.open({
        type: "error",
        content: "Can't order with empty Cart!",
        className: "message-error",
        icon: <MdError />,
      });
      return false;
    }
    const valuesFormClient = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      country: countryRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      orderNote: orderNoteRef.current.value,
    };

    try {
      const response = await axios.post(`${API_ROOT}/checkouts/update`, {
        valuesFormClient,
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
          navigate("/transactions");
        }, 1000);
      }
    } catch (error) {
      if (error.response.data.checkValidateForm) {
        const updatedErrorMessages = { ...errorMessages };
        error.response.data.messages.forEach((errorData) => {
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
    <div className={classes.main}>
      {contextHolder} {/* Alert Action */}
      <form
        className={classes["main__container"]}
        onSubmit={updateCheckoutOfUserHandler}
      >
        <Row className={classes["main__row"]}>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
          >
            <FormInfoUser
              firstNameRef={firstNameRef}
              lastNameRef={lastNameRef}
              countryRef={countryRef}
              addressRef={addressRef}
              cityRef={cityRef}
              phoneRef={phoneRef}
              emailRef={emailRef}
              orderNoteRef={orderNoteRef}
              errorMessages={errorMessages}
            />
          </Col>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={11}
          >
            {isLoggedIn && (
              <>
                <Order user={user} />
                <button className={classes["btn-submit"]} type="submit">
                  Place order
                </button>
              </>
            )}
          </Col>
        </Row>
      </form>
    </div>
  );
}
