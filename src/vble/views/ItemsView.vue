<template>
  <div class="items-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <div class="flex items-center justify-center gap-2 mb-2 flex-wrap">
        <n-tag type="info" size="small" round class="shadow-sm">VBLE Items, Ancient Relic Reforging & Transmutation Matrix v2.2.293</n-tag>
        <button
          type="button"
          class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer shadow-sm"
          @click="activeTab = 'reforge'"
        >
          🔮 太古重铸与黑市工坊直达
        </button>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-cyan mb-2">全域道具、防具与四大法系图鉴</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm">
        系统归纳探险补给、稀有防具头盔、白魔法、黑魔法、时空魔法与青魔法全谱系；集成太古神兵残简重铸、遗迹远古炼金合成与时空黑市汇率对冲工坊
      </p>
    </div>

    <!-- 顶部分类标签切换 (夜间高对比度) -->
    <div class="flex justify-center flex-wrap gap-2">
      <div role="group" aria-label="图鉴分类" class="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1 flex-wrap justify-center">
        <button
          v-for="tab in tabOptions"
          :key="tab.id"
          :aria-pressed="activeTab === tab.id"
          class="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border select-none flex items-center gap-1.5"
          :class="activeTab === tab.id
            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
            : 'bg-transparent text-gray-300 border-transparent hover:(text-white bg-slate-800)'"
          @click="activeTab = tab.id"
        >
          <span>{{ tab.icon }}</span>
          <span>{{ tab.name }}</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded-full" :class="activeTab === tab.id ? 'bg-cyan-900/40 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-300'">
            {{ tab.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- 专区 1: 交互式背包与页内显式目标切换工作台 (对齐 Godot 4.3 D09 item_page_target_switch 规范) -->
    <n-card
      v-if="activeTab === 'items'"
      class="border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-[#12162a] to-slate-950 rounded-xl shadow-xl"
      title="🧪 随身背包道具使用与显式目标切换模拟器 (In-Place Target Switch Studio)"
    >
      <template #header-extra>
        <n-tag size="tiny" type="info" round>Godot D09 真实交互机制</n-tag>
      </template>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <!-- 步骤 1: 选定道具 -->
        <div class="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
          <div class="text-xs font-bold text-amber-300 flex items-center justify-between">
            <span>1️⃣ 选择可用消耗品</span>
            <span class="text-[10px] text-gray-400">背包持有量</span>
          </div>
          <div class="space-y-1.5">
            <button
              v-for="item in inventorySimList"
              :key="item.id"
              type="button"
              class="w-full text-left p-2 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer"
              :class="selectedSimItem.id === item.id ? 'bg-cyan-950/70 border-cyan-400 text-white shadow' : 'bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700'"
              @click="selectedSimItem = item"
            >
              <div>
                <span class="font-bold text-cyan-300">{{ item.name }}</span>
                <span class="text-[10px] text-gray-400 ml-1.5">({{ item.effect }})</span>
              </div>
              <n-tag size="tiny" :type="item.count > 0 ? 'success' : 'error'">×{{ item.count }}</n-tag>
            </button>
          </div>
        </div>

        <!-- 步骤 2: 目标同伴选择与状态监视 -->
        <div class="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
          <div class="text-xs font-bold text-cyan-300 flex items-center justify-between">
            <span>2️⃣ 显式目标切换 (Party Member)</span>
            <span class="text-[10px] text-cyan-400">支持单体/全队</span>
          </div>
          <div class="space-y-2">
            <div
              v-for="char in partyMembers"
              :key="char.id"
              class="p-2.5 rounded-lg border text-xs transition-all cursor-pointer"
              :class="selectedTargetMember.id === char.id ? 'bg-indigo-950/70 border-indigo-400 text-white ring-1 ring-indigo-500' : 'bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700'"
              @click="selectedTargetMember = char"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-gray-100">{{ char.name }}</span>
                <span class="text-[10px] text-gray-400">Lv. {{ char.level }} · {{ char.job }}</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div>
                  <span class="text-gray-400">HP: </span>
                  <span :class="char.currentHp < char.maxHp * 0.3 ? 'text-red-400 font-bold' : 'text-emerald-400'">
                    {{ char.currentHp }} / {{ char.maxHp }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-400">MP: </span>
                  <span class="text-cyan-400">{{ char.currentMp }} / {{ char.maxMp }}</span>
                </div>
              </div>
              <div v-if="char.status !== '正常'" class="mt-1 text-[10px] text-amber-400 flex items-center gap-1">
                <span>⚠️ 负面异常:</span>
                <span class="px-1 py-0.2 rounded bg-amber-950 border border-amber-800">{{ char.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 步骤 3: 触发执行与收据反馈 -->
        <div class="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>3️⃣ 动作触发与事务结算</span>
            </div>
            <div class="p-3 bg-slate-900/90 rounded border border-slate-800 text-xs space-y-1.5">
              <div class="text-gray-400">预选道具: <strong class="text-cyan-300">{{ selectedSimItem.name }}</strong></div>
              <div class="text-gray-400">目标同伴: <strong class="text-amber-300">{{ selectedSimItem.targetAll ? '全体队员' : selectedTargetMember.name }}</strong></div>
              <div class="text-gray-400">库存变化: <span class="text-rose-400">消耗 1 个</span> (当前剩余: {{ selectedSimItem.count }})</div>
            </div>

            <!-- 执行操作反馈提示 -->
            <div v-if="usageNotice" class="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs text-center font-bold">
              {{ usageNotice }}
            </div>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              class="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-lg text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="selectedSimItem.count <= 0"
              @click="applySimItemUse"
            >
              {{ selectedSimItem.count > 0 ? `🚀 确认使用【${selectedSimItem.name}】` : '❌ 道具库存已耗尽' }}
            </button>
            <button
              type="button"
              class="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-300 text-[11px] rounded transition-all cursor-pointer"
              @click="resetPartyState"
            >
              🔄 重置模拟器状态与背包
            </button>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 专区 2: 飞空艇前置机动道具与传奇王冠四连环专区 (PRE_AIRSHIP_ITEMS.md & FF1 Crown Quests) -->
    <div v-if="activeTab === 'items'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 飞空艇前置机动道具 -->
      <n-card class="border border-sky-800/60 bg-[#12192c]/90 rounded-xl" title="🛸 飞空艇前置机动道具体系 (Pre-Airship Mobility)">
        <template #header-extra>
          <n-tag size="tiny" type="info">airship_obtained 动态守卫</n-tag>
        </template>
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            在获得飞空艇（<code>airship_obtained = true</code>）之前，世界探索广阔而步履艰难。游戏系统专门实装 3 款前置专属机动道具，在早期提供关键传送与移动辅助，获得飞空艇后自动进入失效保护：
          </p>
          <div class="space-y-2">
            <div class="p-2.5 bg-slate-900/90 rounded border border-slate-800 flex items-start justify-between">
              <div>
                <div class="font-bold text-sky-300">📜 回地图卷轴 (ID: 301)</div>
                <div class="text-[11px] text-gray-400">使用后立刻安全返回当前所在大陆的世界地图入口，免去深层折返跋涉。</div>
              </div>
              <n-tag size="tiny" type="info">300G</n-tag>
            </div>
            <div class="p-2.5 bg-slate-900/90 rounded border border-slate-800 flex items-start justify-between">
              <div>
                <div class="font-bold text-amber-300">🪶 传送羽毛 (ID: 302)</div>
                <div class="text-[11px] text-gray-400">弹出已访问地名录（<code>visited_locations</code>），确认后瞬间传送抵达指定城镇。</div>
              </div>
              <n-tag size="tiny" type="warning">800G</n-tag>
            </div>
            <div class="p-2.5 bg-slate-900/90 rounded border border-slate-800 flex items-start justify-between">
              <div>
                <div class="font-bold text-purple-300">✨ 职业卷轴 (ID: 303)</div>
                <div class="text-[11px] text-gray-400">战士激励战歌、法师菲拉烈焰、白魔全队祈祷等指定职业一次性探索技能卷轴。</div>
              </div>
              <n-tag size="tiny" type="error">限定职业</n-tag>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 传奇王冠四连环关键道具 (SQ01~SQ07 & FF1 Crown Quest) -->
      <n-card class="border border-amber-800/60 bg-[#1e1712]/90 rounded-xl" title="👑 传奇王冠四连环剧情道具大典 (Items 111~114)">
        <template #header-extra>
          <n-tag size="tiny" type="warning">西方王阿斯托斯连锁</n-tag>
        </template>
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            源自经典始源 FF1 史诗委托链（<code>ff1_crown_quest.gd</code>），四大核心道具层层递进，贯穿沼泽洞窟、玛托雅洞窟与精灵城堡：
          </p>
          <div class="space-y-2">
            <div class="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-amber-400">👑 [111] 王冠 (Crown)</span>
                <span class="text-[10px] text-gray-400 ml-2">沼泽洞窟取得，西方王阿斯托斯的虚伪指引</span>
              </div>
              <n-tag size="tiny" type="warning">关键物品</n-tag>
            </div>
            <div class="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-cyan-400">🔮 [112] 水晶眼 (Crystal Eye)</span>
                <span class="text-[10px] text-gray-400 ml-2">击破黑暗骑士阿斯托斯夺回，交还盲女玛托雅</span>
              </div>
              <n-tag size="tiny" type="info">关键物品</n-tag>
            </div>
            <div class="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-emerald-400">🧪 [113] 提神药 (Jolt Tonic)</span>
                <span class="text-[10px] text-gray-400 ml-2">玛托雅重见光明后秘制，唤醒沉睡千年的精灵王子</span>
              </div>
              <n-tag size="tiny" type="success">关键物品</n-tag>
            </div>
            <div class="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-purple-400">🗝️ [114] 神秘钥匙 (Mystic Key)</span>
                <span class="text-[10px] text-gray-400 ml-2">精灵王国的报恩：开启全大陆封印密门与传说宝箱</span>
              </div>
              <n-tag size="tiny" type="error">全域解锁</n-tag>
            </div>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 道具与消耗品卡片网格 -->
    <div v-if="activeTab === 'items'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="item in paginatedList"
        :key="item.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-cyan-300">{{ item.name }}</span>
            <n-tag size="tiny" :type="item.category === 'key' ? 'warning' : 'info'">{{ item.type }}</n-tag>
          </div>
        </template>
        <div class="space-y-2 text-xs">
          <p class="text-gray-300 leading-relaxed">{{ item.effect || item.desc }}</p>
          <div v-if="item.price" class="text-amber-400 font-mono">
            💰 市价: {{ item.price }} {{ item.price.includes('G') ? '' : 'Gil' }}
          </div>

          <!-- 目标对象与使用许可 (对齐 ItemUIUseSummary 与 ItemUITargetSwitch) -->
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] flex items-center justify-between">
            <span class="text-gray-400">🎯 使用对象：</span>
            <span class="text-cyan-300 font-medium">
              {{ item.category === 'key' ? '重要道具（剧情持有）' : item.name.includes('帐篷') || item.name.includes('小屋') ? '当前全队（限营地/大地图）' : item.name.includes('万灵') || item.name.includes('圣灵') ? '选定同伴（支持上一位/下一位循环）' : '单体同伴（支持快捷切换）' }}
            </span>
          </div>

          <!-- 原典考据 (对齐 Godot 4.3 encyclopedia_volume_data.gd _append_source_references) -->
          <div
            v-if="['104', '105', '106', '108', '109', '110', '111', '112', '113', '114'].includes(item.id)"
            class="p-2 bg-amber-950/30 border border-amber-500/40 rounded text-amber-200 space-y-0.5"
          >
            <div class="text-[10px] text-amber-400 font-bold flex items-center gap-1">
              <span>📜</span>
              <span>原典考据 (Source Identity):</span>
            </div>
            <div class="text-[10px] text-gray-300 leading-relaxed">
              作品：FF1 / 时空物语 · 版本：Pixel Remaster · 原典名称：{{ item.name.split(' ')[0] }}
            </div>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 防具与头饰卡片网格 -->
    <div v-if="activeTab === 'armors'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="armor in paginatedList"
        :key="armor.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-amber-300">{{ armor.name }}</span>
            <n-tag size="tiny" type="warning">{{ armor.type }}</n-tag>
          </div>
        </template>
        <div class="space-y-2 text-xs">
          <div class="text-red-400 font-semibold">{{ armor.stats }}</div>
          <p class="text-gray-300 leading-relaxed">{{ armor.effect }}</p>
          <div v-if="armor.job" class="text-gray-400">适配: {{ armor.job }}</div>

          <!-- 秘宝溯源与考据 -->
          <div
            v-if="armor.origin"
            class="p-2 bg-slate-900/90 border border-slate-800 rounded space-y-0.5"
          >
            <div class="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
              <span>🏰</span>
              <span>秘宝出处与溯源:</span>
            </div>
            <div class="text-[10px] text-gray-300">{{ armor.origin }}</div>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 魔法与咒术卡片网格 -->
    <div v-if="activeTab === 'magic'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="m in paginatedList"
        :key="m.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-purple-300">{{ m.name }}</span>
            <n-tag size="tiny" type="error">{{ m.type }}</n-tag>
          </div>
        </template>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between text-gray-400">
            <span>消耗: <strong class="text-cyan-300">{{ m.cost }}</strong></span>
            <span>目标: {{ m.target }}</span>
          </div>
          <p class="text-gray-300 leading-relaxed">{{ m.effect }}</p>
        </div>
      </n-card>
    </div>

    <!-- 专区 3: 药剂师调合与秘药炼成工坊 (Chemist Mix & Potion Alchemy Studio) -->
    <div v-if="activeTab === 'alchemy'" class="space-y-6">
      <!-- 调合实验室横幅 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900/90 to-cyan-950/50 border border-emerald-500/40 shadow-xl space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">⚗️</span>
            <div>
              <h2 class="text-lg sm:text-xl font-black text-white text-glow-emerald">药剂师调合大典与秘药炼成实验室 (Chemist Mix Studio)</h2>
              <p class="text-xs text-gray-300 mt-0.5">
                双月宇宙传承自药剂师（Chemist）的奥义技能【调合 (Mix)】：将任意两种基础耗材在战局中即时融合，诱发突破上限的强力增益、绝对庇护或暗黑毁灭。
              </p>
            </div>
          </div>
          <n-tag type="success" size="small" round strong>18大太古神方收录</n-tag>
        </div>
      </div>

      <!-- 实时调合推演器 (Interactive Synthesizer) -->
      <n-card class="border border-emerald-500/40 bg-[#121626]/90 rounded-2xl shadow-xl" size="small">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">🧪</span>
              <span class="font-bold text-white text-sm sm:text-base">即时调合反应炉 (Live Potion Synthesis Reactor)</span>
            </div>
            <span class="text-xs text-amber-300 font-mono">战时即刻生效 · 无需咏唱</span>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          <!-- 槽位 1 选材 -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <label class="text-xs font-bold text-cyan-300 flex items-center justify-between">
              <span>基底素材 A (Ingredient A):</span>
              <span class="text-[10px] text-gray-400">第一原料</span>
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="ing in alchemyIngredients"
                :key="'a-' + ing.id"
                type="button"
                class="p-2 rounded-lg border text-xs text-left transition-all cursor-pointer flex items-center gap-1.5"
                :class="selectedIngA.id === ing.id ? 'bg-cyan-950/80 border-cyan-400 text-white font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700'"
                @click="selectedIngA = ing"
              >
                <span>{{ ing.icon }}</span>
                <span class="truncate">{{ ing.name }}</span>
              </button>
            </div>
          </div>

          <!-- 槽位 2 选材 -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <label class="text-xs font-bold text-amber-300 flex items-center justify-between">
              <span>催化素材 B (Ingredient B):</span>
              <span class="text-[10px] text-gray-400">第二原料</span>
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="ing in alchemyIngredients"
                :key="'b-' + ing.id"
                type="button"
                class="p-2 rounded-lg border text-xs text-left transition-all cursor-pointer flex items-center gap-1.5"
                :class="selectedIngB.id === ing.id ? 'bg-amber-950/80 border-amber-400 text-white font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700'"
                @click="selectedIngB = ing"
              >
                <span>{{ ing.icon }}</span>
                <span class="truncate">{{ ing.name }}</span>
              </button>
            </div>
          </div>

          <!-- 融合结算与产物展示 -->
          <div class="p-4 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-emerald-500/40 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-emerald-400">✨ 炼成产物推演结果:</span>
              <n-tag size="tiny" :type="synthesisResult.tagType">{{ synthesisResult.category }}</n-tag>
            </div>

            <div class="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1.5">
              <div class="text-sm font-black text-amber-300 flex items-center gap-1.5">
                <span>{{ synthesisResult.icon }}</span>
                <span>{{ synthesisResult.name }}</span>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed">
                {{ synthesisResult.effect }}
              </p>
              <div class="text-[11px] text-cyan-400 font-mono">
                战术定位: {{ synthesisResult.tactics }}
              </div>
            </div>

            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
              @click="triggerAlchemyMix"
            >
              🧪 执行炼成并在战局演练
            </button>
            <div v-if="mixNotice" class="text-center text-[11px] text-emerald-300 font-bold animate-pulse">
              {{ mixNotice }}
            </div>
          </div>
        </div>
      </n-card>

      <!-- 调合全谱系秘典对照表 -->
      <div class="p-5 rounded-2xl bg-[#121626]/90 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xl">📜</span>
            <h3 class="text-base font-bold text-white">药剂师调合全谱系秘典清单 (Chemist Alchemy Codex)</h3>
          </div>
          <!-- 分类筛选器 -->
          <div class="flex items-center gap-1 text-xs">
            <button
              v-for="cat in ['全部', '破限增益', '神圣净化', '毁灭打击', '逆转控制']"
              :key="cat"
              type="button"
              class="px-2 py-0.5 rounded text-[11px] transition-all"
              :class="recipeFilter === cat ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-gray-400 hover:text-white border border-slate-800'"
              @click="recipeFilter = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="overflow-x-auto rounded-xl border border-slate-800">
          <table class="w-full text-xs text-left">
            <thead class="bg-slate-900/90 text-gray-400 font-mono uppercase border-b border-slate-800">
              <tr>
                <th class="py-2.5 px-3">产物名称</th>
                <th class="py-2.5 px-3">原料组合</th>
                <th class="py-2.5 px-3">分类</th>
                <th class="py-2.5 px-4">战术效果与实战意义</th>
                <th class="py-2.5 px-3 text-right">快捷试验</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 bg-slate-950/40">
              <tr v-for="r in filteredRecipes" :key="r.name" class="hover:bg-slate-900/50 transition-colors">
                <td class="py-2.5 px-3 font-bold text-amber-300 whitespace-nowrap">
                  <span>{{ r.icon }}</span> {{ r.name }}
                </td>
                <td class="py-2.5 px-3 text-cyan-300 font-mono whitespace-nowrap">
                  {{ r.ingA }} + {{ r.ingB }}
                </td>
                <td class="py-2.5 px-3">
                  <n-tag size="tiny" :type="r.tagType">{{ r.category }}</n-tag>
                </td>
                <td class="py-2.5 px-4 text-gray-300 leading-relaxed">
                  {{ r.effect }}
                </td>
                <td class="py-2.5 px-3 text-right whitespace-nowrap">
                  <n-button size="tiny" secondary type="success" round @click="loadRecipeToReactor(r)">
                    载入反应炉
                  </n-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Godot 引擎底层调合系统源码 (item_mix_alchemy_system.gd) -->
      <div class="p-5 rounded-2xl bg-[#121626]/90 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">⚙️</span>
            <h3 class="text-base font-bold text-white font-mono">res://scripts/items/item_mix_alchemy_system.gd</h3>
          </div>
          <n-tag type="info" size="tiny" round>Godot 4.6 LTS Chemist Core</n-tag>
        </div>
        <p class="text-xs text-gray-400">
          战斗背包调合扩展内核源码，负责双元材料哈希索引、合法性校验、状态倍率覆写与战斗飘字广播：
        </p>
        <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed">{{ alchemyScriptCode }}</pre>
      </div>
    </div>

    <!-- 专区 4: 太古神兵碎片重铸、遗迹远古炼金合成与黑市兑换工坊 (Ancient Relic Shard Reforging & Transmutation Studio) -->
    <div v-if="activeTab === 'reforge'" id="reforge-studio" class="space-y-6">
      <!-- 横幅标头 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900/95 to-purple-950/60 border border-amber-500/40 shadow-2xl space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 shadow-inner">🔮</span>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-lg sm:text-xl font-black text-white text-glow-amber">
                  太古神兵碎片重铸、遗迹远古炼金合成与黑市兑换工坊
                </h2>
                <n-tag type="warning" size="tiny" round strong>Godot 4.6 LTS 架构标准</n-tag>
              </div>
              <p class="text-xs text-gray-300 mt-0.5">
                深度解密上古圣战散落之神兵残片与巴比伦遗迹微粒；支持四维连续重铸微调、三大神圣催化保护阀、五阶段重铸仿真推演与防伪方案书导出
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-start sm:self-auto">
            <n-tag type="info" size="small" round>4 大重铸流派</n-tag>
            <n-tag type="success" size="small" round>零碎裂安全保底</n-tag>
          </div>
        </div>
      </div>

      <!-- 四大重铸流派选择卡 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          v-for="arch in reforgeArchetypes"
          :key="arch.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
          :class="selectedArchetypeId === arch.id
            ? 'bg-amber-950/40 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50'
            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'"
          @click="selectedArchetypeId = arch.id"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ arch.icon }}</span>
            <n-tag :type="selectedArchetypeId === arch.id ? 'warning' : 'default'" size="tiny" round>
              {{ arch.tag }}
            </n-tag>
          </div>
          <div class="text-sm font-bold text-white mb-1">{{ arch.name }}</div>
          <div class="text-[11px] text-gray-400 leading-relaxed mb-3">{{ arch.desc }}</div>
          <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span class="text-gray-400">核心优势</span>
            <span class="text-amber-300 font-semibold">{{ arch.perk }}</span>
          </div>
        </div>
      </div>

      <!-- 参数微调滑块与神圣催化保护阀 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 左侧: 4维连续参数调节 (7 cols) -->
        <div class="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="text-amber-400 font-bold text-sm">🎛️ 炼金重铸连续参数调控矩阵</span>
              <span class="text-[11px] text-gray-400 font-mono">4-Axis Continuous Tuning</span>
            </div>
            <button
              type="button"
              class="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
              @click="resetReforgeParameters"
            >
              重置参数
            </button>
          </div>

          <!-- 滑块 1: 神兵碎片投入量 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>🧩</span> 神兵碎片投入量 (Shard Quota)
              </span>
              <span class="font-mono text-amber-400 font-bold">{{ shardCount }} 片</span>
            </div>
            <n-slider
              v-model:value="shardCount"
              :min="1"
              :max="50"
              :step="1"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1 片 (基础试铸)</span>
              <span>25 片 (黄金平衡)</span>
              <span>50 片 (神兵极境)</span>
            </div>
          </div>

          <!-- 滑块 2: 遗迹以太通量纯度 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>💧</span> 遗迹以太通量纯度 (Aether Purity)
              </span>
              <span class="font-mono text-cyan-400 font-bold">{{ aetherFluxPurity }}%</span>
            </div>
            <n-slider
              v-model:value="aetherFluxPurity"
              :min="10"
              :max="100"
              :step="5"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>10% (杂质以太)</span>
              <span>60% (高纯遗迹液)</span>
              <span>100% (始源纯粹核)</span>
            </div>
          </div>

          <!-- 滑块 3: 远古高炉淬火温度 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>🔥</span> 远古高炉淬火温度 (Quenching Temp)
              </span>
              <span class="font-mono text-rose-400 font-bold">{{ catalystTemp }} ℃</span>
            </div>
            <n-slider
              v-model:value="catalystTemp"
              :min="800"
              :max="3600"
              :step="100"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>800 ℃ (初火)</span>
              <span>2200 ℃ (星核熔断)</span>
              <span>3600 ℃ (超新星炽炎)</span>
            </div>
          </div>

          <!-- 滑块 4: 黑市以太折现汇率 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>⚖️</span> 黑市以太折现汇率 (Black Market Rate)
              </span>
              <span class="font-mono text-emerald-400 font-bold">{{ blackMarketRate.toFixed(2) }}x</span>
            </div>
            <n-slider
              v-model:value="blackMarketRate"
              :min="1.0"
              :max="5.0"
              :step="0.1"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1.0x (官方平价)</span>
              <span>3.0x (黑市溢价对冲)</span>
              <span>5.0x (虚空套利极境)</span>
            </div>
          </div>
        </div>

        <!-- 右侧: 3大催化保护开关与动态状态 (5 cols) -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
            <span class="text-purple-400 font-bold text-sm">🛡️ 神圣催化保护阀与安全锁</span>
            <n-tag type="info" size="tiny" round>主动安全机制</n-tag>
          </div>

          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>♻️</span> 以太残渣无损回收阀
                </div>
                <div class="text-[11px] text-gray-400">重铸失败返还 85% 核心以太残渣，防碎裂破产</div>
              </div>
              <n-switch v-model:value="aetherResidueRecovery" size="small" />
            </div>

            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🔒</span> 极品炼金纯度锁相环
                </div>
                <div class="text-[11px] text-gray-400">锁定属性随机波动下限，保底 90% 极品属性</div>
              </div>
              <n-switch v-model:value="transmutationPurityLock" size="small" />
            </div>

            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🕶️</span> 虚空黑市隐匿披风
                </div>
                <div class="text-[11px] text-gray-400">跨维度关税免除 100%，暴击套利几率 +25%</div>
              </div>
              <n-switch v-model:value="voidStealthVeil" size="small" />
            </div>
          </div>

          <!-- 综合能效雷达摘要 -->
          <div class="p-3 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 space-y-2">
            <div class="text-xs font-bold text-cyan-300 flex items-center justify-between">
              <span>太古淬火安全指数</span>
              <span class="font-mono text-emerald-400 font-bold">{{ (reforgeSuccessRate).toFixed(1) }}%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                class="bg-gradient-to-r from-emerald-500 to-cyan-400 h-1.5 rounded-full transition-all duration-300"
                :style="{ width: Math.min(reforgeSuccessRate, 100) + '%' }"
              ></div>
            </div>
            <div class="text-[10px] text-gray-400 flex justify-between">
              <span>容限阈值: 60.0%</span>
              <span class="text-amber-400">熔铸稳定性: {{ reforgeSuccessRate > 90 ? '极佳' : '良好' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 实时解算数值仪表盘 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">神兵重铸战力 (CP)</div>
          <div class="text-2xl font-black text-amber-400 font-mono mt-1">+{{ calculatedReforgeCP.toLocaleString() }}</div>
          <div class="text-[10px] text-amber-300/80 mt-0.5">附带真伤与贯穿效果</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">炼金升华期望产出</div>
          <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ calculatedTransmutationYield.toFixed(2) }}x</div>
          <div class="text-[10px] text-cyan-300/80 mt-0.5">极品奇迹结晶倍率</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">黑市折现套利期望</div>
          <div class="text-2xl font-black text-emerald-400 font-mono mt-1">{{ calculatedArbitrageProfit.toLocaleString() }} G</div>
          <div class="text-[10px] text-emerald-300/80 mt-0.5">免税全额到手金币</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">太古工坊认证位阶</div>
          <div class="text-2xl font-black text-purple-400 font-mono mt-1">{{ reforgeCertificationTier }}</div>
          <div class="text-[10px] text-purple-300/80 mt-0.5">时空神祇最高许可</div>
        </div>
      </div>

      <!-- 五阶段重铸推演仿真终端 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-amber-500/30 shadow-2xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-amber-400 font-bold text-sm">⚡ 太古重铸与炼金合成五阶段推演终端</span>
            <n-tag type="warning" size="tiny" round>Live Simulation Pipeline</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 shadow-md disabled:opacity-50"
              :disabled="isSimulatingReforge"
              @click="runReforgeSimulation"
            >
              {{ isSimulatingReforge ? '正在推演熔铸中...' : '▶ 启动全流程重铸推演' }}
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 transition-all cursor-pointer"
              @click="exportReforgeCertificate"
            >
              📜 导出防伪方案书
            </button>
          </div>
        </div>

        <!-- 5 阶段步进进度 -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <div
            v-for="(stage, idx) in reforgeStages"
            :key="stage.id"
            class="p-2.5 rounded-lg border text-xs transition-all flex flex-col justify-between"
            :class="currentSimulationStep >= idx + 1
              ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
              : 'bg-slate-900/60 border-slate-800/80 text-gray-500'"
          >
            <div class="font-bold mb-1 flex items-center gap-1">
              <span>{{ currentSimulationStep >= idx + 1 ? '✅' : '⏳' }}</span>
              <span>第 {{ idx + 1 }} 阶: {{ stage.title }}</span>
            </div>
            <div class="text-[10px] leading-tight opacity-80">{{ stage.desc }}</div>
          </div>
        </div>

        <!-- 推演日志输出视窗 -->
        <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-gray-300 max-h-48 overflow-y-auto space-y-1">
          <div v-for="(log, idx) in reforgeLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-amber-500 select-none">›</span>
            <span :class="log.color || 'text-gray-300'">{{ log.text }}</span>
          </div>
          <div v-if="reforgeLogs.length === 0" class="text-gray-600 italic">
            等待启动推演... 点击上方【启动全流程重铸推演】按键开始推演。
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 3 Tab 源码展台 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-slate-800 shadow-xl space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400 font-bold text-sm">💻 Godot 4.6 LTS 太古重铸与黑市架构实机脚本</span>
            <n-tag type="info" size="tiny" round>RefCounted 核心系统</n-tag>
          </div>
          <div class="flex gap-2">
            <button
              v-for="st in scriptTabs"
              :key="st.key"
              type="button"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border"
              :class="activeScriptTab === st.key
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900 text-gray-400 border-slate-800 hover:text-white'"
              @click="activeScriptTab = st.key"
            >
              {{ st.name }}
            </button>
          </div>
        </div>

        <div class="relative">
          <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed max-h-96">{{ currentReforgeScriptCode }}</pre>
          <button
            type="button"
            class="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] text-gray-300 border border-slate-700 cursor-pointer transition-colors"
            @click="copyCurrentScript"
          >
            📋 复制代码
          </button>
        </div>
      </div>
    </div>

    <!-- 响应式列表分页器 -->
    <div
      v-if="activeTab !== 'alchemy' && activeTab !== 'reforge' && currentList.length > pageSize"
      v-simple-page-label
      class="flex justify-center items-center py-4 border-t border-slate-800/80"
      @click.capture="captureSimplePaginationActivation"
      @click="preserveSimplePaginationFocus"
    >
      <n-pagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :item-count="currentList.length"
        :page-sizes="[9, 18, 27]"
        :simple="isMobile"
        show-size-picker
        show-quick-jumper
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      >
        <!-- 原生按钮提供键盘激活，点击冒泡仍交由分页器维护页码与边界。 -->
        <template #prev="{ page }">
          <button type="button" class="items-pagination-control" aria-label="上一页图鉴" :disabled="page <= 1">‹</button>
        </template>
        <template #label="{ type, node, active }">
          <button
            v-if="type === 'page'"
            type="button"
            class="items-pagination-control"
            :aria-label="`图鉴第 ${node} 页`"
            :aria-current="active ? 'page' : undefined"
          >{{ node }}</button>
          <component :is="node" v-else />
        </template>
        <template #next="{ page, pageCount }">
          <button type="button" class="items-pagination-control" aria-label="下一页图鉴" :disabled="page >= pageCount">›</button>
        </template>
        <template #prefix="{ itemCount }">
          <span class="text-xs text-gray-400 mr-2">共 {{ itemCount }} 项</span>
        </template>
      </n-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { usePagination } from '@/composables/usePagination'

import { useMessage } from 'naive-ui'
const message = useMessage()

const gameStore = useGameStore()
const activeTab = ref<'items' | 'armors' | 'magic' | 'alchemy' | 'reforge'>('items')

const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 640)

const items = computed(() => gameStore.db.items || [])
const armors = computed(() => gameStore.db.armors || [])
const magics = computed(() => gameStore.db.magic || [])

const tabOptions = computed(() => [
  { id: 'items' as const, name: '道具与消耗品', icon: '🧪', count: items.value.length },
  { id: 'armors' as const, name: '防具与头饰', icon: '🛡️', count: armors.value.length },
  { id: 'magic' as const, name: '魔法与咒术', icon: '✨', count: magics.value.length },
  { id: 'alchemy' as const, name: '药剂调合与秘药炼成', icon: '⚗️', count: alchemyRecipes.length },
  { id: 'reforge' as const, name: '太古神兵碎片重铸与黑市', icon: '🔮', count: 12 }
])

// 模拟队伍状态与显式目标切换 (对齐 D09 item_page_target_switch)
interface SimPartyMember {
  id: string
  name: string
  job: string
  level: number
  currentHp: number
  maxHp: number
  currentMp: number
  maxMp: number
  status: string
}

const partyMembers = ref<SimPartyMember[]>([
  { id: 'bartz', name: '巴兹 (Bartz)', job: '骑士', level: 38, currentHp: 650, maxHp: 1800, currentMp: 90, maxMp: 120, status: '正常' },
  { id: 'lenna', name: '蕾娜 (Lenna)', job: '白魔道士', level: 38, currentHp: 420, maxHp: 1350, currentMp: 35, maxMp: 280, status: '沉默' },
  { id: 'galuf', name: '加拉夫 (Galuf)', job: '武僧', level: 38, currentHp: 1200, maxHp: 2100, currentMp: 60, maxMp: 80, status: '正常' },
  { id: 'faris', name: '法里斯 (Faris)', job: '忍者', level: 38, currentHp: 310, maxHp: 1520, currentMp: 110, maxMp: 160, status: '中毒' },
  { id: 'sarah', name: '塞拉 (Sarah)', job: '公主/学者', level: 38, currentHp: 280, maxHp: 1200, currentMp: 200, maxMp: 250, status: '正常' }
])

const selectedTargetMember = ref<SimPartyMember>(partyMembers.value[0])

interface SimInventoryItem {
  id: number
  name: string
  effect: string
  count: number
  healHp?: number
  healMp?: number
  cureStatus?: string
  targetAll?: boolean
}

const inventorySimList = ref<SimInventoryItem[]>([
  { id: 1, name: '恢复药 (Potion)', effect: '恢复单体 500 HP', count: 9, healHp: 500 },
  { id: 2, name: '高級恢复药 (Hi-Potion)', effect: '恢复单体 1500 HP', count: 4, healHp: 1500 },
  { id: 3, name: '圣灵药 (Elixir)', effect: '恢复单体全满 HP 与 MP', count: 2, healHp: 9999, healMp: 9999 },
  { id: 4, name: '以太药 (Ether)', effect: '恢复单体 100 MP', count: 5, healMp: 100 },
  { id: 5, name: '解毒剂 (Antidote)', effect: '解除单体中毒异常', count: 6, cureStatus: '中毒' },
  { id: 6, name: '回音草 (Echo Herbs)', effect: '解除单体沉默异常', count: 3, cureStatus: '沉默' },
  { id: 7, name: '万能药 (Remedy)', effect: '解除单体全部负面状态', count: 3, cureStatus: 'ALL' },
  { id: 8, name: '野营帐篷 (Tent)', effect: '大地图全队回复 1000 HP & 100 MP', count: 2, healHp: 1000, healMp: 100, targetAll: true }
])

const selectedSimItem = ref<SimInventoryItem>(inventorySimList.value[0])
const usageNotice = ref('')

const applySimItemUse = () => {
  const item = selectedSimItem.value
  if (item.count <= 0) return

  item.count -= 1

  if (item.targetAll) {
    // 全体生效
    partyMembers.value.forEach(m => {
      if (item.healHp) m.currentHp = Math.min(m.maxHp, m.currentHp + item.healHp)
      if (item.healMp) m.currentMp = Math.min(m.maxMp, m.currentMp + item.healMp)
    })
    usageNotice.value = `✅ 对全队使用了【${item.name}】，全员恢复生命与魔力！`
  } else {
    // 显式目标生效
    const target = selectedTargetMember.value
    let detail = ''
    if (item.healHp) {
      const prev = target.currentHp
      target.currentHp = Math.min(target.maxHp, target.currentHp + item.healHp)
      detail += `+${target.currentHp - prev} HP `
    }
    if (item.healMp) {
      const prev = target.currentMp
      target.currentMp = Math.min(target.maxMp, target.currentMp + item.healMp)
      detail += `+${target.currentMp - prev} MP `
    }
    if (item.cureStatus) {
      if (item.cureStatus === 'ALL' || item.cureStatus === target.status) {
        target.status = '正常'
        detail += '净化异常状态 '
      }
    }
    usageNotice.value = `✅ 对【${target.name}】使用了【${item.name}】（扣除1个）：${detail}`
  }

  setTimeout(() => {
    usageNotice.value = ''
  }, 4000)
}

const resetPartyState = () => {
  partyMembers.value = [
    { id: 'bartz', name: '巴兹 (Bartz)', job: '骑士', level: 38, currentHp: 650, maxHp: 1800, currentMp: 90, maxMp: 120, status: '正常' },
    { id: 'lenna', name: '蕾娜 (Lenna)', job: '白魔道士', level: 38, currentHp: 420, maxHp: 1350, currentMp: 35, maxMp: 280, status: '沉默' },
    { id: 'galuf', name: '加拉夫 (Galuf)', job: '武僧', level: 38, currentHp: 1200, maxHp: 2100, currentMp: 60, maxMp: 80, status: '正常' },
    { id: 'faris', name: '法里斯 (Faris)', job: '忍者', level: 38, currentHp: 310, maxHp: 1520, currentMp: 110, maxMp: 160, status: '中毒' },
    { id: 'sarah', name: '塞拉 (Sarah)', job: '公主/学者', level: 38, currentHp: 280, maxHp: 1200, currentMp: 200, maxMp: 250, status: '正常' }
  ]
  inventorySimList.value = [
    { id: 1, name: '恢复药 (Potion)', effect: '恢复单体 500 HP', count: 9, healHp: 500 },
    { id: 2, name: '高級恢复药 (Hi-Potion)', effect: '恢复单体 1500 HP', count: 4, healHp: 1500 },
    { id: 3, name: '圣灵药 (Elixir)', effect: '恢复单体全满 HP 与 MP', count: 2, healHp: 9999, healMp: 9999 },
    { id: 4, name: '以太药 (Ether)', effect: '恢复单体 100 MP', count: 5, healMp: 100 },
    { id: 5, name: '解毒剂 (Antidote)', effect: '解除单体中毒异常', count: 6, cureStatus: '中毒' },
    { id: 6, name: '回音草 (Echo Herbs)', effect: '解除单体沉默异常', count: 3, cureStatus: '沉默' },
    { id: 7, name: '万能药 (Remedy)', effect: '解除单体全部负面状态', count: 3, cureStatus: 'ALL' },
    { id: 8, name: '野营帐篷 (Tent)', effect: '大地图全队回复 1000 HP & 100 MP', count: 2, healHp: 1000, healMp: 100, targetAll: true }
  ]
  selectedSimItem.value = inventorySimList.value[0]
  selectedTargetMember.value = partyMembers.value[0]
  usageNotice.value = '已重置队伍生命值、负面异常与随身背包道具库存。'
}

const currentList = computed<Record<string, any>[]>(() => {
  if (activeTab.value === 'items') return items.value
  if (activeTab.value === 'armors') return armors.value
  return magics.value
})

const {
  currentPage,
  pageSize,
  paginatedList,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination<Record<string, any>>(currentList, { pageSize: 9 })

// simple 输入未开放 input-props；局部指令在挂载和响应式切换后补到实际输入。
const labelSimplePageInput = (container: HTMLElement) => {
  container.querySelector<HTMLInputElement>('.n-pagination--simple input')
    ?.setAttribute('aria-label', '道具目录当前页')
}
const vSimplePageLabel: Directive<HTMLElement> = {
  mounted: labelSimplePageInput,
  updated: labelSimplePageInput
}

// 只记录同一次键盘原生点击；鼠标与普通页码更新继续使用原焦点行为。
let simplePaginationActivation: { event: MouseEvent; button: HTMLButtonElement; page: number } | null = null
const captureSimplePaginationActivation = (event: MouseEvent) => {
  simplePaginationActivation = null
  const button = event.target instanceof Element ? event.target.closest('button.items-pagination-control') : null
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
  // Naive 完成翻页且 Vue 更新禁用状态后，仅补救边界按钮失焦到 BODY 的情况。
  void nextTick(() => {
    const { button } = activation
    if (!isMobile.value || !button.isConnected || !button.disabled) return
    if (document.activeElement !== button && document.activeElement !== document.body) return
    container.querySelector<HTMLInputElement>('.n-pagination--simple input')?.focus({ preventScroll: true })
  })
}

watch(activeTab, () => {
  resetPage()
})

// ================= 药剂师调合与秘药炼成系统 (Chemist Mix Studio) =================
interface AlchemyIngredient {
  id: string
  name: string
  icon: string
  desc: string
}

interface AlchemyRecipe {
  name: string
  icon: string
  ingA: string
  ingB: string
  category: '破限增益' | '神圣净化' | '毁灭打击' | '逆转控制'
  tagType: 'success' | 'warning' | 'error' | 'info'
  effect: string
  tactics: string
}

const alchemyIngredients: AlchemyIngredient[] = [
  { id: 'potion', name: '恢复药', icon: '🧪', desc: '基础伤口愈合药液' },
  { id: 'hi_potion', name: '高级恢复药', icon: '⚗️', desc: '精炼高浓度生命原液' },
  { id: 'ether', name: '以太药', icon: '💧', desc: '提纯精神魔力萃取物' },
  { id: 'elixir', name: '圣灵药', icon: '🌟', desc: '神圣全满完全复原灵液' },
  { id: 'phoenix_down', name: '凤凰尾羽', icon: '🪶', desc: '不死鸟之翼，复活之源' },
  { id: 'holy_water', name: '圣水', icon: '✝️', desc: '祝圣圣光净水，破除尸鬼' },
  { id: 'dragon_fang', name: '龙之牙', icon: '🐲', desc: '太古真龙锐齿，蕴含龙血狂力' },
  { id: 'dark_matter', name: '暗之物质', icon: '🌑', desc: '次元裂隙虚无凝结暗核' }
]

const selectedIngA = ref<AlchemyIngredient>(alchemyIngredients[6]) // 龙之牙
const selectedIngB = ref<AlchemyIngredient>(alchemyIngredients[3]) // 圣灵药
const mixNotice = ref('')
const recipeFilter = ref('全部')

const alchemyRecipes: AlchemyRecipe[] = [
  {
    name: '巨人之药 (Giant\'s Drink)',
    icon: '🍷',
    ingA: '圣灵药',
    ingB: '龙之牙',
    category: '破限增益',
    tagType: 'success',
    effect: '战斗内目标最大生命上限立即翻倍 (2.0x)，最高可突破至 9999 HP 并补满生命。',
    tactics: '挑战欧米茄与神龙波动炮必用！使脆皮法系角色也能承受全屏万额毁灭打击。'
  },
  {
    name: '龙之力量 (Dragon Power)',
    icon: '🐉',
    ingA: '圣水',
    ingB: '龙之牙',
    category: '破限增益',
    tagType: 'success',
    effect: '目标战斗内实时等级瞬间提升 +20 级，无上限叠加上限至 Lv.255。',
    tactics: '极大提升物理倍率与魔法防御，使 5 级即死与各种等级魔法判定产生战术位移。'
  },
  {
    name: '祝福之吻 (Blessed Kiss)',
    icon: '💋',
    ingA: '圣水',
    ingB: '圣水',
    category: '破限增益',
    tagType: 'warning',
    effect: '赋予目标【狂暴 (Berserk)】+【加速 (Haste)】+【分身 (Image)】，攻击力暴增 150%。',
    tactics: '二刀流狂战士极致输出神药；若对首领投掷可强行覆写其 AI 为纯平 A。'
  },
  {
    name: '暗黑吐息 (Shadow Flare)',
    icon: '🌑',
    ingA: '暗之物质',
    ingB: '暗之物质',
    category: '毁灭打击',
    tagType: 'error',
    effect: '凝聚虚无核心暗核，对敌方全体造成无视物理与魔法防御的 9999 点固定暗黑创伤。',
    tactics: '清场杂兵群与破除高抗性盾甲敌人的终极核爆手段。'
  },
  {
    name: '暗黑灵药 (Dark Elixir)',
    icon: '☠️',
    ingA: '暗之物质',
    ingB: '凤凰尾羽',
    category: '逆转控制',
    tagType: 'error',
    effect: '目标生命值与魔法值瞬间被虚无抽离，强制降至 1 HP / 1 MP。',
    tactics: '若对某些无不死属性的强韧怪使用，可一击使其濒临死亡直接补刀斩杀。'
  },
  {
    name: '复生圣泉 (Resurrection)',
    icon: '🕊️',
    ingA: '凤凰尾羽',
    ingB: '恢复药',
    category: '神圣净化',
    tagType: 'info',
    effect: '复活阵亡目标，并立即恢复 100% 最大生命值与全部负面状态净化。',
    tactics: '完美替代白魔法复活术，且不需要消耗任何 MP，由药剂师极速出手。'
  },
  {
    name: '龙之防御 (Dragon Armor)',
    icon: '🛡️',
    ingA: '以太药',
    ingB: '龙之牙',
    category: '破限增益',
    tagType: 'success',
    effect: '赋予目标火、冰、雷全元素属性 50% 伤害抗性，并附加物防 +20。',
    tactics: '针对三龙群与元素吐息类首领的坚实屏障。'
  },
  {
    name: '生机药饮 (Life Water)',
    icon: '💧',
    ingA: '高级恢复药',
    ingB: '圣水',
    category: '神圣净化',
    tagType: 'info',
    effect: '恢复目标 1000 HP，并赋予【持续缓回 (Regen)】与石化/毒素免疫。',
    tactics: '持久消耗战中维持前排肉盾血线健康的低耗稳健良方。'
  },
  {
    name: '破甲腐蚀液 (Acid Tonic)',
    icon: '🧪',
    ingA: '暗之物质',
    ingB: '恢复药',
    category: '毁灭打击',
    tagType: 'error',
    effect: '对敌单体造成腐蚀，永久削减其 50% 物理护甲与魔法防御，附带猛毒。',
    tactics: '破防金刚龟与高甲机械守卫的特效开场手段。'
  },
  {
    name: '圣灵甘露 (Panacea Elixir)',
    icon: '✨',
    ingA: '圣灵药',
    ingB: '高级恢复药',
    category: '神圣净化',
    tagType: 'info',
    effect: '恢复单体 9999 HP 并解除除战斗不能外的一切负面异常。',
    tactics: '单体绝境完全挽回王牌。'
  },
  {
    name: '龙之吐息 (Dragon Breath)',
    icon: '🔥',
    ingA: '高级恢复药',
    ingB: '龙之牙',
    category: '毁灭打击',
    tagType: 'error',
    effect: '喷射龙炎，对敌方全体造成当前生命值等额的火+无属性真实穿透创伤。',
    tactics: '肉盾血量越厚伤害越高，配合巨人之药可打出破限全屏爆发。'
  },
  {
    name: '以太爆发 (Ether Storm)',
    icon: '⚡',
    ingA: '以太药',
    ingB: '圣灵药',
    category: '破限增益',
    tagType: 'success',
    effect: '瞬间为全队同伴恢复 250 点 MP，无溢出浪费。',
    tactics: '法系狂轰连发后的全队充能法宝。'
  }
]

const filteredRecipes = computed(() => {
  if (recipeFilter.value === '全部') return alchemyRecipes
  return alchemyRecipes.filter(r => r.category === recipeFilter.value)
})

// 根据两个原料计算实时产物
const synthesisResult = computed<AlchemyRecipe>(() => {
  const a = selectedIngA.value.name
  const b = selectedIngB.value.name

  // 双向比对已知配方
  const found = alchemyRecipes.find(r =>
    (r.ingA === a && r.ingB === b) || (r.ingA === b && r.ingB === a)
  )

  if (found) return found

  // 默认泛用合成产物
  return {
    name: '秘传浓缩复原液 (Concentrated Tonic)',
    icon: '🍶',
    ingA: a,
    ingB: b,
    category: '破限增益',
    tagType: 'info',
    effect: `将【${a}】与【${b}】萃取调和，恢复目标 1200 HP 与 50 MP，并提升 10% 行动充能流速。`,
    tactics: '常规实战应急良药，适合在没有关键原料时提供稳定补充。'
  }
})

const triggerAlchemyMix = () => {
  mixNotice.value = `⚗️ 调合成功！炼成【${synthesisResult.value.name}】，已释放战术效能！`
  setTimeout(() => {
    mixNotice.value = ''
  }, 3500)
}

const loadRecipeToReactor = (r: AlchemyRecipe) => {
  const ing1 = alchemyIngredients.find(i => i.name === r.ingA)
  const ing2 = alchemyIngredients.find(i => i.name === r.ingB)
  if (ing1) selectedIngA.value = ing1
  if (ing2) selectedIngB.value = ing2
  mixNotice.value = `已将【${r.name}】配方原料载入即时反应炉！`
  setTimeout(() => {
    mixNotice.value = ''
  }, 2500)
}

const alchemyScriptCode = `class_name ItemMixAlchemySystem
extends RefCounted

## 最终幻想：时空之轮 - 药剂师调合与秘药炼成内核
## 文件路径: res://scripts/items/item_mix_alchemy_system.gd
## 引擎版本: Godot Engine 4.6 LTS

const RECIPE_REGISTRY: Dictionary = {
    "圣灵药+龙之牙": {"name": "巨人之药", "effect_type": "buff_max_hp_double", "value": 2.0},
    "圣水+龙之牙": {"name": "龙之力量", "effect_type": "buff_level_up", "value": 20},
    "圣水+圣水": {"name": "祝福之吻", "effect_type": "buff_berserk_haste", "value": 1.5},
    "暗之物质+暗之物质": {"name": "暗黑吐息", "effect_type": "damage_aoe_fixed", "value": 9999},
    "暗之物质+凤凰尾羽": {"name": "暗黑灵药", "effect_type": "drain_hp_mp_to_one", "value": 1},
    "凤凰尾羽+恢复药": {"name": "复生圣泉", "effect_type": "revive_full_hp", "value": 1.0}
}

static func synthesize_pair(item_a: String, item_b: String) -> Dictionary:
    var key1 := "%s+%s" % [item_a, item_b]
    var key2 := "%s+%s" % [item_b, item_a]

    if RECIPE_REGISTRY.has(key1):
        return RECIPE_REGISTRY[key1]
    elif RECIPE_REGISTRY.has(key2):
        return RECIPE_REGISTRY[key2]

    return {
        "name": "秘传浓缩复原液",
        "effect_type": "heal_hp_mp",
        "hp_heal": 1200,
        "mp_heal": 50
    }

static func apply_mix_to_combatant(target: Node, recipe: Dictionary) -> void:
    match recipe.get("effect_type", ""):
        "buff_max_hp_double":
            target.max_hp = mini(target.max_hp * 2, 9999)
            target.current_hp = target.max_hp
            CombatNotifier.emit_combat_text(target, "巨人之药！最大HP翻倍", Color.GREEN)
        "buff_level_up":
            target.current_level += int(recipe.value)
            CombatNotifier.emit_combat_text(target, "龙之力量！等级+20", Color.GOLD)
        "damage_aoe_fixed":
            target.take_damage(int(recipe.value), DamageType.DARK_TRUE)
            CombatNotifier.emit_combat_text(target, "9999 暗黑吐息！", Color.PURPLE)
`

// ==========================================
// 专区 4: 太古神兵碎片重铸、遗迹远古炼金合成与黑市兑换工坊 (v2.2.293)
// ==========================================
interface ReforgeArchetype {
  id: string
  name: string
  icon: string
  tag: string
  desc: string
  perk: string
  cpMultiplier: number
}

const reforgeArchetypes: ReforgeArchetype[] = [
  {
    id: 'ancient_weapon',
    name: '太古神兵残简熔铸',
    icon: '⚔️',
    tag: '神兵创世',
    desc: '熔铸上古圣战散落之圣剑与神弓碎片，以太贯穿重塑极境神兵',
    perk: '无视防御物理暴击 +180%',
    cpMultiplier: 1.45
  },
  {
    id: 'ruin_transmutation',
    name: '遗迹远古炼金升华',
    icon: '⚗️',
    tag: '远古奇迹',
    desc: '提炼巴比伦高能微粒，将普通消耗品蜕变质变为神圣永恒甘露',
    perk: '全队圣灵药效果突破',
    cpMultiplier: 1.35
  },
  {
    id: 'black_market_arbitrage',
    name: '虚空黑市期货对冲',
    icon: '⚖️',
    tag: '跨维套利',
    desc: '穿越时空裂隙联通外域黑市商人网络，无视常规配额换取绝版古董',
    perk: '黑市溢价折现免税 100%',
    cpMultiplier: 1.25
  },
  {
    id: 'soul_quenching',
    name: '时空灵魂共鸣淬火',
    icon: '🌌',
    tag: '英灵神格',
    desc: '将光暗英灵灵魂印记注入神兵基底，淬火时吸收双极以太波动',
    perk: '攻击吸血吸魔神性赋予',
    cpMultiplier: 1.55
  }
]

const selectedArchetypeId = ref<string>('ancient_weapon')

// 4 维连续滑块参数
const shardCount = ref<number>(24)
const aetherFluxPurity = ref<number>(88)
const catalystTemp = ref<number>(2400)
const blackMarketRate = ref<number>(2.8)

// 3 大催化保护开关
const aetherResidueRecovery = ref<boolean>(true)
const transmutationPurityLock = ref<boolean>(true)
const voidStealthVeil = ref<boolean>(true)

// 动态解算属性
const currentArchetype = computed(() => {
  return reforgeArchetypes.find(a => a.id === selectedArchetypeId.value) || reforgeArchetypes[0]
})

const calculatedReforgeCP = computed(() => {
  const baseCP = 12000
  const shardBonus = shardCount.value * 480
  const purityBonus = (aetherFluxPurity.value / 100) * 8500
  const tempBonus = (catalystTemp.value / 1000) * 1800
  const safeguardBonus = (aetherResidueRecovery.value ? 2000 : 0) + (transmutationPurityLock.value ? 3500 : 0)
  return Math.round((baseCP + shardBonus + purityBonus + tempBonus + safeguardBonus) * currentArchetype.value.cpMultiplier)
})

const calculatedTransmutationYield = computed(() => {
  const baseYield = 1.0 + (aetherFluxPurity.value / 100) * 1.5
  const tempMult = (catalystTemp.value / 2000) * 0.8
  const lockMult = transmutationPurityLock.value ? 1.25 : 1.0
  return Number((baseYield * tempMult * lockMult).toFixed(2))
})

const calculatedArbitrageProfit = computed(() => {
  const baseGil = 80000
  const rateFactor = blackMarketRate.value * 45000
  const veilBonus = voidStealthVeil.value ? 1.35 : 1.0
  return Math.round((baseGil + rateFactor) * veilBonus)
})

const reforgeSuccessRate = computed(() => {
  let rate = 65.0
  rate += (aetherFluxPurity.value / 100) * 20.0
  rate += aetherResidueRecovery.value ? 8.5 : 0.0
  rate += transmutationPurityLock.value ? 5.5 : 0.0
  if (catalystTemp.value > 3000) {
    rate -= 4.0
  }
  return Math.min(99.9, Math.max(50.0, rate))
})

const reforgeCertificationTier = computed(() => {
  if (calculatedReforgeCP.value >= 45000) return 'T0 太古神话极境'
  if (calculatedReforgeCP.value >= 35000) return 'T1 传奇圣遗物'
  if (calculatedReforgeCP.value >= 25000) return 'T2 史诗遗迹宝具'
  return 'T3 精良古代造物'
})

const resetReforgeParameters = () => {
  shardCount.value = 24
  aetherFluxPurity.value = 88
  catalystTemp.value = 2400
  blackMarketRate.value = 2.8
  aetherResidueRecovery.value = true
  transmutationPurityLock.value = true
  voidStealthVeil.value = true
  message?.info('太古重铸与炼金参数已重置为黄金标准配置')
}

// 五阶段仿真推演
const isSimulatingReforge = ref<boolean>(false)
const currentSimulationStep = ref<number>(0)
interface ReforgeLogItem {
  text: string
  color?: string
}
const reforgeLogs = ref<ReforgeLogItem[]>([])

const reforgeStages = [
  { id: 1, title: '碎片与以太扫描', desc: '检索残片纯度与晶格完整度' },
  { id: 2, title: '催化剂注入与锁相', desc: '启动防碎裂保护与纯度锁定' },
  { id: 3, title: '高炉淬火原子重排', desc: '极高温晶格熔融与神威附魔' },
  { id: 4, title: '黑市汇率套利对冲', desc: '虚空隐匿并结算免税金币' },
  { id: 5, title: '太古神兵签发入库', desc: '生成防伪校验证书与终极宝具' }
]

const runReforgeSimulation = async () => {
  if (isSimulatingReforge.value) return
  isSimulatingReforge.value = true
  currentSimulationStep.value = 0
  reforgeLogs.value = []

  const appendLog = (text: string, color?: string) => {
    reforgeLogs.value.push({ text, color })
  }

  appendLog('[INIT] 启动太古神兵重铸与遗迹远古炼金合成管线...', 'text-amber-400 font-bold')
  await new Promise(r => setTimeout(r, 400))

  // Step 1
  currentSimulationStep.value = 1
  appendLog(`[STEP 1] 扫描 ${shardCount.value} 枚太古神兵碎片，检测以太纯度 ${aetherFluxPurity.value}%，共鸣频率相干锁定。`, 'text-cyan-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 2
  currentSimulationStep.value = 2
  appendLog(`[STEP 2] 激活以太残渣无损回收阀: ${aetherResidueRecovery.value ? '已就绪 (85%返还)' : '未开启'}；极品锁相环: ${transmutationPurityLock.value ? '已锁定' : '未开启'}。`, 'text-purple-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 3
  currentSimulationStep.value = 3
  appendLog(`[STEP 3] 远古高炉升温至 ${catalystTemp.value} ℃！分子晶格彻底熔铸，流派【${currentArchetype.value.name}】神性注入，战力估值 +${calculatedReforgeCP.value} CP！`, 'text-rose-400 font-bold')
  await new Promise(r => setTimeout(r, 500))

  // Step 4
  currentSimulationStep.value = 4
  appendLog(`[STEP 4] 穿越时空黑市裂隙，折现汇率 ${blackMarketRate.value.toFixed(2)}x，隐匿披风免税结算期望获利 ${calculatedArbitrageProfit.value.toLocaleString()} Gil！`, 'text-emerald-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 5
  currentSimulationStep.value = 5
  appendLog(`[SUCCESS] 太古神兵重铸成功！认证位阶: 【${reforgeCertificationTier.value}】，综合成功率 ${reforgeSuccessRate.value.toFixed(1)}%，安全入库！`, 'text-amber-300 font-bold')
  isSimulatingReforge.value = false
  message?.success('太古神兵重铸推演圆满完成！')
}

const exportReforgeCertificate = () => {
  const certData = {
    studio: 'Ancient Relic Shard Reforging & Transmutation Studio v2.2.293',
    archetype: currentArchetype.value.name,
    shardCount: shardCount.value,
    aetherFluxPurity: aetherFluxPurity.value,
    catalystTemp: catalystTemp.value,
    blackMarketRate: blackMarketRate.value,
    calculatedReforgeCP: calculatedReforgeCP.value,
    calculatedTransmutationYield: calculatedTransmutationYield.value,
    calculatedArbitrageProfit: calculatedArbitrageProfit.value,
    reforgeSuccessRate: reforgeSuccessRate.value,
    certificationTier: reforgeCertificationTier.value,
    timestamp: new Date().toISOString(),
    sha256Certificate: 'SHARD-REFORGE-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(16).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reforge_certificate_${certData.sha256Certificate}.json`
  a.click()
  URL.revokeObjectURL(url)
  message?.success(`已导出方案防伪证书: ${certData.sha256Certificate}`)
}

// 源码展台
type ReforgeScriptKey = 'reforge_engine' | 'transmutation_pipeline' | 'black_market_broker'

const activeScriptTab = ref<ReforgeScriptKey>('reforge_engine')

const scriptTabs = [
  { key: 'reforge_engine' as const, name: '太古神兵重铸引擎' },
  { key: 'transmutation_pipeline' as const, name: '远古炼金升华管线' },
  { key: 'black_market_broker' as const, name: '时空黑市经纪系统' }
]

const reforgeScriptCodes: Record<ReforgeScriptKey, string> = {
  reforge_engine: `class_name AncientRelicShardReforgeEngine
extends RefCounted

## 最终幻想：时空之轮 - 太古神兵碎片重铸核心引擎
## 文件路径: res://scripts/items/ancient_relic_shard_reforge_engine.gd
## 引擎版本: Godot Engine 4.6 LTS

signal reforge_completed(result: Dictionary)
signal reforge_failed(recovered_shards: int)

const MIN_QUENCH_TEMP: float = 800.0
const MAX_QUENCH_TEMP: float = 3600.0
const AETHER_RECOVERY_RATIO: float = 0.85

var shard_count: int = 24
var aether_purity: float = 0.88
var quench_temperature: float = 2400.0
var recovery_guard_active: bool = true
var purity_lock_active: bool = true

func execute_reforge() -> Dictionary:
    var success_chance: float = 0.65 + (aether_purity * 0.20)
    if recovery_guard_active:
        success_chance += 0.085
    if purity_lock_active:
        success_chance += 0.055
    if quench_temperature > 3000.0:
        success_chance -= 0.04

    var roll: float = randf()
    var is_success: bool = roll <= success_chance

    if not is_success:
        var recovered := int(float(shard_count) * AETHER_RECOVERY_RATIO) if recovery_guard_active else 0
        reforge_failed.emit(recovered)
        return {
            "success": false,
            "recovered_shards": recovered,
            "status": "QUENCH_OVERHEAT_RECOVERED" if recovery_guard_active else "SHARD_SHATTERED"
        }

    var base_atk: int = 450 + int(float(shard_count) * 45.0 * aether_purity)
    var true_damage_rate: float = (quench_temperature / 2000.0) * 0.35
    if purity_lock_active:
        base_atk = maxi(base_atk, int(float(base_atk) * 0.95))

    var outcome := {
        "success": true,
        "weapon_name": "太古创世·时空贯穿神兵",
        "attack_power": base_atk,
        "true_damage_multiplier": true_damage_rate,
        "certification": "EX_ANCIENT_DIVINE"
    }
    reforge_completed.emit(outcome)
    return outcome
`,

  transmutation_pipeline: `class_name RuinAlchemyTransmutationPipeline
extends RefCounted

## 最终幻想：时空之轮 - 遗迹远古炼金升华管线
## 文件路径: res://scripts/items/ruin_alchemy_transmutation_pipeline.gd
## 引擎版本: Godot Engine 4.6 LTS

const RUIN_CATALYST_TABLE: Dictionary = {
    "elixir": {"yield_mult": 2.5, "aoe_party": true},
    "megalixir": {"yield_mult": 4.0, "aoe_party": true},
    "chrono_crystal": {"yield_mult": 3.2, "cooldown_reset": true}
}

static func transmute_consumable(source_item_id: String, purity: float, lock_active: bool) -> Dictionary:
    var base_meta: Dictionary = RUIN_CATALYST_TABLE.get(source_item_id, {"yield_mult": 1.5, "aoe_party": false})
    var final_yield: float = float(base_meta["yield_mult"]) * (1.0 + purity * 0.8)

    if lock_active:
        final_yield = maxf(final_yield, float(base_meta["yield_mult"]) * 1.5)

    return {
        "target_item": "远古升华·" + source_item_id,
        "yield_multiplier": final_yield,
        "aoe_party_effect": base_meta["aoe_party"],
        "transmuted_at": Time.get_unix_time_from_system()
    }
`,

  black_market_broker: `class_name BlackMarketVoidArbitrageBroker
extends RefCounted

## 最终幻想：时空之轮 - 虚空黑市期货对冲经纪人
## 文件路径: res://scripts/items/black_market_void_arbitrage_broker.gd
## 引擎版本: Godot Engine 4.6 LTS

const DEFAULT_TAX_RATE: float = 0.20

static func calculate_arbitrage_net(base_gil: int, exchange_rate: float, stealth_veil: bool) -> Dictionary:
    var gross_gil: int = int(float(base_gil) * exchange_rate)
    var effective_tax: float = 0.0 if stealth_veil else DEFAULT_TAX_RATE
    var tax_amount: int = int(float(gross_gil) * effective_tax)
    var net_profit: int = gross_gil - tax_amount

    return {
        "gross_gil": gross_gil,
        "tax_deducted": tax_amount,
        "net_profit": net_profit,
        "stealth_exempt": stealth_veil
    }
`
}

const currentReforgeScriptCode = computed(() => {
  return reforgeScriptCodes[activeScriptTab.value]
})

const copyCurrentScript = () => {
  navigator.clipboard.writeText(currentReforgeScriptCode.value)
  message?.success('已复制 Godot 4.6 LTS 脚本源码到剪贴板！')
}

</script>

<style scoped>
.items-pagination-control {
  min-width: 28px;
  min-height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.items-pagination-control:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}

.items-pagination-control:disabled {
  cursor: not-allowed;
}
</style>
