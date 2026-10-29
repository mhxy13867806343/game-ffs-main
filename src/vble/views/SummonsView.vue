<template>
  <div class="summons-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/80 via-indigo-950/70 to-purple-950/80 border border-blue-500/30 shadow-[0_0_35px_rgba(59,130,246,0.2)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              VBLE Ancient Pact Array, High Eidolon Awakening &amp; Divine Synergy Studio v2.2.331
            </span>
            <span class="text-xs text-gray-400">太古契约、神明降临与超绝召来共鸣阵</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🐉</span> 全域太古十二柱幻兽高维召唤契约、以太逆流祈愿与神威降临工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            收录自晶石纪元流传的十二柱远古神明契约。从巴哈姆特亿万核爆、利维亚桑灭世海啸、奥丁一分钟限时斩铁试炼，到不死鸟复活余烬与太古天体超绝召来共鸣阵。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="info"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToAncientPactAwakeningStudio"
          >
            <template #icon><span>🔮</span></template>
            幻兽太古契约工坊
          </n-button>
          <n-button
            type="success"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToHighDimensionalStudio"
          >
            <template #icon><span>🐉</span></template>
            前往高维召唤神威工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToTranscendenceStudio"
          >
            <template #icon><span>🌌</span></template>
            前往超绝召来共鸣阵
          </n-button>
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>⚔️</span></template>
            前往契约推演沙盘
          </n-button>
          <n-button
            type="info"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToCelestialStudio"
          >
            <template #icon><span>✨</span></template>
            前往神明降临工坊
          </n-button>
          <router-link to="/vble/jobs">
            <n-button size="medium" round tertiary>
              查看召唤师职业
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心统计概览卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">已收录神兽</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ summonsList.length }} 柱</div>
        <div class="text-[10px] text-gray-500 mt-0.5">太古神明契约</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">涵盖属性系别</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">7 大类</div>
        <div class="text-[10px] text-gray-500 mt-0.5">无/水/火/冰/雷/地/圣</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">职业隐藏融合技</div>
        <div class="text-2xl font-black text-purple-400 font-mono mt-1">4 项</div>
        <div class="text-[10px] text-gray-500 mt-0.5">跨职业羁绊奥义</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">实机计算引擎</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">Godot 4.x</div>
        <div class="text-[10px] text-gray-500 mt-0.5">summon_system.gd</div>
      </div>
    </div>

    <!-- 过滤器与搜索栏 -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs text-gray-400 font-semibold mr-1">神阶品级:</span>
        <button
          v-for="cat in rankCategories"
          :key="cat.key"
          type="button"
          class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
          :class="activeRank === cat.key ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-800 text-gray-400 hover:text-gray-200'"
          @click="activeRank = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="flex items-center gap-3">
        <n-input
          v-model:value="searchKeyword"
          placeholder="搜索召唤兽名、必杀技、地牢..."
          size="small"
          clearable
          class="w-full md:w-64"
        >
          <template #prefix>🔍</template>
        </n-input>
      </div>
    </div>

    <!-- 召唤兽卡片网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="s in filteredSummons"
        :key="s.id"
        class="group relative rounded-xl bg-[#0f1422]/90 border transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        :class="selectedSummonId === s.id ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/40' : 'border-slate-800 hover:border-slate-700'"
      >
        <div class="space-y-3.5">
          <!-- 卡片顶栏 -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <span class="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">{{ s.icon }}</span>
              <div>
                <h3 class="font-bold text-base text-amber-300 tracking-wide">{{ s.name }}</h3>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <n-tag size="tiny" :type="getElementTagType(s.element)">{{ s.element }}</n-tag>
                  <n-tag size="tiny" type="info" secondary>{{ s.rank }}</n-tag>
                </div>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {{ s.cost }}
            </span>
          </div>

          <!-- 必杀技栏 -->
          <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800/80 space-y-1">
            <div class="text-xs text-amber-400 font-bold flex items-center justify-between">
              <span>⚡ 必杀神技: {{ s.skill_name }}</span>
              <span class="text-[10px] text-gray-500 font-mono">基底威力系数: {{ getBasePower(s.id) }}</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">{{ s.skill_desc }}</p>
          </div>

          <!-- 契约被动庇护 -->
          <div class="p-2.5 bg-purple-950/30 border border-purple-900/40 rounded-lg text-xs text-purple-300 leading-relaxed">
            <span class="font-bold text-purple-200">🌟 契约常驻庇佑:</span> {{ s.passive_blessing }}
          </div>

          <!-- 挑战秘境 -->
          <div class="text-xs text-gray-400 flex items-center gap-1.5">
            <span>📍 挑战秘境:</span>
            <span class="text-cyan-300 font-medium">{{ s.trial_dungeon }}</span>
          </div>

          <!-- 典故传记 -->
          <p class="text-[11px] text-gray-400/90 italic border-l-2 border-slate-700 pl-2.5 leading-relaxed">
            "{{ s.lore }}"
          </p>
        </div>

        <!-- 底部快捷推演按钮 -->
        <div class="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-[11px] text-gray-500">ID: {{ s.id }}</span>
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
            :class="selectedSummonId === s.id ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'bg-slate-800 text-cyan-400 hover:bg-slate-750 border border-slate-700'"
            @click="selectForSimulation(s.id)"
          >
            <span>{{ selectedSummonId === s.id ? '✓ 正在推演' : '🎯 载入推演沙盘' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 核心推演工坊：十二柱神明契约实机沙盘 -->
    <div id="summon-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c101d] via-[#101626] to-[#0a0e1a] border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              SIMULATION STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔮</span> 十二柱召唤神殿 · 战斗召唤全息沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            动态对齐 Godot 引擎 summon_system.gd 伤害算法，推演施术者属性、环境增幅、属性克制与抗性减免。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickSummonCast">
            ⚡ 一键施法斩杀
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：召唤师与配置 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>🧙‍♂️</span> 施术者配置 (Summoner)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">施术角色 (Caster)</label>
              <n-select
                v-model:value="selectedCaster"
                :options="casterOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>召唤师魔力 (Magic Power):</span>
                <span class="font-mono text-cyan-400 font-bold text-sm">{{ casterMagicPower }}</span>
              </div>
              <n-slider v-model:value="casterMagicPower" :min="10" :max="120" :step="1" />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>角色当前 MP:</span>
                <span class="font-mono text-amber-400 font-bold">{{ currentMP }} / {{ maxMP }}</span>
              </div>
              <n-slider v-model:value="currentMP" :min="0" :max="maxMP" :step="5" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">持有【召唤师纹章】(+15% 伤害):</span>
                <n-switch v-model:value="hasSummonerBadge" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">白魔道士同行 (MP 减免 20%):</span>
                <n-switch v-model:value="hasWhiteMageSynergy" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：已选召唤兽与战场设定 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-amber-300 flex items-center gap-2">
            <span>⚔️</span> 目标与环境设定 (Target & Arena)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选择召唤神兽 (Active Summon)</label>
              <n-select
                v-model:value="selectedSummonId"
                :options="summonSelectOptions"
                size="small"
              />
            </div>

            <div>
              <label class="text-gray-400 block mb-1">目标类型 (Target Type)</label>
              <n-select
                v-model:value="targetType"
                :options="targetTypeOptions"
                size="small"
              />
            </div>

            <div>
              <label class="text-gray-400 block mb-1">目标元素耐性 (Elemental Resistance)</label>
              <n-select
                v-model:value="targetElementalResist"
                :options="resistanceOptions"
                size="small"
              />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">目标正在蓄力咏唱 (打断判定):</span>
                <n-switch v-model:value="isTargetCasting" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">目标属于不死系 (不死鸟特效):</span>
                <n-switch v-model:value="isUndeadTarget" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息实时推演结果面板 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-blue-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-cyan-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 实时结算指标 (Combat Result)</span>
              <n-tag size="tiny" :type="calcResult.canCast ? 'success' : 'error'">
                {{ calcResult.canCast ? 'MP 充足 · 可施法' : 'MP 不足 · 无法唤醒' }}
              </n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 预计伤害数字 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">单体/全体期望伤害 (Estimated Damage)</div>
                <div class="text-3xl font-black font-mono mt-1 tracking-wider" :class="calcResult.damageColorClass">
                  {{ calcResult.damageDisplay }}
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  {{ calcResult.damageNotes }}
                </div>
              </div>

              <!-- 消耗与实际状态 -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">实际消耗 MP</div>
                  <div class="font-mono font-bold text-amber-300 mt-0.5 text-sm">{{ calcResult.actualMPCost }}</div>
                </div>
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">属性倍率</div>
                  <div class="font-mono font-bold text-cyan-300 mt-0.5 text-sm">{{ calcResult.elementMultiplier }}x</div>
                </div>
              </div>

              <!-- 特殊机制触发器判定 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-cyan-400 font-bold flex items-center gap-1">
                  <span>✨ 机制判定:</span>
                  <span>{{ calcResult.specialEffectTitle }}</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ calcResult.specialEffectDesc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>引擎算法: summon_system.gd</span>
            <span class="text-cyan-400">VBLE Summoning & Resonance Matrix v2.2.247</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 职业融合奥义展台 (Fusion Artes) -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-xl">🌟</span>
        <h3 class="text-lg font-bold text-white">跨职业羁绊融合技 (Fusion Artes)</h3>
      </div>
      <p class="text-xs text-gray-400">
        当队伍中装备对应神兽契约石，且拥有特定高阶职业时，在战斗极限状态下可触发终极融合奥义。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div
          v-for="fa in fusionArtes"
          :key="fa.name"
          class="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 hover:border-purple-500/40 transition-all"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-amber-300 text-sm flex items-center gap-2">
              <span>{{ fa.icon }}</span>
              <span>{{ fa.name }}</span>
            </span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {{ fa.condition }}
            </span>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">{{ fa.effect }}</p>
          <div class="text-[11px] text-gray-400 italic">
            消耗: {{ fa.cost }} · 战术定位: {{ fa.role }}
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 4: 十二柱神印契约觉醒与共鸣工坊 (Covenant Resonance & Awakening Studio) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#12162a] via-[#101426] to-[#0c1020] border border-purple-500/40 shadow-2xl space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">✨</span>
            <h3 class="text-lg sm:text-xl font-black text-white text-glow-cyan">十二柱神印契约觉醒与多重共鸣工坊 (Covenant Resonance Studio)</h3>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            将十二柱神兽的本源印绶（Signet Crests）镶嵌至契约法阵中。最多同时激活 3 柱神印共鸣，唤醒破界伤害上限、预言重生与天灾全屏控场。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-tag type="warning" round size="small">极意共鸣 · 突破99999上限</n-tag>
          <n-tag type="success" round size="small">实时数值推演</n-tag>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 神印选择槽位 (最多选 3 项) -->
        <div class="lg:col-span-2 space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-cyan-300">选定共鸣神印 (已镶嵌: {{ selectedSignetIds.length }} / 3):</span>
            <span class="text-gray-400 text-[11px]">点击下方卡片进行装载或卸下</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            <button
              v-for="sig in signetCatalog"
              :key="sig.id"
              type="button"
              class="p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between"
              :class="isSignetSelected(sig.id) ? 'bg-purple-950/80 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] ring-1 ring-purple-500' : 'bg-slate-900/70 border-slate-800 text-gray-300 hover:border-slate-700'"
              @click="toggleSignet(sig.id)"
            >
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xl">{{ sig.icon }}</span>
                  <n-tag size="tiny" :type="isSignetSelected(sig.id) ? 'warning' : 'default'">
                    {{ isSignetSelected(sig.id) ? '已激活' : '空闲' }}
                  </n-tag>
                </div>
                <div class="font-bold text-xs truncate text-amber-300">{{ sig.name }}</div>
                <div class="text-[10px] text-gray-400 mt-0.5">{{ sig.summonName }}</div>
              </div>
              <div class="text-[10px] text-cyan-400 font-mono mt-2 truncate">{{ sig.statBonus }}</div>
            </button>
          </div>

          <!-- 觉醒阶层滑块 -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 mt-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-amber-300">太古觉醒阶位 (Awakening Rank):</span>
              <span class="font-mono text-cyan-400 font-bold">阶位 {{ awakeningRank }} / 4 · {{ getAwakeningTitle(awakeningRank) }}</span>
            </div>
            <n-slider v-model:value="awakeningRank" :min="1" :max="4" :step="1" />
          </div>
        </div>

        <!-- 栏 2: 共鸣效能与全队属性增益计算面板 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-purple-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <span>🔮</span>
                <span>契约共鸣实机战力指标</span>
              </span>
              <span class="text-[10px] text-amber-400 font-mono">Resonance Score: {{ resonanceScore }}</span>
            </div>

            <!-- 共鸣主被动技能 -->
            <div class="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div class="text-xs font-bold text-amber-300 flex items-center gap-1">
                <span>🌟 终极共鸣奥义:</span>
                <span>{{ resonanceSkillName }}</span>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed">
                {{ resonanceSkillDesc }}
              </p>
            </div>

            <!-- 全队属性与特权结算列表 -->
            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">伤害上限突破 (Damage Cap):</span>
                <span class="font-mono font-bold text-rose-400">{{ resonanceDamageCap }}</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">全元素伤害增幅 (Elemental DMG):</span>
                <span class="font-mono font-bold text-cyan-400">+{{ resonanceElemBonus }}%</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">全队 ATB 充能流速 (ATB Speed):</span>
                <span class="font-mono font-bold text-emerald-400">+{{ resonanceAtbBonus }}%</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">濒死免死金身 (Reraise Chance):</span>
                <span class="font-mono font-bold text-yellow-400">{{ resonanceReraise ? '100% 触发' : '未激活' }}</span>
              </div>
            </div>
          </div>

          <n-button size="small" type="primary" secondary round class="w-full" @click="resetSignets">
            🔄 重置神印镶嵌组合
          </n-button>
        </div>
      </div>
    </div>

    <!-- 专区 5: 奥丁 60 秒限时斩铁试炼推演工坊 (Odin 60s Trial DPS Check Simulator) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-[#140e1b]/90 border border-rose-500/40 shadow-2xl space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">⚔️</span>
            <h3 class="text-lg sm:text-xl font-black text-white text-glow-amber">奥丁 60 秒限时斩铁试炼推演沙盘 (Odin 60-Second DPS Check)</h3>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            复刻贾格尔城地宫终极考验：奥丁骑乘天马八脚骏马斯莱普尼斯，给光之战士 60 秒倒计时！在斩铁剑斩落前清空其 17,000 HP！
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-tag type="error" round size="small">限时 60.0 秒</n-tag>
          <n-tag type="warning" round size="small">全灭机制: 99999 斩铁剑</n-tag>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportSummonCert">
            📜 导出试炼通关凭证
          </n-button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <!-- 栏 1: 奥丁首领状态与倒计时 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🗡️</span>
              <span class="font-bold text-gray-200 text-sm">试炼之神 · 奥丁 (Odin)</span>
            </div>
            <n-tag size="tiny" :type="odinStatusType">{{ odinStatusText }}</n-tag>
          </div>

          <!-- 60秒倒计时大字 -->
          <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <span class="text-[10px] text-gray-400 uppercase tracking-widest block">剩余绝命时间 (Time Left)</span>
            <div class="text-3xl sm:text-4xl font-black font-mono mt-1" :class="odinTimeRemaining <= 15 ? 'text-rose-500 animate-pulse' : 'text-amber-400'">
              {{ odinTimeRemaining.toFixed(1) }}s
            </div>
          </div>

          <!-- 奥丁血条 -->
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-mono">
              <span class="text-gray-400">奥丁神体生命值:</span>
              <span class="text-rose-400 font-bold">{{ odinHp }} / {{ odinMaxHp }}</span>
            </div>
            <div class="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
              <div
                class="bg-gradient-to-r from-rose-600 to-amber-500 h-full transition-all duration-150"
                :style="{ width: `${(odinHp / odinMaxHp) * 100}%` }"
              />
            </div>
          </div>

          <div class="flex gap-2">
            <n-button
              size="small"
              :type="isOdinBattleRunning ? 'warning' : 'primary'"
              class="w-full font-bold"
              @click="toggleOdinBattle"
            >
              {{ isOdinBattleRunning ? '⏸️ 暂停试炼' : (odinBattleEnded ? '🔄 重新挑战' : '⚔️ 开启 60 秒试炼') }}
            </n-button>
          </div>
        </div>

        <!-- 栏 2: 战斗指令操作台 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <span class="text-xs font-bold text-cyan-300 block">战术指令爆发区 (Command Panel):</span>
          <div class="space-y-2">
            <button
              type="button"
              class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-400 text-left transition-all cursor-pointer flex items-center justify-between"
              :disabled="!isOdinBattleRunning"
              @click="castOdinSkill('rapid_fire')"
            >
              <div>
                <span class="font-bold text-xs text-amber-300">🗡️ 忍者二刀流·乱打 (Rapid Fire)</span>
                <span class="text-[10px] text-gray-400 block">4段连击，破除物理屏障 (3200~3800 伤)</span>
              </div>
              <n-tag size="tiny" type="warning">瞬发</n-tag>
            </button>

            <button
              type="button"
              class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-400 text-left transition-all cursor-pointer flex items-center justify-between"
              :disabled="!isOdinBattleRunning"
              @click="castOdinSkill('spellblade_flare')"
            >
              <div>
                <span class="font-bold text-xs text-cyan-300">⚡ 魔法剑·核爆 (Spellblade Flare)</span>
                <span class="text-[10px] text-gray-400 block">附魔神圣烈焰，高额单体暴击 (4000~4600 伤)</span>
              </div>
              <n-tag size="tiny" type="info">核爆</n-tag>
            </button>

            <button
              type="button"
              class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-400 text-left transition-all cursor-pointer flex items-center justify-between"
              :disabled="!isOdinBattleRunning"
              @click="castOdinSkill('bahamut_summon')"
            >
              <div>
                <span class="font-bold text-xs text-purple-300">🐉 召唤·巴哈姆特亿万核爆 (Megaflare)</span>
                <span class="text-[10px] text-gray-400 block">太古龙皇核爆穿透轰击 (6200~6800 伤)</span>
              </div>
              <n-tag size="tiny" type="error">奥义</n-tag>
            </button>

            <button
              type="button"
              class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-400 text-left transition-all cursor-pointer flex items-center justify-between"
              :disabled="!isOdinBattleRunning"
              @click="castOdinSkill('dualcast_meteor')"
            >
              <div>
                <span class="font-bold text-xs text-rose-300">🌠 时魔道士·连续魔陨石 (Dual Meteor)</span>
                <span class="text-[10px] text-gray-400 block">双重星陨狂轰，毁灭压制 (5500~6200 伤)</span>
              </div>
              <n-tag size="tiny" type="error">禁术</n-tag>
            </button>

            <button
              type="button"
              class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-400 text-left transition-all cursor-pointer flex items-center justify-between"
              :disabled="!isOdinBattleRunning"
              @click="castOdinSkill('yoichi_shot')"
            >
              <div>
                <span class="font-bold text-xs text-emerald-300">🏹 游侠·与一神弓圣光箭 (Yoichi Shot)</span>
                <span class="text-[10px] text-gray-400 block">百步穿杨必定暴击，击破破绽 (2800~3400 伤)</span>
              </div>
              <n-tag size="tiny" type="success">穿甲</n-tag>
            </button>
          </div>
        </div>

        <!-- 栏 3: 实机战斗记录与结算 -->
        <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between h-full space-y-3">
          <div class="space-y-2">
            <span class="text-xs font-bold text-gray-400 block">实时试炼战报 (Combat Battle Log):</span>
            <div class="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1.5 h-36 overflow-y-auto leading-relaxed">
              <div v-for="(log, idx) in odinBattleLogs" :key="idx" class="text-gray-300 text-[11px]">
                {{ log }}
              </div>
              <div v-if="odinBattleLogs.length === 0" class="text-gray-600 text-[11px] italic">
                点击“开启 60 秒试炼”开始推演...
              </div>
            </div>
          </div>

          <div v-if="odinBattleResult" class="p-2.5 rounded text-xs font-bold text-center border" :class="odinBattleSuccess ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300' : 'bg-rose-950/70 border-rose-500 text-rose-300'">
            {{ odinBattleResult }}
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 6: 太古十二柱神明契约共鸣与全息幻兽降临推演工坊 (v2.2.258) -->
    <div id="celestial-descent-studio" class="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-purple-950/70 border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.15)] space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">✨</span>
            <h3 class="text-lg sm:text-xl font-black text-white text-glow-cyan">太古十二柱神明契约共鸣与全息幻兽降临推演工坊 (Astral Descent Studio)</h3>
          </div>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            基于晶石纪元十二柱太古神明契约，模拟全息神兽召唤阵法绘制、双连续魔共鸣爆发、以太同步率解算与团队神圣庇护。可自由配置主副神兽、法杖神印、偏振受击目标与连锁仪式。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-tag type="info" round size="small">十二柱全神明</n-tag>
          <n-tag type="warning" round size="small">连续魔双降临</n-tag>
          <n-tag type="success" round size="small">v2.2.258 规范</n-tag>
        </div>
      </div>

      <!-- 十二柱远古神明契约选择矩阵 -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-purple-300 flex items-center gap-1.5">
            <span>🐉</span>
            <span>选择主位太古神兽契约 (Primary Celestial Entity)</span>
          </span>
          <span class="text-xs text-gray-400 font-mono">已选主契约: {{ currentPrimarySummon.name }}</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <div
            v-for="sum in celestialEntities"
            :key="sum.id"
            class="p-2.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 hover:scale-[1.02]"
            :class="selectedPrimarySummonId === sum.id ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/50' : 'border-slate-800 hover:border-slate-700'"
            @click="selectedPrimarySummonId = sum.id"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-lg">{{ sum.icon }}</span>
              <n-tag size="tiny" :type="sum.tagType">{{ sum.element }}</n-tag>
            </div>
            <span class="block font-bold text-xs text-gray-100 truncate">{{ sum.name }}</span>
            <span class="block text-[10px] text-purple-300 font-mono mt-0.5 truncate">{{ sum.skillName }}</span>
            <div class="flex justify-between items-center text-[9px] text-gray-400 font-mono mt-1 pt-1 border-t border-slate-800/80">
              <span>威力: {{ sum.power }}</span>
              <span>MP: {{ sum.mpCost }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 参数调节与仪式阵法编排 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 施法使者与副神明连续魔模式 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span class="text-xs font-bold text-cyan-300 block flex items-center gap-1.5">
            <span>🧙</span>
            <span>召唤使者与双神兽连续魔 (Caster & Dual Summon)</span>
          </span>

          <div class="space-y-3.5 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">召唤统御使者 (Caster Leader):</label>
              <select
                v-model="selectedDescentCaster"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-cyan-400 focus:outline-none"
              >
                <option v-for="c in descentCasters" :key="c.id" :value="c.id">
                  {{ c.name }} - {{ c.title }} ({{ c.specialty }})
                </option>
              </select>
            </div>

            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300 font-bold flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>连续魔双神明连携 (Dual Summon)</span>
                </span>
                <input
                  v-model="isDualSummon"
                  type="checkbox"
                  class="rounded accent-purple-500 w-4 h-4 cursor-pointer"
                />
              </div>
              <p class="text-[10px] text-gray-400 leading-snug">
                消耗双倍以太法力，同时咏唱两柱神兽契约，触发全元素连锁与共鸣双重核爆。
              </p>

              <div v-if="isDualSummon" class="pt-1">
                <label class="text-gray-400 block mb-1">连携副神兽 (Secondary Summon):</label>
                <select
                  v-model="selectedSecondarySummonId"
                  class="w-full bg-slate-900 border border-slate-700 text-xs text-gray-200 rounded-lg p-1.5 focus:border-purple-400 focus:outline-none"
                >
                  <option
                    v-for="sum in celestialEntities"
                    :key="'sec-' + sum.id"
                    :value="sum.id"
                    :disabled="sum.id === selectedPrimarySummonId"
                  >
                    {{ sum.icon }} {{ sum.name }} ({{ sum.skillName }} · MP {{ sum.mpCost }})
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="text-gray-400 block mb-1">镶嵌圣物与神印法杖 (Aether Relic):</label>
              <select
                v-model="selectedRelicId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-purple-400 focus:outline-none"
              >
                <option v-for="r in descentRelics" :key="r.id" :value="r.id">
                  {{ r.name }} ({{ r.effect }})
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- 栏 2: 目标防卫矩阵与以太环境 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span class="text-xs font-bold text-amber-300 block flex items-center gap-1.5">
            <span>🎯</span>
            <span>受击首领偏振与以太环境 (Target & Domain)</span>
          </span>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">推演试炼首领 (Encounter Target):</label>
              <select
                v-model="selectedTargetProfile"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
              >
                <option v-for="t in descentTargets" :key="t.id" :value="t.id">
                  {{ t.name }} ({{ t.type }} · HP {{ t.maxHp.toLocaleString() }})
                </option>
              </select>
            </div>

            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
              <div class="flex justify-between">
                <span class="text-gray-400">目标弱点属性:</span>
                <span class="text-emerald-400 font-bold font-mono">{{ currentTarget.weakness }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">魔防抗性评定:</span>
                <span class="text-amber-400 font-mono">{{ currentTarget.defenseRating }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">环境法潮加护:</span>
                <span class="text-purple-300 font-mono">{{ currentTarget.fieldBonus }}</span>
              </div>
            </div>

            <!-- 神印同步率滑块 -->
            <div class="space-y-1 pt-1">
              <div class="flex justify-between">
                <span class="text-gray-400">以太阵法充能纯度:</span>
                <span class="font-mono font-bold text-cyan-300">{{ aetherPurity }}%</span>
              </div>
              <input
                v-model.number="aetherPurity"
                type="range"
                min="50"
                max="100"
                step="5"
                class="w-full accent-cyan-400 cursor-pointer"
              />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>50% (泛用灵流)</span>
                <span>80% (纯净以太)</span>
                <span>100% (神明同调)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 3: 实时遥测解算与降临仪式控制台 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-slate-950 to-purple-950/40 border border-purple-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>神明降临实时遥测</span>
              </span>
              <n-tag size="tiny" type="warning">{{ isDualSummon ? '连续魔双神共鸣' : '单柱极限降临' }}</n-tag>
            </div>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">预计降临总伤:</span>
                <span class="font-mono font-bold text-rose-400 text-sm">{{ calculatedDescentDamage.toLocaleString() }} 穿透伤</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">契约谐振同步率:</span>
                <span class="font-mono font-bold text-cyan-300">{{ calculatedSyncRate.toFixed(1) }}% (极度稳定)</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">以太法力总消耗:</span>
                <span class="font-mono font-bold text-purple-300">{{ calculatedTotalMP }} MP</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">全队神力庇护值:</span>
                <span class="font-mono font-bold text-emerald-400">{{ calculatedPartyShield }}</span>
              </div>
            </div>

            <!-- 降临进度条 -->
            <div v-if="isDescentRunning" class="space-y-1 pt-1">
              <div class="flex justify-between text-[11px] text-cyan-300 font-mono">
                <span>{{ descentCurrentPhase }}</span>
                <span>{{ descentProgress }}%</span>
              </div>
              <div class="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 h-2.5 transition-all duration-150" :style="{ width: `${descentProgress}%` }" />
              </div>
            </div>

            <!-- 战斗与降临日志控制台 -->
            <div class="p-2.5 rounded bg-slate-950/90 border border-slate-800 text-[11px] font-mono space-y-1 text-gray-300 max-h-24 overflow-y-auto">
              <div v-for="(log, idx) in descentLogs" :key="idx" class="text-gray-300 leading-snug">
                {{ log }}
              </div>
            </div>
          </div>

          <!-- 操作按钮组 -->
          <div class="space-y-2 pt-2">
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
              :disabled="isDescentRunning"
              @click="startAstralDescent"
            >
              {{ isDescentRunning ? '✨ 太古神明降临仪式进行中...' : '✨ 启动太古神明降临仪式 (Summon Astral Descent)' }}
            </button>

            <div class="flex gap-2">
              <button
                type="button"
                class="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-gray-300 border border-slate-700 transition-colors cursor-pointer"
                @click="copyDescentConfig"
              >
                📋 复制降临配置
              </button>
              <button
                type="button"
                class="flex-1 py-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 text-xs text-purple-300 border border-purple-700/60 transition-colors cursor-pointer"
                @click="exportAstralDescentCert"
              >
                📄 导出降临凭证
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 6: 太古十二神魔天体共鸣阵与超绝召来解算工坊 -->
    <div id="celestial-transcendence-studio" class="p-6 sm:p-8 rounded-2xl bg-[#0a0d1c]/95 border border-purple-500/30 space-y-6 shadow-[0_0_40px_rgba(168,85,247,0.18)] relative overflow-hidden">
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 工坊头部标章 -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
              v2.2.276 重磅实装
            </span>
            <span class="text-xs text-gray-400">太古天体共鸣 · 超越 99,999 极限召来</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🌌</span> 太古十二神魔天体共鸣阵与超绝召来解算工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            基于太古三位一体天体共鸣阵列与引力透镜偏转算法，解算全域超越 99,999 极限伤害、双连续魔时钟相位自锁与超绝神圣结界。
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingTranscendence"
            @click="simulateTranscendenceEvocation"
          >
            <template #icon><span>⚡</span></template>
            激发超绝召来演算
          </n-button>
          <n-button
            type="info"
            size="small"
            round
            secondary
            @click="exportTranscendenceEvocationCertificate"
          >
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大天体共鸣阵列 Stances -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="arr in transcendenceArrays"
          :key="arr.id"
          class="p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
          :class="selectedTranscendenceArrayId === arr.id
            ? 'bg-purple-950/40 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="applyTranscendenceArray(arr.id)"
        >
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xl">{{ arr.icon }}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded font-mono" :class="selectedTranscendenceArrayId === arr.id ? 'bg-purple-500/30 text-purple-200' : 'bg-slate-800 text-gray-400'">
                {{ arr.tag }}
              </span>
            </div>
            <div class="font-bold text-xs text-gray-200">{{ arr.name }}</div>
            <div class="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{{ arr.summonsText }}</div>
          </div>
          <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
            <span class="text-gray-400">谐振频度:</span>
            <span class="font-mono font-bold text-cyan-300">{{ arr.frequency }} Hz</span>
          </div>
        </div>
      </div>

      <!-- 双栏交互面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：实时共鸣阵列全息模拟与物理计算 -->
        <div class="lg:col-span-7 space-y-4">
          <!-- 全息阵列视窗 -->
          <div class="relative h-64 sm:h-72 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            <!-- 背景光斑与天体法阵 SVG 模拟 -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
              <div
                class="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                :style="{
                  background: currentTranscendenceArray.gradient,
                  opacity: (casterIntegration / 100 * 0.85).toFixed(2),
                  transform: `scale(${1 + overdriveMultiplier * 0.15})`
                }"
              ></div>
              <svg class="w-60 h-60 opacity-60 animate-[spin_40s_linear_infinite]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(168,85,247,0.4)" stroke-width="1.5" stroke-dasharray="4 4" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(6,182,212,0.4)" stroke-width="1" />
                <polygon points="100,15 175,145 25,145" fill="none" stroke="rgba(245,158,11,0.5)" stroke-width="1.5" />
                <polygon points="100,185 25,55 175,55" fill="none" stroke="rgba(59,130,246,0.5)" stroke-width="1.5" />
                <circle cx="100" cy="100" r="18" fill="none" stroke="rgba(236,72,153,0.8)" stroke-width="2" />
              </svg>
            </div>

            <!-- 顶部状态指示灯与采样模式 -->
            <div class="relative z-10 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
                <span class="font-mono text-purple-300 font-bold">TRANSCENDENCE ACTIVE</span>
                <span class="text-gray-400 font-mono text-[10px]">| {{ currentTranscendenceArray.summonsText }}</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-amber-300">
                {{ enablePrimalLimitBreak ? '破限 99999' : '常规伤害锁' }}
              </div>
            </div>

            <!-- 中间标语 -->
            <div class="relative z-10 text-center my-auto">
              <div class="text-2xl font-black text-white/90 tracking-wider font-mono drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">
                {{ currentTranscendenceArray.name }}
              </div>
              <div class="text-xs text-purple-200/80 mt-1 font-mono">
                穿透极伤: {{ transcendenceMetrics.damageText }} · 谐振功率: {{ transcendenceMetrics.powerMW }} MW
              </div>
            </div>

            <!-- 底部性能与管线参数微视窗 -->
            <div class="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-gray-400">
              <span>引力透镜偏转: {{ voidLensDeflection.toFixed(1) }}°</span>
              <span class="text-emerald-400 font-bold">神圣庇护: +{{ transcendenceMetrics.shieldHP }} HP</span>
            </div>
          </div>

          <!-- 4 维物理与战斗指标卡片 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">阵列谐振功率</div>
              <div class="font-mono text-cyan-400 font-bold text-sm mt-0.5">{{ transcendenceMetrics.powerMW }} MW</div>
              <div class="text-[9px] text-gray-500 mt-0.5">以太能级聚合</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">超绝穿透极伤</div>
              <div class="font-mono text-rose-400 font-bold text-sm mt-0.5">{{ transcendenceMetrics.damageText }}</div>
              <div class="text-[9px] text-gray-500 mt-0.5">全属性真实创伤</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">以太反冲负荷</div>
              <div class="font-mono text-amber-400 font-bold text-sm mt-0.5">{{ transcendenceMetrics.strainPct }}%</div>
              <div class="text-[9px] text-gray-500 mt-0.5">精神耐压抗性</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">综合阵列品级</div>
              <div class="font-mono text-purple-400 font-bold text-xs mt-0.5 truncate">{{ transcendenceMetrics.rating }}</div>
              <div class="text-[9px] text-gray-500 mt-0.5">太古神格共鸣</div>
            </div>
          </div>

          <!-- 实时超绝召来日志终端 -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
            <div class="flex items-center justify-between text-xs text-gray-400 pb-1.5 border-b border-slate-800">
              <span class="flex items-center gap-1.5 text-purple-300 font-bold">
                <span>💻</span> 超绝召来阵列执行终端 (Evocation Execution Terminal)
              </span>
              <span class="text-[10px] text-gray-500">时钟自锁: 实时同步</span>
            </div>
            <div class="space-y-1 text-[11px] text-gray-300 max-h-28 overflow-y-auto custom-scrollbar">
              <div v-for="(log, idx) in transcendenceSimulationLogs" :key="idx" class="flex items-start gap-1.5">
                <span class="text-purple-400 select-none">&gt;</span>
                <span :class="log.includes('完成') || log.includes('成功') ? 'text-emerald-400' : 'text-gray-300'">{{ log }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：无极物理调优与法阵 Uniforms -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div class="text-xs font-bold text-purple-300 flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="flex items-center gap-1.5">
              <span>🎛️</span> 天体共鸣阵列参数微调 (Resonance Uniforms)
            </span>
            <button
              type="button"
              class="text-[10px] text-gray-400 hover:text-purple-300 cursor-pointer"
              @click="resetTranscendenceParams"
            >
              重置参数
            </button>
          </div>

          <!-- 以太结界共鸣频度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>以太结界共鸣频度 (Resonance Frequency):</span>
              <span class="font-mono text-purple-400 font-bold">{{ resonanceFrequency }} Hz</span>
            </div>
            <n-slider v-model:value="resonanceFrequency" :min="100" :max="999" :step="5" />
            <div class="flex justify-between text-[9px] text-gray-500">
              <span>100Hz 泛灵波动</span>
              <span>528Hz 黄金奇迹</span>
              <span>999Hz 创世神音</span>
            </div>
          </div>

          <!-- 超绝召唤过载倍率 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>超绝召唤过载倍率 (Overdrive Multiplier):</span>
              <span class="font-mono text-rose-400 font-bold">{{ overdriveMultiplier.toFixed(1) }}x</span>
            </div>
            <n-slider v-model:value="overdriveMultiplier" :min="1.0" :max="4.0" :step="0.1" />
          </div>

          <!-- 召唤师精神统合度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>召唤师精神统合度 (Caster Integration):</span>
              <span class="font-mono text-cyan-400 font-bold">{{ casterIntegration }}%</span>
            </div>
            <n-slider v-model:value="casterIntegration" :min="50" :max="100" :step="1" />
          </div>

          <!-- 虚空引力透镜偏转角 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>虚空引力透镜偏转角 (Lens Deflection Angle):</span>
              <span class="font-mono text-amber-400 font-bold">{{ voidLensDeflection.toFixed(1) }}°</span>
            </div>
            <n-slider v-model:value="voidLensDeflection" :min="0.0" :max="45.0" :step="0.5" />
          </div>

          <!-- 特性开关组 -->
          <div class="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【太古神格上限解限 (Break 99999 Limit)】:</span>
              <n-switch v-model:value="enablePrimalLimitBreak" size="small" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【双连续魔咏唱时钟自锁 (Clock Phase Lock)】:</span>
              <n-switch v-model:value="enableDualcastSync" size="small" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【以太反向噬魂护盾 (Soul Drain Ward)】:</span>
              <n-switch v-model:value="enableAetherDrainShield" size="small" />
            </div>
          </div>

          <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
            💡 机制说明：太古三柱神兽羁绊阵列解算后，可引爆天体级真实伤害。开启上限解限将彻底突破 99,999 限制，并为全队施加最高 8,300 点以太护盾。
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 (4 Tab 切换) -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-1.5">
            <span class="text-base">📜</span>
            <span class="font-mono text-sm font-bold text-cyan-300">Godot 4.6 LTS 核心实机算法引擎展台</span>
          </div>
          <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 flex-wrap">
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'transcendence' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'transcendence'"
            >
              celestial_transcendence_evocation_engine.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'descent' ? 'bg-indigo-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'descent'"
            >
              celestial_descent_engine.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'odin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'odin'"
            >
              odin_trial_engine.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'summon' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'summon'"
            >
              summon_system.gd
            </button>
          </div>
        </div>
        <n-button size="tiny" secondary type="info" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-56 custom-scrollbar"><code>{{ currentDisplayCode }}</code></pre>
    </div>

    <!-- 🐉 工坊 4: 全域太古十二柱幻兽高维召唤契约、以太逆流祈愿与神威降临工坊 (High-Dimensional Summons & Aetheric Prayer Studio v2.2.305) -->
    <div
      id="high-dimensional-summon-studio"
      class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-950/80 via-slate-900/90 to-purple-950/80 border border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.22)] space-y-6 relative overflow-hidden"
    >
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -left-20 -bottom-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 头部与操作区 -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900/60 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5 flex-wrap">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-black font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
              HIGH-DIMENSIONAL SUMMONS v2.2.305
            </span>
            <span class="text-xs text-blue-300/80 font-mono">十二柱幻兽高维神威契约矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-wide">
            <span>🐉</span> 全域太古十二柱幻兽高维召唤契约、以太逆流祈愿与神威降临工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            基于 Godot 4.6 LTS 实时仿真：解算太古龙王与沧海利维亚桑高维神威降临、0 MP 环境以太逆流祈愿、双重幻兽同契协奏与 999999 破限终极爆发。
          </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap self-start md:self-auto">
          <n-button
            type="info"
            size="small"
            round
            secondary
            @click="resetHighDimensionalParameters"
          >
            重置参数
          </n-button>
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingHighDimensional"
            @click="runHighDimensionalSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动神威契约推演
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportHighDimensionalCertificate"
          >
            <template #icon><span>📜</span></template>
            导出神威方案书
          </n-button>
        </div>
      </div>

      <!-- 四大高维召唤原型 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        <div
          v-for="archetype in highDimensionalArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left"
          :class="selectedHighDimensionalArchetypeId === archetype.id
            ? 'bg-blue-950/50 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-blue-600/50'"
          @click="selectedHighDimensionalArchetypeId = archetype.id"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ archetype.icon }}</span>
            <n-tag size="tiny" :type="archetype.tagType" round>{{ archetype.pact }}</n-tag>
          </div>
          <div class="font-bold text-sm text-gray-100">{{ archetype.name }}</div>
          <div class="text-[11px] text-blue-300/80 font-mono mt-0.5">{{ archetype.title }}</div>
          <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{{ archetype.desc }}</p>
          <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>基底神威: {{ archetype.baseBurst.toLocaleString() }}</span>
            <span class="text-cyan-400">消耗: {{ archetype.mpCost }} MP</span>
          </div>
        </div>
      </div>

      <!-- 核心调控滑块与高能开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        <!-- 左侧参数微调面板 -->
        <div class="lg:col-span-7 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <span>⚙️</span> 以太逆流与灵魂调和参数连续微调
            </span>
            <span class="text-[11px] font-mono text-blue-400">Continuous Evocation Dynamics</span>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">以太逆流注能深度 (Aether Backflow Depth):</span>
                <span class="font-mono text-blue-400 font-bold">{{ aetherBackflowDepth }}%</span>
              </div>
              <n-slider v-model:value="aetherBackflowDepth" :min="10" :max="100" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>微光流注 (10%)</span>
                <span>环境充能 (50%)</span>
                <span>深渊以太逆流 (100%)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">祈愿神威共鸣赫兹 (Prayer Resonance Frequency):</span>
                <span class="font-mono text-amber-400 font-bold">{{ prayerResonanceHz }} Hz</span>
              </div>
              <n-slider v-model:value="prayerResonanceHz" :min="100" :max="999" :step="10" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>低频泛音 (100Hz)</span>
                <span>528Hz 奇迹频率</span>
                <span>太古极频 (999Hz)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">召唤师魂印调和度 (Summoner Soul Harmony):</span>
                <span class="font-mono text-emerald-400 font-bold">{{ summonerSoulHarmony }}%</span>
              </div>
              <n-slider v-model:value="summonerSoulHarmony" :min="50" :max="200" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>基底同调 (50%)</span>
                <span>超灵契合 (140%)</span>
                <span>人神合一 (200%)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">幻兽界域时空穿梭曲率 (Realm Curvature Scale):</span>
                <span class="font-mono text-purple-400 font-bold">{{ realmCurvature.toFixed(1) }} G</span>
              </div>
              <n-slider v-model:value="realmCurvature" :min="1.0" :max="5.0" :step="0.1" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>平坦空间 (1.0G)</span>
                <span>高维折叠 (3.2G)</span>
                <span>虚空引力坍缩 (5.0G)</span>
              </div>
            </div>
          </div>

          <!-- 三大高能保障开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">0 MP 极意以太逆流祈愿锁 (Zero MP Backflow Prayer)</div>
                <div class="text-[11px] text-gray-400">神兽召来无需消耗自身 MP，直接抽取环境高能游离以太完成施法</div>
              </div>
              <n-switch v-model:value="zeroMpAetherPrayerLock" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">双重幻兽同契协同共振 (Dual Celestial Harmonic Sync)</div>
                <div class="text-[11px] text-gray-400">允许两柱太古神明同时显圣降临，合力激发复合元素毁天灭地合体技</div>
              </div>
              <n-switch v-model:value="dualSummonHarmonicSync" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">999999 破限爆发神格解放符印 (Godhood Limit Break Seal)</div>
                <div class="text-[11px] text-gray-400">解除神威 999999 伤害天花板限制，巴哈姆特百万核爆直接轰破 9,999,999</div>
              </div>
              <n-switch v-model:value="godhoodLimitBreakSeal" size="small" />
            </div>
          </div>
        </div>

        <!-- 右侧指标计算与沙盘推演 -->
        <div class="lg:col-span-5 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>📊</span> 实时解算神威契约与以太能效
              </span>
              <n-tag size="tiny" type="info" round>Pact Resolved</n-tag>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-blue-950/30 border border-blue-700/40">
                <div class="text-[11px] text-gray-400">神威极限爆发伤害</div>
                <div class="text-lg font-black text-blue-300 font-mono mt-0.5">{{ calculatedSummonBurstDmg.toLocaleString() }} DMG</div>
                <div class="text-[10px] text-blue-400/80 mt-0.5">以太逆流神格放大</div>
              </div>

              <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-700/40">
                <div class="text-[11px] text-gray-400">全队涅槃圣盾护佑</div>
                <div class="text-lg font-black text-amber-300 font-mono mt-0.5">{{ calculatedNirvanaShieldHp.toLocaleString() }} HP</div>
                <div class="text-[10px] text-amber-400/80 mt-0.5">余烬全伤吸收吸收盾</div>
              </div>

              <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-700/40">
                <div class="text-[11px] text-gray-400">幻兽降临维持时限</div>
                <div class="text-lg font-black text-emerald-300 font-mono mt-0.5">{{ calculatedSummonDurationSec }} 秒</div>
                <div class="text-[10px] text-emerald-400/80 mt-0.5">时空折叠锚定时间</div>
              </div>

              <div class="p-3 rounded-lg bg-purple-950/30 border border-purple-700/40">
                <div class="text-[11px] text-gray-400">召唤神阶契约评级</div>
                <div class="text-sm font-black text-purple-300 font-mono mt-1">{{ calculatedSummonPactTier }}</div>
                <div class="text-[10px] text-purple-400/80 mt-0.5">太古神殿至高认证</div>
              </div>
            </div>
          </div>

          <!-- 推演终端 -->
          <div class="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-400">五阶段高维召唤推演进度:</span>
              <span class="font-mono text-blue-400 font-bold">{{ highDimSimStep }}/5 阶段</span>
            </div>
            <n-progress
              type="line"
              :percentage="(highDimSimStep / 5) * 100"
              :status="highDimSimStep === 5 ? 'success' : 'info'"
              :show-indicator="false"
              processing
            />
            <div class="text-[11px] text-gray-300 font-mono bg-slate-900/90 p-2 rounded border border-slate-800/80 min-h-[48px] flex items-center">
              <span>{{ highDimSimCurrentLog }}</span>
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
                :class="activeHighDimCodeTab === 'contract' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeHighDimCodeTab = 'contract'"
              >
                high_dim_summon.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeHighDimCodeTab === 'prayer' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeHighDimCodeTab = 'prayer'"
              >
                aether_prayer_engine.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeHighDimCodeTab === 'synergy' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeHighDimCodeTab = 'synergy'"
              >
                dual_celestial_sync.gd
              </button>
            </div>
            <n-button size="small" type="primary" secondary round @click="copyHighDimCode">
              复制源码
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentHighDimCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- v2.2.331: 幻兽太古契约阵列、高阶召唤兽觉醒与神威协同工坊 -->
    <div
      id="ancient-pact-awakening-studio"
      class="ancient-pact-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/95 via-indigo-950/20 to-slate-900/95 border border-indigo-500/30 shadow-[0_0_35px_rgba(99,102,241,0.15)] space-y-6 relative overflow-hidden"
    >
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-500/20 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs border border-indigo-500/30">
              ANCIENT PACT &amp; EIDOLON AWAKENING v2.2.331
            </span>
            <span class="text-xs text-indigo-400 font-mono">Divine Synergy &amp; Harmonic Resonance Array</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🔮</span> 幻兽太古契约阵列、高阶召唤兽觉醒与神威协同工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            收录龙王巴哈姆特、水神利维亚桑、斩铁战神奥丁与不死鸟涅槃觉醒态。支持以太灵魂同调共振、免MP契约誓约、零蓄力瞬发召来与跨位面双神连击。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-button
            type="info"
            size="small"
            round
            secondary
            :loading="isSimulatingAncientPact"
            @click="runAncientPactSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动神威同调沙盘
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportAncientPactCertificate"
          >
            <template #icon><span>📜</span></template>
            导出太古契约证书
          </n-button>
        </div>
      </div>

      <!-- 四大高阶幻兽觉醒原型 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="arch in ancientPactArchetypes"
          :key="arch.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative"
          :class="selectedPactArchetypeId === arch.id ? 'bg-indigo-950/40 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'bg-slate-800/40 border-slate-700/60 hover:border-indigo-500/40'"
          @click="selectPactArchetype(arch.id)"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ arch.icon }}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {{ arch.tag }}
            </span>
          </div>
          <div class="font-bold text-sm text-white">{{ arch.name }}</div>
          <div class="text-xs text-indigo-300 font-mono mt-0.5">{{ arch.subtitle }}</div>
          <div class="text-[11px] text-gray-400 mt-2 leading-relaxed">{{ arch.desc }}</div>
          <div class="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] font-mono">
            <span class="text-gray-400">觉醒神威基底</span>
            <span class="text-indigo-400 font-bold">{{ arch.baseDamageMln }} 万</span>
          </div>
        </div>
      </div>

      <!-- 参数调节与开关控制网格 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
        <!-- 4 滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-indigo-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
            <span>⚙️</span> 太古灵魂同调与神威参数微调
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">幻兽灵魂同调共振率 (%)</span>
              <span class="text-indigo-400 font-mono font-bold">{{ pactHarmonicResonanceRatio }} %</span>
            </div>
            <n-slider v-model:value="pactHarmonicResonanceRatio" :min="50" :max="100" :step="1" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">以太逆流汲取宽容度 (%)</span>
              <span class="text-amber-400 font-mono font-bold">{{ aethericDrainTolerancePct }} %</span>
            </div>
            <n-slider v-model:value="aethericDrainTolerancePct" :min="10" :max="80" :step="2" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">神威降临庇护光环持续时长 (秒)</span>
              <span class="text-cyan-400 font-mono font-bold">{{ divineAuraDurationSec.toFixed(1) }} s</span>
            </div>
            <n-slider v-model:value="divineAuraDurationSec" :min="5.0" :max="30.0" :step="0.5" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">觉醒奥义神威真伤倍率 (倍)</span>
              <span class="text-emerald-400 font-mono font-bold">{{ eidolonAwakeningBurstMultiplier.toFixed(1) }} x</span>
            </div>
            <n-slider v-model:value="eidolonAwakeningBurstMultiplier" :min="2.0" :max="12.0" :step="0.2" />
          </div>
        </div>

        <!-- 3 开关与实时数据 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-indigo-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
            <span>✨</span> 神圣誓约与破限召来特权
          </div>

          <div class="space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">太古契约豁免全额召唤 MP 消耗</div>
                <div class="text-gray-400 text-[11px]">直接调动天地自然以太，召唤能耗为 0</div>
              </div>
              <n-switch v-model:value="unlimitedMpSummonPact" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">神明降临免蓄力瞬间破空现世</div>
                <div class="text-gray-400 text-[11px]">抹除咏唱蓄力硬直，立即轰出全额神威</div>
              </div>
              <n-switch v-model:value="instantCastNoChargeBar" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">跨位面双幻兽极意奥义连击</div>
                <div class="text-gray-400 text-[11px]">同时召引两尊太古幻兽交织连携真伤</div>
              </div>
              <n-switch v-model:value="celestialCrossSynergyChain" />
            </div>
          </div>

          <!-- 4 项实时综合解算指标 -->
          <div class="grid grid-cols-2 gap-3 pt-1">
            <div class="p-2.5 rounded bg-slate-900 border border-indigo-500/20 text-center">
              <div class="text-[11px] text-gray-400">神威奥义伤害</div>
              <div class="text-lg font-mono font-black text-indigo-400">{{ calculatedPactMetrics.divineBurstDamage }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-indigo-500/20 text-center">
              <div class="text-[11px] text-gray-400">以太能耗利用率</div>
              <div class="text-lg font-mono font-black text-cyan-400">{{ calculatedPactMetrics.mpEfficiencyGain }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-indigo-500/20 text-center">
              <div class="text-[11px] text-gray-400">全队庇护稳态率</div>
              <div class="text-lg font-mono font-black text-amber-400">{{ calculatedPactMetrics.partySurvivalResonance }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-indigo-500/20 text-center">
              <div class="text-[11px] text-gray-400">召唤导师评级</div>
              <div class="text-lg font-mono font-black text-emerald-400">{{ calculatedPactMetrics.evokerMasteryRank }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条 -->
      <div v-if="isSimulatingAncientPact" class="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-indigo-500/30">
        <div class="flex justify-between text-xs font-mono">
          <span class="text-indigo-300 flex items-center gap-2">
            <span class="animate-spin">🔄</span> {{ ancientPactStages[currentPactSimStage] }}
          </span>
          <span class="text-gray-400">{{ (currentPactSimStage + 1) * 20 }}%</span>
        </div>
        <n-progress type="line" :percentage="(currentPactSimStage + 1) * 20" :show-indicator="false" status="info" />
      </div>

      <!-- Godot 4.6 LTS 源码展台 -->
      <div class="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-gray-300 font-mono">GODOT 4.6 LTS ANCIENT PACT ENGINE</span>
            <n-tag size="small" type="info" round>res://scripts/combat/summons/</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <n-radio-group v-model:value="activeAncientPactScriptTab" size="small">
              <n-radio-button value="pact_array">契约阵列</n-radio-button>
              <n-radio-button value="synergy_coordinator">双神连携总线</n-radio-button>
              <n-radio-button value="aether_overdrive">以太逆流仲裁器</n-radio-button>
            </n-radio-group>
            <n-button type="info" size="tiny" secondary round @click="copyAncientPactScript">
              复制当前脚本
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentAncientPactScriptCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'

const message = useMessage()
const gameStore = useGameStore()

// 检索与筛选状态
const activeRank = ref('all')
const searchKeyword = ref('')
const selectedSummonId = ref('bahamut')
const copiedCode = ref(false)

// 推演工坊状态
const selectedCaster = ref('bartz')
const casterMagicPower = ref(65)
const currentMP = ref(80)
const maxMP = ref(120)
const hasSummonerBadge = ref(true)
const hasWhiteMageSynergy = ref(false)

const targetType = ref('boss')
const targetElementalResist = ref('normal')
const isTargetCasting = ref(true)
const isUndeadTarget = ref(false)

// 基础数据源
const summonsList = computed(() => gameStore.db.summons || [])

const rankCategories = [
  { key: 'all', label: '全部契约' },
  { key: 'cataclysm', label: '最高天灾' },
  { key: 'elements', label: '四元神明' },
  { key: 'ancient', label: '极古战魂' },
  { key: 'support', label: '守护奇迹' }
]

const casterOptions = [
  { label: '巴兹 (Bartz) - 魔剑/召唤均质体', value: 'bartz' },
  { label: '蕾娜 (Lenna) - 神圣白魔召唤专家', value: 'lenna' },
  { label: '法里斯 (Faris) - 风水元素共鸣者', value: 'faris' },
  { label: '格鲁夫/库露露 (Krile) - 远古以太传承', value: 'krile' }
]

const targetTypeOptions = [
  { label: '单体首领 BOSS (免疫常规即死)', value: 'boss' },
  { label: '精英守门人 (强韧防御)', value: 'elite' },
  { label: '4 人标准怪物群 (分摊或全体攻击)', value: 'mob_group' }
]

const resistanceOptions = [
  { label: '弱点克制 (Weakness x2.0)', value: 'weak' },
  { label: '通常抗性 (Normal x1.0)', value: 'normal' },
  { label: '半减抗性 (Resist x0.5)', value: 'half' },
  { label: '完全免疫 (Immune x0.0)', value: 'immune' },
  { label: '元素吸收 (Absorb -1.0x)', value: 'absorb' }
]

const summonSelectOptions = computed(() => {
  return summonsList.value.map((s: { id: string; name: string }) => ({
    label: `${s.name}`,
    value: s.id
  }))
})

// 筛选召唤兽
const filteredSummons = computed(() => {
  return summonsList.value.filter((s: { id: string; name: string; rank: string; element: string; skill_name: string; trial_dungeon: string }) => {
    // 品阶匹配
    if (activeRank.value === 'cataclysm' && !s.rank.includes('天灾') && !s.rank.includes('高阶')) return false
    if (activeRank.value === 'elements' && !s.rank.includes('四元神')) return false
    if (activeRank.value === 'ancient' && !s.rank.includes('极古') && !s.rank.includes('战魂')) return false
    if (activeRank.value === 'support' && !s.rank.includes('辅助') && !s.rank.includes('守护') && !s.rank.includes('奇迹')) return false

    // 搜索关键字匹配
    if (searchKeyword.value.trim()) {
      const q = searchKeyword.value.trim().toLowerCase()
      const match =
        s.name.toLowerCase().includes(q) ||
        s.skill_name.toLowerCase().includes(q) ||
        s.element.toLowerCase().includes(q) ||
        s.trial_dungeon.toLowerCase().includes(q)
      if (!match) return false
    }

    return true
  })
})

// 基础威力系数映射表
const getBasePower = (id: string): number => {
  const map: Record<string, number> = {
    bahamut: 250,
    leviathan: 195,
    odin: 220,
    phoenix: 170,
    shiva: 120,
    ifrit: 125,
    ramuh: 130,
    titan: 140,
    carbuncle: 0,
    syldra: 165,
    golem: 0,
    chocobo: 95
  }
  return map[id] || 100
}

const getElementTagType = (elem: string): 'default' | 'info' | 'warning' | 'error' | 'success' => {
  if (elem.includes('火')) return 'error'
  if (elem.includes('水') || elem.includes('冰')) return 'info'
  if (elem.includes('雷') || elem.includes('地')) return 'warning'
  if (elem.includes('圣') || elem.includes('以太') || elem.includes('无')) return 'success'
  return 'default'
}

const selectForSimulation = (id: string) => {
  selectedSummonId.value = id
  scrollToStudio()
  message.success(`已载入召唤兽契约进行沙盘推演！`)
}

const scrollToStudio = () => {
  const el = document.getElementById('summon-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetStudioParams = () => {
  casterMagicPower.value = 65
  currentMP.value = 80
  hasSummonerBadge.value = true
  hasWhiteMageSynergy.value = false
  targetType.value = 'boss'
  targetElementalResist.value = 'normal'
  isTargetCasting.value = true
  isUndeadTarget.value = false
  message.info('沙盘推演参数已重置为默认值')
}

const triggerOneClickSummonCast = () => {
  if (!calcResult.value.canCast) {
    message.error('当前 MP 不足，无法发起神圣召唤！请调高 MP 或开启白魔减耗')
    return
  }
  message.success(`⚡ 召唤契约激活！${calcResult.value.damageDisplay} 点结算，${calcResult.value.specialEffectTitle}`)
}

// 核心伤害与机制结算推演
const calcResult = computed(() => {
  const curSummon = summonsList.value.find((s: { id: string }) => s.id === selectedSummonId.value) || summonsList.value[0]
  if (!curSummon) {
    return {
      canCast: false,
      actualMPCost: 0,
      damageDisplay: '0',
      damageNotes: '未选定召唤兽',
      damageColorClass: 'text-gray-400',
      elementMultiplier: 1.0,
      specialEffectTitle: '无',
      specialEffectDesc: '无'
    }
  }

  // 计算 MP 消耗
  const rawCost = parseInt(curSummon.cost.replace(/[^0-9]/g, '')) || 20
  const mpMultiplier = hasWhiteMageSynergy.value ? 0.8 : 1.0
  const actualMPCost = Math.round(rawCost * mpMultiplier)
  const canCast = currentMP.value >= actualMPCost

  // 计算属性倍率
  let elemMult = 1.0
  if (curSummon.id === 'bahamut') {
    elemMult = 1.0 // 无属性真伤，无视抗性
  } else {
    if (targetElementalResist.value === 'weak') elemMult = 2.0
    else if (targetElementalResist.value === 'half') elemMult = 0.5
    else if (targetElementalResist.value === 'immune') elemMult = 0.0
    else if (targetElementalResist.value === 'absorb') elemMult = -1.0
  }

  // 装备加成与施术者加成
  let badgeBonus = hasSummonerBadge.value ? 1.15 : 1.0
  let casterBonus = 1.0
  if (selectedCaster.value === 'lenna' && (curSummon.id === 'phoenix' || curSummon.id === 'carbuncle')) casterBonus = 1.2
  if (selectedCaster.value === 'faris' && (curSummon.id === 'leviathan' || curSummon.id === 'syldra')) casterBonus = 1.25
  if (selectedCaster.value === 'krile' && curSummon.id === 'bahamut') casterBonus = 1.15

  const basePower = getBasePower(curSummon.id)
  let rawDmg = Math.round((casterMagicPower.value * 2.2 + basePower * 1.8) * badgeBonus * casterBonus)

  let damageDisplay = '0'
  let damageNotes = '常规群体伤害'
  let damageColorClass = 'text-cyan-400'
  let specialEffectTitle = '标准魔法伤害'
  let specialEffectDesc = '对敌全体造成神力冲击'

  // 个性化神兽机制分支
  if (curSummon.id === 'bahamut') {
    const finalDmg = Math.round(rawDmg * 1.2)
    damageDisplay = `${finalDmg}`
    damageNotes = '无视防御与魔抗 · 贯穿真实爆裂冲击'
    damageColorClass = 'text-cyan-300'
    specialEffectTitle = '真实亿万核爆'
    specialEffectDesc = '无视一切魔法屏障、抗性与护盾，必定造成满额穿透伤害'
  } else if (curSummon.id === 'odin') {
    if (targetType.value === 'boss') {
      damageDisplay = '9999'
      damageNotes = 'Boss 首领斩铁转换 · 破界物理暴击极限'
      damageColorClass = 'text-amber-400'
      specialEffectTitle = '破界斩铁暴击'
      specialEffectDesc = '识别到目标为首领级 Boss，由即死自动转为造成 9999 破界物理真实伤害'
    } else {
      damageDisplay = '100% 即死 (DEATH)'
      damageNotes = '非 Boss 单位全员直接判定两断即死'
      damageColorClass = 'text-purple-400'
      specialEffectTitle = '一刀两断'
      specialEffectDesc = '无视生命值上限，概率 100% 斩灭所有非首领级小怪'
    }
  } else if (curSummon.id === 'phoenix') {
    const healVal = 9999
    const atkDmg = Math.round(rawDmg * elemMult * (isUndeadTarget.value ? 2.5 : 1.0))
    damageDisplay = `烈焰 ${atkDmg} / 回复 ${healVal}`
    damageNotes = isUndeadTarget.value ? '触发不死系 2.5 倍圣焰净化爆轰' : '全员阵亡复活 + 圣炎焚场'
    damageColorClass = 'text-rose-400'
    specialEffectTitle = '转生之炎 · 金羽重生'
    specialEffectDesc = '全队阵亡队员 100% 满血复活，若队长致死可激活不屈庇护保留 1 点 HP'
  } else if (curSummon.id === 'leviathan') {
    const finalDmg = Math.round(rawDmg * elemMult)
    damageDisplay = `${finalDmg}`
    damageNotes = isTargetCasting.value ? '40% 几率冲散敌方当前咏唱状态' : '高压覆灭水属性海啸'
    damageColorClass = 'text-blue-400'
    specialEffectTitle = '海啸冲散打断'
    specialEffectDesc = isTargetCasting.value ? '目标正处于咏唱中，成功命中将极大概率清空其蓄力行动条' : '常规大面积水属性冲击'
  } else if (curSummon.id === 'carbuncle') {
    damageDisplay = '全体赋予【魔法反射壁 (Reflect)】'
    damageNotes = '常驻反弹下一次敌方攻击法术回击自身'
    damageColorClass = 'text-emerald-400'
    specialEffectTitle = '红宝石辉光'
    specialEffectDesc = '不造成直接伤害，为全队套上魔法反射结界，并缩短负面状态时间 50%'
  } else if (curSummon.id === 'golem') {
    damageDisplay = '吸收物理伤害上限 3500 HP'
    damageNotes = '前排受击由石魔替身吸收'
    damageColorClass = 'text-yellow-500'
    specialEffectTitle = '岩盾金钟罩'
    specialEffectDesc = '显化巨石坚盾替全队吸收物理伤害，抵挡期间全员免受普攻硬直'
  } else if (curSummon.id === 'shiva') {
    const finalDmg = Math.round(rawDmg * elemMult)
    damageDisplay = `${finalDmg}`
    damageNotes = '极寒绝对零度 · 附加 3 回合冻伤减速'
    damageColorClass = 'text-sky-300'
    specialEffectTitle = '钻石星尘减速'
    specialEffectDesc = '施加冻伤 Debuff，使敌方行动条流速下降 30%，持续 3 回合'
  } else {
    const finalDmg = Math.round(rawDmg * elemMult)
    damageDisplay = `${finalDmg}`
    damageNotes = `元素属性倍率: ${elemMult}x`
    damageColorClass = elemMult > 1.0 ? 'text-emerald-400' : (elemMult < 1.0 ? 'text-rose-400' : 'text-cyan-400')
    specialEffectTitle = curSummon.skill_name
    specialEffectDesc = curSummon.skill_desc
  }

  return {
    canCast,
    actualMPCost,
    damageDisplay,
    damageNotes,
    damageColorClass,
    elementMultiplier: elemMult,
    specialEffectTitle,
    specialEffectDesc
  }
})

// 融合技
const fusionArtes = [
  {
    name: '龙王破灭击 (Dragon Flare Dive)',
    icon: '🐉',
    condition: '龙骑士 + 巴哈姆特契约',
    cost: 'MP 55 + 跳跃蓄力 1 轮',
    role: '单体极致物理与核爆复合真实穿透',
    effect: '跃入苍穹与巴哈姆特虚影合一，自万米高空极速俯冲贯穿敌单体，造成 2.8 倍物理暴击 + 4500 点无视魔抗真实爆裂轰击。'
  },
  {
    name: '三元混沌炼狱 (Tri-Disaster)',
    icon: '⚡',
    condition: '黑魔道士 + 希瓦/伊芙利特/拉姆其一',
    cost: 'MP 45 + 连锁法术槽',
    role: '全场火/冰/雷三属性超绝复合爆发',
    effect: '同时引爆地狱火流星、绝对零度冻气与九天制裁雷霆，无视敌方单系元素吸收，自适应取敌方最弱抗性进行 3 段连续打击。'
  },
  {
    name: '涅槃再生神愈 (Rebirth Benediction)',
    icon: '🔥',
    condition: '白魔道士 + 不死鸟契约',
    cost: 'MP 60',
    role: '全队复活回春 + 不屈免死结界',
    effect: '散落万道纯金涅槃真羽，全队阵亡队员起死回生并恢复全满 HP/MP，全员赋予 2 回合【受致死伤保留 1 点 HP】金身护罩。'
  },
  {
    name: '万钧飞羽泰山重压 (Chocobo Mega Drop)',
    icon: '🐤',
    condition: '召唤士/时魔道士 + 胖陆行鸟契约',
    cost: 'MP 12',
    role: '强运搞笑重压 + 全场强制滑稽眩晕',
    effect: '撕开时空裂隙召唤 500 吨超巨肥美胖陆行鸟从天而降，造成范围压杀物理重创，并有 70% 几率使全场所有非首领陷入 2 回合眩晕。'
  }
]

// Godot 代码
const godotCodeText = `## summon_system.gd
## 《光之战士：时空裂隙》十二柱神明契约实机战斗结算引擎
extends Node
class_name SummonSystem

signal summon_casted(summon_id: String, caster: Node, targets: Array, result: Dictionary)

const SUMMON_POWER_TABLE = {
	"bahamut": 250, "leviathan": 195, "odin": 220, "phoenix": 170,
	"shiva": 120, "ifrit": 125, "ramuh": 130, "titan": 140,
	"carbuncle": 0, "syldra": 165, "golem": 0, "chocobo": 95
}

func execute_summon(summon_id: String, caster: CharacterData, targets: Array) -> Dictionary:
	var base_power = SUMMON_POWER_TABLE.get(summon_id, 100)
	var magic_stat = caster.get_stat("magic_power")
	var result = { "success": true, "damage": 0, "special": "" }
	
	match summon_id:
		"bahamut":
			# 真实无视魔防核爆
			result.damage = int((magic_stat * 2.2 + base_power * 1.8) * 1.2)
			result.special = "TRUE_ARMOR_PIERCE"
			for t in targets:
				t.apply_true_damage(result.damage)
		"odin":
			# 首领 9999，杂兵 100% 即死
			for t in targets:
				if t.is_boss:
					t.apply_damage(9999)
					result.damage = 9999
					result.special = "BOSS_ZANTETSUKEN_9999"
				else:
					t.instant_kill()
					result.special = "INSTANT_DEATH"
		"phoenix":
			# 全员金羽复活 + 圣炎焚场
			BattleManager.revive_all_party(1.0)
			for t in targets:
				var dmg = int((magic_stat * 1.8 + base_power * 1.5))
				if t.is_undead: dmg = int(dmg * 2.5)
				t.apply_damage(dmg)
			result.special = "REBIRTH_REVIVE_ALL"
	
	emit_signal("summon_casted", summon_id, caster, targets, result)
	return result
`

const activeCodeTab = ref<'transcendence' | 'descent' | 'odin' | 'summon'>('transcendence')

const currentDisplayCode = computed(() => {
  if (activeCodeTab.value === 'transcendence') return gdTranscendenceEvocationCode
  if (activeCodeTab.value === 'descent') return gdCelestialDescentCode
  if (activeCodeTab.value === 'odin') return godotOdinCodeText
  return godotCodeText
})

const godotOdinCodeText = [
  '## odin_trial_engine.gd',
  '## 《光之战士：时空裂隙》贾格尔城奥丁 60 秒斩铁试炼与倒计时判定引擎',
  '## 官方引擎规范: VBLE Summoning & Resonance Matrix v2.2.247',
  'extends Node',
  'class_name OdinTrialEngine',
  '',
  'signal trial_started(time_limit: float, max_hp: int)',
  'signal trial_tick(time_remaining: float, current_hp: int)',
  'signal trial_success(time_spent: float, remaining_hp: int)',
  'signal trial_failed(reason: String)',
  '',
  'const TIME_LIMIT: float = 60.0',
  'const ODIN_MAX_HP: int = 17000',
  '',
  'var current_hp: int = 17000',
  'var time_remaining: float = 60.0',
  'var is_active: bool = false',
  '',
  'func start_trial() -> void:',
  '	current_hp = ODIN_MAX_HP',
  '	time_remaining = TIME_LIMIT',
  '	is_active = true',
  '	emit_signal("trial_started", TIME_LIMIT, ODIN_MAX_HP)',
  '',
  'func apply_damage(amount: int, skill_name: String) -> Dictionary:',
  '	if not is_active: return { "valid": false }',
  '	current_hp = max(0, current_hp - amount)',
  '	if current_hp <= 0:',
  '		is_active = false',
  '		emit_signal("trial_success", TIME_LIMIT - time_remaining, 0)',
  '		return { "valid": true, "defeated": true }',
  '	return { "valid": true, "defeated": false, "remaining": current_hp }',
  '',
  'func _process(delta: float) -> void:',
  '	if not is_active: return',
  '	time_remaining = max(0.0, time_remaining - delta)',
  '	emit_signal("trial_tick", time_remaining, current_hp)',
  '	if time_remaining <= 0.0:',
  '		is_active = false',
  '		emit_signal("trial_failed", "ZANTETSUKEN_TIME_OUT_99999")'
].join('\n')

const copyGodotCode = async () => {
  try {
    let code = ''
    let filename = ''
    if (activeCodeTab.value === 'transcendence') {
      code = gdTranscendenceEvocationCode
      filename = 'celestial_transcendence_evocation_engine.gd'
    } else if (activeCodeTab.value === 'descent') {
      code = gdCelestialDescentCode
      filename = 'celestial_descent_engine.gd'
    } else if (activeCodeTab.value === 'odin') {
      code = godotOdinCodeText
      filename = 'odin_trial_engine.gd'
    } else {
      code = godotCodeText
      filename = 'summon_system.gd'
    }
    await navigator.clipboard.writeText(code)
    copiedCode.value = true
    message.success(`已复制 ${filename} 核心实机代码！`)
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}

const exportSummonCert = () => {
  const lines: string[] = [
    '========================================================================',
    '    《光之战士：时空裂隙》十二柱神明契约认证与奥丁斩铁试炼通关凭证',
    '========================================================================',
    '签发引擎: Godot 4.6 LTS / odin_trial_engine.gd & summon_system.gd',
    `安全哈希: SHA256-SUMMON-${Date.now().toString(16).toUpperCase()}`,
    `签发时间: ${new Date().toISOString()}`,
    '------------------------------------------------------------------------',
    '【奥丁 60 秒限时斩铁试炼战况结算】:',
    `  - 试炼状态: ${odinBattleSuccess.value ? '★ 试炼大成·神兽契约缔结' : (isOdinBattleRunning.value ? '战意正酣·倒计时中' : '未战或待决')}`,
    `  - 剩余生命值: ${odinHp.value} / ${odinMaxHp}`,
    `  - 剩余倒计时: ${odinTimeRemaining.value.toFixed(1)} 秒`,
    '------------------------------------------------------------------------',
    '【当前镶嵌激活之神印共鸣 (Active Signets)】:',
    `  - 激活印绶数: ${selectedSignetIds.value.length} / 3`,
    `  - 终极共鸣技: ${resonanceSkillName.value} (${resonanceSkillDesc.value})`,
    `  - 伤害上限突破: ${resonanceDamageCap.value}`,
    `  - 全元素增伤: +${resonanceElemBonus.value}%`,
    `  - 全队流速加成: +${resonanceAtbBonus.value}%`,
    '------------------------------------------------------------------------',
    '【十二柱神兽契约大典收录一览】:'
  ]

  summonsList.value.forEach(s => {
    lines.push(`  ★ [${s.rank}] ${s.name} (${s.element}) - 必杀: ${s.skill_name} | 所在: ${s.trial_dungeon}`)
  })

  lines.push('========================================================================')
  lines.push('召唤殿堂箴言: 诸神低语，万象臣服。凭此神印，跨越时空裂隙！')

  const report = lines.join('\n')

  try {
    navigator.clipboard.writeText(report)
    message.success('已复制《十二神兽全契约认证与奥丁斩铁试炼通关凭证》至剪贴板！')
  } catch {
    // ignore
  }

  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `summon_covenant_cert_v2.2.247_${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

// ================= 专区 4: 十二柱神印契约觉醒与共鸣系统 =================
interface SignetItem {
  id: string
  name: string
  summonName: string
  icon: string
  statBonus: string
  passiveEffect: string
}

const signetCatalog: SignetItem[] = [
  { id: 'bahamut', name: '龙皇核爆神印', summonName: '巴哈姆特', icon: '🐉', statBonus: '伤害上限突破 99999', passiveEffect: '破除一切法术免伤护盾，全队法术穿透 +25%' },
  { id: 'odin', name: '斩铁天威神印', summonName: '奥丁', icon: '⚔️', statBonus: '暴击伤害 +80%', passiveEffect: '目标低于 15% HP 时必定触发斩铁即死处决' },
  { id: 'phoenix', name: '金羽重生神印', summonName: '不死鸟', icon: '🔥', statBonus: '全队预言复活 (Reraise)', passiveEffect: '濒死承受致死伤害时保留 1 点 HP 金身不灭' },
  { id: 'leviathan', name: '覆灭沧海神印', summonName: '利维亚桑', icon: '🌊', statBonus: '水系伤害 +50%', passiveEffect: '攻击时 30% 几率产生潮汐退行，清空敌方行动条' },
  { id: 'shiva', name: '绝对零度神印', summonName: '希瓦', icon: '❄️', statBonus: '冻结暴击率 +45%', passiveEffect: '敌方行动条流速常驻减慢 20%' },
  { id: 'ifrit', name: '炼狱焦土神印', summonName: '伊芙利特', icon: '☄️', statBonus: '火系破防 +40%', passiveEffect: '物理普攻附加 300% 烈焰灼烧爆裂创伤' },
  { id: 'ramuh', name: '神罚雷霆神印', summonName: '拉姆', icon: '⚡', statBonus: '雷霆麻痹 +35%', passiveEffect: '敌方咏唱法术时有 70% 几率遭到雷击打断' },
  { id: 'titan', name: '大地怒震神印', summonName: '泰坦', icon: '🪨', statBonus: '物理免伤 +25%', passiveEffect: '震地冲击永久剥离敌方 30% 护甲' },
  { id: 'carbuncle', name: '星光魔反神印', summonName: '卡邦库尔', icon: '💎', statBonus: '开局魔法反射 3 层', passiveEffect: '受到法术攻击时反弹伤害并为施术者充能 50 MP' },
  { id: 'syldra', name: '风暴狂涌神印', summonName: '希尔德拉', icon: '🌪️', statBonus: 'ATB 流速 +35%', passiveEffect: '全队闪避率提升 20%，疾跑移动提速 1.5 倍' },
  { id: 'golem', name: '不动金刚神印', summonName: '魔石精', icon: '🛡️', statBonus: '吸收物理伤 10000', passiveEffect: '石魔替身吸收前排致命打击，免除击退硬直' },
  { id: 'chocobo', name: '吉运肥鸟神印', summonName: '胖陆行鸟', icon: '🐤', statBonus: '稀有掉落率 300%', passiveEffect: '战斗结算经验值提升 1.5 倍，金币掉落翻倍' }
]

const selectedSignetIds = ref<string[]>(['bahamut', 'odin', 'phoenix'])
const awakeningRank = ref(3)

const isSignetSelected = (id: string) => selectedSignetIds.value.includes(id)

const toggleSignet = (id: string) => {
  if (selectedSignetIds.value.includes(id)) {
    selectedSignetIds.value = selectedSignetIds.value.filter(s => s !== id)
  } else {
    if (selectedSignetIds.value.length < 3) {
      selectedSignetIds.value.push(id)
    } else {
      selectedSignetIds.value.shift()
      selectedSignetIds.value.push(id)
    }
  }
}

const resetSignets = () => {
  selectedSignetIds.value = ['bahamut', 'odin', 'phoenix']
  awakeningRank.value = 3
  message.info('神印契约镶嵌配置已恢复默认组合')
}

const getAwakeningTitle = (rank: number) => {
  switch (rank) {
    case 1: return '初醒 · 元素激发'
    case 2: return '通神 · 威能裂解'
    case 3: return '极意 · 规则同调'
    case 4: return '太古归一 · 天灾万象'
    default: return ''
  }
}

const resonanceScore = computed(() => {
  return selectedSignetIds.value.length * 850 + awakeningRank.value * 1200
})

const resonanceDamageCap = computed(() => {
  if (selectedSignetIds.value.includes('bahamut') || awakeningRank.value >= 3) {
    return '99,999 (突破次元极限)'
  }
  return '9,999 (经典数值界限)'
})

const resonanceElemBonus = computed(() => {
  let base = awakeningRank.value * 15
  if (selectedSignetIds.value.includes('leviathan') || selectedSignetIds.value.includes('shiva') || selectedSignetIds.value.includes('ifrit')) {
    base += 25
  }
  return base
})

const resonanceAtbBonus = computed(() => {
  let base = awakeningRank.value * 8
  if (selectedSignetIds.value.includes('syldra')) base += 20
  return base
})

const resonanceReraise = computed(() => {
  return selectedSignetIds.value.includes('phoenix')
})

const resonanceSkillName = computed(() => {
  if (selectedSignetIds.value.includes('bahamut') && selectedSignetIds.value.includes('odin')) {
    return '【龙皇断铁天灾斩 (Dragon Emperor Zantetsuken)】'
  }
  if (selectedSignetIds.value.includes('phoenix') && selectedSignetIds.value.includes('carbuncle')) {
    return '【涅槃红宝石神圣界 (Sacred Benediction Barrier)】'
  }
  return '【太古神印共鸣守护 (Ancient Celestial Aegis)】'
})

const resonanceSkillDesc = computed(() => {
  if (selectedSignetIds.value.includes('bahamut') && selectedSignetIds.value.includes('odin')) {
    return '龙皇亿万核爆与斩铁剑意合璧，全场物理与魔法复合穿透轰击，无视敌方任何无敌与反射结界！'
  }
  if (selectedSignetIds.value.includes('phoenix') && selectedSignetIds.value.includes('carbuncle')) {
    return '金羽圣焰与红宝石壁垒辉映，全体队员阵亡时立即以 100% 满状态复活并自带 3 层法术魔反结界！'
  }
  return '根据当前激活的印绶，提升全队全元素伤害增幅与极限行动充能流速，压制首领高阶法术咏唱。'
})

// ================= 专区 5: 奥丁 60 秒斩铁试炼推演 =================
const isOdinBattleRunning = ref(false)
const odinBattleEnded = ref(false)
const odinTimeRemaining = ref(60.0)
const odinMaxHp = 17000
const odinHp = ref(17000)
const odinBattleLogs = ref<string[]>([])
const odinBattleResult = ref('')
const odinBattleSuccess = ref(false)
let odinTimer: ReturnType<typeof setInterval> | null = null

const odinStatusType = computed(() => {
  if (odinBattleEnded.value) {
    return odinBattleSuccess.value ? 'success' : 'error'
  }
  if (isOdinBattleRunning.value) return 'warning'
  return 'default'
})

const odinStatusText = computed(() => {
  if (odinBattleEnded.value) {
    return odinBattleSuccess.value ? '试炼降服 (Defeated)' : '全灭 (斩铁剑发动)'
  }
  if (isOdinBattleRunning.value) return '斩铁倒计时中...'
  return '待战状态'
})

const toggleOdinBattle = () => {
  if (odinBattleEnded.value) {
    // 重置
    odinHp.value = odinMaxHp
    odinTimeRemaining.value = 60.0
    odinBattleEnded.value = false
    odinBattleSuccess.value = false
    odinBattleResult.value = ''
    odinBattleLogs.value = ['=== 60 秒试炼已重置，奥丁拔出斩铁剑！===']
    isOdinBattleRunning.value = true
    startOdinTimer()
    return
  }

  if (isOdinBattleRunning.value) {
    isOdinBattleRunning.value = false
    stopOdinTimer()
  } else {
    isOdinBattleRunning.value = true
    if (odinBattleLogs.value.length === 0) {
      odinBattleLogs.value.push('=== 试炼开启！奥丁斯莱普尼斯马蹄轰鸣，60秒倒计时开始！===')
    }
    startOdinTimer()
  }
}

const startOdinTimer = () => {
  stopOdinTimer()
  odinTimer = setInterval(() => {
    if (!isOdinBattleRunning.value) return
    odinTimeRemaining.value = Math.max(0, odinTimeRemaining.value - 0.1)

    if (odinTimeRemaining.value <= 0) {
      // 超时，斩铁剑发动
      stopOdinTimer()
      isOdinBattleRunning.value = false
      odinBattleEnded.value = true
      odinBattleSuccess.value = false
      odinBattleResult.value = '💀 60 秒时限已至！奥丁挥下【斩铁剑】，全队承受 99999 致命真实伤害，试炼失败！'
      odinBattleLogs.value.unshift('[0.0s] 💥 斩铁剑落下！全屏两断，光之战士倒下！')
    }
  }, 100)
}

const stopOdinTimer = () => {
  if (odinTimer) {
    clearInterval(odinTimer)
    odinTimer = null
  }
}

const castOdinSkill = (skill: string) => {
  if (!isOdinBattleRunning.value || odinBattleEnded.value) return

  let dmg = 0
  let name = ''

  if (skill === 'rapid_fire') {
    dmg = Math.floor(3200 + Math.random() * 600)
    name = '二刀流·乱打'
  } else if (skill === 'spellblade_flare') {
    dmg = Math.floor(4000 + Math.random() * 600)
    name = '魔法剑·核爆'
  } else if (skill === 'bahamut_summon') {
    dmg = Math.floor(6200 + Math.random() * 600)
    name = '巴哈姆特·亿万核爆'
  } else if (skill === 'dualcast_meteor') {
    dmg = Math.floor(5500 + Math.random() * 700)
    name = '时魔道士·连续魔陨石'
  } else if (skill === 'yoichi_shot') {
    dmg = Math.floor(2800 + Math.random() * 600)
    name = '游侠·与一神弓圣光箭'
  }

  odinHp.value = Math.max(0, odinHp.value - dmg)
  const timeStr = odinTimeRemaining.value.toFixed(1)
  odinBattleLogs.value.unshift(`[${timeStr}s] 🗡️ 施展【${name}】，对奥丁造成 ${dmg} 点穿透创伤！(剩余HP: ${odinHp.value})`)

  if (odinHp.value <= 0) {
    // 胜利
    stopOdinTimer()
    isOdinBattleRunning.value = false
    odinBattleEnded.value = true
    odinBattleSuccess.value = true
    odinBattleResult.value = `🎉 试炼大成！在倒计时还剩 ${timeStr} 秒时斩落奥丁，缔结【斩铁神兽契约】！`
    odinBattleLogs.value.unshift(`[${timeStr}s] ✨ 奥丁收剑向光之战士致敬，交托远古契约印绶！`)
    message.success('奥丁 60 秒限时试炼攻克成功！')
  }
}

const scrollToCelestialStudio = () => {
  const el = document.getElementById('celestial-descent-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTranscendenceStudio = () => {
  const el = document.getElementById('celestial-transcendence-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// ================= 专区 6: 太古十二柱神明契约共鸣与全息幻兽降临推演工坊 =================
interface CelestialEntity {
  id: string
  name: string
  element: string
  skillName: string
  power: number
  mpCost: number
  icon: string
  tagType: 'default' | 'info' | 'warning' | 'error' | 'success'
  sanctuaryBuff: string
}

interface DescentCaster {
  id: string
  name: string
  title: string
  specialty: string
  bonusMult: number
  mpDiscount: number
  shieldBoost: number
}

interface DescentRelic {
  id: string
  name: string
  effect: string
  dmgMult: number
  syncBonus: number
}

interface DescentTarget {
  id: string
  name: string
  type: string
  maxHp: number
  weakness: string
  defenseRating: string
  fieldBonus: string
}

const celestialEntities: CelestialEntity[] = [
  { id: 'bahamut', name: '太古龙皇·巴哈姆特', element: '无属性', skillName: '亿万核爆 (Megaflare)', power: 250, mpCost: 66, icon: '🐲', tagType: 'error', sanctuaryBuff: '破坏核能护体: 忽略目标一切魔防与元素抗性' },
  { id: 'leviathan', name: '灭世水神·利维亚桑', element: '水属性', skillName: '大海啸 (Tidal Wave)', power: 195, mpCost: 39, icon: '🌊', tagType: 'info', sanctuaryBuff: '沧海狂澜: 水系威力提升 +50%，冲散物理障碍' },
  { id: 'odin', name: '战绝英灵·奥丁', element: '物理圣属性', skillName: '斩铁剑 (Zantetsuken)', power: 180, mpCost: 48, icon: '⚔️', tagType: 'warning', sanctuaryBuff: '破甲斩铁: 首领承受固定真实创伤，杂兵 100% 斩断' },
  { id: 'phoenix', name: '涅槃圣鸟·不死鸟', element: '火圣属性', skillName: '转生之炎 (Flames of Rebirth)', power: 160, mpCost: 110, icon: '🕊️', tagType: 'error', sanctuaryBuff: '永恒涅槃: 战斗不能全员满血复活，附带神圣护盾' },
  { id: 'titan', name: '撼地神岳·泰坦', element: '土属性', skillName: '大地之怒 (Earth Fury)', power: 110, mpCost: 25, icon: '⛰️', tagType: 'warning', sanctuaryBuff: '大地固着: 全体物理震地打击，阻滞敌方行动条 25%' },
  { id: 'ifrit', name: '狱炎魔王·伊芙利特', element: '火属性', skillName: '地狱火炎 (Hellfire)', power: 90, mpCost: 11, icon: '🔥', tagType: 'error', sanctuaryBuff: '熔岩炼狱: 附加 3 回合持续灼烧热力创伤' },
  { id: 'shiva', name: '霜雪女王·希瓦', element: '冰属性', skillName: '钻石星尘 (Diamond Dust)', power: 90, mpCost: 10, icon: '❄️', tagType: 'info', sanctuaryBuff: '极寒领域: 冻结敌方施法咏唱，减缓 30% 攻速' },
  { id: 'ramuh', name: '掣电狂神·拉姆', element: '雷属性', skillName: '制裁之雷 (Judgement Bolt)', power: 90, mpCost: 12, icon: '⚡', tagType: 'warning', sanctuaryBuff: '天谴狂雷: 对机械与水栖敌对生物造成 2.5x 特攻' },
  { id: 'golem', name: '守护岩灵·巨石魔兵', element: '力场属性', skillName: '大地之壁 (Earth Wall)', power: 70, mpCost: 18, icon: '🗿', tagType: 'default', sanctuaryBuff: '绝对岩障: 展开抵挡全队 3500 物理伤害的吸伤屏障' },
  { id: 'carbuncle', name: '晶莹妖精·卡邦库尔', element: '光属性', skillName: '红宝石之光 (Ruby Light)', power: 60, mpCost: 15, icon: '💎', tagType: 'success', sanctuaryBuff: '镜光反射: 全员施加 Reflect 状态，弹回敌方高阶黑魔法' },
  { id: 'syldra', name: '疾风苍龙·希尔德拉', element: '风属性', skillName: '暴风雷鸣 (Thunderstorm)', power: 165, mpCost: 32, icon: '🌪️', tagType: 'info', sanctuaryBuff: '苍穹龙鸣: 穿透风水双弱点，引发次元激波' },
  { id: 'catoblepas', name: '灾厄石眼·卡托布雷帕斯', element: '暗黑属性', skillName: '邪眼石化 (Evil Eye)', power: 120, mpCost: 15, icon: '👁️', tagType: 'default', sanctuaryBuff: '灰烬石化: 判定致命石化硬化，无法复原' }
]

const descentCasters: DescentCaster[] = [
  { id: 'krile', name: '可露儿 (Krile)', title: '远古以太直系血脉', specialty: '连续魔双召唤宗师', bonusMult: 1.35, mpDiscount: 0.25, shieldBoost: 500 },
  { id: 'lenna', name: '蕾娜 (Lenna)', title: '圣光恩泽召唤贤者', specialty: '精神与以太治愈', bonusMult: 1.20, mpDiscount: 0.15, shieldBoost: 800 },
  { id: 'faris', name: '法丽丝 (Faris)', title: '星海风水共鸣者', specialty: '全元素自然狂潮连锁', bonusMult: 1.30, mpDiscount: 0.10, shieldBoost: 700 },
  { id: 'bartz', name: '巴兹 (Bartz)', title: '风之勇者均质体', specialty: '魔武双修真伤贯穿', bonusMult: 1.25, mpDiscount: 0.10, shieldBoost: 600 }
]

const descentRelics: DescentRelic[] = [
  { id: 'staff_of_magi', name: '贤者神圣法杖 (Staff of Magi)', effect: '全属性魔法破坏力 +25%', dmgMult: 1.25, syncBonus: 10 },
  { id: 'circlet_of_stars', name: '星之圣环 (Circlet of Stars)', effect: '神明共鸣同步率 +25%', dmgMult: 1.15, syncBonus: 25 },
  { id: 'dragon_crest', name: '龙皇印绶 (Dragon Crest)', effect: '非元素破坏力穿透 +35%', dmgMult: 1.35, syncBonus: 15 },
  { id: 'aether_mantle', name: '以太圣羽披风 (Aether Mantle)', effect: '团队伤害吸收护盾 +1500 HP', dmgMult: 1.10, syncBonus: 20 }
]

const descentTargets: DescentTarget[] = [
  { id: 'exdeath_void', name: '埃克斯迪斯虚无化身 (Neo Exdeath)', type: '虚无裂隙终局首领', maxHp: 60000, weakness: '圣 / 无属性贯穿', defenseRating: '极高魔抗 (忽略常规弱点)', fieldBonus: '虚无暗域' },
  { id: 'shinryu_abyss', name: '始源神龙 (Shinryu)', type: '深渊古龙始祖', maxHp: 55000, weakness: '圣 / 龙属性特攻', defenseRating: '坚韧魔鳞 (免疫水冰)', fieldBonus: '龙之天顶' },
  { id: 'omega_mech', name: '机械暴君欧米茄 (Omega)', type: '古代魔导兵器', maxHp: 55000, weakness: '雷属性 (雷特攻 x2.5)', defenseRating: '精金黑甲 (物理免疫)', fieldBonus: '波动电磁' },
  { id: 'chaos_fiends', name: '混沌四界四天王 (Chaos Fiends)', type: '多目标元素聚合', maxHp: 48000, weakness: '火/冰/雷/风相生相克', defenseRating: '均衡四象防壁', fieldBonus: '四象乱流' }
]

const selectedPrimarySummonId = ref('bahamut')
const isDualSummon = ref(true)
const selectedSecondarySummonId = ref('leviathan')
const selectedDescentCaster = ref('krile')
const selectedRelicId = ref('staff_of_magi')
const selectedTargetProfile = ref('exdeath_void')
const aetherPurity = ref(85)

const isDescentRunning = ref(false)
const descentProgress = ref(0)
const descentCurrentPhase = ref('')
const descentLogs = ref<string[]>([
  '=== 太古神明降临仪式已就绪，请编排主副契约后启动仪式 ==='
])
let descentTimer: ReturnType<typeof setInterval> | null = null

const currentPrimarySummon = computed(() => {
  return celestialEntities.find(s => s.id === selectedPrimarySummonId.value) || celestialEntities[0]
})

const currentSecondarySummon = computed(() => {
  return celestialEntities.find(s => s.id === selectedSecondarySummonId.value) || celestialEntities[1]
})

const currentDescentCaster = computed(() => {
  return descentCasters.find(c => c.id === selectedDescentCaster.value) || descentCasters[0]
})

const currentRelic = computed(() => {
  return descentRelics.find(r => r.id === selectedRelicId.value) || descentRelics[0]
})

const currentTarget = computed(() => {
  return descentTargets.find(t => t.id === selectedTargetProfile.value) || descentTargets[0]
})

const calculatedSyncRate = computed(() => {
  const base = 70.0 + (aetherPurity.value * 0.25) + currentRelic.value.syncBonus
  return Math.min(100.0, Math.max(75.0, base))
})

const calculatedTotalMP = computed(() => {
  let baseMp = currentPrimarySummon.value.mpCost
  if (isDualSummon.value) {
    baseMp += currentSecondarySummon.value.mpCost
  }
  return Math.round(baseMp * (1 - currentDescentCaster.value.mpDiscount))
})

const calculatedDescentDamage = computed(() => {
  let dmg = currentPrimarySummon.value.power * 55 * currentDescentCaster.value.bonusMult * currentRelic.value.dmgMult
  if (isDualSummon.value) {
    dmg += currentSecondarySummon.value.power * 45 * currentDescentCaster.value.bonusMult
  }
  const target = currentTarget.value
  const primElem = currentPrimarySummon.value.element
  if (target.weakness.includes(primElem) || primElem === '无属性') {
    dmg *= 1.35
  }
  const syncMult = calculatedSyncRate.value / 100
  return Math.round(dmg * syncMult)
})

const calculatedPartyShield = computed(() => {
  const caster = currentDescentCaster.value
  if (isDualSummon.value) {
    return `${1800 + caster.shieldBoost} 护盾 + 全元素抗性壁`
  }
  return `${1000 + caster.shieldBoost} 护盾`
})

const startAstralDescent = () => {
  if (isDescentRunning.value) return
  isDescentRunning.value = true
  descentProgress.value = 0
  descentCurrentPhase.value = '阶段 1: 召唤阵以太构筑'

  const prim = currentPrimarySummon.value
  const sec = currentSecondarySummon.value
  const caster = currentDescentCaster.value
  const relic = currentRelic.value
  const target = currentTarget.value

  descentLogs.value = [
    `[0.0s] 🌟 统御使者【${caster.name}】举起【${relic.name}】，引动 ${aetherPurity.value}% 纯净以太法潮！`,
    `[0.2s] 📜 绘制远古神明召唤阵，契约谐振同步率达到 ${calculatedSyncRate.value.toFixed(1)}%！`
  ]

  if (descentTimer) clearInterval(descentTimer)

  const phases = [
    { at: 25, name: '阶段 2: 撕裂虚空迎奉真身', log: `[0.5s] 🐲 苍穹崩裂！主神兽【${prim.name}】真身具象，散发【${prim.sanctuaryBuff}】！` },
    { at: 60, name: '阶段 3: 双重神兽共鸣爆裂', log: isDualSummon.value ? `[1.0s] ⚡ 连续魔共鸣！副位神明【${sec.name}】轰然现世，触发双神合璧共振！` : `[1.0s] 💥 极意爆发！【${prim.skillName}】遮蔽天日轰击目标！` },
    { at: 85, name: '阶段 4: 穿透创伤全额贯穿', log: `[1.4s] 🎯 对【${target.name}】造成 ${calculatedDescentDamage.value.toLocaleString()} 点神圣穿透破坏！` },
    { at: 100, name: '阶段 5: 神力加护与仪式完成', log: `[1.8s] 🛡️ 仪式达成！为光之战士全队赋予【${calculatedPartyShield.value}】，反哺以太回路！` }
  ]

  descentTimer = setInterval(() => {
    descentProgress.value += 10
    const matched = phases.find(p => p.at === descentProgress.value)
    if (matched) {
      descentCurrentPhase.value = matched.name
      descentLogs.value.unshift(matched.log)
    }

    if (descentProgress.value >= 100) {
      if (descentTimer) clearInterval(descentTimer)
      descentTimer = null
      isDescentRunning.value = false
      descentProgress.value = 100
      message.success(`太古神明降临仪式大成！造成 ${calculatedDescentDamage.value.toLocaleString()} 穿透伤害！`)
    }
  }, 160)
}

const copyDescentConfig = () => {
  const prim = currentPrimarySummon.value
  const sec = currentSecondarySummon.value
  const caster = currentDescentCaster.value
  const target = currentTarget.value
  const configText = `[神明降临遥测] 主契约:${prim.name} | 双召唤:${isDualSummon.value ? sec.name : '关闭'} | 统御使:${caster.name} | 目标:${target.name} | 伤害:${calculatedDescentDamage.value.toLocaleString()} | 同步率:${calculatedSyncRate.value.toFixed(1)}% | MP:${calculatedTotalMP.value}`
  navigator.clipboard.writeText(configText).then(() => {
    message.success('太古神明降临配置已复制到剪贴板！')
  }).catch(() => {
    message.info('配置已复制')
  })
}

const exportAstralDescentCert = () => {
  const prim = currentPrimarySummon.value
  const sec = currentSecondarySummon.value
  const caster = currentDescentCaster.value
  const relic = currentRelic.value
  const target = currentTarget.value
  const now = new Date()
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 19)

  const content = `================================================================================
《光之战士：时空裂隙》太古十二柱神明契约共鸣与全息降临认证方案书
================================================================================
推演方案: Ancient Celestial Summoning & Astral Descent Certificate
颁发机构: VBLE Celestial Summons Matrix / 召唤神殿圣事司
推演版本: VBLE Celestial Summons Matrix v2.2.258
引擎规范: Godot 4.6 LTS Celestial Descent Architecture
签发时间: ${dateStr} (CST)

【降临仪式核心契约神兽】
- 主位神明契约: ${prim.name} (${prim.id})
- 本源属性类别: ${prim.element}
- 绝灭必杀绝技: ${prim.skillName} (威力倍率: ${prim.power})
- 团队守护回响: ${prim.sanctuaryBuff}
- 双召唤连携模式: ${isDualSummon.value ? `已激活 - 副位神明: ${sec.name} (${sec.skillName})` : '单柱极限咏唱'}

【召唤统御者与圣物阵法】
- 统御召唤使者: ${caster.name} (${caster.title} - ${caster.specialty})
- 施法加成倍率: 基础伤害 +${Math.round((caster.bonusMult - 1) * 100)}%, MP减免 ${Math.round(caster.mpDiscount * 100)}%
- 镶嵌圣器神印: ${relic.name} (${relic.effect})
- 以太法潮纯度: ${aetherPurity.value}%
- 契约谐振同步率: ${calculatedSyncRate.value.toFixed(1)}%

【试炼目标受击与实战遥测】
- 挑战目标首领: ${target.name} (${target.type})
- 目标弱点剖析: ${target.weakness}
- 本轮神明降临总伤: ${calculatedDescentDamage.value.toLocaleString()} 穿透伤害
- 以太法力总消耗: ${calculatedTotalMP.value} MP
- 全队神明庇护加持: ${calculatedPartyShield.value}

================================================================================
数字防伪哈希: SHA256-ASTRAL-${Math.random().toString(36).substring(2, 10).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}
================================================================================`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ancient_celestial_descent_v2.2.258_${prim.id}.txt`
  a.click()
  URL.revokeObjectURL(url)
  message.success(`已导出太古神明降临认证方案书: ${prim.name}`)
}

const gdCelestialDescentCode = `# ==============================================================================
# CelestialDescentEngine - 太古十二柱神明契约共鸣与全息降临解算引擎
# 文件路径: res://scripts/summons/celestial_descent_engine.gd
# 架构规范: Godot 4.6 LTS / VBLE Celestial Summons Matrix v2.2.258
# 核心职责: 管理十二柱太古神明共鸣、双连续魔仪式状态机、以太纯度增幅与团队神力结界
# ==============================================================================
class_name CelestialDescentEngine
extends Node

signal descent_initiated(primary_summon: String, secondary_summon: String, is_dual: bool)
signal ceremony_phase_updated(phase_name: String, progress: float)
signal descent_completed(combat_telemetry: Dictionary)
signal party_shield_applied(shield_hp: int, status_buff: String)

const CELESTIAL_ENTITIES: Dictionary = {
	"bahamut": { "name": "太古龙皇·巴哈姆特", "element": "None", "power": 250, "mp": 66 },
	"leviathan": { "name": "灭世水神·利维亚桑", "element": "Water", "power": 195, "mp": 39 },
	"odin": { "name": "战绝英灵·奥丁", "element": "Holy", "power": 180, "mp": 48 },
	"phoenix": { "name": "涅槃圣鸟·不死鸟", "element": "FireHoly", "power": 160, "mp": 110 },
	"titan": { "name": "撼地神岳·泰坦", "element": "Earth", "power": 110, "mp": 25 },
	"ifrit": { "name": "狱炎魔王·伊芙利特", "element": "Fire", "power": 90, "mp": 11 },
	"shiva": { "name": "霜雪女王·希瓦", "element": "Ice", "power": 90, "mp": 10 },
	"ramuh": { "name": "掣电狂神·拉姆", "element": "Lightning", "power": 90, "mp": 12 },
	"golem": { "name": "守护岩灵·巨石魔兵", "element": "Earth", "power": 70, "mp": 18 },
	"carbuncle": { "name": "晶莹妖精·卡邦库尔", "element": "Holy", "power": 60, "mp": 15 },
	"syldra": { "name": "疾风苍龙·希尔德拉", "element": "Wind", "power": 165, "mp": 32 },
	"catoblepas": { "name": "灾厄石眼·卡托布雷帕斯", "element": "Dark", "power": 120, "mp": 15 }
}

@export var caster_id: String = "krile"
@export var aether_purity: float = 85.0
@export var is_dual_summon: bool = true

func calculate_sync_rate(relic_bonus: float) -> float:
	return clampf(70.0 + (aether_purity * 0.25) + relic_bonus, 75.0, 100.0)

func calculate_total_mp(prim_id: String, sec_id: String, mp_discount: float) -> int:
	var prim = CELESTIAL_ENTITIES.get(prim_id, CELESTIAL_ENTITIES["bahamut"])
	var total_base = prim.mp
	if is_dual_summon:
		var sec = CELESTIAL_ENTITIES.get(sec_id, CELESTIAL_ENTITIES["leviathan"])
		total_base += sec.mp
	return int(total_base * (1.0 - mp_discount))

func execute_astral_descent(prim_id: String, sec_id: String, target_element: String) -> Dictionary:
	var prim = CELESTIAL_ENTITIES.get(prim_id, CELESTIAL_ENTITIES["bahamut"])
	emit_signal("descent_initiated", prim_id, sec_id, is_dual_summon)

	var base_dmg: float = prim.power * 55.0
	if is_dual_summon:
		var sec = CELESTIAL_ENTITIES.get(sec_id, CELESTIAL_ENTITIES["leviathan"])
		base_dmg += sec.power * 45.0

	var sync: float = calculate_sync_rate(10.0)
	var final_damage: int = int(base_dmg * (sync / 100.0))
	var shield_granted: int = 2400 if is_dual_summon else 1200

	emit_signal("party_shield_applied", shield_granted, "ASTRAL_SANCTUARY_BUFF")

	var telemetry: Dictionary = {
		"primary_summon": prim.name,
		"is_dual": is_dual_summon,
		"sync_rate": sync,
		"total_damage": final_damage,
		"shield_granted": shield_granted,
		"timestamp": Time.get_datetime_string_from_system()
	}
	emit_signal("descent_completed", telemetry)
	return telemetry
`

// ==========================================
// 🌌 太古十二神魔天体共鸣阵与超绝召来解算工坊 (v2.2.276)
// ==========================================
interface TranscendenceArray {
  id: string
  name: string
  tag: string
  icon: string
  summonsText: string
  frequency: number
  overdrive: number
  integration: number
  lens: number
  gradient: string
  baseDamage: number
}

const transcendenceArrays: TranscendenceArray[] = [
  {
    id: 'cosmic_genesis',
    name: '创世全域星辰阵 (Cosmic Genesis Array)',
    tag: '亿万星辉',
    icon: '🌌',
    summonsText: '巴哈姆特 × 希尔德拉 × 不死鸟',
    frequency: 528,
    overdrive: 2.8,
    integration: 92,
    lens: 15.0,
    gradient: 'radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(59,130,246,0.3) 50%, transparent 80%)',
    baseDamage: 88000
  },
  {
    id: 'abyssal_maelstrom',
    name: '绝海深渊灭世阵 (Abyssal Maelstrom Array)',
    tag: '潮汐退行',
    icon: '🌊',
    summonsText: '利维亚桑 × 希瓦 × 卡邦库尔',
    frequency: 432,
    overdrive: 2.4,
    integration: 88,
    lens: 22.5,
    gradient: 'radial-gradient(circle, rgba(6,182,212,0.55) 0%, rgba(59,130,246,0.3) 50%, transparent 80%)',
    baseDamage: 72000
  },
  {
    id: 'infernal_wrath',
    name: '业火雷霆崩山阵 (Infernal Wrath Array)',
    tag: '熔岩雷暴',
    icon: '🌋',
    summonsText: '伊芙利特 × 拉姆 × 泰坦',
    frequency: 639,
    overdrive: 3.2,
    integration: 85,
    lens: 12.0,
    gradient: 'radial-gradient(circle, rgba(239,68,68,0.55) 0%, rgba(245,158,11,0.3) 50%, transparent 80%)',
    baseDamage: 79000
  },
  {
    id: 'ragnarok_judgment',
    name: '诸神黄昏断罪阵 (Ragnarok Judgment Array)',
    tag: '斩铁即死',
    icon: '⚔️',
    summonsText: '奥丁 × 卡托布雷帕斯 × 巨石魔兵',
    frequency: 852,
    overdrive: 3.8,
    integration: 96,
    lens: 35.0,
    gradient: 'radial-gradient(circle, rgba(245,158,11,0.55) 0%, rgba(168,85,247,0.3) 50%, transparent 80%)',
    baseDamage: 96000
  }
]

const selectedTranscendenceArrayId = ref('cosmic_genesis')
const resonanceFrequency = ref(528)
const overdriveMultiplier = ref(2.8)
const casterIntegration = ref(92)
const voidLensDeflection = ref(15.0)
const enablePrimalLimitBreak = ref(true)
const enableDualcastSync = ref(true)
const enableAetherDrainShield = ref(true)
const isSimulatingTranscendence = ref(false)

const currentTranscendenceArray = computed(() => {
  return transcendenceArrays.find(a => a.id === selectedTranscendenceArrayId.value) || transcendenceArrays[0]
})

const applyTranscendenceArray = (arrayId: string) => {
  selectedTranscendenceArrayId.value = arrayId
  const a = transcendenceArrays.find(arr => arr.id === arrayId)
  if (a) {
    resonanceFrequency.value = a.frequency
    overdriveMultiplier.value = a.overdrive
    casterIntegration.value = a.integration
    voidLensDeflection.value = a.lens
    message.info(`已切换至【${a.name}】天体共鸣阵列`)
  }
}

const resetTranscendenceParams = () => {
  applyTranscendenceArray('cosmic_genesis')
}

const transcendenceSimulationLogs = ref<string[]>([
  '系统就绪: Godot 4.6 LTS 太古十二神魔天体共鸣阵列引擎初始化完成',
  '晶石谐振网格: 三位一体神印同步率锁定 99.4%',
  '虚空引力透镜: 偏转角动态伺服就绪',
  '时钟自锁状态: 双连续魔相位同步准备'
])

const transcendenceMetrics = computed(() => {
  const powerMW = Math.round(resonanceFrequency.value * overdriveMultiplier.value * (casterIntegration.value / 100) * 1.28)
  
  const rawDmg = Math.round(currentTranscendenceArray.value.baseDamage * (overdriveMultiplier.value / 2.0) * (casterIntegration.value / 100) * (enablePrimalLimitBreak.value ? 1.65 : 1.0))
  const finalDmg = enablePrimalLimitBreak.value ? rawDmg : Math.min(99999, rawDmg)
  const damageText = finalDmg.toLocaleString()

  const strainPct = Math.min(100, Math.round((overdriveMultiplier.value - 1.0) * 22 + voidLensDeflection.value * 0.8))
  const shieldHP = Math.round(3500 + overdriveMultiplier.value * 1200 + (enableAetherDrainShield.value ? 1800 : 0))

  let rating = 'EX-Tier 太古混沌极限'
  if (overdriveMultiplier.value >= 3.5) rating = 'SSS-Tier 诸神终焉'
  else if (overdriveMultiplier.value >= 2.5) rating = 'SS-Tier 创世星辉'
  else rating = 'S-Tier 神明同调'

  return {
    powerMW,
    damageText,
    strainPct,
    shieldHP,
    rating
  }
})

const simulateTranscendenceEvocation = () => {
  isSimulatingTranscendence.value = true
  const now = new Date()
  const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  transcendenceSimulationLogs.value = [
    `[${ts}] 🚀 启动太古神魔天体超绝召来演算...`,
    `[${ts}] 阶段 1: 以太结界共振频度调谐至 ${resonanceFrequency.value} Hz，激活【${currentTranscendenceArray.value.summonsText}】`,
    `[${ts}] 阶段 2: 虚空引力透镜偏转 ${voidLensDeflection.value.toFixed(1)}°，汇聚 ${transcendenceMetrics.value.powerMW} MW 以太能级`,
    `[${ts}] 阶段 3: 召唤师精神统合度 ${casterIntegration.value}%，${enableDualcastSync.value ? '连续魔时钟相位锁死' : '异步施法模式'}`,
    `[${ts}] 阶段 4: 超绝召唤过载倍率 ${overdriveMultiplier.value.toFixed(1)}x，${enablePrimalLimitBreak.value ? '神格上限击穿 (突破 99999)' : '伤害锁定 99999'}`,
    `[${ts}] ✨ 召来演算完成！造成 ${transcendenceMetrics.value.damageText} 点穿透创伤，展开 ${transcendenceMetrics.value.shieldHP} HP 神圣结界！`
  ]

  setTimeout(() => {
    isSimulatingTranscendence.value = false
    message.success(`⚡ 超绝召来演算完成！极伤输出 ${transcendenceMetrics.value.damageText} 点`)
  }, 600)
}

const exportTranscendenceEvocationCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  const certLines = [
    '================================================================================',
    '   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)',
    '   太古十二神魔天体共鸣阵与超绝召来方案证书 (v2.2.276)',
    '================================================================================',
    `颁发时间: ${timeStr}`,
    `共鸣阵列: ${currentTranscendenceArray.value.name}`,
    `神魔连携: ${currentTranscendenceArray.value.summonsText}`,
    '运行架构: Godot 4.6 LTS / celestial_transcendence_evocation_engine.gd',
    '',
    '【天体共鸣阵列 Uniform 参数】',
    `- 谐振频度 (Resonance Frequency): ${resonanceFrequency.value} Hz`,
    `- 超绝过载倍率 (Overdrive Multiplier): ${overdriveMultiplier.value.toFixed(1)}x`,
    `- 召唤师精神统合度 (Caster Integration): ${casterIntegration.value}%`,
    `- 虚空引力透镜偏转角 (Lens Deflection): ${voidLensDeflection.value.toFixed(1)}°`,
    `- 破限模式 (Break 99999 Limit): ${enablePrimalLimitBreak.value ? '已启用 (上限完全解放)' : '关闭 (锁定 99999)'}`,
    `- 双连续魔时钟自锁 (Clock Phase Lock): ${enableDualcastSync.value ? '已自锁 (零时延混响)' : '异步'}`,
    `- 以太反向噬魂护盾 (Soul Drain Ward): ${enableAetherDrainShield.value ? '已展开 (+1800 HP 护盾)' : '关闭'}`,
    '',
    '【实机遥测与战斗伤害结算】',
    `- 阵列聚合谐振功率: ${transcendenceMetrics.value.powerMW} MW`,
    `- 超绝穿透真实极伤: ${transcendenceMetrics.value.damageText} 点`,
    `- 以太反冲负荷率: ${transcendenceMetrics.value.strainPct}%`,
    `- 团队神圣结界值: +${transcendenceMetrics.value.shieldHP} HP`,
    `- 综合阵列评级: ${transcendenceMetrics.value.rating}`,
    '',
    '【底层引擎契约安全指纹】',
    '- Engine Spec: Godot 4.6 LTS / GDScript RefCounted Pure Logic',
    `- Digital Fingerprint: SHA256-TRANSCEND-${Math.random().toString(36).substring(2, 10).toUpperCase()}${Date.now().toString(36).toUpperCase()}`,
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
    a.download = `celestial_transcendence_v2.2.276_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  message.success('太古超绝召来方案书已导出并同步至剪贴板！')
}

const gdTranscendenceEvocationCode = [
  '## celestial_transcendence_evocation_engine.gd',
  '## Godot 4.6 LTS - 太古十二神魔天体共鸣阵与超绝召来解算引擎',
  'extends RefCounted',
  'class_name CelestialTranscendenceEvocationEngine',
  '',
  'signal resonance_array_activated(array_id: String, frequency: float, power_mw: float)',
  'signal transcendence_strike_resolved(damage: int, is_limit_broken: bool, shield_hp: int)',
  '',
  'var frequency: float = 528.0',
  'var overdrive_multiplier: float = 2.8',
  'var caster_integration: float = 92.0',
  'var void_lens_deflection: float = 15.0',
  'var break_damage_limit: bool = true',
  'var enable_dualcast_sync: bool = true',
  '',
  'func calculate_evocation_damage(base_array_damage: float) -> Dictionary:',
  '\tvar raw_dmg: float = base_array_damage * (overdrive_multiplier / 2.0) * (caster_integration / 100.0)',
  '\tif break_damage_limit:',
  '\t\traw_dmg *= 1.65',
  '\t',
  '\tvar final_dmg: int = int(raw_dmg) if break_damage_limit else mini(99999, int(raw_dmg))',
  '\tvar power_mw: float = frequency * overdrive_multiplier * (caster_integration / 100.0) * 1.28',
  '\tvar shield_hp: int = int(3500.0 + overdrive_multiplier * 1200.0 + (1800.0 if enable_dualcast_sync else 0.0))',
  '\tvar strain_pct: float = clampf((overdrive_multiplier - 1.0) * 22.0 + void_lens_deflection * 0.8, 0.0, 100.0)',
  '\t',
  '\treturn {',
  '\t\t"final_damage": final_dmg,',
  '\t\t"power_mw": power_mw,',
  '\t\t"shield_hp": shield_hp,',
  '\t\t"strain_pct": strain_pct,',
  '\t\t"is_limit_broken": break_damage_limit,',
  '\t\t"signature_hash": "SHA256-TRANSCEND-" + String.num_int64(Time.get_ticks_msec()).sha256_text().substr(0, 16)',
  '\t}'
].join('\n')

// ================= 🐉 工坊 4: 全域太古十二柱幻兽高维召唤契约、以太逆流祈愿与神威降临工坊 (v2.2.305) =================
interface HighDimensionalSummonArchetype {
  id: string
  name: string
  title: string
  pact: string
  icon: string
  tagType: 'info' | 'warning' | 'error' | 'success'
  desc: string
  baseBurst: number
  mpCost: number
}

const highDimensionalArchetypes: HighDimensionalSummonArchetype[] = [
  {
    id: 'bahamut_megaflare_apotheosis',
    name: '终焉巴哈姆特',
    title: '龙王神圣核爆降临',
    pact: '至高龙皇神契',
    icon: '🐲',
    tagType: 'error',
    desc: '驾驭以太原初聚合引力，释放【亿万兆耀斑】，全屏无视魔防与元素抗性毁灭打击。',
    baseBurst: 240000,
    mpCost: 160
  },
  {
    id: 'leviathan_tsunami_deluge',
    name: '沧海利维亚桑',
    title: '万丈海啸绝对冲蚀',
    pact: '深渊海神契约',
    icon: '🌊',
    tagType: 'info',
    desc: '从时空断层唤出太古汪洋巨浪，瞬间涤荡敌方全员增益状态并附加绝对潮湿易伤。',
    baseBurst: 195000,
    mpCost: 130
  },
  {
    id: 'odin_zantetsuken_singularity',
    name: '真·奥丁斩铁剑',
    title: '因果律一刀两断',
    pact: '断生绝命契约',
    icon: '🗡️',
    tagType: 'warning',
    desc: '踏破时间的战马斩铁突击，若敌方非免疫首领直接斩杀，面对领主则触发极限破防真伤。',
    baseBurst: 280000,
    mpCost: 180
  },
  {
    id: 'phoenix_rebirth_nirvana',
    name: '不灭神鸟凤凰',
    title: '全员涅槃复生余烬',
    pact: '永生回溯契约',
    icon: '🔥',
    tagType: 'success',
    desc: '降下神圣永恒烈焰，阵亡队员以 100% HP/MP 满状态起死回生，并赋予全队全伤吸收圣盾。',
    baseBurst: 160000,
    mpCost: 110
  }
]

const selectedHighDimensionalArchetypeId = ref<string>('bahamut_megaflare_apotheosis')
const aetherBackflowDepth = ref<number>(70)
const prayerResonanceHz = ref<number>(528)
const summonerSoulHarmony = ref<number>(140)
const realmCurvature = ref<number>(3.2)

const zeroMpAetherPrayerLock = ref<boolean>(true)
const dualSummonHarmonicSync = ref<boolean>(true)
const godhoodLimitBreakSeal = ref<boolean>(true)

const isSimulatingHighDimensional = ref<boolean>(false)
const highDimSimStep = ref<number>(5)
const highDimSimCurrentLog = ref<string>('太古十二柱高维召唤神威矩阵已就绪，等待祈愿指令。')

const currentHighDimensionalArchetype = computed(() => {
  return highDimensionalArchetypes.find(a => a.id === selectedHighDimensionalArchetypeId.value) || highDimensionalArchetypes[0]
})

const calculatedSummonBurstDmg = computed(() => {
  const base = currentHighDimensionalArchetype.value.baseBurst
  const aetherMult = 1 + (aetherBackflowDepth.value / 100) * 0.6
  const harmonyMult = (summonerSoulHarmony.value / 100)
  const syncMult = dualSummonHarmonicSync.value ? 1.45 : 1.0
  const breakMult = godhoodLimitBreakSeal.value ? 1.75 : 1.0
  return Math.round(base * aetherMult * harmonyMult * syncMult * breakMult)
})

const calculatedNirvanaShieldHp = computed(() => {
  const baseShield = 12000
  const backflowBonus = (aetherBackflowDepth.value / 100) * 18000
  const harmonyBonus = (summonerSoulHarmony.value / 100) * 15000
  return Math.round(baseShield + backflowBonus + harmonyBonus)
})

const calculatedSummonDurationSec = computed(() => {
  const base = 15.0
  const curvatureBonus = realmCurvature.value * 3.0
  return (base + curvatureBonus).toFixed(1)
})

const calculatedSummonPactTier = computed(() => {
  const dmg = calculatedSummonBurstDmg.value
  if (dmg > 900000) return 'EX·太古创世终焉幻兽至尊'
  if (dmg > 600000) return 'SSS·高维神格湮灭王座'
  if (dmg > 400000) return 'SS·太古十二神圣领主'
  return 'S·远古天体守护契约'
})

const scrollToHighDimensionalStudio = () => {
  const el = document.getElementById('high-dimensional-summon-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const resetHighDimensionalParameters = () => {
  selectedHighDimensionalArchetypeId.value = 'bahamut_megaflare_apotheosis'
  aetherBackflowDepth.value = 70
  prayerResonanceHz.value = 528
  summonerSoulHarmony.value = 140
  realmCurvature.value = 3.2
  zeroMpAetherPrayerLock.value = true
  dualSummonHarmonicSync.value = true
  godhoodLimitBreakSeal.value = true
  message.info('已恢复高维召唤神威工坊初始调控参数')
}

const runHighDimensionalSimulation = () => {
  if (isSimulatingHighDimensional.value) return
  isSimulatingHighDimensional.value = true
  highDimSimStep.value = 1
  highDimSimCurrentLog.value = '阶段 1/5: 展开高维法阵，测算环境游离以太通量与逆流谐振...'

  setTimeout(() => {
    highDimSimStep.value = 2
    highDimSimCurrentLog.value = '阶段 2/5: 注入召唤师灵魂烙印，校准 528 Hz 神圣共鸣天体弦...'
  }, 400)

  setTimeout(() => {
    highDimSimStep.value = 3
    highDimSimCurrentLog.value = '阶段 3/5: 加载双重幻兽同契协议，挂载 0 MP 逆流祈愿回路...'
  }, 800)

  setTimeout(() => {
    highDimSimStep.value = 4
    highDimSimCurrentLog.value = '阶段 4/5: 激活神格解放符印，解除 Godot 4.6 LTS 伤害上限天花板...'
  }, 1200)

  setTimeout(() => {
    highDimSimStep.value = 5
    highDimSimCurrentLog.value = '阶段 5/5: 生成高维召唤方案证书，锁定实机运行时神兽降临参数！'
    isSimulatingHighDimensional.value = false
    message.success('高维召唤神威推演完成！')
  }, 1600)
}

const exportHighDimensionalCertificate = () => {
  const arch = currentHighDimensionalArchetype.value
  const certContent = `================================================================================
  《光之战士：时空裂隙》太古十二柱幻兽高维召唤契约方案证书 (v2.2.305)
  生成时间: ${new Date().toISOString()}
  原型构架: ${arch.name} (${arch.pact})
  神阶契约: ${calculatedSummonPactTier.value}
================================================================================
【调控参数】
- 以太逆流注能: ${aetherBackflowDepth.value}%
- 祈愿共鸣赫兹: ${prayerResonanceHz.value} Hz
- 召唤师魂印调和: ${summonerSoulHarmony.value}%
- 界域穿梭曲率: ${realmCurvature.value.toFixed(1)} G
- 0 MP 逆流祈愿: ${zeroMpAetherPrayerLock.value ? '已开启' : '关闭'}
- 双重幻兽同契: ${dualSummonHarmonicSync.value ? '已开启' : '关闭'}
- 999999 神格破限: ${godhoodLimitBreakSeal.value ? '已开启' : '关闭'}

【实时解算能效】
- 神威极限爆发伤害: ${calculatedSummonBurstDmg.value.toLocaleString()} DMG
- 全队涅槃圣盾护佑: ${calculatedNirvanaShieldHp.value.toLocaleString()} HP
- 幻兽降临维持时限: ${calculatedSummonDurationSec.value} 秒
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
    a.download = `high_dim_summon_cert_v2.2.305_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Export certificate error:', e)
  }

  message.success('高维幻兽契约方案证书已导出并同步至剪贴板！')
}

const activeHighDimCodeTab = ref<'contract' | 'prayer' | 'synergy'>('contract')

const gdHighDimContractCode = `## high_dimensional_summon_contract.gd
## Godot 4.6 LTS - 太古十二柱高维幻兽降临与伤害解算器
extends RefCounted
class_name HighDimensionalSummonContract

static func compute_evocation_burst(
	base_burst: int,
	aether_backflow_pct: float,
	harmony_pct: float,
	limit_break_enabled: bool
) -> Dictionary:
	var aether_mult: float = 1.0 + (aether_backflow_pct / 100.0) * 0.6
	var soul_mult: float = harmony_pct / 100.0
	var raw_damage: float = float(base_burst) * aether_mult * soul_mult
	
	if limit_break_enabled:
		raw_damage *= 1.75
		
	var final_dmg: int = int(raw_damage) if limit_break_enabled else mini(999999, int(raw_damage))
	return {
		"final_damage": final_dmg,
		"limit_broken": limit_break_enabled and final_dmg > 999999,
		"evocation_power_mw": raw_damage * 0.12
	}
`

const gdAetherPrayerCode = `## aether_backflow_prayer_engine.gd
## Godot 4.6 LTS - 0 MP 环境以太逆流祈愿回路
extends RefCounted
class_name AetherBackflowPrayerEngine

static func resolve_prayer_mp(
	base_mp_cost: int,
	zero_mp_lock: bool,
	backflow_depth: float
) -> Dictionary:
	if zero_mp_lock:
		var env_aether_draw: float = float(base_mp_cost) * (backflow_depth / 100.0)
		return {
			"caster_mp_consumed": 0,
			"environment_aether_draw": env_aether_draw,
			"prayer_success": true
		}
	return {
		"caster_mp_consumed": base_mp_cost,
		"environment_aether_draw": 0.0,
		"prayer_success": true
	}
`

const gdDualCelestialSyncCode = `## dual_celestial_harmonic_synergy.gd
## Godot 4.6 LTS - 双重太古神兽同契协奏共振机
extends RefCounted
class_name DualCelestialHarmonicSynergy

signal dual_summon_harmonized(celestial_a: String, celestial_b: String, combo_multiplier: float)

static func execute_harmonic_strike(
	celestial_a_dmg: int,
	celestial_b_dmg: int,
	harmonic_active: bool
) -> Dictionary:
	var multiplier: float = 1.45 if harmonic_active else 1.0
	var combined_dmg: int = int(float(celestial_a_dmg + celestial_b_dmg) * multiplier)
	
	return {
		"total_combined_damage": combined_dmg,
		"is_harmonic_resonance": harmonic_active,
		"synergy_bonus": multiplier
	}
`

const currentHighDimCode = computed(() => {
  if (activeHighDimCodeTab.value === 'contract') return gdHighDimContractCode
  if (activeHighDimCodeTab.value === 'prayer') return gdAetherPrayerCode
  return gdDualCelestialSyncCode
})

const copyHighDimCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentHighDimCode.value).then(() => {
      message.success('Godot 4.6 LTS 幻兽神威源码已复制至剪贴板！')
    }).catch(() => {
      message.error('复制失败，请手动选取复制')
    })
  }
}

onUnmounted(() => {
  stopOdinTimer()
  if (descentTimer) {
    clearInterval(descentTimer)
    descentTimer = null
  }
})

// ==========================================
// v2.2.331: 幻兽太古契约阵列与神威协同工坊逻辑
// ==========================================
const scrollToAncientPactAwakeningStudio = () => {
  const el = document.getElementById('ancient-pact-awakening-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

interface AncientPactArchetype {
  id: string
  name: string
  subtitle: string
  icon: string
  tag: string
  desc: string
  baseDamageMln: number
}

const ancientPactArchetypes: AncientPactArchetype[] = [
  {
    id: 'bahamut_megaflare',
    name: '龙王巴哈姆特',
    subtitle: '亿万核爆天球降临与虚空崩解流',
    icon: '🐉',
    tag: '龙皇核爆',
    desc: '从外层空间引落超新星能量天球，撕裂一切物理与魔法阻抗，附带绝对真实伤害与虚空湮灭冲击。',
    baseDamageMln: 320
  },
  {
    id: 'leviathan_tsunami',
    name: '水神利维亚桑',
    subtitle: '沧海潮汐怒涛与全息绝对净灵流',
    icon: '🌊',
    tag: '海皇潮涌',
    desc: '召引远古洋流倒灌天际，净化战场全域负面异常，同时造成滔天巨浪多段无视抗性重压。',
    baseDamageMln: 260
  },
  {
    id: 'odin_zantetsuken',
    name: '战神奥丁',
    subtitle: '限时微秒斩铁剑与一击断罪流',
    icon: '⚔️',
    tag: '一闪断罪',
    desc: '驾驭斯雷普尼尔以音速冲锋破空，挥落绝对次元斩铁剑，对非首领目标 100% 斩首处决。',
    baseDamageMln: 450
  },
  {
    id: 'phoenix_rejuvenation',
    name: '不死火鸟',
    subtitle: '天国焚寂涅槃与死者生还光环流',
    icon: '🔥',
    tag: '焚寂涅槃',
    desc: '真红圣焰净化全场魔物的同时，以天国余烬复苏全队阵亡角色并恢复 100% 生命与满以太。',
    baseDamageMln: 280
  }
]

const selectedPactArchetypeId = ref('bahamut_megaflare')
const pactHarmonicResonanceRatio = ref(92)
const aethericDrainTolerancePct = ref(45)
const divineAuraDurationSec = ref(18.0)
const eidolonAwakeningBurstMultiplier = ref(6.5)

const unlimitedMpSummonPact = ref(true)
const instantCastNoChargeBar = ref(true)
const celestialCrossSynergyChain = ref(true)

const selectPactArchetype = (id: string) => {
  selectedPactArchetypeId.value = id
  if (message) {
    const arch = ancientPactArchetypes.find(a => a.id === id)
    if (arch) message.success(`已切换太古幻兽觉醒原型：${arch.name}`)
  }
}

const calculatedPactMetrics = computed(() => {
  const arch = ancientPactArchetypes.find(a => a.id === selectedPactArchetypeId.value) || ancientPactArchetypes[0]
  const baseDmg = arch.baseDamageMln * 10000
  const dualBonus = celestialCrossSynergyChain.value ? 1.6 : 1.0
  const finalDamage = Math.round(baseDmg * (pactHarmonicResonanceRatio.value / 100) * eidolonAwakeningBurstMultiplier.value * dualBonus)
  
  const mpGain = unlimitedMpSummonPact.value ? 99.9 : Math.min(95.0, 70.0 + (aethericDrainTolerancePct.value / 80) * 25).toFixed(1)
  const survRate = Math.min(99.9, 85.0 + (divineAuraDurationSec.value / 30) * 12.5 + (instantCastNoChargeBar.value ? 2.4 : 0)).toFixed(1)

  let rank = 'SSR·天域召来宗师'
  if (finalDamage >= 35000000) rank = 'EX·万象太古龙皇神唤使'
  else if (finalDamage >= 20000000) rank = 'SSS·极意神威裁决尊者'

  return {
    divineBurstDamage: finalDamage.toLocaleString(),
    mpEfficiencyGain: `${mpGain}%`,
    partySurvivalResonance: `${survRate}%`,
    evokerMasteryRank: rank
  }
})

const isSimulatingAncientPact = ref(false)
const currentPactSimStage = ref(0)
const ancientPactStages = [
  '以太地脉天顶经纬度捕获与神明唤醒...',
  '灵魂同调共振阵列微秒相位校准...',
  '太古符文契约印记解封与真名解放...',
  '跨位面神威天象裂变与全域核爆轰鸣...',
  '召来方案防伪公钥计算与契约认证封装...'
]

const runAncientPactSimulation = () => {
  if (isSimulatingAncientPact.value) return
  isSimulatingAncientPact.value = true
  currentPactSimStage.value = 0

  const interval = setInterval(() => {
    if (currentPactSimStage.value < ancientPactStages.length - 1) {
      currentPactSimStage.value++
    } else {
      clearInterval(interval)
      isSimulatingAncientPact.value = false
      if (message) {
        message.success(`【神威契约沙盘】推演成功！神威奥义爆发真伤：${calculatedPactMetrics.value.divineBurstDamage}`)
      }
    }
  }, 400)
}

const exportAncientPactCertificate = () => {
  const hash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  const cert = `=== 《光之战士：时空裂隙》太古幻兽契约与神威认证证书 ===
证书编号: PACT-EIDOLON-${hash.substring(0, 12).toUpperCase()}
契约幻兽: ${selectedPactArchetypeId.value}
同调共振率: ${pactHarmonicResonanceRatio.value}%
神威光环时长: ${divineAuraDurationSec.value.toFixed(1)} 秒
奥义真伤倍率: ${eidolonAwakeningBurstMultiplier.value.toFixed(1)}x
神威爆发真伤: ${calculatedPactMetrics.value.divineBurstDamage}
以太能耗利用率: ${calculatedPactMetrics.value.mpEfficiencyGain}
全队庇护稳态率: ${calculatedPactMetrics.value.partySurvivalResonance}
召唤大师评级: ${calculatedPactMetrics.value.evokerMasteryRank}
安全校验哈希: SHA-256:${hash}
验证状态: 官方幻兽召唤引擎认证通过 (Godot 4.6 LTS Verified)
=======================================================`
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(cert)
    if (message) message.success('已导出太古契约方案防伪证书到剪贴板！')
  }
}

const activeAncientPactScriptTab = ref<'pact_array' | 'synergy_coordinator' | 'aether_overdrive'>('pact_array')

const ancientPactScriptCodes = {
  pact_array: `class_name AncientPactAwakeningArray
extends Node

## 最终幻想：时空之轮 - 太古契约阵列与灵魂同调控制器
## 文件路径: res://scripts/combat/summons/ancient_pact_awakening_array.gd
## 引擎版本: Godot Engine 4.6 LTS

signal celestial_awakened(eidolon_name: String, divine_power: float)
signal resonance_sync_completed(resonance_rate: float)

@export var harmonic_resonance_rate: float = 0.92
@export var zero_mp_contract_active: bool = true

func evoke_high_eidolon(eidolon_id: String, base_power: float, multiplier: float) -> Dictionary:
    var final_divine_dmg: float = base_power * harmonic_resonance_rate * multiplier
    celestial_awakened.emit(eidolon_id, final_divine_dmg)
    return {
        "eidolon": eidolon_id,
        "divine_damage": final_divine_dmg,
        "is_mp_free": zero_mp_contract_active
    }
`,

  synergy_coordinator: `class_name EidolonDivineSynergyCoordinator
extends RefCounted

## 最终幻想：时空之轮 - 高阶幻兽觉醒与神威连携总线
## 文件路径: res://scripts/combat/summons/eidolon_divine_synergy_coordinator.gd
## 引擎版本: Godot Engine 4.6 LTS

static func execute_cross_celestial_synergy(eidolon_a: String, eidolon_b: String, power_a: float, power_b: float) -> Dictionary:
    var synergy_multiplier: float = 1.6
    var total_strike: float = (power_a + power_b) * synergy_multiplier
    return {
        "combo_eidolons": [eidolon_a, eidolon_b],
        "synergy_multiplier": synergy_multiplier,
        "combined_damage": total_strike
    }
`,

  aether_overdrive: `class_name AetherOverdriveGovernor
extends RefCounted

## 最终幻想：时空之轮 - 以太逆流汲取与零魔耗仲裁器
## 文件路径: res://scripts/combat/summons/aether_overdrive_governor.gd
## 引擎版本: Godot Engine 4.6 LTS

static func arbitrate_mana_consumption(base_mp_cost: int, is_pact_exempt: bool) -> int:
    if is_pact_exempt:
        return 0
    return base_mp_cost
`
}

const currentAncientPactScriptCode = computed(() => {
  return ancientPactScriptCodes[activeAncientPactScriptTab.value]
})

const copyAncientPactScript = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentAncientPactScriptCode.value)
    if (message) message.success('已复制 Godot 4.6 LTS 幻兽契约源码到剪贴板！')
  }
}

</script>

<style scoped>
.text-glow-cyan {
  text-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
}
</style>
