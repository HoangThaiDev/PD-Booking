// Import Modules
import React, { useState } from "react";
import classes from "./css/itemCart.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { modalCartAction } from "../../redux/store";

// Import Components
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import PaginationCusTom from "../../UI/Pagination";

// Import Icons
import { IoMdClose } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function ItemCart({ data }) {
  // Create + use Hooks
  const [sliceCarts, setSliceCarts] = useState(data.slice(0, 5));
  const dispatch = useDispatch();

  // Create + use event Handlers
  const deleteCartHandler = async (id) => {
    const isCheck = confirm(`Do you want delete this cart!`);
    if (isCheck) {
      try {
        const response = await axios.delete(
          "http://localhost:5000/carts/delete-cart",
          { data: { id: id } }
        );

        if (response.status === 200) {
          setSliceCarts(response.data);
          dispatch(modalCartAction.saveModalCart());
        }
      } catch (error) {
        console.log(error);
      }
    }
    return false;
  };

  const showModalDetailCart = (cart) => {
    dispatch(modalCartAction.showModalCart(cart));
  };

  const getSliceCartHandler = (value) => {
    setSliceCarts(value);
  };

  return (
    <div className={classes.itemCart}>
      {sliceCarts.length === 0 && (
        <div className={classes["itemCart__message"]}>
          <h2>No Found Carts From User</h2>
          <Link to="/" className={classes["itemCart__link"]}>
            Back To Home
          </Link>
        </div>
      )}
      {sliceCarts.length > 0 &&
        sliceCarts.map((cart) => (
          <Row key={cart._id} className={classes["itemCart__content-list"]}>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-action"]} `}
              xl={2}
            >
              <p>
                <IoIosInformationCircleOutline
                  className={classes["icon__modal-action"]}
                  onClick={() => showModalDetailCart(cart)}
                />
                <IoMdClose
                  className={classes["icon__close-action"]}
                  onClick={() => deleteCartHandler(cart._id)}
                />
              </p>
            </Col>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-product"]} `}
              xl={10}
            >
              <div className={classes["item__card"]}>
                <img src={cart.photo} alt={cart.photo} />
                <div className={classes["card__content"]}>
                  <h3 className={classes["card__content-name"]}>{cart.name}</h3>
                  <p className={classes["card__content-date"]}>
                    Date:
                    <span>
                      {cart.startDate} - {cart.endDate}
                    </span>
                  </p>
                  <p className={classes["card__content-detail"]}>
                    Details:
                    <span>
                      Rooms: {cart.rooms.length}, People:{" "}
                      {cart.options.adults + cart.options.children}
                    </span>
                  </p>
                </div>
              </div>
            </Col>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-numberRooms"]} `}
              xl={3}
            >
              <p>{cart.numberRooms}</p>
            </Col>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-price"]} `}
              xl={3}
            >
              <p>{cart.totalPrice}</p>
            </Col>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-status"]} `}
              xl={3}
            >
              <p>{cart.status}</p>
            </Col>
          </Row>
        ))}
      <div className={classes["pagination__container"]}>
        <PaginationCusTom
          data={data}
          onSaveSliceData={getSliceCartHandler}
          pageSize={sliceCarts.length}
          refresh={false}
        />
      </div>
    </div>
  );
}
