import App from '/@/app.vue';
import { createApp } from 'vue'
import './style.css'
import router from '/@/router/index';
import store from '/@/stores/index';
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(far);
library.add(fas);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.mount('#app')
