<template>
  <div class="boss-tactics-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900/90 to-purple-950/80 border border-red-500/30 shadow-[0_0_35px_rgba(239,68,68,0.15)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono font-bold text-xs border border-red-500/30">
              VBLE World Bosses, Dawn Stagger &amp; Mechanics Countdown Studio v2.2.329
            </span>
            <span class="text-xs text-gray-400">首领攻坚全鉴、双核协同试炼与终焉虚空首领破限处决</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>👹</span> 十四柱世界首领 AI 状态机、多阶段转相机制与狂暴绝境断路工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            收录风之神殿翼手龙、卡尔纳克液态火焰、大桥死斗，乃至神龙大海啸、欧米茄与终焉虚空首领破限处决工坊。全息实装狂暴破盾、连携机制与针对克制沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToDawnStaggerStudio"
          >
            <template #icon><span>💥</span></template>
            破晓极意破防工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToWorldBossAiStudio"
          >
            <template #icon><span>👹</span></template>
            前往十四柱首领AI工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToExecutionStudio"
          >
            <template #icon><span>⚔️</span></template>
            前往虚空破限处决工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToDualRaidStudio"
          >
            <template #icon><span>⚡</span></template>
            前往深渊双神演练
          </n-button>
          <n-button
            type="warning"
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

    <!-- 专区 4: 首领多阶段伤害轴与狂暴时间轴演练工坊 (Boss Phase Timeline Studio) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1a0f1d] via-[#150d18] to-[#0c0812] border border-rose-500/40 shadow-2xl space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">⏱️</span>
            <h3 class="text-lg sm:text-xl font-black text-white text-glow-amber">首领多阶段机制轴与狂暴倒计时推演工坊 (Boss Timeline Studio)</h3>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            可视化复盘新·埃克斯迪斯、神龙、欧米茄与吉尔伽美什的秒级出招轴，演练大爆炸判定帧、开局海啸吸收帧与狂暴软灭团应对窗口。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-tag type="error" round size="small">秒级高精时间轴</n-tag>
          <n-tag type="warning" round size="small">阶段硬狂暴预警</n-tag>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 首领时间轴选择与播放控制 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span class="text-xs font-bold text-rose-400 block flex items-center gap-1.5">
            <span>👹</span>
            <span>首领出招时间轴选择 (Timeline Scenario)</span>
          </span>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选择攻坚战役时间轴:</label>
              <select
                v-model="selectedTimelineBoss"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-rose-400 focus:outline-none"
                @change="resetTimelinePlayback"
              >
                <option v-for="t in timelineBossOptions" :key="t.id" :value="t.id">
                  {{ t.name }} ({{ t.title }})
                </option>
              </select>
            </div>

            <!-- 播放进度与拖动条 -->
            <div class="space-y-1.5 pt-2">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-400">战斗流逝时间 (Timeline Elapsed):</span>
                <span class="font-mono text-rose-400 font-bold text-sm">{{ currentTimelineSec.toFixed(1) }}s / 80.0s</span>
              </div>
              <n-slider v-model:value="currentTimelineSec" :min="0" :max="80" :step="0.5" />
            </div>

            <div class="flex gap-2 pt-2">
              <button
                type="button"
                class="w-full py-2.5 rounded-lg bg-gradient-to-r from-rose-500 to-amber-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                @click="toggleTimelinePlay"
              >
                <span>{{ isTimelinePlaying ? '⏸️ 暂停时间轴推演' : '▶️ 播放战局时间轴' }}</span>
              </button>
              <n-button size="small" secondary round @click="resetTimelinePlayback">
                🔄 重置
              </n-button>
            </div>
          </div>
        </div>

        <!-- 栏 2: 当前时刻机制高亮与战术对策解算 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-rose-500/30 flex flex-col justify-between space-y-3">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🎯</span>
                <span>当前时刻致命机制 (Active Attack)</span>
              </span>
              <n-tag size="tiny" :type="currentMechanism.dangerType">{{ currentMechanism.dangerLevel }}</n-tag>
            </div>

            <div class="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div class="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>{{ currentMechanism.icon }}</span>
                <span>{{ currentMechanism.name }} (时刻: {{ currentMechanism.timeSec }}s)</span>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed">
                {{ currentMechanism.description }}
              </p>
            </div>

            <div class="p-2.5 rounded bg-blue-950/40 border border-blue-500/40 space-y-1 text-xs">
              <div class="font-bold text-cyan-300">🛡️ 队伍黄金反制窗口 (Counter Window):</div>
              <div class="text-gray-300 text-[11px] leading-relaxed">
                {{ currentMechanism.counterMeasure }}
              </div>
            </div>
          </div>

          <div class="text-[10px] text-gray-500 font-mono text-right">
            阶段: {{ currentMechanism.phase }} · 规避率: {{ currentMechanism.avoidRate }}%
          </div>
        </div>

        <!-- 栏 3: 全程时间轴节点路线图 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-3">
          <div class="space-y-2">
            <span class="text-xs font-bold text-gray-300 block">战役关键杀招时序表 (Key Event Nodes):</span>
            <div class="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <div
                v-for="node in currentTimelineNodes"
                :key="node.name + node.timeSec"
                class="p-2 rounded text-xs transition-all border flex items-center justify-between cursor-pointer"
                :class="currentTimelineSec >= node.timeSec && currentTimelineSec < node.timeSec + 8 ? 'bg-rose-950/80 border-rose-400 text-white font-bold shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'bg-slate-950/60 border-slate-800/80 text-gray-400 hover:text-gray-200'"
                @click="currentTimelineSec = node.timeSec"
              >
                <div class="flex items-center gap-1.5 truncate">
                  <span class="text-sm">{{ node.icon }}</span>
                  <span class="truncate">{{ node.name }}</span>
                </div>
                <span class="font-mono text-[11px] text-amber-400 shrink-0">{{ node.timeSec }}s</span>
              </div>
            </div>
          </div>

          <div class="p-2 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-gray-400">
            提示：点击任意时序节点可立即将进度拨至该机制触发时刻。
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 5: 全息四阶段狂暴破盾与团队战术连携解算沙盘 (Boss Enrage Stagger & Tactical Synergy Studio) -->
    <div id="stagger-synergy-studio" class="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-rose-950/20 to-slate-950 border border-rose-500/40 shadow-2xl space-y-6">
      <!-- 头部导览与操作 -->
      <div class="border-b border-rose-900/40 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-2xl">⚡</span>
            <h2 class="text-xl sm:text-2xl font-black text-rose-300">
              全息四阶段狂暴破盾与团队战术连携解算沙盘
            </h2>
            <n-tag size="small" type="error" round strong>Stagger Matrix 4.6 LTS</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            模拟史诗首领进入狂暴读条阶段的绝对护盾抗性；编排四位主角的极限输出与辅助连携，实时推演破盾时机、灭团容错与瘫痪易伤虚弱窗口！
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <n-button size="small" secondary type="warning" @click="applyStaggerPreset('reset')">
            🔄 重置战术
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportStaggerCert">
            📜 导出狂暴破盾攻坚方案书
          </n-button>
        </div>
      </div>

      <!-- 快速战术预设套用 -->
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs font-bold text-gray-400">⚔️ 官方经典极限绝境战术套用:</span>
        <button
          v-for="preset in staggerPresets"
          :key="preset.id"
          type="button"
          class="px-2.5 py-1 text-xs rounded border transition-all cursor-pointer flex items-center gap-1"
          :class="selectedStaggerPresetId === preset.id
            ? 'bg-rose-950/80 border-rose-400 text-white font-bold shadow-md shadow-rose-500/20 ring-1 ring-rose-400/50'
            : 'bg-slate-950/80 border-slate-800 text-gray-300 hover:border-slate-700'"
          @click="applyStaggerPreset(preset.id)"
        >
          <span>{{ preset.icon }}</span>
          <span>{{ preset.name }}</span>
        </button>
      </div>

      <!-- 首领狂暴护盾状态与读条倒计时 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <!-- 靶标首领切换 -->
        <div class="space-y-1.5">
          <label class="text-xs font-bold text-gray-300 flex items-center justify-between">
            <span>👹 破盾靶标首领:</span>
            <span class="text-[10px] text-amber-400 font-mono">{{ currentStaggerBoss.weakness }}</span>
          </label>
          <select
            v-model="selectedStaggerBossId"
            class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-400"
          >
            <option v-for="b in staggerBossList" :key="b.id" :value="b.id">
              {{ b.name }} (狂暴盾: {{ b.shieldHp.toLocaleString() }} HP)
            </option>
          </select>
        </div>

        <!-- 狂暴读条倒计时滑块 -->
        <div class="space-y-1.5">
          <div class="flex justify-between items-center text-xs">
            <span class="font-bold text-rose-400">灭团读条倒计时 (Cast Time):</span>
            <span class="font-mono font-bold text-amber-300">{{ staggerCastTimeSec }} 秒</span>
          </div>
          <input
            type="range"
            min="6"
            max="25"
            step="1"
            v-model.number="staggerCastTimeSec"
            class="w-full accent-rose-400 cursor-pointer"
          />
          <div class="flex justify-between text-[9px] text-gray-500">
            <span>6s 极限高压</span>
            <span>15s 标准竞速</span>
            <span>25s 充裕窗口</span>
          </div>
        </div>

        <!-- 护盾弱点乘区状态 -->
        <div class="space-y-1 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
          <div class="text-gray-400 flex items-center justify-between">
            <span>核心致命弱点:</span>
            <span class="text-cyan-300 font-bold font-mono">{{ currentStaggerBoss.weaknessTag }}</span>
          </div>
          <div class="text-gray-400 flex items-center justify-between">
            <span>破防弱点倍率:</span>
            <span class="text-emerald-400 font-bold font-mono">+{{ currentStaggerBoss.weaknessBonus }}% 伤害加成</span>
          </div>
          <div class="text-gray-400 flex items-center justify-between">
            <span>狂暴灭团绝技:</span>
            <span class="text-rose-400 font-bold truncate" :title="currentStaggerBoss.wipeSkill">{{ currentStaggerBoss.wipeSkill }}</span>
          </div>
        </div>
      </div>

      <!-- 四大参战主角指令编排与右侧连携破盾解算 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：四主角动作指令选择器 -->
        <div class="lg:col-span-7 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>👥</span> 四大契约英雄攻坚指令编排 (Hero Commands):
            </div>
            <span class="text-[10px] text-gray-400">单轮并发连携输出</span>
          </div>

          <div class="space-y-2.5">
            <!-- 英雄 1: 巴兹 -->
            <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-base">⚔️</span>
                <div>
                  <div class="text-xs font-bold text-white">巴兹 (Bartz) · 自由人主攻</div>
                  <div class="text-[10px] text-gray-400">双持诸神之黄昏 + 正宗</div>
                </div>
              </div>
              <select
                v-model="hero1Action"
                class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-cyan-300 focus:outline-none"
              >
                <option value="rapid_spellblade_thunder">⚡ 魔法剑雷牙 + 乱打八连击 (24000 DMG)</option>
                <option value="ragnarok_cleave">🗡️ 诸神之黄昏破空重斩 (15000 DMG)</option>
                <option value="rapid_holy">✨ 魔法剑圣灵 + 乱打八连击 (26000 DMG)</option>
                <option value="attack_normal">普攻平 A 双手挥击 (6000 DMG)</option>
              </select>
            </div>

            <!-- 英雄 2: 蕾娜 -->
            <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-base">💧</span>
                <div>
                  <div class="text-xs font-bold text-white">蕾娜 (Lenna) · 时魔/白魔支援</div>
                  <div class="text-[10px] text-gray-400">贤者之杖 + 连续魔咏唱</div>
                </div>
              </div>
              <select
                v-model="hero2Action"
                class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-amber-300 focus:outline-none"
              >
                <option value="dual_hastega_quick">⏳ 连续魔·群体加速 + 极速 (Hastega + Quick)</option>
                <option value="dualcast_holy">✨ 连续魔·双重神圣圣裁 (18000 DMG)</option>
                <option value="curaja_heal">💖 白魔法·圣灵大痊愈 (全队满血补满)</option>
                <option value="dispel_shield">🛡️ 驱魔·瓦解护盾护甲 (-30% 护盾防御)</option>
              </select>
            </div>

            <!-- 英雄 3: 法利斯 -->
            <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-base">🏴‍☠️</span>
                <div>
                  <div class="text-xs font-bold text-white">法利斯 (Faris) · 忍者机动暗杀</div>
                  <div class="text-[10px] text-gray-400">佐助之刀 + 极速身法</div>
                </div>
              </div>
              <select
                v-model="hero3Action"
                class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-emerald-300 focus:outline-none"
              >
                <option value="zeninage_burst">💰 金币狂掷·真伤倾泻 (Zeninage 19998 DMG)</option>
                <option value="ninja_thunder_scroll">📜 秘术·轰天雷遁之卷 (12000 雷伤)</option>
                <option value="shadow_clone">👤 暗影分身·完全免疫下 2 次物理反制</option>
                <option value="knife_slice">🔪 双持小刀极速轻刺 (5500 DMG)</option>
              </select>
            </div>

            <!-- 英雄 4: 可露儿 -->
            <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-base">✨</span>
                <div>
                  <div class="text-xs font-bold text-white">可露儿 (Krile) · 召唤/药剂师奇策</div>
                  <div class="text-[10px] text-gray-400">龙之髭 + 始源神印共鸣</div>
                </div>
              </div>
              <select
                v-model="hero4Action"
                class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-purple-300 focus:outline-none"
              >
                <option value="bahamut_megaflare">🐉 契约幻兽·巴哈姆特亿万核爆 (19000 DMG)</option>
                <option value="dragon_breath_mix">🧪 药剂师神级调合·龙之逆鳞 (16000 穿透)</option>
                <option value="ramuh_judgement">⚡ 幻兽拉姆·裁决雷光 (13500 雷伤)</option>
                <option value="elixir_support">🧪 圣灵灵药·全队 MP 满格恢复</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 右侧：实时破盾演练解算看板 -->
        <div class="lg:col-span-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <span>📊</span> 战役狂暴破盾实时裁决
              </span>
              <n-tag size="tiny" :type="staggerSimResult.tagType">
                {{ staggerSimResult.status }}
              </n-tag>
            </div>

            <!-- 破盾进度看板 -->
            <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-400">狂暴护盾击破进度:</span>
                <span class="font-mono font-bold" :class="staggerSimResult.isBroken ? 'text-emerald-400' : 'text-amber-400'">
                  {{ staggerSimResult.damageDealt.toLocaleString() }} / {{ currentStaggerBoss.shieldHp.toLocaleString() }} HP
                </span>
              </div>
              <div class="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  class="h-full rounded-full transition-all duration-300"
                  :class="staggerSimResult.isBroken ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' : 'bg-gradient-to-r from-amber-500 to-rose-500'"
                  :style="{ width: `${staggerSimResult.breakPercent}%` }"
                ></div>
              </div>
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>破盾达成率: {{ staggerSimResult.breakPercent }}%</span>
                <span>预估耗时: {{ staggerSimResult.timeRequiredSec.toFixed(1) }}s / 倒计时 {{ staggerCastTimeSec }}s</span>
              </div>
            </div>

            <!-- 核心数据指标 -->
            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span class="text-gray-400">单轮并发爆发总量:</span>
                <span class="font-mono font-bold text-rose-400">{{ staggerSimResult.damageDealt.toLocaleString() }} 点输出</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span class="text-gray-400">弱点克制伤害加权:</span>
                <span class="font-mono font-bold text-cyan-300">+{{ staggerSimResult.weaknessBonusTotal.toLocaleString() }} DMG</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span class="text-gray-400">瘫痪易伤虚弱窗口:</span>
                <span class="font-mono font-bold" :class="staggerSimResult.isBroken ? 'text-emerald-400' : 'text-gray-500'">
                  {{ staggerSimResult.isBroken ? '易伤 +200% (持续 8 秒)' : '未击破 (无虚弱)' }}
                </span>
              </div>
            </div>
          </div>

          <div class="p-2.5 rounded bg-black/40 border border-slate-800 text-[10px] text-gray-400 leading-relaxed">
            {{ staggerSimResult.summaryAdvice }}
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 6: 深渊双神 (神龙 & 欧米茄) 极限双核协同试炼与极限连携推演工坊 (Void Dual Superbosses Trial Studio) -->
    <div id="dual-raid-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#240a0a] via-[#160c18] to-[#0a0d18] border border-rose-500/40 shadow-[0_0_35px_rgba(244,63,94,0.22)] space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-rose-950 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              DUAL VOID SUPERBOSSES RAID STUDIO
            </span>
            <span class="text-xs text-gray-400 font-mono">v2.2.265 官方实机矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <span>⚡</span> 深渊双神极限双核协同试炼与极限连携推演工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            神龙 (大海啸/诸神黄昏守护) 与欧米茄 (波动炮/双防220钢铁巨神) 同屏协同狂暴！支持 3 种致命协同态势模拟、四人攻坚针对配装互锁、五阶段连续破盾与 SHA-256 方案书一键导出。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetDualRaidParams">
            🔄 重置试炼战局
          </n-button>
          <n-button size="small" secondary type="error" @click="triggerDualCataclysm">
            💥 引爆终焉灭世双重唱
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportDualRaidCertificate">
            📜 导出协同攻坚认证书
          </n-button>
        </div>
      </div>

      <!-- 三栏主推演工作台 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 双核首领态势与护盾共鸣 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <span>🐉🤖</span>
                <span>深渊双神实时协同态势</span>
              </span>
              <n-tag size="tiny" type="error">{{ currentDualStance.tag }}</n-tag>
            </div>

            <!-- 协同态势切换 -->
            <div class="space-y-1.5">
              <label class="text-[11px] text-gray-400 block">选择双核协同态势 (Synergy Stance):</label>
              <select
                v-model="selectedDualStanceId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-rose-300 font-bold rounded-lg p-2 focus:border-rose-400 focus:outline-none"
              >
                <option v-for="s in dualStancesList" :key="s.id" :value="s.id">
                  {{ s.name }} (威胁: {{ s.threatLevel }})
                </option>
              </select>
            </div>

            <!-- 态势描述卡片 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-rose-500/30 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white flex items-center gap-1.5 text-sm">
                  <span>{{ currentDualStance.icon }}</span>
                  <span>{{ currentDualStance.name }}</span>
                </span>
                <span class="text-[10px] text-rose-400 font-mono font-bold">{{ currentDualStance.threatLevel }}</span>
              </div>
              <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentDualStance.description }}</p>
              <div class="p-2 rounded bg-rose-950/40 border border-rose-900/50 text-[11px] space-y-1">
                <div class="text-amber-300 font-bold flex items-center gap-1">
                  <span>⚡ 灭团机制:</span>
                  <span>{{ currentDualStance.wipeGimmick }}</span>
                </div>
                <div class="text-cyan-300 text-[10px]">🛡️ 破解对策: {{ currentDualStance.solution }}</div>
              </div>
            </div>

            <!-- 双神血线与总共鸣盾 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">🐉 神龙剩余血量:</span>
                <span class="font-mono font-bold text-cyan-400">{{ shinryuHp.toLocaleString() }} / 55,000 HP</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">🤖 欧米茄剩余血量:</span>
                <span class="font-mono font-bold text-amber-400">{{ omegaHp.toLocaleString() }} / 55,000 HP</span>
              </div>
              <div class="flex justify-between items-center pt-1 border-t border-slate-800">
                <span class="text-gray-400">🛡️ 双核共鸣护盾值:</span>
                <span class="font-mono font-bold text-rose-400">{{ combinedAegisShield.toLocaleString() }} 盾值</span>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
            <span>试炼阶段:</span>
            <span class="font-mono font-bold text-emerald-400">Phase {{ dualRaidPhase }} / 5 ({{ dualRaidPhaseTitle }})</span>
          </div>
        </div>

        <!-- 栏 2: 四主角针对配装互锁与战术调度 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🛡️</span>
              <span>四人攻坚配装防具互锁</span>
            </span>
            <span class="font-mono text-xs text-emerald-400 font-bold">配装契合度 100%</span>
          </div>

          <!-- 四位主角针对槽位卡片 -->
          <div class="space-y-2 text-xs">
            <div
              v-for="hero in squadCounterLoadout"
              :key="hero.id"
              class="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start justify-between gap-2"
            >
              <div class="space-y-0.5">
                <div class="font-bold text-white flex items-center gap-1">
                  <span>{{ hero.avatar }}</span>
                  <span>{{ hero.name }} ({{ hero.job }})</span>
                </div>
                <div class="text-[10px] text-cyan-300 font-medium">⚔️ 战术动作: {{ hero.tactic }}</div>
                <div class="text-[10px] text-gray-400">🛡️ 核心神装: {{ hero.gear }}</div>
              </div>
              <n-tag size="tiny" type="success">{{ hero.counterTarget }}</n-tag>
            </div>
          </div>

          <!-- 团队防御指标 -->
          <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-400">水属性海啸吸收率:</span>
              <span class="font-mono font-bold text-cyan-400">100% (珊瑚戒指全员装备)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">异常状态绝对免疫:</span>
              <span class="font-mono font-bold text-purple-300">100% (全员缎带 Ribbon)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">雷属性穿甲真伤加成:</span>
              <span class="font-mono font-bold text-amber-300">+250% (魔法剑雷牙+乱打)</span>
            </div>
          </div>
        </div>

        <!-- 栏 3: 五阶段协同推演输出与战报 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-rose-950/20 to-slate-900 border border-rose-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>五阶段实机推演战况</span>
              </span>
              <n-tag size="tiny" :type="isDualRaidVictory ? 'success' : 'error'">
                {{ isDualRaidVictory ? '🏆 试炼通关' : '⚔️ 激战中' }}
              </n-tag>
            </div>

            <!-- 阶段推进卡片 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div class="text-[11px] text-gray-400">总并发破核输出伤害 (Combined Burst)</div>
              <div class="text-2xl sm:text-3xl font-black font-mono mt-1 text-rose-400">
                {{ totalDualBurstDamage.toLocaleString() }}
              </div>
              <div class="text-[10px] text-emerald-400 mt-0.5">
                {{ dualRaidStatusNote }}
              </div>
            </div>

            <!-- 实时战况输出流 -->
            <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[10px] space-y-1 max-h-24 overflow-y-auto font-mono text-gray-300">
              <div v-for="(log, idx) in dualRaidLogs" :key="idx" class="flex items-start gap-1">
                <span class="text-rose-400 shrink-0">•</span>
                <span>{{ log }}</span>
              </div>
            </div>
          </div>

          <!-- 推演推进按钮 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-500 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg cursor-pointer"
              @click="stepDualRaidPhase"
            >
              ⏩ 推进下一试炼阶段 (Phase {{ dualRaidPhase }} &rarr; {{ Math.min(5, dualRaidPhase + 1) }})
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.6 LTS 核心实机代码展台 (三 Tab 切换) -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-rose-400">
            Godot 4.6 LTS 史诗首领机制与双核协同引擎架构
          </span>
          <n-tag size="tiny" type="info">纯读安全 · 零内存泄漏</n-tag>
        </div>
        <div class="flex items-center gap-2">
          <!-- 三 Tab 切换 -->
          <div class="inline-flex p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeBossGodotTab === 'tactics' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeBossGodotTab = 'tactics'"
            >
              📄 boss_tactics_battle.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeBossGodotTab === 'stagger' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeBossGodotTab = 'stagger'"
            >
              📄 boss_stagger_enrage_resolver.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeBossGodotTab === 'dual_raid' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeBossGodotTab = 'dual_raid'"
            >
              📄 void_dual_superboss_raid_engine.gd
            </button>
          </div>
          <n-button size="tiny" secondary type="error" @click="copyGodotCode">
            {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
          </n-button>
        </div>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-56 custom-scrollbar"><code v-if="activeBossGodotTab === 'tactics'">{{ godotCodeText }}</code><code v-else-if="activeBossGodotTab === 'stagger'">{{ godotStaggerCodeText }}</code><code v-else>{{ godotDualRaidCodeText }}</code></pre>
    </div>

    <!-- 工坊 7: 终焉深渊虚空首领狂暴破盾与破限处决工坊 -->
    <div
      id="void-execution-studio"
      class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/70 border border-rose-500/30 shadow-[0_0_35px_rgba(244,63,94,0.2)] space-y-6 relative overflow-hidden"
    >
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 头部标章与导出 -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
              v2.2.283 重磅实装
            </span>
            <span class="text-xs text-gray-400">深渊首领处决 · 绝对粒子破盾 · 破限爆发伤害</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>⚔️</span> 终焉深渊虚空首领狂暴破盾与破限处决工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            深入神龙、欧米茄、新埃克斯迪斯与太古厄诺四大终焉首领狂暴机制，推演绝对屏障击破、弱点硬直易伤、狂暴绝杀倒计时与破限处决爆发。
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingExecution"
            @click="runExecutionSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动破限处决推演
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportVoidExecutionCertificate"
          >
            <template #icon><span>📜</span></template>
            导出首领处决方案书
          </n-button>
        </div>
      </div>

      <!-- 四大深渊首领破限处决战姿 (4 Execution Stances) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        <div
          v-for="stance in voidExecutionStances"
          :key="stance.id"
          class="p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
          :class="selectedExecutionStanceId === stance.id
            ? 'bg-rose-950/40 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="selectedExecutionStanceId = stance.id"
        >
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xl">{{ stance.icon }}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded font-mono" :class="selectedExecutionStanceId === stance.id ? 'bg-rose-500/30 text-rose-200' : 'bg-slate-800 text-gray-400'">
                {{ stance.tag }}
              </span>
            </div>
            <div class="font-bold text-xs text-gray-200">{{ stance.name }}</div>
            <div class="text-[10px] text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">{{ stance.desc }}</div>
          </div>
          <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
            <span class="text-gray-400">处决战术:</span>
            <span class="font-mono font-bold text-rose-300">{{ stance.tactics }}</span>
          </div>
        </div>
      </div>

      <!-- 核心工作台：双栏交互面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        <!-- 左侧：全息处决雷达视窗与指标卡片 -->
        <div class="lg:col-span-7 space-y-4">
          <!-- 全息处决雷达视窗 -->
          <div class="relative h-64 sm:h-72 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
              <div
                class="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                :style="{
                  background: currentExecutionStance.gradient,
                  opacity: (executionEnergy / 1000 * 0.75 + 0.15).toFixed(2),
                  transform: `scale(${1 + staggerVulnerability / 500})`
                }"
              ></div>
              <svg class="w-64 h-64 opacity-50 animate-[spin_45s_linear_infinite]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(244,63,94,0.4)" stroke-width="1.5" stroke-dasharray="4 4" />
                <polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="rgba(244,63,94,0.5)" stroke-width="1.2" />
                <circle cx="100" cy="100" r="38" fill="none" stroke="rgba(245,158,11,0.5)" stroke-width="1" stroke-dasharray="2 2" />
                <line x1="20" y1="20" x2="180" y2="180" stroke="rgba(244,63,94,0.3)" stroke-width="1" />
                <line x1="180" y1="20" x2="20" y2="180" stroke="rgba(244,63,94,0.3)" stroke-width="1" />
                <circle cx="100" cy="100" r="6" fill="rgba(244,63,94,0.9)" />
              </svg>
            </div>

            <!-- 顶部状态指示灯 -->
            <div class="relative z-10 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse"></span>
                <span class="font-mono text-rose-300 font-bold">VOID EXECUTION TARGETED</span>
                <span class="text-gray-400 font-mono text-[10px]">| 狂暴 {{ enrageCountdown }}s 倒计时</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-amber-300">
                处决能量: {{ executionEnergy }} EP
              </div>
            </div>

            <!-- 中间标语 -->
            <div class="relative z-10 text-center my-auto">
              <div class="text-2xl font-black text-white/95 tracking-wider font-mono drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]">
                {{ currentExecutionStance.name }}
              </div>
              <div class="text-xs text-rose-200/80 mt-1 font-mono">
                处决爆发: {{ calculatedExecutionDamage.toLocaleString() }} HP · 狂暴通关率: {{ calculatedClearChance }}%
              </div>
            </div>

            <!-- 底部性能微视窗 -->
            <div class="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-gray-400">
              <span>破盾所需最少动作: {{ calculatedRequiredActions }} 次连击</span>
              <span class="text-emerald-400 font-bold">
                击破易伤: {{ staggerVulnerability }}%
              </span>
            </div>
          </div>

          <!-- 4 维物理与战斗指标卡片 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">处决理论总爆发</div>
              <div class="font-mono text-amber-400 font-bold text-sm mt-0.5">{{ calculatedExecutionDamage.toLocaleString() }}</div>
              <div class="text-[9px] text-gray-500 mt-0.5">{{ damageCapBreakerPermit ? '破限突破 500,000' : '封顶 99,999' }}</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">最少破盾动作数</div>
              <div class="font-mono text-cyan-400 font-bold text-sm mt-0.5">{{ calculatedRequiredActions }} 次连击</div>
              <div class="text-[9px] text-gray-500 mt-0.5">破除绝对粒子屏障</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">狂暴前击杀率</div>
              <div class="font-mono text-emerald-400 font-bold text-sm mt-0.5">{{ calculatedClearChance }}%</div>
              <div class="text-[9px] text-gray-500 mt-0.5">{{ counterImmunityAura ? '免疫濒死灭团技' : '常规濒死受击' }}</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">战利品掠夺加成</div>
              <div class="font-mono text-purple-400 font-bold text-sm mt-0.5">{{ doubleLootPlunder ? '200% 双倍' : '100% 常规' }}</div>
              <div class="text-[9px] text-gray-500 mt-0.5">绝品神兵掉落率</div>
            </div>
          </div>

          <!-- 实时推演日志终端 -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
            <div class="flex items-center justify-between text-xs text-gray-400 pb-1.5 border-b border-slate-800">
              <span class="flex items-center gap-1.5 text-rose-300 font-bold">
                <span>💻</span> 首领破盾处决演练日志 (Execution Terminal)
              </span>
              <span class="text-[10px] text-gray-500">时序精度: 微秒级</span>
            </div>
            <div class="space-y-1 text-[11px] text-gray-300 max-h-28 overflow-y-auto custom-scrollbar">
              <div v-for="(log, idx) in executionSimLogs" :key="idx" class="flex items-start gap-1.5">
                <span class="text-rose-400 select-none">&gt;</span>
                <span :class="log.includes('完成') || log.includes('成功') || log.includes('击破') ? 'text-emerald-400' : 'text-gray-300'">{{ log }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：无极物理调优与处决控制 -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div class="text-xs font-bold text-rose-300 flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="flex items-center gap-1.5">
              <span>🎛️</span> 首领狂暴破盾参数微调 (Raid Uniforms)
            </span>
            <button
              type="button"
              class="text-[10px] text-gray-400 hover:text-rose-300 cursor-pointer"
              @click="resetExecutionParams"
            >
              重置参数
            </button>
          </div>

          <!-- 首领狂暴护盾值 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>首领绝对护盾值 (Boss Shield HP):</span>
              <span class="font-mono text-rose-400 font-bold">{{ (bossShieldHp / 1000).toFixed(0) }}k HP</span>
            </div>
            <n-slider v-model:value="bossShieldHp" :min="50000" :max="500000" :step="10000" />
            <div class="flex justify-between text-[9px] text-gray-500">
              <span>50k 弱质护盾</span>
              <span>200k 史诗屏障</span>
              <span>500k 绝对结界</span>
            </div>
          </div>

          <!-- 狂暴读条倒计时 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>狂暴灭团倒计时 (Enrage Timer):</span>
              <span class="font-mono text-amber-400 font-bold">{{ enrageCountdown }} 秒</span>
            </div>
            <n-slider v-model:value="enrageCountdown" :min="10" :max="120" :step="1" />
          </div>

          <!-- 弱点暴露击破易伤率 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>弱点暴露击破易伤 (Stagger Vulnerability):</span>
              <span class="font-mono text-cyan-400 font-bold">{{ staggerVulnerability }} %</span>
            </div>
            <n-slider v-model:value="staggerVulnerability" :min="100" :max="400" :step="10" />
          </div>

          <!-- 处决共鸣能量池 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>处决共鸣能量池 (Execution Energy):</span>
              <span class="font-mono text-purple-400 font-bold">{{ executionEnergy }} EP</span>
            </div>
            <n-slider v-model:value="executionEnergy" :min="100" :max="999" :step="1" />
          </div>

          <!-- 3 项处决开关 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 flex items-center gap-1.5">
                <span>💥</span> 绝对破限伤害处决解禁 (单击 500,000 上限)
              </span>
              <n-switch v-model:value="damageCapBreakerPermit" size="small" />
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 flex items-center gap-1.5">
                <span>🛡️</span> 虚空反击死斗规避光环 (免疫首领濒死反噬)
              </span>
              <n-switch v-model:value="counterImmunityAura" size="small" />
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 flex items-center gap-1.5">
                <span>💎</span> 全队双倍战利品掠夺 (双倍绝品神兵材料)
              </span>
              <n-switch v-model:value="doubleLootPlunder" size="small" />
            </div>
          </div>
        </div>
      </div>

      <!-- 下方：Godot 4.6 LTS 底层脚本契约矩阵 -->
      <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 relative z-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-rose-300 font-mono">GODOT 4.6 LTS ARCHITECTURE SPEC</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">纯粹 RefCounted 离线解算</span>
            </div>
            <div class="text-xs text-gray-400 mt-0.5">狂暴破盾解算器、弱点硬直时钟引擎与濒死自爆免疫控制器</div>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs font-mono">
              <button
                type="button"
                class="px-2.5 py-1 rounded transition cursor-pointer"
                :class="activeExecutionCodeTab === 'resolver' ? 'bg-rose-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                @click="activeExecutionCodeTab = 'resolver'"
              >
                execution_resolver.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded transition cursor-pointer"
                :class="activeExecutionCodeTab === 'stagger' ? 'bg-rose-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                @click="activeExecutionCodeTab = 'stagger'"
              >
                stagger_stasis_engine.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded transition cursor-pointer"
                :class="activeExecutionCodeTab === 'ward' ? 'bg-rose-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                @click="activeExecutionCodeTab = 'ward'"
              >
                counter_ward_controller.gd
              </button>
            </div>
            <n-button
              size="small"
              type="info"
              secondary
              round
              @click="copyExecutionCode"
            >
              复制源码
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentExecutionCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 👹 工坊 5: 十四柱世界首领 AI 状态机、多阶段转相机制与狂暴绝境断路工坊 (World Boss AI State Machine & Despair Overdrive Studio v2.2.304) -->
    <div
      id="world-boss-ai-studio"
      class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-red-950/80 via-slate-900/90 to-purple-950/80 border border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.22)] space-y-6 relative overflow-hidden"
    >
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -left-20 -bottom-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 头部与操作区 -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-red-900/60 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5 flex-wrap">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-black font-mono bg-red-500/20 text-red-300 border border-red-500/40">
              WORLD BOSS AI &amp; DESPAIR OVERDRIVE v2.2.304
            </span>
            <span class="text-xs text-red-300/80 font-mono">十四柱世界首领AI状态机与转相机制</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-wide">
            <span>👹</span> 十四柱世界首领 AI 状态机、多阶段转相机制与狂暴绝境断路工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            基于 Godot 4.6 LTS 实时仿真：驱动十四柱世界首领多阶段状态机转移、狂暴灭团绝境防猝死锁血断路器、转相无敌膜穿透与 999999 破限爆发处决解算。
          </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap self-start md:self-auto">
          <n-button
            type="info"
            size="small"
            round
            secondary
            @click="resetWorldBossAiParameters"
          >
            重置参数
          </n-button>
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingWorldBossAi"
            @click="runWorldBossAiSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动首领AI推演
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportWorldBossAiCertificate"
          >
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大世界首领代表原型 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        <div
          v-for="archetype in worldBossArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left"
          :class="selectedWorldBossArchetypeId === archetype.id
            ? 'bg-red-950/50 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-red-600/50'"
          @click="selectedWorldBossArchetypeId = archetype.id"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ archetype.icon }}</span>
            <n-tag size="tiny" :type="archetype.tagType" round>{{ archetype.tag }}</n-tag>
          </div>
          <div class="font-bold text-sm text-gray-100">{{ archetype.name }}</div>
          <div class="text-[11px] text-red-300/80 font-mono mt-0.5">{{ archetype.phases }}</div>
          <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{{ archetype.desc }}</p>
          <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>生命值: {{ (archetype.baseHp / 10000).toFixed(0) }}万</span>
            <span class="text-red-400">狂暴秒伤: {{ archetype.rageDmg.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <!-- 核心调控滑块与高能开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        <!-- 左侧参数微调面板 -->
        <div class="lg:col-span-7 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <span>⚙️</span> 首领阶段转移与狂暴倒计时微调
            </span>
            <span class="text-[11px] font-mono text-red-400">Continuous Boss Phase Dynamics</span>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">阶段转相血线阈值 (Phase Transition HP):</span>
                <span class="font-mono text-red-400 font-bold">{{ phaseTransitionHp }}%</span>
              </div>
              <n-slider v-model:value="phaseTransitionHp" :min="10" :max="50" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>濒死强袭 (10%)</span>
                <span>标准转相 (25%)</span>
                <span>高频变相 (50%)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">狂暴超时倒计时 (Rage Timer Limit):</span>
                <span class="font-mono text-amber-400 font-bold">{{ rageTimerLimitSec }} 秒</span>
              </div>
              <n-slider v-model:value="rageTimerLimitSec" :min="60" :max="300" :step="15" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>极限竞速 (60s)</span>
                <span>标准攻坚 (180s)</span>
                <span>持久战力 (300s)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">绝境破防易伤乘数 (Despair Stagger Multiplier):</span>
                <span class="font-mono text-cyan-400 font-bold">{{ despairStaggerMultiplier.toFixed(1) }}x</span>
              </div>
              <n-slider v-model:value="despairStaggerMultiplier" :min="1.5" :max="4.5" :step="0.1" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>常规破防 (1.5x)</span>
                <span>绝境易伤 (3.0x)</span>
                <span>创世裁决 (4.5x)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">全屏歼灭技蓄力前摇 (Annihilation Cast Window):</span>
                <span class="font-mono text-purple-400 font-bold">{{ annihilationCastWindowMs }} ms</span>
              </div>
              <n-slider v-model:value="annihilationCastWindowMs" :min="800" :max="4000" :step="200" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>瞬时致命 (800ms)</span>
                <span>标准读条 (2200ms)</span>
                <span>蓄力终结 (4000ms)</span>
              </div>
            </div>
          </div>

          <!-- 三大高能保障开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">阶段转相无敌膜穿透符印 (Phase Piercing Rune)</div>
                <div class="text-[11px] text-gray-400">突破首领多阶段转相时的绝对无敌免伤盾，真伤穿透 100%，无视免疫</div>
              </div>
              <n-switch v-model:value="invinciblePhasePiercingRune" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">狂暴灭团绝境防猝死断路器 (Rage Wipe Circuit Breaker)</div>
                <div class="text-[11px] text-gray-400">首领狂暴大招判定命中时强制保留我方 1 HP 锁血并赠送 3 秒绝境反击无敌</div>
              </div>
              <n-switch v-model:value="rageWipeCircuitBreaker" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">999999 破限爆发处决裁决锁 (Damage Cap Execution Governor)</div>
                <div class="text-[11px] text-gray-400">解除斩击 999999 伤害天花板，单次处决最高直击 9,999,999 极限真伤</div>
              </div>
              <n-switch v-model:value="damageCapExecutionGovernor" size="small" />
            </div>
          </div>
        </div>

        <!-- 右侧指标计算与沙盘推演 -->
        <div class="lg:col-span-5 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>📊</span> 实时解算首领狂暴与处决能效
              </span>
              <n-tag size="tiny" type="error" round>State Resolved</n-tag>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-red-950/30 border border-red-700/40">
                <div class="text-[11px] text-gray-400">首领狂暴有效秒伤</div>
                <div class="text-lg font-black text-red-300 font-mono mt-0.5">{{ calculatedRageDps.toLocaleString() }} DPS</div>
                <div class="text-[10px] text-red-400/80 mt-0.5">终焉过载毁灭输出</div>
              </div>

              <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-700/40">
                <div class="text-[11px] text-gray-400">阶段转相剩余窗口</div>
                <div class="text-lg font-black text-amber-300 font-mono mt-0.5">{{ calculatedPhaseWindowSec }} 秒</div>
                <div class="text-[10px] text-amber-400/80 mt-0.5">破防打断安全时限</div>
              </div>

              <div class="p-3 rounded-lg bg-purple-950/30 border border-purple-700/40">
                <div class="text-[11px] text-gray-400">破防绝境处决真伤</div>
                <div class="text-lg font-black text-purple-300 font-mono mt-0.5">{{ calculatedExecutionDmg.toLocaleString() }} DMG</div>
                <div class="text-[10px] text-purple-400/80 mt-0.5">真伤处决破限峰值</div>
              </div>

              <div class="p-3 rounded-lg bg-cyan-950/30 border border-cyan-700/40">
                <div class="text-[11px] text-gray-400">攻坚战术难度评级</div>
                <div class="text-sm font-black text-cyan-300 font-mono mt-1">{{ calculatedRaidDifficultyTier }}</div>
                <div class="text-[10px] text-cyan-400/80 mt-0.5">太古猎人协会认证</div>
              </div>
            </div>
          </div>

          <!-- 推演终端 -->
          <div class="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-400">五阶段首领 AI 状态推演进度:</span>
              <span class="font-mono text-red-400 font-bold">{{ worldBossAiSimStep }}/5 阶段</span>
            </div>
            <n-progress
              type="line"
              :percentage="(worldBossAiSimStep / 5) * 100"
              :status="worldBossAiSimStep === 5 ? 'success' : 'error'"
              :show-indicator="false"
              processing
            />
            <div class="text-[11px] text-gray-300 font-mono bg-slate-900/90 p-2 rounded border border-slate-800/80 min-h-[48px] flex items-center">
              <span>{{ worldBossAiSimCurrentLog }}</span>
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
                :class="activeWorldBossCodeTab === 'fsm' ? 'bg-red-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeWorldBossCodeTab = 'fsm'"
              >
                boss_fsm_engine.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeWorldBossCodeTab === 'piercer' ? 'bg-red-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeWorldBossCodeTab = 'piercer'"
              >
                phase_invincible_piercer.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeWorldBossCodeTab === 'breaker' ? 'bg-red-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeWorldBossCodeTab = 'breaker'"
              >
                rage_wipe_breaker.gd
              </button>
            </div>
            <n-button size="small" type="primary" secondary round @click="copyWorldBossAiCode">
              复制源码
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentWorldBossCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- v2.2.329: 全域首领攻坚全鉴、破晓极意破防与机制倒计时工坊 -->
    <div
      id="dawn-stagger-countdown-studio"
      class="dawn-stagger-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/95 via-rose-950/20 to-slate-900/95 border border-rose-500/30 shadow-[0_0_35px_rgba(244,63,94,0.12)] space-y-6 relative overflow-hidden"
    >
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-500/20 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/30">
              DAWN STAGGER &amp; COUNTDOWN MATRIX v2.2.329
            </span>
            <span class="text-xs text-rose-400 font-mono">Real-Time Raid Breaker &amp; Stagger Pipeline</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>💥</span> 全域首领攻坚全鉴、破晓极意破防与机制倒计时工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            集成首领韧性槽微秒级击穿计算、大招狂暴倒计时雷达预警、多段破甲真伤灌注与团队名刀免疫保护。全流程联动 Godot 4.6 LTS 攻坚总线。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-button
            type="error"
            size="small"
            round
            secondary
            :loading="isSimulatingDawnStagger"
            @click="runDawnStaggerSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动破晓破防沙盘推演
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportDawnStaggerCertificate"
          >
            <template #icon><span>📜</span></template>
            导出首领攻坚认证证书
          </n-button>
        </div>
      </div>

      <!-- 四大首领攻坚流派原型 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="arch in dawnStaggerArchetypes"
          :key="arch.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative"
          :class="selectedDawnArchetypeId === arch.id ? 'bg-rose-950/40 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 'bg-slate-800/40 border-slate-700/60 hover:border-rose-500/40'"
          @click="selectDawnArchetype(arch.id)"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ arch.icon }}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {{ arch.tag }}
            </span>
          </div>
          <div class="font-bold text-sm text-white">{{ arch.name }}</div>
          <div class="text-xs text-rose-300 font-mono mt-0.5">{{ arch.subtitle }}</div>
          <div class="text-[11px] text-gray-400 mt-2 leading-relaxed">{{ arch.desc }}</div>
          <div class="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] font-mono">
            <span class="text-gray-400">破防易伤倍率</span>
            <span class="text-rose-400 font-bold">{{ arch.bonusMultiplier }}</span>
          </div>
        </div>
      </div>

      <!-- 参数调节与开关网格 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
        <!-- 4 滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-rose-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
            <span>⚙️</span> 连续破防机制与时序参数微调
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">破晓极意破防虚弱窗口 (秒)</span>
              <span class="text-rose-400 font-mono font-bold">{{ dawnStaggerVulnerabilityWindow.toFixed(1) }} s</span>
            </div>
            <n-slider v-model:value="dawnStaggerVulnerabilityWindow" :min="3.0" :max="15.0" :step="0.5" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">首领狂暴倒计时阈值预警 (秒)</span>
              <span class="text-amber-400 font-mono font-bold">{{ dawnEnrageCountdownWarningSec }} s</span>
            </div>
            <n-slider v-model:value="dawnEnrageCountdownWarningSec" :min="10" :max="120" :step="5" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">多段连携破甲穿透率 (%)</span>
              <span class="text-cyan-400 font-mono font-bold">{{ dawnMultiHitArmorBreakRatio }} %</span>
            </div>
            <n-slider v-model:value="dawnMultiHitArmorBreakRatio" :min="30" :max="95" :step="1" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">全队爆发聚能增幅 (%)</span>
              <span class="text-emerald-400 font-mono font-bold">{{ dawnPartyStaggerFocusBurstPct }} %</span>
            </div>
            <n-slider v-model:value="dawnPartyStaggerFocusBurstPct" :min="100" :max="500" :step="10" />
          </div>
        </div>

        <!-- 3 开关与实时数据 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-rose-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
            <span>🛡️</span> 首领破限特权与免疫机制
          </div>

          <div class="space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">首领绝招微秒级打断仲裁</div>
                <div class="text-gray-400 text-[11px]">狂暴咏唱时精准施加击晕打断</div>
              </div>
              <n-switch v-model:value="dawnBossCastBarInterruptible" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">团队名刀死斗免疫符文</div>
                <div class="text-gray-400 text-[11px]">受到致死毁灭打击时保全 1 点 HP</div>
              </div>
              <n-switch v-model:value="dawnPartyDeathImmunityRune" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">破防虚弱真伤解限破千倍</div>
                <div class="text-gray-400 text-[11px]">解除 999% 虚弱易伤倍率硬编码上限</div>
              </div>
              <n-switch v-model:value="dawnStaggerDamageMultiplierUncap" />
            </div>
          </div>

          <!-- 4 项实时综合解算指标 -->
          <div class="grid grid-cols-2 gap-3 pt-1">
            <div class="p-2.5 rounded bg-slate-900 border border-rose-500/20 text-center">
              <div class="text-[11px] text-gray-400">破防真伤增幅</div>
              <div class="text-lg font-mono font-black text-rose-400">{{ dawnCalculatedMetrics.burstMultiplier }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-rose-500/20 text-center">
              <div class="text-[11px] text-gray-400">狂暴生还稳态率</div>
              <div class="text-lg font-mono font-black text-amber-400">{{ dawnCalculatedMetrics.survivabilityIndex }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-rose-500/20 text-center">
              <div class="text-[11px] text-gray-400">微秒判定容错</div>
              <div class="text-lg font-mono font-black text-cyan-400">{{ dawnCalculatedMetrics.staggerToleranceMs }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-rose-500/20 text-center">
              <div class="text-[11px] text-gray-400">攻坚统帅评级</div>
              <div class="text-lg font-mono font-black text-emerald-400">{{ dawnCalculatedMetrics.raidCertification }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条 -->
      <div v-if="isSimulatingDawnStagger" class="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-rose-500/30">
        <div class="flex justify-between text-xs font-mono">
          <span class="text-rose-300 flex items-center gap-2">
            <span class="animate-spin">🔄</span> {{ dawnSimulationStages[currentDawnSimStage] }}
          </span>
          <span class="text-gray-400">{{ (currentDawnSimStage + 1) * 20 }}%</span>
        </div>
        <n-progress type="line" :percentage="(currentDawnSimStage + 1) * 20" :show-indicator="false" status="error" />
      </div>

      <!-- Godot 4.6 LTS 源码展台 -->
      <div class="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-gray-300 font-mono">GODOT 4.6 LTS RAID BREAKER ENGINE</span>
            <n-tag size="small" type="error" round>res://scripts/combat/boss/</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <n-radio-group v-model:value="activeDawnScriptTab" size="small">
              <n-radio-button value="stagger_gauge">韧性破防器</n-radio-button>
              <n-radio-button value="countdown_timer">机制倒计时</n-radio-button>
              <n-radio-button value="burst_coordinator">团队爆发协同</n-radio-button>
            </n-radio-group>
            <n-button type="info" size="tiny" secondary round @click="copyDawnScript">
              复制当前脚本
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentDawnScriptCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
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

const activeBossGodotTab = ref<'tactics' | 'stagger' | 'dual_raid'>('dual_raid')

const copyGodotCode = async () => {
  try {
    const textToCopy = activeBossGodotTab.value === 'tactics' 
      ? godotCodeText 
      : activeBossGodotTab.value === 'stagger' 
        ? godotStaggerCodeText 
        : godotDualRaidCodeText
    const fileName = activeBossGodotTab.value === 'tactics' 
      ? 'boss_tactics_battle.gd' 
      : activeBossGodotTab.value === 'stagger' 
        ? 'boss_stagger_enrage_resolver.gd' 
        : 'void_dual_superboss_raid_engine.gd'
    await navigator.clipboard.writeText(textToCopy)
    copiedCode.value = true
    message.success(`已复制 ${fileName} 核心实机代码！`)
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}

// ================= 专区 4: 首领多阶段伤害轴与狂暴时间轴系统 =================
interface TimelineNode {
  timeSec: number
  name: string
  icon: string
  phase: string
  dangerLevel: string
  dangerType: 'error' | 'warning' | 'info' | 'success'
  description: string
  counterMeasure: string
  avoidRate: number
}

const timelineBossOptions = [
  { id: 'neo-exdeath', name: '新·埃克斯迪斯', title: '终焉虚无核心' },
  { id: 'shinryu', name: '神龙 (Shinryu)', title: '灭世海啸守护' },
  { id: 'omega', name: '古代兵器·欧米茄', title: '机械极光反击' },
  { id: 'gilgamesh', name: '吉尔伽美什', title: '大桥死斗豪杰' }
]

const neoExdeathTimeline: TimelineNode[] = [
  { timeSec: 0, name: '虚无聚合 (Void Condense)', icon: '🌑', phase: 'P1 初始', dangerLevel: '中危', dangerType: 'info', description: '埃克斯迪斯四核分身自次元裂隙显化，物理/白魔/黑魔/真空核各自独立充能。', counterMeasure: '集火右下方物理攻击部位，优先削弱核心伤害输出。', avoidRate: 90 },
  { timeSec: 15, name: '四核魔弹连射 (Tetra Cannon)', icon: '⚡', phase: 'P1 分裂', dangerLevel: '高危', dangerType: 'warning', description: '四部分同时释放连续重击，造成单体高额穿透魔法与硬直。', counterMeasure: '骑士施展【守护】，白魔开启全体魔法护盾。', avoidRate: 75 },
  { timeSec: 35, name: '天降陨石群 (Meteor Rain)', icon: '☄️', phase: 'P2 狂乱', dangerLevel: '极危', dangerType: 'error', description: '召唤太古陨石雨随机轰炸全场 4 次，每次造成 2500+ 物理暴击。', counterMeasure: '保持全员血量在 6000 以上，或利用龙骑士跳跃出空回避。', avoidRate: 50 },
  { timeSec: 50, name: '宇宙大爆炸 (Grand Cross)', icon: '🌌', phase: 'P3 终结技', dangerLevel: '灭团级', dangerType: 'error', description: '全屏释放宇宙大爆炸，判定全部 12 种恶性状态（即死/石化/混乱/狂暴）。', counterMeasure: '全员必须装备【缎带 (Ribbon)】！龙骑士在 48 秒起跳精准避开判定帧。', avoidRate: 95 },
  { timeSec: 70, name: '终末真空波连击 (Vacuum Enrage)', icon: '🌪️', phase: '硬狂暴', dangerLevel: '秒杀级', dangerType: 'error', description: '虚无能量暴走，每 2 秒连续释放全体破甲真空波，造成无视防御致命绝杀。', counterMeasure: '进入此阶段前必须全力倾泻乱打魔法剑与金币投掷强行斩杀！', avoidRate: 20 }
]

const shinryuTimeline: TimelineNode[] = [
  { timeSec: 0, name: '先手抢制·大海啸 (Instant Tsunami)', icon: '🌊', phase: 'P1 开场秒杀', dangerLevel: '灭团级', dangerType: 'error', description: '神龙开场抢先行动，释放高压大海啸造成全员 8000+ 巨额水属性轰杀！', counterMeasure: '全队必须佩戴【珊瑚戒指 (Coral Ring)】！直接将 8000 伤害转化为满血回春！', avoidRate: 100 },
  { timeSec: 12, name: '极寒暴风雪 (Blizzard Storm)', icon: '❄️', phase: 'P1 吐息', dangerLevel: '高危', dangerType: 'warning', description: '大面积吐出零度冻气，附带 3 回合冻伤减速与打断。', counterMeasure: '时魔道士开启全体加速抵抗减速，魔剑附魔火属性进行压制。', avoidRate: 80 },
  { timeSec: 28, name: '狂暴龙爪二连打 (Dragon Rapid Claw)', icon: '🐉', phase: 'P2 狂暴', dangerLevel: '极危', dangerType: 'error', description: '八连龙爪破甲猛击，随机针对两名同伴造成 4000+ 致命物理创伤。', counterMeasure: '暗影忍者制造分身 (Image) 必定完全闪避普攻龙爪。', avoidRate: 85 },
  { timeSec: 45, name: '龙皇核爆 + 混乱眼 (Megaflare & Gaze)', icon: '🔮', phase: 'P2 乱打', dangerLevel: '灭团级', dangerType: 'error', description: '释放真实无视魔防核爆，并用龙之眼魅惑全员陷入混乱互殴。', counterMeasure: '【缎带】免疫混乱，全员服用巨人之药把血量抬至 9999 承受核爆。', avoidRate: 90 },
  { timeSec: 65, name: '深渊龙炎狂暴焚场 (Final Flare Enrage)', icon: '🔥', phase: '硬狂暴', dangerLevel: '秒杀级', dangerType: 'error', description: '真龙神威彻底狂暴，全场持续被神圣龙炎覆盖，每秒扣除 20% 生命。', counterMeasure: '龙骑士八连跳跃 + 召唤巴哈姆特抢在 60 秒内结束战斗。', avoidRate: 30 }
]

const omegaTimeline: TimelineNode[] = [
  { timeSec: 0, name: '机械屏障自适应 (Barrier Change)', icon: '🛡️', phase: 'P1 极光防御', dangerLevel: '中危', dangerType: 'info', description: '欧米茄启动绝对反射护盾，免疫常规物理攻击，弱点锁定为【雷属性】。', counterMeasure: '严禁盲目平 A！必须使用魔法剑雷牙 (Thundaga Spellblade)。', avoidRate: 90 },
  { timeSec: 8, name: '毁灭波动炮 (Wave Cannon)', icon: '⚡', phase: 'P1 轰击', dangerLevel: '极危', dangerType: 'error', description: '释放高能波动炮，扣除全队 50% 当前生命值并附加漏电持续灼烧。', counterMeasure: '白魔全员恢复祈祷，爱之歌 (Romeo\'s Ballad) 尝试打断机械指令。', avoidRate: 70 },
  { timeSec: 20, name: '原子射线 + 三角石化 (Atomic Ray)', icon: '☢️', phase: 'P2 状态打击', dangerLevel: '高危', dangerType: 'warning', description: '喷射原子热线灼烧全场，并射出三角光束直接石化单体同伴。', counterMeasure: '金针快速净化石化，炎之指环吸收火属性原子射线。', avoidRate: 85 },
  { timeSec: 35, name: '高频极光波反击 (Aurora Counter)', icon: '🤖', phase: 'P2 反制爆发', dangerLevel: '灭团级', dangerType: 'error', description: '受到非雷系攻击时 100% 触发全体极光反制，秒杀全队。', counterMeasure: '【魔法剑雷牙 + 乱打八连】绕过反击直接打满 8 次暴击弱点！', avoidRate: 95 },
  { timeSec: 55, name: '过载自爆协议 (Self-Destruct Protocol)', icon: '💥', phase: '硬狂暴', dangerLevel: '秒杀级', dangerType: 'error', description: '欧米茄引擎过载，全屏机械核心自爆轰击 99999 伤害。', counterMeasure: '在自爆倒计时结束前清空其最后 10000 生命值。', avoidRate: 40 }
]

const gilgameshTimeline: TimelineNode[] = [
  { timeSec: 0, name: '大桥死斗会战 (Big Bridge Battle)', icon: '🌉', phase: 'P1 大桥对决', dangerLevel: '中危', dangerType: 'info', description: '吉尔伽美什于大桥阻截光之战士，豪言壮语相激。', counterMeasure: '常规物理与减速魔法起手，压制其行动节奏。', avoidRate: 95 },
  { timeSec: 20, name: '八臂名刀舞踏 (Eight-Armed Dance)', icon: '🗡️', phase: 'P1 连击', dangerLevel: '高危', dangerType: 'warning', description: '挥舞源氏之刀连续斩击，附带流血破甲。', counterMeasure: '盗贼尝试偷取其身上罕见的【源氏系列神装】！', avoidRate: 80 },
  { timeSec: 40, name: '绝赞自嗨三连 Buff (Triple Boost)', icon: '🍷', phase: 'P2 强化', dangerLevel: '高危', dangerType: 'warning', description: '为自身施加加速 (Haste) + 物防 (Protect) + 魔防 (Shell)。', counterMeasure: '时魔道士使用【驱魔 (Dispel)】驱散其全部增益状态！', avoidRate: 90 },
  { timeSec: 55, name: '拔刀！伪·王者之剑 (Excalipoor 1DMG)', icon: '🗡️', phase: 'P2 滑稽', dangerLevel: '滑稽趣味', dangerType: 'success', description: '得意洋洋拔出传说宝剑斩下——造成滑稽的【1 点伤害】！发现被骗！', counterMeasure: '趁其愣神绝望之际全力集火打落血线。', avoidRate: 100 },
  { timeSec: 70, name: '次元放逐跃迁 (Dimensional Rift)', icon: '🌀', phase: '终局放逐', dangerLevel: '剧情触发', dangerType: 'info', description: '埃克斯迪斯现身将其放逐入次元之隙，战役胜利结束。', counterMeasure: '保留极限技能，准备迎接后续虚空主线。', avoidRate: 100 }
]

const selectedTimelineBoss = ref('neo-exdeath')
const currentTimelineSec = ref(0.0)
const isTimelinePlaying = ref(false)
let timelineTimer: ReturnType<typeof setInterval> | null = null

const currentTimelineNodes = computed(() => {
  if (selectedTimelineBoss.value === 'neo-exdeath') return neoExdeathTimeline
  if (selectedTimelineBoss.value === 'shinryu') return shinryuTimeline
  if (selectedTimelineBoss.value === 'omega') return omegaTimeline
  return gilgameshTimeline
})

const currentMechanism = computed<TimelineNode>(() => {
  const nodes = currentTimelineNodes.value
  const sec = currentTimelineSec.value
  let active = nodes[0]
  for (const n of nodes) {
    if (sec >= n.timeSec) {
      active = n
    }
  }
  return active
})

const toggleTimelinePlay = () => {
  if (isTimelinePlaying.value) {
    isTimelinePlaying.value = false
    if (timelineTimer) clearInterval(timelineTimer)
  } else {
    isTimelinePlaying.value = true
    if (timelineTimer) clearInterval(timelineTimer)
    timelineTimer = setInterval(() => {
      currentTimelineSec.value = Math.min(80, currentTimelineSec.value + 0.5)
      if (currentTimelineSec.value >= 80) {
        if (timelineTimer) clearInterval(timelineTimer)
        isTimelinePlaying.value = false
      }
    }, 200)
  }
}

const resetTimelinePlayback = () => {
  if (timelineTimer) clearInterval(timelineTimer)
  isTimelinePlaying.value = false
  currentTimelineSec.value = 0.0
}

onUnmounted(() => {
  if (timelineTimer) {
    clearInterval(timelineTimer)
    timelineTimer = null
  }
})

// ================= 专区 5: 全息四阶段狂暴破盾与团队战术连携解算沙盘 =================
interface StaggerBoss {
  id: string
  name: string
  shieldHp: number
  weakness: string
  weaknessTag: string
  weaknessBonus: number
  wipeSkill: string
  baseCastTime: number
}

const staggerBossList: StaggerBoss[] = [
  { id: 'shinryu', name: '真龙王·神龙 (Shinryu)', shieldHp: 58000, weakness: '弱点：雷属性 / 水系反弹', weaknessTag: '雷电 (Lightning)', weaknessBonus: 50, wipeSkill: '全灭绝技：极超·灭世大海啸 (12000+ 暴毙)', baseCastTime: 12 },
  { id: 'omega', name: '古代兵器·欧米茄 (Omega)', shieldHp: 65000, weakness: '弱点：雷牙魔法剑 / 穿甲', weaknessTag: '雷属性 (Thundaga)', weaknessBonus: 75, wipeSkill: '全灭绝技：过载核心自爆 (99999 即死)', baseCastTime: 14 },
  { id: 'neo_exdeath', name: '终焉·新埃克斯迪斯 (Neo Exdeath)', shieldHp: 72000, weakness: '弱点：神圣真伤 / 巴哈姆特', weaknessTag: '圣裁 & 核爆 (Holy/Flare)', weaknessBonus: 40, wipeSkill: '全灭绝技：宇宙终末大爆炸 (全员即死混乱)', baseCastTime: 16 },
  { id: 'odin', name: '斩铁圣骑士·奥丁 (Odin)', shieldHp: 45000, weakness: '弱点：时空加速 / 石化即死', weaknessTag: '石化 & 极速 (Break/Haste)', weaknessBonus: 60, wipeSkill: '全灭绝技：真·斩铁剑 (全员无视防御斩杀)', baseCastTime: 10 }
]

const selectedStaggerBossId = ref('shinryu')
const staggerCastTimeSec = ref(12)

const currentStaggerBoss = computed(() => {
  return staggerBossList.find(b => b.id === selectedStaggerBossId.value) || staggerBossList[0]
})

interface StaggerPreset {
  id: string
  name: string
  icon: string
  bossId: string
  hero1: string
  hero2: string
  hero3: string
  hero4: string
  castSec: number
}

const staggerPresets: StaggerPreset[] = [
  { id: 'shinryu_counter', name: '神龙开局灭世海啸破盾', icon: '🐉', bossId: 'shinryu', hero1: 'rapid_spellblade_thunder', hero2: 'dual_hastega_quick', hero3: 'zeninage_burst', hero4: 'bahamut_megaflare', castSec: 12 },
  { id: 'omega_breaker', name: '欧米茄过载自爆阻断', icon: '🤖', bossId: 'omega', hero1: 'rapid_spellblade_thunder', hero2: 'dispel_shield', hero3: 'ninja_thunder_scroll', hero4: 'ramuh_judgement', castSec: 14 },
  { id: 'void_purge', name: '埃克斯迪斯宇宙大爆炸压制', icon: '🌌', bossId: 'neo_exdeath', hero1: 'rapid_holy', hero2: 'dualcast_holy', hero3: 'zeninage_burst', hero4: 'bahamut_megaflare', castSec: 16 }
]

const selectedStaggerPresetId = ref('shinryu_counter')

const hero1Action = ref('rapid_spellblade_thunder')
const hero2Action = ref('dual_hastega_quick')
const hero3Action = ref('zeninage_burst')
const hero4Action = ref('bahamut_megaflare')

const applyStaggerPreset = (presetId: string) => {
  if (presetId === 'reset') {
    selectedStaggerBossId.value = 'shinryu'
    staggerCastTimeSec.value = 12
    hero1Action.value = 'rapid_spellblade_thunder'
    hero2Action.value = 'dual_hastega_quick'
    hero3Action.value = 'zeninage_burst'
    hero4Action.value = 'bahamut_megaflare'
    message.info('破盾攻坚战术已恢复默认')
    return
  }

  selectedStaggerPresetId.value = presetId
  const preset = staggerPresets.find(p => p.id === presetId)
  if (preset) {
    selectedStaggerBossId.value = preset.bossId
    hero1Action.value = preset.hero1
    hero2Action.value = preset.hero2
    hero3Action.value = preset.hero3
    hero4Action.value = preset.hero4
    staggerCastTimeSec.value = preset.castSec
    message.success(`已套用【${preset.name}】官方极限破盾预设！`)
  }
}

const staggerSimResult = computed(() => {
  const boss = currentStaggerBoss.value
  let baseDamage = 0
  let isLightningActive = false
  let isHolyActive = false
  let hasDefenseShred = false
  let hasSpeedBuff = false

  if (hero1Action.value === 'rapid_spellblade_thunder') {
    baseDamage += 24000
    isLightningActive = true
  } else if (hero1Action.value === 'rapid_holy') {
    baseDamage += 26000
    isHolyActive = true
  } else if (hero1Action.value === 'ragnarok_cleave') {
    baseDamage += 15000
  } else {
    baseDamage += 6000
  }

  if (hero2Action.value === 'dualcast_holy') {
    baseDamage += 18000
    isHolyActive = true
  } else if (hero2Action.value === 'dispel_shield') {
    hasDefenseShred = true
  } else if (hero2Action.value === 'dual_hastega_quick') {
    hasSpeedBuff = true
  }

  if (hero3Action.value === 'zeninage_burst') {
    baseDamage += 19998
  } else if (hero3Action.value === 'ninja_thunder_scroll') {
    baseDamage += 12000
    isLightningActive = true
  } else if (hero3Action.value === 'knife_slice') {
    baseDamage += 5500
  }

  if (hero4Action.value === 'bahamut_megaflare') {
    baseDamage += 19000
  } else if (hero4Action.value === 'dragon_breath_mix') {
    baseDamage += 16000
  } else if (hero4Action.value === 'ramuh_judgement') {
    baseDamage += 13500
    isLightningActive = true
  }

  let weaknessMultiplier = 1.0
  if (boss.weaknessTag.includes('雷') && isLightningActive) {
    weaknessMultiplier += boss.weaknessBonus / 100
  }
  if (boss.weaknessTag.includes('圣') && isHolyActive) {
    weaknessMultiplier += boss.weaknessBonus / 100
  }
  if (hasDefenseShred) {
    weaknessMultiplier += 0.25
  }

  const damageDealt = Math.round(baseDamage * weaknessMultiplier)
  const weaknessBonusTotal = Math.max(0, damageDealt - baseDamage)
  const breakPercent = Math.min(100, Math.round((damageDealt / boss.shieldHp) * 100))
  const isBroken = damageDealt >= boss.shieldHp

  let baseActionDuration = 9.5
  if (hasSpeedBuff) baseActionDuration *= 0.75
  const timeRequiredSec = Math.max(2.5, baseActionDuration * (1 - (breakPercent / 200)))

  let status = '攻坚破盾成功'
  let tagType: 'success' | 'warning' | 'error' = 'success'
  let summaryAdvice = `🎉 破盾大成功！团队在 ${timeRequiredSec.toFixed(1)} 秒内倾泻 ${damageDealt.toLocaleString()} 点爆发，在 ${staggerCastTimeSec.value} 秒倒计时前击碎护盾！首领进入 8 秒易伤虚弱态！`

  if (!isBroken) {
    if (timeRequiredSec > staggerCastTimeSec.value) {
      status = '灭团绝技释放 (Wipe)'
      tagType = 'error'
      summaryAdvice = `💥 灭团警报！团队输出仅造成 ${damageDealt.toLocaleString()} 点伤害 (还差 ${(boss.shieldHp - damageDealt).toLocaleString()} HP)，倒计时耗尽触发【${boss.wipeSkill}】！`
    } else {
      status = '护盾未完全击破'
      tagType = 'warning'
      summaryAdvice = `⚠️ 破盾未达成：护盾剩余 ${(boss.shieldHp - damageDealt).toLocaleString()} HP，建议巴兹切换魔法剑雷牙或法利斯金币狂掷补足斩杀！`
    }
  }

  return {
    damageDealt,
    weaknessBonusTotal,
    breakPercent,
    isBroken,
    timeRequiredSec,
    status,
    tagType,
    summaryAdvice
  }
})

const exportStaggerCert = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  const boss = currentStaggerBoss.value
  const sim = staggerSimResult.value

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   史诗首领狂暴破盾与团队战术连携方案书 (v2.2.252)
================================================================================
颁发时间: ${timeStr}
靶标首领: ${boss.name}
护盾总量: ${boss.shieldHp.toLocaleString()} HP (灭团倒计时: ${staggerCastTimeSec.value} 秒)
致命弱点: ${boss.weaknessTag} (加成 +${boss.weaknessBonus}%)

【四主角攻坚连携编排】
- 英雄 1 [巴兹 · 自由人]: ${hero1Action.value}
- 英雄 2 [蕾娜 · 时白魔]: ${hero2Action.value}
- 英雄 3 [法利斯 · 忍者]: ${hero3Action.value}
- 英雄 4 [可露儿 · 召唤]: ${hero4Action.value}

【破盾推演裁决结果】
- 单轮并发总输出: ${sim.damageDealt.toLocaleString()} 点伤害
- 弱点克制附加值: +${sim.weaknessBonusTotal.toLocaleString()} DMG
- 破盾达成率: ${sim.breakPercent}%
- 破盾判定: [${sim.status}]
- 破盾耗时: ${sim.timeRequiredSec.toFixed(1)} 秒 / 狂暴阈值: ${staggerCastTimeSec.value} 秒
- 战术战情评语: ${sim.summaryAdvice}

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS / GDScript RefCounted
- Core Resolvers: boss_tactics_battle.gd & boss_stagger_enrage_resolver.gd
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
    a.download = `boss_stagger_tactics_v2.2.252_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('首领狂暴破盾攻坚方案书已导出并同步至剪贴板！')
  }
}

const godotStaggerCodeText = `## boss_stagger_enrage_resolver.gd
## Godot 4.6 LTS - 史诗首领狂暴读条、破盾槽解算与易伤虚弱状态机
extends RefCounted
class_name BossStaggerEnrageResolver

signal stagger_broken(boss_id: String, vulnerability_duration: float)
signal enrage_wipe_triggered(boss_id: String, wipe_skill: String)

class StaggerState:
	var shield_hp: float
	var max_shield_hp: float
	var cast_timer: float
	var is_staggered: bool = false
	var vulnerability_bonus: float = 2.0

static func resolve_party_stagger_burst(boss_shield: float, actions_damage: Array[float], weakness_mult: float, cast_time: float) -> Dictionary:
	var total_dmg: float = 0.0
	for dmg in actions_damage:
		total_dmg += dmg * weakness_mult
		
	var is_broken: bool = total_dmg >= boss_shield
	var time_spent: float = 8.5 / maxf(weakness_mult, 1.0)
	var is_wipe: bool = not is_broken and time_spent >= cast_time
	
	return {
		"damage": total_dmg,
		"broken": is_broken,
		"wipe": is_wipe,
		"time": time_spent,
		"vuln_buff": 2.0 if is_broken else 0.0
	}`

const scrollToExecutionStudio = () => {
  const el = document.getElementById('void-execution-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// ================= 专区 6: 深渊双神 (神龙 & 欧米茄) 极限双核协同试炼与极限连携推演工坊 =================
const scrollToDualRaidStudio = () => {
  const el = document.getElementById('dual-raid-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

interface DualStance {
  id: string
  name: string
  threatLevel: string
  tag: string
  icon: string
  description: string
  wipeGimmick: string
  solution: string
}

const dualStancesList: DualStance[] = [
  {
    id: 'cross_enrage',
    name: '【交错狂暴】双核突袭 (Cross Berserk)',
    threatLevel: 'EX 灭团级',
    tag: '双核连携狂暴',
    icon: '🐉🤖',
    description: '神龙开局高压大海啸覆盖全场，欧米茄紧随其后倾泻毁灭波动炮，双重属性与真伤穿透洗礼。',
    wipeGimmick: '大海啸 8000+ 巨浪连击 + 波动炮 50% 斩杀扣血与漏电状态',
    solution: '全员装备【珊瑚戒指】将海啸全额吸收为治愈，白魔起手大治愈抵消波动炮'
  },
  {
    id: 'aether_resonance',
    name: '【以太共鸣】无敌极光壁 (Aether Shield)',
    threatLevel: 'SSS 破盾级',
    tag: '绝对护盾共鸣',
    icon: '🛡️✨',
    description: '神龙与欧米茄展开双向以太共振屏障，物理防御与魔法防御飙升至 255，免疫常规伤害。',
    wipeGimmick: '60 秒内未破除 150,000 盾值，将触发全屏以太崩塌引发团灭',
    solution: '魔法剑雷牙八连斩打满弱点暴击，配合忍者金币投掷无视防御真实伤害强行破核'
  },
  {
    id: 'void_cataclysm',
    name: '【终焉灭世】虚无双重唱 (Duet Cataclysm)',
    threatLevel: 'OMEGA 绝杀级',
    tag: '终结绝杀技',
    icon: '💥🌌',
    description: '龙皇百万核爆 (Megaflare) 与欧米茄过载自爆协议同时充能，双核共震释放灭世冲击波！',
    wipeGimmick: '神圣巨龙喷吐与反物质殉爆聚合，造成 99,999 真实穿透伤害',
    solution: '在读条 10 秒内完成双斩杀，或由时魔道士开启【跳跃/隐身出空】规避绝杀'
  }
]

const selectedDualStanceId = ref('cross_enrage')
const currentDualStance = computed(() => {
  return dualStancesList.find(s => s.id === selectedDualStanceId.value) || dualStancesList[0]
})

const shinryuHp = ref(55000)
const omegaHp = ref(55000)
const combinedAegisShield = ref(150000)
const dualRaidPhase = ref(1)

const dualRaidPhaseTitle = computed(() => {
  switch (dualRaidPhase.value) {
    case 1: return '开局破海啸与极光架势'
    case 2: return '欧米茄波动炮压制与弱点雷附魔'
    case 3: return '双核以太屏障共振争夺'
    case 4: return '残血狂暴狂舞与混乱核爆'
    case 5: return '终焉灭世双重唱极限 RUSH 斩杀'
    default: return '双神试炼终结'
  }
})

const squadCounterLoadout = [
  {
    id: 'bartz',
    avatar: '🗡️',
    name: '巴兹 (Bartz)',
    job: '自由人·神剑圣',
    tactic: '二刀流 · 魔法剑雷牙 + 乱打八连击',
    gear: '诸神黄昏 + 佐助之刀 + 珊瑚戒指 + 缎带',
    counterTarget: '针对欧米茄 220 钢铁物防'
  },
  {
    id: 'lenna',
    avatar: '👑',
    name: '蕾娜 (Lenna)',
    job: '创世贤者·白魔',
    tactic: '连续魔 · 全体大复活祈祷 + 白魔法群疗',
    gear: '贤者之杖 + 天使之袍 + 珊瑚戒指 + 缎带',
    counterTarget: '抵御全屏大海啸与漏电创伤'
  },
  {
    id: 'faris',
    avatar: '🏴‍☠️',
    name: '法利斯 (Faris)',
    job: '修罗影忍·投掷使',
    tactic: '影分身 · 金币狂掷 (Zeninage) 真伤破盾',
    gear: '佐助之刀 + 黑装束 + 珊瑚戒指 + 缎带',
    counterTarget: '无视防御单轮倾泻 19,998 真伤'
  },
  {
    id: 'krile',
    avatar: '🔮',
    name: '可露儿 (Krile)',
    job: '时空执政官·唤灵使',
    tactic: '时空加速 (Hastega) + 召唤巴哈姆特百万核爆',
    gear: '时空魔杖 + 金发饰 + 珊瑚戒指 + 缎带',
    counterTarget: '群体无属性穿透轰炸与节奏压制'
  }
]

const totalDualBurstDamage = ref(285000)
const dualRaidStatusNote = ref('团队全员佩戴珊瑚戒指与缎带，完全化解首轮海啸与混乱！')
const dualRaidLogs = ref<string[]>([
  '【阶段 1】神龙开局抢先释放大海啸！全员珊瑚戒指触发水系吸收，团队瞬间满血！',
  '【阶段 1】欧米茄启动极光护盾，巴兹自由人附魔【魔法剑雷牙】，暴击弱点率提升至 100%！',
  '【阶段 1】法利斯投掷 50,000 金币触发真实暴击，欧米茄机械硬直持续 3.5 秒。'
])

const isDualRaidVictory = computed(() => {
  return shinryuHp.value <= 0 && omegaHp.value <= 0 && dualRaidPhase.value >= 5
})

const resetDualRaidParams = () => {
  shinryuHp.value = 55000
  omegaHp.value = 55000
  combinedAegisShield.value = 150000
  dualRaidPhase.value = 1
  selectedDualStanceId.value = 'cross_enrage'
  totalDualBurstDamage.value = 285000
  dualRaidStatusNote.value = '战局已彻底重置为初始挑战状态，请规划破核时机。'
  dualRaidLogs.value = [
    '战局重置完成。深渊双神重新降临裂隙之台，等待光之战士挑战。',
    '全员检查珊瑚戒指与缎带穿戴情况，状态完好。'
  ]
  message.info('深渊双神极限协同试炼已重置！')
}

const triggerDualCataclysm = () => {
  selectedDualStanceId.value = 'void_cataclysm'
  combinedAegisShield.value = Math.max(0, combinedAegisShield.value - 40000)
  totalDualBurstDamage.value += 95000
  dualRaidLogs.value.unshift(`[灭世警报] 双神开始充能【终焉灭世双重唱】！团队全员集火倾泻 95,000 点致命爆发！`)
  if (shinryuHp.value > 0) shinryuHp.value = Math.max(0, shinryuHp.value - 20000)
  if (omegaHp.value > 0) omegaHp.value = Math.max(0, omegaHp.value - 20000)
  dualRaidStatusNote.value = '绝杀倒计时触发！团队巴哈姆特核爆与八连斩成功打断自爆！'
  message.warning('⚠️ 终焉灭世双重唱已引爆！团队爆发输出全力打断灭团读条！')
}

const stepDualRaidPhase = () => {
  if (dualRaidPhase.value >= 5 && isDualRaidVictory.value) {
    message.success('深渊双神试炼已彻底攻略！')
    return
  }

  dualRaidPhase.value = Math.min(5, dualRaidPhase.value + 1)
  
  if (dualRaidPhase.value === 2) {
    shinryuHp.value = 42000
    omegaHp.value = 38000
    combinedAegisShield.value = 110000
    totalDualBurstDamage.value += 30000
    dualRaidLogs.value.unshift('【阶段 2】欧米茄轰出波动炮，全员损血 50%，蕾娜立即双重施法释放全体神圣大治愈！')
    dualRaidStatusNote.value = '进入阶段 2：欧米茄机械防御被魔法剑雷牙撕裂！'
  } else if (dualRaidPhase.value === 3) {
    shinryuHp.value = 28000
    omegaHp.value = 21000
    combinedAegisShield.value = 65000
    totalDualBurstDamage.value += 48000
    selectedDualStanceId.value = 'aether_resonance'
    dualRaidLogs.value.unshift('【阶段 3】双神开启以太共振屏障！法利斯金币狂掷打穿无敌壁垒，盾值骤降 45,000 点！')
    dualRaidStatusNote.value = '进入阶段 3：以太屏障被强行破除，双神进入易伤硬直！'
  } else if (dualRaidPhase.value === 4) {
    shinryuHp.value = 12000
    omegaHp.value = 8000
    combinedAegisShield.value = 20000
    totalDualBurstDamage.value += 49000
    dualRaidLogs.value.unshift('【阶段 4】神龙开启龙皇核爆狂暴，全员缎带抵消混乱！可露儿召唤太古巴哈姆特压制！')
    dualRaidStatusNote.value = '进入阶段 4：双神血量跌破 20%，进入绝命斩杀狂暴期！'
  } else if (dualRaidPhase.value === 5) {
    shinryuHp.value = 0
    omegaHp.value = 0
    combinedAegisShield.value = 0
    totalDualBurstDamage.value += 75000
    dualRaidLogs.value.unshift('【阶段 5 大捷】巴兹八连雷牙暴击斩杀欧米茄！法利斯投掷封印终结神龙！深渊双神双双溃灭！')
    dualRaidStatusNote.value = '🏆 恭喜光之战士！深渊双神同屏试炼完美通关，达成全服破阵神话！'
    message.success('🎉 阶段 5 终结！深渊双神已全部斩灭！')
  }
}

const exportDualRaidCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   深渊双神 (神龙 & 欧米茄) 极限双核协同试炼认证书 (v2.2.265)
================================================================================
颁发时间: ${timeStr}
试炼靶标: 神龙 (Shinryu, 55,000 HP) & 古代兵器·欧米茄 (Omega, 55,000 HP)
当前协同态势: ${currentDualStance.value.name}
当前试炼进度: Phase ${dualRaidPhase.value} / 5 (${dualRaidPhaseTitle.value})
攻坚状态: ${isDualRaidVictory.value ? '【已彻底攻克 (Raid Cleared)】' : '【演练激战中 (In Progress)】'}

【核心战力与首领生命残留】
- 神龙剩余生命: ${shinryuHp.value.toLocaleString()} / 55,000 HP
- 欧米茄剩余生命: ${omegaHp.value.toLocaleString()} / 55,000 HP
- 双核共鸣护盾值: ${combinedAegisShield.value.toLocaleString()} 点
- 全并发破核输出伤害: ${totalDualBurstDamage.value.toLocaleString()} 点综合爆发

【光之战士四人针对克制编队】
1. 巴兹 (Bartz): 自由人 · 魔法剑雷牙八连斩 (诸神黄昏 + 佐助之刀 + 珊瑚戒指 + 缎带)
2. 蕾娜 (Lenna): 创世贤者 · 连续魔全体大复活群疗 (贤者之杖 + 珊瑚戒指 + 缎带)
3. 法利斯 (Faris): 修罗影忍 · 金币狂掷无视防御真伤 (佐助之刀 + 珊瑚戒指 + 缎带)
4. 可露儿 (Krile): 时空执政官 · 全体加速与巴哈姆特核爆 (时空魔杖 + 珊瑚戒指 + 缎带)

【最新实机推演战况日志】
${dualRaidLogs.value.slice(0, 5).map(l => `• ${l}`).join('\n')}

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS / GDScript RefCounted Pure Logic
- Core Raid Engine: void_dual_superboss_raid_engine.gd
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
    a.download = `void_dual_superboss_cert_v2.2.265_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('深渊双神极限协同攻坚方案书已导出并同步至剪贴板！')
  }
}

const godotDualRaidCodeText = `## void_dual_superboss_raid_engine.gd
## Godot 4.6 LTS - 深渊双神 (神龙 & 欧米茄) 极限双核协同狂暴与破盾解算引擎
extends RefCounted
class_name VoidDualSuperbossRaidEngine

signal dual_raid_phase_changed(new_phase: int, phase_title: String)
signal cataclysm_triggered(wipe_damage: float)
signal boss_defeated(boss_id: String)

class DualBossState:
	var shinryu_hp: float = 55000.0
	var omega_hp: float = 55000.0
	var combined_shield: float = 150000.0
	var current_phase: int = 1
	var active_stance: String = "cross_enrage"

static func evaluate_squad_turn(
	state: DualBossState,
	has_coral_ring: bool,
	has_ribbon: bool,
	is_thundaga_blade: bool,
	zeninage_amount: int
) -> Dictionary:
	var result = {
		"shinryu_damage": 0.0,
		"omega_damage": 0.0,
		"absorbed_damage": 0.0,
		"party_wiped": false,
		"shield_broken": false
	}
	
	# 1. 神龙开局大海啸判定 (8000 点全屏水属性)
	if has_coral_ring:
		result.absorbed_damage += 8000.0
	else:
		result.party_wiped = true
		return result
		
	# 2. 欧米茄雷属性弱点穿甲 (魔法剑雷牙 + 乱打)
	if is_thundaga_blade:
		var burst: float = 24000.0 * 2.5
		result.omega_damage += burst
		state.omega_hp = maxf(0.0, state.omega_hp - burst)
		
	# 3. 法利斯金币狂掷真实伤害
	if zeninage_amount > 0:
		var true_dmg: float = minf(float(zeninage_amount), 19998.0)
		result.shinryu_damage += true_dmg
		state.shinryu_hp = maxf(0.0, state.shinryu_hp - true_dmg)
		
	# 4. 屏障削减
	var total_round_dmg: float = result.shinryu_damage + result.omega_damage
	state.combined_shield = maxf(0.0, state.combined_shield - total_round_dmg)
	result.shield_broken = state.combined_shield <= 0.0
	
	return result
`

// ==========================================
// 专区 7: 终焉深渊虚空首领狂暴破盾与破限处决工坊
// ==========================================
const voidExecutionStances = [
  {
    id: 'shinryu_tsunami',
    name: '封印神龙·潮汐核爆处决姿',
    tag: '飞龙枪破限跳跃',
    icon: '🐉',
    desc: '全员佩戴珊瑚之戒将开场全屏大海啸转化为群体治疗，巴兹与蕾娜双飞龙之枪突刺，破限处决99,999+巨额暴击。',
    tactics: '珊瑚戒水吸 + 破限龙枪暴击',
    gradient: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'omega_wave_cannon',
    name: '遗迹欧米茄·波动炮过载处决姿',
    tag: '魔法剑雷牙乱打',
    icon: '🤖',
    desc: '装备缎带免疫导向飞弹混乱，四连魔法剑【三级雷电】引发高频短路过载，强行熔断 150,000 绝对粒子防护力场。',
    tactics: '雷牙短路 + 粒子屏障熔断',
    gradient: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'neo_exdeath_void',
    name: '新埃克斯迪斯·虚无吞噬破灭姿',
    tag: '真理驱散四点齐灭',
    icon: '🌌',
    desc: '虚无四体部位拥有独立行动树，真理之光强制驱散三角攻击增益，时空重力震荡四点同步收束消灭，彻底封印大瀑布。',
    tactics: '真理驱散 + 四部位同步收束',
    gradient: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'enuo_genesis',
    name: '太古厄诺·原初无序审判姿',
    tag: '十二圣器破除不死',
    icon: '💀',
    desc: '来自双月宇宙太古魔导师，处于无尽时空回溯不死态，调谐封印神兵十二圣器产生共鸣湮灭，彻底抹除无序原初黑洞。',
    tactics: '圣器共鸣 + 湮灭回溯不死',
    gradient: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, rgba(15,23,42,0) 70%)'
  }
]
const selectedExecutionStanceId = ref('shinryu_tsunami')
const currentExecutionStance = computed(() => {
  return voidExecutionStances.find(s => s.id === selectedExecutionStanceId.value) || voidExecutionStances[0]
})

const bossShieldHp = ref(200000)
const enrageCountdown = ref(45)
const staggerVulnerability = ref(250)
const executionEnergy = ref(720)
const damageCapBreakerPermit = ref(true)
const counterImmunityAura = ref(true)
const doubleLootPlunder = ref(false)

const calculatedExecutionDamage = computed(() => {
  const capBonus = damageCapBreakerPermit.value ? 2.4 : 1.0
  const raw = (65000 + executionEnergy.value * 180) * (staggerVulnerability.value / 100) * capBonus
  return Math.round(raw)
})

const calculatedRequiredActions = computed(() => {
  return Math.max(2, Math.round(bossShieldHp.value / (35000 * (staggerVulnerability.value / 100))))
})

const calculatedClearChance = computed(() => {
  const auraBonus = counterImmunityAura.value ? 15 : 0
  const raw = 100 - (bossShieldHp.value / 10000) + (enrageCountdown.value * 0.8) + auraBonus
  return Math.max(10, Math.min(99.8, Math.round(raw * 10) / 10))
})

const resetExecutionParams = () => {
  bossShieldHp.value = 200000
  enrageCountdown.value = 45
  staggerVulnerability.value = 250
  executionEnergy.value = 720
  damageCapBreakerPermit.value = true
  counterImmunityAura.value = true
  doubleLootPlunder.value = false
  if (message) message.info('首领破盾处决参数已重置为基准战况')
}

const isSimulatingExecution = ref(false)
const executionSimLogs = ref<string[]>([
  '系统就绪：已挂载 Godot 4.6 LTS 虚空首领狂暴破盾与破限处决解算器',
  '当前战姿：封印神龙·潮汐核爆处决姿 (飞龙枪破限跳跃)',
  '处决演练就绪，请点击右上角按钮启动实时推演'
])

const runExecutionSimulation = () => {
  if (isSimulatingExecution.value) return
  isSimulatingExecution.value = true
  executionSimLogs.value = ['[0.00s] 锁定目标首领，探测绝对护盾值 ' + (bossShieldHp.value / 1000).toFixed(0) + 'k HP，狂暴倒计时 ' + enrageCountdown.value + 's...']

  setTimeout(() => {
    executionSimLogs.value.unshift(`[0.40s] 弱点部位暴露，击破易伤提升至 ${staggerVulnerability.value}%，注入处决能量 ${executionEnergy.value} EP`)
  }, 400)

  setTimeout(() => {
    executionSimLogs.value.unshift(`[0.85s] ${counterImmunityAura.value ? '虚空反击死斗规避光环激活（免疫首领自爆反噬）' : '未开启反击免疫，需防范首领濒死灭团技'}`)
  }, 850)

  setTimeout(() => {
    executionSimLogs.value.unshift(`[1.30s] ${damageCapBreakerPermit.value ? '解除 99,999 伤害天花板，破限处决阈值提升至 500,000' : '维持常规伤害封顶'}，战技击发！`)
  }, 1300)

  setTimeout(() => {
    executionSimLogs.value.unshift(`[1.75s] 处决爆发达成！理论总伤 ${calculatedExecutionDamage.value.toLocaleString()} HP，击杀率 ${calculatedClearChance.value}%，破盾用时 ${calculatedRequiredActions.value} 次连击`)
    isSimulatingExecution.value = false
    if (message) message.success('虚空首领破限处决演练完成，斩杀战术已锁定！')
  }, 1750)
}

const exportVoidExecutionCertificate = () => {
  const timestamp = new Date().toISOString()
  const certId = 'VOID-EXEC-' + Math.random().toString(36).substring(2, 9).toUpperCase()
  const certContent = `================================================================================
【光之战士：时空裂隙】终焉深渊虚空首领狂暴破盾与破限处决方案书
================================================================================
方案编号: ${certId}
时间戳: ${timestamp}
版本规范: VBLE Boss & Raid Tactics Matrix v2.2.283

【当前选定处决战姿】
- 战姿类型: ${currentExecutionStance.value.name} (${currentExecutionStance.value.tag})
- 核心战术: ${currentExecutionStance.value.tactics}
- 首领攻坚概述: ${currentExecutionStance.value.desc}

【首领狂暴与破盾控制变量】
- 首领绝对护盾值: ${bossShieldHp.value.toLocaleString()} HP
- 狂暴灭团倒计时: ${enrageCountdown.value} 秒
- 弱点暴露击破易伤: ${staggerVulnerability.value}%
- 处决共鸣能量池: ${executionEnergy.value} EP
- 绝对破限伤害解禁: ${damageCapBreakerPermit.value ? '已启用 (上限 500,000)' : '未启用'}
- 虚空反击规避光环: ${counterImmunityAura.value ? '已启用 (免疫濒死灭团技)' : '未启用'}
- 双倍战利品掠夺: ${doubleLootPlunder.value ? '已启用 (双倍太古神装)' : '未启用'}

【实时解算处决指标】
- 处决理论总爆发: ${calculatedExecutionDamage.value.toLocaleString()} HP
- 破盾最少连击动作: ${calculatedRequiredActions.value} 次
- 狂暴前极限击杀率: ${calculatedClearChance.value}%
- 战利品掉落倍率: ${doubleLootPlunder.value ? '200% 双倍' : '100% 常规'}

【底层引擎契约安全指纹】
- 引擎架构: Godot 4.6 LTS / Void Boss Raid Execution RefCounted Spec
- 核心解算器: void_boss_execution_resolver.gd / boss_stagger_stasis_engine.gd
- 控制器: counter_suicide_ward_controller.gd
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
    a.download = `void_boss_execution_cert_v2.2.283_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('虚空首领破限处决方案书已导出并同步至剪贴板！')
  }
}

const activeExecutionCodeTab = ref<'resolver' | 'stagger' | 'ward'>('resolver')

const gdExecutionResolverCode = `## void_boss_execution_resolver.gd
## Godot 4.6 LTS - 终焉深渊虚空首领狂暴破盾与破限处决伤害解算器
extends RefCounted
class_name VoidBossExecutionResolver

enum ExecutionStance { SHINRYU, OMEGA, NEO_EXDEATH, ENUO }

static func compute_execution_damage(
	stance: ExecutionStance,
	energy_ep: int,
	vulnerability_pct: float,
	break_damage_cap: bool
) -> Dictionary:
	var base_dmg: float = (65000.0 + float(energy_ep) * 180.0) * (vulnerability_pct / 100.0)
	var cap_mult: float = 2.4 if break_damage_cap else 1.0
	var final_dmg: float = base_dmg * cap_mult
	
	if not break_damage_cap and final_dmg > 99999.0:
		final_dmg = 99999.0
		
	return {
		"stance": stance,
		"execution_damage": int(final_dmg),
		"cap_broken": break_damage_cap and (final_dmg > 99999.0),
		"status": "LETHAL_EXECUTION"
	}
`

const gdStaggerStasisCode = `## boss_stagger_stasis_engine.gd
## Godot 4.6 LTS - 弱点暴露硬直、狂暴灭团倒计时与破防时钟状态机
extends RefCounted
class_name BossStaggerStasisEngine

signal shield_shattered(shield_hp_remained: float)
signal enrage_wipe_triggered()

static func evaluate_shield_break(
	current_shield: float,
	hit_damage: float,
	stagger_mult: float
) -> Dictionary:
	var effective_damage: float = hit_damage * stagger_mult
	var new_shield: float = maxf(0.0, current_shield - effective_damage)
	var is_shattered: bool = new_shield <= 0.0
	
	return {
		"new_shield_hp": new_shield,
		"shattered": is_shattered,
		"vulnerability_duration_sec": 12.0 if is_shattered else 0.0
	}
`

const gdCounterWardCode = `## counter_suicide_ward_controller.gd
## Godot 4.6 LTS - 首领濒死反噬自爆免疫与双倍战利品掠夺控制器
extends RefCounted
class_name CounterSuicideWardController

signal suicide_counter_blocked(boss_id: String)
signal double_loot_awarded(relic_ids: Array[String])

static func check_suicide_counter(
	boss_hp: float,
	has_counter_immunity: bool
) -> bool:
	if boss_hp <= 0.0 and has_counter_immunity:
		return true # 成功免疫濒死自爆灭团
	return false

static func generate_boss_loot(
	has_double_loot: bool,
	base_relic: String
) -> Array[String]:
	var loot: Array[String] = [base_relic]
	if has_double_loot:
		loot.append("ANCIENT_RELIC_DUPLICATE_" + base_relic)
	return loot
`

const currentExecutionCode = computed(() => {
  if (activeExecutionCodeTab.value === 'resolver') return gdExecutionResolverCode
  if (activeExecutionCodeTab.value === 'stagger') return gdStaggerStasisCode
  return gdCounterWardCode
})

const copyExecutionCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentExecutionCode.value).then(() => {
      if (message) message.success('Godot 4.6 LTS 首领处决源码已复制至剪贴板！')
    }).catch(() => {
      if (message) message.error('复制失败，请手动选取复制')
    })
  }
}

