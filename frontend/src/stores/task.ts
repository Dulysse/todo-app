import { defineStore } from "pinia";
import { task as taskApi, type Task } from "@/services/api";
import { AxiosError } from "axios";

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
				const res = await taskApi.getAll();
				this.tasks = res.data;
			} catch (err) {
				if (err instanceof AxiosError) {
					this.error =
						err.response?.data ?? "Erreur de communication avec l'API.";
				} else {
					this.error = "Une erreur inconnue est survenue.";
				}
			} finally {
				this.isLoading = false;
			}
		},

		async addTask(newTask: Omit<Task, "_id" | "createdAt" | "updatedAt">) {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await taskApi.create(newTask);
				this.tasks.push(res.data);
			} catch (err) {
				if (err instanceof AxiosError) {
					this.error =
						err.response?.data ?? "Erreur de communication avec l'API.";
				} else {
					this.error = "Impossible de créer la tâche.";
				}
			} finally {
				this.isLoading = false;
			}
		},

		async updateTask(id: string, data: Partial<Task>) {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await taskApi.update(id, data);
				const index = this.tasks.findIndex(t => t._id === id);
				if (index !== -1) this.tasks[index] = res.data;
			} catch (err) {
				if (err instanceof AxiosError) {
					this.error =
						err.response?.data ?? "Erreur de communication avec l'API.";
				} else {
					this.error = "Impossible de mettre à jour la tâche.";
				}
			} finally {
				this.isLoading = false;
			}
		},

		async removeTask(id: string) {
			this.isLoading = true;
			this.error = null;
			try {
				await taskApi.delete(id);
				this.tasks = this.tasks.filter(t => t._id !== id);
			} catch (err) {
				if (err instanceof AxiosError) {
					this.error =
						err.response?.data ?? "Erreur de communication avec l'API.";
				} else {
					this.error = "Impossible de supprimer la tâche.";
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
