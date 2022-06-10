import React from "react";

const Headers = ({ column, isSortDesc, sortedField, onClick }) => {
  const { header, accessor } = column;
  const isShow = sortedField === accessor;
  const icon = isSortDesc ? "↓" : "↑";

  return (
    <th onClick={() => onClick(accessor)}>
      <div className="table-header">
        <span>{header}</span>
        {isShow && <span>{icon}</span>}
      </div>
    </th>
  );
};

export default Headers;
