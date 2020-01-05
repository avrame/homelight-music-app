import React from "react";

function TagList({ tags, type = "info" }) {
  return (
    <div className="tags">
      {tags.map((tag, idx) => (
        <span key={idx} className={`tag is-${type}`}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default TagList;
