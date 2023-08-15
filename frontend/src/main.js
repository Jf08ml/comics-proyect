import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import Notifications from "@kyvg/vue3-notification";
import {
  BiStar,
  BiStarFill,
  RiFileEditFill,
  IoSend,
  FaArrowLeft,
  FaArrowRight,
  FcApproval,
  FaRegularSave,
  PxNotes,
  HiEyeOff,
  HiEye,
  MdAddphotoalternate,
  SiSuperuser,
  BiCaretRightFill,
  SiGitbook,
  CoAccountLogout,
  RiAccountPinCircleFill,
  FaPersonBooth,
  MdLogin,
  MdNewlabelTwotone,
  RiMenuFill,
  MdCloseSharp,
  HiInformationCircle,
  BiCheckCircleFill,
  BiXCircleFill,
  BiBoxArrowInRight,
  IoSearchCircleSharp,
  HiSolidSearch
} from "oh-vue-icons/icons";
addIcons(
  BiStar,
  BiStarFill,
  RiFileEditFill,
  IoSend,
  FaArrowLeft,
  FaArrowRight,
  FcApproval,
  FaRegularSave,
  PxNotes,
  HiEyeOff,
  HiEye,
  MdAddphotoalternate,
  SiSuperuser,
  BiCaretRightFill,
  SiGitbook,
  CoAccountLogout,
  RiAccountPinCircleFill,
  FaPersonBooth,
  MdLogin,
  MdNewlabelTwotone,
  RiMenuFill,
  MdCloseSharp,
  HiInformationCircle,
  BiCheckCircleFill,
  BiXCircleFill,
  BiBoxArrowInRight,
  IoSearchCircleSharp,
  HiSolidSearch
);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Notifications);
app.use(router);

app.component("v-icon", OhVueIcon);

app.mount("#app");
