import React from "react";

function SortTableHeader({
  children,
  columnProp,
  sortedColumn,
  sortAscending,
  sortColumn
}) {
  return (
    <th className="sortable" onClick={() => sortColumn(columnProp)}>
      {children}
      {sortedColumn === columnProp && (
        <span className="icon">
          {sortAscending ? (
            <i className="fas fa-caret-down"></i>
          ) : (
            <i className="fas fa-caret-up"></i>
          )}
        </span>
      )}
    </th>
  );
}

export default SortTableHeader;
