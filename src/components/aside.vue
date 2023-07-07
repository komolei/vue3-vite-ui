<template>
  <aside>
    <h4>组件列表</h4>
    <ul>
      <li v-for="item in asideRouter" :key="item.link">
        <router-link :to="item.link"> {{ item.alias }}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {},
  data() {
    return {
      asideRouter: [
        {
          link: "/Doc/switch",
          alias: "switch 开关",
        },

        {
          link: "/Doc/button",
          alias: "button 按钮",
        },
        {
          link: "/Doc/dialog",
          alias: "dialog 弹出框",
        },
        {
          link: "/Doc/radio",
          alias: "radio 单选",
        },
        {
          link: "/Doc/input",
          alias: "input 输入",
        },

        {
          link: "/Doc/tabs",
          alias: "tabs 标签页",
        },
        {
          link: "/Doc/form",
          alias: "form 表单",
        },
        {
          link: "/Doc/pixi",
          alias: "pixi",
        },
        {
          link: "/Doc/houseBill",
          alias: "houseBill",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
aside {
  background: red;
  max-width: 120px;
}
</style>
