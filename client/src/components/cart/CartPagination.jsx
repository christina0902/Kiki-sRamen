export const CartPagination = ({
  itemsPerPage,
  length,
  handlePagination,
  currentPage,
}) => {
  const totalPages = Math.ceil(length / itemsPerPage);

  return (
    <div className="cart-pagination">
      {/* Backward Arrow */}
      <i
        className={`fas fa-long-arrow-alt-left ${
          currentPage > 1 ? "visible" : ""
        }`}
        onClick={() => currentPage > 1 && handlePagination(currentPage - 1)}
      ></i>

      {/* Forward Arrow */}
      <i
        className={`fas fa-long-arrow-alt-right ${
          currentPage < totalPages ? "visible" : ""
        }`}
        onClick={() =>
          currentPage < totalPages && handlePagination(currentPage + 1)
        }
      ></i>
    </div>
  );
};
