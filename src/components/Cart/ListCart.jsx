// Import Modules
import React, { useCallback, useMemo, useState } from "react";
import classes from "./css/listCart.module.css";
import { useSelector } from "react-redux";

// import Components
import { Row, Col } from "antd";
import ItemCart from "./ItemCart";

export default function ListCart({ cartUser }) {
  // Create + use Hooks
  const { isLoggedIn } = useSelector((state) => state.user);
  const [carts, setCarts] = useState(cartUser);

  const totalCarts = useMemo(() => {
    const totalPrice = carts.items.reduce((a, c) => {
      const convertPriceNumber = parseInt(c.totalPrice.replace(/\./g, ""));
      return a + convertPriceNumber;
    }, 0);

    return totalPrice.toLocaleString("us-US").replace(/\,/g, ".");
  }, [carts.items]);

  const updatedCartAfterDelete = useCallback((cart) => {
    setCarts(cart);
  }, []);

  const addToCheckoutHandler = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert("You need Sign In to Checkout!");
      return false;
    }
  };

  return (
    <div className={classes.listCart}>
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
              onSaveUpdatedCartAfterDelete={updatedCartAfterDelete}
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
                <p>{totalCarts} VNĐ</p>
              </div>
              <div className={classes["cart__total"]}>
                <p>Total</p>
                <p>{totalCarts} VNĐ</p>
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
