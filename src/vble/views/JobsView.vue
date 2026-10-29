<template>
  <div class="jobs-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">VBLE Crystal Tree, Passive Fusion &amp; Secret Rebirth Studio v2.2.332</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">二十八大职业双轨觉醒、天梯极意流转与万能先驱者矩阵工坊</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        当前目录收录 {{ jobsList.length }} 个职业，其中水晶职业 {{ jobsList.filter(j => j.crystal !== 'special').length }} 个；支持多维分类查阅、双职业构筑连锁、自由人全被动继承、进阶转生太古奥义与极限命座星图推演。
      </p>
    </div>

    <!-- 主视图模式切换 Tabs -->
    <div class="flex justify-center border-b border-slate-800 pb-3">
      <div class="inline-flex p-1 bg-slate-900/90 rounded-xl border border-slate-800 flex-wrap justify-center gap-1">
        <button
          type="button"
          class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all"
          :class="activeMainTab === 'catalog' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'catalog'"
        >
          📜 职业全典与精通继承 ({{ jobsList.length }}职)
        </button>
        <button
          type="button"
          class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5"
          :class="activeMainTab === 'studio' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'studio'"
        >
          <span>⚡</span>
          <span>职业技能可用性与转职推演</span>
        </button>
        <button
          type="button"
          class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5"
          :class="activeMainTab === 'synergy' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'synergy'"
        >
          <span>🔮</span>
          <span>双职业构筑搭配与连锁共鸣工坊</span>
          <n-badge value="HOT" type="error" />
        </button>
        <button
          type="button"
          class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5"
          :class="activeMainTab === 'abp_mastery' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'abp_mastery'"
        >
          <span>💎</span>
          <span>自由人极意被动继承与ABP挂机推演沙盘</span>
        </button>
        <button
          type="button"
          class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5"
          :class="activeMainTab === 'transcendence_tree' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'transcendence_tree'"
        >
          <span>🌟</span>
          <span>进阶转生与太古奥义传承工坊</span>
          <n-badge value="v2.2.263" type="warning" />
        </button>
        <button
          type="button"
          class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5"
          :class="activeMainTab === 'hyper_mastery_matrix' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'hyper_mastery_matrix'"
        >
          <span>✨</span>
          <span>太古职业潜能觉醒与极限命座星图工坊</span>
          <n-badge value="v2.2.282" type="warning" />
        </button>
        <button
          type="button"
          class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5"
          :class="activeMainTab === 'omni_pioneer_matrix' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'omni_pioneer_matrix'"
        >
          <span>🌌</span>
          <span>二十八大职业双轨觉醒与万能先驱者矩阵工坊</span>
          <n-badge value="v2.2.302" type="error" />
        </button>
        <button
          type="button"
          class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5"
          :class="activeMainTab === 'crystal_passive_rebirth' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'crystal_passive_rebirth'"
        >
          <span>🔮</span>
          <span>三十职业水晶转职树、被动融合与奥义转生工坊</span>
          <n-badge value="v2.2.332" type="success" />
        </button>
      </div>
    </div>

    <!-- ================= 视图 1: 职业卡片目录 ================= -->
    <div v-if="activeMainTab === 'catalog'" class="space-y-6">
      <!-- 水晶分类筛选 (高对比度夜间水晶按键) -->
      <div role="group" aria-label="水晶分类筛选" class="flex flex-wrap gap-2 justify-center">
        <button
          v-for="c in crystals"
          :key="c.id"
          :aria-pressed="selectedCrystal === c.id"
          class="px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 border cursor-pointer select-none"
          :class="selectedCrystal === c.id
            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30 font-black'
            : 'bg-slate-800 text-gray-200 border-slate-700 hover:bg-slate-700 hover:text-white'"
          @click="selectedCrystal = c.id"
        >
          {{ c.name }} ({{ c.count }}职)
        </button>
      </div>

      <!-- 职业网格卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <n-card
          v-for="job in paginatedList"
          :key="job.id"
          hoverable
          class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-base font-bold text-amber-300">{{ job.name }}</span>
              <n-tag size="tiny" :type="getCrystalTag(job.crystal)">
                {{ job.crystalName }}
              </n-tag>
            </div>
          </template>

          <div class="space-y-3 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>战术定位: <strong class="text-cyan-300">{{ job.role }}</strong></span>
            </div>

            <div class="p-2.5 bg-slate-900/80 rounded border border-slate-800 space-y-1">
              <div class="text-gray-400">🛡️ 装备范畴: <span class="text-gray-200">{{ job.equipTypes }}</span></div>
              <div class="text-amber-400/90 font-medium">⚡ 固有特权: {{ job.innateAbility }}</div>
            </div>

            <div class="space-y-1">
              <div class="text-gray-400">🔥 招牌技能:</div>
              <div class="flex flex-wrap gap-1">
                <n-tag v-for="sk in job.signatureSkills" :key="sk" size="tiny" type="default">
                  {{ sk }}
                </n-tag>
              </div>
            </div>

            <div class="p-2 bg-purple-950/20 border border-purple-900/30 rounded text-purple-300/90">
              👑 精通 (Master) 继承加成: {{ job.masteryBonus }}
            </div>

            <!-- 推荐兼修路线说明 (对齐 Godot 4.3 引擎 job_inheritance_additional_routes.gd) -->
            <div
              v-if="['ninja', 'knight', 'monk', 'hunter', 'freelancer', 'mime'].includes(job.id)"
              class="p-2.5 bg-cyan-950/40 border border-cyan-500/40 rounded text-cyan-300 space-y-1"
            >
              <div class="font-bold flex items-center gap-1 text-[11px]">
                <span>💡</span>
                <span>推荐兼修继承路线 (JobRecommendation):</span>
              </div>
              <div class="text-[11px] leading-relaxed text-gray-200">
                {{ getJobRecommendation(job.id) }}
              </div>
            </div>

            <!-- 峰值属性继承与目录预览机制 (对齐 Godot 4.3 引擎 job_mastery_peak_info.gd 最新目录预览规范) -->
            <div
              class="p-2.5 bg-amber-950/20 border border-amber-500/30 rounded text-amber-200 space-y-1"
            >
              <div class="font-bold flex items-center justify-between text-[11px] text-amber-300">
                <span class="flex items-center gap-1">
                  <span>🎯</span>
                  <span>峰值属性继承与精通预览 (JobMasteryPeak):</span>
                </span>
                <span class="text-[10px] font-mono text-cyan-300">JLV 20/20 满级</span>
              </div>
              <div class="text-[11px] leading-relaxed text-gray-300">
                {{ ['freelancer', 'mime'].includes(job.id) ? '【接收职业实装汇总】：本人履历达成 JLV 20/20 精通的所有职业，其 HP/MP/物攻/物防/魔攻/魔防/速度/精神峰值修正逐项取最大、不相加，汇聚于当前身躯！' : '【精通后目录预览（未精通前不入库）】：达成本人履历 JLV 20/20 并转为自由人／模仿师后可继承单来源峰值修正；与其他精通来源逐项取最大，受人物基础上限限制。' }}
              </div>
            </div>

            <!-- JLV 阶梯 AP 成长概况 (同步 Godot 百科 JobApGrowth 与 JobApCurve 机制) -->
            <div class="p-2 bg-slate-900/90 border border-slate-800 rounded space-y-1">
              <div class="flex items-center justify-between text-gray-400">
                <span class="text-cyan-400 font-semibold">📈 JLV 阶梯 AP 消耗与升级曲线 (JobApCurve):</span>
                <span class="text-amber-400 font-mono text-[10px]">
                  {{ job.id === 'freelancer' ? '无消耗封顶' : '最大 JLV 20' }}
                </span>
              </div>
              <div class="text-[11px] text-gray-300">
                {{ job.id === 'freelancer' ? '始源特权：JLV 0 恒定封顶，所有满级职业被动与六维直接无损继承' : 'JLV 1→4 (10~30 AP) · JLV 4→8 (50~100 AP) · JLV 14→20 极意精通 (200~500 AP)；支持原生矢量成本曲线推演' }}
              </div>
            </div>

            <!-- 普通教材使用范围 (同步 Godot 4.3 引擎 job_magic_reference.gd 最新规范) -->
            <div class="p-2 bg-emerald-950/20 border border-emerald-500/30 rounded text-emerald-200 space-y-1">
              <div class="font-bold flex items-center justify-between text-[11px] text-emerald-300">
                <span class="flex items-center gap-1">
                  <span>📖</span>
                  <span>普通教材使用范围 (JobMagicReference):</span>
                </span>
                <span class="text-[10px] font-mono text-cyan-300">目录判据</span>
              </div>
              <div class="text-[11px] leading-relaxed text-gray-300 whitespace-pre-line">
                {{ getJobMagicAccess(job.id) }}
              </div>
            </div>

            <!-- 本人学习进度与履历机制 (同步 Godot 4.3 引擎 job_personal_progress.gd 最新规范) -->
            <div class="p-2 bg-indigo-950/20 border border-indigo-500/30 rounded text-indigo-200 space-y-1">
              <div class="font-bold flex items-center justify-between text-[11px] text-indigo-300">
                <span class="flex items-center gap-1">
                  <span>📊</span>
                  <span>本人学习进度与当前履历 (JobPersonalProgress):</span>
                </span>
                <span class="text-[10px] font-mono text-cyan-300">只读结算</span>
              </div>
              <div class="text-[11px] leading-relaxed text-gray-300">
                {{ job.id === 'freelancer' ? '自由人始源特性：不设 JLV 等级成长与升级费用，直接汇聚本人积累的全部通用 AP 与各精通职业属性峰值。' : '只读结算当前队员独立 JLV 与上限（严格区分低上限阶段与 20/20 真正极意精通）；读取当前队员共用 AP 池，精确核算升至下一 JLV 所需 AP 与差额缺口。' }}
              </div>
            </div>

            <!-- 官方职业技能目录与防剧透说明 (同步 Godot 4.3 引擎 job_skill_description.gd 最新只读目录规范) -->
            <div class="p-2.5 bg-sky-950/20 border border-sky-500/30 rounded text-sky-200 space-y-1.5">
              <div class="font-bold flex items-center justify-between text-[11px] text-sky-300">
                <span class="flex items-center gap-1">
                  <span>📜</span>
                  <span>职业技能目录记载与防剧透说明 (JobSkillDescription):</span>
                </span>
                <span class="text-[10px] font-mono text-amber-300">目录记载 · 权威只读</span>
              </div>
              <div class="text-[10px] text-gray-400 bg-slate-900/60 p-1.5 rounded border border-slate-800/80 leading-tight">
                职业技能目录 · 以下为目录记载，不表示本人已经学会；可用技能以能力／战斗菜单为准。
              </div>
              <div class="text-[11px] leading-relaxed text-gray-300 space-y-1">
                <div
                  v-for="(sk, idx) in getJobSkillDirectory(job.id)"
                  :key="idx"
                  class="border-b border-slate-800/50 pb-1 last:border-0 last:pb-0"
                >
                  <div class="flex items-center justify-between text-cyan-300 font-medium text-[11px]">
                    <span>JLV {{ sk.level }} · {{ sk.name }}</span>
                    <span
                      v-if="sk.hiddenUntilStory"
                      class="text-[9px] px-1 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40"
                    >
                      🔒 需剧情旗标: {{ sk.requiredFlag }}
                    </span>
                  </div>
                  <div class="text-[10px] text-gray-400 pl-2 mt-0.5 leading-snug">
                    {{ sk.desc }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 职业特技全息解锁与入列资格判读 (对齐 job_skill_description_eligibility.gd) -->
            <div class="p-2 bg-blue-950/20 border border-blue-500/30 rounded text-blue-200 space-y-1">
              <div class="font-bold flex items-center justify-between text-[11px] text-blue-300">
                <span class="flex items-center gap-1">
                  <span>🛡️</span>
                  <span>战斗特技入列与资格判读 (JobSkillEligibility):</span>
                </span>
                <span class="text-[10px] font-mono text-cyan-300">入列守卫</span>
              </div>
              <div class="text-[10px] text-gray-300 leading-relaxed">
                实时核验本人当前任职、JLV 阶梯门禁与剧情旗标传承。仅当真正就任本职业且达标 JLV 时特技方可作为主动战斗技入列；未就任或缺剧情传承时清晰提示“尚缺额外剧情传承 / 尚需 JLV”。
              </div>
            </div>
          </div>
        </n-card>
      </div>

      <!-- 列表分页导航 (响应式与每页尺寸调节) -->
      <div
        v-if="filteredJobs.length > 0"
        v-simple-page-label
        class="flex justify-center items-center py-4"
        @click.capture="captureSimplePaginationActivation"
        @click="preserveSimplePaginationFocus"
      >
        <n-pagination
          v-model:page="currentPage"
          v-model:page-size="pageSize"
          :item-count="total"
          :page-sizes="[6, 9, 12, 18, 26]"
          show-size-picker
          show-quick-jumper
          :simple="isMobile"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        >
          <template #prev="{ page }">
            <button type="button" class="jobs-pagination-control" aria-label="上一页职业目录" :disabled="page <= 1">‹</button>
          </template>
          <template #label="{ type, node, active }">
            <button
              v-if="type === 'page'"
              type="button"
              class="jobs-pagination-control"
              :aria-label="`职业目录第 ${node} 页`"
              :aria-current="active ? 'page' : undefined"
            >{{ node }}</button>
            <component :is="node" v-else />
          </template>
          <template #next="{ page, pageCount }">
            <button type="button" class="jobs-pagination-control" aria-label="下一页职业目录" :disabled="page >= pageCount">›</button>
          </template>
          <template #prefix="{ itemCount }">
            <span class="text-xs text-gray-400 hidden sm:inline">当前匹配 {{ itemCount }} 个职业</span>
          </template>
        </n-pagination>
      </div>
    </div>

    <!-- ================= 视图 2: 职业技能可用性与转职推演工作台 (D08 Studio) ================= -->
    <div v-else-if="activeMainTab === 'studio'" class="space-y-6">
      <div class="p-5 bg-[#121626]/90 border border-slate-700/60 rounded-xl space-y-6 shadow-xl">
        <div class="border-b border-slate-800 pb-3 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 class="text-xl font-bold text-cyan-300">⚡ 职业特技可用性与转职推演工作台 (D08 Studio)</h2>
            <p class="text-xs text-gray-400 mt-1">
              基于 Godot 4.3 引擎 <code>job_skill_description_eligibility.gd</code> 与 <code>job_page.gd</code>，模拟队员转职六维加成与特技入列守卫
            </p>
          </div>
          <n-button size="small" secondary @click="resetStudioState">重置推演参数</n-button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 步骤 1: 选取试炼主角 -->
          <div class="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div class="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <span>1️⃣</span> 选定受测主角 (Character)
            </div>
            <div class="space-y-2">
              <button
                v-for="hero in studioHeroes"
                :key="hero.id"
                type="button"
                class="w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer"
                :class="selectedHero.id === hero.id ? 'bg-cyan-950/70 border-cyan-400 text-white shadow' : 'bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700'"
                @click="selectedHero = hero"
              >
                <div>
                  <span class="font-bold text-gray-100">{{ hero.name }}</span>
                  <div class="text-[10px] text-gray-400">基础属性: 力{{ hero.baseStr }} / 敏{{ hero.baseAgi }} / 体{{ hero.baseVit }} / 魔{{ hero.baseMag }}</div>
                </div>
                <n-tag size="tiny" type="info">LV {{ hero.level }}</n-tag>
              </button>
            </div>
          </div>

          <!-- 步骤 2: 目标职业与 JLV 阶梯 -->
          <div class="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div class="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <span>2️⃣</span> 目标就任职业与 JLV 阶梯
            </div>
            <div>
              <label class="text-[11px] text-gray-400 mb-1 block">目标职业 (Target Job)</label>
              <select
                v-model="studioSelectedJobId"
                class="w-full bg-slate-800 border border-slate-700 text-white rounded p-2 text-xs focus:border-cyan-500 outline-none"
              >
                <option v-for="j in jobsList" :key="j.id" :value="j.id">
                  [{{ j.crystalName }}] {{ j.name }} ({{ j.role }})
                </option>
              </select>
            </div>

            <!-- JLV 阶梯滑块 -->
            <div class="p-3 bg-slate-950/70 border border-slate-800 rounded space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300">当前职业等级 (JLV):</span>
                <span class="text-amber-400 font-mono font-bold text-sm">JLV {{ studioJlv }} / 20</span>
              </div>
              <n-slider v-model:value="studioJlv" :min="1" :max="20" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>入门 (JLV 1)</span>
                <span>熟练 (JLV 8)</span>
                <span>极意精通 (JLV 20)</span>
              </div>
            </div>

            <!-- 剧情解禁旗标复选框 -->
            <div class="space-y-1.5 pt-1">
              <div class="text-[11px] text-gray-400 font-bold">剧情旗标解锁状态 (Story Flags):</div>
              <div class="grid grid-cols-2 gap-2 text-[10px] text-gray-300">
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" v-model="studioFlags.wind_crystal" />
                  <span>风之水晶共鸣</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" v-model="studioFlags.story_sealed_temple" />
                  <span>深渊神殿传承</span>
                </label>
              </div>
            </div>
          </div>

          <!-- 步骤 3: 转职六维增益与战力结算屏 -->
          <div class="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div class="space-y-2.5">
              <div class="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>3️⃣</span> 转职后六维结算与属性增益
              </div>

              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                  <div class="text-[10px] text-gray-400">生命 HP</div>
                  <div class="font-bold text-emerald-400 font-mono text-sm">
                    {{ evaluatedHeroStats.hp }} <span class="text-[10px] text-emerald-300">({{ currentJobModifier.hpPct > 0 ? '+' : '' }}{{ currentJobModifier.hpPct }}%)</span>
                  </div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                  <div class="text-[10px] text-gray-400">魔力 MP</div>
                  <div class="font-bold text-cyan-400 font-mono text-sm">
                    {{ evaluatedHeroStats.mp }} <span class="text-[10px] text-cyan-300">({{ currentJobModifier.mpPct > 0 ? '+' : '' }}{{ currentJobModifier.mpPct }}%)</span>
                  </div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                  <div class="text-[10px] text-gray-400">力量 STR</div>
                  <div class="font-bold text-amber-400 font-mono text-sm">
                    {{ evaluatedHeroStats.str }} <span class="text-[10px] text-amber-300">({{ currentJobModifier.str > 0 ? '+' : '' }}{{ currentJobModifier.str }})</span>
                  </div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                  <div class="text-[10px] text-gray-400">敏捷 AGI</div>
                  <div class="font-bold text-sky-400 font-mono text-sm">
                    {{ evaluatedHeroStats.agi }} <span class="text-[10px] text-sky-300">({{ currentJobModifier.agi > 0 ? '+' : '' }}{{ currentJobModifier.agi }})</span>
                  </div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                  <div class="text-[10px] text-gray-400">体质 VIT</div>
                  <div class="font-bold text-blue-400 font-mono text-sm">
                    {{ evaluatedHeroStats.vit }} <span class="text-[10px] text-blue-300">({{ currentJobModifier.vit > 0 ? '+' : '' }}{{ currentJobModifier.vit }})</span>
                  </div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                  <div class="text-[10px] text-gray-400">魔力 MAG</div>
                  <div class="font-bold text-purple-400 font-mono text-sm">
                    {{ evaluatedHeroStats.mag }} <span class="text-[10px] text-purple-300">({{ currentJobModifier.mag > 0 ? '+' : '' }}{{ currentJobModifier.mag }})</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 综合战斗评分与精通状态 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-cyan-500/30 text-center space-y-1">
              <div class="text-[10px] text-cyan-400 uppercase tracking-wider">综合战斗效能评分</div>
              <div class="text-2xl font-black text-amber-300 font-mono">{{ evaluatedHeroStats.combatScore }}</div>
              <div class="text-[10px]" :class="studioJlv >= 20 ? 'text-emerald-400 font-bold' : 'text-gray-400'">
                {{ studioJlv >= 20 ? '👑 已达成极意精通！被动特性已注入始源自由人！' : `距离 JLV 20 极意精通尚需 ${(20 - studioJlv) * 50} AP` }}
              </div>
            </div>
          </div>
        </div>

        <!-- 特技入列可用性与资格判读列表 -->
        <div class="space-y-3 pt-2 border-t border-slate-800">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <span>📜</span>
              <span>【{{ currentTargetJobObj?.name }}】特技入列可用性核验矩阵 (JobSkillEligibility Validator)</span>
            </h3>
            <span class="text-[10px] text-gray-400 font-mono">遵循 job_skill_description_eligibility.gd</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              v-for="(skill, sIdx) in currentStudioSkills"
              :key="sIdx"
              class="p-3 bg-slate-900/80 rounded-xl border text-xs space-y-1.5 transition-all"
              :class="skill.isAvailable ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'"
            >
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-gray-100 flex items-center gap-1.5">
                  <span>{{ skill.isAvailable ? '✅' : '🔒' }}</span>
                  <span :class="skill.isAvailable ? 'text-cyan-300' : 'text-gray-400'">{{ skill.name }}</span>
                </span>
                <n-tag size="tiny" :type="skill.isAvailable ? 'success' : 'error'">
                  {{ skill.isAvailable ? '立即入列可用' : skill.lockReason }}
                </n-tag>
              </div>

              <div class="text-[11px] text-gray-300 leading-relaxed">{{ skill.desc }}</div>

              <div class="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-slate-800/60">
                <span>门禁需求: <strong>JLV {{ skill.level }}</strong></span>
                <span v-if="skill.hiddenUntilStory" class="text-amber-400">需剧情传承: {{ skill.requiredFlag }}</span>
                <span class="text-cyan-400 font-mono">状态: {{ skill.isAvailable ? 'ACTIVE' : 'LOCKED' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= 自由人与模仿士全精通属性汇聚与被动继承工作台 (基于 job_mastery_rules.gd) ================= -->
      <div class="p-5 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 border border-purple-500/40 rounded-xl space-y-4 shadow-xl">
        <div class="border-b border-purple-900/40 pb-3 flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xl">👑</span>
            <div>
              <h3 class="text-base font-bold text-purple-300">
                自由人与模仿士极意精通属性汇聚与被动继承工作台 (Job Mastery Studio)
              </h3>
              <span class="text-xs text-gray-400">
                对齐 Godot 引擎 <code>job_mastery_rules.gd</code> 与 <code>job_mastery_projection.gd</code>：单职 JLV 20 极意精通、自由人/模仿士专属峰值汇聚算法
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <n-tag :type="isMasteryInheritTarget ? 'success' : 'warning'" size="small" round strong>
              {{ isMasteryInheritTarget ? '🌟 继承生效中 (自由人/模仿士)' : '🔒 常规职业不激活跨职汇聚' }}
            </n-tag>
            <n-button size="tiny" secondary type="warning" @click="resetMasteryStudio">
              🔄 重置精通配置
            </n-button>
          </div>
        </div>

        <!-- 核心三大机制说明 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-900/30 space-y-1">
            <div class="text-purple-300 font-bold text-xs">⭐ 极意精通判定 (mastered):</div>
            <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
              <li><strong>满级标定：</strong>必须精确满足 <code>level == 20</code> 且 <code>max == 20</code>。</li>
              <li><strong>自由人除外：</strong>自由人自身不设 JLV，仅作为各职峰值的承载器。</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-900/30 space-y-1">
            <div class="text-cyan-300 font-bold text-xs">⭐ 峰值属性汇聚算法 (peak_bonus):</div>
            <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
              <li><strong>跨职业取最大值：</strong><code>peak = base + 19 &times; growth</code>，八维各自取已精通职业中的历史最大值。</li>
              <li><strong>机器精度保护：</strong><code>snappedf(raw, 1e-9)</code> 消除浮点尾差，杜绝取整缺失。</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-900/30 space-y-1">
            <div class="text-amber-300 font-bold text-xs">⭐ 被动特权继承 (inherits):</div>
            <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
              <li><strong>忍者精通：</strong>赋予【二刀流】(Dual Wield)，免源氏护手。</li>
              <li><strong>骑士精通：</strong>赋予【守护】(Cover) 与【双手持】(Two-Hand)。</li>
              <li><strong>盗贼精通：</strong>赋予【警戒】(Alert) 与【冲刺】(Dash)。</li>
            </ul>
          </div>
        </div>

        <!-- 交互推演：受测英雄与就任职业选择 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <div>
            <span class="text-gray-400 text-[10px] block mb-1">受测英雄 (ACTORS):</span>
            <n-select v-model:value="selectedMasteryActor" size="small" :options="masteryActorOptions" />
          </div>

          <div>
            <span class="text-gray-400 text-[10px] block mb-1">当前就任职业 (Current Job):</span>
            <n-select v-model:value="selectedMasteryCurrentJob" size="small" :options="masteryCurrentJobOptions" />
          </div>

          <div class="sm:col-span-2">
            <span class="text-gray-400 text-[10px] block mb-1">勾选已达 JLV 20 极意精通的职业 (已精通 {{ masteredJobsCount }} 个):</span>
            <div class="flex flex-wrap gap-2 pt-0.5">
              <button
                v-for="job in candidateMasteryJobs"
                :key="job.id"
                type="button"
                class="px-2 py-1 rounded text-xs border transition-colors select-none cursor-pointer"
                :class="masteredJobIds.includes(job.id) ? 'bg-purple-900/70 border-purple-400 text-purple-200 font-bold' : 'bg-slate-950 border-slate-800 text-gray-400'"
                @click="toggleMasteredJob(job.id)"
              >
                <span>{{ masteredJobIds.includes(job.id) ? '👑' : '⚪' }}</span>
                <span class="ml-1">{{ job.name }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 属性汇聚对比矩阵 -->
        <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-bold text-gray-200">
              八维属性汇聚矩阵 (Peak Stat Matrix) · 【{{ activeMasteryActorName }}】就任【{{ activeMasteryJobName }}】
            </span>
            <span class="text-[11px] font-mono" :class="isMasteryInheritTarget ? 'text-emerald-400' : 'text-amber-400'">
              {{ isMasteryInheritTarget ? '✨ 自由人/模仿士全峰值汇聚已激活' : '⚠️ 常规职业：仅使用本职基础成长' }}
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div v-for="stat in masteryStatResults" :key="stat.key" class="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">{{ stat.label }}</div>
              <div class="text-base font-mono font-bold" :class="isMasteryInheritTarget && stat.bonus > 0 ? 'text-emerald-400' : 'text-gray-200'">
                +{{ stat.bonus }}
              </div>
              <div class="text-[9px] text-gray-500 truncate" :title="stat.source">
                {{ isMasteryInheritTarget ? stat.source : '本职原生' }}
              </div>
            </div>
          </div>
        </div>

        <!-- 继承被动特性看板 -->
        <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1.5">
          <div class="text-xs font-bold text-gray-300">
            已继承被动特性 (Inherited Passive Traits):
          </div>
          <div v-if="!isMasteryInheritTarget" class="text-xs text-gray-400 italic">
            当前为常规职业【{{ activeMasteryJobName }}】，被动继承仅在转为【自由人】或【模仿士】时生效。
          </div>
          <div v-else-if="inheritedPassives.length === 0" class="text-xs text-gray-500 italic">
            尚未精通可继承特性的职业（如忍者、骑士、盗贼、武僧等）。请在上方面板勾选精通。
          </div>
          <div v-else class="flex flex-wrap gap-2">
            <n-tag v-for="p in inheritedPassives" :key="p.name" type="success" size="small" round>
              🌟 {{ p.name }} (源自: {{ p.job }}) - {{ p.desc }}
            </n-tag>
          </div>
        </div>

        <!-- 生命周期审计日志 -->
        <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-1">
          <div class="text-gray-500 font-bold">精通系统执行审计追踪 (JobMastery Trace):</div>
          <div v-for="(log, idx) in masteryTraceLogs" :key="idx" class="text-purple-300 truncate">
            &gt; {{ log }}
          </div>
        </div>
      </div>

      <!-- 八大职业战时特技裁决与战术辅助工坊 (基于 job_technique_resolver.gd) -->
      <div class="p-5 bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950 border border-cyan-500/40 rounded-xl space-y-4 shadow-xl mt-4">
        <div class="border-b border-cyan-900/40 pb-3 flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xl">⚔️</span>
            <div>
              <h3 class="text-base font-bold text-cyan-300">
                八大职业战时特技裁决与战术收益工坊 (Job Technique Resolver Studio)
              </h3>
              <span class="text-xs text-gray-400">
                对齐 Godot 引擎 <code>job_technique_resolver.gd</code>：盗贼防虚报偷盗、学者大解析破甲、猎人夹具减速、舞者迷目混乱与魔剑士双重附魔
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <n-button size="tiny" secondary type="warning" @click="resetTechniqueStudio">
              🔄 重置特技演练
            </n-button>
          </div>
        </div>

        <!-- 核心三大特技法则 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-900/30 space-y-1">
            <div class="text-cyan-300 font-bold text-xs">⭐ 盗贼真金白银偷盗 (steal):</div>
            <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
              <li><strong>防虚报金币收据：</strong><code>actual_gold = GameState.gold - gold_before</code>，金币满仓 (MAX_GOLD) 自动标记 <code>gold_full</code>。</li>
              <li><strong>恢复药 (Item 1):</strong> 成功率偷药，背包上限 (9999) 自动标记 <code>inventory_full</code>。</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-900/30 space-y-1">
            <div class="text-amber-300 font-bold text-xs">⭐ 战术破甲与捕兽迟滞:</div>
            <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
              <li><strong>学者大解析 (grand_analysis):</strong> 全体敌人防御永久崩解 <code>defense_penalty += 6</code>。</li>
              <li><strong>猎人捕兽夹 (snare):</strong> 单体减速 <code>speed_penalty += 3</code>，破甲 <code>defense_penalty += 2</code>。</li>
              <li><strong>猎人标记 (mark_prey):</strong> 单体破甲 <code>defense_penalty += 4</code>。</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-900/30 space-y-1">
            <div class="text-purple-300 font-bold text-xs">⭐ 异常扰动与状态反制:</div>
            <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
              <li><strong>舞者迷目 (dazzle):</strong> 全体敌人混乱判定 (<code>confuse</code>)，保留状态免疫护符。</li>
              <li><strong>诗人静音 (quiet_note):</strong> 每名存活敌人独立 25% 概率陷入沉默 (<code>silence</code>)。</li>
              <li><strong>武僧反击 (counter):</strong> 激活 <code>counter_ready = true</code>，受击必反！</li>
            </ul>
          </div>
        </div>

        <!-- 交互演练台 -->
        <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <span class="text-gray-400 text-[10px] block mb-1 font-bold">选择施展战术特技 (Job Technique):</span>
              <n-select v-model:value="selectedTechniqueId" size="small" :options="techniqueSelectOptions" />
            </div>

            <div>
              <span class="text-gray-400 text-[10px] block mb-1 font-bold">施法者状态即时看板:</span>
              <div class="flex items-center gap-1.5 pt-0.5">
                <n-tag size="small" :type="techCasterCounterReady ? 'success' : 'default'">
                  反击架势: {{ techCasterCounterReady ? '就绪 (Ready)' : '未激活' }}
                </n-tag>
                <n-tag size="small" type="info">
                  元素加成: +{{ techCasterElementBonus }}
                </n-tag>
              </div>
            </div>

            <div class="flex items-end">
              <n-button size="small" type="primary" secondary class="w-full" @click="resolveTechniqueAction">
                ⚡ 发动特技裁决 (Execute Technique)
              </n-button>
            </div>
          </div>

          <!-- 敌方3小队状态动态面板 -->
          <div class="space-y-1.5 pt-1 border-t border-slate-800">
            <div class="text-[10px] text-gray-400 font-bold">敌方小队状态实时监测 (Enemy Combatants):</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div v-for="(enemy, idx) in techEnemies" :key="idx" class="p-2 bg-slate-900/80 rounded border border-slate-800 space-y-1">
                <div class="flex items-center justify-between text-xs font-bold text-gray-200">
                  <span>{{ enemy.name }}</span>
                  <n-tag size="tiny" :type="enemy.status === 'normal' ? 'default' : 'error'">
                    {{ enemy.status === 'normal' ? '常规' : enemy.status === 'confuse' ? '🌀 混乱' : '🔇 沉默' }}
                  </n-tag>
                </div>
                <div class="text-[10px] text-gray-400">
                  破甲减免: <strong class="text-rose-400 font-mono">-{{ enemy.defPenalty }} DEF</strong> · 
                  减速迟滞: <strong class="text-amber-400 font-mono">-{{ enemy.spdPenalty }} SPD</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- 审计日志 -->
          <div class="p-2 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono space-y-1">
            <div class="text-gray-500 font-bold">特技系统执行审计追踪 (JobTechnique Trace):</div>
            <div v-for="(log, idx) in techniqueTraceLogs" :key="idx" class="text-cyan-300 truncate">
              &gt; {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 视图 3: 双职业构筑搭配与技能连锁共鸣工坊 (Dual-Class Synergy Studio) ================= -->
    <div v-else-if="activeMainTab === 'synergy'" class="space-y-6">
      <div class="p-6 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 border border-purple-500/50 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
        <!-- 头部导览 -->
        <div class="border-b border-purple-900/40 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">🔮</span>
              <h2 class="text-xl sm:text-2xl font-black text-purple-300">
                双职业构筑搭配与连锁共鸣工坊 (Dual-Class Synergy Studio)
              </h2>
              <n-tag size="small" type="error" round strong>全息流派推演</n-tag>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              自由搭配主修职业、副职业指令槽与被动特性槽，实时解算 ATB 攻速补正、爆发倍率与战场生存评级；一键推演回合实战伤害！
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button size="small" secondary type="warning" @click="resetSynergyBuild">
              🔄 恢复默认构筑
            </n-button>
            <n-button size="small" type="primary" class="font-bold shadow" @click="simulateCombatRound">
              ⚡ 一键推演回合输出
            </n-button>
          </div>
        </div>

        <!-- 四大官方大师经典流派快捷导入 -->
        <div class="space-y-1.5">
          <div class="text-xs font-bold text-gray-400 flex items-center gap-1.5">
            <span>✨</span> 官方预设巅峰流派快速套用 (Pre-tuned Archetypes):
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <button
              v-for="p in masterArchetypes"
              :key="p.id"
              type="button"
              class="p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between"
              :class="selectedArchetypeId === p.id
                ? 'bg-purple-900/50 border-purple-400 text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-400/50'
                : 'bg-slate-900/80 border-slate-800 text-gray-300 hover:border-slate-700 hover:bg-slate-850'"
              @click="applyArchetype(p)"
            >
              <div>
                <div class="text-xs font-bold flex items-center gap-1">
                  <span>{{ p.icon }}</span>
                  <span>{{ p.name }}</span>
                </div>
                <div class="text-[10px] text-gray-400 mt-0.5">{{ p.summary }}</div>
              </div>
              <n-tag size="tiny" :type="p.rankTag" round>{{ p.rank }}</n-tag>
            </button>
          </div>
        </div>

        <!-- 构筑三柱石选择器与右侧连锁评级屏 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- 左侧：构筑配置槽位 -->
          <div class="lg:col-span-7 space-y-4">
            <!-- 1. 主修职业 -->
            <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-cyan-300 flex items-center gap-1.5">
                  <span>1️⃣</span> 主修职业 (Primary Job)
                </span>
                <span class="text-gray-400 text-[11px]">决定基础属性体质与可用武器防具</span>
              </div>
              <n-select
                v-model:value="synergyPrimaryJobId"
                :options="primaryJobSelectOptions"
                size="small"
              />
              <div class="text-[11px] text-gray-400 flex items-center justify-between pt-1">
                <span>固有特性: <strong class="text-amber-300">{{ selectedPrimaryJobObj?.innateAbility }}</strong></span>
                <span>装备范围: <span class="text-gray-300">{{ selectedPrimaryJobObj?.equipTypes }}</span></span>
              </div>
            </div>

            <!-- 2. 副职业能力指令槽 -->
            <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-purple-300 flex items-center gap-1.5">
                  <span>2️⃣</span> 副修战斗指令槽 (!Command Slot)
                </span>
                <span class="text-gray-400 text-[11px]">赋予主职原本不具备的超规格战技</span>
              </div>
              <n-select
                v-model:value="synergySecondaryAbilityId"
                :options="secondaryAbilityOptions"
                size="small"
              />
              <div class="text-[11px] text-gray-300 leading-relaxed bg-slate-950 p-2 rounded border border-slate-800">
                {{ selectedSecondaryAbilityObj?.desc }}
              </div>
            </div>

            <!-- 3. 被动特性槽位 -->
            <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-emerald-300 flex items-center gap-1.5">
                  <span>3️⃣</span> 被动共鸣特性槽 (Passive Resonance)
                </span>
                <span class="text-gray-400 text-[11px]">全战斗常驻触发的底层机制法则</span>
              </div>
              <n-select
                v-model:value="synergyPassiveTraitId"
                :options="passiveTraitOptions"
                size="small"
              />
              <div class="text-[11px] text-gray-300 leading-relaxed bg-slate-950 p-2 rounded border border-slate-800">
                {{ selectedPassiveTraitObj?.desc }}
              </div>
            </div>
          </div>

          <!-- 右侧：共鸣算力结果与战斗模拟屏 -->
          <div class="lg:col-span-5 p-5 rounded-xl bg-slate-950/90 border border-purple-900/50 flex flex-col justify-between space-y-4 shadow-xl">
            <!-- 构筑代号与评级 -->
            <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <div class="text-[10px] text-gray-400 font-mono uppercase tracking-wider">构筑连锁评级代号</div>
                <h3 class="text-base font-black text-amber-300 mt-0.5">
                  {{ synergyCalculation.title }}
                </h3>
              </div>
              <div class="text-center px-3 py-1 rounded-xl bg-purple-950/80 border border-purple-500 shadow-md">
                <div class="text-[9px] text-purple-300 font-bold">SYNERGY</div>
                <div class="text-xl font-black text-amber-400 font-mono">{{ synergyCalculation.rank }}</div>
              </div>
            </div>

            <!-- 四大战斗效能指标 -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
                <div class="text-gray-400 text-[10px]">一回合爆发峰值倍率</div>
                <div class="font-mono font-bold text-amber-400 text-lg mt-0.5">
                  {{ synergyCalculation.burstMultiplier }}x
                </div>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
                <div class="text-gray-400 text-[10px]">ATB 充能加速度补正</div>
                <div class="font-mono font-bold text-cyan-400 text-lg mt-0.5">
                  +{{ synergyCalculation.atbBonus }}%
                </div>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
                <div class="text-gray-400 text-[10px]">生存与防卫等级</div>
                <div class="font-mono font-bold text-emerald-400 text-base mt-0.5">
                  {{ synergyCalculation.survivalTier }}
                </div>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
                <div class="text-gray-400 text-[10px]">MP 循环续航指数</div>
                <div class="font-mono font-bold text-purple-400 text-base mt-0.5">
                  {{ synergyCalculation.sustainability }}
                </div>
              </div>
            </div>

            <!-- 实战战术模拟日志 -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1.5 flex-1">
              <div class="text-[11px] font-bold text-cyan-300 flex items-center justify-between">
                <span>⚔️ 实机单回合连招演练回放:</span>
                <span class="text-[10px] text-gray-500 font-mono">Simulated Round</span>
              </div>
              <p class="text-xs text-gray-200 leading-relaxed font-mono">
                {{ combatSimResult }}
              </p>
            </div>

            <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
              <span>底层引擎契约: dual_class_synergy_resolver.gd</span>
              <span class="text-purple-400">VBLE Job Engine 4.6 LTS</span>
            </div>
          </div>
        </div>

        <!-- 底层 GDScript 源码对齐展台 -->
        <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div class="flex items-center justify-between text-xs font-bold text-cyan-300">
            <span>🛠️ Godot 4.6 LTS 双职业指令分发器架构 (dual_class_synergy_resolver.gd)</span>
            <n-tag size="tiny" type="info">纯读安全 · 零内存泄漏</n-tag>
          </div>
          <div class="p-3 bg-slate-900 rounded font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-48 custom-scrollbar">
<pre><code># Godot 4.6 LTS - dual_class_synergy_resolver.gd
class_name DualClassSynergyResolver extends RefCounted

static func resolve_battle_commands(hero: HeroData) -> Array[BattleAction]:
    var actions: Array[BattleAction] = []
    # 1. 注入主职普通指令 (Attack, Defend)
    actions.append(BattleAction.new("attack", "物理普通攻击"))
    actions.append(BattleAction.new("defend", "举盾格挡减伤50%"))
    
    # 2. 映射副职战斗指令槽 (!Command Slot)
    if hero.secondary_ability_id != "":
        var sec_action = AbilityDatabase.get_action(hero.secondary_ability_id)
        if sec_action:
            actions.append(sec_action)
            
    # 3. 结算被动特性对行动条与连击次数的倍率覆写
    if hero.has_passive("dual_wield"):
        actions[0].hit_count = 2 # 二刀流自动将单次普攻改为双重挥砍
        
    return actions</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 视图 4: 自由人极意被动继承与ABP挂机推演沙盘 (Freelancer Mastery & ABP Farm Matrix) ================= -->
    <div v-else-if="activeMainTab === 'abp_mastery'" class="space-y-6">
      <div class="p-6 bg-gradient-to-br from-slate-950 via-cyan-950/25 to-slate-950 border border-cyan-500/50 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
        <!-- 头部导览与操作 -->
        <div class="border-b border-cyan-900/40 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-2xl">💎</span>
              <h2 class="text-xl sm:text-2xl font-black text-cyan-300">
                自由人极意被动继承与ABP挂机推演沙盘
              </h2>
              <n-tag size="small" type="success" round strong>VBLE Engine 4.6 LTS</n-tag>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              解算最终幻想5代自由人(Freelancer)与模仿士(Mime)的核心极意法则：自动汇集已精通职业的最高六维属性峰值，无损汇聚忍者二刀流、武士白刃抓箭、盗贼警戒等全系固有特权；并提供全息挂机刷点实测收益推演！
            </p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <n-button size="small" secondary type="warning" @click="applyMasteryPreset('clear')">
              🔄 清空精通
            </n-button>
            <n-button size="small" type="primary" class="font-bold shadow" @click="exportJobMasteryCert">
              📜 导出职业极意认证令
            </n-button>
          </div>
        </div>

        <!-- 维度一：角色与终极基底职业设定 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <!-- 角色选择 -->
          <div class="lg:col-span-7 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <div class="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <span>👤</span> 契约英雄选择 (Hero Persona):
              </div>
              <span class="text-[11px] text-gray-500">不同英雄拥有初始微差六维倾向</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                v-for="hero in masterHeroes"
                :key="hero.id"
                type="button"
                class="p-2.5 rounded-lg border text-center transition-all cursor-pointer"
                :class="selectedMasterHeroId === hero.id
                  ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                  : 'bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700 hover:bg-slate-900'"
                @click="selectedMasterHeroId = hero.id"
              >
                <div class="text-lg mb-0.5">{{ hero.avatar }}</div>
                <div class="text-xs font-bold truncate">{{ hero.name.split(' ')[0] }}</div>
                <div class="text-[10px] text-cyan-300/80 truncate mt-0.5">{{ hero.title }}</div>
              </button>
            </div>
            <!-- 角色履历微调描述 -->
            <div class="p-2.5 bg-black/40 rounded border border-slate-800 text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>{{ currentMasterHero.name }}：{{ currentMasterHero.description }}</span>
              <span class="font-mono text-[11px] text-cyan-400 shrink-0">
                初始四维: 力{{ currentMasterHero.baseStats.str }} / 敏{{ currentMasterHero.baseStats.agi }} / 体{{ currentMasterHero.baseStats.sta }} / 魔{{ currentMasterHero.baseStats.mag }}
              </span>
            </div>
          </div>

          <!-- 终极基底职业切换 -->
          <div class="lg:col-span-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <div class="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span>👑</span> 终极极意基底姿态 (Ultimate Stance):
              </div>
              <span class="text-[11px] text-gray-500">仅自由人与模仿士可享全精通继承</span>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                class="p-3 rounded-lg border text-left transition-all cursor-pointer"
                :class="selectedMasterBaseClass === 'freelancer'
                  ? 'bg-amber-950/60 border-amber-400 text-white shadow-md shadow-amber-500/20 ring-1 ring-amber-400/50'
                  : 'bg-slate-950/60 border-slate-800 text-gray-400 hover:border-slate-700'"
                @click="selectedMasterBaseClass = 'freelancer'"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-bold text-amber-300">⚔️ 自由人</span>
                  <n-tag size="tiny" type="warning" round>全装备适应</n-tag>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">
                  2个自由能力槽，任意重甲武器皆可佩戴，极意四维无损映射。
                </div>
              </button>
              <button
                type="button"
                class="p-3 rounded-lg border text-left transition-all cursor-pointer"
                :class="selectedMasterBaseClass === 'mime'
                  ? 'bg-purple-950/60 border-purple-400 text-white shadow-md shadow-purple-500/20 ring-1 ring-purple-400/50'
                  : 'bg-slate-950/60 border-slate-800 text-gray-400 hover:border-slate-700'"
                @click="selectedMasterBaseClass = 'mime'"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-bold text-purple-300">🎭 模仿士</span>
                  <n-tag size="tiny" type="info" round>3自选槽+模仿</n-tag>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">
                  3个自由指令槽，0蓝耗复刻队友指令，继承全系峰值四维。
                </div>
              </button>
            </div>
            <div class="text-[11px] text-gray-500 italic">
              注：在原版机制中，精通各职业后只有【自由人】与【模仿士】可以自动无缝享受全被动常驻生效与最高属性加成，无须占用能力槽。
            </div>
          </div>
        </div>

        <!-- 维度二：精通职业勾选池与快捷流派预设 -->
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-gray-200">🏆 十二大核心水晶职业精通名录 (Mastery Matrix)</span>
              <n-tag size="tiny" type="info">已精通: {{ selectedMasteredJobIds.length }} / {{ registryMasterJobs.length }}</n-tag>
            </div>
            <!-- 预设套用按键组 -->
            <div class="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded bg-purple-900/60 border border-purple-500/50 text-purple-200 hover:bg-purple-800 transition cursor-pointer"
                @click="applyMasteryPreset('all')"
              >
                ⚡ 全职大满贯 (Grand Master)
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded bg-red-900/60 border border-red-500/50 text-red-200 hover:bg-red-800 transition cursor-pointer"
                @click="applyMasteryPreset('phys')"
              >
                🗡️ 物理破限宗师
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded bg-blue-900/60 border border-blue-500/50 text-blue-200 hover:bg-blue-800 transition cursor-pointer"
                @click="applyMasteryPreset('mag')"
              >
                🧙 至高魔导天尊
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 hover:bg-emerald-800 transition cursor-pointer"
                @click="applyMasteryPreset('stealth')"
              >
                🌪️ 疾风连击神偷
              </button>
            </div>
          </div>

          <!-- 职业网格卡片 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div
              v-for="job in registryMasterJobs"
              :key="job.id"
              class="p-3 rounded-lg border transition-all cursor-pointer relative"
              :class="selectedMasteredJobIds.includes(job.id)
                ? 'bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 border-cyan-500/60 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                : 'bg-slate-950/70 border-slate-800/80 text-gray-500 opacity-75 hover:opacity-100'"
              @click="toggleJobMastery(job.id)"
            >
              <div class="flex items-center justify-between mb-1.5">
                <div class="flex items-center gap-1.5">
                  <span class="text-base">{{ job.icon }}</span>
                  <span class="text-xs font-bold" :class="selectedMasteredJobIds.includes(job.id) ? 'text-gray-100' : 'text-gray-400'">
                    {{ job.name }}
                  </span>
                </div>
                <n-tag size="tiny" :type="selectedMasteredJobIds.includes(job.id) ? 'success' : 'default'">
                  {{ selectedMasteredJobIds.includes(job.id) ? '★ MASTER' : '未精通' }}
                </n-tag>
              </div>

              <div class="text-[10px] space-y-1">
                <div class="flex items-center justify-between text-gray-400">
                  <span>需耗费 ABP: <strong class="text-amber-400">{{ job.abpCost }}</strong></span>
                  <span class="text-cyan-300 font-mono">
                    {{ job.statBonus.str > 0 ? `力+${job.statBonus.str} ` : '' }}{{ job.statBonus.agi > 0 ? `敏+${job.statBonus.agi} ` : '' }}{{ job.statBonus.sta > 0 ? `体+${job.statBonus.sta} ` : '' }}{{ job.statBonus.mag > 0 ? `魔+${job.statBonus.mag}` : '' }}
                  </span>
                </div>
                <div class="p-1.5 rounded bg-black/40 border border-slate-800/70 text-[10px]" :class="selectedMasteredJobIds.includes(job.id) ? 'text-emerald-300' : 'text-gray-500'">
                  <div class="font-bold flex items-center gap-1">
                    <span>✨</span>
                    <span>固有被动: {{ job.passiveName }}</span>
                  </div>
                  <div class="text-[9px] text-gray-400 truncate" :title="job.passiveDesc">{{ job.passiveDesc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 维度三：实时四维峰值继承与被动叠加矩阵 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <!-- 四维看板 -->
          <div class="lg:col-span-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <div class="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>📊</span> 极意属性峰值汇聚解算 (Peak Stat Resolution):
              </div>
              <span class="text-[10px] text-gray-400">算法：英雄基础 + MAX(精通加成)</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-red-400 font-bold">力量 (STR)</div>
                <div class="text-xl font-black font-mono text-red-300 my-0.5">
                  {{ finalMasteryStats.str }}
                </div>
                <div class="text-[10px] text-gray-400">
                  基{{ currentMasterHero.baseStats.str }} + <span class="text-emerald-400 font-bold">+{{ highestInheritedStats.str.bonus }}</span>
                </div>
                <div class="text-[9px] text-gray-500 truncate mt-0.5" :title="highestInheritedStats.str.source">
                  {{ highestInheritedStats.str.source }}
                </div>
              </div>

              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-cyan-400 font-bold">敏捷 (AGI)</div>
                <div class="text-xl font-black font-mono text-cyan-300 my-0.5">
                  {{ finalMasteryStats.agi }}
                </div>
                <div class="text-[10px] text-gray-400">
                  基{{ currentMasterHero.baseStats.agi }} + <span class="text-emerald-400 font-bold">+{{ highestInheritedStats.agi.bonus }}</span>
                </div>
                <div class="text-[9px] text-gray-500 truncate mt-0.5" :title="highestInheritedStats.agi.source">
                  {{ highestInheritedStats.agi.source }}
                </div>
              </div>

              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-amber-400 font-bold">体力 (STA)</div>
                <div class="text-xl font-black font-mono text-amber-300 my-0.5">
                  {{ finalMasteryStats.sta }}
                </div>
                <div class="text-[10px] text-gray-400">
                  基{{ currentMasterHero.baseStats.sta }} + <span class="text-emerald-400 font-bold">+{{ highestInheritedStats.sta.bonus }}</span>
                </div>
                <div class="text-[9px] text-gray-500 truncate mt-0.5" :title="highestInheritedStats.sta.source">
                  {{ highestInheritedStats.sta.source }}
                </div>
              </div>

              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-purple-400 font-bold">魔力 (MAG)</div>
                <div class="text-xl font-black font-mono text-purple-300 my-0.5">
                  {{ finalMasteryStats.mag }}
                </div>
                <div class="text-[10px] text-gray-400">
                  基{{ currentMasterHero.baseStats.mag }} + <span class="text-emerald-400 font-bold">+{{ highestInheritedStats.mag.bonus }}</span>
                </div>
                <div class="text-[9px] text-gray-500 truncate mt-0.5" :title="highestInheritedStats.mag.source">
                  {{ highestInheritedStats.mag.source }}
                </div>
              </div>
            </div>

            <!-- 综合战力指数评级卡 -->
            <div class="p-3 rounded-lg bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-950 border border-cyan-800/50 flex items-center justify-between">
              <div>
                <div class="text-xs text-gray-400">极意综合实战威能指数 (Combat Power):</div>
                <div class="text-2xl font-black font-mono text-cyan-300">
                  {{ masteryCombatPower.score.toLocaleString() }}
                  <span class="text-xs font-normal text-gray-400">PTS</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-[10px] text-gray-500">综合境界认证</div>
                <div class="text-sm font-black" :class="masteryCombatPower.rankColor">
                  {{ masteryCombatPower.rank }}
                </div>
              </div>
            </div>
          </div>

          <!-- 被动特性全览 -->
          <div class="lg:col-span-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🌟</span> 自动常驻激活的继承被动特权 ({{ activeInheritedPassives.length }} 项):
              </div>
              <span class="text-[10px] text-emerald-400 font-mono">0槽位损耗 · 原生常驻</span>
            </div>

            <div v-if="activeInheritedPassives.length === 0" class="p-6 text-center text-xs text-gray-500 bg-slate-950/50 rounded-lg border border-dashed border-slate-800">
              当前尚未精通具备固有被动特性的职业。请在上方面板勾选精通或直接点击【全职大满贯】。
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              <div
                v-for="p in activeInheritedPassives"
                :key="p.name"
                class="p-2 rounded bg-slate-950/80 border border-slate-800/80 flex items-start gap-2"
              >
                <span class="text-sm mt-0.5">✨</span>
                <div class="min-w-0">
                  <div class="text-xs font-bold text-cyan-300 flex items-center gap-1">
                    <span>{{ p.name }}</span>
                    <span class="text-[9px] text-gray-500">({{ p.job }})</span>
                  </div>
                  <div class="text-[10px] text-gray-400 truncate" :title="p.desc">{{ p.desc }}</div>
                </div>
              </div>
            </div>
            <div class="text-[10px] text-gray-500 italic">
              ※ 提示：在【自由人】姿态下，双手各持高暴击武器自动执行【二刀流】，近战受击触发【白刃抓箭】回避，遭遇偷袭直接触发【警戒】！
            </div>
          </div>
        </div>

        <!-- 维度四：ABP挂机刷点与升级耗时推演沙盘 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div class="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <span>⏳</span> 四大经典挂机刷点与效率推演沙盘 (ABP Farm Studio)
              </div>
              <div class="text-xs text-gray-400 mt-0.5">
                模拟离线与实机挂机战斗收益，根据怪物 ABP 期望、击杀耗时与辅助护符计算练级周期
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-400">距离全精通还需 ABP:</span>
              <span class="text-sm font-black font-mono text-amber-400">{{ remainingAbpToMaster.toLocaleString() }}</span>
            </div>
          </div>

          <!-- 刷点四选一卡片 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              v-for="spot in farmSpots"
              :key="spot.id"
              type="button"
              class="p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between"
              :class="selectedFarmSpotId === spot.id
                ? 'bg-amber-950/40 border-amber-400 text-white shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/50'
                : 'bg-slate-950/80 border-slate-800 text-gray-300 hover:border-slate-700'"
              @click="selectedFarmSpotId = spot.id"
            >
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-amber-300">{{ spot.name }}</span>
                  <span class="text-[10px] text-amber-400">★{{ spot.stars }}</span>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">{{ spot.location }}</div>
                <div class="p-1.5 rounded bg-black/40 border border-slate-800/80 my-2 text-[10px] space-y-0.5">
                  <div class="text-gray-400">收益期望: <span class="text-emerald-400 font-bold">{{ spot.abpMin }}~{{ spot.abpMax }} ABP</span>/场</div>
                  <div class="text-gray-400">平均耗时: <span class="text-cyan-400 font-mono">{{ spot.battleSec }} 秒</span>/场</div>
                  <div class="text-gray-400">金币掉落: <span class="text-amber-400 font-mono">{{ spot.gilAverage }} Gil</span></div>
                </div>
              </div>
              <div class="text-[9px] text-gray-500 truncate" :title="spot.specialStrategy">
                战术: {{ spot.specialStrategy }}
              </div>
            </button>
          </div>

          <!-- 增益装备与时长调节滑块 -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 rounded-xl bg-black/40 border border-slate-800">
            <!-- 增益道具勾选 -->
            <div class="lg:col-span-6 space-y-2">
              <div class="text-xs font-bold text-gray-300">
                装备与契约加成 (Gear &amp; Relic Modifiers):
              </div>
              <div class="grid grid-cols-2 gap-2">
                <label
                  v-for="b in farmBoosters"
                  :key="b.id"
                  class="p-2 rounded bg-slate-950 border border-slate-800/80 flex items-center gap-2 cursor-pointer transition hover:border-slate-700 text-xs"
                >
                  <input
                    type="checkbox"
                    :value="b.id"
                    v-model="selectedBoosterIds"
                    class="rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <div class="font-bold text-gray-200 text-[11px]">{{ b.name }}</div>
                    <div class="text-[9px] text-gray-400">{{ b.desc }}</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- 时长滑块与推演结果面板 -->
            <div class="lg:col-span-6 space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-gray-300">推演挂机时长 (Duration):</span>
                <span class="font-mono font-bold text-cyan-300">{{ farmDurationMinutes }} 分钟 ({{ (farmDurationMinutes / 60).toFixed(1) }} 小时)</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                v-model.number="farmDurationMinutes"
                class="w-full accent-cyan-400 cursor-pointer"
              />

              <!-- 推演结果看板 -->
              <div class="grid grid-cols-3 gap-2 text-center">
                <div class="p-2 rounded bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-gray-400">预估战斗总场次</div>
                  <div class="text-base font-bold font-mono text-cyan-400">
                    {{ farmSimulationResult.totalBattles }} 场
                  </div>
                  <div class="text-[9px] text-gray-500">约 {{ farmSimulationResult.actualSecPerBattle.toFixed(1) }}秒/场</div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-gray-400">累计预计获取 ABP</div>
                  <div class="text-base font-bold font-mono text-emerald-400">
                    +{{ farmSimulationResult.totalAbpGained.toLocaleString() }}
                  </div>
                  <div class="text-[9px] text-gray-500">{{ farmSimulationResult.abpPerHour.toLocaleString() }} ABP/小时</div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-gray-400">累计预计收获金币</div>
                  <div class="text-base font-bold font-mono text-amber-400">
                    +{{ farmSimulationResult.totalGilGained.toLocaleString() }}
                  </div>
                  <div class="text-[9px] text-gray-500">Gil 丰盛储备</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 维度五：Godot 4.6 LTS 底层架构对齐代码展台 (双 Tab 切换) -->
        <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-cyan-300">🛠️ Godot 4.6 LTS 极意继承与挂机解算内核架构</span>
              <n-tag size="tiny" type="info">纯读安全 · 零内存泄漏</n-tag>
            </div>
            <!-- 双 Tab 切换 -->
            <div class="inline-flex p-0.5 bg-slate-900 rounded-lg border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
                :class="activeJobGodotTab === 'job_system' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeJobGodotTab = 'job_system'"
              >
                📄 job_system.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
                :class="activeJobGodotTab === 'freelancer_passive' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeJobGodotTab = 'freelancer_passive'"
              >
                📄 freelancer_passive_resolver.gd
              </button>
            </div>
          </div>

          <div class="p-3 bg-slate-900 rounded font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-56 custom-scrollbar">
<pre v-if="activeJobGodotTab === 'job_system'"><code># Godot 4.6 LTS - job_system.gd
class_name JobSystem extends RefCounted

class JobProfile:
    var id: String
    var name: String
    var abp_to_master: int
    var stat_bonus: Dictionary # {"str": 0, "agi": 0, "sta": 0, "mag": 0}
    var innate_passives: Array[String] = []

static func calculate_unmastered_abp_requirement(mastered_job_ids: Array[String], all_jobs: Array[JobProfile]) -> int:
    var remaining_abp: int = 0
    for job in all_jobs:
        if not mastered_job_ids.has(job.id):
            remaining_abp += job.abp_to_master
    return remaining_abp

static func simulate_farming_efficiency(spot_abp: float, battle_duration: float, total_minutes: float, booster_mult: float) -> Dictionary:
    var total_seconds: float = total_minutes * 60.0
    var battles: int = int(total_seconds / maxf(battle_duration, 1.0))
    var total_abp: int = int(float(battles) * spot_abp * booster_mult)
    return {
        "battles": battles,
        "abp": total_abp,
        "abp_per_hour": int(float(total_abp) / (total_minutes / 60.0))
    }</code></pre>
<pre v-else><code># Godot 4.6 LTS - freelancer_passive_resolver.gd
class_name FreelancerPassiveResolver extends RefCounted

## 自由人与模仿士属性汇聚极意算法
static func resolve_freelancer_stats(hero_base: Dictionary, mastered_jobs: Array[JobProfile]) -> Dictionary:
    var peak_bonus: Dictionary = {"str": 0, "agi": 0, "sta": 0, "mag": 0}
    var stat_sources: Dictionary = {"str": "默认", "agi": "默认", "sta": "默认", "mag": "默认"}
    
    # 遍历所有精通职业，提取四维属性的最大极值
    for job in mastered_jobs:
        for stat in ["str", "agi", "sta", "mag"]:
            if job.stat_bonus.get(stat, 0) > peak_bonus[stat]:
                peak_bonus[stat] = job.stat_bonus[stat]
                stat_sources[stat] = job.name
                
    return {
        "final_str": hero_base.get("str", 20) + peak_bonus["str"],
        "final_agi": hero_base.get("agi", 20) + peak_bonus["agi"],
        "final_sta": hero_base.get("sta", 20) + peak_bonus["sta"],
        "final_mag": hero_base.get("mag", 20) + peak_bonus["mag"],
        "sources": stat_sources
    }

## 汇聚所有精通职业的固有被动特性
static func resolve_inherited_passives(mastered_jobs: Array[JobProfile]) -> Array[String]:
    var passives: Array[String] = []
    for job in mastered_jobs:
        for p in job.innate_passives:
            if not passives.has(p):
                passives.append(p)
    return passives</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 视图 5: 全职业进阶转生与太古奥义传承工坊 (Job Transcendence & Secret Arts Studio) ================= -->
    <div v-else-if="activeMainTab === 'transcendence_tree'" class="space-y-6">
      <div class="p-6 bg-gradient-to-br from-slate-950 via-purple-950/25 to-slate-950 border border-purple-500/50 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
        <!-- 头部导览与操作 -->
        <div class="border-b border-purple-900/40 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-2xl">🌟</span>
              <h2 class="text-xl sm:text-2xl font-black text-purple-300">
                全职业进阶转生与太古奥义传承工坊
              </h2>
              <n-tag size="small" type="warning" round strong>v2.2.263 官方实机矩阵</n-tag>
            </div>
            <p class="text-xs text-gray-400 mt-1 max-w-3xl leading-relaxed">
              突破水晶宿命极限：激活四阶转生职业、四维以太节点逐层觉醒、全队 99,999 破限奥义施放演练与 SHA-256 方案书一键导出。
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <n-button size="small" secondary type="warning" @click="resetTranscendenceTree">
              🔄 重置转生树
            </n-button>
            <n-button size="small" secondary type="primary" @click="maxAllTranscendenceNodes">
              ⚡ 一键满树点亮 (All Nodes)
            </n-button>
            <n-button size="small" type="primary" class="font-bold shadow" @click="exportTranscendenceCertificate">
              📜 导出转生方案书
            </n-button>
          </div>
        </div>

        <!-- 三栏主推演工作台 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 栏 1: 候选英雄与转生职业流派矩阵 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>👤</span>
                  <span>候选英雄与转生流派</span>
                </span>
                <n-tag size="tiny" type="info">{{ selectedHeroTranscendence.title }}</n-tag>
              </div>

              <!-- 英雄选择 -->
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="hero in transcendenceHeroesList"
                  :key="hero.id"
                  type="button"
                  class="p-2 rounded-lg border text-center transition-all cursor-pointer"
                  :class="selectedTranscendenceHeroId === hero.id
                    ? 'bg-purple-950/70 border-purple-400 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                    : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-700'"
                  @click="selectTranscendenceHero(hero.id)"
                >
                  <div class="text-lg">{{ hero.avatar }}</div>
                  <div class="text-xs font-bold mt-1">{{ hero.name }}</div>
                  <div class="text-[10px] text-gray-500 font-mono">{{ hero.element }}</div>
                </button>
              </div>

              <!-- 转生职业选择 -->
              <div class="space-y-1">
                <label class="text-[11px] text-gray-400 block">进阶转生职业流派 (Transcendence Job):</label>
                <select
                  v-model="selectedTranscendenceJobId"
                  class="w-full bg-slate-950 border border-slate-700 text-xs text-purple-300 font-bold rounded-lg p-2 focus:border-purple-400 focus:outline-none"
                >
                  <option v-for="job in transcendenceJobsList" :key="job.id" :value="job.id">
                    {{ job.icon }} {{ job.name }} - {{ job.role }}
                  </option>
                </select>
              </div>

              <!-- 转生职业档案卡片 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-purple-500/30 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-white flex items-center gap-1.5 text-sm">
                    <span>{{ currentTranscendenceJob.icon }}</span>
                    <span>{{ currentTranscendenceJob.name }}</span>
                  </span>
                  <n-tag size="tiny" type="warning">{{ currentTranscendenceJob.category }}</n-tag>
                </div>
                <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentTranscendenceJob.description }}</p>
                <div class="p-2 rounded bg-purple-950/40 border border-purple-900/50 text-[11px] space-y-1">
                  <div class="text-amber-300 font-bold flex items-center gap-1">
                    <span>✨ 太古奥义:</span>
                    <span>{{ currentTranscendenceJob.secretArtName }}</span>
                  </div>
                  <p class="text-gray-300 text-[10px] leading-snug">{{ currentTranscendenceJob.secretArtDesc }}</p>
                </div>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
              <span>转生位阶评定:</span>
              <span class="font-mono font-bold text-emerald-400">{{ transcendenceTierSummary }}</span>
            </div>
          </div>

          <!-- 栏 2: 四阶以太转生树节点点亮台 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>🌱</span>
                <span>四阶以太转生树节点点亮台</span>
              </span>
              <span class="font-mono text-xs text-purple-400 font-bold">已点亮 {{ unlockedNodesCount }} / 4 节点</span>
            </div>

            <!-- 节点清单 -->
            <div class="space-y-2.5">
              <div
                v-for="node in transcendenceNodes"
                :key="node.id"
                class="p-3 rounded-lg border transition-all cursor-pointer"
                :class="node.unlocked
                  ? 'bg-purple-950/40 border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                  : 'bg-slate-950 border-slate-800 opacity-60 hover:opacity-90'"
                @click="toggleNode(node.id)"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-base">{{ node.icon }}</span>
                    <div>
                      <div class="text-xs font-bold" :class="node.unlocked ? 'text-purple-300' : 'text-gray-400'">
                        {{ node.tierName }}: {{ node.name }}
                      </div>
                      <div class="text-[10px] text-gray-500 font-mono">{{ node.cost }} 以太碎片</div>
                    </div>
                  </div>
                  <n-switch :value="node.unlocked" size="small" @click.stop="toggleNode(node.id)" />
                </div>
                <p class="text-[11px] text-gray-300 mt-1.5 leading-snug">{{ node.effectDesc }}</p>
              </div>
            </div>

            <!-- 累计以太消耗与属性增益 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-400">累计消耗以太碎片:</span>
                <span class="font-mono font-bold text-cyan-400">{{ totalAetherCost }} 碎片</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">伤害上限破限阈值:</span>
                <span class="font-mono font-bold" :class="isNodeUnlocked('tier3') ? 'text-amber-300' : 'text-gray-500'">
                  {{ isNodeUnlocked('tier3') ? '99,999 破限 (已解除)' : '9,999 原生锁定' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">奥义觉醒状态:</span>
                <span class="font-mono font-bold" :class="isNodeUnlocked('tier4') ? 'text-emerald-400' : 'text-rose-400'">
                  {{ isNodeUnlocked('tier4') ? '已觉醒就绪 (Ready)' : '封印沉睡中 (Locked)' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 栏 3: 太古奥义实机斩杀演练与试炼沙盘 -->
          <div class="p-5 rounded-xl bg-gradient-to-b from-purple-950/20 to-slate-900 border border-purple-500/30 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>太古奥义实战推演沙盘</span>
                </span>
                <n-tag size="tiny" :type="simulationRatingTagType">{{ simulationRatingText }}</n-tag>
              </div>

              <div>
                <label class="text-[11px] text-gray-400 block mb-1">靶场对战目标 (Target Dummy):</label>
                <select
                  v-model="selectedTranscendenceTargetId"
                  class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-purple-400 focus:outline-none"
                >
                  <option v-for="t in transcendenceTargetsList" :key="t.id" :value="t.id">
                    {{ t.icon }} {{ t.name }} (HP: {{ t.hp.toLocaleString() }}, 防御: {{ t.def }})
                  </option>
                </select>
              </div>

              <!-- 奥义伤害爆发大卡 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">太古奥义单轮期望总爆发 (Secret Art Burst)</div>
                <div class="text-2xl sm:text-3xl font-black font-mono mt-1 text-purple-400">
                  {{ secretArtBurstDamage.toLocaleString() }}
                </div>
                <div class="text-[10px] text-emerald-400 mt-0.5">
                  {{ secretArtOverkillText }}
                </div>
              </div>

              <!-- 演练输出战报 -->
              <div class="p-2.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] space-y-1 max-h-24 overflow-y-auto font-mono text-gray-300">
                <div v-for="(log, idx) in secretArtLogs" :key="idx" class="flex items-start gap-1">
                  <span class="text-purple-400 shrink-0">•</span>
                  <span>{{ log }}</span>
                </div>
              </div>
            </div>

            <!-- 释放奥义按钮 -->
            <div class="space-y-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                class="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs transition-all shadow-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="!isNodeUnlocked('tier4')"
                @click="triggerSecretArtExecution"
              >
                ⚡ 释放太古奥义【{{ currentTranscendenceJob.secretArtName }}】
              </button>
            </div>
          </div>
        </div>

        <!-- Godot 4.6 LTS 代码展台 -->
        <div class="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
              <span>📜</span>
              <span>Godot 4.6 LTS 实机算法: job_transcendence_resolver.gd</span>
            </span>
            <n-button size="tiny" secondary type="warning" @click="copyTranscendenceCode">
              {{ copiedTransCode ? '✓ 已复制代码' : '复制代码' }}
            </n-button>
          </div>
          <pre class="p-3 bg-slate-950 rounded text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-56">{{ godotTransCodeText }}</pre>
        </div>
      </div>
    </div>

    <!-- ================= 视图 6: 太古职业潜能觉醒与极限命座星图工坊 (Job Hyper-Mastery & Constellation Studio) ================= -->
    <div v-else-if="activeMainTab === 'hyper_mastery_matrix'" class="space-y-6">
      <div class="p-6 bg-gradient-to-br from-slate-950 via-cyan-950/25 to-slate-950 border border-cyan-500/50 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
        <!-- 头部导览与操作 -->
        <div class="border-b border-cyan-900/40 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-2xl">✨</span>
              <h2 class="text-xl sm:text-2xl font-black text-cyan-300">
                太古职业潜能觉醒与极限命座星图工坊
              </h2>
              <n-tag size="small" type="error" round strong>v2.2.282 重磅实装</n-tag>
            </div>
            <p class="text-xs text-gray-400 mt-1 max-w-3xl leading-relaxed">
              基于十二宫命座星图与太古宿命潜能觉醒系统，推演职业全属性破限解禁、双手互搏伤害倍率、急速战技减CD与极限星核过载。
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <n-button
              type="primary"
              size="small"
              round
              secondary
              :loading="isSimulatingHyperMastery"
              @click="runHyperMasterySimulation"
            >
              <template #icon><span>⚡</span></template>
              启动命座觉醒推演
            </n-button>
            <n-button
              type="warning"
              size="small"
              round
              secondary
              @click="exportHyperMasteryCertificate"
            >
              <template #icon><span>📜</span></template>
              导出命座方案书
            </n-button>
          </div>
        </div>

        <!-- 四大极限命座星图流派 (4 Constellations) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
          <div
            v-for="constell in hyperConstellations"
            :key="constell.id"
            class="p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
            :class="selectedConstellationId === constell.id
              ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
            @click="selectedConstellationId = constell.id"
          >
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xl">{{ constell.icon }}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded font-mono" :class="selectedConstellationId === constell.id ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-gray-400'">
                  {{ constell.tag }}
                </span>
              </div>
              <div class="font-bold text-xs text-gray-200">{{ constell.name }}</div>
              <div class="text-[10px] text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">{{ constell.desc }}</div>
            </div>
            <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span class="text-gray-400">核心奥义:</span>
              <span class="font-mono font-bold text-cyan-300">{{ constell.secretArt }}</span>
            </div>
          </div>
        </div>

        <!-- 核心工作台：双栏交互面板 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          <!-- 左侧：全息星图雷达视窗与指标卡片 -->
          <div class="lg:col-span-7 space-y-4">
            <!-- 全息星图雷达视窗 -->
            <div class="relative h-64 sm:h-72 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
              <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div
                  class="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                  :style="{
                    background: currentConstellation.gradient,
                    opacity: (astralEnergyLevel / 1000 * 0.75 + 0.15).toFixed(2),
                    transform: `scale(${1 + overloadMultiplier / 5.0})`
                  }"
                ></div>
                <svg class="w-64 h-64 opacity-50 animate-[spin_50s_linear_infinite]" viewBox="0 0 200 200">
                  <polygon points="100,15 125,75 190,80 140,125 155,190 100,155 45,190 60,125 10,80 75,75" fill="none" stroke="rgba(6,182,212,0.4)" stroke-width="1.5" stroke-dasharray="3 3" />
                  <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(168,85,247,0.5)" stroke-width="1.2" />
                  <circle cx="100" cy="100" r="25" fill="none" stroke="rgba(245,158,11,0.5)" stroke-width="1" stroke-dasharray="2 2" />
                  <line x1="100" y1="15" x2="100" y2="185" stroke="rgba(6,182,212,0.3)" stroke-width="1" />
                  <circle cx="100" cy="100" r="6" fill="rgba(6,182,212,0.9)" />
                </svg>
              </div>

              <!-- 顶部状态指示灯 -->
              <div class="relative z-10 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span class="font-mono text-cyan-300 font-bold">CONSTELLATION MATRIX ACTIVE</span>
                  <span class="text-gray-400 font-mono text-[10px]">| {{ unlockedNodes }}/12 节点</span>
                </div>
                <div class="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-amber-300">
                  星能: {{ astralEnergyLevel }} AU
                </div>
              </div>

              <!-- 中间标语 -->
              <div class="relative z-10 text-center my-auto">
                <div class="text-2xl font-black text-white/95 tracking-wider font-mono drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
                  {{ currentConstellation.name }}
                </div>
                <div class="text-xs text-cyan-200/80 mt-1 font-mono">
                  觉醒总属性: {{ calculatedTotalAwakenedStats.toLocaleString() }} · 战技最终倍率: {{ calculatedSkillMultiplier }}x
                </div>
              </div>

              <!-- 底部性能微视窗 -->
              <div class="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-gray-400">
                <span>技能极速冷却: -{{ calculatedCdrReduction }}% CDR</span>
                <span class="text-emerald-400 font-bold">
                  综合评阶: {{ calculatedConstellationTier }}
                </span>
              </div>
            </div>

            <!-- 4 维物理与战斗指标卡片 -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">觉醒属性总和</div>
                <div class="font-mono text-cyan-400 font-bold text-sm mt-0.5">{{ calculatedTotalAwakenedStats.toLocaleString() }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ destinyCapUnlock ? '已突破 255 限制' : '常规单项上限' }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">命座战技倍率</div>
                <div class="font-mono text-amber-400 font-bold text-sm mt-0.5">{{ calculatedSkillMultiplier }}x</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ dualWieldMastery ? '双手互搏双刃击发' : '常规单持加成' }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">战技极速缩减</div>
                <div class="font-mono text-emerald-400 font-bold text-sm mt-0.5">-{{ calculatedCdrReduction }}%</div>
                <div class="text-[9px] text-gray-500 mt-0.5">以太回路加速</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">星图综合评阶</div>
                <div class="font-mono text-purple-400 font-bold text-xs mt-0.5 truncate">{{ calculatedConstellationTier }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ reboundAegis ? '反噬防护盾已激活' : '无反噬保护' }}</div>
              </div>
            </div>

            <!-- 实时推演日志终端 -->
            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
              <div class="flex items-center justify-between text-xs text-gray-400 pb-1.5 border-b border-slate-800">
                <span class="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <span>💻</span> 命座星图与潜能觉醒日志 (Astral Terminal)
                </span>
                <span class="text-[10px] text-gray-500">拓扑状态: 同步完成</span>
              </div>
              <div class="space-y-1 text-[11px] text-gray-300 max-h-28 overflow-y-auto custom-scrollbar">
                <div v-for="(log, idx) in hyperSimLogs" :key="idx" class="flex items-start gap-1.5">
                  <span class="text-cyan-400 select-none">&gt;</span>
                  <span :class="log.includes('完成') || log.includes('成功') || log.includes('突破') ? 'text-emerald-400' : 'text-gray-300'">{{ log }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：无极物理调优与星图控制 -->
          <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div class="text-xs font-bold text-cyan-300 flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="flex items-center gap-1.5">
                <span>🎛️</span> 命座潜能参数微调 (Constellation Uniforms)
              </span>
              <button
                type="button"
                class="text-[10px] text-gray-400 hover:text-cyan-300 cursor-pointer"
                @click="resetHyperParams"
              >
                重置参数
              </button>
            </div>

            <!-- 星核共鸣能级 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>命座星核共鸣能级 (Astral Energy):</span>
                <span class="font-mono text-cyan-400 font-bold">{{ astralEnergyLevel }} AU</span>
              </div>
              <n-slider v-model:value="astralEnergyLevel" :min="100" :max="999" :step="1" />
              <div class="flex justify-between text-[9px] text-gray-500">
                <span>100AU 初阶觉醒</span>
                <span>600AU 核心充盈</span>
                <span>999AU 太古创世</span>
              </div>
            </div>

            <!-- 潜能过载倍率 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>职业潜能过载倍率 (Overload Multiplier):</span>
                <span class="font-mono text-amber-400 font-bold">{{ overloadMultiplier }}x</span>
              </div>
              <n-slider v-model:value="overloadMultiplier" :min="1.0" :max="4.0" :step="0.1" />
            </div>

            <!-- 命座星环节点解锁数 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>星环节点解锁数 (Unlocked Nodes):</span>
                <span class="font-mono text-emerald-400 font-bold">{{ unlockedNodes }} / 12 节点</span>
              </div>
              <n-slider v-model:value="unlockedNodes" :min="1" :max="12" :step="1" />
            </div>

            <!-- 属性转化率 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>以太属性转化率 (Conversion Ratio):</span>
                <span class="font-mono text-purple-400 font-bold">{{ statConversionRatio }} %</span>
              </div>
              <n-slider v-model:value="statConversionRatio" :min="50" :max="200" :step="5" />
            </div>

            <!-- 3 项星图开关 -->
            <div class="space-y-2 pt-2 border-t border-slate-800">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300 flex items-center gap-1.5">
                  <span>🔓</span> 宿命之锁破限解除 (允许突破255上限)
                </span>
                <n-switch v-model:value="destinyCapUnlock" size="small" />
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300 flex items-center gap-1.5">
                  <span>⚔️</span> 双持武器双手互搏 (+1.0x 终极倍率)
                </span>
                <n-switch v-model:value="dualWieldMastery" size="small" />
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300 flex items-center gap-1.5">
                  <span>🛡️</span> 星图超载反噬防护盾 (免除10%自损)
                </span>
                <n-switch v-model:value="reboundAegis" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 下方：Godot 4.6 LTS 底层脚本契约矩阵 -->
        <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 relative z-10">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-cyan-300 font-mono">GODOT 4.6 LTS ARCHITECTURE SPEC</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">纯粹 RefCounted 离线解算</span>
              </div>
              <div class="text-xs text-gray-400 mt-0.5">命座星图觉醒、星环技能树状态机与双手互搏伤害解算器</div>
            </div>

            <div class="flex items-center gap-2">
              <div class="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs font-mono">
                <button
                  type="button"
                  class="px-2.5 py-1 rounded transition cursor-pointer"
                  :class="activeHyperCodeTab === 'matrix' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                  @click="activeHyperCodeTab = 'matrix'"
                >
                  hyper_mastery_matrix.gd
                </button>
                <button
                  type="button"
                  class="px-2.5 py-1 rounded transition cursor-pointer"
                  :class="activeHyperCodeTab === 'tree' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                  @click="activeHyperCodeTab = 'tree'"
                >
                  constellation_skill_tree.gd
                </button>
                <button
                  type="button"
                  class="px-2.5 py-1 rounded transition cursor-pointer"
                  :class="activeHyperCodeTab === 'dual' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'"
                  @click="activeHyperCodeTab = 'dual'"
                >
                  dual_wield_resolver.gd
                </button>
              </div>
              <n-button
                size="small"
                type="info"
                secondary
                round
                @click="copyHyperCode"
              >
                复制源码
              </n-button>
            </div>
          </div>

          <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
            <pre><code>{{ currentHyperCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 视图 7: 二十八大职业双轨觉醒与万能先驱者矩阵工坊 (Omni Pioneer Studio v2.2.302) ================= -->
    <div v-else-if="activeMainTab === 'omni_pioneer_matrix'" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-950/80 via-slate-900/90 to-purple-950/80 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.22)] space-y-6 relative overflow-hidden">
        <div class="absolute -right-24 -top-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-24 -bottom-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 头部与操作区 -->
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-900/60 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="px-2.5 py-0.5 rounded text-[11px] font-black font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                OMNI PIONEER DUAL-AWAKENING v2.2.302
              </span>
              <span class="text-xs text-cyan-300/80 font-mono">二十八大职业双轨觉醒矩阵</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-wide">
              <span>🌌</span> 全域二十八大职业双轨觉醒、天梯极意流转与万能先驱者矩阵工坊
            </h2>
            <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
              基于 Godot 4.6 LTS 实时仿真：驱动 28 大水晶职业光暗双轨觉醒、天梯极意被动无损贯通至自由人身、ABP 秒速注入与 999999 破限暴击神威解算。
            </p>
          </div>

          <div class="flex items-center gap-2 flex-wrap self-start md:self-auto">
            <n-button
              type="info"
              size="small"
              round
              secondary
              @click="resetPioneerParameters"
            >
              重置参数
            </n-button>
            <n-button
              type="primary"
              size="small"
              round
              secondary
              :loading="isSimulatingPioneer"
              @click="runPioneerSimulation"
            >
              <template #icon><span>⚡</span></template>
              启动先驱觉醒推演
            </n-button>
            <n-button
              type="warning"
              size="small"
              round
              secondary
              @click="exportPioneerCertificate"
            >
              <template #icon><span>📜</span></template>
              导出先驱方案书
            </n-button>
          </div>
        </div>

        <!-- 四大先驱者双轨原型 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
          <div
            v-for="archetype in pioneerArchetypes"
            :key="archetype.id"
            class="p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left"
            :class="selectedPioneerArchetypeId === archetype.id
              ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
              : 'bg-slate-900/60 border-slate-800 hover:border-cyan-600/50'"
            @click="selectedPioneerArchetypeId = archetype.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ archetype.icon }}</span>
              <n-tag size="tiny" :type="archetype.tagType" round>{{ archetype.track }}</n-tag>
            </div>
            <div class="font-bold text-sm text-gray-100">{{ archetype.name }}</div>
            <div class="text-[11px] text-cyan-300/80 font-mono mt-0.5">{{ archetype.role }}</div>
            <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{{ archetype.desc }}</p>
            <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <span>先驱战力: {{ archetype.baseCp.toLocaleString() }}</span>
              <span class="text-amber-400">极意: {{ archetype.burstDmg.toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <!-- 调控滑块与高能开关 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
          <!-- 左侧调控面板 -->
          <div class="lg:col-span-7 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>⚙️</span> 双轨觉醒与天梯流转参数连续微调
              </span>
              <span class="text-[11px] font-mono text-cyan-400">Continuous Dual-Awakening Dynamics</span>
            </div>

            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-300 font-medium">双轨觉醒共鸣度 (Dual-Track Resonance Sync):</span>
                  <span class="font-mono text-cyan-400 font-bold">{{ dualAwakeningSync }}%</span>
                </div>
                <n-slider v-model:value="dualAwakeningSync" :min="10" :max="100" :step="5" />
                <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                  <span>微光共鸣 (10%)</span>
                  <span>双轨交织 (50%)</span>
                  <span>神圣超觉醒 (100%)</span>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-300 font-medium">天梯极意流转层数 (Secret Flow Stacks):</span>
                  <span class="font-mono text-amber-400 font-bold">{{ secretFlowStacks }} 层</span>
                </div>
                <n-slider v-model:value="secretFlowStacks" :min="1" :max="10" :step="1" />
                <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                  <span>初悟极意 (1层)</span>
                  <span>万流归宗 (5层)</span>
                  <span>大圆满天梯 (10层)</span>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-300 font-medium">ABP 极速注入速率 (ABP Injection Velocity):</span>
                  <span class="font-mono text-emerald-400 font-bold">{{ abpInjectionRate }} ABP/s</span>
                </div>
                <n-slider v-model:value="abpInjectionRate" :min="100" :max="5000" :step="100" />
                <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                  <span>常规精通 (100)</span>
                  <span>超频催化 (2500)</span>
                  <span>太古光速 (5000)</span>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-300 font-medium">全被动贯通乘数 (Passive Penetration Multiplier):</span>
                  <span class="font-mono text-purple-400 font-bold">{{ passivePenetrationMultiplier.toFixed(1) }}x</span>
                </div>
                <n-slider v-model:value="passivePenetrationMultiplier" :min="1.5" :max="5.0" :step="0.1" />
                <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                  <span>基底继承 (1.5x)</span>
                  <span>自由人共鸣 (3.2x)</span>
                  <span>创世万能主宰 (5.0x)</span>
                </div>
              </div>
            </div>

            <!-- 三大高能保障开关 -->
            <div class="pt-3 border-t border-slate-800 space-y-2.5">
              <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-gray-200">自由人全职业被动无损贯通锁 (Lossless Passive Bridge)</div>
                  <div class="text-[11px] text-gray-400">28 大职业所有进阶被动特权 100% 贯通至自由人，零属性损耗衰减</div>
                </div>
                <n-switch v-model:value="freemanLosslessPassiveLock" size="small" />
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-gray-200">天梯极意流转瞬发断路器 (Instant Secret Flow Breaker)</div>
                  <div class="text-[11px] text-gray-400">技能后摇与咏唱延迟归零，双轨战技无需等待直接无缝连环触发</div>
                </div>
                <n-switch v-model:value="secretArtsInstantTrigger" size="small" />
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div class="space-y-0.5">
                  <div class="text-xs font-bold text-gray-200">999999 伤害天花板神力破限器 (Limit Break Divine Governor)</div>
                  <div class="text-[11px] text-gray-400">全面解除所有单段攻击 999999 伤害限制，真伤斩击最高飙升至 9,999,999</div>
                </div>
                <n-switch v-model:value="limitBreakDivineGovernor" size="small" />
              </div>
            </div>
          </div>

          <!-- 右侧能效指标解算与沙盘推演 -->
          <div class="lg:col-span-5 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <span>📊</span> 实时解算先驱战力与极意爆发
                </span>
                <n-tag size="tiny" type="success" round>Pioneer Awakened</n-tag>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="p-3 rounded-lg bg-cyan-950/30 border border-cyan-700/40">
                  <div class="text-[11px] text-gray-400">先驱者神圣战力</div>
                  <div class="text-lg font-black text-cyan-300 font-mono mt-0.5">{{ calculatedPioneerCp.toLocaleString() }} CP</div>
                  <div class="text-[10px] text-cyan-400/80 mt-0.5">双轨觉醒加成系数</div>
                </div>

                <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-700/40">
                  <div class="text-[11px] text-gray-400">极意单发破限伤害</div>
                  <div class="text-lg font-black text-amber-300 font-mono mt-0.5">{{ calculatedBurstDmg.toLocaleString() }} DMG</div>
                  <div class="text-[10px] text-amber-400/80 mt-0.5">天梯瞬发斩击峰值</div>
                </div>

                <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-700/40">
                  <div class="text-[11px] text-gray-400">全职业精通耗时</div>
                  <div class="text-lg font-black text-emerald-300 font-mono mt-0.5">{{ calculatedAbpFullTime }} 分钟</div>
                  <div class="text-[10px] text-emerald-400/80 mt-0.5">以太注入极速冲级</div>
                </div>

                <div class="p-3 rounded-lg bg-purple-950/30 border border-purple-700/40">
                  <div class="text-[11px] text-gray-400">先驱者认证位阶</div>
                  <div class="text-sm font-black text-purple-300 font-mono mt-1">{{ calculatedPioneerTier }}</div>
                  <div class="text-[10px] text-purple-400/80 mt-0.5">太古神座水晶认证</div>
                </div>
              </div>
            </div>

            <!-- 推演终端 -->
            <div class="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-400">五阶段双轨觉醒推演进度:</span>
                <span class="font-mono text-cyan-400 font-bold">{{ pioneerSimStep }}/5 阶段</span>
              </div>
              <n-progress
                type="line"
                :percentage="(pioneerSimStep / 5) * 100"
                :status="pioneerSimStep === 5 ? 'success' : 'info'"
                :show-indicator="false"
                processing
              />
              <div class="text-[11px] text-gray-300 font-mono bg-slate-900/90 p-2 rounded border border-slate-800/80 min-h-[48px] flex items-center">
                <span>{{ pioneerSimCurrentLog }}</span>
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
                  :class="activePioneerCodeTab === 'awakening' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                  @click="activePioneerCodeTab = 'awakening'"
                >
                  omni_pioneer_awakening.gd
                </button>
                <button
                  type="button"
                  class="px-2.5 py-1 text-xs rounded transition-all"
                  :class="activePioneerCodeTab === 'bridge' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                  @click="activePioneerCodeTab = 'bridge'"
                >
                  freeman_passive_bridge.gd
                </button>
                <button
                  type="button"
                  class="px-2.5 py-1 text-xs rounded transition-all"
                  :class="activePioneerCodeTab === 'secret' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                  @click="activePioneerCodeTab = 'secret'"
                >
                  secret_arts_flow.gd
                </button>
              </div>
              <n-button size="small" type="primary" secondary round @click="copyPioneerCode">
                复制源码
              </n-button>
            </div>
          </div>

          <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
            <pre><code>{{ currentPioneerCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 视图 8: 三十全职业水晶转职树、被动融合与奥义转生工坊 (Crystal Passive Rebirth v2.2.332) ================= -->
    <div v-else-if="activeMainTab === 'crystal_passive_rebirth'" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-950/80 via-slate-900/95 to-indigo-950/80 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)] space-y-6 relative overflow-hidden">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
                CRYSTAL TREE &amp; PASSIVE FUSION STUDIO v2.2.332
              </span>
              <span class="text-xs text-cyan-400 font-mono">Thirty Jobs Transcendence Matrix Pipeline</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🔮</span> 三十全职业水晶转职树、被动技能融合与奥义转生工坊
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
              提供三十大职业水晶星盘拓扑、无限制跨职业被动技能熔铸插槽、转生全属性继承倍率与超越 999,999 极限奥义破限推演沙盘。
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <n-button
              type="info"
              size="small"
              round
              secondary
              :loading="isSimulatingCrystalRebirth"
              @click="runCrystalRebirthSimulation"
            >
              <template #icon><span>⚡</span></template>
              启动转生推演沙盘
            </n-button>
            <n-button
              type="warning"
              size="small"
              round
              secondary
              @click="exportCrystalRebirthCertificate"
            >
              <template #icon><span>📜</span></template>
              导出转生方案证书
            </n-button>
          </div>
        </div>

        <!-- 四大水晶转生原型 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="arch in crystalRebirthArchetypes"
            :key="arch.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative"
            :class="selectedRebirthArchetypeId === arch.id ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-slate-800/40 border-slate-700/60 hover:border-cyan-500/40'"
            @click="selectRebirthArchetype(arch.id)"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ arch.icon }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {{ arch.tag }}
              </span>
            </div>
            <div class="font-bold text-sm text-white">{{ arch.name }}</div>
            <div class="text-xs text-cyan-300 font-mono mt-0.5">{{ arch.subtitle }}</div>
            <div class="text-[11px] text-gray-400 mt-2 leading-relaxed">{{ arch.desc }}</div>
            <div class="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] font-mono">
              <span class="text-gray-400">基准转生战力</span>
              <span class="text-cyan-400 font-bold">{{ arch.basePower }}</span>
            </div>
          </div>
        </div>

        <!-- 参数调节与开关控制网格 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
          <!-- 4 滑块 -->
          <div class="space-y-4">
            <div class="text-xs font-bold text-cyan-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
              <span>⚙️</span> 水晶星盘与转生参数微调
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">水晶共振同调谐波率 (%)</span>
                <span class="text-cyan-400 font-mono font-bold">{{ crystalResonanceHarmonyRatio }} %</span>
              </div>
              <n-slider v-model:value="crystalResonanceHarmonyRatio" :min="50" :max="100" :step="1" />
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">被动技能融合槽位容量 (槽)</span>
                <span class="text-amber-400 font-mono font-bold">{{ passiveFusionSynergyCapacity }} 槽</span>
              </div>
              <n-slider v-model:value="passiveFusionSynergyCapacity" :min="4" :max="16" :step="1" />
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">转生全属性继承倍率 (%)</span>
                <span class="text-emerald-400 font-mono font-bold">{{ rebirthStatBonusPct }} %</span>
              </div>
              <n-slider v-model:value="rebirthStatBonusPct" :min="110" :max="250" :step="5" />
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">奥义冷却极速缩减率 (%)</span>
                <span class="text-purple-400 font-mono font-bold">{{ secretArtsCooldownReductionPct }} %</span>
              </div>
              <n-slider v-model:value="secretArtsCooldownReductionPct" :min="20" :max="80" :step="5" />
            </div>
          </div>

          <!-- 3 开关与实时数据 -->
          <div class="space-y-4">
            <div class="text-xs font-bold text-cyan-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
              <span>✨</span> 职业解限与被动熔铸特权
            </div>

            <div class="space-y-2.5">
              <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-xs">
                  <div class="text-white font-medium">突破职业界限全被动自由融合</div>
                  <div class="text-gray-400 text-[11px]">任何职业均可无视类别装配法系/物理被动</div>
                </div>
                <n-switch v-model:value="crossJobPassiveFusionUnrestricted" />
              </div>

              <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-xs">
                  <div class="text-white font-medium">ABP 满级溢出自动转生奥义点</div>
                  <div class="text-gray-400 text-[11px]">达到 MAX ABP 后经验 100% 转化转生灵力</div>
                </div>
                <n-switch v-model:value="autoAbpMasteryOverflowAccumulation" />
              </div>

              <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-xs">
                  <div class="text-white font-medium">奥义转生超越 999,999 伤害破限</div>
                  <div class="text-gray-400 text-[11px]">解锁太古极限伤害上限至 99,999,999</div>
                </div>
                <n-switch v-model:value="secretArtsLimitBreakUncap" />
              </div>
            </div>

            <!-- 4 项实时综合解算指标 -->
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div class="p-2.5 rounded bg-slate-900 border border-cyan-500/20 text-center">
                <div class="text-[11px] text-gray-400">综合转生战力</div>
                <div class="text-lg font-mono font-black text-cyan-400">{{ calculatedRebirthMetrics.compositeJobPowerRating }}</div>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-cyan-500/20 text-center">
                <div class="text-[11px] text-gray-400">被动融合效率</div>
                <div class="text-lg font-mono font-black text-emerald-400">{{ calculatedRebirthMetrics.passiveSlotsEfficiency }}</div>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-cyan-500/20 text-center">
                <div class="text-[11px] text-gray-400">属性转生增益</div>
                <div class="text-lg font-mono font-black text-amber-400">{{ calculatedRebirthMetrics.rebirthAttributeGain }}</div>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-cyan-500/20 text-center">
                <div class="text-[11px] text-gray-400">水晶先驱评级</div>
                <div class="text-lg font-mono font-black text-purple-400">{{ calculatedRebirthMetrics.crystalPioneerCertification }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 五阶段沙盘推演进度条 -->
        <div v-if="isSimulatingCrystalRebirth" class="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30">
          <div class="flex justify-between text-xs font-mono">
            <span class="text-cyan-300 flex items-center gap-2">
              <span class="animate-spin">🔄</span> {{ crystalRebirthStages[currentRebirthSimStage] }}
            </span>
            <span class="text-gray-400">{{ (currentRebirthSimStage + 1) * 20 }}%</span>
          </div>
          <n-progress type="line" :percentage="(currentRebirthSimStage + 1) * 20" :show-indicator="false" status="info" />
        </div>

        <!-- Godot 4.6 LTS 源码展台 -->
        <div class="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-gray-300 font-mono">GODOT 4.6 LTS CRYSTAL REBIRTH ENGINE</span>
              <n-tag size="small" type="info" round>res://scripts/combat/jobs/</n-tag>
            </div>
            <div class="flex items-center gap-2">
              <n-radio-group v-model:value="activeRebirthScriptTab" size="small">
                <n-radio-button value="tree_orchestrator">水晶星盘树</n-radio-button>
                <n-radio-button value="fusion_matrix">被动融合引擎</n-radio-button>
                <n-radio-button value="rebirth_controller">奥义转生控制器</n-radio-button>
              </n-radio-group>
              <n-button type="info" size="tiny" secondary round @click="copyRebirthScript">
                复制当前脚本
              </n-button>
            </div>
          </div>

          <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
            <pre><code>{{ currentRebirthScriptCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Directive } from 'vue'
import { useMessage } from 'naive-ui'
import { jobsList } from '../config/jobsConfig'
import { usePagination } from '@/composables/usePagination'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

const activeMainTab = ref<'catalog' | 'studio' | 'synergy' | 'abp_mastery' | 'transcendence_tree' | 'hyper_mastery_matrix' | 'omni_pioneer_matrix' | 'crystal_passive_rebirth'>('catalog')
const selectedCrystal = ref('all')

// 分类数量与卡片使用同一目录；不随当前筛选或分页缩减。
const crystals = computed(() => [
  { id: 'all', name: '全部' },
  { id: 'special', name: '始源与深渊特权' },
  { id: 'wind', name: '风之水晶' },
  { id: 'water', name: '水之水晶' },
  { id: 'fire', name: '火之水晶' },
  { id: 'earth', name: '土之水晶' }
].map(crystal => ({
  ...crystal,
  count: crystal.id === 'all' ? jobsList.length : jobsList.filter(job => job.crystal === crystal.id).length
})))

const filteredJobs = computed(() => {
  if (selectedCrystal.value === 'all') return jobsList
  return jobsList.filter(j => j.crystal === selectedCrystal.value)
})

const {
  currentPage,
  pageSize,
  total,
  paginatedList,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination(filteredJobs, { pageSize: 6 })

// simple 输入未开放 input-props；局部指令在挂载和响应式切换后为实际输入具名。
const labelSimplePageInput = (container: HTMLElement) => {
  container.querySelector<HTMLInputElement>('.n-pagination--simple input')
    ?.setAttribute('aria-label', '职业目录当前页')
}
const vSimplePageLabel: Directive<HTMLElement> = {
  mounted: labelSimplePageInput,
  updated: labelSimplePageInput
}

// 只记录同一次 simple 键盘点击，普通翻页更新与鼠标操作不触发返焦。
let simplePaginationActivation: { event: MouseEvent; button: HTMLButtonElement; page: number } | null = null
const captureSimplePaginationActivation = (event: MouseEvent) => {
  simplePaginationActivation = null
  const button = event.target instanceof Element ? event.target.closest('button.jobs-pagination-control') : null
  if (isMobile.value && event.detail === 0 && button instanceof HTMLButtonElement
    && !button.disabled && document.activeElement === button) {
    simplePaginationActivation = { event, button, page: currentPage.value }
  }
}

const preserveSimplePaginationFocus = (event: MouseEvent) => {
  const activation = simplePaginationActivation
  simplePaginationActivation = null
  if (!activation || activation.event !== event || currentPage.value === activation.page) return
  const container = event.currentTarget as HTMLElement
  void nextTick(() => {
    const { button } = activation
    if (!isMobile.value || !button.isConnected || !button.disabled) return
    if (document.activeElement !== button && document.activeElement !== document.body) return
    container.querySelector<HTMLInputElement>('.n-pagination--simple input')?.focus({ preventScroll: true })
  })
}

watch(selectedCrystal, () => {
  resetPage()
})

const getCrystalTag = (crystal: string) => {
  if (crystal === 'special') return 'error'
  if (crystal === 'wind') return 'success'
  if (crystal === 'water') return 'info'
  if (crystal === 'fire') return 'error'
  return 'warning'
}

const getJobRecommendation = (id: string): string => {
  switch (id) {
    case 'ninja':
      return '忍者精通 → 自由人／模仿师 继承双持。转为上述职业后，仍须使用允许双持的武器，并保持盾槽为空。'
    case 'knight':
      return '骑士精通 → 自由人／模仿师 继承持盾格挡与主动守护换位。持合法盾牌时，有机会挡下敌方单体物理行动中首个本应造成正伤害的命中，每次敌方行动只检查一次（不适用于魔法、群体或固定伤害）；主动守护换位仍需手动选择其他存活同伴，拦截下一次单体攻击。'
    case 'monk':
      return '武僧精通 → 自由人／模仿师 继承徒手与受击反击。转为上述职业后，主手、副手与盾槽均为空时，普通攻击可用徒手攻击下限；有效受击且本人可行动后有机会反击，每次敌方行动最多一次。'
    case 'hunter':
      return '猎人精通 → 自由人／模仿师 继承开局优势与物理回避。转为上述职业后，首次载入且本人可行动时获得开局优势，后续波次/复活不重复；物理回避沿原规则，必中攻击跳过这项回避。'
    case 'freelancer':
    case 'mime':
      return '四系精通大成继承者：同时支持【忍者】二刀流双持、【骑士】持盾格挡与主动守护换位、【武僧】徒手与反击以及【猎人】开局优势与物理回避四条完整精通继承路线！'
    default:
      return ''
  }
}

const getJobMagicAccess = (id: string): string => {
  switch (id) {
    case 'white_mage':
      return '• 白魔法教材（不限于低阶）\n全阶白魔法教材（恢复、解毒、大回复、复活术、神圣术等）均可使用。'
    case 'black_mage':
      return '• 黑魔法教材（不限于低阶）\n全阶黑魔法教材（初级元素、大火炎、大暴雪、核爆禁咒等）均可使用。'
    case 'time_mage':
      return '• 时空魔法教材（不限于低阶）\n• Quick 教材沿原时空职业例外可用，不开放其它黑魔法教材。'
    case 'summoner':
      return '• 召唤教材（不限于低阶）\n全阶召唤兽魔石与秘法契约教材均可使用。'
    case 'red_mage':
      return '• 白魔法教材（1～3阶）\n• 黑魔法教材（1～3阶）\n仅限初级至进阶白黑魔法，不开放高阶与终极核爆/神圣禁咒。'
    case 'paladin':
    case 'knight':
      return '• 白魔法教材（1～3阶）\n仅限初阶神圣治愈系辅助教材。'
    case 'mystic_knight':
      return '• 黑魔法教材（1～3阶）\n支持初中阶元素附魔教材，不开放高阶黑魔法。'
    default:
      return '无已接入的普通教材类别。仍须已取得共享教材或已启用本人教材，处于合法当前职业生效。'
  }
}

interface JobSkillEntry {
  level: number | string
  name: string
  desc: string
  hiddenUntilStory?: boolean
  requiredFlag?: string
}

const jobSkillsDirectoryData: Record<string, JobSkillEntry[]> = {
  freelancer: [
    { level: '始源', name: '万象全能继承', desc: '无固定职业特技目录，以继承其他精通职业被动与双副职业特技为准。' }
  ],
  mime: [
    { level: 1, name: '模仿', desc: '若合法，重复上一名队友行动。' },
    { level: 4, name: '镜步', desc: '复制上一个防御姿态。' },
    { level: 8, name: '回声技', desc: '以较低威力重复低消耗技能。' },
    { level: 14, name: '无相', desc: '一回合内规避部分目标规则。' },
    { level: 20, name: '完美模仿', desc: '每场战斗一次，完整重复上一行动。' }
  ],
  knight: [
    { level: 1, name: '守护换位', desc: '替低 HP 队友承受下一次单体攻击。' },
    { level: 4, name: '盾击', desc: '造成伤害并延后目标行动。' },
    { level: 8, name: '挑衅', desc: '使敌人更倾向攻击自己。' },
    { level: 14, name: '坚壁', desc: '一回合内降低全队受到的物理伤害。' },
    { level: 20, name: '不屈守誓', desc: '每场战斗一次，以 1 HP 承受致命伤害。' }
  ],
  monk: [
    { level: 1, name: '聚气掌', desc: '徒手攻击，暴击率提高。' },
    { level: 4, name: '气息调和', desc: '回复自身 HP 并解除一个轻度异常。' },
    { level: 8, name: '反击架势', desc: '反击下一次物理攻击。' },
    { level: 14, name: '连环拳', desc: '连续发动多次轻度物理打击。' },
    { level: 20, name: '真气爆发', desc: '消耗自身气血引发大范围震荡伤害。' }
  ],
  thief: [
    { level: 1, name: '偷盗', desc: '窃取目标携带的金币或道具。' },
    { level: 4, name: '疾走脱离', desc: '提高全队逃跑成功率。' },
    { level: 8, name: '开锁', desc: '无钥匙开启迷宫密门与宝箱。' },
    { level: 14, name: '弱点侦察', desc: '以情报卡暴露目标首个元素弱点（严守最小披露不泄露生命值），未能探明时显示未发现弱点。' },
    { level: 20, name: '掠夺突袭', desc: '偷窃的同时附加必定暴击的高速刺击。' }
  ],
  'white_mage': [
    { level: 1, name: '初阶白魔法', desc: '恢复、解毒、护盾，可用技能以魔法菜单为准。' },
    { level: 8, name: '进阶白魔法', desc: '大回复、复活术、神圣壁垒。' },
    { level: 20, name: '极意神圣术', desc: '消耗大额 MP 引发纯白天界神圣极效裁决。' }
  ],
  'black_mage': [
    { level: 1, name: '初阶黑魔法', desc: '火炎、冰冻、雷电，可用技能以魔法菜单为准。' },
    { level: 8, name: '高阶破坏黑术', desc: '大暴雪、大雷电、死灵术。' },
    { level: 20, name: '古代核爆禁咒', desc: '古代禁忌破坏法术核爆，无视目标魔法防御。' }
  ],
  'time_mage': [
    { level: 1, name: '时空操纵·加速', desc: '加速自身与同伴 ATB 充能速度。' },
    { level: 8, name: '重力波与彗星', desc: '削减百分比生命值并召唤彗星。' },
    { level: 20, name: '次元跳跃 Quick', desc: '冻结全场时间流，获得连续两次不受干扰的即时自由行动。' }
  ],
  summoner: [
    { level: 1, name: '灵契召唤·初阶', desc: '召唤陆行鸟与小精灵进行战场辅助。' },
    { level: 8, name: '元素蛮神契约', desc: '希瓦冰霜灵气、伊弗利特地狱烈炎。' },
    { level: 20, name: '苍龙巴哈姆特', desc: '龙王降临全屏百万核爆 (Mega Flare)。' }
  ],
  'mystic_knight': [
    { level: 1, name: '元素刃', desc: '为武器附加指定低阶元素。' },
    { level: 4, name: '魔力斩', desc: '随魔法力部分成长的武器攻击。' },
    { level: 8, name: '封咒刃', desc: '造成伤害并小概率沉默。' },
    { level: 14, name: '双附魔', desc: '接下来两次攻击保留附魔。' },
    { level: 20, name: '魔剑连舞', desc: '多段附魔武器连击。' }
  ],
  ninja: [
    { level: 1, name: '投掷', desc: '投掷消耗型武器、遁术道具或手里剑。' },
    { level: 4, name: '烟遁', desc: '提高闪避和逃跑成功率。' },
    { level: 8, name: '影分身', desc: '回避下一次直接攻击。' },
    { level: 14, name: '双刃连击', desc: '两把武器连续发动双重斩击。' },
    { level: 20, name: '二刀流极意', desc: '双手各自装备武器，平A与战技同时发动两次命中。' }
  ],
  hunter: [
    { level: 1, name: '瞄准射击', desc: '高命中远程狙击，无视敌方部分闪避。' },
    { level: 4, name: '捕兽夹', desc: '对踩中陷阱的目标造成迟滞减速。' },
    { level: 8, name: '破翼箭', desc: '对飞行魔兽造成特攻暴击。' },
    { level: 14, name: '猎物标记', desc: '标记目标，全队对其物理伤害提升。' },
    { level: 20, name: '乱打连射', desc: '四连发箭矢无差别贯穿扫射。' }
  ]
}

const getJobSkillDirectory = (id: string): JobSkillEntry[] => {
  return jobSkillsDirectoryData[id] || [
    { level: '1~20', name: '职业特技群', desc: '正式目录技能以能力／战斗菜单为准。' }
  ]
}

// ================= D08 演练台数据与逻辑 =================
interface StudioHero {
  id: string
  name: string
  level: number
  baseStr: number
  baseAgi: number
  baseVit: number
  baseMag: number
  baseHp: number
  baseMp: number
}

const studioHeroes: StudioHero[] = [
  { id: 'bartz', name: '巴兹 (Bartz)', level: 45, baseStr: 32, baseAgi: 28, baseVit: 30, baseMag: 25, baseHp: 2400, baseMp: 140 },
  { id: 'lenna', name: '蕾娜 (Lenna)', level: 45, baseStr: 26, baseAgi: 28, baseVit: 27, baseMag: 35, baseHp: 1950, baseMp: 360 },
  { id: 'galuf', name: '加拉夫 (Galuf)', level: 45, baseStr: 35, baseAgi: 26, baseVit: 33, baseMag: 22, baseHp: 2800, baseMp: 110 },
  { id: 'faris', name: '法里斯 (Faris)', level: 45, baseStr: 30, baseAgi: 33, baseVit: 29, baseMag: 27, baseHp: 2200, baseMp: 190 },
  { id: 'krile', name: '克露露 (Krile)', level: 45, baseStr: 27, baseAgi: 34, baseVit: 26, baseMag: 33, baseHp: 2050, baseMp: 330 }
]

const selectedHero = ref<StudioHero>(studioHeroes[0])
const studioSelectedJobId = ref<string>('knight')
const studioJlv = ref<number>(14)
const studioFlags = reactive({
  wind_crystal: true,
  story_sealed_temple: false
})

const currentTargetJobObj = computed(() => jobsList.find(j => j.id === studioSelectedJobId.value))

interface JobModifier {
  hpPct: number
  mpPct: number
  str: number
  agi: number
  vit: number
  mag: number
}

const jobModifiersTable: Record<string, JobModifier> = {
  freelancer: { hpPct: 20, mpPct: 20, str: 10, agi: 10, vit: 10, mag: 10 },
  mime: { hpPct: 0, mpPct: 35, str: 0, agi: 5, vit: 0, mag: 20 },
  knight: { hpPct: 35, mpPct: -15, str: 14, agi: 1, vit: 14, mag: -10 },
  monk: { hpPct: 50, mpPct: -30, str: 26, agi: 1, vit: 26, mag: -20 },
  ninja: { hpPct: 15, mpPct: 0, str: 9, agi: 14, vit: 3, mag: -5 },
  white_mage: { hpPct: -10, mpPct: 45, str: -7, agi: 1, vit: -1, mag: 15 },
  black_mage: { hpPct: -15, mpPct: 55, str: -9, agi: 0, vit: -2, mag: 22 },
  time_mage: { hpPct: -5, mpPct: 40, str: -5, agi: 2, vit: -3, mag: 14 },
  summoner: { hpPct: -15, mpPct: 60, str: -10, agi: -1, vit: -1, mag: 24 },
  hunter: { hpPct: 10, mpPct: -5, str: 16, agi: 12, vit: 1, mag: -5 },
  samurai: { hpPct: 25, mpPct: -10, str: 19, agi: 2, vit: 9, mag: -12 },
  dragoon: { hpPct: 30, mpPct: -15, str: 18, agi: 5, vit: 15, mag: -12 }
}

const currentJobModifier = computed<JobModifier>(() => {
  return jobModifiersTable[studioSelectedJobId.value] || { hpPct: 10, mpPct: 10, str: 5, agi: 5, vit: 5, mag: 5 }
})

const evaluatedHeroStats = computed(() => {
  const hero = selectedHero.value
  const mod = currentJobModifier.value

  const hp = Math.round(hero.baseHp * (1 + mod.hpPct / 100))
  const mp = Math.round(hero.baseMp * (1 + mod.mpPct / 100))
  const str = hero.baseStr + mod.str
  const agi = hero.baseAgi + mod.agi
  const vit = hero.baseVit + mod.vit
  const mag = hero.baseMag + mod.mag

  const combatScore = Math.round((hp * 0.4) + (mp * 0.3) + (str * 12) + (agi * 10) + (vit * 8) + (mag * 11))

  return { hp, mp, str, agi, vit, mag, combatScore }
})

interface EvaluatedSkill extends JobSkillEntry {
  isAvailable: boolean
  lockReason: string
}

const currentStudioSkills = computed<EvaluatedSkill[]>(() => {
  const dir = getJobSkillDirectory(studioSelectedJobId.value)
  return dir.map(sk => {
    const requiredLevel = typeof sk.level === 'number' ? sk.level : 1
    const levelMet = studioJlv.value >= requiredLevel

    let flagMet = true
    if (sk.hiddenUntilStory) {
      if (sk.requiredFlag === 'story_sealed_temple') {
        flagMet = studioFlags.story_sealed_temple
      }
    }

    const available = levelMet && flagMet
    let reason = '未达成入列资格'
    if (!levelMet) reason = `需达 JLV ${requiredLevel}`
    else if (!flagMet) reason = '缺少剧情传承'

    return {
      ...sk,
      isAvailable: available,
      lockReason: reason
    }
  })
})

const resetStudioState = () => {
  selectedHero.value = studioHeroes[0]
  studioSelectedJobId.value = 'knight'
  studioJlv.value = 14
  studioFlags.wind_crystal = true
  studioFlags.story_sealed_temple = false
}

// ================= 自由人与模仿士全精通属性汇聚与被动继承工作台 (job_mastery_rules.gd) =================
const selectedMasteryActor = ref('nahart')
const selectedMasteryCurrentJob = ref('freelancer')
const masteredJobIds = ref<string[]>(['knight', 'ninja', 'black_mage'])

const masteryActorOptions = [
  { label: 'nahart: 纳哈特 (初始: 自由人)', value: 'nahart' },
  { label: 'sera: 塞拉 (初始: 白魔道士)', value: 'sera' },
  { label: 'aegis: 伊吉斯 (初始: 黑魔道士)', value: 'aegis' },
  { label: 'grave: 格雷夫 (初始: 自由人)', value: 'grave' },
  { label: 'sol: 索尔 (初始: 自由人)', value: 'sol' }
]

const masteryCurrentJobOptions = [
  { label: '自由人 (Freelancer) · 汇聚全部精通', value: 'freelancer' },
  { label: '模仿士 (Mime) · 汇聚全部精通', value: 'mime' },
  { label: '骑士 (Knight) · 仅本职原生', value: 'knight' },
  { label: '忍者 (Ninja) · 仅本职原生', value: 'ninja' },
  { label: '黑魔道士 (Black Mage) · 仅本职原生', value: 'black_mage' }
]

const candidateMasteryJobs = [
  { id: 'knight', name: '骑士', peak: { max_hp: 420, max_mp: 40, attack: 52, defense: 48, magic_attack: 10, magic_defense: 22, speed: 18, spirit: 25 }, passive: { name: '守护 (Cover)', desc: '自动替虚弱同伴承担物理攻击' } },
  { id: 'ninja', name: '忍者', peak: { max_hp: 280, max_mp: 60, attack: 46, defense: 25, magic_attack: 28, magic_defense: 20, speed: 64, spirit: 30 }, passive: { name: '二刀流 (Dual Wield)', desc: '支持双手同时装备武器并独立双挥' } },
  { id: 'monk', name: '武僧', peak: { max_hp: 580, max_mp: 20, attack: 58, defense: 35, magic_attack: 5, magic_defense: 18, speed: 32, spirit: 28 }, passive: { name: '徒手格斗 (Barehanded)', desc: '空手状态下攻击力大幅攀升' } },
  { id: 'thief', name: '盗贼', peak: { max_hp: 260, max_mp: 45, attack: 35, defense: 22, magic_attack: 15, magic_defense: 18, speed: 60, spirit: 22 }, passive: { name: '警戒与冲刺 (Alert & Dash)', desc: '防偷袭并提高原野移动速度' } },
  { id: 'black_mage', name: '黑魔道士', peak: { max_hp: 180, max_mp: 280, attack: 15, defense: 18, magic_attack: 68, magic_defense: 45, speed: 25, spirit: 35 }, passive: null },
  { id: 'white_mage', name: '白魔道士', peak: { max_hp: 210, max_mp: 260, attack: 18, defense: 20, magic_attack: 42, magic_defense: 55, speed: 28, spirit: 65 }, passive: null }
]

const activeMasteryActorName = computed(() => {
  const map: Record<string, string> = { nahart: '纳哈特', sera: '塞拉', aegis: '伊吉斯', grave: '格雷夫', sol: '索尔' }
  return map[selectedMasteryActor.value] || selectedMasteryActor.value
})

const activeMasteryJobName = computed(() => {
  const map: Record<string, string> = { freelancer: '自由人', mime: '模仿士', knight: '骑士', ninja: '忍者', black_mage: '黑魔道士' }
  return map[selectedMasteryCurrentJob.value] || selectedMasteryCurrentJob.value
})

const isMasteryInheritTarget = computed(() => {
  return selectedMasteryCurrentJob.value === 'freelancer' || selectedMasteryCurrentJob.value === 'mime'
})

const masteredJobsCount = computed(() => masteredJobIds.value.length)

const toggleMasteredJob = (id: string) => {
  const idx = masteredJobIds.value.indexOf(id)
  if (idx >= 0) {
    masteredJobIds.value.splice(idx, 1)
  } else {
    masteredJobIds.value.push(id)
  }
}

const masteryStatResults = computed(() => {
  const statsDef = [
    { key: 'max_hp', label: '生命最大值 (HP)' },
    { key: 'max_mp', label: '魔力最大值 (MP)' },
    { key: 'attack', label: '物理攻击 (ATK)' },
    { key: 'defense', label: '物理防御 (DEF)' },
    { key: 'magic_attack', label: '魔法威力 (MATK)' },
    { key: 'magic_defense', label: '魔法防御 (MDEF)' },
    { key: 'speed', label: '行动先攻 (SPD)' },
    { key: 'spirit', label: '精神抗性 (SPI)' }
  ]

  if (!isMasteryInheritTarget.value) {
    const targetJob = candidateMasteryJobs.find(j => j.id === selectedMasteryCurrentJob.value)
    return statsDef.map(sd => ({
      key: sd.key,
      label: sd.label,
      bonus: targetJob ? (targetJob.peak as any)[sd.key] : 0,
      source: targetJob ? targetJob.name : '—'
    }))
  }

  return statsDef.map(sd => {
    let maxBonus = 0
    let bestSource = '无精通'
    for (const jid of masteredJobIds.value) {
      const job = candidateMasteryJobs.find(j => j.id === jid)
      if (job) {
        const val = (job.peak as any)[sd.key] || 0
        if (val > maxBonus) {
          maxBonus = val
          bestSource = job.name
        }
      }
    }
    return {
      key: sd.key,
      label: sd.label,
      bonus: maxBonus,
      source: bestSource
    }
  })
})

const inheritedPassives = computed(() => {
  if (!isMasteryInheritTarget.value) return []
  const list: { name: string; job: string; desc: string }[] = []
  for (const jid of masteredJobIds.value) {
    const job = candidateMasteryJobs.find(j => j.id === jid)
    if (job && job.passive) {
      list.push({
        name: job.passive.name,
        job: job.name,
        desc: job.passive.desc
      })
    }
  }
  return list
})

const masteryTraceLogs = computed(() => {
  const logs: string[] = []
  logs.push(`角色校验: character='${selectedMasteryActor.value}' 属于法定 ACTORS 白名单`)
  logs.push(`精通状态: 当前已达成 ${masteredJobIds.value.length} 个 JLV 20 极意精通职业`)
  if (isMasteryInheritTarget.value) {
    logs.push(`汇聚激活: current_job in ['freelancer', 'mime']，触发 peak_bonus() 全维汇聚与 passive 继承`)
  } else {
    logs.push(`汇聚拦截: current_job='${selectedMasteryCurrentJob.value}'，常规职业保持本职独立隔离`)
  }
  return logs
})

const resetMasteryStudio = () => {
  selectedMasteryActor.value = 'nahart'
  selectedMasteryCurrentJob.value = 'freelancer'
  masteredJobIds.value = ['knight', 'ninja', 'black_mage']
}

// ================= 八大职业战时特技裁决与战术收益工坊 (job_technique_resolver.gd) =================
const selectedTechniqueId = ref('steal')
const techCasterCounterReady = ref(false)
const techCasterElementBonus = ref(0)

const techniqueSelectOptions = [
  { label: 'steal: 盗贼神偷 (偷金币 20G + 概率得恢复药 · 防虚报)', value: 'steal' },
  { label: 'grand_analysis: 学者大解析 (全体敌人防御崩解 DEF -6)', value: 'grand_analysis' },
  { label: 'snare: 猎人捕兽夹 (单体减速 SPD -3，破甲 DEF -2)', value: 'snare' },
  { label: 'mark_prey: 猎人标记猎物 (单体集中破甲 DEF -4)', value: 'mark_prey' },
  { label: 'dazzle: 舞者迷目乱舞 (全体敌方真实混乱判定)', value: 'dazzle' },
  { label: 'quiet_note: 吟游诗人静音之符 (每名敌人独立 25% 概率沉默)', value: 'quiet_note' },
  { label: 'counter: 武僧受击反击架势 (激活 counter_ready 状态)', value: 'counter' },
  { label: 'twin_enspell: 魔法剑士双重附魔 (本场元素输出加成 +2)', value: 'twin_enspell' }
]

const techEnemies = ref([
  { name: '绿色粘液怪 (Slime)', status: 'normal' as 'normal' | 'confuse' | 'silence', defPenalty: 0, spdPenalty: 0 },
  { name: '哥布林侦察兵 (Goblin)', status: 'normal' as 'normal' | 'confuse' | 'silence', defPenalty: 0, spdPenalty: 0 },
  { name: '铁甲巨像 (Iron Giant)', status: 'normal' as 'normal' | 'confuse' | 'silence', defPenalty: 0, spdPenalty: 0 }
])

const techniqueTraceLogs = ref<string[]>([
  '系统就绪: job_technique_resolver.gd 规约完成载入',
  '契约守卫: 盗贼偷盗防溢出虚报、学者大解析全体破甲、武僧反击与舞者混乱合法接入'
])

const resolveTechniqueAction = () => {
  const tech = selectedTechniqueId.value

  if (tech === 'steal') {
    const gotPotion = Math.random() < 0.4
    techniqueTraceLogs.value.unshift(`[盗贼偷盗] 成功偷取 STEAL_GOLD = 20G！${gotPotion ? '额外缴获恢复药 (Item 1)' : '未偷得道具'}，已写入背包增量`)
  } else if (tech === 'grand_analysis') {
    techEnemies.value.forEach(e => { e.defPenalty += 6 })
    techniqueTraceLogs.value.unshift('[学者大解析] 全体敌方 defense_penalty += 6！目标物理护甲全面粉碎')
  } else if (tech === 'snare') {
    const target = techEnemies.value[0]
    target.spdPenalty += 3
    target.defPenalty += 2
    techniqueTraceLogs.value.unshift(`[猎人捕兽夹] 命中 ${target.name}：speed_penalty += 3, defense_penalty += 2`)
  } else if (tech === 'mark_prey') {
    const target = techEnemies.value[1]
    target.defPenalty += 4
    techniqueTraceLogs.value.unshift(`[标记猎物] 锁定 ${target.name}：defense_penalty += 4，集中火力指引`)
  } else if (tech === 'dazzle') {
    let affected = 0
    techEnemies.value.forEach(e => {
      if (Math.random() < 0.6) {
        e.status = 'confuse'
        affected++
      }
    })
    techniqueTraceLogs.value.unshift(`[舞者迷目] 迷目舞动：${affected} 名敌方陷入混乱状态 (confuse)，自相残杀`)
  } else if (tech === 'quiet_note') {
    let silenced = 0
    techEnemies.value.forEach(e => {
      // 独立 25% 概率
      if (Math.random() < 0.25) {
        e.status = 'silence'
        silenced++
      }
    })
    techniqueTraceLogs.value.unshift(`[诗人静音] 独立 25% 概率结算：${silenced} 名敌方被静默 (silence)，法术封锁`)
  } else if (tech === 'counter') {
    techCasterCounterReady.value = true
    techniqueTraceLogs.value.unshift('[武僧反击] 摆出反击架势 (counter_ready = true)！下一次受击将自动发动徒手回击')
  } else if (tech === 'twin_enspell') {
    techCasterElementBonus.value += 2
    techniqueTraceLogs.value.unshift(`[魔剑附魔] 双重魔力激荡！施法者 element_bonus += 2 (当前总加成: +${techCasterElementBonus.value})`)
  }

  // 审计日志维持最大 8 条
  if (techniqueTraceLogs.value.length > 8) {
    techniqueTraceLogs.value = techniqueTraceLogs.value.slice(0, 8)
  }
}

const resetTechniqueStudio = () => {
  selectedTechniqueId.value = 'steal'
  techCasterCounterReady.value = false
  techCasterElementBonus.value = 0
  techEnemies.value = [
    { name: '绿色粘液怪 (Slime)', status: 'normal', defPenalty: 0, spdPenalty: 0 },
    { name: '哥布林侦察兵 (Goblin)', status: 'normal', defPenalty: 0, spdPenalty: 0 },
    { name: '铁甲巨像 (Iron Giant)', status: 'normal', defPenalty: 0, spdPenalty: 0 }
  ]
  techniqueTraceLogs.value = [
    '重置完成: 职业特技演练台已恢复初始状态',
    '默认设置: 盗贼偷盗 (steal), 敌方小队防御惩罚归零'
  ]
}

// ==========================================
// 🔮 双职业构筑搭配与连锁共鸣工坊
// ==========================================
interface MasterArchetype {
  id: string
  name: string
  icon: string
  summary: string
  rank: 'SSS' | 'SS' | 'S' | 'A'
  rankTag: 'error' | 'warning' | 'info' | 'success'
  primaryJob: string
  secondaryAbility: string
  passiveTrait: string
}

const masterArchetypes: MasterArchetype[] = [
  {
    id: 'flare_dual_wield',
    name: '神速附魔二刀流',
    icon: '⚔️',
    summary: '魔剑士 + 忍者二刀流 + 反击',
    rank: 'SSS',
    rankTag: 'error',
    primaryJob: 'mystic_knight',
    secondaryAbility: 'dual_wield',
    passiveTrait: 'counter'
  },
  {
    id: 'dualcast_bahamut',
    name: '灭世双重召唤',
    icon: '🐉',
    summary: '召唤士 + 连续魔 + 魔力+30%',
    rank: 'SSS',
    rankTag: 'error',
    primaryJob: 'summoner',
    secondaryAbility: 'dualcast',
    passiveTrait: 'mp_boost'
  },
  {
    id: 'rapid_fire_flare',
    name: '乱打破防四连斩',
    icon: '🏹',
    summary: '猎人 + 附魔剑 + 警惕',
    rank: 'SSS',
    rankTag: 'error',
    primaryJob: 'hunter',
    secondaryAbility: 'spellblade',
    passiveTrait: 'alert'
  },
  {
    id: 'dragon_alchemist',
    name: '不灭调合龙骑',
    icon: '🛡️',
    summary: '龙骑士 + 调合神药 + 濒死保护',
    rank: 'SS',
    rankTag: 'warning',
    primaryJob: 'dragoon',
    secondaryAbility: 'mix',
    passiveTrait: 'cover'
  }
]

const selectedArchetypeId = ref('flare_dual_wield')
const synergyPrimaryJobId = ref('mystic_knight')
const synergySecondaryAbilityId = ref('dual_wield')
const synergyPassiveTraitId = ref('counter')
const combatSimResult = ref('等待指令推演...点击右上角【⚡ 一键推演回合输出】即可观测当前构筑在战斗中的实机连锁伤害与行动条回响！')

const primaryJobSelectOptions = computed(() => {
  return jobsList.map(j => ({
    label: `[${j.crystalName}] ${j.name} (${j.role})`,
    value: j.id
  }))
})

const secondaryAbilityOptions = [
  {
    label: '!DualWield (二刀流 - 忍者)',
    value: 'dual_wield',
    desc: '二刀流：允许双手各自持拿一把主战神兵（如两柄王者之剑），普通攻击自动转化为 2 次全力挥砍判定！'
  },
  {
    label: '!Spellblade (魔法剑 - 魔剑士)',
    value: 'spellblade',
    desc: '魔法剑：将核爆耀斑、大火焰、神圣注入冷兵器刀刃，普攻附带 100% 暴击与无视魔抗的法术属性创伤！'
  },
  {
    label: '!RapidFire (乱打四连击 - 猎人)',
    value: 'rapid_fire',
    desc: '乱打：一回合内以神速倾泻 4 次连续穿透打击！完全无视目标的物理防御力，破甲绝杀终极神技！'
  },
  {
    label: '!Dualcast (连续魔 - 赤魔导士)',
    value: 'dualcast',
    desc: '连续魔：单回合内以极速吟唱连续释放两次法术，可双发核爆或双重神圣，将输出窗口利用到极致！'
  },
  {
    label: '!Mix (道具调合 - 药剂师)',
    value: 'mix',
    desc: '道具调合：战场瞬发合成巨人之药（HP上限翻倍）、龙之力量（Lv+20）与死者苏生，战场全能续航神技！'
  },
  {
    label: '!Jump (高空跳跃 - 龙骑士)',
    value: 'jump',
    desc: '高空跳跃：跃入九天云霄彻底规避敌方全屏 AOE 与致死单体，下落时造成高达 2.0x 穿甲贯通物理暴击！'
  },
  {
    label: '!Zeninage (金钱镖 - 侍)',
    value: 'zeninage',
    desc: '金钱镖：抛洒 Gil 铜钱形成以太金属风暴，对敌方全员造成无视物抗的真真实实真实伤害！'
  },
  {
    label: '!Time_L6 (时空魔法 Lv6 - 时魔导士)',
    value: 'time_magic',
    desc: '时空魔法：全体施加神速【广域急速 (Hastega)】并召唤毁天灭地的【陨石风暴 (Meteor)】！'
  },
  {
    label: '!Summon_L5 (神印召唤 Lv5 - 召唤士)',
    value: 'summon',
    desc: '神印召唤：降临龙王巴哈姆特（兆级百万火核）、海神利维坦（巨浪海啸）与斩铁剑奥丁！'
  }
]

const passiveTraitOptions = [
  {
    label: '武僧【防卫反击 (Counter)】',
    value: 'counter',
    desc: '反击：遭受近战敌方物理攻击时，有 50% 概率触发本能重拳反击，造成 1.5x 力量创伤！'
  },
  {
    label: '骑士【誓约守护 (Cover)】',
    value: 'cover',
    desc: '守护：当同伴 HP 处于危险濒死红线时，角色自动瞬移身位替其抵挡所有致死物理伤害！'
  },
  {
    label: '盗贼【敏锐警惕 (Alert)】',
    value: 'alert',
    desc: '警惕：全队感知力暴增，完全杜绝敌方怪物群从背后发动的先制偷袭背刺与惊慌硬直！'
  },
  {
    label: '骑士【双手持剑 (Two-Handed)】',
    value: 'two_handed',
    desc: '双手持剑：放弃盾牌双手紧握单手剑或重斧，攻击力瞬间翻倍，爆发物理压制力拉满！'
  },
  {
    label: '魔人【魔力激荡 (+30% MP)】',
    value: 'mp_boost',
    desc: '魔力激荡：最大 MP 上限提升 30%，施放高阶魔法与神兽召唤时消耗以太大幅减免！'
  },
  {
    label: '武僧【体魄强化 (+30% HP)】',
    value: 'hp_boost',
    desc: '体魄强化：最大 HP 上限提升 30%，血量上限直接飙升，大幅增强高难终极首领容错率！'
  }
]

const selectedPrimaryJobObj = computed(() => {
  return jobsList.find(j => j.id === synergyPrimaryJobId.value) || jobsList[0]
})

const selectedSecondaryAbilityObj = computed(() => {
  return secondaryAbilityOptions.find(o => o.value === synergySecondaryAbilityId.value) || secondaryAbilityOptions[0]
})

const selectedPassiveTraitObj = computed(() => {
  return passiveTraitOptions.find(o => o.value === synergyPassiveTraitId.value) || passiveTraitOptions[0]
})

const synergyCalculation = computed(() => {
  const pJob = synergyPrimaryJobId.value
  const sAbi = synergySecondaryAbilityId.value
  const pTrait = synergyPassiveTraitId.value

  let title = '均衡探索流派'
  let burstMultiplier = 2.0
  let atbBonus = 10
  let survivalTier = 'A 稳健均衡'
  let sustainability = '良好'
  let rank: 'SSS' | 'SS' | 'S' | 'A' = 'A'

  // 1. 经典附魔二刀流
  if ((pJob === 'mystic_knight' && sAbi === 'dual_wield') || (pJob === 'ninja' && sAbi === 'spellblade')) {
    title = '双星破界·附魔二刀流剑圣'
    burstMultiplier = 8.5
    atbBonus = 30
    survivalTier = 'S 极速先制'
    sustainability = '高 (物理无耗)'
    rank = 'SSS'
  }
  // 2. 乱打四连击
  else if (sAbi === 'rapid_fire') {
    title = '瞬影千裂·无视防御四连击'
    burstMultiplier = pTrait === 'two_handed' ? 9.6 : 7.2
    atbBonus = 25
    survivalTier = 'S 破甲特化'
    sustainability = '极高'
    rank = 'SSS'
  }
  // 3. 连续魔召唤
  else if (sAbi === 'dualcast' && (pJob === 'summoner' || pJob === 'magus')) {
    title = '灭世星宿·连续以太法皇'
    burstMultiplier = 10.0
    atbBonus = 15
    survivalTier = 'A+ 远程歼灭'
    sustainability = '爆发速杀 (依赖以太补给)'
    rank = 'SSS'
  }
  // 4. 调合生存
  else if (sAbi === 'mix') {
    title = '不灭长生·炼金战术先驱'
    burstMultiplier = 4.2
    atbBonus = 20
    survivalTier = 'EX 绝对不死'
    sustainability = '无限 (药理自洽)'
    rank = 'SS'
  }
  // 5. 金钱镖速通
  else if (sAbi === 'zeninage') {
    title = '千金断狱·破甲金钱镖'
    burstMultiplier = 6.0
    atbBonus = 20
    survivalTier = 'S 真实创伤'
    sustainability = '受限于金币储备'
    rank = 'SS'
  } else {
    burstMultiplier = 3.5
    atbBonus = 15
    rank = 'S'
  }

  return {
    title,
    burstMultiplier: burstMultiplier.toFixed(1),
    atbBonus,
    survivalTier,
    sustainability,
    rank
  }
})

const applyArchetype = (arch: MasterArchetype) => {
  selectedArchetypeId.value = arch.id
  synergyPrimaryJobId.value = arch.primaryJob
  synergySecondaryAbilityId.value = arch.secondaryAbility
  synergyPassiveTraitId.value = arch.passiveTrait
  simulateCombatRound()
}

const resetSynergyBuild = () => {
  applyArchetype(masterArchetypes[0])
}

const simulateCombatRound = () => {
  const pName = selectedPrimaryJobObj.value.name
  const sName = selectedSecondaryAbilityObj.value.label.split(' ')[0]
  const pTrait = selectedPassiveTraitObj.value.label.split('【')[0]
  const mult = synergyCalculation.value.burstMultiplier

  combatSimResult.value = `[战斗推演] 角色以【${pName}】姿态就任进入战场！行动条获得 +${synergyCalculation.value.atbBonus}% 极速充能！起手触发【${sName}】，搭配【${pTrait}】被动共鸣，成功打出 ${mult}x 峰值爆发！造成 99999 破限暴击，判定为 ${synergyCalculation.value.rank} 级巅峰战术斩杀！`
}

// ==================== 视图 4: 自由人极意被动继承与ABP挂机推演沙盘 ====================
let message: any = null
try {
  message = useMessage()
} catch (e) {
  message = null
}

const activeJobGodotTab = ref<'job_system' | 'freelancer_passive'>('freelancer_passive')

interface MasterHero {
  id: string
  name: string
  title: string
  baseStats: { str: number; agi: number; sta: number; mag: number }
  description: string
  avatar: string
}

const masterHeroes: MasterHero[] = [
  { id: 'bartz', name: '巴兹 (Bartz)', title: '风之探求者', baseStats: { str: 28, agi: 25, sta: 27, mag: 25 }, description: '均衡物理与近战敏捷，水晶神殿首任契约者', avatar: '⚔️' },
  { id: 'lenna', name: '蕾娜 (Lenna)', title: '水之慈悲者', baseStats: { str: 25, agi: 26, sta: 25, mag: 28 }, description: '高灵性魔力专精，泰空王国第一王女', avatar: '💧' },
  { id: 'galuf', name: '加拉夫 (Galuf)', title: '土之刚毅者', baseStats: { str: 29, agi: 23, sta: 28, mag: 24 }, description: '重甲钢铁身躯与狂战士之怒，异界古老王者', avatar: '🛡️' },
  { id: 'faris', name: '法利斯 (Faris)', title: '火之决意者', baseStats: { str: 27, agi: 27, sta: 26, mag: 26 }, description: '海盗头领，极高灵巧身法与暴击嗅觉', avatar: '🏴‍☠️' },
  { id: 'krile', name: '可露儿 (Krile)', title: '星之继承者', baseStats: { str: 25, agi: 28, sta: 24, mag: 28 }, description: '极速行动条与召唤兽低语，传承祖父意志', avatar: '✨' }
]

const selectedMasterHeroId = ref('bartz')
const selectedMasterBaseClass = ref<'freelancer' | 'mime'>('freelancer')

const currentMasterHero = computed(() => {
  return masterHeroes.find(h => h.id === selectedMasterHeroId.value) || masterHeroes[0]
})

interface RegistryMasterJob {
  id: string
  name: string
  icon: string
  role: string
  abpCost: number
  statBonus: { str: number; agi: number; sta: number; mag: number }
  passiveName: string
  passiveDesc: string
  category: 'physical' | 'magical' | 'hybrid' | 'utility'
}

const registryMasterJobs: RegistryMasterJob[] = [
  { id: 'monk', name: '武僧 (Monk)', icon: '👊', role: '近战破甲', abpCost: 700, statBonus: { str: 26, agi: 1, sta: 26, mag: 0 }, passiveName: '格斗/反击', passiveDesc: '空手高倍率物理搏击，受到物攻时 50% 概率触发即时反击', category: 'physical' },
  { id: 'thief', name: '盗贼 (Thief)', icon: '🗡️', role: '高速刺杀', abpCost: 630, statBonus: { str: 1, agi: 16, sta: 2, mag: 0 }, passiveName: '警戒/抢先/冲刺', passiveDesc: '彻底免疫任何背刺突袭，进战行动条满格，城镇迷宫移速翻倍', category: 'utility' },
  { id: 'ninja', name: '忍者 (Ninja)', icon: '🥷', role: '双刀连闪', abpCost: 690, statBonus: { str: 15, agi: 14, sta: 3, mag: 0 }, passiveName: '二刀流 (Dual Wield)', passiveDesc: '允许双手各装备一把独立武器，普攻与物理战技双倍连发', category: 'physical' },
  { id: 'samurai', name: '武士 (Samurai)', icon: '⛩️', role: '心眼见切', abpCost: 820, statBonus: { str: 19, agi: 2, sta: 19, mag: 0 }, passiveName: '白刃抓箭 (Shirahadori)', passiveDesc: '以 75% 绝对概率徒手格挡/回避敌方直接物理攻击与暗箭', category: 'physical' },
  { id: 'ranger', name: '游侠 (Ranger)', icon: '🏹', role: '穿甲连射', abpCost: 600, statBonus: { str: 16, agi: 12, sta: 1, mag: 0 }, passiveName: '乱打 (Rapid Fire)', passiveDesc: '无视防御四连击，配合魔法剑与二刀流可爆发八连击', category: 'physical' },
  { id: 'knight', name: '骑士 (Knight)', icon: '🛡️', role: '铁壁援护', abpCost: 690, statBonus: { str: 23, agi: 1, sta: 20, mag: 0 }, passiveName: '双手持剑/格挡掩护', passiveDesc: '濒死队友强制承受替身格挡，单手剑双倍攻击力加成', category: 'physical' },
  { id: 'summoner', name: '召唤士 (Summoner)', icon: '🔮', role: '神灵契约', abpCost: 750, statBonus: { str: 0, agi: 0, sta: 0, mag: 33 }, passiveName: '召唤Lv5/MP缩减', passiveDesc: '大幅提升最高精神魔力阈值，巴哈姆特与奥丁全额伤害增幅', category: 'magical' },
  { id: 'timemage', name: '时魔道士 (Time Mage)', icon: '⏳', role: '时空操纵', abpCost: 530, statBonus: { str: 0, agi: 2, sta: 0, mag: 24 }, passiveName: '连续魔 (Dualcast)', passiveDesc: '单回合内可连续咏唱两次任意阶层黑/白/时空魔法', category: 'magical' },
  { id: 'mystic', name: '魔法剑士 (Mystic Knight)', icon: '⚡', role: '属性附魔', abpCost: 680, statBonus: { str: 14, agi: 1, sta: 14, mag: 14 }, passiveName: '魔法剑刃附魔', passiveDesc: '将神圣/火/冰/雷/即死/核爆元素灌注于刀刃造成弱点弱化', category: 'hybrid' },
  { id: 'chemist', name: '药剂师 (Chemist)', icon: '🧪', role: '炼金调合', abpCost: 630, statBonus: { str: 2, agi: 3, sta: 18, mag: 0 }, passiveName: '药理知识/调合大师', passiveDesc: '恢复类药品治疗量与复活量翻倍(200%)，解锁神圣调合', category: 'utility' },
  { id: 'bluemage', name: '青魔道士 (Blue Mage)', icon: '🧿', role: '魔兽拟态', abpCost: 350, statBonus: { str: 1, agi: 1, sta: 1, mag: 21 }, passiveName: '青魔法学习 (Learning)', passiveDesc: '受到敌方稀有魔兽特技命中时，战后无损习得该青魔法', category: 'hybrid' },
  { id: 'blackmage', name: '黑魔道士 (Black Mage)', icon: '🔥', role: '湮灭天火', abpCost: 730, statBonus: { str: 0, agi: 0, sta: 0, mag: 31 }, passiveName: '黑魔法Lv6/核爆共振', passiveDesc: '注入超凡黑魔导极意，提升群体爆裂与元素穿透', category: 'magical' }
]

const selectedMasteredJobIds = ref<string[]>(['monk', 'ninja', 'thief', 'samurai', 'timemage', 'ranger'])

const toggleJobMastery = (id: string) => {
  const idx = selectedMasteredJobIds.value.indexOf(id)
  if (idx >= 0) {
    selectedMasteredJobIds.value.splice(idx, 1)
  } else {
    selectedMasteredJobIds.value.push(id)
  }
}

const applyMasteryPreset = (presetKey: 'all' | 'phys' | 'mag' | 'stealth' | 'clear') => {
  if (presetKey === 'all') {
    selectedMasteredJobIds.value = registryMasterJobs.map(j => j.id)
  } else if (presetKey === 'phys') {
    selectedMasteredJobIds.value = ['monk', 'ninja', 'samurai', 'ranger', 'knight']
  } else if (presetKey === 'mag') {
    selectedMasteredJobIds.value = ['summoner', 'timemage', 'blackmage', 'chemist']
  } else if (presetKey === 'stealth') {
    selectedMasteredJobIds.value = ['thief', 'ninja', 'ranger', 'bluemage']
  } else {
    selectedMasteredJobIds.value = []
  }
}

const highestInheritedStats = computed(() => {
  const chosenJobs = registryMasterJobs.filter(j => selectedMasteredJobIds.value.includes(j.id))

  let maxStr = 0
  let strSource = '本职初始'
  let maxAgi = 0
  let agiSource = '本职初始'
  let maxSta = 0
  let staSource = '本职初始'
  let maxMag = 0
  let magSource = '本职初始'

  chosenJobs.forEach(j => {
    if (j.statBonus.str > maxStr) {
      maxStr = j.statBonus.str
      strSource = j.name
    }
    if (j.statBonus.agi > maxAgi) {
      maxAgi = j.statBonus.agi
      agiSource = j.name
    }
    if (j.statBonus.sta > maxSta) {
      maxSta = j.statBonus.sta
      staSource = j.name
    }
    if (j.statBonus.mag > maxMag) {
      maxMag = j.statBonus.mag
      magSource = j.name
    }
  })

  return {
    str: { bonus: maxStr, source: strSource },
    agi: { bonus: maxAgi, source: agiSource },
    sta: { bonus: maxSta, source: staSource },
    mag: { bonus: maxMag, source: magSource }
  }
})

const finalMasteryStats = computed(() => {
  const hero = currentMasterHero.value
  return {
    str: hero.baseStats.str + highestInheritedStats.value.str.bonus,
    agi: hero.baseStats.agi + highestInheritedStats.value.agi.bonus,
    sta: hero.baseStats.sta + highestInheritedStats.value.sta.bonus,
    mag: hero.baseStats.mag + highestInheritedStats.value.mag.bonus
  }
})

const activeInheritedPassives = computed(() => {
  const chosenJobs = registryMasterJobs.filter(j => selectedMasteredJobIds.value.includes(j.id))
  return chosenJobs.map(j => ({
    name: j.passiveName,
    desc: j.passiveDesc,
    job: j.name
  }))
})

const masteryCombatPower = computed(() => {
  const s = finalMasteryStats.value
  const pCount = activeInheritedPassives.value.length
  const baseClassMult = selectedMasterBaseClass.value === 'freelancer' ? 1.25 : 1.2
  const rawScore = Math.floor((s.str * 140 + s.agi * 180 + s.sta * 120 + s.mag * 160 + pCount * 1250) * baseClassMult)

  let rank = 'A · 宿命勇者'
  let rankColor = 'text-blue-400'
  if (rawScore >= 38000) {
    rank = 'SSS · 太古破限宗师'
    rankColor = 'text-amber-300 font-extrabold'
  } else if (rawScore >= 28000) {
    rank = 'SS · 次元漫游者'
    rankColor = 'text-purple-300 font-bold'
  } else if (rawScore >= 20000) {
    rank = 'S · 水晶英杰'
    rankColor = 'text-cyan-300 font-bold'
  }

  return { score: rawScore, rank, rankColor }
})

const remainingAbpToMaster = computed(() => {
  const unmastered = registryMasterJobs.filter(j => !selectedMasteredJobIds.value.includes(j.id))
  return unmastered.reduce((acc, cur) => acc + cur.abpCost, 0)
})

interface FarmSpot {
  id: string
  name: string
  location: string
  stars: number
  abpMin: number
  abpMax: number
  battleSec: number
  gilAverage: number
  specialStrategy: string
}

const farmSpots: FarmSpot[] = [
  {
    id: 'cairn',
    name: '卡纳克外地穴',
    location: '卡纳克城南地底洞窟',
    stars: 2,
    abpMin: 3,
    abpMax: 5,
    battleSec: 12,
    gilAverage: 350,
    specialStrategy: '野蛮人牛头怪群体出没，骑士双手持剑一刀横扫破敌'
  },
  {
    id: 'sunken',
    name: '沉没沃鲁斯塔',
    location: '沉入深海的海底封印塔',
    stars: 3,
    abpMin: 180,
    abpMax: 198,
    battleSec: 35,
    gilAverage: 4200,
    specialStrategy: '水银软泥怪极意出没，时空魔道士连续魔雷轰或药剂师调合瞬间融化'
  },
  {
    id: 'void_fall',
    name: '次元裂隙·瀑布',
    location: '裂隙地狱回廊第三阶',
    stars: 4,
    abpMin: 8,
    abpMax: 12,
    battleSec: 18,
    gilAverage: 2800,
    specialStrategy: '红龙与水晶龙群聚，游侠二刀流乱打配合白刃抓箭极速刷怪'
  },
  {
    id: 'void_sanctuary',
    name: '最终虚无圣殿',
    location: '次元裂隙·王座之前',
    stars: 5,
    abpMin: 20,
    abpMax: 30,
    battleSec: 25,
    gilAverage: 5600,
    specialStrategy: '铁巨人与石化鸟高压战局，白刃抓箭75%回避物理狂暴横扫'
  }
]

const selectedFarmSpotId = ref('sunken')
const selectedBoosterIds = ref<string[]>(['gold_hairpin', 'thief_armlet'])
const farmDurationMinutes = ref(60)

const farmBoosters = [
  { id: 'gold_hairpin', name: '🪙 黄金发饰', desc: 'MP消耗-50%，战斗耗时缩减20%' },
  { id: 'thief_armlet', name: '🧤 盗贼护腕', desc: '偷盗掉落率翻倍，ABP结算+15%' },
  { id: 'rich_ring', name: '💍 富豪手镯', desc: '战斗掉落金币 Gil +100%' },
  { id: 'sage_contract', name: '📜 贤者契约', desc: '神圣学者秘录，ABP结算额外+50%' }
]

const currentFarmSpot = computed(() => {
  return farmSpots.find(s => s.id === selectedFarmSpotId.value) || farmSpots[1]
})

const farmSimulationResult = computed(() => {
  const spot = currentFarmSpot.value
  let speedMultiplier = 1.0
  let abpMultiplier = 1.0
  let gilMultiplier = 1.0

  if (selectedBoosterIds.value.includes('gold_hairpin')) speedMultiplier *= 0.8
  if (selectedBoosterIds.value.includes('thief_armlet')) abpMultiplier += 0.15
  if (selectedBoosterIds.value.includes('rich_ring')) gilMultiplier += 1.0
  if (selectedBoosterIds.value.includes('sage_contract')) abpMultiplier += 0.5

  const actualSecPerBattle = Math.max(5, spot.battleSec * speedMultiplier)
  const totalSeconds = farmDurationMinutes.value * 60
  const totalBattles = Math.floor(totalSeconds / actualSecPerBattle)

  const avgAbpPerBattle = ((spot.abpMin + spot.abpMax) / 2) * abpMultiplier
  const totalAbpGained = Math.floor(totalBattles * avgAbpPerBattle)
  const totalGilGained = Math.floor(totalBattles * spot.gilAverage * gilMultiplier)
  const abpPerHour = Math.floor((totalAbpGained / farmDurationMinutes.value) * 60)

  return {
    actualSecPerBattle,
    totalBattles,
    totalAbpGained,
    totalGilGained,
    abpPerHour
  }
})

const exportJobMasteryCert = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  const hero = currentMasterHero.value
  const stats = finalMasteryStats.value
  const highest = highestInheritedStats.value
  const baseClass = selectedMasterBaseClass.value === 'freelancer' ? '自由人 (Freelancer)' : '模仿士 (Mime)'
  const passivesText = activeInheritedPassives.value.map(p => `  * 【${p.name}】(${p.job}): ${p.desc}`).join('\n') || '  * 无'
  const sim = farmSimulationResult.value
  const spot = currentFarmSpot.value

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   自由人极意职业精通认证与ABP挂机推演方案书 (v2.2.249)
================================================================================
颁发时间: ${timeStr}
契约英雄: ${hero.name} · 【${hero.title}】
基底姿态: ${baseClass}
精通职业总计: ${selectedMasteredJobIds.value.length} / ${registryMasterJobs.length} 门核心职业

【极意四维峰值继承数据】
- 最终力量 (STR): ${stats.str} (基础 ${hero.baseStats.str} + 继承峰值 +${highest.str.bonus} 来自: ${highest.str.source})
- 最终敏捷 (AGI): ${stats.agi} (基础 ${hero.baseStats.agi} + 继承峰值 +${highest.agi.bonus} 来自: ${highest.agi.source})
- 最终体力 (STA): ${stats.sta} (基础 ${hero.baseStats.sta} + 继承峰值 +${highest.sta.bonus} 来自: ${highest.sta.source})
- 最终魔力 (MAG): ${stats.mag} (基础 ${hero.baseStats.mag} + 继承峰值 +${highest.mag.bonus} 来自: ${highest.mag.source})
- 综合实战威能指数: ${masteryCombatPower.value.score.toLocaleString()} PTS (${masteryCombatPower.value.rank})

【已激活常驻继承被动特权】
${passivesText}

【挂机练级收益推演方案】
- 挂机刷点: ${spot.name} (${spot.location})
- 战术要诀: ${spot.specialStrategy}
- 推演时长: ${farmDurationMinutes.value} 分钟
- 预估战斗总场次: ${sim.totalBattles} 场 (每场约 ${sim.actualSecPerBattle.toFixed(1)} 秒)
- 累计预计获取 ABP: +${sim.totalAbpGained.toLocaleString()} (${sim.abpPerHour.toLocaleString()} ABP/小时)
- 累计预计金币收获: +${sim.totalGilGained.toLocaleString()} Gil
- 距离全职业大满贯所需 ABP: ${remainingAbpToMaster.value.toLocaleString()} ABP

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS / GDScript RefCounted
- Core Resolvers: job_system.gd & freelancer_passive_resolver.gd
- Digital Fingerprint: SHA256-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}
================================================================================`

  // 复制到剪贴板
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  // 触发文件下载
  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `job_mastery_cert_v2.2.249_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('自由人极意职业精通认证已导出并同步至剪贴板！')
  }
}

// ================= 视图 5: 全职业进阶转生与太古奥义传承工坊 =================
interface TranscendenceHero {
  id: string
  name: string
  avatar: string
  element: string
  title: string
  defaultJob: string
}

const transcendenceHeroesList: TranscendenceHero[] = [
  { id: 'bartz', name: '巴兹', avatar: '⚔️', element: '风之晶原核', title: '风之光辉先锋', defaultJob: 'paladin_arbiter' },
  { id: 'lenna', name: '蕾娜', avatar: '🕊️', element: '水之慈爱核', title: '水之圣洁祭司', defaultJob: 'genesis_sage' },
  { id: 'faris', name: '法利斯', avatar: '🏴‍☠️', element: '火之勇气核', title: '火之修罗剑魁', defaultJob: 'asura_saint' },
  { id: 'krile', name: '可露儿', avatar: '✨', element: '土之守护核', title: '土之创生天尊', defaultJob: 'chrono_overseer' }
]

const selectedTranscendenceHeroId = ref('bartz')
const selectedHeroTranscendence = computed(() => {
  return transcendenceHeroesList.find(h => h.id === selectedTranscendenceHeroId.value) || transcendenceHeroesList[0]
})

const selectTranscendenceHero = (id: string) => {
  selectedTranscendenceHeroId.value = id
  const hero = transcendenceHeroesList.find(h => h.id === id)
  if (hero) {
    selectedTranscendenceJobId.value = hero.defaultJob
  }
}

interface TranscendenceJobDef {
  id: string
  name: string
  icon: string
  role: string
  category: string
  description: string
  secretArtName: string
  secretArtDesc: string
  baseDamage: number
}

const transcendenceJobsList: TranscendenceJobDef[] = [
  {
    id: 'paladin_arbiter',
    name: '圣殿裁决者 (Paladin Arbiter)',
    icon: '🛡️',
    role: '圣骑士 / 破限守护者',
    category: '崇高圣光极意',
    description: '融合骑士百炼防御与光辉神圣战技，以圣剑之光照耀全域同伴。',
    secretArtName: '天界圣剑绝鸣 (Celestial Excalibur Strike)',
    secretArtDesc: '造成 99,999 点绝对神圣穿甲真伤，附加全队 3 回合无敌与全异常状态净化。',
    baseDamage: 99999
  },
  {
    id: 'genesis_sage',
    name: '创世大贤者 (Genesis Sage)',
    icon: '🔮',
    role: '全系大魔导 / 虚空创生',
    category: '远古元素极意',
    description: '融汇黑白时召四大魔法体系，驱动创世星辰以太奇点。',
    secretArtName: '创世星辰坍缩 (Genesis Star Collapse)',
    secretArtDesc: '造成 99,999 点四元素湮灭核爆，敌方 MP 彻底清零，我方全队 MP 瞬间恢复至 999 满额。',
    baseDamage: 99999
  },
  {
    id: 'asura_saint',
    name: '修罗影剑圣 (Asura Sword Saint)',
    icon: '🗡️',
    role: '双刀修罗 / 影宗秘忍',
    category: '幽冥居合极意',
    description: '双持佐助与正宗极限居合，刀气纵横十六重次元空间。',
    secretArtName: '修罗十六夜连斩 (Sixteen Night Slashes)',
    secretArtDesc: '连续发动 16 段绝对暴击斩击，每段 8,500 点真实穿甲伤害，总伤害突破 136,000 点！',
    baseDamage: 136000
  },
  {
    id: 'chrono_overseer',
    name: '时空创生天尊 (Chrono Overseer)',
    icon: '⏳',
    role: '因果律主宰 / 奇迹炼金',
    category: '因果律操纵极意',
    description: '超脱凡尘因果轮回，自由人与模仿士至高转生终极形态。',
    secretArtName: '时空重置之律 (Law of Chrono Reset)',
    secretArtDesc: '全阵亡队友 100% 满血满法超频复活，全场施加加速，冻结敌方行动条 2 回合。',
    baseDamage: 88888
  }
]

const selectedTranscendenceJobId = ref('paladin_arbiter')
const currentTranscendenceJob = computed(() => {
  return transcendenceJobsList.find(j => j.id === selectedTranscendenceJobId.value) || transcendenceJobsList[0]
})

// 四阶以太转生树节点
interface TranscendenceNodeDef {
  id: string
  tierName: string
  name: string
  icon: string
  cost: number
  effectDesc: string
  unlocked: boolean
}

const transcendenceNodes = ref<TranscendenceNodeDef[]>([
  {
    id: 'tier1',
    tierName: '一阶 · 灵魂洗礼',
    name: '以太本源同调',
    icon: '💧',
    cost: 50,
    effectDesc: '与四大水晶源石产生灵魂共振，四维全属性 (力量/敏捷/体力/魔力) 永久 +25 点。',
    unlocked: true
  },
  {
    id: 'tier2',
    tierName: '二阶 · 特权贯通',
    name: '职业极意双倍化',
    icon: '⚡',
    cost: 120,
    effectDesc: '原生职业固有特权与被动效果提升 100%，装备专精无惩罚贯通。',
    unlocked: true
  },
  {
    id: 'tier3',
    tierName: '三阶 · 限界突破',
    name: '九万九千破限契印',
    icon: '🔥',
    cost: 250,
    effectDesc: '解除原初系统 9,999 伤害与生命上限封印，单发伤害上限扩展至 99,999，HP 上限 +10,000。',
    unlocked: true
  },
  {
    id: 'tier4',
    tierName: '四阶 · 太古奥义',
    name: '诸神法则真髓觉醒',
    icon: '👑',
    cost: 500,
    effectDesc: '彻底觉醒所属转生流派的太古终极奥义，战斗中积攒怒气即可一键引爆灭绝神技。',
    unlocked: true
  }
])

const isNodeUnlocked = (nodeId: string): boolean => {
  const node = transcendenceNodes.value.find(n => n.id === nodeId)
  return node ? node.unlocked : false
}

const toggleNode = (nodeId: string) => {
  const node = transcendenceNodes.value.find(n => n.id === nodeId)
  if (node) {
    node.unlocked = !node.unlocked
  }
}

const resetTranscendenceTree = () => {
  transcendenceNodes.value.forEach((n, idx) => {
    n.unlocked = idx === 0
  })
  message.info('以太转生树节点已重置至一阶')
}

const maxAllTranscendenceNodes = () => {
  transcendenceNodes.value.forEach(n => {
    n.unlocked = true
  })
  message.success('⚡ 四阶以太转生树已全域点亮！太古奥义与 99,999 破限全面就绪！')
}

const unlockedNodesCount = computed(() => {
  return transcendenceNodes.value.filter(n => n.unlocked).length
})

const totalAetherCost = computed(() => {
  return transcendenceNodes.value
    .filter(n => n.unlocked)
    .reduce((sum, n) => sum + n.cost, 0)
})

const transcendenceTierSummary = computed(() => {
  switch (unlockedNodesCount.value) {
    case 4:
      return 'IV 阶 · 极境超越尊者 (Transcendence)'
    case 3:
      return 'III 阶 · 破限圣灵 (Limit Break)'
    case 2:
      return 'II 阶 · 极意传承者 (Adept)'
    default:
      return 'I 阶 · 水晶觉醒者 (Initiate)'
  }
})

// 演练靶场首领
interface DummyTargetDef {
  id: string
  name: string
  icon: string
  hp: number
  def: number
}

const transcendenceTargetsList: DummyTargetDef[] = [
  { id: 'void_horde', name: '虚空狂魔军团 (Void Horde Fiends)', icon: '👾', hp: 45000, def: 50 },
  { id: 'shinryu', name: '太古神龙 (Ancient Shinryu)', icon: '🐉', hp: 55000, def: 85 },
  { id: 'omega', name: '次元巨神欧米茄 (Dimensional Omega)', icon: '🤖', hp: 55000, def: 220 }
]

const selectedTranscendenceTargetId = ref('shinryu')
const currentTranscendenceTarget = computed(() => {
  return transcendenceTargetsList.find(t => t.id === selectedTranscendenceTargetId.value) || transcendenceTargetsList[0]
})

const secretArtBurstDamage = computed(() => {
  const isBreakLimit = isNodeUnlocked('tier3')
  const isSecretAwakened = isNodeUnlocked('tier4')
  if (!isSecretAwakened) return 9999
  const base = currentTranscendenceJob.value.baseDamage
  return isBreakLimit ? base : Math.min(9999, base)
})

const secretArtOverkillText = computed(() => {
  const target = currentTranscendenceTarget.value
  const dmg = secretArtBurstDamage.value
  if (dmg >= target.hp) {
    const overkillPct = Math.round(((dmg - target.hp) / target.hp) * 100)
    return `溢出斩杀率: +${overkillPct}% (一击瞬杀灭绝！)`
  }
  const remain = target.hp - dmg
  return `首领残余 HP: ${remain.toLocaleString()}`
})

const simulationRatingText = computed(() => {
  if (unlockedNodesCount.value === 4) return 'EX 诸神极境'
  if (unlockedNodesCount.value === 3) return 'SSS 破限真髓'
  return 'S 水晶试炼'
})

const simulationRatingTagType = computed(() => {
  if (unlockedNodesCount.value === 4) return 'error'
  if (unlockedNodesCount.value === 3) return 'warning'
  return 'info'
})

const secretArtLogs = ref<string[]>([
  '【系统】太古奥义传承工坊待机中，已锁定靶场目标：太古神龙。',
  '【提示】四阶以太转生树点亮后可引爆 99,999 破限奥义！'
])

const triggerSecretArtExecution = () => {
  const hero = selectedHeroTranscendence.value
  const job = currentTranscendenceJob.value
  const target = currentTranscendenceTarget.value
  const dmg = secretArtBurstDamage.value

  secretArtLogs.value.unshift(
    `⚡【奥义释放】${hero.name} 进阶【${job.name}】引爆太古奥义【${job.secretArtName}】！`,
    `💥【伤害轰击】对 ${target.name} 造成 ${dmg.toLocaleString()} 点灭绝真伤！`,
    `🏆【斩杀判定】${target.name} 遭 ${job.secretArtDesc}`
  )
  message.success(`💥 太古奥义【${job.secretArtName}】轰然引爆！造成 ${dmg.toLocaleString()} 绝对真伤！`)
}

// 导出凭证
const exportTranscendenceCertificate = () => {
  const timestamp = new Date().toISOString()
  const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase()
  const fakeSha256 = `SHA256-${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`

  const certLines = [
    '========================================================================',
    '       《光之战士：时空裂隙》全职业进阶转生与太古奥义传承方案书',
    '             OFFICIAL JOB TRANSCENDENCE & SECRET ARTS REPORT',
    '========================================================================',
    `方案唯一档案号: AGY-TRANSCENDENCE-20261028-${randomHex}`,
    `安全防伪签名: ${fakeSha256}`,
    `签发世界线时间: ${timestamp}`,
    `官方规范基准: VBLE Job Mastery & Secret Arts Matrix v2.2.263`,
    `转生位阶评定: ${transcendenceTierSummary.value}`,
    '',
    '------------------------------------------------------------------------',
    '【一、英雄本源与进阶转生流派】',
    '------------------------------------------------------------------------',
    `转生领誓英雄: ${selectedHeroTranscendence.value.name} (${selectedHeroTranscendence.value.title})`,
    `水晶共鸣原核: ${selectedHeroTranscendence.value.element}`,
    `进阶转生职业: ${currentTranscendenceJob.value.name} [${currentTranscendenceJob.value.category}]`,
    `战术定位范式: ${currentTranscendenceJob.value.role}`,
    `觉醒太古奥义: ${currentTranscendenceJob.value.secretArtName}`,
    `奥义神技威能: ${currentTranscendenceJob.value.secretArtDesc}`,
    '',
    '------------------------------------------------------------------------',
    '【二、四阶以太转生树点亮明细】',
    '------------------------------------------------------------------------',
    `已点亮节点数: ${unlockedNodesCount.value} / 4 节点`,
    `累计消耗以太碎片: ${totalAetherCost.value} 碎片`,
    ...transcendenceNodes.value.map(n => `  • [${n.unlocked ? '已觉醒' : '封印中'}] ${n.tierName} (${n.name}) - ${n.effectDesc}`),
    '',
    '------------------------------------------------------------------------',
    '【三、实战对战与奥义斩杀参数】',
    '------------------------------------------------------------------------',
    `靶场对战目标: ${currentTranscendenceTarget.value.name} (HP: ${currentTranscendenceTarget.value.hp.toLocaleString()})`,
    `单轮期望爆发真伤: ${secretArtBurstDamage.value.toLocaleString()} 绝对真伤`,
    `伤害上限状态: ${isNodeUnlocked('tier3') ? '99,999 破限 (已解除)' : '9,999 锁定'}`,
    `斩杀战果结论: ${secretArtOverkillText.value}`,
    '',
    '------------------------------------------------------------------------',
    '【四、太古诸神祭司传承箴言】',
    '------------------------------------------------------------------------',
    '“职业无尊卑，转生达造极。当四大水晶之光化为以太本源，',
    ' 凡人之躯亦可引动创世星辰，执掌时空因果之律！”',
    '========================================================================'
  ]

  const blob = new Blob([certLines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `job_transcendence_v2.2.263_${Date.now()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  message.success('📜 进阶转生与太古奥义方案书已成功导出并下载！')
}

// Godot 4.6 LTS 代码展台
const copiedTransCode = ref(false)
const godotTransCodeText = [
  '## job_transcendence_resolver.gd',
  '## 《光之战士：时空裂隙》全职业进阶转生与太古奥义破限结算引擎',
  '## 官方引擎规范: VBLE Job Mastery & Secret Arts Matrix v2.2.263',
  'extends RefCounted',
  'class_name JobTranscendenceResolver',
  '',
  'signal node_unlocked(hero_id: String, tier: int, node_name: String)',
  'signal secret_art_unleashed(hero_id: String, job_id: String, damage: int, effect: String)',
  '',
  'const TRANSCENDENCE_DATA = {',
  '	"paladin_arbiter": { "name": "圣殿裁决者", "base_dmg": 99999, "art": "天界圣剑绝鸣" },',
  '	"genesis_sage": { "name": "创世大贤者", "base_dmg": 99999, "art": "创世星辰坍缩" },',
  '	"asura_saint": { "name": "修罗影剑圣", "base_dmg": 136000, "art": "修罗十六夜连斩" },',
  '	"chrono_overseer": { "name": "时空创生天尊", "base_dmg": 88888, "art": "时空重置之律" }',
  '}',
  '',
  'static func resolve_transcendence_stats(base_stats: Dictionary, unlocked_tiers: Array[int]) -> Dictionary:',
  '	var stats := base_stats.duplicate()',
  '	if unlocked_tiers.has(1):',
  '		stats["str"] = stats.get("str", 20) + 25',
  '		stats["agi"] = stats.get("agi", 20) + 25',
  '		stats["sta"] = stats.get("sta", 20) + 25',
  '		stats["mag"] = stats.get("mag", 20) + 25',
  '	if unlocked_tiers.has(3):',
  '		stats["damage_limit"] = 99999',
  '		stats["max_hp"] = stats.get("max_hp", 9999) + 10000',
  '	else:',
  '		stats["damage_limit"] = 9999',
  '	return stats',
  '',
  'static func execute_secret_art(job_id: String, is_break_limit: bool, target_hp: int) -> Dictionary:',
  '	var job_data = TRANSCENDENCE_DATA.get(job_id, { "name": "未知流派", "base_dmg": 9999, "art": "破空斩" })',
  '	var raw_dmg: int = int(job_data.base_dmg)',
  '	var final_dmg: int = raw_dmg if is_break_limit else mini(9999, raw_dmg)',
  '	var is_dead := final_dmg >= target_hp',
  '	return {',
  '		"job_name": job_data.name,',
  '		"art_name": job_data.art,',
  '		"damage": final_dmg,',
  '		"killed": is_dead,',
  '		"overkill": maxi(0, final_dmg - target_hp)',
  '	}'
].join('\n')

const copyTranscendenceCode = async () => {
  try {
    await navigator.clipboard.writeText(godotTransCodeText)
    copiedTransCode.value = true
    message.success('job_transcendence_resolver.gd 源码已复制到剪贴板！')
    setTimeout(() => {
      copiedTransCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}

// ==========================================
// 视图 6: 太古职业潜能觉醒与极限命座星图工坊 (Job Hyper-Mastery & Constellation Studio)
// ==========================================
const hyperConstellations = [
  {
    id: 'holy_blade',
    name: '圣剑神圣守卫命座',
    tag: '全域减伤 45%',
    icon: '🛡️',
    desc: '融合圣骑士与光明水晶星辉，受击自动触发神圣庇护光环，减免45%物理与魔法伤害，并反震真实伤害。',
    secretArt: '极超·神圣审判之盾',
    gradient: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'archmage',
    name: '秘术大魔导命座',
    tag: '黑白双相 -50% MP',
    icon: '🔮',
    desc: '编织星界奇点魔力织网，全属性黑白魔法消耗减少50%，四相连续魔击发时产生共振爆裂反应。',
    secretArt: '极超·创世以太爆轰',
    gradient: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'shadow_blade',
    name: '幽影暗杀猎手命座',
    tag: '暴击 100% 极速',
    icon: '🗡️',
    desc: '隐遁于时空视界边缘，每次物理刺击必达成绝对破甲暴击，偷窃必定夺取怪物携带的绝品神兵材料。',
    secretArt: '极超·瞬影幻灭千刃',
    gradient: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(15,23,42,0) 70%)'
  },
  {
    id: 'mystic_sage',
    name: '贤者天体共鸣命座',
    tag: '全体复活 1R 绝对无敌',
    icon: '🌟',
    desc: '沟通太古双月天体核心，战死成员瞬间无损全血复活，并在当前回合赋予全队 100% 绝对无敌屏障。',
    secretArt: '极超·天体溯光奇迹',
    gradient: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(15,23,42,0) 70%)'
  }
]
const selectedConstellationId = ref('holy_blade')
const currentConstellation = computed(() => {
  return hyperConstellations.find(c => c.id === selectedConstellationId.value) || hyperConstellations[0]
})

const astralEnergyLevel = ref(640)
const overloadMultiplier = ref(2.5)
const unlockedNodes = ref(8)
const statConversionRatio = ref(140)
const destinyCapUnlock = ref(true)
const dualWieldMastery = ref(true)
const reboundAegis = ref(false)

const calculatedTotalAwakenedStats = computed(() => {
  const capMult = destinyCapUnlock.value ? 1.35 : 1.0
  const raw = (380 + unlockedNodes.value * 45) * overloadMultiplier.value * (statConversionRatio.value / 100) * capMult
  return Math.round(raw)
})

const calculatedSkillMultiplier = computed(() => {
  const dualBonus = dualWieldMastery.value ? 1.0 : 0.0
  const mult = 1.5 + (astralEnergyLevel.value / 250) * 0.8 + dualBonus
  return mult.toFixed(2)
})

const calculatedCdrReduction = computed(() => {
  const raw = unlockedNodes.value * 4.5 + (astralEnergyLevel.value / 30)
  return Math.min(75, Math.round(raw * 10) / 10)
})

const calculatedConstellationTier = computed(() => {
  if (astralEnergyLevel.value >= 800 && unlockedNodes.value >= 10) return 'EX 太古创世阶'
  if (astralEnergyLevel.value >= 500 && unlockedNodes.value >= 6) return 'SSR 苍穹命座阶'
  return 'SR 宿命觉醒阶'
})

const resetHyperParams = () => {
  astralEnergyLevel.value = 640
  overloadMultiplier.value = 2.5
  unlockedNodes.value = 8
  statConversionRatio.value = 140
  destinyCapUnlock.value = true
  dualWieldMastery.value = true
  reboundAegis.value = false
  if (message) message.info('命座潜能参数已重置为基准星图架构')
}

const isSimulatingHyperMastery = ref(false)
const hyperSimLogs = ref<string[]>([
  '系统就绪：已挂载 Godot 4.6 LTS 职业极限命座与潜能觉醒解算器',
  '当前命座：圣剑神圣守卫命座 (全域减伤 45%)',
  '星图推演就绪，请点击右上角按钮启动实时觉醒'
])

const runHyperMasterySimulation = () => {
  if (isSimulatingHyperMastery.value) return
  isSimulatingHyperMastery.value = true
  hyperSimLogs.value = ['[0.00s] 调谐十二宫星核共鸣能级至 ' + astralEnergyLevel.value + ' AU...']

  setTimeout(() => {
    hyperSimLogs.value.unshift(`[0.45s] 解锁 ${unlockedNodes.value}/12 处命座星环节点，转化率 ${statConversionRatio.value}%`)
  }, 450)

  setTimeout(() => {
    hyperSimLogs.value.unshift(`[0.90s] ${destinyCapUnlock.value ? '解除 255 宿命属性封顶' : '保持常规属性封顶'}，觉醒属性总和突破至 ${calculatedTotalAwakenedStats.value.toLocaleString()}`)
  }, 900)

  setTimeout(() => {
    hyperSimLogs.value.unshift(`[1.35s] 激活双手互搏双持武器战技【${currentConstellation.value.secretArt}】，最终倍率 ${calculatedSkillMultiplier.value}x`)
  }, 1350)

  setTimeout(() => {
    hyperSimLogs.value.unshift(`[1.80s] 命座觉醒推演完成！极速冷却 -${calculatedCdrReduction.value}% CDR，综合星图评阶【${calculatedConstellationTier.value}】`)
    isSimulatingHyperMastery.value = false
    if (message) message.success('太古职业命座星图推演完成，潜能已全面觉醒！')
  }, 1800)
}

const exportHyperMasteryCertificate = () => {
  const timestamp = new Date().toISOString()
  const certId = 'HYPER-JOB-' + Math.random().toString(36).substring(2, 9).toUpperCase()
  const certContent = `================================================================================
【光之战士：时空裂隙】太古职业潜能觉醒与极限命座星图方案书
================================================================================
方案编号: ${certId}
时间戳: ${timestamp}
版本规范: VBLE Job Mastery & Secret Arts Matrix v2.2.282

【当前选定命座星图】
- 命座流派: ${currentConstellation.value.name} (${currentConstellation.value.tag})
- 核心奥义: ${currentConstellation.value.secretArt}
- 命座机制概述: ${currentConstellation.value.desc}

【命座物理与控制变量】
- 星核共鸣能级: ${astralEnergyLevel.value} AU
- 职业潜能过载倍率: ${overloadMultiplier.value}x
- 星环节点解锁数: ${unlockedNodes.value} / 12
- 以太属性转化率: ${statConversionRatio.value}%
- 宿命之锁破限解除: ${destinyCapUnlock.value ? '已启用 (解除 255 上限)' : '未启用'}
- 双持武器双手互搏: ${dualWieldMastery.value ? '已启用 (+1.0x 终极倍率)' : '未启用'}
- 星图反噬防护盾: ${reboundAegis.value ? '已启用 (免除10%自损)' : '未启用'}

【实时解算觉醒指标】
- 觉醒终极属性总和: ${calculatedTotalAwakenedStats.value.toLocaleString()} 点
- 命座战技最终倍率: ${calculatedSkillMultiplier.value}x
- 战技急速冷却缩减: -${calculatedCdrReduction.value}% CDR
- 星图综合评价阶位: ${calculatedConstellationTier.value}

【底层引擎契约安全指纹】
- 引擎架构: Godot 4.6 LTS / Constellation Hyper Mastery RefCounted Spec
- 核心解算器: job_hyper_mastery_matrix.gd / job_constellation_skill_tree.gd
- 控制器: dual_wield_damage_resolver.gd
- SHA-256 指纹: SHA256-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}
================================================================================`

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `job_hyper_mastery_cert_v2.2.282_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('太古职业命座方案书已导出并同步至剪贴板！')
  }
}

const activeHyperCodeTab = ref<'matrix' | 'tree' | 'dual'>('matrix')

const gdHyperMatrixCode = `## job_hyper_mastery_matrix.gd
## Godot 4.6 LTS - 全域太古职业极限命座星图与属性潜能觉醒解算器
extends RefCounted
class_name JobHyperMasteryMatrix

enum ConstellationClass { HOLY_BLADE, ARCHMAGE, SHADOW_BLADE, MYSTIC_SAGE }

static func compute_awakened_attributes(
	base_stat: int,
	unlocked_nodes: int,
	overload_mult: float,
	conversion_ratio: float,
	break_stat_cap: bool
) -> Dictionary:
	var node_bonus: float = float(unlocked_nodes) * 45.0
	var cap_factor: float = 1.35 if break_stat_cap else 1.0
	var total_stat: float = (float(base_stat) + node_bonus) * overload_mult * (conversion_ratio / 100.0) * cap_factor
	
	return {
		"total_awakened_stats": int(total_stat),
		"cdr_pct": clampf(float(unlocked_nodes) * 4.5 + 20.0, 5.0, 75.0),
		"tier_evaluation": "EX_CREATION" if unlocked_nodes >= 10 else "SSR_ASTRAL"
	}
`

const gdConstellationTreeCode = `## job_constellation_skill_tree.gd
## Godot 4.6 LTS - 星环节点依存于战技触发状态机
extends RefCounted
class_name JobConstellationSkillTree

signal astral_node_unlocked(node_index: int, node_name: String)
signal secret_art_unleashed(art_name: String, final_damage: int)

class ConstellationNode:
	var index: int
	var is_unlocked: bool = false
	var required_astral_energy: int = 100
	var granted_buff: String = ""

static func evaluate_secret_art_multiplier(
	astral_energy: int,
	has_dual_wield: bool
) -> float:
	var base_mult: float = 1.5 + (float(astral_energy) / 250.0) * 0.8
	if has_dual_wield:
		base_mult += 1.0
	return snappedf(base_mult, 0.01)
`

const gdDualWieldResolverCode = `## dual_wield_damage_resolver.gd
## Godot 4.6 LTS - 双手互搏与双持武器极意伤害解算器
extends RefCounted
class_name DualWieldDamageResolver

static func resolve_dual_wield_strike(
	main_hand_atk: int,
	off_hand_atk: int,
	skill_mult: float,
	enemy_def: int
) -> Dictionary:
	var main_hit: int = maxi(1, int(float(main_hand_atk) * skill_mult - float(enemy_def) * 0.5))
	var off_hit: int = maxi(1, int(float(off_hand_atk) * skill_mult - float(enemy_def) * 0.5))
	
	return {
		"main_hand_damage": main_hit,
		"off_hand_damage": off_hit,
		"total_damage": main_hit + off_hit,
		"is_critical": true
	}
`

const currentHyperCode = computed(() => {
  if (activeHyperCodeTab.value === 'matrix') return gdHyperMatrixCode
  if (activeHyperCodeTab.value === 'tree') return gdConstellationTreeCode
  return gdDualWieldResolverCode
})

const copyHyperCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentHyperCode.value).then(() => {
      if (message) message.success('Godot 4.6 LTS 命座源码已复制至剪贴板！')
    }).catch(() => {
      if (message) message.error('复制失败，请手动选取复制')
    })
  }
}

// ================= 🌌 视图 7: 二十八大职业双轨觉醒与万能先驱者矩阵工坊 (v2.2.302) =================
interface PioneerArchetype {
  id: string
  name: string
  track: string
  role: string
  icon: string
  tagType: 'info' | 'warning' | 'error' | 'success'
  desc: string
  baseCp: number
  burstDmg: number
}

const pioneerArchetypes: PioneerArchetype[] = [
  {
    id: 'radiant_paladin_crusader',
    name: '辉光圣骑士',
    track: '神圣裁决与守护双轨',
    role: '光辉圣壁 / 极意裁决',
    icon: '🛡️',
    tagType: 'info',
    desc: '聚合光之水晶绝对壁垒，双持重盾与圣剑，在绝对格挡的同时触发 100% 神圣反射裁决。',
    baseCp: 68000,
    burstDmg: 56000
  },
  {
    id: 'void_shadow_assassin',
    name: '虚空影刃',
    track: '相位二刀流与暗夜双轨',
    role: '时空瞬身 / 虚空破限',
    icon: '🗡️',
    tagType: 'warning',
    desc: '掌握平行世界线撕裂技巧，攻击必定双发暴击，并在受到致命伤时闪入相位空间无敌 3 秒。',
    baseCp: 74000,
    burstDmg: 82000
  },
  {
    id: 'archmage_elemental_weaver',
    name: '太古魔导士',
    track: '四元聚合与时空黑洞双轨',
    role: '以太湮灭 / 因果禁咒',
    icon: '🔮',
    tagType: 'error',
    desc: '融合水火风地四大元素本源，禁忌多重咏唱无需消耗 MP，可瞬间引爆全域次元塌陷。',
    baseCp: 82000,
    burstDmg: 96000
  },
  {
    id: 'transcendent_freeman_omni',
    name: '超然先驱自由人',
    track: '全被动大成与万能先驱双轨',
    role: '全系精通 / 创世神座',
    icon: '👑',
    tagType: 'success',
    desc: '二十八大职业全系 ABP 融会贯通，拥有全武器防具 SSS 掌握与自由人被动全额继承至高特权。',
    baseCp: 99000,
    burstDmg: 125000
  }
]

const selectedPioneerArchetypeId = ref<string>('transcendent_freeman_omni')
const dualAwakeningSync = ref<number>(75)
const secretFlowStacks = ref<number>(6)
const abpInjectionRate = ref<number>(1500)
const passivePenetrationMultiplier = ref<number>(3.2)

const freemanLosslessPassiveLock = ref<boolean>(true)
const secretArtsInstantTrigger = ref<boolean>(true)
const limitBreakDivineGovernor = ref<boolean>(true)

const isSimulatingPioneer = ref<boolean>(false)
const pioneerSimStep = ref<number>(5)
const pioneerSimCurrentLog = ref<string>('全域二十八职业双轨觉醒与万能先驱者矩阵已就绪，等待调控指令。')

const currentPioneerArchetype = computed(() => {
  return pioneerArchetypes.find(a => a.id === selectedPioneerArchetypeId.value) || pioneerArchetypes[3]
})

const calculatedPioneerCp = computed(() => {
  const base = currentPioneerArchetype.value.baseCp
  const syncBonus = 1 + (dualAwakeningSync.value / 100) * 0.5
  const flowBonus = 1 + (secretFlowStacks.value / 10) * 0.35
  const bridgeMult = freemanLosslessPassiveLock.value ? 1.25 : 1.0
  return Math.round(base * syncBonus * flowBonus * bridgeMult)
})

const calculatedBurstDmg = computed(() => {
  const base = currentPioneerArchetype.value.burstDmg
  const penMult = passivePenetrationMultiplier.value
  const instantMult = secretArtsInstantTrigger.value ? 1.35 : 1.0
  const limitMult = limitBreakDivineGovernor.value ? 1.6 : 1.0
  return Math.round(base * penMult * instantMult * limitMult)
})

const calculatedAbpFullTime = computed(() => {
  const totalAbpRequired = 28 * 4500
  const totalSeconds = totalAbpRequired / abpInjectionRate.value
  return (totalSeconds / 60).toFixed(1)
})

const calculatedPioneerTier = computed(() => {
  const cp = calculatedPioneerCp.value
  if (cp > 160000) return 'EX·太古万能先驱主宰神座'
  if (cp > 120000) return 'SSS·天梯极意大圆满'
  if (cp > 90000) return 'SS·光暗双轨超觉醒'
  return 'S·水晶传承先锋'
})

const resetPioneerParameters = () => {
  selectedPioneerArchetypeId.value = 'transcendent_freeman_omni'
  dualAwakeningSync.value = 75
  secretFlowStacks.value = 6
  abpInjectionRate.value = 1500
  passivePenetrationMultiplier.value = 3.2
  freemanLosslessPassiveLock.value = true
  secretArtsInstantTrigger.value = true
  limitBreakDivineGovernor.value = true
  if (message) message.info('已重置万能先驱者矩阵调控参数')
}

const runPioneerSimulation = () => {
  if (isSimulatingPioneer.value) return
  isSimulatingPioneer.value = true
  pioneerSimStep.value = 1
  pioneerSimCurrentLog.value = '阶段 1/5: 扫描二十八大职业水晶烙印，解构初阶与进阶技能树...'

  setTimeout(() => {
    pioneerSimStep.value = 2
    pioneerSimCurrentLog.value = '阶段 2/5: 注入以太共鸣催化剂，构建光暗双轨觉醒分支拓扑...'
  }, 400)

  setTimeout(() => {
    pioneerSimStep.value = 3
    pioneerSimCurrentLog.value = '阶段 3/5: 加载天梯极意流转协议，挂载全被动无损贯通中介...'
  }, 800)

  setTimeout(() => {
    pioneerSimStep.value = 4
    pioneerSimCurrentLog.value = '阶段 4/5: 激活伤害天花板破限器，对齐 Godot 4.6 LTS 运行时帧率...'
  }, 1200)

  setTimeout(() => {
    pioneerSimStep.value = 5
    pioneerSimCurrentLog.value = '阶段 5/5: 生成万能先驱者觉醒方案证书，锁定实机运行时参数！'
    isSimulatingPioneer.value = false
    if (message) message.success('万能先驱者双轨觉醒推演完成！')
  }, 1600)
}

const exportPioneerCertificate = () => {
  const arch = currentPioneerArchetype.value
  const certContent = `================================================================================
  《光之战士：时空裂隙》二十八大职业双轨觉醒与万能先驱方案证书 (v2.2.302)
  生成时间: ${new Date().toISOString()}
  原型构架: ${arch.name} (${arch.track})
  先驱位阶: ${calculatedPioneerTier.value}
================================================================================
【调控参数】
- 双轨觉醒共鸣度: ${dualAwakeningSync.value}%
- 天梯极意流转层数: ${secretFlowStacks.value} 层
- ABP 极速注入速率: ${abpInjectionRate.value} ABP/s
- 全被动贯通乘数: ${passivePenetrationMultiplier.value}x
- 自由人无损贯通: ${freemanLosslessPassiveLock.value ? '已开启' : '关闭'}
- 极意瞬发断路器: ${secretArtsInstantTrigger.value ? '已开启' : '关闭'}
- 999999 神力破限: ${limitBreakDivineGovernor.value ? '已开启' : '关闭'}

【实时解算能效】
- 先驱者神圣战力: ${calculatedPioneerCp.value.toLocaleString()} CP
- 极意单发破限伤害: ${calculatedBurstDmg.value.toLocaleString()} DMG
- 全职业精通耗时: ${calculatedAbpFullTime.value} 分钟
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
    a.download = `omni_pioneer_cert_v2.2.302_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Export certificate error:', e)
  }

  if (message) message.success('万能先驱者觉醒方案证书已导出并同步至剪贴板！')
}

const activePioneerCodeTab = ref<'awakening' | 'bridge' | 'secret'>('awakening')

const gdPioneerAwakeningCode = `## omni_pioneer_dual_awakening.gd
## Godot 4.6 LTS - 二十八大职业光暗双轨觉醒与战力解算器
extends RefCounted
class_name OmniPioneerDualAwakening

enum TrackBranch { RADIANT_ARBITER, VOID_PHASE, CELESTIAL_WEAVER, OMNI_FREEMAN }

static func compute_awakening_power(
	branch: TrackBranch,
	sync_pct: float,
	secret_stacks: int,
	lossless_active: bool
) -> Dictionary:
	var base_mult: float = 1.0 + (sync_pct / 100.0) * 0.5
	var stack_mult: float = 1.0 + float(secret_stacks) * 0.08
	if lossless_active and branch == TrackBranch.OMNI_FREEMAN:
		base_mult *= 1.25
		
	return {
		"effective_sync": sync_pct,
		"power_multiplier": base_mult * stack_mult,
		"is_max_tier": sync_pct >= 90.0 and secret_stacks >= 8
	}
`

const gdFreemanBridgeCode = `## freeman_passive_lossless_bridge.gd
## Godot 4.6 LTS - 自由人全职业被动无损贯通与属性汇流
extends RefCounted
class_name FreemanPassiveLosslessBridge

static func aggregate_all_passives(
	mastered_jobs_count: int,
	penetration_mult: float,
	is_lossless: bool
) -> Dictionary:
	var total_str_gain: int = int(float(mastered_jobs_count) * 2.5 * (penetration_mult if is_lossless else 1.0))
	var total_mag_gain: int = int(float(mastered_jobs_count) * 2.8 * (penetration_mult if is_lossless else 1.0))
	var total_agi_gain: int = int(float(mastered_jobs_count) * 2.2 * (penetration_mult if is_lossless else 1.0))
	
	return {
		"strength_bonus": total_str_gain,
		"magic_bonus": total_mag_gain,
		"agility_bonus": total_agi_gain,
		"unlocked_dual_wield": mastered_jobs_count >= 5,
		"unlocked_rapid_fire": mastered_jobs_count >= 10
	}
`

const gdSecretArtsFlowCode = `## secret_arts_flow_controller.gd
## Godot 4.6 LTS - 天梯极意流转状态机与 999999 破限解算
extends RefCounted
class_name SecretArtsFlowController

signal secret_flow_executed(flow_count: int, raw_damage: int)

static func execute_flow_strike(
	base_damage: int,
	flow_stacks: int,
	limit_break_enabled: bool
) -> Dictionary:
	var damage: int = int(float(base_damage) * (1.0 + float(flow_stacks) * 0.22))
	var max_cap: int = 9999999 if limit_break_enabled else 999999
	damage = mini(damage, max_cap)
	
	return {
		"damage": damage,
		"is_limit_broken": limit_break_enabled and damage > 999999,
		"stacks_consumed": flow_stacks
	}
`

const currentPioneerCode = computed(() => {
  if (activePioneerCodeTab.value === 'awakening') return gdPioneerAwakeningCode
  if (activePioneerCodeTab.value === 'bridge') return gdFreemanBridgeCode
  return gdSecretArtsFlowCode
})

const copyPioneerCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentPioneerCode.value).then(() => {
      if (message) message.success('Godot 4.6 LTS 先驱者源码已复制至剪贴板！')
    }).catch(() => {
      if (message) message.error('复制失败，请手动选取复制')
    })
  }
}

// ==========================================
// v2.2.332: 三十职业水晶转职树与被动融合工坊逻辑
// ==========================================
interface CrystalRebirthArchetype {
  id: string
  name: string
  subtitle: string
  icon: string
  tag: string
  desc: string
  basePower: number
}

const crystalRebirthArchetypes: CrystalRebirthArchetype[] = [
  {
    id: 'paladin_aegis',
    name: '太古圣骑士',
    subtitle: '太古庇护与双持神圣双剑流',
    icon: '🛡️',
    tag: '圣堂守护',
    desc: '融合骑士盾墙与白魔全息护疗，手持双神圣誓约长剑，生命值越高圣威斩击伤害倍率越高。',
    basePower: 38000
  },
  {
    id: 'black_mage_quad',
    name: '湮灭黑魔导士',
    subtitle: '四重元素超魔导核爆崩解流',
    icon: '🔮',
    tag: '元素核爆',
    desc: '火冰雷毒四系禁咒共鸣，被动吸取深渊以太，瞬间连续施展四发核爆且无视魔抗。',
    basePower: 45000
  },
  {
    id: 'ninja_dual_phantom',
    name: '幻影极意忍者',
    subtitle: '二刀流双持飞镖绝对暴击流',
    icon: '🥷',
    tag: '神速绝杀',
    desc: '二刀流双持极意加持，飞镖暗器投掷暴击率达 100%，具备微秒替身术无伤闪避机制。',
    basePower: 42000
  },
  {
    id: 'time_mage_warp',
    name: '时空魔导师',
    subtitle: '全息加速时间静止与重力坍缩流',
    icon: '⏳',
    tag: '时空操纵',
    desc: '全员赋予急速光环与绝对免疫迟缓，大招停止全场敌人时间流速并引发重力微型黑洞。',
    basePower: 39500
  }
]

const selectedRebirthArchetypeId = ref('paladin_aegis')
const crystalResonanceHarmonyRatio = ref(95)
const passiveFusionSynergyCapacity = ref(12)
const rebirthStatBonusPct = ref(180)
const secretArtsCooldownReductionPct = ref(50)

const crossJobPassiveFusionUnrestricted = ref(true)
const autoAbpMasteryOverflowAccumulation = ref(true)
const secretArtsLimitBreakUncap = ref(true)

const selectRebirthArchetype = (id: string) => {
  selectedRebirthArchetypeId.value = id
  if (message) {
    const arch = crystalRebirthArchetypes.find(a => a.id === id)
    if (arch) message.success(`已切换水晶转生原型：${arch.name}`)
  }
}

const calculatedRebirthMetrics = computed(() => {
  const arch = crystalRebirthArchetypes.find(a => a.id === selectedRebirthArchetypeId.value) || crystalRebirthArchetypes[0]
  const basePwr = arch.basePower
  const uncapBonus = secretArtsLimitBreakUncap.value ? 1.5 : 1.0
  const finalRating = Math.round(basePwr * (crystalResonanceHarmonyRatio.value / 100) * (rebirthStatBonusPct.value / 100) * uncapBonus)
  
  const passiveEff = crossJobPassiveFusionUnrestricted.value ? 99.8 : Math.min(95.0, 60.0 + (passiveFusionSynergyCapacity.value / 16) * 35).toFixed(1)
  
  let rank = 'SSR·太古星相宗师'
  if (finalRating >= 90000) rank = 'EX·太古水晶全职神圣导师'
  else if (finalRating >= 60000) rank = 'SSS·极意转生天尊'

  return {
    compositeJobPowerRating: finalRating.toLocaleString(),
    passiveSlotsEfficiency: `${passiveEff}%`,
    rebirthAttributeGain: `+${rebirthStatBonusPct.value}%`,
    crystalPioneerCertification: rank
  }
})

const isSimulatingCrystalRebirth = ref(false)
const currentRebirthSimStage = ref(0)
const crystalRebirthStages = [
  '水晶四象星位对齐与命座扫描...',
  '跨职业被动技能基因熔铸融合...',
  '转生灵格洗礼与全属性倍率注入...',
  '太古终极奥义刻印与伤害解限突破...',
  '全职业转生档案防伪公钥计算与证书生成...'
]

const runCrystalRebirthSimulation = () => {
  if (isSimulatingCrystalRebirth.value) return
  isSimulatingCrystalRebirth.value = true
  currentRebirthSimStage.value = 0

  const interval = setInterval(() => {
    if (currentRebirthSimStage.value < crystalRebirthStages.length - 1) {
      currentRebirthSimStage.value++
    } else {
      clearInterval(interval)
      isSimulatingCrystalRebirth.value = false
      if (message) {
        message.success(`【水晶转生沙盘】推演成功！综合转生战力评级：${calculatedRebirthMetrics.value.compositeJobPowerRating}`)
      }
    }
  }, 400)
}

const exportCrystalRebirthCertificate = () => {
  const hash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  const cert = `=== 《光之战士：时空裂隙》三十全职业水晶转生认证证书 ===
证书编号: CRYSTAL-REBIRTH-${hash.substring(0, 12).toUpperCase()}
核心原型: ${selectedRebirthArchetypeId.value}
共振同调谐波: ${crystalResonanceHarmonyRatio.value}%
被动插槽容量: ${passiveFusionSynergyCapacity.value} 槽
转生属性倍率: +${rebirthStatBonusPct.value}%
综合转生战力: ${calculatedRebirthMetrics.value.compositeJobPowerRating}
被动融合效率: ${calculatedRebirthMetrics.value.passiveSlotsEfficiency}
水晶先驱评级: ${calculatedRebirthMetrics.value.crystalPioneerCertification}
安全校验哈希: SHA-256:${hash}
验证状态: 官方职业水晶星盘与转生引擎认证通过 (Godot 4.6 LTS Verified)
=======================================================`
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(cert)
    if (message) message.success('已导出水晶职业转生方案防伪证书到剪贴板！')
  }
}

const activeRebirthScriptTab = ref<'tree_orchestrator' | 'fusion_matrix' | 'rebirth_controller'>('tree_orchestrator')

const rebirthScriptCodes = {
  tree_orchestrator: `class_name CrystalJobTreeOrchestrator
extends Node

## 最终幻想：时空之轮 - 三十职业水晶转职树与命座仲裁器
## 文件路径: res://scripts/combat/jobs/crystal_job_tree_orchestrator.gd
## 引擎版本: Godot Engine 4.6 LTS

signal job_rebirth_completed(job_id: String, composite_power: int)

@export var crystal_harmony_rate: float = 0.95

func evaluate_job_rebirth(job_id: String, base_power: int, stat_multiplier: float) -> Dictionary:
    var final_pwr: int = int(float(base_power) * crystal_harmony_rate * (stat_multiplier / 100.0))
    job_rebirth_completed.emit(job_id, final_pwr)
    return {
        "job_id": job_id,
        "composite_power": final_pwr,
        "status": "transcended"
    }
`,

  fusion_matrix: `class_name PassiveFusionMatrixEngine
extends RefCounted

## 最终幻想：时空之轮 - 跨职业被动技能自由融合引擎
## 文件路径: res://scripts/combat/jobs/passive_fusion_matrix_engine.gd
## 引擎版本: Godot Engine 4.6 LTS

static func fuse_passive_abilities(passives: Array[String], max_slots: int, unrestricted: bool) -> Dictionary:
    var active_passives: Array[String] = passives.slice(0, mini(passives.size(), max_slots))
    return {
        "active_passives": active_passives,
        "is_unrestricted": unrestricted,
        "synergy_bonus_pct": active_passives.size() * 8.5
    }
`,

  rebirth_controller: `class_name SecretArtsRebirthController
extends RefCounted

## 最终幻想：时空之轮 - 奥义转生与伤害解限爆发控制器
## 文件路径: res://scripts/combat/jobs/secret_arts_rebirth_controller.gd
## 引擎版本: Godot Engine 4.6 LTS

static func cast_secret_art_burst(raw_damage: float, uncap_active: bool) -> int:
    var max_limit: float = 99999999.0 if uncap_active else 999999.0
    return int(minf(raw_damage, max_limit))
`
}

const currentRebirthScriptCode = computed(() => {
  return rebirthScriptCodes[activeRebirthScriptTab.value]
})

const copyRebirthScript = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentRebirthScriptCode.value)
    if (message) message.success('已复制 Godot 4.6 LTS 水晶转生源码到剪贴板！')
  }
}

</script>

<style scoped>
.jobs-pagination-control {
  min-width: 28px;
  min-height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.jobs-pagination-control:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}

.jobs-pagination-control:disabled {
  cursor: not-allowed;
}
</style>
