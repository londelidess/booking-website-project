import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/Spots/SpotIndex";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import UpdateSpotForm from "./components/Spots/UpdateSpotForm";
import SpotShow from "./components/Spots/SpotShow";
import ManageSpot from './components/Spots/ManageSpot'

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
            <Route exact path="/spots/new" component={CreateSpotForm} />
            <Route exact path="/spots/current" component={ManageSpot} />
            <Route exact path="/spots/:spotId" component={SpotShow} />
            <Route path="/spots/:spotId/edit" component={UpdateSpotForm} />

          </Switch>
        )}
      </div>
  );
}

export default App;
