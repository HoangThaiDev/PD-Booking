// Import Modules
import React, { useState, useRef } from "react";
import classes from "./css/formLogin.module.css";
import { checkValidateFormLogin } from "../../middeware/checkValidateForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/store";
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
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function FormLogin() {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const [showPassword, setShowPassword] = useState({
    password: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    email: false,
    password: false,
  });
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Create + use event Handlers
  const showPasswordHandler = (name) => {
    setShowPassword((prev) => {
      return { ...prev, [name]: !showPassword[name] };
    });
  };

  const signInHandler = async (event) => {
    event.preventDefault();
    const infoUserLogin = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const { isCheck, errorMessages } = checkValidateFormLogin(infoUserLogin);

    if (!isCheck) {
      setErrorMessages((prev) => {
        return {
          ...prev,
          email: errorMessages.email,
          password: errorMessages.password,
        };
      });
      return false;
    }

    try {
      const response = await axios.post(`${API_ROOT}/users/login`, {
        infoUserLogin,
      });

      if (response.status === 200) {
        dispatch(userAction.login({ user: response.data.user }));
        messageApi.open({
          type: "success",
          content: response.data.message,
          className: "message-success",
          icon: <FaCheck />,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      setErrorMessages({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
      });
    } catch (error) {
      console.log(error.response.data.message);
      messageApi.open({
        type: "error",
        content: error.response.data.message,
        className: "message-error",
        icon: <MdError />,
      });
    }
  };

  return (
    <div className={classes["form-login"]}>
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
              <h1 className={classes["card__title"]}>SIGN IN</h1>
              <p className={classes["card__content"]}>
                Welcome back! Sign in to experience our convenient booking
                service. Enjoy a simple and fast booking experience to prepare
                for your great trip with<span> PARADISE</span>
              </p>
              <Link to="/">BACK TO HOME</Link>
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={10} xs={24} sm={24} md={10}>
            <div className={classes["form-main"]}>
              <h2 className={classes["form-title"]}>SIGN IN</h2>
              <form onSubmit={signInHandler}>
                <div
                  className={`${classes["form-input"]} ${classes["input-email"]}`}
                >
                  <input type="text" placeholder="Email" ref={emailRef} />
                  <MdOutlineMail className={classes.icon} />
                  {errorMessages.email && (
                    <p className={classes["error-message"]}>
                      <span>(&#8902;)</span> The Email is required
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
                  {errorMessages.password && (
                    <p className={classes["error-message"]}>
                      <span>(&#8902;)</span> The Password is required
                    </p>
                  )}
                </div>
                <div className={classes["form-footer"]}>
                  <div className={`${classes["input-checkbox"]}`}>
                    <input type="checkbox" id="state-user" />
                    <label htmlFor="state-user">Remember me</label>
                  </div>
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <button type="submit" className={classes["btn-login"]}>
                  LOGIN
                </button>
                <h2 className={classes["form-title-signUp"]}>SIGN UP</h2>
                <p className={classes["form-link-signUp"]}>
                  Don't have a account? <Link to="/register">Sign up!</Link>
                </p>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
