import { defineStore } from "pinia";
import { taskService, type CreateTaskForm, type Task } from "@/services/api";
import { AxiosError } from "axios";

const NETWORK_ERROR = "Erreur de communication avec l'API.";
const UNKNOWN_ERROR = "Une erreur inconnue est survenue.";
const CREATE_TASK_ERROR = "Impossible de créer la tâche.";
const UPDATE_TASK_ERROR = "Impossible de mettre à jour la tâche.";
const DELETE_TASK_ERROR = "Impossible de supprimer la tâche.";

export const useTaskStore = defineStore("task", {
	state: () => ({
		tasks: [] as Task[],
		isLoading: false,
		error: null as string | null,
	}),

	actions: {
		async fetchTasks() {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await taskService.getAll();
				this.tasks = res.data;
			} catch (err) {
				if (err instanceof AxiosError) {
					this.error = err.response?.data ?? NETWORK_ERROR;
				} else {
					this.error = UNKNOWN_ERROR;
				}
			} finally {
				this.isLoading = false;
			}
		},

		async addTask(newTask: CreateTaskForm) {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await taskService.create(newTask);
				this.tasks.push(res.data);
			} catch (err) {
				if (err instanceof AxiosError) {
					this.error = err.response?.data ?? NETWORK_ERROR;
				} else {
					this.error = CREATE_TASK_ERROR;
				}
			} finally {
				this.isLoading = false;
			}
		},

		async updateTask(id: string, data: Partial<Task>) {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await taskService.update(id, data);
				const index = this.tasks.findIndex(t => t._id === id);
				if (index !== -1) this.tasks[index] = res.data;
			} catch (err) {
				if (err instanceof AxiosError) {
					this.error = err.response?.data ?? NETWORK_ERROR;
				} else {
					this.error = UPDATE_TASK_ERROR;
				}
			} finally {
				this.isLoading = false;
			}
		},

		async removeTask(id: string) {
			this.isLoading = true;
			this.error = null;
			try {
				await taskService.delete(id);
				this.tasks = this.tasks.filter(t => t._id !== id);
			} catch (err) {
				if (err instanceof AxiosError) {
					this.error = err.response?.data ?? NETWORK_ERROR;
				} else {
					this.error = DELETE_TASK_ERROR;
				}
			} finally {
				this.isLoading = false;
			}
		},

		clearError() {
			this.error = null;
		},
	},
});
