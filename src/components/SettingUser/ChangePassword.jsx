// Import Modules
import React, { useRef, useState } from "react";
import classes from "./css/changePassword.module.css";
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
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

export default function ChangePassword() {
  // Create + use Hooks
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useSelector((state) => state.user);

  const passwordCurrentRef = useRef("");
  const newPasswordRef = useRef("");
  const confirmNewPasswordRef = useRef("");

  const [errorMessages, setErrorMessages] = useState({
    passwordCurrent: {
      message: "",
      showError: false,
    },
    newPassword: {
      message: "",
      showError: false,
    },
    confirmNewPassword: {
      message: "",
      showError: false,
    },
  });
  const [showPassword, setShowPassword] = useState({
    passwordCurrent: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  // Create + use event handlers
  const showPasswordHandler = (name) => {
    setShowPassword((prev) => {
      return { ...prev, [name]: !showPassword[name] };
    });
  };

  const changePasswordHandler = async (event) => {
    event.preventDefault();

    const valueFormUpdateUser = {
      passwordCurrent: passwordCurrentRef.current.value,
      newPassword: newPasswordRef.current.value,
      confirmNewPassword: confirmNewPasswordRef.current.value,
    };

    try {
      const response = await axios.post(
        `${API_ROOT}/users/change-password/${user.userId}`,
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
    <form className={classes.main} onSubmit={changePasswordHandler}>
      <div className={classes["main__container"]}>
        {contextHolder} {/* Alert Action */}
        <h1 className={classes["main__title"]}>Change Password</h1>
        <Row className={classes["main__row"]}>
          <Col
            className={classes["main__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
          >
            <div className={classes["main__item"]}>
              <label htmlFor="firstname">Password Current * </label>
              <input
                type={showPassword.passwordCurrent ? "text" : "password"}
                id="current-password"
                className={classes["item-input"]}
                ref={passwordCurrentRef}
              />
              {showPassword.passwordCurrent ? (
                <FaEye
                  className={`${classes.icon} ${classes["icon-open"]}`}
                  onClick={() => showPasswordHandler("passwordCurrent")}
                />
              ) : (
                <IoEyeOff
                  className={`${classes.icon} ${classes["icon-close"]}`}
                  onClick={() => showPasswordHandler("passwordCurrent")}
                />
              )}
              {errorMessages.passwordCurrent.showError && (
                <p className={classes["error-message"]}>
                  <span>(&#8902;)</span> {errorMessages.passwordCurrent.message}
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
              <label htmlFor="lastname">New Password * </label>
              <input
                type={showPassword.newPassword ? "text" : "password"}
                id="new-password"
                className={classes["item-input"]}
                ref={newPasswordRef}
              />
              {showPassword.passwordCurrent ? (
                <FaEye
                  className={`${classes.icon} ${classes["icon-open"]}`}
                  onClick={() => showPasswordHandler("newPassword")}
                />
              ) : (
                <IoEyeOff
                  className={`${classes.icon} ${classes["icon-close"]}`}
                  onClick={() => showPasswordHandler("newPassword")}
                />
              )}
              {errorMessages.newPassword.showError && (
                <p className={classes["error-message"]}>
                  <span>(&#8902;)</span> {errorMessages.newPassword.message}
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
              <label htmlFor="country">Confirm Passwod * </label>
              <input
                type={showPassword.confirmNewPassword ? "text" : "password"}
                id="confirm-password"
                className={classes["item-input"]}
                ref={confirmNewPasswordRef}
              />
              {showPassword.confirmNewPassword ? (
                <FaEye
                  className={`${classes.icon} ${classes["icon-open"]}`}
                  onClick={() => showPasswordHandler("confirmNewPassword")}
                />
              ) : (
                <IoEyeOff
                  className={`${classes.icon} ${classes["icon-close"]}`}
                  onClick={() => showPasswordHandler("confirmNewPassword")}
                />
              )}
              {errorMessages.confirmNewPassword.showError && (
                <p className={classes["error-message"]}>
                  <span>(&#8902;)</span>{" "}
                  {errorMessages.confirmNewPassword.message}
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
