<template>
  <div class="topNav">
    <div class="mobile-bar" @click="toggleAsideVisible">=</div>
    <router-link to="/" class="logo">LOGO</router-link>
    <ul class="menu">
      <li>menu</li>
      <li>menu</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { inject, Ref } from "vue";
export default {
  setup() {
    const asideVisible = inject<Ref<boolean>>("asideVisible");
    const toggleAsideVisible = () => {
      asideVisible.value = !asideVisible.value;
    };
    return {
      asideVisible,
      toggleAsideVisible,
    };
  },
};
</script>
<style lang="scss" scoped>
.topNav {
  $h: 42px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  background: #666;
  padding: 6px 12px;
  .mobile-bar {
    line-height: $h;
    display: none;
  }
  .logo {
    line-height: $h;
  }
  .menu {
    line-height: $h;
    li {
      display: inline-block;
      margin-right: 20px;
      &:last-child {
        margin-right: 10px;
      }
    }
  }
}

@media (max-width: 500px) {
  .topNav {
    .mobile-bar {
      display: block;
    }
    .logo {
      margin: 0 auto;
    }
    .menu {
      display: none;
    }
  }
}
</style>
