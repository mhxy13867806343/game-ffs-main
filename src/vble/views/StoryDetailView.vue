<template>
  <div class="story-detail-page p-3 sm:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/story">
          <n-button type="primary" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回全域编年史
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-cyan-300">主线章节纪元档案</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-amber-300 font-bold">{{ chapter?.title || '未知章节' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40">
          VBLE CHRONICLE CHAPTER v2.2.348
        </span>
      </div>
    </div>

    <!-- 未找到提示 -->
    <div v-if="!chapter" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到指定剧情纪元</h2>
      <p class="text-sm text-slate-300 mb-4">该时间线章节尚未收录于当前世界线档案中。</p>
      <router-link to="/vble/story">
        <n-button type="primary" round>返回编年史列表</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 章节头图名片卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/70 to-slate-900 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.18)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                STAGE {{ chapter.index !== undefined ? chapter.index : 'HISTORIC' }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 text-xs border border-slate-700">
                推荐战力: {{ chapter.recommended_level || 'Lv 10 ~ 20' }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-emerald-300 text-xs border border-slate-700">
                出战阵营: {{ getPartyLabel(chapter.party) }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ chapter.title }}</span>
            </h1>

            <p class="text-base text-cyan-200/90 italic border-l-2 border-cyan-400 pl-3 py-0.5">
              {{ chapter.summary }}
            </p>

            <p class="text-sm text-slate-200 leading-relaxed pt-1">
              {{ chapter.overview || chapter.summary }}
            </p>
          </div>

          <!-- 右侧秘境与守关首领 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[220px]">
            <div>
              <div class="text-xs text-slate-400">关卡核心秘境</div>
              <div class="text-sm font-bold text-cyan-300 mt-0.5">{{ chapter.dungeon_name || '主线指定场景' }}</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">守关决战首领</div>
              <div class="text-sm font-bold text-rose-400 mt-0.5 flex items-center justify-start md:justify-end gap-1.5">
                <span>{{ chapter.boss_name || '未知强敌' }}</span>
                <router-link v-if="chapter.boss_id" :to="'/vble/boss-tactics/' + chapter.boss_id">
                  <n-button size="tiny" text type="error">攻坚对策 →</n-button>
                </router-link>
              </div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">通关晶石与战利品</div>
              <div class="text-xs text-amber-300 mt-0.5 font-bold">{{ chapter.rewards || '经验值与金币' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心节拍演进与世界线抉择 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧 2 列: 章节故事节拍与任务脉络 -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>📜</span> 章节剧情节拍与任务演进脉络
            </h2>
            <span class="text-xs text-cyan-300 font-mono">Narrative Beats Progression</span>
          </div>

          <!-- 节拍时间线流水 -->
          <div class="space-y-3">
            <div
              v-for="beat in relatedStoryBeats"
              :key="beat.id"
              class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs">
                    ACT {{ beat.actNumber }}
                  </span>
                  <span class="text-sm font-bold text-white">{{ beat.title }}</span>
                </div>
                <span class="text-xs text-amber-300 font-bold">目标: {{ beat.action }}</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">{{ beat.details }}</p>
              <div class="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                <span>📍 地点: {{ beat.mapName }} {{ beat.coords }}</span>
                <span class="text-emerald-400">🛡️ 保护机制: {{ beat.guardStatus }}</span>
              </div>
            </div>

            <!-- 兜底展示默认叙事段落 -->
            <div v-if="relatedStoryBeats.length === 0" class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-amber-300 mb-1">【世界线编年史官方叙事记录】</div>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {{ chapter.overview || chapter.summary }}
              </p>
            </div>
          </div>
        </div>

        <!-- 右侧 1 列: 登场核心英雄与关联跳转 -->
        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-4">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>👥</span> 本纪元核心登场英雄
            </h2>
            <div class="space-y-3">
              <div
                v-for="hero in castHeroes"
                :key="hero.id"
                class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div class="text-sm font-bold text-amber-300">{{ hero.name }}</div>
                  <div class="text-xs text-slate-400 mt-0.5">{{ hero.title }}</div>
                </div>
                <router-link :to="'/vble/characters/' + hero.id">
                  <n-button size="tiny" round secondary type="warning">英雄详情 →</n-button>
                </router-link>
              </div>
            </div>
          </div>

          <!-- 快速跳转至其他章节 -->
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>📖</span> 全域章节索引
            </h2>
            <div class="space-y-1.5 max-h-60 overflow-y-auto">
              <div
                v-for="ch in allChapters"
                :key="ch.id"
                class="p-2 rounded-lg transition-colors flex items-center justify-between"
                :class="ch.id === chapter.id ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40' : 'hover:bg-slate-800 text-slate-300'"
              >
                <router-link :to="'/vble/story/' + ch.id" class="text-xs block truncate max-w-[200px]">
                  {{ ch.title }}
                </router-link>
                <span class="text-[10px] text-slate-400 font-mono">{{ ch.recommended_level }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { GAME_DATABASE } from '../data/gameDatabase'
import { mainStoryBeatsList } from '../config/mainStoryBeatsConfig'

const route = useRoute()
const chapterId = computed(() => (route.params.id as string) || '')

const allChapters = computed(() => GAME_DATABASE.chapters || [])

const chapter = computed(() => {
  return allChapters.value.find((c: any) => c.id === chapterId.value || String(c.index) === chapterId.value)
})

const getPartyLabel = (party: string) => {
  if (party === 'opening_light' || party === 'light') return '光之战士小队 (晨辉)'
  if (party === 'dark') return '暗之战士小队 (永曜)'
  return '光暗命运交织 (全队联动)'
}

const relatedStoryBeats = computed(() => {
  if (!chapter.value) return []
  const ch = chapter.value
  const chKey = ch.id ? ch.id.split('_')[0] : ''
  return mainStoryBeatsList.filter(b => (chKey && b.id.startsWith(chKey)) || b.act.includes(ch.title.substring(0, 3)))
})

const castHeroes = computed(() => {
  if (!chapter.value) return []
  const cid = chapter.value.id
  return (GAME_DATABASE.characters || []).filter((char: any) => {
    return (char.chapters || []).some((ch: any) => ch.id === cid)
  })
})
</script>

<style scoped>
</style>
