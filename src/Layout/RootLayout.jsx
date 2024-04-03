// Import Modules
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Import Components

export default function RootLayout() {
  return (
    <div className="rootLayout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
