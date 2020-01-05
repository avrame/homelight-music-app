import React from "react";

function Definition({ term, value }) {
  if (value) {
    return (
      <>
        <dt>{term}</dt>
        <dd>{value}</dd>
      </>
    );
  }
  return null;
}

export default Definition;
