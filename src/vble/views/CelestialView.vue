<template>
  <div class="celestial-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-indigo-950/80 border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/30">
              VOID CASTLE & CELESTIAL SINGULARITY
            </span>
            <span class="text-xs text-gray-400">虚空城堡与终焉星体引力矩阵</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🪐</span> 虚空天体：次元之隙四阶与九大星体引力工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            探索虚空城堡四层湮灭空间、五大始源元素共鸣，以及九大行星对战场环境的星体引力修正。全息实装引力场动态演算沙盘与奇点坍缩机制。
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
            <template #icon><span>🌌</span></template>
            前往星体演算沙盘
          </n-button>
          <router-link to="/vble/dungeons">
            <n-button size="medium" round tertiary>
              查看迷宫秘境
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心统计概览卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">次元湮灭阶层</div>
        <div class="text-2xl font-black text-purple-400 font-mono mt-1">{{ voidStagesList.length }} 阶</div>
        <div class="text-[10px] text-gray-500 mt-0.5">流沙 / 蜃楼 / 齿轮 / 奇点</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">行星引力矩阵</div>
        <div class="text-2xl font-black text-yellow-400 font-mono mt-1">{{ solarPlanetsList.length }} 大行星</div>
        <div class="text-[10px] text-gray-500 mt-0.5">战场环境引力流速修正</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">始源水晶元素</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">5 重共鸣</div>
        <div class="text-[10px] text-gray-500 mt-0.5">风 · 水 · 火 · 土 · 虚</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">引力场计算核心</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">Godot 4.x</div>
        <div class="text-[10px] text-gray-500 mt-0.5">celestial_gravity.gd</div>
      </div>
    </div>

    <!-- 次元之隙四大阶层全景展台 -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-cyan-300 flex items-center gap-2">
          <span>🌀</span> 次元之隙四大阶层湮灭空间
        </h2>
        <span class="text-xs text-gray-400">各层盘踞专属首领与法则扭曲</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="stg in voidStagesList"
          :key="stg.id"
          class="p-5 rounded-xl bg-[#140f26]/90 border transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          :class="selectedStageId === stg.id ? 'border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-500/40' : 'border-purple-900/40 hover:border-purple-800'"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="text-base font-bold text-purple-300">{{ stg.name }}</h3>
              <div class="text-xs text-gray-400 mt-0.5">领域意境: <span class="text-gray-200">{{ stg.theme }}</span></div>
            </div>
            <n-tag size="small" type="info" secondary>{{ stg.zoneType }}</n-tag>
          </div>

          <div class="mt-3 p-2.5 rounded bg-slate-900/80 border border-purple-950 flex items-center justify-between text-xs">
            <span class="text-red-400 font-medium">盘踞霸主:</span>
            <span class="text-red-300 font-bold font-mono">{{ stg.boss }}</span>
          </div>

          <p class="text-xs text-gray-400 leading-relaxed mt-3 pt-3 border-t border-purple-950/80">
            {{ stg.desc }}
          </p>

          <div class="mt-3 pt-3 border-t border-purple-950 flex items-center justify-between">
            <span class="text-[11px] text-gray-500">空间编码: {{ stg.id }}</span>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1"
              :class="selectedStageId === stg.id ? 'bg-purple-500 text-white font-bold' : 'bg-slate-800 text-purple-300 hover:bg-slate-750 border border-purple-900/50'"
              @click="selectedStageId = stg.id; scrollToStudio()"
            >
              <span>{{ selectedStageId === stg.id ? '✓ 正在演算' : '🎯 选定演算层' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 五大始源元素共鸣展台 -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-xl">💎</span>
        <h3 class="text-lg font-bold text-amber-300">五大始源水晶元素共鸣矩阵 (Elemental Resonance)</h3>
      </div>
      <p class="text-xs text-gray-400">
        维持行星运转与晶石纪元秩序的五大基石能量，虚空奇点超越全属性生克。
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 pt-2">
        <div
          v-for="el in fiveElementsList"
          :key="el.name"
          class="p-4 bg-slate-950/80 border rounded-xl text-center space-y-1.5 transition-all hover:scale-[1.02]"
          :class="selectedElementResonance === el.name ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]' : 'border-slate-800 hover:border-slate-700'"
          @click="selectedElementResonance = el.name"
        >
          <div class="text-3xl">{{ el.symbol }}</div>
          <div class="text-base font-bold" :class="el.color">{{ el.name }}</div>
          <p class="text-[11px] text-gray-400 leading-snug">{{ el.desc }}</p>
          <button
            type="button"
            class="mt-2 text-[10px] px-2 py-0.5 rounded border border-slate-700 bg-slate-900 text-gray-300 hover:text-white"
          >
            {{ selectedElementResonance === el.name ? '✓ 当前激活' : '点击激活' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 核心实机推演沙盘：九大行星引力场演算工坊 -->
    <div id="celestial-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#120f21] via-[#16122b] to-[#0d0918] border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.18)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-950 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              PLANETARY SIMULATION STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🪐</span> 九大行星战场引力修正与虚空坍缩沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            对齐 Godot 引擎 celestial_gravity.gd：演算行星投影引力流速、ATB 潮汐阻尼、元素抗性反转与奇点湮灭概率。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickResonance">
            🌌 激发引力共振
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：行星投影与战场环境 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-yellow-300 flex items-center gap-2">
            <span>🪐</span> 行星投影配置 (Planetary Projection)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">主导行星投影 (Dominant Planet)</label>
              <n-select
                v-model:value="selectedPlanet"
                :options="planetSelectOptions"
                size="small"
              />
            </div>

            <div>
              <label class="text-gray-400 block mb-1">当前交战次元阶层 (Void Stage)</label>
              <n-select
                v-model:value="selectedStageId"
                :options="stageSelectOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>行星引力流速强弱 (Gravity Intensity):</span>
                <span class="font-mono text-purple-400 font-bold text-sm">{{ gravityIntensity }}%</span>
              </div>
              <n-slider v-model:value="gravityIntensity" :min="10" :max="200" :step="10" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">佩戴【星体引力稳定锚】(免疫下坠/时滞):</span>
                <n-switch v-model:value="hasGravityAnchor" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">激活【虚空晶石共鸣】(抗衡全异常):</span>
                <n-switch v-model:value="hasVoidCrystalSync" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：队伍以太亲和与战术姿态 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>✨</span> 元素调和与姿态 (Harmonization)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">队伍始源水晶亲和 (Elemental Affinity)</label>
              <n-select
                v-model:value="selectedElementResonance"
                :options="elementSelectOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>虚空坍缩倒计时 (Collapse Countdown):</span>
                <span class="font-mono text-rose-400 font-bold">{{ collapseCountdown }} 轮次</span>
              </div>
              <n-slider v-model:value="collapseCountdown" :min="1" :max="15" :step="1" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">敌方处于【不死系冥界狂暴态】:</span>
                <n-switch v-model:value="isEnemyUndeadRage" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">施展【青魔法全场贯通】:</span>
                <n-switch v-model:value="isBlueMagicSurge" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息引力场演算结果 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-purple-950/40 to-slate-900 border border-purple-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-purple-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 实时引力场结算</span>
              <n-tag size="tiny" :type="gravityResult.collapseDanger ? 'error' : 'success'">
                {{ gravityResult.collapseDanger ? '奇点坍缩临界' : '引力场处于稳定态' }}
              </n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- ATB 潮汐流速 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">行动条 (ATB) 潮汐流速加权</div>
                <div class="text-3xl font-black font-mono mt-1 tracking-wider" :class="gravityResult.atbSpeedColor">
                  {{ gravityResult.atbSpeedModifier }}x
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  {{ gravityResult.atbNotes }}
                </div>
              </div>

              <!-- 元素倍率与坍缩概率 -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">环境元素增益</div>
                  <div class="font-mono font-bold text-cyan-300 mt-0.5 text-sm">
                    {{ gravityResult.elementBuffText }}
                  </div>
                </div>
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">坍缩反噬危险度</div>
                  <div class="font-mono font-bold mt-0.5 text-sm" :class="gravityResult.collapsePercent > 60 ? 'text-rose-400' : 'text-emerald-400'">
                    {{ gravityResult.collapsePercent }}%
                  </div>
                </div>
              </div>

              <!-- 引力机制判定 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-yellow-400 font-bold flex items-center gap-1">
                  <span>🪐 星体引力机制:</span>
                  <span>{{ gravityResult.effectTitle }}</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ gravityResult.effectDesc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>引擎算法: celestial_gravity.gd</span>
            <span class="text-purple-400">VBLE Celestial Engine v2.2.210</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 九大行星引力矩阵详细列表 -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold text-yellow-300 flex items-center gap-2">
          <span>🪐</span> 九大行星战场引力修正全息矩阵
        </h3>
        <span class="text-xs text-gray-400">点击任意星体可直接同步至上方沙盘</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="p in solarPlanetsList"
          :key="p.name"
          class="p-4 rounded-xl bg-slate-900/80 border transition-all cursor-pointer hover:border-yellow-400/50"
          :class="selectedPlanet === p.name ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.25)] ring-1 ring-yellow-400/40' : 'border-slate-800'"
          @click="selectedPlanet = p.name"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-yellow-300">{{ p.name }}</span>
            <n-tag size="tiny" type="warning">{{ p.element }}</n-tag>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed mt-2">{{ p.effect }}</p>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-purple-300">celestial_gravity.gd (Godot 4.x 虚空引力场算法)</span>
        </div>
        <n-button size="tiny" secondary type="primary" @click="copyGodotCode">
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
import { voidStages, solarPlanets, fiveElements, type VoidStage } from '../config/celestialConfig'

const message = useMessage()

const selectedStageId = ref('stage-4')
const selectedPlanet = ref('冥王星 (Pluto)')
const selectedElementResonance = ref('虚 (Void)')
const gravityIntensity = ref(100)
const collapseCountdown = ref(5)

const hasGravityAnchor = ref(true)
const hasVoidCrystalSync = ref(true)
const isEnemyUndeadRage = ref(true)
const isBlueMagicSurge = ref(false)
const copiedCode = ref(false)

const voidStagesList = computed(() => voidStages)
const solarPlanetsList = computed(() => solarPlanets)
const fiveElementsList = computed(() => fiveElements)

const planetSelectOptions = computed(() => {
  return solarPlanets.map(p => ({
    label: `${p.name} - ${p.element}`,
    value: p.name
  }))
})

const stageSelectOptions = computed(() => {
  return voidStages.map((s: VoidStage) => ({
    label: s.name,
    value: s.id
  }))
})

const elementSelectOptions = computed(() => {
  return fiveElements.map(e => ({
    label: `${e.symbol} ${e.name}`,
    value: e.name
  }))
})

const scrollToStudio = () => {
  const el = document.getElementById('celestial-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetStudioParams = () => {
  selectedStageId.value = 'stage-4'
  selectedPlanet.value = '冥王星 (Pluto)'
  selectedElementResonance.value = '虚 (Void)'
  gravityIntensity.value = 100
  collapseCountdown.value = 5
  hasGravityAnchor.value = true
  hasVoidCrystalSync.value = true
  isEnemyUndeadRage.value = true
  isBlueMagicSurge.value = false
  message.info('星体引力沙盘参数已恢复默认')
}

const triggerOneClickResonance = () => {
  if (gravityResult.value.collapseDanger) {
    message.error(`警告：当前虚空坍缩反噬危险度高达 ${gravityResult.value.collapsePercent}%，请佩戴引力稳定锚！`)
    return
  }
  message.success(`🌌 行星引力共振激活！ATB 流速倍率 ${gravityResult.value.atbSpeedModifier}x，${gravityResult.value.effectTitle}`)
}

// 核心引力场与坍缩推演算法
const gravityResult = computed(() => {
  const curPlanet = solarPlanets.find(p => p.name === selectedPlanet.value) || solarPlanets[0]
  const pName = curPlanet.name

  let atbSpeed = 1.0
  let atbNotes = '标准时间流速'
  let atbSpeedColor = 'text-cyan-400'
  let elementBuffText = '+0% 元素增益'
  let effectTitle = curPlanet.element
  let effectDesc = curPlanet.effect

  // 土星时滞
  if (pName.includes('土星')) {
    if (hasGravityAnchor.value) {
      atbSpeed = 1.0
      atbNotes = '已佩戴【星体引力稳定锚】，彻底抵消土星 15% 行动时滞！'
      atbSpeedColor = 'text-emerald-400'
    } else {
      atbSpeed = 0.85
      atbNotes = '受到土星时滞力场压制，行动流速降低 15%'
      atbSpeedColor = 'text-yellow-400'
    }
  }
  // 水星极寒
  else if (pName.includes('水星')) {
    elementBuffText = '冰霜伤害 +50% / 火伤易伤 +25%'
  }
  // 火星熔岩
  else if (pName.includes('火星')) {
    elementBuffText = '烈焰灼烧 +30% 暴击'
    atbSpeed = 1.1
    atbNotes = '熔岩热浪刺激神经反射，行动流速小幅提升'
  }
  // 木星风暴
  else if (pName.includes('木星')) {
    elementBuffText = '万钧雷霆暴击率 +25%'
  }
  // 天王星真空
  else if (pName.includes('天王星')) {
    if (isBlueMagicSurge.value) {
      elementBuffText = '青魔法效能爆发 +40%'
      effectDesc = '全场处于青色真空状态，青魔法【白风】、【自爆】、【死亡宣告】效能强化 40%！'
    }
  }
  // 海王星深蓝
  else if (pName.includes('海王星')) {
    elementBuffText = '水属性法术消耗减半 (MP -50%)'
  }
  // 冥王星冥界
  else if (pName.includes('冥王星')) {
    if (isEnemyUndeadRage.value) {
      elementBuffText = '不死系狂暴属性强化 +50%'
      effectDesc = '冥界极寒使不死系魔物生命与攻击提升 50%，需使用复活之尾或圣光迅速净化！'
    }
  }

  // 计算虚空坍缩危险度
  let collapsePercent = Math.max(0, 100 - collapseCountdown.value * 7)
  if (selectedStageId.value === 'stage-4') collapsePercent += 20 // 终焉奇点额外风险
  if (!hasGravityAnchor.value) collapsePercent += 15
  if (hasVoidCrystalSync.value) collapsePercent -= 20
  collapsePercent = Math.min(99, Math.max(5, collapsePercent))

  const collapseDanger = collapsePercent >= 70

  return {
    atbSpeedModifier: atbSpeed.toFixed(2),
    atbNotes,
    atbSpeedColor,
    elementBuffText,
    collapsePercent,
    collapseDanger,
    effectTitle,
    effectDesc
  }
})

// Godot 核心代码
const godotCodeText = `## celestial_gravity.gd
## 《光之战士：时空裂隙》九大行星引力场与虚空环境修正引擎
extends Node
class_name CelestialGravity

signal gravity_shifted(planet: String, atb_mod: float, effects: Dictionary)
signal void_collapse_warning(danger_level: float)

func calculate_field_modifiers(planet_name: String, has_anchor: bool) -> Dictionary:
	var result = { "atb_speed": 1.0, "dmg_buff": {}, "hazard": "" }
	
	match planet_name:
		"土星 (Saturn)":
			result.atb_speed = 1.0 if has_anchor else 0.85
			result.hazard = "TIME_DILATION_15"
		"火星 (Mars)":
			result.dmg_buff["fire"] = 1.30
			result.hazard = "LAVA_BURN"
		"海王星 (Neptune)":
			result.dmg_buff["water_cost"] = 0.50
		"冥王星 (Pluto)":
			result.hazard = "UNDEAD_RAGE_50"
	
	emit_signal("gravity_shifted", planet_name, result.atb_speed, result)
	return result
`

const copyGodotCode = async () => {
  try {
    await navigator.clipboard.writeText(godotCodeText)
    copiedCode.value = true
    message.success('已复制 celestial_gravity.gd 核心实机代码！')
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}
</script>

<style scoped>
.text-glow-purple {
  text-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
}
</style>
