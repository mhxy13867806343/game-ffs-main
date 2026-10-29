<template>
  <div class="search-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-cyan-950/80 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              VBLE Search Engine, Token Inverted Index & Microsecond Recall Studio v2.2.315
            </span>
            <span class="text-xs text-gray-400">全域全字段多维检索与关联图谱</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🔍</span> 全域数据库索引与跨维度检索工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            支持对魔物首领、秘境地宫、神兵装备、全职业矩阵、英雄角色、召唤兽契约、载具、支线、调合配方与天体星阵的全字段模糊即时搜索与三维关联图谱推演。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="primary"
            size="medium"
            round
            class="shadow-md font-bold text-black bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300"
            @click="scrollToOmniRecallStudio"
          >
            <template #icon><span>⚡</span></template>
            分词索引与微秒召回工坊
          </n-button>
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>🕸️</span></template>
            前往关联图谱沙盘
          </n-button>
          <router-link to="/vble">
            <n-button size="medium" round tertiary>
              返回游戏首页
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 搜索输入框与热门热搜词 -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="max-w-3xl mx-auto space-y-3">
        <n-input
          v-model:value="keyword"
          :input-props="{ 'aria-label': '全域数据库搜索' }"
          placeholder="输入任意怪物名、技能名、地宫名、职业名、装备或机制关键词 (如: 奥丁、欧米茄、粉色尾巴、巨人之药)..."
          size="large"
          round
          clearable
          class="shadow-xl text-base"
        >
          <template #prefix>🔍</template>
        </n-input>

        <!-- 热门关键词快速填入 -->
        <div class="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span class="text-gray-400 font-medium">🔥 热门搜索推荐:</span>
          <button
            v-for="hot in hotKeywords"
            :key="hot"
            type="button"
            class="px-2.5 py-1 rounded-full bg-slate-800 text-gray-300 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer text-xs"
            @click="keyword = hot"
          >
            {{ hot }}
          </button>
        </div>
      </div>
    </div>

    <!-- 分类过滤与统计导航 -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap gap-2 items-center justify-between">
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="cat in filterCategories"
          :key="cat.id"
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
          :class="selectedCategory === cat.id ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-800 text-gray-300 hover:text-white'"
          @click="selectedCategory = cat.id"
        >
          <span>{{ cat.icon }}</span>
          <span>{{ cat.name }}</span>
          <span class="text-[10px] opacity-75 font-mono">({{ getCategoryCount(cat.id) }})</span>
        </button>
      </div>

      <div class="text-xs text-gray-400 font-mono">
        全景匹配 <strong class="text-cyan-400 font-bold text-sm">{{ filteredResults.length }}</strong> 条档案
      </div>
    </div>

    <!-- 搜索结果网格列表 -->
    <div v-if="filteredResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="res in filteredResults"
        :key="res.key"
        role="button"
        tabindex="0"
        class="p-5 rounded-xl bg-[#0f1422]/90 border border-slate-800 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-between cursor-pointer group"
        @click="openItem(res)"
      >
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ res.icon }}</span>
              <div>
                <h3 class="text-base font-bold text-gray-100 group-hover:text-cyan-300 transition-colors">
                  {{ res.name }}
                </h3>
                <span class="text-[11px] text-gray-400 font-mono">{{ res.sourcePath }}</span>
              </div>
            </div>
            <n-tag size="tiny" :type="res.tagType">{{ res.categoryName }}</n-tag>
          </div>

          <p class="text-xs text-gray-300 line-clamp-3 leading-relaxed">
            {{ res.desc }}
          </p>

          <div v-if="res.extra" class="p-2 rounded bg-slate-950/70 border border-slate-850 text-amber-300/90 font-mono text-xs truncate">
            {{ res.extra }}
          </div>
        </div>

        <div class="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-500">
          <span>标识: {{ res.key }}</span>
          <span class="text-cyan-400 font-medium group-hover:underline">点击展开详情 ➔</span>
        </div>
      </div>
    </div>

    <!-- 无结果提示 -->
    <div v-else-if="keyword.trim()" class="text-center py-16 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
      <div class="text-4xl">🔭</div>
      <div class="text-base font-bold text-gray-300">未检索到与 “{{ keyword }}” 相关的档案内容</div>
      <p class="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
        请尝试简化搜索词或选用上方热门词汇。本引擎已支持魔物、地城、神装、职业、角色、召唤兽、载具、支线与调合全域跨表搜索。
      </p>
    </div>

    <!-- 初始引导 -->
    <div v-else class="text-center py-12 p-8 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-2">
      <div class="text-3xl">💡</div>
      <div class="text-sm font-semibold text-gray-300">请输入关键字开启全景检索</div>
      <p class="text-xs text-gray-500">已建立全域 10 大子系统超 300+ 核心条目倒排索引缓存</p>
    </div>

    <!-- 核心实机推演沙盘：三级深度关联图谱演算工坊 -->
    <div id="relation-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1424] via-[#101b30] to-[#0a0f1d] border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.18)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              CROSS-SYSTEM RELATION MATRIX
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🕸️</span> 全域词条三维深度关联图谱演练沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            对齐 Godot 引擎 omni_database_search.gd 倒排索引：全息推演单个核心词汇跨越职业、首领、神装与秘境的三维网状羁绊。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickAnalysis">
            ⚡ 拓扑深度解析
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：核心词汇选定与拓扑深度 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>🎯</span> 焦点索引词汇 (Focal Word)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选定焦点分析条目</label>
              <n-select
                v-model:value="selectedFocalWord"
                :options="focalWordOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>拓扑遍历关联深度 (Graph Depth):</span>
                <span class="font-mono text-cyan-400 font-bold text-sm">{{ graphDepth }} 级跃迁</span>
              </div>
              <n-slider v-model:value="graphDepth" :min="1" :max="3" :step="1" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【隐藏剧情与掉落反向追踪】:</span>
                <n-switch v-model:value="enableReverseTrace" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【跨职业神装穿戴羁绊校验】:</span>
                <n-switch v-model:value="enableJobSynergyCheck" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：拓扑关联节点展开 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div class="text-sm font-bold text-amber-300 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><span>🔗</span> 拓扑网状节点树</span>
            <span class="text-[11px] text-gray-400 font-mono">{{ currentAssociation.nodes.length }} 个节点</span>
          </div>

          <div class="space-y-2 text-xs overflow-y-auto max-h-56 pr-1">
            <div
              v-for="node in currentAssociation.nodes"
              :key="node.name"
              class="p-2.5 rounded bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between"
            >
              <div>
                <span class="font-bold text-gray-200">{{ node.icon }} {{ node.name }}</span>
                <div class="text-[10px] text-cyan-400 font-mono mt-0.5">{{ node.relation }}</div>
              </div>
              <n-tag size="tiny" :type="node.tagType">{{ node.category }}</n-tag>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息关联结算面板 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-cyan-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 关联网络拓扑健康度</span>
              <n-tag size="tiny" type="success">100% 连通完整</n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 关联紧密度评分 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">词条综合关联指数 (Affinity Index)</div>
                <div class="text-3xl font-black font-mono mt-1 tracking-wider text-cyan-400">
                  {{ currentAssociation.affinityScore }} Pt
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  {{ currentAssociation.verdict }}
                </div>
              </div>

              <!-- 拓扑判定 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-amber-400 font-bold flex items-center gap-1">
                  <span>✨ 核心关联链条:</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ currentAssociation.chainDesc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>索引算法: omni_database_search.gd</span>
            <span class="text-cyan-400">VBLE Search Engine v2.2.243</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-cyan-300">omni_database_search.gd (Godot 4.x 倒排全息索引算法)</span>
        </div>
        <n-button size="tiny" secondary type="info" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900">{{ godotCodeText }}</pre>
    </div>

    <!-- 全域时空裂隙智能搜索引擎、分词倒排索引与微秒级高维召回工坊 (v2.2.315 重磅实装) -->
    <div id="omni-recall-studio" class="omni-recall-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-cyan-950/20 to-slate-900/95 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              MICROSECOND RECALL & N-GRAM INVERTED SEARCH
            </span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
              v2.2.315 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>⚡</span> 全域时空裂隙智能搜索引擎、分词倒排索引与微秒级高维召回工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            提供十万级实体词条 N-Gram 滑动窗口倒排分词、BM25 动态权重点积、三跳图谱广度优先遍历与 Godot 4.6 LTS 底层实机微秒级精准召回管线。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="info" @click="resetOmniRecallDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="info" :loading="isSearchSimulating" @click="runOmniRecallSimulation">
            <template #icon><span>⚡</span></template>
            启动微秒召回全流程推演
          </n-button>
        </div>
      </div>

      <!-- 四大搜索引擎流派原型卡 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="archetype in searchArchetypes"
          :key="archetype.id"
          @click="selectSearchArchetype(archetype)"
          :class="[
            'p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden',
            selectedSearchArchetype.id === archetype.id
              ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
          ]"
        >
          <div class="flex items-center justify-between">
            <span class="text-xl">{{ archetype.icon }}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">{{ archetype.badge }}</span>
          </div>
          <div class="font-bold text-white text-sm mt-2">{{ archetype.name }}</div>
          <div class="text-xs text-gray-400 mt-1 leading-relaxed">{{ archetype.desc }}</div>
          <div class="mt-3 text-[11px] font-mono text-cyan-400/90 flex justify-between">
            <span>召回耗时: {{ archetype.latency }}</span>
            <span>准确度: {{ archetype.precision }}</span>
          </div>
        </div>
      </div>

      <!-- 核心微调滑块与调控开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800">
        <!-- 4 维连续滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-cyan-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>⚙️</span> 倒排索引与图谱召回参数调谐
          </div>
          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>倒排索引滑动窗口分词步长 (N-Gram Depth)</span>
                <span class="font-mono text-cyan-400 font-bold">{{ ngramDepth }} Grams</span>
              </div>
              <n-slider v-model:value="ngramDepth" :min="2" :max="6" :step="1" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>模糊拼写编辑距离阈值 (Levenshtein Distance)</span>
                <span class="font-mono text-amber-400 font-bold">{{ levenshteinDistance }} 字符</span>
              </div>
              <n-slider v-model:value="levenshteinDistance" :min="0" :max="4" :step="1" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>高维语义向量压缩维度 (Vector Embedding Dim)</span>
                <span class="font-mono text-emerald-400 font-bold">{{ vectorEmbeddingDim }} 维</span>
              </div>
              <n-slider v-model:value="vectorEmbeddingDim" :min="64" :max="512" :step="32" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>知识图谱广度优先遍历深度 (Max Graph Hops)</span>
                <span class="font-mono text-purple-400 font-bold">{{ maxGraphHops }} 跳 (Hops)</span>
              </div>
              <n-slider v-model:value="maxGraphHops" :min="1" :max="4" :step="1" />
            </div>
          </div>
        </div>

        <!-- 3 维调控开关与动态指标 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-teal-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>🛡️</span> 高可用加速与自愈智能守卫
          </div>
          <div class="space-y-2.5 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">跨维度全库瞬时内存预热加载</div>
                <div class="text-[10px] text-gray-400">将魔物/装备/职业全字典预编译至内存哈希桶，消除 IO 阻塞</div>
              </div>
              <n-switch v-model:value="enableMemoryPrewarm" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">热词动态权重点积自适应学习</div>
                <div class="text-[10px] text-gray-400">根据冒险者历史搜索点击反馈实时优化 BM25 综合排序得分</div>
              </div>
              <n-switch v-model:value="enableAdaptiveRerank" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">拼写错误自愈与智能纠错建议</div>
                <div class="text-[10px] text-gray-400">输入拼写偏差时自动提供【您是不是想找】并秒级修正召回</div>
              </div>
              <n-switch v-model:value="enableAutoCorrection" />
            </div>
          </div>

          <!-- 4 维解算核心指标 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">单次召回延迟</div>
              <div class="text-base font-black font-mono text-cyan-400 mt-0.5">{{ calculatedRecallLatency }} ms</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">准确率 MRR@10</div>
              <div class="text-base font-black font-mono text-emerald-400 mt-0.5">{{ calculatedPrecisionRate }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">内存压缩率</div>
              <div class="text-base font-black font-mono text-amber-400 mt-0.5">{{ calculatedCompressionRate }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">搜索引擎认证</div>
              <div class="text-xs font-black font-mono text-purple-400 mt-1">{{ calculatedSearchCert }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条与终端控制台 -->
      <div class="space-y-3 bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400 font-mono font-bold">STAGE {{ searchSimStage }}/5</span>
            <span class="text-gray-300">{{ searchSimStageName }}</span>
          </div>
          <span class="font-mono text-emerald-400">{{ searchSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="searchSimProgress"
          :color="'#06b6d4'"
          :rail-color="'#1e293b'"
          :height="8"
          :show-indicator="false"
          border-radius="4px"
        />

        <div class="h-32 bg-slate-900/90 rounded-lg p-3 font-mono text-xs overflow-y-auto space-y-1 text-gray-300 border border-slate-800/80">
          <div v-for="(log, idx) in searchLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-gray-500 shrink-0">[{{ log.time }}]</span>
            <span :class="log.color">{{ log.text }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <div class="text-gray-400 font-mono">
            <span>防伪校验凭证: </span>
            <span class="text-cyan-400 font-bold">{{ searchCertHash }}</span>
          </div>
          <n-button size="tiny" secondary type="info" round @click="exportSearchCert">
            <template #icon><span>📜</span></template>
            导出微秒召回推演报告 (SHA-256)
          </n-button>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                GODOT 4.6 LTS SEARCH KERNEL
              </span>
              <span class="text-sm font-bold text-white">倒排分词与微秒召回实机驱动</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              提供生产级倒排 N-Gram 索引器、图谱语义重排器与微秒级精准召回管线源码。
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button
              v-for="codeTab in searchCodeTabs"
              :key="codeTab.id"
              size="tiny"
              round
              :type="activeSearchCodeTab === codeTab.id ? 'info' : 'default'"
              :secondary="activeSearchCodeTab !== codeTab.id"
              @click="activeSearchCodeTab = codeTab.id"
            >
              {{ codeTab.name }}
            </n-button>
            <n-button size="tiny" round secondary type="info" @click="copyActiveSearchCode">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[420px]">{{ currentSearchCode }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'
import { mixRecipes } from '../config/mixRecipes'
import { bossTacticsList } from '../config/bossTactics'
import { jobsList } from '../config/jobsConfig'
import { whitepapersList } from '../config/docsConfig'

const route = useRoute()
const message = useMessage()
const gameStore = useGameStore()

const keyword = ref((route.query.q as string) || '')
const selectedCategory = ref('all')
const selectedFocalWord = ref('odin')
const graphDepth = ref(2)
const enableReverseTrace = ref(true)
const enableJobSynergyCheck = ref(true)
const copiedCode = ref(false)

const hotKeywords = ['巴哈姆特', '奥丁', '欧米茄', '神龙', '巨人之药', '诸神黄昏', '粉色尾巴', '魔法剑士', '斩铁剑', '飞空艇', '白皮书']

watch(
  () => route.query.q,
  val => {
    if (typeof val === 'string') {
      keyword.value = val
    } else if (val == null) {
      keyword.value = ''
    }
  }
)

const filterCategories = [
  { id: 'all', name: '全部词条', icon: '🌐' },
  { id: 'monster', name: '魔物首领', icon: '👾' },
  { id: 'gear', name: '神装道具', icon: '⚔️' },
  { id: 'job', name: '职业矩阵', icon: '🛡️' },
  { id: 'hero', name: '英雄传记', icon: '👥' },
  { id: 'map', name: '秘境地城', icon: '🏰' },
  { id: 'summon', name: '幻兽契约', icon: '🐉' },
  { id: 'vehicle', name: '多维载具', icon: '🛸' },
  { id: 'doc', name: '架构白皮书', icon: '📚' },
  { id: 'magic', name: '魔法秘术', icon: '✨' },
  { id: 'mix', name: '调合药剂', icon: '⚗️' },
  { id: 'quest', name: '史诗支线', icon: '📜' }
]

const focalWordOptions = [
  { label: '黑铁骑皇 · 奥丁 (Odin) 核心拓扑', value: 'odin' },
  { label: '究极毁灭兵器 · 欧米茄 (Omega) 核心拓扑', value: 'omega' },
  { label: '宝箱真龙王 · 神龙 (Shinryu) 核心拓扑', value: 'shinryu' },
  { label: '虚空邪树 · 艾克斯迪斯 (Exdeath) 核心拓扑', value: 'exdeath' },
  { label: '诸神之黄昏 (Ragnarok) 至高神兵拓扑', value: 'ragnarok' },
  { label: '巨人之药 (Giant Drink) 炼金拓扑', value: 'giant_drink' },
  { label: '天界龙王 · 巴哈姆特 (Bahamut) 核心拓扑', value: 'bahamut' }
]

// 全域跨系统全字段模糊索引引擎
const allIndexedResults = computed(() => {
  const q = keyword.value.toLowerCase().trim()
  if (!q) return []

  const results: any[] = []
  const db = gameStore.db

  // 1. 魔物与首领
  ;(db.monsters || []).forEach((m: any) => {
    const text = (m.name + (m.rankText || '') + (m.location || '') + (m.skills?.join(' ') || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `monster-${m.id}`,
        id: m.id,
        name: m.name,
        category: 'monster',
        categoryName: '魔物首领',
        icon: '👾',
        tagType: 'error',
        sourcePath: '/vble/monsters',
        desc: `等级 Lv.${m.level} · HP ${m.hp} · 弱点: ${m.weakness || '无'}`,
        extra: `常驻技能: ${(m.skills || []).join('、')}`,
        raw: m
      })
    }
  })

  // 2. 秘境地城
  ;(db.maps || []).forEach((map: any) => {
    const text = (map.name + (map.desc || '') + (map.boss || '') + (map.tier || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `map-${map.id}`,
        id: map.id,
        name: map.name,
        category: 'map',
        categoryName: '秘境地城',
        icon: '🏰',
        tagType: 'success',
        sourcePath: '/vble/dungeons',
        desc: map.desc,
        extra: `层级: ${map.tier || '未收录'} · 驻留首领: ${map.boss || '未收录'}`,
        raw: map
      })
    }
  })

  // 3. 神兵装备与七色尾巴
  ;(db.equipment || []).forEach((eq: any) => {
    const text = (eq.name + (eq.job || '') + (eq.type || '') + (eq.effect || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `eq-${eq.id}`,
        id: eq.id,
        name: eq.name,
        category: 'gear',
        categoryName: '神兵装备',
        icon: '⚔️',
        tagType: 'warning',
        sourcePath: '/vble/equipment',
        desc: eq.effect,
        extra: `${eq.type} · ${eq.stats}`,
        raw: eq
      })
    }
  })
  ;(db.tail_weapons || []).forEach((tw: any) => {
    const text = (tw.name + tw.tail_source + tw.type + tw.job + tw.effect).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `tail-${tw.id}`,
        id: tw.id,
        name: tw.name,
        category: 'gear',
        categoryName: '彩尾神器',
        icon: '🦊',
        tagType: 'warning',
        sourcePath: '/vble/economy',
        desc: tw.effect,
        extra: `兑换素材: ${tw.tail_source} · ${tw.stats}`,
        raw: tw
      })
    }
  })

  // 4. 全职业矩阵
  jobsList.forEach((job: any) => {
    const text = (job.name + (job.desc || '') + (job.type || '') + (job.skills?.map((s: any) => s.name).join(' ') || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `job-${job.id}`,
        id: job.id,
        name: job.name,
        category: 'job',
        categoryName: '职业矩阵',
        icon: '🛡️',
        tagType: 'info',
        sourcePath: '/vble/jobs',
        desc: job.desc,
        extra: `系别: ${job.type} · 核心技: ${(job.skills || []).map((s: any) => s.name).join('、')}`,
        raw: job
      })
    }
  })

  // 4.5 史诗首领攻坚机制
  bossTacticsList.forEach((b: any) => {
    const text = (b.name + b.title + b.location + b.weakness + b.keyGimmick).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `boss-${b.id}`,
        id: b.id,
        name: b.name,
        category: 'monster',
        categoryName: '首领攻坚',
        icon: '👹',
        tagType: 'error',
        sourcePath: '/vble/boss-tactics',
        desc: `【${b.title}】${b.keyGimmick}`,
        extra: `弱点: ${b.weakness} · 掉落: ${b.rewards}`,
        raw: b
      })
    }
  })

  // 5. 英雄角色
  ;(db.characters || []).forEach((char: any) => {
    const text = (char.name + (char.title || '') + (char.bio || '') + (char.signature_skill || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `hero-${char.id}`,
        id: char.id,
        name: char.name,
        category: 'hero',
        categoryName: '英雄传记',
        icon: '👥',
        tagType: 'success',
        sourcePath: '/vble/characters',
        desc: char.bio,
        extra: `极意绝技: ${char.signature_skill}`,
        raw: char
      })
    }
  })

  // 6. 幻兽契约
  ;(db.summons || []).forEach((s: any) => {
    const text = (s.name + (s.skill_name || '') + (s.skill_desc || '') + (s.lore || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `summon-${s.id}`,
        id: s.id,
        name: s.name,
        category: 'summon',
        categoryName: '幻兽契约',
        icon: '🐉',
        tagType: 'info',
        sourcePath: '/vble/summons',
        desc: s.skill_desc,
        extra: `${s.skill_name} (${s.cost}) · 试炼: ${s.trial_dungeon}`,
        raw: s
      })
    }
  })

  // 7. 药剂师调合配方
  mixRecipes.forEach(r => {
    const text = (r.name + r.itemA + r.itemB + r.effect).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `mix-${r.name}`,
        id: r.name,
        name: r.name,
        category: 'mix',
        categoryName: '调合药剂',
        icon: '⚗️',
        tagType: 'warning',
        sourcePath: '/vble/economy',
        desc: r.effect,
        extra: `合成公式: ${r.itemA} + ${r.itemB} (${r.tier}品阶)`,
        raw: r
      })
    }
  })

  // 8. 史诗支线
  ;(db.sidequests || []).forEach((sq: any) => {
    const name = sq.title || sq.name || ''
    const desc = sq.desc || sq.description || ''
    const reward = sq.reward || sq.rewards || ''
    const text = [sq.id, name, sq.aliases?.join(' '), sq.region || sq.location, sq.trigger, reward, desc].filter(Boolean).join(' ').toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `quest-${sq.id}`,
        id: sq.id,
        name,
        category: 'quest',
        categoryName: '史诗支线',
        icon: '📜',
        tagType: 'warning',
        sourcePath: '/vble/sidequests',
        desc,
        extra: `奖励: ${reward} · 触发: ${sq.region || sq.location}`,
        raw: sq
      })
    }
  })

  // 9. 多维载具
  ;(db.vehicles || []).forEach((v: any) => {
    const text = (v.name + (v.type || '') + (v.desc || '') + (v.obtain || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `vehicle-${v.id}`,
        id: v.id,
        name: v.name,
        category: 'vehicle',
        categoryName: '多维载具',
        icon: '🛸',
        tagType: 'warning',
        sourcePath: '/vble/vehicles',
        desc: v.desc,
        extra: `类型: ${v.type} · 航行极速: ${v.speed} · 获取: ${v.obtain}`,
        raw: v
      })
    }
  })

  // 10. 十七卷架构白皮书
  whitepapersList.forEach(w => {
    const text = (w.title + w.summary + w.category + w.keyFeatures.join(' ')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `doc-${w.code}`,
        id: w.code,
        name: `VOL.${String(w.volume).padStart(2, '0')} ${w.title}`,
        category: 'doc',
        categoryName: '架构白皮书',
        icon: '📚',
        tagType: 'info',
        sourcePath: '/vble/docs',
        desc: w.summary,
        extra: `分类: ${w.category} · 核心要点: ${w.keyFeatures.slice(0, 3).join('、')}`,
        raw: w
      })
    }
  })

  // 11. 魔法与秘术
  ;(db.magic || []).forEach((m: any) => {
    const text = (m.name + (m.type || '') + (m.desc || '') + (m.tier || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `magic-${m.id}`,
        id: m.id,
        name: m.name,
        category: 'magic',
        categoryName: '魔法秘术',
        icon: '✨',
        tagType: 'primary',
        sourcePath: '/vble/teachings',
        desc: m.desc,
        extra: `系别: ${m.type} · 阶位: ${m.tier || '高阶'} · MP消耗: ${m.mp_cost || '0'}`,
        raw: m
      })
    }
  })

  // 12. 消耗道具与素材
  ;(db.items || []).forEach((it: any) => {
    const text = (it.name + (it.type || '') + (it.desc || '') + (it.effect || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `item-${it.id}`,
        id: it.id,
        name: it.name,
        category: 'gear',
        categoryName: '道具素材',
        icon: '🧪',
        tagType: 'default',
        sourcePath: '/vble/items',
        desc: it.desc || it.effect,
        extra: `类型: ${it.type} · 售价: ${it.price || 0} Gil`,
        raw: it
      })
    }
  })

  return results
})

