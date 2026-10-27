<template>
  <footer class="w-full bg-[#070a10] border-t border-[#182335] mt-16 py-10 text-xs text-gray-500">
    <div class="content-container flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
          🪶
        </div>
        <div>
          <div class="text-gray-300 font-bold text-sm">《裂空之羽》Feather of the Sky-Splitter</div>
          <div class="text-[11px] text-gray-500">单机 2D 横版卷轴飞行射击 + 角色养成 · 全 8 章 48 关 · 七色彩虹主线</div>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-6 text-gray-400">
        <router-link to="/feather/play" class="hover:text-amber-400 transition-colors">试玩作战</router-link>
        <router-link to="/feather/stages" class="hover:text-amber-400 transition-colors">关卡档案</router-link>
        <router-link to="/feather/characters" class="hover:text-amber-400 transition-colors">职业与工坊</router-link>
        <router-link to="/feather/doc" class="hover:text-amber-400 transition-colors">策划文档 v1.3</router-link>
        <router-link to="/" class="hover:text-cyan-400 transition-colors">游戏中心 Portal</router-link>
        <router-link to="/vble" class="hover:text-cyan-400 transition-colors">最终幻想：时空之轮</router-link>
      </div>
    </div>
    <div class="content-container mt-6 pt-6 border-t border-[#111827] flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-600 gap-3">
      <div>原创单机游戏企划 · 纯单机离线游玩 · 无需联网 · 无课金抽卡</div>
      <!-- 社交一键分享组件 -->
      <SocialShareBar mode="inline" :show-label="false" />
      <div>集成于 GAME FFS 统一游戏中心 (Hash 路由)</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SocialShareBar from '@/components/SocialShareBar.vue'
</script>
