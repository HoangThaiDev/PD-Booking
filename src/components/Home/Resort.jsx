// Import Modules
import React, { useMemo } from "react";
import classes from "./css/resort.module.css";

// Import Components
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "antd";

export default function Resort({ resort }) {
  // Create + use Hooks
  const sliceResort = useMemo(() => resort.slice(0, 4), [resort]);
  const navigate = useNavigate();

  // Create + use event Handlers

  const navigateResortDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`resort/${modifiedName}`, { state: { id: id } });
  };

  return (
    <div className={classes.resort}>
      <div className={classes["resort__container"]}>
        <div className={classes["resort__header"]}>
          <Row className={classes["resort__row"]}>
            <Col
              className={classes["resort__col"]}
              xs={24}
              sm={24}
              md={10}
              lg={10}
              xl={10}
            >
              <h1>The Resorts</h1>
            </Col>
            <Col
              className={classes["resort__col"]}
              xs={24}
              sm={24}
              md={10}
              lg={10}
              xl={10}
            >
              <Link to="resorts">Discover All Resorts</Link>
            </Col>
          </Row>
        </div>
        <div>
          {sliceResort.map((r) => (
            <Row className={classes["resort__list"]} key={r._id}>
              <Col
                className={classes["resort__item"]}
                xs={24}
                sm={24}
                md={24}
                lg={13}
                xl={12}
              >
                <img
                  className={classes["resort__item-img"]}
                  src={r.banner}
                  alt={r.banner}
                />
              </Col>
              <Col
                className={classes["resort__item"]}
                xs={24}
                sm={24}
                md={24}
                lg={10}
                xl={11}
              >
                <div className={classes["resort__item-card"]}>
                  <p>A short Introduce Resort</p>
                  <h1 className={classes["card__title"]}>{r.name}</h1>
                  <p className={classes["card__desc"]}>{r.desc}</p>
                  <button
                    className={classes["card__link"]}
                    onClick={() => navigateResortDetailHandler(r._id, r.name)}
                  >
                    Resort Detail
                  </button>
                </div>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}
