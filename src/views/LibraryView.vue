<template>
  <div class="min-h-screen flex flex-col bg-[#0b0e14]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
      <!-- 页面标题 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white tracking-wide">
            单机游戏库
          </h1>
          <p class="text-xs sm:text-sm text-gray-400 mt-1">
            聚合所有本地打包单机作品，支持离线免网畅玩与直达打包路径
          </p>
        </div>

        <div class="w-full sm:w-64">
          <n-input
            v-model:value="searchQuery"
            placeholder="搜索单机游戏名称 / 标签..."
            clearable
          >
            <template #prefix>
              <span class="text-gray-400 text-xs">🔍</span>
            </template>
          </n-input>
        </div>
      </div>

      <!-- 过滤栏 -->
      <div class="bg-[#121824] border border-[#1e273a] rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        <!-- 分类选择 -->
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xs text-gray-400 mr-1">分类：</span>
          <button
            v-for="cat in categories"
            :key="cat.key"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-colors border"
            :class="selectedCategory === cat.key ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#0f1420] text-gray-400 border-[#222d42] hover:text-white'"
            @click="selectedCategory = cat.key"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- 状态选择 -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400 mr-1">状态：</span>
          <n-radio-group v-model:value="statusFilter" size="small">
            <n-radio-button value="all">全部</n-radio-button>
            <n-radio-button value="ready">仅已就绪</n-radio-button>
          </n-radio-group>
        </div>
      </div>

      <!-- 游戏列表卡片网格 -->
      <div v-if="filteredGames.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <GameCard
          v-for="game in filteredGames"
          :key="game.id"
          :game="game"
        />
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-16 bg-[#121824] rounded-2xl border border-[#1e273a] text-gray-400">
        <div class="text-3xl mb-2">🕹</div>
        <div class="text-sm">未找到匹配的单机游戏</div>
        <n-button class="mt-4" size="small" @click="resetFilters">重置筛选条件</n-button>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import GameCard from '@/components/GameCard.vue'
import AppFooter from '@/components/AppFooter.vue'
import { gameList } from '@/data/games'
import type { GameCategory } from '@/types/game'

const route = useRoute()
const searchQuery = ref((route.query.q as string) || '')
const selectedCategory = ref<GameCategory>('all')
const statusFilter = ref<'all' | 'ready'>('all')

const categories = [
  { key: 'all' as GameCategory, label: '全部' },
  { key: 'racing' as GameCategory, label: '单机竞速' },
  { key: 'rpg' as GameCategory, label: '单机回合' },
  { key: 'strategy' as GameCategory, label: '策略探索' },
  { key: 'casual' as GameCategory, label: '休闲街机' }
]

const filteredGames = computed(() => {
  return gameList.filter(game => {
    // 搜索匹配
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase()
      const matchTitle = game.title.toLowerCase().includes(q)
      const matchSub = game.subtitle.toLowerCase().includes(q)
      const matchTag = game.tags.some(t => t.toLowerCase().includes(q))
      if (!matchTitle && !matchSub && !matchTag) return false
    }

    // 分类匹配
    if (selectedCategory.value !== 'all' && game.category !== selectedCategory.value) {
      return false
    }

    // 状态匹配
    if (statusFilter.value === 'ready' && !game.isReady) {
      return false
    }

    return true
  })
})

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  statusFilter.value = 'all'
}
</script>
