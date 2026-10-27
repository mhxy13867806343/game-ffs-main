<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 min-h-[calc(100vh-120px)]">
    <!-- 面包屑导航与页眉 -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-400 mb-1">
          <router-link to="/vble" class="hover:text-cyan-400 transition-colors">首页</router-link>
          <span>/</span>
          <button
            v-if="currentArticle"
            type="button"
            class="news-action hover:text-cyan-400 transition-colors cursor-pointer"
            @click="clearArticleSelection"
          >
            资讯中心
          </button>
          <span v-else class="text-cyan-400 font-medium">资讯中心</span>
          <template v-if="currentArticle">
            <span>/</span>
            <span class="text-cyan-400 truncate max-w-xs">{{ currentArticle.typeLabel }}</span>
          </template>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-white text-glow-cyan flex items-center gap-2">
          <span>📢 单机档案与版本资讯</span>
          <n-tag size="small" type="primary" round strong>全域官方存档</n-tag>
        </h1>
        <p class="text-xs sm:text-sm text-gray-400 mt-1">
          掌握双月宇宙核心版本发布、大秘境通关攻略、世界风土志与单机特典特权
        </p>
      </div>

      <!-- 右侧快捷跳转 (更新日志 / 功能规划) -->
      <div class="flex items-center gap-2 shrink-0">
        <router-link
          to="/vble/updates"
          class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-xs text-gray-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
        >
          <span>🔄</span>
          <span>最新更新</span>
        </router-link>
        <router-link
          to="/vble/roadmap"
          class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-xs text-gray-300 hover:text-amber-300 transition-all flex items-center gap-1.5"
        >
          <span>🚀</span>
          <span>功能规划</span>
        </router-link>
      </div>
    </div>

    <!-- 模式 A：文章详情详情页面 -->
    <article v-if="currentArticle" class="article-detail-container space-y-6">
      <div class="bg-[#121626]/95 border border-slate-700/70 rounded-2xl p-4 sm:p-8 shadow-2xl backdrop-blur-md">
        <!-- 顶部返回与元数据行 -->
        <div class="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <button
            type="button"
            class="inline-flex items-center gap-1 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/50 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            @click="clearArticleSelection"
          >
            <span>&larr;</span>
            <span>返回资讯列表</span>
          </button>

          <div class="flex items-center gap-3 text-xs text-gray-400">
            <span class="flex items-center gap-1">
              <span>📅</span>
              <time class="font-mono text-gray-300">{{ currentArticle.date }}</time>
            </span>
            <span class="hidden sm:inline text-slate-700">|</span>
            <span class="hidden sm:flex items-center gap-1">
              <span>👁️</span>
              <span class="font-mono text-gray-300">{{ currentArticle.views.toLocaleString() }} 次阅读</span>
            </span>
          </div>
        </div>

        <!-- 文章主标题 -->
        <div class="space-y-3 mb-6">
          <div class="flex flex-wrap items-center gap-2">
            <n-tag :type="currentArticle.tagType" size="small" round strong>
              {{ currentArticle.typeLabel }}
            </n-tag>
            <n-tag v-if="currentArticle.isHot" type="error" size="small" round strong>
              🔥 热门推荐
            </n-tag>
            <span class="text-xs text-cyan-400/80 font-mono">
              预计阅读时长: {{ currentArticle.readTime }}
            </span>
          </div>

          <h1 ref="articleHeading" tabindex="-1" class="article-heading text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
            {{ currentArticle.title }}
          </h1>

          <div class="flex items-center gap-3 text-xs text-gray-400 pt-1">
            <span>发布作者: <strong class="text-amber-300 font-semibold">{{ currentArticle.author }}</strong></span>
            <span>•</span>
            <span>单机运行环境: <span class="text-cyan-400 font-mono font-semibold">Godot 4.6 Offline</span></span>
          </div>
        </div>

        <!-- 导读/摘要引言卡片 -->
        <div
          v-if="currentArticle.summary"
          class="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-purple-950/30 border border-cyan-800/40 text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 italic"
        >
          <div class="flex items-start gap-2">
            <span class="text-cyan-400 text-base leading-none">❝</span>
            <p>{{ currentArticle.summary }}</p>
          </div>
        </div>

        <!-- 正文渲染区 -->
        <div class="article-content-body text-gray-200 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
          <div v-html="formattedContent"></div>
        </div>

        <!-- 底部互动与版权声明 -->
        <div class="mt-10 pt-6 border-t border-slate-800 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-gray-200 transition-colors flex items-center gap-1 cursor-pointer border border-slate-700"
              @click="copyArticleLink"
            >
              <span>🔗</span>
              <span>复制文章链接</span>
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-gray-200 transition-colors cursor-pointer border border-slate-700"
              @click="clearArticleSelection"
            >
              查看更多单机档案 &rarr;
            </button>
          </div>
          <div class="text-center sm:text-right text-[11px] text-gray-500">
            © 最终幻想：时空之轮 · 单机离线数据库官方认证归档
          </div>
        </div>
      </div>

      <!-- 底部推荐阅读 -->
      <div class="related-articles-section bg-[#121626]/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <h3 class="text-sm sm:text-base font-bold text-gray-200 flex items-center gap-2">
          <span>📚 相关档案推荐</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="rel in relatedArticles"
            :key="rel.id"
            class="news-action p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all hover:bg-slate-900 flex items-center justify-between gap-3 group"
            :id="`related-article-${rel.id}`"
            role="button"
            tabindex="0"
            :aria-label="`阅读文章：${rel.title}`"
            @click="selectArticle(rel.id, $event)"
            @keydown.enter.prevent="selectArticle(rel.id, $event)"
            @keydown.space.prevent
            @keyup.space.prevent="selectArticle(rel.id, $event)"
          >
            <div class="overflow-hidden">
              <div class="flex items-center gap-2 mb-1">
                <n-tag size="tiny" :type="rel.tagType">{{ rel.typeLabel }}</n-tag>
                <span class="text-[11px] text-gray-400 font-mono">{{ rel.date }}</span>
              </div>
              <div class="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-cyan-300 truncate">
                {{ rel.title }}
              </div>
            </div>
            <span class="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0">&rarr;</span>
          </div>
        </div>
      </div>
    </article>

    <!-- 模式 B：全量资讯列表与分类筛选 -->
    <div v-else ref="newsList" tabindex="-1" class="news-list-container space-y-6">
      <!-- 顶部过滤控制器：高对比度分类标签栏 + 搜索框 -->
      <div class="bg-[#121626]/90 border border-slate-700/60 rounded-2xl p-3 sm:p-4 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
        <!-- 分类切换标签栏 (高对比度夜间高亮优化) -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
          <button
            v-for="cat in categoryList"
            :key="cat.id"
            type="button"
            :aria-pressed="activeCategory === cat.id"
            class="news-action px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 whitespace-nowrap select-none"
            :class="activeCategory === cat.id
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
              : 'bg-slate-800/90 text-gray-200 border-slate-700 hover:(bg-slate-700 text-white border-slate-500)'"
            @click="handleCategoryChange(cat.id)"
          >
            <span>{{ cat.name }}</span>
            <span
              class="text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold"
              :class="activeCategory === cat.id ? 'bg-cyan-900/30 text-slate-950' : 'bg-slate-900/90 text-cyan-300 border border-slate-700'"
            >
              {{ getCategoryCount(cat.id) }}
            </span>
          </button>
        </div>

        <!-- 关键词搜索输入框 -->
        <div class="w-full md:w-64">
          <n-input
            v-model:value="searchKeyword"
            placeholder="搜索资讯标题、攻略关键词..."
            clearable
            size="small"
            round
          >
            <template #prefix>
              <span class="text-gray-400">🔍</span>
            </template>
          </n-input>
        </div>
      </div>

      <!-- 热门精选大横幅 (全部标签且第一页时展示) -->
      <div
        v-if="featuredArticle && activeCategory === 'all' && !searchKeyword && currentPage === 1"
        class="news-action headline-banner p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900/90 to-cyan-950/40 border border-red-900/40 hover:border-red-500/50 cursor-pointer transition-all shadow-xl group"
        :id="`featured-article-${featuredArticle.id}`"
        role="button"
        tabindex="0"
        :aria-label="`阅读文章：${featuredArticle.title}`"
        @click="selectArticle(featuredArticle.id, $event)"
        @keydown.enter.prevent="selectArticle(featuredArticle.id, $event)"
        @keydown.space.prevent
        @keyup.space.prevent="selectArticle(featuredArticle.id, $event)"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <n-tag type="error" size="small" round strong>精选头条</n-tag>
              <n-tag :type="featuredArticle.tagType" size="small" round>{{ featuredArticle.typeLabel }}</n-tag>
              <span class="text-xs text-amber-300 font-mono">{{ featuredArticle.date }}</span>
              <span class="text-xs text-gray-400 font-mono">· {{ featuredArticle.views.toLocaleString() }} 阅读</span>
            </div>
            <h2 class="text-base sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
              {{ featuredArticle.title }}
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 line-clamp-2 max-w-3xl">
              {{ featuredArticle.summary }}
            </p>
          </div>
          <div class="shrink-0 flex items-center gap-1 text-amber-400 text-xs font-bold group-hover:translate-x-1 transition-transform">
            <span>阅读全文</span>
            <span>&rarr;</span>
          </div>
        </div>
      </div>

      <!-- 资讯卡片列表 (已接入分页) -->
      <div v-if="filteredArticleList.length > 0" class="space-y-4">
        <div class="grid grid-cols-1 gap-3">
          <div
            v-for="item in paginatedArticleList"
            :key="item.id"
            class="news-action news-card p-3.5 sm:p-4 rounded-xl bg-[#121626]/80 hover:bg-[#161c30] border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            :id="`news-article-${item.id}`"
            role="button"
            tabindex="0"
            :aria-label="`阅读文章：${item.title}`"
            @click="selectArticle(item.id, $event)"
            @keydown.enter.prevent="selectArticle(item.id, $event)"
            @keydown.space.prevent
            @keyup.space.prevent="selectArticle(item.id, $event)"
          >
            <div class="space-y-1.5 overflow-hidden flex-1">
              <div class="flex items-center gap-2">
                <n-tag size="tiny" :type="item.tagType" round strong>{{ item.typeLabel }}</n-tag>
                <span v-if="item.isHot" class="px-1.5 py-0.2 rounded bg-red-950/80 text-red-400 border border-red-800 text-[10px] font-bold">
                  HOT
                </span>
                <span class="text-xs text-gray-400 font-mono">{{ item.date }}</span>
                <span class="hidden sm:inline text-slate-700">·</span>
                <span class="hidden sm:inline text-[11px] text-gray-400">{{ item.author }}</span>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-gray-100 group-hover:text-cyan-300 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-xs text-gray-400 line-clamp-1">
                {{ item.summary }}
              </p>
            </div>

            <div class="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
              <span class="text-[11px] text-gray-500 font-mono sm:hidden">
                {{ item.views.toLocaleString() }} 阅读
              </span>
              <div class="flex items-center gap-1 text-cyan-400 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                <span>查看详情</span>
                <span>&rarr;</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Naive UI 精美分页器 (居中展示，支持响应式自适应) -->
        <div v-if="filteredArticleList.length > pageSize" class="flex justify-center items-center py-5 border-t border-slate-800/80" @click.capture="captureSimplePaginationActivation" @click="preserveSimplePaginationFocus">
          <n-pagination
            v-model:page="currentPage"
            v-model:page-size="pageSize"
            :item-count="filteredArticleList.length"
            :page-sizes="[6, 10, 20]"
            :simple="isMobile"
            show-size-picker
            show-quick-jumper
            @update:page="handlePageChange"
            @update:page-size="handlePageSizeChange"
          >
            <!-- 原生按钮提供键盘激活，点击冒泡仍交由分页器维护页码与边界。 -->
            <template #prev="{ page }">
              <button type="button" class="news-pagination-control" aria-label="上一页资讯" :disabled="page <= 1">‹</button>
            </template>
            <template #label="{ type, node, active }">
              <button
                v-if="type === 'page'"
                type="button"
                class="news-pagination-control"
                :aria-label="`资讯第 ${node} 页`"
                :aria-current="active ? 'page' : undefined"
              >{{ node }}</button>
              <component :is="node" v-else />
            </template>
            <template #next="{ page, pageCount }">
              <button type="button" class="news-pagination-control" aria-label="下一页资讯" :disabled="page >= pageCount">›</button>
            </template>
            <template #prefix="{ itemCount }">
              <span class="text-xs text-gray-300 mr-2 font-medium">共 {{ itemCount }} 篇单机档案</span>
            </template>
          </n-pagination>
        </div>
      </div>

      <!-- 无搜索结果兜底 -->
      <div
        v-else
        class="p-12 text-center rounded-2xl bg-[#121626]/60 border border-slate-800 space-y-3"
      >
        <span class="text-4xl block">🔍</span>
        <h4 class="text-base font-bold text-gray-300">暂未搜索到符合条件的单机档案</h4>
        <p class="text-xs text-gray-500 max-w-sm mx-auto">
          请尝试更换搜索关键词，或切换至「全部」分类浏览全量档案。
        </p>
        <n-button size="small" type="primary" secondary @click="resetFilters">
          重置筛选条件
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { homeNewsList } from '../config/homePortalConfig'
import type { NewsArticle } from '../config/homePortalConfig'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 640)

