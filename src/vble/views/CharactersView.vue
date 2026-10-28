<template>
  <div class="characters-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-indigo-950/80 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              VBLE Heroes &amp; Limit Break Resonance Matrix v2.2.270
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

        <!-- 底部快捷推演按钮 -->
        <div class="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-[11px] text-gray-500">ID: {{ char.id }}</span>
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
            :class="selectedHeroId === char.id ? 'bg-amber-400 text-slate-950 font-bold shadow-md' : 'bg-slate-800 text-amber-300 hover:bg-slate-750 border border-slate-700'"
            @click="selectHeroForSimulation(char.id)"
          >
            <span>{{ selectedHeroId === char.id ? '✓ 正在推演' : '📊 载入属性沙盘' }}</span>
          </button>
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
          </div>
          <n-button size="tiny" secondary type="warning" @click="copyGodotCode">
            {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
          </n-button>
        </div>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-56 custom-scrollbar"><code v-if="activeHeroGodotTab === 'growth'">{{ godotCodeText }}</code><code v-else>{{ godotConstellationCodeText }}</code></pre>
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

const activeHeroGodotTab = ref<'growth' | 'constellation'>('constellation')

const copyGodotCode = async () => {
  try {
    const textToCopy = activeHeroGodotTab.value === 'growth' ? godotCodeText : godotConstellationCodeText
    const fileName = activeHeroGodotTab.value === 'growth' ? 'hero_stat_growth.gd' : 'hero_constellation_awakening_engine.gd'
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

</script>

<style scoped>
.text-glow-amber {
  text-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
</style>
