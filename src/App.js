import React, { useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Link,
  Switch,
  Route
} from "react-router-dom";
import "bulma/css/bulma.css";
import "./App.css";

import Home from "./pages/Home";
import Concerts from "./pages/Concerts";
import Artists from "./pages/Artists";
import Venues from "./pages/Venues";

function App() {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  function toggleMobileNav() {
    setMobileNavVisible(!mobileNavVisible);
  }

  return (
    <Router>
      <div className="App">
        <nav
          className="navbar is-link"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Music Browser
            </Link>
            <a
              role="button"
              className={`navbar-burger burger${
                mobileNavVisible ? " is-active" : ""
              }`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={toggleMobileNav}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu${mobileNavVisible ? " is-active" : ""}`}>
            <div className="navbar-start">
              <NavLink
                to="/concerts"
                className="navbar-item"
                activeClassName="is-active"
              >
                Concerts
              </NavLink>
              <NavLink
                to="/artists"
                className="navbar-item"
                activeClassName="is-active"
              >
                Artists
              </NavLink>
              <NavLink
                to="/venues"
                className="navbar-item"
                activeClassName="is-active"
              >
                Venues
              </NavLink>
            </div>
          </div>
        </nav>

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
