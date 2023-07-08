import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteSpot } from '../../store/spots';

function DeleteSpotFormModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteSpot(spotId));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot?</p>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Yes (Delete Spot)</button>
      <button onClick={handleCancel} style={{ backgroundColor: 'darkgrey', color: 'white' }}>No (Keep Spot)</button>
    </div>
  );
}

export default DeleteSpotFormModal;
