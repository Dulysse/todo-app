import { useToast } from "primevue/usetoast";

export function useToaster(defaultLife = 2000) {
	const toast = useToast();

	const success = (detail: string, summary = "Succès") => {
		toast.add({
			severity: "success",
			summary,
			detail,
			life: defaultLife,
		});
	};

	const error = (detail: string, summary = "Erreur") => {
		toast.add({
			severity: "error",
			summary,
			detail,
			life: defaultLife,
		});
	};

	return { success, error };
}
