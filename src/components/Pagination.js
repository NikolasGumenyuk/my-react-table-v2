import React from "react";

const Pagination = ({ itemPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={
            currentPage === number
              ? "chosen-pagination-button"
              : "page-link page-item"
          }
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
