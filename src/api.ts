import { Task } from "./type";
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 30000, // 30 секунд
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/todos?_limit=9");
  return response.data;
};

export const addTask = async (task: Task) => {
  const response = await api.post('/todos', task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await api.put<Task>(`/todos/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
