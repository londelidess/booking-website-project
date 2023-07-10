import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/review";
import StarRatingInput from "./starRatingInput";
import "./Review.css";

function PostReviewFormModal({ spotId }) {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewResponse = await dispatch(
      createReview(spotId, { review: comment, stars })
    );

    if (reviewResponse.message) {
      setError(reviewResponse.message);
      return;
    }

    closeModal();
  };

  if (!spotId) return null;

  const isCommentValid = comment.length >= 10;

  return (
    <>
      <div className="review-form">
        <h1>How was your stay?</h1>
        {error && <p className="error"> {error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Leave your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="10"
            cols="60"
          />

          <div className="star-rating-input">
            <div className="star-input-container">
              <StarRatingInput
                rating={stars}
                onChange={(newRating) => setStars(newRating)}
              />
              <h3>Stars</h3>
            </div>
          </div>
          <button
            className={`review-submit-button ${!isCommentValid || stars === 0 ? "disabled" : ""}`}
            type="submit"
            disabled={!isCommentValid || stars === 0}
          >
            Submit Your Review
          </button>
        </form>
      </div>
    </>
  );
}

export default PostReviewFormModal;
