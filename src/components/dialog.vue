<template>
  <Teleport to="body">
    <div
      :class="createCssName('dialog-overlay')"
      v-if="visible"
      @click="handleOnClickOverlay"
    >
      <div :class="createCssName('dialog')">
        <header class="ybr-dialog-header">
          <div>
            {{ title }}
          </div>
          <div @click="close">X</div>
        </header>
        <div class="ybr-dialog-content">
          <slot name="content" />
        </div>
        <footer class="ybr-dialog-footer">
          <Button :btnText="'cancel'" @click="cancel" theme="primary" />
          <Button :btnText="'sure'" @click="ok" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts">
import { createCssName } from "../utils/createCssName";
import Button from "../components/button.vue";

export default {
  name: "ybr-dialog-component",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    cancel: {
      type: Function,
    },
    ok: {
      type: Function,
    },
  },
  components: {
    Button,
  },
  setup(props, context) {
    // const { visible } = props; // 不应该用这个，有点像react中的state，自身的状态
    const handleOnClickOverlay = () => {
      if (!props.closeOnClickOverlay) return;
      context.emit("update:visible", !props.visible);
    };
    const close = () => {
      context.emit("update:visible", !props.visible);
    };
    const ok = () => {
      if (props.ok?.()) {
        close();
      }
    };
    const cancel = () => {
      props.cancel?.();
      close();
    };
    return {
      createCssName,
      close,
      handleOnClickOverlay,
      ok,
      cancel,
    };
  },
};
</script>

<style lang="scss" scoped>
.ybr-dialog-overlay {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: fade_out(#ddd, 0.3);
}
.ybr-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  $w: 400px;
  width: $w;
  margin-top: 80px;
  padding: 8px 14px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.15), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  .ybr-dialog-header {
    padding: 8px 14px;
    border-bottom: 1px solid #ccc;
    text-align: left;
    > div {
      display: inline-block;
      &:last-child {
        float: right;
        text-align: right;
        cursor: pointer;
      }
    }
  }
  .ybr-dialog-content {
    min-height: 150px;
    margin: 14px 8px;
    padding: 8px 14px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  .ybr-dialog-footer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }
}
</style>
