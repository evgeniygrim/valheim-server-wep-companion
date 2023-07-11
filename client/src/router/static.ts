import { RouteRecordRaw } from "vue-router";
import Main from "/@/layouts/main.vue";
import NotFound from "/@/views/common/404.vue";
export default [
  {
    path: "/",
    component: Main,
    children: [],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
] as Array<RouteRecordRaw>;
