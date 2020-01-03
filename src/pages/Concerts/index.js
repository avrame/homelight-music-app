import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import ConcertRow from './ConcertRow';
import ConcertInfo from './ConcertInfo';

function Concerts() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    async function fetchConcerts() {
      const response = await fetch('https://hl-candidate-events.herokuapp.com/concerts');
      const fetchedConcerts = await response.json();
      setConcerts(fetchedConcerts);
    }

    fetchConcerts();
  }, []);

  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:concertId`}>
        <ConcertInfo />
      </Route>
      <Route path={match.path}>
        <h1>Concerts</h1>
        <p>Here is a list of all the concerts.</p>
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Event Date</th>
              <th>Location</th>
              <th>Ticket Status</th>
              <th>Tickets on Sale Date</th>
              <th>Buy Tickets</th>
            </tr>
          </thead>
          <tbody>
            {concerts.map(concert => <ConcertRow key={concert._id} concert={concert} />)}
          </tbody>
        </Table>
      </Route>
    </Switch>
  );
}

export default Concerts;
