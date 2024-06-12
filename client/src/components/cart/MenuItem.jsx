import { useState } from "react";
import {
  deleteMenuItemOrder,
  updateMenuItemOrder,
} from "../../managers/menuItemOrderManager";

export const MenuItem = ({ m, refresh }) => {
  const [newQuantity, setNewQuantity] = useState(m.quantity);
  const quantityDropDownOption = [];
  for (let i = 1; i <= 20; i++) {
    quantityDropDownOption.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const handleRemoveFromCart = () => {
    const itemToRemove = {
      orderId: m.orderId,
      menuItemId: m.menuItemId,
    };
    deleteMenuItemOrder(itemToRemove).then(() => {
      refresh();
    });
  };

  const handleQuantityChange = (e) => {
    const itemToUpdate = {
      orderId: m.orderId,
      menuItemId: m.menuItemId,
      quantity: parseInt(e.target.value),
    };
    updateMenuItemOrder(itemToUpdate).then(() => {
      refresh();
    });
  };

  return (
    <>
      <div className="menu-item-container">
        <div className="menu-item-cart-img-container">
          <img
            className="menu-item-cart-img"
            src={m.menuItem.imageLocation}
            alt=""
          />
        </div>
        <div className="cart-menu-item-name">{m.menuItem.name}</div>

        <div className="cart-btn-flex">
          <div>
            <select
              className="quantity-dropdown"
              id="quantity"
              onChange={(e) => {
                handleQuantityChange(e);
              }}
              defaultValue={m.quantity}
              name="quantity"
            >
              {quantityDropDownOption}
            </select>
          </div>
          <button
            className="cart-delete-btn"
            onClick={() => {
              handleRemoveFromCart();
            }}
          >
            delete
          </button>
        </div>
      </div>
    </>
  );
};
