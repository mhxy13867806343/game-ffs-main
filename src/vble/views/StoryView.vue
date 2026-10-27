<template>
  <div class="story-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Thirty Chapters Epic Chronicles & Navigation</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">史诗编年史：光与暗双线三十章节全景</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        纵览从始源神殿晶石裂解、光暗双线各自探索、到全 44 节拍主线全域雷达导航与居民标记系统
      </p>
    </div>

    <!-- 主模式切换：三十章剧情编年 VS 44节拍实装雷达导航 -->
    <div class="flex justify-center">
      <div class="inline-flex p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 gap-2">
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer border select-none flex items-center gap-2"
          :class="viewMode === 'lore'
            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.45)]'
            : 'bg-transparent text-gray-300 border-transparent hover:(text-white bg-slate-800)'"
          @click="viewMode = 'lore'"
        >
          <span>📖</span>
          <span>三十章节史诗编年全览</span>
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer border select-none flex items-center gap-2"
          :class="viewMode === 'radar'
            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.45)]'
            : 'bg-transparent text-gray-300 border-transparent hover:(text-white bg-slate-800)'"
          @click="viewMode = 'radar'"
        >
          <span>🧭</span>
          <span>实装 44 节拍主线雷达导航</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-600 text-white animate-pulse">NEW</span>
        </button>
      </div>
    </div>

    <!-- 模式 A：三十章节编年史 -->
    <div v-if="viewMode === 'lore'" class="space-y-6">
      <!-- 篇章阵营过滤 -->
      <div class="flex flex-wrap gap-2 justify-center" role="group" aria-label="按篇章阵营筛选">
        <n-button
          v-for="p in parties"
          :key="p.id"
          size="small"
          class="party-filter"
          :type="selectedParty === p.id ? 'primary' : 'default'"
          :aria-pressed="selectedParty === p.id"
          secondary
          @click="selectedParty = p.id"
        >
          {{ p.name }}
        </n-button>
      </div>

      <!-- 章节时间轴卡片 -->
      <div class="space-y-4">
        <n-card
          v-for="ch in filteredChapters"
          :key="ch.id"
          hoverable
          class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-xs px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 font-bold font-mono">
                  ACT.{{ ch.index }}
                </span>
                <span class="text-lg font-bold text-gray-100">{{ ch.title }}</span>
                <n-tag size="tiny" :type="getPartyTag(ch.party)">{{ getPartyLabel(ch.party) }}</n-tag>
              </div>
              <p class="text-xs text-gray-400">{{ ch.summary }}</p>
              <div class="text-xs text-gray-300 bg-slate-900/60 p-2.5 rounded border border-slate-800 leading-relaxed">
                {{ ch.overview }}
              </div>
            </div>

            <div class="flex-shrink-0 space-y-1.5 p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-right min-w-[200px]">
              <div class="text-gray-400">⚔️ 首领: <strong class="text-red-400">{{ ch.boss_name }}</strong></div>
              <div class="text-gray-400">🏰 发生地: <strong class="text-cyan-300">{{ ch.dungeon_name }}</strong></div>
              <div class="text-gray-400">⚡ 建议: <strong class="text-amber-300">{{ ch.recommended_level }}</strong></div>
              <div class="text-yellow-300/90 text-[11px] pt-1 border-t border-slate-800 truncate">
                🎁 {{ ch.rewards }}
              </div>
            </div>
          </div>
        </n-card>
      </div>
    </div>

    <!-- 模式 B：44 节拍主线目标雷达导航 -->
    <div v-else class="space-y-6">
      <!-- 概览指标卡 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div class="text-xs text-gray-400">主线节拍覆盖</div>
          <div class="text-2xl font-black text-cyan-400 font-mono mt-1">44 节拍</div>
          <div class="text-[10px] text-gray-500 mt-0.5">ch00 ~ ch12 全域联动</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div class="text-xs text-gray-400">真实居民标记</div>
          <div class="text-2xl font-black text-emerald-400 font-mono mt-1">{{ residentMarkerCount }} 处</div>
          <div class="text-[10px] text-gray-500 mt-0.5">挂载 ResidentSourceRegistry</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div class="text-xs text-gray-400">来源生命周期</div>
          <div class="text-2xl font-black text-amber-400 font-mono mt-1">弱引用隔离</div>
          <div class="text-[10px] text-gray-500 mt-0.5">零静态强引用泄漏</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div class="text-xs text-gray-400">状态机安全门禁</div>
          <div class="text-2xl font-black text-purple-400 font-mono mt-1">严格纯读</div>
          <div class="text-[10px] text-gray-500 mt-0.5">对白/菜单/过场瞬时阻断</div>
        </div>
      </div>

      <!-- 筛选与搜索工具栏 -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121626]/80 border border-slate-800">
        <div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            v-for="st in beatStageFilters"
            :key="st.key"
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border select-none whitespace-nowrap"
            :class="activeStageFilter === st.key
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.45)]'
              : 'bg-slate-800 text-gray-200 border-slate-700 hover:(bg-slate-700 text-white)'"
            @click="activeStageFilter = st.key"
          >
            <span>{{ st.label }}</span>
            <span class="ml-1 text-[10px] opacity-80 font-mono">({{ getStageCount(st.key) }})</span>
          </button>
        </div>
        <div class="w-full sm:w-72">
          <n-input
            v-model:value="beatSearchKeyword"
            placeholder="搜索节拍代号 / 场景 / 居民 / 动作..."
            clearable
            size="small"
          >
            <template #prefix>🔍</template>
          </n-input>
        </div>
      </div>

      <!-- 44 节拍卡片列表 -->
      <div v-if="filteredBeats.length > 0" class="space-y-4">
        <n-card
          v-for="beat in filteredBeats"
          :key="beat.id"
          hoverable
          class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
        >
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <!-- 左侧核心行动与场景 -->
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 font-bold font-mono">
                  {{ beat.id }}
                </span>
                <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-medium">
                  {{ beat.act }}
                </span>
                <span class="text-base sm:text-lg font-bold text-white">{{ beat.title }}</span>
                <n-tag size="tiny" :type="beat.hasResidentMarker ? 'success' : 'default'">
                  {{ beat.hasResidentMarker ? '居民实体授标' : '地标/剧情节点' }}
                </n-tag>
              </div>

              <div class="flex flex-wrap items-center gap-4 text-xs">
                <span class="text-gray-300">
                  🎯 目标行动: <strong class="text-cyan-400 font-semibold">{{ beat.action }}</strong>
                </span>
                <span class="text-gray-400">|</span>
                <span class="text-gray-300">
                  📍 所在场景: <strong class="text-amber-300 font-semibold">{{ beat.mapName }}</strong>
                  <span class="text-[11px] font-mono text-gray-500 ml-1">({{ beat.mapId }})</span>
                </span>
              </div>

              <p class="text-xs text-gray-300 bg-slate-900/60 p-2.5 rounded border border-slate-800 leading-relaxed">
                {{ beat.details }}
              </p>
            </div>

            <!-- 右侧技术规约与坐标雷达 -->
            <div class="flex-shrink-0 space-y-1.5 p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-left lg:text-right min-w-[260px]">
              <div class="flex items-center lg:justify-end gap-1.5">
                <span class="text-gray-400">现场实体:</span>
                <strong :class="beat.hasResidentMarker ? 'text-emerald-400' : 'text-gray-400'">
                  {{ beat.residentName ? `${beat.residentName} (${beat.residentNpcId || '匿名居民'})` : '无固定居民 (保持null)' }}
                </strong>
              </div>
              <div class="flex items-center lg:justify-end gap-1.5">
                <span class="text-gray-400">实机世界坐标:</span>
                <strong class="text-cyan-300 font-mono">{{ beat.coords }}</strong>
              </div>
              <div class="text-yellow-400/90 text-[11px] pt-1.5 border-t border-slate-800/80">
                🛡️ {{ beat.guardStatus }}
              </div>
            </div>
          </div>
        </n-card>
      </div>

      <!-- 搜索无结果兜底 -->
      <div v-else class="text-center py-12 bg-[#121626]/60 border border-slate-800 rounded-xl space-y-2">
        <span class="text-3xl block">🔍</span>
        <p class="text-gray-300 font-bold">暂无匹配的主线目标节拍</p>
        <p class="text-xs text-gray-500">可尝试重置阶段筛选或清除搜索关键词</p>
        <n-button size="small" type="primary" secondary @click="resetBeatSearch">重置筛选</n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { mainStoryBeatsList } from '../config/mainStoryBeatsConfig'
