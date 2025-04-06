import api from "./confing/apiConfig";

export const register = async (data: any) => {

  const response = await api.post("/auth/register", data);
  return response.data;

};

export const login = async ({ email, password }: { email: string; password: string }) => {
  // console.log(email, password)
  const response = await api.post("/auth/login", { email, password });
  // Save the token to local storage
  console.log("loging", response.data)
  return response.data;
};
export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};