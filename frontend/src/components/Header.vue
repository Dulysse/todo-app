<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "@/stores/task";
import TaskForm from "@/components/forms/TaskForm.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import type { CreateTaskForm } from "@/services/api";
import { useToaster } from "@/services/toast";

const toast = useToaster();

defineProps<{
	title: string;
	description: string;
}>();

const taskStore = useTaskStore();
const isDialogOpen = ref(false);

const createTask = async (data: CreateTaskForm) => {
	await taskStore.addTask(data);
	if (taskStore.error) {
		toast.error(taskStore.error);
	} else {
		isDialogOpen.value = false;
		toast.success("Tâche créée avec succès.");
	}
};
</script>

<template>
	<img alt="Todo logo" class="logo" src="/logo.png" width="125" height="125" />

	<div class="wrapper">
		<div class="greetings">
			<h1 class="blue">{{ title }}</h1>
			<div>
				<h3>{{ description }}</h3>
				<Button
					icon="pi pi-plus"
					:disabled="taskStore.isLoading"
					label="Ajouter une tâche"
					severity="secondary"
					variant="outlined"
					@click="isDialogOpen = true"
				/>
			</div>
		</div>
	</div>

	<Dialog
		v-model:visible="isDialogOpen"
		modal
		header="Créer une nouvelle tâche"
		style="width: 30rem"
		:closable="!taskStore.isLoading"
	>
		<TaskForm
			:mode="'create'"
			:loading="taskStore.isLoading"
			@submit="createTask"
			@cancel="isDialogOpen = false"
		/>
	</Dialog>
</template>

<style scoped>
h1 {
	font-weight: 500;
	font-size: 2.6rem;
	position: relative;
	top: -10px;
}

h3 {
	font-size: 1.2rem;
	color: #474747;
}

.greetings {
	text-align: center;
}

Button {
	margin-top: 1rem;
	text-align: left;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

.form-field {
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
}

.optional {
	font-size: 0.85rem;
	color: #888;
	font-style: italic;
	margin-left: 0.3rem;
}

@media (min-width: 1580px) {
	.greetings h1,
	.greetings h3 {
		text-align: left;
	}
	.greetings {
		text-align: left;
	}
	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
