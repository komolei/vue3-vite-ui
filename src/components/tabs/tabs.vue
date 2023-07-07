<template>
  <div :class="createCssName('tabs-ct')">
    <div
      class="ybr-tabs-box"
      v-for="(item, index) in childs"
      :key="item.props.title || index"
    >
      <div class="ybr-tabs-title" @click="selectedItem(item)">
        {{ item.props.title }}
      </div>
      <div class="ybr-tabs-content">
        <component :is="item" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { createCssName } from "../../utils/createCssName";
import Tab from "../../components/tabs/tab.vue";

const PropsType = {
  theme: {
    type: [String],
    default: "",
  },
};

export default {
  name: "ybr-tabs-component",
  props: PropsType,
  components: {
    Tab,
  },
  setup(props, context) {
    const childs = context.slots
      .default()
      .filter((item) => item.type === "Tab");

    const selectedItem = (item) => {
      console.log("item is", item);
    };
    return {
      childs,
      selectedItem,
      createCssName,
    };
  },
};
</script>

<style lang="scss" scoped>
.ybr-tabs-ct {
  background: gray;

  display: flex;
  flex-flow: row nowrap;
}
</style>