// 分类体系：全部、版本、攻略、世界、特权、更新、规划 (精准对齐用户需求)
const categoryList = [
  { id: 'all', name: '全部' },
  { id: 'version', name: '版本' },
  { id: 'strategy', name: '攻略' },
  { id: 'world', name: '世界' },
  { id: 'privilege', name: '特权' },
  { id: 'update', name: '更新' },
  { id: 'roadmap', name: '规划' }
]

const activeCategory = ref('all')
const searchKeyword = ref('')
const selectedArticleId = ref<string | null>(null)
const articleHeading = ref<HTMLElement | null>(null)
const newsList = ref<HTMLElement | null>(null)
let lastArticleTriggerId: string | null = null

// 获取当前分类的文章数量
const getCategoryCount = (catId: string) => {
  if (catId === 'all') return homeNewsList.length
  return homeNewsList.filter(item => {
    if (item.category === catId) return true
    if (catId === 'version' && (item.type === 'notice' || item.typeLabel === '版本' || item.typeLabel === '优化')) return true
    if (catId === 'strategy' && (item.type === 'strategy' || item.typeLabel === '攻略')) return true
    if (catId === 'world' && (item.type === 'news' || item.typeLabel === '世界')) return true
    if (catId === 'privilege' && (item.type === 'act' || item.typeLabel === '特权' || item.typeLabel === '深渊')) return true
    if (catId === 'update' && item.typeLabel === '更新') return true
    if (catId === 'roadmap' && item.typeLabel === '规划') return true
    return false
  }).length
}

