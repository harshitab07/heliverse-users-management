import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page , keyword }) => {
  const maxPagesToShow = 5; // Maximum number of pages to display at a time

  if (pages <= 1) {
    return null; // If there's only one page, no need to display pagination
  }

  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(pages, startPage + maxPagesToShow - 1);

  const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  return (
    <Pagination>
      {!isFirstPage && (
        <LinkContainer
          to={
            keyword ? `/search/${keyword}/page/${page - maxPagesToShow}` : `/page/${page - maxPagesToShow}`
          }
        >
          <Pagination.Prev>{`<<`}</Pagination.Prev>
        </LinkContainer>
      )}

      {pageNumbers.map((pageNumber) => (
        <LinkContainer
          key={pageNumber}
          to={
            keyword ? `/search/${keyword}/page/${pageNumber}` : `/page/${pageNumber}`
          }
        >
          <Pagination.Item active={pageNumber === page}>
            {pageNumber}
          </Pagination.Item>
        </LinkContainer>
      ))}

      {!isLastPage && (
        <LinkContainer
          to={
            keyword ? `/search/${keyword}/page/${page + maxPagesToShow}` : `/page/${page + maxPagesToShow}`
          }
        >
          <Pagination.Next>{`>>`}</Pagination.Next>
        </LinkContainer>
      )}
    </Pagination>
  );
};

export default Paginate;