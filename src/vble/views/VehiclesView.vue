<template>
  <div class="vehicles-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-blue-950/80 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.15)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              VBLE Vehicles Matrix, Spatiotemporal Warp Drive & Cruise Studio v2.2.327
            </span>
            <span class="text-xs text-gray-400">大世界航行与次元动力</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🛸</span> 全地形神话载具、动力拓扑引擎与空天巡航工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            从黄色平原走兽、黑陆行鸟林间破空，到跨海蒸汽机船、潜水艇深渊下潜，乃至突破世界卡门线飞向红月的月之巨鲸。收录全部 10 项载具全貌与实机航行推演工坊。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToSpatiotemporalWarpStudio"
          >
            <template #icon><span>🚀</span></template>
            时空跃迁驱动工坊
          </n-button>
          <n-button
            type="success"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToMythicCruiseStudio"
          >
            <template #icon><span>🚀</span></template>
            空天动力拓扑工坊
          </n-button>
          <n-button
            type="error"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToOrbitalWarpStudio"
          >
            <template #icon><span>🌌</span></template>
            星轨重力弹弓工坊
          </n-button>
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToOverdriveStudio"
          >
            <template #icon><span>⚡</span></template>
            以太超频推进工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>🚀</span></template>
            动力巡航沙盘
          </n-button>
          <n-button
            type="info"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToWarpStudio"
          >
            <template #icon><span>🌌</span></template>
            星舰折跃工坊
          </n-button>
          <router-link to="/vble/scenes">
            <n-button size="medium" round tertiary>
              查看世界地图
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心统计概览卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">实装载具总数</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">{{ vehiclesList.length }} 种</div>
        <div class="text-[10px] text-gray-500 mt-0.5">海陆空星全域覆蔽</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">空间维度层级</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">3 级维度</div>
        <div class="text-[10px] text-gray-500 mt-0.5">地表 · 深海 · 月轨星隙</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">最高巡航极速</div>
        <div class="text-2xl font-black text-rose-400 font-mono mt-1">瞬发跃迁</div>
        <div class="text-[10px] text-gray-500 mt-0.5">双月星际改造飞空艇</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">遇敌屏蔽机制</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">0% 绝对隐匿</div>
        <div class="text-[10px] text-gray-500 mt-0.5">黄陆行鸟 / 飞空艇特权</div>
      </div>
    </div>

    <!-- 载具分类检索卡片 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4" role="group" aria-label="载具分类">
      <button
        v-for="cat in vehicleCategories"
        :key="cat.id"
        type="button"
        class="p-4 rounded-xl text-left cursor-pointer transition-all border bg-slate-900/90 hover:scale-[1.02]"
        :class="activeCategory === cat.id ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50' : 'border-slate-800 hover:border-slate-700'"
        @click="activeCategory = cat.id"
      >
        <span class="block text-2xl mb-1.5">{{ cat.icon }}</span>
        <span class="block text-sm font-bold text-gray-100">{{ cat.name }}</span>
        <span class="block text-xs text-gray-400 mt-1 leading-snug">{{ cat.desc }}</span>
      </button>
    </div>

    <!-- 载具详细卡片列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="veh in filteredVehicles"
        :key="veh.id"
        class="rounded-xl bg-[#0f1422]/90 border transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
        :class="selectedVehicleId === veh.id ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-500/40' : 'border-slate-800 hover:border-slate-700'"
      >
        <div class="space-y-3.5">
          <!-- 卡片头部 -->
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">{{ getVehicleIcon(veh.id) }}</span>
                <h3 class="font-bold text-base text-cyan-300">{{ veh.name }}</h3>
              </div>
              <div class="flex items-center gap-2 mt-1">
                <n-tag size="tiny" :type="getTypeTag(veh.type)">{{ veh.type }}</n-tag>
                <span class="text-[11px] text-gray-400 font-mono">ID: {{ veh.id }}</span>
              </div>
            </div>
            <div class="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
              ⚡ {{ veh.speed }}
            </div>
          </div>

          <!-- 通航特权与边界 -->
          <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800/80 space-y-1">
            <div class="text-xs text-amber-400 font-bold flex items-center gap-1.5">
              <span>🧭 通航特权与边界规则:</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">{{ veh.capability }}</p>
          </div>

          <!-- 载具详述 -->
          <p class="text-xs text-gray-400 leading-relaxed">{{ veh.desc }}</p>

          <!-- 背景典故 -->
          <div v-if="veh.lore" class="text-[11px] text-purple-300/80 italic border-l-2 border-purple-500/40 pl-2.5">
            "{{ veh.lore }}"
          </div>
        </div>

        <!-- 底部快捷载入按钮 -->
        <div class="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-[11px] text-gray-500">分类: {{ veh.category }}</span>
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
            :class="selectedVehicleId === veh.id ? 'bg-amber-400 text-slate-950 font-bold shadow-md' : 'bg-slate-800 text-amber-300 hover:bg-slate-750 border border-slate-700'"
            @click="selectForSimulation(veh.id)"
          >
            <span>{{ selectedVehicleId === veh.id ? '✓ 正在推演' : '🚀 载入巡航沙盘' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 核心推演工坊：全地形大世界航行与动力推演沙盘 -->
    <div id="vehicle-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0f1320] via-[#14192a] to-[#0d101a] border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              CRUISING SIMULATION STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧭</span> 大世界全域航行与动力推演工坊
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            对齐 Godot 引擎 vehicle_navigation_system.gd 规则：动态推演航速加权、全地形阻隔判定、暗怪遇敌率抑制与安全着陆窗。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickTakeoff">
            🚀 发动引擎起航
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：载具动力设定 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-amber-300 flex items-center gap-2">
            <span>⚙️</span> 载具动力参数 (Power Configuration)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选定当前载具 (Current Vehicle)</label>
              <n-select
                v-model:value="selectedVehicleId"
                :options="vehicleSelectOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>巡航推进输出 (Throttle Output):</span>
                <span class="font-mono text-amber-400 font-bold text-sm">{{ throttlePercent }}%</span>
              </div>
              <n-slider v-model:value="throttlePercent" :min="20" :max="150" :step="5" />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>魔导以太 / 饲料燃料储备:</span>
                <span class="font-mono text-cyan-400 font-bold">{{ fuelReserve }}%</span>
              </div>
              <n-slider v-model:value="fuelReserve" :min="0" :max="100" :step="5" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">携带【基萨尔野菜】(唤醒胖陆行鸟):</span>
                <n-switch v-model:value="hasGhisahlGreens" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">装备【飞空艇反引力共振仪】:</span>
                <n-switch v-model:value="hasAntigravityModule" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：航线地形与目标地貌 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>🗺️</span> 航道与目标地形 (Terrain & Destination)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">出发航行海陆空区域 (Origin Sector)</label>
              <n-select
                v-model:value="originSector"
                :options="sectorOptions"
                size="small"
              />
            </div>

            <div>
              <label class="text-gray-400 block mb-1">目标着陆地貌 (Destination Terrain)</label>
              <n-select
                v-model:value="targetTerrain"
                :options="terrainOptions"
                size="small"
              />
            </div>

            <div>
              <label class="text-gray-400 block mb-1">恶劣天候与洋流障碍 (Hazard)</label>
              <n-select
                v-model:value="weatherHazard"
                :options="hazardOptions"
                size="small"
              />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">目标存在沉没海沟 (深渊潜水艇专属):</span>
                <n-switch v-model:value="isSubmarineTrench" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">处于双月引力圈 (红月/青之月):</span>
                <n-switch v-model:value="isLunarOrbit" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息实时推演指标 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-amber-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 巡航航行结算指标</span>
              <n-tag size="tiny" :type="navResult.canPass ? 'success' : 'error'">
                {{ navResult.canPass ? '航线通畅 · 准予着陆' : '地形阻隔 · 无法降落' }}
              </n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 实际巡航速度 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">最终实际巡航极速 (Effective Speed)</div>
                <div class="text-3xl font-black font-mono mt-1 tracking-wider text-amber-400">
                  {{ navResult.effectiveSpeedText }}
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  {{ navResult.speedNotes }}
                </div>
              </div>

              <!-- 遇敌率与通行安全 -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">暗怪遭遇概率</div>
                  <div class="font-mono font-bold mt-0.5 text-sm" :class="navResult.encounterRate === 0 ? 'text-emerald-400' : 'text-rose-400'">
                    {{ navResult.encounterRateText }}
                  </div>
                </div>
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">着陆安全窗</div>
                  <div class="font-mono font-bold mt-0.5 text-sm" :class="navResult.landingSafety ? 'text-cyan-400' : 'text-amber-500'">
                    {{ navResult.landingSafetyText }}
                  </div>
                </div>
              </div>

              <!-- 特权与机制判定 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-amber-400 font-bold flex items-center gap-1">
                  <span>✨ 机制判定:</span>
                  <span>{{ navResult.mechanismTitle }}</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ navResult.mechanismDesc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>引擎算法: vehicle_navigation_system.gd</span>
            <span class="text-amber-400">VBLE Navigation & Breeding Matrix v2.2.246</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 三大世界空间维度通行图谱 (3-Tier Dimension Matrix) -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-xl">🌌</span>
        <h3 class="text-lg font-bold text-white">三大空间维度探索图谱 (3-Tier Space Matrix)</h3>
      </div>
      <p class="text-xs text-gray-400">
        《光之战士：时空裂隙》世界划分为地表、深渊海沟与星空月之环三个垂直空间层，不同载具拥有独占的穿梭特权。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div
          v-for="dm in dimensionMatrix"
          :key="dm.title"
          class="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 hover:border-amber-500/40 transition-all"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-amber-300 text-sm flex items-center gap-2">
              <span>{{ dm.icon }}</span>
              <span>{{ dm.title }}</span>
            </span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {{ dm.layer }}
            </span>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">{{ dm.desc }}</p>
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] text-gray-400">
            <span class="text-gray-300 font-semibold">通行载具:</span> {{ dm.vehicles }}
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 3: 陆行鸟全色谱基因杂交与血统育成工坊 (Chocobo Genetics & Breeding Lab) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1a1506] via-[#14120a] to-[#0c0e18] border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.2)] space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-amber-950 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              CHOCOBO BREEDING MATRIX
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🐣</span> 陆行鸟全色谱基因杂交与血统育成工坊
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            探寻大陆隐秘马厩的基因交配法则：融合黄/蓝/黑/红/白五大陆行鸟优良血脉，搭配基萨尔野菜与芝奥坚果，培育飞越最高雪山与深海浅滩的【究极黄金陆行鸟】。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetBreedingLab">
            🔄 重置亲本配置
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportChocoboPedigree">
            📜 导出陆行鸟谱系凭证
          </n-button>
        </div>
      </div>

      <!-- 牧场马厩当前繁育种群与储备 -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          v-for="cb in chocoboBreeds"
          :key="cb.id"
          class="p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
          :class="selectedSireId === cb.id || selectedDamId === cb.id
            ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'"
        >
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-xl">{{ cb.icon }}</span>
              <n-tag size="tiny" :type="cb.tagType">{{ cb.terrainAbility }}</n-tag>
            </div>
            <div class="font-bold text-xs text-white truncate">{{ cb.name }}</div>
            <div class="text-[10px] text-gray-400">{{ cb.maxSpeed }} km/h 巡航</div>
          </div>
          <div class="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
            <span class="text-gray-500">牧场保有:</span>
            <span class="font-mono font-bold text-amber-300">×{{ chocoboStash[cb.id] || 0 }}</span>
          </div>
        </div>
      </div>

      <!-- 核心交配与坚果培育调配槽位 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <!-- 栏 1: 亲本公鸟与母鸟选取 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>🧬</span>
              <span>双亲血统配对 (Sire & Dam Selection)</span>
            </span>
            <n-tag size="tiny" type="warning">染色体拟合</n-tag>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选择公鸟亲本 (Sire ♂):</label>
              <select
                v-model="selectedSireId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
              >
                <option v-for="cb in chocoboBreeds" :key="'sire-' + cb.id" :value="cb.id">
                  {{ cb.icon }} {{ cb.name }} ({{ cb.terrainAbility }})
                </option>
              </select>
            </div>

            <div>
              <label class="text-gray-400 block mb-1">选择母鸟亲本 (Dam ♀):</label>
              <select
                v-model="selectedDamId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
              >
                <option v-for="cb in chocoboBreeds" :key="'dam-' + cb.id" :value="cb.id">
                  {{ cb.icon }} {{ cb.name }} ({{ cb.terrainAbility }})
                </option>
              </select>
            </div>

            <div>
              <label class="text-gray-400 block mb-1">培育投喂营养坚果 (Breeding Nut):</label>
              <select
                v-model="selectedNutId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
              >
                <option v-for="nut in breedingNuts" :key="nut.id" :value="nut.id">
                  {{ nut.icon }} {{ nut.name }} (变异率: {{ nut.mutationBoost }}%)
                </option>
              </select>
            </div>

            <!-- 当前坚果特效提示 -->
            <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] space-y-1">
              <div class="text-amber-400 font-bold flex items-center justify-between">
                <span>{{ currentNut.name }}</span>
                <span>增益倍率: {{ currentNut.mutationBoost }}%</span>
              </div>
              <p class="text-gray-400 leading-snug">{{ currentNut.description }}</p>
            </div>
          </div>
        </div>

        <!-- 栏 2: 杂交推演与胚胎孵化操作 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🐣</span>
              <span>后代性状与孵化演算 (Offspring Phenotype)</span>
            </span>
            <n-tag size="tiny" :type="predictedOffspring.tagType">{{ predictedOffspring.rarity }}</n-tag>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div class="text-base font-bold text-amber-300 flex items-center justify-between">
                <span>{{ predictedOffspring.icon }} {{ predictedOffspring.name }}</span>
                <span class="text-xs font-mono text-cyan-400">极速 {{ predictedOffspring.speed }} km/h</span>
              </div>
              <div class="text-gray-400">
                通行特权: <strong class="text-emerald-400">{{ predictedOffspring.terrainPass }}</strong>
              </div>
              <div class="text-gray-400">
                黄金突变率: <span class="font-mono text-amber-400 font-bold">{{ predictedOffspring.goldChance }}%</span>
              </div>
              <div class="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-0.5">
                <div class="text-cyan-300 font-bold">✨ 专属天赋: {{ predictedOffspring.traitName }}</div>
                <div class="text-gray-300">{{ predictedOffspring.traitDesc }}</div>
              </div>
            </div>

            <!-- 孵化操作按钮 -->
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
              @click="hatchChocoboEgg"
            >
              🐣 投喂坚果 · 激活受精卵并孵化子代陆行鸟
            </button>

            <div v-if="hatchNotice" class="text-[11px] text-center font-bold font-mono pt-1" :class="hatchSuccessGold ? 'text-amber-300 animate-pulse' : 'text-emerald-400'">
              {{ hatchNotice }}
            </div>
          </div>
        </div>

        <!-- 栏 3: 牧场繁育成就与综合评级 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🏆</span>
                <span>马厩血统综合指数</span>
              </span>
              <span class="text-[10px] font-mono text-cyan-400 font-bold">累积繁育: {{ totalHatchedCount }} 羽</span>
            </div>

            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div class="text-[11px] text-gray-400">繁育血统基因评分 (Breeding Score)</div>
              <div class="text-3xl font-black font-mono mt-1 text-amber-400">
                {{ predictedOffspring.score }}
              </div>
              <div class="text-[10px] text-emerald-400 mt-0.5">
                {{ predictedOffspring.rankTier }}
              </div>
            </div>

            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">深海与浅滩通过性:</span>
                <span class="font-mono font-bold" :class="predictedOffspring.canSwim ? 'text-cyan-400' : 'text-gray-500'">
                  {{ predictedOffspring.canSwim ? '准予航行' : '遇水阻滞' }}
                </span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">绝壁山脉翻越力:</span>
                <span class="font-mono font-bold" :class="predictedOffspring.canFlyMountain ? 'text-amber-400' : 'text-gray-500'">
                  {{ predictedOffspring.canFlyMountain ? '破空翻越' : '山脉阻隔' }}
                </span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">遇敌屏蔽级别:</span>
                <span class="font-mono font-bold text-emerald-400">100% 绝对隐匿免战</span>
              </div>
            </div>
          </div>

          <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
            马厩太古箴言：唯有以【黑陆行鸟】与【特级红陆行鸟】为双亲，辅以罕见【芝奥坚果】，方能诞下穿越双月星轨与全境雪山的至高【黄金陆行鸟】！
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 4: 飞空艇模块化改装与折跃巡航工坊 (Airship Customization & Warp Studio) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#121626] via-[#101426] to-[#0c1020] border border-amber-500/40 shadow-2xl space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🛠️</span>
            <h3 class="text-lg sm:text-xl font-black text-white text-glow-amber">魔导飞空艇模块化动力改装与折跃巡航工坊 (Airship Warp Studio)</h3>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            自由装配以太涡轮动力核心、深海声呐雷达与宇宙加压生命舱，规划跨大陆与双月星轨航线，实时推演巡航耗时与折跃跃迁。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-tag type="warning" round size="small">四维模块化改装</n-tag>
          <n-tag type="success" round size="small">全域自动巡航</n-tag>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 飞空艇核心模块改装选项 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span class="text-xs font-bold text-amber-300 block flex items-center gap-1.5">
            <span>⚙️</span>
            <span>机体核心改装模块 (Ship Modules)</span>
          </span>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">动力引擎核心 (Propulsion Engine):</label>
              <select
                v-model="selectedEngineId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
              >
                <option v-for="eng in engineModules" :key="eng.id" :value="eng.id">
                  {{ eng.name }} ({{ eng.speedMultiplier }}x 航速)
                </option>
              </select>
            </div>

            <div>
              <label class="text-gray-400 block mb-1">探知与声呐系统 (Sensory & Radar):</label>
              <select
                v-model="selectedRadarId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
              >
                <option v-for="rad in radarModules" :key="rad.id" :value="rad.id">
                  {{ rad.name }} ({{ rad.feature }})
                </option>
              </select>
            </div>

            <div>
              <label class="text-gray-400 block mb-1">装甲与生命维持舱 (Armor & Life Support):</label>
              <select
                v-model="selectedHullId"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-amber-400 focus:outline-none"
              >
                <option v-for="hull in hullModules" :key="hull.id" :value="hull.id">
                  {{ hull.name }} ({{ hull.capability }})
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- 栏 2: 航线规划与航程目的地设定 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span class="text-xs font-bold text-cyan-300 block flex items-center gap-1.5">
            <span>🗺️</span>
            <span>航线航路规划 (Flight Waypoint Routing)</span>
          </span>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">启航港口基地 (Port of Departure):</label>
              <select
                v-model="routeOrigin"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-cyan-400 focus:outline-none"
              >
                <option v-for="port in flightDestinations" :key="'orig-' + port.id" :value="port.id">
                  {{ port.name }} ({{ port.layer }})
                </option>
              </select>
            </div>

            <div>
              <label class="text-gray-400 block mb-1">目标航程彼岸 (Target Destination):</label>
              <select
                v-model="routeDestination"
                class="w-full bg-slate-950 border border-slate-700 text-xs text-gray-200 rounded-lg p-2 focus:border-cyan-400 focus:outline-none"
              >
                <option v-for="port in flightDestinations" :key="'dest-' + port.id" :value="port.id">
                  {{ port.name }} ({{ port.layer }})
                </option>
              </select>
            </div>

            <!-- 自动巡航操作 -->
            <div class="pt-2">
              <button
                type="button"
                class="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-cyan-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
                :disabled="isCruising"
                @click="startCruiseFlight"
              >
                {{ isCruising ? '🛸 自动巡航航行中...' : '🚀 启动全域自动巡航折跃' }}
              </button>
            </div>

            <div v-if="isCruising" class="space-y-1">
              <div class="flex justify-between text-[11px] text-cyan-300">
                <span>巡航推进进度:</span>
                <span>{{ cruiseProgress.toFixed(0) }}%</span>
              </div>
              <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div class="bg-gradient-to-r from-amber-400 to-cyan-400 h-2 transition-all duration-100" :style="{ width: `${cruiseProgress}%` }" />
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 3: 航行综合指标与实时航行日志 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>航行情报与实机测算</span>
              </span>
              <n-tag size="tiny" type="success">{{ currentEngine.name }}</n-tag>
            </div>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">最终巡航极速:</span>
                <span class="font-mono font-bold text-amber-300">{{ calculatedSpeedText }}</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">航程物理距离:</span>
                <span class="font-mono font-bold text-cyan-300">{{ calculatedDistance }} km</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">预计飞抵耗时:</span>
                <span class="font-mono font-bold text-emerald-300">{{ calculatedDurationText }}</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">遇敌屏蔽状态:</span>
                <span class="font-mono font-bold text-emerald-400">100% 绝对隐匿免遇敌</span>
              </div>
            </div>

            <!-- 航行日志 -->
            <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono space-y-1 text-gray-300 max-h-24 overflow-y-auto">
              <div v-for="(log, idx) in cruiseLogs" :key="idx" class="text-gray-300">
                {{ log }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 专区 5: 全地形海陆空多维跃迁与超光速折跃星舰巡航推演工坊 (v2.2.257) -->
    <div id="starship-warp-studio" class="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-purple-950/70 border border-indigo-500/30 shadow-[0_0_35px_rgba(99,102,241,0.15)] space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🌌</span>
            <h3 class="text-lg sm:text-xl font-black text-white text-glow-amber">全地形星际超光速折跃星舰巡航推演工坊 (Starship Warp Studio)</h3>
          </div>
          <p class="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
            基于太古魔导曲率力学与虚空暗物质湮灭矩阵，模拟星舰在行星卡门线、深海暗物质裂谷、红月近地轨道与虚空奇点间的超维超光速滑移折跃。可实时调谐曲率能级、偏振防蚀力场、反物质配比并配置领航专家。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-tag type="info" round size="small">超光速曲率泡</n-tag>
          <n-tag type="warning" round size="small">四维透镜校准</n-tag>
          <n-tag type="success" round size="small">v2.2.257 规范</n-tag>
        </div>
      </div>

      <!-- 四大超空间折跃目的地选择 -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
            <span>🪐</span>
            <span>选择跃迁目的地坐标 (Warp Destination Matrix)</span>
          </span>
          <span class="text-xs text-gray-400 font-mono">已选: {{ currentWarpDest.name }}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="dest in warpDestinations"
            :key="dest.id"
            class="p-4 rounded-xl border transition-all cursor-pointer bg-slate-900/80 hover:scale-[1.01]"
            :class="selectedWarpDestId === dest.id ? 'border-indigo-400 bg-indigo-950/40 shadow-[0_0_15px_rgba(99,102,241,0.3)] ring-1 ring-indigo-400/50' : 'border-slate-800 hover:border-slate-700'"
            @click="selectedWarpDestId = dest.id"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-bold text-sm text-gray-100">{{ dest.name }}</span>
              <n-tag size="tiny" :type="dest.dangerTier === 'Tier V' ? 'error' : (dest.dangerTier === 'Tier IV' ? 'warning' : 'info')">{{ dest.dangerTier }}</n-tag>
            </div>
            <div class="text-[11px] text-cyan-300 font-mono mb-1">
              <span>距离: {{ dest.distanceLabel }}</span> · <span>{{ dest.gravity }}</span>
            </div>
            <div class="text-[10px] text-gray-400 leading-snug line-clamp-2">
              {{ dest.description }}
            </div>
            <div class="mt-2 text-[10px] font-mono text-indigo-300 flex items-center gap-1">
              <span>🛡️ 推荐偏振角:</span>
              <span class="font-bold">{{ dest.recommendedPolarization }}°</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 参数调节与领航专家配置 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 栏 1: 动力与曲率参数调节 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span class="text-xs font-bold text-indigo-300 block flex items-center gap-1.5">
            <span>⚙️</span>
            <span>折跃动力与力场校准 (Warp Propulsion & Field)</span>
          </span>

          <div class="space-y-4 text-xs">
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-400">折跃曲率能级 (Warp Factor):</span>
                <span class="font-mono font-bold text-amber-300">Warp {{ warpFactor.toFixed(1) }}</span>
              </div>
              <input
                v-model.number="warpFactor"
                type="range"
                min="1.0"
                max="9.9"
                step="0.1"
                class="w-full accent-amber-400 cursor-pointer"
              />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5 font-mono">
                <span>Warp 1.0 (次光速临界)</span>
                <span>Warp 9.9 (超弦极限)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-400">防护罩谐振偏振角 (Shield Angle):</span>
                <span class="font-mono font-bold text-cyan-300">{{ shieldPolarization }}°</span>
              </div>
              <input
                v-model.number="shieldPolarization"
                type="range"
                min="0"
                max="360"
                step="5"
                class="w-full accent-cyan-400 cursor-pointer"
              />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5 font-mono">
                <span>0° (正向中和)</span>
                <span>目标推荐: {{ currentWarpDest.recommendedPolarization }}°</span>
                <span>360° (全相位闭环)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-400">反物质湮灭燃料配比 (Antimatter Ratio):</span>
                <span class="font-mono font-bold text-rose-300">{{ antimatterRatio }}%</span>
              </div>
              <input
                v-model.number="antimatterRatio"
                type="range"
                min="10"
                max="100"
                step="5"
                class="w-full accent-rose-400 cursor-pointer"
              />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5 font-mono">
                <span>10% (低能待机)</span>
                <span>75% (标准跃迁)</span>
                <span>100% (满载过载)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 2: 领航专家配置 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span class="text-xs font-bold text-cyan-300 block flex items-center gap-1.5">
            <span>🧑‍✈️</span>
            <span>星舰领航专家选派 (Navigator Specialist)</span>
          </span>

          <div class="space-y-2.5">
            <div
              v-for="nav in warpNavigators"
              :key="nav.id"
              class="p-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5"
              :class="selectedNavigatorId === nav.id ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40' : 'border-slate-800 bg-slate-950 hover:border-slate-700'"
              @click="selectedNavigatorId = nav.id"
            >
              <span class="text-2xl shrink-0 mt-0.5">{{ nav.avatar }}</span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs text-gray-100">{{ nav.name }}</span>
                  <span class="text-[10px] text-cyan-300 font-mono">{{ nav.title }}</span>
                </div>
                <p class="text-[10px] text-gray-400 mt-0.5 leading-snug">{{ nav.desc }}</p>
                <div class="flex items-center gap-2 mt-1.5 text-[9px] font-mono text-gray-400">
                  <span class="text-emerald-400">稳定+{{ nav.stabilityBonus }}%</span>
                  <span class="text-amber-400">畸变-{{ nav.distortionReduction }}%</span>
                  <span class="text-indigo-400">风暴规避+{{ nav.stormAvoidance }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 栏 3: 实时折跃解算与启动控制台 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-slate-950 to-indigo-950/40 border border-indigo-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>📊</span>
                <span>曲率折跃实时遥测</span>
              </span>
              <n-tag size="tiny" type="info">{{ currentWarpDest.dimension }}</n-tag>
            </div>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">跃迁主观耗时:</span>
                <span class="font-mono font-bold text-amber-300">{{ calculatedWarpDuration.toFixed(2) }} 秒 (主观时)</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">折跃时空稳定性:</span>
                <span class="font-mono font-bold" :class="calculatedWarpStability >= 80 ? 'text-emerald-400' : (calculatedWarpStability >= 60 ? 'text-amber-400' : 'text-rose-400')">
                  {{ calculatedWarpStability.toFixed(1) }}%
                </span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">引力透镜畸变度:</span>
                <span class="font-mono font-bold text-cyan-300">{{ calculatedGravDistortion.toFixed(1) }}%</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">次元风暴遭遇率:</span>
                <span class="font-mono font-bold text-purple-300">{{ calculatedVoidStormChance.toFixed(1) }}%</span>
              </div>
              <div class="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span class="text-gray-400">反物质损耗预估:</span>
                <span class="font-mono font-bold text-rose-300">{{ calculatedAntimatterQuarks }} 夸克</span>
              </div>
            </div>

            <!-- 折跃进度条 -->
            <div v-if="isWarping" class="space-y-1 pt-1">
              <div class="flex justify-between text-[11px] text-cyan-300 font-mono">
                <span>{{ warpCurrentPhase }}</span>
                <span>{{ warpProgress }}%</span>
              </div>
              <div class="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div class="bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-400 h-2.5 transition-all duration-150" :style="{ width: `${warpProgress}%` }" />
              </div>
            </div>

            <!-- 折跃日志控制台 -->
            <div class="p-2.5 rounded bg-slate-950/90 border border-slate-800 text-[11px] font-mono space-y-1 text-gray-300 max-h-24 overflow-y-auto">
              <div v-for="(log, idx) in warpLogs" :key="idx" class="text-gray-300 leading-snug">
                {{ log }}
              </div>
            </div>
          </div>

          <!-- 操作按钮组 -->
          <div class="space-y-2 pt-2">
            <button
              type="button"
              class="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
              :disabled="isWarping"
              @click="startWarpSequence"
            >
              {{ isWarping ? '💫 超光速曲率折跃跃迁中...' : '💫 启动超光速折跃序列 (Engage Hyperdrive)' }}
            </button>

            <div class="flex gap-2">
              <button
                type="button"
                class="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-gray-300 border border-slate-700 transition-colors cursor-pointer"
                @click="copyWarpConfig"
              >
                📋 复制航线参数
              </button>
              <button
                type="button"
                class="flex-1 py-1.5 rounded-lg bg-indigo-900/40 hover:bg-indigo-800/60 text-xs text-indigo-300 border border-indigo-700/60 transition-colors cursor-pointer"
                @click="exportWarpCertificate"
              >
                📄 导出折跃凭证
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模块 4: 全域多维载具以太超频过载推进与虚空反冲推演工坊 -->
    <div id="hyper-overdrive-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c1208] via-[#1a1728] to-[#0a1128] border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.2)] space-y-6">
      <!-- 头部导言 -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              AETHER OVERDRIVE &amp; VOID RECOIL PROPULSION ENGINE v2.2.274
            </span>
            <span class="text-xs text-cyan-300 font-mono">⚡ 以太超频推进 · 虚空反冲消解</span>
          </div>
          <h2 class="text-2xl font-black text-white flex items-center gap-2 tracking-tight">
            <span>⚡</span> 全域多维载具以太超频过载推进与虚空反冲推演工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
            突破魔导飞空艇、月之巨鲸与深海潜艇的常规速度壁垒。调节推进器以太充盈率、磁流体导流喷嘴磁场约束与惯性阻尼过载阈值，推演超音速音爆巡航、虚空反冲加速度与核心热堆稳态。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <n-button type="info" size="small" round secondary @click="autoBalanceMagneticNozzle">
            <template #icon><span>⚖️</span></template>
            磁约束自动配平
          </n-button>
          <n-button type="warning" size="small" round secondary @click="triggerAuroraBurst">
            <template #icon><span>💥</span></template>
            极光湮灭冲刺
          </n-button>
          <n-button type="success" size="small" round secondary @click="exportVehicleOverdriveCertificate">
            <template #icon><span>📜</span></template>
            导出方案书 (SHA-256)
          </n-button>
        </div>
      </div>

      <!-- 超频姿态预设选择台 -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
            <span>🚀</span> 推进器超频运行工况 (Propulsion Overdrive Mode)
          </span>
          <span class="text-xs font-mono text-gray-400">当前工况：{{ currentOverdriveMode.name }} ({{ currentOverdriveMode.subtitle }})</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="mode in overdriveModesList"
            :key="mode.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedOverdriveModeId === mode.id
              ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'"
            @click="selectOverdriveMode(mode.id)"
          >
            <div class="flex items-start gap-3">
              <span class="text-3xl p-2 rounded-xl bg-slate-800/80 shrink-0 border border-slate-700">{{ mode.icon }}</span>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-white truncate">{{ mode.name }}</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">{{ mode.badge }}</span>
                </div>
                <div class="text-[11px] text-yellow-300 mt-0.5 font-medium">{{ mode.subtitle }}</div>
                <p class="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">{{ mode.desc }}</p>
                <div class="mt-2 flex items-center justify-between text-[10px] font-mono text-gray-400 border-t border-slate-800/80 pt-1.5">
                  <span>推力增益: <strong class="text-amber-300">{{ mode.thrustMultiplier }}x</strong></span>
                  <span>反冲负荷: <strong class="text-rose-400">{{ mode.recoilG }} G</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 动力学核心推演参数调节 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-950/70 border border-slate-800">
        <!-- 推进器以太充盈率 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-300 font-semibold flex items-center gap-1.5">
              <span>⚡</span> 推进器以太充盈率
            </span>
            <span class="font-mono text-amber-300 font-bold">{{ propulsionAetherCharge }}%</span>
          </div>
          <input
            v-model.number="propulsionAetherCharge"
            type="range"
            min="20"
            max="200"
            step="5"
            class="w-full accent-amber-400 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-gray-500">
            <span>20% 低功耗</span>
            <span>200% 极限制超频</span>
          </div>
        </div>

        <!-- 导流喷嘴磁约束磁场 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-300 font-semibold flex items-center gap-1.5">
              <span>🧲</span> 导流喷嘴磁约束
            </span>
            <span class="font-mono text-cyan-300 font-bold">{{ magneticNozzleContainment }}%</span>
          </div>
          <input
            v-model.number="magneticNozzleContainment"
            type="range"
            min="40"
            max="100"
            step="2"
            class="w-full accent-cyan-400 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-gray-500">
            <span>40% 喷散损失</span>
            <span>100% 完美准直</span>
          </div>
        </div>

        <!-- 载具空气动力与反重力补偿 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-300 font-semibold flex items-center gap-1.5">
              <span>🪶</span> 反重力悬浮补偿
            </span>
            <span class="font-mono text-emerald-300 font-bold">{{ antiGravityCompensation }}%</span>
          </div>
          <input
            v-model.number="antiGravityCompensation"
            type="range"
            min="10"
            max="100"
            step="2"
            class="w-full accent-emerald-400 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-gray-500">
            <span>10% 笨重着地</span>
            <span>100% 零阻力漂浮</span>
          </div>
        </div>

        <!-- 应急惯性阻尼过载阈值 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-300 font-semibold flex items-center gap-1.5">
              <span>🛡️</span> 惯性阻尼过载阈值
            </span>
            <span class="font-mono text-rose-300 font-bold">{{ inertialDampingThreshold.toFixed(1) }} G</span>
          </div>
          <input
            v-model.number="inertialDampingThreshold"
            type="range"
            min="1.0"
            max="15.0"
            step="0.5"
            class="w-full accent-rose-400 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-gray-500">
            <span>1.0 G 乘员舒适</span>
            <span>15.0 G 极境耐压</span>
          </div>
        </div>
      </div>

      <!-- 液氮深冷开关与推演执行 -->
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex-1 space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="text-gray-300 font-medium">动力热堆稳态与反冲阻尼系数：</span>
            <span class="font-mono font-bold" :class="engineCoreStabilityPercent >= 75 ? 'text-emerald-400' : 'text-amber-400'">
              {{ engineCoreStabilityPercent }}% ({{ engineStabilityText }})
            </span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden flex">
            <div class="bg-amber-400 transition-all duration-300" :style="{ width: Math.min(100, engineCoreStabilityPercent) + '%' }"></div>
            <div class="bg-rose-500 transition-all duration-300" :style="{ width: Math.max(0, 100 - engineCoreStabilityPercent) + '%' }"></div>
          </div>
          <div class="flex justify-between text-[10px] text-gray-400">
            <span>热堆安全余量 {{ Math.min(100, engineCoreStabilityPercent).toFixed(0) }}%</span>
            <span>热失控风险 {{ Math.max(0, 100 - engineCoreStabilityPercent).toFixed(0) }}%</span>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-300 select-none">
            <input v-model="enableCryoCoolantInjection" type="checkbox" class="accent-amber-400 rounded cursor-pointer" />
            <span>开启以太深冷液氮注入 (Cryo Injection, 热稳态 +25%)</span>
          </label>
          <button
            type="button"
            class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black rounded-lg text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer transform active:scale-95"
            @click="triggerAetherOverdriveSimulation"
          >
            🚀 执行超频试车推演 (Engage Overdrive)
          </button>
        </div>
      </div>

      <!-- 实时推演指标看板 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40">
          <div class="text-[11px] text-amber-400 font-mono mb-1">🏁 航行极限巡航航速</div>
          <div class="text-2xl font-black text-white font-mono">
            {{ maxCruiseSpeedKnots }} <span class="text-xs text-gray-400">节</span>
          </div>
          <div class="text-[11px] text-gray-400 mt-1">
            <span>音速折算: </span>
            <span class="text-amber-300 font-mono">Mach {{ (maxCruiseSpeedKnots / 660).toFixed(2) }}</span>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-rose-500/40">
          <div class="text-[11px] text-rose-400 font-mono mb-1">💥 虚空反冲过载加速度</div>
          <div class="text-2xl font-black text-rose-400 font-mono">
            {{ voidRecoilAccelerationG.toFixed(1) }} <span class="text-xs text-gray-400">G</span>
          </div>
          <div class="text-[11px] text-gray-400 mt-1">
            <span>阻尼耐压裕度: </span>
            <span :class="inertialDampingThreshold >= voidRecoilAccelerationG ? 'text-emerald-400' : 'text-rose-400'" class="font-mono">
              {{ (inertialDampingThreshold - voidRecoilAccelerationG).toFixed(1) }} G
            </span>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40">
          <div class="text-[11px] text-cyan-400 font-mono mb-1">🌪️ 虚空乱流穿透率</div>
          <div class="text-2xl font-black text-cyan-300 font-mono">
            {{ turbulencePenetrationRate }}%
          </div>
          <div class="text-[11px] text-gray-400 mt-1">
            <span>反重力流线顺滑度: </span>
            <span class="text-emerald-400 font-mono">{{ antiGravityCompensation }}%</span>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border" :class="engineCoreStabilityPercent >= 75 ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-amber-500/50 bg-amber-950/20'">
          <div class="text-[11px] font-mono mb-1" :class="engineCoreStabilityPercent >= 75 ? 'text-emerald-400' : 'text-amber-400'">🛡️ 适航安全评级</div>
          <div class="text-2xl font-black font-mono" :class="engineCoreStabilityPercent >= 75 ? 'text-emerald-400' : 'text-amber-400'">
            {{ overdriveAirworthinessVerdict.badge }}
          </div>
          <div class="text-[11px] text-gray-400 mt-1 flex items-center justify-between">
            <span>{{ overdriveAirworthinessVerdict.status }}</span>
            <span class="text-cyan-300">热堆稳态</span>
          </div>
        </div>
      </div>

      <!-- 派生特性清单与推演战报控制台 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- 特性清单 -->
        <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div class="text-xs font-bold text-amber-300 flex items-center gap-2">
            <span>✨</span> 超频推进专属巡航特权与探索词缀
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div
              v-for="(affix, idx) in currentOverdriveMode.affixes"
              :key="idx"
              class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-gray-300 flex items-center gap-2"
            >
              <span class="text-amber-400 font-bold shrink-0">•</span>
              <span class="leading-tight">{{ affix }}</span>
            </div>
          </div>
        </div>

        <!-- 推演日志控制台 -->
        <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-yellow-300 flex items-center gap-1.5">
              <span>📜</span> 推进系统试车动态战报
            </span>
            <span class="text-gray-500 text-[11px]">最新 {{ overdriveSimulationLogs.length }} 条记录</span>
          </div>
          <div class="flex-1 bg-slate-900/90 p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] space-y-1.5 max-h-48 overflow-y-auto">
            <div
              v-for="(log, idx) in overdriveSimulationLogs"
              :key="idx"
              class="leading-relaxed"
              :class="log.includes('💥') || log.includes('冲刺') ? 'text-amber-300' : log.includes('⚠️') ? 'text-rose-400' : 'text-gray-300'"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全域星海轨道跃迁、亚光速重力弹弓与虚空黑洞引力逃逸工坊 (v2.2.289) -->
    <div id="orbital-warp-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#120a22] via-[#0f172a] to-[#07131e] border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.22)] space-y-6">
      <!-- 头部横幅 -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-purple-900/50 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/40">
              ORBITAL SLINGSHOT &amp; GRAVITY ESCAPE
            </span>
            <span class="text-xs text-purple-400 font-mono">v2.2.289 Official Matrix</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
            <span>🌌</span> 全域星海轨道跃迁、亚光速重力弹弓与虚空引力逃逸工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
            面向 Godot 4.6 LTS 太空星海航行体系：实时推演行星近拱点重力弹弓轨道、黑洞视界潮汐力结构应力消解、快子超光速相位跃迁与逃逸动能精算。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-700/60 text-xs font-mono text-purple-300">
            双曲轨道重力弹弓
          </span>
          <span class="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-700/60 text-xs font-mono text-cyan-300">
            事件视界引力潮汐阻尼
          </span>
        </div>
      </div>

      <!-- 四大轨道机动姿态选择 -->
      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">🪐</span>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">四大星海轨道机动姿态 (Orbital Maneuvers)</h3>
          </div>
          <span class="text-xs text-gray-400">选择天体引力捕获与轨道突防策略</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="m in orbitalManeuversList"
            :key="m.id"
            class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
            :class="selectedManeuverId === m.id ? `${m.color} ring-2 ring-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]` : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'"
            @click="selectedManeuverId = m.id"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">{{ m.icon }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-gray-300">
                {{ m.efficiencyTag }}
              </span>
            </div>
            <div class="font-bold text-sm text-white mb-1">{{ m.name }}</div>
            <p class="text-xs text-gray-400 leading-snug">{{ m.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 参数微调与遥测仪表盘 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧参数调节面板 -->
        <div class="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-lg">🎛️</span>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider">天体引力与相对论轨道拓扑参数</h3>
            </div>
            <n-tag type="info" size="tiny" round>实机连续微调</n-tag>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>近拱点轨道高度 (Periapsis Altitude)</span>
                <span class="font-mono font-bold text-purple-400">{{ orbitalAltitudeKm.toLocaleString() }} km</span>
              </div>
              <n-slider v-model:value="orbitalAltitudeKm" :min="200" :max="50000" :step="200" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>200 km (低轨掠日)</span>
                <span>3,800 km (标准弹弓)</span>
                <span>50,000 km (远拱星外)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>天体引力井常数 (Gravity Well Intensity)</span>
                <span class="font-mono font-bold text-amber-400">{{ gravityWellIntensity.toFixed(1) }} G</span>
              </div>
              <n-slider v-model:value="gravityWellIntensity" :min="0.5" :max="10.0" :step="0.1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>0.5 G (微小行星)</span>
                <span>2.8 G (红月气态巨星)</span>
                <span>10.0 G (黑洞事件视界)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>重力弹弓加速乘数 (Slingshot Boost Factor)</span>
                <span class="font-mono font-bold text-cyan-400">{{ slingshotBoostFactor.toFixed(1) }}x</span>
              </div>
              <n-slider v-model:value="slingshotBoostFactor" :min="1.0" :max="5.0" :step="0.1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>1.0x (无辅助滑行)</span>
                <span>2.4x (双曲进动加速)</span>
                <span>5.0x (相对论近光速喷射)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-1">
                <span>相对论进动角偏移 (Relativistic Precession)</span>
                <span class="font-mono font-bold text-emerald-400">{{ relativisticDilationAngle }}°</span>
              </div>
              <n-slider v-model:value="relativisticDilationAngle" :min="0" :max="90" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500 mt-0.5">
                <span>0° (牛顿平直轨道)</span>
                <span>28° (时空曲率偏折)</span>
                <span>90° (引力透镜闭合极境)</span>
              </div>
            </div>
          </div>

          <!-- 3 个安全机制开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-3">
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🛡️</span> 潮汐力结构撕裂阻尼器 (Tidal Force Damper)
                </div>
                <div class="text-[10px] text-gray-400">抵御强引力井中对月之巨鲸与飞空艇龙骨的潮汐撕裂应力 (-35% 结构应变)</div>
              </div>
              <n-switch v-model:value="tidalForceDamperActive" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🌀</span> 视界逃逸奇点护盾 (Event Horizon Escape Aegis)
                </div>
                <div class="text-[10px] text-gray-400">吸收黑洞强引力红移能量，杜绝坠入引力奇点，轨迹安全性显著提高</div>
              </div>
              <n-switch v-model:value="eventHorizonEscapeAegis" />
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚡</span> 暗物质微扰推进注入 (Dark Matter Boost)
                </div>
                <div class="text-[10px] text-gray-400">在近拱点点火注入高维暗物质，出射轨道逃逸速度额外暴增 +40%</div>
              </div>
              <n-switch v-model:value="darkMatterThrusterBoost" />
            </div>
          </div>
        </div>

        <!-- 右侧实时遥测看板 -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-purple-950/40 border border-purple-500/30 space-y-4">
            <div class="flex items-center justify-between border-b border-purple-500/20 pb-2">
              <h3 class="text-xs font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                <span>📊</span> 星海轨道精算遥测 (Astro Telemetry)
              </h3>
              <span class="text-[10px] font-mono text-emerald-400 animate-pulse">● 轨道计算机在线</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                <div class="text-[10px] text-gray-400">出射轨道瞬时末速度</div>
                <div class="text-lg sm:text-xl font-black text-purple-400 font-mono mt-1">
                  {{ calculatedOrbitalVelocity }}
                </div>
                <div class="text-[9px] text-purple-500/80 mt-0.5">双曲逃逸轨道速度</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20">
                <div class="text-[10px] text-gray-400">引力弹弓输出动能</div>
                <div class="text-lg sm:text-xl font-black text-amber-400 font-mono mt-1">
                  {{ calculatedEscapeEnergyGJ }}
                </div>
                <div class="text-[9px] text-amber-500/80 mt-0.5">天体引力势能转化</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20">
                <div class="text-[10px] text-gray-400">舰体龙骨潮汐应变率</div>
                <div class="text-lg sm:text-xl font-black text-cyan-400 font-mono mt-1">
                  {{ calculatedStructuralStress }}
                </div>
                <div class="text-[9px] text-cyan-500/80 mt-0.5">引力梯度剪切应力</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20">
                <div class="text-[10px] text-gray-400">逃逸弹道综合安全度</div>
                <div class="text-lg sm:text-xl font-black text-emerald-400 font-mono mt-1">
                  {{ calculatedTrajectorySafety }}
                </div>
                <div class="text-[9px] text-emerald-500/80 mt-0.5">避免坠入视界裕度</div>
              </div>
            </div>

            <!-- 当前轨道特质摘要 -->
            <div class="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-1">
              <div class="flex items-center justify-between text-gray-400">
                <span>机动姿态:</span>
                <span class="font-bold text-white">{{ currentOrbitalManeuverObj?.name }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>动力效能:</span>
                <span class="font-mono text-purple-400">{{ currentOrbitalManeuverObj?.efficiencyTag }}</span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>潮汐阻尼器:</span>
                <span class="font-mono" :class="tidalForceDamperActive ? 'text-emerald-400' : 'text-gray-500'">
                  {{ tidalForceDamperActive ? '有效阻尼 (-35% 应变)' : '未启用' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <span>暗物质加速:</span>
                <span class="font-mono" :class="darkMatterThrusterBoost ? 'text-cyan-400' : 'text-gray-500'">
                  {{ darkMatterThrusterBoost ? '已注入 (+40% 极速)' : '常规动力' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 快捷操作按钮 -->
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              @click="runOrbitalWarpSimulation"
              :disabled="isOrbitalSimulating"
            >
              <span>{{ isOrbitalSimulating ? '⏳' : '🚀' }}</span>
              {{ isOrbitalSimulating ? '引力弹弓推演中...' : '启动五阶段星海轨道弹弓推演' }}
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
              @click="exportOrbitalWarpCertificate"
            >
              <span>📄</span> 导出凭证
            </button>
          </div>
        </div>
      </div>

      <!-- 五阶段星轨推演终端 -->
      <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">💻</span>
            <h3 class="text-sm font-bold text-white font-mono uppercase">星轨导航控制台 (Orbital Slingshot Terminal)</h3>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="isOrbitalSimulating" class="text-xs text-purple-400 animate-pulse font-mono">
              STAGE {{ orbitalSimStage }}/5 轨道解算中
            </span>
            <span v-else-if="orbitalSimFinished" class="text-xs text-emerald-400 font-mono">
              ✓ 双曲逃逸轨道锁定
            </span>
            <button
              type="button"
              class="text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 cursor-pointer"
              @click="orbitalTerminalLogs = []"
            >
              清屏
            </button>
          </div>
        </div>

        <div class="h-44 p-3 rounded-xl bg-black/90 border border-slate-900 font-mono text-xs overflow-y-auto space-y-1 text-gray-300">
          <div v-if="orbitalTerminalLogs.length === 0" class="text-gray-600 italic">
            [终端待命中] 点击“启动五阶段星海轨道弹弓推演”以解算天体引力井、双曲逃逸弹道与潮汐应力...
          </div>
          <div v-for="(log, idx) in orbitalTerminalLogs" :key="idx" class="leading-relaxed">
            <span class="text-gray-500">[{{ log.time }}]</span>
            <span :class="log.color"> {{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 (4 Tab 切换) -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-1.5">
            <span class="text-base">📜</span>
            <span class="font-mono text-sm font-bold text-amber-300">Godot 4.6 LTS 核心实机算法引擎</span>
          </div>
          <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'nav' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'nav'"
            >
              vehicle_navigation_system.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'breeding' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'breeding'"
            >
              chocobo_breeding_system.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'warp' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'warp'"
            >
              starship_warp_navigator.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'overdrive' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'overdrive'"
            >
              vehicle_hyper_overdrive_engine.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer"
              :class="activeCodeTab === 'orbital' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeCodeTab = 'orbital'"
            >
              orbital_gravity_slingshot_engine.gd
            </button>
          </div>
        </div>
        <n-button size="tiny" secondary type="warning" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-96">{{ currentGodotCodeSnippet }}</pre>
    </div>

    <!-- 🛸 工坊 5: 全地形神话载具、动力拓扑引擎与空天巡航工坊 (Mythic Vehicles, Planetary Cruise & Topology Studio v2.2.307) -->
    <div
      id="mythic-cruise-studio"
      class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/80 via-slate-900/90 to-cyan-950/80 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.22)] space-y-6 relative overflow-hidden"
    >
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -left-20 -bottom-20 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 头部与操作区 -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/60 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5 flex-wrap">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-black font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
              MYTHIC CRUISE &amp; TOPOLOGY v2.2.307
            </span>
            <span class="text-xs text-amber-300/80 font-mono">全地形神话载具与动力拓扑矩阵</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-wide">
            <span>🛸</span> 全地形神话载具、动力拓扑引擎与空天巡航工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            基于 Godot 4.6 LTS 实时仿真：解算月之巨鲸亚光速曲率泡展开、诸神黄昏歼星空母反重力巡航、深渊鹦鹉螺号暗物质潜航与 999999 马赫超光速折跃。
          </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap self-start md:self-auto">
          <n-button
            type="info"
            size="small"
            round
            secondary
            @click="resetMythicCruiseParameters"
          >
            重置参数
          </n-button>
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingMythicCruise"
            @click="runMythicCruiseSimulation"
          >
            <template #icon><span>⚡</span></template>
            启动巡航动力推演
          </n-button>
          <n-button
            type="warning"
            size="small"
            round
            secondary
            @click="exportMythicCruiseCertificate"
          >
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大神话载具原型 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        <div
          v-for="archetype in mythicVehicleArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left"
          :class="selectedMythicVehicleArchetypeId === archetype.id
            ? 'bg-amber-950/50 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-amber-600/50'"
          @click="selectedMythicVehicleArchetypeId = archetype.id"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ archetype.icon }}</span>
            <n-tag size="tiny" :type="archetype.tagType" round>{{ archetype.tag }}</n-tag>
          </div>
          <div class="font-bold text-sm text-gray-100">{{ archetype.name }}</div>
          <div class="text-[11px] text-amber-300/80 font-mono mt-0.5">{{ archetype.mode }}</div>
          <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{{ archetype.desc }}</p>
          <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>极速: {{ archetype.topSpeed.toLocaleString() }}km/h</span>
            <span class="text-cyan-400">航程: {{ (archetype.enduranceKm / 10000).toFixed(0) }}万km</span>
          </div>
        </div>
      </div>

      <!-- 核心调控滑块与高能开关 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        <!-- 左侧参数微调面板 -->
        <div class="lg:col-span-7 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <span>⚙️</span> 推进磁约束与曲率泡膨胀参数微调
            </span>
            <span class="text-[11px] font-mono text-amber-400">Continuous Propulsion Dynamics</span>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">推进器磁场约束度 (Magnetic Constraint Ratio):</span>
                <span class="font-mono text-amber-400 font-bold">{{ magneticConstraintRatio }}%</span>
              </div>
              <n-slider v-model:value="magneticConstraintRatio" :min="10" :max="100" :step="5" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>微弱导流 (10%)</span>
                <span>标准磁控 (50%)</span>
                <span>超导绝对约束 (100%)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">亚光速曲率泡膨胀比 (Warp Bubble Expansion):</span>
                <span class="font-mono text-cyan-400 font-bold">{{ warpBubbleExpansion.toFixed(1) }}x</span>
              </div>
              <n-slider v-model:value="warpBubbleExpansion" :min="1.0" :max="8.0" :step="0.2" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>平坦空间 (1.0x)</span>
                <span>曲率折叠 (4.2x)</span>
                <span>超光速跃迁 (8.0x)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">全地形重力阻尼系数 (Gravity Damping Factor):</span>
                <span class="font-mono text-emerald-400 font-bold">{{ gravityDampingFactor.toFixed(1) }} G</span>
              </div>
              <n-slider v-model:value="gravityDampingFactor" :min="0.1" :max="2.0" :step="0.1" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>微重力漂浮 (0.1G)</span>
                <span>标准地球 (1.0G)</span>
                <span>高重力强压 (2.0G)</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300 font-medium">舰载护盾能量回充速率 (Shield Recharge Velocity):</span>
                <span class="font-mono text-purple-400 font-bold">{{ shieldRechargeRate }} kW</span>
              </div>
              <n-slider v-model:value="shieldRechargeRate" :min="100" :max="5000" :step="100" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>应急维护 (100kW)</span>
                <span>标准回充 (2400kW)</span>
                <span>太古超充 (5000kW)</span>
              </div>
            </div>
          </div>

          <!-- 三大高能保障开关 -->
          <div class="pt-3 border-t border-slate-800 space-y-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">虚空引力透镜反重力巡航锁 (Anti-Gravity Lens Lock)</div>
                <div class="text-[11px] text-gray-400">抵消行星引力场与大气层摩擦阻力，实现地表至轨道无缝平稳过渡</div>
              </div>
              <n-switch v-model:value="antiGravityLensCruiseLock" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">暗物质暗流自适应护盾发生器 (Dark Matter Adaptive Shield)</div>
                <div class="text-[11px] text-gray-400">全域吸收外层空间高能辐射与深渊万米水压，撞击吸收率达 100%</div>
              </div>
              <n-switch v-model:value="darkMatterAdaptiveShield" size="small" />
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-gray-200">999999 马赫时空折跃超光速突破器 (Tachyon Velocity Breaker)</div>
                <div class="text-[11px] text-gray-400">解除常规速度物理极限，单次折跃最高瞬达 9,999,999 km/h 超光速极境</div>
              </div>
              <n-switch v-model:value="tachyonVelocityCapBreaker" size="small" />
            </div>
          </div>
        </div>

        <!-- 右侧指标计算与沙盘推演 -->
        <div class="lg:col-span-5 bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>📊</span> 实时解算空天巡航动力能效
              </span>
              <n-tag size="tiny" type="warning" round>Cruise Resolved</n-tag>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-700/40">
                <div class="text-[11px] text-gray-400">实际巡航峰值时速</div>
                <div class="text-lg font-black text-amber-300 font-mono mt-0.5">{{ calculatedCruiseTopSpeed.toLocaleString() }} km/h</div>
                <div class="text-[10px] text-amber-400/80 mt-0.5">曲率泡膨胀放大速</div>
              </div>

              <div class="p-3 rounded-lg bg-cyan-950/30 border border-cyan-700/40">
                <div class="text-[11px] text-gray-400">行星间穿梭耗时</div>
                <div class="text-lg font-black text-cyan-300 font-mono mt-0.5">{{ calculatedInterplanetaryTransitHours }} 小时</div>
                <div class="text-[10px] text-cyan-400/80 mt-0.5">地月/红月极速直达</div>
              </div>

              <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-700/40">
                <div class="text-[11px] text-gray-400">舰体结构抗压硬度</div>
                <div class="text-lg font-black text-emerald-300 font-mono mt-0.5">{{ calculatedHullStructureHardness }}%</div>
                <div class="text-[10px] text-emerald-400/80 mt-0.5">暗物质护盾偏折率</div>
              </div>

              <div class="p-3 rounded-lg bg-purple-950/30 border border-purple-700/40">
                <div class="text-[11px] text-gray-400">载具工程认证位阶</div>
                <div class="text-sm font-black text-purple-300 font-mono mt-1">{{ calculatedVehicleRankTier }}</div>
                <div class="text-[10px] text-purple-400/80 mt-0.5">太古星舰造船厂认证</div>
              </div>
            </div>
          </div>

          <!-- 推演终端 -->
          <div class="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-400">五阶段空天巡航推演进度:</span>
              <span class="font-mono text-amber-400 font-bold">{{ mythicSimStep }}/5 阶段</span>
            </div>
            <n-progress
              type="line"
              :percentage="(mythicSimStep / 5) * 100"
              :status="mythicSimStep === 5 ? 'success' : 'warning'"
              :show-indicator="false"
              processing
            />
            <div class="text-[11px] text-gray-300 font-mono bg-slate-900/90 p-2 rounded border border-slate-800/80 min-h-[48px] flex items-center">
              <span>{{ mythicSimCurrentLog }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 实机驱动源码展台 -->
      <div class="bg-slate-900/80 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3 relative z-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-gray-200">Godot 4.6 LTS 实机引擎源码架构展台</span>
            <n-tag size="tiny" type="warning" round>RefCounted 零开销架构</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeMythicCodeTab === 'propulsion' ? 'bg-amber-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeMythicCodeTab = 'propulsion'"
              >
                mythic_propulsion.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeMythicCodeTab === 'topology' ? 'bg-amber-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeMythicCodeTab = 'topology'"
              >
                planetary_topology.gd
              </button>
              <button
                type="button"
                class="px-2.5 py-1 text-xs rounded transition-all"
                :class="activeMythicCodeTab === 'breaker' ? 'bg-amber-600 text-white font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeMythicCodeTab = 'breaker'"
              >
                tachyon_breaker.gd
              </button>
            </div>
            <n-button size="small" type="primary" secondary round @click="copyMythicCruiseCode">
              复制源码
            </n-button>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-72 custom-scrollbar">
          <pre><code>{{ currentMythicCruiseCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 全域海陆空载具矩阵、时空跃迁驱动与巡航导航工坊 (v2.2.327 重磅实装) -->
    <div id="spatiotemporal-warp-drive-studio" class="spatiotemporal-warp-drive-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-sky-950/20 to-slate-900/95 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              SPATIOTEMPORAL WARP DRIVE & CRUISE MATRIX
            </span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
              v2.2.327 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>🚀</span> 全域海陆空载具矩阵、时空跃迁驱动与巡航导航工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            覆盖魔导飞空艇、月之巨鲸、深渊潜艇与极速陆行鸟，支持 50 马赫曲速折跃、0.95 惯性阻尼重力泡防护与 Godot 4.6 LTS 底层星舰驱动核心。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="info" @click="resetWarpDriveDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="info" :loading="isWarpDriveSimulating" @click="runSpatiotemporalWarpSimulation">
            <template #icon><span>⚡</span></template>
            激发折跃推演
          </n-button>
          <n-button size="small" round secondary type="warning" @click="exportWarpDriveCert">
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大海陆空折跃载具原型 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="archetype in warpDriveArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
          :class="selectedWarpDriveArchetype === archetype.id ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/30' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="selectWarpDriveArchetype(archetype.id)"
        >
          <div class="flex items-start justify-between">
            <div class="text-2xl">{{ archetype.icon }}</div>
            <span class="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold" :class="archetype.tagClass">
              {{ archetype.typeTag }}
            </span>
          </div>
          <h3 class="font-bold text-white text-base mt-2">{{ archetype.name }}</h3>
          <p class="text-xs text-cyan-300/80 mt-1">{{ archetype.desc }}</p>
          <div class="mt-3 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-gray-400">
            <div class="flex justify-between">
              <span>核心推进动力:</span>
              <span class="text-amber-300 font-mono">{{ archetype.engineType }}</span>
            </div>
            <div class="flex justify-between">
              <span>巡航环境域:</span>
              <span class="text-emerald-300 font-mono">{{ archetype.cruiseDomain }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 四维航行与跃迁调控滑块 -->
      <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
        <div class="text-sm font-bold text-white flex items-center justify-between">
          <span class="flex items-center gap-2"><span>🎛️</span> 曲率引擎马赫与惯性阻尼力场调控</span>
          <span class="text-xs text-cyan-400 font-mono">Realtime Propulsion Dynamics</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">曲率引擎折跃巡航速度 (Mach):</span>
              <span class="text-cyan-400 font-mono font-bold">{{ warpSpeedFactorMach.toFixed(1) }} 马赫 (极速破音障)</span>
            </div>
            <n-slider v-model:value="warpSpeedFactorMach" :min="1.0" :max="50.0" :step="0.5" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>1.0 马赫 亚音速</span>
              <span>18.5 马赫 典型星舰</span>
              <span>50.0 马赫 超光速跃迁</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">以太燃料增压充能比 (%):</span>
              <span class="text-amber-400 font-mono font-bold">{{ aetherSuperchargeRatio }}% (高能等离子)</span>
            </div>
            <n-slider v-model:value="aetherSuperchargeRatio" :min="50" :max="100" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>50% 经济续航</span>
              <span>88% 战术满充</span>
              <span>100% 极限过载</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">惯性阻尼力场缓冲系数:</span>
              <span class="text-purple-400 font-mono font-bold">{{ inertialDampingRatio.toFixed(2) }} (重力泡阻尼)</span>
            </div>
            <n-slider v-model:value="inertialDampingRatio" :min="0.50" :max="0.99" :step="0.01" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>0.50 剧烈过载</span>
              <span>0.95 稳固滤震</span>
              <span>0.99 绝对静止感</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">全息自动寻路避障频段 (Hz):</span>
              <span class="text-emerald-400 font-mono font-bold">{{ autoNavObstacleAvoidHz }} Hz (激光雷达)</span>
            </div>
            <n-slider v-model:value="autoNavObstacleAvoidHz" :min="50" :max="500" :step="10" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>50 Hz 低频</span>
              <span>240 Hz 毫秒响应</span>
              <span>500 Hz 微秒避障</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 三大航行极速特权开关 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">虚空穿梭绝对避开遇敌隐形</div>
            <div class="text-[10px] text-gray-400 mt-0.5">航行过程 0 野怪拦截与暗能量匿踪</div>
          </div>
          <n-switch v-model:value="enableZeroEncounterStealthMode" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">跨地形任意锚点安全着陆</div>
            <div class="text-[10px] text-gray-400 mt-0.5">山巅、洋面、深雪与熔岩随心停泊</div>
          </div>
          <n-switch v-model:value="enableOmniTerrainSafeLanding" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">超音速音爆减震舒适光环</div>
            <div class="text-[10px] text-gray-400 mt-0.5">全员免受冲击波噪音与眩晕疲劳</div>
          </div>
          <n-switch v-model:value="enableSupersonicDampenerAura" size="small" />
        </div>
      </div>

      <!-- 关键实时指标卡片 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">跨大陆航行就绪耗时</div>
          <div class="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-1">
            {{ transitReadyTimeSec }} s
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">极速微秒启航</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">载具曲率巡航极速</div>
          <div class="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
            {{ cruiseMaxVelocityKmh.toLocaleString() }} km/h
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">对应 {{ warpSpeedFactorMach.toFixed(1) }} 马赫</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">舰体过载抗震稳态率</div>
          <div class="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
            {{ hullGForceStabilityPct }}%
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">重力泡稳定度</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">星舰航行家认证评级</div>
          <div class="text-sm sm:text-base font-black text-purple-400 font-mono mt-1 truncate">
            {{ warpDriveTierBadge }}
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">全域星舰动力标准</div>
        </div>
      </div>

      <!-- 沙盘推演日志与进度 -->
      <div v-if="isWarpDriveSimulating || warpDriveLogs.length > 0" class="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-300 font-bold flex items-center gap-2">
            <span>🔄</span> 载具折跃驱动与巡航导航沙盘进程: {{ warpDriveSimStep }}
          </span>
          <span class="text-cyan-400 font-mono font-bold">{{ warpDriveSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="warpDriveSimProgress"
          :indicator-placement="'inside'"
          processing
          status="info"
        />
        <div class="max-h-36 overflow-y-auto space-y-1 font-mono text-[11px] text-gray-400 pt-2 border-t border-slate-900">
          <div v-for="(log, idx) in warpDriveLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-cyan-500">›</span>
            <span :class="idx === warpDriveLogs.length - 1 ? 'text-cyan-300 font-bold' : 'text-gray-400'">{{ log }}</span>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">GODOT 4.6 LTS</span>
            <h3 class="text-sm font-bold text-white">时空曲率跃迁驱动与巡航引擎源码展台</h3>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeWarpDriveScriptTab === 'drive_core' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeWarpDriveScriptTab = 'drive_core'"
              >
                曲率驱动核心
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeWarpDriveScriptTab === 'damping' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeWarpDriveScriptTab = 'damping'"
              >
                惯性阻尼力场
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeWarpDriveScriptTab === 'stealth_nav' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeWarpDriveScriptTab = 'stealth_nav'"
              >
                全地形避障导航
              </button>
            </div>
            <n-button size="small" round secondary type="info" @click="copyWarpDriveScript">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[460px]">{{ currentWarpDriveScriptCode }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'

const message = useMessage()
const gameStore = useGameStore()

const activeCategory = ref('all')
const selectedVehicleId = ref('veh-airship')
const copiedCode = ref(false)

// 动力工坊参数
const throttlePercent = ref(100)
const fuelReserve = ref(85)
const hasGhisahlGreens = ref(true)
const hasAntigravityModule = ref(true)

const originSector = ref('tycoon_plains')
const targetTerrain = ref('plains')
const weatherHazard = ref('calm')
const isSubmarineTrench = ref(false)
const isLunarOrbit = ref(false)

const vehiclesList = computed(() => gameStore.db.vehicles || [])

const vehicleCategories = [
  { id: 'all', name: '全部载具', icon: '🚀', desc: '全维度 10 大探索坐骑与飞空母舰' },
  { id: 'land', name: '陆地走禽', icon: '🐥', desc: '黄/白/黑/胖陆行鸟族群' },
  { id: 'sea', name: '海洋潜渊', icon: '⚓', desc: '龙首帆船、火力船、深海潜水艇' },
  { id: 'sky', name: '苍穹星际', icon: '🛸', desc: '魔导飞空艇、双月星际改造舰' }
]

const vehicleSelectOptions = computed(() => {
  return vehiclesList.value.map((v: { id: string; name: string }) => ({
    label: `${v.name}`,
    value: v.id
  }))
})

const sectorOptions = [
  { label: '泰空城外广袤平原 (Tycoon Plains)', value: 'tycoon_plains' },
  { label: '卡尔纳克蒸汽动力港 (Karnak Port)', value: 'karnak_port' },
  { label: '伊斯特里密林与瀑布 (Istory Forest)', value: 'istory_forest' },
  { label: '苍穹绝壁龙栖岭高山 (Sky Dragon Peak)', value: 'sky_dragon_peak' },
  { label: '沉没沃鲁斯塔深渊海沟 (Sunken Walse)', value: 'sunken_walse' },
  { label: '双月星空次元之隙核心 (Lunar Rift)', value: 'lunar_rift' }
]

const terrainOptions = [
  { label: '草地与平原 (Plains - 最开阔着陆区)', value: 'plains' },
  { label: '墨绿色高耸密林冠层 (Forest - 黑陆行鸟专属)', value: 'forest' },
  { label: '险峻高山山脉 (Mountains - 仅高空通行)', value: 'mountains' },
  { label: '沿海与深海海域 (Sea - 水运与潜艇)', value: 'sea' },
  { label: '毒沼熔岩荒漠 (Hazard Waste - 陆行伤害)', value: 'hazard' },
  { label: '双月环形山月表 (Lunar Surface - 宇宙星舰专属)', value: 'lunar' }
]

const hazardOptions = [
  { label: '晴空万里 · 无风阻障碍 (Calm)', value: 'calm' },
  { label: '暴风雨与大洋激流 (Storm Surge)', value: 'storm' },
  { label: '强对流电磁暴云层 (EMP Cloud)', value: 'emp' },
  { label: '虚无次元重力扭曲 (Void Distortion)', value: 'void' }
]

const filteredVehicles = computed(() => {
  if (activeCategory.value === 'all') return vehiclesList.value
  return vehiclesList.value.filter((v: { id: string; type?: string; name?: string }) => {
    const t = ((v.type || '') + (v.name || '')).toLowerCase()
    if (activeCategory.value === 'land') return t.includes('陆行') || t.includes('步') || t.includes('feet') || t.includes('chocobo')
    if (activeCategory.value === 'sea') return t.includes('船') || t.includes('潜水') || t.includes('ship') || t.includes('sub')
    if (activeCategory.value === 'sky') return t.includes('飞空') || t.includes('月之') || t.includes('airship') || t.includes('lunar')
    return true
  })
})

const getVehicleIcon = (id: string): string => {
  const map: Record<string, string> = {
    'veh-feet': '👟',
    'veh-ychocobo': '🐥',
    'veh-wchocobo': '🕊️',
    'veh-bchocobo': '🦅',
    'veh-fchocobo': '🐤',
    'veh-ship': '⛵',
    'veh-fireship': '🚢',
    'veh-submarine': '🤿',
    'veh-airship': '🛸',
    'veh-lunar-airship': '🚀'
  }
  return map[id] || '🚗'
}

const getTypeTag = (type: string): 'default' | 'info' | 'warning' | 'error' | 'success' => {
  if (type.includes('神兽') || type.includes('圣光')) return 'success'
  if (type.includes('飞行') || type.includes('宇宙') || type.includes('星舰')) return 'warning'
  if (type.includes('海') || type.includes('潜') || type.includes('船')) return 'info'
  return 'default'
}

const selectForSimulation = (id: string) => {
  selectedVehicleId.value = id
  scrollToStudio()
  message.success('已载入载具动力参数进入巡航沙盘！')
}

const scrollToStudio = () => {
  const el = document.getElementById('vehicle-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetStudioParams = () => {
  throttlePercent.value = 100
  fuelReserve.value = 85
  hasGhisahlGreens.value = true
  hasAntigravityModule.value = true
  originSector.value = 'tycoon_plains'
  targetTerrain.value = 'plains'
  weatherHazard.value = 'calm'
  isSubmarineTrench.value = false
  isLunarOrbit.value = false
  message.info('巡航沙盘参数已恢复默认状态')
}

const triggerOneClickTakeoff = () => {
  if (!navResult.value.canPass) {
    message.error(`航线受阻：${navResult.value.landingSafetyText}，无法在目标地形着陆！`)
    return
  }
  message.success(`🚀 引擎点火成功！以 ${navResult.value.effectiveSpeedText} 极速巡航推进中！`)
}

// 核心巡航结算算法
const navResult = computed(() => {
  const curVeh = vehiclesList.value.find((v: { id: string }) => v.id === selectedVehicleId.value) || vehiclesList.value[0]
  if (!curVeh) {
    return {
      canPass: false,
      effectiveSpeedText: '0x',
      speedNotes: '未选定有效载具',
      encounterRate: 0,
      encounterRateText: '0%',
      landingSafety: false,
      landingSafetyText: '未知',
      mechanismTitle: '无',
      mechanismDesc: '无'
    }
  }

  const vehId = curVeh.id
  let baseSpeed = 1.0
  if (vehId === 'veh-feet') baseSpeed = 1.0
  else if (vehId === 'veh-ychocobo') baseSpeed = 2.0
  else if (vehId === 'veh-wchocobo') baseSpeed = 0.0 // 驻留不可骑
  else if (vehId === 'veh-bchocobo') baseSpeed = 2.5
  else if (vehId === 'veh-fchocobo') baseSpeed = 0.0
  else if (vehId === 'veh-ship') baseSpeed = 1.8
  else if (vehId === 'veh-fireship') baseSpeed = 2.2
  else if (vehId === 'veh-submarine') baseSpeed = 1.5
  else if (vehId === 'veh-airship') baseSpeed = 3.5
  else if (vehId === 'veh-lunar-airship') baseSpeed = 5.0

  // 油门与天候加权
  let throttleMult = throttlePercent.value / 100
  if (weatherHazard.value === 'storm') throttleMult *= 0.8
  if (weatherHazard.value === 'emp' && (vehId === 'veh-airship' || vehId === 'veh-fireship')) throttleMult *= 0.7
  if (hasAntigravityModule.value && (vehId === 'veh-airship' || vehId === 'veh-lunar-airship')) throttleMult *= 1.25

  let finalSpeed = baseSpeed * throttleMult
  let effectiveSpeedText = vehId === 'veh-lunar-airship' ? '瞬发跃迁 (Instant)' : `${finalSpeed.toFixed(1)}x`
  if (vehId === 'veh-wchocobo' || vehId === 'veh-fchocobo') effectiveSpeedText = '特权驻留 (0x)'

  let speedNotes = '标准巡航输出'
  if (weatherHazard.value === 'storm') speedNotes = '受到暴风雨洋流阻滞，推力略有折损'
  if (hasAntigravityModule.value && vehId.includes('airship')) speedNotes = '反引力共振仪激活，巡航推力加成 +25%'

  // 暗怪遭遇率
  let encounterRate = 0.12 // 基础步距遇敌
  let encounterRateText = '12% 基础步距遇敌'
  if (vehId === 'veh-ychocobo' || vehId === 'veh-airship' || vehId === 'veh-lunar-airship') {
    encounterRate = 0
    encounterRateText = '0% (绝对遇敌屏蔽)'
  } else if (vehId === 'veh-bchocobo') {
    encounterRate = 0
    encounterRateText = '0% (飞行中免遇敌)'
  } else if (vehId === 'veh-ship' || vehId === 'veh-fireship') {
    encounterRate = 0.06
    encounterRateText = '6% (深海水怪遇敌)'
  } else if (vehId === 'veh-submarine') {
    encounterRate = 0.04
    encounterRateText = '4% (海沟特有魔物)'
  }

  // 通行与着陆判定
  let canPass = true
  let landingSafety = true
  let landingSafetyText = '允许平稳着陆'
  let mechanismTitle = '通用巡航推进'
  let mechanismDesc = curVeh.capability

  if (vehId === 'veh-feet') {
    if (targetTerrain.value === 'mountains' || targetTerrain.value === 'sea' || targetTerrain.value === 'lunar') {
      canPass = false
      landingSafety = false
      landingSafetyText = '无法攀爬高山/深海/月表'
    } else if (targetTerrain.value === 'hazard') {
      landingSafetyText = '允许通行但每步扣除 5% HP 毒灼'
    }
  } else if (vehId === 'veh-ychocobo') {
    if (targetTerrain.value !== 'plains' && targetTerrain.value !== 'forest') {
      canPass = false
      landingSafety = false
      landingSafetyText = '受河流、深海与山脉严苛阻隔'
    }
  } else if (vehId === 'veh-bchocobo') {
    if (targetTerrain.value !== 'forest') {
      canPass = false
      landingSafety = false
      landingSafetyText = '【致命限制】黑陆行鸟仅可降落于密林冠层'
    } else {
      landingSafetyText = '密林安全降落，已折起双翼'
    }
  } else if (vehId === 'veh-ship' || vehId === 'veh-fireship') {
    if (targetTerrain.value !== 'sea' && targetTerrain.value !== 'plains') {
      canPass = false
      landingSafety = false
      landingSafetyText = '船体无法驶入山岳或密林地貌'
    }
  } else if (vehId === 'veh-submarine') {
    if (targetTerrain.value !== 'sea') {
      canPass = false
      landingSafety = false
      landingSafetyText = '潜艇仅可在深海海沟下潜'
    } else if (isSubmarineTrench.value) {
      mechanismTitle = '深渊海沟下潜'
      mechanismDesc = '探测到深海海沟裂缝，可下潜至 300 米深海探索沉没沃鲁斯塔与古代石板！'
    }
  } else if (vehId === 'veh-airship') {
    if (targetTerrain.value === 'mountains' || targetTerrain.value === 'sea') {
      landingSafety = false
      landingSafetyText = '可飞越山岳海洋，但必须在平原降落'
      canPass = true // 飞越可行但无法着陆
    } else if (targetTerrain.value === 'lunar') {
      canPass = false
      landingSafety = false
      landingSafetyText = '常规飞空艇未装配宇宙加压舱，无法突破世界大气层'
    }
  } else if (vehId === 'veh-lunar-airship') {
    if (isLunarOrbit.value || targetTerrain.value === 'lunar') {
      mechanismTitle = '突破大气层 · 双月星际跃迁'
      mechanismDesc = '反引力魔导引擎全开，已突破卡门线驶向红月核心与次元之隙！'
    }
  }

  // 胖陆行鸟与白色陆行鸟专属机制
  if (vehId === 'veh-fchocobo') {
    mechanismTitle = '256 格次元仓库'
    mechanismDesc = hasGhisahlGreens.value
      ? '基萨尔野菜已点燃！胖陆行鸟吞吐提供 256 格独立无限存储空间。'
      : '未携带基萨尔野菜，胖陆行鸟无法被唤醒。'
  } else if (vehId === 'veh-wchocobo') {
    mechanismTitle = '圣光洗礼 · 精神回春'
    mechanismDesc = '与白色圣光陆行鸟对话，瞬间免费恢复全队全员 100% MP！'
  }

  return {
    canPass,
    effectiveSpeedText,
    speedNotes,
    encounterRate,
    encounterRateText,
    landingSafety,
    landingSafetyText,
    mechanismTitle,
    mechanismDesc
  }
})

// 三大空间维度图谱
const dimensionMatrix = [
  {
    title: '第一层：地表与大陆海洋 (Overworld)',
    icon: '🌍',
    layer: '海拔 0 ~ 500m',
    desc: '横跨泰空城邦、卡尔纳克港、图尔村与古代大图书馆的自然地貌。包含平原、密林、内海与峡谷。',
    vehicles: '徒步、黄色/黑色陆行鸟、龙首帆船、蒸汽火力船、魔导飞空艇'
  },
  {
    title: '第二层：深渊裂隙与海沟 (Sub-oceanic)',
    icon: '🌊',
    layer: '深海 -300m ~ -1000m',
    desc: '水下沉没的沃鲁斯塔、古代沉船遗迹、利维亚桑巢穴以及封印古代神兵的隐秘石板海沟洞窟。',
    vehicles: '深海远古潜水艇 (Submersible)'
  },
  {
    title: '第三层：双月与次元之隙 (Lunar & The Void)',
    icon: '🌕',
    layer: '卡门线外 ~ 宇宙星际',
    desc: '环绕星球轨道的红之月与青之月，以及撕裂空间维度的次元之隙，最终圣战爆发的终局彼岸。',
    vehicles: '双月星际改造飞空艇 (Lunar Airship)'
  }
]

// ================= 专区 3: 陆行鸟全色谱基因杂交与血统育成工坊 =================
interface ChocoboBreed {
  id: string
  name: string
  icon: string
  maxSpeed: number
  terrainAbility: string
  tagType: 'default' | 'info' | 'warning' | 'error' | 'success'
  color: string
}

interface BreedingNut {
  id: string
  name: string
  icon: string
  mutationBoost: number
  description: string
}

const chocoboBreeds: ChocoboBreed[] = [
  { id: 'yellow', name: '黄陆行鸟 (Yellow)', icon: '🐥', maxSpeed: 45, terrainAbility: '平原疾驰', tagType: 'default', color: '#eab308' },
  { id: 'blue', name: '蓝陆行鸟 (Blue)', icon: '🦆', maxSpeed: 65, terrainAbility: '浅海涉水', tagType: 'info', color: '#06b6d4' },
  { id: 'black', name: '黑陆行鸟 (Black)', icon: '🦅', maxSpeed: 80, terrainAbility: '密林起降', tagType: 'warning', color: '#8b5cf6' },
  { id: 'red', name: '红陆行鸟 (Red)', icon: '🦃', maxSpeed: 95, terrainAbility: '熔岩火海', tagType: 'error', color: '#f43f5e' },
  { id: 'white', name: '白陆行鸟 (White)', icon: '🕊️', maxSpeed: 60, terrainAbility: '圣泉愈合', tagType: 'success', color: '#ffffff' },
  { id: 'gold', name: '黄金陆行鸟 (Gold)', icon: '✨', maxSpeed: 180, terrainAbility: '海陆空全能', tagType: 'warning', color: '#f59e0b' }
]

const breedingNuts: BreedingNut[] = [
  { id: 'nut_zeio', name: '芝奥坚果 (Zeio Nut)', icon: '🌰', mutationBoost: 60, description: '极罕太古坚果，黑陆行鸟与特等红陆行鸟结合时，有极高几率催生海陆空星全能·黄金陆行鸟！' },
  { id: 'nut_carob', name: '卡拉卡坚果 (Carob Nut)', icon: '🥜', mutationBoost: 25, description: '促发蓝鸟与绿鸟杂交变异为山川两栖黑陆行鸟，大幅拓展山地与水域地形适应力。' },
  { id: 'nut_sylkis', name: '希鲁奇斯圣果 (Sylkis Fruit)', icon: '🍇', mutationBoost: 35, description: '激发以太隐藏基因，大幅强化双亲极速与体力继承率，冲刺极速额外提升 +25 km/h。' },
  { id: 'nut_ghisahl', name: '基萨尔浓缩草 (Ghisahl Extract)', icon: '🌿', mutationBoost: 10, description: '基础体能稳定剂，提高幼鸟体力上限，平稳传承双亲极速属性。' }
]

const selectedSireId = ref('black')
const selectedDamId = ref('red')
const selectedNutId = ref('nut_zeio')
const totalHatchedCount = ref(4)
const hatchNotice = ref('')
const hatchSuccessGold = ref(false)
const activeCodeTab = ref<'nav' | 'breeding' | 'warp' | 'overdrive' | 'orbital'>('nav')

const chocoboStash = ref<Record<string, number>>({
  yellow: 3,
  blue: 2,
  black: 2,
  red: 1,
  white: 2,
  gold: 1
})

const currentNut = computed(() => {
  return breedingNuts.find(n => n.id === selectedNutId.value) || breedingNuts[0]
})

const predictedOffspring = computed(() => {
  const sire = selectedSireId.value
  const dam = selectedDamId.value
  const nut = selectedNutId.value

  const isParentsPair = (a: string, b: string) => (sire === a && dam === b) || (sire === b && dam === a)

  if (isParentsPair('black', 'red') && nut === 'nut_zeio') {
    return {
      name: '黄金陆行鸟 (Gold Chocobo)',
      icon: '✨',
      speed: 180,
      goldChance: 85,
      terrainPass: '海陆空星全地形（深海浅滩、绝壁雪山、熔岩毒沼、双月星轨）',
      traitName: '【时空神行】',
      traitDesc: '全境绝无任何地势阻隔，全员常驻极速与无敌护盾！',
      score: 9800,
      rankTier: 'EX 级神兽传说',
      tagType: 'warning' as const,
      rarity: 'EX 黄金神兽',
      canSwim: true,
      canFlyMountain: true
    }
  }

  if (isParentsPair('blue', 'yellow') || nut === 'nut_carob') {
    return {
      name: '墨黑破空陆行鸟 (Black Chocobo)',
      icon: '🦅',
      speed: 80,
      goldChance: 25,
      terrainPass: '茂密森林冠层起降、丘陵悬崖低空翻越',
      traitName: '【密林破空】',
      traitDesc: '可在任何森林树冠着陆，并飞跃矮山障碍。',
      score: 6200,
      rankTier: 'SSR 级飞行专家',
      tagType: 'info' as const,
      rarity: 'SSR 稀有黑鸟',
      canSwim: false,
      canFlyMountain: true
    }
  }

  if (sire === 'white' || dam === 'white') {
    return {
      name: '圣光愈合白陆行鸟 (White Chocobo)',
      icon: '🕊️',
      speed: 70,
      goldChance: 15,
      terrainPass: '神圣绿洲与平原林地',
      traitName: '【圣泉涌流】',
      traitDesc: '驻足时每秒为全员恢复 5% MP，并持续驱散致盲与猛毒！',
      score: 5800,
      rankTier: 'SR 级辅助神兽',
      tagType: 'success' as const,
      rarity: 'SR 圣泉白鸟',
      canSwim: false,
      canFlyMountain: false
    }
  }

  if (sire === 'blue' || dam === 'blue') {
    return {
      name: '浅滩涉水蓝陆行鸟 (Blue Chocobo)',
      icon: '🦆',
      speed: 65,
      goldChance: 20,
      terrainPass: '内陆江河与沿海浅海',
      traitName: '【水上漂移】',
      traitDesc: '可在水面浅滩零阻力滑行，不受水流减速影响。',
      score: 5200,
      rankTier: 'SR 级涉水两栖',
      tagType: 'info' as const,
      rarity: 'SR 水陆两栖',
      canSwim: true,
      canFlyMountain: false
    }
  }

  return {
    name: '疾风平原黄陆行鸟 (Yellow Chocobo)',
    icon: '🐥',
    speed: 48,
    goldChance: 8,
    terrainPass: '大平原与荒原开阔地',
    traitName: '【平原隐匿】',
    traitDesc: '平原奔袭绝对 0% 遇敌率，开图探索基石。',
    score: 3600,
    rankTier: 'R 级陆地坐骑',
    tagType: 'default' as const,
    rarity: 'R 标准坐骑',
    canSwim: false,
    canFlyMountain: false
  }
})

const resetBreedingLab = () => {
  selectedSireId.value = 'black'
  selectedDamId.value = 'red'
  selectedNutId.value = 'nut_zeio'
  hatchNotice.value = ''
  hatchSuccessGold.value = false
  message.info('陆行鸟亲本与坚果已重置为黄金繁育预设')
}

const hatchChocoboEgg = () => {
  totalHatchedCount.value++
  const pred = predictedOffspring.value
  const isGoldRoll = Math.random() * 100 <= pred.goldChance
  if (isGoldRoll || pred.name.includes('黄金')) {
    hatchSuccessGold.value = true
    hatchNotice.value = `🎉 奇迹诞生！金光破卵而出，成功孵化【${pred.name}】！极速 ${pred.speed} km/h！`
    chocoboStash.value.gold = (chocoboStash.value.gold || 0) + 1
    message.success(`🎉 奇迹破卵！恭喜光之战士喜得【${pred.name}】！`)
  } else {
    hatchSuccessGold.value = false
    hatchNotice.value = `🐣 孵化成功！诞生【${pred.name}】，已录入马厩名册！`
    message.success(`孵化成功！诞生【${pred.name}】`)
  }
}

const exportChocoboPedigree = () => {
  const lines: string[] = [
    '========================================================================',
    '    《光之战士：时空裂隙》陆行鸟全色谱基因谱系与血统契约书 (Pedigree Cert)',
    '========================================================================',
    '签发引擎: Godot 4.6 LTS / chocobo_breeding_system.gd',
    `安全哈希: SHA256-CHOCOBO-${Date.now().toString(16).toUpperCase()}`,
    `签发时间: ${new Date().toISOString()}`,
    '------------------------------------------------------------------------',
    '【亲本血统与催化坚果】:',
    `  - 父代公鸟 (Sire ♂): ${selectedSireId.value}`,
    `  - 母代母鸟 (Dam ♀): ${selectedDamId.value}`,
    `  - 催化坚果 (Nut): ${currentNut.value.name} (变异率: ${currentNut.value.mutationBoost}%)`,
    '------------------------------------------------------------------------',
    '【子代杂交表型预测与实机面板】:',
    `  ★ 繁育品种: ${predictedOffspring.value.name}`,
    `  ★ 巡航极速: ${predictedOffspring.value.speed} km/h`,
    `  ★ 通行特权: ${predictedOffspring.value.terrainPass}`,
    `  ★ 专属天赋: ${predictedOffspring.value.traitName} - ${predictedOffspring.value.traitDesc}`,
    `  ★ 黄金突变率: ${predictedOffspring.value.goldChance}%`,
    `  ★ 综合血统评分: ${predictedOffspring.value.score} (${predictedOffspring.value.rankTier})`,
    '------------------------------------------------------------------------',
    '【当前马厩保有种群】:'
  ]

  chocoboBreeds.forEach(b => {
    lines.push(`  - ${b.name}: ${chocoboStash.value[b.id] || 0} 羽 (${b.terrainAbility})`)
  })

  lines.push('========================================================================')
  lines.push('太古马厩箴言: 沃野千里，羽翼破空。神鸟降世，无境不达！')

  const report = lines.join('\n')

  try {
    navigator.clipboard.writeText(report)
    message.success('已复制《陆行鸟血统基因谱系契约书》至剪贴板！')
  } catch {
    // ignore
  }

  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `chocobo_pedigree_v2.2.246_${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

// Godot 核心代码
const godotCodeText = `## vehicle_navigation_system.gd
## 《光之战士：时空裂隙》大世界多维载具航行与碰撞阻隔核心引擎
extends Node
class_name VehicleNavigationSystem

signal vehicle_boarded(vehicle_id: String, success: bool)
signal landing_checked(vehicle_id: String, terrain: String, can_land: bool)

func can_land_on_terrain(vehicle_id: String, terrain_type: String) -> bool:
	match vehicle_id:
		"veh-feet":
			return terrain_type != "mountains" and terrain_type != "sea" and terrain_type != "lunar"
		"veh-ychocobo":
			return terrain_type == "plains" or terrain_type == "forest"
		"veh-bchocobo":
			# 黑陆行鸟仅可在墨绿密林着陆
			return terrain_type == "forest"
		"veh-ship", "veh-fireship":
			return terrain_type == "sea" or terrain_type == "port"
		"veh-submarine":
			return terrain_type == "deep_sea" or terrain_type == "trench"
		"veh-airship":
			# 飞空艇可飞越一切地形，但只能降落于平原
			return terrain_type == "plains"
		"veh-lunar-airship":
			# 宇宙改型飞空艇全地形包含月球环形山均可着陆
			return true
	return false

func get_encounter_rate(vehicle_id: String) -> float:
	match vehicle_id:
		"veh-ychocobo", "veh-bchocobo", "veh-airship", "veh-lunar-airship":
			return 0.0 # 绝对免遇敌
		"veh-ship", "veh-fireship":
			return 0.06 # 水怪 6% 遇敌率
		"veh-submarine":
			return 0.04
		_:
			return 0.12 # 基础步速 12% 遇敌率
`

const godotChocoboCodeText = [
  '## chocobo_breeding_system.gd',
  '## 《光之战士：时空裂隙》陆行鸟全色谱基因杂交与血统育成引擎',
  '## 官方引擎规范: VBLE Navigation & Breeding Matrix v2.2.246',
  'extends Node',
  'class_name ChocoboBreedingSystem',
  '',
  'signal chocobo_hatched(breed_name: String, speed: float, terrain_flags: int)',
  '',
  'const MUTATION_TABLE = {',
  '	"black+red+nut_zeio": { "result": "Gold Chocobo", "speed": 180.0, "gold_rate": 0.85 },',
  '	"blue+yellow+nut_carob": { "result": "Black Chocobo", "speed": 80.0, "gold_rate": 0.15 },',
  '	"yellow+white+nut_sylkis": { "result": "White Chocobo", "speed": 70.0, "gold_rate": 0.05 }',
  '}',
  '',
  'func breed_chocobo(sire: String, dam: String, nut: String) -> Dictionary:',
  '	var key1 = sire + "+" + dam + "+" + nut',
  '	var key2 = dam + "+" + sire + "+" + nut',
  '	var rule = MUTATION_TABLE.get(key1, MUTATION_TABLE.get(key2, null))',
  '	',
  '	var is_gold = false',
  '	if rule != null:',
  '		is_gold = randf() <= rule.gold_rate',
  '		if is_gold:',
  '			emit_signal("chocobo_hatched", "Gold Chocobo", 180.0, 0b11111)',
  '			return { "name": "Gold Chocobo", "speed": 180.0, "is_gold": true }',
  '		return { "name": rule.result, "speed": rule.speed, "is_gold": false }',
  '	',
  '	return { "name": "Yellow Chocobo", "speed": 45.0, "is_gold": false }'
].join('\n')

const copyGodotCode = async () => {
  try {
    let code = ''
    let filename = ''
    if (activeCodeTab.value === 'nav') {
      code = godotCodeText
      filename = 'vehicle_navigation_system.gd'
    } else if (activeCodeTab.value === 'breeding') {
      code = godotChocoboCodeText
      filename = 'chocobo_breeding_system.gd'
    } else if (activeCodeTab.value === 'warp') {
      code = godotWarpNavigatorCodeText
      filename = 'starship_warp_navigator.gd'
    } else if (activeCodeTab.value === 'overdrive') {
      code = godotHyperOverdriveCodeText
      filename = 'vehicle_hyper_overdrive_engine.gd'
    } else {
      code = godotOrbitalSlingshotCodeText
      filename = 'orbital_gravity_slingshot_engine.gd'
    }
    await navigator.clipboard.writeText(code)
    copiedCode.value = true
    message.success(`已复制 ${filename} 核心实机代码！`)
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}

// ================= 专区 4: 飞空艇模块化改装与折跃巡航系统 =================
interface EngineModule {
  id: string
  name: string
  speedMultiplier: number
  description: string
}

interface RadarModule {
  id: string
  name: string
  feature: string
}

interface HullModule {
  id: string
  name: string
  capability: string
}

interface FlightDestination {
  id: string
  name: string
  layer: string
  distanceBase: number
}

const engineModules: EngineModule[] = [
  { id: 'eng_steam', name: '原装蒸汽活塞动力机', speedMultiplier: 1.0, description: '基础蒸汽锅炉，常规巡航平稳输出' },
  { id: 'eng_gale', name: '龙骑士疾风以太涡轮', speedMultiplier: 1.8, description: '以太风暴增压，穿透高空强对流风暴' },
  { id: 'eng_antigrav', name: '魔导反引力悬浮核心', speedMultiplier: 2.8, description: '希德太古反重力专利，支持任意水面超低空悬停' },
  { id: 'eng_void', name: '虚无次元折跃跃迁核', speedMultiplier: 6.0, description: '提取次元裂隙暗能，实现跨大陆秒级瞬间折跃' }
]

const radarModules: RadarModule[] = [
  { id: 'rad_eagle', name: '鹰眼高空光学全景镜', feature: '驱散大地图迷雾，高空俯瞰' },
  { id: 'rad_sonar', name: '深海回声声呐探测仪', feature: '自动标记沉船宝藏与沉没神殿' },
  { id: 'rad_aether', name: '太古以太波相位雷达', feature: '追踪隐匿幻兽神殿与次元裂缝' }
]

const hullModules: HullModule[] = [
  { id: 'hull_adamant', name: '精金黑铁强化防冲板', capability: '免疫高山气流与碎石撞击' },
  { id: 'hull_reflect', name: '魔导绝对偏转结界机', capability: '吸收高空雷暴与空中暗怪俯冲' },
  { id: 'hull_cosmic', name: '宇宙加压生命维持舱', capability: '突破卡门线飞向双月环形山' }
]

const flightDestinations: FlightDestination[] = [
  { id: 'tycoon', name: '泰空王国 平原航空港', layer: '地表海陆', distanceBase: 120 },
  { id: 'karnak', name: '卡尔纳克 蒸汽动力军港', layer: '地表海陆', distanceBase: 480 },
  { id: 'sunken_walse', name: '沉没沃鲁斯塔 深渊裂口', layer: '深海海沟', distanceBase: 760 },
  { id: 'moore_forest', name: '穆亚大森林 长老圣树之冠', layer: '密林高空', distanceBase: 950 },
  { id: 'void_rift', name: '次元之隙 虚无空间裂隙口', layer: '次元裂谷', distanceBase: 1800 },
  { id: 'lunar_palace', name: '红之月 月之巨鲸停泊台', layer: '月轨星际', distanceBase: 3800 }
]

const selectedEngineId = ref('eng_antigrav')
const selectedRadarId = ref('rad_aether')
const selectedHullId = ref('hull_cosmic')
const routeOrigin = ref('tycoon')
const routeDestination = ref('lunar_palace')

const isCruising = ref(false)
const cruiseProgress = ref(0)
const cruiseLogs = ref<string[]>([
  '=== 飞空艇导航系统已待命，请选择航线并点击启动巡航 ==='
])
let cruiseTimer: ReturnType<typeof setInterval> | null = null

const currentEngine = computed(() => {
  return engineModules.find(e => e.id === selectedEngineId.value) || engineModules[0]
})

const calculatedSpeedText = computed(() => {
  return `${(3.5 * currentEngine.value.speedMultiplier).toFixed(1)}x 音速巡航`
})

const calculatedDistance = computed(() => {
  const dest = flightDestinations.find(d => d.id === routeDestination.value) || flightDestinations[1]
  const orig = flightDestinations.find(d => d.id === routeOrigin.value) || flightDestinations[0]
  return Math.abs(dest.distanceBase - orig.distanceBase) + 300
})

const calculatedDurationText = computed(() => {
  const dist = calculatedDistance.value
  const speed = currentEngine.value.speedMultiplier
  const sec = Math.max(1.5, (dist / 400) / speed)
  return `${sec.toFixed(1)} 秒`
})

const startCruiseFlight = () => {
  if (isCruising.value) return
  isCruising.value = true
  cruiseProgress.value = 0

  const origName = flightDestinations.find(d => d.id === routeOrigin.value)?.name || '原港口'
  const destName = flightDestinations.find(d => d.id === routeDestination.value)?.name || '目标港口'

  cruiseLogs.value = [
    `[0.0s] 🚀 动力核心【${currentEngine.value.name}】点火，从【${origName}】离地升空！`,
    `[0.5s] 🧭 航向校准，导航雷达锁定【${destName}】，航距 ${calculatedDistance.value} km`
  ]

  if (cruiseTimer) clearInterval(cruiseTimer)

  cruiseTimer = setInterval(() => {
    cruiseProgress.value += 10
    if (cruiseProgress.value === 50) {
      cruiseLogs.value.unshift(`[1.0s] ⚡ 达到最高巡航极速 ${calculatedSpeedText.value}，开启绝对隐匿免遇敌力场！`)
    }
    if (cruiseProgress.value >= 100) {
      if (cruiseTimer) clearInterval(cruiseTimer)
      cruiseTimer = null
      isCruising.value = false
      cruiseProgress.value = 100
      cruiseLogs.value.unshift(`[2.0s] 🛬 飞空艇抵达【${destName}】着陆场，反引力锚定完成！`)
      message.success(`飞空艇已顺利抵达【${destName}】！`)
    }
  }, 180)
}

const scrollToWarpStudio = () => {
  const el = document.getElementById('starship-warp-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// ================= 专区 5: 全地形海陆空多维跃迁与超光速折跃星舰巡航推演工坊 =================
interface WarpDestination {
  id: string
  name: string
  distanceKm: number
  distanceLabel: string
  dimension: string
  gravity: string
  dangerTier: string
  description: string
  recommendedPolarization: number
}

interface WarpNavigator {
  id: string
  name: string
  title: string
  avatar: string
  stabilityBonus: number
  distortionReduction: number
  stormAvoidance: number
  desc: string
}

const warpDestinations: WarpDestination[] = [
  {
    id: 'lunar_orbit',
    name: '红月近地轨道环形空间站',
    distanceKm: 384400,
    distanceLabel: '384,400 km',
    dimension: '外层真空 · 双月星际',
    gravity: '0.16 g (微重力)',
    dangerTier: 'Tier IV',
    description: '月之巨鲸母港锚泊轨道，环绕红之月公转，太古魔导遗迹核心中继器。',
    recommendedPolarization: 120
  },
  {
    id: 'karman_troposphere',
    name: '始源行星卡门线对流层',
    distanceKm: 100,
    distanceLabel: '100 km',
    dimension: '行星大气圈 · 苍穹平流层',
    gravity: '0.98 g (标准重力)',
    dangerTier: 'Tier I',
    description: '突破星球引力圈临界卡门线，俯瞰第一与第二世界合体后的广袤大平原。',
    recommendedPolarization: 45
  },
  {
    id: 'void_singularity',
    name: '虚空裂隙中继引力透镜',
    distanceKm: 1200000,
    distanceLabel: '1,200,000 km',
    dimension: '次元裂隙 · 虚无奇点',
    gravity: '3.85 g (强引力畸变)',
    dangerTier: 'Tier V',
    description: '时空裂谷深处四维奇点引力透镜，连接埃克斯迪斯虚无核心领域。',
    recommendedPolarization: 280
  },
  {
    id: 'abyssal_trench',
    name: '幻影深渊海底暗物质裂谷',
    distanceKm: 11,
    distanceLabel: '11,000 m (海渊深度)',
    dimension: '深海极渊 · 暗物质流层',
    gravity: '1.12 g (超高流体压强)',
    dangerTier: 'Tier III',
    description: '沉没沃尔斯塔遗迹最底端裂隙，高浓度暗物质洋流与远古水神祭坛。',
    recommendedPolarization: 195
  }
]

const warpNavigators: WarpNavigator[] = [
  {
    id: 'cid',
    name: '希德 (Cid Previa)',
    title: '太古动力学宗师',
    avatar: '👴',
    stabilityBonus: 25,
    distortionReduction: 10,
    stormAvoidance: 15,
    desc: '飞空艇反重力核心发明者，使曲率引擎热载荷降低 30%，折跃稳定性提升 25%'
  },
  {
    id: 'mid',
    name: '米德 (Mid Previa)',
    title: '以太航电工程师',
    avatar: '🧑‍💻',
    stabilityBonus: 15,
    distortionReduction: 40,
    stormAvoidance: 20,
    desc: '太古传感器天才，引力透镜空间张量修正率大幅提升，畸变度降低 40%'
  },
  {
    id: 'faris',
    name: '法丽丝 (Faris Scherwiz)',
    title: '星海与风暴舵手',
    avatar: '🏴‍☠️',
    stabilityBonus: 10,
    distortionReduction: 15,
    stormAvoidance: 50,
    desc: '操舵海盗王女与海龙契约者，直觉预判次元风暴激波，规避率暴增 50%'
  },
  {
    id: 'bartz',
    name: '巴兹 (Bartz Klauser)',
    title: '纯粹直觉探险家',
    avatar: '🗡️',
    stabilityBonus: 20,
    distortionReduction: 20,
    stormAvoidance: 25,
    desc: '风之水晶钦定传承者，凭借自由之风的直觉洞察时空流向，全指标综合平衡'
  }
]

const selectedWarpDestId = ref('lunar_orbit')
const selectedNavigatorId = ref('cid')
const warpFactor = ref(6.5)
const shieldPolarization = ref(120)
const antimatterRatio = ref(75)

const isWarping = ref(false)
const warpProgress = ref(0)
const warpCurrentPhase = ref('')
const warpLogs = ref<string[]>([
  '=== 超光速星舰折跃系统已待命，请配置曲率与领航专家后启动跃迁 ==='
])
let warpTimer: ReturnType<typeof setInterval> | null = null

const currentWarpDest = computed(() => {
  return warpDestinations.find(d => d.id === selectedWarpDestId.value) || warpDestinations[0]
})

const currentNavigator = computed(() => {
  return warpNavigators.find(n => n.id === selectedNavigatorId.value) || warpNavigators[0]
})

const calculatedWarpStability = computed(() => {
  const base = 100 - (warpFactor.value * 4) + currentNavigator.value.stabilityBonus
  const polarDiff = Math.abs(shieldPolarization.value - currentWarpDest.value.recommendedPolarization)
  const penalty = polarDiff * 0.15
  const fuelBonus = antimatterRatio.value >= 50 ? 5 : -10
  const finalVal = base - penalty + fuelBonus
  return Math.min(99.9, Math.max(20.0, finalVal))
})

const calculatedGravDistortion = computed(() => {
  const base = (warpFactor.value * 3.5) - currentNavigator.value.distortionReduction
  const distAdd = currentWarpDest.value.distanceKm > 100000 ? 15 : 5
  return Math.min(85.0, Math.max(5.0, base + distAdd))
})

const calculatedVoidStormChance = computed(() => {
  const base = (warpFactor.value * 2.8) - currentNavigator.value.stormAvoidance
  const tierRisk = currentWarpDest.value.dangerTier === 'Tier V' ? 25 : (currentWarpDest.value.dangerTier === 'Tier IV' ? 15 : 5)
  return Math.min(65.0, Math.max(1.0, base + tierRisk))
})

const calculatedWarpDuration = computed(() => {
  const dist = currentWarpDest.value.distanceKm
  const baseSec = (Math.log10(dist + 10) * 1.2) / Math.pow(warpFactor.value, 0.8)
  return Math.min(4.5, Math.max(0.15, baseSec))
})

const calculatedAntimatterQuarks = computed(() => {
  const mult = currentWarpDest.value.distanceKm > 100000 ? 2.5 : 1.0
  return (warpFactor.value * 1.8 * (antimatterRatio.value / 100) * mult).toFixed(1)
})

const startWarpSequence = () => {
  if (isWarping.value) return
  isWarping.value = true
  warpProgress.value = 0
  warpCurrentPhase.value = '阶段 1: 磁约束点火'

  const dest = currentWarpDest.value
  const nav = currentNavigator.value

  warpLogs.value = [
    `[0.0s] 🌌 领航专家【${nav.name}】下达指令，反物质约束管道注入 ${antimatterRatio.value}% 高纯能流！`,
    `[0.2s] 🛡️ 偏振防蚀力场校准至 ${shieldPolarization.value}° (目标偏振: ${dest.recommendedPolarization}°)`,
    `[0.4s] ⚡ 曲率引擎切入 Warp ${warpFactor.value.toFixed(1)}，空间张量发生弯曲，引力畸变率 ${calculatedGravDistortion.value.toFixed(1)}%`
  ]

  if (warpTimer) clearInterval(warpTimer)

  const phases = [
    { at: 20, name: '阶段 2: 曲率张量泡生成', log: `[0.6s] 🌀 形成局部闵可夫斯基曲率泡，外部光锥闭锁，规避一切物理撞击！` },
    { at: 50, name: '阶段 3: 穿越引力透镜视界', log: `[1.0s] ✨ 成功突破引力透镜视界，超光速滑移进行中，时空稳定性 ${calculatedWarpStability.value.toFixed(1)}%！` },
    { at: 80, name: '阶段 4: 亚光速相位减速', log: `[1.4s] 🧲 偏振反冲减速喷口展开，吸收超光速相对论动量，次元风暴威胁率 ${calculatedVoidStormChance.value.toFixed(1)}%` },
    { at: 100, name: '阶段 5: 坐标锚定达成', log: `[1.8s] 🚀 跃迁成功！星舰已进入【${dest.name}】(${dest.dimension}) 轨道！` }
  ]

  warpTimer = setInterval(() => {
    warpProgress.value += 10
    const matchedPhase = phases.find(p => p.at === warpProgress.value)
    if (matchedPhase) {
      warpCurrentPhase.value = matchedPhase.name
      warpLogs.value.unshift(matchedPhase.log)
    }

    if (warpProgress.value >= 100) {
      if (warpTimer) clearInterval(warpTimer)
      warpTimer = null
      isWarping.value = false
      warpProgress.value = 100
      message.success(`星舰已完成超光速折跃，成功抵达【${dest.name}】！`)
    }
  }, 160)
}

const copyWarpConfig = () => {
  const dest = currentWarpDest.value
  const nav = currentNavigator.value
  const configText = `[星舰折跃遥测] 目标:${dest.name}(${dest.distanceLabel}) | 航速:Warp ${warpFactor.value.toFixed(1)} | 偏振:${shieldPolarization.value}° | 燃料:${antimatterRatio.value}% | 领航:${nav.name} | 稳定性:${calculatedWarpStability.value.toFixed(1)}% | 耗时:${calculatedWarpDuration.value.toFixed(2)}s`
  navigator.clipboard.writeText(configText).then(() => {
    message.success('星舰折跃航线参数已复制到剪贴板！')
  }).catch(() => {
    message.info('参数已复制')
  })
}

const exportWarpCertificate = () => {
  const dest = currentWarpDest.value
  const nav = currentNavigator.value
  const now = new Date()
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 19)

  const content = `================================================================================
《光之战士：时空裂隙》大世界超光速星舰折跃与跨次元航行认证方案书
================================================================================
推演方案: Starship Warp & Hyperdrive Certificate
颁发机构: VBLE Exploration Vehicles Matrix / 皇家技师工坊
推演版本: VBLE Exploration Vehicles Matrix v2.2.257
引擎规范: Godot 4.6 LTS Starship Warp Navigator Architecture
签发时间: ${dateStr} (CST)

【超光速跃迁航程与环境参数】
- 跃迁目的地: ${dest.name} (${dest.id})
- 空间维度层: ${dest.dimension}
- 航程物理测距: ${dest.distanceLabel}
- 本地引力系数: ${dest.gravity}
- 目标危险层级: ${dest.dangerTier}
- 航点地质情报: ${dest.description}

【动力机体与力场谐振工况】
- 折跃曲率能级: Warp ${warpFactor.value.toFixed(1)} (超光速滑移系数: 3.333)
- 防护罩偏振共鸣角: ${shieldPolarization.value}° (最佳匹配偏振: ${dest.recommendedPolarization}°)
- 反物质湮灭燃料配比: ${antimatterRatio.value}% 纯化暗能
- 选派星舰领航专家: ${nav.name} (${nav.title})
- 领航专家职能天赋: 稳定性+${nav.stabilityBonus}%, 畸变-${nav.distortionReduction}%, 风暴规避+${nav.stormAvoidance}%

【实时遥测与航行解算指标】
- 主观跃迁耗时: ${calculatedWarpDuration.value.toFixed(2)} 秒
- 时空连续体稳定性: ${calculatedWarpStability.value.toFixed(1)}% (基准评价: ${calculatedWarpStability.value >= 80 ? '极佳' : calculatedWarpStability.value >= 60 ? '优良' : '高危警报'})
- 空间张量透镜畸变度: ${calculatedGravDistortion.value.toFixed(1)}%
- 次元风暴遭遇概率: ${calculatedVoidStormChance.value.toFixed(1)}%
- 反物质预估损耗: ${calculatedAntimatterQuarks.value} 夸克能级单位

================================================================================
数字防伪哈希: SHA256-WARP-${Math.random().toString(36).substring(2, 10).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}
================================================================================`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `starship_warp_certificate_v2.2.257_${dest.id}.txt`
  a.click()
  URL.revokeObjectURL(url)
  message.success(`已导出超光速星舰折跃认证方案书: ${dest.name}`)
}

const godotWarpNavigatorCodeText = `# ==============================================================================
# StarshipWarpNavigator - 超光速曲率星舰折跃与跨次元航行导航解算器
# 文件路径: res://scripts/vehicles/starship_warp_navigator.gd
# 架构规范: Godot 4.6 LTS / VBLE Cosmic Hyperdrive Matrix v2.2.257
# 核心职责: 管理超光速曲率泡张量、引力透镜偏振角纠偏、反物质消耗与微秒级跃迁调度
# ==============================================================================
class_name StarshipWarpNavigator
extends Node

signal warp_sequence_initiated(dest_id: String, warp_factor: float)
signal warp_phase_changed(phase_index: int, phase_description: String, progress: float)
signal warp_transit_completed(arrival_telemetry: Dictionary)
signal void_storm_encountered(intensity: float, shield_absorbed: bool)

const LIGHT_SPEED_C: float = 299792.458 # km/s 光速基准常量
const WARP_POWER_FACTOR: float = 3.333

@export var current_warp_factor: float = 6.5
@export var shield_polarization_deg: float = 120.0
@export var antimatter_ratio_pct: float = 75.0
@export var assigned_navigator: String = "cid"

var is_warping: bool = false
var elapsed_warp_time: float = 0.0

const DESTINATIONS: Dictionary = {
	"lunar_orbit": { "name": "红月近地轨道环形空间站", "dist_km": 384400.0, "gravity": 0.16, "polar_deg": 120.0, "tier": 4 },
	"karman_troposphere": { "name": "始源行星卡门线对流层", "dist_km": 100.0, "gravity": 0.98, "polar_deg": 45.0, "tier": 1 },
	"void_singularity": { "name": "虚空裂隙中继引力透镜", "dist_km": 1200000.0, "gravity": 3.85, "polar_deg": 280.0, "tier": 5 },
	"abyssal_trench": { "name": "幻影深渊海底暗物质裂谷", "dist_km": 11.0, "gravity": 1.12, "polar_deg": 195.0, "tier": 3 }
}

func calculate_warp_stability(dest_id: String) -> float:
	var dest = DESTINATIONS.get(dest_id, DESTINATIONS["lunar_orbit"])
	var base_stability: float = 100.0 - (current_warp_factor * 4.0)
	var polar_diff: float = abs(shield_polarization_deg - dest.polar_deg)
	var polar_penalty: float = polar_diff * 0.15
	var nav_bonus: float = 25.0 if assigned_navigator == "cid" else (15.0 if assigned_navigator == "mid" else 10.0)
	var fuel_factor: float = 5.0 if antimatter_ratio_pct >= 50.0 else -10.0
	return clampf(base_stability - polar_penalty + nav_bonus + fuel_factor, 20.0, 99.9)

func calculate_gravitational_distortion(dest_id: String) -> float:
	var dest = DESTINATIONS.get(dest_id, DESTINATIONS["lunar_orbit"])
	var base_dist: float = current_warp_factor * 3.5
	var nav_reduct: float = 40.0 if assigned_navigator == "mid" else 15.0
	var dist_add: float = 15.0 if dest.dist_km > 100000.0 else 5.0
	return clampf(base_dist - nav_reduct + dist_add, 5.0, 85.0)

func calculate_void_storm_chance(dest_id: String) -> float:
	var dest = DESTINATIONS.get(dest_id, DESTINATIONS["lunar_orbit"])
	var base_chance: float = current_warp_factor * 2.8
	var nav_avoid: float = 50.0 if assigned_navigator == "faris" else 20.0
	var tier_risk: float = float(dest.tier) * 5.0
	return clampf(base_chance - nav_avoid + tier_risk, 1.0, 65.0)

func engage_hyperdrive_warp(dest_id: String) -> Dictionary:
	if is_warping:
		push_warning("[StarshipWarp] 折跃引擎已在运行中，请勿重复点火")
		return { "success": false, "reason": "already_active" }
	
	is_warping = true
	var dest = DESTINATIONS.get(dest_id, DESTINATIONS["lunar_orbit"])
	emit_signal("warp_sequence_initiated", dest_id, current_warp_factor)
	print("[StarshipWarp] 开启超光速曲率折跃 -> 目标: %s, 曲率: %.1f" % [dest.name, current_warp_factor])

	var stability: float = calculate_warp_stability(dest_id)
	var distortion: float = calculate_gravitational_distortion(dest_id)
	var storm_chance: float = calculate_void_storm_chance(dest_id)
	var duration: float = (log(dest.dist_km + 10.0) * 1.2) / pow(current_warp_factor, 0.8)

	var telemetry: Dictionary = {
		"dest_name": dest.name,
		"warp_factor": current_warp_factor,
		"stability": stability,
		"distortion": distortion,
		"storm_chance": storm_chance,
		"subjective_duration_sec": duration,
		"antimatter_used": current_warp_factor * 1.8 * (antimatter_ratio_pct / 100.0),
		"timestamp": Time.get_datetime_string_from_system()
	}
	
	emit_signal("warp_transit_completed", telemetry)
	is_warping = false
	return telemetry
`

// ==========================================
// ⚡ 全域多维载具以太超频过载推进与虚空反冲工坊
// ==========================================
const scrollToOverdriveStudio = () => {
  const el = document.getElementById('hyper-overdrive-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

interface OverdriveMode {
  id: string
  name: string
  subtitle: string
  badge: string
  icon: string
  desc: string
  thrustMultiplier: number
  recoilG: number
  presetCharge: number
  affixes: string[]
}

const overdriveModesList: OverdriveMode[] = [
  {
    id: 'cruise_propulsion',
    name: '巡航稳态推进',
    subtitle: '标准平稳巡航',
    badge: '稳态',
    icon: '🚀',
    desc: '标称推力输出，以太流道平滑无抖动，完全消除惯性过载，全乘员平稳舒适。',
    thrustMultiplier: 1.0,
    recoilG: 0.8,
    presetCharge: 80,
    affixes: [
      '动力输出稳态 100%',
      '全地形航行噪声降低 50%',
      '零虚空反冲冲击伤害',
      '燃油续航效率达到极限'
    ]
  },
  {
    id: 'turbo_afterburner',
    name: '涡轮喷流超频',
    subtitle: '以太加力喷射',
    badge: '超频',
    icon: '🔥',
    desc: '向燃烧室直接注满高纯度以太浓缩液，瞬间爆发 2.2 倍强推力，冲刺跨越暴风雨与大洋激流。',
    thrustMultiplier: 2.2,
    recoilG: 3.5,
    presetCharge: 130,
    affixes: [
      '巡航航速瞬间提升 120%',
      '免疫暴风雨浪涌强阻力',
      '发动机核心温度温和上升',
      '反冲过载处于安全阻尼区间'
    ]
  },
  {
    id: 'gravitational_slingshot',
    name: '虚空引力弹弓跃迁',
    subtitle: '天体引力对冲',
    badge: '跃迁',
    icon: '🪐',
    desc: '借助双月轨道引力阱与虚空重力梯度实现无动力引力弹射，以 3.8 倍巡航极速穿透崇山峻岭。',
    thrustMultiplier: 3.8,
    recoilG: 7.2,
    presetCharge: 165,
    affixes: [
      '高空直接跨越高耸山脉断崖',
      '突破音障达到 Mach 2.5 巡航',
      '反重力补偿平衡大部分阻尼',
      '偶发时空乱流轻微颠簸'
    ]
  },
  {
    id: 'antimatter_aurora_burst',
    name: '太古反物质极光湮灭冲刺',
    subtitle: '神话极境冲刺',
    badge: '湮灭',
    icon: '⚡',
    desc: '解除发动机安全锁，诱导正负微以太粒子湮灭爆轰，产生极光尾焰与 Mach 4.5 终极极速！',
    thrustMultiplier: 5.5,
    recoilG: 12.8,
    presetCharge: 200,
    affixes: [
      '极光音爆突破 Mach 4.5 极境',
      '完全无视任何大世界地形障碍',
      '全域时空裂隙秒级直达',
      '需液氮深冷保障核心稳态'
    ]
  }
]

const selectedOverdriveModeId = ref('turbo_afterburner')
const currentOverdriveMode = computed(() => overdriveModesList.find(m => m.id === selectedOverdriveModeId.value) || overdriveModesList[1])

const propulsionAetherCharge = ref(130)
const magneticNozzleContainment = ref(85)
const antiGravityCompensation = ref(75)
const inertialDampingThreshold = ref(8.0)
const enableCryoCoolantInjection = ref(true)

const overdriveSimulationLogs = ref<string[]>([
  '⚡ 载具以太超频过载推进工坊就绪，磁约束导流喷管已预热完成。',
  '🚀 当前工况：涡轮喷流超频，已锁定 130% 以太充盈率与 85% 磁约束率。'
])

const selectOverdriveMode = (id: string) => {
  selectedOverdriveModeId.value = id
  const m = currentOverdriveMode.value
  propulsionAetherCharge.value = m.presetCharge
  overdriveSimulationLogs.value.unshift(`🚀 已切换运行工况为【${m.name}】(${m.subtitle})，推力倍率 ${m.thrustMultiplier}x，标称反冲 ${m.recoilG} G。`)
}

const maxCruiseSpeedKnots = computed(() => {
  const charge = propulsionAetherCharge.value / 100
  const mag = magneticNozzleContainment.value / 100
  const ag = antiGravityCompensation.value / 100
  const baseSpeed = 420 * currentOverdriveMode.value.thrustMultiplier
  const result = baseSpeed * charge * (0.6 + mag * 0.4) * (0.7 + ag * 0.3)
  return Math.min(2980, Math.max(120, Math.round(result)))
})

const voidRecoilAccelerationG = computed(() => {
  const charge = propulsionAetherCharge.value / 100
  const ag = antiGravityCompensation.value / 100
  const rawG = currentOverdriveMode.value.recoilG * charge
  const dampedG = rawG * (1 - ag * 0.45)
  return Number(Math.min(15.0, Math.max(0.5, dampedG)).toFixed(1))
})

const engineCoreStabilityPercent = computed(() => {
  const charge = propulsionAetherCharge.value
  const mag = magneticNozzleContainment.value
  let stab = 100 - (charge - 100) * 0.5 + (mag - 50) * 0.4
  if (enableCryoCoolantInjection.value) stab += 25
  return Math.min(100, Math.max(20, Math.round(stab)))
})

const engineStabilityText = computed(() => {
  const s = engineCoreStabilityPercent.value
  if (s >= 85) return '核心绝对冰冷稳态'
  if (s >= 70) return '正常安全超频工况'
  if (s >= 50) return '高温临界警戒态'
  return '热失控警报！'
})

const turbulencePenetrationRate = computed(() => {
  const ag = antiGravityCompensation.value
  const mag = magneticNozzleContainment.value
  return Math.min(100, Math.max(5, Math.round(ag * 0.6 + mag * 0.4)))
})

const overdriveAirworthinessVerdict = computed(() => {
  const s = engineCoreStabilityPercent.value
  const g = voidRecoilAccelerationG.value
  const limit = inertialDampingThreshold.value
  if (s >= 80 && g <= limit) {
    return { badge: 'AAA 适航', status: '全工况安全达标', color: 'text-emerald-400' }
  } else if (s >= 65 && g <= limit * 1.2) {
    return { badge: 'AA 优良', status: '次级超频允许', color: 'text-cyan-400' }
  } else if (s >= 50) {
    return { badge: 'B 临界', status: '建议开启深冷', color: 'text-amber-400' }
  }
  return { badge: 'D 危险', status: '过载反冲超限', color: 'text-rose-400' }
})

const autoBalanceMagneticNozzle = () => {
  magneticNozzleContainment.value = 95
  antiGravityCompensation.value = 90
  inertialDampingThreshold.value = 12.0
  message.success('已自动将磁导喷管约束拉升至 95%，反重力补偿配平至 90%！')
  overdriveSimulationLogs.value.unshift('⚖️ 磁约束与反重力悬浮超导阵列配平成功！发动机核心稳态大幅提升。')
}

const triggerAuroraBurst = () => {
  propulsionAetherCharge.value = 200
  enableCryoCoolantInjection.value = true
  message.warning('💥 极光湮灭冲刺已启动！航速突破 Mach 4.5！')
  overdriveSimulationLogs.value.unshift('💥 警报：推进器已拉满 200% 极限制以太充盈率！极光尾焰喷射，航速突破 Mach 4.5 音爆！')
}

const triggerAetherOverdriveSimulation = () => {
  const v = overdriveAirworthinessVerdict.value
  if (v.badge.includes('D')) {
    message.error(`⚠️ 试车警报！反冲过载达到 ${voidRecoilAccelerationG.value}G，超出惯性阻尼承受极限！`)
    overdriveSimulationLogs.value.unshift(`⚠️ 试车受阻：反冲 G 值过高 (${voidRecoilAccelerationG.value}G > ${inertialDampingThreshold.value}G)，载具骨架承受剧烈震颤！`)
  } else {
    message.success(`🎉 以太超频试车大获成功！航速达 ${maxCruiseSpeedKnots.value} 节，适航评级 ${v.badge}！`)
    overdriveSimulationLogs.value.unshift(`✨ 试车圆满成功！航速达成 ${maxCruiseSpeedKnots.value} 节 (Mach ${(maxCruiseSpeedKnots.value / 660).toFixed(2)})，热堆稳态率 ${engineCoreStabilityPercent.value}%。`)
  }
}

const exportVehicleOverdriveCertificate = () => {
  const m = currentOverdriveMode.value
  const timestamp = new Date().toISOString()
  const certId = 'VEH-OVERDRIVE-' + Date.now().toString(36).toUpperCase()
  const content = [
    '================================================================================',
    '《光之战士：时空裂隙》全域多维载具以太超频过载推进与适航方案书',
    '================================================================================',
    `方案编号: ${certId}`,
    `签署时间: ${timestamp}`,
    '认证矩阵: VBLE Exploration Vehicles Matrix v2.2.274',
    '系统架构: Godot 4.6 LTS / RefCounted Vehicle Hyper Overdrive Engine',
    '',
    '【运行工况与推进档案】',
    `• 超频工况: ${m.name} (${m.subtitle})`,
    `• 运行标章: ${m.badge}`,
    `• 推力倍率: ${m.thrustMultiplier}x`,
    `• 标称反冲负荷: ${m.recoilG} G`,
    '',
    '【推进动力学核心参数】',
    `• 推进器以太充盈率: ${propulsionAetherCharge.value}%`,
    `• 导流喷嘴磁约束率: ${magneticNozzleContainment.value}%`,
    `• 反重力悬浮补偿率: ${antiGravityCompensation.value}%`,
    `• 惯性阻尼过载阈值: ${inertialDampingThreshold.value.toFixed(1)} G`,
    `• 以太深冷液氮注入: ${enableCryoCoolantInjection.value ? '已装配 (+25% 稳态)' : '未启用'}`,
    '',
    '【解算指标与适航评定】',
    `• 极限巡航航速: ${maxCruiseSpeedKnots.value} 节 (Mach ${(maxCruiseSpeedKnots.value / 660).toFixed(2)})`,
    `• 虚空反冲加速度: ${voidRecoilAccelerationG.value.toFixed(1)} G`,
    `• 发动机核心稳态率: ${engineCoreStabilityPercent.value}% (${engineStabilityText.value})`,
    `• 虚空乱流穿透率: ${turbulencePenetrationRate.value}%`,
    `• 适航综合裁决: ${overdriveAirworthinessVerdict.value.badge} · ${overdriveAirworthinessVerdict.value.status}`,
    '',
    '【超频巡航特性与探索词缀】',
    ...m.affixes.map((a, i) => `  ${i + 1}. ${a}`),
    '',
    '【底层实机契约签名】',
    `SHA-256 安全哈希: ${Array.from(certId + timestamp).map(c => (c.charCodeAt(0) * 31 % 16).toString(16)).join('').padEnd(64, 'b')}`,
    '================================================================================'
  ].join('\n')

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `vehicle_overdrive_certificate_${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
  message.success('已成功导出《全域载具以太超频推进方案书》！')
  overdriveSimulationLogs.value.unshift(`📜 方案书已完成 SHA-256 离线安全签署并导出：编号 ${certId}`)
}

const godotHyperOverdriveCodeText = `## vehicle_hyper_overdrive_engine.gd
## Godot 4.6 LTS - 全域多维载具以太超频推进与虚空反冲解算引擎
extends RefCounted
class_name VehicleHyperOverdriveEngine

signal overdrive_engaged(mode_name: String, speed_knots: float, recoil_g: float)
signal thermal_overheat_warning(core_temp_celsius: float)
signal turbulence_shield_penetrated(damage: float)

class OverdriveMetrics:
	var speed_knots: int
	var recoil_g: float
	var core_stability_pct: int
	var penetration_pct: int
	var is_airworthy: bool

## 纯逻辑执行以太超频动力学推演
static func calculate_overdrive_metrics(
	thrust_mult: float,
	nominal_recoil: float,
	charge_pct: float,
	nozzle_pct: float,
	antigrav_pct: float,
	damping_threshold_g: float,
	has_cryo: bool
) -> OverdriveMetrics:
	var metrics = OverdriveMetrics.new()
	
	# 航速解算
	var charge_factor: float = charge_pct / 100.0
	var mag_factor: float = nozzle_pct / 100.0
	var ag_factor: float = antigrav_pct / 100.0
	var base_spd: float = 420.0 * thrust_mult
	var spd: float = base_spd * charge_factor * (0.6 + mag_factor * 0.4) * (0.7 + ag_factor * 0.3)
	metrics.speed_knots = int(clampf(spd, 120.0, 2980.0))
	
	# 虚空反冲加速度
	var raw_g: float = nominal_recoil * charge_factor
	metrics.recoil_g = clampf(raw_g * (1.0 - ag_factor * 0.45), 0.5, 15.0)
	
	# 热堆稳态率
	var stab: float = 100.0 - (charge_pct - 100.0) * 0.5 + (nozzle_pct - 50.0) * 0.4
	if has_cryo:
		stab += 25.0
	metrics.core_stability_pct = int(clampf(stab, 20.0, 100.0))
	
	# 乱流穿透率
	metrics.penetration_pct = int(clampf(antigrav_pct * 0.6 + nozzle_pct * 0.4, 5.0, 100.0))
	metrics.is_airworthy = (metrics.core_stability_pct >= 65 and metrics.recoil_g <= damping_threshold_g * 1.1)
	
	return metrics
`

onUnmounted(() => {
  if (cruiseTimer) {
    clearInterval(cruiseTimer)
    cruiseTimer = null
  }
  if (warpTimer) {
    clearInterval(warpTimer)
    warpTimer = null
  }
})

// ==========================================
// 🌌 全域星海轨道跃迁、亚光速重力弹弓工坊 (v2.2.289)
// ==========================================
interface OrbitalManeuver {
  id: string
  name: string
  icon: string
  desc: string
  color: string
  efficiencyTag: string
}

const orbitalManeuversList: OrbitalManeuver[] = [
  {
    id: 'slingshot_periapsis',
    name: '近拱点重力弹弓机动',
    icon: '🪐',
    desc: '借助行星引力井近拱点无动力加速，末速度跃升 +120%',
    color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
    efficiencyTag: '速度 +120% / 无动力弹弓'
  },
  {
    id: 'lagrange_anchor',
    name: '拉格朗日 L1 平衡点驻泊',
    icon: '⚖️',
    desc: '在双星引力抵消区实现无耗能静止驻泊，以太能耗降低 70%',
    color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    efficiencyTag: '能耗 -70% / 零重力平衡'
  },
  {
    id: 'hollow_singularity_slalom',
    name: '空心奇点视界规避回环',
    icon: '🌀',
    desc: '极限穿梭黑洞强吸积盘边缘，时空曲率偏折弹射',
    color: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
    efficiencyTag: '曲率偏折 / 极限穿透'
  },
  {
    id: 'tachyon_phase_transit',
    name: '快子超光速相位跃迁',
    icon: '⚡',
    desc: '注入暗物质微扰推进，瞬间撕裂引力透镜阻尼进入相位跳跃',
    color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
    efficiencyTag: '超光速相位 / 破引力屏障'
  }
]

const selectedManeuverId = ref('slingshot_periapsis')
const orbitalAltitudeKm = ref(3800)
const gravityWellIntensity = ref(2.8)
const slingshotBoostFactor = ref(2.4)
const relativisticDilationAngle = ref(28)

const tidalForceDamperActive = ref(true)
const eventHorizonEscapeAegis = ref(true)
const darkMatterThrusterBoost = ref(true)

const currentOrbitalManeuverObj = computed(() => {
  return orbitalManeuversList.find(m => m.id === selectedManeuverId.value) || orbitalManeuversList[0]
})

const calculatedOrbitalVelocity = computed(() => {
  let v = 11.2 * slingshotBoostFactor.value * Math.sqrt(gravityWellIntensity.value)
  if (darkMatterThrusterBoost.value) {
    v *= 1.4
  }
  return `${v.toFixed(1)} km/s`
})

const calculatedEscapeEnergyGJ = computed(() => {
  const energy = (gravityWellIntensity.value * 450 + orbitalAltitudeKm.value * 0.08) * slingshotBoostFactor.value
  return `${Math.round(energy).toLocaleString()} GJ`
})

const calculatedStructuralStress = computed(() => {
  let stress = gravityWellIntensity.value * 14
  if (tidalForceDamperActive.value) {
    stress -= 35
  }
  return `${Math.max(5, Math.round(stress))}%`
})

const calculatedTrajectorySafety = computed(() => {
  let safety = 78.0
  if (tidalForceDamperActive.value) safety += 15
  if (eventHorizonEscapeAegis.value) safety += 6.5
  return `${Math.min(99.9, safety).toFixed(1)}%`
})

function scrollToOrbitalWarpStudio() {
  const el = document.getElementById('orbital-warp-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// 五阶段推演终端
interface OrbitalTerminalLog {
  time: string
  message: string
  color: string
}

const isOrbitalSimulating = ref(false)
const orbitalSimStage = ref(0)
const orbitalSimFinished = ref(false)
const orbitalTerminalLogs = ref<OrbitalTerminalLog[]>([
  {
    time: 'INIT',
    message: '全域星海轨道跃迁与重力弹弓工坊就绪。准备解算轨道摄动方程。',
    color: 'text-gray-400'
  }
])

function appendOrbitalLog(msg: string, color = 'text-purple-400') {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
  orbitalTerminalLogs.value.push({ time: timeStr, message: msg, color })
}

function runOrbitalWarpSimulation() {
  if (isOrbitalSimulating.value) return
  isOrbitalSimulating.value = true
  orbitalSimFinished.value = false
  orbitalSimStage.value = 1
  appendOrbitalLog('▶ 启动五阶段星海轨道弹弓推演...', 'text-purple-400 font-bold')

  setTimeout(() => {
    orbitalSimStage.value = 2
    appendOrbitalLog(`[阶段 1/5] 载入机动【${currentOrbitalManeuverObj.value.name}】，近拱点高度: ${orbitalAltitudeKm.value.toLocaleString()} km，引力井常数: ${gravityWellIntensity.value.toFixed(1)} G`, 'text-cyan-300')

    setTimeout(() => {
      orbitalSimStage.value = 3
      appendOrbitalLog(`[阶段 2/5] 计算双曲进动弹道，相对论进动角: ${relativisticDilationAngle.value}°，逃逸动能: ${calculatedEscapeEnergyGJ.value}`, 'text-amber-300')

      setTimeout(() => {
        orbitalSimStage.value = 4
        const damperText = tidalForceDamperActive.value ? '已展开 (-35% 应变)' : '未启用'
        const aegisText = eventHorizonEscapeAegis.value ? '已锚定吸积盘外缘' : '常规能障'
        appendOrbitalLog(`[阶段 3/5] 潮汐阻尼器[${damperText}]，视界逃逸护盾[${aegisText}]`, 'text-purple-300')

        setTimeout(() => {
          orbitalSimStage.value = 5
          appendOrbitalLog(`[阶段 4/5] 弹弓末速度解算: ${calculatedOrbitalVelocity.value}，龙骨潮汐应变率: ${calculatedStructuralStress.value}`, 'text-emerald-300')

          setTimeout(() => {
            isOrbitalSimulating.value = false
            orbitalSimFinished.value = true
            appendOrbitalLog(`✓ [阶段 5/5] 星轨弹弓解算成功！安全度: ${calculatedTrajectorySafety.value}，生成离线航图证书`, 'text-emerald-400 font-bold')
            message.success('星海轨道弹弓五阶段推演完成！')
          }, 350)
        }, 350)
      }, 350)
    }, 350)
  }, 350)
}

function exportOrbitalWarpCertificate() {
  const certData = {
    standard: 'Godot 4.6 LTS / VBLE Orbital Warp Matrix v2.2.289',
    timestamp: new Date().toISOString(),
    maneuver: selectedManeuverId.value,
    parameters: {
      orbitalAltitudeKm: orbitalAltitudeKm.value,
      gravityWellIntensity: gravityWellIntensity.value,
      slingshotBoostFactor: slingshotBoostFactor.value,
      relativisticDilationAngle: relativisticDilationAngle.value,
      tidalForceDamperActive: tidalForceDamperActive.value,
      eventHorizonEscapeAegis: eventHorizonEscapeAegis.value,
      darkMatterThrusterBoost: darkMatterThrusterBoost.value
    },
    metrics: {
      orbitalVelocity: calculatedOrbitalVelocity.value,
      escapeEnergyGJ: calculatedEscapeEnergyGJ.value,
      structuralStress: calculatedStructuralStress.value,
      trajectorySafety: calculatedTrajectorySafety.value
    },
    sha256Signature: 'SHA256-ORBITAL-SLINGSHOT-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `orbital_slingshot_v2.2.289_${selectedManeuverId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出星轨重力弹弓方案证书！')
}

const godotOrbitalSlingshotCodeText = [
  '# ==============================================================================',
  '# OrbitalGravitySlingshotEngine - 星海轨道跃迁与引力弹弓导航解算器',
  '# 文件路径: res://scripts/vehicles/orbital_gravity_slingshot_engine.gd',
  '# 架构规范: Godot 4.6 LTS / VBLE Exploration Vehicles Matrix v2.2.289',
  '# 核心职责: 管理双曲轨道加速、黑洞潮汐力阻尼计算与相对论时空曲率偏折',
  '# ==============================================================================',
  'class_name OrbitalGravitySlingshotEngine',
  'extends RefCounted',
  '',
  'const BASE_ESCAPE_VELOCITY: float = 11.2 # km/s',
  '',
  'static func calculate_slingshot_velocity(gravity_g: float, boost_factor: float, has_dark_matter: bool) -> float:',
  '	var v: float = BASE_ESCAPE_VELOCITY * boost_factor * sqrt(gravity_g)',
  '	if has_dark_matter:',
  '		v *= 1.4',
  '	return v',
  '',
  'static func evaluate_hull_structural_stress(gravity_g: float, has_damper: bool) -> float:',
  '	var stress: float = gravity_g * 14.0',
  '	if has_damper:',
  '		stress -= 35.0',
  '	return clampf(stress, 5.0, 100.0)'
].join('\n')

const currentGodotCodeSnippet = computed(() => {
  if (activeCodeTab.value === 'nav') return godotCodeText
  if (activeCodeTab.value === 'breeding') return godotChocoboCodeText
  if (activeCodeTab.value === 'warp') return godotWarpNavigatorCodeText
  if (activeCodeTab.value === 'overdrive') return godotHyperOverdriveCodeText
  return godotOrbitalSlingshotCodeText
})

// ================= 🛸 工坊 5: 全地形神话载具、动力拓扑引擎与空天巡航工坊 (v2.2.307) =================
interface MythicVehicleArchetype {
  id: string
  name: string
  mode: string
  tag: string
  icon: string
  tagType: 'info' | 'warning' | 'error' | 'success'
  desc: string
  topSpeed: number
  enduranceKm: number
}

const mythicVehicleArchetypes: MythicVehicleArchetype[] = [
  {
    id: 'lunar_whale_stellar_cruiser',
    name: '月之巨鲸母舰',
    mode: '星海跨界 / 亚光速航行',
    tag: '红月穿梭',
    icon: '🐋',
    tagType: 'info',
    desc: '太古遗留的星际飞空巨舰，自带高维重力反斥系统，可直接突破世界卡门线往返于原初地心与红月。',
    topSpeed: 180000,
    enduranceKm: 3800000
  },
  {
    id: 'ragnarok_dreadnought_airship',
    name: '诸神黄昏空母',
    mode: '全域制空 / 磁轨重炮',
    tag: '魔导歼星',
    icon: '🛸',
    tagType: 'error',
    desc: '古代遗迹最终构装战舰，搭载双联以太裂变主炮与曲率反重力翼，可在全地形暴风雨与深空自由穿行。',
    topSpeed: 240000,
    enduranceKm: 5200000
  },
  {
    id: 'golden_chocobo_dimensional_runner',
    name: '太古黄金陆行鸟',
    mode: '全地形无视 / 浮空深海',
    tag: '次元灵骑',
    icon: '🐤',
    tagType: 'warning',
    desc: '九代培育纯血神鸟，能跨越高山、沼泽与外洋断层，甚至在时空裂隙中如履平地，绝对安全零遇敌。',
    topSpeed: 65000,
    enduranceKm: 850000
  },
  {
    id: 'nautilus_deep_abyss_submersible',
    name: '鹦鹉螺号深潜艇',
    mode: '深渊下潜 / 虚空暗涌',
    tag: '万米潜航',
    icon: '🚢',
    tagType: 'success',
    desc: '由席德精心改造的太古合金潜艇，能够承受万米海沟的致死水压，探测远古沉船与海底裂谷秘境。',
    topSpeed: 92000,
    enduranceKm: 1200000
  }
]

const selectedMythicVehicleArchetypeId = ref<string>('lunar_whale_stellar_cruiser')
const magneticConstraintRatio = ref<number>(75)
const warpBubbleExpansion = ref<number>(4.2)
const gravityDampingFactor = ref<number>(1.0)
const shieldRechargeRate = ref<number>(2400)

const antiGravityLensCruiseLock = ref<boolean>(true)
const darkMatterAdaptiveShield = ref<boolean>(true)
const tachyonVelocityCapBreaker = ref<boolean>(true)

const isSimulatingMythicCruise = ref<boolean>(false)
const mythicSimStep = ref<number>(5)
const mythicSimCurrentLog = ref<string>('全地形神话载具动力拓扑矩阵已就绪，等待调度指令。')

const currentMythicArchetype = computed(() => {
  return mythicVehicleArchetypes.find(a => a.id === selectedMythicVehicleArchetypeId.value) || mythicVehicleArchetypes[0]
})

const calculatedCruiseTopSpeed = computed(() => {
  const base = currentMythicArchetype.value.topSpeed
  const magBonus = 1 + (magneticConstraintRatio.value / 100) * 0.55
  const warpBonus = warpBubbleExpansion.value * 0.45
  const capMult = tachyonVelocityCapBreaker.value ? 1.85 : 1.0
  return Math.round(base * magBonus * warpBonus * capMult)
})

const calculatedInterplanetaryTransitHours = computed(() => {
  const distanceKm = 384400 // 地月平均距离
  const speed = calculatedCruiseTopSpeed.value
  const hours = distanceKm / speed
  return hours.toFixed(2)
})

const calculatedHullStructureHardness = computed(() => {
  const base = 85.0
  const shieldGain = (shieldRechargeRate.value / 5000) * 10.0
  const adaptiveGain = darkMatterAdaptiveShield.value ? 4.5 : 0
  return Math.min(99.9, base + shieldGain + adaptiveGain).toFixed(1)
})

const calculatedVehicleRankTier = computed(() => {
  const speed = calculatedCruiseTopSpeed.value
  if (speed > 1000000) return 'EX·太古星海造物主级母舰'
  if (speed > 500000) return 'SSS·跨维星舰歼霸级'
  if (speed > 250000) return 'SS·高维空天领航级'
  return 'S·大世界神话巡航级'
})

const scrollToMythicCruiseStudio = () => {
  const el = document.getElementById('mythic-cruise-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const resetMythicCruiseParameters = () => {
  selectedMythicVehicleArchetypeId.value = 'lunar_whale_stellar_cruiser'
  magneticConstraintRatio.value = 75
  warpBubbleExpansion.value = 4.2
  gravityDampingFactor.value = 1.0
  shieldRechargeRate.value = 2400
  antiGravityLensCruiseLock.value = true
  darkMatterAdaptiveShield.value = true
  tachyonVelocityCapBreaker.value = true
  message.info('已恢复神话载具工坊初始调控参数')
}

const runMythicCruiseSimulation = () => {
  if (isSimulatingMythicCruise.value) return
  isSimulatingMythicCruise.value = true
  mythicSimStep.value = 1
  mythicSimCurrentLog.value = '阶段 1/5: 扫描全地形神话载具动力骨架，初始化磁约束等离子喷口...'

  setTimeout(() => {
    mythicSimStep.value = 2
    mythicSimCurrentLog.value = '阶段 2/5: 注入高纯以太晶核燃料，展开 4.2x 亚光速曲率反重力力场...'
  }, 400)

  setTimeout(() => {
    mythicSimStep.value = 3
    mythicSimCurrentLog.value = '阶段 3/5: 加载暗物质自适应护盾，对齐深渊水压与外层空间极温...'
  }, 800)

  setTimeout(() => {
    mythicSimStep.value = 4
    mythicSimCurrentLog.value = '阶段 4/5: 激活超光速突破器，对齐 Godot 4.6 LTS 大世界物理流引擎...'
  }, 1200)

  setTimeout(() => {
    mythicSimStep.value = 5
    mythicSimCurrentLog.value = '阶段 5/5: 生成载具巡航方案证书，锁定实机运行时航行物理参数！'
    isSimulatingMythicCruise.value = false
    message.success('神话载具巡航动力推演完成！')
  }, 1600)
}

const exportMythicCruiseCertificate = () => {
  const arch = currentMythicArchetype.value
  const certContent = `================================================================================
  《光之战士：时空裂隙》全地形神话载具巡航与动力拓扑方案证书 (v2.2.307)
  生成时间: ${new Date().toISOString()}
  原型构架: ${arch.name} (${arch.mode})
  工程评阶: ${calculatedVehicleRankTier.value}
================================================================================
【调控参数】
- 推进磁场约束度: ${magneticConstraintRatio.value}%
- 曲率泡膨胀比率: ${warpBubbleExpansion.value.toFixed(1)}x
- 重力阻尼系数: ${gravityDampingFactor.value.toFixed(1)} G
- 护盾回充速率: ${shieldRechargeRate.value} kW
- 反重力巡航锁: ${antiGravityLensCruiseLock.value ? '已开启' : '关闭'}
- 暗物质自适应盾: ${darkMatterAdaptiveShield.value ? '已开启' : '关闭'}
- 999999 超速突破: ${tachyonVelocityCapBreaker.value ? '已开启' : '关闭'}

【实时解算能效】
- 巡航峰值时速: ${calculatedCruiseTopSpeed.value.toLocaleString()} km/h
- 行星穿梭耗时: ${calculatedInterplanetaryTransitHours.value} 小时
- 舰体抗压硬度: ${calculatedHullStructureHardness.value}%
- 认证安全指纹: SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now()}
================================================================================`

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mythic_vehicle_cruise_cert_v2.2.307_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Export certificate error:', e)
  }

  message.success('神话载具巡航方案证书已导出并同步至剪贴板！')
}

const activeMythicCodeTab = ref<'propulsion' | 'topology' | 'breaker'>('propulsion')

const gdMythicPropulsionCode = `## mythic_vehicle_propulsion_engine.gd
## Godot 4.6 LTS - 全地形神话载具动力推进与曲率展开引擎
extends RefCounted
class_name MythicVehiclePropulsionEngine

static func compute_cruise_velocity(
	base_velocity: float,
	magnetic_constraint_pct: float,
	warp_expansion: float,
	tachyon_breaker_active: bool
) -> Dictionary:
	var mag_factor: float = 1.0 + (magnetic_constraint_pct / 100.0) * 0.55
	var warp_factor: float = warp_expansion * 0.45
	var actual_speed: float = base_velocity * mag_factor * warp_factor
	
	if tachyon_breaker_active:
		actual_speed *= 1.85
		
	return {
		"top_speed_kmh": actual_speed,
		"is_faster_than_light": actual_speed > 1079252848.8,
		"thrust_efficiency_pct": clampf(magnetic_constraint_pct * 1.1, 10.0, 100.0)
	}
`

const gdPlanetaryTopologyCode = `## planetary_cruise_topology_navigator.gd
## Godot 4.6 LTS - 行星际多维拓扑航行与反重力导流机
extends RefCounted
class_name PlanetaryCruiseTopologyNavigator

static func calculate_transit_time(
	distance_km: float,
	cruise_speed_kmh: float,
	anti_gravity_active: bool
) -> float:
	var effective_speed: float = cruise_speed_kmh * (1.2 if anti_gravity_active else 1.0)
	if effective_speed <= 0.0:
		return 9999.0
	return distance_km / effective_speed
`

const gdTachyonBreakerCode = `## tachyon_velocity_cap_breaker.gd
## Godot 4.6 LTS - 999999 马赫超光速突破与相对论因果锁
extends RefCounted
class_name TachyonVelocityCapBreaker

const MAX_VELOCITY_CAP: float = 9999999.0

static func enforce_speed_barrier(raw_speed_kmh: float, cap_broken: bool) -> float:
	if not cap_broken:
		return minf(raw_speed_kmh, 999999.0)
	return minf(raw_speed_kmh, MAX_VELOCITY_CAP)
`

const currentMythicCruiseCode = computed(() => {
  if (activeMythicCodeTab.value === 'propulsion') return gdMythicPropulsionCode
  if (activeMythicCodeTab.value === 'topology') return gdPlanetaryTopologyCode
  return gdTachyonBreakerCode
})

const copyMythicCruiseCode = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(currentMythicCruiseCode.value).then(() => {
      message.success('Godot 4.6 LTS 载具动力源码已复制至剪贴板！')
    }).catch(() => {
      message.error('复制失败，请手动选取复制')
    })
  }
}

// ==========================================
// 全域海陆空载具矩阵、时空跃迁驱动与巡航导航工坊 (v2.2.327)
// ==========================================
const scrollToSpatiotemporalWarpStudio = () => {
  document.getElementById('spatiotemporal-warp-drive-studio')?.scrollIntoView({ behavior: 'smooth' })
}

const selectedWarpDriveArchetype = ref('aeronaut_dreadnought')
const warpDriveArchetypes = [
  {
    id: 'aeronaut_dreadnought',
    name: '太古魔导飞空艇·无畏号',
    icon: '🛸',
    typeTag: '空天曲速',
    tagClass: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    desc: '双曲速以太涡轮引擎，全地形无阻碍低空飞行与万米平流层巡航，配备全自动避障。',
    engineType: '双曲速以太等离子涡轮',
    cruiseDomain: '低空平原 ➔ 万米平流层'
  },
  {
    id: 'lunar_whale_ark',
    name: '星际月之巨鲸·终焉方舟',
    icon: '🐋',
    typeTag: '星轨引力泡',
    tagClass: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    desc: '突破行星卡门线直抵红月卫星轨道，暗物质引力泡曲率折跃引擎，时空抗性拉满。',
    engineType: '暗物质引力泡曲率驱动',
    cruiseDomain: '行星卡门线 ➔ 红月星轨'
  },
  {
    id: 'abyss_nautilus',
    name: '深渊重力潜艇·鹦鹉螺号',
    icon: '🚢',
    typeTag: '深渊流体',
    tagClass: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    desc: '耐受万米深渊强海压防护罩，洋流超导滑翔与声呐地形三维重建，潜入隐秘海底古遗迹。',
    engineType: '深海流体离子超导喷水',
    cruiseDomain: '浅海潮汐 ➔ 万米深渊海沟'
  },
  {
    id: 'swiftstride_chocobo',
    name: '黄羽陆行鸟·神速突击兽',
    icon: '🐤',
    typeTag: '全地形陆行',
    tagClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    desc: '陆地全地形飞跃山岳河流，100% 免受地面岩浆毒沼伤害，极限加速度瞬间突围。',
    engineType: '生物以太强效共鸣奔袭',
    cruiseDomain: '山地陡坡 / 河流密林 / 沼泽'
  }
]

const warpSpeedFactorMach = ref(18.5)
const aetherSuperchargeRatio = ref(88)
const inertialDampingRatio = ref(0.95)
const autoNavObstacleAvoidHz = ref(240)

const enableZeroEncounterStealthMode = ref(true)
const enableOmniTerrainSafeLanding = ref(true)
const enableSupersonicDampenerAura = ref(true)

const isWarpDriveSimulating = ref(false)
const warpDriveSimProgress = ref(0)
const warpDriveSimStep = ref('')
const warpDriveLogs = ref<string[]>([])

const transitReadyTimeSec = computed(() => {
  let sec = 4.2 - (warpSpeedFactorMach.value / 50.0) * 2.8 - (aetherSuperchargeRatio.value / 100) * 0.6
  return Math.max(0.8, parseFloat(sec.toFixed(1)))
})

const cruiseMaxVelocityKmh = computed(() => {
  let base = warpSpeedFactorMach.value * 1225.0 * (aetherSuperchargeRatio.value / 80.0)
  return Math.round(base)
})

const hullGForceStabilityPct = computed(() => {
  let pct = inertialDampingRatio.value * 98.0 + (autoNavObstacleAvoidHz.value / 500) * 1.9
  return Math.min(99.9, parseFloat(pct.toFixed(1)))
})

const warpDriveTierBadge = computed(() => {
  if (warpSpeedFactorMach.value > 35 && hullGForceStabilityPct.value > 98) return 'EX·超光速虚空折跃舰长'
  if (warpSpeedFactorMach.value > 20) return 'SSS·深空全地形动力大师'
  if (warpSpeedFactorMach.value > 10) return 'SS·高音速星舰巡航指挥官'
  return 'S·标准海陆空航海家'
})

const selectWarpDriveArchetype = (id: string) => {
  selectedWarpDriveArchetype.value = id
  const target = warpDriveArchetypes.find(a => a.id === id)
  if (target) {
    message.info(`已切入载具航行模式：${target.name}（${target.typeTag}）`)
  }
}

const resetWarpDriveDefaults = () => {
  warpSpeedFactorMach.value = 18.5
  aetherSuperchargeRatio.value = 88
  inertialDampingRatio.value = 0.95
  autoNavObstacleAvoidHz.value = 240
  enableZeroEncounterStealthMode.value = true
  enableOmniTerrainSafeLanding.value = true
  enableSupersonicDampenerAura.value = true
  message.success('已恢复载具折跃与巡航基准动力参数！')
}

const runSpatiotemporalWarpSimulation = () => {
  if (isWarpDriveSimulating.value) return
  isWarpDriveSimulating.value = true
  warpDriveSimProgress.value = 0
  warpDriveLogs.value = []

  const steps = [
    { p: 20, step: '启动双曲速以太等离子涡轮并对齐磁喷嘴约束...', log: '等离子点火成功，充能比达成 ' + aetherSuperchargeRatio.value + '%，输出功率满额。' },
    { p: 45, step: '展开 0.95 惯性阻尼重力泡防护罩...', log: '重力场平稳包裹舰体，抗震稳态率达到 ' + hullGForceStabilityPct.value + '%。' },
    { p: 70, step: '激活 240Hz 激光避障雷达与洋流微秒地形重构...', log: '全息航线规划完毕，完美规避山岳与虚空乱流裂隙。' },
    { p: 90, step: '开启零遇敌隐形遁入暗能量伪装力场...', log: '野怪雷达归零，安全降落锚点全域解锁，音爆舒适光环广播。' },
    { p: 100, step: '载具折跃沙盘推演收敛，星舰适航认证签发！', log: `就绪耗时: ${transitReadyTimeSec.value}s，极速: ${cruiseMaxVelocityKmh.value.toLocaleString()} km/h，认证: ${warpDriveTierBadge.value}。` }
  ]

  let idx = 0
  const interval = setInterval(() => {
    if (idx < steps.length) {
      warpDriveSimProgress.value = steps[idx].p
      warpDriveSimStep.value = steps[idx].step
      warpDriveLogs.value.push(steps[idx].log)
      idx++
    } else {
      clearInterval(interval)
      isWarpDriveSimulating.value = false
      message.success('载具时空跃迁驱动沙盘推演圆满完成！')
    }
  }, 250)
}

const exportWarpDriveCert = () => {
  const cert = {
    standard: 'GODOT-4.6-LTS-VEHICLE-WARP-DRIVE-SPEC',
    version: 'v2.2.327',
    timestamp: new Date().toISOString(),
    archetype: selectedWarpDriveArchetype.value,
    mach_speed: warpSpeedFactorMach.value,
    supercharge_ratio: aetherSuperchargeRatio.value,
    damping_ratio: inertialDampingRatio.value,
    nav_hz: autoNavObstacleAvoidHz.value,
    stealth_mode: enableZeroEncounterStealthMode.value,
    omni_landing: enableOmniTerrainSafeLanding.value,
    supersonic_aura: enableSupersonicDampenerAura.value,
    transit_ready_sec: transitReadyTimeSec.value,
    velocity_kmh: cruiseMaxVelocityKmh.value,
    stability_pct: hullGForceStabilityPct.value,
    tier: warpDriveTierBadge.value,
    cert_sha256: '5c6d7e8f9a0b12345678abcdef9012345678abcdef9012345678abcdef327a'
  }
  const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `vehicle_warp_drive_cert_${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('已导出载具时空跃迁方案认证证书！')
}

const activeWarpDriveScriptTab = ref<'drive_core' | 'damping' | 'stealth_nav'>('drive_core')

const warpDriveScriptCodes = {
  drive_core: `class_name SpatiotemporalWarpDriveCore
extends Node3D

## 最终幻想：时空之轮 - 时空曲率跃迁驱动核心与超光速引擎
## 文件路径: res://scripts/vehicles/spatiotemporal_warp_drive_core.gd
## 引擎版本: Godot Engine 4.6 LTS

signal warp_jump_initiated(mach_speed: float, target_vector: Vector3)

@export var max_mach: float = 18.5
var _is_jumping: bool = false

func engage_warp_jump(destination: Vector3) -> Dictionary:
    _is_jumping = true
    var speed_kmh: float = max_mach * 1225.0
    warp_jump_initiated.emit(max_mach, destination)
    return {
        "jump_speed_kmh": speed_kmh,
        "status": "WARP_SPACE_ENTERED"
    }
`,

  damping: `class_name InertialDampingFieldController
extends RefCounted

## 最终幻想：时空之轮 - 惯性阻尼重力泡与过载吸收器
## 文件路径: res://scripts/vehicles/inertial_damping_field_controller.gd
## 引擎版本: Godot Engine 4.6 LTS

static func evaluate_g_force_mitigation(raw_g: float, damping_factor: float) -> Dictionary:
    var felt_g: float = raw_g * (1.0 - damping_factor)
    return {
        "raw_g_force": raw_g,
        "felt_g_force": felt_g,
        "is_safe_for_crew": felt_g < 2.5
    }
`,

  stealth_nav: `class_name OmniTerrainStealthNavigator
extends RefCounted

## 最终幻想：时空之轮 - 全地形隐形避障与安全着陆导航器
## 文件路径: res://scripts/vehicles/omni_terrain_stealth_navigator.gd
## 引擎版本: Godot Engine 4.6 LTS

static func calculate_safe_landing(terrain_type: String, omni_landing_enabled: bool) -> bool:
    if omni_landing_enabled:
        return true
    return terrain_type in ["GRASS", "PLAINS", "BEACH"]
`
}

const currentWarpDriveScriptCode = computed(() => {
  return warpDriveScriptCodes[activeWarpDriveScriptTab.value]
})

const copyWarpDriveScript = () => {
  navigator.clipboard.writeText(currentWarpDriveScriptCode.value)
  message.success('已复制 Godot 4.6 LTS 载具折跃驱动源码到剪贴板！')
}

</script>

<style scoped>
.text-glow-amber {
  text-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
</style>
