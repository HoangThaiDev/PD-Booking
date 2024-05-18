// Import Modules
import React, { useState, useRef } from "react";
import classes from "./css/formForgotPassword.module.css";
import { checkValidateFormForgotPassword } from "../../middeware/checkValidateForm";

// Import Components
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
const bannerImage =
  "https://img.freepik.com/free-photo/photorealistic-wooden-house-with-timber-structure_23-2151302631.jpg";

// Import Icons
import { MdOutlineMail } from "react-icons/md";

export default function FormForgotPassword() {
  // Create + use Hooks
  const [errorMessages, setErrorMessages] = useState({
    email: false,
  });
  const emailRef = useRef("");

  // Create + use event Handlers
  const getPasswordByEmailHandler = (event) => {
    event.preventDefault();
    const infoUserRegister = {
      email: emailRef.current.value,
    };

    const { isCheck, errorMessages } =
      checkValidateFormForgotPassword(infoUserRegister);

    if (!isCheck) {
      setErrorMessages((prev) => {
        return {
          ...prev,
          email: errorMessages.email,
        };
      });
      return false;
    } else {
      setErrorMessages({
        email: false,
      });
    }
  };

  return (
    <div className={classes["form-getPassword"]}>
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
              <h1 className={classes["card__title"]}>FORGOT PASSWORD</h1>
              <p className={classes["card__content"]}>
                Just enter your Email, you will be able to find your forgotten
                password.
              </p>
              <Link to="/">BACK TO HOME</Link>
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={10} xs={24} sm={24} md={10}>
            <div className={classes["form-main"]}>
              <h2 className={classes["form-title"]}>FORGOT PASSWORD</h2>
              <form onSubmit={getPasswordByEmailHandler}>
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

                <button type="submit" className={classes["btn-sendMail"]}>
                  SEND EMAIL
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
