<template>
  <div class="economy-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-yellow-950/80 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              VBLE Global Economy Equilibrium, Merchant Guild Trade & Inflation Studio v2.2.326
            </span>
            <span class="text-xs text-gray-400">宏观经济、尾巴奇迹、质变药剂与跨次元黑市拍卖行</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>⚗️</span> 跨界时空黑市汇率平抑、吉尔金币熔断与太古拍卖行工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            从全境五阶商业城邦贸易物价指数，到隐士洞窟的七色尾巴神器传承兑换、药剂师两两调合的质变炼金体系，乃至穿梭次元裂隙的黑市多币种竞拍行。全息实装多模态动态模拟沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToGlobalEquilibriumStudio"
          >
            <template #icon><span>⚖️</span></template>
            全域经济平抑工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToPrimalAuctionStudio"
          >
            <template #icon><span>🪙</span></template>
            太古拍卖与金币熔断工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToAetherFinanceStudio"
          >
            <template #icon><span>📈</span></template>
            前往以太金融工坊
          </n-button>
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToAuctionStudio"
          >
            <template #icon><span>🏛️</span></template>
            前往跨次元拍卖行
          </n-button>
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
          <router-link to="/vble/docs/05_EQUIPMENT_ECONOMY">
            <n-button size="medium" round secondary type="warning" class="shadow-md">
              <template #icon><span>📖</span></template>
              神兵与宏观经济 (VOL.05)
            </n-button>
          </router-link>
          <router-link to="/vble/docs/16_TAIL_EXCHANGE">
            <n-button size="medium" round secondary type="warning" class="shadow-md">
              <template #icon><span>🦊</span></template>
              七色尾巴兑换白皮书 (VOL.16)
            </n-button>
          </router-link>
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

    <!-- 专区 5: 全域黑市跨次元秘宝拍卖行与动态通胀汇率推演工坊 (Spacetime Black Market & Inflation Studio) -->
    <div id="spacetime-auction-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1d1208] via-[#14121e] to-[#0c0d16] border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.22)] space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-amber-900/50 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              SPACETIME AUCTION & INFLATION STUDIO
            </span>
            <span class="text-xs text-gray-400 font-mono">v2.2.261 官方实机矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <span>🏛️</span> 全域黑市跨次元秘宝拍卖行与动态通胀汇率推演工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            穿梭于次元裂隙的黑市神秘会所：实时模拟 4 大极罕拍品动态竞价落槌、4 位个性 NPC 豪客实时举牌、多币种动态通胀汇率联动折算与 SHA-256 交易凭证一键导出。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetAuctionStudio">
            🔄 重置拍卖行与金库
          </n-button>
          <n-button size="small" secondary type="info" @click="depositPlayerFunds">
            💰 补充金库 +100,000G
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportAuctionCertificate">
            📜 导出拍卖行结算凭证
          </n-button>
        </div>
      </div>

      <!-- 三栏主推演工作台 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 跨次元极罕拍品标的与实时竞标台 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🔨</span>
                <span>跨次元极罕拍品标的</span>
              </span>
              <n-tag size="tiny" :type="currentMarketLot.tagType">{{ currentMarketLot.rarity }}</n-tag>
            </div>

            <!-- 拍品切换 -->
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="lot in marketLotsList"
                :key="lot.id"
                type="button"
                class="p-2 rounded-lg border text-left transition-all cursor-pointer"
                :class="selectedMarketLotId === lot.id
                  ? 'bg-amber-950/60 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-700'"
                @click="selectMarketLot(lot.id)"
              >
                <div class="text-xs font-bold truncate flex items-center gap-1">
                  <span>{{ lot.icon }}</span>
                  <span>{{ lot.shortName }}</span>
                </div>
                <div class="text-[10px] text-gray-400 font-mono mt-0.5">起拍 {{ lot.startPrice.toLocaleString() }}G</div>
              </button>
            </div>

            <!-- 当前拍品详情视窗 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-sm font-black text-white flex items-center gap-1.5">
                  <span>{{ currentMarketLot.icon }}</span>
                  <span>{{ currentMarketLot.name }}</span>
                </span>
                <span class="text-[10px] text-amber-400 font-mono font-bold">{{ currentMarketLot.category }}</span>
              </div>
              <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentMarketLot.description }}</p>
              <div class="p-2 rounded bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-200">
                ✨ <strong>专属特效:</strong> {{ currentMarketLot.effect }}
              </div>
            </div>

            <!-- 竞标态势看板与法槌阶段 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">当前最高出价:</span>
                <span class="font-mono text-base font-black text-amber-300">{{ marketHighestBid.toLocaleString() }} Gil</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">目前领标者:</span>
                <span class="font-bold" :class="marketLeadingBidder.isPlayer ? 'text-emerald-400' : 'text-cyan-400'">
                  {{ marketLeadingBidder.name }}
                </span>
              </div>
              <div class="flex justify-between items-center pt-1 border-t border-slate-800">
                <span class="text-gray-400">拍卖法槌状态:</span>
                <span
                  class="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  :class="gavelPhaseBadgeClass"
                >
                  {{ gavelPhaseText }}
                </span>
              </div>
            </div>
          </div>

          <!-- 加价操作区与敲击法槌 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <div class="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                class="py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold border border-slate-700 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="isMarketLotSold || playerVault.gil < 5000"
                @click="placePlayerBid(5000)"
              >
                +5,000G
              </button>
              <button
                type="button"
                class="py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="isMarketLotSold || playerVault.gil < 20000"
                @click="placePlayerBid(20000)"
              >
                +20,000G
              </button>
              <button
                type="button"
                class="py-1.5 rounded bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="isMarketLotSold || playerVault.gil < 50000"
                @click="placePlayerBid(50000)"
              >
                +50,000G
              </button>
            </div>

            <div class="flex gap-2">
              <button
                type="button"
                class="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs transition-all cursor-pointer disabled:opacity-40"
                :disabled="isMarketLotSold"
                @click="stepAuctionGavel"
              >
                🔨 敲击法槌 (推进落槌)
              </button>
              <button
                type="button"
                class="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition-all cursor-pointer"
                @click="triggerNpcRandomBid"
              >
                🤖 NPC 举牌
              </button>
            </div>

            <!-- 竞标事件流动实时记录 -->
            <div class="p-2 rounded bg-slate-950/80 border border-slate-800 text-[10px] space-y-1 max-h-24 overflow-y-auto">
              <div v-for="(log, idx) in auctionLogs" :key="idx" class="text-gray-300 flex items-start gap-1">
                <span class="text-amber-400 shrink-0">•</span>
                <span>{{ log }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 2: 跨维度四币种动态通胀与外汇汇率矩阵 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span>📈</span>
              <span>全域通胀指数与跨界外汇矩阵</span>
            </span>
            <n-tag size="tiny" type="warning">{{ inflationStatusText }}</n-tag>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>次元裂隙通胀波动指数 (Inflation Multiplier):</span>
                <span class="font-mono text-amber-400 font-bold text-sm">{{ inflationFactor.toFixed(2) }}x</span>
              </div>
              <n-slider v-model:value="inflationFactor" :min="0.5" :max="3.0" :step="0.05" />
            </div>

            <!-- 汇率一览表 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div class="text-[11px] font-bold text-gray-400 flex justify-between">
                <span>货币种类</span>
                <span>当前折算金币 (Gil)</span>
              </div>
              <div class="space-y-1.5 font-mono text-[11px]">
                <div class="flex justify-between items-center text-amber-300">
                  <span>🪙 金币 (Gil)</span>
                  <span>1.00 G (法定基准)</span>
                </div>
                <div class="flex justify-between items-center text-emerald-400">
                  <span>💠 职业点代币 (ABP)</span>
                  <span>{{ Math.round(120 * inflationFactor).toLocaleString() }} G / 1 ABP</span>
                </div>
                <div class="flex justify-between items-center text-cyan-400">
                  <span>⭐ 星之碎片 (Star Shard)</span>
                  <span>{{ Math.round(2500 * inflationFactor).toLocaleString() }} G / 1 碎片</span>
                </div>
                <div class="flex justify-between items-center text-purple-400">
                  <span>🔮 虚空以太晶 (Void Crystal)</span>
                  <span>{{ Math.round(50000 * inflationFactor).toLocaleString() }} G / 1 晶石</span>
                </div>
              </div>
            </div>

            <!-- 跨币种兑换兑入计算器 -->
            <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-2.5">
              <div class="font-bold text-gray-300 flex items-center justify-between">
                <span>💱 跨维度外汇速兑机 (Guild FX Swap)</span>
                <span class="text-[10px] text-gray-500 font-mono">商会手续费 2%</span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="text-[10px] text-gray-400 block mb-0.5">从源货币支出:</label>
                  <select
                    v-model="swapSourceCurrency"
                    class="w-full bg-slate-900 border border-slate-700 text-xs text-gray-200 rounded p-1.5 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="gil">🪙 金币 (Gil)</option>
                    <option value="abp">💠 职业点 (ABP)</option>
                    <option value="shard">⭐ 星之碎片</option>
                    <option value="crystal">🔮 虚空晶石</option>
                  </select>
                </div>
                <div>
                  <label class="text-[10px] text-gray-400 block mb-0.5">兑入目标资产:</label>
                  <select
                    v-model="swapTargetCurrency"
                    class="w-full bg-slate-900 border border-slate-700 text-xs text-gray-200 rounded p-1.5 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="gil">🪙 金币 (Gil)</option>
                    <option value="abp">💠 职业点 (ABP)</option>
                    <option value="shard">⭐ 星之碎片</option>
                    <option value="crystal">🔮 虚空晶石</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="text-[10px] text-gray-400 block mb-0.5">兑换数量:</label>
                <input
                  v-model.number="swapAmount"
                  type="number"
                  min="1"
                  class="w-full bg-slate-900 border border-slate-700 text-xs text-amber-300 font-mono rounded p-1.5 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div class="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                <span class="text-gray-400">预计净获得:</span>
                <span class="font-mono font-bold text-emerald-400">
                  {{ calculatedSwapResult.netYield.toLocaleString() }} {{ calculatedSwapResult.targetUnit }}
                </span>
              </div>

              <button
                type="button"
                class="w-full py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all cursor-pointer shadow"
                @click="executeCurrencySwap"
              >
                💱 确认兑换并注入金库
              </button>
            </div>
          </div>
        </div>

        <!-- 栏 3: 光之战士随身金库资产与竞拍获胜总览 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🏦</span>
                <span>光之战士随身裂隙金库</span>
              </span>
              <n-tag size="tiny" type="success">{{ guildReputationTitle }}</n-tag>
            </div>

            <!-- 金库总资产折算卡片 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div class="text-[11px] text-gray-400">金库总净资产 (Total Net Worth in Gil)</div>
              <div class="text-2xl sm:text-3xl font-black font-mono mt-1 text-amber-400">
                {{ totalNetWorthGil.toLocaleString() }} <span class="text-xs text-amber-300">G</span>
              </div>
              <div class="text-[10px] text-gray-400 mt-0.5">
                实时联运四种跨界通货加权解算
              </div>
            </div>

            <!-- 各币种库存明细 -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-2 rounded bg-slate-950/80 border border-slate-800">
                <div class="text-gray-400 text-[10px]">🪙 随身金币</div>
                <div class="font-mono font-bold text-amber-300 mt-0.5">{{ playerVault.gil.toLocaleString() }} G</div>
              </div>
              <div class="p-2 rounded bg-slate-950/80 border border-slate-800">
                <div class="text-gray-400 text-[10px]">💠 职业点代币</div>
                <div class="font-mono font-bold text-emerald-400 mt-0.5">{{ playerVault.abp.toLocaleString() }} ABP</div>
              </div>
              <div class="p-2 rounded bg-slate-950/80 border border-slate-800">
                <div class="text-gray-400 text-[10px]">⭐ 星之碎片</div>
                <div class="font-mono font-bold text-cyan-400 mt-0.5">{{ playerVault.shard.toLocaleString() }} 枚</div>
              </div>
              <div class="p-2 rounded bg-slate-950/80 border border-slate-800">
                <div class="text-gray-400 text-[10px]">🔮 虚空以太晶</div>
                <div class="font-mono font-bold text-purple-400 mt-0.5">{{ playerVault.crystal.toLocaleString() }} 晶</div>
              </div>
            </div>

            <!-- 已拍得秘宝珍藏架 -->
            <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-amber-300 flex justify-between items-center">
                <span>🏆 已拍得跨次元秘宝</span>
                <span class="font-mono text-cyan-400">{{ wonLotsList.length }} / 4 件</span>
              </div>
              <div v-if="wonLotsList.length === 0" class="text-[11px] text-gray-500 text-center py-2">
                暂未竞得拍品，点击左侧加价并落槌成交！
              </div>
              <div v-else class="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                <div
                  v-for="item in wonLotsList"
                  :key="item.id"
                  class="p-1.5 rounded bg-slate-900 border border-slate-800 text-[11px] flex justify-between items-center"
                >
                  <span class="text-white font-bold">{{ item.icon }} {{ item.name }}</span>
                  <span class="text-amber-400 font-mono font-bold">{{ item.finalPrice.toLocaleString() }}G</span>
                </div>
              </div>
            </div>
          </div>

          <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
            黑市商会秘传：跨界外汇市场受时空裂隙干扰剧烈波动，当通胀率高于 2.0x 时将星之碎片与虚空晶石兑出为 Gil 乃无上暴利之法！
          </div>
        </div>
      </div>
    </div>

    <!-- 全域以太金融汇率、跨界黑市期货结算与反通胀对冲工坊 (v2.2.285) -->
    <div id="aether-finance-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c0f24] via-[#121324] to-[#0a0d1a] border border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.22)] space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-rose-900/50 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              AETHER MACRO-FINANCE & FUTURES STUDIO
            </span>
            <span class="text-xs text-rose-400 font-mono">v2.2.285 官方实机金融矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <span>📈</span> 全域以太金融汇率、跨界黑市期货结算与反通胀对冲工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            面向 Godot 4.6 LTS 全域宏观金融体系：实时推演以太金本位刚性兑付、跨界黑市多维期货掉期合约、恒定乘积 AMM 做市池与反通胀对冲避险基金。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" secondary type="error" @click="resetAetherFinanceParams">
            🔄 重置金融参数
          </n-button>
          <n-button size="small" secondary type="warning" @click="injectLiquidityBonus">
            💧 注入做市流动性 +500,000G
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportAetherFinanceCertificate">
            📜 导出以太金融方案书
          </n-button>
        </div>
      </div>

      <!-- 四大金融机制选择器 -->
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>⚖️</span>
            <span>四大以太金融衍生模式 (Aether Financial Instruments)</span>
          </span>
          <span class="text-[11px] text-gray-400">选择当前运作的宏观金融工具</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="inst in financialInstrumentsList"
            :key="inst.id"
            class="p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedInstrumentId === inst.id ? `${inst.color} ring-2 ring-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]` : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'"
            @click="selectedInstrumentId = inst.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ inst.icon }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-gray-300">
                {{ inst.rateFeature }}
              </span>
            </div>
            <div class="font-bold text-sm text-white mb-1">{{ inst.name }}</div>
            <p class="text-xs text-gray-400 leading-snug">{{ inst.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 参数调节与遥测仪表盘 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧参数调节 -->
        <div class="lg:col-span-7 p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <span class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>🎛️</span>
              <span>宏观金融调控参数</span>
            </span>
            <n-tag type="error" size="tiny" round>实机连续微调</n-tag>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>以太金/基准金币基础汇率 (Aether Baseline Rate)</span>
                <span class="font-mono font-bold text-rose-400">{{ aetherExchangeRate.toLocaleString() }} Gil/Ether</span>
              </div>
              <n-slider v-model:value="aetherExchangeRate" :min="100" :max="5000" :step="50" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>100 Gil (初级以太)</span>
                <span>1,250 Gil (标准锚定)</span>
                <span>5,000 Gil (奇点通胀)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>全域宏观物价通胀指数 (Inflation Factor)</span>
                <span class="font-mono font-bold text-amber-400">{{ inflationIndex.toFixed(2) }}x</span>
              </div>
              <n-slider v-model:value="inflationIndex" :min="0.5" :max="4.0" :step="0.05" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>0.50x (通货紧缩)</span>
                <span>1.35x (温和增长)</span>
                <span>4.00x (恶性超级通胀)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>跨界期货多空杠杆倍数 (Futures Leverage)</span>
                <span class="font-mono font-bold text-cyan-400">{{ leverageMultiplier.toFixed(1) }}x</span>
              </div>
              <n-slider v-model:value="leverageMultiplier" :min="1.0" :max="10.0" :step="0.5" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>1.0x (现货对冲)</span>
                <span>3.5x (标准机构)</span>
                <span>10.0x (穿仓极限)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>以太做市流动性池总深度 (Liquidity Pool Depth)</span>
                <span class="font-mono font-bold text-purple-400">{{ (liquidityPoolDepth / 1000).toFixed(0) }}k Gil</span>
              </div>
              <n-slider v-model:value="liquidityPoolDepth" :min="100000" :max="5000000" :step="50000" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>100k Gil (浅水池)</span>
                <span>1,200k Gil (标准深度)</span>
                <span>5,000k Gil (超深巨鲸池)</span>
              </div>
            </div>
          </div>

          <!-- 3 个金融安全与调控机制开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚡</span> 波动率单日熔断保护阀 (Market Circuit Breaker)
                </div>
                <div class="text-[10px] text-gray-400">单日汇率波动超 20% 时强制平抑价差并冻结高杠杆穿仓清算</div>
              </div>
              <n-switch v-model:value="circuitBreakerActive" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🛡️</span> 负利率储蓄抗性结界 (Negative Interest Ward)
                </div>
                <div class="text-[10px] text-gray-400">杜绝滞胀环境下以太储蓄本金缩水，提供保底 +2.5% 年化收益支持</div>
              </div>
              <n-switch v-model:value="negativeInterestWard" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🔄</span> 跨界套利关税全额返还 (Arbitrage Tax Rebate)
                </div>
                <div class="text-[10px] text-gray-400">为跨次元做市商返还 70% 交易摩擦税，期货预期年化收益增幅 +25%</div>
              </div>
              <n-switch v-model:value="arbitrageTaxRebate" />
            </div>
          </div>
        </div>

        <!-- 右侧金融遥测与操作卡片 -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div class="p-5 rounded-xl bg-gradient-to-br from-slate-900/90 to-rose-950/40 border border-rose-500/30 space-y-4">
            <div class="flex items-center justify-between border-b border-rose-500/20 pb-2">
              <span class="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center gap-1.5">
                <span>📊</span> 实时金融精算遥测 (Actuarial Telemetry)
              </span>
              <span class="text-[10px] font-mono text-emerald-400 animate-pulse">● 金融信道连通</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-slate-950/80 border border-rose-500/20">
                <div class="text-[10px] text-gray-400">以太综合公允净值</div>
                <div class="text-lg font-black text-rose-400 font-mono mt-1">
                  {{ calculatedAetherNetValue.toLocaleString() }} <span class="text-xs font-normal">Gil</span>
                </div>
                <div class="text-[9px] text-rose-500/80 mt-0.5">通胀调和结算公允估价</div>
              </div>

              <div class="p-3 rounded-lg bg-slate-950/80 border border-amber-500/20">
                <div class="text-[10px] text-gray-400">期货预期年化收益</div>
                <div class="text-lg font-black text-amber-400 font-mono mt-1">
                  {{ calculatedFuturesExpectedYield.toLocaleString() }} <span class="text-xs font-normal">Gil</span>
                </div>
                <div class="text-[9px] text-amber-500/80 mt-0.5">跨次元掉期合约套利</div>
              </div>

              <div class="p-3 rounded-lg bg-slate-950/80 border border-cyan-500/20">
                <div class="text-[10px] text-gray-400">反通胀避险对冲效率</div>
                <div class="text-lg font-black text-cyan-400 font-mono mt-1">
                  {{ calculatedHedgeEfficiency }}
                </div>
                <div class="text-[9px] text-cyan-500/80 mt-0.5">流动性池抗通胀韧性</div>
              </div>

              <div class="p-3 rounded-lg bg-slate-950/80 border border-purple-500/20">
                <div class="text-[10px] text-gray-400">衍生品风险溢价利差</div>
                <div class="text-lg font-black text-purple-400 font-mono mt-1">
                  {{ calculatedRiskSpread }}
                </div>
                <div class="text-[9px] text-purple-500/80 mt-0.5">杠杆平仓风险偏好度</div>
              </div>
            </div>

            <!-- 当前金融模式摘要 -->
            <div class="p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-xs space-y-1">
              <div class="flex items-center justify-between text-gray-400">
                <span>运行模式:</span>
                <span class="font-bold text-white">{{ currentFinancialInstrument?.name }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>机制特质:</span>
                <span class="font-mono text-rose-300">{{ currentFinancialInstrument?.rateFeature }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>熔断机制:</span>
                <span class="font-mono" :class="circuitBreakerActive ? 'text-emerald-400' : 'text-gray-500'">
                  {{ circuitBreakerActive ? '有效部署 (阈值 20%)' : '未启用' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>对冲结界:</span>
                <span class="font-mono" :class="negativeInterestWard ? 'text-cyan-400' : 'text-gray-500'">
                  {{ negativeInterestWard ? '保底 +2.5% 年化' : '已旁路' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 模拟与导出按钮 -->
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              @click="runAetherFinanceSimulation"
              :disabled="isFinanceSimulating"
            >
              <span>{{ isFinanceSimulating ? '⏳' : '🚀' }}</span>
              {{ isFinanceSimulating ? '跨界金融推演中...' : '启动五阶段以太金融对冲推演' }}
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
              @click="exportAetherFinanceCertificate"
            >
              <span>📄</span> 导出凭证
            </button>
          </div>
        </div>
      </div>

      <!-- 五阶段金融对冲推演终端 -->
      <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-base">💻</span>
            <h3 class="text-xs font-bold text-white font-mono uppercase">以太金融结算控制台 (Aether Futures Settlement Console)</h3>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="isFinanceSimulating" class="text-xs text-rose-400 animate-pulse font-mono">
              STAGE {{ financeSimStage }}/5 推演中
            </span>
            <span v-else-if="financeSimFinished" class="text-xs text-emerald-400 font-mono">
              ✓ 金融对冲就绪
            </span>
            <button
              type="button"
              class="text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 cursor-pointer"
              @click="financeTerminalLogs = []"
            >
              清屏
            </button>
          </div>
        </div>

        <div class="h-40 p-3 rounded-lg bg-black/90 border border-slate-900 font-mono text-xs overflow-y-auto space-y-1 text-gray-300">
          <div v-if="financeTerminalLogs.length === 0" class="text-gray-600 italic">
            [终端待命中] 点击“启动五阶段以太金融对冲推演”以解算汇率套利、期货穿仓边界与反通胀对冲效率...
          </div>
          <div v-for="(log, idx) in financeTerminalLogs" :key="idx" class="leading-relaxed">
            <span class="text-gray-500">[{{ log.time }}]</span>
            <span :class="log.color"> {{ log.message }}</span>
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
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'auction' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'auction'"
            >
              black_market_auction_engine.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'finance' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'finance'"
            >
              aether_macro_finance_engine.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'futures' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'futures'"
            >
              spacetime_futures_settlement.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'amm' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'amm'"
            >
              anti_inflation_liquidity_amm.gd
            </button>
          </div>
        </div>
        <n-button size="tiny" secondary type="warning" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-96">{{ currentGodotCodeText }}</pre>
    </div>

    <!-- ⚗️ 工坊 4: 跨界时空黑市汇率平抑、吉尔金币熔断与太古拍卖行工坊 (Cross-Realm Exchange, Gil Circuit Breaker & Primal Auction Studio v2.2.308) -->
    <div
      id="primal-auction-studio"
      class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/80 via-slate-900/90 to-yellow-950/80 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.22)] space-y-6 relative overflow-hidden"
    >
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -left-20 -bottom-20 w-72 h-72 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 头部与操作区 -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/60 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5 flex-wrap">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-black font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
              PRIMAL AUCTION &amp; CIRCUIT BREAKER v2.2.308
            </span>
            <span class="text-xs text-amber-300/80 font-mono">跨界黑市汇率平抑与太古暗标拍卖行</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-wide">
            <span>⚗️</span> 跨界时空黑市汇率平抑、吉尔金币熔断与太古拍卖行工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            基于 Godot 4.6 LTS 实时仿真：驱动五大商业城邦宏观金价对冲、恶性通胀 20% 自动熔断断路器、太古圣遗物暗标竞拍与 999999999 亿级金币解限。
          </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap self-start md:self-auto">
          <n-button
            type="info"
            size="small"
            round
            secondary
            @click="resetPrimalAuctionParameters"
          >
            重置参数
          </n-button>
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingPrimalAuction"
            @click="runPrimalAuctionSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动经济推演
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportPrimalAuctionCertificate"
          >
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大跨界经济流派原型 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        <div
          v-for="archetype in primalEconomyArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left"
          :class="selectedPrimalEconomyArchetypeId === archetype.id
            ? 'bg-amber-950/50 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-amber-600/50'"
          @click="selectedPrimalEconomyArchetypeId = archetype.id"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ archetype.icon }}</span>
            <n-tag size="tiny" :type="archetype.tagType" round>{{ archetype.tag }}</n-tag>
          </div>
          <div class="font-bold text-sm text-gray-100">{{ archetype.name }}</div>
          <div class="text-[11px] text-amber-300/80 font-mono mt-0.5">{{ archetype.market }}</div>
          <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{{ archetype.desc }}</p>
          <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>成交流水: {{ (archetype.baseTurnover / 10000).toFixed(0) }}万G</span>
            <span class="text-yellow-400">收益率: +{{ archetype.yieldPct }}%</span>
          </div>
        </div>
      </div>

      <!-- 核心调控滑块与高能开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        <!-- 左侧参数微调面板 -->
        <div class="lg:col-span-7 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <span>⚙️</span> 汇率对冲与金币熔断参数连续微调
            </span>
            <span class="text-[11px] font-mono text-amber-400">Continuous Macro Finance Dynamics</span>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">跨界时空汇率对冲比率 (Exchange Hedging Ratio):</span>
                <span class="font-mono text-amber-400 font-bold">{{ exchangeHedgingRatio.toFixed(1) }}x</span>
              </div>
              <n-slider v-model:value="exchangeHedgingRatio" :min="1.0" :max="5.0" :step="0.1" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>标准平价 (1.0x)</span>
                <span>深度对冲 (2.8x)</span>
                <span>太古极差套利 (5.0x)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">吉尔金币熔断触发波动率 (Circuit Breaker Volatility):</span>
                <span class="font-mono text-red-400 font-bold">±{{ gilCircuitBreakerVolatility }}%</span>
              </div>
              <n-slider v-model:value="gilCircuitBreakerVolatility" :min="5" :max="50" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>超敏预警 (5%)</span>
                <span>标准熔断 (20%)</span>
                <span>高宽容度 (50%)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">太古暗标竞拍加价杠杆 (Auction Bid Leverage):</span>
                <span class="font-mono text-yellow-400 font-bold">{{ auctionBidLeverage.toFixed(1) }}x</span>
              </div>
              <n-slider v-model:value="auctionBidLeverage" :min="1.0" :max="10.0" :step="0.5" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>平价起拍 (1.0x)</span>
                <span>激烈角逐 (4.0x)</span>
                <span>天价志在必得 (10.0x)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">黑市税收与手续费返还率 (Market Fee Rebate Rate):</span>
                <span class="font-mono text-cyan-400 font-bold">{{ marketFeeRebateRate }}%</span>
              </div>
              <n-slider v-model:value="marketFeeRebateRate" :min="10" :max="100" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>基础退税 (10%)</span>
                <span>商会特权 (50%)</span>
                <span>零摩擦全返 (100%)</span>
              </div>
            </div>
          </div>

          <!-- 三大高能保障开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">时空恶性通胀自动熔断断路器 (Inflation Circuit Breaker)</div>
                <div class="text-[11px] text-gray-400">物价单日波动突破阈值时全域交易强制冻结，杜绝黑市炒作崩盘</div>
              </div>
              <n-switch v-model:value="hyperInflationCircuitBreaker" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">跨次元黑市零滑点恒定乘积池 (Zero Slippage AMM Pool)</div>
                <div class="text-[11px] text-gray-400">依托太古储备金库保障，大额以太与吉尔金币兑换实现 0 摩擦无损成交</div>
              </div>
              <n-switch v-model:value="zeroSlippageAmmPool" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">999999999 太古金币财富天花板解除 (Infinite Wealth Cap Governor)</div>
                <div class="text-[11px] text-gray-400">突破传统 99,999,999 吉尔上限限制，支持储存最高达 9,999,999,999 太古圣金</div>
              </div>
              <n-switch v-model:value="infiniteWealthCapGovernor" size="small" />
            </div>
          </div>
        </div>

        <!-- 右侧指标计算与沙盘推演 -->
        <div class="lg:col-span-5 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>📊</span> 实时解算宏观经济与套利能效
              </span>
              <n-tag size="tiny" type="warning" round>Economy Resolved</n-tag>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-700/40">
                <div class="text-[11px] text-gray-400">单周期预估总成交额</div>
                <div class="text-lg font-black text-amber-300 font-mono mt-0.5">{{ (calculatedTotalTurnover / 10000).toFixed(0) }}万 Gil</div>
                <div class="text-[10px] text-amber-400/80 mt-0.5">全城邦流动性汇聚</div>
              </div>

              <div class="p-3 rounded-lg bg-yellow-950/30 border border-yellow-700/40">
                <div class="text-[11px] text-gray-400">预期期货对冲净利润</div>
                <div class="text-lg font-black text-yellow-300 font-mono mt-0.5">{{ (calculatedNetArbitrageProfit / 10000).toFixed(0) }}万 Gil</div>
                <div class="text-[10px] text-yellow-400/80 mt-0.5">零滑点对冲红利</div>
              </div>

              <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-700/40">
                <div class="text-[11px] text-gray-400">全域平准稳态系数</div>
                <div class="text-lg font-black text-emerald-300 font-mono mt-0.5">{{ calculatedMarketStabilityCoeff }}%</div>
                <div class="text-[10px] text-emerald-400/80 mt-0.5">抗通胀平抑指数</div>
              </div>

              <div class="p-3 rounded-lg bg-purple-950/30 border border-purple-700/40">
                <div class="text-[11px] text-gray-400">商业金融认证评级</div>
                <div class="text-sm font-black text-purple-300 font-mono mt-1">{{ calculatedFinancialRankTier }}</div>
                <div class="text-[10px] text-purple-400/80 mt-0.5">太古商会主权认证</div>
              </div>
            </div>
          </div>

          <!-- 推演终端 -->
          <div class="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-400">五阶段宏观金融推演进度:</span>
              <span class="font-mono text-amber-400 font-bold">{{ primalSimStep }}/5 阶段</span>
            </div>
            <n-progress
              type="line"
              :percentage="(primalSimStep / 5) * 100"
              :status="primalSimStep === 5 ? 'success' : 'warning'"
              :show-indicator="false"
              processing
            />
            <div class="text-[11px] text-gray-300 font-mono bg-slate-900/90 p-2 rounded border border-slate-800/80 min-h-[48px] flex items-center">
              <span>{{ primalSimCurrentLog }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 实机驱动源码展台 -->
      <div class="bg-slate-900/80 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3 relative z-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-gray-200">Godot 4.6 LTS 实机引擎源码架构展台</span>
            <n-tag size="tiny" type="warning" round>RefCounted 零开销架构</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activePrimalCodeTab === 'broker' ? 'bg-amber-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activePrimalCodeTab = 'broker'"
              >
                exchange_broker.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activePrimalCodeTab === 'breaker' ? 'bg-amber-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activePrimalCodeTab = 'breaker'"
              >
                gil_circuit_breaker.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activePrimalCodeTab === 'auction' ? 'bg-amber-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activePrimalCodeTab = 'auction'"
              >
                primal_auction_system.gd
              </button>
            </div>
            <n-button size="small" type="primary" secondary round @click="copyPrimalAuctionCode">
              复制源码
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentPrimalAuctionCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 全域经济平抑、跨界商会流通与物价通胀沙盘工坊 (v2.2.326 重磅实装) -->
    <div id="global-equilibrium-studio" class="global-equilibrium-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-amber-950/20 to-slate-900/95 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
              GLOBAL ECONOMY EQUILIBRIUM & TRADE MATRIX
            </span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
              v2.2.326 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>⚖️</span> 太古全域经济平抑、跨界商会流通与物价通胀沙盘工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            提供城邦商会零关税互通、太古央行吉尔平准基金干预、以太期货期权套期保值与 Godot 4.6 LTS 底层宏观金融风控状态机。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="warning" @click="resetEquilibriumDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="warning" :loading="isEquilibriumSimulating" @click="runGlobalEquilibriumSimulation">
            <template #icon><span>⚡</span></template>
            激发金融推演
          </n-button>
          <n-button size="small" round secondary type="info" @click="exportEquilibriumCert">
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大经济平抑原型 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="archetype in equilibriumArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
          :class="selectedEquilibriumArchetype === archetype.id ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="selectEquilibriumArchetype(archetype.id)"
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
              <span>核心金融工具:</span>
              <span class="text-cyan-300 font-mono">{{ archetype.financialTool }}</span>
            </div>
            <div class="flex justify-between">
              <span>市场托底职能:</span>
              <span class="text-emerald-300 font-mono">{{ archetype.marketFunction }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 四维经济金融调控滑块 -->
      <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
        <div class="text-sm font-bold text-white flex items-center justify-between">
          <span class="flex items-center gap-2"><span>🎛️</span> 通胀基准与大宗商贸流动性参数</span>
          <span class="text-xs text-amber-400 font-mono">Realtime Macroeconomic Matrix</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">全境通胀率调控基准 (%):</span>
              <span class="text-amber-400 font-mono font-bold">{{ inflationRateBasisPct.toFixed(1) }}% (CPI 均衡锚)</span>
            </div>
            <n-slider v-model:value="inflationRateBasisPct" :min="-5" :max="25" :step="0.5" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>-5% 通缩紧缩</span>
              <span>3.2% 温和繁荣</span>
              <span>25% 恶性恶化</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">跨界商会大宗物流周转天数 (Day):</span>
              <span class="text-cyan-400 font-mono font-bold">{{ tradeTurnoverDays }} 天 (高频货运)</span>
            </div>
            <n-slider v-model:value="tradeTurnoverDays" :min="1" :max="30" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>1 天 极速空运</span>
              <span>7 天 经典海运</span>
              <span>30 天 跨界陆路</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">央行平准基金干预资金规模 (百万Gil):</span>
              <span class="text-emerald-400 font-mono font-bold">{{ stabilizationFundMlnGil }} M Gil (托底储备)</span>
            </div>
            <n-slider v-model:value="stabilizationFundMlnGil" :min="10" :max="500" :step="10" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>10M 微型调剂</span>
              <span>150M 标配托底</span>
              <span>500M 救市巨资</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">期货合约套期保值覆盖率 (%):</span>
              <span class="text-purple-400 font-mono font-bold">{{ futuresHedgeCoveragePct }}% (险情免疫)</span>
            </div>
            <n-slider v-model:value="futuresHedgeCoveragePct" :min="20" :max="100" :step="5" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>20% 敞口较大</span>
              <span>85% 安全对冲</span>
              <span>100% 绝对套保</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 三大经济平抑特权开关 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">商业城邦跨区域贸易关税全免</div>
            <div class="text-[10px] text-gray-400 mt-0.5">物流跨界 0 损耗与物价无缝拉平</div>
          </div>
          <n-switch v-model:value="enableZeroTariffPact" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">恶性通胀单日波幅 ±10% 熔断冷冻</div>
            <div class="text-[10px] text-gray-400 mt-0.5">平准基金毫秒级自动介入平抑崩盘</div>
          </div>
          <n-switch v-model:value="enableExtremeVolatilityCircuitBreaker" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">隐士洞窟七色尾巴自由汇兑绿通</div>
            <div class="text-[10px] text-gray-400 mt-0.5">神器兑换与高维资源实时秒结算</div>
          </div>
          <n-switch v-model:value="enableTailExchangeGreenChannel" size="small" />
        </div>
      </div>

      <!-- 关键实时指标卡片 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">全域物价综合稳定指数</div>
          <div class="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
            {{ cpiStabilityIndexPct }}%
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">CPI 抗震波动率</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">跨界商贸日均周转吞吐量</div>
          <div class="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-1">
            {{ dailyTradeThroughputGil.toLocaleString() }} G
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">城邦集市总流速</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">市场资本流动性健康度</div>
          <div class="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
            {{ marketLiquidityHealthPct }}%
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">平准基金充沛度</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">商业帝国金牌认证评级</div>
          <div class="text-sm sm:text-base font-black text-purple-400 font-mono mt-1 truncate">
            {{ equilibriumTierBadge }}
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">太古宏观金融规范</div>
        </div>
      </div>

      <!-- 沙盘推演日志与进度 -->
      <div v-if="isEquilibriumSimulating || equilibriumLogs.length > 0" class="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-300 font-bold flex items-center gap-2">
            <span>🔄</span> 全域经济与物价平抑沙盘进程: {{ equilibriumSimStep }}
          </span>
          <span class="text-amber-400 font-mono font-bold">{{ equilibriumSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="equilibriumSimProgress"
          :indicator-placement="'inside'"
          processing
          status="warning"
        />
        <div class="max-h-36 overflow-y-auto space-y-1 font-mono text-[11px] text-gray-400 pt-2 border-t border-slate-900">
          <div v-for="(log, idx) in equilibriumLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-amber-500">›</span>
            <span :class="idx === equilibriumLogs.length - 1 ? 'text-amber-300 font-bold' : 'text-gray-400'">{{ log }}</span>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">GODOT 4.6 LTS</span>
            <h3 class="text-sm font-bold text-white">太古宏观金融风控与物价均衡引擎源码展台</h3>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeEquilibriumScriptTab === 'market' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeEquilibriumScriptTab = 'market'"
              >
                物价均衡引擎
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeEquilibriumScriptTab === 'logistics' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeEquilibriumScriptTab = 'logistics'"
              >
                商会物流清算
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeEquilibriumScriptTab === 'circuit_breaker' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeEquilibriumScriptTab = 'circuit_breaker'"
              >
                极端熔断控制器
              </button>
            </div>
            <n-button size="small" round secondary type="warning" @click="copyEquilibriumScript">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed max-h-[460px]">{{ currentEquilibriumScriptCode }}</pre>
      </div>
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
const activeCodeTab = ref<'alchemy' | 'tail' | 'auction' | 'finance' | 'futures' | 'amm'>('alchemy')

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
    const code = currentGodotCodeText.value
    await navigator.clipboard.writeText(code)
    copiedCode.value = true
    const filenameMap: Record<string, string> = {
      alchemy: 'alchemist_mix_system.gd',
      tail: 'tail_exchange_system.gd',
      auction: 'black_market_auction_engine.gd',
      finance: 'aether_macro_finance_engine.gd',
      futures: 'spacetime_futures_settlement.gd',
      amm: 'anti_inflation_liquidity_amm.gd'
    }
    const filename = filenameMap[activeCodeTab.value] || 'engine.gd'
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

// ================= 专区 5: 全域黑市跨次元秘宝拍卖行与动态通胀汇率推演工坊 =================
interface MarketLotV2 {
  id: string
  name: string
  shortName: string
  icon: string
  rarity: string
  tagType: 'error' | 'warning' | 'info' | 'success'
  category: string
  startPrice: number
  description: string
  effect: string
}

const marketLotsList: MarketLotV2[] = [
  {
    id: 'ragnarok_stone',
    name: '诸神之黄昏破限附魔石',
    shortName: '诸神黄昏附魔石',
    icon: '💎',
    rarity: 'EX 宇宙级至宝',
    tagType: 'error',
    category: '武器破限附魔',
    startPrice: 150000,
    description: '沉睡于次元裂隙尽头的太古星辰结晶，能让全武器物理与魔法面板突破极限 +99。',
    effect: '攻击力上限突破 +99，附带【时空斩断】神圣贯通全属性弱点。'
  },
  {
    id: 'elixir_recipe',
    name: '圣灵药太古配方秘卷',
    shortName: '圣灵药太古秘卷',
    icon: '📜',
    rarity: 'UR 禁忌炼金古卷',
    tagType: 'warning',
    category: '炼金神级配方',
    startPrice: 200000,
    description: '古代以太炼金宗师的手札孤本，解锁药剂师无耗批量配制圣灵药与诸神护佑药剂。',
    effect: '调合无损消耗，且全队生命与法力瞬间 100% 满额治愈。'
  },
  {
    id: 'gold_feather',
    name: '黄金陆行鸟羽毛',
    shortName: '黄金陆行鸟羽',
    icon: '🪶',
    rarity: 'SSR 幻兽秘藏',
    tagType: 'info',
    category: '幻兽传说遗物',
    startPrice: 88000,
    description: '传说中栖息于宇宙边缘的神圣黄金陆行鸟褪落的纯金飞羽，蕴含无上光辉敏捷祝福。',
    effect: '队伍先制行动率恒定 100%，战场逃脱成功率 100%，敏捷加权 +30。'
  },
  {
    id: 'genesis_core',
    name: '创世以太核芯',
    shortName: '创世以太核芯',
    icon: '🔮',
    rarity: 'EX 遗迹奇点',
    tagType: 'error',
    category: '以太永动核心',
    startPrice: 350000,
    description: '远古失落文明驱动浮空大陆与星舰超光速折跃的以太反应炉奇点，无限法力喷涌。',
    effect: '全魔导系职业所有法术 MP 消耗恒定为 1，魔法爆击率提升至 100%。'
  }
]

const scrollToAuctionStudio = () => {
  const el = document.getElementById('spacetime-auction-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// 拍品与竞标态势
const selectedMarketLotId = ref('ragnarok_stone')
const marketHighestBid = ref(150000)
const marketLeadingBidder = ref<{ name: string; isPlayer: boolean }>({
  name: '起拍底价 (蜃楼黑市公证台)',
  isPlayer: false
})
const gavelPhase = ref<0 | 1 | 2 | 3>(0) // 0: 竞标中, 1: 一槌, 2: 二槌, 3: 成交
const isMarketLotSold = computed(() => gavelPhase.value === 3)
const auctionLogs = ref<string[]>([
  '【系统公告】跨次元黑市秘宝拍卖行正式开市！当前拍品：诸神之黄昏破限附魔石。',
  '【公证人】起拍底价 150,000 Gil，欢迎诸位时空豪客出价！'
])

const wonLotsList = ref<{ id: string; name: string; icon: string; finalPrice: number }[]>([])

// 玩家随身金库
const playerVault = ref({
  gil: 500000,
  abp: 350,
  shard: 40,
  crystal: 5
})

// 通胀指数与外汇
const inflationFactor = ref(1.20)
const swapSourceCurrency = ref<'gil' | 'abp' | 'shard' | 'crystal'>('shard')
const swapTargetCurrency = ref<'gil' | 'abp' | 'shard' | 'crystal'>('gil')
const swapAmount = ref(10)

const currentMarketLot = computed(() => {
  return marketLotsList.find(l => l.id === selectedMarketLotId.value) || marketLotsList[0]
})

const gavelPhaseText = computed(() => {
  switch (gavelPhase.value) {
    case 0:
      return '竞标交锋中 (Bidding)'
    case 1:
      return '🔨 一槌！(Going Once!)'
    case 2:
      return '🔨🔨 二槌！(Going Twice!)'
    case 3:
      return '🏆 成交落槌！(SOLD!)'
  }
})

const gavelPhaseBadgeClass = computed(() => {
  switch (gavelPhase.value) {
    case 0:
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 1:
      return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 animate-pulse'
    case 2:
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
    case 3:
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
  }
})

const inflationStatusText = computed(() => {
  if (inflationFactor.value < 0.8) return '萧条紧缩期 (物资贬值)'
  if (inflationFactor.value <= 1.3) return '均衡平稳期 (标准通胀)'
  if (inflationFactor.value <= 2.2) return '繁荣热络期 (通货膨胀)'
  return '裂隙暴走期 (恶性通胀飙升)'
})

const getCurrencyRateToGil = (curr: 'gil' | 'abp' | 'shard' | 'crystal'): number => {
  switch (curr) {
    case 'gil':
      return 1.0
    case 'abp':
      return 120.0 * inflationFactor.value
    case 'shard':
      return 2500.0 * inflationFactor.value
    case 'crystal':
      return 50000.0 * inflationFactor.value
  }
}

const calculatedSwapResult = computed(() => {
  if (swapSourceCurrency.value === swapTargetCurrency.value) {
    return { netYield: swapAmount.value, targetUnit: swapTargetCurrency.value.toUpperCase() }
  }
  const sourceRate = getCurrencyRateToGil(swapSourceCurrency.value)
  const targetRate = getCurrencyRateToGil(swapTargetCurrency.value)
  const grossGil = swapAmount.value * sourceRate
  const netGil = grossGil * 0.98 // 扣除 2% 商会手续费
  const yieldAmount = Math.floor(netGil / targetRate)
  return {
    netYield: Math.max(0, yieldAmount),
    targetUnit: swapTargetCurrency.value.toUpperCase()
  }
})

const totalNetWorthGil = computed(() => {
  return Math.round(
    playerVault.value.gil +
    playerVault.value.abp * getCurrencyRateToGil('abp') +
    playerVault.value.shard * getCurrencyRateToGil('shard') +
    playerVault.value.crystal * getCurrencyRateToGil('crystal')
  )
})

const guildReputationTitle = computed(() => {
  if (wonLotsList.value.length >= 3) return '黑市崇拜 · 裂隙主宰者'
  if (wonLotsList.value.length >= 1) return '黑市敬仰 · 贵宾大买家'
  return '黑市通关 · 时空旅行者'
})

// NPC 豪客候选人
interface NpcBidderDef {
  name: string
  title: string
  quotes: string[]
}

const npcBidders: NpcBidderDef[] = [
  {
    name: '蜃楼豪商·贾瓦德',
    title: '巨贾行会会长',
    quotes: [
      '“为了这等极品，本会长可以押上整个商会的银币！”',
      '“加价！这点金币对我们商会来说不过九牛一毛！”',
      '“休想从我的眼皮底下抢走这件至宝！”'
    ]
  },
  {
    name: '虚空秘术师·莫甘娜',
    title: '暗黑魔导首席',
    quotes: [
      '“核芯的魔力波动在呼唤我……任何人不得阻挠真理的求索！”',
      '“无知的凡人，你们根本不懂这件神器的真正价值！”',
      '“以虚空以太之名，出价！”'
    ]
  },
  {
    name: '跨界海盗·红胡子',
    title: '飞空艇掠夺者',
    quotes: [
      '“哇哈哈！这宝贝装在老子的飞空艇船头，连神龙都追不上！”',
      '“兄弟们，把刚抢来的金矿全押上去！”',
      '“出价！谁敢跟老子抢，回程路上小心被炮轰！”'
    ]
  },
  {
    name: '帝国国库特使·雷加尔',
    title: '皇家全权采办',
    quotes: [
      '“皇家军团必须掌握此项秘宝，国库预算上不封顶！”',
      '“奉泰空皇帝之命，此物必须归属帝国藏宝库！”',
      '“继续加码，帝国的财政实力不容置疑！”'
    ]
  }
]

const selectMarketLot = (lotId: string) => {
  selectedMarketLotId.value = lotId
  const lot = marketLotsList.find(l => l.id === lotId) || marketLotsList[0]
  marketHighestBid.value = lot.startPrice
  marketLeadingBidder.value = {
    name: '起拍底价 (蜃楼黑市公证台)',
    isPlayer: false
  }
  gavelPhase.value = 0
  auctionLogs.value.unshift(`【拍品更替】公证人展示新拍品【${lot.name}】，起拍价 ${lot.startPrice.toLocaleString()} Gil！`)
  message.info(`已切换当前拍品至：${lot.name}`)
}

const placePlayerBid = (delta: number) => {
  if (isMarketLotSold.value) {
    message.warning('当前拍品已落槌成交，请切换新拍品或重置拍卖行！')
    return
  }
  const nextPrice = marketHighestBid.value + delta
  if (playerVault.value.gil < nextPrice) {
    message.error(`金币不足！需要 ${nextPrice.toLocaleString()} Gil，当前仅有 ${playerVault.value.gil.toLocaleString()} Gil`)
    return
  }

  marketHighestBid.value = nextPrice
  marketLeadingBidder.value = {
    name: '光之战士 (您)',
    isPlayer: true
  }
  gavelPhase.value = 0
  auctionLogs.value.unshift(`🔨【玩家出价】光之战士加价 +${delta.toLocaleString()}G，当前最高出价达到 ${nextPrice.toLocaleString()} Gil！`)
  message.success(`成功举牌加价 +${delta.toLocaleString()} Gil！`)

  // 40% 几率 NPC 立即反击加价
  if (Math.random() < 0.45) {
    setTimeout(() => {
      triggerNpcRandomBid()
    }, 900)
  }
}

const triggerNpcRandomBid = () => {
  if (isMarketLotSold.value) return
  const npc = npcBidders[Math.floor(Math.random() * npcBidders.length)]
  const delta = (Math.floor(Math.random() * 4) + 1) * 10000
  const nextPrice = marketHighestBid.value + delta
  const quote = npc.quotes[Math.floor(Math.random() * npc.quotes.length)]

  marketHighestBid.value = nextPrice
  marketLeadingBidder.value = {
    name: npc.name,
    isPlayer: false
  }
  gavelPhase.value = 0
  auctionLogs.value.unshift(`⚡【NPC竞标】${npc.name} 加价 +${delta.toLocaleString()}G！当前价: ${nextPrice.toLocaleString()} Gil。${quote}`)
  message.warning(`${npc.name} 强势加价 +${delta.toLocaleString()} Gil！`)
}

const stepAuctionGavel = () => {
  if (isMarketLotSold.value) return

  if (gavelPhase.value === 0) {
    gavelPhase.value = 1
    auctionLogs.value.unshift(`🔨【一槌】拍卖官敲响第一槌：“${marketHighestBid.value.toLocaleString()} Gil 第一次！还有加价的吗？”`)
  } else if (gavelPhase.value === 1) {
    gavelPhase.value = 2
    auctionLogs.value.unshift(`🔨🔨【二槌】拍卖官高举法槌：“${marketHighestBid.value.toLocaleString()} Gil 第二次！最后机会！”`)
  } else if (gavelPhase.value === 2) {
    gavelPhase.value = 3
    if (marketLeadingBidder.value.isPlayer) {
      playerVault.value.gil -= marketHighestBid.value
      wonLotsList.value.push({
        id: currentMarketLot.value.id,
        name: currentMarketLot.value.name,
        icon: currentMarketLot.value.icon,
        finalPrice: marketHighestBid.value
      })
      auctionLogs.value.unshift(`🏆【成交落槌】啪！成交！恭喜光之战士以 ${marketHighestBid.value.toLocaleString()} Gil 拍得【${currentMarketLot.value.name}】！`)
      message.success(`🎉 竞拍大获全胜！成功夺得【${currentMarketLot.value.name}】！`)
    } else {
      auctionLogs.value.unshift(`⚠️【成交落槌】啪！成交！拍品【${currentMarketLot.value.name}】被【${marketLeadingBidder.value.name}】以 ${marketHighestBid.value.toLocaleString()} Gil 拍走！`)
      message.info(`拍品被 ${marketLeadingBidder.value.name} 竞得！可点击重置或切换拍品。`)
    }
  }
}

const executeCurrencySwap = () => {
  if (swapSourceCurrency.value === swapTargetCurrency.value) {
    message.warning('源货币与目标货币相同，无需兑换！')
    return
  }
  const currentSourceStock = playerVault.value[swapSourceCurrency.value]
  if (currentSourceStock < swapAmount.value) {
    message.error(`金库库存不足！您当前仅有 ${currentSourceStock} ${swapSourceCurrency.value.toUpperCase()}`)
    return
  }

  const result = calculatedSwapResult.value
  playerVault.value[swapSourceCurrency.value] -= swapAmount.value
  playerVault.value[swapTargetCurrency.value] += result.netYield
  auctionLogs.value.unshift(`💱【外汇结算】成功将 ${swapAmount.value} ${swapSourceCurrency.value.toUpperCase()} 兑换为 ${result.netYield.toLocaleString()} ${result.targetUnit} (扣除 2% 商会手续费)`)
  message.success(`跨界兑换成功！净获得 ${result.netYield.toLocaleString()} ${result.targetUnit}`)
}

const depositPlayerFunds = () => {
  playerVault.value.gil += 100000
  playerVault.value.shard += 10
  auctionLogs.value.unshift(`💰【金库注资】获得光之神殿注资 +100,000 Gil 与 +10 枚星之碎片！`)
  message.success('已为随身金库补充 100,000 Gil 与 10 枚星之碎片！')
}

const resetAuctionStudio = () => {
  playerVault.value = {
    gil: 500000,
    abp: 350,
    shard: 40,
    crystal: 5
  }
  inflationFactor.value = 1.20
  wonLotsList.value = []
  selectMarketLot('ragnarok_stone')
  auctionLogs.value = [
    '【系统公告】拍卖行与金库已全面重置。当前拍品：诸神之黄昏破限附魔石。',
    '【公证人】起拍底价 150,000 Gil，欢迎诸位时空豪客出价！'
  ]
  message.info('黑市拍卖行与金库参数已恢复初始设定')
}

const exportAuctionCertificate = () => {
  const timestamp = new Date().toISOString()
  const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase()
  const fakeSha256 = `SHA256-${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`

  const certLines = [
    '========================================================================',
    '       《光之战士：时空裂隙》全域黑市跨次元秘宝拍卖行与动态通胀结算凭证',
    '               OFFICIAL BLACK MARKET SPACETIME SETTLEMENT CERTIFICATE',
    '========================================================================',
    `凭证唯一档案号: AGY-AUCTION-20261028-${randomHex}`,
    `签发安全哈希: ${fakeSha256}`,
    `签发世界线时间: ${timestamp}`,
    `规范矩阵基准: VBLE Macro Economy & Black Market Auction Matrix v2.2.261`,
    `黑市商会评级: ${guildReputationTitle.value}`,
    '',
    '------------------------------------------------------------------------',
    '【一、时空裂隙宏观外汇与通胀指标】',
    '------------------------------------------------------------------------',
    `当前通胀波动乘数: ${inflationFactor.value.toFixed(2)}x (${inflationStatusText.value})`,
    `金币基准汇率: 1.00 Gil / 1 G`,
    `职业点代币汇率: ${Math.round(120 * inflationFactor.value)} Gil / 1 ABP`,
    `星之碎片公价: ${Math.round(2500 * inflationFactor.value)} Gil / 1 碎片`,
    `虚空以太晶石公价: ${Math.round(50000 * inflationFactor.value)} Gil / 1 晶石`,
    `商会跨境手续费: 2.0% 恒定扣减`,
    '',
    '------------------------------------------------------------------------',
    '【二、光之战士随身金库资产审计】',
    '------------------------------------------------------------------------',
    `随身金币存量: ${playerVault.value.gil.toLocaleString()} Gil`,
    `职业点代币存量: ${playerVault.value.abp.toLocaleString()} ABP`,
    `星之碎片存量: ${playerVault.value.shard.toLocaleString()} 枚`,
    `虚空以太晶石存量: ${playerVault.value.crystal.toLocaleString()} 晶`,
    `全域金库折算总净资产: ${totalNetWorthGil.value.toLocaleString()} Gil`,
    '',
    '------------------------------------------------------------------------',
    '【三、本次会期竞拍与获胜秘宝藏品】',
    '------------------------------------------------------------------------',
    `当前选定拍品: ${currentMarketLot.value.name} (${currentMarketLot.value.rarity})`,
    `当前最高出价: ${marketHighestBid.value.toLocaleString()} Gil`,
    `目前领标身份: ${marketLeadingBidder.value.name}`,
    `法槌成交阶段: ${gavelPhaseText.value}`,
    `已斩获跨次元秘宝数: ${wonLotsList.value.length} / 4 件`,
    ...wonLotsList.value.map((item, idx) => `  ${idx + 1}. ${item.icon} ${item.name} —— 成交价: ${item.finalPrice.toLocaleString()} Gil`),
    '',
    '------------------------------------------------------------------------',
    '【四、黑市公证人与帝国督查使联合箴言】',
    '------------------------------------------------------------------------',
    '“在次元裂隙的洪流中，金钱是唯一能让神魔与凡人达成妥协的契约之光。',
    ' 掌握汇率波动之人，方能驾驭太古遗物的终极质变。”',
    '========================================================================'
  ]

  const blob = new Blob([certLines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `economy_auction_v2.2.261_${Date.now()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  message.success('📜 拍卖行结算凭证方案书已成功导出并下载！')
}

// Godot 4.6 LTS 拍卖行实机源码展台
const godotAuctionCodeText = [
  '## black_market_auction_engine.gd',
  '## 《光之战士：时空裂隙》全域黑市跨次元秘宝拍卖行与动态通胀汇率引擎',
  '## 官方引擎规范: VBLE Macro Economy & Black Market Auction Matrix v2.2.261',
  'extends Node',
  'class_name BlackMarketAuctionEngine',
  '',
  'signal lot_opened(lot_id: String, start_price: int, item_name: String)',
  'signal bid_recorded(bidder_name: String, lot_id: String, amount: int)',
  'signal auction_hammer_struck(strike_count: int, lot_id: String, current_price: int)',
  'signal auction_concluded(winner: String, lot_id: String, final_price: int)',
  'signal currency_swapped(from_curr: String, to_curr: String, amount: float, converted: float)',
  '',
  'enum GavelPhase { BIDDING = 0, ONCE = 1, TWICE = 2, SOLD = 3 }',
  '',
  'const CURRENCY_BASE_RATES = {',
  '	"GIL": 1.0,',
  '	"ABP": 120.0,',
  '	"STAR_SHARD": 2500.0,',
  '	"VOID_CRYSTAL": 50000.0',
  '}',
  '',
  'const NPC_BIDDERS = [',
  '	{ "id": "jawad", "name": "蜃楼豪商·贾瓦德", "budget": 800000, "aggressiveness": 0.45, "bias": "ragnarok_stone" },',
  '	{ "id": "morgana", "name": "虚空秘术师·莫甘娜", "budget": 950000, "aggressiveness": 0.50, "bias": "genesis_core" },',
  '	{ "id": "redbeard", "name": "跨界海盗·红胡子", "budget": 600000, "aggressiveness": 0.60, "bias": "gold_feather" },',
  '	{ "id": "regar", "name": "帝国国库特使·雷加尔", "budget": 1200000, "aggressiveness": 0.35, "bias": "elixir_recipe" }',
  ']',
  '',
  'var inflation_factor: float = 1.20',
  'var current_phase: GavelPhase = GavelPhase.BIDDING',
  'var active_lot_id: String = "ragnarok_stone"',
  'var current_highest_bid: int = 150000',
  'var current_leader: String = "起拍底价"',
  'var hammer_strikes: int = 0',
  '',
  'func convert_currency(from_curr: String, to_curr: String, amount: float) -> float:',
  '	if not CURRENCY_BASE_RATES.has(from_curr) or not CURRENCY_BASE_RATES.has(to_curr):',
  '		return 0.0',
  '	var from_gil = amount * CURRENCY_BASE_RATES[from_curr] * (inflation_factor if from_curr != "GIL" else 1.0)',
  '	var to_rate = CURRENCY_BASE_RATES[to_curr] * (inflation_factor if to_curr != "GIL" else 1.0)',
  '	var net_gil = from_gil * 0.98 # 2% Guild Commission',
  '	var converted = net_gil / to_rate',
  '	emit_signal("currency_swapped", from_curr, to_curr, amount, converted)',
  '	return converted',
  '',
  'func place_bid(bidder_name: String, bid_increment: int) -> Dictionary:',
  '	if current_phase == GavelPhase.SOLD:',
  '		return { "success": false, "reason": "Auction already concluded" }',
  '	',
  '	current_highest_bid += bid_increment',
  '	current_leader = bidder_name',
  '	hammer_strikes = 0',
  '	current_phase = GavelPhase.BIDDING',
  '	emit_signal("bid_recorded", bidder_name, active_lot_id, current_highest_bid)',
  '	return { "success": true, "leader": current_leader, "price": current_highest_bid }',
  '',
  'func step_gavel() -> GavelPhase:',
  '	hammer_strikes += 1',
  '	if hammer_strikes == 1:',
  '		current_phase = GavelPhase.ONCE',
  '	elif hammer_strikes == 2:',
  '		current_phase = GavelPhase.TWICE',
  '	else:',
  '		current_phase = GavelPhase.SOLD',
  '		emit_signal("auction_concluded", current_leader, active_lot_id, current_highest_bid)',
  '	',
  '	emit_signal("auction_hammer_struck", hammer_strikes, active_lot_id, current_highest_bid)',
  '	return current_phase'
].join('\n')

// ================= 模块五：全域以太金融汇率、跨界黑市期货结算与反通胀对冲工坊 (v2.2.285) =================
interface FinancialInstrument {
  id: string
  name: string
  icon: string
  desc: string
  color: string
  rateFeature: string
}

const financialInstrumentsList: FinancialInstrument[] = [
  {
    id: 'crystal_standard',
    name: '原初以太金本位 (Crystal Standard)',
    icon: '💎',
    desc: '原初以太刚性兑付与零通胀基石，波动率收敛 -50%',
    color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    rateFeature: '波动率 -50% / 刚性兑付'
  },
  {
    id: 'void_futures_swap',
    name: '虚空跨次元期货掉期 (Futures Swap)',
    icon: '🌌',
    desc: '跨界高频杠杆掉期对冲，多空双向收益率 +80%',
    color: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
    rateFeature: '套利收益 +80% / 杠杆共振'
  },
  {
    id: 'merkle_liquidity_pool',
    name: '默克尔流动性 AMM 池 (Liquidity Pool)',
    icon: '🌊',
    desc: '恒定乘积流动性池，提供滑点缓冲与无常损失补贴 +25%',
    color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
    rateFeature: '无常补贴 +25% / 深度护航'
  },
  {
    id: 'chocobo_index_hedge',
    name: '陆行鸟物价对冲基金 (CPI Hedge)',
    icon: '🐥',
    desc: '全域核心生活物资抵押避险，绝对本金安全防御结界',
    color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
    rateFeature: '保本防御 / 抗通胀锚定'
  }
]

const selectedInstrumentId = ref('crystal_standard')
const aetherExchangeRate = ref(1250)
const inflationIndex = ref(1.35)
const leverageMultiplier = ref(3.5)
const liquidityPoolDepth = ref(1200000)

const circuitBreakerActive = ref(true)
const negativeInterestWard = ref(true)
const arbitrageTaxRebate = ref(false)

const currentFinancialInstrument = computed(() => {
  return financialInstrumentsList.find(i => i.id === selectedInstrumentId.value) || financialInstrumentsList[0]
})

const calculatedAetherNetValue = computed(() => {
  let val = aetherExchangeRate.value * inflationIndex.value
  if (circuitBreakerActive.value) {
    val *= 0.95
  } else {
    val *= 1.05
  }
  return Math.round(val)
})

const calculatedFuturesExpectedYield = computed(() => {
  const excessInflation = inflationIndex.value > 1.0 ? inflationIndex.value - 1.0 : 0.1
  let yieldVal = aetherExchangeRate.value * leverageMultiplier.value * excessInflation * 10
  if (arbitrageTaxRebate.value) {
    yieldVal *= 1.25
  }
  return Math.round(yieldVal)
})

const calculatedHedgeEfficiency = computed(() => {
  let eff = 75 + (liquidityPoolDepth.value / 100000) * 1.5
  if (negativeInterestWard.value) {
    eff += 10
  }
  return Math.min(99, Math.round(eff)) + '%'
})

const calculatedRiskSpread = computed(() => {
  let spread = leverageMultiplier.value * 0.8
  if (circuitBreakerActive.value) {
    spread -= 1.2
  }
  return Math.max(0.1, spread).toFixed(2) + '%'
})

function scrollToAetherFinanceStudio() {
  const el = document.getElementById('aether-finance-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function resetAetherFinanceParams() {
  aetherExchangeRate.value = 1250
  inflationIndex.value = 1.35
  leverageMultiplier.value = 3.5
  liquidityPoolDepth.value = 1200000
  circuitBreakerActive.value = true
  negativeInterestWard.value = true
  arbitrageTaxRebate.value = false
  message.info('已重置以太金融调控参数至基准值')
}

function injectLiquidityBonus() {
  liquidityPoolDepth.value += 500000
  message.success('已注入以太做市流动性资金 +500,000 Gil！池深度大幅增加')
}

// 金融推演终端
interface FinanceTerminalLog {
  time: string
  message: string
  color: string
}

const isFinanceSimulating = ref(false)
const financeSimStage = ref(0)
const financeSimFinished = ref(false)
const financeTerminalLogs = ref<FinanceTerminalLog[]>([
  {
    time: 'INIT',
    message: '全域以太金融汇率、跨界黑市期货结算工坊就绪。',
    color: 'text-gray-400'
  }
])

function appendFinanceLog(msg: string, color = 'text-rose-400') {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
  financeTerminalLogs.value.push({ time: timeStr, message: msg, color })
}

function runAetherFinanceSimulation() {
  if (isFinanceSimulating.value) return
  isFinanceSimulating.value = true
  financeSimFinished.value = false
  financeSimStage.value = 1
  appendFinanceLog('▶ 启动五阶段以太金融与期货对冲推演...', 'text-rose-400 font-bold')

  setTimeout(() => {
    financeSimStage.value = 2
    appendFinanceLog(`[阶段 1/5] 校验基准汇率 ${aetherExchangeRate.value} Gil/Ether 与 AMM 做市池深度 ${(liquidityPoolDepth.value / 1000).toFixed(0)}k Gil`, 'text-cyan-300')

    setTimeout(() => {
      financeSimStage.value = 3
      appendFinanceLog(`[阶段 2/5] 注入物价通胀指数 ${inflationIndex.value.toFixed(2)}x，公允净值解算为: ${calculatedAetherNetValue.value.toLocaleString()} Gil`, 'text-amber-300')

      setTimeout(() => {
        financeSimStage.value = 4
        const cbStatus = circuitBreakerActive.value ? '已启动(阈值 20%)' : '旁路关闭'
        const wardStatus = negativeInterestWard.value ? '保底 +2.5%' : '常规利率'
        appendFinanceLog(`[阶段 3/5] 熔断机制[${cbStatus}]，负利率对冲结界[${wardStatus}]`, 'text-purple-300')

        setTimeout(() => {
          financeSimStage.value = 5
          appendFinanceLog(`[阶段 4/5] 期货杠杆 ${leverageMultiplier.value.toFixed(1)}x 结算，预期收益: ${calculatedFuturesExpectedYield.value.toLocaleString()} Gil，避险效率: ${calculatedHedgeEfficiency.value}`, 'text-emerald-300')

          setTimeout(() => {
            isFinanceSimulating.value = false
            financeSimFinished.value = true
            appendFinanceLog(`✓ [阶段 5/5] 金融推演完成！风险利差: ${calculatedRiskSpread.value}，生成离线结算证书凭据`, 'text-emerald-400 font-bold')
            message.success('以太金融对冲五阶段推演完成！')
          }, 350)
        }, 350)
      }, 350)
    }, 350)
  }, 350)
}

function exportAetherFinanceCertificate() {
  const certData = {
    standard: 'Godot 4.6 LTS / VBLE Macro Economy Matrix v2.2.285',
    timestamp: new Date().toISOString(),
    instrument: selectedInstrumentId.value,
    parameters: {
      aetherExchangeRate: aetherExchangeRate.value,
      inflationIndex: inflationIndex.value,
      leverageMultiplier: leverageMultiplier.value,
      liquidityPoolDepth: liquidityPoolDepth.value,
      circuitBreakerActive: circuitBreakerActive.value,
      negativeInterestWard: negativeInterestWard.value,
      arbitrageTaxRebate: arbitrageTaxRebate.value
    },
    actuarialResults: {
      aetherNetValue: calculatedAetherNetValue.value,
      futuresExpectedYield: calculatedFuturesExpectedYield.value,
      hedgeEfficiency: calculatedHedgeEfficiency.value,
      riskSpread: calculatedRiskSpread.value
    },
    sha256Signature: 'SHA256-AETHER-FIN-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `aether_finance_v2.2.285_${selectedInstrumentId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出以太金融方案书证书！')
}

const godotFinanceCodeText = [
  '# ==============================================================================',
  '# AetherMacroFinanceEngine - 全域以太宏观金融与公允汇率解算引擎',
  '# 文件路径: res://scripts/economy/aether_macro_finance_engine.gd',
  '# 架构规范: Godot 4.6 LTS / VBLE Macro Economy Matrix v2.2.285',
  '# 核心职责: 管理以太金本位锚定、动态通胀因子折算与熔断保护阀机制',
  '# ==============================================================================',
  'class_name AetherMacroFinanceEngine',
  'extends RefCounted',
  '',
  'const MAX_CIRCUIT_BREAKER_FLUCTUATION: float = 0.20',
  '',
  'static func calculate_fair_net_value(base_rate: float, inflation: float, circuit_breaker: bool) -> int:',
  '	var fair_value: float = base_rate * inflation',
  '	if circuit_breaker:',
  '		fair_value *= 0.95',
  '	else:',
  '		fair_value *= 1.05',
  '	return int(round(fair_value))',
  '',
  'static func evaluate_hedge_efficiency(depth: int, negative_ward: bool) -> float:',
  '	var eff: float = 75.0 + (float(depth) / 100000.0) * 1.5',
  '	if negative_ward:',
  '		eff += 10.0',
  '	return clampf(eff, 50.0, 99.0)'
].join('\n')

const godotFuturesCodeText = [
  '# ==============================================================================',
  '# SpacetimeFuturesSettlement - 跨界黑市多维期货掉期结算器',
  '# 文件路径: res://scripts/economy/spacetime_futures_settlement.gd',
  '# 架构规范: Godot 4.6 LTS / VBLE Macro Economy Matrix v2.2.285',
  '# 核心职责: 跨次元多空掉期撮合、穿仓清算边界判定与套利佣金返还',
  '# ==============================================================================',
  'class_name SpacetimeFuturesSettlement',
  'extends RefCounted',
  '',
  'static func settle_futures_contract(base_rate: float, leverage: float, inflation: float, tax_rebate: bool) -> int:',
  '	var excess_inf: float = maxf(inflation - 1.0, 0.1)',
  '	var expected_yield: float = base_rate * leverage * excess_inf * 10.0',
  '	if tax_rebate:',
  '		expected_yield *= 1.25',
  '	return int(round(expected_yield))',
  '',
  'static func check_liquidation_risk(leverage: float, circuit_breaker: bool) -> bool:',
  '	if circuit_breaker and leverage <= 5.0:',
  '		return false',
  '	return leverage >= 8.0'
].join('\n')

const godotAmmCodeText = [
  '# ==============================================================================',
  '# AntiInflationLiquidityAmm - 恒定乘积反通胀做市商引擎',
  '# 文件路径: res://scripts/economy/anti_inflation_liquidity_amm.gd',
  '# 架构规范: Godot 4.6 LTS / VBLE Macro Economy Matrix v2.2.285',
  '# 核心职责: 维护 x * y = k 恒定乘积流动性池，提供滑点控制与抗通胀补贴',
  '# ==============================================================================',
  'class_name AntiInflationLiquidityAmm',
  'extends RefCounted',
  '',
  'var pool_gil: int = 1200000',
  'var pool_ether: int = 1000',
  'var k_constant: int = 1200000000',
  '',
  'func swap_gil_for_ether(gil_in: int) -> int:',
  '	var net_gil: float = float(gil_in) * 0.997 # 0.3% LP Fee',
  '	var new_pool_gil: float = float(pool_gil) + net_gil',
  '	var new_pool_ether: float = float(k_constant) / new_pool_gil',
  '	var ether_out: int = int(pool_ether - new_pool_ether)',
  '	pool_gil = int(new_pool_gil)',
  '	pool_ether = int(new_pool_ether)',
  '	return ether_out'
].join('\n')

const currentGodotCodeText = computed(() => {
  if (activeCodeTab.value === 'alchemy') return godotCodeText
  if (activeCodeTab.value === 'tail') return godotTailCodeText
  if (activeCodeTab.value === 'auction') return godotAuctionCodeText
  if (activeCodeTab.value === 'finance') return godotFinanceCodeText
  if (activeCodeTab.value === 'futures') return godotFuturesCodeText
  return godotAmmCodeText
})

// ================= ⚗️ 工坊 4: 跨界时空黑市汇率平抑、吉尔金币熔断与太古拍卖行工坊 (v2.2.308) =================
interface PrimalEconomyArchetype {
  id: string
  name: string
  market: string
  tag: string
  icon: string
  tagType: 'info' | 'warning' | 'error' | 'success'
  desc: string
  baseTurnover: number
  yieldPct: number
}

const primalEconomyArchetypes: PrimalEconomyArchetype[] = [
  {
    id: 'cross_realm_gil_arbitrage',
    name: '跨界时空吉尔对冲流',
    market: '五大城邦 / 零关税对冲',
    tag: '零风险汇兑',
    icon: '🪙',
    tagType: 'info',
    desc: '利用第一世界与第二世界金价汇率差，买入低洼城邦特产并在高估世界脱手，无损赚取吉尔基差。',
    baseTurnover: 12500000,
    yieldPct: 28.5
  },
  {
    id: 'primal_relic_auction_house',
    name: '太古圣遗物暗标拍卖行',
    market: '全服竞拍 / 稀世珍宝',
    tag: '暗标竞夺',
    icon: '🏛️',
    tagType: 'warning',
    desc: '跨越次元裂隙的秘密拍卖所，仅流通太古神兵碎片与远古配方，采用盲盒暗标机制杜绝恶意抬价。',
    baseTurnover: 48000000,
    yieldPct: 45.0
  },
  {
    id: 'void_smuggle_futures_pool',
    name: '虚空走私特种期货池',
    market: '暗物质抵押 / 十倍杠杆',
    tag: '高杠杆期货',
    icon: '📦',
    tagType: 'error',
    desc: '以深渊暗物质为抵押品的多空双向掉期合约，在时空风暴来临前做多珍稀以太药剂，斩获暴利。',
    baseTurnover: 32000000,
    yieldPct: 62.0
  },
  {
    id: 'aether_macro_stability_fund',
    name: '宏观通胀平抑主权基金',
    market: '央行注资 / 汇率平准',
    tag: '主权平准',
    icon: '🛡️',
    tagType: 'success',
    desc: '由席德商会与巴隆王国联合注资的宏观平准储备池，在黑市恶性抛售时入场托底，维持物价基石。',
    baseTurnover: 85000000,
    yieldPct: 18.0
  }
]

const selectedPrimalEconomyArchetypeId = ref<string>('primal_relic_auction_house')
const exchangeHedgingRatio = ref<number>(2.8)
const gilCircuitBreakerVolatility = ref<number>(20)
const auctionBidLeverage = ref<number>(4.0)
const marketFeeRebateRate = ref<number>(85)

const hyperInflationCircuitBreaker = ref<boolean>(true)
const zeroSlippageAmmPool = ref<boolean>(true)
const infiniteWealthCapGovernor = ref<boolean>(true)

const isSimulatingPrimalAuction = ref<boolean>(false)
const primalSimStep = ref<number>(5)
const primalSimCurrentLog = ref<string>('太古拍卖行与吉尔金币熔断矩阵已就绪，等待调控指令。')

const currentPrimalArchetype = computed(() => {
  return primalEconomyArchetypes.find(a => a.id === selectedPrimalEconomyArchetypeId.value) || primalEconomyArchetypes[1]
})

const calculatedTotalTurnover = computed(() => {
  const base = currentPrimalArchetype.value.baseTurnover
  const hedgeMult = exchangeHedgingRatio.value * 0.45
  const levMult = auctionBidLeverage.value * 0.35
  const capMult = infiniteWealthCapGovernor.value ? 1.6 : 1.0
  return Math.round(base * (1 + hedgeMult + levMult) * capMult)
})

const calculatedNetArbitrageProfit = computed(() => {
  const turnover = calculatedTotalTurnover.value
  const yieldRatio = currentPrimalArchetype.value.yieldPct / 100
  const rebateBonus = 1 + (marketFeeRebateRate.value / 100) * 0.25
  const zeroSlippageBonus = zeroSlippageAmmPool.value ? 1.15 : 1.0
  return Math.round(turnover * yieldRatio * 0.2 * rebateBonus * zeroSlippageBonus)
})

const calculatedMarketStabilityCoeff = computed(() => {
  const base = 80.0
  const breakerBonus = hyperInflationCircuitBreaker.value ? 12.5 : 0
  const rebateBonus = (marketFeeRebateRate.value / 100) * 6.0
  return Math.min(99.9, base + breakerBonus + rebateBonus).toFixed(1)
})

const calculatedFinancialRankTier = computed(() => {
  const profit = calculatedNetArbitrageProfit.value
  if (profit > 30000000) return 'EX·太古创世主权财阀'
  if (profit > 15000000) return 'SSS·跨次元商会霸主'
  if (profit > 5000000) return 'SS·高维期货对冲专家'
  return 'S·实战商业巨擘'
})

const scrollToPrimalAuctionStudio = () => {
  const el = document.getElementById('primal-auction-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const resetPrimalAuctionParameters = () => {
  selectedPrimalEconomyArchetypeId.value = 'primal_relic_auction_house'
  exchangeHedgingRatio.value = 2.8
  gilCircuitBreakerVolatility.value = 20
  auctionBidLeverage.value = 4.0
  marketFeeRebateRate.value = 85
  hyperInflationCircuitBreaker.value = true
  zeroSlippageAmmPool.value = true
  infiniteWealthCapGovernor.value = true
  message.info('已恢复太古拍卖行与金币熔断工坊初始调控参数')
}

const runPrimalAuctionSimulation = () => {
  if (isSimulatingPrimalAuction.value) return
  isSimulatingPrimalAuction.value = true
  primalSimStep.value = 1
  primalSimCurrentLog.value = '阶段 1/5: 扫描五大商业城邦物价指数，捕获跨界以太汇率基差...'

  setTimeout(() => {
    primalSimStep.value = 2
    primalSimCurrentLog.value = '阶段 2/5: 注入以太对冲流动性，校准 20% 吉尔金币异常波动熔断线...'
  }, 400)

  setTimeout(() => {
    primalSimStep.value = 3
    primalSimCurrentLog.value = '阶段 3/5: 加载太古暗标竞拍撮合协议，挂载 0 滑点恒定乘积资金池...'
  }, 800)

  setTimeout(() => {
    primalSimStep.value = 4
    primalSimCurrentLog.value = '阶段 4/5: 激活全量财力天花板解除器，对齐 Godot 4.6 LTS 经济调度机...'
  }, 1200)

  setTimeout(() => {
    primalSimStep.value = 5
    primalSimCurrentLog.value = '阶段 5/5: 生成宏观金融方案证书，锁定实机运行时交易与拍卖汇率！'
    isSimulatingPrimalAuction.value = false
    message.success('太古拍卖与宏观金融推演完成！')
  }, 1600)
}

const exportPrimalAuctionCertificate = () => {
  const arch = currentPrimalArchetype.value
  const certContent = `================================================================================
  《光之战士：时空裂隙》跨界汇率平抑、金币熔断与太古拍卖方案证书 (v2.2.308)
  生成时间: ${new Date().toISOString()}
  原型构架: ${arch.name} (${arch.market})
  金融评阶: ${calculatedFinancialRankTier.value}
================================================================================
【调控参数】
- 跨界汇率对冲比率: ${exchangeHedgingRatio.value.toFixed(1)}x
- 金币熔断触发波动: ±${gilCircuitBreakerVolatility.value}%
- 暗标竞拍加价杠杆: ${auctionBidLeverage.value.toFixed(1)}x
- 手续费返还比率: ${marketFeeRebateRate.value}%
- 通胀自动熔断器: ${hyperInflationCircuitBreaker.value ? '已开启' : '关闭'}
- 零滑点 AMM 恒定池: ${zeroSlippageAmmPool.value ? '已开启' : '关闭'}
- 999999999 财富解限: ${infiniteWealthCapGovernor.value ? '已开启' : '关闭'}

【实时解算能效】
- 预估周期总成交额: ${calculatedTotalTurnover.value.toLocaleString()} Gil
- 预期期货对冲净利: ${calculatedNetArbitrageProfit.value.toLocaleString()} Gil
- 全域平准稳态系数: ${calculatedMarketStabilityCoeff.value}%
- 认证安全指纹: SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now()}
================================================================================`

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `primal_auction_cert_v2.2.308_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Export certificate error:', e)
  }

  message.success('太古拍卖与金融方案证书已导出并同步至剪贴板！')
}

const activePrimalCodeTab = ref<'broker' | 'breaker' | 'auction'>('broker')

const gdExchangeBrokerCode = `## cross_realm_exchange_broker.gd
## Godot 4.6 LTS - 跨界时空黑市汇率撮合与对冲经纪人
extends RefCounted
class_name CrossRealmExchangeBroker

static func compute_cross_realm_rate(
	base_rate: float,
	hedging_ratio: float,
	fee_rebate_pct: float
) -> Dictionary:
	var effective_rate: float = base_rate * (1.0 + (hedging_ratio - 1.0) * 0.15)
	var fee_discount: float = fee_rebate_pct / 100.0
	
	return {
		"settlement_rate": effective_rate,
		"rebated_fee_ratio": 0.05 * (1.0 - fee_discount),
		"is_optimal_arbitrage": hedging_ratio >= 3.0
	}
`

const gdGilBreakerCode = `## gil_inflation_circuit_breaker.gd
## Godot 4.6 LTS - 吉尔金币恶性通胀熔断器与央行托底中枢
extends RefCounted
class_name GilInflationCircuitBreaker

signal market_freeze_triggered(volatility_pct: float, intervention_fund: int)

static func evaluate_market_volatility(
	daily_change_pct: float,
	threshold_pct: float,
	breaker_active: bool
) -> Dictionary:
	var should_freeze: bool = absf(daily_change_pct) >= threshold_pct and breaker_active
	return {
		"is_frozen": should_freeze,
		"trigger_volatility": daily_change_pct,
		"intervention_required": should_freeze,
		"fund_draw_amount": 50000000 if should_freeze else 0
	}
`

const gdPrimalAuctionCode = `## primal_auction_bidding_system.gd
## Godot 4.6 LTS - 太古神兵圣遗物暗标盲盒竞拍状态机
extends RefCounted
class_name PrimalAuctionBiddingSystem

static func resolve_blind_bids(
	bids: Array[Dictionary],
	max_wealth_cap_unlocked: bool
) -> Dictionary:
	var highest_bid: int = 0
	var winning_bidder: String = ""
	
	for bid in bids:
		var amount: int = bid.get("amount", 0)
		if not max_wealth_cap_unlocked and amount > 99999999:
			amount = 99999999
		if amount > highest_bid:
			highest_bid = amount
			winning_bidder = bid.get("bidder", "ANONYMOUS")
			
	return {
		"winner": winning_bidder,
		"settled_amount": highest_bid,
		"cap_unlocked": max_wealth_cap_unlocked
	}
`

const currentPrimalAuctionCode = computed(() => {
  if (activePrimalCodeTab.value === 'broker') return gdExchangeBrokerCode
  if (activePrimalCodeTab.value === 'breaker') return gdGilBreakerCode
  return gdPrimalAuctionCode
})

const copyPrimalAuctionCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentPrimalAuctionCode.value).then(() => {
      message.success('Godot 4.6 LTS 经济金融源码已复制至剪贴板！')
    }).catch(() => {
      message.error('复制失败，请手动选取复制')
    })
  }
}

// ==========================================
// 太古全域经济平抑、跨界商会流通与物价通胀沙盘工坊 (v2.2.326)
// ==========================================
const scrollToGlobalEquilibriumStudio = () => {
  document.getElementById('global-equilibrium-studio')?.scrollIntoView({ behavior: 'smooth' })
}

const selectedEquilibriumArchetype = ref('merchant_coalition')
const equilibriumArchetypes = [
  {
    id: 'merchant_coalition',
    name: '全域商会自由贸易联合体',
    icon: '🏛️',
    typeTag: '零关税同盟',
    tagClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    desc: '全境各大城邦取消进出口关税壁垒，大宗物资跨界调拨零物流损耗。',
    financialTool: '关税全免协定 / 联合货运仓单',
    marketFunction: '物价双向拉平 / 消除投机套利'
  },
  {
    id: 'stabilization_fund',
    name: '太古央行吉尔物价平准基金',
    icon: '🏦',
    typeTag: '金币平准池',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    desc: '官方 1.5 亿吉尔蓄水池，在物价暴涨或暴跌时自动启动逆周期公开市场操作。',
    financialTool: '公开市场回购 / 逆周期宏观审慎',
    marketFunction: '抑制恶性通缩 / 稳定民生物资'
  },
  {
    id: 'aether_futures',
    name: '跨界期货对冲与以太期权',
    icon: '📜',
    typeTag: '期货期权',
    tagClass: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    desc: '针对太古矿石与万灵圣药锁定远期交割价，实现商贸企业 100% 风险套保。',
    financialTool: '30 天远期汇率锁 / 虚空看跌期权',
    marketFunction: '锁定生产成本 / 规避战乱溢价'
  },
  {
    id: 'aml_shield',
    name: '黑市地下钱庄洗钱审计盾',
    icon: '🛡️',
    typeTag: '反洗钱审计',
    tagClass: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    desc: '高维追踪异常大额资金流向，阻断虚空伪钞与黑市投机洗钱，保障合法私有资产。',
    financialTool: 'Merkle 链上穿透追踪 / 伪币拦截网',
    marketFunction: '资产合法证明 / 100% 兑付刚兑'
  }
]

const inflationRateBasisPct = ref(3.2)
const tradeTurnoverDays = ref(7)
const stabilizationFundMlnGil = ref(150)
const futuresHedgeCoveragePct = ref(85)

const enableZeroTariffPact = ref(true)
const enableExtremeVolatilityCircuitBreaker = ref(true)
const enableTailExchangeGreenChannel = ref(true)

const isEquilibriumSimulating = ref(false)
const equilibriumSimProgress = ref(0)
const equilibriumSimStep = ref('')
const equilibriumLogs = ref<string[]>([])

const cpiStabilityIndexPct = computed(() => {
  let val = 95.0 - Math.abs(inflationRateBasisPct.value - 3.0) * 0.45 + (futuresHedgeCoveragePct.value / 100) * 4.2
  return Math.min(99.9, parseFloat(val.toFixed(1)))
})

const dailyTradeThroughputGil = computed(() => {
  let base = 48000000 + (30 - tradeTurnoverDays.value) * 1200000 + stabilizationFundMlnGil.value * 50000
  if (enableZeroTariffPact.value) base *= 1.25
  return Math.round(base)
})

const marketLiquidityHealthPct = computed(() => {
  let pct = 82.0 + (stabilizationFundMlnGil.value / 500) * 13.0
  if (enableExtremeVolatilityCircuitBreaker.value) pct += 4.5
  return Math.min(99.8, parseFloat(pct.toFixed(1)))
})

const equilibriumTierBadge = computed(() => {
  if (cpiStabilityIndexPct.value > 97 && marketLiquidityHealthPct.value > 96) return 'EX·全域跨界大商会至尊金冠'
  if (cpiStabilityIndexPct.value > 93) return 'SSS·太古以太中央银行宗师'
  if (cpiStabilityIndexPct.value > 88) return 'SS·高阶城邦自贸同盟盟主'
  return 'S·标准商业金融行会'
})

const selectEquilibriumArchetype = (id: string) => {
  selectedEquilibriumArchetype.value = id
  const target = equilibriumArchetypes.find(a => a.id === id)
  if (target) {
    message.info(`已切入宏观金融模式：${target.name}（${target.typeTag}）`)
  }
}

const resetEquilibriumDefaults = () => {
  inflationRateBasisPct.value = 3.2
  tradeTurnoverDays.value = 7
  stabilizationFundMlnGil.value = 150
  futuresHedgeCoveragePct.value = 85
  enableZeroTariffPact.value = true
  enableExtremeVolatilityCircuitBreaker.value = true
  enableTailExchangeGreenChannel.value = true
  message.success('已恢复全域经济宏观平抑基准参数！')
}

const runGlobalEquilibriumSimulation = () => {
  if (isEquilibriumSimulating.value) return
  isEquilibriumSimulating.value = true
  equilibriumSimProgress.value = 0
  equilibriumLogs.value = []

  const steps = [
    { p: 20, step: '采集全境五阶商业城邦贸易物价指数 (CPI)...', log: '物价指数基准锁定：通胀率 ' + inflationRateBasisPct.value + '%，处于温和增长区间。' },
    { p: 45, step: '启动城邦商会零关税大篷车物流与清算枢纽...', log: '跨界免税协定生效，日均物流流速达成 ' + dailyTradeThroughputGil.value.toLocaleString() + ' G。' },
    { p: 70, step: '注入央行 1.5 亿平准基金并建立 ±10% 熔断冷冻保护...', log: '逆周期蓄水池就绪，市场流动性健康度达到 ' + marketLiquidityHealthPct.value + '%。' },
    { p: 90, step: '激活以太期货套保覆盖与七色尾巴自由汇兑绿通...', log: '套期保值覆盖率 ' + futuresHedgeCoveragePct.value + '%，物价稳定指数突破 ' + cpiStabilityIndexPct.value + '%。' },
    { p: 100, step: '经济金融沙盘推演收敛，金牌认证证书签发！', log: `稳定指数: ${cpiStabilityIndexPct.value}%，日均流速: ${dailyTradeThroughputGil.value.toLocaleString()} G，认证: ${equilibriumTierBadge.value}。` }
  ]

  let idx = 0
  const interval = setInterval(() => {
    if (idx < steps.length) {
      equilibriumSimProgress.value = steps[idx].p
      equilibriumSimStep.value = steps[idx].step
      equilibriumLogs.value.push(steps[idx].log)
      idx++
    } else {
      clearInterval(interval)
      isEquilibriumSimulating.value = false
      message.success('太古全域经济平抑沙盘推演圆满完成！')
    }
  }, 250)
}

const exportEquilibriumCert = () => {
  const cert = {
    standard: 'GODOT-4.6-LTS-GLOBAL-ECONOMY-SPEC',
    version: 'v2.2.326',
    timestamp: new Date().toISOString(),
    archetype: selectedEquilibriumArchetype.value,
    inflation_basis_pct: inflationRateBasisPct.value,
    turnover_days: tradeTurnoverDays.value,
    stabilization_fund_mln: stabilizationFundMlnGil.value,
    futures_hedge_pct: futuresHedgeCoveragePct.value,
    zero_tariff: enableZeroTariffPact.value,
    circuit_breaker: enableExtremeVolatilityCircuitBreaker.value,
    tail_green_channel: enableTailExchangeGreenChannel.value,
    cpi_stability_pct: cpiStabilityIndexPct.value,
    trade_throughput_gil: dailyTradeThroughputGil.value,
    liquidity_health_pct: marketLiquidityHealthPct.value,
    tier: equilibriumTierBadge.value,
    cert_sha256: '6b7c8d9e0f1a23456789abcdef0123456789abcdef0123456789abcdef326a'
  }
  const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `global_economy_equilibrium_cert_${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出全域经济平抑方案认证证书！')
}

const activeEquilibriumScriptTab = ref<'market' | 'logistics' | 'circuit_breaker'>('market')

const equilibriumScriptCodes = {
  market: `class_name GlobalMarketEquilibriumEngine
extends RefCounted

## 最终幻想：时空之轮 - 全域物价宏观均衡与通胀调控引擎
## 文件路径: res://scripts/economy/global_market_equilibrium_engine.gd
## 引擎版本: Godot Engine 4.6 LTS

signal cpi_index_updated(cpi_stability: float, total_liquidity: int)

static func evaluate_market_cpi(inflation_rate: float, hedge_pct: float) -> Dictionary:
    var stability: float = 95.0 - absf(inflation_rate - 3.0) * 0.45 + (hedge_pct / 100.0) * 4.2
    return {
        "stability_index": clampf(stability, 60.0, 99.9),
        "is_deflation": inflation_rate < 0.0,
        "status": "MARKET_EQUILIBRIUM_HEALTHY"
    }
`,

  logistics: `class_name MerchantGuildLogisticsHub
extends RefCounted

## 最终幻想：时空之轮 - 跨界商会物流周转与免税清算中心
## 文件路径: res://scripts/economy/merchant_guild_logistics_hub.gd
## 引擎版本: Godot Engine 4.6 LTS

static func dispatch_cargo_caravan(days: int, zero_tariff: bool) -> Dictionary:
    var efficiency_multiplier: float = 1.0 + (30.0 - float(days)) / 30.0 * 0.35
    if zero_tariff:
        efficiency_multiplier *= 1.25
        
    return {
        "turnover_speed": days,
        "efficiency_multiplier": efficiency_multiplier,
        "loss_rate": 0.0 if zero_tariff else 0.05
    }
`,

  circuit_breaker: `class_name MacroVolatilityCircuitBreaker
extends RefCounted

## 最终幻想：时空之轮 - 极端波动日内熔断与平准基金干预器
## 文件路径: res://scripts/economy/macro_volatility_circuit_breaker.gd
## 引擎版本: Godot Engine 4.6 LTS

static func check_circuit_breaker(price_delta_pct: float, threshold: float = 10.0) -> Dictionary:
    var triggered: bool = absf(price_delta_pct) >= threshold
    return {
        "breaker_triggered": triggered,
        "freeze_duration_minutes": 30 if triggered else 0,
        "auto_fund_injection": 50000000 if triggered else 0
    }
`
}

const currentEquilibriumScriptCode = computed(() => {
  return equilibriumScriptCodes[activeEquilibriumScriptTab.value]
})

const copyEquilibriumScript = () => {
  navigator.clipboard.writeText(currentEquilibriumScriptCode.value)
  message.success('已复制 Godot 4.6 LTS 宏观金融源码到剪贴板！')
}

</script>

<style scoped>
.text-glow-amber {
  text-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
</style>
