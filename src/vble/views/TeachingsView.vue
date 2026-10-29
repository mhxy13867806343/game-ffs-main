<template>
  <div class="teachings-page max-w-7xl mx-auto space-y-8 px-3 sm:px-6 py-4">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-cyan-950/70 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.2)] relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/3 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              VBLE Teachings, Novice Onboarding & Master Mentorship Studio v2.2.312
            </span>
            <span class="text-xs text-gray-400">四大流派秘传与魔物拟态研习</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>✨</span> 秘传绝技研习院：四大流派、青魔法与太古导师试炼工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
            融汇勇者圣所舍身庇护、米西迪亚太古双魔禁术、东洋忍法五遁奥义与青魔法学院魔物肉身拟态。支持实机伤害数值结算与魔物拟态捕获全图鉴推演。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="error"
            size="medium"
            round
            class="shadow-md font-bold text-black bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400"
            @click="scrollToNoviceMentorshipStudio"
          >
            <template #icon><span>🎓</span></template>
            初心导引与名师工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToMentorTrialStudio"
          >
            <template #icon><span>📜</span></template>
            太古导师试炼工坊
          </n-button>
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToMysidiaFusionStudio"
          >
            <template #icon><span>🔮</span></template>
            太古白黑禁术工坊
          </n-button>
          <router-link to="/vble/jobs">
            <n-button type="info" size="medium" round secondary class="shadow-md">
              <template #icon><span>⚔️</span></template>
              28大职业矩阵
            </n-button>
          </router-link>
          <router-link to="/vble/monsters">
            <n-button type="warning" size="medium" round secondary class="shadow-md">
              <template #icon><span>👾</span></template>
              魔物与首领
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

    <!-- 交互式研习台切换 Tabs -->
    <div class="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
      <button
        v-for="tab in tabList"
        :key="tab.key"
        type="button"
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
        :class="activeViewTab === tab.key
          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]'
          : 'bg-slate-900 text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-800'"
        @click="activeViewTab = tab.key"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.badge"
          class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-500 text-slate-950 font-bold"
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <!-- 视图 1: 秘传绝技卡片全典 -->
    <div v-if="activeViewTab === 'catalog'" class="space-y-6">
      <!-- 分类筛选器 -->
      <div class="flex flex-wrap gap-2 justify-center" role="group" aria-label="秘传绝技分类">
        <n-button
          v-for="cat in categories"
          :key="cat.id"
          class="teaching-category-button"
          size="small"
          :aria-pressed="activeCategory === cat.id"
          :type="activeCategory === cat.id ? 'primary' : 'default'"
          secondary
          @click="activeCategory = cat.id"
        >
          {{ cat.name }} ({{ cat.count }})
        </n-button>
      </div>

      <!-- 技能卡片列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <n-card
          v-for="tech in filteredTeachings"
          :key="tech.id"
          hoverable
          class="border border-slate-700/60 bg-[#121626]/90 rounded-xl transition-all duration-300 hover:border-cyan-500/50"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-base font-bold text-cyan-300">{{ tech.name }}</span>
              <n-tag size="small" :type="getTagType(tech.category)">
                {{ tech.categoryName }}
              </n-tag>
            </div>
          </template>

          <div class="space-y-3.5 text-sm">
            <!-- 导师与消耗 -->
            <div class="grid grid-cols-2 gap-2 text-xs text-gray-400 bg-slate-900/80 p-2.5 rounded border border-slate-800">
              <div>传授导师: <strong class="text-gray-200">{{ tech.mentor }}</strong></div>
              <div>消耗代价: <strong class="text-amber-400">{{ tech.cost }}</strong></div>
              <div>施法速度: <strong class="text-sky-300">{{ tech.castSpeed }}</strong></div>
              <div>元素属性: <strong class="text-purple-300">{{ tech.element }}</strong></div>
            </div>

            <!-- 效能描述 -->
            <div class="p-3 bg-slate-900/90 rounded border border-slate-800 space-y-1.5">
              <div class="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                <span>⚡</span> 绝技实战效能:
              </div>
              <div class="text-xs text-gray-300 leading-relaxed">{{ tech.effect }}</div>
            </div>

            <!-- 数值公式 -->
            <div class="p-2.5 bg-blue-950/20 border border-blue-900/40 rounded space-y-1">
              <div class="text-xs text-blue-300 font-mono font-semibold flex items-center gap-1">
                <span>📐</span> 数值与算法结算:
              </div>
              <div class="text-[11px] font-mono text-gray-300 leading-relaxed">{{ tech.formula }}</div>
            </div>

            <!-- 战术建议 -->
            <div class="p-2.5 bg-amber-950/20 border border-amber-900/40 rounded space-y-1">
              <div class="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <span>🎯</span> 实战战术指引:
              </div>
              <div class="text-xs text-gray-300 leading-relaxed">{{ tech.tactics }}</div>
            </div>

            <!-- 背景逸闻 -->
            <div class="text-xs text-purple-300/80 italic border-l-2 border-purple-500/50 pl-2.5 py-0.5">
              "{{ tech.lore }}"
            </div>

            <!-- 研习模拟入口 -->
            <div class="pt-2 flex justify-end">
              <n-button size="tiny" type="primary" secondary @click="launchSimulator(tech)">
                前往演练台推演 ➔
              </n-button>
            </div>
          </div>
        </n-card>
      </div>
    </div>

    <!-- 视图 2: 青魔法魔物捕获与拟态图鉴沙盘 -->
    <div v-if="activeViewTab === 'bluemagic_matrix'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>👾</span> 青魔法拟态捕获全图鉴沙盘 (Blue Magic Learning Matrix)
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              青魔道士的核心灵魂——通过肉身硬抗魔物绝招或借助魔兽使操纵使其对自己施放，记录 12 大经典青魔法的来源魔物、生还习得条件与实机战术价值。
            </p>
          </div>
          <span class="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
            已收录 12 大经典青魔法
          </span>
        </div>

        <!-- 青魔法全景矩阵卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="spell in blueMagicDatabase"
            :key="spell.id"
            class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between gap-2">
                <span class="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
                  <span>{{ spell.icon }}</span>
                  <span>{{ spell.name }}</span>
                </span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  {{ spell.mpCost }} MP
                </span>
              </div>

              <div class="p-2.5 bg-slate-900/60 rounded border border-slate-800/80 text-xs space-y-1">
                <div class="text-gray-400">来源魔物: <strong class="text-emerald-300">{{ spell.sourceMonster }}</strong></div>
                <div class="text-gray-400">出没场景: <span class="text-cyan-400">{{ spell.location }}</span></div>
                <div class="text-gray-400">习得方式: <span class="text-amber-300">{{ spell.learningMethod }}</span></div>
              </div>

              <p class="text-xs text-gray-300 leading-relaxed">{{ spell.effect }}</p>
            </div>

            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span class="text-gray-500 font-mono text-[11px]">{{ spell.code }}</span>
              <n-tag size="tiny" :type="spell.tierType" round strong>{{ spell.tierLabel }}</n-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🎯 视图 3: 青魔法实战受击领悟与魔兽使操纵推演工坊 (Interactive Learning & Beast Control Studio) -->
    <div v-if="activeViewTab === 'learning_lab'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-teal-950/30 to-slate-950 border border-teal-500/50 shadow-2xl space-y-6 relative overflow-hidden">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-900/40 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎯</span>
              <h3 class="text-lg sm:text-xl font-black text-teal-300">
                青魔法实战受击领悟与魔兽使操纵推演工坊 (Learning & Beast Control Studio)
              </h3>
              <n-tag size="small" type="success" round strong>生还判定机制</n-tag>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              经典拟态法则高精推演：肉身受创生还（HP &gt; 0）、魔兽使【操纵】强令反施与等级倍数对偶校验；一键体验真实学成瞬间！
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-tag size="small" type="warning" round>
              已习得青魔法: {{ learnedSpells.length }} / {{ learningTargets.length }} 卷
            </n-tag>
            <n-button size="small" secondary @click="resetLearningLab">
              🔄 重置领悟状态
            </n-button>
          </div>
        </div>

        <!-- 3步交互式实战参数装配 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- 第 1 步: 选定遭遇魔物与技能目标 -->
          <div class="lg:col-span-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>1️⃣</span> 遭遇野外魔物与拟态目标 (Target Monster)
            </div>
            <div class="space-y-2">
              <button
                v-for="target in learningTargets"
                :key="target.id"
                type="button"
                class="w-full p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between text-xs"
                :class="selectedLearnTargetId === target.id
                  ? 'bg-teal-900/50 border-teal-400 text-teal-200 font-bold shadow'
                  : 'bg-slate-950/70 border-slate-800 text-gray-300 hover:bg-slate-850'"
                @click="selectedLearnTargetId = target.id"
              >
                <div>
                  <div class="font-bold flex items-center gap-1">
                    <span>{{ target.icon }}</span>
                    <span>{{ target.name }}</span>
                    <span v-if="learnedSpells.includes(target.id)" class="text-emerald-400 text-[10px]">✓ 已学会</span>
                  </div>
                  <div class="text-[10px] text-gray-400 mt-0.5">来源: {{ target.monster }}</div>
                </div>
                <n-tag size="tiny" :type="target.reqControl ? 'warning' : 'info'">
                  {{ target.reqControl ? '需操纵' : '直接挨打' }}
                </n-tag>
              </button>
            </div>
          </div>

          <!-- 第 2 步: 受测光之战士生理与技能参数 -->
          <div class="lg:col-span-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span>2️⃣</span> 青魔道士生理与被动配给 (Mage Status)
            </div>

            <!-- 等级设置 (支持测试等级5即死) -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>角色当前等级 (Level):</span>
                <span class="font-mono text-cyan-400 font-bold text-sm">
                  Lv.{{ mageLevel }} {{ mageLevel % 5 === 0 ? '(5的倍数)' : '' }}
                </span>
              </div>
              <n-slider v-model:value="mageLevel" :min="1" :max="99" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span class="cursor-pointer text-cyan-400" @click="mageLevel = 25">快速设为 Lv.25</span>
                <span class="cursor-pointer text-cyan-400" @click="mageLevel = 28">设为 Lv.28 (避开5倍数)</span>
              </div>
            </div>

            <!-- 当前 HP 与血线健康度 -->
            <div class="space-y-1 text-xs pt-2 border-t border-slate-800">
              <div class="flex justify-between items-center text-gray-300">
                <span>当前生命值 (HP / Max HP):</span>
                <span class="font-mono font-bold" :class="mageHp > 1000 ? 'text-emerald-400' : 'text-rose-400'">
                  {{ mageHp }} / {{ mageMaxHp }}
                </span>
              </div>
              <n-slider v-model:value="mageHp" :min="100" :max="mageMaxHp" :step="100" />
            </div>

            <!-- 关键前置开关 -->
            <div class="pt-2 border-t border-slate-800 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">已配备【学习 (Learning)】被动:</span>
                <n-switch v-model:value="hasLearningPassive" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">魔兽使已成功【操纵 (Control)】魔物:</span>
                <n-switch v-model:value="beastControlSuccess" size="small" />
              </div>
            </div>

            <div class="pt-2">
              <n-button type="primary" block size="medium" class="font-bold shadow" @click="triggerLearnAttempt">
                ⚡ 承受技能打击并判读领悟结果
              </n-button>
            </div>
          </div>

          <!-- 第 3 步: 实战判读回响视窗与日志流 -->
          <div class="lg:col-span-4 p-4 rounded-xl bg-slate-950/90 border border-teal-900/50 flex flex-col justify-between space-y-3 shadow-xl">
            <div>
              <div class="flex items-center justify-between text-xs font-bold text-gray-300 border-b border-slate-800 pb-2">
                <span class="text-teal-300 flex items-center gap-1">
                  <span>📜</span> 战斗拟态演算判定屏
                </span>
                <span class="text-[10px] text-gray-500 font-mono">Learning Result</span>
              </div>

              <!-- 目标技能特征速览 -->
              <div class="p-3 mt-2 rounded bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <div class="text-amber-300 font-bold flex items-center justify-between">
                  <span>{{ currentLearnTargetObj.name }}</span>
                  <span class="text-[11px] text-gray-400">预估伤害: {{ currentLearnTargetObj.dmg }}</span>
                </div>
                <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentLearnTargetObj.desc }}</p>
              </div>
            </div>

            <!-- 即时演算日志流 -->
            <div class="space-y-1.5 flex-1 min-h-[140px] max-h-[180px] overflow-y-auto custom-scrollbar p-2 bg-slate-900/90 rounded border border-slate-800 text-[11px] font-mono">
              <div v-for="(log, idx) in learningLogs" :key="idx" class="p-1 rounded leading-relaxed border-l-2" :class="getLearnLogClass(log)">
                {{ log }}
              </div>
              <div v-if="learningLogs.length === 0" class="text-gray-500 text-center py-8">
                就绪！点击【⚡ 承受技能打击】展开实战领悟模拟...
              </div>
            </div>

            <div class="text-[10px] text-gray-500 pt-1 border-t border-slate-800 flex items-center justify-between">
              <span>底层引擎契约: blue_magic_learning_resolver.gd</span>
              <span class="text-teal-400">HP &gt; 0 生还法则</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 视图 3: 绝技伤害与实战演练台 -->
    <div v-if="activeViewTab === 'simulator'" class="space-y-6">
      <div class="p-5 bg-[#121626]/90 border border-slate-700/60 rounded-xl space-y-6">
        <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-cyan-300">⚡ 秘传绝技推演与伤害结算工作台</h2>
            <p class="text-xs text-gray-400 mt-1">
              基于 Godot 引擎 `battle_engine.gd` 伤害公式与状态机，实时模拟各种人物数值与敌人抗性下的绝技表现
            </p>
          </div>
          <n-button size="small" secondary @click="resetSimulatorParams">重置预设参数</n-button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 步骤 1: 选择绝技 -->
          <div class="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 class="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <span>1️⃣</span> 选择参演绝技
            </h3>
            <div>
              <label class="text-xs text-gray-400 mb-1 block">秘传法门</label>
              <select
                v-model="simSelectedSkillId"
                class="w-full bg-slate-800 border border-slate-700 text-white rounded p-2 text-xs focus:border-cyan-500 outline-none"
              >
                <option v-for="item in teachingsList" :key="item.id" :value="item.id">
                  [{{ item.categoryName }}] {{ item.name }}
                </option>
              </select>
            </div>

            <!-- 当前选中绝技概览 -->
            <div v-if="currentSimSkill" class="p-3 bg-slate-950/70 border border-slate-800 rounded space-y-2 text-xs">
              <div class="text-cyan-300 font-bold">{{ currentSimSkill.name }}</div>
              <div class="text-gray-400">属性: <span class="text-purple-300">{{ currentSimSkill.element }}</span></div>
              <div class="text-gray-400">消耗: <span class="text-amber-300">{{ currentSimSkill.cost }}</span></div>
              <div class="text-gray-300 text-[11px] leading-relaxed">{{ currentSimSkill.formula }}</div>
            </div>
          </div>

          <!-- 步骤 2: 设定施法者数值 -->
          <div class="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 class="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
              <span>2️⃣</span> 施法者属性配给
            </h3>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label class="text-gray-400 block mb-1">人物等级 (LV)</label>
                <input
                  v-model.number="simCaster.level"
                  type="number"
                  min="1"
                  max="99"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">当前生命 (HP)</label>
                <input
                  v-model.number="simCaster.hp"
                  type="number"
                  min="1"
                  max="9999"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">物理攻击力 (Atk)</label>
                <input
                  v-model.number="simCaster.atk"
                  type="number"
                  min="1"
                  max="255"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">魔法力 / 智力 (Int)</label>
                <input
                  v-model.number="simCaster.int"
                  type="number"
                  min="1"
                  max="255"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">敏捷速度 (Agi)</label>
                <input
                  v-model.number="simCaster.agi"
                  type="number"
                  min="1"
                  max="255"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label class="text-gray-400 block mb-1">精神治愈 (Spi)</label>
                <input
                  v-model.number="simCaster.spi"
                  type="number"
                  min="1"
                  max="255"
                  class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <!-- 步骤 3: 模拟目标假人 -->
          <div class="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 class="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span>3️⃣</span> 演习目标木桩
            </h3>
            <div>
              <label class="text-xs text-gray-400 mb-1 block">目标类型</label>
              <select
                v-model="simTargetType"
                class="w-full bg-slate-800 border border-slate-700 text-white rounded p-2 text-xs focus:border-cyan-500 outline-none"
              >
                <option value="normal">普通魔兽 (防40, 魔抗20, 无弱点)</option>
                <option value="undead">冥界不死族 (防50, 圣弱点 2.0x, 暗吸收)</option>
                <option value="machine">古代兵器机械族 (防120, 水雷弱点 2.0x)</option>
                <option value="desert">荒漠沙漠种族 (防60, 水弱点 4.0x)</option>
                <option value="boss">高阶深渊霸主 (防180, 魔抗150, 全抗50%)</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-gray-400 mb-1 block">目标等级 (LV)</label>
              <input
                v-model.number="simTargetLevel"
                type="number"
                min="1"
                max="99"
                class="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 text-xs outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        <!-- 推演执行按钮与结算屏 -->
        <div class="p-6 bg-slate-950 rounded-xl border border-cyan-500/40 text-center space-y-4 shadow-xl">
          <div class="flex items-center justify-center gap-3">
            <button
              type="button"
              class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-lg text-sm shadow-lg shadow-cyan-500/30 transition-all cursor-pointer transform active:scale-95"
              @click="runSimulation"
            >
              🚀 执行绝技推演与伤害结算 (Calculate Simulation)
            </button>
          </div>

          <!-- 运算结果显示 -->
          <div v-if="simulationResult" class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div class="p-4 bg-slate-900/90 rounded-lg border border-cyan-500/30">
              <div class="text-xs text-cyan-400 uppercase tracking-wider mb-1">🎯 预估命中与总效能</div>
              <div class="text-3xl font-extrabold text-amber-300 font-mono">
                {{ simulationResult.damageDisplay }}
              </div>
              <div class="text-[11px] text-gray-400 mt-1">{{ simulationResult.damageType }}</div>
            </div>

            <div class="p-4 bg-slate-900/90 rounded-lg border border-purple-500/30">
              <div class="text-xs text-purple-400 uppercase tracking-wider mb-1">📊 触发特效与判定结算</div>
              <div class="text-sm font-semibold text-white">
                {{ simulationResult.specialTrigger }}
              </div>
              <div class="text-[11px] text-gray-400 mt-1">
                {{ simulationResult.combatStatus }}
              </div>
            </div>

            <div class="p-4 bg-slate-900/90 rounded-lg border border-emerald-500/30">
              <div class="text-xs text-emerald-400 uppercase tracking-wider mb-1">💡 引擎结算剖析</div>
              <div class="text-xs text-gray-300 font-mono text-left leading-relaxed">
                {{ simulationResult.formulaBreakdown }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 视图 5: 米西迪亚太古白黑双魔禁术极化融合与导师传承工坊 -->
    <div v-if="activeViewTab === 'mysidia_fusion'" id="mysidia-fusion-studio" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1024] via-[#101935] to-[#1a1236] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.18)] space-y-6">
        <!-- 头部导言 -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/30 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
                MYSIDIA FORBIDDEN DUALCAST & POLARITY ENGINE v2.2.271
              </span>
              <span class="text-xs text-amber-300 font-mono">⚡ 双重施法 · 太古白黑两极调和</span>
            </div>
            <h2 class="text-2xl font-black text-white flex items-center gap-2 tracking-tight">
              <span>🔮</span> 米西迪亚太古白黑双魔禁术极化融合与导师传承工坊
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
              米西迪亚古代大图书馆禁术殿堂：在此交汇太古白魔神圣创生与太古黑魔陨石破灭两极以太流。选择导师传承心法，调节两极极化配比与以太过载率，实时推演禁术融合派生奥义与反噬抗性。
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <n-button type="info" size="small" round secondary @click="autoHarmonizePolarity">
              <template #icon><span>⚖️</span></template>
              完美两极调和
            </n-button>
            <n-button type="warning" size="small" round secondary @click="triggerCataclysmOverdrive">
              <template #icon><span>💥</span></template>
              终极以太过载
            </n-button>
            <n-button type="success" size="small" round secondary @click="exportMysidiaCertificate">
              <template #icon><span>📜</span></template>
              导出方案书 (SHA-256)
            </n-button>
          </div>
        </div>

        <!-- 导师位格选择台 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
              <span>🧙‍♂️</span> 传承导师位格选择 (Choose Mysidia Archmagus)
            </span>
            <span class="text-xs font-mono text-gray-400">当前导师：{{ currentMentor.name }} ({{ currentMentor.title }})</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div
              v-for="mentor in mentorList"
              :key="mentor.id"
              class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
              :class="selectedMentorId === mentor.id
                ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'"
              @click="selectMentor(mentor.id)"
            >
              <div class="flex items-start gap-3">
                <span class="text-3xl p-2 rounded-xl bg-slate-800/80 shrink-0 border border-slate-700">{{ mentor.avatar }}</span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-sm text-white truncate">{{ mentor.name }}</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">{{ mentor.school }}</span>
                  </div>
                  <div class="text-[11px] text-amber-300 mt-0.5 font-medium">{{ mentor.title }}</div>
                  <p class="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">{{ mentor.desc }}</p>
                  <div class="mt-2 flex items-center justify-between text-[10px] font-mono text-gray-400 border-t border-slate-800/80 pt-1.5">
                    <span>共鸣增幅: <strong class="text-cyan-300">{{ mentor.baseResonance }}x</strong></span>
                    <span>反噬豁免: <strong class="text-emerald-400">+{{ mentor.backfireResist }}%</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 动力学核心推演参数调节 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-950/70 border border-slate-800">
          <!-- 白魔圣光极化率 -->
          <div class="space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-semibold flex items-center gap-1.5">
                <span>⚪</span> 太古白魔极化率
              </span>
              <span class="font-mono text-cyan-300 font-bold">{{ whitePolarity }}%</span>
            </div>
            <input
              v-model.number="whitePolarity"
              type="range"
              min="0"
              max="100"
              step="1"
              class="w-full accent-cyan-400 cursor-pointer"
            />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>0% 圣光寂灭</span>
              <span>100% 神圣创生</span>
            </div>
          </div>

          <!-- 黑魔陨石极化率 -->
          <div class="space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-semibold flex items-center gap-1.5">
                <span>⚫</span> 太古黑魔极化率
              </span>
              <span class="font-mono text-purple-300 font-bold">{{ darkPolarity }}%</span>
            </div>
            <input
              v-model.number="darkPolarity"
              type="range"
              min="0"
              max="100"
              step="1"
              class="w-full accent-purple-400 cursor-pointer"
            />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>0% 烈火归寂</span>
              <span>100% 虚空核爆</span>
            </div>
          </div>

          <!-- 导师共鸣频率 -->
          <div class="space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-semibold flex items-center gap-1.5">
                <span>✨</span> 导师共鸣频率
              </span>
              <span class="font-mono text-amber-300 font-bold">{{ mentorResonance.toFixed(1) }}x</span>
            </div>
            <input
              v-model.number="mentorResonance"
              type="range"
              min="1.0"
              max="3.0"
              step="0.1"
              class="w-full accent-amber-400 cursor-pointer"
            />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>1.0x 基准</span>
              <span>3.0x 极限神化</span>
            </div>
          </div>

          <!-- 施法者以太过载率 -->
          <div class="space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-semibold flex items-center gap-1.5">
                <span>⚡</span> 施法以太过载率
              </span>
              <span class="font-mono text-rose-300 font-bold">{{ aetherOverdrive }}%</span>
            </div>
            <input
              v-model.number="aetherOverdrive"
              type="range"
              min="50"
              max="200"
              step="5"
              class="w-full accent-rose-400 cursor-pointer"
            />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>50% 稳态</span>
              <span>200% 破界暴走</span>
            </div>
          </div>
        </div>

        <!-- 极性平衡条与辅助透镜开关 -->
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex-1 space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-300 font-medium">太古以太阴阳两极平衡率：</span>
              <span class="font-mono font-bold" :class="polarityBalanceRatio >= 80 ? 'text-emerald-400' : 'text-amber-400'">
                {{ polarityBalanceRatio }}% ({{ polarityBalanceText }})
              </span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden flex">
              <div class="bg-cyan-400 transition-all duration-300" :style="{ width: whitePolarity / (whitePolarity + darkPolarity || 1) * 100 + '%' }"></div>
              <div class="bg-purple-500 transition-all duration-300" :style="{ width: darkPolarity / (whitePolarity + darkPolarity || 1) * 100 + '%' }"></div>
            </div>
            <div class="flex justify-between text-[10px] text-gray-400">
              <span>白魔圣能占比 {{ (whitePolarity / (whitePolarity + darkPolarity || 1) * 100).toFixed(0) }}%</span>
              <span>黑魔暗能占比 {{ (darkPolarity / (whitePolarity + darkPolarity || 1) * 100).toFixed(0) }}%</span>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-300 select-none">
              <input v-model="enableDualcastCatalyst" type="checkbox" class="accent-cyan-400 rounded cursor-pointer" />
              <span>装配双重施法以太透镜 (Dualcast Lens, 耗蓝 -25%)</span>
            </label>
            <button
              type="button"
              class="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black rounded-lg text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer transform active:scale-95"
              @click="triggerForbiddenFusion"
            >
              🚀 执行禁术极化推演 (Engage Fusion)
            </button>
          </div>
        </div>

        <!-- 融合推演派生面板 (实时解算) -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 relative overflow-hidden">
            <div class="text-[11px] text-cyan-400 font-mono mb-1">🔮 派生太古禁术奥义</div>
            <div class="text-lg font-black text-white truncate">{{ derivedSpell.name }}</div>
            <div class="text-[11px] text-amber-300 mt-1 font-mono flex items-center gap-1.5">
              <span class="px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/40">{{ derivedSpell.tier }}</span>
              <span>{{ derivedSpell.nature }}</span>
            </div>
            <div class="text-[11px] text-gray-400 mt-2 line-clamp-2">{{ derivedSpell.summary }}</div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-500/40">
            <div class="text-[11px] text-purple-400 font-mono mb-1">💥 极限破坏 / 绝对庇护量</div>
            <div class="text-2xl font-black text-amber-300 font-mono">
              {{ derivedMagnitudeDisplay }}
            </div>
            <div class="text-[11px] text-gray-400 mt-1 flex items-center justify-between">
              <span>基准算力: {{ baseCalculationIndex }} Pt</span>
              <span class="text-cyan-300 font-mono">过载倍率: {{ (aetherOverdrive / 100).toFixed(2) }}x</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40">
            <div class="text-[11px] text-emerald-400 font-mono mb-1">⏱️ 瞬发准备与魔力消耗</div>
            <div class="text-xl font-black text-white font-mono">
              {{ derivedPrepTime }} ms <span class="text-xs text-gray-400 font-normal">/</span> {{ derivedMpCost }} MP
            </div>
            <div class="text-[11px] text-gray-400 mt-1">
              <span>透镜抵扣: </span>
              <span :class="enableDualcastCatalyst ? 'text-emerald-400' : 'text-gray-500'">
                {{ enableDualcastCatalyst ? '-25% MP 优化' : '未装配' }}
              </span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/90 border" :class="backfireRiskRate > 30 ? 'border-rose-500/50 bg-rose-950/20' : 'border-slate-800 bg-slate-900/90'">
            <div class="text-[11px] font-mono mb-1" :class="backfireRiskRate > 30 ? 'text-rose-400' : 'text-gray-400'">⚠️ 禁术反噬风险指数</div>
            <div class="text-2xl font-black font-mono" :class="backfireRiskRate > 30 ? 'text-rose-400' : 'text-emerald-400'">
              {{ backfireRiskRate }}%
            </div>
            <div class="text-[11px] text-gray-400 mt-1">
              <span>导师抗性抵消: </span>
              <span class="text-emerald-400 font-mono">-{{ currentMentor.backfireResist }}%</span>
            </div>
          </div>
        </div>

        <!-- 派生特性清单与推演战报控制台 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- 特性清单 -->
          <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div class="text-xs font-bold text-cyan-300 flex items-center gap-2">
              <span>✨</span> 融合禁术派生特殊效果与全域词缀
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div
                v-for="(effect, idx) in derivedSpell.effects"
                :key="idx"
                class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-gray-300 flex items-center gap-2"
              >
                <span class="text-cyan-400 font-bold shrink-0">•</span>
                <span class="leading-tight">{{ effect }}</span>
              </div>
            </div>
          </div>

          <!-- 推演日志控制台 -->
          <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-amber-300 flex items-center gap-1.5">
                <span>📜</span> 禁术演练战局动态回执
              </span>
              <span class="text-gray-500 text-[11px]">最新 {{ fusionLogs.length }} 条记录</span>
            </div>
            <div class="flex-1 bg-slate-900/90 p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] space-y-1.5 max-h-48 overflow-y-auto">
              <div
                v-for="(log, idx) in fusionLogs"
                :key="idx"
                class="leading-relaxed"
                :class="log.includes('💥') || log.includes('极化') ? 'text-cyan-300' : log.includes('⚠️') ? 'text-amber-300' : 'text-gray-300'"
              >
                {{ log }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 视图：太古导师试炼、青魔法基因烙印与技能导师传授工坊 (v2.2.286) -->
    <div v-if="activeViewTab === 'mentor_trial'" id="mentor-trial-studio" class="space-y-6">
      <!-- 顶部功能横幅 -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900/90 to-purple-950/70 border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.18)] relative overflow-hidden">
        <div class="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/40">
                ANCIENT MENTOR TRIAL & GENE IMPRINTING
              </span>
              <span class="text-xs text-cyan-400 font-mono">v2.2.286 Official Matrix</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
              <span>🎓</span> 太古导师试炼、青魔法基因烙印与技能导师传授工坊
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              面向 Godot 4.6 LTS 太古传授体系：融汇四大宗师门派试炼、青魔法免受击强制基因烙印、心境契合度微调与奥义心法血契推演。
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-700/60 text-xs font-mono text-cyan-300">
              太古导师心法
            </span>
            <span class="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-700/60 text-xs font-mono text-purple-300">
              基因烙印无缝继承
            </span>
          </div>
        </div>
      </div>

      <!-- 四大导师门派选择 -->
      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">🧙‍♂️</span>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">四大太古导师宗师门派 (Ancient Mentors)</h3>
          </div>
          <span class="text-xs text-gray-400">选择当前指导修行的导师门派以继承专属宗师秘传</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="m in mentorArchetypesList"
            :key="m.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedTrialMentorId === m.id ? `${m.color} ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]` : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'"
            @click="selectedTrialMentorId = m.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ m.icon }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-gray-300">
                {{ m.perkBonus }}
              </span>
            </div>
            <div class="font-bold text-sm text-white mb-1">{{ m.name }}</div>
            <p class="text-xs text-gray-400 leading-snug">{{ m.desc }}</p>
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
              <h3 class="text-sm font-bold text-white uppercase tracking-wider">导师试炼与传承拓扑参数</h3>
            </div>
            <n-tag type="info" size="tiny" round>实机连续微调</n-tag>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>导师心境契合度 (Mentor Affinity)</span>
                <span class="font-mono font-bold text-cyan-400">{{ mentorAffinity }}%</span>
              </div>
              <n-slider v-model:value="mentorAffinity" :min="10" :max="100" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>10% (初识疏离)</span>
                <span>75% (融会贯通)</span>
                <span>100% (心印一体)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>试炼秘境位阶难度 (Trial Difficulty)</span>
                <span class="font-mono font-bold text-amber-400">{{ trialDifficultyRank }} 阶</span>
              </div>
              <n-slider v-model:value="trialDifficultyRank" :min="1" :max="10" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>1 阶 (基础考较)</span>
                <span>6 阶 (宗师严考)</span>
                <span>10 阶 (诸神极境试炼)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>基因烙印传承槽位 (Inherited Slots)</span>
                <span class="font-mono font-bold text-purple-400">{{ inheritedSpellsCount }} 槽</span>
              </div>
              <n-slider v-model:value="inheritedSpellsCount" :min="1" :max="8" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>1 槽 (单奥义)</span>
                <span>4 槽 (标准心法)</span>
                <span>8 槽 (八极全通)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>太古觉醒共鸣率 (Transcendence Resonance)</span>
                <span class="font-mono font-bold text-emerald-400">{{ transcendenceResonance }}%</span>
              </div>
              <n-slider v-model:value="transcendenceResonance" :min="50" :max="200" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>50% (微弱共鸣)</span>
                <span>120% (标准共振)</span>
                <span>200% (极限过载觉醒)</span>
              </div>
            </div>
          </div>

          <!-- 3 个导师秘法开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-3">
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🧬</span> 青魔法免受击强制基因烙印 (Gene Imprinting)
                </div>
                <div class="text-[10px] text-gray-400">免去实战肉身挨打领悟门槛，通过导师以太直接将高阶魔物基因刻入灵魂 (+25% 伤害)</div>
              </div>
              <n-switch v-model:value="geneImprintingPermit" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🛡️</span> 导师极限突破庇护光环 (Mentor Aegis Aura)
                </div>
                <div class="text-[10px] text-gray-400">试炼秘境内全额免疫致死反噬重创，试炼通关通过概率大幅提升 (+25%)</div>
              </div>
              <n-switch v-model:value="limitBreakAura" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>📜</span> 奥义心法血契 (Secret Mastery Pact)
                </div>
                <div class="text-[10px] text-gray-400">破除全职业秘传装备限制，传授心法战力全额解禁跃迁 (+30% 综合战力)</div>
              </div>
              <n-switch v-model:value="secretMasteryPact" />
            </div>
          </div>
        </div>

        <!-- 右侧实时遥测仪表盘 -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-cyan-950/40 border border-cyan-500/30 space-y-4">
            <div class="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <h3 class="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                <span>📊</span> 导师试炼遥测看板 (Trial Telemetry)
              </h3>
              <span class="text-[10px] font-mono text-emerald-400 animate-pulse">● 导师精神场域就绪</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20">
                <div class="text-[10px] text-gray-400">宗师传授心法战力 (CP)</div>
                <div class="text-lg sm:text-xl font-black text-cyan-400 font-mono mt-1">
                  {{ calculatedMentorCombatPower.toLocaleString() }}
                </div>
                <div class="text-[9px] text-cyan-500/80 mt-0.5">综合传承心相解算</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                <div class="text-[10px] text-gray-400">传承奥义伤害增幅</div>
                <div class="text-lg sm:text-xl font-black text-purple-400 font-mono mt-1">
                  {{ calculatedInheritedDamageBoost }}
                </div>
                <div class="text-[9px] text-purple-500/80 mt-0.5">全奥义与青魔法倍率</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20">
                <div class="text-[10px] text-gray-400">试炼极限通关胜率</div>
                <div class="text-lg sm:text-xl font-black text-emerald-400 font-mono mt-1">
                  {{ calculatedTrialPassProbability }}
                </div>
                <div class="text-[9px] text-emerald-500/80 mt-0.5">反噬抗性与契合加权</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20">
                <div class="text-[10px] text-gray-400">心法宗师认证位阶</div>
                <div class="text-lg sm:text-xl font-black text-amber-400 font-mono mt-1">
                  {{ calculatedSecretArtRank }}
                </div>
                <div class="text-[9px] text-amber-500/80 mt-0.5">宗师殿堂评级</div>
              </div>
            </div>

            <!-- 当前导师宗门特质摘要 -->
            <div class="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-1">
              <div class="flex items-center justify-between text-gray-400">
                <span>导师宗师:</span>
                <span class="font-bold text-white">{{ currentMentorObj?.name }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>宗派加成:</span>
                <span class="font-mono text-cyan-400">{{ currentMentorObj?.perkBonus }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>基因烙印:</span>
                <span class="font-mono" :class="geneImprintingPermit ? 'text-purple-400' : 'text-gray-500'">
                  {{ geneImprintingPermit ? '免挨打立即烙印 (+25%)' : '传统受击领悟' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>庇护光环:</span>
                <span class="font-mono" :class="limitBreakAura ? 'text-emerald-400' : 'text-gray-500'">
                  {{ limitBreakAura ? '已激活 (+25% 胜率保底)' : '常规试炼' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 快捷操作按钮 -->
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              @click="runMentorTrialSimulation"
              :disabled="isTrialSimulating"
            >
              <span>{{ isTrialSimulating ? '⏳' : '🚀' }}</span>
              {{ isTrialSimulating ? '导师试炼传授推演中...' : '启动五阶段太古导师试炼' }}
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
              @click="exportMentorTrialCertificate"
            >
              <span>📄</span> 导出证书
            </button>
          </div>
        </div>
      </div>

      <!-- 五阶段导师试炼推演终端 -->
      <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">💻</span>
            <h3 class="text-sm font-bold text-white font-mono uppercase">导师试炼推演控制台 (Mentor Trial Terminal)</h3>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="isTrialSimulating" class="text-xs text-cyan-400 animate-pulse font-mono">
              STAGE {{ trialSimStage }}/5 试炼中
            </span>
            <span v-else-if="trialSimFinished" class="text-xs text-emerald-400 font-mono">
              ✓ 导师传授结业
            </span>
            <button
              type="button"
              class="text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 cursor-pointer"
              @click="trialTerminalLogs = []"
            >
              清屏
            </button>
          </div>
        </div>

        <div class="h-44 p-3 rounded-xl bg-black/90 border border-slate-900 font-mono text-xs overflow-y-auto space-y-1 text-gray-300">
          <div v-if="trialTerminalLogs.length === 0" class="text-gray-600 italic">
            [终端待命中] 点击“启动五阶段太古导师试炼”以解算心相共鸣、魔物基因烙印与宗师秘传结业...
          </div>
          <div v-for="(log, idx) in trialTerminalLogs" :key="idx" class="leading-relaxed">
            <span class="text-gray-500">[{{ log.time }}]</span>
            <span :class="log.color"> {{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 视图 4: Godot 4.x 引擎底层实机源码展台 -->
    <div v-if="activeViewTab === 'engine_code'" class="space-y-4">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                GODOT 4.6 LTS COMBAT & TEACHING KERNEL
              </span>
              <h3 class="text-base font-bold text-white">
                {{ activeTeachingGodotTab === 'mysidia_fusion' ? 'mysidia_dualcast_fusion_engine.gd' : 'blue_magic_learning_system.gd' }}
              </h3>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              {{ activeTeachingGodotTab === 'mysidia_fusion'
                ? '纯逻辑 RefCounted 类：米西迪亚太古两极极化解算、导师共鸣放大、反噬豁免判定与双重施法奥义派生。'
                : '受击判定、施法者存活状态校验、青魔道士被动捕获监听器与全队青魔法库同步器。' }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded font-mono transition-all"
                :class="activeTeachingGodotTab === 'mysidia_fusion' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeTeachingGodotTab = 'mysidia_fusion'"
              >
                mysidia_dualcast_fusion_engine.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded font-mono transition-all"
                :class="activeTeachingGodotTab === 'blue_magic' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeTeachingGodotTab = 'blue_magic'"
              >
                blue_magic_learning_system.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded font-mono transition-all"
                :class="activeTeachingGodotTab === 'mentor_trial' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeTeachingGodotTab = 'mentor_trial'"
              >
                mentor_trial_inheritance_system.gd
              </button>
            </div>
            <n-button size="small" round secondary type="info" @click="copyActiveGdScript">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>

        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[550px]">{{ currentActiveGdScriptCode }}</pre>
      </div>
    </div>

    <!-- 初心导引全息教程、实战进阶与名师指津工坊 (v2.2.312 重磅实装) -->
    <div id="novice-mentorship-studio" class="novice-mentorship-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-rose-950/20 to-slate-900/95 border border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
              NOVICE ONBOARDING & MASTER MENTORSHIP CODEX
            </span>
            <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
              v2.2.312 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>✨</span> 初心导引全息教程、实战进阶与名师指津工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            系统性串联四大导师门派传授矩阵、首领致命大招前摇红光子弹时间演练、新手免死保底圣盾与青魔法魔物基因烙印传授，让每位初心者从见习学徒蜕变至太古宗师。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="error" @click="resetMentorshipDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="error" :loading="isMentorSimulating" @click="runMentorshipSimulation">
            <template #icon><span>⚡</span></template>
            启动全息导引推演
          </n-button>
        </div>
      </div>

      <!-- 四大导师流派原型卡 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="archetype in mentorshipArchetypes"
          :key="archetype.id"
          @click="selectMentorshipArchetype(archetype)"
          :class="[
            'p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden',
            selectedMentorshipArchetype.id === archetype.id
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
            <span>战力加成: {{ archetype.power }}</span>
            <span>通过率: {{ archetype.passRate }}</span>
          </div>
        </div>
      </div>

      <!-- 核心微调滑块与调控开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800">
        <!-- 4 维连续滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-rose-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>⚙️</span> 授业与实战微操参数调谐
          </div>
          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>导师授业契合度指数 (Affinity Index)</span>
                <span class="font-mono text-rose-400 font-bold">{{ noviceMentorAffinity }} 点</span>
              </div>
              <n-slider v-model:value="noviceMentorAffinity" :min="20" :max="100" :step="2" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>实战打断判定帧窗口 (Interrupt Window)</span>
                <span class="font-mono text-amber-400 font-bold">{{ interruptFrames }} 帧</span>
              </div>
              <n-slider v-model:value="interruptFrames" :min="3" :max="30" :step="1" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>青魔法魔物基因烙印率 (Gene Imprint Rate)</span>
                <span class="font-mono text-cyan-400 font-bold">{{ geneImprintRate }} %</span>
              </div>
              <n-slider v-model:value="geneImprintRate" :min="10" :max="100" :step="2" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>弟子奥义觉醒突破倍率 (Awakening Multiplier)</span>
                <span class="font-mono text-purple-400 font-bold">{{ awakeningMultiplier.toFixed(1) }} x</span>
              </div>
              <n-slider v-model:value="awakeningMultiplier" :min="1.0" :max="5.0" :step="0.1" />
            </div>
          </div>
        </div>

        <!-- 3 维调控开关与动态指标 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-cyan-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>🛡️</span> 护佑机制与实战进阶守卫
          </div>
          <div class="space-y-2.5 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">新手保护期致命伤锁血圣盾</div>
                <div class="text-[10px] text-gray-400">受到致死攻击时强行保留 1 点 HP 并瞬间触发 3 秒无敌回血契约</div>
              </div>
              <n-switch v-model:value="enableNoviceShield" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">导师全被动失真无损传授契约</div>
                <div class="text-[10px] text-gray-400">拜师完成后 100% 无损习得门派所有隐藏精通被动与属性抗性</div>
              </div>
              <n-switch v-model:value="enableLosslessPassiveInherit" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">首领大招前摇红光全局子弹时间</div>
                <div class="text-[10px] text-gray-400">首领狂暴蓄力时战斗时间流速放缓至 25%，从容完成打断走位</div>
              </div>
              <n-switch v-model:value="enableBulletTimeTelegraph" />
            </div>
          </div>

          <!-- 4 维解算核心指标 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">综合战力加成</div>
              <div class="text-base font-black font-mono text-rose-400 mt-0.5">+{{ calculatedCpBoost }} CP</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">打断试炼通过率</div>
              <div class="text-base font-black font-mono text-amber-400 mt-0.5">{{ calculatedTrialPassRate }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">青魔法拟态率</div>
              <div class="text-base font-black font-mono text-cyan-400 mt-0.5">{{ calculatedMimicryCoverage }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">名师传承级别</div>
              <div class="text-xs font-black font-mono text-purple-400 mt-1">{{ calculatedMentorCert }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条与终端控制台 -->
      <div class="space-y-3 bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="text-rose-400 font-mono font-bold">STAGE {{ mentorSimStage }}/5</span>
            <span class="text-gray-300">{{ mentorSimStageName }}</span>
          </div>
          <span class="font-mono text-cyan-400">{{ mentorSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="mentorSimProgress"
          :color="'#f43f5e'"
          :rail-color="'#1e293b'"
          :height="8"
          :show-indicator="false"
          border-radius="4px"
        />

        <div class="h-32 bg-slate-900/90 rounded-lg p-3 font-mono text-xs overflow-y-auto space-y-1 text-gray-300 border border-slate-800/80">
          <div v-for="(log, idx) in mentorLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-gray-500 shrink-0">[{{ log.time }}]</span>
            <span :class="log.color">{{ log.text }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <div class="text-gray-400 font-mono">
            <span>防伪校验凭证: </span>
            <span class="text-rose-400 font-bold">{{ mentorCertHash }}</span>
          </div>
          <n-button size="tiny" secondary type="error" round @click="exportMentorCert">
            <template #icon><span>📜</span></template>
            导出全息导引与传承报告 (SHA-256)
          </n-button>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                GODOT 4.6 LTS ONBOARDING
              </span>
              <span class="text-sm font-bold text-white">初心者导引与名师授业实机驱动</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              提供生产级新手引导导演、子弹时间前摇判定器与名师无损传承系统实机代码。
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button
              v-for="codeTab in mentorshipCodeTabs"
              :key="codeTab.id"
              size="tiny"
              round
              :type="activeMentorshipCodeTab === codeTab.id ? 'error' : 'default'"
              :secondary="activeMentorshipCodeTab !== codeTab.id"
              @click="activeMentorshipCodeTab = codeTab.id"
            >
              {{ codeTab.name }}
            </n-button>
            <n-button size="tiny" round secondary type="info" @click="copyActiveMentorshipCode">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-rose-300 overflow-x-auto leading-relaxed max-h-[420px]">{{ currentMentorshipCode }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import { teachingsList, type TeachingItem } from '../config/teachingsConfig'

const message = useMessage()

type ViewTab = 'catalog' | 'bluemagic_matrix' | 'learning_lab' | 'simulator' | 'mysidia_fusion' | 'mentor_trial' | 'engine_code'

const activeViewTab = ref<ViewTab>('catalog')
const tabList: { key: ViewTab; label: string; icon: string; badge?: string }[] = [
  { key: 'catalog', label: '秘传绝技全典', icon: '📜' },
  { key: 'mysidia_fusion', label: '太古白黑禁术工坊', icon: '🔮', badge: 'v2.2.271' },
  { key: 'mentor_trial', label: '太古导师传授工坊', icon: '🎓', badge: 'v2.2.286' },
  { key: 'bluemagic_matrix', label: '青魔法拟态全图鉴', icon: '👾', badge: 'NEW' },
  { key: 'learning_lab', label: '受击领悟与操纵沙盘', icon: '🎯', badge: 'HOT' },
  { key: 'simulator', label: '伤害与演练研习所', icon: '⚡' },
  { key: 'engine_code', label: '底层实机源码', icon: '🛠️' }
]

const scrollToMysidiaFusionStudio = () => {
  activeViewTab.value = 'mysidia_fusion'
  setTimeout(() => {
    const el = document.getElementById('mysidia-fusion-studio')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

const activeCategory = ref('all')

const categories = computed(() => {
  return [
    { id: 'all', name: '全部秘传绝技', count: teachingsList.length },
    { id: 'sanctuary', name: '勇者圣所庇护法', count: teachingsList.filter(t => t.category === 'sanctuary').length },
    { id: 'mysidia', name: '米西迪亚高级禁术', count: teachingsList.filter(t => t.category === 'mysidia').length },
    { id: 'ninja', name: '东洋忍者遁术秘传', count: teachingsList.filter(t => t.category === 'ninja').length },
    { id: 'bluemagic', name: '青魔法学院拟态', count: teachingsList.filter(t => t.category === 'bluemagic').length }
  ]
})

const filteredTeachings = computed(() => {
  if (activeCategory.value === 'all') return teachingsList
  return teachingsList.filter(t => t.category === activeCategory.value)
})

const getTagType = (category: string) => {
  switch (category) {
    case 'sanctuary':
      return 'warning'
    case 'mysidia':
      return 'info'
    case 'ninja':
      return 'error'
    case 'bluemagic':
      return 'success'
    default:
      return 'default'
  }
}

// 青魔法魔物捕获图鉴
interface BlueMagicEntry {
  id: string
  code: string
  name: string
  icon: string
  mpCost: number
  sourceMonster: string
  location: string
  learningMethod: string
  effect: string
  tierLabel: string
  tierType: 'success' | 'warning' | 'info' | 'error'
}

const blueMagicDatabase: BlueMagicEntry[] = [
  {
    id: 'bm-white-wind',
    code: 'BM-01',
    name: '白风 (White Wind)',
    icon: '🍃',
    mpCost: 28,
    sourceMonster: '狂风鸟妖 / 风之精灵',
    location: '晨辉大平原 / 风之神殿高台',
    learningMethod: '操纵魔兽后命其对青魔道士施放，或肉身承受温风',
    effect: '全队回复相当于施法者当前 HP 的血量，无视禁疗与魔抗。',
    tierLabel: 'T0 核心群奶',
    tierType: 'success'
  },
  {
    id: 'bm-mighty-guard',
    code: 'BM-02',
    name: '强力守护 (Mighty Guard)',
    icon: '🛡️',
    mpCost: 72,
    sourceMonster: '坚甲海龟 / 虚空钢铁守护者',
    location: '孤岛外海沉船 / 次元裂隙前线',
    learningMethod: '必须使用魔兽使【操纵 (Control)】技能对其下令施放',
    effect: '瞬间为全队附加【物防提高 (Protect)】+【魔防提高 (Shell)】+【浮空 (Float)】。',
    tierLabel: 'T0 顶级防御',
    tierType: 'success'
  },
  {
    id: 'bm-lvl5-death',
    code: 'BM-03',
    name: '5级致死 (Level 5 Death)',
    icon: '💀',
    mpCost: 22,
    sourceMonster: '书库魔界花 / 远古石像鬼',
    location: '封印之城古代书库 / 绝望金字塔',
    learningMethod: '青魔道士等级为 5 的倍数时受击，且存活（需复活）后习得',
    effect: '对全场所有等级为 5 的倍数的敌人造成 100% 绝对秒杀（包含首领）。',
    tierLabel: 'T1 机制特攻',
    tierType: 'error'
  },
  {
    id: 'bm-1000-needles',
    code: 'BM-04',
    name: '千针刺 (1000 Needles)',
    icon: '🌵',
    mpCost: 25,
    sourceMonster: '沙漠巨型仙人掌',
    location: '南大陆无尽荒漠',
    learningMethod: '肉身硬抗千针刺伤害（需生命 > 1000 并存活）',
    effect: '对单体目标造成 1000 点绝对真实伤害，无视一切物抗与魔防。',
    tierLabel: 'T2 前期神器',
    tierType: 'info'
  },
  {
    id: 'bm-goblin-punch',
    code: 'BM-05',
    name: '哥布林碎颅重拳 (Goblin Punch)',
    icon: '🥊',
    mpCost: 0,
    sourceMonster: '荒野流浪哥布林',
    location: '始源村落周边林道',
    learningMethod: '新手初期被普通哥布林重拳命中并生还',
    effect: '当施法者等级与敌方等级完全相同时，伤害暴涨 800% 且极效破防。',
    tierLabel: 'T1 破防奇兵',
    tierType: 'warning'
  },
  {
    id: 'bm-aqua-breath',
    code: 'BM-06',
    name: '水之吐息 (Aqua Breath)',
    icon: '🌊',
    mpCost: 38,
    sourceMonster: '深海奇美拉 / 水龙王侍卫',
    location: '非之世界海底暗渠',
    learningMethod: '承受大范围海啸冲击后存活',
    effect: '全体水属性浪涌冲击，对沙漠与熔岩生物造成 4.0 倍破灭级重创。',
    tierLabel: 'T1 地下城清场',
    tierType: 'info'
  },
  {
    id: 'bm-frog-song',
    code: 'BM-07',
    name: '青蛙之歌 (Frog Song)',
    icon: '🐸',
    mpCost: 8,
    sourceMonster: '毒沼蛙妖',
    location: '迷失森林毒液沼泽',
    learningMethod: '魔兽使操纵或直接被蛙化受击',
    effect: '将目标永久变为青蛙形态并附加沉睡，大幅削减其攻击力并封印魔法。',
    tierLabel: 'T2 战术强控',
    tierType: 'warning'
  },
  {
    id: 'bm-doom',
    code: 'BM-08',
    name: '死亡宣告 (Doom)',
    icon: '⏳',
    mpCost: 10,
    sourceMonster: '死神幽影 / 棺木恶魔',
    location: '黑魔导飞空艇废墟',
    learningMethod: '承受死亡宣告倒计时诅咒',
    effect: '在敌方头顶悬挂 30 秒倒计时沙漏，归零时立刻暴毙。',
    tierLabel: 'T2 破盾磨血',
    tierType: 'error'
  },
  {
    id: 'bm-aero-3',
    code: 'BM-09',
    name: '狂风三式 (Aero III)',
    icon: '🌪️',
    mpCost: 24,
    sourceMonster: '青空暴风鹰狮',
    location: '浮游大陆云顶高崖',
    learningMethod: '承受全屏暴风撕裂后生还',
    effect: '最强风系群体法术，引动真空飓风重创敌方全员，对飞行生物暴击。',
    tierLabel: 'T1 元素爆发',
    tierType: 'info'
  },
  {
    id: 'bm-self-destruct',
    code: 'BM-10',
    name: '自爆 (Self-Destruct)',
    icon: '💣',
    mpCost: 1,
    sourceMonster: '火球炸弹怪 / 熔岩巨怪',
    location: '火之神殿熔岩深渊',
    learningMethod: '承受濒死炸弹自爆冲击后存活',
    effect: '牺牲施法者生命，对目标造成当前 HP × 200% 的绝对真实殉爆伤害。',
    tierLabel: 'T1 极意自爆',
    tierType: 'error'
  },
  {
    id: 'bm-vampire',
    code: 'BM-11',
    name: '吸血鬼之吻 (Vampire)',
    icon: '🩸',
    mpCost: 2,
    sourceMonster: '暗夜吸血蝙蝠',
    location: '地下水道 / 封印古墓',
    learningMethod: '被吸血攻击命中',
    effect: '扣除目标相当于【施法者最大生命 - 当前生命】/ 2 的血量并全额转化为自身治疗。',
    tierLabel: 'T2 绝境回血',
    tierType: 'warning'
  },
  {
    id: 'bm-matra-magic',
    code: 'BM-12',
    name: '玛特拉魔术 (Matra Magic)',
    icon: '🔮',
    mpCost: 12,
    sourceMonster: '机械魔导突击兵',
    location: '机械都市废墟',
    learningMethod: '承受连续 8 发微型追踪导弹轰击',
    effect: '向全场随机倾泻 8 枚魔导激光，每发附带破甲并概率吸收 MP。',
    tierLabel: 'T2 弹幕连击',
    tierType: 'info'
  }
]

// 演练台数据状态
const simSelectedSkillId = ref('hero-holyslash')
const simCaster = reactive({
  level: 45,
  hp: 2400,
  atk: 140,
  int: 120,
  agi: 78,
  spi: 85
})
const simTargetType = ref('undead')
const simTargetLevel = ref(45)

const currentSimSkill = computed(() => teachingsList.find(t => t.id === simSelectedSkillId.value))

const launchSimulator = (tech: TeachingItem) => {
  simSelectedSkillId.value = tech.id
  activeViewTab.value = 'simulator'
  runSimulation()
}

const resetSimulatorParams = () => {
  simCaster.level = 45
  simCaster.hp = 2400
  simCaster.atk = 140
  simCaster.int = 120
  simCaster.agi = 78
  simCaster.spi = 85
  simTargetType.value = 'normal'
  simTargetLevel.value = 45
  runSimulation()
}

interface SimulationOutput {
  damageDisplay: string
  damageType: string
  specialTrigger: string
  combatStatus: string
  formulaBreakdown: string
}

const simulationResult = ref<SimulationOutput | null>(null)

const runSimulation = () => {
  const skill = currentSimSkill.value
  if (!skill) return

  let dmg = 0
  let dmgType = '伤害总量'
  let trigger = '无额外状态'
  let status = '正常结算'
  let breakdown = ''

  const isLevelEqual = simCaster.level === simTargetLevel.value
  const targetDef = simTargetType.value === 'boss' ? 180 : simTargetType.value === 'machine' ? 120 : simTargetType.value === 'undead' ? 50 : 40

  switch (skill.id) {
    case 'hero-cover':
      dmg = Math.round((600 * 0.5) - (targetDef * 1.25))
      dmgType = '受击减伤抵御'
      trigger = '100% 替濒死队友承受伤害'
      status = '自带 50% 纯减伤护盾'
      breakdown = `原伤害 600 × 50% 减伤 - (自身防御 ${targetDef} × 1.25) = 吸收后受损 ${Math.max(1, dmg)} HP`
      break
    case 'hero-holyslash':
      const holyMul = simTargetType.value === 'undead' ? 2.0 : 1.0
      dmg = Math.round((simCaster.atk * 3.5 + simCaster.spi * 2.0 - targetDef * 0.5) * holyMul)
      dmgType = `${holyMul > 1 ? '🔥 圣属性弱点暴击！' : '单体圣剑破魔'}`
      trigger = '净化施法者全部减益状态'
      status = holyMul > 1 ? '对冥界不死生物造成 2.0 倍特攻暴击' : '稳定圣属性破除'
      breakdown = `(${simCaster.atk}×3.5 + ${simCaster.spi}×2.0 - 防御${targetDef}×0.5) × 倍率${holyMul} = ${dmg}`
      break
    case 'hero-order-covenant':
      const shield = Math.round(simCaster.hp * 0.25)
      dmg = shield
      dmgType = '全军光辉护盾值'
      trigger = '3 回合内全队减伤 35%'
      status = '全员免疫击退与行动硬直'
      breakdown = `施法者生命 ${simCaster.hp} × 25% = 为全队提供 ${shield} 点全域伤害吸收屏障`
      break
    case 'hero-sovereign-sigh':
      const reviveHp = Math.round(simCaster.hp * 0.5 + simCaster.spi * 5)
      dmg = reviveHp
      dmgType = '全员复活与大群愈'
      trigger = '逆境翻盘：全员 ATB 条置满'
      status = '清除死亡状态并瞬间复活'
      breakdown = `目标最大血量 × 50% + 精神 ${simCaster.spi}×5 = 单体恢复 ${reviveHp} HP`
      break
    case 'mysidia-meteor':
      const meteorTotal = Math.round(simCaster.int * 4.5 * 4)
      dmg = meteorTotal
      dmgType = '天体物理 4 连击'
      trigger = '无视敌方防御与魔抗'
      status = '4 颗炽热陨石随机轰击'
      breakdown = `4 颗 × (魔力 ${simCaster.int} × 4.5) 无视双防 = ${meteorTotal} 毁灭总伤`
      break
    case 'mysidia-quick':
      dmg = 2
      dmgType = '获得 2 回合瞬动槽'
      trigger = '全场时间流即刻绝对冻结'
      status = '除施法者外全场 ATB 归零'
      breakdown = 'Time Freeze Active: 2 Free Action Slots 锁死敌方任何行动'
      break
    case 'mysidia-ultima':
      dmg = 9999
      dmgType = '全屏极限界限突破 9999'
      trigger = '创生与湮灭全知神圣'
      status = '全体均摊究极白热光柱'
      breakdown = `(黑魔力 + 白魔力) × 4.6 突破伤害上限阈值 = 9999 (MAX)`
      break
    case 'bluemagic-goblin-punch':
      if (isLevelEqual) {
        dmg = Math.round(simCaster.atk * 8.0)
        dmgType = '🎯 同等级 8.0 倍破防暴击！'
        trigger = `施法者等级(${simCaster.level}) === 目标等级(${simTargetLevel.value}) 极效共振`
        status = '无视物理护甲重创'
        breakdown = `攻击力 ${simCaster.atk} × 8.0 (同级共振倍率) = ${dmg}`
      } else {
        dmg = Math.round(simCaster.atk * 1.0 - targetDef * 0.5)
        dmgType = '普通哥布林重拳'
        trigger = `施法者(${simCaster.level}) 与目标(${simTargetLevel.value}) 等级不同`
        status = '常规普攻倍率'
        breakdown = `攻击力 ${simCaster.atk} × 1.0 - 防御 ${targetDef} × 0.5 = ${Math.max(1, dmg)}`
      }
      break
    case 'bluemagic-1000-needles':
      dmg = 1000
      dmgType = '真实绝对固定伤害'
      trigger = '无视敌方护甲与魔防'
      status = '1000 点穿刺真实扣除'
      breakdown = '固定伤害结算: 绝对命中 1000 真实伤害'
      break
    default:
      dmg = Math.round(simCaster.atk * 2.2 + simCaster.int * 1.8)
      dmgType = '术式综合伤害'
      trigger = '标准绝技结算'
      status = '无异常状态'
      breakdown = `攻击 ${simCaster.atk}×2.2 + 智力 ${simCaster.int}×1.8 = ${dmg}`
      break
  }

  simulationResult.value = {
    damageDisplay: String(dmg),
    damageType: dmgType,
    specialTrigger: trigger,
    combatStatus: status,
    formulaBreakdown: breakdown
  }
}

// Godot 4.x 代码
const gdScriptCode = `# ==============================================================================
# BlueMagicLearningSystem - 青魔法受击拟态观察与技能习得单例
# 文件路径: res://scripts/combat/blue_magic_learning_system.gd
# 架构定位: 挂载于战斗内核，监听怪物法术命中事件并判定青魔道士存活与全队同步
# ==============================================================================
class_name BlueMagicLearningSystem
extends Node

signal blue_magic_learned(spell_id: String, learner_name: String)

# 全局已习得青魔法典藏字典 (SaveGame 同步持久化)
var learned_spells: Dictionary = {
	"bm_white_wind": true,
	"bm_goblin_punch": true,
	"bm_1000_needles": false,
	"bm_mighty_guard": false,
	"bm_lvl5_death": false
}

# 青魔法技能与魔物行为映射表
const BLUE_MAGIC_CATALOG: Dictionary = {
	"spell_white_wind": { "id": "bm_white_wind", "name": "白风", "mp": 28 },
	"spell_1000_needles": { "id": "bm_1000_needles", "name": "千针刺", "mp": 25 },
	"spell_lvl5_death": { "id": "bm_lvl5_death", "name": "5级致死", "mp": 22 },
	"spell_mighty_guard": { "id": "bm_mighty_guard", "name": "强力守护", "mp": 72 },
	"spell_goblin_punch": { "id": "bm_goblin_punch", "name": "哥布林重拳", "mp": 0 }
}

func _ready() -> void:
	print("[BlueMagic] 青魔法拟态监听器就绪，当前已解锁技能数: %d" % get_learned_count())

## 战斗事件监听: 当敌方技能命中我方队员时触发
func on_spell_hit_character(spell_internal_id: String, target_actor: Node) -> void:
	if not BLUE_MAGIC_CATALOG.has(spell_internal_id):
		return # 非青魔法目录内的法术
		
	var spell_data: Dictionary = BLUE_MAGIC_CATALOG[spell_internal_id]
	var spell_id: String = spell_data["id"]
	
	if learned_spells.get(spell_id, false):
		return # 已经学会，跳过
		
	# 检查受击者是否具备【学习 (Learning)】被动能力（青魔道士或装备了青魔纹章）
	if not target_actor.has_method("has_passive") or not target_actor.has_passive("passive_blue_learning"):
		return
		
	# 核心安全法则: 受击者必须在战斗结束或技能结算后存活（HP > 0）
	if target_actor.current_hp <= 0:
		return
		
	# 达成学习条件！
	learned_spells[spell_id] = true
	emit_signal("blue_magic_learned", spell_id, target_actor.actor_name)
	_play_learning_vfx(target_actor)
	print("[BlueMagic] 恭喜！%s 在受击后成功领悟青魔法【%s】！" % [target_actor.actor_name, spell_data["name"]])

func _play_learning_vfx(actor: Node) -> void:
	# 触发头顶光环与提示音效
	if actor.has_method("show_status_popup"):
		actor.show_status_popup("LEARNED!", Color(0.2, 0.9, 1.0))

func get_learned_count() -> int:
	var c := 0
	for k in learned_spells.keys():
		if learned_spells[k]:
			c += 1
	return c
`

const mysidiaFusionGdScriptCode = `# ==============================================================================
# MysidiaDualcastFusionEngine - 米西迪亚太古白黑双魔禁术极化融合与反噬解算引擎
# 文件路径: res://scripts/combat/mysidia_dualcast_fusion_engine.gd
# 架构定位: Godot 4.6 LTS 纯逻辑 RefCounted 类，无外部节点依赖，零内存泄露
# ==============================================================================
class_name MysidiaDualcastFusionEngine
extends RefCounted

signal fusion_executed(spell_data: Dictionary, backfire_occurred: bool)
signal overdrive_warning_triggered(current_overdrive: float)

## 传承导师档案字典
const MENTOR_DATA: Dictionary = {
	"tellah": { "name": "贤者泰拉", "resonance": 2.5, "backfire_resist": 20.0, "school": "破坏系" },
	"palom": { "name": "魔导师帕罗姆", "resonance": 2.2, "backfire_resist": 35.0, "school": "炽炎黑核" },
	"porom": { "name": "神圣波罗姆", "resonance": 2.2, "backfire_resist": 60.0, "school": "神圣白核" },
	"ghido": { "name": "大贤者基多", "resonance": 2.8, "backfire_resist": 45.0, "school": "混沌调和" }
}

## 纯逻辑执行两极融合推演
static func calculate_fusion(
	mentor_id: String,
	white_polarity: float,
	dark_polarity: float,
	mentor_res_mult: float,
	overdrive_pct: float,
	has_dualcast_lens: bool
) -> Dictionary:
	var mentor: Dictionary = MENTOR_DATA.get(mentor_id, MENTOR_DATA["ghido"])
	var total_pol: float = white_polarity + dark_polarity
	var diff_pol: float = abs(white_polarity - dark_polarity)
	var balance_ratio: float = 100.0 - (diff_pol / max(1.0, total_pol) * 100.0)
	
	# 反噬风险计算 (以太过载率 > 100% 递增，受导师抗性抵扣)
	var risk: float = 0.0
	if overdrive_pct > 100.0:
		risk += (overdrive_pct - 100.0) * 0.4
	risk += diff_pol * 0.25
	risk -= float(mentor["backfire_resist"])
	risk = clampf(risk, 0.0, 95.0)
	
	# MP 消耗与瞬发读条准备时间解算
	var mp: int = int(60.0 + total_pol * 0.45)
	if has_dualcast_lens:
		mp = int(float(mp) * 0.75)
		
	var prep_ms: int = int(max(200.0, 1800.0 - mentor_res_mult * 280.0 - (250.0 if has_dualcast_lens else 0.0)))
	
	# 派生奥义判定
	var spell_name: String = ""
	var spell_tier: String = ""
	var magnitude_desc: String = ""
	var is_genesis: bool = false
	
	if balance_ratio >= 80.0 and total_pol >= 80.0:
		spell_name = "太古创世·究极终焉神星 (Genesis Ultima Meteo)"
		spell_tier = "太古神话禁术"
		magnitude_desc = "99,999 真实贯穿"
		is_genesis = true
	elif dark_polarity > white_polarity and dark_polarity >= 65.0:
		spell_name = "虚空坍缩·超新星核爆 (Void Flare Supernova)"
		spell_tier = "禁术级暗核暴走"
		magnitude_desc = "78,500 复合暴击"
	elif white_polarity > dark_polarity and white_polarity >= 65.0:
		spell_name = "绝对神圣·生命救赎创生结界 (Absolute Holy Sanctuary)"
		spell_tier = "神圣级天惠白核"
		magnitude_desc = "35,000 绝对护盾"
	else:
		spell_name = "双魔调和·辉光暗影连环爆裂 (Dualcast Light & Shadow Burst)"
		spell_tier = "高阶战术禁术"
		magnitude_desc = "39,200 连击总效"
		
	return {
		"spell_name": spell_name,
		"spell_tier": spell_tier,
		"magnitude_desc": magnitude_desc,
		"balance_ratio": balance_ratio,
		"mp_cost": mp,
		"prep_time_ms": prep_ms,
		"backfire_risk_pct": risk,
		"is_genesis": is_genesis
	}
`

const activeTeachingGodotTab = ref<'mysidia_fusion' | 'blue_magic' | 'mentor_trial'>('mysidia_fusion')

const currentActiveGdScriptCode = computed(() => {
  if (activeTeachingGodotTab.value === 'mysidia_fusion') return mysidiaFusionGdScriptCode
  if (activeTeachingGodotTab.value === 'mentor_trial') return mentorTrialGdScriptCode
  return gdScriptCode
})

const copyActiveGdScript = () => {
  const code = currentActiveGdScriptCode.value
  const name = activeTeachingGodotTab.value === 'mysidia_fusion' ? 'mysidia_dualcast_fusion_engine.gd' : activeTeachingGodotTab.value === 'mentor_trial' ? 'mentor_trial_inheritance_system.gd' : 'blue_magic_learning_system.gd'
  navigator.clipboard.writeText(code).then(() => {
    message.success(`${name} 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}

// ==========================================
// 🔮 米西迪亚太古白黑双魔禁术极化融合工坊
// ==========================================
interface MysidiaMentor {
  id: string
  name: string
  title: string
  school: string
  avatar: string
  desc: string
  baseResonance: number
  backfireResist: number
}

const mentorList: MysidiaMentor[] = [
  {
    id: 'tellah',
    name: '贤者泰拉 (Sage Tellah)',
    title: '陨石极境破界导师',
    school: '太古破坏系',
    avatar: '🧙‍♂️',
    desc: '昔日米西迪亚大贤者，参透太古陨石神咒终极奥义。施展禁术时拥有最强爆发共振，但伴随激烈以太暗能过载。',
    baseResonance: 2.5,
    backfireResist: 20
  },
  {
    id: 'palom',
    name: '魔导师帕罗姆 (Magus Palom)',
    title: '炽炎爆裂黑核导师',
    school: '炽炎狂暴系',
    avatar: '🔥',
    desc: '米西迪亚天才魔导神童，掌握双重核爆 (Dual Flare) 极化引导诀窍，大幅缩短高阶黑魔法咏唱读条。',
    baseResonance: 2.2,
    backfireResist: 35
  },
  {
    id: 'porom',
    name: '白魔神官波罗姆 (Priestess Porom)',
    title: '神圣创生白核导师',
    school: '纯白天惠系',
    avatar: '🕊️',
    desc: '米西迪亚祈祷圣女，心性纯净澄明。擅长引导绝对神圣救赎力场，提供极致的施法过载防反噬庇护。',
    baseResonance: 2.2,
    backfireResist: 60
  },
  {
    id: 'ghido',
    name: '大贤者基多 (Archmage Ghido)',
    title: '太古阴阳因果导师',
    school: '混沌调和系',
    avatar: '🐢',
    desc: '寿逾七百年的玄武大贤者，掌握白黑两极互补创世法则。在两极极度对称时能引爆太古究极神意。',
    baseResonance: 2.8,
    backfireResist: 45
  }
]

const selectedMentorId = ref('ghido')
const currentMentor = computed(() => mentorList.find(m => m.id === selectedMentorId.value) || mentorList[0])

const whitePolarity = ref(50)
const darkPolarity = ref(50)
const mentorResonance = ref(2.8)
const aetherOverdrive = ref(120)
const enableDualcastCatalyst = ref(true)
const fusionLogs = ref<string[]>([
  '🔮 米西迪亚太古禁术殿堂已开启，太古白黑双魔以太流正在稳定注入。',
  '🐢 当前导师：大贤者基多 (太古阴阳因果)，已激活混沌调和共振光环。'
])

const selectMentor = (id: string) => {
  selectedMentorId.value = id
  const m = currentMentor.value
  mentorResonance.value = m.baseResonance
  fusionLogs.value.unshift(`🧙‍♂️ 已切换导师传承为【${m.name}】，基础共鸣校准为 ${m.baseResonance}x，反噬抗性 +${m.backfireResist}%。`)
}

const polarityBalanceRatio = computed(() => {
  const total = whitePolarity.value + darkPolarity.value
  if (total === 0) return 100
  const diff = Math.abs(whitePolarity.value - darkPolarity.value)
  return Math.max(0, Math.min(100, Math.round(100 - (diff / total) * 100)))
})

const polarityBalanceText = computed(() => {
  const ratio = polarityBalanceRatio.value
  if (ratio >= 90) return '神迹两极绝对契合'
  if (ratio >= 70) return '高阶阴阳平衡共鸣'
  if (ratio >= 40) return '偏斜两极震荡态'
  return '两极严重极化单偏'
})

const autoHarmonizePolarity = () => {
  whitePolarity.value = 50
  darkPolarity.value = 50
  message.success('已自动将白魔圣光与黑魔暗灭极性完美调和至 50%:50%！')
  fusionLogs.value.unshift('⚖️ 两极极化率已完成神圣对称调和 (50%:50%)，太古创世混沌通道已锁定！')
}

const triggerCataclysmOverdrive = () => {
  aetherOverdrive.value = 200
  mentorResonance.value = 3.0
  message.warning('⚠️ 施法以太已提升至 200% 极境过载！导师神化共鸣拉满！')
  fusionLogs.value.unshift('💥 警报：以太超频已激增至 200% 极限界！空间因果正在发生剧烈塌缩！')
}

const baseCalculationIndex = computed(() => {
  const w = whitePolarity.value
  const d = darkPolarity.value
  const res = mentorResonance.value
  const od = aetherOverdrive.value / 100
  return Math.round((w * 1.5 + d * 1.5) * res * od)
})

const backfireRiskRate = computed(() => {
  const od = aetherOverdrive.value
  const diff = Math.abs(whitePolarity.value - darkPolarity.value)
  let risk = 0
  if (od > 100) risk += (od - 100) * 0.4
  risk += diff * 0.25
  risk -= currentMentor.value.backfireResist
  return Math.max(0, Math.min(95, Math.round(risk)))
})

const derivedMpCost = computed(() => {
  let cost = 60 + Math.round((whitePolarity.value + darkPolarity.value) * 0.45)
  if (enableDualcastCatalyst.value) cost = Math.round(cost * 0.75)
  return cost
})

const derivedPrepTime = computed(() => {
  let time = 1800 - Math.round(mentorResonance.value * 280)
  if (enableDualcastCatalyst.value) time -= 250
  return Math.max(200, time)
})

const derivedSpell = computed(() => {
  const w = whitePolarity.value
  const d = darkPolarity.value
  const balance = polarityBalanceRatio.value

  if (balance >= 80 && (w + d) >= 80) {
    return {
      name: '太古创世·究极终焉神星 (Genesis Ultima Meteo)',
      tier: '太古神话禁术',
      nature: '白黑混沌两极归一',
      summary: '以太两极在此归元，光之圣创与暗之寂灭交织成毁灭与再生的创世星辰，引发宇宙因果跃迁。',
      effects: [
        '造成 99,999 点绝对全属性贯穿伤害',
        '全队倒地队员 100% 满血生还复活',
        '全队赋予【创世圣域】无敌护盾 3 回合',
        '永久驱散敌方所有不可驱散的增益光环'
      ]
    }
  } else if (d > w && d >= 65) {
    return {
      name: '虚空坍缩·超新星核爆 (Void Flare Supernova)',
      tier: '禁术级暗核暴走',
      nature: '太古高熵破灭核',
      summary: '黑魔极性能量压倒性积聚，将炽炎与虚空物质引力聚变，产生对敌方全域的黑洞级吞噬。',
      effects: [
        '对敌全体造成 78,500 点暗火复合魔法暴击',
        '附加 5 回合【以太粉碎】：魔防降低 50%',
        '对敌附加【剧毒燃烬】持续流血伤害',
        '打断当前正在咏唱的全部敌方战术指令'
      ]
    }
  } else if (w > d && w >= 65) {
    return {
      name: '绝对神圣·生命救赎创生结界 (Absolute Holy Sanctuary)',
      tier: '神圣级天惠白核',
      nature: '太古高纯神圣源',
      summary: '白魔神圣极性能量极化绽放，将光之水晶初始以太实体化，构建不可逾越的绝对净土。',
      effects: [
        '为全队生成吸收 35,000 点全伤害的神圣庇护壁',
        '全队每回合自动回复 20% 最大生命值',
        '瞬间净化包括即死、石化、诅咒在内的全负面状态',
        '施法者自身获得【天惠加速】咏唱时间缩短 50%'
      ]
    }
  } else {
    return {
      name: '双魔调和·辉光暗影连环爆裂 (Dualcast Light & Shadow Burst)',
      tier: '高阶战术禁术',
      nature: '两极双向互斥态',
      summary: '白魔微光与黑魔爆炎形成螺旋状双轨能量弹，在敌阵中心产生持续连锁震荡冲击。',
      effects: [
        '对敌连续造成 4 段 9,800 点光暗交替打击',
        '全队回复相当于伤害 25% 的生命值',
        '施加 2 回合中度盲目与虚弱减益',
        '为施法者返还 15 点法力值'
      ]
    }
  }
})

const derivedMagnitudeDisplay = computed(() => {
  const s = derivedSpell.value
  if (s.nature.includes('归一')) return '99,999 真实贯穿'
  if (s.nature.includes('破灭')) return '78,500 复合暴击'
  if (s.nature.includes('神圣')) return '35,000 绝对护盾'
  return '39,200 连击总效'
})

const triggerForbiddenFusion = () => {
  const s = derivedSpell.value
  const m = currentMentor.value
  const backfire = Math.random() * 100 < backfireRiskRate.value
  if (backfire) {
    message.error(`⚠️ 禁术反噬！施法者承受了 ${Math.round(derivedMpCost.value * 2.5)} 点以太震荡反冲！`)
    fusionLogs.value.unshift(`⚠️ 反噬判定生效！以太超频过激，【${s.name}】能量回流！但凭借导师【${m.name}】的庇护，核心术式依然成型！`)
  } else {
    message.success(`🎉 极化禁术【${s.name}】融合成功！`)
    fusionLogs.value.unshift(`✨ 极化推演大获全胜！【${s.name}】成功显现，预估效能：${derivedMagnitudeDisplay.value}，耗时 ${derivedPrepTime.value}ms。`)
  }
}

const exportMysidiaCertificate = () => {
  const s = derivedSpell.value
  const m = currentMentor.value
  const timestamp = new Date().toISOString()
  const certId = 'MYSIDIA-DUALCAST-' + Date.now().toString(36).toUpperCase()
  const content = [
    '================================================================================',
    '《光之战士：时空裂隙》米西迪亚太古白黑双魔禁术极化融合与导师传承方案书',
    '================================================================================',
    `方案编号: ${certId}`,
    `签署时间: ${timestamp}`,
    '认证矩阵: VBLE Teachings & Mysidia Forbidden Arts Matrix v2.2.271',
    '系统架构: Godot 4.6 LTS / RefCounted Dualcast Fusion Engine',
    '',
    '【传承导师档案】',
    `• 导师位格: ${m.name} (${m.title})`,
    `• 传承流派: ${m.school}`,
    `• 共鸣增幅倍率: ${mentorResonance.value.toFixed(1)}x (基准 ${m.baseResonance}x)`,
    `• 反噬豁免加成: +${m.backfireResist}%`,
    '',
    '【极化动力学核心参数】',
    `• 太古白魔极化率: ${whitePolarity.value}%`,
    `• 太古黑魔极化率: ${darkPolarity.value}%`,
    `• 两极平衡调和度: ${polarityBalanceRatio.value}% (${polarityBalanceText.value})`,
    `• 施法以太过载率: ${aetherOverdrive.value}%`,
    `• 双重施法透镜: ${enableDualcastCatalyst.value ? '已装配 (-25% MP 优化)' : '未启用'}`,
    '',
    '【融合派生禁术奥义】',
    `• 禁术名称: ${s.name}`,
    `• 术式品阶: ${s.tier}`,
    `• 以太质性: ${s.nature}`,
    `• 预估破灭/护盾效能: ${derivedMagnitudeDisplay.value}`,
    `• 瞬发准备时间: ${derivedPrepTime.value} ms`,
    `• 实际法力消耗: ${derivedMpCost.value} MP`,
    `• 反噬风险指数: ${backfireRiskRate.value}%`,
    '',
    '【特异效果与全域词缀】',
    ...s.effects.map((e, i) => `  ${i + 1}. ${e}`),
    '',
    '【底层实机契约签名】',
    `SHA-256 安全哈希: ${Array.from(certId + timestamp).map(c => (c.charCodeAt(0) * 31 % 16).toString(16)).join('').padEnd(64, 'f')}`,
    '================================================================================'
  ].join('\n')

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `mysidia_forbidden_dualcast_${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
  message.success('已成功导出《米西迪亚太古白黑双魔禁术方案书》！')
  fusionLogs.value.unshift(`📜 方案书已完成 SHA-256 离线安全签署并导出：编号 ${certId}`)
}

// ==========================================
// 🎯 青魔法实战受击领悟与魔兽使操纵工坊
// ==========================================
interface BlueMagicLearningTarget {
  id: string
  name: string
  icon: string
  monster: string
  reqControl: boolean
  reqLevelMultiple: number
  dmg: number
  heal: number
  desc: string
}

const learningTargets: BlueMagicLearningTarget[] = [
  {
    id: 'white_wind',
    name: '白风 (White Wind)',
    icon: '🍃',
    monster: '狂风鸟妖 (Harpy)',
    reqControl: true,
    reqLevelMultiple: 0,
    dmg: 0,
    heal: 3200,
    desc: '狂风鸟妖天生只对友方施展白风！必须使用魔兽使【操纵】指令控制鸟妖，强制其对光之战士施放方可领悟！'
  },
  {
    id: 'mighty_guard',
    name: '强力守护 (Mighty Guard)',
    icon: '🛡️',
    monster: '坚甲巨海龟 (Ironback Turtle)',
    reqControl: true,
    reqLevelMultiple: 0,
    dmg: 0,
    heal: 0,
    desc: '坚甲海龟防守本能极强，仅在被魔兽使深度操纵下才会为敌方施加全屏壳防与物防！'
  },
  {
    id: 'lv5_death',
    name: '等级5即死 (Level 5 Death)',
    icon: '💀',
    monster: '古代死灵法师 (Necromancer)',
    reqControl: false,
    reqLevelMultiple: 5,
    dmg: 9999,
    heal: 0,
    desc: '死灵咒语仅对等级为 5 的倍数（如 Lv.25, 30, 35）的目标起效！必须提前预备复活，或生还瞬间方可学会！'
  },
  {
    id: 'self_destruct',
    name: '自爆 (Self-Destruct)',
    icon: '💥',
    monster: '赤红爆弹怪 (Red Bomb)',
    reqControl: false,
    reqLevelMultiple: 0,
    dmg: 3800,
    heal: 0,
    desc: '残血时狂暴自爆！青魔道士必须亲自肉身硬抗爆炸伤害并且不能阵亡（HP > 0），战后立即习得！'
  },
  {
    id: 'goblin_punch',
    name: '哥布林重拳 (Goblin Punch)',
    icon: '🥊',
    monster: '哥布林拳师 (Goblin Brawler)',
    reqControl: false,
    reqLevelMultiple: 0,
    dmg: 1200,
    heal: 0,
    desc: '新手序章最具代表性的青魔法！只要让哥布林挥拳命中我方青魔道士，生还后立即领悟！'
  },
  {
    id: 'missile',
    name: '微型导弹 (Missile)',
    icon: '🚀',
    monster: '机械火枪火箭塔 (Rocket Mecha)',
    reqControl: false,
    reqLevelMultiple: 0,
    dmg: 2500,
    heal: 0,
    desc: '重创当前 HP 的 75%，极危险的削血绝技！'
  }
]

const selectedLearnTargetId = ref('white_wind')
const mageLevel = ref(30)
const mageHp = ref(4500)
const mageMaxHp = ref(5000)
const hasLearningPassive = ref(true)
const beastControlSuccess = ref(true)
const learningLogs = ref<string[]>([])
const learnedSpells = ref<string[]>(['goblin_punch'])

const currentLearnTargetObj = computed(() => {
  return learningTargets.find(t => t.id === selectedLearnTargetId.value) || learningTargets[0]
})

const getLearnLogClass = (log: string) => {
  if (log.includes('🎉') || log.includes('成功')) return 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
  if (log.includes('💀') || log.includes('❌') || log.includes('阵亡')) return 'border-rose-500 bg-rose-950/20 text-rose-300'
  if (log.includes('⚠️') || log.includes('未能') || log.includes('提示')) return 'border-amber-500 bg-amber-950/20 text-amber-300'
  return 'border-cyan-500 bg-cyan-950/20 text-cyan-300'
}

const triggerLearnAttempt = () => {
  const target = currentLearnTargetObj.value
  learningLogs.value = []

  // 1. 检查被动能力
  if (!hasLearningPassive.value) {
    learningLogs.value.unshift('❌ 领悟失败：角色未装备【学习 (Learning)】被动特性！目睹了技能施展，但无法解析其魔力构造成分！')
    return
  }

  // 2. 检查需操纵机制
  if (target.reqControl && !beastControlSuccess.value) {
    learningLogs.value.unshift(`⚠️ 领悟失败：【${target.monster}】本能地将【${target.name}】施放到了敌方魔物自己身上！提示：必须开启魔兽使【操纵】开关方能令其对我方施放！`)
    return
  }

  // 3. 检查等级倍数机制 (如等级5即死)
  if (target.reqLevelMultiple > 0) {
    if (mageLevel.value % target.reqLevelMultiple !== 0) {
      learningLogs.value.unshift(`🛡️ 判定免疫：角色当前为 Lv.${mageLevel.value}，并非 ${target.reqLevelMultiple} 的整数倍！【${target.name}】判定为 MISS 穿身而过，未实际命中无法触发生还记忆！`)
      return
    }
  }

  // 4. 生还与伤害扣减检查 (HP > 0)
  if (target.dmg > 0) {
    if (target.dmg >= mageHp.value) {
      mageHp.value = 0
      learningLogs.value.unshift(`💀 致命重创：角色承受了 ${target.dmg} 点超量伤害，HP 归零倒地力竭！阵亡状态下无法记忆法术！领悟失败！`)
      return
    } else {
      mageHp.value -= target.dmg
      learningLogs.value.unshift(`💥 承受重击：角色承受了 ${target.dmg} 点伤害（剩余 HP: ${mageHp.value}），咬牙坚挺屹立不倒！`)
    }
  } else if (target.heal > 0) {
    mageHp.value = Math.min(mageMaxHp.value, mageHp.value + target.heal)
    learningLogs.value.unshift(`✨ 圣风沐浴：角色的心灵感受到了温煦的以太回流（HP 回复至: ${mageHp.value}）！`)
  }

  // 5. 达成领悟！
  if (!learnedSpells.value.includes(target.id)) {
    learnedSpells.value.push(target.id)
  }
  learningLogs.value.unshift(`🎉 领悟成功！角色在受击后成功洞悉了魔物以太循环，已将青魔法【${target.name}】刻录入青魔道全典！`)
}

const resetLearningLab = () => {
  mageHp.value = 4500
  hasLearningPassive.value = true
  beastControlSuccess.value = true
  learningLogs.value = []
  learnedSpells.value = ['goblin_punch']
  message.success('已重置青魔法实战演练台参数与学习状态')
}


// ================= 模块六：太古导师试炼、青魔法基因烙印与技能导师传授工坊 (v2.2.286) =================
interface MentorArchetype {
  id: string
  name: string
  icon: string
  desc: string
  color: string
  perkBonus: string
}

const mentorArchetypesList: MentorArchetype[] = [
  {
    id: 'mysidia_archmage',
    name: '米西迪亚大导师 · 吉多',
    icon: '🧙‍♂️',
    desc: '太古魔法全知印记，MP 消耗 -30%，神圣陨石合一',
    color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    perkBonus: '全知印记 / 减耗 30%'
  },
  {
    id: 'ninja_kunoichi',
    name: '飞龙之峰忍道首领 · 半藏',
    icon: '🥷',
    desc: '影子分身与五遁合一，二连击率 +40%，破盾真伤',
    color: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
    perkBonus: '二连击 +40% / 影分身'
  },
  {
    id: 'beastmaster_sage',
    name: '幻兽森林古隐士 · 沃鲁斯',
    icon: '🐾',
    desc: '魔物基因烙印与强制操纵，青魔法威能 +50%',
    color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300',
    perkBonus: '基因烙印 / 青魔 +50%'
  },
  {
    id: 'knight_crusader',
    name: '巴隆圣骑士团长 · 塞西尔',
    icon: '🛡️',
    desc: '守护誓约与舍身圣盾，全队承伤转移 60%',
    color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
    perkBonus: '承伤转移 60% / 圣盾'
  }
]

const selectedTrialMentorId = ref('mysidia_archmage')
const mentorAffinity = ref(75)
const trialDifficultyRank = ref(6)
const inheritedSpellsCount = ref(4)
const transcendenceResonance = ref(120)

const geneImprintingPermit = ref(true)
const limitBreakAura = ref(true)
const secretMasteryPact = ref(false)

const currentMentorObj = computed(() => {
  return mentorArchetypesList.find(m => m.id === selectedTrialMentorId.value) || mentorArchetypesList[0]
})

const calculatedMentorCombatPower = computed(() => {
  const base = mentorAffinity.value * 450 + trialDifficultyRank.value * 3200
  let total = base * (transcendenceResonance.value / 100)
  if (secretMasteryPact.value) {
    total *= 1.3
  }
  return Math.round(total)
})

const calculatedInheritedDamageBoost = computed(() => {
  let boost = 20 + inheritedSpellsCount.value * 8.5 * (mentorAffinity.value / 100)
  if (geneImprintingPermit.value) {
    boost *= 1.25
  }
  return `+${Math.round(boost)}%`
})

const calculatedTrialPassProbability = computed(() => {
  let pass = 100 - (trialDifficultyRank.value * 8) + (mentorAffinity.value * 0.4)
  if (limitBreakAura.value) {
    pass += 25
  }
  const clamped = Math.min(99, Math.max(15, Math.round(pass)))
  return `${clamped}%`
})

const calculatedSecretArtRank = computed(() => {
  if (trialDifficultyRank.value >= 8) return 'EX 诸神极意'
  if (trialDifficultyRank.value >= 5) return 'SSR 导师宗师'
  return 'SR 试炼精通'
})

const scrollToMentorTrialStudio = () => {
  activeViewTab.value = 'mentor_trial'
  setTimeout(() => {
    const el = document.getElementById('mentor-trial-studio')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

// 导师试炼五阶段推演终端
interface TrialTerminalLog {
  time: string
  message: string
  color: string
}

const isTrialSimulating = ref(false)
const trialSimStage = ref(0)
const trialSimFinished = ref(false)
const trialTerminalLogs = ref<TrialTerminalLog[]>([
  {
    time: 'INIT',
    message: '太古导师试炼与基因烙印工坊就绪。准备建立导师精神场域。',
    color: 'text-gray-400'
  }
])

function appendTrialLog(msg: string, color = 'text-cyan-400') {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
  trialTerminalLogs.value.push({ time: timeStr, message: msg, color })
}

function runMentorTrialSimulation() {
  if (isTrialSimulating.value) return
  isTrialSimulating.value = true
  trialSimFinished.value = false
  trialSimStage.value = 1
  appendTrialLog('▶ 启动五阶段太古导师试炼修行程序...', 'text-cyan-400 font-bold')

  setTimeout(() => {
    trialSimStage.value = 2
    appendTrialLog(`[阶段 1/5] 与导师【${currentMentorObj.value.name}】建立心相契合度 ${mentorAffinity.value}%，开启 ${trialDifficultyRank.value} 阶秘境`, 'text-cyan-300')

    setTimeout(() => {
      trialSimStage.value = 3
      const geneText = geneImprintingPermit.value ? '已激活强制基因烙印' : '传统受击领悟'
      appendTrialLog(`[阶段 2/5] 展开 ${inheritedSpellsCount.value} 个奥义槽位，魔物基因状态[${geneText}]`, 'text-purple-300')

      setTimeout(() => {
        trialSimStage.value = 4
        const auraText = limitBreakAura.value ? '已展开致死反噬抵御' : '未开启'
        const pactText = secretMasteryPact.value ? '已缔结血契(+30% CP)' : '普通传授'
        appendTrialLog(`[阶段 3/5] 校验导师庇护光环[${auraText}]与奥义心法[${pactText}]`, 'text-amber-300')

        setTimeout(() => {
          trialSimStage.value = 5
          appendTrialLog(`[阶段 4/5] 导师传授战力解算: ${calculatedMentorCombatPower.value.toLocaleString()} CP，伤害增幅: ${calculatedInheritedDamageBoost.value}`, 'text-emerald-300')

          setTimeout(() => {
            isTrialSimulating.value = false
            trialSimFinished.value = true
            appendTrialLog(`✓ [阶段 5/5] 导师试炼结业！胜率: ${calculatedTrialPassProbability.value}，位阶: ${calculatedSecretArtRank.value}`, 'text-emerald-400 font-bold')
            message.success('太古导师试炼五阶段修行完成！')
          }, 350)
        }, 350)
      }, 350)
    }, 350)
  }, 350)
}

function exportMentorTrialCertificate() {
  const certData = {
    standard: 'Godot 4.6 LTS / VBLE Mentor Trial Matrix v2.2.286',
    timestamp: new Date().toISOString(),
    mentor: selectedTrialMentorId.value,
    parameters: {
      mentorAffinity: mentorAffinity.value,
      trialDifficultyRank: trialDifficultyRank.value,
      inheritedSpellsCount: inheritedSpellsCount.value,
      transcendenceResonance: transcendenceResonance.value,
      geneImprintingPermit: geneImprintingPermit.value,
      limitBreakAura: limitBreakAura.value,
      secretMasteryPact: secretMasteryPact.value
    },
    results: {
      mentorCombatPower: calculatedMentorCombatPower.value,
      inheritedDamageBoost: calculatedInheritedDamageBoost.value,
      trialPassProbability: calculatedTrialPassProbability.value,
      secretArtRank: calculatedSecretArtRank.value
    },
    sha256Signature: 'SHA256-MENTOR-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mentor_trial_v2.2.286_${selectedTrialMentorId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出太古导师试炼结业方案书证书！')
}

const mentorTrialGdScriptCode = `# ==============================================================================
# MentorTrialInheritanceSystem - 太古导师试炼与青魔法基因烙印传授引擎
# 文件路径: res://scripts/teachings/mentor_trial_inheritance_system.gd
# 架构规范: Godot 4.6 LTS / VBLE Teachings Matrix v2.2.286
# 核心职责: 管理导师心境契合度、青魔法免挨打基因烙印与心法奥义派生
# ==============================================================================
class_name MentorTrialInheritanceSystem
extends RefCounted

static func evaluate_mentor_combat_power(
	affinity: int,
	difficulty: int,
	resonance: float,
	has_pact: bool
) -> int:
	var base_power: float = float(affinity) * 450.0 + float(difficulty) * 3200.0
	var final_power: float = base_power * (resonance / 100.0)
	if has_pact:
		final_power *= 1.3
	return int(round(final_power))

static func calculate_trial_pass_rate(
	difficulty: int,
	affinity: int,
	has_aura: bool
) -> float:
	var pass_rate: float = 100.0 - (float(difficulty) * 8.0) + (float(affinity) * 0.4)
	if has_aura:
		pass_rate += 25.0
	return clampf(pass_rate, 15.0, 99.0)

static func imprint_blue_magic_gene(
	monster_spell_id: String,
	current_character: Dictionary,
	force_imprint: bool
) -> Dictionary:
	if force_imprint:
		return {
			"success": true,
			"spell_id": monster_spell_id,
			"reason": "Ancient Mentor Gene Imprinting Bypass"
		}
	return {
		"success": false,
		"reason": "Requires taking direct combat damage from creature"
	}
`

// ==================== v2.2.312 初心导引与名师指津工坊状态与方法 ====================
const scrollToNoviceMentorshipStudio = () => {
  const el = document.getElementById('novice-mentorship-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    message.success('已直达初心导引与名师指津工坊')
  }
}

interface MentorshipArchetype {
  id: string
  name: string
  icon: string
  badge: string
  desc: string
  power: string
  passRate: string
  affinity: number
  frames: number
  imprintRate: number
  awakening: number
}

const mentorshipArchetypes: MentorshipArchetype[] = [
  {
    id: 'novice_onboarding',
    name: '初心启蒙上手流',
    icon: '🌱',
    badge: '零门槛启航',
    desc: '系统化四水晶属性教学，致命伤锁血圣盾全程兜底护航。',
    power: '+12,500 CP',
    passRate: '99.5%',
    affinity: 85,
    frames: 25,
    imprintRate: 50,
    awakening: 1.5
  },
  {
    id: 'atb_frame_mastery',
    name: '极限打断帧微操流',
    icon: '⚡',
    badge: '高阶进阶',
    desc: '聚焦首领狂暴蓄力红光，子弹时间下毫秒级精准拼刀打断。',
    power: '+28,000 CP',
    passRate: '94.2%',
    affinity: 90,
    frames: 8,
    imprintRate: 75,
    awakening: 3.2
  },
  {
    id: 'blue_mimicry_codex',
    name: '太古青魔法肉身拟态流',
    icon: '🧬',
    badge: '基因烙印',
    desc: '免挨打基因传授协议，全域魔物特异技能 100% 捕获复现。',
    power: '+34,500 CP',
    passRate: '91.8%',
    affinity: 95,
    frames: 12,
    imprintRate: 98,
    awakening: 2.8
  },
  {
    id: 'grandmaster_dao',
    name: '太古名师心法极意流',
    icon: '🌌',
    badge: '宗师奥义',
    desc: '全被动无损继承，五遁与太古禁术融合，觉醒伤害突破极限。',
    power: '+48,000 CP',
    passRate: '98.8%',
    affinity: 100,
    frames: 15,
    imprintRate: 90,
    awakening: 4.5
  }
]

const selectedMentorshipArchetype = ref<MentorshipArchetype>(mentorshipArchetypes[3])

const noviceMentorAffinity = ref(100)
const interruptFrames = ref(15)
const geneImprintRate = ref(90)
const awakeningMultiplier = ref(4.5)

const enableNoviceShield = ref(true)
const enableLosslessPassiveInherit = ref(true)
const enableBulletTimeTelegraph = ref(true)

const selectMentorshipArchetype = (arch: MentorshipArchetype) => {
  selectedMentorshipArchetype.value = arch
  noviceMentorAffinity.value = arch.affinity
  interruptFrames.value = arch.frames
  geneImprintRate.value = arch.imprintRate
  awakeningMultiplier.value = arch.awakening
  message.info(`已装配授业流派原型: ${arch.name}`)
}

const resetMentorshipDefaults = () => {
  selectMentorshipArchetype(mentorshipArchetypes[3])
  enableNoviceShield.value = true
  enableLosslessPassiveInherit.value = true
  enableBulletTimeTelegraph.value = true
}

const calculatedCpBoost = computed(() => {
  let baseCp = noviceMentorAffinity.value * 220 + awakeningMultiplier.value * 5500
  if (enableLosslessPassiveInherit.value) baseCp += 6500
  if (enableNoviceShield.value) baseCp += 3000
  return Math.floor(baseCp)
})

const calculatedTrialPassRate = computed(() => {
  let rate = 70 + (noviceMentorAffinity.value / 100) * 15 + (interruptFrames.value / 30) * 10
  if (enableBulletTimeTelegraph.value) rate += 4.5
  return Math.min(99.9, Number(rate.toFixed(1)))
})

const calculatedMimicryCoverage = computed(() => {
  let cov = 60 + (geneImprintRate.value / 100) * 35
  if (enableLosslessPassiveInherit.value) cov += 4.5
  return Math.min(99.9, Number(cov.toFixed(1)))
})

const calculatedMentorCert = computed(() => {
  const score = calculatedTrialPassRate.value
  if (score >= 98.0) return 'EX·太古宗师泰斗'
  if (score >= 95.0) return 'SSS·高阶名师导师'
  if (score >= 90.0) return 'SS·精通试炼导师'
  return 'S·见习导师执照'
})

const isMentorSimulating = ref(false)
const mentorSimStage = ref(1)
const mentorSimStageName = ref('就绪等待')
const mentorSimProgress = ref(0)
const mentorCertHash = ref('B4F2E7D9-9A1C-4B3E-8D5F-1C2E3D4F5A6B')

interface MentorLogEntry {
  time: string
  text: string
  color: string
}

const mentorLogs = ref<MentorLogEntry[]>([
  { time: '13:00:00', text: '[MentorshipInit] 初心导引与名师指津工坊初始化就绪，等待注入研修指令...', color: 'text-gray-400' }
])

const runMentorshipSimulation = () => {
  if (isMentorSimulating.value) return
  isMentorSimulating.value = true
  mentorSimStage.value = 1
  mentorSimProgress.value = 15
  mentorSimStageName.value = '初心者启蒙圣所环境自检与锁血圣盾挂载'
  mentorLogs.value = [
    { time: new Date().toLocaleTimeString(), text: '[NoviceShield] 致命伤锁血圣盾完成部署，兜底阈值 1 HP 保障生效', color: 'text-rose-400' }
  ]

  setTimeout(() => {
    mentorSimStage.value = 2
    mentorSimProgress.value = 40
    mentorSimStageName.value = '首领大招前摇子弹时间与判定帧微操对齐'
    mentorLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[BulletTime] 首领蓄力减速 75%，判定窗口 ${interruptFrames.value} 帧，打断成功率 ${calculatedTrialPassRate.value}%`,
      color: 'text-amber-400'
    })
  }, 400)

  setTimeout(() => {
    mentorSimStage.value = 3
    mentorSimProgress.value = 65
    mentorSimStageName.value = '青魔法魔物基因烙印与免挨打传授通道开启'
    mentorLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[GeneImprint] 免伤基因传授烙印率 ${geneImprintRate.value}%，完成 32 种魔物拟态技能注入`,
      color: 'text-cyan-400'
    })
  }, 800)

  setTimeout(() => {
    mentorSimStage.value = 4
    mentorSimProgress.value = 85
    mentorSimStageName.value = '太古名师心法极意觉醒突破封板'
    mentorLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[DaoAwakening] 战力加成 +${calculatedCpBoost.value} CP，突破倍率 ${awakeningMultiplier.value.toFixed(1)}x 无损融合`,
      color: 'text-purple-400'
    })
  }, 1200)

  setTimeout(() => {
    mentorSimStage.value = 5
    mentorSimProgress.value = 100
    mentorSimStageName.value = '推演闭环完成，传承证书已签署'
    const hex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('').toUpperCase()
    mentorCertHash.value = `MTR-${hex}-${Math.floor(Date.now() / 1000)}`
    mentorLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[Done] 全息导引推演完成！名师传承级别: ${calculatedMentorCert.value}`,
      color: 'text-emerald-300 font-bold'
    })
    isMentorSimulating.value = false
    message.success('全息导引与名师指津推演完成！')
  }, 1600)
}

const exportMentorCert = () => {
  const data = {
    studio: 'Novice Onboarding, Combat Mastery & Master Mentorship Studio v2.2.312',
    timestamp: new Date().toISOString(),
    archetype: selectedMentorshipArchetype.value.name,
    mentorAffinity: noviceMentorAffinity.value,
    interruptFrames: interruptFrames.value,
    geneImprintRate: geneImprintRate.value,
    awakeningMultiplier: awakeningMultiplier.value,
    cpBoost: calculatedCpBoost.value,
    trialPassRate: calculatedTrialPassRate.value,
    mimicryCoverage: calculatedMimicryCoverage.value,
    mentorCert: calculatedMentorCert.value,
    sha256Signature: mentorCertHash.value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mentor-trial-${mentorCertHash.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('防伪证书与传承报告已导出')
}

// Godot 4.6 LTS 源码展台
const activeMentorshipCodeTab = ref('tutorial_director')
const mentorshipCodeTabs = [
  { id: 'tutorial_director', name: '新手引导与子弹时间导演' },
  { id: 'stagger_evaluator', name: '打断判定与硬直判定器' },
  { id: 'inheritance_pact', name: '名师传承无损协议系统' }
]

const mentorshipSourceCodes: Record<string, string> = {
  tutorial_director: `## novice_tutorial_director.gd
## 《光之战士：时空裂隙》初心者全息引导与子弹时间减速导演
## 架构版本: Godot 4.6 LTS / Novice Guidance System

class_name NoviceTutorialDirector
extends Node

signal bullet_time_triggered(time_scale: float, duration_seconds: float)
signal novice_fatal_ward_saved(current_hp: int)

var _is_bullet_time_active: bool = false
var _fatal_ward_active: bool = true

## 开启首领蓄力子弹时间 (减速至 25%)
func enter_boss_telegraph_bullet_time(scale: float = 0.25, duration: float = 2.0) -> void:
	if _is_bullet_time_active:
		return
	_is_bullet_time_active = true
	Engine.time_scale = scale
	bullet_time_triggered.emit(scale, duration)
	
	var timer := get_tree().create_timer(duration * scale, true, false, true)
	timer.timeout.connect(func():
		Engine.time_scale = 1.0
		_is_bullet_time_active = false
	)

## 新手保护锁血圣盾检验
func intercept_fatal_damage(incoming_damage: int, current_hp: int) -> int:
	if current_hp - incoming_damage <= 0 and _fatal_ward_active:
		_fatal_ward_active = false
		novice_fatal_ward_saved.emit(1)
		push_warning("[NoviceShield] 触发致命伤锁血圣盾，角色保留 1 点生命值！")
		return current_hp - 1
	return incoming_damage
`,
  stagger_evaluator: `## combat_stagger_frame_evaluator.gd
## 《光之战士：时空裂隙》实战技能打断帧窗口与极限硬直判定器
## 架构版本: Godot 4.6 LTS / Battle Tactics Engine

class_name CombatStaggerFrameEvaluator
extends RefCounted

signal boss_interrupted(boss_id: String, counter_damage: int)
signal interrupt_missed(reason: String)

var _window_frames: int = 15
var _current_frame_counter: int = 0

func _init(window: int = 15) -> void:
	_window_frames = window

## 判定玩家攻击是否命中首领蓄力帧窗口
func evaluate_player_counter(boss_state: Dictionary, input_frame: int) -> bool:
	var telegraph_start: int = boss_state.get("telegraph_start_frame", 0)
	var diff := input_frame - telegraph_start
	
	if diff >= 0 and diff <= _window_frames:
		var counter_dmg = int(boss_state.get("incoming_damage", 1000) * 2.5)
		boss_interrupted.emit(boss_state.get("boss_id", "UNKNOWN"), counter_dmg)
		return true
	else:
		interrupt_missed.emit("Out of timing window (diff: %d frames, limit: %d frames)" % [diff, _window_frames])
		return false
`,
  inheritance_pact: `## master_inheritance_pact_system.gd
## 《光之战士：时空裂隙》太古名师心法极意与青魔法基因无损传承系统
## 架构版本: Godot 4.6 LTS / Character Mentorship

class_name MasterInheritancePactSystem
extends RefCounted

signal passive_inherited(passive_id: String, potency: float)
signal blue_magic_unlocked(spell_name: String)

var _mentor_passives: Array[Dictionary] = []
var _lossless_mode: bool = true

func register_master_passive(id: String, potency: float, type: String) -> void:
	_mentor_passives.append({ "id": id, "potency": potency, "type": type })

## 将名师所有精通被动 100% 无损注入学徒数据
func transfer_pact_to_apprentice(apprentice_stats: Dictionary) -> Dictionary:
	var result := apprentice_stats.duplicate(true)
	if not result.has("passives"):
		result["passives"] = []
		
	for p in _mentor_passives:
		result["passives"].append(p["id"])
		passive_inherited.emit(p["id"], p["potency"])
		
	result["mentor_affinity"] = 100
	result["mastery_awakened"] = true
	return result
`
}

const currentMentorshipCode = computed(() => {
  return mentorshipSourceCodes[activeMentorshipCodeTab.value] || ''
})

const copyActiveMentorshipCode = () => {
  navigator.clipboard.writeText(currentMentorshipCode.value).then(() => {
    message.success(`${activeMentorshipCodeTab.value}.gd 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}

</script>

<style scoped>
.teaching-category-button:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 3px;
}
</style>
