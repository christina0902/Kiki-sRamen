import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMenuById } from "../../managers/menuManager";

export const MenuItemDetails = () => {
  const [menuItem, setMenuItem] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMenuById(id).then(setMenuItem);
  }, [id]);

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
              navigate("/cart");
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