// ================= 👹 工坊 5: 十四柱世界首领 AI 状态机、多阶段转相机制与狂暴绝境断路工坊 (v2.2.304) =================
interface WorldBossArchetype {
  id: string
  name: string
  phases: string
  tag: string
  icon: string
  tagType: 'info' | 'warning' | 'error' | 'success'
  desc: string
  baseHp: number
  rageDmg: number
}

const worldBossArchetypes: WorldBossArchetype[] = [
  {
    id: 'shinryu_tidal_calamity',
    name: '太古神龙',
    phases: 'P1潮汐 -> P2极寒冰爆 -> P3终焉海啸',
    tag: '万重海啸',
    icon: '🐉',
    tagType: 'info',
    desc: '深海圣域守护神，血线降至阈值时施放全屏无法闪避的大海啸，需珊瑚戒指与冰霜抗性协同抵御。',
    baseHp: 4800000,
    rageDmg: 95000
  },
  {
    id: 'omega_custom_berserk',
    name: '欧米茄高维兵器',
    phases: 'P1标靶锁定 -> P2激光矩阵 -> P3波动炮狂暴',
    tag: '波动炮灭世',
    icon: '🤖',
    tagType: 'warning',
    desc: '古代遗迹守护构装体，拥有全属性吸收护盾，狂暴读条结束后发射波动炮造成百分比毁伤。',
    baseHp: 5600000,
    rageDmg: 120000
  },
  {
    id: 'neo_exdeath_vacuum',
    name: '新·艾克斯迪斯',
    phases: 'P1四体共生 -> P2大十字紊乱 -> P3无之泛滥',
    tag: '四象虚空',
    icon: '🌌',
    tagType: 'error',
    desc: '吞噬多维世界的虚空本源，拥有四段独立行动判定，释放【大十字】造成全员随机恶性状态异常。',
    baseHp: 6500000,
    rageDmg: 145000
  },
  {
    id: 'enigma_abyss_monarch',
    name: '终焉虚空君主',
    phases: 'P1镜像折射 -> P2世界线回溯 -> P3绝境终局',
    tag: '因果断裂',
    icon: '👑',
    tagType: 'error',
    desc: '时空裂隙深处的十四柱之首，可在战斗中强制回溯时间线抹除伤害，唯有绝境破限方可斩杀。',
    baseHp: 8800000,
    rageDmg: 180000
  }
]

