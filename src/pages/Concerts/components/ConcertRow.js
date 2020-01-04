import React from "react";
import { format } from "date-fns";

import { DATE_FORMAT } from "../../../lib";
import ConcertLocation from "./ConcertLocation";
import BuyTickets from "./BuyTickets";

function ConcertRow({ concert }) {
  const {
    id,
    name,
    title,
    event_date_time,
    ticket_status,
    on_sale_datetime,
    locality,
    region,
    venue_name,
    ticket_links
  } = concert;

  function createTitle() {
    return { __html: name || title || "unnamed" };
  }

  return (
    <tr>
      <td>
        <a href={`/concerts/${id}`} dangerouslySetInnerHTML={createTitle()} />
      </td>
      <td>{format(new Date(event_date_time), DATE_FORMAT)}</td>
      <td>
        <ConcertLocation
          venueName={venue_name}
          locality={locality}
          region={region}
        />
      </td>
      <td>{ticket_status}</td>
      <td>{format(new Date(on_sale_datetime), DATE_FORMAT)}</td>
      <td>
        <BuyTickets ticketLinks={ticket_links} ticketStatus={ticket_status} />
      </td>
    </tr>
  );
}

export default ConcertRow;
