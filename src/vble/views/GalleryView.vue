<template>
  <div class="gallery-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-blue-950/80 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              VBLE Visual, Holographic Shader &amp; Spectrum Studio v2.2.298
            </span>
            <span class="text-xs text-gray-400">大世界实机、UI架构、体积雾光线步进与魔导粒子渲染</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🎨</span> 实机画廊与魔导视觉粒子沙盘工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            精选回合制 ATB 战斗全景、地貌航图、城邦商会、队伍整备与虚空空间扭曲等高清视觉资产。全息实装魔导粒子着色器动态调优沙盘与全色调体积雾光线步进渲染工坊。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToPanoramicStudio"
          >
            <template #icon><span>🖼️</span></template>
            全景壁纸与着色器工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToHolographicStudio"
          >
            <template #icon><span>🌈</span></template>
            全息光谱渲染工坊
          </n-button>
          <n-button
            type="info"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToVolumetricStudio"
          >
            <template #icon><span>🌫️</span></template>
            前往体积雾光步进工坊
          </n-button>
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

    <!-- 专区 6: 全色调 HDR 光影分级与动态调色沙盘 (Cinematic Color Grading & LUT Pipeline Studio) -->
    <div id="color-grading-studio" class="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950 border border-cyan-500/40 shadow-2xl space-y-6">
      <!-- 头部导览与操作 -->
      <div class="border-b border-cyan-900/40 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-2xl">🎞️</span>
            <h2 class="text-xl sm:text-2xl font-black text-cyan-300">
              全色调 HDR 光影分级与动态调色沙盘
            </h2>
            <n-tag size="small" type="success" round strong>ACES Filmic &amp; LUT 4.6 LTS</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            实时解算曝光度补偿、白平衡色温、动态范围对比度与电影级 ACES 色调映射曲线；自由自定义视觉风格并一键导出调色方案证书！
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <n-button size="small" secondary type="warning" @click="resetGradingParams">
            🔄 重置调色
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportColorGradingCert">
            📜 导出调色配置文件
          </n-button>
        </div>
      </div>

      <!-- 四大电影级 LUT 官方预设快捷套用 -->
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs font-bold text-gray-400">✨ 官方电影级调色预设:</span>
        <button
          v-for="preset in gradingPresets"
          :key="preset.id"
          type="button"
          class="px-2.5 py-1 text-xs rounded border transition-all cursor-pointer flex items-center gap-1"
          :class="selectedGradingPresetId === preset.id
            ? 'bg-cyan-950/80 border-cyan-400 text-white font-bold shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/50'
            : 'bg-slate-950/80 border-slate-800 text-gray-300 hover:border-slate-700'"
          @click="applyGradingPreset(preset.id)"
        >
          <span>{{ preset.icon }}</span>
          <span>{{ preset.name }}</span>
        </button>
      </div>

      <!-- 调色视口与参数微调网格 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：实时调色渲染视口与直方图 -->
        <div class="lg:col-span-7 flex flex-col justify-between p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
          <!-- 视口容器 -->
          <div class="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
            <img
              :src="selectedGradingSampleImage"
              alt="Color Grading Preview"
              class="w-full h-full object-cover select-none pointer-events-none transition-all duration-300"
              :style="gradingImageStyle"
            />
            <!-- 胶片颗粒遮罩 -->
            <div
              v-if="gradingFilmGrain"
              class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
              style="background-image: radial-gradient(#fff 10%, transparent 11%), radial-gradient(#000 10%, transparent 11%); background-size: 4px 4px;"
            ></div>
            <!-- 状态标签悬浮 -->
            <div class="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur border border-slate-700 text-[10px] text-cyan-300 font-mono">
              ACES {{ gradingAces ? 'ON' : 'OFF' }} · {{ gradingColorTemp }}K
            </div>
          </div>

          <!-- 底部控制与直方图模拟卡片 -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400">样张切换:</span>
                <button
                  v-for="(_img, idx) in crtSampleImages"
                  :key="idx"
                  type="button"
                  class="px-2 py-0.5 rounded text-[10px] border cursor-pointer"
                  :class="selectedGradingSampleIndex === idx ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold' : 'bg-slate-900 text-slate-300 border-slate-700'"
                  @click="selectedGradingSampleIndex = idx"
                >
                  场景 {{ idx + 1 }}
                </button>
              </div>
              <span class="text-[10px] text-gray-500">动态色彩直方图解算</span>
            </div>

            <!-- 动态三色波形卡片 -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div class="flex items-center justify-between text-[11px] text-gray-400">
                <span>高光区域 (Highlights)</span>
                <span class="font-mono text-cyan-400">{{ gradingHistogram.highlights }}%</span>
              </div>
              <div class="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div class="bg-cyan-400 h-full rounded-full transition-all duration-300" :style="{ width: `${gradingHistogram.highlights}%` }"></div>
              </div>

              <div class="flex items-center justify-between text-[11px] text-gray-400">
                <span>中间调 (Midtones)</span>
                <span class="font-mono text-amber-400">{{ gradingHistogram.midtones }}%</span>
              </div>
              <div class="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div class="bg-amber-400 h-full rounded-full transition-all duration-300" :style="{ width: `${gradingHistogram.midtones}%` }"></div>
              </div>

              <div class="flex items-center justify-between text-[11px] text-gray-400">
                <span>暗部阴影 (Shadows)</span>
                <span class="font-mono text-purple-400">{{ gradingHistogram.shadows }}%</span>
              </div>
              <div class="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div class="bg-purple-400 h-full rounded-full transition-all duration-300" :style="{ width: `${gradingHistogram.shadows}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：着色器微调滑块 -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div class="text-xs font-bold text-cyan-300 flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="flex items-center gap-1.5">
              <span>🎛️</span> 后处理调色参数 (Grading Uniforms)
            </span>
            <span class="text-[10px] text-gray-500 font-mono">0.12ms 算力极简</span>
          </div>

          <!-- 曝光度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>曝光度补偿 (Exposure Bias):</span>
              <span class="font-mono text-cyan-400 font-bold">{{ gradingExposure > 0 ? '+' : '' }}{{ gradingExposure.toFixed(2) }} EV</span>
            </div>
            <n-slider v-model:value="gradingExposure" :min="-1.5" :max="1.5" :step="0.05" />
          </div>

          <!-- 色温 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>色温平衡 (Color Temperature):</span>
              <span class="font-mono text-amber-400 font-bold">{{ gradingColorTemp }} K</span>
            </div>
            <n-slider v-model:value="gradingColorTemp" :min="3200" :max="7800" :step="100" />
            <div class="flex justify-between text-[9px] text-gray-500">
              <span>3200K 暖金晨曦</span>
              <span>5500K 中性日光</span>
              <span>7800K 冰蓝冷月</span>
            </div>
          </div>

          <!-- 对比度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>动态对比度 (Contrast Ratio):</span>
              <span class="font-mono text-purple-400 font-bold">{{ gradingContrast.toFixed(2) }}x</span>
            </div>
            <n-slider v-model:value="gradingContrast" :min="0.6" :max="1.8" :step="0.05" />
          </div>

          <!-- 饱和度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>色彩饱和度 (Saturation):</span>
              <span class="font-mono text-emerald-400 font-bold">{{ gradingSaturation.toFixed(2) }}x</span>
            </div>
            <n-slider v-model:value="gradingSaturation" :min="0.0" :max="2.2" :step="0.05" />
          </div>

          <!-- 特效开关组 -->
          <div class="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【ACES Filmic 电影色调映射曲线】:</span>
              <n-switch v-model:value="gradingAces" size="small" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【微量动态胶片噪点 (Film Grain)】:</span>
              <n-switch v-model:value="gradingFilmGrain" size="small" />
            </div>
          </div>

          <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
            💡 引擎提示：开启 ACES 曲线后，高光不会硬溢出惨白，能展现更深层次的日照天际线与魔导电弧细节。
          </div>
        </div>
      </div>
    </div>

    <!-- 第五部分：全色调体积雾光影射线与魔导粒子光线步进渲染工坊 -->
    <div id="volumetric-raymarching-studio" class="p-6 sm:p-8 rounded-2xl bg-[#0a0f1d]/95 border border-cyan-500/30 space-y-6 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden">
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 工坊头部标章 -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              v2.2.275 重磅实装
            </span>
            <span class="text-xs text-gray-400">Forward+ / Clustered 体积光线步进内核</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🌫️</span> 全色调体积雾光影射线与魔导粒子光线步进渲染工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            基于 Beer-Lambert 消光介质模型与 Henyey-Greenstein 各向异性散射相函数，实时模拟高动态晨曦天顶光束、虚空光子散射与 ACES 电影色调映射。
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <n-button
            type="primary"
            size="small"
            round
            secondary
            :loading="isSimulatingVolumetric"
            @click="simulateVolumetricRaymarching"
          >
            <template #icon><span>⚡</span></template>
            激发光线步进推演
          </n-button>
          <n-button
            type="info"
            size="small"
            round
            secondary
            @click="exportVolumetricLightingCertificate"
          >
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大渲染预设 Stances -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="stance in volumetricStances"
          :key="stance.id"
          class="p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
          :class="selectedVolumetricStanceId === stance.id
            ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="applyVolumetricStance(stance.id)"
        >
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xl">{{ stance.icon }}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded font-mono" :class="selectedVolumetricStanceId === stance.id ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-gray-400'">
                {{ stance.tag }}
              </span>
            </div>
            <div class="font-bold text-xs text-gray-200">{{ stance.name }}</div>
            <div class="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{{ stance.subtitle }}</div>
          </div>
          <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
            <span class="text-gray-400">采样步数:</span>
            <span class="font-mono font-bold text-cyan-300">{{ stance.steps }} Steps</span>
          </div>
        </div>
      </div>

      <!-- 双栏交互面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧：实时体积雾光照视效显像与物理计算 -->
        <div class="lg:col-span-7 space-y-4">
          <!-- 视效显像窗口 -->
          <div class="relative h-64 sm:h-72 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            <!-- 背景光斑与光锥 SVG 模拟 -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                class="absolute -top-10 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                :style="{
                  background: activeStanceColorGradient,
                  opacity: (volumetricDensity * 0.9 + 0.1).toFixed(2),
                  transform: `scale(${1 + volumetricExposure * 0.3})`
                }"
              ></div>
              <svg class="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none">
                <polygon
                  points="160,0 280,0 480,320 0,320"
                  fill="url(#volumetricBeamGrad)"
                />
                <polygon
                  points="220,0 340,0 620,320 180,320"
                  fill="url(#volumetricBeamGrad2)"
                />
                <defs>
                  <linearGradient id="volumetricBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(255,230,150,0.6)" />
                    <stop offset="60%" stop-color="rgba(6,182,212,0.25)" />
                    <stop offset="100%" stop-color="rgba(15,23,42,0)" />
                  </linearGradient>
                  <linearGradient id="volumetricBeamGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(168,85,247,0.5)" />
                    <stop offset="70%" stop-color="rgba(59,130,246,0.15)" />
                    <stop offset="100%" stop-color="rgba(15,23,42,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <!-- 顶部状态指示灯与采样模式 -->
            <div class="relative z-10 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="font-mono text-cyan-300 font-bold">RAYMARCH ACTIVE</span>
                <span class="text-gray-400 font-mono text-[10px]">| {{ volumetricSteps }} Voxel Steps</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-amber-300">
                ACES: {{ volumetricExposure > 0 ? '+' : '' }}{{ volumetricExposure.toFixed(2) }} EV
              </div>
            </div>

            <!-- 中间标语 -->
            <div class="relative z-10 text-center my-auto">
              <div class="text-2xl font-black text-white/90 tracking-wider font-mono drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
                {{ currentVolumetricStance.name }}
              </div>
              <div class="text-xs text-cyan-200/80 mt-1 font-mono">
                Beer-Lambert 透射率 T(s) = {{ volumetricMetrics.transmittance }}% · 消光 σt = {{ volumetricMetrics.sigma_t }}
              </div>
            </div>

            <!-- 底部性能与管线参数微视窗 -->
            <div class="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-gray-400">
              <span>Henyey-Greenstein: {{ volumetricAnisotropy ? 'g=0.76 (Mie正向)' : '各向同性 (g=0)' }}</span>
              <span class="text-emerald-400 font-bold">帧时延: {{ volumetricMetrics.latencyMs }} ms</span>
            </div>
          </div>

          <!-- 4 维物理与渲染计算指标卡片 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">介质散射系数 σs</div>
              <div class="font-mono text-cyan-400 font-bold text-sm mt-0.5">{{ volumetricMetrics.sigma_s }}</div>
              <div class="text-[9px] text-gray-500 mt-0.5">Rayleigh/Mie 散射</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">介质吸收系数 σa</div>
              <div class="font-mono text-amber-400 font-bold text-sm mt-0.5">{{ volumetricMetrics.sigma_a }}</div>
              <div class="text-[9px] text-gray-500 mt-0.5">以太吸收衰减</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">显存 VRAM 占用</div>
              <div class="font-mono text-purple-400 font-bold text-sm mt-0.5">{{ volumetricMetrics.vramUsage }} MB</div>
              <div class="text-[9px] text-gray-500 mt-0.5">3D Froxel 缓冲</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div class="text-[10px] text-gray-400">综合管线评级</div>
              <div class="font-mono text-emerald-400 font-bold text-xs mt-0.5 truncate">{{ volumetricMetrics.rating }}</div>
              <div class="text-[9px] text-gray-500 mt-0.5">Forward+ Clustered</div>
            </div>
          </div>

          <!-- 实时光线步进模拟终端 -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
            <div class="flex items-center justify-between text-xs text-gray-400 pb-1.5 border-b border-slate-800">
              <span class="flex items-center gap-1.5 text-cyan-300 font-bold">
                <span>💻</span> 光线步进着色器分步执行日志 (Shader Execution Terminal)
              </span>
              <span class="text-[10px] text-gray-500">步进缓存: 实时同步</span>
            </div>
            <div class="space-y-1 text-[11px] text-gray-300 max-h-28 overflow-y-auto custom-scrollbar">
              <div v-for="(log, idx) in volumetricSimulationLogs" :key="idx" class="flex items-start gap-1.5">
                <span class="text-cyan-500 select-none">&gt;</span>
                <span :class="log.includes('完成') || log.includes('成功') ? 'text-emerald-400' : 'text-gray-300'">{{ log }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：无极物理调优与着色器 Uniforms -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div class="text-xs font-bold text-cyan-300 flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="flex items-center gap-1.5">
              <span>🎛️</span> 光学步进参数微调 (Optical Uniforms)
            </span>
            <button
              type="button"
              class="text-[10px] text-gray-400 hover:text-cyan-300 cursor-pointer"
              @click="resetVolumetricParams"
            >
              重置参数
            </button>
          </div>

          <!-- 雾介质基础密度 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>雾介质基础密度 (Fog Media Density):</span>
              <span class="font-mono text-cyan-400 font-bold">{{ volumetricDensity.toFixed(2) }}</span>
            </div>
            <n-slider v-model:value="volumetricDensity" :min="0.01" :max="1.0" :step="0.01" />
            <div class="flex justify-between text-[9px] text-gray-500">
              <span>0.01 薄雾清晨</span>
              <span>0.50 密林烟障</span>
              <span>1.00 虚空浓云</span>
            </div>
          </div>

          <!-- 采样步数 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>光线步进采样步数 (Raymarch Steps):</span>
              <span class="font-mono text-amber-400 font-bold">{{ volumetricSteps }} Steps</span>
            </div>
            <n-slider v-model:value="volumetricSteps" :min="16" :max="128" :step="4" />
          </div>

          <!-- 单次散射反照率 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>单次散射反照率 (Single Scattering Albedo):</span>
              <span class="font-mono text-purple-400 font-bold">{{ Math.round(volumetricAlbedo * 100) }}%</span>
            </div>
            <n-slider v-model:value="volumetricAlbedo" :min="0.1" :max="1.0" :step="0.01" />
          </div>

          <!-- ACES 曝光补偿 -->
          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-gray-300">
              <span>ACES 电影曝光补偿 (Exposure Bias):</span>
              <span class="font-mono text-emerald-400 font-bold">{{ volumetricExposure > 0 ? '+' : '' }}{{ volumetricExposure.toFixed(2) }} EV</span>
            </div>
            <n-slider v-model:value="volumetricExposure" :min="-3.0" :max="3.0" :step="0.05" />
          </div>

          <!-- 高阶光影算法开关 -->
          <div class="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【Henyey-Greenstein 各向异性正向散射 (g=0.76)】:</span>
              <n-switch v-model:value="volumetricAnisotropy" size="small" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【时域重投影反走样去噪 (Temporal Reprojection TAA)】:</span>
              <n-switch v-model:value="volumetricDenoise" size="small" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-300">开启【低差异蓝噪点射线抖动 (Blue Noise Jitter)】:</span>
              <n-switch v-model:value="volumetricJitter" size="small" />
            </div>
          </div>

          <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-gray-400 leading-relaxed">
            💡 物理原理：通过在视锥体深度缓冲区逐像素步进积分，结合 Henyey-Greenstein 相函数与 ACES 电影曲线拟合，彻底杜绝高光死白与阶梯分层伪影。
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.6 LTS 核心实机代码展台 (4 Tab 切换) -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-cyan-300">
            Godot 4.6 LTS 视觉粒子、光线步进与电影调色内核展台
          </span>
          <n-tag size="tiny" type="info">纯读安全 · 零内存泄漏</n-tag>
        </div>
        <div class="flex items-center gap-2">
          <!-- 4 Tab 切换 -->
          <div class="inline-flex p-0.5 bg-slate-900 rounded-lg border border-slate-800 flex-wrap">
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeGalleryGodotTab === 'volumetric' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeGalleryGodotTab = 'volumetric'"
            >
              📄 volumetric_raymarching.gdshader
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeGalleryGodotTab === 'orchestrator' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeGalleryGodotTab = 'orchestrator'"
            >
              📄 vfx_particle_pipeline_orchestrator.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeGalleryGodotTab === 'vfx' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeGalleryGodotTab = 'vfx'"
            >
              📄 vfx_particle_controller.gd
            </button>
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md transition cursor-pointer"
              :class="activeGalleryGodotTab === 'grading' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
              @click="activeGalleryGodotTab = 'grading'"
            >
              📄 color_grading_post_process.gd
            </button>
          </div>
          <n-button size="tiny" secondary type="info" @click="copyGodotCode">
            {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
          </n-button>
        </div>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-900 max-h-56 custom-scrollbar"><code v-if="activeGalleryGodotTab === 'volumetric'">{{ godotVolumetricShaderCode }}</code><code v-else-if="activeGalleryGodotTab === 'orchestrator'">{{ godotOrchestratorCode }}</code><code v-else-if="activeGalleryGodotTab === 'vfx'">{{ godotCodeText }}</code><code v-else>{{ godotGradingCodeText }}</code></pre>
    </div>

    <!-- 第六部分: 全域超光速着色器管线、全息折射光栅与虚空全光谱渲染工坊 (Holographic Spectrum Studio v2.2.298) -->
    <div id="holographic-spectrum-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/70 via-slate-900/95 to-purple-950/70 border border-amber-500/40 space-y-6 shadow-[0_0_40px_rgba(245,158,11,0.22)] relative overflow-hidden">
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 工坊头部标章 -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/50 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
              v2.2.298 重磅实装
            </span>
            <span class="text-xs text-gray-400">全息薄膜色散 · 柯西双折射 · 黑体热核辐射光谱</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🌈</span> 全域超光速着色器管线、全息折射光栅与虚空全光谱渲染工坊
          </h2>
          <p class="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            对齐 Godot 4.6 LTS Compute Shader 光栅渲染与视觉管线规范：深度覆盖四大光谱着色器流派、四维连续光栅渲染参数、三大光栅防护断路器、五阶段光谱渲染推演与防伪证书导出。
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0 flex-wrap">
          <n-button size="small" secondary type="warning" @click="resetSpectrumParameters">
            🔄 重置光栅参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportSpectrumCertificate">
            📜 导出光谱方案书
          </n-button>
        </div>
      </div>

      <!-- 四大光谱着色器流派选择卡 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="spec in spectrumArchetypes"
          :key="spec.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
          :class="selectedSpectrumId === spec.id
            ? 'bg-amber-950/50 border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50'
            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'"
          @click="selectedSpectrumId = spec.id"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ spec.icon }}</span>
            <n-tag :type="selectedSpectrumId === spec.id ? 'warning' : 'default'" size="tiny" round>
              {{ spec.tag }}
            </n-tag>
          </div>
          <div class="text-sm font-bold text-white mb-1">{{ spec.name }}</div>
          <div class="text-[11px] text-gray-400 leading-relaxed mb-3">{{ spec.desc }}</div>
          <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span class="text-gray-400">光子特征</span>
            <span class="text-amber-300 font-semibold">{{ spec.perk }}</span>
          </div>
        </div>
      </div>

      <!-- 参数微调滑块与安全防护盾 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 左侧: 4维连续参数调节 (7 cols) -->
        <div class="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="text-amber-400 font-bold text-sm">🎛️ 光谱色散光栅连续参数调控矩阵</span>
              <span class="text-[11px] text-gray-400 font-mono">4-Axis Shader Tuning</span>
            </div>
            <button
              type="button"
              class="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
              @click="resetSpectrumParameters"
            >
              重置参数
            </button>
          </div>

          <!-- 滑块 1: 全息衍射光栅常数 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>🌈</span> 全息衍射光栅常数 (Grating Density)
              </span>
              <span class="font-mono text-amber-400 font-bold">{{ gratingDensity }} 条/mm</span>
            </div>
            <n-slider
              v-model:value="gratingDensity"
              :min="100"
              :max="1200"
              :step="50"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>100 条 (宽距光条)</span>
              <span>600 条 (纳米高阶衍射)</span>
              <span>1200 条 (极细超密彩虹栅)</span>
            </div>
          </div>

          <!-- 滑块 2: 双折射柯西色散指数 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>💎</span> 双折射柯西色散指数 (Dispersion Index)
              </span>
              <span class="font-mono text-cyan-400 font-bold">{{ dispersionIndex.toFixed(2) }}</span>
            </div>
            <n-slider
              v-model:value="dispersionIndex"
              :min="1.10"
              :max="2.50"
              :step="0.05"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1.10 (弱色散单色)</span>
              <span>1.65 (高透水晶三棱镜)</span>
              <span>2.50 (金刚石极高色散)</span>
            </div>
          </div>

          <!-- 滑块 3: 黑体辐射有效色温 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>🔥</span> 黑体辐射有效色温 (Color Temperature)
              </span>
              <span class="font-mono text-rose-400 font-bold">{{ colorTemperature }} K</span>
            </div>
            <n-slider
              v-model:value="colorTemperature"
              :min="2000"
              :max="12000"
              :step="500"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>2000 K (烛光炽红)</span>
              <span>6500 K (标准日光 D65)</span>
              <span>12000 K (天狼星高能蓝白)</span>
            </div>
          </div>

          <!-- 滑块 4: 光线追踪采样反弹深度 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>🔄</span> 光线追踪采样反弹深度 (Ray Bounce Depth)
              </span>
              <span class="font-mono text-purple-400 font-bold">{{ rayBounceDepth }} 次反弹</span>
            </div>
            <n-slider
              v-model:value="rayBounceDepth"
              :min="1"
              :max="8"
              :step="1"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1 次 (直接漫反射)</span>
              <span>4 次 (多次焦散互射)</span>
              <span>8 次 (完全无偏电影全局光)</span>
            </div>
          </div>
        </div>

        <!-- 右侧: 3大光栅保护断路器 (5 cols) -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
            <span class="text-amber-400 font-bold text-sm">🛡️ 光栅渲染保护与硬件降噪断路器</span>
            <n-tag type="info" size="tiny" round>主动防护体系</n-tag>
          </div>

          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>✨</span> 时间序列时空联合降噪 (TAA/TSR)
                </div>
                <div class="text-[11px] text-gray-400">历史帧抖动平滑，低算力开销消除高频斑点</div>
              </div>
              <n-switch v-model:value="temporalDenoiseTSR" size="small" />
            </div>

            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>👁️</span> 光敏性防过曝安全滤镜
                </div>
                <div class="text-[11px] text-gray-400">限制 HDR 瞬时峰值辉光突变，呵护视力健康</div>
              </div>
              <n-switch v-model:value="photosensitiveAegis" size="small" />
            </div>

            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>💾</span> VRAM 显存溢出零抖动保护阀
                </div>
                <div class="text-[11px] text-gray-400">超 4GB 预警阈值时自适应降采样，杜绝卡顿</div>
              </div>
              <n-switch v-model:value="vramZeroJitterLock" size="small" />
            </div>
          </div>

          <!-- 能效雷达卡 -->
          <div class="p-3 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 space-y-2">
            <div class="text-xs font-bold text-amber-300 flex items-center justify-between">
              <span>渲染管线流畅度评测</span>
              <span class="font-mono text-emerald-400 font-bold">{{ (100 - calculatedFrameLatency * 12).toFixed(1) }} 分</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                class="bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 h-1.5 rounded-full transition-all duration-300"
                :style="{ width: Math.min(100 - calculatedFrameLatency * 12, 100) + '%' }"
              ></div>
            </div>
            <div class="text-[10px] text-gray-400 flex justify-between">
              <span>帧耗时: {{ calculatedFrameLatency.toFixed(2) }} ms</span>
              <span class="text-emerald-400">理论极速: {{ Math.round(1000 / calculatedFrameLatency) }} FPS</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 实时解算数值仪表盘 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">渲染管线帧延迟</div>
          <div class="text-2xl font-black text-cyan-400 font-mono mt-1">{{ calculatedFrameLatency.toFixed(2) }} ms</div>
          <div class="text-[10px] text-cyan-300/80 mt-0.5">极致瞬时响应延迟</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">全域光子辐射通量</div>
          <div class="text-2xl font-black text-amber-400 font-mono mt-1">{{ calculatedPhotonFlux.toLocaleString() }} Lux</div>
          <div class="text-[10px] text-amber-300/80 mt-0.5">高动态全光谱照度</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">显存 VRAM 能效占用</div>
          <div class="text-2xl font-black text-emerald-400 font-mono mt-1">{{ calculatedVramUsage }} MB</div>
          <div class="text-[10px] text-emerald-300/80 mt-0.5">零溢出轻量显存开销</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">视觉引擎认证评级</div>
          <div class="text-2xl font-black text-purple-400 font-mono mt-1">{{ visualEngineRank }}</div>
          <div class="text-[10px] text-purple-300/80 mt-0.5">Godot 4.6 次世代认证</div>
        </div>
      </div>

      <!-- 五阶段光谱渲染推演仿真终端 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-amber-500/30 shadow-2xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-amber-400 font-bold text-sm">⚡ 全域超光速着色器与全光谱渲染五阶段推演终端</span>
            <n-tag type="warning" size="tiny" round>Live Compute Pipeline</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 shadow-md disabled:opacity-50"
              :disabled="isSimulatingSpectrum"
              @click="runSpectrumSimulation"
            >
              {{ isSimulatingSpectrum ? '正在编译渲染管线中...' : '▶ 启动全流程光谱渲染推演' }}
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 transition-all cursor-pointer"
              @click="exportSpectrumCertificate"
            >
              📜 导出光谱方案书
            </button>
          </div>
        </div>

        <!-- 5 阶段步进进度 -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <div
            v-for="(stg, idx) in spectrumStages"
            :key="stg.id"
            class="p-2.5 rounded-lg border text-xs transition-all flex flex-col justify-between"
            :class="spectrumSimulationStep >= idx + 1
              ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
              : 'bg-slate-900/60 border-slate-800/80 text-gray-500'"
          >
            <div class="font-bold mb-1 flex items-center gap-1">
              <span>{{ spectrumSimulationStep >= idx + 1 ? '✅' : '⏳' }}</span>
              <span>第 {{ idx + 1 }} 阶: {{ stg.title }}</span>
            </div>
            <div class="text-[10px] leading-tight opacity-80">{{ stg.desc }}</div>
          </div>
        </div>

        <!-- 推演日志视窗 -->
        <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-gray-300 max-h-48 overflow-y-auto space-y-1">
          <div v-for="(log, idx) in spectrumLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-amber-400 select-none">›</span>
            <span :class="log.color || 'text-gray-300'">{{ log.text }}</span>
          </div>
          <div v-if="spectrumLogs.length === 0" class="text-gray-600 italic">
            等待启动推演... 点击上方【启动全流程光谱渲染推演】按键开始推演。
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 3 Tab 源码展台 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-slate-800 shadow-xl space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400 font-bold text-sm">💻 Godot 4.6 LTS 全息光栅与着色器实机脚本</span>
            <n-tag type="info" size="tiny" round>Shader &amp; Compute Pipeline</n-tag>
          </div>
          <div class="flex gap-2">
            <button
              v-for="st in spectrumScriptTabs"
              :key="st.key"
              type="button"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border"
              :class="activeSpectrumScriptTab === st.key
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900 text-gray-400 border-slate-800 hover:text-white'"
              @click="activeSpectrumScriptTab = st.key"
            >
              {{ st.name }}
            </button>
          </div>
        </div>

        <div class="relative">
          <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed max-h-96">{{ currentSpectrumScriptCode }}</pre>
          <button
            type="button"
            class="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] text-gray-300 border border-slate-700 cursor-pointer transition-colors"
            @click="copySpectrumScript"
          >
            📋 复制代码
          </button>
        </div>
      </div>
    </div>


    <!-- 全景像素画廊、高维壁纸渲染与动态着色器工坊 (v2.2.320 重磅实装) -->
    <div id="panoramic-wallpaper-studio" class="panoramic-wallpaper-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-cyan-950/20 to-slate-900/95 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              PANORAMIC WALLPAPER & DYNAMIC SHADER
            </span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
              v2.2.320 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>🖼️</span> 全景像素画廊、高维壁纸渲染与动态着色器工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            提供太古次元裂隙、浮空圣城、库扎封印禁地与神龙之巢四大全景视界，支持 4K 超分采样、动态视差陀螺仪与 Godot 4.6 LTS 实机着色器引擎。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="info" @click="resetPanoramicDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="info" :loading="isPanoramicSimulating" @click="runPanoramicSimulation">
            <template #icon><span>⚡</span></template>
            激发渲染推演
          </n-button>
          <n-button size="small" round secondary type="warning" @click="exportPanoramicCert">
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大全景壁纸视觉原型 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="archetype in panoramicArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
          :class="selectedPanoramicArchetype === archetype.id ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/30' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="selectPanoramicArchetype(archetype.id)"
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
              <span>着色器核心:</span>
              <span class="text-purple-300 font-mono">{{ archetype.shaderCore }}</span>
            </div>
            <div class="flex justify-between">
              <span>渲染分辨率:</span>
              <span class="text-emerald-300 font-mono">{{ archetype.resSpec }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 四维壁纸着色器参数调控滑块 -->
      <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
        <div class="text-sm font-bold text-white flex items-center justify-between">
          <span class="flex items-center gap-2"><span>🎛️</span> 动态着色器与高维采样参数调优</span>
          <span class="text-xs text-cyan-400 font-mono">Realtime Viewport Shader Calculations</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">动态着色器帧率预算 (FPS):</span>
              <span class="text-cyan-400 font-mono font-bold">{{ shaderFpsBudget }} FPS (极速微秒响应)</span>
            </div>
            <n-slider v-model:value="shaderFpsBudget" :min="30" :max="144" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>30 FPS 节能</span>
              <span>60 FPS 标准</span>
              <span>144 FPS 电竞极速</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">4K 超分抗锯齿采样倍率 (x):</span>
              <span class="text-amber-400 font-mono font-bold">{{ superSampleFactor.toFixed(1) }}x (TSR 超采样)</span>
            </div>
            <n-slider v-model:value="superSampleFactor" :min="1.0" :max="4.0" :step="0.5" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>1.0x 原生</span>
              <span>2.0x 双倍超分</span>
              <span>4.0x 极意精细</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">动态色差与以太辉光强度:</span>
              <span class="text-purple-400 font-mono font-bold">{{ chromaticAberration.toFixed(2) }} (柯西色散)</span>
            </div>
            <n-slider v-model:value="chromaticAberration" :min="0.05" :max="1.00" :step="0.05" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>0.05 微弱色散</span>
              <span>0.35 柔和魔导</span>
              <span>1.00 强烈扭曲</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">全息像素网格密度 (Grid):</span>
              <span class="text-emerald-400 font-mono font-bold">{{ pixelGridDensity }} Px (复古点阵)</span>
            </div>
            <n-slider v-model:value="pixelGridDensity" :min="64" :max="512" :step="32" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>64 粗颗粒</span>
              <span>256 经典 SFC</span>
              <span>512 极细致像素</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 三大高维视觉增强开关 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">动态视差鼠标位移追踪</div>
            <div class="text-[10px] text-gray-400 mt-0.5">多层景深按光标平滑插值微移</div>
          </div>
          <n-switch v-model:value="enableParallaxMouseTracking" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">实时屏幕空间反射与折射</div>
            <div class="text-[10px] text-gray-400 mt-0.5">水体与虚空镜面以太全反射</div>
          </div>
          <n-switch v-model:value="enableRealtimeScreenRefraction" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">无损 4K 动态壁纸一键导出</div>
            <div class="text-[10px] text-gray-400 mt-0.5">打包 WebM/MP4 动态壁纸资源</div>
          </div>
          <n-switch v-model:value="enableLosslessWallpaperExport" size="small" />
        </div>
      </div>

      <!-- 关键实时指标卡片 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">单帧渲染时间开销</div>
          <div class="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-1">
            {{ frameTimeLatencyMs }} ms
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">对应 {{ shaderFpsBudget }} FPS 预算</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">显存带宽占用预估</div>
          <div class="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
            {{ vramBandwidthMb }} MB
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">VRAM 安全带宽</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">画面画质综合保真度</div>
          <div class="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
            {{ visualFidelityPct }}%
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">SSIM 画面结构相似度</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">画廊视觉认证评级</div>
          <div class="text-sm sm:text-base font-black text-purple-400 font-mono mt-1 truncate">
            {{ panoramicTierBadge }}
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">全息动态壁纸认证</div>
        </div>
      </div>

      <!-- 沙盘推演日志与进度 -->
      <div v-if="isPanoramicSimulating || panoramicLog.length > 0" class="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-300 font-bold flex items-center gap-2">
            <span>🔄</span> 全景壁纸与动态着色器渲染沙盘进程: {{ panoramicSimStep }}
          </span>
          <span class="text-cyan-400 font-mono font-bold">{{ panoramicSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="panoramicSimProgress"
          :indicator-placement="'inside'"
          processing
          status="info"
        />
        <div class="max-h-36 overflow-y-auto space-y-1 font-mono text-[11px] text-gray-400 pt-2 border-t border-slate-900">
          <div v-for="(log, idx) in panoramicLog" :key="idx" class="flex items-start gap-2">
            <span class="text-cyan-500">›</span>
            <span :class="idx === panoramicLog.length - 1 ? 'text-cyan-300 font-bold' : 'text-gray-400'">{{ log }}</span>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">GODOT 4.6 LTS</span>
            <h3 class="text-sm font-bold text-white">全景壁纸与高维着色器渲染源码展台</h3>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activePanoramicScriptTab === 'shader' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activePanoramicScriptTab = 'shader'"
              >
                动态视界着色器
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activePanoramicScriptTab === 'renderer' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activePanoramicScriptTab = 'renderer'"
              >
                4K 超分降采样器
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activePanoramicScriptTab === 'parallax' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activePanoramicScriptTab = 'parallax'"
              >
                视差位移摄像机
              </button>
            </div>
            <n-button size="small" round secondary type="info" @click="copyPanoramicScript">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[460px]">{{ currentPanoramicScriptCode }}</pre>
      </div>
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

const scrollToHolographicStudio = () => {
  const el = document.getElementById('holographic-spectrum-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToVolumetricStudio = () => {
  const el = document.getElementById('volumetric-raymarching-studio')
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

const activeGalleryGodotTab = ref<'volumetric' | 'orchestrator' | 'vfx' | 'grading'>('volumetric')

const copyGodotCode = async () => {
  try {
    let textToCopy = ''
    let fileName = ''
    if (activeGalleryGodotTab.value === 'volumetric') {
      textToCopy = godotVolumetricShaderCode
      fileName = 'volumetric_raymarching.gdshader'
    } else if (activeGalleryGodotTab.value === 'orchestrator') {
      textToCopy = godotOrchestratorCode
      fileName = 'vfx_particle_pipeline_orchestrator.gd'
    } else if (activeGalleryGodotTab.value === 'vfx') {
      textToCopy = godotCodeText
      fileName = 'vfx_particle_controller.gd'
    } else {
      textToCopy = godotGradingCodeText
      fileName = 'color_grading_post_process.gd'
    }
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

// ==========================================
// 🎞️ 全色调 HDR 光影分级与动态调色沙盘
// ==========================================
interface GradingPreset {
  id: string
  name: string
  icon: string
  exposure: number
  colorTemp: number
  contrast: number
  saturation: number
  aces: boolean
  filmGrain: boolean
}

const gradingPresets: GradingPreset[] = [
  { id: 'sunrise', name: '太古晨曦 (Sunrise Gold)', icon: '🌅', exposure: 0.25, colorTemp: 4200, contrast: 1.15, saturation: 1.35, aces: true, filmGrain: false },
  { id: 'void', name: '深渊虚空 (Abyssal Void)', icon: '🌌', exposure: -0.35, colorTemp: 7000, contrast: 1.45, saturation: 0.85, aces: true, filmGrain: true },
  { id: 'thunder', name: '雷霆炼狱 (Thunder Hell)', icon: '⚡', exposure: 0.10, colorTemp: 5200, contrast: 1.35, saturation: 1.60, aces: true, filmGrain: false },
  { id: 'classic', name: '静止纪元 (Classic Noir)', icon: '📽️', exposure: -0.10, colorTemp: 5500, contrast: 1.05, saturation: 0.00, aces: false, filmGrain: true }
]

const selectedGradingPresetId = ref('sunrise')
const gradingExposure = ref(0.25)
const gradingColorTemp = ref(4200)
const gradingContrast = ref(1.15)
const gradingSaturation = ref(1.35)
const gradingAces = ref(true)
const gradingFilmGrain = ref(false)
const selectedGradingSampleIndex = ref(0)

const selectedGradingSampleImage = computed(() => {
  return crtSampleImages.value[selectedGradingSampleIndex.value] || crtSampleImages.value[0]
})

const applyGradingPreset = (presetId: string) => {
  selectedGradingPresetId.value = presetId
  const preset = gradingPresets.find(p => p.id === presetId)
  if (preset) {
    gradingExposure.value = preset.exposure
    gradingColorTemp.value = preset.colorTemp
    gradingContrast.value = preset.contrast
    gradingSaturation.value = preset.saturation
    gradingAces.value = preset.aces
    gradingFilmGrain.value = preset.filmGrain
    message.info(`已应用【${preset.name}】官方调色方案`)
  }
}

const resetGradingParams = () => {
  applyGradingPreset('sunrise')
}

const gradingImageStyle = computed(() => {
  const filters: string[] = []
  
  const brightness = Math.max(0.2, 1.0 + gradingExposure.value * 0.45)
  filters.push(`brightness(${brightness.toFixed(2)})`)
  filters.push(`contrast(${gradingContrast.value.toFixed(2)})`)
  filters.push(`saturate(${gradingSaturation.value.toFixed(2)})`)
  
  if (gradingColorTemp.value < 5500) {
    const warmRatio = (5500 - gradingColorTemp.value) / 2500
    filters.push(`sepia(${(warmRatio * 0.35).toFixed(2)})`)
  } else if (gradingColorTemp.value > 5500) {
    const coldRatio = (gradingColorTemp.value - 5500) / 2500
    filters.push(`hue-rotate(-${(coldRatio * 20).toFixed(1)}deg)`)
  }
  
  return {
    filter: filters.join(' ')
  }
})

const gradingHistogram = computed(() => {
  const exp = gradingExposure.value
  const con = gradingContrast.value
  
  const h = Math.round(Math.min(95, Math.max(10, 35 + exp * 25 + (con - 1.0) * 20)))
  const s = Math.round(Math.min(95, Math.max(10, 30 - exp * 20 + (con - 1.0) * 25)))
  const m = Math.round(Math.min(95, Math.max(15, 100 - (h + s) * 0.45)))
  
  return { highlights: h, midtones: m, shadows: s }
})

const exportColorGradingCert = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  const certContent = `================================================================================
   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)
   全色调 HDR 光影分级与动态调色方案配置文件 (v2.2.251)
