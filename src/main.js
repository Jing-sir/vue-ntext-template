import { createApp } from 'vue'
import App from './App.vue'
import store from './store'; // vuex
import mixins from './plugins/mixins'; // mixins
import router from './setup/router-setup'; // 路由
import ElementPlus from 'element-plus'; // 引入element-plus
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.mixin(mixins);

app.mount('#app');
