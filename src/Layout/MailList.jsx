// Import Modules
import React from "react";
import classes from "./css/mailList.module.css";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { SiMinutemailer } from "react-icons/si";

export default function MailList() {
  return (
    <div className={classes.mailList}>
      <div className={classes["mailList__container"]}>
        <Row className={classes["mailList__row"]}>
          <Col className={classes["mailList__col"]} xs={24} xl={10}>
            <p>STAY TUNED WITH PARADISE</p>
            <h1>
              Sign up for our newsletter to receive our news, deals and special
              offers.
            </h1>
          </Col>
          <Col className={classes["mailList__col"]} xs={24} xl={12}>
            <form className={classes.form}>
              <div className={classes["form-input"]}>
                <input
                  className={classes["input-email"]}
                  type="text"
                  placeholder="Your Email Address"
                />
                <button className={classes["btn-email"]} type="submit">
                  Subscribe
                  <SiMinutemailer className={classes.icon} />
                </button>
              </div>
              <div className={classes["form-input"]}>
                <input
                  className={classes["input-checkbox"]}
                  type="checkbox"
                  id={classes.check}
                />
                <label htmlFor="check">
                  I agree to the <span>Privacy Policy</span>
                </label>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