================================================================================
颁发时间: ${timeStr}
调色预设: ${selectedGradingPresetId.value}
目标渲染管线: Forward+ / Clustered HDR
色调映射标准: ${gradingAces.value ? 'ACES Filmic Tone Mapping (SMPTE-2065)' : 'Linear Clamp'}

【后处理调色 Uniform 参数】
- 曝光度补偿 (Exposure Bias): ${gradingExposure.value > 0 ? '+' : ''}${gradingExposure.value.toFixed(2)} EV
- 白平衡色温 (Kelvin): ${gradingColorTemp.value} K
- 动态对比度系数 (Contrast Ratio): ${gradingContrast.value.toFixed(2)}x
- 饱和度系数 (Saturation): ${gradingSaturation.value.toFixed(2)}x
- 动态胶片颗粒 (Film Grain): ${gradingFilmGrain.value ? '已启用 (4x4 Bayer)' : '关闭'}

【实时色彩直方图估算】
- 高光波峰占比 (Highlights): ${gradingHistogram.value.highlights}%
- 中间调占比 (Midtones): ${gradingHistogram.value.midtones}%
- 暗部沉浸占比 (Shadows): ${gradingHistogram.value.shadows}%

【底层引擎契约安全指纹】
- Engine Spec: Godot 4.6 LTS / GDScript RefCounted
- Core Post-Process: color_grading_post_process.gd & crt_retro_shader.gdshader
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
    a.download = `gallery_color_grading_v2.2.251_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  if (message) {
    message.success('电影级调色配置方案已导出并同步至剪贴板！')
  }
}

const godotGradingCodeText = `## color_grading_post_process.gd
## Godot 4.6 LTS - 全色调 HDR 光影分级与 ACES 电影着色器控制器
extends Node
class_name ColorGradingPostProcess

