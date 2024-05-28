// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/about.module.css";

// Import Component
import { Row, Col } from "antd";
import SliceImage from "../../UI/SlideImage";

export default function About({ city }) {
  return (
    <div className={classes.about}>
      <div className={classes["about__container"]}>
        <h2 className={classes["about__title"]}>
          Wellcom to <span>{city.name}</span> city
        </h2>
        <Row className={classes["about__row"]}>
          <Col
            className={classes["about__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
          >
            <img src={city.banner} alt={city.banner} />
          </Col>
          <Col
            className={classes["about__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={11}
            xl={11}
          >
            <ul>
              <p>(&#8727;) Vị trí</p>
              <li>{city.short_desc}</li>
              <li>{city.detail_city.area}</li>
            </ul>
          </Col>
        </Row>

        <SliceImage images={city.photos} />

        <h2 className={classes["about__information"]}>CITY INFORMATION</h2>
        <Row className={classes["information__row"]}>
          <Col
            className={classes["information__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={20}
            xl={8}
          >
            <h3>Văn hóa</h3>
            {city.detail_city.culture.map((c, i) => (
              <div key={i}>
                <li>{c}</li>
              </div>
            ))}
          </Col>
          <Col
            className={classes["information__col"]}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={15}
          >
            <div className={classes["information__card"]}>
              <h3>DANH LAM THẮNG CẢNH</h3>
              {city.detail_city.attractive_location.map((c, i) => (
                <div key={i}>
                  <li>{c}</li>
                </div>
              ))}
            </div>
            <div className={classes["information__card"]}>
              <h3>Đặc sản ẩm thực</h3>
              {city.detail_city.culinary_specialties.map((c, i) => (
                <div key={i}>
                  <li>{c}</li>
                </div>
              ))}
            </div>
            <div className={classes["information__card"]}>
              <h3>Nhà Hàng</h3>
              {city.detail_city.restaurants.map((c, i) => (
                <div key={i}>
                  <li>{c}</li>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
