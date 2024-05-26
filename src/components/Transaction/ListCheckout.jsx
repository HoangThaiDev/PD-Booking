// Import Modules
import React, { useState } from "react";
import classes from "./css/listCheckout.module.css";
import moment from "moment";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { IoMdClose } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

export default function ListCheckout({ transactions }) {
  // Create + use Hooks
  const [showDetailCart, setShowDetailCart] = useState(false);

  // Create + use event Handlers

  return (
    <div className={classes.list}>
      <div className={classes["list__container"]}>
        <Row className={classes["transaction__row-title"]}>
          <Col className={classes["transaction__col-title"]} xl={1}>
            <p>#</p>
          </Col>
          <Col className={classes["transaction__col-title"]} xl={6}>
            <p>PRODUCTS</p>
          </Col>
          <Col className={classes["transaction__col-title"]} xl={6}>
            <p>INFOR CLIENT</p>
          </Col>
          <Col className={classes["transaction__col-title"]} xl={4}>
            <p>DATE ORDER</p>
          </Col>
          <Col className={classes["transaction__col-title"]} xl={4}>
            <p>TOTAL PRICE</p>
          </Col>
          <Col className={classes["transaction__col-title"]} xl={3}>
            <p>ACTION</p>
          </Col>
        </Row>
        <div className={classes["transaction__container-carts"]}>
          {transactions.length > 0 &&
            transactions.map((transaction, i) => (
              <Row
                className={classes["transaction__row-carts"]}
                key={transaction._id}
              >
                <Col className={classes["transaction__col-carts"]} xl={1}>
                  <p className={classes["carts-index"]}>{i + 1}</p>
                </Col>
                <Col className={classes["transaction__col-carts"]} xl={6}>
                  <p>View Items</p>
                </Col>
                <Col className={classes["transaction__col-carts"]} xl={6}>
                  <div className={classes["infoClient-detail"]}></div>
                </Col>
                <Col className={classes["transaction__col-carts"]} xl={4}>
                  <p className={classes["date-order"]}>
                    {moment(transaction.createAt).format("DD/MM/YYYY")}
                  </p>
                </Col>
                <Col className={classes["transaction__col-carts"]} xl={4}>
                  <p className={classes["totalPrice"]}>
                    {transaction.cart.totalPriceOfCarts} VNĐ
                  </p>
                </Col>
                <Col className={classes["transaction__col-carts"]} xl={3}>
                  <div className={classes["actions"]}>
                    <FaEye
                      className={`${classes.icon} ${classes["action__icon-show"]}`}
                    />
                    <IoMdClose
                      className={`${classes.icon} ${classes["action__icon-close"]}`}
                    />
                  </div>
                </Col>
              </Row>
            ))}
        </div>
      </div>
    </div>
  );
}
