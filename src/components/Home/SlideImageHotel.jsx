// Import Modules
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/slideImageHotel.css";

// Import Components
import Slider from "react-slick";

// Import Images Hotel
import image1 from "../../assets/Images Hotel/img-75-683x1024.jpg";
import image2 from "../../assets/Images Hotel/img-76-683x1024.jpg";
import image3 from "../../assets/Images Hotel/img-77-1-683x1024.jpg";
import image4 from "../../assets/Images Hotel/img-78-1-683x1024.jpg";

// Create Function Custom Slide Slick
function CustomSlide(props) {
  const { index, ...otherProps } = props;
  return (
    <div {...otherProps} className="slide-image__list">
      <img src={index} alt="image" />
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

export default function SlideImageHotel() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div id="slide">
      <div className="slider-container">
        <Slider {...settings}>
          <CustomSlide index={image1} />
          <CustomSlide index={image2} />
          <CustomSlide index={image3} />
          <CustomSlide index={image4} />
        </Slider>
        <p className="slide-content">
          Inspired by our history, surrounded by nature and designed to offer a
          different experience
        </p>
      </div>
    </div>
  );
}
