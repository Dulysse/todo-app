import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "../Footer.vue";
import { faker } from "@faker-js/faker";

describe("Footer", () => {
	it("renders properly", () => {
		const author = faker.person.fullName();
		const linkedIn = faker.internet.url();

		const wrapper = mount(Footer, {
			props: { author, linkedIn },
		});

		expect(wrapper.text()).toContain(author);
	});
});
