import { Link } from "react-router-dom";
import "./menu.css";

export const MenuItem = ({ menuItem }) => {
  return (
    <div className="menu-item" key={menuItem.id}>
      <div className="menu-item-img-container">
        <img
          className="menu-item-img"
          src={menuItem.imageLocation}
          alt={menuItem.name}
        />
      </div>
      <Link className="menu-item-link" to={`/menu/${menuItem.id}`}>
        <h1 className="menu-item-name">{menuItem.name}</h1>
      </Link>
    </div>
  );
};
