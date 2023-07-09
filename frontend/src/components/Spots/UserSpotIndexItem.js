import { Link ,NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotFormModal from "./DeleteSpotFormModal"

const UserSpotIndexItem = ({ spot, sessionUser }) => {
  // const history = useHistory();

  const avgRating = spot.avgRating === 0 ? "New" : spot?.avgRating?.toFixed(2);

  // const handleUpdate = () => {
  //   history.push(`/spots/${spot.id}/edit`);
  // };

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
              <li className="Update-Delete-Buttons">
              {sessionUser && (
                  <NavLink to={`/spots/${spot.id}/edit`} style={{ cursor: "pointer" }}>
                    Update
                  </NavLink>
                )}
                <div className="delete-button-for-review">
            <OpenModalMenuItem
              itemText="Delete"
              modalComponent={<DeleteSpotFormModal spotId={spot.id} />}
            />
          </div>
              </li>
      </li>
    </>
  );
};

export default UserSpotIndexItem;
