// Import Hooks
import React from "react";

// Import File CSS
import classes from "./css/formInfoUser.module.css";

// Import Components
import { Row, Col } from "antd";

export default function FormInfoUser({
  firstNameRef,
  lastNameRef,
  countryRef,
  addressRef,
  cityRef,
  phoneRef,
  emailRef,
  orderNoteRef,
  errorMessages,
}) {
  // Create + use Hooks
  const { firstName, lastName, country, address, city, phone, email } =
    errorMessages;

  return (
    <div className={classes.form}>
      <div className={classes["form__container"]}>
        <h2 className={classes["form__title"]}>Billing details</h2>
        <Row className={classes["form__row"]}>
          <Col className={classes["form__col"]} xs={11} xl={11}>
            <div className={classes["form__item"]}>
              <label htmlFor="firstName" className={classes["item__title"]}>
                First name <span>*</span>
              </label>
              <div className={classes["item__input-flex"]}>
                <input
                  type="text"
                  id="firstName"
                  className={
                    firstName.showError
                      ? `${classes["item__input"]} ${classes["item__input-error"]}`
                      : classes["item__input"]
                  }
                  placeholder="Your first name"
                  ref={firstNameRef}
                />
                {firstName.showError && (
                  <span className={classes["message-error"]}>
                    (&#8902;) {firstName.message}
                  </span>
                )}
              </div>
            </div>
          </Col>
          <Col className={classes["form__col"]} xs={11} xl={11}>
            <div className={classes["form__item"]}>
              <label htmlFor="lastName" className={classes["item__title"]}>
                Last name <span>*</span>
              </label>
              <div className={classes["item__input-flex"]}>
                <input
                  type="text"
                  id="lastName"
                  className={
                    lastName.showError
                      ? `${classes["item__input"]} ${classes["item__input-error"]}`
                      : classes["item__input"]
                  }
                  placeholder="Your last name"
                  ref={lastNameRef}
                />
                {lastName.showError && (
                  <span className={classes["message-error"]}>
                    (&#8902;) {lastName.message}
                  </span>
                )}
              </div>
            </div>
          </Col>
          <Col className={classes["form__col"]} xs={24} xl={24}>
            <div className={classes["form__item"]}>
              <label htmlFor="country" className={classes["item__title"]}>
                Country / Region <span>*</span>
              </label>
              <div className={classes["item__input-flex"]}>
                <input
                  type="text"
                  id="country"
                  className={
                    country.showError
                      ? `${classes["item__input"]} ${classes["item__input-error"]}`
                      : classes["item__input"]
                  }
                  placeholder="Your country name"
                  ref={countryRef}
                />
                {country.showError && (
                  <span className={classes["message-error"]}>
                    (&#8902;) {country.message}
                  </span>
                )}
              </div>
            </div>
          </Col>
          <Col className={classes["form__col"]} xs={24} xl={24}>
            <div className={classes["form__item"]}>
              <label className={classes["item__title"]}>
                Street Address <span>*</span>
              </label>
              <div className={classes["item__input-flex"]}>
                <input
                  type="text"
                  className={
                    address.showError
                      ? `${classes["item__input"]} ${classes["item__input-error"]}`
                      : classes["item__input"]
                  }
                  placeholder="House and street name"
                  ref={addressRef}
                />
                {address.showError && (
                  <span className={classes["message-error"]}>
                    (&#8902;) {address.message}
                  </span>
                )}
              </div>
              <div className={classes["item__input-flex"]}>
                <input
                  type="text"
                  className={
                    city.showError
                      ? `${classes["item__input"]} ${classes["item__input-error"]}`
                      : classes["item__input"]
                  }
                  placeholder="Town / City"
                  ref={cityRef}
                />
                {city.showError && (
                  <span className={classes["message-error"]}>
                    (&#8902;) {city.message}
                  </span>
                )}
              </div>
            </div>
          </Col>
          <Col className={classes["form__col"]} xs={24} xl={24}>
            <div className={classes["form__item"]}>
              <label className={classes["item__title"]}>
                Additional Information <span>*</span>
              </label>
              <div className={classes["item__input-flex"]}>
                <input
                  type="text"
                  className={
                    phone.showError
                      ? `${classes["item__input"]} ${classes["item__input-error"]}`
                      : classes["item__input"]
                  }
                  placeholder="Your phone number"
                  ref={phoneRef}
                />
                {phone.showError && (
                  <span className={classes["message-error"]}>
                    (&#8902;) {phone.message}
                  </span>
                )}
              </div>
              <div className={classes["item__input-flex"]}>
                <input
                  type="text"
                  className={
                    email.showError
                      ? `${classes["item__input"]} ${classes["item__input-error"]}`
                      : classes["item__input"]
                  }
                  placeholder="Your email address"
                  ref={emailRef}
                />
                {email.showError && (
                  <span className={classes["message-error"]}>
                    (&#8902;) {email.message}
                  </span>
                )}
              </div>
              <textarea
                className={classes["item__textarea"]}
                cols={2}
                rows={5}
                placeholder="Order Notes (Optional)"
                ref={orderNoteRef}
              ></textarea>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
