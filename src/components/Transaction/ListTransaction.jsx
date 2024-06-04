// Import Modules
import moment from "moment";
import axios from "axios";
import { API_ROOT } from "../../utils/constant";

// Import Hooks
import React from "react";

// Import File CSS
import classes from "./css/listTransaction.module.css";

// Import Components
import { Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

// Import Icons
import { IoMdClose } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function ListTransaction({
  transactions,
  onSaveUpdateTransactions,
}) {
  // Create + use Hooks
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // Create + use event Handlers
  const navigateDetailTransHandler = (transaction_id) => {
    navigate(`/transaction/${transaction_id}`, {
      state: { transactionId: transaction_id },
    });
  };

  const deleteTransactionHandler = async (transaction_id, index) => {
    const result = confirm(
      `Do you wanna delete this Transaction "index: ${index}"`
    );
    if (result) {
      try {
        const response = await axios.delete(
          `${API_ROOT}/transactions/detail/${transaction_id}`
        );
        if (response.status === 200) {
          messageApi.open({
            type: "success",
            content: response.data.message,
            className: "message-success",
            icon: <FaCheck />,
          });
          onSaveUpdateTransactions(response.data.transactions);
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
    }
  };

  return (
    <div className={classes.list}>
      <div className={classes["list__container"]}>
        {contextHolder} {/* Alert Action */}
        <Row className={classes["transaction__row-title"]}>
          <Col className={classes["transaction__col-title"]} lg={2} xl={2}>
            <p>#</p>
          </Col>
          <Col className={classes["transaction__col-title"]} lg={12} xl={14}>
            <p>PRODUCTS</p>
          </Col>
          <Col className={classes["transaction__col-title"]} lg={7} xl={5}>
            <p>INFOR CLIENT</p>
          </Col>
          <Col className={classes["transaction__col-title"]} lg={3} xl={3}>
            <p>ACTION</p>
          </Col>
          <Col
            className={classes["transaction__col-title"]}
            xs={24}
            sm={24}
            md={24}
          >
            <p>TRANSACTIONS</p>
          </Col>
        </Row>
        <div className={classes["transaction__container-carts"]}>
          {transactions.length > 0 &&
            transactions.map((transaction, i) => (
              <Row
                className={classes["transaction__row-carts"]}
                key={transaction._id}
              >
                <Col
                  className={classes["transaction__col-carts"]}
                  lg={2}
                  xl={2}
                >
                  <p className={classes["carts-index"]}>{i + 1}</p>
                </Col>
                <Col
                  className={classes["transaction__col-carts"]}
                  lg={12}
                  xl={14}
                >
                  {transaction.cart.items.map((item) => (
                    <div key={item._id} className={classes["carts__product"]}>
                      <img src={item.photo} alt={item.photo} />
                      <div className={classes["product-info"]}>
                        <h3>{item.name}</h3>
                        <p>
                          <span>Location:</span> {item.nameCity} -{" "}
                          {item.nameResort}
                        </p>
                        <p>
                          <span>Date:</span> {item.date.startDate} -
                          {item.date.endDate}
                        </p>
                        <p>
                          <span>Rooms:</span> {item.numberRooms}
                        </p>
                        <p>
                          <span>People:</span>
                          {item.options.adults + item.options.children}
                        </p>
                        <p>
                          <span>Status:</span>
                          {item.status}
                        </p>
                        <p>
                          <span>Total Price:</span> {item.totalPrice} VNĐ
                        </p>
                      </div>
                    </div>
                  ))}
                </Col>
                <Col
                  className={classes["transaction__col-carts"]}
                  lg={7}
                  xl={5}
                >
                  <div className={classes["infoClient-detail"]}>
                    <div className={classes["detail-item"]}>
                      <span>User:</span>
                      <p>{transaction.user.username}</p>
                    </div>
                    <div className={classes["detail-item"]}>
                      <span>Email:</span>
                      <p>{transaction.infoUser.emailContact}</p>
                    </div>
                    <div className={classes["detail-item"]}>
                      <span>Phone:</span>
                      <p>{transaction.infoUser.phoneNumber}</p>
                    </div>
                    <div className={classes["detail-item"]}>
                      <span>Order date:</span>
                      <p className={classes["date-order"]}>
                        {moment(transaction.createAt).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <div className={classes["detail-item"]}>
                      <span>Order price:</span>
                      <p className={classes["totalPrice"]}>
                        {transaction.cart.totalPriceOfCarts} VNĐ
                      </p>
                    </div>
                  </div>
                </Col>

                <Col
                  className={classes["transaction__col-carts"]}
                  lg={3}
                  xl={3}
                >
                  <div className={classes["actions"]}>
                    <FaEye
                      className={`${classes.icon} ${classes["action__icon-show"]}`}
                      onClick={() =>
                        navigateDetailTransHandler(transaction._id)
                      }
                    />
                    <IoMdClose
                      className={`${classes.icon} ${classes["action__icon-close"]}`}
                      onClick={() =>
                        deleteTransactionHandler(transaction._id, i + 1)
                      }
                    />
                  </div>
                </Col>
              </Row>
            ))}

          {transactions.length === 0 && (
            <div className={classes["transaction-empty"]}>
              <h3>Your Transaction is Empty!</h3>
              <Link to="/rooms">Go to shop</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
