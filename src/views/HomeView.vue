<template>
  <div class="min-h-screen flex flex-col bg-[#0b0e14]">
    <!-- 顶部焦点轮播 -->
    <HeroBanner :games="gameList" />

    <!-- 游戏列表主区域 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col gap-6">
      <!-- 标题与分类筛选栏 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c2538]">
        <div class="flex items-center gap-3">
          <div class="w-2.5 h-6 rounded bg-blue-500"></div>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide">
            游戏列表
          </h2>
          <span class="text-xs text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full">
            共 {{ filteredGames.length }} 款
          </span>
        </div>

        <!-- 响应式分类 Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-3.5 py-1 rounded-full text-xs font-medium transition-all shrink-0 border cursor-pointer"
            :class="selectedCategory === cat ? 'bg-blue-600 text-white border-blue-500 shadow-sm' : 'bg-[#121824] text-gray-400 border-[#20293d] hover:text-gray-200'"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- 响应式卡片网格 -->
      <div v-if="filteredGames.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <GameCard
          v-for="game in filteredGames"
          :key="game.id"
          :game="game"
        />
      </div>

      <div v-else class="text-center py-16 text-gray-400 bg-[#121824] rounded-xl border border-[#1e273a]">
        未找到符合条件的游戏
      </div>
    </main>

    <!-- 极简页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HeroBanner from '@/components/HeroBanner.vue'
import GameCard from '@/components/GameCard.vue'
import AppFooter from '@/components/AppFooter.vue'
import { gameList } from '@/data/games'

const props = defineProps<{
  searchQuery?: string
}>()

const selectedCategory = ref('全部')

const categories = ['全部', '竞速', '策略', 'RPG', '休闲']

const filteredGames = computed(() => {
  return gameList.filter(game => {
    // 分类匹配
    if (selectedCategory.value !== '全部' && game.category !== selectedCategory.value) {
      return false
    }

    // 搜索匹配
    if (props.searchQuery && props.searchQuery.trim()) {
      const q = props.searchQuery.trim().toLowerCase()
      const matchTitle = game.title.toLowerCase().includes(q)
      const matchSub = game.subtitle.toLowerCase().includes(q)
      const matchTag = game.tags.some(t => t.toLowerCase().includes(q))
      if (!matchTitle && !matchSub && !matchTag) return false
    }

    return true
  })
})
</script>
