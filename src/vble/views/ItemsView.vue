<template>
  <div class="items-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Items, Armors & Spells Encyclopedia</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-cyan mb-2">全域道具、防具与四大法系图鉴</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm">
        系统归纳探险补给、稀有防具头盔、白魔法、黑魔法、时空魔法与青魔法全谱系，集成权威原典考据
      </p>
    </div>

    <!-- 顶部分类标签切换 (夜间高对比度) -->
    <div class="flex justify-center">
      <div role="group" aria-label="图鉴分类" class="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1">
        <button
          v-for="tab in tabOptions"
          :key="tab.id"
          :aria-pressed="activeTab === tab.id"
          class="px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border select-none flex items-center gap-1.5"
          :class="activeTab === tab.id
            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
            : 'bg-transparent text-gray-300 border-transparent hover:(text-white bg-slate-800)'"
          @click="activeTab = tab.id"
        >
          <span>{{ tab.icon }}</span>
          <span>{{ tab.name }}</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded-full" :class="activeTab === tab.id ? 'bg-cyan-900/40 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-300'">
            {{ tab.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- 道具与消耗品卡片网格 -->
    <div v-if="activeTab === 'items'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="item in paginatedList"
        :key="item.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-cyan-300">{{ item.name }}</span>
            <n-tag size="tiny" :type="item.category === 'key' ? 'warning' : 'info'">{{ item.type }}</n-tag>
          </div>
        </template>
        <div class="space-y-2 text-xs">
          <p class="text-gray-300 leading-relaxed">{{ item.effect || item.desc }}</p>
          <div v-if="item.price" class="text-amber-400 font-mono">
            💰 市价: {{ item.price }} {{ item.price.includes('G') ? '' : 'Gil' }}
          </div>

          <!-- 目标对象与使用许可 (对齐 ItemUIUseSummary 与 ItemUITargetSwitch) -->
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] flex items-center justify-between">
            <span class="text-gray-400">🎯 使用对象：</span>
            <span class="text-cyan-300 font-medium">
              {{ item.category === 'key' ? '重要道具（剧情持有）' : item.name.includes('帐篷') || item.name.includes('小屋') ? '当前全队（限营地/大地图）' : item.name.includes('万灵') || item.name.includes('圣灵') ? '选定同伴（支持上一位/下一位循环）' : '单体同伴（支持快捷切换）' }}
            </span>
          </div>

          <!-- 原典考据 (对齐 Godot 4.3 encyclopedia_volume_data.gd _append_source_references) -->
          <div
            v-if="['104', '105', '106', '108', '109', '110', '111', '112', '113', '114'].includes(item.id)"
            class="p-2 bg-amber-950/30 border border-amber-500/40 rounded text-amber-200 space-y-0.5"
          >
            <div class="text-[10px] text-amber-400 font-bold flex items-center gap-1">
              <span>📜</span>
              <span>原典考据 (Source Identity):</span>
            </div>
            <div class="text-[10px] text-gray-300 leading-relaxed">
              作品：FF1 / 时空物语 · 版本：Pixel Remaster · 原典名称：{{ item.name.split(' ')[0] }}
            </div>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 防具与头饰卡片网格 -->
    <div v-if="activeTab === 'armors'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="armor in paginatedList"
        :key="armor.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-amber-300">{{ armor.name }}</span>
            <n-tag size="tiny" type="warning">{{ armor.type }}</n-tag>
          </div>
        </template>
        <div class="space-y-2 text-xs">
          <div class="text-red-400 font-semibold">{{ armor.stats }}</div>
          <p class="text-gray-300 leading-relaxed">{{ armor.effect }}</p>
          <div v-if="armor.job" class="text-gray-400">适配: {{ armor.job }}</div>

          <!-- 秘宝溯源与考据 -->
          <div
            v-if="armor.origin"
            class="p-2 bg-slate-900/90 border border-slate-800 rounded space-y-0.5"
          >
            <div class="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
              <span>🏰</span>
              <span>秘宝出处与溯源:</span>
            </div>
            <div class="text-[10px] text-gray-300">{{ armor.origin }}</div>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 魔法与咒术卡片网格 -->
    <div v-if="activeTab === 'magic'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="m in paginatedList"
        :key="m.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-purple-300">{{ m.name }}</span>
            <n-tag size="tiny" type="error">{{ m.type }}</n-tag>
          </div>
        </template>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between text-gray-400">
            <span>消耗: <strong class="text-cyan-300">{{ m.cost }}</strong></span>
            <span>目标: {{ m.target }}</span>
          </div>
          <p class="text-gray-300 leading-relaxed">{{ m.effect }}</p>
        </div>
      </n-card>
    </div>

    <!-- 响应式列表分页器 -->
    <div
      v-if="currentList.length > pageSize"
      v-simple-page-label
      class="flex justify-center items-center py-4 border-t border-slate-800/80"
      @click.capture="captureSimplePaginationActivation"
      @click="preserveSimplePaginationFocus"
    >
      <n-pagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :item-count="currentList.length"
        :page-sizes="[9, 18, 27]"
        :simple="isMobile"
        show-size-picker
        show-quick-jumper
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      >
        <!-- 原生按钮提供键盘激活，点击冒泡仍交由分页器维护页码与边界。 -->
        <template #prev="{ page }">
          <button type="button" class="items-pagination-control" aria-label="上一页图鉴" :disabled="page <= 1">‹</button>
        </template>
        <template #label="{ type, node, active }">
          <button
            v-if="type === 'page'"
            type="button"
            class="items-pagination-control"
            :aria-label="`图鉴第 ${node} 页`"
            :aria-current="active ? 'page' : undefined"
          >{{ node }}</button>
          <component :is="node" v-else />
        </template>
        <template #next="{ page, pageCount }">
          <button type="button" class="items-pagination-control" aria-label="下一页图鉴" :disabled="page >= pageCount">›</button>
        </template>
        <template #prefix="{ itemCount }">
          <span class="text-xs text-gray-400 mr-2">共 {{ itemCount }} 项</span>
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
const activeTab = ref<'items' | 'armors' | 'magic'>('items')

const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 640)

