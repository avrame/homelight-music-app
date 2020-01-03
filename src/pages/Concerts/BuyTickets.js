import React from 'react';

function BuyTickets({ ticketLinks, ticketStatus }) {
  if (ticketStatus === 'available' && ticketLinks && ticketLinks.length) {
    return ticketLinks.map((ticketLink, idx) => {
      const { url, source_display } = ticketLink;
      return <a key={idx} href={url} target="_blank" rel="noopener noreferrer">{source_display}</a>;
    });
  }
  return null;
}

export default BuyTickets;
