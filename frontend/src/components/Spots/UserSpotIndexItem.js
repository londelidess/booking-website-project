import { Link, NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotFormModal from "./DeleteSpotFormModal";
const UserSpotIndexItem = ({ spot, sessionUser }) => {
  // const history = useHistory();

  const avgRating = spot.avgRating === 0 ? "New" : spot?.avgRating?.toFixed(2);

  // const handleUpdate = () => {
  //   history.push(`/spots/${spot.id}/edit`);
  // };

  return (
    <>
      <li title={spot.name} className="outer-container-Update-Delete-Buttons">
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
              <p style={{ fontWeight: 'bold' }}>${spot.price.toFixed(2)} night</p>
            </div>
          </div>
        </Link>
        <div className="Update-Delete-Buttons">
          {sessionUser && (
            <NavLink
              to={`/spots/${spot.id}/edit`}
              style={{
                marginLeft: "22px",
                marginTop:"10px",
                border: "1px solid #000",
                backgroundColor: "grey",
                color: "white",
                padding: "5px",
                boxShadow: "5px 5px 5px",
                width: "fit-content",
                textDecoration: "none",
                cursor: "pointer"
              }}
            >
              Update
            </NavLink>
          )}
          <div className="delete-button-for-spot">
            <OpenModalMenuItem
              itemText="Delete"
              modalComponent={<DeleteSpotFormModal spotId={spot.id} />}
            />
          </div>
        </div>
      </li>
    </>
  );
};


export default UserSpotIndexItem;
