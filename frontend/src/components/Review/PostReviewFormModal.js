import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/review";
import StarRatingInput from './starRatingInput';
import "Review.css"

function PostReviewFormModal() {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = await dispatch(createReview({ comment, stars }));

    if (!review) {
      setError("Server Error. Please try again later.");
      return;
    }

    closeModal();
  };

  return (
    <div>
      <h1>How was your stay?</h1>
      {error && <p className='error'> {error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="10"
          cols="60"
        />

        <StarRatingInput
          rating={stars}
          onChange={newRating => setStars(newRating)}
        />

        <label>Stars</label>

        <button type="submit" disabled={comment.length < 10 || stars === 0}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default PostReviewFormModal;
