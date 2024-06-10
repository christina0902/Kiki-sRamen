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
