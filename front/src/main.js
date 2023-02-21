import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiCaretRightFill, SiGitbook } from "oh-vue-icons/icons";

addIcons(BiCaretRightFill, SiGitbook);

const app = createApp(App)
const pinia = createPinia()

app.component("v-icon", OhVueIcon);
app.use(pinia)

app.use(router).mount('#app')
