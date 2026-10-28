<template>
  <div class="boss-tactics-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900/90 to-purple-950/80 border border-red-500/30 shadow-[0_0_35px_rgba(239,68,68,0.15)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono font-bold text-xs border border-red-500/30">
              EPIC BOSS PHASE MECHANICS & RAID GUIDE
            </span>
            <span class="text-xs text-gray-400">首领攻坚全鉴与终焉破阵法</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>👹</span> 首领攻坚全鉴：多阶段机制与终焉破阵工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            收录风之神殿翼手龙、卡尔纳克液态火焰、吉尔伽美什六战与大桥死斗，乃至神龙开局大海啸与欧米茄反击破阵。全息实装首领阶段转换演练与针对克制沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>⚔️</span></template>
            前往攻坚推演沙盘
          </n-button>
          <router-link to="/vble/monsters">
            <n-button size="medium" round tertiary>
              查看魔物图鉴
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心统计概览卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">已收录史诗首领</div>
        <div class="text-2xl font-black text-rose-400 font-mono mt-1">{{ bossList.length }} 尊</div>
        <div class="text-[10px] text-gray-500 mt-0.5">跨越三界与虚空深渊</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">最高攻坚难度</div>
        <div class="text-2xl font-black text-purple-400 font-mono mt-1">T4 虚空超神</div>
        <div class="text-[10px] text-gray-500 mt-0.5">欧米茄 / 神龙 / 终焉埃克斯迪斯</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">核心转阶段杀招</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">42 项机制</div>
        <div class="text-[10px] text-gray-500 mt-0.5">形态轮转 / 狂暴 / 即死倒计时</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">实机攻坚算法</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">Godot 4.x</div>
        <div class="text-[10px] text-gray-500 mt-0.5">boss_tactics_battle.gd</div>
      </div>
    </div>

    <!-- 难度分层筛选与检索 -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs text-gray-400 font-semibold mr-1">攻坚难度:</span>
        <button
          v-for="tier in tiers"
          :key="tier.id"
          type="button"
          class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
          :class="activeTier === tier.id ? 'bg-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.5)]' : 'bg-slate-800 text-gray-400 hover:text-gray-200'"
          @click="activeTier = tier.id"
        >
          {{ tier.name }}
        </button>
      </div>

      <div class="flex items-center gap-3">
        <n-input
          v-model:value="searchKeyword"
          placeholder="搜索首领、杀招、弱点、秘境..."
          size="small"
          clearable
          class="w-full md:w-64"
        >
          <template #prefix>🔍</template>
        </n-input>
      </div>
    </div>

    <!-- 首领卡片网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="boss in filteredBosses"
        :key="boss.id"
        class="rounded-xl bg-[#0f1422]/90 border transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
        :class="selectedBossId === boss.id ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] ring-1 ring-rose-500/50' : 'border-slate-800 hover:border-slate-700'"
      >
        <div class="space-y-3.5">
          <!-- 卡片头部 -->
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">{{ getBossIcon(boss.tier) }}</span>
                <h3 class="font-bold text-base text-rose-400">{{ boss.name }}</h3>
              </div>
              <div class="text-xs text-gray-400 mt-0.5">「{{ boss.title }}」</div>
            </div>
            <n-tag size="small" :type="getTierTagType(boss.tier)">
              {{ boss.tier }}
            </n-tag>
          </div>

          <!-- 战场与生命值概览 -->
          <div class="flex justify-between items-center text-xs text-gray-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <span>📍 驻留战场: <strong class="text-gray-200">{{ boss.location }}</strong></span>
            <span>❤️ 总生命力: <strong class="text-amber-400 font-mono">{{ boss.hp }}</strong></span>
          </div>

          <!-- 弱点与破绽 -->
          <div class="text-xs">
            <span class="text-purple-400 font-bold">🎯 弱点与破绽: </span>
            <span class="text-cyan-300 font-medium">{{ boss.weakness }}</span>
          </div>

          <!-- 核心机制与杀招 -->
          <div class="p-3 bg-red-950/30 border border-red-900/40 rounded-lg space-y-1">
            <div class="text-xs text-red-400 font-bold flex items-center gap-1.5">
              <span>⚠️ 核心转阶段机制与狂暴杀招:</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">{{ boss.keyGimmick }}</p>
          </div>

          <!-- 破阵方案 -->
          <div class="p-3 bg-blue-950/30 border border-blue-900/40 rounded-lg space-y-1">
            <div class="text-xs text-cyan-400 font-bold flex items-center gap-1.5">
              <span>🛡️ 推荐战术构筑与破阵方案:</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">{{ boss.strategy }}</p>
          </div>

          <!-- 击破战利品 -->
          <div class="text-xs text-yellow-300/90 pt-1 border-t border-slate-800">
            🎁 击破掉落/偷取: <strong class="text-white">{{ boss.rewards }}</strong>
          </div>
        </div>

        <!-- 底部快捷载入按钮 -->
        <div class="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-[11px] text-gray-500">阶数: {{ boss.phases }} 阶段转换</span>
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
            :class="selectedBossId === boss.id ? 'bg-rose-500 text-white font-bold shadow-md' : 'bg-slate-800 text-rose-300 hover:bg-slate-750 border border-slate-700'"
            @click="selectForSimulation(boss.id)"
          >
            <span>{{ selectedBossId === boss.id ? '✓ 正在推演' : '⚔️ 载入攻坚沙盘' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 核心实机推演沙盘：首领攻坚与转阶段机制演练工坊 -->
    <div id="raid-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#120e17] via-[#171220] to-[#0d0a14] border border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              RAID SIMULATION STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> 首领攻坚沙盘：转阶段轴与硬核克制推演
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            动态对齐 Godot 引擎 boss_tactics_battle.gd 机制树：推演首领生命百分比衰减、狂暴杀招触发门禁与针对装配生存率。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="error" class="font-bold shadow" @click="triggerOneClickAttack">
            ⚔️ 全力开火斩杀
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：目标首领与当前阶段血量 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-rose-400 flex items-center gap-2">
            <span>👹</span> 首领状态配置 (Boss Status)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选定攻坚首领 (Target Boss)</label>
              <n-select
                v-model:value="selectedBossId"
                :options="bossSelectOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>首领当前生命值百分比 (HP %):</span>
                <span class="font-mono text-rose-400 font-bold text-sm">{{ bossHpPercent }}%</span>
              </div>
              <n-slider v-model:value="bossHpPercent" :min="1" :max="100" :step="1" />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>奥丁斩铁倒计时 (若适用):</span>
                <span class="font-mono text-amber-400 font-bold">{{ odinCountdown }} 秒 / 60 秒</span>
              </div>
              <n-slider v-model:value="odinCountdown" :min="0" :max="60" :step="5" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">首领进入【狂暴/蓄力状态】:</span>
                <n-switch v-model:value="isBossEnraged" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">翼手龙处于【双翼敛合】闭翼反击:</span>
                <n-switch v-model:value="isWingRaptorClosed" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：队伍装配与战术防线 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>🛡️</span> 队伍配装与特化防线 (Loadout Defense)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">主力核心输出战术 (Primary DPS Strategy)</label>
              <n-select
                v-model:value="activeDpsStrategy"
                :options="dpsStrategyOptions"
                size="small"
              />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">全员装备【珊瑚戒指】(防水灭世海啸):</span>
                <n-switch v-model:value="hasCoralRings" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">全员装备【缎带】(免死/免混乱/免石化):</span>
                <n-switch v-model:value="hasRibbons" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">常驻【卡邦库尔魔法反射壁】:</span>
                <n-switch v-model:value="hasReflectActive" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">时魔道士开启【极速全体加速 (Hastega)】:</span>
                <n-switch v-model:value="hasHastegaBuff" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：攻坚胜率与机制结算指标 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-rose-950/40 to-slate-900 border border-rose-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-rose-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 战局推演指标 (Raid Verdict)</span>
              <n-tag size="tiny" :type="raidResult.isWipeRisk ? 'error' : 'success'">
                {{ raidResult.isWipeRisk ? '高危灭团预警' : '胜券在握 · 稳固破阵' }}
              </n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 胜率评级 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">综合破阵胜率评分 (Victory Probability)</div>
                <div class="text-3xl font-black font-mono mt-1 tracking-wider" :class="raidResult.scoreColor">
                  {{ raidResult.winRate }}% [评级: {{ raidResult.grade }}]
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  {{ raidResult.gradeSummary }}
                </div>
              </div>

              <!-- 当前阶段与致死灭团技 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-amber-400 font-bold flex items-center justify-between">
                  <span>当前转阶段杀招:</span>
                  <span class="text-rose-400 font-mono font-bold">{{ raidResult.currentPhaseName }}</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ raidResult.incomingGimmickDesc }}
                </div>
              </div>

              <!-- 防守与反制结论 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-cyan-400 font-bold">破防对策命中度:</div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ raidResult.counterMeasureStatus }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>引擎算法: boss_tactics_battle.gd</span>
            <span class="text-rose-400">VBLE Raid Engine v2.2.209</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 关键神装克制矩阵 (Hard Counter Matrix) -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-xl">💎</span>
        <h3 class="text-lg font-bold text-white">针对性神装克制法则 (Hard Counter Matrix)</h3>
      </div>
      <p class="text-xs text-gray-400">
        面对顶级首领的不可抗毁灭机制，携带指定关键装备或职业技能即可瞬间化解必死杀招。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div
          v-for="hc in hardCounters"
          :key="hc.bossName"
          class="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 hover:border-rose-500/40 transition-all"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-rose-300 text-sm flex items-center gap-1.5">
              <span>{{ hc.icon }}</span>
              <span>{{ hc.bossName }}</span>
            </span>
            <n-tag size="tiny" type="error">{{ hc.killGimmick }}</n-tag>
          </div>
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-xs text-cyan-300 font-semibold">
            🛡️ 绝对克制方案: {{ hc.counterGear }}
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">{{ hc.effect }}</p>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-rose-400">boss_tactics_battle.gd (Godot 4.x 实机引擎算法)</span>
        </div>
        <n-button size="tiny" secondary type="error" @click="copyGodotCode">
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
import { bossTacticsList, type BossTacticItem } from '../config/bossTactics'

