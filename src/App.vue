<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <div class="min-h-screen bg-[#0a0d14] text-[#f3f4f6] font-sans antialiased flex flex-col">
              <!-- 大厅首页展示顶部 Header -->
              <AppHeader
                v-if="!isPlayRoute"
                v-model="searchKeyword"
                :total-games="gameList.length"
              />

              <div class="flex-1 w-full flex flex-col">
                <router-view :search-query="searchKeyword" />
              </div>
            </div>
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import AppHeader from '@/components/AppHeader.vue'
import { gameList } from '@/data/games'

const route = useRoute()
const searchKeyword = ref('')

const isPlayRoute = computed(() => {
  return route.name === 'play'
})

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3b82f6',
    primaryColorHover: '#60a5fa',
    primaryColorPressed: '#2563eb',
    baseColor: '#0b0e14'
  },
  Card: {
    color: '#131926',
    borderColor: '#222d42'
  }
}
</script>
