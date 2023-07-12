<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Статус сервера</span>
        <el-button :icon="RefreshRight" :type="stateClass" text @click="gameStatus.update()">{{
          state
        }}</el-button>
      </div>
    </template>
    <dl class="data-list">
      <div v-for="item of statusData" :key="item?.dt" class="data-list-item">
        <dt class="dt">
          {{ item?.dt }}
        </dt>
        <dd class="dd">
          {{ item?.dd }}
        </dd>
      </div>
    </dl>
  </el-card>
</template>

<script lang="ts">
import { get } from "lodash";
import { defineComponent } from "vue";
import { useGameStatus } from "/@/stores/game-status";
import { ServerStates } from "/@/types/game";
import { RefreshRight } from "@element-plus/icons-vue";

const showStatusFields: { name: string }[] = [
  { name: "last_status_update" },
  { name: "server_name" },
  { name: "password_protected" },
  { name: "vac_enabled" },
  { name: "steam_id" },
  { name: "game_id" },
];

const StateClasses = {
  [ServerStates.OFFLINE]: "info" as any,
  [ServerStates.PENDING]: "warning" as any,
  [ServerStates.ONLINE]: "success" as any,
};

const StateName = {
  [ServerStates.OFFLINE]: "Offline" as any,
  [ServerStates.PENDING]: "Pending" as any,
  [ServerStates.ONLINE]: "online" as any,
};

export default defineComponent({
  setup() {
    const gameStatus = useGameStatus();

    return {
      gameStatus,
      RefreshRight,
    };
  },
  computed: {
    server() {
      return this.gameStatus.server;
    },
    state() {
      return StateName[this.server.state];
    },
    stateClass() {
      return StateClasses[this.server.state];
    },
    statusData() {
      return showStatusFields
        .map((field) => {
          let value = get(this.server, field.name);


          if (value) {

            if (field.name == 'last_status_update') {
              const date = new Date(value).toTimeString().match(/(\d{2}\:\d{2}\:\d{2}.+GMT\+\d{2})/);
              value = date ? date[0] : '';
            }
            return {
              dt: field.name.replaceAll("_", " "),
              dd: value,
            };
          } else {
            null;
          }
        })
        .filter(Boolean);
    },
  },
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.data-list {
  min-height: 218px;
}

.dt {
  width: 50%;
  color: var(--el-color-primary);
}
.dd {
  width: 50%;
  font-size: 12px;
}

.data-list-item {
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.box-card {
  width: 480px;
}
</style>
