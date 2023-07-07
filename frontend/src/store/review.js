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

const addImageToReviewAction = (reviewId, image) => {
    return {
      type: ADD_IMAGE_TO_REVIEW,
      payload: { reviewId, image }
    };
  };

/** Thunk Action Creators: */
export const fetchReviews = () => async (dispatch) => {
    const res = await csrfFetch('/api/reviews/current');

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

  export const addImageToReview = (reviewId, imageUrl) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: imageUrl }),
    });

    if (res.ok) {
      const newImage = await res.json();
      dispatch(addImageToReviewAction(reviewId, newImage));
      return newImage;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

  export const editReview = (reviewId, updatedData) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      const updatedReview = await res.json();
      dispatch(updateReview(updatedReview));
      return updatedReview;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

  export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      dispatch(deleteReview(reviewId));
    } else {
      const errors = await res.json();
      return errors;
    }
  };

const initialState = {
    reviews: [],
};

const reviewReducer=(state = initialState, action)=> {
    switch (action.type) {
        case LOAD_REVIEWS:
            return {
                ...state,
                reviews: action.reviews,
            };
        case ADD_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.review],
            };
        case UPDATE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.map((review) =>
                    review.id === action.review.id ? action.review : review
                ),
            };
        case REMOVE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.filter((review) => review.id !== action.reviewId),
            };
        default:
            return state;
    }
}

export default reviewReducer;
