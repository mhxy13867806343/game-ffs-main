<template>
  <header class="sticky top-0 z-[1000] bg-[#0b101d]/95 backdrop-blur-md border-b border-cyan-500/25 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
    <div class="max-w-[1560px] mx-auto px-3 py-1.5 md:(px-4 py-2 flex-row items-center justify-between gap-3) flex flex-col gap-1.5">
      <!-- 第一行（移动端品牌与右侧搜索）/ 桌面端左侧品牌 -->
      <div class="flex items-center justify-between w-full md:(w-auto flex-shrink-0)">
        <div class="flex items-center gap-2 flex-shrink-0">
          <!-- 返回主站门户链接 -->
          <router-link
            to="/"
            class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-600/50 no-underline transition-all shadow-sm"
            title="返回 GAME FFS 游戏首页"
          >
            <span class="text-amber-400 font-bold">‹</span>
            <span class="font-medium">返回大厅</span>
          </router-link>

          <!-- 品牌标识 -->
          <router-link to="/vble" class="flex items-center no-underline text-white gap-2 flex-shrink-0">
            <span class="text-xl md:text-2xl filter drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]">🔮</span>
            <div class="flex flex-col">
              <span class="font-black text-sm md:text-base tracking-wide text-amber-400 whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">最终幻想：时空之轮</span>
              <span class="text-[9px] md:text-[10px] text-cyan-400 tracking-wider md:tracking-widest font-semibold">CHRONO TWILIGHT</span>
            </div>
          </router-link>
        </div>

        <!-- 移动端右侧：全谱大典抽屉 + 搜索快捷按钮 -->
        <div class="md:hidden flex items-center gap-1.5">
          <n-button
            size="tiny"
            circle
            secondary
            type="warning"
            title="打开全谱分类大典"
            @click="isCategoryDrawerOpen = true"
          >
            📑
          </n-button>
          <n-input
            v-if="isMobileSearchOpen"
            v-model:value="quickSearchText"
            placeholder="搜寻档案..."
            size="tiny"
            round
            clearable
            style="width: 110px;"
            @keydown.enter="handleSearch"
          />
          <n-button
            size="tiny"
            circle
            secondary
            type="primary"
            @click="toggleMobileSearch"
          >
            🔍
          </n-button>
          <n-button
            size="tiny"
            circle
            secondary
            :type="isCrtFilterActive ? 'warning' : 'default'"
            :title="isCrtFilterActive ? 'CRT复古扫描线滤镜 (已开启)' : 'CRT复古扫描线滤镜 (已关闭)'"
            @click="toggleCrtFilter"
          >
            📺
          </n-button>
        </div>
      </div>

      <!-- 左右平滑滚动导航区域 (带渐变边缘遮罩、拖拽滑动与点击即刻居中) -->
      <div class="w-full md:(flex-1 w-auto mx-2.5) flex items-center min-w-0 relative bg-slate-900/70 rounded-xl px-1.5 py-1 border border-cyan-500/15">
        <!-- 左滚动按钮 (有可滚内容时高亮) -->
        <button
          class="w-7 h-[30px] flex items-center justify-center rounded-md cursor-pointer text-xl leading-none transition-all flex-shrink-0 p-0 z-2 select-none border"
          :class="canScrollLeft
            ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 hover:(bg-cyan-500/45 text-white shadow-[0_0_12px_rgba(0,243,255,0.7)] scale-108)'
            : 'opacity-25 cursor-not-allowed pointer-events-none border-cyan-500/20 text-cyan-600'"
          :disabled="!canScrollLeft"
          @click="scrollNav('left')"
          title="向左平滑滚动"
        >
          ‹
        </button>

        <!-- 滚动轨道 (支持滚轮 + 触摸滑动 + 鼠标抓取拖拽) -->
        <div
          ref="scrollTrackRef"
          class="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth flex items-center mx-1.5 cursor-grab [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mask-[linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]"
          :class="{ '!cursor-grabbing !scroll-auto select-none': isMouseDown }"
          @scroll.passive="updateScrollButtons"
          @wheel.passive="handleWheel"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseUp"
        >
          <div class="inline-flex items-center gap-1.5 px-[30px] py-0.5">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="nav-item text-slate-300 no-underline text-xs md:text-sm font-medium px-2.5 py-1 md:(px-3 py-1.5) rounded-md md:rounded-lg transition-all inline-flex items-center gap-1 flex-shrink-0 bg-white/4 border border-white/6 select-none hover:(text-cyan-400 bg-cyan-400/15 border-cyan-400/45)"
              active-class="!text-cyan-400 !bg-cyan-400/25 !border-cyan-400 font-bold shadow-[0_0_12px_rgba(0,243,255,0.4)]"
              @click="handleItemClick($event)"
            >
              <span v-if="item.icon" class="text-sm">{{ item.icon }}</span>
              <span>{{ item.title }}</span>
              <span v-if="item.badge" class="text-[10px] px-1 py-0.5 rounded bg-amber-500/25 text-amber-400 border border-amber-500/40 font-bold leading-none">{{ item.path === '/monsters' ? `${monsterCount}怪` : item.badge }}</span>
            </router-link>
          </div>
        </div>

        <!-- 右滚动按钮 (有可滚内容时高亮) -->
        <button
          class="w-7 h-[30px] flex items-center justify-center rounded-md cursor-pointer text-xl leading-none transition-all flex-shrink-0 p-0 z-2 select-none border"
          :class="canScrollRight
            ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 hover:(bg-cyan-500/45 text-white shadow-[0_0_12px_rgba(0,243,255,0.7)] scale-108)'
            : 'opacity-25 cursor-not-allowed pointer-events-none border-cyan-500/20 text-cyan-600'"
          :disabled="!canScrollRight"
          @click="scrollNav('right')"
          title="向右平滑滚动"
        >
          ›
        </button>
      </div>

      <!-- 桌面端右侧快速操作区 (包含全谱总揽按钮 + 搜索框) -->
      <div class="hidden md:flex items-center gap-2 flex-shrink-0">
        <!-- 全谱分类大典快捷唤醒按钮 -->
        <n-button
          type="warning"
          size="small"
          secondary
          round
          class="text-xs font-semibold"
          @click="isCategoryDrawerOpen = true"
        >
          📑 全谱总览
        </n-button>

        <n-input
          v-model:value="quickSearchText"
          placeholder="搜寻图鉴/剧情..."
          size="small"
          round
          clearable
          style="width: 140px;"
          @keydown.enter="handleSearch"
        >
          <template #prefix>🔍</template>
        </n-input>

        <n-button type="primary" size="small" secondary round @click="handleSearch">
          搜寻
        </n-button>

        <n-button
          size="small"
          secondary
          round
          :type="isCrtFilterActive ? 'warning' : 'default'"
          :title="isCrtFilterActive ? 'CRT复古扫描线滤镜已开启 (对齐 Godot 引擎 crt_filter.gd)' : '开启 CRT 复古扫描线滤镜'"
          @click="toggleCrtFilter"
        >
          📺 CRT滤镜
        </n-button>
      </div>
    </div>

    <!-- 全谱导航分类抽屉 (移动端自适应全宽，避免溢出截断) -->
    <n-drawer v-model:show="isCategoryDrawerOpen" :width="drawerWidth" placement="right">
      <n-drawer-content title="🔮 最终幻想：时空之轮 · 全景矩阵导航大典" closable class="bg-[#0b101d]">
        <div class="space-y-6 text-xs text-gray-300">
          <p class="text-gray-400">
            涵盖全单机 JRPG 18卷架构白皮书、全域场景、{{ monsterCount }}种魔物大图鉴、255级属性修改器及战斗深度法则：
          </p>

          <!-- 分组 1: 核心与世界探索 -->
          <div class="space-y-2">
            <h4 class="text-cyan-400 font-bold text-sm flex items-center gap-1.5 border-b border-slate-800 pb-1">
              <span>🗺️</span>
              <span>世界场景、地貌与剧情编年史</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <router-link
                v-for="i in worldNavItems"
                :key="i.path"
                :to="i.path"
                class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-400 transition-all flex items-center justify-between"
                @click="isCategoryDrawerOpen = false"
              >
                <div class="flex items-center gap-1.5">
                  <span>{{ i.icon }}</span>
                  <span class="font-medium text-gray-200">{{ i.title }}</span>
                </div>
                <n-tag v-if="i.badge" size="tiny" type="info">{{ i.path === '/monsters' ? `${monsterCount}怪` : i.badge }}</n-tag>
              </router-link>
            </div>
          </div>

          <!-- 分组 2: 魔物、首领与战斗法则 -->
          <div class="space-y-2">
            <h4 class="text-rose-400 font-bold text-sm flex items-center gap-1.5 border-b border-slate-800 pb-1">
              <span>⚔️</span>
              <span>战斗法则、魔物图鉴与首领攻坚</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <router-link
                v-for="i in tacticsNavItems"
                :key="i.path"
                :to="i.path"
                class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-rose-400 transition-all flex items-center justify-between"
                @click="isCategoryDrawerOpen = false"
              >
                <div class="flex items-center gap-1.5">
                  <span>{{ i.icon }}</span>
                  <span class="font-medium text-gray-200">{{ i.title }}</span>
                </div>
                <n-tag v-if="i.badge" size="tiny" :type="i.badge.includes('GM') ? 'error' : 'warning'">{{ i.badge }}</n-tag>
              </router-link>
            </div>
          </div>

          <!-- 分组 3: 装备、职业、系统与画廊 -->
          <div class="space-y-2">
            <h4 class="text-amber-400 font-bold text-sm flex items-center gap-1.5 border-b border-slate-800 pb-1">
              <span>⚙️</span>
              <span>神兵矩阵、调合工坊与深渊系统</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <router-link
                v-for="i in systemNavItems"
                :key="i.path"
                :to="i.path"
                class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-amber-400 transition-all flex items-center justify-between"
                @click="isCategoryDrawerOpen = false"
              >
                <div class="flex items-center gap-1.5">
                  <span>{{ i.icon }}</span>
                  <span class="font-medium text-gray-200">{{ i.title }}</span>
                </div>
                <n-tag v-if="i.badge" size="tiny" type="default">{{ i.badge }}</n-tag>
              </router-link>
            </div>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </header>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'
