// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import "./Navigation.css";
// import SearchBar from './SearchBar';
// import Greeting from './Greeting';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//     );
//   } else {
//     sessionLinks = (
//       <li>
//         <OpenModalButton
//           buttonText="Log In"
//           modalComponent={<LoginFormModal />}
//         />
//         <OpenModalButton
//           buttonText="Sign Up"
//           modalComponent={<SignupFormModal />}
//         />
//       </li>
//     );
//   }

//   return (
//     <nav>
//     <ul>
//       <li>
//         <NavLink exact to="/">
//           Home
//         </NavLink>
//       </li>
//       <li><Greeting user={sessionUser} /></li>
//       <li><SearchBar /></li>
//       {isLoaded && sessionLinks}
//     </ul>
//      </nav>
//   );
// }

// export default Navigation;
//supposed to work as phase 4

// frontend/src/components/Navigation/index.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './SearchBar';
import Greeting from './Greeting';
import logo from '../../images/logo.jpg';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    return (
      <nav>
      <ul>
        <li>
          <NavLink exact to="/"><img src={logo} alt = 'home' /></NavLink>
        </li>
        <li>
          <Greeting user={sessionUser} />
        </li>
        <li>
          <SearchBar />
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
    );
}
export default Navigation;
