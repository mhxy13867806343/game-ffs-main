<template>
  <div class="modifier-page p-3 sm:p-5 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-red-950/70 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.2)] relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/3 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono font-bold text-xs border border-red-500/30">
              VBLE GM Memory Hot-Patch, Stat Uncap Injection & Anti-Cheat Debugger Studio v2.2.342
            </span>
            <span class="text-xs text-gray-400">1~255级属性解限、GM内存热补丁与底层反作弊调试工坊</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🛠️</span> 全域属性修改器：GM 内存热补丁与极值调试工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
            支持直接修改英雄 1 级基础属性与成长步进、输入血量/力量实时逆向反推等级、无敌/一击必杀 GM 内存锁定、微秒级汇编 Patch 动态热重载与影子镜像防崩审计沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="error"
            size="medium"
            round
            class="shadow-md font-bold text-white bg-gradient-to-r from-red-500 to-amber-600 hover:from-red-400 hover:to-amber-500"
            @click="scrollToGmMemoryPatchStudio"
          >
            <template #icon><span>💾</span></template>
            GM内存热补丁工坊
          </n-button>
          <router-link to="/vble/characters">
            <n-button type="info" size="medium" round secondary class="shadow-md">
              <template #icon><span>👥</span></template>
              英雄传记
            </n-button>
          </router-link>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToAffixAlchemyStudio"
          >
            <template #icon><span>🛠️</span></template>
            词缀炼金工坊
          </n-button>
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

    <!-- 装备词缀修改器、全域数值配方推演与安全篡改审计工坊 (v2.2.314 重磅实装) -->
    <div id="affix-alchemy-studio" class="affix-alchemy-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-amber-950/20 to-slate-900/95 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
              AFFIX ALCHEMY & ANTI-TAMPER AUDIT
            </span>
            <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
              v2.2.314 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>🛠️</span> 装备词缀修改器、全域数值配方推演与安全篡改审计工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            系统支持装备多重前缀/后缀炼金注入、数值膨胀动态平抑、镜像内存差分防作弊校验与 Godot 4.6 LTS 底层 GM 调试单例联动，兼顾开发调试自由度与生产环境绝对安全性。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="warning" @click="resetAffixAlchemyDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="warning" :loading="isModifierSimulating" @click="runAffixAlchemySimulation">
            <template #icon><span>⚡</span></template>
            启动词缀炼金全流程推演
          </n-button>
        </div>
      </div>

      <!-- 四大修改器流派原型卡 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="archetype in modifierArchetypes"
          :key="archetype.id"
          @click="selectModifierArchetype(archetype)"
          :class="[
            'p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden',
            selectedModifierArchetype.id === archetype.id
              ? 'bg-amber-950/40 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
          ]"
        >
          <div class="flex items-center justify-between">
            <span class="text-xl">{{ archetype.icon }}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">{{ archetype.badge }}</span>
          </div>
          <div class="font-bold text-white text-sm mt-2">{{ archetype.name }}</div>
          <div class="text-xs text-gray-400 mt-1 leading-relaxed">{{ archetype.desc }}</div>
          <div class="mt-3 text-[11px] font-mono text-amber-400/90 flex justify-between">
            <span>峰值伤害: {{ archetype.dmg }}</span>
            <span>防篡改: {{ archetype.security }}</span>
          </div>
        </div>
      </div>

      <!-- 核心微调滑块与调控开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800">
        <!-- 4 维连续滑块 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>⚙️</span> 词缀炼金与调试时钟参数调谐
          </div>
          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>装备附加词缀槽位深度 (Affix Slot Depth)</span>
                <span class="font-mono text-amber-400 font-bold">{{ affixSlotDepth }} 槽位</span>
              </div>
              <n-slider v-model:value="affixSlotDepth" :min="1" :max="8" :step="1" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>内存篡改安全防御阈值 (Anti-Tamper Sensitivity)</span>
                <span class="font-mono text-cyan-400 font-bold">{{ antiTamperSensitivity }} %</span>
              </div>
              <n-slider v-model:value="antiTamperSensitivity" :min="50" :max="99" :step="1" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>数值膨胀平抑抑制系数 (Dampening Factor)</span>
                <span class="font-mono text-emerald-400 font-bold">{{ dampeningFactor.toFixed(1) }} x</span>
              </div>
              <n-slider v-model:value="dampeningFactor" :min="0.5" :max="3.0" :step="0.1" />
            </div>
            <div>
              <div class="flex justify-between text-gray-300 mb-1">
                <span>GM 调试控制台时钟频率 (Clock Frequency)</span>
                <span class="font-mono text-purple-400 font-bold">{{ consoleClockFreq }} Hz</span>
              </div>
              <n-slider v-model:value="consoleClockFreq" :min="30" :max="240" :step="10" />
            </div>
          </div>
        </div>

        <!-- 3 维调控开关与动态指标 -->
        <div class="space-y-4">
          <div class="text-xs font-bold text-cyan-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <span>🛡️</span> 内存防篡改与安全守卫
          </div>
          <div class="space-y-2.5 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">内存双向镜像热补丁差分校验</div>
                <div class="text-[10px] text-gray-400">维持主副本双镜像，非法第三方内存挂钩直接丢弃并自愈</div>
              </div>
              <n-switch v-model:value="enableDualMirrorChecksum" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">词条突破装备品质上限天花板</div>
                <div class="text-[10px] text-gray-400">允许普通白装注入太古神级词条，解禁 99999 攻击上限</div>
              </div>
              <n-switch v-model:value="enableBreakAffixCap" />
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
              <div>
                <div class="text-gray-200 font-semibold">异常数值溢出自动毫秒级规整保护</div>
                <div class="text-[10px] text-gray-400">浮点数越界 (NaN/Inf) 时立即自动钳制在合法工程区间内</div>
              </div>
              <n-switch v-model:value="enableAutoClampOverflow" />
            </div>
          </div>

          <!-- 4 维解算核心指标 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">理论峰值伤害</div>
              <div class="text-base font-black font-mono text-amber-400 mt-0.5">{{ calculatedPeakDmg }}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">防篡改安全度</div>
              <div class="text-base font-black font-mono text-cyan-400 mt-0.5">{{ calculatedSecurityRate }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">词缀炼金纯度</div>
              <div class="text-base font-black font-mono text-emerald-400 mt-0.5">{{ calculatedAlchemyPurity }} %</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">GM调试权限</div>
              <div class="text-xs font-black font-mono text-purple-400 mt-1">{{ calculatedGmCert }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 五阶段沙盘推演进度条与终端控制台 -->
      <div class="space-y-3 bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="text-amber-400 font-mono font-bold">STAGE {{ modifierSimStage }}/5</span>
            <span class="text-gray-300">{{ modifierSimStageName }}</span>
          </div>
          <span class="font-mono text-cyan-400">{{ modifierSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="modifierSimProgress"
          :color="'#f59e0b'"
          :rail-color="'#1e293b'"
          :height="8"
          :show-indicator="false"
          border-radius="4px"
        />

        <div class="h-32 bg-slate-900/90 rounded-lg p-3 font-mono text-xs overflow-y-auto space-y-1 text-gray-300 border border-slate-800/80">
          <div v-for="(log, idx) in modifierLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-gray-500 shrink-0">[{{ log.time }}]</span>
            <span :class="log.color">{{ log.text }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <div class="text-gray-400 font-mono">
            <span>防伪校验凭证: </span>
            <span class="text-amber-400 font-bold">{{ modifierCertHash }}</span>
          </div>
          <n-button size="tiny" secondary type="warning" round @click="exportModifierCert">
            <template #icon><span>📜</span></template>
            导出词缀炼金推演报告 (SHA-256)
          </n-button>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                GODOT 4.6 LTS MOD ENGINE
              </span>
              <span class="text-sm font-bold text-white">词缀炼金注入与安全审计实机驱动</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              提供生产级装备词缀注入器、内存篡改审计守卫与速通场景穿梭控制器实机代码。
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button
              v-for="codeTab in modifierCodeTabs"
              :key="codeTab.id"
              size="tiny"
              round
              :type="activeModifierCodeTab === codeTab.id ? 'warning' : 'default'"
              :secondary="activeModifierCodeTab !== codeTab.id"
              @click="activeModifierCodeTab = codeTab.id"
            >
              {{ codeTab.name }}
            </n-button>
            <n-button size="tiny" round secondary type="info" @click="copyActiveModifierCode">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed max-h-[420px]">{{ currentModifierCode }}</pre>
      </div>
    </div>

    <!-- 全域独立 GM 内存热补丁控制台、属性解限注入沙箱与底层反作弊调试工坊 (v2.2.342 重磅实装) -->
    <div id="gm-memory-patch-studio" class="gm-memory-patch-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-red-950/20 to-slate-900/95 border border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.18)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-red-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono text-xs font-bold border border-red-500/30">
              GM MEMORY HOT-PATCH & STAT UNCAP SANDBOX
            </span>
            <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
              v2.2.342 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide mt-2 flex items-center gap-2">
            <span>💾</span> 全域独立 GM 内存热补丁控制台、属性解限注入沙箱与底层反作弊调试工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
            支持针对当前出战英雄进行微秒级内存虚拟寻址、注入无敌创世态/一击必杀超频、旁路技能公共冷却，并配合影子内存镜像差分校验实现防崩溃热重载，附带 SHA-256 GM 调试授权凭证签发。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="warning" @click="resetGmPatchStudio">
            <template #icon><span>🔄</span></template>
            重置参数
          </n-button>
          <n-button
            size="small"
            round
            type="error"
            class="bg-gradient-to-r from-red-600 to-amber-600 font-bold text-white shadow-lg shadow-red-500/20"
            :loading="simulatingGmPatch"
            @click="runSimulatedGmPatch"
          >
            <template #icon><span>⚡</span></template>
            执行内存注入与沙箱推演
          </n-button>
        </div>
      </div>

      <!-- 4 维 GM 调试注入预设卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          v-for="arch in gmModArchetypes"
          :key="arch.id"
          class="p-4 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between"
          :class="selectedGmArchetype === arch.id
            ? 'bg-red-950/40 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] ring-1 ring-red-400'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'"
          @click="selectedGmArchetype = arch.id"
        >
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-red-300 border border-red-500/20">
                {{ arch.badge }}
              </span>
              <span class="text-xs text-gray-400 font-mono">{{ arch.targetHook }}</span>
            </div>
            <div class="text-sm font-bold text-white flex items-center gap-1.5 pt-1">
              <span>{{ arch.icon }}</span>
              <span>{{ arch.name }}</span>
            </div>
            <p class="text-xs text-gray-400 leading-relaxed">{{ arch.desc }}</p>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>{{ arch.coreMetricLabel }}</span>
            <span class="text-red-400 font-bold">{{ arch.coreMetricVal }}</span>
          </div>
        </div>
      </div>

      <!-- 参数微调滑块与逻辑开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/60 p-4 sm:p-6 rounded-xl border border-slate-800/80">
        <!-- 4 滑块 -->
        <div class="lg:col-span-7 space-y-4">
          <div class="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
            <span>⚙️</span> GM 内存指针寻址与极值注入参数
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">内存热补丁注入深度 (Injection Depth):</span>
              <span class="font-mono text-red-400 font-bold">{{ memoryInjectionLevel }} 级 (虚表寻址)</span>
            </div>
            <n-slider v-model:value="memoryInjectionLevel" :min="1" :max="10" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>1 级 (堆浅层属性)</span>
              <span>5 级 (虚函数表拦截)</span>
              <span>10 级 (内核微秒汇编热重载)</span>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">ATB 频率超频倍率 (Overclock Rate):</span>
              <span class="font-mono text-red-400 font-bold">{{ atbSpeedOverclock }}%</span>
            </div>
            <n-slider v-model:value="atbSpeedOverclock" :min="100" :max="5000" :step="100" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>100% 标准基线</span>
              <span>1500% 极速轮转</span>
              <span>5000% 绝对时停先攻</span>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">全局属性倍率扩张 (Stat Multiplier):</span>
              <span class="font-mono text-red-400 font-bold">{{ statMultiplier }}x 阶梯倍率</span>
            </div>
            <n-slider v-model:value="statMultiplier" :min="1" :max="100" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>1x 原版数值</span>
              <span>25x 副本碾压</span>
              <span>100x 宇宙创世纪极值</span>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">调试环境反作弊旁路容限 (Bypass Tolerance):</span>
              <span class="font-mono text-red-400 font-bold">{{ antiCheatTolerance }}%</span>
            </div>
            <n-slider v-model:value="antiCheatTolerance" :min="50" :max="100" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>50% 敏感阻断</span>
              <span>80% 开发白名单</span>
              <span>100% 影子全放行</span>
            </div>
          </div>
        </div>

        <!-- 3 开关与实时演算看板 -->
        <div class="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
              <span>🛡️</span> GM 锁定与安全审计开关
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div>
                <div class="text-xs font-bold text-gray-200">锁死全队 HP/MP 绝对极值</div>
                <div class="text-[10px] text-gray-500">血量与魔力动态冻结为 99,999,999</div>
              </div>
              <n-switch v-model:value="lockHeroHpMp" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div>
                <div class="text-xs font-bold text-gray-200">旁路全技能冷却与咏唱耗时</div>
                <div class="text-[10px] text-gray-500">GCD 强制置 0，所有奥义全时段瞬发</div>
              </div>
              <n-switch v-model:value="bypassCooldowns" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div>
                <div class="text-xs font-bold text-gray-200">开启影子内存差分审计</div>
                <div class="text-[10px] text-gray-500">双副本镜像隔离校验，杜绝 NaN 崩溃</div>
              </div>
              <n-switch v-model:value="enableShadowAudit" size="small" />
            </div>
          </div>

          <!-- 4 项实时数学衍生指标 -->
          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">瞬时战力峰值</div>
              <div class="text-base font-black text-red-400 font-mono mt-0.5">{{ peakCombatPower }} Pt</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">单击极值估算</div>
              <div class="text-base font-black text-amber-400 font-mono mt-0.5">{{ maxHitDamage }} Dmg</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">内存注入延迟</div>
              <div class="text-base font-black text-cyan-400 font-mono mt-0.5">{{ injectionLatencyUs }}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div class="text-[10px] text-gray-400">沙箱稳态指数</div>
              <div class="text-base font-black text-emerald-400 font-mono mt-0.5">{{ sandboxStabilityIndex }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5 阶段流水线演练进度与实时推演控制台 -->
      <div class="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>📊</span> GM 内存热重载五阶段注入流水线
            </span>
            <span v-if="simulatingGmPatch" class="text-[10px] font-mono text-cyan-400 animate-pulse">
              [INJECTION PIPELINE EXECUTING STAGE {{ gmPatchStep }}/5]
            </span>
          </div>
          <div class="text-xs text-gray-400 font-mono">
            当前预设: <span class="text-red-300 font-bold">{{ activeGmArchetypeObj?.name }}</span>
          </div>
        </div>

        <n-progress
          type="line"
          :percentage="simulatingGmPatch ? gmPatchStep * 20 : 100"
          :status="simulatingGmPatch ? 'info' : 'success'"
          :color="'#ef4444'"
          :rail-color="'#1e293b'"
          :height="8"
          :show-indicator="false"
          border-radius="4px"
        />

        <div class="h-32 bg-slate-900/90 rounded-lg p-3 font-mono text-xs overflow-y-auto space-y-1 text-gray-300 border border-slate-800/80">
          <div v-for="(log, idx) in gmPatchLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-gray-500 shrink-0">[{{ log.time }}]</span>
            <span :class="log.color">{{ log.text }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <div class="text-gray-400 font-mono">
            <span>防伪调试授权凭证: </span>
            <span class="text-red-400 font-bold">{{ gmCertHash }}</span>
          </div>
          <n-button size="tiny" secondary type="warning" round @click="exportGmCert">
            <template #icon><span>📜</span></template>
            导出全景 GM 内存注入与沙箱调试报告 (SHA-256)
          </n-button>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                GODOT 4.6 LTS GM ENGINE
              </span>
              <span class="text-sm font-bold text-white">底层 GM 内存热补丁与沙箱实机驱动</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              提供生产级 GM 内存动态寻址与热补丁注入控制器、属性解限注入管线与影子内存镜像比对审计器。
            </p>
          </div>
          <div class="flex items-center gap-2">
            <n-button
              v-for="codeTab in gmCodeTabs"
              :key="codeTab.id"
              size="tiny"
              round
              :type="activeGmCodeTab === codeTab.id ? 'error' : 'default'"
              :secondary="activeGmCodeTab !== codeTab.id"
              @click="activeGmCodeTab = codeTab.id"
            >
              {{ codeTab.name }}
            </n-button>
            <n-button size="tiny" round secondary type="info" @click="copyActiveGmCode">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-red-300 overflow-x-auto leading-relaxed max-h-[420px]">{{ currentGmCode }}</pre>
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

// ==================== v2.2.314 词缀炼金与审计工坊状态与方法 ====================
const scrollToAffixAlchemyStudio = () => {
  const el = document.getElementById('affix-alchemy-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    message.success('已直达装备词缀炼金与安全审计工坊')
  }
}

interface ModifierArchetype {
  id: string
  name: string
  icon: string
  badge: string
  desc: string
  dmg: string
  security: string
  depth: number
  sensitivity: number
  dampening: number
  clock: number
}

const modifierArchetypes: ModifierArchetype[] = [
  {
    id: 'god_mode_sandbox',
    name: '极限无敌沙盒流',
    icon: '⚡',
    badge: '单局调试',
    desc: 'HP 锁死 99999，全状态免疫，提供纯粹的机制破坏性压测环境。',
    dmg: '99,999,999',
    security: '85.0%',
    depth: 4,
    sensitivity: 65,
    dampening: 1.0,
    clock: 60
  },
  {
    id: 'affix_alchemy',
    name: '词缀炼金极意流',
    icon: '⚗️',
    badge: '多词条注入',
    desc: '突破传统4词缀上限，8重太古神级前缀后缀无损叠加。',
    dmg: '12,450,000',
    security: '94.2%',
    depth: 8,
    sensitivity: 85,
    dampening: 1.8,
    clock: 120
  },
  {
    id: 'anti_cheat_audit',
    name: '内存篡改差分审计流',
    icon: '🛡️',
    badge: '防御加固',
    desc: '镜像内存差分校验，毫秒级拦截第三方作弊挂钩并自愈。',
    dmg: '850,000',
    security: '99.9%',
    depth: 2,
    sensitivity: 98,
    dampening: 2.5,
    clock: 144
  },
  {
    id: 'speedrun_utility',
    name: '速通辅助穿梭流',
    icon: '🚀',
    badge: '极速跃迁',
    desc: '坐标任意跃迁，场景秒切与遇敌率动态调控，测试效率拉满。',
    dmg: '4,500,000',
    security: '92.0%',
    depth: 5,
    sensitivity: 75,
    dampening: 1.2,
    clock: 180
  }
]

const selectedModifierArchetype = ref<ModifierArchetype>(modifierArchetypes[1])

const affixSlotDepth = ref(8)
const antiTamperSensitivity = ref(85)
const dampeningFactor = ref(1.8)
const consoleClockFreq = ref(120)

const enableDualMirrorChecksum = ref(true)
const enableBreakAffixCap = ref(true)
const enableAutoClampOverflow = ref(true)

const selectModifierArchetype = (arch: ModifierArchetype) => {
  selectedModifierArchetype.value = arch
  affixSlotDepth.value = arch.depth
  antiTamperSensitivity.value = arch.sensitivity
  dampeningFactor.value = arch.dampening
  consoleClockFreq.value = arch.clock
  message.info(`已装配修改器原型: ${arch.name}`)
}

const resetAffixAlchemyDefaults = () => {
  selectModifierArchetype(modifierArchetypes[1])
  enableDualMirrorChecksum.value = true
  enableBreakAffixCap.value = true
  enableAutoClampOverflow.value = true
}

const calculatedPeakDmg = computed(() => {
  if (selectedModifierArchetype.value.id === 'god_mode_sandbox') return '99,999,999'
  let baseDmg = 500000 * affixSlotDepth.value * dampeningFactor.value
  if (enableBreakAffixCap.value) baseDmg *= 1.75
  return Math.floor(baseDmg).toLocaleString()
})

const calculatedSecurityRate = computed(() => {
  let rate = 70 + (antiTamperSensitivity.value / 99) * 25
  if (enableDualMirrorChecksum.value) rate += 4.5
  return Math.min(99.9, Number(rate.toFixed(1)))
})

const calculatedAlchemyPurity = computed(() => {
  let p = 60 + (affixSlotDepth.value / 8) * 35
  if (enableAutoClampOverflow.value) p += 4.0
  return Math.min(99.9, Number(p.toFixed(1)))
})

const calculatedGmCert = computed(() => {
  const sec = calculatedSecurityRate.value
  if (sec >= 98.5) return 'EX·太古造物主调试权'
  if (sec >= 95.0) return 'SSS·高可用内存审计'
  if (sec >= 90.0) return 'SS·生产级调试沙盒'
  return 'S·基础控制台授权'
})

const isModifierSimulating = ref(false)
const modifierSimStage = ref(1)
const modifierSimStageName = ref('就绪等待')
const modifierSimProgress = ref(0)
const modifierCertHash = ref('A1B2C3D4-E5F6-4A7B-8C9D-0E1F2A3B4C5D')

interface ModifierLogEntry {
  time: string
  text: string
  color: string
}

const modifierLogs = ref<ModifierLogEntry[]>([
  { time: '13:00:00', text: '[ModifierInit] 词缀炼金与内存调试引擎就绪，等待注入数值配方...', color: 'text-gray-400' }
])

const runAffixAlchemySimulation = () => {
  if (isModifierSimulating.value) return
  isModifierSimulating.value = true
  modifierSimStage.value = 1
  modifierSimProgress.value = 15
  modifierSimStageName.value = '内存双向镜像热补丁建立与差分基准校验'
  modifierLogs.value = [
    { time: new Date().toLocaleTimeString(), text: '[MirrorMemory] 建立角色结构体双副本校验，防篡改防御阈值 ' + antiTamperSensitivity.value + '%', color: 'text-amber-400' }
  ]

  setTimeout(() => {
    modifierSimStage.value = 2
    modifierSimProgress.value = 40
    modifierSimStageName.value = '多重词缀槽位炼金注入与天花板解限'
    modifierLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[AffixInject] 开启 ${affixSlotDepth.value} 个词缀槽位，注入太古词条，天花板破除状态: ${enableBreakAffixCap.value}`,
      color: 'text-cyan-400'
    })
  }, 400)

  setTimeout(() => {
    modifierSimStage.value = 3
    modifierSimProgress.value = 65
    modifierSimStageName.value = '数值膨胀平抑抑制与溢出毫秒级规整'
    modifierLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[Dampening] 平抑系数 ${dampeningFactor.value.toFixed(1)}x 生效，理论峰值伤害锁定 ${calculatedPeakDmg.value}`,
      color: 'text-emerald-400'
    })
  }, 800)

  setTimeout(() => {
    modifierSimStage.value = 4
    modifierSimProgress.value = 85
    modifierSimStageName.value = 'GM 控制台时钟拓扑与指令调度封板'
    modifierLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[ConsoleClock] 调试时钟锁定 ${consoleClockFreq.value} Hz，炼金纯度 ${calculatedAlchemyPurity.value}%`,
      color: 'text-purple-400'
    })
  }, 1200)

  setTimeout(() => {
    modifierSimStage.value = 5
    modifierSimProgress.value = 100
    modifierSimStageName.value = '推演闭环完成，防伪证书已签名'
    const hex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('').toUpperCase()
    modifierCertHash.value = `MOD-${hex}-${Math.floor(Date.now() / 1000)}`
    modifierLogs.value.push({
      time: new Date().toLocaleTimeString(),
      text: `[Done] 词缀炼金推演完成！权限认证: ${calculatedGmCert.value}`,
      color: 'text-emerald-300 font-bold'
    })
    isModifierSimulating.value = false
    message.success('词缀炼金与内存调试推演完成！')
  }, 1600)
}

const exportModifierCert = () => {
  const data = {
    studio: 'Affix Alchemy Modifier, Stat Formulation & Anti-Tamper Audit Studio v2.2.314',
    timestamp: new Date().toISOString(),
    archetype: selectedModifierArchetype.value.name,
    affixSlotDepth: affixSlotDepth.value,
    antiTamperSensitivity: antiTamperSensitivity.value,
    dampeningFactor: dampeningFactor.value,
    consoleClockFreq: consoleClockFreq.value,
    peakDmg: calculatedPeakDmg.value,
    securityRate: calculatedSecurityRate.value,
    alchemyPurity: calculatedAlchemyPurity.value,
    gmCert: calculatedGmCert.value,
    sha256Signature: modifierCertHash.value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `affix-modifier-${modifierCertHash.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('防伪证书与词缀炼金报告已导出')
}

// Godot 4.6 LTS 源码展台
const activeModifierCodeTab = ref('affix_injector')
const modifierCodeTabs = [
  { id: 'affix_injector', name: '装备词缀炼金注入器' },
  { id: 'anti_tamper_guard', name: '内存篡改审计守卫' },
  { id: 'speedrun_warp', name: '速通场景穿梭控制器' }
]

const modifierSourceCodes: Record<string, string> = {
  affix_injector: `## affix_alchemy_injector.gd
## 《光之战士：时空裂隙》装备词缀炼金注入器与属性上限解限器
## 架构版本: Godot 4.6 LTS / Equipment Modifier Engine

class_name AffixAlchemyInjector
extends RefCounted

signal affix_injected(equipment_id: String, affix_name: String, stat_boost: float)
signal cap_overdriven(equipment_id: String, max_dmg: int)

var _max_slots: int = 8
var _allow_cap_overdrive: bool = true

func _init(slots: int = 8, cap_overdrive: bool = true) -> void:
	_max_slots = slots
	_allow_cap_overdrive = cap_overdrive

## 向指定神兵注入太古词缀
func inject_affix_to_item(item_data: Dictionary, affix: Dictionary) -> Dictionary:
	var result := item_data.duplicate(true)
	if not result.has("affixes"):
		result["affixes"] = []
		
	if result["affixes"].size() >= _max_slots:
		push_warning("[AffixInjector] 槽位已达上限 (%d/%d)" % [result["affixes"].size(), _max_slots])
		return result
		
	result["affixes"].append(affix)
	affix_injected.emit(result.get("id", "UNKNOWN"), affix.get("name", "AFFIX"), affix.get("value", 1.0))
	
	if _allow_cap_overdrive:
		result["damage_cap"] = 99999999
		cap_overdriven.emit(result.get("id", "UNKNOWN"), 99999999)
		
	return result
`,
  anti_tamper_guard: `## memory_tamper_audit_guard.gd
## 《光之战士：时空裂隙》双镜像内存校验与非法挂钩自愈守卫
## 架构版本: Godot 4.6 LTS / Security Subsystem

class_name MemoryTamperAuditGuard
extends RefCounted

signal tamper_intercepted(address_offset: String, original_val: int, altered_val: int)
signal memory_healed(address_offset: String)

var _primary_memory: Dictionary = {}
var _shadow_mirror: Dictionary = {}
var _sensitivity: float = 0.85

## 注册监测数据项并创建双镜像
func register_protected_value(key: String, initial_val: int) -> void:
	_primary_memory[key] = initial_val
	_shadow_mirror[key] = initial_val

## 周期性差分校验
func audit_memory_integrity() -> bool:
	var is_clean := true
	for k in _primary_memory.keys():
		if _primary_memory[k] != _shadow_mirror[k]:
			tamper_intercepted.emit(k, _shadow_mirror[k], _primary_memory[k])
			# 执行自愈回滚
			_primary_memory[k] = _shadow_mirror[k]
			memory_healed.emit(k)
			is_clean = false
	return is_clean
`,
  speedrun_warp: `## gm_speedrun_warp_controller.gd
## 《光之战士：时空裂隙》GM 速通测试场景跃迁与坐标穿梭控制器
## 架构版本: Godot 4.6 LTS / GM Diagnostics

class_name GMSpeedrunWarpController
extends RefCounted

signal warped_to_scene(scene_id: String, coord_x: float, coord_y: float)

## 安全无缝跃迁至目标地下城/大地图
func teleport_party(target_scene: String, pos_x: float = 0.0, pos_y: float = 0.0) -> void:
	var scene_path := "res://scenes/%s.tscn" % target_scene
	if not ResourceLoader.exists(scene_path):
		push_error("[GM Warp] 场景不存在: %s" % scene_path)
		return
		
	warped_to_scene.emit(target_scene, pos_x, pos_y)
`
}

const currentModifierCode = computed(() => {
  return modifierSourceCodes[activeModifierCodeTab.value] || ''
})

const copyActiveModifierCode = () => {
  navigator.clipboard.writeText(currentModifierCode.value).then(() => {
    message.success(`${activeModifierCodeTab.value}.gd 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}

// ==========================================
// v2.2.342: 全域独立 GM 内存热补丁与沙箱调试工坊
// ==========================================
interface GmModArchetype {
  id: 'quantum_invincible' | 'hyper_burst_one_hit' | 'infinite_atb_action' | 'void_loot_multi'
  name: string
  badge: string
  targetHook: string
  icon: string
  desc: string
  coreMetricLabel: string
  coreMetricVal: string
}

const gmModArchetypes: GmModArchetype[] = [
  {
    id: 'quantum_invincible',
    name: '太古创世无敌态',
    badge: 'GM OMNIPOTENCE',
    targetHook: 'Entity.take_damage()',
    icon: '🛡️',
    desc: '锁死 HP 99,999,999、MP 9,999,999、双防 99,999，免疫一切异常状态与真实穿透伤害。',
    coreMetricLabel: '绝对生存率',
    coreMetricVal: '100.00%'
  },
  {
    id: 'hyper_burst_one_hit',
    name: '神威解限一击必杀',
    badge: 'GM ANNIHILATION',
    targetHook: 'DamageFormula.eval()',
    icon: '⚡',
    desc: '全系穿透强制 100%、暴击率 100%、暴击倍率 1,000%，单击伤害突破 9,999,999 阈值上限。',
    coreMetricLabel: '破限斩杀倍率',
    coreMetricVal: '1000.0x'
  },
  {
    id: 'infinite_atb_action',
    name: '零延迟时空时停先攻',
    badge: 'GM CHRONO WARP',
    targetHook: 'ATBTimeline.advance()',
    icon: '⏳',
    desc: 'ATB 初始填充速度提升 5,000%、咏唱与冷却耗时 0 帧、全队连续无间隙抢占回合先攻。',
    coreMetricLabel: '行动帧先攻',
    coreMetricVal: '0 Frame'
  },
  {
    id: 'void_loot_multi',
    name: '虚空千倍聚敛宝库',
    badge: 'GM TREASURY',
    targetHook: 'DropTable.resolve()',
    icon: '💎',
    desc: '金币获取倍率 x100、稀有神装掉落率 100%、无限装备强化晶石、洗练词缀必定全满。',
    coreMetricLabel: '神级掉落率',
    coreMetricVal: '100.00%'
  }
]

const selectedGmArchetype = ref<'quantum_invincible' | 'hyper_burst_one_hit' | 'infinite_atb_action' | 'void_loot_multi'>('quantum_invincible')
const memoryInjectionLevel = ref(8)
const atbSpeedOverclock = ref(1500)
const statMultiplier = ref(10)
const antiCheatTolerance = ref(95)

const lockHeroHpMp = ref(true)
const bypassCooldowns = ref(true)
const enableShadowAudit = ref(true)

const activeGmArchetypeObj = computed(() => {
  return gmModArchetypes.find(a => a.id === selectedGmArchetype.value) || gmModArchetypes[0]
})

const peakCombatPower = computed(() => {
  const base = 999999
  const mult = statMultiplier.value * (memoryInjectionLevel.value * 0.8)
  const val = Math.min(99999999, Math.round(base * mult))
  return val.toLocaleString()
})

const maxHitDamage = computed(() => {
  const base = 850000
  const mult = (statMultiplier.value * 1.5) * (atbSpeedOverclock.value / 1000)
  const val = Math.min(99999999, Math.round(base * mult))
  return val.toLocaleString()
})

const injectionLatencyUs = computed(() => {
  const lat = 1.2 + (memoryInjectionLevel.value * 0.35)
  return `${lat.toFixed(1)} μs`
})

const sandboxStabilityIndex = computed(() => {
  const stab = 98.5 + (antiCheatTolerance.value * 0.014)
  return `${Math.min(99.99, stab).toFixed(2)}%`
})

const simulatingGmPatch = ref(false)
const gmPatchStep = ref(0)
const gmCertHash = ref('GM-SHA256-4F1E902B7D6C')

const gmPatchLogs = ref<Array<{ time: string; text: string; color: string }>>([
  { time: 'INIT', text: 'GM 独立内存控制台已接入当前出战英雄虚拟地址空间。', color: 'text-red-400' },
  { time: 'STANDBY', text: '影子内存镜像已建立基线，等待动态 Patch 注入指令。', color: 'text-gray-400' }
])

const scrollToGmMemoryPatchStudio = () => {
  const el = document.getElementById('gm-memory-patch-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    message.info('已定位至全域独立 GM 内存热补丁工坊')
  }
}

const resetGmPatchStudio = () => {
  selectedGmArchetype.value = 'quantum_invincible'
  memoryInjectionLevel.value = 8
  atbSpeedOverclock.value = 1500
  statMultiplier.value = 10
  antiCheatTolerance.value = 95
  lockHeroHpMp.value = true
  bypassCooldowns.value = true
  enableShadowAudit.value = true
  gmCertHash.value = 'GM-SHA256-4F1E902B7D6C'
  gmPatchLogs.value = [
    { time: 'RESET', text: 'GM 调试沙箱已恢复初始安全稳态。', color: 'text-amber-400' },
    { time: 'READY', text: '内存挂钩与虚表指针已复位至默认偏移量。', color: 'text-red-400' }
  ]
  message.success('GM 内存热补丁工坊参数已重置！')
}

const runSimulatedGmPatch = () => {
  if (simulatingGmPatch.value) return
  simulatingGmPatch.value = true
  gmPatchStep.value = 1
  gmPatchLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    text: `[Stage 1/5] 动态寻址出战角色核心结构体指针 (Level: ${memoryInjectionLevel.value})...`,
    color: 'text-red-300'
  })

  setTimeout(() => {
    gmPatchStep.value = 2
    gmPatchLogs.value.unshift({
      time: new Date().toLocaleTimeString(),
      text: `[Stage 2/5] 建立只读备份影子内存，计算 CRC32 与 SHA-256 (Audit: ${enableShadowAudit.value ? '已激活' : '旁路'})...`,
      color: 'text-amber-300'
    })
  }, 400)

  setTimeout(() => {
    gmPatchStep.value = 3
    gmPatchLogs.value.unshift({
      time: new Date().toLocaleTimeString(),
      text: `[Stage 3/5] 动态注入字节码 Patch (属性扩张 ${statMultiplier.value}x, ATB超频 ${atbSpeedOverclock.value}%)...`,
      color: 'text-orange-400'
    })
  }, 800)

  setTimeout(() => {
    gmPatchStep.value = 4
    gmPatchLogs.value.unshift({
      time: new Date().toLocaleTimeString(),
      text: `[Stage 4/5] 验证阶梯溢出边界 (瞬时战力峰值 ${peakCombatPower.value} Pt, 抑制崩溃与 NaN)...`,
      color: 'text-red-400'
    })
  }, 1200)

  setTimeout(() => {
    gmPatchStep.value = 5
    const hash = 'GM-SHA256-' + Math.random().toString(16).substring(2, 10).toUpperCase() + Math.random().toString(16).substring(2, 6).toUpperCase()
    gmCertHash.value = hash
    gmPatchLogs.value.unshift({
      time: new Date().toLocaleTimeString(),
      text: `[Stage 5/5] 内存热注入完成！已颁发数字调试凭证: ${hash}，沙箱稳态率: ${sandboxStabilityIndex.value}！`,
      color: 'text-emerald-400 font-bold'
    })
    simulatingGmPatch.value = false
    message.success(`GM 内存热补丁注入成功！凭证: ${hash}`)
  }, 1600)
}

const exportGmCert = () => {
  const content = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   全域独立 GM 内存热补丁与沙箱调试授权报告 (v2.2.342)
================================================================================
凭证编号: ${gmCertHash.value}
生成时间: ${new Date().toISOString()}
调试预设: ${activeGmArchetypeObj.value.name} (${activeGmArchetypeObj.value.badge})
挂钩目标: ${activeGmArchetypeObj.value.targetHook}

【核心注入与超频指标】
- 内存热补丁注入深度: ${memoryInjectionLevel.value} 级
- ATB 频率超频倍率: ${atbSpeedOverclock.value}%
- 全局属性倍率扩张: ${statMultiplier.value}x
- 调试环境反作弊旁路容限: ${antiCheatTolerance.value}%
- 瞬时战力峰值: ${peakCombatPower.value} Pt
- 单击极值估算: ${maxHitDamage.value} Dmg
- 内存注入响应延迟: ${injectionLatencyUs.value}
- 沙箱稳态指数: ${sandboxStabilityIndex.value}

【GM 锁定与安全审计开关】
- 锁死全队 HP/MP 绝对极值: ${lockHeroHpMp.value ? '启用' : '禁用'}
- 旁路全技能冷却与咏唱: ${bypassCooldowns.value ? '启用' : '禁用'}
- 开启影子内存差分审计: ${enableShadowAudit.value ? '启用' : '禁用'}

【底层实机驱动】
- gm_memory_hotpatch_controller.gd
- stat_uncap_injection_pipeline.gd
- shadow_memory_audit_guard.gd
================================================================================`

  navigator.clipboard.writeText(content).then(() => {
    message.success('全景 GM 内存注入与调试报告已复制到剪贴板！')
  }).catch(() => {
    message.info('报告已复制')
  })
}

const gmCodeTabs = [
  { id: 'controller', name: 'gm_memory_hotpatch_controller.gd' },
  { id: 'pipeline', name: 'stat_uncap_injection_pipeline.gd' },
  { id: 'guard', name: 'shadow_memory_audit_guard.gd' }
] as const

type GmCodeTabType = (typeof gmCodeTabs)[number]['id']
const activeGmCodeTab = ref<GmCodeTabType>('controller')

const gmSourceCodes: Record<GmCodeTabType, string> = {
  controller: `## gm_memory_hotpatch_controller.gd
## 《光之战士：时空裂隙》GM 内存动态寻址与热补丁注入控制器
## 架构版本: Godot 4.6 LTS / GM Debug Subsystem

class_name GMMemoryHotpatchController
extends RefCounted

signal patch_injected(hook_name: String, patch_size: int, status: bool)
signal memory_pointer_resolved(target_id: String, vtable_addr: int)

var _injection_level: int = 8
var _active_hooks: Dictionary = {}

func _init(injection_level: int = 8) -> void:
	_injection_level = injection_level

## 针对出战实体注入热补丁
func inject_hook(target_entity: Object, hook_id: String, patch_data: Dictionary) -> bool:
	if not is_instance_valid(target_entity):
		push_error("[GM Patch] 实体指针无效，放弃注入")
		return false

	var instance_id := target_entity.get_instance_id()
	_active_hooks[hook_id] = {
		"instance_id": instance_id,
		"patch": patch_data,
		"timestamp": Time.get_ticks_usec()
	}

	memory_pointer_resolved.emit(hook_id, instance_id)
	patch_injected.emit(hook_id, patch_data.size(), true)
	return true

## 移除注入的热补丁，恢复原始指令流
func revert_hook(hook_id: String) -> void:
	if _active_hooks.has(hook_id):
		_active_hooks.erase(hook_id)
		patch_injected.emit(hook_id, 0, false)
`,
  pipeline: `## stat_uncap_injection_pipeline.gd
## 《光之战士：时空裂隙》属性极值突破与动态倍率解算管线
## 架构版本: Godot 4.6 LTS / Stat Engine Subsystem

class_name StatUncapInjectionPipeline
extends RefCounted

signal stat_uncapped(stat_name: String, raw_val: int, injected_val: int)

var _multiplier: float = 10.0
var _hp_mp_locked: bool = true
const UNCAP_LIMIT: int = 99_999_999

func _init(mult: float = 10.0, lock_extremes: bool = true) -> void:
	_multiplier = mult
	_hp_mp_locked = lock_extremes

## 动态解算注入后的角色属性
func calculate_injected_stat(stat_type: String, base_val: int) -> int:
	if _hp_mp_locked and (stat_type == "hp" or stat_type == "mp"):
		stat_uncapped.emit(stat_type, base_val, UNCAP_LIMIT)
		return UNCAP_LIMIT

	var boosted := int(float(base_val) * _multiplier)
	var final_val := clampi(boosted, 1, UNCAP_LIMIT)
	stat_uncapped.emit(stat_type, base_val, final_val)
	return final_val
`,
  guard: `## shadow_memory_audit_guard.gd
## 《光之战士：时空裂隙》影子内存镜像比对与防崩防作弊审计器
## 架构版本: Godot 4.6 LTS / Security Subsystem

class_name ShadowMemoryAuditGuard
extends RefCounted

signal audit_completed(is_safe: bool, drift_delta: float)
signal anomaly_detected(reason: String)

var _shadow_mirror: Dictionary = {}
var _tolerance: float = 0.95

func _init(tolerance: float = 0.95) -> void:
	_tolerance = tolerance

## 捕获当前内存镜像基线快照
func capture_snapshot(tag: String, state_data: Dictionary) -> void:
	_shadow_mirror[tag] = state_data.duplicate(true)

## 比对内存影子差分，检测 NaN 或越界异常
func verify_stability(tag: String, current_state: Dictionary) -> bool:
	if not _shadow_mirror.has(tag):
		return true

	for key in current_state.keys():
		var val = current_state[key]
		if typeof(val) == TYPE_FLOAT and (is_nan(val) or is_inf(val)):
			anomaly_detected.emit("数值溢出 NaN/Inf 在键: %s" % key)
			audit_completed.emit(false, 1.0)
			return false

	audit_completed.emit(true, 0.0)
	return true
`
}

const currentGmCode = computed(() => {
  return gmSourceCodes[activeGmCodeTab.value] || ''
})

const copyActiveGmCode = () => {
  navigator.clipboard.writeText(currentGmCode.value).then(() => {
    message.success(`${activeGmCodeTab.value}.gd 源码已复制到剪贴板！`)
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
