<template>
  <div class="summon-detail-page p-3 sm:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/summons">
          <n-button type="warning" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回召唤兽矩阵
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-amber-300">契约巨灵独立全息档案</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-cyan-300 font-bold">{{ summon?.name || '未知巨灵' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/40">
          VBLE EIDOLON CONTRACT v2.2.349
        </span>
      </div>
    </div>

    <!-- 未找到提示 -->
    <div v-if="!summon" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到指定召唤兽契约档案</h2>
      <p class="text-sm text-slate-300 mb-4">该太古巨灵尚未在双月星脉中完成共鸣录入。</p>
      <router-link to="/vble/summons">
        <n-button type="primary" round>返回召唤兽列表</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 主巨灵头图名片卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/70 to-slate-900 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.18)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-2xl">{{ summon.icon || '🐉' }}</span>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                {{ summon.rank || '天灾极境契约' }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">
                属性亲和: {{ summon.element }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-rose-300 text-xs border border-slate-700">
                消耗: {{ summon.cost }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ summon.name }}</span>
            </h1>

            <p class="text-base text-amber-200/90 italic border-l-2 border-amber-400 pl-3 py-0.5">
              极意招式: {{ summon.skill_name }}
            </p>

            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
              {{ summon.lore }}
            </p>
          </div>

          <!-- 右侧试炼地与共鸣加成 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[240px]">
            <div>
              <div class="text-xs text-slate-400">契约试炼秘境坐标</div>
              <div class="text-sm font-bold text-cyan-300 mt-0.5">{{ summon.trial_dungeon || '苍穹绝壁顶峰' }}</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">全队常驻被动庇护</div>
              <div class="text-xs text-amber-300 mt-0.5 font-bold leading-relaxed">{{ summon.passive_blessing }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 降临演算与全屏神威伤害沙盘 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧 2 列: 必杀威力与伤害解算 -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🔥</span> 全屏神威极意招式实战解算
            </h2>
            <span class="text-xs text-amber-300 font-mono">{{ summon.skill_name }}</span>
          </div>

          <!-- 招式效果解析 -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>✨</span> 招式机制与判定法则：
            </div>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {{ summon.skill_desc }}
            </p>
          </div>

          <!-- 召唤师以太共鸣滑块 -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-300">调节全队召唤士以太共鸣深度 (Aether Resonance)：</span>
              <span class="font-mono text-cyan-300 font-bold">{{ resonanceLevel }}% 以太激荡</span>
            </div>
            <n-slider v-model:value="resonanceLevel" :min="100" :max="300" :step="10" />
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>100% (标准单发降临)</span>
              <span>200% (双召唤士同步以太)</span>
              <span>300% (四人星魂全域爆发)</span>
            </div>
          </div>

          <!-- 伤害解算结果栅格 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div class="text-xs text-slate-400">估算全屏总伤</div>
              <div class="text-xl font-mono font-black text-rose-400 mt-1">{{ calculatedDamage.damage }}</div>
              <div class="text-[10px] text-amber-300 mt-0.5">无视敌方 40% 魔抗</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div class="text-xs text-slate-400">破韧压制值</div>
              <div class="text-xl font-mono font-black text-cyan-400 mt-1">{{ calculatedDamage.stagger }} Pt</div>
              <div class="text-[10px] text-emerald-400 mt-0.5">必断蓄力施法</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div class="text-xs text-slate-400">降临特写耗时</div>
              <div class="text-xl font-mono font-black text-amber-400 mt-1">3.2 秒</div>
              <div class="text-[10px] text-slate-400 mt-0.5">全息 60FPS 粒子</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div class="text-xs text-slate-400">契约融合状态</div>
              <div class="text-xl font-mono font-black text-purple-400 mt-1">常驻就绪</div>
              <div class="text-[10px] text-purple-300 mt-0.5">解除施法前摇</div>
            </div>
          </div>
        </div>

        <!-- 右侧 1 列: 快速试炼导航与契约索引 -->
        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-4">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>🗺️</span> 契约试炼地探索
            </h2>
            <p class="text-xs text-slate-300 leading-relaxed">
              击败该巨灵的降临投影后，全队即可收录其契约印章，支持召唤士与模仿士在战斗中随时驱策。
            </p>
            <router-link to="/vble/dungeons">
              <n-button block type="warning" round secondary>
                前往试炼秘境地图 →
              </n-button>
            </router-link>
          </div>

          <!-- 快速跳转至其他召唤兽 -->
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>🐉</span> 召唤兽星谱索引
            </h2>
            <div class="space-y-1.5 max-h-64 overflow-y-auto">
              <div
                v-for="s in allSummons"
                :key="s.id"
                class="p-2 rounded-lg transition-colors flex items-center justify-between"
                :class="s.id === summon.id ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40' : 'hover:bg-slate-800 text-slate-300'"
              >
                <router-link :to="'/vble/summons/' + s.id" class="text-xs block truncate max-w-[180px]">
                  {{ s.icon }} {{ s.name }}
                </router-link>
                <span class="text-[10px] text-cyan-300">{{ s.cost }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { GAME_DATABASE } from '../data/gameDatabase'

const route = useRoute()
const summonId = computed(() => (route.params.id as string) || '')

const resonanceLevel = ref(150)

const allSummons = computed(() => GAME_DATABASE.summons || [])

const summon = computed(() => {
  return allSummons.value.find((s: any) => s.id === summonId.value)
})

const calculatedDamage = computed(() => {
  const mult = resonanceLevel.value / 100.0
  const baseDmg = summon.value?.cost?.includes('66') ? 12500 : 7800
  const damage = Math.round(baseDmg * mult)
  const stagger = Math.round(180 * mult)
  return { damage, stagger }
})
</script>

<style scoped>
</style>
