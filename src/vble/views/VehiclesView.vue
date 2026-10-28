<template>
  <div class="vehicles-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-blue-950/80 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.15)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              MATRIX EXPLORATION VEHICLES
            </span>
            <span class="text-xs text-gray-400">大世界航行与次元动力</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🛸</span> 多维载具矩阵与大世界探索法则
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
            @click="scrollToStudio"
          >
            <template #icon><span>🚀</span></template>
            前往动力巡航沙盘
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
            <span class="text-amber-400">VBLE Navigation Engine v2.2.208</span>
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

    <!-- Godot 4.x 核心实机代码展台 -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-amber-300">vehicle_navigation_system.gd (Godot 4.x 实机引擎算法)</span>
        </div>
        <n-button size="tiny" secondary type="warning" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900">{{ godotCodeText }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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

const copyGodotCode = async () => {
  try {
    await navigator.clipboard.writeText(godotCodeText)
    copiedCode.value = true
    message.success('已复制 vehicle_navigation_system.gd 核心实机代码！')
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

onUnmounted(() => {
  if (cruiseTimer) {
    clearInterval(cruiseTimer)
    cruiseTimer = null
  }
})
</script>

<style scoped>
.text-glow-amber {
  text-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
</style>
