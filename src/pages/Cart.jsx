// Import Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// Import Components
import Header from "../UI/Header";
import ListCart from "../components/Cart/ListCart";
import ModalCart from "../UI/ModalCart";

const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg";

export default function Cart() {
  // Create + use Hooks
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useSelector((state) => state.modalCart);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get("http://localhost:5000/carts/get-carts");
      const updatedCarts = response.data.map((c) => {
        c.numberRooms = c.rooms.join(", ");
        return c;
      });

      if (response.status === 200) {
        setCarts(updatedCarts);
        setIsLoading(true);
      }
    };

    fetchCart();
  }, [refresh]);

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
        {isLoading && <ListCart carts={carts} />}
      </div>
    </>
  );
}