// 筛选后的文章全集
const filteredArticleList = computed(() => {
  return homeNewsList.filter(item => {
    // 1. 分类匹配
    if (activeCategory.value !== 'all') {
      const matchCat = item.category === activeCategory.value
      const matchLegacyType =
        (activeCategory.value === 'version' && (item.type === 'notice' || item.typeLabel === '版本' || item.typeLabel === '优化')) ||
        (activeCategory.value === 'strategy' && (item.type === 'strategy' || item.typeLabel === '攻略')) ||
        (activeCategory.value === 'world' && (item.type === 'news' || item.typeLabel === '世界')) ||
        (activeCategory.value === 'privilege' && (item.type === 'act' || item.typeLabel === '特权' || item.typeLabel === '深渊')) ||
        (activeCategory.value === 'update' && item.typeLabel === '更新') ||
        (activeCategory.value === 'roadmap' && item.typeLabel === '规划')

      if (!matchCat && !matchLegacyType) return false
    }

    // 2. 关键词匹配
    if (searchKeyword.value.trim()) {
      const kw = searchKeyword.value.trim().toLowerCase()
      const inTitle = item.title.toLowerCase().includes(kw)
      const inSummary = item.summary.toLowerCase().includes(kw)
      const inAuthor = item.author.toLowerCase().includes(kw)
      const inContent = item.content.toLowerCase().includes(kw)
      if (!inTitle && !inSummary && !inAuthor && !inContent) return false
    }

    return true
  })
})

