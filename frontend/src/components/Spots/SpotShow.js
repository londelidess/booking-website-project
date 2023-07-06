import {  useParams,  } from 'react-router-dom';
import { useEffect,  } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchDetailedSpot } from '../../store/spots'; // Assume you have this action in your store


const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots ? state.spots[spotId] : null);
    console.log(spot)
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchDetailedSpot(spotId))
    }, [dispatch, spotId]);

    const handleReserve = () => {
      alert("Feature coming soon");
    };
    const largeImage = spot?.images?.find(image => image.preview) || {};
    const smallImages = spot?.images?.filter(image => !image.preview) || [];
    if (!spot) {
        return <div>Loading...</div>; 
      }
    return (
      <section>
        <h1>{spot?.name}</h1>
        <p>Location: {spot?.city}, {spot?.state}, {spot?.country}</p>
        {/* <img src={spot?.mainImage} alt={spot?.name} className="large-image" /> */}
        <img src={largeImage.url} alt={spot?.name} className="large-image" />
        <div className="small-images">
          {/* {spot?.previewImages?.map((img, i) => <img key={i} src={img} alt={spot?.name} className="small-image"/>)} */}
          {smallImages.map((img, i) => <img key={i} src={img.url} alt={spot?.name} className="small-image"/>)}
        </div>
        <p>Hosted by {spot?.Owner?.firstName}, {spot?.Owner?.lastName}</p>
        <p>{spot?.description}</p>
        <div className="callout-box">
          <p>${spot?.price} per night</p>
          <button onClick={handleReserve}>Reserve</button>
        </div>
      </section>
    );
  };
  export default SpotShow;
