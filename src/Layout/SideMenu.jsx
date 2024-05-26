// Import Modules
import { createPortal } from "react-dom";
import classes from "./css/sideMenu.module.css";
import { sideMenuAction } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

// Import Icons
import { IoClose } from "react-icons/io5";

// Import Components
import { Link } from "react-router-dom";

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
      <img
        src="https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg"
        alt="https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/05/siravitplug-MhPJdWYWbWI-unsplash-2.jpg"
      />
      <div className={classes["sideMenu__header"]}>
        <IoClose
          className={classes["icon-close"]}
          onClick={showSideMenuHandler}
        />
        <p>
          <span>VN</span> / <span>EN</span>
        </p>
      </div>
      <div className={classes["menu__list"]}>
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
          {isLoggedIn && (
            <>
              <Link
                to="/carts"
                className={classes["menu__item"]}
                onClick={showSideMenuHandler}
              >
                Cart
              </Link>
              <Link
                to="/checkout"
                className={classes["menu__item"]}
                onClick={showSideMenuHandler}
              >
                Checkout
              </Link>
              <Link
                to="/transactions"
                className={classes["menu__item"]}
                onClick={showSideMenuHandler}
              >
                Contact
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
