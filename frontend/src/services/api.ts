import axios from "axios";

export interface Task {
	/**
	 * Unique identifier for the task
	 */
	_id: string;
	/**
	 * Title of the task
	 */
	title: string;
	/**
	 * Description of the task
	 */
	description?: string;
	/**
	 * Status of the task
	 * Can be "todo", "in-progress", or "done"
	 */
	status: "todo" | "in-progress" | "done";
	/**
	 * Creation date of the task
	 */
	createdAt?: string;
	/**
	 * Last update date of the task
	 */
	updatedAt?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export type CreateTaskForm = Omit<Task, "_id" | "createdAt" | "updatedAt">;
export type UpdateTaskForm = Partial<CreateTaskForm>;
export type Status = {
	/**
	 * Label for the status
	 */
	label: string;
	/**
	 * Color associated with the status
	 */
	color: string;
	/**
	 * Value of the status
	 */
	value: Task["status"];
};

export const taskService = {
	getAll: () => axios.get<Task[]>(`${API_URL}/tasks`),
	getById: (id: string) => axios.get<Task>(`${API_URL}/tasks/${id}`),
	create: (data: CreateTaskForm) => axios.post<Task>(`${API_URL}/tasks`, data),
	update: (id: string, data: UpdateTaskForm) =>
		axios.patch<Task>(`${API_URL}/tasks/${id}`, data),
	delete: (id: string) => axios.delete(`${API_URL}/tasks/${id}`),
	initialTaskForm: {
		title: "",
		description: "",
		status: "todo",
	} satisfies UpdateTaskForm,
	statuses: (<const>[
		{ label: "À faire", color: "rgba(0, 123, 255, 0.4)", value: "todo" },
		{
			label: "En cours",
			color: "rgba(255, 193, 7, 0.4)",
			value: "in-progress",
		},
		{ label: "Terminée", color: "rgba(40, 167, 69, 0.4)", value: "done" },
	]) satisfies Status[],
};
