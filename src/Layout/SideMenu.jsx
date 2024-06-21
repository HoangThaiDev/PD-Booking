// Import Modules
import { createPortal } from "react-dom";
import { sideMenuAction } from "../redux/store";

// Import Hooks
import { useDispatch, useSelector } from "react-redux";

// Import File CSS
import classes from "./css/sideMenu.module.css";

// Import Icons
import { IoClose } from "react-icons/io5";

// Import Components
import { Link } from "react-router-dom";
import banner from "../assets/Images Banner/banner2.jpg";

const Container = () => {
  // Create + use Hooks\
  const dispatch = useDispatch();
  const { showSideMenu } = useSelector((state) => state.sideMenu);
  const { isLoggedIn } = useSelector((state) => state.user);

  // Create + use Event Handlers
  const showSideMenuHandler = () => {
    dispatch(sideMenuAction.hideSideMenu());
  };

  return (
    <div
      className={`${classes["sideMenu__container"]} ${
        showSideMenu ? `${classes["show"]}` : `${classes["hide"]}`
      }`}
    >
      <img src={banner} alt={banner} />
      <div className={classes["sideMenu__header"]}>
        <IoClose
          className={classes["icon-close"]}
          onClick={showSideMenuHandler}
        />
        <p>
          <span>VN</span> / <span>EN</span>
        </p>
      </div>
      <div
        className={
          isLoggedIn
            ? `${classes["menu__list"]} ${classes["menu__list-user"]}`
            : classes["menu__list"]
        }
      >
        <ul className={classes["menu__list-flex"]}>
          <Link
            to="/"
            className={classes["menu__item"]}
            onClick={showSideMenuHandler}
          >
            Home
          </Link>
          <Link
            to="/cities"
            className={classes["menu__item"]}
            onClick={showSideMenuHandler}
          >
            Cities
          </Link>
          <Link
            to="/resorts"
            className={classes["menu__item"]}
            onClick={showSideMenuHandler}
          >
            Resorts
          </Link>
          <Link
            to="/rooms"
            className={classes["menu__item"]}
            onClick={showSideMenuHandler}
          >
            Rooms
          </Link>
          <Link
            to={isLoggedIn ? "setting-user" : "/login"}
            className={classes["menu__item"]}
            onClick={showSideMenuHandler}
          >
            {isLoggedIn ? "User" : "Login"}
          </Link>
          <Link
            to="/about-me"
            className={classes["menu__item"]}
            onClick={showSideMenuHandler}
          >
            About Me
          </Link>
          {isLoggedIn && (
            <>
              <Link
                to="/carts"
                className={`${classes["menu__item"]} ${classes["menu__item-user"]}`}
                onClick={showSideMenuHandler}
              >
                Cart
              </Link>
              <Link
                to="/checkout"
                className={`${classes["menu__item"]} ${classes["menu__item-user"]}`}
                onClick={showSideMenuHandler}
              >
                Checkout
              </Link>
              <Link
                to="/transactions"
                className={`${classes["menu__item"]} ${classes["menu__item-user"]}`}
                onClick={showSideMenuHandler}
              >
                Transactions
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default function SideMenu() {
  return (
    <div>
      {createPortal(<Container />, document.getElementById("sideMenu"))}
    </div>
  );
}
