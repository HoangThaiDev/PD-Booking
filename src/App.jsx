// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { APIContext } from "./storeContext/APIContext";
import { useContext, useEffect, useRef } from "react";

// Import Components
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home";
import City from "./pages/City";
import Resort from "./pages/Resort";
import Room from "./pages/Room";
import DetailCity from "./pages/DetailCity";
import DetailResort from "./pages/DetailResort";
import DetailRoom from "./pages/DetailRoom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgetPassword";
import ScrollTop from "./UI/ScrollTop";
import SideMenu from "./Layout/SideMenu";
import Cart from "./pages/Cart";

function App() {
  // Create + use Hooks
  const { city, resort, room } = useContext(APIContext);
  const btnHomeRef = useRef();

  useEffect(() => {
    const btnScrollHandler = async () => {
      if (window.scrollY > 150) {
        btnHomeRef.current.classList.add("scroll");
      } else {
        btnHomeRef.current.classList.remove("scroll");
      }
    };

    document.addEventListener("scroll", btnScrollHandler);

    // Clean up function
    return () => {
      document.removeEventListener("scroll", btnScrollHandler);
    };
  }, []);

  // Create + use event Handlers
  const goHomeHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        className="btn-home"
        ref={btnHomeRef}
        onClick={() => goHomeHandler()}
      >
        <span>&#171;</span>
      </button>
      <BrowserRouter>
        <ScrollTop />
        <SideMenu />

        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route
              index
              element={<Home city={city} resort={resort} room={room} />}
            />
            <Route path="cities" element={<City city={city} />} />
            <Route path="resorts" element={<Resort resort={resort} />} />
            <Route path="rooms" element={<Room room={room} />} />
            <Route path="city/:cityId" element={<DetailCity />} />
            <Route path="resort/:resortId" element={<DetailResort />} />
            <Route path="room/:resortId" element={<DetailRoom />} />
            <Route path="carts" element={<Cart />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
