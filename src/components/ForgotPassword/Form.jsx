// Import Modules
import React, { useState } from "react";
import classes from "./css/form.module.css";

// Import Components
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
const bannerImage =
  "https://img.freepik.com/free-photo/photorealistic-wooden-house-with-timber-structure_23-2151302631.jpg?t=st=1713543361~exp=1713546961~hmac=6fc1613b3856a4bc6e842e85fbd20634abdbae8ebd34a13288156619a2d6d6e8&w=996";

// Import Icons
import { MdOutlineMail } from "react-icons/md";

export default function Form() {
  // Create + use Hooks

  // Create + use event Handlers
  const signInHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes["form-getPassword"]}>
      <img
        className={classes["form-background"]}
        src={bannerImage}
        alt={bannerImage}
      />
      <div className={classes["form__container"]}>
        <Row className={classes["form__row"]}>
          <Col className={classes["form__col"]} xl={12}>
            <div className={classes["card__introduce-container"]}>
              <h1 className={classes["card__title"]}>FORGOT PASSWORD</h1>
              <p className={classes["card__content"]}>
                Just enter your Email, you will be able to find your forgotten
                password.
              </p>
              <Link to="/">BACK TO HOME</Link>
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={10}>
            <div className={classes["form-main"]}>
              <h2 className={classes["form-title"]}>FORGOT PASSWORD</h2>
              <form onSubmit={signInHandler}>
                <div
                  className={`${classes["form-input"]} ${classes["input-email"]}`}
                >
                  <input type="text" placeholder="Email" />
                  <MdOutlineMail className={classes.icon} />
                  <p className={classes["error-message"]}>
                    <span>(&#8902;)</span> The Email is required
                  </p>
                </div>

                <button type="submit" className={classes["btn-login"]}>
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
