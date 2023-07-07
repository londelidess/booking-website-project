import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import SearchBar from './SearchBar';
// import Greeting from './Greeting';
import logo from "../../images/logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <nav>
      <ul className="header">
        <li>
          <NavLink exact to="/">
            <img className="logo" src={logo} alt="home" />
          </NavLink>
        </li>
        {/* <li>
          <Greeting user={sessionUser} />
        </li>
        <li>
          <SearchBar />
        </li> */}
        {isLoaded && (
          <React.Fragment>
            <li>
              <div className="nav-item-group">
                {sessionUser && (
                  <NavLink to="/spots/new" style={{ cursor: "pointer" }}>
                    Create a New Spot
                  </NavLink>
                )}
                <ProfileButton
                  user={sessionUser}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </li>
          </React.Fragment>
          //  i need react,fragment to return more than 2 line same as <></>
        )}
      </ul>
    </nav>
  );
}
export default Navigation;
