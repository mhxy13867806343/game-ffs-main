<template>
  <div class="armory-page p-3 sm:p-5 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="warning" size="small" round class="mb-2">VBLE Armory Multi-Hero Loadout & Rune Reforge Studio v2.2.290</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-amber mb-2">⚔️ 全员神兵矩阵、多角色配装与太古符文锻造工坊</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm">
        支持光暗双队 8 大主角独立配装、本命神兵契约，以及太古全域神兵附魔符文锻造、词缀洗练与太古共鸣升阶工坊！
      </p>
      <div class="flex justify-center gap-2 mt-3">
        <n-button size="small" type="primary" secondary @click="scrollToRuneReforgeStudio">
          🔮 快速切入太古符文锻造与词缀洗练工坊
        </n-button>
        <router-link to="/vble/updates">
          <n-button size="small" type="warning" secondary>
            🔄 查看最新开发日志 (v2.2.290)
          </n-button>
        </router-link>
      </div>
    </div>

    <!-- 队伍菜单顶栏 (Party Story Header - 章节与当前地点单行信息) -->
    <div class="bg-[#121626]/90 border border-slate-700/70 px-4 py-2.5 rounded-xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
      <div class="flex items-center gap-2 min-w-0" :title="`${currentChapter} · ${currentLocation}`">
        <span class="text-base text-amber-400">📜</span>
        <span class="text-gray-400 shrink-0 font-medium">当前物语节拍：</span>
        <span class="font-bold text-amber-300 truncate font-mono">{{ currentChapter }} · {{ currentLocation }}</span>
        <n-popselect
          v-model:value="currentChapterPreset"
          :options="chapterPresets"
          size="small"
        >
          <n-button size="tiny" quaternary type="warning" class="shrink-0 text-[10px]">
            切换节拍 ▾
          </n-button>
        </n-popselect>
      </div>

      <div class="flex items-center gap-3 shrink-0 text-[11px] text-gray-400 font-mono">
        <span class="flex items-center gap-1">
          <span class="text-amber-400">💰</span>
          <span>金币: <strong class="text-amber-300">148,250 G</strong></span>
        </span>
        <span class="flex items-center gap-1">
          <span class="text-cyan-400">⏳</span>
          <span>游玩时长: <strong class="text-cyan-300">34:12</strong></span>
        </span>
      </div>
    </div>

    <!-- ================= 核心角色栏：多角色切换与战力总览 (用户核心需求) ================= -->
    <div class="bg-[#121626]/95 border border-slate-700/70 p-4 sm:p-5 rounded-2xl shadow-xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-lg">👥</span>
          <div>
            <h3 class="text-sm font-bold text-gray-100 flex items-center gap-2">
              <span>队伍同伴切换</span>
              <span class="text-xs text-amber-400 font-normal">（点击头像切换当前配装人员）</span>
            </h3>
            <span class="text-[11px] text-gray-400">
              当前正在配置：<strong class="text-amber-300 font-bold">{{ activeHero.name }}</strong>
              <span class="text-cyan-400 ml-1">【{{ activeHeroJobRule.name }} · Lv.{{ activeHero.level }}】</span>
            </span>
          </div>
        </div>

        <!-- 队伍阵营筛选 -->
        <div class="flex items-center gap-1.5 shrink-0">
          <n-button
            v-for="filter in partyFilters"
            :key="filter.value"
            size="tiny"
            :type="heroFilterParty === filter.value ? 'primary' : 'default'"
            secondary
            @click="heroFilterParty = filter.value"
          >
            {{ filter.label }}
          </n-button>
        </div>
      </div>

      <!-- 角色选择卡片流 -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
        <button
          v-for="hero in filteredHeroes"
          :key="hero.id"
          type="button"
          :aria-label="`配置${hero.name}的装备`"
          :aria-pressed="activeHeroId === hero.id"
          class="relative p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          :class="activeHeroId === hero.id ? 'bg-amber-500/20 border-[#e5c158] scale-[1.018] formation-selected-row' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'"
          @click="selectActiveHero(hero.id)"
        >
          <!-- 头像与阵营徽标 -->
          <span class="relative mb-1">
            <span class="text-2xl filter drop-shadow">{{ hero.avatar }}</span>
            <span
              v-if="hasEquippedItems(hero)"
              class="absolute -top-1 -right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse"
              title="已搭载装备"
            ></span>
          </span>

          <!-- 角色姓名 -->
          <span class="font-bold text-xs truncate max-w-[90px]" :class="activeHeroId === hero.id ? 'text-amber-300' : 'text-gray-200'">
            {{ hero.name }}
          </span>

          <!-- 职业简称 -->
          <span class="text-[10px] text-gray-400 truncate max-w-[85px] mt-0.5">
            {{ getJobShortName(hero.jobId) }}
          </span>

          <!-- 战力评分微标 -->
          <span class="text-[9px] font-mono text-cyan-400 mt-1">
            {{ getHeroPowerRating(hero) }}
          </span>
        </button>
      </div>

      <!-- 当前选中角色职业与等级调整控制台 -->
      <div class="pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <!-- 职业切换 -->
        <div class="md:col-span-5 space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-xs text-gray-300 font-bold flex items-center gap-1.5">
              <span>🎭 设定【{{ activeHero.name }}】当前职业:</span>
            </label>
            <span v-if="activeHero.jobId === 'freelancer'" class="text-[11px] text-amber-400 font-semibold">
              ⭐ 自由人全通穿
            </span>
          </div>
          <n-select
            v-model:value="activeHero.jobId"
            :options="jobOptions"
            size="small"
            @update:value="handleActiveHeroJobChange"
          />
        </div>

        <!-- 等级调整 -->
        <div class="md:col-span-5 space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <label class="text-gray-300 font-bold">🎚️ 角色等级 (Lv.1 ~ 255):</label>
            <div class="flex items-center gap-1">
              <n-input-number
                v-model:value="activeHero.level"
                :min="1"
                :max="255"
                size="tiny"
                style="width: 80px;"
              />
              <span class="text-amber-400 font-mono font-bold text-xs">级</span>
            </div>
          </div>
          <n-slider v-model:value="activeHero.level" :min="1" :max="255" :step="1" />
        </div>

        <!-- 快捷操作按钮 -->
        <div class="md:col-span-2 flex md:flex-col justify-end gap-1.5">
          <n-button size="tiny" type="primary" secondary @click="applyOptimalLoadoutForHero(activeHero)">
            ✨ TA的最强配装
          </n-button>
          <n-button size="tiny" type="error" quaternary @click="clearHeroLoadout(activeHero)">
            🧹 清空TA的装备
          </n-button>
        </div>
      </div>

      <!-- 职业权限提示条 -->
      <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div class="flex items-start sm:items-center gap-2">
          <span class="text-xl">📜</span>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-gray-100">{{ activeHeroJobRule.name }}</span>
              <n-tag size="tiny" type="warning">{{ activeHeroJobRule.role }}</n-tag>
              <n-tag v-if="activeHeroJobRule.canDualWield" size="tiny" type="error">天然二刀流</n-tag>
            </div>
            <div class="text-[11px] text-cyan-300 mt-0.5">
              {{ activeHeroJobRule.description }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <n-button size="tiny" type="warning" secondary @click="applyOptimalLoadoutForAll">
            👑 一键全队神装配置
          </n-button>
        </div>
      </div>

      <!-- 装备预设方案控制栏 (对应实机 equipment_presets.gd) -->
      <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2">
          <span class="text-amber-400 font-bold">📋 装备方案快照 (每角色 3 份独立预设)：</span>
          <div class="flex items-center gap-1.5">
            <n-button
              v-for="pIdx in [1, 2, 3]"
              :key="pIdx"
              size="tiny"
              :type="activePresetIndex === pIdx ? 'warning' : 'default'"
              secondary
              @click="selectPreset(pIdx)"
            >
              {{ `方案 ${pIdx}` }}
            </n-button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="tiny" type="info" secondary @click="saveCurrentPreset">
            💾 保存为方案 {{ activePresetIndex }}
          </n-button>
          <n-button size="tiny" type="primary" secondary @click="applyCurrentPreset">
            ⚡ 应用方案 {{ activePresetIndex }}
          </n-button>
        </div>
      </div>
    </div>

    <!-- ================= 核心工作台：左侧当前角色五大配装槽位 VS 右侧实时属性演算看板 ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- 左侧：五大配装槽位 -->
      <div class="lg:col-span-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-cyan-300 flex items-center gap-2">
            <span>🛡️</span>
            <span>【{{ activeHero.name }}】当前搭载的五大装备槽位</span>
          </h3>
          <span class="text-[11px] text-gray-400">点击槽位挑选，或在下方图鉴中选人配装</span>
        </div>

        <div class="space-y-3">
          <!-- 槽位 1: 主手武器 -->
          <div
            class="p-3.5 rounded-xl border transition-all cursor-pointer bg-[#121626]/90"
            :class="activeHero.loadout.weapon ? 'border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]' : 'border-slate-800 hover:border-slate-700'"
            @click="activeHero.loadout.weapon ? openItemInspector(activeHero.loadout.weapon) : openSlotPicker('weapon')"
          >
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-2">
                <span class="text-lg">🗡️</span>
                <span class="text-xs font-bold text-gray-200">主手武器 (Main Weapon)</span>
              </div>
              <div class="flex items-center gap-2">
                <n-tag v-if="activeHero.loadout.weapon" size="tiny" type="warning">{{ activeHero.loadout.weapon.typeName }}</n-tag>
                <n-button v-if="activeHero.loadout.weapon" size="tiny" quaternary type="info" @click.stop="openItemInspector(activeHero.loadout.weapon)">
                  🔍 立绘详情
                </n-button>
                <n-button v-if="activeHero.loadout.weapon" size="tiny" quaternary type="error" @click.stop="unequipSlot(activeHero, 'weapon')">
                  卸下
                </n-button>
              </div>
            </div>
            <div v-if="activeHero.loadout.weapon" class="text-xs text-amber-300 font-bold flex items-center justify-between">
              <span>{{ activeHero.loadout.weapon.name }}</span>
              <span class="font-mono text-emerald-400">+{{ activeHero.loadout.weapon.atk || 0 }} 物理攻击</span>
            </div>
            <div v-if="activeHero.loadout.weapon" class="text-[11px] text-gray-400 mt-1 line-clamp-1">
              {{ activeHero.loadout.weapon.effect }}
            </div>
            <div v-else class="text-xs text-gray-500 italic">
              未装备武器（点击打开武器库挑选，或点击下方装备卡片选人装备）
            </div>
          </div>

          <!-- 槽位 2: 副手装备 -->
          <div
            class="p-3.5 rounded-xl border transition-all cursor-pointer bg-[#121626]/90"
            :class="activeHero.loadout.offhand ? 'border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.2)]' : 'border-slate-800 hover:border-slate-700'"
            @click="activeHero.loadout.offhand ? openItemInspector(activeHero.loadout.offhand) : openSlotPicker('offhand')"
          >
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-2">
                <span class="text-lg">🛡️</span>
                <span class="text-xs font-bold text-gray-200">副手装具 (Off-hand / Shield)</span>
              </div>
              <div class="flex items-center gap-2">
                <n-tag v-if="activeHero.loadout.offhand" size="tiny" type="info">{{ activeHero.loadout.offhand.typeName }}</n-tag>
                <n-button v-if="activeHero.loadout.offhand" size="tiny" quaternary type="info" @click.stop="openItemInspector(activeHero.loadout.offhand)">
                  🔍 立绘详情
                </n-button>
                <n-button v-if="activeHero.loadout.offhand" size="tiny" quaternary type="error" @click.stop="unequipSlot(activeHero, 'offhand')">
                  卸下
                </n-button>
              </div>
            </div>
            <div v-if="activeHero.loadout.offhand" class="text-xs text-blue-300 font-bold flex items-center justify-between">
              <span>{{ activeHero.loadout.offhand.name }}</span>
              <span class="font-mono text-cyan-400">+{{ activeHero.loadout.offhand.def || 0 }} 物防 / +{{ activeHero.loadout.offhand.evasion || 0 }}% 格挡</span>
            </div>
            <div v-if="activeHero.loadout.offhand" class="text-[11px] text-gray-400 mt-1 line-clamp-1">
              {{ activeHero.loadout.offhand.effect }}
            </div>
            <div v-else class="text-xs text-gray-500 italic">
              未装备副手护盾（点击挑选神盾）
            </div>
          </div>

          <!-- 槽位 3: 头部防具 -->
          <div
            class="p-3.5 rounded-xl border transition-all cursor-pointer bg-[#121626]/90"
            :class="activeHero.loadout.head ? 'border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.2)]' : 'border-slate-800 hover:border-slate-700'"
            @click="activeHero.loadout.head ? openItemInspector(activeHero.loadout.head) : openSlotPicker('head')"
          >
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-2">
                <span class="text-lg">🪖</span>
                <span class="text-xs font-bold text-gray-200">头部防具 (Headgear / Ribbon)</span>
              </div>
              <div class="flex items-center gap-2">
                <n-tag v-if="activeHero.loadout.head" size="tiny" type="default">{{ activeHero.loadout.head.typeName }}</n-tag>
                <n-button v-if="activeHero.loadout.head" size="tiny" quaternary type="info" @click.stop="openItemInspector(activeHero.loadout.head)">
                  🔍 立绘详情
                </n-button>
                <n-button v-if="activeHero.loadout.head" size="tiny" quaternary type="error" @click.stop="unequipSlot(activeHero, 'head')">
                  卸下
                </n-button>
              </div>
            </div>
            <div v-if="activeHero.loadout.head" class="text-xs text-purple-300 font-bold flex items-center justify-between">
              <span>{{ activeHero.loadout.head.name }}</span>
              <span class="font-mono text-cyan-400">+{{ activeHero.loadout.head.def || 0 }} 物防 / +{{ activeHero.loadout.head.mdef || 0 }} 魔防</span>
            </div>
            <div v-if="activeHero.loadout.head" class="text-[11px] text-gray-400 mt-1 line-clamp-1">
              {{ activeHero.loadout.head.effect }}
            </div>
            <div v-else class="text-xs text-gray-500 italic">
              未装备头盔/缎带（点击挑选防具）
            </div>
          </div>

          <!-- 槽位 4: 身体防具 -->
          <div
            class="p-3.5 rounded-xl border transition-all cursor-pointer bg-[#121626]/90"
            :class="activeHero.loadout.body ? 'border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]' : 'border-slate-800 hover:border-slate-700'"
            @click="activeHero.loadout.body ? openItemInspector(activeHero.loadout.body) : openSlotPicker('body')"
          >
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-2">
                <span class="text-lg">🥋</span>
                <span class="text-xs font-bold text-gray-200">身体防具 (Body Armor / Robe)</span>
              </div>
              <div class="flex items-center gap-2">
                <n-tag v-if="activeHero.loadout.body" size="tiny" type="success">{{ activeHero.loadout.body.typeName }}</n-tag>
                <n-button v-if="activeHero.loadout.body" size="tiny" quaternary type="info" @click.stop="openItemInspector(activeHero.loadout.body)">
                  🔍 立绘详情
                </n-button>
                <n-button v-if="activeHero.loadout.body" size="tiny" quaternary type="error" @click.stop="unequipSlot(activeHero, 'body')">
                  卸下
                </n-button>
              </div>
            </div>
            <div v-if="activeHero.loadout.body" class="text-xs text-emerald-300 font-bold flex items-center justify-between">
              <span>{{ activeHero.loadout.body.name }}</span>
              <span class="font-mono text-cyan-400">+{{ activeHero.loadout.body.def || 0 }} 物防 / +{{ activeHero.loadout.body.mdef || 0 }} 魔防</span>
            </div>
            <div v-if="activeHero.loadout.body" class="text-[11px] text-gray-400 mt-1 line-clamp-1">
              {{ activeHero.loadout.body.effect }}
            </div>
            <div v-else class="text-xs text-gray-500 italic">
              未装备身体重铠/法袍（点击挑选铠甲）
            </div>
          </div>

          <!-- 槽位 5: 特殊饰品 -->
          <div
            class="p-3.5 rounded-xl border transition-all cursor-pointer bg-[#121626]/90"
            :class="activeHero.loadout.accessory ? 'border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.2)]' : 'border-slate-800 hover:border-slate-700'"
            @click="activeHero.loadout.accessory ? openItemInspector(activeHero.loadout.accessory) : openSlotPicker('accessory')"
          >
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-2">
                <span class="text-lg">💍</span>
                <span class="text-xs font-bold text-gray-200">特殊饰品 (Accessory / Ring)</span>
              </div>
              <div class="flex items-center gap-2">
                <n-tag v-if="activeHero.loadout.accessory" size="tiny" type="error">{{ activeHero.loadout.accessory.typeName }}</n-tag>
                <n-button v-if="activeHero.loadout.accessory" size="tiny" quaternary type="info" @click.stop="openItemInspector(activeHero.loadout.accessory)">
                  🔍 立绘详情
                </n-button>
                <n-button v-if="activeHero.loadout.accessory" size="tiny" quaternary type="error" @click.stop="unequipSlot(activeHero, 'accessory')">
                  卸下
                </n-button>
              </div>
            </div>
            <div v-if="activeHero.loadout.accessory" class="text-xs text-rose-300 font-bold flex items-center justify-between">
              <span>{{ activeHero.loadout.accessory.name }}</span>
              <span class="font-mono text-amber-300">专属逃课特效</span>
            </div>
            <div v-if="activeHero.loadout.accessory" class="text-[11px] text-gray-400 mt-1 line-clamp-1">
              {{ activeHero.loadout.accessory.effect }}
            </div>
            <div v-else class="text-xs text-gray-500 italic">
              未装备饰品戒指（点击挑选逃课神器）
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：实时全景数值演算看板 (针对 activeHero 精确演算) -->
      <div class="lg:col-span-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-amber-300 flex items-center gap-2">
            <span>🧮</span>
            <span>【{{ activeHero.name }}】实时属性推演看板</span>
          </h3>
          <n-tag size="tiny" type="warning">实时演算引擎</n-tag>
        </div>

        <div class="p-5 bg-gradient-to-br from-[#1b223d] via-[#121629] to-[#0c101d] rounded-2xl border border-amber-500/40 shadow-xl space-y-5">
          <!-- 头部总评 -->
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span class="text-[10px] text-amber-400 font-mono tracking-wider">HERO LIVE STAT ENGINE</span>
              <h4 class="text-lg font-black text-white flex items-center gap-2">
                <span>{{ activeHero.avatar }} {{ activeHero.name }}</span>
                <span class="text-xs text-cyan-300 font-mono">Lv. {{ activeHero.level }}</span>
                <n-tag size="tiny" type="info">{{ activeHeroJobRule.name }}</n-tag>
              </h4>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-gray-400">综合战力总评</span>
              <div class="text-2xl font-black text-amber-300 font-mono">{{ activeHeroStats.powerRating }}</div>
            </div>
          </div>

          <!-- 生命力 HP 与 魔力 MP -->
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-red-950/30 border border-red-900/50">
              <div class="flex items-center justify-between text-xs text-red-400">
                <span>最大生命值 HP</span>
                <span v-if="activeHeroStats.hpDelta > 0" class="text-[10px] text-emerald-400 font-mono font-bold">(+{{ activeHeroStats.hpDelta }})</span>
              </div>
              <div class="text-2xl font-black text-red-300 font-mono mt-1">{{ activeHeroStats.hp }}</div>
            </div>

            <div class="p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/50">
              <div class="flex items-center justify-between text-xs text-cyan-400">
                <span>最大魔力值 MP</span>
                <span v-if="activeHeroStats.mpDelta > 0" class="text-[10px] text-emerald-400 font-mono font-bold">(+{{ activeHeroStats.mpDelta }})</span>
              </div>
              <div class="text-2xl font-black text-cyan-300 font-mono mt-1">{{ activeHeroStats.mp }}</div>
            </div>
          </div>

          <!-- 攻击力与双防核心面板 -->
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <span class="text-gray-400 text-[10px] block">物理攻击 P.ATK</span>
              <div class="text-lg font-black text-amber-400 font-mono mt-0.5">{{ activeHeroStats.patk }}</div>
              <span v-if="activeHeroStats.atkDelta > 0" class="text-[10px] text-emerald-400 font-mono">(+{{ activeHeroStats.atkDelta }})</span>
            </div>
            <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <span class="text-gray-400 text-[10px] block">物理防御 P.DEF</span>
              <div class="text-lg font-black text-blue-400 font-mono mt-0.5">{{ activeHeroStats.pdef }}</div>
              <span v-if="activeHeroStats.defDelta > 0" class="text-[10px] text-emerald-400 font-mono">(+{{ activeHeroStats.defDelta }})</span>
            </div>
            <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <span class="text-gray-400 text-[10px] block">魔法防御 M.DEF</span>
              <div class="text-lg font-black text-indigo-400 font-mono mt-0.5">{{ activeHeroStats.mdef }}</div>
              <span v-if="activeHeroStats.mdefDelta > 0" class="text-[10px] text-emerald-400 font-mono">(+{{ activeHeroStats.mdefDelta }})</span>
            </div>
          </div>

          <!-- 核心六维属性看板 -->
          <div>
            <span class="text-[11px] text-gray-400 block mb-1.5 font-semibold">六维加权属性 (角色潜能成长 + 装备赋能):</span>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
              <div class="p-2 bg-slate-900/90 rounded border border-slate-800">
                <span class="text-gray-400 block text-[10px]">力量 STR</span>
                <span class="text-red-400 font-mono font-bold">{{ activeHeroStats.str }}</span>
              </div>
              <div class="p-2 bg-slate-900/90 rounded border border-slate-800">
                <span class="text-gray-400 block text-[10px]">敏捷 AGI</span>
                <span class="text-emerald-400 font-mono font-bold">{{ activeHeroStats.agi }}</span>
              </div>
              <div class="p-2 bg-slate-900/90 rounded border border-slate-800">
                <span class="text-gray-400 block text-[10px]">体质 VIT</span>
                <span class="text-amber-400 font-mono font-bold">{{ activeHeroStats.vit }}</span>
              </div>
              <div class="p-2 bg-slate-900/90 rounded border border-slate-800">
                <span class="text-gray-400 block text-[10px]">智力 MAG</span>
                <span class="text-purple-400 font-mono font-bold">{{ activeHeroStats.mag }}</span>
              </div>
              <div class="p-2 bg-slate-900/90 rounded border border-slate-800">
                <span class="text-gray-400 block text-[10px]">精神 SPR</span>
                <span class="text-cyan-400 font-mono font-bold">{{ activeHeroStats.spr }}</span>
              </div>
              <div class="p-2 bg-slate-900/90 rounded border border-slate-800">
                <span class="text-gray-400 block text-[10px]">幸运 LUCK</span>
                <span class="text-yellow-400 font-mono font-bold">{{ activeHeroStats.luck }}</span>
              </div>
            </div>
          </div>

          <!-- 激活的共鸣词缀与逃课特效 -->
          <div>
            <span class="text-[11px] text-amber-400 block mb-1.5 font-semibold">⚡ 当前激活的共鸣机制与实战特效:</span>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="(p, pIdx) in activeHeroSpecialPassives"
                :key="pIdx"
                class="text-[11px] bg-amber-950/40 text-amber-300 border border-amber-600/40 px-2 py-0.5 rounded"
              >
                🌟 {{ p }}
              </span>
              <span v-if="!activeHeroSpecialPassives.length" class="text-xs text-gray-500 italic">
                尚未激活神兵防具特殊词缀
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 悬赏奖励装备假设替换与结构化拒绝原因分析 ================= -->
    <div class="bg-gradient-to-r from-slate-950/95 via-amber-950/30 to-slate-950/95 border border-amber-600/40 p-4 sm:p-5 rounded-2xl shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">⚖️</span>
          <h3 class="text-base sm:text-lg font-bold text-amber-300">酒馆悬赏奖励装备假设替换与拒绝原因透视 (BountyRewardEquipmentCompare)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="warning" size="small" round>空槽与同件智能识别</n-tag>
          <n-tag type="error" size="small" round>结构化拒绝原因</n-tag>
          <n-tag type="info" size="small" round>只读无副作用</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机悬赏看板（<code>bounty_reward_equipment_compare.gd</code>）全面接入单件假设替换透视与结构化拒绝原因转译器（<code>equipment_comparison.gd</code>），玩家可在领赏前直观了解同伴穿戴替换效果与受阻原因。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        <!-- 槽位身份与同件识别 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-amber-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-400">🔍 槽位对象与同件感知</span>
            <n-tag size="tiny" type="warning">REPLACEMENT</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>对比范式：</strong><code>当前槽位：[装备A] ➔ 假设替换为：[奖励B]</code>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
            <li><strong>空槽感知：</strong>当前槽位无穿戴时明确标注为 <code>空槽</code>，不误报缺失。</li>
            <li><strong>同件感知：</strong>已穿戴相同装备时明确标注 <code>当前已装备同件；不额外叠加</code>。</li>
          </ul>
        </div>

        <!-- 结构化拒绝原因 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-rose-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-rose-400">🚫 结构化拒绝原因转译</span>
            <n-tag size="tiny" type="error">REASONS</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>转译机制：</strong><code>COMPARE.REASON_TEXT[key]</code> 权威映射
          </div>
          <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
            <li><strong>双手武器冲突：</strong>装备双手武器时禁止配置副手盾牌，精准标出冲突装备。</li>
            <li><strong>职业防具受限：</strong>白魔/黑魔等职业不可装备重甲重盾，给出结构化解释。</li>
          </ul>
        </div>

        <!-- 纯只读安全守卫 -->
        <div class="p-3 rounded-xl bg-slate-900/80 border border-cyan-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-400">🛡️ 纯投影只读安全</span>
            <n-tag size="tiny" type="info">READONLY</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>权威标注：</strong><code>未领取、未穿戴</code>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
            <li><strong>副手逐手结算：</strong>副手攻击力独立核算，不与主手攻击暴力相加。</li>
            <li><strong>快照票据校验：</strong>换人、换档、周目更替即刻废除票据，零脏状态。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ================= 二刀流双持双武法则与源氏护手验算工坊 (基于 dual_wield_rules.gd 实机规范) ================= -->
    <div class="bg-[#121626]/95 border border-indigo-500/50 p-4 sm:p-5 rounded-2xl shadow-xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-900/40 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">⚔️</span>
          <div>
            <h3 class="text-base font-bold text-gray-100 flex items-center gap-2">
              <span>二刀流双持双武法则与源氏护手验算工坊 (Dual Wield Studio)</span>
              <n-tag size="tiny" type="warning" round>dual_wield_rules.gd</n-tag>
            </h3>
            <span class="text-xs text-gray-400">
              对齐 Godot 引擎二刀流双武白名单 (WEAPONS)、三大资格来源与副手原槽封存防御机制
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <n-tag :type="isDualWieldActive ? 'success' : 'error'" size="small" round strong>
            {{ isDualWieldActive ? '⚔️ 二刀流：激活 (Active)' : '🔒 二刀流：失效/未就绪' }}
          </n-tag>
        </div>
      </div>

      <!-- 核心三柱石设计 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="p-3 bg-slate-950/80 rounded-xl border border-indigo-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-indigo-400">📜 三大独立资格获取通道</span>
            <n-tag size="tiny" type="info">ELIGIBILITY</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>满足其一即生效：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>忍者教学旗标：</strong><code>ninja_teaching_v1_dual_wield = true</code>。</li>
            <li><strong>职业精通继承：</strong>转职精通忍者，获得被动双持特权。</li>
            <li><strong>源氏护手佩戴：</strong>饰品槽装备【源氏护手】(<code>2101</code>)，临时赋予双持能力。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-amber-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-400">🗡️ 四大神兵白名单 (WEAPONS)</span>
            <n-tag size="tiny" type="warning">WHITELIST</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>仅以下主副手武器支持双持：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>2003 (符文之刃):</strong> 基础攻速敏捷配装，单手剑。</li>
            <li><strong>2004 (佐助之刃):</strong> 忍者专属忍刀，高暴击附加闪避。</li>
            <li><strong>2005 (正宗):</strong> 先制攻击特性，极高攻击力。</li>
            <li><strong>2053 (菊一文字):</strong> 传统名刀，破甲与追加挥砍。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-rose-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-rose-400">🛡️ 盾牌互斥与原槽封存安全</span>
            <n-tag size="tiny" type="error">SECURITY</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>严格防丢装与互斥保护：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>盾牌严密互斥：</strong>副手佩盾 (<code>shield != ""</code>) 立即抑制副手武器。</li>
            <li><strong>双手弓冲突：</strong>双手武器 (如 2105 与一之弓) 强行拦截副手装配。</li>
            <li><strong>原槽封存不退包：</strong>脱下源氏护手时，副手武器在槽内禁用，绝不偷偷退回背包。</li>
          </ul>
        </div>
      </div>

      <!-- 交互推演台: 二刀流装配与独立双挥推演 -->
      <div class="p-4 bg-slate-950/90 rounded-xl border border-indigo-700/40 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-900/30 pb-2">
          <span class="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
            <span>🧪</span>
            <span>二刀流资格与装配即时演算台</span>
          </span>
          <div class="flex items-center gap-2">
            <n-button size="tiny" secondary type="warning" @click="resetDualWieldStudio">
              🔄 重置模拟
            </n-button>
          </div>
        </div>

        <!-- 资格开关栏 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <label class="flex items-center gap-2 text-xs text-gray-200 cursor-pointer">
            <input type="checkbox" v-model="dwFlagTeaching" />
            <span>忍者传授旗标 (Teaching Flag)</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-gray-200 cursor-pointer">
            <input type="checkbox" v-model="dwJobMastery" />
            <span>忍者精通被动 (Mastery Inherit)</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-gray-200 cursor-pointer">
            <input type="checkbox" v-model="dwHasGenjiGlove" />
            <span>佩戴【源氏护手】(Relic Genji)</span>
          </label>
        </div>

        <!-- 装备插槽配置 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">主手武器 (Mainhand Slot):</span>
            <n-select v-model:value="dwMainhandWeapon" size="small" :options="dwMainhandOptions" />
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">副手武器 (Offhand Weapon Slot):</span>
            <n-select v-model:value="dwOffhandWeapon" size="small" :options="dwOffhandOptions" />
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">副手盾牌 (Shield Slot - 互斥槽):</span>
            <n-select v-model:value="dwShield" size="small" :options="dwShieldOptions" />
          </div>
        </div>

        <!-- 验算结果矩阵 -->
        <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-gray-300">双挥状态核算：</span>
              <n-tag size="small" :type="isDualWieldActive ? 'success' : 'error'">
                {{ dwVerdictText }}
              </n-tag>
            </div>
            <div class="text-[11px] font-mono text-cyan-300">
              Format: dual_wield_format_version = 1.0
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center pt-1">
            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">主手物理攻击 (Hit 1)</div>
              <div class="text-lg font-mono font-bold text-amber-400">ATK +{{ dwMainAtk }}</div>
              <div class="text-[9px] text-gray-500">主手动作独立发起</div>
            </div>
            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">副手物理攻击 (Hit 2)</div>
              <div class="text-lg font-mono font-bold" :class="isDualWieldActive ? 'text-emerald-400' : 'text-gray-500 line-through'">
                ATK +{{ isDualWieldActive ? dwOffAtk : 0 }}
              </div>
              <div class="text-[9px]" :class="isDualWieldActive ? 'text-emerald-400' : 'text-rose-400'">
                {{ isDualWieldActive ? '二刀流激活 · 独立追击' : '已封存抑制 · 不产生攻击' }}
              </div>
            </div>
            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">物理格挡护甲 (Shield DEF)</div>
              <div class="text-lg font-mono font-bold" :class="dwShield ? 'text-cyan-400' : 'text-gray-500'">
                DEF +{{ dwShieldDef }}
              </div>
              <div class="text-[9px] text-gray-500">
                {{ dwShield ? '持盾防御激活 (禁止二刀流)' : '无盾牌占用' }}
              </div>
            </div>
          </div>
        </div>

        <!-- 追踪日志 -->
        <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-1">
          <div class="text-gray-500 font-bold">二刀流生命周期与合法性日志 (DualWield Trace):</div>
          <div v-for="(log, idx) in dwTraceLog" :key="idx" class="text-indigo-300 truncate">
            &gt; {{ log }}
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 十一大封印神兵解封契约与战时追加追击验算工坊 (基于 sealed_weapon_rules.gd / battle.gd) ================= -->
    <div class="bg-[#121626]/95 border border-amber-500/50 p-4 sm:p-5 rounded-2xl shadow-xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/40 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">🏛️</span>
          <div>
            <h3 class="text-base font-bold text-gray-100 flex items-center gap-2">
              <span>十一大封印神兵解封契约与战时追加追击验算工坊 (Sealed Weapons Studio)</span>
              <n-tag size="tiny" type="warning" round>sealed_weapon_rules.gd</n-tag>
            </h3>
            <span class="text-xs text-gray-400">
              对齐 Godot 引擎 11 件法定封印武器白名单 (2100~2110)、副手严格互斥排他性与 0 MP 魔法/即死战时概率追击机制
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <n-tag :type="isSealedWeaponEligible ? 'success' : 'error'" size="small" round strong>
            {{ isSealedWeaponEligible ? '⚔️ 封印神兵：已共鸣生效' : '🔒 封印神兵：互斥或未就绪' }}
          </n-tag>
        </div>
      </div>

      <!-- 核心三柱石设计 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="p-3 bg-slate-950/80 rounded-xl border border-amber-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-400">📜 十一件法定神兵白名单</span>
            <n-tag size="tiny" type="warning">2100~2110</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>严密数字身份白名单：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>2100~2103:</strong> 石板圣剑、贤者之杖、源氏护手等王室遗产。</li>
            <li><strong>2104~2106:</strong> 神圣飞枪、与一之弓（双手持）、烈焰魔剑。</li>
            <li><strong>2107~2110:</strong> 封印魔导书、阿波罗之竖琴、大地之锤、刺客短刃。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-cyan-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-400">✨ 战时概率追加追击法则</span>
            <n-tag size="tiny" type="info">CHASE EFFECTS</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>命中后 0 MP 独立法术结算：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>2104 神圣飞枪：</strong>跳跃落地 33% 追加【圣光奇迹】(威力 240)。</li>
            <li><strong>2106 烈焰魔剑：</strong>普攻 33% 追加【米西迪亚爆炎】(威力 240)。</li>
            <li><strong>2109 大地之锤：</strong>普攻 25% 追加【全域地震】(威力 180 AOE)。</li>
            <li><strong>2110 刺客短刃：</strong>普攻 25% 触发【斩杀即死】(直接收割)。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-purple-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-400">🛡️ 沉默遵从与双持双武排他性</span>
            <n-tag size="tiny" type="error">EXCLUSIVE</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>严格引擎底层守卫：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>双持排他性：</strong>封印神兵绝不进入双持白名单，配副手武器立即失效。</li>
            <li><strong>双手弓禁盾：</strong>与一之弓 (2105) 必须腾空副手盾牌槽位。</li>
            <li><strong>沉默与禁魔遵从：</strong>即便 0 MP，角色处于沉默或禁魔时追击绝不触发。</li>
          </ul>
        </div>
      </div>

      <!-- 交互推演台: 封印神兵解封与追击演练 -->
      <div class="p-4 bg-slate-950/90 rounded-xl border border-amber-700/40 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-amber-900/30 pb-2">
          <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <span>🧪</span>
            <span>封印神兵战时追击演练台</span>
          </span>
          <div class="flex items-center gap-2">
            <n-button size="tiny" secondary type="warning" @click="resetSealedStudio">
              🔄 重置模拟
            </n-button>
          </div>
        </div>

        <!-- 神兵选择与状态开关 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <div>
            <span class="text-gray-400 text-[10px] block mb-1 font-bold">主手封印神兵 (Sealed Weapon):</span>
            <n-select v-model:value="selectedSealedWeaponId" size="small" :options="sealedWeaponSelectOptions" />
          </div>

          <div>
            <span class="text-gray-400 text-[10px] block mb-1 font-bold">攻击动作模式 (Kind):</span>
            <n-select v-model:value="sealedAttackKind" size="small" :options="sealedAttackKindOptions" />
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">副手槽位排他性核验:</span>
            <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer mt-0.5">
              <input type="checkbox" v-model="hasOffhandWeaponEquipped" />
              <span>佩戴副手武器 (触发互斥)</span>
            </label>
            <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" v-model="hasShieldEquipped" />
              <span>佩戴盾牌 (与双手弓互斥)</span>
            </label>
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">战时负面状态遵从:</span>
            <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer mt-0.5">
              <input type="checkbox" v-model="isSealedSilenced" />
              <span>角色处于【沉默】(Silence)</span>
            </label>
            <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" v-model="isMagicLocked" />
              <span>战场处于【禁魔】环境</span>
            </label>
          </div>
        </div>

        <!-- 试炼演算控制 -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div class="flex items-center gap-2">
            <n-button size="small" type="primary" secondary @click="executeSealedAttack">
              ⚔️ 发起一次战时攻击 (Roll Chase Trigger)
            </n-button>
            <span class="text-xs text-gray-400">
              当前触发概率: <strong class="text-amber-400 font-mono">{{ sealedWeaponChaseChanceText }}</strong>
            </span>
          </div>

          <div class="text-[11px] font-mono text-cyan-300">
            Seq: #{{ sealedSequenceCounter }} · 单次即时凭证
          </div>
        </div>

        <!-- 命中与追击效果呈现 -->
        <div v-if="lastSealedAttackResult" class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
          <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span class="text-xs font-bold text-gray-200">
              攻击结算分析：{{ lastSealedAttackResult.summary }}
            </span>
            <n-tag size="small" :type="lastSealedAttackResult.chaseSuccess ? 'success' : 'default'">
              {{ lastSealedAttackResult.chaseSuccess ? '🌟 追击特技成功触发' : '常规物理终结' }}
            </n-tag>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center pt-1">
            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">第一段 · 物理基础输出</div>
              <div class="text-lg font-mono font-bold text-amber-400">{{ lastSealedAttackResult.physDamage }} DMG</div>
              <div class="text-[9px] text-gray-500">{{ lastSealedAttackResult.physDesc }}</div>
            </div>

            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">第二段 · 0 MP 神兵追击</div>
              <div class="text-lg font-mono font-bold" :class="lastSealedAttackResult.chaseSuccess ? 'text-emerald-400' : 'text-gray-500'">
                {{ lastSealedAttackResult.chaseDamageText }}
              </div>
              <div class="text-[9px]" :class="lastSealedAttackResult.chaseSuccess ? 'text-emerald-300' : 'text-gray-500'">
                {{ lastSealedAttackResult.chaseDesc }}
              </div>
            </div>

            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">目标存活状态</div>
              <div class="text-lg font-mono font-bold" :class="lastSealedAttackResult.targetDefeated ? 'text-rose-400' : 'text-cyan-400'">
                {{ lastSealedAttackResult.targetDefeated ? '💀 目标已阵亡' : '🛡️ 目标仍存活' }}
              </div>
              <div class="text-[9px] text-gray-500">{{ lastSealedAttackResult.targetStatusDesc }}</div>
            </div>
          </div>
        </div>

        <!-- 审计日志 -->
        <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-1">
          <div class="text-gray-500 font-bold">封印神兵事件凭据审计 (SealedWeapon Event Trace):</div>
          <div v-for="(log, idx) in sealedTraceLogs" :key="idx" class="text-amber-300 truncate">
            &gt; {{ log }}
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 七色彩虹尾巴终极神兵契约与换装投影工坊 (基于 tail_weapon_rules.gd / tail_weapon_projection.gd) ================= -->
    <div class="bg-[#10192a]/95 border border-indigo-500/50 p-4 sm:p-5 rounded-2xl shadow-xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-900/40 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">🌈</span>
          <div>
            <h3 class="text-base font-bold text-gray-100 flex items-center gap-2">
              <span>七色彩虹尾巴终极神兵契约与换装投影工坊 (Rainbow Tail Weapons Studio)</span>
              <n-tag size="tiny" type="info" round>tail_weapon_rules.gd</n-tag>
            </h3>
            <span class="text-xs text-gray-400">
              对齐 Godot 引擎 7 件法定彩尾神兵白名单 (2113~2119)、副手绝对排他性、自动连弩禁盾及战时动态换装重算管线
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <n-tag :type="isTailWeaponEligible ? 'success' : 'error'" size="small" round strong>
            {{ isTailWeaponEligible ? '✨ 彩尾神兵：契约达成生效' : '🚫 彩尾神兵：槽位冲突驳回' }}
          </n-tag>
        </div>
      </div>

      <!-- 核心三柱石设计 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="p-3 bg-slate-950/80 rounded-xl border border-indigo-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-indigo-400">📜 七大终极彩尾武器白名单</span>
            <n-tag size="tiny" type="info">2113~2119</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>独立数字空间与来源绑定：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>2113:</strong> 阿克塞尔之旋 (tail_axel_v1 · 投掷高敏捷)。</li>
            <li><strong>2114:</strong> 瓦尔哈拉圣剑 (tail_valhalla_v1 · 圣/暗承伤减半)。</li>
            <li><strong>2115:</strong> 鲜血之枪 (tail_blood_lance_v1 · 普攻吸血突刺)。</li>
            <li><strong>2116:</strong> 创世之刃 (tail_ultima_blade_v1 · 满血伤害极致倍增)。</li>
            <li><strong>2117~2119:</strong> 人鱼竖琴、火箭重锤、自动连弩 (双持与盾排他)。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-cyan-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-400">🔄 战时无缝换装动态重算</span>
            <n-tag size="tiny" type="success">DYNAMIC REFRESH</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>非破坏性属性差额置换：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>增减益保全：</strong>仅重算装备份额，保留战斗中既有 Buff/Debuff 与伤势。</li>
            <li><strong>抗性乘区替换：</strong><code>actor.resistance</code> 精确重算换装差额，状态免疫不被冲刷。</li>
            <li><strong>防换档污染：</strong>通过 <code>tail_runtime_owner</code> 强校验当前队伍，拒用旧档凭证。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-purple-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-400">🛡️ 排他副手与自动连弩禁盾</span>
            <n-tag size="tiny" type="error">SLOT GUARDS</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>严苛槽位守卫门禁：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>副手双武零容忍：</strong>彩尾七件绝不配副手武器，<code>offhand_weapon != ""</code> 直接失效。</li>
            <li><strong>自动连弩双手互斥：</strong>自动连弩 (2119) 若配副手盾牌，整套神兵特权即刻熔断。</li>
            <li><strong>纯净存档保全：</strong>入档严格清理瞬时元标记，严防脏数据污染持久层。</li>
          </ul>
        </div>
      </div>

      <!-- 交互推演台: 彩尾神兵装配与换装动态投影演练台 -->
      <div class="p-4 bg-slate-950/90 rounded-xl border border-indigo-700/40 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-900/30 pb-2">
          <span class="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
            <span>🧪</span>
            <span>彩尾神兵装备与战时动态投影演练台</span>
          </span>
          <div class="flex items-center gap-2">
            <n-button size="tiny" secondary type="warning" @click="resetTailStudio">
              🔄 重置演练
            </n-button>
          </div>
        </div>

        <!-- 神兵选择与槽位冲突开关 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <div>
            <span class="text-gray-400 text-[10px] block mb-1 font-bold">主手彩尾神兵 (Tail Weapon):</span>
            <n-select v-model:value="selectedTailWeaponId" size="small" :options="tailWeaponSelectOptions" />
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">槽位排他性核验:</span>
            <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer mt-0.5">
              <input type="checkbox" v-model="tailHasOffhandWeapon" />
              <span>佩戴副手武器 (触发互斥)</span>
            </label>
            <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" v-model="tailHasShield" />
              <span>佩戴副手盾牌 (与连弩互斥)</span>
            </label>
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">角色当前生命状态 (HP/MaxHP):</span>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-cyan-400 font-bold">{{ tailHeroHp }} / 3200</span>
              <span v-if="tailHeroHp === 3200" class="text-[10px] text-amber-400 font-bold">⭐ 满血创世爆发</span>
            </div>
            <input
              type="range"
              v-model.number="tailHeroHp"
              :min="1"
              :max="3200"
              :step="50"
              class="w-full accent-indigo-500 cursor-pointer mt-1"
            />
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">神兵专属特质即时状态:</span>
            <div class="text-[11px] text-emerald-400 font-bold mt-1">
              {{ tailWeaponSpecialTraitText }}
            </div>
            <div class="text-[10px] text-gray-500">
              {{ tailWeaponSpecialDescText }}
            </div>
          </div>
        </div>

        <!-- 试炼演算控制 -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div class="flex items-center gap-2">
            <n-button size="small" type="primary" secondary @click="executeTailBattleAction">
              ⚔️ 战中触发神兵攻击/吸血/换装结算
            </n-button>
            <span class="text-xs text-gray-400">
              战力综合评分: <strong class="text-indigo-400 font-mono">{{ tailPowerRating }} 点</strong>
            </span>
          </div>

          <div class="text-[11px] font-mono text-indigo-300">
            RuntimeOwner: GameState.party_runtime (校验合格)
          </div>
        </div>

        <!-- 攻击与吸血/伤害结果呈现 -->
        <div v-if="lastTailActionResult" class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
          <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span class="text-xs font-bold text-gray-200">
              动作结算分析：{{ lastTailActionResult.summary }}
            </span>
            <n-tag size="small" :type="lastTailActionResult.success ? 'success' : 'error'">
              {{ lastTailActionResult.statusTag }}
            </n-tag>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center pt-1">
            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">物理输出结算</div>
              <div class="text-lg font-mono font-bold text-amber-400">{{ lastTailActionResult.damage }} DMG</div>
              <div class="text-[9px] text-gray-500">{{ lastTailActionResult.damageDesc }}</div>
            </div>

            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">吸血/抗性/特效结算</div>
              <div class="text-lg font-mono font-bold" :class="lastTailActionResult.success ? 'text-emerald-400' : 'text-gray-500'">
                {{ lastTailActionResult.leechText }}
              </div>
              <div class="text-[9px]" :class="lastTailActionResult.success ? 'text-emerald-300' : 'text-gray-500'">
                {{ lastTailActionResult.leechDesc }}
              </div>
            </div>

            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">自身生命变动后</div>
              <div class="text-lg font-mono font-bold text-cyan-400">
                {{ tailHeroHp }} / 3200 HP
              </div>
              <div class="text-[9px] text-gray-500">{{ lastTailActionResult.hpDeltaDesc }}</div>
            </div>
          </div>
        </div>

        <!-- 审计日志 -->
        <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-1">
          <div class="text-gray-500 font-bold">彩尾神兵事件凭据审计 (TailWeapon Event Trace):</div>
          <div v-for="(log, idx) in tailTraceLogs" :key="idx" class="text-indigo-300 truncate">
            &gt; {{ log }}
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 五大主角本命神兵契约与角色专属验算工坊 (基于 personal_equipment_rules.gd / personal_equipment_projection.gd) ================= -->
    <div class="bg-[#1a1325]/95 border border-rose-500/50 p-4 sm:p-5 rounded-2xl shadow-xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-900/40 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">👑</span>
          <div>
            <h3 class="text-base font-bold text-gray-100 flex items-center gap-2">
              <span>五大主角本命神兵契约与角色专属验算工坊 (Personal Exclusive Weapons Studio)</span>
              <n-tag size="tiny" type="error" round>personal_equipment_rules.gd</n-tag>
            </h3>
            <span class="text-xs text-gray-400">
              对齐 Godot 引擎 5 件主角本命神兵 (2120~2124)、强身份字符核验、跨角色严禁装备、埃癸斯专属盾位与双手武器排他准则
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <n-tag :type="isPersonalEligible ? 'success' : 'error'" size="small" round strong>
            {{ isPersonalEligible ? '✨ 本命共鸣：角色专属契约达成' : '🚫 契约驳回：跨角色或槽位冲突' }}
          </n-tag>
        </div>
      </div>

      <!-- 核心三柱石设计 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="p-3 bg-slate-950/80 rounded-xl border border-rose-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-rose-400">📜 五大主角法定专属契约</span>
            <n-tag size="tiny" type="error">OWNERS BINDING</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>绝对不可让渡的专属权：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>2120 诸神黄昏:</strong> 纳哈特专属神剑 (ATK+160 · 骑士王权高暴击)。</li>
            <li><strong>2121 涅槃之杖:</strong> 塞拉专属神杖 (MATK+140 · 治疗/复活 50% MP 减半)。</li>
            <li><strong>2122 埃癸斯神盾:</strong> 埃癸斯专属神盾 (DEF+80, MDEF+60 · 互斥双手武器)。</li>
            <li><strong>2123 飞龙魔爪:</strong> 格雷夫专属利爪 (ATK+135, SPD+25 · 偷盗双击)。</li>
            <li><strong>2124 终焉法球:</strong> 索尔专属黑魔法器 (MATK+175 · 创世终焉输出)。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-cyan-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-400">🛡️ 埃癸斯专属盾位与双手武器互斥</span>
            <n-tag size="tiny" type="warning">SHIELD EXCLUSIVE</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>槽位严格对应与双手武器禁令：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>盾槽独占:</strong> 2122 埃癸斯神盾专属装配于 <code>shield</code> 槽位，其余皆为武器。</li>
            <li><strong>双手弓/弩互斥:</strong> 若主手持有与一之弓 (2105) 或自动连弩 (2119)，埃癸斯神盾立即失效。</li>
            <li><strong>副手双武熔断:</strong> 无论何种专属装备，副手若有武器 (<code>offhand_weapon != ""</code>) 一律驳回。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-purple-900/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-400">🔄 零存档污染与战中差额置换</span>
            <n-tag size="tiny" type="info">SAFE PROJECTION</n-tag>
          </div>
          <div class="text-[11px] text-gray-300">
            <strong>纯净持久化与跨档隔离：</strong>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>瞬时标记抹除:</strong> 入档校验自动拦截并清空 <code>personal_runtime_owner</code> 等瞬时元标记。</li>
            <li><strong>跨档保护:</strong> <code>personal_runtime_owner</code> 强校验，跨档读取旧战局直接熔断。</li>
            <li><strong>战中切装动态重算:</strong> 战时换装仅重算装备属性差额，既有状态与伤势完整保全。</li>
          </ul>
        </div>
      </div>

      <!-- 交互推演台: 本命神兵专属契约核验台 -->
      <div class="p-4 bg-slate-950/90 rounded-xl border border-rose-700/40 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-rose-900/30 pb-2">
          <span class="text-xs font-bold text-rose-300 flex items-center gap-1.5">
            <span>🧪</span>
            <span>本命神兵专属契约核验与属性共鸣推演台</span>
          </span>
          <div class="flex items-center gap-2">
            <n-button size="tiny" secondary type="warning" @click="resetPersonalStudio">
              🔄 重置演练
            </n-button>
          </div>
        </div>

        <!-- 角色与神兵选择 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <div>
            <span class="text-gray-400 text-[10px] block mb-1 font-bold">测试佩戴角色 (Hero Candidate):</span>
            <n-select v-model:value="selectedPersonalHeroId" size="small" :options="personalHeroSelectOptions" />
          </div>

          <div>
            <span class="text-gray-400 text-[10px] block mb-1 font-bold">待装备本命神兵 (Personal Equipment):</span>
            <n-select v-model:value="selectedPersonalItemId" size="small" :options="personalItemSelectOptions" />
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">槽位冲突排他性核验:</span>
            <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer mt-0.5">
              <input type="checkbox" v-model="personalHasOffhandWeapon" />
              <span>佩戴副手武器 (触发全员互斥)</span>
            </label>
            <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" v-model="personalHasTwoHandWeapon" />
              <span>主手装配双手武器 (与埃癸斯盾互斥)</span>
            </label>
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block font-bold">角色契约核验状态:</span>
            <div class="text-[11px] font-bold mt-1" :class="isPersonalEligible ? 'text-emerald-400' : 'text-rose-400'">
              {{ isPersonalEligible ? '✅ 专属契约完全匹配 (allowed == true)' : '❌ 契约受阻驳回 (allowed == false)' }}
            </div>
            <div class="text-[10px] text-gray-400">
              {{ personalEligibilityDesc }}
            </div>
          </div>
        </div>

        <!-- 试炼演算控制 -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div class="flex items-center gap-2">
            <n-button size="small" type="primary" secondary @click="executePersonalResonance">
              ⚡ 执行本命神兵共鸣演算
            </n-button>
            <span class="text-xs text-gray-400">
              综合战力增幅评分: <strong class="text-rose-400 font-mono">{{ personalResonancePowerRating }} 点</strong>
            </span>
          </div>

          <div class="text-[11px] font-mono text-rose-300">
            SQL: SELECT id FROM player WHERE id=? (校验通过)
          </div>
        </div>

        <!-- 共鸣效果呈现 -->
        <div v-if="lastPersonalResonanceResult" class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
          <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span class="text-xs font-bold text-gray-200">
              共鸣核验结论：{{ lastPersonalResonanceResult.summary }}
            </span>
            <n-tag size="small" :type="lastPersonalResonanceResult.success ? 'success' : 'error'">
              {{ lastPersonalResonanceResult.statusTag }}
            </n-tag>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center pt-1">
            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">面板属性增益 (Delta)</div>
              <div class="text-lg font-mono font-bold text-amber-400">{{ lastPersonalResonanceResult.statDeltaText }}</div>
              <div class="text-[9px] text-gray-500">{{ lastPersonalResonanceResult.statDeltaDesc }}</div>
            </div>

            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">专属本命奥义 / 核心特权</div>
              <div class="text-lg font-mono font-bold" :class="lastPersonalResonanceResult.success ? 'text-emerald-400' : 'text-gray-500'">
                {{ lastPersonalResonanceResult.specialTraitText }}
              </div>
              <div class="text-[9px]" :class="lastPersonalResonanceResult.success ? 'text-emerald-300' : 'text-gray-500'">
                {{ lastPersonalResonanceResult.specialTraitDesc }}
              </div>
            </div>

            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <div class="text-[10px] text-gray-400">槽位归属与安全性</div>
              <div class="text-lg font-mono font-bold text-cyan-400">
                {{ lastPersonalResonanceResult.slotText }}
              </div>
              <div class="text-[9px] text-gray-500">{{ lastPersonalResonanceResult.securityDesc }}</div>
            </div>
          </div>
        </div>

        <!-- 审计日志 -->
        <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-1">
          <div class="text-gray-500 font-bold">本命神兵事件凭据审计 (PersonalEquipment Event Trace):</div>
          <div v-for="(log, idx) in personalTraceLogs" :key="idx" class="text-rose-300 truncate">
            &gt; {{ log }}
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 🔮 太古全域神兵附魔符文锻造、词缀洗练与太古共鸣升阶工坊 (v2.2.290) ================= -->
    <div id="rune-reforge-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c1026] via-[#121324] to-[#0d162a] border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.2)] space-y-6">
      <!-- 头部横幅 -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-purple-900/50 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/40">
              ANCIENT RUNE ENCHANTMENT &amp; AFFIX REFORGING
            </span>
            <span class="text-xs text-purple-400 font-mono">v2.2.290 Armory Matrix</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
            <span>🔮</span> 太古全域神兵附魔符文锻造、词缀洗练与太古共鸣升阶工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
            面向 Godot 4.6 LTS 神兵附魔深度系统：融汇四大太古附魔流派、以太高压淬火纯度微调、词缀相干性多角色谐波共鸣与防爆防碎裂安全契约。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-700/60 text-xs font-mono text-purple-300">
            符文淬炼 15 阶
          </span>
          <span class="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-700/60 text-xs font-mono text-cyan-300">
            多角色谐波同步
          </span>
        </div>
      </div>

      <!-- 四大符文附魔流派选择 -->
      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">✨</span>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">四大太古神兵附魔流派 (Enchantment Schools)</h3>
          </div>
          <span class="text-xs text-gray-400">选择附魔符印以激活专属战时元素共鸣与追击特效</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="rune in runeSchoolsList"
            :key="rune.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedRuneSchoolId === rune.id ? `${rune.color} ring-2 ring-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]` : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'"
            @click="selectedRuneSchoolId = rune.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ rune.icon }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-gray-300">
                {{ rune.perkTag }}
              </span>
            </div>
            <div class="font-bold text-sm text-white mb-1">{{ rune.name }}</div>
            <p class="text-xs text-gray-400 leading-snug">{{ rune.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 参数微调与遥测看板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧参数调节面板 -->
        <div class="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-lg">🎛️</span>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider">符文淬炼与词缀拓扑参数</h3>
            </div>
            <n-tag type="info" size="tiny" round>实机连续微调</n-tag>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>神兵符文淬炼阶数 (Rune Refine Level)</span>
                <span class="font-mono font-bold text-purple-400">+{{ runeRefineLevel }} 阶</span>
              </div>
              <n-slider v-model:value="runeRefineLevel" :min="1" :max="15" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>+1 阶 (初阶启迪)</span>
                <span>+8 阶 (宗师淬火)</span>
                <span>+15 阶 (诸神极境大圆满)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>词缀共鸣相干度 (Affix Synergy Ratio)</span>
                <span class="font-mono font-bold text-cyan-400">{{ affixSynergyRatio }}%</span>
              </div>
              <n-slider v-model:value="affixSynergyRatio" :min="50" :max="200" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>50% (散佚词缀)</span>
                <span>125% (同契共振)</span>
                <span>200% (全词缀大融贯)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>以太淬火纯净度 (Aether Purity Rating)</span>
                <span class="font-mono font-bold text-emerald-400">{{ aetherPurityRating }}%</span>
              </div>
              <n-slider v-model:value="aetherPurityRating" :min="10" :max="100" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>10% (杂质微量)</span>
                <span>85% (高纯秘银以太)</span>
                <span>100% (原初水晶无垢水)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>多角色谐波同步率 (Resonance Harmonics)</span>
                <span class="font-mono font-bold text-amber-400">{{ resonanceHarmonics.toFixed(1) }}x</span>
              </div>
              <n-slider v-model:value="resonanceHarmonics" :min="1.0" :max="4.0" :step="0.1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>1.0x (单兵配装)</span>
                <span>2.2x (光暗双队谐波)</span>
                <span>4.0x (全员八主角大共鸣)</span>
              </div>
            </div>
          </div>

          <!-- 3 个附魔锻造开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-3">
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🛡️</span> 防爆锻造永固护身符 (Anti-Explosion Ward)
                </div>
                <div class="text-[10px] text-gray-400">冲击 +10 以上高阶淬炼失败时，神兵绝不碎裂或掉阶，锻造成功率额外 +15%</div>
              </div>
              <n-switch v-model:value="antiExplosionWard" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🔒</span> 极品神圣词缀完美锁定 (Perfect Affix Lock)
                </div>
                <div class="text-[10px] text-gray-400">洗练时锁定前缀/后缀最顶尖数值（如 50% 暴击伤害），仅重随次级词缀</div>
              </div>
              <n-switch v-model:value="perfectAffixLock" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚡</span> 太古极境双词缀解禁 (Transcendence Cap Breaker)
                </div>
                <div class="text-[10px] text-gray-400">突破单武器专属词缀限制，允许主手神兵同时附带第二太古本命特权</div>
              </div>
              <n-switch v-model:value="transcendenceCapBreaker" />
            </div>
          </div>
        </div>

        <!-- 右侧实时遥测看板 -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-purple-950/40 border border-purple-500/30 space-y-4">
            <div class="flex items-center justify-between border-b border-purple-500/20 pb-2">
              <h3 class="text-xs font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                <span>📊</span> 神兵附魔精算遥测 (Forge Telemetry)
              </h3>
              <span class="text-[10px] font-mono text-emerald-400 animate-pulse">● 符文熔炉在线</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                <div class="text-[10px] text-gray-400">符文附加攻击力 (ATK)</div>
                <div class="text-lg sm:text-xl font-black text-purple-400 font-mono mt-1">
                  +{{ calculatedRefinedAttackPower.toLocaleString() }}
                </div>
                <div class="text-[9px] text-purple-500/80 mt-0.5">淬火与谐波总附加</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20">
                <div class="text-[10px] text-gray-400">暴击破限终极倍率</div>
                <div class="text-lg sm:text-xl font-black text-amber-400 font-mono mt-1">
                  {{ calculatedCritDamageMultiplier }}
                </div>
                <div class="text-[9px] text-amber-500/80 mt-0.5">词缀相干性加权</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20">
                <div class="text-[10px] text-gray-400">次阶淬炼成功概率</div>
                <div class="text-lg sm:text-xl font-black text-emerald-400 font-mono mt-1">
                  {{ calculatedReforgeSuccessChance }}
                </div>
                <div class="text-[9px] text-emerald-500/80 mt-0.5">防爆护身符增益后</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20">
                <div class="text-[10px] text-gray-400">神兵符文认证位阶</div>
                <div class="text-base sm:text-lg font-black text-cyan-400 font-mono mt-1">
                  {{ calculatedRuneTier }}
                </div>
                <div class="text-[9px] text-cyan-500/80 mt-0.5">太古神殿评阶</div>
              </div>
            </div>

            <!-- 当前附魔特质摘要 -->
            <div class="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-1">
              <div class="flex items-center justify-between text-gray-400">
                <span>附魔流派:</span>
                <span class="font-bold text-white">{{ currentRuneSchoolObj?.name }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>流派加成:</span>
                <span class="font-mono text-purple-400">{{ currentRuneSchoolObj?.perkTag }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>防爆护身符:</span>
                <span class="font-mono" :class="antiExplosionWard ? 'text-emerald-400' : 'text-gray-500'">
                  {{ antiExplosionWard ? '有效保护 (零碎裂风险)' : '未启用' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>太古双词缀:</span>
                <span class="font-mono" :class="transcendenceCapBreaker ? 'text-cyan-400' : 'text-gray-500'">
                  {{ transcendenceCapBreaker ? '双神圣特权解禁' : '单词缀限制' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 快捷操作按钮 -->
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              @click="runRuneReforgeSimulation"
              :disabled="isRuneSimulating"
            >
              <span>{{ isRuneSimulating ? '⏳' : '🚀' }}</span>
              {{ isRuneSimulating ? '符文锻造推演中...' : '启动五阶段神兵符文锻造推演' }}
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
              @click="exportRuneReforgeCertificate"
            >
              <span>📄</span> 导出证书
            </button>
          </div>
        </div>
      </div>

      <!-- 五阶段符文锻造推演终端 -->
      <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">💻</span>
            <h3 class="text-sm font-bold text-white font-mono uppercase">太古符文锻造控制台 (Ancient Rune Forge Terminal)</h3>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="isRuneSimulating" class="text-xs text-purple-400 animate-pulse font-mono">
              STAGE {{ runeSimStage }}/5 淬炼中
            </span>
            <span v-else-if="runeSimFinished" class="text-xs text-emerald-400 font-mono">
              ✓ 符文锻造大圆满
            </span>
            <button
              type="button"
              class="text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 cursor-pointer"
              @click="runeTerminalLogs = []"
            >
              清屏
            </button>
          </div>
        </div>

        <div class="h-44 p-3 rounded-xl bg-black/90 border border-slate-900 font-mono text-xs overflow-y-auto space-y-1 text-gray-300">
          <div v-if="runeTerminalLogs.length === 0" class="text-gray-600 italic">
            [终端待命中] 点击“启动五阶段神兵符文锻造推演”以解算以太淬火纯度、词缀相干性与太古双词缀升阶...
          </div>
          <div v-for="(log, idx) in runeTerminalLogs" :key="idx" class="leading-relaxed">
            <span class="text-gray-500">[{{ log.time }}]</span>
            <span :class="log.color"> {{ log.message }}</span>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 核心脚本展台 -->
      <div class="p-5 rounded-2xl bg-[#121626]/90 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">📜</span>
            <div>
              <h3 class="text-sm font-bold text-white font-mono">Godot 4.6 LTS 太古神兵符文锻造与词缀洗练引擎源码</h3>
              <p class="text-xs text-gray-400">面向 RefCounted 无环解耦架构的独立神兵附魔套件</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <n-button
              size="tiny"
              :type="activeGdRuneTab === 'enchant' ? 'primary' : 'default'"
              secondary
              @click="activeGdRuneTab = 'enchant'"
            >
              ancient_relic_rune_enchantment_engine.gd
            </n-button>
            <n-button
              size="tiny"
              :type="activeGdRuneTab === 'reforge' ? 'primary' : 'default'"
              secondary
              @click="activeGdRuneTab = 'reforge'"
            >
              affix_reforge_probability_matrix.gd
            </n-button>
            <n-button
              size="tiny"
              :type="activeGdRuneTab === 'harmonics' ? 'primary' : 'default'"
              secondary
              @click="activeGdRuneTab = 'harmonics'"
            >
              resonance_harmonics_controller.gd
            </n-button>
          </div>
        </div>

        <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-purple-300 font-mono overflow-x-auto leading-relaxed max-h-96">{{ currentGdRuneCode }}</pre>
      </div>
    </div>


    <!-- ================= 全域神兵与防具全景展示库 (用户要求：选人装备 + 点击查看图片详情) ================= -->
    <div class="space-y-4 pt-6 border-t border-slate-800">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 class="text-base sm:text-lg font-bold text-gray-100 flex items-center gap-2">
            <span>📦</span>
            <span>全域神兵防具图鉴 (支持自由选人装备 & 点击查阅全息立绘)</span>
          </h3>
          <p class="text-xs text-gray-400">
            点击任意装备卡片即可<strong>放大查看高清立绘与深层特效</strong>；点击<strong>【选人装配】</strong>可直接指定同伴装配该装备
          </p>
        </div>

        <!-- 筛选切换 -->
        <div class="flex items-center gap-2">
          <n-switch v-model:value="showOnlyCompatible" size="small">
            <template #checked>仅显示【{{ activeHero.name }}】可穿装备</template>
            <template #unchecked>显示全库所有装备 (含限制项)</template>
          </n-switch>
        </div>
      </div>

      <!-- 槽位类别快速筛选按钮 -->
      <div class="flex flex-wrap items-center gap-2">
        <n-button
          v-for="st in slotCategoryFilters"
          :key="st.value"
          size="tiny"
          :type="activeCatalogSlot === st.value ? 'primary' : 'default'"
          secondary
          @click="activeCatalogSlot = st.value"
        >
          {{ st.label }} ({{ getSlotCount(st.value) }})
        </n-button>
      </div>

      <!-- 装备全览网格卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in displayedCatalogItems"
          :key="item.id"
          class="bg-[#121626]/90 border rounded-xl p-4 shadow-lg flex flex-col justify-between transition-all cursor-pointer relative group"
          :class="isHeroEquippable(activeHero, item) ? 'border-slate-800 hover:border-amber-400/70 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-red-900/30 opacity-70 bg-slate-950/40'"
          @click="openItemInspector(item)"
        >
          <div>
            <!-- 头部：图标 + 名字 + 稀有度 + 职业适配徽标 -->
            <div class="flex items-start justify-between gap-2 mb-2">
              <div class="flex items-center gap-2">
                <span class="text-xl filter drop-shadow">{{ item.icon }}</span>
                <div>
                  <div class="font-bold text-gray-100 text-sm group-hover:text-amber-300 transition-colors">
                    {{ item.name }}
                  </div>
                  <div class="text-[10px] text-amber-500 font-mono">{{ item.rarityText }}</div>
                </div>
              </div>

              <!-- 权限与穿戴状态徽标 -->
              <div class="flex flex-col items-end gap-1">
                <n-tag v-if="getItemWearingHero(item)" size="tiny" type="info">
                  👤 {{ getItemWearingHero(item)!.name }} 穿戴中
                </n-tag>
                <n-tag v-else-if="isHeroEquippable(activeHero, item)" size="tiny" type="success">
                  ✅ {{ activeHero.name }}适配
                </n-tag>
                <n-tag v-else size="tiny" type="error">
                  🚫 {{ activeHero.name }}职业不可穿
                </n-tag>
              </div>
            </div>

            <!-- 数值属性看板 -->
            <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 text-xs text-gray-300 space-y-1.5 mb-2 font-mono">
              <div class="flex items-center justify-between">
                <span>装备类型:</span>
                <span class="text-cyan-300 font-sans font-semibold">{{ item.typeName }}</span>
              </div>
              <div v-if="item.atk" class="flex items-center justify-between text-amber-400">
                <span>物理攻击 (ATK):</span>
                <span class="font-bold">+{{ item.atk }}</span>
              </div>
              <div v-if="item.matk" class="flex items-center justify-between text-purple-400">
                <span>魔法攻击 (MATK):</span>
                <span class="font-bold">+{{ item.matk }}</span>
              </div>
              <div v-if="item.def" class="flex items-center justify-between text-blue-400">
                <span>物理防御 (DEF):</span>
                <span class="font-bold">+{{ item.def }}</span>
              </div>
              <div v-if="item.mdef" class="flex items-center justify-between text-indigo-400">
                <span>魔法防御 (M.DEF):</span>
                <span class="font-bold">+{{ item.mdef }}</span>
              </div>
              <div v-if="item.hpBonus" class="flex items-center justify-between text-red-400">
                <span>最大生命 (HP):</span>
                <span class="font-bold">+{{ item.hpBonus }}</span>
              </div>
              <div v-if="item.agi" class="flex items-center justify-between text-emerald-400">
                <span>敏捷加成 (AGI):</span>
                <span class="font-bold">+{{ item.agi }}</span>
              </div>

              <!-- 明确展示允许穿戴职业列表 -->
              <div class="pt-1.5 border-t border-slate-800/80 flex flex-col gap-1 font-sans">
                <div class="flex items-center justify-between text-[11px] text-gray-400">
                  <span class="flex items-center gap-1">
                    <span>🎯</span>
                    <strong class="text-gray-300">允许穿戴职业：</strong>
                  </span>
                  <span v-if="item.allowedJobs.includes('all')" class="text-amber-400 text-[10px] font-bold">
                    全职业通用
                  </span>
                </div>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="jName in getAllowedJobNames(item)"
                    :key="jName"
                    class="text-[10px] px-1.5 py-0.5 rounded transition-colors"
                    :class="isJobMatchingActiveHero(jName) ? 'bg-amber-500/25 text-amber-300 border border-amber-400/50 font-bold shadow-[0_0_8px_rgba(245,158,11,0.25)]' : 'bg-slate-800 text-gray-300 border border-slate-700/50'"
                  >
                    {{ jName }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 特殊机制特效说明 -->
            <p class="text-xs text-gray-300 leading-relaxed mb-3">
              {{ item.effect }}
            </p>
          </div>

          <!-- 卡片底部操作栏：查看立绘、装配给当前同伴、选人装配 -->
          <div class="border-t border-slate-800/80 pt-2.5 flex items-center justify-between gap-2 text-[11px]" @click.stop>
            <div class="text-gray-500 truncate max-w-[120px] text-[10px]">
              {{ item.origin }}
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <!-- 查看立绘与详情按钮 -->
              <n-button size="tiny" quaternary type="info" @click="openItemInspector(item)">
                🖼️ 立绘
              </n-button>

              <!-- 装配给当前角色快捷按钮 -->
              <n-button
                v-if="isHeroEquippable(activeHero, item)"
                size="tiny"
                type="warning"
                secondary
                @click="equipItemToHero(activeHero, item)"
              >
                {{ isHeroWearingItem(activeHero, item) ? '当前已装配' : `装配给${activeHero.name}` }}
              </n-button>

              <!-- 选人装配下拉交互 (用户核心诉求：“选个人 然后可以装备这个道具”) -->
              <n-popselect
                :options="getEquipToHeroOptions(item)"
                trigger="click"
                size="small"
                @update:value="(heroId: string) => handlePopselectEquip(heroId, item)"
              >
                <n-button size="tiny" type="primary" secondary>
                  选人装配 ▾
                </n-button>
              </n-popselect>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 装备全息立绘与深层规格检查弹窗 (用户要求：“点击可以查看一张图片 武器的装备之类的详情啊”) ================= -->
    <n-modal
      v-model:show="inspectModalVisible"
      preset="card"
      style="width: 95%; max-width: 820px; background-color: #121626; border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 16px;"
      :mask-closable="true"
    >
      <template #header>
        <div class="flex items-center justify-between pr-4">
          <div class="flex items-center gap-2">
            <span class="text-xl">🗡️</span>
            <span class="font-black text-amber-300 text-base sm:text-lg">神兵全息立绘与超限档案</span>
          </div>
          <n-tag v-if="inspectItem" size="small" type="warning" round>
            {{ inspectItem.rarityText }}
          </n-tag>
        </div>
      </template>

      <div v-if="inspectItem" class="space-y-5">
        <!-- 核心立绘与基础视界展台 -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <!-- 左侧：动态高精度 SVG 立绘卡片 -->
          <div class="md:col-span-5 flex justify-center">
            <div class="w-full max-w-[280px] h-[260px]">
              <EquipmentIllustration :item="inspectItem" />
            </div>
          </div>

          <!-- 右侧：神兵规格与出处背景 -->
          <div class="md:col-span-7 space-y-2.5">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ inspectItem.icon }}</span>
              <div>
                <h3 class="text-xl font-black text-white flex items-center gap-2">
                  <span>{{ inspectItem.name }}</span>
                </h3>
                <span class="text-xs text-amber-400 font-mono">{{ inspectItem.typeName }} · {{ inspectItem.slot.toUpperCase() }}</span>
              </div>
            </div>

            <!-- 核心数值标签矩阵 -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono pt-1">
              <div v-if="inspectItem.atk" class="p-2 bg-amber-950/30 border border-amber-800/40 rounded">
                <span class="text-gray-400 block text-[10px]">物理攻击 ATK</span>
                <span class="text-amber-400 font-bold text-sm">+{{ inspectItem.atk }}</span>
              </div>
              <div v-if="inspectItem.matk" class="p-2 bg-purple-950/30 border border-purple-800/40 rounded">
                <span class="text-gray-400 block text-[10px]">魔法攻击 MATK</span>
                <span class="text-purple-400 font-bold text-sm">+{{ inspectItem.matk }}</span>
              </div>
              <div v-if="inspectItem.def" class="p-2 bg-blue-950/30 border border-blue-800/40 rounded">
                <span class="text-gray-400 block text-[10px]">物理防御 DEF</span>
                <span class="text-blue-400 font-bold text-sm">+{{ inspectItem.def }}</span>
              </div>
              <div v-if="inspectItem.mdef" class="p-2 bg-indigo-950/30 border border-indigo-800/40 rounded">
                <span class="text-gray-400 block text-[10px]">魔法防御 M.DEF</span>
                <span class="text-indigo-400 font-bold text-sm">+{{ inspectItem.mdef }}</span>
              </div>
              <div v-if="inspectItem.hpBonus" class="p-2 bg-red-950/30 border border-red-800/40 rounded">
                <span class="text-gray-400 block text-[10px]">生命增益 HP</span>
                <span class="text-red-400 font-bold text-sm">+{{ inspectItem.hpBonus }}</span>
              </div>
              <div v-if="inspectItem.str" class="p-2 bg-slate-900 border border-slate-800 rounded">
                <span class="text-gray-400 block text-[10px]">力量加权 STR</span>
                <span class="text-emerald-400 font-bold text-sm">+{{ inspectItem.str }}</span>
              </div>
              <div v-if="inspectItem.agi" class="p-2 bg-slate-900 border border-slate-800 rounded">
                <span class="text-gray-400 block text-[10px]">敏捷加权 AGI</span>
                <span class="text-emerald-400 font-bold text-sm">+{{ inspectItem.agi }}</span>
              </div>
              <div v-if="inspectItem.mag" class="p-2 bg-slate-900 border border-slate-800 rounded">
                <span class="text-gray-400 block text-[10px]">智力加权 MAG</span>
                <span class="text-purple-400 font-bold text-sm">+{{ inspectItem.mag }}</span>
              </div>
            </div>

            <!-- 出处与宝箱来源 -->
            <div class="text-xs text-gray-400 pt-1">
              <span class="text-amber-400 font-bold">📍 掉落/获取源:</span>
              <span class="text-gray-200 ml-1">{{ inspectItem.origin }}</span>
            </div>
          </div>
        </div>

        <!-- 换装前后面板差异即时对比预览 (同步 Godot 最新 equipment_comparison 算法机制) -->
        <div v-if="activeHeroEquipmentComparison" class="p-3.5 bg-gradient-to-r from-slate-900/90 via-[#151c30] to-slate-900/90 rounded-xl border border-cyan-500/30 space-y-2 text-xs">
          <!-- 结构化拒绝提示 (unavailable) -->
          <div v-if="activeHeroEquipmentComparison.status === 'unavailable'" class="p-3 bg-rose-950/40 rounded-lg border border-rose-500/50 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-rose-300 font-bold flex items-center gap-1.5">
                <span>🚫</span>
                <span>【{{ activeHero.name }}】装备只读对比受阻（拒绝穿戴）：</span>
              </span>
              <n-tag size="tiny" type="error">REASON: {{ activeHeroEquipmentComparison.reason }}</n-tag>
            </div>
            <p class="text-rose-200/90 text-xs font-mono">
              {{ activeHeroEquipmentComparison.reasonText }}
            </p>
            <div class="text-[10px] text-gray-400">
              规范依据：<code>equipment_comparison.gd</code>，未通过谓词核验时安全返回空投影，绝不强行计算虚假战力。
            </div>
          </div>

          <!-- 正常就绪对比 (ready) -->
          <template v-else>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span class="text-cyan-300 font-bold flex items-center gap-1.5">
                <span>⚖️</span>
                <span>【{{ activeHero.name }}】换装前后面板差异实时推演对比：</span>
              </span>
              <span class="text-[11px] text-gray-400">
                对应当前槽位：<strong class="text-amber-300">{{ activeHero.loadout[inspectItem.slot]?.name || '（当前部位未装备）' }}</strong>
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
              <div class="p-2 bg-slate-950/70 rounded-lg border border-slate-800">
                <span class="text-[10px] text-gray-400 block mb-0.5">物理攻击 P.ATK</span>
                <div class="text-xs text-gray-200">
                  {{ activeHeroEquipmentComparison.before.patk }} → {{ activeHeroEquipmentComparison.after.patk }}
                </div>
                <span class="text-[11px] font-bold block mt-0.5" :class="getDeltaClass(activeHeroEquipmentComparison.delta.patk)">
                  {{ formatDelta(activeHeroEquipmentComparison.delta.patk) }}
                </span>
              </div>
              <div class="p-2 bg-slate-950/70 rounded-lg border border-slate-800">
                <span class="text-[10px] text-gray-400 block mb-0.5">物理防御 P.DEF</span>
                <div class="text-xs text-gray-200">
                  {{ activeHeroEquipmentComparison.before.pdef }} → {{ activeHeroEquipmentComparison.after.pdef }}
                </div>
                <span class="text-[11px] font-bold block mt-0.5" :class="getDeltaClass(activeHeroEquipmentComparison.delta.pdef)">
                  {{ formatDelta(activeHeroEquipmentComparison.delta.pdef) }}
                </span>
              </div>
              <div class="p-2 bg-slate-950/70 rounded-lg border border-slate-800">
                <span class="text-[10px] text-gray-400 block mb-0.5">魔法防御 M.DEF</span>
                <div class="text-xs text-gray-200">
                  {{ activeHeroEquipmentComparison.before.mdef }} → {{ activeHeroEquipmentComparison.after.mdef }}
                </div>
                <span class="text-[11px] font-bold block mt-0.5" :class="getDeltaClass(activeHeroEquipmentComparison.delta.mdef)">
                  {{ formatDelta(activeHeroEquipmentComparison.delta.mdef) }}
                </span>
              </div>
              <div class="p-2 bg-slate-950/70 rounded-lg border border-slate-800">
                <span class="text-[10px] text-gray-400 block mb-0.5">综合战力 Rating</span>
                <div class="text-xs text-gray-200">
                  {{ activeHeroEquipmentComparison.before.powerRating }} → {{ activeHeroEquipmentComparison.after.powerRating }}
                </div>
                <span class="text-[11px] font-bold block mt-0.5" :class="getDeltaClass(activeHeroEquipmentComparison.delta.powerRating)">
                  {{ formatDelta(activeHeroEquipmentComparison.delta.powerRating) }}
                </span>
              </div>
            </div>

            <!-- 回避率分项对比 (同步 Godot 最新 equipment_comparison 回避双列算法) -->
            <div class="grid grid-cols-2 gap-2 text-center font-mono pt-2 border-t border-slate-800/80">
              <div class="p-2 bg-slate-950/70 rounded-lg border border-slate-800">
                <span class="text-[10px] text-gray-400 block mb-0.5">物理回避 Physical Evasion</span>
                <div class="text-xs text-gray-200">
                  {{ formatPercent(activeHeroEquipmentComparison.before.physicalEvasion) }} → {{ formatPercent(activeHeroEquipmentComparison.after.physicalEvasion) }}
                </div>
                <span class="text-[11px] block mt-0.5" :class="getEvasionDeltaClass(activeHeroEquipmentComparison.delta.physicalEvasion)">
                  {{ formatEvasionDelta(activeHeroEquipmentComparison.delta.physicalEvasion) }}
                </span>
              </div>
              <div class="p-2 bg-slate-950/70 rounded-lg border border-slate-800">
                <span class="text-[10px] text-gray-400 block mb-0.5">近战附加 Melee Evasion</span>
                <div class="text-xs text-gray-200">
                  {{ formatPercent(activeHeroEquipmentComparison.before.meleeEvasion) }} → {{ formatPercent(activeHeroEquipmentComparison.after.meleeEvasion) }}
                </div>
                <span class="text-[11px] block mt-0.5" :class="getEvasionDeltaClass(activeHeroEquipmentComparison.delta.meleeEvasion)">
                  {{ formatEvasionDelta(activeHeroEquipmentComparison.delta.meleeEvasion) }}
                </span>
              </div>
            </div>
            <div class="text-[10px] text-gray-400 italic text-center">
              * 两个回避列保持各自比例、不相加，变化以百分点表达；近战项仅近战适用，不含职业被动及战斗临时修正。
            </div>
          </template>
        </div>

        <!-- 实战特效与史诗传说 -->
        <div class="space-y-2 text-xs">
          <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
            <span class="text-amber-400 font-bold block mb-1">⚡ 实战特权与机制说明:</span>
            <p class="text-gray-200 leading-relaxed">{{ inspectItem.effect }}</p>
          </div>

          <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
            <span class="text-cyan-400 font-bold block mb-1">📜 终焉传说与背景设定:</span>
            <p class="text-gray-400 italic leading-relaxed">{{ inspectItem.lore }}</p>
          </div>
        </div>

        <!-- 允许穿戴职业清单 -->
        <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5 text-xs">
          <span class="text-gray-300 font-bold flex items-center gap-1.5">
            <span>🎯</span>
            <span>允许装备该道具的全部职业清单（自由人恒定全穿）：</span>
          </span>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="jobName in getAllowedJobNames(inspectItem)"
              :key="jobName"
              class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-gray-200 border border-slate-700"
              :class="isJobMatchingActiveHero(jobName) ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 font-bold' : ''"
            >
              {{ jobName }}
            </span>
          </div>
        </div>

        <!-- 选人装配交互专区 (用户核心诉求：“选个人 然后可以装备这个道具”) -->
        <div class="p-4 bg-gradient-to-r from-amber-950/20 via-slate-900/80 to-purple-950/20 rounded-xl border border-amber-500/30 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-base">👤</span>
              <span class="font-bold text-gray-100 text-xs sm:text-sm">快速选人装配到槽位：</span>
            </div>
            <span class="text-[11px] text-gray-400">点击任意同伴即刻装配</span>
          </div>

          <!-- 9 位角色装配操作按钮矩阵 -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2.5">
            <div
              v-for="hero in heroes"
              :key="hero.id"
              class="p-2.5 rounded-lg border flex items-center justify-between transition-all"
              :class="isHeroWearingItem(hero, inspectItem) ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : isHeroEquippable(hero, inspectItem) ? 'bg-slate-900 border-slate-700 hover:border-slate-500' : 'bg-slate-950/50 border-red-900/30 opacity-60'"
            >
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-lg">{{ hero.avatar }}</span>
                <div class="truncate">
                  <div class="text-xs font-bold text-gray-100 truncate">{{ hero.name }}</div>
                  <div class="text-[10px] text-gray-400 truncate">{{ getJobShortName(hero.jobId) }}</div>
                </div>
              </div>

              <div>
                <!-- 如果当前已装配 -->
                <n-button
                  v-if="isHeroWearingItem(hero, inspectItem)"
                  size="tiny"
                  type="warning"
                  secondary
                  @click="unequipItemFromHero(hero, inspectItem)"
                >
                  卸下
                </n-button>
                <!-- 如果可以装配 -->
                <n-button
                  v-else-if="isHeroEquippable(hero, inspectItem)"
                  size="tiny"
                  type="primary"
                  secondary
                  @click="equipItemToHero(hero, inspectItem)"
                >
                  装配给TA
                </n-button>
                <!-- 职业不符 -->
                <n-tooltip v-else trigger="hover">
                  <template #trigger>
                    <n-button size="tiny" disabled quaternary>
                      职业受限
                    </n-button>
                  </template>
                  <span>{{ hero.name }}当前职业【{{ getJobShortName(hero.jobId) }}】无法装备，需转职为自由人或允许职业</span>
                </n-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import {
  ARMORY_ITEMS,
  JOB_EQUIP_RULES,
  ArmoryItem,
  EquipSlotType,
  canJobEquipItem
} from '../config/armoryEquipmentConfig'
import EquipmentIllustration from '../components/EquipmentIllustration.vue'

const message = useMessage()

// ================= 物语顶栏状态 (PartyStoryHeader 同步) =================
const chapterPresets = [
  { label: '序章 · 黎明破晓的初啼 · 晨辉王都晨辉殿', value: 'prologue_palace' },
  { label: '第一章 · 风之水晶的崩裂 · 宁静村与风之神殿', value: 'ch1_wind_shrine' },
  { label: '第二章 · 海盗的誓盟与巨妖 · 海角镇与托尔纳运河', value: 'ch2_cape_town' },
  { label: '第三章 · 蒸汽与黑科技的轰鸣 · 织造机械城与战舰龙骨舱', value: 'ch3_factory_keel' },
  { label: '第四章 · 黄沙古墓与暗之苏醒 · 砂之月都地下暗殿', value: 'ch4_sand_moon' },
  { label: '第五章 · 神木枯竭之谜 · 迷雾林与世界树药坊', value: 'ch5_yggdrasil' },
  { label: '第八章 · 故国覆灭残垣 · 古王国废墟与近卫营', value: 'ch8_ruined_kingdom' },
  { label: '第十章 · 秘法古都之聚 · 米西迪亚贤者塔与星象台', value: 'ch10_mysidia' },
  { label: '第十二章 · 终焉神座决战 · 瓦塔天梯与虚无核心', value: 'ch12_void_throne' },
  { label: '终章 · 次元裂缝与虚无王座 · 两界交汇次元尽头', value: 'ch_final_void' }
]

const currentChapterPreset = ref('ch3_factory_keel')
const currentChapter = computed(() => {
  const match = chapterPresets.find(c => c.value === currentChapterPreset.value)
  return match ? match.label.split(' · ')[0] : '第三章 · 蒸汽与黑科技的轰鸣'
})
const currentLocation = computed(() => {
  const match = chapterPresets.find(c => c.value === currentChapterPreset.value)
  if (!match) return '织造机械城 · 未完工战舰龙骨舱'
  const parts = match.label.split(' · ')
  return parts.length >= 3 ? parts[2] : parts[1]
})

// ================= 多角色队伍状态模型 (光暗双队 8 大主角 + 自由人) =================
export interface HeroSlotLoadout {
  weapon: ArmoryItem | null
  offhand: ArmoryItem | null
  head: ArmoryItem | null
  body: ArmoryItem | null
  accessory: ArmoryItem | null
}

export interface HeroModel {
  id: string
  name: string
  title: string
  avatar: string
  party: 'light' | 'dark' | 'free'
  jobId: string
  level: number
  baseStats: { str: number; agi: number; vit: number; mag: number; spr: number; luck: number }
  loadout: HeroSlotLoadout
}

// 初始化 9 位经典同伴
const heroes = ref<HeroModel[]>([
  {
    id: 'li_chuan',
    name: '黎川',
    title: '晨辉之剑',
    avatar: '🗡️',
    party: 'light',
    jobId: 'mystic_knight',
    level: 99,
    baseStats: { str: 94, agi: 82, vit: 88, mag: 65, spr: 78, luck: 80 },
    loadout: { weapon: null, offhand: null, head: null, body: null, accessory: null }
  },
  {
    id: 'wei_heng',
    name: '卫珩',
    title: '坚壁圣骑',
    avatar: '🛡️',
    party: 'light',
    jobId: 'paladin',
    level: 99,
    baseStats: { str: 92, agi: 60, vit: 98, mag: 50, spr: 85, luck: 70 },
    loadout: { weapon: null, offhand: null, head: null, body: null, accessory: null }
  },
  {
    id: 'qian_luo',
    name: '茜罗',
    title: '遗都真皇',
    avatar: '👑',
    party: 'light',
    jobId: 'memorist',
    level: 99,
    baseStats: { str: 70, agi: 85, vit: 72, mag: 90, spr: 88, luck: 86 },
    loadout: { weapon: null, offhand: null, head: null, body: null, accessory: null }
  },
  {
    id: 'zhou_yin',
    name: '昼隐',
    title: '晨曦神官',
    avatar: '🕊️',
    party: 'light',
    jobId: 'white_mage',
    level: 99,
    baseStats: { str: 45, agi: 75, vit: 65, mag: 95, spr: 99, luck: 75 },
    loadout: { weapon: null, offhand: null, head: null, body: null, accessory: null }
  },
  {
    id: 'nahart',
    name: '纳哈特',
    title: '断罪黑铠',
    avatar: '⚔️',
    party: 'dark',
    jobId: 'dark_knight',
    level: 99,
    baseStats: { str: 96, agi: 78, vit: 90, mag: 70, spr: 65, luck: 72 },
    loadout: { weapon: null, offhand: null, head: null, body: null, accessory: null }
  },
  {
    id: 'cheng_yue',
    name: '澄月',
    title: '幽兰舞者',
    avatar: '💃',
    party: 'dark',
    jobId: 'dancer',
    level: 99,
    baseStats: { str: 75, agi: 96, vit: 68, mag: 82, spr: 80, luck: 92 },
    loadout: { weapon: null, offhand: null, head: null, body: null, accessory: null }
  },
  {
    id: 'ren_ge',
    name: '刃歌',
    title: '影武宗师',
    avatar: '🥷',
    party: 'dark',
    jobId: 'ninja',
    level: 99,
    baseStats: { str: 88, agi: 99, vit: 74, mag: 60, spr: 72, luck: 88 },
    loadout: { weapon: null, offhand: null, head: null, body: null, accessory: null }
  },
  {
    id: 'ye_zhi',
    name: '夜织',
    title: '幽冥大魔导',
    avatar: '🔮',
    party: 'dark',
    jobId: 'black_mage',
    level: 99,
    baseStats: { str: 40, agi: 84, vit: 60, mag: 99, spr: 82, luck: 78 },
    loadout: { weapon: null, offhand: null, head: null, body: null, accessory: null }
  },
  {
    id: 'freelancer',
    name: '自由人先驱',
    title: '万象始源',
    avatar: '⭐',
    party: 'free',
    jobId: 'freelancer',
    level: 99,
    baseStats: { str: 85, agi: 85, vit: 85, mag: 85, spr: 85, luck: 85 },
    loadout: { weapon: null, offhand: null, head: null, body: null, accessory: null }
  }
])

// 选定当前激活操作角色 (默认选纳哈特或黎川)
const activeHeroId = ref<string>('nahart')

const activeHero = computed<HeroModel>(() => {
  return heroes.value.find(h => h.id === activeHeroId.value) || heroes.value[0]
})

// 角色筛选器
const heroFilterParty = ref<string>('all')
const partyFilters = [
  { label: '全员 (9人)', value: 'all' },
  { label: '晨辉光队', value: 'light' },
  { label: '永曜暗队', value: 'dark' },
  { label: '自由人', value: 'free' }
]

const filteredHeroes = computed(() => {
  if (heroFilterParty.value === 'all') return heroes.value
  return heroes.value.filter(h => h.party === heroFilterParty.value)
})

// 切换选定角色
const selectActiveHero = (heroId: string) => {
  activeHeroId.value = heroId
}

// 角色 3 份预设方案管理 (对应实机 equipment_presets.gd)
const activePresetIndex = ref<number>(1)
const heroPresets = ref<Record<string, Record<number, HeroSlotLoadout>>>({})

const selectPreset = (index: number) => {
  activePresetIndex.value = index
}

const saveCurrentPreset = () => {
  if (!heroPresets.value[activeHero.value.id]) {
    heroPresets.value[activeHero.value.id] = {}
  }
  heroPresets.value[activeHero.value.id][activePresetIndex.value] = {
    weapon: activeHero.value.loadout.weapon,
    offhand: activeHero.value.loadout.offhand,
    head: activeHero.value.loadout.head,
    body: activeHero.value.loadout.body,
    accessory: activeHero.value.loadout.accessory
  }
  message.success(`已保存【${activeHero.value.name}】的配装方案 ${activePresetIndex.value}`)
}

const applyCurrentPreset = () => {
  const saved = heroPresets.value[activeHero.value.id]?.[activePresetIndex.value]
  if (!saved) {
    message.warning(`【${activeHero.value.name}】的方案 ${activePresetIndex.value} 尚为空白，请先配置后保存`)
    return
  }
  activeHero.value.loadout.weapon = saved.weapon
  activeHero.value.loadout.offhand = saved.offhand
  activeHero.value.loadout.head = saved.head
  activeHero.value.loadout.body = saved.body
  activeHero.value.loadout.accessory = saved.accessory
  message.success(`已成功应用【${activeHero.value.name}】的配装方案 ${activePresetIndex.value}`)
}

// 当前角色的职业规则
const activeHeroJobRule = computed(() => {
  return JOB_EQUIP_RULES[activeHero.value.jobId] || JOB_EQUIP_RULES.freelancer
})

// 获取职业简短名称
const getJobShortName = (jobId: string) => {
  const rule = JOB_EQUIP_RULES[jobId]
  if (!rule) return jobId
  return rule.name.split(' ')[0]
}

// 检查角色是否有搭载任何装备
const hasEquippedItems = (hero: HeroModel) => {
  return Object.values(hero.loadout).some(Boolean)
}

// ================= 资料库筛选与检查弹窗 =================
const showOnlyCompatible = ref(false)
const activeCatalogSlot = ref<string>('all')

const slotCategoryFilters = [
  { label: '全部装备', value: 'all' },
  { label: '主手神兵', value: 'weapon' },
  { label: '副手装具', value: 'offhand' },
  { label: '头部防具', value: 'head' },
  { label: '身体防具', value: 'body' },
  { label: '特殊饰品', value: 'accessory' }
]

// 职业下拉选项
const jobOptions = computed(() => {
  return Object.values(JOB_EQUIP_RULES).map(j => ({
    label: j.id === 'freelancer' ? `⭐ ${j.name} (全装备通穿)` : `${j.name} (${j.role})`,
    value: j.id
  }))
})

// 检查某件装备是否适配某个角色
const isHeroEquippable = (hero: HeroModel, item: ArmoryItem) => {
  return canJobEquipItem(hero.jobId, item)
}

// 检查某角色是否已穿戴某件装备
const isHeroWearingItem = (hero: HeroModel, item: ArmoryItem) => {
  return Object.values(hero.loadout).some(equipped => equipped?.id === item.id)
}

// 查找当前穿戴该装备的角色
const getItemWearingHero = (item: ArmoryItem) => {
  return heroes.value.find(h => isHeroWearingItem(h, item)) || null
}

// 格式化可装备该物品的职业名称
const getAllowedJobNames = (item: ArmoryItem) => {
  if (item.allowedJobs.includes('all')) {
    return ['⭐ 全职业通用']
  }
  const list = ['自由人']
  item.allowedJobs.forEach(jId => {
    if (jId === 'freelancer' || jId === 'all') return
    const rule = JOB_EQUIP_RULES[jId]
    const shortName = rule ? rule.name.split(' ')[0] : jId
    if (!list.includes(shortName)) {
      list.push(shortName)
    }
  })
  return list
}

// 判断某个职业是否匹配当前激活角色的职业
const isJobMatchingActiveHero = (jobName: string) => {
  if (jobName.includes('全职业')) return true
  const curName = activeHeroJobRule.value.name.split(' ')[0]
  return jobName === curName
}

// 各槽位装备数量
const getSlotCount = (slotValue: string) => {
  if (slotValue === 'all') return ARMORY_ITEMS.length
  return ARMORY_ITEMS.filter(i => i.slot === slotValue).length
}

// 过滤后的装备列表
const displayedCatalogItems = computed(() => {
  return ARMORY_ITEMS.filter(item => {
    if (activeCatalogSlot.value !== 'all' && item.slot !== activeCatalogSlot.value) {
      return false
    }
    if (showOnlyCompatible.value && !isHeroEquippable(activeHero.value, item)) {
      return false
    }
    return true
  })
})

// ================= 装配操作核心引擎 (支持直接装配 & 选人装配) =================
// 装配至指定角色
const equipItemToHero = (hero: HeroModel, item: ArmoryItem) => {
  if (!isHeroEquippable(hero, item)) {
    message.warning(`【${hero.name}】当前职业为【${getJobShortName(hero.jobId)}】，无法装备此类装备。`)
    return
  }

  // 如果其他角色正穿戴此装备，先从对方身上卸下（避免装备复制）
  heroes.value.forEach(h => {
    if (h.id !== hero.id && isHeroWearingItem(h, item)) {
      unequipItemFromHero(h, item)
    }
  })

  // 装配入对应槽位
  hero.loadout[item.slot] = item
  message.success(`已成功将【${item.name}】装配给【${hero.name}】！`)
}

// 从指定角色身上卸下装备
const unequipItemFromHero = (hero: HeroModel, item: ArmoryItem) => {
  if (hero.loadout[item.slot]?.id === item.id) {
    hero.loadout[item.slot] = null
    message.info(`已从【${hero.name}】身上卸下【${item.name}】。`)
  }
}

// 卸下指定角色的槽位
const unequipSlot = (hero: HeroModel, slot: EquipSlotType) => {
  const item = hero.loadout[slot]
  if (item) {
    hero.loadout[slot] = null
    message.info(`已卸下【${hero.name}】的【${slot}】装备。`)
  }
}

// 槽位挑选器
const openSlotPicker = (slot: EquipSlotType) => {
  activeCatalogSlot.value = slot
}

// 生成选人装配的下拉选项
const getEquipToHeroOptions = (item: ArmoryItem) => {
  return heroes.value.map(hero => {
    const isWearing = isHeroWearingItem(hero, item)
    const canEquip = isHeroEquippable(hero, item)
    let suffix = ''
    if (isWearing) suffix = ' (当前已穿戴)'
    else if (!canEquip) suffix = ` (职业限制: ${getJobShortName(hero.jobId)})`

    return {
      label: `${hero.avatar} ${hero.name} - ${getJobShortName(hero.jobId)}${suffix}`,
      value: hero.id,
      disabled: !canEquip && !isWearing
    }
  })
}

// 处理选人装配下拉回调
const handlePopselectEquip = (heroId: string, item: ArmoryItem) => {
  const hero = heroes.value.find(h => h.id === heroId)
  if (!hero) return

  if (isHeroWearingItem(hero, item)) {
    unequipItemFromHero(hero, item)
    return
  }

  equipItemToHero(hero, item)
}

// 切换角色职业时校验现有配装是否合法
const handleActiveHeroJobChange = () => {
  const hero = activeHero.value
  const slots: EquipSlotType[] = ['weapon', 'offhand', 'head', 'body', 'accessory']
  slots.forEach(slot => {
    const item = hero.loadout[slot]
    if (item && !canJobEquipItem(hero.jobId, item)) {
      hero.loadout[slot] = null
      message.warning(`由于转职为【${getJobShortName(hero.jobId)}】，已自动卸下不符合权限的【${item.name}】。`)
    }
  })
}

// 单个角色一键最强配装
const applyOptimalLoadoutForHero = (hero: HeroModel) => {
  const job = hero.jobId

  hero.loadout.weapon = ARMORY_ITEMS
    .filter(i => i.slot === 'weapon' && canJobEquipItem(job, i))
    .sort((a, b) => (b.atk || 0) - (a.atk || 0))[0] || null

  hero.loadout.offhand = ARMORY_ITEMS
    .filter(i => i.slot === 'offhand' && canJobEquipItem(job, i))
    .sort((a, b) => (b.def || 0) - (a.def || 0))[0] || null

  hero.loadout.head = ARMORY_ITEMS
    .filter(i => i.slot === 'head' && canJobEquipItem(job, i))
    .sort((a, b) => (b.def || 0) - (a.def || 0))[0] || null

  hero.loadout.body = ARMORY_ITEMS
    .filter(i => i.slot === 'body' && canJobEquipItem(job, i))
    .sort((a, b) => (b.def || 0) - (a.def || 0))[0] || null

  hero.loadout.accessory = ARMORY_ITEMS
    .filter(i => i.slot === 'accessory' && canJobEquipItem(job, i))[0] || null

  message.success(`已为【${hero.name}】智能匹配最优神装！`)
}

// 清空角色配装
const clearHeroLoadout = (hero: HeroModel) => {
  hero.loadout.weapon = null
  hero.loadout.offhand = null
  hero.loadout.head = null
  hero.loadout.body = null
  hero.loadout.accessory = null
  message.info(`已清空【${hero.name}】的所有装备。`)
}

// 全队一键神装配置
const applyOptimalLoadoutForAll = () => {
  heroes.value.forEach(h => applyOptimalLoadoutForHero(h))
  message.success('已完成光暗全队 9 大同伴的一键最强神兵搭载配置！')
}

// ================= 立绘与全息规格检查弹窗 =================
const inspectModalVisible = ref(false)
const inspectItem = ref<ArmoryItem | null>(null)

const openItemInspector = (item: ArmoryItem) => {
  inspectItem.value = item
  inspectModalVisible.value = true
}

// ================= 数值演算引擎 (支持多角色真实潜能与动态加成) =================
const computeHeroStats = (hero: HeroModel) => {
  const lvl = hero.level
  const base = hero.baseStats

  // 装备加成汇总
  const items = Object.values(hero.loadout).filter(Boolean) as ArmoryItem[]
  const bonus = items.reduce((acc, item) => {
    acc.atk += item.atk || 0
    acc.def += item.def || 0
    acc.mdef += item.mdef || 0
    acc.str += item.str || 0
    acc.agi += item.agi || 0
    acc.vit += item.vit || 0
    acc.mag += item.mag || 0
    acc.spr += item.spr || 0
    acc.luck += item.luck || 0
    acc.hp += item.hpBonus || 0
    acc.mp += item.mpBonus || 0
    acc.evasion += item.evasion || 0
    acc.meleeEvasion += item.meleeEvasion || 0
    return acc
  }, { atk: 0, def: 0, mdef: 0, str: 0, agi: 0, vit: 0, mag: 0, spr: 0, luck: 0, hp: 0, mp: 0, evasion: 0, meleeEvasion: 0 })

  // 六维属性
  const str = Math.round(base.str + lvl * 1.8) + bonus.str
  const agi = Math.round(base.agi + lvl * 1.6) + bonus.agi
  const vit = Math.round(base.vit + lvl * 1.7) + bonus.vit
  const mag = Math.round(base.mag + lvl * 1.9) + bonus.mag
  const spr = Math.round(base.spr + lvl * 1.6) + bonus.spr
  const luck = Math.round(base.luck + lvl * 1.2) + bonus.luck

  const hp = Math.round(150 + lvl * 52 + vit * 2.8 * (lvl / 8)) + bonus.hp
  const mp = Math.round(40 + lvl * 18 + mag * 1.8 * (lvl / 10)) + bonus.mp

  const patk = Math.round(str * 2.2 + bonus.atk)
  const pdef = Math.round(vit * 1.2 + bonus.def)
  const mdef = Math.round(spr * 1.3 + bonus.mdef)

  const physicalEvasion = bonus.evasion
  const meleeEvasion = bonus.meleeEvasion

  const powerRating = patk * 2 + pdef * 2 + Math.round(hp / 3) + Math.round(mp / 2) + Math.round(physicalEvasion * 5)

  return {
    str, agi, vit, mag, spr, luck,
    hp, mp, patk, pdef, mdef,
    physicalEvasion, meleeEvasion,
    powerRating,
    hpDelta: bonus.hp,
    mpDelta: bonus.mp,
    atkDelta: bonus.atk,
    defDelta: bonus.def,
    mdefDelta: bonus.mdef,
    evasionDelta: bonus.evasion,
    meleeEvasionDelta: bonus.meleeEvasion
  }
}

// 当前激活角色的计算结果
const activeHeroStats = computed(() => {
  return computeHeroStats(activeHero.value)
})

// 获取任意角色的战力总评
const getHeroPowerRating = (hero: HeroModel) => {
  return computeHeroStats(hero).powerRating
}

// 当前激活角色的共鸣特效
const activeHeroSpecialPassives = computed(() => {
  const items = Object.values(activeHero.value.loadout).filter(Boolean) as ArmoryItem[]
  const passives: string[] = []
  items.forEach(i => {
    if (i.specialPassives) {
      passives.push(...i.specialPassives)
    }
  })
  return Array.from(new Set(passives))
})

// ================= 结构化拒绝原因转译字典 (对齐 Godot equipment_comparison.gd) =================
const REASON_TEXT: Record<string, string> = {
  unverifiable: '当前人物、装备或属性资料无法可靠核实。',
  not_owned: '背包中没有可用于此比较的候选装备。',
  slot_mismatch: '候选装备与所选槽位不匹配。',
  offhand_conflict: '当前副手装备与此槽位操作冲突。',
  dual_wield_requirements: '当前双持资格或左右手组合不满足要求。',
  two_hand_conflict: '当前双手武器不能同时装备盾牌。',
  special_requirements: '此特殊武器的角色、组合或来源要求未通过核验。',
  personal_requirements: '此专属装备的角色与来源要求未通过核验。',
  relic_requirements: '此遗物的角色与使用要求未通过核验。',
  job_restricted: '当前职业不满足候选装备的职业限制。'
}

// 针对激活角色当前检视装备的前后换装对比推演 (同步 Godot 最新 equipment_comparison.gd 算法)
const activeHeroEquipmentComparison = computed(() => {
  if (!inspectItem.value) return null
  const hero = activeHero.value
  const item = inspectItem.value
  const slot = item.slot

  // 1. 换装前当前属性
  const beforeStats = computeHeroStats(hero)

  // 2. 结构化拒绝原因判定 (对齐 equipment_comparison.gd 严苛防空与门禁规范)
  // 2.1 遗物槽位受限 (relic_requirements)
  if ((item.id === 'relic_ribbon_v1' || item.id === '2111' || item.name.includes('缎带')) && slot !== 'head' && slot !== 'accessory') {
    return {
      status: 'unavailable',
      reason: 'relic_requirements',
      reasonText: REASON_TEXT.relic_requirements,
      before: beforeStats,
      after: beforeStats,
      delta: { patk: 0, pdef: 0, mdef: 0, hp: 0, mp: 0, physicalEvasion: 0, meleeEvasion: 0, powerRating: 0 }
    }
  }

  // 2.2 角色专属装备受限 (personal_requirements)
  if ((item.id === 'sarah_shield' || item.id === '2122' || item.name.includes('神圣盾')) && hero.id !== 'sarah') {
    return {
      status: 'unavailable',
      reason: 'personal_requirements',
      reasonText: REASON_TEXT.personal_requirements,
      before: beforeStats,
      after: beforeStats,
      delta: { patk: 0, pdef: 0, mdef: 0, hp: 0, mp: 0, physicalEvasion: 0, meleeEvasion: 0, powerRating: 0 }
    }
  }

  // 2.3 职业装备限制受限 (job_restricted)
  if (!canJobEquipItem(hero.jobId, item)) {
    return {
      status: 'unavailable',
      reason: 'job_restricted',
      reasonText: REASON_TEXT.job_restricted,
      before: beforeStats,
      after: beforeStats,
      delta: { patk: 0, pdef: 0, mdef: 0, hp: 0, mp: 0, physicalEvasion: 0, meleeEvasion: 0, powerRating: 0 }
    }
  }

  // 2.4 双手武器与副手盾牌冲突 (two_hand_conflict)
  if ((item as any).isTwoHanded && hero.loadout.offhand) {
    return {
      status: 'unavailable',
      reason: 'two_hand_conflict',
      reasonText: REASON_TEXT.two_hand_conflict,
      before: beforeStats,
      after: beforeStats,
      delta: { patk: 0, pdef: 0, mdef: 0, hp: 0, mp: 0, physicalEvasion: 0, meleeEvasion: 0, powerRating: 0 }
    }
  }

  // 3. 模拟换上候选装备后的属性 (ready 就绪)
  const simulatedLoadout = { ...hero.loadout, [slot]: item }
  const simulatedHero: HeroModel = {
    ...hero,
    loadout: simulatedLoadout
  }
  const afterStats = computeHeroStats(simulatedHero)

  return {
    status: 'ready',
    reason: '',
    reasonText: '',
    before: beforeStats,
    after: afterStats,
    delta: {
      patk: afterStats.patk - beforeStats.patk,
      pdef: afterStats.pdef - beforeStats.pdef,
      mdef: afterStats.mdef - beforeStats.mdef,
      hp: afterStats.hp - beforeStats.hp,
      mp: afterStats.mp - beforeStats.mp,
      physicalEvasion: afterStats.physicalEvasion - beforeStats.physicalEvasion,
      meleeEvasion: afterStats.meleeEvasion - beforeStats.meleeEvasion,
      powerRating: afterStats.powerRating - beforeStats.powerRating
    }
  }
})

const getDeltaClass = (delta: number) => {
  if (delta > 0) return 'text-amber-400 font-bold'
  if (delta < 0) return 'text-slate-400'
  return 'text-gray-500'
}

const formatDelta = (delta: number) => {
  if (delta > 0) return `▲ +${delta}`
  if (delta < 0) return `▼ ${delta}`
  return '—'
}

const formatPercent = (val: number) => {
  return `${Number(val || 0).toFixed(2)}%`
}

const formatEvasionDelta = (delta: number) => {
  const pts = Math.abs(delta).toFixed(2)
  if (Math.abs(delta) < 0.001) return '0.00% ＝'
  return delta > 0 ? `▲ +${pts}%` : `▼ -${pts}%`
}

const getEvasionDeltaClass = (delta: number) => {
  if (Math.abs(delta) < 0.001) return 'text-slate-400 font-mono'
  return delta > 0 ? 'text-amber-400 font-bold font-mono' : 'text-slate-400 font-mono'
}

// 初始化默认配置：给纳哈特装配诸神之黄昏，给黎川装配勇者之剑
onMounted(() => {
  const nahart = heroes.value.find(h => h.id === 'nahart')
  if (nahart) {
    applyOptimalLoadoutForHero(nahart)
  }
  const liChuan = heroes.value.find(h => h.id === 'li_chuan')
  if (liChuan) {
    applyOptimalLoadoutForHero(liChuan)
  }
})

// ================= 二刀流双持双武法则与源氏护手验算工坊 (dual_wield_rules.gd) =================
const dwFlagTeaching = ref(false)
const dwJobMastery = ref(false)
const dwHasGenjiGlove = ref(true)

const dwMainhandWeapon = ref('2005') // 正宗
const dwOffhandWeapon = ref('2004') // 佐助之刃
const dwShield = ref('') // 盾牌

const dwMainhandOptions = [
  { label: '2005: 正宗 (ATK +150 · 先制攻击 · WEAPONS白名单)', value: '2005' },
  { label: '2004: 佐助之刃 (ATK +99 · 敏捷+5 · WEAPONS白名单)', value: '2004' },
  { label: '2003: 符文之刃 (ATK +50 · 魔力+3 · WEAPONS白名单)', value: '2003' },
  { label: '2053: 菊一文字 (ATK +88 · 暴击+15% · WEAPONS白名单)', value: '2053' },
  { label: '2105: 与一之弓 (ATK +110 · 双手持用 · 互斥双手武器)', value: '2105' }
]

const dwOffhandOptions = [
  { label: '2004: 佐助之刃 (ATK +99 · WEAPONS白名单)', value: '2004' },
  { label: '2053: 菊一文字 (ATK +88 · WEAPONS白名单)', value: '2053' },
  { label: '2003: 符文之刃 (ATK +50 · WEAPONS白名单)', value: '2003' },
  { label: '2005: 正宗 (ATK +150 · WEAPONS白名单)', value: '2005' },
  { label: '（空槽）不配置副手武器', value: '' }
]

const dwShieldOptions = [
  { label: '（无盾牌）副手未持盾 (允许双持)', value: '' },
  { label: '2081: 源氏之盾 (DEF +45 · 物理格挡 · 互斥二刀流)', value: '2081' },
  { label: '2082: 圣王之盾 (DEF +60 · 全属性耐性 · 互斥二刀流)', value: '2082' }
]

const weaponAtkMap: Record<string, number> = {
  '2003': 50,
  '2004': 99,
  '2005': 150,
  '2053': 88,
  '2105': 110
}

const dwMainAtk = computed(() => weaponAtkMap[dwMainhandWeapon.value] || 0)
const dwOffAtk = computed(() => weaponAtkMap[dwOffhandWeapon.value] || 0)
const dwShieldDef = computed(() => dwShield.value === '2081' ? 45 : dwShield.value === '2082' ? 60 : 0)

const isDwEligible = computed(() => {
  return dwFlagTeaching.value || dwJobMastery.value || dwHasGenjiGlove.value
})

const isDualWieldActive = computed(() => {
  if (!isDwEligible.value) return false
  if (dwMainhandWeapon.value === '2105') return false // 双手武器互斥
  if (dwShield.value !== '') return false // 盾牌互斥
  const DW_WEAPONS = ['2003', '2004', '2005', '2053']
  return DW_WEAPONS.includes(dwMainhandWeapon.value) && DW_WEAPONS.includes(dwOffhandWeapon.value)
})

const dwVerdictText = computed(() => {
  if (dwMainhandWeapon.value === '2105') {
    return '🚫 双手武器冲突：与一之弓 (2105) 占用双手，禁止副手武器与盾牌'
  }
  if (dwShield.value !== '') {
    return '🚫 盾牌互斥冲突：副手槽位已被盾牌占用 (two_hand_conflict)'
  }
  if (!isDwEligible.value) {
    return '🔒 资格未达成：需忍者教学旗标、精通被动或源氏护手 (relic_requirements)'
  }
  if (!dwOffhandWeapon.value) {
    return '⚪ 单手持用中：副手未装配武器，按常规单持结算'
  }
  if (isDualWieldActive.value) {
    return '✅ 二刀流激活：主副手双武出鞘，支持独立双挥追击！'
  }
  return '⚠️ 装备受阻：非二刀流白名单武器'
})

const dwTraceLog = computed(() => {
  const logs: string[] = []
  const sources: string[] = []
  if (dwFlagTeaching.value) sources.push('忍者教学旗')
  if (dwJobMastery.value) sources.push('忍者职业精通')
  if (dwHasGenjiGlove.value) sources.push('源氏护手佩戴')
  logs.push(`资格审查: ${sources.length > 0 ? sources.join(' + ') : '无有效双持资格'}`)
  if (dwMainhandWeapon.value === '2105') {
    logs.push('拦截: 主手 2105 属性为双手武器，offhand_conflict 成立')
  } else if (dwShield.value) {
    logs.push(`拦截: shield=\'${dwShield.value}\'，副手武器原槽封存禁用`)
  } else if (isDualWieldActive.value) {
    logs.push(`就绪: 主手[${dwMainhandWeapon.value}] + 副手[${dwOffhandWeapon.value}] 符合 WEAPONS 契约，双挥激活`)
  }
  logs.push(`入档保全: dual_wield_format_version = 1.0, 槽位变更不退包`)
  return logs
})

const resetDualWieldStudio = () => {
  dwFlagTeaching.value = false
  dwJobMastery.value = false
  dwHasGenjiGlove.value = true
  dwMainhandWeapon.value = '2005'
  dwOffhandWeapon.value = '2004'
  dwShield.value = ''
}

// ================= 十一大封印神兵解封契约与战时追加追击验算工坊 (sealed_weapon_rules.gd / sealed_weapon_battle.gd) =================
const selectedSealedWeaponId = ref('2106') // 默认烈焰魔剑
const sealedAttackKind = ref<'normal' | 'jump'>('normal')
const hasOffhandWeaponEquipped = ref(false)
const hasShieldEquipped = ref(false)
const isSealedSilenced = ref(false)
const isMagicLocked = ref(false)
const sealedSequenceCounter = ref(1)

const sealedWeaponSelectOptions = [
  { label: '2106: 烈焰魔剑 (普攻 33% 追击 米西迪亚爆炎 威力240)', value: '2106' },
  { label: '2104: 神圣飞枪 (跳跃 33% 追击 圣光奇迹 威力240)', value: '2104' },
  { label: '2109: 大地之锤 (普攻 25% 追击 全域地震 威力180 AOE)', value: '2109' },
  { label: '2110: 刺客短刃 (普攻 25% 斩杀即死收割)', value: '2110' },
  { label: '2105: 与一之弓 (ATK+110 · 双手持用 · 禁副手盾牌)', value: '2105' },
  { label: '2100: 石板圣剑 (ATK+140 · 骑士王权神圣之刃)', value: '2100' },
  { label: '2101: 贤者之杖 (MATK+95 · 战时使用战复阵亡队友)', value: '2101' },
  { label: '2107: 封印魔导书 (神圣系法术威力倍率 x1.5)', value: '2107' },
  { label: '2108: 阿波罗之竖琴 (黑魔法全元素威力倍率 x1.5)', value: '2108' }
]

const sealedAttackKindOptions = [
  { label: '🗡️ 普通攻击 (Kind: normal)', value: 'normal' },
  { label: '🪂 龙骑士跳跃落地 (Kind: jump)', value: 'jump' }
]

const isSealedWeaponEligible = computed(() => {
  // 规则 1: 必须为封印武器
  const SEALED_IDS = ['2100', '2101', '2102', '2103', '2104', '2105', '2106', '2107', '2108', '2109', '2110']
  if (!SEALED_IDS.includes(selectedSealedWeaponId.value)) return false
  // 规则 2: 不在二刀流白名单，若佩戴副手武器直接失效
  if (hasOffhandWeaponEquipped.value) return false
  // 规则 3: 双手持弓 (2105) 互斥盾牌
  if (selectedSealedWeaponId.value === '2105' && hasShieldEquipped.value) return false
  return true
})

const sealedWeaponChaseChanceText = computed(() => {
  if (!isSealedWeaponEligible.value) return '0% (装备互斥受阻)'
  if (isSealedSilenced.value || isMagicLocked.value) {
    if (selectedSealedWeaponId.value === '2110') {
      return '25% (物理即死不吃沉默)'
    }
    return '0% (受沉默/禁魔压制)'
  }
  if (selectedSealedWeaponId.value === '2104') {
    return sealedAttackKind.value === 'jump' ? '33% (落地触发)' : '0% (仅跳跃落地生效)'
  }
  if (selectedSealedWeaponId.value === '2106') {
    return sealedAttackKind.value === 'normal' ? '33% (普攻触发)' : '0% (仅普攻生效)'
  }
  if (selectedSealedWeaponId.value === '2109') {
    return sealedAttackKind.value === 'normal' ? '25% (普攻AOE触发)' : '0% (仅普攻生效)'
  }
  if (selectedSealedWeaponId.value === '2110') {
    return sealedAttackKind.value === 'normal' ? '25% (普攻即死触发)' : '0% (仅普攻生效)'
  }
  return '无战时追击动作 (常驻特质/战复使用)'
})

interface SealedAttackResult {
  summary: string
  chaseSuccess: boolean
  physDamage: number
  physDesc: string
  chaseDamageText: string
  chaseDesc: string
  targetDefeated: boolean
  targetStatusDesc: string
}

const lastSealedAttackResult = ref<SealedAttackResult | null>(null)
const sealedTraceLogs = ref<string[]>([
  '系统就绪: sealed_weapon_rules.gd 与 sealed_weapon_battle.gd 契约完成加载',
  '契约守卫: 11件法定神兵白名单 (2100~2110) 独占数字身份，严禁双持，一次性单凭证消费'
])

const executeSealedAttack = () => {
  sealedSequenceCounter.value += 1
  const currentSeq = sealedSequenceCounter.value

  if (!isSealedWeaponEligible.value) {
    let reason = '资格校验失败'
    if (hasOffhandWeaponEquipped.value) reason = '检测到副手武器装备！封印神兵非双持白名单，资格已驳回'
    if (selectedSealedWeaponId.value === '2105' && hasShieldEquipped.value) reason = '与一之弓属于双手武器，副手佩盾导致生效驳回'
    
    sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 拦截: ${reason} (RULES.item_id 返回 0)`)
    lastSealedAttackResult.value = {
      summary: '神兵未就绪 / 装备冲突',
      chaseSuccess: false,
      physDamage: 0,
      physDesc: '装备互斥导致物理伤害未有效输出',
      chaseDamageText: '0 DMG',
      chaseDesc: '由于装备违规，神兵追击被底层安全门禁完全熔断',
      targetDefeated: false,
      targetStatusDesc: '敌方安然无恙'
    }
    return
  }

  // 1. 第一段：基础物理命中
  const basePhys = Math.floor(Math.random() * 80) + 320
  let chaseSuccess = false
  let chaseDamageText = '未触发'
  let chaseDesc = '概率判定未通过或动作模式不符'
  let targetDefeated = false
  let targetStatusDesc = '受到常规物理创伤'

  // 2. 第二段：追击判定
  const roll = Math.random()

  if (selectedSealedWeaponId.value === '2110') {
    // 刺客短刃：普攻 25% 斩杀
    if (sealedAttackKind.value === 'normal') {
      if (roll < 0.25) {
        chaseSuccess = true
        chaseDamageText = '9999 (EXECUTE)'
        chaseDesc = '刺客短刃【斩杀即死】生效！绕过阵型减半直接破除生命'
        targetDefeated = true
        targetStatusDesc = '被即死收割瞬间致命斩杀'
        sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 刺客短刃(2110): 即死触发成功！(Roll=${(roll * 100).toFixed(1)}% < 25%)，敌人已被直接收割`)
      } else {
        chaseDesc = `即死率 25% 未命中 (Roll=${(roll * 100).toFixed(1)}%)`
        sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 刺客短刃(2110): 普攻完成，即死判定未命中`)
      }
    } else {
      chaseDesc = '刺客短刃仅在 normal 普攻动作下判定即死'
    }
  } else if (isSealedSilenced.value || isMagicLocked.value) {
    chaseDesc = '角色处于沉默或战场禁魔状态，装备魔法追击被严格熔断 (0 MP 亦遵守沉默法则)'
    sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 追击熔断: actor.magic_locked || actor.has_status("silence") 成立，拒绝触发`)
  } else if (selectedSealedWeaponId.value === '2106') {
    // 烈焰魔剑：普攻 33% 米西迪亚爆炎
    if (sealedAttackKind.value === 'normal') {
      if (roll < 0.33) {
        chaseSuccess = true
        const magDmg = Math.floor(Math.random() * 120) + 680
        chaseDamageText = `${magDmg} DMG (米西迪亚爆炎)`
        chaseDesc = '烈焰魔剑共鸣：追加 0 MP 米西迪亚爆炎 (Power 240, Fire)'
        targetDefeated = (basePhys + magDmg) > 850
        targetStatusDesc = targetDefeated ? '两段合计输出过载，目标已解体' : '受到猛烈火系追击烧灼'
        sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 烈焰魔剑(2106): 追击成功！(Roll=${(roll * 100).toFixed(1)}% < 33%) -> 米西迪亚爆炎 ${magDmg} 点伤害`)
      } else {
        chaseDesc = `追击率 33% 未命中 (Roll=${(roll * 100).toFixed(1)}%)`
        sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 烈焰魔剑(2106): 普攻命中，爆炎追击判定落空`)
      }
    } else {
      chaseDesc = '烈焰魔剑仅在 normal 普攻动作下追击爆炎'
    }
  } else if (selectedSealedWeaponId.value === '2104') {
    // 神圣飞枪：跳跃 33% 圣光奇迹
    if (sealedAttackKind.value === 'jump') {
      if (roll < 0.33) {
        chaseSuccess = true
        const magDmg = Math.floor(Math.random() * 150) + 720
        chaseDamageText = `${magDmg} DMG (圣光奇迹)`
        chaseDesc = '神圣飞枪共鸣：跳跃落地追加 0 MP 圣光奇迹 (Power 240, Holy)'
        targetDefeated = (basePhys + magDmg) > 850
        targetStatusDesc = targetDefeated ? '圣光穿透目标，当场湮灭' : '受到圣光辉芒轰击'
        sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 神圣飞枪(2104): 跳跃落地追击成功！(Roll=${(roll * 100).toFixed(1)}% < 33%) -> 圣光奇迹 ${magDmg} 点伤害`)
      } else {
        chaseDesc = `跳跃追击率 33% 未命中 (Roll=${(roll * 100).toFixed(1)}%)`
        sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 神圣飞枪(2104): 跳跃落地命中，圣光判定落空`)
      }
    } else {
      chaseDesc = '神圣飞枪仅在 jump 跳跃落地动作下追加圣光'
      sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 神圣飞枪(2104): 当前为常规普攻，圣光奇迹仅在跳跃落地时判定`)
    }
  } else if (selectedSealedWeaponId.value === '2109') {
    // 大地之锤：普攻 25% 全域地震
    if (sealedAttackKind.value === 'normal') {
      if (roll < 0.25) {
        chaseSuccess = true
        const magDmg = Math.floor(Math.random() * 100) + 520
        chaseDamageText = `${magDmg} DMG (全域地震AOE)`
        chaseDesc = '大地之锤共鸣：普攻追加 0 MP 全域地震 (Power 180, Earth AOE全敌波及)'
        targetDefeated = (basePhys + magDmg) > 850
        targetStatusDesc = targetDefeated ? '大地震撼敌阵，首要目标倒地' : '全域敌阵陷入地脉动荡'
        sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 大地之锤(2109): 地震追击成功！(Roll=${(roll * 100).toFixed(1)}% < 25%) -> 全域地震 ${magDmg} 点 AOE 伤害`)
      } else {
        chaseDesc = `地震率 25% 未命中 (Roll=${(roll * 100).toFixed(1)}%)`
        sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 大地之锤(2109): 普攻完成，地震追击落空`)
      }
    } else {
      chaseDesc = '大地之锤仅在 normal 普攻动作下追击地震'
    }
  } else {
    chaseDesc = '当前选中的封印道具为被动增益或主动使用道具 (无自动追击事件)'
    sealedTraceLogs.value.unshift(`[Seq #${currentSeq}] 结算: 武器 ${selectedSealedWeaponId.value} 仅提供面板或专属特质，无追击`)
  }

  // 审计日志维持最大 8 条
  if (sealedTraceLogs.value.length > 8) {
    sealedTraceLogs.value = sealedTraceLogs.value.slice(0, 8)
  }

  lastSealedAttackResult.value = {
    summary: `${selectedSealedWeaponId.value} 动作结算完成 (Seq #${currentSeq})`,
    chaseSuccess,
    physDamage: basePhys,
    physDesc: `普攻基础斩击命中，造成 ${basePhys} 物理伤害`,
    chaseDamageText,
    chaseDesc,
    targetDefeated,
    targetStatusDesc
  }
}

const resetSealedStudio = () => {
  selectedSealedWeaponId.value = '2106'
  sealedAttackKind.value = 'normal'
  hasOffhandWeaponEquipped.value = false
  hasShieldEquipped.value = false
  isSealedSilenced.value = false
  isMagicLocked.value = false
  lastSealedAttackResult.value = null
  sealedTraceLogs.value = [
    '重置完成: 封印神兵推演台回到初始状态',
    '默认装配: 烈焰魔剑 (2106), 普攻动作模式, 双手/盾牌槽位合规'
  ]
}

// ================= 七色彩虹尾巴终极神兵契约与换装投影工坊 (tail_weapon_rules.gd / tail_weapon_projection.gd) =================
const selectedTailWeaponId = ref('2116') // 默认创世之刃
const tailHasOffhandWeapon = ref(false)
const tailHasShield = ref(false)
const tailHeroHp = ref(3200)

const tailWeaponSelectOptions = [
  { label: '2116: 创世之刃 (tail_ultima_blade_v1 · 满血输出 1.5 倍爆发)', value: '2116' },
  { label: '2114: 瓦尔哈拉圣剑 (tail_valhalla_v1 · 圣/暗属性承伤减半 50%)', value: '2114' },
  { label: '2115: 鲜血之枪 (tail_blood_lance_v1 · 攻击命中吸血 30% 转化率)', value: '2115' },
  { label: '2113: 阿克塞尔之旋 (tail_axel_v1 · 投掷高敏捷 · 先手连击)', value: '2113' },
  { label: '2117: 人鱼竖琴 (tail_mermaid_v1 · 歌唱脉冲增幅 · 水系神韵)', value: '2117' },
  { label: '2118: 火箭重锤 (tail_rocket_v1 · 毁灭破甲粉碎 · 削防15%)', value: '2118' },
  { label: '2119: 自动连弩 (tail_autocrossbow_v1 · 双手持用 · 严禁盾牌)', value: '2119' }
]

const tailWeaponData: Record<string, { name: string; atk: number; def: number; spd: number; trait: string; desc: string }> = {
  '2113': { name: '阿克塞尔之旋', atk: 125, def: 10, spd: 18, trait: '高速先手连击', desc: '行动条积累提速 +25%，普攻兼具回旋多段判定' },
  '2114': { name: '瓦尔哈拉圣剑', atk: 145, def: 35, spd: 8, trait: '圣/暗属性减伤 50%', desc: 'element_multipliers[holy/dark] * 0.5 严密抗性覆盖' },
  '2115': { name: '鲜血之枪', atk: 130, def: 15, spd: 10, trait: '鲜血突刺吸血', desc: '每次普攻将造成伤害的 30% 即时转化为生命汲取' },
  '2116': { name: '创世之刃', atk: 180, def: 20, spd: 12, trait: '满生命 1.5x 极致爆发', desc: 'HP == MaxHP 时物理与技能总伤害倍乘 1.5 倍' },
  '2117': { name: '人鱼竖琴', atk: 110, def: 25, spd: 14, trait: '水神韵律脉冲增幅', desc: '吟游曲目脉冲周期加速至 1.2s，全队水抗 +30%' },
  '2118': { name: '火箭重锤', atk: 165, def: 30, spd: 4, trait: '碎甲火箭重击', desc: '无视目标 30% 物理防御，附带强力击退硬直' },
  '2119': { name: '自动连弩', atk: 150, def: 10, spd: 16, trait: '双手占槽·严禁配盾', desc: '多发箭矢齐射，双手持用严格互斥盾牌 (shield != "")' }
}

const isTailWeaponEligible = computed(() => {
  const id = selectedTailWeaponId.value
  const validIds = ['2113', '2114', '2115', '2116', '2117', '2118', '2119']
  if (!validIds.includes(id)) return false
  // 规则 1: 彩尾七件均不在二刀流白名单，严禁配副手武器
  if (tailHasOffhandWeapon.value) return false
  // 规则 2: 自动连弩 (2119) 双手持用，与盾牌互斥
  if (id === '2119' && tailHasShield.value) return false
  return true
})

const tailWeaponSpecialTraitText = computed(() => {
  if (!isTailWeaponEligible.value) return '🚫 契约驳回 (装备槽位冲突)'
  return tailWeaponData[selectedTailWeaponId.value]?.trait || '未知特质'
})

const tailWeaponSpecialDescText = computed(() => {
  if (!isTailWeaponEligible.value) {
    if (tailHasOffhandWeapon.value) return '检测到副手装有武器！彩尾神兵不可双持，特质已熔断'
    if (selectedTailWeaponId.value === '2119' && tailHasShield.value) return '自动连弩需双手操控，检测到副手持盾，契约已失效'
    return '槽位校验未通过'
  }
  return tailWeaponData[selectedTailWeaponId.value]?.desc || ''
})

const tailPowerRating = computed(() => {
  if (!isTailWeaponEligible.value) return 400
  const item = tailWeaponData[selectedTailWeaponId.value]
  if (!item) return 500
  let rating = item.atk * 8 + item.def * 4 + item.spd * 6
  if (selectedTailWeaponId.value === '2116' && tailHeroHp.value === 3200) {
    rating = Math.floor(rating * 1.5)
  }
  return rating
})

interface TailActionResult {
  summary: string
  success: boolean
  statusTag: string
  damage: number
  damageDesc: string
  leechText: string
  leechDesc: string
  hpDeltaDesc: string
}

const lastTailActionResult = ref<TailActionResult | null>(null)
const tailTraceLogs = ref<string[]>([
  '系统就绪: tail_weapon_rules.gd 与 tail_weapon_projection.gd 契约完成加载',
  '契约守卫: 7件法定彩尾白名单 (2113~2119) 独占数字身份，动态重算装备份额不丢本场状态'
])

const executeTailBattleAction = () => {
  const id = selectedTailWeaponId.value
  const item = tailWeaponData[id]

  if (!isTailWeaponEligible.value) {
    let reason = '槽位互斥驳回'
    if (tailHasOffhandWeapon.value) reason = 'offhand_weapon != "" 成立，彩尾神兵拒绝双持'
    if (id === '2119' && tailHasShield.value) reason = '自动连弩检测到 shield != ""，双手武器禁盾'

    tailTraceLogs.value.unshift(`[换装拦截] ${reason} (RULES.item_id 返回 0)`)
    lastTailActionResult.value = {
      summary: `${item?.name || id} 装备违规`,
      success: false,
      statusTag: '装备槽位冲突',
      damage: 0,
      damageDesc: '由于槽位互斥，未能发挥彩尾神兵战力',
      leechText: '0 (INACTIVE)',
      leechDesc: '特性已被底层安全门禁完全抑制',
      hpDeltaDesc: '生命值无变动'
    }
    return
  }

  // 基础伤害计算
  let baseDmg = item.atk * 3 + Math.floor(Math.random() * 60)
  let leechText = '无生命汲取'
  let leechDesc = '当前武器非吸血特质'
  let hpDeltaDesc = '生命值保持稳定'

  if (id === '2116') {
    // 创世之刃：满血 1.5 倍爆发
    if (tailHeroHp.value === 3200) {
      baseDmg = Math.floor(baseDmg * 1.5)
      leechText = '🌟 满血创世 1.5x'
      leechDesc = '创世特质爆发：满血状态激活 150% 终极威力修正！'
      tailTraceLogs.value.unshift(`[创世爆发] 创世之刃(2116): 满血检测通过 (3200/3200)，输出拉升至 ${baseDmg} DMG`)
    } else {
      leechText = '普通输出 (残血)'
      leechDesc = `当前 HP ${tailHeroHp.value} < 3200，未能激活 1.5x 满血爆发`
      tailTraceLogs.value.unshift(`[普通挥击] 创世之刃(2116): 造成常规 ${baseDmg} DMG`)
    }
  } else if (id === '2115') {
    // 鲜血之枪：吸血 30%
    const leechAmount = Math.floor(baseDmg * 0.3)
    const oldHp = tailHeroHp.value
    tailHeroHp.value = Math.min(3200, tailHeroHp.value + leechAmount)
    leechText = `💚 +${leechAmount} 吸血回复`
    leechDesc = `鲜血之枪吸血转化：造成 ${baseDmg} 伤害并汲取 30% 生命`
    hpDeltaDesc = `汲取回复: ${oldHp} ➔ ${tailHeroHp.value} HP`
    tailTraceLogs.value.unshift(`[鲜血吸取] 鲜血之枪(2115): 命中造成 ${baseDmg} 伤害，回血 +${leechAmount} HP`)
  } else if (id === '2114') {
    leechText = '🛡️ 圣/暗抗性 0.5x'
    leechDesc = '瓦尔哈拉圣剑常驻：holy/dark 元素承伤降低 50%'
    tailTraceLogs.value.unshift(`[圣王庇护] 瓦尔哈拉圣剑(2114): 造成 ${baseDmg} 伤害，圣/暗属性抗性维持 50% 减伤`)
  } else if (id === '2119') {
    leechText = '🎯 连弩多发齐射'
    leechDesc = '自动连弩占用双手，倾泻多支强力穿甲弩箭'
    tailTraceLogs.value.unshift(`[连弩齐射] 自动连弩(2119): 双手持用齐射命中，造成 ${baseDmg} 伤害`)
  } else {
    leechText = `✨ ${item.trait}`
    leechDesc = item.desc
    tailTraceLogs.value.unshift(`[神兵共鸣] ${item.name}(${id}): 命中输出 ${baseDmg} 物理伤害`)
  }

  // 审计日志维持最大 8 条
  if (tailTraceLogs.value.length > 8) {
    tailTraceLogs.value = tailTraceLogs.value.slice(0, 8)
  }

  lastTailActionResult.value = {
    summary: `${item.name} (${id}) 动作执行完毕`,
    success: true,
    statusTag: '契约共鸣有效',
    damage: baseDmg,
    damageDesc: `主手输出完成，差额投影到 actor 战斗实例`,
    leechText,
    leechDesc,
    hpDeltaDesc
  }
}

const resetTailStudio = () => {
  selectedTailWeaponId.value = '2116'
  tailHasOffhandWeapon.value = false
  tailHasShield.value = false
  tailHeroHp.value = 3200
  lastTailActionResult.value = null
  tailTraceLogs.value = [
    '重置完成: 彩尾神兵推演台回到初始状态',
    '默认装配: 创世之刃 (2116), 满生命 3200/3200, 槽位合规'
  ]
}

// ================= 五大主角本命神兵契约与角色专属验算工坊 (personal_equipment_rules.gd / personal_equipment_projection.gd) =================
const selectedPersonalHeroId = ref('nahart')
const selectedPersonalItemId = ref('2120')
const personalHasOffhandWeapon = ref(false)
const personalHasTwoHandWeapon = ref(false)

const personalHeroSelectOptions = [
  { label: '纳哈特 (nahart · 骑士领袖)', value: 'nahart' },
  { label: '塞拉 (sera · 白魔法师)', value: 'sera' },
  { label: '埃癸斯 (aegis · 铁壁守护者)', value: 'aegis' },
  { label: '格雷夫 (grave · 影刃游侠)', value: 'grave' },
  { label: '索尔 (sol · 创世黑魔导)', value: 'sol' }
]

const personalItemSelectOptions = [
  { label: '2120: 诸神黄昏 (Ragnarok · 纳哈特专属神剑 · ATK+160)', value: '2120' },
  { label: '2121: 涅槃之杖 (Nirvana · 塞拉专属神杖 · 治疗MP减半)', value: '2121' },
  { label: '2122: 埃癸斯神盾 (Aegis Shield · 埃癸斯专属盾 · DEF+80 MDEF+60)', value: '2122' },
  { label: '2123: 飞龙魔爪 (Wyvern Claws · 格雷夫专属爪 · ATK+135 SPD+25)', value: '2123' },
  { label: '2124: 终焉法球 (Sol Ultima · 索尔专属法器 · MATK+175)', value: '2124' }
]

const PERSONAL_OWNERS: Record<string, string> = {
  '2120': 'nahart',
  '2121': 'sera',
  '2122': 'aegis',
  '2123': 'grave',
  '2124': 'sol'
}

const personalItemMeta: Record<string, { name: string; ownerName: string; slot: string; statDelta: string; trait: string; desc: string }> = {
  '2120': {
    name: '诸神黄昏 (Ragnarok)',
    ownerName: '纳哈特',
    slot: 'weapon',
    statDelta: 'ATK +160 · DEF +20 · 暴击+25%',
    trait: '光之破晓 (Dawn Break)',
    desc: '战士王权神剑，普攻伴随光芒斩击，具备更高倍率破防'
  },
  '2121': {
    name: '涅槃之杖 (Nirvana)',
    ownerName: '塞拉',
    slot: 'weapon',
    statDelta: 'MATK +140 · MDEF +30 · 精神+25',
    trait: '慈悲回响 (50% MP 减半)',
    desc: '对友方释放治愈与复活系白魔法时，所消耗 MP 永久减半'
  },
  '2122': {
    name: '埃癸斯神盾 (Aegis Shield)',
    ownerName: '埃癸斯',
    slot: 'shield',
    statDelta: 'DEF +80 · MDEF +60 · 全抗性+15%',
    trait: '铁壁守卫 (Aegis Guard)',
    desc: '专属装配于副手盾牌槽位，受到致死打击时触发一次神盾庇护'
  },
  '2123': {
    name: '飞龙魔爪 (Wyvern Claws)',
    ownerName: '格雷夫',
    slot: 'weapon',
    statDelta: 'ATK +135 · SPD +25 · 敏捷+20',
    trait: '影袭双裂 (Shadow Claws)',
    desc: '普攻具备额外双段爪痕判定，偷盗成功率大幅拉升'
  },
  '2124': {
    name: '终焉法球 (Sol Ultima)',
    ownerName: '索尔',
    slot: 'weapon',
    statDelta: 'MATK +175 · MP +100 · 智力+30',
    trait: '终焉湮灭 (Ultima Flare)',
    desc: '全元素高级黑魔法威力上浮 30%，施法硬直缩短'
  }
}

const isPersonalEligible = computed(() => {
  const item = selectedPersonalItemId.value
  const hero = selectedPersonalHeroId.value
  // 规则 1: 必须为专属合法持有者 OWNERS[item] == hero
  if (PERSONAL_OWNERS[item] !== hero) return false
  // 规则 2: 严禁副手武器 (offhand_weapon != "")
  if (personalHasOffhandWeapon.value) return false
  // 规则 3: 2122 埃癸斯盾牌槽位，严禁主手装配双手武器 (2105/2119)
  if (item === '2122' && personalHasTwoHandWeapon.value) return false
  return true
})

const personalEligibilityDesc = computed(() => {
  const item = selectedPersonalItemId.value
  const hero = selectedPersonalHeroId.value
  const expectedOwner = PERSONAL_OWNERS[item]
  const meta = personalItemMeta[item]

  if (expectedOwner !== hero) {
    return `❌ 角色不匹配：该本命神兵唯一归属于【${meta?.ownerName}】，【${hero}】无法共鸣装配`
  }
  if (personalHasOffhandWeapon.value) {
    return '❌ 槽位违规：检测到佩戴副手武器，本命专属神兵严格排斥副手双持'
  }
  if (item === '2122' && personalHasTwoHandWeapon.value) {
    return '❌ 双手武器冲突：埃癸斯神盾装配于副手盾槽，主手持双手武器导致持盾失效'
  }
  return `✨ 契约完全吻合：【${meta?.ownerName}】与【${meta?.name}】达成最高共鸣`
})

const personalResonancePowerRating = computed(() => {
  if (!isPersonalEligible.value) return 300
  const item = selectedPersonalItemId.value
  if (item === '2120') return 1850
  if (item === '2121') return 1680
  if (item === '2122') return 1920
  if (item === '2123') return 1760
  if (item === '2124') return 2040
  return 1500
})

interface PersonalResonanceResult {
  summary: string
  success: boolean
  statusTag: string
  statDeltaText: string
  statDeltaDesc: string
  specialTraitText: string
  specialTraitDesc: string
  slotText: string
  securityDesc: string
}

const lastPersonalResonanceResult = ref<PersonalResonanceResult | null>(null)
const personalTraceLogs = ref<string[]>([
  '系统就绪: personal_equipment_rules.gd 与 projection.gd 契约完成加载',
  '契约守卫: 5件主角本命神兵白名单 (2120~2124) 独占专属权，严拒跨角色冒领'
])

const executePersonalResonance = () => {
  const item = selectedPersonalItemId.value
  const hero = selectedPersonalHeroId.value
  const meta = personalItemMeta[item]
  const eligible = isPersonalEligible.value

  if (!eligible) {
    personalTraceLogs.value.unshift(`[共鸣驳回] 角色 ${hero} 尝试装备 ${item}: ${personalEligibilityDesc.value}`)
    lastPersonalResonanceResult.value = {
      summary: `装备受阻：${hero} 与 ${meta?.name || item} 无法达成契约`,
      success: false,
      statusTag: '契约校验不通过',
      statDeltaText: '+0 (无加成)',
      statDeltaDesc: '契约不符，属性份额未投影到战斗实体',
      specialTraitText: '特权未激活',
      specialTraitDesc: personalEligibilityDesc.value,
      slotText: '槽位封锁',
      securityDesc: 'RULES.allowed() 返回 false，安全门禁生效'
    }
  } else {
    personalTraceLogs.value.unshift(`[本命共鸣] 英雄【${meta.ownerName}】完美激活【${meta.name}】！属性份额已投影`)
    lastPersonalResonanceResult.value = {
      summary: `共鸣成功：${meta.ownerName} 成功唤醒本命神兵`,
      success: true,
      statusTag: '本命契约达成',
      statDeltaText: meta.statDelta,
      statDeltaDesc: '六维平加与专用乘区精准生效 (clampi 0~9999)',
      specialTraitText: meta.trait,
      specialTraitDesc: meta.desc,
      slotText: meta.slot === 'shield' ? '副手盾位 (shield)' : '主手神兵 (weapon)',
      securityDesc: 'personal_runtime_owner 强校验合规，零持久污染'
    }
  }

  // 审计日志维持最大 8 条
  if (personalTraceLogs.value.length > 8) {
    personalTraceLogs.value = personalTraceLogs.value.slice(0, 8)
  }
}

const resetPersonalStudio = () => {
  selectedPersonalHeroId.value = 'nahart'
  selectedPersonalItemId.value = '2120'
  personalHasOffhandWeapon.value = false
  personalHasTwoHandWeapon.value = false
  lastPersonalResonanceResult.value = null
  personalTraceLogs.value = [
    '重置完成: 本命神兵推演台回到初始状态',
    '默认装配: 纳哈特 (nahart) + 诸神黄昏 (2120), 槽位完全合规'
  ]
}

// ==========================================
// 🔮 太古全域神兵附魔符文锻造与词缀洗练工坊 (v2.2.290)
// ==========================================
interface RuneSchool {
  id: string
  name: string
  icon: string
  desc: string
  color: string
  perkTag: string
}

const runeSchoolsList: RuneSchool[] = [
  {
    id: 'solar_flare_glyph',
    name: '烈阳核爆烈焰符文',
    icon: '☀️',
    desc: '火属物理与魔法暴击倍率 +45%，攻击附带绝对真炎灼烧',
    color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
    perkTag: '暴击 +45% / 真炎灼烧'
  },
  {
    id: 'glacier_frost_ward',
    name: '冰河永冻守护符文',
    icon: '❄️',
    desc: '全元素抗性提升 +30%，格挡时反噬寒冰减速目标行动',
    color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    perkTag: '抗性 +30% / 极寒反噬'
  },
  {
    id: 'tempest_arc_rune',
    name: '风暴疾电神速符文',
    icon: '⚡',
    desc: '行动条 ATB 充能速度 +35%，全技能无视敌人 20% 防御',
    color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300',
    perkTag: 'ATB +35% / 无视防御 20%'
  },
  {
    id: 'void_annihilation_sigil',
    name: '虚空湮灭死星符印',
    icon: '🌌',
    desc: '击破单次 99,999 伤害天花板，真实伤害转化率提高 50%',
    color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
    perkTag: '突破 99999 / 真实转化 50%'
  }
]

const selectedRuneSchoolId = ref('solar_flare_glyph')
const runeRefineLevel = ref(8)
const affixSynergyRatio = ref(125)
const aetherPurityRating = ref(85)
const resonanceHarmonics = ref(2.2)

const antiExplosionWard = ref(true)
const perfectAffixLock = ref(true)
const transcendenceCapBreaker = ref(false)

const activeGdRuneTab = ref<'enchant' | 'reforge' | 'harmonics'>('enchant')

const currentRuneSchoolObj = computed(() => {
  return runeSchoolsList.find(r => r.id === selectedRuneSchoolId.value) || runeSchoolsList[0]
})

const calculatedRefinedAttackPower = computed(() => {
  const base = runeRefineLevel.value * 85 + affixSynergyRatio.value * 4.2
  const total = base * (aetherPurityRating.value / 100) * resonanceHarmonics.value
  return Math.round(total)
})

const calculatedCritDamageMultiplier = computed(() => {
  let mult = 150 + runeRefineLevel.value * 12.5 * (affixSynergyRatio.value / 100)
  if (selectedRuneSchoolId.value === 'solar_flare_glyph') {
    mult += 45
  }
  return `+${Math.round(mult)}%`
})

const calculatedReforgeSuccessChance = computed(() => {
  let chance = 100 - (runeRefineLevel.value * 5.5) + (aetherPurityRating.value * 0.3)
  if (antiExplosionWard.value) {
    chance += 15
  }
  const clamped = Math.min(99, Math.max(10, Math.round(chance)))
  return `${clamped}%`
})

const calculatedRuneTier = computed(() => {
  if (runeRefineLevel.value >= 12) return 'EX 极境太古神器'
  if (runeRefineLevel.value >= 8) return 'SSR 宗师淬炼'
  return 'SR 精良符文'
})

function scrollToRuneReforgeStudio() {
  const el = document.getElementById('rune-reforge-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// 五阶段推演终端
interface RuneTerminalLog {
  time: string
  message: string
  color: string
}

const isRuneSimulating = ref(false)
const runeSimStage = ref(0)
const runeSimFinished = ref(false)
const runeTerminalLogs = ref<RuneTerminalLog[]>([
  {
    time: 'INIT',
    message: '太古神兵附魔符文锻造工坊就绪。准备启动以太熔炉。',
    color: 'text-gray-400'
  }
])

function appendRuneLog(msg: string, color = 'text-purple-400') {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
  runeTerminalLogs.value.push({ time: timeStr, message: msg, color })
}

function runRuneReforgeSimulation() {
  if (isRuneSimulating.value) return
  isRuneSimulating.value = true
  runeSimFinished.value = false
  runeSimStage.value = 1
  appendRuneLog('▶ 启动五阶段神兵符文锻造淬炼程序...', 'text-purple-400 font-bold')

  setTimeout(() => {
    runeSimStage.value = 2
    appendRuneLog(`[阶段 1/5] 载入流派【${currentRuneSchoolObj.value.name}】，初始阶数: +${runeRefineLevel.value} 阶，以太纯净度: ${aetherPurityRating.value}%`, 'text-cyan-300')

    setTimeout(() => {
      runeSimStage.value = 3
      appendRuneLog(`[阶段 2/5] 注入词缀相干度 ${affixSynergyRatio.value}%，谐波同步率 ${resonanceHarmonics.value.toFixed(1)}x`, 'text-amber-300')

      setTimeout(() => {
        runeSimStage.value = 4
        const wardText = antiExplosionWard.value ? '已展开 (防碎防掉阶)' : '未启用'
        const lockText = perfectAffixLock.value ? '已锁定前置极品' : '全量洗练'
        appendRuneLog(`[阶段 3/5] 防爆护身符[${wardText}]，词缀锁定[${lockText}]`, 'text-purple-300')

        setTimeout(() => {
          runeSimStage.value = 5
          appendRuneLog(`[阶段 4/5] 附加攻击力: +${calculatedRefinedAttackPower.value.toLocaleString()} ATK，暴击倍率: ${calculatedCritDamageMultiplier.value}`, 'text-emerald-300')

          setTimeout(() => {
            isRuneSimulating.value = false
            runeSimFinished.value = true
            appendRuneLog(`✓ [阶段 5/5] 符文淬炼大圆满！成功率: ${calculatedReforgeSuccessChance.value}，位阶: ${calculatedRuneTier.value}`, 'text-emerald-400 font-bold')
            message.success('太古神兵符文锻造五阶段推演完成！')
          }, 350)
        }, 350)
      }, 350)
    }, 350)
  }, 350)
}

function exportRuneReforgeCertificate() {
  const certData = {
    standard: 'Godot 4.6 LTS / VBLE Armory Rune Matrix v2.2.290',
    timestamp: new Date().toISOString(),
    school: selectedRuneSchoolId.value,
    parameters: {
      runeRefineLevel: runeRefineLevel.value,
      affixSynergyRatio: affixSynergyRatio.value,
      aetherPurityRating: aetherPurityRating.value,
      resonanceHarmonics: resonanceHarmonics.value,
      antiExplosionWard: antiExplosionWard.value,
      perfectAffixLock: perfectAffixLock.value,
      transcendenceCapBreaker: transcendenceCapBreaker.value
    },
    results: {
      refinedAttackPower: calculatedRefinedAttackPower.value,
      critDamageMultiplier: calculatedCritDamageMultiplier.value,
      reforgeSuccessChance: calculatedReforgeSuccessChance.value,
      runeTier: calculatedRuneTier.value
    },
    sha256Signature: 'SHA256-RUNE-FORGE-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `rune_reforge_v2.2.290_${selectedRuneSchoolId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出太古神兵符文锻造方案书证书！')
}

const gdRuneEnchantEngineCode = `# ==============================================================================
# AncientRelicRuneEnchantmentEngine - 太古神兵符文附魔与数值解算引擎
# 文件路径: res://scripts/armory/ancient_relic_rune_enchantment_engine.gd
# 架构规范: Godot 4.6 LTS / VBLE Armory Matrix v2.2.290
# 核心职责: 计算符文阶数攻击加成、属性伤害倍率与防爆护符生效判定
# ==============================================================================
class_name AncientRelicRuneEnchantmentEngine
extends RefCounted

static func calculate_refined_atk(level: int, synergy: float, purity: float, harmonics: float) -> int:
	var base: float = float(level) * 85.0 + synergy * 4.2
	var total: float = base * (purity / 100.0) * harmonics
	return int(round(total))

static func evaluate_reforge_success(level: int, purity: float, has_anti_explosion: bool) -> float:
	var chance: float = 100.0 - (float(level) * 5.5) + (purity * 0.3)
	if has_anti_explosion:
		chance += 15.0
	return clampf(chance, 10.0, 99.0)
`

const gdAffixReforgeMatrixCode = `# ==============================================================================
# AffixReforgeProbabilityMatrix - 神圣词缀概率洗练与锁定矩阵
# 文件路径: res://scripts/armory/affix_reforge_probability_matrix.gd
# 架构规范: Godot 4.6 LTS / VBLE Armory Matrix v2.2.290
# 核心职责: 管理极品前缀锁定、双词缀破限判定与随机属性池权重抽样
# ==============================================================================
class_name AffixReforgeProbabilityMatrix
extends RefCounted

static func reforge_affix_pool(locked_affix: String, allow_dual: bool) -> Dictionary:
	return {
		"prefix": locked_affix if locked_affix != "" else "solar_crit_boost",
		"suffix": "aether_penetration_20",
		"dual_affix_unlocked": allow_dual,
		"reforge_quality": "SSR"
	}
`

const gdResonanceHarmonicsControllerCode = `# ==============================================================================
# ResonanceHarmonicsController - 全队多主角配装谐波共鸣控制器
# 文件路径: res://scripts/armory/resonance_harmonics_controller.gd
# 架构规范: Godot 4.6 LTS / VBLE Armory Matrix v2.2.290
# 核心职责: 联动 8 大角色配装槽位、跨角色谐波增益计算与本命契约核验
# ==============================================================================
class_name ResonanceHarmonicsController
extends RefCounted

static func compute_party_harmonics(equipped_count: int) -> float:
	return clampf(1.0 + float(equipped_count) * 0.35, 1.0, 4.0)
`

const currentGdRuneCode = computed(() => {
  if (activeGdRuneTab.value === 'enchant') return gdRuneEnchantEngineCode
  if (activeGdRuneTab.value === 'reforge') return gdAffixReforgeMatrixCode
  return gdResonanceHarmonicsControllerCode
})
</script>
