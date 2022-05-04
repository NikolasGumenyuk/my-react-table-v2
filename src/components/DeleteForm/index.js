import React from "react";

function DeleteForm({ handleConfirm, handleCancel, itemToDelete }) {
  return (
    <div>
      <p>You sure you wanna delete?{itemToDelete?.first_name}</p>
      <button className="button primary" onClick={handleCancel}>
        Cancel
      </button>
      <button
        className="button danger"
        onClick={() => handleConfirm(itemToDelete)}
      >
        Confirm
      </button>
    </div>
  );
}

export default DeleteForm;
