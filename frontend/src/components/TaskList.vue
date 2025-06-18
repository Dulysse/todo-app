<script setup lang="ts">
import { onMounted } from "vue";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import Divider from "primevue/divider";
import { useTaskStore } from "@/stores/task";
import { task, type Task } from "@/services/api";
import { getRelativeTime } from "@/services/date";

const taskStore = useTaskStore();

onMounted(() => {
	taskStore.fetchTasks();
});

const getTasksByStatus = (status: string) =>
	taskStore.tasks.filter(t => t.status === status);

const statuses = task.statuses;

const updateTaskStatus = async (taskId: string, newStatus: Task["status"]) => {
	await taskStore.updateTask(taskId, { status: newStatus });
};

const removeTask = async (taskId: string) => {
	await taskStore.removeTask(taskId);
};
</script>

<template>
	<div class="task-board">
		<div v-if="taskStore.isLoading" class="task-board__loading">
			<ProgressSpinner />
		</div>

		<div v-else-if="taskStore.error" class="task-board__error">
			<div class="error-box">
				<i class="error-icon pi pi-times"></i>
				<p class="error-text">{{ taskStore.error }}</p>
			</div>
		</div>

		<div v-else class="task-columns">
			<div
				v-for="status in statuses"
				:key="status.value"
				class="task-column"
				:class="{ empty: getTasksByStatus(status.value).length === 0 }"
			>
				<h3 class="task-column__title" :class="status.value">
					{{ status.label }}
				</h3>
				<Divider />

				<div
					v-if="getTasksByStatus(status.value).length === 0"
					class="empty-msg"
				>
					Aucune tâche {{ status.label.toLocaleLowerCase() }}.
				</div>

				<Card
					v-for="t in getTasksByStatus(status.value)"
					:key="t._id"
					class="task-card"
				>
					<template #title>
						<h3 class="truncate-text">{{ t.title }}</h3>
					</template>
					<template #content>
						<div class="task-actions">
							<Button
								@click="updateTaskStatus(t._id, 'done')"
								v-if="t.status !== 'done'"
								icon="pi pi-check"
								severity="success"
								v-tooltip="'Enter your username'"
								variant="text"
								rounded
								aria-label="Done"
							/>
						</div>
						<p v-if="t.description" class="truncate-text">
							{{ t.description }}
						</p>
					</template>
					<template #footer>
						<Tag
							severity="info"
							v-if="t.createdAt === t.updatedAt"
							:value="'Créée ' + getRelativeTime(t.updatedAt ?? '')"
						></Tag>
						<Tag
							severity="info"
							v-else
							:value="'Modifiée ' + getRelativeTime(t.updatedAt ?? '')"
						></Tag>
						<Button
							@click="removeTask(t._id)"
							icon="pi pi-trash"
							severity="danger"
							variant="text"
							rounded
							aria-label="Delete"
						/>
					</template>
				</Card>
			</div>
		</div>
	</div>
</template>

<style scoped>
.task-board {
	padding: 1rem 0;
	height: 100%;
	min-height: 30rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}

.task-board__loading,
.task-board__error {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 200px;
	width: 100%;
}

.truncate-text {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal;
	word-break: break-word;
}

.error-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #131313;
	border-radius: 8px;
	padding: 1.5rem 2rem;
}

.error-icon {
	font-size: 2rem;
	color: #ff1a1a;
	margin-bottom: 0.5rem;
}

.error-text {
	color: red;
	font-weight: bold;
	text-align: center;
}

.task-columns {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: #131313;
	min-height: 30vh;
	padding: 2rem 0;
	border-radius: 0.5rem;
	justify-content: center;
	align-items: center;
	width: 100%;
}

@media (min-width: 768px) {
	.task-columns {
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		height: 70vh;
	}
	.task-board {
		margin-top: 0;
	}
}

.task-column {
	flex: 1 1 0;
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	min-height: 10rem;
	position: relative;
	max-height: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow-y: auto;
}

.task-column.empty .task-column__title {
	align-self: flex-start;
}

.task-column__title {
	text-align: center;
	margin-bottom: 0.5rem;
	font-size: 1.25rem;
	width: 100%;
}

.task-column__title.todo {
	color: #e67e22;
}

.task-column__title.progress {
	color: #2980b9;
}

.task-column__title.done {
	color: #27ae60;
}

.task-card {
	margin-bottom: 1rem;
	width: 100%;
	max-width: 320px;
}

.empty-msg {
	color: #888;
	font-style: italic;
	padding: 1rem;
	text-align: center;
	width: 100%;
}
</style>
