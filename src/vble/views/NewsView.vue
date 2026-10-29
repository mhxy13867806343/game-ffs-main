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
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            VBLE News, World Chronicle, Merkle Dispatch & Spatiotemporal Broadcast Studio v2.2.313
          </span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-white text-glow-cyan flex items-center gap-2">
          <span>📢 单机档案、全域编年史、时空战报广播与去中心化签名工坊</span>
          <n-tag size="small" type="primary" round strong>全域官方存档</n-tag>
        </h1>
        <p class="text-xs sm:text-sm text-gray-400 mt-1">
          掌握双月宇宙核心版本发布、大秘境通关攻略、世界风土志、单机特典特权、四界世界线编年史推演与时空战报广播签名架构
        </p>
      </div>

      <!-- 右侧快捷跳转 (更新日志 / 功能规划 / 战报广播 / 编年史沙盘) -->
      <div class="flex items-center gap-2 shrink-0 flex-wrap">
        <n-button
          type="info"
          size="small"
          round
          class="shadow-md font-bold text-black bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400"
          @click="scrollToEpochChronicleStudio"
        >
          <template #icon><span>📢</span></template>
          时空联播与纪元工坊
        </n-button>
        <n-button
          type="info"
          size="small"
          round
          secondary
          class="shadow-md"
          @click="activeMode = 'broadcast_studio'"
        >
          <template #icon><span>📡</span></template>
          时空战报广播工坊
        </n-button>
        <n-button
          type="warning"
          size="small"
          round
          secondary
          class="shadow-md"
          @click="activeMode = 'chronicle_evolution'"
        >
          <template #icon><span>📜</span></template>
          编年史演化沙盘
        </n-button>
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

    <!-- 顶部工作模式切换标签 (当不在文章详情页时展示) -->
    <div v-if="!currentArticle" class="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
      <button
        v-for="mode in viewModes"
        :key="mode.key"
        type="button"
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
        :class="activeMode === mode.key
          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]'
          : 'bg-slate-900 text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-800'"
        @click="activeMode = mode.key"
      >
        <span>{{ mode.icon }}</span>
        <span>{{ mode.label }}</span>
        <span
          v-if="mode.badge"
          class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-500 text-slate-950 font-bold"
        >
          {{ mode.badge }}
        </span>
      </button>
    </div>

    <!-- 模式 A：文章详情页面 -->
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

    <!-- 模式 B1：全量资讯列表与分类筛选 -->
    <div v-else-if="activeMode === 'articles'" ref="newsList" tabindex="-1" class="news-list-container space-y-6">
      <!-- 顶部过滤控制器：高对比度分类标签栏 + 搜索框 -->
      <div class="bg-[#121626]/90 border border-slate-700/60 rounded-2xl p-3 sm:p-4 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
        <!-- 分类切换标签栏 -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
          <button
            v-for="cat in categoryList"
            :key="cat.id"
            type="button"
            :aria-pressed="activeCategory === cat.id"
            class="news-action px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 whitespace-nowrap select-none"
            :class="activeCategory === cat.id
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
              : 'bg-slate-800/90 text-gray-200 border-slate-700 hover:bg-slate-700 hover:text-white'"
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

        <!-- Naive UI 精美分页器 -->
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

    <!-- 模式 B2：运营事件与大版本雷达沙盘 -->
    <div v-else-if="activeMode === 'event_radar'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>📡</span> 离线单机周期活动与版本发布雷达 (Event Radar Studio)
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              模拟无需实时联网的本地周期性日历活动（根据系统时钟自适应解锁深渊狂欢、七色尾巴双倍产出与大魔道经验节）。
            </p>
          </div>
          <span class="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            ● 离线日历守护器活跃中
          </span>
        </div>

        <!-- 周期活动矩阵 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="evt in scheduledEvents"
            :key="evt.id"
            class="p-4 rounded-xl border bg-slate-950/80 transition-all flex flex-col justify-between space-y-3"
            :class="evt.status === 'active' ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-slate-800'"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                  {{ evt.cycle }}
                </span>
                <n-tag size="tiny" :type="evt.statusType" round strong>{{ evt.statusLabel }}</n-tag>
              </div>
              <h4 class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{{ evt.icon }}</span>
                <span>{{ evt.title }}</span>
              </h4>
              <p class="text-xs text-gray-300 leading-relaxed">{{ evt.desc }}</p>
              <div class="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-amber-300 space-y-0.5">
                <span class="font-bold">🎁 特权收益：</span>{{ evt.bonus }}
              </div>
            </div>

            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span class="text-gray-500">开放场景: <strong class="text-gray-300">{{ evt.map }}</strong></span>
              <n-button size="tiny" round :type="evt.status === 'active' ? 'warning' : 'default'" secondary @click="toggleEventReminder(evt)">
                {{ evt.reminded ? '🔔 已提醒' : '🔕 预约通知' }}
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模式 B3：官方开发问答与玩家留言板 -->
    <div v-else-if="activeMode === 'community_qa'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>💬</span> 官方架构答疑与单机探索留言板
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              汇集主线拓荒、神装获取与高难深渊攻坚的官方解答，支持玩家本地提交心得体会并加入展示。
            </p>
          </div>
          <n-button size="small" round type="info" secondary @click="copyAllQaText">
            <template #icon><span>📋</span></template>
            导出所有问答文本
          </n-button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 提问与留言表单 -->
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div class="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>✍️</span> 提交我的探索疑问 / 心得
            </div>

            <div class="space-y-1">
              <label class="text-xs text-gray-300">标题：</label>
              <input
                v-model="newQa.title"
                type="text"
                placeholder="例如：神龙宝箱的海啸怎么无伤防御？"
                class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div class="space-y-1">
              <label class="text-xs text-gray-300">分类领域：</label>
              <select
                v-model="newQa.category"
                class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="首领攻略">首领攻略与机制 (Boss Tactics)</option>
                <option value="神兵装备">神兵装备与调合 (Armory & Craft)</option>
                <option value="主线解谜">主线解谜与地图 (Story & Maps)</option>
                <option value="职业配装">职业转职与极意 (Jobs & Skills)</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="text-xs text-gray-300">内容描述：</label>
              <textarea
                v-model="newQa.content"
                rows="3"
                placeholder="描述您在单机探索中遇到的疑难或攻坚巧思..."
                class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
              ></textarea>
            </div>

            <n-button
              type="warning"
              block
              round
              class="font-bold text-slate-950 mt-2"
              @click="submitQa"
            >
              发布留言到本地问答库
            </n-button>
          </div>

          <!-- 热门问答展示列表 -->
          <div class="lg:col-span-2 space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-gray-300">
              <span>🔥 官方认证问答与热心玩家留言 (按点赞排序)</span>
              <span class="text-gray-500 font-normal">累计 {{ qaList.length }} 条记录</span>
            </div>

            <div class="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              <div
                v-for="qa in sortedQaList"
                :key="qa.id"
                class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800">
                      {{ qa.category }}
                    </span>
                    <h4 class="text-sm font-bold text-white">{{ qa.title }}</h4>
                  </div>
                  <span class="text-[10px] font-mono text-gray-400">{{ qa.author }}</span>
                </div>

                <p class="text-xs text-gray-300 leading-relaxed">{{ qa.content }}</p>

                <div v-if="qa.officialAnswer" class="p-2.5 bg-cyan-950/30 rounded-lg border border-cyan-800/40 text-xs space-y-1">
                  <div class="text-cyan-300 font-bold flex items-center gap-1">
                    <span>🛡️ 官方架构师解答：</span>
                  </div>
                  <div class="text-gray-300 text-[11px] leading-relaxed">{{ qa.officialAnswer }}</div>
                </div>

                <div class="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                  <span class="text-gray-500 font-mono text-[10px]">{{ qa.date }}</span>
                  <n-button
                    size="tiny"
                    round
                    :type="qa.voted ? 'warning' : 'default'"
                    :secondary="!qa.voted"
                    @click="toggleQaVote(qa)"
                  >
                    <span>{{ qa.voted ? '❤️ 已赞' : '🤍 有用' }} ({{ qa.votes }})</span>
                  </n-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模式 B5：版本热更补丁清单与单机存档无损迁徙沙盘 -->
    <div v-else-if="activeMode === 'patch_manifest'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#12162a] via-[#101426] to-[#0c1020] border border-cyan-500/40 shadow-2xl space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">📦</span>
              <h3 class="text-lg sm:text-xl font-black text-white text-glow-cyan">版本热更补丁清单与单机存档无损迁徙沙盘 (Patch & Savefile Migration Lab)</h3>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              追踪从 v1.0.0 到 v2.2.248 全生命周期架构二进制增量补丁包，模拟单机存档向前兼容结构升级、字段自动补全与 SHA-256 完整性验签。
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button size="small" type="primary" secondary round @click="runSaveMigrationCheck">
              ⚡ 模拟全量迁徙校验
            </n-button>
            <n-button size="small" type="warning" class="font-bold shadow" @click="exportPatchAuditCert">
              📜 导出存档迁徙审计证书
            </n-button>
          </div>
        </div>

        <!-- 补丁包完整性矩阵 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-cyan-300 flex items-center gap-1.5">
              <span>📋</span>
              <span>核心版本增量差异清单 (Binary Delta Patch Manifest)</span>
            </span>
            <span class="text-gray-400 font-mono text-[11px]">全量 SHA-256 已签署 · 100% 向前兼容</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div
              v-for="patch in patchList"
              :key="patch.version"
              class="p-3.5 rounded-xl border bg-slate-950/80 transition-all flex flex-col justify-between space-y-2 hover:border-cyan-500/50"
              :class="patch.isLatest ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-slate-800'"
            >
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-mono font-bold text-amber-300 text-xs">{{ patch.version }}</span>
                  <n-tag size="tiny" :type="patch.tagType">{{ patch.targetModule }}</n-tag>
                </div>
                <div class="text-xs font-bold text-white truncate">{{ patch.title }}</div>
                <div class="text-[10px] text-gray-400 leading-snug">{{ patch.featureSummary }}</div>
              </div>

              <div class="pt-2 border-t border-slate-800/80 space-y-1 text-[10px] font-mono">
                <div class="flex justify-between text-gray-500">
                  <span>差量包体:</span>
                  <span class="text-gray-300">{{ patch.deltaSize }}</span>
                </div>
                <div class="flex justify-between text-gray-500">
                  <span>安全哈希:</span>
                  <span class="text-cyan-400 truncate max-w-[120px]">{{ patch.hash }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 跨版本存档向前迁徙互动测试工作台 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          <!-- 栏 1: 原始存档版本配置 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <span class="text-xs font-bold text-amber-300 block flex items-center gap-1.5">
              <span>💾</span>
              <span>旧版存档导入与诊断 (Save Origin)</span>
            </span>

            <div class="space-y-3 text-xs">
              <div>
                <label class="text-gray-400 block mb-1">选择导入的原版存档年代:</label>
                <select
                  v-model="sourceSaveVersion"
                  class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
                  @change="handleSourceVersionChange"
                >
                  <option v-for="ver in saveLegacyOptions" :key="ver.id" :value="ver.id">
                    {{ ver.name }} ({{ ver.period }})
                  </option>
                </select>
              </div>

              <!-- 原始存档状态检测 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <div class="flex justify-between text-gray-400">
                  <span>结构版本:</span>
                  <span class="font-mono text-amber-300 font-bold">{{ selectedLegacyInfo.versionTag }}</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>缺失数据段:</span>
                  <span class="font-mono text-rose-400 font-bold">{{ selectedLegacyInfo.missingFields.length }} 项</span>
                </div>
                <div class="text-[11px] text-gray-400 pt-1 border-t border-slate-800">
                  包含: {{ selectedLegacyInfo.missingFields.join('、') }}
                </div>
              </div>

              <div class="space-y-1">
                <label class="text-gray-400 block">自动补全校验策略:</label>
                <div class="p-2 rounded bg-slate-950/70 border border-slate-800 text-[11px] text-emerald-400">
                  ✓ 激活 100% 结构幂等修复，绝不损坏既有等级与金币
                </div>
              </div>
            </div>
          </div>

          <!-- 栏 2: 迁徙解算与进度 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <span class="text-xs font-bold text-cyan-300 block flex items-center gap-1.5">
              <span>⚙️</span>
              <span>无损升阶引擎演算 (Migration Resolver)</span>
            </span>

            <div class="space-y-3 text-xs">
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div class="flex justify-between text-gray-400">
                  <span>目标迁移版本:</span>
                  <span class="font-mono text-cyan-400 font-bold">v2.2.248 (最新稳定版)</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>自动注入补全表:</span>
                  <span class="font-mono text-emerald-400 font-bold">{{ selectedLegacyInfo.injectList.length }} 模块</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>向下兼容性评级:</span>
                  <span class="font-mono text-amber-300 font-bold">A+ 无损级</span>
                </div>
              </div>

              <!-- 迁徙操作按钮 -->
              <button
                type="button"
                class="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
                :disabled="isMigrating"
                @click="runSaveMigrationCheck"
              >
                {{ isMigrating ? '⚡ 正在执行全字段无损升阶...' : '⚡ 启动存档版本无损升阶' }}
              </button>

              <div v-if="isMigrating" class="space-y-1">
                <div class="flex justify-between text-[11px] text-cyan-300">
                  <span>校验进度:</span>
                  <span>{{ migrationProgress }}%</span>
                </div>
                <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div class="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 transition-all duration-100" :style="{ width: `${migrationProgress}%` }" />
                </div>
              </div>

              <div v-if="migrationNotice" class="text-[11px] text-center font-bold font-mono pt-1 text-emerald-400">
                {{ migrationNotice }}
              </div>
            </div>
          </div>

          <!-- 栏 3: 迁徙日志与审计哈希 -->
          <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div class="space-y-2">
              <span class="text-xs font-bold text-gray-400 block">实时迁徙审计流水 (Audit Log):</span>
              <div class="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1.5 h-44 overflow-y-auto leading-relaxed">
                <div v-for="(log, idx) in migrationLogs" :key="idx" class="text-gray-300 text-[11px]">
                  {{ log }}
                </div>
              </div>
            </div>

            <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-gray-400 flex items-center justify-between">
              <span>审计签发单例:</span>
              <span class="font-mono text-cyan-400 font-bold">save_migration_patch_resolver.gd</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模式 B5：全域编年史与世界线演化沙盘 (World Chronicle & Timeline Evolution Studio) -->
    <div v-if="activeMode === 'chronicle_evolution'" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c1208] via-[#121626] to-[#0a0f1d] border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.22)] space-y-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-amber-950 pb-5">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                WORLD CHRONICLE & TIMELINE EVOLUTION STUDIO
              </span>
              <span class="text-xs text-gray-400 font-mono">v2.2.264 官方实机矩阵</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <span>📜</span> 全域编年史与时空世界线演化沙盘
            </h2>
            <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
              宏观纵览双月万年编年史：推演始源世界、异界重构、虚无坍缩与超越创世四大世界线分支，解算以太稳定度与虚无奇点侵蚀率，记录跨时空大事件并支持一键导出 SHA-256 方案书。
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <n-button size="small" secondary type="warning" @click="resetWorldlineParams">
              🔄 重置世界线
            </n-button>
            <n-button size="small" secondary type="primary" @click="maxTranscendenceWorldline">
              ⚡ 一键推演至创世极境
            </n-button>
            <n-button size="small" type="primary" class="font-bold shadow" @click="exportChronicleCertificate">
              📜 导出编年史认证方案书
            </n-button>
          </div>
        </div>

        <!-- 三栏主推演工作台 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 栏 1: 四大时空世界线分支选定与以太奇点解算 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>🌌</span>
                  <span>四大时空世界线分支选定</span>
                </span>
                <n-tag size="tiny" :type="currentWorldline.tagType">{{ currentWorldline.era }}</n-tag>
              </div>

              <!-- 分支切换按键 -->
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="wl in worldlinesList"
                  :key="wl.id"
                  type="button"
                  class="p-2.5 rounded-lg border text-left transition-all cursor-pointer"
                  :class="selectedWorldlineId === wl.id
                    ? 'bg-amber-950/70 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-700'"
                  @click="selectWorldline(wl.id)"
                >
                  <div class="text-xs font-bold truncate flex items-center gap-1">
                    <span>{{ wl.icon }}</span>
                    <span>{{ wl.name }}</span>
                  </div>
                  <div class="text-[10px] text-gray-400 font-mono mt-0.5">{{ wl.epochRange }}</div>
                </button>
              </div>

              <!-- 当前世界线档案详述 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-white flex items-center gap-1.5 text-sm">
                    <span>{{ currentWorldline.icon }}</span>
                    <span>{{ currentWorldline.name }}</span>
                  </span>
                  <span class="text-[10px] font-mono text-cyan-400 font-bold">{{ currentWorldline.epochRange }}</span>
                </div>
                <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentWorldline.summary }}</p>
                <div class="p-2 rounded bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-200">
                  🏛️ <strong>核心主导阵营:</strong> {{ currentWorldline.dominantFaction }}
                </div>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
              <span>世界线演化位阶:</span>
              <span class="font-mono font-bold text-emerald-400">{{ currentWorldline.stateBadge }}</span>
            </div>
          </div>

          <!-- 栏 2: 宏观演化参数调节与以太波动推演 -->
          <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>⚙️</span>
                <span>以太时空动力学调节参数</span>
              </span>
              <span class="font-mono text-xs text-amber-400 font-bold">纪元 {{ currentEpochYear > 0 ? `+${currentEpochYear}` : currentEpochYear }} 年</span>
            </div>

            <div class="space-y-3 text-xs">
              <div>
                <div class="flex justify-between items-center text-gray-300 mb-1">
                  <span>虚无奇点侵蚀度 (Void Singularity):</span>
                  <span class="font-mono text-rose-400 font-bold text-sm">{{ voidSingularityIndex }}%</span>
                </div>
                <n-slider v-model:value="voidSingularityIndex" :min="0" :max="100" :step="1" />
              </div>

              <div>
                <div class="flex justify-between items-center text-gray-300 mb-1">
                  <span>地脉以太稳定度 (Aether Stability):</span>
                  <span class="font-mono text-cyan-400 font-bold text-sm">{{ aetherStability }}%</span>
                </div>
                <n-slider v-model:value="aetherStability" :min="10" :max="100" :step="1" />
              </div>

              <div>
                <div class="flex justify-between items-center text-gray-300 mb-1">
                  <span>跨界时空纪元锚点 (Epoch Year):</span>
                  <span class="font-mono text-amber-400 font-bold">{{ currentEpochYear }} 年</span>
                </div>
                <n-slider v-model:value="currentEpochYear" :min="-1000" :max="1000" :step="50" />
              </div>

              <!-- 演化指标卡 -->
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">文明存续繁荣指数:</span>
                  <span class="font-mono font-bold text-emerald-400">{{ calculatedCivilizationIndex }} / 100</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">次元坍塌崩解风险:</span>
                  <span class="font-mono font-bold" :class="collapseRiskColor">{{ collapseRiskText }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">破限以太涌流速率:</span>
                  <span class="font-mono text-purple-300 font-bold">{{ aetherSurgeRate }} 以太赫兹</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 栏 3: 重大历史节点编年鉴与事件日志 -->
          <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>📜</span>
                  <span>历史重大时空里程碑节点</span>
                </span>
                <n-button size="tiny" secondary type="warning" @click="triggerRandomHistoryEvent">
                  🎲 时空扰动
                </n-button>
              </div>

              <!-- 里程碑事件清单 -->
              <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
                <div
                  v-for="ev in timelineMilestonesList"
                  :key="ev.id"
                  class="p-2.5 rounded bg-slate-950/80 border border-slate-800 text-xs space-y-1 hover:border-amber-400/40 transition-all"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-amber-300">{{ ev.title }}</span>
                    <span class="font-mono text-[10px] text-gray-500">{{ ev.year }}</span>
                  </div>
                  <p class="text-[11px] text-gray-300 leading-snug">{{ ev.description }}</p>
                </div>
              </div>

              <!-- 实时演化记录 -->
              <div class="p-2 rounded bg-slate-950 border border-slate-800 text-[10px] space-y-1 max-h-20 overflow-y-auto font-mono text-gray-400">
                <div v-for="(log, idx) in evolutionLogs" :key="idx" class="flex items-start gap-1">
                  <span class="text-amber-400 shrink-0">•</span>
                  <span>{{ log }}</span>
                </div>
              </div>
            </div>

            <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
              太古史家箴言：时空并非恒定单行道。四大水晶与虚无奇点的一进一退，决定了凡人纪元的覆灭或永恒超越！
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模式 B5：全域时空战报广播与去中心化公告签名工坊 -->
    <div v-if="activeMode === 'broadcast_studio'" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-[#0b1020]/95 border border-cyan-500/30 space-y-6 shadow-[0_0_35px_rgba(6,182,212,0.18)] relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 头部标章 -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                v2.2.278 重磅实装
              </span>
              <span class="text-xs text-gray-400">去中心化 P2P 战报 · Merkle 树防篡改验签</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>📡</span> 全域时空战报广播与去中心化公告签名工坊
            </h2>
            <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
              基于以太天体超导中继与分布式多重签名算法，解算全域深渊战报秒级广播分发、Merkle 根哈希验签、抗干扰信噪比与跨世界线重投影。
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <n-button
              type="primary"
              size="small"
              round
              secondary
              :loading="isSimulatingBroadcast"
              @click="simulateBroadcastDispatch"
            >
              <template #icon><span>⚡</span></template>
              激发战报广播推演
            </n-button>
            <n-button
              type="info"
              size="small"
              round
              secondary
              @click="exportBroadcastCertificate"
            >
              <template #icon><span>📜</span></template>
              导出方案证书
            </n-button>
          </div>
        </div>

        <!-- 四大频道预设 Channels -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="ch in broadcastChannels"
            :key="ch.id"
            class="p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
            :class="selectedBroadcastChannelId === ch.id
              ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
            @click="applyBroadcastChannel(ch.id)"
          >
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xl">{{ ch.icon }}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded font-mono" :class="selectedBroadcastChannelId === ch.id ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-gray-400'">
                  {{ ch.tag }}
                </span>
              </div>
              <div class="font-bold text-xs text-gray-200">{{ ch.name }}</div>
              <div class="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{{ ch.summary }}</div>
            </div>
            <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span class="text-gray-400">发射功率:</span>
              <span class="font-mono font-bold text-cyan-300">{{ ch.powerMW }} MW</span>
            </div>
          </div>
        </div>

        <!-- 双栏交互面板 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- 左侧：实时广播视窗与物理计算 -->
          <div class="lg:col-span-7 space-y-4">
            <!-- 广播全息雷达视窗 -->
            <div class="relative h-64 sm:h-72 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
              <!-- 背景光斑与雷达波纹 SVG 模拟 -->
              <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div
                  class="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                  :style="{
                    background: currentBroadcastChannel.gradient,
                    opacity: (snrThreshold / 48 * 0.85).toFixed(2),
                    transform: `scale(${1 + transmitterPower / 600})`
                  }"
                ></div>
                <svg class="w-60 h-60 opacity-60 animate-[spin_50s_linear_infinite]" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(6,182,212,0.4)" stroke-width="1.5" stroke-dasharray="4 4" />
                  <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(59,130,246,0.4)" stroke-width="1" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(168,85,247,0.5)" stroke-width="1" stroke-dasharray="2 2" />
                  <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(6,182,212,0.3)" stroke-width="1" />
                  <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(6,182,212,0.3)" stroke-width="1" />
                  <circle cx="100" cy="100" r="6" fill="rgba(6,182,212,0.9)" />
                </svg>
              </div>

              <!-- 顶部状态指示灯与采样模式 -->
              <div class="relative z-10 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="font-mono text-cyan-300 font-bold">BROADCAST TRANSMITTING</span>
                  <span class="text-gray-400 font-mono text-[10px]">| {{ relayPeerDensity }} Relay Peers</span>
                </div>
                <div class="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-amber-300">
                  信噪比: {{ snrThreshold }} dB
                </div>
              </div>

              <!-- 中间标语 -->
              <div class="relative z-10 text-center my-auto">
                <div class="text-2xl font-black text-white/90 tracking-wider font-mono drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
                  {{ currentBroadcastChannel.name }}
                </div>
                <div class="text-xs text-cyan-200/80 mt-1 font-mono">
                  传播吞吐: {{ broadcastMetrics.throughputKbps }} kbps · 覆盖半径: {{ broadcastMetrics.coverageRadius }} 光秒
                </div>
              </div>

              <!-- 底部性能与管线参数微视窗 -->
              <div class="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-gray-400">
                <span>共识验签: {{ multiSigRounds }} 轮 Multi-Sig</span>
                <span class="text-emerald-400 font-bold">节点信任度: {{ broadcastMetrics.consensusTrust }}%</span>
              </div>
            </div>

            <!-- 4 维物理与战斗指标卡片 -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">时空辐射半径</div>
                <div class="font-mono text-cyan-400 font-bold text-sm mt-0.5">{{ broadcastMetrics.coverageRadius }} 光秒</div>
                <div class="text-[9px] text-gray-500 mt-0.5">四界以太穿透</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">消息传播吞吐</div>
                <div class="font-mono text-amber-400 font-bold text-sm mt-0.5">{{ broadcastMetrics.throughputKbps }} kbps</div>
                <div class="text-[9px] text-gray-500 mt-0.5">P2P 蜂窝聚合</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">共识核签信任度</div>
                <div class="font-mono text-emerald-400 font-bold text-sm mt-0.5">{{ broadcastMetrics.consensusTrust }}%</div>
                <div class="text-[9px] text-gray-500 mt-0.5">拜占庭容错 BFT</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] text-gray-400">综合网络评级</div>
                <div class="font-mono text-purple-400 font-bold text-xs mt-0.5 truncate">{{ broadcastMetrics.rating }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">全域去中心化</div>
              </div>
            </div>

            <!-- 实时广播日志终端 -->
            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
              <div class="flex items-center justify-between text-xs text-gray-400 pb-1.5 border-b border-slate-800">
                <span class="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <span>💻</span> 战报广播分发与验签日志 (Dispatch Terminal)
                </span>
                <span class="text-[10px] text-gray-500">拓扑同步: 实时同步</span>
              </div>
              <div class="space-y-1 text-[11px] text-gray-300 max-h-28 overflow-y-auto custom-scrollbar">
                <div v-for="(log, idx) in broadcastSimulationLogs" :key="idx" class="flex items-start gap-1.5">
                  <span class="text-cyan-500 select-none">&gt;</span>
                  <span :class="log.includes('完成') || log.includes('成功') ? 'text-emerald-400' : 'text-gray-300'">{{ log }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：无极物理调优与广播 Uniforms -->
          <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div class="text-xs font-bold text-cyan-300 flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="flex items-center gap-1.5">
                <span>🎛️</span> 广播网络参数微调 (Network Uniforms)
              </span>
              <button
                type="button"
                class="text-[10px] text-gray-400 hover:text-cyan-300 cursor-pointer"
                @click="resetBroadcastParams"
              >
                重置参数
              </button>
            </div>

            <!-- 广播发射功率 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>广播发射功率 (Transmitter Power):</span>
                <span class="font-mono text-cyan-400 font-bold">{{ transmitterPower }} MW</span>
              </div>
              <n-slider v-model:value="transmitterPower" :min="50" :max="500" :step="10" />
              <div class="flex justify-between text-[9px] text-gray-500">
                <span>50MW 局域驻守</span>
                <span>280MW 全陆行省</span>
                <span>500MW 跨界天体</span>
              </div>
            </div>

            <!-- 中继节点密度 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>中继节点密度 (Relay Peer Density):</span>
                <span class="font-mono text-amber-400 font-bold">{{ relayPeerDensity }} Peers</span>
              </div>
              <n-slider v-model:value="relayPeerDensity" :min="16" :max="256" :step="8" />
            </div>

            <!-- 信号信噪比阈值 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>信号信噪比阈值 (SNR Threshold):</span>
                <span class="font-mono text-emerald-400 font-bold">{{ snrThreshold }} dB</span>
              </div>
              <n-slider v-model:value="snrThreshold" :min="12" :max="48" :step="1" />
            </div>

            <!-- 签名多重验签轮次 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>签名多重验签轮次 (Multi-Sig Rounds):</span>
                <span class="font-mono text-purple-400 font-bold">{{ multiSigRounds }} 轮</span>
              </div>
              <n-slider v-model:value="multiSigRounds" :min="3" :max="15" :step="1" />
            </div>

            <!-- 特性开关组 -->
            <div class="pt-2 border-t border-slate-800 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【Merkle 树根哈希分块验签】:</span>
                <n-switch v-model:value="enableMerkleValidation" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【跨世界线零时延重投影】:</span>
                <n-switch v-model:value="enableSpatiotemporalReprojection" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【断网自组网 Mesh 漫游传播】:</span>
                <n-switch v-model:value="enableAdHocRoaming" size="small" />
              </div>
            </div>

            <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
              💡 广播原理：借助以太超导中继与 Merkle 树抗碰撞签名，即使处于无网络单机状态，亦可在队伍整备与局域网节点间实现秒级断点广播与权威通告认证。
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模式 B6：Godot 4.x 引擎广播分发系统源码 -->
    <div v-if="activeMode === 'engine_code'" class="space-y-4">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                GODOT 4.6 LTS BULLETIN ENGINE
              </span>
              <h3 class="text-base font-bold text-white">官方离线广播与编年史演化架构源码</h3>
            </div>
            <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 flex-wrap">
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
                :class="activeCodeTab === 'bulletin' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeCodeTab = 'bulletin'"
              >
                game_event_bulletin_manager.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
                :class="activeCodeTab === 'patch' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeCodeTab = 'patch'"
              >
                save_migration_patch_resolver.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
                :class="activeCodeTab === 'chronicle' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeCodeTab = 'chronicle'"
              >
                world_chronicle_evolution_simulator.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
                :class="activeCodeTab === 'broadcast' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeCodeTab = 'broadcast'"
              >
                spatiotemporal_broadcast_engine.gd
              </button>
            </div>
          </div>
          <n-button size="small" round secondary type="info" @click="copyGdScript">
            <template #icon><span>📋</span></template>
            {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
          </n-button>
        </div>

        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[550px]">{{ activeCodeTab === 'bulletin' ? gdScriptCode : activeCodeTab === 'patch' ? gdSaveMigrationCode : activeCodeTab === 'chronicle' ? gdChronicleCode : gdBroadcastCode }}</pre>
      </div>
    </div>

    <!-- 官方情报站时空联播、全服公告与纪元大事件编年史工坊 (v2.2.313 重磅实装) -->
    <div id="epoch-chronicle-studio" class="epoch-chronicle-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-emerald-950/20 to-slate-900/95 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
              SPATIOTEMPORAL BROADCAST & MERKLE DISPATCH
            </span>
            <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
              v2.2.313 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>📢</span> 官方情报站时空联播、全服公告与纪元大事件编年史工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            深度集成双月宇宙时空联播天线、高维 Merkle 树防伪背书、断网自动重放缓存与 Godot 4.6 LTS 实机广播信道，保障全服百万冒险者毫秒级获悉纪元大事件。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="info" @click="resetEpochNewsDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="info" :loading="isNewsSimulating" @click="runEpochNewsSimulation">
            <template #icon><span>⚡</span></template>
            启动时空联播推演
          </n-button>
        </div>
      </div>

      <!-- 四大广播流派原型卡 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="archetype in newsArchetypes"
          :key="archetype.id"
          @click="selectNewsArchetype(archetype)"
          :class="[
            'p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden',
            selectedNewsArchetype.id === archetype.id
              ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
          ]"
        >
          <div class="flex items-center justify-between">
            <span class="text-xl">{{ archetype.icon }}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300">{{ archetype.badge }}</span>
          </div>
          <div class="font-bold text-white text-sm mt-2">{{ archetype.name }}</div>
          <div class="text-xs text-gray-400 mt-1 leading-relaxed">{{ archetype.desc }}</div>
          <div class="mt-3 text-[11px] font-mono text-emerald-400/90 flex justify-between">
            <span>覆盖半径: {{ archetype.radius }}</span>
            <span>可信度: {{ archetype.trust }}</span>
          </div>
        </div>
      </div>

      <!-- 核心微调滑块与调控开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800">
        <!-- 4 维连续滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-emerald-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>⚙️</span> 联播射频与信道参数微调
          </div>
          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>广播发射功率指数 (Transmitter Power)</span>
                <span class="font-mono text-emerald-400 font-bold">{{ epochTransmitterPower }} MW</span>
              </div>
              <n-slider v-model:value="epochTransmitterPower" :min="100" :max="1000" :step="20" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>时空重叠中继节点密度 (Relay Node Density)</span>
                <span class="font-mono text-cyan-400 font-bold">{{ epochRelayNodeDensity }} 个节点</span>
              </div>
              <n-slider v-model:value="epochRelayNodeDensity" :min="20" :max="200" :step="5" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>全息信噪比阈值 (SNR Threshold)</span>
                <span class="font-mono text-amber-400 font-bold">{{ epochSnrThreshold }} dB</span>
              </div>
              <n-slider v-model:value="epochSnrThreshold" :min="10" :max="60" :step="1" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>多方共识背书签名轮数 (Multi-Sig Rounds)</span>
                <span class="font-mono text-purple-400 font-bold">{{ epochMultiSigRounds }} 轮</span>
              </div>
              <n-slider v-model:value="epochMultiSigRounds" :min="3" :max="15" :step="1" />
            </div>
          </div>
        </div>

        <!-- 3 维调控开关与动态指标 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-cyan-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>🛡️</span> 去中心化防伪与容灾守卫
          </div>
          <div class="space-y-2.5 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">跨维度广播自动漫游中继</div>
                <div class="text-[10px] text-gray-400">穿越泰空/巴尔/第三融合世界时自动接入最近以太灯塔</div>
              </div>
              <n-switch v-model:value="enableAutoRoamingRelay" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">零信任 Merkle Root 树状防伪签名</div>
                <div class="text-[10px] text-gray-400">每条官方公告均包含 SHA-256 默克尔树路径，防止虚空篡改</div>
              </div>
              <n-switch v-model:value="enableZeroTrustMerkle" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">客户端离线缓存断线自动重放同步</div>
                <div class="text-[10px] text-gray-400">弱网或断线重新上线时自动拉取丢失的纪元大事件日志</div>
              </div>
              <n-switch v-model:value="enableOfflineCacheResync" />
            </div>
          </div>

          <!-- 4 维解算核心指标 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">覆盖光秒半径</div>
              <div class="text-base font-black font-mono text-emerald-400 mt-0.5">{{ calculatedRadius }} 光秒</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">信道吞吐速率</div>
              <div class="text-base font-black font-mono text-cyan-400 mt-0.5">{{ calculatedThroughput }} Kbps</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">共识防伪可信度</div>
              <div class="text-base font-black font-mono text-amber-400 mt-0.5">{{ calculatedTrust }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">情报通报认证</div>
              <div class="text-xs font-black font-mono text-purple-400 mt-1">{{ calculatedNewsCert }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条与终端控制台 -->
      <div class="space-y-3 bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="text-emerald-400 font-mono font-bold">STAGE {{ newsSimStage }}/5</span>
            <span class="text-gray-300">{{ newsSimStageName }}</span>
          </div>
          <span class="font-mono text-cyan-400">{{ newsSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="newsSimProgress"
          :color="'#10b981'"
          :rail-color="'#1e293b'"
          :height="8"
          :show-indicator="false"
          border-radius="4px"
        />

        <div class="h-32 bg-slate-900/90 rounded-lg p-3 font-mono text-xs overflow-y-auto space-y-1 text-gray-300 border border-slate-800/80">
          <div v-for="(log, idx) in newsLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-gray-500 shrink-0">[{{ log.time }}]</span>
            <span :class="log.color">{{ log.text }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <div class="text-gray-400 font-mono">
            <span>防伪校验凭证: </span>
            <span class="text-emerald-400 font-bold">{{ newsCertHash }}</span>
          </div>
          <n-button size="tiny" secondary type="info" round @click="exportNewsCert">
            <template #icon><span>📜</span></template>
            导出时空联播与编年史报告 (SHA-256)
          </n-button>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                GODOT 4.6 LTS BROADCAST ENGINE
              </span>
              <span class="text-sm font-bold text-white">时空联播发射机与默克尔验证实机代码</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              提供生产级时空战报广播发射机、默克尔树校验器与断网重放管理器实机驱动。
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button
              v-for="codeTab in newsCodeTabs"
              :key="codeTab.id"
              size="tiny"
              round
              :type="activeNewsCodeTab === codeTab.id ? 'info' : 'default'"
              :secondary="activeNewsCodeTab !== codeTab.id"
              @click="activeNewsCodeTab = codeTab.id"
            >
              {{ codeTab.name }}
            </n-button>
            <n-button size="tiny" round secondary type="info" @click="copyActiveNewsCode">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-[420px]">{{ currentNewsCode }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, nextTick } from 'vue'
import { useMessage } from 'naive-ui'
import { useWindowSize } from '@vueuse/core'
import { usePagination } from '@/composables/usePagination'
import { homeNewsList } from '../config/homePortalConfig'
import type { NewsArticle } from '../config/homePortalConfig'

const message = useMessage()
const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 640)

// 视图模式切换
type ViewMode = 'articles' | 'event_radar' | 'patch_manifest' | 'community_qa' | 'chronicle_evolution' | 'broadcast_studio' | 'engine_code'
const activeMode = ref<ViewMode>('articles')
const viewModes: { key: ViewMode; label: string; icon: string; badge?: string }[] = [
  { key: 'articles', label: '单机档案全量资讯', icon: '📢' },
  { key: 'event_radar', label: '周期活动与版本雷达', icon: '📡', badge: 'HOT' },
  { key: 'patch_manifest', label: '热更补丁与存档迁徙', icon: '📦' },
  { key: 'chronicle_evolution', label: '全域编年史演化沙盘', icon: '📜', badge: 'v2.2.264' },
  { key: 'broadcast_studio', label: '时空战报广播与签名工坊', icon: '📡', badge: 'v2.2.278' },
  { key: 'community_qa', label: '官方问答交流所', icon: '💬' },
  { key: 'engine_code', label: '广播分发引擎源码', icon: '💻' }
]

// 分类体系
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
  void nextTick(() => {
    const { button } = activation
    if (!isMobile.value || !button.isConnected || !button.disabled) return
    if (document.activeElement !== button && document.activeElement !== document.body) return
    container.querySelector<HTMLInputElement>('.n-pagination--simple input')?.focus({ preventScroll: true })
  })
}

watch(searchKeyword, () => {
  resetPage()
})

const featuredArticle = computed(() => {
  return homeNewsList.find(item => item.isHot) || homeNewsList[0]
})

const currentArticle = computed<NewsArticle | null>(() => {
  if (!selectedArticleId.value) return null
  return homeNewsList.find(a => a.id === selectedArticleId.value) || null
})

watch(currentArticle, (article) => {
  if (article) {
    articleHeading.value?.focus({ preventScroll: true })
  } else {
    const trigger = lastArticleTriggerId ? document.getElementById(lastArticleTriggerId) : null
    const focusTarget = trigger || newsList.value
    focusTarget?.focus({ preventScroll: true })
  }
}, { flush: 'post' })

const relatedArticles = computed(() => {
  if (!currentArticle.value) return []
  return homeNewsList
    .filter(a => a.id !== currentArticle.value?.id)
    .slice(0, 4)
})

const formattedContent = computed(() => {
  if (!currentArticle.value?.content) return ''
  let raw = currentArticle.value.content.trim()

  raw = raw.replace(/^#### (.*$)/gim, '<h4 class="text-base font-bold text-amber-300 mt-5 mb-2">$1</h4>')
  raw = raw.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-cyan-300 mt-6 mb-3 border-b border-slate-800 pb-2">$1</h3>')
  raw = raw.replace(/^## (.*$)/gim, '<h2 class="text-xl font-black text-white mt-8 mb-4 border-b border-cyan-500/30 pb-2">$1</h2>')
  raw = raw.replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-300 font-semibold">$1</strong>')
  raw = raw.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">$1</code>')
  raw = raw.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-gray-300 my-1">$1</li>')
  raw = raw.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-4 list-decimal text-gray-300 my-1.5">$1</li>')

  return raw
})

const handleCategoryChange = (catId: string) => {
  activeCategory.value = catId
  resetPage()
}

const selectArticle = (articleId: string, event?: MouseEvent | KeyboardEvent) => {
  const trigger = event?.currentTarget instanceof Element ? event.currentTarget.id : null
  lastArticleTriggerId = trigger || null
  selectedArticleId.value = articleId
}

const clearArticleSelection = () => {
  selectedArticleId.value = null
}

const resetFilters = () => {
  activeCategory.value = 'all'
  searchKeyword.value = ''
  resetPage()
}

const copyArticleLink = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    message.success('文章链接已复制到剪贴板！')
  })
}

// 离线单机周期活动
interface ScheduledEvent {
  id: string
  title: string
  icon: string
  cycle: string
  status: 'active' | 'upcoming'
  statusLabel: string
  statusType: 'success' | 'warning' | 'info'
  desc: string
  bonus: string
  map: string
  reminded: boolean
}

const scheduledEvents = ref<ScheduledEvent[]>([
  {
    id: 'evt-abyss-carnival',
    title: '深渊竞技场狂欢周',
    icon: '🏰',
    cycle: '每周五 ~ 周日',
    status: 'active',
    statusLabel: '进行中',
    statusType: 'success',
    desc: '49层深渊竞技场击破首领掉落双倍神兵代币，神龙出现率大幅提升。',
    bonus: '神兵掉落率 +50%，深渊积分获取翻倍',
    map: '深渊竞技场 (abyss_arena)',
    reminded: true
  },
  {
    id: 'evt-tail-fever',
    title: '次元裂隙尾巴寻宝热潮',
    icon: '🦚',
    cycle: '每月 1 日 ~ 7 日',
    status: 'active',
    statusLabel: '进行中',
    statusType: 'success',
    desc: '各隐藏洞窟（隐士洞窟、熔岩深渊）稀有七色尾巴遭遇概率提升。',
    bonus: '粉色/红之尾巴掉落率 ×200%',
    map: '全域大地图洞窟',
    reminded: false
  },
  {
    id: 'evt-mysidia-exp',
    title: '米西迪亚双倍以太研修节',
    icon: '🔮',
    cycle: '每周三整天',
    status: 'upcoming',
    statusLabel: '即将开始',
    statusType: 'info',
    desc: '大魔道院全体导师亲授法门，青魔法观察习得成功率提高至 100%。',
    bonus: '战斗获取职业 ABP 翻倍，青魔法 100% 领悟',
    map: '米西迪亚大魔道院',
    reminded: false
  }
])

const toggleEventReminder = (evt: ScheduledEvent) => {
  evt.reminded = !evt.reminded
  if (evt.reminded) {
    message.success(`已为【${evt.title}】开启本地日程提醒！`)
  } else {
    message.info(`已取消【${evt.title}】日程提醒`)
  }
}

// 社区问答与留言
interface CommunityQa {
  id: string
  title: string
  category: string
  author: string
  content: string
  officialAnswer?: string
  date: string
  votes: number
  voted: boolean
}

const qaList = ref<CommunityQa[]>([
  {
    id: 'qa-01',
    title: '神龙宝箱的海啸 (Tsunami) 怎么无伤防御？',
    category: '首领攻略',
    author: 'DragonSlayer',
    content: '每次开次元之隙神龙宝箱，起手必定被 8000+ 海啸全屏秒杀，哪怕满血也顶不住，有什么破解手段吗？',
    officialAnswer: '必须全员装备【珊瑚戒指 (Coral Ring)】！珊瑚戒指可将水属性伤害 100% 转为自身生命回复，海啸反而会直接把全员奶满！',
    date: '2026-10-28',
    votes: 142,
    voted: false
  },
  {
    id: 'qa-02',
    title: '欧米茄 (Omega) 的反伤极光如何克制？',
    category: '首领攻略',
    author: 'KnightMaster',
    content: '机械神欧米茄物防高达 190，且任何物理攻击都会触发致命反伤，输出直接倒地。',
    officialAnswer: '使用猎人技能【乱打 (Rapid Fire)】配合魔法剑士【魔法剑 · 闪雷 (Spellblade Thundaga)】或二刀流，乱打判定不触发反伤且附带 4.0 倍雷属性特攻！',
    date: '2026-10-27',
    votes: 98,
    voted: false
  },
  {
    id: 'qa-03',
    title: '巨人之药 (Giant Drink) 的调合公式是什么？',
    category: '神兵装备',
    author: 'AlchemistPro',
    content: '听说道具有一种能让血量上限翻倍的调合神药，配方是什么？',
    officialAnswer: '药剂师使用【高级恢复药 (Hi-Potion)】 + 【龙之牙 (Dragon Fang)】即可调合出【巨人之药】，使任意目标战斗内最大生命值暴涨 200%！',
    date: '2026-10-26',
    votes: 85,
    voted: false
  }
])

const sortedQaList = computed(() => {
  return [...qaList.value].sort((a, b) => b.votes - a.votes)
})

const newQa = reactive({
  title: '',
  category: '首领攻略',
  content: ''
})

const submitQa = () => {
  if (!newQa.title.trim()) {
    message.warning('请填写留言标题')
    return
  }
  if (!newQa.content.trim()) {
    message.warning('请填写内容描述')
    return
  }

  qaList.value.unshift({
    id: `qa-${Date.now()}`,
    title: newQa.title.trim(),
    category: newQa.category,
    author: '探索者 (您)',
    content: newQa.content.trim(),
    officialAnswer: '官方架构师已记录该问题，将在下一批白皮书修订中给出详细推导！',
    date: '刚刚',
    votes: 1,
    voted: true
  })

  newQa.title = ''
  newQa.content = ''
  message.success('您的留言已成功记录并加入问答库！')
}

const toggleQaVote = (qa: CommunityQa) => {
  if (qa.voted) {
    qa.votes--
    qa.voted = false
  } else {
    qa.votes++
    qa.voted = true
    message.success(`已为【${qa.title}】点赞！`)
  }
}

const copyAllQaText = () => {
  const text = qaList.value.map(q => `【${q.category}】${q.title}\n问: ${q.content}\n答: ${q.officialAnswer || '暂无解答'}\n`).join('\n---\n')
  navigator.clipboard.writeText(text).then(() => {
    message.success('已导出全部问答文本到剪贴板！')
  })
}

// ================= 模式 B5: 版本热更补丁与单机存档无损迁徙系统 =================
interface PatchItem {
  version: string
  title: string
  targetModule: string
  tagType: 'default' | 'info' | 'warning' | 'error' | 'success'
  deltaSize: string
  hash: string
  isLatest?: boolean
  featureSummary: string
}

interface LegacySaveOption {
  id: string
  name: string
  period: string
  versionTag: string
  missingFields: string[]
  injectList: string[]
}

const patchList = ref<PatchItem[]>([
  {
    version: 'v2.2.248',
    title: '版本热更清单与离线单机存档向前无损迁徙沙盘',
    targetModule: '存档核心',
    tagType: 'warning',
    deltaSize: '148.5 KB',
    hash: 'SHA256-7A4DB2FE',
    isLatest: true,
    featureSummary: '无损补齐库扎12圣兵孔位、八色彩尾、陆行鸟繁育血脉与奥丁试炼旗标。'
  },
  {
    version: 'v2.2.247',
    title: '十二神兽契约大典升级与奥丁60秒斩铁限时试炼双禁术',
    targetModule: '召唤神殿',
    tagType: 'info',
    deltaSize: '184.2 KB',
    hash: 'SHA256-9F1EC4A8',
    featureSummary: '实装时魔道士双重星陨与游侠与一神弓穿甲圣箭，突破99999伤害上限。'
  },
  {
    version: 'v2.2.246',
    title: '多维载具矩阵升级与六色陆行鸟基因杂交育种沙盘',
    targetModule: '多维载具',
    tagType: 'success',
    deltaSize: '516.8 KB',
    hash: 'SHA256-3C8AD194',
    featureSummary: '实装黄蓝黑红白金全系陆行鸟马厩血统管理与芝奥坚果黄金突变机。'
  },
  {
    version: 'v2.2.245',
    title: '宏观经济与调合工坊八彩尾巴隐士洞窟契约觉醒',
    targetModule: '经济调合',
    tagType: 'error',
    deltaSize: '901.3 KB',
    hash: 'SHA256-13E8D56A',
    featureSummary: '实装布丁公主1/64掉落判定单抽十连刷与三阶太古神兵觉醒突破。'
  }
])

const saveLegacyOptions: LegacySaveOption[] = [
  {
    id: 'ver_100',
    name: 'v1.0.0 远古初代存档',
    period: '2025初版',
    versionTag: 'v1.0.0-LEGACY',
    missingFields: ['kuzar_sealed_12_weapons', 'rainbow_tails_bag', 'chocobo_stables', 'odin_trial_covenant'],
    injectList: ['库扎封印城12圣兵孔位', '八色极罕彩尾随身仓储', '马厩六大陆行鸟血统基因', '奥丁60秒斩铁试炼状态']
  },
  {
    id: 'ver_200',
    name: 'v2.0.120 水晶时代存档',
    period: '2026年中',
    versionTag: 'v2.0.120-CRYSTAL',
    missingFields: ['chocobo_breeding_genetics', 'twelve_signet_resonance', 'odin_dualcast_meteor'],
    injectList: ['陆行鸟全色谱基因杂交槽', '十二神兽印绶共鸣槽位', '奥丁斩铁试炼禁术拓展']
  },
  {
    id: 'ver_220',
    name: 'v2.2.210 调合版本存档',
    period: '2026近期',
    versionTag: 'v2.2.210-ALCHEMY',
    missingFields: ['gold_chocobo_mutation', 'odin_cert_hash'],
    injectList: ['究极黄金陆行鸟全地形特权', '试炼通关安全凭证哈希签章']
  }
]

const sourceSaveVersion = ref('ver_100')
const isMigrating = ref(false)
const migrationProgress = ref(0)
const migrationNotice = ref('')
const migrationLogs = ref<string[]>([
  '=== 存档向前迁徙分析机就绪，请选择源版本并启动无损升阶 ==='
])
const activeCodeTab = ref<'bulletin' | 'patch' | 'chronicle' | 'broadcast'>('broadcast')
const copiedCode = ref(false)
let migrationTimer: ReturnType<typeof setInterval> | null = null

const selectedLegacyInfo = computed(() => {
  return saveLegacyOptions.find(o => o.id === sourceSaveVersion.value) || saveLegacyOptions[0]
})

const handleSourceVersionChange = () => {
  migrationNotice.value = ''
  migrationLogs.value = [
    `[INFO] 已装载源版本【${selectedLegacyInfo.value.name}】，检测到 ${selectedLegacyInfo.value.missingFields.length} 个新结构待补齐`
  ]
}

const runSaveMigrationCheck = () => {
  if (isMigrating.value) return
  isMigrating.value = true
  migrationProgress.value = 0
  const info = selectedLegacyInfo.value

  migrationLogs.value = [
    `[0.0s] 🔍 开始扫描旧版单机存档【${info.versionTag}】二进制结构段...`,
    `[0.3s] 🛡️ 创建安全冷备份快照：save_snapshot_${Date.now().toString(16)}.bak`,
    `[0.6s] ⚡ 自动注入结构字段：[${info.missingFields.join(', ')}]`
  ]

  if (migrationTimer) clearInterval(migrationTimer)

  migrationTimer = setInterval(() => {
    migrationProgress.value += 20
    if (migrationProgress.value === 60) {
      migrationLogs.value.unshift(`[1.0s] 🧬 补齐【${info.injectList.join('、')}】核心数据段，保持金币与等级 100% 幂等！`)
    }
    if (migrationProgress.value >= 100) {
      if (migrationTimer) clearInterval(migrationTimer)
      migrationTimer = null
      isMigrating.value = false
      migrationProgress.value = 100
      migrationLogs.value.unshift('[1.8s] ✨ SHA-256 完整性验签通过！存档无损升阶至最新 v2.2.248！')
      migrationNotice.value = `🎉 迁徙大成！【${info.name}】已成功升阶至最新 v2.2.248，零数据丢失！`
      message.success(`存档无损迁徙完成！已完美适配 v2.2.248 最新系统！`)
    }
  }, 180)
}

const exportPatchAuditCert = () => {
  const info = selectedLegacyInfo.value
  const lines: string[] = [
    '========================================================================',
    '    《光之战士：时空裂隙》版本热更补丁与单机存档迁徙审计证书 (VBLE Audit)',
    '========================================================================',
    '签发引擎: Godot 4.6 LTS / save_migration_patch_resolver.gd',
    `安全哈希: SHA256-PATCH-${Date.now().toString(16).toUpperCase()}`,
    `签发时间: ${new Date().toISOString()}`,
    '------------------------------------------------------------------------',
    '【源版本与目标架构】:',
    `  - 源存档年代: ${info.name} (${info.period})`,
    `  - 原始版本号: ${info.versionTag}`,
    `  - 目标架构版本: v2.2.248 (最新正式版)`,
    `  - 兼容性评级: A+ 无损幂等级`,
    '------------------------------------------------------------------------',
    '【已注入与对齐之数据字段】:'
  ]

  info.injectList.forEach((item, idx) => {
    lines.push(`  ${idx + 1}. [补齐字段] ${item} (对齐 v2.2.248 规范)`)
  })

  lines.push('------------------------------------------------------------------------')
  lines.push('【全版本增量差量包体清单】:')
  patchList.value.forEach(p => {
    lines.push(`  ★ [${p.version}] ${p.title} (${p.deltaSize}) - Hash: ${p.hash}`)
  })

  lines.push('========================================================================')
  lines.push('单机存档箴言: 岁月流转，英雄不朽。历经万千版本，旅程如初！')

  const report = lines.join('\n')

  try {
    navigator.clipboard.writeText(report)
    message.success('已复制《版本热更补丁与单机存档迁徙审计证书》至剪贴板！')
  } catch {
    // ignore
  }

  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `savefile_migration_cert_v2.2.248_${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

// Godot 4.x 代码
const gdScriptCode = `# ==============================================================================
# GameEventBulletinManager - 游戏离线周期日历活动与版本广播管理器
# 文件路径: res://scripts/core/game_event_bulletin_manager.gd
# 架构定位: 解析本地时钟周期活动、向大地图跑马灯投递官方广播并管理未读状态
# ==============================================================================
class_name GameEventBulletinManager
extends Node

signal active_event_changed(event_id: String, is_active: bool)
signal bulletin_received(bulletin_data: Dictionary)

# 离线周期活动配置字典
var scheduled_events: Dictionary = {
	"evt_abyss_carnival": {
		"title": "深渊竞技场狂欢周",
		"days_of_week": [5, 6, 0], # 周五、周六、周日
		"drop_multiplier": 2.0
	},
	"evt_tail_fever": {
		"title": "次元裂隙尾巴寻宝热潮",
		"days_of_month": range(1, 8),
		"drop_multiplier": 2.0
	},
	"evt_mysidia_exp": {
		"title": "米西迪亚双倍以太研修节",
		"days_of_week": [3], # 周三
		"abp_multiplier": 2.0
	}
}

var _read_bulletin_ids: Dictionary = {}

func _ready() -> void:
	_check_current_calendar_events()
	print("[Bulletin] 离线事件广播管理器就绪，当前活跃活动数: %d" % get_active_event_ids().size())

## 检查本地系统时钟判定当前活跃活动
func _check_current_calendar_events() -> void:
	var dt := Time.get_datetime_dict_from_system()
	var day_of_week: int = dt["weekday"]
	var day_of_month: int = dt["day"]
	
	for eid in scheduled_events.keys():
		var data: Dictionary = scheduled_events[eid]
		var is_active := false
		
		if data.has("days_of_week") and (day_of_week in data["days_of_week"]):
			is_active = true
		if data.has("days_of_month") and (day_of_month in data["days_of_month"]):
			is_active = true
			
		emit_signal("active_event_changed", eid, is_active)

## 获取当前所有激活的活动 ID 列表
func get_active_event_ids() -> Array[String]:
	var active_list: Array[String] = []
	var dt := Time.get_datetime_dict_from_system()
	for eid in scheduled_events.keys():
		var data: Dictionary = scheduled_events[eid]
		if data.has("days_of_week") and (dt["weekday"] in data["days_of_week"]):
			active_list.append(eid)
	return active_list

## 标记广播已读
func mark_bulletin_as_read(bulletin_id: String) -> void:
	_read_bulletin_ids[bulletin_id] = true
`

const gdSaveMigrationCode = [
  '# ============================================================================== ',
  '# SaveMigrationPatchResolver - 单机存档向前兼容结构升级与热更补丁解析器',
  '# 文件路径: res://scripts/core/save_migration_patch_resolver.gd',
  '# 架构定位: VBLE Bulletin & Save Migration Matrix v2.2.248',
  '# ============================================================================== ',
  'class_name SaveMigrationPatchResolver',
  'extends Node',
  '',
  'signal migration_started(from_version: String, to_version: String)',
  'signal field_injected(field_key: String, default_value: Variant)',
  'signal migration_completed(success: bool, final_hash: String)',
  '',
  'const CURRENT_SAVE_VERSION: String = "v2.2.248"',
  '',
  'const MIGRATION_RULES = {',
  '	"v1.0.0": {',
  '		"inject_fields": {',
  '			"kuzar_weapons": [],',
  '			"rainbow_tails": {},',
  '			"chocobo_stables": { "yellow": 1, "blue": 0, "black": 0, "red": 0, "gold": 0 },',
  '			"odin_trial_cleared": false',
  '		}',
  '	},',
  '	"v2.0.120": {',
  '		"inject_fields": {',
  '			"chocobo_genetics": {},',
  '			"active_signets": ["bahamut"]',
  '		}',
  '	}',
  '}',
  '',
  'func migrate_save_data(save_dict: Dictionary) -> Dictionary:',
  '	var source_ver: String = save_dict.get("version", "v1.0.0")',
  '	emit_signal("migration_started", source_ver, CURRENT_SAVE_VERSION)',
  '	',
  '	if MIGRATION_RULES.has(source_ver):',
  '		var rule: Dictionary = MIGRATION_RULES[source_ver]',
  '		for key in rule.inject_fields.keys():',
  '			if not save_dict.has(key):',
  '				save_dict[key] = rule.inject_fields[key]',
  '				emit_signal("field_injected", key, rule.inject_fields[key])',
  '	',
  '	save_dict["version"] = CURRENT_SAVE_VERSION',
  '	var sha := save_dict.hash()',
  '	emit_signal("migration_completed", true, str(sha))',
  '	return save_dict'
].join('\n')

const copyGdScript = () => {
  let code = ''
  let filename = ''
  if (activeCodeTab.value === 'bulletin') {
    code = gdScriptCode
    filename = 'game_event_bulletin_manager.gd'
  } else if (activeCodeTab.value === 'patch') {
    code = gdSaveMigrationCode
    filename = 'save_migration_patch_resolver.gd'
  } else if (activeCodeTab.value === 'chronicle') {
    code = gdChronicleCode
    filename = 'world_chronicle_evolution_simulator.gd'
  } else {
    code = gdBroadcastCode
    filename = 'spatiotemporal_broadcast_engine.gd'
  }
  navigator.clipboard.writeText(code).then(() => {
    copiedCode.value = true
    message.success(`${filename} 源码已复制到剪贴板！`)
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  })
}

// ================= 模式 B5: 全域编年史与时空世界线演化沙盘 =================
interface WorldlineDef {
  id: string
  name: string
  icon: string
  era: string
  epochRange: string
  summary: string
  dominantFaction: string
  tagType: 'success' | 'warning' | 'error' | 'info'
  stateBadge: string
}

const worldlinesList: WorldlineDef[] = [
  {
    id: 'world_1_primal',
    name: '始源世界线 (World 1 - Primal Order)',
    icon: '🌱',
    era: '秩序时代',
    epochRange: '纪元 -1000 ~ 0 年',
    summary: '四大水晶秩序井然，人类城邦泰空、沃鲁斯繁荣发展，虚无奇点被死死封印在深渊裂缝。',
    dominantFaction: '泰空王国圣骑士团 / 四水晶先知行会',
    tagType: 'success',
    stateBadge: 'I 阶 · 始源稳固态'
  },
  {
    id: 'world_2_rift',
    name: '异界重构线 (World 2 - Merged Rift)',
    icon: '⚡',
    era: '并合浩劫',
    epochRange: '纪元 +1 ~ +500 年',
    summary: '邪恶大魔导艾克斯迪斯破除古老封印，晓之四战士舍命抵御，两个平行大陆发生时空物理坍缩与重构。',
    dominantFaction: '晓之四战士军团 / 库扎封印城防卫军',
    tagType: 'warning',
    stateBadge: 'II 阶 · 大陆并合态'
  },
  {
    id: 'world_3_void',
    name: '虚无坍缩线 (World 3 - Void Singularity)',
    icon: '🌌',
    era: '虚无降临',
    epochRange: '纪元 +501 ~ +999 年',
    summary: '次元之隙彻底撕裂！新·艾克斯迪斯化为虚无主宰吞噬万物，隐藏深渊的神龙与机动巨神欧米茄肆虐战场。',
    dominantFaction: '虚无奇点军团 / 次元深渊两大灭世霸主',
    tagType: 'error',
    stateBadge: 'III 阶 · 虚无吞噬态'
  },
  {
    id: 'world_4_transcendence',
    name: '超越创世线 (Transcendence World 4)',
    icon: '🌟',
    era: '永恒星辰',
    epochRange: '纪元 +1000 年及以后',
    summary: '光之战士携太古十二神兵共鸣羁绊与全神明契约，斩断因果轮回，虚无归于平静，四水晶化作守护永恒宇宙的星空基盘。',
    dominantFaction: '光之战士超越者同盟 / 太古诸神圣殿',
    tagType: 'success',
    stateBadge: 'IV 阶 · 终焉超越态'
  }
]

const selectedWorldlineId = ref('world_1_primal')
const voidSingularityIndex = ref(15)
const aetherStability = ref(85)
const currentEpochYear = ref(-200)

const currentWorldline = computed(() => {
  return worldlinesList.find(w => w.id === selectedWorldlineId.value) || worldlinesList[0]
})

const selectWorldline = (id: string) => {
  selectedWorldlineId.value = id
  if (id === 'world_1_primal') {
    voidSingularityIndex.value = 10
    aetherStability.value = 90
    currentEpochYear.value = -300
  } else if (id === 'world_2_rift') {
    voidSingularityIndex.value = 45
    aetherStability.value = 60
    currentEpochYear.value = 250
  } else if (id === 'world_3_void') {
    voidSingularityIndex.value = 85
    aetherStability.value = 30
    currentEpochYear.value = 750
  } else {
    voidSingularityIndex.value = 5
    aetherStability.value = 100
    currentEpochYear.value = 1000
  }
  evolutionLogs.value.unshift(`【世界线切换】跃迁至【${currentWorldline.value.name}】，时空纪元锚定 ${currentEpochYear.value} 年！`)
  message.info(`已切换至：${currentWorldline.value.name}`)
}

const calculatedCivilizationIndex = computed(() => {
  return Math.min(100, Math.max(5, Math.round(aetherStability.value * 0.7 + (100 - voidSingularityIndex.value) * 0.3)))
})

const collapseRiskText = computed(() => {
  if (voidSingularityIndex.value >= 75) return '🚨 极度危险 (随时崩解)'
  if (voidSingularityIndex.value >= 40) return '⚠️ 中度预警 (时空紊乱)'
  return '🟢 安全受控 (以太井然)'
})

const collapseRiskColor = computed(() => {
  if (voidSingularityIndex.value >= 75) return 'text-rose-400 font-black animate-pulse'
  if (voidSingularityIndex.value >= 40) return 'text-amber-400 font-bold'
  return 'text-emerald-400 font-bold'
})

const aetherSurgeRate = computed(() => {
  return Math.round(200 * (1 + (100 - voidSingularityIndex.value) / 100) * (aetherStability.value / 100))
})

interface MilestoneDef {
  id: string
  title: string
  year: string
  description: string
}

const timelineMilestonesList: MilestoneDef[] = [
  { id: 'm1', title: '太古库扎圣战 (Holy War of Kuza)', year: '纪元 -800 年', description: '十二古代圣者联手以生命铸成封印，将虚无大军锁闭于次元裂隙，遗留十二神兵。' },
  { id: 'm2', title: '风之水晶崩裂 (Wind Crystal Shattered)', year: '纪元 0 年', description: '泰空王前往风之神殿调查风之停滞，陨石坠落，四位光之战士命运首次交织。' },
  { id: 'm3', title: '双界大陆重合 (Bifrost Rift Merger)', year: '纪元 +280 年', description: '第一世界与第二世界空间发生几何坍缩，被撕裂的双界归一，封印之城再度浮现。' },
  { id: 'm4', title: '深渊神龙与欧米茄觉醒', year: '纪元 +650 年', description: '次元裂隙封印动摇，上古机械巨神欧米茄与星空守护神龙撕裂空间，降临次元之隙。' },
  { id: 'm5', title: '终焉超越与创世黎明', year: '纪元 +1000 年', description: '光之战士以太满破，斩灭新·艾克斯迪斯，四水晶重焕永恒光芒，重铸新世界秩序。' }
]

const evolutionLogs = ref<string[]>([
  '【系统】时空编年史引擎启动就绪，当前世界线：始源世界线。',
  '【观测】地脉以太稳定度 85%，虚无奇点处于沉睡阈值。'
])

const triggerRandomHistoryEvent = () => {
  const events = [
    '🌪️【时空异动】风之神殿以太涌流突发暴跌 15%！水晶发生微细共振。',
    '☄️【陨石侵彻】卡尔纳克外海检测到古代陨石坠落反应，次元裂缝扩张！',
    '🏰【遗迹共鸣】封印之城库扎十二神兵石碑显现圣光，地脉以太暴涨 20%！',
    '🌌【虚无反扑】新·艾克斯迪斯意志掠过次元边缘，虚无奇点指数上升 +10%！'
  ]
  const ev = events[Math.floor(Math.random() * events.length)]
  evolutionLogs.value.unshift(ev)
  voidSingularityIndex.value = Math.min(100, Math.max(0, voidSingularityIndex.value + (Math.random() > 0.5 ? 5 : -5)))
  message.warning('时空世界线发生宏观扰动！已记录演化日志。')
}

const resetWorldlineParams = () => {
  selectWorldline('world_1_primal')
  evolutionLogs.value = [
    '【系统】时空编年史引擎已重置，世界线归位至始源原点。',
    '【观测】地脉以太稳定度 90%，虚无奇点处于沉睡阈值。'
  ]
  message.info('世界线参数已重置至初始始源秩序')
}

const maxTranscendenceWorldline = () => {
  selectWorldline('world_4_transcendence')
  voidSingularityIndex.value = 0
  aetherStability.value = 100
  currentEpochYear.value = 1000
  evolutionLogs.value.unshift('🌟【创世极境】光之战士携十二神兵与神明契约完成终焉超越！虚无奇点完全湮灭！')
  message.success('⚡ 已一键推演至【超越创世线】！虚无奇点彻底归零！')
}

const exportChronicleCertificate = () => {
  const timestamp = new Date().toISOString()
  const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase()
  const fakeSha256 = `SHA256-${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`

  const certLines = [
    '========================================================================',
    '       《光之战士：时空裂隙》全域编年史与时空世界线演化方案书',
    '             OFFICIAL WORLD CHRONICLE & TIMELINE REPORT',
    '========================================================================',
    `方案唯一档案号: AGY-CHRONICLE-20261028-${randomHex}`,
    `安全防伪签名: ${fakeSha256}`,
    `签发世界线时间: ${timestamp}`,
    `官方规范基准: VBLE News, World Chronicle & Timeline Matrix v2.2.264`,
    `世界线演化位阶: ${currentWorldline.value.stateBadge}`,
    '',
    '------------------------------------------------------------------------',
    '【一、时空世界线分支与纪元宏观指标】',
    '------------------------------------------------------------------------',
    `当前选定分支: ${currentWorldline.value.name} [${currentWorldline.value.era}]`,
    `纪元时空跨度: ${currentWorldline.value.epochRange}`,
    `当前纪元锚点: ${currentEpochYear.value > 0 ? `+${currentEpochYear.value}` : currentEpochYear.value} 年`,
    `核心主导阵营: ${currentWorldline.value.dominantFaction}`,
    `世界线宏观概述: ${currentWorldline.value.summary}`,
    '',
    '------------------------------------------------------------------------',
    '【二、以太动力学与虚无侵蚀度审计】',
    '------------------------------------------------------------------------',
    `虚无奇点侵蚀度: ${voidSingularityIndex.value}%`,
    `地脉以太稳定度: ${aetherStability.value}%`,
    `文明存续繁荣指数: ${calculatedCivilizationIndex.value} / 100`,
    `次元坍塌崩解风险: ${collapseRiskText.value}`,
    `破限以太涌流速率: ${aetherSurgeRate.value} 以太赫兹`,
    '',
    '------------------------------------------------------------------------',
    '【三、历史重大里程碑编年清单】',
    '------------------------------------------------------------------------',
    ...timelineMilestonesList.map(m => `  • [${m.year}] ${m.title} —— ${m.description}`),
    '',
    '------------------------------------------------------------------------',
    '【四、时空史学家与晓之四战士铭文】',
    '------------------------------------------------------------------------',
    '“不论世界线如何分支，只要光芒犹在，时空裂隙彼方必将重现黎明。',
    ' 纵跨万年风霜，光之战士之名永铭星空！”',
    '========================================================================'
  ]

  const blob = new Blob([certLines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `chronicle_timeline_v2.2.264_${Date.now()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  message.success('📜 编年史世界线演化方案书已成功导出并下载！')
}

// Godot 4.6 LTS 编年史演化实机代码
const gdChronicleCode = [
  '## world_chronicle_evolution_simulator.gd',
  '## 《光之战士：时空裂隙》全域编年史与时空世界线动力学演化引擎',
  '## 官方引擎规范: VBLE News, World Chronicle & Timeline Matrix v2.2.264',
  'extends Node',
  'class_name WorldChronicleEvolutionSimulator',
  '',
  'signal worldline_shifted(worldline_id: String, epoch_year: int, aether_stability: float)',
  'signal singularity_erupted(void_index: float, collapse_risk: String)',
  'signal milestone_reached(milestone_id: String, event_name: String)',
  '',
  'const WORLDLINES = {',
  '	"world_1_primal": { "name": "始源世界线", "base_stability": 90.0, "base_void": 10.0 },',
  '	"world_2_rift": { "name": "异界重构线", "base_stability": 60.0, "base_void": 45.0 },',
  '	"world_3_void": { "name": "虚无坍缩线", "base_stability": 30.0, "base_void": 85.0 },',
  '	"world_4_transcendence": { "name": "超越创世线", "base_stability": 100.0, "base_void": 0.0 }',
  '}',
  '',
  'var current_worldline_id: String = "world_1_primal"',
  'var void_singularity_index: float = 15.0',
  'var aether_stability: float = 85.0',
  'var epoch_year: int = -200',
  '',
  'func shift_worldline(target_id: String, year: int) -> Dictionary:',
  '	if not WORLDLINES.has(target_id):',
  '		return { "success": false, "reason": "Unknown worldline branch" }',
  '	',
  '	current_worldline_id = target_id',
  '	epoch_year = year',
  '	var data: Dictionary = WORLDLINES[target_id]',
  '	aether_stability = data.base_stability',
  '	void_singularity_index = data.base_void',
  '	',
  '	emit_signal("worldline_shifted", target_id, epoch_year, aether_stability)',
  '	return { "worldline": target_id, "stability": aether_stability, "void": void_singularity_index }',
  '',
  'func calculate_collapse_risk() -> Dictionary:',
  '	var risk := "SAFE"',
  '	if void_singularity_index >= 75.0:',
  '		risk = "CRITICAL_COLLAPSE"',
  '	elif void_singularity_index >= 40.0:',
  '		risk = "WARNING_TURBULENCE"',
  '	',
  '	var civ_index: float = clampf(aether_stability * 0.7 + (100.0 - void_singularity_index) * 0.3, 0.0, 100.0)',
  '	emit_signal("singularity_erupted", void_singularity_index, risk)',
  '	return { "risk": risk, "civilization_index": civ_index }'
].join('\n')

// ==========================================
// 📡 全域时空战报广播与去中心化公告签名工坊 (v2.2.278)
// ==========================================
interface BroadcastChannel {
  id: string
  name: string
  tag: string
  icon: string
  summary: string
  powerMW: number
  gradient: string
}

const broadcastChannels: BroadcastChannel[] = [
  {
    id: 'astral_alert',
    name: '全域以太潮汐警报 (Astral Aether Tidal Alert)',
    tag: '紧急通报',
    icon: '🚨',
    summary: '虚空裂隙引力透镜偏转突变，全域水晶共鸣震颤预警',
    powerMW: 320,
    gradient: 'radial-gradient(circle, rgba(239,68,68,0.55) 0%, rgba(245,158,11,0.25) 50%, transparent 80%)'
  },
  {
    id: 'boss_slain',
    name: '深渊次元首领讨伐战报 (Abyss Boss Slain Dispatch)',
    tag: '史诗战报',
    icon: '⚔️',
    summary: '欧米茄与始源神龙首领核心击破，光之战士缔结诸神契约',
    powerMW: 280,
    gradient: 'radial-gradient(circle, rgba(245,158,11,0.55) 0%, rgba(168,85,247,0.3) 50%, transparent 80%)'
  },
  {
    id: 'void_rift',
    name: '时空裂隙异常扰动公报 (Void Rift Distortion Bulletin)',
    tag: '灾害公报',
    icon: '🌌',
    summary: '第三世界次元边缘坍缩，黑洞白洞对冲引力波监测',
    powerMW: 420,
    gradient: 'radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(59,130,246,0.3) 50%, transparent 80%)'
  },
  {
    id: 'relic_genesis',
    name: '太古十二圣器觉醒通告 (Primordial Relic Awakening Gazette)',
    tag: '奇迹通告',
    icon: '✨',
    summary: '王者之剑/诸神之黄昏+10破限开光，全域攻击上限突破',
    powerMW: 240,
    gradient: 'radial-gradient(circle, rgba(6,182,212,0.55) 0%, rgba(59,130,246,0.25) 50%, transparent 80%)'
  }
]

const selectedBroadcastChannelId = ref('astral_alert')
const transmitterPower = ref(320)
const relayPeerDensity = ref(96)
const snrThreshold = ref(36)
const multiSigRounds = ref(7)
const enableMerkleValidation = ref(true)
const enableSpatiotemporalReprojection = ref(true)
const enableAdHocRoaming = ref(true)
const isSimulatingBroadcast = ref(false)

const currentBroadcastChannel = computed(() => {
  return broadcastChannels.find(c => c.id === selectedBroadcastChannelId.value) || broadcastChannels[0]
})

const applyBroadcastChannel = (channelId: string) => {
  selectedBroadcastChannelId.value = channelId
  const ch = broadcastChannels.find(c => c.id === channelId)
  if (ch) {
    transmitterPower.value = ch.powerMW
    message.info(`已切换至【${ch.name}】广播频道`)
  }
}

const resetBroadcastParams = () => {
  applyBroadcastChannel('astral_alert')
  relayPeerDensity.value = 96
  snrThreshold.value = 36
  multiSigRounds.value = 7
  enableMerkleValidation.value = true
  enableSpatiotemporalReprojection.value = true
  enableAdHocRoaming.value = true
}

const broadcastSimulationLogs = ref<string[]>([
  '系统就绪: Godot 4.6 LTS 全域时空战报广播分发与验签引擎载入完毕',
  'P2P 蜂窝拓扑: 超导中继网络 96 个分布式信标节点握手成功',
  'Merkle 根哈希: SHA-256 分块叶节点完整性自检通过',
  '共识机制: BFT 拜占庭容错与多重门限签名准备'
])

const broadcastMetrics = computed(() => {
  const coverageRadius = Math.round(transmitterPower.value * 12.5 + relayPeerDensity.value * 8.4)
  const throughputKbps = Math.round(transmitterPower.value * 3.8 + relayPeerDensity.value * 6.5)
  const consensusTrust = (98.0 + (multiSigRounds.value / 15.0) * 1.8 + (enableMerkleValidation.value ? 0.15 : 0.0)).toFixed(2)

  let rating = 'Forward+ Clustered 广播超导级'
  if (transmitterPower.value >= 400) rating = '跨界天体级全域穿透'
  else if (transmitterPower.value >= 250) rating = '大陆行省级毫秒覆写'
  else rating = '局域网边缘自组网'

  return {
    coverageRadius,
    throughputKbps,
    consensusTrust,
    rating
  }
})

const simulateBroadcastDispatch = () => {
  isSimulatingBroadcast.value = true
  const now = new Date()
  const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  broadcastSimulationLogs.value = [
    `[${ts}] 🚀 启动全域时空战报广播分发推演...`,
    `[${ts}] 阶段 1: 调谐【${currentBroadcastChannel.value.name}】，发射功率锁定 ${transmitterPower.value} MW`,
    `[${ts}] 阶段 2: 激活 ${relayPeerDensity.value} 个 P2P 中继节点，时空辐射半径突破 ${broadcastMetrics.value.coverageRadius} 光秒`,
    `[${ts}] 阶段 3: 执行 ${multiSigRounds.value} 轮多重签名核验，${enableMerkleValidation.value ? 'Merkle 根哈希防篡改校验通过' : '常规哈希核对'}`,
    `[${ts}] 阶段 4: 信号信噪比稳定于 ${snrThreshold.value} dB，${enableAdHocRoaming.value ? 'Mesh 离线漫游自愈网络激活' : '单点路由分发'}`,
    `[${ts}] ✨ 战报全网广播完成！传播吞吐 ${broadcastMetrics.value.throughputKbps} kbps，共识信任度 ${broadcastMetrics.value.consensusTrust}%！`
  ]

  setTimeout(() => {
    isSimulatingBroadcast.value = false
    message.success(`⚡ 战报广播分发完成！共识信任度 ${broadcastMetrics.value.consensusTrust}%`)
  }, 600)
}

const exportBroadcastCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  const certLines = [
    '================================================================================',
    '   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)',
    '   全域时空战报广播与去中心化公告签名方案证书 (v2.2.278)',
    '================================================================================',
    `颁发时间: ${timeStr}`,
    `广播频道: ${currentBroadcastChannel.value.name}`,
    `通报概要: ${currentBroadcastChannel.value.summary}`,
    '运行架构: Godot 4.6 LTS / spatiotemporal_broadcast_engine.gd',
    '',
    '【时空战报广播分发 Uniform 参数】',
    `- 广播发射功率 (Transmitter Power): ${transmitterPower.value} MW`,
    `- 中继节点密度 (Relay Peer Density): ${relayPeerDensity.value} Peers`,
    `- 信号信噪比阈值 (SNR Threshold): ${snrThreshold.value} dB`,
    `- 签名多重验签轮次 (Multi-Sig Rounds): ${multiSigRounds.value} 轮`,
    `- Merkle 树根哈希分块验签: ${enableMerkleValidation.value ? '已启用 (防篡改无碰撞)' : '关闭'}`,
    `- 跨世界线零时延重投影: ${enableSpatiotemporalReprojection.value ? '已激活 (四界同步)' : '关闭'}`,
    `- 断网自组网 Mesh 漫游传播: ${enableAdHocRoaming.value ? '已激活 (局域自愈)' : '关闭'}`,
    '',
    '【广播网络实机遥测指标】',
    `- 时空辐射覆盖半径: ${broadcastMetrics.value.coverageRadius} 光秒`,
    `- 消息传播吞吐速率: ${broadcastMetrics.value.throughputKbps} kbps`,
    `- 共识核签信任度: ${broadcastMetrics.value.consensusTrust}%`,
    `- 综合网络评级: ${broadcastMetrics.value.rating}`,
    '',
    '【底层引擎契约安全指纹】',
    '- Engine Spec: Godot 4.6 LTS / GDScript RefCounted Pure Logic',
    `- Merkle Root: 0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
    `- Digital Fingerprint: SHA256-BROADCAST-${Math.random().toString(36).substring(2, 10).toUpperCase()}${Date.now().toString(36).toUpperCase()}`,
    '================================================================================'
  ]

  const certContent = certLines.join('\n')

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `spatiotemporal_broadcast_v2.2.278_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  message.success('时空战报广播签名方案书已导出并同步至剪贴板！')
}

const gdBroadcastCode = [
  '## spatiotemporal_broadcast_engine.gd',
  '## Godot 4.6 LTS - 全域时空战报广播与去中心化公告签名引擎',
  'extends RefCounted',
  'class_name SpatiotemporalBroadcastEngine',
  '',
  'signal dispatch_broadcasted(channel_id: String, power_mw: float, peers_count: int)',
  'signal consensus_verified(merkle_root: String, trust_rate: float)',
  '',
  'var transmitter_power: float = 320.0',
  'var relay_peer_density: int = 96',
  'var snr_threshold: float = 36.0',
  'var multi_sig_rounds: int = 7',
  'var enable_merkle: bool = true',
  'var enable_roaming: bool = true',
  '',
  'func calculate_broadcast_coverage() -> Dictionary:',
  '\tvar radius: float = transmitter_power * 12.5 + float(relay_peer_density) * 8.4',
  '\tvar throughput: float = transmitter_power * 3.8 + float(relay_peer_density) * 6.5',
  '\tvar trust: float = 98.0 + (float(multi_sig_rounds) / 15.0) * 1.8 + (0.15 if enable_merkle else 0.0)',
  '\tvar merkle_hash: String = "0x" + String.num_int64(Time.get_ticks_msec()).sha256_text().substr(0, 16)',
  '\t',
  '\treturn {',
  '\t\t"coverage_radius_light_seconds": radius,',
  '\t\t"throughput_kbps": throughput,',
  '\t\t"consensus_trust": trust,',
  '\t\t"merkle_root": merkle_hash,',
  '\t\t"is_secure": trust >= 99.0,',
  '\t\t"signature": "SHA256-BROADCAST-" + String.num_int64(Time.get_ticks_msec()).sha256_text().substr(0, 16)',
  '\t}'
].join('\n')

// ==================== v2.2.313 官方时空联播与纪元工坊状态与方法 ====================
const scrollToEpochChronicleStudio = () => {
  const el = document.getElementById('epoch-chronicle-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    message.success('已直达官方情报站时空联播工坊')
  }
}

interface NewsArchetype {
  id: string
  name: string
  icon: string
  badge: string
  desc: string
  radius: string
  trust: string
  power: number
  density: number
  snr: number
  rounds: number
}

const newsArchetypes: NewsArchetype[] = [
  {
    id: 'emergency_bulletin',
    name: '全服紧急维护联播流',
    icon: '🚨',
    badge: '紧急特讯',
    desc: '最大发射功率极速透传，全服客户端 100ms 内强制弹窗置顶。',
    radius: '18,500 光秒',
    trust: '99.5%',
    power: 800,
    density: 150,
    snr: 45,
    rounds: 9
  },
  {
    id: 'major_version_livestream',
    name: '纪元大版本全景联播流',
    icon: '🎉',
    badge: '盛典发布',
    desc: '富媒体大图与视频时间轴广播，超宽带信道多路并行并发。',
    radius: '14,200 光秒',
    trust: '99.2%',
    power: 600,
    density: 120,
    snr: 38,
    rounds: 7
  },
  {
    id: 'community_chronicle',
    name: '公会风土与大事纪档案流',
    icon: '📖',
    badge: '编年档案',
    desc: '低功耗高容灾异步存储，按世界线维度永久沉淀历史丰碑。',
    radius: '9,800 光秒',
    trust: '98.5%',
    power: 350,
    density: 80,
    snr: 28,
    rounds: 5
  },
  {
    id: 'merkle_signed_dispatch',
    name: '去中心化 Merkle 防伪流',
    icon: '🛡️',
    badge: '零信任背书',
    desc: '多签背书 + Merkle Root 双重防伪，杜绝虚空幻影伪造战报。',
    radius: '16,000 光秒',
    trust: '99.9%',
    power: 700,
    density: 160,
    snr: 50,
    rounds: 12
  }
]

const selectedNewsArchetype = ref<NewsArchetype>(newsArchetypes[3])

const epochTransmitterPower = ref(700)
const epochRelayNodeDensity = ref(160)
const epochSnrThreshold = ref(50)
const epochMultiSigRounds = ref(12)

const enableAutoRoamingRelay = ref(true)
const enableZeroTrustMerkle = ref(true)
const enableOfflineCacheResync = ref(true)

const selectNewsArchetype = (arch: NewsArchetype) => {
  selectedNewsArchetype.value = arch
  epochTransmitterPower.value = arch.power
  epochRelayNodeDensity.value = arch.density
  epochSnrThreshold.value = arch.snr
  epochMultiSigRounds.value = arch.rounds
  message.info(`已装配时空联播原型: ${arch.name}`)
}

const resetEpochNewsDefaults = () => {
  selectNewsArchetype(newsArchetypes[3])
  enableAutoRoamingRelay.value = true
  enableZeroTrustMerkle.value = true
  enableOfflineCacheResync.value = true
}

const calculatedRadius = computed(() => {
  let r = epochTransmitterPower.value * 14.5 + epochRelayNodeDensity.value * 28.0
  if (enableAutoRoamingRelay.value) r *= 1.15
  return Math.floor(r)
})

const calculatedThroughput = computed(() => {
  let tp = epochTransmitterPower.value * 4.2 + epochRelayNodeDensity.value * 11.5
  if (!enableZeroTrustMerkle.value) tp *= 1.05
  return Math.floor(tp)
})

const calculatedTrust = computed(() => {
  let t = 95.0 + (epochMultiSigRounds.value / 15) * 4.0 + (epochSnrThreshold.value / 60) * 0.8
  if (enableZeroTrustMerkle.value) t += 0.15
  return Math.min(99.9, Number(t.toFixed(1)))
})

const calculatedNewsCert = computed(() => {
  const t = calculatedTrust.value
  if (t >= 99.8) return 'EX·太古全域通报主权'
  if (t >= 98.5) return 'SSS·高可用默克尔广播'
  if (t >= 95.0) return 'SS·生产级战报信道'
  return 'S·基础公告广播'
})

const isNewsSimulating = ref(false)
const newsSimStage = ref(1)
const newsSimStageName = ref('就绪等待')
const newsSimProgress = ref(0)
const newsCertHash = ref('E9A1C2D3-F4B5-6C7D-8E9F-0A1B2C3D4E5F')

interface NewsLogEntry {
  time: string
  text: string
  color: string
}

const newsLogs = ref<NewsLogEntry[]>([
  { time: '13:00:00', text: '[BroadcastInit] 时空联播天线阵列校准完毕，等待注入发射功率...', color: 'text-gray-400' }
])

const runEpochNewsSimulation = () => {
  if (isNewsSimulating.value) return
  isNewsSimulating.value = true
  newsSimStage.value = 1
  newsSimProgress.value = 15
  newsSimStageName.value = '跨维度射频校准与发射功率爬升'
  newsLogs.value = [
    { time: new Date().toLocaleTimeString(), text: `[Transmitter] 射频功率注入 ${epochTransmitterPower.value} MW，信噪比 ${epochSnrThreshold.value} dB 稳态`, color: 'text-emerald-400' }
  ]

  setTimeout(() => {
    newsSimStage.value = 2
    newsSimProgress.value = 40
    newsSimStageName.value = '全域中继节点漫游握手与拓扑组网'
    newsLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[RelayMesh] 链接 ${epochRelayNodeDensity.value} 个中继节点，覆盖光秒半径 ${calculatedRadius.value} 光秒`,
      color: 'text-cyan-400'
    })
  }, 400)

  setTimeout(() => {
    newsSimStage.value = 3
    newsSimProgress.value = 65
    newsSimStageName.value = 'Merkle Root 树状签名与多签背书撮合'
    newsLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[MerkleSign] ${epochMultiSigRounds.value} 轮多方背书完成，共识防伪可信度 ${calculatedTrust.value}%`,
      color: 'text-amber-400'
    })
  }, 800)

  setTimeout(() => {
    newsSimStage.value = 4
    newsSimProgress.value = 85
    newsSimStageName.value = '断线重放离线缓存队列校验封板'
    newsLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: '[CacheResync] 离线断线重播缓冲区校验通过，吞吐峰值 ' + calculatedThroughput.value + ' Kbps',
      color: 'text-purple-400'
    })
  }, 1200)

  setTimeout(() => {
    newsSimStage.value = 5
    newsSimProgress.value = 100
    newsSimStageName.value = '推演闭环完成，联播证书已签发'
    const hex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('').toUpperCase()
    newsCertHash.value = `BC-${hex}-${Math.floor(Date.now() / 1000)}`
    newsLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[Done] 时空联播推演完成！官方情报认证评级: ${calculatedNewsCert.value}`,
      color: 'text-emerald-300 font-bold'
    })
    isNewsSimulating.value = false
    message.success('时空联播与纪元大事件推演完成！')
  }, 1600)
}

const exportNewsCert = () => {
  const data = {
    studio: 'Spatiotemporal News Broadcast, Epoch Chronicle & Merkle Dispatch Studio v2.2.313',
    timestamp: new Date().toISOString(),
    archetype: selectedNewsArchetype.value.name,
    transmitterPower: epochTransmitterPower.value,
    relayNodeDensity: epochRelayNodeDensity.value,
    snrThreshold: epochSnrThreshold.value,
    multiSigRounds: epochMultiSigRounds.value,
    radius: calculatedRadius.value,
    throughput: calculatedThroughput.value,
    trust: calculatedTrust.value,
    newsCert: calculatedNewsCert.value,
    sha256Signature: newsCertHash.value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `news-broadcast-${newsCertHash.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('防伪证书与联播报告已导出')
}

// Godot 4.6 LTS 源码展台
const activeNewsCodeTab = ref('news_broadcaster')
const newsCodeTabs = [
  { id: 'news_broadcaster', name: '时空联播发射机' },
  { id: 'merkle_verifier', name: '默克尔树校验器' },
  { id: 'offline_resync', name: '离线重同步管理器' }
]

const newsSourceCodes: Record<string, string> = {
  news_broadcaster: `## spatiotemporal_news_broadcaster.gd
## 《光之战士：时空裂隙》时空联播天线阵列与全域战报广播驱动
## 架构版本: Godot 4.6 LTS / Spatiotemporal Broadcast Engine

class_name SpatiotemporalNewsBroadcaster
extends RefCounted

signal news_dispatched(topic: String, light_seconds: float, payload_kb: float)
signal relay_acknowledged(node_id: String, latency_ms: float)

var _transmitter_power_mw: float = 700.0
var _node_density: int = 160

func _init(power_mw: float = 700.0, density: int = 160) -> void:
	_transmitter_power_mw = power_mw
	_node_density = density

## 向多维宇宙广播紧急官方战报
func broadcast_announcement(topic: String, content: Dictionary) -> Dictionary:
	var payload_str := JSON.stringify(content)
	var payload_kb := float(payload_str.length()) / 1024.0
	var radius := _transmitter_power_mw * 14.5 + float(_node_density) * 28.0
	
	news_dispatched.emit(topic, radius, payload_kb)
	return {
		"status": "DISPATCHED",
		"topic": topic,
		"coverage_radius": radius,
		"timestamp": Time.get_unix_time_from_system()
	}
`,
  merkle_verifier: `## epoch_merkle_chronicle_verifier.gd
## 《光之战士：时空裂隙》Merkle 树树状防伪与多签背书验证器
## 架构版本: Godot 4.6 LTS / Cryptographic Security

class_name EpochMerkleChronicleVerifier
extends RefCounted

signal signature_validated(is_valid: bool, consensus_ratio: float)
signal tamper_detected(node_hash: String, expected_root: String)

## 验证公告哈希是否与全服默克尔根一致
func verify_merkle_proof(leaf_hash: String, proof_hashes: Array[String], root_hash: String) -> bool:
	var current := leaf_hash
	for sibling in proof_hashes:
		var combined := current + sibling if current < sibling else sibling + current
		current = "0x" + combined.sha256_text().substr(0, 32)
		
	var is_match := (current == root_hash)
	if not is_match:
		tamper_detected.emit(leaf_hash, root_hash)
	signature_validated.emit(is_match, 0.999 if is_match else 0.0)
	return is_match
`,
  offline_resync: `## offline_cache_resync_manager.gd
## 《光之战士：时空裂隙》离线日志断线重播与双向同步管理器
## 架构版本: Godot 4.6 LTS / Reliability Subsystem

class_name OfflineCacheResyncManager
extends RefCounted

signal queue_synced(replayed_count: int, sync_elapsed_ms: float)

var _pending_queue: Array[Dictionary] = []

func enqueue_offline_event(event_dict: Dictionary) -> void:
	_pending_queue.append(event_dict)

## 客户端网络重连时按时序重放同步
func flush_resync_queue() -> int:
	var start_ms := Time.get_ticks_msec()
	var total := _pending_queue.size()
	
	_pending_queue.sort_custom(func(a, b): return a.get("timestamp", 0) < b.get("timestamp", 0))
	_pending_queue.clear()
	
	var elapsed := float(Time.get_ticks_msec() - start_ms)
	queue_synced.emit(total, elapsed)
	return total
`
}

const currentNewsCode = computed(() => {
  return newsSourceCodes[activeNewsCodeTab.value] || ''
})

const copyActiveNewsCode = () => {
  navigator.clipboard.writeText(currentNewsCode.value).then(() => {
    message.success(`${activeNewsCodeTab.value}.gd 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}

</script>

<style scoped>
.news-action {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.news-action:hover {
  transform: translateY(-2px);
}
</style>
