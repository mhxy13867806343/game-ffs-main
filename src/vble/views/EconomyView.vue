<template>
  <div class="economy-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="warning" size="small" round class="mb-2">Macro Economy & Alchemy Workshop</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-amber mb-2">宏观经济、七色尾巴兑换与药剂师调合</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        从全境五阶商业城邦贸易，到隐士洞窟的七色尾巴神器兑换，以及药剂师两两调合的质变炼金体系
      </p>
    </div>

    <!-- 七色尾巴神装兑换矩阵 -->
    <div>
      <h2 class="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
        <span>🦊</span> 七色尾巴神器传承矩阵 (Tail Seven Contracts)
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <n-card
          v-for="weapon in tailWeapons"
          :key="weapon.id"
          hoverable
          class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-base font-bold text-cyan-300">{{ weapon.name }}</span>
              <n-tag size="tiny" type="warning">{{ weapon.type }}</n-tag>
            </div>
          </template>

          <div class="space-y-2 text-xs">
            <div class="p-2 bg-amber-950/20 border border-amber-900/30 rounded text-amber-300">
              🦊 兑换所需素材: <strong>{{ weapon.tail_source }}</strong>
            </div>
            <div class="text-gray-300">
              <span class="text-gray-400">⚔️ 基础面板:</span> {{ weapon.stats }}
            </div>
            <div class="text-purple-300">
              <span class="text-gray-400">✨ 专属特效:</span> {{ weapon.effect }}
            </div>
            <p class="text-gray-400 leading-relaxed border-t border-slate-800 pt-2">{{ weapon.origin }}</p>
          </div>
        </n-card>
      </div>
    </div>

    <!-- 药剂师调合工坊 -->
    <n-card class="border border-slate-700/60 bg-[#121626]/90 rounded-xl" title="⚗️ 药剂师质变调合工坊 (Mix Calculator)">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="r in mixRecipes"
          :key="r.name"
          class="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2 hover:border-cyan-500/50 transition-all"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-amber-400">{{ r.name }}</span>
            <n-tag size="tiny" :type="r.tier === 'T4' ? 'error' : r.tier === 'T3' ? 'warning' : 'info'">{{ r.tier }}</n-tag>
          </div>
          <div class="text-xs text-cyan-300 font-mono">
            {{ r.itemA }} + {{ r.itemB }}
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">{{ r.effect }}</p>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'
import { mixRecipes } from '../config/mixRecipes'

const gameStore = useGameStore()
const tailWeapons = computed(() => gameStore.db.tail_weapons || [])
</script>
