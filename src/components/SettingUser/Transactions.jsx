// Import Modules
import axios from "axios";
import { API_ROOT } from "../../utils/constant";
import moment from "moment";

// Import Hooks
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/transactions.module.css";
import "../../UI/css/messageAlert.css";

// Import Components
import { message, Row, Col } from "antd";

// Import Icons
import { MdError } from "react-icons/md";
import { FaEye } from "react-icons/fa";

export default function Transactions() {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Create + use fetch API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/transactions/get-transaction/${user.userId}`
        );

        if (response.status === 200) {
          setTransactions(response.data);
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
    if (isLoggedIn) {
      fetchTransactions();
    }
  }, [isLoggedIn]);

  return (
    <div>
      {contextHolder} {/* Alert Action */}
      {isLoading && (
        <div className={classes.transactions}>
          <div className={classes["transactions__container"]}>
            <Row className={classes["transactions__row-title"]}>
              <Col className={classes["transactions__col-title"]} xl={2}>
                <p>#</p>
              </Col>
              <Col className={classes["transactions__col-title"]} xl={6}>
                <p>Client</p>
              </Col>
              <Col className={classes["transactions__col-title"]} xl={6}>
                <p>Order Date</p>
              </Col>
              <Col className={classes["transactions__col-title"]} xl={7}>
                <p>Total</p>
              </Col>
              <Col className={classes["transactions__col-title"]} xl={3}>
                <p>Active</p>
              </Col>
            </Row>
            {transactions.length > 0 &&
              transactions.map((tr, i) => (
                <Row
                  key={tr._id}
                  className={classes["transactions__row-content"]}
                >
                  <Col
                    className={classes["transactions__col-content"]}
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={2}
                  >
                    <span className={classes["title-active-mobile"]}>#</span>
                    <p className={classes["content-id"]}>{i + 1}</p>
                  </Col>
                  <Col
                    className={classes["transactions__col-content"]}
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={6}
                  >
                    {" "}
                    <span className={classes["title-active-mobile"]}>
                      Client
                    </span>
                    <p className={classes["content-client"]}>
                      {tr.infoUser.emailContact}
                    </p>
                  </Col>
                  <Col
                    className={classes["transactions__col-content"]}
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={6}
                  >
                    <span className={classes["title-active-mobile"]}>
                      Order Date
                    </span>
                    <p className={classes["content-date"]}>
                      {moment(tr.createAt).format("DD/MM/YYYY")}
                    </p>
                  </Col>
                  <Col
                    className={classes["transactions__col-content"]}
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={7}
                  >
                    <span className={classes["title-active-mobile"]}>
                      Total
                    </span>
                    <p className={classes["content-total"]}>
                      {tr.cart.totalPriceOfCarts} VNĐ for {tr.cart.items.length}{" "}
                      Items
                    </p>
                  </Col>
                  <Col
                    className={classes["transactions__col-content"]}
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={3}
                  >
                    <span className={classes["title-active-mobile"]}>
                      Active
                    </span>
                    <p className={classes["content-active"]}>
                      <FaEye className={classes["icon-show"]} />
                    </p>
                  </Col>
                </Row>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
