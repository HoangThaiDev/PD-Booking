// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import Main from "../components/Checkout/Main";
import banner from "../assets/Images Banner/banner2.jpg";

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
