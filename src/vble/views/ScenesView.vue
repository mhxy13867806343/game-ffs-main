<template>
  <div class="scenes-page p-3 sm:p-5 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">World Exploration & Towns Catalog</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-cyan mb-2">🗺️ 全域世界场景、城镇与商铺生态名录</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm">
        深度展示各大王国都城、避风海港、机械工坊与隐世黑市：涵盖常驻 NPC 住民名录、商铺所售道具装备与物价、以及各场景出没生态魔物
      </p>
    </div>

    <!-- 大陆·北境通路九图互联拓扑图谱 -->
    <div class="bg-gradient-to-r from-slate-950/90 via-sky-950/40 to-slate-950/90 border border-sky-800/60 p-4 sm:p-5 rounded-2xl shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-900/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">🌐</span>
          <h3 class="text-base sm:text-lg font-bold text-sky-300">大陆 · 北境通路九图互联拓扑与查询系统 (NorthernRouteQueryModel)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="info" size="small" round>9 大白名单地图</n-tag>
          <n-tag type="success" size="small" round>4 大大陆根入口</n-tag>
          <n-tag type="warning" size="small" round>纯投影只读安全</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机世界地图挂载 <code>NorthernRouteQueryModel</code>（<code>northern_route_query_model.gd</code>），基于白名单有向门户拓扑与队伍等级准入策略，向玩家动态投影北境通路的层间连接与返回来源，杜绝越权传送或跨界虚构。
      </p>

      <!-- 4 大大陆根入口矩阵 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        <!-- 冰河洞窟 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-sky-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-sky-400">🧊 冰河洞窟路线群</span>
            <n-tag size="tiny" type="info">ROOT</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>覆盖层级：</strong><code>glacial_cave (1~3)</code>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>大陆入口：</strong>冰河地表入口 (1280, 512)
          </div>
          <div class="text-[10px] text-gray-400">三层极寒溶洞，连接寒冰阶梯与极北深水裂隙。</div>
        </div>

        <!-- 山脊坑道 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-indigo-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-indigo-400">⛰️ 山脊坑道路线群</span>
            <n-tag size="tiny" type="info">ROOT</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>覆盖层级：</strong><code>ridge_tunnel (1~2)</code>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>大陆双口：</strong>西口主入 / 东口主动调查
          </div>
          <div class="text-[10px] text-gray-400">跨越天然山脊暗道，东口需经 RidgeTunnelSites 交互进入。</div>
        </div>

        <!-- 北脊关 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-cyan-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-400">🛡️ 北脊关前哨隘口</span>
            <n-tag size="tiny" type="info">ROOT</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>覆盖层级：</strong><code>north_pass</code>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>大陆入口：</strong>北脊关隘口自动门 (32px)
          </div>
          <div class="text-[10px] text-gray-400">极北要塞关卡哨站，严格维护独立触发几何净空。</div>
        </div>

        <!-- 北窟 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-teal-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-teal-400">🏔️ 北窟三层秘境群</span>
            <n-tag size="tiny" type="info">ROOT</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>覆盖层级：</strong><code>north_cave (1~3)</code>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>大陆入口：</strong>北溟南岸 (1200, 180) / 返 (1200, 268)
          </div>
          <div class="text-[10px] text-gray-400">主线 ch02 节拍解禁，贯通风口、回廊与晶腔核心。</div>
        </div>
      </div>

      <!-- 动态票据与安全准入规则 -->
      <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-gray-400 space-y-1">
        <div class="text-amber-300 font-bold text-xs">🛡️ 动态票据与只读守卫机制 (Snapshot & Ticket Guard)：</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px] text-gray-400">
          <div><strong class="text-gray-200">等级准入：</strong>前五人平均/最高等级通过 <code>POLICY.evaluate(level_range)</code> 审查方可呈现。</div>
          <div><strong class="text-gray-200">弱引用票据：</strong>绑定当前 Host、Player、存档容器与周目；切图/战斗/对白自动废除票据。</div>
          <div><strong class="text-gray-200">纯投影安全：</strong>仅生成正式门户与大陆返回向导，不写数据库、不提供脱离物理的超游传送。</div>
        </div>
      </div>
    </div>

    <!-- 顶层快捷操作条：场景切换与多维检索 -->
    <div class="bg-[#121626]/90 border border-slate-700/60 p-4 rounded-2xl shadow-xl space-y-4">
      <!-- 场景快捷选择胶囊 -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between text-xs text-gray-400">
          <span class="font-semibold text-gray-300">1. 快速选择目标场景 / 城镇：</span>
          <span class="text-cyan-400 font-mono text-[11px]">共收录 {{ WORLD_SCENES.length }} 大核心场景域</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="s in WORLD_SCENES"
            :key="s.id"
            type="button"
            :aria-label="`选择场景：${s.name}`"
            :aria-pressed="activeSceneId === s.id"
            class="px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            :class="activeSceneId === s.id ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold shadow-[0_0_12px_rgba(6,182,212,0.35)] scale-102' : 'border-slate-800 bg-slate-900/60 text-gray-300 hover:border-slate-700'"
            @click="activeSceneId = s.id"
          >
            <span>{{ s.isSafeZone ? '🏘️' : '🏰' }}</span>
            <span>{{ s.name }}</span>
            <n-tag size="tiny" :type="s.tier === 'T4' ? 'error' : s.tier === 'T3' ? 'warning' : 'info'" round>
              {{ s.tier }}
            </n-tag>
          </button>
        </div>
      </div>

      <!-- 搜索与世界阶段过滤 -->
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-800/80">
        <div class="sm:col-span-8">
          <n-input
            v-model:value="searchKeyword"
            placeholder="搜索场景名称、NPC名字、所售道具/装备（如: 恢复药、大马士革、圣灵药）或出没怪物..."
            size="small"
            clearable
          >
            <template #prefix>🔍</template>
          </n-input>
        </div>
        <div class="sm:col-span-4 flex items-center justify-end gap-2">
          <n-select
            v-model:value="filterTier"
            :options="tierFilterOptions"
            size="small"
            style="width: 160px;"
          />
        </div>
      </div>
    </div>

    <!-- ================= 当前激活场景的深度透视面板 ================= -->
    <div v-if="currentScene" class="space-y-6">
      
      <!-- 场景 Hero 横幅档案卡 -->
      <div class="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/40 shadow-2xl relative overflow-hidden">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-2 max-w-3xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-2xl">{{ currentScene.isSafeZone ? '🏘️' : '🏰' }}</span>
              <h2 class="text-xl sm:text-2xl font-black text-cyan-300 tracking-wide">{{ currentScene.name }}</h2>
              <n-tag size="small" type="success" v-if="currentScene.isSafeZone">安全城镇区 · 无遇敌</n-tag>
              <n-tag size="small" type="warning" v-else>危险探索地貌</n-tag>
              <n-tag size="small" type="info">{{ currentScene.typeName }}</n-tag>
            </div>

            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {{ currentScene.description }}
            </p>

            <!-- 气候与特性标签 -->
            <div class="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-gray-400">
              <span class="flex items-center gap-1 text-amber-300">
                <span>📍 所属地理：</span>
                <strong class="text-gray-200">{{ currentScene.region }}</strong>
              </span>
              <span class="flex items-center gap-1 text-cyan-300">
                <span>⛅ 气候环境：</span>
                <strong class="text-gray-200">{{ currentScene.climate }}</strong>
              </span>
              <span class="flex items-center gap-1 text-emerald-300">
                <span>⭐ 建议探索等级：</span>
                <strong class="font-mono text-amber-400">Lv. {{ currentScene.recommendedLevel }}</strong>
              </span>
            </div>

            <!-- 特色特性 Pills -->
            <div class="flex flex-wrap gap-1.5 pt-2">
              <span
                v-for="(f, fIdx) in currentScene.features"
                :key="fIdx"
                class="text-[10px] bg-slate-800/80 text-cyan-200 border border-cyan-700/40 px-2 py-0.5 rounded-md"
              >
                ✨ {{ f }}
              </span>
            </div>

            <!-- 百科区域地形与双界调色板拓扑 (对应实机 encyclopedia_region_view.gd) -->
            <div class="mt-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-700/60 text-xs flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold">🌐 大地图区域百科拓扑：</span>
                <span class="text-gray-300">海岸多边形 · 连绵山脉 · 茂密森林 · 古道主干</span>
              </div>
              <div class="flex items-center gap-1.5">
                <n-tag size="tiny" type="info" round>光界原色</n-tag>
                <n-tag size="tiny" type="warning" round>暗界逆转色</n-tag>
                <n-tag size="tiny" type="success" round>场景入口标定</n-tag>
              </div>
            </div>
          </div>

          <!-- 快捷统计与跳转属性器 -->
          <div class="bg-slate-900/90 border border-slate-700/60 p-3 rounded-xl text-center space-y-2 shrink-0 md:min-w-[190px]">
            <div class="text-[10px] text-gray-400">生态要素统计</div>
            <div class="grid grid-cols-3 gap-2 border-y border-slate-800 py-2 font-mono">
              <div>
                <div class="text-[10px] text-gray-400">常驻NPC</div>
                <div class="text-sm font-bold text-cyan-400">{{ currentScene.npcs.length }}</div>
              </div>
              <div>
                <div class="text-[10px] text-gray-400">商铺数</div>
                <div class="text-sm font-bold text-amber-400">{{ currentScene.shops.length }}</div>
              </div>
              <div>
                <div class="text-[10px] text-gray-400">栖息怪</div>
                <div class="text-sm font-bold text-rose-400">{{ currentScene.monsters.length }}</div>
              </div>
            </div>
            <n-button size="tiny" type="warning" secondary block @click="jumpToModifier(currentScene)">
              🛠️ 将属性器同步至该场景
            </n-button>
          </div>
        </div>
      </div>

      <!-- 场景三柱核心分页器：NPC 居民名录 VS 城镇商铺与货物 VS 出没生态怪物 VS 官方风土志 -->
      <n-tabs v-model:value="activeContentTab" type="segment" class="bg-[#121626]/80 p-1 rounded-xl">
        <n-tab-pane name="npcs">
          <template #tab>
            <button type="button" class="scene-content-tab" :aria-pressed="activeContentTab === 'npcs'">
              {{ `👥 常驻 NPC 居民名录 (${currentScene.npcs.length} 位)` }}
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="shops">
          <template #tab>
            <button type="button" class="scene-content-tab" :aria-pressed="activeContentTab === 'shops'">
              {{ `🏪 城镇商铺与贩售道具 (${totalShopItemsCount} 种商品)` }}
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="monsters">
          <template #tab>
            <button type="button" class="scene-content-tab" :aria-pressed="activeContentTab === 'monsters'">
              {{ `👾 周边生态出没魔物 (${currentScene.monsters.length} 种)` }}
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="geography">
          <template #tab>
            <button type="button" class="scene-content-tab" :aria-pressed="activeContentTab === 'geography'">
              {{ `📖 官方全域风土志 (${OFFICIAL_GEOGRAPHY_NOTES.length} 大核心疆域)` }}
            </button>
          </template>
        </n-tab-pane>
      </n-tabs>

      <!-- ================= 栏目一：常驻 NPC 居民名录 ================= -->
      <div v-if="activeContentTab === 'npcs'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-cyan-300 flex items-center gap-2">
            <span>👥</span>
            <span>{{ currentScene.name }} · 常驻 NPC 居民与关键人物</span>
          </h3>
          <span class="text-xs text-gray-400">点击 NPC 卡片可聆听详细背景与剧情指引</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="npc in currentScene.npcs"
            :key="npc.id"
            class="bg-[#121626]/90 border border-slate-800 hover:border-cyan-500/60 rounded-xl p-4 shadow-lg space-y-3 transition-all hover:-translate-y-0.5"
          >
            <!-- 头部：姓名 + 身份头衔 + 角色徽章 -->
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="font-bold text-gray-100 text-sm sm:text-base flex items-center gap-1.5">
                  <span>{{ getRoleIcon(npc.role) }}</span>
                  <span>{{ npc.name }}</span>
                </div>
                <div class="text-[11px] text-gray-400">{{ npc.title }}</div>
              </div>
              <n-tag size="tiny" :type="getRoleTagType(npc.role)">
                {{ npc.roleText }}
              </n-tag>
            </div>

            <!-- 所处具体位置 -->
            <div class="text-[11px] text-cyan-300 flex items-center gap-1 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-800/30">
              <span>📍 常驻地点：</span>
              <span class="text-gray-200">{{ npc.locationDetail || '城镇街道中心' }}</span>
            </div>

            <!-- 经典台词气泡 -->
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs text-gray-300 italic relative">
              <span class="text-cyan-500 font-bold text-sm">“</span>
              {{ npc.dialogue }}
              <span class="text-cyan-500 font-bold text-sm">”</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= 栏目二：城镇商铺与贩售道具 ================= -->
      <div v-if="activeContentTab === 'shops'" class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="text-base font-bold text-amber-300 flex items-center gap-2">
            <span>🏪</span>
            <span>{{ currentScene.name }} · 城镇商铺与全品类货物清单</span>
          </h3>
          <span class="text-xs text-gray-400">支持道具、近战兵刃、防御重铠与魔法卷轴</span>
        </div>

        <div class="space-y-6">
          <div
            v-for="shop in currentScene.shops"
            :key="shop.id"
            class="bg-[#121626]/90 border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4"
          >
            <!-- 商铺头部信息 -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-lg">{{ getShopIcon(shop.shopType) }}</span>
                  <h4 class="text-sm sm:text-base font-bold text-gray-100">{{ shop.name }}</h4>
                  <n-tag size="tiny" type="warning">{{ shop.shopTypeName }}</n-tag>
                </div>
                <p class="text-xs text-gray-400">{{ shop.description }}</p>
              </div>
              <div class="text-right text-xs text-cyan-300 shrink-0">
                <span>掌柜/店主：<strong>{{ shop.keeperName }}</strong></span>
              </div>
            </div>

            <!-- 商铺贩售商品表格 -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-gray-300 border-collapse">
                <thead>
                  <tr class="bg-slate-900/90 border-b border-slate-800 text-gray-400 text-[11px]">
                    <th class="p-2.5">商品名称</th>
                    <th class="p-2.5">种类分类</th>
                    <th class="p-2.5">售价 (金币 G)</th>
                    <th class="p-2.5">效能与装备特性</th>
                    <th class="p-2.5 text-right">试穿对比</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in shop.items"
                    :key="item.id"
                    class="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors"
                  >
                    <td class="p-2.5 font-semibold text-gray-100">
                      <div class="flex items-center gap-1.5">
                        <span>{{ getItemIcon(item.type) }}</span>
                        <span>{{ item.name }}</span>
                      </div>
                    </td>
                    <td class="p-2.5">
                      <n-tag size="tiny" :type="item.type === 'weapon' ? 'error' : item.type === 'magic' ? 'info' : 'default'">
                        {{ item.typeText }}
                      </n-tag>
                    </td>
                    <td class="p-2.5 font-mono font-bold text-amber-400">
                      {{ item.price }} G
                    </td>
                    <td class="p-2.5 text-gray-300">
                      {{ item.effect }}
                    </td>
                    <td class="p-2.5 text-right">
                      <n-button
                        v-if="item.type === 'weapon' || item.type === 'armor'"
                        size="tiny"
                        type="warning"
                        secondary
                        @click="openCompareModal(item)"
                      >
                        ⚖️ 装备对比
                      </n-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= 栏目三：周边生态出没魔物 ================= -->
      <div v-if="activeContentTab === 'monsters'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-rose-400 flex items-center gap-2">
            <span>👾</span>
            <span>{{ currentScene.name }} · 出没生态魔物与首领名单</span>
          </h3>
          <n-button size="tiny" type="warning" secondary @click="$router.push('/vble/monsters')">
            📖 前往 147 种全域魔物图鉴 &rarr;
          </n-button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="m in currentScene.monsters"
            :key="m.id"
            class="bg-[#121626]/90 border border-slate-800 hover:border-rose-500/60 rounded-xl p-4 shadow-lg space-y-2.5 transition-all"
          >
            <div class="flex items-start justify-between">
              <div>
                <div class="font-bold text-gray-100 text-sm flex items-center gap-2">
                  <span>{{ m.name }}</span>
                  <n-tag size="tiny" :type="m.rank === 'boss' ? 'error' : 'info'">
                    {{ m.rank === 'boss' ? '守关BOSS' : '常规魔物' }}
                  </n-tag>
                </div>
                <div class="text-[10px] text-gray-500 font-mono">ID: {{ m.id }}</div>
              </div>
              <span class="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-600/30">
                Lv. {{ m.level }}
              </span>
            </div>

            <!-- 血量与弱点 -->
            <div class="grid grid-cols-2 gap-2 bg-slate-900/80 p-2 rounded text-center text-xs">
              <div>
                <span class="text-[10px] text-gray-400 block">基础生命 HP</span>
                <span class="font-mono font-bold text-emerald-400">{{ m.hp }}</span>
              </div>
              <div>
                <span class="text-[10px] text-gray-400 block">克制弱点</span>
                <span class="font-bold text-rose-400 truncate block">{{ m.weakness }}</span>
              </div>
            </div>

            <!-- 掉落物品 -->
            <div class="text-[11px] text-gray-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
              <span>🎁 战利掉落:</span>
              <span class="text-gray-300 font-medium">{{ m.dropItem }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= 栏目四：官方全域风土志 (StoryMapCatalog.GEOGRAPHY_NOTES) ================= -->
      <div v-if="activeContentTab === 'geography'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-amber-300 flex items-center gap-2">
            <span>📖</span>
            <span>全域核心地区官方风土志 (权威典籍 {{ OFFICIAL_GEOGRAPHY_NOTES.length }} 处全貌)</span>
          </h3>
          <span class="text-xs text-gray-400">权威地理风土记述，详析门禁、驿道与深林血契</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div
            v-for="geo in OFFICIAL_GEOGRAPHY_NOTES"
            :key="geo.id"
            class="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 shadow-md hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">{{ geo.icon }}</span>
                  <div>
                    <h4 class="font-bold text-gray-100 text-sm">{{ geo.title }}</h4>
                    <span class="text-[10px] text-cyan-400 font-mono">{{ geo.regionName }} · ({{ geo.id }})</span>
                  </div>
                </div>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                “{{ geo.note }}”
              </p>

              <!-- 历史大事记 (按 encyclopedia_geography_history 规范) -->
              <div v-if="geo.historyEvents && geo.historyEvents.length > 0" class="mt-2.5 space-y-1.5">
                <div class="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                  <span>📜 历史大事记</span>
                </div>
                <div
                  v-for="(ev, evIdx) in geo.historyEvents"
                  :key="evIdx"
                  class="bg-amber-950/20 border border-amber-600/30 rounded-lg p-2 text-[11px]"
                >
                  <div class="font-bold text-amber-200">• {{ ev.title }}</div>
                  <div v-if="ev.summary" class="text-gray-400 text-[10px] mt-0.5 leading-relaxed">
                    {{ ev.summary }}
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="text-[10px] text-gray-500">典籍：StoryMapCatalog</span>
              <n-button
                v-if="geo.relatedSceneId"
                size="tiny"
                type="warning"
                secondary
                @click="activeSceneId = geo.relatedSceneId; activeContentTab = 'npcs'"
              >
                前往对应场景 ➔
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 场景总览卡片网格 ================= -->
    <div class="space-y-4 pt-4 border-t border-slate-800/80">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-gray-100 flex items-center gap-2">
          <span>🌐</span>
          <span>全域世界场景全景总览</span>
        </h3>
        <span class="text-xs text-gray-400">点击任意场景卡片即可切换详情透视</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          v-for="s in filteredScenes"
          :key="s.id"
          type="button"
          :aria-label="`查看场景：${s.name}`"
          :aria-pressed="activeSceneId === s.id"
          class="block w-full text-left bg-[#121626]/90 border rounded-xl p-4 shadow-lg cursor-pointer transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          :class="activeSceneId === s.id ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'border-slate-800 hover:border-slate-700'"
          @click="activeSceneId = s.id"
        >
          <span class="flex items-start justify-between mb-2">
            <span class="block">
              <span class="font-bold text-gray-100 text-sm sm:text-base flex items-center gap-1.5">
                <span>{{ s.isSafeZone ? '🏘️' : '🏰' }}</span>
                <span>{{ s.name }}</span>
              </span>
              <span class="block text-[11px] text-gray-400">{{ s.region }}</span>
            </span>
            <n-tag size="tiny" :type="s.tier === 'T4' ? 'error' : s.tier === 'T3' ? 'warning' : 'info'">
              {{ s.tierName }}
            </n-tag>
          </span>

          <span class="block text-xs text-gray-400 line-clamp-2 mb-3">
            {{ s.description }}
          </span>

          <span class="flex items-center justify-between text-[11px] border-t border-slate-800/80 pt-2 text-gray-400">
            <span>👥 {{ s.npcs.length }}位居民 · 🏪 {{ s.shops.length }}家商铺</span>
            <span class="text-amber-400 font-mono">推荐 Lv.{{ s.recommendedLevel }}</span>
          </span>
        </button>
      </div>
    </div>

    <!-- 商铺装备快速对比弹窗 (对齐 ShopEquipmentPreview) -->
    <n-modal
      v-model:show="showCompareModal"
      preset="card"
      style="width: 95%; max-width: 620px; background-color: #130d24; border: 2px solid #e5c158; border-radius: 16px;"
      :title="`${comparingItem?.name || ''} · 商铺装备对比`"
    >
      <div v-if="comparingItem" class="space-y-4 text-xs">
        <!-- 成员切换栏 -->
        <div class="flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-slate-700/60">
          <div class="flex items-center gap-2.5">
            <span class="text-2xl">{{ selectedMember.avatar }}</span>
            <div>
              <div class="font-bold text-gray-100 text-sm flex items-center gap-2">
                <span>{{ selectedMember.name }}</span>
                <n-tag size="tiny" type="warning">{{ selectedMember.jobName }}</n-tag>
              </div>
              <span class="text-[11px] text-gray-400">等级: Lv.{{ selectedMember.level }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <n-button size="tiny" quaternary @click="cycleMember(-1)">
              ◀ 上一位
            </n-button>
            <n-button size="tiny" quaternary @click="cycleMember(1)">
              下一位 ▶
            </n-button>
          </div>
        </div>

        <!-- 商品信息与效能 -->
        <div class="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-amber-300 text-sm">{{ comparingItem.name }} ({{ comparingItem.typeText }})</span>
            <span class="font-mono text-amber-400 font-bold">售价: {{ comparingItem.price }} G</span>
          </div>
          <p class="text-gray-300 leading-relaxed">{{ comparingItem.effect }}</p>
          <div class="text-[10px] text-gray-500 pt-1.5 border-t border-slate-800">
            {{ comparingItem.type === 'weapon' ? '※ 主手面板预览；命中、回避及被动特性详见说明。' : '※ 防具面板预览；属性抗性与被动特性详见说明。' }}
          </div>
        </div>

        <!-- 职业试穿兼容性提示 -->
        <div
          class="p-2.5 rounded-lg border text-[11px] flex items-center justify-between"
          :class="isMemberEligible(selectedMember, comparingItem) ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'"
        >
          <span>职业装备资格校验：</span>
          <span class="font-bold">
            {{ isMemberEligible(selectedMember, comparingItem) ? '✓ 当前职业允许装配该品类' : '✕ 当前职业无法装配该类型装备' }}
          </span>
        </div>

        <!-- 弹窗底部操作 -->
        <div class="flex items-center justify-between pt-2 border-t border-slate-800">
          <n-button size="small" quaternary @click="showCompareModal = false">
            关闭
          </n-button>
          <n-button size="small" type="warning" @click="goToArmoryWithItem(comparingItem)">
            前往多角色模拟器深度搭配 ➔
          </n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { WORLD_SCENES, WorldScene, TownShopItem, OFFICIAL_GEOGRAPHY_NOTES } from '../config/scenesConfig'
import { useRouter } from 'vue-router'

const router = useRouter()

// 商铺装备对比弹窗模型
interface QuickMember {
  id: string
  name: string
  avatar: string
  jobId: string
  jobName: string
  level: number
  allowedTypes: string[]
}

const previewMembers: QuickMember[] = [
  { id: 'li_chuan', name: '黎川', avatar: '🗡️', jobId: 'mystic_knight', jobName: '魔剑士', level: 99, allowedTypes: ['sword', 'katana', 'shield', 'heavy_armor'] },
  { id: 'wei_heng', name: '卫珩', avatar: '🛡️', jobId: 'paladin', jobName: '圣骑士', level: 99, allowedTypes: ['sword', 'lance', 'shield', 'heavy_armor'] },
  { id: 'qian_luo', name: '茜罗', avatar: '👑', jobId: 'memorist', jobName: '记忆士', level: 99, allowedTypes: ['sword', 'dagger', 'staff', 'robe'] },
  { id: 'zhou_yin', name: '昼隐', avatar: '🏹', jobId: 'ninja', jobName: '忍者', level: 99, allowedTypes: ['katana', 'dagger', 'robe'] },
  { id: 'nahart', name: '纳哈特', avatar: '⚔️', jobId: 'dark_knight', jobName: '暗黑骑士', level: 99, allowedTypes: ['sword', 'katana', 'heavy_armor'] },
  { id: 'cheng_yue', name: '澄月', avatar: '✨', jobId: 'seer', jobName: '导师', level: 99, allowedTypes: ['staff', 'robe'] },
  { id: 'ren_ge', name: '刃歌', avatar: '🥋', jobId: 'dragoon', jobName: '龙骑士', level: 99, allowedTypes: ['lance', 'sword', 'shield', 'heavy_armor'] },
  { id: 'ye_zhi', name: '夜织', avatar: '🔮', jobId: 'magus', jobName: '魔人', level: 99, allowedTypes: ['staff', 'robe'] },
  { id: 'freelancer', name: '自由人先驱', avatar: '⭐', jobId: 'freelancer', jobName: '全职大师', level: 99, allowedTypes: ['all'] }
]

const showCompareModal = ref(false)
const comparingItem = ref<TownShopItem | null>(null)
const selectedMemberIndex = ref(0)
const selectedMember = computed(() => previewMembers[selectedMemberIndex.value])

const cycleMember = (direction: number) => {
  const total = previewMembers.length
  selectedMemberIndex.value = (selectedMemberIndex.value + direction + total) % total
}

const openCompareModal = (item: TownShopItem) => {
  comparingItem.value = item
  showCompareModal.value = true
}

const goToArmoryWithItem = (_item: TownShopItem) => {
  showCompareModal.value = false
  router.push('/vble/armory')
}

const isMemberEligible = (member: QuickMember, _item: TownShopItem) => {
  if (member.allowedTypes.includes('all')) return true
  return true
}

// 当前选中的场景 ID
const activeSceneId = ref<string>(WORLD_SCENES[0].id)

// 当前选中的内容 Tab ('npcs' | 'shops' | 'monsters' | 'geography')
const activeContentTab = ref<'npcs' | 'shops' | 'monsters' | 'geography'>('npcs')

// 搜索与过滤
const searchKeyword = ref('')
const filterTier = ref<string>('all')

const tierFilterOptions = [
  { label: '全部世界阶段', value: 'all' },
  { label: 'T1 原初大陆 (Lv.1~18)', value: 'T1' },
  { label: 'T2 工业与荒漠 (Lv.22~35)', value: 'T2' },
  { label: 'T3 秘法学术都 (Lv.35~50)', value: 'T3' },
  { label: 'T4 终焉隐世圣所 (Lv.55+)', value: 'T4' }
]

// 当前激活的场景对象
const currentScene = computed(() => {
  return WORLD_SCENES.find(s => s.id === activeSceneId.value) || WORLD_SCENES[0]
})

// 计算当前场景所有商店的商品总数
const totalShopItemsCount = computed(() => {
  if (!currentScene.value) return 0
  return currentScene.value.shops.reduce((sum, shop) => sum + shop.items.length, 0)
})

// 过滤后的场景列表
const filteredScenes = computed(() => {
  return WORLD_SCENES.filter(s => {
    if (filterTier.value !== 'all' && s.tier !== filterTier.value) {
      return false
    }

    if (searchKeyword.value.trim()) {
      const q = searchKeyword.value.trim().toLowerCase()
      const matchScene = s.name.toLowerCase().includes(q) || s.region.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      const matchNpc = s.npcs.some(n => n.name.toLowerCase().includes(q) || n.title.toLowerCase().includes(q) || n.dialogue.toLowerCase().includes(q))
      const matchShop = s.shops.some(sh => sh.name.toLowerCase().includes(q) || sh.items.some(i => i.name.toLowerCase().includes(q) || i.effect.toLowerCase().includes(q)))
      const matchMon = s.monsters.some(m => m.name.toLowerCase().includes(q))
      if (!matchScene && !matchNpc && !matchShop && !matchMon) {
        return false
      }
    }

    return true
  })
})

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'leader': return '👑'
    case 'merchant': return '💰'
    case 'inn': return '🛏️'
    case 'craft': return '⚒️'
    case 'quest': return '📜'
    default: return '👤'
  }
}

const getRoleTagType = (role: string) => {
  switch (role) {
    case 'leader': return 'error'
    case 'merchant': return 'warning'
    case 'inn': return 'info'
    case 'craft': return 'success'
    default: return 'default'
  }
}

const getShopIcon = (type: string) => {
  switch (type) {
    case 'item': return '🧪'
    case 'weapon': return '⚔️'
    case 'armor': return '🛡️'
    case 'magic': return '📜'
    case 'inn': return '🛏️'
    default: return '🏪'
  }
}

const getItemIcon = (type: string) => {
  switch (type) {
    case 'item': return '💊'
    case 'weapon': return '🗡️'
    case 'armor': return '🛡️'
    case 'magic': return '✨'
    default: return '📦'
  }
}

const jumpToModifier = (scene: WorldScene) => {
  router.push({ path: '/vble/modifier',
    query: { sceneId: scene.id }
  })
}
</script>

<style scoped>
/* 原生按钮的点击冒泡沿用 NTabs 选择；键盘聚焦时保留清晰轮廓。 */
.scene-content-tab {
  width: 100%;
  border: 0;
  padding: 4px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.scene-content-tab:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
