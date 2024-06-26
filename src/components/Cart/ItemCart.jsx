// Import Modules
import axios from "axios";
import { modalCartAction } from "../../redux/store";
import { API_ROOT } from "../../utils/constant";

// Import Hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import File CSS
import classes from "./css/itemCart.module.css";
import "../../UI/css/ant-design/messageAlert.css";

// Import Components
import { Row, Col, message } from "antd";
import { Link } from "react-router-dom";
import PaginationCusTom from "../../UI/Pagination";

// Import Icons
import { IoMdClose } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function ItemCart({
  cartUser,
  isLoggedIn,
  onSaveUpdatedCartAfterDelete,
}) {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const [sliceCarts, setSliceCarts] = useState(cartUser.items.slice(0, 4));
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Create + use event Handlers
  const deleteCartHandler = async (id) => {
    const isCheck = confirm(`Do you want delete this cart!`);
    if (isCheck) {
      try {
        const response = await axios.delete(`${API_ROOT}/carts/delete-cart`, {
          data: { itemId: id, user: user },
        });

        onSaveUpdatedCartAfterDelete(response.data);
        const updatedCarts =
          response.data.items.map((c) => {
            c.numberRooms = c.rooms.join(", ");
            return c;
          }) || [];

        if (response.status === 200) {
          setSliceCarts(updatedCarts);
          dispatch(modalCartAction.saveModalCart());
          messageApi.open({
            type: "success",
            content: "Delete Product Success!",
            className: "message-success",
            icon: <FaCheck />,
          });
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
          content: "Delete Product Failed!",
          className: "message-error",
          icon: <MdError />,
        });
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
      {contextHolder} {/* Alert Action */}
      {isLoggedIn && sliceCarts.length === 0 && (
        <div className={classes["itemCart__message"]}>
          <h2>Your cart is currently empty</h2>
          <Link to="/rooms" className={classes["itemCart__link"]}>
            Return to shop
          </Link>
        </div>
      )}
      {isLoggedIn &&
        sliceCarts.length > 0 &&
        sliceCarts.map((cart) => (
          <Row key={cart._id} className={classes["itemCart__content-list"]}>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-action"]} `}
              md={2}
              lg={2}
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
              md={8}
              lg={10}
              xl={10}
            >
              <div className={classes["item__card"]}>
                <img src={cart.photo} alt={cart.photo} />
                <div className={classes["card__content"]}>
                  <h3 className={classes["card__content-name"]}>{cart.name}</h3>
                  <p className={classes["card__content-date"]}>
                    Date:
                    <span>
                      {cart.date.startDate} - {cart.date.endDate}
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
              md={3}
              lg={3}
              xl={3}
            >
              <p>{cart.numberRooms}</p>
            </Col>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-price"]} `}
              md={4}
              lg={3}
              xl={3}
            >
              <p>{cart.totalPrice}</p>
            </Col>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-status"]} `}
              md={4}
              lg={3}
              xl={3}
            >
              <p>{cart.status}</p>
            </Col>
          </Row>
        ))}
      {sliceCarts.length > 0 && (
        <div className={classes["pagination__container"]}>
          <PaginationCusTom
            data={cartUser}
            onSaveSliceData={getSliceCartHandler}
            pageSize={sliceCarts.length}
            refresh={false}
          />
        </div>
      )}
    </div>
  );
}
