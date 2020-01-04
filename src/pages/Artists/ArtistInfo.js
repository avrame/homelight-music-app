import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { format } from "date-fns";

import { fetchArtist } from "../../lib/api";
import { DATE_FORMAT } from "../../lib";

function ArtistInfo() {
  const [artist, setArtist] = useState({});
  const { artistId } = useParams();

  const {
    name,
    logo,
    bio,
    life_span_begin,
    life_span_end,
    genres = [],
    similar: similarArtists = []
  } = artist;

  useEffect(() => {
    async function getArtist() {
      const fetchedArtist = await fetchArtist(artistId);
      setArtist(fetchedArtist);
    }

    getArtist();
  }, [artistId]);

  console.log({ artist });

  return (
    <Container>
      <Row>
        <Col>{logo && <img src={logo} width={192} alt="Band Logo" />}</Col>
        <Col>
          <h1>{name}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {life_span_begin && (
            <>
              <h2>Started</h2>
              <p>{format(new Date(life_span_begin), DATE_FORMAT)}</p>
            </>
          )}
          {life_span_end && (
            <>
              <h2>Ended</h2>
              <p>{format(new Date(life_span_end), DATE_FORMAT)}</p>
            </>
          )}
          {genres && genres.length > 0 && (
            <>
              <h2>Genres</h2>
              <ul>
                {genres.map((genre, idx) => (
                  <li key={idx}>{genre}</li>
                ))}
              </ul>
            </>
          )}
          {similarArtists && similarArtists.length > 0 && (
            <>
              <h2>Similar Artists</h2>
              <ul>
                {similarArtists.map((similar, idx) => (
                  <li key={idx}>{similar}</li>
                ))}
              </ul>
            </>
          )}
        </Col>
        <Col>
          {bio && (
            <>
              <h2>Bio</h2>
              <p>{bio}</p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ArtistInfo;
