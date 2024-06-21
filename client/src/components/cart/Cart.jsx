import { useEffect, useState } from "react";
import { getUserProfile } from "../../managers/userProfileManager";
import "./cart.css";
import { MenuItem } from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { CartPagination } from "./CartPagination";

export const Cart = ({ loggedInUser }) => {
  const [order, setOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [menuItemsPerPage, setMenuItemsPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      refreshOrder();
    }
  }, [loggedInUser]);

  const refreshOrder = () => {
    getUserProfile(loggedInUser?.id).then((userProfile) => {
      const updatedOrder = userProfile.orders[0] || {};
      setOrder(updatedOrder);
      const totalPages = Math.ceil(
        (updatedOrder.menuItemOrders?.length || 0) / menuItemsPerPage
      );

      // Ensure current page is valid
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }
    });
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * menuItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - menuItemsPerPage;
  const currentItems = order?.menuItemOrders?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      {Object.keys(order).length != 0 &&
      order?.menuItemOrders?.length != 0 &&
      loggedInUser ? (
        <div className="cart-container" style={{ maxWidth: "750px" }}>
          <div className="cart-flex-container">
            <div className="cart-content">
              <CartPagination
                itemsPerPage={menuItemsPerPage}
                handlePagination={handlePagination}
                length={order?.menuItemOrders?.length}
                currentPage={currentPage}
              />
              {currentItems?.map((m) => {
                return <MenuItem key={m.id} m={m} refresh={refreshOrder} />;
              })}
            </div>
            <div className="cart-controls">
              <div className="cart-subtotal">Subtotal : ${order.total}</div>
              <div className="cart-btns">
                <button
                  className="cart-btn primary-btn continue-ordering-btn"
                  onClick={() => {
                    navigate("/menu");
                  }}
                >
                  Continue Ordering
                </button>
                <button
                  className="cart-btn primary-btn checkout-btn"
                  onClick={() => {
                    navigate("/checkout");
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-container" style={{ maxWidth: "750px" }}>
          <div className="empty-cart-container">
            <h1 className="empty-cart-heading">Empty Cart...</h1>
            <button
              className="cart-btn primary-btn continue-ordering-btn"
              onClick={() => {
                navigate("/menu");
              }}
            >
              Continue Ordering
            </button>
          </div>
        </div>
      )}
    </>
  );
};
