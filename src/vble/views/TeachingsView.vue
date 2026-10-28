<template>
  <div class="teachings-page max-w-7xl mx-auto space-y-8 px-3 sm:px-6 py-4">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-cyan-950/70 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.2)] relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/3 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              SANCTUARY MASTERIES & BLUE MAGIC CODEX
            </span>
            <span class="text-xs text-gray-400">四大流派秘传与魔物拟态研习</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>✨</span> 秘传绝技研习院：四大流派与青魔法全域沙盘
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
            融汇勇者圣所舍身庇护、米西迪亚时空禁术、东洋忍法五遁奥义与青魔法学院魔物肉身拟态。支持实机伤害数值结算与魔物拟态捕获全图鉴推演。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <router-link to="/vble/jobs">
            <n-button type="info" size="medium" round secondary class="shadow-md">
              <template #icon><span>⚔️</span></template>
              28大职业矩阵
            </n-button>
          </router-link>
          <router-link to="/vble/monsters">
            <n-button type="warning" size="medium" round secondary class="shadow-md">
              <template #icon><span>👾</span></template>
              魔物与首领
            </n-button>
          </router-link>
          <router-link to="/vble">
            <n-button size="medium" round tertiary>
              返回首页
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 交互式研习台切换 Tabs -->
    <div class="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
      <button
        v-for="tab in tabList"
        :key="tab.key"
        type="button"
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
        :class="activeViewTab === tab.key
          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]'
          : 'bg-slate-900 text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-800'"
        @click="activeViewTab = tab.key"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.badge"
          class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-500 text-slate-950 font-bold"
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <!-- 视图 1: 秘传绝技卡片全典 -->
    <div v-if="activeViewTab === 'catalog'" class="space-y-6">
      <!-- 分类筛选器 -->
      <div class="flex flex-wrap gap-2 justify-center" role="group" aria-label="秘传绝技分类">
        <n-button
          v-for="cat in categories"
          :key="cat.id"
          class="teaching-category-button"
          size="small"
          :aria-pressed="activeCategory === cat.id"
          :type="activeCategory === cat.id ? 'primary' : 'default'"
          secondary
          @click="activeCategory = cat.id"
        >
          {{ cat.name }} ({{ cat.count }})
        </n-button>
      </div>

      <!-- 技能卡片列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <n-card
          v-for="tech in filteredTeachings"
          :key="tech.id"
          hoverable
          class="border border-slate-700/60 bg-[#121626]/90 rounded-xl transition-all duration-300 hover:border-cyan-500/50"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-base font-bold text-cyan-300">{{ tech.name }}</span>
              <n-tag size="small" :type="getTagType(tech.category)">
                {{ tech.categoryName }}
              </n-tag>
            </div>
          </template>

          <div class="space-y-3.5 text-sm">
            <!-- 导师与消耗 -->
            <div class="grid grid-cols-2 gap-2 text-xs text-gray-400 bg-slate-900/80 p-2.5 rounded border border-slate-800">
              <div>传授导师: <strong class="text-gray-200">{{ tech.mentor }}</strong></div>
              <div>消耗代价: <strong class="text-amber-400">{{ tech.cost }}</strong></div>
              <div>施法速度: <strong class="text-sky-300">{{ tech.castSpeed }}</strong></div>
              <div>元素属性: <strong class="text-purple-300">{{ tech.element }}</strong></div>
            </div>

            <!-- 效能描述 -->
            <div class="p-3 bg-slate-900/90 rounded border border-slate-800 space-y-1.5">
              <div class="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                <span>⚡</span> 绝技实战效能:
              </div>
              <div class="text-xs text-gray-300 leading-relaxed">{{ tech.effect }}</div>
            </div>

            <!-- 数值公式 -->
            <div class="p-2.5 bg-blue-950/20 border border-blue-900/40 rounded space-y-1">
              <div class="text-xs text-blue-300 font-mono font-semibold flex items-center gap-1">
                <span>📐</span> 数值与算法结算:
              </div>
              <div class="text-[11px] font-mono text-gray-300 leading-relaxed">{{ tech.formula }}</div>
            </div>

            <!-- 战术建议 -->
            <div class="p-2.5 bg-amber-950/20 border border-amber-900/40 rounded space-y-1">
              <div class="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <span>🎯</span> 实战战术指引:
              </div>
              <div class="text-xs text-gray-300 leading-relaxed">{{ tech.tactics }}</div>
            </div>

            <!-- 背景逸闻 -->
            <div class="text-xs text-purple-300/80 italic border-l-2 border-purple-500/50 pl-2.5 py-0.5">
              "{{ tech.lore }}"
            </div>

            <!-- 研习模拟入口 -->
            <div class="pt-2 flex justify-end">
              <n-button size="tiny" type="primary" secondary @click="launchSimulator(tech)">
                前往演练台推演 ➔
              </n-button>
            </div>
          </div>
        </n-card>
      </div>
    </div>

    <!-- 视图 2: 青魔法魔物捕获与拟态图鉴沙盘 -->
    <div v-if="activeViewTab === 'bluemagic_matrix'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>👾</span> 青魔法拟态捕获全图鉴沙盘 (Blue Magic Learning Matrix)
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              青魔道士的核心灵魂——通过肉身硬抗魔物绝招或借助魔兽使操纵使其对自己施放，记录 12 大经典青魔法的来源魔物、生还习得条件与实机战术价值。
            </p>
          </div>
          <span class="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
            已收录 12 大经典青魔法
          </span>
        </div>

        <!-- 青魔法全景矩阵卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="spell in blueMagicDatabase"
            :key="spell.id"
            class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between gap-2">
                <span class="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
                  <span>{{ spell.icon }}</span>
                  <span>{{ spell.name }}</span>
                </span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  {{ spell.mpCost }} MP
                </span>
              </div>

              <div class="p-2.5 bg-slate-900/60 rounded border border-slate-800/80 text-xs space-y-1">
                <div class="text-gray-400">来源魔物: <strong class="text-emerald-300">{{ spell.sourceMonster }}</strong></div>
                <div class="text-gray-400">出没场景: <span class="text-cyan-400">{{ spell.location }}</span></div>
                <div class="text-gray-400">习得方式: <span class="text-amber-300">{{ spell.learningMethod }}</span></div>
              </div>

              <p class="text-xs text-gray-300 leading-relaxed">{{ spell.effect }}</p>
            </div>

            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span class="text-gray-500 font-mono text-[11px]">{{ spell.code }}</span>
              <n-tag size="tiny" :type="spell.tierType" round strong>{{ spell.tierLabel }}</n-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 视图 3: 绝技伤害与实战演练台 -->
    <div v-if="activeViewTab === 'simulator'" class="space-y-6">
      <div class="p-5 bg-[#121626]/90 border border-slate-700/60 rounded-xl space-y-6">
        <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-cyan-300">⚡ 秘传绝技推演与伤害结算工作台</h2>
            <p class="text-xs text-gray-400 mt-1">
              基于 Godot 引擎 `battle_engine.gd` 伤害公式与状态机，实时模拟各种人物数值与敌人抗性下的绝技表现
            </p>
          </div>
          <n-button size="small" secondary @click="resetSimulatorParams">重置预设参数</n-button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 步骤 1: 选择绝技 -->
          <div class="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 class="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <span>1️⃣</span> 选择参演绝技
            </h3>
            <div>
              <label class="text-xs text-gray-400 mb-1 block">秘传法门</label>
              <select
                v-model="simSelectedSkillId"
                class="w-full bg-slate-800 border border-slate-700 text-white rounded p-2 text-xs focus:border-cyan-500 outline-none"
              >
                <option v-for="item in teachingsList" :key="item.id" :value="item.id">
                  [{{ item.categoryName }}] {{ item.name }}
                </option>
              </select>
            </div>

            <!-- 当前选中绝技概览 -->
            <div v-if="currentSimSkill" class="p-3 bg-slate-950/70 border border-slate-800 rounded space-y-2 text-xs">
              <div class="text-cyan-300 font-bold">{{ currentSimSkill.name }}</div>
              <div class="text-gray-400">属性: <span class="text-purple-300">{{ currentSimSkill.element }}</span></div>
              <div class="text-gray-400">消耗: <span class="text-amber-300">{{ currentSimSkill.cost }}</span></div>
              <div class="text-gray-300 text-[11px] leading-relaxed">{{ currentSimSkill.formula }}</div>
            </div>
          </div>

          <!-- 步骤 2: 设定施法者数值 -->
          <div class="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 class="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
              <span>2️⃣</span> 施法者属性配给
            </h3>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label class="text-gray-400 block mb-1">人物等级 (LV)</label>
                <input
                  v-model.number="simCaster.level"
                  type="number"
                  min="1"
                  max="99"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">当前生命 (HP)</label>
                <input
                  v-model.number="simCaster.hp"
                  type="number"
                  min="1"
                  max="9999"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">物理攻击力 (Atk)</label>
                <input
                  v-model.number="simCaster.atk"
                  type="number"
                  min="1"
                  max="255"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">魔法力 / 智力 (Int)</label>
                <input
                  v-model.number="simCaster.int"
                  type="number"
                  min="1"
                  max="255"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">敏捷速度 (Agi)</label>
                <input
                  v-model.number="simCaster.agi"
                  type="number"
                  min="1"
                  max="255"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">精神治愈 (Spi)</label>
                <input
                  v-model.number="simCaster.spi"
                  type="number"
                  min="1"
                  max="255"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <!-- 步骤 3: 模拟目标假人 -->
          <div class="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 class="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span>3️⃣</span> 演习目标木桩
            </h3>
            <div>
              <label class="text-xs text-gray-400 mb-1 block">目标类型</label>
              <select
                v-model="simTargetType"
                class="w-full bg-slate-800 border border-slate-700 text-white rounded p-2 text-xs focus:border-cyan-500 outline-none"
              >
                <option value="normal">普通魔兽 (防40, 魔抗20, 无弱点)</option>
                <option value="undead">冥界不死族 (防50, 圣弱点 2.0x, 暗吸收)</option>
                <option value="machine">古代兵器机械族 (防120, 水雷弱点 2.0x)</option>
                <option value="desert">荒漠沙漠种族 (防60, 水弱点 4.0x)</option>
                <option value="boss">高阶深渊霸主 (防180, 魔抗150, 全抗50%)</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-gray-400 mb-1 block">目标等级 (LV)</label>
              <input
                v-model.number="simTargetLevel"
                type="number"
                min="1"
                max="99"
                class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        <!-- 推演执行按钮与结算屏 -->
        <div class="p-6 bg-slate-950 rounded-xl border border-cyan-500/40 text-center space-y-4 shadow-xl">
          <div class="flex items-center justify-center gap-3">
            <button
              type="button"
              class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-lg text-sm shadow-lg shadow-cyan-500/30 transition-all cursor-pointer transform active:scale-95"
              @click="runSimulation"
            >
              🚀 执行绝技推演与伤害结算 (Calculate Simulation)
            </button>
          </div>

          <!-- 运算结果显示 -->
          <div v-if="simulationResult" class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div class="p-4 bg-slate-900/90 rounded-lg border border-cyan-500/30">
              <div class="text-xs text-cyan-400 uppercase tracking-wider mb-1">🎯 预估命中与总效能</div>
              <div class="text-3xl font-extrabold text-amber-300 font-mono">
                {{ simulationResult.damageDisplay }}
              </div>
              <div class="text-[11px] text-gray-400 mt-1">{{ simulationResult.damageType }}</div>
            </div>

            <div class="p-4 bg-slate-900/90 rounded-lg border border-purple-500/30">
              <div class="text-xs text-purple-400 uppercase tracking-wider mb-1">📊 触发特效与判定结算</div>
              <div class="text-sm font-semibold text-white">
                {{ simulationResult.specialTrigger }}
              </div>
              <div class="text-[11px] text-gray-400 mt-1">
                {{ simulationResult.combatStatus }}
              </div>
            </div>

            <div class="p-4 bg-slate-900/90 rounded-lg border border-emerald-500/30">
              <div class="text-xs text-emerald-400 uppercase tracking-wider mb-1">💡 引擎结算剖析</div>
              <div class="text-xs text-gray-300 font-mono text-left leading-relaxed">
                {{ simulationResult.formulaBreakdown }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 视图 4: Godot 4.x 引擎青魔法拟态系统源码 -->
    <div v-if="activeViewTab === 'engine_code'" class="space-y-4">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                GODOT 4.X BLUE MAGIC SYSTEM
              </span>
              <h3 class="text-base font-bold text-white">blue_magic_learning_system.gd</h3>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              受击判定、施法者存活状态校验、青魔道士被动捕获监听器与全队青魔法库同步器。
            </p>
          </div>
          <n-button size="small" round secondary type="info" @click="copyGdScript">
            <template #icon><span>📋</span></template>
            复制代码
          </n-button>
        </div>

        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[550px]">{{ gdScriptCode }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import { teachingsList, type TeachingItem } from '../config/teachingsConfig'

const message = useMessage()

type ViewTab = 'catalog' | 'bluemagic_matrix' | 'simulator' | 'engine_code'

const activeViewTab = ref<ViewTab>('catalog')
const tabList: { key: ViewTab; label: string; icon: string; badge?: string }[] = [
  { key: 'catalog', label: '秘传绝技全典', icon: '📜' },
  { key: 'bluemagic_matrix', label: '青魔法拟态全图鉴', icon: '👾', badge: 'NEW' },
  { key: 'simulator', label: '伤害与演练研习所', icon: '⚡' },
  { key: 'engine_code', label: '引擎拟态源码', icon: '🛠️' }
]

const activeCategory = ref('all')

const categories = computed(() => {
  return [
    { id: 'all', name: '全部秘传绝技', count: teachingsList.length },
    { id: 'sanctuary', name: '勇者圣所庇护法', count: teachingsList.filter(t => t.category === 'sanctuary').length },
    { id: 'mysidia', name: '米西迪亚高级禁术', count: teachingsList.filter(t => t.category === 'mysidia').length },
    { id: 'ninja', name: '东洋忍者遁术秘传', count: teachingsList.filter(t => t.category === 'ninja').length },
    { id: 'bluemagic', name: '青魔法学院拟态', count: teachingsList.filter(t => t.category === 'bluemagic').length }
  ]
})

const filteredTeachings = computed(() => {
  if (activeCategory.value === 'all') return teachingsList
  return teachingsList.filter(t => t.category === activeCategory.value)
})

const getTagType = (category: string) => {
  switch (category) {
    case 'sanctuary':
      return 'warning'
    case 'mysidia':
      return 'info'
    case 'ninja':
      return 'error'
    case 'bluemagic':
      return 'success'
    default:
      return 'default'
  }
}

// 青魔法魔物捕获图鉴
interface BlueMagicEntry {
  id: string
  code: string
  name: string
  icon: string
  mpCost: number
  sourceMonster: string
  location: string
  learningMethod: string
  effect: string
  tierLabel: string
  tierType: 'success' | 'warning' | 'info' | 'error'
}

const blueMagicDatabase: BlueMagicEntry[] = [
  {
    id: 'bm-white-wind',
    code: 'BM-01',
    name: '白风 (White Wind)',
    icon: '🍃',
    mpCost: 28,
    sourceMonster: '狂风鸟妖 / 风之精灵',
    location: '晨辉大平原 / 风之神殿高台',
    learningMethod: '操纵魔兽后命其对青魔道士施放，或肉身承受温风',
    effect: '全队回复相当于施法者当前 HP 的血量，无视禁疗与魔抗。',
    tierLabel: 'T0 核心群奶',
    tierType: 'success'
  },
  {
    id: 'bm-mighty-guard',
    code: 'BM-02',
    name: '强力守护 (Mighty Guard)',
    icon: '🛡️',
    mpCost: 72,
    sourceMonster: '坚甲海龟 / 虚空钢铁守护者',
    location: '孤岛外海沉船 / 次元裂隙前线',
    learningMethod: '必须使用魔兽使【操纵 (Control)】技能对其下令施放',
    effect: '瞬间为全队附加【物防提高 (Protect)】+【魔防提高 (Shell)】+【浮空 (Float)】。',
    tierLabel: 'T0 顶级防御',
    tierType: 'success'
  },
  {
    id: 'bm-lvl5-death',
    code: 'BM-03',
    name: '5级致死 (Level 5 Death)',
    icon: '💀',
    mpCost: 22,
    sourceMonster: '书库魔界花 / 远古石像鬼',
    location: '封印之城古代书库 / 绝望金字塔',
    learningMethod: '青魔道士等级为 5 的倍数时受击，且存活（需复活）后习得',
    effect: '对全场所有等级为 5 的倍数的敌人造成 100% 绝对秒杀（包含首领）。',
    tierLabel: 'T1 机制特攻',
    tierType: 'error'
  },
  {
    id: 'bm-1000-needles',
    code: 'BM-04',
    name: '千针刺 (1000 Needles)',
    icon: '🌵',
    mpCost: 25,
    sourceMonster: '沙漠巨型仙人掌',
    location: '南大陆无尽荒漠',
    learningMethod: '肉身硬抗千针刺伤害（需生命 > 1000 并存活）',
    effect: '对单体目标造成 1000 点绝对真实伤害，无视一切物抗与魔防。',
    tierLabel: 'T2 前期神器',
    tierType: 'info'
  },
  {
    id: 'bm-goblin-punch',
    code: 'BM-05',
    name: '哥布林碎颅重拳 (Goblin Punch)',
    icon: '🥊',
    mpCost: 0,
    sourceMonster: '荒野流浪哥布林',
    location: '始源村落周边林道',
    learningMethod: '新手初期被普通哥布林重拳命中并生还',
    effect: '当施法者等级与敌方等级完全相同时，伤害暴涨 800% 且极效破防。',
    tierLabel: 'T1 破防奇兵',
    tierType: 'warning'
  },
  {
    id: 'bm-aqua-breath',
    code: 'BM-06',
    name: '水之吐息 (Aqua Breath)',
    icon: '🌊',
    mpCost: 38,
    sourceMonster: '深海奇美拉 / 水龙王侍卫',
    location: '非之世界海底暗渠',
    learningMethod: '承受大范围海啸冲击后存活',
    effect: '全体水属性浪涌冲击，对沙漠与熔岩生物造成 4.0 倍破灭级重创。',
    tierLabel: 'T1 地下城清场',
    tierType: 'info'
  },
  {
    id: 'bm-frog-song',
    code: 'BM-07',
    name: '青蛙之歌 (Frog Song)',
    icon: '🐸',
    mpCost: 8,
    sourceMonster: '毒沼蛙妖',
    location: '迷失森林毒液沼泽',
    learningMethod: '魔兽使操纵或直接被蛙化受击',
    effect: '将目标永久变为青蛙形态并附加沉睡，大幅削减其攻击力并封印魔法。',
    tierLabel: 'T2 战术强控',
    tierType: 'warning'
  },
  {
    id: 'bm-doom',
    code: 'BM-08',
    name: '死亡宣告 (Doom)',
    icon: '⏳',
    mpCost: 10,
    sourceMonster: '死神幽影 / 棺木恶魔',
    location: '黑魔导飞空艇废墟',
    learningMethod: '承受死亡宣告倒计时诅咒',
    effect: '在敌方头顶悬挂 30 秒倒计时沙漏，归零时立刻暴毙。',
    tierLabel: 'T2 破盾磨血',
    tierType: 'error'
  },
  {
    id: 'bm-aero-3',
    code: 'BM-09',
    name: '狂风三式 (Aero III)',
    icon: '🌪️',
    mpCost: 24,
    sourceMonster: '青空暴风鹰狮',
    location: '浮游大陆云顶高崖',
    learningMethod: '承受全屏暴风撕裂后生还',
    effect: '最强风系群体法术，引动真空飓风重创敌方全员，对飞行生物暴击。',
    tierLabel: 'T1 元素爆发',
    tierType: 'info'
  },
  {
    id: 'bm-self-destruct',
    code: 'BM-10',
    name: '自爆 (Self-Destruct)',
    icon: '💣',
    mpCost: 1,
    sourceMonster: '火球炸弹怪 / 熔岩巨怪',
    location: '火之神殿熔岩深渊',
    learningMethod: '承受濒死炸弹自爆冲击后存活',
    effect: '牺牲施法者生命，对目标造成当前 HP × 200% 的绝对真实殉爆伤害。',
    tierLabel: 'T1 极意自爆',
    tierType: 'error'
  },
  {
    id: 'bm-vampire',
    code: 'BM-11',
    name: '吸血鬼之吻 (Vampire)',
    icon: '🩸',
    mpCost: 2,
    sourceMonster: '暗夜吸血蝙蝠',
    location: '地下水道 / 封印古墓',
    learningMethod: '被吸血攻击命中',
    effect: '扣除目标相当于【施法者最大生命 - 当前生命】/ 2 的血量并全额转化为自身治疗。',
    tierLabel: 'T2 绝境回血',
    tierType: 'warning'
  },
  {
    id: 'bm-matra-magic',
    code: 'BM-12',
    name: '玛特拉魔术 (Matra Magic)',
    icon: '🔮',
    mpCost: 12,
    sourceMonster: '机械魔导突击兵',
    location: '机械都市废墟',
    learningMethod: '承受连续 8 发微型追踪导弹轰击',
    effect: '向全场随机倾泻 8 枚魔导激光，每发附带破甲并概率吸收 MP。',
    tierLabel: 'T2 弹幕连击',
    tierType: 'info'
  }
]

// 演练台数据状态
const simSelectedSkillId = ref('hero-holyslash')
const simCaster = reactive({
  level: 45,
  hp: 2400,
  atk: 140,
  int: 120,
  agi: 78,
  spi: 85
})
const simTargetType = ref('undead')
const simTargetLevel = ref(45)

const currentSimSkill = computed(() => teachingsList.find(t => t.id === simSelectedSkillId.value))

const launchSimulator = (tech: TeachingItem) => {
  simSelectedSkillId.value = tech.id
  activeViewTab.value = 'simulator'
  runSimulation()
}

const resetSimulatorParams = () => {
  simCaster.level = 45
  simCaster.hp = 2400
  simCaster.atk = 140
  simCaster.int = 120
  simCaster.agi = 78
  simCaster.spi = 85
  simTargetType.value = 'normal'
  simTargetLevel.value = 45
  runSimulation()
}

interface SimulationOutput {
  damageDisplay: string
  damageType: string
  specialTrigger: string
  combatStatus: string
  formulaBreakdown: string
}

const simulationResult = ref<SimulationOutput | null>(null)

const runSimulation = () => {
  const skill = currentSimSkill.value
  if (!skill) return

  let dmg = 0
  let dmgType = '伤害总量'
  let trigger = '无额外状态'
  let status = '正常结算'
  let breakdown = ''

  const isLevelEqual = simCaster.level === simTargetLevel.value
  const targetDef = simTargetType.value === 'boss' ? 180 : simTargetType.value === 'machine' ? 120 : simTargetType.value === 'undead' ? 50 : 40

  switch (skill.id) {
    case 'hero-cover':
      dmg = Math.round((600 * 0.5) - (targetDef * 1.25))
      dmgType = '受击减伤抵御'
      trigger = '100% 替濒死队友承受伤害'
      status = '自带 50% 纯减伤护盾'
      breakdown = `原伤害 600 × 50% 减伤 - (自身防御 ${targetDef} × 1.25) = 吸收后受损 ${Math.max(1, dmg)} HP`
      break
    case 'hero-holyslash':
      const holyMul = simTargetType.value === 'undead' ? 2.0 : 1.0
      dmg = Math.round((simCaster.atk * 3.5 + simCaster.spi * 2.0 - targetDef * 0.5) * holyMul)
      dmgType = `${holyMul > 1 ? '🔥 圣属性弱点暴击！' : '单体圣剑破魔'}`
      trigger = '净化施法者全部减益状态'
      status = holyMul > 1 ? '对冥界不死生物造成 2.0 倍特攻暴击' : '稳定圣属性破除'
      breakdown = `(${simCaster.atk}×3.5 + ${simCaster.spi}×2.0 - 防御${targetDef}×0.5) × 倍率${holyMul} = ${dmg}`
      break
    case 'hero-order-covenant':
      const shield = Math.round(simCaster.hp * 0.25)
      dmg = shield
      dmgType = '全军光辉护盾值'
      trigger = '3 回合内全队减伤 35%'
      status = '全员免疫击退与行动硬直'
      breakdown = `施法者生命 ${simCaster.hp} × 25% = 为全队提供 ${shield} 点全域伤害吸收屏障`
      break
    case 'hero-sovereign-sigh':
      const reviveHp = Math.round(simCaster.hp * 0.5 + simCaster.spi * 5)
      dmg = reviveHp
      dmgType = '全员复活与大群愈'
      trigger = '逆境翻盘：全员 ATB 条置满'
      status = '清除死亡状态并瞬间复活'
      breakdown = `目标最大血量 × 50% + 精神 ${simCaster.spi}×5 = 单体恢复 ${reviveHp} HP`
      break
    case 'mysidia-meteor':
      const meteorTotal = Math.round(simCaster.int * 4.5 * 4)
      dmg = meteorTotal
      dmgType = '天体物理 4 连击'
      trigger = '无视敌方防御与魔抗'
      status = '4 颗炽热陨石随机轰击'
      breakdown = `4 颗 × (魔力 ${simCaster.int} × 4.5) 无视双防 = ${meteorTotal} 毁灭总伤`
      break
    case 'mysidia-quick':
      dmg = 2
      dmgType = '获得 2 回合瞬动槽'
      trigger = '全场时间流即刻绝对冻结'
      status = '除施法者外全场 ATB 归零'
      breakdown = 'Time Freeze Active: 2 Free Action Slots 锁死敌方任何行动'
      break
    case 'mysidia-ultima':
      dmg = 9999
      dmgType = '全屏极限界限突破 9999'
      trigger = '创生与湮灭全知神圣'
      status = '全体均摊究极白热光柱'
      breakdown = `(黑魔力 + 白魔力) × 4.6 突破伤害上限阈值 = 9999 (MAX)`
      break
    case 'bluemagic-goblin-punch':
      if (isLevelEqual) {
        dmg = Math.round(simCaster.atk * 8.0)
        dmgType = '🎯 同等级 8.0 倍破防暴击！'
        trigger = `施法者等级(${simCaster.level}) === 目标等级(${simTargetLevel.value}) 极效共振`
        status = '无视物理护甲重创'
        breakdown = `攻击力 ${simCaster.atk} × 8.0 (同级共振倍率) = ${dmg}`
      } else {
        dmg = Math.round(simCaster.atk * 1.0 - targetDef * 0.5)
        dmgType = '普通哥布林重拳'
        trigger = `施法者(${simCaster.level}) 与目标(${simTargetLevel.value}) 等级不同`
        status = '常规普攻倍率'
        breakdown = `攻击力 ${simCaster.atk} × 1.0 - 防御 ${targetDef} × 0.5 = ${Math.max(1, dmg)}`
      }
      break
    case 'bluemagic-1000-needles':
      dmg = 1000
      dmgType = '真实绝对固定伤害'
      trigger = '无视敌方护甲与魔防'
      status = '1000 点穿刺真实扣除'
      breakdown = '固定伤害结算: 绝对命中 1000 真实伤害'
      break
    default:
      dmg = Math.round(simCaster.atk * 2.2 + simCaster.int * 1.8)
      dmgType = '术式综合伤害'
      trigger = '标准绝技结算'
      status = '无异常状态'
      breakdown = `攻击 ${simCaster.atk}×2.2 + 智力 ${simCaster.int}×1.8 = ${dmg}`
      break
  }

  simulationResult.value = {
    damageDisplay: String(dmg),
    damageType: dmgType,
    specialTrigger: trigger,
    combatStatus: status,
    formulaBreakdown: breakdown
  }
}

// Godot 4.x 代码
const gdScriptCode = `# ==============================================================================
# BlueMagicLearningSystem - 青魔法受击拟态观察与技能习得单例
# 文件路径: res://scripts/combat/blue_magic_learning_system.gd
# 架构定位: 挂载于战斗内核，监听怪物法术命中事件并判定青魔道士存活与全队同步
# ==============================================================================
class_name BlueMagicLearningSystem
extends Node

signal blue_magic_learned(spell_id: String, learner_name: String)

# 全局已习得青魔法典藏字典 (SaveGame 同步持久化)
var learned_spells: Dictionary = {
	"bm_white_wind": true,
	"bm_goblin_punch": true,
	"bm_1000_needles": false,
	"bm_mighty_guard": false,
	"bm_lvl5_death": false
}

# 青魔法技能与魔物行为映射表
const BLUE_MAGIC_CATALOG: Dictionary = {
	"spell_white_wind": { "id": "bm_white_wind", "name": "白风", "mp": 28 },
	"spell_1000_needles": { "id": "bm_1000_needles", "name": "千针刺", "mp": 25 },
	"spell_lvl5_death": { "id": "bm_lvl5_death", "name": "5级致死", "mp": 22 },
	"spell_mighty_guard": { "id": "bm_mighty_guard", "name": "强力守护", "mp": 72 },
	"spell_goblin_punch": { "id": "bm_goblin_punch", "name": "哥布林重拳", "mp": 0 }
}

func _ready() -> void:
	print("[BlueMagic] 青魔法拟态监听器就绪，当前已解锁技能数: %d" % get_learned_count())

## 战斗事件监听: 当敌方技能命中我方队员时触发
func on_spell_hit_character(spell_internal_id: String, target_actor: Node) -> void:
	if not BLUE_MAGIC_CATALOG.has(spell_internal_id):
		return # 非青魔法目录内的法术
		
	var spell_data: Dictionary = BLUE_MAGIC_CATALOG[spell_internal_id]
	var spell_id: String = spell_data["id"]
	
	if learned_spells.get(spell_id, false):
		return # 已经学会，跳过
		
	# 检查受击者是否具备【学习 (Learning)】被动能力（青魔道士或装备了青魔纹章）
	if not target_actor.has_method("has_passive") or not target_actor.has_passive("passive_blue_learning"):
		return
		
	# 核心安全法则: 受击者必须在战斗结束或技能结算后存活（HP > 0）
	if target_actor.current_hp <= 0:
		return
		
	# 达成学习条件！
	learned_spells[spell_id] = true
	emit_signal("blue_magic_learned", spell_id, target_actor.actor_name)
	_play_learning_vfx(target_actor)
	print("[BlueMagic] 恭喜！%s 在受击后成功领悟青魔法【%s】！" % [target_actor.actor_name, spell_data["name"]])

func _play_learning_vfx(actor: Node) -> void:
	# 触发头顶光环与提示音效
	if actor.has_method("show_status_popup"):
		actor.show_status_popup("LEARNED!", Color(0.2, 0.9, 1.0))

func get_learned_count() -> int:
	var c := 0
	for k in learned_spells.keys():
		if learned_spells[k]:
			c += 1
	return c
`

const copyGdScript = () => {
  navigator.clipboard.writeText(gdScriptCode).then(() => {
    message.success('blue_magic_learning_system.gd 源码已复制到剪贴板！')
  }).catch(() => {
    message.info('源码已复制')
  })
}
</script>

<style scoped>
.teaching-category-button:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 3px;
}
</style>
