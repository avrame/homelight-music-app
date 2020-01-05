import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ConcertRow from "./components/ConcertRow";
import ConcertProfile from "./profile";
import { fetchConcerts } from "../../lib/api";
import SortTableHeader from "../../components/SortTableHeader";
import useSortTable from "../../hooks/useSortTable";

function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const match = useRouteMatch();
  const { sortedColumn, sortAscending, sortColumn } = useSortTable(
    "name",
    concerts,
    setConcerts
  );

  useEffect(() => {
    async function getConcerts() {
      setConcerts(await fetchConcerts());
    }

    getConcerts();
  }, []);

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
                  <SortTableHeader
                    columnProp="name"
                    sortedColumn={sortedColumn}
                    sortAscending={sortAscending}
                    sortColumn={sortColumn}
                  >
                    Name
                  </SortTableHeader>
                  <SortTableHeader
                    columnProp="event_date_time"
                    sortedColumn={sortedColumn}
                    sortAscending={sortAscending}
                    sortColumn={sortColumn}
                  >
                    Event Date
                  </SortTableHeader>
                  <th>Location</th>
                  <SortTableHeader
                    columnProp="ticket_status"
                    sortedColumn={sortedColumn}
                    sortAscending={sortAscending}
                    sortColumn={sortColumn}
                  >
                    Ticket Status
                  </SortTableHeader>
                  <SortTableHeader
                    columnProp="on_sale_datetime"
                    sortedColumn={sortedColumn}
                    sortAscending={sortAscending}
                    sortColumn={sortColumn}
                  >
                    Tickets on Sale Date
                  </SortTableHeader>
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
