import React from "react";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import { Headers } from "./Headers";
import { Body } from "./Body";

export const BasicTable = () => {
  const [data, setData] = React.useState(MOCK_DATA.slice(0, 10));
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
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
  React.useEffect(() => {
    const results = data.filter((item) => {
      const valueArray = Object.values(item).map((item) =>
        (item + "").toLowerCase()
      );

      return !!valueArray.find((str) => str.includes(search.toLowerCase()));
    });

    setSearchResults(results);
  }, [search, data]);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      <table>
        <thead>
          <tr key="header">
            {columns.map((column) => (
              <Headers key={column.header} column={column} onClick={sortData} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={search.trim().length && !!searchResults.find(s => s.id === item.id) ? 'color' : ''}>
              <Body columns={columns} item={item} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
