// Import Modules
import React, { useState } from "react";
import classes from "./css/formRegister.module.css";

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
import { PiUser } from "react-icons/pi";

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
    <div className={classes["form-register"]}>
      <img
        className={classes["form-background"]}
        src={bannerImage}
        alt={bannerImage}
      />
      <div className={classes["form__container"]}>
        <Row className={classes["form__row"]}>
          <Col className={classes["form__col"]} xl={12}>
            <div className={classes["card__introduce-container"]}>
              <h1 className={classes["card__title"]}>SIGN UP</h1>
              <p className={classes["card__content"]}>
                Register for an account to increase your experience and room
                booking activities completely with<span> PARADISE</span>
              </p>
              <Link to="/">BACK TO HOME</Link>
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={10}>
            <div className={classes["form-main"]}>
              <h2 className={classes["form-title"]}>SIGN UP</h2>
              <form onSubmit={signInHandler}>
                <div
                  className={`${classes["form-input"]} ${classes["input-email"]}`}
                >
                  <input type="text" placeholder="Username" />
                  <PiUser className={classes.icon} />
                  <p className={classes["error-message"]}>
                    <span>(&#8902;)</span> Username is required
                  </p>
                </div>
                <div
                  className={`${classes["form-input"]} ${classes["input-email"]}`}
                >
                  <input type="text" placeholder="Email" />
                  <MdOutlineMail className={classes.icon} />
                  <p className={classes["error-message"]}>
                    <span>(&#8902;)</span> Email is required (abc@gmail.com)
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
                    <span>(&#8902;)</span> Password is required
                  </p>
                </div>
                <div
                  className={`${classes["form-input"]} ${classes["input-password"]}`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
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
                    <span>(&#8902;)</span> Passwords must be matched
                  </p>
                </div>
                <button type="submit" className={classes["btn-login"]}>
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
