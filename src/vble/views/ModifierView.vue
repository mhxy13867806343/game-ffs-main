<template>
  <div class="modifier-page p-3 sm:p-5 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-red-950/70 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.2)] relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/3 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              GM CHARACTER & STAT MODIFIER STUDIO
            </span>
            <span class="text-xs text-gray-400">1~255级无上限属性修改与金手指工坊</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🛠️</span> 全域属性修改器与 GM 内存控制台沙盘
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
            支持直接修改英雄 1 级基础属性与成长步进、输入血量/力量实时逆向反推等级、无敌/一击必杀 GM 内存锁定、以及一键生成 Action Replay 金手指代码。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <router-link to="/vble/characters">
            <n-button type="info" size="medium" round secondary class="shadow-md">
              <template #icon><span>👥</span></template>
              英雄传记
            </n-button>
          </router-link>
          <router-link to="/vble/armory-simulator">
            <n-button type="warning" size="medium" round secondary class="shadow-md">
              <template #icon><span>⚔️</span></template>
              配装模拟器
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

    <!-- 模式切换标签页 -->
    <div class="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
      <button
        v-for="tab in tabList"
        :key="tab.key"
        type="button"
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
        :class="activeModeTab === tab.key
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
          : 'bg-slate-900 text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-800'"
        @click="activeModeTab = tab.key"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.badge"
          class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-600 text-white font-bold"
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <!-- 模式 1: 属性直接修改与逆向求导 -->
    <div v-if="activeModeTab === 'stat_editor'" class="space-y-8">
      <!-- 顶层快捷操作条：角色切换 + 场景快速联动 -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#121626]/90 border border-slate-700/60 p-4 rounded-2xl shadow-xl">
        <!-- 选择要修改的目标角色 -->
        <div class="md:col-span-6 space-y-1.5">
          <label class="text-xs text-gray-400 block font-semibold">1. 选择需要修改属性的英雄角色:</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div
              v-for="char in characters"
              :key="char.id"
              class="p-2 rounded-lg border text-center cursor-pointer transition-all"
              :class="selectedCharId === char.id ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'border-slate-800 bg-slate-900/60 text-gray-300 hover:border-slate-700'"
              @click="handleSelectChar(char.id)"
            >
              <div class="text-xs sm:text-sm">{{ char.name }}</div>
              <div class="text-[10px] text-gray-400 truncate">{{ char.title }}</div>
            </div>
          </div>
        </div>

        <!-- 场景地宫联动自动定级 -->
        <div class="md:col-span-6 space-y-1.5">
          <label class="text-xs text-gray-400 block font-semibold">2. 关联场景地下城 (自动调节推荐等级):</label>
          <div class="flex gap-2">
            <n-select
              v-model:value="selectedSceneId"
              :options="sceneOptions"
              size="small"
              style="flex: 1;"
              @update:value="handleSceneChange"
            />
            <n-button size="small" type="warning" secondary @click="applySceneLevel">
              应用场景等级
            </n-button>
          </div>
          <div class="text-[11px] text-cyan-300 flex items-center justify-between pt-1">
            <span>当前场景: <strong>{{ currentSceneName }}</strong></span>
            <span>推荐等级: <strong class="text-amber-400 font-mono">Lv. {{ currentSceneLevel }}</strong></span>
          </div>
        </div>
      </div>

      <!-- 逆向反推器：输入属性数值 (如输入 500 血量) 即时反推等级 -->
      <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-purple-950/30 border border-amber-500/40 shadow-lg">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xl">🧮</span>
            <h3 class="text-base sm:text-lg font-bold text-amber-300">输入属性数值反推等级 (如输入 500 血量反推等级)</h3>
          </div>
          <n-tag size="tiny" type="warning">逆向求解算法</n-tag>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div class="lg:col-span-7 space-y-3 text-xs">
            <p class="text-gray-300 leading-relaxed">
              直接在下方输入框中输入期望达成的血量或力量，系统将实时计算逆向反推出所需的<strong>角色等级 (Lv.1 ~ 255)</strong>：
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="text-gray-400 block mb-1">输入期望生命值 (HP):</label>
                <n-input-number
                  v-model:value="targetInputHP"
                  :min="50"
                  :max="9999999"
                  :step="50"
                  placeholder="例如输入 500"
                  size="small"
                  @update:value="handleReverseHPInput"
                >
                  <template #suffix>HP</template>
                </n-input-number>
              </div>

              <div>
                <label class="text-gray-400 block mb-1">输入期望力量值 (STR):</label>
                <n-input-number
                  v-model:value="targetInputSTR"
                  :min="10"
                  :max="999999"
                  :step="10"
                  placeholder="例如输入 300"
                  size="small"
                  @update:value="handleReverseSTRInput"
                >
                  <template #suffix>点</template>
                </n-input-number>
              </div>
            </div>

            <!-- 快速血量预设 -->
            <div class="flex flex-wrap items-center gap-1.5 pt-1">
              <span class="text-gray-400">快捷血量快选:</span>
              <n-button
                v-for="hp in [300, 500, 1000, 3000, 8000, 20000, 50000]"
                :key="hp"
                size="tiny"
                quaternary
                type="info"
                @click="quickSetHP(hp)"
              >
                {{ hp }} HP
              </n-button>
            </div>
          </div>

          <!-- 逆向反推解算结果展示卡 -->
          <div class="lg:col-span-5 p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 text-center space-y-2.5">
            <div class="text-xs text-gray-400">根据当前设置反推得出目标等级</div>
            <div class="text-3xl font-black text-amber-400 font-mono">
              Lv. {{ reverseSolvedLevel }}
            </div>
            <div class="text-xs text-gray-300">
              实际达成血量: <strong class="text-red-400 font-mono">{{ getEstimatedHP(reverseSolvedLevel) }} HP</strong>
            </div>
            <n-button size="small" type="primary" block @click="applyReverseLevel">
              一键将当前等级应用为 Lv.{{ reverseSolvedLevel }}
            </n-button>
          </div>
        </div>
      </div>

      <!-- 核心修改工作台：左侧直接修改属性 VS 右侧实时演算与修改前后对比 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：直接属性输入修改区 (1~255级完全无上限) -->
        <div class="lg:col-span-7 space-y-5">
          <n-card title="⚙️ 属性直接输入修改工作台 (1~255级无上限)" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-2xl shadow-lg">
            <div class="space-y-4 text-xs">
              <!-- 等级设置 (支持滑块 + 数字输入框 1 ~ 255) -->
              <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-gray-200">当前角色等级 (Level):</span>
                  <div class="flex items-center gap-1.5">
                    <n-input-number
                      v-model:value="currentLevel"
                      :min="1"
                      :max="255"
                      size="small"
                      style="width: 100px;"
                    />
                    <span class="text-sm font-bold text-amber-400">级</span>
                  </div>
                </div>
                <n-slider v-model:value="currentLevel" :min="1" :max="255" :step="1" />
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Lv.1 序章</span>
                  <span>Lv.70 融合</span>
                  <span>Lv.150 深渊</span>
                  <span>Lv.255 巅峰极意</span>
                </div>
              </div>

              <!-- 六维基础属性与每级成长直接修改网格 -->
              <div class="space-y-2">
                <div class="text-gray-300 font-semibold flex items-center justify-between">
                  <span>六维基础属性修改 (支持自由修改初始点数与成长步进):</span>
                  <span class="text-[11px] text-amber-400">公式: 最终属性 = 初始值 + (等级-1) × 成长步进</span>
                </div>

                <!-- 力量 STR -->
                <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                  <div class="col-span-3 font-bold text-red-400">力量 (STR):</div>
                  <div class="col-span-4">
                    <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                    <n-input-number v-model:value="editStats.strBase" :min="1" size="tiny" />
                  </div>
                  <div class="col-span-5">
                    <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.strGrowth }}/级)</span>
                    <n-input-number v-model:value="editStats.strGrowth" :min="1" size="tiny" />
                  </div>
                </div>

                <!-- 敏捷 AGI -->
                <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                  <div class="col-span-3 font-bold text-green-400">敏捷 (AGI):</div>
                  <div class="col-span-4">
                    <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                    <n-input-number v-model:value="editStats.agiBase" :min="1" size="tiny" />
                  </div>
                  <div class="col-span-5">
                    <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.agiGrowth }}/级)</span>
                    <n-input-number v-model:value="editStats.agiGrowth" :min="1" size="tiny" />
                  </div>
                </div>

                <!-- 体质 VIT -->
                <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                  <div class="col-span-3 font-bold text-amber-400">体质 (VIT):</div>
                  <div class="col-span-4">
                    <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                    <n-input-number v-model:value="editStats.vitBase" :min="1" size="tiny" />
                  </div>
                  <div class="col-span-5">
                    <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.vitGrowth }}/级)</span>
                    <n-input-number v-model:value="editStats.vitGrowth" :min="1" size="tiny" />
                  </div>
                </div>

                <!-- 魔力 MAG -->
                <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                  <div class="col-span-3 font-bold text-cyan-400">魔力 (MAG):</div>
                  <div class="col-span-4">
                    <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                    <n-input-number v-model:value="editStats.magBase" :min="1" size="tiny" />
                  </div>
                  <div class="col-span-5">
                    <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.magGrowth }}/级)</span>
                    <n-input-number v-model:value="editStats.magGrowth" :min="1" size="tiny" />
                  </div>
                </div>

                <!-- 精神 SPR -->
                <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                  <div class="col-span-3 font-bold text-blue-400">精神 (SPR):</div>
                  <div class="col-span-4">
                    <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                    <n-input-number v-model:value="editStats.sprBase" :min="1" size="tiny" />
                  </div>
                  <div class="col-span-5">
                    <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.sprGrowth }}/级)</span>
                    <n-input-number v-model:value="editStats.sprGrowth" :min="1" size="tiny" />
                  </div>
                </div>

                <!-- 基础 HP 与 MP 直接修改 -->
                <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                  <div class="col-span-3 font-bold text-red-500">生命值 (HP):</div>
                  <div class="col-span-4">
                    <span class="text-[10px] text-gray-400 block">1 级初始 HP</span>
                    <n-input-number v-model:value="editStats.hpBase" :min="50" size="tiny" />
                  </div>
                  <div class="col-span-5">
                    <span class="text-[10px] text-gray-400 block">每级成长 HP (+{{ editStats.hpGrowth }})</span>
                    <n-input-number v-model:value="editStats.hpGrowth" :min="10" size="tiny" />
                  </div>
                </div>
              </div>

              <!-- 操作按钮：保存生效、重置默认、一键满级超模 -->
              <div class="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
                <n-button type="success" size="medium" @click="handleSaveAndApply">
                  💾 保存并全局生效
                </n-button>
                <n-button type="warning" size="medium" secondary @click="handleMaxOverpower">
                  ⚡ 一键满级 255 巅峰超神
                </n-button>
                <n-button type="default" size="medium" quaternary @click="handleResetDefault">
                  🔄 恢复默认设定
                </n-button>
              </div>
            </div>
          </n-card>
        </div>

        <!-- 右侧：实时计算结果与修改前后对比面板 -->
        <div class="lg:col-span-5 space-y-5">
          <!-- 实时演算看板 -->
          <div class="p-5 bg-gradient-to-br from-[#1b223d] via-[#121629] to-[#0c101d] rounded-2xl border border-cyan-500/40 shadow-[0_0_25px_rgba(0,243,255,0.15)] space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs text-cyan-300 font-mono">MODIFIED REAL-TIME STATS</span>
                <h3 class="text-xl font-black text-white flex items-center gap-2 mt-0.5">
                  <span>{{ currentChar?.name }}</span>
                  <span class="text-xs text-amber-400 font-mono">Lv. {{ currentLevel }}</span>
                </h3>
              </div>
              <div class="text-right">
                <div class="text-[10px] text-gray-400">实时战斗力评分</div>
                <div class="text-2xl font-black text-amber-300 font-mono">{{ computedCombatPower }}</div>
              </div>
            </div>

            <!-- 核心血量与法力值 -->
            <div class="space-y-2 text-xs">
              <div class="p-3 bg-red-950/30 rounded-xl border border-red-900/40 flex items-center justify-between">
                <div>
                  <span class="text-gray-400 block text-[10px]">HP 当前总生命上限</span>
                  <strong class="text-2xl font-black text-red-400 font-mono">{{ computedFinalHP.toLocaleString() }}</strong>
                </div>
                <n-tag size="small" type="error">生命潜能</n-tag>
              </div>

              <div class="p-3 bg-cyan-950/30 rounded-xl border border-cyan-900/40 flex items-center justify-between">
                <div>
                  <span class="text-gray-400 block text-[10px]">MP 当前总魔力上限</span>
                  <strong class="text-2xl font-black text-cyan-300 font-mono">{{ computedFinalMP.toLocaleString() }}</strong>
                </div>
                <n-tag size="small" type="info">法力池</n-tag>
              </div>
            </div>

            <!-- 六维面板 -->
            <div class="grid grid-cols-3 gap-2 text-xs text-center">
              <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                <span class="text-[10px] text-gray-400 block">力量</span>
                <strong class="text-red-400 text-base font-mono">{{ computedFinalSTR }}</strong>
              </div>
              <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
                <span class="text-[10px] text-gray-400 block">敏捷</span>
                <strong class="text-green-400 text-base font-mono">{{ computedFinalAGI }}</strong>
              </div>
              <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
                <span class="text-[10px] text-gray-400 block">体质</span>
                <strong class="text-amber-400 text-base font-mono">{{ computedFinalVIT }}</strong>
              </div>
              <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
                <span class="text-[10px] text-gray-400 block">魔力</span>
                <strong class="text-cyan-400 text-base font-mono">{{ computedFinalMAG }}</strong>
              </div>
              <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
                <span class="text-[10px] text-gray-400 block">精神</span>
                <strong class="text-blue-400 text-base font-mono">{{ computedFinalSPR }}</strong>
              </div>
              <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
                <span class="text-[10px] text-gray-400 block">物攻</span>
                <strong class="text-yellow-300 text-base font-mono">{{ computedPAtk }}</strong>
              </div>
            </div>
          </div>

          <!-- 修改前后对照表 (Before VS After) -->
          <n-card title="📊 修改前后数值差异对比 (Before VS After)" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-2xl">
            <div class="space-y-2 text-xs">
              <div class="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">生命值 (HP):</span>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400 line-through font-mono">{{ originalBaseHP }}</span>
                  <span class="text-green-400 font-bold font-mono">&rarr; {{ computedFinalHP.toLocaleString() }}</span>
                </div>
              </div>

              <div class="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">力量 (STR):</span>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400 line-through font-mono">{{ originalBaseSTR }}</span>
                  <span class="text-green-400 font-bold font-mono">&rarr; {{ computedFinalSTR }}</span>
                </div>
              </div>

              <div class="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">敏捷 (AGI):</span>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400 line-through font-mono">{{ originalBaseAGI }}</span>
                  <span class="text-green-400 font-bold font-mono">&rarr; {{ computedFinalAGI }}</span>
                </div>
              </div>

              <div class="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">体质 (VIT):</span>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400 line-through font-mono">{{ originalBaseVIT }}</span>
                  <span class="text-green-400 font-bold font-mono">&rarr; {{ computedFinalVIT }}</span>
                </div>
              </div>

              <div class="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">魔力 (MAG):</span>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400 line-through font-mono">{{ originalBaseMAG }}</span>
                  <span class="text-green-400 font-bold font-mono">&rarr; {{ computedFinalMAG }}</span>
                </div>
              </div>

              <div class="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">精神 (SPR):</span>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400 line-through font-mono">{{ originalBaseSPR }}</span>
                  <span class="text-green-400 font-bold font-mono">&rarr; {{ computedFinalSPR }}</span>
                </div>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>

    <!-- 模式 2: GM 内存补丁与无敌沙盘 -->
    <div v-if="activeModeTab === 'memory_patch'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>💾</span> GM 内存锁定补丁沙盘 (Memory Patch & God Mode Sandbox)
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              模拟经典单机调试器内存地址劫持，直接锁定生命值防死、无限法力、99999 斩杀判定与全地形穿墙。
            </p>
          </div>
          <n-button size="small" round secondary type="error" @click="resetMemoryPatches">
            解除全部内存锁定
          </n-button>
        </div>

        <!-- 内存锁定开关矩阵 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="patch in memoryPatches"
            :key="patch.id"
            class="p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3"
            :class="patch.active
              ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
              : 'bg-slate-950/70 border-slate-800'"
          >
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                  {{ patch.address }}
                </span>
                <n-switch v-model:value="patch.active" size="small" @update:value="onPatchToggle(patch)" />
              </div>
              <h4 class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{{ patch.icon }}</span>
                <span>{{ patch.title }}</span>
              </h4>
              <p class="text-xs text-gray-400 leading-relaxed">{{ patch.desc }}</p>
            </div>
            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>字节码: <strong class="text-amber-400">{{ patch.opcode }}</strong></span>
              <span :class="patch.active ? 'text-emerald-400' : 'text-gray-400'">{{ patch.active ? '● LOCKED' : '○ UNLOCKED' }}</span>
            </div>
          </div>
        </div>

        <!-- 十六进制内存视图仿真监视器 -->
        <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-gray-200 flex items-center gap-1.5 font-mono">
              <span>🖥️</span> 角色结构体十六进制 RAM 快照 (Offset: 0x007FFF00)
            </span>
            <span class="text-gray-500 text-[10px] font-mono">32 Bytes Block</span>
          </div>
          <pre class="text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed bg-black/60 p-3 rounded-lg border border-slate-900">{{ hexDumpText }}</pre>
        </div>
      </div>
    </div>

    <!-- 模式 3: 金手指代码与作弊指令生成器 -->
    <div v-if="activeModeTab === 'cheat_codes'" class="space-y-6">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🎰</span> Action Replay & CLI 作弊指令代码生成器
            </h3>
            <p class="text-xs text-gray-400 mt-1">
              自动生成兼容经典金手指（Game Genie / Action Replay）格式与 Godot 开发者命令行指令代码。
            </p>
          </div>
          <n-button size="small" round secondary type="info" @click="copyAllCheatCodes">
            <template #icon><span>📋</span></template>
            一键复制所有代码
          </n-button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="cheat in cheatCodes"
            :key="cheat.id"
            class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{{ cheat.icon }}</span>
                <span>{{ cheat.name }}</span>
              </span>
              <n-tag size="tiny" type="warning" round>{{ cheat.category }}</n-tag>
            </div>
            <p class="text-xs text-gray-400 leading-relaxed">{{ cheat.desc }}</p>
            <div class="p-2.5 bg-slate-900/90 rounded border border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-300">
              <code>{{ cheat.code }}</code>
              <button
                type="button"
                class="text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer ml-2 shrink-0"
                @click="copySingleCheat(cheat.code)"
              >
                复制
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模式 4: Godot 4.x GM 调试控制台源码 -->
    <div v-if="activeModeTab === 'engine_code'" class="space-y-4">
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                GODOT 4.X GM CONSOLE ENGINE
              </span>
              <h3 class="text-base font-bold text-white">gm_debugger_console.gd</h3>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              内置反作弊穿透、波浪键 (~) 弹出控制台、实时角色属性修改与上帝模式开关单例。
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
import { useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'
import { WORLD_SCENES } from '../config/scenesConfig'

const route = useRoute()
const gameStore = useGameStore()
const message = useMessage()

// 模式切换
type ModeTab = 'stat_editor' | 'memory_patch' | 'cheat_codes' | 'engine_code'
const activeModeTab = ref<ModeTab>('stat_editor')
const tabList: { key: ModeTab; label: string; icon: string; badge?: string }[] = [
  { key: 'stat_editor', label: '属性修改与求解', icon: '🛠️' },
  { key: 'memory_patch', label: '内存补丁沙盘', icon: '💾', badge: 'HOT' },
  { key: 'cheat_codes', label: '金手指指令库', icon: '🎰' },
  { key: 'engine_code', label: 'GM控制台源码', icon: '💻' }
]

const characters = computed(() => gameStore.db.characters || [])
const selectedCharId = ref('li_chuan')
const currentLevel = ref(1)

const currentChar = computed(() => {
  return characters.value.find((c: any) => c.id === selectedCharId.value) || characters.value[0]
})

// 场景与地下城推荐等级列表
const baseSceneOptions = [
  { label: '始源神殿外围 (序章启程 · 推荐 Lv.1~5)', value: 'map-intro', level: 1, name: '始源神殿外围' },
  { label: '风之神殿 顶部神圣祭坛 (推荐 Lv.10)', value: 'wind-shrine', level: 10, name: '风之神殿' },
  { label: '托尔纳运河 水道 (推荐 Lv.15)', value: 'torna-canal', level: 15, name: '托尔纳运河' },
  { label: '沃鲁斯水之塔 (推荐 Lv.20)', value: 'worus-water', level: 20, name: '沃鲁斯水之塔' },
  { label: '卡尔纳克城堡 逃生倒计时 (推荐 Lv.28)', value: 'karnak-castle', level: 28, name: '卡尔纳克城堡' },
  { label: '古代大图书馆 (推荐 Lv.35)', value: 'ancient-library', level: 35, name: '古代大图书馆' },
  { label: '朗卡浮空遗迹 核心中枢 (推荐 Lv.45)', value: 'ronka-ruins', level: 45, name: '朗卡浮空遗迹' },
  { label: '穆亚大森林 圣树封印 (推荐 Lv.55)', value: 'moore-forest', level: 55, name: '穆亚大森林' },
  { label: '艾克斯德斯要塞 虚空王座 (推荐 Lv.70)', value: 'exdeath-castle', level: 70, name: '艾克斯德斯要塞' },
  { label: '双子分歧之塔 魔物分流 (推荐 Lv.85)', value: 'fork-tower', level: 85, name: '双子分歧之塔' },
  { label: '大海沟熔岩地宫 深渊 (推荐 Lv.100)', value: 'great-trench', level: 100, name: '大海沟熔岩地宫' },
  { label: '沉没沃鲁斯塔 模仿士试炼 (推荐 Lv.115)', value: 'sunken-worus', level: 115, name: '沉没沃鲁斯塔' },
  { label: '翡翠冥河通道 (推荐 Lv.135)', value: 'emerald-river', level: 135, name: '翡翠冥河通道' },
  { label: '万魔殿 冥界王座 (推荐 Lv.160)', value: 'pandemonium', level: 160, name: '万魔殿' },
  { label: '奈落地狱 熔岩十层 (推荐 Lv.185)', value: 'naraku-abyss', level: 185, name: '奈落地狱' },
  { label: '天空要塞浮游城 (推荐 Lv.210)', value: 'floating-city', level: 210, name: '天空要塞浮游城' },
  { label: '月之地下溪谷 12F 龙穴 (推荐 Lv.235)', value: 'lunar-valley', level: 235, name: '月之地下溪谷 12F' },
  { label: '次元之隙 & 终焉虚无核心 (满级极意 · 推荐 Lv.255)', value: 'void-core', level: 255, name: '次元之隙 & 终焉虚无核心' }
]

const sceneOptions = computed(() => {
  const sceneId = route.query.sceneId
  const scene = typeof sceneId === 'string' ? WORLD_SCENES.find(item => item.id === sceneId) : undefined
  if (!scene || baseSceneOptions.some(item => item.value === scene.id)) return baseSceneOptions
  return [...baseSceneOptions, {
    label: `${scene.name} (推荐 Lv.${scene.recommendedLevel})`,
    value: scene.id,
    level: scene.recommendedLevel,
    name: scene.name
  }]
})

const selectedSceneId = ref('wind-shrine')

const currentSceneName = computed(() => {
  return sceneOptions.value.find(s => s.value === selectedSceneId.value)?.name || '风之神殿'
})

const currentSceneLevel = computed(() => {
  return sceneOptions.value.find(s => s.value === selectedSceneId.value)?.level || 10
})

const handleSceneChange = (val: string) => {
  selectedSceneId.value = val
}

const applySceneLevel = () => {
  currentLevel.value = currentSceneLevel.value
  message.success(`已应用场景【${currentSceneName.value}】推荐等级: Lv.${currentSceneLevel.value}`)
}

// 属性编辑状态
const editStats = reactive({
  strBase: 25,
  strGrowth: 3,
  agiBase: 20,
  agiGrowth: 2,
  vitBase: 22,
  vitGrowth: 3,
  magBase: 15,
  magGrowth: 2,
  sprBase: 18,
  sprGrowth: 2,
  hpBase: 120,
  hpGrowth: 45
})

const handleSelectChar = (charId: string) => {
  selectedCharId.value = charId
  const c = characters.value.find((item: any) => item.id === charId)
  if (c && c.stats) {
    editStats.strBase = c.stats.str || 25
    editStats.strGrowth = 3
    editStats.agiBase = c.stats.agi || 20
    editStats.agiGrowth = 2
    editStats.vitBase = c.stats.vit || 22
    editStats.vitGrowth = 3
    editStats.magBase = c.stats.mag || 15
    editStats.magGrowth = 2
    editStats.sprBase = c.stats.spr || 18
    editStats.sprGrowth = 2
    editStats.hpBase = (c as any).hp || (c.stats as any)?.hp || 120
    editStats.hpGrowth = 45
  }
}

// 逆向求解器
const targetInputHP = ref<number | null>(500)
const targetInputSTR = ref<number | null>(null)
const reverseSolvedLevel = ref(10)

const handleReverseHPInput = (val: number | null) => {
  if (val && val > 0) {
    targetInputSTR.value = null
    const diff = val - editStats.hpBase
    const calculated = Math.max(1, Math.min(255, Math.ceil(diff / editStats.hpGrowth) + 1))
    reverseSolvedLevel.value = calculated
  }
}

const handleReverseSTRInput = (val: number | null) => {
  if (val && val > 0) {
    targetInputHP.value = null
    const diff = val - editStats.strBase
    const calculated = Math.max(1, Math.min(255, Math.ceil(diff / editStats.strGrowth) + 1))
    reverseSolvedLevel.value = calculated
  }
}

const quickSetHP = (hp: number) => {
  targetInputHP.value = hp
  handleReverseHPInput(hp)
}

const getEstimatedHP = (level: number) => {
  return editStats.hpBase + (level - 1) * editStats.hpGrowth
}

const applyReverseLevel = () => {
  currentLevel.value = reverseSolvedLevel.value
  message.success(`已成功设置角色等级为求解值 Lv.${reverseSolvedLevel.value}`)
}

// 计算最终数值
const computedFinalHP = computed(() => editStats.hpBase + (currentLevel.value - 1) * editStats.hpGrowth)
const computedFinalMP = computed(() => 50 + (currentLevel.value - 1) * 12 + editStats.magBase * 2)
const computedFinalSTR = computed(() => editStats.strBase + (currentLevel.value - 1) * editStats.strGrowth)
const computedFinalAGI = computed(() => editStats.agiBase + (currentLevel.value - 1) * editStats.agiGrowth)
const computedFinalVIT = computed(() => editStats.vitBase + (currentLevel.value - 1) * editStats.vitGrowth)
const computedFinalMAG = computed(() => editStats.magBase + (currentLevel.value - 1) * editStats.magGrowth)
const computedFinalSPR = computed(() => editStats.sprBase + (currentLevel.value - 1) * editStats.sprGrowth)
const computedPAtk = computed(() => Math.round(computedFinalSTR.value * 1.5 + computedFinalAGI.value * 0.5))
const computedCombatPower = computed(() => {
  return Math.round(
    computedFinalHP.value * 0.15 +
    computedFinalMP.value * 0.2 +
    computedFinalSTR.value * 4 +
    computedFinalAGI.value * 3.5 +
    computedFinalVIT.value * 3.5 +
    computedFinalMAG.value * 4 +
    computedFinalSPR.value * 3.5
  )
})

// 原版对照
const originalBaseHP = computed(() => (currentChar.value as any)?.hp || (currentChar.value?.stats as any)?.hp || 120)
const originalBaseSTR = computed(() => currentChar.value?.stats?.str || 25)
const originalBaseAGI = computed(() => currentChar.value?.stats?.agi || 20)
const originalBaseVIT = computed(() => currentChar.value?.stats?.vit || 22)
const originalBaseMAG = computed(() => currentChar.value?.stats?.mag || 15)
const originalBaseSPR = computed(() => currentChar.value?.stats?.spr || 18)

const handleSaveAndApply = () => {
  message.success(`已保存【${currentChar.value?.name}】全域属性修改配置并生效`)
}

const handleMaxOverpower = () => {
  currentLevel.value = 255
  editStats.strBase = 99
  editStats.strGrowth = 8
  editStats.hpBase = 9999
  editStats.hpGrowth = 350
  message.warning('已注入巅峰超神模式：等级 255 属性拉满！')
}

const handleResetDefault = () => {
  currentLevel.value = 1
  handleSelectChar(selectedCharId.value)
  message.info('已恢复初始默认属性配置')
}

// 内存补丁状态
interface MemoryPatch {
  id: string
  address: string
  icon: string
  title: string
  desc: string
  opcode: string
  active: boolean
}

const memoryPatches = reactive<MemoryPatch[]>([
  {
    id: 'patch-infinite-hp',
    address: '0x007FFF04',
    icon: '❤️',
    title: '锁死生命值 (Infinite HP)',
    desc: '角色生命值永远冻结在 9999 / 9999，遭受任何神罚与灭团技能均不会扣除生命。',
    opcode: 'NOP NOP (0x9090)',
    active: false
  },
  {
    id: 'patch-infinite-mp',
    address: '0x007FFF08',
    icon: '💧',
    title: '无限法力值 (Infinite MP)',
    desc: '所有禁咒、九阶魔法与召唤兽极意消耗的 MP 判定归零，随心无限倾泻陨石。',
    opcode: 'MOV EAX, 0x270F',
    active: false
  },
  {
    id: 'patch-one-hit-kill',
    address: '0x007FFF0C',
    icon: '⚡',
    title: '一击必杀 (One Hit Kill 99999)',
    desc: '我方任意物理攻击或法术判定强制突破四位数上限，造成 99,999 真实伤害。',
    opcode: 'CALL 0x008A2010',
    active: false
  },
  {
    id: 'patch-ghost-walk',
    address: '0x007FFF10',
    icon: '👻',
    title: '全地形幽灵穿墙 (No Collision)',
    desc: '关闭大地图与地下城岩壁、深海和熔岩碰撞判定，随意飞跃所有阻挡图块。',
    opcode: 'JMP 0x0041B880',
    active: false
  },
  {
    id: 'patch-exp-x16',
    address: '0x007FFF14',
    icon: '📈',
    title: '经验值 16 倍狂飙 (EXP Multiplier x16)',
    desc: '战斗结算后所有角色获得的 EXP 自动位移 4 位 (×16)，秒速升至 255 级。',
    opcode: 'SHL EAX, 0x04',
    active: false
  },
  {
    id: 'patch-max-gold',
    address: '0x007FFF18',
    icon: '💰',
    title: '无限金币钱袋 (Max Gil 99,999,999)',
    desc: '背包钱袋数据锁死在上限 99,999,999 Gil，买空全大陆商店与黑市。',
    opcode: 'MOV [EDI], 0x05F5E0FF',
    active: false
  }
])

const onPatchToggle = (patch: MemoryPatch) => {
  if (patch.active) {
    message.warning(`内存补丁【${patch.title}】已注入内存挂载点 ${patch.address}`)
  } else {
    message.info(`已卸载内存补丁 ${patch.title}`)
  }
}

const resetMemoryPatches = () => {
  memoryPatches.forEach(p => p.active = false)
  message.success('已解除所有内存挂载锁定')
}

const hexDumpText = computed(() => {
  return `0x007FFF00  ${currentLevel.value.toString(16).padStart(2, '0').toUpperCase()} 00 00 00  ${computedFinalHP.value.toString(16).padStart(4, '0').toUpperCase()} 27 0F  ${computedFinalMP.value.toString(16).padStart(4, '0').toUpperCase()} 03 E7  |....HP..MP..|
0x007FFF10  ${computedFinalSTR.value.toString(16).padStart(2, '0').toUpperCase()} ${computedFinalAGI.value.toString(16).padStart(2, '0').toUpperCase()} ${computedFinalVIT.value.toString(16).padStart(2, '0').toUpperCase()} ${computedFinalMAG.value.toString(16).padStart(2, '0').toUpperCase()}  ${computedFinalSPR.value.toString(16).padStart(2, '0').toUpperCase()} 18 00 00  FF E0 F5 05  90 90 C3 00  |..VIT.MAG.SPR...|`
})

// 金手指代码
const cheatCodes = [
  { id: 'cc-hp', name: '无限生命全员锁死', category: 'Action Replay', code: '01007FFF 0000270F', desc: '全队四人 HP 强制锁定 9999', icon: '❤️' },
  { id: 'cc-mp', name: '无限 MP 魔法零耗', category: 'Action Replay', code: '01007FFF 000003E7', desc: 'MP 强制锁定 999', icon: '💧' },
  { id: 'cc-gil', name: '最高持有金币', category: 'Action Replay', code: '02007FF8 05F5E0FF', desc: '持有 99,999,999 Gil', icon: '💰' },
  { id: 'cc-item', name: '七色稀有尾巴各99个', category: 'Godot CLI', code: 'give_tail_relics --all --count 99', desc: '注入所有太古封印交换材料', icon: '🦚' },
  { id: 'cc-kill', name: '全屏敌怪即刻斩杀', category: 'Godot CLI', code: 'battle.kill_all_enemies()', desc: '直接触发胜利结算', icon: '⚔️' },
  { id: 'cc-tp', name: '传送至终焉虚无核心', category: 'Godot CLI', code: 'teleport_to_map("void-core")', desc: '无视门禁直接到达最终决战', icon: '🌌' }
]

const copySingleCheat = (code: string) => {
  navigator.clipboard.writeText(code).then(() => {
    message.success(`已复制指令: ${code}`)
  })
}

const copyAllCheatCodes = () => {
  const all = cheatCodes.map(c => `[${c.category}] ${c.name}: ${c.code}`).join('\n')
  navigator.clipboard.writeText(all).then(() => {
    message.success('已复制全部金手指指令到剪贴板！')
  })
}

// Godot 4.x 代码
const gdScriptCode = `# ==============================================================================
# GMDebuggerConsole - 游戏底层 GM 调试控制台与内存补丁控制器
# 文件路径: res://scripts/debug/gm_debugger_console.gd
# 架构定位: 支持波浪键 (~) 弹出控制台、CLI 调试指令解析与上帝模式状态机
# ==============================================================================
class_name GMDebuggerConsole
extends CanvasLayer

signal god_mode_toggled(is_enabled: bool)
signal cheat_applied(command_name: String, args: Array)

var is_god_mode_active: bool = false
var is_one_hit_kill_active: bool = false
var is_noclip_active: bool = false

@onready var console_input: LineEdit = $Panel/LineEdit
@onready var output_log: RichTextLabel = $Panel/RichTextLabel

func _ready() -> void:
	visible = false
	process_mode = Node.PROCESS_MODE_ALWAYS # 暂停时依然可响应

func _input(event: InputEvent) -> void:
	if event is InputEventKey and event.pressed and not event.echo:
		if event.keycode == KEY_QUOTELEFT: # 波浪键 ~
			toggle_console()

func toggle_console() -> void:
	visible = not visible
	if visible:
		console_input.grab_focus()
		get_tree().paused = true
	else:
		get_tree().paused = false

## 执行调试指令解析
func execute_command(cmd_string: String) -> void:
	var parts := cmd_string.strip_edges().split(" ")
	if parts.is_empty():
		return
		
	var cmd: String = parts[0].to_lower()
	var args: Array = parts.slice(1)
	
	match cmd:
		"god":
			is_god_mode_active = not is_god_mode_active
			emit_signal("god_mode_toggled", is_god_mode_active)
			_log("[GM] 上帝模式状态: %s" % ("已激活 (无敌)" if is_god_mode_active else "已关闭"))
		"set_level":
			if args.size() >= 2:
				var hero_id: String = args[0]
				var lv: int = clampi(int(args[1]), 1, 255)
				_apply_level(hero_id, lv)
		"kill_all":
			_kill_all_enemies()
		"tp":
			if args.size() >= 1:
				_teleport_to(args[0])
		"help":
			_log("可用指令: god, set_level <hero> <lv>, kill_all, tp <scene_id>, help")
		_:
			_log("[GM 错误] 未知指令: %s" % cmd)

func _apply_level(hero_id: String, lv: int) -> void:
	# 动态修改角色数据结构体
	_log("[GM] 英雄 %s 等级已调节至: Lv.%d" % [hero_id, lv])

func _kill_all_enemies() -> void:
	var battle := get_node_or_null("/root/BattleEngine")
	if battle and battle.has_method("force_clear_wave"):
		battle.force_clear_wave()
		_log("[GM] 战场所有敌对目标已清除")

func _teleport_to(scene_id: String) -> void:
	_log("[GM] 正在安全跃迁至场景: %s" % scene_id)

func _log(text: String) -> void:
	output_log.append_text(text + "\\n")
`

const copyGdScript = () => {
  navigator.clipboard.writeText(gdScriptCode).then(() => {
    message.success('gm_debugger_console.gd 源码已复制到剪贴板！')
  }).catch(() => {
    message.info('源码已复制')
  })
}
</script>

<style scoped>
.modifier-page {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
