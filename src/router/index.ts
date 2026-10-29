import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import VbleLayout from '@/vble/VbleLayout.vue'
import FeatherLayout from '@/feather/FeatherLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'GAME FFS - 游戏首页' }
  },
  {
    path: '/vble',
    component: VbleLayout,
    children: [
      {
        path: '',
        name: 'VbleHome',
        component: () => import('@/vble/views/HomeView.vue'),
        meta: { title: '最终幻想：时空之轮 - 官方门户' }
      },
      {
        path: 'docs',
        name: 'VbleDocs',
        component: () => import('@/vble/views/DocsView.vue'),
        meta: { title: '白皮书 - 最终幻想：时空之轮' }
      },
      {
        path: 'docs/:code',
        name: 'VbleWhitepaperDetail',
        component: () => import('@/vble/views/WhitepaperDetailView.vue'),
        meta: { title: '白皮书独立阅览室 - 最终幻想：时空之轮' }
      },
      {
        path: 'story',
        name: 'VbleStory',
        component: () => import('@/vble/views/StoryView.vue'),
        meta: { title: '编年史 - 最终幻想：时空之轮' }
      },
      {
        path: 'story/:id',
        name: 'VbleStoryDetail',
        component: () => import('@/vble/views/StoryDetailView.vue'),
        meta: { title: '纪元剧情档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'characters',
        name: 'VbleCharacters',
        component: () => import('@/vble/views/CharactersView.vue'),
        meta: { title: '英雄 - 最终幻想：时空之轮' }
      },
      {
        path: 'characters/:id',
        name: 'VbleCharacterDetail',
        component: () => import('@/vble/views/CharacterDetailView.vue'),
        meta: { title: '英雄独立档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'monsters',
        name: 'VbleMonsters',
        component: () => import('@/vble/views/MonstersView.vue'),
        meta: { title: '魔物图鉴 - 最终幻想：时空之轮' }
      },
      {
        path: 'attributes',
        name: 'VbleAttributes',
        component: () => import('@/vble/views/AttributesView.vue'),
        meta: { title: '属性器 - 最终幻想：时空之轮' }
      },
      {
        path: 'modifier',
        name: 'VbleModifier',
        component: () => import('@/vble/views/ModifierView.vue'),
        meta: { title: '属性修改器 - 最终幻想：时空之轮' }
      },
      {
        path: 'jobs',
        name: 'VbleJobs',
        component: () => import('@/vble/views/JobsView.vue'),
        meta: { title: '职业 - 最终幻想：时空之轮' }
      },
      {
        path: 'jobs/:id',
        name: 'VbleJobDetail',
        component: () => import('@/vble/views/JobDetailView.vue'),
        meta: { title: '职业档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'dungeons',
        name: 'VbleDungeons',
        component: () => import('@/vble/views/DungeonsView.vue'),
        meta: { title: '秘境地城 - 最终幻想：时空之轮' }
      },
      {
        path: 'dungeons/:id',
        name: 'VbleDungeonDetail',
        component: () => import('@/vble/views/DungeonDetailView.vue'),
        meta: { title: '秘境档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'scenes',
        name: 'VbleScenes',
        component: () => import('@/vble/views/ScenesView.vue'),
        meta: { title: '场景城镇 - 最终幻想：时空之轮' }
      },
      {
        path: 'scenes/:id',
        name: 'VbleSceneDetail',
        component: () => import('@/vble/views/DungeonDetailView.vue'),
        meta: { title: '场景档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'vehicles',
        name: 'VbleVehicles',
        component: () => import('@/vble/views/VehiclesView.vue'),
        meta: { title: '载具 - 最终幻想：时空之轮' }
      },
      {
        path: 'sidequests',
        name: 'VbleSidequests',
        component: () => import('@/vble/views/SidequestsView.vue'),
        meta: { title: '支线 - 最终幻想：时空之轮' }
      },
      {
        path: 'sidequests/:id',
        name: 'VbleSidequestDetail',
        component: () => import('@/vble/views/SidequestDetailView.vue'),
        meta: { title: '支线详单 - 最终幻想：时空之轮' }
      },
      {
        path: 'battle-tactics',
        name: 'VbleBattleTactics',
        component: () => import('@/vble/views/BattleTacticsView.vue'),
        meta: { title: '战斗法则 - 最终幻想：时空之轮' }
      },
      {
        path: 'boss-tactics',
        name: 'VbleBossTactics',
        component: () => import('@/vble/views/BossTacticsView.vue'),
        meta: { title: '首领攻坚 - 最终幻想：时空之轮' }
      },
      {
        path: 'boss-tactics/:id',
        name: 'VbleBossTacticsDetail',
        component: () => import('@/vble/views/BossDetailView.vue'),
        meta: { title: '首领战术详单 - 最终幻想：时空之轮' }
      },
      {
        path: 'bosses/:id',
        name: 'VbleBossDetail',
        component: () => import('@/vble/views/BossDetailView.vue'),
        meta: { title: '首领档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'celestial',
        name: 'VbleCelestial',
        component: () => import('@/vble/views/CelestialView.vue'),
        meta: { title: '虚空天体 - 最终幻想：时空之轮' }
      },
      {
        path: 'economy',
        name: 'VbleEconomy',
        component: () => import('@/vble/views/EconomyView.vue'),
        meta: { title: '经济调合 - 最终幻想：时空之轮' }
      },
      {
        path: 'teachings',
        name: 'VbleTeachings',
        component: () => import('@/vble/views/TeachingsView.vue'),
        meta: { title: '秘传绝技 - 最终幻想：时空之轮' }
      },
      {
        path: 'teachings/:id',
        name: 'VbleTeachingDetail',
        component: () => import('@/vble/views/TeachingDetailView.vue'),
        meta: { title: '秘传档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'summons',
        name: 'VbleSummons',
        component: () => import('@/vble/views/SummonsView.vue'),
        meta: { title: '召唤兽 - 最终幻想：时空之轮' }
      },
      {
        path: 'summons/:id',
        name: 'VbleSummonDetail',
        component: () => import('@/vble/views/SummonDetailView.vue'),
        meta: { title: '巨灵档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'equipment',
        name: 'VbleEquipment',
        component: () => import('@/vble/views/EquipmentView.vue'),
        meta: { title: '神兵矩阵 - 最终幻想：时空之轮' }
      },
      {
        path: 'equipment/:id',
        name: 'VbleEquipmentDetail',
        component: () => import('@/vble/views/EquipmentDetailView.vue'),
        meta: { title: '神装全息档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'armory',
        name: 'VbleArmory',
        component: () => import('@/vble/views/ArmorySimulatorView.vue'),
        meta: { title: '配装模拟 - 最终幻想：时空之轮' }
      },
      {
        path: 'items',
        name: 'VbleItems',
        component: () => import('@/vble/views/ItemsView.vue'),
        meta: { title: '道具防具 - 最终幻想：时空之轮' }
      },
      {
        path: 'systems',
        name: 'VbleSystems',
        component: () => import('@/vble/views/SystemsView.vue'),
        meta: { title: '深渊系统 - 最终幻想：时空之轮' }
      },
      {
        path: 'gallery',
        name: 'VbleGallery',
        component: () => import('@/vble/views/GalleryView.vue'),
        meta: { title: '实机画廊 - 最终幻想：时空之轮' }
      },
      {
        path: 'search',
        name: 'VbleSearch',
        component: () => import('@/vble/views/SearchView.vue'),
        meta: { title: '全景搜索 - 最终幻想：时空之轮' }
      },
      {
        path: 'updates',
        name: 'VbleUpdates',
        component: () => import('@/vble/views/UpdatesView.vue'),
        meta: { title: '更新日志 - 最终幻想：时空之轮' }
      },
      {
        path: 'roadmap',
        name: 'VbleRoadmap',
        component: () => import('@/vble/views/RoadmapView.vue'),
        meta: { title: '功能规划 - 最终幻想：时空之轮' }
      },
      {
        path: 'news',
        name: 'VbleNews',
        component: () => import('@/vble/views/NewsView.vue'),
        meta: { title: '资讯中心 - 最终幻想：时空之轮' }
      },
      {
        path: 'news/:id',
        name: 'VbleNewsDetail',
        component: () => import('@/vble/views/NewsView.vue'),
        meta: { title: '单机档案 - 最终幻想：时空之轮' }
      },
      {
        path: 'download',
        name: 'VbleDownload',
        component: () => import('@/vble/views/DownloadView.vue'),
        meta: { title: '游戏下载 - 最终幻想：时空之轮' }
      }
    ]
  },
  {
    path: '/feather',
    component: FeatherLayout,
    children: [
      {
        path: '',
        name: 'FeatherHome',
        component: () => import('@/feather/views/HomeView.vue'),
        meta: { title: '《裂空之羽》官方站点 · 2D 横版卷轴飞行射击' }
      },
      {
        path: 'play',
        name: 'FeatherPlay',
        component: () => import('@/feather/views/GamePlayView.vue'),
        meta: { title: '在线试玩作战 · 《裂空之羽》' }
      },
      {
        path: 'stages',
        name: 'FeatherStages',
        component: () => import('@/feather/views/StagesView.vue'),
        meta: { title: '全 8 章 48 关战役图谱 · 《裂空之羽》' }
      },
      {
        path: 'characters',
        name: 'FeatherCharacters',
        component: () => import('@/feather/views/CharactersView.vue'),
        meta: { title: '机体职业与工坊装备 · 《裂空之羽》' }
      },
      {
        path: 'doc',
        name: 'FeatherDoc',
        component: () => import('@/feather/views/DocView.vue'),
        meta: { title: '策划设计文档 v1.3 · 《裂空之羽》' }
      }
    ]
  },
  // 裂空之羽别名快捷路由
  { path: '/play', redirect: '/feather/play' },
  { path: '/stages', redirect: '/feather/stages' },
  // 兼容老路径直接重定向到 /vble/*
  { path: '/docs', redirect: '/vble/docs' },
  { path: '/story', redirect: '/vble/story' },
  { path: '/characters', redirect: '/vble/characters' },
  { path: '/monsters', redirect: '/vble/monsters' },
  { path: '/attributes', redirect: '/vble/attributes' },
  { path: '/modifier', redirect: '/vble/modifier' },
  { path: '/jobs', redirect: '/vble/jobs' },
  { path: '/dungeons', redirect: '/vble/dungeons' },
  { path: '/scenes', redirect: '/vble/scenes' },
  { path: '/vehicles', redirect: '/vble/vehicles' },
  { path: '/sidequests', redirect: '/vble/sidequests' },
  { path: '/battle-tactics', redirect: '/vble/battle-tactics' },
  { path: '/boss-tactics', redirect: '/vble/boss-tactics' },
  { path: '/celestial', redirect: '/vble/celestial' },
  { path: '/economy', redirect: '/vble/economy' },
  { path: '/teachings', redirect: '/vble/teachings' },
  { path: '/summons', redirect: '/vble/summons' },
  { path: '/equipment', redirect: '/vble/equipment' },
  { path: '/armory', redirect: '/vble/armory' },
  { path: '/items', redirect: '/vble/items' },
  { path: '/systems', redirect: '/vble/systems' },
  { path: '/gallery', redirect: '/vble/gallery' },
  { path: '/search', redirect: '/vble/search' },
  { path: '/updates', redirect: '/vble/updates' },
  { path: '/roadmap', redirect: '/vble/roadmap' },
  { path: '/news', redirect: '/vble/news' },
  { path: '/news/:id', redirect: to => `/vble/news/${to.params.id}` },
  { path: '/download', redirect: '/vble/download' },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  // Hash 模式（URL 带 #），适配 GitHub Pages 静态部署
  history: createWebHashHistory(),
  routes,
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