// Import Modules
import axios from "axios";
import { API_ROOT } from "../../utils/constant";

// Import Hooks
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import File CSS
import classes from "./css/listCart.module.css";
import "../../UI/css/messageAlert.css";

// import Components
import { Row, Col, message } from "antd";
import ItemCart from "./ItemCart";

// Import Icons
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function ListCart({ cartUser }) {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [carts, setCarts] = useState(cartUser);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCheckoutHandler = async () => {
      try {
        const response = await axios.post(
          `${API_ROOT}/checkouts/add-checkout`,
          {
            carts,
            user,
            totalPriceCarts,
          }
        );
        if (response.status === 200) {
          messageApi.open({
            type: "success",
            content: response.data.message,
            className: "message-success",
            icon: <FaCheck />,
          });
          return false;
        }
      } catch (error) {
        if (error.response.data.session) {
          messageApi.open({
            type: "error",
            content: error.response.data.message,
            className: "message-error",
            icon: <MdError />,
          });
          setTimeout(() => {
            window.location.replace("/login");
          }, 1000);
          return false;
        }
        messageApi.open({
          type: "error",
          content: error.response.data.message,
          className: "message-error",
          icon: <MdError />,
        });
      }
    };
    if (isLoggedIn) {
      updateCheckoutHandler();
    }
  }, [carts]);

  //  Create + use event Handler
  const totalPriceCarts = useMemo(() => {
    const totalPrice = carts.items.reduce((a, c) => {
      const convertPriceNumber = parseInt(c.totalPrice.replace(/\./g, ""));
      return a + convertPriceNumber;
    }, 0);

    return totalPrice.toLocaleString("us-US").replace(/\,/g, ".");
  }, [carts.items]);

  const updatedCartAfterDeleteHandler = useCallback((cart) => {
    setCarts(cart);
  }, []);

  const addToCheckoutHandler = async (event) => {
    event.preventDefault();
    navigate("/checkout");
  };

  return (
    <div className={classes.listCart}>
      {contextHolder} {/* Alert Action */}
      <div className={classes["listCart__container"]}>
        <Row className={classes["listCart__row"]}>
          <Col
            className={`${classes["listCart__col"]} ${classes["listCart__carts"]}`}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={16}
          >
            <Row className={classes["listCart__title-list"]}>
              <Col
                className={classes["listCart__title-item"]}
                md={2}
                lg={2}
                xl={2}
              >
                <p>ACTION</p>
              </Col>
              <Col
                className={classes["listCart__title-item"]}
                md={8}
                lg={10}
                xl={10}
              >
                <p>PRODUCT</p>
              </Col>
              <Col
                className={classes["listCart__title-item"]}
                md={3}
                lg={3}
                xl={3}
              >
                <p>ROOMS</p>
              </Col>
              <Col
                className={classes["listCart__title-item"]}
                md={4}
                lg={3}
                xl={3}
              >
                <p>PRICE (VNĐ)</p>
              </Col>
              <Col
                className={classes["listCart__title-item"]}
                md={4}
                lg={3}
                xl={3}
              >
                <p>STATUS</p>
              </Col>
              <Col
                className={classes["listCart__title-item-active"]}
                xs={24}
                sm={24}
              >
                <p>DETAIL CART</p>
              </Col>
            </Row>

            <ItemCart
              cartUser={cartUser}
              isLoggedIn={isLoggedIn}
              onSaveUpdatedCartAfterDelete={updatedCartAfterDeleteHandler}
            />
          </Col>

          <Col
            className={`${classes["listCart__col"]} ${classes["listCart__formPrice"]}`}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={7}
          >
            <form
              className={classes["form-cart"]}
              onSubmit={addToCheckoutHandler}
            >
              <h2>Cart totals</h2>
              <div className={classes["cart__subtotal"]}>
                <p>Subtotal</p>
                <p>{totalPriceCarts} VNĐ</p>
              </div>
              <div className={classes["cart__total"]}>
                <p>Total</p>
                <p>{totalPriceCarts} VNĐ</p>
              </div>
              <button type="submit" className={classes["cart__btn-checkout"]}>
                Proceed to checkout
              </button>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
