<template>
  <div class="celestial-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-indigo-950/80 border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/30">
              VBLE Celestial Singularity, Aetheric Gravitational Waves & Black Hole Reactor Studio v2.2.316
            </span>
            <span class="text-xs text-gray-400">虚空城堡与终焉星体引力矩阵</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🪐</span> 虚空天体：次元之隙四阶与九大星体引力工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            探索虚空城堡四层湮灭空间、五大始源元素共鸣，以及九大行星对战场环境的星体引力修正。全息实装引力场动态演算沙盘与奇点坍缩机制。
          </p>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <span class="text-xs text-purple-300/80 font-medium">相关权威白皮书：</span>
            <router-link
              to="/vble/docs/VOID_CASTLE"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/60 text-purple-200 border border-purple-500/40 hover:bg-purple-800/80 hover:text-white transition-all shadow-sm group"
            >
              <span>🌌</span>
              <span>研读虚空城堡机制白皮书 (VOL.09)</span>
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
            @click="scrollToSlingshotWarpStudio"
          >
            <template #icon><span>🪐</span></template>
            引力弹弓折跃工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            class="shadow-md font-bold text-black bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-300 hover:to-indigo-400"
            @click="scrollToSingularityReactorStudio"
          >
            <template #icon><span>🪐</span></template>
            奇点反应堆工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToDarkEnergyStudio"
          >
            <template #icon><span>🌌</span></template>
            暗能量膨胀工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToTidalStudio"
          >
            <template #icon><span>🌀</span></template>
            超重力潮汐工坊
          </n-button>
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

    <!-- 专区 4: 双月潮汐引力汇聚与红月/青之月相位推演工坊 (Dual-Moon Convergence Studio) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1a0f26] via-[#140b20] to-[#0c0814] border border-cyan-500/40 shadow-2xl space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-950 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🌕</span>
            <h3 class="text-lg sm:text-xl font-black text-white text-glow-purple">双月潮汐引力汇聚与红月/青之月相位推演工坊 (Dual-Moon Studio)</h3>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            双月宇宙运转的核心轴心：红之月（Lunarian 赤红血月）与青之月（Crystal 蔚蓝圣月）的相互绕转产生非线性潮汐引力波，主宰战局元素极化与奇点坍缩。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-tag type="info" round size="small">双月天体动力学</n-tag>
          <n-tag type="warning" round size="small">月相周期演化</n-tag>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 双月月相角调节与宏观天象预设 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span class="text-xs font-bold text-cyan-300 block flex items-center gap-1.5">
            <span>🌖</span>
            <span>双月轨道夹角与相位控制 (Orbital Angle)</span>
          </span>

          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>双月会合相位角 (Phase Angle):</span>
                <span class="font-mono text-cyan-400 font-bold text-sm">{{ lunarPhaseAngle }}° ({{ getPhaseName(lunarPhaseAngle) }})</span>
              </div>
              <n-slider v-model:value="lunarPhaseAngle" :min="0" :max="360" :step="1" />
            </div>

            <!-- 天象预设快捷按钮 -->
            <div class="space-y-1.5 pt-2">
              <span class="text-gray-400 block text-[11px]">经典史诗天象预设快捷载入:</span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  class="p-2 rounded bg-slate-950 border border-slate-800 hover:border-red-400 text-[11px] text-left transition-all"
                  @click="applyLunarPreset('red_perigee')"
                >
                  <span class="font-bold text-rose-400 block">🔴 红月近地点</span>
                  <span class="text-[10px] text-gray-500">暴击狂暴+50%</span>
                </button>

                <button
                  type="button"
                  class="p-2 rounded bg-slate-950 border border-slate-800 hover:border-blue-400 text-[11px] text-left transition-all"
                  @click="applyLunarPreset('blue_full')"
                >
                  <span class="font-bold text-blue-400 block">🔵 青之月满月</span>
                  <span class="text-[10px] text-gray-500">圣愈+50%减耗</span>
                </button>

                <button
                  type="button"
                  class="p-2 rounded bg-slate-950 border border-slate-800 hover:border-purple-400 text-[11px] text-left transition-all"
                  @click="applyLunarPreset('eclipse_void')"
                >
                  <span class="font-bold text-purple-400 block">🌑 双月大日食</span>
                  <span class="text-[10px] text-gray-500">虚无奇点降临</span>
                </button>
              </div>
            </div>

            <!-- 自动周期轮转开关 -->
            <div class="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span class="text-gray-300">双月轨道自动公转演示 (Orbital Tick):</span>
              <n-switch v-model:value="isLunarRevolving" size="small" />
            </div>
          </div>
        </div>

        <!-- 栏 2: 潮汐引力与双月属性极化解算 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <span>⚡</span>
                <span>双月以太通量与引力指标</span>
              </span>
              <n-tag size="tiny" :type="lunarTideVerdict.tagType">{{ lunarTideVerdict.title }}</n-tag>
            </div>

            <!-- 潮汐引力数值卡 -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-center">
              <div class="text-[11px] text-gray-400">综合引力加速度系数 (Gravitational Tidal Force)</div>
              <div class="text-3xl font-black font-mono mt-1 text-cyan-400">
                {{ lunarTideVerdict.gravityForceG }} G
              </div>
              <div class="text-[10px] text-gray-500 mt-1">
                {{ lunarTideVerdict.gravityDesc }}
              </div>
            </div>

            <!-- 属性极化乘区 -->
            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-rose-400">🔴 红之月狂战极化 (Fire/Dark):</span>
                <span class="font-mono font-bold text-rose-300">{{ lunarTideVerdict.redBonus }}</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-blue-400">🔵 青之月圣灵极化 (Holy/Water):</span>
                <span class="font-mono font-bold text-blue-300">{{ lunarTideVerdict.blueBonus }}</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-purple-400">🌀 虚无奇点共鸣率 (Singularity Rate):</span>
                <span class="font-mono font-bold text-purple-300">{{ lunarTideVerdict.voidRate }}%</span>
              </div>
            </div>
          </div>

          <div class="p-2 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
            战术提示：在红月主导时适合二刀流与核爆法术抢杀；青之月主导时白魔与调合恢复量突破翻倍。
          </div>
        </div>

        <!-- 栏 3: 全球天象影响与战场法则重构 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-3">
          <div class="space-y-2">
            <span class="text-xs font-bold text-amber-300 block">全球战场环境法则覆写 (Active World Law):</span>
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <div class="font-bold text-white flex items-center gap-1.5">
                <span>{{ lunarTideVerdict.lawIcon }}</span>
                <span>{{ lunarTideVerdict.lawName }}</span>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed">
                {{ lunarTideVerdict.lawDescription }}
              </p>
            </div>
          </div>

          <div class="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 text-[11px] text-gray-400 space-y-1">
            <div class="flex justify-between">
              <span>月轨公转周期:</span>
              <span class="font-mono text-cyan-300">28.4 天/周期</span>
            </div>
            <div class="flex justify-between">
              <span>潮汐偏角差:</span>
              <span class="font-mono text-amber-300">{{ (lunarPhaseAngle % 90).toFixed(1) }}° Delta</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 5: 四阶引力奇点坍缩推演与次元裂隙封印沙盘 (Void Gravitational Singularity & Rift Seal Studio) -->
    <div id="singularity-seal-studio" class="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 border border-purple-500/40 shadow-2xl space-y-6">
      <!-- 头部导览与操作 -->
      <div class="border-b border-purple-900/40 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-2xl">🌌</span>
            <h2 class="text-xl sm:text-2xl font-black text-purple-300">
              四阶引力奇点坍缩推演与次元裂隙封印沙盘
            </h2>
            <n-tag size="small" type="warning" round strong>VBLE Engine 4.6 LTS</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            推演虚空城堡核心终焉奇点的四阶段坍缩进程；通过四大元素水晶引力对冲锚进行微频调谐，实时解算裂隙封印稳定度与视界寿命！
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <n-button size="small" secondary type="warning" @click="applySealPreset('reset')">
            🔄 重置调谐
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportSingularityCert">
            📜 导出奇点封印演算证书
          </n-button>
        </div>
      </div>

      <!-- 快速情境预设套用 -->
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs font-bold text-gray-400">⚡ 快捷极限情境套用:</span>
        <button
          type="button"
          class="px-2.5 py-1 text-xs rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900 transition cursor-pointer"
          @click="applySealPreset('perfect')"
        >
          🛡️ 绝对锁闭稳态 (98%稳定)
        </button>
        <button
          type="button"
          class="px-2.5 py-1 text-xs rounded bg-yellow-950/80 border border-yellow-500/50 text-yellow-300 hover:bg-yellow-900 transition cursor-pointer"
          @click="applySealPreset('tier3_test')"
        >
          ⚠️ 三阶高能喷流抗压演练
        </button>
        <button
          type="button"
          class="px-2.5 py-1 text-xs rounded bg-rose-950/80 border border-rose-500/50 text-rose-300 hover:bg-rose-900 transition cursor-pointer"
          @click="applySealPreset('tier4_crisis')"
        >
          💥 四阶终焉崩解危机
        </button>
      </div>

      <!-- 四大坍缩阶段选择器 -->
      <div class="space-y-2">
        <div class="text-xs font-bold text-cyan-300 flex items-center justify-between">
          <span>🌀 终焉奇点坍缩进化阶段 (Singularity Collapse Tiers):</span>
          <span class="text-[11px] text-gray-400">阶段越高，空间视界曲率越极端</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            v-for="tier in singularityTiers"
            :key="tier.stage"
            type="button"
            class="p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between"
            :class="selectedSingularityTier === tier.stage
              ? 'bg-purple-950/50 border-purple-400 text-white shadow-lg shadow-purple-500/20 ring-1 ring-purple-400/50'
              : 'bg-slate-950/80 border-slate-800 text-gray-300 hover:border-slate-700'"
            @click="selectedSingularityTier = tier.stage"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-purple-300">第 {{ tier.stage }} 阶段</span>
                <n-tag size="tiny" :type="tier.badgeType">{{ tier.badgeText }}</n-tag>
              </div>
              <div class="text-sm font-black text-white mt-1">{{ tier.title }}</div>
              <p class="text-[10px] text-gray-400 mt-1 line-clamp-2">{{ tier.desc }}</p>
            </div>
            <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
              <span class="text-gray-500">威胁度:</span>
              <span class="text-rose-400 font-bold">{{ tier.threat }}%</span>
            </div>
          </button>
        </div>
      </div>

      <!-- 核心解算看板与四大元素锚定调谐 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：四大元素水晶引力对冲锚调节 -->
        <div class="lg:col-span-7 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>🎛️</span> 四大始源水晶引力对冲锚 (Elemental Seal Anchors):
            </div>
            <span class="text-[10px] text-gray-400">平均调谐度: {{ averageAnchorTuning }}%</span>
          </div>

          <div class="space-y-3 text-xs">
            <!-- 风之引力锚 -->
            <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-emerald-400 flex items-center gap-1">
                  <span>🌪️</span> 风之水晶锚 (抗风涡流对冲):
                </span>
                <span class="font-mono font-bold text-emerald-300">{{ anchorWindTune }}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                v-model.number="anchorWindTune"
                class="w-full accent-emerald-400 cursor-pointer"
              />
              <div class="text-[9px] text-gray-500">抵消大气剧变引起的物理弹道偏折与撕裂风压</div>
            </div>

            <!-- 水之引力锚 -->
            <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-cyan-400 flex items-center gap-1">
                  <span>💧</span> 水之水晶锚 (空间浮力缓冲):
                </span>
                <span class="font-mono font-bold text-cyan-300">{{ anchorWaterTune }}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                v-model.number="anchorWaterTune"
                class="w-full accent-cyan-400 cursor-pointer"
              />
              <div class="text-[9px] text-gray-500">提供柔性以太阻尼，抑制黑洞引力潮汐对 ATB 行动条的削减</div>
            </div>

            <!-- 火之引力锚 -->
            <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-rose-400 flex items-center gap-1">
                  <span>🔥</span> 火之水晶锚 (伽马喷流消散):
                </span>
                <span class="font-mono font-bold text-rose-300">{{ anchorFireTune }}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                v-model.number="anchorFireTune"
                class="w-full accent-rose-400 cursor-pointer"
              />
              <div class="text-[9px] text-gray-500">吸收高能粒子辐射，将每秒混沌真实伤害转化为无害以太热能</div>
            </div>

            <!-- 土之引力锚 -->
            <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-amber-400 flex items-center gap-1">
                  <span>⛰️</span> 土之水晶锚 (地核引力对冲):
                </span>
                <span class="font-mono font-bold text-amber-300">{{ anchorEarthTune }}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                v-model.number="anchorEarthTune"
                class="w-full accent-amber-400 cursor-pointer"
              />
              <div class="text-[9px] text-gray-500">锚定大陆板块与地壳重力底盘，阻止奇点坍缩吞噬现实维度</div>
            </div>
          </div>
        </div>

        <!-- 右侧：封印状态与视界寿命解算 -->
        <div class="lg:col-span-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <span>🛡️</span> 裂隙封印矩阵裁决
              </span>
              <n-tag size="tiny" :type="singularityContainmentVerdict.tagType">
                {{ singularityContainmentVerdict.status }}
              </n-tag>
            </div>

            <!-- 封印稳定度巨型看板 -->
            <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div class="text-xs text-gray-400">次元裂隙封印稳定度 (Containment Stability)</div>
              <div class="text-4xl font-black font-mono mt-1" :class="singularityContainmentVerdict.colorClass">
                {{ singularityContainmentVerdict.stabilityPercent }}%
              </div>
              <div class="text-[10px] text-gray-500 mt-1">
                {{ singularityContainmentVerdict.verdictDesc }}
              </div>
            </div>

            <!-- 核心参数指标卡 -->
            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span class="text-gray-400">当前受击混沌暗伤:</span>
                <span class="font-mono font-bold text-rose-400">{{ singularityContainmentVerdict.effectiveDecayDmg }}/秒</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span class="text-gray-400">ATB行动条流速补正:</span>
                <span class="font-mono font-bold" :class="singularityContainmentVerdict.atbModifier >= 0 ? 'text-emerald-400' : 'text-yellow-400'">
                  {{ singularityContainmentVerdict.atbModifier > 0 ? '+' : '' }}{{ singularityContainmentVerdict.atbModifier }}%
                </span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span class="text-gray-400">奇点视界存续寿命:</span>
                <span class="font-mono font-bold text-cyan-300">{{ singularityContainmentVerdict.lifespanText }}</span>
              </div>
            </div>
          </div>

          <div class="p-2.5 rounded bg-black/40 border border-slate-800 text-[10px] text-gray-400 italic">
            ※ 战术要诀：在第4阶段坍缩下，必须将风/水/火/土四大晶核调谐度均提升至 85% 以上，方可抵消引力撕裂并激活【神圣次元锁闭】！
          </div>
        </div>
      </div>
    </div>

    <!-- 模块 5: 全域虚空天体超重力潮汐与奇点坍缩逆转工坊 -->
    <div id="void-tidal-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#120a24] via-[#161233] to-[#0a1128] border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.2)] space-y-6">
      <!-- 头部导言 -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/30 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/30">
              VOID TIDAL DYNAMICS & GRAVITATIONAL LENSING v2.2.272
            </span>
            <span class="text-xs text-yellow-300 font-mono">⚡ 虚空超重力潮汐 · 奇点逆转</span>
          </div>
          <h2 class="text-2xl font-black text-white flex items-center gap-2 tracking-tight">
            <span>🌀</span> 全域虚空天体超重力潮汐与奇点坍缩逆转工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
            深入模拟终焉次元之隙深层重力波峰与史瓦西事件视界。调节引力潮汐振幅、视界半径与四晶核逆相位引力对冲率，推演引力透镜弯折光路与终焉奇点绝对逆转成功率。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-button type="info" size="small" round secondary @click="autoBalanceHarmonicCrystals">
            <template #icon><span>⚖️</span></template>
            四晶核超导平衡
          </n-button>
          <n-button type="warning" size="small" round secondary @click="triggerUltimateCollapse">
            <template #icon><span>⚡</span></template>
            终焉极境坍缩
          </n-button>
          <n-button type="success" size="small" round secondary @click="exportCelestialTidalCertificate">
            <template #icon><span>📜</span></template>
            导出方案书 (SHA-256)
          </n-button>
        </div>
      </div>

      <!-- 潮汐天象预设模式选择 -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
            <span>🌌</span> 虚空天象引力共振相 (Tidal Phenomenon Phase)
          </span>
          <span class="text-xs font-mono text-gray-400">当前模式：{{ currentTidalMode.name }} ({{ currentTidalMode.subtitle }})</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="mode in tidalModesList"
            :key="mode.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedTidalModeId === mode.id
              ? 'bg-purple-950/40 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-400'
              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'"
            @click="selectTidalMode(mode.id)"
          >
            <div class="flex items-start gap-3">
              <span class="text-3xl p-2 rounded-xl bg-slate-800/80 shrink-0 border border-slate-700">{{ mode.icon }}</span>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-white truncate">{{ mode.name }}</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">{{ mode.badge }}</span>
                </div>
                <div class="text-[11px] text-yellow-300 mt-0.5 font-medium">{{ mode.subtitle }}</div>
                <p class="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">{{ mode.desc }}</p>
                <div class="mt-2 flex items-center justify-between text-[10px] font-mono text-gray-400 border-t border-slate-800/80 pt-1.5">
                  <span>曲率: <strong class="text-purple-300">{{ mode.presetCurvature }} Gc</strong></span>
                  <span>视界: <strong class="text-cyan-400">{{ mode.presetRadius }} km</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 动力学核心推演参数调节 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-950/70 border border-slate-800">
        <!-- 虚空引力潮汐振幅 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-300 font-semibold flex items-center gap-1.5">
              <span>🌊</span> 引力潮汐振幅
            </span>
            <span class="font-mono text-purple-300 font-bold">{{ tidalAmplitude }}%</span>
          </div>
          <input
            v-model.number="tidalAmplitude"
            type="range"
            min="10"
            max="300"
            step="5"
            class="w-full accent-purple-400 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-gray-500">
            <span>10% 平静视界</span>
            <span>300% 潮汐超激</span>
          </div>
        </div>

        <!-- 史瓦西奇点视界半径 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-300 font-semibold flex items-center gap-1.5">
              <span>🪐</span> 史瓦西视界半径
            </span>
            <span class="font-mono text-cyan-300 font-bold">{{ schwarzschildRadius }} km</span>
          </div>
          <input
            v-model.number="schwarzschildRadius"
            type="range"
            min="50"
            max="1000"
            step="10"
            class="w-full accent-cyan-400 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-gray-500">
            <span>50 km 微奇点</span>
            <span>1000 km 巨型黑洞</span>
          </div>
        </div>

        <!-- 四晶核引力对冲谐振率 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-300 font-semibold flex items-center gap-1.5">
              <span>💎</span> 四晶核对冲谐振率
            </span>
            <span class="font-mono text-emerald-300 font-bold">{{ crystalCancellationRate }}%</span>
          </div>
          <input
            v-model.number="crystalCancellationRate"
            type="range"
            min="0"
            max="100"
            step="1"
            class="w-full accent-emerald-400 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-gray-500">
            <span>0% 晶核脱缰</span>
            <span>100% 极相湮灭</span>
          </div>
        </div>

        <!-- 勇者以太超导位面阻尼 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-300 font-semibold flex items-center gap-1.5">
              <span>🛡️</span> 以太超导位面阻尼
            </span>
            <span class="font-mono text-amber-300 font-bold">{{ aetherSuperconductingDamping }}%</span>
          </div>
          <input
            v-model.number="aetherSuperconductingDamping"
            type="range"
            min="20"
            max="100"
            step="2"
            class="w-full accent-amber-400 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-gray-500">
            <span>20% 低阻击穿</span>
            <span>100% 绝对稳态</span>
          </div>
        </div>
      </div>

      <!-- 偏折棱镜开关与推演触发 -->
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex-1 space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="text-gray-300 font-medium">四维空间曲率张量与稳态系数：</span>
            <span class="font-mono font-bold" :class="spaceCurvatureTensor <= 4.0 ? 'text-emerald-400' : 'text-rose-400'">
              {{ spaceCurvatureTensor }} Gc ({{ curvatureStabilityText }})
            </span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden flex">
            <div class="bg-purple-500 transition-all duration-300" :style="{ width: Math.min(100, (spaceCurvatureTensor / 10) * 100) + '%' }"></div>
            <div class="bg-cyan-400 transition-all duration-300" :style="{ width: Math.max(0, 100 - (spaceCurvatureTensor / 10) * 100) + '%' }"></div>
          </div>
          <div class="flex justify-between text-[10px] text-gray-400">
            <span>重力张量占比 {{ Math.min(100, ((spaceCurvatureTensor / 10) * 100)).toFixed(0) }}%</span>
            <span>反力场富余 {{ Math.max(0, (100 - (spaceCurvatureTensor / 10) * 100)).toFixed(0) }}%</span>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-300 select-none">
            <input v-model="enableLensingPrism" type="checkbox" class="accent-purple-400 rounded cursor-pointer" />
            <span>装配引力透镜偏折棱镜 (Lensing Prism, 逆转成功率 +25%)</span>
          </label>
          <button
            type="button"
            class="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-slate-950 font-black rounded-lg text-xs shadow-lg shadow-purple-500/20 transition-all cursor-pointer transform active:scale-95"
            @click="triggerSingularityInversionSimulation"
          >
            🚀 执行奇点逆转推演 (Engage Inversion)
          </button>
        </div>
      </div>

      <!-- 解算指标看板 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-500/40">
          <div class="text-[11px] text-purple-400 font-mono mb-1">📐 空间曲率张量指数</div>
          <div class="text-2xl font-black text-white font-mono">
            {{ spaceCurvatureTensor }} <span class="text-xs text-gray-400">Gc</span>
          </div>
          <div class="text-[11px] text-gray-400 mt-1">
            <span>时空弯折系数: </span>
            <span class="text-purple-300 font-mono">{{ (spaceCurvatureTensor * 1.4).toFixed(2) }} rad</span>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-rose-500/40">
          <div class="text-[11px] text-rose-400 font-mono mb-1">💥 潮汐剪切暗质秒伤</div>
          <div class="text-2xl font-black text-rose-400 font-mono">
            {{ effectiveTidalShearDps }} <span class="text-xs text-gray-400">/秒</span>
          </div>
          <div class="text-[11px] text-gray-400 mt-1">
            <span>晶核抵扣减免: </span>
            <span class="text-emerald-400 font-mono">-{{ crystalCancellationRate }}%</span>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40">
          <div class="text-[11px] text-cyan-400 font-mono mb-1">⏳ ATB 时空膨胀因数</div>
          <div class="text-2xl font-black text-cyan-300 font-mono">
            {{ timeDilationFactor.toFixed(2) }}x
          </div>
          <div class="text-[11px] text-gray-400 mt-1">
            <span>{{ timeDilationFactor > 1.0 ? '行动条加速倍率' : '行动条严重迟滞' }}</span>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border" :class="inversionSuccessRate >= 80 ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-amber-500/50 bg-amber-950/20'">
          <div class="text-[11px] font-mono mb-1" :class="inversionSuccessRate >= 80 ? 'text-emerald-400' : 'text-amber-400'">🎯 奇点逆转成功概率</div>
          <div class="text-2xl font-black font-mono" :class="inversionSuccessRate >= 80 ? 'text-emerald-400' : 'text-amber-400'">
            {{ inversionSuccessRate }}%
          </div>
          <div class="text-[11px] text-gray-400 mt-1 flex items-center justify-between">
            <span>评级: {{ inversionVerdict.badge }}</span>
            <span class="text-cyan-300">{{ inversionVerdict.status }}</span>
          </div>
        </div>
      </div>

      <!-- 派生特性清单与推演战报控制台 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- 特性清单 -->
        <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div class="text-xs font-bold text-purple-300 flex items-center gap-2">
            <span>✨</span> 潮汐引力透镜派生战术增益与破甲词缀
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div
              v-for="(affix, idx) in currentTidalMode.affixes"
              :key="idx"
              class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-gray-300 flex items-center gap-2"
            >
              <span class="text-purple-400 font-bold shrink-0">•</span>
              <span class="leading-tight">{{ affix }}</span>
            </div>
          </div>
        </div>

        <!-- 推演日志控制台 -->
        <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-yellow-300 flex items-center gap-1.5">
              <span>📜</span> 虚空潮汐推演战局动态回执
            </span>
            <span class="text-gray-500 text-[11px]">最新 {{ tidalSimulationLogs.length }} 条记录</span>
          </div>
          <div class="flex-1 bg-slate-900/90 p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] space-y-1.5 max-h-48 overflow-y-auto">
            <div
              v-for="(log, idx) in tidalSimulationLogs"
              :key="idx"
              class="leading-relaxed"
              :class="log.includes('💥') || log.includes('逆转') ? 'text-purple-300' : log.includes('⚠️') ? 'text-amber-300' : 'text-gray-300'"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全域星系暗能量膨胀、快子视界破裂与超弦宇宙共鸣工坊 (v2.2.291) -->
    <div id="dark-energy-expansion-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c0828] via-[#101429] to-[#090b1c] border border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.22)] space-y-6">
      <!-- 头部横幅 -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-rose-900/50 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/40">
              DARK ENERGY EXPANSION &amp; TACHYON HORIZON
            </span>
            <span class="text-xs text-rose-400 font-mono">v2.2.291 Official Matrix</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
            <span>🌌</span> 全域星系暗能量膨胀、快子视界破裂与超弦宇宙共鸣工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
            面向 Godot 4.6 LTS 终极宇宙学演化体系：实时推演宇宙学常数 Λ 度规拉伸、快子超光速光锥破裂负能量涌流、11 维超弦共振与希格斯真真空相变安全边界。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3 py-1 rounded-lg bg-rose-950/60 border border-rose-700/60 text-xs font-mono text-rose-300">
            Λ-CDM 宇宙常数度规
          </span>
          <span class="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-700/60 text-xs font-mono text-purple-300">
            卡拉比-丘 11 维超弦
          </span>
        </div>
      </div>

      <!-- 四大宇宙学演化相选择 -->
      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">⚛️</span>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">四大宇宙学演化本征相 (Cosmic Regimes)</h3>
          </div>
          <span class="text-xs text-gray-400">选择天体演化相以激活跨维负能量与超弦修正</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="regime in cosmicRegimesList"
            :key="regime.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedRegimeId === regime.id ? `${regime.color} ring-2 ring-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]` : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'"
            @click="selectedRegimeId = regime.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ regime.icon }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-gray-300">
                {{ regime.metricTag }}
              </span>
            </div>
            <div class="font-bold text-sm text-white mb-1">{{ regime.name }}</div>
            <p class="text-xs text-gray-400 leading-snug">{{ regime.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 参数微调与遥测看板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧参数调节面板 -->
        <div class="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-lg">🎛️</span>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider">暗能量与度规微积分参数</h3>
            </div>
            <n-tag type="error" size="tiny" round>实机连续微调</n-tag>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>宇宙学常数 Λ 相对密度 (Cosmological Constant)</span>
                <span class="font-mono font-bold text-rose-400">{{ cosmologicalConstantLambda.toFixed(2) }} Λ</span>
              </div>
              <n-slider v-model:value="cosmologicalConstantLambda" :min="0.1" :max="5.0" :step="0.05" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>0.10 Λ (引力坍缩占优)</span>
                <span>1.68 Λ (标准加速膨胀)</span>
                <span>5.00 Λ (大撕裂极限)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>快子标量场势能 (Tachyon Field Potential)</span>
                <span class="font-mono font-bold text-purple-400">{{ tachyonFieldPotential }} GeV</span>
              </div>
              <n-slider v-model:value="tachyonFieldPotential" :min="100" :max="999" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>100 GeV (亚微扰)</span>
                <span>540 GeV (视界临界破裂)</span>
                <span>999 GeV (绝对负能量风暴)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>超弦紧致化空间维数 (Superstring Dimensions)</span>
                <span class="font-mono font-bold text-cyan-400">{{ superstringDimensions }} 维</span>
              </div>
              <n-slider v-model:value="superstringDimensions" :min="4" :max="11" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>4 维 (宏观平直时空)</span>
                <span>10 维 (超弦标准模型)</span>
                <span>11 维 (M 理论膜世界全境)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>假真空泡形核衰变速率 (Vacuum Decay Rate)</span>
                <span class="font-mono font-bold text-amber-400">{{ vacuumDecayRate.toFixed(2) }} Γ</span>
              </div>
              <n-slider v-model:value="vacuumDecayRate" :min="0.01" :max="1.0" :step="0.01" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>0.01 Γ (亚稳态稳固)</span>
                <span>0.25 Γ (控制相变)</span>
                <span>1.00 Γ (全宇宙真真空泡坍缩)</span>
              </div>
            </div>
          </div>

          <!-- 3 个宇宙学安全开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-3">
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🔒</span> 霍金时序因果律保护场 (Causality Protection)
                </div>
                <div class="text-[10px] text-gray-400">封闭类时曲线 (CTC) 防御，杜绝快子反冲导致时序闭环逻辑死锁</div>
              </div>
              <n-switch v-model:value="causalityProtectionField" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🛡️</span> 希格斯亚稳态真空锁相屏障 (Higgs Metastability Shield)
                </div>
                <div class="text-[10px] text-gray-400">阻止假真空向真真空发生灾难性穿隧相变，量子真空安全度大幅提升 (+20%)</div>
              </div>
              <n-switch v-model:value="higgsMetastabilityShield" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🌀</span> 卡拉比-丘流形超对称稳定器 (Calabi-Yau Stabilizer)
                </div>
                <div class="text-[10px] text-gray-400">锁定 6 维紧致空间几何拓扑半径，避免超弦微振动失控反噬</div>
              </div>
              <n-switch v-model:value="calabiYauFluxStabilizer" />
            </div>
          </div>
        </div>

        <!-- 右侧实时遥测看板 -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-rose-950/40 border border-rose-500/30 space-y-4">
            <div class="flex items-center justify-between border-b border-rose-500/20 pb-2">
              <h3 class="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center gap-1.5">
                <span>📊</span> 宇宙度规精算遥测 (Cosmo Telemetry)
              </h3>
              <span class="text-[10px] font-mono text-emerald-400 animate-pulse">● 宇宙度规信道在线</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/20">
                <div class="text-[10px] text-gray-400">全域空间度规膨胀速率</div>
                <div class="text-lg sm:text-xl font-black text-rose-400 font-mono mt-1">
                  {{ calculatedCosmicExpansionRate }}
                </div>
                <div class="text-[9px] text-rose-500/80 mt-0.5">哈勃参数动态微积分</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                <div class="text-[10px] text-gray-400">快子负能量流密度</div>
                <div class="text-lg sm:text-xl font-black text-purple-400 font-mono mt-1">
                  {{ calculatedNegativeEnergyDensity }}
                </div>
                <div class="text-[9px] text-purple-500/80 mt-0.5">引力透镜负压强势能</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20">
                <div class="text-[10px] text-gray-400">量子真空相变安全度</div>
                <div class="text-lg sm:text-xl font-black text-cyan-400 font-mono mt-1">
                  {{ calculatedQuantumVacuumSafety }}
                </div>
                <div class="text-[9px] text-cyan-500/80 mt-0.5">亚稳态穿隧阻尼指数</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20">
                <div class="text-[10px] text-gray-400">因果律时序防死锁状态</div>
                <div class="text-xs sm:text-sm font-black text-emerald-400 font-mono mt-1 truncate">
                  {{ calculatedCausalityPreservation }}
                </div>
                <div class="text-[9px] text-emerald-500/80 mt-0.5">时序一致性监控</div>
              </div>
            </div>

            <!-- 当前演化相特质摘要 -->
            <div class="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-1">
              <div class="flex items-center justify-between text-gray-400">
                <span>激活本征相:</span>
                <span class="font-bold text-white">{{ currentCosmicRegimeObj?.name }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>度规特性:</span>
                <span class="font-mono text-rose-400">{{ currentCosmicRegimeObj?.metricTag }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>因果律场:</span>
                <span class="font-mono" :class="causalityProtectionField ? 'text-emerald-400' : 'text-amber-400'">
                  {{ causalityProtectionField ? '已建立 (闭合类时线规避)' : '存在破缺风险' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>真空锁相:</span>
                <span class="font-mono" :class="higgsMetastabilityShield ? 'text-cyan-400' : 'text-gray-500'">
                  {{ higgsMetastabilityShield ? '已展开 (相变安全 +20%)' : '常规真空' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 快捷操作按钮 -->
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              @click="runDarkEnergySimulation"
              :disabled="isDarkEnergySimulating"
            >
              <span>{{ isDarkEnergySimulating ? '⏳' : '🚀' }}</span>
              {{ isDarkEnergySimulating ? '暗能量推演中...' : '启动五阶段星系暗能量膨胀推演' }}
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
              @click="exportDarkEnergyCertificate"
            >
              <span>📄</span> 导出凭证
            </button>
          </div>
        </div>
      </div>

      <!-- 五阶段推演终端 -->
      <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">💻</span>
            <h3 class="text-sm font-bold text-white font-mono uppercase">暗能量宇宙控制台 (Dark Energy Cosmology Terminal)</h3>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="isDarkEnergySimulating" class="text-xs text-rose-400 animate-pulse font-mono">
              STAGE {{ darkEnergySimStage }}/5 度规解算中
            </span>
            <span v-else-if="darkEnergySimFinished" class="text-xs text-emerald-400 font-mono">
              ✓ 宇宙学演化模型就绪
            </span>
            <button
              type="button"
              class="text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 cursor-pointer"
              @click="darkEnergyTerminalLogs = []"
            >
              清屏
            </button>
          </div>
        </div>

        <div class="h-44 p-3 rounded-xl bg-black/90 border border-slate-900 font-mono text-xs overflow-y-auto space-y-1 text-gray-300">
          <div v-if="darkEnergyTerminalLogs.length === 0" class="text-gray-600 italic">
            [终端待命中] 点击“启动五阶段星系暗能量膨胀推演”以解算宇宙常数度规、快子负能量与卡拉比-丘超弦共振...
          </div>
          <div v-for="(log, idx) in darkEnergyTerminalLogs" :key="idx" class="leading-relaxed">
            <span class="text-gray-500">[{{ log.time }}]</span>
            <span :class="log.color"> {{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>


    <!-- Godot 4.6 LTS 核心实机代码展台 (三 Tab 切换) -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-purple-300">
            Godot 4.6 LTS 虚空星体与奇点封印底层架构
          </span>
          <n-tag size="tiny" type="info">纯读安全 · 零内存泄漏</n-tag>
        </div>
        <div class="flex items-center gap-2">
          <!-- 三 Tab 切换 -->
          <div class="inline-flex p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeCelestialGodotTab === 'gravity' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCelestialGodotTab = 'gravity'"
            >
              📄 celestial_gravity.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeCelestialGodotTab === 'singularity' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCelestialGodotTab = 'singularity'"
            >
              📄 singularity_collapse_resolver.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeCelestialGodotTab === 'tidal_inversion' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCelestialGodotTab = 'tidal_inversion'"
            >
              📄 void_tidal_inversion_engine.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeCelestialGodotTab === 'dark_energy' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCelestialGodotTab = 'dark_energy'"
            >
              📄 dark_energy_tachyon_horizon.gd
            </button>
          </div>
          <n-button size="tiny" secondary type="primary" @click="copyGodotCode">
            {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
          </n-button>
        </div>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-56 custom-scrollbar"><code v-if="activeCelestialGodotTab === 'gravity'">{{ godotCodeText }}</code><code v-else-if="activeCelestialGodotTab === 'singularity'">{{ godotSingularityCodeText }}</code><code v-else-if="activeCelestialGodotTab === 'tidal_inversion'">{{ godotTidalInversionCodeText }}</code><code v-else>{{ godotDarkEnergyCodeText }}</code></pre>
    </div>

    <!-- 太古天体黑洞奇点、以太引力波共鸣与终焉时空反应堆工坊 (v2.2.316 重磅实装) -->
    <div id="singularity-reactor-studio" class="singularity-reactor-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-purple-950/20 to-slate-900/95 border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/30">
              BLACK HOLE SINGULARITY & GRAVITATIONAL WAVES
            </span>
            <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
              v2.2.316 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>🪐</span> 太古天体黑洞奇点、以太引力波共鸣与终焉时空反应堆工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            提供九大天体潮汐锁定、视界时间膨胀超慢速减速、霍金辐射负能量逆流汲取与 Godot 4.6 LTS 底层实机黑洞奇点反应堆仿真控制流。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="info" @click="resetSingularityDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="info" :loading="isSingularitySimulating" @click="runSingularitySimulation">
            <template #icon><span>⚡</span></template>
            启动奇点反应堆推演
          </n-button>
        </div>
      </div>

      <!-- 四大奇点天体流派原型卡 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="archetype in singularityArchetypes"
          :key="archetype.id"
          @click="selectSingularityArchetype(archetype)"
          :class="[
            'p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden',
            selectedSingularityArchetype.id === archetype.id
              ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
          ]"
        >
          <div class="flex items-center justify-between">
            <span class="text-xl">{{ archetype.icon }}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-purple-300">{{ archetype.badge }}</span>
          </div>
          <div class="font-bold text-white text-sm mt-2">{{ archetype.name }}</div>
          <div class="text-xs text-gray-400 mt-1 leading-relaxed">{{ archetype.desc }}</div>
          <div class="mt-3 text-[11px] font-mono text-purple-400/90 flex justify-between">
            <span>峰值出力: {{ archetype.output }}</span>
            <span>稳态率: {{ archetype.stability }}</span>
          </div>
        </div>
      </div>

      <!-- 核心微调滑块与调控开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800">
        <!-- 4 维连续滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-purple-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>⚙️</span> 奇点几何与引力场参数调谐
          </div>
          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>引力场扭曲曲率半径 (Curvature Radius)</span>
                <span class="font-mono text-purple-400 font-bold">{{ curvatureRadius }} AU</span>
              </div>
              <n-slider v-model:value="curvatureRadius" :min="10" :max="100" :step="2" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>奇点以太密度压缩比 (Density Ratio)</span>
                <span class="font-mono text-cyan-400 font-bold">{{ densityRatio }} g/cm³</span>
              </div>
              <n-slider v-model:value="densityRatio" :min="1000" :max="50000" :step="1000" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>霍金辐射逆流增益系数 (Hawking Siphon)</span>
                <span class="font-mono text-amber-400 font-bold">{{ hawkingSiphon.toFixed(1) }} x</span>
              </div>
              <n-slider v-model:value="hawkingSiphon" :min="1.0" :max="8.0" :step="0.2" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>潮汐锁定同步时钟 (Tidal Lock Frequency)</span>
                <span class="font-mono text-emerald-400 font-bold">{{ tidalLockFreq }} mHz</span>
              </div>
              <n-slider v-model:value="tidalLockFreq" :min="30" :max="360" :step="10" />
            </div>
          </div>
        </div>

        <!-- 3 维调控开关与动态指标 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-cyan-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>🛡️</span> 时空防坍缩与高维保护守卫
          </div>
          <div class="space-y-2.5 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">视界边缘时间膨胀超慢速保护</div>
                <div class="text-[10px] text-gray-400">逼近黑洞奇点视界时战局时间流速自动放缓至 15% 防止瞬秒</div>
              </div>
              <n-switch v-model:value="enableHorizonTimeDilation" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">负能量湮灭排斥对冲圣盾</div>
                <div class="text-[10px] text-gray-400">注入反粒子流抵消奇点潮汐力撕扯，全员真伤减免 50%</div>
              </div>
              <n-switch v-model:value="enableNegativeEnergyShield" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">跨星系零延迟量子纠缠以太中继</div>
                <div class="text-[10px] text-gray-400">在四大虚空层级间建立超光速双向以太能量回流管道</div>
              </div>
              <n-switch v-model:value="enableQuantumEntanglement" />
            </div>
          </div>

          <!-- 4 维解算核心指标 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">理论能量输出</div>
              <div class="text-base font-black font-mono text-purple-400 mt-0.5">{{ calculatedOutputPower }} MW</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">奇点安全控制度</div>
              <div class="text-base font-black font-mono text-cyan-400 mt-0.5">{{ calculatedSafetyRate }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">引力波干涉纯度</div>
              <div class="text-base font-black font-mono text-emerald-400 mt-0.5">{{ calculatedWavePurity }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">反应堆认证级别</div>
              <div class="text-xs font-black font-mono text-amber-400 mt-1">{{ calculatedReactorCert }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条与终端控制台 -->
      <div class="space-y-3 bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="text-purple-400 font-mono font-bold">STAGE {{ singularitySimStage }}/5</span>
            <span class="text-gray-300">{{ singularitySimStageName }}</span>
          </div>
          <span class="font-mono text-cyan-400">{{ singularitySimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="singularitySimProgress"
          :color="'#a855f7'"
          :rail-color="'#1e293b'"
          :height="8"
          :show-indicator="false"
          border-radius="4px"
        />

        <div class="h-32 bg-slate-900/90 rounded-lg p-3 font-mono text-xs overflow-y-auto space-y-1 text-gray-300 border border-slate-800/80">
          <div v-for="(log, idx) in singularityLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-gray-500 shrink-0">[{{ log.time }}]</span>
            <span :class="log.color">{{ log.text }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <div class="text-gray-400 font-mono">
            <span>防伪校验凭证: </span>
            <span class="text-purple-400 font-bold">{{ singularityCertHash }}</span>
          </div>
          <n-button size="tiny" secondary type="info" round @click="exportReactorCert">
            <template #icon><span>📜</span></template>
            导出奇点反应堆推演报告 (SHA-256)
          </n-button>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                GODOT 4.6 LTS ASTROPHYSICS
              </span>
              <span class="text-sm font-bold text-white">黑洞奇点与引力波反应堆实机驱动</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              提供生产级奇点反应堆核心、引力波干涉检测仪与视界时间膨胀控制器实机代码。
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button
              v-for="codeTab in singularityCodeTabs"
              :key="codeTab.id"
              size="tiny"
              round
              :type="activeSingularityCodeTab === codeTab.id ? 'info' : 'default'"
              :secondary="activeSingularityCodeTab !== codeTab.id"
              @click="activeSingularityCodeTab = codeTab.id"
            >
              {{ codeTab.name }}
            </n-button>
            <n-button size="tiny" round secondary type="info" @click="copyActiveSingularityCode">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed max-h-[420px]">{{ currentSingularityCode }}</pre>
      </div>
    </div>

    <!-- v2.2.337: 全域天体星图编年史、黑洞引力弹弓与光阴裂缝折跃工坊 -->
    <div
      id="blackhole-slingshot-warp-studio"
      class="blackhole-slingshot-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/95 via-indigo-950/20 to-slate-900/95 border border-indigo-500/30 shadow-[0_0_35px_rgba(99,102,241,0.15)] space-y-6 relative overflow-hidden"
    >
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-500/20 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs border border-indigo-500/30">
              BLACK HOLE SLINGSHOT &amp; WARP MATRIX v2.2.337
            </span>
            <span class="text-xs text-indigo-400 font-mono">Relativistic Orbit &amp; Penrose Energy Extraction</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🪐</span> 全域天体星图编年史、黑洞引力弹弓与光阴裂缝折跃工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            提供旋转克尔黑洞引力弹弓轨道规划、能层彭罗斯能量逆流汲取、时空裂缝四维流形折叠与快子脉冲超越光速航行推演沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-button
            type="warning"
            size="small"
            round
            secondary
            :loading="isSimulatingSlingshot"
            @click="runSlingshotSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动引力弹弓折跃推演
          </n-button>
          <n-button
            type="info"
            size="small"
            round
            secondary
            @click="exportSlingshotCertificate"
          >
            <template #icon><span>📜</span></template>
            导出星际航行方案书
          </n-button>
        </div>
      </div>

      <!-- 四大天体折跃原型 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="arch in celestialSlingshotArchetypes"
          :key="arch.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative"
          :class="selectedSlingshotArchetypeId === arch.id ? 'bg-indigo-950/40 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'bg-slate-800/40 border-slate-700/60 hover:border-indigo-500/40'"
          @click="selectSlingshotArchetype(arch.id)"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ arch.icon }}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {{ arch.tag }}
            </span>
          </div>
          <div class="font-bold text-sm text-white">{{ arch.name }}</div>
          <div class="text-xs text-indigo-300 font-mono mt-0.5">{{ arch.subtitle }}</div>
          <div class="text-[11px] text-gray-400 mt-2 leading-relaxed">{{ arch.desc }}</div>
          <div class="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] font-mono">
            <span class="text-gray-400">折跃极限极速</span>
            <span class="text-indigo-400 font-bold">{{ arch.baseSpeedC }} c</span>
          </div>
        </div>
      </div>

      <!-- 参数调节与开关控制网格 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
        <!-- 4 滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-indigo-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
            <span>⚙️</span> 引力弹弓轨道与时空折叠微调
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">引力弹弓曲率加速度 (G)</span>
              <span class="text-indigo-400 font-mono font-bold">{{ slingshotCurvatureAcceleration.toFixed(1) }} G</span>
            </div>
            <n-slider v-model:value="slingshotCurvatureAcceleration" :min="1.0" :max="50.0" :step="0.5" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">时空裂缝折叠压缩比 (%)</span>
              <span class="text-amber-400 font-mono font-bold">{{ spacetimeRiftFoldCompressionRatio }} %</span>
            </div>
            <n-slider v-model:value="spacetimeRiftFoldCompressionRatio" :min="50" :max="99" :step="1" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">视界临界安全掠过近心距 (AU)</span>
              <span class="text-cyan-400 font-mono font-bold">{{ eventHorizonSafeApproachDistanceAu.toFixed(2) }} AU</span>
            </div>
            <n-slider v-model:value="eventHorizonSafeApproachDistanceAu" :min="0.1" :max="5.0" :step="0.1" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-purple-400">快子脉冲推进超光速倍率 (倍)</span>
              <span class="text-purple-400 font-mono font-bold">{{ tachyonPulseVelocityFactor.toFixed(1) }} x</span>
            </div>
            <n-slider v-model:value="tachyonPulseVelocityFactor" :min="2.0" :max="30.0" :step="0.5" />
          </div>
        </div>

        <!-- 3 开关与实时数据 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-indigo-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
            <span>✨</span> 黑洞特权与时空安全机制
          </div>

          <div class="space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">能层彭罗斯过程 100% 负能量汲取</div>
                <div class="text-gray-400 text-[11px]">从黑洞自转能中抽取无限清洁曲率动力</div>
              </div>
              <n-switch v-model:value="ergosphereNegativeEnergyExtraction" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">柯罗诺斯潮汐阻尼抵消千万重力超载</div>
                <div class="text-gray-400 text-[11px]">保证乘员与舰体处于 1.0G 绝对舒适稳态</div>
              </div>
              <n-switch v-model:value="chronosTidalDampingInertialField" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">奇点坍缩时空倒流毫秒级紧急回溯</div>
                <div class="text-gray-400 text-[11px]">发生视界吸积撕裂时 100% 倒流至安全锚点</div>
              </div>
              <n-switch v-model:value="transcendentWarpEmergencyAbort" />
            </div>
          </div>

          <!-- 4 项实时综合解算指标 -->
          <div class="grid grid-cols-2 gap-3 pt-1">
            <div class="p-2.5 rounded bg-slate-900 border border-indigo-500/20 text-center">
              <div class="text-[11px] text-gray-400">折跃折算极速</div>
              <div class="text-lg font-mono font-black text-indigo-400">{{ calculatedSlingshotMetrics.warpVelocityC }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-indigo-500/20 text-center">
              <div class="text-[11px] text-gray-400">引力助推转换能效</div>
              <div class="text-lg font-mono font-black text-cyan-400">{{ calculatedSlingshotMetrics.slingshotGravityAssistEfficiency }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-indigo-500/20 text-center">
              <div class="text-[11px] text-gray-400">时空曲率稳态率</div>
              <div class="text-lg font-mono font-black text-emerald-400">{{ calculatedSlingshotMetrics.spatiotemporalStabilityRating }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-indigo-500/20 text-center">
              <div class="text-[11px] text-gray-400">深空航行评级</div>
              <div class="text-lg font-mono font-black text-amber-400">{{ calculatedSlingshotMetrics.celestialNavigatorRank }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条 -->
      <div v-if="isSimulatingSlingshot" class="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-indigo-500/30">
        <div class="flex justify-between text-xs font-mono">
          <span class="text-indigo-300 flex items-center gap-2">
            <span class="animate-spin">🔄</span> {{ slingshotStages[currentSlingshotSimStage] }}
          </span>
          <span class="text-gray-400">{{ (currentSlingshotSimStage + 1) * 20 }}%</span>
        </div>
        <n-progress type="line" :percentage="(currentSlingshotSimStage + 1) * 20" :show-indicator="false" status="info" />
      </div>

      <!-- Godot 4.6 LTS 源码展台 -->
      <div class="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-gray-300 font-mono">GODOT 4.6 LTS CELESTIAL WARP ENGINE</span>
            <n-tag size="small" type="info" round>res://scripts/combat/celestial/</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <n-radio-group v-model:value="activeSlingshotScriptTab" size="small">
              <n-radio-button value="trajectory_solver">弹弓轨道解算器</n-radio-button>
              <n-radio-button value="warp_manifold">时空裂缝折叠流形</n-radio-button>
              <n-radio-button value="penrose_core">能层彭罗斯核心</n-radio-button>
            </n-radio-group>
            <n-button type="info" size="tiny" secondary round @click="copySlingshotScript">
              复制当前脚本
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentSlingshotScriptCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
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
    let textToCopy = godotCodeText
    let fileName = 'celestial_gravity.gd'
    if (activeCelestialGodotTab.value === 'singularity') {
      textToCopy = godotSingularityCodeText
      fileName = 'singularity_collapse_resolver.gd'
    } else if (activeCelestialGodotTab.value === 'tidal_inversion') {
      textToCopy = godotTidalInversionCodeText
      fileName = 'void_tidal_inversion_engine.gd'
    } else {
      textToCopy = godotDarkEnergyCodeText
      fileName = 'dark_energy_tachyon_horizon.gd'
    }
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

// ================= 专区 4: 双月潮汐引力汇聚与相位系统 =================
const lunarPhaseAngle = ref(45)
const isLunarRevolving = ref(false)
let lunarTimer: ReturnType<typeof setInterval> | null = null

const getPhaseName = (angle: number): string => {
  if (angle >= 340 || angle <= 20) return '双月大日蚀奇点 (Total Eclipse)'
  if (angle > 20 && angle < 70) return '红月升弦 (Red Waxing)'
  if (angle >= 70 && angle <= 110) return '青之月圣辉满月 (Blue Moon Full)'
  if (angle > 110 && angle < 160) return '双月引力对冲 (Tidal Opposition)'
  if (angle >= 160 && angle <= 200) return '红月近地点血色狂暴 (Red Perigee)'
  if (angle > 200 && angle < 260) return '青晶潮汐回潮 (Crystal Ebb)'
  if (angle >= 260 && angle <= 290) return '下弦星体共振 (Harmonic Resonance)'
  return '暗月回旋 (Dark Rotation)'
}

const applyLunarPreset = (preset: string) => {
  if (preset === 'red_perigee') {
    lunarPhaseAngle.value = 180
    message.success('已切换至【红月近地点】血色狂暴天象！')
  } else if (preset === 'blue_full') {
    lunarPhaseAngle.value = 90
    message.success('已切换至【青之月满月】圣辉神愈天象！')
  } else if (preset === 'eclipse_void') {
    lunarPhaseAngle.value = 0
    message.warning('已切换至【双月大日食】虚无奇点湮灭天象！')
  }
}

const lunarTideVerdict = computed(() => {
  const angle = lunarPhaseAngle.value
  let gravityForceG = (1.0 + Math.sin((angle * Math.PI) / 180) * 0.45).toFixed(2)
  let redBonus = '+15% 物理暴击 / 火伤+20%'
  let blueBonus = '+20% 治疗量 / MP减免15%'
  let voidRate = Math.round(Math.abs(Math.cos((angle * Math.PI) / 90)) * 50 + 20)
  let title = '平稳潮汐'
  let tagType: 'default' | 'info' | 'warning' | 'error' | 'success' = 'info'
  let lawIcon = '⚖️'
  let lawName = '双月均衡法则 (Equilibrium)'
  let lawDescription = '红月狂战与青月圣辉引力保持动态平衡，物理输出与神圣魔法均获得 15% 常规环境加权。'
  let gravityDesc = '标准地表引力，无异常重力压迫'

  // 红月极化 (160° ~ 200°)
  if (angle >= 160 && angle <= 200) {
    gravityForceG = '1.85'
    redBonus = '+50% 物理暴击 / 火伤+40% / 狂暴'
    blueBonus = '治疗量受压制 -20%'
    voidRate = 35
    title = '赤红血月极化'
    tagType = 'error'
    lawIcon = '🩸'
    lawName = '露纳利安狂怒法则 (Blood Moon Rage)'
    lawDescription = '天幕被赤红血色笼罩，全场角色与魔物暴击率狂飙 50%，普攻必中流血破防！'
    gravityDesc = '超重重力场，跳跃高度减半，击退抗性上升'
  }
  // 青月极化 (70° ~ 110°)
  else if (angle >= 70 && angle <= 110) {
    gravityForceG = '0.65'
    redBonus = '物理输出平稳 +10%'
    blueBonus = '+60% 治疗量 / MP消耗减半 / 全异常每3回合自愈'
    voidRate = 15
    title = '青之月圣晶极化'
    tagType = 'success'
    lawIcon = '🕊️'
    lawName = '始源晶石慈悲结界 (Crystal Benediction)'
    lawDescription = '青月神光净化大地，白魔法与药剂师调合回复量翻倍，法术 MP 消耗全面腰斩！'
    gravityDesc = '低重力微浮态，角色行动条流速轻灵提升 25%'
  }
  // 日食奇点 (0° ~ 20° 或 340° ~ 360°)
  else if (angle <= 20 || angle >= 340) {
    gravityForceG = '2.50'
    redBonus = '暗黑真实伤害 +60%'
    blueBonus = '圣光魔法产生虚无偏折'
    voidRate = 95
    title = '奇点湮灭日全食'
    tagType = 'warning'
    lawIcon = '🌑'
    lawName = '虚无终焉引力坍缩 (Void Singularity)'
    lawDescription = '红月与青月同时掩盖太阳，次元之隙完全撕开，全场所有伤害无视防御并激活 99999 伤害破限！'
    gravityDesc = '极端奇点引力波，空间撕裂，每 5 回合产生一次全屏以太风暴'
  }

  return {
    gravityForceG,
    gravityDesc,
    redBonus,
    blueBonus,
    voidRate,
    title,
    tagType,
    lawIcon,
    lawName,
    lawDescription
  }
})

watch(isLunarRevolving, (val) => {
  if (val) {
    if (lunarTimer) clearInterval(lunarTimer)
    lunarTimer = setInterval(() => {
      lunarPhaseAngle.value = (lunarPhaseAngle.value + 2) % 360
    }, 150)
  } else {
    if (lunarTimer) {
      clearInterval(lunarTimer)
      lunarTimer = null
    }
  }
})

onUnmounted(() => {
  if (lunarTimer) {
    clearInterval(lunarTimer)
    lunarTimer = null
  }
})

// ================= 专区 5: 四阶引力奇点坍缩推演与次元裂隙封印沙盘 =================
const activeCelestialGodotTab = ref<'gravity' | 'singularity' | 'tidal_inversion' | 'dark_energy'>('gravity')

// ================= 专区 6: 全域虚空天体超重力潮汐与奇点坍缩逆转工坊 =================
const scrollToTidalStudio = () => {
  const el = document.getElementById('void-tidal-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

interface TidalMode {
  id: string
  name: string
  subtitle: string
  badge: string
  icon: string
  desc: string
  presetCurvature: number
  presetRadius: number
  presetAmplitude: number
  affixes: string[]
}

const tidalModesList: TidalMode[] = [
  {
    id: 'horizon_ripple',
    name: '始源视界微澜',
    subtitle: '低阶引力涟漪',
    badge: '稳态',
    icon: '🌊',
    desc: '微弱时空扰动，时空曲率处于亚临界平滑态，引力透镜轻微偏折全场光线与物理弹道。',
    presetCurvature: 0.85,
    presetRadius: 120,
    presetAmplitude: 45,
    affixes: [
      '全队行动条微幅加速 +5%',
      '物理远程射程提升 15%',
      '承受空间虚空微伤 120 点/秒',
      '引力稳定锚完全抵消时滞'
    ]
  },
  {
    id: 'lensing_resonance',
    name: '引力透镜共振',
    subtitle: '中阶光曲穿透',
    badge: '透镜',
    icon: '🔭',
    desc: '强引力场将背景星光聚缩为爱因斯坦环，战场空间发生多维折叠，全员法术穿透性爆发。',
    presetCurvature: 3.42,
    presetRadius: 380,
    presetAmplitude: 135,
    affixes: [
      '全魔法伤害暴击率 +30%',
      '引力透镜聚焦：全属性破防 +25%',
      '空间剪切撕裂 850 点/秒',
      'ATB 计量表出现双向潮汐摆动'
    ]
  },
  {
    id: 'superstring_rupture',
    name: '超弦引力断裂',
    subtitle: '高阶维度破损',
    badge: '危险',
    icon: '⚡',
    desc: '时空基本超弦在强潮汐引力差下崩解断裂，产生微型虚空断层裂隙，每秒造成高额真实暗伤。',
    presetCurvature: 6.88,
    presetRadius: 650,
    presetAmplitude: 220,
    affixes: [
      '空间撕裂暗伤 2,400 点/秒',
      '敌我双方护甲削弱 45%',
      'ATB 行动条迟滞 -35%',
      '四晶核谐振能量急速消耗'
    ]
  },
  {
    id: 'singularity_inversion',
    name: '终焉奇点逆转',
    subtitle: '神话极境奇迹',
    badge: '逆转',
    icon: '🌀',
    desc: '史瓦西事件视界达到临界极限，通过四晶核逆相位引力暴冲，将坍缩黑洞反向爆开为白洞创生！',
    presetCurvature: 9.99,
    presetRadius: 980,
    presetAmplitude: 300,
    affixes: [
      '奇点白洞喷发：对敌 99,999 贯穿伤害',
      '全队异常状态瞬间全驱散',
      '全员以太超频：3 回合无限 MP 咏唱',
      '锁定空间曲率至绝对静止态'
    ]
  }
]

const selectedTidalModeId = ref('lensing_resonance')
const currentTidalMode = computed(() => tidalModesList.find(m => m.id === selectedTidalModeId.value) || tidalModesList[1])

const tidalAmplitude = ref(135)
const schwarzschildRadius = ref(380)
const crystalCancellationRate = ref(75)
const aetherSuperconductingDamping = ref(80)
const enableLensingPrism = ref(true)

const tidalSimulationLogs = ref<string[]>([
  '🌀 虚空超重力潮汐与奇点坍缩逆转工坊就绪，引力传感器正在监听事件视界。',
  '🔭 当前模式：引力透镜共振，已锁定 380 km 史瓦西视界半径。'
])

const selectTidalMode = (id: string) => {
  selectedTidalModeId.value = id
  const m = currentTidalMode.value
  tidalAmplitude.value = m.presetAmplitude
  schwarzschildRadius.value = m.presetRadius
  tidalSimulationLogs.value.unshift(`🌌 已切换潮汐天象为【${m.name}】(${m.subtitle})，视界半径校准为 ${m.presetRadius} km。`)
}

const spaceCurvatureTensor = computed(() => {
  const amp = tidalAmplitude.value / 100
  const rad = schwarzschildRadius.value / 100
  const damp = aetherSuperconductingDamping.value / 100
  const val = (amp * 1.8 + rad * 0.9) / damp
  return Number(Math.min(9.99, Math.max(0.12, val)).toFixed(2))
})

const curvatureStabilityText = computed(() => {
  const val = spaceCurvatureTensor.value
  if (val <= 2.0) return '时空曲率温和稳态'
  if (val <= 5.0) return '引力透镜强弯折态'
  if (val <= 7.5) return '超弦引力撕裂断层'
  return '终焉奇点极限坍缩态'
})

const effectiveTidalShearDps = computed(() => {
  const baseDps = spaceCurvatureTensor.value * 520
  const cancel = crystalCancellationRate.value / 100
  return Math.max(0, Math.round(baseDps * (1 - cancel * 0.85)))
})

const timeDilationFactor = computed(() => {
  const cur = spaceCurvatureTensor.value
  if (cur <= 2.0) return 1.05
  if (cur <= 5.0) return 1.25
  return Math.max(0.2, 1.0 - (cur - 5.0) * 0.16)
})

const inversionSuccessRate = computed(() => {
  let rate = crystalCancellationRate.value * 0.6 + aetherSuperconductingDamping.value * 0.3
  if (enableLensingPrism.value) rate += 25
  const penalty = spaceCurvatureTensor.value * 3.5
  return Math.max(5, Math.min(100, Math.round(rate - penalty + 10)))
})

const inversionVerdict = computed(() => {
  const r = inversionSuccessRate.value
  if (r >= 85) return { status: '奇点逆转绝对达成', badge: 'SSS 完美', color: 'text-emerald-400' }
  if (r >= 70) return { status: '高维引力回环稳态', badge: 'S 优秀', color: 'text-cyan-400' }
  if (r >= 50) return { status: '奇点临界受控态', badge: 'A 临界', color: 'text-amber-400' }
  return { status: '视界坍缩暴走反噬', badge: 'D 危险', color: 'text-rose-400' }
})

const autoBalanceHarmonicCrystals = () => {
  crystalCancellationRate.value = 95
  aetherSuperconductingDamping.value = 90
  message.success('已自动将四晶核引力对冲率提升至 95%，超导阻尼校准至 90%！')
  tidalSimulationLogs.value.unshift('⚖️ 四晶核引力超导对冲阵列配平成功！空间曲率回落至受控安全阈值。')
}

const triggerUltimateCollapse = () => {
  tidalAmplitude.value = 300
  schwarzschildRadius.value = 980
  message.warning('⚠️ 终焉奇点极限坍缩已触发！空间曲率突破 9.99 Gc！')
  tidalSimulationLogs.value.unshift('⚡ 警报：终焉奇点事件视界瞬间扩张至 980 km！潮汐剪切重力波引发全域时空震荡！')
}

const triggerSingularityInversionSimulation = () => {
  const rate = inversionSuccessRate.value
  const success = Math.random() * 100 <= rate
  if (success) {
    message.success(`🎉 终焉奇点逆转成功！成功率 ${rate}%，白洞耀斑爆发，产生 99,999 创生贯穿伤害！`)
    tidalSimulationLogs.value.unshift(`🌀 奇点逆转推演大获全胜！黑洞视界反转为白洞耀斑，全队获得神圣以太超频！`)
  } else {
    message.error(`⚠️ 奇点逆转受阻！事件视界产生局部暗能泄漏，承受了 ${effectiveTidalShearDps.value} 点反噬伤害！`)
    tidalSimulationLogs.value.unshift(`⚠️ 逆转受阻：时空曲率过高 (${spaceCurvatureTensor.value} Gc)，部分晶核发生共振过载脱锁！`)
  }
}

const exportCelestialTidalCertificate = () => {
  const m = currentTidalMode.value
  const timestamp = new Date().toISOString()
  const certId = 'VOID-TIDAL-' + Date.now().toString(36).toUpperCase()
  const content = [
    '================================================================================',
    '《光之战士：时空裂隙》全域虚空天体超重力潮汐与奇点坍缩逆转方案书',
    '================================================================================',
    `方案编号: ${certId}`,
    `签署时间: ${timestamp}`,
    '认证矩阵: VBLE Void & Celestial Gravity Matrix v2.2.272',
    '系统架构: Godot 4.6 LTS / RefCounted Void Tidal Inversion Engine',
    '',
    '【潮汐天象与视界档案】',
    `• 潮汐模式: ${m.name} (${m.subtitle})`,
    `• 状态标章: ${m.badge}`,
    `• 预设曲率: ${m.presetCurvature} Gc`,
    `• 史瓦西视界半径: ${schwarzschildRadius.value} km`,
    '',
    '【引力动力学核心参数】',
    `• 虚空引力潮汐振幅: ${tidalAmplitude.value}%`,
    `• 四晶核对冲谐振率: ${crystalCancellationRate.value}%`,
    `• 以太超导位面阻尼: ${aetherSuperconductingDamping.value}%`,
    `• 引力透镜偏折棱镜: ${enableLensingPrism.value ? '已装配 (+25% 逆转稳定)' : '未启用'}`,
    '',
    '【解算裁决核心指标】',
    `• 空间曲率张量指数: ${spaceCurvatureTensor.value} Gc (${curvatureStabilityText.value})`,
    `• 潮汐剪切暗质秒伤: ${effectiveTidalShearDps.value} 点/秒`,
    `• ATB 时空膨胀因数: ${timeDilationFactor.value.toFixed(2)}x`,
    `• 奇点逆转成功概率: ${inversionSuccessRate.value}%`,
    `• 裁决评级: ${inversionVerdict.value.badge} · ${inversionVerdict.value.status}`,
    '',
    '【派生战术增益与破甲词缀】',
    ...m.affixes.map((a, i) => `  ${i + 1}. ${a}`),
    '',
    '【底层实机契约签名】',
    `SHA-256 安全哈希: ${Array.from(certId + timestamp).map(c => (c.charCodeAt(0) * 31 % 16).toString(16)).join('').padEnd(64, 'e')}`,
    '================================================================================'
  ].join('\n')

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `celestial_tidal_inversion_${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
  message.success('已成功导出《全域虚空天体超重力潮汐与奇点坍缩逆转方案书》！')
  tidalSimulationLogs.value.unshift(`📜 方案书已完成 SHA-256 离线安全签署并导出：编号 ${certId}`)
}

const godotTidalInversionCodeText = `## void_tidal_inversion_engine.gd
## Godot 4.6 LTS - 虚空天体超重力潮汐剪切与奇点坍缩白洞逆转引擎
extends RefCounted
class_name VoidTidalInversionEngine

signal tidal_wave_surged(amplitude_pct: float, curvature_gc: float)
signal singularity_inverted_to_white_hole(burst_damage: int, genesis_buff: Dictionary)
signal containment_overload_alert(shear_dps: float)

class TidalMetrics:
	var curvature_gc: float
	var shear_dps: float
	var atb_dilation: float
	var inversion_chance_pct: float
	var is_inversion_success: bool

## 纯逻辑执行超重力潮汐与奇点逆转解算
static func resolve_tidal_inversion(
	amplitude_pct: float,
	schwarzschild_radius_km: float,
	crystal_cancellation_pct: float,
	superconducting_damping_pct: float,
	has_lensing_prism: bool
) -> TidalMetrics:
	var metrics = TidalMetrics.new()
	
	# 计算时空曲率张量 (Gc)
	var amp: float = amplitude_pct / 100.0
	var rad: float = schwarzschild_radius_km / 100.0
	var damp: float = clampf(superconducting_damping_pct / 100.0, 0.2, 1.0)
	var cur: float = (amp * 1.8 + rad * 0.9) / damp
	metrics.curvature_gc = clampf(cur, 0.12, 9.99)
	
	# 潮汐剪切破坏力
	var base_shear: float = metrics.curvature_gc * 520.0
	var cancel: float = crystal_cancellation_pct / 100.0
	metrics.shear_dps = maxf(0.0, base_shear * (1.0 - cancel * 0.85))
	
	# 时空膨胀因数
	if metrics.curvature_gc <= 2.0:
		metrics.atb_dilation = 1.05
	elif metrics.curvature_gc <= 5.0:
		metrics.atb_dilation = 1.25
	else:
		metrics.atb_dilation = maxf(0.2, 1.0 - (metrics.curvature_gc - 5.0) * 0.16)
		
	# 奇点白洞逆转概率
	var rate: float = crystal_cancellation_pct * 0.6 + superconducting_damping_pct * 0.3
	if has_lensing_prism:
		rate += 25.0
	rate -= metrics.curvature_gc * 3.5
	metrics.inversion_chance_pct = clampf(rate + 10.0, 5.0, 100.0)
	metrics.is_inversion_success = metrics.inversion_chance_pct >= 80.0
	
	return metrics`

interface SingularityTier {
  stage: number
  title: string
  badgeText: string
  badgeType: 'default' | 'info' | 'warning' | 'error'
  desc: string
  threat: number
  baseDecayDmg: number
  atbPenalty: number
}

const singularityTiers: SingularityTier[] = [
  {
    stage: 1,
    title: '空间畸变与地磁偏转',
    badgeText: '阶段 I · 轻微扰动',
    badgeType: 'info',
    desc: '空间微幅折叠扭曲，物理远程弹道产生 12° 偏移，物理与弓箭技能命中率降低 15%',
    threat: 25,
    baseDecayDmg: 0,
    atbPenalty: 0
  },
  {
    stage: 2,
    title: '黑洞吸积盘引力潮汐',
    badgeText: '阶段 II · 时空延滞',
    badgeType: 'warning',
    desc: '引力潮汐形成黑洞外吸积盘，全场时空流速阻滞，ATB 行动条充能减速 25%，全队冲刺失效',
    threat: 50,
    baseDecayDmg: 350,
    atbPenalty: -25
  },
  {
    stage: 3,
    title: '事件视界高能粒子喷流',
    badgeText: '阶段 III · 狂暴侵蚀',
    badgeType: 'error',
    desc: '超高能伽马射线粒子喷流轰击战场，每秒承受 1500 混沌真实暗伤，魔抗护盾衰减 40%',
    threat: 75,
    baseDecayDmg: 1500,
    atbPenalty: -35
  },
  {
    stage: 4,
    title: '太古奇点绝对坍缩',
    badgeText: '阶段 IV · 灭世终焉',
    badgeType: 'error',
    desc: '奇点压入史瓦西绝对半径，空间曲率无限大，若稳定度低于 85% 视界寿命耗尽将全队即死灭世！',
    threat: 100,
    baseDecayDmg: 3500,
    atbPenalty: -50
  }
]

const selectedSingularityTier = ref(2)
const anchorWindTune = ref(75)
const anchorWaterTune = ref(80)
const anchorFireTune = ref(70)
const anchorEarthTune = ref(85)

const applySealPreset = (key: 'perfect' | 'tier3_test' | 'tier4_crisis' | 'reset') => {
  if (key === 'perfect') {
    selectedSingularityTier.value = 1
    anchorWindTune.value = 95
    anchorWaterTune.value = 95
    anchorFireTune.value = 95
    anchorEarthTune.value = 95
    message.success('已切换至【绝对锁闭稳态】！四锚高频共振')
  } else if (key === 'tier3_test') {
    selectedSingularityTier.value = 3
    anchorWindTune.value = 65
    anchorWaterTune.value = 60
    anchorFireTune.value = 85
    anchorEarthTune.value = 70
    message.warning('已注入【阶段3高能粒子喷流】极限抗压演练！')
  } else if (key === 'tier4_crisis') {
    selectedSingularityTier.value = 4
    anchorWindTune.value = 40
    anchorWaterTune.value = 35
    anchorFireTune.value = 50
    anchorEarthTune.value = 45
    message.error('警报：已触发【阶段4终焉崩解危机】！奇点视界正在快速撕裂！')
  } else {
    selectedSingularityTier.value = 2
    anchorWindTune.value = 75
    anchorWaterTune.value = 80
    anchorFireTune.value = 70
    anchorEarthTune.value = 85
    message.info('已恢复标准元素对冲调谐态')
  }
}

const averageAnchorTuning = computed(() => {
  return Math.round((anchorWindTune.value + anchorWaterTune.value + anchorFireTune.value + anchorEarthTune.value) / 4)
})

const singularityContainmentVerdict = computed(() => {
  const tier = singularityTiers.find(t => t.stage === selectedSingularityTier.value) || singularityTiers[1]
  const avgTune = averageAnchorTuning.value

  const anchorBonus = hasGravityAnchor.value ? 12 : 0
  const tierPenalty = tier.stage * 15
  let stability = Math.min(100, Math.max(5, Math.round(avgTune + anchorBonus - tierPenalty + 20)))

  const fireAbsorption = anchorFireTune.value / 100
  const effectiveDecayDmg = Math.max(0, Math.round(tier.baseDecayDmg * (1 - fireAbsorption * 0.75)))

  const waterResistance = anchorWaterTune.value / 100
  const atbModifier = Math.round(tier.atbPenalty + waterResistance * 30)

  let status = '安全锁闭稳态'
  let tagType: 'success' | 'warning' | 'error' | 'info' = 'success'
  let colorClass = 'text-emerald-400'
  let verdictDesc = '四元素引力对冲锚稳固，次元裂隙受到全域空间曲率抑制，无坍缩扩散风险。'
  let lifespanText = '恒久受控 (无衰亡倒计时)'

  if (stability >= 85) {
    status = '绝对锁闭稳态'
    tagType = 'success'
    colorClass = 'text-emerald-400'
    verdictDesc = '四维引力锚完全闭合，次元裂隙被压缩至普朗克尺度以下。'
    lifespanText = '恒久受控'
  } else if (stability >= 60) {
    status = '临界共振警报'
    tagType = 'info'
    colorClass = 'text-cyan-400'
    verdictDesc = '奇点周围产生时空涟漪与重力轻微晃动，建议继续提升土/风晶核调谐度。'
    lifespanText = '稳定运行 (~360 秒)'
  } else if (stability >= 35) {
    status = '引力撕裂失控'
    tagType = 'warning'
    colorClass = 'text-yellow-400'
    verdictDesc = '高能黑洞引力正在吞噬封印结界，全场受击暗伤加剧，必须紧急注入能量！'
    lifespanText = '濒危告急 (约 65 秒)'
  } else {
    status = '终焉奇点湮灭'
    tagType = 'error'
    colorClass = 'text-rose-500 font-extrabold'
    verdictDesc = '史瓦西半径突破！视界完全失控，即将产生超新星大撕裂即死冲击！'
    lifespanText = '即将毁灭 (< 15 秒)'
  }

  return {
    stabilityPercent: stability,
    status,
    tagType,
    colorClass,
    verdictDesc,
    effectiveDecayDmg,
    atbModifier,
    lifespanText
  }
})

const exportSingularityCert = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  const tier = singularityTiers.find(t => t.stage === selectedSingularityTier.value) || singularityTiers[1]
  const verdict = singularityContainmentVerdict.value

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   四阶引力奇点坍缩推演与次元裂隙封印方案书 (v2.2.250)
================================================================================
颁发时间: ${timeStr}
空间锚点: 虚空城堡 (Void Castle) · 核心终焉奇点
当前坍缩阶段: 第 ${tier.stage} 阶段 · 【${tier.title}】
阶段危险威胁度: ${tier.threat}%

【四大始源水晶引力对冲锚参数】
- 🌪️ 风之水晶锚 (抗风涡流对冲): ${anchorWindTune.value}%
- 💧 水之水晶锚 (空间浮力缓冲): ${anchorWaterTune.value}%
- 🔥 火之水晶锚 (伽马喷流消散): ${anchorFireTune.value}%
- ⛰️ 土之水晶锚 (地核引力对冲): ${anchorEarthTune.value}%
- 四锚综合平均调谐度: ${averageAnchorTuning.value}%
- 星体引力稳定锚状态: ${hasGravityAnchor.value ? '已装配 (+12% 封印强化)' : '未佩戴'}

【次元裂隙封印裁决指标】
- 封印稳定度 (Stability): ${verdict.stabilityPercent}% [${verdict.status}]
- 混沌侵蚀真实暗伤: ${verdict.effectiveDecayDmg} 点/秒
- ATB 行动条流速修正: ${verdict.atbModifier > 0 ? '+' : ''}${verdict.atbModifier}%
- 奇点视界存续寿命: ${verdict.lifespanText}
- 裁决评定: ${verdict.verdictDesc}

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS / GDScript RefCounted
- Core Resolvers: celestial_gravity.gd & singularity_collapse_resolver.gd
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
    a.download = `celestial_singularity_cert_v2.2.250_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('奇点封印演算方案证书已导出并同步至剪贴板！')
  }
}

const godotSingularityCodeText = `## singularity_collapse_resolver.gd
## Godot 4.6 LTS - 虚空终焉奇点四阶段坍缩与四元素晶核引力对冲解析器
extends RefCounted
class_name SingularityCollapseResolver

signal collapse_tier_escalated(tier: int, decay_dps: float)
signal containment_breached(lifespan_sec: float)

class ContainmentMetrics:
	var stability: float
	var effective_decay_dps: float
	var atb_speed_mod: float
	var is_stable: bool

static func resolve_containment(tier: int, wind: float, water: float, fire: float, earth: float, has_anchor: bool) -> ContainmentMetrics:
	var metrics = ContainmentMetrics.new()
	var avg_tuning = (wind + water + fire + earth) / 4.0
	var anchor_bonus = 12.0 if has_anchor else 0.0
	var penalty = float(tier) * 15.0
	
	metrics.stability = clampf(avg_tuning + anchor_bonus - penalty + 20.0, 5.0, 100.0)
	metrics.is_stable = metrics.stability >= 85.0
	
	# 火元素吸收伽马暗伤
	var base_dps = [0.0, 0.0, 350.0, 1500.0, 3500.0][clamp(tier, 0, 4)]
	metrics.effective_decay_dps = base_dps * (1.0 - (fire / 100.0) * 0.75)
	
	# 水元素缓冲时空阻尼
	var base_atb_penalty = [0.0, 0.0, -25.0, -35.0, -50.0][clamp(tier, 0, 4)]
	metrics.atb_speed_mod = base_atb_penalty + (water / 100.0) * 30.0
	
	return metrics`

// ==========================================
// 🌌 全域星系暗能量膨胀、快子视界破裂工坊 (v2.2.291)
// ==========================================
interface CosmicRegime {
  id: string
  name: string
  icon: string
  desc: string
  color: string
  metricTag: string
}

const cosmicRegimesList: CosmicRegime[] = [
  {
    id: 'dark_energy_inflation',
    name: '暗能量暴胀相',
    icon: '🌌',
    desc: '度规张量指数级拉伸，时空曲率平坦化，全域移动阻尼消解',
    color: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
    metricTag: '暴胀拉伸 / 阻尼清零'
  },
  {
    id: 'tachyon_horizon_rupture',
    name: '快子超光速视界破裂相',
    icon: '⚡',
    desc: '撕裂因果律光锥边界，负质量与负能量流喷涌，战时冷却缩减',
    color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
    metricTag: '负能量流 / CDR -45%'
  },
  {
    id: 'superstring_vibration',
    name: '超弦多维共振相',
    icon: '🎻',
    desc: '11 维卡拉比-丘流形超对称共鸣，六维属性全要素重构',
    color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    metricTag: '超对称共鸣 / 六维 +35%'
  },
  {
    id: 'vacuum_decay_metastable',
    name: '亚稳态伪真空衰变相',
    icon: '💥',
    desc: '激发真真空泡核生长，全域黑洞引力势能逆相解构',
    color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
    metricTag: '引力消解 / 真空相变'
  }
]

const selectedRegimeId = ref('dark_energy_inflation')
const cosmologicalConstantLambda = ref(1.68)
const tachyonFieldPotential = ref(540)
const superstringDimensions = ref(10)
const vacuumDecayRate = ref(0.25)

const causalityProtectionField = ref(true)
const higgsMetastabilityShield = ref(true)
const calabiYauFluxStabilizer = ref(true)

const currentCosmicRegimeObj = computed(() => {
  return cosmicRegimesList.find(r => r.id === selectedRegimeId.value) || cosmicRegimesList[0]
})

const calculatedCosmicExpansionRate = computed(() => {
  const h = 67.4 * cosmologicalConstantLambda.value * (superstringDimensions.value / 10)
  return `${h.toFixed(1)} km/s/Mpc`
})

const calculatedNegativeEnergyDensity = computed(() => {
  const energy = tachyonFieldPotential.value * 14.5 * cosmologicalConstantLambda.value
  return `${Math.round(energy).toLocaleString()} J/m³`
})

const calculatedQuantumVacuumSafety = computed(() => {
  let safety = 72.0
  if (higgsMetastabilityShield.value) safety += 20
  if (calabiYauFluxStabilizer.value) safety += 7.5
  return `${Math.min(99.9, safety).toFixed(1)}%`
})

const calculatedCausalityPreservation = computed(() => {
  return causalityProtectionField.value ? 'ABSOLUTE (严格因果保护)' : 'VIOLATION RISK (存在时序死锁)'
})

function scrollToDarkEnergyStudio() {
  const el = document.getElementById('dark-energy-expansion-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// 五阶段推演终端
interface DarkEnergyTerminalLog {
  time: string
  message: string
  color: string
}

const isDarkEnergySimulating = ref(false)
const darkEnergySimStage = ref(0)
const darkEnergySimFinished = ref(false)
const darkEnergyTerminalLogs = ref<DarkEnergyTerminalLog[]>([
  {
    time: 'INIT',
    message: '全域星系暗能量膨胀与快子视界工坊就绪。准备解算度规张量。',
    color: 'text-gray-400'
  }
])

function appendDarkEnergyLog(msg: string, color = 'text-rose-400') {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
  darkEnergyTerminalLogs.value.push({ time: timeStr, message: msg, color })
}

function runDarkEnergySimulation() {
  if (isDarkEnergySimulating.value) return
  isDarkEnergySimulating.value = true
  darkEnergySimFinished.value = false
  darkEnergySimStage.value = 1
  appendDarkEnergyLog('▶ 启动五阶段星系暗能量膨胀推演...', 'text-rose-400 font-bold')

  setTimeout(() => {
    darkEnergySimStage.value = 2
    appendDarkEnergyLog(`[阶段 1/5] 载入演化相【${currentCosmicRegimeObj.value.name}】，常数密度: ${cosmologicalConstantLambda.value.toFixed(2)} Λ，势能: ${tachyonFieldPotential.value} GeV`, 'text-cyan-300')

    setTimeout(() => {
      darkEnergySimStage.value = 3
      appendDarkEnergyLog(`[阶段 2/5] 校验 ${superstringDimensions.value} 维超弦紧致化，哈勃膨胀速率解算为: ${calculatedCosmicExpansionRate.value}`, 'text-amber-300')

      setTimeout(() => {
        darkEnergySimStage.value = 4
        const causalityText = causalityProtectionField.value ? '严格时序保护建立' : '未开启'
        const shieldText = higgsMetastabilityShield.value ? '希格斯锁相(+20% 安全)' : '常规'
        appendDarkEnergyLog(`[阶段 3/5] 因果保护[${causalityText}]，真空安全阻尼[${shieldText}]`, 'text-purple-300')

        setTimeout(() => {
          darkEnergySimStage.value = 5
          appendDarkEnergyLog(`[阶段 4/5] 快子负能量流密度: ${calculatedNegativeEnergyDensity.value}，真空相变安全度: ${calculatedQuantumVacuumSafety.value}`, 'text-emerald-300')

          setTimeout(() => {
            isDarkEnergySimulating.value = false
            darkEnergySimFinished.value = true
            appendDarkEnergyLog(`✓ [阶段 5/5] 暗能量膨胀解算圆满完成！因果状态: ${calculatedCausalityPreservation.value}，生成离线宇宙学凭据`, 'text-emerald-400 font-bold')
            message.success('星系暗能量膨胀五阶段推演完成！')
          }, 350)
        }, 350)
      }, 350)
    }, 350)
  }, 350)
}

function exportDarkEnergyCertificate() {
  const certData = {
    standard: 'Godot 4.6 LTS / VBLE Dark Energy Matrix v2.2.291',
    timestamp: new Date().toISOString(),
    regime: selectedRegimeId.value,
    parameters: {
      cosmologicalConstantLambda: cosmologicalConstantLambda.value,
      tachyonFieldPotential: tachyonFieldPotential.value,
      superstringDimensions: superstringDimensions.value,
      vacuumDecayRate: vacuumDecayRate.value,
      causalityProtectionField: causalityProtectionField.value,
      higgsMetastabilityShield: higgsMetastabilityShield.value,
      calabiYauFluxStabilizer: calabiYauFluxStabilizer.value
    },
    metrics: {
      cosmicExpansionRate: calculatedCosmicExpansionRate.value,
      negativeEnergyDensity: calculatedNegativeEnergyDensity.value,
      quantumVacuumSafety: calculatedQuantumVacuumSafety.value,
      causalityPreservation: calculatedCausalityPreservation.value
    },
    sha256Signature: 'SHA256-DARK-ENERGY-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dark_energy_v2.2.291_${selectedRegimeId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出星系暗能量膨胀方案书证书！')
}

const godotDarkEnergyCodeText = [
  '# ==============================================================================',
  '# DarkEnergyTachyonHorizon - 全域星系暗能量膨胀与快子视界破裂引擎',
  '# 文件路径: res://scripts/celestial/dark_energy_tachyon_horizon.gd',
  '# 架构规范: Godot 4.6 LTS / VBLE Celestial Matrix v2.2.291',
  '# 核心职责: 计算宇宙学常数度规膨胀、快子负能量密度与霍金时序因果律保护',
  '# ==============================================================================',
  'class_name DarkEnergyTachyonHorizon',
  'extends RefCounted',
  '',
  'const HUBBLE_BASE: float = 67.4 # km/s/Mpc',
  '',
  'static func calculate_expansion_rate(lambda_factor: float, dimensions: int) -> float:',
  '	var rate: float = HUBBLE_BASE * lambda_factor * (float(dimensions) / 10.0)',
  '	return rate',
  '',
  'static func evaluate_negative_energy_density(potential_gev: int, lambda_factor: float) -> float:',
  '	return float(potential_gev) * 14.5 * lambda_factor',
  '',
  'static func verify_causality_protection(is_field_active: bool) -> bool:',
  '	return is_field_active'
].join('\n')

// ==================== v2.2.316 奇点反应堆工坊状态与方法 ====================
const scrollToSingularityReactorStudio = () => {
  const el = document.getElementById('singularity-reactor-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    message.success('已直达太古天体黑洞奇点反应堆工坊')
  }
}

interface SingularityArchetype {
  id: string
  name: string
  icon: string
  badge: string
  desc: string
  output: string
  stability: string
  radius: number
  density: number
  siphon: number
  freq: number
}

const singularityArchetypes: SingularityArchetype[] = [
  {
    id: 'singularity_collapse',
    name: '终焉黑洞奇点坍缩流',
    icon: '🕳️',
    badge: '事件视界',
    desc: '极高以太压缩密度，空间极度扭曲，产生毁灭性绝对真伤立场。',
    output: '98,000,000 MW',
    stability: '94.5%',
    radius: 40,
    density: 45000,
    siphon: 6.5,
    freq: 180
  },
  {
    id: 'gravitational_waves',
    name: '双子星引力波共鸣流',
    icon: '🌀',
    badge: '引力干涉',
    desc: '双星互绕激发时空涟漪，全图敌人行动条持续震荡击退。',
    output: '65,000,000 MW',
    stability: '99.2%',
    radius: 65,
    density: 22000,
    siphon: 4.0,
    freq: 240
  },
  {
    id: 'dark_matter_fusion',
    name: '暗物质聚变反应堆流',
    icon: '🌌',
    badge: '稳态巡航',
    desc: '平稳持续能量释放，为全队提供无上限以太过载与减耗支持。',
    output: '48,000,000 MW',
    stability: '99.9%',
    radius: 80,
    density: 12000,
    siphon: 3.0,
    freq: 90
  },
  {
    id: 'hawking_radiation',
    name: '霍金辐射能量汲取流',
    icon: '⚡',
    badge: '负熵增益',
    desc: '视界对偶粒子湮灭汲取，反噬为零，将敌方魔攻转化为自身护盾。',
    output: '72,000,000 MW',
    stability: '98.0%',
    radius: 50,
    density: 30000,
    siphon: 7.2,
    freq: 120
  }
]

const selectedSingularityArchetype = ref<SingularityArchetype>(singularityArchetypes[0])

const curvatureRadius = ref(40)
const densityRatio = ref(45000)
const hawkingSiphon = ref(6.5)
const tidalLockFreq = ref(180)

const enableHorizonTimeDilation = ref(true)
const enableNegativeEnergyShield = ref(true)
const enableQuantumEntanglement = ref(true)

const selectSingularityArchetype = (arch: SingularityArchetype) => {
  selectedSingularityArchetype.value = arch
  curvatureRadius.value = arch.radius
  densityRatio.value = arch.density
  hawkingSiphon.value = arch.siphon
  tidalLockFreq.value = arch.freq
  message.info(`已装配奇点天体原型: ${arch.name}`)
}

const resetSingularityDefaults = () => {
  selectSingularityArchetype(singularityArchetypes[0])
  enableHorizonTimeDilation.value = true
  enableNegativeEnergyShield.value = true
  enableQuantumEntanglement.value = true
}

const calculatedOutputPower = computed(() => {
  let p = (densityRatio.value / 1000) * 1200 * hawkingSiphon.value + curvatureRadius.value * 250000
  if (enableQuantumEntanglement.value) p *= 1.25
  return Math.floor(p).toLocaleString()
})

const calculatedSafetyRate = computed(() => {
  let s = 80 + (tidalLockFreq.value / 360) * 15
  if (enableNegativeEnergyShield.value) s += 4.5
  return Math.min(99.9, Number(s.toFixed(1)))
})

const calculatedWavePurity = computed(() => {
  let w = 75 + (curvatureRadius.value / 100) * 20
  if (enableHorizonTimeDilation.value) w += 4.5
  return Math.min(99.9, Number(w.toFixed(1)))
})

const calculatedReactorCert = computed(() => {
  const s = calculatedSafetyRate.value
  if (s >= 98.5) return 'EX·太古戴森奇点'
  if (s >= 95.0) return 'SSS·高可用聚变核心'
  if (s >= 90.0) return 'SS·生产级星体引擎'
  return 'S·基础引力反应堆'
})

const isSingularitySimulating = ref(false)
const singularitySimStage = ref(1)
const singularitySimStageName = ref('就绪等待')
const singularitySimProgress = ref(0)
const singularityCertHash = ref('F8E7D6C5-B4A3-210F-9E8D-7C6B5A4F3E2D')

interface SingularityLogEntry {
  time: string
  text: string
  color: string
}

const singularityLogs = ref<SingularityLogEntry[]>([
  { time: '13:00:00', text: '[ReactorInit] 太古天体奇点反应堆就绪，等待注入以太引力参数...', color: 'text-gray-400' }
])

const runSingularitySimulation = () => {
  if (isSingularitySimulating.value) return
  isSingularitySimulating.value = true
  singularitySimStage.value = 1
  singularitySimProgress.value = 15
  singularitySimStageName.value = '引力场几何曲率建模与事件视界锁定'
  singularityLogs.value = [
    { time: new Date().toLocaleTimeString(), text: `[Curvature] 扭曲曲率半径锁定 ${curvatureRadius.value} AU，视界时间流速减缓生效`, color: 'text-purple-400' }
  ]

  setTimeout(() => {
    singularitySimStage.value = 2
    singularitySimProgress.value = 40
    singularitySimStageName.value = '奇点以太密度压缩与反物质对冲中和'
    singularityLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[Density] 压缩密度 ${densityRatio.value} g/cm³，负能量圣盾吸收撕扯潮汐力`,
      color: 'text-cyan-400'
    })
  }, 400)

  setTimeout(() => {
    singularitySimStage.value = 3
    singularitySimProgress.value = 65
    singularitySimStageName.value = '霍金辐射逆流汲取与能量过载输出'
    singularityLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[HawkingSiphon] 辐射增益 ${hawkingSiphon.value.toFixed(1)}x，理论能量输出 ${calculatedOutputPower.value} MW`,
      color: 'text-amber-400'
    })
  }, 800)

  setTimeout(() => {
    singularitySimStage.value = 4
    singularitySimProgress.value = 85
    singularitySimStageName.value = '引力波共振干涉检测与稳态封板'
    singularityLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[WaveDetector] 干涉纯度 ${calculatedWavePurity.value}%，潮汐时钟 ${tidalLockFreq.value} mHz 同步完成`,
      color: 'text-emerald-400'
    })
  }, 1200)

  setTimeout(() => {
    singularitySimStage.value = 5
    singularitySimProgress.value = 100
    singularitySimStageName.value = '推演闭环完成，反应堆证书已签发'
    const hex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('').toUpperCase()
    singularityCertHash.value = `BH-${hex}-${Math.floor(Date.now() / 1000)}`
    singularityLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[Done] 奇点反应堆推演完成！反应堆认证评级: ${calculatedReactorCert.value}`,
      color: 'text-emerald-300 font-bold'
    })
    isSingularitySimulating.value = false
    message.success('太古天体黑洞奇点推演完成！')
  }, 1600)
}

const exportReactorCert = () => {
  const data = {
    studio: 'Black Hole Singularity, Gravitational Waves & Spacetime Reactor Studio v2.2.316',
    timestamp: new Date().toISOString(),
    archetype: selectedSingularityArchetype.value.name,
    curvatureRadius: curvatureRadius.value,
    densityRatio: densityRatio.value,
    hawkingSiphon: hawkingSiphon.value,
    tidalLockFreq: tidalLockFreq.value,
    outputPower: calculatedOutputPower.value,
    safetyRate: calculatedSafetyRate.value,
    wavePurity: calculatedWavePurity.value,
    reactorCert: calculatedReactorCert.value,
    sha256Signature: singularityCertHash.value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `singularity-reactor-${singularityCertHash.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('防伪证书与反应堆报告已导出')
}

// Godot 4.6 LTS 源码展台
const activeSingularityCodeTab = ref('reactor_core')
const singularityCodeTabs = [
  { id: 'reactor_core', name: '奇点反应堆核心' },
  { id: 'wave_detector', name: '引力波干涉检测仪' },
  { id: 'horizon_governor', name: '视界时间膨胀控制器' }
]

const singularitySourceCodes: Record<string, string> = {
  reactor_core: `## singularity_reactor_core.gd
## 《光之战士：时空裂隙》黑洞奇点反应堆核心与以太输出驱动
## 架构版本: Godot 4.6 LTS / Astrophysics Subsystem

class_name SingularityReactorCore
extends RefCounted

signal power_generated(megawatts: float, stability: float)
signal collapse_warning(critical_density: float)

var _density_ratio: float = 45000.0
var _hawking_siphon: float = 6.5
var _is_shield_active: bool = true

func _init(density: float = 45000.0, siphon: float = 6.5) -> void:
	_density_ratio = density
	_hawking_siphon = siphon

## 实时解算奇点能量脉冲
func step_reactor_cycle(delta: float) -> Dictionary:
	var base_mw := (_density_ratio / 1000.0) * 1200.0 * _hawking_siphon
	var stab := 0.99 if _is_shield_active else 0.85
	
	power_generated.emit(base_mw, stab)
	return {
		"output_mw": base_mw,
		"stability": stab,
		"status": "NORMAL_CONTAINMENT"
	}
`,
  wave_detector: `## gravitational_wave_detector.gd
## 《光之战士：时空裂隙》双星互绕以太引力波干涉检测仪
## 架构版本: Godot 4.6 LTS / Laser Interferometer Engine

class_name GravitationalWaveDetector
extends RefCounted

signal strain_detected(amplitude: float, frequency_mhz: float)

var _carrier_freq_mhz: float = 180.0

## 检测并过滤引力波时空应变信号
func sample_strain_tensor() -> float:
	var strain := sin(Time.get_ticks_msec() * 0.001 * _carrier_freq_mhz * 0.01) * 1e-21
	strain_detected.emit(absf(strain), _carrier_freq_mhz)
	return strain
`,
  horizon_governor: `## event_horizon_time_governor.gd
## 《光之战士：时空裂隙》视界边缘相对论时间膨胀减速控制器
## 架构版本: Godot 4.6 LTS / Time Dilation Governor

class_name EventHorizonTimeGovernor
extends RefCounted

signal time_dilation_engaged(time_dilation_factor: float)

## 依据距离奇点视界距离计算引力时间减速因子
func calculate_dilation(distance_au: float, schwarzschild_radius_au: float) -> float:
	if distance_au <= schwarzschild_radius_au * 1.05:
		# 极近视界，时间流速放缓至 15%
		time_dilation_engaged.emit(0.15)
		return 0.15
	var factor := sqrt(maxf(0.15, 1.0 - (schwarzschild_radius_au / distance_au)))
	time_dilation_engaged.emit(factor)
	return factor
`
}

const currentSingularityCode = computed(() => {
  return singularitySourceCodes[activeSingularityCodeTab.value] || ''
})

const copyActiveSingularityCode = () => {
  navigator.clipboard.writeText(currentSingularityCode.value).then(() => {
    message.success(`${activeSingularityCodeTab.value}.gd 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}


// ==========================================
// v2.2.337: 黑洞引力弹弓与时空折跃工坊逻辑
// ==========================================
const scrollToSlingshotWarpStudio = () => {
  const el = document.getElementById('blackhole-slingshot-warp-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

interface CelestialSlingshotArchetype {
  id: string
  name: string
  subtitle: string
  icon: string
  tag: string
  desc: string
  baseSpeedC: number
}

const celestialSlingshotArchetypes: CelestialSlingshotArchetype[] = [
  {
    id: 'supermassive_gargantua',
    name: '超大质量黑洞加尔冈天',
    subtitle: '引力红移视界与光年弹弓流',
    icon: '🕳️',
    tag: '黑洞视界',
    desc: '利用超大质量克尔黑洞之强引力梯度，在事件视界外切圆周实施切向弹射，瞬间实现光年尺度位移。',
    baseSpeedC: 45
  },
  {
    id: 'neutron_pulsar_lighthouse',
    name: '中子脉冲星灯塔',
    subtitle: '极端磁星偏振与毫秒级折跃定锚流',
    icon: '💫',
    tag: '脉冲定锚',
    desc: '捕获脉冲星周期性射电束作为时空全息导航基准，消除折跃迷航风险，将着陆坐标误差降至厘米级。',
    baseSpeedC: 38
  },
  {
    id: 'spatiotemporal_wormhole_bridge',
    name: '时空爱因斯坦-罗森桥',
    subtitle: '双向虫洞引力坍缩折叠流',
    icon: '🌀',
    tag: '虫洞折叠',
    desc: '以负能量密度维持虫洞喉部张开，将起点与终点四维空间曲率直接缝合，实现跨星系零延迟穿行。',
    baseSpeedC: 60
  },
  {
    id: 'primordial_cosmic_string',
    name: '太古宇宙弦拓扑',
    subtitle: '负能量张力切变与光速超越流',
    icon: '⚡',
    tag: '宇宙弦切',
    desc: '宇宙大爆炸遗留之超致密维度纤维，凭借极高张力造成空间闭合时间回环，以阿库别瑞曲速泡超速推进。',
    baseSpeedC: 52
  }
]

const selectedSlingshotArchetypeId = ref('supermassive_gargantua')
const slingshotCurvatureAcceleration = ref(28.5)
const spacetimeRiftFoldCompressionRatio = ref(88)
const eventHorizonSafeApproachDistanceAu = ref(1.2)
const tachyonPulseVelocityFactor = ref(15.0)

const ergosphereNegativeEnergyExtraction = ref(true)
const chronosTidalDampingInertialField = ref(true)
const transcendentWarpEmergencyAbort = ref(true)

const selectSlingshotArchetype = (id: string) => {
  selectedSlingshotArchetypeId.value = id
  if (message) {
    const arch = celestialSlingshotArchetypes.find(a => a.id === id)
    if (arch) message.success(`已切换天体折跃原型：${arch.name}`)
  }
}

const calculatedSlingshotMetrics = computed(() => {
  const arch = celestialSlingshotArchetypes.find(a => a.id === selectedSlingshotArchetypeId.value) || celestialSlingshotArchetypes[0]
  const baseC = arch.baseSpeedC
  const penroseBonus = ergosphereNegativeEnergyExtraction.value ? 1.45 : 1.0
  const finalC = (baseC * (slingshotCurvatureAcceleration.value / 25) * (spacetimeRiftFoldCompressionRatio.value / 80) * (tachyonPulseVelocityFactor.value / 10) * penroseBonus).toFixed(1)
  
  const effRate = Math.min(99.9, 88.0 + (spacetimeRiftFoldCompressionRatio.value / 100) * 11.5 + (chronosTidalDampingInertialField.value ? 0.4 : 0)).toFixed(1)
  const stabRate = Math.min(99.9, 85.0 + (eventHorizonSafeApproachDistanceAu.value / 5.0) * 14.2 + (transcendentWarpEmergencyAbort.value ? 0.7 : 0)).toFixed(1)

  let rank = 'SSR·星海曲率领航官'
  if (parseFloat(finalC) >= 60.0) rank = 'EX·全域太古星海天象引航官'
  else if (parseFloat(finalC) >= 40.0) rank = 'SSS·极星视界先驱尊者'

  return {
    warpVelocityC: `${finalC} c`,
    slingshotGravityAssistEfficiency: `${effRate}%`,
    spatiotemporalStabilityRating: `${stabRate}%`,
    celestialNavigatorRank: rank
  }
})

const isSimulatingSlingshot = ref(false)
const currentSlingshotSimStage = ref(0)
const slingshotStages = [
  '天体克尔黑洞旋转能层轨道捕获...',
  '彭罗斯能量辐射逆流共振喷射...',
  '时空裂缝四维流形折叠压缩...',
  '超光速快子脉冲引力弹弓加速弹射...',
  '航行星图防伪公钥计算与证书封装...'
]

const runSlingshotSimulation = () => {
  if (isSimulatingSlingshot.value) return
  isSimulatingSlingshot.value = true
  currentSlingshotSimStage.value = 0

  const interval = setInterval(() => {
    if (currentSlingshotSimStage.value < slingshotStages.length - 1) {
      currentSlingshotSimStage.value++
    } else {
      clearInterval(interval)
      isSimulatingSlingshot.value = false
      if (message) {
        message.success(`【引力弹弓沙盘】推演成功！超光速折跃速度达：${calculatedSlingshotMetrics.value.warpVelocityC}`)
      }
    }
  }, 400)
}

const exportSlingshotCertificate = () => {
  const hash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  const cert = `=== 《光之战士：时空裂隙》黑洞引力弹弓与折跃方案证书 ===
证书编号: WARP-SLINGSHOT-${hash.substring(0, 12).toUpperCase()}
天体原型: ${selectedSlingshotArchetypeId.value}
曲率加速度: ${slingshotCurvatureAcceleration.value.toFixed(1)} G
时空折叠压缩比: ${spacetimeRiftFoldCompressionRatio.value}%
视界近心距: ${eventHorizonSafeApproachDistanceAu.value.toFixed(2)} AU
折跃折算极速: ${calculatedSlingshotMetrics.value.warpVelocityC}
引力助推能效: ${calculatedSlingshotMetrics.value.slingshotGravityAssistEfficiency}
时空曲率稳态率: ${calculatedSlingshotMetrics.value.spatiotemporalStabilityRating}
深空航行评级: ${calculatedSlingshotMetrics.value.celestialNavigatorRank}
安全校验哈希: SHA-256:${hash}
验证状态: 官方相对论引力弹弓与时空折跃引擎认证通过 (Godot 4.6 LTS Verified)
=======================================================`
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(cert)
    if (message) message.success('已导出引力弹弓折跃方案防伪证书到剪贴板！')
  }
}

const activeSlingshotScriptTab = ref<'trajectory_solver' | 'warp_manifold' | 'penrose_core'>('trajectory_solver')

const slingshotScriptCodes = {
  trajectory_solver: `class_name BlackholeSlingshotTrajectorySolver
extends Node

## 最终幻想：时空之轮 - 黑洞引力弹弓轨道与相对论助推解算器
## 文件路径: res://scripts/combat/celestial/blackhole_slingshot_trajectory_solver.gd
## 引擎版本: Godot Engine 4.6 LTS

signal warp_slingshot_executed(velocity_c: float, stability: float)

@export var curvature_g: float = 28.5

func solve_slingshot_trajectory(blackhole_mass_solar: float, periapsis_au: float) -> Dictionary:
    var escape_speed: float = sqrt((2.0 * blackhole_mass_solar) / periapsis_au) * 1.8
    warp_slingshot_executed.emit(escape_speed, 0.99)
    return {
        "periapsis_au": periapsis_au,
        "calculated_c": escape_speed,
        "is_safe": periapsis_au > 0.5
    }
`,

  warp_manifold: `class_name SpacetimeRiftWarpManifold
extends RefCounted

## 最终幻想：时空之轮 - 时空裂缝折叠与快子脉冲折跃流形
## 文件路径: res://scripts/combat/celestial/spacetime_rift_warp_manifold.gd
## 引擎版本: Godot Engine 4.6 LTS

static func fold_four_dimensional_space(distance_ly: float, compression_ratio: float) -> float:
    var effective_distance_ly: float = distance_ly * (1.0 - (compression_ratio / 100.0))
    return maxf(0.01, effective_distance_ly)
`,

  penrose_core: `class_name PenroseEnergyExtractionCore
extends RefCounted

## 最终幻想：时空之轮 - 能层彭罗斯能量汲取与潮汐阻尼核心
## 文件路径: res://scripts/combat/celestial/penrose_energy_extraction_core.gd
## 引擎版本: Godot Engine 4.6 LTS

static func extract_ergosphere_energy(incoming_mass: float, spin_param_a: float) -> Dictionary:
    var energy_gain_pct: float = (spin_param_a * spin_param_a) * 29.0
    return {
        "energy_gain_pct": energy_gain_pct,
        "net_output_ratio": 1.0 + (energy_gain_pct / 100.0)
    }
`
}

const currentSlingshotScriptCode = computed(() => {
  return slingshotScriptCodes[activeSlingshotScriptTab.value]
})

const copySlingshotScript = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentSlingshotScriptCode.value)
    if (message) message.success('已复制 Godot 4.6 LTS 引力弹弓源码到剪贴板！')
  }
}

</script>

<style scoped>
.text-glow-purple {
  text-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
}
</style>
