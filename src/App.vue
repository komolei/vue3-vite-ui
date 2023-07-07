<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { ref, provide } from "vue";
import { Router } from "vue-router";
import {
  DynamicTab,
  DynamicTabContent,
  DynamicTabSettings,
} from "vue3-dynamic-tabs";
export default {
  name: "App",
  components: {
    DynamicTab,
    DynamicTabContent,
    DynamicTabSettings,
  },
  setup() {
    const windowClientWidth = document.documentElement.clientWidth;
    // const asideVisible = ref(windowClientWidth <= 500 ? true : false);
    const asideVisible = true;
    provide("asideVisible", asideVisible);
  },
};
</script>
<style scoped lang="scss">
iframe {
  // position: absolute;
  // z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
