<template>
  <header class="sticky top-0 z-50 w-full bg-[#0a0e17]/90 backdrop-blur-md border-b border-[#1e293b] select-none">
    <div class="content-container h-16 flex items-center justify-between">
      <!-- Brand Logo -->
      <router-link to="/feather" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
          <span class="text-xl">🪶</span>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="text-lg font-black tracking-wider text-white group-hover:text-amber-400 transition-colors">
              裂空之羽
            </span>
            <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300">
              v1.3
            </span>
          </div>
          <span class="text-[11px] text-gray-400 font-sans tracking-wide">
            Feather of the Sky-Splitter · 2D 横版飞行射击
          </span>
        </div>
      </router-link>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center gap-1">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all"
          :class="$route.path === item.path
            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
            : 'text-gray-300 hover:text-white hover:bg-white/5'"
        >
          <span class="mr-1.5">{{ item.icon }}</span>
          {{ item.name }}
        </router-link>
      </nav>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2.5">
        <router-link
          to="/feather/play"
          class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-950 font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.3)] transition-all hover:scale-105"
        >
          <span>🚀</span>
          <span>立即试玩</span>
        </router-link>

        <router-link
          to="/"
          class="px-3 py-1.5 rounded-lg bg-[#182234] hover:bg-[#233148] border border-[#2b3a55] text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>🎮</span>
          <span>返回大厅</span>
        </router-link>
      </div>
    </div>

    <!-- Mobile Navigation Bar -->
    <div class="md:hidden flex items-center justify-around px-2 py-2 bg-[#0c121e] border-t border-[#1a2538] text-xs">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center gap-0.5 px-2 py-1 rounded transition-colors"
        :class="$route.path === item.path ? 'text-amber-400 font-bold' : 'text-gray-400'"
      >
        <span>{{ item.icon }}</span>
        <span>{{ item.name }}</span>
      </router-link>
      <router-link
        to="/"
        class="flex flex-col items-center gap-0.5 px-2 py-1 rounded transition-colors text-cyan-400"
      >
        <span>🎮</span>
        <span>大厅</span>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { name: '首页概览', path: '/feather', icon: '🏠' },
  { name: '游戏试玩', path: '/feather/play', icon: '🎮' },
  { name: '8章48关', path: '/feather/stages', icon: '🗺️' },
  { name: '战机职业', path: '/feather/characters', icon: '⚔️' },
  { name: '设计文档', path: '/feather/doc', icon: '📜' }
]
</script>
