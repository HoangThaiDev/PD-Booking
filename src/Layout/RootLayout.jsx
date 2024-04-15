// Import Modules
import React from "react";

// Import Components
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MailList from "./MailList";

export default function RootLayout() {
  return (
    <div className="rootLayout">
      <Navbar />
      <Outlet />
      <MailList />
      <Footer />
    </div>
  );
}
