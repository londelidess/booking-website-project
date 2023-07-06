// import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import SpotIndexItem from './SpotIndexItem';
import './Spots.css'//needed and affects to the SpotIndexItem

const SpotIndex = () => {
  const spots = Object.values(
    useSelector((state) => (state.spots ? state.spots : []))
  );
// console.log('SpotIndex----',spots)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <section>
      <ul className="spot-grid">
        {spots.map((spot) => (
          <SpotIndexItem
            spot={spot}
            key={spot.id}
          />
        ))}
      </ul>

    </section>
  );
};

export default SpotIndex;
