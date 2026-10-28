<template>
  <div class="summons-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/80 via-indigo-950/70 to-purple-950/80 border border-blue-500/30 shadow-[0_0_35px_rgba(59,130,246,0.2)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              ANCIENT CELESTIAL SUMMONS
            </span>
            <span class="text-xs text-gray-400">太古契约与神明降临</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🐉</span> 幻兽与召唤神殿：十二柱神明契约
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            收录自晶石纪元流传的十二柱远古神明契约。从巴哈姆特亿万核爆、利维亚桑灭世海啸、奥丁一分钟限时斩铁试炼，到不死鸟复活余烬与全息战斗伤害结算。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>⚔️</span></template>
            前往契约推演沙盘
          </n-button>
          <router-link to="/vble/jobs">
            <n-button size="medium" round tertiary>
              查看召唤师职业
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心统计概览卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">已收录神兽</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ summonsList.length }} 柱</div>
        <div class="text-[10px] text-gray-500 mt-0.5">太古神明契约</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">涵盖属性系别</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">7 大类</div>
        <div class="text-[10px] text-gray-500 mt-0.5">无/水/火/冰/雷/地/圣</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">职业隐藏融合技</div>
        <div class="text-2xl font-black text-purple-400 font-mono mt-1">4 项</div>
        <div class="text-[10px] text-gray-500 mt-0.5">跨职业羁绊奥义</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">实机计算引擎</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">Godot 4.x</div>
        <div class="text-[10px] text-gray-500 mt-0.5">summon_system.gd</div>
      </div>
    </div>

    <!-- 过滤器与搜索栏 -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs text-gray-400 font-semibold mr-1">神阶品级:</span>
        <button
          v-for="cat in rankCategories"
          :key="cat.key"
          type="button"
          class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
          :class="activeRank === cat.key ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-800 text-gray-400 hover:text-gray-200'"
          @click="activeRank = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="flex items-center gap-3">
        <n-input
          v-model:value="searchKeyword"
          placeholder="搜索召唤兽名、必杀技、地牢..."
          size="small"
          clearable
          class="w-full md:w-64"
        >
          <template #prefix>🔍</template>
        </n-input>
      </div>
    </div>

    <!-- 召唤兽卡片网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="s in filteredSummons"
        :key="s.id"
        class="group relative rounded-xl bg-[#0f1422]/90 border transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        :class="selectedSummonId === s.id ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/40' : 'border-slate-800 hover:border-slate-700'"
      >
        <div class="space-y-3.5">
          <!-- 卡片顶栏 -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <span class="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">{{ s.icon }}</span>
              <div>
                <h3 class="font-bold text-base text-amber-300 tracking-wide">{{ s.name }}</h3>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <n-tag size="tiny" :type="getElementTagType(s.element)">{{ s.element }}</n-tag>
                  <n-tag size="tiny" type="info" secondary>{{ s.rank }}</n-tag>
                </div>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {{ s.cost }}
            </span>
          </div>

          <!-- 必杀技栏 -->
          <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800/80 space-y-1">
            <div class="text-xs text-amber-400 font-bold flex items-center justify-between">
              <span>⚡ 必杀神技: {{ s.skill_name }}</span>
              <span class="text-[10px] text-gray-500 font-mono">基底威力系数: {{ getBasePower(s.id) }}</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">{{ s.skill_desc }}</p>
          </div>

          <!-- 契约被动庇护 -->
          <div class="p-2.5 bg-purple-950/30 border border-purple-900/40 rounded-lg text-xs text-purple-300 leading-relaxed">
            <span class="font-bold text-purple-200">🌟 契约常驻庇佑:</span> {{ s.passive_blessing }}
          </div>

          <!-- 挑战秘境 -->
          <div class="text-xs text-gray-400 flex items-center gap-1.5">
            <span>📍 挑战秘境:</span>
            <span class="text-cyan-300 font-medium">{{ s.trial_dungeon }}</span>
          </div>

          <!-- 典故传记 -->
          <p class="text-[11px] text-gray-400/90 italic border-l-2 border-slate-700 pl-2.5 leading-relaxed">
            "{{ s.lore }}"
          </p>
        </div>

        <!-- 底部快捷推演按钮 -->
        <div class="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-[11px] text-gray-500">ID: {{ s.id }}</span>
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
            :class="selectedSummonId === s.id ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'bg-slate-800 text-cyan-400 hover:bg-slate-750 border border-slate-700'"
            @click="selectForSimulation(s.id)"
          >
            <span>{{ selectedSummonId === s.id ? '✓ 正在推演' : '🎯 载入推演沙盘' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 核心推演工坊：十二柱神明契约实机沙盘 -->
    <div id="summon-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c101d] via-[#101626] to-[#0a0e1a] border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              SIMULATION STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔮</span> 十二柱召唤神殿 · 战斗召唤全息沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            动态对齐 Godot 引擎 summon_system.gd 伤害算法，推演施术者属性、环境增幅、属性克制与抗性减免。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickSummonCast">
            ⚡ 一键施法斩杀
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：召唤师与配置 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>🧙‍♂️</span> 施术者配置 (Summoner)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">施术角色 (Caster)</label>
              <n-select
                v-model:value="selectedCaster"
                :options="casterOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>召唤师魔力 (Magic Power):</span>
                <span class="font-mono text-cyan-400 font-bold text-sm">{{ casterMagicPower }}</span>
              </div>
              <n-slider v-model:value="casterMagicPower" :min="10" :max="120" :step="1" />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>角色当前 MP:</span>
                <span class="font-mono text-amber-400 font-bold">{{ currentMP }} / {{ maxMP }}</span>
              </div>
              <n-slider v-model:value="currentMP" :min="0" :max="maxMP" :step="5" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">持有【召唤师纹章】(+15% 伤害):</span>
                <n-switch v-model:value="hasSummonerBadge" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">白魔道士同行 (MP 减免 20%):</span>
                <n-switch v-model:value="hasWhiteMageSynergy" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：已选召唤兽与战场设定 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-amber-300 flex items-center gap-2">
            <span>⚔️</span> 目标与环境设定 (Target & Arena)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选择召唤神兽 (Active Summon)</label>
              <n-select
                v-model:value="selectedSummonId"
                :options="summonSelectOptions"
                size="small"
              />
            </div>

            <div>
              <label class="text-gray-400 block mb-1">目标类型 (Target Type)</label>
              <n-select
                v-model:value="targetType"
                :options="targetTypeOptions"
                size="small"
              />
            </div>

            <div>
              <label class="text-gray-400 block mb-1">目标元素耐性 (Elemental Resistance)</label>
              <n-select
                v-model:value="targetElementalResist"
                :options="resistanceOptions"
                size="small"
              />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">目标正在蓄力咏唱 (打断判定):</span>
                <n-switch v-model:value="isTargetCasting" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">目标属于不死系 (不死鸟特效):</span>
                <n-switch v-model:value="isUndeadTarget" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息实时推演结果面板 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-blue-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-cyan-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 实时结算指标 (Combat Result)</span>
              <n-tag size="tiny" :type="calcResult.canCast ? 'success' : 'error'">
                {{ calcResult.canCast ? 'MP 充足 · 可施法' : 'MP 不足 · 无法唤醒' }}
              </n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 预计伤害数字 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">单体/全体期望伤害 (Estimated Damage)</div>
                <div class="text-3xl font-black font-mono mt-1 tracking-wider" :class="calcResult.damageColorClass">
                  {{ calcResult.damageDisplay }}
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  {{ calcResult.damageNotes }}
                </div>
              </div>

              <!-- 消耗与实际状态 -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">实际消耗 MP</div>
                  <div class="font-mono font-bold text-amber-300 mt-0.5 text-sm">{{ calcResult.actualMPCost }}</div>
                </div>
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">属性倍率</div>
                  <div class="font-mono font-bold text-cyan-300 mt-0.5 text-sm">{{ calcResult.elementMultiplier }}x</div>
                </div>
              </div>

              <!-- 特殊机制触发器判定 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-cyan-400 font-bold flex items-center gap-1">
                  <span>✨ 机制判定:</span>
                  <span>{{ calcResult.specialEffectTitle }}</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ calcResult.specialEffectDesc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>引擎算法: summon_system.gd</span>
            <span class="text-cyan-400">VBLE Battle Engine v2.2.207</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 职业融合奥义展台 (Fusion Artes) -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-xl">🌟</span>
        <h3 class="text-lg font-bold text-white">跨职业羁绊融合技 (Fusion Artes)</h3>
      </div>
      <p class="text-xs text-gray-400">
        当队伍中装备对应神兽契约石，且拥有特定高阶职业时，在战斗极限状态下可触发终极融合奥义。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div
          v-for="fa in fusionArtes"
          :key="fa.name"
          class="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 hover:border-purple-500/40 transition-all"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-amber-300 text-sm flex items-center gap-2">
              <span>{{ fa.icon }}</span>
              <span>{{ fa.name }}</span>
            </span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {{ fa.condition }}
            </span>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">{{ fa.effect }}</p>
          <div class="text-[11px] text-gray-400 italic">
            消耗: {{ fa.cost }} · 战术定位: {{ fa.role }}
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-cyan-300">summon_system.gd (Godot 4.x 实机核心算法)</span>
        </div>
        <n-button size="tiny" secondary type="info" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900">{{ godotCodeText }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'

const message = useMessage()
const gameStore = useGameStore()

// 检索与筛选状态
const activeRank = ref('all')
const searchKeyword = ref('')
const selectedSummonId = ref('bahamut')
const copiedCode = ref(false)

// 推演工坊状态
const selectedCaster = ref('bartz')
const casterMagicPower = ref(65)
const currentMP = ref(80)
const maxMP = ref(120)
const hasSummonerBadge = ref(true)
const hasWhiteMageSynergy = ref(false)

const targetType = ref('boss')
const targetElementalResist = ref('normal')
const isTargetCasting = ref(true)
const isUndeadTarget = ref(false)

// 基础数据源
const summonsList = computed(() => gameStore.db.summons || [])

const rankCategories = [
  { key: 'all', label: '全部契约' },
  { key: 'cataclysm', label: '最高天灾' },
  { key: 'elements', label: '四元神明' },
  { key: 'ancient', label: '极古战魂' },
  { key: 'support', label: '守护奇迹' }
]

const casterOptions = [
  { label: '巴兹 (Bartz) - 魔剑/召唤均质体', value: 'bartz' },
  { label: '蕾娜 (Lenna) - 神圣白魔召唤专家', value: 'lenna' },
  { label: '法里斯 (Faris) - 风水元素共鸣者', value: 'faris' },
  { label: '格鲁夫/库露露 (Krile) - 远古以太传承', value: 'krile' }
]

const targetTypeOptions = [
  { label: '单体首领 BOSS (免疫常规即死)', value: 'boss' },
  { label: '精英守门人 (强韧防御)', value: 'elite' },
  { label: '4 人标准怪物群 (分摊或全体攻击)', value: 'mob_group' }
]

const resistanceOptions = [
  { label: '弱点克制 (Weakness x2.0)', value: 'weak' },
  { label: '通常抗性 (Normal x1.0)', value: 'normal' },
  { label: '半减抗性 (Resist x0.5)', value: 'half' },
  { label: '完全免疫 (Immune x0.0)', value: 'immune' },
  { label: '元素吸收 (Absorb -1.0x)', value: 'absorb' }
]

const summonSelectOptions = computed(() => {
  return summonsList.value.map((s: { id: string; name: string }) => ({
    label: `${s.name}`,
    value: s.id
  }))
})

// 筛选召唤兽
const filteredSummons = computed(() => {
  return summonsList.value.filter((s: { id: string; name: string; rank: string; element: string; skill_name: string; trial_dungeon: string }) => {
    // 品阶匹配
    if (activeRank.value === 'cataclysm' && !s.rank.includes('天灾') && !s.rank.includes('高阶')) return false
    if (activeRank.value === 'elements' && !s.rank.includes('四元神')) return false
    if (activeRank.value === 'ancient' && !s.rank.includes('极古') && !s.rank.includes('战魂')) return false
    if (activeRank.value === 'support' && !s.rank.includes('辅助') && !s.rank.includes('守护') && !s.rank.includes('奇迹')) return false

    // 搜索关键字匹配
    if (searchKeyword.value.trim()) {
      const q = searchKeyword.value.trim().toLowerCase()
      const match =
        s.name.toLowerCase().includes(q) ||
        s.skill_name.toLowerCase().includes(q) ||
        s.element.toLowerCase().includes(q) ||
        s.trial_dungeon.toLowerCase().includes(q)
      if (!match) return false
    }

    return true
  })
})

// 基础威力系数映射表
const getBasePower = (id: string): number => {
  const map: Record<string, number> = {
    bahamut: 250,
    leviathan: 195,
    odin: 220,
    phoenix: 170,
    shiva: 120,
    ifrit: 125,
    ramuh: 130,
    titan: 140,
    carbuncle: 0,
    syldra: 165,
    golem: 0,
    chocobo: 95
  }
  return map[id] || 100
}

const getElementTagType = (elem: string): 'default' | 'info' | 'warning' | 'error' | 'success' => {
  if (elem.includes('火')) return 'error'
  if (elem.includes('水') || elem.includes('冰')) return 'info'
  if (elem.includes('雷') || elem.includes('地')) return 'warning'
  if (elem.includes('圣') || elem.includes('以太') || elem.includes('无')) return 'success'
  return 'default'
}

const selectForSimulation = (id: string) => {
  selectedSummonId.value = id
  scrollToStudio()
  message.success(`已载入召唤兽契约进行沙盘推演！`)
}

const scrollToStudio = () => {
  const el = document.getElementById('summon-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetStudioParams = () => {
  casterMagicPower.value = 65
  currentMP.value = 80
  hasSummonerBadge.value = true
  hasWhiteMageSynergy.value = false
  targetType.value = 'boss'
  targetElementalResist.value = 'normal'
  isTargetCasting.value = true
  isUndeadTarget.value = false
  message.info('沙盘推演参数已重置为默认值')
}

const triggerOneClickSummonCast = () => {
  if (!calcResult.value.canCast) {
    message.error('当前 MP 不足，无法发起神圣召唤！请调高 MP 或开启白魔减耗')
    return
  }
  message.success(`⚡ 召唤契约激活！${calcResult.value.damageDisplay} 点结算，${calcResult.value.specialEffectTitle}`)
}

// 核心伤害与机制结算推演
const calcResult = computed(() => {
  const curSummon = summonsList.value.find((s: { id: string }) => s.id === selectedSummonId.value) || summonsList.value[0]
  if (!curSummon) {
    return {
      canCast: false,
      actualMPCost: 0,
      damageDisplay: '0',
      damageNotes: '未选定召唤兽',
      damageColorClass: 'text-gray-400',
      elementMultiplier: 1.0,
      specialEffectTitle: '无',
      specialEffectDesc: '无'
    }
  }

  // 计算 MP 消耗
  const rawCost = parseInt(curSummon.cost.replace(/[^0-9]/g, '')) || 20
  const mpMultiplier = hasWhiteMageSynergy.value ? 0.8 : 1.0
  const actualMPCost = Math.round(rawCost * mpMultiplier)
  const canCast = currentMP.value >= actualMPCost

  // 计算属性倍率
  let elemMult = 1.0
  if (curSummon.id === 'bahamut') {
    elemMult = 1.0 // 无属性真伤，无视抗性
  } else {
    if (targetElementalResist.value === 'weak') elemMult = 2.0
    else if (targetElementalResist.value === 'half') elemMult = 0.5
    else if (targetElementalResist.value === 'immune') elemMult = 0.0
    else if (targetElementalResist.value === 'absorb') elemMult = -1.0
  }

  // 装备加成与施术者加成
  let badgeBonus = hasSummonerBadge.value ? 1.15 : 1.0
  let casterBonus = 1.0
  if (selectedCaster.value === 'lenna' && (curSummon.id === 'phoenix' || curSummon.id === 'carbuncle')) casterBonus = 1.2
  if (selectedCaster.value === 'faris' && (curSummon.id === 'leviathan' || curSummon.id === 'syldra')) casterBonus = 1.25
  if (selectedCaster.value === 'krile' && curSummon.id === 'bahamut') casterBonus = 1.15

  const basePower = getBasePower(curSummon.id)
  let rawDmg = Math.round((casterMagicPower.value * 2.2 + basePower * 1.8) * badgeBonus * casterBonus)

  let damageDisplay = '0'
  let damageNotes = '常规群体伤害'
  let damageColorClass = 'text-cyan-400'
  let specialEffectTitle = '标准魔法伤害'
  let specialEffectDesc = '对敌全体造成神力冲击'

  // 个性化神兽机制分支
  if (curSummon.id === 'bahamut') {
    const finalDmg = Math.round(rawDmg * 1.2)
    damageDisplay = `${finalDmg}`
    damageNotes = '无视防御与魔抗 · 贯穿真实爆裂冲击'
    damageColorClass = 'text-cyan-300'
    specialEffectTitle = '真实亿万核爆'
    specialEffectDesc = '无视一切魔法屏障、抗性与护盾，必定造成满额穿透伤害'
  } else if (curSummon.id === 'odin') {
    if (targetType.value === 'boss') {
      damageDisplay = '9999'
      damageNotes = 'Boss 首领斩铁转换 · 破界物理暴击极限'
      damageColorClass = 'text-amber-400'
      specialEffectTitle = '破界斩铁暴击'
      specialEffectDesc = '识别到目标为首领级 Boss，由即死自动转为造成 9999 破界物理真实伤害'
    } else {
      damageDisplay = '100% 即死 (DEATH)'
      damageNotes = '非 Boss 单位全员直接判定两断即死'
      damageColorClass = 'text-purple-400'
      specialEffectTitle = '一刀两断'
      specialEffectDesc = '无视生命值上限，概率 100% 斩灭所有非首领级小怪'
    }
  } else if (curSummon.id === 'phoenix') {
    const healVal = 9999
    const atkDmg = Math.round(rawDmg * elemMult * (isUndeadTarget.value ? 2.5 : 1.0))
    damageDisplay = `烈焰 ${atkDmg} / 回复 ${healVal}`
    damageNotes = isUndeadTarget.value ? '触发不死系 2.5 倍圣焰净化爆轰' : '全员阵亡复活 + 圣炎焚场'
    damageColorClass = 'text-rose-400'
    specialEffectTitle = '转生之炎 · 金羽重生'
    specialEffectDesc = '全队阵亡队员 100% 满血复活，若队长致死可激活不屈庇护保留 1 点 HP'
  } else if (curSummon.id === 'leviathan') {
    const finalDmg = Math.round(rawDmg * elemMult)
    damageDisplay = `${finalDmg}`
    damageNotes = isTargetCasting.value ? '40% 几率冲散敌方当前咏唱状态' : '高压覆灭水属性海啸'
    damageColorClass = 'text-blue-400'
    specialEffectTitle = '海啸冲散打断'
    specialEffectDesc = isTargetCasting.value ? '目标正处于咏唱中，成功命中将极大概率清空其蓄力行动条' : '常规大面积水属性冲击'
  } else if (curSummon.id === 'carbuncle') {
    damageDisplay = '全体赋予【魔法反射壁 (Reflect)】'
    damageNotes = '常驻反弹下一次敌方攻击法术回击自身'
    damageColorClass = 'text-emerald-400'
    specialEffectTitle = '红宝石辉光'
    specialEffectDesc = '不造成直接伤害，为全队套上魔法反射结界，并缩短负面状态时间 50%'
  } else if (curSummon.id === 'golem') {
    damageDisplay = '吸收物理伤害上限 3500 HP'
    damageNotes = '前排受击由石魔替身吸收'
    damageColorClass = 'text-yellow-500'
    specialEffectTitle = '岩盾金钟罩'
    specialEffectDesc = '显化巨石坚盾替全队吸收物理伤害，抵挡期间全员免受普攻硬直'
  } else if (curSummon.id === 'shiva') {
    const finalDmg = Math.round(rawDmg * elemMult)
    damageDisplay = `${finalDmg}`
    damageNotes = '极寒绝对零度 · 附加 3 回合冻伤减速'
    damageColorClass = 'text-sky-300'
    specialEffectTitle = '钻石星尘减速'
    specialEffectDesc = '施加冻伤 Debuff，使敌方行动条流速下降 30%，持续 3 回合'
  } else {
    const finalDmg = Math.round(rawDmg * elemMult)
    damageDisplay = `${finalDmg}`
    damageNotes = `元素属性倍率: ${elemMult}x`
    damageColorClass = elemMult > 1.0 ? 'text-emerald-400' : (elemMult < 1.0 ? 'text-rose-400' : 'text-cyan-400')
    specialEffectTitle = curSummon.skill_name
    specialEffectDesc = curSummon.skill_desc
  }

  return {
    canCast,
    actualMPCost,
    damageDisplay,
    damageNotes,
    damageColorClass,
    elementMultiplier: elemMult,
    specialEffectTitle,
    specialEffectDesc
  }
})

// 融合技
const fusionArtes = [
  {
    name: '龙王破灭击 (Dragon Flare Dive)',
    icon: '🐉',
    condition: '龙骑士 + 巴哈姆特契约',
    cost: 'MP 55 + 跳跃蓄力 1 轮',
    role: '单体极致物理与核爆复合真实穿透',
    effect: '跃入苍穹与巴哈姆特虚影合一，自万米高空极速俯冲贯穿敌单体，造成 2.8 倍物理暴击 + 4500 点无视魔抗真实爆裂轰击。'
  },
  {
    name: '三元混沌炼狱 (Tri-Disaster)',
    icon: '⚡',
    condition: '黑魔道士 + 希瓦/伊芙利特/拉姆其一',
    cost: 'MP 45 + 连锁法术槽',
    role: '全场火/冰/雷三属性超绝复合爆发',
    effect: '同时引爆地狱火流星、绝对零度冻气与九天制裁雷霆，无视敌方单系元素吸收，自适应取敌方最弱抗性进行 3 段连续打击。'
  },
  {
    name: '涅槃再生神愈 (Rebirth Benediction)',
    icon: '🔥',
    condition: '白魔道士 + 不死鸟契约',
    cost: 'MP 60',
    role: '全队复活回春 + 不屈免死结界',
    effect: '散落万道纯金涅槃真羽，全队阵亡队员起死回生并恢复全满 HP/MP，全员赋予 2 回合【受致死伤保留 1 点 HP】金身护罩。'
  },
  {
    name: '万钧飞羽泰山重压 (Chocobo Mega Drop)',
    icon: '🐤',
    condition: '召唤士/时魔道士 + 胖陆行鸟契约',
    cost: 'MP 12',
    role: '强运搞笑重压 + 全场强制滑稽眩晕',
    effect: '撕开时空裂隙召唤 500 吨超巨肥美胖陆行鸟从天而降，造成范围压杀物理重创，并有 70% 几率使全场所有非首领陷入 2 回合眩晕。'
  }
]

// Godot 代码
const godotCodeText = `## summon_system.gd
## 《光之战士：时空裂隙》十二柱神明契约实机战斗结算引擎
extends Node
class_name SummonSystem

signal summon_casted(summon_id: String, caster: Node, targets: Array, result: Dictionary)

const SUMMON_POWER_TABLE = {
	"bahamut": 250, "leviathan": 195, "odin": 220, "phoenix": 170,
	"shiva": 120, "ifrit": 125, "ramuh": 130, "titan": 140,
	"carbuncle": 0, "syldra": 165, "golem": 0, "chocobo": 95
}

func execute_summon(summon_id: String, caster: CharacterData, targets: Array) -> Dictionary:
	var base_power = SUMMON_POWER_TABLE.get(summon_id, 100)
	var magic_stat = caster.get_stat("magic_power")
	var result = { "success": true, "damage": 0, "special": "" }
	
	match summon_id:
		"bahamut":
			# 真实无视魔防核爆
			result.damage = int((magic_stat * 2.2 + base_power * 1.8) * 1.2)
			result.special = "TRUE_ARMOR_PIERCE"
			for t in targets:
				t.apply_true_damage(result.damage)
		"odin":
			# 首领 9999，杂兵 100% 即死
			for t in targets:
				if t.is_boss:
					t.apply_damage(9999)
					result.damage = 9999
					result.special = "BOSS_ZANTETSUKEN_9999"
				else:
					t.instant_kill()
					result.special = "INSTANT_DEATH"
		"phoenix":
			# 全员金羽复活 + 圣炎焚场
			BattleManager.revive_all_party(1.0)
			for t in targets:
				var dmg = int((magic_stat * 1.8 + base_power * 1.5))
				if t.is_undead: dmg = int(dmg * 2.5)
				t.apply_damage(dmg)
			result.special = "REBIRTH_REVIVE_ALL"
	
	emit_signal("summon_casted", summon_id, caster, targets, result)
	return result
`

const copyGodotCode = async () => {
  try {
    await navigator.clipboard.writeText(godotCodeText)
    copiedCode.value = true
    message.success('已复制 summon_system.gd 核心实机代码！')
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}
</script>

<style scoped>
.text-glow-cyan {
  text-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
}
</style>