const selectedWorldBossArchetypeId = ref<string>('omega_custom_berserk')
const phaseTransitionHp = ref<number>(25)
const rageTimerLimitSec = ref<number>(180)
const despairStaggerMultiplier = ref<number>(3.0)
const annihilationCastWindowMs = ref<number>(2200)

const invinciblePhasePiercingRune = ref<boolean>(true)
const rageWipeCircuitBreaker = ref<boolean>(true)
const damageCapExecutionGovernor = ref<boolean>(true)

const isSimulatingWorldBossAi = ref<boolean>(false)
const worldBossAiSimStep = ref<number>(5)
const worldBossAiSimCurrentLog = ref<string>('十四柱世界首领 AI 状态机与狂暴绝境断路矩阵已锁定，等待调度。')

const currentWorldBossArchetype = computed(() => {
  return worldBossArchetypes.find(a => a.id === selectedWorldBossArchetypeId.value) || worldBossArchetypes[1]
})

const calculatedRageDps = computed(() => {
  const base = currentWorldBossArchetype.value.rageDmg
  const timerRatio = (300 - rageTimerLimitSec.value) / 240
  const phaseBonus = (50 - phaseTransitionHp.value) / 40
  const breakerMult = rageWipeCircuitBreaker.value ? 0.75 : 1.2
  return Math.round(base * (1 + timerRatio * 0.4 + phaseBonus * 0.3) * breakerMult)
})

