import React from "react";

const ModalSight = (props) => {
  return (
    <div
      className={`modal_wrapper ${props.isOpened ? "open" : "close"}`}
      style={{ ...props.style }}
    >
      <div className="modal_body" onClick={(e) => e.stopPropagation}>
        <div className="modal_close" onClick={props.onModalClose}>
          X
        </div>
        {props.children}
      </div>
    </div>
  );
};
export default ModalSight;
