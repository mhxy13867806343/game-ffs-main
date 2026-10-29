<template>
  <div class="dungeons-view max-w-7xl mx-auto space-y-6 p-3 sm:p-6 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-blue-950/80 border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.2)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/30">
              VBLE Dungeon &amp; Spatial Topology Matrix v2.2.279
            </span>
            <span class="text-xs text-gray-400">全域空间解构、多元秘境迷宫机制与多维裂隙重力坍缩逃逸</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🏛️</span> 全域地貌拓扑与地宫导览：秘境机制、隐秘通道与多维裂隙坍缩工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            纵览苍穹、地表、深海、地狱冥界与终局虚无；收录全域 {{ dungeons.length }} 处地宫与探索地点。实装六大维度全域空间行进拓扑轴、实景走格子动态战争迷雾与多维裂隙重力坍缩逃逸推演沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToDimensionStudio"
          >
            <template #icon><span>🌀</span></template>
            前往裂隙坍缩工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToSecretPassageStudio"
          >
            <template #icon><span>🗝️</span></template>
            前往秘境机关解密
          </n-button>
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
              <button
                type="button"
                class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all"
                :class="activeDungeonGdTab === 'puzzle'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'"
                @click="activeDungeonGdTab = 'puzzle'"
              >
                dungeon_secret_puzzle_mechanisms.gd
              </button>
            </div>
            <div class="flex items-center gap-2">
              <n-tag size="tiny" type="success">支持 TileMapLayer 烘焙、A* 路径与暗道解密</n-tag>
              <n-button size="tiny" secondary round type="info" @click="copyDungeonGdCode">
                <template #icon><span>📋</span></template>
                复制代码
              </n-button>
            </div>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            游戏实机地宫完全遵循 <code>DungeonMazeGenerator</code> 与 <code>DungeonSecretPuzzleMechanisms</code> 声明式网格驱动。采用双层 TileMapLayer 分离地形与动态战争迷雾遮罩，通过曼哈顿距离 <code>_update_fog_of_war()</code> 实时更新着色器 Alpha 渐变，并在切图转场期间依托 <code>GameStateSave</code> 进行完整迷雾位图压缩持久化。
          </p>
          <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-56 custom-scrollbar">
            <pre><code v-if="activeDungeonGdTab === 'generator'">{{ gdDungeonGeneratorCode }}</code><code v-else-if="activeDungeonGdTab === 'resolver'">{{ gdDungeonResolverCode }}</code><code v-else>{{ gdDungeonPuzzleCode }}</code></pre>
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

    <!-- 🗝️ 专区: 全域秘境机关解密、隐秘通道与多维宝箱推演工坊 (Secret Passage & Dungeon Puzzle Mechanism Studio) -->
    <div id="secret-passage-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#180e28] via-[#1f1236] to-[#0f0d22] border border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.22)] space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-purple-950 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              ANCIENT SANCTUARY PUZZLE &amp; SECRET PASSAGE STUDIO
            </span>
            <span class="text-xs text-gray-400 font-mono">v2.2.267 官方实机矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <span>🗝️</span> 全域秘境机关解密、隐秘通道与多维宝箱推演工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            深入太古神殿机关核心！支持四大经典秘境（穆亚金字塔、封印城库扎、双子分歧之塔、次元狭缝回廊）拓扑排查，涵盖盗贼隐秘暗墙探查、风水士陷阱落穴轻足规避、四联动机关拉杆解密与真伪宝箱甄别系统。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetSecretPuzzleStudio">
            🔄 重置机关推演
          </n-button>
          <n-button
            size="small"
            :type="isSecretEyeActive ? 'success' : 'default'"
            secondary
            @click="toggleSecretEye"
          >
            👁️ 盗贼秘宝之眼: {{ isSecretEyeActive ? '已开启' : '已关闭' }}
          </n-button>
          <n-button
            size="small"
            :type="isLightStepActive ? 'info' : 'default'"
            secondary
            @click="toggleLightStep"
          >
            🪶 风水士轻足术: {{ isLightStepActive ? '已激活' : '未激活' }}
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportSecretPuzzleCertificate">
            📜 导出秘境解密方案书
          </n-button>
        </div>
      </div>

      <!-- 三栏主推演工作台 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 四大太古秘境与探险队拓扑 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <span>🏛️</span>
                <span>太古秘境拓扑选定</span>
              </span>
              <n-tag size="tiny" type="warning">{{ currentSanctuary.dangerLevel }}</n-tag>
            </div>

            <!-- 秘境选择器 -->
            <div class="space-y-1.5">
              <label class="text-[11px] text-gray-400 block">选择探索秘境 (Ancient Sanctuary):</label>
              <select
                v-model="selectedSanctuaryId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-purple-300 font-bold rounded-lg p-2 focus:border-purple-400 focus:outline-none"
                @change="onSanctuaryChanged"
              >
                <option v-for="s in sanctuaryList" :key="s.id" :value="s.id">
                  {{ s.name }} (难度: {{ s.tier }})
                </option>
              </select>
            </div>

            <!-- 秘境详述卡片 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-purple-500/30 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white flex items-center gap-1.5 text-sm">
                  <span>{{ currentSanctuary.icon }}</span>
                  <span>{{ currentSanctuary.name }}</span>
                </span>
                <span class="text-[10px] text-purple-400 font-mono font-bold">{{ currentSanctuary.tier }}</span>
              </div>
              <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentSanctuary.description }}</p>
              <div class="p-2 rounded bg-purple-950/40 border border-purple-900/50 text-[11px] space-y-1">
                <div class="text-amber-300 font-bold flex items-center gap-1">
                  <span>⚡ 核心机关:</span>
                  <span>{{ currentSanctuary.gimmick }}</span>
                </div>
                <div class="text-cyan-300 text-[10px]">🗝️ 破解线索: {{ currentSanctuary.clue }}</div>
              </div>
            </div>

            <!-- 队伍探查配置 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
              <div class="text-gray-400 font-bold text-[11px] mb-1">探险先锋阵容特质感知：</div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">🗡️ 巴兹 (骑士):</span>
                <span class="font-mono text-cyan-400">重盾破击 / 机关顶防</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">👑 蕾娜 (白魔):</span>
                <span class="font-mono text-purple-300">浮空术 (Float) 规避地刺</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">🏴‍☠️ 法利斯 (盗贼):</span>
                <span class="font-mono text-amber-300">隐秘通道洞察 (Passage Vision)</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">🔮 可露儿 (风水士):</span>
                <span class="font-mono text-emerald-400">轻足陷阱免除 (Light Step)</span>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
            <span>空间拓扑架构:</span>
            <span class="font-mono font-bold text-purple-400">Godot 4.6 TileMapLayer 多层图元</span>
          </div>
        </div>

        <!-- 栏 2: 四联动机关拉杆与隐秘通道解密 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>🕹️</span>
              <span>太古拉杆联锁解密</span>
            </span>
            <n-tag size="tiny" :type="isGateUnlocked ? 'success' : 'error'">
              {{ isGateUnlocked ? '🔓 封印大门已开启' : '🔒 封印大门紧锁' }}
            </n-tag>
          </div>

          <!-- 四联动机关拉杆控制排 -->
          <div class="space-y-2">
            <span class="text-[11px] text-gray-400 block">四联动机关拉杆交互控制 (目标序列: [上, 下, 上, 上]):</span>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="(lever, idx) in levers"
                :key="idx"
                type="button"
                class="p-3 rounded-lg border text-center transition-all cursor-pointer font-mono"
                :class="lever ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md' : 'bg-slate-950 border-slate-800 text-gray-500 hover:text-gray-300'"
                @click="toggleLever(idx)"
              >
                <div class="text-lg">{{ lever ? '⬆️' : '⬇️' }}</div>
                <div class="text-xs font-bold mt-1">拉杆 #{{ idx + 1 }}</div>
                <div class="text-[10px] mt-0.5">{{ lever ? '【拉起】' : '【推下】' }}</div>
              </button>
            </div>
          </div>

          <!-- 隐秘通道探索板 -->
          <div class="p-3 bg-slate-950 rounded-lg border border-purple-500/30 space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="font-bold text-white flex items-center gap-1.5">
                <span>🚪</span>
                <span>暗墙隐秘通道探知</span>
              </span>
              <n-tag size="tiny" :type="secretPassageFound ? 'success' : 'default'">
                {{ secretPassageFound ? '✨ 暗道已定位' : '🧱 未探明暗壁' }}
              </n-tag>
            </div>
            <p class="text-[11px] text-gray-300 leading-relaxed">
              {{ secretPassageFound ? '已成功探出隐藏通道！暗墙向内滑移，露出直通太古宝库的密闭走廊！' : '前方石壁呈现不规则纹理，开启【盗贼秘宝之眼】可穿透视线显化隐藏石门。' }}
            </p>
            <div class="pt-1">
              <button
                type="button"
                class="w-full py-2 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition cursor-pointer"
                @click="inspectSecretPassage"
              >
                🔍 敲击排查暗壁接缝 (Inspect Wall)
              </button>
            </div>
          </div>

          <!-- 陷阱规避状态指示器 -->
          <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-gray-400">地面落穴落石抗性:</span>
              <span class="font-mono font-bold" :class="isLightStepActive ? 'text-emerald-400' : 'text-rose-400'">
                {{ isLightStepActive ? '100% 绝对免疫 (轻足术已生效)' : '0% 极易踩空致残' }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-400">暗墙隐藏通道感知率:</span>
              <span class="font-mono font-bold" :class="isSecretEyeActive ? 'text-amber-300' : 'text-gray-500'">
                {{ isSecretEyeActive ? '100% 全息高亮显化' : '20% 仅凭盲碰概率' }}
              </span>
            </div>
          </div>
        </div>

        <!-- 栏 3: 宝箱甄别与解密推演日志 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-purple-950/20 to-slate-900 border border-purple-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <span>🎁</span>
                <span>太古秘宝开箱甄别</span>
              </span>
              <n-tag size="tiny" :type="chestOpened ? 'success' : 'info'">
                {{ chestOpened ? '🏆 已开启' : '📦 待启封' }}
              </n-tag>
            </div>

            <!-- 宝箱卡片 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div class="flex justify-between items-center">
                <span class="font-bold text-white text-sm flex items-center gap-1">
                  <span>{{ chestRewardIcon }}</span>
                  <span>{{ currentSanctuary.chestName }}</span>
                </span>
                <span class="text-[10px] text-amber-300 font-mono font-bold">安全性 {{ chestPurityPercent }}%</span>
              </div>
              <div class="flex justify-between text-[11px] text-gray-400">
                <span>宝箱怪伪装率:</span>
                <span class="font-mono" :class="chestPurityPercent < 80 ? 'text-rose-400 font-bold' : 'text-emerald-400'">
                  {{ 100 - chestPurityPercent }}% ({{ chestPurityPercent >= 90 ? '安全无害' : '疑似封印狂暴怪' }})
                </span>
              </div>
              <div class="text-[10px] text-gray-400">
                {{ chestOpenResultText }}
              </div>
              <button
                type="button"
                class="w-full py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer"
                :disabled="chestOpened"
                @click="openChest"
              >
                {{ chestOpened ? '✓ 宝物已收入背包' : '🗝️ 破除封印开启宝箱' }}
              </button>
            </div>

            <!-- 实时推演日志流 -->
            <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[10px] space-y-1 max-h-24 overflow-y-auto font-mono text-gray-300">
              <div v-for="(log, idx) in puzzleLogs" :key="idx" class="flex items-start gap-1">
                <span class="text-purple-400 shrink-0">•</span>
                <span>{{ log }}</span>
              </div>
            </div>
          </div>

          <!-- 解密大捷按钮 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 via-amber-600 to-purple-600 hover:from-purple-500 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg cursor-pointer"
              @click="autoSolveAllPuzzles"
            >
              ⚡ 一键推演全域机关破解流程 (Auto Solve)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 工坊 3: 全域多维深渊裂隙迷宫地牢拓扑推演与重力坍缩逃逸工坊 -->
    <div
      id="dimension-rift-studio"
      class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/70 border border-indigo-500/30 shadow-[0_0_35px_rgba(99,102,241,0.2)] space-y-6 relative overflow-hidden"
    >
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 头部标章与导出 -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              v2.2.279 重磅实装
            </span>
            <span class="text-xs text-gray-400">非欧几里得高维流形 · 奇点重力潮汐剪切 · 测地线量子逃逸</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🌀</span> 全域多维深渊裂隙迷宫地牢拓扑推演与重力坍缩逃逸工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            针对莫比乌斯流形、非欧几里得超立方结界、奇点视界重力陷阱与螺旋晶体迷阵进行高维拓扑测地线推演与逃逸解算。
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingDimension"
            @click="runDimensionSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动拓扑测地线逃逸推演
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportDimensionRiftCertificate"
          >
            <template #icon><span>📜</span></template>
            导出拓扑逃逸方案书
          </n-button>
        </div>
      </div>

      <!-- 四相高维裂隙拓扑形态 (4 Topologies) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        <div
          v-for="topo in dimensionTopologies"
          :key="topo.id"
          class="p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
          :class="selectedTopologyId === topo.id
            ? 'bg-indigo-950/40 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="selectedTopologyId = topo.id"
        >
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xl">{{ topo.icon }}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded font-mono" :class="selectedTopologyId === topo.id ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-gray-400'">
                {{ topo.tag }}
              </span>
            </div>
            <div class="font-bold text-xs text-gray-200">{{ topo.name }}</div>
            <div class="text-[10px] text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">{{ topo.desc }}</div>
          </div>
          <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
            <span class="text-gray-400">流形自洽度:</span>
            <span class="font-mono font-bold text-indigo-300">{{ topo.safeFactor }}</span>
          </div>
        </div>
      </div>

      <!-- 核心工作台：双栏交互面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        <!-- 左侧：全息测地线视窗与指标卡片 -->
        <div class="lg:col-span-7 space-y-4">
          <!-- 全息迷宫拓扑雷达视窗 -->
          <div class="relative h-64 sm:h-72 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
              <div
                class="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                :style="{
                  background: currentTopology.gradient,
                  opacity: (calculatedEscapeProbability / 100 * 0.75 + 0.15).toFixed(2),
                  transform: `scale(${1 + shearCurvature / 200})`
                }"
              ></div>
              <svg class="w-64 h-64 opacity-50 animate-[spin_60s_linear_infinite]" viewBox="0 0 200 200">
                <polygon points="100,15 180,55 180,145 100,185 20,145 20,55" fill="none" stroke="rgba(99,102,241,0.5)" stroke-width="1.5" stroke-dasharray="3 3" />
                <polygon points="100,40 155,70 155,130 100,160 45,130 45,70" fill="none" stroke="rgba(168,85,247,0.4)" stroke-width="1.2" />
                <circle cx="100" cy="100" r="28" fill="none" stroke="rgba(56,189,248,0.6)" stroke-width="1" stroke-dasharray="2 2" />
                <line x1="100" y1="15" x2="100" y2="185" stroke="rgba(99,102,241,0.3)" stroke-width="1" />
                <line x1="20" y1="55" x2="180" y2="145" stroke="rgba(99,102,241,0.3)" stroke-width="1" />
                <line x1="20" y1="145" x2="180" y2="55" stroke="rgba(99,102,241,0.3)" stroke-width="1" />
                <circle cx="100" cy="100" r="5" fill="rgba(99,102,241,0.9)" />
              </svg>
            </div>

            <!-- 顶部状态指示灯 -->
            <div class="relative z-10 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="font-mono text-indigo-300 font-bold">MANIFOLD GEODESIC ACTIVE</span>
                <span class="text-gray-400 font-mono text-[10px]">| 深度 {{ riftDepth }}F</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-amber-300">
                引力梯度: {{ gravityGradient }} G
              </div>
            </div>

            <!-- 中间标语 -->
            <div class="relative z-10 text-center my-auto">
              <div class="text-2xl font-black text-white/95 tracking-wider font-mono drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
                {{ currentTopology.name }}
              </div>
              <div class="text-xs text-indigo-200/80 mt-1 font-mono">
                逃逸概率: {{ calculatedEscapeProbability }}% · 畸变应力: {{ calculatedDistortionStress }} MPa
              </div>
            </div>

            <!-- 底部性能与管线参数微视窗 -->
            <div class="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-gray-400">
              <span>坍缩剩余时限: {{ calculatedSurvivalTime }} 秒</span>
              <span :class="calculatedEscapeProbability >= 50 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'">
                通道状态: {{ calculatedEscapeProbability >= 50 ? '稳定可通行' : '严重闭合坍缩' }}
              </span>
            </div>
          </div>

          <!-- 4 维物理与战斗指标卡片 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">陷阱瞬时撕裂伤害</div>
              <div class="font-mono text-rose-400 font-bold text-sm mt-0.5">{{ calculatedTrapDamage.toLocaleString() }}</div>
              <div class="text-[9px] text-gray-500 mt-0.5">{{ negativeEnergyShield ? '负能盾削减 50%' : '未受护盾防护' }}</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">奇点逃逸综合率</div>
              <div class="font-mono text-emerald-400 font-bold text-sm mt-0.5">{{ calculatedEscapeProbability }}%</div>
              <div class="text-[9px] text-gray-500 mt-0.5">量子态干涉补偿</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">空间畸变张量</div>
              <div class="font-mono text-indigo-400 font-bold text-sm mt-0.5">{{ calculatedDistortionStress }} MPa</div>
              <div class="text-[9px] text-gray-500 mt-0.5">测地线剪切度规</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">视界生存时限</div>
              <div class="font-mono text-amber-400 font-bold text-sm mt-0.5">{{ calculatedSurvivalTime }}s</div>
              <div class="text-[9px] text-gray-500 mt-0.5">{{ chronoRewindLoop ? '时空回溯回路激活' : '常规线性时流' }}</div>
            </div>
          </div>

          <!-- 实时推演日志终端 -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
            <div class="flex items-center justify-between text-xs text-gray-400 pb-1.5 border-b border-slate-800">
              <span class="flex items-center gap-1.5 text-indigo-300 font-bold">
                <span>💻</span> 裂隙拓扑推演与逃逸日志 (Geodesic Terminal)
              </span>
              <span class="text-[10px] text-gray-500">度规张量: 实时同步</span>
            </div>
            <div class="space-y-1 text-[11px] text-gray-300 max-h-28 overflow-y-auto custom-scrollbar">
              <div v-for="(log, idx) in dimensionSimLogs" :key="idx" class="flex items-start gap-1.5">
                <span class="text-indigo-400 select-none">&gt;</span>
                <span :class="log.includes('完成') || log.includes('成功') || log.includes('稳定') ? 'text-emerald-400' : 'text-gray-300'">{{ log }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：高维物理参数与量子偏转防壁控制 -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div class="text-xs font-bold text-indigo-300 flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="flex items-center gap-1.5">
              <span>🎛️</span> 裂隙拓扑物理调优 (Manifold Uniforms)
            </span>
            <button
              type="button"
              class="text-[10px] text-gray-400 hover:text-indigo-300 cursor-pointer"
              @click="resetDimensionParams"
            >
              重置参数
            </button>
          </div>

          <!-- 裂隙探索深度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>裂隙探索深度 (Rift Depth):</span>
              <span class="font-mono text-indigo-400 font-bold">{{ riftDepth }} 层</span>
            </div>
            <n-slider v-model:value="riftDepth" :min="1" :max="100" :step="1" />
            <div class="flex justify-between text-[9px] text-gray-500">
              <span>1F 浅层裂隙</span>
              <span>50F 虚空过渡带</span>
              <span>100F 终焉奇点</span>
            </div>
          </div>

          <!-- 重力异常梯度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>重力异常梯度 (Gravity Gradient):</span>
              <span class="font-mono text-amber-400 font-bold">{{ gravityGradient }} G</span>
            </div>
            <n-slider v-model:value="gravityGradient" :min="0.1" :max="5.0" :step="0.1" />
          </div>

          <!-- 空间剪切曲率 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>空间剪切曲率 (Shear Curvature):</span>
              <span class="font-mono text-cyan-400 font-bold">{{ shearCurvature }} %</span>
            </div>
            <n-slider v-model:value="shearCurvature" :min="10" :max="100" :step="1" />
          </div>

          <!-- 逃生路径熵值 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>逃生路径熵值 (Escape Entropy):</span>
              <span class="font-mono text-purple-400 font-bold">{{ escapeEntropy }}</span>
            </div>
            <n-slider v-model:value="escapeEntropy" :min="1.0" :max="10.0" :step="0.1" />
          </div>

          <!-- 3 项量子防壁与时空回溯开关 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 flex items-center gap-1.5">
                <span>🚪</span> 量子叠加回响门 (Superposition Door)
              </span>
              <n-switch v-model:value="quantumSuperposition" size="small" />
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 flex items-center gap-1.5">
                <span>🛡️</span> 负能量坍缩偏转盾 (-50% 潮汐伤害)
              </span>
              <n-switch v-model:value="negativeEnergyShield" size="small" />
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 flex items-center gap-1.5">
                <span>⏳</span> 局域时空回溯回路 (+45s 生存时限)
              </span>
              <n-switch v-model:value="chronoRewindLoop" size="small" />
            </div>
          </div>
        </div>
      </div>

      <!-- 下方：Godot 4.6 LTS 底层高维拓扑与坍缩逃逸脚本契约矩阵 -->
      <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 relative z-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-indigo-300 font-mono">GODOT 4.6 LTS ARCHITECTURE SPEC</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">纯粹 RefCounted 离线解算</span>
            </div>
            <div class="text-xs text-gray-400 mt-0.5">高维拓扑测地线求解、重力潮汐剪切状态机与非欧空间曲率着色器</div>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs font-mono">
              <button
                type="button"
                class="px-2.5 py-1 rounded transition cursor-pointer"
                :class="activeDimensionCodeTab === 'resolver' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                @click="activeDimensionCodeTab = 'resolver'"
              >
                topology_resolver.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded transition cursor-pointer"
                :class="activeDimensionCodeTab === 'engine' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                @click="activeDimensionCodeTab = 'engine'"
              >
                spatial_collapse_engine.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded transition cursor-pointer"
                :class="activeDimensionCodeTab === 'shader' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                @click="activeDimensionCodeTab = 'shader'"
              >
                spatial_warp.gdshader
              </button>
            </div>
            <n-button
              size="small"
              type="info"
              secondary
              round
              @click="copyDimensionCode"
            >
              复制源码
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentDimensionCode }}</code></pre>
        </div>
      </div>
    </div>
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

