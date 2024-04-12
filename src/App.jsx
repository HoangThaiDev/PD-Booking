// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home";
import City from "./pages/City";
import Resort from "./pages/Resort";
import Room from "./pages/Room";
import DetailCity from "./pages/DetailCity";
import DetailResort from "./pages/DetailResort";
import DetailRoom from "./pages/DetailRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="cities" element={<City />} />
          <Route path="resorts" element={<Resort />} />
          <Route path="rooms" element={<Room />} />
          <Route path="city/:cityId" element={<DetailCity />} />
          <Route path="resort/:resortId" element={<DetailResort />} />
          <Route path="room/:resortId" element={<DetailRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
