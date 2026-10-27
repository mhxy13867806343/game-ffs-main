import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 引入 UnoCSS 虚拟模块
import 'virtual:uno.css'
// 引入全局定制样式
import './assets/styles/global.css'
import './assets/styles/vble.css'

// 通用代码高亮与字体样式
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
