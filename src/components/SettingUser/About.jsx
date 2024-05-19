// Import Modules
import React, { useEffect } from "react";
import classes from "./css/about.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_ROOT } from "../../utils/constant";

// Import Components
import { Row, Col } from "antd";

export default function About() {
  // Create + use Hooks
  const { user } = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/users/get-user/:${user.userId}`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchUser();
    }
  }, [user]);
  return (
    <div className={classes.about}>
      <div className={classes["about__container"]}>
        <Row className={classes["about__row"]}>
          <Col className={classes["about__col"]} xl={10}>
            1
          </Col>
          <Col className={classes["about__col"]} xl={10}>
            2
          </Col>
        </Row>
      </div>
    </div>
  );
}
