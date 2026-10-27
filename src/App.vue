<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <div class="min-h-screen bg-[#0a0d14] text-[#f3f4f6] font-sans antialiased flex flex-col">
              <AppHeader
                v-if="isRootPortal"
                v-model="searchKeyword"
                :total-games="gameList.length"
                :total-docs="docList.length"
              />

              <div class="flex-1 w-full flex flex-col">
                <router-view :search-query="searchKeyword" />
              </div>

              <!-- 全局悬浮一键分享组件 (所有页面全覆盖，基于 overtrue/share.js) -->
              <SocialShareBar mode="floating" />
            </div>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import AppHeader from '@/components/AppHeader.vue'
import SocialShareBar from '@/components/SocialShareBar.vue'
import { gameList, docList } from '@/data/games'

const route = useRoute()
const searchKeyword = ref('')

const isRootPortal = computed(() => {
  return route.path === '/'
})

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3b82f6',
    primaryColorHover: '#60a5fa',
    primaryColorPressed: '#2563eb',
    baseColor: '#0b0e14'
  }
}
</script>
