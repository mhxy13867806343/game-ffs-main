<template>
  <div class="economy-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-yellow-950/80 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              MACRO ECONOMY & ALCHEMY WORKSHOP
            </span>
            <span class="text-xs text-gray-400">宏观经济、尾巴奇迹与药剂质变</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>⚗️</span> 宏观经济与调合工坊：七色尾巴兑换与药剂师质变炼金
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            从全境五阶商业城邦贸易物价指数，到隐士洞窟的七色尾巴神器传承兑换，以及药剂师两两调合的质变炼金体系。全息实装配方动态模拟沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>🧪</span></template>
            前往调合演练沙盘
          </n-button>
          <router-link to="/vble/items">
            <n-button size="medium" round tertiary>
              查看道具图鉴
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心统计概览卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">七色尾巴神装</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">{{ tailWeaponsList.length }} 具</div>
        <div class="text-[10px] text-gray-500 mt-0.5">隐士洞窟专属传承</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">药剂调合质变式</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ mixRecipesList.length }} 种神效</div>
        <div class="text-[10px] text-gray-500 mt-0.5">两两融合突破限界</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">生命翻倍上限</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">200% HP</div>
        <div class="text-[10px] text-gray-500 mt-0.5">巨人之药质变效果</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">调合运算核心</div>
        <div class="text-2xl font-black text-purple-400 font-mono mt-1">Godot 4.x</div>
        <div class="text-[10px] text-gray-500 mt-0.5">alchemist_mix_system.gd</div>
      </div>
    </div>

    <!-- 七色尾巴神器传承矩阵 -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-yellow-300 flex items-center gap-2">
          <span>🦊</span> 七色尾巴神器传承矩阵 (Tail Seven Contracts)
        </h2>
        <span class="text-xs text-gray-400">击败世界极罕见魔物掉落尾巴并在隐士洞窟兑换</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="weapon in tailWeaponsList"
          :key="weapon.id"
          class="p-5 rounded-xl bg-[#121626]/90 border border-slate-800 transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h3 class="text-base font-bold text-cyan-300">{{ weapon.name }}</h3>
                <span class="text-xs text-gray-400 font-mono">{{ weapon.job }}</span>
              </div>
              <n-tag size="small" type="warning">{{ weapon.type }}</n-tag>
            </div>

            <div class="p-2.5 bg-amber-950/30 border border-amber-900/40 rounded-lg text-xs text-amber-300 flex items-center justify-between">
              <span>🦊 兑换所需素材:</span>
              <span class="font-bold font-mono">{{ weapon.tail_source }}</span>
            </div>

            <div class="space-y-1.5 text-xs">
              <div class="text-gray-300">
                <span class="text-gray-400 font-medium">⚔️ 基础面板:</span>
                <span class="font-mono text-white ml-1">{{ weapon.stats }}</span>
              </div>
              <div class="text-purple-300">
                <span class="text-gray-400 font-medium">✨ 专属特效:</span>
                <span class="ml-1">{{ weapon.effect }}</span>
              </div>
            </div>

            <p class="text-[11px] text-gray-400 leading-relaxed border-t border-slate-800 pt-2.5">
              {{ weapon.origin }}
            </p>
          </div>

          <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-500">
            <span>稀有度: {{ weapon.rarity }}</span>
            <span class="text-amber-400">禁止副手</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 2: 七色尾巴隐士洞窟兑换与太古觉醒推演沙盘 (Hermit Cave Tail Awakening & Trade Studio) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c1308] via-[#141824] to-[#0c101a] border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.22)] space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-amber-950 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              HERMIT CAVE AWAKENING STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🦊</span> 隐士洞窟七色尾巴兑换与太古觉醒推演沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            太古隐士的古老契约：以极罕尾巴唤醒沉睡神兵。支持掉落概率推演、尾巴随身背包模拟、三阶契约突破（始祖/灵魂/太古超越）与一键凭证导出。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" secondary type="warning" @click="fillAllTails">
            📦 一键补满素材
          </n-button>
          <n-button size="small" secondary type="default" @click="clearAllTails">
            🔄 清空背包
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportTailReceipt">
            📜 导出觉醒契约凭证
          </n-button>
        </div>
      </div>

      <!-- 尾巴素材随身背包仓储 (8大极罕尾巴) -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <span>🎒</span>
            <span>随身尾巴仓储与击杀掉落模拟 (点击卡片选定 / 调整数量 / 掷骰掉落)</span>
          </span>
          <span class="text-[11px] text-gray-400 font-mono">
            已契约神器: <strong class="text-emerald-400">{{ Object.keys(claimedTailsRelics).length }}</strong> / 8 件
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          <div
            v-for="tail in tailDefinitions"
            :key="tail.id"
            class="p-2.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
            :class="selectedTailId === tail.id
              ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'"
            @click="selectedTailId = tail.id"
          >
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <span class="text-base">{{ tail.icon }}</span>
                <span
                  class="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full"
                  :class="tail.inventoryCount > 0 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-slate-800 text-gray-500'"
                >
                  ×{{ tail.inventoryCount }}
                </span>
              </div>
              <div class="font-bold text-xs truncate" :class="selectedTailId === tail.id ? 'text-amber-300' : 'text-gray-200'">
                {{ tail.shortName }}
              </div>
              <div class="text-[10px] text-gray-400 truncate">{{ tail.dropRateText }}</div>
            </div>

            <div class="pt-2 mt-1 border-t border-slate-800/80 flex items-center justify-between gap-1">
              <button
                type="button"
                class="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                title="扣减素材"
                @click.stop="adjustTailCount(tail.id, -1)"
              >
                -
              </button>
              <button
                type="button"
                class="flex-1 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center justify-center cursor-pointer transition-colors"
                title="模拟击杀首领判定掉落"
                @click.stop="rollDropSimulation(tail.id)"
              >
                🎲 探
              </button>
              <button
                type="button"
                class="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                title="增加素材"
                @click.stop="adjustTailCount(tail.id, 1)"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 当前选中尾巴的神兵觉醒与契约推演工作台 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <!-- 栏 1: 掉落渊源与魔物档案 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>📜</span>
              <span>太古尾巴捕获档案</span>
            </span>
            <n-tag size="tiny" :type="currentTailDef.tagType">{{ currentTailDef.colorBadge }}</n-tag>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div class="text-sm font-bold text-white flex items-center gap-2">
                <span>{{ currentTailDef.icon }}</span>
                <span>{{ currentTailDef.tailName }}</span>
              </div>
              <div class="text-gray-400">
                栖息宿主: <strong class="text-rose-400">{{ currentTailDef.sourceMonster }}</strong>
              </div>
              <div class="text-gray-400">
                实机掉落概率: <span class="font-mono text-amber-400 font-bold">{{ currentTailDef.dropRateText }}</span>
              </div>
              <div class="text-gray-400">
                随身库存: <span class="font-mono text-cyan-400 font-bold">{{ currentTailDef.inventoryCount }} 枚</span>
              </div>
            </div>

            <!-- 模拟刷怪掉落操作台 -->
            <div class="p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 space-y-2">
              <div class="text-[11px] text-amber-300 font-bold flex items-center justify-between">
                <span>🎲 实机掉落演算机</span>
                <span>伪随机洗牌</span>
              </div>
              <p class="text-[11px] text-gray-400 leading-snug">
                针对【{{ currentTailDef.sourceMonster }}】发起挑战，模拟 Godot 4.6 RNG 随机掷骰。
              </p>
              <div class="flex gap-2 pt-1">
                <button
                  type="button"
                  class="flex-1 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow"
                  @click="rollDropSimulation(currentTailDef.id)"
                >
                  击杀并结算 (单抽)
                </button>
                <button
                  type="button"
                  class="flex-1 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs transition-all cursor-pointer border border-slate-700"
                  @click="batchRollDrop(currentTailDef.id, 10)"
                >
                  连战 ×10 连刷
                </button>
              </div>
              <div v-if="lootRollNotice" class="text-[11px] text-center font-bold font-mono pt-1" :class="lootRollSuccess ? 'text-emerald-400 animate-pulse' : 'text-gray-400'">
                {{ lootRollNotice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 2: 觉醒阶段与契约注入 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span>⚙️</span>
              <span>契约突破位阶 (Awakening Tier)</span>
            </span>
            <n-tag size="tiny" type="info">3 阶质变</n-tag>
          </div>

          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="tier in currentTailDef.tiers"
                :key="tier.tier"
                type="button"
                class="p-2.5 rounded-lg border text-left transition-all cursor-pointer"
                :class="selectedAwakenTier === tier.tier
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-700'"
                @click="selectedAwakenTier = tier.tier"
              >
                <div class="text-[10px] font-mono text-gray-500">Tier {{ tier.tier }}</div>
                <div class="text-xs font-bold truncate mt-0.5">{{ tier.tierName }}</div>
                <div class="text-[10px] text-amber-400 font-mono mt-1">需尾巴 ×{{ tier.reqTails }}</div>
              </button>
            </div>

            <!-- 当前所选位阶详述 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">传承神器:</span>
                <span class="font-bold text-amber-300 text-sm">{{ currentTailDef.relicName }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">适配职业:</span>
                <span class="font-mono text-gray-300">{{ currentTailDef.job }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">契约要求:</span>
                <span class="font-mono font-bold" :class="currentTailDef.inventoryCount >= currentTierData.reqTails ? 'text-emerald-400' : 'text-rose-400'">
                  持有 {{ currentTailDef.inventoryCount }} / 需 {{ currentTierData.reqTails }} 枚
                </span>
              </div>
              <div class="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                <div class="text-cyan-400 font-bold flex items-center gap-1">
                  <span>✨ 觉醒神技:</span>
                  <span>{{ currentTierData.skillName }}</span>
                </div>
                <p class="text-gray-300 leading-relaxed">{{ currentTierData.skillDesc }}</p>
              </div>
            </div>

            <!-- 缔结契约按钮 -->
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg"
              :disabled="currentTailDef.inventoryCount < currentTierData.reqTails"
              @click="executeTailAwakening"
            >
              🦊 消耗 {{ currentTierData.reqTails }} 枚尾巴 · 缔结契约唤醒神兵
            </button>
          </div>
        </div>

        <!-- 栏 3: 神器觉醒实机战力指标与已获凭证 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>太古神器实机面板评定</span>
              </span>
              <span
                class="text-[10px] font-bold px-2 py-0.5 rounded-full"
                :class="claimedTailsRelics[currentTailDef.id] ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-gray-400'"
              >
                {{ claimedTailsRelics[currentTailDef.id] ? `已契约 Tier ${claimedTailsRelics[currentTailDef.id]}` : '未契约沉睡中' }}
              </span>
            </div>

            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div class="text-[11px] text-gray-400">综合战力评级 (Power Rating)</div>
              <div class="text-3xl font-black font-mono mt-1 text-amber-400">
                {{ currentTierData.powerRating }}
              </div>
              <div class="text-[10px] text-emerald-400 mt-0.5">
                {{ currentTierData.statsBonus }}
              </div>
            </div>

            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">副手限制:</span>
                <span class="font-mono text-rose-400 font-bold">绝对禁止副手</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">契约凭证状态:</span>
                <span class="font-mono font-bold" :class="claimedTailsRelics[currentTailDef.id] ? 'text-cyan-400' : 'text-gray-500'">
                  {{ claimedTailsRelics[currentTailDef.id] ? '已录入隐士圣堂' : '等待契约印记' }}
                </span>
              </div>
            </div>
          </div>

          <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
            太古隐士箴言：收集全套 8 种极罕尾巴并完成三阶觉醒，可激活全队终极超越共鸣【时空圣痕】，物理与魔法伤害恒定提升 30%！
          </div>
        </div>
      </div>
    </div>

    <!-- 核心实机推演沙盘：药剂师两两调合质变工坊 -->
    <div id="alchemy-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#121524] via-[#161a2e] to-[#0e111d] border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.18)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ALCHEMY LAB STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚗️</span> 药剂师质变调合工坊与实机伤害逆转沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            动态对齐 Godot 引擎 alchemist_mix_system.gd：两两素材精准碰撞，推演生命翻倍、圣水 9999 贯穿真伤与诸神全员无敌结界。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickMix">
            🧪 激发质变调合
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：双槽原料配置 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-amber-300 flex items-center gap-2">
            <span>🧪</span> 调合素材槽位 (Mix Slots)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">主原料 (Material A)</label>
              <n-select
                v-model:value="selectedItemA"
                :options="itemOptionsA"
                size="small"
              />
            </div>

            <div>
              <label class="text-gray-400 block mb-1">副原料 (Material B)</label>
              <n-select
                v-model:value="selectedItemB"
                :options="itemOptionsB"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>药剂师调合专精等级:</span>
                <span class="font-mono text-cyan-400 font-bold text-sm">Lv.{{ mixProficiency }}</span>
              </div>
              <n-slider v-model:value="mixProficiency" :min="1" :max="5" :step="1" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">激活【药效加倍 (Pharmacology)】(+100% 效能):</span>
                <n-switch v-model:value="hasPharmacology" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">目标属于不死系怪群 (圣水 9999 斩杀):</span>
                <n-switch v-model:value="isTargetUndead" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：预设传奇神级配方速选 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div class="text-sm font-bold text-cyan-300 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><span>📜</span> 传奇调合公式速选</span>
            <span class="text-[11px] text-gray-400">一键装填槽位</span>
          </div>

          <div class="space-y-2 text-xs overflow-y-auto max-h-56 pr-1">
            <div
              v-for="r in mixRecipesList"
              :key="r.name"
              class="p-2.5 rounded bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all"
              @click="applyRecipePreset(r)"
            >
              <div class="flex items-center justify-between">
                <span class="font-bold text-amber-300">{{ r.name }}</span>
                <n-tag size="tiny" :type="r.tier === 'T4' ? 'error' : r.tier === 'T3' ? 'warning' : 'info'">{{ r.tier }}</n-tag>
              </div>
              <div class="text-[11px] text-cyan-400 font-mono mt-0.5">
                {{ r.itemA }} + {{ r.itemB }}
              </div>
              <div class="text-[11px] text-gray-400 mt-0.5">{{ r.effect }}</div>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息调合结算面板 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-amber-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 调合产物实时鉴定</span>
              <n-tag size="tiny" :type="mixResult.tierTagType">
                {{ mixResult.tier }} 品阶
              </n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 产物名称与主要效果 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">最终调合生成物 (Synthesized Mix)</div>
                <div class="text-xl sm:text-2xl font-black font-mono mt-1 tracking-wider text-amber-400">
                  {{ mixResult.productName }}
                </div>
                <div class="text-[11px] text-cyan-300 mt-1">
                  {{ mixResult.effectSummary }}
                </div>
              </div>

              <!-- 数值指标 -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">材料采购基准价</div>
                  <div class="font-mono font-bold text-amber-300 mt-0.5 text-sm">
                    {{ mixResult.costGil }} Gil
                  </div>
                </div>
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">战术质变评级</div>
                  <div class="font-mono font-bold text-emerald-400 mt-0.5 text-sm">
                    {{ mixResult.tacticalScore }}
                  </div>
                </div>
              </div>

              <!-- 机制判定详述 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-cyan-400 font-bold flex items-center gap-1">
                  <span>✨ 机制判定:</span>
                  <span>{{ mixResult.mechanismTitle }}</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ mixResult.mechanismDesc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>引擎算法: alchemist_mix_system.gd</span>
            <span class="text-amber-400">VBLE Alchemy & Economy Matrix v2.2.245</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 全境五大商业城邦物价指数与黑市行情 -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-xl">💰</span>
        <h3 class="text-lg font-bold text-white">全境五大商业城邦物价指数与黑市行情 (Market Price Index)</h3>
      </div>
      <p class="text-xs text-gray-400">
        记录不同区域商会物价倍率与珍稀物资流通。泰空王都税率标准，蜃楼小镇黑市提供特供禁忌配方。
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 pt-2">
        <div
          v-for="m in marketIndexList"
          :key="m.city"
          class="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1.5"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-amber-300 text-sm">{{ m.city }}</span>
            <n-tag size="tiny" :type="m.tagType">{{ m.status }}</n-tag>
          </div>
          <div class="text-xs text-gray-400">物价指数: <strong class="text-white">{{ m.index }}</strong></div>
          <div class="text-xs text-cyan-300 font-medium">特产: {{ m.specialty }}</div>
          <p class="text-[11px] text-gray-400 leading-snug pt-1 border-t border-slate-800">{{ m.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 专区 4: 蜃楼黑市秘密拍卖行与金币投掷 (Zeninage) 战术算力工坊 -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c140a] via-[#161009] to-[#0c0804] border border-amber-500/40 shadow-2xl space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-950 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🏛️</span>
            <h3 class="text-lg sm:text-xl font-black text-white text-glow-amber">蜃楼小镇绝版黑市竞拍行与金币投掷战术沙盘 (Mirage Auction & Zeninage)</h3>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            穿梭于次元裂隙的蜃楼秘密集市：实时推演洋葱神器、绝版古图与武士核心奥义【金钱镖 (钱投)】伤害性价比方程。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-tag type="warning" round size="small">黑市绝版拍品</n-tag>
          <n-tag type="success" round size="small">金币投掷真伤解算</n-tag>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 蜃楼秘密拍卖行实时竞标台 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>🔨</span>
              <span>黑市竞拍台 (Current Auction Lot)</span>
            </span>
            <span class="font-mono text-xs text-amber-400 font-bold">随身金币: {{ playerGil.toLocaleString() }} Gil</span>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选择当前拍品标的:</label>
              <select
                v-model="selectedAuctionId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
                @change="resetAuctionLot"
              >
                <option v-for="lot in auctionLots" :key="lot.id" :value="lot.id">
                  {{ lot.name }} (起拍: {{ lot.startPrice.toLocaleString() }}G)
                </option>
              </select>
            </div>

            <!-- 拍品详情 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div class="font-bold text-amber-300 flex items-center justify-between">
                <span>{{ currentLot.icon }} {{ currentLot.name }}</span>
                <n-tag size="tiny" type="warning">{{ currentLot.rarity }}</n-tag>
              </div>
              <p class="text-xs text-gray-400 leading-relaxed">{{ currentLot.description }}</p>
              <div class="flex justify-between items-center pt-1 border-t border-slate-800/80">
                <span class="text-gray-400">当前最高出价:</span>
                <span class="font-mono text-sm font-bold text-cyan-400">{{ currentBidPrice.toLocaleString() }} Gil</span>
              </div>
            </div>

            <!-- 出价操作 -->
            <div class="space-y-2 pt-1">
              <div class="flex gap-2">
                <button
                  type="button"
                  class="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all disabled:opacity-50 cursor-pointer"
                  :disabled="isAuctionWon || playerGil < currentBidPrice + 500"
                  @click="bidAuction(500)"
                >
                  加价 +500G
                </button>
                <button
                  type="button"
                  class="flex-1 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs transition-all disabled:opacity-50 cursor-pointer"
                  :disabled="isAuctionWon || playerGil < currentBidPrice + 2000"
                  @click="bidAuction(2000)"
                >
                  爆发加价 +2000G
                </button>
              </div>

              <div v-if="auctionNotice" class="text-[11px] text-center font-bold" :class="isAuctionWon ? 'text-emerald-400 animate-pulse' : 'text-amber-300'">
                {{ auctionNotice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 2: 武士【金钱镖 / 金币投掷】伤害解算工坊 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🗡️</span>
              <span>武士金钱镖 (Zeninage) 伤害解算</span>
            </span>
            <n-tag size="tiny" type="info">无视物魔双防真实破甲</n-tag>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>出阵武士等级 (Samurai Level):</span>
                <span class="font-mono text-cyan-400 font-bold">Lv. {{ samuraiLevel }}</span>
              </div>
              <n-slider v-model:value="samuraiLevel" :min="10" :max="99" :step="1" />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>单次投掷金币额度 (Gil Amount):</span>
                <span class="font-mono text-amber-400 font-bold">{{ zeninageGil.toLocaleString() }} Gil</span>
              </div>
              <n-slider v-model:value="zeninageGil" :min="1000" :max="30000" :step="1000" />
            </div>

            <div>
              <label class="text-gray-400 block mb-1">战场敌方目标数 (Target Count):</label>
              <select
                v-model="targetCount"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-cyan-400 focus:outline-none"
              >
                <option :value="1">单体首领 BOSS (全额聚焦重创)</option>
                <option :value="2">双生守门人 (伤害对半均摊)</option>
                <option :value="4">4人魔物群 (广域平摊清场)</option>
              </select>
            </div>

            <!-- 金币与伤害转化比率卡片 -->
            <div class="p-2.5 rounded bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span class="text-gray-400">金币伤害转换效率:</span>
              <span class="font-mono text-emerald-400 font-bold text-sm">{{ zeninageEfficiency }} 伤 / 100 Gil</span>
            </div>
          </div>
        </div>

        <!-- 栏 3: 实机投掷推演伤害与胜率指标 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/30 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>金币镖杀伤战果评定</span>
              </span>
              <n-tag size="tiny" type="success">真实真实伤害</n-tag>
            </div>

            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div class="text-[11px] text-gray-400">单体/均摊最终真实伤害 (True Damage)</div>
              <div class="text-3xl font-black font-mono mt-1 text-rose-400">
                {{ calculatedZeninageDamage.toLocaleString() }}
              </div>
              <div class="text-[10px] text-gray-500 mt-1">
                无视欧米茄防御 · 必定命中绝不落空
              </div>
            </div>

            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">单次抛洒成本:</span>
                <span class="font-mono text-amber-400 font-bold">-{{ zeninageGil.toLocaleString() }} G</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">击杀首领回合数:</span>
                <span class="font-mono text-cyan-400 font-bold">约 {{ Math.ceil(55000 / calculatedZeninageDamage) }} 轮斩杀</span>
              </div>
            </div>
          </div>

          <div class="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
            武士黄金法则：金钱镖是速通与破除极高物防魔防 BOSS（如欧米茄、水银史莱姆）的最快无解打法！
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-1.5">
            <span class="text-base">📜</span>
            <span class="font-mono text-sm font-bold text-amber-300">Godot 4.6 LTS 核心实机算法引擎</span>
          </div>
          <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'alchemy' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'alchemy'"
            >
              alchemist_mix_system.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'tail' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'tail'"
            >
              tail_exchange_system.gd
            </button>
          </div>
        </div>
        <n-button size="tiny" secondary type="warning" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900">{{ activeCodeTab === 'alchemy' ? godotCodeText : godotTailCodeText }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'
import { mixRecipes, type MixRecipe } from '../config/mixRecipes'

const message = useMessage()
const gameStore = useGameStore()

const selectedItemA = ref('巨人之血')
const selectedItemB = ref('圣水')
const mixProficiency = ref(4)
const hasPharmacology = ref(true)
const isTargetUndead = ref(false)
const copiedCode = ref(false)

const tailWeaponsList = computed(() => gameStore.db.tail_weapons || [])
const mixRecipesList = computed(() => mixRecipes)

const itemOptionsA = [
  { label: '巨人之血 (Giant Blood)', value: '巨人之血' },
  { label: '圣水 (Holy Water)', value: '圣水' },
  { label: '恢复药 (Potion)', value: '恢复药' },
  { label: '万灵药 (Elixir)', value: '万灵药' },
  { label: '龙之牙 (Dragon Fang)', value: '龙之牙' },
  { label: '毒眼泪 (Poison Tear)', value: '毒眼泪' },
  { label: '以太 (Ether)', value: '以太' }
]

const itemOptionsB = [
  { label: '圣水 (Holy Water)', value: '圣水' },
  { label: '以太 (Ether)', value: '以太' },
  { label: '烈火之卷 (Fire Scroll)', value: '烈火之卷' },
  { label: '黑暗之粉 (Dark Powder)', value: '黑暗之粉' },
  { label: '凤凰尾羽 (Phoenix Down)', value: '凤凰尾羽' },
  { label: '恢复药 (Potion)', value: '恢复药' }
]

const scrollToStudio = () => {
  const el = document.getElementById('alchemy-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetStudioParams = () => {
  selectedItemA.value = '巨人之血'
  selectedItemB.value = '圣水'
  mixProficiency.value = 4
  hasPharmacology.value = true
  isTargetUndead.value = false
  message.info('药剂调合参数已恢复默认')
}

const applyRecipePreset = (r: MixRecipe) => {
  selectedItemA.value = r.itemA
  selectedItemB.value = r.itemB
  scrollToStudio()
  message.success(`已装填调合配方：${r.name}`)
}

const triggerOneClickMix = () => {
  message.success(`⚗️ 调合成功！生成【${mixResult.value.productName}】，${mixResult.value.effectSummary}`)
}

// 核心调合判定与演算
const mixResult = computed(() => {
  const a = selectedItemA.value
  const b = selectedItemB.value

  let productName = '劣质调合试剂 (Failed Brew)'
  let tier = 'T1'
  let tierTagType: 'default' | 'info' | 'warning' | 'error' | 'success' = 'default'
  let effectSummary = '造成微量混乱与 50 点杂质伤害'
  let costGil = 100
  let tacticalScore = 'C 级战术备用'
  let mechanismTitle = '基础素材混合'
  let mechanismDesc = '两两素材未触发高阶质变反应，仅产生微量化学冲击。'

  // 巨人之药
  if ((a === '巨人之血' && b === '圣水') || (a === '圣水' && b === '巨人之血')) {
    productName = '巨人之药 (Giant Drink)'
    tier = 'T3'
    tierTagType = 'warning'
    costGil = 1200
    tacticalScore = 'SSS 级生存核心'
    mechanismTitle = '生命限界翻倍突破'
    effectSummary = hasPharmacology.value ? '目标当前与最大生命值突破至 200%（生命翻倍）！' : '目标最大生命值提升至 150%'
    mechanismDesc = '药剂师神技之一！无视角色原本 9999 HP 上限，在首领灭团大招前施加可使全员轻松承受必杀轰炸。'
  }
  // 诸神护佑
  else if ((a === '万灵药' && b === '凤凰尾羽') || (a === '凤凰尾羽' && b === '万灵药')) {
    productName = '诸神护佑药剂 (Panacea Shield)'
    tier = 'T4'
    tierTagType = 'error'
    costGil = 5500
    tacticalScore = 'EX 级逆转决战'
    mechanismTitle = '起死回生 + 绝对无敌结界'
    effectSummary = '全员阵亡复活并恢复 50% HP，附带 3 回合免疫一切物理与魔法伤害的无敌护盾！'
    mechanismDesc = '终极防灭团药剂！在绝境中瞬间将败局逆转为全员无敌状态，攻坚终极首领必备。'
  }
  // 圣水炸弹
  else if ((a === '圣水' && b === '以太') || (a === '以太' && b === '圣水')) {
    productName = '圣水炸弹 (Holy Water Bomb)'
    tier = 'T2'
    tierTagType = 'info'
    costGil = 1800
    tacticalScore = 'S 级不死系克星'
    mechanismTitle = '9999 圣神贯穿破邪'
    effectSummary = isTargetUndead.value ? '对不死系首领造成 9999 真实圣神贯穿伤害！' : '对常规魔物造成 2200 点神圣冲击'
    mechanismDesc = '若目标是不死系，直接触发圣神爆裂规则造成满额 9999 伤害，秒杀各类幽灵与僵尸恶龙。'
  }
  // 龙之吐息
  else if ((a === '龙之牙' && b === '烈火之卷') || (a === '烈火之卷' && b === '龙之牙')) {
    productName = '龙之吐息 (Dragon Breath)'
    tier = 'T2'
    tierTagType = 'info'
    costGil = 2400
    tacticalScore = 'A 级强力清场'
    mechanismTitle = '50% 真实生命比例扣减'
    effectSummary = '全体烈焰风暴，强制扣除敌方当前 50% 真实生命值！'
    mechanismDesc = '百分比削血利器，在面对高血量精英怪群时可直接将敌方血线腰斩。'
  }
  // 生命灵药
  else if ((a === '恢复药' && b === '以太') || (a === '以太' && b === '恢复药')) {
    productName = '生命灵药 (Elixir Mix)'
    tier = 'T1'
    tierTagType = 'success'
    costGil = 1600
    tacticalScore = 'S 级经济双满补给'
    mechanismTitle = '双重生命与法力充盈'
    effectSummary = '单体目标 HP 与 MP 全额瞬间回复 100%！'
    mechanismDesc = '仅用普通恢复药和以太即可配出价值万金的圣灵药效果，性价比极高。'
  }
  // 暗影死神毒雾
  else if ((a === '毒眼泪' && b === '黑暗之粉') || (a === '黑暗之粉' && b === '毒眼泪')) {
    productName = '暗影死神毒雾 (Dark Shadow Haze)'
    tier = 'T2'
    tierTagType = 'warning'
    costGil = 800
    tacticalScore = 'A 级异常控场'
    mechanismTitle = '三重诅咒施加'
    effectSummary = '敌全体施加致盲、猛毒、沉默三重不可驱散诅咒！'
    mechanismDesc = '瞬间废掉敌方物理命中与法术咏唱，制造极佳的破防输出窗口。'
  }

  return {
    productName,
    tier,
    tierTagType,
    effectSummary,
    costGil,
    tacticalScore,
    mechanismTitle,
    mechanismDesc
  }
})

// 五大商业城邦行情
const marketIndexList: Array<{ city: string; index: string; status: string; tagType: 'default' | 'info' | 'warning' | 'error' | 'success'; specialty: string; desc: string }> = [
  { city: '泰空王都', index: '1.0x (基准)', status: '平稳', tagType: 'success', specialty: '皇家宽剑、骑士盾', desc: '王国政治中心，物资储备充足，价格公平透明。' },
  { city: '图尔港口', index: '0.9x (特惠)', status: '繁荣', tagType: 'info', specialty: '海鲜肉干、生锈短剑', desc: '运河贸易枢纽，海员与渔民往来频繁，基础补给实惠。' },
  { city: '卡尔纳克', index: '1.2x (军工)', status: '高涨', tagType: 'warning', specialty: '秘银系列、火系法杖', desc: '水晶动力工业城，军备需求大，火之水晶过载后物价上扬。' },
  { city: '穆尔村', index: '1.1x (偏远)', status: '封闭', tagType: 'default', specialty: '长老药草、纯木弓', desc: '大森林深处孤立村落，外来商贩稀少，药草自给自足。' },
  { city: '蜃楼小镇', index: '2.5x (黑市)', status: '暴利', tagType: 'error', specialty: '万灵药、飞空艇零件', desc: '穿梭于次元裂隙的时空黑市，售卖全境绝版禁忌军火与配方。' }
]

// ================= 专区 2: 七色尾巴隐士洞窟兑换与太古觉醒推演沙盘 =================
interface TailAwakenTier {
  tier: number
  tierName: string
  reqTails: number
  statsBonus: string
  skillName: string
  skillDesc: string
  powerRating: number
}

interface TailDefinition {
  id: string
  tailName: string
  shortName: string
  colorBadge: string
  tagType: 'success' | 'warning' | 'info' | 'error' | 'default'
  icon: string
  relicName: string
  relicType: string
  job: string
  sourceMonster: string
  dropRateText: string
  dropRateVal: number
  inventoryCount: number
  tiers: TailAwakenTier[]
}

const tailDefinitions = ref<TailDefinition[]>([
  {
    id: 'tail_pink',
    tailName: '粉色尾巴 (Pink Tail)',
    shortName: '粉色尾巴',
    colorBadge: '极罕 1/64',
    tagType: 'error',
    icon: '🌸',
    relicName: '阿克塞尔匕首 (Axel Dagger)',
    relicType: '单手匕首',
    job: '盗贼 / 忍者 / 舞者 / 自由人 / 模仿师',
    sourceMonster: '月面地下溪谷 · 布丁公主 (Princess Flan)',
    dropRateText: '1/64 (1.56%)',
    dropRateVal: 1 / 64,
    inventoryCount: 3,
    tiers: [
      {
        tier: 1,
        tierName: '始祖契约',
        reqTails: 1,
        statsBonus: '攻击力 +90, ATB充能速率 ×1.25',
        skillName: '【时间律动】',
        skillDesc: '本人当前合法主手充能效率提升 25%，与加速 (Haste) 叠乘达到 1.875 倍极致流速。禁止副手。',
        powerRating: 3200
      },
      {
        tier: 2,
        tierName: '灵魂共鸣',
        reqTails: 2,
        statsBonus: '攻击力 +128, 暴击率 +20%, 敏捷 +10',
        skillName: '【光速破甲斩】',
        skillDesc: '普通攻击 30% 几率追加双重破甲斩，无视敌方 50% 物理防御，并施加 3 回合流速滞缓。',
        powerRating: 4600
      },
      {
        tier: 3,
        tierName: '太古超越 MAX',
        reqTails: 3,
        statsBonus: '攻击力 +165, 全异常免疫, 连击暴击系数 2.5x',
        skillName: '【时空极意】',
        skillDesc: '常驻急速状态，乱打与二刀流出招间隔缩短 40%，且每次暴击恢复自身 5% 最大生命值。',
        powerRating: 6200
      }
    ]
  },
  {
    id: 'tail_red',
    tailName: '红色尾巴 (Red Tail)',
    shortName: '红色尾巴',
    colorBadge: '稀有 1/20',
    tagType: 'error',
    icon: '🔴',
    relicName: '嗜血长枪 (Blood Lance)',
    relicType: '风属性长枪',
    job: '龙骑士 / 骑士 / 维京人 / 自由人 / 模仿师',
    sourceMonster: '月面暗黑深渊 · 炽焰赤红古龙 (Red Dragon)',
    dropRateText: '1/20 (5.00%)',
    dropRateVal: 1 / 20,
    inventoryCount: 2,
    tiers: [
      {
        tier: 1,
        tierName: '始祖契约',
        reqTails: 1,
        statsBonus: '攻击力 +101, 风属性附魔',
        skillName: '【鲜血吮吸】',
        skillDesc: '普通主武器命中或跳跃落地命中，按目标实际扣除 HP 的 100% 真实回复自身生命！禁止副手。',
        powerRating: 3350
      },
      {
        tier: 2,
        tierName: '灵魂共鸣',
        reqTails: 2,
        statsBonus: '攻击力 +138, 火/风双属性, 力量 +8',
        skillName: '【真红咆哮】',
        skillDesc: '对龙系与恶魔系魔物全增伤 40%，跳跃落地产生全屏烈焰风暴，附加 15% 灼烧真伤。',
        powerRating: 4750
      },
      {
        tier: 3,
        tierName: '太古超越 MAX',
        reqTails: 3,
        statsBonus: '攻击力 +175, 突破9999界限, 体力 +15',
        skillName: '【龙王真血结界】',
        skillDesc: '吸血溢出部分自动转化为全员生命护盾（最高可达最大生命 100%），龙骑士跳跃必爆！',
        powerRating: 6350
      }
    ]
  },
  {
    id: 'tail_gold',
    tailName: '金色尾巴 (Gold Tail)',
    shortName: '金色尾巴',
    colorBadge: '珍贵 1/25',
    tagType: 'warning',
    icon: '🟡',
    relicName: '究极之刃 (Ultima Blade)',
    relicType: '单手圣剑',
    job: '战士 / 骑士 / 魔法剑士 / 符文骑士 / 自由人 / 模仿师',
    sourceMonster: '封印次元 · 金色贝希摩斯 (Gold Behemoth)',
    dropRateText: '1/25 (4.00%)',
    dropRateVal: 1 / 25,
    inventoryCount: 1,
    tiers: [
      {
        tier: 1,
        tierName: '始祖契约',
        reqTails: 1,
        statsBonus: '攻击力 +120, 物防 +3, 精神 +3, 圣属性',
        skillName: '【光芒万丈】',
        skillDesc: '满血时触发神圣大增伤，攻击力攀升至极值；伴随圣光破邪撕裂。禁止副手。',
        powerRating: 3500
      },
      {
        tier: 2,
        tierName: '灵魂共鸣',
        reqTails: 2,
        statsBonus: '攻击力 +155, 物理防御 +8, 圣光贯穿',
        skillName: '【圣堂裁决】',
        skillDesc: '攻击附带 25% 圣光神圣核爆追加判定，必定击溃不死系与暗属性魔物绝对防线。',
        powerRating: 4900
      },
      {
        tier: 3,
        tierName: '太古超越 MAX',
        reqTails: 3,
        statsBonus: '攻击力 +192, 力量+15, 精神+15, 全耐性+50%',
        skillName: '【至高无上】',
        skillDesc: '全元素耐性+50%，物理与魔法攻击绝不落空，魔法剑乱打伤害额外叠乘 1.35 倍！',
        powerRating: 6600
      }
    ]
  },
  {
    id: 'tail_blue',
    tailName: '蓝色尾巴 (Blue Tail)',
    shortName: '蓝色尾巴',
    colorBadge: '稀有 1/20',
    tagType: 'info',
    icon: '🔵',
    relicName: '人鱼竖琴 (Mermaid Harp)',
    relicType: '穿透音波竖琴',
    job: '吟游诗人 / 游荡乐师 / 自由人 / 模仿师',
    sourceMonster: '海底金字塔 · 深海蓝雷龙 (Blue Dragon)',
    dropRateText: '1/20 (5.00%)',
    dropRateVal: 1 / 20,
    inventoryCount: 4,
    tiers: [
      {
        tier: 1,
        tierName: '始祖契约',
        reqTails: 1,
        statsBonus: '攻击力 +68, 魔法攻击 +3, 精神 +3',
        skillName: '【魅惑潮音】',
        skillDesc: '对敌方全员造成无衰减音波穿透伤害，并附带 30% 概率全体混乱控场。禁止副手。',
        powerRating: 3100
      },
      {
        tier: 2,
        tierName: '灵魂共鸣',
        reqTails: 2,
        statsBonus: '攻击力 +98, 魔法攻击 +15, 精神 +10',
        skillName: '【塞壬哀歌】',
        skillDesc: '音波穿透攻击使敌全体全元素抗性降低 30%，持续 4 回合，大幅强化我方黑魔法输出。',
        powerRating: 4400
      },
      {
        tier: 3,
        tierName: '太古超越 MAX',
        reqTails: 3,
        statsBonus: '攻击力 +130, 唱咏速度 ×1.5, 全员愈合',
        skillName: '【海神狂想曲】',
        skillDesc: '回合开始时全队自动获得每秒 10% 真实回血与魔攻大增益，并免疫全异常状态！',
        powerRating: 6050
      }
    ]
  },
  {
    id: 'tail_yellow',
    tailName: '黄色尾巴 (Yellow Tail)',
    shortName: '黄色尾巴',
    colorBadge: '稀有 1/20',
    tagType: 'warning',
    icon: '🟡',
    relicName: '火箭拳 (Rocket Punch)',
    relicType: '穿甲机械拳爪',
    job: '武僧 / 机械师 / 自由人 / 模仿师',
    sourceMonster: '沙漠深渊 · 黄岩装甲巨人 (Yellow Giant)',
    dropRateText: '1/20 (5.00%)',
    dropRateVal: 1 / 20,
    inventoryCount: 2,
    tiers: [
      {
        tier: 1,
        tierName: '始祖契约',
        reqTails: 1,
        statsBonus: '攻击力 +105, 暴击率 +30%',
        skillName: '【火箭飞冲】',
        skillDesc: '高暴击、高穿甲，无视目标 30% 基础物理护甲，造成重击击退效果。禁止副手。',
        powerRating: 3300
      },
      {
        tier: 2,
        tierName: '灵魂共鸣',
        reqTails: 2,
        statsBonus: '攻击力 +142, 暴击率 +45%, 力量 +12',
        skillName: '【高爆破甲聚能】',
        skillDesc: '暴击伤害由 1.5 倍跃升至 2.2 倍，攻击命中附带 35% 几率击晕目标 1 回合。',
        powerRating: 4700
      },
      {
        tier: 3,
        tierName: '太古超越 MAX',
        reqTails: 3,
        statsBonus: '攻击力 +180, 力量+25, 机械克星',
        skillName: '【超重核推进爆破】',
        skillDesc: '对机械系魔物（如欧米茄）必定暴击且造成 300% 绝对毁灭真实杀伤，破甲率达 100%！',
        powerRating: 6400
      }
    ]
  },
  {
    id: 'tail_green',
    tailName: '绿色尾巴 (Green Tail)',
    shortName: '绿色尾巴',
    colorBadge: '稀有 1/20',
    tagType: 'success',
    icon: '🟢',
    relicName: '彩尾自动弩 (Tail Auto Crossbow)',
    relicType: '双手机械连弩',
    job: '机械师 / 游侠猎人 / 自由人 / 模仿师',
    sourceMonster: '月之地下 · 翠绿毒刺飞龙 (Green Wyvern)',
    dropRateText: '1/20 (5.00%)',
    dropRateVal: 1 / 20,
    inventoryCount: 1,
    tiers: [
      {
        tier: 1,
        tierName: '始祖契约',
        reqTails: 1,
        statsBonus: '攻击力 +95, 双手持握, 全体贯穿',
        skillName: '【弹雨扫射】',
        skillDesc: '对敌方全体发射机械贯穿弩矢，无视前后排站位距离衰减，双手持握无法佩戴盾牌。',
        powerRating: 3250
      },
      {
        tier: 2,
        tierName: '灵魂共鸣',
        reqTails: 2,
        statsBonus: '攻击力 +132, 敏捷 +12, 暴击率 +25%',
        skillName: '【剧毒穿甲矢群】',
        skillDesc: '全体扫射附加 50% 致命神经毒素与减速，对飞行魔物额外追加 40% 贯穿真实杀伤。',
        powerRating: 4650
      },
      {
        tier: 3,
        tierName: '太古超越 MAX',
        reqTails: 3,
        statsBonus: '攻击力 +170, 敏捷+20, 射速乘二',
        skillName: '【无限机铳连发】',
        skillDesc: '射击频次翻倍，每一发弩矢独立判定暴击与吸血，对首领造成高频连环硬直破防！',
        powerRating: 6300
      }
    ]
  },
  {
    id: 'tail_gray',
    tailName: '灰色尾巴 (Gray Tail)',
    shortName: '灰色尾巴',
    colorBadge: '珍贵 1/25',
    tagType: 'default',
    icon: '⚪',
    relicName: '瓦尔哈拉圣剑 (Valhalla)',
    relicType: '骑士圣剑',
    job: '战士 / 骑士 / 圣骑士 / 自由人 / 模仿师',
    sourceMonster: '次元裂隙 · 暗影骨龙 (Shadow Shadow Dragon)',
    dropRateText: '1/25 (4.00%)',
    dropRateVal: 1 / 25,
    inventoryCount: 2,
    tiers: [
      {
        tier: 1,
        tierName: '始祖契约',
        reqTails: 1,
        statsBonus: '攻击力 +115, 物理防御 +5',
        skillName: '【双极护壁】',
        skillDesc: '圣属性与暗属性承伤各减免 50%，与既有抗性乘法叠加。禁止副手。',
        powerRating: 3400
      },
      {
        tier: 2,
        tierName: '灵魂共鸣',
        reqTails: 2,
        statsBonus: '攻击力 +148, 双防 +18, 生命 +1000',
        skillName: '【英灵王绝对结界】',
        skillDesc: '自身或队友生命低于 25% 时，自动触发 1 回合坚韧免死护盾并回复 30% 最大生命。',
        powerRating: 4850
      },
      {
        tier: 3,
        tierName: '太古超越 MAX',
        reqTails: 3,
        statsBonus: '攻击力 +186, 体力+25, 物魔双防+35',
        skillName: '【瓦尔哈拉守护】',
        skillDesc: '队伍队友受到的所有致命单体或全体轰杀，全部由持剑者无伤免疫格挡吸收！',
        powerRating: 6500
      }
    ]
  },
  {
    id: 'tail_black',
    tailName: '黑色尾巴 (Black Tail)',
    shortName: '黑色尾巴',
    colorBadge: '罕见 1/30',
    tagType: 'error',
    icon: '⚫',
    relicName: '黑之魔导圣袍 (Black Robe of Origin)',
    relicType: '魔导圣袍',
    job: '黑魔道士 / 时魔道士 / 召幻士 / 自由人 / 模仿师',
    sourceMonster: '虚空核心 · 暗黑魔道魔像 (Void Golem)',
    dropRateText: '1/30 (3.33%)',
    dropRateVal: 1 / 30,
    inventoryCount: 1,
    tiers: [
      {
        tier: 1,
        tierName: '始祖契约',
        reqTails: 1,
        statsBonus: '魔法攻击 +45, 精神 +10, 智力 +10',
        skillName: '【虚空共振】',
        skillDesc: '全黑魔法与禁忌秘术伤害提高 30%，施法消耗 MP 降低 20%。禁止副手佩戴非魔法圣器。',
        powerRating: 3300
      },
      {
        tier: 2,
        tierName: '灵魂共鸣',
        reqTails: 2,
        statsBonus: '魔法攻击 +78, 智力 +20, 咏唱加速 30%',
        skillName: '【核爆聚能裂变】',
        skillDesc: '核爆术 (Flare) 与陨石术 (Meteor) 消耗 MP 减半，且无视目标 40% 魔法抗性。',
        powerRating: 4800
      },
      {
        tier: 3,
        tierName: '太古超越 MAX',
        reqTails: 3,
        statsBonus: '魔法攻击 +118, 智力+35, 禁忌全通',
        skillName: '【太古深渊极意】',
        skillDesc: '黑魔法必定命中且可无视魔法反射 (Reflect) 强行贯穿，连续魔伤害额外叠乘 1.4 倍！',
        powerRating: 6450
      }
    ]
  }
])

const selectedTailId = ref('tail_pink')
const selectedAwakenTier = ref(1)
const claimedTailsRelics = ref<Record<string, number>>({
  tail_pink: 1
})
const lootRollNotice = ref('')
const lootRollSuccess = ref(false)
const activeCodeTab = ref<'alchemy' | 'tail'>('alchemy')

const currentTailDef = computed(() => {
  return tailDefinitions.value.find(t => t.id === selectedTailId.value) || tailDefinitions.value[0]
})

const currentTierData = computed(() => {
  return currentTailDef.value.tiers.find(t => t.tier === selectedAwakenTier.value) || currentTailDef.value.tiers[0]
})

const adjustTailCount = (id: string, delta: number) => {
  const tail = tailDefinitions.value.find(t => t.id === id)
  if (tail) {
    tail.inventoryCount = Math.max(0, tail.inventoryCount + delta)
    message.info(`${tail.shortName} 数量调整为: ${tail.inventoryCount}`)
  }
}

const fillAllTails = () => {
  tailDefinitions.value.forEach(t => {
    t.inventoryCount = 5
  })
  message.success('📦 已将全套 8 种极罕尾巴背包素材补充至 5 枚！')
}

const clearAllTails = () => {
  tailDefinitions.value.forEach(t => {
    t.inventoryCount = 0
  })
  message.warning('已清空背包中所有尾巴素材')
}

const rollDropSimulation = (id: string) => {
  const tail = tailDefinitions.value.find(t => t.id === id)
  if (!tail) return
  const roll = Math.random()
  const won = roll <= tail.dropRateVal
  lootRollSuccess.value = won
  if (won) {
    tail.inventoryCount += 1
    lootRollNotice.value = `✨ 欧皇降临！击败【${tail.sourceMonster}】成功掉落【${tail.tailName}】(Roll: ${(roll * 100).toFixed(2)}%)！`
    message.success(`🎉 极罕掉落！获得【${tail.tailName}】！`)
  } else {
    lootRollNotice.value = `💨 未掉落 (Roll: ${(roll * 100).toFixed(2)}% > 阈值 ${(tail.dropRateVal * 100).toFixed(2)}%)，再接再厉！`
    message.info(`击杀【${tail.sourceMonster}】，未发现稀有尾巴`)
  }
}

const batchRollDrop = (id: string, count: number) => {
  const tail = tailDefinitions.value.find(t => t.id === id)
  if (!tail) return
  let dropped = 0
  for (let i = 0; i < count; i++) {
    if (Math.random() <= tail.dropRateVal) {
      dropped++
    }
  }
  if (dropped > 0) {
    tail.inventoryCount += dropped
    lootRollSuccess.value = true
    lootRollNotice.value = `🎉 10连战大丰收！击败魔物成功掉落 ${dropped} 枚【${tail.tailName}】！`
    message.success(`10 连战斩获 ${dropped} 枚稀有尾巴！`)
  } else {
    lootRollSuccess.value = false
    lootRollNotice.value = `💨 10 连战魔物群溃散，未触发极罕掉落 (${tail.dropRateText})`
    message.info(`10 连战未掉落，请继续攻坚`)
  }
}

const executeTailAwakening = () => {
  const tail = currentTailDef.value
  const tier = currentTierData.value
  if (tail.inventoryCount < tier.reqTails) {
    message.error(`【${tail.tailName}】库存不足，需 ${tier.reqTails} 枚，当前仅有 ${tail.inventoryCount} 枚！`)
    return
  }
  tail.inventoryCount -= tier.reqTails
  claimedTailsRelics.value[tail.id] = tier.tier
  message.success(`🦊 隐士契约达成！【${tail.relicName}】成功觉醒至 Tier ${tier.tier} (${tier.tierName})！`)
}

const exportTailReceipt = () => {
  const lines: string[] = [
    '========================================================================',
    '       《光之战士：时空裂隙》隐士洞窟太古尾巴契约兑换与觉醒凭证 (VBLE Cert)',
    '========================================================================',
    '签发引擎: Godot 4.6 LTS / tail_exchange_system.gd',
    `安全哈希: SHA256-VBLE-TAIL-${Date.now().toString(16).toUpperCase()}`,
    `签发时间: ${new Date().toISOString()}`,
    '------------------------------------------------------------------------',
    '【玩家随身尾巴素材仓储结算】:'
  ]

  tailDefinitions.value.forEach(t => {
    lines.push(`  - ${t.tailName}: 结余 ${t.inventoryCount} 枚 (来源: ${t.sourceMonster}, 掉率: ${t.dropRateText})`)
  })

  lines.push('------------------------------------------------------------------------')
  lines.push('【已唤醒太古神兵契约大典】:')
  tailDefinitions.value.forEach(t => {
    const tierNum = claimedTailsRelics.value[t.id]
    if (tierNum) {
      const tierInfo = t.tiers.find(item => item.tier === tierNum) || t.tiers[0]
      lines.push(`  ★ [Tier ${tierNum} ${tierInfo.tierName}] ${t.relicName} (${t.relicType})`)
      lines.push(`    - 适配职业: ${t.job}`)
      lines.push(`    - 最终面板: ${tierInfo.statsBonus}`)
      lines.push(`    - 专属神技: ${tierInfo.skillName} ${tierInfo.skillDesc}`)
      lines.push(`    - 战力指数: ${tierInfo.powerRating}`)
    }
  })

  lines.push('========================================================================')
  lines.push('太古隐士箴言: 契约既成，灵魂共鸣。持此神兵，诸魔退散！')

  const report = lines.join('\n')

  try {
    navigator.clipboard.writeText(report)
    message.success('已复制《隐士洞窟太古尾巴契约兑换凭证》至剪贴板！')
  } catch {
    // ignore
  }

  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `hermit_tail_contract_v2.2.245_${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

// Godot 核心代码
const godotCodeText = `## alchemist_mix_system.gd
## 《光之战士：时空裂隙》药剂师调合质变算法与经济结算引擎
extends Node
class_name AlchemistMixSystem

signal mix_crafted(item_a: String, item_b: String, result_product: String, effect: Dictionary)

const RECIPE_TABLE = {
	"巨人之血+圣水": { "name": "巨人之药", "effect": "MAX_HP_DOUBLED_200" },
	"万灵药+凤凰尾羽": { "name": "诸神护佑药剂", "effect": "REVIVE_ALL_IMMUNE_3_TURNS" },
	"圣水+以太": { "name": "圣水炸弹", "effect": "HOLY_9999_UNDEAD_PIERCE" },
	"恢复药+以太": { "name": "生命灵药", "effect": "FULL_RESTORE_HP_MP" }
}

func craft_mix(item_a: String, item_b: String, has_pharmacology: bool) -> Dictionary:
	var key1 = item_a + "+" + item_b
	var key2 = item_b + "+" + item_a
	var recipe = RECIPE_TABLE.get(key1, RECIPE_TABLE.get(key2, null))
	
	if recipe == null:
		return { "success": false, "product": "劣质调合试剂", "tier": "T1" }
	
	var multiplier = 2.0 if has_pharmacology else 1.0
	emit_signal("mix_crafted", item_a, item_b, recipe.name, recipe)
	return { "success": true, "product": recipe.name, "effect": recipe.effect, "mult": multiplier }
`

const godotTailCodeText = [
  '## tail_exchange_system.gd',
  '## 《光之战士：时空裂隙》隐士洞窟七色尾巴极罕掉落与太古神兵觉醒引擎',
  '## 官方引擎规范: VBLE Economy Matrix v2.2.245',
  'extends Node',
  'class_name TailExchangeSystem',
  '',
  'signal tail_exchanged(tail_id: String, tier: int, relic_name: String)',
  'signal drop_rolled(monster: String, won: bool, tail_name: String)',
  '',
  'const DROP_TABLE = {',
  '	"tail_pink": { "rate": 1.0 / 64.0, "monster": "Princess Flan", "relic": "Axel Dagger" },',
  '	"tail_red": { "rate": 1.0 / 20.0, "monster": "Red Dragon", "relic": "Blood Lance" },',
  '	"tail_gold": { "rate": 1.0 / 25.0, "monster": "Gold Behemoth", "relic": "Ultima Blade" },',
  '	"tail_blue": { "rate": 1.0 / 20.0, "monster": "Blue Dragon", "relic": "Mermaid Harp" },',
  '	"tail_yellow": { "rate": 1.0 / 20.0, "monster": "Yellow Giant", "relic": "Rocket Punch" },',
  '	"tail_green": { "rate": 1.0 / 20.0, "monster": "Green Wyvern", "relic": "Tail Auto Crossbow" },',
  '	"tail_gray": { "rate": 1.0 / 25.0, "monster": "Shadow Shadow Dragon", "relic": "Valhalla" },',
  '	"tail_black": { "rate": 1.0 / 30.0, "monster": "Void Golem", "relic": "Black Robe of Origin" }',
  '}',
  '',
  'var player_stash: Dictionary = {',
  '	"tail_pink": 3, "tail_red": 2, "tail_gold": 1, "tail_blue": 4,',
  '	"tail_yellow": 2, "tail_green": 1, "tail_gray": 2, "tail_black": 1',
  '}',
  '',
  'var awakened_relics: Dictionary = {',
  '	"tail_pink": 1',
  '}',
  '',
  'func roll_monster_drop(tail_id: String) -> bool:',
  '	if not DROP_TABLE.has(tail_id):',
  '		return false',
  '	var entry = DROP_TABLE[tail_id]',
  '	var rng_val = randf()',
  '	var won = rng_val <= entry.rate',
  '	if won:',
  '		player_stash[tail_id] = player_stash.get(tail_id, 0) + 1',
  '	emit_signal("drop_rolled", entry.monster, won, tail_id)',
  '	return won',
  '',
  'func awaken_relic(tail_id: String, target_tier: int) -> Dictionary:',
  '	var req_cost = target_tier',
  '	var current_tails = player_stash.get(tail_id, 0)',
  '	if current_tails < req_cost:',
  '		return { "success": false, "reason": "Insufficient tails in inventory" }',
  '	',
  '	player_stash[tail_id] -= req_cost',
  '	awakened_relics[tail_id] = target_tier',
  '	var relic_name = DROP_TABLE[tail_id].relic',
  '	emit_signal("tail_exchanged", tail_id, target_tier, relic_name)',
  '	return { "success": true, "tail_id": tail_id, "tier": target_tier, "relic": relic_name }'
].join('\n')

const copyGodotCode = async () => {
  try {
    const code = activeCodeTab.value === 'alchemy' ? godotCodeText : godotTailCodeText
    await navigator.clipboard.writeText(code)
    copiedCode.value = true
    const filename = activeCodeTab.value === 'alchemy' ? 'alchemist_mix_system.gd' : 'tail_exchange_system.gd'
    message.success(`已复制 ${filename} 核心实机代码！`)
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}

// ================= 专区 4: 蜃楼黑市秘密拍卖行与金币投掷系统 =================
interface AuctionLot {
  id: string
  name: string
  icon: string
  rarity: string
  startPrice: number
  description: string
}

const auctionLots: AuctionLot[] = [
  { id: 'lot_onion_helm', name: '洋葱头盔 (Onion Helm)', icon: '🧅', rarity: 'EX 绝版神器', startPrice: 50000, description: '洋葱剑士传说防具，全六维属性各提升 +5 点，常驻免疫石化与即死。' },
  { id: 'lot_excalibur_scroll', name: '王者之剑 Excalibur 圣典', icon: '📜', rarity: 'SSR 神器图纸', startPrice: 80000, description: '太古十二神兵之一锻造图录，攻击力 110，附带神圣圣光属性。' },
  { id: 'lot_airship_blueprint', name: '星际飞空艇反引力龙骨图', icon: '🛸', rarity: 'UR 宇宙改型', startPrice: 120000, description: '希德太古亲笔手稿，改造后飞空艇可冲破卡门线飞向红月。' },
  { id: 'lot_adamantite', name: '精金黑铁原矿 (Adamantite)', icon: '💎', rarity: 'SSR 传奇矿石', startPrice: 40000, description: '打造至高防具与斩铁剑开刃必须的太古陨石核心精矿。' }
]

const playerGil = ref(250000)
const selectedAuctionId = ref('lot_onion_helm')
const currentBidPrice = ref(50000)
const isAuctionWon = ref(false)
const auctionNotice = ref('')

const currentLot = computed(() => {
  return auctionLots.find(l => l.id === selectedAuctionId.value) || auctionLots[0]
})

const resetAuctionLot = () => {
  currentBidPrice.value = currentLot.value.startPrice
  isAuctionWon.value = false
  auctionNotice.value = ''
}

const bidAuction = (delta: number) => {
  if (playerGil.value < currentBidPrice.value + delta) {
    message.error('随身金币不足，无法继续加价！')
    return
  }

  currentBidPrice.value += delta
  auctionNotice.value = `🔨 您出价 ${currentBidPrice.value.toLocaleString()} Gil！拍卖官落槌中...`

  // 模拟 NPC 竞标或一锤定音
  setTimeout(() => {
    if (Math.random() > 0.45) {
      const npcDelta = 1000
      currentBidPrice.value += npcDelta
      auctionNotice.value = `⚠️ 蜃楼贵族反超加价至 ${currentBidPrice.value.toLocaleString()} Gil！`
    } else {
      isAuctionWon.value = true
      playerGil.value -= currentBidPrice.value
      auctionNotice.value = `🎉 成交！恭喜光之战士以 ${currentBidPrice.value.toLocaleString()} Gil 拍得【${currentLot.value.name}】！`
      message.success(`成功竞得【${currentLot.value.name}】！已收入随身背包。`)
    }
  }, 1200)
}

// 金币投掷 (Zeninage) 计算
const samuraiLevel = ref(45)
const zeninageGil = ref(10000)
const targetCount = ref(1)

const calculatedZeninageDamage = computed(() => {
  const basePower = (samuraiLevel.value + 10) * (zeninageGil.value / 100) * 1.5
  return Math.round(basePower / targetCount.value)
})

const zeninageEfficiency = computed(() => {
  const eff = ((samuraiLevel.value + 10) * 1.5).toFixed(1)
  return `${eff}`
})
</script>

<style scoped>
.text-glow-amber {
  text-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
</style>
