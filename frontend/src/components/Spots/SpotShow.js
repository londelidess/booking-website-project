import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailedSpot } from "../../store/spots";
import { fetchReviews } from "../../store/review";
import DeleteReviewFormModal from "../Review/DeleteReviewFormModal";
import "./Spots.css";
import noImg from "../../images/no-img.jpg";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewFormModal from "../Review/PostReviewFormModal";

const SpotShow = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.single);
  console.log("spot:", spot);
  const currentUser = useSelector((state) => state.session.user);
  console.log("currentUser:", currentUser);
  const reviews = useSelector((state) =>
    Object.values(state.reviews.spot.reviewData)
  );
  console.log("reviews array:", reviews);

  const userHasReview =
    currentUser && reviews?.find((review) => review.userId === currentUser.id);
  console.log("userHasReview:", userHasReview);

  const isSpotCreator = currentUser && currentUser.id === spot?.ownerId;
  console.log("isSpotCreator:", isSpotCreator);

  useEffect(() => {
    dispatch(fetchDetailedSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

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
        } else if (images.length < totalImages) {
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
          {" - "}
          {reviews?.length && (
            <p>
              {reviews.length} {reviews.length > 1 ? "reviews" : "review"}
            </p>
          )}
        </div>
        <div>
          {currentUser && !userHasReview && !isSpotCreator && (
            <div className="review-button">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<PostReviewFormModal spotId={spotId} />}
              />
            </div>
          )}
        </div>
      </div>
      <div>{!reviews?.length && <p>Be the first to post a review!</p>}</div>
      {reviews.length > 0 &&
        reviews.map((review) => {
          return (
            <ul>
              <h3>{review?.User.firstName}</h3>
              <h3>{review?.updatedAt}</h3>
              <p>{review?.review}</p>

              {review?.User.id === currentUser.id && (
                <div className="delete-button">
                  <OpenModalMenuItem
                    itemText="Delete"
                    modalComponent={
                      <DeleteReviewFormModal reviewId={review.id} />
                    }
                  />
                </div>
              )}
            </ul>
          );
        })}
    </>
  );
};

export default SpotShow;
