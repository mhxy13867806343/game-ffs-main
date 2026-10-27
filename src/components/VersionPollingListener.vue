<template>
  <!-- 纯逻辑/监听组件：基于 version-polling 实现 Web Worker 静默轮询检测新版本发布 -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useDialog } from 'naive-ui'
import { createVersionPolling, type VersionPolling } from 'version-polling'

let poller: VersionPolling | null = null
const dialog = useDialog()

// 计算精确的 index.html 绝对路径，消除 GitHub Pages 路由下的 301 重定向隐患
const getHtmlFileUrl = () => {
  const origin = window.location.origin
  let pathname = window.location.pathname
  if (!pathname.endsWith('/')) {
    pathname += '/'
  }
  return `${origin}${pathname}index.html`
}

// 弹出版本更新对话框
const showUpdateDialog = (onRefresh?: () => void, onCancel?: () => void) => {
  dialog.info({
    title: '🚀 发现新版本更新',
    content: '检测到《光之战士：时空裂隙》官方系统与文档已部署最新发布版本。为了确保所有数值模拟器、风土地图与数据正常运作，建议立即刷新页面。',
    positiveText: '立即刷新',
    negativeText: '稍后提醒',
    closable: true,
    maskClosable: false,
    onPositiveClick: () => {
      if (onRefresh) {
        onRefresh()
      } else {
        window.location.reload()
      }
    },
    onNegativeClick: () => {
      if (onCancel) onCancel()
    },
    onClose: () => {
      if (onCancel) onCancel()
    }
  })
}

onMounted(() => {
  const htmlFileUrl = getHtmlFileUrl()

  try {
    poller = createVersionPolling({
      vcType: 'chunkHash',
      chunkName: 'index',
      htmlFileUrl,
      pollingInterval: 30 * 1000, // 轮询间隔优化为 30 秒（Web Worker 异步线程静默轮询，零卡顿）
      eventTriggerList: ['focus'], // 切换回浏览器标签页或窗口获得焦点时立即探测一次
      silent: false, // 生产环境与各模式均保持活跃监听
      onUpdate: (self) => {
        showUpdateDialog(
          () => self.onRefresh(),
          () => self.onCancel()
        )
      }
    })

    // 挂载全局测试钩子，方便用户随时在浏览器控制台或页面按钮体验弹窗交互
    if (typeof window !== 'undefined') {
      ;(window as unknown as { __simulateVersionUpdate?: () => void }).__simulateVersionUpdate = () => {
        showUpdateDialog(
          () => {
            console.log('[VersionPolling] 模拟用户点击：立即刷新')
            window.location.reload()
          },
          () => {
            console.log('[VersionPolling] 模拟用户点击：稍后提醒')
          }
        )
      }
      console.log(`[VersionPolling] 异步版本监听已就绪 (监控目标: ${htmlFileUrl}, 轮询间隔: 30s)`)
      console.log('[VersionPolling] 开发者测试提示: 可在控制台运行 window.__simulateVersionUpdate() 立即体验弹窗效果')
    }
  } catch (err) {
    console.warn('[VersionPolling] 初始化版本轮询失败:', err)
  }
})

onUnmounted(() => {
  if (poller) {
    poller.stop()
    poller = null
  }
  if (typeof window !== 'undefined') {
    delete (window as unknown as { __simulateVersionUpdate?: () => void }).__simulateVersionUpdate
  }
})
</script>
