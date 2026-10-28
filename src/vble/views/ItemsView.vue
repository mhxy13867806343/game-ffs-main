<template>
  <div class="items-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Items, Armors & Spells Encyclopedia</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-cyan mb-2">全域道具、防具与四大法系图鉴</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm">
        系统归纳探险补给、稀有防具头盔、白魔法、黑魔法、时空魔法与青魔法全谱系；集成飞空艇前置机动道具与传奇王冠连锁考据
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

    <!-- 响应式列表分页器 -->
    <div
      v-if="activeTab !== 'alchemy' && currentList.length > pageSize"
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

const gameStore = useGameStore()
const activeTab = ref<'items' | 'armors' | 'magic' | 'alchemy'>('items')

const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 640)

const items = computed(() => gameStore.db.items || [])
const armors = computed(() => gameStore.db.armors || [])
const magics = computed(() => gameStore.db.magic || [])

const tabOptions = computed(() => [
  { id: 'items' as const, name: '道具与消耗品', icon: '🧪', count: items.value.length },
  { id: 'armors' as const, name: '防具与头饰', icon: '🛡️', count: armors.value.length },
  { id: 'magic' as const, name: '魔法与咒术', icon: '✨', count: magics.value.length },
  { id: 'alchemy' as const, name: '药剂调合与秘药炼成', icon: '⚗️', count: alchemyRecipes.length }
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
