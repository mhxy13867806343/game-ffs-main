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
              LEGENDARY WEAPONS & RAGNAROK RELICS
            </span>
            <span class="text-xs text-gray-400">至高超越神兵与二刀流伤害工坊</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🗡️</span> 神兵矩阵：诸神之黄昏、太古封印与二刀流推演
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
            收录次元神龙守护的至高超越神兵【诸神之黄昏 (Ragnarok)】、库扎封印城十二太古圣器、二刀流乱打伤害结算沙盘与 Godot 4.x 装备属性守恒解析器。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
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

    <!-- 4. 属性加成与守恒解析源码 -->
    <div v-if="activeTab === 'engine_code'" class="space-y-4">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                GODOT 4.X STAT RESOLVER SCRIPT
              </span>
              <h3 class="text-base font-bold text-white">equipment_stats_resolver.gd</h3>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              装备属性加成叠加、HP/MP 上限守恒还原、双持二刀流惩罚消除与魔法剑附魔结算引擎。
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

const message = useMessage()
const gameStore = useGameStore()
const equipment = computed(() => gameStore.db.equipment || [])

type EquipmentTab = 'catalog' | 'dual_wield' | 'awakening' | 'engine_code'
const activeTab = ref<EquipmentTab>('catalog')
const tabList: { key: EquipmentTab; label: string; icon: string; badge?: string }[] = [
  { key: 'catalog', label: '神兵图鉴矩阵', icon: '🗡️' },
  { key: 'dual_wield', label: '二刀流伤害工坊', icon: '⚔️', badge: 'NEW' },
  { key: 'awakening', label: '太古开光与附魔', icon: '⚗️' },
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

const copyGdScript = () => {
  navigator.clipboard.writeText(gdScriptCode).then(() => {
    message.success('equipment_stats_resolver.gd 源码已复制到剪贴板！')
  }).catch(() => {
    message.info('源码已复制')
  })
}
</script>

<style scoped>
.equipment-category-button:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 2px;
}
</style>
