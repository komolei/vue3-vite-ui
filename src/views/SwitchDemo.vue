<template>
  <div>
    <Switch v-model:value="value" />
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import Switch from "../components/switch.vue";

export default {
  name: "ybr-switch-demo",
  components: {
    Switch,
  },
  setup(props, context) {
    const value = ref(false);
    return {
      value,
    };
  },
};
</script>

<style lang="scss" scoped></style>
