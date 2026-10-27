<template>
  <!-- 纯逻辑/监听组件：基于 version-polling 实现 Web Worker 静默轮询检测新版本发布 -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useDialog } from 'naive-ui'
import { createVersionPolling, type VersionPolling } from 'version-polling'

let poller: VersionPolling | null = null
const dialog = useDialog()

onMounted(() => {
  try {
    poller = createVersionPolling({
      vcType: 'chunkHash',
      chunkName: 'index',
      pollingInterval: 60 * 1000, // 每 60 秒通过 Web Worker 异步检测一次 index.html 的 script hash 变化
      silent: import.meta.env.DEV, // 开发模式静默，避免 HMR 热重载频繁打扰
      onUpdate: (self) => {
        dialog.info({
          title: '🚀 发现新版本更新',
          content: '检测到《光之战士：时空裂隙》游戏文档与核心系统已部署最新版本。为了确保所有数值模拟器、地图风土与系统逻辑正常运作，建议立即刷新页面。',
          positiveText: '立即刷新',
          negativeText: '稍后提醒',
          closable: true,
          maskClosable: false,
          onPositiveClick: () => {
            self.onRefresh()
          },
          onNegativeClick: () => {
            self.onCancel()
          },
          onClose: () => {
            self.onCancel()
          }
        })
      }
    })
  } catch (err) {
    console.warn('[VersionPolling] 初始化版本轮询失败:', err)
  }
})

onUnmounted(() => {
  if (poller) {
    poller.stop()
    poller = null
  }
})
</script>
