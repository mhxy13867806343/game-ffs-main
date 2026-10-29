<template>
  <div class="job-detail-page p-3 sm:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/jobs">
          <n-button type="info" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回职业体系
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-amber-300">经典职业独立全息档案</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-cyan-300 font-bold">{{ job?.name || '未知职业' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/40">
          VBLE JOB MATRIX v2.2.349
        </span>
      </div>
    </div>

    <!-- 未找到提示 -->
    <div v-if="!job" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到指定职业档案</h2>
      <p class="text-sm text-slate-300 mb-4">该职业未收录在 26 大经典职业库中，请核对职业标识码。</p>
      <router-link to="/vble/jobs">
        <n-button type="primary" round>返回职业体系列表</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 主职业头图名片卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.18)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="px-3 py-1 rounded-full text-xs font-bold border"
                :class="getCrystalBadgeClass(job.crystal)"
              >
                {{ job.crystalName }} 所属
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">
                战术职能: {{ job.role }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700">
                装配许可: {{ job.equipTypes }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ job.name }}</span>
            </h1>

            <p class="text-base text-amber-200/90 italic border-l-2 border-amber-400 pl-3 py-0.5">
              固有天赋: {{ job.innateAbility }}
            </p>

            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span class="text-amber-300 font-bold">精通专精收益 (Mastery): </span>
              {{ job.masteryBonus }}
            </p>
          </div>

          <!-- 右侧专精等级模拟器 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[240px]">
            <div>
              <div class="text-xs text-slate-400">当前职业精通熟练度 (ABP)</div>
              <div class="text-2xl font-mono font-black text-amber-400 mt-0.5">Lv.{{ masteryLevel }} / 10</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">自由人被动继承状态</div>
              <div class="text-xs text-emerald-400 font-bold mt-0.5">
                {{ masteryLevel === 10 ? '✓ 全被动完美常驻继承' : `需再累积 ${(10 - masteryLevel) * 80} ABP 达成全常驻` }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 职业成长与技能树详解 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧 2 列: 技能树与成长数值解算 -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>⚡</span> 专属核心指令与终极奥义
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-300">调节熟练度:</span>
              <span class="text-sm font-mono font-bold text-cyan-300">Lv.{{ masteryLevel }}</span>
            </div>
          </div>

          <!-- ABP 熟练度滑块 -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-300">调节职业熟练度等级 (ABP 成长)：</span>
              <span class="font-mono text-amber-400 font-bold">Lv. {{ masteryLevel }} / 10 阶</span>
            </div>
            <n-slider v-model:value="masteryLevel" :min="1" :max="10" :step="1" />
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>Lv. 1 (初学入门)</span>
              <span>Lv. 5 (核心指令解锁)</span>
              <span>Lv. 10 (极境精通常驻)</span>
            </div>
          </div>

          <!-- 标志性技能展示 -->
          <div class="space-y-3">
            <div class="text-xs font-bold text-slate-300">专精招式与指令明细：</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="(skill, idx) in job.signatureSkills"
                :key="idx"
                class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                      SKILL 0{{ idx + 1 }}
                    </span>
                    <span class="text-sm font-bold text-white">{{ skill }}</span>
                  </div>
                  <span class="text-xs text-amber-400 font-mono">耗能: {{ (idx + 1) * 12 }} MP</span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  {{ getSkillDesc(skill, job.role) }}
                </p>
                <div class="text-[10px] text-emerald-400 pt-1">
                  ✓ 伤害修正: {{ (1.2 + masteryLevel * 0.15).toFixed(2) }}x 倍率
                </div>
              </div>
            </div>
          </div>

          <!-- 派生属性倾向修正 -->
          <div class="border-t border-slate-800 pt-4">
            <div class="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
              <span>📊</span> 职业属性补正倍率 (Base Modifier)
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-[10px] text-slate-400">力量 STR</div>
                <div class="text-base font-mono font-bold text-rose-400 mt-1">{{ statMods.str }}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-[10px] text-slate-400">敏捷 AGI</div>
                <div class="text-base font-mono font-bold text-emerald-400 mt-1">{{ statMods.agi }}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-[10px] text-slate-400">体质 VIT</div>
                <div class="text-base font-mono font-bold text-amber-400 mt-1">{{ statMods.vit }}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-[10px] text-slate-400">魔力 MAG</div>
                <div class="text-base font-mono font-bold text-cyan-400 mt-1">{{ statMods.mag }}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-[10px] text-slate-400">精神 SPR</div>
                <div class="text-base font-mono font-bold text-blue-400 mt-1">{{ statMods.spr }}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-[10px] text-slate-400">幸运 LUCK</div>
                <div class="text-base font-mono font-bold text-yellow-400 mt-1">{{ statMods.luck }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 1 列: 推荐装备与配装模拟联动 -->
        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-4">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>🛡️</span> 配装工坊快速装配
            </h2>
            <p class="text-xs text-slate-300 leading-relaxed">
              将该职业载入配装模拟器，测试在不同神兵防具组合下的最大化输出峰值与防御减伤。
            </p>
            <router-link to="/vble/armory">
              <n-button block type="warning" round secondary>
                在配装工坊中调试该职业 →
              </n-button>
            </router-link>
          </div>

          <!-- 快速跳转至其他职业 -->
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>🌀</span> 26 职业快速索引
            </h2>
            <div class="space-y-1.5 max-h-64 overflow-y-auto">
              <div
                v-for="j in jobsList"
                :key="j.id"
                class="p-2 rounded-lg transition-colors flex items-center justify-between"
                :class="j.id === job.id ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40' : 'hover:bg-slate-800 text-slate-300'"
              >
                <router-link :to="'/vble/jobs/' + j.id" class="text-xs block truncate max-w-[180px]">
                  {{ j.name }}
                </router-link>
                <span class="text-[10px] text-slate-400">{{ j.crystalName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { jobsList, type JobItem } from '../config/jobsConfig'

const route = useRoute()
const jobId = computed(() => (route.params.id as string) || '')

const masteryLevel = ref(10)

const job = computed<JobItem | null>(() => {
  return jobsList.find(j => j.id === jobId.value) || null
})

const getCrystalBadgeClass = (crystal: string) => {
  switch (crystal) {
    case 'wind': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    case 'water': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    case 'fire': return 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    case 'earth': return 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    default: return 'bg-purple-500/20 text-purple-300 border-purple-500/40'
  }
}

const getSkillDesc = (skill: string, role: string) => {
  return `释放 ${skill} 指令，结合 ${role} 的职业特质，对目标造成巨量战术破防与状态强化。`
}

const statMods = computed(() => {
  if (!job.value) return { str: '+0', agi: '+0', vit: '+0', mag: '+0', spr: '+0', luck: '+0' }
  const r = job.value.role
  if (r.includes('物理') || r.includes('战士') || r.includes('骑士')) {
    return { str: '+28', agi: '+15', vit: '+24', mag: '-8', spr: '+5', luck: '+10' }
  } else if (r.includes('魔法') || r.includes('魔导') || r.includes('召唤')) {
    return { str: '-12', agi: '+8', vit: '+5', mag: '+35', spr: '+26', luck: '+8' }
  } else if (r.includes('盗贼') || r.includes('忍者') || r.includes('敏捷')) {
    return { str: '+14', agi: '+38', vit: '+10', mag: '+5', spr: '+6', luck: '+25' }
  }
  return { str: '+15', agi: '+15', vit: '+15', mag: '+15', spr: '+15', luck: '+15' }
})
</script>

<style scoped>
</style>
