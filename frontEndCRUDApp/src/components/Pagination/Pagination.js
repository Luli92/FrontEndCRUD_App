import React from "react";

import { StyledDiv } from "./styled";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledDiv>
      <div>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
          className="pagination"
        >
          {pageNumbers.map(number => (
            <div key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </div>
          ))}
        </ul>
      </div>
    </StyledDiv>
  );
};

export default Pagination;
