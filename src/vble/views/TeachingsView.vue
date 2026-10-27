<template>
  <div class="teachings-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Sanctuary & Secret Masteries</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">秘传绝技：勇者圣所、米西迪亚与东洋忍法</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        探索勇者圣所真·舍身庇护、米西迪亚大魔道院时空禁术、东洋忍道五遁秘卷之全量导师试炼
      </p>
    </div>

    <!-- 分类筛选器 -->
    <div class="flex flex-wrap gap-2 justify-center" role="group" aria-label="秘传绝技分类">
      <n-button
        v-for="cat in categories"
        :key="cat.id"
        class="teaching-category-button"
        size="small"
        :aria-pressed="activeCategory === cat.id"
        :type="activeCategory === cat.id ? 'primary' : 'default'"
        secondary
        @click="activeCategory = cat.id"
      >
        {{ cat.name }}
      </n-button>
    </div>

    <!-- 技能卡片列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <n-card
        v-for="tech in filteredTeachings"
        :key="tech.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-cyan-300">{{ tech.name }}</span>
            <n-tag size="small" :type="tech.category === 'sanctuary' ? 'warning' : tech.category === 'mysidia' ? 'info' : 'error'">
              {{ tech.categoryName }}
            </n-tag>
          </div>
        </template>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center text-xs text-gray-400 bg-slate-900/60 p-2 rounded">
            <span>传授导师: <strong class="text-gray-200">{{ tech.mentor }}</strong></span>
            <span>消耗代价: <strong class="text-amber-400">{{ tech.cost }}</strong></span>
          </div>

          <div class="p-3 bg-slate-900/80 rounded border border-slate-800">
            <div class="text-xs text-cyan-400 font-semibold mb-1">⚡ 绝技实战效能:</div>
            <div class="text-xs text-gray-300 leading-relaxed">{{ tech.effect }}</div>
          </div>

          <div class="text-xs text-purple-300/80 italic border-l-2 border-purple-500/50 pl-2">
            "{{ tech.lore }}"
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { teachingsList } from '../config/teachingsConfig'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: '全部秘传绝技' },
  { id: 'sanctuary', name: '勇者圣所庇护法' },
  { id: 'mysidia', name: '米西迪亚高级禁术' },
  { id: 'ninja', name: '东洋忍者遁术秘传' }
]

const filteredTeachings = computed(() => {
  if (activeCategory.value === 'all') return teachingsList
  return teachingsList.filter(t => t.category === activeCategory.value)
})
</script>

<style scoped>
.teaching-category-button:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 2px;
}
</style>
