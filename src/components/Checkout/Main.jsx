// Import Modules
import React from "react";
import classes from "./css/main.module.css";

// Import Components
import { Row, Col } from "antd";
import FormInfoUser from "./FormInfoUser";
import Order from "./Order";

export default function Main() {
  return (
    <div className={classes.main}>
      <div className={classes["main__container"]}>
        <Row className={classes["main__row"]}>
          <Col className={classes["main__col"]} xl={12}>
            <FormInfoUser />
          </Col>
          <Col className={classes["main__col"]} xl={10}>
            <Order />
          </Col>
        </Row>
      </div>
    </div>
  );
}
