import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "bulma/css/bulma.css";

import Home from "./pages/Home";
import Concerts from "./pages/Concerts";
import Artists from "./pages/Artists";
import Venues from "./pages/Venues";

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/concerts">Concerts</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/venues">Venues</Link>

        <Switch>
          <Route path="/concerts">
            <Concerts />
          </Route>
          <Route path="/artists">
            <Artists />
          </Route>
          <Route path="/venues">
            <Venues />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
