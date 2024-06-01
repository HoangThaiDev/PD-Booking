// Import Modules
import axios from "axios";
import { API_ROOT } from "../../utils/constant";

// Import Hooks
import React, { useState, useRef } from "react";

// Import File CSS
import classes from "./css/formForgotPassword.module.css";
import "../../UI/css/ant-design/messageAlert.css";

// Import Components
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Row, Col, message } from "antd";
const bannerImage =
  "https://img.freepik.com/free-photo/photorealistic-wooden-house-with-timber-structure_23-2151302631.jpg";

// Import Icons
import { MdOutlineMail } from "react-icons/md";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";

export default function FormForgotPassword() {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errorMessages, setErrorMessages] = useState({
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
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const navigate = useNavigate();

  // Get value URL Query
  const [searchParam] = useSearchParams();
  const modeValue = searchParam.get("mode") === "create";
  const userId = searchParam.get("userId");

  // Create + use event Handlers
  const showPasswordHandler = (name) => {
    setShowPassword((prev) => {
      return { ...prev, [name]: !showPassword[name] };
    });
  };

  const checkEmailUserHandler = async (event) => {
    event.preventDefault();

    const infoUser = {
      email: emailRef.current.value,
    };

    try {
      const response = await axios.post(`${API_ROOT}/users/auth-email`, {
        infoUser,
      });

      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: response.data.message,
          className: "message-success",
          icon: <FaCheck />,
        });
        setTimeout(() => {
          navigate(`?mode=create&&userId=${response.data.userId}`);
        }, 800);
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
    }
  };

  const createNewPasswordHandler = async (event) => {
    event.preventDefault();

    const infoUser = {
      userId: userId,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    try {
      const response = await axios.post(
        `${API_ROOT}/users/create-newPassword`,
        {
          infoUser,
        }
      );

      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: response.data.message,
          className: "message-success",
          icon: <FaCheck />,
        });
        setTimeout(() => {
          window.location.replace("/login");
        }, 800);
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
    }
  };

  return (
    <div className={classes["form-getPassword"]}>
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
              <h1 className={classes["card__title"]}>
                {modeValue ? "CREATE PASSWORD" : "FORGOT PASSWORD"}
              </h1>
              <p className={classes["card__content"]}>
                {modeValue
                  ? "Create new PASSWORD to have join with PARADISE"
                  : "Just enter your Email, you will be able to find your forgotten password."}
              </p>
              <Link to="/">BACK TO HOME</Link>
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={10} xs={24} sm={24} md={10}>
            <div className={classes["form-main"]}>
              <h2 className={classes["form-title"]}>
                {modeValue ? "CREATE PASSWORD" : "FORGOT PASSWORD"}
              </h2>
              <form
                onSubmit={
                  modeValue ? createNewPasswordHandler : checkEmailUserHandler
                }
              >
                {!modeValue && (
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
                )}

                {modeValue && (
                  <>
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
                          <span>(&#8902;)</span>{" "}
                          {errorMessages.password.message}
                        </p>
                      )}
                    </div>
                    <div
                      className={`${classes["form-input"]} ${classes["input-password"]}`}
                    >
                      <input
                        type={
                          showPassword.confirmPassword ? "text" : "password"
                        }
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
                          <span>(&#8902;)</span>
                          {errorMessages.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
                <button type="submit" className={classes["btn-sendMail"]}>
                  {modeValue ? "CREATE" : " SEND EMAIL"}
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
