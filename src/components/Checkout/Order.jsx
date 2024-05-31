// Import Modules
import axios from "axios";
import { API_ROOT } from "../../utils/constant";
import { checkoutAction } from "../../redux/store";

// Import Hooks
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Import File CSS
import classes from "./css/order.module.css";

// Import Components
import { Row, Col, message } from "antd";

// Import Icons
import { MdError } from "react-icons/md";

export default function Order({ user }) {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const [checkouts, setCheckouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/checkouts/get-checkout/${user.userId}`
        );

        if (response.status === 200) {
          setCheckouts(response.data);
          dispatch(checkoutAction.saveCarts(response.data));
          setIsLoading(true);
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
      }
    };
    fetchCheckout();
  }, []);

  return (
    <div className={classes.order}>
      <div className={classes["order__container"]}>
        {contextHolder} {/* Alert Action */}
        <div className={classes["order__carts"]}>
          <h2>Your Order</h2>
          <Row className={classes["carts__row"]}>
            <Col
              className={classes["carts__col"]}
              xs={13}
              sm={13}
              md={13}
              lg={13}
              xl={13}
            >
              <h4>PRODUCT</h4>
            </Col>
            <Col
              className={classes["carts__col"]}
              xs={10}
              sm={8}
              md={8}
              lg={8}
              xl={8}
            >
              <h4>SUBTOTAL</h4>
            </Col>
          </Row>
          {!isLoading && checkouts.length === 0 && (
            <div className={classes["carts-empty"]}>
              <h2>Your Cart is empty!</h2>
            </div>
          )}
          {isLoading &&
            checkouts.items.length > 0 &&
            checkouts.items.map((item) => (
              <Row className={classes["carts__row"]} key={item._id}>
                <Col
                  className={classes["carts__col"]}
                  xs={13}
                  sm={13}
                  md={13}
                  lg={13}
                  xl={13}
                >
                  <div className={classes["cart-detail"]}>
                    <p className={classes["cart-detail-name"]}>{item.name}</p>
                    <p className={classes["cart-detail-date"]}>
                      <span>Date:</span> {item.date.startDate} -
                      {item.date.endDate}
                    </p>
                    <p className={classes["cart-detail-options"]}>
                      <span>Details:</span> Room: {item.rooms.length}, People:{" "}
                      {item.options.adults + item.options.children}
                    </p>
                  </div>
                </Col>
                <Col
                  className={classes["carts__col"]}
                  xs={10}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                >
                  <p className={classes["cart-price"]}>{item.totalPrice} VNĐ</p>
                </Col>
              </Row>
            ))}
          {isLoading && checkouts.items.length > 0 && (
            <Row className={classes["carts__footer"]}>
              <Col
                className={classes["carts__col"]}
                xs={8}
                sm={8}
                md={8}
                lg={8}
                xl={8}
              >
                <p>Total</p>
              </Col>
              <Col
                className={classes["carts__col"]}
                xs={13}
                sm={13}
                md={13}
                lg={13}
                xl={13}
              >
                <p>{checkouts.totalPriceOfCarts} VNĐ</p>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}
