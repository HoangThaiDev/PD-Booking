// Import Modules
import React from "react";
import classes from "./css/modalCart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { modalCartAction } from "../redux/store";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { MdClose } from "react-icons/md";

export default function ModalCart() {
  // Create + use Hooks
  const { cart, showModal } = useSelector((state) => state.modalCart);
  const dispatch = useDispatch();

  // Create + use event Handlers
  const closeModalCartHandler = () => {
    dispatch(modalCartAction.hideModalCart());
  };

  return (
    <>
      {showModal && (
        <div className={classes.modalCart}>
          <div className={classes["modalCart__container"]}>
            <div className={classes["modalCart__block"]}>
              <MdClose
                className={classes["modalCart__icon-close"]}
                onClick={closeModalCartHandler}
              />
            </div>
            <Row className={classes["modalCart__row"]}>
              <Col className={classes["modalCart__col"]} xl={12}>
                <img src={cart.photo} alt={cart.photo} />
              </Col>
              <Col className={classes["modalCart__col"]} xl={11}>
                <p
                  className={`${classes["modalCart__item"]} ${classes["modalCart__name"]}`}
                >
                  {cart.name}
                </p>
                <p
                  className={`${classes["modalCart__item"]} ${classes["modalCart__date"]}`}
                >
                  Date:
                  <span>
                    {cart.startDate} - {cart.endDate}
                  </span>
                </p>
                <p
                  className={`${classes["modalCart__item"]} ${classes["modalCart__price"]}`}
                >
                  Price:
                  <span>{cart.price} VNĐ / Room</span>
                </p>
                <p
                  className={`${classes["modalCart__item"]} ${classes["modalCart__status"]}`}
                >
                  Status:
                  <span>{cart.status}</span>
                </p>
                <ul
                  className={`${classes["modalCart__item"]} ${classes["modalCart__detail"]}`}
                >
                  <p>Detail:</p>
                  <li>
                    <p
                      className={`${classes["modalCart__item"]} ${classes["modalCart__rooms"]}`}
                    >
                      Rooms:
                      <span>
                        {cart.rooms.length} ({cart.rooms.join(", ")})
                      </span>
                    </p>
                  </li>
                  <li>
                    <p
                      className={`${classes["modalCart__item"]} ${classes["modalCart__people"]}`}
                    >
                      People:
                      <span>
                        {cart.options.adults + cart.options.children} (
                        {cart.options.adults} Adults - {cart.options.children}
                        Children)
                      </span>
                    </p>
                  </li>
                </ul>
                <ul
                  className={`${classes["modalCart__item"]} ${classes["modalCart__service"]}`}
                >
                  <p>Services:</p>
                  <li>
                    <p
                      className={`${classes["modalCart__item"]} ${classes["modalCart__roomClean"]}`}
                    >
                      roomClean:
                      <span>{cart.services.roomClean} VNĐ</span>
                    </p>
                  </li>
                  <li>
                    <p
                      className={`${classes["modalCart__item"]} ${classes["modalCart__massage"]}`}
                    >
                      Massage:
                      <span>{cart.services.massage} VNĐ</span>
                    </p>
                  </li>
                  <li>
                    <p
                      className={`${classes["modalCart__item"]} ${classes["modalCart__daySpa"]}`}
                    >
                      daySpa:
                      <span>{cart.services.daySpa} VNĐ</span>
                    </p>
                  </li>
                </ul>
                <p
                  className={`${classes["modalCart__item"]} ${classes["modalCart__total"]}`}
                >
                  Total:
                  <span>{cart.totalPrice} VNĐ</span>
                </p>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
}
