<template>
  <div class="characters-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-indigo-950/80 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              HEROES & PROTAGONISTS
            </span>
            <span class="text-xs text-gray-400">光与暗的双子星宿命誓约</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>👥</span> 英雄传记：光与暗的宿命誓约与六维潜能工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            晨辉骑士黎川、卫珩、白魔导昼隐、以及暗之死囚纳哈特等英雄的核心属性、宿命、官方对话立绘与终极职能。全息实装角色六维潜能成长与职业转职契合度沙盘。
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

    <!-- Godot 4.x 核心实机代码展台 -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-amber-300">hero_stat_growth.gd (Godot 4.x 六维潜能与转职加乘算法)</span>
        </div>
        <n-button size="tiny" secondary type="warning" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900">{{ godotCodeText }}</pre>
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

const copyGodotCode = async () => {
  try {
    await navigator.clipboard.writeText(godotCodeText)
    copiedCode.value = true
    message.success('已复制 hero_stat_growth.gd 核心实机代码！')
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

</script>

<style scoped>
.text-glow-amber {
  text-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
</style>
