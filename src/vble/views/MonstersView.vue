<template>
  <div class="monsters-page p-3 sm:p-5 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="warning" size="small" round class="mb-2">Total {{ allMonsters.length }} Bestiary & Boss Catalog</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-amber mb-2">👾 全域魔物与首领大图鉴</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm">
        门户目录收录 {{ normalCount }} 种原野常规怪、{{ bossCount }} 种剧情守关首领、以及 {{ coliseumCount }} 种斗技场霸主，支持全属性透视、弱点克制与掉落率检索
      </p>
    </div>

    <!-- 已击败首领全域游荡遭遇与强度缩放测算工作台 (基于桌面 Godot roaming_boss_rules.json 实机规范) -->
    <div class="bg-gradient-to-br from-[#121626]/95 via-[#1a1c33]/90 to-[#0e1424]/95 border border-amber-500/40 p-4 sm:p-5 rounded-2xl shadow-2xl space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl">⚡</span>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-bold text-amber-300">首领全域游荡遭遇与强度缩放工作台 (Roaming Boss Studio)</h2>
              <n-tag size="tiny" type="warning" round>Godot 实机规则对齐</n-tag>
            </div>
            <p class="text-xs text-gray-400">基于 <code>roaming_boss_rules.json</code>：已击败首领可在已解锁地区遭遇，属性与奖励按原模板无损一次性缩放（严禁递推叠乘）</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="tiny" secondary :type="showRoamingStudio ? 'warning' : 'default'" @click="showRoamingStudio = !showRoamingStudio">
            {{ showRoamingStudio ? '收起测算台 ⌃' : '展开测算台 ⌄' }}
          </n-button>
        </div>
      </div>

      <div v-show="showRoamingStudio" class="space-y-4">
        <!-- 控制面板 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          <!-- 选择首领 -->
          <div>
            <label class="text-xs font-bold text-gray-300 block mb-1.5">🎯 目标首领模板:</label>
            <n-select
              v-model:value="selectedRoamingBossId"
              :options="roamingBossOptions"
              size="small"
            />
            <div class="text-[10px] text-gray-500 mt-1 flex items-center justify-between">
              <span>基准等级: Lv.{{ selectedRoamingBoss.baseLevel }}</span>
              <span>出没: {{ selectedRoamingBoss.location }}</span>
            </div>
          </div>

          <!-- 地区等级基准 -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-bold text-gray-300">🗺️ 遭遇地区最低等级:</label>
              <span class="text-xs font-mono font-bold text-amber-400">Lv.{{ areaMinLevel }}</span>
            </div>
            <n-slider v-model:value="areaMinLevel" :min="1" :max="80" :step="1" />
            <div class="text-[10px] text-gray-500 mt-1">区域下限等级区间 (1~80)</div>
          </div>

          <!-- 首领加成等级 -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-bold text-gray-300">🎖️ 首领浮动加成 (level_bonus):</label>
              <span class="text-xs font-mono font-bold text-cyan-400">+{{ roamingBonusLevel }} 级</span>
            </div>
            <n-slider v-model:value="roamingBonusLevel" :min="3" :max="5" :step="1" />
            <div class="text-[10px] text-gray-500 mt-1">规范常数 [3, 5] 随机浮动</div>
          </div>

          <!-- 漫游行走步数/像素 -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-bold text-gray-300">🚶 漫游行走步长 (像素):</label>
              <span class="text-xs font-mono font-bold text-emerald-400">{{ travelPixels }} px</span>
            </div>
            <n-slider v-model:value="travelPixels" :min="0" :max="5120" :step="320" />
            <div class="text-[10px] text-gray-500 mt-1">每 640px 触发 25% 概率检定</div>
          </div>
        </div>

        <!-- 动态测算指标面板 -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <!-- 判定概率 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center">
            <div class="text-[10px] text-gray-400">遭遇检定 / 综合概率</div>
            <div class="text-base font-extrabold text-amber-300 font-mono my-0.5">{{ roamingRolls }} 次 / {{ roamingEncounterRate.toFixed(1) }}%</div>
            <div class="text-[10px] text-gray-500">25% 每 640px</div>
          </div>

          <!-- 缩放等级 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-center">
            <div class="text-[10px] text-gray-400">动态生成等级 (Level)</div>
            <div class="text-base font-extrabold text-cyan-300 font-mono my-0.5">Lv.{{ scaledBossStats.level }}</div>
            <div class="text-[10px] text-gray-500">膨胀因子 ×{{ scaledBossStats.scaleMultiplier }}</div>
          </div>

          <!-- 动态生命值 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-rose-500/30 text-center">
            <div class="text-[10px] text-gray-400">缩放后 HP (1.3次幂)</div>
            <div class="text-base font-extrabold text-rose-300 font-mono my-0.5">{{ scaledBossStats.hp.toLocaleString() }}</div>
            <div class="text-[10px] text-gray-500">原基准: {{ selectedRoamingBoss.baseHp }}</div>
          </div>

          <!-- 动态速度 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-center">
            <div class="text-[10px] text-gray-400">行动速度 (0.35次幂)</div>
            <div class="text-base font-extrabold text-emerald-300 font-mono my-0.5">{{ scaledBossStats.speed }}</div>
            <div class="text-[10px] text-gray-500">原基准: {{ selectedRoamingBoss.baseSpeed }}</div>
          </div>

          <!-- 奖励 EXP / 金币 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-yellow-500/30 text-center">
            <div class="text-[10px] text-gray-400">战胜奖励 (1.3次幂)</div>
            <div class="text-xs font-bold text-yellow-300 font-mono my-0.5">{{ scaledBossStats.exp }} 经验 / {{ scaledBossStats.gold }}G</div>
            <div class="text-[10px] text-gray-500">AP 点数: +{{ scaledBossStats.ap }}</div>
          </div>

          <!-- 阵型伴生规模 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-purple-500/30 text-center">
            <div class="text-[10px] text-gray-400">阵型编制与随从</div>
            <div class="text-xs font-bold text-purple-300 font-mono my-0.5">{{ scaledBossStats.bossCountRange }}</div>
            <div class="text-[10px] text-gray-500">{{ scaledBossStats.minionsRange }}</div>
          </div>
        </div>

        <!-- 架构硬核铁律条约 -->
        <div class="p-3 rounded-xl bg-amber-950/20 border border-amber-600/30 flex items-start gap-2 text-xs">
          <span class="text-amber-400 text-sm">⚠️</span>
          <div class="text-gray-300 space-y-1">
            <div class="font-bold text-amber-300">《Godot 实机引擎首领游荡遭遇规约 (roaming_boss_rules.json)》硬性铁律：</div>
            <div class="text-[11px] text-gray-400 leading-relaxed">
              1. <strong>非递推幂律守恒：</strong>所有属性计算必须强制从 <code>DataLoader</code> 原始 Boss JSON 数据源单向求值，绝对禁止将上一轮战后重现版本作为下一次缩放的乘数基数。<br>
              2. <strong>平滑填充基数 (Padding = 10)：</strong>使用 <code>(等级 + 10) / (基准等级 + 10)</code> 计算尺度因子，避免低级 Boss 在高层出现过激数值断层。<br>
              3. <strong>遭遇防卡死隔离：</strong>游荡遭遇属于野外特异性随机战，战斗失败允许在宿屋原存档恢复，不污染主线章节关键物语进度。
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 顶部状态栏与类型切换 -->
    <div class="bg-[#121626]/90 border border-slate-700/60 p-4 rounded-2xl shadow-xl space-y-4">
      <!-- 主分类 Tab -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <n-tabs class="monsters-category-tabs" @focusin="revealCategoryTab" v-model:value="activeCategoryTab" type="segment" size="small" style="max-width: 720px;">
          <n-tab-pane name="all">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'all'">
                {{ `🌟 全部魔物 (${allMonsters.length})` }}
              </button>
            </template>
          </n-tab-pane>
          <n-tab-pane name="normal">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'normal'">
                {{ `🐺 原野常规怪 (${normalCount})` }}
              </button>
            </template>
          </n-tab-pane>
          <n-tab-pane name="boss">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'boss'">
                {{ `👑 剧情守关Boss (${bossCount})` }}
              </button>
            </template>
          </n-tab-pane>
          <n-tab-pane name="coliseum">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'coliseum'">
                {{ `🌌 斗技场霸主 (${coliseumCount})` }}
              </button>
            </template>
          </n-tab-pane>
          <n-tab-pane name="bounty">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'bounty'">
                {{ `🎯 酒馆悬赏猎物 (${bountyCount})` }}
              </button>
            </template>
          </n-tab-pane>
        </n-tabs>

        <!-- 视图切换 (卡片 / 表格) -->
        <div class="flex items-center gap-2">
          <n-button
            size="tiny"
            :type="viewMode === 'grid' ? 'primary' : 'default'"
            secondary
            @click="viewMode = 'grid'"
          >
            🔲 卡片视图
          </n-button>
          <n-button
            size="tiny"
            :type="viewMode === 'table' ? 'primary' : 'default'"
            secondary
            @click="viewMode = 'table'"
          >
            📋 表格视图
          </n-button>
        </div>
      </div>

      <!-- 快捷搜索与多维过滤 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <!-- 搜索框 -->
        <div>
          <label class="text-[11px] text-gray-400 block mb-1">搜索魔物名称 / 技能 / 掉落:</label>
          <n-input
            v-model:value="searchKeyword"
            placeholder="如: 狼、毒蜂、提亚马特、长剑..."
            size="small"
            clearable
          >
            <template #prefix>🔍</template>
          </n-input>
        </div>

        <!-- 种族筛选 -->
        <div>
          <label class="text-[11px] text-gray-400 block mb-1">种族分类筛选:</label>
          <n-select
            v-model:value="selectedRace"
            :options="raceOptions"
            size="small"
            placeholder="全部种族"
          />
        </div>

        <!-- 区域筛选 -->
        <div>
          <label class="text-[11px] text-gray-400 block mb-1">出没区域 / 场景筛选:</label>
          <n-select
            v-model:value="selectedLocation"
            :options="locationOptions"
            size="small"
            placeholder="全部出没区域"
          />
        </div>

        <!-- 排序方式 -->
        <div>
          <label class="text-[11px] text-gray-400 block mb-1">排序方式:</label>
          <n-select
            v-model:value="sortBy"
            :options="sortOptions"
            size="small"
          />
        </div>
      </div>

      <!-- 当前筛选状态统计 -->
      <div class="flex flex-wrap items-center justify-between text-xs text-gray-400 pt-1">
        <div>
          筛选匹配：<span class="text-amber-400 font-bold font-mono">{{ filteredMonsters.length }}</span> / 全部 {{ allMonsters.length }} 种；本页 {{ paginatedMonsters.length }} 种
        </div>
        <div class="flex gap-2">
          <n-button size="tiny" tertiary @click="resetFilters">重置筛选</n-button>
        </div>
      </div>
    </div>

    <!-- ================= 视图一：卡片视图 (Grid Cards) ================= -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="m in paginatedMonsters"
        :key="m.id"
        class="bg-[#121626]/90 border border-slate-800 hover:border-amber-500/60 transition-all rounded-xl p-4 shadow-lg flex flex-col justify-between cursor-pointer hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
        role="button"
        tabindex="0"
        :aria-label="`查看${m.name}详情`"
        @click="openMonsterDetail(m)"
        @keydown.enter.self.prevent="!$event.repeat && openMonsterDetail(m)"
        @keydown.space.self.prevent="!$event.repeat && openMonsterDetail(m)"
      >
        <div>
          <!-- 头部：名称 + 等级 + Rank徽章 -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-bold text-gray-100 text-base">{{ m.name }}</span>
                <n-tag
                  size="tiny"
                  :type="m.rank === 'boss' ? 'error' : m.rank === 'coliseum' ? 'warning' : 'info'"
                >
                  {{ m.rankText || (m.rank === 'boss' ? 'BOSS' : '普通') }}
                </n-tag>
                <n-tag
                  v-if="isBountyTarget(m)"
                  size="tiny"
                  type="warning"
                  round
                >
                  🎯 {{ getBountyRank(m) }}
                </n-tag>
              </div>
              <div class="text-[11px] text-gray-500 font-mono">ID: {{ m.id }}</div>
            </div>
            <div class="text-right">
              <span class="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-600/30">
                Lv. {{ m.level }}
              </span>
            </div>
          </div>

          <!-- 核心属性栏 (HP / MP / ATK / DEF) -->
          <div class="grid grid-cols-4 gap-1.5 bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 text-center mb-3">
            <div>
              <div class="text-[10px] text-gray-400">生命 HP</div>
              <div class="text-xs font-bold text-emerald-400 font-mono">{{ m.hp }}</div>
            </div>
            <div>
              <div class="text-[10px] text-gray-400">魔力 MP</div>
              <div class="text-xs font-bold text-cyan-400 font-mono">{{ m.mp }}</div>
            </div>
            <div>
              <div class="text-[10px] text-gray-400">物攻 ATK</div>
              <div class="text-xs font-bold text-amber-400 font-mono">{{ m.attack }}</div>
            </div>
            <div>
              <div class="text-[10px] text-gray-400">物防 DEF</div>
              <div class="text-xs font-bold text-blue-400 font-mono">{{ m.defense }}</div>
            </div>
          </div>

          <!-- 种族与出没区域 -->
          <div class="space-y-1 text-xs mb-3">
            <div class="flex items-center justify-between text-gray-400 text-[11px]">
              <span>种族归属:</span>
              <span class="text-gray-300 font-medium">{{ m.raceText || m.race }}</span>
            </div>
            <div class="flex items-center justify-between text-gray-400 text-[11px]">
              <span>出没场景:</span>
              <span class="text-cyan-300 truncate max-w-[180px]">{{ m.location }}</span>
            </div>
            <div class="flex items-center justify-between text-gray-400 text-[11px]">
              <span>克制弱点:</span>
              <span class="text-rose-400 font-medium">{{ m.weakness || '无弱点' }}</span>
            </div>
          </div>

          <!-- 常用技能标签 -->
          <div v-if="m.skills && m.skills.length" class="mb-3">
            <div class="text-[10px] text-gray-400 mb-1">主要特技 / 行为:</div>
            <div class="flex flex-wrap gap-1">
              <n-tag
                v-for="(skill, sIdx) in m.skills.slice(0, 3)"
                :key="sIdx"
                size="tiny"
                type="default"
              >
                ⚡ {{ skill }}
              </n-tag>
              <n-tag v-if="m.skills.length > 3" size="tiny" tertiary>
                +{{ m.skills.length - 3 }}
              </n-tag>
            </div>
          </div>
        </div>

        <!-- 卡片底部：掉落物品与经验金币 -->
        <div class="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[11px] text-gray-400">
          <div class="truncate max-w-[180px]">
            <span>🎁 掉落: </span>
            <span v-if="m.drops && m.drops.length" class="text-gray-300">
              {{ m.drops.map((d: any) => d.name).join('、') }}
            </span>
            <span v-else class="text-gray-500">无掉落</span>
          </div>
          <div class="text-right text-[10px] text-amber-500 font-mono shrink-0">
            EXP {{ m.exp }} / {{ m.gold }}G
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 视图二：表格视图 (Data Table) ================= -->
    <div v-else class="bg-[#121626]/90 border border-slate-700/60 rounded-xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-gray-300 border-collapse">
          <thead>
            <tr class="bg-slate-900/90 border-b border-slate-800 text-gray-400 text-[11px]">
              <th class="p-3">名称 / ID</th>
              <th class="p-3">类别</th>
              <th class="p-3">等级</th>
              <th class="p-3">生命值 HP</th>
              <th class="p-3">魔力 MP</th>
              <th class="p-3">攻击/防御</th>
              <th class="p-3">魔攻/魔防</th>
              <th class="p-3">速度</th>
              <th class="p-3">弱点</th>
              <th class="p-3">出没场景</th>
              <th class="p-3">掉落物</th>
              <th class="p-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="m in paginatedMonsters"
              :key="m.id"
              class="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors"
            >
              <td class="p-3 font-semibold text-gray-100">
                <div>{{ m.name }}</div>
                <div class="text-[10px] text-gray-500 font-mono">{{ m.id }}</div>
              </td>
              <td class="p-3">
                <div class="flex items-center gap-1 flex-wrap">
                  <n-tag size="tiny" :type="m.rank === 'boss' ? 'error' : m.rank === 'coliseum' ? 'warning' : 'info'">
                    {{ m.rankText || m.rank }}
                  </n-tag>
                  <n-tag v-if="isBountyTarget(m)" size="tiny" type="warning" round>
                    🎯 {{ getBountyRank(m) }}
                  </n-tag>
                </div>
              </td>
              <td class="p-3 font-mono font-bold text-amber-400">Lv. {{ m.level }}</td>
              <td class="p-3 font-mono text-emerald-400 font-bold">{{ m.hp }}</td>
              <td class="p-3 font-mono text-cyan-400">{{ m.mp }}</td>
              <td class="p-3 font-mono">{{ m.attack }} / {{ m.defense }}</td>
              <td class="p-3 font-mono">{{ m.magic_attack || m.attack }} / {{ m.magic_defense || m.defense }}</td>
              <td class="p-3 font-mono">{{ m.speed }}</td>
              <td class="p-3 text-rose-400 font-medium">{{ m.weakness || '常规物攻' }}</td>
              <td class="p-3 text-gray-400 truncate max-w-[120px]">{{ m.location }}</td>
              <td class="p-3 text-gray-300">
                <span v-if="m.drops && m.drops.length">
                  {{ m.drops.map((d: any) => `${d.name} (${d.rate})`).join('、') }}
                </span>
                <span v-else class="text-gray-500">无</span>
              </td>
              <td class="p-3 text-right">
                <n-button size="tiny" type="primary" secondary @click="openMonsterDetail(m)">
                  详情
                </n-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 分页导航 -->
    <div
      v-if="filteredMonsters.length > 0"
      v-simple-page-label
      class="flex justify-center items-center py-4"
      @click.capture="captureSimplePaginationActivation"
      @click="preserveSimplePaginationFocus"
    >
      <n-pagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :item-count="total"
        :page-sizes="[12, 24, 36, 48]"
        show-size-picker
        show-quick-jumper
        :simple="isMobile"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      >
        <!-- 原生按钮补齐键盘访问，页码与边界仍由原分页器的点击冒泡处理。 -->
        <template #prev="{ page }">
          <button type="button" class="monsters-pagination-control" aria-label="上一页魔物图鉴" :disabled="page <= 1">‹</button>
        </template>
        <template #label="{ type, node, active }">
          <button
            v-if="type === 'page'"
            type="button"
            class="monsters-pagination-control"
            :aria-label="`魔物图鉴第 ${node} 页`"
            :aria-current="active ? 'page' : undefined"
          >{{ node }}</button>
          <component :is="node" v-else />
        </template>
        <template #next="{ page, pageCount }">
          <button type="button" class="monsters-pagination-control" aria-label="下一页魔物图鉴" :disabled="page >= pageCount">›</button>
        </template>
        <template #prefix="{ itemCount }">
          <span class="text-xs text-gray-400 hidden sm:inline">共 {{ itemCount }} 种魔物</span>
        </template>
      </n-pagination>
    </div>

    <!-- ================= 弹窗：怪物全息档案详情 (Holographic Modal) ================= -->
    <n-modal
      v-model:show="showDetailModal"
      preset="card"
      style="max-width: 680px;"
      class="bg-[#121626] border border-amber-500/40"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span class="text-xl">👾</span>
          <span class="font-bold text-amber-300">{{ activeMonster.name }} · 全息生态档案</span>
          <n-tag size="tiny" :type="activeMonster.rank === 'boss' ? 'error' : 'info'">
            {{ activeMonster.rankText || activeMonster.rank }}
          </n-tag>
        </div>
      </template>

      <div v-if="activeMonster.id" class="space-y-4">
        <!-- 头部概览 -->
        <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs text-gray-400">系统编号: <span class="font-mono text-gray-200">{{ activeMonster.id }}</span></div>
            <div class="text-xs text-gray-400">种族形态: <span class="text-cyan-300 font-bold">{{ activeMonster.raceText || activeMonster.race }}</span></div>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-400">综合危险评级</div>
            <div class="text-lg font-mono font-black text-amber-400">Lv. {{ activeMonster.level }}</div>
          </div>
        </div>

        <!-- 数值六维矩阵 -->
        <div>
          <h4 class="text-xs font-bold text-amber-400 mb-2">📊 核心战斗属性全景</h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">最大生命 HP</div>
              <div class="text-base font-bold text-emerald-400 font-mono">{{ activeMonster.hp }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">最大魔力 MP</div>
              <div class="text-base font-bold text-cyan-400 font-mono">{{ activeMonster.mp }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">物理攻击 ATK</div>
              <div class="text-base font-bold text-amber-400 font-mono">{{ activeMonster.attack }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">物理防御 DEF</div>
              <div class="text-base font-bold text-blue-400 font-mono">{{ activeMonster.defense }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">魔法攻击 MATK</div>
              <div class="text-base font-bold text-purple-400 font-mono">{{ activeMonster.magic_attack || activeMonster.attack }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">魔法防御 MDEF</div>
              <div class="text-base font-bold text-indigo-400 font-mono">{{ activeMonster.magic_defense || activeMonster.defense }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">敏捷速度 SPD</div>
              <div class="text-base font-bold text-amber-300 font-mono">{{ activeMonster.speed }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">击破报酬 EXP/G</div>
              <div class="text-xs font-bold text-yellow-400 font-mono pt-1">{{ activeMonster.exp }} / {{ activeMonster.gold }}</div>
            </div>
          </div>
        </div>

        <!-- 物理承伤常驻因子与状态免疫透视 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs">
          <div>
            <div class="text-[10px] text-gray-400">🛡️ 常驻物理承伤倍率：</div>
            <div class="font-mono text-cyan-300 font-bold mt-0.5">
              {{ activeMonster.physical_multiplier ? `常驻物理承伤 ×${activeMonster.physical_multiplier}（不含临时防御）` : '常驻物理承伤 ×1.0（基准标定）' }}
            </div>
          </div>
          <div>
            <div class="text-[10px] text-gray-400">⚡ 状态免疫与异常穿透：</div>
            <div class="font-mono text-amber-300 font-bold mt-0.5">
              {{ activeMonster.rank === 'boss' || isBountyTarget(activeMonster) ? '全控制状态强免疫（仅破韧虚弱）' : '常规异常可附着（致盲/沉默/中毒）' }}
            </div>
          </div>
        </div>

        <!-- 酒馆高阶悬赏联查情报 -->
        <div v-if="isBountyTarget(activeMonster)" class="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <span class="text-amber-400 text-xs font-bold flex items-center gap-1.5">
              <span>🎯</span>
              <span>王城酒馆悬赏令情报：{{ getBountyRank(activeMonster) }}</span>
            </span>
            <n-tag size="tiny" type="warning" round>酒馆佣兵工会官方通缉</n-tag>
          </div>
          <p class="text-xs text-gray-300">
            该目标已由王城酒馆看板立项通缉。完成特定阶段前置讨伐后可接取，击破后前往酒馆领赏员处一次性领取高额金币与专属神兵防具。
          </p>
          <div class="flex flex-wrap gap-2 pt-1">
            <router-link to="/vble/boss-tactics">
              <n-button size="tiny" type="warning" secondary>🛡️ 查看首领攻坚战术</n-button>
            </router-link>
            <router-link to="/vble/sidequests">
              <n-button size="tiny" type="info" secondary>📜 查阅酒馆悬赏委托</n-button>
            </router-link>
          </div>
        </div>

        <!-- 弱点与战术克制策略 -->
        <div class="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
          <div class="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
            <span>🔥</span>
            <span>元素克制弱点与攻略指南:</span>
          </div>
          <p class="text-xs text-gray-200">
            该目标弱点为：<strong class="text-rose-300 font-mono">【{{ activeMonster.weakness || '常规物攻' }}】</strong>。
            建议战斗中配置针对弱点的魔法技能或对应属性魔剑附魔，可触发 2~3 倍克制暴击乘区。
          </p>
        </div>

        <!-- 特技出招与已知招式白名单 (Known Moves) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-xs font-bold text-amber-400">⚡ 专属特技与已知基础招式 (Known Moves)</h4>
            <span class="text-[10px] text-cyan-300 font-mono">已击败快照白名单</span>
          </div>
          <div class="space-y-1.5">
            <div
              v-for="(skill, idx) in activeMonster.skills"
              :key="idx"
              class="p-2.5 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold">⚔️ {{ skill }}</span>
                <span class="text-[10px] text-gray-400">序列 #{{ idx + 1 }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <n-tag size="tiny" :type="getSkillKindTag(skill)">
                  {{ getSkillKindLabel(skill) }}
                </n-tag>
                <span class="text-[10px] text-cyan-300">ATB 充能完毕释放</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 实机魔物图鉴独立招式全息面板 (MonsterKnownMovesView / KnownMovesButton) -->
        <div class="p-3 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/50 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>📖</span>
              <span>实机图鉴「基础招式记载」全息面板 (MonsterKnownMovesView)</span>
            </span>
            <n-tag size="tiny" type="warning" round>独占模态视窗</n-tag>
          </div>
          <p class="text-[11px] text-gray-300 leading-relaxed">
            实机怪物图鉴详情（<code>settings_encyclopedia.gd</code>）实装 <strong>【基础招式记载】</strong> 按钮与 <code>MonsterKnownMovesView</code> 全屏暗金面板。点击展开后独立滚动显示全部无条件基础招式，并具备安全遮罩、<code>ui_cancel</code> 快捷键返回与精准焦点恢复断路器。
          </p>
          <div class="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
            <div><strong class="text-gray-200">• 独占遮罩隔离：</strong>模态展开时隐藏底层卡片与导航，阻断旧按钮穿透。</div>
            <div><strong class="text-gray-200">• 票据与退役校验：</strong>换档或换周目即刻清空快照，杜绝把旧详情授给新档。</div>
          </div>
        </div>

        <!-- 掉落物清单 -->
        <div>
          <h4 class="text-xs font-bold text-amber-400 mb-2">🎁 战利品与掉落概率</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div
              v-for="(d, dIdx) in activeMonster.drops"
              :key="dIdx"
              class="p-2 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
            >
              <span class="text-gray-200 font-medium">{{ d.name }}</span>
              <span class="text-amber-400 font-mono font-bold">{{ d.rate }}</span>
            </div>
            <div v-if="!activeMonster.drops || !activeMonster.drops.length" class="text-xs text-gray-500 p-2">
              首领无常规掉落，击败直接推进主线成就。
            </div>
          </div>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

// ================= 游荡首领测算台 (roaming_boss_rules.json) =================
interface RoamingBossTemplate {
  id: string
  name: string
  title: string
  baseLevel: number
  baseHp: number
  baseAttack: number
  baseDefense: number
  baseSpeed: number
  baseExp: number
  baseGold: number
  baseAp: number
  location: string
  avatar: string
}

const roamingBossList: RoamingBossTemplate[] = [
  {
    id: 'ff1_pr_033',
    name: '阿斯托斯 (Astos)',
    title: '黑暗妖精伪王',
    baseLevel: 5,
    baseHp: 420,
    baseAttack: 30,
    baseDefense: 18,
    baseSpeed: 39,
    baseExp: 2250,
    baseGold: 2000,
    baseAp: 1,
    location: '西城城堡 (ff1_western_keep)',
    avatar: '👑'
  },
  {
    id: 'ff1_pr_006',
    name: '加兰多 (Garland)',
    title: '轮回骑士·混沌化身',
    baseLevel: 10,
    baseHp: 1060,
    baseAttack: 45,
    baseDefense: 25,
    baseSpeed: 24,
    baseExp: 3800,
    baseGold: 3200,
    baseAp: 2,
    location: '柯内利亚神殿深处',
    avatar: '🛡️'
  },
  {
    id: 'ancient_golem',
    name: '远古守护巨像 (Ancient Golem)',
    title: '星界古魔导巨核',
    baseLevel: 45,
    baseHp: 1200,
    baseAttack: 65,
    baseDefense: 42,
    baseSpeed: 28,
    baseExp: 6200,
    baseGold: 4500,
    baseAp: 3,
    location: '米西迪亚观象台·禁断封印室',
    avatar: '🗿'
  },
  {
    id: 'ff1_pr_059',
    name: '冥界吸血鬼 (Vampire)',
    title: '暗夜血裔统领',
    baseLevel: 20,
    baseHp: 2800,
    baseAttack: 72,
    baseDefense: 38,
    baseSpeed: 42,
    baseExp: 7500,
    baseGold: 6000,
    baseAp: 3,
    location: '大地洞穴深处',
    avatar: '🦇'
  },
  {
    id: 'ff1_pr_081',
    name: '地之巫妖·利奇 (Lich)',
    title: '土之混沌大领主',
    baseLevel: 35,
    baseHp: 4000,
    baseAttack: 85,
    baseDefense: 50,
    baseSpeed: 48,
    baseExp: 12000,
    baseGold: 9000,
    baseAp: 4,
    location: '土之祭坛混沌之涡',
    avatar: '💀'
  },
  {
    id: 'ff1_pr_084',
    name: '风之狂龙·提亚马特 (Tiamat)',
    title: '浮游空之混沌主宰',
    baseLevel: 50,
    baseHp: 6400,
    baseAttack: 120,
    baseDefense: 65,
    baseSpeed: 58,
    baseExp: 24000,
    baseGold: 18000,
    baseAp: 5,
    location: '浮游城最上层',
    avatar: '🐉'
  }
]

const selectedRoamingBossId = ref<string>('ff1_pr_033')
const areaMinLevel = ref<number>(25)
const roamingBonusLevel = ref<number>(4)
const travelPixels = ref<number>(1280)
const showRoamingStudio = ref<boolean>(true)

const roamingBossOptions = computed(() => {
  return roamingBossList.map(b => ({
    label: `${b.avatar} ${b.name} (基准Lv.${b.baseLevel})`,
    value: b.id
  }))
})

const selectedRoamingBoss = computed(() => {
  return roamingBossList.find(b => b.id === selectedRoamingBossId.value) || roamingBossList[0]
})

const roamingRolls = computed(() => {
  return Math.floor(travelPixels.value / 640)
})

const roamingEncounterRate = computed(() => {
  if (roamingRolls.value <= 0) return 0
  return (1 - Math.pow(1 - 0.25, roamingRolls.value)) * 100
})

const scaledTargetLevel = computed(() => {
  return Math.max(1, areaMinLevel.value + roamingBonusLevel.value)
})

const roamingScaleFactor = computed(() => {
  const baseLvl = selectedRoamingBoss.value.baseLevel
  return (scaledTargetLevel.value + 10) / (baseLvl + 10)
})

const scaledBossStats = computed(() => {
  const b = selectedRoamingBoss.value
  const factor = roamingScaleFactor.value
  const hpGrowth = Math.pow(factor, 1.3)
  const rewardGrowth = Math.pow(factor, 1.3)
  const speedGrowth = Math.pow(factor, 0.35)
  const apGrowth = Math.pow(factor, 0.5)

  return {
    level: scaledTargetLevel.value,
    hp: Math.round(b.baseHp * hpGrowth),
    attack: Math.round(b.baseAttack * Math.pow(factor, 1.15)),
    defense: Math.round(b.baseDefense * Math.pow(factor, 1.1)),
    speed: Math.round(b.baseSpeed * speedGrowth),
    exp: Math.round(b.baseExp * rewardGrowth),
    gold: Math.round(b.baseGold * rewardGrowth),
    ap: Math.max(1, Math.round(b.baseAp * apGrowth)),
    scaleMultiplier: factor.toFixed(2),
    minionsRange: '0 ~ 3 伴生怪',
    bossCountRange: '1 ~ 3 分身体'
  }
})

// 所有魔物数据源
const allMonsters = computed(() => gameStore.db.monsters || [])

// 悬赏魔物判定与等级标签辅助函数
const isBountyTarget = (m: any): boolean => {
  if (!m) return false
  const bountyKeywords = ['强化奇美拉', '死神之眼', '僵尸龙', '哥布林头目', '火蜥蜴', '刺客头目']
  return Boolean(
    m.isBounty ||
    bountyKeywords.some(k => m.name?.includes(k)) ||
    m.id?.includes('bounty') ||
    m.id === 'ff1_pr_120' ||
    m.id === 'ff1_pr_121'
  )
}

const getBountyRank = (m: any): string => {
  if (m.name?.includes('强化奇美拉') || m.id === 'ff1_pr_120') return 'Rank A 悬赏'
  if (m.name?.includes('死神之眼') || m.id === 'ff1_pr_121') return 'Rank S 悬赏'
  if (m.name?.includes('僵尸龙')) return 'Rank B 悬赏'
  if (m.name?.includes('火蜥蜴')) return 'Rank C 悬赏'
  if (m.name?.includes('哥布林')) return 'Rank D 悬赏'
  return '酒馆悬赏'
}

// 招式类别标签 (对齐实机 monster_known_moves.gd)
const getSkillKindLabel = (skillName: string): string => {
  if (['咆哮', '凝视', '毒刺', '石化', '致盲', '混乱'].some(s => skillName.includes(s))) return '状态招式'
  if (['核爆', '海啸', '暴风', '烈焰', '闪电', '暴风雪', '魔法'].some(s => skillName.includes(s))) return '魔法招式'
  if (['吸血', '吸收', '渗透'].some(s => skillName.includes(s))) return 'MP吸收招式'
  return '物理招式'
}

const getSkillKindTag = (skillName: string): 'default' | 'info' | 'warning' | 'error' | 'success' => {
  const label = getSkillKindLabel(skillName)
  if (label === '魔法招式') return 'info'
  if (label === '状态招式') return 'warning'
  if (label === 'MP吸收招式') return 'success'
  return 'default'
}

// 分类 Tab
const activeCategoryTab = ref<'all' | 'normal' | 'boss' | 'coliseum' | 'bounty'>('all')

// 窄屏焦点进入页签时完整显现按钮，不改变原生选择与键盘行为。
function revealCategoryTab(event: FocusEvent) {
  if (event.target instanceof HTMLButtonElement) {
    event.target.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }
}

// 视图模式 (grid / table)
const viewMode = ref<'grid' | 'table'>('grid')

// 筛选状态
const searchKeyword = ref('')
const selectedRace = ref<string>('all')
const selectedLocation = ref<string>('all')
const sortBy = ref<'level_asc' | 'level_desc' | 'hp_desc' | 'atk_desc' | 'exp_desc'>('level_asc')

// 弹窗状态
const showDetailModal = ref(false)
const activeMonster = ref<any>({})

const normalCount = computed(() => allMonsters.value.filter((m: any) => m.rank === 'normal').length)
const bossCount = computed(() => allMonsters.value.filter((m: any) => m.rank === 'boss').length)
const coliseumCount = computed(() => allMonsters.value.filter((m: any) => m.rank === 'coliseum').length)
const bountyCount = computed(() => allMonsters.value.filter(isBountyTarget).length)

// 种族选项
const raceOptions = computed(() => {
  const races = new Set<string>()
  allMonsters.value.forEach((m: any) => {
    const r = m.raceText || m.race
    if (r) races.add(r)
  })
  return [
    { label: '全部种族', value: 'all' },
    ...Array.from(races).map(r => ({ label: r, value: r }))
  ]
})

// 区域选项
const locationOptions = computed(() => {
  const locs = new Set<string>()
  allMonsters.value.forEach((m: any) => {
    if (m.location) locs.add(m.location)
  })
  return [
    { label: '全部出没区域', value: 'all' },
    ...Array.from(locs).map(l => ({ label: l, value: l }))
  ]
})

// 排序选项
const sortOptions = [
  { label: '等级由低到高 (Lv.1 ↑)', value: 'level_asc' },
  { label: '等级由高到低 (Lv.99 ↓)', value: 'level_desc' },
  { label: '生命值最高 (HP ↓)', value: 'hp_desc' },
  { label: '攻击力最高 (ATK ↓)', value: 'atk_desc' },
  { label: '经验值最高 (EXP ↓)', value: 'exp_desc' }
]

// 综合过滤魔物列表
const filteredMonsters = computed(() => {
  return allMonsters.value.filter((m: any) => {
    // 1. 分类 Tab
    if (activeCategoryTab.value !== 'all') {
      if (activeCategoryTab.value === 'bounty') {
        if (!isBountyTarget(m)) return false
      } else if (m.rank !== activeCategoryTab.value) {
        return false
      }
    }

    // 2. 种族筛选
    if (selectedRace.value && selectedRace.value !== 'all') {
      const r = m.raceText || m.race
      if (r !== selectedRace.value) return false
    }

    // 3. 区域筛选
    if (selectedLocation.value && selectedLocation.value !== 'all') {
      if (m.location !== selectedLocation.value) return false
    }

    // 4. 关键字搜索
    if (searchKeyword.value.trim()) {
      const q = searchKeyword.value.trim().toLowerCase()
      const matchName = m.name?.toLowerCase().includes(q)
      const matchId = m.id?.toLowerCase().includes(q)
      const matchWeakness = m.weakness?.toLowerCase().includes(q)
      const matchDrops = (m.drops || []).some((d: any) => d.name?.toLowerCase().includes(q))
      const matchSkills = (m.skills || []).some((s: string) => s.toLowerCase().includes(q))
      const matchBounty = isBountyTarget(m) && (q.includes('悬赏') || q.includes('bounty') || q.includes('rank') || getBountyRank(m).toLowerCase().includes(q))
      if (!matchName && !matchId && !matchWeakness && !matchDrops && !matchSkills && !matchBounty) {
        return false
      }
    }

    return true
  }).sort((a: any, b: any) => {
    if (sortBy.value === 'level_asc') return (a.level || 0) - (b.level || 0)
    if (sortBy.value === 'level_desc') return (b.level || 0) - (a.level || 0)
    if (sortBy.value === 'hp_desc') return (b.hp || 0) - (a.hp || 0)
    if (sortBy.value === 'atk_desc') return (b.attack || 0) - (a.attack || 0)
    if (sortBy.value === 'exp_desc') return (b.exp || 0) - (a.exp || 0)
    return 0
  })
})

const resetFilters = () => {
  activeCategoryTab.value = 'all'
  searchKeyword.value = ''
  selectedRace.value = 'all'
  selectedLocation.value = 'all'
  sortBy.value = 'level_asc'
  resetPage()
}

import { usePagination } from '@/composables/usePagination'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

const {
  currentPage,
  pageSize,
  total,
  paginatedList: paginatedMonsters,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination(filteredMonsters, { pageSize: 12 })

// simple 输入未开放 input-props；局部指令在挂载和响应式切换后补到实际输入。
const labelSimplePageInput = (container: HTMLElement) => {
  container.querySelector<HTMLInputElement>('.n-pagination--simple input')
    ?.setAttribute('aria-label', '魔物图鉴当前页')
}
const vSimplePageLabel: Directive<HTMLElement> = {
  mounted: labelSimplePageInput,
  updated: labelSimplePageInput
}

// 暂存同一次原生点击的起点，避免给普通页码更新或鼠标操作追加移焦。
let simplePaginationActivation: { event: MouseEvent; button: HTMLButtonElement; page: number } | null = null
const captureSimplePaginationActivation = (event: MouseEvent) => {
  simplePaginationActivation = null
  const button = event.target instanceof Element ? event.target.closest('button.monsters-pagination-control') : null
  if (isMobile.value && event.detail === 0 && button instanceof HTMLButtonElement
    && !button.disabled && document.activeElement === button) {
    simplePaginationActivation = { event, button, page: currentPage.value }
  }
}

const preserveSimplePaginationFocus = (event: MouseEvent) => {
  const activation = simplePaginationActivation
  simplePaginationActivation = null
  if (!activation || activation.event !== event || currentPage.value === activation.page) return
  const container = event.currentTarget as HTMLElement
  // 包装层冒泡发生在 Naive UI 原翻页之后；再等 Vue 更新，才检查按钮是否因到边界禁用。
  void nextTick(() => {
    const { button } = activation
    if (!isMobile.value || !button.isConnected || !button.disabled) return
    // 禁用按钮可能退焦到 BODY；若其他控件已接管焦点，不能把它抢回来。
    if (document.activeElement !== button && document.activeElement !== document.body) return
    container.querySelector<HTMLInputElement>('.n-pagination--simple input')?.focus({ preventScroll: true })
  })
}

watch([activeCategoryTab, selectedRace, selectedLocation, searchKeyword, sortBy], () => {
  resetPage()
})

const openMonsterDetail = (monster: any) => {
  activeMonster.value = monster
  showDetailModal.value = true
}
</script>

<style scoped>
/* 原生按钮随键盘焦点在局部滚动区显现，长标签不再撑出整页。 */
.monsters-category-tabs {
  overflow-x: auto;
  scroll-padding-inline: 3px;
}

.monsters-category-tabs :deep(.n-tabs-rail) {
  min-width: max-content;
}

.monsters-pagination-control {
  min-width: 28px;
  min-height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.monsters-pagination-control:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 4px;
}

.monsters-pagination-control:disabled {
  cursor: not-allowed;
}
</style>
