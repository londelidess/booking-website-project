import { csrfFetch } from "./csrf";
import { REMOVE_USER } from "./session";

const RECEIVE_IMAGES = 'images/receiveImages';
const REMOVE_IMAGE = 'images/removeImage';

const receiveImages = images => ({
  type: RECEIVE_IMAGES,
  images
});

const removeImage = imageId => ({
  type: REMOVE_IMAGE,
  imageId
});

export const fetchImages = id => async dispatch => {
  const response = await csrfFetch(`/api/images/${id}`);
  const data = await response.json();
  dispatch(receiveImages(data));
  return response;
};

export const uploadImages = (spotId, images) => async dispatch => {
  const formData = new FormData();
  Array.from(images).forEach(image => formData.append("images", image));
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: formData
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveImages(data));
  }
  return response;
};

export const deleteImage = (imageId) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
      method: "DELETE"
  });

  if (response.ok) {
      const data = await response.json();
      dispatch(removeImage(data.imageId));
      return data;
  }
  throw response;
};

const initialState = [];

function imagesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_IMAGES:
      return action.images;
    case REMOVE_USER:
      return initialState;
    case REMOVE_IMAGE:
      return state.filter(image => image.id !== action.imageId);
    default:
      return state;
  }
}

export default imagesReducer;
