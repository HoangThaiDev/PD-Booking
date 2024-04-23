// Import Modules
import React from "react";
import { createPortal } from "react-dom";
import classes from "./css/sideMenu.module.css";
import { sideMenuAction } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
// Import Icons
import { IoClose } from "react-icons/io5";

const Container = () => {
  // Create + use Hooks\
  const dispatch = useDispatch();
  const { showSideMenu } = useSelector((state) => state.sideMenu);

  // Create + use Event Handlers
  const showSideMenuHandler = () => {
    dispatch(sideMenuAction.hideSideMenu());
  };

  const navigateHandler = (nameURL) => {
    document.location.assign(nameURL);
  };

  return (
    <div
      className={
        showSideMenu
          ? `${classes["sideMenu__container"]} ${classes["active"]}`
          : `${classes["sideMenu__container"]}`
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
        <ul>
          <li onClick={() => navigateHandler("/")}>Home</li>
          <li onClick={() => navigateHandler("/cities")}>Cities</li>
          <li onClick={() => navigateHandler("/resorts")}>Resorts</li>
          <li onClick={() => navigateHandler("/rooms")}>Rooms</li>
          <li onClick={() => navigateHandler("/login")}>User</li>
          <li onClick={() => navigateHandler("/cart")}>Cart</li>
          <li onClick={() => navigateHandler("/checkout")}>Checkout</li>
          <li onClick={() => navigateHandler("/")}>Contact</li>
          <li onClick={() => navigateHandler("/")}>About me</li>
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
