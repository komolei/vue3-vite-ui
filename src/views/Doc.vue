<template>
  <TopNav />
  <div class="content">
    <Aside v-if="asideVisible" />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script lang="ts">
import TopNav from "../components/TopNav.vue";
import Aside from "../components/aside.vue";
import { inject, Ref } from "vue";
export default {
  setup() {
    const asideVisible = inject<Ref<boolean>>("asideVisible");
    return {
      asideVisible,
    };
  },
  components: {
    TopNav,
    Aside,
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  main {
    margin: 12px 0 0 20px;
    flex: 1;
  }
}
</style>
