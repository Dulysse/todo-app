<script setup lang="ts">
import { ref } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { useTaskStore } from "@/stores/task";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { task } from "@/services/api";

defineProps<{
	title: string;
	description: string;
}>();

const loading = useLoadingStore();
const taskStore = useTaskStore();
const isDialogOpen = ref(false);

const form = ref({ ...task.initialTaskForm });

const createTask = async () => {
	try {
		loading.start();
		await taskStore.addTask(form.value);
		isDialogOpen.value = false;
		form.value = { ...task.initialTaskForm };
	} catch (_) {
	} finally {
		loading.stop();
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
					:disabled="loading.isLoading"
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
		:closable="!loading.isLoading"
	>
		<div class="form-field">
			<label for="title">Titre</label>
			<InputText
				id="title"
				v-model="form.title"
				class="w-full"
				placeholder="Entrez un titre de tâche"
			/>
		</div>

		<div class="form-field">
			<label for="description">
				Description <span class="optional">(facultatif)</span>
			</label>
			<Textarea
				id="description"
				v-model="form.description"
				rows="3"
				class="w-full"
				placeholder="Entrez une description pour cette tâche"
			/>
		</div>

		<div class="form-field">
			<label for="status">Statut</label>
			<Dropdown
				id="status"
				v-model="form.status"
				:options="task.statuses"
				option-label="label"
				option-value="value"
				placeholder="Sélectionnez un statut"
				class="w-full"
			/>
		</div>

		<template #footer>
			<Button
				label="Annuler"
				icon="pi pi-times"
				severity="warn"
				text
				@click="isDialogOpen = false"
				:disabled="loading.isLoading"
			/>
			<Button
				label="Créer"
				icon="pi pi-check"
				text
				@click="createTask"
				:loading="loading.isLoading"
			/>
		</template>
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

@media (min-width: 1200px) {
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
