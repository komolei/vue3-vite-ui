import {
  defineComponent,
  ref,
  watchEffect,
  h,
  reactive,
  shallowReactive,
} from "vue";

export default defineComponent({
  setup(props, { attrs, slots, emit }) {
    let state = shallowReactive({
      age: {
        count: 0,
      },
      sex: "male",
    });
    const handleClick = () => {
      //   state.age.count += 1;
      //   state.sex = "female";
    };
    setInterval(() => {
      state.age.count += 1;
      state.sex = "female";
    }, 1000);
    return () => {
      return (
        <div class="ybr_button" onClick={handleClick}>
          {state.age.count}-{state.sex}
        </div>
      );
    };
  },
});