@export var exposure_bias: float = 0.25
@export var color_temperature_k: float = 4200.0
@export var contrast: float = 1.15
@export var saturation: float = 1.35
@export var use_aces_tonemap: bool = true

func apply_grading_uniforms(post_material: ShaderMaterial) -> void:
	if post_material == null:
		return
	
	post_material.set_shader_parameter("exposure", exposure_bias)
	post_material.set_shader_parameter("contrast", contrast)
	post_material.set_shader_parameter("saturation", saturation)
	post_material.set_shader_parameter("aces_enabled", use_aces_tonemap)
	
	# Kelvin 色温转换算法 (Planckian Locus 近似)
	var kelvin_rgb = _kelvin_to_rgb(color_temperature_k)
	post_material.set_shader_parameter("tint_color", kelvin_rgb)

func _kelvin_to_rgb(k: float) -> Color:
	var temp = k / 100.0
	var r: float
	var g: float
	var b: float
	
	if temp <= 66.0:
		r = 1.0
		g = clampf((99.4708025861 * log(temp) - 161.1195681661) / 255.0, 0.0, 1.0)
		b = 0.0 if temp <= 19.0 else clampf((138.5177312231 * log(temp - 10.0) - 305.0447927307) / 255.0, 0.0, 1.0)
	else:
		r = clampf((329.698727446 * pow(temp - 60.0, -0.1332047592)) / 255.0, 0.0, 1.0)
		g = clampf((288.1221695283 * pow(temp - 60.0, -0.0755148492)) / 255.0, 0.0, 1.0)
		b = 1.0
		
	return Color(r, g, b, 1.0)`

// ==========================================
// 🌫️ 全色调体积雾光影射线与魔导粒子光线步进渲染工坊 (v2.2.275)
// ==========================================
interface VolumetricStance {
  id: string
  name: string
  subtitle: string
  icon: string
  density: number
  steps: number
  albedo: number
  exposure: number
  anisotropy: boolean
  denoise: boolean
  jitter: boolean
  tag: string
  gradient: string
}

const volumetricStances: VolumetricStance[] = [
  {
    id: 'god_rays',
    name: '晨曦天顶光束 (Crepuscular God Rays)',
    subtitle: '穿透云层与以太废墟的金色丁达尔散射',
    icon: '🌅',
    density: 0.18,
    steps: 48,
    albedo: 0.78,
    exposure: 0.45,
    anisotropy: true,
    denoise: true,
    jitter: true,
    tag: '金辉丁达尔',
    gradient: 'radial-gradient(circle, rgba(251,191,36,0.55) 0%, rgba(245,158,11,0.2) 50%, transparent 80%)'
  },
  {
    id: 'void_photons',
    name: '虚空光子散射 (Void Photon Scattering)',
    subtitle: '深渊奇点坍缩伴随的各向异性暗物质光束',
    icon: '🌌',
    density: 0.42,
    steps: 64,
    albedo: 0.52,
    exposure: -0.65,
    anisotropy: true,
    denoise: true,
    jitter: true,
    tag: '暗物质衰减',
    gradient: 'radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(99,102,241,0.25) 50%, transparent 80%)'
  },
  {
    id: 'aurora_bloom',
    name: '极光电离辉光 (Aurora Ionization Bloom)',
    subtitle: '北境磁层高能粒子与以太晶格共振电离',
    icon: '🎆',
    density: 0.28,
    steps: 56,
    albedo: 0.92,
    exposure: 0.20,
    anisotropy: false,
    denoise: true,
    jitter: false,
    tag: '以太电离',
    gradient: 'radial-gradient(circle, rgba(52,211,153,0.55) 0%, rgba(6,182,212,0.3) 50%, transparent 80%)'
  },
  {
    id: 'dof_bokeh',
    name: '散焦虚化景深 (Depth of Field Bokeh)',
    subtitle: '大光圈散焦模糊与全息圆斑虚化渲染',
    icon: '📸',
    density: 0.12,
    steps: 32,
    albedo: 0.65,
    exposure: 0.00,
    anisotropy: false,
    denoise: false,
    jitter: false,
    tag: '弥散圆散焦',
    gradient: 'radial-gradient(circle, rgba(236,72,153,0.45) 0%, rgba(59,130,246,0.2) 50%, transparent 80%)'
  }
]

const selectedVolumetricStanceId = ref('god_rays')
const volumetricDensity = ref(0.18)
const volumetricSteps = ref(48)
const volumetricAlbedo = ref(0.78)
const volumetricExposure = ref(0.45)
const volumetricAnisotropy = ref(true)
const volumetricDenoise = ref(true)
const volumetricJitter = ref(true)
const isSimulatingVolumetric = ref(false)

const currentVolumetricStance = computed(() => {
  return volumetricStances.find(s => s.id === selectedVolumetricStanceId.value) || volumetricStances[0]
})

const activeStanceColorGradient = computed(() => {
  return currentVolumetricStance.value.gradient
})

const applyVolumetricStance = (stanceId: string) => {
  selectedVolumetricStanceId.value = stanceId
  const st = volumetricStances.find(s => s.id === stanceId)
  if (st) {
    volumetricDensity.value = st.density
    volumetricSteps.value = st.steps
    volumetricAlbedo.value = st.albedo
    volumetricExposure.value = st.exposure
    volumetricAnisotropy.value = st.anisotropy
    volumetricDenoise.value = st.denoise
    volumetricJitter.value = st.jitter
    message.info(`已切换至【${st.name}】体积光线步进渲染预设`)
  }
}

const resetVolumetricParams = () => {
  applyVolumetricStance('god_rays')
}

const volumetricSimulationLogs = ref<string[]>([
  '系统就绪: Godot 4.6 LTS Forward+ Clustered 体积光线步进内核加载完毕',
  '视锥体体素化网格: Froxel 160x90x64 分簇深度分配完成',
  '当前相函数: Henyey-Greenstein (g = 0.76 各向异性 Mie 散射)',
  'ACES 电影曲线映射: Filmic SMPTE-2065 预备'
])

const volumetricMetrics = computed(() => {
  const sigma_s = (volumetricDensity.value * volumetricAlbedo.value).toFixed(3)
  const sigma_a = (volumetricDensity.value * (1.0 - volumetricAlbedo.value)).toFixed(3)
  const sigma_t = volumetricDensity.value.toFixed(3)
  const transmittance = (Math.exp(-volumetricDensity.value * 12.0) * 100).toFixed(1)
  
  let baseLatency = volumetricSteps.value * 0.038 * (1.0 + volumetricDensity.value * 0.28)
  if (volumetricAnisotropy.value) baseLatency *= 1.15
  if (volumetricDenoise.value) baseLatency *= 1.10
  const latencyMs = baseLatency.toFixed(2)

  const vramUsage = Math.round(72 + volumetricSteps.value * 1.25 + (volumetricDenoise.value ? 24 : 0))

  let rating = 'Forward+ Clustered 极致'
  if (baseLatency > 2.5) {
    rating = '重载超分 (需 FSR 介入)'
  } else if (baseLatency > 1.5) {
    rating = '桌面高性能稳态'
  } else {
    rating = '掌机/移动超高帧'
  }

  return {
    sigma_s,
    sigma_a,
    sigma_t,
    transmittance,
    latencyMs,
    vramUsage,
    rating
  }
})

const simulateVolumetricRaymarching = () => {
  isSimulatingVolumetric.value = true
  const now = new Date()
  const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  volumetricSimulationLogs.value = [
    `[${ts}] 🚀 激发全色调体积雾光线步进管线推演...`,
    `[${ts}] 阶段 1: 蓝噪点低差异光线抖动采样注入 (Jitter: ${volumetricJitter.value ? '已启用' : '关闭'})`,
    `[${ts}] 阶段 2: 沿视锥体射线步进 ${volumetricSteps.value} 层 Froxel 累加积分`,
    `[${ts}] 阶段 3: 计算 Henyey-Greenstein 相函数 (g=${volumetricAnisotropy.value ? '0.76' : '0.0'}) 与透射率 ${volumetricMetrics.value.transmittance}%`,
    `[${ts}] 阶段 4: ACES 曝光补偿 ${volumetricExposure.value > 0 ? '+' : ''}${volumetricExposure.value.toFixed(2)} EV 动态映射`,
    `[${ts}] ✨ 步进渲染解算完成！帧耗时 ${volumetricMetrics.value.latencyMs} ms，显存占用 ${volumetricMetrics.value.vramUsage} MB`
  ]

  setTimeout(() => {
    isSimulatingVolumetric.value = false
    message.success(`⚡ 体积雾光线步进演算完成！平均延迟 ${volumetricMetrics.value.latencyMs} ms`)
  }, 600)
}

const exportVolumetricLightingCertificate = () => {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  const certLines = [
    '================================================================================',
    '   光之战士：时空裂隙 (Final Fantasy: Void & Crystals)',
    '   全色调体积雾光影射线与魔导粒子光线步进渲染方案书 (v2.2.275)',
    '================================================================================',
    `颁发时间: ${timeStr}`,
    `渲染预设: ${currentVolumetricStance.value.name}`,
    '目标渲染管线: Forward+ / Clustered Froxel 3D Volume',
    '物理光学模型: Beer-Lambert Extinction + Henyey-Greenstein Phase Function',
    '',
    '【体积雾光线步进 Uniform 参数】',
    `- 雾介质基础消光密度 (Fog Media Density): ${volumetricDensity.value.toFixed(2)}`,
    `- 光线步进采样步数 (Raymarch Steps): ${volumetricSteps.value} Steps`,
    `- 单次散射反照率 (Single Scattering Albedo): ${Math.round(volumetricAlbedo.value * 100)}%`,
    `- ACES 电影曝光补偿 (Exposure Bias): ${volumetricExposure.value > 0 ? '+' : ''}${volumetricExposure.value.toFixed(2)} EV`,
    `- 各向异性正向散射: ${volumetricAnisotropy.value ? '已启用 (Henyey-Greenstein g=0.76)' : '关闭 (各向同性 g=0)'}`,
    `- 时域重投影去噪 (TAA Filter): ${volumetricDenoise.value ? '已激活 (双缓冲混叠)' : '关闭'}`,
    `- 蓝噪点射线抖动采样: ${volumetricJitter.value ? '已激活 (Blue Noise 64x64)' : '关闭'}`,
    '',
    '【物理光学指标解算成果】',
    `- 介质散射系数 (σs): ${volumetricMetrics.value.sigma_s}`,
    `- 介质吸收系数 (σa): ${volumetricMetrics.value.sigma_a}`,
    `- 综合消光系数 (σt): ${volumetricMetrics.value.sigma_t}`,
    `- Beer-Lambert 光线透射率 T(s): ${volumetricMetrics.value.transmittance}%`,
    `- 估算 GPU 帧耗时: ${volumetricMetrics.value.latencyMs} ms`,
    `- 动态显存 VRAM 占用: ${volumetricMetrics.value.vramUsage} MB`,
    `- 综合硬件适配评级: ${volumetricMetrics.value.rating}`,
    '',
    '【底层引擎契约安全指纹】',
    '- Engine Spec: Godot 4.6 LTS / Forward+ Clustered 3D / GDScript RefCounted',
    '- Core Post-Process: volumetric_raymarching.gdshader & vfx_particle_pipeline_orchestrator.gd',
    `- Digital Fingerprint: SHA256-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`,
    '================================================================================'
  ]

  const certContent = certLines.join('\n')

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(certContent).catch(() => {})
  }

  try {
    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `volumetric_lighting_v2.2.275_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('File download fallback error:', err)
  }

  message.success('全色调体积雾光线步进渲染方案书已导出并同步至剪贴板！')
}

