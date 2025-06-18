import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { createPinia } from "pinia";

import Tooltip from "primevue/tooltip";

const app = createApp(App);

app.directive("tooltip", Tooltip);

app.use(PrimeVue, {
	theme: {
		preset: Aura,
	},
});

app.use(createPinia());
app.mount("#app");
