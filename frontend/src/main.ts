import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { createPinia } from "pinia";

import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

const app = createApp(App);

app.directive("tooltip", Tooltip);
app.use(ToastService);
app.component("Toast", Toast);

app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			colorScheme: "dark",
		},
	},
});

app.use(createPinia());
app.mount("#app");
