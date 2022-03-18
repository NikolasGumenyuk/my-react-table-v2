import React from "react";

export function Headers(props) {
  const name = props.column.header;

  return (
    <th>
      <div className="table-header">
        <span>{name}</span>
        <div>
          <button onClick={() => props.onClick(props.column.accessor, "down")}>
            ↓
          </button>
          <button onClick={() => props.onClick(props.column.accessor, "up")}>
            ↑
          </button>
        </div>
      </div>
    </th>
  );
}
