import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Header from "../Header.vue";

describe("Header", () => {
	it("renders properly", () => {
		const wrapper = mount(Header, {
			props: { title: "Hello Vitest", description: "test" },
		});
		expect(wrapper.text()).toContain("Hello Vitest");
	});
});
