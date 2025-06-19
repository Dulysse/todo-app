import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import StatusCard from "../../cards/StatusCard.vue";
import { faker } from "@faker-js/faker";
import { Status, taskService } from "../../../services/api";

describe("StatusCard", () => {
	it("renders properly", () => {
		const status = {
			color: faker.color.rgb(),
			label: faker.lorem.word(),
			value: faker.helpers.arrayElement(taskService.statuses.map(s => s.value)),
		} satisfies Status;

		const wrapper = mount(StatusCard, {
			props: { status, tasks: [] },
		});

		expect(wrapper.text()).toContain(status.label);
	});
});
