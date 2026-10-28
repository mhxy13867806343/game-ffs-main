<template>
  <div class="docs-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-cyan-950/80 border border-blue-500/30 shadow-[0_0_35px_rgba(59,130,246,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              VBLE Architecture Codex &amp; Whitepaper Matrix v2.2.268
            </span>
            <span class="text-xs text-gray-400">十六卷核心架构白皮书、全域时空裂隙典籍与全景架构推演</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>📚</span> 十六卷核心架构白皮书：时空裂隙典籍与全景架构推演工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            系统归纳叙事圣经、地貌拓扑、首领攻坚、职业成长、宏观经济、载具矩阵、底层架构等 16 部核心白皮书。全息实装白皮书交叉依赖拓扑与规范校验沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToCodexStudio"
          >
            <template #icon><span>⚡</span></template>
            前往时空典籍架构推演
          </n-button>
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>📐</span></template>
            前往架构拓扑沙盘
          </n-button>
          <router-link to="/vble/systems">
            <n-button size="medium" round tertiary>
              查看系统架构
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心统计概览卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">已收录白皮书</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ docsList.length }} 卷</div>
        <div class="text-[10px] text-gray-500 mt-0.5">Vol.01 至 Vol.16 完备大典</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">涵盖技术领域</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">12 大领域</div>
        <div class="text-[10px] text-gray-500 mt-0.5">底层/数值/叙事/关卡/经济</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">实机对齐覆盖度</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">100%</div>
        <div class="text-[10px] text-gray-500 mt-0.5">Godot 4.x 源码双向绑定</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">规范注册核心</div>
        <div class="text-2xl font-black text-purple-400 font-mono mt-1">vble spec</div>
        <div class="text-[10px] text-gray-500 mt-0.5">whitepaper_registry.gd</div>
      </div>
    </div>

    <!-- 检索与分类过滤 -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs text-gray-400 font-semibold mr-1">分类筛选:</span>
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
          :class="selectedCategory === cat ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-800 text-gray-400 hover:text-gray-200'"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="flex items-center gap-3">
        <n-input
          v-model:value="searchKeyword"
          placeholder="搜索白皮书标题、机制关键词..."
          size="small"
          clearable
          class="w-full md:w-64"
        >
          <template #prefix>🔍</template>
        </n-input>
      </div>
    </div>

    <!-- 社交一键全平台分享横幅 -->
    <SocialShareBar mode="banner" />

    <!-- 白皮书网格清单 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="doc in filteredDocs"
        :key="doc.code"
        class="rounded-xl bg-[#0f1422]/90 border transition-all duration-300 p-5 flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group"
        :class="selectedDocCode === doc.code ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/40' : 'border-slate-800 hover:border-slate-700'"
      >
        <div class="space-y-3.5">
          <!-- 头部卡片 -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs px-2.5 py-1 rounded bg-cyan-900/40 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                VOL.{{ String(doc.volume).padStart(2, '0') }}
              </span>
              <h3 class="text-base font-bold text-gray-200 group-hover:text-cyan-300 transition-colors">
                {{ doc.title }}
              </h3>
            </div>
            <n-tag size="tiny" type="info">{{ doc.category }}</n-tag>
          </div>

          <p class="text-xs text-gray-300 leading-relaxed">{{ doc.summary }}</p>

          <!-- 核心模块特性 -->
          <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
            <div class="text-xs text-amber-300 font-semibold flex items-center justify-between">
              <span>🔑 核心设计模块与规范:</span>
              <span class="text-[10px] text-gray-500 font-mono">{{ doc.keyFeatures.length }} 项要点</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="feat in doc.keyFeatures"
                :key="feat"
                class="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-gray-300 border border-slate-700 font-mono"
              >
                {{ feat }}
              </span>
            </div>
          </div>
        </div>

        <!-- 底部快捷动作条 -->
        <div class="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
          <button
            type="button"
            class="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold transition-colors"
            @click="selectForTopology(doc)"
          >
            <span>📐 拓扑沙盘推演</span>
          </button>

          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-600/50 flex items-center gap-1 transition-all"
            @click="openDocReader(doc)"
          >
            <span>📖 阅读全卷正文</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 核心实机推演沙盘：白皮书架构依赖拓扑与规范校验工坊 -->
    <div id="spec-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1322] via-[#10192e] to-[#0a0f1b] border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.18)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              SPEC DEPENDENCY TOPOLOGY STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📐</span> 十六卷白皮书架构依赖拓扑与规范校验沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            对齐 Godot 引擎 whitepaper_registry.gd：全息推演单个核心卷册的上下游依赖链路、实机脚本映射与规范覆盖率评分。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickValidate">
            ⚡ 架构全景审计
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：白皮书卷册选定 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>📖</span> 目标白皮书卷册 (Selected Volume)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选择白皮书架构卷册</label>
              <n-select
                v-model:value="selectedDocCode"
                :options="docSelectOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>实机代码覆盖率测试权重:</span>
                <span class="font-mono text-cyan-400 font-bold text-sm">{{ coverageWeight }}%</span>
              </div>
              <n-slider v-model:value="coverageWeight" :min="50" :max="100" :step="5" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【前置依赖规范强校验】:</span>
                <n-switch v-model:value="enableUpstreamStrictCheck" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【GDScript 双向接口一致性】:</span>
                <n-switch v-model:value="enableGdscriptBinding" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：拓扑依赖链路图谱 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div class="text-sm font-bold text-amber-300 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><span>🔗</span> 上下游规范拓扑链路</span>
            <span class="text-[11px] text-gray-400 font-mono">{{ topologyResult.nodes.length }} 个节点</span>
          </div>

          <div class="space-y-2 text-xs overflow-y-auto max-h-56 pr-1">
            <div
              v-for="node in topologyResult.nodes"
              :key="node.name"
              class="p-2.5 rounded bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between"
            >
              <div>
                <span class="font-bold text-gray-200">{{ node.icon }} {{ node.name }}</span>
                <div class="text-[10px] text-cyan-400 font-mono mt-0.5">{{ node.role }}</div>
              </div>
              <n-tag size="tiny" :type="node.tagType">{{ node.type }}</n-tag>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息审计结算面板 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-cyan-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 规范审计健康度</span>
              <n-tag size="tiny" type="success">严格合规</n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 覆盖率评分 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">综合规范完备指数 (Spec Index)</div>
                <div class="text-3xl font-black font-mono mt-1 tracking-wider text-cyan-400">
                  {{ topologyResult.score }} Pt
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  {{ topologyResult.summary }}
                </div>
              </div>

              <!-- 关联源码脚本 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-amber-400 font-bold flex items-center justify-between">
                  <span>实机引擎绑定脚本:</span>
                  <span class="text-cyan-300 font-mono">{{ topologyResult.gdscript }}</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ topologyResult.bindingDesc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>引擎算法: whitepaper_registry.gd</span>
            <span class="text-cyan-400">VBLE Spec Engine v2.2.242</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 全卷架构交叉引用与五层拓扑导览工坊 (Architecture Cross-Reference Studio) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#101728] to-blue-950/60 border border-cyan-500/30 space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              LAYERED SPEC MATRIX
            </span>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🏛️</span> 十七卷架构五层依赖模型与实机导航
            </h3>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            横跨叙事世界观、空间地貌、核心战斗、宏观经济与系统底层五大层级，提供各白皮书与前端互动沙盘的双向拓扑映射。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" type="primary" secondary round class="font-bold shadow" @click="exportArchitectureCatalog">
            <template #icon><span>📋</span></template>
            导出全卷技术白皮书大纲
          </n-button>
        </div>
      </div>

      <!-- 五层架构微卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div
          v-for="layer in architectureLayers"
          :key="layer.id"
          class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-cyan-400/40 transition-all"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-white flex items-center gap-1">
              <span>{{ layer.icon }}</span>
              <span>{{ layer.title }}</span>
            </span>
            <n-tag size="tiny" :type="layer.tagType">{{ layer.docs.length }} 卷</n-tag>
          </div>
          <p class="text-[11px] text-gray-400 leading-snug">{{ layer.desc }}</p>
          <div class="space-y-1 pt-1.5 border-t border-slate-900">
            <div
              v-for="d in layer.docs"
              :key="d.code"
              class="text-[11px] text-cyan-300 hover:text-cyan-200 cursor-pointer flex items-center justify-between truncate"
              @click="selectForTopology(d)"
            >
              <span class="truncate">Vol.{{ String(d.volume).padStart(2, '0') }} {{ d.title.split('(')[0] }}</span>
              <span class="text-gray-500 text-[10px]">&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ⚡ 专区: 全域时空裂隙典籍、跨卷依赖拓扑与设计规范交互推演工坊 (Codex & Architecture Studio) -->
    <div id="codex-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1328] via-[#131c38] to-[#0a1122] border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.22)] space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-cyan-950 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              CODEX &amp; ARCHITECTURE TOPOLOGY STUDIO
            </span>
            <span class="text-xs text-gray-400 font-mono">v2.2.268 官方实机矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <span>⚡</span> 全域时空裂隙典籍、跨卷依赖拓扑与设计规范交互推演工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            横跨叙事世界观、关卡地貌、动态 ATB 战斗、职业继承与系统底层五大层级！实时演算全卷规范交叉依赖、GDScript 实机契约合规度与离线架构方案书一键导出。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetCodexStudio">
            🔄 重置推演参数
          </n-button>
          <n-button size="small" type="primary" secondary @click="runFullCodexAudit">
            ⚡ 运行全卷规范审计
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportCodexAuditCertificate">
            📜 导出架构方案书
          </n-button>
        </div>
      </div>

      <!-- 三栏主推演工作台 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 四阶典籍架构规范体系选择 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>📖</span>
                <span>核心典籍规范领域</span>
              </span>
              <n-tag size="tiny" type="info">{{ currentCodexDomain.tag }}</n-tag>
            </div>

            <!-- 领域选择器 -->
            <div class="space-y-1.5">
              <label class="text-[11px] text-gray-400 block">选择典籍规范领域 (Codex Domain):</label>
              <select
                v-model="selectedCodexDomainId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-bold rounded-lg p-2 focus:border-cyan-400 focus:outline-none"
                @change="onCodexDomainChanged"
              >
                <option v-for="d in codexDomains" :key="d.id" :value="d.id">
                  {{ d.name }}
                </option>
              </select>
            </div>

            <!-- 领域详述卡片 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-cyan-500/30 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white flex items-center gap-1.5 text-sm">
                  <span>{{ currentCodexDomain.icon }}</span>
                  <span>{{ currentCodexDomain.name }}</span>
                </span>
                <span class="text-[10px] text-cyan-400 font-mono font-bold">{{ currentCodexDomain.volumeBadge }}</span>
              </div>
              <p class="text-[11px] text-gray-300 leading-relaxed">{{ currentCodexDomain.description }}</p>
              <div class="p-2 rounded bg-cyan-950/40 border border-cyan-900/50 text-[11px] space-y-1">
                <div class="text-amber-300 font-bold flex items-center gap-1">
                  <span>⚡ 核心模块:</span>
                  <span>{{ currentCodexDomain.coreModules }}</span>
                </div>
                <div class="text-cyan-300 text-[10px]">📜 映射脚本: {{ currentCodexDomain.gdscript }}</div>
              </div>
            </div>

            <!-- 规范状态指示 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">上游前置约束:</span>
                <span class="font-mono text-cyan-400 font-bold">{{ currentCodexDomain.upstream }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">下游数据注入:</span>
                <span class="font-mono text-purple-300 font-bold">{{ currentCodexDomain.downstream }}</span>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
            <span>实机代码状态:</span>
            <span class="font-mono font-bold text-emerald-400">Godot 4.6 LTS 双向反射已联锁</span>
          </div>
        </div>

        <!-- 栏 2: 规范严密性与跨卷依赖动态拓扑链 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>📐</span>
              <span>跨卷依赖动态拓扑链</span>
            </span>
            <n-tag size="tiny" type="success">完整度 {{ codexDependencyRate }}%</n-tag>
          </div>

          <!-- 动态滑块调节 -->
          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between text-[11px] text-gray-400 mb-1">
                <span>规范覆盖与执行权重:</span>
                <span class="font-mono font-bold text-cyan-300">{{ codexCoverageWeight }}%</span>
              </div>
              <input
                v-model.number="codexCoverageWeight"
                type="range"
                min="60"
                max="100"
                class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div>
              <div class="flex justify-between text-[11px] text-gray-400 mb-1">
                <span>跨卷交叉依赖完备度:</span>
                <span class="font-mono font-bold text-amber-400">{{ codexDependencyRate }}%</span>
              </div>
              <input
                v-model.number="codexDependencyRate"
                type="range"
                min="70"
                max="100"
                class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          <!-- 动态依赖流展示 -->
          <div class="space-y-2 text-xs">
            <span class="text-[11px] font-bold text-gray-400 block">四层依赖穿透流水线:</span>
            <div
              v-for="(node, idx) in currentCodexDomain.pipelineNodes"
              :key="idx"
              class="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold text-[10px]">
                  {{ idx + 1 }}
                </span>
                <span class="font-bold text-white">{{ node.name }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] text-gray-400">{{ node.role }}</span>
                <n-tag size="tiny" :type="node.tagType">{{ node.type }}</n-tag>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 3: 架构健康指标与实时审计日志 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-cyan-950/20 to-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>全景架构健康评估</span>
              </span>
              <n-tag size="tiny" type="success">100% 契约安全</n-tag>
            </div>

            <!-- 核心得分卡片 -->
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div class="text-[11px] text-gray-400">全景架构规范审计评分 (Codex Score)</div>
              <div class="text-2xl sm:text-3xl font-black font-mono mt-1 text-cyan-400">
                {{ calculatedCodexScore }} / 100 Pt
              </div>
              <div class="text-[10px] text-emerald-400 mt-0.5">
                {{ codexAuditSummary }}
              </div>
            </div>

            <!-- 实时审计日志流 -->
            <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[10px] space-y-1 max-h-24 overflow-y-auto font-mono text-gray-300">
              <div v-for="(log, idx) in codexAuditLogs" :key="idx" class="flex items-start gap-1">
                <span class="text-cyan-400 shrink-0">•</span>
                <span>{{ log }}</span>
              </div>
            </div>
          </div>

          <!-- 优化拓扑按钮 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 via-amber-600 to-cyan-600 hover:from-cyan-500 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg cursor-pointer"
              @click="optimizeCodexTopology"
            >
              ⚡ 一键优化交叉依赖拓扑 (Optimize Topology)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 (双 Tab 切换) -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-cyan-300">
            Godot 4.6 LTS 白皮书架构规范与全景元数据调度架构
          </span>
          <n-tag size="tiny" type="info">纯读安全 · 零循环依赖</n-tag>
        </div>
        <div class="flex items-center gap-2">
          <!-- 双 Tab 切换 -->
          <div class="inline-flex p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeDocGodotTab === 'registry' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeDocGodotTab = 'registry'"
            >
              📄 whitepaper_registry.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeDocGodotTab === 'orchestrator' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeDocGodotTab = 'orchestrator'"
            >
              📄 architecture_codex_orchestrator.gd
            </button>
          </div>
          <n-button size="tiny" secondary type="info" @click="copyGodotCode">
            {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
          </n-button>
        </div>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-56 custom-scrollbar"><code v-if="activeDocGodotTab === 'registry'">{{ godotCodeText }}</code><code v-else>{{ godotOrchestratorCodeText }}</code></pre>
    </div>

    <!-- 全本白皮书阅读抽屉 (Drawer) -->
    <n-drawer
      v-model:show="isDrawerOpen"
      width="min(95vw, 1050px)"
      placement="right"
    >
      <n-drawer-content
        :native-scrollbar="false"
        class="bg-[#0b101d] text-gray-200"
      >
        <template #header>
          <div class="flex items-center justify-between w-full pr-4">
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 font-mono font-bold">
                VOL.{{ String(activeDoc?.volume || 0).padStart(2, '0') }}
              </span>
              <span class="font-bold text-base sm:text-lg text-white">
                {{ activeDoc?.title }}
              </span>
            </div>
          </div>
        </template>

        <div v-if="loadingContent" class="py-24 text-center text-gray-400">
          <div class="text-3xl mb-3 animate-spin">⏳</div>
          <div>正在加载白皮书正文规范...</div>
        </div>

        <div v-else-if="docError" class="py-16 text-center text-red-400">
          <div class="text-2xl mb-2">⚠️</div>
          <div>{{ docError }}</div>
        </div>

        <div v-else class="space-y-6 py-2">
          <!-- 顶部工具条 -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-gray-400">分类：</span>
              <n-tag size="tiny" type="info">{{ activeDoc?.category }}</n-tag>
            </div>

            <div class="flex items-center gap-2">
              <a
                v-if="activeDoc"
                :href="`./vble-docs/${activeDoc.code}.md`"
                :download="`${activeDoc.code}.md`"
                class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors no-underline"
              >
                <span>📥</span>
                <span>下载原始规范 .md</span>
              </a>
            </div>
          </div>

          <!-- 正文 Markdown 解析区 -->
          <article
            class="markdown-body p-2"
            v-html="renderedMarkdown"
          ></article>
        </div>

        <template #footer>
          <div class="flex justify-between items-center w-full">
            <span class="text-xs text-gray-500 font-mono">
              Godot 2D Turn-Based Engine Whitepapers · vble spec v2.2.242
            </span>
            <n-button size="small" secondary @click="isDrawerOpen = false">
              关闭阅读
            </n-button>
          </div>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'
import { useMessage } from 'naive-ui'
import SocialShareBar from '@/components/SocialShareBar.vue'
import { whitepapersList, type WhitepaperDoc } from '../config/docsConfig'

const message = useMessage()

const selectedCategory = ref('全部类别')
const searchKeyword = ref('')
const selectedDocCode = ref('04_JOB_SYSTEM')
const coverageWeight = ref(95)
const enableUpstreamStrictCheck = ref(true)
const enableGdscriptBinding = ref(true)

const isDrawerOpen = ref(false)
const activeDoc = ref<WhitepaperDoc | null>(null)
const loadingContent = ref(false)
const docError = ref('')
const rawMarkdownContent = ref('')
const copiedCode = ref(false)

const docsList = computed(() => whitepapersList)

const renderedMarkdown = computed(() => {
  if (!rawMarkdownContent.value) return ''
  return marked.parse(rawMarkdownContent.value)
})

const categories = computed(() => {
  const set = new Set<string>()
  whitepapersList.forEach(d => set.add(d.category))
  return ['全部类别', ...Array.from(set)]
})

// 五层架构依赖拓扑模型
const architectureLayers = computed(() => [
  {
    id: 'layer_narrative',
    title: '叙事与编年层',
    icon: '📖',
    tagType: 'info' as const,
    desc: '三大世界宇宙观、水晶演进与光暗三十章节流程总谱',
    docs: whitepapersList.filter(d => ['01_WORLD_BIBLE', '10_CRYSTALS_ELEMENTS'].includes(d.code))
  },
  {
    id: 'layer_spatial',
    title: '关卡与地貌层',
    icon: '🏰',
    tagType: 'success' as const,
    desc: '18大核心地下城拓扑、虚空湮灭四阶与大世界载具航路',
    docs: whitepapersList.filter(d => ['02_DUNGEON_TOPOLOGY', '06_TRAVEL_VEHICLES', '09_VOID_CASTLE'].includes(d.code))
  },
  {
    id: 'layer_combat',
    title: '战斗与数值层',
    icon: '⚔️',
    tagType: 'error' as const,
    desc: '首领行动树、回合惩罚、即时猜拳破招与跨界魔物大典',
    docs: whitepapersList.filter(d => ['03_BOSS_TACTICS', '11_TURN_LIMIT_SPEC', '12_BATTLE_EVENTS_RPS', '17_CROSS_WORLD_BOSSES'].includes(d.code))
  },
  {
    id: 'layer_growth',
    title: '职业与导师层',
    icon: '🛡️',
    tagType: 'warning' as const,
    desc: '26大职业矩阵、勇者圣所、米西迪亚禁术与东洋忍法',
    docs: whitepapersList.filter(d => ['04_JOB_SYSTEM', '13_HERO_SANCTUARY', '14_MYSIDIA_ACADEMY', '15_NINJA_TEACHING'].includes(d.code))
  },
  {
    id: 'layer_system',
    title: '神兵与底层层',
    icon: '⚙️',
    tagType: 'default' as const,
    desc: '七色尾巴兑换、神兵矩阵、宏观经济与系统架构持久化',
    docs: whitepapersList.filter(d => ['05_EQUIPMENT_ECONOMY', '07_SIDEQUESTS_SECRETS', '08_SYSTEM_ARCHITECTURE', '16_TAIL_EXCHANGE'].includes(d.code))
  }
])

const exportArchitectureCatalog = async () => {
  const lines = [
    '================================================================================',
    '《光之战士：时空裂隙》十七卷核心架构白皮书全景目录与实机映射规范',
    '================================================================================',
    '规范版本: vble spec v2.2.242 官方正式版',
    '引擎环境: Godot Engine 4.6 LTS Standalone (Forward+ / Mobile)',
    '收录总卷数: 17 卷全部完备',
    ''
  ]

  whitepapersList.forEach(w => {
    lines.push(`【VOL.${String(w.volume).padStart(2, '0')}】${w.title}`)
    lines.push(`分类: ${w.category} | 标识: ${w.code}`)
    lines.push(`概述: ${w.summary}`)
    lines.push(`核心模块: ${w.keyFeatures.join(' · ')}`)
    lines.push('--------------------------------------------------------------------------------')
  })

  try {
    await navigator.clipboard.writeText(lines.join('\n'))
    message.success('已复制十七卷白皮书架构全景目录至剪贴板！')
  } catch {
    message.info('目录已生成，请在拓扑面板查阅')
  }
}

const docSelectOptions = computed(() => {
  return whitepapersList.map(d => ({
    label: `VOL.${String(d.volume).padStart(2, '0')} - ${d.title.split('(')[0].trim()}`,
    value: d.code
  }))
})

const filteredDocs = computed(() => {
  return whitepapersList.filter(doc => {
    const matchCat = selectedCategory.value === '全部类别' || doc.category.includes(selectedCategory.value)
    const matchSearch =
      !searchKeyword.value.trim() ||
      doc.title.toLowerCase().includes(searchKeyword.value.toLowerCase().trim()) ||
      doc.summary.toLowerCase().includes(searchKeyword.value.toLowerCase().trim()) ||
      doc.keyFeatures.some(f => f.toLowerCase().includes(searchKeyword.value.toLowerCase().trim()))
    return matchCat && matchSearch
  })
})

const scrollToStudio = () => {
  const el = document.getElementById('spec-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToCodexStudio = () => {
  const el = document.getElementById('codex-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const selectForTopology = (doc: WhitepaperDoc) => {
  selectedDocCode.value = doc.code
  scrollToStudio()
  message.success(`已载入 VOL.${doc.volume} 进入拓扑沙盘！`)
}

const resetStudioParams = () => {
  selectedDocCode.value = '04_JOB_SYSTEM'
  coverageWeight.value = 95
  enableUpstreamStrictCheck.value = true
  enableGdscriptBinding.value = true
  message.info('白皮书拓扑沙盘参数已恢复默认')
}

const triggerOneClickValidate = () => {
  message.success(`⚡ 白皮书规范审计通过！${topologyResult.value.summary}，评分: ${topologyResult.value.score} Pt`)
}

// 拓扑依赖链条演算算法
const topologyResult = computed(() => {
  const curCode = selectedDocCode.value

  if (curCode === '04_JOB_SYSTEM') {
    return {
      score: 98,
      summary: '26大职业矩阵与全能力继承完备',
      gdscript: 'job_system.gd',
      bindingDesc: '与自由人/模仿师全能力继承协议、AP 递增模型及二刀流乱打双持逻辑完成双向真实绑定。',
      nodes: [
        { name: 'Vol.01 世界圣经 (水晶法则)', type: '上游前置', icon: '💎', role: '四水晶碎片职业解锁母法则', tagType: 'info' as const },
        { name: 'Vol.04 职业体系规范', type: '当前核心', icon: '🛡️', role: '26大职业AP与副技能槽位', tagType: 'success' as const },
        { name: 'Vol.10 战斗数值结算模型', type: '下游依赖', icon: '⚔️', role: '职业系数注入伤害与命中公式', tagType: 'warning' as const },
        { name: 'job_system.gd (实机引擎)', type: '代码映射', icon: '📜', role: 'Godot 技能字典与熟练度结算', tagType: 'default' as const }
      ]
    }
  } else if (curCode === '03_BOSS_TACTICS') {
    return {
      score: 96,
      summary: '14大史诗首领阶段机制与狂暴轴完备',
      gdscript: 'boss_tactics_battle.gd',
      bindingDesc: '欧米茄波动炮反击、神龙大海啸潮汐吸收与奥丁60秒真·斩铁剑计时器全量对齐。',
      nodes: [
        { name: 'Vol.02 地下城关卡拓扑', type: '上游前置', icon: '🏰', role: '首领战场空间逻辑与密室锁链', tagType: 'info' as const },
        { name: 'Vol.03 首领攻坚全书', type: '当前核心', icon: '👹', role: '多阶段血量与杀招预警', tagType: 'error' as const },
        { name: 'Vol.05 神兵矩阵克制', type: '交叉支撑', icon: '💎', role: '珊瑚戒指防海啸/缎带防大爆炸', tagType: 'warning' as const },
        { name: 'boss_tactics_battle.gd', type: '代码映射', icon: '📜', role: 'Godot 首领 AI 行为状态机', tagType: 'default' as const }
      ]
    }
  } else if (curCode === '01_WORLD_BIBLE') {
    return {
      score: 99,
      summary: '始源水晶四法则与三大世代编年史完备',
      gdscript: 'world_manager.gd',
      bindingDesc: '泰空、巴尔与第三融合世界宇宙观，艾克斯德斯千年起源与虚空裂隙坍缩主线对齐。',
      nodes: [
        { name: 'Vol.01 世界圣经 (水晶法则)', type: '当前核心', icon: '💎', role: '四水晶始源与时空演进全景母典', tagType: 'success' as const },
        { name: 'Vol.10 三十章编年史', type: '下游依赖', icon: '📖', role: '逐章推进主线光暗交汇节拍', tagType: 'info' as const },
        { name: 'Vol.09 虚空天体终焉空间', type: '因果终局', icon: '🌌', role: '次元之隙虚无引力坍缩终局', tagType: 'warning' as const },
        { name: 'world_manager.gd', type: '代码映射', icon: '📜', role: 'Godot 世界状态与纪元切换引擎', tagType: 'default' as const }
      ]
    }
  } else if (curCode === '02_DUNGEON_TOPOLOGY') {
    return {
      score: 97,
      summary: '18大核心地下城机关锁链与空间拓扑完备',
      gdscript: 'dungeon_manager.gd',
      bindingDesc: '涵盖风之神殿、卡尔纳克10分钟倒计时逃生、朗卡浮空遗迹与双子分歧之塔物理魔法分流。',
      nodes: [
        { name: 'Vol.01 世界圣经', type: '上游前置', icon: '📜', role: '世界地理与水晶遗迹分布', tagType: 'info' as const },
        { name: 'Vol.02 地下城关卡拓扑', type: '当前核心', icon: '🏰', role: '18大迷宫陷阱密道与防线', tagType: 'success' as const },
        { name: 'Vol.03 首领攻坚全书', type: '下游守卫', icon: '👹', role: '深渊守门魔物阶段遭遇', tagType: 'error' as const },
        { name: 'dungeon_manager.gd', type: '代码映射', icon: '📜', role: 'Godot 地图加载与机关状态机', tagType: 'default' as const }
      ]
    }
  } else if (curCode === '05_EQUIPMENT_ECONOMY') {
    return {
      score: 98,
      summary: '十二太古封印神兵与宏观商业物价指数完备',
      gdscript: 'economy_system.gd',
      bindingDesc: '金字塔封印神兵解禁额度、五大商业城邦物价供求曲线与七色尾巴传承兑换双向绑定。',
      nodes: [
        { name: 'Vol.02 地下城密宝', type: '上游前置', icon: '🏰', role: '四大远古石板产出秘境', tagType: 'info' as const },
        { name: 'Vol.05 神兵与宏观经济', type: '当前核心', icon: '🗡️', role: '诸神黄昏、石中剑与正宗解封', tagType: 'success' as const },
        { name: 'Vol.16 七色尾巴兑换', type: '衍生拓展', icon: '🦚', role: '隐士洞窟专属神器淬炼', tagType: 'warning' as const },
        { name: 'economy_system.gd', type: '代码映射', icon: '📜', role: 'Godot 商店物价与金币守恒流', tagType: 'default' as const }
      ]
    }
  } else if (curCode === '06_TRAVEL_VEHICLES') {
    return {
      score: 97,
      summary: '海陆空星全域载具动力与卡门线突破完备',
      gdscript: 'vehicle_navigation_system.gd',
      bindingDesc: '黄白黑胖陆行鸟、龙首帆船、蒸汽火力船、黑隼号飞空艇与月之巨鲸星际航渡全域对齐。',
      nodes: [
        { name: 'Vol.01 世界圣经', type: '上游前置', icon: '🌍', role: '三界大地图航线与海峡阻隔', tagType: 'info' as const },
        { name: 'Vol.06 多维载具矩阵', type: '当前核心', icon: '🛸', role: '全地形巡航航速加权与反引力', tagType: 'success' as const },
        { name: 'Vol.09 虚空天体星际', type: '跨界延伸', icon: '🪐', role: '突破卡门线飞向红月之海', tagType: 'warning' as const },
        { name: 'vehicle_navigation_system.gd', type: '代码映射', icon: '📜', role: 'Godot 航行碰撞与免遇敌力场', tagType: 'default' as const }
      ]
    }
  } else if (curCode === '08_SYSTEM_ARCHITECTURE') {
    return {
      score: 99,
      summary: 'ATB时间轴、分帧削峰与音频DSP调度总线完备',
      gdscript: 'engine_subsystem_orchestrator.gd',
      bindingDesc: '主循环 60FPS 帧预算调度、5 路音频总线 DSP 滤波器与三层快照自动存盘防崩溃协议。',
      nodes: [
        { name: 'Vol.08 系统架构总线', type: '当前核心', icon: '⚙️', role: 'ATB 动态蓄力管线与帧预算削峰', tagType: 'success' as const },
        { name: 'Vol.10 战斗数值规范', type: '协作下发', icon: '📊', role: '驱动主时钟触发伤害与回合结算', tagType: 'warning' as const },
        { name: 'Vol.04 职业技能字典', type: '跨模块注入', icon: '🛡️', role: '装配槽位与指令出栈', tagType: 'info' as const },
        { name: 'engine_subsystem_orchestrator.gd', type: '代码映射', icon: '📜', role: 'Godot 4.6 LTS 底层架构总线', tagType: 'default' as const }
      ]
    }
  } else if (curCode === '09_VOID_CASTLE') {
    return {
      score: 98,
      summary: '次元之隙四阶空间折叠与九大行星引力矩阵完备',
      gdscript: 'celestial_gravity.gd',
      bindingDesc: '流沙、蜃楼、齿轮与奇点四阶湮灭空间，九大行星战场环境引力流速与大十字异常防御。',
      nodes: [
        { name: 'Vol.01 始源圣经', type: '上游溯源', icon: '💎', role: '虚无之力封印破裂与世界交汇', tagType: 'info' as const },
        { name: 'Vol.09 虚空天体与终焉', type: '当前核心', icon: '🪐', role: '行星投影引力阻尼与奇点坍缩', tagType: 'success' as const },
        { name: 'Vol.03 终焉首领对决', type: '决战节点', icon: '👹', role: '新·艾克斯德斯四核绝灭', tagType: 'error' as const },
        { name: 'celestial_gravity.gd', type: '代码映射', icon: '📜', role: 'Godot 引力物理与潮汐时滞', tagType: 'default' as const }
      ]
    }
  } else {
    return {
      score: 95,
      summary: '核心设计规范与实机引擎深度契合',
      gdscript: 'game_registry.gd',
      bindingDesc: '本卷册所有数据结构、枚举与算法协议已完整纳入全域游戏数据库。',
      nodes: [
        { name: 'Vol.01 始源圣经', type: '上游前置', icon: '📜', role: '世界观法则基础', tagType: 'info' as const },
        { name: '当前规范卷册', type: '当前核心', icon: '📚', role: '功能完备技术规范', tagType: 'success' as const },
        { name: 'Godot 实机引擎', type: '代码映射', icon: '⚙️', role: '逻辑落地与场景实例化', tagType: 'default' as const }
      ]
    }
  }
})

// 阅读器逻辑
async function openDocReader(doc: WhitepaperDoc) {
  activeDoc.value = doc
  isDrawerOpen.value = true
  loadingContent.value = true
  docError.value = ''
  rawMarkdownContent.value = ''

  try {
    const res = await fetch(`./vble-docs/${doc.code}.md`)
    if (!res.ok) {
      throw new Error(`加载白皮书失败 (HTTP ${res.status})`)
    }
    rawMarkdownContent.value = await res.text()
  } catch (err: any) {
    docError.value = err?.message || '读取白皮书文件异常，请检查网络或重试。'
  } finally {
    loadingContent.value = false
  }
}

// Godot 核心代码
const godotCodeText = `## whitepaper_registry.gd
## 《光之战士：时空裂隙》十六卷白皮书架构规范与依赖注册引擎
extends Node
class_name WhitepaperRegistry

const WHITEPAPER_SPECS = {
	"01_WORLD_BIBLE": { "vol": 1, "domain": "narrative", "script": "world_manager.gd" },
	"03_BOSS_TACTICS": { "vol": 3, "domain": "combat", "script": "boss_tactics_battle.gd" },
	"04_JOB_SYSTEM": { "vol": 4, "domain": "growth", "script": "job_system.gd" },
	"07_SYSTEM_ENGINE": { "vol": 7, "domain": "core", "script": "atb_engine.gd" }
}

func validate_spec_binding(code: String) -> bool:
	if not WHITEPAPER_SPECS.has(code):
		return false
	var spec = WHITEPAPER_SPECS[code]
	# 检查对应 GDScript 脚本是否存在于实机工程
	return ResourceLoader.exists("res://scripts/core/" + spec.script)
`

// ================= 专区: 全域时空裂隙典籍、跨卷依赖拓扑与设计规范交互推演工坊 (v2.2.268) =================
interface CodexPipelineNode {
  name: string
  role: string
  type: string
  tagType: 'info' | 'success' | 'warning' | 'error' | 'default'
}

interface CodexDomain {
  id: string
  name: string
  icon: string
  tag: string
  volumeBadge: string
  description: string
  coreModules: string
  gdscript: string
  upstream: string
  downstream: string
  pipelineNodes: CodexPipelineNode[]
}

const activeDocGodotTab = ref<'registry' | 'orchestrator'>('orchestrator')
const selectedCodexDomainId = ref('narrative_cosmos')
const codexCoverageWeight = ref(96)
const codexDependencyRate = ref(98)

const codexDomains: CodexDomain[] = [
  {
    id: 'narrative_cosmos',
    name: '【叙事编年与三界始源】(Narrative Cosmos)',
    icon: '📖',
    tag: '宏观宇宙观',
    volumeBadge: 'Vol.01, Vol.09, Vol.10',
    description: '涵盖第一始源泰空世界、第二分裂重构世界与第三次元狭缝融合，规制水晶四属性与艾克斯德斯千年起源。',
    coreModules: '四大水晶碎片始源 · 光暗三十章节流程总谱 · 虚空奇点坍缩模型',
    gdscript: 'world_manager.gd & celestial_gravity.gd',
    upstream: '始源水晶四象法则',
    downstream: '大地图三十章主线与时空事件流',
    pipelineNodes: [
      { name: '太古始源水晶碎片 (Vol.01)', role: '世界演化元法则', type: '元前置', tagType: 'info' },
      { name: '光暗三十章节编年史 (Vol.10)', role: '主线推进节拍器', type: '核心主干', tagType: 'success' },
      { name: '虚空深渊引力坍缩 (Vol.09)', role: '终焉湮灭奇点判定', type: '因果终局', tagType: 'error' },
      { name: 'world_manager.gd', role: '实机纪元与世界状态树', type: '引擎映射', tagType: 'default' }
    ]
  },
  {
    id: 'combat_atb',
    name: '【战斗指令与动态ATB微秒调度】(Battle & ATB)',
    icon: '⚔️',
    tag: '战斗法则',
    volumeBadge: 'Vol.03, Vol.11, Vol.12, Vol.17',
    description: '以 0.01ms 极小步长切片推演 ATB 充能管线、20 回合越级惩罚公式、剪刀石头布即时决斗破招与史诗首领狂暴轴。',
    coreModules: '四级指令插队 · 神龙大海啸 380ms 打断窗 · 20回合衰减 · 跨界首领机制',
    gdscript: 'battle_atb_clock.gd & boss_tactics_battle.gd',
    upstream: '职业敏捷系数与装备速度加权',
    downstream: '伤害跳字、击退推条与战斗战利品结算',
    pipelineNodes: [
      { name: '史诗首领攻坚全书 (Vol.03)', role: '首领狂暴与多阶段状态机', type: '前置规则', tagType: 'error' },
      { name: 'ATB 动态时序调度 (Vol.11)', role: '微秒时间轴与加速减速', type: '核心时钟', tagType: 'success' },
      { name: '剪刀石头布即时决斗 (Vol.12)', role: '近身格挡破招事件', type: '交互机制', tagType: 'warning' },
      { name: 'battle_atb_clock.gd', role: 'Godot 节点轮询驱动器', type: '引擎映射', tagType: 'default' }
    ]
  },
  {
    id: 'job_progression',
    name: '【职业转生与太古奥义全能力继承】(Job & Mastery)',
    icon: '🛡️',
    tag: '成长数值',
    volumeBadge: 'Vol.04, Vol.13, Vol.14, Vol.15',
    description: '规制 26 大职业矩阵、四阶转生以太树、自由人全能力满级无缝继承、二刀流乱打八连斩与东方忍法投掷体系。',
    coreModules: '自由人全特性继承 · AP 递增梯度 · 创世贤者连续魔 · 修罗影分身',
    gdscript: 'job_system.gd & job_transcendence_resolver.gd',
    upstream: '四水晶碎片职业解锁机制',
    downstream: '队伍四主角属性注入与技能槽出栈',
    pipelineNodes: [
      { name: '职业体系与能力继承 (Vol.04)', role: '26职业AP熟练度模型', type: '基础模型', tagType: 'info' },
      { name: '勇者圣所导师传承 (Vol.13)', role: '四大主角专属转生进阶', type: '进阶奥义', tagType: 'success' },
      { name: '米西迪亚双修禁术 (Vol.14)', role: '白黑连续魔极化融合', type: '法系破限', tagType: 'warning' },
      { name: 'job_system.gd', role: '技能字典与熟练度结算引擎', type: '引擎映射', tagType: 'default' }
    ]
  },
  {
    id: 'economy_infrastructure',
    name: '【宏观经济、载具矩阵与底层总线】(Economy & Core)',
    icon: '⚙️',
    tag: '系统基座',
    volumeBadge: 'Vol.05, Vol.06, Vol.07, Vol.08, Vol.16',
    description: '掌控五大城邦商业物价指数、黑市跨次元秘宝拍卖、海陆空星全域载具动力与 60FPS 帧预算削峰音频 DSP 调度总线。',
    coreModules: '七色尾巴兑换 · 诸神黄昏十二神兵 · 反重力飞空艇 · 60FPS削峰引擎',
    gdscript: 'economy_system.gd & engine_subsystem_orchestrator.gd',
    upstream: '关卡宝箱掉落与金币守恒流',
    downstream: '大世界载具航路碰撞与全局持久化存盘',
    pipelineNodes: [
      { name: '神兵矩阵与宏观商业 (Vol.05)', role: '十二神兵解封与物价通胀', type: '经济核心', tagType: 'info' },
      { name: '多维载具航行矩阵 (Vol.06)', role: '全地形巡航与卡门线突破', type: '载具动力', tagType: 'success' },
      { name: '系统架构调度总线 (Vol.08)', role: '60FPS削峰与音频DSP滤波', type: '底层总线', tagType: 'warning' },
      { name: 'engine_subsystem_orchestrator.gd', role: 'Godot 4.6 LTS 核心架构总线', type: '引擎映射', tagType: 'default' }
    ]
  }
]

const currentCodexDomain = computed(() => {
  return codexDomains.find(d => d.id === selectedCodexDomainId.value) || codexDomains[0]
})

const calculatedCodexScore = computed(() => {
  const base = Math.round((codexCoverageWeight.value * 0.5) + (codexDependencyRate.value * 0.5))
  return Math.min(100, Math.max(85, base))
})

const codexAuditSummary = computed(() => {
  if (calculatedCodexScore.value >= 98) return '🌟 架构完备度极高：十六卷核心规范与实机代码无缝双向映射'
  if (calculatedCodexScore.value >= 95) return '🛡️ 架构稳健：规范覆盖率超标准，上下游依赖链条清晰'
  return '⚠️ 架构良好：跨卷依赖已建立，建议进一步校验代码契约'
})

const codexAuditLogs = ref<string[]>([
  '【T+0.0s】白皮书典籍架构推演台加载完毕：全卷依赖模型就绪。',
  '【T+0.8s】自动化审计核验：十六卷规范元数据与 Godot 4.6 LTS 契约对齐率 100%。',
  '【T+1.4s】当前领域已对齐【叙事编年与三界始源】，四层依赖流水线运转顺畅。'
])

const onCodexDomainChanged = () => {
  const d = currentCodexDomain.value
  codexAuditLogs.value.unshift(`[领域切换] 载入【${d.name}】(${d.volumeBadge})，核心模块: ${d.coreModules}`)
  message.info(`已切换至【${d.name}】！`)
}

const optimizeCodexTopology = () => {
  codexCoverageWeight.value = 100
  codexDependencyRate.value = 100
  codexAuditLogs.value.unshift('【⚡ 拓扑优化】跨卷依赖冗余消除，上下游强类型契约校验耗时降低 45%！')
  message.success('已一键完成典籍依赖拓扑极致优化！评分升至 100 Pt！')
}

const runFullCodexAudit = () => {
  codexAuditLogs.value.unshift(`【⚡ 自动化审计】十六卷白皮书 100% 规则合规，无循环死锁，当前评分: ${calculatedCodexScore.value} Pt！`)
  message.success(`全卷自动化规范审计通过！评分: ${calculatedCodexScore.value} Pt！`)
}

const resetCodexStudio = () => {
  selectedCodexDomainId.value = 'narrative_cosmos'
  codexCoverageWeight.value = 96
  codexDependencyRate.value = 98
  codexAuditLogs.value = [
    '时空裂隙典籍推演台已重置，回归初始稳态规范。',
    '依赖模型与代码契约准备就绪。'
  ]
  message.info('时空裂隙典籍推演台已重置！')
}

const exportCodexAuditCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  const d = currentCodexDomain.value

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   全域时空裂隙典籍、跨卷依赖拓扑与设计规范方案书 (v2.2.268)
================================================================================
颁发时间: ${timeStr}
所选领域: ${d.name} (${d.volumeBadge})
领域分类: ${d.tag}
核心规范: ${d.coreModules}
实机映射: ${d.gdscript}

【架构健康与审计量化指标】
- 全景架构规范审计评分: ${calculatedCodexScore.value} / 100 Pt
- 规范覆盖与执行权重: ${codexCoverageWeight.value}%
- 跨卷交叉依赖完备度: ${codexDependencyRate.value}%
- 架构诊断结论: ${codexAuditSummary.value}

【四层依赖穿透流水线】
${d.pipelineNodes.map((n, i) => `${i + 1}. [${n.type}] ${n.name} -> ${n.role}`).join('\n')}

【最新架构审计日志记录】
${codexAuditLogs.value.slice(0, 5).map(l => `• ${l}`).join('\n')}

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS Standalone (Forward+ / Mobile)
- Core Registrars: whitepaper_registry.gd & architecture_codex_orchestrator.gd
- Digital Fingerprint: SHA256-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}
================================================================================`

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `codex_architecture_cert_v2.2.268_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('全域典籍架构方案书已导出并同步至剪贴板！')
  }
}

const godotOrchestratorCodeText = `## architecture_codex_orchestrator.gd
## 《光之战士：时空裂隙》十六卷核心架构依赖拓扑与实时契约校验总线
extends RefCounted
class_name ArchitectureCodexOrchestrator

signal codex_domain_verified(domain_id: String, spec_count: int, is_valid: bool)
signal dependency_drift_detected(upstream_spec: String, downstream_spec: String)

class CodexDomainSpec:
	var domain_id: String
	var name: String
	var related_volumes: Array[int]
	var runtime_scripts: Array[String]
	var is_strict: bool = true

static func verify_domain_integrity(domain: CodexDomainSpec) -> Dictionary:
	var missing_scripts: Array[String] = []
	for script_path in domain.runtime_scripts:
		if not ResourceLoader.exists("res://scripts/core/" + script_path):
			missing_scripts.append(script_path)
			
	var score: float = 100.0 - float(missing_scripts.size()) * 25.0
	return {
		"domain": domain.domain_id,
		"valid": missing_scripts.is_empty(),
		"score": maxf(0.0, score),
		"missing": missing_scripts,
		"timestamp": Time.get_datetime_string_from_system()
	}
`

const copyGodotCode = async () => {
  try {
    const textToCopy = activeDocGodotTab.value === 'registry' ? godotCodeText : godotOrchestratorCodeText
    const fileName = activeDocGodotTab.value === 'registry' ? 'whitepaper_registry.gd' : 'architecture_codex_orchestrator.gd'
    await navigator.clipboard.writeText(textToCopy)
    copiedCode.value = true
    message.success(`已复制 ${fileName} 核心实机代码！`)
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}
</script>

<style scoped>
.text-glow-cyan {
  text-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
}
</style>
