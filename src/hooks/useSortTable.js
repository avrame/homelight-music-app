import { useState } from "react";

function useSortTable(defaultSortedCol, tableData, setTableData) {
  const [sortedColumn, setSortedColumn] = useState(defaultSortedCol);
  const [sortAscending, setSortAscending] = useState(true);

  function sortColumn(columnProp) {
    setTableData(
      tableData.sort((tdA, tdB) => {
        let returnVal;
        const a = tdA[columnProp];
        const b = tdB[columnProp];
        if (a < b) {
          returnVal = -1;
        } else if (a > b) {
          returnVal = 1;
        } else {
          returnVal = 0;
        }
        if (sortAscending) returnVal *= -1;
        return returnVal;
      })
    );
    setSortedColumn(columnProp);
    setSortAscending(!sortAscending);
  }

  return {
    sortedColumn,
    sortAscending,
    sortColumn
  };
}

export default useSortTable;
