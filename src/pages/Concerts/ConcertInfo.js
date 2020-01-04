import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { format } from "date-fns";

import { DATE_FORMAT } from "../../lib";
import { fetchConcert, fetchArtistsList } from "../../lib/api";
import ConcertLocation from "./ConcertLocation";

const GOOGLE_API_KEY = "AIzaSyAFBnQoZ7vZsIYIyd2ChLhFN8rI5P-APXg";

function ConcertInfo() {
  const [concert, setConcert] = useState({});
  const [artists, setArtists] = useState([]);
  const { concertId } = useParams();

  const {
    name,
    title,
    venue_name,
    locality,
    region,
    artists: artistIds,
    on_sale_datetime,
    event_date_time,
    loc: { coordinates: [long, lat] = [] } = {}
  } = concert;

  useEffect(() => {
    async function getConcert() {
      const fetchedConcert = await fetchConcert(concertId);
      setConcert(fetchedConcert);
    }
    getConcert();
  }, [concertId]);

  useEffect(() => {
    async function getArtists() {
      const artistsArray = await fetchArtistsList(artistIds);
      setArtists(artistsArray);
    }

    if (artistIds && artistIds.length) {
      getArtists();
    }
  }, [artistIds]);

  function createTitle() {
    return { __html: name || title || "unnamed" };
  }

  if (Object.keys(concert).length) {
    return (
      <Container>
        <Row>
          <Col>
            <h1 dangerouslySetInnerHTML={createTitle()} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Artists</h2>
            <ul>
              {artists.map((artist, idx) => (
                <li key={idx}>
                  <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                </li>
              ))}
            </ul>

            <h2>Location</h2>
            <ConcertLocation
              venueName={venue_name}
              locality={locality}
              region={region}
            />
            {lat && long && (
              <iframe
                title="Venue Map"
                width="450"
                height="450"
                frameBorder="0"
                style={{ border: "0" }}
                src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_API_KEY}&q=${venue_name}&center=${lat},${long}&zoom=18`}
                allowFullScreen
              ></iframe>
            )}
          </Col>
          <Col>
            <dl>
              <dt>Ticket Status</dt>
              <dd>{concert.ticket_status}</dd>
              {on_sale_datetime && (
                <>
                  <dt>Date on Sale</dt>
                  <dd>{format(new Date(on_sale_datetime), DATE_FORMAT)}</dd>
                </>
              )}
              {event_date_time && (
                <>
                  <dt>Event Date</dt>
                  <dd>{format(new Date(event_date_time), DATE_FORMAT)}</dd>
                </>
              )}
            </dl>
          </Col>
        </Row>
      </Container>
    );
  }

  return null;
}

export default ConcertInfo;
