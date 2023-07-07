import { Link } from "react-router-dom";

const SpotIndexItem = ({ spot }) => {
  const avgRating = spot.avgRating === 0 ? "New" : spot?.avgRating?.toFixed(2);

  return (
    <li title={spot.name}>
      <Link to={`/spots/${spot.id}`}>
        <div className="spot-item">
          <div
            className="spot-preview"
            style={{ backgroundImage: `url(${spot.previewImage})` }}
          ></div>
          <div className="spot-details">
            <div className="spot-info">
              <div>
                {spot.city}, {spot.state}
              </div>
              <div className="spot-rating">
                <i className="fa-solid fa-star"></i>
                {avgRating}
              </div>
            </div>
            <div>${spot.price} night</div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SpotIndexItem;
