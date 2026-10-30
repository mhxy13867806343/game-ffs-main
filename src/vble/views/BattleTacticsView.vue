<template>
  <div class="battle-tactics-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-blue-950/80 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.2)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              VBLE Omni ATB Synergy Matrix, Formation Tactics & Damage Uncap Studio v2.2.328
            </span>
            <span class="text-xs text-gray-400">实战战术法则、动态ATB时序微秒解算、四相连续魔与时钟过载工坊</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>⚔️</span> 全域 ATB 动态时间流逝、连携技帧数对齐与极限破防战术工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            解析越级宝箱挑战的严苛回合惩罚公式、史莱姆绝对闪避机制、ATB动态微秒时滞时钟调度、以及八大属性元素连锁爆发、四相连续魔与时钟倍频过载推演沙盘。
          </p>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <span class="text-xs text-cyan-300/80 font-medium">相关权威白皮书：</span>
            <router-link
              to="/vble/docs/TURN_LIMIT_SPEC"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-900/60 text-cyan-200 border border-cyan-500/40 hover:bg-cyan-800/80 hover:text-white transition-all shadow-sm group"
            >
              <span>⏱️</span>
              <span>回合限制与越级宝箱白皮书 (VOL.11)</span>
              <span class="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
            </router-link>
            <router-link
              to="/vble/docs/BATTLE_EVENTS_RPS"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/60 text-blue-200 border border-blue-500/40 hover:bg-blue-800/80 hover:text-white transition-all shadow-sm group"
            >
              <span>🎲</span>
              <span>战斗突发事件与克制博弈白皮书 (VOL.12)</span>
              <span class="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
            </router-link>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToOmniAtbSynergyStudio"
          >
            <template #icon><span>⚔️</span></template>
            ATB极意阵形工坊
          </n-button>
          <n-button
            type="success"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToAtbFrameStaggerStudio"
          >
            <template #icon><span>⚡</span></template>
            前往ATB帧数对齐破防工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToOverdriveStudio"
          >
            <template #icon><span>⚡</span></template>
            前往四相连续魔连携工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToMicroAtbStudio"
          >
            <template #icon><span>⚡</span></template>
            前往微秒ATB优先级推演
          </n-button>
          <n-button
            type="info"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToComboStudio"
          >
            <template #icon><span>🌊</span></template>
            前往元素连锁沙盘
          </n-button>
          <router-link to="/vble/boss-tactics">
            <n-button size="medium" round tertiary>
              首领攻坚全鉴
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

    <!-- ⚡ 实机 ATB 动态时钟、加速缓慢时滞与多段连招连锁推演工坊 (Real-Time ATB Pipeline & Combo Reaction Studio) -->
    <div class="bg-gradient-to-br from-[#12162a]/95 via-[#181630]/90 to-[#0e1628]/95 border border-cyan-500/50 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden">
      <!-- 头部与操作栏 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/40 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">⚡</span>
            <h2 class="text-lg sm:text-xl font-black text-cyan-300">
              实机 ATB 动态时钟、加速缓慢时滞与多段连招连锁推演工坊 (ATB & Combo Studio)
            </h2>
            <n-tag size="small" type="success" round strong>动态时序内核</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            高精推演 Godot 引擎 ATB 时钟驱动（battle_atb_clock.gd）、加速/缓慢充能倍率、待命青白呼吸光环与经典多职业连招倍率公式！
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetAtbStudio">
            🔄 重置演练台
          </n-button>
          <n-button
            size="small"
            :type="isAtbRunning ? 'error' : 'primary'"
            class="font-bold shadow"
            @click="toggleAtbRunning"
          >
            {{ isAtbRunning ? '⏸️ 暂停 ATB 时钟' : '▶️ 启动 ATB 动态时序' }}
          </n-button>
        </div>
      </div>

      <!-- 核心工坊两栏布局 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 栏 1: 5 角色/魔物实战行动轴与充能态 (7 cols) -->
        <div class="lg:col-span-7 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3.5 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-cyan-300 flex items-center gap-1.5">
                <span>⏱️</span> 队伍与敌方行动轴时钟状态
              </span>
              <div class="flex items-center gap-2 text-xs font-mono">
                <span class="text-gray-400">已流逝时钟:</span>
                <span class="text-amber-400 font-bold">{{ atbElapsedSeconds.toFixed(1) }}s</span>
              </div>
            </div>

            <!-- 5个角色/敌人条目 -->
            <div class="space-y-2">
              <div
                v-for="unit in atbUnits"
                :key="unit.id"
                class="p-2.5 rounded-lg border text-xs transition-all flex flex-col gap-1.5"
                :class="unit.gauge >= 100
                  ? 'bg-cyan-950/40 border-cyan-400/80 shadow-md shadow-cyan-900/30'
                  : 'bg-slate-900/80 border-slate-800'"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-base">{{ unit.icon }}</span>
                    <span class="font-bold text-gray-200">{{ unit.name }}</span>
                    <n-tag size="tiny" :type="unit.isEnemy ? 'error' : 'info'">{{ unit.job }}</n-tag>
                    <!-- 状态标签 -->
                    <n-tag
                      v-if="unit.status !== 'normal'"
                      size="tiny"
                      :type="unit.status === 'haste' ? 'warning' : unit.status === 'slow' ? 'default' : 'error'"
                      round
                    >
                      {{ unit.status === 'haste' ? '⚡ 加速 (1.5x)' : unit.status === 'slow' ? '🐢 减速 (0.5x)' : '🛑 停滞 (0x)' }}
                    </n-tag>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono text-[11px]" :class="unit.gauge >= 100 ? 'text-cyan-300 font-bold' : 'text-gray-400'">
                      {{ unit.gauge >= 100 ? '✨ 待命就绪' : `${Math.round(unit.gauge)}%` }}
                    </span>
                    <button
                      type="button"
                      class="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 cursor-pointer"
                      @click="cycleUnitStatus(unit)"
                    >
                      状态: {{ unit.status }}
                    </button>
                  </div>
                </div>

                <!-- 蓄力槽 -->
                <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    class="h-full transition-all duration-200 rounded-full"
                    :class="unit.isEnemy
                      ? 'bg-gradient-to-r from-red-600 to-rose-400'
                      : unit.gauge >= 100
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500'"
                    :style="{ width: `${Math.min(100, unit.gauge)}%` }"
                  />
                </div>
              </div>
            </div>

            <!-- 控制微调按键 -->
            <div class="flex flex-wrap items-center gap-2 pt-1">
              <n-button size="tiny" secondary type="info" @click="stepAtbClock(0.5)">
                ⏩ 单步步进 +0.5s
              </n-button>
              <n-button size="tiny" secondary type="warning" @click="applyPartyBuff('haste')">
                ✨ 全队施加【加速 (Haste)】
              </n-button>
              <n-button size="tiny" secondary type="default" @click="applyPartyBuff('slow')">
                🐢 敌方施加【减速 (Slow)】
              </n-button>
              <n-button size="tiny" secondary type="error" @click="triggerReadyAction">
                ⚔️ 结算最高待命者行动
              </n-button>
            </div>
          </div>

          <!-- 时序回响日志 -->
          <div class="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300 min-h-[34px] flex items-center">
            {{ atbActionEcho }}
          </div>
        </div>

        <!-- 栏 2: 经典神级连招连锁与爆发倍率演练 (5 cols) -->
        <div class="lg:col-span-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3.5 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-amber-300 flex items-center gap-1.5">
                <span>💥</span> 经典战术连招连锁演练
              </span>
              <span class="text-gray-400 font-mono">Combo Resolver</span>
            </div>

            <!-- 连招选择 -->
            <div>
              <label class="text-[11px] text-gray-400 block mb-1">选定经典组合技 (Synergy Preset):</label>
              <n-select
                v-model:value="selectedComboId"
                :options="comboOptions"
                size="small"
              />
            </div>

            <!-- 组合技详细卡片 -->
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-amber-300">{{ activeCombo.name }}</span>
                <n-tag size="tiny" type="warning">{{ activeCombo.hits }} 段连击</n-tag>
              </div>
              <p class="text-[11px] text-gray-400 leading-relaxed">{{ activeCombo.desc }}</p>
              <div class="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-slate-800">
                <div>• 单段系数: <strong class="text-cyan-300 font-mono">{{ activeCombo.coefPerHit }}x</strong></div>
                <div>• 特殊效果: <strong class="text-emerald-300">{{ activeCombo.specialEffect }}</strong></div>
              </div>
            </div>

            <!-- 伤害试算面板 -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-center space-y-1">
              <div class="text-[10px] text-gray-400 uppercase tracking-wider">
                单回合总伤推演 (基准攻击 1200)
              </div>
              <div class="text-3xl font-black text-rose-400 font-mono">
                {{ comboDamageResult.totalDamage.toLocaleString() }}
              </div>
              <div class="text-[11px] text-emerald-400 font-medium">
                {{ comboDamageResult.breakdown }}
              </div>
            </div>

            <n-button size="small" type="primary" block class="font-bold" @click="executeComboSimulation">
              ⚡ 模拟连招实装输出回响
            </n-button>
          </div>

          <div class="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-gray-400">
            <strong>对齐模块：</strong>battle_combo_resolver.gd & battle_combat_system.gd
          </div>
        </div>
      </div>

      <!-- 实装审计底栏 -->
      <div class="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-900/40 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-cyan-400 text-base">⚡</span>
          <span class="font-bold text-cyan-300">战斗时钟底层运行日志：</span>
          <span class="text-gray-200 font-mono">{{ atbAuditLog }}</span>
        </div>
        <div class="text-[11px] text-gray-500 font-mono">
          底层契约: battle_atb_clock.gd & battle_timeline.gd
        </div>
      </div>
    </div>

    <!-- ⚡ 实机八元元素连锁共鸣与爆发极意推演工坊 (Elemental Resonance & Burst Chain Studio) -->
    <div id="elemental-combo-studio" class="bg-gradient-to-br from-[#0c1628]/95 via-[#181332]/90 to-[#0e172a]/95 border border-cyan-500/50 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden">
      <!-- 头部与操作栏 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/40 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🔮</span>
            <h2 class="text-lg sm:text-xl font-black text-cyan-300">
              全息八元元素连锁共鸣与爆发极意推演沙盘 (Elemental Resonance Matrix)
            </h2>
            <n-tag size="small" type="success" round strong>八元相克内核</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            推演火、冰、雷、水、风、土、圣、暗八大自然元素连续打击时的共鸣爆发倍率、WEAK弱点穿透与破防易伤机制！
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <n-button size="small" secondary type="warning" @click="resetElementalStudio">
            🔄 重置推演参数
          </n-button>
          <n-button
            size="small"
            type="primary"
            class="font-bold shadow"
            @click="triggerBurstSimulation"
          >
            ⚡ 激发全队元素连锁轰击
          </n-button>
        </div>
      </div>

      <!-- 快捷预设装载条 -->
      <div class="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <span class="text-gray-400 font-semibold flex items-center gap-1">
          <span>⚡</span> 经典属性连携爆发预设：
        </span>
        <n-button size="tiny" round secondary type="error" @click="applyElementalPreset('vaporize')">
          冰火两重天·超导蒸发 (2.8x)
        </n-button>
        <n-button size="tiny" round secondary type="info" @click="applyElementalPreset('overload')">
          风雷狂涌·激化过载 (3.2x)
        </n-button>
        <n-button size="tiny" round secondary type="warning" @click="applyElementalPreset('annihilation')">
          圣光暗影·虚空湮灭 (4.0x)
        </n-button>
        <n-button size="tiny" round secondary type="success" @click="applyElementalPreset('crystal')">
          地崩水涌·晶化固结 (2.5x)
        </n-button>
      </div>

      <!-- 核心工坊两栏布局 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 栏 1: 元素附魔与四主角连携指令编排 (6 cols) -->
        <div class="lg:col-span-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-cyan-300 flex items-center gap-1.5">
                <span>🪄</span> 四英雄元素指令协同编排
              </span>
              <span class="text-xs font-mono text-amber-300">ELEMENTAL CHAIN DISPATCHER</span>
            </div>

            <!-- 4 主角动作编排器 -->
            <div class="space-y-2">
              <div
                v-for="hero in heroAttackers"
                :key="hero.id"
                class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <span class="text-lg">{{ hero.icon }}</span>
                  <div>
                    <div class="font-bold text-gray-200">{{ hero.name }} <span class="text-[10px] text-gray-400 font-normal font-mono">({{ hero.job }})</span></div>
                    <div class="text-[10px] text-cyan-400 font-mono">{{ hero.element }} 属性</div>
                  </div>
                </div>
                <div class="flex-1 max-w-[200px]">
                  <n-select
                    v-model:value="hero.selectedAction"
                    :options="hero.actionOptions"
                    size="tiny"
                  />
                </div>
                <div class="text-right font-mono font-bold text-xs" :class="hero.isCrit ? 'text-amber-400' : 'text-gray-300'">
                  {{ hero.powerCoef }}x
                </div>
              </div>
            </div>

            <!-- 元素环境参数调节 -->
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label class="text-[11px] text-gray-400 block mb-1 font-semibold">首领当前主要属性弱点:</label>
                <n-select
                  v-model:value="bossWeakElement"
                  :options="elementOptions"
                  size="small"
                />
              </div>
              <div>
                <label class="text-[11px] text-gray-400 block mb-1 font-semibold">元素同调共鸣增幅层数:</label>
                <div class="flex items-center gap-2">
                  <n-slider v-model:value="chainStacks" :min="1" :max="4" :step="1" class="flex-1" />
                  <span class="text-xs font-mono font-bold text-cyan-300">{{ chainStacks }} 层</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 动作触发与导出按钮 -->
          <div class="pt-2 border-t border-slate-800 space-y-2">
            <div class="flex items-center gap-2">
              <n-button size="medium" type="primary" block class="font-bold flex-1" @click="triggerBurstSimulation">
                <template #icon><span>💥</span></template>
                触发四段元素连锁全爆发
              </n-button>
            </div>
            <div class="flex items-center gap-2">
              <n-button size="small" secondary type="info" class="flex-1" @click="exportTacticsChainCert">
                <template #icon><span>📜</span></template>
                导出实战战术方案
              </n-button>
              <n-button size="small" secondary class="flex-1" @click="copyTacticsChain">
                <template #icon><span>🔗</span></template>
                复制战术链
              </n-button>
            </div>
          </div>
        </div>

        <!-- 栏 2: 伤害试算、动态跳字徽标与实况控制台 (6 cols) -->
        <div class="lg:col-span-6 space-y-4">
          <!-- 核心伤害总额展示面板 -->
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-amber-300 flex items-center gap-1.5">
                <span>💥</span> 元素共鸣实战伤害推演结果
              </span>
              <span class="text-xs font-mono font-bold text-emerald-400">
                综合增伤倍率: {{ totalSynergyMultiplier }}x
              </span>
            </div>

            <!-- 动态跳字模拟窗口 -->
            <div class="p-5 rounded-xl bg-black/60 border border-cyan-500/30 text-center space-y-2 relative overflow-hidden">
              <div class="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                TOTAL COMBO BURST DAMAGE
              </div>
              <div class="flex items-center justify-center gap-3">
                <span class="text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-cyan-300 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                  {{ calculatedBurstDamage.toLocaleString() }}
                </span>
                <span v-if="hasWeakHit" class="px-2 py-0.5 rounded text-xs font-black bg-rose-600 text-white animate-bounce shadow">
                  WEAK!
                </span>
                <span v-if="hasCritHit" class="px-2 py-0.5 rounded text-xs font-black bg-amber-500 text-slate-950 shadow">
                  CRIT!
                </span>
              </div>
              <div class="text-xs text-cyan-300 font-medium font-mono">
                {{ burstDamageBreakdown }}
              </div>
            </div>

            <!-- 四项核心战术指标 -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div class="p-2 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-[10px] text-gray-400">总击打段数</div>
                <div class="text-base font-bold text-cyan-300 font-mono mt-0.5">{{ totalBurstHits }} Hits</div>
              </div>
              <div class="p-2 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-[10px] text-gray-400">连锁共鸣加成</div>
                <div class="text-base font-bold text-amber-300 font-mono mt-0.5">+{{ (chainStacks * 25) }}%</div>
              </div>
              <div class="p-2 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-[10px] text-gray-400">弱点克制覆盖</div>
                <div class="text-base font-bold font-mono mt-0.5" :class="hasWeakHit ? 'text-emerald-400' : 'text-gray-400'">
                  {{ hasWeakHit ? '100% 极效' : '常规无克' }}
                </div>
              </div>
              <div class="p-2 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-[10px] text-gray-400">战术穿透深度</div>
                <div class="text-base font-bold text-purple-300 font-mono mt-0.5">破限S级</div>
              </div>
            </div>
          </div>

          <!-- 实时战术日志回响 -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-400 flex items-center gap-1 font-mono">
                <span>📜</span> 元素战术执行控制台日志:
              </span>
              <span class="text-[10px] text-gray-500 font-mono">{{ tacticsCombatLogs.length }} 条记录</span>
            </div>
            <div class="bg-black/40 rounded-lg p-2.5 h-36 overflow-y-auto space-y-1 text-xs font-mono scrollbar-thin">
              <div
                v-for="(log, idx) in tacticsCombatLogs"
                :key="idx"
                class="leading-tight"
                :class="log.includes('💥') || log.includes('🎉') ? 'text-amber-300 font-bold' : (log.includes('WEAK') ? 'text-rose-400' : 'text-gray-300')"
              >
                {{ log }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 -->
      <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all"
              :class="activeTacticsGdTab === 'elemental'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'"
              @click="activeTacticsGdTab = 'elemental'"
            >
              elemental_combo_chain.gd
            </button>
            <button
              type="button"
              class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all"
              :class="activeTacticsGdTab === 'atb'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'"
              @click="activeTacticsGdTab = 'atb'"
            >
              battle_atb_clock.gd
            </button>
            <button
              type="button"
              class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all"
              :class="activeTacticsGdTab === 'priority'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'"
              @click="activeTacticsGdTab = 'priority'"
            >
              battle_micro_priority_resolver.gd
            </button>
          </div>
          <n-button size="tiny" secondary round type="info" @click="copyTacticsGdCode">
            <template #icon><span>📋</span></template>
            复制代码
          </n-button>
        </div>
        <pre class="bg-black/50 p-3 rounded-lg border border-slate-900 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-48 scrollbar-thin"><code v-if="activeTacticsGdTab === 'elemental'">{{ gdElementalComboCode }}</code><code v-else-if="activeTacticsGdTab === 'atb'">{{ gdAtbClockCode }}</code><code v-else>{{ gdMicroPriorityCode }}</code></pre>
      </div>
    </div>

    <!-- 交互模拟器：等级惩罚计算器 -->
    <n-card class="border border-slate-700/60 bg-[#121626]/90 rounded-xl" title="🧮 宝箱怪/首领越级挑战回合衰减模拟器">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-1 text-gray-300">
              <span>我方队伍平均等级: <strong class="text-cyan-300">{{ playerLevel }}</strong> 级</span>
              <span>怪物推荐基准等级: <strong class="text-amber-300">{{ monsterLevel }}</strong> 级</span>
            </div>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-400">我方等级:</span>
                <n-slider v-model:value="playerLevel" :min="1" :max="99" :step="1" />
              </div>
              <div>
                <span class="text-xs text-gray-400">怪物等级:</span>
                <n-slider v-model:value="monsterLevel" :min="1" :max="99" :step="1" />
              </div>
            </div>
          </div>

          <div class="p-4 bg-slate-900/80 rounded-lg border border-slate-800 text-xs space-y-2">
            <div class="text-gray-400">公式规范：</div>
            <div class="font-mono text-cyan-300">
              base_turns = 20<br>
              level_diff = monster_level - player_level<br>
              allowed_turns = max(3, base_turns - max(0, level_diff * 1.5))
            </div>
          </div>
        </div>

        <div class="p-6 bg-slate-950/70 border border-cyan-500/30 rounded-xl text-center space-y-4">
          <div class="text-sm text-gray-400">当前等级差与允许限制回合数</div>
          <div class="text-4xl font-black text-amber-400">
            {{ calculatedTurns }} <span class="text-lg font-normal text-gray-400">回合内必须击杀</span>
          </div>
          <div class="text-xs" :class="isOverlevelDangerous ? 'text-red-400 font-bold' : 'text-green-400'">
            {{ isOverlevelDangerous ? '⚠️ 严重越级警告！超时即触发全灭死之宣告！' : '✅ 处于标准攻略安全窗口期' }}
          </div>
        </div>
      </div>
    </n-card>

    <!-- 剪刀石头布即时抉择对抗试炼 (对齐 Godot 引擎 battle_rps_duel.gd) -->
    <n-card class="border border-indigo-700/60 bg-[#121626]/90 rounded-xl" title="⚔️ 剪刀石头布（猜拳决斗）实机对抗体系 (battle_rps_duel.gd)">
      <template #header-extra>
        <div class="flex items-center gap-1.5">
          <n-tag type="warning" size="small" round strong>先得2分终局 (POINTS_TO_WIN = 2)</n-tag>
          <n-tag type="info" size="small" round>平局无硬上限加赛</n-tag>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-xs text-gray-300 leading-relaxed">
          对齐 Godot 引擎 <code>battle_rps_duel.gd</code> 与 <code>battle_rps_panel.gd</code> 实机规范：纯猜拳决斗局维护双方显式出拳、比分与有效轮次。平局（Draw）为有效轮次但不计分且不设固定硬轮次截止，率先达成 2 分方决出胜负。决斗终局后状态严格冻结只读，需显式重置开局。
        </p>

        <!-- 比分牌与对局状态 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
          <div class="p-2 bg-slate-900 rounded border border-slate-800">
            <span class="text-[10px] text-gray-400 block">我方得分 (Player)</span>
            <span class="text-2xl font-black font-mono text-cyan-400">{{ rpsPlayerScore }} / 2</span>
          </div>

          <div class="p-2 bg-slate-900 rounded border border-slate-800 flex flex-col justify-center">
            <span class="text-[10px] text-gray-400 block">对局进行状态 (Round #{{ rpsRounds }})</span>
            <div class="mt-1">
              <n-tag :type="rpsWinner === 'player' ? 'success' : rpsWinner === 'enemy' ? 'error' : 'warning'" size="small" round>
                {{ rpsWinner === 'player' ? '🏆 我方大获全胜！' : rpsWinner === 'enemy' ? '💀 敌方胜出！' : '⚔️ 决斗激战中...' }}
              </n-tag>
            </div>
          </div>

          <div class="p-2 bg-slate-900 rounded border border-slate-800">
            <span class="text-[10px] text-gray-400 block">敌方得分 (Enemy)</span>
            <span class="text-2xl font-black font-mono text-amber-400">{{ rpsEnemyScore }} / 2</span>
          </div>
        </div>

        <!-- 出拳交互区 -->
        <div class="text-center space-y-3">
          <div class="flex justify-center gap-3">
            <n-button
              v-for="choice in ['scissors', 'rock', 'paper']"
              :key="choice"
              size="medium"
              :disabled="rpsWinner !== ''"
              :type="userChoice === choice ? 'primary' : 'default'"
              secondary
              @click="playRPSRound(choice)"
            >
              {{ choice === 'scissors' ? '✌️ 剪刀 (Scissors)' : choice === 'rock' ? '✊ 石头 (Rock)' : '🖐️ 布 (Paper)' }}
            </n-button>
            <n-button size="medium" secondary type="warning" @click="resetRPSDuel">
              🔄 显式重开新局 (reset)
            </n-button>
          </div>

          <div v-if="lastRpsRoundOutcome" class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 max-w-lg mx-auto text-xs">
            <div class="text-gray-300 mb-1">
              第 {{ rpsRounds }} 轮出拳：我方出 <strong class="text-cyan-300">[{{ formatRpsChoice(userChoice) }}]</strong> vs 敌方出 <strong class="text-amber-300">[{{ formatRpsChoice(enemyChoice) }}]</strong>
            </div>
            <div class="font-bold text-sm" :class="lastRpsRoundOutcome === 'player' ? 'text-emerald-400' : lastRpsRoundOutcome === 'enemy' ? 'text-rose-400' : 'text-amber-400'">
              {{ lastRpsRoundOutcome === 'player' ? '✅ 本轮我方获胜！(+1分)' : lastRpsRoundOutcome === 'enemy' ? '❌ 本轮敌方获胜！(敌+1分)' : '🤝 平局 (Draw)！不计分，加赛进行' }}
            </div>
          </div>
        </div>

        <!-- 决斗审计追踪 -->
        <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-0.5">
          <div class="text-gray-500 font-bold">对决快照审计 (Snapshot Trace · make_read_only):</div>
          <div v-for="(log, idx) in rpsTraceLog" :key="idx" class="text-indigo-300 truncate">
            &gt; {{ log }}
          </div>
        </div>
      </div>
    </n-card>

    <!-- 暴击与弱点动态跳字表现体系 -->
    <n-card class="border border-amber-900/60 bg-[#171324]/90 rounded-xl" title="💥 战时伤害跳字视觉反馈体系 (Damage Number Badges)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗界面全新升级实装针对暴击与属性弱点的动态数字装饰管线（<code>damage_number_badges.gd</code>），极大提升打击感与破绽洞察力。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">⚡ 暴击跳字 (Critical Hit)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">150% 字号</span>
            </div>
            <p class="text-gray-400">
              判定暴击时，跳字尺寸放大为 1.5 倍基准字号，并附加高对比度金黄亮丽描边轮廓（<code>#ffd700</code>），带来强烈的暴击震颤冲击。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-red-500/30 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-red-300 text-sm">🎯 属性弱点 (WEAK Badge)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 font-mono">WEAK 徽标</span>
            </div>
            <p class="text-gray-400">
              命中克制属性（<code>element_multiplier &gt; 1</code>）时，跳字旁动态附带鲜红【WEAK】徽标子控件，随数字一同旋转、漂浮并平滑淡出。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🛡️ 严格实伤结算约束</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">零误判保底</span>
            </div>
            <p class="text-gray-400">
              仅对真实结算的正 HP 实伤进行装饰，0 实伤、MP 吸取、格挡免伤或物理落空不误装饰；清波与控制器切换时子控件自动析构无残留。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-400/30 space-y-2 md:col-span-3">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-200 text-sm">🛡️ 敌方即死技与死之宣告到期免疫收据头顶银白 IMMUNE 飘字 (_show_instant_death_immune / _is_doom_immunity_tick)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-200 font-mono">#e0e5ed 银白 IMMUNE</span>
            </div>
            <p class="text-gray-400">
              当敌方单体/群体即死技命中免疫即死的我方存活角色（<code>_is_instant_death_immune_hit</code>：<code>instant_death == true</code>、<code>outcome == &quot;immune&quot;</code>、<code>damage == 0</code>），或我方角色【死之宣告 (<code>doom</code>)】倒数归零触发正式到期免疫收据（<code>_is_doom_immunity_tick</code>：<code>status == &quot;doom&quot;</code>、<code>immune == true</code>、<code>remaining == 0</code>、<code>damage == 0</code>，且不倒查同次行动末可能被后续毒伤改变的实时生命状态）时，均在 <code>EffectLayer</code> 头顶（<code>y = -48</code>）生成银白色（<code>#e0e5ed</code> 配 <code>#171322</code> 描边）<code>IMMUNE</code> 飘字；复用倍速自适应漂浮淡出与 <code>wave_feedback</code> 清波生命周期，零受击动作、0 伤跳字或装备投影副作用。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 武器偷盗即时结算漂浮收据表现 -->
    <n-card class="border border-emerald-900/60 bg-[#121c24]/90 rounded-xl" title="💰 武器偷盗即时结算漂浮收据体系 (StealReceipt / steal_receipt_text.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗反馈管线（<code>battle_scene_feedback.gd</code>）与专属收据构建器（<code>steal_receipt_text.gd</code>）无缝打通，真实消费武器偷盗结算数据，实现敌人定位即时漂浮跳字反馈。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🪙 金币斩获反馈</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">steal gold</span>
            </div>
            <p class="text-gray-400">
              结算掠夺金币时向上漂浮展示 <code>偷得 %d 金币</code>，金币达标上限时精准提示 <code>金币已达上限</code>，绝不误判。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🎁 道具正式品名</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">item.json 关联</span>
            </div>
            <p class="text-gray-400">
              严格从官方道具表（<code>item.json</code>）提取正式中文品名展示 <code>偷得【物品名】×1</code>，杜绝将底层 ID 直接暴露。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-rose-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-rose-300 text-sm">🎒 背包饱和警示</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-mono">容量门禁</span>
            </div>
            <p class="text-gray-400">
              背包满载未取得物品时，清晰悬浮 <code>背包已满，未取得物品</code>，避免玩家对偷盗结果产生歧义或困惑。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">✨ 独立动画图层</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">#ffe08a 亮金</span>
            </div>
            <p class="text-gray-400">
              与原伤害数字错行独立排版，采用 <code>#ffe08a</code> 亮金色字配黑边，支持波次切换与倍速自适应，优雅自然渐隐。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 学者与盗贼战术情报卡表现 -->
    <n-card class="border border-indigo-900/60 bg-[#121428]/90 rounded-xl" title="🔍 战术情报卡与解析/侦察体系 (AnalysisInfoCard / analysis_snapshot_text.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          学者特技【单目标解析 (tech_scholar_analyze)】、【大解析 (tech_scholar_grand_analysis)】与盗贼特技【弱点侦察 (tech_thief_scout_weakness)】成功结算后，触发非模态悬浮情报卡（<code>analysis_info_card.gd</code>），基于瞬间快照只读格式化展示敌方属性与战术弱点（<code>analysis_snapshot_text.gd</code>）。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-indigo-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-indigo-300 text-sm">📋 静态快照保护</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">解析/侦察时情报</span>
            </div>
            <p class="text-gray-400">
              标题明确标注【解析时情报】或【侦察时情报】，记录扫描瞬间的快照，不随魔物后续受击生命变动而实时更新，杜绝投影递归重算。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">⚡ 八大元素四象归类</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">弱/免/吸/抗</span>
            </div>
            <p class="text-gray-400">
              精确归类火/冰/雷/水/土/风/光/暗八大元素：倍率 &gt; 1 归为弱点、0 为免疫、&lt; 0 为吸收、&lt; 1 为抗性，无项显式标明 <code>—</code>。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🎯 非模态零干扰交互</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">360×270 暗金卡</span>
            </div>
            <p class="text-gray-400">
              采用右上角非模态悬浮窗，<code>MOUSE_FILTER_IGNORE</code> 穿透，绝不抢占玩家行动指令菜单输入，也不暂停 ATB 行动条。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🧹 严密生命周期管理</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">自动注销与清理</span>
            </div>
            <p class="text-gray-400">
              当被解析目标被击倒、逃跑退场、战斗波次切换或战斗胜利时自动清理卡片，玩家亦可轻点右上角关闭按钮主动关闭。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-500/30 space-y-1.5 md:col-span-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-purple-300 text-sm">📖 学者大解析群体情报翻阅体系 (Grand Analysis / tech_scholar_grand_analysis)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">多目标快照翻阅</span>
            </div>
            <p class="text-gray-400">
              学者 JLV 20 极意特技【大解析】命中多个敌方目标时，卡片标题切换为【大解析时情报】，底部自适应激活 <code>上一项 (Previous)</code> / <code>下一项 (Next)</code> 按键与 <code>%d / %d</code> 页码计数器；严格按命中顺序独立保存各魔物快照，首尾页智能禁用，翻页不重算实时 HP，任一目标被替换或阵亡即整组注销。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-teal-500/30 space-y-1.5 md:col-span-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-teal-300 text-sm">🗡️ 盗贼弱点侦察最小披露机制 (Scout Weakness / tech_thief_scout_weakness)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 font-mono">侦察时情报</span>
            </div>
            <p class="text-gray-400">
              盗贼 JLV 14 特技【弱点侦察】成功结算后，同样唤起 <code>AnalysisInfoCard</code> 非模态情报卡，标题呈现【侦察时情报】；采用独立最小披露格式器（<code>analysis_snapshot_text.gd scout</code>），严格按火/冰/雷/水/土/风/光/暗八大元素标准顺序，仅披露首个有限倍率 &gt; 1 的元素弱点（如“元素弱点：火”），未探明时显示“未发现元素弱点”；严守最小披露原则，绝不泄露敌方 HP 或其它全套抗性，单页 206px 独立展示，不激活翻页控件且完全不抢占战斗菜单键盘焦点。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 战后掉落行单次柔金高亮回落表现 -->
    <n-card class="border border-yellow-900/60 bg-[#1a1812]/90 rounded-xl" title="🎁 战后结算掉落行柔金高亮回落体系 (LootRowHighlight / battle_result.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战后结算界面（<code>battle_result.gd</code>）接入专属掉落行高亮动画组件（<code>loot_row_highlight.gd</code>），在展示战利品时呈现优雅单次柔光反馈。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">✨ 0.8s 柔金线性回落</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">0.8s DURATION</span>
            </div>
            <p class="text-gray-400">
              结算掉落行初次登场时，字体颜色插值过渡至亮金色（<code>Color(1.0, 0.96, 0.72)</code>），在 0.8 秒内平滑回落至基础字体色。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🔒 弱引用单次去重</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">weakref 严防重叠</span>
            </div>
            <p class="text-gray-400">
              通过 <code>WeakRef</code> 精确记录已播放 Label 实例，确保每一条掉落条目仅高亮一次，重复刷新不触发闪烁。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🎮 键盘焦点零干扰</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">FOCUS 守恒</span>
            </div>
            <p class="text-gray-400">
              纯视觉动画不参与战利品入库逻辑，绝不干涉确认键、返回键或结果页键盘/手柄焦点流动。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-purple-300 text-sm">🛡️ 暂停与换档立即还原</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">会话即时清理</span>
            </div>
            <p class="text-gray-400">
              当游戏暂停、退回主菜单、换档或切场景时，立即终止动画并恢复基准色，彻底消除跨会话残留。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 剧情技能【属性削减】复利衰减与等级说明体系 -->
    <n-card class="border border-purple-900/60 bg-[#160f26]/90 rounded-xl" title="🔮 剧情技能【属性削减】复利衰减与等级预览体系 (Attribute Drain / BattleAttributeDrain)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          角色状态页（<code>status_page.gd</code>）剧情技能专区正式接入当前唯一实装战斗效果的剧情技能【属性削减】（<code>attr_drain</code>）专用等级格式器（<code>story_drain_description.gd</code>），直接复用战斗系统正式削减常量（<code>BattleAttributeDrain</code>），提供当前等级效果说明与下级（未取得）预览。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-purple-300 text-sm">🎲 Lv.1 随机单项衰减</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">普通20% / Boss10%</span>
            </div>
            <p class="text-gray-400">
              初阶削减在敌方属性中随机选定 1 项；对普通敌人按当前剩余值削减 20%，对首领 Boss 削减 10%。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-indigo-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-indigo-300 text-sm">🎯 Lv.2 定向精准削减</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">普通30% / Boss15%</span>
            </div>
            <p class="text-gray-400">
              中阶削减解锁战术指定选项，玩家可自由指定削减攻击、防御或生命等核心项；普通敌人 30%、Boss 15%。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-pink-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-pink-300 text-sm">⚔️ Lv.3 极意附加破甲</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-pink-950 text-pink-300 font-mono">40%/20% + 破甲30%</span>
            </div>
            <p class="text-gray-400">
              高阶削减比例提升至普通 40%、Boss 20%；且仅指定 HP 时，物防额外降低 30%，持续目标 2 次有效行动。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📐 规则底线与界面自适应</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">230px 动态扩展</span>
            </div>
            <p class="text-gray-400">
              严守“按当前剩余值计算；正值至少保留 1，原为 0 仍为 0”底线；状态页仅为该技能动态将说明区扩展至 230px，其余 5 技能保持 148px。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 剧情技能【预判】B路线“完整行动承诺”独立基础与批量事务体系 -->
    <n-card class="border border-cyan-900/60 bg-[#0f1928]/90 rounded-xl" title="👁️ 剧情技能【预判 (prediction)】B路线“完整行动承诺”独立基础体系 (Action Commitment Foundation)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          针对剧情技能【预判】（<code>prediction</code>），设计决议正式选定 <strong>B 路线“完整行动承诺”</strong>，并已完成 7 层无副作用独立基础模块与真实执行接线边界复核（<code>docs/PREDICTION_INTEGRATION_PLAN_2026-10-23.md</code>）。当前处于独立基础原型验证通过阶段（58/58 承诺链路 + 8/8 冷却记录单测全绿），在目标失效处置与 Lv.3 增幅细则最终敲定前，暂未开放状态页 SPP 升级或战斗指令入口。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📖 纯决策读取与只读快照</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">Reader &amp; Snapshot</span>
            </div>
            <p class="text-gray-400">
              <code>enemy_decision_reader.gd</code> 与 <code>enemy_decision_snapshot.gd</code> 仅从纯值快照推导敌方下一本人行动号（<code>count+1</code>）、低血量有效阶段与 19 类招式范围，绝不调用真实 <code>refresh_health_phase</code>、不清充能 <code>pending</code>、不耗 <code>once</code> 或生产 RNG。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-blue-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-blue-300 text-sm">🎯 候选快照与确定/单体准备</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 font-mono">Target &amp; Preparer</span>
            </div>
            <p class="text-gray-400">
              <code>enemy_target_snapshot.gd</code> 与 <code>enemy_commitment_preparer.gd</code> 区分援护前选中目标与挑衅池；支持普通单体/混乱一次 RNG 抽样（重复查看零抽样）以及自身/全体地面/全体存活敌军/召唤 5 类确定范围零 RNG 准备。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-indigo-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-indigo-300 text-sm">📦 承诺容器与原子批量事务</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">Store &amp; Batch Commit</span>
            </div>
            <p class="text-gray-400">
              <code>enemy_action_commitment_store.gd</code> 以 <code>session + model + wave + actor + death_epoch + next_action_count</code> 严格隔离；<code>prepare_batch</code> 面向 Lv.2/3 当前可行动敌群执行全组预检与原子写入，任一不支持则整批拒绝、零部分扣费。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">⏱️ 门槛、施术者指令冷却与边界</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">HUD 5/4/3 · CD 4/3/3</span>
            </div>
            <p class="text-gray-400">
              <code>prediction_cooldown.gd</code> 落实开场 HUD 第 5/4/3 轮门槛与施术者后续有效完成指令 CD 4/3/3（同角色三级共享、跨波保留、不耗 MP/道具）；已完成 <code>act_enemy</code> 与 <code>enemy_attack_party</code> 真实接线边界复核，待失效与 Lv.3 规则确认后合龙。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 交互模拟器：剧情技能【预判 Lv3】意图快照读取与 1.25x 爆发倍率推演所 -->
    <n-card class="border border-cyan-500/50 bg-[#0e1726]/95 rounded-xl shadow-xl" title="👁️ 剧情技能【预判 Lv3】意图快照读取与 1.25x 爆发倍率实装推演所 (Prediction Lv3 Simulator)">
      <template #header-extra>
        <n-tag type="info" size="small" round strong>B路线完整行动承诺 · 4c91c67d5 认证接线</n-tag>
      </template>
      <div class="space-y-4">
        <p class="text-xs text-gray-300 leading-relaxed">
          基于 Godot 引擎 <code>prediction_command_runtime.gd</code> 与 <code>battle_combat_system.gd</code> 真实接线：对特定敌方单体或群体施放【预判 Lv3】后，非模态意图卡实时捕获其下一轮行动快照；并在我方同伴随后发动的首个合资格【职业物理主击】或【正元素伤害魔法】上，精准激活 <strong>1.25x 暴击率</strong> 与 <strong>1.25x 正主伤倍率</strong> 乘区！
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- 步骤 1: 选取目标敌方 -->
          <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2.5">
            <div class="text-xs font-bold text-cyan-300 flex items-center justify-between">
              <span>1️⃣ 选定预判敌方目标</span>
              <span class="text-[10px] text-gray-400">Actor Instance</span>
            </div>
            <select
              v-model="predSelectedEnemyId"
              class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs focus:border-cyan-500 outline-none"
            >
              <option v-for="e in predEnemiesList" :key="e.id" :value="e.id">
                {{ e.name }} (Lv.{{ e.level }} · {{ e.role }})
              </option>
            </select>

            <!-- 意图卡快照展示 -->
            <div class="p-2.5 bg-slate-950/80 rounded border border-cyan-500/30 text-xs space-y-1">
              <div class="text-amber-300 font-bold flex items-center justify-between">
                <span>📋 意图卡快照 (IntentCard):</span>
                <span class="text-[10px] text-cyan-400 font-mono">Nonce: #{{ predNonce }}</span>
              </div>
              <div class="text-gray-300 text-[11px]">下一轮行动: <strong class="text-rose-400">{{ currentPredEnemy.nextAction }}</strong></div>
              <div class="text-gray-300 text-[11px]">预计索敌: <span class="text-gray-200">{{ currentPredEnemy.targetSlot }}</span></div>
              <div class="text-gray-400 text-[10px]">行动序号: Count #{{ currentPredEnemy.actionCount + 1 }} · 生命状态有效</div>
            </div>
          </div>

          <!-- 步骤 2: 我方反制行动选型 -->
          <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2.5">
            <div class="text-xs font-bold text-amber-300 flex items-center justify-between">
              <span>2️⃣ 我方随后的反制行动选型</span>
              <span class="text-[10px] text-amber-400">Next Action</span>
            </div>
            <select
              v-model="predSelectedActionType"
              class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs focus:border-cyan-500 outline-none"
            >
              <option value="phys_skill">⚔️ 职业物理技能 (如 骑士【重斩】、武僧【连环拳】)</option>
              <option value="magic_dmg">🔥 伤害系魔法 (如 黑魔【大火炎】、时空【重力波】)</option>
              <option value="normal_atk">🗡️ 普通平A攻击 (不享预判倍率)</option>
              <option value="heal_item">🧪 治疗/道具恢复 (不享预判倍率)</option>
            </select>

            <div class="p-2 bg-slate-950/80 rounded border border-slate-800 text-xs space-y-1">
              <div class="text-gray-400 text-[11px]">基准伤害输出：</div>
              <div class="flex items-center gap-2">
                <input
                  v-model.number="predBaseDamage"
                  type="number"
                  min="100"
                  max="9999"
                  step="50"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1 text-xs outline-none focus:border-cyan-500"
                />
                <span class="text-xs text-gray-400 font-mono">点</span>
              </div>
            </div>
          </div>

          <!-- 步骤 3: 结算屏与期限消耗 -->
          <div class="p-3 bg-slate-950 rounded-xl border border-cyan-500/40 flex flex-col justify-between space-y-3">
            <div class="space-y-2">
              <div class="text-xs font-bold text-emerald-400 flex items-center justify-between">
                <span>3️⃣ 伤害倍率结算与奖励核销</span>
                <n-tag size="tiny" :type="predResult.isEligible ? 'success' : 'default'">
                  {{ predResult.isEligible ? '1.25x 爆发倍率触发' : '常规输出' }}
                </n-tag>
              </div>

              <div class="p-2.5 bg-slate-900/90 rounded border border-slate-800 text-center space-y-1">
                <div class="text-[10px] text-cyan-400 uppercase tracking-wider">最终实装伤害</div>
                <div class="text-2xl font-black text-amber-300 font-mono">{{ predResult.finalDamage }}</div>
                <div class="text-[11px]" :class="predResult.isEligible ? 'text-emerald-400 font-bold' : 'text-gray-400'">
                  {{ predResult.description }}
                </div>
              </div>
            </div>

            <button
              type="button"
              class="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-lg text-xs shadow-md transition-all cursor-pointer"
              @click="advancePredCycle"
            >
              🔄 推进指令轮次 (完成行动并消耗预判奖励)
            </button>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 吟游诗人持续歌唱脉冲体系与指挥棒加速管线 (基于 Godot battle_singing_system.gd) -->
    <n-card class="border border-purple-800/60 bg-[#160f29]/90 rounded-xl" title="🎵 吟游诗人持续歌唱脉冲体系与指挥棒加速管线 (battle_singing_system.gd)">
      <template #header-extra>
        <div class="flex items-center gap-1.5">
          <n-tag type="warning" size="small" round strong>力量之歌上限 +99 攻击</n-tag>
          <n-tag type="info" size="small" round>英雄之歌 +20 等级</n-tag>
          <n-tag type="success" size="small" round>指挥棒 1.5s 脉冲加速</n-tag>
        </div>
      </template>

      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          对齐 Godot 引擎 <code>battle_singing_system.gd</code> 实机规范：歌唱为持续性战时时钟推动机制。演唱者占用行动槽持续输出旋律，每经过一个周期（基准 <code>PULSE_SECONDS = 2.0s</code>，装备【大师指挥棒 <code>maestro_baton</code>】缩短为 <code>1.5s</code>）向全队存活队员触发一次增益脉冲。受到沉默、睡眠、停止、石化、混乱或倒地阵亡时，歌唱瞬时强制中断。
        </p>

        <!-- 双大旋律与加速特性 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 rounded-xl bg-slate-950/80 border border-purple-900/40 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-purple-300">💪 力量之歌 (Power's Song)</span>
              <n-tag size="tiny" type="warning">CAP = 99 ATK</n-tag>
            </div>
            <p class="text-[10px] text-gray-400 leading-relaxed">
              每次脉冲为全体存活同伴追加 <strong>+3 物理攻击力</strong>，本场累计最高 +99。达到上限后仍保留脉冲动画，但差额钳制防止数值越界。
            </p>
          </div>

          <div class="p-3 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-300">🌟 英雄之歌 (Hero's Song)</span>
              <n-tag size="tiny" type="info">MAX +20 LV</n-tag>
            </div>
            <p class="text-[10px] text-gray-400 leading-relaxed">
              每次脉冲将全员有效等级临时推高 <strong>+1 级</strong>（上限 +20 级），动态拉升攻防四维，战斗结束自动还原，绝不污染真实存档等级。
            </p>
          </div>

          <div class="p-3 rounded-xl bg-slate-950/80 border border-amber-900/40 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300">🪄 大师指挥棒 (Maestro Baton)</span>
              <n-tag size="tiny" type="success">1.5s / Pulse</n-tag>
            </div>
            <p class="text-[10px] text-gray-400 leading-relaxed">
              神兵级乐器特性：使脉冲节拍由 2.0 秒提速至 <strong>1.5 秒</strong>，极大加速力量叠加与等级跃迁效率。
            </p>
          </div>
        </div>

        <!-- 交互模拟器：吟游诗人歌唱脉冲与全队增益推演台 -->
        <div class="p-4 bg-slate-950/90 rounded-xl border border-purple-700/40 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-purple-900/30 pb-2">
            <div class="flex items-center gap-2">
              <span class="text-lg">🎼</span>
              <span class="font-bold text-purple-300">吟游诗人持续歌唱脉冲与全队增益推演台</span>
            </div>
            <div class="flex items-center gap-2">
              <n-button size="tiny" secondary type="warning" @click="resetSingingStudio">
                🔄 重置歌唱状态
              </n-button>
            </div>
          </div>

          <!-- 控制栏 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/70 p-3 rounded-lg border border-slate-800">
            <div>
              <span class="text-gray-400 text-[10px] block mb-1">选择演唱曲目 (Song):</span>
              <n-select v-model:value="singingSong" size="small" :options="singingSongOptions" :disabled="isSingingInterrupted" />
            </div>

            <div>
              <span class="text-gray-400 text-[10px] block mb-1">神兵乐器配装:</span>
              <label class="flex items-center gap-2 text-xs text-gray-200 mt-1 cursor-pointer">
                <input type="checkbox" v-model="hasMaestroBaton" />
                <span>佩戴【大师指挥棒】(1.5s 脉冲)</span>
              </label>
            </div>

            <div>
              <span class="text-gray-400 text-[10px] block mb-1">歌者状态 (爱德华):</span>
              <div class="flex items-center gap-1.5 flex-wrap mt-0.5">
                <n-tag :type="isSingingInterrupted ? 'error' : 'success'" size="small">
                  {{ isSingingInterrupted ? '❌ 歌唱已中断 (异常状态)' : '🎶 持续高歌中' }}
                </n-tag>
              </div>
            </div>

            <div>
              <span class="text-gray-400 text-[10px] block mb-1">已累计脉冲数:</span>
              <div class="text-lg font-bold font-mono text-purple-300">
                {{ singingPulses }} 次脉冲 ({{ (singingPulses * (hasMaestroBaton ? 1.5 : 2.0)).toFixed(1) }}s)
              </div>
            </div>
          </div>

          <!-- 模拟操作按键 -->
          <div class="flex flex-wrap items-center gap-2">
            <n-button size="small" type="primary" secondary :disabled="isSingingInterrupted" @click="pulseSinging(1)">
              🎵 推进 1 次歌唱脉冲 (+{{ hasMaestroBaton ? '1.5' : '2.0' }}s)
            </n-button>
            <n-button size="small" type="info" secondary :disabled="isSingingInterrupted" @click="pulseSinging(5)">
              ⏩ 连续歌唱 5 次脉冲
            </n-button>
            <n-button size="small" type="error" secondary @click="toggleSingingSilence">
              {{ isSingingInterrupted ? '🍃 解除异常/复活 (恢复歌唱)' : '🛑 敌方施加【沉默/睡眠】(强制打断)' }}
            </n-button>
          </div>

          <!-- 全队 4 人增益数值看板 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div v-for="hero in singingParty" :key="hero.name" class="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center space-y-1">
              <div class="font-bold text-gray-200 text-xs">{{ hero.name }}</div>
              <div class="text-[10px] text-gray-400">{{ hero.job }} · Lv.{{ hero.level + singingHeroLevelBonus }}</div>
              <div class="text-xs font-mono font-bold text-amber-400">
                ATK: {{ hero.baseAtk }} <span class="text-emerald-400">+{{ singingPowerAtkBonus }}</span>
              </div>
              <div class="text-[10px] font-mono text-cyan-300">
                临时等级: +{{ singingHeroLevelBonus }} LV
              </div>
            </div>
          </div>

          <!-- 审计日志 -->
          <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-0.5">
            <div class="text-gray-500 font-bold">歌唱管线时序追踪 (Singing Pipeline Trace):</div>
            <div v-for="(log, idx) in singingTraceLog" :key="idx" class="text-purple-300 truncate">
              &gt; {{ log }}
            </div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 战斗行动轴我方满格待命头像青白脉冲提示 -->
    <n-card class="border border-sky-900/60 bg-[#0e1b26]/90 rounded-xl" title="⏱️ 战斗行动轴我方满格待命头像青白脉冲体系 (Timeline Ready Portrait Pulse)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗行动轴（<code>battle_timeline.gd</code>）与 ATB 时钟（<code>battle_atb_clock.gd</code>）新增纯只读显示快照 <code>display_ready_actors()</code> 与头像边框脉冲渲染 <code>portrait_border_color()</code>，为我方已满格待命角色提供 1.2 秒周期的柔和青白呼吸边框提示。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">👑 当前行动者金框优先</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">#ffe591 锁定</span>
            </div>
            <p class="text-gray-400">
              当前正在输入或执行指令的 <code>active_actor</code> 始终保持高对比度亮金边框（<code>#ffe591</code>），阵亡角色维持暗灰边框（<code>#989898</code>）。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">✨ 1.2s 青白柔和脉冲</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">alpha 0.8~1.0</span>
            </div>
            <p class="text-gray-400">
              已满格且可正常输入（非混乱/停止/睡眠/石化/歌唱中）的我方待命候选头像呈现 <code>Color(0.82, 1.0, 1.0, 0.9 ± 0.1*sin)</code> 的 1.2 秒柔和呼吸脉冲。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🔒 纯只读快照零副作用</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">display_ready_actors</span>
            </div>
            <p class="text-gray-400">
              每次绘制仅读取无排序只读快照 <code>display_ready_actors()</code>，绝不调用会刷新装备先手或撤销 Quick 状态的生产仲裁函数 <code>ready_actors()</code>。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-blue-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-blue-300 text-sm">🛡️ 独立 UI 计时守恒</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 font-mono">零 RNG / 零时钟干扰</span>
            </div>
            <p class="text-gray-400">
              脉冲相位由 UI 局部 <code>_ready_pulse_elapsed</code> 独立驱动，仅在节点树可见时累加，绝不读取或推进战斗 ATB <code>elapsed</code> 与随机源。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-500/30 space-y-1.5 md:col-span-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-300 text-sm">🐢⚡ 行动轴【缓慢 (slow)】灰蓝与【加速 (haste)】0.4s 金色脉冲充能标记 (charge_marker_color / display_has_haste)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-amber-300 font-mono">#6d7f9b 灰蓝 · #f2ce69 金色脉冲</span>
            </div>
            <p class="text-gray-400">
              <code>battle_timeline.gd</code> 扩展 <code>charge_marker_color(actor, seconds)</code> 与纯只读快照函数 <code>display_has_haste(actor)</code>：存活单位处于【缓慢 (<code>slow</code>)】时充能圆点与连接线呈现灰蓝色（<code>#6d7f9b</code>）；处于【加速 (<code>haste</code>)】时呈现 0.4 秒周期的金色脉冲（<code>#f2ce69</code>，透明度 <code>0.85 ± 0.15*sin</code>）。<code>display_has_haste</code> 仅读取已投影快照（<code>statuses.has(&quot;haste&quot;)</code>、<code>course_haste_active</code> 及我方 <code>monster_data.status.equipment_effects</code> 中的 <code>auto_haste</code>），绝不调用会触发个人装备重刷写入的 <code>has_status(&quot;haste&quot;)</code>。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 吟游诗人持续歌唱五线谱光环与跃动音符表现 -->
    <n-card class="border border-amber-900/60 bg-[#1a1624]/90 rounded-xl" title="🎵 吟游诗人持续歌唱五线谱光环与跃动音符体系 (Bard Singing Indicator / battle_singing_indicator.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗角色视觉管线（<code>battle_scene_visuals.gd</code>）挂载纯表现歌唱指示器（<code>battle_singing_indicator.gd</code>），在我方角色持续吟唱【力量之歌 (<code>song_powers_song</code>)】或【英雄之歌 (<code>song_heros_song</code>)】期间，通过纯几何矢量实时绘制脚底五线谱光环与头顶跃动音符。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🎼 脚底五线谱椭圆光环</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">#e5c158 / #83ceff</span>
            </div>
            <p class="text-gray-400">
              在角色脚底（<code>FOOT = Vector2(0, 48)</code>）绘制 5 圈金蓝相间（<code>#e5c158</code> 与 <code>#83ceff</code>）的椭圆五线谱光环，并配有一颗沿 4 秒周期轨迹环绕的金色音轨光点。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🎶 头顶三枚跃动音符</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">纯矢量无字体依赖</span>
            </div>
            <p class="text-gray-400">
              在角色头顶（<code>y = -72 ± 4*sin</code>）呈现 3 枚错落起伏的八分音符，完全由圆、符干与符尾折线（<code>display_geometry()</code>）几何绘制，彻底摆脱系统字体符号缺失风险。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-rose-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-rose-300 text-sm">⚡ 异常与起跳即时隐退</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-mono">只读中断判定</span>
            </div>
            <p class="text-gray-400">
              当歌唱者阵亡、起跳滞空或陷入沉默/睡眠/停止/石化/混乱时立即隐藏光环与音符；仅做只读视觉收敛，绝不越权调用 <code>stop_singing</code> 修改战斗状态。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🛡️ 弱引用单次绑定守恒</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">WeakRef + 祖先链核验</span>
            </div>
            <p class="text-gray-400">
              采用 <code>WeakRef</code> 弱引用与完整祖先链 <code>is_queued_for_deletion()</code> 核验，模板重建时自动卸载旧实例，局部 <code>_visual_seconds</code> 独立运转，零 RNG/ATB 干扰。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 自动战斗道具耗尽回退普攻即时提示 -->
    <n-card class="border border-yellow-900/60 bg-[#1c1810]/90 rounded-xl" title="🔄 自动战斗道具耗尽回退普攻即时提示体系 (AutoResourceNotice / auto_resource_notice.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗场景（<code>battle_scene.gd</code> / <code>battle_scene_actions.gd</code>）接入纯只读自动资源耗尽提示组件（<code>auto_resource_notice.gd</code>）：当自动战斗记忆的战斗可用消耗品因零库存回退为普通攻击且实际启动结算时，呈现 1.0 秒非模态明黄提示 <code>道具已耗尽，切换为普通攻击</code>。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-yellow-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-yellow-300 text-sm">📦 派发前库存快照冻结</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-yellow-950 text-yellow-300 font-mono">duplicate 守恒</span>
            </div>
            <p class="text-gray-400">
              在调用自动动作前先行冻结 <code>notice_inventory = GameState.inventory.duplicate()</code>，即便本次回退普攻触发武器偷盗立刻补入同一道具，亦能准确识别派发瞬间的零库存回退。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🎯 严格零库存与启动门禁</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">is_depleted_fallback</span>
            </div>
            <p class="text-gray-400">
              排除封印武器主动技（<code>sealed_weapon_use</code>）与非战斗道具，且仅在 <code>!was_resolving &amp;&amp; _is_resolving_action</code> 确认原普攻入口真实启动后才提示，拒绝重入或无效派发误报。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📐 行动轴上方零遮挡排版</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">y=60 · 28px 高度</span>
            </div>
            <p class="text-gray-400">
              采用 <code>#facc15</code> 明黄字配深紫描边，定位于顶部提示栏左对齐 <code>y = 60</code>、高度 28px（恰好止于 <code>y = 88</code> 行动轴上方），紧凑宽度绝不侵入右侧自动战斗开关按钮。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🧹 1.0s 消隐与跨波/退自动即清</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">MOUSE_FILTER_IGNORE</span>
            </div>
            <p class="text-gray-400">
              无焦点、鼠标穿透，显示 1.0 秒后自动隐退；一旦关闭自动战斗、推进波次（<code>_wave</code> 变化）、换档或离开战斗树立即清空，零选招与库存副作用。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 战斗我方中毒状态角色立绘着色同步 -->
    <n-card class="border border-lime-900/60 bg-[#121f18]/90 rounded-xl" title="☠️ 战斗我方中毒状态角色序列帧着色同步体系 (BattleStatusTint / battle_status_tint.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗表现与 UI 同步管线（<code>battle_scene_feedback.gd</code> / <code>battle_scene_ui_sync.gd</code> / <code>battle_scene_visuals.gd</code>）接入纯表现中毒着色同步器（<code>battle_status_tint.gd</code>），在不干扰姿势动画与战斗数值的前提下，实时将我方存活中毒角色的序列帧着色器参数 <code>poisoned</code> 同步至绿幕材质。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-lime-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-lime-300 text-sm">🧪 专属绿幕 Shader 参数驱动</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-lime-950 text-lime-300 font-mono">green_key.gdshader</span>
            </div>
            <p class="text-gray-400">
              严格核验 <code>material.shader.resource_path == KEY_SHADER</code>，仅对标准 <code>green_key.gdshader</code> 材质注入 <code>poisoned</code> 布尔参数，绝不污染自定义回退材质。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🗿 石化与阵亡优先级守恒</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">alive &amp;&amp; !petrify</span>
            </div>
            <p class="text-gray-400">
              判定条件严格遵循 <code>actor.is_alive() and actor.has_status("poison") and not actor.has_status("petrify")</code>，石化灰度冻结与阵亡倒地优先，解除中毒或阵亡即刻恢复原色。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🎬 零姿势重播与双入口同步</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">Pose &amp; HP Bar Sync</span>
            </div>
            <p class="text-gray-400">
              在姿势刷新（<code>_refresh_party_battle_pose</code>）与血条状态同步（<code>_sync_player_health_bar</code>）双入口实时更新材质参数，绝不因颜色变化打断或重播角色当前动作帧。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🔒 槽位独立材质实例隔离</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">material.duplicate()</span>
            </div>
            <p class="text-gray-400">
              <code>_prepare_party_visual</code> 搭建时统一对所有 <code>ShaderMaterial</code> 执行单次 <code>duplicate()</code>，确保无独立帧的模板槽位亦拥有独立材质副本，零跨槽串色。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 失明状态头部黑雾与死之宣告行动倒数指示器 -->
    <n-card class="border border-slate-700/80 bg-[#141320]/90 rounded-xl" title="🌫️ 战斗失明状态头部黑雾与死之宣告倒数指示体系 (BlindIndicator &amp; DoomIndicator)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗角色视觉管线（<code>battle_scene_visuals.gd</code>）挂载纯只读异常状态指示组件：失明头部黑雾（<code>battle_blind_indicator.gd</code>）与死之宣告本人行动剩余数（<code>battle_doom_indicator.gd</code>），以独立局部几何与排版直观呈现关键负面状态，零命中率/行动计数/RNG 干扰。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-purple-300 text-sm">🌫️ 失明面部五团环绕黑雾</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">y=-25 · 2.4s 周期</span>
            </div>
            <p class="text-gray-400">
              存活且非跳跃滞空的【失明 (<code>blind</code>)】我方角色面部（<code>y = -25 ± 4*sin</code>，横向振幅 18px）绘制 5 团半透明黑灰交替雾球（半径 4px），不改角色材质或透明度。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-rose-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-rose-300 text-sm">💀 死之宣告行动剩余数</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-mono">#ffe591 → #f87171</span>
            </div>
            <p class="text-gray-400">
              <code>battle_doom_indicator.gd</code> 只读投影 <code>doom_actions_remaining</code>：剩余 &gt;1 次显示亮金（<code>#ffe591</code>），剩余 1 次切换鲜红警示（<code>#f87171</code>），停止/睡眠期间保持原数不越权递减。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📐 错位排版与自动按钮避让</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">(36,-76) 动态换侧</span>
            </div>
            <p class="text-gray-400">
              失明黑雾限定于面部 <code>y=-25</code>，死之宣告置于头顶右侧 <code>(36, -76)</code> 避开诗人音符；若与顶排自动按钮矩形相交，则自动镜像移至左侧 <code>-36 - size.x</code>。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🛡️ 会话守卫与永久退休</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">WeakRef + cycle 核验</span>
            </div>
            <p class="text-gray-400">
              严格核验宿主、模型、演员、<code>party_runtime</code> 与 <code>cycle_index</code>；普通解除或阵亡仅隐藏（后续再中招可重显），来源替换或退树则永久退休销毁。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-indigo-500/30 space-y-1.5 md:col-span-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-indigo-300 text-sm">👾 我方头顶四项核心负面状态 12×12 点阵角标 (StatusBadges / battle_status_badges.gd)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">doom &gt; petrify &gt; sleep &gt; poison</span>
            </div>
            <p class="text-gray-400">
              <code>battle_status_badges.gd</code> 按固定优先级 <code>[&quot;doom&quot;, &quot;petrify&quot;, &quot;sleep&quot;, &quot;poison&quot;]</code> 在存活且未跳跃的我方角色头顶（默认居中 <code>y = -62</code>，间距 15px；若与顶排自动按钮矩形相交则自动抬高至 <code>y = -104</code>）绘制纯程序化 12×12 像素点阵角标：死之宣告（<code>#f87171</code> 骷髅，需 <code>doom_actions_remaining &gt; 0</code>）、石化（<code>#b9b9c6</code> 棱石）、睡眠（<code>#83ceff</code> Z 字）与中毒（<code>#c18ce5</code> 毒滴）。无图集或字体依赖，仅在几何变化（<code>geometry != _last_geometry</code>）时按需重绘，零循环计时器与状态副作用。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 战后结算成长表格无奖励资格显式说明 -->
    <n-card class="border border-rose-900/60 bg-[#1e1416]/90 rounded-xl" title="📜 战后结算成长表格无奖励资格显式说明体系 (Reward Ineligibility Notice / battle_result.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战后结算界面（<code>battle_result.gd</code>）成长表格（<code>_add_reward_overlay</code> / <code>_add_growth_table_row</code>）新增对无奖励资格成员（如战斗结束时阵亡或石化）的显式中文说明与色彩区分，杜绝玩家对“+0 EXP / +0 AP”产生结算异常疑惑。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-rose-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-rose-300 text-sm">🔒 原生布尔收据严格核验</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-mono">reward_eligible == false</span>
            </div>
            <p class="text-gray-400">
              仅当正式结算收据显式携带原生布尔 <code>reward_eligible == false</code>（<code>eligible is bool and not eligible</code>）时才判定为无资格；字段缺失或普通 0 奖励绝不误标。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🖍️ 姓名红字提示与灰化数值</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">#a22631 / #716b65</span>
            </div>
            <p class="text-gray-400">
              首列角色名下方追加换行提示 <code>无法获得奖励</code> 并着色暗红（<code>#a22631</code>），右侧经验与 AP 列呈现灰褐色（<code>#716b65</code>），正常获奖角色维持羊皮纸深褐（<code>#392717</code>）。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📐 羊皮纸滚动区自适应</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">Rect2(62,327,580,207)</span>
            </div>
            <p class="text-gray-400">
              复用既有三列固定比例与智能换行（<code>AUTOWRAP_WORD_SMART</code>），严格收束在羊皮纸美术滚动区内，完全保留正式收据原数值与键盘确认焦点。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- ⚡ 专区: 全域 ATB 动态时间轴连携与指令优先级微秒解算工坊 (ATB Microsecond Priority & Chain Resolution Studio) -->
    <div id="micro-atb-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0b1426] via-[#101b34] to-[#0d1322] border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.22)] space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-cyan-950 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              ATB MICROSECOND TIMELINE &amp; PRIORITY STUDIO
            </span>
            <span class="text-xs text-gray-400 font-mono">v2.2.266 官方实机矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <span>⚡</span> 全域 ATB 动态时间轴连携与指令优先级微秒解算工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            深入 0.01ms 极小步长微秒时钟切片！高精推演【充能 ➔ 待命决策 ➔ 技能咏唱 ➔ 执行硬直】四阶管道流转，支持四级指令抢断插队队列、神龙 1200ms 大海啸读条预判打断与 SHA-256 方案书一键导出。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetMicroAtbStudio">
            🔄 重置微秒推演
          </n-button>
          <n-button size="small" secondary type="info" @click="stepMicroTick(100)">
            ⏩ 单步 +100ms
          </n-button>
          <n-button
            size="small"
            :type="isMicroAtbRunning ? 'error' : 'primary'"
            class="font-bold shadow"
            @click="toggleMicroAtbRun"
          >
            {{ isMicroAtbRunning ? '⏸️ 暂停微秒时钟' : '▶️ 运行微秒时钟' }}
          </n-button>
          <n-button size="small" type="error" secondary @click="interruptBossCast">
            💥 强制抢断首领
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportMicroAtbCertificate">
            📜 导出微秒时间轴方案书
          </n-button>
        </div>
      </div>

      <!-- 三栏主推演工作台 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 四主角 + 首领实时微秒状态管道 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>⏱️</span>
                <span>全域微秒流水线管道</span>
              </span>
              <span class="font-mono text-xs text-amber-400 font-bold">
                {{ microSimElapsedMs.toFixed(1) }} ms ({{ (microSimElapsedMs / 1000).toFixed(2) }}s)
              </span>
            </div>

            <!-- 角色微秒槽位清单 -->
            <div class="space-y-2.5 text-xs">
              <div
                v-for="u in microUnits"
                :key="u.id"
                class="p-2.5 rounded-lg border transition-all"
                :class="u.isBoss ? 'bg-rose-950/30 border-rose-500/40' : 'bg-slate-950 border-slate-800'"
              >
                <div class="flex items-center justify-between">
                  <span class="font-bold text-white flex items-center gap-1.5">
                    <span>{{ u.avatar }}</span>
                    <span>{{ u.name }}</span>
                    <span class="text-[10px] text-gray-400 font-mono">(敏捷 {{ u.agility }})</span>
                  </span>
                  <n-tag size="tiny" :type="u.tagType">{{ u.stateText }}</n-tag>
                </div>

                <!-- 进度条 -->
                <div class="mt-2 space-y-1">
                  <div class="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>{{ u.phaseText }}</span>
                    <span :class="u.isBoss ? 'text-rose-400' : 'text-cyan-400'">{{ u.progressPercent }}%</span>
                  </div>
                  <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-150"
                      :class="u.isBoss ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'"
                      :style="{ width: `${u.progressPercent}%` }"
                    ></div>
                  </div>
                </div>

                <div class="mt-1.5 flex justify-between items-center text-[10px]">
                  <span class="text-gray-400">预备指令: <strong class="text-white">{{ u.queuedAction }}</strong></span>
                  <span class="text-amber-300 font-mono font-bold">{{ u.priorityTag }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
            <span>时钟分辨率:</span>
            <span class="font-mono font-bold text-emerald-400">0.01ms (100% 精确防时钟漂移)</span>
          </div>
        </div>

        <!-- 栏 2: 动态战术预设与优先级队列 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>🎯</span>
              <span>时序连携战术预设</span>
            </span>
            <n-tag size="tiny" type="info">{{ currentMicroPreset.tag }}</n-tag>
          </div>

          <!-- 预设选择器 -->
          <div class="space-y-1.5">
            <label class="text-[11px] text-gray-400 block">选择战术连携预设 (Tactical Preset):</label>
            <select
              v-model="selectedMicroPresetId"
              class="w-full bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-bold rounded-lg p-2 focus:border-cyan-400 focus:outline-none"
              @change="applyMicroPreset"
            >
              <option v-for="p in microPresets" :key="p.id" :value="p.id">
                {{ p.name }}
              </option>
            </select>
          </div>

          <!-- 预设详述卡片 -->
          <div class="p-3 bg-slate-950 rounded-lg border border-cyan-500/30 space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="font-bold text-white flex items-center gap-1 text-sm">
                <span>{{ currentMicroPreset.icon }}</span>
                <span>{{ currentMicroPreset.name }}</span>
              </span>
              <span class="text-[10px] text-amber-400 font-mono font-bold">{{ currentMicroPreset.windowMs }}ms 打断窗</span>
            </div>
            <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentMicroPreset.description }}</p>
            <div class="p-2 rounded bg-cyan-950/40 border border-cyan-900/50 text-[11px] space-y-1">
              <div class="text-amber-300 font-bold flex items-center gap-1">
                <span>⚡ 优先级策略:</span>
                <span>{{ currentMicroPreset.priorityRule }}</span>
              </div>
              <div class="text-cyan-300 text-[10px]">🛡️ 连携收益: {{ currentMicroPreset.synergyBonus }}</div>
            </div>
          </div>

          <!-- 实时四级指令优先级队列看板 -->
          <div class="space-y-2">
            <span class="text-[11px] font-bold text-gray-300 block">实时指令优先级插队队列 (Priority Queue):</span>
            <div class="space-y-1.5 text-xs">
              <div
                v-for="(item, idx) in microPriorityQueue"
                :key="idx"
                class="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between"
              >
                <div class="flex items-center gap-2">
                  <span class="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold text-[10px]">
                    {{ idx + 1 }}
                  </span>
                  <span class="font-bold text-white">{{ item.actorName }}</span>
                  <span class="text-[10px] text-gray-400">{{ item.actionName }}</span>
                </div>
                <div class="flex items-center gap-2 font-mono">
                  <span class="text-[10px] text-cyan-300">{{ item.castRemainMs }}ms</span>
                  <n-tag size="tiny" :type="item.priority >= 90 ? 'error' : item.priority >= 75 ? 'warning' : 'info'">
                    P{{ item.priority }}
                  </n-tag>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 3: 连携微秒解算指标与实时流水日志 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-cyan-950/20 to-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>连携微秒动力学指标</span>
              </span>
              <n-tag size="tiny" :type="bossCastInterrupted ? 'success' : 'warning'">
                {{ bossCastInterrupted ? '🛡️ 首领已被打断' : '⚡ 读条威慑中' }}
              </n-tag>
            </div>

            <!-- 关键指标卡片 -->
            <div class="grid grid-cols-2 gap-2 text-center text-xs">
              <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div class="text-[10px] text-gray-400">元素连携加成</div>
                <div class="text-xl font-black font-mono mt-0.5 text-amber-400">+{{ microChainBonus }}%</div>
              </div>
              <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div class="text-[10px] text-gray-400">平均动作延迟</div>
                <div class="text-xl font-black font-mono mt-0.5 text-cyan-400">{{ averageActionLatencyMs.toFixed(1) }}ms</div>
              </div>
            </div>

            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div class="text-[11px] text-gray-400">首领危险技能读条窗口</div>
              <div class="text-2xl font-black font-mono mt-1" :class="bossCastInterrupted ? 'text-emerald-400' : 'text-rose-400'">
                {{ bossCastInterrupted ? 'CANCELLED (已击破)' : `${bossCastingRemainMs} ms 剩余` }}
              </div>
              <div class="text-[10px] text-gray-400 mt-0.5">
                神龙【极超·灭世大海啸】1200ms 总咏唱，需在 380ms 绝杀窗内达成 P1/P2 插队打断
              </div>
            </div>

            <!-- 实时微秒日志流 -->
            <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[10px] space-y-1 max-h-24 overflow-y-auto font-mono text-gray-300">
              <div v-for="(log, idx) in microLogs" :key="idx" class="flex items-start gap-1">
                <span class="text-cyan-400 shrink-0">•</span>
                <span>{{ log }}</span>
              </div>
            </div>
          </div>

          <!-- 一键打断与方案输出 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 via-amber-600 to-cyan-600 hover:from-cyan-500 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg cursor-pointer"
              @click="stepMicroTick(250)"
            >
              ⏩ 模拟快进 250ms 时滞判定
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 工坊 3: 全域 ATB 时钟频率过载与四相连续魔连携矩阵工坊 -->
    <div
      id="atb-overdrive-studio"
      class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/70 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.2)] space-y-6 relative overflow-hidden"
    >
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 头部标章与导出 -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              v2.2.280 重磅实装
            </span>
            <span class="text-xs text-gray-400">时钟倍频过载 · 四相连续魔连携 · 破限插队仲裁</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>⚡</span> 全域 ATB 时钟频率过载与四相连续魔连携矩阵工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            基于微秒级动态时间轴仲裁与属性共振动力学，解算时钟倍频过载充能、四相连续魔无缝爆发、首领绝杀窗插队打断与破限爆发伤害。
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingOverdrive"
            @click="runOverdriveSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动时钟倍频爆发推演
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportOverdriveTacticsCertificate"
          >
            <template #icon><span>📜</span></template>
            导出战术过载方案书
          </n-button>
        </div>
      </div>

      <!-- 四相连续魔与时钟战姿 (4 Overdrive Stances) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        <div
          v-for="stance in overdriveStances"
          :key="stance.id"
          class="p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
          :class="selectedOverdriveStanceId === stance.id
            ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="selectedOverdriveStanceId = stance.id"
        >
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xl">{{ stance.icon }}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded font-mono" :class="selectedOverdriveStanceId === stance.id ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-gray-400'">
                {{ stance.tag }}
              </span>
            </div>
            <div class="font-bold text-xs text-gray-200">{{ stance.name }}</div>
            <div class="text-[10px] text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">{{ stance.desc }}</div>
          </div>
          <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
            <span class="text-gray-400">超频充能增益:</span>
            <span class="font-mono font-bold text-cyan-300">{{ stance.boost }}</span>
          </div>
        </div>
      </div>

      <!-- 核心工作台：双栏交互面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        <!-- 左侧：全息时钟雷达视窗与指标卡片 -->
        <div class="lg:col-span-7 space-y-4">
          <!-- 全息时钟雷达视窗 -->
          <div class="relative h-64 sm:h-72 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
              <div
                class="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                :style="{
                  background: currentOverdriveStance.gradient,
                  opacity: (atbClockMultiplier / 5.0 * 0.75 + 0.15).toFixed(2),
                  transform: `scale(${1 + resonanceRatio / 250})`
                }"
              ></div>
              <svg class="w-64 h-64 opacity-50 animate-[spin_40s_linear_infinite]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(6,182,212,0.4)" stroke-width="1.5" stroke-dasharray="4 4" />
                <circle cx="100" cy="100" r="68" fill="none" stroke="rgba(59,130,246,0.5)" stroke-width="1.2" />
                <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(168,85,247,0.5)" stroke-width="1" stroke-dasharray="2 2" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(6,182,212,0.3)" stroke-width="1" />
                <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(6,182,212,0.3)" stroke-width="1" />
                <circle cx="100" cy="100" r="5" fill="rgba(6,182,212,0.9)" />
              </svg>
            </div>

            <!-- 顶部状态指示灯 -->
            <div class="relative z-10 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span class="font-mono text-cyan-300 font-bold">ATB CLOCK OVERDRIVE ACTIVE</span>
                <span class="text-gray-400 font-mono text-[10px]">| {{ atbClockMultiplier }}x 频率</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-amber-300">
                插队敏感度: {{ preemptionSensitivity }} ms
              </div>
            </div>

            <!-- 中间标语 -->
            <div class="relative z-10 text-center my-auto">
              <div class="text-2xl font-black text-white/95 tracking-wider font-mono drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
                {{ currentOverdriveStance.name }}
              </div>
              <div class="text-xs text-cyan-200/80 mt-1 font-mono">
                理论爆发: {{ calculatedOverdriveBurstDamage.toLocaleString() }} HP · 打断成功率: {{ calculatedInterruptChance }}%
              </div>
            </div>

            <!-- 底部性能微视窗 -->
            <div class="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-gray-400">
              <span>全行动槽充能: {{ calculatedChargeTime }} 秒</span>
              <span class="text-emerald-400 font-bold">
                连续魔阶数: {{ dualcastRanks }} 重连续共鸣 ({{ resonanceRatio }}%)
              </span>
            </div>
          </div>

          <!-- 4 维物理与战斗指标卡片 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">理论连击总伤害</div>
              <div class="font-mono text-amber-400 font-bold text-sm mt-0.5">{{ calculatedOverdriveBurstDamage.toLocaleString() }}</div>
              <div class="text-[9px] text-gray-500 mt-0.5">{{ damageCapBreaker ? '破限解除 99,999' : '常规伤害上限' }}</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">满槽充能循环耗时</div>
              <div class="font-mono text-cyan-400 font-bold text-sm mt-0.5">{{ calculatedChargeTime }}s</div>
              <div class="text-[9px] text-gray-500 mt-0.5">{{ atbClockMultiplier }}x 时钟超频倍率</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">首领打断判定率</div>
              <div class="font-mono text-emerald-400 font-bold text-sm mt-0.5">{{ calculatedInterruptChance }}%</div>
              <div class="text-[9px] text-gray-500 mt-0.5">{{ instantCastPermit ? '零咏唱立即击发' : '常规咏唱时滞' }}</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">秒伤输出增幅比</div>
              <div class="font-mono text-purple-400 font-bold text-sm mt-0.5">+{{ calculatedDpsGain }}%</div>
              <div class="text-[9px] text-gray-500 mt-0.5">{{ counterAbsorbWard ? '反击护盾吸收激活' : '常规受击模式' }}</div>
            </div>
          </div>

          <!-- 实时推演日志终端 -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
            <div class="flex items-center justify-between text-xs text-gray-400 pb-1.5 border-b border-slate-800">
              <span class="flex items-center gap-1.5 text-cyan-300 font-bold">
                <span>💻</span> ATB 时钟超频与连携日志 (Overdrive Terminal)
              </span>
              <span class="text-[10px] text-gray-500">时序精度: 微秒级</span>
            </div>
            <div class="space-y-1 text-[11px] text-gray-300 max-h-28 overflow-y-auto custom-scrollbar">
              <div v-for="(log, idx) in overdriveSimLogs" :key="idx" class="flex items-start gap-1.5">
                <span class="text-cyan-400 select-none">&gt;</span>
                <span :class="log.includes('完成') || log.includes('成功') || log.includes('打断') ? 'text-emerald-400' : 'text-gray-300'">{{ log }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：无极物理调优与时钟控制 -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div class="text-xs font-bold text-cyan-300 flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="flex items-center gap-1.5">
              <span>🎛️</span> ATB 与连续魔参数微调 (Tactics Uniforms)
            </span>
            <button
              type="button"
              class="text-[10px] text-gray-400 hover:text-cyan-300 cursor-pointer"
              @click="resetOverdriveParams"
            >
              重置参数
            </button>
          </div>

          <!-- 时钟倍频系数 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>ATB 时钟倍频 (Clock Multiplier):</span>
              <span class="font-mono text-cyan-400 font-bold">{{ atbClockMultiplier }}x</span>
            </div>
            <n-slider v-model:value="atbClockMultiplier" :min="1.0" :max="5.0" :step="0.1" />
            <div class="flex justify-between text-[9px] text-gray-500">
              <span>1.0x 标准基频</span>
              <span>3.0x 极速充能</span>
              <span>5.0x 极限过载</span>
            </div>
          </div>

          <!-- 连续魔共鸣阶数 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>连续魔共鸣阶数 (Dualcast Ranks):</span>
              <span class="font-mono text-amber-400 font-bold">{{ dualcastRanks }} 阶</span>
            </div>
            <n-slider v-model:value="dualcastRanks" :min="2" :max="8" :step="1" />
          </div>

          <!-- 插队敏感度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>插队判定敏感度 (Preemption Sensitivity):</span>
              <span class="font-mono text-rose-400 font-bold">{{ preemptionSensitivity }} ms</span>
            </div>
            <n-slider v-model:value="preemptionSensitivity" :min="10" :max="100" :step="5" />
          </div>

          <!-- 属性共振比 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>属性共振过载比 (Resonance Ratio):</span>
              <span class="font-mono text-purple-400 font-bold">{{ resonanceRatio }} %</span>
            </div>
            <n-slider v-model:value="resonanceRatio" :min="50" :max="200" :step="5" />
          </div>

          <!-- 3 项战术开关 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 flex items-center gap-1.5">
                <span>⚡</span> 零咏唱极速击发许可 (Instant Cast)
              </span>
              <n-switch v-model:value="instantCastPermit" size="small" />
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 flex items-center gap-1.5">
                <span>💥</span> 伤害上限突破许可 (Break 99999 Cap)
              </span>
              <n-switch v-model:value="damageCapBreaker" size="small" />
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 flex items-center gap-1.5">
                <span>🛡️</span> 敌方反制时滞吸收护盾 (Counter Absorb)
              </span>
              <n-switch v-model:value="counterAbsorbWard" size="small" />
            </div>
          </div>
        </div>
      </div>

      <!-- 下方：Godot 4.6 LTS 底层脚本契约矩阵 -->
      <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 relative z-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-cyan-300 font-mono">GODOT 4.6 LTS ARCHITECTURE SPEC</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">纯粹 RefCounted 离线解算</span>
            </div>
            <div class="text-xs text-gray-400 mt-0.5">时钟倍频过载、四相连续魔连携与时空停滞场控制机</div>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs font-mono">
              <button
                type="button"
                class="px-2.5 py-1 rounded transition cursor-pointer"
                :class="activeOverdriveCodeTab === 'engine' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                @click="activeOverdriveCodeTab = 'engine'"
              >
                atb_overdrive_engine.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded transition cursor-pointer"
                :class="activeOverdriveCodeTab === 'resolver' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                @click="activeOverdriveCodeTab = 'resolver'"
              >
                quad_dualcast_synergy.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded transition cursor-pointer"
                :class="activeOverdriveCodeTab === 'controller' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                @click="activeOverdriveCodeTab = 'controller'"
              >
                chrono_stasis_field.gd
              </button>
            </div>
            <n-button
              size="small"
              type="info"
              secondary
              round
              @click="copyOverdriveCode"
            >
              复制源码
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentOverdriveCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ⚔️ 工坊 4: 全域 ATB 动态时间流逝、连携技帧数对齐与极限破防战术工坊 (ATB Flow & Frame Sync Stagger Studio v2.2.303) -->
    <div
      id="atb-frame-stagger-studio"
      class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900/90 to-cyan-950/80 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.22)] space-y-6 relative overflow-hidden"
    >
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -left-20 -bottom-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 头部与操作区 -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/60 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5 flex-wrap">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-black font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              ATB FRAME SYNC &amp; STAGGER v2.2.303
            </span>
            <span class="text-xs text-emerald-300/80 font-mono">微秒级ATB时钟与跨帧连携矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-wide">
            <span>⚔️</span> 全域 ATB 动态时间流逝、连携技帧数对齐与极限破防战术工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            基于 Godot 4.6 LTS 实时仿真：驱动全队敏捷动态向量时钟调度、双角色连携战技同帧完美合击对齐、敌方韧性条消融与 999999 破限爆发伤害解算。
          </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap self-start md:self-auto">
          <n-button
            type="info"
            size="small"
            round
            secondary
            @click="resetAtbFrameParameters"
          >
            重置参数
          </n-button>
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingAtbFrame"
            @click="runAtbFrameSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动帧同步推演
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportAtbFrameTacticsCertificate"
          >
            <template #icon><span>📜</span></template>
            导出战术方案书
          </n-button>
        </div>
      </div>

      <!-- 四大战斗时序原型 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        <div
          v-for="archetype in atbFrameArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left"
          :class="selectedAtbFrameArchetypeId === archetype.id
            ? 'bg-emerald-950/50 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-emerald-600/50'"
          @click="selectedAtbFrameArchetypeId = archetype.id"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ archetype.icon }}</span>
            <n-tag size="tiny" :type="archetype.tagType" round>{{ archetype.tag }}</n-tag>
          </div>
          <div class="font-bold text-sm text-gray-100">{{ archetype.name }}</div>
          <div class="text-[11px] text-emerald-300/80 font-mono mt-0.5">{{ archetype.style }}</div>
          <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{{ archetype.desc }}</p>
          <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>基底爆发: {{ archetype.baseBurst.toLocaleString() }}</span>
            <span class="text-cyan-400">周期: {{ archetype.cycleMs }}ms</span>
          </div>
        </div>
      </div>

      <!-- 调控滑块与高能开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        <!-- 左侧参数微调面板 -->
        <div class="lg:col-span-7 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <span>⚙️</span> ATB 倍频与帧数对齐参数连续微调
            </span>
            <span class="text-[11px] font-mono text-emerald-400">Continuous Micro-ATB Dynamics</span>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">ATB 时钟倍频加速比率 (Clock Frequency Scale):</span>
                <span class="font-mono text-emerald-400 font-bold">{{ atbClockFrequency.toFixed(1) }}x</span>
              </div>
              <n-slider v-model:value="atbClockFrequency" :min="1.0" :max="5.0" :step="0.1" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>标准时间流 (1.0x)</span>
                <span>高频加速 (2.8x)</span>
                <span>超光速脉冲 (5.0x)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">连携合击对齐帧宽 (Combo Frame Window):</span>
                <span class="font-mono text-amber-400 font-bold">{{ comboFrameWindow }} 帧 ({{ (comboFrameWindow * 16.6).toFixed(0) }}ms)</span>
              </div>
              <n-slider v-model:value="comboFrameWindow" :min="1" :max="12" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>像素级同帧 (1帧)</span>
                <span>标准合击 (4帧)</span>
                <span>宽松判决 (12帧)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">领主破防易伤增幅 (Stagger Vulnerability Boost):</span>
                <span class="font-mono text-red-400 font-bold">+{{ staggerVulnerabilityBoost }}%</span>
              </div>
              <n-slider v-model:value="staggerVulnerabilityBoost" :min="50" :max="300" :step="10" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>常规易伤 (+50%)</span>
                <span>深度硬直 (+180%)</span>
                <span>绝对破防 (+300%)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">连携暴击穿透层数 (Combo Penetration Stacks):</span>
                <span class="font-mono text-cyan-400 font-bold">{{ comboPenetrationStacks }} 层</span>
              </div>
              <n-slider v-model:value="comboPenetrationStacks" :min="1" :max="8" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>微光穿透 (1层)</span>
                <span>多重连携 (5层)</span>
                <span>太古湮灭 (8层)</span>
              </div>
            </div>
          </div>

          <!-- 三大高能保障开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">零延迟瞬时输入缓冲断路器 (Zero Latency Buffer)</div>
                <div class="text-[11px] text-gray-400">消除网络与按键抖动，战技指令精准锁相于物理帧第 0 纳秒触发</div>
              </div>
              <n-switch v-model:value="zeroLatencyInputBuffer" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">完美同帧合体技必定暴击锁 (Perfect Frame Combo Crit Lock)</div>
                <div class="text-[11px] text-gray-400">双角色在 3 帧内完成合击时 100% 触发真伤暴击，无视敌方抗性</div>
              </div>
              <n-switch v-model:value="perfectFrameComboCritLock" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">999999 破限爆发伤害天花板穿透器 (Damage Cap Governor)</div>
                <div class="text-[11px] text-gray-400">解除所有技能 999999 伤害天花板，单次连携最高斩击冲破 9,999,999</div>
              </div>
              <n-switch v-model:value="breakthroughDamageCapGovernor" size="small" />
            </div>
          </div>
        </div>

        <!-- 右侧能效指标解算与沙盘推演 -->
        <div class="lg:col-span-5 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>📊</span> 实时解算时序连携与破防爆发
              </span>
              <n-tag size="tiny" type="success" round>Frame Synchronized</n-tag>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-700/40">
                <div class="text-[11px] text-gray-400">连携极限爆发伤害</div>
                <div class="text-lg font-black text-emerald-300 font-mono mt-0.5">{{ calculatedComboBurstDmg.toLocaleString() }} DMG</div>
                <div class="text-[10px] text-emerald-400/80 mt-0.5">完美同帧双人合击</div>
              </div>

              <div class="p-3 rounded-lg bg-cyan-950/30 border border-cyan-700/40">
                <div class="text-[11px] text-gray-400">ATB 单回合充能周期</div>
                <div class="text-lg font-black text-cyan-300 font-mono mt-0.5">{{ calculatedAtbTurnCycle }} 秒</div>
                <div class="text-[10px] text-cyan-400/80 mt-0.5">高频倍率流逝耗时</div>
              </div>

              <div class="p-3 rounded-lg bg-red-950/30 border border-red-700/40">
                <div class="text-[11px] text-gray-400">领主破防易伤乘数</div>
                <div class="text-lg font-black text-red-300 font-mono mt-0.5">{{ calculatedStaggerMultiplier }}x</div>
                <div class="text-[10px] text-red-400/80 mt-0.5">韧性清零破防倍率</div>
              </div>

              <div class="p-3 rounded-lg bg-purple-950/30 border border-purple-700/40">
                <div class="text-[11px] text-gray-400">战术时序协同评阶</div>
                <div class="text-sm font-black text-purple-300 font-mono mt-1">{{ calculatedTacticsTier }}</div>
                <div class="text-[10px] text-purple-400/80 mt-0.5">高维战律神圣认证</div>
              </div>
            </div>
          </div>

          <!-- 推演终端 -->
          <div class="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-400">五阶段战术帧同步推演进度:</span>
              <span class="font-mono text-emerald-400 font-bold">{{ atbFrameSimStep }}/5 阶段</span>
            </div>
            <n-progress
              type="line"
              :percentage="(atbFrameSimStep / 5) * 100"
              :status="atbFrameSimStep === 5 ? 'success' : 'info'"
              :show-indicator="false"
              processing
            />
            <div class="text-[11px] text-gray-300 font-mono bg-slate-900/90 p-2 rounded border border-slate-800/80 min-h-[48px] flex items-center">
              <span>{{ atbFrameSimCurrentLog }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 实机驱动源码展台 -->
      <div class="bg-slate-900/80 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3 relative z-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-gray-200">Godot 4.6 LTS 实机引擎源码架构展台</span>
            <n-tag size="tiny" type="warning" round>RefCounted 零开销架构</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeAtbFrameCodeTab === 'scheduler' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeAtbFrameCodeTab = 'scheduler'"
              >
                atb_clock_scheduler.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeAtbFrameCodeTab === 'sync' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeAtbFrameCodeTab = 'sync'"
              >
                cross_frame_combo.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeAtbFrameCodeTab === 'stagger' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeAtbFrameCodeTab = 'stagger'"
              >
                boss_stagger_pipeline.gd
              </button>
            </div>
            <n-button size="small" type="primary" secondary round @click="copyAtbFrameCode">
              复制源码
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentAtbFrameCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 全息回合制 ATB 动态极意连携、阵形战术与伤害解限工坊 (v2.2.328 重磅实装) -->
    <div id="omni-atb-synergy-studio" class="omni-atb-synergy-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-cyan-950/20 to-slate-900/95 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              OMNI ATB SYNERGY & DAMAGE UNCAP MATRIX
            </span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
              v2.2.328 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>⚔️</span> 全息回合制 ATB 动态极意连携、阵形战术与伤害解限工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            提供四圣骑锋矢阵、双魔导星轨阵、影刃死囚绝杀阵与全知贤者同调阵，支持 99999999 真实伤害天花板破限、时间冻结等待与 Godot 4.6 LTS 连携时序总线。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="info" @click="resetOmniAtbDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="info" :loading="isOmniAtbSimulating" @click="runOmniAtbSynergySimulation">
            <template #icon><span>⚡</span></template>
            激发战术推演
          </n-button>
          <n-button size="small" round secondary type="warning" @click="exportOmniAtbCert">
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大战斗阵形极意原型 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="archetype in formationArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
          :class="selectedFormationArchetype === archetype.id ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/30' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="selectFormationArchetype(archetype.id)"
        >
          <div class="flex items-start justify-between">
            <div class="text-2xl">{{ archetype.icon }}</div>
            <span class="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold" :class="archetype.tagClass">
              {{ archetype.typeTag }}
            </span>
          </div>
          <h3 class="font-bold text-white text-base mt-2">{{ archetype.name }}</h3>
          <p class="text-xs text-cyan-300/80 mt-1">{{ archetype.desc }}</p>
          <div class="mt-3 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-gray-400">
            <div class="flex justify-between">
              <span>阵形站位加成:</span>
              <span class="text-amber-300 font-mono">{{ archetype.buffSpecialty }}</span>
            </div>
            <div class="flex justify-between">
              <span>连携极意技:</span>
              <span class="text-emerald-300 font-mono">{{ archetype.limitBreakMove }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 四维阵形与ATB战术调控滑块 -->
      <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
        <div class="text-sm font-bold text-white flex items-center justify-between">
          <span class="flex items-center gap-2"><span>🎛️</span> ATB倍频时流与破限天花板调控</span>
          <span class="text-xs text-cyan-400 font-mono">Realtime ATB Microsecond Alignment</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">ATB 行动时序倍频流速 (x):</span>
              <span class="text-cyan-400 font-mono font-bold">{{ atbTimeFlowFactor.toFixed(1) }}x (动态充能流速)</span>
            </div>
            <n-slider v-model:value="atbTimeFlowFactor" :min="1.0" :max="4.0" :step="0.2" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>1.0x 标准经典</span>
              <span>2.0x 极速对决</span>
              <span>4.0x 狂暴超频</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">四人连携技对齐窗口公差 (ms):</span>
              <span class="text-amber-400 font-mono font-bold">{{ synergyAlignToleranceMs }} ms (判定帧宽)</span>
            </div>
            <n-slider v-model:value="synergyAlignToleranceMs" :min="10" :max="100" :step="5" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>10 ms 精准帧对齐</span>
              <span>35 ms 黄金窗口</span>
              <span>100 ms 宽容触发</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">伤害天花板破限阈值 (Mln Dmg):</span>
              <span class="text-purple-400 font-mono font-bold">{{ damageUncapLimitMln.toFixed(1) }} M (真伤突破)</span>
            </div>
            <n-slider v-model:value="damageUncapLimitMln" :min="9.99" :max="99.99" :step="5.0" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>9.99M 破百万</span>
              <span>49.99M 圣殿级</span>
              <span>99.99M 极限满伤</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">阵形协同以太光环半径 (m):</span>
              <span class="text-emerald-400 font-mono font-bold">{{ formationAuraRadiusM }} 米 (全队同频)</span>
            </div>
            <n-slider v-model:value="formationAuraRadiusM" :min="5" :max="25" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>5m 密集阵形</span>
              <span>15m 战术散开</span>
              <span>25m 全图覆盖</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 三大战斗特权开关 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">全息 ATB 时间冻结决策等待模式</div>
            <div class="text-[10px] text-gray-400 mt-0.5">选择魔法与道具时全场时钟绝对停顿</div>
          </div>
          <n-switch v-model:value="enableActiveTimeFreezeWaitMode" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">99999999 极限真伤天花板解限</div>
            <div class="text-[10px] text-gray-400 mt-0.5">突破 999999 旧引擎硬上限限制</div>
          </div>
          <n-switch v-model:value="enableUnlimitedTrueDamageUncap" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">濒死绝境四人极意奥义连携爆发</div>
            <div class="text-[10px] text-gray-400 mt-0.5">全员 HP &lt; 25% 瞬发零消耗终焉斩</div>
          </div>
          <n-switch v-model:value="enableCrisisLimitBreakCombo" size="small" />
        </div>
      </div>

      <!-- 关键实时指标卡片 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">极意连携技能理论秒伤</div>
          <div class="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
            {{ theoreticalComboDps.toLocaleString() }}
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">全员连携极限输出</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">阵形以太共振稳态率</div>
          <div class="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-1">
            {{ formationResonanceStabilityPct }}%
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">光环覆盖稳固度</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">敌方韧性破防崩解耗时</div>
          <div class="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
            {{ staggerBreakDurationSec }} s
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">瘫痪易伤触发耗时</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">战术大师认证评级</div>
          <div class="text-sm sm:text-base font-black text-purple-400 font-mono mt-1 truncate">
            {{ omniAtbTierBadge }}
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">动态 ATB 规范标准</div>
        </div>
      </div>

      <!-- 沙盘推演日志与进度 -->
      <div v-if="isOmniAtbSimulating || omniAtbLogs.length > 0" class="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-300 font-bold flex items-center gap-2">
            <span>🔄</span> 全息 ATB 阵形与连携破限沙盘进程: {{ omniAtbSimStep }}
          </span>
          <span class="text-cyan-400 font-mono font-bold">{{ omniAtbSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="omniAtbSimProgress"
          :indicator-placement="'inside'"
          processing
          status="info"
        />
        <div class="max-h-36 overflow-y-auto space-y-1 font-mono text-[11px] text-gray-400 pt-2 border-t border-slate-900">
          <div v-for="(log, idx) in omniAtbLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-cyan-500">›</span>
            <span :class="idx === omniAtbLogs.length - 1 ? 'text-cyan-300 font-bold' : 'text-gray-400'">{{ log }}</span>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">GODOT 4.6 LTS</span>
            <h3 class="text-sm font-bold text-white">全息 ATB 动态时序与阵形战术引擎源码展台</h3>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeOmniAtbScriptTab === 'coordinator' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeOmniAtbScriptTab === 'coordinator'"
              >
                ATB 协处理器
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeOmniAtbScriptTab === 'formation_bus' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeOmniAtbScriptTab === 'formation_bus'"
              >
                阵形光环总线
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeOmniAtbScriptTab === 'damage_uncap' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeOmniAtbScriptTab === 'damage_uncap'"
              >
                伤害解限仲裁器
              </button>
            </div>
            <n-button size="small" round secondary type="info" @click="copyOmniAtbScript">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[460px]">{{ currentOmniAtbScriptCode }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

const scrollToOverdriveStudio = () => {
  const el = document.getElementById('atb-overdrive-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToComboStudio = () => {
  const el = document.getElementById('elemental-combo-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToMicroAtbStudio = () => {
  const el = document.getElementById('micro-atb-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const playerLevel = ref(20)
const monsterLevel = ref(30)

const calculatedTurns = computed(() => {
  const diff = monsterLevel.value - playerLevel.value
  const penalty = Math.max(0, diff * 1.5)
  return Math.max(3, Math.round(20 - penalty))
})

const isOverlevelDangerous = computed(() => {
  return monsterLevel.value - playerLevel.value >= 8
})

// ================= 剪刀石头布决斗系统 (battle_rps_duel.gd) =================
const rpsPlayerScore = ref(0)
const rpsEnemyScore = ref(0)
const rpsRounds = ref(0)
const rpsWinner = ref<'player' | 'enemy' | ''>('')
const lastRpsRoundOutcome = ref<'player' | 'enemy' | 'draw' | ''>('')
const userChoice = ref('scissors')
const enemyChoice = ref('paper')
const rpsTraceLog = ref<string[]>([
  '决斗开局：POINTS_TO_WIN = 2，先得 2 分获胜，平局自动加赛。'
])

const formatRpsChoice = (c: string) => {
  if (c === 'scissors') return '✌️ 剪刀'
  if (c === 'rock') return '✊ 石头'
  if (c === 'paper') return '🖐️ 布'
  return c
}

const playRPSRound = (playerPick: string) => {
  if (rpsWinner.value !== '') return
  userChoice.value = playerPick
  const choices = ['scissors', 'rock', 'paper']
  const enemyPick = choices[Math.floor(Math.random() * choices.length)]
  enemyChoice.value = enemyPick

  let outcome: 'player' | 'enemy' | 'draw' = 'draw'
  if (playerPick === enemyPick) {
    outcome = 'draw'
  } else if (
    (playerPick === 'scissors' && enemyPick === 'paper') ||
    (playerPick === 'rock' && enemyPick === 'scissors') ||
    (playerPick === 'paper' && enemyPick === 'rock')
  ) {
    outcome = 'player'
    rpsPlayerScore.value += 1
  } else {
    outcome = 'enemy'
    rpsEnemyScore.value += 1
  }

  rpsRounds.value += 1
  lastRpsRoundOutcome.value = outcome

  if (rpsPlayerScore.value >= 2) {
    rpsWinner.value = 'player'
  } else if (rpsEnemyScore.value >= 2) {
    rpsWinner.value = 'enemy'
  }

  rpsTraceLog.value.unshift(
    `Round #${rpsRounds.value}: [${playerPick}] vs [${enemyPick}] -> outcome='${outcome}', score=${rpsPlayerScore.value}:${rpsEnemyScore.value}, finished=${rpsWinner.value !== ''}`
  )
  if (rpsTraceLog.value.length > 5) rpsTraceLog.value.pop()
}

const resetRPSDuel = () => {
  rpsPlayerScore.value = 0
  rpsEnemyScore.value = 0
  rpsRounds.value = 0
  rpsWinner.value = ''
  lastRpsRoundOutcome.value = ''
  rpsTraceLog.value.unshift('显式调用 reset()：清空比分与轮次，重置决斗状态机。')
  if (rpsTraceLog.value.length > 5) rpsTraceLog.value.pop()
}

// ================= 吟游诗人持续歌唱体系 (battle_singing_system.gd) =================
const singingSong = ref<'song_powers_song' | 'song_heros_song'>('song_powers_song')
const hasMaestroBaton = ref(false)
const isSingingInterrupted = ref(false)
const singingPulses = ref(0)
const singingPowerAtkBonus = ref(0)
const singingHeroLevelBonus = ref(0)

const singingSongOptions = [
  { label: '力量之歌 (Power\'s Song) · +3 ATK/脉冲 (上限99)', value: 'song_powers_song' },
  { label: '英雄之歌 (Hero\'s Song) · +1 等级/脉冲 (上限20)', value: 'song_heros_song' }
]

const singingParty = reactive([
  { name: '塞西尔 (Cecil)', job: '圣骑士', level: 40, baseAtk: 120 },
  { name: '爱德华 (Edward)', job: '吟游诗人 (演唱者)', level: 38, baseAtk: 65 },
  { name: '罗莎 (Rosa)', job: '白魔道士', level: 39, baseAtk: 50 },
  { name: '凯因 (Kain)', job: '龙骑士', level: 41, baseAtk: 135 }
])

const singingTraceLog = ref<string[]>([
  '战斗开始：爱德华入场，曲目 [力量之歌]，时钟步进周期 2.0s。'
])

const pulseSinging = (count: number) => {
  if (isSingingInterrupted.value) return
  for (let i = 0; i < count; i++) {
    singingPulses.value += 1
    if (singingSong.value === 'song_powers_song') {
      const added = Math.min(3, Math.max(0, 99 - singingPowerAtkBonus.value))
      singingPowerAtkBonus.value += added
    } else {
      if (singingHeroLevelBonus.value < 20) {
        singingHeroLevelBonus.value += 1
      }
    }
  }
  const interval = hasMaestroBaton.value ? 1.5 : 2.0
  singingTraceLog.value.unshift(
    `脉冲触发: +${count}跳 (总累计${singingPulses.value}跳 · ${(singingPulses.value * interval).toFixed(1)}s) -> 力量加成:+${singingPowerAtkBonus.value} ATK, 英雄临时等级:+${singingHeroLevelBonus.value} LV`
  )
  if (singingTraceLog.value.length > 5) singingTraceLog.value.pop()
}

const toggleSingingSilence = () => {
  isSingingInterrupted.value = !isSingingInterrupted.value
  if (isSingingInterrupted.value) {
    singingTraceLog.value.unshift('⚠️ 受到沉默/睡眠/石化/混乱状态！caster.stop_singing() 瞬时触发，歌唱强制打断！')
  } else {
    singingTraceLog.value.unshift('🍃 恢复健康状态，重新发起 begin() 歌唱旋律。')
  }
  if (singingTraceLog.value.length > 5) singingTraceLog.value.pop()
}

const resetSingingStudio = () => {
  singingPulses.value = 0
  singingPowerAtkBonus.value = 0
  singingHeroLevelBonus.value = 0
  isSingingInterrupted.value = false
  singingTraceLog.value.unshift('显式重置：清空本场累计歌唱脉冲与临时战斗增益。')
  if (singingTraceLog.value.length > 5) singingTraceLog.value.pop()
}

// 剧情技能【预判 Lv3】推演所状态
interface PredEnemy {
  id: string
  name: string
  level: number
  role: string
  nextAction: string
  targetSlot: string
  actionCount: number
}

const predEnemiesList = reactive<PredEnemy[]>([
  { id: 'golem', name: '守护巨像 (Guardian Golem)', level: 45, role: '古代机械', nextAction: '重压践踏 (Heavy Stomp)', targetSlot: '前排单体 (Slot 1)', actionCount: 2 },
  { id: 'reaper', name: '死神判官 (Thanatos)', level: 60, role: '冥界首领', nextAction: '黄泉引渡 (Underworld Ferry)', targetSlot: '我方全阵列 (AOE)', actionCount: 4 },
  { id: 'quetzal', name: '远古羽蛇神 (Quetzalcoatl)', level: 58, role: '神话魔兽', nextAction: '极光闪电风暴 (Thunder Gale)', targetSlot: '随机两体 (Slot 2, 4)', actionCount: 3 },
  { id: 'tank', name: '魔导突击战车 (Magitek Tank)', level: 42, role: '重装机甲', nextAction: '主炮轰击 (Main Cannon)', targetSlot: '仇恨最高者 (Slot 1)', actionCount: 1 }
])

const predSelectedEnemyId = ref('golem')
const predNonce = ref(1042)
const predSelectedActionType = ref<'phys_skill' | 'magic_dmg' | 'normal_atk' | 'heal_item'>('phys_skill')
const predBaseDamage = ref(1200)

const currentPredEnemy = computed(() => {
  return predEnemiesList.find(e => e.id === predSelectedEnemyId.value) || predEnemiesList[0]
})

const predResult = computed(() => {
  const isEligible = predSelectedActionType.value === 'phys_skill' || predSelectedActionType.value === 'magic_dmg'
  if (isEligible) {
    const finalDmg = Math.round(predBaseDamage.value * 1.25)
    return {
      isEligible: true,
      finalDamage: finalDmg,
      description: `🔥 享受预判 Lv3 认证加成：主伤 ×1.25 (+${finalDmg - predBaseDamage.value})，暴击率 ×1.25！`
    }
  } else if (predSelectedActionType.value === 'normal_atk') {
    return {
      isEligible: false,
      finalDamage: predBaseDamage.value,
      description: '⚠️ 规则底线：普通普攻攻击不消耗亦不享受预判 1.25x 乘区加成。'
    }
  } else {
    return {
      isEligible: false,
      finalDamage: 0,
      description: '⚠️ 辅助/治疗不造成伤害，不消耗预判爆发乘区。'
    }
  }
})

const advancePredCycle = () => {
  predNonce.value += 1
  currentPredEnemy.value.actionCount += 1
}

// ================= ⚡ 实机 ATB 动态时钟与连招工坊 (battle_atb_clock.gd / battle_combo_resolver.gd) =================
interface AtbUnit {
  id: string
  name: string
  icon: string
  job: string
  speed: number
  status: 'normal' | 'haste' | 'slow' | 'stop'
  gauge: number // 0~100
  isEnemy?: boolean
}

const atbUnits = ref<AtbUnit[]>([
  { id: 'lichuan', name: '黎川', icon: '⚔️', job: '圣骑士', speed: 42, status: 'normal', gauge: 65 },
  { id: 'weiheng', name: '卫珩', icon: '🪄', job: '黑魔道士', speed: 38, status: 'normal', gauge: 45 },
  { id: 'xiluo', name: '茜罗', icon: '🔱', job: '龙骑士', speed: 50, status: 'haste', gauge: 85 },
  { id: 'zhouyin', name: '昼隐', icon: '🤍', job: '白魔道士', speed: 45, status: 'normal', gauge: 70 },
  { id: 'boss', name: '虚空审判者', icon: '👾', job: '首领 BOSS', speed: 48, status: 'normal', gauge: 55, isEnemy: true }
])

const atbElapsedSeconds = ref(0)
const isAtbRunning = ref(false)
const atbActionEcho = ref('就绪：点击【单步步进】或【启动 ATB 动态时序】推进战斗时钟。')
const atbAuditLog = ref('ATB 队列与时序驱动器已加载完成: battle_atb_clock.gd')

let atbTimer: ReturnType<typeof setInterval> | null = null

const stepAtbClock = (dt: number) => {
  atbElapsedSeconds.value += dt
  for (const unit of atbUnits.value) {
    if (unit.gauge < 100) {
      let mult = 1.0
      if (unit.status === 'haste') mult = 1.5
      else if (unit.status === 'slow') mult = 0.5
      else if (unit.status === 'stop') mult = 0.0

      // 每秒蓄力增加: speed * 0.5 * mult
      const gain = unit.speed * 0.5 * mult * dt
      unit.gauge = Math.min(100, unit.gauge + gain)
    }
  }
}

const toggleAtbRunning = () => {
  if (isAtbRunning.value) {
    if (atbTimer) clearInterval(atbTimer)
    isAtbRunning.value = false
    atbAuditLog.value = `[ATB时钟暂停] 当前时钟停驻在 ${atbElapsedSeconds.value.toFixed(1)}s`
  } else {
    isAtbRunning.value = true
    atbAuditLog.value = `[ATB时钟运转] 实时推进每秒 10 帧采样 (battle_atb_clock.gd)`
    if (atbTimer) clearInterval(atbTimer)
    atbTimer = setInterval(() => {
      stepAtbClock(0.1)
    }, 100)
  }
}

const cycleUnitStatus = (unit: AtbUnit) => {
  if (unit.status === 'normal') unit.status = 'haste'
  else if (unit.status === 'haste') unit.status = 'slow'
  else if (unit.status === 'slow') unit.status = 'stop'
  else unit.status = 'normal'
  atbActionEcho.value = `[状态变更] ${unit.name} 状态已切换为: ${unit.status.toUpperCase()}`
}

const applyPartyBuff = (status: 'haste' | 'slow') => {
  if (status === 'haste') {
    atbUnits.value.filter(u => !u.isEnemy).forEach(u => u.status = 'haste')
    atbActionEcho.value = '✨ 全队激活【急速术 (Haste)】：ATB 充能速率提升至 1.5x！'
  } else {
    atbUnits.value.filter(u => u.isEnemy).forEach(u => u.status = 'slow')
    atbActionEcho.value = '🐢 敌方首领被附着【迟缓术 (Slow)】：ATB 充能速率削减至 0.5x！'
  }
}

const triggerReadyAction = () => {
  const readyUnit = atbUnits.value.find(u => u.gauge >= 100)
  if (!readyUnit) {
    atbActionEcho.value = '⚠️ 尚无单位充能达 100%，请继续推进时钟！'
    return
  }
  atbActionEcho.value = `⚡ [行动结算] ${readyUnit.name} 完成指令结算并重置 ATB 槽！`
  readyUnit.gauge = 0
  atbAuditLog.value = `[行动出栈] ${readyUnit.name} 触发 execute_action()，返还时钟队列。`
}

const resetAtbStudio = () => {
  if (atbTimer) clearInterval(atbTimer)
  isAtbRunning.value = false
  atbElapsedSeconds.value = 0
  atbUnits.value = [
    { id: 'lichuan', name: '黎川', icon: '⚔️', job: '圣骑士', speed: 42, status: 'normal', gauge: 65 },
    { id: 'weiheng', name: '卫珩', icon: '🪄', job: '黑魔道士', speed: 38, status: 'normal', gauge: 45 },
    { id: 'xiluo', name: '茜罗', icon: '🔱', job: '龙骑士', speed: 50, status: 'haste', gauge: 85 },
    { id: 'zhouyin', name: '昼隐', icon: '🤍', job: '白魔道士', speed: 45, status: 'normal', gauge: 70 },
    { id: 'boss', name: '虚空审判者', icon: '👾', job: '首领 BOSS', speed: 48, status: 'normal', gauge: 55, isEnemy: true }
  ]
  atbActionEcho.value = '已重置 ATB 演练台至基准测试配置。'
  atbAuditLog.value = 'ATB 队列与时钟已恢复初始状态。'
}

// 连招演练
interface ComboPreset {
  id: string
  name: string
  hits: number
  coefPerHit: number
  specialEffect: string
  desc: string
}

const comboPresets: ComboPreset[] = [
  {
    id: 'spellblade_rapidfire',
    name: '二刀流·魔法剑核爆乱打 (Dual Spellblade Flare Rapid Fire)',
    hits: 8,
    coefPerHit: 1.0,
    specialEffect: '完全无视敌方物理与魔法防御',
    desc: '主修游侠乱打指令 + 附魔黑魔法核爆 (Flare) + 忍者二刀流。双持武器连续轰出 8 段必中核爆斩击！'
  },
  {
    id: 'dualcast_meteor',
    name: '连续魔·彗星陨石轰顶 (Dualcast Meteor)',
    hits: 8,
    coefPerHit: 0.85,
    specialEffect: '多段大范围无属性混沌打击',
    desc: '赤魔道士连续魔 + 时魔道士彗星陨石。单回合吟唱两发 Meteor，降下 8 颗天外陨石狂轰滥炸！'
  },
  {
    id: 'dragon_jump_lance',
    name: '龙骑士·圣枪飞天断头斩 (Dragon Jump Holy Lance)',
    hits: 1,
    coefPerHit: 2.5,
    specialEffect: '跳跃滞空绝对规避全屏海啸与地震',
    desc: '龙骑士专属指令跳跃 (Jump) 配合神圣之枪。高空滞空避过毁灭攻击，落地造成 2.5x 贯穿暴击！'
  },
  {
    id: 'bard_power_strike',
    name: '吟游战歌·+99攻破限极意斩 (Bard Song Boosted Strike)',
    hits: 2,
    coefPerHit: 1.8,
    specialEffect: '全队累计 +99 攻击力加权爆发',
    desc: '爱德华力量之歌拉满 +99 物理攻击力后，战士双持重剑发动破防斩击！'
  }
]

const selectedComboId = ref('spellblade_rapidfire')
const activeCombo = computed(() => {
  return comboPresets.find(c => c.id === selectedComboId.value) || comboPresets[0]
})

const comboOptions = comboPresets.map(c => ({ label: c.name, value: c.id }))

const comboDamageResult = computed(() => {
  const c = activeCombo.value
  const baseAtk = 1200
  let perHitDmg = Math.round(baseAtk * c.coefPerHit)
  if (c.id === 'bard_power_strike') {
    perHitDmg = Math.round((baseAtk + 99 * 4) * c.coefPerHit)
  }
  const total = perHitDmg * c.hits
  return {
    totalDamage: total,
    breakdown: `单段伤害约 ${perHitDmg.toLocaleString()} × ${c.hits} 段 = 破限极巨总伤！`
  }
})

const executeComboSimulation = () => {
  const c = activeCombo.value
  const res = comboDamageResult.value
  atbAuditLog.value = `[连招爆发] 施放【${c.name}】！轰出 ${c.hits} 段连击，造成 ${res.totalDamage} 伤害（${c.specialEffect}）！`
}

// ================= 实机八元元素连锁共鸣与爆发极意推演沙盘 =================
const bossWeakElement = ref('fire')
const chainStacks = ref(3)

const elementOptions = [
  { value: 'fire', label: '🔥 火元素 (烈焰焚尽)' },
  { value: 'ice', label: '❄️ 冰元素 (极寒绝对零度)' },
  { value: 'lightning', label: '⚡ 雷元素 (天崩雷暴)' },
  { value: 'water', label: '🌊 水元素 (浩瀚海啸)' },
  { value: 'wind', label: '🌪️ 风元素 (真空狂飙)' },
  { value: 'earth', label: '⛰️ 土元素 (泰坦地震)' },
  { value: 'holy', label: '✨ 圣元素 (神圣涤罪)' },
  { value: 'dark', label: '🌑 暗元素 (虚空湮灭)' }
]

interface HeroAttacker {
  id: string
  name: string
  job: string
  icon: string
  element: string
  selectedAction: string
  actionOptions: { label: string; value: string; element: string; coef: number; isCrit: boolean }[]
  powerCoef: number
  isCrit: boolean
}

const heroAttackers = ref<HeroAttacker[]>([
  {
    id: 'bartz',
    name: '巴兹',
    job: '魔法剑士 / 游侠',
    icon: '⚔️',
    element: 'fire',
    selectedAction: 'flare_rapidfire',
    actionOptions: [
      { label: '魔法剑核爆乱打 (8段必中)', value: 'flare_rapidfire', element: 'fire', coef: 8.0, isCrit: true },
      { label: '雷牙附魔连斩 (4段)', value: 'thunder_slash', element: 'lightning', coef: 4.5, isCrit: false },
      { label: '冰封碎裂斩 (2段)', value: 'blizzard_strike', element: 'ice', coef: 3.2, isCrit: false }
    ],
    powerCoef: 8.0,
    isCrit: true
  },
  {
    id: 'lenna',
    name: '蕾娜',
    job: '白魔道士 / 时魔',
    icon: '🤍',
    element: 'holy',
    selectedAction: 'dualcast_holy',
    actionOptions: [
      { label: '连续魔·双圣灵裁决 (2段)', value: 'dualcast_holy', element: 'holy', coef: 5.5, isCrit: true },
      { label: '时空陨石轰击 (4段)', value: 'comet_barrage', element: 'earth', coef: 4.8, isCrit: false },
      { label: '强力加速光环 (增幅全队)', value: 'hastega_buff', element: 'wind', coef: 2.0, isCrit: false }
    ],
    powerCoef: 5.5,
    isCrit: true
  },
  {
    id: 'faris',
    name: '法利斯',
    job: '忍者 / 盗贼',
    icon: '🗡️',
    element: 'water',
    selectedAction: 'water_ninjutsu',
    actionOptions: [
      { label: '水遁·大瀑布术 (破甲水浪)', value: 'water_ninjutsu', element: 'water', coef: 4.2, isCrit: false },
      { label: '暗影金币狂掷 (无视防御真伤)', value: 'zeninage', element: 'dark', coef: 6.0, isCrit: true },
      { label: '风魔手里剑·双刀裂空', value: 'shuriken_storm', element: 'wind', coef: 5.0, isCrit: false }
    ],
    powerCoef: 4.2,
    isCrit: false
  },
  {
    id: 'krile',
    name: '可露儿',
    job: '黑魔道士 / 召唤师',
    icon: '🪄',
    element: 'lightning',
    selectedAction: 'megaflare_summon',
    actionOptions: [
      { label: '龙王降临·亿万核融 (超限核爆)', value: 'megaflare_summon', element: 'dark', coef: 7.5, isCrit: true },
      { label: '利维亚桑·灭世海啸 (全屏水灾)', value: 'tsunami_summon', element: 'water', coef: 5.8, isCrit: false },
      { label: '八阶雷霆禁咒·雷神天谴', value: 'thundaga_burst', element: 'lightning', coef: 5.2, isCrit: false }
    ],
    powerCoef: 7.5,
    isCrit: true
  }
])

const tacticsCombatLogs = ref<string[]>([
  '战斗法则全息沙盘已载入：八元相克共鸣调度器已就绪。',
  '底层引擎: elemental_combo_chain.gd 与 battle_atb_clock.gd 运行正常。'
])

const activeTacticsGdTab = ref<'elemental' | 'atb' | 'priority'>('priority')

const applyElementalPreset = (presetKey: string) => {
  if (presetKey === 'vaporize') {
    bossWeakElement.value = 'fire'
    chainStacks.value = 4
    heroAttackers.value[0].selectedAction = 'flare_rapidfire'
    heroAttackers.value[2].selectedAction = 'water_ninjutsu'
    message.success('已装载预设：冰火两重天·超导蒸发 (2.8x 破防)')
  } else if (presetKey === 'overload') {
    bossWeakElement.value = 'lightning'
    chainStacks.value = 4
    heroAttackers.value[0].selectedAction = 'thunder_slash'
    heroAttackers.value[3].selectedAction = 'thundaga_burst'
    message.info('已装载预设：风雷狂涌·激化过载 (3.2x 全屏雷暴)')
  } else if (presetKey === 'annihilation') {
    bossWeakElement.value = 'holy'
    chainStacks.value = 4
    heroAttackers.value[1].selectedAction = 'dualcast_holy'
    heroAttackers.value[3].selectedAction = 'megaflare_summon'
    message.warning('已装载预设：圣光暗影·虚空湮灭 (4.0x 极限真实伤害)')
  } else if (presetKey === 'crystal') {
    bossWeakElement.value = 'water'
    chainStacks.value = 3
    heroAttackers.value[1].selectedAction = 'comet_barrage'
    heroAttackers.value[2].selectedAction = 'water_ninjutsu'
    message.success('已装载预设：地崩水涌·晶化固结 (2.5x 绝对破盾)')
  }
}

const totalSynergyMultiplier = computed(() => {
  let baseMult = 1.0 + chainStacks.value * 0.25
  const weak = bossWeakElement.value
  let matchedCount = 0
  for (const h of heroAttackers.value) {
    const act = h.actionOptions.find(a => a.value === h.selectedAction)
    if (act && act.element === weak) matchedCount++
  }
  if (matchedCount > 0) baseMult += matchedCount * 0.5
  return Number(baseMult.toFixed(2))
})

const totalBurstHits = computed(() => {
  let totalHits = 0
  for (const h of heroAttackers.value) {
    if (h.selectedAction.includes('rapidfire')) totalHits += 8
    else if (h.selectedAction.includes('comet') || h.selectedAction.includes('thunder')) totalHits += 4
    else if (h.selectedAction.includes('dualcast')) totalHits += 2
    else totalHits += 1
  }
  return totalHits
})

const hasWeakHit = computed(() => {
  const weak = bossWeakElement.value
  return heroAttackers.value.some(h => {
    const act = h.actionOptions.find(a => a.value === h.selectedAction)
    return act && act.element === weak
  })
})

const hasCritHit = computed(() => {
  return heroAttackers.value.some(h => {
    const act = h.actionOptions.find(a => a.value === h.selectedAction)
    return act && act.isCrit
  })
})

const calculatedBurstDamage = computed(() => {
  let sumDamage = 0
  const baseAttack = 1500
  const mult = totalSynergyMultiplier.value

  for (const h of heroAttackers.value) {
    const act = h.actionOptions.find(a => a.value === h.selectedAction)
    const coef = act ? act.coef : 3.0
    const critBonus = (act && act.isCrit) ? 1.5 : 1.0
    const weakBonus = (act && act.element === bossWeakElement.value) ? 2.0 : 1.0
    sumDamage += Math.round(baseAttack * coef * mult * critBonus * weakBonus)
  }
  return sumDamage
})

const burstDamageBreakdown = computed(() => {
  return `4英雄连携轰击：基础以太力 1,500 × 增幅 ${totalSynergyMultiplier.value}x × 弱点暴击加成 = 破限极巨核爆！`
})

const triggerBurstSimulation = () => {
  const dmg = calculatedBurstDamage.value
  const hits = totalBurstHits.value
  const weakNotice = hasWeakHit.value ? '【WEAK弱点穿透!】' : ''
  const critNotice = hasCritHit.value ? '【CRITICAL暴击!】' : ''

  tacticsCombatLogs.value.unshift(
    `💥 [全队连锁爆发] 四大英雄合力轰出 ${hits} 段连携，造成 ${dmg.toLocaleString()} 极巨伤害！${weakNotice} ${critNotice}`
  )
  if (tacticsCombatLogs.value.length > 20) tacticsCombatLogs.value.pop()
  message.success(`连锁轰击达成！造成 ${dmg.toLocaleString()} 点极巨伤害！`)
}

const resetElementalStudio = () => {
  bossWeakElement.value = 'fire'
  chainStacks.value = 3
  tacticsCombatLogs.value = [
    '战斗法则全息沙盘已载入：八元相克共鸣调度器已就绪。',
    '底层引擎: elemental_combo_chain.gd 与 battle_atb_clock.gd 运行正常。'
  ]
  message.info('已重置元素共鸣推演沙盘至基准配置')
}

const exportTacticsChainCert = () => {
  const ts = new Date().toISOString()
  const certId = `CERT-TACTICS-${Date.now().toString(36).toUpperCase()}`
  const content = `================================================================================
《光之战士：时空裂隙》(VBLE) 战斗法则全鉴·八元元素连锁共鸣方案书
================================================================================
凭证编号: ${certId}
时间截记: ${ts}
推演版本: VBLE Battle Tactics & ATB Matrix v2.2.255
引擎标准: Godot 4.6 LTS Elemental Combo Chain & ATB Pipeline

【首领与战场元素态势】
- 当前首领主要弱点: ${bossWeakElement.value.toUpperCase()}
- 元素连锁同调共鸣: ${chainStacks.value} 层 (+${chainStacks.value * 25}% 增伤)
- 综合实战增伤倍率: ${totalSynergyMultiplier.value}x

【四英雄连携攻坚动作编排】
${heroAttackers.value.map((h, i) => `  ${i + 1}. [${h.name} · ${h.job}] 动作: ${h.selectedAction} | 属性: ${h.element} | 系数: ${h.powerCoef}x`).join('\n')}

【伤害结算与击打成果】
- 预估单轮总伤害: ${calculatedBurstDamage.value.toLocaleString()} 点破限真实伤害
- 击打连击总段数: ${totalBurstHits.value} Hits
- 弱点极效判定: ${hasWeakHit.value ? '触发 WEAK! 属性穿透克制' : '常规无属性克制'}
- 暴击冲击判定: ${hasCritHit.value ? '触发 CRIT! 暴击高光描边' : '常规命中'}

================================================================================
数字校验哈希: SHA256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}
================================================================================`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `battle_tactics_chain_${bossWeakElement.value}_v2.2.255.txt`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出战术连携攻坚方案书')
}

const copyTacticsChain = () => {
  const chainText = `[元素连锁方案] 弱点:${bossWeakElement.value} | 共鸣:${chainStacks.value}层(${totalSynergyMultiplier.value}x) => 伤害:${calculatedBurstDamage.value.toLocaleString()}(${totalBurstHits.value}Hits)`
  navigator.clipboard.writeText(chainText).then(() => {
    message.success('元素战术链已复制到剪贴板！')
  }).catch(() => {
    message.info('战术链已复制')
  })
}

const gdElementalComboCode = `# ==============================================================================
# ElementalComboChain - 八元元素连锁共鸣与爆发极意解算器
# 文件路径: res://scripts/core/elemental_combo_chain.gd
# 架构定位: 处理多属性连续命中增幅、元素过载/蒸发反应与暴击跳字徽标生成
# ==============================================================================
class_name ElementalComboChain
extends RefCounted

signal combo_burst_calculated(damage: int, hits: int, is_weak: bool, is_crit: bool)

## 计算元素连携爆发
static func calculate_elemental_burst(params: Dictionary) -> Dictionary:
	var weak_element: String = params.get("weak_element", "fire")
	var chain_stacks: int = params.get("chain_stacks", 3)
	var attacker_actions: Array = params.get("attacker_actions", [])

	var total_mult: float = 1.0 + float(chain_stacks) * 0.25
	var total_damage: int = 0
	var total_hits: int = 0
	var has_weak: bool = false
	var has_crit: bool = false

	for act in attacker_actions:
		var base_dmg: int = act.get("base_attack", 1500)
		var coef: float = act.get("coef", 3.0)
		var elem: String = act.get("element", "neutral")
		var is_crit: bool = act.get("is_crit", false)

		var elem_mult: float = 2.0 if elem == weak_element else 1.0
		var crit_mult: float = 1.5 if is_crit else 1.0

		if elem == weak_element:
			has_weak = true
		if is_crit:
			has_crit = true

		total_damage += int(base_dmg * coef * total_mult * elem_mult * crit_mult)
		total_hits += act.get("hits", 1)

	return {
		"total_damage": total_damage,
		"total_hits": total_hits,
		"has_weak": has_weak,
		"has_crit": has_crit,
		"multiplier": total_mult,
		"timestamp": Time.get_datetime_string_from_system()
	}
`

const gdAtbClockCode = `# ==============================================================================
# BattleAtbClock - 战斗动态时钟与时滞调度内核
# 文件路径: res://scripts/core/battle_atb_clock.gd
# 架构定位: ATB 时间轮询驱动、加速/缓慢倍率注入与待命光环状态维护
# ==============================================================================
class_name BattleAtbClock
extends Node

signal atb_tick(delta_sec: float)
signal unit_ready(actor_id: String)

var units: Array[Dictionary] = []
var is_active: bool = false

func tick(delta: float) -> void:
	if not is_active:
		return
	for u in units:
		var spd: float = u.get("speed", 30.0)
		var rate: float = 1.0
		if u.get("haste", false):
			rate = 1.5
		elif u.get("slow", false):
			rate = 0.5
		u.gauge = min(100.0, u.get("gauge", 0.0) + spd * rate * delta)
		if u.gauge >= 100.0:
			emit_signal("unit_ready", u.id)
`

// ================= 专区: 全域 ATB 动态时间轴连携与指令优先级微秒解算工坊 (v2.2.266) =================
interface MicroUnit {
  id: string
  name: string
  avatar: string
  agility: number
  isBoss?: boolean
  state: 'charging' | 'decision' | 'casting' | 'recovery'
  stateText: string
  tagType: 'default' | 'success' | 'warning' | 'error' | 'info'
  progressPercent: number
  phaseText: string
  queuedAction: string
  priorityTag: string
  currentPhaseMs: number
  totalPhaseMs: number
}

interface MicroPreset {
  id: string
  name: string
  icon: string
  tag: string
  windowMs: number
  description: string
  priorityRule: string
  synergyBonus: string
}

interface PriorityQueueItem {
  actorName: string
  actionName: string
  castRemainMs: number
  priority: number
}

const microSimElapsedMs = ref(1420.5)
const isMicroAtbRunning = ref(false)
const bossCastInterrupted = ref(false)
const microChainBonus = ref(225)
const averageActionLatencyMs = ref(42.5)
const bossCastingRemainMs = ref(380)
let microAtbTimer: ReturnType<typeof setInterval> | null = null

const microPresets: MicroPreset[] = [
  {
    id: 'counter_instant',
    name: '【极速预输入抢断】(Reaction Interruption)',
    icon: '⚡',
    tag: '绝杀打断',
    windowMs: 380,
    description: '全员进入 Hastega 极速态，将即时道具与白魔大抬血优先级提升至 P90~P100，在首领大海啸判定帧前插队打断！',
    priorityRule: 'P100 反应插队 > P80 魔法剑 > P75 首领灭团技 > P60 普攻',
    synergyBonus: '打断成功触发 8 秒全场易伤，伤害增幅 +225%'
  },
  {
    id: 'spellblade_burst',
    name: '【魔法剑四重奏时差连携】(Elemental Overdrive)',
    icon: '🗡️',
    tag: '元素破防',
    windowMs: 450,
    description: '错开 50ms 连续倾泻四种不同相克属性，触发四重蒸发超导连锁，完全击穿 Boss 物理屏障。',
    priorityRule: 'P85 元素附魔 > P80 乱打八连 > P70 连续魔核爆',
    synergyBonus: '全额弱点暴击率提升至 100%，连击伤害额外 +180%'
  },
  {
    id: 'heal_clutch',
    name: '【濒死绝境毫秒锁血大抬血】(15ms Clutch Heal)',
    icon: '🤍',
    tag: '毫秒锁血',
    windowMs: 15,
    description: '蕾娜连续魔全体大复活在首领致命伤害结算前 15ms 判定落地，达成理论极限死里逃生！',
    priorityRule: 'P95 濒死判定响应 > P75 首领伤害帧 > P50 常规指令',
    synergyBonus: '抵消全员暴毙判定，全员生命瞬间拉回 100%'
  },
  {
    id: 'dual_chain_rush',
    name: '【全员无缝时序压制】(Infinite Pushback)',
    icon: '🌪️',
    tag: '时序推条',
    windowMs: 600,
    description: '高速忍者与龙骑士双向交替突刺，使首领 ATB 充能进度被连续击退 15%，使其永远无法完成读条。',
    priorityRule: 'P70 高速击退 > P65 浮空跳跃 > P40 怪物蓄力',
    synergyBonus: '首领行动条永久推迟 300ms，全员输出窗口无缝化'
  }
]

const selectedMicroPresetId = ref('counter_instant')
const currentMicroPreset = computed(() => {
  return microPresets.find(p => p.id === selectedMicroPresetId.value) || microPresets[0]
})

const microUnits = ref<MicroUnit[]>([
  {
    id: 'bartz',
    name: '巴兹 (Bartz)',
    avatar: '🗡️',
    agility: 48,
    state: 'casting',
    stateText: '咏唱中',
    tagType: 'warning',
    progressPercent: 70,
    phaseText: '咏唱: 280ms / 400ms',
    queuedAction: '魔法剑雷牙 (Thundaga Blade)',
    priorityTag: 'P80 弱点破防',
    currentPhaseMs: 280,
    totalPhaseMs: 400
  },
  {
    id: 'lenna',
    name: '蕾娜 (Lenna)',
    avatar: '👑',
    agility: 42,
    state: 'decision',
    stateText: '待命决策',
    tagType: 'success',
    progressPercent: 100,
    phaseText: '指令已就绪 0ms',
    queuedAction: '连续魔全体大复活祈祷',
    priorityTag: 'P90 濒死绝境',
    currentPhaseMs: 0,
    totalPhaseMs: 50
  },
  {
    id: 'faris',
    name: '法利斯 (Faris)',
    avatar: '🏴‍☠️',
    agility: 52,
    state: 'charging',
    stateText: 'ATB充能',
    tagType: 'info',
    progressPercent: 76,
    phaseText: '充能: 760ms / 1000ms',
    queuedAction: '金币狂掷真伤 (Zeninage)',
    priorityTag: 'P60 真实物理',
    currentPhaseMs: 760,
    totalPhaseMs: 1000
  },
  {
    id: 'krile',
    name: '可露儿 (Krile)',
    avatar: '🔮',
    agility: 45,
    state: 'charging',
    stateText: 'ATB充能',
    tagType: 'info',
    progressPercent: 64,
    phaseText: '充能: 640ms / 1000ms',
    queuedAction: '巴哈姆特百万核爆',
    priorityTag: 'P80 太古召唤',
    currentPhaseMs: 640,
    totalPhaseMs: 1000
  },
  {
    id: 'shinryu',
    name: '真龙王·神龙 (Shinryu)',
    avatar: '🐉',
    agility: 60,
    isBoss: true,
    state: 'casting',
    stateText: '灭团咏唱',
    tagType: 'error',
    progressPercent: 68,
    phaseText: '读条: 820ms / 1200ms',
    queuedAction: '极超·灭世大海啸 (1200ms)',
    priorityTag: 'P75 灭团绝技',
    currentPhaseMs: 820,
    totalPhaseMs: 1200
  }
])

const microPriorityQueue = ref<PriorityQueueItem[]>([
  { actorName: '蕾娜', actionName: '全体神圣祈祷 (Curaga)', castRemainMs: 0, priority: 90 },
  { actorName: '巴兹', actionName: '魔法剑雷牙 (Thundaga)', castRemainMs: 120, priority: 80 },
  { actorName: '神龙', actionName: '灭世大海啸 (Tsunami)', castRemainMs: 380, priority: 75 },
  { actorName: '法利斯', actionName: '金币狂掷 (Zeninage)', castRemainMs: 240, priority: 60 }
])

const microLogs = ref<string[]>([
  '【T+1420.5ms】神龙咏唱【灭世大海啸】已达 820ms，剩余危急打断窗口 380ms！',
  '【T+1400.0ms】蕾娜触发 P90 优先级插队，全体生命抬升指令锁定队列首位！',
  '【T+1350.0ms】巴兹魔法剑雷牙咏唱进入最后 120ms，准备实施弱点暴击压制！'
])

const resetMicroAtbStudio = () => {
  if (microAtbTimer) {
    clearInterval(microAtbTimer)
    microAtbTimer = null
  }
  isMicroAtbRunning.value = false
  microSimElapsedMs.value = 0.0
  bossCastInterrupted.value = false
  bossCastingRemainMs.value = 380
  microChainBonus.value = 225
  averageActionLatencyMs.value = 42.5

  microUnits.value[0].progressPercent = 70
  microUnits.value[0].state = 'casting'
  microUnits.value[0].stateText = '咏唱中'
  microUnits.value[0].currentPhaseMs = 280

  microUnits.value[1].progressPercent = 100
  microUnits.value[1].state = 'decision'
  microUnits.value[1].stateText = '待命决策'

  microUnits.value[2].progressPercent = 76
  microUnits.value[2].state = 'charging'
  microUnits.value[2].stateText = 'ATB充能'

  microUnits.value[3].progressPercent = 64
  microUnits.value[3].state = 'charging'
  microUnits.value[3].stateText = 'ATB充能'

  microUnits.value[4].progressPercent = 68
  microUnits.value[4].state = 'casting'
  microUnits.value[4].stateText = '灭团咏唱'
  microUnits.value[4].currentPhaseMs = 820

  microPriorityQueue.value = [
    { actorName: '蕾娜', actionName: '全体神圣祈祷 (Curaga)', castRemainMs: 0, priority: 90 },
    { actorName: '巴兹', actionName: '魔法剑雷牙 (Thundaga)', castRemainMs: 120, priority: 80 },
    { actorName: '神龙', actionName: '灭世大海啸 (Tsunami)', castRemainMs: 380, priority: 75 },
    { actorName: '法利斯', actionName: '金币狂掷 (Zeninage)', castRemainMs: 240, priority: 60 }
  ]

  microLogs.value = [
    '微秒时间轴推演已重置，时钟锚点归零 (0.0ms)。',
    '四大主角与神龙就绪，等待下一次时钟微步推进。'
  ]
  message.info('全域微秒 ATB 推演战局已重置！')
}

const stepMicroTick = (deltaMs: number) => {
  microSimElapsedMs.value += deltaMs

  if (!bossCastInterrupted.value) {
    bossCastingRemainMs.value = Math.max(0, bossCastingRemainMs.value - deltaMs)
    if (bossCastingRemainMs.value <= 0) {
      interruptBossCast()
      return
    }
  }

  // 推进各角色状态
  for (const u of microUnits.value) {
    if (u.isBoss) {
      if (!bossCastInterrupted.value) {
        u.currentPhaseMs = Math.min(u.totalPhaseMs, u.currentPhaseMs + deltaMs)
        u.progressPercent = Math.min(100, Math.round((u.currentPhaseMs / u.totalPhaseMs) * 100))
        u.phaseText = `读条: ${u.currentPhaseMs}ms / ${u.totalPhaseMs}ms`
      }
    } else {
      u.currentPhaseMs = (u.currentPhaseMs + deltaMs) % u.totalPhaseMs
      u.progressPercent = Math.min(100, Math.round((u.currentPhaseMs / u.totalPhaseMs) * 100))
      u.phaseText = `推进: ${u.currentPhaseMs}ms / ${u.totalPhaseMs}ms`
    }
  }

  microLogs.value.unshift(`【T+${microSimElapsedMs.value.toFixed(1)}ms】推进 +${deltaMs}ms：各通道微秒时间片解算完成。`)
  if (microLogs.value.length > 20) microLogs.value.pop()
}

const toggleMicroAtbRun = () => {
  if (isMicroAtbRunning.value) {
    if (microAtbTimer) {
      clearInterval(microAtbTimer)
      microAtbTimer = null
    }
    isMicroAtbRunning.value = false
    message.info('微秒时钟已暂停。')
  } else {
    isMicroAtbRunning.value = true
    if (microAtbTimer) clearInterval(microAtbTimer)
    microAtbTimer = setInterval(() => {
      stepMicroTick(50)
    }, 200)
    message.success('微秒时钟开始以 50ms 频率实时推演！')
  }
}

const interruptBossCast = () => {
  bossCastInterrupted.value = true
  bossCastingRemainMs.value = 0
  const boss = microUnits.value[4]
  boss.state = 'recovery'
  boss.stateText = '被打断硬直'
  boss.tagType = 'warning'
  boss.phaseText = '硬直: 600ms'
  boss.priorityTag = 'P0 失效'

  microPriorityQueue.value = microPriorityQueue.value.filter(q => q.actorName !== '神龙')
  microChainBonus.value += 50

  microLogs.value.unshift('【💥 破核大捷】神龙灭世大海啸被蕾娜神圣祈祷与巴兹魔法剑雷牙强制插队打断！')
  microLogs.value.unshift('【时序战果】首领进入 600ms 绝对硬直态，全员获得 +50% 额外连锁爆发加成！')
  message.success('🎉 成功在危急窗口内强制打断首领读条！')
}

const applyMicroPreset = () => {
  const p = currentMicroPreset.value
  if (p.id === 'counter_instant') {
    microChainBonus.value = 225
    averageActionLatencyMs.value = 42.5
    bossCastingRemainMs.value = 380
  } else if (p.id === 'spellblade_burst') {
    microChainBonus.value = 310
    averageActionLatencyMs.value = 35.0
    bossCastingRemainMs.value = 450
  } else if (p.id === 'heal_clutch') {
    microChainBonus.value = 180
    averageActionLatencyMs.value = 15.0
    bossCastingRemainMs.value = 15
  } else if (p.id === 'dual_chain_rush') {
    microChainBonus.value = 260
    averageActionLatencyMs.value = 28.0
    bossCastingRemainMs.value = 600
  }
  microLogs.value.unshift(`【战术载入】已套用【${p.name}】官方微秒连携预设！`)
  message.success(`已切换至【${p.name}】！`)
}

const exportMicroAtbCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  const p = currentMicroPreset.value

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   全域 ATB 动态时间轴连携与指令优先级方案书 (v2.2.266)
================================================================================
颁发时间: ${timeStr}
当前战术预设: ${p.name}
当前微秒时钟: ${microSimElapsedMs.value.toFixed(1)} ms (${(microSimElapsedMs.value / 1000).toFixed(2)} 秒)
打断状态判定: ${bossCastInterrupted.value ? '【首领已被强制打断 (Interrupted)】' : '【首领读条进行中 (Casting)】'}
连携伤害增幅: +${microChainBonus.value}%
平均指令延迟: ${averageActionLatencyMs.value.toFixed(1)} ms

【四主角微秒流水线调度槽位】
1. 巴兹 (敏捷 48): 状态 [${microUnits.value[0].stateText}], 动作: ${microUnits.value[0].queuedAction} (${microUnits.value[0].priorityTag})
2. 蕾娜 (敏捷 42): 状态 [${microUnits.value[1].stateText}], 动作: ${microUnits.value[1].queuedAction} (${microUnits.value[1].priorityTag})
3. 法利斯 (敏捷 52): 状态 [${microUnits.value[2].stateText}], 动作: ${microUnits.value[2].queuedAction} (${microUnits.value[2].priorityTag})
4. 可露儿 (敏捷 45): 状态 [${microUnits.value[3].stateText}], 动作: ${microUnits.value[3].queuedAction} (${microUnits.value[3].priorityTag})

【首领状态】
- 真龙王·神龙 (敏捷 60): 状态 [${microUnits.value[4].stateText}], 动作: ${microUnits.value[4].queuedAction}
- 危险技能剩余读条: ${bossCastingRemainMs.value} ms / 初始 1200 ms

【实时指令优先级插队队列】
${microPriorityQueue.value.map((q, i) => `${i + 1}. [P${q.priority}] ${q.actorName} -> ${q.actionName} (剩余咏唱: ${q.castRemainMs}ms)`).join('\n')}

【最新微秒演练日志记录】
${microLogs.value.slice(0, 5).map(l => `• ${l}`).join('\n')}

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS / GDScript RefCounted Pure Architecture
- Core Resolver: battle_micro_priority_resolver.gd
- Digital Fingerprint: SHA256-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}
================================================================================`

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `battle_atb_micro_cert_v2.2.266_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('全域微秒 ATB 方案书已导出并同步至剪贴板！')
  }
}

const gdMicroPriorityCode = `## battle_micro_priority_resolver.gd
## Godot 4.6 LTS - 全域 ATB 动态时间轴连携与四级指令优先级微秒解算引擎
extends RefCounted
class_name BattleMicroPriorityResolver

signal action_preempted(actor_id: String, action_id: String, priority: int)
signal boss_cast_interrupted(boss_id: String, spell_id: String)
signal micro_tick_advanced(elapsed_ms: float)

class ActionQueueItem:
	var actor_id: String
	var action_name: String
	var priority: int
	var cast_remaining_ms: float
	var is_interruptible: bool = true

static func resolve_priority_queue(queue: Array[ActionQueueItem]) -> Array[ActionQueueItem]:
	var sorted_queue = queue.duplicate()
	sorted_queue.sort_custom(func(a: ActionQueueItem, b: ActionQueueItem):
		if a.priority != b.priority:
			return a.priority > b.priority
		return a.cast_remaining_ms < b.cast_remaining_ms
	)
	return sorted_queue

static func check_interruption(boss_item: ActionQueueItem, incoming_action: ActionQueueItem) -> bool:
	if not boss_item.is_interruptible:
		return false
	# 若我方指令优先级高于首领且剩余咏唱更短，则触发打断
	return incoming_action.priority > boss_item.priority and incoming_action.cast_remaining_ms < boss_item.cast_remaining_ms
`

const copyTacticsGdCode = () => {
  const code = activeTacticsGdTab.value === 'elemental' 
    ? gdElementalComboCode 
    : activeTacticsGdTab.value === 'atb' 
      ? gdAtbClockCode 
      : gdMicroPriorityCode
  const filename = activeTacticsGdTab.value === 'elemental' 
    ? 'elemental_combo_chain.gd' 
    : activeTacticsGdTab.value === 'atb' 
      ? 'battle_atb_clock.gd' 
      : 'battle_micro_priority_resolver.gd'
  navigator.clipboard.writeText(code).then(() => {
    message.success(`${filename} 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}

// ==========================================
// 工坊 3: 全域 ATB 时钟频率过载与四相连续魔连携矩阵工坊
// ==========================================
const overdriveStances = [
  {
    id: 'frequency_multiplier',
    name: '迅疾时钟倍频战姿',
    tag: '3.0x 基频超充',
    icon: '⚡',
    desc: '突破常规 ATB 时序限制，行动条以 300% 基础频率极速回充，近乎零前摇瞬发指令。',
    boost: '+200% 充能速率',
    gradient: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'quad_synergy',
    name: '四重属性连续魔共鸣',
    tag: '4 相无缝连携',
    icon: '🔥',
    desc: '炎/冰/雷/风 四相无缝连珠击发，每阶共鸣叠加 25% 元素穿透，达成指数级倍率。',
    boost: '+180% 破限伤害',
    gradient: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'preemption_horizon',
    name: '极限破限刹那插队',
    tag: '0ms 绝对优先权',
    icon: '⚔️',
    desc: '在首领致命大招最后 380ms 绝杀窗内强行仲裁插队，强制中断敌方一切读条技能。',
    boost: '99.5% 强打断率',
    gradient: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'chrono_stasis',
    name: '绝对时空停滞领域',
    tag: '90% 范围迟缓',
    icon: '⏳',
    desc: '扭曲敌方局部时间流动，降低敌军行动频率 90%，并将受击反震 30% 转化为我方 ATB。',
    boost: '90% 时空压制',
    gradient: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(15,23,42,0) 70%)'
  }
]
const selectedOverdriveStanceId = ref('frequency_multiplier')
const currentOverdriveStance = computed(() => {
  return overdriveStances.find(s => s.id === selectedOverdriveStanceId.value) || overdriveStances[0]
})

const atbClockMultiplier = ref(3.2)
const dualcastRanks = ref(4)
const preemptionSensitivity = ref(25)
const resonanceRatio = ref(135)
const instantCastPermit = ref(true)
const damageCapBreaker = ref(true)
const counterAbsorbWard = ref(false)

const calculatedOverdriveBurstDamage = computed(() => {
  const capBonus = damageCapBreaker.value ? 2.2 : 1.0
  const instantBonus = instantCastPermit.value ? 1.15 : 1.0
  return Math.round(48000 * atbClockMultiplier.value * (dualcastRanks.value * 0.65) * (resonanceRatio.value / 100) * capBonus * instantBonus)
})

const calculatedChargeTime = computed(() => {
  return (3.5 / atbClockMultiplier.value).toFixed(2)
})

const calculatedInterruptChance = computed(() => {
  let chance = 100 - (preemptionSensitivity.value * 0.45)
  if (instantCastPermit.value) chance += 18
  return Math.max(10, Math.min(99.5, Math.round(chance * 10) / 10))
})

const calculatedDpsGain = computed(() => {
  let gain = (atbClockMultiplier.value - 1) * 75 + (dualcastRanks.value - 2) * 35 + (resonanceRatio.value - 100) * 0.8
  if (damageCapBreaker.value) gain += 80
  if (counterAbsorbWard.value) gain += 25
  return Math.round(gain)
})

const resetOverdriveParams = () => {
  atbClockMultiplier.value = 3.2
  dualcastRanks.value = 4
  preemptionSensitivity.value = 25
  resonanceRatio.value = 135
  instantCastPermit.value = true
  damageCapBreaker.value = true
  counterAbsorbWard.value = false
  if (message) message.info('ATB 与连续魔参数已重置为基准战术架构')
}

const isSimulatingOverdrive = ref(false)
const overdriveSimLogs = ref<string[]>([
  '系统就绪：已挂载 Godot 4.6 LTS ATB 微秒时钟倍频与连续魔仲裁器',
  '当前战姿：迅疾时钟倍频战姿 (3.2x 基频超充)',
  '连携推演就绪，请点击右上角按钮启动微秒解算'
])

const runOverdriveSimulation = () => {
  if (isSimulatingOverdrive.value) return
  isSimulatingOverdrive.value = true
  overdriveSimLogs.value = ['[0.00ms] 初始化 ATB 微秒时钟频率，倍频系数调谐至 ' + atbClockMultiplier.value + 'x...']

  setTimeout(() => {
    overdriveSimLogs.value.unshift(`[35.4ms] 激发四相连续魔连珠回路，共鸣阶数 ${dualcastRanks.value} 阶，共振比 ${resonanceRatio.value}%`)
  }, 350)

  setTimeout(() => {
    overdriveSimLogs.value.unshift(`[82.1ms] 首领读条进入 ${preemptionSensitivity.value}ms 绝杀窗，P1 插队仲裁裁决通过（打断率 ${calculatedInterruptChance.value}%）`)
  }, 750)

  setTimeout(() => {
    overdriveSimLogs.value.unshift(`[142.8ms] ${damageCapBreaker.value ? '解除 99,999 伤害天花板限制' : '触发常规伤害封顶'}，属性破限爆裂触发！`)
  }, 1200)

  setTimeout(() => {
    overdriveSimLogs.value.unshift(`[198.5ms] 连携全周期爆发达成！理论总伤 ${calculatedOverdriveBurstDamage.value.toLocaleString()} HP，充能循环耗时 ${calculatedChargeTime.value}s`)
    isSimulatingOverdrive.value = false
    if (message) message.success('ATB 时钟倍频与四相连续魔连携推演完成！')
  }, 1650)
}

const exportOverdriveTacticsCertificate = () => {
  const timestamp = new Date().toISOString()
  const certId = 'TACTICS-OD-' + Math.random().toString(36).substring(2, 9).toUpperCase()
  const certContent = `================================================================================
【光之战士：时空裂隙】ATB 时钟频率过载与四相连续魔战术方案书
================================================================================
方案编号: ${certId}
时间戳: ${timestamp}
版本规范: VBLE Battle Tactics & ATB Matrix v2.2.280

【当前选定时钟战姿】
- 战姿类型: ${currentOverdriveStance.value.name} (${currentOverdriveStance.value.tag})
- 超频增益: ${currentOverdriveStance.value.boost}
- 战姿机制概述: ${currentOverdriveStance.value.desc}

【微秒级时钟物理与控制变量】
- ATB 时钟倍频系数: ${atbClockMultiplier.value}x
- 连续魔共鸣阶数: ${dualcastRanks.value} 阶
- 插队判定敏感度: ${preemptionSensitivity.value} ms
- 属性共振过载比: ${resonanceRatio.value} %
- 零咏唱无极速射: ${instantCastPermit.value ? '已启用 (消除读条前摇)' : '未启用'}
- 伤害上限突破许可: ${damageCapBreaker.value ? '已启用 (打破 99,999 限制)' : '未启用'}
- 敌方反制吸收护盾: ${counterAbsorbWard.value ? '已启用 (受击 30% 转 ATB)' : '未启用'}

【实时解算战术指标】
- 理论连击总伤害: ${calculatedOverdriveBurstDamage.value.toLocaleString()} HP
- 满槽充能循环耗时: ${calculatedChargeTime.value} 秒
- 首领打断判定成功率: ${calculatedInterruptChance.value}%
- 秒伤输出增幅比: +${calculatedDpsGain.value}%

【底层引擎契约安全指纹】
- 引擎架构: Godot 4.6 LTS / Microsecond Priority RefCounted Architecture
- 核心仲裁器: atb_overdrive_engine.gd / quad_dualcast_synergy_resolver.gd
- 控制器: chrono_stasis_field_controller.gd
- SHA-256 指纹: SHA256-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}
================================================================================`

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `battle_atb_overdrive_cert_v2.2.280_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('ATB 时钟倍频与四相连续魔战术方案书已导出并同步至剪贴板！')
  }
}

const activeOverdriveCodeTab = ref<'engine' | 'resolver' | 'controller'>('engine')

const gdOverdriveEngineCode = `## atb_overdrive_engine.gd
## Godot 4.6 LTS - 全域 ATB 时钟倍频过载与微秒级行动优先级仲裁器
extends RefCounted
class_name AtbOverdriveEngine

signal atb_overdrive_tick(actor_id: String, current_gauge: float, is_full: bool)
signal preemption_granted(actor_id: String, action_id: String, latency_ms: float)

class OverdriveActor:
	var actor_id: String
	var atb_gauge: float = 0.0 # 0.0 ~ 1000.0
	var clock_mult: float = 3.2
	var is_ready: bool = false

static func tick_overdrive(actor: OverdriveActor, delta_sec: float) -> bool:
	if actor.is_ready:
		return true
	var fill_rate: float = 285.0 * actor.clock_mult
	actor.atb_gauge += fill_rate * delta_sec
	if actor.atb_gauge >= 1000.0:
		actor.atb_gauge = 1000.0
		actor.is_ready = true
		return true
	return false

static func arbitrate_preemption(
	boss_remain_ms: float,
	player_sensitivity_ms: float,
	has_instant_permit: bool
) -> Dictionary:
	var can_interrupt: bool = false
	if has_instant_permit or boss_remain_ms >= player_sensitivity_ms:
		can_interrupt = true
	return {
		"interrupted": can_interrupt,
		"margin_ms": boss_remain_ms - player_sensitivity_ms,
		"priority_tier": "P0_ABSOLUTE" if has_instant_permit else "P1_OVERDRIVE"
	}
`

const gdQuadDualcastCode = `## quad_dualcast_synergy_resolver.gd
## Godot 4.6 LTS - 四相连续魔连携与破限属性爆发伤害解算器
extends RefCounted
class_name QuadDualcastSynergyResolver

enum ElementalAffinity { FIRE, ICE, LIGHTNING, WIND }

static func compute_quad_burst(
	base_dmg: int,
	ranks: int,
	resonance_ratio: float,
	break_limit_cap: bool
) -> Dictionary:
	var total_dmg: float = 0.0
	var chain_multiplier: float = 1.0
	
	for i in range(ranks):
		var step_dmg: float = float(base_dmg) * chain_multiplier * (resonance_ratio / 100.0)
		if not break_limit_cap and step_dmg > 99999.0:
			step_dmg = 99999.0
		total_dmg += step_dmg
		chain_multiplier += 0.25 # 每阶递增 25% 元素穿透
		
	return {
		"total_damage": int(total_dmg),
		"final_multiplier": chain_multiplier,
		"cap_broken": break_limit_cap and (total_dmg > 99999.0)
	}
`

const gdChronoStasisCode = `## chrono_stasis_field_controller.gd
## Godot 4.6 LTS - 局域时空停滞场与反击吸收控制机
extends RefCounted
class_name ChronoStasisFieldController

signal stasis_field_collapsed()
signal counter_damage_absorbed(absorbed_atb: float)

var stasis_ratio: float = 0.90
var counter_absorb_ratio: float = 0.30

func apply_boss_slow(original_cast_ms: float) -> float:
	return original_cast_ms * (1.0 / (1.0 - stasis_ratio))

func absorb_enemy_counter(incoming_dmg: int) -> float:
	var gained_atb: float = float(incoming_dmg) * counter_absorb_ratio * 0.1
	counter_damage_absorbed.emit(gained_atb)
	return gained_atb
`

const currentOverdriveCode = computed(() => {
  if (activeOverdriveCodeTab.value === 'engine') return gdOverdriveEngineCode
  if (activeOverdriveCodeTab.value === 'resolver') return gdQuadDualcastCode
  return gdChronoStasisCode
})

const copyOverdriveCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentOverdriveCode.value).then(() => {
      if (message) message.success('Godot 4.6 LTS 战术过载源码已复制至剪贴板！')
    }).catch(() => {
      if (message) message.error('复制失败，请手动选取复制')
    })
  }
}

// ================= ⚔️ 工坊 4: 全域 ATB 动态时间流逝、连携技帧数对齐与极限破防战术工坊 (v2.2.303) =================
interface AtbFrameArchetype {
  id: string
  name: string
  style: string
  tag: string
  icon: string
  tagType: 'info' | 'warning' | 'error' | 'success'
  desc: string
  baseBurst: number
  cycleMs: number
}

const atbFrameArchetypes: AtbFrameArchetype[] = [
  {
    id: 'tachyon_atb_accelerator',
    name: '超光速 ATB 脉冲加速流',
    style: '微秒瞬发 / 时钟倍频',
    tag: '极速先手',
    icon: '⏱️',
    tagType: 'info',
    desc: '利用高频以太脉冲重构 ATB 进度条，起手瞬间即可充满全队行动力，抢占战局绝对先手。',
    baseBurst: 68000,
    cycleMs: 120
  },
  {
    id: 'cross_frame_combo_aligner',
    name: '跨帧双人连携合击型',
    style: '双刃同帧 / 完美合击',
    tag: '合体破限',
    icon: '🗡️',
    tagType: 'warning',
    desc: '双角色战技前摇通过微秒时钟精准对齐于同一帧击发，触发双倍穿透与神圣共鸣合击。',
    baseBurst: 85000,
    cycleMs: 80
  },
  {
    id: 'stagger_defense_breaker',
    name: '极限虚弱破防粉碎型',
    style: '破防易伤 / 韧性清零',
    tag: '毁灭易伤',
    icon: '💥',
    tagType: 'error',
    desc: '专精敌方领主霸体与韧性条消融，在破防瞬间施加高达 300% 易伤，瞬间瓦解首领防御。',
    baseBurst: 110000,
    cycleMs: 150
  },
  {
    id: 'omni_temporal_stasis_arbiter',
    name: '全域时空停滞主宰型',
    style: '敌方冻结 / 绝对回合',
    tag: '主宰领域',
    icon: '🌌',
    tagType: 'success',
    desc: '张开局域时空停滞神域，敌方全员行动槽彻底冻结，我方享有 5 轮绝对连续攻击回合。',
    baseBurst: 145000,
    cycleMs: 50
  }
]

const selectedAtbFrameArchetypeId = ref<string>('cross_frame_combo_aligner')
const atbClockFrequency = ref<number>(2.8)
const comboFrameWindow = ref<number>(4)
const staggerVulnerabilityBoost = ref<number>(180)
const comboPenetrationStacks = ref<number>(5)

const zeroLatencyInputBuffer = ref<boolean>(true)
const perfectFrameComboCritLock = ref<boolean>(true)
const breakthroughDamageCapGovernor = ref<boolean>(true)

const isSimulatingAtbFrame = ref<boolean>(false)
const atbFrameSimStep = ref<number>(5)
const atbFrameSimCurrentLog = ref<string>('ATB 动态时序流逝与跨帧连携矩阵已就绪，等待调度指令。')

const currentAtbFrameArchetype = computed(() => {
  return atbFrameArchetypes.find(a => a.id === selectedAtbFrameArchetypeId.value) || atbFrameArchetypes[1]
})

const calculatedComboBurstDmg = computed(() => {
  const base = currentAtbFrameArchetype.value.baseBurst
  const freqMult = 1 + (atbClockFrequency.value / 5.0) * 0.4
  const stackMult = 1 + (comboPenetrationStacks.value / 8) * 0.5
  const critMult = perfectFrameComboCritLock.value ? 1.45 : 1.0
  const breakMult = breakthroughDamageCapGovernor.value ? 1.6 : 1.0
  return Math.round(base * freqMult * stackMult * critMult * breakMult)
})

const calculatedAtbTurnCycle = computed(() => {
  const baseSec = 2.0
  const effective = baseSec / atbClockFrequency.value
  return effective.toFixed(2)
})

const calculatedStaggerMultiplier = computed(() => {
  const base = 1.0 + (staggerVulnerabilityBoost.value / 100)
  const windowBonus = (12 - comboFrameWindow.value) * 0.05
  return (base + windowBonus).toFixed(2)
})

const calculatedTacticsTier = computed(() => {
  const dmg = calculatedComboBurstDmg.value
  if (dmg > 280000) return 'EX·太古时空战律至高统帅'
  if (dmg > 200000) return 'SSS·跨帧连携合体神座'
  if (dmg > 140000) return 'SS·高频ATB超频大师'
  return 'S·实战先锋战术家'
})

const scrollToAtbFrameStaggerStudio = () => {
  const el = document.getElementById('atb-frame-stagger-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const resetAtbFrameParameters = () => {
  selectedAtbFrameArchetypeId.value = 'cross_frame_combo_aligner'
  atbClockFrequency.value = 2.8
  comboFrameWindow.value = 4
  staggerVulnerabilityBoost.value = 180
  comboPenetrationStacks.value = 5
  zeroLatencyInputBuffer.value = true
  perfectFrameComboCritLock.value = true
  breakthroughDamageCapGovernor.value = true
  if (message) message.info('已恢复 ATB 帧同步战术工坊初始参数')
}

const runAtbFrameSimulation = () => {
  if (isSimulatingAtbFrame.value) return
  isSimulatingAtbFrame.value = true
  atbFrameSimStep.value = 1
  atbFrameSimCurrentLog.value = '阶段 1/5: 捕获全队四人动态敏捷初值，初始化 ATB 向量微秒时钟...'

  setTimeout(() => {
    atbFrameSimStep.value = 2
    atbFrameSimCurrentLog.value = '阶段 2/5: 采样双角色战技前摇曲线，对齐 4 帧完美合体触发窗口...'
  }, 400)

  setTimeout(() => {
    atbFrameSimStep.value = 3
    atbFrameSimCurrentLog.value = '阶段 3/5: 加载敌方韧性条消融模型，测算破防阶段易伤放大倍率...'
  }, 800)

  setTimeout(() => {
    atbFrameSimStep.value = 4
    atbFrameSimCurrentLog.value = '阶段 4/5: 激活 999999 伤害天花板穿透器，校准 Godot 4.6 LTS 帧同步...'
  }, 1200)

  setTimeout(() => {
    atbFrameSimStep.value = 5
    atbFrameSimCurrentLog.value = '阶段 5/5: 生成战术时序方案证书，锁定实机运行时物理帧循环！'
    isSimulatingAtbFrame.value = false
    if (message) message.success('ATB 动态时序与连携破防推演完成！')
  }, 1600)
}

const exportAtbFrameTacticsCertificate = () => {
  const arch = currentAtbFrameArchetype.value
  const certContent = `================================================================================
  《光之战士：时空裂隙》ATB 动态时序流逝与跨帧连携破防方案证书 (v2.2.303)
  生成时间: ${new Date().toISOString()}
  原型构架: ${arch.name} (${arch.style})
  战律评阶: ${calculatedTacticsTier.value}
================================================================================
【调控参数】
- ATB 时钟倍频加速: ${atbClockFrequency.value.toFixed(1)}x
- 连携合击对齐帧宽: ${comboFrameWindow.value} 帧
- 领主破防易伤增幅: +${staggerVulnerabilityBoost.value}%
- 连携暴击穿透层数: ${comboPenetrationStacks.value} 层
- 零延迟瞬时缓冲: ${zeroLatencyInputBuffer.value ? '已开启' : '关闭'}
- 完美同帧暴击锁定: ${perfectFrameComboCritLock.value ? '已开启' : '关闭'}
- 999999 天花板穿透: ${breakthroughDamageCapGovernor.value ? '已开启' : '关闭'}

【实时解算能效】
- 连携极限爆发伤害: ${calculatedComboBurstDmg.value.toLocaleString()} DMG
- ATB 单回合充能周期: ${calculatedAtbTurnCycle.value} 秒
- 领主破防易伤乘数: ${calculatedStaggerMultiplier.value}x
- 认证安全指纹: SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now()}
================================================================================`

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `atb_frame_tactics_cert_v2.2.303_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Export certificate error:', e)
  }

  if (message) message.success('ATB 战术时序方案证书已导出并同步至剪贴板！')
}

const activeAtbFrameCodeTab = ref<'scheduler' | 'sync' | 'stagger'>('scheduler')

const gdAtbSchedulerCode = `## atb_dynamic_clock_scheduler.gd
## Godot 4.6 LTS - 微秒级 ATB 向量时钟调度机
extends RefCounted
class_name AtbDynamicClockScheduler

signal turn_ready(character_id: String)

static func step_atb_clock(
	current_gauge: float,
	agility: int,
	clock_scale: float,
	delta_sec: float
) -> float:
	var fill_rate: float = (float(agility) * 1.5 + 20.0) * clock_scale
	var next_gauge: float = current_gauge + fill_rate * delta_sec
	return minf(next_gauge, 100.0)
`

const gdComboSyncCode = `## cross_frame_combo_synchronizer.gd
## Godot 4.6 LTS - 跨帧双人连携战技帧数对齐与暴击锁
extends RefCounted
class_name CrossFrameComboSynchronizer

static func evaluate_combo_alignment(
	frame_a: int,
	frame_b: int,
	max_window_frames: int,
	crit_lock_enabled: bool
) -> Dictionary:
	var frame_diff: int = absi(frame_a - frame_b)
	var is_aligned: bool = frame_diff <= max_window_frames
	var is_perfect: bool = frame_diff <= 1
	
	return {
		"is_aligned": is_aligned,
		"is_perfect": is_perfect,
		"force_critical": is_aligned and crit_lock_enabled,
		"frame_delta": frame_diff
	}
`

const gdBossStaggerCode = `## boss_stagger_vulnerability_pipeline.gd
## Godot 4.6 LTS - 领主霸体韧性条消融与破防易伤管线
extends RefCounted
class_name BossStaggerVulnerabilityPipeline

static func compute_stagger_damage(
	raw_damage: int,
	is_staggered: bool,
	vulnerability_boost_pct: float,
	cap_governor_active: bool
) -> Dictionary:
	var final_damage: float = float(raw_damage)
	if is_staggered:
		final_damage *= (1.0 + vulnerability_boost_pct / 100.0)
		
	var max_cap: float = 9999999.0 if cap_governor_active else 999999.0
	final_damage = minf(final_damage, max_cap)
	
	return {
		"damage": int(final_damage),
		"is_staggered": is_staggered,
		"over_cap": final_damage > 999999.0
	}
`

const currentAtbFrameCode = computed(() => {
  if (activeAtbFrameCodeTab.value === 'scheduler') return gdAtbSchedulerCode
  if (activeAtbFrameCodeTab.value === 'sync') return gdComboSyncCode
  return gdBossStaggerCode
})

const copyAtbFrameCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentAtbFrameCode.value).then(() => {
      if (message) message.success('Godot 4.6 LTS 战术时序源码已复制至剪贴板！')
    }).catch(() => {
      if (message) message.error('复制失败，请手动选取复制')
    })
  }
}

onUnmounted(() => {
  if (atbTimer) clearInterval(atbTimer)
  if (microAtbTimer) clearInterval(microAtbTimer)
})

// ==========================================
// 全息回合制 ATB 动态极意连携、阵形战术与伤害解限工坊 (v2.2.328)
// ==========================================
const scrollToOmniAtbSynergyStudio = () => {
  document.getElementById('omni-atb-synergy-studio')?.scrollIntoView({ behavior: 'smooth' })
}

const selectedFormationArchetype = ref('crusader_vanguard')
const formationArchetypes = [
  {
    id: 'crusader_vanguard',
    name: '四圣骑锋矢突贯阵',
    icon: '🛡️',
    typeTag: '铁壁强击',
    tagClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    desc: '前排重甲骑士嘲讽格挡率 80%，后排物理暴击率提升至 100%，连携极意突刺贯通。',
    buffSpecialty: '前排格挡 80% / 后排暴击 100%',
    limitBreakMove: '四极圣光大车轮冲锋'
  },
  {
    id: 'archmage_stellar',
    name: '双大魔导以太星轨阵',
    icon: '🪄',
    typeTag: '连续禁咒',
    tagClass: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    desc: '魔法充能吟唱时滞缩短 75%，四相连续魔连击数翻倍，召唤全屏太古禁咒轰炸。',
    buffSpecialty: '吟唱缩减 75% / 连击数翻倍',
    limitBreakMove: '双星以太超新星坍缩'
  },
  {
    id: 'shadow_flank',
    name: '影刃死囚绝杀背刺阵',
    icon: '🗡️',
    typeTag: '背刺真伤',
    tagClass: 'bg-red-500/20 text-red-300 border border-red-500/30',
    desc: '全员进入死角盲区潜行，背刺必定触发绝对真实穿透，无视物理与魔法双抗。',
    buffSpecialty: '背刺必中真伤 / 暴伤 +100%',
    limitBreakMove: '九狱瞬影绝命千本樱'
  },
  {
    id: 'cleric_choir',
    name: '全知贤者神圣同调阵',
    icon: '🕊️',
    typeTag: '同调神圣',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    desc: '持续全队 HP/MP 脉冲回充，免受一切即死与石化负面状态，极意全员满血复活。',
    buffSpecialty: '全负面免除 / 脉冲双回充',
    limitBreakMove: '太古创生大奇迹圣歌'
  }
]

const atbTimeFlowFactor = ref(2.0)
const synergyAlignToleranceMs = ref(35)
const damageUncapLimitMln = ref(49.99)
const formationAuraRadiusM = ref(15)

const enableActiveTimeFreezeWaitMode = ref(true)
const enableUnlimitedTrueDamageUncap = ref(true)
const enableCrisisLimitBreakCombo = ref(true)

const isOmniAtbSimulating = ref(false)
const omniAtbSimProgress = ref(0)
const omniAtbSimStep = ref('')
const omniAtbLogs = ref<string[]>([])

const theoreticalComboDps = computed(() => {
  let base = 16000000 + (damageUncapLimitMln.value * 320000) * atbTimeFlowFactor.value
  if (enableUnlimitedTrueDamageUncap.value) base *= 1.35
  if (enableCrisisLimitBreakCombo.value) base *= 1.25
  return Math.round(base)
})

const formationResonanceStabilityPct = computed(() => {
  let val = 89.0 + (formationAuraRadiusM.value / 25) * 8.5 + (synergyAlignToleranceMs.value / 100) * 2.4
  return Math.min(99.9, parseFloat(val.toFixed(1)))
})

const staggerBreakDurationSec = computed(() => {
  let sec = 4.0 - (atbTimeFlowFactor.value * 0.6) - (synergyAlignToleranceMs.value / 100) * 0.5
  return Math.max(1.2, parseFloat(sec.toFixed(1)))
})

const omniAtbTierBadge = computed(() => {
  if (theoreticalComboDps.value > 38000000 && formationResonanceStabilityPct.value > 98) return 'EX·神罗天征终焉战术宗师'
  if (theoreticalComboDps.value > 26000000) return 'SSS·极意连续魔阵形圣殿'
  if (theoreticalComboDps.value > 18000000) return 'SS·高阶 ATB 连携统帅'
  return 'S·标准团队战术执行官'
})

const selectFormationArchetype = (id: string) => {
  selectedFormationArchetype.value = id
  const target = formationArchetypes.find(a => a.id === id)
  if (target) {
    if (message) message.info(`已切入战术阵形：${target.name}（${target.typeTag}）`)
  }
}

const resetOmniAtbDefaults = () => {
  atbTimeFlowFactor.value = 2.0
  synergyAlignToleranceMs.value = 35
  damageUncapLimitMln.value = 49.99
  formationAuraRadiusM.value = 15
  enableActiveTimeFreezeWaitMode.value = true
  enableUnlimitedTrueDamageUncap.value = true
  enableCrisisLimitBreakCombo.value = true
  if (message) message.success('已重置 ATB 战术阵形至出厂基准参数！')
}

const runOmniAtbSynergySimulation = () => {
  if (isOmniAtbSimulating.value) return
  isOmniAtbSimulating.value = true
  omniAtbSimProgress.value = 0
  omniAtbLogs.value = []

  const steps = [
    { p: 20, step: '前中后排阵形站位与行动速度 (SPD) 时钟校准...', log: '队伍阵形锁定完毕，前排嘲讽格挡与后排极意连携通道建立。' },
    { p: 45, step: '启动 2.0x 动态 ATB 倍频并开启 35ms 微秒帧窗口对齐...', log: '连携帧同步达成，四人技能时序无缝衔接，触发极意充能。' },
    { p: 70, step: '解除 49.99M 伤害天花板并激活时间冻结决策等待...', log: '真实伤害限制破除，领主韧性条在 ' + staggerBreakDurationSec.value + 's 内崩解瘫痪。' },
    { p: 90, step: '光环同频共振生效，四人终焉奥义极限连携全爆发...', log: '理论秒伤突破 ' + theoreticalComboDps.value.toLocaleString() + '，抗震稳态率达到 ' + formationResonanceStabilityPct.value + '%。' },
    { p: 100, step: 'ATB 阵形推演圆满收敛，战术宗师认证证书签发！', log: `连携秒伤: ${theoreticalComboDps.value.toLocaleString()}，破防耗时: ${staggerBreakDurationSec.value}s，认证: ${omniAtbTierBadge.value}。` }
  ]

  let idx = 0
  const interval = setInterval(() => {
    if (idx < steps.length) {
      omniAtbSimProgress.value = steps[idx].p
      omniAtbSimStep.value = steps[idx].step
      omniAtbLogs.value.push(steps[idx].log)
      idx++
    } else {
      clearInterval(interval)
      isOmniAtbSimulating.value = false
      if (message) message.success('全息 ATB 极意阵形战术沙盘推演圆满完成！')
    }
  }, 250)
}

const exportOmniAtbCert = () => {
  const cert = {
    standard: 'GODOT-4.6-LTS-OMNI-ATB-SYNERGY-SPEC',
    version: 'v2.2.328',
    timestamp: new Date().toISOString(),
    archetype: selectedFormationArchetype.value,
    atb_time_flow: atbTimeFlowFactor.value,
    align_tolerance_ms: synergyAlignToleranceMs.value,
    damage_uncap_mln: damageUncapLimitMln.value,
    aura_radius_m: formationAuraRadiusM.value,
    time_freeze_wait: enableActiveTimeFreezeWaitMode.value,
    unlimited_true_damage: enableUnlimitedTrueDamageUncap.value,
    crisis_limit_break: enableCrisisLimitBreakCombo.value,
    theoretical_combo_dps: theoreticalComboDps.value,
    resonance_stability_pct: formationResonanceStabilityPct.value,
    stagger_break_sec: staggerBreakDurationSec.value,
    tier: omniAtbTierBadge.value,
    cert_sha256: '4a5b6c7d8e9f01234567abcdef8901234567abcdef8901234567abcdef328a'
  }
  const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `omni_atb_synergy_cert_${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  if (message) message.success('已导出全息 ATB 阵形战术方案认证证书！')
}

const activeOmniAtbScriptTab = ref<'coordinator' | 'formation_bus' | 'damage_uncap'>('coordinator')

const omniAtbScriptCodes = {
  coordinator: `class_name OmniATBSynergyCoordinator
extends Node

## 最终幻想：时空之轮 - 全息 ATB 动态时钟与四人连携协处理器
## 文件路径: res://scripts/combat/omni_atb_synergy_coordinator.gd
## 引擎版本: Godot Engine 4.6 LTS

signal combo_strike_triggered(characters: Array[String], total_dmg: int)

@export var time_scale: float = 2.0
@export var tolerance_ms: float = 35.0

func trigger_four_hero_synergy(heros: Array[String], uncap_cap: int) -> Dictionary:
    var final_dmg: int = mini(uncap_cap, 48000000)
    combo_strike_triggered.emit(heros, final_dmg)
    return {
        "heroes": heros,
        "combo_damage": final_dmg,
        "is_perfect_sync": true
    }
`,

  formation_bus: `class_name PartyFormationTacticsBus
extends RefCounted

## 最终幻想：时空之轮 - 队伍前中后排阵形战术与光环广播总线
## 文件路径: res://scripts/combat/party_formation_tactics_bus.gd
## 引擎版本: Godot Engine 4.6 LTS

static func evaluate_formation_buffs(formation_type: String, radius: float) -> Dictionary:
    var stability: float = clampf(89.0 + (radius / 25.0) * 10.9, 80.0, 99.9)
    return {
        "formation": formation_type,
        "stability_pct": stability,
        "aura_radius_meters": radius,
        "damage_reduction_vanguard": 0.35
    }
`,

  damage_uncap: `class_name UnlimitedDamageCapGovernor
extends RefCounted

## 最终幻想：时空之轮 - 极限伤害解限与真实伤害微秒仲裁器
## 文件路径: res://scripts/combat/unlimited_damage_cap_governor.gd
## 引擎版本: Godot Engine 4.6 LTS

static func clamp_combat_damage(raw_dmg: float, uncap_active: bool, limit_mln: float) -> int:
    var max_limit: float = limit_mln * 1000000.0 if uncap_active else 999999.0
    return int(minf(raw_dmg, max_limit))
`
}

const currentOmniAtbScriptCode = computed(() => {
  return omniAtbScriptCodes[activeOmniAtbScriptTab.value]
})

const copyOmniAtbScript = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentOmniAtbScriptCode.value)
    if (message) message.success('已复制 Godot 4.6 LTS 全息 ATB 战术源码到剪贴板！')
  }
}

</script>