const message = useMessage()

const activeTier = ref('all')
const searchKeyword = ref('')
const selectedBossId = ref('shinryu')
const copiedCode = ref(false)

// 沙盘推演状态
const bossHpPercent = ref(75)
const odinCountdown = ref(45)
const isBossEnraged = ref(false)
const isWingRaptorClosed = ref(false)

const activeDpsStrategy = ref('spellblade_rapid')
const hasCoralRings = ref(true)
const hasRibbons = ref(true)
const hasReflectActive = ref(true)
const hasHastegaBuff = ref(true)

const bossList = computed(() => bossTacticsList)

const tiers = [
  { id: 'all', name: `全部首领 (${bossTacticsList.length}大核心)` },
  { id: 'bounty', name: '王城高阶悬赏 (Bounty)' },
  { id: 'T1', name: '第一世界试炼 (T1)' },
  { id: 'T2', name: '第二世界崩解 (T2)' },
  { id: 'T3', name: '第三世界融合 (T3)' },
  { id: 'T4', name: '虚空深渊与隐藏超神 (T4)' }
]

const bossSelectOptions = computed(() => {
  return bossList.value.map((b: BossTacticItem) => ({
    label: `${b.name} (${b.tier})`,
    value: b.id
  }))
})

const dpsStrategyOptions = [
  { label: '魔法剑雷牙 + 乱打八连击 (针对欧米茄极限破防)', value: 'spellblade_rapid' },
  { label: '龙骑士飞龙枪跳跃流 (回避地面群攻与海啸)', value: 'dragon_jump' },
  { label: '双持忍者金币投掷 (巨额真实物理伤害)', value: 'ninja_zeninage' },
  { label: '双黑魔连续魔核爆 + 希瓦冻气 (极限法系轰炸)', value: 'dualcast_flare' },
  { label: '时空禁锢石化突刺 (针对奥丁/杂兵速杀)', value: 'break_spell' }
]

