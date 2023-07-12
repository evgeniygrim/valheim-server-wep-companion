<template>
  <div class="main-layout">
    <el-container>
      <el-header :height="'96px'" class="main-header">
        <Header></Header>  
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import Header from './header.vue'
import Footer from './footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  $bg: #{var(--el-bg-color-overlay)};
  .main-layout {
    min-height: 100vh;
    display: flex;
  }
  .main-header {
    background-color: $bg
  }
</style>