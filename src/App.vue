<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <div class="min-h-screen bg-[#0a0d14] text-[#f3f4f6] font-sans antialiased flex flex-col">
      <AppHeader
        v-model="searchKeyword"
        :total-games="gameList.length"
      />

      <div class="flex-1 w-full flex flex-col">
        <router-view :search-query="searchKeyword" />
      </div>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import AppHeader from '@/components/AppHeader.vue'
import { gameList } from '@/data/games'

const searchKeyword = ref('')

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3b82f6',
    primaryColorHover: '#60a5fa',
    primaryColorPressed: '#2563eb',
    baseColor: '#0b0e14'
  }
}
</script>
