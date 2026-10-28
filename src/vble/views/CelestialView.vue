<template>
  <div class="celestial-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-indigo-950/80 border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/30">
              VBLE Void &amp; Celestial Matrix v2.2.250
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

    <!-- Godot 4.6 LTS 核心实机代码展台 (双 Tab 切换) -->
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
          <!-- 双 Tab 切换 -->
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
          </div>
          <n-button size="tiny" secondary type="primary" @click="copyGodotCode">
            {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
          </n-button>
        </div>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-56 custom-scrollbar"><code v-if="activeCelestialGodotTab === 'gravity'">{{ godotCodeText }}</code><code v-else>{{ godotSingularityCodeText }}</code></pre>
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
    const textToCopy = activeCelestialGodotTab.value === 'gravity' ? godotCodeText : godotSingularityCodeText
    const fileName = activeCelestialGodotTab.value === 'gravity' ? 'celestial_gravity.gd' : 'singularity_collapse_resolver.gd'
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
const activeCelestialGodotTab = ref<'gravity' | 'singularity'>('singularity')

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
</script>

<style scoped>
.text-glow-purple {
  text-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
}
</style>
