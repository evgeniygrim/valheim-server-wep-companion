<template>
  <div class="main-layout">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss">
  .main-layout {
    color: #000;
    display: flex;
    flex-direction: row;

    & > aside {
      box-sizing: border-box;
      padding: 20px 0;
      min-width: 400px;
      background-color: white;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    & > main {
      width: 100%;
    }
  }
</style>