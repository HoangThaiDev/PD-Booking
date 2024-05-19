// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import About from "../components/ErrorPage/About";
const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg";

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
