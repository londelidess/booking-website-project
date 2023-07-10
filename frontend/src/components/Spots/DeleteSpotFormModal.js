import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";

function DeleteSpotFormModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const handleDelete = async () => {
    await dispatch(deleteSpot(spotId));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="delete-spot-confirmation-container">
    <h1 className="delete-spot-confirmation-title">Confirm Delete</h1>
    <h2 className="delete-spot-confirmation-text">Are you sure you want to remove this spot from the listings?</h2>
    {sessionUser && (
        <div className="delete-spot-confirmation-button-container">
            <button onClick={handleDelete} className="delete-button">
                Yes (Delete Spot)
            </button>
            <button onClick={handleCancel} className="cancel-button">
                No (Keep Spot)
            </button>
        </div>
    )}
</div>
);
}

export default DeleteSpotFormModal;
