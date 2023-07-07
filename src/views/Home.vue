<template>
  <TopNav />
  <div class="banner">
    <h1>Vue3 UI FrameWork</h1>
    <p>基于vue3开发的UI框架</p>
    <div class="actions">
      <a href="https:github.com">GitHub</a>
      <router-link to="/Doc">开始</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import TopNav from "../components/TopNav.vue";
export default {
  components: {
    TopNav,
  },
};
</script>
<style lang="scss" scoped>
.banner {
  min-height: 120px;
  text-align: center;
  .actions {
    a {
      text-decoration: none;
      display: inline-block;
      $h: 20px;
      margin-right: $h;
      padding: 4px;
      border: 1px solid #333;
      border-radius: 10px;
      line-height: $h;
    }
  }
}
</style>
