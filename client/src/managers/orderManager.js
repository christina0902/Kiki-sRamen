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