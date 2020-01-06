import { useState } from "react";

function useFilterTable(tableData, columnProp) {
  const [filter, setFilter] = useState("");

  function handleFilterChange(evt) {
    const filterVal = evt.target.value;
    setFilter(filterVal);
  }

  function clearFilter() {
    setFilter("");
  }

  let filteredData;
  if (filter !== "") {
    filteredData = tableData.filter(concert => {
      return (
        concert[columnProp] &&
        concert[columnProp].toLowerCase().includes(filter.toLowerCase())
      );
    });
  } else {
    filteredData = tableData;
  }

  return [filter, handleFilterChange, clearFilter, filteredData];
}

export default useFilterTable;
