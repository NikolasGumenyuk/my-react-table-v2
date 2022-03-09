import React from "react";

export function Headers(props) {
    const name = props.column.header;
  return (
    <th>
      {name}
    </th>
  );
}
