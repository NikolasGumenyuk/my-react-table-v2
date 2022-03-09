import React from "react";

export function Body(props) {
  const { columns, item } = props;

  return columns.map((column) => (
    <td key={item.id + column.accessor}>{item[column.accessor]}</td>
  ));
}
