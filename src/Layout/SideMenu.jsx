// Import Modules
import React from "react";
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

  // Create + use Event Handlers
  const showSideMenuHandler = () => {
    dispatch(sideMenuAction.hideSideMenu());
  };

  return (
    <div
      className={
        showSideMenu
          ? `${classes["sideMenu__container"]} ${classes["show"]}`
          : `${classes["sideMenu__container"]} `
      }
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
          <Link to="/" className={classes["menu__item"]}>
            Home
          </Link>
          <Link to="/cities" className={classes["menu__item"]}>
            Cities
          </Link>
          <Link to="/resorts" className={classes["menu__item"]}>
            Resorts
          </Link>
          <Link to="/rooms" className={classes["menu__item"]}>
            Rooms
          </Link>
          <Link to="/login" className={classes["menu__item"]}>
            User
          </Link>
          <Link to="/cart" className={classes["menu__item"]}>
            Cart
          </Link>
          <Link to="/checkout" className={classes["menu__item"]}>
            Checkout
          </Link>
          <Link to="/contact" className={classes["menu__item"]}>
            Contact
          </Link>
          <Link to="/about-me" className={classes["menu__item"]}>
            About me
          </Link>
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
