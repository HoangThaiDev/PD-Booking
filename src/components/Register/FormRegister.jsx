// Import Modules
import React, { useState, useRef } from "react";
import classes from "./css/formRegister.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ROOT } from "../../utils/constant";
import "../../UI/css/messageAlert.css";

// Import Components
import { Link } from "react-router-dom";
import { Row, Col, message } from "antd";
const bannerImage =
  "https://img.freepik.com/free-photo/photorealistic-wooden-house-with-timber-structure_23-2151302631.jpg";

// Import Icons
import { MdOutlineMail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { PiUser } from "react-icons/pi";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function FormLogin() {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    username: {
      message: "",
      showError: false,
    },
    email: {
      message: "",
      showError: false,
    },
    password: {
      message: "",
      showError: false,
    },
    confirmPassword: {
      message: "",
      showError: false,
    },
  });
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  // Create + use event Handlers
  const showPasswordHandler = (name) => {
    setShowPassword((prev) => {
      return { ...prev, [name]: !showPassword[name] };
    });
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    const infoUserRegister = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    try {
      const response = await axios.post(`${API_ROOT}/users/register`, {
        infoUserRegister,
      });
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: response.data.message,
          className: "message-success",
          icon: <FaCheck />,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const { message, messages } = error.response.data;
      if (!message) {
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
    }
  };

  return (
    <div className={classes["form-register"]}>
      {contextHolder} {/* Alert Action */}
      <Link to="/" className={classes["link_home-mobile"]}>
        <span>&#8249;</span> Back to home
      </Link>
      <img
        className={classes["form-background"]}
        src={bannerImage}
        alt={bannerImage}
      />
      <div className={classes["form__container"]}>
        <Row className={classes["form__row"]}>
          <Col className={classes["form__col"]} xl={12} xs={24} sm={24} md={12}>
            <div className={classes["card__introduce-container"]}>
              <h1 className={classes["card__title"]}>SIGN UP</h1>
              <p className={classes["card__content"]}>
                Register for an account to increase your experience and room
                booking activities completely with<span> PARADISE</span>
              </p>
              <Link to="/">BACK TO HOME</Link>
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={10} xs={24} sm={24} md={10}>
            <div className={classes["form-main"]}>
              <h2 className={classes["form-title"]}>SIGN UP</h2>
              <form onSubmit={signUpHandler}>
                <div
                  className={`${classes["form-input"]} ${classes["input-email"]}`}
                >
                  <input type="text" placeholder="Username" ref={usernameRef} />
                  <PiUser className={classes.icon} />
                  {errorMessages.username.showError && (
                    <p className={classes["error-message"]}>
                      <span>(&#8902;)</span> {errorMessages.username.message}
                    </p>
                  )}
                </div>
                <div
                  className={`${classes["form-input"]} ${classes["input-email"]}`}
                >
                  <input type="text" placeholder="Email" ref={emailRef} />
                  <MdOutlineMail className={classes.icon} />
                  {errorMessages.email.showError && (
                    <p className={classes["error-message"]}>
                      <span>(&#8902;)</span> {errorMessages.email.message}
                    </p>
                  )}
                </div>
                <div
                  className={`${classes["form-input"]} ${classes["input-password"]}`}
                >
                  <input
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Password"
                    ref={passwordRef}
                  />
                  <IoKeyOutline className={classes.icon} />
                  {showPassword.password ? (
                    <FaEye
                      className={classes["icon-show"]}
                      onClick={() => showPasswordHandler("password")}
                    />
                  ) : (
                    <IoEyeOff
                      className={classes["icon-show"]}
                      onClick={() => showPasswordHandler("password")}
                    />
                  )}
                  {errorMessages.password.showError && (
                    <p className={classes["error-message"]}>
                      <span>(&#8902;)</span> {errorMessages.password.message}
                    </p>
                  )}
                </div>
                <div
                  className={`${classes["form-input"]} ${classes["input-password"]}`}
                >
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    ref={confirmPasswordRef}
                  />
                  <IoKeyOutline className={classes.icon} />
                  {showPassword.confirmPassword ? (
                    <FaEye
                      className={classes["icon-show"]}
                      onClick={() => showPasswordHandler("confirmPassword")}
                    />
                  ) : (
                    <IoEyeOff
                      className={classes["icon-show"]}
                      onClick={() => showPasswordHandler("confirmPassword")}
                    />
                  )}
                  {errorMessages.confirmPassword.showError && (
                    <p className={classes["error-message"]}>
                      <span>(&#8902;)</span>{" "}
                      {errorMessages.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button type="submit" className={classes["btn-signUp"]}>
                  SIGN UP
                </button>
                <p className={classes["form-link-signIn"]}>
                  You have a account? <Link to="/login">Login!</Link>
                </p>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
