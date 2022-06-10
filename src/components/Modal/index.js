import React from "react";
import classNames from "classnames";
import "./style.css";

const Modal = ({ children, isOpen, onClose, closable }) => {
  return (
    <div className={classNames("modal-wrapper", { isOpen })}>
      <div
        className={classNames("backdrop", { closable: isOpen })}
        onClick={onClose}
      ></div>
      <div className="modal">{isOpen && children}</div>
    </div>
  );
};

export default Modal;
