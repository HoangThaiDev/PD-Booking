// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import About from "../components/ErrorPage/About";
import banner from "../assets/Images Banner/banner2.jpg";

export default function Error() {
  return (
    <div className="error-page">
      <Header
        banner={banner}
        title="404"
        content="HOME / ERROR PAGE"
        showFormBooking={false}
      />
      <About />
    </div>
  );
}
