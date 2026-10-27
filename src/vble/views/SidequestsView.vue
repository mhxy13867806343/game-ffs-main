<template>
  <div class="sidequests-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center mb-6">
      <n-tag type="info" size="small" round class="mb-2">Epic Lore & Exploration Secrets</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">支线任务与探索资料</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        本目录收录 {{ sidequests.length }} 条资料，包含当前正式支线、王城悬赏讨伐与原有史诗探索条目。正式支线逐条标明接入与验证边界。
      </p>
    </div>

    <!-- 史诗任务特别呈现：王冠之托与四阶实物交换链条 -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-purple-950/40 border border-amber-500/40 shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-800/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">👑</span>
          <h3 class="text-base sm:text-lg font-bold text-amber-300">史诗任务特别呈现：西方王城王冠之托与神秘钥匙物语 (ff1_crown_chain)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="warning" size="small" round>八图连通物语</n-tag>
          <n-tag type="success" size="small" round>四阶实物交换</n-tag>
          <n-tag type="info" size="small" round>对白代次锁</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机任务核心（<code>ff1_crown_quest.gd</code>）完整贯穿西方王城、沼泽洞窟、玛托雅洞窟与精灵城堡，搭载四阶实物道具闭环与严密的对白异步代次锁（<code>_open_generation + 1</code>）。
      </p>

      <!-- 四阶实物道具流程图 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
        <div class="p-2.5 rounded-lg bg-slate-950/80 border border-amber-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300">第一阶段 · 寻回王冠</span>
            <n-tag size="tiny" type="warning">Item 111</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>目标：</strong>沼泽洞窟地下一层夺回失落王冠。</div>
          <div class="text-[10px] text-gray-500">国王委托自然播完立项（accept=ff1_crown_accepted）。</div>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-950/80 border border-cyan-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300">第二阶段 · 水晶之眼</span>
            <n-tag size="tiny" type="info">Item 112</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>目标：</strong>识破阿斯托斯伪装战胜获取水晶眼。</div>
          <div class="text-[10px] text-gray-500">归还玛托雅女巫以激活古老药剂秘方。</div>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-950/80 border border-emerald-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-300">第三阶段 · 苏醒神药</span>
            <n-tag size="tiny" type="success">Item 113</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>目标：</strong>携带苏醒药前往精灵城堡谒见。</div>
          <div class="text-[10px] text-gray-500">由医者唤醒沉睡数百年的精灵族储君。</div>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-950/80 border border-purple-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-300">终局阶段 · 神秘钥匙</span>
            <n-tag size="tiny" type="error">Item 114</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>奖赏：</strong>获赠传承神秘钥匙（Key Item）。</div>
          <div class="text-[10px] text-gray-500">解锁世界全域受封印王室藏宝库（complete=ff1_mystic_key）。</div>
        </div>
      </div>

      <!-- 安全收尾防线说明 -->
      <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-gray-400">
        <strong class="text-amber-300">🛡️ 接取许可安全收尾：</strong>对白结束时严格核验 <code>_open_generation + 1</code> 代次、原 owner/cycle/tree/current_scene 与宿主非排队删除状态，杜绝跨周目或换档 stale 对话回调篡改任务状态。
      </div>
    </div>

    <!-- 宁静村居民深度会话与可选回应系统 (基于 Godot NPC_OPTIONAL_INTERACTION_DESIGN_2026-10-23.md) -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-teal-950/40 border border-emerald-500/40 shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">🗣️</span>
          <h3 class="text-base sm:text-lg font-bold text-emerald-300">宁静村居民深度会话与可选回应系统 (NPC Optional Interaction Design)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="success" size="small" round>三位常驻居民试点</n-tag>
          <n-tag type="info" size="small" round>自然对白延期弹窗</n-tag>
          <n-tag type="warning" size="small" round>零状态包袱</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机引擎 2026-10-23 批准实装的【可选回应机制】。在原闲谈播完后提供温和接话机会；回应只决定本次交谈随后的回话，不强制产生任务义务、不建立好感度数值枷锁，默认焦点为“先告辞”随时可退出。
      </p>

      <!-- 三位试点 NPC 互动卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        <!-- 1. 守卫雷恩 -->
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-800/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-400">🛡️ 守卫雷恩 (Guard)</span>
            <n-tag size="tiny" type="info">npc_v_guard_gate</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>原身份：</strong>晨辉关门哨卫，关心外出者解毒药与队伍补给。</div>
          <div class="space-y-1 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
            <div><span class="text-cyan-400 font-bold">选项A：</span><span class="text-gray-300">我会先看看同伴的状态。</span></div>
            <div class="text-gray-400 pl-3">↳ 雷恩：“准备周全些，路上才少些慌张。别嫌我啰嗦。”</div>
            <div class="pt-1 border-t border-slate-800/60"><span class="text-amber-400 font-bold">选项B：</span><span class="text-gray-300">你守门时也多保重。</span></div>
            <div class="text-gray-400 pl-3">↳ 雷恩：“好，我记着。你们在外头也照应着彼此。”</div>
          </div>
        </div>

        <!-- 2. 守卫老齐 -->
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-teal-800/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-teal-400">👴 守卫老齐 (OldGuard)</span>
            <n-tag size="tiny" type="info">npc_v_guard_wall</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>原身份：</strong>城墙老卫士，经历过停战钟声，挂念归人平安。</div>
          <div class="space-y-1 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
            <div><span class="text-cyan-400 font-bold">选项A：</span><span class="text-gray-300">您最盼望什么？</span></div>
            <div class="text-gray-400 pl-3">↳ 老齐：“盼出去的人平安回来。这句话简单，守门时却总会想起。”</div>
            <div class="pt-1 border-t border-slate-800/60"><span class="text-amber-400 font-bold">选项B：</span><span class="text-gray-300">我会记得平安回来。</span></div>
            <div class="text-gray-400 pl-3">↳ 老齐：“好。这话我爱听，走远了也别忘。”</div>
          </div>
        </div>

        <!-- 3. 老农李伯 -->
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-800/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-400">🌾 老农李伯 (Farmer)</span>
            <n-tag size="tiny" type="warning">npc_v_farmer</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>原身份：</strong>村口老农，面对地脉板结仍日复一日修筑田埂。</div>
          <div class="space-y-1 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
            <div><span class="text-cyan-400 font-bold">选项A：</span><span class="text-gray-300">土这么硬，您还要忙吗？</span></div>
            <div class="text-gray-400 pl-3">↳ 李伯：“总得先把田埂修好。能稳住一点是一点，急也不能把种子急出来。”</div>
            <div class="pt-1 border-t border-slate-800/60"><span class="text-amber-400 font-bold">选项B：</span><span class="text-gray-300">您也歇一会儿吧。</span></div>
            <div class="text-gray-400 pl-3">↳ 李伯：“知道啦。手上这点事慢慢做，总比光站着发愁强。”</div>
          </div>
        </div>
      </div>

      <!-- 交互底层安全守卫 -->
      <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-gray-400 space-y-1">
        <div class="text-emerald-300 font-bold text-xs">🛡️ 对白会话底层生命周期安全断路器：</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px] text-gray-400">
          <div><strong class="text-gray-200">自然播放结束判定：</strong>仅在当前闲谈文本完整播毕才延期弹窗，中途主动取消绝不打扰。</div>
          <div><strong class="text-gray-200">默认告辞焦点：</strong>弹窗焦点默认落在“先告辞”，按取消键或点击背景无损退出。</div>
          <div><strong class="text-gray-200">弱引用防篡改：</strong>切图或换档瞬间清空会话 ticket，严禁向新场景遗留补弹幽灵弹窗。</div>
        </div>
      </div>
    </div>

    <!-- 筛选与搜索工具栏 -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121626]/80 border border-slate-800">
      <div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          v-for="cat in typeFilters"
          :key="cat.key"
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border select-none whitespace-nowrap"
          :class="activeFilter === cat.key
            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.45)]'
            : 'bg-slate-800 text-gray-200 border-slate-700 hover:(bg-slate-700 text-white)'"
          @click="activeFilter = cat.key"
        >
          <span>{{ cat.label }}</span>
          <span class="ml-1 text-[10px] opacity-80 font-mono">({{ getFilterCount(cat.key) }})</span>
        </button>
      </div>
      <div class="w-full sm:w-72">
        <n-input
          v-model:value="searchKeyword"
          placeholder="搜索任务标题 / 触发地 / 奖励..."
          clearable
          size="small"
        >
          <template #prefix>🔍</template>
        </n-input>
      </div>
    </div>

    <!-- 支线卡片网格 -->
    <div v-if="filteredSidequests.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <n-card
        v-for="quest in filteredSidequests"
        :key="quest.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base md:text-lg font-bold text-amber-300">{{ quest.title }}</span>
            <n-tag size="small" :type="quest.type === '神兵' ? 'warning' : quest.type === '悬赏讨伐' ? 'error' : 'info'">
              {{ quest.type }}
            </n-tag>
          </div>
        </template>

        <div class="space-y-3 text-sm">
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="text-gray-400">📍 发生触发地:</span>
            <span class="text-cyan-300 font-medium">{{ quest.region }}</span>
          </div>

          <div class="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div class="text-xs text-amber-400/90 mb-1 font-semibold">【前置条件与探索线索】</div>
            <div class="text-gray-300 text-xs leading-relaxed">{{ quest.trigger }}</div>
          </div>

          <div class="p-3 bg-purple-950/20 rounded border border-purple-900/30">
            <div class="text-xs text-purple-300 mb-1 font-semibold">🎁 任务奖励:</div>
            <div class="text-yellow-200 text-xs font-bold">{{ quest.reward }}</div>
          </div>

          <p class="text-gray-400 text-xs leading-relaxed">{{ quest.desc }}</p>
          <div v-if="'status' in quest" class="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div class="text-xs text-cyan-300 mb-1 font-semibold">{{ quest.status }}</div>
            <p class="text-gray-400 text-xs leading-relaxed">{{ quest.validation }}</p>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 无结果兜底 -->
    <div v-else class="text-center py-12 bg-[#121626]/60 border border-slate-800 rounded-xl space-y-2">
      <span class="text-3xl block">🔍</span>
      <p class="text-gray-300 font-bold">暂无匹配的支线探索资料</p>
      <p class="text-xs text-gray-500">可尝试重置分类筛选或清除搜索关键词</p>
      <n-button size="small" type="primary" secondary @click="resetSearch">重置筛选</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const sidequests = computed(() => gameStore.db.sidequests || [])

