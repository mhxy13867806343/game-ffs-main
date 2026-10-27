<template>
  <div class="dungeons-view">
    <div class="text-center mb-6">
      <n-tag type="info" size="small" round class="mb-2">Dungeon Topology & Global Locations</n-tag>
      <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-wide">全域地貌拓扑与地宫导览</h1>
      <p class="text-gray-400 text-sm md:text-base mt-2 mb-3">纵览苍穹、地表、深海、地狱冥界与终局虚无；本页目录收录 {{ dungeons.length }} 处地宫与探索地点。</p>
      <div class="flex flex-wrap justify-center gap-2">
        <n-button size="small" type="primary" secondary @click="$router.push('/vble/scenes')">
          🏘️ 世界场景与城镇 NPC &rarr;
        </n-button>
        <n-button size="small" type="warning" secondary @click="$router.push('/vble/story')">
          🧭 主线 44 节拍雷达导航 &rarr;
        </n-button>
        <n-button size="small" type="info" secondary @click="$router.push('/vble/boss-tactics')">
          🛡️ 首领战术与机制指南 &rarr;
        </n-button>
        <n-button size="small" type="default" secondary @click="$router.push('/vble/monsters')">
          👾 魔物与高阶悬赏图鉴 &rarr;
        </n-button>
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
import type { InputInst } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'
import { dungeonProgression } from '../config/dungeonProgression'
import { usePagination } from '@/composables/usePagination'

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
