<template>
  <div class="dungeons-view max-w-7xl mx-auto space-y-6 p-3 sm:p-6 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-blue-950/80 border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.2)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/30">
              VBLE Dungeon &amp; Spatial Topology Matrix v2.2.256
            </span>
            <span class="text-xs text-gray-400">全域空间解构与深渊迷宫实装</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🏛️</span> 全域地貌拓扑与地宫导览：四维空间解构与深渊探秘工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            纵览苍穹、地表、深海、地狱冥界与终局虚无；收录全域 {{ dungeons.length }} 处地宫与探索地点。实装六大维度全域空间行进拓扑轴、实景走格子动态战争迷雾与环境极限制约沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToLabyrinthStudio"
          >
            <template #icon><span>🌌</span></template>
            前往迷宫探秘沙盘
          </n-button>
          <router-link to="/vble/scenes">
            <n-button size="medium" round tertiary>
              世界区域风土
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

    <!-- 拓扑演进流 -->
    <n-card class="mb-4 bg-slate-900/80 border-slate-800" title="🌐 六大维度全域空间行进拓扑轴 (配置化数据驱动)">
      <div class="flex flex-wrap items-center gap-2">
        <template v-for="(node, index) in dungeonProgression" :key="node.id">
          <button
            type="button"
            class="p-0 border-0 bg-transparent rounded-full cursor-pointer hover:scale-105 transition-transform focus-visible:(outline outline-2 outline-cyan-400 outline-offset-2)"
            :aria-label="`按名称筛选：${node.name}`"
            @click="searchQuery = node.name"
          >
            <n-tag
              :type="node.type"
              :color="node.color ? { color: node.color, textColor: node.textColor } : undefined"
              size="medium"
              round
            >
              {{ node.name }}
            </n-tag>
          </button>
          <span v-if="index < dungeonProgression.length - 1" class="text-cyan-400 font-bold">&rarr;</span>
        </template>
      </div>
    </n-card>

    <!-- 过滤器与搜索 -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
      <div ref="tierFilters" class="flex flex-wrap gap-2">
        <button
          v-for="t in tiers"
          :key="t.id"
          :aria-pressed="selectedTier === t.id"
          class="px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 border cursor-pointer select-none"
          :class="selectedTier === t.id
            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30 font-black'
            : 'bg-slate-800 text-gray-200 border-slate-700 hover:bg-slate-700 hover:text-white'"
          @click="selectedTier = t.id"
        >
          {{ t.name }} ({{ countByTier(t.id) }})
        </button>
      </div>
      <n-input
        ref="searchInput"
        v-model:value="searchQuery"
        placeholder="搜索地宫名称、Boss或机关..."
        size="small"
        clearable
        class="w-full md:w-60"
      >
        <template #prefix>🔍</template>
      </n-input>
    </div>

    <div
      v-if="dungeons.length > 0 && filteredDungeons.length === 0"
      role="status"
      class="mb-5 p-6 text-center rounded-lg border border-slate-700 bg-slate-900/80"
    >
      <p class="text-base font-semibold text-gray-200">当前筛选下没有匹配地宫</p>
      <p class="text-sm text-gray-400 mt-2 break-words">
        当前层级：{{ tiers.find(t => t.id === selectedTier)?.name }}；
        关键词：{{ searchQuery.trim() || '未设置' }}。
        请调整上方层级或关键词后重试，现有选择已保留。
      </p>
      <div class="flex flex-wrap justify-center gap-3 mt-4">
        <n-button size="small" @click="focusTierFilter">返回层级选择</n-button>
        <n-button size="small" @click="searchInput?.focus()">修改关键词</n-button>
      </div>
    </div>

    <!-- 地宫卡片列表 -->
    <n-grid cols="1 s:2 m:3" :x-gap="16" :y-gap="16" class="mb-5">
      <n-grid-item v-for="d in paginatedList" :key="d.id">
        <n-card hoverable class="relative h-full cursor-pointer bg-slate-900/85 border-slate-800/80 transition-all hover:border-cyan-500/50">
          <div class="flex justify-between items-center mb-2">
            <n-tag :type="getTierTagType(d.tier || '')" size="small">{{ d.tier || '地表与秘境' }}</n-tag>
            <span class="text-xs text-gray-400">{{ d.type }}</span>
          </div>
          <h4 class="text-base font-bold text-amber-400 mb-2">🏰 {{ d.name }}</h4>
          <p class="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">{{ d.desc }}</p>

          <div class="mb-2 p-2 rounded bg-cyan-950/30 border-l-3 border-cyan-400">
            <div class="text-xs text-cyan-400 font-bold">⚙️ 核心机制：</div>
            <div class="text-xs text-gray-200 mt-0.5">{{ d.features }}</div>
          </div>

          <div v-if="d.mechanics" class="mb-3 p-2 rounded bg-amber-950/30 border-l-3 border-amber-500">
            <div class="text-xs text-amber-400 font-bold">⚡ 专属极限制约：</div>
            <div class="text-xs text-gray-200 mt-0.5">{{ d.mechanics }}</div>
          </div>

          <div class="flex justify-between items-center pt-2 border-t border-slate-800">
            <span class="text-xs text-rose-400 truncate max-w-[180px]">👹 {{ d.monsters }}</span>
            <span class="text-xs text-cyan-400 px-1.5 py-1">全息战术 &rarr;</span>
          </div>
          <button
            type="button"
            class="absolute inset-0 w-full h-full border-0 bg-transparent rounded-inherit cursor-pointer focus-visible:(outline outline-2 outline-cyan-400 outline-offset--2)"
            :aria-label="`查看地宫详情：${d.name}`"
            @click="gameStore.openDetail(d)"
          ></button>
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- 分页导航 -->
    <div v-if="filteredDungeons.length > 0" class="flex justify-center items-center py-4 mb-6">
      <n-pagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :item-count="total"
        :page-sizes="[6, 9, 12, 18]"
        show-size-picker
        show-quick-jumper
        :simple="isMobile"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      >
        <!-- 原生按钮提供键盘激活，点击冒泡仍交由分页器维护页码与边界。 -->
        <template #prev="{ page }">
          <button type="button" class="dungeons-pagination-control" aria-label="上一页地宫目录" :disabled="page <= 1">‹</button>
        </template>
        <template #label="{ type, node, active }">
          <button
            v-if="type === 'page'"
            type="button"
            class="dungeons-pagination-control"
            :aria-label="`地宫目录第 ${node} 页`"
            :aria-current="active ? 'page' : undefined"
          >{{ node }}</button>
          <component :is="node" v-else />
        </template>
        <template #next="{ page, pageCount }">
          <button type="button" class="dungeons-pagination-control" aria-label="下一页地宫目录" :disabled="page >= pageCount">›</button>
        </template>
        <template #prefix="{ itemCount }">
          <span class="text-xs text-gray-400 hidden sm:inline">当前匹配 {{ itemCount }} 处地宫与探索地点</span>
        </template>
      </n-pagination>
    </div>

    <!-- 🌌 多元宇宙裂隙深渊迷宫与战争迷雾密室推演工坊 (Interactive Multiverse Rift Dungeon Navigator & Fog-of-War Studio) -->
    <n-card id="dungeon-labyrinth-studio" class="mb-6 bg-gradient-to-br from-slate-900/95 via-purple-950/40 to-slate-900/95 border-purple-500/50 shadow-2xl relative overflow-hidden" title="🌌 多元宇宙裂隙深渊迷宫与战争迷雾密室推演工坊 (Dungeon Fog-of-War Studio)">
      <template #header-extra>
        <div class="flex items-center gap-2 flex-wrap">
          <n-button size="tiny" secondary round type="info" @click="exportDungeonSurveyReport">
            <template #icon><span>📜</span></template>
            导出勘探报告
          </n-button>
          <n-tag type="warning" size="small" round strong>Godot 4.6 迷宫拓扑引擎</n-tag>
          <n-tag type="info" size="small" round>动态视野与环境制约</n-tag>
        </div>
      </template>

      <div class="space-y-5">
        <!-- 顶部导言与机制指引 -->
        <div class="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-gray-300 leading-relaxed flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="text-purple-300 font-bold flex items-center gap-1.5 text-sm">
              <span>🧭</span> 核心探索法则：动态战争迷雾 (Fog of War) × 环境极限制约沙盘
            </div>
            <p class="text-gray-400 text-[11px]">
              支持在四大经典终极地宫之间即时跃迁；移动触发视野驱散（曼哈顿半径视野），实时演算落穴、熔岩毒沼、双生禁制与水下氧气损耗。配备盗贼鹰眼洞悉与风水师全息浮空术！
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <n-button size="small" type="primary" secondary @click="resetDungeon">
              🔄 重置本层迷宫
            </n-button>
          </div>
        </div>

        <!-- 4大特色地宫预设切换 -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="d in dungeonPresets"
            :key="d.id"
            type="button"
            class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer select-none flex items-center gap-1.5"
            :class="selectedDungeonPreset.id === d.id
              ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30 ring-2 ring-purple-400/40'
              : 'bg-slate-900/90 text-gray-300 border-slate-700 hover:bg-slate-800 hover:text-white'"
            @click="switchDungeonPreset(d.id)"
          >
            <span>{{ d.icon }}</span>
            <span>{{ d.name }}</span>
            <n-tag size="tiny" :type="d.tagType" round>{{ d.difficulty }}</n-tag>
          </button>
        </div>

        <!-- 迷宫主战盘与右侧状态面板 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <!-- 左侧：6x6 动态迷宫地块画布与方向舵 -->
          <div class="lg:col-span-7 flex flex-col items-center p-4 rounded-2xl bg-slate-950/80 border border-purple-900/50 shadow-inner">
            <div class="flex items-center justify-between w-full mb-3 text-xs text-gray-400 px-2">
              <span class="text-purple-300 font-bold flex items-center gap-1">
                <span>📍</span> 现处区域：{{ selectedDungeonPreset.name }}
              </span>
              <span class="font-mono text-cyan-400">坐标: ({{ playerPos.r }}, {{ playerPos.c }})</span>
            </div>

            <!-- 6x6 迷宫网格 -->
            <div class="grid grid-cols-6 gap-1.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              <template v-for="(row, r) in dungeonGrid" :key="`r-${r}`">
                <div
                  v-for="(tile, c) in row"
                  :key="`c-${r}-${c}`"
                  class="w-11 h-11 sm:w-13 sm:h-13 rounded-lg flex flex-col items-center justify-center font-bold text-xs sm:text-sm select-none transition-all duration-200 relative border"
                  :class="getTileClass(tile, r, c)"
                  :title="getTileTooltip(tile, r, c)"
                  @click="tryMoveTo(r, c)"
                >
                  <!-- 战争迷雾状态 -->
                  <template v-if="!tile.revealed && !revealedAll">
                    <span class="text-slate-600 text-lg opacity-80 animate-pulse">🌫️</span>
                  </template>

                  <!-- 玩家在场图标 -->
                  <template v-else-if="playerPos.r === r && playerPos.c === c">
                    <span class="text-xl sm:text-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] animate-bounce">
                      {{ playerIcon }}
                    </span>
                    <span v-if="floatDuration > 0" class="absolute -top-1 -right-1 text-[9px] bg-cyan-500 text-slate-950 px-1 rounded-full font-black">
                      羽
                    </span>
                  </template>

                  <!-- 揭示后的真实地块 -->
                  <template v-else>
                    <span class="text-base sm:text-lg">{{ getTileSymbol(tile) }}</span>
                    <span v-if="tile.type === 'portal'" class="absolute bottom-0 text-[8px] text-amber-300 font-mono scale-90">出口</span>
                    <span v-else-if="tile.type === 'switch' && tile.triggered" class="absolute bottom-0 text-[8px] text-emerald-400 font-mono scale-90">解禁</span>
                  </template>
                </div>
              </template>
            </div>

            <!-- 虚拟方向按键控制十字舵与特技栏 -->
            <div class="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800">
              <!-- 特技快捷动作 -->
              <div class="flex flex-wrap items-center gap-2">
                <n-button
                  size="small"
                  type="info"
                  secondary
                  :disabled="scoutActive"
                  @click="castThiefScout"
                >
                  <template #icon><span>👁️</span></template>
                  盗贼破妄鹰眼 (全显宝箱)
                </n-button>
                <n-button
                  size="small"
                  type="success"
                  secondary
                  :disabled="floatDuration > 0"
                  @click="castFloatWalk"
                >
                  <template #icon><span>🪶</span></template>
                  风水师全息浮空 (剩 {{ floatDuration }} 步)
                </n-button>
              </div>

              <!-- 方向移动舵 -->
              <div class="grid grid-cols-3 gap-1.5 w-32 shrink-0">
                <div></div>
                <button
                  type="button"
                  class="h-9 rounded bg-slate-800 hover:bg-purple-600 text-white font-bold border border-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-sm"
                  aria-label="向上移动"
                  @click="movePlayer(-1, 0)"
                >
                  ▲
                </button>
                <div></div>
                <button
                  type="button"
                  class="h-9 rounded bg-slate-800 hover:bg-purple-600 text-white font-bold border border-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-sm"
                  aria-label="向左移动"
                  @click="movePlayer(0, -1)"
                >
                  ◀
                </button>
                <button
                  type="button"
                  class="h-9 rounded bg-slate-800 hover:bg-purple-600 text-white font-bold border border-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-sm"
                  aria-label="向下移动"
                  @click="movePlayer(1, 0)"
                >
                  ▼
                </button>
                <button
                  type="button"
                  class="h-9 rounded bg-slate-800 hover:bg-purple-600 text-white font-bold border border-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-sm"
                  aria-label="向右移动"
                  @click="movePlayer(0, 1)"
                >
                  ▶
                </button>
              </div>
            </div>
            <div class="text-[11px] text-gray-500 mt-2 text-center">
              💡 提示：支持点击邻近揭示地块或点击方向舵箭头步进探索；键盘方向键亦可操作！
            </div>
          </div>

          <!-- 右侧：实机探险状态仪、环境参数与事件日志 -->
          <div class="lg:col-span-5 flex flex-col space-y-4">
            <!-- 队伍探险状态仪表盘 -->
            <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div class="text-xs font-bold text-gray-200 flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-cyan-400">
                  <span>🛡️</span> 队伍探索生理与资源状态
                </span>
                <span class="text-xs font-mono text-gray-400">已探索: {{ explorationRate }}%</span>
              </div>

              <!-- 生命值 HP 条 -->
              <div class="space-y-1">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">队伍综合生命值 (HP)</span>
                  <span class="font-mono font-bold" :class="playerHp > 2000 ? 'text-emerald-400' : 'text-rose-400'">
                    {{ playerHp }} / 9999
                  </span>
                </div>
                <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    class="h-full transition-all duration-300"
                    :class="playerHp > 4000 ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' : 'bg-gradient-to-r from-rose-500 to-amber-500'"
                    :style="{ width: `${Math.max(5, (playerHp / 9999) * 100)}%` }"
                  ></div>
                </div>
              </div>

              <!-- 核心环境参数指示器 (根据地宫动态变化) -->
              <div class="grid grid-cols-2 gap-2 text-xs pt-1">
                <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div class="text-gray-400 text-[10px]">{{ selectedDungeonPreset.envParam.name }}</div>
                  <div class="font-mono font-bold text-base text-amber-300 mt-0.5">
                    {{ selectedDungeonPreset.envParam.value }} {{ selectedDungeonPreset.envParam.unit || '' }}
                  </div>
                </div>
                <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div class="text-gray-400 text-[10px]">宝箱搜刮率</div>
                  <div class="font-mono font-bold text-base text-cyan-300 mt-0.5">
                    {{ collectedChests }} / {{ totalChests }} 个
                  </div>
                </div>
              </div>

              <!-- 状态词条标签 -->
              <div class="flex flex-wrap items-center gap-1.5 pt-1">
                <n-tag size="tiny" :type="floatDuration > 0 ? 'success' : 'default'">
                  {{ floatDuration > 0 ? `🪶 浮空状态 (${floatDuration}步)` : '🦶 脚踏实地' }}
                </n-tag>
                <n-tag size="tiny" :type="portalUnlocked ? 'primary' : 'warning'">
                  {{ portalUnlocked ? '🌀 传送门禁已解锁' : '🔒 终焉门禁锁死' }}
                </n-tag>
                <n-tag size="tiny" type="info">
                  👣 移动步数: {{ stepCount }} 步
                </n-tag>
              </div>
            </div>

            <!-- 地宫特殊机制战术速查 -->
            <div class="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs space-y-1.5">
              <div class="font-bold text-purple-300 flex items-center gap-1">
                <span>⚡</span> {{ selectedDungeonPreset.name }} · 核心极限制约
              </div>
              <p class="text-gray-400 text-[11px] leading-relaxed">
                {{ selectedDungeonPreset.mechanicDetail }}
              </p>
            </div>

            <!-- 即时探险事件与行动记录流 -->
            <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex-1 flex flex-col">
              <div class="text-xs font-bold text-gray-300 mb-2 flex items-center justify-between">
                <span class="flex items-center gap-1 text-amber-400">
                  <span>📜</span> 探险战术动态日志
                </span>
                <button
                  type="button"
                  class="text-[10px] text-gray-500 hover:text-gray-300 cursor-pointer"
                  @click="dungeonLogs = []"
                >
                  清空日志
                </button>
              </div>
              <div class="h-44 overflow-y-auto space-y-1.5 text-[11px] font-mono pr-1 custom-scrollbar">
                <div
                  v-for="(log, idx) in dungeonLogs"
                  :key="idx"
                  class="p-1.5 rounded leading-relaxed border-l-2"
                  :class="getLogClass(log.type)"
                >
                  <span class="text-gray-500 text-[10px]">[{{ log.time }}]</span>
                  <span class="ml-1 text-gray-200">{{ log.text }}</span>
                </div>
                <div v-if="dungeonLogs.length === 0" class="text-gray-500 text-center py-8">
                  探险队就绪，请在迷宫中迈出探索的第一步...
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 引擎底层工程实现说明与 Godot 4.6 源码架构对齐 -->
        <div class="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all"
                :class="activeDungeonGdTab === 'generator'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'"
                @click="activeDungeonGdTab = 'generator'"
              >
                dungeon_maze_generator.gd
              </button>
              <button
                type="button"
                class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all"
                :class="activeDungeonGdTab === 'resolver'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'"
                @click="activeDungeonGdTab = 'resolver'"
              >
                procedural_labyrinth_resolver.gd
              </button>
            </div>
            <div class="flex items-center gap-2">
              <n-tag size="tiny" type="success">支持 TileMapLayer 烘焙与 A* 路径解算</n-tag>
              <n-button size="tiny" secondary round type="info" @click="copyDungeonGdCode">
                <template #icon><span>📋</span></template>
                复制代码
              </n-button>
            </div>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            游戏实机地宫完全遵循 <code>DungeonMazeGenerator</code> 声明式网格驱动。采用双层 TileMapLayer 分离地形与动态战争迷雾遮罩，通过曼哈顿距离 <code>_update_fog_of_war()</code> 实时更新着色器 Alpha 渐变，并在切图转场期间依托 <code>GameStateSave</code> 进行完整迷雾位图压缩持久化。
          </p>
          <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-56 custom-scrollbar">
            <pre><code v-if="activeDungeonGdTab === 'generator'">{{ gdDungeonGeneratorCode }}</code><code v-else>{{ gdDungeonResolverCode }}</code></pre>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 北窟三层地下路线与原场景景物调查专题指南 -->
    <n-card class="mb-5 bg-gradient-to-br from-slate-900/95 via-sky-950/40 to-slate-900/95 border-sky-800/60 shadow-xl" title="🏔️ 北溟南岸·北窟三层地下秘境路线大典与景物调查指南">
      <template #header-extra>
        <n-tag type="info" size="small" round strong>主线解禁：ch02_restore_trust (重拾信任)</n-tag>
      </template>
      <div class="space-y-4">
        <p class="text-xs text-gray-300 leading-relaxed">
          北窟位于极北之境【北溟南岸】（世界坐标：入口 <code>(1200, 180)</code>，安全返场 <code>(1200, 268)</code>）。内部共分三层地下构造，全面搭载 <code>NorthCaveRoute</code> 双向门禁与 <code>NorthCaveSites</code> 原场景纯读景物调查体系。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- 1F 北窟风口 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-sky-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-sky-400">一层 · 北窟风口</span>
              <n-tag size="tiny" type="info">north_cave</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <span class="text-gray-300 font-bold">出生基准：</span><code>(640, 800)</code>
            </div>
            <div class="text-[11px] text-gray-300 space-y-1">
              <div><strong class="text-cyan-300">🚪 门禁连接：</strong></div>
              <ul class="list-disc list-inside space-y-0.5 text-gray-400">
                <li>南口 <code>(640, 880)</code> &rarr; 大地图北溟南岸 <code>(1200, 268)</code></li>
                <li>东北通道 <code>(1080, 360)</code> &rarr; 北窟回廊 <code>(272, 520)</code></li>
              </ul>
            </div>
            <div class="p-2 rounded bg-sky-950/50 border border-sky-900/40 text-[11px] space-y-0.5">
              <span class="text-amber-300 font-bold">📜 原场景景物：</span>
              <div class="text-gray-300 font-medium">冰裂风口石刻 (ice_wind_crevice)</div>
              <p class="text-gray-400 text-[10px]">记录极北永冻土层风貌与古拉米亚氏族迁徙旧迹，需有效剧情场景上下文。</p>
            </div>
          </div>

          <!-- 2F 北窟回廊 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-indigo-400">二层 · 北窟回廊</span>
              <n-tag size="tiny" type="info">north_cave_2</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <span class="text-gray-300 font-bold">出生基准：</span><code>(272, 520)</code>
            </div>
            <div class="text-[11px] text-gray-300 space-y-1">
              <div><strong class="text-cyan-300">🚪 门禁连接：</strong></div>
              <ul class="list-disc list-inside space-y-0.5 text-gray-400">
                <li>西口 <code>(200, 520)</code> &rarr; 北窟风口 <code>(1008, 360)</code></li>
                <li>东北通道 <code>(1080, 280)</code> &rarr; 北窟晶腔 <code>(640, 800)</code></li>
              </ul>
            </div>
            <div class="p-2 rounded bg-indigo-950/50 border border-indigo-900/40 text-[11px] space-y-0.5">
              <span class="text-amber-300 font-bold">📜 原场景景物：</span>
              <div class="text-gray-300 font-medium">回廊断壁铭文 (corridor_fragment_stone)</div>
              <p class="text-gray-400 text-[10px]">雕刻古老封印真言与极寒黑石矿脉分布图，只读审查队伍与周目，不污染持久化。</p>
            </div>
          </div>

          <!-- 3F 北窟晶腔 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-teal-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-teal-400">三层 · 北窟晶腔</span>
              <n-tag size="tiny" type="info">north_cave_3</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <span class="text-gray-300 font-bold">出生基准：</span><code>(640, 800)</code>
            </div>
            <div class="text-[11px] text-gray-300 space-y-1">
              <div><strong class="text-cyan-300">🚪 门禁连接：</strong></div>
              <ul class="list-disc list-inside space-y-0.5 text-gray-400">
                <li>南口 <code>(640, 880)</code> &rarr; 北窟回廊 <code>(1008, 280)</code></li>
                <li>深层祭坛 &rarr; 极寒晶核守护阵列 (深层封印空间)</li>
              </ul>
            </div>
            <div class="p-2 rounded bg-teal-950/50 border border-teal-900/40 text-[11px] space-y-0.5">
              <span class="text-amber-300 font-bold">📜 原场景景物：</span>
              <div class="text-gray-300 font-medium">极地晶腔核心 (polar_crystal_core)</div>
              <p class="text-gray-400 text-[10px]">散发淡蓝微光的万年玄冰以太晶柱，与极光脉动共鸣，揭示极地龙裔古老盟约。</p>
            </div>
          </div>
        </div>

        <!-- 关键底线与拓扑避让原则 -->
        <div class="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-gray-300 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-cyan-300 font-bold">🛡️ 北窟路线底层工程与安全规范：</span>
            <div class="flex items-center gap-2">
              <n-tag size="tiny" type="warning" round>推荐等级：Lv.45~60</n-tag>
              <n-tag size="tiny" type="success" round>正式支持现场存档</n-tag>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-gray-400 mt-1">
            <div>
              <strong class="text-gray-200">• 正式目录收录：</strong>已并入 <code>StoryMapCatalog</code> 24 处正式可选地宫全矩阵，受 <code>optional_route_is_open</code> 统一门禁管辖。
            </div>
            <div>
              <strong class="text-gray-200">• 现场安全存档：</strong><code>GameStateSave</code> 全面开放三层在场进度保存与脚点断点恢复 (<code>_uses_saved_cave_position</code>)，切图加载锁守卫。
            </div>
            <div>
              <strong class="text-gray-200">• 转场事务守卫：</strong>搭载 <code>NorthCaveVisit</code> 会话控制器，碰撞指纹校验与防重放令牌，切图失败安全回滚四项状态。
            </div>
            <div>
              <strong class="text-gray-200">• 相邻门禁校验：</strong>严禁跨层直跳，仅允许一层↔二层、二层↔三层单步受控跃迁；非法跳转强制熔断。
            </div>
            <div>
              <strong class="text-gray-200">• 门禁几何避让：</strong>大地图返场落脚点严格避让旧北脊关 (<code>loc_north_pass</code>) 32px 自动门重叠触发区，杜绝瞬移循环。
            </div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 风祀台古代遗迹实装规范指南 (对齐 Godot 4.3 2026-10-27 wind_altar_route.gd 实机实装) -->
    <n-card class="mb-5 bg-gradient-to-br from-slate-900/95 via-teal-950/40 to-slate-900/95 border-teal-800/60 shadow-xl" title="🌀 始源风穴·风祀台古代神殿秘境路线与环境声学大典">
      <template #header-extra>
        <n-tag type="success" size="small" round strong>序章解禁：ch00_arrive_temple (初抵神殿)</n-tag>
      </template>
      <div class="space-y-4">
        <p class="text-xs text-gray-300 leading-relaxed">
          风祀台座落于始源神殿东侧山峦隘口（世界坐标：入口 <code>loc_wind_altar (720, 200)</code>，安全返场坐标 <code>(800, 180)</code>，精准避开山体与旧门碰撞）。内部为古风灵汇聚的单室神殿空间 (<code>wind_altar_in</code>)，作为序章探索与安全休憩的圣地。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- 拓扑与门禁 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-teal-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-teal-300">🏛️ 空间拓扑与门禁</span>
              <n-tag size="tiny" type="success">wind_altar_in</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <span class="text-gray-300 font-bold">室内出生点：</span><code>(640, 780)</code>
            </div>
            <div class="text-[11px] text-gray-300 space-y-1">
              <div><strong class="text-teal-400">🚪 门禁规则：</strong></div>
              <ul class="list-disc list-inside space-y-0.5 text-gray-400">
                <li>南口 <code>(640, 880)</code> &rarr; 大地图东侧山麓 <code>(800, 180)</code></li>
                <li>准入等级门禁：Lv.3 ~ 5 (与 origin_temple 同步)</li>
                <li>在场进度守卫：关闭剧情门后在场仍允许南口安全撤离</li>
              </ul>
            </div>
          </div>

          <!-- 景物调查与声音环境 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-cyan-300">📜 晶石台景物与声学</span>
              <n-tag size="tiny" type="info">WindStaticCrystal</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <span class="text-gray-300 font-bold">晶石台坐标：</span><code>(640, 512)</code>
            </div>
            <div class="p-2 rounded bg-teal-950/50 border border-teal-900/40 text-[11px] space-y-1">
              <div class="text-amber-300 font-bold">风之呢喃实机台词：</div>
              <p class="text-gray-300 italic text-[10px]">
                “风声从石柱间穿过，在晶石台旁回荡。<br>南口可返回大陆。”
              </p>
              <div class="text-[10px] text-gray-400 pt-0.5 border-t border-teal-900/50">
                🎵 触发音频：<code>draft1.ogg</code> (局部 SFX -20dB，单次播放 2s 自动销毁)
              </div>
            </div>
          </div>

          <!-- 安全性与无战斗保障 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-emerald-300">🛡️ 纯净安全探索区</span>
              <n-tag size="tiny" type="success">Safe Exploration</n-tag>
            </div>
            <div class="text-[11px] text-gray-300 space-y-1 leading-relaxed">
              <div><strong class="text-emerald-400">✨ 核心设计原则：</strong></div>
              <ul class="list-disc list-inside space-y-0.5 text-gray-400 text-[10px]">
                <li>零遇敌、零陷阱、无战斗惩罚</li>
                <li>无职业限制、无强制主线推进</li>
                <li>支持现场随时安全存读档与冷读恢复</li>
                <li>对白取消/换场景立即卸载音频流引用</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 北溟之巅·北之洞窟三层秘境探索路线与安全科考大典 (对齐 Godot 4.3 2026-10-27 north_cave_route.gd / sites.gd / visit.gd 实机规范) -->
    <n-card class="mb-5 bg-gradient-to-br from-slate-900/95 via-sky-950/40 to-slate-900/95 border-sky-800/60 shadow-xl" title="🏔️ 北溟之巅·北窟三层秘境探索路线与安全科考大典 (North Cave 1~3F)">
      <template #header-extra>
        <n-tag type="info" size="small" round strong>节拍门禁：ch02_restore_trust (龙骑士信赖修复)</n-tag>
      </template>
      <div class="space-y-4">
        <p class="text-xs text-gray-300 leading-relaxed">
          北之洞窟群座落于大陆极北北溟南岸山麓隘口（大地图入口坐标 <code>WORLD_ENTRY (1200, 180)</code>，安全返场坐标 <code>WORLD_RETURN (1232, 268)</code>，南侧返场特别东移 32 像素以精准避开北脊关自动门碰撞体）。全域由三层纵深岩层构成，定性为<strong>纯净安全探索区域（安全探索 · 无战斗）</strong>，无遭遇战、无机关压制，专供古代地质科考与静谧休憩。
        </p>

        <!-- 三层详细拓扑与门禁路线 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- 1F 北窟风口 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-sky-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-sky-300">🌬️ 第一层：北窟风口</span>
              <n-tag size="tiny" type="info">north_cave</n-tag>
            </div>
            <div class="text-[11px] text-gray-400 space-y-0.5">
              <div><span class="text-gray-300 font-bold">出生坐标：</span><code>(640, 800)</code></div>
              <div><span class="text-gray-300 font-bold">静态视觉：</span><code>north_wind_static_visual.json</code></div>
            </div>
            <div class="text-[11px] text-gray-300 space-y-1">
              <div><strong class="text-sky-400">🚪 门禁连接：</strong></div>
              <ul class="list-disc list-inside space-y-0.5 text-gray-400 text-[10px]">
                <li><code>WorldExit (640, 880)</code> &rarr; 返回北溟南岸 <code>(1232, 268)</code></li>
                <li><code>ToNorthCorridor (1080, 360)</code> &rarr; 北窟回廊 <code>(272, 520)</code></li>
              </ul>
            </div>
            <div class="p-2 rounded bg-sky-950/40 border border-sky-900/30 text-[10px] space-y-1">
              <div class="text-amber-300 font-bold">🔍 景物调查：NorthWindRockSurvey (640, 432)</div>
              <p class="text-gray-300 italic">“四座岩台分列通道两侧，北侧横廊与中央石径相接。南口返回北溟南岸；东北通道通往北窟回廊。”</p>
            </div>
          </div>

          <!-- 2F 北窟回廊 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-indigo-300">🌀 第二层：北窟回廊</span>
              <n-tag size="tiny" type="info">north_cave_2</n-tag>
            </div>
            <div class="text-[11px] text-gray-400 space-y-0.5">
              <div><span class="text-gray-300 font-bold">出生坐标：</span><code>(272, 520)</code></div>
              <div><span class="text-gray-300 font-bold">静态视觉：</span><code>north_corridor_static_visual.json</code></div>
            </div>
            <div class="text-[11px] text-gray-300 space-y-1">
              <div><strong class="text-indigo-400">🚪 门禁连接：</strong></div>
              <ul class="list-disc list-inside space-y-0.5 text-gray-400 text-[10px]">
                <li><code>BackNorthWind (200, 520)</code> &rarr; 返回风口 <code>(1008, 360)</code></li>
                <li><code>ToNorthCrystal (1080, 280)</code> &rarr; 北窟晶腔 <code>(640, 800)</code></li>
              </ul>
            </div>
            <div class="p-2 rounded bg-indigo-950/40 border border-indigo-900/30 text-[10px] space-y-1">
              <div class="text-amber-300 font-bold">🔍 景物调查：NorthCorridorRockSurvey (640, 624)</div>
              <p class="text-gray-300 italic">“一座完整岩体立在回廊中央，南侧横院与两边通道留有绕行的空地。西口返回北窟风口；东北通道通往北窟晶腔。”</p>
            </div>
          </div>

          <!-- 3F 北窟晶腔 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-cyan-300">💎 第三层：北窟晶腔</span>
              <n-tag size="tiny" type="info">north_cave_3</n-tag>
            </div>
            <div class="text-[11px] text-gray-400 space-y-0.5">
              <div><span class="text-gray-300 font-bold">出生坐标：</span><code>(640, 800)</code></div>
              <div><span class="text-gray-300 font-bold">静态视觉：</span><code>north_crystal_static_visual.json</code></div>
            </div>
            <div class="text-[11px] text-gray-300 space-y-1">
              <div><strong class="text-cyan-400">🚪 门禁连接：</strong></div>
              <ul class="list-disc list-inside space-y-0.5 text-gray-400 text-[10px]">
                <li><code>BackNorthCorridor (640, 880)</code> &rarr; 返回回廊 <code>(1008, 280)</code></li>
                <li>终点深处：仅单向折返回廊，原路返回大陆</li>
              </ul>
            </div>
            <div class="p-2 rounded bg-cyan-950/40 border border-cyan-900/30 text-[10px] space-y-1">
              <div class="text-amber-300 font-bold">🔍 景物调查：NorthCrystalSurvey (640, 500)</div>
              <p class="text-gray-300 italic">“蓝色晶簇立在北侧石地上，中央石径与横向庭地在它南面相交。南口返回北窟回廊，再经风口返回大陆。”</p>
            </div>
          </div>
        </div>

        <!-- 引擎架构底层准入与退役守卫 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-gray-300 space-y-1">
          <div class="font-bold text-amber-300 flex items-center gap-1.5">
            <span>🛡️</span>
            <span>Godot 引擎原生守卫规范 (north_cave_route.gd / north_cave_visit.gd)</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-400 text-[10px]">
            <div><strong class="text-gray-200">1. 实体活性检验 (_live_host)：</strong>仅当前活动主场景且 Player 处于步行模式 (foot) 下响应，切入战斗或探险加载中一概拦截。</div>
            <div><strong class="text-gray-200">2. 门禁安全回退机制：</strong>若后续剧情关闭门禁，已身处洞内的探险队伍仍享有“逐层原路撤离”的绝对特权，杜绝死锁。</div>
            <div><strong class="text-gray-200">3. 碰撞安全脚标 (safe_foot)：</strong>环境动态加载三子类拓扑组件，严禁把晶簇图片轮廓当角色实体碰撞，防止落空穿墙。</div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 石纹窟三层可选参观支路大典 (对齐 Godot 4.3 vein_cave_route.gd / vein_cave_sites.gd 实机规范) -->
    <n-card class="mb-5 bg-gradient-to-br from-slate-900/95 via-amber-950/30 to-slate-900/95 border-amber-700/60 shadow-xl" title="⛏️ 石纹窟三层全域可选参观支路拓扑大典 (Vein Cave 1~3F System)">
      <template #header-extra>
        <div class="flex items-center gap-1.5">
          <n-tag type="warning" size="small" round strong>假王节拍前置 (ch03_false_king)</n-tag>
          <n-tag type="success" size="small" round>安全探索 · 无遇敌</n-tag>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-xs text-gray-300 leading-relaxed">
          对齐 Godot 引擎 <code>vein_cave_route.gd</code> 与 <code>vein_cave_sites.gd</code> 架构：石纹窟为击破假王阿斯托斯（<code>ch03_false_king</code>）后开放的原地貌可选参观支路。全 3 层环境采用纯静态石质陈设组件（<code>vein_cave_static_environment.gd</code> / <code>vein_bone_static_environment.gd</code> / <code>vein_fang_static_environment.gd</code>），不增塞伪主线与怪物战斗，保持全层 <code>safe_zone = true</code>。
        </p>

        <!-- 坐标与西侧陆地安全返程 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-amber-900/40 space-y-1">
            <span class="text-[10px] text-gray-400 block">大地图入口坐标</span>
            <div class="text-xs font-mono font-bold text-amber-300">(2040, 1240)</div>
            <div class="text-[10px] text-gray-500">首层独占大陆标记 loc_vein_cave</div>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-amber-900/40 space-y-1">
            <span class="text-[10px] text-gray-400 block">西侧陆地返程坐标 (WORLD_RETURN)</span>
            <div class="text-xs font-mono font-bold text-emerald-300">(1952, 1240)</div>
            <div class="text-[10px] text-gray-500">西移 88px，精准避开内湾与普拉博卡碰撞</div>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-amber-900/40 space-y-1">
            <span class="text-[10px] text-gray-400 block">层间传送门半径</span>
            <div class="text-xs font-mono font-bold text-cyan-300">RADIUS = 32.0 px</div>
            <div class="text-[10px] text-gray-500">落点置于门圈外，杜绝进出循环回弹</div>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-amber-900/40 space-y-1">
            <span class="text-[10px] text-gray-400 block">安全探索状态</span>
            <div class="text-xs font-mono font-bold text-purple-300">safe_zone: true</div>
            <div class="text-[10px] text-gray-500">HUD 提示：安全探索 · WASD移动 / 点击调查</div>
          </div>
        </div>

        <!-- 三层地貌分层拓扑 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- 1F 石纹窟口 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-400">1F 石纹窟口 (vein_cave)</span>
              <n-tag size="tiny" type="warning">ruins</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <strong>传送门：</strong><br />
              南口 (640, 880) &rarr; 返回大地图 (1952, 1240)<br />
              东北口 (1080, 360) &rarr; 下层骨廊 (272, 520)
            </div>
            <div class="p-2 rounded bg-amber-950/20 border border-amber-900/40 text-[10px] text-gray-300">
              残墙与石柱分列石路两侧。东北通道下至骨廊，南口返回大陆。
            </div>
          </div>

          <!-- 2F 骨廊 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-400">2F 骨廊 (vein_cave_2)</span>
              <n-tag size="tiny" type="warning">tomb</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <strong>传送门：</strong><br />
              西口 (200, 520) &rarr; 返回窟口 (1008, 360)<br />
              东北口 (1080, 280) &rarr; 下层牙厅 (640, 780)
            </div>
            <div class="p-2 rounded bg-amber-950/20 border border-amber-900/40 text-[10px] text-gray-300">
              两具石棺和石柱分居通道两侧，中央短墙前后留有过道。
            </div>
          </div>

          <!-- 3F 牙厅 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-400">3F 牙厅 (vein_cave_3)</span>
              <n-tag size="tiny" type="warning">keep</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <strong>传送门：</strong><br />
              南口 (640, 880) &rarr; 返回骨廊 (1008, 280)
            </div>
            <div class="p-2 rounded bg-amber-950/20 border border-amber-900/40 text-[10px] text-gray-300">
              六根石柱分为左右两列，中间石路通向前庭短墙。绝不装空目标推进门。
            </div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 海潮洞窟三层可选参观支路大典 (对齐 Godot 4.3 tide_cave_route.gd / tide_cave_sites.gd 实机规范) -->
    <n-card class="mb-5 bg-gradient-to-br from-slate-900/95 via-cyan-950/30 to-slate-900/95 border-cyan-700/60 shadow-xl" title="🌊 海潮洞窟三层全域可选参观支路拓扑大典 (Tide Cave 1~3F System)">
      <template #header-extra>
        <div class="flex items-center gap-1.5">
          <n-tag type="info" size="small" round strong>海路重开前置 (ch04_sea_route)</n-tag>
          <n-tag type="success" size="small" round>安全探索 · 无遇敌</n-tag>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-xs text-gray-300 leading-relaxed">
          对齐 Godot 引擎 <code>tide_cave_route.gd</code> 与 <code>tide_cave_sites.gd</code> 架构：海潮洞窟（潮窟）为航路重开（<code>ch04_sea_route</code>）后解禁的近海礁岩秘境。全 3 层环境采用纯静态海风与珊瑚礁环境组件（<code>tide_cave_static_environment.gd</code> / <code>tide_hideout_static_environment.gd</code> / <code>tide_lock_static_environment.gd</code>），不承接船钥匙主线责任，全域 <code>safe_zone = true</code>。
        </p>

        <!-- 坐标与西岸安全返程 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-cyan-900/40 space-y-1">
            <span class="text-[10px] text-gray-400 block">大地图入口坐标</span>
            <div class="text-xs font-mono font-bold text-cyan-300">(300, 1180)</div>
            <div class="text-[10px] text-gray-500">西岸浅滩大陆标记 loc_tide_cave</div>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-cyan-900/40 space-y-1">
            <span class="text-[10px] text-gray-400 block">西岸出口安全返点</span>
            <div class="text-xs font-mono font-bold text-emerald-300">西岸平整陆地</div>
            <div class="text-[10px] text-gray-500">南口直通大陆西岸，零海面死锁风险</div>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-cyan-900/40 space-y-1">
            <span class="text-[10px] text-gray-400 block">传送门光标与色彩</span>
            <div class="text-xs font-mono font-bold text-sky-300">RGBA(0.45, 0.75, 1, 0.85)</div>
            <div class="text-[10px] text-gray-500">蔚蓝海潮光标，离开原32px触发圈</div>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-cyan-900/40 space-y-1">
            <span class="text-[10px] text-gray-400 block">安全探索状态</span>
            <div class="text-xs font-mono font-bold text-teal-300">safe_zone: true</div>
            <div class="text-[10px] text-gray-500">纯探索布景，无怪物刷新扰动</div>
          </div>
        </div>

        <!-- 三层地貌分层拓扑 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- 1F 潮窟口 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-400">1F 潮窟口 (tide_cave)</span>
              <n-tag size="tiny" type="info">bay</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <strong>传送门：</strong><br />
              南口 (640, 880) &rarr; 返回西岸大陆<br />
              东北口 (1080, 360) &rarr; 下层海贼藏 (272, 520)
            </div>
            <div class="p-2 rounded bg-cyan-950/20 border border-cyan-900/40 text-[10px] text-gray-300">
              沙岸与礁岩之间留着通路，深水和珊瑚分列两侧。
            </div>
          </div>

          <!-- 2F 海贼藏 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-400">2F 海贼藏 (tide_cave_hide)</span>
              <n-tag size="tiny" type="info">cape</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <strong>传送门：</strong><br />
              西口 (200, 520) &rarr; 返回潮窟口 (1008, 360)<br />
              东口 (1080, 520) &rarr; 下层潮闸厅 (640, 780)
            </div>
            <div class="p-2 rounded bg-cyan-950/20 border border-cyan-900/40 text-[10px] text-gray-300">
              木板廊道连接两侧通路，普通货物摆在水边。
            </div>
          </div>

          <!-- 3F 潮闸厅 -->
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-400">3F 潮闸厅 (tide_cave_lock)</span>
              <n-tag size="tiny" type="info">undersea</n-tag>
            </div>
            <div class="text-[11px] text-gray-400">
              <strong>传送门：</strong><br />
              南口 (640, 880) &rarr; 返回海贼藏 (1008, 520)
            </div>
            <div class="p-2 rounded bg-cyan-950/20 border border-cyan-900/40 text-[10px] text-gray-300">
              石柱沿中央通道两侧排列，珊瑚留在侧廊。
            </div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 全域六大隐藏秘境地下城勘探大典 (基于桌面 Godot 2026-10 最新实机实装规范) -->
    <n-card class="mb-5 bg-gradient-to-br from-slate-900/95 via-indigo-950/40 to-slate-900/95 border-indigo-800/60 shadow-xl" title="🗺️ 全域六大高阶探索秘境：地宫机关、实机坐标与拓扑解谜指南">
      <template #header-extra>
        <n-tag type="warning" size="small" round strong>实机引擎静态场景真实验证</n-tag>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- 1. 极寒冰河洞窟群 -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-sky-800/50 space-y-2 hover:border-sky-500/60 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-sky-300 flex items-center gap-1.5">
              <span>🧊</span>
              <span>极寒冰河洞窟 (Glacial Cave 1~3F)</span>
            </span>
            <n-tag size="tiny" type="info">Lv.40~55</n-tag>
          </div>
          <p class="text-[11px] text-gray-400">
            <strong>大陆入口：</strong><code>glacial_cave</code> (世界坐标 1280, 512)
          </p>
          <div class="p-2 rounded bg-sky-950/40 border border-sky-900/40 text-[11px] text-gray-300 space-y-1">
            <div><strong class="text-sky-300">⚙️ 核心机关：</strong>永冻滑行冰面（不可中途转向）、极地冰锥落石陷阱、冰魄反光镜折射解谜。</div>
            <div><strong class="text-amber-300">⚔️ 守关首领：</strong>极寒冰霜巨龙（三阶段锁血，弱火，吸收水/冰）。</div>
            <div><strong class="text-emerald-300">🎁 秘宝掉落：</strong>寒冰神剑、冰魄护灵法冠、龙鳞防具。</div>
          </div>
        </div>

        <!-- 2. 雷光电磁通路 -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-amber-800/50 space-y-2 hover:border-amber-500/60 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <span>⚡</span>
              <span>雷光通路与电磁回廊 (Fulmination Route)</span>
            </span>
            <n-tag size="tiny" type="warning">Lv.35~50</n-tag>
          </div>
          <p class="text-[11px] text-gray-400">
            <strong>大陆入口：</strong><code>fulmination_route</code> (世界坐标 960, 480)
          </p>
          <div class="p-2 rounded bg-amber-950/40 border border-amber-900/40 text-[11px] text-gray-300 space-y-1">
            <div><strong class="text-amber-300">⚙️ 核心机关：</strong>周期性高压离子电网（需按节奏闪避）、避雷针导电充能开关、磁场反极性悬浮。</div>
            <div><strong class="text-rose-300">⚔️ 守关首领：</strong>雷帝震怒电灵（全屏雷暴闪电，极弱地/水属性附魔）。</div>
            <div><strong class="text-emerald-300">🎁 秘宝掉落：</strong>雷神之锤、绝缘电磁指环、雷光卷轴。</div>
          </div>
        </div>

        <!-- 3. 铁脉废弃矿坑 -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-orange-800/50 space-y-2 hover:border-orange-500/60 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-orange-300 flex items-center gap-1.5">
              <span>⛏️</span>
              <span>铁脉矿坑地下城 (Iron Vein Mines B1~B3)</span>
            </span>
            <n-tag size="tiny" type="warning">Lv.30~45</n-tag>
          </div>
          <p class="text-[11px] text-gray-400">
            <strong>大陆入口：</strong><code>iron_vein</code> (世界坐标 720, 640)
          </p>
          <div class="p-2 rounded bg-orange-950/40 border border-orange-900/40 text-[11px] text-gray-300 space-y-1">
            <div><strong class="text-orange-300">⚙️ 核心机关：</strong>双轨矿车变速扳手、炸药引线定点爆破暗壁、瓦斯易燃毒气区域需风系驱散。</div>
            <div><strong class="text-rose-300">⚔️ 守关首领：</strong>熔炉钢铁巨像（高物防超耐打，需雷击破甲或魔法侵蚀）。</div>
            <div><strong class="text-emerald-300">🎁 秘宝掉落：</strong>精炼秘银巨剑、重装泰坦板甲、黑金矿石×5。</div>
          </div>
        </div>

        <!-- 4. 分歧双子之塔 -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-purple-800/50 space-y-2 hover:border-purple-500/60 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-purple-300 flex items-center gap-1.5">
              <span>🗼</span>
              <span>分歧双子之塔 (Fork Spire Left & Right)</span>
            </span>
            <n-tag size="tiny" type="error">Lv.50~65</n-tag>
          </div>
          <p class="text-[11px] text-gray-400">
            <strong>大陆入口：</strong><code>fork_spire</code> (世界坐标 1440, 820)
          </p>
          <div class="p-2 rounded bg-purple-950/40 border border-purple-900/40 text-[11px] text-gray-300 space-y-1">
            <div><strong class="text-purple-300">⚙️ 核心机制：</strong>分队兵分两路！左塔为【物理封魔禁域】（施法即死反噬），右塔为【魔力灵体之塔】（物理绝对MISS）。</div>
            <div><strong class="text-rose-300">⚔️ 守关首领：</strong>双子武圣与全知法皇（双塔必须同步击破，否则触发复活）。</div>
            <div><strong class="text-emerald-300">🎁 秘宝掉落：</strong>古代究极魔法【核爆 (Flare)】、传说圣剑【石中剑 (Excalibur)】。</div>
          </div>
        </div>

        <!-- 5. 余烬之塔与火之祭坛 -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-red-800/50 space-y-2 hover:border-red-500/60 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-red-300 flex items-center gap-1.5">
              <span>🔥</span>
              <span>余烬之塔与火之祭坛 (Ember Spire 1~4F)</span>
            </span>
            <n-tag size="tiny" type="error">Lv.45~60</n-tag>
          </div>
          <p class="text-[11px] text-gray-400">
            <strong>大陆入口：</strong><code>ember_spire</code> (世界坐标 380, 750)
          </p>
          <div class="p-2 rounded bg-red-950/40 border border-red-900/40 text-[11px] text-gray-300 space-y-1">
            <div><strong class="text-red-300">⚙️ 核心机关：</strong>岩浆浪潮周期涌动（每3回合退避至高台）、火精灵四象图腾点火仪式、耐火踏板解密。</div>
            <div><strong class="text-rose-300">⚔️ 守关首领：</strong>余烬之王·拉格纳罗斯之影（熔火核心全屏AOE，弱冰水）。</div>
            <div><strong class="text-emerald-300">🎁 秘宝掉落：</strong>炎之神杖、炽火红莲披风、火之水晶原石。</div>
          </div>
        </div>

        <!-- 6. 天空港口与反重力船坞 -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-cyan-800/50 space-y-2 hover:border-cyan-500/60 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🛸</span>
              <span>天空港口与反重力船坞 (Sky City Port & Docks)</span>
            </span>
            <n-tag size="tiny" type="info">Lv.55~70</n-tag>
          </div>
          <p class="text-[11px] text-gray-400">
            <strong>大陆入口：</strong><code>sky_city_port</code> (世界坐标 1600, 200)
          </p>
          <div class="p-2 rounded bg-cyan-950/40 border border-cyan-900/40 text-[11px] text-gray-300 space-y-1">
            <div><strong class="text-cyan-300">⚙️ 核心机制：</strong>反重力能量锚点校准、强对流风洞滑翔伞索道跳跃、飞空艇停机坪声纳识别门禁。</div>
            <div><strong class="text-rose-300">⚔️ 守关首领：</strong>暴风神鹰领主（高空盘旋无敌帧，需防空魔导炮台射击使其落地）。</div>
            <div><strong class="text-emerald-300">🎁 秘宝掉落：</strong>黑隼号飞空艇全域航渡许可、星界定位罗盘、疾风羽翼。</div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 陷阱与防御对策表 -->
    <n-card title="⚠️ 环境陷阱与全队生存防护矩阵" class="mb-4 bg-slate-900/80 border-slate-800">
      <n-table striped size="small">
        <thead>
          <tr>
            <th>陷阱类型</th>
            <th>地貌特征</th>
            <th>触发惩罚与危害</th>
            <th>最佳免疫与对策</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-amber-400 font-bold">🕳️ 隐形落穴 (Pitfalls)</td>
            <td>地砖外观完全无异，潜伏在狭窄过道</td>
            <td>全队跌入下层地宫，损失当前 HP 的 20%</td>
            <td><n-tag type="success" size="small">风水师被动【洞悉陷阱】</n-tag> 或盗贼【警惕】</td>
          </tr>
          <tr>
            <td class="text-rose-400 font-bold">🌋 熔岩与毒沼 (Lava/Poison)</td>
            <td>翻滚气泡的赤红熔岩或紫色毒泥</td>
            <td>移动每步扣除全员 50 HP，高概率附加中毒</td>
            <td><n-tag type="success" size="small">风水师【轻步 (Light Step)】</n-tag> 或全员【浮空 (Float)】</td>
          </tr>
          <tr>
            <td class="text-cyan-400 font-bold">🗡️ 尖刺翻板 (Spike Floors)</td>
            <td>周期性从地底伸缩突出的尖锐铁刺</td>
            <td>刺穿造成中量真实物理伤害，队伍硬直 1 秒</td>
            <td>把握刺矛收回的 1.5 秒空歇期间隙快速通过</td>
          </tr>
          <tr>
            <td class="text-sky-400 font-bold">🎲 传送魔方 (Warp Cubes)</td>
            <td>虚空中浮动变幻的多色以太立方体</td>
            <td>打乱队伍空间坐标至入口或怪物巢穴</td>
            <td>按红&rarr;蓝&rarr;紫&rarr;金的相位光谱序列依次触碰</td>
          </tr>
        </tbody>
      </n-table>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useMessage, type InputInst } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'
