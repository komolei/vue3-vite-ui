<template>
  <div class="ybr-dialog-example-ct">
    <Button :btnClick="handleClick" :btnText="'open'" />
    <Dialog
      v-model:visible="visible"
      :title="'首页'"
      :closeOnClickOverlay="false"
      :ok="handleOk"
    >
      <template v-slot:content>
        <strong>加粗</strong>
      </template>
    </Dialog>
  </div>
  <div class="ybr-dialog-example-ct">
    <Button :btnClick="openDialogFn" :btnText="'open Dialog'" />
  </div>
  <div>
    <!-- <NewButton/> -->
    <YBRButton />
  </div>
</template>
<script lang="ts">
import Dialog from "../components/dialog.vue";
import Button from "../components/button.vue";
import { ref } from "vue";

// @ts-ignore
import { openDialog } from "../components/openDialog.ts";
import NewButton from "../components/newButton";
import YBRButton from "../components/ybr_button";
export default {
  name: "ybr-dialog-demo",
  components: {
    Dialog,
    Button,
    NewButton,
    YBRButton,
  },
  setup() {
    const visible = ref<Boolean>(false);
    const handleClick = () => {
      visible.value = !visible.value;
    };
    const handleOk = () => {
      return false;
    };
    const handleCancel = () => {
      return true;
    };
    const openDialogFn = () => {
      openDialog({
        title: "h",
        content: "内容x",
      });
    };
    return {
      visible,
      handleClick,
      handleOk,
      handleCancel,
      openDialogFn,
    };
  },
};
</script>

<style lang="scss" scoped>
.ybr-dialog-example-ct {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  max-width: 320px;
  max-height: 200px;
  margin-bottom: 12px;
}
</style>
