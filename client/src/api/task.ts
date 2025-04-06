import api from "./confing/apiConfig";

export const getTasks = async () => {

  const response = await api.get("/tasks");
  return response.data;

};
export const createTask = async (data: any) => {

  const response = await api.post("/tasks/create", data);
  return response.data;
}
export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}