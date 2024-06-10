import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMenuById } from "../../managers/menuManager";
import { startNewOrder } from "../../managers/orderManager";
import { newMenuItemOrder } from "../../managers/menuItemOrderManager";
import { getUserProfile } from "../../managers/userProfileManager";

export const MenuItemDetails = ({ loggedInUser }) => {
  const [menuItem, setMenuItem] = useState({});
  const [existingOrder, setExistingOrder] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    {
      loggedInUser
        ? getUserProfile(parseInt(loggedInUser.id)).then((up) => {
            setUserProfile(up);
            if (up?.orders?.length == 0) {
              setExistingOrder(false);
            } else {
              setExistingOrder(true);
            }
            console.log(up);
          })
        : setExistingOrder(false);
    }
  }, [loggedInUser?.id]);

  useEffect(() => {
    getMenuById(id).then(setMenuItem);
  }, [id]);

  const addToOrder = () => {
    const menuItemOrder = {
      orderId: userProfile.orders[0].id,
      menuItemId: id,
    };
    newMenuItemOrder(menuItemOrder).then(() => {
      navigate("/cart");
    });
  };

  const handleNewOrder = () => {
    if (loggedInUser) {
      const order = {
        userProfileId: parseInt(loggedInUser.id),
      };
      startNewOrder(order).then((createdOrder) => {
        const menuItemOrder = {
          orderId: parseInt(createdOrder.id),
          menuItemId: id,
        };
        newMenuItemOrder(menuItemOrder).then(() => {
          navigate("/cart");
        });
      });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="menu-item-details">
        <Link className="back-btn-link" to="/menu">
          <i className="fa fa-long-arrow-left back-btn"></i>
        </Link>
        <div className="menu-details-img-container">
          <img
            className="menu-details-img"
            src={menuItem.imageLocation}
            alt={menuItem.name}
          />
        </div>
        <div className="menu-item-info">
          <div className="menu-item-price">${menuItem.price}</div>
          <div className="menu-item-description">{menuItem.description}</div>
        </div>
        <div className="add-cart-btn-container">
          <button
            onClick={() => {
              {
                existingOrder ? addToOrder() : handleNewOrder();
              }
            }}
            className="add-cart-btn primary-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};
