import { useState, useEffect } from "react";
import {
  getUserProfile,
  getUserProfileWithOrders,
} from "../../managers/userProfileManager";
import {
  getOrderById,
  removeOrder,
  startNewOrder,
} from "../../managers/orderManager";
import { newMenuItemOrder } from "../../managers/menuItemOrderManager";
import { useNavigate } from "react-router-dom";
import "./account.css";
import { CartPagination } from "../cart/CartPagination";

export const PastOrders = ({ loggedInUser }) => {
  const [pastOrders, setPastOrders] = useState([]);
  const [existingOrder, setExistingOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile(parseInt(loggedInUser.id)).then((up) => {
      setExistingOrder(up.orders[0]);

      getUserProfileWithOrders(parseInt(loggedInUser.id)).then(
        (userProfile) => {
          setPastOrders(userProfile.orders);
        }
      );
    });
  }, [loggedInUser]);

  const handleOrderAgain = (orderId) => {
    removeOrder(parseInt(existingOrder?.id));
    // Step 1: Start a new order
    const order = {
      userProfileId: parseInt(loggedInUser.id),
    };

    startNewOrder(order).then((createdOrder) => {
      // Step 2: Retrieve the order by its ID
      getOrderById(parseInt(orderId)).then((orderToRepeat) => {
        // Step 3: Iterate through each menuItemOrder in the original order
        orderToRepeat?.menuItemOrders?.forEach((menuItemOrder) => {
          // Step 4: Create a new menuItemOrder for each item in the original order
          const newMenuItemOrderData = {
            orderId: parseInt(createdOrder.id),
            menuItemId: parseInt(menuItemOrder.menuItemId),
            quantity: menuItemOrder.quantity, // Adjust this based on your API structure
          };

          // Step 5: Make a POST request to add the menuItemOrder to the new order
          newMenuItemOrder(newMenuItemOrderData).then(() => {
            // Optionally handle success or error
          });
        });

        // Step 6: Navigate to the cart or another relevant page after all items are added
        navigate("/cart");
      });
    });
  };
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * ordersPerPage;
  const indexOfFirstItem = indexOfLastItem - ordersPerPage;
  const currentItems = pastOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="container-account">
        <div className="account-pagination">
          <CartPagination
            itemsPerPage={ordersPerPage}
            handlePagination={handlePagination}
            length={pastOrders.length}
            currentPage={currentPage}
          />
        </div>
        {pastOrders.length === 0 ? (
          <div className="no-orders-container">
            <h1 className="empty-cart-heading">No Orders?</h1>
            <button
              className="primary-btn past-orders-btn"
              onClick={() => {
                navigate("/menu");
              }}
            >
              Order Now
            </button>
          </div>
        ) : (
          currentItems.map((po, index) => (
            <div className="past-orders" key={index}>
              <div className="past-order-container">
                <div className="past-order-list">
                  <ul className="ul">
                    {po?.menuItemOrders?.map((mi, idx) => (
                      <li className="past-order-list-item" key={idx}>
                        {mi.menuItem.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <div className="past-order-list-btn">
                  <button
                    value={po.id}
                    className="past-orders-btn primary-btn"
                    onClick={(e) => {
                      handleOrderAgain(e.target.value);
                    }}
                  >
                    Order Again
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
