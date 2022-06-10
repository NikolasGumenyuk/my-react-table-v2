import React from "react";

const Highlight = ({ text, search }) => {
  let field = text.toString();
  const firstIndex = field.toLowerCase().indexOf(search.toLowerCase());
  const lastIndex = firstIndex + search.length;
  const isNotFound = firstIndex === -1;

  if (!search || isNotFound) {
    return text;
  }

  return (
    <>
      {field.substring(0, firstIndex)}
      <span className="highlight">
        {field.substring(firstIndex, lastIndex)}
      </span>
      {field.substring(lastIndex, field.length)}
    </>
  );
};

export default Highlight;
