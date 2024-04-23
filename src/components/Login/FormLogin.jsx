// Import Modules
import React, { useState } from "react";
import classes from "./css/formLogin.module.css";

// Import Components
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
const bannerImage =
  "https://img.freepik.com/free-photo/photorealistic-wooden-house-with-timber-structure_23-2151302631.jpg?t=st=1713543361~exp=1713546961~hmac=6fc1613b3856a4bc6e842e85fbd20634abdbae8ebd34a13288156619a2d6d6e8&w=996";

// Import Icons
import { MdOutlineMail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

export default function FormLogin() {
  // Create + use Hooks
  const [showPassword, setShowPassword] = useState(false);

  // Create + use event Handlers
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const signInHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes["form-login"]}>
      <img
        className={classes["form-background"]}
        src={bannerImage}
        alt={bannerImage}
      />
      <div className={classes["form__container"]}>
        <Row className={classes["form__row"]}>
          <Col className={classes["form__col"]} xl={12}>
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
          <Col className={classes["form__col"]} xl={10}>
            <div className={classes["form-main"]}>
              <h2 className={classes["form-title"]}>SIGN IN</h2>
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
                <div
                  className={`${classes["form-input"]} ${classes["input-password"]}`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <IoKeyOutline className={classes.icon} />
                  {showPassword ? (
                    <FaEye
                      className={classes["icon-show"]}
                      onClick={showPasswordHandler}
                    />
                  ) : (
                    <IoEyeOff
                      className={classes["icon-show"]}
                      onClick={showPasswordHandler}
                    />
                  )}
                  <p className={classes["error-message"]}>
                    <span>(&#8902;)</span> The Password is required
                  </p>
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
