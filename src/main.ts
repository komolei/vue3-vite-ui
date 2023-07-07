import { createApp, onMounted } from "vue";
import App from "./App.vue";
import "./index.scss";
import { router } from "./router";
const app = createApp(App).use(router).mount("#app");
