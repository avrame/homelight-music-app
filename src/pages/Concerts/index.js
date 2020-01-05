import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ConcertRow from "./components/ConcertRow";
import ConcertProfile from "./profile";
import { fetchConcerts } from "../../lib/api";

function Concerts() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    async function getConcerts() {
      const fetchedConcerts = await fetchConcerts();
      setConcerts(fetchedConcerts);
    }

    getConcerts();
  }, []);

  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:concertId`}>
        <ConcertProfile />
      </Route>
      <Route path={match.path}>
        <section className="section">
          <div className="container">
            <h1 className="title">Concerts</h1>
            <table className="table">
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
                {concerts.map(concert => (
                  <ConcertRow key={concert._id} concert={concert} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Route>
    </Switch>
  );
}

export default Concerts;