const items = computed(() => gameStore.db.items || [])
const armors = computed(() => gameStore.db.armors || [])
const magics = computed(() => gameStore.db.magic || [])

const tabOptions = computed(() => [
  { id: 'items' as const, name: '道具与消耗品', icon: '🧪', count: items.value.length },
  { id: 'armors' as const, name: '防具与头饰', icon: '🛡️', count: armors.value.length },
  { id: 'magic' as const, name: '魔法与咒术', icon: '✨', count: magics.value.length }
])

const currentList = computed<Record<string, any>[]>(() => {
  if (activeTab.value === 'items') return items.value
  if (activeTab.value === 'armors') return armors.value
  return magics.value
})

const {
  currentPage,
  pageSize,
  paginatedList,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination<Record<string, any>>(currentList, { pageSize: 9 })

// simple 输入未开放 input-props；局部指令在挂载和响应式切换后补到实际输入。
const labelSimplePageInput = (container: HTMLElement) => {
  container.querySelector<HTMLInputElement>('.n-pagination--simple input')
    ?.setAttribute('aria-label', '道具目录当前页')
}
const vSimplePageLabel: Directive<HTMLElement> = {
  mounted: labelSimplePageInput,
  updated: labelSimplePageInput
}

// 只记录同一次键盘原生点击；鼠标与普通页码更新继续使用原焦点行为。
let simplePaginationActivation: { event: MouseEvent; button: HTMLButtonElement; page: number } | null = null
const captureSimplePaginationActivation = (event: MouseEvent) => {
  simplePaginationActivation = null
  const button = event.target instanceof Element ? event.target.closest('button.items-pagination-control') : null
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
  // Naive 完成翻页且 Vue 更新禁用状态后，仅补救边界按钮失焦到 BODY 的情况。
  void nextTick(() => {
    const { button } = activation
    if (!isMobile.value || !button.isConnected || !button.disabled) return
    if (document.activeElement !== button && document.activeElement !== document.body) return
    container.querySelector<HTMLInputElement>('.n-pagination--simple input')?.focus({ preventScroll: true })
  })
}

watch(activeTab, () => {
  resetPage()
})
</script>

<style scoped>
.items-pagination-control {
  min-width: 28px;
  min-height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.items-pagination-control:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}

.items-pagination-control:disabled {
  cursor: not-allowed;
}
</style>
