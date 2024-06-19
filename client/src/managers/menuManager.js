const _apiUrl = "/api/menu";

export const getMenu = async (categoryId) => {
  let url = _apiUrl;
  if (categoryId) {
    url += `?categoryId=${categoryId}`;
  }
  return await fetch(url).then((res) => res.json());
};

export const getMenuById = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};
