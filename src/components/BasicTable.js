import React, { useState, useEffect } from "react";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import { Headers } from "./Headers";
import { Body } from "./Body";
import Pagination from "./Pagination";

export const BasicTable = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  let itemsPerPageArr = [5, 10, 20];
  const columns = COLUMNS;
  let sortedData = data;

  const sortData = (fieldName, direction) => {
    const sortDownFunc = (a, b) =>
      a[fieldName] > b[fieldName] ? 1 : b[fieldName] > a[fieldName] ? -1 : 0;

    const sortUpFunc = (a, b) =>
      a[fieldName] < b[fieldName] ? 1 : b[fieldName] < a[fieldName] ? -1 : 0;

    const selectedDirection = direction === "down" ? sortDownFunc : sortUpFunc;

    setData(sortedData.slice().sort(selectedDirection));
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    const results = data.filter((item) => {
      const valueArray = Object.values(item).map((item) =>
        (item + "").toLowerCase()
      );

      return !!valueArray.find((str) => str.includes(search.toLowerCase()));
    });

    setSearchResults(results);
  }, [search, data]);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const currentItem = data.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNamber) => setCurrentPage(pageNamber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

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
        defaultValue={itemPerPage}
        onChange={(e) => {
          setItemPerPage(e.target.value);
        }}
      >
        {itemsPerPageArr.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          setData(MOCK_DATA);
          setCurrentPage(1);
        }}
      >
        Reset
      </button>
      <table>
        <thead>
          <tr key="header">
            {columns.map((column) => (
              <Headers key={column.header} column={column} onClick={sortData} />
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItem.map((item, index) => (
            <tr
              key={index}
              className={
                search.trim().length &&
                !!searchResults.find((s) => s.id === item.id)
                  ? "color"
                  : ""
              }
            >
              <Body columns={columns} item={item} />
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} className="arrow-button">
          <span>←</span>
        </button>
        <Pagination
          itemPerPage={itemPerPage}
          totalItems={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <button onClick={nextPage} className="arrow-button">
          <span>→</span>
        </button>
      </div>
    </>
  );
};