const godotVolumetricShaderCode = [
  'shader_type spatial;',
  'render_mode blend_add, depth_draw_never, cull_back, unshaded;',
  '',
  '// Godot 4.6 LTS - 全色调体积雾光影射线与魔导粒子光线步进后处理着色器',
  'uniform sampler2D depth_texture : hint_depth_texture, filter_linear_mipmap;',
  'uniform sampler2D screen_texture : hint_screen_texture, filter_linear_mipmap;',
  'uniform sampler2D blue_noise_tex : filter_nearest, repeat_enable;',
  '',
  'uniform float fog_density : hint_range(0.01, 1.0) = 0.18;',
  'uniform int raymarch_steps : hint_range(16, 128) = 48;',
  'uniform float scattering_albedo : hint_range(0.1, 1.0) = 0.78;',
  'uniform float g_anisotropy : hint_range(-0.9, 0.9) = 0.76;',
  'uniform vec3 light_direction = vec3(0.35, -0.85, 0.4);',
  'uniform vec4 god_ray_color : source_color = vec4(1.0, 0.88, 0.65, 1.0);',
  '',
  '// Henyey-Greenstein 相函数计算',
  'float henyey_greenstein_phase(float cos_theta, float g) {',
  '    float g2 = g * g;',
  '    return (1.0 - g2) / (4.0 * 3.14159265 * pow(1.0 + g2 - 2.0 * g * cos_theta, 1.5));',
  '}',
  '',
  'void fragment() {',
  '    vec2 uv = SCREEN_UV;',
  '    float depth = texture(depth_texture, uv).r;',
  '    vec3 ndc = vec3(uv * 2.0 - 1.0, depth);',
  '    vec4 view = INV_PROJECTION_MATRIX * vec4(ndc, 1.0);',
  '    vec3 view_dir = normalize(view.xyz / view.w);',
  '',
  '    float cos_theta = dot(view_dir, -normalize(light_direction));',
  '    float phase = henyey_greenstein_phase(cos_theta, g_anisotropy);',
  '    float jitter = texture(blue_noise_tex, uv * 8.0).r;',
  '    float step_length = 0.25;',
  '    vec3 accumulated_light = vec3(0.0);',
  '    float transmittance = 1.0;',
  '',
  '    for (int i = 0; i < raymarch_steps; i++) {',
  '        float extinction = fog_density;',
  '        float sample_transmittance = exp(-extinction * step_length);',
  '        vec3 in_scattering = god_ray_color.rgb * scattering_albedo * phase * extinction;',
  '        accumulated_light += transmittance * (in_scattering - in_scattering * sample_transmittance);',
  '        transmittance *= sample_transmittance;',
  '        if (transmittance < 0.01) break;',
  '    }',
  '',
  '    ALBEDO = accumulated_light;',
  '    ALPHA = 1.0 - transmittance;',
  '}'
].join('\n')

