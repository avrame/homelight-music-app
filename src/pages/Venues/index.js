import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import { fetchVenues } from "../../lib/api";
import VenueProfile from "./profile";
import useSortTable from "../../hooks/useSortTable";
import SortTableHeader from "../../components/SortTableHeader";

function Venues() {
  const [venues, setVenues] = useState([]);
  const { sortedColumn, sortAscending, sortColumn } = useSortTable(
    "name",
    venues,
    setVenues
  );

  useEffect(() => {
    async function getVenues() {
      const fetchedVenues = await fetchVenues();
      setVenues(fetchedVenues);
    }

    getVenues();
  }, []);

  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:venueSlug`}>
        <VenueProfile />
      </Route>
      <Route path={match.path}>
        <section className="section">
          <div className="container">
            <h1 className="title">Venues</h1>
            <table className="table">
              <thead>
                <tr>
                  <SortTableHeader
                    columnProp="name"
                    sortedColumn={sortedColumn}
                    sortAscending={sortAscending}
                    sortColumn={sortColumn}
                  >
                    Name
                  </SortTableHeader>
                  <SortTableHeader
                    columnProp="city_state"
                    sortedColumn={sortedColumn}
                    sortAscending={sortAscending}
                    sortColumn={sortColumn}
                  >
                    Location
                  </SortTableHeader>
                  <th>Age Restriction</th>
                </tr>
              </thead>
              <tbody>
                {venues.map((venue, idx) => {
                  const { name, slug, city_state, age_restriction } = venue;
                  return (
                    <tr key={idx}>
                      <td>
                        <Link to={`/venues/${slug}`}>{name}</Link>
                      </td>
                      <td>{city_state}</td>
                      <td>{age_restriction}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </Route>
    </Switch>
  );
}

export default Venues;
