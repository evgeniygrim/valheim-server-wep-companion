import { RouteRecordRaw } from "vue-router";
import Main from "/@/layouts/main/index.vue";
import NotFound from "/@/views/common/404.vue";
import Home from '/@/views/home/index.vue';

export default [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        component: Home
      }
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
] as Array<RouteRecordRaw>;
