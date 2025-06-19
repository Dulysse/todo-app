<script setup lang="ts">
import { ref, watch, computed } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import {
	taskService,
	type UpdateTaskForm,
	type CreateTaskForm,
} from "@/services/api";

const props = defineProps<
	| {
			initialValues?: never;
			mode: "create";
			loading: boolean;
	  }
	| {
			initialValues?: UpdateTaskForm;
			mode: "edit";
			loading: boolean;
	  }
>();

const emit = defineEmits<{
	submit: [form: CreateTaskForm];
	cancel: [];
}>();

const form = ref<CreateTaskForm>({ ...taskService.initialTaskForm });

watch(
	() => props.initialValues,
	() => {
		form.value = {
			...taskService.initialTaskForm,
			...props.initialValues,
		};
	},
	{ immediate: true },
);

const isEditMode = computed(() => props.mode === "edit");

const handleSubmit = () => {
	emit("submit", form.value);
};
</script>

<template>
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
		<label for="description"
			>Description <span class="optional">(facultatif)</span></label
		>
		<Textarea
			id="description"
			v-model="form.description"
			rows="3"
			class="w-full"
			placeholder="Entrez une description"
		/>
	</div>

	<div class="form-field">
		<label for="status">Statut</label>
		<Dropdown
			id="status"
			v-model="form.status"
			:options="taskService.statuses"
			option-label="label"
			option-value="value"
			placeholder="Sélectionnez un statut"
			class="w-full"
		/>
	</div>

	<div class="form-actions">
		<Button
			label="Annuler"
			icon="pi pi-times"
			severity="warn"
			text
			@click="emit('cancel')"
			:disabled="loading"
		/>
		<Button
			:label="isEditMode ? 'Mettre à jour' : 'Créer'"
			icon="pi pi-check"
			:disabled="!form.title.trim()"
			text
			@click="handleSubmit"
			:loading="loading"
		/>
	</div>
</template>

<style scoped>
.form-field {
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
}

.form-actions {
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	margin-top: 1rem;
}

.optional {
	font-size: 0.85rem;
	color: #888;
	font-style: italic;
	margin-left: 0.3rem;
}
</style>
