import { Link } from "react-router-dom";

const UserSpotIndexItem = ({ spot }) => {
  const avgRating = spot.avgRating === 0 ? "New" : spot?.avgRating?.toFixed(2);

  const handleUpdate = () => {
    // Handle update logic here
  };

  const handleDelete = () => {
    // Handle delete logic here
  };
  return (
    <>
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
              <li>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
              </li>
      </li>
    </>
  );
};

export default UserSpotIndexItem;
