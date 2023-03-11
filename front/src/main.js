import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { SiSuperuser, BiCaretRightFill, SiGitbook, CoAccountLogout, RiAccountPinCircleFill, FaPersonBooth, MdLogin, MdNewlabelTwotone, RiMenuFill, MdCloseSharp, HiInformationCircle, BiCheckCircleFill, BiXCircleFill  } from "oh-vue-icons/icons";

addIcons(SiSuperuser, BiCaretRightFill, SiGitbook, CoAccountLogout, RiAccountPinCircleFill, FaPersonBooth, MdLogin, MdNewlabelTwotone, RiMenuFill, MdCloseSharp, HiInformationCircle, BiCheckCircleFill, BiXCircleFill );

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)


app.use(router)

app.component("v-icon", OhVueIcon);

app.mount('#app')
