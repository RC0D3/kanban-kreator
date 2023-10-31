import "./bootstrap";

import { createApp, defineCustomElement } from "vue";
import App from "./App.vue";

import VueFeather from "vue-feather";
import VueClickAway from "vue3-click-away";

const app = createApp(App);

app.use(VueClickAway);
app.config.unwrapInjectedRef = true;
app.mount("#app");
customElements.define("vue-feather", defineCustomElement(VueFeather));
