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

export const addImageToSpot = (spotId, imageUrl, preview) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: imageUrl,
      preview,
    }),
  });

  if (res.ok) {
    const newImage = await res.json();
    dispatch(addImageToSpotAction(spotId, newImage));
    return newImage;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// export const createSpotWithImage = (spot, imageUrl, preview ) => async (dispatch) => {
//   const newSpot = await dispatch(createSpot(spot));
// console.log(newSpot)
//   if (newSpot) {//add an image to it
//     const newImage = await dispatch(addImageToSpot(newSpot.id, imageUrl, preview));

//     if (!newImage) {
//       console.error('Failed to add image to spot');
//     }
//   } else {
//     console.error('Failed to create spot');
//   }
//   return newSpot;
// }; this only creates one

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

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {};
      action.spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    case RECEIVE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    case UPDATE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    case REMOVE_SPOT:
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
      case ADD_IMAGE_TO_SPOT: {
        const { spotId, image } = action.payload;
        return {
          ...state,
          [spotId]: {
            ...state[spotId],
            images: [...(state[spotId].images || []), image],  // Use [] as default if images doesn't exist

          },
        };
      }
    default:
      return state;
  }
};

export default spotsReducer;