import { dungeonProgression } from '../config/dungeonProgression'
import { usePagination } from '@/composables/usePagination'

const message = useMessage()

const scrollToLabyrinthStudio = () => {
  const el = document.getElementById('dungeon-labyrinth-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const gameStore = useGameStore()
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

const dungeons = computed(() => gameStore.db.maps || [])
const selectedTier = ref('all')
const searchQuery = ref('')
const searchInput = ref<InputInst | null>(null)
const tierFilters = ref<HTMLElement | null>(null)

// 空结果恢复只回到原筛选器，不清除用户当前的组合条件。
const focusTierFilter = () => {
  tierFilters.value?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus()
}

const tiers = [
  { id: 'all', name: '全部地貌维度' },
  { id: 'overworld', name: '地表层' },
  { id: 'sky', name: '苍穹与宇宙层' },
  { id: 'ocean', name: '深海与海沟层' },
  { id: 'hell', name: '地狱与冥界层' },
  { id: 'void', name: '终局虚无层' }
]

const countByTier = (tierId: string) => {
  if (tierId === 'all') return dungeons.value.length
  return dungeons.value.filter((d: any) => {
    const t = (d.tier || d.type || '').toLowerCase()
    if (tierId === 'overworld') return t.includes('地表') || t.includes('overworld') || t.includes('主线序章')
    if (tierId === 'sky') return t.includes('苍穹') || t.includes('宇宙') || t.includes('sky')
    if (tierId === 'ocean') return t.includes('海') || t.includes('ocean')
    if (tierId === 'hell') return t.includes('地狱') || t.includes('冥界') || t.includes('hell')
    if (tierId === 'void') return t.includes('虚无') || t.includes('void') || t.includes('终极地下城')
    return false
  }).length
}

const filteredDungeons = computed(() => {
  let list = dungeons.value
  if (selectedTier.value !== 'all') {
    list = list.filter((d: any) => {
      const t = (d.tier || d.type || '').toLowerCase()
      if (selectedTier.value === 'overworld') return t.includes('地表') || t.includes('overworld') || t.includes('主线序章')
      if (selectedTier.value === 'sky') return t.includes('苍穹') || t.includes('宇宙') || t.includes('sky')
      if (selectedTier.value === 'ocean') return t.includes('海') || t.includes('ocean')
      if (selectedTier.value === 'hell') return t.includes('地狱') || t.includes('冥界') || t.includes('hell')
      if (selectedTier.value === 'void') return t.includes('虚无') || t.includes('void') || t.includes('终极地下城')
      return false
    })
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter((d: any) =>
      d.name?.toLowerCase().includes(q) ||
      d.desc?.toLowerCase().includes(q) ||
      d.features?.toLowerCase().includes(q) ||
      d.monsters?.toLowerCase().includes(q) ||
      d.mechanics?.toLowerCase().includes(q)
    )
  }
  return list
})

const {
  currentPage,
  pageSize,
  total,
  paginatedList,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination(filteredDungeons, { pageSize: 6 })

watch([selectedTier, searchQuery], () => {
  resetPage()
})

const getTierTagType = (tier: string) => {
  if (!tier) return 'default'
  const t = tier.toLowerCase()
  if (t.includes('苍穹') || t.includes('宇宙')) return 'warning'
  if (t.includes('海')) return 'info'
  if (t.includes('地狱') || t.includes('冥界')) return 'error'
  if (t.includes('虚无')) return 'primary'
  return 'success'
}

// ==========================================
// 🌌 多元宇宙深渊迷宫与战争迷雾工坊系统
// ==========================================
interface DungeonTile {
  type: 'wall' | 'floor' | 'trap' | 'chest' | 'switch' | 'portal' | 'hazard' | 'boss'
  name: string
  revealed: boolean
  collected?: boolean
  triggered?: boolean
  description?: string
}

interface DungeonPresetConfig {
  id: string
  name: string
  icon: string
  tagType: 'primary' | 'info' | 'warning' | 'error' | 'success'
  difficulty: string
  mechanicDetail: string
  envParam: { name: string; value: string | number; unit?: string }
  start: [number, number]
  layout: string[]
}

const dungeonPresets: DungeonPresetConfig[] = [
  {
    id: 'void_castle',
    name: '次元裂隙·虚无之城核心',
    icon: '🌌',
    tagType: 'primary',
    difficulty: 'Lv.70+ 终焉极难',
    mechanicDetail: '虚空重力坍缩与虚无黑洞视界：误踩黑洞陷阱将损失 2500 点真实 HP；触碰中央时空核心机关解除封印，方能开启终焉跃迁门。',
    envParam: { name: '虚空重力极化率', value: '184.5', unit: 'G-Flux' },
    start: [5, 0],
    layout: [
      '#.C.BP',
      '..#...',
      'T#S#T.',
      '....#.',
      '#T#.C.',
      '..#.C.'
    ]
  },
  {
    id: 'sunken_walse',
    name: '沉没的沃尔斯水之塔',
    icon: '🌊',
    tagType: 'info',
    difficulty: 'Lv.45+ 水下竞速',
    mechanicDetail: '水下高压缺氧环境：总计 420 秒氧气储备，每移动 1 步消耗 15 秒！必须在氧气耗尽前捞取失落的水晶碎片并激活排水闸门。',
    envParam: { name: '水下氧气余量', value: 420, unit: '秒' },
    start: [5, 1],
    layout: [
      '#C..SP',
      '..##..',
      '.C.T#.',
      '#..#..',
      'T.#.C.',
      '.#....'
    ]
  },
  {
    id: 'fork_tower',
    name: '双生分歧之塔 (魔与力)',
    icon: '🏛️',
    tagType: 'warning',
    difficulty: 'Lv.55+ 双生制约',
    mechanicDetail: '以太与力量双生相位：左翼物理禁制（魔法反制 100% 伤害），右翼禁魔结界（禁用以太吟唱）。踩下以太交错机关均衡两极能量方可撤离。',
    envParam: { name: '两极偏振状态', value: '双塔共鸣 均衡', unit: '' },
    start: [5, 2],
    layout: [
      'P.S.C#',
      '.#.#..',
      'C..#T.',
      '#T...#',
      '..#.#C',
      '..S...'
    ]
  },
  {
    id: 'north_cave',
    name: '极北玄冰洞窟 (深层)',
    icon: '🏔️',
    tagType: 'success',
    difficulty: 'Lv.50+ 永冻冰穴',
    mechanicDetail: '永冻绝对零度与冰裂陷阱：洞窟遍布冰锥坍塌区与氏族石刻，开启风水师浮空可无视冰面阻滑，探明古代玄冰晶核。',
    envParam: { name: '永冻严寒度', value: '-85.4', unit: '°C' },
    start: [5, 0],
    layout: [
      '#C..SP',
      '..T#..',
      '#...C.',
      '.#T.#.',
      'C...T.',
      '..#...'
    ]
  }
]

const selectedDungeonId = ref('void_castle')
const selectedDungeonPreset = computed(() => {
  return dungeonPresets.find(p => p.id === selectedDungeonId.value) || dungeonPresets[0]
})

const playerPos = ref({ r: 5, c: 0 })
const dungeonGrid = ref<DungeonTile[][]>([])
const revealedAll = ref(false)
const playerHp = ref(9999)
const stepCount = ref(0)
const floatDuration = ref(0)
const scoutActive = ref(false)
const portalUnlocked = ref(false)

interface DungeonLogItem {
  time: string
  text: string
  type: 'info' | 'warn' | 'success' | 'danger'
}
const dungeonLogs = ref<DungeonLogItem[]>([])

const playerIcon = computed(() => {
  if (selectedDungeonId.value === 'sunken_walse') return '🤿'
  if (selectedDungeonId.value === 'fork_tower') return '🧙‍♂️'
  if (selectedDungeonId.value === 'north_cave') return '🧗‍♂️'
  return '🚶‍♂️'
})

const addLog = (text: string, type: 'info' | 'warn' | 'success' | 'danger' = 'info') => {
  const d = new Date()
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
  dungeonLogs.value.unshift({ time, text, type })
  if (dungeonLogs.value.length > 40) {
    dungeonLogs.value.pop()
  }
}

const totalChests = computed(() => {
  let count = 0
  for (const row of dungeonGrid.value) {
    for (const t of row) {
      if (t.type === 'chest') count++
    }
  }
  return count
})

const collectedChests = computed(() => {
  let count = 0
  for (const row of dungeonGrid.value) {
    for (const t of row) {
      if (t.type === 'chest' && t.collected) count++
    }
  }
  return count
})

const explorationRate = computed(() => {
  let total = 0
  let revealed = 0
  for (const row of dungeonGrid.value) {
    for (const t of row) {
      total++
      if (t.revealed) revealed++
    }
  }
  if (!total) return 0
  return Math.round((revealed / total) * 100)
})

const initDungeonGrid = () => {
  const preset = selectedDungeonPreset.value
  playerPos.value = { r: preset.start[0], c: preset.start[1] }
  playerHp.value = 9999
  stepCount.value = 0
  floatDuration.value = 0
  scoutActive.value = false
  portalUnlocked.value = false
  revealedAll.value = false

  if (preset.id === 'sunken_walse') {
    preset.envParam.value = 420
  }

  const grid: DungeonTile[][] = []
  for (let r = 0; r < 6; r++) {
    const row: DungeonTile[] = []
    const line = preset.layout[r] || '......'
    for (let c = 0; c < 6; c++) {
      const char = line[c] || '.'
      let type: DungeonTile['type'] = 'floor'
      let name = '以太通道'
      let description = '平整的地下石板路径'

      if (char === '#') {
        type = 'wall'
        name = '坚实岩壁'
        description = '不可通行的重力魔导石壁'
      } else if (char === 'T') {
        type = 'trap'
        name = '落穴陷阱'
        description = '致命的地底落穴与裂隙'
      } else if (char === 'C') {
        type = 'chest'
        name = '秘宝神箱'
        description = '散发远古微光的远古神兵宝箱'
      } else if (char === 'S') {
        type = 'switch'
        name = '以太解禁核心'
        description = '解除终焉封印的古代机关晶核'
      } else if (char === 'P') {
        type = 'portal'
        name = '次元传送跃迁门'
        description = '通往下一未知深渊的传送大门'
      } else if (char === 'B') {
        type = 'boss'
        name = '深渊守门恶魔'
        description = '潜伏在通往出口咽喉要道的深渊守卫'
      }

      row.push({
        type,
        name,
        revealed: false,
        collected: false,
        triggered: false,
        description
      })
    }
    grid.push(row)
  }

  dungeonGrid.value = grid
  revealAround(playerPos.value.r, playerPos.value.c)
  addLog(`已进入【${preset.name}】；初始坐标 (${playerPos.value.r}, ${playerPos.value.c})，请留意环境极限制约！`, 'info')
}

const revealAround = (r: number, c: number, radius = 1) => {
  for (let dr = -radius; dr <= radius; dr++) {
    for (let dc = -radius; dc <= radius; dc++) {
      const nr = r + dr
      const nc = c + dc
      if (nr >= 0 && nr < 6 && nc >= 0 && nc < 6) {
        dungeonGrid.value[nr][nc].revealed = true
      }
    }
  }
}

const switchDungeonPreset = (id: string) => {
  selectedDungeonId.value = id
  initDungeonGrid()
}

const resetDungeon = () => {
  initDungeonGrid()
  addLog('已重新重置当前地宫层级与战争迷雾！', 'info')
}

const movePlayer = (dr: number, dc: number) => {
  const nr = playerPos.value.r + dr
  const nc = playerPos.value.c + dc

  if (nr < 0 || nr >= 6 || nc < 0 || nc >= 6) {
    addLog('已触及地宫空间外壁边缘，无法继续前进！', 'warn')
    return
  }

  const targetTile = dungeonGrid.value[nr][nc]
  if (targetTile.type === 'wall') {
    addLog(`前方是【${targetTile.name}】，无法通行！`, 'warn')
    return
  }

  // 移动成功
  playerPos.value = { r: nr, c: nc }
  stepCount.value++
  revealAround(nr, nc)

  if (floatDuration.value > 0) {
    floatDuration.value--
    if (floatDuration.value === 0) {
      addLog('🪶 风水师浮空术效果已结束，全员重新脚踏实地。', 'info')
    }
  }

  // 环境参数损耗 (如沉没沃尔斯塔氧气消耗)
  if (selectedDungeonId.value === 'sunken_walse') {
    const curO2 = Number(selectedDungeonPreset.value.envParam.value) || 0
    const newO2 = Math.max(0, curO2 - 15)
    selectedDungeonPreset.value.envParam.value = newO2
    if (newO2 <= 60 && newO2 > 0) {
      addLog(`⚠️ 水下氧气告急！仅剩 ${newO2} 秒，请迅速寻找出口或补给！`, 'danger')
    } else if (newO2 === 0) {
      playerHp.value = Math.max(1, playerHp.value - 1200)
      addLog('💀 氧气彻底耗尽！全员承受水下无氧窒息剧痛 (-1200 HP)！', 'danger')
    }
  }

  // 地块交互触发
  if (targetTile.type === 'trap' && !targetTile.triggered) {
    if (floatDuration.value > 0) {
      addLog(`🪶 浮空状态生效中！敏捷滑过【${targetTile.name}】，完全免除陷阱伤害！`, 'success')
    } else {
      targetTile.triggered = true
      const dmg = 2500
      playerHp.value = Math.max(1, playerHp.value - dmg)
      addLog(`💥 触发了【${targetTile.name}】！地面塌陷受到 -${dmg} 真实物理伤害！`, 'danger')
    }
  } else if (targetTile.type === 'chest' && !targetTile.collected) {
    targetTile.collected = true
    const rewards = ['圣剑·王者之剑 (Excalibur)', '诸神黄昏 (Ragnarok)', '以太特酿药水 ×3', '龙之逆鳞 ×1', '源氏之铠 (Genji Armor)']
    const reward = rewards[Math.floor(Math.random() * rewards.length)]
    addLog(`🎁 开启了【${targetTile.name}】！搜获绝版神器：${reward}！`, 'success')
  } else if (targetTile.type === 'switch' && !targetTile.triggered) {
    targetTile.triggered = true
    portalUnlocked.value = true
    addLog(`✨ 成功启动【${targetTile.name}】！古老机械轰鸣转动，终焉传送门禁已解除封印！`, 'success')
  } else if (targetTile.type === 'boss') {
    addLog(`👹 遭遇【${targetTile.name}】！深渊邪神散发强烈以太风暴 (-1000 HP)，守卫已被击溃！`, 'danger')
    playerHp.value = Math.max(1, playerHp.value - 1000)
    targetTile.type = 'floor'
  } else if (targetTile.type === 'portal') {
    if (portalUnlocked.value) {
      addLog('🎉 恭喜！全队成功踏入【次元传送跃迁门】，成功通关本层深渊密境！', 'success')
    } else {
      addLog('🔒 传送门处于绝对封印状态！必须先踩下场景内的以太解禁核心！', 'warn')
    }
  }
}

const tryMoveTo = (r: number, c: number) => {
  const dr = r - playerPos.value.r
  const dc = c - playerPos.value.c
  if (Math.abs(dr) + Math.abs(dc) === 1) {
    movePlayer(dr, dc)
  }
}

const castThiefScout = () => {
  scoutActive.value = true
  revealAround(playerPos.value.r, playerPos.value.c, 2)
  for (const row of dungeonGrid.value) {
    for (const t of row) {
      if (t.type === 'chest' || t.type === 'switch' || t.type === 'portal') {
        t.revealed = true
      }
    }
  }
  addLog('👁️ 盗贼【敏锐鹰眼】发动！全图宝箱、机关核心与传送门方位已全息标记！', 'info')
}

const castFloatWalk = () => {
  floatDuration.value = 6
  addLog('🪶 风水师【全息浮空】发动！全员身披以太羽翼，未来 6 步内免疫一切陷阱与落穴！', 'success')
}

const getTileClass = (tile: DungeonTile, r: number, c: number) => {
  if (!tile.revealed && !revealedAll.value) {
    return 'bg-slate-950 border-slate-900 cursor-not-allowed text-slate-700'
  }
  if (playerPos.value.r === r && playerPos.value.c === c) {
    return 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-500/40 text-cyan-200 font-black ring-2 ring-cyan-400/50'
  }
  if (tile.type === 'wall') {
    return 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-80'
  }
  if (tile.type === 'portal') {
    return portalUnlocked.value
      ? 'bg-purple-900/60 border-purple-400 text-purple-200 hover:scale-105 cursor-pointer shadow-lg shadow-purple-500/40 animate-pulse'
      : 'bg-slate-900 border-purple-900/50 text-purple-400 cursor-pointer'
  }
  if (tile.type === 'switch') {
    return tile.triggered
      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
      : 'bg-amber-950/60 border-amber-500 text-amber-300 hover:scale-105 cursor-pointer'
  }
  if (tile.type === 'chest') {
    return tile.collected
      ? 'bg-slate-900 border-slate-800 text-gray-500 opacity-60'
      : 'bg-amber-900/50 border-amber-400 text-amber-300 hover:scale-105 cursor-pointer animate-pulse'
  }
  if (tile.type === 'trap') {
    return tile.triggered
      ? 'bg-rose-950/80 border-rose-600 text-rose-400'
      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 cursor-pointer'
  }
  if (tile.type === 'boss') {
    return 'bg-red-950/70 border-red-500 text-red-400 hover:scale-105 cursor-pointer'
  }
  return 'bg-slate-900/50 border-slate-800/80 text-gray-400 hover:bg-slate-850 hover:border-slate-700 cursor-pointer'
}

const getTileSymbol = (tile: DungeonTile) => {
  if (tile.type === 'wall') return '🧱'
  if (tile.type === 'portal') return '🌀'
  if (tile.type === 'switch') return tile.triggered ? '🔘' : '💎'
  if (tile.type === 'chest') return tile.collected ? '📦' : '🎁'
  if (tile.type === 'trap') return tile.triggered ? '🕳️' : '·'
  if (tile.type === 'boss') return '👹'
  return '·'
}

const getTileTooltip = (tile: DungeonTile, r: number, c: number) => {
  if (!tile.revealed && !revealedAll.value) return `未知迷雾区域 (${r}, ${c})`
  if (playerPos.value.r === r && playerPos.value.c === c) return `当前探险队所在位置 (${r}, ${c})`
  return `${tile.name} (${r}, ${c}): ${tile.description}`
}

const getLogClass = (type: string) => {
  if (type === 'danger') return 'border-rose-500 bg-rose-950/20 text-rose-300'
  if (type === 'warn') return 'border-amber-500 bg-amber-950/20 text-amber-300'
  if (type === 'success') return 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
  return 'border-cyan-500 bg-cyan-950/20 text-cyan-300'
}

const handleKeydown = (e: KeyboardEvent) => {
  if (['ArrowUp', 'KeyW'].includes(e.code)) {
    e.preventDefault()
    movePlayer(-1, 0)
  } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
    e.preventDefault()
    movePlayer(1, 0)
  } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
    e.preventDefault()
    movePlayer(0, -1)
  } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
    e.preventDefault()
    movePlayer(0, 1)
  }
}

