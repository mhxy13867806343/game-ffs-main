import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入 UnoCSS 虚拟模块
import 'virtual:uno.css'
// 引入全局定制样式
import './assets/styles/global.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
