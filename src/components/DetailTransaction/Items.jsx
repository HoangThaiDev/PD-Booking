// Import Modules
import axios from "axios";
import { API_ROOT } from "../../utils/constant";

// Import Hooks
import React, { useEffect, useState } from "react";

// Import File CSS
import classes from "./css/items.module.css";
import "../../UI/css/messageAlert.css";

// Import Components
import { Row, Col, message } from "antd";
import PaginationCusTom from "../../UI/Pagination";

// Import Icons
import { IoMdClose } from "react-icons/io";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function Items({ cart, transId, onSaveUpdateTransaction }) {
  console.log("cap nhat item", cart);
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const [sliceCarts, setSliceCarts] = useState([]);

  useEffect(() => {
    setSliceCarts(cart.items.slice(0, 4));
  }, [cart]);

  // Create + use event Handlers
  const getSliceCartHandler = (value) => {
    setSliceCarts(value);
  };

  const deleteCartHandler = async (itemId) => {
    const result = confirm("Do you wanna delete this Item!");

    if (result) {
      try {
        const response = await axios.post(
          `${API_ROOT}/transactions/delete-item/${itemId}`,
          { transId }
        );
        if (response.status === 200) {
          onSaveUpdateTransaction(
            response.data.cart,
            response.data.totalPriceOfCarts
          );
          messageApi.open({
            type: "success",
            content: response.data.message,
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
  };

  return (
    <div className={classes.itemCart}>
      {contextHolder} {/* Alert Action */}
      {sliceCarts.length > 0 &&
        sliceCarts.map((item) => (
          <Row key={item._id} className={classes["itemCart__content-list"]}>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-action"]} `}
              md={2}
              lg={2}
              xl={2}
            >
              <p>
                <IoMdClose
                  className={classes["icon__delete-action"]}
                  onClick={() => deleteCartHandler(item._id)}
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
                <img src={item.photo} alt={item.photo} />
                <div className={classes["card__content"]}>
                  <h3 className={classes["card__content-name"]}>{item.name}</h3>
                  <p className={classes["card__content-date"]}>
                    Date:
                    <span>
                      {item.date.startDate} - {item.date.endDate}
                    </span>
                  </p>
                  <p className={classes["card__content-detail"]}>
                    Details:
                    <span>
                      Rooms: {item.rooms.length}, People:{" "}
                      {item.options.adults + item.options.children}
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
              <p>{item.numberRooms}</p>
            </Col>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-price"]} `}
              md={4}
              lg={3}
              xl={3}
            >
              <p>{item.totalPrice}</p>
            </Col>
            <Col
              className={`${classes["itemCart__content-item"]} ${classes["itemCart__content-status"]} `}
              md={4}
              lg={3}
              xl={3}
            >
              <p>{item.status}</p>
            </Col>
          </Row>
        ))}
      {sliceCarts.length > 0 && (
        <div className={classes["pagination__container"]}>
          <PaginationCusTom
            data={cart}
            onSaveSliceData={getSliceCartHandler}
            pageSize={sliceCarts.length}
            refresh={false}
          />
        </div>
      )}
    </div>
  );
}
