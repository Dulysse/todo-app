import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../Header.vue";
import { faker } from "@faker-js/faker";

describe("Header", () => {
	it("renders properly", () => {
		const title = faker.lorem.sentence();
		const description = faker.lorem.paragraph();

		const wrapper = mount(Header, {
			props: { title, description },
		});

		expect(wrapper.text()).toContain(title);
	});
});
