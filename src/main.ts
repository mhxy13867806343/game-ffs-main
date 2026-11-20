import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 引入全局定制样式（包含reset）
import './assets/styles/global.css'
// 引入 UnoCSS 虚拟模块（必须在reset之后，才能覆盖reset的button样式）
import 'virtual:uno.css'
import './assets/styles/vble.css'
import './assets/styles/feather.css'

// 引入 overtrue share.js 社交分享样式
import 'social-share.js/dist/css/share.min.css'

// 通用代码高亮与字体样式
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
