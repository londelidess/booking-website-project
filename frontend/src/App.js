import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/Spots/SpotIndex";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import EditSpotForm from "./components/Spots/EditSpotForm";
import SpotShow from "./components/Spots/SpotShow";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/" component={SpotIndex} />
            <Route path="/spots/new" component={CreateSpotForm} />
            <Route exact path="/spots/:spotId" component={SpotShow} />
            <Route path="/spots/:spotId/edit" component={EditSpotForm} />
          </Switch>
        )}
      </div>
  );
}

export default App;
