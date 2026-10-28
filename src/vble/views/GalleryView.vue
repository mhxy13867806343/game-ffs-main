<template>
  <div class="gallery-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-blue-950/80 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              VISUAL SHOWCASE & ASSET GALLERY
            </span>
            <span class="text-xs text-gray-400">大世界实机、UI架构与魔导粒子</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🎨</span> 实机画廊与魔导视觉粒子沙盘工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            精选回合制 ATB 战斗全景、地貌航图、城邦商会、队伍整备与虚空空间扭曲等高清视觉资产。全息实装魔导粒子着色器动态调优沙盘。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>✨</span></template>
            前往粒子着色器沙盘
          </n-button>
          <router-link to="/vble/news">
            <n-button size="medium" round tertiary>
              查看开发日志
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 核心统计概览卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">精选视觉资产</div>
        <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ galleryData.length }} 幅</div>
        <div class="text-[10px] text-gray-500 mt-0.5">战斗 / 地貌 / UI / 特效</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">魔导特效管线</div>
        <div class="text-2xl font-black text-amber-400 font-mono mt-1">5 大类型</div>
        <div class="text-[10px] text-gray-500 mt-0.5">雷光 / 虚空 / 极光 / 烈焰 / 圣愈</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">目标渲染性能</div>
        <div class="text-2xl font-black text-emerald-400 font-mono mt-1">60 ~ 120 FPS</div>
        <div class="text-[10px] text-gray-500 mt-0.5">Forward+ / Mobile 动态适配</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
        <div class="text-xs text-gray-400">着色器控制核心</div>
        <div class="text-2xl font-black text-purple-400 font-mono mt-1">Godot 4.x</div>
        <div class="text-[10px] text-gray-500 mt-0.5">vfx_controller.gd</div>
      </div>
    </div>

    <!-- 分类筛选器 -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap gap-2 items-center justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
          :class="selectedCategory === cat.id ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-gray-300 hover:text-white'"
          @click="selectedCategory = cat.id"
        >
          {{ cat.name }}
        </button>
      </div>

      <div class="text-xs text-gray-400">
        共匹配到 <strong class="text-cyan-400 font-mono">{{ filteredGallery.length }}</strong> 处视觉切片
      </div>
    </div>

    <!-- 画廊网格卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in filteredGallery"
        :key="item.id"
        class="group rounded-xl bg-[#0e1322]/90 border border-slate-800 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col justify-between overflow-hidden"
      >
        <div>
          <!-- 封面容器 -->
          <div class="relative h-48 bg-slate-950 overflow-hidden flex items-center justify-center">
            <img
              :src="item.src"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
            <div class="absolute bottom-2 left-3 right-3 flex items-center justify-between">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {{ item.categoryName }}
              </span>
              <span class="text-[10px] text-gray-400 font-mono">ID: {{ item.id }}</span>
            </div>
          </div>

          <!-- 内容信息 -->
          <div class="p-4 space-y-2">
            <h3 class="text-sm font-bold text-gray-100 group-hover:text-cyan-300 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-xs text-gray-400 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>

        <div class="p-4 pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-[11px] text-gray-500">渲染通道: Forward+</span>
          <n-button size="tiny" secondary type="info" @click="openModal(item)">
            🔍 放大检视
          </n-button>
        </div>
      </div>
    </div>

    <!-- 核心实机推演沙盘：魔导粒子着色器与光影动态调优工坊 -->
    <div id="vfx-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1322] via-[#10192e] to-[#0a0f1b] border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.18)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              VFX SHADER STUDIO
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>✨</span> 魔导粒子着色器与光影动态调优沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            动态对齐 Godot 引擎 vfx_particle_controller.gd：推演粒子发射密度、HDR 辉光 Bloom、空间折射率与显卡渲染帧率负载。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickVFX">
            ⚡ 激发粒子脉冲
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：粒子特效管线与密度 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>🔮</span> 特效管线配置 (VFX Pipeline)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选定魔导特效管线 (Active Effect)</label>
              <n-select
                v-model:value="selectedVfxPipeline"
                :options="vfxPipelineOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>每秒粒子发射密度 (Particles / sec):</span>
                <span class="font-mono text-cyan-400 font-bold text-sm">{{ particleDensity }} 个</span>
              </div>
              <n-slider v-model:value="particleDensity" :min="100" :max="3000" :step="100" />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>HDR 辉光绽放倍率 (Bloom Intensity):</span>
                <span class="font-mono text-amber-400 font-bold">{{ bloomIntensity.toFixed(1) }}x</span>
              </div>
              <n-slider v-model:value="bloomIntensity" :min="0.5" :max="3.0" :step="0.1" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【空间扭曲折射 (Screen Refraction)】:</span>
                <n-switch v-model:value="enableRefraction" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【GPU 批处理粒子合并 (Batching)】:</span>
                <n-switch v-model:value="enableGpuBatching" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：运行硬件与渲染环境 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-amber-300 flex items-center gap-2">
            <span>🖥️</span> 目标运行终端 (Target Platform)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">目标硬件与渲染后端 (Hardware Backend)</label>
              <n-select
                v-model:value="targetHardware"
                :options="hardwareOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>动态分辨率缩放 (FSR / TSR):</span>
                <span class="font-mono text-cyan-400 font-bold">{{ dynamicResolution }}%</span>
              </div>
              <n-slider v-model:value="dynamicResolution" :min="50" :max="100" :step="5" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【半精度浮点计算 (FP16 Mode)】:</span>
                <n-switch v-model:value="enableFP16" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">允许【动态光影投射到地表 Tilemap】:</span>
                <n-switch v-model:value="enableTileLighting" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息性能推演面板 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-cyan-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 实时渲染性能推演</span>
              <n-tag size="tiny" :type="vfxPerfResult.fpsTagType">
                {{ vfxPerfResult.statusText }}
              </n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 预估帧率 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">实时预估渲染帧率 (Estimated FPS)</div>
                <div class="text-3xl font-black font-mono mt-1 tracking-wider" :class="vfxPerfResult.fpsColor">
                  {{ vfxPerfResult.fps }} FPS
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  {{ vfxPerfResult.fpsSummary }}
                </div>
              </div>

              <!-- 显存与 Draw Call 指标 -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">显存瞬时占用</div>
                  <div class="font-mono font-bold text-amber-300 mt-0.5 text-sm">
                    {{ vfxPerfResult.vramUsage }} MB
                  </div>
                </div>
                <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
                  <div class="text-gray-400 text-[11px]">Draw Calls 批次</div>
                  <div class="font-mono font-bold text-cyan-300 mt-0.5 text-sm">
                    {{ vfxPerfResult.drawCalls }} 次
                  </div>
                </div>
              </div>

              <!-- 调优机制判定 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-cyan-400 font-bold flex items-center gap-1">
                  <span>✨ 优化器判定:</span>
                  <span>{{ vfxPerfResult.optimizationTitle }}</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ vfxPerfResult.optimizationDesc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>引擎算法: vfx_particle_controller.gd</span>
            <span class="text-cyan-400">VBLE Render Engine v2.2.212</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 三大渲染管线架构对比图谱 (3-Tier Pipeline Matrix) -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-xl">📐</span>
        <h3 class="text-lg font-bold text-white">三大渲染管线架构对比图谱 (Rendering Pipeline Matrix)</h3>
      </div>
      <p class="text-xs text-gray-400">
        《光之战士：时空裂隙》基于 Godot 4.x 现代渲染架构，自适应切换 Forward+、Mobile 与 Compatibility 管线。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div
          v-for="p in pipelineMatrix"
          :key="p.name"
          class="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 hover:border-cyan-500/40 transition-all"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
              <span>{{ p.icon }}</span>
              <span>{{ p.name }}</span>
            </span>
            <n-tag size="tiny" type="info">{{ p.target }}</n-tag>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">{{ p.desc }}</p>
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] text-gray-400">
            <span class="text-gray-300 font-semibold">关键特性:</span> {{ p.features }}
          </div>
        </div>
      </div>
    </div>

    <!-- 📺 复古像素 CRT 显像管与色差滤镜仿真实验室 (Retro Pixel CRT Shader Studio) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0a0f1d] via-[#10172c] to-[#0a0f1d] border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.15)] space-y-6 relative overflow-hidden">
      <!-- 顶部标题与介绍 -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              RETRO CRT SHADER LAB
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📺</span> 复古像素 CRT 显像管与色差滤镜仿真实验室
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            动态模拟 90 年代特丽珑 PVM 显像管扫描线 (Scanlines)、RGB 棱镜色差分离、球面失真与荧光粉余辉，一键唤醒纯正黄金复古视效。
          </p>
        </div>

        <!-- 4 大经典滤镜预设快捷胶囊 -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="preset in crtPresets"
            :key="preset.id"
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer select-none flex items-center gap-1.5"
            :class="selectedCrtPresetId === preset.id
              ? 'bg-amber-600 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50'
              : 'bg-slate-900 text-gray-300 border-slate-700 hover:bg-slate-800 hover:text-white'"
            @click="applyCrtPreset(preset.id)"
          >
            <span>{{ preset.icon }}</span>
            <span>{{ preset.name }}</span>
          </button>
        </div>
      </div>

      <!-- 实机 CRT 显像管视窗与右侧着色器调参面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：CRT 物理机壳与即时渲染视口 -->
        <div class="lg:col-span-7 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner">
          <!-- 经典 CRT 电视外壳框体 -->
          <div class="w-full max-w-lg p-3 sm:p-5 rounded-3xl bg-gradient-to-b from-stone-800 via-stone-900 to-stone-950 border-4 border-stone-700 shadow-2xl relative">
            <!-- 顶部散热孔装饰与复古标识 -->
            <div class="flex items-center justify-between px-2 pb-2 text-[10px] text-stone-400 font-mono">
              <span class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>PVM-1992 TRINITRON</span>
              </span>
              <span>RGB 15kHz RGB/NTSC</span>
            </div>

            <!-- CRT 屏幕区域 (带动态滤镜和扫描线覆盖) -->
            <div
              class="relative aspect-video rounded-2xl overflow-hidden bg-black border-2 border-stone-800 flex items-center justify-center transition-all duration-300"
              :style="crtScreenStyle"
            >
              <!-- 真实游戏画面底图 -->
              <img
                :src="selectedCrtSampleImage"
                alt="CRT Preview Image"
                class="w-full h-full object-cover select-none pointer-events-none transition-all duration-300"
                :style="crtImageStyle"
              />

              <!-- 动态扫描线遮罩 (Scanline Layer) -->
              <div
                v-if="crtScanlineOpacity > 0"
                class="absolute inset-0 pointer-events-none"
                :style="scanlineOverlayStyle"
              ></div>

              <!-- 暗角与玻璃曲面反光遮罩 (Vignette & Glass Glare) -->
              <div
                class="absolute inset-0 pointer-events-none"
                :style="vignetteOverlayStyle"
              ></div>
            </div>

            <!-- 底部机身控制旋钮与开关 -->
            <div class="flex items-center justify-between pt-3 px-3">
              <div class="flex items-center gap-2">
                <span class="text-[10px] text-stone-400">样张切换:</span>
                <button
                  v-for="(_img, idx) in crtSampleImages"
                  :key="idx"
                  type="button"
                  class="px-2 py-0.5 rounded text-[10px] border cursor-pointer"
                  :class="selectedCrtSampleIndex === idx ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'bg-stone-800 text-stone-300 border-stone-700'"
                  @click="selectedCrtSampleIndex = idx"
                >
                  图 {{ idx + 1 }}
                </button>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 rounded-full bg-stone-700 border border-stone-600 shadow-inner"></span>
                <span class="w-3 h-3 rounded-full bg-stone-700 border border-stone-600 shadow-inner"></span>
                <span class="w-4 h-4 rounded-full bg-red-600/80 border border-red-500 shadow-sm cursor-pointer" title="电源指示灯"></span>
              </div>
            </div>
          </div>
          <div class="text-[11px] text-gray-500 mt-2 text-center">
            💡 提示：左侧为 WebGL/CSS 着色器实时渲染显像；可拖拽右侧滑块自定义你的专属复古视效！
          </div>
        </div>

        <!-- 右侧：着色器参数无极微调滑块 -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div class="text-xs font-bold text-amber-300 flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="flex items-center gap-1.5">
              <span>🎛️</span> 显像管着色器参数调优 (Shader Uniforms)
            </span>
            <button
              type="button"
              class="text-[10px] text-gray-400 hover:text-amber-300 cursor-pointer"
              @click="resetCrtParams"
            >
              重置参数
            </button>
          </div>

          <!-- 扫描线浓度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>扫描线浓度 (Scanlines Intensity):</span>
              <span class="font-mono text-amber-400 font-bold">{{ Math.round(crtScanlineOpacity * 100) }}%</span>
            </div>
            <n-slider v-model:value="crtScanlineOpacity" :min="0" :max="1" :step="0.05" />
          </div>

          <!-- 棱镜色差分离 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>RGB 棱镜色差分离 (Chromatic Aberration):</span>
              <span class="font-mono text-cyan-400 font-bold">{{ crtAberration }} px</span>
            </div>
            <n-slider v-model:value="crtAberration" :min="0" :max="12" :step="1" />
          </div>

          <!-- 显像管暗角深度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>边缘暗角深度 (Vignette Darkness):</span>
              <span class="font-mono text-purple-400 font-bold">{{ Math.round(crtVignette * 100) }}%</span>
            </div>
            <n-slider v-model:value="crtVignette" :min="0" :max="1" :step="0.05" />
          </div>

          <!-- 荧光粉泛光辉光 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>荧光粉泛光辉光 (Phosphor Glow Bloom):</span>
              <span class="font-mono text-emerald-400 font-bold">{{ crtGlow.toFixed(1) }}x</span>
            </div>
            <n-slider v-model:value="crtGlow" :min="0.8" :max="2.0" :step="0.1" />
          </div>

          <!-- 显像管曲面变形开关 -->
          <div class="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【球面桶形几何失真 (Barrel Distortion)】:</span>
              <n-switch v-model:value="crtCurvature" size="small" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【复古怀旧色调滤镜 (Sepia/Tint)】:</span>
              <n-switch v-model:value="crtVintageTint" size="small" />
            </div>
          </div>

          <!-- Godot 4.6 LTS 着色器导出提示 -->
          <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-gray-400 space-y-1">
            <div class="text-amber-300 font-bold">🛠️ Godot 4.6 源码着色器对齐：</div>
            <p class="text-[10px] text-gray-400 leading-relaxed">
              底层着色器 <code>crt_retro_shader.gdshader</code> 采用后处理 <code>SCREEN_TEXTURE</code> 采样，极低算力开销（仅 0.15ms / 1080p），全平台 120 FPS 丝滑运行。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-cyan-300">vfx_particle_controller.gd (Godot 4.x 粒子池化与着色器控制)</span>
        </div>
        <n-button size="tiny" secondary type="info" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900">{{ godotCodeText }}</pre>
    </div>

    <!-- 弹窗大图检视 Modal -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      :title="activeModalItem?.title || '视觉资产大图检视'"
      style="max-width: 800px; background-color: #0b101d;"
    >
      <div class="space-y-4">
        <div class="h-96 bg-black rounded-lg overflow-hidden flex items-center justify-center">
          <img
            v-if="activeModalItem"
            :src="activeModalItem.src"
            :alt="activeModalItem.title"
            class="max-h-full max-w-full object-contain"
          />
        </div>
        <div class="text-xs text-gray-300 leading-relaxed">
          {{ activeModalItem?.desc }}
        </div>
        <div class="flex justify-between items-center text-[11px] text-gray-400 border-t border-slate-800 pt-3">
          <span>所属类别: {{ activeModalItem?.categoryName }}</span>
          <span>高清原画资产规格: 1920x1080 32-bit</span>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import { galleryList, type GalleryItem } from '../config/galleryConfig'

const message = useMessage()

const selectedCategory = ref('all')
const selectedVfxPipeline = ref('lightning_arc')
const particleDensity = ref(1200)
const bloomIntensity = ref(1.6)
const enableRefraction = ref(true)
const enableGpuBatching = ref(true)
const targetHardware = ref('desktop_high')
const dynamicResolution = ref(100)
const enableFP16 = ref(true)
const enableTileLighting = ref(true)

const showModal = ref(false)
const activeModalItem = ref<GalleryItem | null>(null)
const copiedCode = ref(false)

const galleryData = computed(() => galleryList)

const categories = [
  { id: 'all', name: '全部视觉资产' },
  { id: 'battle', name: '战斗场景实机' },
  { id: 'map', name: '大地图与地貌' },
  { id: 'ui', name: '界面UI与商店' },
  { id: 'vfx', name: '粒子与法术特效' }
]

const vfxPipelineOptions = [
  { label: '魔导电弧脉冲 (Lightning Arc Burst)', value: 'lightning_arc' },
  { label: '虚空引力坍缩黑洞 (Void Gravitational Singularity)', value: 'void_singularity' },
  { label: '钻石星尘绝对零度极光 (Diamond Dust Aurora)', value: 'diamond_dust' },
  { label: '业火战神焚世流星 (Hellfire Meteorite)', value: 'hellfire_meteor' },
  { label: '治愈圣水金辉水华 (Holy Water Bloom)', value: 'holy_bloom' }
]

const hardwareOptions = [
  { label: '桌面高性能 PC (RTX 40 / Radeon RX / M系列 Mac)', value: 'desktop_high' },
  { label: '轻薄本与掌机 (Steam Deck / Switch / 整合显卡)', value: 'handheld_deck' },
  { label: '移动端原生 (iOS / iPadOS / Android 旗舰)', value: 'mobile_flagship' },
  { label: 'Web 浏览器沙盒 (WebGL 2.0 / WebGPU)', value: 'web_browser' }
]

const filteredGallery = computed(() => {
  if (selectedCategory.value === 'all') return galleryData.value
  return galleryData.value.filter(g => g.category === selectedCategory.value)
})

const scrollToStudio = () => {
  const el = document.getElementById('vfx-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const openModal = (item: GalleryItem) => {
  activeModalItem.value = item
  showModal.value = true
}

const resetStudioParams = () => {
  selectedVfxPipeline.value = 'lightning_arc'
  particleDensity.value = 1200
  bloomIntensity.value = 1.6
  enableRefraction.value = true
  enableGpuBatching.value = true
  targetHardware.value = 'desktop_high'
  dynamicResolution.value = 100
  enableFP16.value = true
  enableTileLighting.value = true
  message.info('粒子着色器沙盘参数已恢复默认')
}

const triggerOneClickVFX = () => {
  message.success(`⚡ 粒子脉冲激发成功！当前发射密度 ${particleDensity.value}/s，预估流畅运行于 ${vfxPerfResult.value.fps} FPS`)
}

// 渲染性能推演算法
const vfxPerfResult = computed(() => {
  let baseFps = 120
  let baseVram = 180
  let baseDrawCalls = 25

  if (targetHardware.value === 'handheld_deck') baseFps = 60
  else if (targetHardware.value === 'mobile_flagship') baseFps = 60
  else if (targetHardware.value === 'web_browser') baseFps = 60

  // 粒子密度扣减
  const densityFactor = particleDensity.value / 1000
  baseFps -= Math.round(densityFactor * 8)
  baseVram += Math.round(densityFactor * 45)
  baseDrawCalls += Math.round(densityFactor * 12)

  // 辉光与折射
  if (bloomIntensity.value > 2.0) baseFps -= 5
  if (enableRefraction.value) {
    baseFps -= 4
    baseVram += 20
  }
  if (!enableGpuBatching.value) {
    baseDrawCalls *= 3
    baseFps -= 15
  }

  // 优化加成
  if (enableFP16.value) baseFps += 6
  if (dynamicResolution.value < 100) {
    baseFps += Math.round((100 - dynamicResolution.value) * 0.4)
  }

  let finalFps = Math.min(144, Math.max(24, baseFps))
  let fpsColor = 'text-emerald-400'
  let fpsTagType: 'default' | 'info' | 'warning' | 'error' | 'success' = 'success'
  let statusText = '流畅丝滑 (Optimal)'
  let fpsSummary = '渲染管线完全满足垂直同步，无掉帧抖动'

  if (finalFps < 45) {
    fpsColor = 'text-rose-500'
    fpsTagType = 'error'
    statusText = '显存负载高 (Warning)'
    fpsSummary = '粒子密度过大或折射计算过度，建议调低 Bloom'
  } else if (finalFps < 60) {
    fpsColor = 'text-amber-400'
    fpsTagType = 'warning'
    statusText = '临界可玩 (Sub-60)'
    fpsSummary = '存在微量卡顿，开启 FSR 动态分辨率可恢复 60 FPS'
  }

  let optimizationTitle = 'GPU 批处理已激活'
  let optimizationDesc = '粒子材质相同已自动合批为一个 Draw Call，极大释放 CPU 提交管线压力。'

  return {
    fps: finalFps,
    fpsColor,
    fpsTagType,
    statusText,
    fpsSummary,
    vramUsage: baseVram,
    drawCalls: baseDrawCalls,
    optimizationTitle,
    optimizationDesc
  }
})

// 渲染管线对比矩阵
const pipelineMatrix = [
  {
    name: 'Forward+ (Clustered)',
    icon: '🖥️',
    target: '桌面 PC / Mac',
    desc: '基于视锥体分簇的分级光照渲染，支持数百个动态粒子光源同时投射到瓦片地表。',
    features: 'SDF 全局光照、HDR 线性辉光、空间折射扭曲'
  },
  {
    name: 'Mobile (Vulkan / Metal)',
    icon: '📱',
    target: '掌机 / 旗舰手机',
    desc: '针对移动端瓦片渲染 (Tile-based) 特别优化，带宽压缩与阴影贴图极速解算。',
    features: 'ASTC 贴图压缩、动态分辨率调节、FP16 半精度加速'
  },
  {
    name: 'Compatibility (OpenGL 3)',
    icon: '🌐',
    target: 'Web 端 / 老旧设备',
    desc: '面向 WebGL 2.0 与旧版图形驱动的最大兼容层，保证在任何低配环境下流畅运行。',
    features: '基础双线性过滤、传统粒子精灵图、零显存泄漏保护'
  }
]

// Godot 核心代码
const godotCodeText = `## vfx_particle_controller.gd
## 《光之战士：时空裂隙》魔导粒子池化与动态着色器控制器
extends Node2D
class_name VfxParticleController

@export var max_particles: int = 2000
@export var bloom_intensity: float = 1.6
@export var enable_refraction: bool = true

var _particle_pool: Array[GPUParticles2D] = []

func emit_vfx_burst(vfx_type: String, world_pos: Vector2, custom_color: Color) -> void:
	var emitter = _get_available_emitter()
	if emitter == null:
		return
	
	emitter.global_position = world_pos
	var mat = emitter.process_material as ParticleProcessMaterial
	if mat:
		mat.color = custom_color
		mat.emission_shape = ParticleProcessMaterial.EMISSION_SHAPE_SPHERE
		mat.emission_sphere_radius = 16.0
	
	# 设置 HDR 辉光能量
	emitter.modulate = custom_color * bloom_intensity
	emitter.restart()
	emitter.emitting = true

func _get_available_emitter() -> GPUParticles2D:
	for p in _particle_pool:
		if not p.emitting:
			return p
	return null
`

const copyGodotCode = async () => {
  try {
    await navigator.clipboard.writeText(godotCodeText)
    copiedCode.value = true
    message.success('已复制 vfx_particle_controller.gd 核心实机代码！')
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}

// ==========================================
// 📺 复古像素 CRT 显像管与色差滤镜仿真实验室
// ==========================================
interface CrtPreset {
  id: string
  name: string
  icon: string
  scanline: number
  aberration: number
  vignette: number
  glow: number
  curvature: boolean
  tint: boolean
}

const crtPresets: CrtPreset[] = [
  { id: 'pvm', name: '索尼特丽珑 (Sony PVM)', icon: '📺', scanline: 0.35, aberration: 2, vignette: 0.3, glow: 1.2, curvature: true, tint: false },
  { id: 'arcade', name: '街机大屁股台 (Arcade CRT)', icon: '🕹️', scanline: 0.65, aberration: 5, vignette: 0.5, glow: 1.5, curvature: true, tint: false },
  { id: 'gameboy', name: '复古液晶掌机 (Game Boy DMG)', icon: '📟', scanline: 0.2, aberration: 0, vignette: 0.15, glow: 1.0, curvature: false, tint: true },
  { id: 'modern_raw', name: '4K 原画纯净 (Raw Modern)', icon: '🖥️', scanline: 0.0, aberration: 0, vignette: 0.0, glow: 1.0, curvature: false, tint: false }
]

const selectedCrtPresetId = ref('pvm')
const crtScanlineOpacity = ref(0.35)
const crtAberration = ref(2)
const crtVignette = ref(0.3)
const crtGlow = ref(1.2)
const crtCurvature = ref(true)
const crtVintageTint = ref(false)

const selectedCrtSampleIndex = ref(0)
const crtSampleImages = computed(() => {
  if (galleryData.value && galleryData.value.length >= 3) {
    return galleryData.value.slice(0, 3).map(g => g.src)
  }
  return [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
  ]
})

const selectedCrtSampleImage = computed(() => {
  return crtSampleImages.value[selectedCrtSampleIndex.value] || crtSampleImages.value[0]
})

const applyCrtPreset = (presetId: string) => {
  selectedCrtPresetId.value = presetId
  const preset = crtPresets.find(p => p.id === presetId)
  if (preset) {
    crtScanlineOpacity.value = preset.scanline
    crtAberration.value = preset.aberration
    crtVignette.value = preset.vignette
    crtGlow.value = preset.glow
    crtCurvature.value = preset.curvature
    crtVintageTint.value = preset.tint
    message.info(`已应用【${preset.name}】复古着色器滤镜预设`)
  }
}

const resetCrtParams = () => {
  applyCrtPreset('pvm')
}

const crtScreenStyle = computed(() => {
  return {
    borderRadius: crtCurvature.value ? '20px' : '4px',
    boxShadow: crtCurvature.value ? 'inset 0 0 50px rgba(0,0,0,0.9), 0 0 30px rgba(245,158,11,0.1)' : 'none'
  }
})

const crtImageStyle = computed(() => {
  const filters: string[] = []
  if (crtAberration.value > 0) {
    filters.push(`drop-shadow(${crtAberration.value}px 0 0 rgba(255, 30, 80, 0.5))`)
    filters.push(`drop-shadow(-${crtAberration.value}px 0 0 rgba(30, 220, 255, 0.5))`)
  }
  if (crtGlow.value !== 1.0) {
    filters.push(`brightness(${crtGlow.value})`)
    filters.push('contrast(1.12)')
  }
  if (crtVintageTint.value) {
    filters.push('sepia(0.7) hue-rotate(55deg) saturate(1.5)')
  }
  return {
    filter: filters.length > 0 ? filters.join(' ') : 'none',
    transform: crtCurvature.value ? 'scale(1.03)' : 'scale(1)'
  }
})

const scanlineOverlayStyle = computed(() => {
  return {
    background: `repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0, 0, 0, ${crtScanlineOpacity.value}) 2px, rgba(0, 0, 0, ${crtScanlineOpacity.value}) 4px)`,
    mixBlendMode: 'multiply' as const
  }
})

const vignetteOverlayStyle = computed(() => {
  return {
    background: `radial-gradient(circle at 50% 50%, transparent 50%, rgba(0, 0, 0, ${crtVignette.value * 0.95}) 100%)`
  }
})

</script>

<style scoped>
.text-glow-cyan {
  text-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
}
</style>
