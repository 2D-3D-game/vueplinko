import { createApp } from "vue";
import "./assets/css/style.css";
import SideBar from "./components/SideBar.vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import en from "./assets/locales/en.json";
import ch from "./assets/locales/ch.json";

const messages = {
  en,
  ch,
};

const i18n = createI18n({
  locale: "en",
  messages,
});

createApp(App).use(i18n).mount("#myapp");
createApp(SideBar).use(i18n).mount("#app");