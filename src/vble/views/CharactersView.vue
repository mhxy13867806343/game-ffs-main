<template>
  <div class="characters-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="warning" size="small" round class="mb-2">Heroes & Protagonists</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-amber mb-2">英雄传记：光与暗的宿命誓约者</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm">
        晨辉骑士黎川、卫珩、白魔导昼隐、以及暗之死囚纳哈特等英雄的核心属性、宿命、官方对话立绘与终极职能
      </p>
    </div>

    <!-- 阵营切换 (高对比度夜间模式) -->
    <div class="flex justify-center">
      <div class="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1" role="group" aria-label="英雄阵营">
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
    </div>

    <!-- 英雄卡片列表 (已接入分页引擎) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <n-card
        v-for="char in paginatedList"
        :key="char.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xl font-black text-amber-300">{{ char.name }}</span>
              <span class="text-xs text-gray-400">{{ char.title }}</span>
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
        </template>

        <div class="space-y-4 text-sm">
          <div class="text-xs text-purple-300 italic border-l-2 border-purple-500/50 pl-2">
            {{ char.quote }}
          </div>

          <!-- 六维属性潜能 -->
          <div v-if="char.stats" class="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2">
            <div class="text-xs text-cyan-300 font-semibold flex items-center justify-between">
              <span>📊 基础六维潜能:</span>
              <span class="text-[10px] text-gray-500 font-mono">等级 Lv.1 基础</span>
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

          <div class="text-xs space-y-1">
            <div class="text-gray-400">⚡ 极意绝技: <strong class="text-cyan-400">{{ char.signature_skill }}</strong></div>
            <div class="text-gray-400">⚔️ 契合职业推荐:
              <span class="text-gray-200 ml-1">
                {{ char.best_jobs?.map((j: any) => j.name).join(' · ') }}
              </span>
            </div>
          </div>

          <p class="text-xs text-gray-300 leading-relaxed bg-slate-950/40 p-3 rounded border border-slate-900">
            {{ char.bio }}
          </p>

          <div class="text-[11px] text-gray-400 pt-1 border-t border-slate-800">
            🕊️ 宿命终局: <span class="text-gray-300">{{ char.ending }}</span>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 列表分页导航 (响应式与每页尺寸调节) -->
    <div v-if="filteredCharacters.length > pageSize" v-simple-page-label class="flex justify-center items-center py-4 border-t border-slate-800/80" @click.capture="captureSimplePaginationActivation" @click="preserveSimplePaginationFocus">
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
      >
        <!-- 原生按钮负责键盘激活，点击冒泡仍交由分页器处理页码与边界。 -->
        <template #prev="{ page }">
          <button type="button" class="characters-pagination-control" aria-label="上一页英雄" :disabled="page <= 1">‹</button>
        </template>
        <template #label="{ type, node, active }">
          <button
            v-if="type === 'page'"
            type="button"
            class="characters-pagination-control"
            :aria-label="`英雄第 ${node} 页`"
            :aria-current="active ? 'page' : undefined"
          >{{ node }}</button>
          <component :is="node" v-else />
        </template>
        <template #next="{ page, pageCount }">
          <button type="button" class="characters-pagination-control" aria-label="下一页英雄" :disabled="page >= pageCount">›</button>
        </template>
        <template #prefix="{ itemCount }">
          <span class="text-xs text-gray-400 mr-2">共 {{ itemCount }} 位英雄主角</span>
        </template>
      </n-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { usePagination } from '@/composables/usePagination'

const gameStore = useGameStore()
const characters = computed<Record<string, any>[]>(() => gameStore.db.characters || [])
const selectedParty = ref('all')

const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 640)

const parties = [
  { id: 'all', name: '全部英雄角色', icon: '👥' },
  { id: 'light', name: '晨辉光之战士', icon: '☀️' },
  { id: 'dark', name: '永曜暗之战士', icon: '🌙' }
]

const getPartyCount = (id: string) => {
  if (id === 'all') return characters.value.length
  return characters.value.filter((c: any) => c.party === id).length
}

const filteredCharacters = computed(() => {
  if (selectedParty.value === 'all') return characters.value
  return characters.value.filter((c: any) => c.party === selectedParty.value)
})

const {
  currentPage,
  pageSize,
  paginatedList,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination<Record<string, any>>(filteredCharacters, { pageSize: 4 })

// simple 输入未开放 input-props；局部指令在挂载和响应式切换后补到实际输入。
const labelSimplePageInput = (container: HTMLElement) => {
  container.querySelector<HTMLInputElement>('.n-pagination--simple input')
    ?.setAttribute('aria-label', '英雄目录当前页')
}
const vSimplePageLabel: Directive<HTMLElement> = {
  mounted: labelSimplePageInput,
  updated: labelSimplePageInput
}

// 只记录同一次 simple 键盘点击，普通翻页更新与鼠标操作不触发返焦。
let simplePaginationActivation: { event: MouseEvent; button: HTMLButtonElement; page: number } | null = null
const captureSimplePaginationActivation = (event: MouseEvent) => {
  simplePaginationActivation = null
  const button = event.target instanceof Element ? event.target.closest('button.characters-pagination-control') : null
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

watch(selectedParty, () => {
  resetPage()
})
</script>

<style scoped>
.characters-pagination-control {
  min-width: 28px;
  min-height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.characters-pagination-control:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}

.characters-pagination-control:disabled {
  cursor: not-allowed;
}
</style>
