import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'GAME FFS - 单机游戏门户首页' }
    },
    {
      path: '/play/:id',
      name: 'play',
      component: () => import('@/views/PlayView.vue'),
      meta: { title: '单机游戏畅玩 - GAME FFS' }
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/LibraryView.vue'),
      meta: { title: '单机游戏库 - GAME FFS' }
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('@/views/DocView.vue'),
      meta: { title: '单机游戏设计文档 - GAME FFS' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: '打包与运行说明 - GAME FFS' }
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
