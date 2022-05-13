import React from "react";

function Pagination({ postPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination pagination-sm justify-content-end border-0 mt-3">
        {pageNumbers.map((number) => {
          let classes = "page-item border-0 ";
          if (number === currentPage) {
            classes += "active border-0";
          }
          return (
            <li key={number} className={classes}>
              <a
                onClick={() => paginate(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
