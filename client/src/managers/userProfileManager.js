const _apiUrl = "/api/userProfile";

export const getUserProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const getUserProfileWithOrders = (id) => {
  return fetch(_apiUrl + `/${id}/orders`).then((res) => res.json());
};

export const updateUserProfile = (userProfile) => {
  return fetch(`${_apiUrl}/${userProfile.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });
};
