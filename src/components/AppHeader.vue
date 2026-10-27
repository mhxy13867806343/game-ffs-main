<template>
  <header class="sticky top-0 z-50 w-full bg-[#0a0d14]/90 backdrop-blur-md border-b border-[#1c2436] transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- 品牌 LOGO -->
      <router-link to="/" class="flex items-center gap-3 group text-decoration-none">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
          <span class="text-white font-black text-xl tracking-tighter">FF</span>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="text-white font-bold text-base sm:text-lg leading-tight tracking-wider">
              GAME <span class="text-blue-400">FFS</span>
            </span>
            <span class="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-mono">
              纯单机
            </span>
          </div>
          <span class="text-[10px] text-gray-400 tracking-widest uppercase">单机游戏启动中心</span>
        </div>
      </router-link>

      <!-- PC 端主导航 -->
      <nav class="hidden md:flex items-center gap-1 lg:gap-3">
        <router-link
          v-for="item in navLinks"
          :key="item.path"
          :to="item.path"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-decoration-none"
          :class="route.path === item.path ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- 搜索 & 全屏工具按钮 -->
      <div class="hidden sm:flex items-center gap-3">
        <n-input
          v-model:value="searchKeyword"
          size="small"
          placeholder="搜索单机游戏..."
          class="w-36 lg:w-48 bg-[#121824] rounded-full text-xs"
          clearable
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <span class="text-gray-400 text-xs">🔍</span>
          </template>
        </n-input>

        <n-button
          size="small"
          quaternary
          class="text-gray-300 hover:text-white"
          title="全屏切换"
          @click="toggleFullScreen"
        >
          {{ isFullscreen ? '⛶ 退出全屏' : '⛶ 全屏' }}
        </n-button>
      </div>

      <!-- 移动端汉堡折叠按钮 -->
      <div class="flex md:hidden items-center gap-2">
        <n-button
          quaternary
          circle
          size="small"
          class="text-gray-200"
          @click="showMobileMenu = true"
        >
          <span class="text-lg">☰</span>
        </n-button>
      </div>
    </div>

    <!-- 移动端侧边抽屉导航 -->
    <n-drawer v-model:show="showMobileMenu" :width="260" placement="right">
      <n-drawer-content title="单机大厅导航" closable class="bg-[#0f1522] text-gray-200">
        <div class="flex flex-col gap-4 py-2">
          <n-input
            v-model:value="searchKeyword"
            placeholder="搜索单机游戏..."
            size="medium"
            class="mb-2"
            @keyup.enter="handleMobileSearch"
          />

          <router-link
            v-for="item in navLinks"
            :key="item.path"
            :to="item.path"
            class="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between text-decoration-none"
            :class="route.path === item.path ? 'text-blue-400 bg-blue-500/15' : 'text-gray-200 hover:bg-white/5'"
            @click="showMobileMenu = false"
          >
            <span>{{ item.label }}</span>
            <span class="text-xs text-gray-500">→</span>
          </router-link>

          <div class="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-400 leading-relaxed">
            <p>💡 提示：本平台所有游戏均为纯单机本地直接运行，无任何网络或账号依赖。</p>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const searchKeyword = ref('')
const showMobileMenu = ref(false)
const isFullscreen = ref(false)

const navLinks = [
  { label: '大厅首页', path: '/' },
  { label: '单机游戏库', path: '/library' },
  { label: '单机游戏文档', path: '/docs' },
  { label: '打包与运行说明', path: '/about' }
]

function handleSearch() {
  if (!searchKeyword.value.trim()) return
  router.push({ path: '/library', query: { q: searchKeyword.value.trim() } })
}

function handleMobileSearch() {
  handleSearch()
  showMobileMenu.value = false
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      isFullscreen.value = true
    }).catch(() => {})
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        isFullscreen.value = false
      }).catch(() => {})
    }
  }
}
</script>
