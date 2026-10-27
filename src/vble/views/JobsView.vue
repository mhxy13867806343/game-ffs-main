<template>
  <div class="jobs-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Job Catalog &amp; Ability Inheritance</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">职业转职树与能力继承系统</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        当前目录收录 {{ jobsList.length }} 个职业，其中水晶职业 {{ jobsList.filter(j => j.crystal !== 'special').length }} 个；可按分类查阅转职与能力继承机制。
      </p>
    </div>

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
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
import { jobsList } from '../config/jobsConfig'
import { usePagination } from '@/composables/usePagination'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

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
  // 包装层冒泡在 Naive UI 原翻页之后，再等 Vue 更新才检查按钮是否因到边界禁用。
  void nextTick(() => {
    const { button } = activation
    if (!isMobile.value || !button.isConnected || !button.disabled) return
    // 禁用按钮可能退焦到 BODY；其它控件已接管焦点时不能抢回。
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
  'white-mage': [
    { level: '1~6阶', name: '全阶白魔法教材', desc: '恢复、解毒、大回复、复活术、神圣术等神圣秘传，可用技能以魔法菜单为准。' }
  ],
  'black-mage': [
    { level: '1~6阶', name: '全阶黑魔法教材', desc: '火炎、冰冻、雷电、核爆禁咒等破坏黑术，可用技能以魔法菜单为准。' }
  ],
  'blue-mage': [
    { level: '学习', name: '青魔法魔兽学习', desc: '承受魔物特定技能后习得，哥布林拳、白风、死之宣告等，可用技能以能力菜单为准。' }
  ],
  'time-mage': [
    { level: '1~6阶', name: '时空魔法教材', desc: '加速、减速、止动、重力、彗星与次元跳跃 Quick，可用技能以魔法菜单为准。' }
  ],
  summoner: [
    { level: '1~5阶', name: '召唤秘术魔石', desc: '陆行鸟、希瓦、伊弗利特、泰坦、巴哈姆特，可用技能以召唤菜单为准。' }
  ],
  'mystic-knight': [
    { level: 1, name: '元素刃', desc: '为武器附加指定低阶元素。' },
    { level: 4, name: '魔力斩', desc: '随魔法力部分成长的武器攻击。' },
    { level: 8, name: '封咒刃', desc: '造成伤害并小概率沉默。' },
    { level: 14, name: '双附魔', desc: '接下来两次攻击保留附魔。' },
    { level: 20, name: '魔剑连舞', desc: '多段附魔武器连击。' }
  ],
  berserker: [
    { level: 1, name: '狂怒', desc: '攻击力提升，但不可手动下达指令。' },
    { level: 4, name: '乱斧', desc: '随机攻击多个敌方目标。' },
    { level: 8, name: '血性追击', desc: '击倒目标后追加一次普通攻击。' },
    { level: 14, name: '无痛狂战', desc: '狂化期间免疫混乱与魅惑。' },
    { level: 20, name: '狂乱破坏', desc: '无视防御的大范围重斧横扫。' }
  ],
  'red-mage': [
    { level: '1~3阶', name: '红魔法白黑并进', desc: '兼修初中阶白黑魔法，最高进阶至双重咏唱 (Dualcast)。' }
  ],
  ninja: [
    { level: 1, name: '投掷', desc: '投掷消耗型武器、遁术道具或手里剑。' },
    { level: 4, name: '烟遁', desc: '提高闪避和逃跑成功率。' },
    { level: 8, name: '影分身', desc: '回避下一次直接攻击。' },
    { level: 14, name: '双刃连击', desc: '两把武器连续发动双重斩击。' },
    { level: 20, name: '幻影乱投', desc: '多重分身投掷大量风魔手里剑。' }
  ],
  beastmaster: [
    { level: 1, name: '野兽指令', desc: '向捕获的魔兽下达进攻指令。' },
    { level: 4, name: '安抚野兽', desc: '降低魔兽敌意与行动频率。' },
    { level: 8, name: '兽群标记', desc: '指挥魔兽集中攻击指定目标。' },
    { level: 14, name: '放生突击', desc: '释放被捕获魔兽释放其终极绝技。' },
    { level: 20, name: '万兽号令', desc: '全场野兽咆哮造成混沌震波。' }
  ],
  hunter: [
    { level: 1, name: '瞄准射击', desc: '高命中远程狙击，无视敌方部分闪避。' },
    { level: 4, name: '捕兽夹', desc: '对踩中陷阱的目标造成迟滞减速。' },
    { level: 8, name: '破翼箭', desc: '对飞行魔兽造成特攻暴击。' },
    { level: 14, name: '猎物标记', desc: '标记目标，全队对其物理伤害提升。' },
    { level: 20, name: '连射', desc: '四连发箭矢无差别贯穿扫射。' }
  ],
  geomancer: [
    { level: 1, name: '地形读取', desc: '感知当前战场的自然地脉属性。' },
    { level: 4, name: '自然脉动', desc: '随机引导地震、水流或落雷（0 MP）。' },
    { level: 8, name: '地脉护幕', desc: '降低全队受到的环境陷阱伤害。' },
    { level: 14, name: '地形暴走', desc: '激化地脉引发更高级自然灾厄。' },
    { level: 20, name: '天地鸣动', desc: '引发全场大地震与熔岩喷发。' }
  ],
  samurai: [
    { level: 1, name: '居合', desc: '名刀拔刀瞬间斩断目标气机。' },
    { level: 4, name: '招架', desc: '利用刀身格挡单体物理伤害。' },
    { level: 8, name: '蓄意斩', desc: '蓄力一回合后发动破防重斩。' },
    { level: 14, name: '一闪', desc: '概率直接斩杀弱体目标。' },
    { level: 20, name: '奥义拔刀', desc: '居合奥义与钱投大爆破。' }
  ],
  dragoon: [
    { level: 1, name: '跳跃', desc: '跃向高空规避伤害，次轮下坠造成倍率暴击。' },
    { level: 4, name: '枪阵防御', desc: '持枪架势减轻冲锋伤害。' },
    { level: 4, name: '龙剑', desc: '贯穿突刺同时汲取目标生命与魔力。' },
    { level: 8, name: '贯穿突刺', desc: '直刺排成一线的敌方前列。' },
    { level: 14, name: '空中守护', desc: '从天而降击退突袭队友的敌人。' },
    { level: 20, name: '坠星枪', desc: '化身苍龙流星砸向敌阵。' }
  ],
  dancer: [
    { level: 1, name: '轻步', desc: '惑心舞步，提高自身回避率。' },
    { level: 4, name: '疗愈华尔兹', desc: '舞动间为队伍回复微量生命。' },
    { level: 8, name: '刃舞', desc: '以利刃起舞，随机触发致命剑舞。' },
    { level: 14, name: '迷目舞', desc: '使敌人群体陷入混乱失智。' },
    { level: 20, name: '终幕乱舞', desc: '400% 伤害的绝美剑之舞大爆发。' }
  ],
  chemist: [
    { level: 1, name: '调合药剂', desc: '组合基础素材进行强力炼金治疗。' },
    { level: 4, name: '烟雾瓶', desc: '投掷烟幕降低敌人命中率。' },
    { level: 8, name: '腐蚀瓶', desc: '造成伤害并降低敌人物理防御。' },
    { level: 14, name: '快速调制', desc: '降低下一次道具行动的咏唱消耗。' },
    { level: 20, name: '万能合剂', desc: '解除全队一切异常并赋予全员持续回复。' }
  ]
}

const getJobSkillDirectory = (id: string): JobSkillEntry[] => {
  return jobSkillsDirectoryData[id] || [
    { level: '1~20', name: '职业特技群', desc: '正式目录技能以能力／战斗菜单为准。' }
  ]
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
