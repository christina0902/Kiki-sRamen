export const MenuItem = ({ m }) => {
  const quantityDropDownOption = [];
  for (let i = 1; i <= 20; i++) {
    quantityDropDownOption.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

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
              defaultValue={m.quantity}
              name="quantity"
            >
              {quantityDropDownOption}
            </select>
          </div>
          <button className="cart-delete-btn">delete</button>
        </div>
      </div>
    </>
  );
};
