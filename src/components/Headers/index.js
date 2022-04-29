import React from "react";

const Headers = ({ column, isSortDesc, sortedField, onClick }) => {
  const { header, accessor } = column;

  return (
    <th onClick={() => onClick(accessor)}>
      <div className="table-header">
        <span>{header}</span>
        {sortedField === accessor && <span>{isSortDesc ? "↓" : "↑"}</span>}
      </div>
    </th>
  );
};

export default Headers;
