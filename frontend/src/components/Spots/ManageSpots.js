import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import UserSpotIndexItem from "./UserSpotIndexItem";
import "./Spots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const userSpots = Object.values(spotsObj);
  // console.log(userSpots);

  useEffect(() => {
    dispatch(currentUserSpots())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div className="manage-spots">
        <h1>Manage Spots</h1>
        {sessionUser && userSpots.length === 0 &&  (
          <NavLink to="/spots/new" style={{

          border: "1px solid #000",
          backgroundColor: "grey",
          color: "white",
          padding: "5px",
          boxShadow: "5px 5px 5px",
          width: "fit-content",
          textDecoration: "none",
          cursor: "pointer" }}>
            Create a New Spot
          </NavLink>
        )}

      </div>
      <ul className="spot-grid">
        {userSpots.map((spot) => (
          <UserSpotIndexItem
            spot={spot}
            key={spot.id}
            sessionUser={sessionUser}
          />
        ))}
      </ul>
    </section>
  );
};

export default ManageSpots;
