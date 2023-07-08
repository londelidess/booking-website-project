import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailedSpot } from "../../store/spots";
import { fetchReviews } from "../../store/review";

import "./Spots.css";
import noImg from "../../images/no-img.jpg";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewFormModal from "../Review/PostReviewFormModal";

const SpotShow = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.allSpots ? state.spots.allSpots[spotId] : null);
  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector(state => {
    if (state.reviews.spot) {
      return Object.values(state.reviews.spot).filter(review => review.spotId === spotId);
    }
    return [];
  });

  useEffect(() => {
    dispatch(fetchDetailedSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  console.log('currentUser:', currentUser);
  console.log('reviews:', reviews);
  console.log('spot:', spot);

  const userHasReview = currentUser && reviews?.find((review) => review.userId === currentUser.id);
  console.log('userHasReview:', userHasReview);

  const isSpotCreator = currentUser && spot && currentUser.id === spot.ownerId;
  console.log('isSpotCreator:', isSpotCreator);

  if (!spot) return null;

  const avgRating =
    spot?.avgStarRating === 0 ? "New" : spot?.avgStarRating?.toFixed(2);

  const renderImages = () => {
    const totalImages = 5;
    let images = [];

    for (let i = 0; i < totalImages; i++) {
      if (spot?.SpotImages && spot?.SpotImages[i]) {
        images.push(
          <div
            className={`image-placeholder div${i + 1}`}
            key={spot.SpotImages[i].id}
          >
            <img src={spot.SpotImages[i].url} alt={`preview${i + 1}`} />
          </div>
        );
      } else {
        images.push(
          <div
            className={`image-placeholder div${i + 1}`}
            key={i + totalImages}
          >
            <img src={noImg} alt="No images" />
          </div>
        );
      }
    }

    return images;
  };

  return (
    <>
      <div className="detailed-page">
        <h1>{spot.name}</h1>
        <h2>
          {spot.city}, {spot.state}, {spot.country}
        </h2>

        <div className="parent">{renderImages()}</div>

        <div className="content-row">
          <div className="left-content">
            <h2>
              Hosted by {spot?.Owner?.firstName}, {spot?.Owner?.lastName}
            </h2>
            <div className="description">
              <p>{spot.description}</p>
            </div>
          </div>

          <div className="reserve-container">
            <div className="reserve-info">
              <div>
                <h2>${spot.price.toFixed(2)}</h2>
                <p>night</p>
              </div>
              <div className="spot-rating">
                <i className="fa-solid fa-star"></i>
                {avgRating}
              </div>
            </div>
            <button onClick={() => alert("Feature coming soon")}>
              Reserve
            </button>
          </div>
        </div>

        <hr />
        <div className="spot-rating-under-detailed-page">
          <i className="fa-solid fa-star"></i>
          {avgRating}
        </div>
        {currentUser && !userHasReview && !isSpotCreator && (
          <div className="review-button">
            <OpenModalMenuItem
              itemText="Post Your Review"
              modalComponent={<PostReviewFormModal spotId={spotId} />}
            />
          </div>
        )}
      </div>
      <div>{!reviews?.length && <p>Be the first to post a review!</p>}</div>
    </>
  );
};

export default SpotShow;
