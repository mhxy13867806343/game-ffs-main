<template>
  <div class="story-page max-w-7xl mx-auto space-y-8 px-3 sm:px-6 py-4">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-purple-950/70 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.2)] relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/3 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              VBLE Story, Timelines &amp; Causality Convergence Studio v2.2.294
            </span>
            <span class="text-xs text-gray-400">光暗双线叙事、时空因果与创世神纪推演</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>📖</span> 史诗编年史：光与暗双线三十章节与创世神纪工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            纵览从始源神殿晶石破裂、光暗双线各自探索、到全 44 节拍主线全域雷达导航、真实居民弱引用标记系统、七大终焉宿命与太古多元创世神纪推演沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="switchToConvergenceStudio"
          >
            <template #icon><span>🌀</span></template>
            世界线收束工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="switchToEpilogueStudio"
          >
            <template #icon><span>🌌</span></template>
            创世神纪推演
          </n-button>
          <router-link to="/vble/scenes">
            <n-button type="info" size="medium" round secondary class="shadow-md">
              <template #icon><span>🗺️</span></template>
              97处全域风土
            </n-button>
          </router-link>
          <router-link to="/vble/docs">
            <n-button type="warning" size="medium" round secondary class="shadow-md">
              <template #icon><span>📜</span></template>
              架构白皮书
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

    <!-- 主模式切换标签页 -->
    <div class="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
      <button
        v-for="mode in navModes"
        :key="mode.key"
        type="button"
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
        :class="activeMode === mode.key
          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]'
          : 'bg-slate-900 text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-800'"
        @click="activeMode = mode.key"
      >
        <span>{{ mode.icon }}</span>
        <span>{{ mode.label }}</span>
        <span
          v-if="mode.badge"
          class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-600 text-white animate-pulse"
        >
          {{ mode.badge }}
        </span>
      </button>
    </div>

    <!-- 1. 三十章节史诗编年全览 -->
    <div v-if="activeMode === 'lore'" class="space-y-6">
      <!-- 篇章阵营过滤 -->
      <div class="flex flex-wrap gap-2 justify-center" role="group" aria-label="按篇章阵营筛选">
        <n-button
          v-for="p in parties"
          :key="p.id"
          size="small"
          class="party-filter"
          :type="selectedParty === p.id ? 'primary' : 'default'"
          :aria-pressed="selectedParty === p.id"
          secondary
          @click="selectedParty = p.id"
        >
          {{ p.name }}
        </n-button>
      </div>

      <!-- 章节时间轴卡片 -->
      <div class="space-y-4">
        <n-card
          v-for="ch in filteredChapters"
          :key="ch.id"
          hoverable
          class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-xs px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 font-bold font-mono">
                  ACT.{{ ch.index }}
                </span>
                <span class="text-lg font-bold text-gray-100">{{ ch.title }}</span>
                <n-tag size="tiny" :type="getPartyTag(ch.party)">{{ getPartyLabel(ch.party) }}</n-tag>
              </div>
              <p class="text-xs text-gray-400">{{ ch.summary }}</p>
              <div class="text-xs text-gray-300 bg-slate-900/60 p-2.5 rounded border border-slate-800 leading-relaxed">
                {{ ch.overview }}
              </div>
            </div>

            <div class="flex-shrink-0 space-y-1.5 p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-right min-w-[200px]">
              <div class="text-gray-400">⚔️ 首领: <strong class="text-red-400">{{ ch.boss_name }}</strong></div>
              <div class="text-gray-400">🏰 发生地: <strong class="text-cyan-300">{{ ch.dungeon_name }}</strong></div>
              <div class="text-gray-400">⚡ 建议: <strong class="text-amber-300">{{ ch.recommended_level }}</strong></div>
              <div class="text-yellow-300/90 text-[11px] pt-1 border-t border-slate-800 truncate">
                🎁 {{ ch.rewards }}
              </div>
            </div>
          </div>
        </n-card>
      </div>
    </div>

    <!-- 2. 实装 44 节拍主线目标雷达导航 -->
    <div v-if="activeMode === 'radar'" class="space-y-6">
      <!-- 概览指标卡 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div class="text-xs text-gray-400">主线节拍覆盖</div>
          <div class="text-2xl font-black text-cyan-400 font-mono mt-1">44 节拍</div>
          <div class="text-[10px] text-gray-500 mt-0.5">ch00 ~ ch12 全域联动</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div class="text-xs text-gray-400">真实居民标记</div>
          <div class="text-2xl font-black text-emerald-400 font-mono mt-1">{{ residentMarkerCount }} 处</div>
          <div class="text-[10px] text-gray-500 mt-0.5">挂载 ResidentSourceRegistry</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div class="text-xs text-gray-400">来源生命周期</div>
          <div class="text-2xl font-black text-amber-400 font-mono mt-1">弱引用隔离</div>
          <div class="text-[10px] text-gray-500 mt-0.5">零静态强引用泄漏</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div class="text-xs text-gray-400">状态机安全门禁</div>
          <div class="text-2xl font-black text-purple-400 font-mono mt-1">严格纯读</div>
          <div class="text-[10px] text-gray-500 mt-0.5">对白/菜单/过场瞬时阻断</div>
        </div>
      </div>

      <!-- 筛选与搜索工具栏 -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121626]/80 border border-slate-800">
        <div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            v-for="st in beatStageFilters"
            :key="st.key"
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border select-none whitespace-nowrap"
            :class="activeStageFilter === st.key
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.45)]'
              : 'bg-slate-800 text-gray-200 border-slate-700 hover:(bg-slate-700 text-white)'"
            @click="activeStageFilter = st.key"
          >
            <span>{{ st.label }}</span>
            <span class="ml-1 text-[10px] opacity-80 font-mono">({{ getStageCount(st.key) }})</span>
          </button>
        </div>
        <div class="w-full sm:w-72">
          <n-input
            v-model:value="beatSearchKeyword"
            placeholder="搜索节拍代号 / 场景 / 居民 / 动作..."
            clearable
            size="small"
          >
            <template #prefix>🔍</template>
          </n-input>
        </div>
      </div>

      <!-- 44 节拍卡片列表 -->
      <div v-if="filteredBeats.length > 0" class="space-y-4">
        <n-card
          v-for="beat in filteredBeats"
          :key="beat.id"
          hoverable
          class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
        >
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <!-- 左侧核心行动与场景 -->
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 font-bold font-mono">
                  {{ beat.id }}
                </span>
                <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-medium">
                  {{ beat.act }}
                </span>
                <span class="text-base sm:text-lg font-bold text-white">{{ beat.title }}</span>
                <n-tag size="tiny" :type="beat.hasResidentMarker ? 'success' : 'default'">
                  {{ beat.hasResidentMarker ? '居民实体授标' : '地标/剧情节点' }}
                </n-tag>
              </div>

              <div class="flex flex-wrap items-center gap-4 text-xs">
                <span class="text-gray-300">
                  🎯 目标行动: <strong class="text-cyan-400 font-semibold">{{ beat.action }}</strong>
                </span>
                <span class="text-gray-400">|</span>
                <span class="text-gray-300">
                  📍 所在场景: <strong class="text-amber-300 font-semibold">{{ beat.mapName }}</strong>
                  <span class="text-[11px] font-mono text-gray-500 ml-1">({{ beat.mapId }})</span>
                </span>
              </div>

              <p class="text-xs text-gray-300 bg-slate-900/60 p-2.5 rounded border border-slate-800 leading-relaxed">
                {{ beat.details }}
              </p>
            </div>

            <!-- 右侧技术规约与坐标雷达 -->
            <div class="flex-shrink-0 space-y-1.5 p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-left lg:text-right min-w-[260px]">
              <div class="flex items-center lg:justify-end gap-1.5">
                <span class="text-gray-400">现场实体:</span>
                <strong :class="beat.hasResidentMarker ? 'text-emerald-400' : 'text-gray-400'">
                  {{ beat.residentName ? `${beat.residentName} (${beat.residentNpcId || '匿名居民'})` : '无固定居民 (保持null)' }}
                </strong>
              </div>
              <div class="flex items-center lg:justify-end gap-1.5">
                <span class="text-gray-400">实机世界坐标:</span>
                <strong class="text-cyan-300 font-mono">{{ beat.coords }}</strong>
              </div>
              <div class="text-yellow-400/90 text-[11px] pt-1.5 border-t border-slate-800/80">
                🛡️ {{ beat.guardStatus }}
              </div>
            </div>
          </div>
        </n-card>
      </div>

      <!-- 搜索无结果兜底 -->
      <div v-else class="text-center py-12 bg-[#121626]/60 border border-slate-800 rounded-xl space-y-2">
        <span class="text-3xl block">🔍</span>
        <p class="text-gray-300 font-bold">暂无匹配的主线目标节拍</p>
        <p class="text-xs text-gray-500">可尝试重置阶段筛选或清除搜索关键词</p>
        <n-button size="small" type="primary" secondary @click="resetBeatSearch">重置筛选</n-button>
      </div>
    </div>

    <!-- 3. 时空因果分支推演沙盘 -->
    <div v-if="activeMode === 'branches'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🔀</span> 时空裂隙因果律推演沙盘 (Timeline Causality & Branching Studio)
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              推演四大主线分支选择对光暗队伍命运、太古神兵觉醒、隐藏第31章及多重结局的深远因果影响。
            </p>
          </div>
          <n-button size="small" round secondary type="warning" @click="resetChoices">
            重置所有抉择
          </n-button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 核心因果抉择面板 -->
          <div class="space-y-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div class="text-xs font-bold text-amber-300 uppercase tracking-wider">
              ⚖️ 时空因果分歧抉择点
            </div>

            <!-- 抉择 1 -->
            <div class="space-y-2">
              <label class="text-xs text-gray-300 block font-semibold">1. 水晶裂解时的优先营救抉择：</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-left"
                  :class="choices.rescue === 'temple'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold'
                    : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'"
                  @click="choices.rescue = 'temple'"
                >
                  <div>🏛️ 始源神殿修女</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">圣灵亲和 +20</div>
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-left"
                  :class="choices.rescue === 'scholar'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                    : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'"
                  @click="choices.rescue = 'scholar'"
                >
                  <div>📜 封印文献学者</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">太古解析 +20</div>
                </button>
              </div>
            </div>

            <!-- 抉择 2 -->
            <div class="space-y-2">
              <label class="text-xs text-gray-300 block font-semibold">2. 暗之队与混沌囚徒的契约方式：</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-left"
                  :class="choices.pact === 'dominate'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-400 font-bold'
                    : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'"
                  @click="choices.pact = 'dominate'"
                >
                  <div>⛓️ 强力血誓奴役</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">暗攻击 +35%</div>
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-left"
                  :class="choices.pact === 'empathy'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 font-bold'
                    : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'"
                  @click="choices.pact = 'empathy'"
                >
                  <div>🤝 平等灵魂共鸣</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">全员羁绊 +25</div>
                </button>
              </div>
            </div>

            <!-- 抉择 3 -->
            <div class="space-y-2">
              <label class="text-xs text-gray-300 block font-semibold">3. 封印之城太古神兵开启次序：</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-left"
                  :class="choices.forge === 'sword'
                    ? 'bg-red-500/20 text-red-300 border-red-400 font-bold'
                    : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'"
                  @click="choices.forge = 'sword'"
                >
                  <div>🗡️ 圣剑神圣破邪</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">物理破坏加成</div>
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-left"
                  :class="choices.forge === 'staff'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-400 font-bold'
                    : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'"
                  @click="choices.forge = 'staff'"
                >
                  <div>🪄 贤者创世法杖</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">全九阶禁术贯通</div>
                </button>
              </div>
            </div>

            <!-- 抉择 4 -->
            <div class="space-y-2">
              <label class="text-xs text-gray-300 block font-semibold">4. 虚空真祖决战前的本源融合：</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-left"
                  :class="choices.voidConvergence === 'balance'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                    : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'"
                  @click="choices.voidConvergence = 'balance'"
                >
                  <div>☯️ 光暗双核同调</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">触发真结局路线</div>
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-left"
                  :class="choices.voidConvergence === 'polar'
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400 font-bold'
                    : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'"
                  @click="choices.voidConvergence = 'polar'"
                >
                  <div>💥 极性对撞寂灭</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">破晓净化路线</div>
                </button>
              </div>
            </div>
          </div>

          <!-- 右侧推演结果面板 -->
          <div class="lg:col-span-2 space-y-4">
            <!-- 结局预测总览卡 -->
            <div class="p-5 rounded-xl border bg-gradient-to-br from-slate-950 to-slate-900 space-y-3" :class="endingPrediction.cardBorder">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold px-2 py-0.5 rounded" :class="endingPrediction.tagClass">
                  {{ endingPrediction.code }}
                </span>
                <span class="text-xs text-gray-400">达成概率：<strong class="text-amber-400 font-mono">{{ endingPrediction.probability }}%</strong></span>
              </div>

              <div class="flex items-center gap-3">
                <span class="text-3xl">{{ endingPrediction.icon }}</span>
                <div>
                  <h4 class="text-lg font-extrabold text-white">{{ endingPrediction.title }}</h4>
                  <p class="text-xs text-gray-300 mt-0.5 leading-relaxed">{{ endingPrediction.synopsis }}</p>
                </div>
              </div>

              <div class="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                <div class="font-bold text-cyan-300 flex items-center gap-1">
                  <span>✨</span> 因果链条解锁成果：
                </div>
                <ul class="text-gray-300 space-y-1 text-xs">
                  <li v-for="(feat, idx) in endingPrediction.rewards" :key="idx" class="flex items-start gap-1.5">
                    <span class="text-cyan-400 shrink-0 font-bold">✔</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 时空连续体四维指标推演 -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">光之圣灵共鸣</div>
                <div class="text-xl font-black text-cyan-400 font-mono mt-1">{{ statLightResonance }} pts</div>
                <div class="text-[10px] text-gray-500 mt-0.5">索尔主导亲和</div>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">暗之虚无深邃</div>
                <div class="text-xl font-black text-purple-400 font-mono mt-1">{{ statDarkDepth }} pts</div>
                <div class="text-[10px] text-gray-500 mt-0.5">纳哈特混沌掌控</div>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">双队羁绊信任</div>
                <div class="text-xl font-black text-emerald-400 font-mono mt-1">{{ statBondTrust }} pts</div>
                <div class="text-[10px] text-gray-500 mt-0.5">合体技能解锁阈值</div>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">隐藏31章开启度</div>
                <div class="text-xl font-black text-amber-400 font-mono mt-1">{{ statChapter31Unlock }}%</div>
                <div class="text-[10px] text-gray-500 mt-0.5">虚空真祖决战前置</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Godot 4.x 引擎主线状态机源码 -->
    <div v-if="activeMode === 'engine_code'" class="space-y-4">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all"
              :class="activeGdTab === 'timeline'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-950 text-gray-400 border border-slate-800 hover:text-white'"
              @click="activeGdTab = 'timeline'"
            >
              story_timeline_manager.gd
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all"
              :class="activeGdTab === 'ending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-slate-950 text-gray-400 border border-slate-800 hover:text-white'"
              @click="activeGdTab = 'ending'"
            >
              ending_destiny_resolver.gd
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all"
              :class="activeGdTab === 'epilogue'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'bg-slate-950 text-gray-400 border border-slate-800 hover:text-white'"
              @click="activeGdTab = 'epilogue'"
            >
              multiverse_epilogue_simulator.gd
            </button>
          </div>
          <n-button size="small" round secondary type="info" @click="copyGdScript">
            <template #icon><span>📋</span></template>
            复制代码
          </n-button>
        </div>

        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[550px]"><code v-if="activeGdTab === 'timeline'">{{ gdScriptCode }}</code><code v-else-if="activeGdTab === 'ending'">{{ gdScriptEndingCode }}</code><code v-else>{{ gdScriptEpilogueCode }}</code></pre>
      </div>
    </div>

    <!-- 全域平行世界线因果坍缩与时空收束工坊 (Parallel Timelines & Causality Convergence Studio v2.2.294) -->
    <div v-if="activeMode === 'timeline_convergence'" id="timeline-convergence-studio" class="space-y-6">
      <!-- 横幅标头 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900/95 to-purple-950/70 border border-indigo-500/40 shadow-[0_0_35px_rgba(99,102,241,0.22)] space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-indigo-950 pb-5">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                TIMELINE CONVERGENCE &amp; CAUSALITY STUDIO
              </span>
              <span class="text-xs text-gray-400 font-mono">v2.2.294 官方实机矩阵</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
              <span>🌀</span> 全域平行世界线因果坍缩、量子抉择分歧与时空收束工坊
            </h2>
            <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
              对齐 Godot 4.6 LTS 架构标准：深度解算四大平行世界线分支、四维连续时空因果微调、三大时空因果安全护盾、五阶段世界线收束仿真推演与防伪方案书离线导出。
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <n-button size="small" secondary type="warning" @click="resetConvergenceStudio">
              🔄 重置世界线参数
            </n-button>
            <n-button size="small" secondary type="error" @click="triggerWorldlineCollapse">
              💥 触发量子波态坍缩
            </n-button>
            <n-button size="small" type="primary" class="font-bold shadow" @click="exportConvergenceCertificate">
              📜 导出收束认证证书
            </n-button>
          </div>
        </div>

        <!-- 四大平行世界线选择卡 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="line in timelineArchetypes"
            :key="line.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedTimelineId === line.id
              ? 'bg-indigo-950/50 border-indigo-400 shadow-[0_0_18px_rgba(99,102,241,0.3)] ring-1 ring-indigo-400/50'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'"
            @click="selectedTimelineId = line.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ line.icon }}</span>
              <n-tag :type="selectedTimelineId === line.id ? 'info' : 'default'" size="tiny" round>
                {{ line.tag }}
              </n-tag>
            </div>
            <div class="text-sm font-bold text-white mb-1">{{ line.name }}</div>
            <div class="text-[11px] text-gray-400 leading-relaxed mb-3">{{ line.desc }}</div>
            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span class="text-gray-400">终局收敛相</span>
              <span class="text-indigo-300 font-semibold">{{ line.destiny }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 参数微调滑块与安全保护盾 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 左侧: 4维连续时空因果微调滑块 (7 cols) -->
        <div class="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="text-indigo-400 font-bold text-sm">🎛️ 时空世界线因果动力学参数矩阵</span>
              <span class="text-[11px] text-gray-400 font-mono">4-Axis Spacetime Sliders</span>
            </div>
            <button
              type="button"
              class="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
              @click="resetConvergenceStudio"
            >
              重置参数
            </button>
          </div>

          <!-- 滑块 1: 因果干涉熵值 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>⚡</span> 因果干涉熵值 (Causality Entropy)
              </span>
              <span class="font-mono text-indigo-400 font-bold">{{ causalityEntropy.toFixed(2) }} S/k</span>
            </div>
            <n-slider
              v-model:value="causalityEntropy"
              :min="0.10"
              :max="5.00"
              :step="0.05"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>0.10 S/k (绝对决定论)</span>
              <span>2.50 S/k (经典量子态)</span>
              <span>5.00 S/k (时空狂暴紊乱)</span>
            </div>
          </div>

          <!-- 滑块 2: 世界线收束吸引子半径 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>🧲</span> 世界线收束吸引子半径 (Attractor Radius)
              </span>
              <span class="font-mono text-cyan-400 font-bold">{{ attractorRadius }} Mpc</span>
            </div>
            <n-slider
              v-model:value="attractorRadius"
              :min="50"
              :max="1000"
              :step="25"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>50 Mpc (局部本星系)</span>
              <span>450 Mpc (室女超星系团)</span>
              <span>1000 Mpc (全域宇宙可观测界)</span>
            </div>
          </div>

          <!-- 滑块 3: 量子抉择相干度 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>🔬</span> 量子抉择相干度 (Decision Coherence)
              </span>
              <span class="font-mono text-emerald-400 font-bold">{{ decisionCoherence }}%</span>
            </div>
            <n-slider
              v-model:value="decisionCoherence"
              :min="10"
              :max="100"
              :step="5"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>10% (退相干混乱)</span>
              <span>60% (主观意识聚焦)</span>
              <span>100% (神性绝对同态)</span>
            </div>
          </div>

          <!-- 滑块 4: 超时间轴回溯深度 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>⏳</span> 超时间轴回溯深度 (Rewind Depth)
              </span>
              <span class="font-mono text-amber-400 font-bold">{{ timelineRewindDepth }} 纪元</span>
            </div>
            <n-slider
              v-model:value="timelineRewindDepth"
              :min="1"
              :max="10"
              :step="1"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1 纪元 (短周期修复)</span>
              <span>5 纪元 (始源水晶分裂期)</span>
              <span>10 纪元 (太古创世前夜)</span>
            </div>
          </div>
        </div>

        <!-- 右侧: 3大因果护盾开关与能效雷达 (5 cols) -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
            <span class="text-purple-400 font-bold text-sm">🛡️ 时空因果律安全护盾与断路器</span>
            <n-tag type="info" size="tiny" round>主动防护体系</n-tag>
          </div>

          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🔒</span> 霍金时序防环护盾
                </div>
                <div class="text-[11px] text-gray-400">严禁封闭类时曲线 CTC，彻底消除祖父悖论死锁</div>
              </div>
              <n-switch v-model:value="chronologyProtectionField" size="small" />
            </div>

            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚓</span> 世界线观测者锚定仪
                </div>
                <div class="text-[11px] text-gray-400">主观意志锁定量子波态坍缩，防止世界线震荡漂移</div>
              </div>
              <n-switch v-model:value="observerAnchorMatrix" size="small" />
            </div>

            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚡</span> 量子纠缠因果断路器
                </div>
                <div class="text-[11px] text-gray-400">因果反冲超载瞬间熔断异界扰动，保全主干线</div>
              </div>
              <n-switch v-model:value="entanglementCircuitBreaker" size="small" />
            </div>
          </div>

          <!-- 能效雷达卡 -->
          <div class="p-3 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 space-y-2">
            <div class="text-xs font-bold text-indigo-300 flex items-center justify-between">
              <span>全域时空因果相干指数</span>
              <span class="font-mono text-emerald-400 font-bold">{{ calculatedTimelineStability.toFixed(1) }}%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                class="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-1.5 rounded-full transition-all duration-300"
                :style="{ width: Math.min(calculatedTimelineStability, 100) + '%' }"
              ></div>
            </div>
            <div class="text-[10px] text-gray-400 flex justify-between">
              <span>收束阈值: 75.0%</span>
              <span class="text-indigo-300">因果稳固态: {{ calculatedTimelineStability > 95 ? '绝对超稳' : '高度可控' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 实时解算数值仪表盘 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">世界线稳定性 (Stability)</div>
          <div class="text-2xl font-black text-indigo-400 font-mono mt-1">{{ calculatedTimelineStability.toFixed(1) }}%</div>
          <div class="text-[10px] text-indigo-300/80 mt-0.5">杜绝时间线断裂崩解</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">悖论排斥势垒 (Barrier)</div>
          <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ calculatedParadoxBarrier.toLocaleString() }} J</div>
          <div class="text-[10px] text-cyan-300/80 mt-0.5">因果律防坍缩动能</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">收束吸引力强度 (Pull)</div>
          <div class="text-2xl font-black text-emerald-400 font-mono mt-1">{{ calculatedAttractorPull.toFixed(1) }} G</div>
          <div class="text-[10px] text-emerald-300/80 mt-0.5">吸引子大尺度牵引</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">世界线认证位阶 (Tier)</div>
          <div class="text-2xl font-black text-purple-400 font-mono mt-1">{{ timelineCertificationTier }}</div>
          <div class="text-[10px] text-purple-300/80 mt-0.5">太古神纪唯一真理线</div>
        </div>
      </div>

      <!-- 五阶段世界线收束仿真推演终端 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-indigo-500/30 shadow-2xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 font-bold text-sm">⚡ 平行世界线收束与量子因果五阶段推演终端</span>
            <n-tag type="info" size="tiny" round>Live Simulation Pipeline</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-slate-950 shadow-md disabled:opacity-50"
              :disabled="isSimulatingConvergence"
              @click="runConvergenceSimulation"
            >
              {{ isSimulatingConvergence ? '正在推演收束中...' : '▶ 启动全流程世界线收束推演' }}
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 transition-all cursor-pointer"
              @click="exportConvergenceCertificate"
            >
              📜 导出收束认证方案书
            </button>
          </div>
        </div>

        <!-- 5 阶段步进进度 -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <div
            v-for="(stg, idx) in convergenceStages"
            :key="stg.id"
            class="p-2.5 rounded-lg border text-xs transition-all flex flex-col justify-between"
            :class="convergenceSimulationStep >= idx + 1
              ? 'bg-indigo-950/40 border-indigo-500/60 text-indigo-300'
              : 'bg-slate-900/60 border-slate-800/80 text-gray-500'"
          >
            <div class="font-bold mb-1 flex items-center gap-1">
              <span>{{ convergenceSimulationStep >= idx + 1 ? '✅' : '⏳' }}</span>
              <span>第 {{ idx + 1 }} 阶: {{ stg.title }}</span>
            </div>
            <div class="text-[10px] leading-tight opacity-80">{{ stg.desc }}</div>
          </div>
        </div>

        <!-- 推演日志视窗 -->
        <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-gray-300 max-h-48 overflow-y-auto space-y-1">
          <div v-for="(log, idx) in convergenceLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-indigo-400 select-none">›</span>
            <span :class="log.color || 'text-gray-300'">{{ log.text }}</span>
          </div>
          <div v-if="convergenceLogs.length === 0" class="text-gray-600 italic">
            等待启动推演... 点击上方【启动全流程世界线收束推演】按键开始推演。
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 3 Tab 源码展台 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-slate-800 shadow-xl space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400 font-bold text-sm">💻 Godot 4.6 LTS 平行世界线因果动力学源码展台</span>
            <n-tag type="info" size="tiny" round>RefCounted 核心系统</n-tag>
          </div>
          <div class="flex gap-2">
            <button
              v-for="st in convergenceScriptTabs"
              :key="st.key"
              type="button"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border"
              :class="activeConvergenceScriptTab === st.key
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900 text-gray-400 border-slate-800 hover:text-white'"
              @click="activeConvergenceScriptTab = st.key"
            >
              {{ st.name }}
            </button>
          </div>
        </div>

        <div class="relative">
          <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed max-h-96">{{ currentConvergenceScriptCode }}</pre>
          <button
            type="button"
            class="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] text-gray-300 border border-slate-700 cursor-pointer transition-colors"
            @click="copyConvergenceScript"
          >
            📋 复制代码
          </button>
        </div>
      </div>
    </div>

    <!-- 5. 七大终焉宿命归宿与真结局推演沙盘 -->
    <div v-if="activeMode === 'ending_matrix'" class="space-y-6">
      <!-- 快捷预设与全局操作栏 -->
      <div class="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div class="flex items-center gap-2">
          <span class="text-xl">👑</span>
          <div>
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              七大终焉宿命归宿与真结局推演矩阵
              <span class="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono font-semibold border border-amber-500/30">
                FINAL CAUSALITY MATRIX
              </span>
            </h3>
            <p class="text-xs text-gray-400 mt-0.5">
              联动同伴存活、12神兵封印、虚空稳定度、欧米茄神龙讨伐与圣典智慧，解算最终世界收敛态与隐藏真结局。
            </p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" round secondary type="warning" @click="applyEndingPreset('true_canon')">
            真·四灵破晓 (100%)
          </n-button>
          <n-button size="small" round secondary type="info" @click="applyEndingPreset('cosmic_transcend')">
            太古逆熵超越
          </n-button>
          <n-button size="small" round secondary type="error" @click="applyEndingPreset('void_sacrifice')">
            暗黑虚空封印
          </n-button>
          <n-button size="small" round secondary type="success" @click="applyEndingPreset('sage_heritage')">
            贤者隐世传承
          </n-button>
          <n-button size="small" round secondary @click="applyEndingPreset('wanderer_odyssey')">
            飞空艇游历四海
          </n-button>
          <n-button size="small" round tertiary @click="applyEndingPreset('reset')">
            重置默认参数
          </n-button>
        </div>
      </div>

      <!-- 核心推演工作区：左侧因果控制台 + 右侧终焉收敛态展示 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：多维因果调节控制台 (5列) -->
        <div class="lg:col-span-5 space-y-4">
          <div class="p-5 rounded-2xl bg-[#0f1422] border border-slate-800/80 space-y-5 shadow-xl">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <span class="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <span>🎛️</span> 时空因果核心参数调谐
              </span>
              <span class="text-xs font-mono text-gray-400">CAUSALITY REGULATOR</span>
            </div>

            <!-- 参数 1：同伴生还率 -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300 font-semibold flex items-center gap-1.5">
                  <span>🛡️</span> 核心光暗同伴全员生还率
                </span>
                <span class="font-mono font-bold text-amber-300">{{ heroSurvivalRate }}%</span>
              </div>
              <n-slider v-model:value="heroSurvivalRate" :step="5" :min="25" :max="100" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>25% (惨烈伤亡)</span>
                <span>50% (半数牺牲)</span>
                <span>75% (核心幸存)</span>
                <span>100% (全员生还)</span>
              </div>
            </div>

            <!-- 参数 2：12太古封印神兵解封数 -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300 font-semibold flex items-center gap-1.5">
                  <span>⚔️</span> 库扎封印城12神兵解封数
                </span>
                <span class="font-mono font-bold text-cyan-300">{{ unsealedWeaponsCount }} / 12 把</span>
              </div>
              <n-slider v-model:value="unsealedWeaponsCount" :step="1" :min="0" :max="12" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>0把 (纯肉身抗衡)</span>
                <span>4把 (基础觉醒)</span>
                <span>8把 (中枢贯通)</span>
                <span>12把 (太古圆满)</span>
              </div>
            </div>

            <!-- 参数 3：虚空奇点封印稳定度 -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300 font-semibold flex items-center gap-1.5">
                  <span>🌀</span> 最终决战虚空奇点稳定度
                </span>
                <span class="font-mono font-bold text-purple-300">{{ singularityStability }}%</span>
              </div>
              <n-slider v-model:value="singularityStability" :step="1" :min="10" :max="100" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>10% (坍缩瓦解)</span>
                <span>50% (临界失控)</span>
                <span>80% (稳定遏制)</span>
                <span>100% (完美抚平)</span>
              </div>
            </div>

            <!-- 参数 4：始源白皮书智慧解锁度 -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300 font-semibold flex items-center gap-1.5">
                  <span>📜</span> 始源学者白皮书矩阵解析度
                </span>
                <span class="font-mono font-bold text-emerald-300">{{ sacredKnowledgeRate }}%</span>
              </div>
              <n-slider v-model:value="sacredKnowledgeRate" :step="5" :min="0" :max="100" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>0% (无知盲目)</span>
                <span>50% (通晓晶理)</span>
                <span>100% (神圣全知)</span>
              </div>
            </div>

            <!-- 参数 5：欧米茄 & 神龙终极讨伐 -->
            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div class="text-xs font-semibold text-gray-200 flex items-center gap-1.5">
                  <span>🐉</span> 击破欧米茄 & 神龙终极双神
                </div>
                <div class="text-[10px] text-gray-400 mt-0.5">解除次元夹缝的超远古机械与龙神枷锁</div>
              </div>
              <n-switch v-model:value="omegaShinryuDefeated" />
            </div>

            <!-- 参数 6：英雄决战意愿抉择 -->
            <div class="space-y-2">
              <label class="text-xs text-gray-300 font-semibold flex items-center gap-1.5">
                <span>🕊️</span> 最终决战灵魂誓约倾向：
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  class="p-2.5 rounded-xl text-xs border text-left transition-all"
                  :class="selfSacrificeChoice === 'none'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'bg-slate-900/80 border-slate-800 text-gray-400 hover:bg-slate-800'"
                  @click="selfSacrificeChoice = 'none'"
                >
                  <div class="font-bold">☀️ 绝不牺牲</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">全员携手同归晨曦</div>
                </button>
                <button
                  type="button"
                  class="p-2.5 rounded-xl text-xs border text-left transition-all"
                  :class="selfSacrificeChoice === 'bartz_lenna'
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                    : 'bg-slate-900/80 border-slate-800 text-gray-400 hover:bg-slate-800'"
                  @click="selfSacrificeChoice = 'bartz_lenna'"
                >
                  <div class="font-bold">🌑 舍身镇封</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">化作次元封印晶桩</div>
                </button>
                <button
                  type="button"
                  class="p-2.5 rounded-xl text-xs border text-left transition-all"
                  :class="selfSacrificeChoice === 'faris_krile'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'bg-slate-900/80 border-slate-800 text-gray-400 hover:bg-slate-800'"
                  @click="selfSacrificeChoice = 'faris_krile'"
                >
                  <div class="font-bold">⛵ 远航自由</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">卸下王室重担游历</div>
                </button>
                <button
                  type="button"
                  class="p-2.5 rounded-xl text-xs border text-left transition-all"
                  :class="selfSacrificeChoice === 'galuf_spirit'
                    ? 'bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-300 font-bold shadow-[0_0_12px_rgba(217,70,239,0.2)]'
                    : 'bg-slate-900/80 border-slate-800 text-gray-400 hover:bg-slate-800'"
                  @click="selfSacrificeChoice = 'galuf_spirit'"
                >
                  <div class="font-bold">🌌 加拉夫英灵共鸣</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">超脱宇宙因果矩阵</div>
                </button>
              </div>
            </div>

            <!-- 操作按钮组 -->
            <div class="flex items-center gap-2 pt-2">
              <n-button type="info" size="medium" class="flex-1" round secondary @click="exportEndingCertificate">
                <template #icon><span>📜</span></template>
                导出宿命终章证书
              </n-button>
              <n-button type="default" size="medium" round secondary @click="copyCausalityChain">
                <template #icon><span>🔗</span></template>
                复制因果链
              </n-button>
            </div>
          </div>
        </div>

        <!-- 右侧：宿命收敛态与达成结局详情 (7列) -->
        <div class="lg:col-span-7 space-y-4">
          <!-- 核心收敛态评分仪表板 -->
          <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 border border-slate-800 shadow-xl space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="text-2xl">{{ activeEnding.icon }}</span>
                <div>
                  <div class="text-xs text-gray-400 font-mono">CURRENT DESTINY ALIGNMENT</div>
                  <h4 class="text-lg font-black text-white tracking-wide">{{ activeEnding.title }}</h4>
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">宿命推演积分</div>
                <div class="text-2xl font-black font-mono" :class="destinyRating >= 850 ? 'text-amber-400' : (destinyRating >= 600 ? 'text-cyan-400' : 'text-purple-400')">
                  {{ destinyRating }} <span class="text-xs text-gray-500">/ 1000</span>
                </div>
              </div>
            </div>

            <!-- 当前激活结局主卡片 -->
            <div class="p-5 rounded-xl border bg-gradient-to-br" :class="[activeEnding.cardBg, activeEnding.cardBorder]">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded border" :class="activeEnding.tagClass">
                  {{ activeEnding.id }} · {{ activeEnding.badge }}
                </span>
                <span class="text-xs text-gray-300">
                  达成因果契合率：<strong class="font-mono text-amber-300 text-sm">{{ calculateEndingMatch(activeEnding.id) }}%</strong>
                </span>
              </div>
              <div class="text-sm font-semibold text-cyan-200 mt-1">{{ activeEnding.subtitle }}</div>
              <p class="text-xs text-gray-300 mt-2 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
                {{ activeEnding.synopsis }}
              </p>

              <!-- 终焉解锁特典与史诗嘉奖 -->
              <div class="mt-4 space-y-2">
                <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>✨</span> 终局因果解锁特典与世界线烙印：
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    v-for="(feat, fIdx) in activeEnding.rewards"
                    :key="fIdx"
                    class="p-2 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] text-gray-300 flex items-start gap-1.5"
                  >
                    <span class="text-amber-400 shrink-0 font-bold">✔</span>
                    <span class="leading-snug">{{ feat }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 四维因果流速状态柱 -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                <div class="text-[10px] text-gray-400">同伴羁绊共鸣</div>
                <div class="text-base font-bold text-cyan-400 font-mono mt-0.5">{{ heroSurvivalRate }}%</div>
                <div class="text-[9px] text-gray-500">全员守护系数</div>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                <div class="text-[10px] text-gray-400">神兵解封完整度</div>
                <div class="text-base font-bold text-amber-400 font-mono mt-0.5">{{ Math.round(unsealedWeaponsCount / 12 * 100) }}%</div>
                <div class="text-[9px] text-gray-500">太古武装矩阵</div>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                <div class="text-[10px] text-gray-400">虚空奇点收敛</div>
                <div class="text-base font-bold text-purple-400 font-mono mt-0.5">{{ singularityStability }}%</div>
                <div class="text-[9px] text-gray-500">空间坍缩抗性</div>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                <div class="text-[10px] text-gray-400">创世真理洞察</div>
                <div class="text-base font-bold text-emerald-400 font-mono mt-0.5">{{ sacredKnowledgeRate }}%</div>
                <div class="text-[9px] text-gray-500">因果律超越度</div>
              </div>
            </div>
          </div>

          <!-- 七大终焉归宿图鉴概览矩阵 -->
          <div class="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>🗂️</span> 七大终焉宿命图鉴归档矩阵（点击卡片查看达成细则）
              </h4>
              <span class="text-[10px] text-gray-500 font-mono">7 DESTINY CODICES</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              <div
                v-for="ending in allEndingsList"
                :key="ending.id"
                class="p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
                :class="activeEnding.id === ending.id
                  ? 'bg-slate-800/90 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'"
                @click="selectedEndingDetailId = ending.id"
              >
                <div v-if="activeEnding.id === ending.id" class="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-bl-md"></div>
                <div class="flex items-center gap-2">
                  <span class="text-xl">{{ ending.icon }}</span>
                  <div class="min-w-0">
                    <div class="text-xs font-bold text-white truncate">{{ ending.title }}</div>
                    <div class="text-[10px] text-gray-400 font-mono truncate">{{ ending.id }}</div>
                  </div>
                </div>
                <div class="mt-2 text-[10px] text-gray-400 line-clamp-2 leading-tight">
                  {{ ending.subtitle }}
                </div>
                <div class="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                  <span class="text-gray-500">匹配契合度</span>
                  <span class="font-mono font-bold" :class="calculateEndingMatch(ending.id) >= 80 ? 'text-amber-400' : 'text-gray-400'">
                    {{ calculateEndingMatch(ending.id) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. 太古多元宇宙终局史诗回响与创世神纪推演工坊 (Multiverse Epilogue Studio) -->
    <div v-if="activeMode === 'multiverse_epilogue'" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#120a24] via-[#1c1038] to-[#0d0920] border border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.22)] space-y-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-purple-950 pb-5">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                MULTIVERSE CREATION &amp; EPILOGUE STUDIO
              </span>
              <span class="text-xs text-gray-400 font-mono">v2.2.269 官方实机矩阵</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
              <span>🌌</span> 太古多元宇宙终局史诗回响与创世神纪推演工坊
            </h2>
            <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
              超越终局虚无！推演四界水晶终极弥合、虚无暗黑完全净化、四光之战士超维封神与永恒创世神纪。支持世界调和度、神性指数连续调节与 SHA-256 创世认证书离线导出。
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <n-button size="small" secondary type="warning" @click="resetEpilogueStudio">
              🔄 重置创世战局
            </n-button>
            <n-button size="small" secondary type="error" @click="triggerCosmicConvergence">
              💥 引爆以太共鸣大收敛
            </n-button>
            <n-button size="small" type="primary" class="font-bold shadow" @click="exportEpilogueCertificate">
              📜 导出创世神纪方案书
            </n-button>
          </div>
        </div>

        <!-- 三栏主推演工作台 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 栏 1: 四大创世神纪终局回响选择 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>多元创世神纪形态</span>
                </span>
                <n-tag size="tiny" type="warning">{{ currentEpilogue.godhoodRank }}</n-tag>
              </div>

              <!-- 预设选择器 -->
              <div class="space-y-1.5">
                <label class="text-[11px] text-gray-400 block">选择创世回响分支 (Epilogue Branch):</label>
                <select
                  v-model="selectedEpilogueId"
                  class="w-full bg-slate-950 border border-slate-700 text-xs text-purple-300 font-bold rounded-lg p-2 focus:border-purple-400 focus:outline-none"
                  @change="onEpilogueChanged"
                >
                  <option v-for="ep in epiloguePresets" :key="ep.id" :value="ep.id">
                    {{ ep.name }} ({{ ep.godhoodRank }})
                  </option>
                </select>
              </div>

              <!-- 详述卡片 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-purple-500/30 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-white flex items-center gap-1.5 text-sm">
                    <span>{{ currentEpilogue.icon }}</span>
                    <span>{{ currentEpilogue.name }}</span>
                  </span>
                  <span class="text-[10px] text-purple-400 font-mono font-bold">{{ currentEpilogue.type }}</span>
                </div>
                <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentEpilogue.description }}</p>
                <div class="p-2 rounded bg-purple-950/40 border border-purple-900/50 text-[11px] space-y-1">
                  <div class="text-amber-300 font-bold flex items-center gap-1">
                    <span>⚡ 创世愿景:</span>
                    <span>{{ currentEpilogue.vision }}</span>
                  </div>
                  <div class="text-cyan-300 text-[10px]">✨ 以太共鸣: {{ currentEpilogue.resonanceEffect }}</div>
                </div>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
              <span>多元稳态架构:</span>
              <span class="font-mono font-bold text-purple-400">Godot 4.6 LTS RefCounted 纯只读解算</span>
            </div>
          </div>

          <!-- 栏 2: 创世动力学参数连续调节与四主角神性树 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>🎛️</span>
                <span>创世动力学参数矩阵</span>
              </span>
              <span class="font-mono text-xs text-amber-400 font-bold">
                收敛率 {{ cosmicConvergenceRate }}%
              </span>
            </div>

            <!-- 滑块调节 -->
            <div class="space-y-3 text-xs">
              <div>
                <div class="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>世界创世调和度 (World Harmony):</span>
                  <span class="font-mono font-bold text-cyan-300">{{ worldHarmonyIndex }}%</span>
                </div>
                <input
                  v-model.number="worldHarmonyIndex"
                  type="range"
                  min="50"
                  max="100"
                  class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <div class="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>虚无残留暗质净化率 (Void Purge):</span>
                  <span class="font-mono font-bold text-purple-300">{{ voidPurgeRate }}%</span>
                </div>
                <input
                  v-model.number="voidPurgeRate"
                  type="range"
                  min="70"
                  max="100"
                  class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <div class="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>四主角破限神性指数 (Transcendence):</span>
                  <span class="font-mono font-bold text-amber-400">{{ heroTranscendencePower.toLocaleString() }} Pt</span>
                </div>
                <input
                  v-model.number="heroTranscendencePower"
                  type="range"
                  min="10000"
                  max="99999"
                  step="500"
                  class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            <!-- 四主角封神位格卡片 -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <div class="font-bold text-white flex items-center gap-1">
                  <span>🗡️</span>
                  <span>巴兹 (Bartz)</span>
                </div>
                <div class="text-[10px] text-cyan-300 mt-0.5">风之神剑圣 · 光之裁决者</div>
              </div>
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <div class="font-bold text-white flex items-center gap-1">
                  <span>👑</span>
                  <span>蕾娜 (Lenna)</span>
                </div>
                <div class="text-[10px] text-purple-300 mt-0.5">水之生机女神 · 永恒繁育</div>
              </div>
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <div class="font-bold text-white flex items-center gap-1">
                  <span>🏴‍☠️</span>
                  <span>法利斯 (Faris)</span>
                </div>
                <div class="text-[10px] text-amber-300 mt-0.5">修罗火风战神 · 虚空巡礼</div>
              </div>
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <div class="font-bold text-white flex items-center gap-1">
                  <span>🔮</span>
                  <span>可露儿 (Krile)</span>
                </div>
                <div class="text-[10px] text-emerald-400 mt-0.5">土之圣皇使者 · 时空掌控</div>
              </div>
            </div>
          </div>

          <!-- 栏 3: 创世预期指标与宏观回响日志 -->
          <div class="p-5 rounded-xl bg-gradient-to-b from-purple-950/20 to-slate-900 border border-purple-500/30 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>👑</span>
                  <span>创世神纪推演指标</span>
                </span>
                <n-tag size="tiny" type="success">100% 稳态纪元</n-tag>
              </div>

              <!-- 称号卡片 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">达成多元创世神纪终极称号</div>
                <div class="text-base sm:text-lg font-black font-mono mt-1 text-amber-300">
                  {{ epilogueTitle }}
                </div>
                <div class="text-[10px] text-emerald-400 mt-0.5">
                  预期宇宙存续: 120,000 纪元 · 文明繁荣度 99.8%
                </div>
              </div>

              <!-- 实时创世日志流 -->
              <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[10px] space-y-1 max-h-24 overflow-y-auto font-mono text-gray-300">
                <div v-for="(log, idx) in epilogueLogs" :key="idx" class="flex items-start gap-1">
                  <span class="text-purple-400 shrink-0">•</span>
                  <span>{{ log }}</span>
                </div>
              </div>
            </div>

            <!-- 一键共鸣收敛 -->
            <div class="space-y-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                class="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 via-amber-600 to-purple-600 hover:from-purple-500 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg cursor-pointer"
                @click="triggerCosmicConvergence"
              >
                ⚡ 触发多元宇宙以太终极跃迁 (Cosmic Leap)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'
import { mainStoryBeatsList } from '../config/mainStoryBeatsConfig'
import type { MainStoryBeat } from '../config/mainStoryBeatsConfig'

const message = useMessage()
const gameStore = useGameStore()
const chapters = computed(() => gameStore.db.chapters || [])

const activeMode = ref('lore')
const navModes = [
  { key: 'lore', label: '三十章节史诗编年', icon: '📖' },
  { key: 'radar', label: '44节拍雷达导航', icon: '🧭', badge: 'NEW' },
  { key: 'branches', label: '时空因果沙盘', icon: '🔀' },
  { key: 'timeline_convergence', label: '平行世界线收束与因果坍缩工坊', icon: '🌀', badge: 'v2.2.294' },
  { key: 'ending_matrix', label: '七大终焉宿命归宿与真结局推演沙盘', icon: '👑', badge: 'HOT' },
  { key: 'multiverse_epilogue', label: '太古多元创世神纪推演工坊', icon: '🌌', badge: 'EX' },
  { key: 'engine_code', label: '主线状态机源码', icon: '🛠️' }
]

const switchToConvergenceStudio = () => {
  activeMode.value = 'timeline_convergence'
}

const switchToEpilogueStudio = () => {
  activeMode.value = 'multiverse_epilogue'
}

// 宿命结局推演沙盘状态
const heroSurvivalRate = ref(100)
const unsealedWeaponsCount = ref(12)
const singularityStability = ref(95)
const omegaShinryuDefeated = ref(true)
const sacredKnowledgeRate = ref(90)
const selfSacrificeChoice = ref<'none' | 'bartz_lenna' | 'faris_krile' | 'galuf_spirit'>('none')
const selectedEndingDetailId = ref<string>('END-TRUE-01')
const activeGdTab = ref<'timeline' | 'ending' | 'epilogue'>('epilogue')

interface EndingData {
  id: string
  title: string
  subtitle: string
  badge: string
  icon: string
  cardBg: string
  cardBorder: string
  tagClass: string
  synopsis: string
  rewards: string[]
}

const allEndingsList: EndingData[] = [
  {
    id: 'END-TRUE-01',
    title: '真·四灵破晓神话 (True Canon: Dawn of Four Elements)',
    subtitle: '光与暗完全调和 · 晨辉大地永恒繁荣',
    badge: '正统真结局 · 100% 同调',
    icon: '🌅',
    cardBg: 'from-amber-950/40 via-slate-900 to-cyan-950/40',
    cardBorder: 'border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.25)]',
    tagClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    synopsis: '四柱原初晶石在战士们的决心中重塑，光暗两界不再对立而是如阴阳般和谐共生。失落的时空裂隙化为丰饶的星海之井，巴兹、蕾娜、法利斯、库露露与暗之战士们共同站在新生的世界树下，迎接新时代的破晓晨光。',
    rewards: [
      '全员解锁太古神王誓约：全能力值与极意技能威力 +25%',
      '获得全域飞行坐骑【超限界光暗星空巨舰】',
      '永久解锁二周目自由职业初始自带二刀流与连续魔',
      '载入水晶殿堂史诗丰碑，世界居民全好感度达到崇敬'
    ]
  },
  {
    id: 'END-TRANSCEND-07',
    title: '太古逆熵终极超越 (Cosmic Transmutation: Beyond Reality)',
    subtitle: '超越凡世因果 · 执掌宇宙观星王座',
    badge: '神话极意 · 弑神超脱',
    icon: '🌌',
    cardBg: 'from-fuchsia-950/50 via-purple-950/40 to-slate-900',
    cardBorder: 'border-fuchsia-400/60 shadow-[0_0_35px_rgba(217,70,239,0.25)]',
    tagClass: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
    synopsis: '光之战士们不仅征服了新艾克斯迪斯，更斩断了神龙与欧米茄的机械熵增因果锁链。借由太古始源之光，他们超脱了物质躯壳与时间维度的局限，登临星界王座，成为守望数亿平行多元宇宙的水晶主宰。',
    rewards: [
      '获得超神阶极意被动【逆熵因果之环】：免疫全即死与时空退化',
      '解锁全能创世模式：自由调整所有敌方Boss数值与AI节拍',
      '获得宇宙至宝【太古超光速奇点法典】',
      '开启隐藏真·超绝境副本【多元宇宙观测者试炼】'
    ]
  },
  {
    id: 'END-SACRIFICE-02',
    title: '暗黑虚空永劫封印 (Void Sacrifice: Eternal Vigil)',
    subtitle: '英雄舍身化碑 · 孤寂镇守次元裂隙',
    badge: '悲壮史诗归宿 · 牺牲之桩',
    icon: '🛡️',
    cardBg: 'from-indigo-950/50 via-purple-950/40 to-slate-900',
    cardBorder: 'border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.2)]',
    tagClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    synopsis: '在奇点不可逆崩溃的千钧一发之际，核心英雄决然将自己的灵魂与晶石合而为一，构筑起阻隔虚无的永恒晶壁。晨辉大陆虽免遭毁灭，但世界只留下了英雄生前的佩剑与一曲悲凉的挽歌。',
    rewards: [
      '全队继承牺牲之魂意志：濒死状态全防御力 +80%',
      '获得圣遗物【不灭誓约之结晶羽毛】',
      '在始源神殿建立英雄圣棺，触发特殊祭奠剧情',
      '解锁特殊乐章《次元狭间的孤星挽歌》'
    ]
  },
  {
    id: 'END-ODYSSEY-03',
    title: '飞空艇游历四海 (Wanderer\'s Odyssey: Sky Pirates)',
    subtitle: '卸下神权冠冕 · 追寻自由地平线',
    badge: '浪迹天涯 · 自由羁绊',
    icon: '⛵',
    cardBg: 'from-sky-950/50 via-blue-950/40 to-slate-900',
    cardBorder: 'border-sky-400/50 shadow-[0_0_25px_rgba(56,189,248,0.2)]',
    tagClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    synopsis: '世界重归和平后，巴兹与伙伴们谢绝了泰空与图尔王国的加冕封赏。他们重新修缮了席德打造的双核飞空艇，向着未知的汪洋与外层空岛启航，成为大洋彼岸最受传颂的自由冒险家。',
    rewards: [
      '全员敏捷与闪避率永久提升 +15%',
      '飞空艇巡航速度翻倍，且无视全地形雷暴与气流阻碍',
      '开放隐藏大洋宝藏坐标与海盗公会专属黑市商店',
      '获得传世饰品【天际领航之罗盘】'
    ]
  },
  {
    id: 'END-HERITAGE-04',
    title: '贤者隐世传承 (Sage\'s Heritage: Library of Karnak)',
    subtitle: '卡纳克万卷法典 · 太古秘法百世师',
    badge: '学者丰碑 · 智者归宿',
    icon: '📜',
    cardBg: 'from-emerald-950/50 via-teal-950/40 to-slate-900',
    cardBorder: 'border-emerald-400/50 shadow-[0_0_25px_rgba(52,211,153,0.2)]',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    synopsis: '英雄们将虚空之战的所有魔法矩阵、晶石能量共振方程式与魔物生态学谱系编纂成册，建立卡纳克皇家大学士学院。太古魔法不再是灭世的禁咒，而是化作造福万民的水利与医疗工程学典范。',
    rewards: [
      '黑白时空召全魔法MP消耗永久降低 30%',
      '解锁白皮书全九阶禁术研究成果图录',
      '获得传奇学者法杖【千智万象之源】',
      '所有魔法系职业经验与ABP获取速率 +50%'
    ]
  },
  {
    id: 'END-COLLAPSE-05',
    title: '孤星陨落决绝破局 (Fallen Star: Mutual Annihilation)',
    subtitle: '十二神兵逆序引爆 · 与虚空真祖同归于尽',
    badge: '绝境破局 · 灰烬重生',
    icon: '💥',
    cardBg: 'from-red-950/50 via-slate-950 to-slate-900',
    cardBorder: 'border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.2)]',
    tagClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    synopsis: '面对无法遏制的熵寂黑洞与狂暴的虚空奇点，英雄们决绝地引爆了十二太古神兵的全部晶核，将黑洞反向中和为一片静止的星云。大地虽化为焦土，但生命的火种已悄然深埋，等待千万年后的再次复苏。',
    rewards: [
      '二周目获得初始【逆熵灰烬护符】，濒死自爆不减命',
      '解锁特殊挑战副本【焦土废土遗迹生存模式】',
      '获得绝境称号【破灭世界的焚星者】',
      '解锁终焉乐章《星辰熄灭之刻》'
    ]
  },
  {
    id: 'END-TWILIGHT-06',
    title: '双界分裂寂静长夜 (Bifurcated Worlds: Silent Twilight)',
    subtitle: '光暗次元断联 · 永恒隔世遥相守望',
    badge: '平衡分离 · 静谧黄昏',
    icon: '🌓',
    cardBg: 'from-slate-950 via-slate-900 to-indigo-950/40',
    cardBorder: 'border-slate-600/50 shadow-[0_0_25px_rgba(100,116,139,0.2)]',
    tagClass: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
    synopsis: '为了阻止双界的连锁崩解，时空裂隙被两界长老施加了永久物理隔离。光之界享有永远的晨昏循环，暗之界归于宁静的星空月夜。彼此无法再互通，但人们都知晓，星空的另一侧有曾经并肩作战的战友在凝视着同一个太阳。',
    rewards: [
      '光暗阵营职业双向转换无消耗惩罚',
      '解锁黄昏信标传送系统与专属时空信件系统',
      '获得护符【双生星辉挂坠】',
      '全属性抗性与异常状态抗性永久 +15%'
    ]
  }
]

const applyEndingPreset = (presetKey: string) => {
  if (presetKey === 'true_canon') {
    heroSurvivalRate.value = 100
    unsealedWeaponsCount.value = 12
    singularityStability.value = 98
    omegaShinryuDefeated.value = true
    sacredKnowledgeRate.value = 95
    selfSacrificeChoice.value = 'none'
    message.success('已装载预设：真·四灵破晓神话 (100% 达成)')
  } else if (presetKey === 'void_sacrifice') {
    heroSurvivalRate.value = 50
    unsealedWeaponsCount.value = 8
    singularityStability.value = 65
    omegaShinryuDefeated.value = false
    sacredKnowledgeRate.value = 60
    selfSacrificeChoice.value = 'bartz_lenna'
    message.warning('已装载预设：暗黑虚空永劫封印')
  } else if (presetKey === 'wanderer_odyssey') {
    heroSurvivalRate.value = 100
    unsealedWeaponsCount.value = 6
    singularityStability.value = 82
    omegaShinryuDefeated.value = false
    sacredKnowledgeRate.value = 40
    selfSacrificeChoice.value = 'none'
    message.info('已装载预设：飞空艇游历四海 (自由流浪探险)')
  } else if (presetKey === 'sage_heritage') {
    heroSurvivalRate.value = 100
    unsealedWeaponsCount.value = 9
    singularityStability.value = 85
    omegaShinryuDefeated.value = false
    sacredKnowledgeRate.value = 100
    selfSacrificeChoice.value = 'none'
    message.info('已装载预设：贤者隐世传承 (卡纳克传世法典)')
  } else if (presetKey === 'cosmic_transcend') {
    heroSurvivalRate.value = 100
    unsealedWeaponsCount.value = 12
    singularityStability.value = 100
    omegaShinryuDefeated.value = true
    sacredKnowledgeRate.value = 100
    selfSacrificeChoice.value = 'galuf_spirit'
    message.success('已装载预设：太古逆熵终极超越 (破界弑神)')
  } else {
    heroSurvivalRate.value = 100
    unsealedWeaponsCount.value = 12
    singularityStability.value = 95
    omegaShinryuDefeated.value = true
    sacredKnowledgeRate.value = 90
    selfSacrificeChoice.value = 'none'
    message.success('已重置宿命推演默认参数')
  }
}

const destinyRating = computed(() => {
  let score = 0
  score += heroSurvivalRate.value * 3.5
  score += (unsealedWeaponsCount.value / 12) * 200
  score += singularityStability.value * 2.5
  if (omegaShinryuDefeated.value) score += 100
  score += sacredKnowledgeRate.value * 1.0
  return Math.min(1000, Math.round(score))
})

const calculateEndingMatch = (endingId: string) => {
  const weapons = unsealedWeaponsCount.value
  const survival = heroSurvivalRate.value
  const stab = singularityStability.value
  const boss = omegaShinryuDefeated.value
  const sac = selfSacrificeChoice.value

  if (endingId === 'END-TRANSCEND-07') {
    let score = (weapons / 12) * 30 + (survival / 100) * 20 + (stab / 100) * 20 + (boss ? 20 : 0) + (sac === 'galuf_spirit' ? 10 : 0)
    return Math.min(100, Math.round(score))
  }
  if (endingId === 'END-TRUE-01') {
    let score = (weapons / 12) * 35 + (survival / 100) * 25 + (stab / 100) * 20 + (boss ? 20 : 0)
    return Math.min(100, Math.round(score))
  }
  if (endingId === 'END-SACRIFICE-02') {
    let score = (sac === 'bartz_lenna' ? 50 : 10) + ((100 - survival) / 100) * 25 + ((100 - stab) / 100) * 25
    return Math.min(100, Math.round(score))
  }
  if (endingId === 'END-ODYSSEY-03') {
    let score = (survival / 100) * 40 + (sac === 'faris_krile' ? 40 : 10) + (weapons <= 8 ? 20 : 10)
    return Math.min(100, Math.round(score))
  }
  if (endingId === 'END-HERITAGE-04') {
    let score = (sacredKnowledgeRate.value / 100) * 50 + (weapons / 12) * 30 + (survival / 100) * 20
    return Math.min(100, Math.round(score))
  }
  if (endingId === 'END-COLLAPSE-05') {
    let score = ((100 - stab) / 100) * 60 + ((100 - survival) / 100) * 40
    return Math.min(100, Math.round(score))
  }
  if (endingId === 'END-TWILIGHT-06') {
    return 75
  }
  return 50
}

const activeEnding = computed(() => {
  const weapons = unsealedWeaponsCount.value
  const survival = heroSurvivalRate.value
  const stab = singularityStability.value
  const boss = omegaShinryuDefeated.value
  const sac = selfSacrificeChoice.value

  if (weapons === 12 && survival === 100 && stab >= 95 && boss && sac === 'galuf_spirit') {
    return allEndingsList.find(e => e.id === 'END-TRANSCEND-07')!
  }
  if (weapons === 12 && survival === 100 && stab >= 90 && boss && sac === 'none') {
    return allEndingsList.find(e => e.id === 'END-TRUE-01')!
  }
  if (sac === 'bartz_lenna' || (stab < 70 && survival < 75)) {
    return allEndingsList.find(e => e.id === 'END-SACRIFICE-02')!
  }
  if (stab < 40 || survival < 40) {
    return allEndingsList.find(e => e.id === 'END-COLLAPSE-05')!
  }
  if (sacredKnowledgeRate.value >= 90 && weapons >= 8) {
    return allEndingsList.find(e => e.id === 'END-HERITAGE-04')!
  }
  if (weapons <= 6 && stab >= 75) {
    return allEndingsList.find(e => e.id === 'END-ODYSSEY-03')!
  }
  return allEndingsList.find(e => e.id === 'END-TWILIGHT-06')!
})

const exportEndingCertificate = () => {
  const ending = activeEnding.value
  const ts = new Date().toISOString()
  const certId = `CERT-DESTINY-${Date.now().toString(36).toUpperCase()}`
  const content = `================================================================================
《光之战士：时空裂隙》(VBLE) 史诗终焉宿命与真结局推演凭证
================================================================================
凭证编号: ${certId}
时间截记: ${ts}
推演版本: VBLE Story & Chronicle Matrix v2.2.253
引擎标准: Godot 4.6 LTS Story Timeline & Causality Architecture

【核心因果推演参数输入】
- 契约同伴生还率: ${heroSurvivalRate.value}%
- 太古12神兵解封数: ${unsealedWeaponsCount.value} / 12 把
- 虚空奇点封印稳定度: ${singularityStability.value}%
- 欧米茄 & 神龙双神讨伐: ${omegaShinryuDefeated.value ? '已破除' : '未破除'}
- 始源白皮书智慧解锁度: ${sacredKnowledgeRate.value}%
- 终战牺牲意志倾向: ${selfSacrificeChoice.value}
- 宿命总因果评分: ${destinyRating.value} / 1000 pts

【终局收敛判定结果】
- 归属结局: ${ending.title} (${ending.id})
- 结局标识: ${ending.badge}
- 世界线归宿概要:
  ${ending.synopsis}

【终局因果特典与烙印】
${ending.rewards.map((r, i) => `  ${i + 1}. ${r}`).join('\n')}

================================================================================
数字校验指纹: SHA256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}
================================================================================`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `story_destiny_certificate_${ending.id.toLowerCase()}_v2.2.253.txt`
  a.click()
  URL.revokeObjectURL(url)
  message.success(`已导出终局宿命凭证: ${ending.title}`)
}

const copyCausalityChain = () => {
  const chainText = `[因果推演链] 同伴生还:${heroSurvivalRate.value}% | 12神兵:${unsealedWeaponsCount.value}/12 | 虚空稳定:${singularityStability.value}% | 双神讨伐:${omegaShinryuDefeated.value} | 智慧:${sacredKnowledgeRate.value}% => 结局:${activeEnding.value.title}`
  navigator.clipboard.writeText(chainText).then(() => {
    message.success('因果推演链已复制到剪贴板！')
  }).catch(() => {
    message.info('因果推演链已复制')
  })
}

// 编年史篇章过滤
const selectedParty = ref('all')
const parties = [
  { id: 'all', name: '全章节编年史' },
  { id: 'light', name: '光之阵容探索' },
  { id: 'dark', name: '暗之囚徒破局' },
  { id: 'both', name: '双界交汇与终焉决战' }
]

const filteredChapters = computed(() => {
  if (selectedParty.value === 'all') return chapters.value
  return chapters.value.filter((c: any) => {
    if (selectedParty.value === 'light') return c.party?.includes('light')
    if (selectedParty.value === 'dark') return c.party?.includes('dark')
    if (selectedParty.value === 'both') return c.party?.includes('both') || c.party?.includes('opening')
    return true
  })
})

const getPartyLabel = (party: string) => {
  if (party?.includes('light')) return '光之队'
  if (party?.includes('dark')) return '暗之队'
  return '光暗交汇'
}

const getPartyTag = (party: string) => {
  if (party?.includes('light')) return 'success'
  if (party?.includes('dark')) return 'warning'
  return 'error'
}

// 44 节拍雷达导航
const activeStageFilter = ref('all')
const beatSearchKeyword = ref('')

const beatStageFilters = [
  { key: 'all', label: '全部 44 节拍' },
  { key: 'early', label: '前期 (ch00-03)' },
  { key: 'middle', label: '中段 (ch04-07)' },
  { key: 'late', label: '晚期 (ch08-12)' },
  { key: 'marker', label: '仅居民实体Marker' }
]

const residentMarkerCount = computed(() => {
  return mainStoryBeatsList.filter(b => b.hasResidentMarker).length
})

const matchBeatStage = (beat: MainStoryBeat, key: string) => {
  if (key === 'all') return true
  if (key === 'early') return beat.stage === 'early'
  if (key === 'middle') return beat.stage === 'middle'
  if (key === 'late') return beat.stage === 'late'
  if (key === 'marker') return beat.hasResidentMarker
  return false
}

const getStageCount = (key: string) => {
  return mainStoryBeatsList.filter(b => matchBeatStage(b, key)).length
}

const filteredBeats = computed(() => {
  return mainStoryBeatsList.filter(beat => {
    if (!matchBeatStage(beat, activeStageFilter.value)) return false
    if (beatSearchKeyword.value.trim()) {
      const kw = beatSearchKeyword.value.trim().toLowerCase()
      const inId = beat.id.toLowerCase().includes(kw)
      const inTitle = beat.title.toLowerCase().includes(kw)
      const inAct = beat.act.toLowerCase().includes(kw)
      const inAction = beat.action.toLowerCase().includes(kw)
      const inMap = beat.mapName.toLowerCase().includes(kw) || beat.mapId.toLowerCase().includes(kw)
      const inResident = (beat.residentName || '').toLowerCase().includes(kw) || (beat.residentNpcId || '').toLowerCase().includes(kw)
      const inDetails = beat.details.toLowerCase().includes(kw)
      if (!inId && !inTitle && !inAct && !inAction && !inMap && !inResident && !inDetails) return false
    }
    return true
  })
})

const resetBeatSearch = () => {
  activeStageFilter.value = 'all'
  beatSearchKeyword.value = ''
}

// 时空因果分支沙盘
const choices = reactive({
  rescue: 'temple',
  pact: 'empathy',
  forge: 'sword',
  voidConvergence: 'balance'
})

const resetChoices = () => {
  choices.rescue = 'temple'
  choices.pact = 'empathy'
  choices.forge = 'sword'
  choices.voidConvergence = 'balance'
  message.success('已重置所有因果抉择至正统同调路线')
}

const statLightResonance = computed(() => {
  let score = 50
  if (choices.rescue === 'temple') score += 25
  if (choices.forge === 'sword') score += 15
  if (choices.voidConvergence === 'balance') score += 10
  return score
})

const statDarkDepth = computed(() => {
  let score = 40
  if (choices.pact === 'dominate') score += 35
  if (choices.pact === 'empathy') score += 15
  if (choices.forge === 'staff') score += 20
  return score
})

const statBondTrust = computed(() => {
  let score = 45
  if (choices.pact === 'empathy') score += 30
  if (choices.voidConvergence === 'balance') score += 20
  if (choices.rescue === 'scholar') score += 5
  return score
})

const statChapter31Unlock = computed(() => {
  let val = 0
  if (choices.rescue === 'scholar') val += 25
  if (choices.pact === 'empathy') val += 25
  if (choices.forge === 'staff') val += 25
  if (choices.voidConvergence === 'balance') val += 25
  return val
})

const endingPrediction = computed(() => {
  if (choices.voidConvergence === 'balance' && choices.pact === 'empathy') {
    return {
      code: 'TRUE ENDING · END-01',
      title: '双月同天：始源永恒乐章 (True Harmony)',
      probability: 98,
      icon: '🌟',
      tagClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      cardBorder: 'border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)]',
      synopsis: '光与暗的界限彻底消融，八位战士以灵魂之桥弥合时空裂隙。始源晶石复原为完整的太古环星体，非之世界转化为欣欣向荣的新生大陆。',
      rewards: [
        '全员习得终极合体极意【创世之光·湮灭暗夜】',
        '获得隐藏坐骑【全地形星海光辉飞空艇】',
        '通关后解锁隐藏第 31 章：虚空深渊 100 层绝境挑战'
      ]
    }
  } else if (choices.voidConvergence === 'polar') {
    return {
      code: 'POLAR ENDING · END-02',
      title: '破晓涤罪：单向白昼纪元 (Dawn Purification)',
      probability: 85,
      icon: '☀️',
      tagClass: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
      cardBorder: 'border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.2)]',
      synopsis: '强烈的圣光极性将虚无与混沌彻底驱逐至深空，大陆迎来了永不落幕的白昼，但非之世界的居民永远留在了幽邃的阴影界。',
      rewards: [
        '光之队四位英雄全属性额外提升 15%',
        '获得封印之城专属光属性圣剑【诸神之黄昏】',
        '通关解锁日冕神殿专属二周目试炼'
      ]
    }
  } else {
    return {
      code: 'SHADOW ENDING · END-03',
      title: '永夜囚徒：混沌深渊同盟 (Void Hegemony)',
      probability: 72,
      icon: '🌑',
      tagClass: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
      cardBorder: 'border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.2)]',
      synopsis: '纳哈特以深邃的虚无之力统领一切，虽然遏制了裂隙崩溃，但晨辉大陆沉入了无尽的月华与静谧之中。',
      rewards: [
        '暗之队全员领悟九阶暗影禁术【虚无湮灭】',
        '获得混沌龙鳞重甲与死神之眼终极神装',
        '解锁深渊竞技场暗影领主特权'
      ]
    }
  }
})

// Godot 4.x 代码
const gdScriptCode = `# ==============================================================================
# StoryTimelineManager - 主线三十章节状态机推进与时空因果分支控制器
# 文件路径: res://scripts/core/story_timeline_manager.gd
# 架构定位: 管理剧情节拍 (Quest Beats)、现场实体弱引用注册与结局因果判定
# ==============================================================================
class_name StoryTimelineManager
extends Node

signal chapter_advanced(act_index: int, chapter_title: String)
signal beat_reached(beat_id: String, map_id: String)
signal causality_updated(key: String, new_val: Variant)

# 当前主线进度
var current_act_index: int = 0
var current_beat_id: String = "ch00_king_order"

# 因果分支矩阵 (Causality Matrix)
var causality_state: Dictionary = {
	"rescue_choice": "temple",       # "temple" | "scholar"
	"pact_type": "empathy",          # "dominate" | "empathy"
	"sealed_weapon_focus": "sword",  # "sword" | "staff"
	"void_convergence": "balance",   # "balance" | "polar"
	"chapter_31_unlocked": false
}

# 现场真实居民弱引用注册表 (WeakRef 隔离，杜绝强引用泄漏)
var _registered_residents: Dictionary = {}

func _ready() -> void:
	print("[StoryTimeline] 主线剧情因果状态机初始化完成，当前节拍: %s" % current_beat_id)

## 登记现场居民实体 (弱引用)
func register_resident_source(npc_id: String, resident_node: Node) -> void:
	if not is_instance_valid(resident_node):
		return
	_registered_residents[npc_id] = weakref(resident_node)

## 获取居民实体 (自动校验墓碑死亡状态)
func get_resident_source(npc_id: String) -> Node:
	if not _registered_residents.has(npc_id):
		return null
	var wr: WeakRef = _registered_residents[npc_id]
	var node = wr.get_ref()
	if node and is_instance_valid(node):
		return node
	_registered_residents.erase(npc_id) # 自动清理死引用
	return null

## 推进主线节拍
func advance_beat(next_beat_id: String, target_map: String = "") -> void:
	current_beat_id = next_beat_id
	emit_signal("beat_reached", next_beat_id, target_map)
	_evaluate_causality()

## 设置因果抉择
func set_causality_choice(branch_key: String, choice_value: Variant) -> void:
	causality_state[branch_key] = choice_value
	emit_signal("causality_updated", branch_key, choice_value)
	_evaluate_causality()

## 动态评估因果结局与第 31 章解锁条件
func _evaluate_causality() -> void:
	var can_unlock_ch31 := (
		causality_state.get("rescue_choice") == "scholar" and
		causality_state.get("pact_type") == "empathy" and
		causality_state.get("void_convergence") == "balance"
	)
	causality_state["chapter_31_unlocked"] = can_unlock_ch31

## 计算最终结局类型
func evaluate_ending() -> String:
	var conv: String = causality_state.get("void_convergence", "balance")
	var pact: String = causality_state.get("pact_type", "empathy")
	if conv == "balance" and pact == "empathy":
		return "TRUE_END_HARMONY"
	elif conv == "polar":
		return "POLAR_END_PURIFICATION"
	else:
		return "SHADOW_END_HEGEMONY"
`

const gdScriptEndingCode = `# ==============================================================================
# EndingDestinyResolver - 七大终焉宿命归宿算法与因果加权解算器
# 文件路径: res://scripts/core/ending_destiny_resolver.gd
# 架构定位: 根据全域因果状态、同伴生存率与神兵解封数解算最终世界收敛态
# ==============================================================================
class_name EndingDestinyResolver
extends RefCounted

signal ending_resolved(ending_id: String, destiny_rating: int, epilogue_payload: Dictionary)

enum EndingType {
	TRUE_CANON,        # END-TRUE-01: 真·四灵破晓神话
	VOID_SACRIFICE,    # END-SACRIFICE-02: 暗黑虚空永劫封印
	WANDERER_ODYSSEY,  # END-ODYSSEY-03: 飞空艇游历四海
	SAGE_HERITAGE,     # END-HERITAGE-04: 贤者隐世传承
	FALLEN_STAR,       # END-COLLAPSE-05: 孤星陨落决绝破局
	SILENT_TWILIGHT,   # END-TWILIGHT-06: 双界分裂寂静长夜
	COSMIC_TRANSCEND   # END-TRANSCEND-07: 太古逆熵终极超越
}

## 评估宿命收敛态
static func resolve_destiny(params: Dictionary) -> Dictionary:
	var hero_survival: float = params.get("hero_survival_rate", 1.0)
	var unsealed_weapons: int = params.get("unsealed_weapons_count", 12)
	var singularity_stability: float = params.get("singularity_stability", 0.95)
	var omega_shinryu_defeated: bool = params.get("omega_shinryu_defeated", true)
	var sacred_knowledge: float = params.get("sacred_knowledge_rate", 0.90)
	var sacrifice_choice: String = params.get("sacrifice_choice", "none")

	var score: int = int(
		hero_survival * 350.0 +
		(float(unsealed_weapons) / 12.0) * 200.0 +
		singularity_stability * 250.0 +
		(100.0 if omega_shinryu_defeated else 0.0) +
		sacred_knowledge * 100.0
	)

	var ending_id: String = "END-TRUE-01"
	var ending_enum: int = EndingType.TRUE_CANON

	if unsealed_weapons == 12 and hero_survival >= 0.99 and singularity_stability >= 0.95 and omega_shinryu_defeated and sacrifice_choice == "galuf_spirit":
		ending_id = "END-TRANSCEND-07"
		ending_enum = EndingType.COSMIC_TRANSCEND
	elif unsealed_weapons == 12 and hero_survival >= 0.99 and singularity_stability >= 0.90 and omega_shinryu_defeated and sacrifice_choice == "none":
		ending_id = "END-TRUE-01"
		ending_enum = EndingType.TRUE_CANON
	elif sacrifice_choice == "bartz_lenna" or (singularity_stability < 0.70 and hero_survival < 0.75):
		ending_id = "END-SACRIFICE-02"
		ending_enum = EndingType.VOID_SACRIFICE
	elif singularity_stability < 0.40 or hero_survival < 0.40:
		ending_id = "END-COLLAPSE-05"
		ending_enum = EndingType.FALLEN_STAR
	elif sacred_knowledge >= 0.90 and unsealed_weapons >= 8:
		ending_id = "END-HERITAGE-04"
		ending_enum = EndingType.SAGE_HERITAGE
	elif unsealed_weapons <= 6 and singularity_stability >= 0.75:
		ending_id = "END-ODYSSEY-03"
		ending_enum = EndingType.WANDERER_ODYSSEY
	else:
		ending_id = "END-TWILIGHT-06"
		ending_enum = EndingType.SILENT_TWILIGHT

	return {
		"ending_id": ending_id,
		"ending_enum": ending_enum,
		"destiny_rating": score,
		"timestamp": Time.get_datetime_string_from_system()
	}
`

// ================= 专区 6: 太古多元宇宙终局史诗回响与创世神纪推演工坊 (v2.2.269) =================
interface EpiloguePreset {
  id: string
  name: string
  icon: string
  type: string
  godhoodRank: string
  description: string
  vision: string
  resonanceEffect: string
}

const epiloguePresets: EpiloguePreset[] = [
  {
    id: 'crystal_genesis',
    name: '【水晶始源创世】(Crystal Genesis)',
    icon: '💎',
    type: '永恒创生',
    godhoodRank: 'SSS+ 始源圣典',
    description: '四大始源水晶在虚空湮灭后重聚，原初泰空世界与分裂世界完美弥合，以太地脉永久繁茂。',
    vision: '万物生灵皆得晶石庇护，大地重归太古丰饶与纯净秩序',
    resonanceEffect: '以太浓度 +300%，全地表生态繁荣指数达到峰值 100%'
  },
  {
    id: 'void_purification',
    name: '【终焉虚无净化】(Void Purge)',
    icon: '🌌',
    type: '深渊升华',
    godhoodRank: 'EX 超维神域',
    description: '艾克斯德斯湮灭残留的所有反物质暗质被绝对圣光净化，次元狭缝化为璀璨繁星之海。',
    vision: '深渊不再吞噬生命，转化为联结各异界的和平虹桥星域',
    resonanceEffect: '暗黑引力彻底中和，时空漂移误差归零 (0.00ms)'
  },
  {
    id: 'hero_transcendence',
    name: '【四光之战士超维封神】(Four Warriors Transcendence)',
    icon: '👑',
    type: '以太飞升',
    godhoodRank: 'OMEGA 创世守护神',
    description: '巴兹、蕾娜、法利斯、可露儿领悟水晶终极意志，肉身升华进驻太古以太王座，成为永恒多元守护灵。',
    vision: '穿越无数平行宇宙，照耀所有因果裂隙中陷入绝望的光之信徒',
    resonanceEffect: '四神位格共鸣，单体破限神能突破 99,999 临界值'
  },
  {
    id: 'infinite_reincarnation',
    name: '【无尽时空因果循环】(Eternal Cyclic Rebirth)',
    icon: '🔄',
    type: '轮回神话',
    godhoodRank: 'TIMELESS 宿命之轮',
    description: '创世轮回之钟再度敲响，水晶之光化为种子散落于崭新的平行世界，静候新一代光之勇者觉醒。',
    vision: '因果不熄，希望永存，每一次破灭皆是更伟大史诗的新生',
    resonanceEffect: '多元宇宙熵增锁定，文明繁荣度恒定在 99.8%'
  }
]

const selectedEpilogueId = ref('crystal_genesis')
const worldHarmonyIndex = ref(98)
const voidPurgeRate = ref(99)
const heroTranscendencePower = ref(88400)

const currentEpilogue = computed(() => {
  return epiloguePresets.find(e => e.id === selectedEpilogueId.value) || epiloguePresets[0]
})

const cosmicConvergenceRate = computed(() => {
  const score = Math.round(
    (worldHarmonyIndex.value * 0.4) +
    (voidPurgeRate.value * 0.3) +
    ((heroTranscendencePower.value / 99999) * 30)
  )
  return Math.min(100, Math.max(80, score))
})

const epilogueTitle = computed(() => {
  if (selectedEpilogueId.value === 'crystal_genesis') return '【太古四象·万象归一创世圣纪】'
  if (selectedEpilogueId.value === 'void_purification') return '【星海澄澈·永恒无垢深渊圣纪】'
  if (selectedEpilogueId.value === 'hero_transcendence') return '【光之四神·超维以太执政官之纪】'
  return '【无极流转·千劫破晓轮回神纪】'
})

const epilogueLogs = ref<string[]>([
  '【T+0.0s】创世神纪推演沙盘载入：多元宇宙因果收敛模型就绪。',
  '【T+0.6s】四界始源以太涌动，原初泰空世界与第二重合世界地脉完成 100% 弥合。',
  '【T+1.2s】当前达成【水晶始源创世】回响，多元收敛率已达 98.5%！'
])

const onEpilogueChanged = () => {
  const ep = currentEpilogue.value
  epilogueLogs.value.unshift(`[形态切换] 创世推演锚定为【${ep.name}】(${ep.godhoodRank})，愿景: ${ep.vision}`)
  message.info(`已切换至【${ep.name}】！`)
}

const triggerCosmicConvergence = () => {
  worldHarmonyIndex.value = 100
  voidPurgeRate.value = 100
  heroTranscendencePower.value = 99999
  epilogueLogs.value.unshift('【💥 创世大捷】四神神性突破 99,999 临界值！虚无暗黑 100% 净化，多元宇宙进入极乐创生纪元！')
  message.success('🎉 终极大收敛触发！达成创世神纪最高位格！')
}

const resetEpilogueStudio = () => {
  selectedEpilogueId.value = 'crystal_genesis'
  worldHarmonyIndex.value = 98
  voidPurgeRate.value = 99
  heroTranscendencePower.value = 88400
  epilogueLogs.value = [
    '创世神纪推演沙盘已重置为初始平衡态。',
    '四界水晶处于归一谐振预备态。'
  ]
  message.info('创世神纪推演沙盘已重置！')
}

const exportEpilogueCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  const ep = currentEpilogue.value

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   太古多元宇宙终局史诗回响与创世神纪方案书 (v2.2.269)
================================================================================
颁发时间: ${timeStr}
创世形态: ${ep.name} (${ep.godhoodRank})
创世类型: ${ep.type}
终极称号: ${epilogueTitle.value}
创世愿景: ${ep.vision}
以太共鸣: ${ep.resonanceEffect}

【创世动力学量化指标】
- 多元宇宙以太收敛率: ${cosmicConvergenceRate.value}%
- 世界创世调和度: ${worldHarmonyIndex.value}%
- 虚无残留暗质净化率: ${voidPurgeRate.value}%
- 四主角破限神性指数: ${heroTranscendencePower.value.toLocaleString()} Pt / 99,999 极限
- 宇宙预期稳态存续: 120,000 纪元 · 文明繁荣度 99.8%

【四主角封神超维位格】
1. 巴兹 (Bartz): 风之神剑圣 · 光之裁决者
2. 蕾娜 (Lenna): 水之生机女神 · 永恒繁育
3. 法利斯 (Faris): 修罗火风战神 · 虚空巡礼
4. 可露儿 (Krile): 土之圣皇使者 · 时空掌控

【最新创世推演日志记录】
${epilogueLogs.value.slice(0, 5).map(l => `• ${l}`).join('\n')}

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS RefCounted Cosmological Engine
- Core Simulator: multiverse_epilogue_simulator.gd
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
    a.download = `multiverse_epilogue_cert_v2.2.269_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('创世神纪方案书已导出并同步至剪贴板！')
  }
}

const gdScriptEpilogueCode = `## multiverse_epilogue_simulator.gd
## Godot 4.6 LTS - 太古多元宇宙终局回响与创世神纪动力学模拟求解器
extends RefCounted
class_name MultiverseEpilogueSimulator

signal cosmic_convergence_achieved(epilogue_id: String, convergence_rate: float)
signal hero_godhood_transcended(hero_name: String, godhood_title: String)

class CreationCosmosState:
	var world_harmony: float = 0.98
	var void_purge_rate: float = 0.99
	var godhood_power: float = 88400.0
	var is_unified: bool = true

static func simulate_cosmic_convergence(state: CreationCosmosState, epilogue_type: String) -> Dictionary:
	var convergence: float = (state.world_harmony * 40.0) + (state.void_purge_rate * 30.0) + (state.godhood_power / 99999.0 * 30.0)
	convergence = clampf(convergence, 0.0, 100.0)
	
	var is_omega_creation: bool = convergence >= 99.0
	var lifespan_epochs: int = int(convergence * 1200)
	
	return {
		"epilogue": epilogue_type,
		"convergence_rate": convergence,
		"is_omega_creation": is_omega_creation,
		"expected_lifespan_epochs": lifespan_epochs,
		"prosperity_index": 0.998 if is_omega_creation else 0.95,
		"timestamp": Time.get_datetime_string_from_system()
	}
`

const copyGdScript = () => {
  const codeToCopy = activeGdTab.value === 'timeline'
    ? gdScriptCode 
    : activeGdTab.value === 'ending' 
      ? gdScriptEndingCode 
      : gdScriptEpilogueCode
  const filename = activeGdTab.value === 'timeline' 
    ? 'story_timeline_manager.gd' 
    : activeGdTab.value === 'ending' 
      ? 'ending_destiny_resolver.gd' 
      : 'multiverse_epilogue_simulator.gd'
  navigator.clipboard.writeText(codeToCopy).then(() => {
    message.success(`${filename} 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}

// ==========================================
// 平行世界线收束与量子因果坍缩工坊 (v2.2.294)
// ==========================================
interface TimelineArchetype {
  id: string
  name: string
  icon: string
  tag: string
  desc: string
  destiny: string
  stabilityMult: number
}

const timelineArchetypes: TimelineArchetype[] = [
  {
    id: 'alpha_light',
    name: 'α 纯白光之创生线',
    icon: '✨',
    tag: '圣光创世',
    desc: '水晶完全愈合，光之泛滥被引流注入恒星核，全员光辉圣骑士转生',
    destiny: '永恒炽阳辉煌盛世',
    stabilityMult: 1.15
  },
  {
    id: 'beta_void',
    name: 'β 混沌暗影虚空线',
    icon: '🌑',
    tag: '深渊执掌',
    desc: '虚无暗黑吞噬主物质位面，勇者化身暗之支配者执掌星云生死',
    destiny: '暗夜静谧无序星界',
    stabilityMult: 1.05
  },
  {
    id: 'gamma_harmony',
    name: 'γ 始源双界融合平衡线',
    icon: '☯️',
    tag: '两仪归一',
    desc: '光暗双月完美重合，第一世界与第二世界合二为一缔造神圣联邦',
    destiny: '全要素调和始源神国',
    stabilityMult: 1.25
  },
  {
    id: 'delta_tachyon',
    name: 'δ 快子逆流神化崩塌线',
    icon: '⏳',
    tag: '超维升格',
    desc: '逆转时间之矢直奔大爆炸前夜，凡人肉身升维突破 11 维因果天花板',
    destiny: '因果律神明超越本体',
    stabilityMult: 1.20
  }
]

const selectedTimelineId = ref<string>('gamma_harmony')

// 4 维连续滑块参数
const causalityEntropy = ref<number>(1.85)
const attractorRadius = ref<number>(420)
const decisionCoherence = ref<number>(92)
const timelineRewindDepth = ref<number>(3)

// 3 大时空因果护盾
const chronologyProtectionField = ref<boolean>(true)
const observerAnchorMatrix = ref<boolean>(true)
const entanglementCircuitBreaker = ref<boolean>(true)

const currentTimeline = computed(() => {
  return timelineArchetypes.find(l => l.id === selectedTimelineId.value) || timelineArchetypes[2]
})

const calculatedTimelineStability = computed(() => {
  let stability = 75.0
  stability += (decisionCoherence.value / 100) * 15.0
  stability += (attractorRadius.value / 1000) * 6.0
  stability -= (causalityEntropy.value / 5.0) * 8.0
  stability += chronologyProtectionField.value ? 4.5 : 0
  stability += observerAnchorMatrix.value ? 5.5 : 0
  stability += entanglementCircuitBreaker.value ? 3.0 : 0
  return Math.min(99.9, Math.max(50.0, stability * currentTimeline.value.stabilityMult))
})

const calculatedParadoxBarrier = computed(() => {
  const baseBarrier = 280000
  const coherenceBonus = decisionCoherence.value * 2400
  const shieldBonus = (chronologyProtectionField.value ? 90000 : 0) + (entanglementCircuitBreaker.value ? 65000 : 0)
  return Math.round(baseBarrier + coherenceBonus + shieldBonus)
})

const calculatedAttractorPull = computed(() => {
  const baseG = 12.0
  const radiusEffect = (attractorRadius.value / 100) * 2.8
  const entropyDamping = (causalityEntropy.value / 5.0) * 3.5
  return Number(Math.max(5.0, baseG + radiusEffect - entropyDamping).toFixed(1))
})

const timelineCertificationTier = computed(() => {
  if (calculatedTimelineStability.value >= 98.0) return 'Ω-0 始源超维创世'
  if (calculatedTimelineStability.value >= 90.0) return 'Ω-1 完备大收束'
  if (calculatedTimelineStability.value >= 80.0) return 'Ω-2 稳定收敛线'
  return 'Ω-3 亚稳态漂移线'
})

const resetConvergenceStudio = () => {
  causalityEntropy.value = 1.85
  attractorRadius.value = 420
  decisionCoherence.value = 92
  timelineRewindDepth.value = 3
  chronologyProtectionField.value = true
  observerAnchorMatrix.value = true
  entanglementCircuitBreaker.value = true
  message?.info('平行世界线因果参数已恢复黄金基准')
}

const triggerWorldlineCollapse = () => {
  decisionCoherence.value = 100
  chronologyProtectionField.value = true
  observerAnchorMatrix.value = true
  message?.success('量子波态瞬间坍缩！主世界线已锁定在始源最稳态！')
}

// 五阶段收束推演
const isSimulatingConvergence = ref<boolean>(false)
const convergenceSimulationStep = ref<number>(0)
interface ConvergenceLogItem {
  text: string
  color?: string
}
const convergenceLogs = ref<ConvergenceLogItem[]>([])

const convergenceStages = [
  { id: 1, title: '量子引力微扰扫描', desc: '检索因果熵与世界线相干度' },
  { id: 2, title: '因果防环护盾就绪', desc: '阻止类时回路彻底消除悖论' },
  { id: 3, title: '波函数坍缩与剪枝', desc: '裁减无序发散量子旁支' },
  { id: 4, title: '吸引子大引力收敛', desc: '牵引平行世界线向奇点归拢' },
  { id: 5, title: '终极世界线全域锚定', desc: '生成防伪证书与时空稳态' }
]

const runConvergenceSimulation = async () => {
  if (isSimulatingConvergence.value) return
  isSimulatingConvergence.value = true
  convergenceSimulationStep.value = 0
  convergenceLogs.value = []

  const appendLog = (text: string, color?: string) => {
    convergenceLogs.value.push({ text, color })
  }

  appendLog('[INIT] 启动全域平行世界线收束与因果坍缩管线...', 'text-indigo-400 font-bold')
  await new Promise(r => setTimeout(r, 400))

  // Step 1
  convergenceSimulationStep.value = 1
  appendLog(`[STEP 1] 扫描世界线【${currentTimeline.value.name}】，因果干涉熵值 ${causalityEntropy.value.toFixed(2)} S/k，微扰频谱锁定。`, 'text-cyan-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 2
  convergenceSimulationStep.value = 2
  appendLog(`[STEP 2] 激活霍金时序防环护盾: ${chronologyProtectionField.value ? '已就绪' : '未开启'}；排斥势垒 ${calculatedParadoxBarrier.value.toLocaleString()} J。`, 'text-purple-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 3
  convergenceSimulationStep.value = 3
  appendLog(`[STEP 3] 量子抉择相干度 ${decisionCoherence.value}%，观测者锚定仪锁定波态，发散旁支剪枝完成！`, 'text-rose-400 font-bold')
  await new Promise(r => setTimeout(r, 500))

  // Step 4
  convergenceSimulationStep.value = 4
  appendLog(`[STEP 4] 吸引子半径 ${attractorRadius.value} Mpc，释放引力拉力 ${calculatedAttractorPull.value.toFixed(1)} G，世界线大收敛达成！`, 'text-emerald-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 5
  convergenceSimulationStep.value = 5
  appendLog(`[SUCCESS] 平行世界线收束完毕！认证位阶: 【${timelineCertificationTier.value}】，稳态指数 ${calculatedTimelineStability.value.toFixed(1)}%！`, 'text-indigo-300 font-bold')
  isSimulatingConvergence.value = false
  message?.success('平行世界线收束推演圆满成功！')
}

const exportConvergenceCertificate = () => {
  const certData = {
    studio: 'Parallel Timelines & Causality Convergence Studio v2.2.294',
    selectedTimeline: currentTimeline.value.name,
    causalityEntropy: causalityEntropy.value,
    attractorRadius: attractorRadius.value,
    decisionCoherence: decisionCoherence.value,
    timelineRewindDepth: timelineRewindDepth.value,
    calculatedTimelineStability: calculatedTimelineStability.value,
    calculatedParadoxBarrier: calculatedParadoxBarrier.value,
    calculatedAttractorPull: calculatedAttractorPull.value,
    timelineCertificationTier: timelineCertificationTier.value,
    timestamp: new Date().toISOString(),
    sha256Certificate: 'TIMELINE-CONVERGENCE-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(16).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `timeline_convergence_${certData.sha256Certificate}.json`
  a.click()
  URL.revokeObjectURL(url)
  message?.success(`已导出收束方案证书: ${certData.sha256Certificate}`)
}

// 源码展台
type ConvergenceScriptKey = 'causality_engine' | 'decision_pruner' | 'attractor_controller'

const activeConvergenceScriptTab = ref<ConvergenceScriptKey>('causality_engine')

const convergenceScriptTabs = [
  { key: 'causality_engine' as const, name: '因果动力学引擎' },
  { key: 'decision_pruner' as const, name: '量子抉择剪枝器' },
  { key: 'attractor_controller' as const, name: '吸引子收束控制器' }
]

const convergenceScriptCodes: Record<ConvergenceScriptKey, string> = {
  causality_engine: `class_name ParallelTimelineCausalityEngine
extends RefCounted

## 最终幻想：时空之轮 - 平行世界线因果动力学引擎
## 文件路径: res://scripts/story/parallel_timeline_causality_engine.gd
## 引擎版本: Godot Engine 4.6 LTS

signal worldline_converged(timeline_id: String, stability: float)
signal paradox_detected(entropy_level: float, barrier_held: bool)

var causality_entropy: float = 1.85
var attractor_radius: float = 420.0
var protection_field_active: bool = true

func evaluate_timeline_stability(decision_coherence: float) -> float:
    var stability: float = 75.0 + (decision_coherence * 0.15) + (attractor_radius / 1000.0 * 6.0)
    stability -= (causality_entropy / 5.0) * 8.0
    if protection_field_active:
        stability += 4.5
    return clampf(stability, 50.0, 99.9)

func check_closed_timelike_curve() -> bool:
    if protection_field_active:
        paradox_detected.emit(causality_entropy, true)
        return false # 阻断闭合类时曲线
    return causality_entropy > 4.2
`,

  decision_pruner: `class_name QuantumDecisionBranchPruner
extends RefCounted

## 最终幻想：时空之轮 - 量子抉择剪枝与坍缩器
## 文件路径: res://scripts/story/quantum_decision_branch_pruner.gd
## 引擎版本: Godot Engine 4.6 LTS

static func collapse_superposition(branches: Array[Dictionary], observer_anchored: bool) -> Dictionary:
    if branches.is_empty():
        return {}
    if observer_anchored:
        # 观测者锚定：优先收敛权重最高的主干分支
        branches.sort_custom(func(a, b): return a.get("coherence", 0.0) > b.get("coherence", 0.0))
        return branches[0]
    return branches[randi() % branches.size()]
`,

  attractor_controller: `class_name AttractorConvergenceController
extends RefCounted

## 最终幻想：时空之轮 - 吸引子收束引力场控制器
## 文件路径: res://scripts/story/attractor_convergence_controller.gd
## 引擎版本: Godot Engine 4.6 LTS

static func calculate_attractor_vector(current_divergence: float, radius: float) -> Vector3:
    var pull_strength: float = 12.0 + (radius / 100.0 * 2.8)
    return Vector3(0, 0, -pull_strength * (1.0 / maxf(0.1, current_divergence)))
`
}

const currentConvergenceScriptCode = computed(() => {
  return convergenceScriptCodes[activeConvergenceScriptTab.value]
})

const copyConvergenceScript = () => {
  navigator.clipboard.writeText(currentConvergenceScriptCode.value)
  message?.success('已复制 Godot 4.6 LTS 脚本源码到剪贴板！')
}

</script>

<style scoped>
.party-filter:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 3px;
}
</style>
