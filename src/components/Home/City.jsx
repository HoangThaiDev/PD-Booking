// Import Modules
import React from "react";

// Import Hooks
import { Link, useNavigate } from "react-router-dom";

// Import File CSS
import classes from "./css/city.module.css";

// Import Components
import { Col, Row } from "antd";
import Slider from "react-slick";

// Import Images
import resortIcon from "../../assets/Activities City/resort.png";
import restaurantIcon from "../../assets/Activities City/restaurant.png";
import beachIcon from "../../assets/Activities City/sunbed.png";
import templeIcon from "../../assets/Activities City/chinese.png";

// Customize Arrow Slider

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${classes["city-icon"]} ${classes["city-icon-next"]}`}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${classes["city-icon"]} ${classes["city-icon-prev"]}`}
      onClick={onClick}
    />
  );
}

export default function City({ cities }) {
  // Create setting Slider
  var settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          fade: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          waitForAnimate: false,
          dots: true,
          nextArrow: false,
          prevArrow: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          fade: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          waitForAnimate: false,
          dots: true,
          nextArrow: false,
          prevArrow: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          fade: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          waitForAnimate: false,
          dots: true,
          nextArrow: false,
          prevArrow: false,
        },
      },
    ],
  };

  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use event Handlers
  const navigateResortDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`city/${modifiedName}`, { state: { id: id } });
  };

  return (
    <div className={classes.city}>
      <div className={classes["city__container"]}>
        <div className={classes["city__header"]}>
          <p>ENJOY WORLD-CLASS STAY EXPERIENCE</p>
          <Row className={classes["city__header__row"]}>
            <Col
              className={classes["city__header__col"]}
              xs={24}
              sm={10}
              md={10}
              lg={10}
              xl={10}
            >
              <h1>The Cities</h1>
            </Col>
            <Col
              className={classes["city__header__col"]}
              xs={24}
              sm={10}
              md={10}
              lg={10}
              xl={10}
            >
              <Link to="/cities">Discover All Cities</Link>
            </Col>
          </Row>
        </div>
        <div className={classes["city-flex"]}>
          <Slider className="city-slide" {...settings}>
            {cities.map((c) => (
              <Row className={classes["city__row-flex"]} key={c._id}>
                <Col
                  className={classes["city__col-flex"]}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={13}
                  xl={12}
                >
                  <img
                    className={classes["city__img"]}
                    src={c.banner}
                    alt="banner-city"
                  />
                </Col>
                <Col
                  className={classes["city__col-flex"]}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={10}
                  xl={11}
                >
                  <div>
                    <Link className={classes["city__title"]}>{c.name}</Link>
                    <div className={classes["city__activities"]}>
                      <img src={restaurantIcon} alt="restaurant-icon" />
                      <img src={resortIcon} alt="restaurant-icon" />
                      <img src={beachIcon} alt="restaurant-icon" />
                      <img src={templeIcon} alt="restaurant-icon" />
                    </div>
                    <p className={classes["city__desc"]}>{c.short_desc}</p>
                    <button
                      className={classes["city__link"]}
                      onClick={() => navigateResortDetailHandler(c._id, c.name)}
                    >
                      Read More
                    </button>
                  </div>
                </Col>
              </Row>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
