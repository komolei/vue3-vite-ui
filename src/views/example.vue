<template>
  <div :class="createCssName('button')">
    <button></button>
  </div>
</template>
<script lang="ts">
import { createCssName } from "../utils/createCssName";
export default {
  name: "ybr-button-demo",
  props: {
    theme: {
      type: [String],
      default: "",
    },
  },
  setup(props, context) {
    return {
      createCssName,
    };
  },
};
</script>

<style lang="scss" scoped>
.ybr-button {
  background: gray;
}
</style>
