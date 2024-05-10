// Import Modules
import React from "react";
import classes from "./css/modalImageRoom.module.css";
import { useSelector, useDispatch } from "react-redux";
import { modalImageRoomAction } from "../redux/store";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { MdClose } from "react-icons/md";

export default function ModalImageRoom() {
  // Create + use Hooks
  const { imageActive, showModal } = useSelector(
    (state) => state.modalImageRoom
  );
  const dispatch = useDispatch();

  // Create + use event Handlers
  const closeModalImageRoomHandler = () => {
    dispatch(modalImageRoomAction.hideModalImageRoom());
  };

  return (
    <>
      {showModal && (
        <div className={classes.modal}>
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
      )}
    </>
  );
}
