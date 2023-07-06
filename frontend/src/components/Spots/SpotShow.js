import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailedSpot } from '../../store/spots';
import './Spots.css';

const SpotShow = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots ? state.spots[spotId] : null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailedSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  const avgRating = spot.avgRating === 0 ? 'New' : spot?.avgRating?.toFixed(2);

  const renderImages = () => {
    if (spot?.SpotImages?.length === 0) {
      // Render placeholder squares when there are no images
      return (
        <>
          <div className="image-placeholder div1"></div>
          <div className="image-placeholder div2"></div>
          <div className="image-placeholder div3"></div>
          <div className="image-placeholder div4"></div>
          <div className="image-placeholder div5"></div>
        </>
      );
    }

    return spot?.SpotImages?.map((image, index) => (
      <div className={`image-placeholder div${index + 1}`} key={index}>
        <img src={image.url} alt={`Image${index + 1}`} />
      </div>
    ));
  };

  return (
    <>
      <h1>{spot.name}</h1>
      <h2>
        Location: {spot.city}, {spot.state}, {spot.country}
      </h2>

      <div className="parent">
        {renderImages()}
      </div>

      <p>
        Hosted by {spot?.Owner?.firstName}, {spot?.Owner?.lastName}
      </p>
      <p>{spot.description}</p>
      <div className="spot-rating">
        <i className="fa-solid fa-star"></i>
        {avgRating}
      </div>
      <div className="callout-box">
        <p>{spot.price} night</p>
        <button onClick={() => alert('Feature coming soon')}>Reserve</button>
      </div>
    </>
  );
};

export default SpotShow;
