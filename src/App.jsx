// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { APIContext } from "./storeContext/APIContext";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { API_ROOT } from "./utils/constant";
import { useDispatch } from "react-redux";
import { userAction } from "./redux/store";

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
import Checkout from "./pages/Checkout";
import SettingUser from "./pages/SettingUser";
import Error from "./pages/Error";
import Transaction from "./pages/Transaction";
import Profile from "./components/SettingUser/Profile";
import ChangePassword from "./components/SettingUser/ChangePassword";
import Transactions from "./components/SettingUser/Transactions";
import Main from "./components/SettingUser/Main";
import DetailTransaction from "./pages/DetailTransaction";

function App() {
  // Cấu hình Axios để gửi cookie trong tất cả các yêu cầu
  axios.defaults.withCredentials = true;

  // Create + use Hooks
  const { cities, resorts, rooms } = useContext(APIContext);
  const btnHomeRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const btnScrollHandler = async () => {
      if (window.scrollY > 250) {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_ROOT}/users/login`);
        if (data.isLoggedIn) {
          dispatch(userAction.login(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
            {/* Page Home */}
            <Route
              index
              element={<Home cities={cities} resorts={resorts} rooms={rooms} />}
            />
            {/* Page City */}
            <Route path="cities" element={<City cities={cities} />} />

            {/* Page Resort */}
            <Route
              path="resorts"
              element={<Resort cities={cities} resorts={resorts} />}
            />

            {/* Page Room */}
            <Route
              path="rooms"
              element={<Room cities={cities} rooms={rooms} />}
            />

            {/* Page Detail City */}
            <Route
              path="city/:cityId"
              element={<DetailCity cities={cities} />}
            />

            {/* Page Detail Resort */}
            <Route
              path="resort/:resortId"
              element={<DetailResort cities={cities} />}
            />

            {/* Page Detail Room */}
            <Route path="room/detail/:roomId" element={<DetailRoom />} />

            {/* Page Cart */}
            <Route path="carts" element={<Cart />} />

            {/* Page Checkout */}
            <Route path="checkout" element={<Checkout />} />

            {/* Page Transaction */}
            <Route path="transactions" element={<Transaction />} />
            <Route
              path="transaction/:transactionId"
              element={<DetailTransaction />}
            />
            <Route path="setting-user" element={<SettingUser />}>
              <Route index element={<Main />} />
              <Route path="profile/:userId" element={<Profile />} />
              <Route
                path="change-password/:userId"
                element={<ChangePassword />}
              />
              <Route path="transactions/:userId" element={<Transactions />} />
            </Route>

            {/* Page Error */}
            <Route path="*" element={<Error />} />
          </Route>

          {/* Page Login */}
          <Route path="login" element={<Login />} />

          {/* Page Register */}
          <Route path="register" element={<Register />} />

          {/* Page Forgot Password */}
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