const godotOrchestratorCode = [
  '## vfx_particle_pipeline_orchestrator.gd',
  '## Godot 4.6 LTS - 全域魔导粒子管线与 GPU Compute 光线步进编排调度器',
  'extends RefCounted',
  'class_name VfxParticlePipelineOrchestrator',
  '',
  'signal raymarching_dispatched(steps: int, latency_ms: float)',
  'signal vram_budget_updated(allocated_mb: float)',
  '',
  'var fog_density: float = 0.18',
  'var raymarch_steps: int = 48',
  'var scattering_albedo: float = 0.78',
  'var aces_exposure: float = 0.45',
  'var enable_mie_anisotropy: bool = true',
  'var enable_temporal_denoise: bool = true',
  '',
  'func evaluate_optical_transmittance(distance: float) -> Dictionary:',
  '\tvar sigma_s: float = fog_density * scattering_albedo',
  '\tvar sigma_a: float = fog_density * (1.0 - scattering_albedo)',
  '\tvar sigma_t: float = sigma_s + sigma_a',
  '\tvar transmittance: float = exp(-sigma_t * distance)',
  '\tvar latency_ms: float = float(raymarch_steps) * 0.038 * (1.0 + fog_density * 0.28)',
  '\tif enable_mie_anisotropy:',
  '\t\tlatency_ms *= 1.15',
  '',
  '\tvar vram_mb: float = 72.0 + float(raymarch_steps) * 1.25 + (24.0 if enable_temporal_denoise else 0.0)',
  '',
  '\treturn {',
  '\t\t"sigma_s": sigma_s,',
  '\t\t"sigma_a": sigma_a,',
  '\t\t"sigma_t": sigma_t,',
  '\t\t"transmittance": transmittance,',
  '\t\t"latency_ms": latency_ms,',
  '\t\t"vram_mb": vram_mb,',
  '\t\t"certified_hash": "SHA256-" + String.num_int64(Time.get_ticks_msec()).sha256_text().substr(0, 16)',
  '\t}'
].join('\n')