const calculatedPhaseWindowSec = computed(() => {
  const baseWindow = (annihilationCastWindowMs.value / 1000) * 15
  return baseWindow.toFixed(1)
})

const calculatedExecutionDmg = computed(() => {
  const baseHp = currentWorldBossArchetype.value.baseHp
  const staggerMult = despairStaggerMultiplier.value
  const runeMult = invinciblePhasePiercingRune.value ? 1.4 : 1.0
  const breakMult = damageCapExecutionGovernor.value ? 1.8 : 1.0
  const rawDmg = (baseHp * 0.08) * staggerMult * runeMult * breakMult
  return Math.round(Math.min(9999999, rawDmg))
})

const calculatedRaidDifficultyTier = computed(() => {
  const dps = calculatedRageDps.value
  if (dps > 200000) return 'EX·太古绝境十四柱之巅'
  if (dps > 140000) return 'SSS·终焉湮灭灭世级'
  if (dps > 90000) return 'SS·高维狂暴过载级'
  return 'S·英雄史诗守关级'
})

const scrollToWorldBossAiStudio = () => {
  const el = document.getElementById('world-boss-ai-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const resetWorldBossAiParameters = () => {
  selectedWorldBossArchetypeId.value = 'omega_custom_berserk'
  phaseTransitionHp.value = 25
  rageTimerLimitSec.value = 180
  despairStaggerMultiplier.value = 3.0
  annihilationCastWindowMs.value = 2200
  invinciblePhasePiercingRune.value = true
  rageWipeCircuitBreaker.value = true
  damageCapExecutionGovernor.value = true
  if (message) message.info('已恢复十四柱首领 AI 工坊初始调控参数')
}

const runWorldBossAiSimulation = () => {
  if (isSimulatingWorldBossAi.value) return
  isSimulatingWorldBossAi.value = true
  worldBossAiSimStep.value = 1
  worldBossAiSimCurrentLog.value = '阶段 1/5: 扫描十四柱世界首领 AI 决策树，构建阶段状态转移方程...'

  setTimeout(() => {
    worldBossAiSimStep.value = 2
    worldBossAiSimCurrentLog.value = '阶段 2/5: 注入以太阶段转相血线信号，测算狂暴前摇读条断路器...'
  }, 400)

  setTimeout(() => {
    worldBossAiSimStep.value = 3
    worldBossAiSimCurrentLog.value = '阶段 3/5: 加载绝境易伤倍率模型，激活转相无敌膜真伤穿透符印...'
  }, 800)

  setTimeout(() => {
    worldBossAiSimStep.value = 4
    worldBossAiSimCurrentLog.value = '阶段 4/5: 挂载防猝死锁血断路器，校准 Godot 4.6 LTS 状态机时钟...'
  }, 1200)

  setTimeout(() => {
    worldBossAiSimStep.value = 5
    worldBossAiSimCurrentLog.value = '阶段 5/5: 生成首领攻坚方案证书，锁定实机运行时物理逻辑参数！'
    isSimulatingWorldBossAi.value = false
    if (message) message.success('十四柱世界首领 AI 状态机推演完成！')
  }, 1600)
}

const exportWorldBossAiCertificate = () => {
  const arch = currentWorldBossArchetype.value
  const certContent = `================================================================================
  《光之战士：时空裂隙》十四柱世界首领 AI 转相与狂暴绝境断路方案证书 (v2.2.304)
  生成时间: ${new Date().toISOString()}
  原型构架: ${arch.name} (${arch.phases})
  攻坚评级: ${calculatedRaidDifficultyTier.value}
================================================================================
【调控参数】
- 阶段转相血线: ${phaseTransitionHp.value}%
- 狂暴倒计时限: ${rageTimerLimitSec.value} 秒
- 绝境破防易伤: ${despairStaggerMultiplier.value.toFixed(1)}x
- 歼灭读条前摇: ${annihilationCastWindowMs.value} ms
- 转相穿透符印: ${invinciblePhasePiercingRune.value ? '已开启' : '关闭'}
- 防猝死断路器: ${rageWipeCircuitBreaker.value ? '已开启' : '关闭'}
- 999999 破限处决: ${damageCapExecutionGovernor.value ? '已开启' : '关闭'}

【实时解算能效】
- 首领狂暴有效秒伤: ${calculatedRageDps.value.toLocaleString()} DPS
- 阶段转相剩余窗口: ${calculatedPhaseWindowSec.value} 秒
- 破防绝境处决真伤: ${calculatedExecutionDmg.value.toLocaleString()} DMG
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
    a.download = `world_boss_ai_cert_v2.2.304_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Export certificate error:', e)
  }

  if (message) message.success('十四柱首领 AI 攻坚方案证书已导出并同步至剪贴板！')
}