// 分页逻辑集成
const {
  currentPage,
  pageSize,
  paginatedList: paginatedArticleList,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination(filteredArticleList, { pageSize: 6, scrollTarget: '.news-list-container' })

// 暂存同一次原生点击的起点，避免给普通页码更新或鼠标操作追加移焦。
let simplePaginationActivation: { event: MouseEvent; button: HTMLButtonElement; page: number } | null = null
const captureSimplePaginationActivation = (event: MouseEvent) => {
  simplePaginationActivation = null
  const button = event.target instanceof Element ? event.target.closest('button.news-pagination-control') : null
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
  // 包装层冒泡发生在 Naive UI 原翻页之后；再等 Vue 更新，才检查按钮是否因到边界禁用。
  void nextTick(() => {
    const { button } = activation
    if (!isMobile.value || !button.isConnected || !button.disabled) return
    // 禁用按钮可能退焦到 BODY；若其他控件已接管焦点，不能把它抢回来。
    if (document.activeElement !== button && document.activeElement !== document.body) return
    container.querySelector<HTMLInputElement>('.n-pagination--simple input')?.focus({ preventScroll: true })
  })
}

// 搜索关键词变动时重置回第一页
watch(searchKeyword, () => {
  resetPage()
})

// 头条精选
const featuredArticle = computed(() => {
  return homeNewsList.find(item => item.isHot) || homeNewsList[0]
})

// 当前查看的文章
const currentArticle = computed<NewsArticle | null>(() => {
  if (!selectedArticleId.value) return null
  return homeNewsList.find(a => a.id === selectedArticleId.value) || null
})

// 详情替换列表后把焦点交给正文标题；返回时回到原入口，保留分页与筛选状态。
watch(currentArticle, (article) => {
  if (article) {
    articleHeading.value?.focus({ preventScroll: true })
  } else {
    const trigger = lastArticleTriggerId ? document.getElementById(lastArticleTriggerId) : null
    const focusTarget = trigger || newsList.value
    focusTarget?.focus({ preventScroll: true })
  }
}, { flush: 'post' })

// 相关文章推荐
const relatedArticles = computed(() => {
  if (!currentArticle.value) return []
  return homeNewsList
    .filter(a => a.id !== currentArticle.value?.id)
    .slice(0, 4)
})

// 正文渲染：轻量 Markdown 转 HTML 解析 (标题、粗体、代码块、列表、表格)
const formattedContent = computed(() => {
  if (!currentArticle.value?.content) return ''
  let raw = currentArticle.value.content.trim()

  // 标题
  raw = raw.replace(/^#### (.*$)/gim, '<h4 class="text-base font-bold text-amber-300 mt-5 mb-2">$1</h4>')
  raw = raw.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-cyan-300 mt-6 mb-3 border-b border-slate-800 pb-2">$1</h3>')
  raw = raw.replace(/^## (.*$)/gim, '<h2 class="text-xl font-black text-white mt-8 mb-4 border-b border-cyan-500/30 pb-2">$1</h2>')

  // 粗体
  raw = raw.replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-300 font-semibold">$1</strong>')

  // 行内代码
  raw = raw.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">$1</code>')

  // 无序列表与有序列表处理
  raw = raw.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-gray-300 my-1">$1</li>')
  raw = raw.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-4 list-decimal text-gray-300 my-1.5">$1</li>')

  // 表格简易渲染
  if (raw.includes('|')) {
    const lines = raw.split('\n')
    let inTable = false
    const processedLines = lines.map(line => {
      const trimmed = line.trim()
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        if (trimmed.includes('---')) {
          return ''
        }
        const cells = trimmed
          .split('|')
          .slice(1, -1)
          .map(c => c.trim())

        if (!inTable) {
          inTable = true
          const ths = cells.map(c => `<th class="border border-slate-700 bg-slate-800/80 px-3 py-2 text-left font-bold text-cyan-300 text-xs">${c}</th>`).join('')
          return `<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-slate-700 text-xs"><thead><tr>${ths}</tr></thead><tbody>`
        } else {
          const tds = cells.map(c => `<td class="border border-slate-800 bg-slate-900/60 px-3 py-2 text-gray-300">${c}</td>`).join('')
          return `<tr>${tds}</tr>`
        }
      } else {
        if (inTable) {
          inTable = false
          return `</tbody></table></div>\n` + (trimmed ? `<p class="my-2 leading-relaxed">${trimmed}</p>` : '')
        }
        return trimmed ? `<p class="my-2 leading-relaxed">${trimmed}</p>` : ''
      }
    })
    if (inTable) {
      processedLines.push('</tbody></table></div>')
    }
    raw = processedLines.join('\n')
  } else {
    raw = raw
      .split('\n\n')
      .map(p => (p.startsWith('<') ? p : `<p class="my-2 leading-relaxed">${p}</p>`))
      .join('\n')
  }

  return raw
})

// 选择文章，进入详情页
const selectArticle = (id: string, event?: Event) => {
  const trigger = event?.currentTarget as HTMLElement | null
  if (trigger?.closest('.news-list-container')) {
    lastArticleTriggerId = trigger.id
  }
  selectedArticleId.value = id
  // 分类随详情地址保留，刷新或分享后返回列表仍能恢复原目录。
  router.push({ path: `/news/${id}`, query: activeCategory.value !== 'all' ? { category: activeCategory.value } : undefined })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 清除文章选择，返回列表
const clearArticleSelection = () => {
  selectedArticleId.value = null
  router.push({ path: '/vble/news', query: activeCategory.value !== 'all' ? { category: activeCategory.value } : undefined })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 切换分类
const handleCategoryChange = (catId: string) => {
  activeCategory.value = catId
  resetPage()
  if (selectedArticleId.value) {
    selectedArticleId.value = null
  }
  router.replace({ path: '/news', query: catId !== 'all' ? { category: catId } : undefined })
}

// 重置筛选
const resetFilters = () => {
  activeCategory.value = 'all'
  searchKeyword.value = ''
  resetPage()
  router.replace({ path: '/news' })
}

// 复制链接 (Naive UI Message 提示)
const copyArticleLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    message.success('已成功复制当前单机档案链接！')
  } catch {
    message.info(window.location.href)
  }
}

// 监听路由参数变化以同步详情展示
const syncStateFromRoute = () => {
  const paramId = route.params.id as string | undefined
  const queryId = route.query.id as string | undefined
  const queryCat = route.query.category as string | undefined

  if (paramId) {
    selectedArticleId.value = paramId
  } else if (queryId) {
    selectedArticleId.value = queryId
  } else {
    selectedArticleId.value = null
  }

  // 无分类或非法分类明确回全部，避免同组件导航沿用上一目录。
  activeCategory.value = queryCat && categoryList.some(c => c.id === queryCat) ? queryCat : 'all'
}

watch(() => route.fullPath, () => {
  syncStateFromRoute()
})

onMounted(() => {
  syncStateFromRoute()
})
</script>

<style scoped>
.news-action:focus-visible,
.news-pagination-control:focus-visible,
.article-heading:focus-visible,
.news-list-container:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}

.news-pagination-control {
  min-width: 28px;
  min-height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.news-pagination-control:disabled {
  cursor: not-allowed;
}
</style>
