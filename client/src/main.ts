import '/@/styles/index.scss'
import "element-plus/dist/index.css";

import App from '/@/app.vue';
import { createApp } from 'vue'
import router from '/@/router/index';
import store from '/@/stores/index';
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementPlus from 'element-plus'

const app = createApp(App)

library.add(far);
library.add(fas);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
