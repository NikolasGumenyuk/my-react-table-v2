import React, { useState, useEffect, useMemo } from "react";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import { Headers } from "./Headers";
import { Body } from "./Body";
import Pagination from "./Pagination";

let pageSizeArr = [5, 10, 20];

export const BasicTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const columns = COLUMNS;
  const [isSortDesc, setIsSortDesc] = useState(true);
  const [sortedField, setsortedField] = useState("");

  const sortData = (fieldName) => {
    if (sortedField === fieldName) {
      setIsSortDesc((prev) => !prev);
      return;
    }
    setsortedField(fieldName);
  };

  const sortedData = useMemo(() => {
    const sortDownFunc = (a, b) =>
      a[sortedField] > b[sortedField]
        ? 1
        : b[sortedField] > a[sortedField]
        ? -1
        : 0;

    const sortUpFunc = (a, b) =>
      a[sortedField] < b[sortedField]
        ? 1
        : b[sortedField] < a[sortedField]
        ? -1
        : 0;

    const selectedDirection = isSortDesc ? sortDownFunc : sortUpFunc;

    return MOCK_DATA.slice().sort(selectedDirection);
  }, [isSortDesc, sortedField]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = useMemo(() => {
    return sortedData.filter((item) => {
      const valueArray = Object.values(item).map((item) =>
        item.toString().toLowerCase()
      );

      return valueArray.some((str) => str.includes(search.toLowerCase()));

    });
  }, [search, sortedData]);

  const firstPageIndex = useMemo(
    () => (currentPage - 1) * pageSize,
    [currentPage, pageSize]
  );
  const lastPageIndex = useMemo(
    () => firstPageIndex + pageSize,
    [firstPageIndex, pageSize]
  );
  const currentItem = useMemo(
    () => filteredData.slice(firstPageIndex, lastPageIndex),
    [firstPageIndex, lastPageIndex, filteredData]
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      <select
        name="select"
        defaultValue={pageSize}
        onChange={(e) => {
          setCurrentPage(1);
          setPageSize(+e.target.value);
        }}
      >
        {pageSizeArr.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          setsortedField("")
          setCurrentPage(1);
        }}
      >
        Reset
      </button>
      <table>
        <thead>
          <tr key="header">
            {columns.map((column) => (
              <Headers
                key={column.header}
                column={column}
                onClick={sortData}
                sortedField={sortedField}
                isSortDesc={isSortDesc}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItem.map((item, index) => (
            <tr key={index}>
              <Body columns={columns} item={item} search={search} />
            </tr>
          ))}
        </tbody>
      </table>
      <span>Total: {filteredData.length}</span>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
