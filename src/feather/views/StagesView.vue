<template>
  <div class="content-container py-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <div class="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
          <span>🌈</span>
          <span>STORY & LEVEL ARCHIVE · 全 8 章 48 关全集</span>
        </div>
        <h1 class="text-3xl font-black text-white">七色光谱主线战役</h1>
      </div>

      <!-- Filters & Search -->
      <div class="flex flex-wrap items-center gap-3">
        <input
          v-model="searchKey"
          type="text"
          placeholder="搜索关卡名称、Boss 或掉落..."
          class="bg-[#101726] border border-[#22314a] focus:border-amber-400 text-white placeholder-gray-500 text-xs px-3.5 py-2 rounded-xl outline-none w-64 transition-colors"
        />

        <div class="flex bg-[#101726] border border-[#22314a] p-1 rounded-xl text-xs">
          <button
            v-for="type in filterTypes"
            :key="type.value"
            @click="selectedType = type.value"
            class="px-3 py-1 rounded-lg transition-colors"
            :class="selectedType === type.value ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-400 hover:text-white'"
          >
            {{ type.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Chapter Selector Tabs -->
    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
      <button
        v-for="ch in CHAPTERS_DATA"
        :key="ch.id"
        @click="activeChapterId = ch.id"
        class="p-3 rounded-xl border text-left transition-all flex flex-col justify-between"
        :class="activeChapterId === ch.id
          ? 'bg-[#152035] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-[1.02]'
          : 'bg-[#0e1524] border-[#1f2a40] hover:border-gray-600 opacity-80 hover:opacity-100'"
      >
        <div class="flex items-center justify-between mb-1.5">
          <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: ch.color, boxShadow: `0 0 6px ${ch.color}` }"></span>
          <span class="text-[10px] text-gray-400 font-mono">{{ ch.levelRange }}</span>
        </div>
        <div class="text-xs font-bold text-white mb-0.5 line-clamp-1">{{ ch.name }}</div>
        <div class="text-[10px] text-gray-400 line-clamp-1">{{ ch.theme }}</div>
      </button>
    </div>

    <!-- Current Chapter Info Banner -->
    <div
      v-if="currentChapter"
      class="p-6 rounded-2xl border mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      :style="{ borderColor: `${currentChapter.color}50`, backgroundColor: `${currentChapter.color}0a` }"
    >
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-xs font-bold text-white" :style="{ backgroundColor: currentChapter.color }">
            {{ currentChapter.colorName }}
          </span>
          <span class="text-xs text-gray-400 font-mono">关卡范围: {{ currentChapter.levelRange }} · 推荐等级: {{ currentChapter.recommendLevel }}</span>
        </div>
        <h2 class="text-2xl font-extrabold text-white">
          {{ currentChapter.name }}
        </h2>
        <p class="text-sm text-gray-300">
          主题: {{ currentChapter.theme }} ｜ {{ currentChapter.subTheme }}
        </p>
      </div>

      <div class="bg-black/40 border border-white/10 px-5 py-3 rounded-xl flex items-center gap-4">
        <div class="text-3xl">👑</div>
        <div>
          <div class="text-[11px] text-gray-400">章节终极主 Boss:</div>
          <div class="text-base font-bold text-amber-300">{{ currentChapter.boss }}</div>
        </div>
      </div>
    </div>

    <!-- Levels Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="lvl in filteredLevels"
        :key="lvl.code"
        class="p-5 rounded-2xl bg-[#0e1625] border border-[#1e2a42] hover:border-amber-400/50 transition-all flex flex-col justify-between group"
      >
        <div>
          <div class="flex items-center justify-between mb-3">
            <span
              class="px-2.5 py-1 rounded-lg text-xs font-black font-mono"
              :class="{
                'bg-red-500/20 text-red-400 border border-red-500/40': lvl.type === 'boss',
                'bg-purple-500/20 text-purple-400 border border-purple-500/40': lvl.type === 'elite',
                'bg-blue-500/20 text-blue-400 border border-blue-500/40': lvl.type === 'normal'
              }"
            >
              {{ lvl.code }} {{ lvl.type === 'boss' ? '【主Boss关】' : lvl.type === 'elite' ? '【精英关】' : '' }}
            </span>
            <span class="text-[11px] text-gray-400 font-mono">{{ lvl.recommendLevel }}</span>
          </div>

          <h3 class="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
            {{ lvl.name }}
          </h3>

          <div class="text-xs text-gray-300 mb-2">
            <span class="text-gray-400 font-medium">任务目标:</span> {{ lvl.target }}
          </div>

          <div v-if="lvl.boss" class="text-xs text-red-300 mb-2">
            <span class="text-red-400 font-medium">遭遇首领:</span> {{ lvl.boss }}
          </div>

          <p class="text-[11px] text-gray-400 leading-relaxed mb-4">
            <span class="text-gray-400 font-medium">关卡机制:</span> {{ lvl.features }}
          </p>
        </div>

        <div class="pt-3 border-t border-[#182335] text-[11px] text-amber-300/90 font-mono">
          🎁 奖励掉落: {{ lvl.drops }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CHAPTERS_DATA } from '../data/gameData'

const route = useRoute()
const initialChapter = Number(route.query.chapter) || 1
const activeChapterId = ref(initialChapter)
const selectedType = ref<'all' | 'normal' | 'elite' | 'boss'>('all')
const searchKey = ref('')

const filterTypes = [
  { label: '全部', value: 'all' as const },
  { label: '普通关', value: 'normal' as const },
  { label: '精英关', value: 'elite' as const },
  { label: 'Boss关', value: 'boss' as const }
]

const currentChapter = computed(() => {
  return CHAPTERS_DATA.find(c => c.id === activeChapterId.value) || CHAPTERS_DATA[0]
})

const filteredLevels = computed(() => {
  if (!currentChapter.value) return []
  return currentChapter.value.levels.filter(lvl => {
    const matchType = selectedType.value === 'all' || lvl.type === selectedType.value
    const matchSearch = !searchKey.value ||
      lvl.name.includes(searchKey.value) ||
      lvl.code.includes(searchKey.value) ||
      lvl.target.includes(searchKey.value) ||
      lvl.drops.includes(searchKey.value) ||
      (lvl.boss && lvl.boss.includes(searchKey.value))
    return matchType && matchSearch
  })
})
</script>
