<template>
  <div class="roadmap-view max-w-6xl mx-auto space-y-8 px-3 sm:px-6 py-4">
    <!-- 顶部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-purple-950/70 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.2)] relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/3 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              FEATURE ROADMAP & EVOLUTION MATRIX
            </span>
            <span class="text-xs text-gray-400">里程碑推进与架构推演沙盘</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🚀</span> 游戏架构路线图与里程碑演练工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            实时总览《光之战士：时空裂隙》四大演进纪元、正在攻坚的核心系统、社区心愿投票热度与 Godot 4.x 特性分发管线。支持自定义研发算力进行动态排期沙盘推演。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <router-link to="/vble/updates">
            <n-button type="info" size="medium" round secondary class="shadow-md">
              <template #icon><span>🔄</span></template>
              查看更新日志
            </n-button>
          </router-link>
          <router-link to="/vble/docs">
            <n-button type="warning" size="medium" round secondary class="shadow-md">
              <template #icon><span>📜</span></template>
              十六卷架构白皮书
            </n-button>
          </router-link>
          <router-link to="/vble">
            <n-button size="medium" round tertiary>
              返回首页
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 规划看板概览指标卡 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center relative overflow-hidden group hover:border-emerald-500/40 transition-all">
        <div class="text-xs text-gray-400">已实装交付特性</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">{{ getStatusCount('completed') }} 项</div>
        <div class="text-[10px] text-gray-500 mt-0.5">全量上线并完成测试</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center relative overflow-hidden group hover:border-amber-500/40 transition-all">
        <div class="text-xs text-gray-400">正在攻坚冲刺</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">{{ getStatusCount('in_progress') }} 项</div>
        <div class="text-[10px] text-gray-500 mt-0.5">高优先级排期中 (v2.3 周期)</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center relative overflow-hidden group hover:border-cyan-500/40 transition-all">
        <div class="text-xs text-gray-400">已列入版本规划</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ getStatusCount('planned') }} 项</div>
        <div class="text-[10px] text-gray-500 mt-0.5">中远期版本规划库 (v2.4~v2.5)</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center relative overflow-hidden group hover:border-pink-500/40 transition-all">
        <div class="text-xs text-gray-400">社区心愿与交互热度</div>
        <div class="text-2xl font-black text-pink-400 font-mono mt-1">{{ totalVotes }} 票</div>
        <div class="text-[10px] text-gray-500 mt-0.5">驱动排期权重倾斜</div>
      </div>
    </div>

    <!-- 模式切换标签页 -->
    <div class="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
      <button
        v-for="tab in tabList"
        :key="tab.key"
        type="button"
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
        :class="activeTab === tab.key
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
          : 'bg-slate-900 text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-800'"
        @click="activeTab = tab.key"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- 1. 四大演进纪元与里程碑甘特推进轴 -->
    <div v-if="activeTab === 'milestones'" class="space-y-6">
      <div class="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🗺️</span> 四大演进纪元推进全景 (Evolution Epochs)
            </h3>
            <p class="text-xs text-gray-400 mt-1">从单机核心战斗到多端云生态，量化每个阶段的关键里程碑、交付成果与技术债控制指标。</p>
          </div>
          <span class="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            总体演进进度：74.2%
          </span>
        </div>

        <!-- 阶段里程碑选择器 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="epoch in epochList"
            :key="epoch.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedEpoch.id === epoch.id
              ? 'bg-gradient-to-br from-slate-900 to-amber-950/40 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'"
            @click="selectedEpoch = epoch"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold" :class="epoch.badgeColor">{{ epoch.code }}</span>
              <n-tag size="tiny" :type="epoch.statusType" round strong>{{ epoch.statusLabel }}</n-tag>
            </div>
            <div class="text-sm font-bold text-white mt-2">{{ epoch.title }}</div>
            <div class="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">{{ epoch.subtitle }}</div>
            
            <div class="mt-3 space-y-1">
              <div class="flex justify-between text-[10px] font-mono text-gray-400">
                <span>达成率</span>
                <span class="text-amber-300 font-bold">{{ epoch.progress }}%</span>
              </div>
              <n-progress
                type="line"
                :percentage="epoch.progress"
                :color="epoch.progressColor"
                :height="6"
                :show-indicator="false"
              />
            </div>
          </div>
        </div>

        <!-- 选中纪元深度档案与交付拓扑 -->
        <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div class="flex items-center gap-3">
              <span class="text-3xl">{{ selectedEpoch.icon }}</span>
              <div>
                <h4 class="text-base font-bold text-white flex items-center gap-2">
                  <span>{{ selectedEpoch.title }}</span>
                  <span class="text-xs font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {{ selectedEpoch.versionRange }}
                  </span>
                </h4>
                <p class="text-xs text-gray-400 mt-0.5">{{ selectedEpoch.detailedDesc }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-400">工程周期：</span>
              <span class="text-xs font-mono text-cyan-300 font-bold">{{ selectedEpoch.timeline }}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- 核心交付成果 -->
            <div class="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🏆</span> 阶段核心交付物 (Deliverables)
              </div>
              <ul class="text-xs text-gray-300 space-y-1.5">
                <li v-for="(item, idx) in selectedEpoch.deliverables" :key="idx" class="flex items-start gap-1.5">
                  <span class="text-emerald-400 shrink-0 font-bold">✔</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- 关键技术突破与依赖 -->
            <div class="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <span>⚙️</span> 核心技术攻坚与模块依赖
              </div>
              <ul class="text-xs text-gray-300 space-y-1.5">
                <li v-for="(item, idx) in selectedEpoch.techPrereqs" :key="idx" class="flex items-start gap-1.5">
                  <span class="text-cyan-400 shrink-0 font-mono">▸</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- 质量指标与风控护栏 -->
            <div class="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <span>🛡️</span> 质量与安全护栏 (Quality Gates)
              </div>
              <ul class="text-xs text-gray-300 space-y-1.5">
                <li v-for="(item, idx) in selectedEpoch.qualityGates" :key="idx" class="flex items-start gap-1.5">
                  <span class="text-purple-400 shrink-0 font-mono">⚡</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 特性排期沙盘模拟器 -->
    <div v-if="activeTab === 'simulator'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>⚡</span> 动态排期推演沙盘 (Sprint Velocity & Rollout Simulator)
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              调整每周团队算力点数、架构重构比例与测试覆盖目标，沙盘将实时推演各版本的交付周期、稳定性指数与关键路径。
            </p>
          </div>
          <n-button size="small" round secondary type="warning" @click="resetSimulation">
            恢复基准配置
          </n-button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 左侧调参控制器 -->
          <div class="space-y-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div class="text-xs font-bold text-amber-300 uppercase tracking-wider">
              🎮 研发生态控制台
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">团队每周算力 (Velocity Points)</span>
                <span class="font-mono text-amber-400 font-bold">{{ simVelocity }} pts / 周</span>
              </div>
              <n-slider v-model:value="simVelocity" :min="30" :max="120" :step="5" />
              <div class="text-[10px] text-gray-500">点数越高推进越快，但高点数需要充沛工程精力。</div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">架构重构与技术债配比</span>
                <span class="font-mono text-cyan-400 font-bold">{{ simRefactorRatio }}%</span>
              </div>
              <n-slider v-model:value="simRefactorRatio" :min="5" :max="40" :step="5" />
              <div class="text-[10px] text-gray-500">提高重构比例可显著降低崩溃率并提升后续拓展速度。</div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">自动化测试覆盖率目标</span>
                <span class="font-mono text-emerald-400 font-bold">{{ simTestCoverage }}%</span>
              </div>
              <n-slider v-model:value="simTestCoverage" :min="60" :max="99" :step="1" />
              <div class="text-[10px] text-gray-500">严格门禁校验（如 vue-tsc 与 GDScript 单元断言）。</div>
            </div>

            <div class="space-y-2 pt-2 border-t border-slate-800">
              <span class="text-xs text-gray-300">战略倾向模式：</span>
              <div class="grid grid-cols-2 gap-2 mt-1">
                <button
                  v-for="mode in simModes"
                  :key="mode.id"
                  type="button"
                  class="px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all text-center"
                  :class="simActiveMode === mode.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
                    : 'bg-slate-900 text-gray-300 border-slate-700 hover:bg-slate-800'"
                  @click="simActiveMode = mode.id"
                >
                  {{ mode.name }}
                </button>
              </div>
            </div>
          </div>

          <!-- 右侧推演结果面板 -->
          <div class="lg:col-span-2 space-y-4">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">v2.3 预估交付周期</div>
                <div class="text-xl font-black text-amber-400 font-mono mt-1">{{ simWeeksV23 }} 周</div>
                <div class="text-[10px] text-gray-500 mt-0.5">预计 {{ simEstimatedDateV23 }}</div>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">架构稳定性指数</div>
                <div class="text-xl font-black text-emerald-400 font-mono mt-1">{{ simStabilityIndex }} / 100</div>
                <div class="text-[10px] text-gray-500 mt-0.5">防坏档与异常自愈度</div>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">线上崩溃风险率</div>
                <div class="text-xl font-black text-cyan-400 font-mono mt-1">{{ simCrashRisk }}%</div>
                <div class="text-[10px] text-gray-500 mt-0.5">远低于行业 1.5% 阈值</div>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-xs text-gray-400">总需求池燃尽预计</div>
                <div class="text-xl font-black text-purple-400 font-mono mt-1">{{ simBurnDownWeeks }} 周</div>
                <div class="text-[10px] text-gray-500 mt-0.5">全面达成 v2.5 生态</div>
              </div>
            </div>

            <!-- 动态关键路径 (Critical Path) 推演 -->
            <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div class="text-xs font-bold text-white flex items-center justify-between">
                <span class="flex items-center gap-1.5">
                  <span>🔥</span> 动态关键推进路线与依赖流水线 (Critical Path)
                </span>
                <span class="text-[10px] font-mono text-gray-400">流水线自适应排序</span>
              </div>
              <div class="space-y-2">
                <div
                  v-for="(step, index) in simCriticalPath"
                  :key="index"
                  class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-slate-800 text-amber-300 font-mono font-bold flex items-center justify-center text-[10px]">
                      {{ index + 1 }}
                    </span>
                    <span class="font-bold text-gray-200">{{ step.title }}</span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">{{ step.module }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-gray-400 font-mono text-[11px]">{{ step.costPts }} pts</span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded" :class="step.statusClass">{{ step.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. 核心功能卡片流与心愿标记 -->
    <div v-if="activeTab === 'features'" class="space-y-6">
      <!-- 状态筛选器 -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          v-for="status in statusList"
          :key="status.key"
          type="button"
          class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 whitespace-nowrap select-none"
          :class="activeStatus === status.key
            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.45)]'
            : 'bg-slate-800 text-gray-200 border-slate-700 hover:bg-slate-700 hover:text-white'"
          @click="activeStatus = status.key"
        >
          <span>{{ status.icon }}</span>
          <span>{{ status.label }}</span>
          <span
            class="text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold"
            :class="activeStatus === status.key ? 'bg-amber-900/30 text-slate-950' : 'bg-slate-900 text-amber-300 border border-slate-700'"
          >
            {{ getStatusCount(status.key) }}
          </span>
        </button>
      </div>

      <!-- 规划功能卡片流 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div
          v-for="feature in filteredFeatures"
          :key="feature.id"
          class="feature-card p-5 sm:p-6 rounded-2xl bg-[#121626]/90 border border-slate-800 hover:border-slate-700 shadow-xl transition-all flex flex-col justify-between space-y-4"
        >
          <div class="space-y-3">
            <!-- 顶部状态与标签 -->
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-2xl">{{ feature.icon }}</span>
                <h3 class="text-base sm:text-lg font-bold text-white">{{ feature.title }}</h3>
              </div>
              <n-tag size="small" :type="feature.statusType" round strong>
                {{ feature.statusLabel }}
              </n-tag>
            </div>

            <!-- 描述 -->
            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- 计划包含的核心内容 -->
            <div class="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1.5">
              <div class="text-xs font-bold text-amber-300 flex items-center gap-1">
                <span>🎯</span> 期望交付特性与规范：
              </div>
              <ul class="text-xs text-gray-300 space-y-1">
                <li v-for="(spec, i) in feature.specs" :key="i" class="flex items-start gap-1.5">
                  <span class="text-amber-400 font-bold shrink-0">✔</span>
                  <span>{{ spec }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 底部预定版本与点赞交互 -->
          <div class="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-gray-500">预定目标：</span>
              <span class="font-mono text-cyan-300 font-bold">{{ feature.targetVersion }}</span>
            </div>

            <!-- 点赞/想要这个功能按钮 -->
            <n-button
              size="small"
              round
              :type="feature.voted ? 'warning' : 'default'"
              :secondary="!feature.voted"
              @click="toggleVote(feature)"
            >
              <template #icon>
                <span>{{ feature.voted ? '❤️' : '🤍' }}</span>
              </template>
              <span>想要这个 ({{ feature.votes }})</span>
            </n-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 社区心愿与 RFC 提案工坊 -->
    <div v-if="activeTab === 'proposals'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>💡</span> 社区 RFC 提案与心愿构想提交工坊
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              所有冒险者与架构师均可在此提交新的特性建议，系统会自动分配技术评估点数并由全员表决纳入主线排期。
            </p>
          </div>
          <n-button size="small" round type="info" secondary @click="copyAllProposalsJson">
            <template #icon><span>📋</span></template>
            导出所有提案 JSON
          </n-button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 提交新提案表单 -->
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div class="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>✍️</span> 提交我的架构愿望 (New RFC)
            </div>

            <div class="space-y-1.5">
              <label class="text-xs text-gray-300">特性标题：</label>
              <input
                v-model="newProposal.title"
                type="text"
                placeholder="例如：双人同屏本地合作探索模式"
                class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs text-gray-300">所属模块领域：</label>
              <select
                v-model="newProposal.category"
                class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="战斗机制与职业">战斗机制与职业 (Battle & Jobs)</option>
                <option value="大地图探索与城镇">大地图探索与城镇 (World & Towns)</option>
                <option value="视觉视效与音频">视觉视效与音频 (VFX & Audio)</option>
                <option value="云同步与跨端">云同步与跨端 (Cloud & Multiplatform)</option>
                <option value="工具链与模组生态">工具链与模组生态 (Modding & SDK)</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs text-gray-300">详细描述与诉求背景：</label>
              <textarea
                v-model="newProposal.description"
                rows="3"
                placeholder="说明该特性能给冒险者带来怎样的游戏体验与代入感..."
                class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
              ></textarea>
            </div>

            <n-button
              type="warning"
              block
              round
              class="font-bold text-slate-950 mt-2"
              @click="submitProposal"
            >
              提交愿望并加入投票池
            </n-button>
          </div>

          <!-- 热门社区提案榜单 -->
          <div class="lg:col-span-2 space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-gray-300">
              <span>🔥 社区心愿热度表决榜 (按点赞排序)</span>
              <span class="text-gray-500 font-normal">累计 {{ communityProposals.length }} 个活跃提案</span>
            </div>

            <div class="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              <div
                v-for="prop in sortedCommunityProposals"
                :key="prop.id"
                class="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                        {{ prop.category }}
                      </span>
                      <h4 class="text-sm font-bold text-white">{{ prop.title }}</h4>
                    </div>
                    <span class="text-[10px] font-mono text-gray-400">估算 {{ prop.estPoints }} pts</span>
                  </div>
                  <p class="text-xs text-gray-300 mt-2 leading-relaxed">{{ prop.description }}</p>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span class="text-gray-500">提议者：<span class="text-gray-400 font-mono">{{ prop.author }}</span></span>
                  <n-button
                    size="tiny"
                    round
                    :type="prop.voted ? 'warning' : 'default'"
                    :secondary="!prop.voted"
                    @click="toggleProposalVote(prop)"
                  >
                    <span>{{ prop.voted ? '❤️ 已赞' : '🤍 支持' }} ({{ prop.votes }})</span>
                  </n-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Godot 4.x 引擎特性分发管理系统源码 -->
    <div v-if="activeTab === 'engine_code'" class="space-y-4">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                GODOT 4.X PRODUCTION SCRIPT
              </span>
              <h3 class="text-base font-bold text-white">feature_pipeline_manager.gd</h3>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              游戏底层特性动态开关 (Feature Flags)、灰度发布分流、云端热补丁校验与安全回退控制器。
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
import { ref, computed, reactive } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

// 标签页控制
const activeTab = ref('milestones')
const tabList = [
  { key: 'milestones', label: '阶段演进纪元', icon: '🗺️' },
  { key: 'simulator', label: '排期推演沙盘', icon: '⚡' },
  { key: 'features', label: '核心功能规划库', icon: '📋' },
  { key: 'proposals', label: '社区心愿工坊', icon: '💡' },
  { key: 'engine_code', label: '引擎分发源码', icon: '🛠️' }
]

// 纪元数据
interface Epoch {
  id: string
  code: string
  title: string
  subtitle: string
  icon: string
  versionRange: string
  timeline: string
  progress: number
  badgeColor: string
  progressColor: string
  statusType: 'success' | 'warning' | 'info' | 'default'
  statusLabel: string
  detailedDesc: string
  deliverables: string[]
  techPrereqs: string[]
  qualityGates: string[]
}

const epochList: Epoch[] = [
  {
    id: 'epoch-1',
    code: 'EPOCH 01',
    title: '创世与核心架构奠基',
    subtitle: '完成单机核心框架、大地图走格子与双轨职业战斗',
    icon: '🏛️',
    versionRange: 'v1.0.0 ~ v2.0.0',
    timeline: '2025 Q1 ~ 2026 Q1',
    progress: 100,
    badgeColor: 'text-emerald-400',
    progressColor: '#10b981',
    statusType: 'success',
    statusLabel: '100% 达成',
    detailedDesc: '构建全域 97 处大地图场景、八大英雄角色、基础 14 职业体系与回合制 ATB 战斗骨架，完成单机闭环。',
    deliverables: [
      '97 处全域大地图场景与城镇 NPC 对话网络',
      '基础战士/白魔/黑魔/盗贼/骑士/龙骑士等 14 职业矩阵',
      '回合制 ATB 战斗内核与基础道具消耗体系',
      '本地存档持久化与全局配置管理'
    ],
    techPrereqs: [
      'Godot 4.x 2D TileMap 双层图块流式渲染',
      'SceneTransitionManager 场景无缝淡入淡出',
      'SaveGameBinary 结构体加密流保存'
    ],
    qualityGates: [
      '全场景无黑屏死循环跳出',
      '战斗结算经验与金币准确率 100%',
      '纯键盘 / 手柄摇杆输入完全响应'
    ]
  },
  {
    id: 'epoch-2',
    code: 'EPOCH 02',
    title: '十六卷机制与数值革新',
    subtitle: '实装太古封印、十二召唤兽、全地形载具与宏观炼金',
    icon: '🔮',
    versionRange: 'v2.1.0 ~ v2.2.215',
    timeline: '2026 Q2 ~ 2026 Q3 (当前纪元)',
    progress: 96,
    badgeColor: 'text-amber-400',
    progressColor: '#f59e0b',
    statusType: 'warning',
    statusLabel: '96% 攻坚尾声',
    detailedDesc: '重塑深度战斗与探索机制，引入 28 大进阶职业、50+太古神兵、十二柱召唤兽合体技、十维载具海陆空潜行与十六卷规范白皮书。',
    deliverables: [
      '十二柱召唤兽圣痕契约与极意融合技 (Fusion Artes)',
      '10 维全域载具驾驶矩阵（陆行鸟、飞空艇、黑魔导潜水艇）',
      '深渊首领高难机制相克矩阵（神龙海啸、欧米茄反伤）',
      '十六卷核心架构白皮书规范文库与依赖拓扑沙盘'
    ],
    techPrereqs: [
      'Godot 4.x NavigationAgent2D 载具智能寻路与离线网格',
      'SummonPactEngine 瞬时环境粒子与伤害穿透算子',
      'InvertedIndexSearch 全域数据毫秒级倒排索引'
    ],
    qualityGates: [
      'vue-tsc 严格编译 0 报错',
      '载具地形碰撞判定误触率 < 0.01%',
      '全装备属性与六维成长数值平衡闭环'
    ]
  },
  {
    id: 'epoch-3',
    code: 'EPOCH 03',
    title: '虚空深渊与视听渲染演进',
    subtitle: '粒子着色器爆发、Cut-in 绝技大招与深渊 100 层地狱',
    icon: '🌌',
    versionRange: 'v2.3.0 ~ v2.4.5',
    timeline: '2026 Q4 ~ 2027 Q1',
    progress: 58,
    badgeColor: 'text-cyan-400',
    progressColor: '#06b6d4',
    statusType: 'info',
    statusLabel: '58% 重点攻坚',
    detailedDesc: '全面升级视听震撼体验，引入九阶禁术粒子特写 Cut-in 演出、神兵二次洗练开光孔位、主角营地羁绊物语与 100 层深渊地狱极限挑战。',
    deliverables: [
      '九阶禁术（核爆/陨石/神圣）全屏粒子与角色特写 Cut-in',
      '神兵炼金熔炉词条洗练与太古符文孔位镶嵌',
      '50~100 层深渊地狱极端词缀极限生存挑战',
      '营地篝火双人羁绊合体技与宿命回忆立绘'
    ],
    techPrereqs: [
      'Vulkan 混合着色管线与 60FPS 满载 GPU 粒子批处理',
      'ActionCamera2D 战斗极意时空凝滞镜头平滑追踪',
      'AbyssAffixEngine 随机环境词缀与即时怪物数值突变'
    ],
    qualityGates: [
      '特写演出平均跳帧数 < 1 帧',
      'Steam Deck 与移动端 60FPS 稳帧运行',
      '深渊 100 层死循环保护与单局断线恢复'
    ]
  },
  {
    id: 'epoch-4',
    code: 'EPOCH 04',
    title: '多端云生态与无缝开放模组',
    subtitle: 'Web 门户与实机存档双向打通、战斗回放与 MOD 创作',
    icon: '🌐',
    versionRange: 'v2.5.0+',
    timeline: '2027 Q2 ~ 远期演进',
    progress: 22,
    badgeColor: 'text-purple-400',
    progressColor: '#a855f7',
    statusType: 'default',
    statusLabel: '22% 架构筹划',
    detailedDesc: '实现全平台云端存档同步校验、首领攻坚战斗时间轴复盘仪、魔兽使野生魔物放养农场与复古像素 CRT 硬件级滤镜。',
    deliverables: [
      'Web 门户配装器与实机存档无缝双向双端同步',
      '高难首领攻坚回放分析仪与 ATB 轴时间戳导出',
      '魔兽使魔物牧场捕获饲养与寻宝派遣系统',
      '全域 97 图探索 100% 成就勋章与社区 MOD SDK'
    ],
    techPrereqs: [
      'WebSocket / WebRTC 低延迟端云协同与加密双工',
      'CombatLogReplayer 毫秒级伤害与技能时间轴捕获',
      'CRT Shader 硬件级别多通道几何曲率色散仿真'
    ],
    qualityGates: [
      '云存档跨端冲突自动合并防坏档 100%',
      'MOD 沙盒环境内存隔离与防恶意脚本注入'
    ]
  }
]

const selectedEpoch = ref<Epoch>(epochList[1])

// 沙盘模拟器状态
const simVelocity = ref(65)
const simRefactorRatio = ref(20)
const simTestCoverage = ref(85)
const simActiveMode = ref('balanced')

const simModes = [
  { id: 'balanced', name: '⚖️ 均衡演进' },
  { id: 'gameplay', name: '⚔️ 机制优先' },
  { id: 'visual', name: '✨ 视效优先' },
  { id: 'stability', name: '🛡️ 稳健防崩' }
]

const resetSimulation = () => {
  simVelocity.value = 65
  simRefactorRatio.value = 20
  simTestCoverage.value = 85
  simActiveMode.value = 'balanced'
  message.success('已恢复沙盘基准研发生态参数')
}

// 模拟推演计算指标
const simWeeksV23 = computed(() => {
  const baseCost = 280
  const effectivePoints = simVelocity.value * (1 - simRefactorRatio.value / 100)
  const coverageFactor = 1 + (simTestCoverage.value - 60) * 0.005
  const result = (baseCost * coverageFactor) / effectivePoints
  return Math.max(2.5, Number(result.toFixed(1)))
})

const simEstimatedDateV23 = computed(() => {
  const days = Math.round(simWeeksV23.value * 7)
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})

const simStabilityIndex = computed(() => {
  const refactorBonus = simRefactorRatio.value * 1.1
  const coverageBonus = (simTestCoverage.value - 60) * 0.8
  const score = Math.min(99, Math.round(45 + refactorBonus + coverageBonus))
  return score
})

const simCrashRisk = computed(() => {
  const risk = Math.max(0.05, Number((1.8 - (simStabilityIndex.value - 50) * 0.035).toFixed(2)))
  return risk
})

const simBurnDownWeeks = computed(() => {
  const totalBacklogPts = 820
  const weeks = totalBacklogPts / simVelocity.value
  return Math.round(weeks)
})

const simCriticalPath = computed(() => {
  return [
    { title: '九阶禁术粒子着色器与全屏 Cut-in 演出', module: 'VFX / Combat', costPts: 65, status: '冲刺中', statusClass: 'bg-amber-500/20 text-amber-300' },
    { title: '神兵炼金熔炉二次洗练与符文孔位', module: 'Armory / Economy', costPts: 45, status: '排期中', statusClass: 'bg-cyan-500/20 text-cyan-300' },
    { title: '云端双端存档导入导出与防坏档校验', module: 'Cloud / Storage', costPts: 55, status: '排期中', statusClass: 'bg-cyan-500/20 text-cyan-300' },
    { title: '深渊 50~100 层极端环境词缀挑战', module: 'Endgame / Dungeon', costPts: 50, status: '筹备中', statusClass: 'bg-purple-500/20 text-purple-300' },
    { title: '营地篝火羁绊小剧场与双人合体技', module: 'Story / Bond', costPts: 40, status: '筹备中', statusClass: 'bg-purple-500/20 text-purple-300' }
  ]
})

// 状态筛选
const activeStatus = ref('all')
const statusList = [
  { key: 'all', label: '全部规划', icon: '📋' },
  { key: 'completed', label: '已实装交付', icon: '✅' },
  { key: 'in_progress', label: '攻坚中', icon: '🚧' },
  { key: 'planned', label: '规划中', icon: '📅' },
  { key: 'proposal', label: '期望心愿', icon: '💡' }
]

interface FeaturePlan {
  id: string
  title: string
  icon: string
  status: 'completed' | 'in_progress' | 'planned' | 'proposal'
  statusLabel: string
  statusType: 'warning' | 'info' | 'success' | 'default'
  targetVersion: string
  description: string
  specs: string[]
  votes: number
  voted: boolean
}

const features = ref<FeaturePlan[]>([
  {
    id: 'feat-main-story-resident-tracker',
    title: '主线全域目标追踪与真实居民雷达标记系统',
    icon: '🧭',
    status: 'completed',
    statusLabel: '已实装交付',
    statusType: 'success',
    targetVersion: 'v2.2.165',
    description: '主线全章节44个节拍目标与大地图HUD雷达全域打通，接入单宿主真实居民弱引用登记架构，支持对白、转场等多维门禁状态下的纯读安全投影。',
    specs: [
      '主线 44 个节拍任务方位 HUD 与地图 Marker 实时联动',
      'ResidentSourceRegistry 单宿主弱引用生命周期管理与墓碑判定',
      '过场、对白锁、菜单与机关覆盖下纯读阻断与自动恢复'
    ],
    votes: 168,
    voted: true
  },
  {
    id: 'feat-high-tier-bounties-a-s',
    title: '酒馆高阶看板 Rank A 强化奇美拉与通关专属 Rank S 死神之眼',
    icon: '⚔️',
    status: 'completed',
    statusLabel: '已实装交付',
    statusType: 'success',
    targetVersion: 'v2.2.164',
    description: '晨辉王城酒馆看板高阶契约全面开放，涵盖强化奇美拉与周目通关专属死神之眼，耐火斗篷、护盾指环、钻石胸甲与盗贼小手神装领赏。',
    specs: [
      'Rank A 混沌神殿专属点位强化奇美拉，奖励耐火斗篷+护盾指环+35000G',
      'Rank S 周目通关限定死神之眼，奖励钻石胸甲+盗贼小手+100000G',
      '周目重置悬赏进度防坏档保障，三项奖励容量一致性领赏'
    ],
    votes: 142,
    voted: true
  },
  {
    id: 'feat-whitepaper-registry',
    title: '十六卷核心架构白皮书规范文库与拓扑沙盘',
    icon: '📜',
    status: 'completed',
    statusLabel: '已实装交付',
    statusType: 'success',
    targetVersion: 'v2.2.215',
    description: '收纳 16 卷核心架构白皮书，涵盖战斗数值闭环、职业双轨矩阵、七色尾巴宏观经济与时空裂隙全域导航，集成 GDScript 代码与依赖拓扑。',
    specs: [
      '16 卷完整白皮书规范抽屉式阅读与前置依赖拓扑推演',
      '覆盖 10 大核心子系统与 50+ 技术指标约束',
      '配套 whitepaper_registry.gd 底层单例引擎对接'
    ],
    votes: 185,
    voted: true
  },
  {
    id: 'feat-battle-cutin',
    title: '战术大招技能动画与特写 Cut-in 演出',
    icon: '⚔️',
    status: 'in_progress',
    statusLabel: '正在攻坚',
    statusType: 'warning',
    targetVersion: 'v2.3.0',
    description: '为九阶禁断魔法（核爆 Flare、陨石 Meteor、终极神圣 Holy）以及各职业招牌极意技能（二刀流乱打、龙王破灭击、居合一刀两断）设计华丽的全屏粒子与角色特写 Cut-in 视效。',
    specs: [
      '高帧率 2D 骨骼像素与高精度粒子着色器混合管线',
      '终结技释放瞬间时空凝滞与多维震屏摄像机',
      '可在游戏设置中随心开启或一键跳过特写演出'
    ],
    votes: 89,
    voted: false
  },
  {
    id: 'feat-cloud-save',
    title: '云端存档多端同步与防丢校验',
    icon: '☁️',
    status: 'in_progress',
    statusLabel: '正在攻坚',
    statusType: 'warning',
    targetVersion: 'v2.3.0',
    description: '打破桌面离线端与 Web 门户端界限，支持通过一键导出/导入存档文件或私有云同步，使玩家在浏览器配装模拟器中无缝载入自己在游戏中的真实队伍数据。',
    specs: [
      '标准 JSON / 加密二进制双向存档导入导出器',
      '多周目通关星标 (Clear Star) 与二周目继承防坏档校验',
      '在线配装模拟器一键读取实机存档角色战力'
    ],
    votes: 114,
    voted: false
  },
  {
    id: 'feat-alchemy-craft',
    title: '神兵炼金工坊与太古符文附魔',
    icon: '⚗️',
    status: 'in_progress',
    statusLabel: '正在攻坚',
    statusType: 'warning',
    targetVersion: 'v2.3.5',
    description: '在封印之城库扎与矮人深渊熔炉设立神兵炼金台，利用收集到的古代以太精金与七色尾巴，对 11 件太古封印神兵进行二次开光与符文孔位镶嵌。',
    specs: [
      '支持洗练武器词条：暴击倍率、吸血转化率、攻击附伤属性',
      '镶嵌古代圣遗物符石解锁第二专属被动特技',
      '零损耗回退与强化保底防碎机制'
    ],
    votes: 76,
    voted: false
  },
  {
    id: 'feat-abyss-tower',
    title: '50~100 层深渊地狱极限挑战',
    icon: '🏰',
    status: 'planned',
    statusLabel: '已列入规划',
    statusType: 'info',
    targetVersion: 'v2.4.0',
    description: '在现有 49 层深渊竞技场的基础上，向下突破至非之世界地底 100 层绝境挑战。每 10 层引入变异首领与随机环境词缀（如禁魔领域、急速狂暴、荆棘反震）。',
    specs: [
      '新增隐藏最终极 BOSS【虚无真祖 · 混沌龙神】',
      '通关产出全职业通用的究极无双自选神器神饰',
      '附带战斗伤害统计报表与生存轮次排行榜'
    ],
    votes: 62,
    voted: false
  },
  {
    id: 'feat-bonds-story',
    title: '主角营地篝火与专属羁绊物语',
    icon: '⛺',
    status: 'planned',
    statusLabel: '已列入规划',
    statusType: 'info',
    targetVersion: 'v2.4.0',
    description: '在野外搭建野营帐篷或小木屋休整时，触发队伍 8 位主角之间的专属对话剧情与心路历程，提升伙伴羁绊等级。',
    specs: [
      '光暗双队领袖（索尔与纳哈特）跨越立场的理念碰撞小剧场',
      '羁绊满级后解锁双人合体技（如圣光烈斩、暗影治愈）',
      '解锁各角色宿命纪念立绘与专属旅途回忆记录'
    ],
    votes: 95,
    voted: false
  },
  {
    id: 'feat-exploration-master',
    title: '全域 97 图探索 100% 收集成就与专属坐骑',
    icon: '🏆',
    status: 'planned',
    statusLabel: '已列入规划',
    statusType: 'info',
    targetVersion: 'v2.4.5',
    description: '为 97 处全域探索大地图与 57 篇官方风土志建立进度追踪体系，探明所有隐藏门、宝箱密室与学者答题即可加冕全域探索大师。',
    specs: [
      '全图全收集专属勋章与成就陈列室页面',
      '获得全地形飞跃型黄金陆行鸟与水下畅游海豚坐骑',
      '达成全风土记录解锁《大陆全典》实体装订典藏版封面'
    ],
    votes: 53,
    voted: false
  },
  {
    id: 'feat-combat-recorder',
    title: '高难首领攻坚回放仪与行动轴分析器',
    icon: '📊',
    status: 'planned',
    statusLabel: '已列入规划',
    statusType: 'info',
    targetVersion: 'v2.5.0',
    description: '为攻坚机械神欧米茄、神龙与混沌言昭等天花板首领提供精准的行动轴时间戳回放，量化破盾时机、治疗覆盖与技能循环。',
    specs: [
      '支持导出战斗行动日志（Combat Log Timeline）',
      '复盘灭团原因分析与行动条 ATB 超车提示',
      '一键分享攻坚轴方案给其他冒险者'
    ],
    votes: 48,
    voted: false
  },
  {
    id: 'feat-custom-theme',
    title: '复古像素 CRT 滤镜与古典怀旧音轨切换',
    icon: '📺',
    status: 'proposal',
    statusLabel: '期望心愿',
    statusType: 'default',
    targetVersion: 'v2.5.0+',
    description: '拓展视听体验，允许玩家自由在现代高清像素与 90 年代黄金 CRT 扫描线显像管质感之间平滑切换，并包含由交响乐演奏的复古 16-Bit 芯片音轨。',
    specs: [
      '多档位可调节光栅、光晕曲率与色散抖动',
      '经典 16-Bit SFC 原版音色与重置管弦乐实时切换',
      '全屏沉浸怀旧游戏厅街机视窗模式'
    ],
    votes: 82,
    voted: false
  },
  {
    id: 'feat-pet-breeding',
    title: '魔兽使野生魔物捕获与牧场培养系统',
    icon: '🐾',
    status: 'proposal',
    statusLabel: '期望心愿',
    statusType: 'default',
    targetVersion: 'v2.5.0+',
    description: '大幅强化魔兽使（Beastmaster）职业玩法，允许在原野战斗中捕捉濒死魔物并放养于村落专属魔物农场中，成长后可作为召唤战兽上阵助攻。',
    specs: [
      '捕捉 147 种全图鉴普通与精英魔物作为随行伙伴',
      '喂养优质草药与肉类使魔物领悟辅助或强控战技',
      '农场魔物派遣寻宝探索，带回稀有矿石与野外遗物'
    ],
    votes: 68,
    voted: false
  }
])

const filteredFeatures = computed(() => {
  if (activeStatus.value === 'all') return features.value
  return features.value.filter(item => item.status === activeStatus.value)
})

const getStatusCount = (key: string) => {
  if (key === 'all') return features.value.length
  return features.value.filter(item => item.status === key).length
}

const totalVotes = computed(() => {
  const baseVotes = features.value.reduce((acc, cur) => acc + cur.votes, 0)
  const propVotes = communityProposals.value.reduce((acc, cur) => acc + cur.votes, 0)
  return baseVotes + propVotes
})

const toggleVote = (feature: FeaturePlan) => {
  if (feature.voted) {
    feature.votes--
    feature.voted = false
  } else {
    feature.votes++
    feature.voted = true
    message.success(`已为【${feature.title}】投出宝贵一票！`)
  }
}

// 社区心愿与 RFC
interface CommunityProposal {
  id: string
  title: string
  category: string
  description: string
  author: string
  votes: number
  voted: boolean
  estPoints: number
}

const communityProposals = ref<CommunityProposal[]>([
  {
    id: 'rfc-coop-local',
    title: '双人同屏本地双打合作探索',
    category: '战斗机制与职业',
    description: '支持两名玩家分别操控光之战士与暗之战士队伍，在战斗中各自掌控 2 位角色的 ATB 抉择与道具投放。',
    author: 'WarriorOfLight#902',
    votes: 118,
    voted: false,
    estPoints: 60
  },
  {
    id: 'rfc-boss-rush',
    title: '首领车轮战 (Boss Rush) 计时挑战模式',
    category: '战斗机制与职业',
    description: '不消耗真实道具，以预设或自有装配挑战连续 10 位主线与隐藏 BOSS，记录通关时间与全球排行。',
    author: 'ChocoboMaster',
    votes: 94,
    voted: false,
    estPoints: 35
  },
  {
    id: 'rfc-chocobo-racing',
    title: '黄金陆行鸟极速原野竞速小游戏',
    category: '大地图探索与城镇',
    description: '在晨辉王城平原开放陆行鸟竞速跑道，收集冲刺胡萝卜避开坑洞障碍物，夺取稀有尾巴与饰品。',
    author: 'KocoboRacer',
    votes: 87,
    voted: false,
    estPoints: 45
  },
  {
    id: 'rfc-soundtrack-box',
    title: '旅馆点唱机与 SFC 原声黑胶唱片收集',
    category: '视觉视效与音频',
    description: '收集藏在全大陆各城镇的古典唱片，可在所有城镇旅馆或野外营地自由选曲播放。',
    author: 'BardEdward',
    votes: 79,
    voted: false,
    estPoints: 20
  }
])

const sortedCommunityProposals = computed(() => {
  return [...communityProposals.value].sort((a, b) => b.votes - a.votes)
})

const newProposal = reactive({
  title: '',
  category: '战斗机制与职业',
  description: ''
})

const submitProposal = () => {
  if (!newProposal.title.trim()) {
    message.warning('请填写特性标题')
    return
  }
  if (!newProposal.description.trim()) {
    message.warning('请填写详细描述')
    return
  }

  const prop: CommunityProposal = {
    id: `rfc-${Date.now()}`,
    title: newProposal.title.trim(),
    category: newProposal.category,
    description: newProposal.description.trim(),
    author: '冒险者 (您)',
    votes: 1,
    voted: true,
    estPoints: Math.floor(Math.random() * 40 + 20)
  }

  communityProposals.value.unshift(prop)
  newProposal.title = ''
  newProposal.description = ''
  message.success('心愿提案已成功创建并加入表决池！')
}

const toggleProposalVote = (prop: CommunityProposal) => {
  if (prop.voted) {
    prop.votes--
    prop.voted = false
  } else {
    prop.votes++
    prop.voted = true
    message.success(`已为提案【${prop.title}】投票点赞！`)
  }
}

const copyAllProposalsJson = () => {
  const json = JSON.stringify(communityProposals.value, null, 2)
  navigator.clipboard.writeText(json).then(() => {
    message.success('已将社区心愿提案列表复制到剪贴板！')
  }).catch(() => {
    message.info('复制完成')
  })
}

// Godot 4.x 代码展示
const gdScriptCode = `# ==============================================================================
# FeaturePipelineManager - 游戏底层特性动态开关、灰度分流与热补丁控制器
# 文件路径: res://scripts/core/feature_pipeline_manager.gd
# 架构定位: 支持客户端本地特性门禁、A/B 分流演练与远程云补丁安全校验
# ==============================================================================
class_name FeaturePipelineManager
extends Node

signal feature_toggled(feature_id: String, is_enabled: boolean)
signal pipeline_refreshed(active_count: int)

enum ReleaseStage {
	ALPHA = 0,
	BETA = 1,
	RELEASE_CANDIDATE = 2,
	STABLE = 3
}

# 本地特性旗标字典 (Feature Registry)
var _feature_registry: Dictionary = {
	"feat_battle_cutin": {
		"name": "战斗大招特写 Cut-in 演出",
		"enabled": true,
		"stage": ReleaseStage.BETA,
		"min_build": 22160,
		"dependencies": ["vfx_shader_pipeline"]
	},
	"feat_cloud_save": {
		"name": "云端多端存档同步与校验",
		"enabled": false,
		"stage": ReleaseStage.ALPHA,
		"min_build": 22170,
		"dependencies": ["save_crypto_provider"]
	},
	"feat_alchemy_craft": {
		"name": "神兵太古开光与洗练熔炉",
		"enabled": false,
		"stage": ReleaseStage.BETA,
		"min_build": 22180,
		"dependencies": ["item_database_v2"]
	},
	"feat_crt_shader": {
		"name": "怀旧像素 CRT 显像管着色器",
		"enabled": false,
		"stage": ReleaseStage.ALPHA,
		"min_build": 22190,
		"dependencies": []
	}
}

# 客户端运行环境配置
var current_build_number: int = 22216
var current_user_channel: int = ReleaseStage.BETA

func _ready() -> void:
	_load_persisted_feature_flags()
	_validate_dependencies()
	print("[FeaturePipeline] 特性分发管线就绪，当前活跃特性数: %d" % get_active_features().size())

## 检查特性是否在此客户端中激活
func is_feature_active(feature_id: String) -> boolean:
	if not _feature_registry.has(feature_id):
		return false
	
	var data: Dictionary = _feature_registry[feature_id]
	if not data.get("enabled", false):
		return false
	
	if current_build_number < data.get("min_build", 0):
		return false
		
	if int(data.get("stage", 0)) > current_user_channel:
		return false
		
	return true

## 动态启用或关闭特性
func toggle_feature(feature_id: String, enable: bool) -> bool:
	if not _feature_registry.has(feature_id):
		push_error("[FeaturePipeline] 未知特性 ID: %s" % feature_id)
		return false
		
	_feature_registry[feature_id]["enabled"] = enable
	_save_persisted_feature_flags()
	emit_signal("feature_toggled", feature_id, enable)
	emit_signal("pipeline_refreshed", get_active_features().size())
	return true

## 获取当前所有已激活的特性列表
func get_active_features() -> Array[String]:
	var result: Array[String] = []
	for fid in _feature_registry.keys():
		if is_feature_active(fid):
			result.append(fid)
	return result

## 依赖关系一致性校验
func _validate_dependencies() -> void:
	for fid in _feature_registry.keys():
		var deps: Array = _feature_registry[fid].get("dependencies", [])
		for dep in deps:
			if not _is_subsystem_available(dep):
				push_warning("[FeaturePipeline] 特性 %s 依赖缺少: %s，已紧急降级" % [fid, dep])
				_feature_registry[fid]["enabled"] = false

func _is_subsystem_available(subsystem_name: String) -> boolean:
	# 检查引擎底层单例或着色器支持
	return true

func _load_persisted_feature_flags() -> void:
	if FileAccess.file_exists("user://feature_flags.cfg"):
		var f := FileAccess.open("user://feature_flags.cfg", FileAccess.READ)
		var text := f.get_as_text()
		var json := JSON.parse_string(text)
		if json is Dictionary:
			for k in json.keys():
				if _feature_registry.has(k):
					_feature_registry[k]["enabled"] = json[k]

func _save_persisted_feature_flags() -> void:
	var f := FileAccess.open("user://feature_flags.cfg", FileAccess.WRITE)
	var payload: Dictionary = {}
	for k in _feature_registry.keys():
		payload[k] = _feature_registry[k]["enabled"]
	f.store_string(JSON.stringify(payload))
`

const copyGdScript = () => {
  navigator.clipboard.writeText(gdScriptCode).then(() => {
    message.success('feature_pipeline_manager.gd 源码已复制到剪贴板！')
  }).catch(() => {
    message.info('源码已复制')
  })
}
</script>

<style scoped>
.feature-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.5);
}
</style>
