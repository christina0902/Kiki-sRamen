import { useState, useEffect } from "react";
import { getMenu } from "../../managers/menuManager";
import "./menu.css";
import { MenuItem } from "./MenuItem";
import { CustomPagination } from "../Pagination";

export const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuItemsPerPage, setMenuItemsPerPage] = useState(9);

  useEffect(() => {
    getMenu().then(setMenu);
  }, []);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * menuItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - menuItemsPerPage;
  const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="menu-container">
        <div className="menu-list">
          {currentItems.map((menuItem) => {
            return <MenuItem key={menuItem.id} menuItem={menuItem} />;
          })}
        </div>
        <div className="pagination">
          <CustomPagination
            itemsPerPage={menuItemsPerPage}
            handlePagination={handlePagination}
            length={menu.length}
          />
        </div>
      </div>
    </>
  );
};
