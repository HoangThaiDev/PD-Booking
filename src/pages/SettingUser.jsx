// Import Modules
import React from "react";
import { useSelector } from "react-redux";

// Import Components
import Header from "../UI/Header";
import Dashboard from "../components/SettingUser/Dashboard";

const banner =
  "https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg";

export default function SettingUser() {
  // Create + use Hooks
  const { user } = useSelector((state) => state.user);

  return (
    <div className="setting">
      <Header
        banner={banner}
        title="Setting User"
        content="HOME / SETTING"
        showFormBooking={false}
      />
      {user && <Dashboard user={user} />}
    </div>
  );
}
