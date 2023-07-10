import { useParams } from "react-router-dom";
import React, { useEffect,useState  } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  const spot = useSelector((state) => state.spots.singleSpot);
  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.spot);
  const userHasReview =
    currentUser && reviews?.find((review) => review.userId === currentUser.id);

  const isSpotCreator = currentUser && currentUser.id === spot?.ownerId;

  useEffect(() => {
    const fetchSpotAndReviews = async () => {
      setIsLoading(true);
      await dispatch(fetchDetailedSpot(spotId));

      try {
        await dispatch(fetchReviews(spotId));
      } catch (err) {
        console.log("No reviews found");
      }
      setIsLoading(false);
    };

    fetchSpotAndReviews();
  }, [dispatch, spotId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // const avgRating =
  //   spot?.avgStarRating === 0 ? "New" : spot?.avgStarRating?.toFixed(2);
  //backend
  let avgRating;
  if (reviews && reviews.length > 0) {
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    avgRating = (totalStars / reviews.length).toFixed(2);
  } else {
    avgRating = "New";
  } //calculating frontEnd.

  const renderImages = () => {
    const totalImages = 5;
    let images = [];
//key has to be unique
    for (let i = 0; i < totalImages; i++) {
      if (spot?.SpotImages && spot?.SpotImages[i]) {
        images.push(
          <div
            className={`image-placeholder div${i + 1}`}
            key={`image-${spot.SpotImages[i].id}`}///
          >
            <img src={spot.SpotImages[i].url} alt={`preview${i + 1}`} />
          </div>
        );
      } else if (images.length < totalImages) {
        images.push(
          <div
            className={`image-placeholder div${i + 1}`}
            key={`placeholder-${i + totalImages}`}///
          >
            <img src={noImg} alt="No images" />
          </div>
        );
      }
    }
    return images;
  };

  if (!spot) return null;

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
                {reviews && reviews.length > 0 && (
                  <p className="reviews-count">
                    {"·  "}
                    {reviews.length}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                  </p>
                )}
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
          {reviews && reviews.length > 0 && (
            <p className="reviews-count">
              {"· "}
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </p>
          )}
        </div>
        <div>
          {currentUser && !userHasReview && !isSpotCreator && (
            <div className="post-your-review">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<PostReviewFormModal spotId={spotId} />}
              />
            </div>
          )}
        </div>
        <div>{!reviews?.length && <h3>Be the first to post a review!</h3>}</div>
      </div>
      {reviews.length > 0 &&
        reviews.map((review) => {
          return (
            <ul key={review.id}>
              <h3>{review?.User?.firstName}</h3>
              <h3>{review?.updatedAt}</h3>
              <p>{review?.review}</p>

              {review?.userId === currentUser?.id && ( ///
                <div className="delete-button-for-review">
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