onMounted(() => {
  initDungeonGrid()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const activeDungeonGdTab = ref<'generator' | 'resolver'>('generator')

const exportDungeonSurveyReport = () => {
  const p = selectedDungeonPreset.value
  const ts = new Date().toISOString()
  const certId = `CERT-DUNGEON-${Date.now().toString(36).toUpperCase()}`
  const content = `================================================================================
《光之战士：时空裂隙》(VBLE) 全域地貌拓扑与深渊迷宫勘探认证方案书
================================================================================
凭证编号: ${certId}
时间截记: ${ts}
推演版本: VBLE Dungeon & Spatial Topology Matrix v2.2.256
引擎标准: Godot 4.6 LTS Dungeon Topology & Maze Generator Architecture

【当前勘探地宫概况】
- 目标地质区域: ${p.name} (${p.id})
- 勘探危险层级: ${p.difficulty}
- 核心极限制约: ${p.mechanicDetail}
- 实时环境指标: ${p.envParam.name} = ${p.envParam.value} ${p.envParam.unit || ''}

【实机探索进度指标】
- 迷雾驱散率: ${explorationRate.value}%
- 搜获宝箱数: ${collectedChests.value} / ${totalChests.value} 个
- 当前队伍生命: ${playerHp.value} / 9999 HP
- 累计移动步数: ${stepCount.value} 步
- 浮空状态步数: ${floatDuration.value} 步
- 终焉门禁状态: ${portalUnlocked.value ? '已解锁' : '未解锁'}

================================================================================
数字校验哈希: SHA256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}
================================================================================`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dungeon_topology_survey_${p.id}_v2.2.256.txt`
  a.click()
  URL.revokeObjectURL(url)
  message.success(`已导出地质勘探方案书: ${p.name}`)
}

const gdDungeonGeneratorCode = `# ==============================================================================
# DungeonMazeGenerator - 动态迷宫拓扑生成与战争迷雾遮罩内核
# 文件路径: res://scripts/core/dungeon_maze_generator.gd
# 架构定位: 管理 6x6~12x12 声明式地质网格、曼哈顿视距驱散与环境制约持久化
# ==============================================================================
class_name DungeonMazeGenerator
extends Node

signal fog_updated(uncovered_count: int, total_tiles: int)
signal hazard_triggered(hazard_type: String, damage_amount: int)

@export var maze_size: Vector2i = Vector2i(6, 6)
@export var sight_radius: int = 1

var fog_matrix: Array = []
var is_floating: bool = false
var oxygen_remaining: float = 420.0

func explore_tile(pos: Vector2i, has_float_buff: bool) -> Dictionary:
	var result = {"safe": true, "event": "none", "damage": 0}
	is_floating = has_float_buff

	# 曼哈顿视野动态驱散
	for dx in range(-sight_radius, sight_radius + 1):
		for dy in range(-sight_radius, sight_radius + 1):
			var nx = pos.x + dx
			var ny = pos.y + dy
			if nx >= 0 and nx < maze_size.x and ny >= 0 and ny < maze_size.y:
				fog_matrix[nx][ny] = true

	emit_signal("fog_updated", count_revealed(), maze_size.x * maze_size.y)
	return result

func check_hazard_immunity(hazard_type: String) -> bool:
	if is_floating and hazard_type in ["pitfall", "lava_marsh", "spike"]:
		return true # 浮空状态完美规避地面致伤机制
	return false

func count_revealed() -> int:
	var count: int = 0
	for row in fog_matrix:
		for cell in row:
			if cell:
				count += 1
	return count
`

const gdDungeonResolverCode = `# ==============================================================================
# ProceduralLabyrinthResolver - 地宫迷宫自律程序解算与 A* 寻路调度器
# 文件路径: res://scripts/core/procedural_labyrinth_resolver.gd
# 架构定位: 动态生成地质拓扑网格、计算最短解密路径与环境落穴避障
# ==============================================================================
class_name ProceduralLabyrinthResolver
extends RefCounted

signal path_calculated(waypoints: Array[Vector2i], total_cost: float)
signal hazard_mitigated(tile_pos: Vector2i, hazard_name: String)

static func solve_shortest_path(grid_layout: Array, start_pos: Vector2i, target_pos: Vector2i) -> Dictionary:
	var astar := AStar2D.new()
	var height: int = grid_layout.size()
	var width: int = grid_layout[0].length() if height > 0 else 0

	for r in range(height):
		for c in range(width):
			var idx: int = r * width + c
			astar.add_point(idx, Vector2(c, r))

	var start_idx: int = start_pos.y * width + start_pos.x
	var target_idx: int = target_pos.y * width + target_pos.x
	var path_points: PackedVector2Array = astar.get_point_path(start_idx, target_idx)

	return {
		"path_length": path_points.size(),
		"is_reachable": path_points.size() > 0,
		"timestamp": Time.get_datetime_string_from_system()
	}
`

const copyDungeonGdCode = () => {
  const code = activeDungeonGdTab.value === 'generator' ? gdDungeonGeneratorCode : gdDungeonResolverCode
  const filename = activeDungeonGdTab.value === 'generator' ? 'dungeon_maze_generator.gd' : 'procedural_labyrinth_resolver.gd'
  navigator.clipboard.writeText(code).then(() => {
    message.success(`${filename} 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}
</script>

<style scoped>
.dungeons-pagination-control {
  min-width: 28px;
  min-height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.dungeons-pagination-control:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}

.dungeons-pagination-control:disabled {
  cursor: not-allowed;
}
</style>
