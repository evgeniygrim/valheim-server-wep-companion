import {defineStore} from 'pinia';
import { ServerStates, ServerStatus } from '../types/game';
import { GameApi } from '../api';

const initialState: ServerStatus = {
 state: ServerStates.OFFLINE, 
}


export const useGameStatus = defineStore('[GameStatus]', {
  state: () => ({
    server: initialState,
    interval: null as NodeJS.Timer | null,
  }),
  actions: {
    update() {
      GameApi.getStatus()
        .then((res: ServerStatus) => {
          this.$patch({server: res});
        })
        .catch(() => {
          this.$patch({server: {state: ServerStates.OFFLINE}});
        })
        .finally(() => {
          if (this.$state.interval) {
            clearTimeout(this.$state.interval);
          }
          const interval = setTimeout(() => {
            this.$patch({interval: null});
            clearTimeout(interval);
            this.update();
          }, 1000 * 15)

          this.$patch({interval})
        })
    }
  }
})