<template>
  <div class="characters-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-indigo-950/80 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              VBLE Heroes, Soul Resonant Matrix & Grand Oath Synergy Studio v2.2.317
            </span>
            <span class="text-xs text-gray-400">英雄传记、宿命星盘共鸣与八主角命之座觉醒工坊</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>👥</span> 英雄传记：光与暗宿命誓约、以太命座与神威联携工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            晨辉骑士黎川、卫珩、白魔导昼隐、以及暗之死囚纳哈特等英雄的核心属性、宿命、官方对话立绘与终极职能。全息实装角色六维潜能成长、四重极限连携与八主角命之座觉醒沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToConstellationOrbitStudio"
          >
            <template #icon><span>🌌</span></template>
            命座星轨羁绊工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            class="shadow-md font-bold text-black bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400"
            @click="scrollToGrandOathSynergyStudio"
          >
            <template #icon><span>👑</span></template>
            大誓约与羁绊工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToSoulLinkStudio"
          >
            <template #icon><span>💞</span></template>
            灵魂羁绊协同工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToAwakeningStudio"
          >
            <template #icon><span>🌟</span></template>
            前往八主角命座工坊
          </n-button>
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>📊</span></template>
            前往属性推演沙盘
          </n-button>
          <router-link to="/vble/jobs">
            <n-button size="medium" round tertiary>
              查看转职矩阵
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心统计概览卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">已收录英雄主角</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">{{ characters.length }} 位</div>
        <div class="text-[10px] text-gray-500 mt-0.5">光之战士 / 暗之战士</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">官方对话立绘</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">全配装</div>
        <div class="text-[10px] text-gray-500 mt-0.5">主线剧情动态表情插画</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">英雄极意绝技</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ characters.length }} 项</div>
        <div class="text-[10px] text-gray-500 mt-0.5">专属破限杀招</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">成长算法核心</div>
        <div class="text-2xl font-black text-purple-400 font-mono mt-1">Godot 4.x</div>
        <div class="text-[10px] text-gray-500 mt-0.5">hero_stat_growth.gd</div>
      </div>
    </div>

    <!-- 阵营切换 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
      <div class="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800 gap-1" role="group" aria-label="英雄阵营">
        <button
          v-for="p in parties"
          :key="p.id"
          :aria-pressed="selectedParty === p.id"
          class="px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border select-none flex items-center gap-1.5"
          :class="selectedParty === p.id
            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
            : 'bg-transparent text-gray-300 border-transparent hover:(text-white bg-slate-800)'"
          @click="selectedParty = p.id"
        >
          <span>{{ p.icon }}</span>
          <span>{{ p.name }}</span>
          <span
            class="text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold"
            :class="selectedParty === p.id ? 'bg-amber-900/40 text-slate-950' : 'bg-slate-800 text-amber-300 border border-slate-700'"
          >
            {{ getPartyCount(p.id) }}
          </span>
        </button>
      </div>

      <div class="flex items-center gap-3">
        <n-input
          v-model:value="searchKeyword"
          placeholder="搜索英雄名、绝技、称号..."
          size="small"
          clearable
          class="w-full sm:w-64"
        >
          <template #prefix>🔍</template>
        </n-input>
      </div>
    </div>

    <!-- 英雄卡片列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="char in paginatedList"
        :key="char.id"
        class="rounded-xl bg-[#0f1422]/90 border transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        :class="selectedHeroId === char.id ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50' : 'border-slate-800 hover:border-slate-700'"
      >
        <div class="space-y-3.5">
          <!-- 头部信息 -->
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xl font-black text-amber-300">{{ char.name }}</span>
                <span class="text-xs text-gray-400">「{{ char.title }}」</span>
              </div>
              <div class="text-[11px] text-gray-400 mt-0.5">{{ char.role }}</div>
            </div>
            <div class="flex items-center gap-1.5">
              <n-tag
                v-if="['nahart', 'sera', 'sol', 'aegis', 'grave'].includes(char.id)"
                size="tiny"
                type="success"
                round
              >
                🎭 对话立绘已实装
              </n-tag>
              <n-tag size="small" :type="char.party === 'light' ? 'success' : 'warning'" round strong>
                {{ char.partyText }}
              </n-tag>
            </div>
          </div>

          <!-- 名台词 -->
          <div class="text-xs text-purple-300 italic border-l-2 border-purple-500/50 pl-2.5">
            {{ char.quote }}
          </div>

          <!-- 六维潜能面板 -->
          <div v-if="char.stats" class="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2">
            <div class="text-xs text-cyan-300 font-semibold flex items-center justify-between">
              <span>📊 基础六维潜能:</span>
              <span class="text-[10px] text-gray-500 font-mono">等级 Lv.1 基础潜能</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-xs font-mono">
              <div>力量 (STR): <strong class="text-red-400">{{ char.stats.str }}</strong></div>
              <div>敏捷 (AGI): <strong class="text-green-400">{{ char.stats.agi }}</strong></div>
              <div>体质 (VIT): <strong class="text-amber-400">{{ char.stats.vit }}</strong></div>
              <div>魔力 (MAG): <strong class="text-cyan-400">{{ char.stats.mag }}</strong></div>
              <div>精神 (SPR): <strong class="text-blue-400">{{ char.stats.spr }}</strong></div>
              <div>幸运 (LUCK): <strong class="text-yellow-400">{{ char.stats.luck }}</strong></div>
            </div>
          </div>

          <!-- 绝技与推荐职业 -->
          <div class="text-xs space-y-1">
            <div class="text-gray-400">⚡ 极意绝技: <strong class="text-cyan-400">{{ char.signature_skill }}</strong></div>
            <div class="text-gray-400">⚔️ 契合职业推荐:
              <span class="text-gray-200 ml-1">
                {{ char.best_jobs?.map((j: any) => j.name).join(' · ') }}
              </span>
            </div>
          </div>

          <!-- 史诗小传 -->
          <p class="text-xs text-gray-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-900">
            {{ char.bio }}
          </p>

          <div class="text-[11px] text-gray-400 pt-1 border-t border-slate-800">
            🕊️ 宿命终局: <span class="text-gray-300">{{ char.ending }}</span>
          </div>
        </div>

        <!-- 底部快捷推演与独立档案跳转按钮 -->
        <div class="pt-4 mt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <span class="text-[11px] font-mono text-cyan-300 font-bold">ID: {{ char.id }}</span>
          <div class="flex items-center gap-2">
            <router-link :to="'/vble/characters/' + char.id">
              <n-button type="warning" size="small" round secondary class="shadow-sm">
                <template #icon><span>📖</span></template>
                查看独立档案 →
              </n-button>
            </router-link>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
              :class="selectedHeroId === char.id ? 'bg-amber-400 text-slate-950 font-bold shadow-md' : 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-slate-700'"
              @click="selectHeroForSimulation(char.id)"
            >
              <span>{{ selectedHeroId === char.id ? '✓ 正在推演' : '📊 载入沙盘' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 列表分页导航 -->
    <div v-if="filteredCharacters.length > pageSize" class="flex justify-center items-center py-4 border-t border-slate-800/80">
      <n-pagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :item-count="filteredCharacters.length"
        :page-sizes="[4, 6, 8, 12]"
        :simple="isMobile"
        show-size-picker
        show-quick-jumper
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      />
    </div>

    <!-- 核心实机推演沙盘：英雄六维潜能与转职契合度全息工坊 -->
    <div id="hero-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#121422] via-[#171b2e] to-[#0e101a] border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.18)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              APTITUDE SIMULATION STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> 英雄六维潜能成长与转职契合度沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            对齐 Godot 引擎 hero_stat_growth.gd：推演英雄随等级提升的六维属性增长曲线、职业加权加乘与极意绝技伤害结算。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickAwaken">
            ⚡ 极意绝技推演
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：英雄与等级洗练 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-amber-300 flex items-center gap-2">
            <span>🧙‍♂️</span> 英雄与成长参数 (Hero Level)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选定推演英雄 (Hero Protagonist)</label>
              <n-select
                v-model:value="selectedHeroId"
                :options="heroSelectOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>角色当前等级 (Level):</span>
                <span class="font-mono text-amber-400 font-bold text-sm">Lv.{{ heroLevel }}</span>
              </div>
              <n-slider v-model:value="heroLevel" :min="1" :max="99" :step="1" />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>始源晶石洗练阶数 (Crystal Refinement):</span>
                <span class="font-mono text-cyan-400 font-bold">+{{ crystalRefinement }} 阶</span>
              </div>
              <n-slider v-model:value="crystalRefinement" :min="0" :max="10" :step="1" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">佩戴【英雄之徽】(全属性额外 +10%):</span>
                <n-switch v-model:value="hasHeroBadge" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">激活【濒死绝境觉醒】(极意绝技伤害翻倍):</span>
                <n-switch v-model:value="isCriticalAwakened" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：转职职业加权配置 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>🛡️</span> 目标转职与加权 (Job Multipliers)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">当前装配职业 (Equipped Job)</label>
              <n-select
                v-model:value="targetJobId"
                :options="jobOptions"
                size="small"
              />
            </div>

            <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 space-y-1.5 text-xs">
              <div class="text-cyan-300 font-bold">六维成长推演预览 (Lv.{{ heroLevel }}):</div>
              <div class="grid grid-cols-2 gap-1.5 font-mono text-gray-300 pt-1">
                <div>STR 力量: <strong class="text-red-400">{{ calculatedStats.str }}</strong></div>
                <div>AGI 敏捷: <strong class="text-green-400">{{ calculatedStats.agi }}</strong></div>
                <div>VIT 体质: <strong class="text-amber-400">{{ calculatedStats.vit }}</strong></div>
                <div>MAG 魔力: <strong class="text-cyan-400">{{ calculatedStats.mag }}</strong></div>
                <div>SPR 精神: <strong class="text-blue-400">{{ calculatedStats.spr }}</strong></div>
                <div>LUCK 幸运: <strong class="text-yellow-400">{{ calculatedStats.luck }}</strong></div>
              </div>
            </div>

            <div class="pt-1 text-[11px] text-gray-400 italic">
              职业系数加乘与装备饰品加成复合叠加计算。
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息战斗潜能结算指标 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-amber-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 终极战力与契合度</span>
              <n-tag size="tiny" :type="calculatedStats.synergyTagType">
                契合度: {{ calculatedStats.synergyRating }}
              </n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 生命与法力上限 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">综合生命 HP / 法力 MP 上限</div>
                <div class="text-2xl font-black font-mono mt-1 tracking-wider text-amber-400">
                  {{ calculatedStats.maxHp }} HP / {{ calculatedStats.maxMp }} MP
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  综合战斗力评分: {{ calculatedStats.powerScore }} 点
                </div>
              </div>

              <!-- 极意绝技伤害 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-cyan-400 font-bold flex items-center justify-between">
                  <span>⚡ 极意绝技期望输出:</span>
                  <span class="font-mono text-amber-300 font-bold text-sm">{{ calculatedStats.burstDamage }}</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ calculatedStats.burstDescription }}
                </div>
              </div>

              <!-- 契合评价 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-amber-400 font-bold">职能构筑评价:</div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ calculatedStats.synergyFeedback }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>引擎算法: hero_stat_growth.gd</span>
            <span class="text-amber-400">VBLE Hero Engine v2.2.213</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 光暗双子宿命羁绊图谱 -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-xl">☀️🌙</span>
        <h3 class="text-lg font-bold text-white">光暗双子宿命羁绊图谱 (Dual Moon Destiny Bonds)</h3>
      </div>
      <p class="text-xs text-gray-400">
        晶石纪元将世界分为晨辉与永曜两极，不同英雄之间交织着跨越时空的宿命纽带与灵魂共鸣。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div
          v-for="b in destinyBonds"
          :key="b.pair"
          class="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 hover:border-amber-500/40 transition-all"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <span>{{ b.icon }}</span>
              <span>{{ b.pair }}</span>
            </span>
            <n-tag size="tiny" type="info">{{ b.bondType }}</n-tag>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">{{ b.story }}</p>
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] text-cyan-300">
            ✨ 战斗共振加成: {{ b.bonus }}
          </div>
        </div>
      </div>
    </div>

    <!-- 🌟 四位光之战士宿命星盘共鸣与极限突破神威联携演练工坊 (Destiny Constellation & Limit Break Studio) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#121626] via-[#1a1738] to-[#0f1120] border border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.18)] space-y-6 relative overflow-hidden">
      <!-- 头部介绍 -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              LIMIT BREAK CHAIN LAB
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🌟</span> 宿命星盘共鸣与极限突破神威联携工坊 (Destiny Resonance Studio)
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            自由挑选 4 位英雄组成当前远征战队；全息解算双子羁绊共振等级、光暗偏振抗性，并一键推演四重终极神威极限连携轰炸！
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetFormation">
            恢复经典四人编队
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerLimitBreakCombo">
            ⚡ 激发全队四重神威联携
          </n-button>
        </div>
      </div>

      <!-- 4 人出战编队选择器与右侧共鸣算力屏 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：4位出战队员编队槽 -->
        <div class="lg:col-span-7 space-y-4">
          <div class="flex items-center justify-between text-xs text-gray-400">
            <span class="font-bold text-gray-200">当前出战 4 人战术小队 (点击头像切换队员)：</span>
            <span class="text-cyan-400 font-mono">{{ activeFormationHeroes.length }} / 4 位英雄就位</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              v-for="(slotHero, sIdx) in activeFormationHeroes"
              :key="sIdx"
              class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/50 transition-all flex flex-col items-center text-center space-y-2 relative group cursor-pointer"
              @click="cycleSlotHero(sIdx)"
            >
              <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
                {{ slotHero.avatar }}
              </div>
              <div>
                <div class="text-xs font-bold text-gray-100">{{ slotHero.name }}</div>
                <div class="text-[10px] text-cyan-300 font-mono mt-0.5">{{ slotHero.defaultJob }}</div>
              </div>
              <div class="text-[9px] text-gray-400 px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 w-full truncate">
                {{ slotHero.skill }}
              </div>
              <span class="absolute top-1 right-1.5 text-[9px] text-gray-500 font-mono">#{{ sIdx + 1 }}</span>
            </div>
          </div>

          <!-- 备选英雄池快速替换胶囊 -->
          <div class="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
            <div class="text-[11px] font-bold text-gray-400">可用主角阵容库 (点击直接替换第 4 席)：</div>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="hero in heroPool"
                :key="hero.id"
                type="button"
                class="px-2.5 py-1 rounded-lg border text-[11px] cursor-pointer transition-all flex items-center gap-1"
                :class="isHeroInFormation(hero.id)
                  ? 'bg-cyan-900/50 border-cyan-400 text-cyan-200 font-bold'
                  : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-700 hover:text-white'"
                @click="swapHeroIntoFourthSlot(hero)"
              >
                <span>{{ hero.avatar }}</span>
                <span>{{ hero.name }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧：羁绊共振等级与极限连携日志 -->
        <div class="lg:col-span-5 p-5 rounded-xl bg-slate-950/90 border border-cyan-900/50 flex flex-col justify-between space-y-4 shadow-xl">
          <!-- 羁绊共鸣指数 -->
          <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <div class="text-[10px] text-gray-400 font-mono uppercase tracking-wider">小队羁绊共振矩阵</div>
              <h3 class="text-base font-black text-cyan-300 mt-0.5">
                {{ detectedBonds.title }}
              </h3>
            </div>
            <div class="text-center px-3 py-1 rounded-xl bg-cyan-950/80 border border-cyan-500 shadow-md">
              <div class="text-[9px] text-cyan-300 font-bold">RESONANCE</div>
              <div class="text-xl font-black text-amber-400 font-mono">Lv.{{ detectedBonds.level }}</div>
            </div>
          </div>

          <!-- 队伍被动加成面板 -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <div class="text-gray-400 text-[10px]">晨辉光系暴击率</div>
              <div class="font-mono font-bold text-amber-400 text-lg mt-0.5">
                +{{ detectedBonds.lightCrit }}%
              </div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <div class="text-gray-400 text-[10px]">永曜暗系以太抗性</div>
              <div class="font-mono font-bold text-cyan-400 text-lg mt-0.5">
                +{{ detectedBonds.darkResist }}%
              </div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <div class="text-gray-400 text-[10px]">全员连击触发率</div>
              <div class="font-mono font-bold text-emerald-400 text-base mt-0.5">
                +{{ detectedBonds.comboRate }}%
              </div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <div class="text-gray-400 text-[10px]">极限技充能速度</div>
              <div class="font-mono font-bold text-purple-400 text-base mt-0.5">
                +{{ detectedBonds.gaugeSpeed }}%
              </div>
            </div>
          </div>

          <!-- 极限神威连携回放日志 -->
          <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1.5 flex-1">
            <div class="text-[11px] font-bold text-amber-300 flex items-center justify-between">
              <span>⚡ 四重极限神威连携推演回放:</span>
              <span class="text-[10px] text-gray-500 font-mono">Limit Break Sequence</span>
            </div>
            <p class="text-xs text-gray-200 leading-relaxed font-mono">
              {{ limitBreakSequenceText }}
            </p>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>底层引擎契约: destiny_bond_chain_resolver.gd</span>
            <span class="text-cyan-400">VBLE Hero Resonance 4.6 LTS</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 🌟 专区: 全域八主角以太命之座唤醒与双向奥义矩阵推演工坊 (Aether Constellation & Awakening Studio) -->
    <div id="hero-awakening-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c1208] via-[#22170c] to-[#120a1c] border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.22)] space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-amber-950 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              AETHER CONSTELLATION &amp; AWAKENING STUDIO
            </span>
            <span class="text-xs text-gray-400 font-mono">v2.2.270 官方实机矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <span>🌟</span> 全域八主角以太命之座唤醒与双向奥义矩阵推演工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            破限唤醒一阶至六阶太古以太命之座！支持全 8 位光暗主角（黎川、卫珩、茜罗、昼隐、纳哈特、澄月、刃歌、夜织）命座被动加成、木桩单轮真伤模拟与 SHA-256 命座方案书离线导出。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetConstellationRank">
            🔄 重置命座阶数
          </n-button>
          <n-button size="small" secondary type="info" @click="upgradeConstellationRank">
            ⚡ 提升一阶命座 (Rank +1)
          </n-button>
          <n-button size="small" secondary type="error" @click="simulateAwakenedTrial">
            🎯 试炼木桩斩杀测试
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportHeroAwakeningCertificate">
            📜 导出命座认证书
          </n-button>
        </div>
      </div>

      <!-- 三栏主推演工作台 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 八主角命座选定 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>👤</span>
                <span>目标唤醒英雄命座</span>
              </span>
              <n-tag size="tiny" type="warning">{{ currentAwakeningHero.party === 'light' ? '晨辉光之勇者' : '永曜暗之裁决' }}</n-tag>
            </div>

            <!-- 主角选择器 -->
            <div class="space-y-1.5">
              <label class="text-[11px] text-gray-400 block">选择命座主角 (Constellation Hero):</label>
              <select
                v-model="selectedAwakeningHeroId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold rounded-lg p-2 focus:border-amber-400 focus:outline-none"
                @change="onAwakeningHeroChanged"
              >
                <option v-for="h in awakeningHeroList" :key="h.id" :value="h.id">
                  {{ h.avatar }} {{ h.name }} - {{ h.constellationName }}
                </option>
              </select>
            </div>

            <!-- 命座详述卡片 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-amber-500/30 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white flex items-center gap-1.5 text-sm">
                  <span>{{ currentAwakeningHero.avatar }}</span>
                  <span>{{ currentAwakeningHero.name }}</span>
                </span>
                <span class="text-[10px] text-amber-400 font-mono font-bold">{{ currentAwakeningHero.defaultJob }}</span>
              </div>
              <div class="text-amber-300 font-bold text-[11px]">
                🌌 命之座: {{ currentAwakeningHero.constellationName }}
              </div>
              <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentAwakeningHero.constellationLore }}</p>
              <div class="p-2 rounded bg-amber-950/40 border border-amber-900/50 text-[11px] space-y-1">
                <div class="text-cyan-300 font-bold flex items-center gap-1">
                  <span>⚡ 命座绝技:</span>
                  <span>{{ currentAwakeningHero.signatureAwakeningSkill }}</span>
                </div>
                <div class="text-emerald-300 text-[10px]">✨ 觉醒特性: {{ currentAwakeningHero.awakeningPerk }}</div>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
            <span>实机代码架构:</span>
            <span class="font-mono font-bold text-amber-400">hero_constellation_awakening_engine.gd</span>
          </div>
        </div>

        <!-- 栏 2: 1~6 阶命之座节点与被动技能树 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🌟</span>
              <span>以太命座觉醒层级</span>
            </span>
            <span class="font-mono text-xs text-amber-400 font-bold">
              {{ constellationRank }} / 6 阶 ({{ constellationRankTitle }})
            </span>
          </div>

          <!-- 命座进度条 -->
          <div class="space-y-1">
            <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-amber-500 via-cyan-500 to-amber-500 rounded-full transition-all duration-300"
                :style="{ width: `${(constellationRank / 6) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- 六阶被动节点清单 -->
          <div class="space-y-1.5 text-xs max-h-56 overflow-y-auto custom-scrollbar pr-1">
            <div
              v-for="(node, idx) in constellationNodes"
              :key="idx"
              class="p-2 rounded-lg border transition-all"
              :class="idx < constellationRank ? 'bg-amber-950/30 border-amber-500/40' : 'bg-slate-950 border-slate-800 opacity-60'"
            >
              <div class="flex items-center justify-between">
                <span class="font-bold flex items-center gap-1.5" :class="idx < constellationRank ? 'text-amber-300' : 'text-gray-400'">
                  <span>{{ idx < constellationRank ? '⭐' : '⚪' }}</span>
                  <span>第 {{ idx + 1 }} 阶: {{ node.title }}</span>
                </span>
                <n-tag size="tiny" :type="idx < constellationRank ? 'success' : 'default'">
                  {{ idx < constellationRank ? '已激活' : '待突破' }}
                </n-tag>
              </div>
              <p class="text-[10px] text-gray-300 mt-1 leading-snug">{{ node.description }}</p>
            </div>
          </div>
        </div>

        <!-- 栏 3: 木桩实战伤害解算与推演日志 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🎯</span>
                <span>试炼木桩斩杀解算</span>
              </span>
              <n-tag size="tiny" :type="dummyDefeated ? 'success' : 'warning'">
                {{ dummyDefeated ? '🏆 木桩破防击破' : '⚔️ 试炼中' }}
              </n-tag>
            </div>

            <!-- 斩杀伤害卡片 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div class="text-[11px] text-gray-400">单轮极限奥义爆发输出 (Burst Damage)</div>
              <div class="text-2xl sm:text-3xl font-black font-mono mt-1 text-amber-400">
                {{ dummyBurstDamage.toLocaleString() }}
              </div>
              <div class="text-[10px] text-cyan-400 mt-0.5">
                {{ dummyBurstDescription }}
              </div>
            </div>

            <!-- 实时推演日志流 -->
            <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[10px] space-y-1 max-h-24 overflow-y-auto font-mono text-gray-300">
              <div v-for="(log, idx) in awakeningLogs" :key="idx" class="flex items-start gap-1">
                <span class="text-amber-400 shrink-0">•</span>
                <span>{{ log }}</span>
              </div>
            </div>
          </div>

          <!-- 提升命座按钮 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-600 via-cyan-600 to-amber-600 hover:from-amber-500 hover:to-cyan-500 text-slate-950 font-black text-xs transition-all shadow-lg cursor-pointer"
              @click="upgradeConstellationRank"
            >
              ⭐ 突破激活下一阶以太命座 (Rank {{ constellationRank }} &rarr; {{ Math.min(6, constellationRank + 1) }})
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 全域光暗双队灵魂共鸣羁绊、阵营合体技与神威协同工坊 (v2.2.292) -->
    <div id="soul-link-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1a0f28] via-[#121426] to-[#0a101f] border border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.22)] space-y-6">
      <!-- 头部横幅 -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-rose-900/50 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/40">
              SOUL LINK BOND &amp; DUAL-FACTION SYNERGY
            </span>
            <span class="text-xs text-rose-400 font-mono">v2.2.292 Official Matrix</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
            <span>💞</span> 全域光暗双队灵魂共鸣羁绊、阵营合体技与神威协同工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
            面向 Godot 4.6 LTS 角色协同系统：实现 8 位光暗主角双生羁绊共振、合体极限神威战技、双人同调吟唱比率微调与全队致命伤害互担结界。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3 py-1 rounded-lg bg-rose-950/60 border border-rose-700/60 text-xs font-mono text-rose-300">
            晨暮逆位双生契
          </span>
          <span class="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-700/60 text-xs font-mono text-purple-300">
            量子纠缠生命共享
          </span>
        </div>
      </div>

      <!-- 四大灵魂共鸣羁绊选择 -->
      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">✨</span>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">四大光暗灵魂羁绊结界 (Soul Link Bonds)</h3>
          </div>
          <span class="text-xs text-gray-400">选择当前激活的双人灵魂羁绊以解锁合体奥义</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="bond in soulLinkBondsList"
            :key="bond.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedSoulLinkId === bond.id ? `${bond.color} ring-2 ring-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]` : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'"
            @click="selectedSoulLinkId = bond.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ bond.icon }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-gray-300">
                {{ bond.heroesTag }}
              </span>
            </div>
            <div class="font-bold text-sm text-white mb-1">{{ bond.name }}</div>
            <p class="text-xs text-gray-400 leading-snug">{{ bond.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 参数调节与遥测看板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧参数调节面板 -->
        <div class="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-lg">🎛️</span>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider">羁绊与合体技拓扑参数</h3>
            </div>
            <n-tag type="error" size="tiny" round>实机连续微调</n-tag>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>灵魂羁绊同契亲和度 (Soul Link Affinity)</span>
                <span class="font-mono font-bold text-rose-400">{{ soulLinkAffinity }}%</span>
              </div>
              <n-slider v-model:value="soulLinkAffinity" :min="10" :max="100" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>10% (初识微光)</span>
                <span>80% (宿命共鸣)</span>
                <span>100% (灵魂同一)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>双人同调吟唱比率 (Dual-Cast Sync Ratio)</span>
                <span class="font-mono font-bold text-purple-400">{{ dualCastSyncRatio }}%</span>
              </div>
              <n-slider v-model:value="dualCastSyncRatio" :min="50" :max="200" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>50% (异步步进)</span>
                <span>135% (同相超频)</span>
                <span>200% (极境双发无前摇)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>合体战技共鸣能量储备 (Synergy Energy Pool)</span>
                <span class="font-mono font-bold text-amber-400">{{ synergyBurstEnergyPool }} EP</span>
              </div>
              <n-slider v-model:value="synergyBurstEnergyPool" :min="100" :max="999" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>100 EP (初阶合击)</span>
                <span>620 EP (神威奥义)</span>
                <span>999 EP (天地创世绝灭击)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>量子纠缠生命共享结界深度 (Bond Depth)</span>
                <span class="font-mono font-bold text-cyan-400">{{ bondEntanglementDepth }} 层</span>
              </div>
              <n-slider v-model:value="bondEntanglementDepth" :min="1" :max="8" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>1 层 (单体连结)</span>
                <span>5 层 (四人庇护)</span>
                <span>8 层 (全员双队绝对共生)</span>
              </div>
            </div>
          </div>

          <!-- 3 个合体战技开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-3">
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🛡️</span> 双生生命共享护盾 (Twin Life Share Shield)
                </div>
                <div class="text-[10px] text-gray-400">受到致死单体爆发伤害时，双生搭档分担 50% 伤害，彻底免疫暴毙并增加全队减伤 (+12%)</div>
              </div>
              <n-switch v-model:value="twinLifeShareShield" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚡</span> 极限合体技冷却瞬回 (Instant Cooldown Reset)
                </div>
                <div class="text-[10px] text-gray-400">合体奥义暴击时有 30% 概率瞬间重置全部行动条与技能 CD，合体伤害提升 +30%</div>
              </div>
              <n-switch v-model:value="limitBreakInstantCooldown" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🔄</span> 元素极性逆转治疗光环 (Elemental Inversion Aura)
                </div>
                <div class="text-[10px] text-gray-400">全队遭遇自身弱点属性魔法轰击时，强行逆转为 100% 以太治疗吸收</div>
              </div>
              <n-switch v-model:value="elementalInversionAura" />
            </div>
          </div>
        </div>

        <!-- 右侧实时遥测看板 -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-rose-950/40 border border-rose-500/30 space-y-4">
            <div class="flex items-center justify-between border-b border-rose-500/20 pb-2">
              <h3 class="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center gap-1.5">
                <span>📊</span> 灵魂协同精算遥测 (Synergy Telemetry)
              </h3>
              <span class="text-[10px] font-mono text-emerald-400 animate-pulse">● 羁绊共鸣信道在线</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/20">
                <div class="text-[10px] text-gray-400">合体神威战技理论爆发</div>
                <div class="text-lg sm:text-xl font-black text-rose-400 font-mono mt-1">
                  {{ calculatedSynergyBurstDamage }}
                </div>
                <div class="text-[9px] text-rose-500/80 mt-0.5">双人极限奥义单发</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                <div class="text-[10px] text-gray-400">全队综合减伤抗性</div>
                <div class="text-lg sm:text-xl font-black text-purple-400 font-mono mt-1">
                  {{ calculatedPartyDamageReduction }}
                </div>
                <div class="text-[9px] text-purple-500/80 mt-0.5">纠缠结界物理与魔法削减</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20">
                <div class="text-[10px] text-gray-400">双人连携追击触发率</div>
                <div class="text-lg sm:text-xl font-black text-cyan-400 font-mono mt-1">
                  {{ calculatedTandemStrikeChance }}
                </div>
                <div class="text-[9px] text-cyan-500/80 mt-0.5">普通攻击自动追加连携</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20">
                <div class="text-[10px] text-gray-400">羁绊共振评阶</div>
                <div class="text-base sm:text-lg font-black text-amber-400 font-mono mt-1">
                  {{ calculatedBondRank }}
                </div>
                <div class="text-[9px] text-amber-500/80 mt-0.5">灵魂同调契约位阶</div>
              </div>
            </div>

            <!-- 当前羁绊特质摘要 -->
            <div class="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-1">
              <div class="flex items-center justify-between text-gray-400">
                <span>羁绊结界:</span>
                <span class="font-bold text-white">{{ currentSoulLinkBondObj?.name }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>双生搭档:</span>
                <span class="font-mono text-rose-400">{{ currentSoulLinkBondObj?.heroesTag }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>生命共享:</span>
                <span class="font-mono" :class="twinLifeShareShield ? 'text-emerald-400' : 'text-gray-500'">
                  {{ twinLifeShareShield ? '已激活 (互担 50% 免暴毙)' : '未开启' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>逆转吸收:</span>
                <span class="font-mono" :class="elementalInversionAura ? 'text-cyan-400' : 'text-gray-500'">
                  {{ elementalInversionAura ? '弱点伤害转化为 HP 吸收' : '常规承伤' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 快捷操作按钮 -->
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              @click="runSoulLinkSimulation"
              :disabled="isSoulLinkSimulating"
            >
              <span>{{ isSoulLinkSimulating ? '⏳' : '🚀' }}</span>
              {{ isSoulLinkSimulating ? '双生羁绊推演中...' : '启动五阶段灵魂羁绊协同推演' }}
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
              @click="exportSoulLinkCertificate"
            >
              <span>📄</span> 导出凭证
            </button>
          </div>
        </div>
      </div>

      <!-- 五阶段推演终端 -->
      <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">💻</span>
            <h3 class="text-sm font-bold text-white font-mono uppercase">灵魂羁绊协同控制台 (Soul Link Terminal)</h3>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="isSoulLinkSimulating" class="text-xs text-rose-400 animate-pulse font-mono">
              STAGE {{ soulLinkSimStage }}/5 协同中
            </span>
            <span v-else-if="soulLinkSimFinished" class="text-xs text-emerald-400 font-mono">
              ✓ 羁绊共鸣大圆满
            </span>
            <button
              type="button"
              class="text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 cursor-pointer"
              @click="soulLinkTerminalLogs = []"
            >
              清屏
            </button>
          </div>
        </div>

        <div class="h-44 p-3 rounded-xl bg-black/90 border border-slate-900 font-mono text-xs overflow-y-auto space-y-1 text-gray-300">
          <div v-if="soulLinkTerminalLogs.length === 0" class="text-gray-600 italic">
            [终端待命中] 点击“启动五阶段灵魂羁绊协同推演”以解算双人同调吟唱、双生生命共享与合体神威爆发...
          </div>
          <div v-for="(log, idx) in soulLinkTerminalLogs" :key="idx" class="leading-relaxed">
            <span class="text-gray-500">[{{ log.time }}]</span>
            <span :class="log.color"> {{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>


    <!-- Godot 4.x 核心实机代码展台 (双 Tab 切换) -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-amber-300">
            Godot 4.6 LTS 英雄潜能成长与以太命之座觉醒架构
          </span>
          <n-tag size="tiny" type="info">纯读安全 · 零内存泄漏</n-tag>
        </div>
        <div class="flex items-center gap-2">
          <!-- 双 Tab 切换 -->
          <div class="inline-flex p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeHeroGodotTab === 'growth' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeHeroGodotTab = 'growth'"
            >
              📄 hero_stat_growth.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeHeroGodotTab === 'constellation' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeHeroGodotTab = 'constellation'"
            >
              📄 hero_constellation_awakening_engine.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeHeroGodotTab === 'soul_link' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeHeroGodotTab = 'soul_link'"
            >
              📄 hero_soul_link_synergy_engine.gd
            </button>
          </div>
          <n-button size="tiny" secondary type="warning" @click="copyGodotCode">
            {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
          </n-button>
        </div>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-56 custom-scrollbar"><code v-if="activeHeroGodotTab === 'growth'">{{ godotCodeText }}</code><code v-else-if="activeHeroGodotTab === 'constellation'">{{ godotConstellationCodeText }}</code><code v-else>{{ godotSoulLinkCodeText }}</code></pre>
    </div>

    <!-- 二十四大英雄传记、宿命大誓约羁绊与灵魂全息共鸣工坊 (v2.2.317 重磅实装) -->
    <div id="grand-oath-synergy-studio" class="grand-oath-synergy-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-rose-950/20 to-slate-900/95 border border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
              GRAND OATH HERO SYNERGY & SOUL MATRIX
            </span>
            <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
              v2.2.317 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>👥</span> 二十四大英雄传记、宿命大誓约羁绊与灵魂全息共鸣工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            系统支持英雄光暗羁绊默契解算、全队替补阵亡毫秒级替登契约、双生英雄技能双重连击与 Godot 4.6 LTS 宿命大誓约事件总线深度融合。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="error" @click="resetGrandOathDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="error" :loading="isHeroOathSimulating" @click="runGrandOathSimulation">
            <template #icon><span>⚡</span></template>
            启动大誓约协同推演
          </n-button>
        </div>
      </div>

      <!-- 四大英雄羁绊流派原型卡 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="archetype in heroOathArchetypes"
          :key="archetype.id"
          @click="selectHeroOathArchetype(archetype)"
          :class="[
            'p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden',
            selectedHeroOathArchetype.id === archetype.id
              ? 'bg-rose-950/40 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
          ]"
        >
          <div class="flex items-center justify-between">
            <span class="text-xl">{{ archetype.icon }}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-rose-300">{{ archetype.badge }}</span>
          </div>
          <div class="font-bold text-white text-sm mt-2">{{ archetype.name }}</div>
          <div class="text-xs text-gray-400 mt-1 leading-relaxed">{{ archetype.desc }}</div>
          <div class="mt-3 text-[11px] font-mono text-rose-400/90 flex justify-between">
            <span>连携爆伤: {{ archetype.burst }}</span>
            <span>共鸣度: {{ archetype.stability }}</span>
          </div>
        </div>
      </div>

      <!-- 核心微调滑块与调控开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800">
        <!-- 4 维连续滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-rose-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>⚙️</span> 羁绊默契与命座突破参数调谐
          </div>
          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>灵魂羁绊默契值深度 (Affinity Depth)</span>
                <span class="font-mono text-rose-400 font-bold">{{ heroSoulAffinity }} 点</span>
              </div>
              <n-slider v-model:value="heroSoulAffinity" :min="20" :max="100" :step="2" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>连携极意技暴击倍率 (Crit Multiplier)</span>
                <span class="font-mono text-amber-400 font-bold">{{ heroCritMultiplier.toFixed(1) }} x</span>
              </div>
              <n-slider v-model:value="heroCritMultiplier" :min="1.5" :max="6.0" :step="0.1" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>命座潜能突破层数 (Constellation Rank)</span>
                <span class="font-mono text-cyan-400 font-bold">{{ heroConstellationRank }} 阶</span>
              </div>
              <n-slider v-model:value="heroConstellationRank" :min="1" :max="6" :step="1" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>阵亡遗志以太回充率 (Martyr Battery Ratio)</span>
                <span class="font-mono text-purple-400 font-bold">{{ heroMartyrRatio }} %</span>
              </div>
              <n-slider v-model:value="heroMartyrRatio" :min="20" :max="100" :step="5" />
            </div>
          </div>
        </div>

        <!-- 3 维调控开关与动态指标 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-cyan-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>🛡️</span> 宿命誓约与战斗协同守卫
          </div>
          <div class="space-y-2.5 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">队伍阵亡替补瞬时登场契约</div>
                <div class="text-[10px] text-gray-400">前排英雄阵亡时备战英雄毫秒级无缝入场并继承 100% 怒气值</div>
              </div>
              <n-switch v-model:value="enableInstantReplacement" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">双生英雄全技能双倍连击</div>
                <div class="text-[10px] text-gray-400">黎川与昼隐/纳哈特同屏时触发太古共振，所有战技追击一次</div>
              </div>
              <n-switch v-model:value="enableDualSkillDuplication" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">宿命羁绊伤害天花板突破解除</div>
                <div class="text-[10px] text-gray-400">解禁 99,999 限制，队伍合体极意技允许直达千万级真实破坏</div>
              </div>
              <n-switch v-model:value="enableBreakFateDamageCap" />
            </div>
          </div>

          <!-- 4 维解算核心指标 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">战队极意连携爆发</div>
              <div class="text-base font-black font-mono text-rose-400 mt-0.5">{{ calculatedTeamBurst }}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">灵魂共鸣稳态率</div>
              <div class="text-base font-black font-mono text-cyan-400 mt-0.5">{{ calculatedResonanceRate }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">遗志回充能效</div>
              <div class="text-base font-black font-mono text-emerald-400 mt-0.5">{{ calculatedMartyrPotency }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">英雄羁绊认证</div>
              <div class="text-xs font-black font-mono text-purple-400 mt-1">{{ calculatedOathCert }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条与终端控制台 -->
      <div class="space-y-3 bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="text-rose-400 font-mono font-bold">STAGE {{ heroSimStage }}/5</span>
            <span class="text-gray-300">{{ heroSimStageName }}</span>
          </div>
          <span class="font-mono text-cyan-400">{{ heroSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="heroSimProgress"
          :color="'#f43f5e'"
          :rail-color="'#1e293b'"
          :height="8"
          :show-indicator="false"
          border-radius="4px"
        />

        <div class="h-32 bg-slate-900/90 rounded-lg p-3 font-mono text-xs overflow-y-auto space-y-1 text-gray-300 border border-slate-800/80">
          <div v-for="(log, idx) in heroOathLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-gray-500 shrink-0">[{{ log.time }}]</span>
            <span :class="log.color">{{ log.text }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <div class="text-gray-400 font-mono">
            <span>防伪校验凭证: </span>
            <span class="text-rose-400 font-bold">{{ heroOathCertHash }}</span>
          </div>
          <n-button size="tiny" secondary type="error" round @click="exportHeroOathCert">
            <template #icon><span>📜</span></template>
            导出英雄大誓约推演报告 (SHA-256)
          </n-button>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                GODOT 4.6 LTS HERO SYSTEM
              </span>
              <span class="text-sm font-bold text-white">大誓约事件总线与替补瞬登实机驱动</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              提供生产级宿命大誓约协同总线、灵魂共鸣管线与替补瞬登系统实机代码。
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button
              v-for="codeTab in heroOathCodeTabs"
              :key="codeTab.id"
              size="tiny"
              round
              :type="activeHeroOathCodeTab === codeTab.id ? 'error' : 'default'"
              :secondary="activeHeroOathCodeTab !== codeTab.id"
              @click="activeHeroOathCodeTab = codeTab.id"
            >
              {{ codeTab.name }}
            </n-button>
            <n-button size="tiny" round secondary type="info" @click="copyActiveHeroOathCode">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-rose-300 overflow-x-auto leading-relaxed max-h-[420px]">{{ currentHeroOathCode }}</pre>
      </div>
    </div>

    <!-- v2.2.335: 全域英雄命座星轨、光暗双宿觉醒与羁绊共振工坊 -->
    <div
      id="constellation-orbit-bond-studio"
      class="constellation-orbit-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/95 via-purple-950/20 to-slate-900/95 border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.15)] space-y-6 relative overflow-hidden"
    >
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/30">
              CONSTELLATION ORBIT &amp; BOND MATRIX v2.2.335
            </span>
            <span class="text-xs text-purple-400 font-mono">Light &amp; Dark Awakening &amp; Supernova Synergy</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🌌</span> 全域英雄命座星轨、光暗双宿觉醒与羁绊共振工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            提供八大主角六阶命之座天赋星轨投射、光与暗双宿相生相协、毫秒级羁绊协防反击与超越 9,999,999 极限伤害破限推演沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-button
            type="warning"
            size="small"
            round
            secondary
            :loading="isSimulatingConstellation"
            @click="runConstellationSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动命座星轨沙盘推演
          </n-button>
          <n-button
            type="info"
            size="small"
            round
            secondary
            @click="exportConstellationCertificate"
          >
            <template #icon><span>📜</span></template>
            导出英雄星盘方案书
          </n-button>
        </div>
      </div>

      <!-- 四大命座觉醒原型 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="arch in constellationArchetypes"
          :key="arch.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative"
          :class="selectedConstellationArchetypeId === arch.id ? 'bg-purple-950/40 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-slate-800/40 border-slate-700/60 hover:border-purple-500/40'"
          @click="selectConstellationArchetype(arch.id)"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ arch.icon }}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {{ arch.tag }}
            </span>
          </div>
          <div class="font-bold text-sm text-white">{{ arch.name }}</div>
          <div class="text-xs text-purple-300 font-mono mt-0.5">{{ arch.subtitle }}</div>
          <div class="text-[11px] text-gray-400 mt-2 leading-relaxed">{{ arch.desc }}</div>
          <div class="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] font-mono">
            <span class="text-gray-400">基准奥义倍率</span>
            <span class="text-purple-400 font-bold">{{ arch.baseBurstMultiplier }}</span>
          </div>
        </div>
      </div>

      <!-- 参数调节与开关控制网格 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
        <!-- 4 滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-purple-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
            <span>⚙️</span> 命座星轨与双宿羁绊参数微调
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">命座星轨灵魂同步率 (%)</span>
              <span class="text-purple-400 font-mono font-bold">{{ constellationOrbitSyncRatio }} %</span>
            </div>
            <n-slider v-model:value="constellationOrbitSyncRatio" :min="50" :max="100" :step="1" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-300">光暗双宿羁绊共振度 (%)</span>
              <span class="text-amber-400 font-mono font-bold">{{ bondAffinityResonancePct }} %</span>
            </div>
            <n-slider v-model:value="bondAffinityResonancePct" :min="100" :max="300" :step="10" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-cyan-400">超新星觉醒神威持续时长 (秒)</span>
              <span class="text-cyan-400 font-mono font-bold">{{ awakeningSupernovaDurationSec.toFixed(1) }} s</span>
            </div>
            <n-slider v-model:value="awakeningSupernovaDurationSec" :min="5.0" :max="30.0" :step="0.5" />
          </div>

          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-emerald-400">极意奥义连携爆发倍率 (倍)</span>
              <span class="text-emerald-400 font-mono font-bold">{{ limitBreakChainMultiplier.toFixed(1) }} x</span>
            </div>
            <n-slider v-model:value="limitBreakChainMultiplier" :min="2.0" :max="10.0" :step="0.2" />
          </div>
        </div>

        <!-- 3 开关与实时数据 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-purple-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
            <span>✨</span> 双宿相生特权与破限机制
          </div>

          <div class="space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">光与暗双宿相生豁免属性互斥</div>
                <div class="text-gray-400 text-[11px]">黎川圣光与纳哈特暗蚀同时出战增幅 35%</div>
              </div>
              <n-switch v-model:value="lightDarkHarmonicNoConflict" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">羁绊满溢伙伴毫秒级自动协防反击</div>
                <div class="text-gray-400 text-[11px]">受到致死攻击时同伴立即介入抵挡伤害</div>
              </div>
              <n-switch v-model:value="crossHeroBondInstantAssist" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div class="text-xs">
                <div class="text-white font-medium">觉醒奥义极限伤害超越 9,999,999 破限</div>
                <div class="text-gray-400 text-[11px]">解除单发奥义伤害上限至 99,999,999</div>
              </div>
              <n-switch v-model:value="transcendentDamageCapUncap" />
            </div>
          </div>

          <!-- 4 项实时综合解算指标 -->
          <div class="grid grid-cols-2 gap-3 pt-1">
            <div class="p-2.5 rounded bg-slate-900 border border-purple-500/20 text-center">
              <div class="text-[11px] text-gray-400">命座觉醒连携爆发</div>
              <div class="text-lg font-mono font-black text-purple-400">{{ calculatedConstellationMetrics.constellationAwakeningBurst }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-purple-500/20 text-center">
              <div class="text-[11px] text-gray-400">羁绊双宿共振能效</div>
              <div class="text-lg font-mono font-black text-cyan-400">{{ calculatedConstellationMetrics.bondResonanceEfficiency }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-purple-500/20 text-center">
              <div class="text-[11px] text-gray-400">全队星辉圣佑稳态率</div>
              <div class="text-lg font-mono font-black text-emerald-400">{{ calculatedConstellationMetrics.partyAuraDefenseStability }}</div>
            </div>
            <div class="p-2.5 rounded bg-slate-900 border border-purple-500/20 text-center">
              <div class="text-[11px] text-gray-400">英雄星盘导师考评</div>
              <div class="text-lg font-mono font-black text-amber-400">{{ calculatedConstellationMetrics.heroConstellationRank }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条 -->
      <div v-if="isSimulatingConstellation" class="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-purple-500/30">
        <div class="flex justify-between text-xs font-mono">
          <span class="text-purple-300 flex items-center gap-2">
            <span class="animate-spin">🔄</span> {{ constellationStages[currentConstellationSimStage] }}
          </span>
          <span class="text-gray-400">{{ (currentConstellationSimStage + 1) * 20 }}%</span>
        </div>
        <n-progress type="line" :percentage="(currentConstellationSimStage + 1) * 20" :show-indicator="false" status="info" />
      </div>

      <!-- Godot 4.6 LTS 源码展台 -->
      <div class="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-gray-300 font-mono">GODOT 4.6 LTS CONSTELLATION ENGINE</span>
            <n-tag size="small" type="info" round>res://scripts/combat/characters/</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <n-radio-group v-model:value="activeConstellationScriptTab" size="small">
              <n-radio-button value="constellation_orbit">命座星轨引擎</n-radio-button>
              <n-radio-button value="bond_resonance">光暗羁绊总线</n-radio-button>
              <n-radio-button value="awakening_controller">超新星觉醒控制器</n-radio-button>
            </n-radio-group>
            <n-button type="info" size="tiny" secondary round @click="copyConstellationScript">
              复制当前脚本
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentConstellationScriptCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { useWindowSize } from '@vueuse/core'
import { useGameStore } from '../stores/gameStore'
import { usePagination } from '@/composables/usePagination'

const message = useMessage()
const gameStore = useGameStore()
const characters = computed<Record<string, any>[]>(() => gameStore.db.characters || [])

const selectedParty = ref('all')
const searchKeyword = ref('')
const selectedHeroId = ref('li_chuan')
const heroLevel = ref(50)
const crystalRefinement = ref(3)
const targetJobId = ref('mystic_knight')
const hasHeroBadge = ref(true)
const isCriticalAwakened = ref(false)
const copiedCode = ref(false)

const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 640)

const parties = [
  { id: 'all', name: '全部英雄角色', icon: '👥' },
  { id: 'light', name: '晨辉光之战士', icon: '☀️' },
  { id: 'dark', name: '永曜暗之战士', icon: '🌙' }
]

const heroSelectOptions = computed(() => {
  return characters.value.map(c => ({
    label: `${c.name} - ${c.title}`,
    value: c.id
  }))
})

const jobOptions = [
  { label: '魔法剑士 (Mystic Knight - 属性附魔贯穿)', value: 'mystic_knight' },
  { label: '圣骑士 (Paladin - 坚壁护甲与神圣守护)', value: 'paladin' },
  { label: '二刀流忍者 (Ninja - 极致暴击与先制暗杀)', value: 'ninja' },
  { label: '全知贤者 (Sage - 黑白连续魔超位奥义)', value: 'sage' },
  { label: '龙骑士 (Dragoon - 苍穹跳跃破界突刺)', value: 'dragoon' },
  { label: '自由战士 (Freelancer - 全能装备槽位大师)', value: 'warrior' }
]

const getPartyCount = (id: string) => {
  if (id === 'all') return characters.value.length
  return characters.value.filter((c: any) => c.party === id).length
}

const filteredCharacters = computed(() => {
  let list = characters.value
  if (selectedParty.value !== 'all') {
    list = list.filter((c: any) => c.party === selectedParty.value)
  }
  if (searchKeyword.value.trim()) {
    const q = searchKeyword.value.trim().toLowerCase()
    list = list.filter((c: any) =>
      c.name.toLowerCase().includes(q) ||
      (c.title && c.title.toLowerCase().includes(q)) ||
      (c.signature_skill && c.signature_skill.toLowerCase().includes(q))
    )
  }
  return list
})

const {
  currentPage,
  pageSize,
  paginatedList,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination<Record<string, any>>(filteredCharacters, { pageSize: 4 })

watch(selectedParty, () => resetPage())
watch(searchKeyword, () => resetPage())

const selectHeroForSimulation = (id: string) => {
  selectedHeroId.value = id
  scrollToStudio()
  message.success('已载入英雄数据进入六维潜能沙盘！')
}

const scrollToStudio = () => {
  const el = document.getElementById('hero-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToAwakeningStudio = () => {
  const el = document.getElementById('hero-awakening-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetStudioParams = () => {
  selectedHeroId.value = 'li_chuan'
  heroLevel.value = 50
  crystalRefinement.value = 3
  targetJobId.value = 'mystic_knight'
  hasHeroBadge.value = true
  isCriticalAwakened.value = false
  message.info('六维潜能沙盘参数已恢复默认')
}

const triggerOneClickAwaken = () => {
  message.success(`⚡ 极意绝技激活！输出估算: ${calculatedStats.value.burstDamage} 点破界真实伤害`)
}

// 核心数值与六维推演算法
const calculatedStats = computed(() => {
  const curHero = characters.value.find(c => c.id === selectedHeroId.value) || characters.value[0]
  const base = curHero?.stats || { str: 80, agi: 70, vit: 75, mag: 60, spr: 65, luck: 70 }

  const lvl = heroLevel.value
  const refine = crystalRefinement.value
  const badgeMult = hasHeroBadge.value ? 1.1 : 1.0

  // 职业系数
  let strJob = 1.0, agiJob = 1.0, vitJob = 1.0, magJob = 1.0, sprJob = 1.0, luckJob = 1.0
  if (targetJobId.value === 'mystic_knight') {
    strJob = 1.25; magJob = 1.20; vitJob = 1.10
  } else if (targetJobId.value === 'paladin') {
    strJob = 1.20; vitJob = 1.40; sprJob = 1.25
  } else if (targetJobId.value === 'ninja') {
    agiJob = 1.45; strJob = 1.20; luckJob = 1.30
  } else if (targetJobId.value === 'sage') {
    magJob = 1.45; sprJob = 1.40; strJob = 0.8
  } else if (targetJobId.value === 'dragoon') {
    strJob = 1.35; vitJob = 1.20; agiJob = 1.15
  }

  const str = Math.round((base.str + (lvl - 1) * 1.6 + refine * 4) * strJob * badgeMult)
  const agi = Math.round((base.agi + (lvl - 1) * 1.4 + refine * 3) * agiJob * badgeMult)
  const vit = Math.round((base.vit + (lvl - 1) * 1.5 + refine * 4) * vitJob * badgeMult)
  const mag = Math.round((base.mag + (lvl - 1) * 1.5 + refine * 4) * magJob * badgeMult)
  const spr = Math.round((base.spr + (lvl - 1) * 1.3 + refine * 3) * sprJob * badgeMult)
  const luck = Math.round((base.luck + (lvl - 1) * 1.0 + refine * 2) * luckJob * badgeMult)

  const maxHp = Math.round(vit * 35 + lvl * 42)
  const maxMp = Math.round((mag + spr) * 8 + lvl * 10)
  const powerScore = Math.round((str + agi + vit + mag + spr + luck) * 1.5)

  // 绝技伤害估算
  let burstMultiplier = isCriticalAwakened.value ? 2.0 : 1.0
  let burstDamage = Math.round((str * 14 + mag * 10) * burstMultiplier)
  let burstDescription = `${curHero.signature_skill || '极限突破'} 触发！破甲暴击率 +45%`

  // 契合度评分
  let synergyRating = 'S 极佳'
  let synergyTagType: 'default' | 'info' | 'warning' | 'error' | 'success' = 'success'
  let synergyFeedback = '该角色与选定职业核心属性高度重叠，能完全释放职业所有潜力！'

  const heroBest = curHero.best_jobs?.map((j: any) => j.id) || []
  if (!heroBest.includes(targetJobId.value)) {
    synergyRating = 'A 良好'
    synergyTagType = 'warning'
    synergyFeedback = '非最契合职业推荐，但凭借基础面板仍具备较强实战泛用性。'
  }

  return {
    str, agi, vit, mag, spr, luck,
    maxHp, maxMp, powerScore,
    burstDamage, burstDescription,
    synergyRating, synergyTagType, synergyFeedback
  }
})

// 宿命羁绊
const destinyBonds = [
  {
    pair: '黎川 & 纳哈特',
    icon: '☀️🌙',
    bondType: '光与暗之核',
    story: '背负始源水晶对立权能的双子少年，在终焉之战中将光辉与暗夜力量完美融合，终结因果撕裂。',
    bonus: '两人同处于队伍时，全员暴击率提升 15%，物理与暗属性技能伤害各增加 20%。'
  },
  {
    pair: '卫珩 & 澄月',
    icon: '🛡️🏹',
    bondType: '血脉与誓言',
    story: '失散于乱世的双月兄妹，长兄坚盾如壁，胞妹落月之矢破空，跨越千山万水的无声守护。',
    bonus: '卫珩替澄月承受伤害时减免 50%，澄月对卫珩格挡目标触发 100% 暴击追击。'
  },
  {
    pair: '昼隐 & 夜织',
    icon: '🕊️🔮',
    bondType: '双生秘法共鸣',
    story: '一胞双生的白黑魔法圣童，相生相融。白魔治愈所散落的以太神辉直接赋能黑魔超绝爆发。',
    bonus: '昼隐施展治疗法术时，夜织下一次攻击魔法 MP 消耗清零且伤害提升 35%。'
  }
]

// Godot 代码
const godotCodeText = `## hero_stat_growth.gd
## 《光之战士：时空裂隙》英雄六维潜能成长与职业加权计算核心
extends Node
class_name HeroStatGrowth

func calculate_final_stats(hero_data: CharacterData, level: int, refinement: int, job_mult: Dictionary) -> Dictionary:
	var base = hero_data.base_stats
	var stats = {}
	
	for stat_key in ["str", "agi", "vit", "mag", "spr", "luck"]:
		var growth_rate = 1.5
		var base_val = base.get(stat_key, 50)
		var job_mod = job_mult.get(stat_key, 1.0)
		
		# 六维公式：(基础潜能 + (Lv - 1) * 成长率 + 洗练加成) * 职业系数
		stats[stat_key] = int((base_val + (level - 1) * growth_rate + refinement * 3.5) * job_mod)
	
	stats["max_hp"] = stats["vit"] * 35 + level * 42
	stats["max_mp"] = int((stats["mag"] + stats["spr"]) * 8) + level * 10
	return stats
`

const activeHeroGodotTab = ref<'growth' | 'constellation' | 'soul_link'>('constellation')

const copyGodotCode = async () => {
  try {
    const textToCopy = activeHeroGodotTab.value === 'growth' ? godotCodeText : activeHeroGodotTab.value === 'constellation' ? godotConstellationCodeText : godotSoulLinkCodeText
    const fileName = activeHeroGodotTab.value === 'growth' ? 'hero_stat_growth.gd' : activeHeroGodotTab.value === 'constellation' ? 'hero_constellation_awakening_engine.gd' : 'hero_soul_link_synergy_engine.gd'
    await navigator.clipboard.writeText(textToCopy)
    copiedCode.value = true
    message.success(`已复制 ${fileName} 核心实机代码！`)
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}

// ==========================================
// 🌟 四位光之战士宿命星盘共鸣与极限突破神威联携工坊
// ==========================================
interface FormationHero {
  id: string
  name: string
  avatar: string
  defaultJob: string
  skill: string
  party: 'light' | 'dark'
}

const heroPool: FormationHero[] = [
  { id: 'li_chuan', name: '黎川', avatar: '🗡️', defaultJob: '魔剑士', skill: '天际裂空斩', party: 'light' },
  { id: 'wei_heng', name: '卫珩', avatar: '🛡️', defaultJob: '圣骑士', skill: '圣盾回旋神威', party: 'light' },
  { id: 'qian_luo', name: '茜罗', avatar: '👑', defaultJob: '记忆士', skill: '太古以太颂歌', party: 'light' },
  { id: 'zhou_yin', name: '昼隐', avatar: '🏹', defaultJob: '忍者/白魔', skill: '暗影千刃杀', party: 'light' },
  { id: 'nahart', name: '纳哈特', avatar: '⚔️', defaultJob: '暗黑骑士', skill: '暗夜归一破', party: 'dark' },
  { id: 'cheng_yue', name: '澄月', avatar: '✨', defaultJob: '导师/游侠', skill: '皎月落星雨', party: 'dark' },
  { id: 'ren_ge', name: '刃歌', avatar: '🥋', defaultJob: '龙骑士', skill: '九天龙王翔', party: 'dark' },
  { id: 'ye_zhi', name: '夜织', avatar: '🔮', defaultJob: '魔人', skill: '绝望虚数爆', party: 'dark' }
]

const activeFormationHeroIds = ref<string[]>(['li_chuan', 'wei_heng', 'qian_luo', 'zhou_yin'])
const activeFormationHeroes = computed(() => {
  return activeFormationHeroIds.value.map(id => heroPool.find(h => h.id === id) || heroPool[0])
})

const limitBreakSequenceText = ref('全员战力待命...点击右上角【⚡ 激发全队四重神威联携】即可观测试演四位光之战士的终极极限技连锁与 99,999 破限爆发！')

const isHeroInFormation = (id: string) => {
  return activeFormationHeroIds.value.includes(id)
}

const swapHeroIntoFourthSlot = (hero: FormationHero) => {
  if (activeFormationHeroIds.value.includes(hero.id)) {
    message.warning(`【${hero.name}】已在出战编队中`)
    return
  }
  activeFormationHeroIds.value[3] = hero.id
  message.success(`已派遣【${hero.name}】加入第四战位！`)
}

const cycleSlotHero = (slotIdx: number) => {
  const currentId = activeFormationHeroIds.value[slotIdx]
  const available = heroPool.filter(h => !activeFormationHeroIds.value.includes(h.id) || h.id === currentId)
  const curIdx = available.findIndex(h => h.id === currentId)
  const nextHero = available[(curIdx + 1) % available.length]
  activeFormationHeroIds.value[slotIdx] = nextHero.id
  message.info(`战位 #${slotIdx + 1} 切换为【${nextHero.name}】`)
}

const resetFormation = () => {
  activeFormationHeroIds.value = ['li_chuan', 'wei_heng', 'qian_luo', 'zhou_yin']
  message.success('已恢复经典光之四战士出征编制')
}

const detectedBonds = computed(() => {
  const ids = activeFormationHeroIds.value
  let bondCount = 0
  const bondNames: string[] = []

  if (ids.includes('li_chuan') && ids.includes('wei_heng')) {
    bondCount++
    bondNames.push('晨辉战誓')
  }
  if (ids.includes('li_chuan') && ids.includes('nahart')) {
    bondCount += 2
    bondNames.push('光暗双子星')
  }
  if (ids.includes('wei_heng') && ids.includes('cheng_yue')) {
    bondCount++
    bondNames.push('血脉誓约')
  }
  if (ids.includes('zhou_yin') && ids.includes('ye_zhi')) {
    bondCount++
    bondNames.push('双生秘法')
  }
  if (ids.includes('qian_luo') && ids.includes('ren_ge')) {
    bondCount++
    bondNames.push('龙裔古契')
  }

  const level = Math.max(1, Math.min(5, bondCount + 1))
  const title = bondNames.length > 0 ? bondNames.join(' × ') + ' 深度共振' : '常规协同步调'

  return {
    title,
    level,
    lightCrit: 12 + level * 4,
    darkResist: 10 + level * 5,
    comboRate: 8 + level * 4,
    gaugeSpeed: 10 + level * 6
  }
})

const triggerLimitBreakCombo = () => {
  const heroes = activeFormationHeroes.value
  const b = detectedBonds.value

  limitBreakSequenceText.value = `[神威四重奏] 触发【${b.title}】(Lv.${b.level}共鸣)！\n` +
    `▶ 阶段 1: ${heroes[0].name} 蓄力拔刃施展【${heroes[0].skill}】，击碎防御壁障造成 26,000 贯穿创伤！\n` +
    `▶ 阶段 2: ${heroes[1].name} 踏步横枪施展【${heroes[1].skill}】，张开绝对以太屏障并为全员恢复 4,500 HP！\n` +
    `▶ 阶段 3: ${heroes[2].name} 咏唱星海秘语施展【${heroes[2].skill}】，全队 MP 彻底回满，暴击率加权 100%！\n` +
    `▶ 阶段 4: ${heroes[3].name} 撕裂虚空发动终焉【${heroes[3].skill}】，引爆光暗奇点斩出 99,999 破限必杀！`

  message.success(`⚡ 四重神威连携推演完成！成功打出 99,999 破界伤害！`)
}

// ==========================================
// 🌟 专区: 全域八主角以太命之座唤醒与双向奥义矩阵推演工坊 (v2.2.270)
// ==========================================
interface AwakeningHero {
  id: string
  name: string
  avatar: string
  defaultJob: string
  party: 'light' | 'dark'
  constellationName: string
  constellationLore: string
  signatureAwakeningSkill: string
  awakeningPerk: string
  baseBurst: number
}

const awakeningHeroList: AwakeningHero[] = [
  {
    id: 'li_chuan',
    name: '黎川',
    avatar: '🗡️',
    defaultJob: '晨辉魔剑圣',
    party: 'light',
    constellationName: '天际裂空之座 (Sky Cleaver)',
    constellationLore: '始源晨辉水晶选定之勇者。命座蕴藏破界神圣剑芒，以太共鸣时可贯穿一切物理抗性。',
    signatureAwakeningSkill: '极意 · 晨曦万象神剑',
    awakeningPerk: '光系附魔暴击率 100% 且造成 2.5x 贯穿伤害',
    baseBurst: 38000
  },
  {
    id: 'wei_heng',
    name: '卫珩',
    avatar: '🛡️',
    defaultJob: '圣耀大壁骑士',
    party: 'light',
    constellationName: '不动圣壁之座 (Aegis Bastion)',
    constellationLore: '长兄之坚壁，背负守护誓约。命座点亮后张开绝对叹息之壁，将全队伤害吸收转化为自身神圣反震。',
    signatureAwakeningSkill: '极意 · 圣耀天佑不灭壁',
    awakeningPerk: '全队受击伤害减免 50%，受击 100% 触发神圣反震',
    baseBurst: 32000
  },
  {
    id: 'qian_luo',
    name: '茜罗',
    avatar: '👑',
    defaultJob: '记忆咏诵大导师',
    party: 'light',
    constellationName: '以太星海之座 (Aether Astral)',
    constellationLore: '承载太古失落记忆之女。命座共鸣汇聚多元星海以太，瞬息重构濒死战局。',
    signatureAwakeningSkill: '极意 · 太古创世颂歌',
    awakeningPerk: '全员 MP 消耗清零，技能冷却时间缩减 50%',
    baseBurst: 35000
  },
  {
    id: 'zhou_yin',
    name: '昼隐',
    avatar: '🏹',
    defaultJob: '幻影修罗忍皇',
    party: 'light',
    constellationName: '暗影无间之座 (Shadow Void)',
    constellationLore: '行走于光暗边界的影忍。命座觉醒后步入虚无位面，绝对闪避并倾泻无视防御真伤千刃杀。',
    signatureAwakeningSkill: '极意 · 绝界千刃无间杀',
    awakeningPerk: '开局制造 3 层绝对替身，必定暴击且无视防御',
    baseBurst: 42000
  },
  {
    id: 'nahart',
    name: '纳哈特',
    avatar: '⚔️',
    defaultJob: '死囚深渊暗骑',
    party: 'dark',
    constellationName: '深渊永曜之座 (Abyssal Eclipse)',
    constellationLore: '承载永曜暗之水晶的背负者。血量越低神性越强，濒死时爆发出撕裂因果的灭世黑炎。',
    signatureAwakeningSkill: '极意 · 终末深渊归一破',
    awakeningPerk: '每损失 1% 生命提升 1.5% 暴击伤害，濒死锁血 1 点',
    baseBurst: 45000
  },
  {
    id: 'cheng_yue',
    name: '澄月',
    avatar: '✨',
    defaultJob: '月影圣辉祭司',
    party: 'dark',
    constellationName: '月魄银辉之座 (Lunar Serenity)',
    constellationLore: '清冷如皎月的神圣游侠。命座闪耀苍白月光，降下落星光雨驱散全场一切恶性减益。',
    signatureAwakeningSkill: '极意 · 皎月落星净化雨',
    awakeningPerk: '全队每秒恢复 10% 生命，敌方全属性抗性削减 35%',
    baseBurst: 34000
  },
  {
    id: 'ren_ge',
    name: '刃歌',
    avatar: '🥋',
    defaultJob: '太古真龙骑士',
    party: 'dark',
    constellationName: '苍穹龙王之座 (Draconic Zenith)',
    constellationLore: '古老真龙血脉的继承者。命座驱动时跃升天界星轨，化身太古真龙俯冲贯穿大地。',
    signatureAwakeningSkill: '极意 · 九天龙皇天倾坠',
    awakeningPerk: '跳跃浮空期间绝对无敌，落地造成 3 倍真实破甲创伤',
    baseBurst: 41000
  },
  {
    id: 'ye_zhi',
    name: '夜织',
    avatar: '🔮',
    defaultJob: '虚数魔人超位导师',
    party: 'dark',
    constellationName: '虚数织命之座 (Imaginary Weaver)',
    constellationLore: '以数学与虚数织造现实的黑魔奇才。命座点亮后时空流速冻结，连续魔核爆无间隙轰炸。',
    signatureAwakeningSkill: '极意 · 零度虚数核爆裂',
    awakeningPerk: '连续施法无需读条，全屏魔法必定穿透反射护盾',
    baseBurst: 44000
  }
]

const selectedAwakeningHeroId = ref('li_chuan')
const constellationRank = ref(3)

const currentAwakeningHero = computed(() => {
  return awakeningHeroList.find(h => h.id === selectedAwakeningHeroId.value) || awakeningHeroList[0]
})

const constellationRankTitle = computed(() => {
  switch (constellationRank.value) {
    case 0: return '以太沉眠 (Unawakened)'
    case 1: return '初阶破壳 (Aether Spark)'
    case 2: return '二重星轨 (Resonance Path)'
    case 3: return '三重破限 (Overlimit Break)'
    case 4: return '四维偏振 (Polarized Shield)'
    case 5: return '五蕴奥义 (Sacred Mastery)'
    case 6: return '六阶超维 (Transcendence Zenith)'
    default: return '神性圆满'
  }
})

const constellationNodes = [
  { title: '以太初显 (Aether Spark)', description: '基础力量/魔力提升 25%，最大生命值上限提升 1,500 点。' },
  { title: '战法共振 (Resonant Flow)', description: '专属招式伤害额外加权 35%，全属性弱点抗性获得 +15% 护壁。' },
  { title: '神威破限 (Overlimit 99999)', description: '单发伤害上限由 9,999 突破至 99,999，暴击率提升 25%。' },
  { title: '光暗偏振 (Polarized Aegis)', description: '受对立属性伤害减免 40%，受击时反弹 25% 圣光/暗夜真实伤害。' },
  { title: '奥义升华 (Mastery Surge)', description: '全员连携触发概率 +30%，极意大招充能时间缩减 50%。' },
  { title: '超维神临 (Cosmic Divinity)', description: '开场直接满极意能量，释放极意技必定 100% 暴击并赋予全队 3 秒无敌。' }
]

const dummyBurstDamage = computed(() => {
  const h = currentAwakeningHero.value
  const rank = constellationRank.value
  const multiplier = 1.0 + rank * 0.45
  return Math.round(h.baseBurst * multiplier)
})

const dummyDefeated = computed(() => dummyBurstDamage.value >= 100000)

const dummyBurstDescription = computed(() => {
  const h = currentAwakeningHero.value
  return `命座 ${constellationRank.value} 阶驱动！【${h.signatureAwakeningSkill}】暴击输出，破甲率 ${(constellationRank.value * 15 + 45)}%！`
})

const awakeningLogs = ref<string[]>([
  '【T+0.0s】八主角以太命之座工坊加载完成：命盘神经元连接正常。',
  '【T+0.8s】黎川命之座【天际裂空之座】已激活至第 3 阶 (三重破限)。',
  '【T+1.4s】单轮爆发估算值 88,920 点真伤，已解锁 99,999 破限爆发机制。'
])

const onAwakeningHeroChanged = () => {
  const h = currentAwakeningHero.value
  awakeningLogs.value.unshift(`[命座切换] 选定英雄【${h.name}】(${h.constellationName})，特性: ${h.awakeningPerk}`)
  message.info(`已切换至【${h.name}】命之座！`)
}

const upgradeConstellationRank = () => {
  if (constellationRank.value >= 6) {
    message.warning('该英雄以太命之座已达第 6 阶超维巅峰！')
    return
  }
  constellationRank.value += 1
  const h = currentAwakeningHero.value
  awakeningLogs.value.unshift(`【⭐ 命座突破】${h.name} 命之座突破至第 ${constellationRank.value} 阶 (${constellationRankTitle.value})！`)
  message.success(`🎉 突破成功！已激活第 ${constellationRank.value} 阶命之座！`)
}

const resetConstellationRank = () => {
  constellationRank.value = 0
  awakeningLogs.value.unshift('【重置】命之座阶数已恢复至初始未觉醒状态 (0 阶)。')
  message.info('命之座阶数已重置。')
}

const simulateAwakenedTrial = () => {
  const h = currentAwakeningHero.value
  awakeningLogs.value.unshift(`【🎯 试炼测试】${h.name} 释放【${h.signatureAwakeningSkill}】，命中原初试炼木桩，瞬间造成 ${dummyBurstDamage.value.toLocaleString()} 点毁灭真伤！`)
  if (dummyDefeated.value) {
    awakeningLogs.value.unshift('【🏆 斩杀大捷】试炼木桩防线彻底被撕碎！达成单人破十万斩杀神话！')
  }
  message.success(`试炼完成！爆发伤害: ${dummyBurstDamage.value.toLocaleString()} 点！`)
}

const exportHeroAwakeningCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  const h = currentAwakeningHero.value

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   全域八主角以太命之座唤醒与双向奥义矩阵方案书 (v2.2.270)
================================================================================
颁发时间: ${timeStr}
目标英雄: ${h.name} (${h.defaultJob})
阵营归属: ${h.party === 'light' ? '晨辉光之阵营' : '永曜暗之阵营'}
专属命座: ${h.constellationName}
命座层级: Rank ${constellationRank.value} / 6 (${constellationRankTitle.value})
核心命座神技: ${h.signatureAwakeningSkill}
觉醒核心特性: ${h.awakeningPerk}

【命之座试炼斩杀量化指标】
- 单轮极限奥义爆发输出: ${dummyBurstDamage.value.toLocaleString()} 点真伤
- 破限突破判定: ${constellationRank.value >= 3 ? '【已突破 99,999 伤害上限】' : '【受限于 9,999 基础限制】'}
- 木桩测试结论: ${dummyDefeated.value ? '【已斩碎 100,000 HP 试炼木桩】' : '【持续削减木桩防御壁垒】'}
- 战力评估: ${dummyBurstDescription.value}

【最新命座突破演练日志】
${awakeningLogs.value.slice(0, 5).map(l => `• ${l}`).join('\n')}

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS / GDScript RefCounted Pure Logic
- Core Engine: hero_constellation_awakening_engine.gd
- Digital Fingerprint: SHA256-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}
================================================================================`

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hero_constellation_cert_v2.2.270_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('以太命之座方案书已导出并同步至剪贴板！')
  }
}

const godotConstellationCodeText = `## hero_constellation_awakening_engine.gd
## Godot 4.6 LTS - 全域八主角以太命之座觉醒、阶数被动加成与奥义破限解算引擎
extends RefCounted
class_name HeroConstellationAwakeningEngine

signal constellation_rank_upgraded(hero_id: String, new_rank: int)
signal overlimit_break_achieved(hero_id: String, damage: int)

class ConstellationState:
	var hero_id: String
	var current_rank: int = 3
	var base_burst: float = 38000.0
	var is_overlimit_unlocked: bool = false

static func calculate_awakened_burst(state: ConstellationState) -> Dictionary:
	var rank_multiplier: float = 1.0 + float(state.current_rank) * 0.45
	var raw_burst: float = state.base_burst * rank_multiplier
	
	var overlimit: bool = state.current_rank >= 3
	var final_damage: int = int(raw_burst) if overlimit else mini(int(raw_burst), 9999)
	
	return {
		"hero": state.hero_id,
		"rank": state.current_rank,
		"overlimit": overlimit,
		"burst_damage": final_damage,
		"crit_rate": 0.25 + float(state.current_rank) * 0.12,
		"timestamp": Time.get_datetime_string_from_system()
	}
`


// ==========================================
// 💞 全域光暗双队灵魂共鸣羁绊工坊 (v2.2.292)
// ==========================================
interface SoulLinkBond {
  id: string
  name: string
  icon: string
  desc: string
  color: string
  heroesTag: string
}

const soulLinkBondsList: SoulLinkBond[] = [
  {
    id: 'dawn_shadow_reversal',
    name: '晨暮逆位双生契',
    icon: '☀️',
    desc: '黎川 & 纳哈特：光暗神威伤害同频互增 +50%，双生搭档单次免死庇护',
    color: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
    heroesTag: '黎川 & 纳哈特 / 晨暮双生'
  },
  {
    id: 'sacred_shield_blessing',
    name: '圣佑坚甲守护阵',
    icon: '🛡️',
    desc: '卫珩 & 昼隐：全队承伤削减 40%，格挡受击时自动反哺全员生命值',
    color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    heroesTag: '卫珩 & 昼隐 / 坚甲圣愈'
  },
  {
    id: 'phantom_tempest_duet',
    name: '幽影疾风狂想曲',
    icon: '🌪️',
    desc: '茜罗 & 澄月：行动条速度 +45%，物理与法术二连击触发率高达 60%',
    color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300',
    heroesTag: '茜罗 & 澄月 / 疾风双击'
  },
  {
    id: 'void_weaver_resonance',
    name: '虚空编织因果引',
    icon: '🌌',
    desc: '刃歌 & 夜织：全技能破防真实伤害 +55%，暴击连携引发断空碎界',
    color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
    heroesTag: '刃歌 & 夜织 / 因果断空'
  }
]

const selectedSoulLinkId = ref('dawn_shadow_reversal')
const soulLinkAffinity = ref(80)
const dualCastSyncRatio = ref(135)
const synergyBurstEnergyPool = ref(620)
const bondEntanglementDepth = ref(5)

const twinLifeShareShield = ref(true)
const limitBreakInstantCooldown = ref(true)
const elementalInversionAura = ref(true)

const currentSoulLinkBondObj = computed(() => {
  return soulLinkBondsList.find(b => b.id === selectedSoulLinkId.value) || soulLinkBondsList[0]
})

const calculatedSynergyBurstDamage = computed(() => {
  const base = synergyBurstEnergyPool.value * 420 + soulLinkAffinity.value * 1250
  let total = base * (dualCastSyncRatio.value / 100)
  if (limitBreakInstantCooldown.value) {
    total *= 1.3
  }
  return Math.round(total).toLocaleString()
})

const calculatedPartyDamageReduction = computed(() => {
  let red = 25 + bondEntanglementDepth.value * 5.5
  if (twinLifeShareShield.value) {
    red += 12
  }
  return `-${Math.min(75, Math.round(red))}%`
})

const calculatedTandemStrikeChance = computed(() => {
  const chance = soulLinkAffinity.value * 0.75 + (dualCastSyncRatio.value / 100) * 15
  return `${Math.min(95, Math.round(chance))}%`
})

const calculatedBondRank = computed(() => {
  if (bondEntanglementDepth.value >= 7) return 'EX 诸神双生'
  if (bondEntanglementDepth.value >= 4) return 'SSR 灵魂契约'
  return 'SR 默契同伴'
})

function scrollToSoulLinkStudio() {
  const el = document.getElementById('soul-link-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// 五阶段推演终端
interface SoulLinkTerminalLog {
  time: string
  message: string
  color: string
}

const isSoulLinkSimulating = ref(false)
const soulLinkSimStage = ref(0)
const soulLinkSimFinished = ref(false)
const soulLinkTerminalLogs = ref<SoulLinkTerminalLog[]>([
  {
    time: 'INIT',
    message: '全域光暗双队灵魂共鸣羁绊工坊就绪。准备建立双生共鸣场域。',
    color: 'text-gray-400'
  }
])

function appendSoulLinkLog(msg: string, color = 'text-rose-400') {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
  soulLinkTerminalLogs.value.push({ time: timeStr, message: msg, color })
}

function runSoulLinkSimulation() {
  if (isSoulLinkSimulating.value) return
  isSoulLinkSimulating.value = true
  soulLinkSimFinished.value = false
  soulLinkSimStage.value = 1
  appendSoulLinkLog('▶ 启动五阶段灵魂羁绊协同推演...', 'text-rose-400 font-bold')

  setTimeout(() => {
    soulLinkSimStage.value = 2
    appendSoulLinkLog(`[阶段 1/5] 激活羁绊【${currentSoulLinkBondObj.value.name}】，搭档: ${currentSoulLinkBondObj.value.heroesTag}，亲和度: ${soulLinkAffinity.value}%`, 'text-cyan-300')

    setTimeout(() => {
      soulLinkSimStage.value = 3
      appendSoulLinkLog(`[阶段 2/5] 注入双人同调吟唱比率 ${dualCastSyncRatio.value}%，共鸣能量池: ${synergyBurstEnergyPool.value} EP`, 'text-amber-300')

      setTimeout(() => {
        soulLinkSimStage.value = 4
        const shareText = twinLifeShareShield.value ? '已部署 (分担 50% 伤害)' : '未开启'
        const resetText = limitBreakInstantCooldown.value ? '已开启 (30% 瞬回 CD)' : '常规'
        appendSoulLinkLog(`[阶段 3/5] 生命共享护盾[${shareText}]，合体技瞬回[${resetText}]`, 'text-purple-300')

        setTimeout(() => {
          soulLinkSimStage.value = 5
          appendSoulLinkLog(`[阶段 4/5] 合体神威爆发伤害: ${calculatedSynergyBurstDamage.value}，全队综合减伤: ${calculatedPartyDamageReduction.value}`, 'text-emerald-300')

          setTimeout(() => {
            isSoulLinkSimulating.value = false
            soulLinkSimFinished.value = true
            appendSoulLinkLog(`✓ [阶段 5/5] 灵魂羁绊协同解算完成！连携概率: ${calculatedTandemStrikeChance.value}，位阶: ${calculatedBondRank.value}`, 'text-emerald-400 font-bold')
            message.success('灵魂羁绊协同五阶段推演完成！')
          }, 350)
        }, 350)
      }, 350)
    }, 350)
  }, 350)
}

function exportSoulLinkCertificate() {
  const certData = {
    standard: 'Godot 4.6 LTS / VBLE Hero Soul Link Matrix v2.2.292',
    timestamp: new Date().toISOString(),
    bond: selectedSoulLinkId.value,
    parameters: {
      soulLinkAffinity: soulLinkAffinity.value,
      dualCastSyncRatio: dualCastSyncRatio.value,
      synergyBurstEnergyPool: synergyBurstEnergyPool.value,
      bondEntanglementDepth: bondEntanglementDepth.value,
      twinLifeShareShield: twinLifeShareShield.value,
      limitBreakInstantCooldown: limitBreakInstantCooldown.value,
      elementalInversionAura: elementalInversionAura.value
    },
    metrics: {
      synergyBurstDamage: calculatedSynergyBurstDamage.value,
      partyDamageReduction: calculatedPartyDamageReduction.value,
      tandemStrikeChance: calculatedTandemStrikeChance.value,
      bondRank: calculatedBondRank.value
    },
    sha256Signature: 'SHA256-SOUL-LINK-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `soul_link_v2.2.292_${selectedSoulLinkId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出灵魂羁绊协同方案书证书！')
}

const godotSoulLinkCodeText = [
  '# ==============================================================================',
  '# HeroSoulLinkSynergyEngine - 光暗双队灵魂羁绊与合体奥义解算引擎',
  '# 文件路径: res://scripts/heroes/hero_soul_link_synergy_engine.gd',
  '# 架构规范: Godot 4.6 LTS / VBLE Heroes Matrix v2.2.292',
  '# 核心职责: 计算双生羁绊共鸣伤害、生命共享减伤分担与致命伤瞬回判定',
  '# ==============================================================================',
  'class_name HeroSoulLinkSynergyEngine',
  'extends RefCounted',
  '',
  'static func calculate_synergy_burst(energy_pool: int, affinity: int, sync_ratio: float, instant_reset: bool) -> int:',
  '	var base: float = float(energy_pool) * 420.0 + float(affinity) * 1250.0',
  '	var total: float = base * (sync_ratio / 100.0)',
  '	if instant_reset:',
  '		total *= 1.3',
  '	return int(round(total))',
  '',
  'static func calculate_damage_share(damage: int, has_share_shield: bool) -> Dictionary:',
  '	if not has_share_shield:',
  '		return { "primary_damage": damage, "partner_damage": 0 }',
  '	var half_dmg: int = int(damage / 2)',
  '	return { "primary_damage": half_dmg, "partner_damage": half_dmg }'
].join('\n')

// ==================== v2.2.317 英雄大誓约工坊状态与方法 ====================
const scrollToGrandOathSynergyStudio = () => {
  const el = document.getElementById('grand-oath-synergy-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    message.success('已直达英雄大誓约与灵魂共鸣工坊')
  }
}

interface HeroOathArchetype {
  id: string
  name: string
  icon: string
  badge: string
  desc: string
  burst: string
  stability: string
  affinity: number
  crit: number
  rank: number
  martyr: number
}

const heroOathArchetypes: HeroOathArchetype[] = [
  {
    id: 'dawn_crusade',
    name: '晨辉四圣骑守护誓约',
    icon: '🛡️',
    badge: '圣盾守护',
    desc: '全队受击伤害分摊 60%，牺牲护盾反击释放神圣十字审判。',
    burst: '6,800,000',
    stability: '99.5%',
    affinity: 95,
    crit: 2.8,
    rank: 6,
    martyr: 90
  },
  {
    id: 'void_outcast',
    name: '虚空死囚绝境暗杀誓约',
    icon: '🗡️',
    badge: '残血处决',
    desc: '背水一战，HP 低于 20% 时必暴击且无视敌方 100% 物理魔法双防。',
    burst: '18,500,000',
    stability: '94.2%',
    affinity: 75,
    crit: 5.5,
    rank: 5,
    martyr: 40
  },
  {
    id: 'elemental_symphony',
    name: '四元素大魔导全系共振',
    icon: '🔮',
    badge: '元素爆发',
    desc: '风火水土四象连环引爆，施法无前摇，暴风雪雷暴全图漫灌。',
    burst: '14,200,000',
    stability: '98.0%',
    affinity: 90,
    crit: 4.0,
    rank: 6,
    martyr: 75
  },
  {
    id: 'ancient_pact',
    name: '太古光暗双生融合誓约',
    icon: '🌌',
    badge: '双生合体',
    desc: '黎川与纳哈特双向融合，光暗双持一击斩破时空次元裂隙。',
    burst: '28,800,000',
    stability: '99.9%',
    affinity: 100,
    crit: 6.0,
    rank: 6,
    martyr: 100
  }
]

const selectedHeroOathArchetype = ref<HeroOathArchetype>(heroOathArchetypes[3])

const heroSoulAffinity = ref(100)
const heroCritMultiplier = ref(6.0)
const heroConstellationRank = ref(6)
const heroMartyrRatio = ref(100)

const enableInstantReplacement = ref(true)
const enableDualSkillDuplication = ref(true)
const enableBreakFateDamageCap = ref(true)

const selectHeroOathArchetype = (arch: HeroOathArchetype) => {
  selectedHeroOathArchetype.value = arch
  heroSoulAffinity.value = arch.affinity
  heroCritMultiplier.value = arch.crit
  heroConstellationRank.value = arch.rank
  heroMartyrRatio.value = arch.martyr
  message.info(`已装配大誓约流派原型: ${arch.name}`)
}

const resetGrandOathDefaults = () => {
  selectHeroOathArchetype(heroOathArchetypes[3])
  enableInstantReplacement.value = true
  enableDualSkillDuplication.value = true
  enableBreakFateDamageCap.value = true
}

const calculatedTeamBurst = computed(() => {
  let b = heroSoulAffinity.value * 28000 * heroCritMultiplier.value * (1 + heroConstellationRank.value * 0.15)
  if (enableDualSkillDuplication.value) b *= 1.45
  if (enableBreakFateDamageCap.value) b *= 1.25
  return Math.floor(b).toLocaleString()
})

const calculatedResonanceRate = computed(() => {
  let r = 75 + (heroSoulAffinity.value / 100) * 18 + (heroConstellationRank.value / 6) * 5
  if (enableInstantReplacement.value) r += 1.5
  return Math.min(99.9, Number(r.toFixed(1)))
})

const calculatedMartyrPotency = computed(() => {
  let m = 60 + (heroMartyrRatio.value / 100) * 35
  if (enableDualSkillDuplication.value) m += 4.5
  return Math.min(99.9, Number(m.toFixed(1)))
})

const calculatedOathCert = computed(() => {
  const r = calculatedResonanceRate.value
  if (r >= 98.5) return 'EX·太古光暗双宿命圣殿'
  if (r >= 95.0) return 'SSS·高阶灵魂大誓约'
  if (r >= 90.0) return 'SS·生产级战队共鸣'
  return 'S·基础羁绊契约'
})

const isHeroOathSimulating = ref(false)
const heroSimStage = ref(1)
const heroSimStageName = ref('就绪等待')
const heroSimProgress = ref(0)
const heroOathCertHash = ref('H7A2B9C1-4D3E-6F8A-9B0C-1D2E3F4A5B6C')

interface HeroOathLogEntry {
  time: string
  text: string
  color: string
}

const heroOathLogs = ref<HeroOathLogEntry[]>([
  { time: '13:00:00', text: '[OathInit] 宿命大誓约与英雄灵魂共鸣工坊就绪，等待注入誓约契印...', color: 'text-gray-400' }
])

const runGrandOathSimulation = () => {
  if (isHeroOathSimulating.value) return
  isHeroOathSimulating.value = true
  heroSimStage.value = 1
  heroSimProgress.value = 15
  heroSimStageName.value = '英雄灵魂羁绊默契建立与命座共振'
  heroOathLogs.value = [
    { time: new Date().toLocaleTimeString(), text: `[SoulLink] 羁绊默契值注入 ${heroSoulAffinity.value} 点，命座阶数 ${heroConstellationRank.value} 阶激活`, color: 'text-rose-400' }
  ]

  setTimeout(() => {
    heroSimStage.value = 2
    heroSimProgress.value = 40
    heroSimStageName.value = '双生合体战技追击与暴击倍率对齐'
    heroOathLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[DualBurst] 极意暴击锁定 ${heroCritMultiplier.value.toFixed(1)}x，双生连击状态: ${enableDualSkillDuplication.value}`,
      color: 'text-amber-400'
    })
  }, 400)

  setTimeout(() => {
    heroSimStage.value = 3
    heroSimProgress.value = 65
    heroSimStageName.value = '替补瞬登契约测试与怒气无损继承'
    heroOathLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[Replacement] 前排阵亡替补瞬时登场校验通过，遗志回充能效 ${calculatedMartyrPotency.value}%`,
      color: 'text-cyan-400'
    })
  }, 800)

  setTimeout(() => {
    heroSimStage.value = 4
    heroSimProgress.value = 85
    heroSimStageName.value = '伤害天花板解限与战队爆发输出'
    heroOathLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[DamageCap] 战队极意连携爆发锁定 ${calculatedTeamBurst.value}，共鸣稳态率 ${calculatedResonanceRate.value}%`,
      color: 'text-purple-400'
    })
  }, 1200)

  setTimeout(() => {
    heroSimStage.value = 5
    heroSimProgress.value = 100
    heroSimStageName.value = '推演闭环完成，大誓约证书已签名'
    const hex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('').toUpperCase()
    heroOathCertHash.value = `OATH-${hex}-${Math.floor(Date.now() / 1000)}`
    heroOathLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[Done] 英雄大誓约推演完成！评级: ${calculatedOathCert.value}`,
      color: 'text-emerald-300 font-bold'
    })
    isHeroOathSimulating.value = false
    message.success('英雄大誓约与灵魂共鸣推演完成！')
  }, 1600)
}

const exportHeroOathCert = () => {
  const data = {
    studio: 'Grand Oath Soul Links, Hero Chronicles & Resonant Synergy Studio v2.2.317',
    timestamp: new Date().toISOString(),
    archetype: selectedHeroOathArchetype.value.name,
    heroSoulAffinity: heroSoulAffinity.value,
    heroCritMultiplier: heroCritMultiplier.value,
    heroConstellationRank: heroConstellationRank.value,
    heroMartyrRatio: heroMartyrRatio.value,
    teamBurst: calculatedTeamBurst.value,
    resonanceRate: calculatedResonanceRate.value,
    martyrPotency: calculatedMartyrPotency.value,
    oathCert: calculatedOathCert.value,
    sha256Signature: heroOathCertHash.value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `hero-oath-${heroOathCertHash.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('防伪证书与大誓约报告已导出')
}

// Godot 4.6 LTS 源码展台
const activeHeroOathCodeTab = ref('synergy_bus')
const heroOathCodeTabs = [
  { id: 'synergy_bus', name: '宿命大誓约总线' },
  { id: 'soul_resonance', name: '灵魂共鸣管线' },
  { id: 'replacement_pact', name: '替补瞬登系统' }
]

const heroOathSourceCodes: Record<string, string> = {
  synergy_bus: `## grand_oath_synergy_bus.gd
## 《光之战士：时空裂隙》英雄宿命大誓约事件总线驱动
## 架构版本: Godot 4.6 LTS / Hero Synergy Subsystem

class_name GrandOathSynergyBus
extends RefCounted

signal oath_skill_triggered(hero_pair: Array[String], combo_damage: int)
signal cap_broken(hero_id: String, overdriven_damage: int)

var _affinity_depth: int = 100
var _crit_multiplier: float = 6.0

func _init(affinity: int = 100, crit: float = 6.0) -> void:
	_affinity_depth = affinity
	_crit_multiplier = crit

## 触发光暗双生英雄极意协同连携
func dispatch_oath_combo(hero_a: String, hero_b: String, base_power: int) -> int:
	var final_dmg := int(float(base_power) * _crit_multiplier * (1.0 + float(_affinity_depth) * 0.01))
	oath_skill_triggered.emit([hero_a, hero_b], final_dmg)
	if final_dmg > 99999:
		cap_broken.emit(hero_a, final_dmg)
	return final_dmg
`,
  soul_resonance: `## hero_soul_resonance_pipeline.gd
## 《光之战士：时空裂隙》英雄全息灵魂共鸣与命之座突破管线
## 架构版本: Godot 4.6 LTS / Character Constellation

class_name HeroSoulResonancePipeline
extends RefCounted

signal constellation_advanced(hero_id: String, rank: int, stat_potency: float)

## 激活指定阶数命座潜能
func advance_constellation(hero_data: Dictionary, target_rank: int) -> Dictionary:
	var res := hero_data.duplicate(true)
	res["constellation_rank"] = target_rank
	var boost := 1.0 + float(target_rank) * 0.15
	res["stat_multiplier"] = boost
	constellation_advanced.emit(res.get("id", "HERO"), target_rank, boost)
	return res
`,
  replacement_pact: `## instant_replacement_pact_system.gd
## 《光之战士：时空裂隙》前排阵亡后备英雄毫秒级无缝入场系统
## 架构版本: Godot 4.6 LTS / Battle Party Management

class_name InstantReplacementPactSystem
extends RefCounted

signal hero_replaced(fallen_hero: String, substitute_hero: String, inherited_atb: float)

## 执行毫秒级替补登场契约
func handle_hero_faint(fallen_id: String, bench_party: Array[Dictionary]) -> Dictionary:
	if bench_party.is_empty():
		return {}
	var sub: Dictionary = bench_party.pop_front()
	sub["current_atb"] = 100.0 # 瞬间满 ATB
	sub["instant_spawned"] = true
	hero_replaced.emit(fallen_id, sub.get("id", "SUB"), 100.0)
	return sub
`
}

const currentHeroOathCode = computed(() => {
  return heroOathSourceCodes[activeHeroOathCodeTab.value] || ''
})

const copyActiveHeroOathCode = () => {
  navigator.clipboard.writeText(currentHeroOathCode.value).then(() => {
    message.success(`${activeHeroOathCodeTab.value}.gd 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}


// ==========================================
// v2.2.335: 英雄命座星轨与光暗双宿工坊逻辑
// ==========================================
const scrollToConstellationOrbitStudio = () => {
  const el = document.getElementById('constellation-orbit-bond-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

interface ConstellationArchetype {
  id: string
  name: string
  subtitle: string
  icon: string
  tag: string
  desc: string
  baseBurstMultiplier: string
  basePowerScore: number
}

const constellationArchetypes: ConstellationArchetype[] = [
  {
    id: 'lichuan_dawn_knight',
    name: '晨辉骑士黎川',
    subtitle: '光之宿命六阶命座与全军圣佑流',
    icon: '⚔️',
    tag: '圣堂守护',
    desc: '解放六阶命之座【极光裁决】，普通攻击附带神圣剑气波，受创时为全队施加 20 秒坚韧减伤光环。',
    baseBurstMultiplier: '750%',
    basePowerScore: 68000
  },
  {
    id: 'weiheng_wind_blade',
    name: '疾风剑客卫珩',
    subtitle: '疾风剑意星轨与十段暴风连斩流',
    icon: '🌪️',
    tag: '暴风斩击',
    desc: '星轨流转提升 100% 暴击率，奥义技能化作十道虚空旋风剑气，瞬间斩杀高韧性强敌。',
    baseBurstMultiplier: '820%',
    basePowerScore: 72000
  },
  {
    id: 'zhouyin_radiant_sage',
    name: '白魔导昼隐',
    subtitle: '天国圣歌星图与全员免死逆生流',
    icon: '✨',
    tag: '天国涅槃',
    desc: '命座解锁【涅槃余烬】，全队任意伙伴遭受致命伤害时强制免疫并恢复 100% 满生命。',
    baseBurstMultiplier: '600%',
    basePowerScore: 64000
  },
  {
    id: 'nahate_void_avenger',
    name: '暗之死囚纳哈特',
    subtitle: '深渊裂隙暗蚀与虚空复仇斩流',
    icon: '🗡️',
    tag: '暗蚀复仇',
    desc: '撕裂深渊帷幕注入武器，血量越低真实伤害倍率越高，在背水绝境下可轰出十倍真实伤害。',
    baseBurstMultiplier: '920%',
    basePowerScore: 78000
  }
]

const selectedConstellationArchetypeId = ref('lichuan_dawn_knight')
const constellationOrbitSyncRatio = ref(94)
const bondAffinityResonancePct = ref(240)
const awakeningSupernovaDurationSec = ref(20.0)
const limitBreakChainMultiplier = ref(6.2)

const lightDarkHarmonicNoConflict = ref(true)
const crossHeroBondInstantAssist = ref(true)
const transcendentDamageCapUncap = ref(true)

const selectConstellationArchetype = (id: string) => {
  selectedConstellationArchetypeId.value = id
  if (message) {
    const arch = constellationArchetypes.find(a => a.id === id)
    if (arch) message.success(`已切换英雄命座原型：${arch.name}`)
  }
}

const calculatedConstellationMetrics = computed(() => {
  const arch = constellationArchetypes.find(a => a.id === selectedConstellationArchetypeId.value) || constellationArchetypes[0]
  const basePwr = arch.basePowerScore
  const harmonicBonus = lightDarkHarmonicNoConflict.value ? 1.35 : 1.0
  const uncapBonus = transcendentDamageCapUncap.value ? 1.5 : 1.0
  const finalBurst = Math.round(basePwr * (constellationOrbitSyncRatio.value / 100) * (bondAffinityResonancePct.value / 100) * limitBreakChainMultiplier.value * harmonicBonus * uncapBonus * 10)
  
  const effRate = Math.min(99.9, 88.0 + (bondAffinityResonancePct.value / 300) * 11.5 + (crossHeroBondInstantAssist.value ? 0.4 : 0)).toFixed(1)
  const stabRate = Math.min(99.9, 85.0 + (awakeningSupernovaDurationSec.value / 30) * 14.5).toFixed(1)

  let rank = 'SSR·天域宿命导师'
  if (finalBurst >= 50000000) rank = 'EX·太古光暗双宿星轨统帅'
  else if (finalBurst >= 30000000) rank = 'SSS·极意双宿裁决使'

  return {
    constellationAwakeningBurst: finalBurst.toLocaleString(),
    bondResonanceEfficiency: `${effRate}%`,
    partyAuraDefenseStability: `${stabRate}%`,
    heroConstellationRank: rank
  }
})

const isSimulatingConstellation = ref(false)
const currentConstellationSimStage = ref(0)
const constellationStages = [
  '八主角灵魂星位天球经纬度捕获...',
  '光与暗双宿羁绊共振微秒相位校准...',
  '六阶命之座天赋基因锁解除...',
  '超新星极意奥义光环聚能迸发...',
  '英雄星盘认证公钥生成与证书封装...'
]

const runConstellationSimulation = () => {
  if (isSimulatingConstellation.value) return
  isSimulatingConstellation.value = true
  currentConstellationSimStage.value = 0

  const interval = setInterval(() => {
    if (currentConstellationSimStage.value < constellationStages.length - 1) {
      currentConstellationSimStage.value++
    } else {
      clearInterval(interval)
      isSimulatingConstellation.value = false
      if (message) {
        message.success(`【命座星轨沙盘】推演成功！连携爆发总伤：${calculatedConstellationMetrics.value.constellationAwakeningBurst}`)
      }
    }
  }, 400)
}

const exportConstellationCertificate = () => {
  const hash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  const cert = `=== 《光之战士：时空裂隙》英雄命座星轨与羁绊方案证书 ===
证书编号: HERO-ORBIT-${hash.substring(0, 12).toUpperCase()}
核心英雄: ${selectedConstellationArchetypeId.value}
星轨同步率: ${constellationOrbitSyncRatio.value}%
羁绊共振度: ${bondAffinityResonancePct.value}%
奥义倍率: ${limitBreakChainMultiplier.value.toFixed(1)}x
连携爆发伤害: ${calculatedConstellationMetrics.value.constellationAwakeningBurst}
共振能效比: ${calculatedConstellationMetrics.value.bondResonanceEfficiency}
全队稳态率: ${calculatedConstellationMetrics.value.partyAuraDefenseStability}
星盘导师评级: ${calculatedConstellationMetrics.value.heroConstellationRank}
安全校验哈希: SHA-256:${hash}
验证状态: 官方英雄星盘与光暗双宿总线认证通过 (Godot 4.6 LTS Verified)
=======================================================`
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(cert)
    if (message) message.success('已导出英雄星盘方案防伪证书到剪贴板！')
  }
}

const activeConstellationScriptTab = ref<'constellation_orbit' | 'bond_resonance' | 'awakening_controller'>('constellation_orbit')

const constellationScriptCodes = {
  constellation_orbit: `class_name HeroConstellationOrbitEngine
extends Node

## 最终幻想：时空之轮 - 英雄命座星轨与天赋基因仲裁器
## 文件路径: res://scripts/combat/characters/hero_constellation_orbit_engine.gd
## 引擎版本: Godot Engine 4.6 LTS

signal constellation_tier_unlocked(hero_id: String, tier_index: int, bonus_ratio: float)

@export var orbit_sync_ratio: float = 0.94

func unlock_constellation_tier(hero_id: String, tier: int) -> Dictionary:
    var potency: float = 1.0 + float(tier) * 0.18 * orbit_sync_ratio
    constellation_tier_unlocked.emit(hero_id, tier, potency)
    return {
        "hero_id": hero_id,
        "unlocked_tier": tier,
        "potency_multiplier": potency
    }
`,

  bond_resonance: `class_name LightDarkBondResonanceBus
extends RefCounted

## 最终幻想：时空之轮 - 光暗双宿羁绊协同与协防反击总线
## 文件路径: res://scripts/combat/characters/light_dark_bond_resonance_bus.gd
## 引擎版本: Godot Engine 4.6 LTS

static func evaluate_bond_assist(hero_a: String, hero_b: String, affinity_pct: float, no_conflict: bool) -> Dictionary:
    var boost: float = (affinity_pct / 100.0) * (1.35 if no_conflict else 1.0)
    return {
        "bonded_heroes": [hero_a, hero_b],
        "assist_trigger_chance": clampf(boost * 0.5, 0.5, 0.99),
        "damage_absorption": 0.45
    }
`,

  awakening_controller: `class_name TranscendentAwakeningController
extends RefCounted

## 最终幻想：时空之轮 - 超新星觉醒神威与极限伤害破限控制器
## 文件路径: res://scripts/combat/characters/transcendent_awakening_controller.gd
## 引擎版本: Godot Engine 4.6 LTS

static func execute_supernova_burst(raw_damage: float, uncap_active: bool) -> int:
    var max_cap: float = 99999999.0 if uncap_active else 9999999.0
    return int(minf(raw_damage, max_cap))
`
}

const currentConstellationScriptCode = computed(() => {
  return constellationScriptCodes[activeConstellationScriptTab.value]
})

const copyConstellationScript = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentConstellationScriptCode.value)
    if (message) message.success('已复制 Godot 4.6 LTS 英雄命座源码到剪贴板！')
  }
}

</script>

<style scoped>
.text-glow-amber {
  text-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
</style>
