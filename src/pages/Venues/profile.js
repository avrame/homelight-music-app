import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchVenueBySlug } from "../../lib/api";
import Definition from "../../components/Definition";
import TagList from "../../components/TagList";

function VenueProfile() {
  const { venueSlug } = useParams();
  const [venue, setVenue] = useState({});

  const {
    name,
    description,
    image = "https://place-hold.it/192x192",
    formatted_address,
    formatted_phone,
    formatted_website,
    genres = [],
    age_restriction,
    size
  } = venue;
  console.log(venue);

  useEffect(() => {
    async function getVenue() {
      const fetchedVenue = await fetchVenueBySlug(venueSlug);
      if (fetchedVenue && fetchedVenue.length) {
        setVenue(fetchedVenue[0]);
      }
    }

    getVenue();
  }, [venueSlug]);

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <img src={image} width={192} />

            <h2>Genres</h2>
            <TagList tags={genres} />
          </div>

          <div className="column">
            <h1 className="title is-1">{name}</h1>

            <h2 className="title is-3">Description</h2>
            <p>{description}</p>

            <h2 className="title is-3">Contact Info</h2>
            <dl>
              <Definition term="Address:" value={formatted_address} />
              <Definition term="Phone:" value={formatted_phone} />
              <Definition term="Age Restriction:" value={age_restriction} />
              <Definition term="Size:" value={size} />
              <Definition
                term="Website:"
                value={
                  <a
                    href={formatted_website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {name}
                  </a>
                }
              />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VenueProfile;
