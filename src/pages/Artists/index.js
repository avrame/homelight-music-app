import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import ArtistInfo from "./ArtistInfo";
import { fetchArtists } from "../../lib/api";

function Artists() {
  const match = useRouteMatch();
  const [artists, setArtists] = useState([]);

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
        <ArtistInfo />
      </Route>
      <Route path={match.path}>
        <h1>Artists</h1>
        <p>Here is a list of all the artists.</p>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Genres</th>
            </tr>
          </thead>
          <tbody>
            {artists &&
              artists.map((artist, idx) => {
                const { id, name, genres } = artist;
                return (
                  <tr key={idx}>
                    <td>
                      <Link to={`/artists/${id}`}>{name}</Link>
                    </td>
                    <td>{genres.join(", ")}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Route>
    </Switch>
  );
}

export default Artists;
