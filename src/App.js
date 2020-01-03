import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Concerts from './pages/Concerts';
import Artists from './pages/Artists';
import Venues from './pages/Venues';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Music Browser</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/concerts">Concerts</Nav.Link>
            <Nav.Link href="/artists">Artists</Nav.Link>
            <Nav.Link href="/venues">Venues</Nav.Link>
          </Nav>
        </Navbar>

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
