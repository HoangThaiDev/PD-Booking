// Import Modules
import axios from "axios";
import { API_ROOT } from "../utils/constant";

// Import Hooks
import React, { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";

// Import File CSS
import "../UI/css/messageAlert.css";

// Import Components
import { message } from "antd";
import Header from "../UI/Header";
import Cart from "../components/DetailTransaction/Cart";
const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg";

// Import Icons
import { MdError } from "react-icons/md";

function DetailTransaction() {
  // Create + use Hooks
  const [messageApi, contextHolder] = message.useMessage();
  const { state } = useLocation();
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetailResort = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/transactions/detail/${state.transactionId}`
        );

        if (response.status === 200) {
          setTransaction(response.data);
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
        setIsLoading(false);
      }
    };
    fetchDetailResort();
  }, [state.resortId]);

  return (
    <div>
      {isLoading && Object.keys(transaction).length > 0 && (
        <>
          {contextHolder} {/* Alert Action */}
          <Header
            banner={banner}
            title="Detail Transaction"
            content="HOME / DETAIL TRANSACTION"
            showFormBooking={false}
          />
          <Cart trans={transaction} />
        </>
      )}
    </div>
  );
}

export default memo(DetailTransaction);
