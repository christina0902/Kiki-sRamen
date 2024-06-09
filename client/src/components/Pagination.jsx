export const CustomPagination = ({
  itemsPerPage,
  length,
  handlePagination,
}) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / itemsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button
          onClick={() => {
            handlePagination(pageNumber);
          }}
          className="pagination-button"
          key={pageNumber}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};
