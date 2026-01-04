export const loginUser = async (api, { email, password }) => {
    const response = await api.post("/auth/login", { email, password });
  return response.data; 
};
export const registerUser = async (api, { email, password }) => {
    const response = await api.post("/auth/register", { email, password });
  return response.data; 
}
export const deleteUser = async (api) => {
  const response = await api.delete("/auth/deleteuser");
  return response.data;
}
export const editUserEmail = async (api,  newEmail ) => {
  const response = await api.put("/auth/changemailuser",  { email: newEmail } );
  return response.data;
}
export const editUserPassword = async (api,  newPassword ) => {
  const response = await api.put("/auth/editpassword",  { password: newPassword } );
  return response.data;
}