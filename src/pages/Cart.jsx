// Import Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ROOT } from "../utils/constant";
import { useSelector } from "react-redux";

// Import Components
import Header from "../UI/Header";
import ListCart from "../components/Cart/ListCart";
import ModalCart from "../UI/ModalCart";

const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg";

export default function Cart() {
  // Create + use Hooks
  const [cartUser, setCartUser] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.post(`${API_ROOT}/carts/get-carts`, {
          user,
        });
        console.log(response.data);
        if (response.status === 200) {
          const updatedCarts = response.data.items.map((c) => {
            c.numberRooms = c.rooms.join(", ");
            return c;
          });

          setCartUser({ items: updatedCarts });
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error.response.data.message);
        setIsLoading(true);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="carts">
      <Header
        banner={banner}
        title="Cart"
        content="HOME / CART"
        showFormBooking={false}
      />
      <ModalCart />
      {isLoading && <ListCart cartUser={cartUser} />}
    </div>
  );
}
