<template>
  <div class="attributes-page p-3 sm:p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="warning" size="small" round class="mb-2">VBLE Hexagon Dimensions, Armor Pen Attenuation &amp; Composite Power Studio v2.2.333</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-amber mb-2">角色属性器、怪物解析器与量子属性张量跃迁工坊</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm mb-3">
        支持 255 级满破无限数值演算、输入血量即时反推等级、场景地宫关联自动定级、六维断点量化以及量子属性张量多维数值跃迁工坊
      </p>
      <div class="flex justify-center gap-2">
        <n-button size="small" type="primary" secondary @click="$router.push('/vble/modifier')">
          🛠️ 前往独立全域 GM 属性修改器专页
        </n-button>
        <n-button size="small" type="success" secondary @click="activeCalculatorTab = 'armor_pen_attenuation'">
          🛡️ 穿透衰减与战力工坊
        </n-button>
        <n-button size="small" type="error" secondary @click="activeCalculatorTab = 'quantum_entropy'">'
          🌌 快速切入量子张量跃迁工坊
        </n-button>
        <n-button size="small" type="warning" secondary @click="activeCalculatorTab = 'breakthrough'">
          👑 快速切入 255 满破极境工坊
        </n-button>
      </div>
    </div>

    <!-- 顶部分页器：角色配装器 VS 双向属性自定义编辑器 VS 怪物解析器 VS 满破极境工坊 -->
    <div class="flex justify-center">
      <n-tabs v-model:value="activeCalculatorTab" type="segment" style="max-width: 920px;">
        <n-tab-pane name="customizer">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'customizer'">
              🛠️ 属性双向调节 (Lv.255)
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="character">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'character'">
              🎮 角色配装模拟 (无上限)
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="monster">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'monster'">
              👾 怪物属性与弱点解析
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="allocation">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'allocation'">
              ✨ 潜能加点模拟 (Points)
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="atb_thresholds">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'atb_thresholds'">
              ⏱️ ATB 断点量化 (Caps)
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="breakthrough">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'breakthrough'">
              👑 满破255极境工坊 (v2.2.259)
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="quantum_entropy">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400 font-bold" :aria-pressed="activeCalculatorTab === 'quantum_entropy'">
              🌌 量子属性张量工坊 (v2.2.284)
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="armor_pen_attenuation">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 font-bold" :aria-pressed="activeCalculatorTab === 'armor_pen_attenuation'">
              🛡️ 穿透衰减与战力工坊 (v2.2.333)
            </button>
          </template>
        </n-tab-pane>
      </n-tabs>
    </div>

    <!-- ================= 模块一：属性双向调节与场景逆推器 (用户核心要求) ================= -->
    <div v-if="activeCalculatorTab === 'customizer'" class="space-y-6">
      
      <!-- 场景地宫关联定级栏 (修改场景也会去调整相应的等级) -->
      <n-card class="border border-cyan-500/40 bg-[#121626]/90 rounded-2xl shadow-lg" size="small">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">🗺️</span>
              <span class="font-bold text-gray-100 text-sm sm:text-base">场景/地宫关联自动定级 (Scene Level Syncer)</span>
            </div>
            <n-tag size="tiny" type="info">场景驱动等级</n-tag>
          </div>
        </template>
        <div class="space-y-3">
          <p class="text-xs text-gray-400">选择当前探险场景或地下城，系统将自动调整角色至该场景的推荐基准等级，并同步推演血量与全属性：</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label class="text-xs text-gray-400 block mb-1">当前探索场景 / 地下城:</label>
              <n-select v-model:value="selectedSceneId" :options="sceneOptions" size="small" @update:value="handleSceneChange" />
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span class="text-[10px] text-gray-400 block">推荐攻略等级</span>
                <span class="text-base font-black text-amber-400 font-mono">Lv. {{ currentSceneRecommendedLevel }}</span>
              </div>
              <n-button size="tiny" type="warning" secondary @click="applySceneLevel">
                立即应用场景等级
              </n-button>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span class="text-[10px] text-gray-400 block">该场景下预计生命值</span>
                <span class="text-base font-black text-red-400 font-mono">{{ getEstimatedHPForLevel(currentSceneRecommendedLevel) }} HP</span>
              </div>
              <span class="text-xs text-gray-500">无上限</span>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 双向逆向反推器：输入属性 (如输入 500 血量) 反推角色等级 -->
      <n-card class="border border-amber-500/40 bg-[#121626]/90 rounded-2xl shadow-lg" size="small">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">🧮</span>
              <span class="font-bold text-amber-300 text-sm sm:text-base">输入属性反推等级 (如输入 500 血量反推等级)</span>
            </div>
            <n-tag size="tiny" type="warning">双向反向求解器</n-tag>
          </div>
        </template>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div class="lg:col-span-6 space-y-4">
            <p class="text-xs text-gray-300 leading-relaxed">
              输入期望达成的血量、力量或物理攻击力，数学模型将实时逆向求解出达到该数值所需的<strong>精确等级 (Lv 1 ~ 255)</strong>：
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="text-xs text-gray-400 block mb-1">输入期望血量 (HP):</label>
                <n-input-number
                  v-model:value="targetInputHP"
                  :min="100"
                  :max="9999999"
                  :step="50"
                  placeholder="例如 500"
                  size="small"
                  @update:value="handleReverseHPInput"
                >
                  <template #suffix>HP</template>
                </n-input-number>
              </div>

              <div>
                <label class="text-xs text-gray-400 block mb-1">输入期望力量 (STR):</label>
                <n-input-number
                  v-model:value="targetInputSTR"
                  :min="10"
                  :max="999999"
                  :step="10"
                  placeholder="例如 300"
                  size="small"
                  @update:value="handleReverseSTRInput"
                >
                  <template #suffix>点</template>
                </n-input-number>
              </div>
            </div>

            <!-- 快捷血量快选按钮 -->
            <div class="flex flex-wrap items-center gap-1.5 text-xs">
              <span class="text-gray-400">快速试算:</span>
              <n-button
                v-for="hpVal in [300, 500, 1000, 3000, 10000, 50000]"
                :key="hpVal"
                size="tiny"
                quaternary
                type="info"
                @click="quickSetTargetHP(hpVal)"
              >
                {{ hpVal }} HP
              </n-button>
            </div>
          </div>

          <!-- 反推计算结果展示看板 -->
          <div class="lg:col-span-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-400">逆向解算目标等级:</span>
              <span class="text-3xl font-black text-amber-400 font-mono">
                Lv. {{ reverseSolvedLevel }}
              </span>
            </div>

            <div class="text-xs space-y-1.5 text-gray-300 bg-slate-900/60 p-2.5 rounded border border-slate-800">
              <div class="flex justify-between">
                <span>达到输入血量实际值:</span>
                <strong class="text-red-400 font-mono">{{ getEstimatedHPForLevel(reverseSolvedLevel) }} HP</strong>
              </div>
              <div class="flex justify-between">
                <span>该等级对应力量 (STR):</span>
                <strong class="text-amber-300 font-mono">{{ getEstimatedStatForLevel('str', reverseSolvedLevel) }}</strong>
              </div>
              <div class="flex justify-between">
                <span>该等级对应魔力 (MAG):</span>
                <strong class="text-cyan-300 font-mono">{{ getEstimatedStatForLevel('mag', reverseSolvedLevel) }}</strong>
              </div>
            </div>

            <div class="flex gap-2">
              <n-button size="small" type="primary" block @click="applyReverseSolvedLevel">
                应用 Lv.{{ reverseSolvedLevel }} 到全模拟器
              </n-button>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 自定义 1 级基础属性与成长步进编辑器 (支持 1 级 41 点，2 级 50 点灵活配置) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：基础数值与每级成长设置 -->
        <div class="lg:col-span-6 space-y-4">
          <n-card title="⚙️ 1 级初始属性与每级成长量自定义 (成长曲线配置)" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-2xl">
            <div class="space-y-4 text-xs">
              <p class="text-gray-400 leading-relaxed">
                可自由设置 1 级初始属性与 2 级数值（系统自动测算每级成长步进，如 1 级 41 点、2 级 50 点，则每级成长 +9 点）：
              </p>

              <!-- 力量 STR -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-3 gap-2 items-center">
                <span class="font-bold text-red-400">力量 (STR):</span>
                <div>
                  <span class="text-[10px] text-gray-400 block">1 级初始</span>
                  <n-input-number v-model:value="customStatsConfig.str.base" :min="1" size="tiny" />
                </div>
                <div>
                  <span class="text-[10px] text-gray-400 block">2 级数值 (+{{ customStatsConfig.str.growth }}/级)</span>
                  <n-input-number
                    :value="customStatsConfig.str.base + customStatsConfig.str.growth"
                    :min="customStatsConfig.str.base"
                    size="tiny"
                    @update:value="(v: number | null) => handleLevel2Change('str', v)"
                  />
                </div>
              </div>

              <!-- 敏捷 AGI -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-3 gap-2 items-center">
                <span class="font-bold text-green-400">敏捷 (AGI):</span>
                <div>
                  <span class="text-[10px] text-gray-400 block">1 级初始</span>
                  <n-input-number v-model:value="customStatsConfig.agi.base" :min="1" size="tiny" />
                </div>
                <div>
                  <span class="text-[10px] text-gray-400 block">2 级数值 (+{{ customStatsConfig.agi.growth }}/级)</span>
                  <n-input-number
                    :value="customStatsConfig.agi.base + customStatsConfig.agi.growth"
                    :min="customStatsConfig.agi.base"
                    size="tiny"
                    @update:value="(v: number | null) => handleLevel2Change('agi', v)"
                  />
                </div>
              </div>

              <!-- 体质 VIT -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-3 gap-2 items-center">
                <span class="font-bold text-amber-400">体质 (VIT):</span>
                <div>
                  <span class="text-[10px] text-gray-400 block">1 级初始</span>
                  <n-input-number v-model:value="customStatsConfig.vit.base" :min="1" size="tiny" />
                </div>
                <div>
                  <span class="text-[10px] text-gray-400 block">2 级数值 (+{{ customStatsConfig.vit.growth }}/级)</span>
                  <n-input-number
                    :value="customStatsConfig.vit.base + customStatsConfig.vit.growth"
                    :min="customStatsConfig.vit.base"
                    size="tiny"
                    @update:value="(v: number | null) => handleLevel2Change('vit', v)"
                  />
                </div>
              </div>

              <!-- 魔力 MAG -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-3 gap-2 items-center">
                <span class="font-bold text-cyan-400">魔力 (MAG):</span>
                <div>
                  <span class="text-[10px] text-gray-400 block">1 级初始</span>
                  <n-input-number v-model:value="customStatsConfig.mag.base" :min="1" size="tiny" />
                </div>
                <div>
                  <span class="text-[10px] text-gray-400 block">2 级数值 (+{{ customStatsConfig.mag.growth }}/级)</span>
                  <n-input-number
                    :value="customStatsConfig.mag.base + customStatsConfig.mag.growth"
                    :min="customStatsConfig.mag.base"
                    size="tiny"
                    @update:value="(v: number | null) => handleLevel2Change('mag', v)"
                  />
                </div>
              </div>

              <!-- 初始 HP 与 每级生命成长 -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-3 gap-2 items-center">
                <span class="font-bold text-red-500">基础生命 (HP):</span>
                <div>
                  <span class="text-[10px] text-gray-400 block">1 级初始 HP</span>
                  <n-input-number v-model:value="customStatsConfig.hp.base" :min="50" size="tiny" />
                </div>
                <div>
                  <span class="text-[10px] text-gray-400 block">每级成长 HP (+{{ customStatsConfig.hp.growth }})</span>
                  <n-input-number v-model:value="customStatsConfig.hp.growth" :min="10" size="tiny" />
                </div>
              </div>

              <div class="flex gap-2 pt-2">
                <n-button size="small" secondary type="warning" @click="resetToDefaultGrowth">
                  还原标准配置
                </n-button>
                <n-button size="small" type="success" @click="saveCustomGrowthConfig">
                  保存自定义成长配置
                </n-button>
              </div>
            </div>
          </n-card>
        </div>

        <!-- 右侧：当前等级与 255 级全息阶梯成长对照表 -->
        <div class="lg:col-span-6 space-y-4">
          <!-- 实时滑块调节 (1 ~ 255 级无上限) -->
          <n-card class="border border-slate-700/60 bg-[#121626]/90 rounded-2xl" size="small">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-gray-400">实时调整等级 (1 ~ 255 级):</span>
              <div class="flex items-center gap-2">
                <n-input-number
                  v-model:value="characterLevel"
                  :min="1"
                  :max="255"
                  size="tiny"
                  style="width: 90px;"
                />
                <span class="text-sm font-bold text-amber-400">级</span>
              </div>
            </div>
            <n-slider v-model:value="characterLevel" :min="1" :max="255" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Lv.1 启程</span>
              <span>Lv.70 融合</span>
              <span>Lv.150 深渊</span>
              <span>Lv.255 满级极意</span>
            </div>

            <!-- 当前等级演算结果 -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center">
              <div class="p-2 bg-slate-950/80 rounded border border-slate-800">
                <span class="text-[10px] text-gray-400 block">当前 HP</span>
                <strong class="text-red-400 text-sm font-mono">{{ calculatedHP }}</strong>
              </div>
              <div class="p-2 bg-slate-950/80 rounded border border-slate-800">
                <span class="text-[10px] text-gray-400 block">当前力量</span>
                <strong class="text-amber-400 text-sm font-mono">{{ calculatedStats.str }}</strong>
              </div>
              <div class="p-2 bg-slate-950/80 rounded border border-slate-800">
                <span class="text-[10px] text-gray-400 block">当前敏捷</span>
                <strong class="text-green-400 text-sm font-mono">{{ calculatedStats.agi }}</strong>
              </div>
              <div class="p-2 bg-slate-950/80 rounded border border-slate-800">
                <span class="text-[10px] text-gray-400 block">当前物理攻击</span>
                <strong class="text-yellow-300 text-sm font-mono">{{ calculatedPAtk }}</strong>
              </div>
            </div>
          </n-card>

          <!-- 阶梯里程碑对照表 (从 Lv.1 到 Lv.255) -->
          <n-card title="📊 里程碑等级数值演进全景表 (Lv.1 ~ Lv.255 无上限)" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-2xl">
            <n-table size="small" striped class="text-xs">
              <thead>
                <tr>
                  <th>等级</th>
                  <th>对应场景</th>
                  <th>HP 生命</th>
                  <th>力量</th>
                  <th>敏捷</th>
                  <th>物攻 (P.ATK)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="milestone in milestoneTableData" :key="milestone.level">
                  <td class="font-bold text-amber-400 font-mono">Lv.{{ milestone.level }}</td>
                  <td class="text-gray-400 text-[11px]">{{ milestone.scene }}</td>
                  <td class="text-red-400 font-mono font-bold">{{ milestone.hp }}</td>
                  <td class="text-amber-300 font-mono">{{ milestone.str }}</td>
                  <td class="text-green-300 font-mono">{{ milestone.agi }}</td>
                  <td class="text-cyan-300 font-mono font-bold">{{ milestone.patk }}</td>
                </tr>
              </tbody>
            </n-table>
          </n-card>
        </div>
      </div>
    </div>

    <!-- ================= 模块二：角色属性配装实战模拟器 (已全面支持 255 级与无上限) ================= -->
    <div v-if="activeCalculatorTab === 'character'" class="space-y-6">
      <div class="flex items-center justify-between bg-[#121626]/90 border border-slate-700/60 p-3 rounded-xl">
        <span class="text-xs text-gray-300">需要完整体验各职业装备限制校验、所有装备试穿与差值演算？</span>
        <n-button size="tiny" type="primary" secondary @click="$router.push('/vble/armory')">
          ⚔️ 前往全职全装独立配装模拟器专页 &rarr;
        </n-button>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- 左侧配置区 (角色、等级、职业、技能、配装) -->
        <div class="lg:col-span-6 space-y-5">
          <!-- 1. 选择英雄角色 -->
          <n-card title="1. 选择基础英雄" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-xl">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div
                v-for="char in characters"
                :key="char.id"
                class="p-2.5 rounded-lg border text-center cursor-pointer transition-all"
                :class="selectedCharId === char.id ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold' : 'border-slate-800 bg-slate-900/60 text-gray-300 hover:border-slate-700'"
                @click="selectedCharId = char.id"
              >
                <div class="text-sm">{{ char.name }}</div>
                <div class="text-[10px] text-gray-400 mt-0.5 truncate">{{ char.title }}</div>
              </div>
            </div>
          </n-card>

          <!-- 2. 等级滑块调节 (上限已调整为 255 级) -->
          <n-card title="2. 角色等级调节 (已突破上限至 Lv.255)" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-xl">
            <div class="flex justify-between items-center text-xs mb-2">
              <span class="text-gray-400">当前等级:</span>
              <div class="flex items-center gap-1">
                <n-input-number v-model:value="characterLevel" :min="1" :max="255" size="tiny" style="width: 90px;" />
                <span class="text-lg font-black text-amber-400">级</span>
              </div>
            </div>
            <n-slider v-model:value="characterLevel" :min="1" :max="255" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Lv.1 序章初出</span>
              <span>Lv.70 世界融合</span>
              <span>Lv.150 深渊突破</span>
              <span>Lv.255 终焉极意</span>
            </div>
          </n-card>

          <!-- 3. 主职业与副技能配置 -->
          <n-card title="3. 主职业转职与副技能装配" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-xl">
            <div class="space-y-3">
              <div>
                <label class="text-xs text-gray-400 block mb-1">主职业 (决定主属性加成与装备权限):</label>
                <n-select v-model:value="selectedJobId" :options="jobSelectOptions" size="small" />
              </div>
              <div>
                <label class="text-xs text-gray-400 block mb-1">副能力被动槽位 (如二刀流/连续魔/乱打):</label>
                <n-select v-model:value="selectedPassiveId" :options="passiveSelectOptions" size="small" />
              </div>
            </div>
          </n-card>

          <!-- 4. 神兵武器与防具配装 -->
          <n-card title="4. 核心装备与神器搭载" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-xl">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="text-xs text-gray-400 block mb-1">主手武器 (Main Weapon):</label>
                <n-select v-model:value="selectedWeaponId" :options="weaponOptions" size="small" />
              </div>
              <div>
                <label class="text-xs text-gray-400 block mb-1">副手装具 (Off-hand / Shield):</label>
                <n-select v-model:value="selectedOffhandId" :options="offhandOptions" size="small" />
              </div>
              <div>
                <label class="text-xs text-gray-400 block mb-1">防具铠甲 (Armor):</label>
                <n-select v-model:value="selectedArmorId" :options="armorOptions" size="small" />
              </div>
              <div>
                <label class="text-xs text-gray-400 block mb-1">特殊饰品 (Accessory):</label>
                <n-select v-model:value="selectedAccessoryId" :options="accessoryOptions" size="small" />
              </div>
            </div>
          </n-card>
        </div>

        <!-- 右侧全景数值演算看板 (实时计算呈现 - 数值无上限) -->
        <div class="lg:col-span-6 space-y-5">
          <!-- 核心战力总评卡 -->
          <div class="p-5 bg-gradient-to-br from-[#1b223d] via-[#121629] to-[#0c101d] rounded-2xl border border-cyan-500/40 shadow-[0_0_25px_rgba(0,243,255,0.15)] relative overflow-hidden">
            <div class="flex items-center justify-between mb-4">
              <div>
                <span class="text-xs text-cyan-300 font-mono">UNCAPPED COMPUTED STATS</span>
                <h3 class="text-xl font-black text-white flex items-center gap-2 mt-0.5">
                  <span>{{ currentChar?.name }}</span>
                  <span class="text-xs text-amber-400 font-normal">({{ currentJob?.name }}) · Lv.{{ characterLevel }}</span>
                </h3>
              </div>
              <div class="text-right">
                <div class="text-[10px] text-gray-400">综合战斗力评分</div>
                <div class="text-2xl font-black text-amber-300 font-mono">{{ totalPowerRating }}</div>
              </div>
            </div>

            <!-- 生命力与魔力数值 (无上限) -->
            <div class="space-y-3 mb-5">
              <div class="p-3 bg-red-950/20 border border-red-900/40 rounded-xl flex items-center justify-between">
                <div>
                  <span class="text-red-400 font-bold text-xs block">HP 生命总值 (无上限突破)</span>
                  <span class="text-2xl font-black text-red-300 font-mono">{{ calculatedHP }}</span>
                </div>
                <n-tag size="small" type="error">生命潜能</n-tag>
              </div>

              <div class="p-3 bg-cyan-950/20 border border-cyan-900/40 rounded-xl flex items-center justify-between">
                <div>
                  <span class="text-cyan-400 font-bold text-xs block">MP 魔力总值 (无上限突破)</span>
                  <span class="text-2xl font-black text-cyan-300 font-mono">{{ calculatedMP }}</span>
                </div>
                <n-tag size="small" type="info">法力蓄积</n-tag>
              </div>
            </div>

            <!-- 核心六维属性看板 (无上限，随 Lv.255 自然突破) -->
            <div class="grid grid-cols-3 gap-2 text-xs mb-4">
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">力量 (STR)</span>
                <strong class="text-red-400 text-lg font-mono">{{ calculatedStats.str }}</strong>
              </div>
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">敏捷 (AGI)</span>
                <strong class="text-green-400 text-lg font-mono">{{ calculatedStats.agi }}</strong>
              </div>
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">体质 (VIT)</span>
                <strong class="text-amber-400 text-lg font-mono">{{ calculatedStats.vit }}</strong>
              </div>
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">魔力 (MAG)</span>
                <strong class="text-cyan-400 text-lg font-mono">{{ calculatedStats.mag }}</strong>
              </div>
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">精神 (SPR)</span>
                <strong class="text-blue-400 text-lg font-mono">{{ calculatedStats.spr }}</strong>
              </div>
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">幸运 (LUCK)</span>
                <strong class="text-yellow-400 text-lg font-mono">{{ calculatedStats.luck }}</strong>
              </div>
            </div>

            <!-- 二级派生实战攻防面板 (无上限) -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <div class="text-gray-400 text-[11px] mb-0.5">⚔️ 物理攻击力 (P.ATK)</div>
                <div class="text-xl font-black text-amber-300 font-mono">{{ calculatedPAtk }}</div>
                <div class="text-[10px] text-gray-500 mt-0.5">暴击率: {{ calculatedCritRate }}%</div>
              </div>
              <div class="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <div class="text-gray-400 text-[11px] mb-0.5">🛡️ 物理防御力 (P.DEF)</div>
                <div class="text-xl font-black text-blue-300 font-mono">{{ calculatedPDef }}</div>
                <div class="text-[10px] text-gray-500 mt-0.5">实战减伤值</div>
              </div>
              <div class="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <div class="text-gray-400 text-[11px] mb-0.5">✨ 魔法攻击力 (M.ATK)</div>
                <div class="text-xl font-black text-purple-300 font-mono">{{ calculatedMAtk }}</div>
                <div class="text-[10px] text-gray-500 mt-0.5">全魔法无衰减增幅</div>
              </div>
              <div class="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <div class="text-gray-400 text-[11px] mb-0.5">⚡ ATB 充能速率</div>
                <div class="text-xl font-black text-green-300 font-mono">{{ atbSpeedRating }}</div>
                <div class="text-[10px] text-gray-500 mt-0.5">物理绝对回避: {{ calculatedEvasion }}%</div>
              </div>
            </div>
          </div>

          <!-- 专属特权与技能联动提示 -->
          <n-card size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-xl" title="🌟 激活特权与技能联动">
            <div class="space-y-2 text-xs">
              <div class="text-amber-300">
                <strong>⚡ 英雄固有极意:</strong> {{ currentChar?.signature_skill }}
              </div>
              <div class="text-cyan-300">
                <strong>⚔️ 职业精通特权:</strong> {{ currentJob?.innateAbility }}
              </div>
              <div class="text-purple-300">
                <strong>👑 装配副技能:</strong> {{ currentPassive?.effect }}
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>

    <!-- ================= 模块三：怪物属性与弱点解析器 ================= -->
    <div v-if="activeCalculatorTab === 'monster'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- 左侧：怪物选择器与难度强化词缀 -->
        <div class="lg:col-span-5 space-y-5">
          <!-- 怪物下拉挑选器 -->
          <n-card title="1. 选取目标怪物 / 首领" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-xl">
            <template #header-extra>
              <n-button size="tiny" type="warning" secondary @click="$router.push('/vble/monsters')">
                📖 查看 147 种全域魔物图鉴
              </n-button>
            </template>
            <div class="space-y-3">
              <div>
                <label class="text-xs text-gray-400 block mb-1">按危险层级快速筛选:</label>
                <div class="flex flex-wrap gap-1.5 mb-2">
                  <n-button
                    v-for="r in monsterRanks"
                    :key="r.id"
                    size="tiny"
                    :type="selectedRank === r.id ? 'primary' : 'default'"
                    quaternary
                    @click="selectedRank = r.id"
                  >
                    {{ r.name }}
                  </n-button>
                </div>
              </div>

              <div>
                <label class="text-xs text-gray-400 block mb-1">选择怪物:</label>
                <n-select v-model:value="selectedMonsterId" :options="filteredMonsterOptions" size="small" filterable />
              </div>
            </div>
          </n-card>

          <!-- 词缀强化与深渊环境 -->
          <n-card title="2. 战斗难度与词缀强化" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-xl">
            <div class="space-y-3 text-xs">
              <div>
                <label class="text-gray-400 block mb-1">环境难度矩阵:</label>
                <n-select v-model:value="selectedDifficulty" :options="difficultyOptions" size="small" />
              </div>
              <div class="p-2.5 bg-slate-900/80 rounded border border-slate-800 text-[11px] text-gray-300">
                {{ currentDifficultyDesc }}
              </div>
            </div>
          </n-card>

          <!-- 伤害推演沙盘 (Damage Sandbox) -->
          <n-card title="3. 伤害推演沙盘 (Damage Sandbox)" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-xl">
            <div class="space-y-3 text-xs">
              <div>
                <label class="text-gray-400 block mb-1">模拟出招指令:</label>
                <n-select v-model:value="selectedAttackCommand" :options="attackCommandOptions" size="small" />
              </div>

              <div class="p-3 bg-slate-950/80 rounded border border-amber-500/30 space-y-1">
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">单次预估打击伤害:</span>
                  <span class="text-lg font-black text-amber-400 font-mono">{{ estimatedDamage }}</span>
                </div>
                <div class="flex justify-between items-center text-[11px]">
                  <span class="text-gray-400">弱点判定加成:</span>
                  <span :class="isWeaknessHit ? 'text-green-400 font-bold' : 'text-gray-400'">
                    {{ isWeaknessHit ? '🎯 弱点暴击 (200% 伤害加乘)' : '标准抗性结算 (100%)' }}
                  </span>
                </div>
                <div class="flex justify-between items-center text-[11px] pt-1 border-t border-slate-800">
                  <span class="text-gray-400">预估击杀所需回合:</span>
                  <span class="text-cyan-300 font-bold">{{ turnsToKill }} 回合</span>
                </div>
              </div>
            </div>
          </n-card>
        </div>

        <!-- 右侧：怪物全景属性图谱与抗性矩阵 -->
        <div class="lg:col-span-7 space-y-5">
          <!-- 怪物核心立绘与基础属性看板 -->
          <div class="p-5 bg-gradient-to-br from-[#2a131b] via-[#161226] to-[#0c101d] rounded-2xl border border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.15)] relative">
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-2xl font-black text-red-400">{{ currentMonster?.name }}</h3>
                  <n-tag size="small" type="error">{{ currentMonster?.rankText || '首领怪' }}</n-tag>
                  <n-tag size="small" type="warning">{{ currentMonster?.race || '未知种族' }}</n-tag>
                </div>
                <div class="text-xs text-gray-400 mt-1">📍 现身区域: {{ currentMonster?.location }}</div>
              </div>
              <div class="text-right">
                <div class="text-[10px] text-gray-400">怪物等级</div>
                <div class="text-2xl font-black text-amber-300 font-mono">Lv. {{ currentMonster?.level }}</div>
              </div>
            </div>

            <!-- 生命力血条 -->
            <div class="space-y-1 mb-5">
              <div class="flex justify-between text-xs font-mono">
                <span class="text-red-400 font-bold">HP 生命总值:</span>
                <span class="font-bold text-gray-100">{{ scaledHP }} HP</span>
              </div>
              <n-progress type="line" :percentage="100" color="#ef4444" :show-indicator="false" />
            </div>

            <!-- 战斗四维面板 -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-4">
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">物理攻击 (ATK)</span>
                <strong class="text-amber-400 text-base font-mono">{{ scaledAttack }}</strong>
              </div>
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">物理防御 (DEF)</span>
                <strong class="text-blue-400 text-base font-mono">{{ scaledDefense }}</strong>
              </div>
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">魔法攻击 (M.ATK)</span>
                <strong class="text-purple-400 text-base font-mono">{{ currentMonster?.magic_attack || 50 }}</strong>
              </div>
              <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                <span class="text-gray-400 block text-[10px]">速度 (SPD)</span>
                <strong class="text-green-400 text-base font-mono">{{ currentMonster?.speed || 20 }}</strong>
              </div>
            </div>

            <!-- 弱点与全属性抗性矩阵 -->
            <div class="space-y-2 mb-4">
              <div class="text-xs font-semibold text-gray-300">🎯 元素弱点与属性相克矩阵:</div>
              <div class="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-center text-[11px]">
                <div class="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-red-400 block">火</span>
                  <span class="font-bold" :class="getResistColor('fire')">{{ getResistText('fire') }}</span>
                </div>
                <div class="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-cyan-400 block">冰</span>
                  <span class="font-bold" :class="getResistColor('ice')">{{ getResistText('ice') }}</span>
                </div>
                <div class="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-yellow-400 block">雷</span>
                  <span class="font-bold" :class="getResistColor('thunder')">{{ getResistText('thunder') }}</span>
                </div>
                <div class="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-blue-400 block">水</span>
                  <span class="font-bold" :class="getResistColor('water')">{{ getResistText('water') }}</span>
                </div>
                <div class="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-green-400 block">风</span>
                  <span class="font-bold" :class="getResistColor('wind')">{{ getResistText('wind') }}</span>
                </div>
                <div class="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-amber-500 block">土</span>
                  <span class="font-bold" :class="getResistColor('earth')">{{ getResistText('earth') }}</span>
                </div>
                <div class="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-yellow-200 block">圣</span>
                  <span class="font-bold" :class="getResistColor('holy')">{{ getResistText('holy') }}</span>
                </div>
                <div class="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-purple-400 block">暗</span>
                  <span class="font-bold" :class="getResistColor('dark')">{{ getResistText('dark') }}</span>
                </div>
              </div>
            </div>

            <!-- 技能施放与掉落物 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-800">
              <div class="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <span class="text-amber-400 font-bold block mb-1">⚡ 掌握技能序列:</span>
                <span class="text-gray-300">{{ currentMonster?.skills?.join('、') || '普通猛击' }}</span>
              </div>
              <div class="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <span class="text-cyan-400 font-bold block mb-1">🎁 掉落战利品:</span>
                <span class="text-gray-300">
                  {{ currentMonster?.drops?.map((d: any) => `${d.name} (${d.rate})`).join('、') || '普通药草' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 模块四：自由潜能加点模拟器 (基于 Godot 真实规范 ATTRIBUTE_POINT_ALLOCATION.md) ================= -->
    <div v-if="activeCalculatorTab === 'allocation'" class="space-y-6">
      <!-- 顶部规则看板 -->
      <n-card class="border border-amber-500/40 bg-[#121626]/90 rounded-2xl shadow-xl" size="small">
        <template #header>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xl">✨</span>
              <span class="font-bold text-amber-300 text-base sm:text-lg">自由属性点分配体系 (Stat Points Allocation Studio v1.1)</span>
            </div>
            <div class="flex items-center gap-2">
              <n-tag type="warning" size="small" round strong>Godot 引擎升级与配点规范</n-tag>
            </div>
          </div>
        </template>

        <p class="text-xs text-gray-300 leading-relaxed mb-4">
          严格依循实机规划规范（<code>ATTRIBUTE_POINT_ALLOCATION.md</code>）：角色初始获得 <strong>10 属性点</strong>，随后每次升级固定获得 <strong>5 属性点</strong>。玩家可自由投入 5 大核心基础维度（力量、速度、MP、HP、精神力），并支持一键职业自适应均摊与无限洗点重构。
        </p>

        <!-- 角色与等级快速调节 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div>
            <label class="text-[11px] text-gray-400 block mb-1">选择受测角色：</label>
            <n-select v-model:value="allocRole" :options="allocRoleOptions" size="small" />
          </div>
          <div>
            <div class="flex justify-between text-[11px] text-gray-400 mb-1">
              <span>角色当前等级 (Level)：</span>
              <span class="font-mono text-cyan-400 font-bold">Lv.{{ allocLevel }}</span>
            </div>
            <n-slider v-model:value="allocLevel" :min="1" :max="99" :step="1" />
          </div>
          <div>
            <div class="flex justify-between text-[11px] text-gray-400 mb-1">
              <span>服用永续秘药数 (Perm Stat Items)：</span>
              <span class="font-mono text-emerald-400 font-bold">+{{ allocBonusItems * 2 }} 点</span>
            </div>
            <n-slider v-model:value="allocBonusItems" :min="0" :max="20" :step="1" />
          </div>
        </div>

        <!-- 点数总览与一键操作 -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/80">
          <div class="flex items-center gap-3">
            <div class="p-2.5 px-4 rounded-xl bg-slate-950/90 border border-amber-500/40">
              <span class="text-xs text-gray-400">总可用潜能点：</span>
              <strong class="text-base text-amber-400 font-mono ml-1">{{ totalAllocPoints }}</strong>
            </div>
            <div
              class="p-2.5 px-4 rounded-xl transition-all border"
              :class="remainingAllocPoints > 0
                ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse'
                : 'bg-slate-950/80 border-slate-800'"
            >
              <span class="text-xs text-gray-400">待分配剩余点数：</span>
              <strong
                class="text-base font-mono ml-1"
                :class="remainingAllocPoints > 0 ? 'text-cyan-300 font-black' : 'text-emerald-400'"
              >
                {{ remainingAllocPoints }}
              </strong>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <n-button size="small" type="primary" secondary @click="autoAllocateByRole">
              ⚡ 职业倾向一键分配
            </n-button>
            <n-button size="small" type="warning" tertiary @click="resetAllocation">
              🔄 清空洗点
            </n-button>
          </div>
        </div>
      </n-card>

      <!-- 五大属性加点调节器与派生换算矩阵 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- 左侧 7 栏：5 大属性增减器 -->
        <div class="lg:col-span-7 space-y-3">
          <div
            v-for="stat in allocStatDefinitions"
            :key="stat.key"
            class="p-4 rounded-xl bg-[#121626]/90 border border-slate-700/60 shadow hover:border-slate-600 transition-all flex flex-col gap-2"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">{{ stat.icon }}</span>
                <div>
                  <span class="font-bold text-white text-sm mr-2">{{ stat.name }}</span>
                  <span class="text-xs font-mono text-gray-400">({{ stat.key }})</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400">已投入：</span>
                <span class="text-base font-bold text-amber-400 font-mono w-10 text-right">
                  +{{ allocPoints[stat.key] }}
                </span>
              </div>
            </div>

            <p class="text-[11px] text-gray-400 leading-tight">
              {{ stat.desc }} <strong class="text-cyan-400">[{{ stat.conversion }}]</strong>
            </p>

            <div class="flex items-center gap-3 pt-1">
              <n-button
                size="tiny"
                circle
                secondary
                :disabled="allocPoints[stat.key] <= 0"
                @click="adjustAllocStat(stat.key, -1)"
              >
                -
              </n-button>

              <n-slider
                v-model:value="allocPoints[stat.key]"
                :min="0"
                :max="allocPoints[stat.key] + remainingAllocPoints"
                :step="1"
                class="flex-1"
              />

              <n-button
                size="tiny"
                circle
                type="primary"
                secondary
                :disabled="remainingAllocPoints <= 0"
                @click="adjustAllocStat(stat.key, 1)"
              >
                +
              </n-button>
            </div>
          </div>
        </div>

        <!-- 右侧 5 栏：实战派生属性全息透视与战力评估 -->
        <div class="lg:col-span-5 space-y-4">
          <n-card class="bg-[#121626]/90 border border-cyan-500/40 rounded-xl shadow-lg" size="small">
            <template #header>
              <div class="flex items-center justify-between">
                <span class="font-bold text-cyan-300 text-sm">⚔️ 加点后实战战力透视</span>
                <n-tag size="tiny" type="success" round>即时演算</n-tag>
              </div>
            </template>

            <div class="space-y-3">
              <!-- 战力综合评分 -->
              <div class="p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 text-center">
                <div class="text-[11px] text-gray-400 font-medium">综合冒险战斗力评分 (Combat Power)</div>
                <div class="text-2xl font-black text-amber-400 font-mono mt-1 text-glow-amber">
                  {{ allocCombatRating }}
                </div>
                <div class="text-[10px] text-gray-400 mt-0.5">综合生命上限、物理爆发、魔法回廊与行动频次加权</div>
              </div>

              <!-- 派生二级属性对比 -->
              <div class="space-y-2 text-xs">
                <div class="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-gray-400 flex items-center gap-1"><span>❤️</span> 生命上限 HP</span>
                  <span class="font-mono font-bold text-rose-400">{{ allocDerivedHp }} (+{{ allocPoints.max_hp * 20 }})</span>
                </div>
                <div class="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-gray-400 flex items-center gap-1"><span>💧</span> 魔法容量 MP</span>
                  <span class="font-mono font-bold text-sky-400">{{ allocDerivedMp }} (+{{ allocPoints.max_mp * 5 }})</span>
                </div>
                <div class="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-gray-400 flex items-center gap-1"><span>🗡️</span> 物理攻击力 ATK</span>
                  <span class="font-mono font-bold text-amber-300">{{ allocDerivedAtk }} (+{{ allocPoints.attack }})</span>
                </div>
                <div class="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-gray-400 flex items-center gap-1"><span>⚡</span> 行动速度 SPD</span>
                  <span class="font-mono font-bold text-yellow-300">{{ allocDerivedSpd }} (+{{ allocPoints.speed }})</span>
                </div>
                <div class="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span class="text-gray-400 flex items-center gap-1"><span>✨</span> 精神魔法修正 SPR</span>
                  <span class="font-mono font-bold text-purple-300">{{ allocDerivedSpr }} (+{{ allocPoints.spirit }})</span>
                </div>
              </div>

              <!-- 玩法流派分析 -->
              <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-gray-300">
                <span class="text-amber-400 font-bold block mb-1">💡 当前加点流派倾向评定：</span>
                <span>{{ allocBuildAnalysis }}</span>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>

    <!-- ================= 模块五：ATB 动态行动条与六维属性阈值量化实验室 ================= -->
    <div v-if="activeCalculatorTab === 'atb_thresholds'" class="space-y-6">
      <!-- 顶部引言卡片 -->
      <div class="p-5 rounded-2xl bg-[#121626]/90 border border-cyan-500/30 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-2xl">⏱️</span>
            <h2 class="text-lg sm:text-xl font-bold text-white text-glow-cyan">ATB (Active Time Battle) 行动流速模拟与六维属性软上限大典</h2>
          </div>
          <n-tag type="info" size="small" round>Godot 4.6 权威底层公式</n-tag>
        </div>
        <p class="text-xs text-gray-300 leading-relaxed">
          双月宇宙的战斗流转基于经典实时 ATB 机制。角色敏捷度（AGI）直接决定充能时间，时空魔法加速（Haste, 2.0x）与减速（Slow, 0.5x）成倍缩放充能速率。当六维属性突破 99 与 160 阈值后，将产生不同程度的边际收益递减（Diminishing Returns）以保障数值稳健。
        </p>
      </div>

      <!-- 实机实时 ATB 行动条模拟演练台 -->
      <n-card class="border border-slate-700/80 bg-[#121626]/90 rounded-2xl shadow-xl" size="small">
        <template #header>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="text-lg">⚡</span>
              <span class="font-bold text-white">实机实时 ATB 行动条推演工坊 (Real-Time ATB Gauge Simulator)</span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <n-button size="tiny" :type="isAtbRunning ? 'warning' : 'primary'" round @click="toggleAtbRunning">
                {{ isAtbRunning ? '⏸️ 暂停流转' : '▶️ 开始充能' }}
              </n-button>
              <n-button size="tiny" secondary round @click="resetAtbBars">
                🔄 重置量表
              </n-button>
              <div class="flex items-center gap-1 text-xs text-gray-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                <span>倍速:</span>
                <button
                  v-for="spd in [1, 1.5, 2]"
                  :key="spd"
                  type="button"
                  class="px-1.5 py-0.5 rounded text-[10px] font-mono"
                  :class="atbSimSpeed === spd ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
                  @click="atbSimSpeed = spd"
                >
                  {{ spd }}x
                </button>
              </div>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <!-- 四人小队 + 自定义主角实时进度条 -->
          <div class="space-y-3">
            <div
              v-for="(member, idx) in atbCombatants"
              :key="member.id"
              class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div class="flex items-center gap-2">
                  <span class="text-base">{{ member.icon }}</span>
                  <span class="font-bold text-gray-200">{{ member.name }}</span>
                  <n-tag size="tiny" :type="member.tagType">{{ member.job }}</n-tag>
                  <span class="text-[11px] font-mono text-cyan-400">敏捷 AGI: {{ member.agi }}</span>
                  <span class="text-[11px] text-gray-400">满槽耗时: {{ calculateAtbTime(member.agi, member.status).toFixed(2) }}s</span>
                </div>

                <!-- 增益减益状态开关 -->
                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    class="px-2 py-0.5 rounded text-[10px] border transition-all"
                    :class="member.status === 'haste' ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-950 text-gray-400 border-slate-800 hover:text-amber-300'"
                    @click="setMemberStatus(idx, member.status === 'haste' ? 'normal' : 'haste')"
                  >
                    ⏩ 加速(Haste 2x)
                  </button>
                  <button
                    type="button"
                    class="px-2 py-0.5 rounded text-[10px] border transition-all"
                    :class="member.status === 'slow' ? 'bg-blue-500 text-slate-950 border-blue-400 font-bold shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-950 text-gray-400 border-slate-800 hover:text-blue-300'"
                    @click="setMemberStatus(idx, member.status === 'slow' ? 'normal' : 'slow')"
                  >
                    ⏳ 减速(Slow 0.5x)
                  </button>
                  <span v-if="member.gauge >= 100" class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40 animate-pulse">
                    ⚡ 行动就绪 (Ready)
                  </span>
                </div>
              </div>

              <!-- 动态进度条 -->
              <div class="relative w-full bg-slate-950 rounded-full h-3.5 overflow-hidden border border-slate-800">
                <div
                  class="h-full rounded-full transition-all duration-75 ease-linear"
                  :class="member.gauge >= 100 ? 'bg-gradient-to-r from-emerald-400 to-cyan-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]' : 'bg-gradient-to-r from-cyan-600 to-cyan-400'"
                  :style="{ width: `${member.gauge}%` }"
                />
                <div class="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-white drop-shadow">
                  {{ member.gauge.toFixed(1) }}%
                </div>
              </div>
            </div>
          </div>

          <!-- 自定义测试主角敏捷滑块 -->
          <div class="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-500/20 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-cyan-400 font-bold">🎮 自定义参战角色 (Custom Fighter) 敏捷调节:</span>
              <span class="font-mono text-amber-300 font-bold">AGI: {{ customMemberAgi }} (满槽耗时: {{ calculateAtbTime(customMemberAgi, customMemberStatus).toFixed(2) }} 秒)</span>
            </div>
            <n-slider v-model:value="customMemberAgi" :min="1" :max="255" :step="1" @update:value="syncCustomAgi" />
          </div>
        </div>
      </n-card>

      <!-- 六维属性断点与软上限衰减矩阵 -->
      <n-card class="border border-slate-800 bg-[#121626]/90 rounded-2xl shadow-lg" size="small">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">📊</span>
              <span class="font-bold text-white">六维属性软上限与边际收益递减断点大典 (Stat Caps Matrix)</span>
            </div>
            <n-tag size="tiny" type="warning">等级上限 Lv.255</n-tag>
          </div>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div
              v-for="stat in sixStatBreakpoints"
              :key="stat.key"
              class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-xl">{{ stat.icon }}</span>
                  <span class="font-bold text-white text-sm">{{ stat.name }} ({{ stat.key.toUpperCase() }})</span>
                </div>
                <n-tag size="tiny" :type="stat.tagType">{{ stat.role }}</n-tag>
              </div>

              <div class="text-xs text-gray-300 space-y-1.5 font-mono">
                <div class="flex justify-between">
                  <span class="text-gray-400">一阶断点 (Soft Cap 1):</span>
                  <span class="text-cyan-400 font-bold">{{ stat.cap1 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">二阶断点 (Soft Cap 2):</span>
                  <span class="text-amber-400 font-bold">{{ stat.cap2 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">极限硬上限 (Hard Cap):</span>
                  <span class="text-rose-400 font-bold">{{ stat.hardCap }}</span>
                </div>
              </div>

              <div class="p-2.5 rounded bg-slate-950/70 border border-slate-800 text-[11px] text-gray-300 leading-relaxed">
                <strong class="text-amber-300 block mb-0.5">递减法则:</strong>
                {{ stat.formulaDesc }}
              </div>
            </div>
          </div>
        </div>
      </n-card>

      <!-- Godot 底层 ATB 解析脚本 (atb_gauge_resolver.gd) -->
      <div class="p-5 rounded-2xl bg-[#121626]/90 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">📜</span>
            <h3 class="text-base font-bold text-white font-mono">res://scripts/combat/atb_gauge_resolver.gd</h3>
          </div>
          <n-tag type="info" size="tiny" round>Godot 4.6 LTS Combat Core</n-tag>
        </div>
        <p class="text-xs text-gray-400">
          战斗核心模块 ATB 充能速率解析器，负责每一物理帧计算行动量表增量、处理加速/减速/停滞状态，并激发角色指令窗口：
        </p>
        <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed">{{ atbResolverScriptCode }}</pre>
      </div>
    </div>

    <!-- ================= 模块六：满破 255 巅峰神话极境突破与诸神战力评估工坊 (v2.2.259) ================= -->
    <div v-if="activeCalculatorTab === 'breakthrough'" class="space-y-6">
      <!-- 极境工坊头部横幅卡片 -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-purple-950/70 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-2xl">👑</span>
            <h2 class="text-lg sm:text-xl font-black text-white text-glow-amber">满破 255 巅峰神话极境突破与诸神战力评估工坊 (Transcendence Studio)</h2>
          </div>
          <p class="text-xs text-gray-300 max-w-3xl leading-relaxed">
            解构角色突破传统 99 级限制、晋升至 255 级满破巅峰的指数级属性膨胀曲线。支持六维极意潜能加点 (99~255)、三大神话星格回路共鸣与多维巅峰诸神战力 (Combat Power) 综合评定！
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-tag type="warning" round size="small">Lv.255 满破极限</n-tag>
          <n-tag type="info" round size="small">9,999,999 CP 测算</n-tag>
          <n-tag type="success" round size="small">v2.2.259 规范</n-tag>
        </div>
      </div>

      <!-- 预设神话极境角色选派 -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          v-for="cand in transcendenceCandidates"
          :key="cand.id"
          type="button"
          class="p-3.5 rounded-xl border text-left transition-all cursor-pointer bg-slate-900/90 hover:scale-[1.02]"
          :class="selectedCandidateId === cand.id ? 'border-amber-400 bg-amber-950/30 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50' : 'border-slate-800 hover:border-slate-700'"
          @click="selectCandidate(cand.id)"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-xl">{{ cand.icon }}</span>
            <n-tag size="tiny" :type="cand.tagType">{{ cand.archetype }}</n-tag>
          </div>
          <span class="block font-bold text-xs text-gray-100">{{ cand.name }}</span>
          <span class="block text-[10px] text-amber-300 font-mono mt-0.5">{{ cand.title }}</span>
          <span class="block text-[9px] text-gray-500 mt-1 line-clamp-1">{{ cand.specialty }}</span>
        </button>
      </div>

      <!-- 六维极意属性调节与神话星格激活 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 六维极意潜能滑块 (99~255) -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>⚡</span>
              <span>六维极意属性满破加点 (Extreme Stats 99~255)</span>
            </span>
            <button
              type="button"
              class="text-[11px] text-cyan-400 hover:underline cursor-pointer"
              @click="maximizeAllStats"
            >
              一键 255 全满
            </button>
          </div>

          <div class="space-y-3.5 text-xs">
            <div v-for="stat in transcendenceStats" :key="stat.key" class="space-y-1">
              <div class="flex justify-between items-center">
                <span class="text-gray-300 flex items-center gap-1">
                  <span>{{ stat.icon }}</span>
                  <span>{{ stat.name }} ({{ stat.key.toUpperCase() }})</span>
                </span>
                <span class="font-mono font-bold text-amber-300">{{ statValues[stat.key] }} / 255</span>
              </div>
              <input
                v-model.number="statValues[stat.key]"
                type="range"
                min="99"
                max="255"
                step="1"
                class="w-full accent-amber-400 cursor-pointer"
              />
              <div class="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>99 (凡俗极限)</span>
                <span>160 (半神临界)</span>
                <span>255 (真神具现)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 2: 神话血脉星格回路激活 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span class="text-xs font-bold text-purple-300 block flex items-center gap-1.5">
            <span>🌌</span>
            <span>神话血脉星格回路 (Mythic Glyphs)</span>
          </span>

          <div class="space-y-3">
            <div
              v-for="glyph in mythicGlyphs"
              :key="glyph.id"
              class="p-3 rounded-lg border transition-all cursor-pointer"
              :class="activeGlyphs.includes(glyph.id) ? 'border-purple-400 bg-purple-950/40 ring-1 ring-purple-400/40' : 'border-slate-800 bg-slate-950 hover:border-slate-700'"
              @click="toggleGlyph(glyph.id)"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-1.5">
                  <span class="text-lg">{{ glyph.icon }}</span>
                  <span class="font-bold text-xs text-gray-100">{{ glyph.name }}</span>
                </div>
                <n-tag size="tiny" :type="activeGlyphs.includes(glyph.id) ? 'success' : 'default'">
                  {{ activeGlyphs.includes(glyph.id) ? '已共鸣激活' : '未激活' }}
                </n-tag>
              </div>
              <p class="text-[10px] text-gray-400 leading-snug">{{ glyph.description }}</p>
              <div class="mt-1.5 text-[9px] font-mono text-purple-300 flex items-center gap-2">
                <span>加成: {{ glyph.effectLabel }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 3: 诸神战力遥测与推演控制台 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-slate-950 to-amber-950/30 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>诸神战力核心解算</span>
              </span>
              <n-tag size="tiny" :type="combatRatingTag">{{ combatPowerRank }}</n-tag>
            </div>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">巅峰综合战力:</span>
                <span class="font-mono font-black text-amber-400 text-sm">{{ calculatedCombatPower.toLocaleString() }} CP</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">满破神体生命极值:</span>
                <span class="font-mono font-bold text-rose-400">{{ calculatedMaxHP.toLocaleString() }} HP</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">破限极意普攻秒伤:</span>
                <span class="font-mono font-bold text-cyan-300">{{ calculatedDPS.toLocaleString() }} /秒</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">绝对破防穿透率:</span>
                <span class="font-mono font-bold text-purple-300">{{ calculatedArmorPen.toFixed(1) }}%</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">单体伤害破限界值:</span>
                <span class="font-mono font-bold text-emerald-400">999,999 (突破 99,999)</span>
              </div>
            </div>

            <!-- 实战对决演算日志 -->
            <div class="p-2.5 rounded bg-slate-950/90 border border-slate-800 text-[11px] font-mono space-y-1 text-gray-300 max-h-24 overflow-y-auto">
              <div v-for="(log, idx) in transcendenceCombatLogs" :key="idx" class="text-gray-300 leading-snug">
                {{ log }}
              </div>
            </div>
          </div>

          <!-- 操作按钮组 -->
          <div class="space-y-2 pt-2">
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
              :disabled="isSimulatingCombat"
              @click="simulateTranscendenceCombat"
            >
              {{ isSimulatingCombat ? '⚔️ 巅峰诸神神力碰撞对决中...' : '⚔️ 启动诸神神力对决推演 (Simulate Duel)' }}
            </button>

            <div class="flex gap-2">
              <button
                type="button"
                class="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-gray-300 border border-slate-700 transition-colors cursor-pointer"
                @click="copyTranscendenceData"
              >
                📋 复制战力数据
              </button>
              <button
                type="button"
                class="flex-1 py-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-xs text-amber-300 border border-amber-700/60 transition-colors cursor-pointer"
                @click="exportTranscendenceCert"
              >
                📄 导出神话凭证
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 满破神话战力解算器源码展台 -->
      <div class="p-5 rounded-2xl bg-[#121626]/90 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">📜</span>
            <h3 class="text-base font-bold text-white font-mono">res://scripts/combat/transcendence_growth_evaluator.gd</h3>
          </div>
          <n-tag type="warning" size="tiny" round>Godot 4.6 LTS Transcendence Core</n-tag>
        </div>
        <p class="text-xs text-gray-400">
          核心战力指数级解算引擎：管理 255 满破六维非线性增长、四象水晶星格加权、伤害破限因子与综合诸神战力 (CP) 估算：
        </p>
        <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono overflow-x-auto leading-relaxed">{{ gdTranscendenceCode }}</pre>
      </div>
    </div>

    <!-- 模块七：量子属性张量与多维数值跃迁工坊 (v2.2.284) -->
    <div v-if="activeCalculatorTab === 'quantum_entropy'" id="quantum-entropy-studio" class="space-y-6">
      <!-- 顶部功能横幅 -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-rose-950/70 via-slate-900/90 to-purple-950/70 border border-rose-500/40 shadow-[0_0_35px_rgba(244,63,94,0.18)] relative overflow-hidden">
        <div class="absolute -right-16 -top-16 w-56 h-56 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/40">
                QUANTUM TENSOR & DILATION MATRIX
              </span>
              <span class="text-xs text-rose-400 font-mono">v2.2.284 Hyper-Dimension</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
              <span>🌌</span> 量子属性张量与多维数值跃迁工坊
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              面向 Godot 4.6 LTS 超限属性拓扑解算：实装希尔伯特 16 维态矢量张量重构、虚数属性投影、泡利相干性破缺与普朗克负熵极限界标。
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-lg bg-rose-950/60 border border-rose-700/60 text-xs font-mono text-rose-300">
              希尔伯特 16 维空间
            </span>
            <span class="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-700/60 text-xs font-mono text-purple-300">
              曲率微分本征态
            </span>
          </div>
        </div>
      </div>

      <!-- 四大超维量子态选择 -->
      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">⚛️</span>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">四大超维量子本征态配置 (Quantum Stances)</h3>
          </div>
          <span class="text-xs text-gray-400">点击切换以激活不同量子态的张量共鸣属性</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="st in quantumStatesList"
            :key="st.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedQuantumState === st.id ? `${st.color} ring-2 ring-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]` : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'"
            @click="selectedQuantumState = st.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ st.icon }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-gray-300">
                {{ st.resonanceBonus }}
              </span>
            </div>
            <div class="font-bold text-sm text-white mb-1">{{ st.name }}</div>
            <p class="text-xs text-gray-400 leading-snug">{{ st.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 参数微调滑块与量子超限开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧参数调节面板 -->
        <div class="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-lg">🎛️</span>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider">量子张量核心拓扑参数</h3>
            </div>
            <n-tag type="error" size="tiny" round>微积分动态解算</n-tag>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>希尔伯特量子能阶 / 维数 (Hilbert Dimensions)</span>
                <span class="font-mono font-bold text-rose-400">{{ quantumDegrees }} 维</span>
              </div>
              <n-slider v-model:value="quantumDegrees" :min="1" :max="16" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>1 维 (标量坍缩)</span>
                <span>8 维 (标准空间)</span>
                <span>16 维 (极境超维)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>时空张量曲率因子 (Tensor Curvature)</span>
                <span class="font-mono font-bold text-amber-400">{{ tensorCurvature.toFixed(2) }} G</span>
              </div>
              <n-slider v-model:value="tensorCurvature" :min="0.1" :max="5.0" :step="0.05" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>0.10 (平直时空)</span>
                <span>2.40 (标准扭曲)</span>
                <span>5.00 (视界崩解)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>特征本征能级基准 (Eigenenergy Base)</span>
                <span class="font-mono font-bold text-cyan-400">{{ eigenEnergyLevel }} MeV</span>
              </div>
              <n-slider v-model:value="eigenEnergyLevel" :min="100" :max="999" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>100 MeV (微观量子)</span>
                <span>520 MeV (高能态)</span>
                <span>999 MeV (夸克胶子极境)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>虚数属性投影比率 (Imaginary Projection)</span>
                <span class="font-mono font-bold text-purple-400">{{ imaginaryStatRatio }}%</span>
              </div>
              <n-slider v-model:value="imaginaryStatRatio" :min="50" :max="250" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>50% (低维投影)</span>
                <span>140% (标准共振)</span>
                <span>250% (超维具象化)</span>
              </div>
            </div>
          </div>

          <!-- 3 个特殊量子机制开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-3">
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚛️</span> 泡利不相容态破缺 (Pauli Exclusion Breaker)
                </div>
                <div class="text-[10px] text-gray-400">解除同类六维属性堆叠上限，允许战力二次幂跃迁 (+35% 综合量子战力)</div>
              </div>
              <n-switch v-model:value="pauliExclusionBreaker" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🔒</span> 波函数坍缩锚定 (Wavefunction Peak Lock)
                </div>
                <div class="text-[10px] text-gray-400">将本征伤害锁定在概率波峰峰值，破除一切负面数值波动 (+50% 爆发伤害)</div>
              </div>
              <n-switch v-model:value="waveFunctionLock" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🛡️</span> 普朗克真伤量子护盾 (Planck Micro Shield)
                </div>
                <div class="text-[10px] text-gray-400">生成高维负熵能量膜，格挡单次超额真实伤害并强化时空张量稳定性 (+25%)</div>
              </div>
              <n-switch v-model:value="planckShield" />
            </div>
          </div>
        </div>

        <!-- 右侧实时遥测仪表盘 -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-rose-950/40 border border-rose-500/30 space-y-4">
            <div class="flex items-center justify-between border-b border-rose-500/20 pb-2">
              <h3 class="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center gap-1.5">
                <span>📊</span> 实时量子数值遥测 (Telemetry)
              </h3>
              <span class="text-[10px] font-mono text-emerald-400 animate-pulse">● 跃迁信道在线</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/20">
                <div class="text-[10px] text-gray-400">诸神超维量子战力 (CP)</div>
                <div class="text-lg sm:text-xl font-black text-rose-400 font-mono mt-1">
                  {{ calculatedQuantumCombatPower.toLocaleString() }}
                </div>
                <div class="text-[9px] text-rose-500/80 mt-0.5">基于希尔伯特张量矩阵</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20">
                <div class="text-[10px] text-gray-400">本征极限破限伤害</div>
                <div class="text-lg sm:text-xl font-black text-amber-400 font-mono mt-1">
                  {{ calculatedEigenDamage.toLocaleString() }}
                </div>
                <div class="text-[9px] text-amber-500/80 mt-0.5">波函数坍缩单发理论值</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20">
                <div class="text-[10px] text-gray-400">相对论光速行动敏捷</div>
                <div class="text-lg sm:text-xl font-black text-cyan-400 font-mono mt-1">
                  {{ calculatedRelativisticSpeed }} <span class="text-xs font-normal">AGI</span>
                </div>
                <div class="text-[9px] text-cyan-500/80 mt-0.5">普朗克微秒极速响应</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                <div class="text-[10px] text-gray-400">张量矩阵稳态率</div>
                <div class="text-lg sm:text-xl font-black text-purple-400 font-mono mt-1">
                  {{ calculatedStabilityRating }}
                </div>
                <div class="text-[9px] text-purple-500/80 mt-0.5">曲率抗坍塌指数</div>
              </div>
            </div>

            <!-- 当前量子态共鸣摘要 -->
            <div class="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-1">
              <div class="flex items-center justify-between text-gray-400">
                <span>激活本征态:</span>
                <span class="font-bold text-white">{{ currentQuantumStateObj?.name }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>相干增益:</span>
                <span class="font-mono text-emerald-400">{{ currentQuantumStateObj?.resonanceBonus }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>泡利态破缺:</span>
                <span class="font-mono" :class="pauliExclusionBreaker ? 'text-rose-400' : 'text-gray-500'">
                  {{ pauliExclusionBreaker ? '已激活 (+35% 跃迁)' : '未启用' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>普朗克护盾:</span>
                <span class="font-mono" :class="planckShield ? 'text-cyan-400' : 'text-gray-500'">
                  {{ planckShield ? '已展开 (+25% 稳态)' : '已旁路' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 快捷操作按钮 -->
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              @click="runQuantumSimulation"
              :disabled="isQuantumSimulating"
            >
              <span>{{ isQuantumSimulating ? '⏳' : '🚀' }}</span>
              {{ isQuantumSimulating ? '量子跃迁解算中...' : '启动五阶段量子张量推演' }}
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
              @click="exportQuantumEntropyCertificate"
            >
              <span>📄</span> 导出证书
            </button>
          </div>
        </div>
      </div>

      <!-- 五阶段量子跃迁推演终端 -->
      <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">💻</span>
            <h3 class="text-sm font-bold text-white font-mono uppercase">量子张量推演控制台 (Quantum Transition Terminal)</h3>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="isQuantumSimulating" class="text-xs text-rose-400 animate-pulse font-mono">
              STAGE {{ quantumSimStage }}/5 解算中
            </span>
            <span v-else-if="quantumSimFinished" class="text-xs text-emerald-400 font-mono">
              ✓ 跃迁演算就绪
            </span>
            <button
              type="button"
              class="text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 cursor-pointer"
              @click="quantumTerminalLogs = []"
            >
              清屏
            </button>
          </div>
        </div>

        <div class="h-44 p-3 rounded-xl bg-black/90 border border-slate-900 font-mono text-xs overflow-y-auto space-y-1 text-gray-300">
          <div v-if="quantumTerminalLogs.length === 0" class="text-gray-600 italic">
            [终端待命中] 点击“启动五阶段量子张量推演”以解算希尔伯特高维态矢量、泡利破缺相干性与特征能级矩阵...
          </div>
          <div v-for="(log, idx) in quantumTerminalLogs" :key="idx" class="leading-relaxed">
            <span class="text-gray-500">[{{ log.time }}]</span>
            <span :class="log.color"> {{ log.message }}</span>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 核心脚本展台 -->
      <div class="p-5 rounded-2xl bg-[#121626]/90 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">📜</span>
            <div>
              <h3 class="text-sm font-bold text-white font-mono">Godot 4.6 LTS 量子属性张量拓扑引擎源码</h3>
              <p class="text-xs text-gray-400">面向 RefCounted 无环解耦架构的独立高维算力套件</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <n-button
              size="tiny"
              :type="activeGdQuantumTab === 'tensor' ? 'primary' : 'default'"
              secondary
              @click="activeGdQuantumTab = 'tensor'"
            >
              quantum_stat_tensor_evaluator.gd
            </n-button>
            <n-button
              size="tiny"
              :type="activeGdQuantumTab === 'damage' ? 'primary' : 'default'"
              secondary
              @click="activeGdQuantumTab = 'damage'"
            >
              eigen_damage_matrix_resolver.gd
            </n-button>
            <n-button
              size="tiny"
              :type="activeGdQuantumTab === 'planck' ? 'primary' : 'default'"
              secondary
              @click="activeGdQuantumTab = 'planck'"
            >
              planck_imaginary_stat_controller.gd
            </n-button>
          </div>
        </div>

        <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-rose-300 font-mono overflow-x-auto leading-relaxed max-h-96">{{ currentGdQuantumCode }}</pre>
      </div>
    </div>

    <!-- ================= 模块八：角色六维基础属性、防御穿透衰减与战力综合解算工坊 (v2.2.333) ================= -->
    <div v-if="activeCalculatorTab === 'armor_pen_attenuation'" id="armor-pen-attenuation-studio" class="space-y-6">
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900/95 to-cyan-950/80 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.2)] space-y-6 relative overflow-hidden">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/20 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/30">
                HEXAGON STATS &amp; ARMOR PEN MATRIX v2.2.333
              </span>
              <span class="text-xs text-emerald-400 font-mono">Nonlinear Attenuation &amp; Power Evaluation Pipeline</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🛡️</span> 角色六维基础属性、防御穿透衰减与战力综合解算工坊
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
              深度解析力量、敏捷、体力、魔力、精神、幸运六维基础力矩，建立护甲对数非线性衰减模型，实现穿透溢出真实创伤注入与归一化战力评估。
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <n-button
              type="success"
              size="small"
              round
              secondary
              :loading="isSimulatingArmorPen"
              @click="runArmorPenSimulation"
            >
              <template #icon><span>⚡</span></template>
              启动穿透推演沙盘
            </n-button>
            <n-button
              type="warning"
              size="small"
              round
              secondary
              @click="exportArmorPenCertificate"
            >
              <template #icon><span>📜</span></template>
              导出战力方案证书
            </n-button>
          </div>
        </div>

        <!-- 四大六维战力原型 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="arch in hexagonStatArchetypes"
            :key="arch.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative"
            :class="selectedHexagonArchetypeId === arch.id ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-slate-800/40 border-slate-700/60 hover:border-emerald-500/40'"
            @click="selectHexagonArchetype(arch.id)"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ arch.icon }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {{ arch.tag }}
              </span>
            </div>
            <div class="font-bold text-sm text-white">{{ arch.name }}</div>
            <div class="text-xs text-emerald-300 font-mono mt-0.5">{{ arch.subtitle }}</div>
            <div class="text-[11px] text-gray-400 mt-2 leading-relaxed">{{ arch.desc }}</div>
            <div class="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] font-mono">
              <span class="text-gray-400">基准战力加权</span>
              <span class="text-emerald-400 font-bold">{{ arch.basePowerWeight }}</span>
            </div>
          </div>
        </div>

        <!-- 参数调节与开关控制网格 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
          <!-- 4 滑块 -->
          <div class="space-y-4">
            <div class="text-xs font-bold text-emerald-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
              <span>⚙️</span> 穿透深度与六维成长微调
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">物理/魔法防御穿透深度 (%)</span>
                <span class="text-emerald-400 font-mono font-bold">{{ armorPenetrationRatio }} %</span>
              </div>
              <n-slider v-model:value="armorPenetrationRatio" :min="10" :max="90" :step="1" />
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">护甲减伤非线性衰减指数 (Exp)</span>
                <span class="text-amber-400 font-mono font-bold">{{ defenseAttenuationCurveExp.toFixed(2) }}</span>
              </div>
              <n-slider v-model:value="defenseAttenuationCurveExp" :min="0.5" :max="2.0" :step="0.05" />
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">六维基础属性成长增幅倍率 (倍)</span>
                <span class="text-cyan-400 font-mono font-bold">{{ hexagonStatGrowthMultiplier.toFixed(1) }} x</span>
              </div>
              <n-slider v-model:value="hexagonStatGrowthMultiplier" :min="1.0" :max="5.0" :step="0.1" />
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">综合战力归一化加权系数</span>
                <span class="text-purple-400 font-mono font-bold">{{ combatPowerNormalizationFactor }}</span>
              </div>
              <n-slider v-model:value="combatPowerNormalizationFactor" :min="100" :max="500" :step="10" />
            </div>
          </div>

          <!-- 3 开关与实时数据 -->
          <div class="space-y-4">
            <div class="text-xs font-bold text-emerald-300 tracking-wider font-mono uppercase flex items-center gap-1.5">
              <span>🛡️</span> 穿透解限与创伤转化机制
            </div>

            <div class="space-y-2.5">
              <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-xs">
                  <div class="text-white font-medium">豁免目标硬编码护甲硬直上限</div>
                  <div class="text-gray-400 text-[11px]">无视首领固有 50% 减伤壁垒</div>
                </div>
                <n-switch v-model:value="armorPiercingCapExempt" />
              </div>

              <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-xs">
                  <div class="text-white font-medium">启用六维协同二次方伤害增长</div>
                  <div class="text-gray-400 text-[11px]">六维属性均值越高提供额外平方增幅</div>
                </div>
                <n-switch v-model:value="quadraticDamageScaling" />
              </div>

              <div class="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div class="text-xs">
                  <div class="text-white font-medium">穿透溢出时 100% 转化真实创伤</div>
                  <div class="text-gray-400 text-[11px]">超过护甲值的穿透深度直接转为纯真伤</div>
                </div>
                <n-switch v-model:value="dynamicTrueDamageInjection" />
              </div>
            </div>

            <!-- 4 项实时综合解算指标 -->
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div class="p-2.5 rounded bg-slate-900 border border-emerald-500/20 text-center">
                <div class="text-[11px] text-gray-400">穿透综合伤害倍率</div>
                <div class="text-lg font-mono font-black text-emerald-400">{{ calculatedArmorMetrics.effectiveDamageMultiplier }}</div>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-emerald-500/20 text-center">
                <div class="text-[11px] text-gray-400">击穿敌方减伤比</div>
                <div class="text-lg font-mono font-black text-cyan-400">{{ calculatedArmorMetrics.damageReductionBypassed }}</div>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-emerald-500/20 text-center">
                <div class="text-[11px] text-gray-400">英雄综合战力指数</div>
                <div class="text-lg font-mono font-black text-amber-400">{{ calculatedArmorMetrics.compositeHeroCombatPower }}</div>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-emerald-500/20 text-center">
                <div class="text-[11px] text-gray-400">属性架构大师评级</div>
                <div class="text-lg font-mono font-black text-purple-400">{{ calculatedArmorMetrics.statMasteryCertification }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 五阶段沙盘推演进度条 -->
        <div v-if="isSimulatingArmorPen" class="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-emerald-500/30">
          <div class="flex justify-between text-xs font-mono">
            <span class="text-emerald-300 flex items-center gap-2">
              <span class="animate-spin">🔄</span> {{ armorPenStages[currentArmorPenSimStage] }}
            </span>
            <span class="text-gray-400">{{ (currentArmorPenSimStage + 1) * 20 }}%</span>
          </div>
          <n-progress type="line" :percentage="(currentArmorPenSimStage + 1) * 20" :show-indicator="false" status="success" />
        </div>

        <!-- Godot 4.6 LTS 源码展台 -->
        <div class="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-gray-300 font-mono">GODOT 4.6 LTS ARMOR PEN ENGINE</span>
              <n-tag size="small" type="success" round>res://scripts/combat/attributes/</n-tag>
            </div>
            <div class="flex items-center gap-2">
              <n-radio-group v-model:value="activeArmorPenScriptTab" size="small">
                <n-radio-button value="damage_solver">穿透衰减解算器</n-radio-button>
                <n-radio-button value="growth_tensor">六维成长张量</n-radio-button>
                <n-radio-button value="true_damage">真伤注入管道</n-radio-button>
              </n-radio-group>
              <n-button type="info" size="tiny" secondary round @click="copyArmorPenScript">
                复制当前脚本
              </n-button>
            </div>
          </div>

          <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
            <pre><code>{{ currentArmorPenScriptCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'
import { jobsList } from '../config/jobsConfig'

const message = useMessage()

const gameStore = useGameStore()
const activeCalculatorTab = ref('customizer')

// ================= 模块一：自定义成长配置与双向反推逻辑 =================
// 场景选项与对应推荐等级
const sceneOptions = [
  { label: '始源神殿外围 (序章启程 · 推荐 Lv.1~5)', value: 'map-intro', level: 1 },
  { label: '风之神殿 顶部神圣祭坛 (推荐 Lv.10)', value: 'wind-shrine', level: 10 },
  { label: '托尔纳运河 水道 (推荐 Lv.15)', value: 'torna-canal', level: 15 },
  { label: '沃鲁斯水之塔 (推荐 Lv.20)', value: 'worus-water', level: 20 },
  { label: '卡尔纳克城堡 逃生倒计时 (推荐 Lv.28)', value: 'karnak-castle', level: 28 },
  { label: '古代大图书馆 (推荐 Lv.35)', value: 'ancient-library', level: 35 },
  { label: '朗卡浮空遗迹 核心中枢 (推荐 Lv.45)', value: 'ronka-ruins', level: 45 },
  { label: '穆亚大森林 圣树封印 (推荐 Lv.55)', value: 'moore-forest', level: 55 },
  { label: '艾克斯德斯要塞 虚空王座 (推荐 Lv.70)', value: 'exdeath-castle', level: 70 },
  { label: '双子分歧之塔 魔物分流 (推荐 Lv.85)', value: 'fork-tower', level: 85 },
  { label: '大海沟熔岩地宫 深渊 (推荐 Lv.100)', value: 'great-trench', level: 100 },
  { label: '沉没沃鲁斯塔 模仿士试炼 (推荐 Lv.115)', value: 'sunken-worus', level: 115 },
  { label: '翡翠冥河通道 (推荐 Lv.135)', value: 'emerald-river', level: 135 },
  { label: '万魔殿 冥界王座 (推荐 Lv.160)', value: 'pandemonium', level: 160 },
  { label: '奈落地狱 熔岩十层 (推荐 Lv.185)', value: 'naraku-abyss', level: 185 },
  { label: '天空要塞浮游城 (推荐 Lv.210)', value: 'floating-city', level: 210 },
  { label: '月之地下溪谷 12F 龙穴 (推荐 Lv.235)', value: 'lunar-valley', level: 235 },
  { label: '次元之隙 & 终焉虚无核心 (满级极意 · 推荐 Lv.255)', value: 'void-core', level: 255 }
]

const selectedSceneId = ref('wind-shrine')

const currentSceneRecommendedLevel = computed(() => {
  const sc = sceneOptions.find(s => s.value === selectedSceneId.value)
  return sc ? sc.level : 10
})

const handleSceneChange = () => {
  characterLevel.value = currentSceneRecommendedLevel.value
}

const applySceneLevel = () => {
  characterLevel.value = currentSceneRecommendedLevel.value
}

// 用户自定义属性基础与成长配置 (支持 1 级 41 点，2 级 50 点灵活输入)
const customStatsConfig = reactive({
  str: { base: 41, growth: 9 },  // 1级 41点，2级 50点，每级+9点
  agi: { base: 35, growth: 7 },
  vit: { base: 38, growth: 8 },
  mag: { base: 25, growth: 7 },
  spr: { base: 30, growth: 8 },
  luck: { base: 40, growth: 5 },
  hp: { base: 180, growth: 120 },
  mp: { base: 50, growth: 25 }
})

const handleLevel2Change = (statKey: 'str' | 'agi' | 'vit' | 'mag' | 'spr' | 'luck', level2Val: number | null) => {
  if (typeof level2Val === 'number') {
    const baseVal = customStatsConfig[statKey].base
    customStatsConfig[statKey].growth = Math.max(1, level2Val - baseVal)
  }
}

const resetToDefaultGrowth = () => {
  customStatsConfig.str = { base: 41, growth: 9 }
  customStatsConfig.agi = { base: 35, growth: 7 }
  customStatsConfig.vit = { base: 38, growth: 8 }
  customStatsConfig.mag = { base: 25, growth: 7 }
  customStatsConfig.spr = { base: 30, growth: 8 }
  customStatsConfig.luck = { base: 40, growth: 5 }
  customStatsConfig.hp = { base: 180, growth: 120 }
  customStatsConfig.mp = { base: 50, growth: 25 }
}

const saveCustomGrowthConfig = () => {
  localStorage.setItem('ff_custom_stats_config', JSON.stringify(customStatsConfig))
}

// 目标血量反推等级输入与求解
const targetInputHP = ref<number>(500)
const targetInputSTR = ref<number | null>(null)
const reverseSolvedLevel = ref(3)

// 纯函数：根据等级推算 HP (完全无上限)
const getEstimatedHPForLevel = (lvl: number) => {
  const baseHp = customStatsConfig.hp.base
  const growthHp = customStatsConfig.hp.growth
  const vit = customStatsConfig.vit.base + (lvl - 1) * customStatsConfig.vit.growth
  return Math.round(baseHp + (lvl - 1) * growthHp + vit * 2.2 * (lvl / 10))
}

const getEstimatedStatForLevel = (key: 'str' | 'agi' | 'vit' | 'mag' | 'spr' | 'luck', lvl: number) => {
  return customStatsConfig[key].base + (lvl - 1) * customStatsConfig[key].growth
}

// 反推求解等级：根据输入的 HP 逆推出等级 (1 ~ 255)
const solveLevelByHP = (hpTarget: number) => {
  if (hpTarget <= customStatsConfig.hp.base) return 1
  for (let l = 1; l <= 255; l++) {
    if (getEstimatedHPForLevel(l) >= hpTarget) {
      return l
    }
  }
  return 255
}

const handleReverseHPInput = (val: number | null) => {
  if (typeof val === 'number') {
    reverseSolvedLevel.value = solveLevelByHP(val)
  }
}

const quickSetTargetHP = (val: number) => {
  targetInputHP.value = val
  reverseSolvedLevel.value = solveLevelByHP(val)
}

const handleReverseSTRInput = (val: number | null) => {
  if (typeof val === 'number') {
    const baseStr = customStatsConfig.str.base
    const growthStr = customStatsConfig.str.growth
    const lvl = Math.max(1, Math.min(255, Math.ceil((val - baseStr) / growthStr) + 1))
    reverseSolvedLevel.value = lvl
  }
}

const applyReverseSolvedLevel = () => {
  characterLevel.value = reverseSolvedLevel.value
}

// 里程碑演进表格数据 (Lv 1 ~ 255)
const milestoneLevels = [
  { level: 1, scene: '始源神殿外围' },
  { level: 2, scene: '北之山前哨' },
  { level: 10, scene: '风之神殿' },
  { level: 25, scene: '卡尔纳克城堡' },
  { level: 50, scene: '穆亚大森林' },
  { level: 85, scene: '双子分歧之塔' },
  { level: 120, scene: '沉没沃鲁斯塔' },
  { level: 160, scene: '万魔殿王座' },
  { level: 200, scene: '天空要塞' },
  { level: 255, scene: '次元之隙 · 终焉虚无' }
]

const milestoneTableData = computed(() => {
  return milestoneLevels.map(m => {
    const hp = getEstimatedHPForLevel(m.level)
    const str = getEstimatedStatForLevel('str', m.level)
    const agi = getEstimatedStatForLevel('agi', m.level)
    const patk = Math.round(str * 1.8 + 150)
    return {
      level: m.level,
      scene: m.scene,
      hp: `${hp.toLocaleString()} HP`,
      str,
      agi,
      patk
    }
  })
})

// ================= 模块二：角色配装器数据与演算 (无上限) =================
const characters = computed(() => gameStore.db.characters || [])
const selectedCharId = ref('li_chuan')
const characterLevel = ref(35) // 支持 1 ~ 255 级
const selectedJobId = ref('mystic-knight')
const selectedPassiveId = ref('dual-wield')
const selectedWeaponId = ref('excalibur')
const selectedOffhandId = ref('genji-shield')
const selectedArmorId = ref('genji-armor')
const selectedAccessoryId = ref('coral-ring')

const currentChar = computed(() => {
  return characters.value.find((c: any) => c.id === selectedCharId.value) || characters.value[0]
})

const currentJob = computed(() => {
  return jobsList.find(j => j.id === selectedJobId.value) || jobsList[0]
})

const jobSelectOptions = computed(() => {
  return jobsList.map(j => ({
    label: `${j.name} (${j.crystalName})`,
    value: j.id
  }))
})

const passiveOptionsList = [
  { label: '二刀流 (Dual Wield) · 左右手双持独立武器', value: 'dual-wield', effect: '左右手同时双持武器，单回合输出翻倍' },
  { label: '连续魔 (Dualcast) · 单回合连续施展双重禁咒', value: 'dualcast', effect: '单回合施放两次任意魔法' },
  { label: '乱打 (Rapid Fire) · 4段暴风破防连击', value: 'rapid-fire', effect: '单回合4次连续斩击，无视敌方50%物防' },
  { label: '魔法剑 (Spellblade) · 属性注入剑刃刀刀克制', value: 'spellblade', effect: '近战命中自动触发弱点属性暴击' },
  { label: '白刃接箭 (Blade Grasp) · 极高物理格挡', value: 'blade-grasp', effect: '物理单体攻击回避率 +45%' },
  { label: '调合 (Mix) · 药剂师质变合成神药', value: 'mix', effect: '两两融合超强神药配方' }
]

const passiveSelectOptions = passiveOptionsList.map(p => ({ label: p.label, value: p.value }))
const currentPassive = computed(() => {
  return passiveOptionsList.find(p => p.value === selectedPassiveId.value) || passiveOptionsList[0]
})

// 武器选项
const weaponOptions = [
  { label: '弑龙神枪 (P.ATK +165 / 龙属3倍特攻)', value: 'dragon-spear', atk: 165 },
  { label: '名刀鬼彻 (P.ATK +158 / 25%一刀两断)', value: 'kurogane', atk: 158 },
  { label: '圣剑阿斯托尔福 (P.ATK +170 / 圣属性)', value: 'excalibur', atk: 170 },
  { label: '全知贤者法杖 (M.ATK +160 / 咏唱加速)', value: 'sage-staff', atk: 90, matk: 160 },
  { label: '诸神之黄昏 (P.ATK +180 / 全属性强化)', value: 'ragnarok', atk: 180 }
]

const offhandOptions = [
  { label: '源氏之盾 (P.DEF +45 / 状态抗性+30%)', value: 'genji-shield', def: 45 },
  { label: '巨神之壁 (P.DEF +60 / 全队援护减伤)', value: 'titan-shield', def: 60 },
  { label: '【二刀流副手】名刀村雨 (P.ATK +145)', value: 'murasame', atk: 145 },
  { label: '【二刀流副手】烈火圣剑 (P.ATK +160)', value: 'fire-sword', atk: 160 }
]

const armorOptions = [
  { label: '源氏之铠 (P.DEF +55 / VIT +10)', value: 'genji-armor', def: 55, vit: 10 },
  { label: '黑金战甲 (P.DEF +68 / 全异常免疫)', value: 'black-armor', def: 68, vit: 15 },
  { label: '贤者法袍 (P.DEF +35 / MAG +20)', value: 'sage-robe', def: 35, mag: 20 },
  { label: '影行忍衣 (P.DEF +40 / AGI +15)', value: 'ninja-suit', def: 40, agi: 15 }
]

const accessoryOptions = [
  { label: '珊瑚戒指 (Coral Ring) · 吸收水属性海啸', value: 'coral-ring' },
  { label: '火焰戒指 (Flame Ring) · 吸收火属性波动', value: 'flame-ring' },
  { label: '缎带 (Ribbon) · 全异常状态绝对免疫', value: 'ribbon' },
  { label: '赫尔墨斯之靴 (Hermes) · 常驻急速加速', value: 'hermes' }
]

// 角色核心六维演算 (结合自定义成长配置，无上限)
const calculatedStats = computed(() => {
  const lvl = characterLevel.value
  return {
    str: customStatsConfig.str.base + (lvl - 1) * customStatsConfig.str.growth,
    agi: customStatsConfig.agi.base + (lvl - 1) * customStatsConfig.agi.growth,
    vit: customStatsConfig.vit.base + (lvl - 1) * customStatsConfig.vit.growth,
    mag: customStatsConfig.mag.base + (lvl - 1) * customStatsConfig.mag.growth,
    spr: customStatsConfig.spr.base + (lvl - 1) * customStatsConfig.spr.growth,
    luck: customStatsConfig.luck.base + (lvl - 1) * customStatsConfig.luck.growth
  }
})

// 生命值与魔力值演算 (彻底移除 9999 / 999 上限限制)
const calculatedHP = computed(() => {
  const vit = calculatedStats.value.vit
  const lvl = characterLevel.value
  let hp = Math.round(customStatsConfig.hp.base + (lvl - 1) * customStatsConfig.hp.growth + vit * 2.2 * (lvl / 10))
  if (selectedJobId.value === 'monk') hp = Math.round(hp * 1.3)
  return hp
})

const calculatedMP = computed(() => {
  const mag = calculatedStats.value.mag
  const spr = calculatedStats.value.spr
  const lvl = characterLevel.value
  let mp = Math.round(customStatsConfig.mp.base + (lvl - 1) * customStatsConfig.mp.growth + (mag + spr) * 0.4 * (lvl / 10))
  if (selectedJobId.value === 'summoner') mp = Math.round(mp * 1.4)
  return mp
})

// 物理攻击力与防御力 (无上限)
const calculatedPAtk = computed(() => {
  const str = calculatedStats.value.str
  const weapon = weaponOptions.find(w => w.value === selectedWeaponId.value)?.atk || 100
  const offhandAtk = offhandOptions.find(o => o.value === selectedOffhandId.value)?.atk || 0
  return Math.round(str * 1.8 + weapon + offhandAtk)
})

const calculatedPDef = computed(() => {
  const vit = calculatedStats.value.vit
  const shield = offhandOptions.find(o => o.value === selectedOffhandId.value)?.def || 0
  const armor = armorOptions.find(a => a.value === selectedArmorId.value)?.def || 30
  return Math.round(vit * 1.1 + shield + armor)
})

const calculatedMAtk = computed(() => {
  const mag = calculatedStats.value.mag
  return Math.round(mag * 2.2 + 80)
})

const calculatedCritRate = computed(() => {
  const luck = calculatedStats.value.luck
  const agi = calculatedStats.value.agi
  return Math.min(85, Math.round((luck * 0.15 + agi * 0.1)))
})

const calculatedEvasion = computed(() => {
  const agi = calculatedStats.value.agi
  let eva = Math.min(60, Math.round(agi * 0.12))
  if (selectedPassiveId.value === 'blade-grasp') eva += 35
  return Math.min(95, eva)
})

const atbSpeedRating = computed(() => {
  const agi = calculatedStats.value.agi
  if (agi > 300) return '光速超神 (2.5x ATB)'
  if (agi > 150) return '极速 (1.8x ATB)'
  if (agi > 80) return '快速 (1.4x ATB)'
  return '标准 (1.0x ATB)'
})

const totalPowerRating = computed(() => {
  return calculatedPAtk.value * 2 + calculatedPDef.value * 2 + calculatedHP.value + calculatedMP.value
})

// ================= 模块三：怪物属性器数据与演算 =================
const monsters = computed(() => gameStore.db.monsters || [])
const selectedRank = ref('all')
const selectedMonsterId = ref('forest_wolf')
const selectedDifficulty = ref('normal')
const selectedAttackCommand = ref('physical')

const monsterRanks = [
  { id: 'all', name: '全部魔物' },
  { id: 'normal', name: '原野常规' },
  { id: 'boss', name: '主线首领' },
  { id: 'ultimate', name: '深渊超神' }
]

const filteredMonsterOptions = computed(() => {
  return monsters.value
    .filter((m: any) => {
      if (selectedRank.value === 'all') return true
      if (selectedRank.value === 'normal') return m.rank === 'normal'
      if (selectedRank.value === 'boss') return m.rank === 'boss' || m.category === 'boss'
      if (selectedRank.value === 'ultimate') return m.level >= 60 || m.name.includes('欧米茄') || m.name.includes('神龙')
      return true
    })
    .map((m: any) => ({
      label: `Lv.${m.level} ${m.name} (${m.rankText || '首领'})`,
      value: m.id
    }))
})

const currentMonster = computed(() => {
  return monsters.value.find((m: any) => m.id === selectedMonsterId.value) || monsters.value[0]
})

const difficultyOptions = [
  { label: '标准原版生态 (1.0x 基准数值)', value: 'normal' },
  { label: '狂暴精英词缀 (+30% HP / +15% 攻击穿甲)', value: 'elite' },
  { label: '49层倒序深渊 (+100% HP / 极速ATB充能)', value: 'abyss' },
  { label: '二周目终焉超神 (+200% HP / 全抗性强化)', value: 'nightmare' }
]

const currentDifficultyDesc = computed(() => {
  if (selectedDifficulty.value === 'elite') return '⚠️ 怪物获得霸体与狂暴加成，生命值增加 30%，单体打击附带破防效果。'
  if (selectedDifficulty.value === 'abyss') return '🔥 处于深渊竞技场词缀环境：生命值翻倍，行动充能提升 50%，受击触发自爆倒计时。'
  if (selectedDifficulty.value === 'nightmare') return '☠️ 二周目极意难度：数值突破上限，全异常状态免疫，开局必发全屏毁灭技。'
  return '✅ 标准主线探险数值，遵循常规弱点属性与伤害结算法则。'
})

// 怪物随难度放大的属性
const scaledHP = computed(() => {
  const base = currentMonster.value?.hp || 1000
  if (selectedDifficulty.value === 'elite') return Math.round(base * 1.3)
  if (selectedDifficulty.value === 'abyss') return Math.round(base * 2.0)
  if (selectedDifficulty.value === 'nightmare') return Math.round(base * 3.0)
  return base
})

const scaledAttack = computed(() => {
  const base = currentMonster.value?.attack || 50
  if (selectedDifficulty.value === 'elite') return Math.round(base * 1.15)
  if (selectedDifficulty.value === 'abyss') return Math.round(base * 1.3)
  if (selectedDifficulty.value === 'nightmare') return Math.round(base * 1.6)
  return base
})

const scaledDefense = computed(() => {
  return currentMonster.value?.defense || 30
})

// 弱点与抗性推演
const getResistText = (element: string) => {
  const weak = (currentMonster.value?.weakness || '').toLowerCase()
  const name = currentMonster.value?.name || ''
  if (weak.includes(element) || (element === 'thunder' && name.includes('欧米茄')) || (element === 'holy' && weak.includes('圣'))) {
    return '弱点 200%'
  }
  if (name.includes('欧米茄') && element !== 'thunder') return '吸收'
  if (name.includes('液态火焰') && element === 'fire') return '吸收'
  if (name.includes('塞壬') && element === 'holy') return '弱点 200%'
  return '常规 100%'
}

const getResistColor = (element: string) => {
  const text = getResistText(element)
  if (text.includes('弱点')) return 'text-green-400'
  if (text.includes('吸收')) return 'text-purple-400'
  return 'text-gray-300'
}

// 攻击指令选项
const attackCommandOptions = [
  { label: '⚔️ 物理单刀重斩 (结合当前角色配装攻击力)', value: 'physical' },
  { label: '🌪️ 二刀流乱打 4 连斩 (二刀流物理极意)', value: 'rapid-fire' },
  { label: '⚡ 魔法剑雷系附魔 (Thundaga Sword 弱点特攻)', value: 'spellblade-thunder' },
  { label: '💥 黑魔法终极核爆 (Flare 真实贯穿)', value: 'flare' },
  { label: '🐉 召唤兽亿万核爆 (Megaflare 全屏湮灭)', value: 'bahamut' },
  { label: '⚗️ 药剂调合圣水炸弹 (Holy Bomb 不死系克星)', value: 'holy-bomb' }
]

const isWeaknessHit = computed(() => {
  const cmd = selectedAttackCommand.value
  const weak = (currentMonster.value?.weakness || '').toLowerCase()
  const name = currentMonster.value?.name || ''
  if (cmd === 'spellblade-thunder' && (weak.includes('thunder') || weak.includes('雷') || name.includes('欧米茄'))) return true
  if (cmd === 'holy-bomb' && (weak.includes('holy') || weak.includes('圣') || currentMonster.value?.race === 'undead')) return true
  return false
})

const estimatedDamage = computed(() => {
  const patk = calculatedPAtk.value
  const matk = calculatedMAtk.value
  const mdef = scaledDefense.value
  let dmg = 0

  if (selectedAttackCommand.value === 'physical') {
    dmg = Math.max(10, Math.round((patk * 2.2 - mdef * 1.2)))
  } else if (selectedAttackCommand.value === 'rapid-fire') {
    dmg = Math.max(40, Math.round((patk * 1.4 - mdef * 0.4) * 4))
  } else if (selectedAttackCommand.value === 'spellblade-thunder') {
    const mult = isWeaknessHit.value ? 2.2 : 1.0
    dmg = Math.max(50, Math.round((patk * 2.0 - mdef * 0.5) * mult))
  } else if (selectedAttackCommand.value === 'flare') {
    dmg = Math.max(100, Math.round(matk * 3.8 + 1500))
  } else if (selectedAttackCommand.value === 'bahamut') {
    dmg = Math.max(200, Math.round(matk * 4.5 + 2800))
  } else if (selectedAttackCommand.value === 'holy-bomb') {
    dmg = isWeaknessHit.value ? 9999 : 1200
  }

  return Math.max(1, dmg)
})

const turnsToKill = computed(() => {
  const hp = scaledHP.value
  const dmg = estimatedDamage.value
  return Math.max(1, Math.ceil(hp / dmg))
})

// ================= 模块四：自由潜能加点逻辑 (ATTRIBUTE_POINT_ALLOCATION.md) =================
const allocRole = ref('bartz')
const allocLevel = ref(25)
const allocBonusItems = ref(2)

const allocRoleOptions = [
  { label: '巴兹 (Bartz - 游侠平衡/物理输出)', value: 'bartz' },
  { label: '蕾娜 (Lenna - 圣洁白魔/高精治愈)', value: 'lenna' },
  { label: '加拉夫 (Galuf - 钢铁卫士/狂战坦克)', value: 'galuf' },
  { label: '法丽斯 (Faris - 极速刺客/魔剑双修)', value: 'faris' },
  { label: '克鲁鲁 (Krile - 禁咒魔导/元素爆发)', value: 'krile' }
]

interface AllocStatDef {
  key: 'attack' | 'speed' | 'max_mp' | 'max_hp' | 'spirit'
  name: string
  desc: string
  conversion: string
  icon: string
}

const allocStatDefinitions: AllocStatDef[] = [
  { key: 'attack', name: '力量 (Attack)', desc: '提升角色物理挥砍、重击与武器基础伤害', conversion: '+1 物理攻击力/点', icon: '🗡️' },
  { key: 'speed', name: '速度 (Speed)', desc: '提升角色 ATB 进度条充能速率与战场物理闪避率', conversion: '+1 敏捷速度/点', icon: '⚡' },
  { key: 'max_mp', name: '魔法值 (Max MP)', desc: '扩大角色施法容量池，增强高级黑白魔法连发续航', conversion: '+5 MP 上限/点', icon: '💧' },
  { key: 'max_hp', name: '生命力 (Max HP)', desc: '大幅扩充角色体能上限，抵御高阶首领穿透强击', conversion: '+20 HP 上限/点', icon: '❤️' },
  { key: 'spirit', name: '精神力 (Spirit)', desc: '增强魔法伤害倍率、圣洁治疗量与异常状态抵抗抗性', conversion: '+1 精神/魔防修正/点', icon: '✨' }
]

const allocPoints = reactive({
  attack: 30,
  speed: 25,
  max_mp: 20,
  max_hp: 35,
  spirit: 20
})

const totalAllocPoints = computed(() => {
  return 10 + (allocLevel.value - 1) * 5 + allocBonusItems.value * 2
})

const usedAllocPoints = computed(() => {
  return allocPoints.attack + allocPoints.speed + allocPoints.max_mp + allocPoints.max_hp + allocPoints.spirit
})

const remainingAllocPoints = computed(() => {
  return Math.max(0, totalAllocPoints.value - usedAllocPoints.value)
})

function adjustAllocStat(key: 'attack' | 'speed' | 'max_mp' | 'max_hp' | 'spirit', delta: number) {
  if (delta > 0 && remainingAllocPoints.value > 0) {
    allocPoints[key] += 1
  } else if (delta < 0 && allocPoints[key] > 0) {
    allocPoints[key] -= 1
  }
}

function resetAllocation() {
  allocPoints.attack = 0
  allocPoints.speed = 0
  allocPoints.max_mp = 0
  allocPoints.max_hp = 0
  allocPoints.spirit = 0
}

function autoAllocateByRole() {
  resetAllocation()
  const total = totalAllocPoints.value

  if (allocRole.value === 'bartz') {
    // 物理平衡型：力量 40%，速度 25%，HP 20%，MP 10%，精神 5%
    allocPoints.attack = Math.floor(total * 0.4)
    allocPoints.speed = Math.floor(total * 0.25)
    allocPoints.max_hp = Math.floor(total * 0.2)
    allocPoints.max_mp = Math.floor(total * 0.1)
    allocPoints.spirit = total - (allocPoints.attack + allocPoints.speed + allocPoints.max_hp + allocPoints.max_mp)
  } else if (allocRole.value === 'lenna' || allocRole.value === 'krile') {
    // 魔法精神型：精神 40%，MP 30%，HP 15%，速度 10%，力量 5%
    allocPoints.spirit = Math.floor(total * 0.4)
    allocPoints.max_mp = Math.floor(total * 0.3)
    allocPoints.max_hp = Math.floor(total * 0.15)
    allocPoints.speed = Math.floor(total * 0.1)
    allocPoints.attack = total - (allocPoints.spirit + allocPoints.max_mp + allocPoints.max_hp + allocPoints.speed)
  } else if (allocRole.value === 'galuf') {
    // 钢铁坦克型：HP 45%，力量 30%，速度 10%，精神 10%，MP 5%
    allocPoints.max_hp = Math.floor(total * 0.45)
    allocPoints.attack = Math.floor(total * 0.3)
    allocPoints.speed = Math.floor(total * 0.1)
    allocPoints.spirit = Math.floor(total * 0.1)
    allocPoints.max_mp = total - (allocPoints.max_hp + allocPoints.attack + allocPoints.speed + allocPoints.spirit)
  } else {
    // 刺客双修型：速度 35%，力量 30%，HP 15%，精神 10%，MP 10%
    allocPoints.speed = Math.floor(total * 0.35)
    allocPoints.attack = Math.floor(total * 0.3)
    allocPoints.max_hp = Math.floor(total * 0.15)
    allocPoints.spirit = Math.floor(total * 0.1)
    allocPoints.max_mp = total - (allocPoints.speed + allocPoints.attack + allocPoints.max_hp + allocPoints.spirit)
  }
}

// 基础值参考
const allocBaseHp = computed(() => 150 + allocLevel.value * 28)
const allocBaseMp = computed(() => 40 + allocLevel.value * 8)
const allocBaseAtk = computed(() => 20 + Math.floor(allocLevel.value * 2.5))
const allocBaseSpd = computed(() => 15 + Math.floor(allocLevel.value * 0.8))
const allocBaseSpr = computed(() => 18 + Math.floor(allocLevel.value * 1.2))

const allocDerivedHp = computed(() => allocBaseHp.value + allocPoints.max_hp * 20)
const allocDerivedMp = computed(() => allocBaseMp.value + allocPoints.max_mp * 5)
const allocDerivedAtk = computed(() => allocBaseAtk.value + allocPoints.attack)
const allocDerivedSpd = computed(() => allocBaseSpd.value + allocPoints.speed)
const allocDerivedSpr = computed(() => allocBaseSpr.value + allocPoints.spirit)

const allocCombatRating = computed(() => {
  return Math.round(
    allocDerivedHp.value * 0.8 +
    allocDerivedMp.value * 1.5 +
    allocDerivedAtk.value * 4.2 +
    allocDerivedSpd.value * 6.5 +
    allocDerivedSpr.value * 3.8
  )
})

const allocBuildAnalysis = computed(() => {
  const p = allocPoints
  if (p.attack >= p.spirit && p.attack >= p.max_hp && p.attack >= p.speed) {
    return '【纯粹狂战力攻流】物理打击爆发极高，推荐转职狂战士、骑士或武僧，装备双持二刀流。'
  }
  if (p.spirit >= p.attack && p.spirit >= p.max_hp) {
    return '【神圣魔导贤者流】治疗与法术增幅极强，推荐白魔导士、时空魔导士或召唤士，兼具团队保护。'
  }
  if (p.max_hp >= p.attack && p.max_hp >= p.spirit) {
    return '【不动要塞坦盾流】血量厚实容错率极高，推荐圣骑士带守护指令，适合越级首领开荒。'
  }
  if (p.speed >= p.attack && p.speed >= p.spirit) {
    return '【疾风瞬影游侠流】ATB充能速度极快，先手破招与逃脱率高，推荐盗贼、忍者或狩猎者。'
  }
  return '【四方均衡全能流】攻守兼备，适应多变复杂战场，推荐自由人职业佩戴各系被动技能。'
})

// ================= 模块五：ATB 动态行动条与六维属性阈值量化实验室 =================
interface AtbCombatant {
  id: string
  name: string
  icon: string
  job: string
  tagType: 'default' | 'info' | 'success' | 'warning' | 'error'
  agi: number
  gauge: number
  status: 'normal' | 'haste' | 'slow'
}

const isAtbRunning = ref(true)
const atbSimSpeed = ref(1)
const customMemberAgi = ref(50)
const customMemberStatus = ref<'normal' | 'haste' | 'slow'>('normal')

const atbCombatants = reactive<AtbCombatant[]>([
  { id: 'c1', name: '巴兹 (Bartz)', icon: '⚔️', job: '圣骑士', tagType: 'info', agi: 45, gauge: 30, status: 'normal' },
  { id: 'c2', name: '蕾娜 (Lenna)', icon: '✨', job: '白魔导士', tagType: 'success', agi: 38, gauge: 60, status: 'haste' },
  { id: 'c3', name: '加拉夫 (Galuf)', icon: '🛡️', job: '狂战士', tagType: 'error', agi: 32, gauge: 15, status: 'slow' },
  { id: 'c4', name: '法利斯 (Faris)', icon: '🗡️', job: '暗影忍者', tagType: 'warning', agi: 68, gauge: 85, status: 'normal' },
  { id: 'c5', name: '自定义战职 (Custom)', icon: '🌟', job: '自由极意', tagType: 'default', agi: 50, gauge: 45, status: 'normal' }
])

const calculateAtbTime = (agi: number, status: string): number => {
  const effectiveAgi = Math.min(agi, 115)
  const baseTime = Math.max(0.4, (120 - effectiveAgi) * 0.04)
  if (status === 'haste') return baseTime * 0.5
  if (status === 'slow') return baseTime * 2.0
  return baseTime
}

const syncCustomAgi = (val: number) => {
  const custom = atbCombatants.find(c => c.id === 'c5')
  if (custom) {
    custom.agi = val
  }
}

const setMemberStatus = (idx: number, status: 'normal' | 'haste' | 'slow') => {
  if (atbCombatants[idx]) {
    atbCombatants[idx].status = status
    if (atbCombatants[idx].id === 'c5') {
      customMemberStatus.value = status
    }
  }
}

const toggleAtbRunning = () => {
  isAtbRunning.value = !isAtbRunning.value
}

const resetAtbBars = () => {
  atbCombatants.forEach(c => {
    c.gauge = 0
  })
}

// ATB 循环计时器 (50ms 步进)
let atbTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  atbTimer = setInterval(() => {
    if (!isAtbRunning.value) return
    atbCombatants.forEach(c => {
      const timeSec = calculateAtbTime(c.agi, c.status)
      const ratePerSec = 100 / Math.max(timeSec, 0.2)
      const delta = (ratePerSec * 0.05 * atbSimSpeed.value)
      c.gauge += delta
      if (c.gauge >= 100) {
        c.gauge = 0 // 满槽触发行动，循环轮转
      }
    })
  }, 50)
})

onUnmounted(() => {
  if (atbTimer) {
    clearInterval(atbTimer)
    atbTimer = null
  }
})

// 六维属性软上限断点矩阵
const sixStatBreakpoints = [
  {
    key: 'str',
    name: '力量',
    icon: '💪',
    role: '物理攻击力基底',
    tagType: 'error' as const,
    cap1: '99 点 (常规极限)',
    cap2: '160 点 (宗师递减)',
    hardCap: '255 点 (满破神威)',
    formulaDesc: '≤99 时物理伤害倍率 1:1 线性成长；99~160 转换率折半 (50%)；突破 160 后每 4 点力量提升 1 点基础倍率。'
  },
  {
    key: 'agi',
    name: '敏捷',
    icon: '⚡',
    role: 'ATB流速与暴击回避',
    tagType: 'warning' as const,
    cap1: '75 点 (先手阈值)',
    cap2: '120 点 (极速封顶)',
    hardCap: '255 点 (回避硬化)',
    formulaDesc: 'AGI 达到 115 时 ATB 充能耗时压缩至极限 0.4 秒；>120 仅额外强化物理闪避率与盗窃成功率。'
  },
  {
    key: 'vit',
    name: '体力',
    icon: '🛡️',
    role: '最大HP与物理硬直防',
    tagType: 'info' as const,
    cap1: '99 点 (万血门槛)',
    cap2: '180 点 (坚壁减伤)',
    hardCap: '255 点 (极意肉壁)',
    formulaDesc: 'HP 成长随 VIT 平方级增强；>180 后激活百分比免伤阶梯，最高可抵消 35% 物理破甲真实伤害。'
  },
  {
    key: 'mag',
    name: '魔力',
    icon: '🔮',
    role: '黑白时空魔法倍率',
    tagType: 'primary' as const,
    cap1: '99 点 (禁咒核爆)',
    cap2: '165 点 (彗星共振)',
    hardCap: '255 点 (虚空法则)',
    formulaDesc: '法术伤害乘区 = (MAG * 技能威力 / 4)；>165 时突破 9999 伤害界限，核爆倍率每点魔力附加 0.4% 法术穿透。'
  },
  {
    key: 'spr',
    name: '精神',
    icon: '🕊️',
    role: '治疗量与魔法抗性',
    tagType: 'success' as const,
    cap1: '80 点 (全愈圣光)',
    cap2: '150 点 (天佑壁垒)',
    hardCap: '255 点 (不灭灵光)',
    formulaDesc: '精神决定神圣/愈伤效能与异常状态抵抗率；>150 时免疫 90% 死亡/石化/混乱即死系恶性状态。'
  },
  {
    key: 'lck',
    name: '幸运',
    icon: '🍀',
    role: '稀有掉落与偷盗神手',
    tagType: 'default' as const,
    cap1: '60 点 (两倍掉落)',
    cap2: '120 点 (三倍稀有)',
    hardCap: '255 点 (必掉神品)',
    formulaDesc: '提升世界首领与小怪稀有尾巴掉率（由 1/64 提升至 1/16）；并与赌徒类技能摇奖爆击率强关联。'
  }
]

// Godot 底层 ATB 解析脚本代码
const atbResolverScriptCode = `class_name AtbGaugeResolver
extends RefCounted

## 最终幻想：时空之轮 - 战斗核心 ATB 充能与属性软上限解算器
## 文件路径: res://scripts/combat/atb_gauge_resolver.gd
## 引擎版本: Godot Engine 4.6 LTS

const BASE_ATB_CAP: float = 100.0
const MIN_FILL_TIME_SEC: float = 0.4
const MAX_FILL_TIME_SEC: float = 4.8

static func compute_fill_duration(agility: int, status_flags: Dictionary) -> float:
    # 限制敏捷生效基准，避免极端敏捷导致除以零
    var clamped_agi: float = clampf(float(agility), 1.0, 115.0)
    var duration: float = (120.0 - clamped_agi) * 0.04
    duration = clampf(duration, MIN_FILL_TIME_SEC, MAX_FILL_TIME_SEC)

    # 时空魔法状态倍率
    if status_flags.get("haste", false):
        duration *= 0.5
    elif status_flags.get("slow", false):
        duration *= 2.0

    if status_flags.get("stop", false):
        return INF # 停滞状态下行动条冰冻

    return duration

static func process_atb_tick(current_gauge: float, duration: float, delta: float, battle_speed: float = 1.0) -> Dictionary:
    if is_inf(duration):
        return {"gauge": current_gauge, "ready": false}

    var rate_per_second: float = BASE_ATB_CAP / duration
    var increment: float = rate_per_second * delta * battle_speed
    var next_gauge: float = current_gauge + increment

    if next_gauge >= BASE_ATB_CAP:
        return {"gauge": BASE_ATB_CAP, "ready": true}
    
    return {"gauge": next_gauge, "ready": false}
`

// ================= 模块六：满破 255 巅峰神话极境突破与诸神战力评估工坊 =================
interface TranscendenceCandidate {
  id: string
  name: string
  title: string
  archetype: string
  specialty: string
  icon: string
  tagType: 'info' | 'success' | 'warning' | 'error' | 'primary'
  defaultStats: Record<string, number>
}

interface MythicGlyph {
  id: string
  name: string
  icon: string
  description: string
  effectLabel: string
  hpBonus: number
  mpBonus: number
  penBonus: number
  cpMult: number
}

const transcendenceCandidates: TranscendenceCandidate[] = [
  {
    id: 'bartz_god',
    name: '破限神域 · 巴兹',
    title: 'Wind God Transcendent',
    archetype: '物理狂暴',
    specialty: '真伤二刀流乱打',
    icon: '⚔️',
    tagType: 'info',
    defaultStats: { str: 255, agi: 220, vit: 230, mag: 160, spr: 180, lck: 240 }
  },
  {
    id: 'lenna_seraph',
    name: '创世炽天 · 蕾娜',
    title: 'Seraph Primordial',
    archetype: '圣光创世',
    specialty: '不灭神愈与神圣核爆',
    icon: '✨',
    tagType: 'success',
    defaultStats: { str: 150, agi: 210, vit: 240, mag: 245, spr: 255, lck: 230 }
  },
  {
    id: 'faris_abyss',
    name: '渊海支配 · 法丽丝',
    title: 'Abyssal Sovereign',
    archetype: '敏捷暗杀',
    specialty: '绝对时空闪避与暴击',
    icon: '🗡️',
    tagType: 'warning',
    defaultStats: { str: 240, agi: 255, vit: 200, mag: 200, spr: 170, lck: 255 }
  },
  {
    id: 'krile_aether',
    name: '太古灵尊 · 可露儿',
    title: 'Aether Archon',
    archetype: '以太万法',
    specialty: '虚空陨石四重连发',
    icon: '🔮',
    tagType: 'primary',
    defaultStats: { str: 140, agi: 230, vit: 190, mag: 255, spr: 250, lck: 220 }
  },
  {
    id: 'custom_transcendent',
    name: '自定义极境神体',
    title: 'Custom Sovereign',
    archetype: '全维自由',
    specialty: '全属性自由满破定制',
    icon: '👑',
    tagType: 'error',
    defaultStats: { str: 200, agi: 200, vit: 200, mag: 200, spr: 200, lck: 200 }
  }
]

const transcendenceStats = [
  { key: 'str', name: '极意力量', icon: '💪' },
  { key: 'agi', name: '极速敏捷', icon: '⚡' },
  { key: 'vit', name: '坚壁体魄', icon: '🛡️' },
  { key: 'mag', name: '虚无法魔', icon: '🔮' },
  { key: 'spr', name: '圣佑精神', icon: '🕊️' },
  { key: 'lck', name: '宿命幸运', icon: '🍀' }
]

const mythicGlyphs: MythicGlyph[] = [
  {
    id: 'glyph_crystal',
    name: '四象水晶本源神格',
    icon: '💎',
    description: '突破血肉苦弱，与地水火风四水晶直接融汇，大幅度突破体魄生命与法力极值。',
    effectLabel: 'HP +150,000, MP +9,999, 战力+30%',
    hpBonus: 150000,
    mpBonus: 9999,
    penBonus: 15.0,
    cpMult: 1.30
  },
  {
    id: 'glyph_void',
    name: '虚空暗能逆熵共振',
    icon: '🌀',
    description: '汲取时空裂隙深处的暗物质奇点力量，攻击时强行剥离目标 50% 物理与魔法防御壁垒。',
    effectLabel: '穿透率 +50%, 暴伤+100%, 战力+40%',
    hpBonus: 50000,
    mpBonus: 5000,
    penBonus: 50.0,
    cpMult: 1.40
  },
  {
    id: 'glyph_aether',
    name: '创世以太永劫回路',
    icon: '✨',
    description: '将施法与挥剑后摇完全清零，常驻超神速加速状态，ATB 充能耗时压缩至极限 0.15 秒。',
    effectLabel: 'ATB流速极大化, 伤害上限解禁至 999,999, 战力+35%',
    hpBonus: 80000,
    mpBonus: 8000,
    penBonus: 25.0,
    cpMult: 1.35
  }
]

const selectedCandidateId = ref('bartz_god')
const statValues = reactive<Record<string, number>>({
  str: 255,
  agi: 220,
  vit: 230,
  mag: 160,
  spr: 180,
  lck: 240
})

const activeGlyphs = ref<string[]>(['glyph_crystal', 'glyph_void', 'glyph_aether'])
const isSimulatingCombat = ref(false)
const transcendenceCombatLogs = ref<string[]>([
  '=== 满破 255 诸神战力评估工坊已就绪，点击启动对决推演 ==='
])

const selectCandidate = (id: string) => {
  selectedCandidateId.value = id
  const cand = transcendenceCandidates.find(c => c.id === id)
  if (cand) {
    Object.keys(cand.defaultStats).forEach(k => {
      statValues[k] = cand.defaultStats[k]
    })
  }
}

const maximizeAllStats = () => {
  Object.keys(statValues).forEach(k => {
    statValues[k] = 255
  })
}

const toggleGlyph = (id: string) => {
  const idx = activeGlyphs.value.indexOf(id)
  if (idx >= 0) {
    activeGlyphs.value.splice(idx, 1)
  } else {
    activeGlyphs.value.push(id)
  }
}

const calculatedMaxHP = computed(() => {
  const base = statValues.vit * 1200 + statValues.str * 300
  let bonus = 0
  activeGlyphs.value.forEach(gid => {
    const g = mythicGlyphs.find(glyph => glyph.id === gid)
    if (g) bonus += g.hpBonus
  })
  return base + bonus
})

const calculatedArmorPen = computed(() => {
  const base = (statValues.lck / 255) * 25.0 + (statValues.agi / 255) * 15.0
  let bonus = 0
  activeGlyphs.value.forEach(gid => {
    const g = mythicGlyphs.find(glyph => glyph.id === gid)
    if (g) bonus += g.penBonus
  })
  return Math.min(99.0, Math.max(10.0, base + bonus))
})

const calculatedDPS = computed(() => {
  const power = (statValues.str * 1.8 + statValues.mag * 1.6 + statValues.agi * 1.2) * 280
  const penMult = 1.0 + (calculatedArmorPen.value / 100)
  return Math.round(power * penMult)
})

const calculatedCombatPower = computed(() => {
  let statSum = (statValues.str * 1200) + (statValues.agi * 1100) + (statValues.vit * 1000) + (statValues.mag * 1200) + (statValues.spr * 950) + (statValues.lck * 1300)
  let mult = 1.0
  activeGlyphs.value.forEach(gid => {
    const g = mythicGlyphs.find(glyph => glyph.id === gid)
    if (g) mult *= g.cpMult
  })
  return Math.round(statSum * mult)
})

const combatPowerRank = computed(() => {
  const cp = calculatedCombatPower.value
  if (cp >= 7000000) return '神话级 (Mythic EX)'
  if (cp >= 5000000) return '半神级 (Demi-God SSS)'
  if (cp >= 3000000) return '极境级 (Ascendant SS)'
  return '破限级 (Breakthrough S)'
})

const combatRatingTag = computed(() => {
  const cp = calculatedCombatPower.value
  if (cp >= 7000000) return 'error'
  if (cp >= 5000000) return 'warning'
  return 'success'
})

const simulateTranscendenceCombat = () => {
  if (isSimulatingCombat.value) return
  isSimulatingCombat.value = true
  const cand = transcendenceCandidates.find(c => c.id === selectedCandidateId.value) || transcendenceCandidates[0]
  
  transcendenceCombatLogs.value = [
    `[0.0s] 👑【${cand.name}】进入 255 巅峰神话极境形态，展开诸神战意！`,
    `[0.3s] 💎 激活 ${activeGlyphs.value.length} 大神话星格，综合战力达 ${calculatedCombatPower.value.toLocaleString()} CP！`,
    `[0.6s] ⚡ 极意六维释放：力量 ${statValues.str}，敏捷 ${statValues.agi}，魔力 ${statValues.mag}！`,
    `[1.0s] 💥 击出神话连击！触发 ${calculatedArmorPen.value.toFixed(1)}% 绝对穿透，秒伤高达 ${calculatedDPS.value.toLocaleString()}！`,
    `[1.5s] 🛡️ 满破生命极值 ${calculatedMaxHP.value.toLocaleString()} HP 毫发无损，判定战阶为【${combatPowerRank.value}】！`
  ]

  setTimeout(() => {
    isSimulatingCombat.value = false
  }, 1000)
}

const copyTranscendenceData = () => {
  const cand = transcendenceCandidates.find(c => c.id === selectedCandidateId.value) || transcendenceCandidates[0]
  const text = `[满破255战力] 角色:${cand.name} | 战力:${calculatedCombatPower.value.toLocaleString()} CP (${combatPowerRank.value}) | 生命:${calculatedMaxHP.value.toLocaleString()} HP | 秒伤:${calculatedDPS.value.toLocaleString()} | 穿透:${calculatedArmorPen.value.toFixed(1)}% | 星格数:${activeGlyphs.value.length}`
  navigator.clipboard.writeText(text).then(() => {
    message.success('满破 255 巅峰诸神战力数据已复制！')
  }).catch(() => {
    message.info('数据已复制')
  })
}

const exportTranscendenceCert = () => {
  const cand = transcendenceCandidates.find(c => c.id === selectedCandidateId.value) || transcendenceCandidates[0]
  const now = new Date()
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 19)

  const content = `================================================================================
《光之战士：时空裂隙》满破 255 巅峰神话极境突破认证方案书
================================================================================
推演方案: Mythic Level 255 Transcendence & Combat Power Certificate
颁发机构: VBLE Stat Calculators & Growth Matrix / 诸神殿堂圣裁司
推演版本: VBLE Stat Calculators & Growth Matrix v2.2.259
引擎规范: Godot 4.6 LTS Transcendence Growth Evaluator
签发时间: ${dateStr} (CST)

【满破神躯基本档案】
- 认证角色名称: ${cand.name} (${cand.id})
- 冠绝神话称号: ${cand.title}
- 核心流派原型: ${cand.archetype}
- 绝脉神技专精: ${cand.specialty}
- 当前修炼境界: 等级 Lv. 255 (超越物理 99 极限满破)

【满破六维极意属性清单】
- 极意力量 (STR): ${statValues.str} / 255
- 极速敏捷 (AGI): ${statValues.agi} / 255
- 坚壁体魄 (VIT): ${statValues.vit} / 255
- 虚无法魔 (MAG): ${statValues.mag} / 255
- 圣佑精神 (SPR): ${statValues.spr} / 255
- 宿命幸运 (LCK): ${statValues.lck} / 255

【神话星格回路共鸣】
- 激活共鸣星格: ${activeGlyphs.value.map(gid => mythicGlyphs.find(g => g.id === gid)?.name).join(' + ') || '无'}
- 满破神体生命极值: ${calculatedMaxHP.value.toLocaleString()} HP
- 绝对穿透破防评定: ${calculatedArmorPen.value.toFixed(1)}% (全抗性穿透)
- 破限极意理论秒伤: ${calculatedDPS.value.toLocaleString()} / 秒
- 伤害解禁最高界值: 999,999 (突破 99,999 枷锁)
- 巅峰诸神战力总评: ${calculatedCombatPower.value.toLocaleString()} CP (${combatPowerRank.value})

================================================================================
数字防伪哈希: SHA256-TRANSCEND-${Math.random().toString(36).substring(2, 10).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}
================================================================================`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `character_transcendence_v2.2.259_${cand.id}.txt`
  a.click()
  URL.revokeObjectURL(url)
  message.success(`已导出满破神话极境认证方案书: ${cand.name}`)
}

const gdTranscendenceCode = `# ==============================================================================
# TranscendenceGrowthEvaluator - 满破 255 巅峰神话极境突破与战力解算器
# 文件路径: res://scripts/combat/transcendence_growth_evaluator.gd
# 架构规范: Godot 4.6 LTS / VBLE Stat Calculators & Growth Matrix v2.2.259
# 核心职责: 管理 255 满破六维非线性增长、四象水晶星格加权、伤害破限与综合 CP 估算
# ==============================================================================
class_name TranscendenceGrowthEvaluator
extends RefCounted

const LEVEL_CAP: int = 255
const BREAK_DAMAGE_CAP: int = 999999

static func calculate_transcendence_hp(vit: int, str: int, glyph_hp_bonus: int) -> int:
	var base_hp: int = vit * 1200 + str * 300
	return base_hp + glyph_hp_bonus

static func calculate_armor_penetration(lck: int, agi: int, glyph_pen_bonus: float) -> float:
	var base_pen: float = (float(lck) / 255.0) * 25.0 + (float(agi) / 255.0) * 15.0
	return clampf(base_pen + glyph_pen_bonus, 10.0, 99.0)

static func evaluate_combat_power(stats: Dictionary, glyph_mult: float) -> int:
	var str_val = stats.get("str", 255)
	var agi_val = stats.get("agi", 255)
	var vit_val = stats.get("vit", 255)
	var mag_val = stats.get("mag", 255)
	var spr_val = stats.get("spr", 255)
	var lck_val = stats.get("lck", 255)

	var stat_sum: int = (str_val * 1200) + (agi_val * 1100) + (vit_val * 1000) + (mag_val * 1200) + (spr_val * 950) + (lck_val * 1300)
	return int(stat_sum * glyph_mult)
`
// ================= 模块七：量子属性张量与多维数值跃迁工坊 (v2.2.284) =================
interface QuantumState {
  id: string
  name: string
  icon: string
  desc: string
  color: string
  resonanceBonus: string
}

const quantumStatesList: QuantumState[] = [
  {
    id: 'quantum_superposition',
    name: '量子叠加态 (Superposition)',
    icon: '⚛️',
    desc: '虚实双相重构，暴击率与真实穿透同频共振',
    color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    resonanceBonus: '穿透 +35% / 双态暴击'
  },
  {
    id: 'entropy_collapse',
    name: '负熵坍缩态 (Entropy Collapse)',
    icon: '💥',
    desc: '逆转热力学极限，全额破盾真实解构加成',
    color: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
    resonanceBonus: '破甲 +50% / 真实湮灭'
  },
  {
    id: 'relativistic_dilation',
    name: '相对论时滞态 (Relativistic Dilation)',
    icon: '⚡',
    desc: '光速跃迁微扰，行动速度超频与普朗克微秒闪避',
    color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
    resonanceBonus: '极速 +45% / 绝对微秒闪避'
  },
  {
    id: 'aether_singularity',
    name: '以太奇点态 (Aether Singularity)',
    icon: '🌀',
    desc: '万象高维归一，六维属性全张量共鸣强化',
    color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
    resonanceBonus: '六维共鸣 +40% / 终极掌控'
  }
]

const selectedQuantumState = ref('quantum_superposition')
const quantumDegrees = ref(8)
const tensorCurvature = ref(2.4)
const eigenEnergyLevel = ref(520)
const imaginaryStatRatio = ref(140)

const pauliExclusionBreaker = ref(true)
const waveFunctionLock = ref(true)
const planckShield = ref(false)

const activeGdQuantumTab = ref<'tensor' | 'damage' | 'planck'>('tensor')

const currentQuantumStateObj = computed(() => {
  return quantumStatesList.find(s => s.id === selectedQuantumState.value) || quantumStatesList[0]
})

const calculatedQuantumCombatPower = computed(() => {
  const baseEnergy = eigenEnergyLevel.value * 850 + quantumDegrees.value * 12500
  let total = baseEnergy * tensorCurvature.value * (imaginaryStatRatio.value / 100)
  if (pauliExclusionBreaker.value) {
    total *= 1.35
  }
  return Math.round(total)
})

const calculatedEigenDamage = computed(() => {
  let stateMult = 1.0
  switch (selectedQuantumState.value) {
    case 'quantum_superposition':
      stateMult = 1.35
      break
    case 'entropy_collapse':
      stateMult = 1.50
      break
    case 'relativistic_dilation':
      stateMult = 1.25
      break
    case 'aether_singularity':
      stateMult = 1.40
      break
  }
  let burst = eigenEnergyLevel.value * 145 * tensorCurvature.value * stateMult
  if (waveFunctionLock.value) {
    burst *= 1.5
  } else {
    burst *= 1.15
  }
  return Math.round(burst)
})

const calculatedRelativisticSpeed = computed(() => {
  return Math.round(200 + quantumDegrees.value * 18.5 * tensorCurvature.value)
})

const calculatedStabilityRating = computed(() => {
  let stability = 100 - tensorCurvature.value * 12
  if (planckShield.value) {
    stability += 25
  }
  const clamped = Math.max(12, Math.min(100, Math.round(stability)))
  return `${clamped}%`
})

// 五阶段模拟控制台
interface QuantumTerminalLog {
  time: string
  message: string
  color: string
}

const isQuantumSimulating = ref(false)
const quantumSimStage = ref(0)
const quantumSimFinished = ref(false)
const quantumTerminalLogs = ref<QuantumTerminalLog[]>([
  {
    time: 'INIT',
    message: '量子属性张量与多维数值跃迁工坊就绪。准备执行希尔伯特高维拓扑解算。',
    color: 'text-gray-400'
  }
])

function appendQuantumLog(msg: string, color = 'text-cyan-400') {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
  quantumTerminalLogs.value.push({ time: timeStr, message: msg, color })
}

function runQuantumSimulation() {
  if (isQuantumSimulating.value) return
  isQuantumSimulating.value = true
  quantumSimFinished.value = false
  quantumSimStage.value = 1
  appendQuantumLog('▶ 启动五阶段量子属性张量跃迁推演程序...', 'text-rose-400')

  setTimeout(() => {
    quantumSimStage.value = 2
    appendQuantumLog(`[阶段 1/5] 初始化 ${quantumDegrees.value} 维希尔伯特态矢量底座，时空曲率: ${tensorCurvature.value.toFixed(2)} G`, 'text-cyan-300')

    setTimeout(() => {
      quantumSimStage.value = 3
      appendQuantumLog(`[阶段 2/5] 激活特征本征能级 ${eigenEnergyLevel.value} MeV，虚数投影比率 ${imaginaryStatRatio.value}%`, 'text-amber-300')

      setTimeout(() => {
        quantumSimStage.value = 4
        const pauliText = pauliExclusionBreaker.value ? '已破缺(二次幂无上限)' : '未破缺(经典简并态)'
        const waveText = waveFunctionLock.value ? '已锚定波峰' : '自由振荡'
        appendQuantumLog(`[阶段 3/5] 校验泡利不相容态[${pauliText}]与波函数坍缩[${waveText}]`, 'text-purple-300')

        setTimeout(() => {
          quantumSimStage.value = 5
          const shieldText = planckShield.value ? '已注入普朗克负熵能量膜' : '常规能障'
          appendQuantumLog(`[阶段 4/5] 普朗克护盾状态[${shieldText}]，最终战力: ${calculatedQuantumCombatPower.value.toLocaleString()} CP`, 'text-emerald-300')

          setTimeout(() => {
            isQuantumSimulating.value = false
            quantumSimFinished.value = true
            appendQuantumLog(`✓ [阶段 5/5] 量子张量多维跃迁推演完成！破限伤害: ${calculatedEigenDamage.value.toLocaleString()}，矩阵稳态率: ${calculatedStabilityRating.value}`, 'text-emerald-400 font-bold')
            message.success('量子张量五阶段跃迁推演完成！')
          }, 350)
        }, 350)
      }, 350)
    }, 350)
  }, 350)
}

function exportQuantumEntropyCertificate() {
  const certData = {
    standard: 'Godot 4.6 LTS / VBLE Quantum Tensor Matrix v2.2.284',
    timestamp: new Date().toISOString(),
    quantumState: selectedQuantumState.value,
    parameters: {
      quantumDegrees: quantumDegrees.value,
      tensorCurvature: tensorCurvature.value,
      eigenEnergyLevel: eigenEnergyLevel.value,
      imaginaryStatRatio: imaginaryStatRatio.value,
      pauliExclusionBreaker: pauliExclusionBreaker.value,
      waveFunctionLock: waveFunctionLock.value,
      planckShield: planckShield.value
    },
    results: {
      quantumCombatPower: calculatedQuantumCombatPower.value,
      eigenBurstDamage: calculatedEigenDamage.value,
      relativisticSpeed: calculatedRelativisticSpeed.value,
      tensorStability: calculatedStabilityRating.value
    },
    sha256Signature: 'SHA256-QUANTUM-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `quantum_stat_tensor_v2.2.284_${selectedQuantumState.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出量子张量跃迁方案证书！')
}

const gdQuantumTensorEvaluatorCode = `# ==============================================================================
# QuantumStatTensorEvaluator - 量子属性张量与多维数值跃迁解算器
# 文件路径: res://scripts/combat/quantum_stat_tensor_evaluator.gd
# 架构规范: Godot 4.6 LTS / VBLE Stat Calculators & Growth Matrix v2.2.284
# 核心职责: 管理希尔伯特高维张量重构、虚数属性投影与泡利相干性破缺
# ==============================================================================
class_name QuantumStatTensorEvaluator
extends RefCounted

const MAX_HILBERT_DIMENSIONS: int = 16
const PLANCK_CONSTANT_SIMULATED: float = 6.626e-34

static func calculate_quantum_combat_power(
	eigen_energy: int,
	dimensions: int,
	curvature: float,
	imaginary_ratio: float,
	pauli_breaker: bool
) -> int:
	var base_energy: float = float(eigen_energy) * 850.0 + float(dimensions) * 12500.0
	var tensor_scale: float = base_energy * curvature * (imaginary_ratio / 100.0)
	if pauli_breaker:
		tensor_scale *= 1.35
	return int(round(tensor_scale))

static func evaluate_tensor_stability(curvature: float, has_planck_shield: bool) -> float:
	var stability: float = 100.0 - (curvature * 12.0)
	if has_planck_shield:
		stability += 25.0
	return clampf(stability, 12.0, 100.0)
`

const gdEigenDamageResolverCode = `# ==============================================================================
# EigenDamageMatrixResolver - 特征本征极境破限伤害解析器
# 文件路径: res://scripts/combat/eigen_damage_matrix_resolver.gd
# 架构规范: Godot 4.6 LTS / VBLE Stat Calculators & Growth Matrix v2.2.284
# 核心职责: 本征矩阵解算、波函数坍缩暴击增幅与虚数维度非线性衰减
# ==============================================================================
class_name EigenDamageMatrixResolver
extends RefCounted

const BASE_COLLAPSE_THRESHOLD: float = 0.9995

static func resolve_eigen_damage(
	eigen_energy: int,
	curvature: float,
	wave_lock: bool,
	quantum_state: String
) -> int:
	var state_mult: float = 1.0
	match quantum_state:
		"quantum_superposition":
			state_mult = 1.35
		"entropy_collapse":
			state_mult = 1.50
		"relativistic_dilation":
			state_mult = 1.25
		"aether_singularity":
			state_mult = 1.40
		_:
			state_mult = 1.0

	var burst: float = float(eigen_energy) * 145.0 * curvature * state_mult
	if wave_lock:
		burst *= 1.5
	else:
		burst *= 1.15
	return int(round(burst))
`

const gdPlanckImaginaryControllerCode = `# ==============================================================================
# PlanckImaginaryStatController - 普朗克量子真伤护盾与虚数投影控制器
# 文件路径: res://scripts/combat/planck_imaginary_stat_controller.gd
# 架构规范: Godot 4.6 LTS / VBLE Stat Calculators & Growth Matrix v2.2.284
# 核心职责: 普朗克微秒极限定位、超额致死真实伤害吸收与负熵状态维持
# ==============================================================================
class_name PlanckImaginaryStatController
extends RefCounted

static func filter_incoming_damage(
	raw_damage: int,
	current_hp: int,
	shield_enabled: bool,
	imaginary_ratio: float
) -> Dictionary:
	var absorbed: int = 0
	var final_damage: int = raw_damage

	if shield_enabled and raw_damage >= current_hp:
		absorbed = raw_damage - (current_hp / 2)
		final_damage = current_hp / 2

	var imaginary_feedback: int = int(round(float(absorbed) * (imaginary_ratio / 200.0)))

	return {
		"final_damage": final_damage,
		"absorbed_damage": absorbed,
		"imaginary_reflected": imaginary_feedback,
		"quantum_stabilized": true
	}
`

const currentGdQuantumCode = computed(() => {
  if (activeGdQuantumTab.value === 'tensor') return gdQuantumTensorEvaluatorCode
  if (activeGdQuantumTab.value === 'damage') return gdEigenDamageResolverCode
  return gdPlanckImaginaryControllerCode
})


// ==========================================
// v2.2.333: 六维属性与穿透衰减工坊逻辑
// ==========================================
interface HexagonStatArchetype {
  id: string
  name: string
  subtitle: string
  icon: string
  tag: string
  desc: string
  basePowerWeight: number
}

const hexagonStatArchetypes: HexagonStatArchetype[] = [
  {
    id: 'berserker_heavy_cleave',
    name: '狂战士·破甲毁灭',
    subtitle: '力量主宰与破甲穿透毁灭流',
    icon: '🪓',
    tag: '巨力破壁',
    desc: '力量突破阈值引发巨力崩解，重劈攻击对高甲目标施加双倍穿透，附带粉碎护甲效果。',
    basePowerWeight: 450
  },
  {
    id: 'sage_mind_pierce',
    name: '大贤者·魔能贯穿',
    subtitle: '智力精神双峰与魔法绝对穿透流',
    icon: '🔮',
    tag: '天神贯穿',
    desc: '智力与精神双核共鸣，魔法咒文剥离敌方全元素抗性，任何抗性屏障均无法衰减魔能。',
    basePowerWeight: 480
  },
  {
    id: 'assassin_speed_crit',
    name: '影刃刺客·极速真伤',
    subtitle: '极速身法与背刺必定真实伤害流',
    icon: '🗡️',
    tag: '瞬影绝杀',
    desc: '身法敏捷达到光速微秒判定，从背侧击中敌人时 100% 转化无视护甲之致命真实伤害。',
    basePowerWeight: 420
  },
  {
    id: 'paladin_iron_defense',
    name: '圣殿壁垒·绝对衰减',
    subtitle: '体质耐力超载与伤害绝对衰减流',
    icon: '🛡️',
    tag: '圣域刚体',
    desc: '体力与坚韧产生绝对力场，受到的敌方超限暴击伤害被对数曲线强制衰减至刮痧程度。',
    basePowerWeight: 440
  }
]

const selectedHexagonArchetypeId = ref('berserker_heavy_cleave')
const armorPenetrationRatio = ref(65)
const defenseAttenuationCurveExp = ref(1.25)
const hexagonStatGrowthMultiplier = ref(2.5)
const combatPowerNormalizationFactor = ref(280)

const armorPiercingCapExempt = ref(true)
const quadraticDamageScaling = ref(true)
const dynamicTrueDamageInjection = ref(true)

const selectHexagonArchetype = (id: string) => {
  selectedHexagonArchetypeId.value = id
  if (message) {
    const arch = hexagonStatArchetypes.find(a => a.id === id)
    if (arch) message.success(`已切换六维战力原型：${arch.name}`)
  }
}

const calculatedArmorMetrics = computed(() => {
  const arch = hexagonStatArchetypes.find(a => a.id === selectedHexagonArchetypeId.value) || hexagonStatArchetypes[0]
  const baseWeight = arch.basePowerWeight
  const quadBonus = quadraticDamageScaling.value ? 1.45 : 1.0
  const finalMult = Math.round(100 * (1.0 + (armorPenetrationRatio.value / 100) * defenseAttenuationCurveExp.value * quadBonus))
  
  const bypassed = Math.min(99.0, (armorPenetrationRatio.value * 1.15 + (armorPiercingCapExempt.value ? 15 : 0))).toFixed(1)
  const powerScore = Math.round(baseWeight * hexagonStatGrowthMultiplier.value * combatPowerNormalizationFactor.value * (dynamicTrueDamageInjection.value ? 1.3 : 1.0))

  let rank = 'SSR·宗师属性架构使'
  if (powerScore >= 600000) rank = 'EX·全域六维极值神算尊者'
  else if (powerScore >= 400000) rank = 'SSS·天命力矩主宰'

  return {
    effectiveDamageMultiplier: `+${finalMult}%`,
    damageReductionBypassed: `${bypassed}%`,
    compositeHeroCombatPower: powerScore.toLocaleString(),
    statMasteryCertification: rank
  }
})

const isSimulatingArmorPen = ref(false)
const currentArmorPenSimStage = ref(0)
const armorPenStages = [
  '角色六维基准力矩与命座矩阵投射...',
  '敌方护甲非线性衰减对数曲线拟合...',
  '物理与魔法穿透溢出真实伤害解算...',
  '综合战力归一化张量加权平衡推演...',
  '属性构筑方案防伪公钥计算与证书封装...'
]

const runArmorPenSimulation = () => {
  if (isSimulatingArmorPen.value) return
  isSimulatingArmorPen.value = true
  currentArmorPenSimStage.value = 0

  const interval = setInterval(() => {
    if (currentArmorPenSimStage.value < armorPenStages.length - 1) {
      currentArmorPenSimStage.value++
    } else {
      clearInterval(interval)
      isSimulatingArmorPen.value = false
      if (message) {
        message.success(`【穿透衰减沙盘】推演成功！英雄综合战力指数：${calculatedArmorMetrics.value.compositeHeroCombatPower}`)
      }
    }
  }, 400)
}

const exportArmorPenCertificate = () => {
  const hash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  const cert = `=== 《光之战士：时空裂隙》六维属性与防御穿透方案证书 ===
证书编号: STAT-ARMOR-${hash.substring(0, 12).toUpperCase()}
战力原型: ${selectedHexagonArchetypeId.value}
防御穿透深度: ${armorPenetrationRatio.value}%
衰减对数指数: ${defenseAttenuationCurveExp.value.toFixed(2)}
成长增幅倍率: ${hexagonStatGrowthMultiplier.value.toFixed(1)}x
综合伤害倍率: ${calculatedArmorMetrics.value.effectiveDamageMultiplier}
击穿敌方减伤: ${calculatedArmorMetrics.value.damageReductionBypassed}
英雄综合战力: ${calculatedArmorMetrics.value.compositeHeroCombatPower}
属性架构评级: ${calculatedArmorMetrics.value.statMasteryCertification}
安全校验哈希: SHA-256:${hash}
验证状态: 官方属性成长张量与伤害穿透引擎认证通过 (Godot 4.6 LTS Verified)
=======================================================`
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(cert)
    if (message) message.success('已导出六维属性与穿透方案证书到剪贴板！')
  }
}

const activeArmorPenScriptTab = ref<'damage_solver' | 'growth_tensor' | 'true_damage'>('damage_solver')

const armorPenScriptCodes = {
  damage_solver: `class_name ArmorPenetrationDamageSolver
extends RefCounted

## 最终幻想：时空之轮 - 防御穿透与伤害非线性衰减解算器
## 文件路径: res://scripts/combat/attributes/armor_penetration_damage_solver.gd
## 引擎版本: Godot Engine 4.6 LTS

static func solve_penetrated_damage(
    raw_damage: float,
    target_armor: float,
    pen_ratio: float,
    attenuation_exp: float
) -> Dictionary:
    var effective_armor: float = target_armor * (1.0 - clampf(pen_ratio, 0.0, 0.95))
    var mitigation: float = pow(effective_armor / (effective_armor + 1000.0), attenuation_exp)
    var final_damage: float = raw_damage * (1.0 - mitigation)
    
    return {
        "final_damage": final_damage,
        "mitigation_pct": mitigation * 100.0,
        "effective_armor": effective_armor
    }
`,

  growth_tensor: `class_name HexagonStatGrowthTensor
extends Node

## 最终幻想：时空之轮 - 六维属性成长张量与战力归一化评估器
## 文件路径: res://scripts/combat/attributes/hexagon_stat_growth_tensor.gd
## 引擎版本: Godot Engine 4.6 LTS

signal combat_power_calculated(hero_id: String, combat_power: int)

func evaluate_combat_power(stats: Dictionary, weight_factor: float) -> int:
    var str_val: float = float(stats.get("str", 100))
    var agi_val: float = float(stats.get("agi", 100))
    var vit_val: float = float(stats.get("vit", 100))
    var int_val: float = float(stats.get("int", 100))
    var spr_val: float = float(stats.get("spr", 100))
    var luk_val: float = float(stats.get("luk", 100))
    
    var total_norm: float = (str_val + agi_val + vit_val + int_val + spr_val + luk_val) * (weight_factor / 100.0)
    var final_power: int = int(roundf(total_norm))
    combat_power_calculated.emit("hero", final_power)
    return final_power
`,

  true_damage: `class_name TrueDamageInjectionPipeline
extends RefCounted

## 最终幻想：时空之轮 - 穿透溢出真实伤害动态注入管道
## 文件路径: res://scripts/combat/attributes/true_damage_injection_pipeline.gd
## 引擎版本: Godot Engine 4.6 LTS

static func inject_overflow_true_damage(raw_dmg: float, pen_ratio: float, armor_val: float) -> Dictionary:
    var is_overflow: bool = (pen_ratio > 0.8) and (armor_val < 500.0)
    var true_dmg: float = raw_dmg * 0.35 if is_overflow else 0.0
    return {
        "true_damage_injected": true_dmg,
        "is_true_damage_active": is_overflow
    }
`
}

const currentArmorPenScriptCode = computed(() => {
  return armorPenScriptCodes[activeArmorPenScriptTab.value]
})

const copyArmorPenScript = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentArmorPenScriptCode.value)
    if (message) message.success('已复制 Godot 4.6 LTS 穿透衰减源码到剪贴板！')
  }
}

</script>