// ==========================================
// 全域超光速着色器与全光谱渲染工坊 (v2.2.298)
// ==========================================
interface SpectrumArchetype {
  id: string
  name: string
  icon: string
  tag: string
  desc: string
  perk: string
  fluxMultiplier: number
}

const spectrumArchetypes: SpectrumArchetype[] = [
  {
    id: 'holographic_grating',
    name: '全息多层衍射光栅',
    icon: '🌈',
    tag: '薄膜干涉',
    desc: '纳米级周期结构光栅，诱发随视线流转的极光偏振幻彩色散',
    perk: '彩虹光栅偏振率 99.8%',
    fluxMultiplier: 1.25
  },
  {
    id: 'tachyon_dispersion',
    name: '快子相干柯西色散',
    icon: '⚡',
    tag: '切伦科夫蓝光',
    desc: '超光速粒子穿透以太介质引发的三棱镜折射，高阶色散耀眼夺目',
    perk: '双折射相位角精确锁定',
    fluxMultiplier: 1.35
  },
  {
    id: 'void_blackbody',
    name: '虚空黑体热核辐射',
    icon: '🔥',
    tag: '等离子热光',
    desc: '从 2000K 炽红平滑跃迁至 12000K 高能等离子蓝紫光子流',
    perk: '全色温普朗克辐射拟合',
    fluxMultiplier: 1.45
  },
  {
    id: 'bipolar_polarization',
    name: '两仪双极偏振以太流',
    icon: '☯️',
    tag: '量子旋光',
    desc: '光暗双极波动呈现左旋与右旋圆偏振，交融处产生空间量子涟漪',
    perk: '圆偏振时空量子干涉',
    fluxMultiplier: 1.30
  }
]

const selectedSpectrumId = ref<string>('holographic_grating')

// 4 维连续滑块参数
const gratingDensity = ref<number>(600)
const dispersionIndex = ref<number>(1.65)
const colorTemperature = ref<number>(6500)
const rayBounceDepth = ref<number>(4)

// 3 大光栅保护断路器
const temporalDenoiseTSR = ref<boolean>(true)
const photosensitiveAegis = ref<boolean>(true)
const vramZeroJitterLock = ref<boolean>(true)

const currentSpectrum = computed(() => {
  return spectrumArchetypes.find(s => s.id === selectedSpectrumId.value) || spectrumArchetypes[0]
})

const calculatedFrameLatency = computed(() => {
  let latency = 1.2
  latency += (gratingDensity.value / 1200) * 0.8
  latency += (rayBounceDepth.value / 8) * 1.2
  if (temporalDenoiseTSR.value) latency += 0.25
  if (vramZeroJitterLock.value) latency -= 0.35
  return Math.max(1.1, latency)
})

const calculatedPhotonFlux = computed(() => {
  const baseFlux = 250000
  const tempBonus = (colorTemperature.value / 1000) * 45000
  const dispersionBonus = Math.round(dispersionIndex.value * 55000)
  return Math.round((baseFlux + tempBonus + dispersionBonus) * currentSpectrum.value.fluxMultiplier)
})