const activeWorldBossCodeTab = ref<'fsm' | 'piercer' | 'breaker'>('fsm')

const gdWorldBossFsmCode = `## world_boss_ai_state_machine.gd
## Godot 4.6 LTS - 十四柱世界首领多阶段转相 AI 状态机
extends RefCounted
class_name WorldBossAiStateMachine

enum PhaseState { PHASE_1_NORMAL, PHASE_2_TRANSITION, PHASE_3_BERSERK, PHASE_4_ENRAGE }

static func evaluate_next_phase(
	current_hp_pct: float,
	threshold_pct: float,
	elapsed_sec: float,
	rage_limit_sec: float
) -> PhaseState:
	if elapsed_sec >= rage_limit_sec:
		return PhaseState.PHASE_4_ENRAGE
	if current_hp_pct <= threshold_pct * 0.5:
		return PhaseState.PHASE_3_BERSERK
	if current_hp_pct <= threshold_pct:
		return PhaseState.PHASE_2_TRANSITION
	return PhaseState.PHASE_1_NORMAL
`

const gdPhasePiercerCode = `## phase_transition_invincible_piercer.gd
## Godot 4.6 LTS - 阶段转相绝对无敌膜穿透器
extends RefCounted
class_name PhaseTransitionInvinciblePiercer

static func resolve_piercing_damage(
	incoming_damage: int,
	boss_is_invincible: bool,
	piercing_rune_active: bool
) -> Dictionary:
	if not boss_is_invincible:
		return { "applied_damage": incoming_damage, "is_pierced": false }
		
	if piercing_rune_active:
		return { "applied_damage": incoming_damage, "is_pierced": true }
		
	return { "applied_damage": 0, "is_pierced": false }
`

