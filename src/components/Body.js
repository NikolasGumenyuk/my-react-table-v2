import React from "react";

export function Body(props) {
  const { columns, item, search } = props;

  const highlight = (text) => {
    if (!search) {
      return text;
    }

    let field = new String(text);
    let reggie = new RegExp(search, "ig");
    let found = field.search(reggie) !== -1;

    return !found
      ? field
      : field.replace(reggie, "<mark>" + search + "</mark>");
  };

  return columns.map((column) => (
    <td
      key={item.id + column.accessor}
      dangerouslySetInnerHTML={{ __html: highlight(item[column.accessor]) }}
    ></td>
  ));
}
