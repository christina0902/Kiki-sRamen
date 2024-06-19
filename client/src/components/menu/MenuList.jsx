import { useState, useEffect } from "react";
import { getMenu } from "../../managers/menuManager";
import "./menu.css";
import { MenuItem } from "./MenuItem";
import { CustomPagination } from "../Pagination";
import { getCategories } from "../../managers/categoryManager";

export const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuItemsPerPage, setMenuItemsPerPage] = useState(9);
  const [categorySearch, setCategorySearch] = useState("");

  useEffect(() => {
    getMenu(parseInt(categorySearch)).then(setMenu);
    getCategories().then(setCategories);
  }, [categorySearch]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategorySearch(selectedCategoryId);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * menuItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - menuItemsPerPage;
  const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="category-header">
        {categories.map((c) => (
          <button
            value={c.id}
            className={`category-btn ${
              categorySearch == c.id ? "selected-category" : ""
            }`}
            onClick={(e) => {
              handleCategoryChange(e);
            }}
            key={c.id}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="menu-container">
        <div className="menu-list-container">
          <div className="menu-list">
            {currentItems.map((menuItem) => {
              return <MenuItem key={menuItem.id} menuItem={menuItem} />;
            })}
          </div>
        </div>
        <div className="pagination-container">
          <div className="pagination">
            {menu.length > 9 ? (
              <CustomPagination
                itemsPerPage={menuItemsPerPage}
                handlePagination={handlePagination}
                length={menu.length}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
