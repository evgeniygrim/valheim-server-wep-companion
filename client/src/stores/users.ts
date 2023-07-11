import { defineStore } from 'pinia'
import { User, UserListQuery } from '../types/users'
import router from '/@/router';
import { UserApi } from '../api';

const initialState: {
  data: Map<User['id'], User>,
  selectedId?: User['id'],
  create: boolean,
  from: number,
  to: number,
  loading: boolean,
} = {
  data: new Map<User['id'], User>(),
  selectedId: undefined,
  create: false,
  from: 0,
  to: 100,
  loading: false,
};

export const useUsers = defineStore('[USERS]', {
  state: () => initialState,
  getters: {
    list: (state) => {
      return Array.from(state.data.values());
    },
    selected: (state) => {
      if (state.selectedId) {
        return state.data.get(state.selectedId);
      } else {
        return undefined;
      }
    }
  },
  actions: {
    select(id: User['id']) {
      if (id) {
        router.push(`/users/${id}`);
      }
      if (id == 'create')  {
        this.create = true;
        this.selectedId = undefined;
      } else {
        this.create = false;
        this.selectedId = id;
      }
    },
    loadAll(params: UserListQuery) {
      this.$patch({loading: true})

      UserApi.loadAll(params)
        .then((users: any) => {
          if (!Array.isArray(users.list)) {
            return false;
          }
          const caches = new Map(this.$state.data);
          users.list.forEach((user: User) => {
            caches.set(user.id, user)
          });
          this.$patch({
            from: params.from,
            data: caches,
            to: params.to,
            loading: false,
          });
        })
        .catch(() => this.$patch({loading: false}))
    },
    set(user: User) {
      this.data.set(user.id, user);
    },
    remove(id: User['id']) {
      this.data.delete(id);
    }
  }
  
})