const filteredBosses = computed(() => {
  return bossList.value.filter((b: BossTacticItem) => {
    // 难度层级筛选
    if (activeTier.value === 'bounty') {
      if (!b.tier.includes('悬赏') && !b.id.startsWith('bounty-')) return false
    } else if (activeTier.value !== 'all') {
      if (!b.tier.includes(activeTier.value)) return false
    }

    // 搜索关键字匹配
    if (searchKeyword.value.trim()) {
      const q = searchKeyword.value.trim().toLowerCase()
      const match =
        b.name.toLowerCase().includes(q) ||
        b.title.toLowerCase().includes(q) ||
        b.weakness.toLowerCase().includes(q) ||
        b.keyGimmick.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q)
      if (!match) return false
    }

    return true
  })
})

const getBossIcon = (tier: string): string => {
  if (tier.includes('T4')) return '🐉'
  if (tier.includes('T3')) return '👿'
  if (tier.includes('T2')) return '⚔️'
  if (tier.includes('悬赏')) return '📜'
  return '🦅'
}

const getTierTagType = (tier: string): 'default' | 'info' | 'warning' | 'error' | 'success' => {
  if (tier.includes('T4')) return 'error'
  if (tier.includes('T3')) return 'warning'
  if (tier.includes('悬赏')) return 'success'
  return 'info'
}

const selectForSimulation = (id: string) => {
  selectedBossId.value = id
  scrollToStudio()
  message.success('已载入首领数据进入攻坚沙盘！')
}

