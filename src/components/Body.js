import React from "react";
import Highlight from "./Highlight";

export const Body = ({ columns, item, search }) => {
  return columns.map((column) => (
    <td key={item.id + column.accessor}>
      <Highlight text={item[column.accessor]} search={search} />
    </td>
  ));
};
