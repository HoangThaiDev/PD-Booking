// Import Modules
import React, { useEffect, useRef } from "react";
import classes from "./css/navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sideMenuAction } from "../redux/store";

// Import Components
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

// Import Icons
import { VscMenu } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  // Create + use Hooks
  const navbarNavRef = useRef(null);
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    const scrollNavbarHandler = () => {
      if (window.scrollY > 200) {
        navbarNavRef.current.classList.add(`${classes["navbar-nav-scroll"]}`);
      } else {
        navbarNavRef.current.classList.remove(
          `${classes["navbar-nav-scroll"]}`
        );
      }
    };

    document.addEventListener("scroll", scrollNavbarHandler);

    // Clean up
    return () => {
      document.removeEventListener("scroll", scrollNavbarHandler);
    };
  }, []);

  // Create + use Event Handlers
  const showSideMenuHandler = () => {
    dispatch(sideMenuAction.showSideMenu());
  };

  return (
    <div className={classes.navbar}>
      <div className={classes["navbar__nav"]} ref={navbarNavRef}>
        <Row className={classes["navbar__row"]}>
          <Col
            className={`${classes["navbar__col"]} ${classes.menu}`}
            xs={4}
            sm={4}
            md={6}
            lg={8}
            xl={8}
          >
            <ul className={classes["menu__list"]}>
              <li className={classes["menu__item"]}>
                <VscMenu
                  className={`${classes.icon} ${classes["icon-menu"]}`}
                  onClick={showSideMenuHandler}
                />
              </li>
              <li className={classes["menu__item"]}>
                <Link to="/">HOME</Link>
              </li>
              <li className={classes["menu__item"]}>
                STAY
                <MdKeyboardArrowDown
                  className={`${classes.icon} ${classes["icon-dropdown"]}`}
                />
                <ul className={classes["menu-dropdown"]}>
                  <Link to="/cities" className={classes["menu-dropdown__item"]}>
                    Citys Page
                  </Link>
                  <Link
                    to="/resorts"
                    className={classes["menu-dropdown__item"]}
                  >
                    Resorts Page
                  </Link>
                  <Link to="/rooms" className={classes["menu-dropdown__item"]}>
                    Rooms Page
                  </Link>
                </ul>
              </li>
              {isLoggedIn && (
                <li className={classes["menu__item"]}>
                  SERVICES
                  <MdKeyboardArrowDown
                    className={`${classes.icon} ${classes["icon-dropdown"]}`}
                  />
                  <ul className={classes["menu-dropdown"]}>
                    <Link
                      className={classes["menu-dropdown__item"]}
                      to="/carts"
                    >
                      Cart
                    </Link>
                    <Link
                      className={classes["menu-dropdown__item"]}
                      to="/checkout"
                    >
                      Checkout
                    </Link>
                    <Link
                      className={classes["menu-dropdown__item"]}
                      to="/transactions"
                    >
                      Transactions
                    </Link>
                  </ul>
                </li>
              )}
            </ul>
          </Col>
          <Col
            className={`${classes["navbar__col"]} ${classes.logo}`}
            xs={14}
            sm={14}
            md={10}
            lg={7}
            xl={5}
          >
            <div className={classes["logo-container"]}>
              <h1 className={classes["logo__title"]}>PARADISE</h1>
              <span className={classes["logo__rating"]}>
                <IoIosStar
                  className={`${classes.icon} ${classes["icon-star"]}`}
                />
                <IoIosStar
                  className={`${classes.icon} ${classes["icon-star"]}`}
                />
                <IoIosStar
                  className={`${classes.icon} ${classes["icon-star"]}`}
                />
                <IoIosStar
                  className={`${classes.icon} ${classes["icon-star"]}`}
                />
                <IoIosStar
                  className={`${classes.icon} ${classes["icon-star"]}`}
                />
              </span>
            </div>
          </Col>
          <Col
            className={`${classes["navbar__col"]} ${classes.contact}`}
            xs={5}
            sm={5}
            md={6}
            lg={8}
            xl={8}
          >
            <div className={classes["contact-container"]}>
              <ul className={classes["contact__list"]}>
                {isLoggedIn && (
                  <Link
                    className={classes["contact__item"]}
                    to={`/setting-user`}
                  >
                    {user.username}
                  </Link>
                )}
                {!isLoggedIn && (
                  <Link className={classes["contact__item"]} to="/login">
                    USER
                  </Link>
                )}
                <li className={classes["contact__item"]}>
                  Tel: +84 12 111 22 33
                </li>
                <Link className={classes["contact__item"]} to="/rooms">
                  Book Now
                </Link>

                {isLoggedIn && (
                  <Link
                    className={classes["contact__item"]}
                    to={`/setting-user`}
                  >
                    {user.username}
                  </Link>
                )}
                {!isLoggedIn && (
                  <Link className={classes["contact__item"]} to="/login">
                    <FaRegUserCircle className={classes["icon-user"]} />
                  </Link>
                )}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