const calculatedVramUsage = computed(() => {
  let vram = 580
  vram += Math.round((gratingDensity.value / 1200) * 320)
  vram += rayBounceDepth.value * 65
  if (temporalDenoiseTSR.value) vram += 80
  if (vramZeroJitterLock.value) vram -= 120
  return Math.max(450, vram)
})

const visualEngineRank = computed(() => {
  if (calculatedFrameLatency.value <= 2.2 && calculatedPhotonFlux.value >= 700000) return 'EX 终极全息天穹级'
  if (calculatedFrameLatency.value <= 3.0) return 'SS 电影级超感光影'
  if (calculatedFrameLatency.value <= 4.0) return 'S 极境次世代光追'
  return 'A 级标准魔导渲染'
})

const resetSpectrumParameters = () => {
  gratingDensity.value = 600
  dispersionIndex.value = 1.65
  colorTemperature.value = 6500
  rayBounceDepth.value = 4
  temporalDenoiseTSR.value = true
  photosensitiveAegis.value = true
  vramZeroJitterLock.value = true
  message?.info('光谱着色器参数已重置为黄金标准配置')
}

// 五阶段仿真推演
const isSimulatingSpectrum = ref<boolean>(false)
const spectrumSimulationStep = ref<number>(0)
interface SpectrumLogItem {
  text: string
  color?: string
}
const spectrumLogs = ref<SpectrumLogItem[]>([])

const spectrumStages = [
  { id: 1, title: '光栅着色器编译初始化', desc: '构建纳米微结构与柯西色散表' },
  { id: 2, title: '以太介质注入与降噪', desc: '就绪 TAA/TSR 与光敏性防过曝' },
  { id: 3, title: '光线追踪多重反弹采样', desc: '解算多阶焦散互射与热辐射' },
  { id: 4, title: '圆偏振交涉干涉滤波', desc: '执行 ACES 电影级色调映射' },
  { id: 5, title: '全色调全息天穹完成', desc: '生成帧缓冲并导出光谱证书' }
]

