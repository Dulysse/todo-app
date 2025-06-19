<script setup lang="ts">
import Card from "primevue/card";
import Divider from "primevue/divider";
import TaskCard from "./TaskCard.vue";
import type { Status, Task } from "@/services/api";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { ref } from "vue";

defineProps<{
	status: Status;
	tasks: Task[];
}>();

const isConfirmDialogOpen = ref(false);
const taskIdToRemove = ref<string | null>(null);

const confirmRemove = (id: string) => {
	taskIdToRemove.value = id;
	isConfirmDialogOpen.value = true;
};

const handleConfirmDelete = () => {
	if (taskIdToRemove.value) {
		emit("remove", taskIdToRemove.value);
	}
	isConfirmDialogOpen.value = false;
	taskIdToRemove.value = null;
};

const emit = defineEmits(["edit", "remove"]);
</script>

<template>
	<Card
		class="status-card"
		:style="{
			border: `2px dashed ${status.color}`,
			'--scrollbar-thumb-color': status.color,
		}"
	>
		<template #title>
			<h3 class="text-center">{{ status.label }}</h3>
		</template>

		<template #content>
			<Divider />
			<div class="task-scroll-container">
				<div v-if="tasks.length === 0" class="empty-msg">
					Aucune tâche {{ status.label.toLowerCase() }}.
				</div>
				<div v-else>
					<TaskCard
						v-for="t in tasks"
						:key="t._id"
						:task="t"
						@edit="task => $emit('edit', task)"
						@remove="confirmRemove"
					/>
				</div>
			</div>
		</template>
	</Card>
	<Dialog
		v-model:visible="isConfirmDialogOpen"
		modal
		header="Confirmation"
		style="width: 25rem"
	>
		<p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
		<template #footer>
			<Button
				label="Annuler"
				severity="secondary"
				icon="pi pi-times"
				@click="isConfirmDialogOpen = false"
				text
			/>
			<Button
				label="Supprimer"
				icon="pi pi-trash"
				severity="danger"
				@click="handleConfirmDelete"
			/>
		</template>
	</Dialog>
</template>

<style scoped>
.status-card {
	width: 20rem;
	height: 21rem;
	background-color: #1e1e1e;
	overflow: hidden;
	overflow-y: scroll;
}

.empty-msg {
	color: #888;
	font-style: italic;
	text-align: center;
	padding-top: 5.5rem;
}

.status-card::-webkit-scrollbar {
	width: 5px;
}
.status-card::-webkit-scrollbar-thumb {
	background-color: var(--scrollbar-thumb-color);
	border-radius: 4px;
}
</style>
