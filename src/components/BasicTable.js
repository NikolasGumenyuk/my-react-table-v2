import React from "react";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import { Headers } from "./Headers";
import { Body } from "./Body";

export const BasicTable = () => {
  const [data, setData] = React.useState(MOCK_DATA.slice(0, 10));
  const columns = COLUMNS;
  // const data = MOCK_DATA.slice(0, 10);
  let sortedData = data;

  const sortData = (fieldName, direction) => {
    // console.log(fieldName, direction);
    const sortDownFunc = (a, b) =>
      a[fieldName] > b[fieldName] ? 1 : b[fieldName] > a[fieldName] ? -1 : 0;

    const sortUpFunc = (a, b) =>
      a[fieldName] < b[fieldName] ? 1 : b[fieldName] < a[fieldName] ? -1 : 0;

    const selectedDirection =
      direction === "down" ? sortDownFunc : sortUpFunc;

    setData(sortedData.slice().sort(selectedDirection));

    // console.log(sortedData);
  };

  return (
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
          <tr key={index}>
            <Body columns={columns} item={item} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
