// Import Modules
import { API_ROOT } from "../../utils/constant";
import axios from "axios";

// Import Hooks
import React from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/store";

// Import File CSS
import classes from "./css/dashboard.module.css";

// Import Components
import { Row, Col } from "antd";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

// Import Icons
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";

export default function Dashboard({ user }) {
  // Create + use Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create + use event Handlers
  const logoutUserHandler = async () => {
    try {
      const response = await axios.get(
        `${API_ROOT}/users/logout/${user.userId}`
      );
      if (response.status === 200) {
        dispatch(userAction.logout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.about}>
      <div className={classes["about__container"]}>
        <Row className={classes["about__row"]}>
          <Col
            className={classes["about__col"]}
            xs={24}
            sm={24}
            md={6}
            lg={6}
            xl={6}
          >
            <div className={classes["menu-dashboard"]}>
              <NavLink
                to={`profile/${user.userId}`}
                className={({ isActive }) =>
                  isActive
                    ? `${classes["menu__item"]} ${classes["menu__item-active"]}`
                    : classes["menu__item"]
                }
              >
                <span>
                  <CgProfile
                    className={`${classes.icon} ${classes["icon-logout"]}`}
                  />
                </span>
                My Profile
              </NavLink>
              <NavLink
                to={`change-password/${user.userId}`}
                className={({ isActive }) =>
                  isActive
                    ? `${classes["menu__item"]} ${classes["menu__item-active"]}`
                    : classes["menu__item"]
                }
              >
                <span>
                  <IoSettingsOutline
                    className={`${classes.icon} ${classes["icon-logout"]}`}
                  />
                </span>
                Change Password
              </NavLink>
              <NavLink
                to={`transactions/${user.userId}`}
                className={({ isActive }) =>
                  isActive
                    ? `${classes["menu__item"]} ${classes["menu__item-active"]}`
                    : classes["menu__item"]
                }
              >
                <span>
                  <FaOpencart
                    className={`${classes.icon} ${classes["icon-logout"]}`}
                  />
                </span>
                My Transactions
              </NavLink>
              <NavLink
                to="/"
                className={classes["menu__item"]}
                onClick={logoutUserHandler}
              >
                <span>
                  <CiLogout
                    className={`${classes.icon} ${classes["icon-logout"]}`}
                  />
                </span>
                Logout
              </NavLink>
            </div>
          </Col>
          <Col
            className={classes["about__col"]}
            xs={24}
            sm={24}
            md={17}
            lg={17}
            xl={17}
          >
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
}
