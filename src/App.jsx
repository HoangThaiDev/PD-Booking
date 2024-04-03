// Import Modules
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
