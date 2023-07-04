import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import SpotIndexItem from './SpotIndexItem';
// import loadingImage from './loading.gif'; //

const SpotIndex = () => {
  const spots = Object.values(
    useSelector((state) => (state.spots ? state.spots : []))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <section>
      <ul>
        {spots.map((spot) => (
          <SpotIndexItem
            spot={spot}
            key={spot.id}
          />
        ))}
      </ul>
      <Link
        className="back-button new"
        to="/spots/new"
      >
        New Spot
      </Link>

    </section>
  );
};

export default SpotIndex;
