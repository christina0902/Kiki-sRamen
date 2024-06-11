import { useEffect, useState } from "react";
import { getUserProfile } from "../../managers/userProfileManager";
import "./cart.css";
import { MenuItem } from "./MenuItem";
import { useNavigate } from "react-router-dom";

export const Cart = ({ loggedInUser }) => {
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile(loggedInUser?.id).then((userProfile) => {
      setOrder(userProfile.orders[0]);
    });
  }, [loggedInUser]);

  return (
    <>
      {Object.keys(order).length != 0 ? (
        <div className="cart-container" style={{ maxWidth: "750px" }}>
          {order?.menuItemOrders?.map((m) => {
            return <MenuItem key={m.id} m={m} />;
          })}

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
