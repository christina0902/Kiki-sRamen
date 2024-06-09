const _apiUrl = "/api/menu";

export const getMenu = async () => {
  return await fetch(_apiUrl).then((res) => res.json());
};

export const getMenuById = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};
