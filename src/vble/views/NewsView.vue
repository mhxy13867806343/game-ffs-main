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
          掌握双月宇宙核心版本发布、大秘境通关攻略、世界风土志、单机特典特权与离线活动排期雷达
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

    <!-- 模式 B4：Godot 4.x 引擎广播分发系统源码 -->
    <div v-if="activeMode === 'engine_code'" class="space-y-4">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                GODOT 4.X BULLETIN ENGINE
              </span>
              <h3 class="text-base font-bold text-white">game_event_bulletin_manager.gd</h3>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              离线单机周期活动日历解析器、城镇跑马灯横幅广播与未读补丁标记持久化单例。
            </p>
          </div>
          <n-button size="small" round secondary type="info" @click="copyGdScript">
            <template #icon><span>📋</span></template>
            复制代码
          </n-button>
        </div>

        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[550px]">{{ gdScriptCode }}</pre>
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
type ViewMode = 'articles' | 'event_radar' | 'community_qa' | 'engine_code'
const activeMode = ref<ViewMode>('articles')
const viewModes: { key: ViewMode; label: string; icon: string; badge?: string }[] = [
  { key: 'articles', label: '单机档案全量资讯', icon: '📢' },
  { key: 'event_radar', label: '周期活动与版本雷达', icon: '📡', badge: 'HOT' },
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

const copyGdScript = () => {
  navigator.clipboard.writeText(gdScriptCode).then(() => {
    message.success('game_event_bulletin_manager.gd 源码已复制到剪贴板！')
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
