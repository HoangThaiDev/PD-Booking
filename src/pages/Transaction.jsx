// Import Modules
import axios from "axios";
import { API_ROOT } from "../utils/constant";

// Import Hooks
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Import File CSS
import "../UI/css/ant-design/messageAlert.css";

// Import Components
import { message } from "antd";
import Header from "../UI/Header";
import ListTransaction from "../components/Transaction/ListTransaction";
import banner from "../assets/Images Banner/banner2.jpg";

// Import Icons
import { MdError } from "react-icons/md";

export default function Transaction() {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/transactions/get-transaction/${user?.userId}`
        );
        if (response.status === 200) {
          setTransactions(response.data);
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error);
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
      fetchTransaction();
    }
  }, [user]);

  // Create + use event Handlers
  const updateTransactionsHandler = (newTransations) => {
    setTransactions(newTransations);
  };

  return (
    <div className="carts">
      {contextHolder} {/* Alert Action */}
      <Header
        banner={banner}
        title="Transaction"
        content="HOME / TRANSACTION"
        showFormBooking={false}
      />
      {isLoading && (
        <ListTransaction
          transactions={transactions}
          onSaveUpdateTransactions={updateTransactionsHandler}
        />
      )}
    </div>
  );
}