import { navItems } from '../config/navigation'

const router = useRouter()
const route = useRoute()
const gameStore = useGameStore()
const monsterCount = computed(() => (gameStore.db.monsters || []).length)
const { isCrtFilterActive, toggleCrtFilter } = useCrtFilter()
const { width: windowWidth } = useWindowSize()

const drawerWidth = computed(() => {
  return windowWidth.value < 640 ? '100%' : Math.min(520, windowWidth.value - 24)
})

const quickSearchText = ref('')
const isMobileSearchOpen = ref(false)
const isCategoryDrawerOpen = ref(false)
const scrollTrackRef = ref<HTMLElement | null>(null)

// 滚动按钮可用状态
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

// 按类别分组导航
const worldNavItems = computed(() => navItems.filter(i => i.category === 'world' || i.category === 'core'))
const tacticsNavItems = computed(() => navItems.filter(i => i.category === 'tactics'))
const systemNavItems = computed(() => navItems.filter(i => i.category === 'system'))

// 检查滚动位置并更新左右箭头的高亮/禁用状态
const updateScrollButtons = () => {
  if (!scrollTrackRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollTrackRef.value
  canScrollLeft.value = scrollLeft > 6
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 6
}

// 精确将指定元素平滑居中展示在导航轨道中央
const centerElement = (el: HTMLElement) => {
  if (!scrollTrackRef.value || !el) return
  const track = scrollTrackRef.value
  const trackWidth = track.clientWidth
  const elOffsetLeft = el.offsetLeft
  const elWidth = el.offsetWidth

  // 计算居中偏移量，使点击元素刚好居于轨道中央
  const targetScrollLeft = elOffsetLeft - (trackWidth / 2) + (elWidth / 2)

  track.scrollTo({
    left: Math.max(0, targetScrollLeft),
    behavior: 'smooth'
  })
  setTimeout(updateScrollButtons, 350)
}

// 点击导航项时立即执行居中平移动画
const handleItemClick = (e: MouseEvent) => {
  if (hasDragged) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  const target = e.currentTarget as HTMLElement
  if (target) {
    centerElement(target)
  }
}

// 自动居中当前激活路由链接（防止被箭头遮挡或截断）
const scrollToActiveItem = () => {
  nextTick(() => {
    if (!scrollTrackRef.value) return
    const activeEl = scrollTrackRef.value.querySelector('.router-link-exact-active, .router-link-active') as HTMLElement
    if (activeEl) {
      centerElement(activeEl)
    } else {
      updateScrollButtons()
    }
  })
}

// 监听路由改变自动居中
watch(() => route.path, () => {
  scrollToActiveItem()
}, { immediate: true })

onMounted(() => {
  setTimeout(() => {
    scrollToActiveItem()
    updateScrollButtons()
  }, 200)
  window.addEventListener('resize', updateScrollButtons)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScrollButtons)
})

