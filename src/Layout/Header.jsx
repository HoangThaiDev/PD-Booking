// Import Modules
import React, { useEffect } from "react";
import "./css/header.css";

// Import Components
import banner from "../assets/banner.jpg";
import { Row, Col } from "antd";
import { NavLink } from "react-router-dom";
import FormBooking from "../components/Home/FormBooking";

// Import Icons
import { VscMenu } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";

export default function Header() {
  // Create + use Hooks
  useEffect(() => {
    const scrollNavbarHandler = () => {
      const elementHeaderNav = document.querySelector(".header-nav");
      if (window.scrollY > 200) {
        elementHeaderNav.classList.add("header-nav-scroll");
      } else {
        elementHeaderNav.classList.remove("header-nav-scroll");
      }
    };

    document.addEventListener("scroll", scrollNavbarHandler);

    // Clean up
    return () => {
      document.removeEventListener("scroll", scrollNavbarHandler);
    };
  }, []);

  // Create + use Event Handlers

  return (
    <div id="header">
      <img className="header__img" src={banner} alt="banner" />
      <div className="header-nav">
        <Row className="header__row">
          <Col className="header__col menu" xl={8}>
            <ul className="menu__list">
              <li className="menu__item">
                <VscMenu className="icon icon-menu" />
              </li>
              <li className="menu__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  HOME
                </NavLink>
              </li>
              <li className="menu__item">
                STAY <MdKeyboardArrowDown className="icon icon-dropdown" />
                <ul className="menu-dropdown">
                  <li className="menu-dropdown__item">Citys Page</li>
                  <li className="menu-dropdown__item">Resorts Page</li>
                  <li className="menu-dropdown__item">Rooms Page</li>
                </ul>
              </li>
              <li className="menu__item">
                SERVICES <MdKeyboardArrowDown className="icon icon-dropdown" />
                <ul className="menu-dropdown">
                  <li className="menu-dropdown__item">Cart</li>
                  <li className="menu-dropdown__item">Checkout</li>
                  <li className="menu-dropdown__item">Contact</li>
                  <li className="menu-dropdown__item">About Me</li>
                </ul>
              </li>
              <li className="menu__item">NEWS</li>
            </ul>
          </Col>
          <Col className="header__col logo" xl={4}>
            <div className="logo-container">
              <h1 className="logo__title">PARADISE</h1>
              <span className="logo__rating">
                <IoIosStar className="icon icon-star" />
                <IoIosStar className="icon icon-star" />
                <IoIosStar className="icon icon-star" />
                <IoIosStar className="icon icon-star" />
                <IoIosStar className="icon icon-star" />
              </span>
            </div>
          </Col>
          <Col className="header__col contact" xl={8}>
            <div className="contact-container">
              <ul className="contact__list">
                <li className="contact__item">
                  USER
                  <ul className="menu-dropdown">
                    <li className="menu-dropdown__item">Login</li>
                    <li className="menu-dropdown__item">Setting</li>
                    <li className="menu-dropdown__item">Logout</li>
                  </ul>
                </li>
                <li className="contact__item">Tel: +84 12 111 22 33</li>
                <li className="contact__item">Book Now</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className="header-introduce">
        <h1 className="intro__title">Vietnam's Resort Search System</h1>
        <p className="intro__content">
          Look for resorts that are comfortable, relaxing, friendly, and
          reasonably priced
        </p>
      </div>
      <FormBooking />
    </div>
  );
}
