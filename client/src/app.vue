<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { SupervisorApi } from '/@/api'

onMounted(() => {
  SupervisorApi.getStatus().then();
})
</script>

<style scoped>
</style>