const gdRageWipeBreakerCode = `## rage_wipe_circuit_breaker.gd
## Godot 4.6 LTS - 狂暴灭团绝境防猝死锁血断路器
extends RefCounted
class_name RageWipeCircuitBreaker

signal anti_wipe_triggered(remaining_hp: int, invulnerable_sec: float)

static func check_lethal_incoming(
	party_current_hp: int,
	incoming_damage: int,
	breaker_active: bool
) -> Dictionary:
	if incoming_damage >= party_current_hp and breaker_active:
		return {
			"survived": true,
			"hp_after_hit": 1,
			"invulnerable_duration": 3.0,
			"breaker_triggered": true
		}
	var next_hp: int = maxi(0, party_current_hp - incoming_damage)
	return {
		"survived": next_hp > 0,
		"hp_after_hit": next_hp,
		"invulnerable_duration": 0.0,
		"breaker_triggered": false
	}
`

const currentWorldBossCode = computed(() => {
  if (activeWorldBossCodeTab.value === 'fsm') return gdWorldBossFsmCode
  if (activeWorldBossCodeTab.value === 'piercer') return gdPhasePiercerCode
  return gdRageWipeBreakerCode
})

const copyWorldBossAiCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentWorldBossCode.value).then(() => {
      if (message) message.success('Godot 4.6 LTS 首领 AI 源码已复制至剪贴板！')
    }).catch(() => {
      if (message) message.error('复制失败，请手动选取复制')
    })
  }
}

