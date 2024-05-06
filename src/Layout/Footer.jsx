// Import Modules
import React from "react";
import classes from "./css/footer.module.css";

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
    <div className={classes.footer}>
      <div className={classes["footer__container"]}>
        <Row className={classes["footer__row"]}>
          <Col
            className={classes["footer__col"]}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
          >
            <div className={classes.card}>
              <span className={classes["card-title"]}>ADDRESS</span>
              <p className={classes["card-content"]}>P11, Q11, TP.HCM</p>
            </div>
          </Col>
          <Col
            className={classes["footer__col"]}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
          >
            <div className={classes.card}>
              <span className={classes["card-title"]}>PHONE</span>
              <p className={classes["card-content"]}>+84 22 345 67 88</p>
            </div>
          </Col>
          <Col
            className={classes["footer__col"]}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
          >
            <div className={classes.card}>
              <span className={classes["card-title"]}>EMAIL</span>
              <p className={classes["card-content"]}>thain4268@gmail.com</p>
            </div>
          </Col>
          <Col
            className={classes["footer__col"]}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
          >
            <div className={classes.card}>
              <span className={classes["card-title"]}>SOCIAL</span>
              <div className={classes["card-socials"]}>
                <FaFacebookF className={classes.icon} />
                <FaInstagramSquare className={classes.icon} />
                <FaTelegram className={classes.icon} />
                <FaTwitter className={classes.icon} />
                <FaYoutube className={classes.icon} />
              </div>
            </div>
          </Col>
        </Row>
        <div className={classes["content-wrapper"]}>
          <span>PRIVACY</span>
          <span>TERMS OF USE</span>
          <span>POLICY</span>
        </div>
      </div>
    </div>
  );
}
