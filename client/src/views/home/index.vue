<template>
  <el-row class="container">
    <div>
      <status-component></status-component>
    </div>
    <div>
        <mods-component></mods-component>
    </div>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StatusComponent from './components/status.vue'
import ModsComponent from './components/mods.vue'

export default defineComponent({
  components: {
    StatusComponent,
    ModsComponent
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped lang="scss">
  .container {
    gap: 16px;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;

    &>div{
      width: 40%;
      min-width: 460px;
    }
  }
</style>