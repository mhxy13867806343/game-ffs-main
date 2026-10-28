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
              THIRTY CHAPTERS EPIC CHRONICLES & RADAR
            </span>
            <span class="text-xs text-gray-400">光暗双线叙事与时空因果推演</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>📖</span> 史诗编年史：光与暗双线三十章节与因果沙盘
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            纵览从始源神殿晶石破裂、光暗双线各自探索、到全 44 节拍主线全域雷达导航、真实居民弱引用标记系统与结局因果分支推演沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
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
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                GODOT 4.X STORY DISPATCHER
              </span>
              <h3 class="text-base font-bold text-white">story_timeline_manager.gd</h3>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              主线 30 章节状态机推进、44 节拍雷达实体弱引用标记注册与因果分支持久化控制器。
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
  { key: 'engine_code', label: '主线状态机源码', icon: '🛠️' }
]

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

const copyGdScript = () => {
  navigator.clipboard.writeText(gdScriptCode).then(() => {
    message.success('story_timeline_manager.gd 源码已复制到剪贴板！')
  }).catch(() => {
    message.info('源码已复制')
  })
}
</script>

<style scoped>
.party-filter:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 3px;
}
</style>
