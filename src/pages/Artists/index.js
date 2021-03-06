import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

import ArtistProfile from "./profile";
import { fetchArtists } from "../../lib/api";
import TagList from "../../components/TagList";
import useSortTable from "../../hooks/useSortTable";
import SortTableHeader from "../../components/SortTableHeader";
import FilterTableHeader from "../../components/FilterTableHeader";
import useFilterTable from "../../hooks/useFilterTable";

function Artists() {
  const match = useRouteMatch();
  const [artists, setArtists] = useState([]);
  const { sortedColumn, sortAscending, sortColumn } = useSortTable(
    "name",
    artists,
    setArtists
  );
  const [
    nameFilter,
    filterByNames,
    clearNameFilter,
    artistsFilteredByName
  ] = useFilterTable(artists, "name");

  useEffect(() => {
    async function getArtists() {
      const fetchedArtists = await fetchArtists();
      setArtists(fetchedArtists);
    }

    getArtists();
  }, []);

  return (
    <Switch>
      <Route path={`${match.path}/:artistId`}>
        <ArtistProfile />
      </Route>
      <Route path={match.path}>
        <section className="section">
          <div className="container">
            <h1 className="title">Artists</h1>
            <p>Here is a list of all the artists.</p>
            <table className="table is-fullwidth">
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
                  <th>Genres</th>
                </tr>
                <tr>
                  <FilterTableHeader
                    value={nameFilter}
                    placeholder="Filter Concert Names"
                    onChange={filterByNames}
                    clearFilter={clearNameFilter}
                  />
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {artistsFilteredByName.map((artist, idx) => {
                  const { id, name, genres } = artist;
                  return (
                    <tr key={idx}>
                      <td>
                        <Link to={`/artists/${id}`}>{name}</Link>
                      </td>
                      <td>
                        <TagList tags={genres} />
                      </td>
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

export default Artists;
