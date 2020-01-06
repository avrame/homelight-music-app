import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

import { DATE_FORMAT, GOOGLE_API_KEY } from "../../lib";
import { fetchConcert, fetchArtistsList } from "../../lib/api";
import ConcertLocation from "./components/ConcertLocation";
import Definition from "../../components/Definition";

function ConcertProfile() {
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
      const fetchedArtists = await fetchArtistsList(artistIds);
      setArtists(fetchedArtists);
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
      <section className="section">
        <div className="container">
          <h1 className="title" dangerouslySetInnerHTML={createTitle()} />
          <div className="columns">
            <div className="column">
              <h2>Artists</h2>
              <ul>
                {artists.map((artist, idx) => (
                  <li key={idx}>
                    <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="column">
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

              <dl>
                <Definition
                  term="Ticket Status:"
                  value={concert.ticket_status}
                />
                <Definition
                  term="Date on Sale:"
                  value={format(new Date(on_sale_datetime), DATE_FORMAT)}
                />
                <Definition
                  term="Event Date:"
                  value={format(new Date(event_date_time), DATE_FORMAT)}
                />
              </dl>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

export default ConcertProfile;
