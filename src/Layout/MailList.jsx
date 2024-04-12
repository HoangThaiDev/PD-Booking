// Import Modules
import React from "react";
import "./css/mailList.css";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { SiMinutemailer } from "react-icons/si";

export default function MailList() {
  return (
    <div id="mailList">
      <div className="mailList__container">
        <Row className="mailList__row">
          <Col className="mailList__col" xl={10}>
            <p>STAY TUNED WITH PARADISE</p>
            <h1>
              Sign up for our newsletter to receive our news, deals and special
              offers.
            </h1>
          </Col>
          <Col className="mailList__col" xl={12}>
            <form>
              <div className="form-input">
                <input
                  className="input-email"
                  type="text"
                  placeholder="Your Email Address"
                />
                <button className="btn-email" type="submit">
                  Subscribe
                  <SiMinutemailer className="icon" />
                </button>
              </div>
              <div>
                <input className="input-checkbox" type="checkbox" id="check" />
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
