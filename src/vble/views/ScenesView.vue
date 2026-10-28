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

    <!-- 天空之城港口与云海空中接驳工程大典 (基于 Godot SKY_CITY_PORT_ENTRY_DESIGN_2026-10-23.md) -->
    <div class="bg-gradient-to-r from-slate-950/90 via-cyan-950/40 to-slate-950/90 border border-cyan-800/60 p-4 sm:p-5 rounded-2xl shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-900/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">🛸</span>
          <h3 class="text-base sm:text-lg font-bold text-cyan-300">天空之城港口与云海空中接驳工程大典 (Sky City Port & Entry Design)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="info" size="small" round>sky_city_port (1280×960)</n-tag>
          <n-tag type="warning" size="small" round>飞空艇独立空中接驳</n-tag>
          <n-tag type="success" size="small" round>物理与美术严格分离</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机空域十五景核心节点 <code>sky_city_port</code>，严格依循 2026-10-23 官方批准布局。搭载独立的空中接驳跳板与步行前场，必须校验 <code>WorldTravelData.has_airship()</code> 或 <code>ch06_warship_core</code> 战舰核心里程碑方可准入，杜绝越级空降。
      </p>

      <!-- 港口核心几何布局与坐标矩阵 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        <!-- 1. 主浮台地面 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-cyan-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300">🧱 主浮台可走地面</span>
            <n-tag size="tiny" type="info">主区域</n-tag>
          </div>
          <div class="text-[11px] text-gray-400 font-mono">矩形：[160, 256, 960, 576]</div>
          <p class="text-[10px] text-gray-400">主要步行地面，按 32 格整齐对齐；外围为高空云海实体不可通行区。</p>
        </div>

        <!-- 2. 南接驳跳板 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-sky-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-sky-300">⚓ 南接驳跳板与返艇</span>
            <n-tag size="tiny" type="warning">接驳口</n-tag>
          </div>
          <div class="text-[11px] text-gray-400 font-mono">跳板：[544, 832, 192, 96]</div>
          <p class="text-[10px] text-gray-400">宽 192px 与飞空艇对接。入港点 (640, 768)，返艇交互点 (640, 848)。</p>
        </div>

        <!-- 3. 中轴净空走廊 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-indigo-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-indigo-300">🚶 中轴连续净空走廊</span>
            <n-tag size="tiny" type="success">主干道</n-tag>
          </div>
          <div class="text-[11px] text-gray-400 font-mono">净空：[544, 352, 192, 448]</div>
          <p class="text-[10px] text-gray-400">连接接驳跳板与北入城前场的通行主廊，严禁堆放货箱或 NPC 阻挡动线。</p>
        </div>

        <!-- 4. 北入城口 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-amber-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300">🏛️ 北入城门与中央广场</span>
            <n-tag size="tiny" type="error">未来拓扑</n-tag>
          </div>
          <div class="text-[11px] text-gray-400 font-mono">入城：(640, 304) · 返：(640, 400)</div>
          <p class="text-[10px] text-gray-400">面向未来中央广场 (sky_city_central_plaza)，未开启前安全封闭。</p>
        </div>
      </div>

      <!-- 工程准则与资格审查 -->
      <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-gray-400 space-y-1">
        <div class="text-cyan-300 font-bold text-xs">🛡️ 空域接驳与安全审查底层规范：</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px] text-gray-400">
          <div><strong class="text-gray-200">载具准入：</strong>必须拥有 <code>has_airship</code> 航行许可，严禁以步行直达或绕过暴风绝壁前置。</div>
          <div><strong class="text-gray-200">几何避让：</strong>北门与南跳板返回站位均设置 80px 安全间距，彻底阻断进门即踩门的回弹死循环。</div>
          <div><strong class="text-gray-200">视差云海：</strong>采用多层 Parallax 云海远景，背景不生成地面碰撞，确保物理与渲染清晰解耦。</div>
        </div>
      </div>
    </div>

    <!-- 🏰 世界场景城镇全景漫游与分支剧情对白派遣工坊 (Settlement Interactive Dialogue & Exploration Studio) -->
    <div class="bg-gradient-to-br from-slate-950/95 via-sky-950/40 to-slate-950/90 border border-sky-500/50 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden">
      <!-- 装饰背景 -->
      <div class="absolute -right-20 -bottom-20 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 头部与核心标签 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-900/50 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🏛️</span>
            <h3 class="text-lg sm:text-xl font-black text-sky-300">城镇全景漫游与分支剧情对白派遣工坊 (Settlement Dialogue Studio)</h3>
            <n-tag type="info" size="small" round strong>全交互模拟</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            亲历经典城镇的生活切片：前往酒馆试炼钢琴、投宿旅馆夜宿长谈、租借陆行鸟巡礼，并与关键 NPC 展开多分支互动博弈！
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <n-tag type="warning" size="small" round>
            🎹 钢琴造诣: {{ pianoMasteryScore }}/8 首 ({{ getPianoRankName(pianoMasteryScore) }})
          </n-tag>
          <n-tag type="success" size="small" round>
            ⭐ 城镇声望: {{ townReputation }} 勋点
          </n-tag>
        </div>
      </div>

      <!-- 城镇五大核心设施交互区 -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <button
          v-for="fac in townFacilities"
          :key="fac.id"
          type="button"
          class="p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between space-y-1 relative group"
          :class="activeFacility === fac.id
            ? 'bg-sky-900/40 border-sky-400 shadow-md shadow-sky-500/20 text-white'
            : 'bg-slate-900/80 border-slate-800 text-gray-300 hover:border-slate-700 hover:bg-slate-850'"
          @click="selectFacility(fac.id)"
        >
          <div class="flex items-center justify-between">
            <span class="text-xl group-hover:scale-110 transition-transform">{{ fac.icon }}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded font-mono" :class="fac.badgeColor">{{ fac.badge }}</span>
          </div>
          <div class="text-xs font-bold pt-1">{{ fac.name }}</div>
          <div class="text-[10px] text-gray-400 line-clamp-1">{{ fac.desc }}</div>
        </button>
      </div>

      <!-- 设施深度互动面板与 NPC 分支对白视窗 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 左侧：设施交互与动作沙盘 -->
        <div class="lg:col-span-7 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <!-- 旅馆投宿 -->
          <template v-if="activeFacility === 'inn'">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🛏️</span> 沉睡的旅馆与夜宿长谈 (Rest & Dreamscape)
              </span>
              <span class="text-[11px] text-gray-400">投宿费用: 10 Gil / 全队</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">
              炉火轻摇，温暖的羽绒床榻驱散全员旅途劳顿。夜幕降临时，光之战士们围坐壁炉旁，倾听各自故乡的过往羁绊。
            </p>
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <n-button type="warning" size="medium" secondary @click="restAtInn">
                <template #icon><span>💤</span></template>
                支付 10 Gil 投宿并回复全员 HP/MP
              </n-button>
              <n-button type="info" size="medium" secondary @click="triggerDreamConversation">
                <template #icon><span>🌙</span></template>
                触发深夜营火回忆对白
              </n-button>
            </div>
          </template>

          <!-- 喧嚣酒馆与钢琴试炼 -->
          <template v-else-if="activeFacility === 'tavern'">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>🍺</span> 喧嚣酒馆与古典钢琴试炼 (Piano Virtuoso Trial)
              </span>
              <span class="text-[11px] text-amber-400 font-mono">第 {{ Math.min(8, pianoMasteryScore + 1) }} 乐章</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">
              酒馆角落静静陈设着一台黑檀木立式钢琴。在各大陆城镇弹奏完所有 8 架钢琴，即可在幻影之村领悟最高阶吟游诗人乐章【英雄之歌 (Hero Song)】！
            </p>
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-400">当前演奏曲目：</span>
                <span class="font-bold text-cyan-300">{{ getCurrentPianoTrack(pianoMasteryScore) }}</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  class="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-300"
                  :style="{ width: `${(pianoMasteryScore / 8) * 100}%` }"
                ></div>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <n-button type="primary" size="medium" secondary :disabled="pianoMasteryScore >= 8" @click="playPianoStep">
                <template #icon><span>🎹</span></template>
                {{ pianoMasteryScore >= 8 ? '已成就全域钢琴宗师！' : '抚琴弹奏当前曲目 (+1 造诣)' }}
              </n-button>
              <n-button size="medium" secondary @click="buyTavernAle">
                <template #icon><span>🍻</span></template>
                向酒保买杯麦酒打听八卦 (5 Gil)
              </n-button>
            </div>
          </template>

          <!-- 皇家军械与商铺 -->
          <template v-else-if="activeFacility === 'armory'">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <span>⚔️</span> 精铸军械库与商队物产 (Armory & Trading Post)
              </span>
              <span class="text-[11px] text-emerald-400">官方正品行货</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">
              货架上摆满当前世界阶段顶尖的附魔兵刃、厚重轻骑铠甲与以太水晶试剂，工匠正挥锤淬火打造神兵。
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              <div
                v-for="item in featuredShopItems"
                :key="item.name"
                class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-1"
                @click="inspectShopItem(item)"
              >
                <div class="flex justify-between items-center text-xs">
                  <span class="font-bold text-gray-200">{{ item.name }}</span>
                  <span class="text-amber-400 font-mono text-[11px]">{{ item.price }}G</span>
                </div>
                <div class="text-[10px] text-gray-400 line-clamp-1">{{ item.desc }}</div>
              </div>
            </div>
          </template>

          <!-- 陆行鸟驿站 -->
          <template v-else-if="activeFacility === 'chocobo'">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-yellow-300 flex items-center gap-1.5">
                <span>🐣</span> 森林陆行鸟厩舍 (Chocobo Outpost)
              </span>
              <span class="text-[11px] text-yellow-400">大地图高速巡礼</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">
              这里饲养着性格温顺的普通黄陆行鸟与能越过崇山峻岭的飞翔黑陆行鸟。骑乘期间完全免疫大地图任何魔物随机遭遇！
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3 rounded-lg bg-yellow-950/20 border border-yellow-800/40 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-yellow-300">🟡 敏捷黄陆行鸟</span>
                  <n-tag size="tiny" type="warning">平原疾驰</n-tag>
                </div>
                <p class="text-[11px] text-gray-400">移动速度 +100%，零遭遇战，返程下鸟后自动跑回森林。</p>
                <n-button size="small" type="warning" secondary @click="mountChocobo('yellow')">骑乘启程 (免费)</n-button>
              </div>
              <div class="p-3 rounded-lg bg-purple-950/20 border border-purple-800/40 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-purple-300">🟣 极光黑陆行鸟</span>
                  <n-tag size="tiny" type="info">低空滑翔</n-tag>
                </div>
                <p class="text-[11px] text-gray-400">能越过险峻山岳与河流密林，仅能在隐秘陆行鸟森林降落。</p>
                <n-button size="small" type="info" secondary @click="mountChocobo('black')">骑乘滑翔 (免费)</n-button>
              </div>
            </div>
          </template>

          <!-- 领主议政厅 -->
          <template v-else>
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <span>👑</span> 王座大殿与领主议政厅 (Lord Council Hall)
              </span>
              <span class="text-[11px] text-rose-400">国家决策中枢</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">
              王城重臣与宫廷学者在此商议水晶异常与边境防务。出示徽记可接取王国密令或换取通行批文。
            </p>
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <n-button type="error" size="medium" secondary @click="reportToKing">
                <template #icon><span>📜</span></template>
                向城主呈递各地水晶碎裂调查报告
              </n-button>
              <n-button type="info" size="medium" secondary @click="requestCastlePass">
                <template #icon><span>🗝️</span></template>
                申请皇家藏宝阁金钥匙批文
              </n-button>
            </div>
          </template>
        </div>

        <!-- 右侧：多分支 NPC 沉浸对白与决策视窗 -->
        <div class="lg:col-span-5 p-4 rounded-xl bg-slate-950/90 border border-sky-900/40 flex flex-col justify-between space-y-4 shadow-xl">
          <!-- NPC 头像与身份名片 -->
          <div class="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div class="w-12 h-12 rounded-xl bg-sky-900/40 border border-sky-400/50 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              {{ activeNpc.avatar }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-white truncate">{{ activeNpc.name }}</h4>
                <n-tag size="tiny" type="info" round>{{ activeNpc.role }}</n-tag>
              </div>
              <p class="text-[11px] text-cyan-300 truncate mt-0.5">{{ activeNpc.title }}</p>
            </div>
          </div>

          <!-- 对白气泡与文字流 -->
          <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-gray-200 leading-relaxed relative min-h-[90px] flex items-center">
            <span class="absolute -top-2 left-6 w-3 h-3 bg-slate-900 border-l border-t border-slate-800 rotate-45"></span>
            <div class="italic">
              “{{ activeNpcDialogueText }}”
            </div>
          </div>

          <!-- 分支回应选项选择舵 -->
          <div class="space-y-2">
            <div class="text-[11px] font-bold text-gray-400 flex items-center gap-1">
              <span>💬</span> 请选择光之战士的应答态度：
            </div>
            <div class="space-y-1.5">
              <button
                v-for="(choice, cIdx) in activeNpcChoices"
                :key="cIdx"
                type="button"
                class="w-full p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between text-xs"
                :class="selectedChoiceIdx === cIdx
                  ? 'bg-sky-900/50 border-sky-400 text-sky-200 font-bold'
                  : 'bg-slate-900/70 border-slate-800 text-gray-300 hover:bg-slate-800 hover:border-slate-700'"
                @click="confirmChoice(cIdx)"
              >
                <span class="flex items-center gap-2">
                  <span class="text-cyan-400 font-mono">{{ ['A', 'B', 'C'][cIdx] }}.</span>
                  <span>{{ choice.text }}</span>
                </span>
                <span class="text-[10px] text-amber-400 font-mono">{{ choice.rewardHint }}</span>
              </button>
            </div>
          </div>

          <!-- 换一位 NPC 交流 -->
          <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span class="text-gray-500">城镇共驻留 {{ currentTownNpcPool.length }} 位关键居民</span>
            <button
              type="button"
              class="text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
              @click="nextNpcInTown"
            >
              寻找下一位居民 &rarr;
            </button>
          </div>
        </div>
      </div>

      <!-- 实机城镇事件即时回响 -->
      <div class="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2 text-gray-300">
          <span class="text-amber-400 text-base">🔔</span>
          <span class="font-bold text-amber-300">城镇纪实回响：</span>
          <span class="text-gray-200">{{ latestTownEvent }}</span>
        </div>
        <div class="text-[11px] text-gray-500 font-mono">
          底层契约: settlement_dialogue_dispatcher.gd
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

// ==========================================
// 🏛️ 世界场景城镇全景漫游与分支剧情对白派遣工坊
// ==========================================
interface FacilityInfo {
  id: 'inn' | 'tavern' | 'armory' | 'chocobo' | 'lord'
  name: string
  icon: string
  badge: string
  badgeColor: string
  desc: string
}

const townFacilities: FacilityInfo[] = [
  { id: 'tavern', name: '喧嚣酒馆', icon: '🍺', badge: '钢琴/情报', badgeColor: 'bg-cyan-500/20 text-cyan-300', desc: '打听大陆秘辛与古典钢琴试炼' },
  { id: 'inn', name: '旅馆夜宿', icon: '🛏️', badge: '全员恢复', badgeColor: 'bg-amber-500/20 text-amber-300', desc: '消除状态异常与回复HP/MP' },
  { id: 'armory', name: '商会军械', icon: '⚔️', badge: '兵器装备', badgeColor: 'bg-emerald-500/20 text-emerald-300', desc: '选购高阶防具与附魔神兵' },
  { id: 'chocobo', name: '陆行鸟厩', icon: '🐣', badge: '无遇敌巡航', badgeColor: 'bg-yellow-500/20 text-yellow-300', desc: '租借敏捷黄陆行鸟与飞翔黑陆行鸟' },
  { id: 'lord', name: '王座大殿', icon: '👑', badge: '领主密令', badgeColor: 'bg-rose-500/20 text-rose-300', desc: '面见城主重臣并领取国家委托' }
]

const activeFacility = ref<'inn' | 'tavern' | 'armory' | 'chocobo' | 'lord'>('tavern')
const pianoMasteryScore = ref(3)
const townReputation = ref(210)
const latestTownEvent = ref('漫步在石板街道上，酒馆传出悠扬琴声，商铺铁匠挥锤作响。')

const pianoTracks = [
  '图尔村初学者小调 (Tule Etude)',
  '卡纳克港口夜曲 (Karnak Port Nocturne)',
  '杰科尔古都回旋曲 (Jachol Rondo)',
  '克雷斯塔幻想曲 (Crescent Fantasy)',
  '穆尔村森林奏鸣曲 (Moore Sonata)',
  '库尔格王城行进曲 (Kelb March)',
  '幻影小镇交响赋格 (Mirage Fugue)',
  '太古裂隙·英雄之歌 (Master Hero Song)'
]

const getPianoRankName = (score: number) => {
  if (score >= 8) return '全域钢琴宗师 (Master Pianist)'
  if (score >= 6) return '宫廷乐师 (Court Virtuoso)'
  if (score >= 4) return '熟练琴手 (Skilled Player)'
  if (score >= 2) return '进阶学徒 (Apprentice)'
  return '初学童蒙 (Novice)'
}

const getCurrentPianoTrack = (score: number) => {
  return pianoTracks[Math.min(pianoTracks.length - 1, score)]
}

const selectFacility = (id: 'inn' | 'tavern' | 'armory' | 'chocobo' | 'lord') => {
  activeFacility.value = id
}

const playPianoStep = () => {
  if (pianoMasteryScore.value < 8) {
    pianoMasteryScore.value++
    const trackName = getCurrentPianoTrack(pianoMasteryScore.value - 1)
    townReputation.value += 25
    latestTownEvent.value = `🎶 伴随着行云流水的音符，成功弹奏完【${trackName}】！酒馆听众纷纷起立鼓掌欢呼 (+25 声望)！`
    if (pianoMasteryScore.value === 8) {
      latestTownEvent.value = '🏆 震撼！8 架钢琴试炼全部通关！正式领悟吟游诗人究极乐章【英雄之歌 (Hero Song)】！'
    }
  }
}

const restAtInn = () => {
  townReputation.value += 5
  latestTownEvent.value = '💤 投宿成功！在壁炉暖火与安神熏香中入眠，全队 HP/MP 彻底回满，所有异常状态解除！'
}

const triggerDreamConversation = () => {
  const dreams = [
    '🌙 黎川望着跃动的火星沉思：“关于风之水晶的碎裂，帝国背后的魔导技术绝非偶然...”',
    '🌙 卫珩擦拭着圣骑士佩剑：“无论前路如何艰险，守护无辜子民的誓言决不可破。”',
    '🌙 茜罗合上古代铭文羊皮纸：“穆尔大森林里的千年封印...必须在月相汇聚前赶到。”'
  ]
  latestTownEvent.value = dreams[Math.floor(Math.random() * dreams.length)]
}

const buyTavernAle = () => {
  townReputation.value += 10
  const gossips = [
    '🍺 酒保低语：“听说克雷斯塔岛附近的深海有庞大的漩涡，只有黑陆行鸟才能从树林起飞...”',
    '🍺 佣兵醉汉醉眼惺忪：“蜃楼小镇必须在隐秘森林中顺时针绕行三圈才能显形入口！”',
    '🍺 吟游诗人拨动琴弦：“古代四大神兵被封印在十二封印之城，需要石板才能拔出...”'
  ]
  latestTownEvent.value = gossips[Math.floor(Math.random() * gossips.length)]
}

const mountChocobo = (type: 'yellow' | 'black') => {
  if (type === 'yellow') {
    latestTownEvent.value = '🟡 敏捷的黄色陆行鸟欢快鸣叫“Kweh!~”！全员跃上马鞍，平原移速翻倍并免除魔物袭击！'
  } else {
    latestTownEvent.value = '🟣 极光黑陆行鸟展开漆黑双翼！轻盈越过崇山峻岭与广袤森林，低空滑翔巡礼！'
  }
}

const reportToKing = () => {
  townReputation.value += 40
  latestTownEvent.value = '👑 城主肃然起敬：“光之战士们带回的四方水晶碎裂情报极为关键！已令皇家骑士团加强警戒！(+40 声望)”'
}

const requestCastlePass = () => {
  townReputation.value += 20
  latestTownEvent.value = '🗝️ 皇家总管签署通行谕令：“获准自由出入城堡内廷秘藏室与防空飞空艇停机坪！”'
}

const featuredShopItems = computed(() => {
  if (currentScene.value && currentScene.value.shops.length > 0) {
    return currentScene.value.shops[0].items.slice(0, 6).map(i => ({
      name: i.name,
      price: i.price,
      desc: i.effect || '官方商会认证品'
    }))
  }
  return [
    { name: '圣灵药 (Elixir)', price: 50000, desc: '单体 HP/MP 全回满的神药' },
    { name: '大马士革轻剑', price: 12800, desc: '锋利度 +95，提升敏捷 3 点' },
    { name: '钻石胸铠', price: 18000, desc: '物防 +48，抗雷属性伤害' }
  ]
})

const inspectShopItem = (item: { name: string; price: number; desc: string }) => {
  latestTownEvent.value = `🔍 审查了商铺货架上的【${item.name}】（物价: ${item.price} Gil）—— ${item.desc}`
}

// NPC 对白决策模型
interface TownNpcRecord {
  id: string
  name: string
  title: string
  role: string
  avatar: string
  dialogue: string
  choices: { text: string; rewardHint: string; reply: string; repGain: number }[]
}

const townNpcPool: TownNpcRecord[] = [
  {
    id: 'scholar_elric',
    name: '埃尔里克学者',
    title: '王立水晶研究院首席导师',
    role: '宫廷学者',
    avatar: '🧙‍♂️',
    dialogue: '光之战士，风之水晶的以太波长在最近几日发生了剧烈逆转，世界各大活火山与洋流都在躁动不安。',
    choices: [
      { text: '详细请教以太逆转的源头与古代文献记载', rewardHint: '+30 声望 / 古代石板线索', reply: '很好！这卷古羊皮纸记录着四大封印结界与时空裂隙的对应相位，请妥善保存！', repGain: 30 },
      { text: '询问能否提供强化防具的魔导附魔配方', rewardHint: '+15 声望 / 附魔指引', reply: '只要将以太精粹注入大马士革钢，便能锻造出抵御地狱黑炎的魔导盾！', repGain: 15 },
      { text: '提醒学者注意王城内潜伏的帝国谍影', rewardHint: '+20 声望 / 结成同盟', reply: '多亏你的警示！我立刻让城防禁卫军暗中排查地下排污渠！', repGain: 20 }
    ]
  },
  {
    id: 'bard_lyra',
    name: '莱拉·风弦',
    title: '流浪吟游诗人',
    role: '酒馆乐师',
    avatar: '🪕',
    dialogue: '琴弦因风而鸣，古老的传说在酒香里流淌。你是否也听到了那来自幻影小镇的微弱召唤？',
    choices: [
      { text: '与莱拉探讨各地钢琴的音律构造与乐谱', rewardHint: '+25 声望 / 钢琴启发', reply: '你对黑白琴键的领悟令人惊叹！记得弹完各镇钢琴后去幻影之村！', repGain: 25 },
      { text: '倾听关于光之战士与暗黑魔道士的古老叙事诗', rewardHint: '+20 声望 / 剧情图鉴', reply: '“当双月重合，光与暗的裂痕将吞噬星辰...”这首诗传唱了一千两百年。', repGain: 20 },
      { text: '慷慨资助诗人 50 Gil 旅费', rewardHint: '+35 声望 / 获得祝福', reply: '愿风之神灵常伴你的双翼！送你一羽纯白陆行鸟的脱羽护符！', repGain: 35 }
    ]
  },
  {
    id: 'captain_boris',
    name: '鲍里斯卫队长',
    title: '城防近卫重装骑兵长',
    role: '守备统领',
    avatar: '💂‍♂️',
    dialogue: '城外最近游荡着不明身份的黑铠魔道兵，出城探索的冒险者务必配备足够的解毒药与不死鸟之尾。',
    choices: [
      { text: '主动承揽巡逻清剿城外魔物的治安委托', rewardHint: '+40 声望 / 领主赏金', reply: '太感激了！若能肃清北境山道的魔物，我将亲自向城主为你请功！', repGain: 40 },
      { text: '打听最近通往北溟南岸山脊的捷径关卡', rewardHint: '+20 声望 / 路线提示', reply: '经由北脊关隘口可快速抵达北窟，但需要随身备好御寒皮袄。', repGain: 20 },
      { text: '交换城防换防时间表以策万全', rewardHint: '+15 声望 / 防务通报', reply: '午夜三更城门将进行魔导结界轮换，尽量在此之前返回城内。', repGain: 15 }
    ]
  }
]

const activeNpcIndex = ref(0)
const selectedChoiceIdx = ref<number | null>(null)
const currentTownNpcPool = computed(() => townNpcPool)
const activeNpc = computed(() => currentTownNpcPool.value[activeNpcIndex.value] || currentTownNpcPool.value[0])
const activeNpcDialogueText = ref(activeNpc.value.dialogue)
const activeNpcChoices = computed(() => activeNpc.value.choices)

const nextNpcInTown = () => {
  activeNpcIndex.value = (activeNpcIndex.value + 1) % currentTownNpcPool.value.length
  activeNpcDialogueText.value = activeNpc.value.dialogue
  selectedChoiceIdx.value = null
  latestTownEvent.value = `与【${activeNpc.value.name}】（${activeNpc.value.title}）目光相交，对方微笑着向你点头致意。`
}

const confirmChoice = (cIdx: number) => {
  selectedChoiceIdx.value = cIdx
  const choice = activeNpcChoices.value[cIdx]
  activeNpcDialogueText.value = choice.reply
  townReputation.value += choice.repGain
  latestTownEvent.value = `💬 回应了【${activeNpc.value.name}】：${choice.text}。获得 ${choice.rewardHint} (+${choice.repGain} 声望)！`
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
