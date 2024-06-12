const _apiUrl = "/api/menuItemOrder";

export const newMenuItemOrder = (menuItemOrder) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItemOrder),
  }).then((res) => res.json());
};

export const deleteMenuItemOrder = (menuItemOrder) => {
  return fetch(_apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItemOrder),
  });
};

export const updateMenuItemOrder = (menuItemOrder) => {
  return fetch(_apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItemOrder),
  }).then((res) => res.json());
};
