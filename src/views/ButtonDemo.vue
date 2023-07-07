<template>
  <div class="ybr-button-example-ct">
    <Button :theme="'primary'" />
    <Button :theme="'danger'" />
    <Button :theme="'link'" :btnText="'link'" />
  </div>
  <div class="ybr-button-example-ct">
    <Button :size="'large'" />
    <Button :size="'normal'" />
    <Button :size="'small'" />
  </div>
  <div class="ybr-button-example-ct">
    <Button :disabled="false" />
    <Button :disabled="true" />
  </div>
  <div class="ybr-button-example-ct">
    <Button :isLoading="true" :btnText="'NOxxxxxxxx'" />
  </div>
</template>
<script lang="ts">
import Button from "../components/button.vue";

export default {
  name: "ybr-switch-demo",
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
.ybr-button-example-ct {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  max-width: 320px;
  max-height: 200px;
  margin-bottom: 12px;
}
</style>
