<template>
  <div class="min-h-screen flex flex-col bg-[#0b0e14]">
    <!-- 大屏轮播展示 -->
    <HeroBanner :banners="bannerList" />

    <!-- 主体内容容器 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col gap-10">
      <!-- 单机运行特性简介横幅 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div class="bg-[#121824] border border-[#1e273b] rounded-xl p-3.5 sm:p-4 flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl shrink-0">
            ⚡
          </div>
          <div>
            <div class="text-xs sm:text-sm font-bold text-gray-200">纯本地单机</div>
            <div class="text-[11px] text-gray-400">零网络延迟，无任何联网请求</div>
          </div>
        </div>

        <div class="bg-[#121824] border border-[#1e273b] rounded-xl p-3.5 sm:p-4 flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl shrink-0">
            📦
          </div>
          <div>
            <div class="text-xs sm:text-sm font-bold text-gray-200">独立打包产物</div>
            <div class="text-[11px] text-gray-400">放入 public/games/ 即可自动接入</div>
          </div>
        </div>

        <div class="bg-[#121824] border border-[#1e273b] rounded-xl p-3.5 sm:p-4 flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl shrink-0">
            🎮
          </div>
          <div>
            <div class="text-xs sm:text-sm font-bold text-gray-200">全键鼠与触屏</div>
            <div class="text-[11px] text-gray-400">PC / 平板 / 手机响应式全适配</div>
          </div>
        </div>

        <div class="bg-[#121824] border border-[#1e273b] rounded-xl p-3.5 sm:p-4 flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl shrink-0">
            📖
          </div>
          <div>
            <div class="text-xs sm:text-sm font-bold text-gray-200">内置设计文档</div>
            <div class="text-[11px] text-gray-400">48关世界观、数值与图鉴设定</div>
          </div>
        </div>
      </div>

      <!-- 单机游戏矩阵板块 -->
      <section>
        <!-- 标题与分类过滤 -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c2538]">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-6 rounded bg-blue-500"></div>
            <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide">
              单机游戏矩阵
            </h2>
            <span class="text-xs text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full">
              共 {{ filteredGames.length }} 款
            </span>
          </div>

          <!-- 响应式分类 Pills -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              v-for="cat in categories"
              :key="cat.key"
              class="px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 border"
              :class="currentCategory === cat.key ? 'bg-blue-600 text-white border-blue-500 shadow-sm' : 'bg-[#121824] text-gray-400 border-[#20293d] hover:text-gray-200'"
              @click="currentCategory = cat.key"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <!-- 游戏卡片网格响应式：移动1-2列，平板2-3列，桌面3-4列 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          <GameCard
            v-for="game in filteredGames"
            :key="game.id"
            :game="game"
          />
        </div>
      </section>

      <!-- 单机游戏设计文档推介专区 -->
      <section class="bg-gradient-to-r from-[#121927] to-[#172033] border border-[#232e44] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div class="flex flex-col gap-2 max-w-2xl text-center md:text-left">
          <div class="inline-flex items-center gap-2 self-center md:self-start px-2.5 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <span>📚 官方单机设计规范与关卡文档</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-white">
            《裂空之羽》单机 2D 飞行射击与角色养成全案设计文档
          </h3>
          <p class="text-xs sm:text-sm text-gray-400 leading-relaxed">
            涵盖云垣大陆七色光谱世界观、全 8 章 48 关卡机制、本地双人操作手感调校、Boss 属性与掉落全图鉴，纯离线单机设定。
          </p>
        </div>

        <div class="shrink-0 flex items-center gap-3">
          <router-link to="/docs">
            <n-button type="primary" size="large" class="font-bold px-6">
              查阅设计文档 ➔
            </n-button>
          </router-link>
        </div>
      </section>
    </main>

    <!-- 底部页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HeroBanner from '@/components/HeroBanner.vue'
import GameCard from '@/components/GameCard.vue'
import AppFooter from '@/components/AppFooter.vue'
import { bannerList, gameList } from '@/data/games'
import type { GameCategory } from '@/types/game'

const currentCategory = ref<GameCategory>('all')

const categories = [
  { key: 'all' as GameCategory, label: '全部单机' },
  { key: 'racing' as GameCategory, label: '单机竞速' },
  { key: 'rpg' as GameCategory, label: '单机回合' },
  { key: 'strategy' as GameCategory, label: '策略探索' },
  { key: 'casual' as GameCategory, label: '休闲街机' }
]

const filteredGames = computed(() => {
  if (currentCategory.value === 'all') {
    return gameList
  }
  return gameList.filter(g => g.category === currentCategory.value)
})
</script>
