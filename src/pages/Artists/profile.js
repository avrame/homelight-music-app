import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { fetchArtist } from "../../lib/api";
import { DATE_FORMAT } from "../../lib";
import Definition from "../../components/Definition";
import TagList from "../../components/TagList";

function ArtistInfo() {
  const [artist, setArtist] = useState({});
  const { artistId } = useParams();

  const {
    name,
    logo = "https://place-hold.it/192x192",
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

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <img src={logo} width={192} alt="Band Logo" />

            <dl>
              {life_span_begin && (
                <Definition
                  term="Started:"
                  value={format(new Date(life_span_begin), DATE_FORMAT)}
                />
              )}
              {life_span_end && (
                <Definition
                  term="Ended:"
                  value={format(new Date(life_span_end), DATE_FORMAT)}
                />
              )}
            </dl>

            {genres && genres.length > 0 && (
              <>
                <h2 className="title is-3">Genres</h2>
                <TagList tags={genres} />
              </>
            )}

            {similarArtists && similarArtists.length > 0 && (
              <>
                <h2 className="title is-3">Similar Artists</h2>
                <TagList tags={similarArtists} type="primary" />
              </>
            )}
          </div>
          <div className="column">
            <h1 className="title is-1">{name}</h1>

            {bio && (
              <>
                <h2 className="title is-3">Bio</h2>
                <p>{bio}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtistInfo;
