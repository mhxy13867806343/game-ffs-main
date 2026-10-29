<template>
  <div class="sidequest-detail-page p-3 sm:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/sidequests">
          <n-button type="warning" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回支线任务列表
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-amber-300">支线任务独立侦测详单</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-cyan-300 font-bold">{{ quest?.title || '未知支线' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/40">
          VBLE SIDEQUEST DOSSIER v2.2.350
        </span>
      </div>
    </div>

    <!-- 未找到提示 -->
    <div v-if="!quest" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到指定支线任务档案</h2>
      <p class="text-sm text-slate-300 mb-4">该委托任务未在当前世界线中触发，请核对任务代号。</p>
      <router-link to="/vble/sidequests">
        <n-button type="primary" round>返回支线总览</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 主委托头图名片卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/70 to-slate-900 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.18)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                {{ quest.type || '正式支线' }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">
                委托区域: {{ quest.region }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-emerald-300 text-xs border border-slate-700">
                状态: {{ quest.status }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ quest.title }}</span>
            </h1>

            <p class="text-base text-amber-200/90 italic border-l-2 border-amber-400 pl-3 py-0.5">
              触发前置: {{ quest.trigger }}
            </p>

            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
              {{ quest.desc }}
            </p>
          </div>

          <!-- 右侧奖励标牌 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[240px]">
            <div>
              <div class="text-xs text-slate-400">委托完成酬劳与装备</div>
              <div class="text-sm font-bold text-amber-300 mt-0.5 leading-relaxed">{{ quest.reward }}</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">底层事务隔离契约</div>
              <div class="text-xs text-cyan-300 mt-0.5 leading-relaxed">{{ quest.validation }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 任务流程与追踪指导沙盘 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧 2 列: 执行步骤与通关指南 -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>📜</span> 委托执行脉络与闭环验收
            </h2>
            <span class="text-xs text-amber-300 font-mono">Workflow &amp; Verification</span>
          </div>

          <!-- 3 阶段流程卡片 -->
          <div class="space-y-3">
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-cyan-300">阶段一：前置剧情触发与接取</span>
                <span class="text-[10px] text-emerald-400 font-mono">PHASE 01</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                {{ quest.trigger }}
              </p>
            </div>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300">阶段二：专属魔物交战或调查搜寻</span>
                <span class="text-[10px] text-amber-400 font-mono">PHASE 02</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                前往 {{ quest.region }} 标记处，击败任务专属明怪或搜集对应关键道具。普通遭遇战不计入进度。
              </p>
            </div>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-purple-300">阶段三：返回交付与正式结算</span>
                <span class="text-[10px] text-purple-400 font-mono">PHASE 03</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                一次性提交任务信物，触发正式结算日志写入，获得 {{ quest.reward }}。
              </p>
            </div>
          </div>
        </div>

        <!-- 右侧 1 列: 快速索引与支线列表 -->
        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-4">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>🗺️</span> 秘境城镇地图联动
            </h2>
            <p class="text-xs text-slate-300 leading-relaxed">
              可直接在秘境城镇地图上查阅任务发起 NPC 与专属魔物的出没地点。
            </p>
            <router-link to="/vble/scenes">
              <n-button block type="info" round secondary>
                在场景城镇中定位 →
              </n-button>
            </router-link>
          </div>

          <!-- 快速跳转至其他支线 -->
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>📋</span> 全域支线档案索引
            </h2>
            <div class="space-y-1.5 max-h-64 overflow-y-auto">
              <div
                v-for="q in allSidequests"
                :key="q.id"
                class="p-2 rounded-lg transition-colors flex items-center justify-between"
                :class="q.id === quest.id ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40' : 'hover:bg-slate-800 text-slate-300'"
              >
                <router-link :to="'/vble/sidequests/' + q.id" class="text-xs block truncate max-w-[180px]">
                  {{ q.title }}
                </router-link>
                <span class="text-[10px] text-cyan-300 font-mono">{{ q.type }}</span>
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

const route = useRoute()
const questId = computed(() => (route.params.id as string) || '')

const allSidequests = computed(() => GAME_DATABASE.sidequests || [])

const quest = computed(() => {
  return allSidequests.value.find((q: any) => q.id === questId.value)
})
</script>

<style scoped>
</style>
