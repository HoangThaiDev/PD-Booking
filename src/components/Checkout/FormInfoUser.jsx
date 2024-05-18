// Import Modules
import React from "react";
import classes from "./css/formInfoUser.module.css";

// Import Components
import { Row, Col } from "antd";

export default function FormInfoUser() {
  return (
    <div className={classes.form}>
      <div className={classes["form__container"]}>
        <h2 className={classes["form__title"]}>Billing details</h2>
        <Row className={classes["form__row"]}>
          <Col className={classes["form__col"]} xl={11}>
            <div className={classes["form__item"]}>
              <label htmlFor="firstName" className={classes["item__title"]}>
                First name <span>*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className={classes["item__input"]}
                placeholder="Your first name"
              />
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={11}>
            <div className={classes["form__item"]}>
              <label htmlFor="lastName" className={classes["item__title"]}>
                Last name <span>*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className={classes["item__input"]}
                placeholder="Your last name"
              />
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={24}>
            <div className={classes["form__item"]}>
              <label htmlFor="country" className={classes["item__title"]}>
                Country / Region <span>*</span>
              </label>
              <input
                type="text"
                id="country"
                className={classes["item__input"]}
                placeholder="Your country name"
              />
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={24}>
            <div className={classes["form__item"]}>
              <label className={classes["item__title"]}>
                Street Address <span>*</span>
              </label>
              <input
                type="text"
                className={classes["item__input"]}
                placeholder="House and street name"
              />
              <input
                type="text"
                className={classes["item__input"]}
                placeholder="Town / City"
              />
            </div>
          </Col>
          <Col className={classes["form__col"]} xl={24}>
            <div className={classes["form__item"]}>
              <label className={classes["item__title"]}>
                Additional Information <span>*</span>
              </label>
              <input
                type="text"
                className={classes["item__input"]}
                placeholder="Your phone number"
              />
              <input
                type="text"
                className={classes["item__input"]}
                placeholder="Your email address"
              />
              <textarea
                className={classes["item__textarea"]}
                cols={2}
                rows={5}
                placeholder="Order Notes (Optional)"
              ></textarea>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