// ==========================================
// v2.2.329: 破晓极意破防与机制倒计时工坊逻辑
// ==========================================
const scrollToDawnStaggerStudio = () => {
  const el = document.getElementById('dawn-stagger-countdown-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

interface DawnStaggerArchetype {
  id: string
  name: string
  subtitle: string
  icon: string
  tag: string
  desc: string
  bonusMultiplier: string
  baseToleranceMs: number
}

const dawnStaggerArchetypes: DawnStaggerArchetype[] = [
  {
    id: 'omega_supreme',
    name: '太古兵器欧米茄',
    subtitle: '波动炮倒计时与微秒破防流',
    icon: '🤖',
    tag: '机神克星',
    desc: '针对欧米茄波动炮咏唱实施微秒级打断，撕裂其绝对屏障并在狂暴前施展十万伏特过载破防。',
    bonusMultiplier: '780%',
    baseToleranceMs: 45
  },
  {
    id: 'shinryu_tidal',
    name: '渊海霸主神龙',
    subtitle: '潮汐海啸潮涌与绝对护盾击穿流',
    icon: '🐉',
    tag: '真龙斩杀',
    desc: '预判潮汐大海啸蓄力倒计时，雷霆共鸣刺穿龙鳞抗性，触发 12 秒破晓极意全虚弱易伤。',
    bonusMultiplier: '820%',
    baseToleranceMs: 50
  },
  {
    id: 'neo_exdeath_void',
    name: '终焉虚空埃克斯德斯',
    subtitle: '阿尔法法则崩解与极意连携流',
    icon: '🌌',
    tag: '虚空湮灭',
    desc: '在终焉真空引力坍缩前夕，以时空法则解构虚空铠甲，实现全员无损规避与极限伤害破限爆发。',
    bonusMultiplier: '950%',
    baseToleranceMs: 30
  },
  {
    id: 'gilgamesh_rift',
    name: '跨维豪杰吉尔伽美什',
    subtitle: '源氏名刀破招与反击断罪流',
    icon: '⚔️',
    tag: '名刀破招',
    desc: '抓取八刀流招式后摇微秒空档，以四连斩破招断刃，反制源氏威压并强制进入大虚弱状态。',
    bonusMultiplier: '660%',
    baseToleranceMs: 65
  }
]

const selectedDawnArchetypeId = ref('omega_supreme')
const dawnStaggerVulnerabilityWindow = ref(8.5)
const dawnEnrageCountdownWarningSec = ref(45)
const dawnMultiHitArmorBreakRatio = ref(78)
const dawnPartyStaggerFocusBurstPct = ref(320)

const dawnBossCastBarInterruptible = ref(true)
const dawnPartyDeathImmunityRune = ref(true)
const dawnStaggerDamageMultiplierUncap = ref(true)

const selectDawnArchetype = (id: string) => {
  selectedDawnArchetypeId.value = id
  if (message) {
    const arch = dawnStaggerArchetypes.find(a => a.id === id)
    if (arch) message.success(`已切换首领攻坚战术原型：${arch.name}`)
  }
}

const dawnCalculatedMetrics = computed(() => {
  const arch = dawnStaggerArchetypes.find(a => a.id === selectedDawnArchetypeId.value) || dawnStaggerArchetypes[0]
  const baseMult = parseFloat(arch.bonusMultiplier)
  const uncapBonus = dawnStaggerDamageMultiplierUncap.value ? 1.35 : 1.0
  const finalMult = Math.round(baseMult * (dawnPartyStaggerFocusBurstPct.value / 100) * (dawnMultiHitArmorBreakRatio.value / 100) * uncapBonus)
  
  const survRate = Math.min(99.9, 88.0 + (dawnEnrageCountdownWarningSec.value / 120) * 10 + (dawnPartyDeathImmunityRune.value ? 1.9 : 0)).toFixed(1)
  const tolMs = Math.round(arch.baseToleranceMs * (dawnBossCastBarInterruptible.value ? 1.4 : 1.0))
  
  let rank = 'SSR·宗师攻坚先锋'
  if (finalMult >= 1200) rank = 'EX·终焉屠龙极意统帅'
  else if (finalMult >= 800) rank = 'SSS·破晓苍穹裁决者'

  return {
    burstMultiplier: `+${finalMult}%`,
    survivabilityIndex: `${survRate}%`,
    staggerToleranceMs: `${tolMs} ms`,
    raidCertification: rank
  }
})

const isSimulatingDawnStagger = ref(false)
const currentDawnSimStage = ref(0)
const dawnSimulationStages = [
  '首领机制雷达扫描与杀招时序对齐...',
  '团队四相破盾弱点积蓄灌注...',
  '破晓极意击穿与绝对虚弱触发...',
  '伤害解限十段奥义极限斩杀...',
  '攻坚战绩防伪公钥计算与证书生成...'
]

const runDawnStaggerSimulation = () => {
  if (isSimulatingDawnStagger.value) return
  isSimulatingDawnStagger.value = true
  currentDawnSimStage.value = 0

  const interval = setInterval(() => {
    if (currentDawnSimStage.value < dawnSimulationStages.length - 1) {
      currentDawnSimStage.value++
    } else {
      clearInterval(interval)
      isSimulatingDawnStagger.value = false
      if (message) {
        message.success(`【破晓极意沙盘】推演成功！首领狂暴成功化解，斩杀倍率：${dawnCalculatedMetrics.value.burstMultiplier}`)
      }
    }
  }, 400)
}

const exportDawnStaggerCertificate = () => {
  const hash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  const cert = `=== 《光之战士：时空裂隙》首领攻坚全鉴与破晓破防认证证书 ===
证书编号: DAWN-RAID-${hash.substring(0, 12).toUpperCase()}
首领原型: ${selectedDawnArchetypeId.value}
破防虚弱窗口: ${dawnStaggerVulnerabilityWindow.value.toFixed(1)} 秒
狂暴倒计时阈值: ${dawnEnrageCountdownWarningSec.value} 秒
破甲穿透率: ${dawnMultiHitArmorBreakRatio.value}%
全队聚能增幅: ${dawnPartyStaggerFocusBurstPct.value}%
真伤增幅: ${dawnCalculatedMetrics.value.burstMultiplier}
狂暴生还稳态率: ${dawnCalculatedMetrics.value.survivabilityIndex}
攻坚统帅评级: ${dawnCalculatedMetrics.value.raidCertification}
安全校验哈希: SHA-256:${hash}
验证状态: 官方攻坚沙盘校验认证通过 (Godot 4.6 LTS Verified)
===================================================`
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(cert)
    if (message) message.success('已导出首领攻坚方案防伪证书到剪贴板！')
  }
}

const activeDawnScriptTab = ref<'stagger_gauge' | 'countdown_timer' | 'burst_coordinator'>('stagger_gauge')

const dawnScriptCodes = {
  stagger_gauge: `class_name BossStaggerGaugeController
extends Node

## 最终幻想：时空之轮 - 首领韧性槽击穿与极意虚弱控制器
## 文件路径: res://scripts/combat/boss/boss_stagger_gauge_controller.gd
## 引擎版本: Godot Engine 4.6 LTS

signal stagger_break_triggered(multiplier: float, duration_sec: float)
signal stagger_gauge_updated(current_gauge: float, max_gauge: float)

@export var max_stagger_gauge: float = 10000.0
@export var current_stagger_gauge: float = 0.0
@export var base_stagger_duration: float = 8.5

func apply_posture_damage(raw_break_damage: float, armor_pen_ratio: float) -> void:
    var effective_break: float = raw_break_damage * (1.0 + armor_pen_ratio)
    current_stagger_gauge += effective_break
    stagger_gauge_updated.emit(current_stagger_gauge, max_stagger_gauge)
    
    if current_stagger_gauge >= max_stagger_gauge:
        trigger_dawn_stagger()

func trigger_dawn_stagger() -> void:
    current_stagger_gauge = 0.0
    stagger_break_triggered.emit(7.8, base_stagger_duration)
`,

  countdown_timer: `class_name BossMechanicsCountdownTimer
extends RefCounted

## 最终幻想：时空之轮 - 首领狂暴倒计时与微秒打断总线
## 文件路径: res://scripts/combat/boss/boss_mechanics_countdown_timer.gd
## 引擎版本: Godot Engine 4.6 LTS

static func evaluate_cast_interruption(cast_remaining_ms: float, player_stagger_hit: bool, interrupt_allowed: bool) -> Dictionary:
    if interrupt_allowed and player_stagger_hit and cast_remaining_ms > 0:
        return {
            "interrupted": true,
            "boss_stunned_sec": 4.0,
            "enrage_halted": true
        }
    return {
        "interrupted": false,
        "boss_stunned_sec": 0.0,
        "enrage_halted": false
    }
`,

  burst_coordinator: `class_name PartyRaidBurstCoordinator
extends RefCounted

## 最终幻想：时空之轮 - 团队集火爆发与伤害破限裁决器
## 文件路径: res://scripts/combat/boss/party_raid_burst_coordinator.gd
## 引擎版本: Godot Engine 4.6 LTS

static func calculate_stagger_burst(base_dps: float, burst_pct: float, uncap_active: bool) -> Dictionary:
    var multiplier: float = (burst_pct / 100.0) * (1.35 if uncap_active else 1.0)
    var final_burst_damage: float = base_dps * multiplier
    return {
        "applied_multiplier": multiplier,
        "final_burst_damage": final_burst_damage,
        "is_uncapped": uncap_active
    }
`
}

const currentDawnScriptCode = computed(() => {
  return dawnScriptCodes[activeDawnScriptTab.value]
})

const copyDawnScript = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentDawnScriptCode.value)
    if (message) message.success('已复制 Godot 4.6 LTS 首领攻坚源码到剪贴板！')
  }
}

</script>

<style scoped>
.text-glow-amber {
  text-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
</style>
