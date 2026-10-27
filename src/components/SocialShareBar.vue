<template>
  <!-- 模式一：全局悬浮吸附展开式 (Floating Mode) -->
  <aside
    v-if="mode === 'floating'"
    class="fixed left-3 bottom-8 z-[9999] select-none flex flex-col items-start gap-2"
    aria-label="一键社交分享工具栏"
  >
    <!-- 展开后的分享面板 -->
    <transition name="share-slide">
      <div
        v-if="isOpen"
        class="bg-[#101726]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-3 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.2)] flex flex-col gap-2.5 min-w-[200px]"
      >
        <div class="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
          <span class="font-bold text-cyan-300 flex items-center gap-1.5">
            <span>📢</span>
            <span>一键社交分享</span>
          </span>
          <button
            class="text-gray-400 hover:text-white text-xs p-0.5 rounded cursor-pointer"
            @click="isOpen = false"
            title="收起分享栏"
          >
            ✕
          </button>
        </div>

        <!-- overtrue share.js 容器 -->
        <div
          ref="floatingShareContainer"
          class="social-share flex flex-wrap gap-1 items-center"
          :data-url="shareUrl"
          :data-title="shareTitle"
          :data-description="shareDesc"
          data-sites="wechat,weibo,qq,qzone,twitter,facebook"
        ></div>

        <!-- 复制当前页面链接辅助按钮 -->
        <button
          class="w-full mt-1 py-1.5 px-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          @click="copyCurrentUrl"
        >
          <span>🔗</span>
          <span>{{ copied ? '已成功复制链接！' : '复制页面网址链接' }}</span>
        </button>
      </div>
    </transition>

    <!-- 悬浮触发圆形药丸按钮 -->
    <button
      class="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_4px_20px_rgba(6,182,212,0.4)] border border-cyan-300/40 cursor-pointer transition-all hover:scale-105 active:scale-95 group"
      :class="{ '!bg-slate-800 !border-slate-600': isOpen }"
      @click="toggleShare"
      title="点击展开一键分享到微信、微博、QQ等"
    >
      <span class="text-base group-hover:rotate-12 transition-transform">📢</span>
      <span class="text-xs font-bold tracking-wider">分享本页</span>
    </button>
  </aside>

  <!-- 模式二：行内面板样式 (Inline Mode - 适用于页脚或文档底端) -->
  <div
    v-else
    class="social-share-inline flex flex-wrap items-center gap-2.5 py-2"
  >
    <span v-if="showLabel" class="text-xs text-gray-400 flex items-center gap-1 font-medium">
      <span>📢</span>
      <span>分享到：</span>
    </span>

    <div
      ref="inlineShareContainer"
      class="social-share flex items-center"
      :data-url="shareUrl"
      :data-title="shareTitle"
      :data-description="shareDesc"
      data-sites="wechat,weibo,qq,qzone,twitter,facebook"
    ></div>

    <button
      class="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs cursor-pointer flex items-center gap-1 transition-colors"
      @click="copyCurrentUrl"
      title="复制链接"
    >
      <span>🔗</span>
      <span>{{ copied ? '已复制' : '复制链接' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import 'social-share.js/dist/css/share.min.css'

const props = withDefaults(
  defineProps<{
    mode?: 'floating' | 'inline'
    title?: string
    description?: string
    showLabel?: boolean
  }>(),
  {
    mode: 'inline',
    showLabel: true
  }
)

const route = useRoute()
const isOpen = ref(false)
const copied = ref(false)
const floatingShareContainer = ref<HTMLElement | null>(null)
const inlineShareContainer = ref<HTMLElement | null>(null)

const shareUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return ''
})

const shareTitle = computed(() => {
  return props.title || (typeof document !== 'undefined' ? document.title : 'GAME FFS')
})

const shareDesc = computed(() => {
  return props.description || 'GAME FFS 官方门户与智能游戏大典'
})

function toggleShare() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      initSocialShare(floatingShareContainer.value)
    })
  }
}

async function copyCurrentUrl() {
  if (typeof window === 'undefined') return
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // 回退方案
    const input = document.createElement('input')
    input.value = window.location.href
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

async function initSocialShare(el: HTMLElement | null) {
  if (!el || typeof window === 'undefined') return

  // 动态导入 social-share.js
  try {
    // @ts-ignore
    await import('social-share.js/dist/js/social-share.min.js')
    const win = window as any
    if (typeof win.socialShare === 'function') {
      // 重新绑定配置
      win.socialShare(el, {
        url: window.location.href,
        title: shareTitle.value,
        description: shareDesc.value,
        wechatQrcodeTitle: '微信扫一扫：分享到朋友圈',
        wechatQrcodeHelper: '<p>微信扫一扫二维码</p><p>即可将当前页面分享至朋友圈或好友</p>',
        sites: ['wechat', 'weibo', 'qq', 'qzone', 'twitter', 'facebook']
      })
    }
  } catch (err) {
    console.warn('Social share init error:', err)
  }
}

onMounted(() => {
  if (props.mode === 'inline') {
    nextTick(() => {
      initSocialShare(inlineShareContainer.value)
    })
  }
})

// 路由改变时自动更新当前页面的分享参数
watch(
  () => route.fullPath,
  () => {
    nextTick(() => {
      if (props.mode === 'inline') {
        initSocialShare(inlineShareContainer.value)
      } else if (isOpen.value) {
        initSocialShare(floatingShareContainer.value)
      }
    })
  }
)
</script>

<style scoped>
.share-slide-enter-active,
.share-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.share-slide-enter-from,
.share-slide-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}

:deep(.social-share) {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
}

:deep(.social-share .social-share-icon) {
  width: 28px !important;
  height: 28px !important;
  line-height: 28px !important;
  font-size: 15px !important;
  margin: 3px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border-width: 1px !important;
  transition: all 0.2s ease !important;
}

:deep(.social-share .social-share-icon:hover) {
  transform: scale(1.15);
  box-shadow: 0 0 10px currentColor;
}

:deep(.social-share .icon-wechat .wechat-qrcode) {
  background-color: #0d131f !important;
  border: 1px solid rgba(6, 182, 212, 0.4) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8) !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  color: #e2e8f0 !important;
}

:deep(.social-share .icon-wechat .wechat-qrcode h4) {
  background-color: #141e30 !important;
  color: #38bdf8 !important;
  font-size: 11px !important;
}

:deep(.social-share .icon-wechat .wechat-qrcode .help p) {
  color: #94a3b8 !important;
  font-size: 11px !important;
}
</style>
