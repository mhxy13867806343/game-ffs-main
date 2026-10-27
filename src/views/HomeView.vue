<template>
  <div class="min-h-screen flex flex-col bg-[#0b0e14]">
    <!-- 主体区域 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col gap-10">
      <!-- 板块一：游戏列表 -->
      <section>
        <div class="flex items-center justify-between gap-4 pb-4 border-b border-[#1c2538] mb-6">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-6 rounded bg-blue-500"></div>
            <h1 class="text-xl sm:text-2xl font-black text-white tracking-wide">
              游戏列表
            </h1>
            <span class="text-xs text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full font-mono">
              共 {{ filteredGames.length }} 款
            </span>
          </div>
        </div>

        <!-- 响应式游戏卡片网格 -->
        <div v-if="filteredGames.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <GameCard
            v-for="game in filteredGames"
            :key="game.id"
            :game="game"
          />
        </div>

        <div v-else class="text-center py-12 text-gray-400 bg-[#121824] rounded-xl border border-[#1e273a]">
          未找到匹配的游戏
        </div>
      </section>

      <!-- 板块二：游戏文档 -->
      <section>
        <div class="flex items-center justify-between gap-4 pb-4 border-b border-[#1c2538] mb-6">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-6 rounded bg-emerald-500"></div>
            <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide">
              游戏文档
            </h2>
            <span class="text-xs text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full font-mono">
              共 {{ filteredDocs.length }} 篇
            </span>
          </div>
        </div>

        <!-- 响应式文档卡片网格 -->
        <div v-if="filteredDocs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <DocCard
            v-for="doc in filteredDocs"
            :key="doc.id"
            :doc="doc"
          />
        </div>

        <div v-else class="text-center py-12 text-gray-400 bg-[#121824] rounded-xl border border-[#1e273a]">
          未找到匹配的文档
        </div>
      </section>
    </main>

    <!-- 极简页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GameCard from '@/components/GameCard.vue'
import DocCard from '@/components/DocCard.vue'
import AppFooter from '@/components/AppFooter.vue'
import { gameList, docList } from '@/data/games'

const props = defineProps<{
  searchQuery?: string
}>()

const filteredGames = computed(() => {
  if (!props.searchQuery || !props.searchQuery.trim()) {
    return gameList
  }
  const q = props.searchQuery.trim().toLowerCase()
  return gameList.filter(g => g.title.toLowerCase().includes(q) || g.subtitle.toLowerCase().includes(q))
})

const filteredDocs = computed(() => {
  if (!props.searchQuery || !props.searchQuery.trim()) {
    return docList
  }
  const q = props.searchQuery.trim().toLowerCase()
  return docList.filter(d => d.title.toLowerCase().includes(q) || d.subtitle.toLowerCase().includes(q))
})
</script>
