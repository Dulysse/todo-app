<script setup lang="ts">
import { type Task } from "@/services/api";
import Card from "primevue/card";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { getRelativeTime } from "@/services/date";

defineProps<{
	task: Task;
}>();

defineEmits(["edit", "remove"]);
</script>

<template>
	<Card class="task-card">
		<template #title>
			<h3 class="truncate-text">{{ task.title }}</h3>
		</template>

		<template #content>
			<p v-if="task.description" class="truncate-text">
				{{ task.description }}
			</p>
			<Tag
				class="tag truncate-text"
				severity="info"
				:value="
					task.createdAt === task.updatedAt
						? 'Créée ' + getRelativeTime(task.updatedAt ?? '')
						: 'Modifiée ' + getRelativeTime(task.updatedAt ?? '')
				"
			/>
		</template>

		<template #footer>
			<Button
				v-tooltip.bottom="'Modifier la tâche'"
				icon="pi pi-pencil"
				text
				@click="$emit('edit', task)"
			/>
			<Button
				v-tooltip.bottom="'Supprimer la tâche'"
				icon="pi pi-trash"
				severity="danger"
				text
				@click="$emit('remove', task._id)"
			/>
		</template>
	</Card>
</template>

<style scoped>
.task-card {
	width: 17rem;
	margin: 1rem 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.tag {
	margin-top: 0.5rem;
}
.truncate-text {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