const activeFilter = ref('all')
const searchKeyword = ref('')

const typeFilters = [
  { key: 'all', label: '全部资料' },
  { key: 'bounty', label: '悬赏讨伐' },
  { key: 'tavern', label: '酒馆情报' },
  { key: 'relic', label: '神兵秘境' },
  { key: 'quest', label: '正式支线' }
]

const matchCategory = (quest: any, key: string) => {
  if (key === 'all') return true
  const t = String(quest.type || '')
  if (key === 'bounty') return t.includes('悬赏')
  if (key === 'tavern') return t.includes('酒馆')
  if (key === 'relic') return t.includes('神兵')
  if (key === 'quest') return t.includes('支线') || (!t.includes('悬赏') && !t.includes('酒馆') && !t.includes('神兵'))
  return false
}

const getFilterCount = (key: string) => {
  return sidequests.value.filter(q => matchCategory(q, key)).length
}

const filteredSidequests = computed(() => {
  return sidequests.value.filter(quest => {
    if (!matchCategory(quest, activeFilter.value)) return false
    if (searchKeyword.value.trim()) {
      const kw = searchKeyword.value.trim().toLowerCase()
      const t = String(quest.title || '').toLowerCase()
      const r = String(quest.region || '').toLowerCase()
      const rew = String(quest.reward || '').toLowerCase()
      const d = String(quest.desc || '').toLowerCase()
      if (!t.includes(kw) && !r.includes(kw) && !rew.includes(kw) && !d.includes(kw)) return false
    }
    return true
  })
})

const resetSearch = () => {
  activeFilter.value = 'all'
  searchKeyword.value = ''
}
</script>