import type { MainStoryBeat } from '../config/mainStoryBeatsConfig'

const gameStore = useGameStore()
const chapters = computed(() => gameStore.db.chapters || [])

const viewMode = ref<'lore' | 'radar'>('lore')
const selectedParty = ref('all')

const parties = [
  { id: 'all', name: '全章节编年史' },
  { id: 'light', name: '光之阵容探索' },
  { id: 'dark', name: '暗之囚徒破局' },
  { id: 'both', name: '双界交汇与终焉决战' }
]

const filteredChapters = computed(() => {
  if (selectedParty.value === 'all') return chapters.value
  return chapters.value.filter((c: any) => {
    if (selectedParty.value === 'light') return c.party?.includes('light')
    if (selectedParty.value === 'dark') return c.party?.includes('dark')
    if (selectedParty.value === 'both') return c.party?.includes('both') || c.party?.includes('opening')
    return true
  })
})

const getPartyLabel = (party: string) => {
  if (party?.includes('light')) return '光之队'
  if (party?.includes('dark')) return '暗之队'
  return '光暗交汇'
}

const getPartyTag = (party: string) => {
  if (party?.includes('light')) return 'success'
  if (party?.includes('dark')) return 'warning'
  return 'error'
}

// --- 44 节拍雷达导航逻辑 ---
const activeStageFilter = ref('all')
const beatSearchKeyword = ref('')

