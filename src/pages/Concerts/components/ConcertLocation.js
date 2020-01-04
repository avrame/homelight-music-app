import React from 'react';

function ConcertLocation({ venueName, locality, region }) {
  return (
    <span>
      {venueName} {venueName && <br />}
      {locality}{locality && region && ','} {region}
    </span>
  );
}

export default ConcertLocation;