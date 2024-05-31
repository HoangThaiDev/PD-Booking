// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/relatedProduct.module.css";

// Import Hooks
import { useNavigate } from "react-router-dom";

// Import Components
import { Row, Col } from "antd";

export default function RelatedProduct({ resorts }) {
  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use event Handlers
  const navigateResortDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`/resort/${modifiedName}`, { state: { resortId: id } });
  };

  return (
    <div className={classes.resorts}>
      <div className={classes["resorts__container"]}>
        <h2 className={classes["resorts__title"]}>Related Resorts</h2>
        <Row className={classes["resorts__row"]}>
          {resorts.map((rs) => (
            <Col
              className={classes["resorts__col"]}
              key={rs._id}
              xs={24}
              sm={24}
              md={11}
              lg={9}
              xl={7}
            >
              <div className={classes["resorts__item"]}>
                <img src={rs.banner} alt={rs.banner} />
                <div className={classes["item__card"]}>
                  <p className={classes["card__name"]}>{rs.name}</p>
                  <button
                    className={classes["btn-view"]}
                    type="button"
                    onClick={() => navigateResortDetailHandler(rs._id, rs.name)}
                  >
                    Discover More
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