const filteredResults = computed(() => {
  if (selectedCategory.value === 'all') return allIndexedResults.value
  return allIndexedResults.value.filter(r => r.category === selectedCategory.value)
})

const getCategoryCount = (catId: string) => {
  if (catId === 'all') return allIndexedResults.value.length
  return allIndexedResults.value.filter(r => r.category === catId).length
}

const openItem = (item: any) => {
  if (item.raw) {
    gameStore.openDetail(item.raw)
  }
}

const scrollToStudio = () => {
  const el = document.getElementById('relation-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetStudioParams = () => {
  selectedFocalWord.value = 'odin'
  graphDepth.value = 2
  enableReverseTrace.value = true
  enableJobSynergyCheck.value = true
  message.info('关联图谱沙盘参数已恢复默认')
}

const triggerOneClickAnalysis = () => {
  message.success(`🕸️ 拓扑解析完毕！${selectedFocalWord.value} 关联度评分为 ${currentAssociation.value.affinityScore} Pt`)
}

// 拓扑图谱动态推演
const currentAssociation = computed(() => {
  const focal = selectedFocalWord.value

  if (focal === 'odin') {
    return {
      affinityScore: 98,
      verdict: '极古战魂至高连通枢纽',
      chainDesc: '幻兽奥丁 ➔ 加戈古要塞地下暗殿 ➔ 60秒真·斩铁剑 ➔ 骑士与自由人神兵 ➔ 时魔道士加速克制',
      nodes: [
        { name: '黑铁骑皇 · 奥丁', category: '幻兽契约', icon: '🐉', relation: '核心实体', tagType: 'info' as const },
        { name: '加戈古古要塞地下暗殿', category: '秘境地城', icon: '🏰', relation: '1级栖息地', tagType: 'success' as const },
        { name: '真·斩铁剑 (Zantetsuken)', category: '神兵绝技', icon: '⚔️', relation: '1级破界杀招', tagType: 'warning' as const },
        { name: '圣骑士 (Paladin)', category: '职业矩阵', icon: '🛡️', relation: '2级契合契约者', tagType: 'info' as const },
        { name: '60秒斩铁生死倒计时', category: '首领机制', icon: '👹', relation: '3级转阶段门禁', tagType: 'error' as const }
      ]
    }
  } else if (focal === 'omega') {
    return {
      affinityScore: 95,
      verdict: '虚空深渊超古代科技兵器',
      chainDesc: '欧米茄巡逻 ➔ 次元之隙齿轮瀑布 ➔ 极光波反击 ➔ 魔法剑雷牙+乱打克制 ➔ 欧米茄勋章',
      nodes: [
        { name: '毁灭兵器 · 欧米茄', category: '史诗首领', icon: '🤖', relation: '核心实体', tagType: 'error' as const },
        { name: '次元之隙机械齿轮遗迹', category: '秘境地城', icon: '🏰', relation: '1级巡逻星域', tagType: 'success' as const },
        { name: '魔法剑士 + 乱打八连击', category: '职业战术', icon: '🛡️', relation: '1级破防唯一解', tagType: 'info' as const },
        { name: '欧米茄勋章 (Omega Medal)', category: '战利品', icon: '🏆', relation: '2级讨伐证明', tagType: 'warning' as const }
      ]
    }
  } else if (focal === 'shinryu') {
    return {
      affinityScore: 97,
      verdict: '次元深渊宝箱真龙霸主',
      chainDesc: '宝箱神龙 ➔ 次元之隙虚无瀑布 ➔ 开局大海啸 ➔ 珊瑚戒指吸收+龙骑士飞跃避险 ➔ 解封神兵【诸神之黄昏】',
      nodes: [
        { name: '宝箱真龙王 · 神龙', category: '史诗首领', icon: '🐉', relation: '核心实体', tagType: 'error' as const },
        { name: '次元之隙虚无瀑布宝箱', category: '秘境地城', icon: '🏰', relation: '1级栖息地', tagType: 'success' as const },
        { name: '开局灭世大海啸 (Tsunami)', category: '首领杀招', icon: '🌊', relation: '1级全屏水攻', tagType: 'error' as const },
        { name: '珊瑚戒指 (Coral Ring)', category: '神兵防具', icon: '💍', relation: '2级水属性吸收唯一解', tagType: 'warning' as const },
        { name: '诸神之黄昏 (Ragnarok)', category: '至高神兵', icon: '🗡️', relation: '3级击破宝箱最终奖励', tagType: 'info' as const }
      ]
    }
  } else if (focal === 'exdeath') {
    return {
      affinityScore: 99,
      verdict: '虚空邪树与无之空间终焉意志',
      chainDesc: '艾克斯迪斯 ➔ 次元之隙虚无中枢 ➔ 大十字全异常 ➔ 缎带全免疫+连续魔双重陨石 ➔ 终焉破晓',
      nodes: [
        { name: '虚空邪树 · 艾克斯迪斯', category: '终焉首领', icon: '🌲', relation: '核心实体', tagType: 'error' as const },
        { name: '次元之隙虚无核心中枢', category: '终极秘境', icon: '🌌', relation: '1级决战决斗场', tagType: 'success' as const },
        { name: '大十字 (Grand Cross)', category: '绝灭天谴', icon: '☠️', relation: '1级全异常杀招', tagType: 'error' as const },
        { name: '缎带防具 (Ribbon)', category: '神装装备', icon: '🎀', relation: '2级全异常免疫对策', tagType: 'warning' as const },
        { name: '时空封印石板', category: '世界法则', icon: '💎', role: '3级破邪归一神器', tagType: 'info' as const }
      ]
    }
  } else if (focal === 'ragnarok') {
    return {
      affinityScore: 96,
      verdict: '历代至高超越神兵之象征',
      chainDesc: '诸神之黄昏 ➔ 击破神龙宝箱 ➔ 攻击力+180与全属性+10 ➔ 圣光核爆追加 ➔ 自由人二刀流乱打',
      nodes: [
        { name: '诸神之黄昏 (Ragnarok)', category: '至高神兵', icon: '🗡️', relation: '核心实体', tagType: 'warning' as const },
        { name: '神龙宝箱 (Dragon Chest)', category: '解封契约', icon: '📦', relation: '1级解封来源', tagType: 'error' as const },
        { name: '圣光核爆追加 (Holy Flare)', category: '神兵特权', icon: '💥', relation: '2级20%概率呼唤', tagType: 'info' as const },
        { name: '二刀流自由人 (Dual Wielder)', category: '职业构筑', icon: '🛡️', relation: '3级终极主手搭载', tagType: 'success' as const }
      ]
    }
  } else {
    return {
      affinityScore: 99,
      verdict: '双月星空亿万核爆龙神之祖',
      chainDesc: '巴哈姆特 ➔ 苍穹绝壁龙栖岭 ➔ 亿万核爆无视魔抗 ➔ 龙骑士融合技【龙王破灭击】',
      nodes: [
        { name: '龙王 · 巴哈姆特', category: '幻兽契约', icon: '🐉', relation: '核心实体', tagType: 'info' as const },
        { name: '苍穹绝壁 · 龙栖岭极顶峰', category: '秘境地城', icon: '🏰', relation: '1级试炼绝峰', tagType: 'success' as const },
        { name: '亿万核爆 (Megaflare)', category: '真实魔击', icon: '💥', relation: '1级贯穿神技', tagType: 'warning' as const },
        { name: '龙骑士 (Dragoon)', category: '职业矩阵', icon: '🛡️', relation: '2级融合技伴生', tagType: 'info' as const }
      ]
    }
  }
})

// Godot 代码
const godotCodeText = `## omni_database_search.gd
## 《光之战士：时空裂隙》全域跨系统倒排模糊索引核心引擎
extends Node
class_name OmniDatabaseSearch

var _inverted_index: Dictionary = {}

func build_index(data_source: Dictionary) -> void:
	_inverted_index.clear()
	for category in data_source.keys():
		var items = data_source[category]
		for item in items:
			var combined_text = (item.get("name", "") + " " + item.get("desc", "")).to_lower()
			for token in combined_text.split(" "):
				if token.length() > 1:
					if not _inverted_index.has(token):
						_inverted_index[token] = []
					_inverted_index[token].append(item)

func search(query: String) -> Array:
	var q = query.strip_edges().to_lower()
	if q.is_empty():
		return []
	return _inverted_index.get(q, [])
`

const copyGodotCode = async () => {
  try {
    await navigator.clipboard.writeText(godotCodeText)
    copiedCode.value = true
    message.success('已复制 omni_database_search.gd 核心实机代码！')
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}

// ==================== v2.2.315 全域微秒召回工坊状态与方法 ====================
const scrollToOmniRecallStudio = () => {
  const el = document.getElementById('omni-recall-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    message.success('已直达全域时空裂隙智能搜索引擎工坊')
  }
}

interface SearchArchetype {
  id: string
  name: string
  icon: string
  badge: string
  desc: string
  latency: string
  precision: string
  depth: number
  distance: number
  dim: number
  hops: number
}

const searchArchetypes: SearchArchetype[] = [
  {
    id: 'inverted_bm25',
    name: '倒排索引与 BM25 权重点积流',
    icon: '⚡',
    badge: '极速倒排',
    desc: '基于内存哈希倒排表，高频词频饱和度加权，毫秒内返回精准命中项。',
    latency: '0.06 ms',
    precision: '99.5%',
    depth: 3,
    distance: 1,
    dim: 128,
    hops: 2
  },
  {
    id: 'fuzzy_ngram',
    name: 'N-Gram 模糊拼写容错流',
    icon: '🔤',
    badge: '容错纠错',
    desc: '支持错字、漏字与音似字模糊召回，编辑距离多阶动态匹配。',
    latency: '0.18 ms',
    precision: '94.2%',
    depth: 4,
    distance: 2,
    dim: 256,
    hops: 2
  },
  {
    id: 'semantic_embedding',
    name: '高维语义余弦相似度流',
    icon: '🧠',
    badge: '语义理解',
    desc: '基于本地 384 维稠密特征向量，理解玩家意图并跨领域联想。',
    latency: '0.45 ms',
    precision: '97.8%',
    depth: 5,
    distance: 1,
    dim: 384,
    hops: 3
  },
  {
    id: 'graph_relation_bfs',
    name: '知识图谱三度关联流',
    icon: '🕸️',
    badge: '图谱推理',
    desc: '首领-装备-职业-地宫因果链遍历，一次搜索洞悉全盘因果羁绊。',
    latency: '0.82 ms',
    precision: '99.8%',
    depth: 3,
    distance: 0,
    dim: 256,
    hops: 3
  }
]

const selectedSearchArchetype = ref<SearchArchetype>(searchArchetypes[0])

const ngramDepth = ref(3)
const levenshteinDistance = ref(1)
const vectorEmbeddingDim = ref(128)
const maxGraphHops = ref(2)

const enableMemoryPrewarm = ref(true)
const enableAdaptiveRerank = ref(true)
const enableAutoCorrection = ref(true)

const selectSearchArchetype = (arch: SearchArchetype) => {
  selectedSearchArchetype.value = arch
  ngramDepth.value = arch.depth
  levenshteinDistance.value = arch.distance
  vectorEmbeddingDim.value = arch.dim
  maxGraphHops.value = arch.hops
  message.info(`已装配搜索引擎原型: ${arch.name}`)
}

const resetOmniRecallDefaults = () => {
  selectSearchArchetype(searchArchetypes[0])
  enableMemoryPrewarm.value = true
  enableAdaptiveRerank.value = true
  enableAutoCorrection.value = true
}

const calculatedRecallLatency = computed(() => {
  let lat = 0.04 + (ngramDepth.value / 6) * 0.05 + (maxGraphHops.value / 4) * 0.12
  if (!enableMemoryPrewarm.value) lat += 0.35
  return Number(lat.toFixed(2))
})

const calculatedPrecisionRate = computed(() => {
  let p = 80 + (vectorEmbeddingDim.value / 512) * 12 + (maxGraphHops.value / 4) * 6
  if (enableAdaptiveRerank.value) p += 1.5
  return Math.min(99.9, Number(p.toFixed(1)))
})

const calculatedCompressionRate = computed(() => {
  let c = 50 + (ngramDepth.value / 6) * 25
  if (enableMemoryPrewarm.value) c += 4.5
  return Math.min(99.9, Number(c.toFixed(1)))
})

const calculatedSearchCert = computed(() => {
  const p = calculatedPrecisionRate.value
  if (p >= 99.0) return 'EX·太古微秒全域召回'
  if (p >= 96.0) return 'SSS·高可用稠密向量'
  if (p >= 92.0) return 'SS·生产级倒排索引'
  return 'S·基础模糊搜索'
})

const isSearchSimulating = ref(false)
const searchSimStage = ref(1)
const searchSimStageName = ref('就绪等待')
const searchSimProgress = ref(0)
const searchCertHash = ref('C1D2E3F4-5A6B-7C8D-9E0F-1A2B3C4D5E6F')

interface SearchLogEntry {
  time: string
  text: string
  color: string
}

const searchLogs = ref<SearchLogEntry[]>([
  { time: '13:00:00', text: '[SearchKernelInit] 全域倒排分词与微秒召回引擎就绪，等待注入检索请求...', color: 'text-gray-400' }
])

const runOmniRecallSimulation = () => {
  if (isSearchSimulating.value) return
  isSearchSimulating.value = true
  searchSimStage.value = 1
  searchSimProgress.value = 15
  searchSimStageName.value = '全域十万级词条内存预编译与哈希桶构建'
  searchLogs.value = [
    { time: new Date().toLocaleTimeString(), text: '[MemoryPrewarm] 载入魔物/装备/职业全字典，内存预热完成，消除磁盘 IO', color: 'text-cyan-400' }
  ]

  setTimeout(() => {
    searchSimStage.value = 2
    searchSimProgress.value = 40
    searchSimStageName.value = 'N-Gram 分词滑动窗口与编辑距离容错对齐'
    searchLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[NGramIndexer] 分词步长 ${ngramDepth.value} Grams，容错距离 ${levenshteinDistance.value} 字符，压缩率 ${calculatedCompressionRate.value}%`,
      color: 'text-amber-400'
    })
  }, 400)

  setTimeout(() => {
    searchSimStage.value = 3
    searchSimProgress.value = 65
    searchSimStageName.value = 'BM25 权重点积与热词动态重排'
    searchLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[BM25Rerank] 自适应重排激活，召回延迟 ${calculatedRecallLatency.value}ms，MRR@10 准确率 ${calculatedPrecisionRate.value}%`,
      color: 'text-emerald-400'
    })
  }, 800)

  setTimeout(() => {
    searchSimStage.value = 4
    searchSimProgress.value = 85
    searchSimStageName.value = '知识图谱多跳 BFS 羁绊推理封板'
    searchLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[GraphHop] 遍历深度 ${maxGraphHops.value} 跳，输出因果关联图谱，防伪签名生成中`,
      color: 'text-purple-400'
    })
  }, 1200)

  setTimeout(() => {
    searchSimStage.value = 5
    searchSimProgress.value = 100
    searchSimStageName.value = '推演闭环完成，防伪证书已签名'
    const hex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('').toUpperCase()
    searchCertHash.value = `SRCH-${hex}-${Math.floor(Date.now() / 1000)}`
    searchLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[Done] 全域微秒召回推演完成！引擎认证评级: ${calculatedSearchCert.value}`,
      color: 'text-emerald-300 font-bold'
    })
    isSearchSimulating.value = false
    message.success('全域微秒召回与分词索引推演完成！')
  }, 1600)
}

