import { Task } from "@/types/task";
import { axiosInstance } from "@/utils/axiosInstance";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await axiosInstance.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance.post("/tasks", task);
  return response.data;
};

export const updateTask = async (
  id: string,
  task: Partial<Task>
): Promise<Task> => {
  const response = await axiosInstance.put(`/tasks/${id}`, task);
  return response.data;
};

export const updateTaskStatus = async (
  id: string,
  status: "pending" | "completed"
): Promise<Task> => {
  const response = await axiosInstance.patch(`/tasks/${id}/status`, { status });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/${id}`);
};
