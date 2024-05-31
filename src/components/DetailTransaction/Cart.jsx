// Import Hooks
import { useNavigate } from "react-router-dom";

// Import File CSS
import classes from "./css/cart.module.css";

// import Components
import { Row, Col } from "antd";
import Items from "./Items";
import ModalCart from "./ModalCart";
import { useState } from "react";

export default function Cart({ trans }) {
  // Create + use Hooks
  const [transaction, setTransaction] = useState(trans);
  const navigate = useNavigate();

  // Create + use event Handlers
  const updateTransactionHandler = (newCart, newTotalPrice) => {
    console.log(newCart, newTotalPrice);
    // Check newTransaction is [] ==> return page Transaction
    if (newCart.length === 0) {
      alert("Your Transaction is empty!");
      navigate("/transactions");
      return false;
    }

    setTransaction((state) => {
      return {
        ...state,
        cart: {
          items: newCart,
          totalPriceOfCarts: newTotalPrice,
        },
      };
    });
  };

  return (
    <div className={classes.listTrans}>
      <div className={classes["listTrans__container"]}>
        <Row className={classes["listTrans__row"]}>
          <Col
            className={`${classes["listTrans__col"]} ${classes["listTrans__carts"]}`}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={16}
          >
            <Row className={classes["listTrans__title-list"]}>
              <Col
                className={classes["listTrans__title-item"]}
                md={2}
                lg={2}
                xl={2}
              >
                <p>ACTION</p>
              </Col>
              <Col
                className={classes["listTrans__title-item"]}
                md={8}
                lg={10}
                xl={10}
              >
                <p>PRODUCT</p>
              </Col>
              <Col
                className={classes["listTrans__title-item"]}
                md={3}
                lg={3}
                xl={3}
              >
                <p>ROOMS</p>
              </Col>
              <Col
                className={classes["listTrans__title-item"]}
                md={4}
                lg={3}
                xl={3}
              >
                <p>PRICE (VNĐ)</p>
              </Col>
              <Col
                className={classes["listTrans__title-item"]}
                md={4}
                lg={3}
                xl={3}
              >
                <p>STATUS</p>
              </Col>
              <Col
                className={classes["listTrans__title-item-active"]}
                xs={24}
                sm={24}
              >
                <p>DETAIL CART</p>
              </Col>
            </Row>

            <Items
              cart={transaction.cart}
              transId={transaction._id}
              onSaveUpdateTransaction={updateTransactionHandler}
            />
          </Col>

          <Col
            className={`${classes["listTrans__col"]} ${classes["listTrans__formUser"]}`}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={7}
          >
            <ModalCart transaction={transaction} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
