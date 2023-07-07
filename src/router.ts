import { createRouter, createWebHashHistory } from "vue-router";
// ts-ignore
// import Home from "./views/Home.vue";
import Doc from "./views/Doc.vue";
import YbrDialog from "./views/DialogDemo.vue";
import YbrSwitch from "./views/SwitchDemo.vue";
import YbrButton from "./views/ButtonDemo.vue";
import YbrTabs from "./views/TabsDemo.vue";
import PIXIView from "./views/pixi_h5.vue";
import HouseBill from "./views/houseBill.vue";

import YbrRadio from "./components/radio.vue";
const history = createWebHashHistory();
const Home = () => import("./views/Home.vue");
// const PIXIView = () => import("./views/pixi.vue");
export const router = createRouter({
  history: history,
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/Doc",
      component: Doc,
      children: [
        {
          path: "switch",
          component: YbrSwitch,
        },
        {
          path: "radio",
          component: YbrRadio,
        },
        {
          path: "button",
          component: YbrButton,
        },
        {
          path: "dialog",
          component: YbrDialog,
        },
        {
          path: "input",
          component: YbrSwitch,
        },

        {
          path: "tabs",
          component: YbrTabs,
        },
        {
          path: "form",
          component: YbrSwitch,
        },
        {
          path: "pixi",
          // component: () => import("./views/pixi.vue"),
          component: PIXIView,
        },
        {
          path: "houseBill",
          component: HouseBill,
        },
      ],
    },
  ],
});
