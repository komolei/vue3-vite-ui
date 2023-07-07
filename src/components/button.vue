<template>
  <button :class="classes" :disabled="disabled" @click="handleClick">
    <span class="ybr-button-loading-ct" v-if="isLoading">
      <svg
        class="ybr-button-loading"
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
        ></path>
      </svg>
    </span>
    <span>
      {{ btnText }}
    </span>
  </button>
</template>
<script lang="ts">
import { computed } from "vue";
import { createCssName } from "../utils/createCssName";
export default {
  name: "ybr-button-component",
  props: {
    theme: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "",
    },
    size: {
      type: [String],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    btnClick: {
      type: Function,
      default: () => {},
    },
  },
  setup(props, context) {
    const { theme, size, disabled, isLoading, btnClick } = props;
    const classes = computed(() => {
      const prefix = `ybr`;
      const el = `button`;
      const cls = `${prefix}-${el} 
        ${theme ? `${theme}` : ""}
        ${size ? `${size}` : ""}
        ${disabled ? `disabled` : ""}
        ${isLoading ? `isLoading` : ""}`;
      return cls;
    });
    const handleClick = (e) => {
      if (disabled) return;
      btnClick(e);
    };
    return {
      createCssName,
      classes,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.ybr-button {
  $w: 78px;
  $h: 28px;
  $bgd-init: #fff;
  width: $w;
  height: $h;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 4px;
  padding: 4px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 4px;
  line-height: $h;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.15), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  outline: none;
  cursor: pointer;
  transition: all 250ms;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: $w;
    height: $h;
    background-image: radial-gradient(circle, rgb(69, 129, 240) 10%, transparent 10.1%);
    transform: scale(2);
    opacity: 0;
    transition: all 0.6s;
  }
  &:active:after {
    transform: scale(0);
    opacity: 0.3;
    transition: 0s;
  }

  &.primary {
    background: rgb(24, 144, 255);
    &:hover {
      background: rgb(9, 109, 217);
    }
    &:active {
      background: rgb(9, 109, 217);
    }
  }
  &.danger {
    $bgd: rgb(255, 77, 79);
    $bgd_active: rgb(255, 120, 117);
    background: $bgd;
    &:hover {
      background: $bgd_active;
    }
    &:active {
      background: $bgd_active;
    }
  }
  &.link {
    $bgd: rgb(24, 144, 255);
    $bgd_active: rgb(41, 151, 255);
    border: none;
    color: $bgd;
    background: transparent;
    &::after {
      background: transparent;
    }
  }

  &.large {
    width: #{$w + 12px};
    height: #{$h + 6px};
  }
  &.small {
    width: #{$w -12px};
    height: #{$h - 6px};
  }

  &.disabled {
    background: #ccc;
  }

  &.isLoading {
    justify-content: flex-start;
    span {
      &:last-child {
        margin-left: 4px;
      }
    }
  }
  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.ybr-button-loading {
  animation: spin 0.6s infinite ease;
}
</style>
