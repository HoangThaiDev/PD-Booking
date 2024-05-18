// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import Main from "../components/Checkout/Main";
const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg";

export default function Checkout() {
  return (
    <div className="checkout">
      <Header
        banner={banner}
        title="Checkout"
        content="HOME / CHECKOUT"
        showFormBooking={false}
      />
      <Main />
    </div>
  );
}
