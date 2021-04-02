import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;

  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);

    &[aria-current],
    &.current {
      color: var(--red);
    }
  }

  a {
    text-align: center;
    text-decoration: none;

    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function Pagination({ totalCount, currentPage, skip, base }) {
  const pageSize = parseInt(process.env.GATSBY_SLICEMASTERS_PAGINATION_SIZE);
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  return (
    <PaginationStyles>
      <Link to={`${base}/${prevPage}`} disabled={!hasPrevPage}>
        ← Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          key={i}
          to={`${base}/${i + 1}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link to={`${base}/${nextPage}`} disabled={!hasNextPage}>
        Next →
      </Link>
    </PaginationStyles>
  );
}
