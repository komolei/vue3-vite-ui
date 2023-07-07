<template>
  <div :class="createCssName('switch')" @click="toggle">
    <button :class="value ? 'checked' : ''"><span></span></button>
  </div>
</template>
<script lang="ts">
import { createCssName } from "../utils/createCssName";
export default {
  name: "ybr-switch-component",
  props: {
    value: {
      type: [String, Boolean, Number],
      default: false,
    },
  },
  setup(props, context) {
    const toggle = () => context.emit("update:value", !props.value);
    return {
      toggle,
      createCssName,
    };
  },
};
</script>

<style lang="scss" scoped>
.ybr-switch {
  $w: 44px;
  $h: 22px;
  $zIndex: 2;
  button {
    position: relative;
    width: $w;
    height: $h;
    cursor: pointer;
    background: #1890ff;
    border-radius: 12px;
    &:focus {
      outline: none;
    }
    span {
      position: absolute;
      top: 2px;
      left: 2px;
      z-index: $zIndex;
      width: 20px;
      height: 18px;
      background: #fff;
      border-radius: 50%;
      transition: all 250ms;
    }
    &.checked {
      span {
        // left: cale(100%-#{$w}-2px);
        left: 20px;
      }
    }
  }
}
</style>
