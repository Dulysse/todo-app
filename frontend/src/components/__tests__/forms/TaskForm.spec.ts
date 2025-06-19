import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TaskForm from "../../forms/TaskForm.vue";

describe("TaskForm", () => {
	it("renders properly", () => {
		const wrapper = mount(TaskForm, {
			props: { mode: "create", loading: false },
		});

		const buttons = wrapper.findAll(".p-button");
		const lastButtonText = buttons[buttons.length - 1].text();
		expect(lastButtonText).toContain("Créer");
	});
});
