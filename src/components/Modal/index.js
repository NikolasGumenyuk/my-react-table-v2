import React from "react";
import DeleteForm from "../DeleteForm";
import EditForm from "../EditForm";
import "./style.css";

const Modal = ({ handleConfirm, handleCancel, itemToDelete, itemToEdit }) => {
  return (
    <div className="modal">
      {itemToDelete && <DeleteForm handleCancel={handleCancel} handleConfirm={handleConfirm} itemToDelete={itemToDelete}/>}
      {itemToEdit && <EditForm itemToEdit={itemToEdit}/>}
    </div>
  );
};

export default Modal;
