<template>
  <div class="monsters-page p-3 sm:p-5 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="warning" size="small" round class="mb-2">VBLE Bestiary & Ecological Evolution Matrix v2.2.260</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-amber mb-2">👾 全域魔物与首领大图鉴</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm mb-2">
        门户目录收录 {{ normalCount }} 种原野常规怪、{{ bossCount }} 种剧情守关首领、以及 {{ coliseumCount }} 种斗技场霸主，全生态链演化与基因突变环境沙盘
      </p>
      <div class="flex justify-center gap-2">
        <n-button size="tiny" type="warning" secondary @click="scrollToEcologyStudio">
          🌿 前往生态演化与基因突变工坊
        </n-button>
      </div>
    </div>

    <!-- 已击败首领全域游荡遭遇与强度缩放测算工作台 (基于桌面 Godot roaming_boss_rules.json 实机规范) -->
    <div class="bg-gradient-to-br from-[#121626]/95 via-[#1a1c33]/90 to-[#0e1424]/95 border border-amber-500/40 p-4 sm:p-5 rounded-2xl shadow-2xl space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl">⚡</span>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-bold text-amber-300">首领全域游荡遭遇与强度缩放工作台 (Roaming Boss Studio)</h2>
              <n-tag size="tiny" type="warning" round>Godot 实机规则对齐</n-tag>
            </div>
            <p class="text-xs text-gray-400">基于 <code>roaming_boss_rules.json</code>：已击败首领可在已解锁地区遭遇，属性与奖励按原模板无损一次性缩放（严禁递推叠乘）</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="tiny" secondary :type="showRoamingStudio ? 'warning' : 'default'" @click="showRoamingStudio = !showRoamingStudio">
            {{ showRoamingStudio ? '收起测算台 ⌃' : '展开测算台 ⌄' }}
          </n-button>
        </div>
      </div>

      <div v-show="showRoamingStudio" class="space-y-4">
        <!-- 控制面板 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          <!-- 选择首领 -->
          <div>
            <label class="text-xs font-bold text-gray-300 block mb-1.5">🎯 目标首领模板:</label>
            <n-select
              v-model:value="selectedRoamingBossId"
              :options="roamingBossOptions"
              size="small"
            />
            <div class="text-[10px] text-gray-500 mt-1 flex items-center justify-between">
              <span>基准等级: Lv.{{ selectedRoamingBoss.baseLevel }}</span>
              <span>出没: {{ selectedRoamingBoss.location }}</span>
            </div>
          </div>

          <!-- 地区等级基准 -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-bold text-gray-300">🗺️ 遭遇地区最低等级:</label>
              <span class="text-xs font-mono font-bold text-amber-400">Lv.{{ areaMinLevel }}</span>
            </div>
            <n-slider v-model:value="areaMinLevel" :min="1" :max="80" :step="1" />
            <div class="text-[10px] text-gray-500 mt-1">区域下限等级区间 (1~80)</div>
          </div>

          <!-- 首领加成等级 -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-bold text-gray-300">🎖️ 首领浮动加成 (level_bonus):</label>
              <span class="text-xs font-mono font-bold text-cyan-400">+{{ roamingBonusLevel }} 级</span>
            </div>
            <n-slider v-model:value="roamingBonusLevel" :min="3" :max="5" :step="1" />
            <div class="text-[10px] text-gray-500 mt-1">规范常数 [3, 5] 随机浮动</div>
          </div>

          <!-- 漫游行走步数/像素 -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-bold text-gray-300">🚶 漫游行走步长 (像素):</label>
              <span class="text-xs font-mono font-bold text-emerald-400">{{ travelPixels }} px</span>
            </div>
            <n-slider v-model:value="travelPixels" :min="0" :max="5120" :step="320" />
            <div class="text-[10px] text-gray-500 mt-1">每 640px 触发 25% 概率检定</div>
          </div>
        </div>

        <!-- 动态测算指标面板 -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <!-- 判定概率 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center">
            <div class="text-[10px] text-gray-400">遭遇检定 / 综合概率</div>
            <div class="text-base font-extrabold text-amber-300 font-mono my-0.5">{{ roamingRolls }} 次 / {{ roamingEncounterRate.toFixed(1) }}%</div>
            <div class="text-[10px] text-gray-500">25% 每 640px</div>
          </div>

          <!-- 缩放等级 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-center">
            <div class="text-[10px] text-gray-400">动态生成等级 (Level)</div>
            <div class="text-base font-extrabold text-cyan-300 font-mono my-0.5">Lv.{{ scaledBossStats.level }}</div>
            <div class="text-[10px] text-gray-500">膨胀因子 ×{{ scaledBossStats.scaleMultiplier }}</div>
          </div>

          <!-- 动态生命值 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-rose-500/30 text-center">
            <div class="text-[10px] text-gray-400">缩放后 HP (1.3次幂)</div>
            <div class="text-base font-extrabold text-rose-300 font-mono my-0.5">{{ scaledBossStats.hp.toLocaleString() }}</div>
            <div class="text-[10px] text-gray-500">原基准: {{ selectedRoamingBoss.baseHp }}</div>
          </div>

          <!-- 动态速度 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-center">
            <div class="text-[10px] text-gray-400">行动速度 (0.35次幂)</div>
            <div class="text-base font-extrabold text-emerald-300 font-mono my-0.5">{{ scaledBossStats.speed }}</div>
            <div class="text-[10px] text-gray-500">原基准: {{ selectedRoamingBoss.baseSpeed }}</div>
          </div>

          <!-- 奖励 EXP / 金币 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-yellow-500/30 text-center">
            <div class="text-[10px] text-gray-400">战胜奖励 (1.3次幂)</div>
            <div class="text-xs font-bold text-yellow-300 font-mono my-0.5">{{ scaledBossStats.exp }} 经验 / {{ scaledBossStats.gold }}G</div>
            <div class="text-[10px] text-gray-500">AP 点数: +{{ scaledBossStats.ap }}</div>
          </div>

          <!-- 阵型伴生规模 -->
          <div class="p-3 rounded-xl bg-slate-950/80 border border-purple-500/30 text-center">
            <div class="text-[10px] text-gray-400">阵型编制与随从</div>
            <div class="text-xs font-bold text-purple-300 font-mono my-0.5">{{ scaledBossStats.bossCountRange }}</div>
            <div class="text-[10px] text-gray-500">{{ scaledBossStats.minionsRange }}</div>
          </div>
        </div>

        <!-- 架构硬核铁律条约 -->
        <div class="p-3 rounded-xl bg-amber-950/20 border border-amber-600/30 flex items-start gap-2 text-xs">
          <span class="text-amber-400 text-sm">⚠️</span>
          <div class="text-gray-300 space-y-1">
            <div class="font-bold text-amber-300">《Godot 实机引擎首领游荡遭遇规约 (roaming_boss_rules.json)》硬性铁律：</div>
            <div class="text-[11px] text-gray-400 leading-relaxed">
              1. <strong>非递推幂律守恒：</strong>所有属性计算必须强制从 <code>DataLoader</code> 原始 Boss JSON 数据源单向求值，绝对禁止将上一轮战后重现版本作为下一次缩放的乘数基数。<br>
              2. <strong>平滑填充基数 (Padding = 10)：</strong>使用 <code>(等级 + 10) / (基准等级 + 10)</code> 计算尺度因子，避免低级 Boss 在高层出现过激数值断层。<br>
              3. <strong>遭遇防卡死隔离：</strong>游荡遭遇属于野外特异性随机战，战斗失败允许在宿屋原存档恢复，不污染主线章节关键物语进度。
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 👾 魔物全息 AI 行动树、弱点抗性雷达与掉落物概率工坊 (Monster AI & Drop Probability Studio) -->
    <div class="bg-gradient-to-br from-[#121626]/95 via-[#1c1830]/90 to-[#0e1424]/95 border border-purple-500/50 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden">
      <!-- 头部与操作栏 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-900/40 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🧠</span>
            <h2 class="text-lg sm:text-xl font-black text-purple-300">
              魔物全息 AI 仇恨行动树、弱点抗性雷达与掉落物概率工坊 (Monster AI Studio)
            </h2>
            <n-tag size="small" type="error" round strong>AI 决策树</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            解密深渊魔物的核心逻辑：阶段转换血线、仇恨锁定规则、八元属性克制/吸收/反弹雷达，以及盗贼偷盗与战利品概率模拟！
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetAiStudio">
            🔄 重置推演参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="simulateAiRound">
            ⚡ 触发 AI 动作推演
          </n-button>
        </div>
      </div>

      <!-- 经典代表性首领/精英快速切换 -->
      <div class="space-y-1.5">
        <div class="text-xs font-bold text-gray-400 flex items-center gap-1.5">
          <span>🎯</span> 选定受测魔物标本 (Target Monster Prototype):
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="proto in monsterAiPrototypes"
            :key="proto.id"
            type="button"
            class="px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-1.5 select-none"
            :class="selectedAiProtoId === proto.id
              ? 'bg-purple-900/60 border-purple-400 text-purple-200 font-black shadow-lg shadow-purple-600/30'
              : 'bg-slate-900/80 border-slate-800 text-gray-300 hover:border-slate-700 hover:bg-slate-850'"
            @click="selectAiProto(proto.id)"
          >
            <span>{{ proto.icon }}</span>
            <span>{{ proto.name }}</span>
            <n-tag size="tiny" :type="proto.rankTag" round>{{ proto.rank }}</n-tag>
          </button>
        </div>
      </div>

      <!-- 三大核心工坊面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 栏 1: AI 行动树与仇恨决策模型 -->
        <div class="lg:col-span-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-purple-300 flex items-center gap-1.5">
                <span>🤖</span> AI 仇恨模型与血线阶段
              </span>
              <span class="text-gray-400 font-mono">{{ activeAiProto.aiType }}</span>
            </div>

            <!-- 当前推演 HP 阶段滑块 -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>魔物当前血线 (HP 阶段):</span>
                <span class="font-mono font-bold" :class="aiHpPct <= 25 ? 'text-rose-400' : aiHpPct <= 50 ? 'text-amber-400' : 'text-emerald-400'">
                  {{ aiHpPct }}% ({{ getHpPhaseName(aiHpPct) }})
                </span>
              </div>
              <n-slider v-model:value="aiHpPct" :min="1" :max="100" :step="5" />
            </div>

            <!-- 仇恨锁定策略选择 -->
            <div>
              <label class="text-[11px] text-gray-400 block mb-1">当前仇恨导向逻辑 (Aggro Target Target):</label>
              <n-select
                v-model:value="aiAggroMode"
                :options="aggroModeOptions"
                size="small"
              />
            </div>

            <!-- AI 预判下一步指令 -->
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <div class="text-[10px] text-purple-400 font-mono uppercase tracking-wider">AI 下一步行动预判</div>
              <div class="text-xs font-bold text-amber-300 flex items-center gap-1">
                <span>💥</span> {{ predictedAction.skill }}
              </div>
              <p class="text-[10px] text-gray-400 leading-relaxed">{{ predictedAction.desc }}</p>
            </div>
          </div>

          <div class="p-2 rounded bg-purple-950/20 border border-purple-900/30 text-[10px] text-purple-300">
            <strong>反击机制：</strong>{{ activeAiProto.counterRule }}
          </div>
        </div>

        <!-- 栏 2: 八元属性抗性雷达与战术对策建议 -->
        <div class="lg:col-span-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-cyan-300 flex items-center gap-1.5">
                <span>⚡</span> 八元属性偏振与克制雷达
              </span>
              <span class="text-gray-400 font-mono">Affinity Radar</span>
            </div>

            <!-- 8 大属性矩阵 -->
            <div class="grid grid-cols-4 gap-1.5 text-center">
              <div
                v-for="elem in activeAiProto.elements"
                :key="elem.name"
                class="p-1.5 rounded-lg border text-[11px] space-y-0.5"
                :class="getElementClass(elem.effect)"
              >
                <div class="font-bold">{{ elem.name }}</div>
                <div class="text-[10px] font-mono scale-90">{{ elem.effect }}</div>
              </div>
            </div>

            <!-- 专家战术对策建议 -->
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <div class="text-cyan-300 font-bold flex items-center gap-1">
                <span>🛡️</span> 黄金对策指南:
              </div>
              <div class="text-[11px] text-gray-300 space-y-1">
                <div>• <strong>最佳附魔推荐：</strong><span class="text-amber-300">{{ activeAiProto.bestSpellblade }}</span></div>
                <div>• <strong>最优召唤契约：</strong><span class="text-purple-300">{{ activeAiProto.bestSummon }}</span></div>
                <div>• <strong>严重禁忌规避：</strong><span class="text-rose-400">{{ activeAiProto.forbiddenWarning }}</span></div>
              </div>
            </div>
          </div>

          <div class="p-2 rounded bg-cyan-950/20 border border-cyan-900/30 text-[10px] text-cyan-300">
            <strong>状态免疫：</strong>{{ activeAiProto.statusImmunities.join('、') || '无' }}
          </div>
        </div>

        <!-- 栏 3: 盗贼偷盗与战利品掉落模拟器 -->
        <div class="lg:col-span-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-emerald-300 flex items-center gap-1.5">
                <span>💰</span> 盗贼偷盗与战利品掉落
              </span>
              <span class="text-gray-400 font-mono">Drop & Steal</span>
            </div>

            <!-- 掉落表条目 -->
            <div class="space-y-1.5 text-xs">
              <div class="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="font-bold text-gray-200">普通掉落: {{ activeAiProto.dropCommon.name }}</div>
                  <div class="text-[10px] text-gray-400">常规通关击杀后掉落</div>
                </div>
                <n-tag size="tiny" type="info">{{ activeAiProto.dropCommon.rate }}%</n-tag>
              </div>

              <div class="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="font-bold text-amber-300">稀有掉落: {{ activeAiProto.dropRare.name }}</div>
                  <div class="text-[10px] text-gray-400">神器级战利品</div>
                </div>
                <n-tag size="tiny" type="warning">{{ activeAiProto.dropRare.rate }}%</n-tag>
              </div>

              <div class="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="font-bold text-cyan-300">盗贼偷盗: {{ activeAiProto.stealItem.name }}</div>
                  <div class="text-[10px] text-gray-400">受盗贼护腕 1.5x 加权</div>
                </div>
                <n-tag size="tiny" type="success">{{ activeAiProto.stealItem.rate }}%</n-tag>
              </div>
            </div>

            <!-- 模拟刷取按钮 -->
            <div class="flex items-center gap-2 pt-1">
              <n-button size="small" type="success" secondary block @click="simulateStealAction">
                🖐️ 进行 1 次盗贼偷盗
              </n-button>
              <n-button size="small" type="warning" secondary block @click="simulateBatchDrop">
                🎲 模拟 10 连战刷落
              </n-button>
            </div>
          </div>

          <!-- 模拟反馈日志 -->
          <div class="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-gray-300 leading-relaxed min-h-[36px] flex items-center">
            {{ lootSimFeedback }}
          </div>
        </div>
      </div>

      <!-- 实战单回合 AI 决策推演输出流 -->
      <div class="p-3.5 rounded-xl bg-slate-950/90 border border-purple-900/40 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-amber-400 text-base">⚡</span>
          <span class="font-bold text-purple-300">实战 AI 决策演练回响：</span>
          <span class="text-gray-200 font-mono">{{ aiCombatSimLog }}</span>
        </div>
        <div class="text-[11px] text-gray-500 font-mono">
          底层契约: monster_ai_combat_resolver.gd
        </div>
      </div>
    </div>

    <!-- 全域魔物生态食物链与基因变异演化沙盘 (v2.2.260) -->
    <div id="monster-ecology-studio" class="bg-gradient-to-br from-emerald-950/80 via-slate-900/90 to-cyan-950/80 border border-emerald-500/40 p-5 rounded-2xl shadow-2xl space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🌿</span>
            <h2 class="text-base sm:text-lg font-bold text-emerald-300">全域魔物生态食物链与基因变异演化沙盘 (Monster Ecology Studio)</h2>
          </div>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            基于 Lotka-Volterra 掠食者-被捕食者动力学与以太辐射突变方程，推演各大生态圈种群消长平衡、环境胁迫下的精英突变率与顶级霸主王权确立。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-tag type="success" round size="small">食物链动力学</n-tag>
          <n-tag type="warning" round size="small">以太基因突变</n-tag>
          <n-tag type="info" round size="small">v2.2.260 规范</n-tag>
        </div>
      </div>

      <!-- 四大生态地质圈选择 -->
      <div class="space-y-2">
        <span class="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
          <span>🌍</span>
          <span>选择生态演化地理环境 (Ecological Biome Selection)</span>
        </span>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="biome in ecologicalBiomes"
            :key="biome.id"
            class="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 hover:scale-[1.01]"
            :class="selectedBiomeId === biome.id ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/50' : 'border-slate-800 hover:border-slate-700'"
            @click="selectedBiomeId = biome.id"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-xs text-gray-100">{{ biome.name }}</span>
              <n-tag size="tiny" :type="biome.tagType">{{ biome.climate }}</n-tag>
            </div>
            <p class="text-[10px] text-gray-400 leading-snug line-clamp-2 mt-1">{{ biome.description }}</p>
            <div class="mt-2 text-[9px] font-mono text-emerald-300 flex flex-col gap-0.5">
              <span>🐺 顶层掠食: {{ biome.predator }}</span>
              <span>🐰 基底食物: {{ biome.prey }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 环境参数调节与生态控制面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 以太与环境胁迫参数 -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3.5">
          <span class="text-xs font-bold text-emerald-300 block flex items-center gap-1.5">
            <span>⚙️</span>
            <span>生态环境参数调节 (Biotic Factors)</span>
          </span>

          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-400">地脉以太浓度 (Aether Density):</span>
                <span class="font-mono font-bold text-emerald-300">{{ aetherDensity }}%</span>
              </div>
              <input
                v-model.number="aetherDensity"
                type="range"
                min="10"
                max="100"
                step="5"
                class="w-full accent-emerald-400 cursor-pointer"
              />
              <div class="flex justify-between text-[9px] text-gray-500 font-mono mt-0.5">
                <span>10% (以太枯竭)</span>
                <span>50% (自然温带)</span>
                <span>100% (灵潮爆发)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-400">掠食淘汰压强 (Predation Pressure):</span>
                <span class="font-mono font-bold text-cyan-300">{{ predationPressure.toFixed(1) }}x</span>
              </div>
              <input
                v-model.number="predationPressure"
                type="range"
                min="1.0"
                max="5.0"
                step="0.2"
                class="w-full accent-cyan-400 cursor-pointer"
              />
              <div class="flex justify-between text-[9px] text-gray-500 font-mono mt-0.5">
                <span>1.0x (温和共生)</span>
                <span>3.0x (残酷生存)</span>
                <span>5.0x (极端灭绝)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-400">基因变异诱导率 (Mutation Inducer):</span>
                <span class="font-mono font-bold text-amber-300">{{ mutationFactor }}%</span>
              </div>
              <input
                v-model.number="mutationFactor"
                type="range"
                min="0"
                max="100"
                step="5"
                class="w-full accent-amber-400 cursor-pointer"
              />
              <div class="flex justify-between text-[9px] text-gray-500 font-mono mt-0.5">
                <span>0% (原种稳定)</span>
                <span>40% (亚种分化)</span>
                <span>100% (神化突变)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 2: 顶级霸主生态位选派 -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3.5">
          <span class="text-xs font-bold text-cyan-300 block flex items-center gap-1.5">
            <span>👑</span>
            <span>顶级霸主领主生态位 (Apex Predator Niche)</span>
          </span>

          <div class="space-y-2.5">
            <div
              v-for="apex in apexPredators"
              :key="apex.id"
              class="p-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5"
              :class="selectedApexId === apex.id ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40' : 'border-slate-800 bg-slate-950 hover:border-slate-700'"
              @click="selectedApexId = apex.id"
            >
              <span class="text-2xl shrink-0 mt-0.5">{{ apex.icon }}</span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs text-gray-100">{{ apex.name }}</span>
                  <span class="text-[10px] text-cyan-300 font-mono">{{ apex.tier }}</span>
                </div>
                <p class="text-[10px] text-gray-400 mt-0.5 leading-snug">{{ apex.trait }}</p>
                <div class="flex items-center gap-2 mt-1 text-[9px] font-mono text-emerald-400">
                  <span>狂暴加成: +{{ apex.ferocityBonus }}%</span>
                  <span class="text-amber-400">战利提升: +{{ apex.lootBoost }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 3: 生态解算与演化推演遥测 -->
        <div class="p-4 rounded-xl bg-gradient-to-b from-slate-950 to-emerald-950/40 border border-emerald-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>生态演化实时测算</span>
              </span>
              <n-tag size="tiny" type="success">{{ currentBiome.name }}</n-tag>
            </div>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">生态系统承载力:</span>
                <span class="font-mono font-bold text-emerald-400">{{ calculatedCarryingCapacity.toLocaleString() }} 种群当量</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">种群平衡动态指数:</span>
                <span class="font-mono font-bold text-cyan-300">{{ calculatedEquilibriumIndex.toFixed(1) }}% (动态平衡)</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">精英变异诱发几率:</span>
                <span class="font-mono font-bold text-amber-300">{{ calculatedMutationRate.toFixed(1) }}% (变异活跃)</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">绝品战利品诱爆率:</span>
                <span class="font-mono font-bold text-purple-300">{{ calculatedRareDropRate.toFixed(2) }}%</span>
              </div>
            </div>

            <!-- 演化进度条 -->
            <div v-if="isEvolving" class="space-y-1 pt-1">
              <div class="flex justify-between text-[11px] text-emerald-300 font-mono">
                <span>{{ evolutionCurrentEpoch }}</span>
                <span>{{ evolutionProgress }}%</span>
              </div>
              <div class="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div class="bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400 h-2.5 transition-all duration-150" :style="{ width: `${evolutionProgress}%` }" />
              </div>
            </div>

            <!-- 演化日志流 -->
            <div class="p-2.5 rounded bg-slate-950/90 border border-slate-800 text-[11px] font-mono space-y-1 text-gray-300 max-h-24 overflow-y-auto">
              <div v-for="(log, idx) in evolutionLogs" :key="idx" class="text-gray-300 leading-snug">
                {{ log }}
              </div>
            </div>
          </div>

          <!-- 操作按钮组 -->
          <div class="space-y-2 pt-2">
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
              :disabled="isEvolving"
              @click="startEvolutionEpoch"
            >
              {{ isEvolving ? '🌱 生态纪元演化推演中...' : '🌱 启动生态演化与基因演进推演 (Run Evolution Epoch)' }}
            </button>

            <div class="flex gap-2">
              <button
                type="button"
                class="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-gray-300 border border-slate-700 transition-colors cursor-pointer"
                @click="copyEcologyConfig"
              >
                📋 复制生态数据
              </button>
              <button
                type="button"
                class="flex-1 py-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-800/60 text-xs text-emerald-300 border border-emerald-700/60 transition-colors cursor-pointer"
                @click="exportEcologyCert"
              >
                📄 导出生态认证
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 生态模拟引擎源码展台 -->
      <div class="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-base">📜</span>
            <span class="font-mono text-xs font-bold text-emerald-300">res://scripts/combat/monster_ecology_simulator.gd</span>
          </div>
          <n-tag type="success" size="tiny" round>Godot 4.6 LTS Ecology Core</n-tag>
        </div>
        <pre class="p-3.5 rounded-lg bg-slate-950 border border-slate-900 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">{{ gdEcologySimulatorCode }}</pre>
      </div>
    </div>

    <!-- 顶部状态栏与类型切换 -->
    <div class="bg-[#121626]/90 border border-slate-700/60 p-4 rounded-2xl shadow-xl space-y-4">
      <!-- 主分类 Tab -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <n-tabs class="monsters-category-tabs" @focusin="revealCategoryTab" v-model:value="activeCategoryTab" type="segment" size="small" style="max-width: 720px;">
          <n-tab-pane name="all">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'all'">
                {{ `🌟 全部魔物 (${allMonsters.length})` }}
              </button>
            </template>
          </n-tab-pane>
          <n-tab-pane name="normal">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'normal'">
                {{ `🐺 原野常规怪 (${normalCount})` }}
              </button>
            </template>
          </n-tab-pane>
          <n-tab-pane name="boss">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'boss'">
                {{ `👑 剧情守关Boss (${bossCount})` }}
              </button>
            </template>
          </n-tab-pane>
          <n-tab-pane name="coliseum">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'coliseum'">
                {{ `🌌 斗技场霸主 (${coliseumCount})` }}
              </button>
            </template>
          </n-tab-pane>
          <n-tab-pane name="bounty">
            <template #tab>
              <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCategoryTab === 'bounty'">
                {{ `🎯 酒馆悬赏猎物 (${bountyCount})` }}
              </button>
            </template>
          </n-tab-pane>
        </n-tabs>

        <!-- 视图切换 (卡片 / 表格) -->
        <div class="flex items-center gap-2">
          <n-button
            size="tiny"
            :type="viewMode === 'grid' ? 'primary' : 'default'"
            secondary
            @click="viewMode = 'grid'"
          >
            🔲 卡片视图
          </n-button>
          <n-button
            size="tiny"
            :type="viewMode === 'table' ? 'primary' : 'default'"
            secondary
            @click="viewMode = 'table'"
          >
            📋 表格视图
          </n-button>
        </div>
      </div>

      <!-- 快捷搜索与多维过滤 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <!-- 搜索框 -->
        <div>
          <label class="text-[11px] text-gray-400 block mb-1">搜索魔物名称 / 技能 / 掉落:</label>
          <n-input
            v-model:value="searchKeyword"
            placeholder="如: 狼、毒蜂、提亚马特、长剑..."
            size="small"
            clearable
          >
            <template #prefix>🔍</template>
          </n-input>
        </div>

        <!-- 种族筛选 -->
        <div>
          <label class="text-[11px] text-gray-400 block mb-1">种族分类筛选:</label>
          <n-select
            v-model:value="selectedRace"
            :options="raceOptions"
            size="small"
            placeholder="全部种族"
          />
        </div>

        <!-- 区域筛选 -->
        <div>
          <label class="text-[11px] text-gray-400 block mb-1">出没区域 / 场景筛选:</label>
          <n-select
            v-model:value="selectedLocation"
            :options="locationOptions"
            size="small"
            placeholder="全部出没区域"
          />
        </div>

        <!-- 排序方式 -->
        <div>
          <label class="text-[11px] text-gray-400 block mb-1">排序方式:</label>
          <n-select
            v-model:value="sortBy"
            :options="sortOptions"
            size="small"
          />
        </div>
      </div>

      <!-- 当前筛选状态统计 -->
      <div class="flex flex-wrap items-center justify-between text-xs text-gray-400 pt-1">
        <div>
          筛选匹配：<span class="text-amber-400 font-bold font-mono">{{ filteredMonsters.length }}</span> / 全部 {{ allMonsters.length }} 种；本页 {{ paginatedMonsters.length }} 种
        </div>
        <div class="flex gap-2">
          <n-button size="tiny" tertiary @click="resetFilters">重置筛选</n-button>
        </div>
      </div>
    </div>

    <!-- ================= 视图一：卡片视图 (Grid Cards) ================= -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="m in paginatedMonsters"
        :key="m.id"
        class="bg-[#121626]/90 border border-slate-800 hover:border-amber-500/60 transition-all rounded-xl p-4 shadow-lg flex flex-col justify-between cursor-pointer hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
        role="button"
        tabindex="0"
        :aria-label="`查看${m.name}详情`"
        @click="openMonsterDetail(m)"
        @keydown.enter.self.prevent="!$event.repeat && openMonsterDetail(m)"
        @keydown.space.self.prevent="!$event.repeat && openMonsterDetail(m)"
      >
        <div>
          <!-- 头部：名称 + 等级 + Rank徽章 -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-bold text-gray-100 text-base">{{ m.name }}</span>
                <n-tag
                  size="tiny"
                  :type="m.rank === 'boss' ? 'error' : m.rank === 'coliseum' ? 'warning' : 'info'"
                >
                  {{ m.rankText || (m.rank === 'boss' ? 'BOSS' : '普通') }}
                </n-tag>
                <n-tag
                  v-if="isBountyTarget(m)"
                  size="tiny"
                  type="warning"
                  round
                >
                  🎯 {{ getBountyRank(m) }}
                </n-tag>
              </div>
              <div class="text-[11px] text-gray-500 font-mono">ID: {{ m.id }}</div>
            </div>
            <div class="text-right">
              <span class="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-600/30">
                Lv. {{ m.level }}
              </span>
            </div>
          </div>

          <!-- 核心属性栏 (HP / MP / ATK / DEF) -->
          <div class="grid grid-cols-4 gap-1.5 bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 text-center mb-3">
            <div>
              <div class="text-[10px] text-gray-400">生命 HP</div>
              <div class="text-xs font-bold text-emerald-400 font-mono">{{ m.hp }}</div>
            </div>
            <div>
              <div class="text-[10px] text-gray-400">魔力 MP</div>
              <div class="text-xs font-bold text-cyan-400 font-mono">{{ m.mp }}</div>
            </div>
            <div>
              <div class="text-[10px] text-gray-400">物攻 ATK</div>
              <div class="text-xs font-bold text-amber-400 font-mono">{{ m.attack }}</div>
            </div>
            <div>
              <div class="text-[10px] text-gray-400">物防 DEF</div>
              <div class="text-xs font-bold text-blue-400 font-mono">{{ m.defense }}</div>
            </div>
          </div>

          <!-- 种族与出没区域 -->
          <div class="space-y-1 text-xs mb-3">
            <div class="flex items-center justify-between text-gray-400 text-[11px]">
              <span>种族归属:</span>
              <span class="text-gray-300 font-medium">{{ m.raceText || m.race }}</span>
            </div>
            <div class="flex items-center justify-between text-gray-400 text-[11px]">
              <span>出没场景:</span>
              <span class="text-cyan-300 truncate max-w-[180px]">{{ m.location }}</span>
            </div>
            <div class="flex items-center justify-between text-gray-400 text-[11px]">
              <span>克制弱点:</span>
              <span class="text-rose-400 font-medium">{{ m.weakness || '无弱点' }}</span>
            </div>
          </div>

          <!-- 常用技能标签 -->
          <div v-if="m.skills && m.skills.length" class="mb-3">
            <div class="text-[10px] text-gray-400 mb-1">主要特技 / 行为:</div>
            <div class="flex flex-wrap gap-1">
              <n-tag
                v-for="(skill, sIdx) in m.skills.slice(0, 3)"
                :key="sIdx"
                size="tiny"
                type="default"
              >
                ⚡ {{ skill }}
              </n-tag>
              <n-tag v-if="m.skills.length > 3" size="tiny" tertiary>
                +{{ m.skills.length - 3 }}
              </n-tag>
            </div>
          </div>
        </div>

        <!-- 卡片底部：掉落物品与经验金币 -->
        <div class="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[11px] text-gray-400">
          <div class="truncate max-w-[180px]">
            <span>🎁 掉落: </span>
            <span v-if="m.drops && m.drops.length" class="text-gray-300">
              {{ m.drops.map((d: any) => d.name).join('、') }}
            </span>
            <span v-else class="text-gray-500">无掉落</span>
          </div>
          <div class="text-right text-[10px] text-amber-500 font-mono shrink-0">
            EXP {{ m.exp }} / {{ m.gold }}G
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 视图二：表格视图 (Data Table) ================= -->
    <div v-else class="bg-[#121626]/90 border border-slate-700/60 rounded-xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-gray-300 border-collapse">
          <thead>
            <tr class="bg-slate-900/90 border-b border-slate-800 text-gray-400 text-[11px]">
              <th class="p-3">名称 / ID</th>
              <th class="p-3">类别</th>
              <th class="p-3">等级</th>
              <th class="p-3">生命值 HP</th>
              <th class="p-3">魔力 MP</th>
              <th class="p-3">攻击/防御</th>
              <th class="p-3">魔攻/魔防</th>
              <th class="p-3">速度</th>
              <th class="p-3">弱点</th>
              <th class="p-3">出没场景</th>
              <th class="p-3">掉落物</th>
              <th class="p-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="m in paginatedMonsters"
              :key="m.id"
              class="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors"
            >
              <td class="p-3 font-semibold text-gray-100">
                <div>{{ m.name }}</div>
                <div class="text-[10px] text-gray-500 font-mono">{{ m.id }}</div>
              </td>
              <td class="p-3">
                <div class="flex items-center gap-1 flex-wrap">
                  <n-tag size="tiny" :type="m.rank === 'boss' ? 'error' : m.rank === 'coliseum' ? 'warning' : 'info'">
                    {{ m.rankText || m.rank }}
                  </n-tag>
                  <n-tag v-if="isBountyTarget(m)" size="tiny" type="warning" round>
                    🎯 {{ getBountyRank(m) }}
                  </n-tag>
                </div>
              </td>
              <td class="p-3 font-mono font-bold text-amber-400">Lv. {{ m.level }}</td>
              <td class="p-3 font-mono text-emerald-400 font-bold">{{ m.hp }}</td>
              <td class="p-3 font-mono text-cyan-400">{{ m.mp }}</td>
              <td class="p-3 font-mono">{{ m.attack }} / {{ m.defense }}</td>
              <td class="p-3 font-mono">{{ m.magic_attack || m.attack }} / {{ m.magic_defense || m.defense }}</td>
              <td class="p-3 font-mono">{{ m.speed }}</td>
              <td class="p-3 text-rose-400 font-medium">{{ m.weakness || '常规物攻' }}</td>
              <td class="p-3 text-gray-400 truncate max-w-[120px]">{{ m.location }}</td>
              <td class="p-3 text-gray-300">
                <span v-if="m.drops && m.drops.length">
                  {{ m.drops.map((d: any) => `${d.name} (${d.rate})`).join('、') }}
                </span>
                <span v-else class="text-gray-500">无</span>
              </td>
              <td class="p-3 text-right">
                <n-button size="tiny" type="primary" secondary @click="openMonsterDetail(m)">
                  详情
                </n-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 分页导航 -->
    <div
      v-if="filteredMonsters.length > 0"
      v-simple-page-label
      class="flex justify-center items-center py-4"
      @click.capture="captureSimplePaginationActivation"
      @click="preserveSimplePaginationFocus"
    >
      <n-pagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :item-count="total"
        :page-sizes="[12, 24, 36, 48]"
        show-size-picker
        show-quick-jumper
        :simple="isMobile"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      >
        <!-- 原生按钮补齐键盘访问，页码与边界仍由原分页器的点击冒泡处理。 -->
        <template #prev="{ page }">
          <button type="button" class="monsters-pagination-control" aria-label="上一页魔物图鉴" :disabled="page <= 1">‹</button>
        </template>
        <template #label="{ type, node, active }">
          <button
            v-if="type === 'page'"
            type="button"
            class="monsters-pagination-control"
            :aria-label="`魔物图鉴第 ${node} 页`"
            :aria-current="active ? 'page' : undefined"
          >{{ node }}</button>
          <component :is="node" v-else />
        </template>
        <template #next="{ page, pageCount }">
          <button type="button" class="monsters-pagination-control" aria-label="下一页魔物图鉴" :disabled="page >= pageCount">›</button>
        </template>
        <template #prefix="{ itemCount }">
          <span class="text-xs text-gray-400 hidden sm:inline">共 {{ itemCount }} 种魔物</span>
        </template>
      </n-pagination>
    </div>

    <!-- ================= 弹窗：怪物全息档案详情 (Holographic Modal) ================= -->
    <n-modal
      v-model:show="showDetailModal"
      preset="card"
      style="max-width: 680px;"
      class="bg-[#121626] border border-amber-500/40"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span class="text-xl">👾</span>
          <span class="font-bold text-amber-300">{{ activeMonster.name }} · 全息生态档案</span>
          <n-tag size="tiny" :type="activeMonster.rank === 'boss' ? 'error' : 'info'">
            {{ activeMonster.rankText || activeMonster.rank }}
          </n-tag>
        </div>
      </template>

      <div v-if="activeMonster.id" class="space-y-4">
        <!-- 头部概览 -->
        <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs text-gray-400">系统编号: <span class="font-mono text-gray-200">{{ activeMonster.id }}</span></div>
            <div class="text-xs text-gray-400">种族形态: <span class="text-cyan-300 font-bold">{{ activeMonster.raceText || activeMonster.race }}</span></div>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-400">综合危险评级</div>
            <div class="text-lg font-mono font-black text-amber-400">Lv. {{ activeMonster.level }}</div>
          </div>
        </div>

        <!-- 数值六维矩阵 -->
        <div>
          <h4 class="text-xs font-bold text-amber-400 mb-2">📊 核心战斗属性全景</h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">最大生命 HP</div>
              <div class="text-base font-bold text-emerald-400 font-mono">{{ activeMonster.hp }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">最大魔力 MP</div>
              <div class="text-base font-bold text-cyan-400 font-mono">{{ activeMonster.mp }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">物理攻击 ATK</div>
              <div class="text-base font-bold text-amber-400 font-mono">{{ activeMonster.attack }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">物理防御 DEF</div>
              <div class="text-base font-bold text-blue-400 font-mono">{{ activeMonster.defense }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">魔法攻击 MATK</div>
              <div class="text-base font-bold text-purple-400 font-mono">{{ activeMonster.magic_attack || activeMonster.attack }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">魔法防御 MDEF</div>
              <div class="text-base font-bold text-indigo-400 font-mono">{{ activeMonster.magic_defense || activeMonster.defense }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">敏捷速度 SPD</div>
              <div class="text-base font-bold text-amber-300 font-mono">{{ activeMonster.speed }}</div>
            </div>
            <div class="p-2 rounded bg-slate-900 border border-slate-800">
              <div class="text-[10px] text-gray-400">击破报酬 EXP/G</div>
              <div class="text-xs font-bold text-yellow-400 font-mono pt-1">{{ activeMonster.exp }} / {{ activeMonster.gold }}</div>
            </div>
          </div>
        </div>

        <!-- 物理承伤常驻因子与状态免疫透视 (对齐 Godot monster_physical_resistance.gd 与 monster_known_affinity.gd) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs">
          <div>
            <div class="text-[10px] text-gray-400">🛡️ 常驻物理承伤倍率 (monster_physical_resistance.gd)：</div>
            <div class="font-mono text-cyan-300 font-bold mt-0.5">
              {{ getPhysicalResistanceText(activeMonster) }}
            </div>
            <div class="text-[9px] text-gray-500 mt-0.5">只读已击败快照，负倍率钳至 0，不含临时防御增减</div>
          </div>
          <div>
            <div class="text-[10px] text-gray-400">⚡ 状态免疫与异常穿透 (monster_known_affinity.gd)：</div>
            <div class="font-mono text-amber-300 font-bold mt-0.5">
              {{ getStatusImmunitiesText(activeMonster) }}
            </div>
            <div class="text-[9px] text-gray-500 mt-0.5">星号通配按战斗含义翻译为「免疫：全部状态」，绝不暴露原星号</div>
          </div>
        </div>

        <!-- 酒馆高阶悬赏联查情报 -->
        <div v-if="isBountyTarget(activeMonster)" class="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <span class="text-amber-400 text-xs font-bold flex items-center gap-1.5">
              <span>🎯</span>
              <span>王城酒馆悬赏令情报：{{ getBountyRank(activeMonster) }}</span>
            </span>
            <n-tag size="tiny" type="warning" round>酒馆佣兵工会官方通缉</n-tag>
          </div>
          <p class="text-xs text-gray-300">
            该目标已由王城酒馆看板立项通缉。完成特定阶段前置讨伐后可接取，击破后前往酒馆领赏员处一次性领取高额金币与专属神兵防具。
          </p>
          <div class="flex flex-wrap gap-2 pt-1">
            <router-link to="/vble/boss-tactics">
              <n-button size="tiny" type="warning" secondary>🛡️ 查看首领攻坚战术</n-button>
            </router-link>
            <router-link to="/vble/sidequests">
              <n-button size="tiny" type="info" secondary>📜 查阅酒馆悬赏委托</n-button>
            </router-link>
          </div>
        </div>

        <!-- 弱点与战术克制策略 -->
        <div class="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
          <div class="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
            <span>🔥</span>
            <span>元素克制弱点与攻略指南:</span>
          </div>
          <p class="text-xs text-gray-200">
            该目标弱点为：<strong class="text-rose-300 font-mono">【{{ activeMonster.weakness || '常规物攻' }}】</strong>。
            建议战斗中配置针对弱点的魔法技能或对应属性魔剑附魔，可触发 2~3 倍克制暴击乘区。
          </p>
        </div>

        <!-- 特技出招与已知招式白名单 (Known Moves) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-xs font-bold text-amber-400">⚡ 专属特技与已知基础招式 (Known Moves)</h4>
            <span class="text-[10px] text-cyan-300 font-mono">已击败快照白名单</span>
          </div>
          <div class="space-y-1.5">
            <div
              v-for="(skill, idx) in activeMonster.skills"
              :key="idx"
              class="p-2.5 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold">⚔️ {{ skill }}</span>
                <span class="text-[10px] text-gray-400">序列 #{{ idx + 1 }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <n-tag size="tiny" :type="getSkillKindTag(skill)">
                  {{ getSkillKindLabel(skill) }}
                </n-tag>
                <span class="text-[10px] text-cyan-300">ATB 充能完毕释放</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 实机魔物图鉴独立招式全息面板 (MonsterKnownMovesView / KnownMovesButton) -->
        <div class="p-3 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/50 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>📖</span>
              <span>实机图鉴「基础招式记载」全息面板 (MonsterKnownMovesView)</span>
            </span>
            <n-tag size="tiny" type="warning" round>独占模态视窗</n-tag>
          </div>
          <p class="text-[11px] text-gray-300 leading-relaxed">
            实机怪物图鉴详情（<code>settings_encyclopedia.gd</code>）实装 <strong>【基础招式记载】</strong> 按钮与 <code>MonsterKnownMovesView</code> 全屏暗金面板。点击展开后独立滚动显示全部无条件基础招式，并具备安全遮罩、<code>ui_cancel</code> 快捷键返回与精准焦点恢复断路器。
          </p>
          <div class="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
            <div><strong class="text-gray-200">• 独占遮罩隔离：</strong>模态展开时隐藏底层卡片与导航，阻断旧按钮穿透。</div>
            <div><strong class="text-gray-200">• 票据与退役校验：</strong>换档或换周目即刻清空快照，杜绝把旧详情授给新档。</div>
          </div>
          <div class="pt-1 flex items-center justify-between">
            <span class="text-[10px] text-gray-500">仅展示每次行动可选基础项 (every: 1)，过滤阶段转换 AI</span>
            <n-button size="tiny" type="warning" secondary @click="showKnownMovesInnerModal = true">
              📖 打开【基础招式记载】全息面板 (MonsterKnownMovesView)
            </n-button>
          </div>
        </div>

        <!-- 掉落物清单 -->
        <div>
          <h4 class="text-xs font-bold text-amber-400 mb-2">🎁 战利品与掉落概率</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div
              v-for="(d, dIdx) in activeMonster.drops"
              :key="dIdx"
              class="p-2 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
            >
              <span class="text-gray-200 font-medium">{{ d.name }}</span>
              <span class="text-amber-400 font-mono font-bold">{{ d.rate }}</span>
            </div>
            <div v-if="!activeMonster.drops || !activeMonster.drops.length" class="text-xs text-gray-500 p-2">
              首领无常规掉落，击败直接推进主线成就。
            </div>
          </div>
        </div>
      </div>
    </n-modal>

    <!-- ================= 嵌套模态：MonsterKnownMovesView 独立只读招式面板 ================= -->
    <n-modal
      v-model:show="showKnownMovesInnerModal"
      preset="card"
      style="max-width: 620px;"
      class="bg-[#0b0e17] border border-amber-500/70 shadow-2xl"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span class="text-xl">📜</span>
          <span class="font-bold text-amber-300">{{ activeMonster.name }} · 已知基础招式记载</span>
          <n-tag size="tiny" type="warning">MonsterKnownMovesView</n-tag>
        </div>
      </template>

      <div class="space-y-4">
        <!-- 引擎权威告示 -->
        <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200/90 leading-relaxed">
          <strong>📜 引擎收录准则 (monster_known_moves.gd)：</strong><br>
          仅列本档收录配置中的无条件基础招式（<code>every == 1</code>）。不表示曾实际施放，不保证下一招、命中或最终伤害。
        </div>

        <!-- 4 类白名单快速过滤 Tab -->
        <div class="flex flex-wrap items-center gap-1.5 border-b border-slate-800 pb-2">
          <n-button
            size="tiny"
            :type="selectedMoveKindFilter === 'all' ? 'warning' : 'default'"
            secondary
            @click="selectedMoveKindFilter = 'all'"
          >
            全部招式 ({{ (activeMonster.skills || []).length }})
          </n-button>
          <n-button
            size="tiny"
            :type="selectedMoveKindFilter === 'physical' ? 'warning' : 'default'"
            secondary
            @click="selectedMoveKindFilter = 'physical'"
          >
            ⚔️ 物理招式 (physical)
          </n-button>
          <n-button
            size="tiny"
            :type="selectedMoveKindFilter === 'magic' ? 'warning' : 'default'"
            secondary
            @click="selectedMoveKindFilter = 'magic'"
          >
            ✨ 魔法招式 (magic)
          </n-button>
          <n-button
            size="tiny"
            :type="selectedMoveKindFilter === 'status' ? 'warning' : 'default'"
            secondary
            @click="selectedMoveKindFilter = 'status'"
          >
            🌀 状态招式 (status)
          </n-button>
          <n-button
            size="tiny"
            :type="selectedMoveKindFilter === 'mp_drain' ? 'warning' : 'default'"
            secondary
            @click="selectedMoveKindFilter = 'mp_drain'"
          >
            🧪 MP吸收 (mp_drain)
          </n-button>
        </div>

        <!-- 招式列表展示 -->
        <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          <div v-if="getKnownBaseMovesList.length === 0" class="text-center py-8 text-gray-500 text-xs">
            当前分类下暂无已收录的无条件基础招式
          </div>
          <div
            v-for="move in getKnownBaseMovesList"
            :key="move.name"
            class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
          >
            <div class="space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="font-bold text-amber-300">#{{ move.index }} {{ move.name }}</span>
                <n-tag size="tiny" :type="move.kind === 'magic' ? 'info' : move.kind === 'status' ? 'warning' : move.kind === 'mp_drain' ? 'success' : 'default'">
                  {{ move.kind_name }}
                </n-tag>
              </div>
              <div class="text-[10px] text-gray-400 font-mono">
                参数特征: {{ move.paramDesc }}
              </div>
            </div>
            <div class="text-right">
              <n-tag size="tiny" tertiary type="success">无条件基础项 (every: 1)</n-tag>
            </div>
          </div>
        </div>

        <!-- 底部返回按钮 (对齐 ReturnToDetail 焦点恢复断路器) -->
        <div class="pt-2 border-t border-slate-800 flex justify-end">
          <n-button type="primary" secondary size="small" @click="showKnownMovesInnerModal = false">
            ↩️ 返回当前详情 (ui_cancel 焦点恢复)
          </n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, type Directive } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

// ================= 👾 魔物全息 AI 仇恨行动树与掉落工坊 (monster_ai_combat_resolver.gd) =================
interface MonsterAiPrototype {
  id: string
  name: string
  icon: string
  rank: string
  rankTag: 'error' | 'warning' | 'info' | 'primary' | 'success'
  aiType: string
  counterRule: string
  elements: Array<{ name: string; effect: string }>
  bestSpellblade: string
  bestSummon: string
  forbiddenWarning: string
  statusImmunities: string[]
  dropCommon: { name: string; rate: number }
  dropRare: { name: string; rate: number }
  stealItem: { name: string; rate: number }
}

const monsterAiPrototypes: MonsterAiPrototype[] = [
  {
    id: 'exdeath',
    name: '虚空邪树·艾克斯迪斯',
    icon: '🌲',
    rank: '最终反派 BOSS',
    rankTag: 'error',
    aiType: '三阶段多重施法树',
    counterRule: '受到物理近战攻击时 33% 几率以【真空波】瞬发反击并附加流血',
    elements: [
      { name: '火', effect: '常规(1.0x)' },
      { name: '冰', effect: '常规(1.0x)' },
      { name: '雷', effect: '常规(1.0x)' },
      { name: '水', effect: '吸收(+1.0x)' },
      { name: '风', effect: '弱点(2.0x)' },
      { name: '地', effect: '无效(0x)' },
      { name: '圣', effect: '弱点(2.0x)' },
      { name: '暗', effect: '吸收(+1.0x)' }
    ],
    bestSpellblade: '圣剑术附魔 (Holy Spellblade) · 2.0x 真实穿透',
    bestSummon: '巴哈姆特 (百万亿火光) / 希瓦 (风雪破结界)',
    forbiddenWarning: '严禁使用暗黑魔法或水系核爆，将全额转化为其血量！',
    statusImmunities: ['致盲', '沉默', '即死', '石化', '蛙化', '缩小', '混乱'],
    dropCommon: { name: '暗黑圣灵药', rate: 100 },
    dropRare: { name: '原初虚空结晶', rate: 12 },
    stealItem: { name: '源氏之铠 (绝版神器)', rate: 25 }
  },
  {
    id: 'shinryu',
    name: '宝箱神龙·真龙王',
    icon: '🐉',
    rank: '隐藏超越超绝 BOSS',
    rankTag: 'warning',
    aiType: '开局水灾海啸+全屏核融',
    counterRule: '承受非弱点属性攻击时，立即释放全屏【冰霜风暴】冻结前排',
    elements: [
      { name: '火', effect: '常规(1.0x)' },
      { name: '冰', effect: '吸收(+1.0x)' },
      { name: '雷', effect: '常规(1.0x)' },
      { name: '水', effect: '吸收(+1.0x)' },
      { name: '风', effect: '常规(1.0x)' },
      { name: '地', effect: '无效(0x)' },
      { name: '圣', effect: '弱点(2.0x)' },
      { name: '暗', effect: '无效(0x)' }
    ],
    bestSpellblade: '龙骑士飞龙枪 + 飞天避海啸 / 龙之髭鞭',
    bestSummon: '利维亚桑 (珊瑚戒指反弹水灾) / 凤凰复活保底',
    forbiddenWarning: '开局若无【珊瑚之戒】水吸收防护，全队首回合直接承受 7500+ 水灾秒杀！',
    statusImmunities: ['全部状态异常免疫', '即死免疫', '停滞免疫'],
    dropCommon: { name: '飞龙之枪', rate: 100 },
    dropRare: { name: '龙王逆鳞·圣戒', rate: 8 },
    stealItem: { name: '天丛云剑 (高暴击太刀)', rate: 20 }
  },
  {
    id: 'omega',
    name: '古代灭绝兵器·欧米茄',
    icon: '🤖',
    rank: '太古自律型机甲',
    rankTag: 'error',
    aiType: '波动炮+火箭飞拳超速运转',
    counterRule: '被直接物理击中时 100% 触发【火箭飞拳】附带濒死与混乱反击',
    elements: [
      { name: '火', effect: '吸收(+1.0x)' },
      { name: '冰', effect: '吸收(+1.0x)' },
      { name: '雷', effect: '弱点(2.0x)' },
      { name: '水', effect: '吸收(+1.0x)' },
      { name: '风', effect: '吸收(+1.0x)' },
      { name: '地', effect: '吸收(+1.0x)' },
      { name: '圣', effect: '吸收(+1.0x)' },
      { name: '暗', effect: '吸收(+1.0x)' }
    ],
    bestSpellblade: '雷魔法剑三级 (Thundaga Spellblade) + 二刀流乱打',
    bestSummon: '拉姆 (古代雷霆轰击，过载机体核心) / 诱敌爱之歌',
    forbiddenWarning: '仅弱雷！其余 7 种属性全吸收！不可直接普通平砍，必须使用乱打规避反击！',
    statusImmunities: ['除停止 (Stop) 外全免疫', '即死无效', '石化无效'],
    dropCommon: { name: '欧米茄装甲徽记', rate: 100 },
    dropRare: { name: '驱动力力场护盾核心', rate: 5 },
    stealItem: { name: '力场发生装置 (极珍稀材料)', rate: 15 }
  },
  {
    id: 'tiamat',
    name: '多头灾厄龙·提亚马特',
    icon: '🐲',
    rank: '深渊守门恶龙',
    rankTag: 'info',
    aiType: '四首元素轮转吐息',
    counterRule: '每回合开始时随血线重置首领吐息属性',
    elements: [
      { name: '火', effect: '反射(Reflect)' },
      { name: '冰', effect: '弱点(2.0x)' },
      { name: '雷', effect: '常规(1.0x)' },
      { name: '水', effect: '常规(1.0x)' },
      { name: '风', effect: '半减(0.5x)' },
      { name: '地', effect: '无效(0x)' },
      { name: '圣', effect: '常规(1.0x)' },
      { name: '暗', effect: '弱点(2.0x)' }
    ],
    bestSpellblade: '暴风雪魔法剑 / 冰霜吐息封印',
    bestSummon: '希瓦 (冰封千里) / 奥丁 (斩铁剑概率斩杀)',
    forbiddenWarning: '常驻火系反射！绝对不可对其盲目施放三级烈火魔法！',
    statusImmunities: ['失明', '沉默', '中毒'],
    dropCommon: { name: '龙牙刃', rate: 100 },
    dropRare: { name: '提亚马特的宝珠', rate: 15 },
    stealItem: { name: '龙鳞胸甲', rate: 30 }
  },
  {
    id: 'behemoth',
    name: '极荒兽王·贝希摩斯',
    icon: '🐂',
    rank: '狂暴原野巨兽',
    rankTag: 'warning',
    aiType: '濒死陨石天谴',
    counterRule: '致命濒死 (HP<=15%) 时必定瞬发吟唱【死前天谴·陨石降临】',
    elements: [
      { name: '火', effect: '半减(0.5x)' },
      { name: '冰', effect: '弱点(2.0x)' },
      { name: '雷', effect: '半减(0.5x)' },
      { name: '水', effect: '常规(1.0x)' },
      { name: '风', effect: '常规(1.0x)' },
      { name: '地', effect: '吸收(+1.0x)' },
      { name: '圣', effect: '常规(1.0x)' },
      { name: '暗', effect: '常规(1.0x)' }
    ],
    bestSpellblade: '冰结剑斩裂 / 沉默术压制魔法',
    bestSummon: '泰坦 (大地崩裂抗震) / 巨像护盾',
    forbiddenWarning: '击杀前排务必提前布设【高阶护盾】或【白魔法复活术】，硬扛死前陨石！',
    statusImmunities: ['蛙化', '缩小', '魅惑'],
    dropCommon: { name: '兽王生肉', rate: 100 },
    dropRare: { name: '战角巨斧', rate: 18 },
    stealItem: { name: '巨兽重铠', rate: 35 }
  }
]

const selectedAiProtoId = ref<string>('exdeath')
const activeAiProto = computed<MonsterAiPrototype>(() => {
  return monsterAiPrototypes.find(p => p.id === selectedAiProtoId.value) || monsterAiPrototypes[0]
})

const aiHpPct = ref<number>(80)
const aiAggroMode = ref<string>('highest_dps')
const aggroModeOptions = [
  { label: '🎯 仇恨最高输出者 (Highest DPS Focus)', value: 'highest_dps' },
  { label: '🚑 锁定队伍最虚弱目标 (Lowest HP Assassination)', value: 'lowest_hp' },
  { label: '🧙 压制施法者/治疗职业 (Caster / Healer Counter)', value: 'caster_lock' },
  { label: '🎲 混沌随机仇恨 (Chaos Random Swing)', value: 'random_chaos' }
]

const lootSimFeedback = ref<string>('尚未进行掉落或偷盗推演，点击上方按钮触发 RNG 判定。')
const aiCombatSimLog = ref<string>('就绪：选定魔物标本与血线阶段后，点击【⚡ 触发 AI 动作推演】。')

const getHpPhaseName = (hp: number): string => {
  if (hp > 75) return '阶段一·常规压制'
  if (hp > 50) return '阶段二·狂暴蓄力'
  if (hp > 25) return '阶段三·连环强袭'
  return '阶段四·终极绝灭'
}

const getElementClass = (effect: string) => {
  if (effect.includes('弱点')) return 'border-rose-500/60 bg-rose-950/40 text-rose-300'
  if (effect.includes('吸收')) return 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300'
  if (effect.includes('无效')) return 'border-slate-700 bg-slate-900/60 text-gray-500'
  if (effect.includes('反射')) return 'border-amber-500/60 bg-amber-950/40 text-amber-300'
  if (effect.includes('半减')) return 'border-blue-500/60 bg-blue-950/40 text-blue-300'
  return 'border-slate-800 bg-slate-950/40 text-gray-400'
}

const predictedAction = computed(() => {
  const p = activeAiProto.value
  const hp = aiHpPct.value
  const aggro = aiAggroMode.value

  let targetDesc = '队伍仇恨最高输出者'
  if (aggro === 'lowest_hp') targetDesc = '当前残血最危急队友'
  else if (aggro === 'caster_lock') targetDesc = '后排白魔/黑魔施法者'
  else if (aggro === 'random_chaos') targetDesc = '随机前排/后排目标'

  if (p.id === 'exdeath') {
    if (hp <= 25) return { skill: '原初虚空崩解 (Neo Void Collapse)', desc: `血线低于 25%，锁定【${targetDesc}】，引发不可阻挡的全域无属性混沌湮灭！` }
    if (hp <= 50) return { skill: '三连极效魔法 (Meteor + Flare + Holy)', desc: `血线进入狂暴期，连续施展 3 发上古禁咒打击阵线！` }
    if (hp <= 75) return { skill: '真空波 (Vacuum Wave)', desc: `对【${targetDesc}】释放物理风刃切裂，附带严重流血与致盲效果。` }
    return { skill: '常规平砍 + 减速咒', desc: `试探性打击前排，并对治疗者附着减速诅咒。` }
  }

  if (p.id === 'shinryu') {
    if (hp <= 25) return { skill: '毁灭龙息·超新星 (Gigastorm)', desc: `对全队释放双重闪电风暴与海啸连击，需高阶魔防硬抗！` }
    if (hp <= 50) return { skill: '死宣光环 + 冰霜风暴', desc: `赋予【${targetDesc}】30秒倒计时死宣，并降下全屏寒霜。` }
    if (hp <= 75) return { skill: '原子射线 (Atomic Ray)', desc: `对【${targetDesc}】造成高额火属性魔法贯穿！` }
    return { skill: '开局水灾海啸 (Tidal Wave)', desc: `全队极巨量水系冲击，非吸收防具将瞬间致命。` }
  }

  if (p.id === 'omega') {
    if (hp <= 25) return { skill: '超重力过载波动炮 (Overcharged Wave Cannon)', desc: `对全体造成最大 HP 50% 的真实伤害，并附加高频灼烧！` }
    if (hp <= 50) return { skill: '增压原子射线 + 圈套防御', desc: `激活绝对物理护盾，锁定【${targetDesc}】进行激光扫射。` }
    if (hp <= 75) return { skill: '火箭飞拳 (Rocket Punch)', desc: `发射高能飞拳使【${targetDesc}】陷入混乱与濒死状态。` }
    return { skill: '黄光警戒射击 + 芥子气', desc: `释放高腐蚀气体，前排队员持续损失生命。` }
  }

  if (p.id === 'tiamat') {
    if (hp <= 25) return { skill: '四重毁灭吐息 (Quad Breath)', desc: `火/冰/雷/毒四种元素混合吐息，全面轰炸全阵线！` }
    if (hp <= 50) return { skill: '毒龙怒啸 + 烈火吐息', desc: `压制【${targetDesc}】，造成巨额火伤与剧毒侵蚀。` }
    return { skill: '双头撕咬 + 冰霜喷射', desc: `普通物理两段突袭，附带减速冰冻。` }
  }

  // behemoth
  if (hp <= 25) return { skill: '死前天谴·陨石降临 (Meteor Fall)', desc: `濒死触发被动蓄力！阵亡瞬间将砸落 4 颗毁天灭地巨型陨石！` }
  if (hp <= 50) return { skill: '巨角冲锋 (Horn Charge)', desc: `极高破甲物理冲击，直接击飞【${targetDesc}】并破除常驻防御。` }
  return { skill: '兽王重爪 (Claw Strike)', desc: `对前排单一目标造成 1.5x 爆裂重击。` }
})

const selectAiProto = (id: string) => {
  selectedAiProtoId.value = id
  simulateAiRound()
}

const resetAiStudio = () => {
  aiHpPct.value = 80
  aiAggroMode.value = 'highest_dps'
  lootSimFeedback.value = '已重置推演环境与掉落统计参数。'
  aiCombatSimLog.value = '已重置：等待触发下一轮 AI 行动树演算。'
}

const simulateAiRound = () => {
  const p = activeAiProto.value
  const act = predictedAction.value
  aiCombatSimLog.value = `[AI实时演练] ${p.name} 在 ${aiHpPct.value}% 血线下响应决策：施放【${act.skill}】！${act.desc}（底层触发契约: monster_ai_combat_resolver.gd:evaluate_turn）`
}

const simulateStealAction = () => {
  const p = activeAiProto.value
  const rate = Math.min(100, Math.round(p.stealItem.rate * 1.5))
  const roll = Math.random() * 100
  if (roll <= rate) {
    lootSimFeedback.value = `✅ [盗贼偷盗成功] 掷骰 ${roll.toFixed(1)} <= ${rate}% (盗贼护腕加权)：成功从 ${p.name} 身上窃得【${p.stealItem.name}】！`
  } else {
    lootSimFeedback.value = `❌ [盗贼偷盗落空] 掷骰 ${roll.toFixed(1)} > ${rate}%：未能发现有价值物品，目标警觉度上升！`
  }
}

const simulateBatchDrop = () => {
  const p = activeAiProto.value
  let commonCount = 0
  let rareCount = 0
  for (let i = 0; i < 10; i++) {
    if (Math.random() * 100 <= p.dropCommon.rate) commonCount++
    if (Math.random() * 100 <= p.dropRare.rate) rareCount++
  }
  lootSimFeedback.value = `🎲 [10连战刷取结算] 讨伐 ${p.name}：普通掉落【${p.dropCommon.name}】×${commonCount} 件；稀有神器【${p.dropRare.name}】×${rareCount} 件！`
}

// ================= 独立只读招式面板与抗性翻译 (monster_known_moves.gd / monster_physical_resistance.gd) =================
const showKnownMovesInnerModal = ref(false)
const selectedMoveKindFilter = ref<'all' | 'physical' | 'magic' | 'mp_drain' | 'status'>('all')

const getPhysicalResistanceText = (m: any): string => {
  if (!m) return '常驻物理承伤：未记载'
  if (m.physical_multiplier !== undefined && m.physical_multiplier !== null) {
    return `常驻物理承伤 ×${m.physical_multiplier}（不含临时防御）`
  }
  if (m.race === 'machine' || m.id === 'ancient_golem' || m.name?.includes('魔像') || m.name?.includes('巨像')) {
    return '常驻物理承伤 ×0.8（不含临时防御）'
  }
  if (m.id?.includes('slime') || m.name?.includes('粘液') || m.name?.includes('史莱姆')) {
    return '常驻物理承伤 ×0.2（不含临时防御）'
  }
  if (m.race === 'undead' && (m.name?.includes('幽灵') || m.name?.includes('恶灵'))) {
    return '常驻物理承伤 ×0.5（不含临时防御）'
  }
  if (m.rank === 'normal') {
    return '常驻物理承伤 ×1.0（不含临时防御）'
  }
  return '常驻物理承伤 ×1.0（不含临时防御）'
}

const getStatusImmunitiesText = (m: any): string => {
  if (!m) return '未记载'
  if (m.status_immunities) {
    if (Array.isArray(m.status_immunities) && m.status_immunities.includes('*')) {
      return '免疫：全部状态'
    }
    if (Array.isArray(m.status_immunities) && m.status_immunities.length > 0) {
      return `免疫：${m.status_immunities.join('、')}`
    }
  }
  if (m.rank === 'boss' || isBountyTarget(m)) {
    return '免疫：全部状态（星号通配解释）'
  }
  return '常规状态可附着（致盲/沉默/中毒等）'
}

const getKnownBaseMovesList = computed(() => {
  if (!activeMonster.value || !activeMonster.value.skills) return []
  const skills: string[] = activeMonster.value.skills || []
  return skills.map((name: string, idx: number) => {
    let kind = 'physical'
    let kind_name = '物理招式'
    let paramDesc = '倍率 1.0x · 命中 100% · 单体'

    if (['核爆', '海啸', '暴风', '烈焰', '闪电', '暴风雪', '魔法', '雷鸣', '陨石'].some(k => name.includes(k))) {
      kind = 'magic'
      kind_name = '魔法招式'
      paramDesc = '威力 85 · 对应元素 · 全体/单体'
    } else if (['咆哮', '凝视', '毒刺', '石化', '致盲', '混乱', '毒针', '麻痹'].some(k => name.includes(k))) {
      kind = 'status'
      kind_name = '状态招式'
      paramDesc = '几率 45% · 持续 3 回合 · 异常附着'
    } else if (['吸血', '吸收', '渗透', '虹吸'].some(k => name.includes(k))) {
      kind = 'mp_drain'
      kind_name = 'MP吸收招式'
      paramDesc = '吸取量 20~40 MP · 自身回复'
    }

    return {
      name,
      kind,
      kind_name,
      paramDesc,
      index: idx + 1
    }
  }).filter((move: any) => {
    if (selectedMoveKindFilter.value === 'all') return true
    return move.kind === selectedMoveKindFilter.value
  })
})

// ================= 游荡首领测算台 (roaming_boss_rules.json) =================
interface RoamingBossTemplate {
  id: string
  name: string
  title: string
  baseLevel: number
  baseHp: number
  baseAttack: number
  baseDefense: number
  baseSpeed: number
  baseExp: number
  baseGold: number
  baseAp: number
  location: string
  avatar: string
}

const roamingBossList: RoamingBossTemplate[] = [
  {
    id: 'ff1_pr_033',
    name: '阿斯托斯 (Astos)',
    title: '黑暗妖精伪王',
    baseLevel: 5,
    baseHp: 420,
    baseAttack: 30,
    baseDefense: 18,
    baseSpeed: 39,
    baseExp: 2250,
    baseGold: 2000,
    baseAp: 1,
    location: '西城城堡 (ff1_western_keep)',
    avatar: '👑'
  },
  {
    id: 'ff1_pr_006',
    name: '加兰多 (Garland)',
    title: '轮回骑士·混沌化身',
    baseLevel: 10,
    baseHp: 1060,
    baseAttack: 45,
    baseDefense: 25,
    baseSpeed: 24,
    baseExp: 3800,
    baseGold: 3200,
    baseAp: 2,
    location: '柯内利亚神殿深处',
    avatar: '🛡️'
  },
  {
    id: 'ancient_golem',
    name: '远古守护巨像 (Ancient Golem)',
    title: '星界古魔导巨核',
    baseLevel: 45,
    baseHp: 1200,
    baseAttack: 65,
    baseDefense: 42,
    baseSpeed: 28,
    baseExp: 6200,
    baseGold: 4500,
    baseAp: 3,
    location: '米西迪亚观象台·禁断封印室',
    avatar: '🗿'
  },
  {
    id: 'ff1_pr_059',
    name: '冥界吸血鬼 (Vampire)',
    title: '暗夜血裔统领',
    baseLevel: 20,
    baseHp: 2800,
    baseAttack: 72,
    baseDefense: 38,
    baseSpeed: 42,
    baseExp: 7500,
    baseGold: 6000,
    baseAp: 3,
    location: '大地洞穴深处',
    avatar: '🦇'
  },
  {
    id: 'ff1_pr_081',
    name: '地之巫妖·利奇 (Lich)',
    title: '土之混沌大领主',
    baseLevel: 35,
    baseHp: 4000,
    baseAttack: 85,
    baseDefense: 50,
    baseSpeed: 48,
    baseExp: 12000,
    baseGold: 9000,
    baseAp: 4,
    location: '土之祭坛混沌之涡',
    avatar: '💀'
  },
  {
    id: 'ff1_pr_084',
    name: '风之狂龙·提亚马特 (Tiamat)',
    title: '浮游空之混沌主宰',
    baseLevel: 50,
    baseHp: 6400,
    baseAttack: 120,
    baseDefense: 65,
    baseSpeed: 58,
    baseExp: 24000,
    baseGold: 18000,
    baseAp: 5,
    location: '浮游城最上层',
    avatar: '🐉'
  }
]

const selectedRoamingBossId = ref<string>('ff1_pr_033')
const areaMinLevel = ref<number>(25)
const roamingBonusLevel = ref<number>(4)
const travelPixels = ref<number>(1280)
const showRoamingStudio = ref<boolean>(true)

const roamingBossOptions = computed(() => {
  return roamingBossList.map(b => ({
    label: `${b.avatar} ${b.name} (基准Lv.${b.baseLevel})`,
    value: b.id
  }))
})

const selectedRoamingBoss = computed(() => {
  return roamingBossList.find(b => b.id === selectedRoamingBossId.value) || roamingBossList[0]
})

const roamingRolls = computed(() => {
  return Math.floor(travelPixels.value / 640)
})

const roamingEncounterRate = computed(() => {
  if (roamingRolls.value <= 0) return 0
  return (1 - Math.pow(1 - 0.25, roamingRolls.value)) * 100
})

const scaledTargetLevel = computed(() => {
  return Math.max(1, areaMinLevel.value + roamingBonusLevel.value)
})

const roamingScaleFactor = computed(() => {
  const baseLvl = selectedRoamingBoss.value.baseLevel
  return (scaledTargetLevel.value + 10) / (baseLvl + 10)
})

const scaledBossStats = computed(() => {
  const b = selectedRoamingBoss.value
  const factor = roamingScaleFactor.value
  const hpGrowth = Math.pow(factor, 1.3)
  const rewardGrowth = Math.pow(factor, 1.3)
  const speedGrowth = Math.pow(factor, 0.35)
  const apGrowth = Math.pow(factor, 0.5)

  return {
    level: scaledTargetLevel.value,
    hp: Math.round(b.baseHp * hpGrowth),
    attack: Math.round(b.baseAttack * Math.pow(factor, 1.15)),
    defense: Math.round(b.baseDefense * Math.pow(factor, 1.1)),
    speed: Math.round(b.baseSpeed * speedGrowth),
    exp: Math.round(b.baseExp * rewardGrowth),
    gold: Math.round(b.baseGold * rewardGrowth),
    ap: Math.max(1, Math.round(b.baseAp * apGrowth)),
    scaleMultiplier: factor.toFixed(2),
    minionsRange: '0 ~ 3 伴生怪',
    bossCountRange: '1 ~ 3 分身体'
  }
})

// 所有魔物数据源
const allMonsters = computed(() => gameStore.db.monsters || [])

// 悬赏魔物判定与等级标签辅助函数
const isBountyTarget = (m: any): boolean => {
  if (!m) return false
  const bountyKeywords = ['强化奇美拉', '死神之眼', '僵尸龙', '哥布林头目', '火蜥蜴', '刺客头目']
  return Boolean(
    m.isBounty ||
    bountyKeywords.some(k => m.name?.includes(k)) ||
    m.id?.includes('bounty') ||
    m.id === 'ff1_pr_120' ||
    m.id === 'ff1_pr_121'
  )
}

const getBountyRank = (m: any): string => {
  if (m.name?.includes('强化奇美拉') || m.id === 'ff1_pr_120') return 'Rank A 悬赏'
  if (m.name?.includes('死神之眼') || m.id === 'ff1_pr_121') return 'Rank S 悬赏'
  if (m.name?.includes('僵尸龙')) return 'Rank B 悬赏'
  if (m.name?.includes('火蜥蜴')) return 'Rank C 悬赏'
  if (m.name?.includes('哥布林')) return 'Rank D 悬赏'
  return '酒馆悬赏'
}

// 招式类别标签 (对齐实机 monster_known_moves.gd)
const getSkillKindLabel = (skillName: string): string => {
  if (['咆哮', '凝视', '毒刺', '石化', '致盲', '混乱'].some(s => skillName.includes(s))) return '状态招式'
  if (['核爆', '海啸', '暴风', '烈焰', '闪电', '暴风雪', '魔法'].some(s => skillName.includes(s))) return '魔法招式'
  if (['吸血', '吸收', '渗透'].some(s => skillName.includes(s))) return 'MP吸收招式'
  return '物理招式'
}

const getSkillKindTag = (skillName: string): 'default' | 'info' | 'warning' | 'error' | 'success' => {
  const label = getSkillKindLabel(skillName)
  if (label === '魔法招式') return 'info'
  if (label === '状态招式') return 'warning'
  if (label === 'MP吸收招式') return 'success'
  return 'default'
}

// 分类 Tab
const activeCategoryTab = ref<'all' | 'normal' | 'boss' | 'coliseum' | 'bounty'>('all')

// 窄屏焦点进入页签时完整显现按钮，不改变原生选择与键盘行为。
function revealCategoryTab(event: FocusEvent) {
  if (event.target instanceof HTMLButtonElement) {
    event.target.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }
}

// 视图模式 (grid / table)
const viewMode = ref<'grid' | 'table'>('grid')

// 筛选状态
const searchKeyword = ref('')
const selectedRace = ref<string>('all')
const selectedLocation = ref<string>('all')
const sortBy = ref<'level_asc' | 'level_desc' | 'hp_desc' | 'atk_desc' | 'exp_desc'>('level_asc')

// 弹窗状态
const showDetailModal = ref(false)
const activeMonster = ref<any>({})

const normalCount = computed(() => allMonsters.value.filter((m: any) => m.rank === 'normal').length)
const bossCount = computed(() => allMonsters.value.filter((m: any) => m.rank === 'boss').length)
const coliseumCount = computed(() => allMonsters.value.filter((m: any) => m.rank === 'coliseum').length)
const bountyCount = computed(() => allMonsters.value.filter(isBountyTarget).length)

// 种族选项
const raceOptions = computed(() => {
  const races = new Set<string>()
  allMonsters.value.forEach((m: any) => {
    const r = m.raceText || m.race
    if (r) races.add(r)
  })
  return [
    { label: '全部种族', value: 'all' },
    ...Array.from(races).map(r => ({ label: r, value: r }))
  ]
})

// 区域选项
const locationOptions = computed(() => {
  const locs = new Set<string>()
  allMonsters.value.forEach((m: any) => {
    if (m.location) locs.add(m.location)
  })
  return [
    { label: '全部出没区域', value: 'all' },
    ...Array.from(locs).map(l => ({ label: l, value: l }))
  ]
})

// 排序选项
const sortOptions = [
  { label: '等级由低到高 (Lv.1 ↑)', value: 'level_asc' },
  { label: '等级由高到低 (Lv.99 ↓)', value: 'level_desc' },
  { label: '生命值最高 (HP ↓)', value: 'hp_desc' },
  { label: '攻击力最高 (ATK ↓)', value: 'atk_desc' },
  { label: '经验值最高 (EXP ↓)', value: 'exp_desc' }
]

// 综合过滤魔物列表
const filteredMonsters = computed(() => {
  return allMonsters.value.filter((m: any) => {
    // 1. 分类 Tab
    if (activeCategoryTab.value !== 'all') {
      if (activeCategoryTab.value === 'bounty') {
        if (!isBountyTarget(m)) return false
      } else if (m.rank !== activeCategoryTab.value) {
        return false
      }
    }

    // 2. 种族筛选
    if (selectedRace.value && selectedRace.value !== 'all') {
      const r = m.raceText || m.race
      if (r !== selectedRace.value) return false
    }

    // 3. 区域筛选
    if (selectedLocation.value && selectedLocation.value !== 'all') {
      if (m.location !== selectedLocation.value) return false
    }

    // 4. 关键字搜索
    if (searchKeyword.value.trim()) {
      const q = searchKeyword.value.trim().toLowerCase()
      const matchName = m.name?.toLowerCase().includes(q)
      const matchId = m.id?.toLowerCase().includes(q)
      const matchWeakness = m.weakness?.toLowerCase().includes(q)
      const matchDrops = (m.drops || []).some((d: any) => d.name?.toLowerCase().includes(q))
      const matchSkills = (m.skills || []).some((s: string) => s.toLowerCase().includes(q))
      const matchBounty = isBountyTarget(m) && (q.includes('悬赏') || q.includes('bounty') || q.includes('rank') || getBountyRank(m).toLowerCase().includes(q))
      if (!matchName && !matchId && !matchWeakness && !matchDrops && !matchSkills && !matchBounty) {
        return false
      }
    }

    return true
  }).sort((a: any, b: any) => {
    if (sortBy.value === 'level_asc') return (a.level || 0) - (b.level || 0)
    if (sortBy.value === 'level_desc') return (b.level || 0) - (a.level || 0)
    if (sortBy.value === 'hp_desc') return (b.hp || 0) - (a.hp || 0)
    if (sortBy.value === 'atk_desc') return (b.attack || 0) - (a.attack || 0)
    if (sortBy.value === 'exp_desc') return (b.exp || 0) - (a.exp || 0)
    return 0
  })
})

const resetFilters = () => {
  activeCategoryTab.value = 'all'
  searchKeyword.value = ''
  selectedRace.value = 'all'
  selectedLocation.value = 'all'
  sortBy.value = 'level_asc'
  resetPage()
}

import { usePagination } from '@/composables/usePagination'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

const {
  currentPage,
  pageSize,
  total,
  paginatedList: paginatedMonsters,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination(filteredMonsters, { pageSize: 12 })

// simple 输入未开放 input-props；局部指令在挂载和响应式切换后补到实际输入。
const labelSimplePageInput = (container: HTMLElement) => {
  container.querySelector<HTMLInputElement>('.n-pagination--simple input')
    ?.setAttribute('aria-label', '魔物图鉴当前页')
}
const vSimplePageLabel: Directive<HTMLElement> = {
  mounted: labelSimplePageInput,
  updated: labelSimplePageInput
}

// 暂存同一次原生点击的起点，避免给普通页码更新或鼠标操作追加移焦。
let simplePaginationActivation: { event: MouseEvent; button: HTMLButtonElement; page: number } | null = null
const captureSimplePaginationActivation = (event: MouseEvent) => {
  simplePaginationActivation = null
  const button = event.target instanceof Element ? event.target.closest('button.monsters-pagination-control') : null
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

watch([activeCategoryTab, selectedRace, selectedLocation, searchKeyword, sortBy], () => {
  resetPage()
})

const openMonsterDetail = (monster: any) => {
  activeMonster.value = monster
  showDetailModal.value = true
}

const scrollToEcologyStudio = () => {
  const el = document.getElementById('monster-ecology-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// ================= 🌿 全域魔物生态食物链与基因变异演化沙盘 (v2.2.260) =================
interface EcologicalBiome {
  id: string
  name: string
  climate: string
  predator: string
  prey: string
  tagType: 'success' | 'warning' | 'info' | 'error'
  description: string
  baseCapacity: number
}

interface ApexPredator {
  id: string
  name: string
  icon: string
  tier: string
  trait: string
  ferocityBonus: number
  lootBoost: number
}

const ecologicalBiomes: EcologicalBiome[] = [
  {
    id: 'primal_forest',
    name: '始源温带密林 (Primal Forest)',
    climate: '温润以太微风',
    predator: '苍白狂爪狼族 (Dire Wolf)',
    prey: '剧毒金角蜂群 (Killer Bee)',
    tagType: 'success',
    description: '林冠繁茂，以太溪流穿透地表，植被生长丰沛，为各类初阶与中阶野兽提供理想捕食繁衍温床。',
    baseCapacity: 12500
  },
  {
    id: 'volcanic_caldera',
    name: '卡尔纳克熔岩火山 (Volcano)',
    climate: '超高温硫磺热风',
    predator: '红莲炎息火蜥蜴 (Salamander)',
    prey: '赤热火史莱姆 (Fire Slime)',
    tagType: 'error',
    description: '地心熔火与高压硫磺喷发，唯有具备极高火抗与鳞甲的凶残魔兽方可栖息，变异概率极高。',
    baseCapacity: 8800
  },
  {
    id: 'sunken_abyss',
    name: '沃尔斯深海海沟 (Sunken Trench)',
    climate: '超高压幽暗暗流',
    predator: '深渊海龙巨兽 (Leviathan Drake)',
    prey: '荧光雷水母 (Jellyfish Swarm)',
    tagType: 'info',
    description: '万米深渊水压与沉没远古水之神殿，暗流涌动，水栖与雷属性魔物遵循古老潮汐演变。',
    baseCapacity: 15400
  },
  {
    id: 'void_singularity_rift',
    name: '次元裂隙虚无核心 (Void Rift)',
    climate: '零重力虚无辐射',
    predator: '次元吞噬聚合体 (Void Fiend)',
    prey: '混沌异变精魄 (Chaos Wisp)',
    tagType: 'warning',
    description: '时空裂谷终焉奇点，虚无物质撕扯一切物理法则，魔物呈现极端超阶突变与反物质融合。',
    baseCapacity: 22000
  }
]

const apexPredators: ApexPredator[] = [
  {
    id: 'ancient_dragon',
    name: '太古始祖古龙 (Ancient Dragon)',
    icon: '🐉',
    tier: '霸主 Tier EX',
    trait: '龙之威压压制全图掠食者，降低 20% 弱小群落竞争消耗',
    ferocityBonus: 35,
    lootBoost: 40
  },
  {
    id: 'abyssal_behemoth',
    name: '深渊狂暴贝希摩斯 (Behemoth)',
    icon: '🦏',
    tier: '霸主 Tier SSS',
    trait: '大地震击撕裂地表，加速弱小种群淘汰演化与基因适应',
    ferocityBonus: 45,
    lootBoost: 30
  },
  {
    id: 'chimera_prime',
    name: '狂乱多头奇美拉 (Chimera Prime)',
    icon: '🦁',
    tier: '霸主 Tier SS',
    trait: '多头元素杂交喷吐，提升环境中的元素异变诱发几率',
    ferocityBonus: 30,
    lootBoost: 25
  },
  {
    id: 'mecha_colossus',
    name: '古代机动巨神 (Mecha Colossus)',
    icon: '🤖',
    tier: '霸主 Tier S',
    trait: '远古魔导遗迹守卫，常驻能量立场阻隔外部环境干扰',
    ferocityBonus: 25,
    lootBoost: 35
  }
]

const selectedBiomeId = ref('primal_forest')
const aetherDensity = ref(65)
const predationPressure = ref(2.4)
const mutationFactor = ref(45)
const selectedApexId = ref('ancient_dragon')

const isEvolving = ref(false)
const evolutionProgress = ref(0)
const evolutionCurrentEpoch = ref('')
const evolutionLogs = ref<string[]>([
  '=== 生态食物链演算引擎已就绪，请选择生态圈并点击启动推演 ==='
])
let evolutionTimer: ReturnType<typeof setInterval> | null = null

const currentBiome = computed(() => {
  return ecologicalBiomes.find(b => b.id === selectedBiomeId.value) || ecologicalBiomes[0]
})

const currentApex = computed(() => {
  return apexPredators.find(a => a.id === selectedApexId.value) || apexPredators[0]
})

const calculatedCarryingCapacity = computed(() => {
  const base = currentBiome.value.baseCapacity
  const aetherMult = aetherDensity.value / 50
  return Math.round(base * aetherMult)
})

const calculatedEquilibriumIndex = computed(() => {
  const balance = 100 - Math.abs(predationPressure.value - 2.5) * 15 - Math.abs(aetherDensity.value - 60) * 0.2
  return Math.min(99.5, Math.max(35.0, balance))
})

const calculatedMutationRate = computed(() => {
  const base = (mutationFactor.value * 0.6) + (aetherDensity.value * 0.3)
  return Math.min(85.0, Math.max(5.0, base))
})

const calculatedRareDropRate = computed(() => {
  const apexBoost = currentApex.value.lootBoost
  const base = 2.0 * (1 + apexBoost / 100) * (1 + mutationFactor.value / 200)
  return Math.min(12.5, Math.max(1.0, base))
})

const startEvolutionEpoch = () => {
  if (isEvolving.value) return
  isEvolving.value = true
  evolutionProgress.value = 0
  evolutionCurrentEpoch.value = '纪元 1: 种群繁衍与生态承载扩张'

  const biome = currentBiome.value
  const apex = currentApex.value

  evolutionLogs.value = [
    `[0.0s] 🌿【${biome.name}】进入生态推演周期，环境以太丰度调节至 ${aetherDensity.value}%！`,
    `[0.3s] 👑 顶级霸主【${apex.name}】确立统治核心，释放【${apex.trait}】！`
  ]

  if (evolutionTimer) clearInterval(evolutionTimer)

  const epochs = [
    { at: 25, name: '纪元 2: 掠食压强与自然选择淘汰', log: `[0.6s] ⚔️ 掠食压强切入 ${predationPressure.value.toFixed(1)}x，被捕食种群【${biome.prey}】加速敏捷基因迭代！` },
    { at: 60, name: '纪元 3: 以太辐射诱发突变分化', log: `[1.0s] 🧬 基因突变诱导率达 ${calculatedMutationRate.value.toFixed(1)}%，诞生高阶变异精英种群！` },
    { at: 85, name: '纪元 4: 食物链动态稳态达成', log: `[1.4s] ⚖️ 生态圈承载量达 ${calculatedCarryingCapacity.value.toLocaleString()}，平衡指数达 ${calculatedEquilibriumIndex.value.toFixed(1)}%！` },
    { at: 100, name: '纪元 5: 生态演化成果结算', log: `[1.8s] 🏆 演化周期完成！绝品珍稀掉落诱发率升至 ${calculatedRareDropRate.value.toFixed(2)}%！` }
  ]

  evolutionTimer = setInterval(() => {
    evolutionProgress.value += 10
    const matched = epochs.find(e => e.at === evolutionProgress.value)
    if (matched) {
      evolutionCurrentEpoch.value = matched.name
      evolutionLogs.value.unshift(matched.log)
    }

    if (evolutionProgress.value >= 100) {
      if (evolutionTimer) clearInterval(evolutionTimer)
      evolutionTimer = null
      isEvolving.value = false
      evolutionProgress.value = 100
    }
  }, 160)
}

const copyEcologyConfig = () => {
  const biome = currentBiome.value
  const apex = currentApex.value
  const configText = `[生态演化遥测] 生态圈:${biome.name} | 霸主:${apex.name} | 承载力:${calculatedCarryingCapacity.value.toLocaleString()} | 平衡指数:${calculatedEquilibriumIndex.value.toFixed(1)}% | 突变率:${calculatedMutationRate.value.toFixed(1)}% | 稀有掉落率:${calculatedRareDropRate.value.toFixed(2)}%`
  navigator.clipboard.writeText(configText).catch(() => {})
}

const exportEcologyCert = () => {
  const biome = currentBiome.value
  const apex = currentApex.value
  const now = new Date()
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 19)

  const content = `================================================================================
《光之战士：时空裂隙》全域魔物生态食物链与基因变异演化认证方案书
================================================================================
推演方案: Monster Ecology & Evolutionary Mutation Certificate
颁发机构: VBLE Bestiary & Ecological Evolution Matrix / 皇家博物学者学会
推演版本: VBLE Bestiary & Ecological Evolution Matrix v2.2.260
引擎规范: Godot 4.6 LTS Monster Ecology Simulator
签发时间: ${dateStr} (CST)

【生态地质圈环境参数】
- 生态圈名录: ${biome.name} (${biome.id})
- 气候与气流: ${biome.climate}
- 顶级掠食者: ${biome.predator}
- 基底被捕食: ${biome.prey}
- 生态特征纲目: ${biome.description}

【环境诱变与霸主统治工况】
- 地脉以太浓度: ${aetherDensity.value}% (生态沃度)
- 掠食淘汰压强: ${predationPressure.value.toFixed(1)}x
- 基因突变诱导率: ${mutationFactor.value}%
- 冠绝霸主领主: ${apex.name} (${apex.tier})
- 霸主生态威压: ${apex.trait} (狂暴+${apex.ferocityBonus}%, 战利+${apex.lootBoost}%)

【实时遥测与生态动力学指标】
- 生态承载极限容量: ${calculatedCarryingCapacity.value.toLocaleString()} 种群当量
- 种群动态平衡指数: ${calculatedEquilibriumIndex.value.toFixed(1)}% (稳定性评价: ${calculatedEquilibriumIndex.value >= 75 ? '极高稳态' : '激烈演化中'})
- 精英突变诱发几率: ${calculatedMutationRate.value.toFixed(1)}%
- 绝品神器战利品率: ${calculatedRareDropRate.value.toFixed(2)}%

================================================================================
数字防伪哈希: SHA256-ECOLOGY-${Math.random().toString(36).substring(2, 10).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}
================================================================================`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `monster_ecology_evolution_v2.2.260_${biome.id}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

const gdEcologySimulatorCode = `# ==============================================================================
# MonsterEcologySimulator - 全域魔物生态食物链与基因变异演化解算器
# 文件路径: res://scripts/combat/monster_ecology_simulator.gd
# 架构规范: Godot 4.6 LTS / VBLE Bestiary & Ecological Evolution Matrix v2.2.260
# 核心职责: 管理 Lotka-Volterra 食物链微分动力学、环境以太承载力与突变概率矩阵
# ==============================================================================
class_name MonsterEcologySimulator
extends RefCounted

signal ecology_epoch_simulated(biome_id: String, carrying_capacity: int, equilibrium_pct: float)
signal mutation_triggered(apex_id: String, rare_drop_rate: float)

static func calculate_carrying_capacity(base_capacity: int, aether_density: float) -> int:
	var aether_mult: float = aether_density / 50.0
	return int(base_capacity * aether_mult)

static func calculate_equilibrium_index(predation_pressure: float, aether_density: float) -> float:
	var balance: float = 100.0 - abs(predation_pressure - 2.5) * 15.0 - abs(aether_density - 60.0) * 0.2
	return clampf(balance, 35.0, 99.5)

static func calculate_mutation_rate(mutation_factor: float, aether_density: float) -> float:
	var base: float = (mutation_factor * 0.6) + (aether_density * 0.3)
	return clampf(base, 5.0, 85.0)

static func simulate_predator_prey_step(prey_count: float, pred_count: float, delta: float, alpha: float = 0.1, beta: float = 0.02) -> Dictionary:
	var d_prey: float = (alpha * prey_count - beta * prey_count * pred_count) * delta
	var d_pred: float = (beta * 0.5 * prey_count * pred_count - 0.05 * pred_count) * delta
	return {
		"prey": max(10.0, prey_count + d_prey),
		"predator": max(2.0, pred_count + d_pred)
	}
`

onUnmounted(() => {
  if (evolutionTimer) {
    clearInterval(evolutionTimer)
    evolutionTimer = null
  }
})
</script>

<style scoped>
/* 原生按钮随键盘焦点在局部滚动区显现，长标签不再撑出整页。 */
.monsters-category-tabs {
  overflow-x: auto;
  scroll-padding-inline: 3px;
}

.monsters-category-tabs :deep(.n-tabs-rail) {
  min-width: max-content;
}

.monsters-pagination-control {
  min-width: 28px;
  min-height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.monsters-pagination-control:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 4px;
}

.monsters-pagination-control:disabled {
  cursor: not-allowed;
}
</style>
