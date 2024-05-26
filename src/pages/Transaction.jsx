// Import Modules
import React, { useEffect, useState } from "react";
import { API_ROOT } from "../utils/constant";
import axios from "axios";
import { useSelector } from "react-redux";
import "../UI/css/messageAlert.css";

// Import Components
import { message } from "antd";
import Header from "../UI/Header";
import ListCheckout from "../components/Transaction/ListCheckout";
const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg";

// Import Icons
import { MdError } from "react-icons/md";

export default function Transaction() {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

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

    fetchTransaction();
  }, [user]);

  return (
    <div className="carts">
      {contextHolder} {/* Alert Action */}
      <Header
        banner={banner}
        title="Transaction"
        content="HOME / TRANSACTION"
        showFormBooking={false}
      />
      {isLoading && <ListCheckout transactions={transactions} />}
    </div>
  );
}
