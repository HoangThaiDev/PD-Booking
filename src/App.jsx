// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APIContext } from "./storeContext/APIContext";
import axios from "axios";
import { API_ROOT } from "./utils/constant";
import { userAction } from "./redux/store";

// Import Hooks
import { useContext, useEffect, useRef, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

// Import File CSS
import "./App.css";

// Import Components + use lazy
// -------------------PAGE------------------------------
const RootLayout = lazy(() => import("./Layout/RootLayout"));
const Home = lazy(() => import("./pages/Home"));
const Resort = lazy(() => import("./pages/Resort"));
const City = lazy(() => import("./pages/City"));
const Room = lazy(() => import("./pages/Room"));
const DetailCity = lazy(() => import("./pages/DetailCity"));
const DetailResort = lazy(() => import("./pages/DetailResort"));
const DetailRoom = lazy(() => import("./pages/DetailRoom"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgetPassword"));
const Cart = lazy(() => import("./pages/Cart"));
const SettingUser = lazy(() => import("./pages/SettingUser"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Error = lazy(() => import("./pages/Error"));
const Transaction = lazy(() => import("./pages/Transaction"));
const DetailTransaction = lazy(() => import("./pages/DetailTransaction"));

// -------------------UI------------------------------
const ScrollTop = lazy(() => import("./UI/ScrollTop"));

// -------------------LAYOUT------------------------------
const SideMenu = lazy(() => import("./Layout/SideMenu"));

// -------------------COMPONENTS------------------------------
const ChangePassword = lazy(() =>
  import("./components/SettingUser/ChangePassword")
);
const Transactions = lazy(() =>
  import("./components/SettingUser/Transactions")
);
const Main = lazy(() => import("./components/SettingUser/Main"));
const Profile = lazy(() => import("./components/SettingUser/Profile"));

import Loading from "./UI/Loading";

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

      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ScrollTop />
          <SideMenu />

          <Routes>
            <Route path="/" element={<RootLayout />}>
              {/* Page Home */}
              <Route
                index
                element={
                  <Home cities={cities} resorts={resorts} rooms={rooms} />
                }
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
      </Suspense>
    </>
  );
}

export default App;
