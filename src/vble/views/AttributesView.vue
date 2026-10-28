<template>
  <div class="attributes-page p-3 sm:p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="warning" size="small" round class="mb-2">Stat Calculators & Growth Studio</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-amber mb-2">角色属性器 & 怪物属性器</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm mb-3">
        支持 255 级满破无限数值演算、输入血量即时反推等级、场景地宫关联自动定级、以及 1 级到 255 级属性成长双向自定义
      </p>
      <div class="flex justify-center gap-2">
        <n-button size="small" type="primary" secondary @click="$router.push('/vble/modifier')">
          🛠️ 前往独立全域 GM 属性修改器专页
        </n-button>
      </div>
    </div>

    <!-- 顶部分页器：角色配装器 VS 双向属性自定义编辑器 VS 怪物解析器 -->
    <div class="flex justify-center">
      <n-tabs v-model:value="activeCalculatorTab" type="segment" style="max-width: 680px;">
        <n-tab-pane name="customizer">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'customizer'">
              🛠️ 属性双向调节与场景逆推器 (Lv.255)
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="character">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'character'">
              🎮 角色配装实战模拟器 (无上限)
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="monster">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'monster'">
              👾 怪物属性与弱点解析器
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="allocation">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'allocation'">
              ✨ 自由潜能加点模拟器 (Stat Points)
            </button>
          </template>
        </n-tab-pane>
        <n-tab-pane name="atb_thresholds">
          <template #tab>
            <button type="button" style="font: inherit;" class="border-0 bg-transparent p-0 text-inherit cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" :aria-pressed="activeCalculatorTab === 'atb_thresholds'">
              ⏱️ ATB 行动条与六维断点量化 (ATB & Caps)
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
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'
import { jobsList } from '../config/jobsConfig'

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
</script>
