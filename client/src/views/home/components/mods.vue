<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Моды на сервере</span>
        <el-button :icon="Download" :type="'success'" @click="() => download()">Скачать</el-button>
      </div>
    </template>
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column type="index" :width="50">
        <template #header>
          <el-button :size="'small'" :type="'primary'" :icon="RefreshRight" link />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Мод" />
      <el-table-column prop="version" label="Версия" :align="'right'" />
    </el-table>
  </el-card>
</template>
<script lang="ts">

import { defineComponent, ref } from "vue";
import { DLLInfoInterface } from "/@/types/game";
import { GameApi } from "/@/api";
import { RefreshRight, Download } from "@element-plus/icons-vue";

export default defineComponent({
  setup() {
    const tableData = ref<DLLInfoInterface[]>([]);

    return {
      tableData,
      Download,
      RefreshRight,
    };
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      GameApi.getMods()
        .then((res: DLLInfoInterface[]) => {
          this.tableData = res;
        })
        .catch(() => null);
    },
    download() {
      const a = document.createElement("a");

      const href = location.origin + '/api' + GameApi.modsUrl + GameApi.plugins;
      a.href = href;
      a.click();
    }
  },
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
