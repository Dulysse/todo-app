import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { taskService } from "../../../services/api";
import TaskCard from "../../cards/TaskCard.vue";
import { faker } from "@faker-js/faker";

describe("TaskCard", () => {
	it("renders properly", () => {
		const task = {
			title: faker.lorem.sentence(),
			description: faker.lorem.paragraph(),
			status: faker.helpers.arrayElement(
				taskService.statuses.map(s => s.value),
			),
			_id: faker.database.mongodbObjectId(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const wrapper = mount(TaskCard, {
			props: {
				task,
			},
		});

		expect(wrapper.text()).toContain(task.title);
	});
});
