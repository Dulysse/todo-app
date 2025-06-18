import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import TaskList from "../TaskList.vue";
import Tooltip from "primevue/tooltip";
import { vi } from "vitest";

vi.mock("@/stores/task", () => {
	return {
		useTaskStore: () => ({
			tasks: [],
			isLoading: false,
			error: null,
			fetchTasks: vi.fn().mockResolvedValue(undefined),
			updateTask: vi.fn(),
			removeTask: vi.fn(),
		}),
	};
});

describe("TaskList", () => {
	it("renders properly", () => {
		setActivePinia(createPinia());

		const wrapper = mount(TaskList, {
			global: {
				plugins: [createPinia()],
				directives: {
					tooltip: Tooltip,
				},
			},
		});

		expect(wrapper.findAll("div").length).toBeGreaterThan(0);
	});
});
