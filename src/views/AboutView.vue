<template>
  <div class="min-h-screen flex flex-col bg-[#0b0e14] text-gray-200">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-3">
          GAME FFS · OFFLINE LAUNCHER
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-white">
          单机游戏打包接入与运行说明
        </h1>
        <p class="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl mx-auto">
          本项目是一个轻量化、纯单机、零网络依赖的游戏门户与启动器，专为管理和运行您本地打包的各类网页/离线游戏而设计。
        </p>
      </div>

      <div class="flex flex-col gap-6">
        <!-- 核心特点 -->
        <div class="bg-[#121824] border border-[#1e273a] rounded-xl p-6">
          <h2 class="text-base font-bold text-white mb-3 flex items-center gap-2">
            <span class="text-blue-400">01.</span> 纯单机离线运行原则
          </h2>
          <ul class="text-xs sm:text-sm text-gray-300 space-y-2 list-disc list-inside">
            <li><strong>零网络通信</strong>：不发起任何外部登录、统计或联网请求，即使完全断网也可以流畅运行。</li>
            <li><strong>安全与隔离</strong>：每个单机游戏在独立的沙盒或 iframe 中运行，不干扰宿主门户。</li>
            <li><strong>本地存档</strong>：单机游戏可自由使用浏览器 LocalStorage / IndexedDB 保存关卡进度。</li>
          </ul>
        </div>

        <!-- 步骤指南 -->
        <div class="bg-[#121824] border border-[#1e273a] rounded-xl p-6">
          <h2 class="text-base font-bold text-white mb-3 flex items-center gap-2">
            <span class="text-emerald-400">02.</span> 如何将您打包的游戏放入本门户
          </h2>
          <div class="space-y-4 text-xs sm:text-sm text-gray-300">
            <div>
              <p class="font-medium text-white mb-1">步骤 1：准备打包产物</p>
              <p class="text-gray-400 text-xs">
                不论是 Godot 导出的 Web (HTML5) 包、Unity WebGL 导出包、还是 Three.js / Canvas 单文件，确保其中包含入口文件（如 <code>index.html</code>）。
              </p>
            </div>

            <div>
              <p class="font-medium text-white mb-1">步骤 2：放置到工程的 <code>public/games/</code> 目录</p>
              <div class="bg-[#090d14] p-3 rounded font-mono text-xs text-blue-300 border border-[#1c2538] select-all">
                game-ffs-main/<br>
                └── public/<br>
                &nbsp;&nbsp;&nbsp;&nbsp;└── games/<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── roadster-sky-run/ &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-emerald-400"># (已就绪示例)</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── index.html<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── game.js<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── game.css<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── split-feather/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-gray-500"># (待放入 Godot 导出包)</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── ff-crystal/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-gray-500"># (待放入像素 RPG 包)</span>
              </div>
            </div>

            <div>
              <p class="font-medium text-white mb-1">步骤 3：在 <code>src/data/games.ts</code> 中配置游戏信息</p>
              <p class="text-gray-400 text-xs">
                在 <code>gameList</code> 数组中添加一项，并将 <code>playPath</code> 指向 <code>/games/你的文件夹/index.html</code>，并将 <code>isReady: true</code> 即可！
              </p>
            </div>
          </div>
        </div>

        <!-- 当前示例展示 -->
        <div class="bg-[#121824] border border-[#1e273a] rounded-xl p-6">
          <h2 class="text-base font-bold text-white mb-3 flex items-center gap-2">
            <span class="text-amber-400">03.</span> 现已就绪并可立即体验的单机游戏
          </h2>
          <div class="flex items-center justify-between p-4 rounded-lg bg-[#0c1017] border border-[#1e283d]">
            <div>
              <div class="text-sm font-bold text-white">天际跑车：极速狂飙 (Roadster Sky Run)</div>
              <div class="text-xs text-gray-400 font-mono mt-0.5">/games/roadster-sky-run/index.html</div>
            </div>
            <router-link to="/play/roadster-sky-run">
              <n-button type="primary" size="small">
                ▶ 立即单机畅玩
              </n-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
</script>
