// Import Modules
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalImageRoomAction } from "../redux/store";

// Import Components
import Slider from "react-slick";

// Import File CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./css/slider/modalImageRoom.module.css";
import "./css/slider/sliderImageRoom.css";

// Import Icons
import { MdClose } from "react-icons/md";

// Import Arrow Slider
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

export default function ModalImageRoom() {
  // Create + use setting Slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Create + use Hooks
  const { images, showModal } = useSelector((state) => state.modalImageRoom);

  const dispatch = useDispatch();

  // Create + use event Handlers
  const closeModalImageRoomHandler = (event) => {
    if (
      event.target.classList.contains(`${classes["modal__icon-close"]}`) ||
      event.target.classList.contains(`${classes["modal"]}`)
    ) {
      dispatch(modalImageRoomAction.hideModalImageRoom());
    }
  };

  return (
    <div
      className={showModal && `${classes.modal} ${classes["modal-show"]}`}
      onClick={closeModalImageRoomHandler}
    >
      <div className={classes["modal__container"]}>
        <div className={classes["modal__card"]}>
          <div className={classes["modal__header"]}>
            <MdClose
              className={classes["modal__icon-close"]}
              onClick={closeModalImageRoomHandler}
            />
          </div>

          <div className="slider-images-container">
            <Slider {...settings}>
              {images.map((img) => (
                <img key={img} src={img} alt={img} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
