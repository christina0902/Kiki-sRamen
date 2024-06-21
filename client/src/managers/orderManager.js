const _apiUrl = "/api/order";

export const startNewOrder = (order) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  }).then((res) => res.json());
};

export const placeOrder = (order) => {
  return fetch(_apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  }).then((res) => res.json());
};

export const getOrderById = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const removeOrder = (id) => {
  return fetch(_apiUrl + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