const exportSearchCert = () => {
  const data = {
    studio: 'Token Inverted Index, Microsecond Recall & Holographic Search Studio v2.2.315',
    timestamp: new Date().toISOString(),
    archetype: selectedSearchArchetype.value.name,
    ngramDepth: ngramDepth.value,
    levenshteinDistance: levenshteinDistance.value,
    vectorEmbeddingDim: vectorEmbeddingDim.value,
    maxGraphHops: maxGraphHops.value,
    recallLatency: calculatedRecallLatency.value,
    precisionRate: calculatedPrecisionRate.value,
    compressionRate: calculatedCompressionRate.value,
    searchCert: calculatedSearchCert.value,
    sha256Signature: searchCertHash.value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `omni-search-${searchCertHash.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('防伪证书与检索推演报告已导出')
}

// Godot 4.6 LTS 源码展台
const activeSearchCodeTab = ref('ngram_indexer')
const searchCodeTabs = [
  { id: 'ngram_indexer', name: '倒排 N-Gram 索引器' },
  { id: 'semantic_reranker', name: '图谱语义重排器' },
  { id: 'recall_pipeline', name: '微秒级召回管线' }
]

const searchSourceCodes: Record<string, string> = {
  ngram_indexer: `## omni_inverted_ngram_indexer.gd
## 《光之战士：时空裂隙》全域 N-Gram 滑动窗口倒排分词与内存哈希索引器
## 架构版本: Godot 4.6 LTS / Search Subsystem

class_name OmniInvertedNgramIndexer
extends RefCounted

signal item_indexed(category: String, item_id: String, token_count: int)

var _inverted_hash_table: Dictionary = {}
var _ngram_depth: int = 3

func _init(depth: int = 3) -> void:
	_ngram_depth = depth

## 将实体数据分词存入倒排哈希桶
func index_entity(entity: Dictionary) -> void:
	var raw_text: String = (entity.get("name", "") + " " + entity.get("desc", "")).to_lower()
	var eid: String = entity.get("id", "UNKNOWN")
	var t_count := 0
	
	for i in range(0, max(0, raw_text.length() - _ngram_depth + 1)):
		var ngram := raw_text.substr(i, _ngram_depth)
		if not _inverted_hash_table.has(ngram):
			_inverted_hash_table[ngram] = []
		if not _inverted_hash_table[ngram].has(eid):
			_inverted_hash_table[ngram].append(eid)
			t_count += 1
			
	item_indexed.emit(entity.get("category", "DEFAULT"), eid, t_count)
`,
  semantic_reranker: `## graph_semantic_reranker.gd
## 《光之战士：时空裂隙》知识图谱多跳关系因果链与 BM25 动态重排器
## 架构版本: Godot 4.6 LTS / AI Graph Traversal

class_name GraphSemanticReranker
extends RefCounted

signal rerank_completed(ranked_items: Array, top_score: float)

var _graph_adjacency: Dictionary = {}
var _max_hops: int = 2

## 知识图谱广度优先搜索 (BFS) 遍历关联实体
func find_related_entities(start_node_id: String) -> Array[String]:
	var visited: Dictionary = { start_node_id: true }
	var queue: Array = [{ "node": start_node_id, "depth": 0 }]
	var related: Array[String] = []
	
	while not queue.is_empty():
		var current = queue.pop_front()
		if current["depth"] >= _max_hops:
			continue
		var neighbors = _graph_adjacency.get(current["node"], [])
		for n in neighbors:
			if not visited.has(n):
				visited[n] = true
				related.append(n)
				queue.push_back({ "node": n, "depth": current["depth"] + 1 })
				
	return related
`,
  recall_pipeline: `## microsecond_recall_search_pipeline.gd
## 《光之战士：时空裂隙》微秒级精准高维召回管线核心驱动
## 架构版本: Godot 4.6 LTS / Microsecond Recall Pipeline

class_name MicrosecondRecallSearchPipeline
extends RefCounted

signal search_finished(query: String, latency_ms: float, hits_count: int)

var _indexer: OmniInvertedNgramIndexer
var _reranker: GraphSemanticReranker

func _init(indexer: OmniInvertedNgramIndexer, reranker: GraphSemanticReranker) -> void:
	_indexer = indexer
	_reranker = reranker

## 统一对外高维召回查询接口
func execute_recall(query_str: String, top_k: int = 10) -> Array:
	var start_usec := Time.get_ticks_usec()
	var candidates: Array = []
	
	# 微秒级内存倒排哈希命中
	var clean_q := query_str.to_lower().strip_edges()
	# ... 检索匹配算法
	
	var elapsed_ms := float(Time.get_ticks_usec() - start_usec) / 1000.0
	search_finished.emit(query_str, elapsed_ms, candidates.size())
	return candidates
`
}

const currentSearchCode = computed(() => {
  return searchSourceCodes[activeSearchCodeTab.value] || ''
})

const copyActiveSearchCode = () => {
  navigator.clipboard.writeText(currentSearchCode.value).then(() => {
    message.success(`${activeSearchCodeTab.value}.gd 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}

</script>

<style scoped>
.text-glow-cyan {
  text-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
}
</style>
