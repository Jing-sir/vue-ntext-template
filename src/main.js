import { createApp } from 'vue'
import App from './App.vue'
import store from './store'; // vuex
import mixins from './plugins/mixins'; // mixins
import router from './setup/router-setup'; // 路由
import ElementPlus from 'element-plus'; // 引入element-plus
import 'element-plus/lib/theme-chalk/index.css';
import directive from './directive/directive';

const app = createApp(App)
    .use(directive)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mixin(mixins);

app.mount('#app');
