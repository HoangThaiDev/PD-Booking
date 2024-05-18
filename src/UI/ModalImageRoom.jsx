// Import Modules
import React from "react";
import classes from "./css/modalImageRoom.module.css";
import { useSelector, useDispatch } from "react-redux";
import { modalImageRoomAction } from "../redux/store";

// Import Icons
import { MdClose } from "react-icons/md";

export default function ModalImageRoom() {
  // Create + use Hooks
  const { imageActive, showModal } = useSelector(
    (state) => state.modalImageRoom
  );
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
          <img src={imageActive} alt={imageActive} />
        </div>
      </div>
    </div>
  );
}
