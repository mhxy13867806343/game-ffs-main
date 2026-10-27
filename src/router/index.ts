import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  // 使用 Hash 模式（带 #），确保离线/单机/静态打包部署时路径完全正常且不 404
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'GAME FFS - 游戏首页' }
    },
    {
      path: '/play/:id',
      name: 'play',
      component: () => import('@/views/PlayView.vue'),
      meta: { title: '游戏运行 - GAME FFS' }
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router
