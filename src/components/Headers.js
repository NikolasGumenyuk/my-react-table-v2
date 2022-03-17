import React from "react";

export function Headers(props) {
  const name = props.column.header;

  return (
    <th>
      {name}
     
      <button onClick={() => props.onClick(props.column.accessor, 'down')}>
      Down
      </button>
      <button onClick={() => props.onClick(props.column.accessor, 'up')}>
      Up
      </button>
    </th>
  );
}