const scrollToSecretPassageStudio = () => {
  const el = document.getElementById('secret-passage-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToDimensionStudio = () => {
  const el = document.getElementById('dimension-rift-studio')
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

const activeDungeonGdTab = ref<'generator' | 'resolver' | 'puzzle'>('puzzle')

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
  const code = activeDungeonGdTab.value === 'generator' 
    ? gdDungeonGeneratorCode 
    : activeDungeonGdTab.value === 'resolver' 
      ? gdDungeonResolverCode 
      : gdDungeonPuzzleCode
  const filename = activeDungeonGdTab.value === 'generator' 
    ? 'dungeon_maze_generator.gd' 
    : activeDungeonGdTab.value === 'resolver' 
      ? 'procedural_labyrinth_resolver.gd' 
      : 'dungeon_secret_puzzle_mechanisms.gd'
  navigator.clipboard.writeText(code).then(() => {
    message.success(`${filename} 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}

// ================= 专区: 全域秘境机关解密、隐秘通道与多维宝箱推演工坊 (v2.2.267) =================
interface SanctuaryItem {
  id: string
  name: string
  icon: string
  tier: string
  dangerLevel: string
  description: string
  gimmick: string
  clue: string
  chestName: string
  safeLeverSequence: boolean[]
}

const sanctuaryList: SanctuaryItem[] = [
  {
    id: 'pyramid_moore',
    name: '穆亚大金字塔 (Pyramid of Moore)',
    icon: '🔺',
    tier: '太古神殿 (EX)',
    dangerLevel: '极度危险',
    description: '隐藏于穆亚大森林深处的太古石板金字塔，机关重重，遍布穿墙暗道、流沙与毒蛇落穴。',
    gimmick: '隐形悬空石板桥 + 阿斯皮尔吸魔石像 + 毒蛇穿刺陷阱',
    clue: '拉起拉杆 #1 与 #3，推下拉杆 #2，最后拉起 #4，即可使隐形桥石化显形',
    chestName: '太古第一石板之匣 (Cursed Tablet Box)',
    safeLeverSequence: [true, false, true, true]
  },
  {
    id: 'kuza_sealed',
    name: '封印之城库扎 (Sealed Castle Kuza)',
    icon: '🏰',
    tier: '神兵祭坛 (SSS)',
    dangerLevel: '超维禁地',
    description: '十二太古封印神兵的供奉圣殿，由古代石化盾龙守卫，地下三层拥有绝对反重力深井。',
    gimmick: '盾龙石化反击 + 十二神兵封印锁柱 + 反物质吸光井',
    clue: '四拉杆必须依照【偶数推下，奇数拉起】解除神兵石化力场',
    chestName: '太古十二神兵封印石 (Ancient Sealed Stone)',
    safeLeverSequence: [true, false, true, false]
  },
  {
    id: 'fork_tower',
    name: '双子分歧之塔 (Fork Tower)',
    icon: '🗼',
    tier: '魔武双极 (EX+)',
    dangerLevel: '法则惩戒',
    description: '撕裂空间的魔导之塔。左侧力量之塔禁止一切魔法，右侧魔法之塔禁止一切物理平砍。',
    gimmick: '法则禁制结界 + 违者即死神圣反噬 + 双核同步破封',
    clue: '全员分队进入后，四拉杆必须全部推向【上方位】以平衡魔武力场',
    chestName: '究极白魔法【神圣】与究极黑魔法【核爆】宝匣',
    safeLeverSequence: [true, true, true, true]
  },
  {
    id: 'void_rift',
    name: '次元狭缝深渊回廊 (Void Rift Corridor)',
    icon: '🌌',
    tier: '终焉深渊 (MAX)',
    dangerLevel: '秒杀级灾厄',
    description: '时空裂隙深处的错位迷宫，空间连续性断裂，逆向传送门与伪装的神龙宝箱交错并存。',
    gimmick: '逆向维度法阵 + 水晶隐形暗道 + 隐藏神龙开盖大海啸',
    clue: '盗贼秘宝之眼可透视假箱裂隙，拉杆序列按【下、上、下、上】解除传送死循环',
    chestName: '真·诸神黄昏神剑宝箱 (神龙守护)',
    safeLeverSequence: [false, true, false, true]
  }
]

const selectedSanctuaryId = ref('pyramid_moore')
const currentSanctuary = computed(() => {
  return sanctuaryList.find(s => s.id === selectedSanctuaryId.value) || sanctuaryList[0]
})

const isSecretEyeActive = ref(true)
const isLightStepActive = ref(true)
const levers = ref<boolean[]>([true, false, true, true])
const secretPassageFound = ref(true)
const chestOpened = ref(false)
const chestPurityPercent = ref(95)
const chestRewardIcon = ref('💎')
const chestOpenResultText = ref('未开启：经盗贼透视排查，箱内散发纯正太古以太辉光，非宝箱怪伪装。')

const isGateUnlocked = computed(() => {
  const target = currentSanctuary.value.safeLeverSequence
  return levers.value.every((val, idx) => val === target[idx])
})

const puzzleLogs = ref<string[]>([
  '【T+0.0s】进入穆亚大金字塔：全员处于【盗贼秘宝之眼】与【风水士轻足术】防护态。',
  '【T+0.8s】暗壁缝隙排查：发现金字塔二层右侧隐秘暗道，成功绕开毒蛇落穴陷阱！',
  '【T+1.5s】拉杆机关就绪：四联动机关已对齐 [上, 下, 上, 上]，封印石门轰然开启！'
])

const onSanctuaryChanged = () => {
  const s = currentSanctuary.value
  levers.value = [...s.safeLeverSequence]
  secretPassageFound.value = isSecretEyeActive.value
  chestOpened.value = false
  chestPurityPercent.value = s.id === 'void_rift' ? 65 : 95
  chestOpenResultText.value = `切换至【${s.name}】：已加载太古拓扑数据与机关位点。`
  puzzleLogs.value.unshift(`[秘境切换] 队伍进入【${s.name}】(${s.tier})，核心机制: ${s.gimmick}`)
  message.info(`已切换至【${s.name}】！`)
}

const toggleLever = (index: number) => {
  levers.value[index] = !levers.value[index]
  const stateStr = levers.value[index] ? '拉起' : '推下'
  puzzleLogs.value.unshift(`[拉杆操作] 探险者将拉杆 #${index + 1} 拨动为【${stateStr}】。`)
  if (isGateUnlocked.value) {
    puzzleLogs.value.unshift('【🔓 机关解锁】四联动机关完全吻合太古律令！封印大门轰鸣滑开！')
    message.success('🎉 封印大门已成功解锁！')
  }
}

const toggleSecretEye = () => {
  isSecretEyeActive.value = !isSecretEyeActive.value
  if (isSecretEyeActive.value) {
    secretPassageFound.value = true
    puzzleLogs.value.unshift('[盗贼特质] 秘宝之眼激活：全域隐秘暗道与假墙轮廓高亮显化！')
    message.success('已开启盗贼秘宝之眼！隐秘暗道全息显形！')
  } else {
    puzzleLogs.value.unshift('[盗贼特质] 秘宝之眼关闭：暗壁视觉反馈恢复常规石质纹理。')
    message.info('已关闭盗贼秘宝之眼。')
  }
}

const toggleLightStep = () => {
  isLightStepActive.value = !isLightStepActive.value
  if (isLightStepActive.value) {
    puzzleLogs.value.unshift('[风水特质] 轻足术激活：地面落穴、熔岩地热与毒液池判定完全免疫！')
    message.success('已激活风水士轻足术！地面陷阱绝对免疫！')
  } else {
    puzzleLogs.value.unshift('[风水特质] 轻足术停用：请小心地面落穴与尖刺陷阱。')
    message.warning('轻足术已停用。')
  }
}

const inspectSecretPassage = () => {
  if (isSecretEyeActive.value || Math.random() > 0.3) {
    secretPassageFound.value = true
    puzzleLogs.value.unshift('[暗道排查] 成功！法利斯敲击石壁第三块暗砖，隐秘石门向内滑移，露出太古藏宝密道！')
    message.success('成功探出隐藏通道！通往太古密室！')
  } else {
    puzzleLogs.value.unshift('[暗道排查] 敲击声沉闷，未发现活动门轴，建议开启【盗贼秘宝之眼】。')
    message.warning('排查未发现松动暗砖，请开启盗贼特质！')
  }
}

const openChest = () => {
  chestOpened.value = true
  const s = currentSanctuary.value
  if (s.id === 'void_rift') {
    chestRewardIcon.value = '⚔️'
    chestOpenResultText.value = '恭喜！成功以盗贼隐秘解除神龙宝箱水属性逆潮陷阱，斩获【真·诸神黄昏神剑】！'
    puzzleLogs.value.unshift('[太古开箱] 获得【真·诸神黄昏神剑】！全队攻击力 +150，全属性抗性强化！')
  } else if (s.id === 'fork_tower') {
    chestRewardIcon.value = '📜'
    chestOpenResultText.value = '大获全胜！魔武双极平衡打破，斩获究极白魔法【神圣】与究极黑魔法【核爆】！'
    puzzleLogs.value.unshift('[太古开箱] 获得究极双魔法！蕾娜与可露儿获得太古奥义继承！')
  } else {
    chestRewardIcon.value = '💎'
    chestOpenResultText.value = `顺利开启！获得【${s.chestName}】，太古封印被彻底瓦解！`
    puzzleLogs.value.unshift(`[太古开箱] 获得【${s.chestName}】！`)
  }
  message.success('太古宝箱开启大成功！')
}

const autoSolveAllPuzzles = () => {
  const s = currentSanctuary.value
  isSecretEyeActive.value = true
  isLightStepActive.value = true
  secretPassageFound.value = true
  levers.value = [...s.safeLeverSequence]
  chestOpened.value = true
  chestOpenResultText.value = `全套机关一键解密推演完成：封印大门开启，隐秘通道探明，【${s.chestName}】顺利收入行囊！`
  puzzleLogs.value.unshift(`[智能解密] 已一键破解【${s.name}】全域机制！`)
  message.success('全域太古秘境机制一键推演完成！')
}

const resetSecretPuzzleStudio = () => {
  const s = currentSanctuary.value
  levers.value = [false, false, false, false]
  secretPassageFound.value = false
  chestOpened.value = false
  isSecretEyeActive.value = true
  isLightStepActive.value = true
  chestOpenResultText.value = `【${s.name}】推演战局已彻底重置为初始待破状态。`
  puzzleLogs.value = [
    `太古秘境【${s.name}】机关推演台已重置，拉杆与石门处于锁闭初始态。`,
    '全员检查盗贼感知与风水轻足术，准备重新推演。'
  ]
  message.info('太古秘境机关推演已重置！')
}

const exportSecretPuzzleCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  const s = currentSanctuary.value

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   全域秘境机关解密、隐秘通道与多维宝箱方案书 (v2.2.267)
================================================================================
颁发时间: ${timeStr}
探索靶标: ${s.name} (${s.tier})
危险等级: ${s.dangerLevel}
核心机制: ${s.gimmick}
破解线索: ${s.clue}

【机关解密与暗道状态】
- 四联动机关拉杆状态: [${levers.value.map((v, i) => `#${i + 1}:${v ? '拉起' : '推下'}`).join(', ')}]
- 封印石门判定: [${isGateUnlocked.value ? '已完全开启 (UNLOCKED)' : '锁闭中 (LOCKED)'}]
- 隐秘暗壁通道: [${secretPassageFound.value ? '已探明贯通 (DISCOVERED)' : '未探明 (CONCEALED)'}]
- 盗贼秘宝之眼: [${isSecretEyeActive.value ? 'ACTIVE (100% 透视)' : 'INACTIVE'}]
- 风水士轻足术: [${isLightStepActive.value ? 'ACTIVE (100% 陷阱免疫)' : 'INACTIVE'}]

【宝箱甄别与战利品】
- 目标宝箱: ${s.chestName}
- 开箱状态: [${chestOpened.value ? '已启封收获' : '未开启'}]
- 启封结果: ${chestOpenResultText.value}

【最新解密演练日志】
${puzzleLogs.value.slice(0, 5).map(l => `• ${l}`).join('\n')}

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS / TileMapLayer & Spatial Logic RefCounted
- Core Puzzle Resolver: dungeon_secret_puzzle_mechanisms.gd
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
    a.download = `dungeon_puzzle_cert_v2.2.267_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('全域秘境机关解密方案书已导出并同步至剪贴板！')
  }
}

const gdDungeonPuzzleCode = `## dungeon_secret_puzzle_mechanisms.gd
## Godot 4.6 LTS - 全域太古秘境机关拉杆、隐秘暗墙通道与宝箱怪判定状态机
extends RefCounted
class_name DungeonSecretPuzzleMechanisms

signal secret_passage_revealed(passage_id: String, world_pos: Vector2i)
signal interlocking_gate_unlocked(gate_id: String)
signal chest_evaluated(is_mimic: bool, reward_item: String)

class LeverPuzzleState:
	var target_sequence: Array[bool] = [true, false, true, true]
	var current_sequence: Array[bool] = [false, false, false, false]
	var is_unlocked: bool = false

static func evaluate_levers(state: LeverPuzzleState, lever_idx: int) -> bool:
	if lever_idx >= 0 and lever_idx < state.current_sequence.size():
		state.current_sequence[lever_idx] = not state.current_sequence[lever_idx]
		
	var all_match: bool = true
	for i in range(state.target_sequence.size()):
		if state.current_sequence[i] != state.target_sequence[i]:
			all_match = false
			break
			
	state.is_unlocked = all_match
	return all_match

static func check_secret_wall(has_thief_vision: bool, wall_coords: Vector2i) -> Dictionary:
	return {
		"visible": has_thief_vision,
		"coords": wall_coords,
		"collision_layer": 0 if has_thief_vision else 1
	}

static func inspect_chest_mimic(chest_tier: String, luck_stat: int) -> bool:
	if chest_tier == "void_shinryu":
		return false # 纯正真宝箱，但开箱需防范大海啸
	var mimic_chance: float = 0.25 - float(luck_stat) * 0.005
	return randf() < maxf(0.05, mimic_chance)
`

// ==========================================
// 工坊 3: 全域多维裂隙迷宫地牢拓扑推演与重力坍缩逃逸工坊
// ==========================================
const dimensionTopologies = [
  {
    id: 'mobius',
    name: '莫比乌斯流形裂隙',
    tag: '单侧闭环 g=1',
    icon: '♾️',
    desc: '单侧表面无尽回廊，法线向量翻转 180°，穿过折叠面即可重置迷宫陷阱标记。',
    safeFactor: '94% 空间自洽',
    gradient: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'non_euclidean',
    name: '非欧超立方结界',
    tag: '负常数曲率 K<0',
    icon: '🧊',
    desc: '四维超正方体双曲极射投影，向前走 4 步回到起点，利用视差折叠瞬移穿透死胡同暗墙。',
    safeFactor: '88% 空间自洽',
    gradient: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'singularity',
    name: '奇点视界重力陷阱',
    tag: '施瓦西引力视界',
    icon: '🕳️',
    desc: '核心引力潮汐呈平方反比剧烈发散，时钟膨胀减速，必须在视界完全闭合前逃离。',
    safeFactor: '72% 空间自洽',
    gradient: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'crystal_spire',
    name: '水晶高塔螺旋迷阵',
    tag: '六方全反射光栅',
    icon: '🔮',
    desc: '空间连续经历六方晶系全反射，多重折射虚像干扰，需调谐光栅谐振频率解密。',
    safeFactor: '91% 空间自洽',
    gradient: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(15,23,42,0) 70%)'
  }
]
const selectedTopologyId = ref('mobius')
const currentTopology = computed(() => {
  return dimensionTopologies.find(t => t.id === selectedTopologyId.value) || dimensionTopologies[0]
})

const riftDepth = ref(45)
const gravityGradient = ref(2.5)
const shearCurvature = ref(65)
const escapeEntropy = ref(4.2)
const quantumSuperposition = ref(true)
const negativeEnergyShield = ref(true)
const chronoRewindLoop = ref(false)

const calculatedTrapDamage = computed(() => {
  const shieldFactor = negativeEnergyShield.value ? 0.5 : 1.0
  return Math.round(riftDepth.value * 190 * (gravityGradient.value / 2.0) * (shearCurvature.value / 50) * shieldFactor)
})

const calculatedEscapeProbability = computed(() => {
  let prob = 100 - (riftDepth.value * 0.55) - (gravityGradient.value * 8.5) - (escapeEntropy.value * 3.2)
  if (quantumSuperposition.value) prob += 24
  if (negativeEnergyShield.value) prob += 8
  return Math.max(5, Math.min(98, Math.round(prob * 10) / 10))
})

const calculatedDistortionStress = computed(() => {
  return (gravityGradient.value * (shearCurvature.value / 100) * 44).toFixed(1)
})

const calculatedSurvivalTime = computed(() => {
  const base = 180 / (gravityGradient.value * 0.75 + (shearCurvature.value / 100) * 2.0)
  const bonus = chronoRewindLoop.value ? 45 : 0
  return Math.max(12, Math.round(base + bonus))
})

const resetDimensionParams = () => {
  riftDepth.value = 45
  gravityGradient.value = 2.5
  shearCurvature.value = 65
  escapeEntropy.value = 4.2
  quantumSuperposition.value = true
  negativeEnergyShield.value = true
  chronoRewindLoop.value = false
  if (message) message.info('高维裂隙拓扑物理参数已重置为基准度规')
}

const isSimulatingDimension = ref(false)
const dimensionSimLogs = ref<string[]>([
  '系统就绪：已挂载 Godot 4.6 LTS 非欧几里得拓扑流形度规张量',
  '当前流形：莫比乌斯流形裂隙 (g=1)，空间闭环自洽',
  '测地线推演就绪，请点击右上角按钮启动实时解算'
])

const runDimensionSimulation = () => {
  if (isSimulatingDimension.value) return
  isSimulatingDimension.value = true
  dimensionSimLogs.value = ['[0.00s] 开始探测当前深度 ' + riftDepth.value + 'F 空间流形曲率张量...']

  setTimeout(() => {
    dimensionSimLogs.value.unshift(`[0.42s] 注入引力梯度 ${gravityGradient.value}G，激活负能量坍缩偏转盾（伤害削减 50%）`)
  }, 400)

  setTimeout(() => {
    dimensionSimLogs.value.unshift(`[0.85s] 解算非欧测地线方程，空间剪切度规张量 ${calculatedDistortionStress.value} MPa 稳定收敛`)
  }, 800)

  setTimeout(() => {
    dimensionSimLogs.value.unshift(`[1.30s] 激发量子叠加回响门，消除 ${Math.round(escapeEntropy.value * 4)} 处虚空死胡同节点`)
  }, 1300)

  setTimeout(() => {
    dimensionSimLogs.value.unshift(`[1.75s] 测地线逃逸通道铺设完成！综合逃生率 ${calculatedEscapeProbability.value}%，视界剩余时限 ${calculatedSurvivalTime.value}s`)
    isSimulatingDimension.value = false
    if (message) message.success('高维裂隙拓扑测地线推演完成，逃逸路线已生成！')
  }, 1750)
}

const exportDimensionRiftCertificate = () => {
  const timestamp = new Date().toISOString()
  const certId = 'DIM-RIFT-' + Math.random().toString(36).substring(2, 9).toUpperCase()
  const certContent = `================================================================================
【光之战士：时空裂隙】高维深渊裂隙迷宫地牢拓扑推演与逃逸方案书
================================================================================
方案编号: ${certId}
时间戳: ${timestamp}
版本规范: VBLE Dungeon & Spatial Topology Matrix v2.2.279

【当前选定拓扑流形】
- 流形类型: ${currentTopology.value.name} (${currentTopology.value.tag})
- 空间自洽度: ${currentTopology.value.safeFactor}
- 流形机制概述: ${currentTopology.value.desc}

【物理环境度规与控制变量】
- 裂隙探索深度: ${riftDepth.value} 层
- 重力异常梯度: ${gravityGradient.value} G
- 空间剪切曲率: ${shearCurvature.value} %
- 逃生路径熵值: ${escapeEntropy.value}
- 量子叠加回响门: ${quantumSuperposition.value ? '已启用 (量子态双重逃逸)' : '未启用'}
- 负能量坍缩偏转盾: ${negativeEnergyShield.value ? '已启用 (潮汐伤害削减 50%)' : '未启用'}
- 局域时空回溯回路: ${chronoRewindLoop.value ? '已激活 (+45s 视界时限)' : '未激活'}

【实时解算测地线逃逸指标】
- 陷阱瞬时撕裂伤害: ${calculatedTrapDamage.value.toLocaleString()} HP
- 奇点逃生综合成功率: ${calculatedEscapeProbability.value}%
- 空间畸变应力张量: ${calculatedDistortionStress.value} MPa
- 视界闭合极限生存时限: ${calculatedSurvivalTime.value} 秒
- 通道通航状态: ${calculatedEscapeProbability.value >= 50 ? '稳定可通行' : '严重闭合坍缩'}

【底层引擎契约安全指纹】
- 引擎架构: Godot 4.6 LTS / Non-Euclidean RefCounted Manifold Engine
- 核心求解器: dungeon_topology_resolver.gd / rift_spatial_collapse_engine.gd
- 着色器渲染管线: non_euclidean_spatial_warp.gdshader
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
    a.download = `dimension_rift_topology_cert_v2.2.279_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('高维裂隙拓扑逃逸方案书已导出并同步至剪贴板！')
  }
}

const activeDimensionCodeTab = ref<'resolver' | 'engine' | 'shader'>('resolver')

const gdDimensionResolverCode = `## dungeon_topology_resolver.gd
## Godot 4.6 LTS - 全域多维裂隙非欧拓扑流形与测地线逃逸路径求解器
extends RefCounted
class_name DungeonTopologyResolver

enum TopologyClass {
	MOBIUS_STRIP,        ## 莫比乌斯流形单侧闭环
	NON_EUCLIDEAN_HYPER, ## 四维超正方体双曲极射投影
	EVENT_HORIZON,       ## 奇点施瓦西引力视界
	CRYSTAL_SPIRE        ## 水晶全反射螺旋晶胞
}

static func calculate_escape_geodesic(
	topology: TopologyClass,
	depth_layer: int,
	gravity_g: float,
	shear_pct: float,
	has_quantum_door: bool
) -> Dictionary:
	var base_success: float = 100.0 - float(depth_layer) * 0.55 - gravity_g * 8.5
	if has_quantum_door:
		base_success += 24.0
	
	var final_escape_chance: float = clampf(base_success, 5.0, 98.0)
	var distortion_stress_mpa: float = gravity_g * (shear_pct / 100.0) * 44.0
	var safe_geodesic_steps: int = maxi(3, int(120.0 / (gravity_g + 1.0)))

	return {
		"topology": topology,
		"escape_chance": final_escape_chance,
		"stress_mpa": distortion_stress_mpa,
		"steps_remaining": safe_geodesic_steps,
		"status": "STABLE_ROUTE" if final_escape_chance >= 50.0 else "HAZARDOUS_COLLAPSE"
	}
`

const gdDimensionEngineCode = `## rift_spatial_collapse_engine.gd
## Godot 4.6 LTS - 重力潮汐剪切、视界坍缩倒计时与负能量偏转护盾状态机
extends RefCounted
class_name RiftSpatialCollapseEngine

signal collapse_warning_emitted(seconds_left: int, stress_level: String)
signal emergency_phase_rewind_triggered(safe_anchor_pos: Vector3i)

static func evaluate_trap_damage(
	depth_layer: int,
	gravity_g: float,
	shear_pct: float,
	has_negative_shield: bool
) -> int:
	var raw_dmg: float = float(depth_layer) * 190.0 * (gravity_g / 2.0) * (shear_pct / 50.0)
	if has_negative_shield:
		raw_dmg *= 0.5 # 负能量偏转盾吸收50%潮汐撕裂
	return maxi(10, int(raw_dmg))

static func check_rewind_loop(
	is_fatal: bool,
	has_chrono_loop: bool,
	history_anchors: Array[Vector3i]
) -> Dictionary:
	if is_fatal and has_chrono_loop and not history_anchors.is_empty():
		return {
			"rewound": true,
			"target_anchor": history_anchors.back(),
			"msg": "时空倒流回路已触发，全员恢复至前一稳定引力锚点！"
		}
	return {
		"rewound": false,
		"target_anchor": Vector3i.ZERO,
		"msg": "无法触发回溯，承受全额时空撕裂。"
	}
`

const gdDimensionShaderCode = `shader_type canvas_item;
render_mode blend_mix, unshaded;

// Godot 4.6 LTS - 四维极射投影非欧几何空间曲率畸变与全息裂隙着色器
uniform float u_gravity_gradient : hint_range(0.1, 5.0) = 2.5;
uniform float u_shear_curvature : hint_range(0.1, 1.0) = 0.65;
uniform float u_entropy_jitter : hint_range(0.0, 1.0) = 0.25;
uniform vec4 u_event_horizon_tint : source_color = vec4(0.388, 0.4, 0.945, 1.0);

void fragment() {
    vec2 uv = UV - vec2(0.5);
    float dist = length(uv);
    
    // 双曲非欧几何畸变度规
    float angle = atan(uv.y, uv.x);
    float warp = pow(dist, 1.0 + u_gravity_gradient * 0.2) + sin(angle * 4.0 + TIME * 1.5) * (u_shear_curvature * 0.05);
    
    vec2 warped_uv = vec2(cos(angle), sin(angle)) * warp + vec2(0.5);
    vec4 tex = texture(TEXTURE, warped_uv);
    
    // 视界边缘发光与量子重叠色散
    float rim = smoothstep(0.45, 0.5, dist);
    vec3 chromatic = vec3(
        texture(TEXTURE, warped_uv + vec2(0.003 * u_shear_curvature, 0.0)).r,
        texture(TEXTURE, warped_uv).g,
        texture(TEXTURE, warped_uv - vec2(0.003 * u_shear_curvature, 0.0)).b
    );
    
    COLOR = vec4(mix(chromatic, u_event_horizon_tint.rgb, rim * 0.7), tex.a);
}
`

const currentDimensionCode = computed(() => {
  if (activeDimensionCodeTab.value === 'resolver') return gdDimensionResolverCode
  if (activeDimensionCodeTab.value === 'engine') return gdDimensionEngineCode
  return gdDimensionShaderCode
})

const copyDimensionCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentDimensionCode.value).then(() => {
      if (message) message.success('Godot 4.6 LTS 裂隙拓扑源码已复制至剪贴板！')
    }).catch(() => {
      if (message) message.error('复制失败，请手动选取复制')
    })
  }
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