const scrollToStudio = () => {
  const el = document.getElementById('raid-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetStudioParams = () => {
  bossHpPercent.value = 75
  odinCountdown.value = 45
  isBossEnraged.value = false
  isWingRaptorClosed.value = false
  activeDpsStrategy.value = 'spellblade_rapid'
  hasCoralRings.value = true
  hasRibbons.value = true
  hasReflectActive.value = true
  hasHastegaBuff.value = true
  message.info('攻坚沙盘参数已重置')
}

const triggerOneClickAttack = () => {
  if (raidResult.value.isWipeRisk) {
    message.error(`灭团风险极高！当前缺少关键对策，${raidResult.value.incomingGimmickDesc}`)
    return
  }
  message.success(`⚔️ 破阵连携命中！成功化解 ${raidResult.value.currentPhaseName}，攻坚评级: ${raidResult.value.grade}`)
}

// 核心攻坚推演判定
const raidResult = computed(() => {
  const curBoss = bossList.value.find((b: BossTacticItem) => b.id === selectedBossId.value) || bossList.value[0]
  if (!curBoss) {
    return {
      winRate: 50,
      grade: 'B',
      gradeSummary: '平稳对决',
      scoreColor: 'text-yellow-400',
      isWipeRisk: false,
      currentPhaseName: '常规阶段',
      incomingGimmickDesc: '无异常',
      counterMeasureStatus: '正常运转'
    }
  }

  const id = curBoss.id
  let winRate = 70
  let isWipeRisk = false
  let currentPhaseName = 'P1 初始交锋'
  let incomingGimmickDesc = curBoss.keyGimmick
  let counterMeasureStatus = '常规战术应对'

  // 翼手龙双翼敛合
  if (id === 'wing-raptor') {
    if (isWingRaptorClosed.value) {
      currentPhaseName = 'P2 闭翼敛合模式'
      incomingGimmickDesc = '【双翼敛合】闭翼时受到任何攻击都会释放全体爪击反制并吸收伤害！必须停手防御！'
      winRate -= 50
      isWipeRisk = true
      counterMeasureStatus = '警告：当前处于闭翼状态，切勿出手反击！'
    } else {
      currentPhaseName = 'P1 张翼暴露弱点'
      winRate = 95
      counterMeasureStatus = '雷属性魔法与物理全力集火，安全输出'
    }
  }
  // 神龙开局大海啸
  else if (id === 'shinryu') {
    currentPhaseName = bossHpPercent.value > 50 ? 'P1 灭世大海啸突袭' : 'P2 乱打龙息轰炸'
    incomingGimmickDesc = '开局 100% 抢先释放【大海啸 (Tsunami)】，造成 8000+ 水属性秒杀暴击！'
    if (!hasCoralRings.value) {
      isWipeRisk = true
      winRate = 5
      counterMeasureStatus = '致命失误：未装备【珊瑚戒指】，开局大海啸必定直接导致全员 8000+ 暴毙灭团！'
    } else {
      winRate = 90
      counterMeasureStatus = '已装备【珊瑚戒指】，灭世海啸全额吸收转化为全员 8000+ 满血回春！'
    }
  }
  // 欧米茄
  else if (id === 'omega') {
    currentPhaseName = 'P1 反击极光波与导弹连击'
    incomingGimmickDesc = '高频反击一切常规物理，装备绝对防御。弱点仅为【雷属性】。'
    if (activeDpsStrategy.value === 'spellblade_rapid') {
      winRate = 88
      counterMeasureStatus = '完美克制：【魔法剑雷牙 + 乱打八连击】绕过反击直接造成 8 次必中国裂雷爆！'
    } else {
      winRate = 25
      isWipeRisk = true
      counterMeasureStatus = '非雷系魔法剑易触发极光波疯狂反制团灭，建议换用魔法剑乱打！'
    }
  }
  // 奥丁限时 1 分钟
  else if (id === 'odin') {
    currentPhaseName = '1 分钟斩铁生死竞速'
    incomingGimmickDesc = `倒计时剩余 ${odinCountdown.value} 秒。时间归零立即释放无视防御【真·斩铁剑】全员秒杀！`
    if (odinCountdown.value <= 10) {
      isWipeRisk = true
      winRate = 35
      counterMeasureStatus = '倒计时仅剩不到 10 秒，狂暴斩铁剑临近！立即使用时空石化突刺速决！'
    } else if (hasHastegaBuff.value) {
      winRate = 92
      counterMeasureStatus = '全员保持加速，ATB 运转充裕，输出窗口完全达标'
    }
  }
  // 新埃克斯迪斯
  else if (id === 'neo-exdeath') {
    currentPhaseName = bossHpPercent.value < 30 ? 'P3 宇宙大爆炸 (Grand Cross)' : 'P2 四核分身裂变'
    incomingGimmickDesc = '释放宇宙大爆炸，随机施加石化、即死、混乱、蛙变全异常状态！'
    if (!hasRibbons.value) {
      isWipeRisk = true
      winRate = 15
      counterMeasureStatus = '致命危机：未佩戴【缎带】，宇宙大爆炸将导致全员陷入即死与混乱自我残杀！'
    } else {
      winRate = 85
      counterMeasureStatus = '全员佩戴【缎带】，免疫宇宙大爆炸全部负面状态，攻坚稳健！'
    }
  }

  // 增益补正
  if (hasReflectActive.value) winRate += 5
  if (hasHastegaBuff.value) winRate += 5
  if (isBossEnraged.value) winRate -= 15
  winRate = Math.min(99, Math.max(5, winRate))

  let grade = 'S'
  let scoreColor = 'text-emerald-400'
  let gradeSummary = '战术构建无懈可击，可极速击破'

  if (winRate < 40) {
    grade = 'F'
    scoreColor = 'text-rose-500'
    gradeSummary = '存在致命机制缺陷，极高概率遭遇灭团'
  } else if (winRate < 70) {
    grade = 'B'
    scoreColor = 'text-amber-400'
    gradeSummary = '战术可行但存在翻车点，需谨慎操作'
  } else if (winRate < 85) {
    grade = 'A'
    scoreColor = 'text-cyan-400'
    gradeSummary = '破阵对策完备，稳健通关'
  }

  return {
    winRate,
    grade,
    gradeSummary,
    scoreColor,
    isWipeRisk,
    currentPhaseName,
    incomingGimmickDesc,
    counterMeasureStatus
  }
})

// 绝对针对神装克制法则
const hardCounters = [
  {
    bossName: '神龙 (Shinryu)',
    icon: '🐉',
    killGimmick: '开场大海啸 (Tsunami)',
    counterGear: '珊瑚戒指 (Coral Ring)',
    effect: '水属性伤害反转为 100% 吸收回血。神龙开局 8000+ 灭团海啸瞬间成为全队满血补给。'
  },
  {
    bossName: '欧米茄 (Omega)',
    icon: '🤖',
    killGimmick: '高频极光波 + 绝对物理防御',
    counterGear: '魔法剑雷牙 + 乱打 (Rapid Fire)',
    effect: '无视防御八连必中雷属性真实伤害，单回合直接蒸发欧米茄 20000+ 生命值。'
  },
  {
    bossName: '新·埃克斯迪斯 (Neo Exdeath)',
    icon: '🌌',
    killGimmick: '宇宙大爆炸 (Grand Cross)',
    counterGear: '缎带 (Ribbon) + 龙骑士跳跃',
    effect: '彻底免疫全部 12 种异常状态；跳跃出空直接避开大爆炸的判定帧。'
  }
]

// Godot 核心代码
const godotCodeText = `## boss_tactics_battle.gd
## 《光之战士：时空裂隙》史诗首领攻坚机制与转阶段判定核心引擎
extends Node
class_name BossTacticsBattle

signal phase_changed(boss_id: String, new_phase: int, gimmick: String)
signal raid_wipe_triggered(reason: String)

func check_boss_mechanic(boss_id: String, hp_ratio: float, party: Array) -> Dictionary:
	var result = { "wipe": false, "action": "", "countered": false }
	
	match boss_id:
		"shinryu":
			# 开局大海啸检测
			var all_have_coral = true
			for p in party:
				if not p.has_accessory("coral_ring"):
					all_have_coral = false
					break
			if not all_have_coral:
				result.wipe = true
				result.action = "TSUNAMI_INSTANT_PARTY_WIPE"
				emit_signal("raid_wipe_triggered", "未装备珊瑚戒指被大海啸灭团")
			else:
				result.countered = true
				result.action = "TSUNAMI_ABSORBED_FULL_HEAL"
		
		"wing-raptor":
			# 闭翼敛合反制
			if is_wing_closed:
				result.action = "COUNTER_CLAW_BURST"
				
		"odin":
			# 60 秒限时斩铁剑
			if countdown_remaining <= 0:
				result.wipe = true
				result.action = "TRUE_ZANTETSUKEN_EXECUTE"
	
	return result
`

const copyGodotCode = async () => {
  try {
    await navigator.clipboard.writeText(godotCodeText)
    copiedCode.value = true
    message.success('已复制 boss_tactics_battle.gd 核心实机代码！')
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}
</script>

<style scoped>
.text-glow-amber {
  text-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
</style>
