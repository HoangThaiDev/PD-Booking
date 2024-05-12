// Import Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_ROOT } from "../utils/constant";

// Import Components
import Header from "../UI/Header";
import ListCart from "../components/Cart/ListCart";
import ModalCart from "../UI/ModalCart";

const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg";

export default function Cart() {
  // Create + use Hooks
  const [cartUser, setCartUser] = useState({ user: "", items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { refresh } = useSelector((state) => state.modalCart);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.post(`${API_ROOT}/carts/get-carts`, {
          user,
          isLoggedIn,
        });
        const updatedCarts = response.data.items.map((c) => {
          c.numberRooms = c.rooms.join(", ");
          return c;
        });

        if (response.status === 200) {
          setCartUser({ user: response.data.user, items: updatedCarts });
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
    <>
      <div className="carts">
        <Header
          banner={banner}
          title="Cart"
          content="HOME / CART"
          showFormBooking={false}
        />
        <ModalCart />
        {isLoading && <ListCart cartUser={cartUser} isLoggedIn={isLoggedIn} />}
      </div>
    </>
  );
}
