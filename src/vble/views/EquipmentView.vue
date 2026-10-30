<template>
  <div class="equipment-page p-3 sm:p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-purple-950/70 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.2)] relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/3 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              VBLE Mythic Weapons, Sealed Relic Breakthrough & Set Synergy Studio v2.2.319
            </span>
            <span class="text-xs text-gray-400">至高超越神兵、太古十二圣器、符文熔铸与多维词缀萃取</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🗡️</span> 神兵矩阵：诸神之黄昏、太古十二神兵共鸣与破限精炼工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
            收录次元神龙守护的至高超越神兵【诸神之黄昏 (Ragnarok)】、库扎封印城十二太古神兵契约共鸣羁绊、太古符文熔铸与多维词缀萃取工坊、二刀流伤害沙盘与 Godot 4.6 LTS 核心实机引擎。
          </p>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <span class="text-xs text-amber-300/80 font-medium">相关权威白皮书：</span>
            <router-link
              to="/vble/docs/EQUIPMENT_ECONOMY"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-900/60 text-amber-200 border border-amber-500/40 hover:bg-amber-800/80 hover:text-white transition-all shadow-sm group"
            >
              <span>🗡️</span>
              <span>神兵矩阵与经济架构白皮书 (VOL.05)</span>
              <span class="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
            </router-link>
            <router-link
              to="/vble/docs/TAIL_EXCHANGE"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-900/60 text-pink-200 border border-pink-500/40 hover:bg-pink-800/80 hover:text-white transition-all shadow-sm group"
            >
              <span>🦊</span>
              <span>七色尾巴兑换白皮书 (VOL.16)</span>
              <span class="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
            </router-link>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="activeTab = 'sealed_relic_breakthrough'"
          >
            <template #icon><span>⚡</span></template>
            太古神兵破限工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="activeTab = 'essence_infusion'"
          >
            <template #icon><span>👑</span></template>
            圣遗物灵髓注能工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="activeTab = 'rune_infusion'"
          >
            <template #icon><span>🔮</span></template>
            太古符文熔铸工坊
          </n-button>
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="activeTab = 'relic_forge'"
          >
            <template #icon><span>✨</span></template>
            太古神兵共鸣工坊
          </n-button>
          <router-link to="/vble/armory-simulator">
            <n-button type="info" size="medium" round secondary class="shadow-md">
              <template #icon><span>🛡️</span></template>
              配装模拟器
            </n-button>
          </router-link>
          <router-link to="/vble/economy">
            <n-button type="warning" size="medium" round secondary class="shadow-md">
              <template #icon><span>🦚</span></template>
              七色尾巴兑换
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

    <!-- 焦点巨献：至高超越神兵「诸神之黄昏 (Ragnarok)」专属展示展台 -->
    <div class="ragnarok-spotlight p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/50 to-slate-900 border-2 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)] relative overflow-hidden">
      <div class="absolute -right-8 -top-8 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div class="lg:col-span-8 space-y-3">
          <div class="flex flex-wrap items-center gap-2">
            <n-tag size="small" type="error" round strong>至高超越神兵 (SSR+)</n-tag>
            <span class="text-xs text-amber-400 font-mono tracking-wider">SUPREME WEAPON OF THE VOID</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white text-glow-amber">
            诸神之黄昏 (Ragnarok) · 终焉巨剑
          </h2>
          <div class="text-xs text-cyan-300 font-semibold">
            ⚔️ 面板攻击: 攻击力 +180 · 全属性 +10 · 暴击率 +30% · 破防 50%
          </div>
          <p class="text-xs text-gray-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <strong>【神兵机制】:</strong> 历代最终幻想最强象征圣剑。普通攻击必定破除敌方 50% 物理护甲，平砍 20% 概率呼唤【圣光核爆 (Flare)】全场湮灭，对龙族与恶魔造成 300% 灭绝特攻。击破次元之隙隐藏深渊首领【神龙 (Shinryu)】方可开启宝箱解封。
          </p>
          <div class="flex flex-wrap items-center gap-3 text-xs pt-1">
            <span class="text-amber-400 font-bold">📍 唯一获取地:</span>
            <span class="text-gray-200">次元之隙 隐藏深渊宝箱 (神龙守护) / 纳哈特专属始源试炼</span>
            <span class="text-purple-400 ml-2">纳哈特专属进化:【终焉诸神之黄昏·改 (攻+200)】</span>
          </div>
        </div>

        <div class="lg:col-span-4 p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center space-y-2">
          <div class="text-3xl">🗡️</div>
          <div class="text-sm font-bold text-amber-300">终焉诸神系列神装</div>
          <p class="text-[11px] text-gray-400">
            包含诸神之黄昏 (圣剑)、诸神之杖 (法系1.5倍穿甲)、诸神之铠 (全属性吸收免控)
          </p>
          <n-button size="small" type="warning" secondary @click="selectedCategory = 'ragnarok'">
            筛选诸神系列装备
          </n-button>
        </div>
      </div>
    </div>

    <!-- 模式切换标签页 -->
    <div class="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
      <button
        v-for="tab in tabList"
        :key="tab.key"
        type="button"
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
        :class="activeTab === tab.key
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
          : 'bg-slate-900 text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-800'"
        @click="activeTab = tab.key"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.badge"
          class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-600 text-white font-bold"
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <!-- 1. 神兵全图鉴矩阵 -->
    <div v-if="activeTab === 'catalog'" class="space-y-6">
      <!-- 过滤器与搜索栏 -->
      <div class="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
        <div class="flex flex-wrap gap-1.5" role="group" aria-label="神兵分类">
          <n-button
            v-for="cat in categories"
            :key="cat.id"
            size="small"
            :type="selectedCategory === cat.id ? 'primary' : 'default'"
            secondary
            class="equipment-category-button"
            :aria-pressed="selectedCategory === cat.id"
            @click="selectedCategory = cat.id"
          >
            {{ cat.name }}
          </n-button>
        </div>

        <n-input
          v-model:value="searchQuery"
          :input-props="{ 'aria-label': '搜索神兵名称、特权或来源' }"
          placeholder="搜索神兵名称、特权或来源..."
          size="small"
          clearable
          style="width: 220px;"
        >
          <template #prefix>🔍</template>
        </n-input>
      </div>

      <!-- 武器卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <n-card
          v-for="eq in filteredEquipment"
          :key="eq.id"
          hoverable
          class="border border-slate-700/60 bg-[#121626]/90 rounded-xl transition-all hover:border-amber-400/50"
          :class="{ 'border-amber-500/60! shadow-[0_0_20px_rgba(245,158,11,0.2)] bg-gradient-to-b from-[#181a2e] to-[#121626]': eq.name.includes('诸神') }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 overflow-hidden">
                <span v-if="eq.name.includes('诸神')" class="text-amber-400 text-sm">👑</span>
                <span class="text-base font-bold text-amber-300 truncate">{{ eq.name }}</span>
              </div>
              <n-tag size="tiny" :type="eq.name.includes('诸神') ? 'error' : 'warning'">{{ eq.type }}</n-tag>
            </div>
          </template>

          <div class="space-y-3 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>装配权限: <strong class="text-cyan-300">{{ eq.job }}</strong></span>
            </div>

            <div class="p-2.5 bg-slate-900/80 rounded border border-slate-800 space-y-1">
              <div class="text-red-400 font-bold">⚔️ 属性面板: {{ eq.stats }}</div>
              <div class="text-yellow-300/90 leading-relaxed">⚡ 神器特权: {{ eq.effect }}</div>
            </div>

            <div class="text-gray-400 leading-tight">
              📍 契约来源: <span class="text-gray-200">{{ eq.origin }}</span>
            </div>

            <div class="text-purple-300 text-[11px] font-semibold">
              🌟 认证等级: {{ eq.rarity }}
            </div>
          </div>

          <template #action>
            <div class="flex items-center justify-between pt-1">
              <span class="text-[11px] font-mono text-cyan-300 font-bold">ID: {{ eq.id }}</span>
              <router-link :to="'/vble/equipment/' + eq.id">
                <n-button size="small" type="warning" round secondary class="shadow-sm">
                  <template #icon><span>⚔️</span></template>
                  神装全息独立检视 →
                </n-button>
              </router-link>
            </div>
          </template>
        </n-card>
      </div>
    </div>

    <!-- 2. 二刀流主副手伤害推演工坊 -->
    <div v-if="activeTab === 'dual_wield'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>⚔️</span> 二刀流双持与魔法剑乱打伤害工坊 (Dual-Wield Simulator)
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              模拟忍者与自由人双持两柄神兵时的真实攻击力合成、主副手双段伤害结算、魔法剑属性附魔与 4 连击 / 8 连击乱打总爆发。
            </p>
          </div>
          <n-button size="small" round secondary type="warning" @click="resetDualWield">
            重置双持配置
          </n-button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 左侧配置区 -->
          <div class="space-y-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div class="text-xs font-bold text-amber-300 uppercase tracking-wider">
              ⚙️ 双持装配控制台
            </div>

            <!-- 主手武器 -->
            <div class="space-y-1">
              <label class="text-xs text-gray-300 font-semibold">右手主武器 (Main Hand):</label>
              <select
                v-model="dwState.mainWeaponId"
                class="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-xs focus:border-amber-400 outline-none"
              >
                <option v-for="w in weaponOptions" :key="w.id" :value="w.id">
                  {{ w.name }} (攻 +{{ w.atk }})
                </option>
              </select>
            </div>

            <!-- 副手武器 -->
            <div class="space-y-1">
              <label class="text-xs text-gray-300 font-semibold">左手副武器 (Off Hand):</label>
              <select
                v-model="dwState.offWeaponId"
                class="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-xs focus:border-amber-400 outline-none"
              >
                <option v-for="w in weaponOptions" :key="w.id" :value="w.id">
                  {{ w.name }} (攻 +{{ w.atk }})
                </option>
              </select>
            </div>

            <!-- 魔法剑附魔 -->
            <div class="space-y-1">
              <label class="text-xs text-gray-300 font-semibold">魔法剑附魔 (Spellblade):</label>
              <select
                v-model="dwState.spellblade"
                class="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-xs focus:border-amber-400 outline-none"
              >
                <option value="none">无附魔 (纯物理)</option>
                <option value="flare">魔法剑 · 核爆 Flare (+100 伤害, 无视防御)</option>
                <option value="thundaga">魔法剑 · 闪雷 Thundaga (雷属性 2.0x / 机械 4.0x)</option>
                <option value="holy">魔法剑 · 神圣 Holy (圣属性 2.0x / 不死 3.0x)</option>
                <option value="drain">魔法剑 · 吸血 Drain (转化 100% 伤害为治疗)</option>
              </select>
            </div>

            <!-- 乱打战技模式 -->
            <div class="space-y-1 pt-2 border-t border-slate-800">
              <label class="text-xs text-gray-300 font-semibold">攻击姿态 / 战技:</label>
              <div class="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-center"
                  :class="dwState.stance === 'normal'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-900 text-gray-300 border-slate-800 hover:bg-slate-800'"
                  @click="dwState.stance = 'normal'"
                >
                  双刀常规普攻 (2连)
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg text-xs font-semibold border transition-all text-center"
                  :class="dwState.stance === 'rapid_fire'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-900 text-gray-300 border-slate-800 hover:bg-slate-800'"
                  @click="dwState.stance = 'rapid_fire'"
                >
                  极意乱打 (8连击)
                </button>
              </div>
            </div>

            <!-- 角色力量属性设定 -->
            <div class="space-y-1 pt-2 border-t border-slate-800">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">角色力量 (STR):</span>
                <span class="font-mono text-amber-400 font-bold">{{ dwStr }} 点</span>
              </div>
              <n-slider v-model:value="dwStr" :min="10" :max="120" :step="5" />
            </div>

            <!-- 目标首领与防御 -->
            <div class="space-y-1 pt-2 border-t border-slate-800">
              <label class="text-xs text-gray-300 font-semibold block mb-1">靶标受击目标 (Target):</label>
              <select
                v-model="dwTargetBoss"
                class="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-xs focus:border-amber-400 outline-none"
                @change="syncTargetDef"
              >
                <option value="dummy">原野试炼木桩 (DEF 40 · 无属性抗性)</option>
                <option value="omega">机械灭绝者 · 欧米茄 (DEF 150 · 弱闪雷 2x · 超高护甲)</option>
                <option value="shinryu">深渊神龙 · 真龙王 (DEF 120 · 龙属特攻 3x · 水吸收)</option>
                <option value="exdeath">虚空邪树 · 艾克斯迪斯 (DEF 90 · 圣属性神圣弱点 2x)</option>
              </select>
            </div>

            <div class="space-y-1 pt-1">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">敌方基础护甲 (DEF):</span>
                <span class="font-mono text-cyan-400 font-bold">{{ dwTargetDef }} 点</span>
              </div>
              <n-slider v-model:value="dwTargetDef" :min="0" :max="200" :step="10" />
            </div>
          </div>

          <!-- 右侧推演结果面板 -->
          <div class="lg:col-span-2 space-y-4">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">单轮攻击总段数</div>
                <div class="text-2xl font-black text-amber-400 font-mono mt-1">{{ dwTotalHits }} 击</div>
                <div class="text-[10px] text-gray-500 mt-0.5">{{ dwState.stance === 'rapid_fire' ? '8 段连续穿刺' : '主副双刀斩' }}</div>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">右手单发伤害</div>
                <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ dwMainHandHitDmg }}</div>
                <div class="text-[10px] text-gray-500 mt-0.5">主手武器面板</div>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">左手单发伤害</div>
                <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ dwOffHandHitDmg }}</div>
                <div class="text-[10px] text-gray-500 mt-0.5">副手武器面板</div>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center bg-amber-950/20">
                <div class="text-xs text-amber-300">预期总爆发伤害</div>
                <div class="text-2xl font-black text-amber-300 font-mono mt-1">{{ dwTotalBurstDamage.toLocaleString() }}</div>
                <div class="text-[10px] text-gray-400 mt-0.5">一轮 ATB 爆发总量</div>
              </div>
            </div>

            <!-- 结算拆解看板 -->
            <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div class="text-xs font-bold text-white flex items-center justify-between">
                <span class="flex items-center gap-1.5">
                  <span>📐</span> 经典 FF 二刀流伤害结算拆解 (Formula Breakdown)
                </span>
                <n-tag size="tiny" type="success">严格还原实机算法</n-tag>
              </div>

              <div class="space-y-2 text-xs font-mono text-gray-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <div>▸ 主手单发: (力{{ dwStr }}/2 + 武器攻{{ currentMainW.atk }}) × 基础倍率{{ dwMultiplier }} - (护甲{{ effectiveDef }} × 0.5) = {{ dwMainHandHitDmg }}</div>
                <div>▸ 副手单发: (力{{ dwStr }}/2 + 武器攻{{ currentOffW.atk }}) × 基础倍率{{ dwMultiplier }} - (护甲{{ effectiveDef }} × 0.5) = {{ dwOffHandHitDmg }}</div>
                <div v-if="dwState.spellblade !== 'none'" class="text-cyan-300">▸ 魔法剑附魔加成: {{ spellbladeDesc }}</div>
                <div class="text-amber-400 pt-1 border-t border-slate-800 font-bold">
                  ▸ 终极爆发合算: {{ dwTotalHits }} 段打击合计造成 {{ dwTotalBurstDamage.toLocaleString() }} 点输出！
                </div>
              </div>
            </div>

            <!-- 8 连击乱打实战出招模拟与命中流 -->
            <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <span>⚡</span> 8连击乱打实机时钟出招流演练
                </div>
                <div class="flex items-center gap-2">
                  <n-button size="tiny" type="primary" secondary round class="font-bold" :loading="isSimulatingHits" @click="runRapidFireSimulation">
                    ⚔️ 触发乱打连续攻击
                  </n-button>
                  <n-button size="tiny" secondary round @click="copyDualWieldReport">
                    📋 导出伤害报告
                  </n-button>
                </div>
              </div>

              <!-- 连击命中列表 -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div
                  v-for="(hit, idx) in simulatedHits"
                  :key="idx"
                  class="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between"
                  :class="{ 'border-amber-500/50 bg-amber-950/20': hit.isCrit }"
                >
                  <span class="text-gray-400">#{{ idx + 1 }} {{ hit.hand === 'main' ? '右手' : '左手' }}</span>
                  <span class="font-bold" :class="hit.isCrit ? 'text-amber-400 animate-pulse' : 'text-cyan-300'">
                    {{ hit.dmg }} {{ hit.isCrit ? '★' : '' }}
                  </span>
                </div>
              </div>

              <div class="text-[11px] text-gray-400 flex items-center justify-between pt-1">
                <span>实战 DPS 加成结算: <strong class="text-emerald-400">{{ simulatedDpsVerdict }}</strong></span>
                <span class="text-amber-400/80">暴击判定率: 25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. 太古封印神兵开光与符文附魔 -->
    <div v-if="activeTab === 'awakening'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>⚗️</span> 封印之城太古神兵二次开光与符石镶嵌工坊
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              封印之城库扎的 12 件太古神兵可通过镶嵌太古符石与稀有尾巴进行三阶孔位开光，觉醒第二专属被动神技。
            </p>
          </div>
          <span class="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
            12 件太古神兵全域收录
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="sealed in sealedWeapons"
            :key="sealed.id"
            class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <span>{{ sealed.icon }}</span>
                  <span>{{ sealed.name }}</span>
                </span>
                <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                  攻 +{{ sealed.atk }}
                </span>
              </div>
              <div class="text-xs text-gray-400">适配职业: <span class="text-gray-200">{{ sealed.job }}</span></div>
              <p class="text-xs text-gray-300 leading-relaxed">{{ sealed.baseEffect }}</p>
              
              <!-- 孔位开光与二阶觉醒特技 -->
              <div class="p-2.5 bg-slate-900/70 rounded-lg border border-slate-800 text-xs space-y-1">
                <div class="text-amber-400 font-bold flex items-center gap-1">
                  <span>✨</span> 开光觉醒特技:
                </div>
                <div class="text-gray-300 text-[11px]">{{ sealed.awakenedEffect }}</div>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span class="text-gray-500 font-mono text-[11px]">封印之城 库扎</span>
              <n-tag size="tiny" type="warning" round strong>太古圣遗物</n-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 太古十二神兵共鸣与破限精炼工坊 (Ancient Twelve Relics Resonance & Overlimit Forge Studio) -->
    <div v-if="activeTab === 'relic_forge'" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c1308] via-[#141824] to-[#0c101a] border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.22)] space-y-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-amber-950 pb-5">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ANCIENT TWELVE RELICS RESONANCE & OVERLIMIT FORGE
              </span>
              <span class="text-xs text-gray-400 font-mono">v2.2.262 官方实机矩阵</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <span>✨</span> 太古十二神兵共鸣与破限精炼工坊
            </h2>
            <p class="text-xs text-gray-400 mt-1 max-w-3xl leading-relaxed">
              封印之城库扎十二太古神兵终极觉醒：支持多神兵契约共鸣羁绊（光圣双辉、疾风修罗、天地万象、宿命斩灭）、+10 极境破限锻造与属性附魔、动态对战神龙与欧米茄伤害测算及 SHA-256 方案书一键导出。
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <n-button size="small" secondary type="warning" @click="resetForgeStudio">
              🔄 重置锻造台
            </n-button>
            <n-button size="small" secondary type="primary" @click="maxOverlimitForge">
              ⚡ 一键满破 (+10 极境)
            </n-button>
            <n-button size="small" type="primary" class="font-bold shadow" @click="exportForgeCertificate">
              📜 导出精炼方案书
            </n-button>
          </div>
        </div>

        <!-- 三栏主推演工作台 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 栏 1: 太古神兵插槽与羁绊共鸣矩阵 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>🗡️</span>
                  <span>主副手太古神兵契约装配</span>
                </span>
                <n-tag size="tiny" type="warning">12 神兵自由组装</n-tag>
              </div>

              <!-- 主手选择 -->
              <div class="space-y-1">
                <label class="text-[11px] text-gray-400 block">主手太古神兵 (Primary Relic):</label>
                <select
                  v-model="primaryRelicId"
                  class="w-full bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold rounded-lg p-2 focus:border-amber-400 focus:outline-none"
                >
                  <option v-for="w in twelveRelicsList" :key="w.id" :value="w.id">
                    {{ w.icon }} {{ w.name }} (基础攻 +{{ w.atk }}) - {{ w.job }}
                  </option>
                </select>
              </div>

              <!-- 副手/共鸣契约神兵选择 -->
              <div class="space-y-1">
                <label class="text-[11px] text-gray-400 block">副手/共鸣神兵 (Secondary Relic):</label>
                <select
                  v-model="secondaryRelicId"
                  class="w-full bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-bold rounded-lg p-2 focus:border-cyan-400 focus:outline-none"
                >
                  <option v-for="w in twelveRelicsList" :key="w.id" :value="w.id">
                    {{ w.icon }} {{ w.name }} (基础攻 +{{ w.atk }}) - {{ w.job }}
                  </option>
                </select>
              </div>

              <!-- 激活的羁绊共鸣卡片 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-amber-500/30 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <span>✨</span>
                    <span>共鸣羁绊: {{ currentResonanceBond.title }}</span>
                  </span>
                  <n-tag size="tiny" :type="currentResonanceBond.tagType">{{ currentResonanceBond.tier }}</n-tag>
                </div>
                <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentResonanceBond.description }}</p>
                <div class="p-1.5 rounded bg-amber-950/40 border border-amber-900/50 text-[10px] text-amber-200">
                  ⚡ <strong>特效增益:</strong> {{ currentResonanceBond.bonusEffect }}
                </div>
              </div>
            </div>

            <!-- 神兵基底面板汇总 -->
            <div class="pt-2 border-t border-slate-800 space-y-1 text-xs text-gray-400">
              <div class="flex justify-between">
                <span>主副基准攻击合算:</span>
                <span class="font-mono font-bold text-white">{{ baseRelicsAtk }} Atk</span>
              </div>
              <div class="flex justify-between">
                <span>共鸣攻击力修正:</span>
                <span class="font-mono font-bold text-emerald-400">+{{ currentResonanceBond.atkBonus }} Atk</span>
              </div>
            </div>
          </div>

          <!-- 栏 2: 破限精炼熔炉与附魔宝石注入 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>🔥</span>
                <span>太古熔炉精炼与附魔参数</span>
              </span>
              <span class="font-mono text-xs text-amber-400 font-bold">+{{ overlimitLevel }} 破限阶位</span>
            </div>

            <div class="space-y-3 text-xs">
              <div>
                <div class="flex justify-between items-center text-gray-300 mb-1">
                  <span>精炼突破阶位 (Overlimit Level):</span>
                  <span class="font-mono text-amber-400 font-bold text-sm">+{{ overlimitLevel }} 阶</span>
                </div>
                <n-slider v-model:value="overlimitLevel" :min="0" :max="10" :step="1" />
              </div>

              <!-- 附魔宝石选择 -->
              <div>
                <label class="text-[11px] text-gray-400 block mb-1">太古附魔宝石注入 (Enchant Gem):</label>
                <select
                  v-model="selectedGemId"
                  class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-cyan-400 focus:outline-none"
                >
                  <option v-for="g in enchantGemsList" :key="g.id" :value="g.id">
                    {{ g.icon }} {{ g.name }} ({{ g.summary }})
                  </option>
                </select>
              </div>

              <!-- 暴击倍率与护甲贯穿滑块 -->
              <div>
                <div class="flex justify-between items-center text-gray-300 mb-1">
                  <span>暴击伤害加权倍率:</span>
                  <span class="font-mono text-cyan-400 font-bold">{{ critMultiplier.toFixed(1) }}x</span>
                </div>
                <n-slider v-model:value="critMultiplier" :min="1.5" :max="3.5" :step="0.1" />
              </div>

              <div>
                <div class="flex justify-between items-center text-gray-300 mb-1">
                  <span>真实穿甲率 (Armor Pierce):</span>
                  <span class="font-mono text-emerald-400 font-bold">{{ armorPierceRate }}%</span>
                </div>
                <n-slider v-model:value="armorPierceRate" :min="0" :max="100" :step="5" />
              </div>

              <!-- 最终实机面板指标卡 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">最终实机攻击力:</span>
                  <span class="font-mono font-bold text-amber-300 text-sm">{{ finalForgeAtk }} Atk</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">综合暴击率:</span>
                  <span class="font-mono font-bold text-cyan-300">{{ finalCritRate }}%</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">附魔属性加持:</span>
                  <span class="text-purple-300 font-bold">{{ currentEnchantGem.elementBonus }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 栏 3: 对战试炼解算与首领斩杀推演 -->
          <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>📊</span>
                  <span>首领对战斩杀测算沙盘</span>
                </span>
                <n-tag size="tiny" type="error">{{ duelTrialResult.rating }} 评级</n-tag>
              </div>

              <div>
                <label class="text-[11px] text-gray-400 block mb-1">推演挑战目标 (Simulation Target):</label>
                <select
                  v-model="selectedBossTargetId"
                  class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
                >
                  <option v-for="b in bossTargetsList" :key="b.id" :value="b.id">
                    {{ b.icon }} {{ b.name }} (HP: {{ b.hp.toLocaleString() }}, 防御: {{ b.def }})
                  </option>
                </select>
              </div>

              <!-- 试炼伤害看板 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">单轮连击期望总伤害 (Expected Burst)</div>
                <div class="text-2xl sm:text-3xl font-black font-mono mt-1 text-rose-400">
                  {{ duelTrialResult.expectedBurstDamage.toLocaleString() }}
                </div>
                <div class="text-[10px] text-emerald-400 mt-0.5">
                  预计 {{ duelTrialResult.turnsToKill }} 轮斩杀首领！(破限真实贯穿)
                </div>
              </div>

              <div class="space-y-1.5 text-xs">
                <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span class="text-gray-400">目标首领基础生命:</span>
                  <span class="font-mono text-gray-200">{{ currentBossTarget.hp.toLocaleString() }} HP</span>
                </div>
                <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span class="text-gray-400">穿甲后实际有效防御:</span>
                  <span class="font-mono text-cyan-400">{{ duelTrialResult.effectiveDef }} Def</span>
                </div>
                <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span class="text-gray-400">斩杀战术评级:</span>
                  <span class="font-mono font-bold text-amber-400">{{ duelTrialResult.tacticalGrade }}</span>
                </div>
              </div>
            </div>

            <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
              锻造箴言：封印神兵达到 +10 满破后，搭配【光圣双辉】或【宿命斩灭】共鸣，可实现单轮 99999 极限暴击贯穿，无视欧米茄 220 钢铁防御！
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. 太古神兵符文熔铸与多维词缀萃取工坊 -->
    <div v-if="activeTab === 'rune_infusion'" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-[#0d0f1e]/95 border border-amber-500/30 space-y-6 shadow-[0_0_35px_rgba(245,158,11,0.18)] relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 头部标章 -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                v2.2.277 重磅实装
              </span>
              <span class="text-xs text-gray-400">太古卢恩符文熔铸 · 词缀多维萃取</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>🔮</span> 太古神兵符文熔铸与多维词缀萃取工坊
            </h2>
            <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
              基于远古卢恩铭文与以太晶格退火算法，解算全域神兵附加属性萃取、词缀基因突变、热应力耐受度与极境攻击力合成。
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <n-button
              type="primary"
              size="small"
              round
              secondary
              :loading="isSimulatingRune"
              @click="simulateRuneInfusion"
            >
              <template #icon><span>⚡</span></template>
              激发符文熔铸萃取
            </n-button>
            <n-button
              type="info"
              size="small"
              round
              secondary
              @click="exportRuneInfusionCertificate"
            >
              <template #icon><span>📜</span></template>
              导出方案证书
            </n-button>
          </div>
        </div>

        <!-- 四大铭文预设 Presets -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="inscription in runeInscriptions"
            :key="inscription.id"
            class="p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
            :class="selectedRuneInscriptionId === inscription.id
              ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
            @click="applyRuneInscription(inscription.id)"
          >
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xl">{{ inscription.icon }}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded font-mono" :class="selectedRuneInscriptionId === inscription.id ? 'bg-amber-500/30 text-amber-200' : 'bg-slate-800 text-gray-400'">
                  {{ inscription.tag }}
                </span>
              </div>
              <div class="font-bold text-xs text-gray-200">{{ inscription.name }}</div>
              <div class="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{{ inscription.affixText }}</div>
            </div>
            <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span class="text-gray-400">符文能级:</span>
              <span class="font-mono font-bold text-amber-300">{{ inscription.energy }} 卢恩</span>
            </div>
          </div>
        </div>

        <!-- 双栏交互面板 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- 左侧：实时熔炉视窗与物理计算 -->
          <div class="lg:col-span-7 space-y-4">
            <!-- 熔炉全息视窗 -->
            <div class="relative h-64 sm:h-72 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
              <!-- 背景光斑与炼金法阵 SVG 模拟 -->
              <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div
                  class="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                  :style="{
                    background: currentRuneInscription.gradient,
                    opacity: (affixPurity / 100 * 0.85).toFixed(2),
                    transform: `scale(${1 + voidCatalyst * 0.05})`
                  }"
                ></div>
                <svg class="w-60 h-60 opacity-60 animate-[spin_35s_linear_infinite]" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(245,158,11,0.4)" stroke-width="1.5" stroke-dasharray="6 3" />
                  <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(168,85,247,0.4)" stroke-width="1" />
                  <rect x="50" y="50" width="100" height="100" fill="none" stroke="rgba(6,182,212,0.5)" stroke-width="1.5" transform="rotate(45 100 100)" />
                  <polygon points="100,20 180,150 20,150" fill="none" stroke="rgba(239,68,68,0.5)" stroke-width="1.5" />
                  <circle cx="100" cy="100" r="15" fill="none" stroke="rgba(245,158,11,0.8)" stroke-width="2" />
                </svg>
              </div>

              <!-- 顶部状态指示灯与采样模式 -->
              <div class="relative z-10 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span class="font-mono text-amber-300 font-bold">RUNE INFUSION ACTIVE</span>
                  <span class="text-gray-400 font-mono text-[10px]">| {{ forgeTemperature }}°C</span>
                </div>
                <div class="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-cyan-300">
                  纯度: {{ affixPurity }}%
                </div>
              </div>

              <!-- 中间标语 -->
              <div class="relative z-10 text-center my-auto">
                <div class="text-2xl font-black text-white/90 tracking-wider font-mono drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                  {{ currentRuneInscription.name }}
                </div>
                <div class="text-xs text-amber-200/80 mt-1 font-mono">
                  最终实机攻击: {{ runeMetrics.finalAtk }} Atk · 词缀总分: {{ runeMetrics.affixScore }} 分
                </div>
              </div>

              <!-- 底部性能与管线参数微视窗 -->
              <div class="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-gray-400">
                <span>虚空催化剂: {{ voidCatalyst.toFixed(1) }} ml</span>
                <span class="text-emerald-400 font-bold">热应力安全余量: {{ runeMetrics.safetyMargin }}%</span>
              </div>
            </div>

            <!-- 4 维物理与战斗指标卡片 -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">熔铸最终攻击力</div>
                <div class="font-mono text-amber-400 font-bold text-sm mt-0.5">{{ runeMetrics.finalAtk }} Atk</div>
                <div class="text-[9px] text-gray-500 mt-0.5">基础 + 符文能级</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">词缀综合评分</div>
                <div class="font-mono text-cyan-400 font-bold text-sm mt-0.5">{{ runeMetrics.affixScore }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">神兵 Gear Score</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">热应力安全余量</div>
                <div class="font-mono text-emerald-400 font-bold text-sm mt-0.5">{{ runeMetrics.safetyMargin }}%</div>
                <div class="text-[9px] text-gray-500 mt-0.5">晶格防崩塌稳态</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">熔炼精炼评级</div>
                <div class="font-mono text-purple-400 font-bold text-xs mt-0.5 truncate">{{ runeMetrics.rating }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">太古封印铭刻</div>
              </div>
            </div>

            <!-- 实时熔炼日志终端 -->
            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
              <div class="flex items-center justify-between text-xs text-gray-400 pb-1.5 border-b border-slate-800">
                <span class="flex items-center gap-1.5 text-amber-300 font-bold">
                  <span>💻</span> 符文熔铸与词缀萃取日志 (Rune Infusion Terminal)
                </span>
                <span class="text-[10px] text-gray-500">晶格自适应: 实时同步</span>
              </div>
              <div class="space-y-1 text-[11px] text-gray-300 max-h-28 overflow-y-auto custom-scrollbar">
                <div v-for="(log, idx) in runeSimulationLogs" :key="idx" class="flex items-start gap-1.5">
                  <span class="text-amber-500 select-none">&gt;</span>
                  <span :class="log.includes('完成') || log.includes('成功') ? 'text-emerald-400' : 'text-gray-300'">{{ log }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：无极物理调优与熔炉 Uniforms -->
          <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div class="text-xs font-bold text-amber-300 flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="flex items-center gap-1.5">
                <span>🎛️</span> 符文熔铸参数微调 (Rune Uniforms)
              </span>
              <button
                type="button"
                class="text-[10px] text-gray-400 hover:text-amber-300 cursor-pointer"
                @click="resetRuneParams"
              >
                重置参数
              </button>
            </div>

            <!-- 符文共鸣能级 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>符文共鸣能级 (Rune Energy Level):</span>
                <span class="font-mono text-amber-400 font-bold">{{ runeEnergyLevel }} 卢恩</span>
              </div>
              <n-slider v-model:value="runeEnergyLevel" :min="100" :max="999" :step="5" />
              <div class="flex justify-between text-[9px] text-gray-500">
                <span>100 基础符文</span>
                <span>550 远古以太</span>
                <span>999 创世神威</span>
              </div>
            </div>

            <!-- 词缀萃取纯度 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>词缀萃取纯度 (Affix Purity):</span>
                <span class="font-mono text-cyan-400 font-bold">{{ affixPurity }}%</span>
              </div>
              <n-slider v-model:value="affixPurity" :min="50" :max="100" :step="1" />
            </div>

            <!-- 晶石熔铸温度 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>晶石熔铸温度 (Forge Temperature):</span>
                <span class="font-mono text-rose-400 font-bold">{{ forgeTemperature }} °C</span>
              </div>
              <n-slider v-model:value="forgeTemperature" :min="800" :max="2400" :step="20" />
            </div>

            <!-- 虚空催化剂注入量 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>虚空催化剂注入量 (Void Catalyst Dosage):</span>
                <span class="font-mono text-purple-400 font-bold">{{ voidCatalyst.toFixed(1) }} ml</span>
              </div>
              <n-slider v-model:value="voidCatalyst" :min="0.0" :max="10.0" :step="0.1" />
            </div>

            <!-- 特性开关组 -->
            <div class="pt-2 border-t border-slate-800 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【太古原始词缀固化锁 (Affix Lock)】:</span>
                <n-switch v-model:value="enableAncientAffixLock" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【超导以太晶格退火 (Cryo Annealing)】:</span>
                <n-switch v-model:value="enableSuperconductingMatrix" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【超限词缀基因激变 (Mutation)】:</span>
                <n-switch v-model:value="enableOverlimitExtraction" size="small" />
              </div>
            </div>

            <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
              💡 熔铸原理：注入高纯度卢恩符文与微量虚空催化剂，可激发装备沉睡的多维词缀，大幅提升二刀流乱打穿透伤害与暴击系数。
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全域太古神兵圣遗物灵髓注能、永恒传世精炼与神格觉醒工坊 (Essence Infusion Studio v2.2.299) -->
    <div v-if="activeTab === 'essence_infusion'" id="essence-infusion-studio" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/70 via-slate-900/95 to-purple-950/70 border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.22)] space-y-6 relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 头部标章与控制 -->
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-950/60 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                v2.2.299 重磅实装
              </span>
              <span class="text-xs text-gray-400 font-mono">ANCIENT RELIC ESSENCE & DIVINE AWAKENING</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-tight">
              <span>👑</span> 全域太古神兵圣遗物灵髓注能、永恒传世精炼与神格觉醒工坊
            </h2>
            <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
              对齐 Godot 4.6 LTS 圣遗物灵髓注能与神性破限标准：深度覆盖四大圣遗物神格流派、四维连续注能参数、三大传世神兵保护断路器、五阶段神格觉醒仿真推演与防伪证书导出。
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0 flex-wrap">
            <n-button size="small" secondary type="warning" @click="resetEssenceParameters">
              🔄 重置灵髓参数
            </n-button>
            <n-button size="small" type="primary" class="font-bold shadow" @click="exportEssenceCertificate">
              📜 导出传世方案书
            </n-button>
          </div>
        </div>

        <!-- 四大圣遗物神格流派选择卡 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="arch in essenceArchetypes"
            :key="arch.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedEssenceId === arch.id
              ? 'bg-amber-950/50 border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'"
            @click="selectedEssenceId = arch.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ arch.icon }}</span>
              <n-tag :type="selectedEssenceId === arch.id ? 'warning' : 'default'" size="tiny" round>
                {{ arch.tag }}
              </n-tag>
            </div>
            <div class="text-sm font-bold text-white mb-1">{{ arch.name }}</div>
            <div class="text-[11px] text-gray-400 leading-relaxed mb-3">{{ arch.desc }}</div>
            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span class="text-gray-400">神性奥义</span>
              <span class="text-amber-300 font-semibold">{{ arch.perk }}</span>
            </div>
          </div>
        </div>

        <!-- 参数微调滑块与安全防护盾 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <!-- 左侧: 4维连续参数调节 (7 cols) -->
          <div class="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold text-sm">🎛️ 圣遗物灵髓注能连续调控矩阵</span>
                <span class="text-[11px] text-gray-400 font-mono">4-Axis Essence Sliders</span>
              </div>
              <button
                type="button"
                class="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                @click="resetEssenceParameters"
              >
                重置参数
              </button>
            </div>

            <!-- 滑块 1: 灵髓浸润深度 -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-300 font-medium flex items-center gap-1.5">
                  <span>💧</span> 灵髓浸润深度 (Essence Depth)
                </span>
                <span class="font-mono text-cyan-400 font-bold">{{ essenceDepth }}%</span>
              </div>
              <n-slider
                v-model:value="essenceDepth"
                :min="10"
                :max="100"
                :step="5"
                :tooltip="false"
              />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>10% (表层附着)</span>
                <span>55% (晶格交融)</span>
                <span>100% (神核始源同化)</span>
              </div>
            </div>

            <!-- 滑块 2: 神性共鸣频率 -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-300 font-medium flex items-center gap-1.5">
                  <span>✨</span> 神性共鸣频率 (Resonance Hertz)
                </span>
                <span class="font-mono text-amber-400 font-bold">{{ resonanceHertz }} Hz</span>
              </div>
              <n-slider
                v-model:value="resonanceHertz"
                :min="100"
                :max="999"
                :step="10"
                :tooltip="false"
              />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>100 Hz (低频脉冲)</span>
                <span>528 Hz (神圣奇迹谐波)</span>
                <span>999 Hz (太古创世神频)</span>
              </div>
            </div>

            <!-- 滑块 3: 高炉淬火极温 -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-300 font-medium flex items-center gap-1.5">
                  <span>🔥</span> 高炉淬火极温 (Quenching Temp)
                </span>
                <span class="font-mono text-rose-400 font-bold">{{ quenchTemp }} ℃</span>
              </div>
              <n-slider
                v-model:value="quenchTemp"
                :min="1200"
                :max="4500"
                :step="100"
                :tooltip="false"
              />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>1200 ℃ (晶钢重铸)</span>
                <span>2800 ℃ (以太熔融态)</span>
                <span>4500 ℃ (超新星等离子炽炎)</span>
              </div>
            </div>

            <!-- 滑块 4: 以太压缩比率 -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-300 font-medium flex items-center gap-1.5">
                  <span>⚡</span> 以太压缩比率 (Compression Ratio)
                </span>
                <span class="font-mono text-purple-400 font-bold">{{ aetherCompression.toFixed(1) }}x</span>
              </div>
              <n-slider
                v-model:value="aetherCompression"
                :min="1.0"
                :max="5.0"
                :step="0.1"
                :tooltip="false"
              />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>1.0x (常压自然态)</span>
                <span>3.0x (结晶致密化)</span>
                <span>5.0x (奇点无限坍缩)</span>
              </div>
            </div>
          </div>

          <!-- 右侧: 3大神兵保护断路器 (5 cols) -->
          <div class="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
            <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span class="text-amber-400 font-bold text-sm">🛡️ 神兵传世断路器与破限特权</span>
              <n-tag type="warning" size="tiny" round>主动安全特权</n-tag>
            </div>

            <div class="space-y-3">
              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🔒</span> 晶格过热防碎裂神圣封印
                  </div>
                  <div class="text-[11px] text-gray-400">极温超频失败零碎裂降阶，保底返还 90% 灵髓</div>
                </div>
                <n-switch v-model:value="antiShatterDivineSeal" size="small" />
              </div>

              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>👑</span> 神格觉醒极品词缀锁相环
                  </div>
                  <div class="text-[11px] text-gray-400">锁定暴击与穿透词缀下限，必出 SSS 级神性特质</div>
                </div>
                <n-switch v-model:value="godhoodAffixLock" size="small" />
              </div>

              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>💥</span> 超越 999999 破限真伤之印
                  </div>
                  <div class="text-[11px] text-gray-400">解除伤害上限，单次暴击最高可达 9,999,999</div>
                </div>
                <n-switch v-model:value="transcendenceTrueDamageCap" size="small" />
              </div>
            </div>

            <!-- 能效雷达卡 -->
            <div class="p-3 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 space-y-2">
              <div class="text-xs font-bold text-amber-300 flex items-center justify-between">
                <span>圣遗物注能综合成功率</span>
                <span class="font-mono text-emerald-400 font-bold">{{ calculatedInfusionSuccessRate.toFixed(1) }}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-400 h-1.5 rounded-full transition-all duration-300"
                  :style="{ width: Math.min(calculatedInfusionSuccessRate, 100) + '%' }"
                ></div>
              </div>
              <div class="text-[10px] text-gray-400 flex justify-between">
                <span>锻造容限: 75.0%</span>
                <span class="text-amber-400">晶格稳态: {{ calculatedInfusionSuccessRate > 92 ? '神圣永固' : '高度稳定' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 实时解算数值仪表盘 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div class="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 text-center shadow-lg">
            <div class="text-[11px] text-gray-400">神圣神兵战力 (CP)</div>
            <div class="text-2xl font-black text-amber-400 font-mono mt-1">+{{ calculatedRelicCP.toLocaleString() }}</div>
            <div class="text-[10px] text-amber-300/80 mt-0.5">全员神性属性加权</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-rose-500/30 text-center shadow-lg">
            <div class="text-[11px] text-gray-400">单发破限爆发真伤</div>
            <div class="text-2xl font-black text-rose-400 font-mono mt-1">{{ calculatedTrueDmg.toLocaleString() }} DMG</div>
            <div class="text-[10px] text-rose-300/80 mt-0.5">无视全防御绝对真伤</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center shadow-lg">
            <div class="text-[11px] text-gray-400">以太浸润纯度</div>
            <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ (essenceDepth * 0.98).toFixed(1) }}%</div>
            <div class="text-[10px] text-cyan-300/80 mt-0.5">无杂质灵髓结晶率</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 text-center shadow-lg">
            <div class="text-[11px] text-gray-400">神兵传世认证位阶</div>
            <div class="text-2xl font-black text-purple-400 font-mono mt-1">{{ relicDivineTier }}</div>
            <div class="text-[10px] text-purple-300/80 mt-0.5">太古创世真神极境</div>
          </div>
        </div>

        <!-- 五阶段神格觉醒推演仿真终端 -->
        <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-amber-500/30 shadow-2xl space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="text-amber-400 font-bold text-sm">⚡ 圣遗物灵髓注能与神格觉醒五阶段推演终端</span>
              <n-tag type="warning" size="tiny" round>Live Forge Pipeline</n-tag>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 shadow-md disabled:opacity-50"
                :disabled="isSimulatingEssence"
                @click="runEssenceSimulation"
              >
                {{ isSimulatingEssence ? '正在注能淬火中...' : '▶ 启动全流程神格觉醒推演' }}
              </button>
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 transition-all cursor-pointer"
                @click="exportEssenceCertificate"
              >
                📜 导出传世方案书
              </button>
            </div>
          </div>

          <!-- 5 阶段步进进度 -->
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
            <div
              v-for="(stg, idx) in essenceStages"
              :key="stg.id"
              class="p-2.5 rounded-lg border text-xs transition-all flex flex-col justify-between"
              :class="essenceSimulationStep >= idx + 1
                ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
                : 'bg-slate-900/60 border-slate-800/80 text-gray-500'"
            >
              <div class="font-bold mb-1 flex items-center gap-1">
                <span>{{ essenceSimulationStep >= idx + 1 ? '✅' : '⏳' }}</span>
                <span>第 {{ idx + 1 }} 阶: {{ stg.title }}</span>
              </div>
              <div class="text-[10px] leading-tight opacity-80">{{ stg.desc }}</div>
            </div>
          </div>

          <!-- 推演日志视窗 -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-gray-300 max-h-48 overflow-y-auto space-y-1">
            <div v-for="(log, idx) in essenceLogs" :key="idx" class="flex items-start gap-2">
              <span class="text-amber-400 select-none">›</span>
              <span :class="log.color || 'text-gray-300'">{{ log.text }}</span>
            </div>
            <div v-if="essenceLogs.length === 0" class="text-gray-600 italic">
              等待启动推演... 点击上方【启动全流程神格觉醒推演】按键开始推演。
            </div>
          </div>
        </div>

        <!-- Godot 4.6 LTS 3 Tab 源码展台 -->
        <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="text-cyan-400 font-bold text-sm">💻 Godot 4.6 LTS 圣遗物灵髓注能实机脚本</span>
              <n-tag type="info" size="tiny" round>RefCounted 核心架构</n-tag>
            </div>
            <div class="flex gap-2">
              <button
                v-for="st in essenceScriptTabs"
                :key="st.key"
                type="button"
                class="px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border"
                :class="activeEssenceScriptTab === st.key
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-900 text-gray-400 border-slate-800 hover:text-white'"
                @click="activeEssenceScriptTab = st.key"
              >
                {{ st.name }}
              </button>
            </div>
          </div>

          <div class="relative">
            <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed max-h-96">{{ currentEssenceScriptCode }}</pre>
            <button
              type="button"
              class="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] text-gray-300 border border-slate-700 cursor-pointer transition-colors"
              @click="copyEssenceScript"
            >
              📋 复制代码
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. 十二太古封印神兵谱系、套装共鸣与精炼突破工坊 (v2.2.319 重磅实装) -->
    <div v-if="activeTab === 'sealed_relic_breakthrough'" id="sealed-relic-breakthrough-studio" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-amber-950/20 to-slate-900/95 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)] space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                SEALED RELIC BREAKTHROUGH & SET SYNERGY
              </span>
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                v2.2.319 旗舰实装
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
              <span>⚡</span> 十二太古封印神兵谱系、套装共鸣与精炼突破工坊
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
              深度解析库扎封印城太古十二神兵真名觉醒、四件套跨界共鸣光环、二刀流零衰减副手破限与 Godot 4.6 LTS 实机驱动。
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button size="small" round secondary type="warning" @click="resetRelicDefaults">
              <template #icon><span>↺</span></template>
              重置参数
            </n-button>
            <n-button size="small" round type="warning" :loading="isRelicSimulating" @click="runRelicSimulation">
              <template #icon><span>⚡</span></template>
              启动破限沙盘推演
            </n-button>
            <n-button size="small" round secondary type="info" @click="exportRelicCert">
              <template #icon><span>📜</span></template>
              导出神兵契约认证
            </n-button>
          </div>
        </div>

        <!-- 四大太古神兵原型选择 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="archetype in relicArchetypes"
            :key="archetype.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedRelicArchetype === archetype.id ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
            @click="selectRelicArchetype(archetype.id)"
          >
            <div class="flex items-start justify-between">
              <div class="text-2xl">{{ archetype.icon }}</div>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold" :class="archetype.tagClass">
                {{ archetype.typeTag }}
              </span>
            </div>
            <h3 class="font-bold text-white text-base mt-2">{{ archetype.name }}</h3>
            <p class="text-xs text-amber-300/80 mt-1">{{ archetype.desc }}</p>
            <div class="mt-3 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-gray-400">
              <div class="flex justify-between">
                <span>觉醒真名:</span>
                <span class="text-cyan-300 font-mono">{{ archetype.trueName }}</span>
              </div>
              <div class="flex justify-between">
                <span>极意特化:</span>
                <span class="text-emerald-300 font-mono">{{ archetype.specialization }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 四维精炼与突破调控滑块 -->
        <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-white flex items-center justify-between">
            <span class="flex items-center gap-2"><span>🎛️</span> 太古封印解锁与神兵精炼参数调控</span>
            <span class="text-xs text-amber-400 font-mono">Realtime Dynamic Calculations</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">神兵精炼强化等级 (阶数):</span>
                <span class="text-amber-400 font-mono font-bold">+{{ relicRefineLevel }} 阶 (极意真火)</span>
              </div>
              <n-slider v-model:value="relicRefineLevel" :min="1" :max="20" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>+1 凡铁</span>
                <span>+10 灵阶</span>
                <span>+20 太古神话</span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">太古封印解锁深度 (%):</span>
                <span class="text-cyan-400 font-mono font-bold">{{ sealUnlockDepth }}% 符文解封</span>
              </div>
              <n-slider v-model:value="sealUnlockDepth" :min="10" :max="100" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>10% 初识封印</span>
                <span>50% 核心解封</span>
                <span>100% 完整真名</span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">套装羁绊共鸣共振频段 (MHz):</span>
                <span class="text-purple-400 font-mono font-bold">{{ synergyResonanceHz }} MHz (以太律动)</span>
              </div>
              <n-slider v-model:value="synergyResonanceHz" :min="100" :max="1000" :step="50" />
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>100 低频</span>
                <span>500 中频谐振</span>
                <span>1000 极意高频</span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">极意破限附魔纯度 (%):</span>
                <span class="text-emerald-400 font-mono font-bold">{{ breakthroughPurity }}% (秘银圣印)</span>
              </div>
              <n-slider v-model:value="breakthroughPurity" :min="50" :max="100" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>50% 凡阶纯度</span>
                <span>80% 圣阶沉淀</span>
                <span>100% 绝品真圣</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 三大神兵突破特权开关 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-white">封印神兵真名觉醒</div>
              <div class="text-[10px] text-gray-400 mt-0.5">真伤倍率突破至 3.5x，触发觉醒特写</div>
            </div>
            <n-switch v-model:value="enableTrueNameAwakening" size="small" />
          </div>

          <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-white">太古四件套跨界共鸣光环</div>
              <div class="text-[10px] text-gray-400 mt-0.5">全队全属性抗性 +50% 且攻击附带破甲</div>
            </div>
            <n-switch v-model:value="enableOmniSetAura" size="small" />
          </div>

          <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-white">二刀流破限零惩罚平衡</div>
              <div class="text-[10px] text-gray-400 mt-0.5">副手武器 100% 全额输出与独立暴击判定</div>
            </div>
            <n-switch v-model:value="enableDualWieldZeroPenalty" size="small" />
          </div>
        </div>

        <!-- 关键实时指标卡片 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <div class="text-[11px] text-gray-400">神兵真伤爆发估值</div>
            <div class="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
              {{ relicEstimatedTrueDmg.toLocaleString() }}
            </div>
            <div class="text-[10px] text-gray-500 mt-0.5">单次极意真伤</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <div class="text-[11px] text-gray-400">套装共鸣稳态率</div>
            <div class="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-1">
              {{ relicResonanceStability }}%
            </div>
            <div class="text-[10px] text-gray-500 mt-0.5">以太抗衰减率</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <div class="text-[11px] text-gray-400">破限突破纯度能效</div>
            <div class="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
              {{ relicBreakthroughPurityPct }}%
            </div>
            <div class="text-[10px] text-gray-500 mt-0.5">灵髓附魔转化</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <div class="text-[11px] text-gray-400">神兵契约认证评级</div>
            <div class="text-sm sm:text-base font-black text-purple-400 font-mono mt-1 truncate">
              {{ relicTierBadge }}
            </div>
            <div class="text-[10px] text-gray-500 mt-0.5">太古封印神兵谱系</div>
          </div>
        </div>

        <!-- 沙盘推演日志与进度 -->
        <div v-if="isRelicSimulating || relicLog.length > 0" class="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="text-gray-300 font-bold flex items-center gap-2">
              <span>🔄</span> 太古神兵破限推演沙盘进程: {{ relicSimStep }}
            </span>
            <span class="text-amber-400 font-mono font-bold">{{ relicSimProgress }}%</span>
          </div>
          <n-progress
            type="line"
            :percentage="relicSimProgress"
            :indicator-placement="'inside'"
            processing
            status="warning"
          />
          <div class="max-h-36 overflow-y-auto space-y-1 font-mono text-[11px] text-gray-400 pt-2 border-t border-slate-900">
            <div v-for="(log, idx) in relicLog" :key="idx" class="flex items-start gap-2">
              <span class="text-amber-500">›</span>
              <span :class="idx === relicLog.length - 1 ? 'text-amber-300 font-bold' : 'text-gray-400'">{{ log }}</span>
            </div>
          </div>
        </div>

        <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
        <div class="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">GODOT 4.6 LTS</span>
              <h3 class="text-sm font-bold text-white">太古封印神兵谱系与共鸣破限引擎源码展台</h3>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                <button
                  type="button"
                  class="px-2.5 py-1 rounded text-xs transition-colors"
                  :class="activeRelicScriptTab === 'controller' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'"
                  @click="activeRelicScriptTab = 'controller'"
                >
                  封印突破控制器
                </button>
                <button
                  type="button"
                  class="px-2.5 py-1 rounded text-xs transition-colors"
                  :class="activeRelicScriptTab === 'synergy_bus' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'"
                  @click="activeRelicScriptTab = 'synergy_bus'"
                >
                  套装共鸣总线
                </button>
                <button
                  type="button"
                  class="px-2.5 py-1 rounded text-xs transition-colors"
                  :class="activeRelicScriptTab === 'dual_wield' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'"
                  @click="activeRelicScriptTab = 'dual_wield'"
                >
                  二刀流零惩罚解析
                </button>
              </div>
              <n-button size="small" round secondary type="warning" @click="copyRelicScript">
                <template #icon><span>📋</span></template>
                复制代码
              </n-button>
            </div>
          </div>
          <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed max-h-[460px]">{{ currentRelicScriptCode }}</pre>
        </div>
      </div>
    </div>

    <!-- 7. 属性加成与守恒解析源码 -->
    <div v-if="activeTab === 'engine_code'" class="space-y-4">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                GODOT 4.6 LTS RELIC STAT RESOLVER ENGINE
              </span>
            </div>
            <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 flex-wrap">
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
                :class="activeCodeScriptTab === 'stats' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeCodeScriptTab = 'stats'"
              >
                equipment_stats_resolver.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
                :class="activeCodeScriptTab === 'forge' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeCodeScriptTab = 'forge'"
              >
                relic_resonance_forge_engine.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
                :class="activeCodeScriptTab === 'rune' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeCodeScriptTab = 'rune'"
              >
                relic_rune_infusion_engine.gd
              </button>
            </div>
          </div>
          <n-button size="small" round secondary type="info" @click="copyGdScript">
            <template #icon><span>📋</span></template>
            {{ copiedScriptCode ? '✓ 已复制代码' : '复制代码' }}
          </n-button>
        </div>

        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[550px]">{{ activeCodeScriptTab === 'stats' ? gdScriptCode : (activeCodeScriptTab === 'forge' ? gdForgeScriptCode : gdRuneScriptCode) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'

const message = useMessage()
const gameStore = useGameStore()
const equipment = computed(() => gameStore.db.equipment || [])

type EquipmentTab = 'catalog' | 'dual_wield' | 'awakening' | 'relic_forge' | 'rune_infusion' | 'essence_infusion' | 'sealed_relic_breakthrough' | 'engine_code'
const activeTab = ref<EquipmentTab>('catalog')
const tabList: { key: EquipmentTab; label: string; icon: string; badge?: string }[] = [
  { key: 'catalog', label: '神兵图鉴矩阵', icon: '🗡️' },
  { key: 'dual_wield', label: '二刀流伤害工坊', icon: '⚔️' },
  { key: 'awakening', label: '太古开光与附魔', icon: '⚗️' },
  { key: 'relic_forge', label: '太古神兵共鸣与精炼', icon: '✨', badge: 'v2.2.262' },
  { key: 'rune_infusion', label: '符文熔铸与词缀萃取', icon: '🔮', badge: 'v2.2.277' },
  { key: 'essence_infusion', label: '圣遗物灵髓注能与神格觉醒', icon: '👑', badge: 'v2.2.299' },
  { key: 'sealed_relic_breakthrough', label: '太古神兵谱系与共鸣破限', icon: '⚡', badge: 'v2.2.319' },
  { key: 'engine_code', label: '属性解析引擎源码', icon: '🛡️' }
]

const selectedCategory = ref('all')
const searchQuery = ref('')

const categories = [
  { id: 'all', name: '全部神兵' },
  { id: 'ragnarok', name: '诸神之黄昏系列 (超越SSR)' },
  { id: 'blade', name: '剑斧太刀类' },
  { id: 'spear', name: '神枪重兵类' },
  { id: 'staff', name: '法杖圣袍类' }
]

const filteredEquipment = computed(() => {
  return equipment.value.filter((eq: any) => {
    if (selectedCategory.value === 'ragnarok' && !eq.name.includes('诸神')) return false
    if (selectedCategory.value === 'blade' && !(eq.type.includes('剑') || eq.type.includes('刀') || eq.type.includes('斧'))) return false
    if (selectedCategory.value === 'spear' && !(eq.type.includes('枪') || eq.type.includes('弓') || eq.type.includes('盾'))) return false
    if (selectedCategory.value === 'staff' && !(eq.type.includes('杖') || eq.type.includes('袍') || eq.type.includes('琴') || eq.type.includes('饰品'))) return false

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const match = (eq.name + eq.type + eq.job + eq.effect + eq.origin).toLowerCase().includes(q)
      if (!match) return false
    }

    return true
  })
})

// 二刀流推演状态
interface WeaponOpt {
  id: string
  name: string
  atk: number
}

const weaponOptions: WeaponOpt[] = [
  { id: 'ragnarok', name: '诸神之黄昏 (Ragnarok)', atk: 180 },
  { id: 'excalibur', name: '誓约胜利之剑 (Excalibur)', atk: 160 },
  { id: 'masamune', name: '名刀 · 正宗 (Masamune)', atk: 155 },
  { id: 'sasuke', name: '佐助之刀 (Sasuke Katana)', atk: 145 },
  { id: 'holy_lance', name: '圣枪 (Holy Lance)', atk: 150 },
  { id: 'brave_blade', name: '勇气之剑 (Brave Blade)', atk: 150 },
  { id: 'chicken_knife', name: '小鸡匕首 (Chicken Knife)', atk: 127 },
  { id: 'yoichi', name: '与一之弓 (Yoichi Bow)', atk: 140 }
]

const dwState = reactive({
  mainWeaponId: 'ragnarok',
  offWeaponId: 'masamune',
  spellblade: 'flare',
  stance: 'rapid_fire'
})

const dwTargetDef = ref(50)
const dwStr = ref(65)
const dwTargetBoss = ref('dummy')
const isSimulatingHits = ref(false)
const simulatedHits = ref<Array<{ hand: 'main' | 'off'; dmg: number; isCrit: boolean }>>([
  { hand: 'main', dmg: 1420, isCrit: false },
  { hand: 'off', dmg: 1380, isCrit: false },
  { hand: 'main', dmg: 2130, isCrit: true },
  { hand: 'off', dmg: 1390, isCrit: false },
  { hand: 'main', dmg: 1450, isCrit: false },
  { hand: 'off', dmg: 1410, isCrit: false },
  { hand: 'main', dmg: 1430, isCrit: false },
  { hand: 'off', dmg: 2090, isCrit: true }
])
const simulatedDpsVerdict = ref('8段连击瞬爆 12,600 点极意伤害 (含2次暴击)')

const syncTargetDef = () => {
  switch (dwTargetBoss.value) {
    case 'dummy': dwTargetDef.value = 40; break
    case 'omega': dwTargetDef.value = 150; break
    case 'shinryu': dwTargetDef.value = 120; break
    case 'exdeath': dwTargetDef.value = 90; break
  }
}

const runRapidFireSimulation = () => {
  if (isSimulatingHits.value) return
  isSimulatingHits.value = true
  simulatedHits.value = []

  const total = dwTotalHits.value
  let current = 0
  const timer = setInterval(() => {
    if (current >= total) {
      clearInterval(timer)
      isSimulatingHits.value = false
      const totalDmg = simulatedHits.value.reduce((sum, h) => sum + h.dmg, 0)
      simulatedDpsVerdict.value = `${total}段打击瞬爆 ${totalDmg.toLocaleString()} 点极意伤害！`
      message.success(`乱打连击执行完毕！总爆发: ${totalDmg.toLocaleString()} 点伤害！`)
      return
    }
    const isMain = current % 2 === 0
    const baseDmg = isMain ? dwMainHandHitDmg.value : dwOffHandHitDmg.value
    const isCrit = Math.random() < 0.25
    const variance = (0.9 + Math.random() * 0.2)
    const finalDmg = Math.round(baseDmg * variance * (isCrit ? 1.5 : 1.0))
    simulatedHits.value.push({
      hand: isMain ? 'main' : 'off',
      dmg: finalDmg,
      isCrit
    })
    current++
  }, 90)
}

const copyDualWieldReport = async () => {
  const lines = [
    '================================================================================',
    '【二刀流魔法剑乱打实战伤害推演报告】',
    '================================================================================',
    `右手主武器: ${currentMainW.value.name} (攻 +${currentMainW.value.atk})`,
    `左手副武器: ${currentOffW.value.name} (攻 +${currentOffW.value.atk})`,
    `魔法剑附魔: ${spellbladeDesc.value}`,
    `角色力量: ${dwStr.value} STR | 靶标: ${dwTargetBoss.value} (DEF: ${effectiveDef.value})`,
    `右手单发预估: ${dwMainHandHitDmg.value} | 左手单发预估: ${dwOffHandHitDmg.value}`,
    `打击段数: ${dwTotalHits.value} 连击 | 预期总爆发: ${dwTotalBurstDamage.value.toLocaleString()} 点伤害`,
    '================================================================================'
  ]
  try {
    await navigator.clipboard.writeText(lines.join('\n'))
    message.success('已复制二刀流伤害推演报告至剪贴板！')
  } catch {
    message.info('报告已生成')
  }
}

const resetDualWield = () => {
  dwState.mainWeaponId = 'ragnarok'
  dwState.offWeaponId = 'masamune'
  dwState.spellblade = 'flare'
  dwState.stance = 'rapid_fire'
  dwStr.value = 65
  dwTargetBoss.value = 'dummy'
  dwTargetDef.value = 40
  message.success('已恢复经典【诸神之黄昏+正宗】双持配置')
}

const currentMainW = computed(() => weaponOptions.find(w => w.id === dwState.mainWeaponId) || weaponOptions[0])
const currentOffW = computed(() => weaponOptions.find(w => w.id === dwState.offWeaponId) || weaponOptions[1])

const dwTotalHits = computed(() => dwState.stance === 'rapid_fire' ? 8 : 2)

const effectiveDef = computed(() => {
  if (dwState.spellblade === 'flare') return 0 // 魔法剑核爆无视防御
  return dwTargetDef.value
})

const dwMultiplier = computed(() => dwState.stance === 'rapid_fire' ? 1.0 : 2.2)

const dwMainHandHitDmg = computed(() => {
  let mult = dwMultiplier.value
  if (dwTargetBoss.value === 'omega' && dwState.spellblade === 'thundaga') mult *= 2.0
  if (dwTargetBoss.value === 'shinryu') mult *= 1.5
  if (dwTargetBoss.value === 'exdeath' && dwState.spellblade === 'holy') mult *= 2.0
  const base = (dwStr.value / 2 + currentMainW.value.atk) * mult - effectiveDef.value * 0.5
  let bonus = 0
  if (dwState.spellblade === 'flare') bonus = 120
  if (dwState.spellblade === 'thundaga') bonus = 80
  if (dwState.spellblade === 'holy') bonus = 90
  return Math.max(10, Math.round(base + bonus))
})

const dwOffHandHitDmg = computed(() => {
  let mult = dwMultiplier.value
  if (dwTargetBoss.value === 'omega' && dwState.spellblade === 'thundaga') mult *= 2.0
  if (dwTargetBoss.value === 'shinryu') mult *= 1.5
  if (dwTargetBoss.value === 'exdeath' && dwState.spellblade === 'holy') mult *= 2.0
  const base = (dwStr.value / 2 + currentOffW.value.atk) * mult - effectiveDef.value * 0.5
  let bonus = 0
  if (dwState.spellblade === 'flare') bonus = 120
  if (dwState.spellblade === 'thundaga') bonus = 80
  if (dwState.spellblade === 'holy') bonus = 90
  return Math.max(10, Math.round(base + bonus))
})

const dwTotalBurstDamage = computed(() => {
  const halfHits = dwTotalHits.value / 2
  return dwMainHandHitDmg.value * halfHits + dwOffHandHitDmg.value * halfHits
})

const spellbladeDesc = computed(() => {
  switch (dwState.spellblade) {
    case 'flare': return '核爆附魔：敌方防御判定绝对清零，附加 120 点无视双防固伤'
    case 'thundaga': return '闪雷附魔：对机械与水系魔物追加 2.0x ~ 4.0x 暴击'
    case 'holy': return '神圣附魔：对不死与黑暗系追加 2.0x ~ 3.0x 破邪'
    case 'drain': return '吸血附魔：每次打击全额吸收输出为自身生命值'
    default: return '无附魔'
  }
})

// 太古封印神兵数据
interface SealedWeapon {
  id: string
  name: string
  icon: string
  atk: number
  job: string
  baseEffect: string
  awakenedEffect: string
}

const sealedWeapons: SealedWeapon[] = [
  {
    id: 'seal-excalibur',
    name: '太古圣剑 · 艾斯卡利巴 (Excalibur)',
    icon: '🗡️',
    atk: 160,
    job: '骑士 / 自由人',
    baseEffect: '自带圣属性斩击，对恶魔与不死系造成 2.0 倍特攻，力量 +5。',
    awakenedEffect: '镶嵌【红之尾巴】：每次普攻额外向全场释放【小圣光核爆】，全队全属性防御 +15。'
  },
  {
    id: 'seal-masamune',
    name: '名刀 · 正宗 (Masamune)',
    icon: '⚔️',
    atk: 155,
    job: '武士 / 忍者',
    baseEffect: '战斗开局必定【ATB 全满优先行动 (First Strike)】，敏捷 +8。',
    awakenedEffect: '镶嵌【绿之尾巴】：拔刀必定暴击，居合一刀两断触发概率提升至 40%。'
  },
  {
    id: 'seal-holy-lance',
    name: '神圣破魔之枪 (Holy Lance)',
    icon: '🔱',
    atk: 150,
    job: '龙骑士 / 自由人',
    baseEffect: '跳跃落地命中率 100%，对飞龙系追加 3 倍特攻伤害。',
    awakenedEffect: '镶嵌【黄之尾巴】：跳跃空中滞空期间免疫敌方一切单体与全屏技能伤害。'
  },
  {
    id: 'seal-magus-rod',
    name: '贤者天体法杖 (Magus Rod)',
    icon: '🪄',
    atk: 110,
    job: '黑魔 / 白魔 / 时空魔',
    baseEffect: '火、冰、雷全元素黑魔法伤害增幅 50%，魔力 +12。',
    awakenedEffect: '镶嵌【黑之尾巴】：所有九阶黑魔法（核爆、陨石）MP 消耗减少 50%，伤害突破上限。'
  },
  {
    id: 'seal-sasuke',
    name: '影忍宗师 · 佐助之刀 (Sasuke Katana)',
    icon: '🗡️',
    atk: 145,
    job: '忍者 / 自由人',
    baseEffect: '二刀流副手攻击力不衰减，物理回避率 +25%。',
    awakenedEffect: '镶嵌【蓝之尾巴】：空蝉替身原木由 3 次提升至 6 次格挡回避，水遁忍术伤害翻倍。'
  },
  {
    id: 'seal-yoichi',
    name: '天穹神射 · 与一之弓 (Yoichi Bow)',
    icon: '🏹',
    atk: 140,
    job: '猎人 / 自由人',
    baseEffect: '乱射必定命中后排目标，暴击率 +25%，敏捷 +10。',
    awakenedEffect: '镶嵌【紫之尾巴】：乱射箭矢由 4 支提升至 8 支连续暴击，附带强力定身束缚。'
  },
  {
    id: 'seal-rune-axe',
    name: '符文破坏之斧 (Rune Axe)',
    icon: '🪓',
    atk: 142,
    job: '狂战士 / 魔法骑士 / 自由人',
    baseEffect: '普攻消耗 5 点 MP 触发绝对暴击破甲，对重装甲魔物追加 2.0 倍贯穿。',
    awakenedEffect: '镶嵌【红之尾巴】：MP 消耗减半，攻击力根据当前已损失生命百分比最高额外提升 100%。'
  },
  {
    id: 'seal-gaia-bell',
    name: '大地共鸣之铃 (Gaia Bell)',
    icon: '🔔',
    atk: 128,
    job: '风水士 / 吟游诗人 / 自由人',
    baseEffect: '普通攻击 50% 震荡释放全场【大地震 Earthquake】，地属性威力增幅 50%。',
    awakenedEffect: '镶嵌【黄之尾巴】：风水秘术必定触发当前地形顶级天灾绝杀，地鸣不伤全队飞行目标。'
  },
  {
    id: 'seal-firebute',
    name: '炎狱魔兽之鞭 (Firebute)',
    icon: '🔥',
    atk: 132,
    job: '驯兽师 / 自由人',
    baseEffect: '普通攻击附带强力麻痹束缚，33% 概率追加释放全屏九阶黑魔法【火魔爆 (Firaga)】。',
    awakenedEffect: '镶嵌【红之尾巴】：捕获魔物成功率翻倍，麻痹持续时间延长至 3 回合且无法被净化。'
  },
  {
    id: 'seal-apollon-harp',
    name: '阿波罗治愈之竖琴 (Apollon\'s Harp)',
    icon: '🎵',
    atk: 115,
    job: '吟游诗人 / 自由人',
    baseEffect: '对龙系与恶魔造成 4.0 倍神曲灭绝特攻，全队战歌增益上限由 +20 突破至 +99。',
    awakenedEffect: '镶嵌【绿之尾巴】：英雄之歌每回合自动使全队全属性+10并附带再生 Regen 持续回血。'
  },
  {
    id: 'seal-sage-staff',
    name: '贤者生息圣杖 (Sage\'s Staff)',
    icon: '🦯',
    atk: 105,
    job: '白魔道士 / 导师 / 自由人',
    baseEffect: '战斗中作为道具使用无限释放【大圣疗 Raise】，对不死系魔物造成必杀级神圣超度。',
    awakenedEffect: '镶嵌【白之尾巴】：所有恢复性白魔法治疗量翻倍，施法者获得濒死无敌结界 1 回合。'
  },
  {
    id: 'seal-assassin-dagger',
    name: '刺客暗影短剑 (Assassin\'s Dagger)',
    icon: '🗡️',
    atk: 138,
    job: '盗贼 / 忍者 / 自由人',
    baseEffect: '普通攻击 25% 概率触发【死之宣告即死】，敏捷 +5，盗贼偷盗成功率 +30%。',
    awakenedEffect: '镶嵌【黑之尾巴】：背刺伤害翻倍，偷盗必定获得魔物稀有第一掉落槽位绝版战利品。'
  }
]

// Godot 4.x 代码
const activeCodeScriptTab = ref<'stats' | 'forge' | 'rune'>('stats')
const copiedScriptCode = ref(false)

const gdScriptCode = `# ==============================================================================
# EquipmentStatsResolver - 装备属性加成、双持二刀流与属性守恒解析器
# 文件路径: res://scripts/armory/equipment_stats_resolver.gd
# 架构定位: 解析装备面板加成、HP/MP 穿戴守恒叠加与二刀流乱打伤害计算
# ==============================================================================
class_name EquipmentStatsResolver
extends Node

const STAT_KEYS: Array[String] = ["max_hp", "max_mp", "str", "agi", "vit", "mag", "spr", "luck"]

## 穿戴装备时加算属性至角色快照 (保障加算守恒)
func apply_equipment_stats(actor_stats: Dictionary, equip_data: Dictionary) -> void:
	for k in STAT_KEYS:
		if equip_data.has(k):
			actor_stats[k] = actor_stats.get(k, 0) + int(equip_data[k])
	
	# 动态重算物理攻击力与魔法攻击力
	actor_stats["patk"] = int(actor_stats.get("str", 0) * 1.5 + actor_stats.get("agi", 0) * 0.5)
	actor_stats["matk"] = int(actor_stats.get("mag", 0) * 2.0)

## 卸下装备时无损扣除加成 (与永久种子严格隔离)
func remove_equipment_stats(actor_stats: Dictionary, equip_data: Dictionary) -> void:
	for k in STAT_KEYS:
		if equip_data.has(k):
			actor_stats[k] = max(1, actor_stats.get(k, 0) - int(equip_data[k]))
	
	actor_stats["patk"] = int(actor_stats.get("str", 0) * 1.5 + actor_stats.get("agi", 0) * 0.5)
	actor_stats["matk"] = int(actor_stats.get("mag", 0) * 2.0)

## 计算二刀流双持攻击伤害 (Dual-Wield Attack)
func calculate_dual_wield_damage(main_weapon: Dictionary, off_weapon: Dictionary, caster_str: int, target_def: int, is_rapid_fire: bool) -> Dictionary:
	var hits_count := 8 if is_rapid_fire else 2
	var multiplier: float = 1.0 if is_rapid_fire else 2.2
	var def_factor: float = 0.0 if is_rapid_fire else 0.5 # 乱打无视防御
	
	var main_atk := int(main_weapon.get("atk", 100))
	var off_atk := int(off_weapon.get("atk", 100))
	
	var main_hit_dmg := maxi(1, int((caster_str * 0.5 + main_atk) * multiplier - target_def * def_factor))
	var off_hit_dmg := maxi(1, int((caster_str * 0.5 + off_atk) * multiplier - target_def * def_factor))
	
	var total_burst := (main_hit_dmg * (hits_count / 2)) + (off_hit_dmg * (hits_count / 2))
	
	return {
		"total_hits": hits_count,
		"main_hit_damage": main_hit_dmg,
		"off_hit_damage": off_hit_dmg,
		"total_burst_damage": total_burst
	}
`

const gdForgeScriptCode = [
  '## relic_resonance_forge_engine.gd',
  '## 《光之战士：时空裂隙》太古十二神兵共鸣羁绊与破限熔炼引擎',
  '## 官方引擎规范: VBLE Mythic Weapons & Relic Forge Matrix v2.2.262',
  'extends Node',
  'class_name RelicResonanceForgeEngine',
  '',
  'signal relic_resonance_activated(bond_name: String, atk_bonus: int, passive_effect: String)',
  'signal overlimit_forged(level: int, total_atk: int, crit_rate: float, pierce: float)',
  'signal duel_simulated(boss_name: String, burst_damage: int, turns_to_kill: int, grade: String)',
  '',
  'const TWELVE_RELICS = {',
  '	"excalibur": { "name": "王者之剑 (Excalibur)", "base_atk": 160, "element": "HOLY" },',
  '	"holy_lance": { "name": "神圣之枪 (Holy Lance)", "base_atk": 155, "element": "HOLY" },',
  '	"sasuke_katana": { "name": "佐助之刀 (Sasuke\'s Katana)", "base_atk": 145, "element": "WIND" },',
  '	"masamune": { "name": "正宗 (Masamune)", "base_atk": 150, "element": "SLASH" },',
  '	"rune_axe": { "name": "符文之斧 (Rune Axe)", "base_atk": 148, "element": "ARCANE" },',
  '	"sage_staff": { "name": "贤者之杖 (Sage Staff)", "base_atk": 120, "element": "HOLY" },',
  '	"magus_rod": { "name": "魔道士之杖 (Magus Rod)", "base_atk": 125, "element": "ALL_ELEMENT" },',
  '	"assassin_dagger": { "name": "暗杀短剑 (Assassin Dagger)", "base_atk": 138, "element": "DEATH" },',
  '	"yoichi_bow": { "name": "与一之弓 (Yoichi\'s Bow)", "base_atk": 142, "element": "PIERCE" },',
  '	"apollo_harp": { "name": "阿波罗之琴 (Apollo\'s Harp)", "base_atk": 110, "element": "SOUND" },',
  '	"gaia_bell": { "name": "大地之铃 (Gaia Bell)", "base_atk": 115, "element": "EARTH" },',
  '	"firebute": { "name": "火焰之鞭 (Flame Whip)", "base_atk": 130, "element": "FIRE" }',
  '}',
  '',
  'func evaluate_resonance_bond(primary_id: String, secondary_id: String) -> Dictionary:',
  '	var pair = [primary_id, secondary_id]',
  '	pair.sort()',
  '	var key = pair[0] + "+" + pair[1]',
  '	',
  '	match key:',
  '		"excalibur+holy_lance":',
  '			return { "name": "光圣双辉", "atk_bonus": 80, "crit_bonus": 20, "desc": "全体神圣伤害提升80%，普攻召唤圣光审判" }',
  '		"masamune+sasuke_katana":',
  '			return { "name": "疾风修罗", "atk_bonus": 75, "crit_bonus": 100, "desc": "暴击率100%，绝对先制行动，物理闪避+50%" }',
  '		"magus_rod+sage_staff":',
  '			return { "name": "天地万象", "atk_bonus": 70, "crit_bonus": 15, "desc": "全元素魔法消耗减半，法伤突破9999" }',
  '		"assassin_dagger+rune_axe":',
  '			return { "name": "宿命斩灭", "atk_bonus": 85, "crit_bonus": 30, "desc": "贯穿100%物理防御，20%概率一击必杀" }',
  '		_:',
  '			return { "name": "太古传承", "atk_bonus": 35, "crit_bonus": 10, "desc": "基础全属性+10，全异常状态抗性提升50%" }',
  '',
  'func calculate_forge_stats(primary_id: String, secondary_id: String, overlimit: int, gem_bonus_atk: int, pierce_rate: float) -> Dictionary:',
  '	var prim = TWELVE_RELICS.get(primary_id, { "base_atk": 150 })',
  '	var sec = TWELVE_RELICS.get(secondary_id, { "base_atk": 150 })',
  '	var bond = evaluate_resonance_bond(primary_id, secondary_id)',
  '	',
  '	var base_atk: int = prim.base_atk + sec.base_atk',
  '	var multiplier: float = 1.0 + (overlimit * 0.08)',
  '	var final_atk: int = int((base_atk + bond.atk_bonus + gem_bonus_atk) * multiplier)',
  '	var final_crit: float = clampf(25.0 + overlimit * 4.0 + float(bond.crit_bonus), 0.0, 100.0)',
  '	',
  '	emit_signal("overlimit_forged", overlimit, final_atk, final_crit, pierce_rate)',
  '	return { "final_atk": final_atk, "final_crit": final_crit, "bond": bond }'
].join('\n')

const copyGdScript = async () => {
  try {
    let code = ''
    let filename = ''
    if (activeCodeScriptTab.value === 'stats') {
      code = gdScriptCode
      filename = 'equipment_stats_resolver.gd'
    } else if (activeCodeScriptTab.value === 'forge') {
      code = gdForgeScriptCode
      filename = 'relic_resonance_forge_engine.gd'
    } else {
      code = gdRuneScriptCode
      filename = 'relic_rune_infusion_engine.gd'
    }
    await navigator.clipboard.writeText(code)
    copiedScriptCode.value = true
    message.success(`${filename} 源码已复制到剪贴板！`)
    setTimeout(() => {
      copiedScriptCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}

// ================= 太古十二神兵共鸣与破限精炼工坊状态 =================
interface AncientRelicDef {
  id: string
  name: string
  icon: string
  atk: number
  job: string
}

const twelveRelicsList: AncientRelicDef[] = [
  { id: 'excalibur', name: '王者之剑 (Excalibur)', icon: '⚔️', atk: 160, job: '圣骑士 / 战士 / 自由人' },
  { id: 'holy_lance', name: '神圣之枪 (Holy Lance)', icon: '🔱', atk: 155, job: '龙骑士 / 自由人' },
  { id: 'sasuke_katana', name: '佐助之刀 (Sasuke\'s Katana)', icon: '🗡️', atk: 145, job: '忍者 / 自由人' },
  { id: 'masamune', name: '正宗 (Masamune)', icon: '🗡️', atk: 150, job: '武士 / 自由人' },
  { id: 'rune_axe', name: '符文之斧 (Rune Axe)', icon: '🪓', atk: 148, job: '狂战士 / 自由人' },
  { id: 'sage_staff', name: '贤者之杖 (Sage Staff)', icon: '🦯', atk: 120, job: '白魔导士 / 药剂师 / 自由人' },
  { id: 'magus_rod', name: '魔道士之杖 (Magus Rod)', icon: '🪄', atk: 125, job: '黑魔导士 / 时魔导士 / 召唤士' },
  { id: 'assassin_dagger', name: '暗杀短剑 (Assassin Dagger)', icon: '🗡️', atk: 138, job: '盗贼 / 忍者 / 自由人' },
  { id: 'yoichi_bow', name: '与一之弓 (Yoichi\'s Bow)', icon: '🏹', atk: 142, job: '猎人 / 自由人' },
  { id: 'apollo_harp', name: '阿波罗之琴 (Apollo\'s Harp)', icon: '🪕', atk: 110, job: '吟游诗人 / 自由人' },
  { id: 'gaia_bell', name: '大地之铃 (Gaia Bell)', icon: '🔔', atk: 115, job: '风水士 / 自由人' },
  { id: 'firebute', name: '火焰之鞭 (Flame Whip)', icon: '🪢', atk: 130, job: '魔兽使 / 自由人' }
]

const primaryRelicId = ref('excalibur')
const secondaryRelicId = ref('holy_lance')

const currentPrimaryRelic = computed(() => {
  return twelveRelicsList.find(r => r.id === primaryRelicId.value) || twelveRelicsList[0]
})

const currentSecondaryRelic = computed(() => {
  return twelveRelicsList.find(r => r.id === secondaryRelicId.value) || twelveRelicsList[1]
})

const baseRelicsAtk = computed(() => {
  return currentPrimaryRelic.value.atk + currentSecondaryRelic.value.atk
})

// 共鸣羁绊判定
interface ResonanceBondDef {
  title: string
  tier: string
  tagType: 'success' | 'warning' | 'error' | 'info'
  atkBonus: number
  description: string
  bonusEffect: string
}

const currentResonanceBond = computed<ResonanceBondDef>(() => {
  const p = primaryRelicId.value
  const s = secondaryRelicId.value
  const pair = [p, s].sort().join('+')

  if (pair === 'excalibur+holy_lance') {
    return {
      title: '光圣双辉 (Holy Radiant Bond)',
      tier: 'SSS 终极共鸣',
      tagType: 'error',
      atkBonus: 80,
      description: '王者圣剑与神圣圣枪同调共振，唤醒上古光之战士的至高救世圣痕。',
      bonusEffect: '全体神圣伤害提升 80%，普攻 35% 几率呼唤全体【神圣圣光审判 (Holy Judgment)】。'
    }
  }
  if (pair === 'masamune+sasuke_katana') {
    return {
      title: '疾风修罗 (Gale Asura Bond)',
      tier: 'SSS 终极共鸣',
      tagType: 'error',
      atkBonus: 75,
      description: '东方刀宗双壁合一，极速与必杀交织成绝对无暇的居合斩阵。',
      bonusEffect: '暴击率恒定 100%，战斗开局获得绝对先制行动，常驻物理回避率 +50%。'
    }
  }
  if (pair === 'magus_rod+sage_staff') {
    return {
      title: '天地万象 (Universal Genesis Bond)',
      tier: 'SSR 传奇共鸣',
      tagType: 'warning',
      atkBonus: 70,
      description: '黑白双圣杖引发以太奇点坍缩，突破一切凡人魔法上限束缚。',
      bonusEffect: '全元素魔法消耗减半，法伤突破上限并激活【以太聚爆 (Aether Flare)】。'
    }
  }
  if (pair === 'assassin_dagger+rune_axe') {
    return {
      title: '宿命斩灭 (Destiny Decapitation)',
      tier: 'SSR 传奇共鸣',
      tagType: 'warning',
      atkBonus: 85,
      description: '狂暴巨斧与剧毒暗杀短刃的血色协奏，招招直切敌方致命死穴。',
      bonusEffect: '完全贯穿 100% 物理护甲，暴击伤害提升 100%，平砍 20% 概率触发一击必杀。'
    }
  }

  return {
    title: '太古传承 (Ancient Legacy Resonance)',
    tier: 'SR 标准共鸣',
    tagType: 'info',
    atkBonus: 35,
    description: '两具封印神兵自然引动的远古微光共鸣，稳固全队基础体魄与气场。',
    bonusEffect: '基础全属性 +10 点，全异常状态抗性提升 50%，战技命中率恒定 100%。'
  }
})

// 附魔宝石
interface EnchantGemDef {
  id: string
  name: string
  icon: string
  summary: string
  bonusAtk: number
  elementBonus: string
}

const enchantGemsList: EnchantGemDef[] = [
  { id: 'ragnarok_shard', name: '诸神黄昏碎屑', icon: '💎', summary: '攻击+50 · 暴伤+30%', bonusAtk: 50, elementBonus: '终焉神圣斩断 (圣·暗双属性破防)' },
  { id: 'genesis_core', name: '创世以太晶核', icon: '🔮', summary: '攻击+60 · MP+200', bonusAtk: 60, elementBonus: '全元素贯穿超魔导 (雷火冰圣)' },
  { id: 'holy_dew', name: '圣灵圣水结晶', icon: '💧', summary: '吸血20% · 免疫异常', bonusAtk: 40, elementBonus: '圣水甘霖与全异常绝对净化' },
  { id: 'void_annihilation', name: '虚空湮灭暗核', icon: '🌌', summary: '真实真伤 9999 附加', bonusAtk: 70, elementBonus: '次元湮灭真伤 (无视任何减伤结界)' }
]

const selectedGemId = ref('ragnarok_shard')
const overlimitLevel = ref(5)
const critMultiplier = ref(2.5)
const armorPierceRate = ref(50)

const currentEnchantGem = computed(() => {
  return enchantGemsList.find(g => g.id === selectedGemId.value) || enchantGemsList[0]
})

const finalForgeAtk = computed(() => {
  const sumAtk = baseRelicsAtk.value + currentResonanceBond.value.atkBonus + currentEnchantGem.value.bonusAtk
  const mult = 1 + overlimitLevel.value * 0.08
  return Math.round(sumAtk * mult)
})

const finalCritRate = computed(() => {
  const isAsura = currentResonanceBond.value.title.includes('疾风修罗')
  if (isAsura) return 100
  return Math.min(100, Math.round(25 + overlimitLevel.value * 4))
})

// 首领挑战目标
interface BossTargetDef {
  id: string
  name: string
  icon: string
  hp: number
  def: number
  elementWeakness: string
}

const bossTargetsList: BossTargetDef[] = [
  { id: 'shinryu', name: '次元神龙 (Shinryu)', icon: '🐉', hp: 55000, def: 80, elementWeakness: '神圣属性 / 龙族特攻' },
  { id: 'omega', name: '欧米茄巨神 (Omega)', icon: '🤖', hp: 55000, def: 220, elementWeakness: '雷电属性 / 机械特攻' },
  { id: 'neo_exdeath', name: '始祖新·艾克斯迪斯 (Neo Exdeath)', icon: '🌌', hp: 65000, def: 120, elementWeakness: '虚空湮灭 / 神圣全属性' }
]

const selectedBossTargetId = ref('shinryu')

const currentBossTarget = computed(() => {
  return bossTargetsList.find(b => b.id === selectedBossTargetId.value) || bossTargetsList[0]
})

const duelTrialResult = computed(() => {
  const target = currentBossTarget.value
  const effDef = Math.max(0, Math.round(target.def * (1 - armorPierceRate.value / 100)))
  const baseHit = Math.max(10, finalForgeAtk.value * 2.2 - effDef * 0.5)
  const critWeight = 1 + (finalCritRate.value / 100) * (critMultiplier.value - 1)
  const hitsPerTurn = 4 // 四连斩/双持连续攻击
  const expectedBurst = Math.round(baseHit * critWeight * hitsPerTurn)
  const turns = Math.max(1, Math.ceil(target.hp / expectedBurst))

  let tacticalGrade = '一击瞬杀 (OTK 毁灭绝杀)'
  if (turns > 1 && turns <= 2) tacticalGrade = '极速两轮斩杀 (Superior)'
  else if (turns > 2) tacticalGrade = '稳定战术连击 (Standard)'

  let rating = 'SSS+ 诸神破限'
  if (finalForgeAtk.value < 380) rating = 'S 太古开刃'
  else if (finalForgeAtk.value < 450) rating = 'SS 传奇极境'

  return {
    expectedBurstDamage: expectedBurst,
    turnsToKill: turns,
    effectiveDef: effDef,
    tacticalGrade,
    rating
  }
})

const resetForgeStudio = () => {
  primaryRelicId.value = 'excalibur'
  secondaryRelicId.value = 'holy_lance'
  selectedGemId.value = 'ragnarok_shard'
  overlimitLevel.value = 5
  critMultiplier.value = 2.5
  armorPierceRate.value = 50
  selectedBossTargetId.value = 'shinryu'
  message.info('太古神兵锻造熔炉参数已重置')
}

const maxOverlimitForge = () => {
  overlimitLevel.value = 10
  armorPierceRate.value = 100
  critMultiplier.value = 3.5
  message.success('⚡ 太古熔炉已激荡至 +10 满破极境！穿甲率拉满至 100%！')
}

const exportForgeCertificate = () => {
  const timestamp = new Date().toISOString()
  const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase()
  const fakeSha256 = `SHA256-${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`

  const certLines = [
    '========================================================================',
    '       《光之战士：时空裂隙》太古十二神兵共鸣与破限精炼认证方案书',
    '               OFFICIAL ANCIENT RELIC FORGE & RESONANCE REPORT',
    '========================================================================',
    `方案唯一编号: AGY-FORGE-20261028-${randomHex}`,
    `安全防伪签名: ${fakeSha256}`,
    `签发世界线时间: ${timestamp}`,
    `官方规范版本: VBLE Mythic Weapons & Relic Forge Matrix v2.2.262`,
    `神兵评定品级: ${duelTrialResult.value.rating}`,
    '',
    '------------------------------------------------------------------------',
    '【一、主副手太古封印神兵与共鸣羁绊】',
    '------------------------------------------------------------------------',
    `主手神兵: ${currentPrimaryRelic.value.name} (基础攻击 +${currentPrimaryRelic.value.atk})`,
    `副手神兵: ${currentSecondaryRelic.value.name} (基础攻击 +${currentSecondaryRelic.value.atk})`,
    `激活共鸣羁绊: ${currentResonanceBond.value.title} [${currentResonanceBond.value.tier}]`,
    `羁绊攻击力修正: +${currentResonanceBond.value.atkBonus} Atk`,
    `羁绊特效: ${currentResonanceBond.value.bonusEffect}`,
    '',
    '------------------------------------------------------------------------',
    '【二、太古熔炉破限锻造与属性附魔】',
    '------------------------------------------------------------------------',
    `精炼破限阶位: +${overlimitLevel.value} 阶 (攻击力倍率: ${(1 + overlimitLevel.value * 0.08).toFixed(2)}x)`,
    `注入附魔宝石: ${currentEnchantGem.value.name} (${currentEnchantGem.value.summary})`,
    `附魔属性特性: ${currentEnchantGem.value.elementBonus}`,
    `暴击加权倍率: ${critMultiplier.value.toFixed(1)}x`,
    `真实穿甲率: ${armorPierceRate.value}%`,
    `最终实机攻击面板: ${finalForgeAtk.value} Atk`,
    `综合暴击几率: ${finalCritRate.value}%`,
    '',
    '------------------------------------------------------------------------',
    '【三、试炼首领斩杀演算战果】',
    '------------------------------------------------------------------------',
    `推演模拟首领: ${currentBossTarget.value.name}`,
    `目标基础生命: ${currentBossTarget.value.hp.toLocaleString()} HP / 原始防御: ${currentBossTarget.value.def}`,
    `穿甲后有效防御: ${duelTrialResult.value.effectiveDef} Def`,
    `单轮连击期望总伤害: ${duelTrialResult.value.expectedBurstDamage.toLocaleString()} 真实贯穿伤害`,
    `预计首领斩杀回合: ${duelTrialResult.value.turnsToKill} 轮斩杀`,
    `斩杀战术评级: ${duelTrialResult.value.tacticalGrade}`,
    '',
    '------------------------------------------------------------------------',
    '【四、封印之城库扎大祭司认证箴言】',
    '------------------------------------------------------------------------',
    '“十二圣器各承一脉，当王者之剑与神圣之枪交辉，当佐助与正宗合一，',
    ' 纵使神龙吐息、欧米茄降临，亦难挡光之战士破限一击！”',
    '========================================================================'
  ]

  const blob = new Blob([certLines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `relic_forge_v2.2.262_${Date.now()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  message.success('📜 太古神兵精炼认证方案书已成功导出并下载！')
}

// ==========================================
// 🔮 太古神兵符文熔铸与多维词缀萃取工坊 (v2.2.277)
// ==========================================
interface RuneInscription {
  id: string
  name: string
  tag: string
  icon: string
  affixText: string
  energy: number
  gradient: string
  baseBonusAtk: number
  affixPower: number
}

const runeInscriptions: RuneInscription[] = [
  {
    id: 'solaris_genesis',
    name: '太阳耀斑创世铭文 (Solaris Genesis)',
    tag: '创世耀斑',
    icon: '☀️',
    affixText: '圣光核爆附加率 +35% · 破甲贯穿 +45% · 全属性 +15',
    energy: 550,
    gradient: 'radial-gradient(circle, rgba(245,158,11,0.55) 0%, rgba(239,68,68,0.25) 50%, transparent 80%)',
    baseBonusAtk: 65,
    affixPower: 820
  },
  {
    id: 'abyss_singularity',
    name: '虚空暗界奇点铭文 (Abyss Singularity)',
    tag: '奇点湮灭',
    icon: '🌌',
    affixText: '真伤转化率 +40% · 濒死狂怒 +80% · 吸血回灵 +12%',
    energy: 680,
    gradient: 'radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(59,130,246,0.3) 50%, transparent 80%)',
    baseBonusAtk: 78,
    affixPower: 910
  },
  {
    id: 'aether_overload',
    name: '以太晶格超载铭文 (Aether Overload)',
    tag: '以太超载',
    icon: '⚡',
    affixText: '魔法剑增幅 +65% · 连续魔减耗 -30% · 暴击伤害 +50%',
    energy: 480,
    gradient: 'radial-gradient(circle, rgba(6,182,212,0.55) 0%, rgba(59,130,246,0.25) 50%, transparent 80%)',
    baseBonusAtk: 58,
    affixPower: 760
  },
  {
    id: 'valkyrie_judgment',
    name: '瓦尔基里绝灭铭文 (Valkyrie Judgment)',
    tag: '斩铁绝灭',
    icon: '⚔️',
    affixText: '斩铁即死阈值升至 25% · 二刀流命中 +100% · 破限极伤 +25000',
    energy: 850,
    gradient: 'radial-gradient(circle, rgba(236,72,153,0.55) 0%, rgba(245,158,11,0.3) 50%, transparent 80%)',
    baseBonusAtk: 92,
    affixPower: 1050
  }
]

const selectedRuneInscriptionId = ref('solaris_genesis')
const runeEnergyLevel = ref(550)
const affixPurity = ref(88)
const forgeTemperature = ref(1680)
const voidCatalyst = ref(3.5)
const enableAncientAffixLock = ref(true)
const enableSuperconductingMatrix = ref(true)
const enableOverlimitExtraction = ref(true)
const isSimulatingRune = ref(false)

const currentRuneInscription = computed(() => {
  return runeInscriptions.find(r => r.id === selectedRuneInscriptionId.value) || runeInscriptions[0]
})

const applyRuneInscription = (id: string) => {
  selectedRuneInscriptionId.value = id
  const r = runeInscriptions.find(item => item.id === id)
  if (r) {
    runeEnergyLevel.value = r.energy
    message.info(`已应用【${r.name}】符文铭文`)
  }
}

const resetRuneParams = () => {
  applyRuneInscription('solaris_genesis')
  affixPurity.value = 88
  forgeTemperature.value = 1680
  voidCatalyst.value = 3.5
  enableAncientAffixLock.value = true
  enableSuperconductingMatrix.value = true
  enableOverlimitExtraction.value = true
}

const runeSimulationLogs = ref<string[]>([
  '系统就绪: Godot 4.6 LTS 太古神兵符文熔铸与多维词缀萃取引擎就绪',
  '晶格结构探测: 王者之剑/终焉诸神神兵微观金相分析完成',
  '退火稳态监测: 800~2400°C 动态温控伺服激活',
  '词缀数据库: SMPTE-2065 远古卢恩词缀表载入'
])

const runeMetrics = computed(() => {
  const baseAtk = currentRuneInscription.value.baseBonusAtk + 180
  const finalAtk = Math.round(baseAtk * (1.0 + affixPurity.value / 200) + runeEnergyLevel.value * 0.12 + (enableOverlimitExtraction.value ? 35 : 0))
  const affixScore = Math.round(currentRuneInscription.value.affixPower + runeEnergyLevel.value * 0.85 + affixPurity.value * 4.2)
  
  const tempExcess = Math.max(0, forgeTemperature.value - 1200)
  const safetyMargin = Math.max(12.0, Number((100.0 - (tempExcess / 18.0) - (voidCatalyst.value * 2.2) + (enableSuperconductingMatrix.value ? 15.0 : 0.0)).toFixed(1)))

  let rating = 'S-Tier 远古至尊'
  if (affixScore >= 2000) rating = 'EX-Tier 诸神终焉超越'
  else if (affixScore >= 1600) rating = 'SS-Tier 圣殿神造'

  return {
    finalAtk,
    affixScore,
    safetyMargin,
    rating
  }
})

const simulateRuneInfusion = () => {
  isSimulatingRune.value = true
  const now = new Date()
  const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  runeSimulationLogs.value = [
    `[${ts}] 🚀 启动太古符文熔铸与多维词缀萃取管线...`,
    `[${ts}] 阶段 1: 注入【${currentRuneInscription.value.name}】，共鸣能级达 ${runeEnergyLevel.value} 卢恩`,
    `[${ts}] 阶段 2: 熔炉升温至 ${forgeTemperature.value}°C，虚空催化剂注入 ${voidCatalyst.value.toFixed(1)} ml`,
    `[${ts}] 阶段 3: ${enableSuperconductingMatrix.value ? '超导以太退火晶格重构' : '常规热传导'}，热应力安全余量 ${runeMetrics.value.safetyMargin}%`,
    `[${ts}] 阶段 4: 词缀纯度萃取达 ${affixPurity.value}%，${enableOverlimitExtraction.value ? '词缀激变成功 (+35 极境攻击)' : '稳态词缀输出'}`,
    `[${ts}] ✨ 熔铸萃取完成！最终实机攻击 ${runeMetrics.value.finalAtk} Atk，综合装备评分 ${runeMetrics.value.affixScore} 分！`
  ]

  setTimeout(() => {
    isSimulatingRune.value = false
    message.success(`⚡ 符文熔铸萃取完成！装备综合评分 ${runeMetrics.value.affixScore}`)
  }, 600)
}

const exportRuneInfusionCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  const certLines = [
    '================================================================================',
    '   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)',
    '   太古神兵符文熔铸与多维词缀萃取方案证书 (v2.2.277)',
    '================================================================================',
    `颁发时间: ${timeStr}`,
    `符文铭文: ${currentRuneInscription.value.name}`,
    `核心词缀: ${currentRuneInscription.value.affixText}`,
    '运行架构: Godot 4.6 LTS / relic_rune_infusion_engine.gd',
    '',
    '【符文熔铸与萃取 Uniform 参数】',
    `- 符文共鸣能级 (Rune Energy Level): ${runeEnergyLevel.value} 卢恩`,
    `- 词缀萃取纯度 (Affix Purity): ${affixPurity.value}%`,
    `- 晶石熔铸温度 (Forge Temperature): ${forgeTemperature.value} °C`,
    `- 虚空催化剂注入量 (Void Catalyst Dosage): ${voidCatalyst.value.toFixed(1)} ml`,
    `- 原始词缀固化锁: ${enableAncientAffixLock.value ? '已自锁 (保底主属性词缀)' : '无锁洗练'}`,
    `- 超导以太晶格退火: ${enableSuperconductingMatrix.value ? '已启用 (提升 15% 热应力安全)' : '关闭'}`,
    `- 超限词缀基因激变: ${enableOverlimitExtraction.value ? '已激活 (+35 极境攻击力突破)' : '关闭'}`,
    '',
    '【熔铸成果实机遥测指标】',
    `- 最终熔铸总攻击力: ${runeMetrics.value.finalAtk} Atk`,
    `- 词缀综合装备分 (Gear Score): ${runeMetrics.value.affixScore} 点`,
    `- 晶格热应力安全余量: ${runeMetrics.value.safetyMargin}%`,
    `- 熔炼神兵综合品级: ${runeMetrics.value.rating}`,
    '',
    '【底层引擎契约安全指纹】',
    '- Engine Spec: Godot 4.6 LTS / GDScript RefCounted Pure Logic',
    `- Digital Fingerprint: SHA256-RUNE-${Math.random().toString(36).substring(2, 10).toUpperCase()}${Date.now().toString(36).toUpperCase()}`,
    '================================================================================'
  ]

  const certContent = certLines.join('\n')

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relic_rune_infusion_v2.2.277_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  message.success('太古符文熔铸方案书已导出并同步至剪贴板！')
}

const gdRuneScriptCode = [
  '## relic_rune_infusion_engine.gd',
  '## Godot 4.6 LTS - 太古神兵符文熔铸与多维词缀萃取引擎',
  'extends RefCounted',
  'class_name RelicRuneInfusionEngine',
  '',
  'signal rune_infused(inscription_id: String, final_atk: int, affix_score: int)',
  'signal thermal_stress_calculated(safety_margin: float, is_stable: bool)',
  '',
  'var rune_energy: float = 550.0',
  'var affix_purity: float = 88.0',
  'var forge_temperature: float = 1680.0',
  'var void_catalyst: float = 3.5',
  'var enable_overlimit_mutation: bool = true',
  'var enable_cryo_annealing: bool = true',
  '',
  'func calculate_infusion_outcome(base_atk: int, affix_power: int) -> Dictionary:',
  '\tvar bonus_atk: float = float(base_atk) * (1.0 + affix_purity / 200.0) + rune_energy * 0.12',
  '\tif enable_overlimit_mutation:',
  '\t\tbonus_atk += 35.0',
  '\t',
  '\tvar affix_score: int = int(float(affix_power) + rune_energy * 0.85 + affix_purity * 4.2)',
  '\tvar temp_excess: float = maxf(0.0, forge_temperature - 1200.0)',
  '\tvar safety_margin: float = clampf(100.0 - (temp_excess / 18.0) - (void_catalyst * 2.2) + (15.0 if enable_cryo_annealing else 0.0), 12.0, 100.0)',
  '\t',
  '\treturn {',
  '\t\t"final_atk": int(bonus_atk),',
  '\t\t"affix_score": affix_score,',
  '\t\t"safety_margin": safety_margin,',
  '\t\t"is_stable": safety_margin >= 30.0,',
  '\t\t"signature": "SHA256-RUNE-" + String.num_int64(Time.get_ticks_msec()).sha256_text().substr(0, 16)',
  '\t}'
].join('\n')

// ==========================================
// 全域太古神兵圣遗物灵髓注能工坊 (v2.2.299)
// ==========================================
interface EssenceArchetype {
  id: string
  name: string
  icon: string
  tag: string
  desc: string
  perk: string
  powerMult: number
}

const essenceArchetypes: EssenceArchetype[] = [
  {
    id: 'excalibur_radiance',
    name: '王者誓约·神圣王者之剑',
    icon: '🗡️',
    tag: '神圣誓约',
    desc: '凝聚圆桌骑士终极英灵，挥出炽白全屏真圣光裂隙，全属性暴击破限',
    perk: '圣光物理暴击伤害 +220%',
    powerMult: 1.45
  },
  {
    id: 'gungnir_dragoon',
    name: '死星暗核·虚空屠龙神枪',
    icon: '🐉',
    tag: '真神贯穿',
    desc: '融合太古黑龙骸骨与死星陨铁，无视目标护甲穿透，下落龙剑终焉湮灭',
    perk: '无视护甲真实暴击 +185%',
    powerMult: 1.35
  },
  {
    id: 'sage_genesis_staff',
    name: '太古星宿·创世大贤者神杖',
    icon: '🔮',
    tag: '全系掌控',
    desc: '掌控白魔法生生不息与黑魔法陨石天劫，全法系消耗降低 40% 且瞬发',
    perk: '全法术咏唱时间归零',
    powerMult: 1.40
  },
  {
    id: 'void_sasuke_blade',
    name: '虚空相位·佐助时空绝命刃',
    icon: '🗡️',
    tag: '极影绝灭',
    desc: '隐没于影之位面，极速一闪必定暴击，8 连乱打诱发时空裂痕真实撕裂',
    perk: '8 连击乱打真实撕裂伤',
    powerMult: 1.50
  }
]

const selectedEssenceId = ref<string>('excalibur_radiance')

// 4 维连续滑块参数
const essenceDepth = ref<number>(85)
const resonanceHertz = ref<number>(720)
const quenchTemp = ref<number>(3200)
const aetherCompression = ref<number>(3.5)

// 3 大神兵保护断路器
const antiShatterDivineSeal = ref<boolean>(true)
const godhoodAffixLock = ref<boolean>(true)
const transcendenceTrueDamageCap = ref<boolean>(true)

const currentEssence = computed(() => {
  return essenceArchetypes.find(a => a.id === selectedEssenceId.value) || essenceArchetypes[0]
})

const calculatedRelicCP = computed(() => {
  const baseCP = 22000
  const depthBonus = essenceDepth.value * 280
  const hertzBonus = Math.round((resonanceHertz.value / 100) * 2200)
  const tempBonus = Math.round((quenchTemp.value / 1000) * 3500)
  const compressBonus = Math.round(aetherCompression.value * 4500)
  return Math.round((baseCP + depthBonus + hertzBonus + tempBonus + compressBonus) * currentEssence.value.powerMult)
})

const calculatedTrueDmg = computed(() => {
  const baseDmg = 180000
  const compressionEffect = aetherCompression.value * 65000
  const hertzEffect = resonanceHertz.value * 420
  const capBonus = transcendenceTrueDamageCap.value ? 1.85 : 1.0
  return Math.round((baseDmg + compressionEffect + hertzEffect) * currentEssence.value.powerMult * capBonus)
})

const calculatedInfusionSuccessRate = computed(() => {
  let rate = 72.0
  rate += (essenceDepth.value / 100) * 16.0
  rate += (resonanceHertz.value / 1000) * 8.0
  if (antiShatterDivineSeal.value) rate += 6.5
  if (godhoodAffixLock.value) rate += 4.5
  if (quenchTemp.value > 4000) rate -= 5.0
  return Math.min(99.8, Math.max(50.0, rate))
})

const relicDivineTier = computed(() => {
  if (calculatedRelicCP.value >= 60000 && calculatedTrueDmg.value >= 700000) return 'EX·太古创世真神圣遗物'
  if (calculatedRelicCP.value >= 45000) return 'SS·传世神话奇迹兵刃'
  if (calculatedRelicCP.value >= 30000) return 'S·极境太古遗迹宝具'
  return 'A·精良名匠圣器'
})

const resetEssenceParameters = () => {
  essenceDepth.value = 85
  resonanceHertz.value = 720
  quenchTemp.value = 3200
  aetherCompression.value = 3.5
  antiShatterDivineSeal.value = true
  godhoodAffixLock.value = true
  transcendenceTrueDamageCap.value = true
  message?.info('圣遗物灵髓参数已重置为黄金标准配置')
}

// 五阶段仿真推演
const isSimulatingEssence = ref<boolean>(false)
const essenceSimulationStep = ref<number>(0)
interface EssenceLogItem {
  text: string
  color?: string
}
const essenceLogs = ref<EssenceLogItem[]>([])

const essenceStages = [
  { id: 1, title: '神兵晶格与灵髓扫描', desc: '检索分子晶格完整度与灵髓亲和' },
  { id: 2, title: '神圣封印与锁相就绪', desc: '启动防碎裂保护与极品词缀锁' },
  { id: 3, title: '高炉极温熔铸注能', desc: '超极温高炉分子重构神性注入' },
  { id: 4, title: '赫兹共鸣光子跃迁', desc: '神圣赫兹谐波诱发能量大爆发' },
  { id: 5, title: '神格觉醒完成入库', desc: '颁发传世认证书与真神圣遗物' }
]

const runEssenceSimulation = async () => {
  if (isSimulatingEssence.value) return
  isSimulatingEssence.value = true
  essenceSimulationStep.value = 0
  essenceLogs.value = []

  const appendLog = (text: string, color?: string) => {
    essenceLogs.value.push({ text, color })
  }

  appendLog('[INIT] 启动全域太古神兵灵髓注能与神格觉醒管线...', 'text-amber-400 font-bold')
  await new Promise(r => setTimeout(r, 400))

  // Step 1
  essenceSimulationStep.value = 1
  appendLog(`[STEP 1] 选定圣遗物【${currentEssence.value.name}】，灵髓浸润深度 ${essenceDepth.value}%，共鸣赫兹 ${resonanceHertz.value} Hz。`, 'text-cyan-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 2
  essenceSimulationStep.value = 2
  appendLog(`[STEP 2] 激活防碎裂神圣封印: ${antiShatterDivineSeal.value ? '已就绪 (90%返还)' : '未开启'}；词缀锁相环: ${godhoodAffixLock.value ? '已锁定' : '未开启'}。`, 'text-purple-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 3
  essenceSimulationStep.value = 3
  appendLog(`[STEP 3] 高炉升温至 ${quenchTemp.value} ℃！以太压缩比 ${aetherCompression.value.toFixed(1)}x，神兵战力估值跃升至 +${calculatedRelicCP.value.toLocaleString()} CP！`, 'text-rose-400 font-bold')
  await new Promise(r => setTimeout(r, 500))

  // Step 4
  essenceSimulationStep.value = 4
  appendLog(`[STEP 4] 突破伤害天花板: 爆发期望真伤达 ${calculatedTrueDmg.value.toLocaleString()} DMG，成功率 ${calculatedInfusionSuccessRate.value.toFixed(1)}%！`, 'text-emerald-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 5
  essenceSimulationStep.value = 5
  appendLog(`[SUCCESS] 圣遗物神格觉醒圆满达成！认证位阶: 【${relicDivineTier.value}】，传世宝具永久铸成！`, 'text-amber-300 font-bold')
  isSimulatingEssence.value = false
  message?.success('神格觉醒推演圆满成功！')
}

const exportEssenceCertificate = () => {
  const certData = {
    studio: 'Ancient Relic Spiritual Essence & Divine Awakening Studio v2.2.299',
    relic: currentEssence.value.name,
    essenceDepth: essenceDepth.value,
    resonanceHertz: resonanceHertz.value,
    quenchTemp: quenchTemp.value,
    aetherCompression: aetherCompression.value,
    calculatedRelicCP: calculatedRelicCP.value,
    calculatedTrueDmg: calculatedTrueDmg.value,
    calculatedInfusionSuccessRate: calculatedInfusionSuccessRate.value,
    relicDivineTier: relicDivineTier.value,
    timestamp: new Date().toISOString(),
    sha256Certificate: 'RELIC-ESSENCE-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(16).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `relic_essence_certificate_${certData.sha256Certificate}.json`
  a.click()
  URL.revokeObjectURL(url)
  message?.success(`已导出传世方案书: ${certData.sha256Certificate}`)
}

// 源码展台
type EssenceScriptKey = 'infusion_engine' | 'awakening_matrix' | 'divine_seal'

const activeEssenceScriptTab = ref<EssenceScriptKey>('infusion_engine')

const essenceScriptTabs = [
  { key: 'infusion_engine' as const, name: '灵髓注能引擎' },
  { key: 'awakening_matrix' as const, name: '神格觉醒概率矩阵' },
  { key: 'divine_seal' as const, name: '防碎裂神圣封印' }
]

const essenceScriptCodes: Record<EssenceScriptKey, string> = {
  infusion_engine: `class_name AncientRelicEssenceInfusionEngine
extends RefCounted

## 最终幻想：时空之轮 - 圣遗物灵髓注能核心引擎
## 文件路径: res://scripts/equipment/ancient_relic_essence_infusion_engine.gd
## 引擎版本: Godot Engine 4.6 LTS

signal relic_infused(relic_id: String, combat_power: int, true_damage: int)
signal infusion_failed(recovered_essence: float)

var essence_depth: float = 0.85
var resonance_hz: float = 720.0
var quench_temp: float = 3200.0
var compression_ratio: float = 3.5
var divine_seal_active: bool = true

func execute_essence_infusion(base_power: int) -> Dictionary:
    var success_chance: float = 0.72 + (essence_depth * 0.16) + (resonance_hz / 1000.0 * 0.08)
    if divine_seal_active:
        success_chance += 0.065
    if quench_temp > 4000.0:
        success_chance -= 0.05

    var roll: float = randf()
    var is_success: bool = roll <= clampf(success_chance, 0.50, 0.998)

    if not is_success:
        var recovered: float = essence_depth * 0.90 if divine_seal_active else 0.0
        infusion_failed.emit(recovered)
        return {
            "success": false,
            "recovered_ratio": recovered,
            "status": "SEAL_PROTECTED_RECOVERED" if divine_seal_active else "SHATTERED"
        }

    var cp: int = int(float(base_power) * (1.0 + essence_depth * 0.8) * (compression_ratio / 2.0))
    var true_dmg: int = int(float(cp) * 12.5)

    var result := {
        "success": true,
        "combat_power": cp,
        "true_damage": true_dmg,
        "divine_tier": "EX_DIVINE_CREATION"
    }
    relic_infused.emit("excalibur", cp, true_dmg)
    return result
`,

  awakening_matrix: `class_name GodhoodDivineAwakeningMatrix
extends RefCounted

## 最终幻想：时空之轮 - 神格觉醒与词缀锁相概率矩阵
## 文件路径: res://scripts/equipment/godhood_divine_awakening_matrix.gd
## 引擎版本: Godot Engine 4.6 LTS

static func roll_divine_affix(lock_active: bool) -> Dictionary:
    var affixes := [
        {"name": "诸神圣裁", "crit_boost": 2.2, "piercing": 1.0},
        {"name": "时空撕裂", "crit_boost": 1.85, "true_damage": 0.5},
        {"name": "万物归一", "crit_boost": 1.5, "mana_cost": -0.4}
    ]
    if lock_active:
        return affixes[0] # 必定命中最高阶神圣誓约
    return affixes[randi() % affixes.size()]
`,

  divine_seal: `class_name AntiShatterDivineSealGuard
extends RefCounted

## 最终幻想：时空之轮 - 防碎裂神圣封印与极温保护控制器
## 文件路径: res://scripts/equipment/anti_shatter_divine_seal_guard.gd
## 引擎版本: Godot Engine 4.6 LTS

static func prevent_relic_break(temp: float, has_seal: bool) -> Dictionary:
    var is_overheat: bool = temp > 3800.0
    return {
        "safe": has_seal or not is_overheat,
        "leak_valve_open": is_overheat and has_seal,
        "mitigation_percent": 35.0 if has_seal else 0.0
    }
`
}

const currentEssenceScriptCode = computed(() => {
  return essenceScriptCodes[activeEssenceScriptTab.value]
})

const copyEssenceScript = () => {
  navigator.clipboard.writeText(currentEssenceScriptCode.value)
  message?.success('已复制 Godot 4.6 LTS 脚本源码到剪贴板！')
}


// ==========================================
// 十二太古封印神兵谱系、套装共鸣与精炼突破工坊 (v2.2.319)
// ==========================================
const selectedRelicArchetype = ref('wyrmbane')
const relicArchetypes = [
  {
    id: 'wyrmbane',
    name: '太古龙王灭却圣剑',
    trueName: 'Excalibur Wyrmbane',
    icon: '🗡️',
    typeTag: '圣裁龙破',
    tagClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    desc: '库扎封印城首位圣剑，针对巨龙族与虚空异形附带 300% 极意真实圣伤。',
    specialization: '龙族斩灭 / 真实圣伤 +300%'
  },
  {
    id: 'soul_harvester',
    name: '终焉死灵摄魂巨镰',
    trueName: 'Soul Harvester Abyss',
    icon: '⚰️',
    typeTag: '暗蚀摄魄',
    tagClass: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    desc: '太古暗属性死灵圣镰，每次斩击将造成伤害 35% 转化为护盾与全队以太回充。',
    specialization: '护盾转化 35% / 全队回充'
  },
  {
    id: 'genesis_scepter',
    name: '创世以太全知魔杖',
    trueName: 'Omniscient Scepter',
    icon: '🪄',
    typeTag: '以太全知',
    tagClass: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    desc: '调律太古四大元素禁咒，使所有高阶禁忌黑白魔法法力消耗降为 1。',
    specialization: 'MP 消耗锁定 1 / 暴击率 100%'
  },
  {
    id: 'rift_bow',
    name: '时空裂隙虚空神弓',
    trueName: 'Spacetime Rift Bow',
    icon: '🏹',
    typeTag: '空间箭阵',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    desc: '引动空间扭曲力场，箭矢彻底无视敌方双抗并造成 0.5s 时空迟缓。',
    specialization: '双抗穿透 100% / 时空迟缓'
  }
]

const relicRefineLevel = ref(15)
const sealUnlockDepth = ref(85)
const synergyResonanceHz = ref(750)
const breakthroughPurity = ref(92)

const enableTrueNameAwakening = ref(true)
const enableOmniSetAura = ref(true)
const enableDualWieldZeroPenalty = ref(true)

const isRelicSimulating = ref(false)
const relicSimProgress = ref(0)
const relicSimStep = ref('')
const relicLog = ref<string[]>([])

const relicEstimatedTrueDmg = computed(() => {
  let base = 12000000
  base += relicRefineLevel.value * 950000
  base += sealUnlockDepth.value * 75000
  base += (synergyResonanceHz.value / 10) * 12000
  base += breakthroughPurity.value * 45000
  if (enableTrueNameAwakening.value) base *= 1.35
  if (enableOmniSetAura.value) base *= 1.25
  if (enableDualWieldZeroPenalty.value) base *= 1.4
  return Math.round(base)
})

const relicResonanceStability = computed(() => {
  let val = 88.0 + (synergyResonanceHz.value / 1000) * 8.5 + (relicRefineLevel.value / 20) * 3.4
  return Math.min(99.9, parseFloat(val.toFixed(1)))
})

const relicBreakthroughPurityPct = computed(() => {
  let val = (breakthroughPurity.value * 0.7) + (sealUnlockDepth.value * 0.28)
  return Math.min(99.8, parseFloat(val.toFixed(1)))
})

const relicTierBadge = computed(() => {
  if (relicEstimatedTrueDmg.value > 35000000) return 'EX·太古封印至尊神话'
  if (relicEstimatedTrueDmg.value > 28000000) return 'SSS·神圣真言觉醒破限'
  if (relicEstimatedTrueDmg.value > 20000000) return 'SS·高维以太共鸣极意'
  return 'S·库扎封印灵髓共鸣'
})

const selectRelicArchetype = (id: string) => {
  selectedRelicArchetype.value = id
  const target = relicArchetypes.find(a => a.id === id)
  if (target) {
    message?.info(`已切换太古神兵至：${target.name}（${target.trueName}）`)
  }
}

const resetRelicDefaults = () => {
  relicRefineLevel.value = 15
  sealUnlockDepth.value = 85
  synergyResonanceHz.value = 750
  breakthroughPurity.value = 92
  enableTrueNameAwakening.value = true
  enableOmniSetAura.value = true
  enableDualWieldZeroPenalty.value = true
  message?.success('已重置神兵破限与共鸣至基准配置！')
}

const runRelicSimulation = () => {
  if (isRelicSimulating.value) return
  isRelicSimulating.value = true
  relicSimProgress.value = 0
  relicLog.value = []

  const steps = [
    { p: 20, step: '解构库扎十二太古封印古文字符串与空间锁...', log: '太古封印深度校验达成：85% 解封，真言脉络连通。' },
    { p: 45, step: '注入以太真火炼化，提升至 +15 极意精炼阶数...', log: '精炼升阶通过，太古武器基础白值攻击力与破甲系数跃迁。' },
    { p: 70, step: '校准四件套跨界共鸣频段 (750 MHz)...', log: '共鸣矩阵闭合，全队全元素抗性 +50% 光环成功广播。' },
    { p: 90, step: '平衡二刀流零衰减副手输出判定...', log: '二刀流双持校验完成，副手伤害衰减归零，独立双判定生效。' },
    { p: 100, step: '沙盘推演完成，太古神兵真名神圣觉醒！', log: `推演极意真伤: ${relicEstimatedTrueDmg.value.toLocaleString()} 点，评级: ${relicTierBadge.value}。` }
  ]

  let idx = 0
  const interval = setInterval(() => {
    if (idx < steps.length) {
      relicSimProgress.value = steps[idx].p
      relicSimStep.value = steps[idx].step
      relicLog.value.push(steps[idx].log)
      idx++
    } else {
      clearInterval(interval)
      isRelicSimulating.value = false
      message?.success('太古封印神兵破限沙盘推演圆满完成！')
    }
  }, 250)
}

const exportRelicCert = () => {
  const cert = {
    standard: 'GODOT-4.6-LTS-SEALED-RELIC-SPEC',
    version: 'v2.2.319',
    timestamp: new Date().toISOString(),
    archetype: selectedRelicArchetype.value,
    refine_level: relicRefineLevel.value,
    seal_depth: sealUnlockDepth.value,
    resonance_hz: synergyResonanceHz.value,
    breakthrough_purity: breakthroughPurity.value,
    true_name_awakened: enableTrueNameAwakening.value,
    omni_set_aura: enableOmniSetAura.value,
    dual_wield_zero_penalty: enableDualWieldZeroPenalty.value,
    estimated_true_damage: relicEstimatedTrueDmg.value,
    resonance_stability: relicResonanceStability.value,
    breakthrough_purity_pct: relicBreakthroughPurityPct.value,
    tier: relicTierBadge.value,
    cert_sha256: '9a7e8f52b319d6c1e0847b2c5d3f9e8a01476b32dc9e4718502afec6179b43d2'
  }
  const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sealed_relic_breakthrough_cert_${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  message?.success('已导出太古封印神兵契约认证证书！')
}

const activeRelicScriptTab = ref<'controller' | 'synergy_bus' | 'dual_wield'>('controller')

const relicScriptCodes = {
  controller: `class_name SealedRelicBreakthroughController
extends RefCounted

## 最终幻想：时空之轮 - 太古十二封印神兵解封与破限控制器
## 文件路径: res://scripts/equipment/sealed_relic_breakthrough_controller.gd
## 引擎版本: Godot Engine 4.6 LTS

signal relic_unsealed(relic_id: String, true_dmg: int, tier: String)

static func evaluate_relic(
    relic_id: String,
    refine_level: int,
    seal_depth: float,
    awakening_enabled: bool
) -> Dictionary:
    var base_dmg: float = 12000000.0 + (refine_level * 950000.0)
    var depth_ratio: float = clampf(seal_depth / 100.0, 0.1, 1.0)
    var true_dmg: float = base_dmg * (1.0 + depth_ratio * 0.8)
    
    if awakening_enabled:
        true_dmg *= 1.35
        
    return {
        "relic_id": relic_id,
        "true_damage": int(true_dmg),
        "is_awakened": awakening_enabled,
        "cert_status": "EX_ANCIENT_SEALED_RELIC"
    }
`,

  synergy_bus: `class_name SetSynergyResonanceBus
extends RefCounted

## 最终幻想：时空之轮 - 太古神兵套装共鸣总线与光环广播器
## 文件路径: res://scripts/equipment/set_synergy_resonance_bus.gd
## 引擎版本: Godot Engine 4.6 LTS

signal resonance_aura_dispatched(freq_hz: float, resist_boost: float)

static func broadcast_set_synergy(pieces_count: int, freq_hz: float) -> Dictionary:
    var active_aura: bool = pieces_count >= 4
    var stability: float = clampf(88.0 + (freq_hz / 1000.0) * 11.5, 80.0, 99.9)
    
    return {
        "set_active": active_aura,
        "all_resists_boost": 50.0 if active_aura else 0.0,
        "pierce_defense": active_aura,
        "stability_pct": stability
    }
`,

  dual_wield: `class_name DualWieldDamageResolver
extends RefCounted

## 最终幻想：时空之轮 - 二刀流零衰减副手双持伤害计算与破限处理器
## 文件路径: res://scripts/equipment/dual_wield_damage_resolver.gd
## 引擎版本: Godot Engine 4.6 LTS

static func resolve_dual_wield(
    main_hand_dmg: float,
    off_hand_dmg: float,
    zero_penalty_active: bool
) -> Dictionary:
    var off_hand_factor: float = 1.0 if zero_penalty_active else 0.65
    var total_dmg: float = main_hand_dmg + (off_hand_dmg * off_hand_factor)
    
    return {
        "total_strike_damage": total_dmg,
        "off_hand_efficiency": off_hand_factor * 100.0,
        "independent_crit_check": true
    }
`
}

const currentRelicScriptCode = computed(() => {
  return relicScriptCodes[activeRelicScriptTab.value]
})

const copyRelicScript = () => {
  navigator.clipboard.writeText(currentRelicScriptCode.value)
  message?.success('已复制 Godot 4.6 LTS 太古神兵源码到剪贴板！')
}

</script>

<style scoped>
.equipment-category-button:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 2px;
}
</style>
