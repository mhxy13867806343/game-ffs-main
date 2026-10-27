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
      <div class="inline-flex p-1 bg-slate-900/90 rounded-xl border border-slate-800">
        <button
          type="button"
          class="px-5 py-2 text-sm font-semibold rounded-lg transition-all"
          :class="activeMainTab === 'catalog' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'catalog'"
        >
          📜 职业全典与精通继承 ({{ jobsList.length }}职)
        </button>
        <button
          type="button"
          class="px-5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5"
          :class="activeMainTab === 'studio' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'"
          @click="activeMainTab = 'studio'"
        >
          <span>⚡</span>
          <span>职业技能可用性与转职推演工作台</span>
          <n-badge value="NEW" type="warning" />
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
    <div v-else class="space-y-6">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
import { jobsList } from '../config/jobsConfig'
import { usePagination } from '@/composables/usePagination'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

const activeMainTab = ref<'catalog' | 'studio'>('catalog')
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
