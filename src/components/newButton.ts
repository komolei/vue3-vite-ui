import { defineComponent, h, reactive, ref, computed, watchEffect } from "vue";

export default defineComponent({
  setup(props, { attrs, slots, emit }) {
    // 典型的闭包 // 只会执行一次，初始化
    const state = reactive({
      name: "newButton",
    });
    let userName = ref<String>("komolei");
    watchEffect(() => {
      userName.value += "1";
    });
    setInterval(() => {
      userName.value += "1";
    }, 2000);
    return () => {
      let userNameValue = userName.value;
      return h(
        "div",
        {
          class: "newButton_ct",
        },
        [
          h("span", {
            class: "span",
          }),
          `${state.name}-${userNameValue}`,
        ]
      );
    };
  },
});
