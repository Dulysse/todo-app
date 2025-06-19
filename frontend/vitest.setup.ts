import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Tooltip from "primevue/tooltip";
import { createPinia, setActivePinia } from "pinia";
import { config } from '@vue/test-utils';
import { vi } from 'vitest';

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

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

setActivePinia(createPinia());

config.global.plugins = [PrimeVue, ToastService, createPinia()];
config.global.components = {
  Toast,
};
config.global.directives = {
  Tooltip,
}