// 左右水平平滑滚动 (滚动可视宽度的 60%)
const scrollNav = (direction: 'left' | 'right') => {
  if (scrollTrackRef.value) {
    const delta = (scrollTrackRef.value.clientWidth * 0.6) * (direction === 'left' ? -1 : 1)
    scrollTrackRef.value.scrollBy({ left: delta, behavior: 'smooth' })
    setTimeout(updateScrollButtons, 350)
  }
}

// 滚轮横向滚动支持
const handleWheel = (e: WheelEvent) => {
  if (scrollTrackRef.value) {
    scrollTrackRef.value.scrollLeft += (e.deltaY || e.deltaX) * 0.8
    updateScrollButtons()
  }
}

// 鼠标拖拽横向滚动支持
let isMouseDown = false
let startX = 0
let scrollLeftStart = 0
let hasDragged = false

const handleMouseDown = (e: MouseEvent) => {
  if (!scrollTrackRef.value) return
  isMouseDown = true
  hasDragged = false
  startX = e.pageX - scrollTrackRef.value.offsetLeft
  scrollLeftStart = scrollTrackRef.value.scrollLeft
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isMouseDown || !scrollTrackRef.value) return
  e.preventDefault()
  const x = e.pageX - scrollTrackRef.value.offsetLeft
  const walk = (x - startX) * 1.4
  if (Math.abs(walk) > 4) {
    hasDragged = true
  }
  scrollTrackRef.value.scrollLeft = scrollLeftStart - walk
  updateScrollButtons()
}

const handleMouseUp = () => {
  isMouseDown = false
}

const toggleMobileSearch = () => {
  if (isMobileSearchOpen.value && quickSearchText.value.trim()) {
    handleSearch()
  } else {
    isMobileSearchOpen.value = !isMobileSearchOpen.value
  }
}

const handleSearch = () => {
  if (quickSearchText.value.trim()) {
    gameStore.searchQuery = quickSearchText.value.trim()
    router.push({ path: '/vble/search', query: { q: quickSearchText.value.trim() } })
  } else {
    router.push('/vble/search')
  }
}
</script>
