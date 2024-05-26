// Import Modules
import React, { useEffect, useState } from "react";
import classes from "./css/transactions.module.css";
import "../../UI/css/messageAlert.css";
import axios from "axios";
import { API_ROOT } from "../../utils/constant";
import { useSelector } from "react-redux";
import moment from "moment";

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
                <p>CLIENT</p>
              </Col>
              <Col className={classes["transactions__col-title"]} xl={6}>
                <p>ORDER DATE</p>
              </Col>
              <Col className={classes["transactions__col-title"]} xl={7}>
                <p>TOTAL</p>
              </Col>
              <Col className={classes["transactions__col-title"]} xl={3}>
                <p>ACTIVE</p>
              </Col>
            </Row>
            {transactions.length > 0 &&
              transactions.map((tr, i) => (
                <Row
                  key={tr._id}
                  className={classes["transactions__row-content"]}
                >
                  <Col className={classes["transactions__col-content"]} xl={2}>
                    <p className={classes["content-id"]}>{i + 1}</p>
                  </Col>
                  <Col className={classes["transactions__col-content"]} xl={6}>
                    <p className={classes["content-client"]}>
                      {tr.infoUser.emailContact}
                    </p>
                  </Col>
                  <Col className={classes["transactions__col-content"]} xl={6}>
                    <p className={classes["content-date"]}>
                      {" "}
                      {moment(tr.createAt).format("DD/MM/YYYY")}
                    </p>
                  </Col>
                  <Col className={classes["transactions__col-content"]} xl={7}>
                    <p className={classes["content-total"]}>
                      {tr.cart.totalPriceOfCarts} VNĐ for {tr.cart.items.length}{" "}
                      Items
                    </p>
                  </Col>
                  <Col className={classes["transactions__col-content"]} xl={3}>
                    <p className={classes["content-active"]}>
                      <FaEye />
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