const beatStageFilters = [
  { key: 'all', label: '全部 44 节拍' },
  { key: 'early', label: '前期 (ch00-03)' },
  { key: 'middle', label: '中段 (ch04-07)' },
  { key: 'late', label: '晚期 (ch08-12)' },
  { key: 'marker', label: '仅居民实体Marker' }
]

const residentMarkerCount = computed(() => {
  return mainStoryBeatsList.filter(b => b.hasResidentMarker).length
})

const matchBeatStage = (beat: MainStoryBeat, key: string) => {
  if (key === 'all') return true
  if (key === 'early') return beat.stage === 'early'
  if (key === 'middle') return beat.stage === 'middle'
  if (key === 'late') return beat.stage === 'late'
  if (key === 'marker') return beat.hasResidentMarker
  return false
}

const getStageCount = (key: string) => {
  return mainStoryBeatsList.filter(b => matchBeatStage(b, key)).length
}

const filteredBeats = computed(() => {
  return mainStoryBeatsList.filter(beat => {
    if (!matchBeatStage(beat, activeStageFilter.value)) return false
    if (beatSearchKeyword.value.trim()) {
      const kw = beatSearchKeyword.value.trim().toLowerCase()
      const inId = beat.id.toLowerCase().includes(kw)
      const inTitle = beat.title.toLowerCase().includes(kw)
      const inAct = beat.act.toLowerCase().includes(kw)
      const inAction = beat.action.toLowerCase().includes(kw)
      const inMap = beat.mapName.toLowerCase().includes(kw) || beat.mapId.toLowerCase().includes(kw)
      const inResident = (beat.residentName || '').toLowerCase().includes(kw) || (beat.residentNpcId || '').toLowerCase().includes(kw)
      const inDetails = beat.details.toLowerCase().includes(kw)
      if (!inId && !inTitle && !inAct && !inAction && !inMap && !inResident && !inDetails) return false
    }
    return true
  })
})

const resetBeatSearch = () => {
  activeStageFilter.value = 'all'
  beatSearchKeyword.value = ''
}
</script>

<style scoped>
.party-filter:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 3px;
}
</style>
