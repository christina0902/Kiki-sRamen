const _apiUrl = "/api/menu";
export const getMenu = async () => {
  return await fetch(_apiUrl).then((res) => res.json());
};
