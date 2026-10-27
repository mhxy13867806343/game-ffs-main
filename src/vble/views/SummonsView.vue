<template>
  <div class="summons-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Ancient Celestial Summons</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">幻兽与召唤神殿：十二柱神明契约</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        从巴哈姆特亿万核爆、利维亚桑灭世海啸、奥丁一分钟限时斩铁试炼，到不死鸟复活余烬契约
      </p>
    </div>

    <!-- 召唤兽卡片网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <n-card
        v-for="s in summons"
        :key="s.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ s.icon }}</span>
              <span class="text-base font-bold text-amber-300">{{ s.name }}</span>
            </div>
            <n-tag size="tiny" type="warning">{{ s.cost }}</n-tag>
          </div>
        </template>

        <div class="space-y-3 text-xs">
          <div class="flex justify-between items-center text-gray-300">
            <span>属性类别: <strong class="text-cyan-300">{{ s.element }}</strong></span>
            <n-tag size="tiny" type="info">{{ s.rank }}</n-tag>
          </div>

          <div class="p-2.5 bg-slate-900/80 rounded border border-slate-800 space-y-1">
            <div class="text-amber-400 font-bold">⚡ 必杀神技: {{ s.skill_name }}</div>
            <p class="text-gray-300 leading-relaxed">{{ s.skill_desc }}</p>
          </div>

          <div class="p-2 bg-purple-950/20 border border-purple-900/30 rounded text-purple-300">
            🌟 契约被动庇护: {{ s.passive_blessing }}
          </div>

          <div class="text-gray-400">
            📍 挑战秘境: <span class="text-gray-200">{{ s.trial_dungeon }}</span>
          </div>

          <p class="text-[11px] text-gray-400 italic border-l-2 border-slate-700 pl-2">
            "{{ s.lore }}"
          </p>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const summons = computed(() => gameStore.db.summons || [])
</script>
