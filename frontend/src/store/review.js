import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_REVIEWS = 'review/LOAD_REVIEWS';
export const ADD_REVIEW = 'review/ADD_REVIEW';
export const UPDATE_REVIEW = 'review/UPDATE_REVIEW';
export const REMOVE_REVIEW = 'review/REMOVE_REVIEW';

export const ADD_IMAGE_TO_REVIEW = 'review/ADD_IMAGE_TO_ADD_IMAGE_TO_REVIEW';
/**  Action Creators: */
export const setReviews = (spotId, reviews) => {
    return {
        type: LOAD_REVIEWS,
        spotId,
        reviews,
    };
};

export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review,
    };
};

export const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review,
    };
};

export const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId,
    };
};


/** Thunk Action Creators: */
export const fetchReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
      const { Reviews: reviews } = await res.json();
      dispatch(setReviews(spotId,reviews));
    }  else if (res.status === 404) {
      dispatch(setReviews(spotId, []));
    } else {
      const errors = await res.json();
      return errors;
    }
  };

  export const createReview = (spotId, reviewData) => async (dispatch) => {

    try {
      const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) {
        throw res;
      }

      const newReview = await res.json();
      dispatch(addReview(newReview));
      return newReview;
    } catch (error) {
      console.error('Error:', error);
      const errors = await error.json();
      console.error('Error detail:', errors);
      return errors;
    }
  };


  export const deleteReview = (reviewId) => async (dispatch) => {
      try {
          const res = await csrfFetch(`/api/reviews/${reviewId}`, {
              method: 'DELETE',
            });

      if (!res.ok) {
          throw res;
        }

        dispatch(removeReview(reviewId));
    } catch (error) {
        console.error('Error:', error);
        const errors = await error.json();
        console.error('Error detail:', errors);
        return errors;
    }
};

  const initialState = {
    spot: [],
    user: [],
  };
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_REVIEWS: {
        console.log('reviews fetched', action.reviews);
        const sortedReviews = [...action.reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        sortedReviews.forEach(review => {
          console.log('User data in review:', review.User);
        });
        return {
          ...state,
          spot: sortedReviews,
        };
      }

      case ADD_REVIEW: {
        const { review } = action;

        return {
          ...state,
          spot: [review, ...state.spot],
        };
      }

      case REMOVE_REVIEW: {
        const { reviewId } = action;

        // Filter out the review with the given reviewId
        const newSpotReviews = state.spot.filter(review => review.id !== reviewId);

        return {
          ...state,
          spot: newSpotReviews,
        };
      }

      default:
        return state;
    }
  };

  export default reviewReducer;

// const initialState = {
//   spot: {},
//   user: {},
// };
  // const reviewReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case LOAD_REVIEWS: {
  //       console.log('reviews fetched', action.reviews);

  //       const updatedSpotReviews = {};

  //       for (let review of action.reviews) {
  //         updatedSpotReviews[review.id] = review;
  //       }

  //       return {
  //         ...state,
  //         spot: updatedSpotReviews,
  //       };
  //     }

  //     case ADD_REVIEW: {
  //       const { review } = action;

  //       return {
  //         ...state,
  //         spot: {
  //           ...state.spot,
  //           [review.id]: review,
  //         },
  //         user: {
  //           ...state.user,
  //           [review.id]: review,
  //         },
  //       };
  //     }

  //     case REMOVE_REVIEW: {
  //       const { reviewId } = action;

  //       const newSpotReviews = { ...state.spot };
  //       delete newSpotReviews[reviewId];

  //       const newUserReviews = { ...state.user };
  //       delete newUserReviews[reviewId];

  //       return {
  //         ...state,
  //         spot: newSpotReviews,
  //         user: newUserReviews,
  //       };
  //     }

  //     default:
  //       return state;
  //   }
  // };
