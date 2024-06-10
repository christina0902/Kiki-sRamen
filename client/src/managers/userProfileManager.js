const _apiUrl = "/api/userProfile";

export const getUserProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};
