// Import Modules
import React from "react";
import "./css/footer.css";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <div id="footer">
      <div className="footer__container">
        <Row className="footer__row">
          <Col className="footer__col" xl={6}>
            <div className="card">
              <span className="card-title">ADDRESS</span>
              <p className="card-content">P11, Q11, TP.HCM</p>
            </div>
          </Col>
          <Col className="footer__col" xl={6}>
            <div className="card">
              <span className="card-title">PHONE</span>
              <p className="card-content">+84 22 345 67 88</p>
            </div>
          </Col>
          <Col className="footer__col" xl={6}>
            <div className="card">
              <span className="card-title">EMAIL</span>
              <p className="card-content">thain4268@gmail.com</p>
            </div>
          </Col>
          <Col className="footer__col" xl={6}>
            <div className="card">
              <span className="card-title">SOCIAL</span>
              <div className="card-socials">
                <FaFacebookF className="icon" />
                <FaInstagramSquare className="icon" />
                <FaTelegram className="icon" />
                <FaTwitter className="icon" />
                <FaYoutube className="icon" />
              </div>
            </div>
          </Col>
        </Row>
        <div className="content-wrapper">
          <span>PRIVACY</span>
          <span>TERMS OF USE</span>
          <span>POLICY</span>
        </div>
      </div>
    </div>
  );
}
