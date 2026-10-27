<template>
  <div class="celestial-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag :color="{ color: '#bc13fe', textColor: '#ffffff' }" size="small" round class="mb-2">Void Castle & Celestial Singularity</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-purple mb-2">虚空天体：次元之隙四阶与九大星体阵列</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        探索虚空城堡四层湮灭空间、五大始源元素共鸣，以及九大行星对战场环境的星体引力修正
      </p>
    </div>

    <!-- 次元之隙四大阶层 -->
    <div>
      <h2 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
        <span>🌀</span> 次元之隙四阶湮灭空间
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <n-card
          v-for="stg in voidStages"
          :key="stg.id"
          hoverable
          class="border border-purple-900/50 bg-[#15102a]/80 rounded-xl"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-base font-bold text-purple-300">{{ stg.name }}</span>
              <n-tag size="tiny" type="info">{{ stg.zoneType }}</n-tag>
            </div>
          </template>

          <div class="space-y-2 text-xs">
            <div class="text-gray-400">领域意境: <span class="text-gray-200">{{ stg.theme }}</span></div>
            <div class="text-red-400 font-medium">盘踞霸主: <span class="text-red-300 font-bold">{{ stg.boss }}</span></div>
            <p class="text-gray-400 leading-relaxed pt-2 border-t border-purple-950">{{ stg.desc }}</p>
          </div>
        </n-card>
      </div>
    </div>

    <!-- 五大始源元素 -->
    <div>
      <h2 class="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
        <span>💎</span> 五大始源水晶元素共鸣
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        <div
          v-for="el in fiveElements"
          :key="el.name"
          class="p-4 bg-slate-900/80 border border-slate-800 rounded-xl text-center space-y-1 hover:border-cyan-500/50 transition-all"
        >
          <div class="text-2xl">{{ el.symbol }}</div>
          <div class="text-base font-bold" :class="el.color">{{ el.name }}</div>
          <p class="text-[11px] text-gray-400 leading-tight">{{ el.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 九大太阳系星体引力修正 -->
    <div>
      <h2 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
        <span>🪐</span> 九大行星战场引力修正矩阵
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="p in solarPlanets"
          :key="p.name"
          class="p-3 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-yellow-300">{{ p.name }}</span>
            <n-tag size="tiny" type="warning">{{ p.element }}</n-tag>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">{{ p.effect }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { voidStages, solarPlanets, fiveElements } from '../config/celestialConfig'
</script>
