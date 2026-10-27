<template>
  <div class="min-h-screen bg-[#070a0f] text-gray-200 flex flex-col">
    <!-- 顶部极简游戏控制条 -->
    <header class="h-14 bg-[#0d121c] border-b border-[#1c2436] px-4 flex items-center justify-between z-30 shrink-0">
      <div class="flex items-center gap-3">
        <n-button
          quaternary
          size="small"
          class="text-gray-300 hover:text-white"
          @click="router.push('/')"
        >
          ← 返回大厅
        </n-button>
        <div class="h-4 w-px bg-gray-700"></div>
        <div class="flex items-center gap-2">
          <span class="text-white font-bold text-sm sm:text-base">{{ currentGame?.title || '单机游戏' }}</span>
          <span v-if="currentGame?.isReady" class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            单机就绪
          </span>
          <span v-else class="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            预留路径
          </span>
        </div>
      </div>

      <!-- 右侧控制按钮组 -->
      <div class="flex items-center gap-2">
        <n-button
          size="small"
          quaternary
          class="text-gray-300 hover:text-white hidden sm:inline-flex"
          @click="showControlsModal = true"
        >
          ⌨ 操作指南
        </n-button>

        <n-button
          size="small"
          quaternary
          class="text-gray-300 hover:text-white"
          title="重新加载游戏"
          @click="reloadIframe"
        >
          🔄 重载
        </n-button>

        <n-button
          size="small"
          quaternary
          class="text-gray-300 hover:text-white"
          title="独立窗口新标签页打开"
          @click="openExternal"
        >
          ↗ 独立窗口
        </n-button>

        <n-button
          size="small"
          type="primary"
          ghost
          class="rounded"
          @click="toggleIframeFullscreen"
        >
          ⛶ 全屏沉浸
        </n-button>
      </div>
    </header>

    <!-- 游戏视图主容器 -->
    <div ref="gameContainerRef" class="flex-1 relative w-full h-[calc(100vh-56px)] bg-black flex items-center justify-center overflow-hidden">
      <!-- 如果已经打包好 -->
      <iframe
        v-if="currentGame?.isReady"
        ref="gameIframeRef"
        :src="currentGame.playPath"
        class="w-full h-full border-none bg-black"
        allow="autoplay; fullscreen; gamepad; focus-without-user-activation *"
      ></iframe>

      <!-- 如果尚未放入打包产物 -->
      <div v-else class="max-w-lg mx-auto p-6 sm:p-8 bg-[#121824] border border-[#222e44] rounded-2xl text-center shadow-2xl m-4">
        <div class="text-4xl mb-3">📦</div>
        <h3 class="text-xl font-bold text-white mb-2">单机打包产物接入提示</h3>
        <p class="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
          该单机游戏的访问路径已配置为：
        </p>
        <div class="bg-[#0b0e14] border border-[#1f283c] rounded p-2 font-mono text-blue-300 text-xs mb-4 select-all">
          {{ currentGame?.playPath }}
        </div>
        <p class="text-xs text-gray-400 leading-relaxed mb-6">
          您只需将该游戏打包生成的文件（如 HTML、JS、WASM、资源包等）放置到工程对应目录即可立即直接单机运行！
        </p>
        <div class="flex justify-center gap-3">
          <n-button type="primary" @click="router.push('/about')">
            查看打包放置说明
          </n-button>
          <n-button quaternary @click="router.push('/')">
            返回游戏大厅
          </n-button>
        </div>
      </div>
    </div>

    <!-- 操作键位提示弹窗 -->
    <n-modal
      v-model:show="showControlsModal"
      preset="card"
      title="单机操作指南"
      style="width: 90%; max-width: 460px;"
      class="bg-[#151c2a] text-gray-200 rounded-xl"
    >
      <div class="flex flex-col gap-3">
        <div v-if="currentGame?.controls && currentGame.controls.length > 0" class="flex flex-col gap-2">
          <div
            v-for="(ctrl, i) in currentGame.controls"
            :key="i"
            class="flex items-center justify-between p-2.5 rounded bg-[#0e1420] border border-[#1e273a]"
          >
            <span class="px-2 py-0.5 rounded bg-[#1e283d] text-blue-300 font-mono text-xs font-bold">
              {{ ctrl.key }}
            </span>
            <span class="text-xs text-gray-300">{{ ctrl.action }}</span>
          </div>
        </div>
        <div v-else class="text-xs text-gray-400 text-center py-4">
          该游戏支持标准鼠标点击或触屏交互
        </div>

        <div class="mt-3 pt-3 border-t border-[#1e273a] text-[11px] text-gray-400">
          💡 提示：本单机游戏所有数据保存在本地浏览器缓存中，无需联网。
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { gameList } from '@/data/games'

const route = useRoute()
const router = useRouter()
const message = useMessage()

const gameContainerRef = ref<HTMLElement | null>(null)
const gameIframeRef = ref<HTMLIFrameElement | null>(null)
const showControlsModal = ref(false)

const currentGame = computed(() => {
  const id = route.params.id as string
  return gameList.find(g => g.id === id) || gameList[0]
})

function reloadIframe() {
  if (gameIframeRef.value) {
    const src = gameIframeRef.value.src
    gameIframeRef.value.src = ''
    setTimeout(() => {
      if (gameIframeRef.value) {
        gameIframeRef.value.src = src
        message.success('已重新载入单机游戏')
      }
    }, 50)
  }
}

function openExternal() {
  if (currentGame.value?.isReady) {
    window.open(currentGame.value.playPath, '_blank')
  } else {
    message.warning('该游戏产物尚未放置到指定路径')
  }
}

function toggleIframeFullscreen() {
  if (!gameContainerRef.value) return
  if (!document.fullscreenElement) {
    gameContainerRef.value.requestFullscreen().catch(() => {
      message.error('无法进入全屏')
    })
  } else {
    document.exitFullscreen().catch(() => {})
  }
}
</script>
