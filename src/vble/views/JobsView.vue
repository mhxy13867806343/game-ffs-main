<template>
  <div class="jobs-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Job Catalog &amp; Ability Inheritance</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">职业转职树与能力继承系统</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        当前目录收录 {{ jobsList.length }} 个职业，其中水晶职业 {{ jobsList.filter(j => j.crystal !== 'special').length }} 个；支持多维分类查阅与转职资格实机推演。
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
    <div v-else class="space-y-6">
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
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
import { jobsList } from '../config/jobsConfig'
import { usePagination } from '@/composables/usePagination'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

const activeMainTab = ref<'catalog' | 'studio' | 'synergy'>('catalog')
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
