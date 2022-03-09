import React from "react";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import { Headers } from "./Headers";
import { Body } from "./Body";

export const BasicTable = () => {
  const columns = COLUMNS;
  const data = MOCK_DATA.slice(0, 10);

  return (
    <table>
      <thead>
        <tr key="header">
        { columns.map(column => <Headers key={column.header} column={column}/>) }
        </tr>
      </thead>
      <tbody>
        { data.map((item, index) => <tr key={index}><Body columns={columns} item={item}/></tr>)}
      </tbody>
    </table>
  );
};
