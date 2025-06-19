<script setup lang="ts">
import { onMounted, ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import TaskForm from "@/components/forms/TaskForm.vue";
import StatusCard from "@/components/cards/StatusCard.vue";
import { useTaskStore } from "@/stores/task";
import { taskService, type Task, type UpdateTaskForm } from "@/services/api";
import { useToaster } from "@/services/toast";

const toast = useToaster();

const taskStore = useTaskStore();
const isEditDialogOpen = ref(false);
const taskToEdit = ref<Task | null>(null);

const openEditDialog = (task: Task) => {
	taskToEdit.value = task;
	isEditDialogOpen.value = true;
};

const handleUpdateTask = async (data: UpdateTaskForm) => {
	if (!taskToEdit.value) return;
	await taskStore.updateTask(taskToEdit.value._id, data);
	if (taskStore.error) {
		toast.error(taskStore.error);
	} else {
		isEditDialogOpen.value = false;
		toast.success("Tâche mise à jour avec succès.");
	}
};

const removeTask = async (taskId: string) => {
	await taskStore.removeTask(taskId);
	if (taskStore.error) {
		toast.error(taskStore.error);
	} else {
		toast.success("Tâche supprimée avec succès.");
	}
};

onMounted(() => {
	taskStore.fetchTasks();
});

const getTasksByStatus = (status: string) =>
	taskStore.tasks.filter(t => t.status === status);
</script>

<template>
	<div class="task-list">
		<div v-if="taskStore.isLoading" class="loading-box">
			<ProgressSpinner />
		</div>

		<div v-else-if="taskStore.error" class="error-box">
			<i class="pi pi-times" style="font-size: 3rem; color: red"></i>
			<p>{{ taskStore.error }}</p>
			<Button
				label="Réessayer"
				severity="secondary"
				@click="taskStore.fetchTasks()"
			/>
		</div>

		<div v-else class="status-list">
			<StatusCard
				v-for="s in taskService.statuses"
				:key="s.value"
				:status="s"
				:tasks="getTasksByStatus(s.value)"
				@edit="openEditDialog"
				@remove="removeTask"
			/>
		</div>
	</div>

	<Dialog
		v-model:visible="isEditDialogOpen"
		modal
		header="Modifier la tâche"
		style="width: 30rem"
	>
		<TaskForm
			v-if="taskToEdit"
			:initialValues="{
				title: taskToEdit.title,
				description: taskToEdit.description,
				status: taskToEdit.status,
			}"
			mode="edit"
			:loading="taskStore.isLoading"
			@submit="handleUpdateTask"
			@cancel="isEditDialogOpen = false"
		/>
	</Dialog>
</template>

<style scoped>
.loading-box,
.error-box {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	width: 100%;
	color: white;
}

.error-box {
	flex-direction: column;
	gap: 0.5rem;
	font-size: x-large;
}

.task-list {
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	padding: 3rem 0;
}

.status-list {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	width: 100%;
}

@media (min-width: 1580px) {
	.task-list {
		margin: 0;
	}
}
</style>
