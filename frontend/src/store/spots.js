import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
export const UPDATE_SPOT = 'spots/UPDATE_SPOT';
export const REMOVE_SPOT = 'spots/REMOVE_SPOT';

export const ADD_IMAGE_TO_SPOT = 'spots/ADD_IMAGE_TO_SPOT';
/**  Action Creators: */
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const receiveSpot = (spot) => ({
  type: RECEIVE_SPOT,
  spot,
});

export const editSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});

export const addImageToSpotAction = (spotId, image) => ({
  type: ADD_IMAGE_TO_SPOT,
  payload: { spotId, image },
});
/** Thunk Action Creators: */

export const fetchSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    // const spots = await res.json(); this is for array this time is object so see below
    const { Spots: spots } = await res.json();
    dispatch(loadSpots(spots));
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeSpot(spotId));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const fetchDetailedSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotDetails = await res.json();
    dispatch(receiveSpot(spotDetails));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createSpot = (spot) => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot),
    });

    if (!res.ok) {
      throw res;
    }

    const newSpot = await res.json();
    dispatch(receiveSpot(newSpot));
    return newSpot;
  } catch (error) {
    console.error('Error:', error);
    const errors = await error.json();
    console.error('Error detail:', errors);
    return errors;
  }
};//receiveSpot is in the reducer so to update your state with the new spot.

export const addImageToSpot = (spotId, imageUrls) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: imageUrls,//array
    }),
  });

  if (res.ok) {
    const newImages = await res.json();
    newImages.forEach(image => { // Dispatch ADD_IMAGE_TO_SPOT action for each new image
      dispatch(addImageToSpotAction(spotId, image));
    })
    return newImages;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(editSpot(updatedSpot));
    return updatedSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const currentUserSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current');

  if (res.ok) {
    const { Spots: spots } = await res.json();
    dispatch(loadSpots(spots));
  }
};

const initialState = {
  allSpots: {

  },
  singleSpot: {

  }
}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const newLoadedSpots = {...state, allSpots:{}};
      action.spots.forEach((spot) => {
        newLoadedSpots.allSpots[spot.id] = spot;
      });
      return newLoadedSpots;
    case RECEIVE_SPOT:
      return { ...state, singleSpot:action.spot };
      case UPDATE_SPOT:
        return {
          ...state,
          allSpots: {
            ...state.allSpots,
            [action.spot.id]: action.spot,
          },
          singleSpot: state.singleSpot.id === action.spot.id ? action.spot : state.singleSpot,
        };
      case REMOVE_SPOT:
        const newAllSpots = { ...state.allSpots };
        delete newAllSpots[action.spotId];
        return {
          ...state,
          allSpots: newAllSpots,
          singleSpot: state.singleSpot.id === action.spotId ? {} : state.singleSpot,
        };
        case ADD_IMAGE_TO_SPOT: {
          const { spotId, image } = action.payload;
          if (!state.allSpots[spotId]) {
            return state;
          }
          return {
            ...state,
            allSpots: {
              ...state.allSpots,
              [spotId]: {
                ...state.allSpots[spotId],
                images: [...(state.allSpots[spotId].images || []), image],
              },
            },
            singleSpot: state.singleSpot.id === spotId ?
            {
              ...state.singleSpot,
              images: [...(state.singleSpot.images || []), image],
            }
            : state.singleSpot,
          };
        }
      default:
        return state;
    }
  };

export default spotsReducer;
