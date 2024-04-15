// Import Modules
import React from "react";
import classes from "./css/city.module.css";

// Import Components
import { Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
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

export default function City({ city }) {
  // Create setting Slider
  var settings = {
    fade: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
      <div className={classes["city-container"]}>
        <div className={classes["city-header"]}>
          <p>ENJOY WORLD-CLASS STAY EXPERIENCE</p>
          <Row className={classes["city-header__row"]}>
            <Col className={classes["city-header__col"]} xl={10}>
              <h1>The Cities</h1>
            </Col>
            <Col className={classes["city-header__col"]} xl={10}>
              <Link to="/cities">Discover All Cities</Link>
            </Col>
          </Row>
        </div>
        <div className={classes["city-flex"]}>
          <Slider className="city-slide" {...settings}>
            {city.map((c) => (
              <Row className={classes["city-flex-row"]} key={c._id}>
                <div className={classes["flex-container"]}>
                  <Col className={classes["city-flex-col"]} xl={12}>
                    <img
                      className={classes["city__img"]}
                      src={c.banner}
                      alt="banner-city"
                    />
                  </Col>
                  <Col className={classes["city-flex-col"]} xl={11}>
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
                        onClick={() =>
                          navigateResortDetailHandler(c._id, c.name)
                        }
                      >
                        Read More
                      </button>
                    </div>
                  </Col>
                </div>
              </Row>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
