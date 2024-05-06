// Import Modules
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/slideImage.css";

// Import Components
import Slider from "react-slick";

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

export default function SlideImage({ images }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slide">
      <div className="slider__container">
        <Slider {...settings}>
          {images.map((img, i) => (
            <CustomSlide index={img} key={i} />
          ))}
        </Slider>
        <p className="slide__content">
          Inspired by our history, surrounded by nature and designed to offer a
          different experience
        </p>
      </div>
    </div>
  );
}
