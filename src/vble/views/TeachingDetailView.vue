<template>
  <div class="teaching-detail-page p-3 sm:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/teachings">
          <n-button type="info" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回秘传绝技列表
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-cyan-300">绝技秘传独立研习详单</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-amber-300 font-bold">{{ teaching?.name || '未知秘传' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40">
          VBLE SECRET TEACHING v2.2.350
        </span>
      </div>
    </div>

    <!-- 未找到提示 -->
    <div v-if="!teaching" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到指定秘传绝技档案</h2>
      <p class="text-sm text-slate-300 mb-4">该绝技尚未在四大名门学院中收录，请核对绝技编号。</p>
      <router-link to="/vble/teachings">
        <n-button type="primary" round>返回秘传总览</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 主秘传头图名片卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.18)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                {{ teaching.categoryName }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 text-xs font-mono border border-slate-700">
                导师: {{ teaching.mentor }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-rose-300 text-xs border border-slate-700">
                消耗: {{ teaching.cost }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-emerald-300 text-xs border border-slate-700">
                速度: {{ teaching.castSpeed }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ teaching.name }}</span>
            </h1>

            <p class="text-base text-cyan-200/90 italic border-l-2 border-cyan-400 pl-3 py-0.5">
              招式特效: {{ teaching.effect }}
            </p>

            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
              {{ teaching.lore }}
            </p>
          </div>

          <!-- 右侧伤害公式与战术定式 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[240px]">
            <div>
              <div class="text-xs text-slate-400">实战数值伤害解算公式</div>
              <div class="text-xs font-mono font-bold text-amber-300 mt-0.5 leading-relaxed bg-slate-900 p-2 rounded border border-slate-800">{{ teaching.formula }}</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">官方战术克制与破阵思路</div>
              <div class="text-xs text-emerald-300 mt-0.5 leading-relaxed">{{ teaching.tactics }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速跳转至其他秘传 -->
      <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-3">
        <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>⚡</span> 全秘传绝技索引目录
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="t in allTeachings"
            :key="t.id"
            class="p-3 rounded-xl border transition-all"
            :class="t.id === teaching.id ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300' : 'bg-slate-950 border-slate-800 hover:border-slate-700'"
          >
            <router-link :to="'/vble/teachings/' + t.id" class="text-xs font-bold block truncate text-amber-300 mb-1">
              {{ t.name }}
            </router-link>
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>{{ t.categoryName }}</span>
              <span class="text-cyan-300 font-mono">{{ t.cost }}</span>
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
import { teachingsList, type TeachingItem } from '../config/teachingsConfig'

const route = useRoute()
const teachingId = computed(() => (route.params.id as string) || '')

const allTeachings = computed<TeachingItem[]>(() => teachingsList)

const teaching = computed<TeachingItem | null>(() => {
  return teachingsList.find(t => t.id === teachingId.value) || null
})
</script>

<style scoped>
</style>
