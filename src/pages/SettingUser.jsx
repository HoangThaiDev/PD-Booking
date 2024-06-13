// Import Modules
import React from "react";

// Import Hooks
import { useSelector } from "react-redux";

// Import Components
import Header from "../UI/Header";
import Dashboard from "../components/SettingUser/Dashboard";
import banner from "../assets/Images Banner/banner2.jpg";

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
