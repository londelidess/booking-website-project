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
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      {sessionUser && (
        <div className="Yes-No-Button">
          <button
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Yes (Delete Spot)
          </button>
          <button
            onClick={handleCancel}
            style={{ backgroundColor: "grey", color: "white" }}
          >
            No (Keep Spot)
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteReviewFormModal;
