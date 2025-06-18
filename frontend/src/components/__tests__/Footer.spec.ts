import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Footer from "../Footer.vue";

describe("Footer", () => {
	it("renders properly", () => {
		setActivePinia(createPinia());

		const wrapper = mount(Footer, {
			global: {
				plugins: [createPinia()],
			},
			props: { author: "Ulysse Dupont", linkedIn: "" },
		});

		expect(wrapper.text()).toContain("Ulysse Dupont");
	});
});