const runSpectrumSimulation = async () => {
  if (isSimulatingSpectrum.value) return
  isSimulatingSpectrum.value = true
  spectrumSimulationStep.value = 0
  spectrumLogs.value = []

  const appendLog = (text: string, color?: string) => {
    spectrumLogs.value.push({ text, color })
  }

  appendLog('[INIT] 启动全域超光速着色器与全光谱渲染管线...', 'text-amber-400 font-bold')
  await new Promise(r => setTimeout(r, 400))

  // Step 1
  spectrumSimulationStep.value = 1
  appendLog(`[STEP 1] 选定流派【${currentSpectrum.value.name}】，光栅密度 ${gratingDensity.value} 条/mm，柯西色散指数 ${dispersionIndex.value.toFixed(2)}。`, 'text-cyan-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 2
  spectrumSimulationStep.value = 2
  appendLog(`[STEP 2] 时间序列降噪 TSR: ${temporalDenoiseTSR.value ? '已就绪' : '未开启'}；光敏性安全防护: ${photosensitiveAegis.value ? '已开启 (防过曝)' : '未开启'}。`, 'text-purple-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 3
  spectrumSimulationStep.value = 3
  appendLog(`[STEP 3] 色温 ${colorTemperature.value} K 黑体辐射采样，光追反弹 ${rayBounceDepth.value} 次，辐射通量达 ${calculatedPhotonFlux.value.toLocaleString()} Lux！`, 'text-rose-400 font-bold')
  await new Promise(r => setTimeout(r, 500))

  // Step 4
  spectrumSimulationStep.value = 4
  appendLog(`[STEP 4] 显存零抖动锁相: 占用仅 ${calculatedVramUsage.value} MB，帧延迟 ${calculatedFrameLatency.value.toFixed(2)} ms，极速 ${Math.round(1000 / calculatedFrameLatency.value)} FPS！`, 'text-emerald-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 5
  spectrumSimulationStep.value = 5
  appendLog(`[SUCCESS] 全息光谱渲染推演圆满完成！认证位阶: 【${visualEngineRank.value}】，全域光子品质极境！`, 'text-amber-300 font-bold')
  isSimulatingSpectrum.value = false
  message?.success('全息光谱渲染推演圆满成功！')
}

const exportSpectrumCertificate = () => {
  const certData = {
    studio: 'Holographic Refraction & Full-Spectrum Rendering Studio v2.2.298',
    spectrum: currentSpectrum.value.name,
    gratingDensity: gratingDensity.value,
    dispersionIndex: dispersionIndex.value,
    colorTemperature: colorTemperature.value,
    rayBounceDepth: rayBounceDepth.value,
    calculatedFrameLatency: calculatedFrameLatency.value,
    calculatedPhotonFlux: calculatedPhotonFlux.value,
    calculatedVramUsage: calculatedVramUsage.value,
    visualEngineRank: visualEngineRank.value,
    timestamp: new Date().toISOString(),
    sha256Certificate: 'HOLO-SPECTRUM-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(16).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `holographic_spectrum_certificate_${certData.sha256Certificate}.json`
  a.click()
  URL.revokeObjectURL(url)
  message?.success(`已导出光谱方案书: ${certData.sha256Certificate}`)
}

// 源码展台
type SpectrumScriptKey = 'grating_shader' | 'renderer_pipeline' | 'vram_guard'

const activeSpectrumScriptTab = ref<SpectrumScriptKey>('grating_shader')

const spectrumScriptTabs = [
  { key: 'grating_shader' as const, name: '全息光栅着色器' },
  { key: 'renderer_pipeline' as const, name: '全光谱管线编排器' },
  { key: 'vram_guard' as const, name: '显存防溢出控制器' }
]

const spectrumScriptCodes: Record<SpectrumScriptKey, string> = {
  grating_shader: `shader_type spatial;
render_mode blend_mix, depth_draw_opaque, cull_back, diffuse_burley, specular_schlick_ggx;

// 最终幻想：时空之轮 - 全息衍射光栅与柯西色散着色器
// 文件路径: res://shaders/vfx/holographic_grating_spectrum.gdshader
// 引擎版本: Godot Engine 4.6 LTS

uniform float grating_density : hint_range(100.0, 1200.0) = 600.0;
uniform float dispersion_cauchy : hint_range(1.1, 2.5) = 1.65;
uniform float color_temp_k : hint_range(2000.0, 12000.0) = 6500.0;
uniform sampler2D spectral_lut : hint_default_white;

vec3 blackbody_radiation(float temp) {
    float t = temp / 100.0;
    float r = t <= 66.0 ? 255.0 : 329.698727446 * pow(t - 60.0, -0.1332047592);
    float g = t <= 66.0 ? 99.4708025861 * log(t) - 161.1195681661 : 288.1221695283 * pow(t - 60.0, -0.0755148492);
    float b = t >= 66.0 ? 255.0 : (t <= 19.0 ? 0.0 : 138.5177312231 * log(t - 10.0) - 305.0447927307);
    return clamp(vec3(r, g, b) / 255.0, 0.0, 1.0);
}

void fragment() {
    vec3 view_dir = normalize(VIEW);
    vec3 normal = normalize(NORMAL);
    float n_dot_v = max(dot(normal, view_dir), 0.0);

    // 纳米薄膜衍射波长偏移
    float wavelength_shift = sin(n_dot_v * grating_density * 0.01) * dispersion_cauchy;
    vec3 rainbow_specular = texture(spectral_lut, vec2(fract(wavelength_shift), 0.5)).rgb;
    vec3 radiance_base = blackbody_radiation(color_temp_k);

    ALBEDO = radiance_base * 0.4;
    EMISSION = rainbow_specular * (1.0 - n_dot_v) * 2.5;
    ROUGHNESS = 0.08;
    METALLIC = 0.85;
}
`,

  renderer_pipeline: `class_name FullSpectrumRendererPipeline
extends RefCounted

## 最终幻想：时空之轮 - 全光谱渲染管线调度编排器
## 文件路径: res://scripts/vfx/full_spectrum_renderer_pipeline.gd
## 引擎版本: Godot Engine 4.6 LTS

signal spectrum_pass_completed(frame_latency_ms: float, vram_usage_mb: int)

var grating_density: float = 600.0
var bounce_depth: int = 4
var tsr_denoise_enabled: bool = true

func execute_spectrum_compute(color_temp: float) -> Dictionary:
    var latency: float = 1.2 + (grating_density / 1200.0 * 0.8) + (float(bounce_depth) / 8.0 * 1.2)
    if tsr_denoise_enabled:
        latency += 0.25

    var vram: int = 580 + int(grating_density / 1200.0 * 320.0) + bounce_depth * 65
    spectrum_pass_completed.emit(latency, vram)

    return {
        "frame_latency_ms": latency,
        "vram_mb": vram,
        "color_temperature": color_temp,
        "certified_hash": "HOLO-SPEC-" + String.num_int64(Time.get_ticks_msec()).sha256_text().substr(0, 16)
    }
`,

  vram_guard: `class_name VramJitterFreeMemoryGuard
extends RefCounted

## 最终幻想：时空之轮 - 显存防溢出零抖动保护控制器
## 文件路径: res://scripts/vfx/vram_jitter_free_memory_guard.gd
## 引擎版本: Godot Engine 4.6 LTS

const MAX_SAFE_VRAM_MB: int = 3800

static func monitor_and_throttle(current_usage_mb: int) -> Dictionary:
    var is_critical: bool = current_usage_mb > MAX_SAFE_VRAM_MB
    return {
        "is_throttled": is_critical,
        "recommended_lod_bias": 1.5 if is_critical else 1.0,
        "downsample_factor": 0.75 if is_critical else 1.0,
        "action": "DOWNSAMPLE_NON_CRITICAL_BUFFERS" if is_critical else "OPTIMAL_BANDWIDTH"
    }
`
}

const currentSpectrumScriptCode = computed(() => {
  return spectrumScriptCodes[activeSpectrumScriptTab.value]
})

const copySpectrumScript = () => {
  navigator.clipboard.writeText(currentSpectrumScriptCode.value)
  message?.success('已复制 Godot 4.6 LTS 脚本源码到剪贴板！')
}


// ==========================================
// 全景像素画廊、高维壁纸渲染与动态着色器工坊 (v2.2.320)
// ==========================================
const scrollToPanoramicStudio = () => {
  document.getElementById('panoramic-wallpaper-studio')?.scrollIntoView({ behavior: 'smooth' })
}

const selectedPanoramicArchetype = ref('singularity_rift')
const panoramicArchetypes = [
  {
    id: 'singularity_rift',
    name: '太古次元裂隙全景',
    icon: '🌀',
    typeTag: '黑洞吸积盘',
    tagClass: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    desc: '高维时空裂隙吸积盘扭曲，支持 4K 深度映射与星云旋涡动态流体模拟。',
    shaderCore: 'AccretionDiskCurvature.gdshader',
    resSpec: '3840x2160 60FPS'
  },
  {
    id: 'floating_corang',
    name: '浮空圣城柯朗全景',
    icon: '🏰',
    typeTag: '白昼黄昏渐变',
    tagClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    desc: '日夜交替光线投射，体积云穿透光芒与漂浮浮空大陆水晶光轨流淌。',
    shaderCore: 'VolumetricAtmosphereSun.gdshader',
    resSpec: '3840x2160 120FPS'
  },
  {
    id: 'kuza_ancient_ruins',
    name: '库扎封印禁地全景',
    icon: '🏛️',
    typeTag: '幽邃紫暗微光',
    tagClass: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    desc: '太古十二神兵封印台符文脉冲呼吸，地面虚空以太地裂与时空粉尘微粒。',
    shaderCore: 'KuzaSealedRunePulse.gdshader',
    resSpec: '3840x2160 60FPS'
  },
  {
    id: 'divine_wyrm_lair',
    name: '次元神龙之巢全景',
    icon: '🐉',
    typeTag: '终焉星空龙息',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    desc: '次元神龙终焉领域，流光溢彩的龙息粒子与虚空反射镜面实时折射。',
    shaderCore: 'DragonBreathVoidMirror.gdshader',
    resSpec: '3840x2160 144FPS'
  }
]

const shaderFpsBudget = ref(60)
const superSampleFactor = ref(2.0)
const chromaticAberration = ref(0.35)
const pixelGridDensity = ref(256)

const enableParallaxMouseTracking = ref(true)
const enableRealtimeScreenRefraction = ref(true)
const enableLosslessWallpaperExport = ref(true)

const isPanoramicSimulating = ref(false)
const panoramicSimProgress = ref(0)
const panoramicSimStep = ref('')
const panoramicLog = ref<string[]>([])

const frameTimeLatencyMs = computed(() => {
  const base = 1000.0 / shaderFpsBudget.value
  const factor = (superSampleFactor.value / 2.0) * 0.85
  return parseFloat((base * 0.45 * factor).toFixed(2))
})

const vramBandwidthMb = computed(() => {
  let mb = 1200 + (superSampleFactor.value * 380) + (shaderFpsBudget.value * 4.5)
  if (enableRealtimeScreenRefraction.value) mb += 280
  return Math.round(mb)
})

const visualFidelityPct = computed(() => {
  let pct = 94.0 + (superSampleFactor.value * 1.5) - (chromaticAberration.value * 0.8) + (pixelGridDensity.value / 512) * 1.8
  return Math.min(99.9, parseFloat(pct.toFixed(1)))
})

const panoramicTierBadge = computed(() => {
  if (superSampleFactor.value >= 3.0 && shaderFpsBudget.value >= 120) return 'EX·超次元 4K HDR 原画神殿'
  if (superSampleFactor.value >= 2.0 && shaderFpsBudget.value >= 60) return 'SSS·极意高维着色器渲染'
  if (superSampleFactor.value >= 1.5) return 'SS·高保真像素视差壁纸'
  return 'S·经典时空像素实机'
})

const selectPanoramicArchetype = (id: string) => {
  selectedPanoramicArchetype.value = id
  const target = panoramicArchetypes.find(a => a.id === id)
  if (target) {
    message?.info(`已载入全景壁纸视界：${target.name}`)
  }
}

const resetPanoramicDefaults = () => {
  shaderFpsBudget.value = 60
  superSampleFactor.value = 2.0
  chromaticAberration.value = 0.35
  pixelGridDensity.value = 256
  enableParallaxMouseTracking.value = true
  enableRealtimeScreenRefraction.value = true
  enableLosslessWallpaperExport.value = true
  message?.success('已重置全景壁纸着色器参数至出厂基准！')
}

const runPanoramicSimulation = () => {
  if (isPanoramicSimulating.value) return
  isPanoramicSimulating.value = true
  panoramicSimProgress.value = 0
  panoramicLog.value = []

  const steps = [
    { p: 20, step: '烘焙 4K 全景多层深度图与法线贴图缓冲...', log: '深度图烘焙完毕，8 层视差景深平面分离就绪。' },
    { p: 45, step: '编译并热注入动态着色器代码至 Godot 渲染视口...', log: '着色器核心注入完成，以太色差与微秒光轨生效。' },
    { p: 70, step: '建立屏幕空间反射 (SSR) 与鼠标位移插值矩阵...', log: '视差陀螺仪校准成功，光标平滑滞后追踪系数 0.08。' },
    { p: 90, step: '启动 TSR 4K 超采样抗锯齿与像素点阵网格化...', log: '超分重构完成，画面综合保真度达到 ' + visualFidelityPct.value + '%。' },
    { p: 100, step: '动态壁纸渲染推演收敛，生成方案校验哈希！', log: `渲染帧耗时: ${frameTimeLatencyMs.value} ms，显存占用: ${vramBandwidthMb.value} MB，认证: ${panoramicTierBadge.value}。` }
  ]

  let idx = 0
  const interval = setInterval(() => {
    if (idx < steps.length) {
      panoramicSimProgress.value = steps[idx].p
      panoramicSimStep.value = steps[idx].step
      panoramicLog.value.push(steps[idx].log)
      idx++
    } else {
      clearInterval(interval)
      isPanoramicSimulating.value = false
      message?.success('全景壁纸与着色器沙盘推演圆满成功！')
    }
  }, 250)
}

const exportPanoramicCert = () => {
  const cert = {
    standard: 'GODOT-4.6-LTS-PANORAMIC-SHADER-SPEC',
    version: 'v2.2.320',
    timestamp: new Date().toISOString(),
    archetype: selectedPanoramicArchetype.value,
    fps_budget: shaderFpsBudget.value,
    super_sample: superSampleFactor.value,
    chromatic_aberration: chromaticAberration.value,
    pixel_grid_density: pixelGridDensity.value,
    mouse_parallax: enableParallaxMouseTracking.value,
    screen_refraction: enableRealtimeScreenRefraction.value,
    lossless_export: enableLosslessWallpaperExport.value,
    frame_latency_ms: frameTimeLatencyMs.value,
    vram_bandwidth_mb: vramBandwidthMb.value,
    visual_fidelity_pct: visualFidelityPct.value,
    tier: panoramicTierBadge.value,
    cert_sha256: '4f8e9a2b5d71c320e8b1965ad6e7c1f04b28d9a4e3217c0a98f7e21b5c4d320a'
  }
  const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `panoramic_wallpaper_cert_${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  message?.success('已导出全景壁纸方案认证证书！')
}

const activePanoramicScriptTab = ref<'shader' | 'renderer' | 'parallax'>('shader')

const panoramicScriptCodes = {
  shader: `shader_type canvas_item;

// 最终幻想：时空之轮 - 高维全景动态壁纸着色器
// 文件路径: res://shaders/vfx/panoramic_visual_shader.gdshader
// 引擎版本: Godot Engine 4.6 LTS

uniform float chromatic_amount : hint_range(0.0, 1.0) = 0.35;
uniform float pixel_density : hint_range(64.0, 512.0) = 256.0;
uniform vec2 parallax_offset = vec2(0.0, 0.0);
uniform sampler2D background_texture : hint_screen_texture, filter_linear_mipmap;

void fragment() {
    // 像素点阵化采样
    vec2 grid_uv = floor((SCREEN_UV + parallax_offset * 0.05) * pixel_density) / pixel_density;
    
    // 柯西色散偏移采样
    float r = texture(background_texture, grid_uv + vec2(chromatic_amount * 0.003, 0.0)).r;
    float g = texture(background_texture, grid_uv).g;
    float b = texture(background_texture, grid_uv - vec2(chromatic_amount * 0.003, 0.0)).b;
    
    COLOR = vec4(r, g, b, 1.0);
}
`,

  renderer: `class_name WallpaperViewportRenderer
extends RefCounted

## 最终幻想：时空之轮 - 4K 动态壁纸视口渲染与超分降采样器
## 文件路径: res://scripts/vfx/wallpaper_viewport_renderer.gd
## 引擎版本: Godot Engine 4.6 LTS

signal frame_rendered(latency_ms: float, vram_mb: int)

static func render_frame(
    fps: int,
    super_sample: float,
    has_refraction: bool
) -> Dictionary:
    var latency: float = (1000.0 / float(fps)) * 0.45 * (super_sample / 2.0)
    var vram: int = 1200 + int(super_sample * 380.0) + int(float(fps) * 4.5)
    if has_refraction:
        vram += 280
        
    return {
        "latency_ms": latency,
        "vram_mb": vram,
        "super_sample_factor": super_sample,
        "status": "RENDER_PIPELINE_OK"
    }
`,

  parallax: `class_name ParallaxCameraController
extends Node2D

## 最终幻想：时空之轮 - 动态视差摄像机与鼠标位移平滑插值控制器
## 文件路径: res://scripts/vfx/parallax_camera_controller.gd
## 引擎版本: Godot Engine 4.6 LTS

@export var smooth_speed: float = 5.0
@export var max_offset: Vector2 = Vector2(30.0, 20.0)

var _target_offset: Vector2 = Vector2.ZERO
var current_offset: Vector2 = Vector2.ZERO

func _input(event: InputEvent) -> void:
    if event is InputEventMouseMotion:
        var viewport_size: Vector2 = get_viewport_rect().size
        var norm_mouse: Vector2 = (event.position / viewport_size) * 2.0 - Vector2.ONE
        _target_offset = norm_mouse * max_offset

func _process(delta: float) -> void:
    current_offset = current_offset.lerp(_target_offset, smooth_speed * delta)
    position = current_offset
`
}

const currentPanoramicScriptCode = computed(() => {
  return panoramicScriptCodes[activePanoramicScriptTab.value]
})

const copyPanoramicScript = () => {
  navigator.clipboard.writeText(currentPanoramicScriptCode.value)
  message?.success('已复制 Godot 4.6 LTS 全景壁纸着色器源码到剪贴板！')
}

</script>

<style scoped>
.text-glow-cyan {
  text-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
}
</style>
