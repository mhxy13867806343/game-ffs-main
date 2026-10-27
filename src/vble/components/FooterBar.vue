<template>
  <footer class="bg-[#080c16]/95 border-t border-white/8 py-4.5 px-4 mt-10 text-[0.85rem] text-gray-500">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-3">
      <div class="text-center md:text-left leading-relaxed text-xs">
        <span class="text-amber-400 font-medium">最终幻想：时空之轮 (FF Dimensions)</span>
        <span class="mx-2 text-gray-700">|</span>
        <span>2026 Next-Gen JRPG Official Game Portal</span>
      </div>

      <!-- 社交一键分享组件 -->
      <SocialShareBar mode="inline" :show-label="false" />

      <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
        <router-link
          v-for="link in footerQuickLinks"
          :key="link.path"
          :to="link.path"
          class="text-gray-400 no-underline transition-colors whitespace-nowrap hover:text-cyan-400"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { footerQuickLinks } from '../config/navigation'
import SocialShareBar from '@/components/SocialShareBar.vue'
</script>
