import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_REVIEWS = 'review/LOAD_REVIEWS';
export const ADD_REVIEW = 'review/ADD_REVIEW';
export const UPDATE_REVIEW = 'review/UPDATE_REVIEW';
export const REMOVE_REVIEW = 'review/REMOVE_REVIEW';

export const ADD_IMAGE_TO_REVIEW = 'review/ADD_IMAGE_TO_ADD_IMAGE_TO_REVIEW';
/**  Action Creators: */
export const setReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews,
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
      dispatch(setReviews(reviews));
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
  spot: {
    reviewData: [],
    optionalOrderedList: [],
  },
  user: {
    reviewData: [],
    optionalOrderedList: [],
  },
};
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_REVIEWS: {
        console.log('reviews fetched', action.payload);
        const newSpotReviews = {...state.spot.reviewData};
        const newUserReviews = {...state.user.reviewData};

        for(let review of action.payload){
          if(review.spotId) newSpotReviews[review.id] = review;
          if(review.userId) newUserReviews[review.id] = review;
        }

        return {
          ...state,
          spot: { // maintains all data in the spot object and only changes the data of the reviewData property
            ...state.spot,
            reviewData: newSpotReviews,
          },
          user: { // maintains all data in the user object and only changes the data of the reviewData property
            ...state.user,
            reviewData: newUserReviews,
          },
        };
      }
      case ADD_REVIEW: {
        const {  review } = action;

        return {
          ...state,
          spot: {
            ...state.spot,
            reviewData: {
              ...state.spot.reviewData,
              [review.id]: review,
            },
          },
          user: {
            ...state.user,
            reviewData: {
              ...state.user.reviewData,
              [review.id]: review,
            },
          },
        };
      }
      case UPDATE_REVIEW: {
        const { review } = action;

        return {
          ...state,
          spot: {
            ...state.spot,
            reviewData: {
              ...state.spot.reviewData,
              [review.id]: review,
            },
          },
          user: {
            ...state.user,
            reviewData: {
              ...state.user.reviewData,
              [review.id]: review,
            },
          },
        };
      }
      case REMOVE_REVIEW: {
        const { reviewId } = action;

        const newSpotReviews = { ...state.spot.reviewData };
        delete newSpotReviews[reviewId];

        const newUserReviews = { ...state.user.reviewData };
        delete newUserReviews[reviewId];

        return {
          ...state,
          spot: {
            ...state.spot,
            reviewData: newSpotReviews,
          },
          user: {
            ...state.user,
            reviewData: newUserReviews,
          },
        };
      }
      case ADD_IMAGE_TO_REVIEW: {
        const { reviewId, image } = action.payload;

        return {
          ...state,
          spot: {
            ...state.spot,
            reviewData: {
              ...state.spot.reviewData,
              [reviewId]: {
                ...state.spot.reviewData[reviewId],
                images: [...(state.spot.reviewData[reviewId].images || []), image],
              },
            },
          },
          user: {
            ...state.user,
            reviewData: {
              ...state.user.reviewData,
              [reviewId]: {
                ...state.user.reviewData[reviewId],
                images: [...(state.user.reviewData[reviewId].images || []), image],
              },
            },
          },
        };
      }
      default:
        return state;
    }
  };

  export default reviewReducer;
