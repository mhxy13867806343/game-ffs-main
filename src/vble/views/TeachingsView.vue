<template>
  <div class="teachings-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Sanctuary & Secret Masteries</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">秘传绝技：勇者圣所、米西迪亚与东洋忍法</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-sm leading-relaxed">
        涵盖勇者圣所真·舍身庇护与秩序契约、米西迪亚大魔道院时空禁术、东洋忍道五遁秘卷及魔物拟态青魔法之全量导师试炼与实战演算
      </p>
    </div>

    <!-- 交互式研习台切换 Tabs -->
    <div class="flex justify-center border-b border-slate-800 pb-3">
      <div class="inline-flex p-1 bg-slate-900/90 rounded-xl border border-slate-800">
        <button
          type="button"
          class="px-5 py-2 text-sm font-semibold rounded-lg transition-all"
          :class="activeViewTab === 'catalog' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'"
          @click="activeViewTab = 'catalog'"
        >
          📜 秘传绝技全典 ({{ teachingsList.length }}卷)
        </button>
        <button
          type="button"
          class="px-5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5"
          :class="activeViewTab === 'simulator' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'"
          @click="activeViewTab = 'simulator'"
        >
          <span>⚡</span>
          <span>实战推演与伤害模拟研习所</span>
          <n-badge value="NEW" type="warning" />
        </button>
      </div>
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

    <!-- 视图 2: 绝技伤害与实战演练台 -->
    <div v-else class="space-y-6">
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
  </div>
</template>

<script setup lang="ts">
import { teachingsList, type TeachingItem } from '../config/teachingsConfig'

const activeViewTab = ref<'catalog' | 'simulator'>('catalog')
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
    case 'mysidia-singularity':
      dmg = Math.round(simCaster.spi * 8)
      dmgType = simTargetType.value === 'boss' ? '首领重力撕裂伤害' : '扣除当前 75% HP'
      trigger = '首领行动速度被削弱 50%'
      status = simTargetType.value === 'boss' ? '施加重力减速场' : '小怪直接削减 75% 现有血线'
      breakdown = simTargetType.value === 'boss' ? `首领撕裂 = 精神 ${simCaster.spi} × 8 = ${dmg}` : '直接削减 3/4 当前生命值'
      break
    case 'ninja-water':
      const waterMul = simTargetType.value === 'machine' ? 2.0 : simTargetType.value === 'desert' ? 4.0 : 1.0
      dmg = Math.round((simCaster.agi * 2.8 + simCaster.int * 1.5) * 1.4 * waterMul)
      dmgType = `${waterMul > 1 ? `🌊 水属性 ${waterMul}x 巨浪弱点破灭` : '水遁巨浪全体'}`
      trigger = simTargetType.value === 'machine' ? '引发电路短路与触电硬直' : '消耗【水之卷轴】×1'
      status = '全阵列贯穿水相攻击'
      breakdown = `(${simCaster.agi}×2.8 + ${simCaster.int}×1.5) × 1.4 × 倍率${waterMul} = ${dmg}`
      break
    case 'ninja-substitution':
      dmg = 3
      dmgType = '原木替身回避层数'
      trigger = '绝对免疫接下来 3 次物理攻击'
      status = '免受击穿，保全二刀流'
      breakdown = 'Cicada Shield = 3 Stacks (每次受击消耗 1 层，不损生命)'
      break
    case 'ninja-thunder':
      const thunderMul = simTargetType.value === 'machine' ? 2.0 : 1.5
      dmg = Math.round((simCaster.agi * 3.2 + simCaster.atk * 1.8) * thunderMul)
      dmgType = '雷鸣紫电必定暴击！'
      trigger = '100% 附加麻痹状态 (1轮禁动)'
      status = '打断目标施法与蓄力姿态'
      breakdown = `(${simCaster.agi}×3.2 + ${simCaster.atk}×1.8) × 雷暴${thunderMul} = ${dmg}`
      break
    case 'ninja-mirage-strike':
      const singleSlash = Math.round(simCaster.atk * 0.85 * 1.25)
      dmg = singleSlash * 8
      dmgType = '八荒无相 8 连斩击！'
      trigger = '双名刀特效继承与多重暴击'
      status = '影武者奥义爆发'
      breakdown = `8 次斩击 × (物攻 ${simCaster.atk} × 0.85 × 暴击) = ${dmg} 物理极效总伤`
      break
    case 'bluemagic-goblin-punch':
      if (isLevelEqual) {
        dmg = Math.round(simCaster.atk * 8.0)
        dmgType = '🔥 同等级 8 倍怪力碎颅！'
        trigger = '施法者LV = 目标LV (同频共振)'
        status = '无视防御的金刚破防'
        breakdown = `同等级达成 (LV ${simCaster.level})！攻击力 ${simCaster.atk} × 8.0 = ${dmg}`
      } else {
        dmg = Math.round(simCaster.atk * 1.0 - targetDef * 0.5)
        dmgType = '普通小鬼拳击'
        trigger = '等级不同 (无法同频)'
        status = '普通敲击'
        breakdown = `等级不符 (${simCaster.level} vs ${simTargetLevel.value})，基础伤害 = ${Math.max(1, dmg)}`
      }
      break
    case 'bluemagic-white-wind':
      dmg = simCaster.hp
      dmgType = '全队单体绝对均抬'
      trigger = '无视魔防与禁疗结界'
      status = '回复量 = 施法者当前 HP'
      breakdown = `全队每人回复 = 施法者当前实际生命 ${simCaster.hp} 点 HP`
      break
    case 'bluemagic-1000-needles':
      dmg = 1000
      dmgType = '绝对真实固定伤害'
      trigger = '无视防御 / 无视减伤 / 必中'
      status = '万针穿心真实暴击'
      breakdown = '1000 Needles: 恒定 1000 点固定伤害，不可被减免抵消'
      break
    case 'bluemagic-aqua-breath':
      const aquaMul = simTargetType.value === 'desert' ? 4.0 : 1.0
      dmg = Math.round((simCaster.int * 3.0 + simCaster.level * 12) * aquaMul)
      dmgType = aquaMul > 1 ? '🌊 沙漠生物 4.0x 蒸发特攻！' : '全屏深渊海啸'
      trigger = '深海奇美拉深渊吐息'
      status = '全体水属性沸腾冲刷'
      breakdown = `(${simCaster.int}×3.0 + 等级${simCaster.level}×12) × 特攻${aquaMul} = ${dmg}`
      break
    default:
      dmg = Math.round(simCaster.atk * 2.0)
      dmgType = '基础绝技伤害'
      trigger = '常规命中'
      status = '普通效果'
      breakdown = '标准计算公式'
  }

  simulationResult.value = {
    damageDisplay: typeof dmg === 'number' && dmg > 0 ? `${dmg.toLocaleString()}` : `${dmg}`,
    damageType: dmgType,
    specialTrigger: trigger,
    combatStatus: status,
    formulaBreakdown: breakdown
  }
}

// 初始运算一次
onMounted(() => {
  runSimulation()
})
</script>

<style scoped>
.teaching-category-button:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 2px;
}
</style>
