<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <div class="min-h-screen bg-[#0a0d14] text-[#f3f4f6] font-sans antialiased flex flex-col">
              <!-- 当不是沉浸式单机全屏畅玩路由时显示顶部导航 -->
              <AppHeader v-if="!isPurePlayView" />

              <div class="flex-1 w-full flex flex-col">
                <router-view />
              </div>
            </div>
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()

// 当在 /play/:id 游戏运行页时，使用内部专门控制条，隐藏大厅全局 Header
const isPurePlayView = computed(() => {
  return route.name === 'play'
})

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3b82f6',
    primaryColorHover: '#60a5fa',
    primaryColorPressed: '#2563eb',
    primaryColorSuppl: '#3b82f6',
    baseColor: '#0b0e14'
  },
  Card: {
    color: '#131926',
    borderColor: '#222d42'
  },
  Button: {
    textColorPrimary: '#ffffff'
  }
}
</script>
