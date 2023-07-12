<template>
  <el-row :gutter="10" :align="'middle'" :justify="'space-between'">
    <el-col :span="12">
      <div class="logo" @click="router.push('/')">
        <div class="main-logo">grimheim</div>
        <div class="sub-logo">valheim game server</div>
      </div>
    </el-col>
    <el-col :span="12" class="info">
      <el-space :size="10" :spacer="spacer">
        <span class="label text">Players : {{  server.player_count }}</span>
        <el-button @click="() => copyPath()" :type="'primary'" link> <span class="label">{{ location.hostname }}:{{  server.port }}</span> </el-button>
        <el-button @click="router.push('/')" class="state" :type="state" circle></el-button>
      </el-space>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { ServerStates } from '/@/types/game'
import { useGameStatus } from '/@/stores/game-status'
import { ElDivider } from 'element-plus'
import router from '/@/router'


const StateClasses = {
  [ServerStates.OFFLINE]: 'info' as any,
  [ServerStates.PENDING]: 'warning' as any,
  [ServerStates.ONLINE]: 'success' as any,
}

export default defineComponent({

  setup () {
    const gameStatus = useGameStatus();
    const spacer = h(ElDivider, { direction: 'vertical' })

    return {
      router,
      location,
      spacer,
      gameStatus,
      ServerStates,
    }
  },
  beforeMount() {
    this.gameStatus.update();
  },
  computed: {
    server() {
      return this.gameStatus.server;
    },
    state() {
      return StateClasses[this.server.state]
    }
  },
  methods: {
    copyPath() {
      navigator.clipboard.writeText(`${location.hostname}:${this.server.port}`);
    }
  }
})
</script>

<style lang="scss" scoped>    
  
  .logo {
    padding: 8px 0;
    padding-left: 42px;
    --logo-color: #dc7e34;
    cursor: pointer;
  }
  .main-logo {
    font-size: 32px;
    font-family: 'Logo';
    background: linear-gradient(var(--logo-color), #292325);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    letter-spacing: 3px;
  }

  .sub-logo {
    font-size: 16px;
    font-family: 'Logo';
    color: #ab7024;
    background: linear-gradient(var(--logo-color), #292325);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    color: transparent;
  }

  .info {
    gap: 16px;
    align-items: center;
    font-weight: bold;
    color: var(--el-text-color-primary);
    flex-direction: row-reverse;
    display: flex;

    .label {
      font-family: 'Logo';
      letter-spacing: 3px;

      &.text {
        color: var(--el-color-primary);
        font-size: var(--el-font-size-base);
        cursor: default;
      }
    }
  }

  .state {
    --el-button-size: 16px;
    height: var(--el-button-size);
  }
</style>