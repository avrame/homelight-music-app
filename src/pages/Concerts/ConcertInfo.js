import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ConcertInfo() {
  const [concert, setConcert] = useState({});
  const { concertId } = useParams();

  useEffect(() => {
    async function getConcert() {
      const response = await fetch(`https://hl-candidate-events.herokuapp.com/concerts/${concertId}`);
      const fetchedConcert = await response.json();
      console.log(fetchedConcert)
      setConcert(fetchedConcert);
    }

    getConcert();
  }, []);

  const { name, title } = concert;

  if (Object.keys(concert).length) {
    return (
      <>
        <h1>{name || title || 'unnamed'}</h1>
      </>
    );
  }

  return null;
}

export default ConcertInfo;
