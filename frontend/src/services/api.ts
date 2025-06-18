import axios from "axios";

export interface Task {
	_id: string;
	title: string;
	description?: string;
	status: "todo" | "in-progress" | "done";
	createdAt?: string;
	updatedAt?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const task = {
	getAll: () => axios.get<Task[]>(`${API_URL}/tasks`),
	getById: (id: string) => axios.get<Task>(`${API_URL}/tasks/${id}`),
	create: (data: Omit<Task, "_id" | "createdAt" | "updatedAt">) =>
		axios.post<Task>(`${API_URL}/tasks`, data),
	update: (id: string, data: Partial<Task>) =>
		axios.patch<Task>(`${API_URL}/tasks/${id}`, data),
	delete: (id: string) => axios.delete(`${API_URL}/tasks/${id}`),
	initialTaskForm: {
		title: "",
		description: "",
		status: "todo",
	} satisfies Partial<Task>,
	statuses: (<const>[
		{ label: "À faire", value: "todo" },
		{ label: "En cours", value: "in-progress" },
		{ label: "Terminée", value: "done" },
	]) satisfies { label: string; value: Task["status"] }[],
};
