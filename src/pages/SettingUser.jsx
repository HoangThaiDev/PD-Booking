// Import Modules
import React from "react";

// Import Components
import Header from "../UI/Header";
import About from "../components/SettingUser/About";

const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg";

export default function SettingUser() {
  return (
    <div className="setting">
      <Header
        banner={banner}
        title="Setting User"
        content="HOME / SETTING"
        showFormBooking={false}
      />
      <About />
    </div>
  );
}
