<template>
  <div class="ybr-tabs-example-ct">
    <div>Tabs示例</div>
    <h3>示例1</h3>
    <Tabs>
      <div :title="'首页'"><div>fada</div></div>
      <Tab :title="'首页'"> index</Tab>
      <Tab :title="'内容'"> content</Tab>
    </Tabs>
  </div>
</template>
<script lang="ts">
import { createCssName } from "../utils/createCssName";
import Tabs from "../components/tabs/tabs.vue";
export default {
  name: "ybr-tabs-demo",
  props: {
    theme: {
      type: [String],
      default: "",
    },
  },
  components: {
    Tabs,
  },
  setup(props, context) {
    return {
      createCssName,
    };
  },
};
</script>

<style lang="scss" scoped>
.ybr-tabs {
  background: gray;
}
</style>
