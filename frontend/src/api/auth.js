export const loginUser = async (api, { email, password }) => {
    const response = await api.post("/auth/login", { email, password });
  return response.data; 
};
export const registerUser = async (api, { email, password }) => {
    const response = await api.post("/auth/register", { email, password });
  return response.data; 
}
