import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/review";

function DeleteReviewFormModal({ reviewId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const handleDelete = async () => {
    await dispatch(deleteReview(reviewId));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="confirm-delete-form">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      {sessionUser && (
      <div className="yes-no-button">
        <button
          className="delete-button"
          onClick={handleDelete}
        >
          Yes (Delete Spot)
        </button>
        <button
          className="cancel-button"
          onClick={handleCancel}
        >
          No (Keep Spot)
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteReviewFormModal;
