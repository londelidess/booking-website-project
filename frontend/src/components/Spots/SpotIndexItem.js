import { Link } from "react-router-dom";


const SpotIndexItem = ({ spot }) => {
  const avgRating = spot.avgRating === 0 ? 'New' : spot.avgRating.toFixed(2);

  return (
    <li title={spot.name}>
      <Link to={`/spots/${spot.id}`}>
        <div className="spot-item">
          <div className="spot-details">
            <img src={spot.previewImage} alt={spot.name} className="spot-thumbnail"/>
            <div className="spot-info">{spot.city}, {spot.state} <i className="fa-solid fa-star" style={{marginLeft: '10px'}}></i>{avgRating}</div>
            <div>${spot.price} night</div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SpotIndexItem;
