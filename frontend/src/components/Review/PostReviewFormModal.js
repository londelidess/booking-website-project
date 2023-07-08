import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/review";
import StarRatingInput from './starRatingInput';
import "./Review.css"

function PostReviewFormModal({spotId} ) {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(null);
  // const { spotId } = useParams(); need to pass prop from SpotShow

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("spotId",spotId)
    const reviewResponse = await dispatch(createReview(spotId, { review: comment, stars }));

    // if (reviewResponse.errors) {
    //   setError(reviewResponse.errors);
    //   return;
    // }//my backend is responsing with message
    if (reviewResponse.message) {
      setError(reviewResponse.message);
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
