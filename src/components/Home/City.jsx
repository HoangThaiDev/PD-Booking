// Import Modules
import React, { useEffect, useState } from "react";
import "./css/city.css";
import axios from "axios";

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
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

export default function City() {
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
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/city");
        setCities(data);
        setIsLoading(!isLoading);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCityData();
  }, []);

  // Create + use event Handlers
  const navigateResortDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`city/${modifiedName}`, { state: id });
  };

  return (
    <div id="city">
      <div className="city-container">
        <div className="city-header">
          <p>ENJOY WORLD-CLASS STAY EXPERIENCE</p>
          <Row className="city-header__row">
            <Col className="city-header__col" xl={10}>
              <h1>The Cities</h1>
            </Col>
            <Col className="city-header__col" xl={10}>
              <Link to="/cities">Discover All Cities</Link>
            </Col>
          </Row>
        </div>
        <div className="city-flex">
          <Slider className="city-slide" {...settings}>
            {isLoading &&
              cities.length > 0 &&
              cities.map((city) => (
                <Row className="city-flex-row" key={city._id}>
                  <div className="flex-container">
                    <Col className="city-flex-col" xl={12}>
                      <img
                        className="city__img"
                        src={city.banner}
                        alt="banner-city"
                      />
                    </Col>
                    <Col className="city-flex-col" xl={11}>
                      <Link className="city__title">{city.name}</Link>
                      <div className="city__activities">
                        <img src={restaurantIcon} alt="restaurant-icon" />
                        <img src={resortIcon} alt="restaurant-icon" />
                        <img src={beachIcon} alt="restaurant-icon" />
                        <img src={templeIcon} alt="restaurant-icon" />
                      </div>
                      <p className="city__desc">{city.short_desc}</p>
                      <button
                        className="city__link"
                        onClick={() =>
                          navigateResortDetailHandler(city._id, city.name)
                        }
                      >
                        Read More
                      </button>
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
