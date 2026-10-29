<template>
  <div class="character-detail-page p-3 sm:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/characters">
          <n-button type="warning" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回英雄列表
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-amber-300">英雄独立绝密档案</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-cyan-300 font-bold">{{ character?.name || '未知英雄' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/40">
          VBLE HERO CODEX v2.2.348
        </span>
      </div>
    </div>

    <!-- 未找到提示 -->
    <div v-if="!character" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到指定英雄档案</h2>
      <p class="text-sm text-slate-300 mb-4">该时空坐标未记录此英雄身份，或英雄编号有误。</p>
      <router-link to="/vble/characters">
        <n-button type="primary" round>返回英雄传记总览</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 主英雄名片头图卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="px-3 py-1 rounded-full text-xs font-bold border"
                :class="character.party === 'light' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-purple-500/20 text-purple-300 border-purple-500/40'"
              >
                {{ character.partyText || (character.party === 'light' ? '光之战士小队' : '暗之战士小队') }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">
                ID: {{ character.id }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700">
                {{ character.role }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ character.name }}</span>
              <span class="text-lg sm:text-xl font-medium text-amber-300">「{{ character.title }}」</span>
            </h1>

            <p class="text-base text-amber-200/90 italic border-l-2 border-amber-400 pl-3 py-0.5">
              {{ character.quote }}
            </p>

            <p class="text-sm text-slate-200 leading-relaxed pt-1">
              {{ character.bio }}
            </p>
          </div>

          <!-- 右侧终局与极意标牌 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[240px]">
            <div>
              <div class="text-xs text-slate-400">宿命特异神威绝技</div>
              <div class="text-base font-bold text-cyan-300 mt-0.5">{{ character.signature_skill || '天翔极意奥义' }}</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">双月纪元终局归宿</div>
              <div class="text-xs text-emerald-300 mt-0.5 leading-relaxed">{{ character.ending || '世界重生后守护重生的原野' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心属性矩阵与等级动态推演器 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧 2 列: 六维成长与等级计算器 -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>📊</span> 六维宿命潜能与实机战斗数值
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-300">推演等级:</span>
              <span class="text-sm font-mono font-black text-amber-400">Lv. {{ heroLevel }}</span>
            </div>
          </div>

          <!-- 等级微调滑块 -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-300">调节角色当前等级进行实机血量/攻防动态解算：</span>
              <span class="font-mono text-cyan-300 font-bold">Lv. {{ heroLevel }} / 99</span>
            </div>
            <n-slider v-model:value="heroLevel" :min="1" :max="99" :step="1" />
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>Lv. 1 (初始状态)</span>
              <span>Lv. 50 (主线通关阶段)</span>
              <span>Lv. 99 (深渊极境封顶)</span>
            </div>
          </div>

          <!-- 六维基础潜能雷达对比条 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="stat in statList"
              :key="stat.key"
              class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <span class="text-xl">{{ stat.icon }}</span>
                <div>
                  <div class="text-xs font-bold text-white">{{ stat.name }} ({{ stat.key.toUpperCase() }})</div>
                  <div class="text-[10px] text-slate-400">{{ stat.desc }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-base font-mono font-black text-cyan-300">{{ stat.value }}</div>
                <div class="text-[10px] text-emerald-400">评级: {{ getStatGrade(stat.value) }}</div>
              </div>
            </div>
          </div>

          <!-- 实机衍生作战数值面板 -->
          <div class="border-t border-slate-800 pt-4">
            <div class="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
              <span>⚔️</span> Lv.{{ heroLevel }} 实战派生属性预估 (包含武器基底与被动加成)
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">生命上限 (HP)</div>
                <div class="text-lg font-mono font-bold text-emerald-400 mt-1">{{ calculatedStats.hp }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">魔法上限 (MP)</div>
                <div class="text-lg font-mono font-bold text-cyan-400 mt-1">{{ calculatedStats.mp }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">物理攻击 (ATK)</div>
                <div class="text-lg font-mono font-bold text-amber-400 mt-1">{{ calculatedStats.atk }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">魔法攻击 (MATK)</div>
                <div class="text-lg font-mono font-bold text-purple-400 mt-1">{{ calculatedStats.matk }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">物理防御 (DEF)</div>
                <div class="text-lg font-mono font-bold text-blue-400 mt-1">{{ calculatedStats.def }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">魔法防御 (MDEF)</div>
                <div class="text-lg font-mono font-bold text-indigo-400 mt-1">{{ calculatedStats.mdef }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">出手速度 (SPD)</div>
                <div class="text-lg font-mono font-bold text-rose-400 mt-1">{{ calculatedStats.spd }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">暴击概率 (CRIT)</div>
                <div class="text-lg font-mono font-bold text-yellow-400 mt-1">{{ calculatedStats.crit }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 1 列: 推荐转职与最佳作战流派 -->
        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-4">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>🛡️</span> 终极适配转职
            </h2>
            <div class="space-y-3">
              <div
                v-for="job in character.best_jobs || []"
                :key="job.id"
                class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div class="text-sm font-bold text-amber-300">{{ job.name }}</div>
                  <div class="text-xs text-slate-400 mt-0.5">契合度: ★★★★★ 极境绝配</div>
                </div>
                <router-link to="/vble/jobs">
                  <n-button size="tiny" round secondary type="info">查看职业</n-button>
                </router-link>
              </div>
            </div>
          </div>

          <!-- 登场章节一览 -->
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>📖</span> 活跃主线章节
            </h2>
            <div class="space-y-2">
              <div
                v-for="ch in character.chapters || []"
                :key="ch.id"
                class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between"
              >
                <div class="text-xs text-slate-200">{{ ch.title }}</div>
                <router-link :to="'/vble/story/' + ch.id">
                  <n-button size="tiny" text type="warning">章节详情 →</n-button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 命之座星轨 1~6 阶觉醒特权档案 -->
      <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>✨</span> 命之座以太星轨觉醒特权 (Constellation Orbit)
            </h2>
            <p class="text-xs text-slate-300 mt-1">收集该英雄的时空命座残片，可逐层激活以下 6 大被动神威羁绊：</p>
          </div>
          <span class="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/40">
            6 阶觉醒矩阵
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="(orbit, idx) in constellationPerks"
            :key="idx"
            class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-amber-400">第 {{ idx + 1 }} 重命座</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                {{ orbit.tag }}
              </span>
            </div>
            <h3 class="text-sm font-bold text-white">{{ orbit.title }}</h3>
            <p class="text-xs text-slate-300 leading-relaxed">{{ orbit.effect }}</p>
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
const charId = computed(() => (route.params.id as string) || '')

const character = computed(() => {
  return (GAME_DATABASE.characters || []).find((c: any) => c.id === charId.value)
})

const heroLevel = ref(50)

const statList = computed(() => {
  if (!character.value || !character.value.stats) return []
  const s = character.value.stats
  return [
    { key: 'str', name: '力量', icon: '⚔️', value: s.str || 80, desc: '提升物理破甲与近战暴击上限' },
    { key: 'agi', name: '敏捷', icon: '🏃', value: s.agi || 75, desc: '缩短 ATB 读条与闪避成功率' },
    { key: 'vit', name: '体质', icon: '🛡️', value: s.vit || 85, desc: '大幅增加最大生命值与物抗' },
    { key: 'mag', name: '魔力', icon: '🔮', value: s.mag || 60, desc: '强化元素魔法与神圣法术威力' },
    { key: 'spr', name: '精神', icon: '🕊️', value: s.spr || 70, desc: '提升治愈量、负面状态抗性与魔防' },
    { key: 'luck', name: '幸运', icon: '🍀', value: s.luck || 65, desc: '增加战利品掉落率与致命一击倍率' }
  ]
})

const getStatGrade = (val: number) => {
  if (val >= 90) return 'S+ 极境'
  if (val >= 80) return 'A+ 卓越'
  if (val >= 70) return 'B+ 优秀'
  return 'C 常规'
}

const calculatedStats = computed(() => {
  const s = character.value?.stats || { str: 80, agi: 70, vit: 80, mag: 60, spr: 65, luck: 60 }
  const lvl = heroLevel.value
  const factor = lvl / 50.0

  const hp = Math.round((s.vit * 45 + lvl * 95) * factor)
  const mp = Math.round((s.mag * 8 + s.spr * 6 + lvl * 18) * factor)
  const atk = Math.round((s.str * 2.8 + lvl * 7.5) * factor)
  const matk = Math.round((s.mag * 3.1 + lvl * 6.8) * factor)
  const def = Math.round((s.vit * 1.9 + lvl * 4.2) * factor)
  const mdef = Math.round((s.spr * 2.1 + lvl * 3.8) * factor)
  const spd = Math.round(s.agi * 0.9 + lvl * 0.4)
  const crit = Math.min(65, Math.round(s.luck * 0.25 + lvl * 0.15))

  return { hp, mp, atk, matk, def, mdef, spd, crit }
})

const constellationPerks = [
  { tag: '原初誓约', title: '星命觉醒·破阵锋芒', effect: '普通攻击必定触发一次追击，对韧性条造成 150% 破韧伤害。' },
  { tag: '战术升维', title: '时空回响·以太共振', effect: '释放极限神威绝技后，全队 ATB 充能速度提升 30%，持续 2 回合。' },
  { tag: '神威进阶', title: '宿命执念·技能解限', effect: '核心职业专属特技等级提升 3 级，最高可突破至 15 级。' },
  { tag: '坚壁护佑', title: '虚空庇护·逆境坚忍', effect: '当生命值低于 35% 时，立刻获得一个相当于自身最大生命值 40% 的神圣护盾。' },
  { tag: '奥义极境', title: '双月共鸣·终焉审判', effect: '终极极限技伤害倍率额外增加 80%，并无视敌方 50% 魔法/物理抗性。' },
  { tag: '化境超脱', title: '光暗归一·时空真身', effect: '全属性潜能永久提升 20%，战斗开局自动为全队赋予【以太霸体】状态。' }
]
</script>

<style scoped>
</style>
