<template>
  <!-- 模式一：独立卡片/横幅展示模式 (Card/Banner Mode - 完美契合官方 demo 效果) -->
  <div
    v-if="mode === 'card' || mode === 'banner'"
    class="w-full my-6 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md transition-all hover:border-cyan-500/40"
  >
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h4 class="text-sm sm:text-base font-semibold text-gray-200 flex items-center gap-2">
          <span class="text-cyan-400">📢</span>
          <span>一键分享到微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+、点点等社交网站：</span>
        </h4>
        <p class="text-xs text-gray-400">
          轻触下方图标即可快速分享当前页面给好友或发布动态
        </p>
      </div>

      <!-- 快速复制链接 -->
      <button
        class="self-start md:self-auto shrink-0 px-3.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-cyan-300 hover:text-cyan-100 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
        @click="copyCurrentUrl"
      >
        <span>🔗</span>
        <span>{{ copied ? '已复制链接！' : '复制网址' }}</span>
      </button>
    </div>

    <!-- 11个全平台分享图标栏 -->
    <div class="mt-4 pt-3 border-t border-white/10 flex items-center flex-wrap gap-2.5 social-share">
      <template v-for="site in allSites" :key="site.name">
        <!-- 微信特殊处理：弹出二维码 -->
        <div v-if="site.name === 'wechat'" class="relative inline-block wechat-trigger-wrapper">
          <button
            type="button"
            class="social-share-icon icon-wechat flex items-center justify-center cursor-pointer"
            :title="site.title"
            @click="toggleWechatQr"
            @mouseenter="showWechatQr = true"
          >
            <span class="sr-only">{{ site.title }}</span>
          </button>

          <!-- 微信二维码浮层 (官方原生样式再优化) -->
          <div
            v-if="showWechatQr"
            class="wechat-popover absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-[#101726] border border-cyan-500/40 rounded-xl p-3 shadow-2xl flex flex-col items-center text-center animate-fade-in"
            @mouseleave="showWechatQr = false"
          >
            <div class="w-full flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[11px] text-cyan-300 font-medium">
              <span>微信扫一扫分享</span>
              <button class="text-gray-400 hover:text-white" @click="showWechatQr = false">✕</button>
            </div>
            <div class="bg-white p-1.5 rounded-lg shadow-inner">
              <img v-if="wechatQrCodeUrl" :src="wechatQrCodeUrl" alt="微信二维码" class="w-32 h-32 block" />
              <div v-else class="w-32 h-32 flex items-center justify-center text-xs text-gray-500">生成中...</div>
            </div>
            <p class="text-[10px] text-gray-400 mt-2 leading-tight">
              微信打开“扫一扫”<br />即可将本页分享到朋友圈或好友
            </p>
          </div>
        </div>

        <!-- 其余10个平台：直接打开第三方分享地址 -->
        <a
          v-else
          :href="getSiteUrl(site.name)"
          target="_blank"
          rel="noopener noreferrer"
          class="social-share-icon flex items-center justify-center"
          :class="'icon-' + site.name"
          :title="site.title"
        >
          <span class="sr-only">{{ site.title }}</span>
        </a>
      </template>
    </div>
  </div>

  <!-- 模式二：行内面板样式 (Inline Mode - 适用于页眉或页脚) -->
  <div
    v-else-if="mode === 'inline'"
    class="social-share-inline flex flex-wrap items-center gap-2 py-2"
  >
    <span v-if="showLabel" class="text-xs text-gray-400 flex items-center gap-1 font-medium mr-1">
      <span class="text-cyan-400">📢</span>
      <span>分享到：</span>
    </span>

    <div class="social-share flex items-center flex-wrap gap-1.5">
      <template v-for="site in allSites" :key="site.name">
        <div v-if="site.name === 'wechat'" class="relative inline-block wechat-trigger-wrapper">
          <button
            type="button"
            class="social-share-icon icon-wechat flex items-center justify-center cursor-pointer"
            :title="site.title"
            @click="toggleWechatQr"
            @mouseenter="showWechatQr = true"
          >
            <span class="sr-only">{{ site.title }}</span>
          </button>

          <!-- 微信二维码浮层 -->
          <div
            v-if="showWechatQr"
            class="wechat-popover absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-44 bg-[#101726] border border-cyan-500/40 rounded-xl p-2.5 shadow-2xl flex flex-col items-center text-center animate-fade-in"
            @mouseleave="showWechatQr = false"
          >
            <div class="w-full flex items-center justify-between pb-1 mb-1 border-b border-white/10 text-[11px] text-cyan-300 font-medium">
              <span>微信扫一扫分享</span>
              <button class="text-gray-400 hover:text-white" @click="showWechatQr = false">✕</button>
            </div>
            <div class="bg-white p-1 rounded-md">
              <img v-if="wechatQrCodeUrl" :src="wechatQrCodeUrl" alt="微信二维码" class="w-28 h-28 block" />
              <div v-else class="w-28 h-28 flex items-center justify-center text-xs text-gray-500">生成中...</div>
            </div>
            <p class="text-[9px] text-gray-400 mt-1.5 leading-tight">
              微信扫码即可分享到朋友圈
            </p>
          </div>
        </div>

        <a
          v-else
          :href="getSiteUrl(site.name)"
          target="_blank"
          rel="noopener noreferrer"
          class="social-share-icon flex items-center justify-center"
          :class="'icon-' + site.name"
          :title="site.title"
        >
          <span class="sr-only">{{ site.title }}</span>
        </a>
      </template>
    </div>

    <button
      class="ml-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs cursor-pointer flex items-center gap-1 transition-colors"
      @click="copyCurrentUrl"
      title="复制页面网址"
    >
      <span>🔗</span>
      <span>{{ copied ? '已复制' : '复制链接' }}</span>
    </button>
  </div>

  <!-- 模式三：全局悬浮吸附展开式 (Floating Mode) -->
  <aside
    v-else
    class="fixed left-3 bottom-8 z-[9999] select-none flex flex-col items-start gap-2"
    aria-label="一键社交分享工具栏"
  >
    <!-- 展开后的分享面板 -->
    <transition name="share-slide">
      <div
        v-if="isOpen"
        class="bg-[#101726]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.25)] flex flex-col gap-3 min-w-[280px] max-w-[340px]"
      >
        <div class="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
          <span class="font-bold text-cyan-300 flex items-center gap-1.5">
            <span>📢</span>
            <span>一键社交分享 (11个平台)</span>
          </span>
          <button
            class="text-gray-400 hover:text-white text-xs p-0.5 rounded cursor-pointer"
            @click="isOpen = false"
            title="收起分享栏"
          >
            ✕
          </button>
        </div>

        <!-- 11个全平台分享图标 -->
        <div class="social-share flex flex-wrap gap-2 items-center justify-start">
          <template v-for="site in allSites" :key="site.name">
            <div v-if="site.name === 'wechat'" class="relative inline-block wechat-trigger-wrapper">
              <button
                type="button"
                class="social-share-icon icon-wechat flex items-center justify-center cursor-pointer"
                :title="site.title"
                @click="toggleWechatQr"
              >
                <span class="sr-only">{{ site.title }}</span>
              </button>

              <div
                v-if="showWechatQr"
                class="wechat-popover absolute z-50 bottom-full left-0 mb-3 w-44 bg-[#0d131f] border border-cyan-500/40 rounded-xl p-2.5 shadow-2xl flex flex-col items-center text-center animate-fade-in"
              >
                <div class="w-full flex items-center justify-between pb-1 mb-1 border-b border-white/10 text-[11px] text-cyan-300 font-medium">
                  <span>微信扫一扫</span>
                  <button class="text-gray-400 hover:text-white" @click="showWechatQr = false">✕</button>
                </div>
                <div class="bg-white p-1 rounded-md">
                  <img v-if="wechatQrCodeUrl" :src="wechatQrCodeUrl" alt="微信二维码" class="w-28 h-28 block" />
                  <div v-else class="w-28 h-28 flex items-center justify-center text-xs text-gray-500">生成中...</div>
                </div>
                <p class="text-[9px] text-gray-400 mt-1.5 leading-tight">
                  微信扫一扫分享到朋友圈
                </p>
              </div>
            </div>

            <a
              v-else
              :href="getSiteUrl(site.name)"
              target="_blank"
              rel="noopener noreferrer"
              class="social-share-icon flex items-center justify-center"
              :class="'icon-' + site.name"
              :title="site.title"
            >
              <span class="sr-only">{{ site.title }}</span>
            </a>
          </template>
        </div>

        <!-- 复制当前页面链接辅助按钮 -->
        <button
          class="w-full mt-1 py-1.5 px-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          @click="copyCurrentUrl"
        >
          <span>🔗</span>
          <span>{{ copied ? '已成功复制链接！' : '复制本页网址' }}</span>
        </button>
      </div>
    </transition>

    <!-- 悬浮触发圆形药丸按钮 -->
    <button
      class="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_4px_20px_rgba(6,182,212,0.4)] border border-cyan-300/40 cursor-pointer transition-all hover:scale-105 active:scale-95 group"
      :class="{ '!bg-slate-800 !border-slate-600': isOpen }"
      @click="toggleShare"
      title="点击展开一键分享到微博、QQ、微信、豆瓣、Twitter等11个社交平台"
    >
      <span class="text-base group-hover:rotate-12 transition-transform">📢</span>
      <span class="text-xs font-bold tracking-wider">一键分享</span>
      <span class="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono">11</span>
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import QRCode from 'qrcode'
import 'social-share.js/dist/css/share.min.css'

const props = withDefaults(
  defineProps<{
    mode?: 'floating' | 'inline' | 'card' | 'banner'
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
const showWechatQr = ref(false)
const wechatQrCodeUrl = ref('')

// 11大完整社交平台列表（严格对标 share.js 官方规范）
const allSites = [
  { name: 'weibo', title: '分享到微博' },
  { name: 'qq', title: '分享给QQ好友' },
  { name: 'wechat', title: '分享到微信朋友圈' },
  { name: 'tencent', title: '分享到腾讯微博' },
  { name: 'douban', title: '分享到豆瓣' },
  { name: 'qzone', title: '分享到QQ空间' },
  { name: 'linkedin', title: '分享到领英' },
  { name: 'diandian', title: '分享到点点' },
  { name: 'facebook', title: 'Share to Facebook' },
  { name: 'twitter', title: 'Share to Twitter / X' },
  { name: 'google', title: 'Share to Google+' }
]

const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return 'https://mhxy13867806343.github.io/game-ffs-main/#/'
})

const currentTitle = computed(() => {
  return props.title || (typeof document !== 'undefined' ? document.title : 'GAME FFS 官方门户与智能游戏大典')
})

const currentDesc = computed(() => {
  return props.description || 'GAME FFS - 最终幻想时空之轮、裂空之羽与智能游戏矩阵全集'
})

// 生成当前页面的微信二维码
async function generateWechatQr() {
  try {
    const url = currentUrl.value
    wechatQrCodeUrl.value = await QRCode.toDataURL(url, {
      width: 160,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
  } catch (err) {
    console.error('Failed to generate WeChat QR code:', err)
  }
}

function toggleWechatQr() {
  showWechatQr.value = !showWechatQr.value
  if (showWechatQr.value && !wechatQrCodeUrl.value) {
    generateWechatQr()
  }
}

function toggleShare() {
  isOpen.value = !isOpen.value
  if (isOpen.value && !wechatQrCodeUrl.value) {
    generateWechatQr()
  }
}

// 动态构建各个平台的原生分享跳转 URL
function getSiteUrl(siteName: string): string {
  const url = encodeURIComponent(currentUrl.value)
  const title = encodeURIComponent(currentTitle.value)
  const desc = encodeURIComponent(currentDesc.value)
  const origin = encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')

  switch (siteName) {
    case 'weibo':
      return `http://service.weibo.com/share/share.php?url=${url}&title=${title}`
    case 'qq':
      return `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}`
    case 'tencent':
      return `http://share.v.t.qq.com/index.php?c=share&a=index&title=${title}&url=${url}`
    case 'douban':
      return `http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${desc}`
    case 'qzone':
      return `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${desc}&summary=${desc}`
    case 'linkedin':
      return `https://www.linkedin.com/shareArticle?mini=true&ro=true&title=${title}&url=${url}&summary=${desc}`
    case 'diandian':
      return `http://www.diandian.com/share?lo=${url}&ti=${title}&type=link`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=${origin}`
    case 'google':
      return `https://plus.google.com/share?url=${url}`
    default:
      return '#'
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

onMounted(() => {
  generateWechatQr()
})

watch(
  () => route.fullPath,
  () => {
    generateWechatQr()
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

.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, 8px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* 兼容并增强 social-share.js 原生样式 */
:deep(.social-share) {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
}

:deep(.social-share-icon) {
  position: relative;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 32px !important;
  height: 32px !important;
  font-size: 18px !important;
  border-radius: 50% !important;
  line-height: 32px !important;
  margin: 3px !important;
  border: 1px solid #666;
  text-decoration: none !important;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* 悬停微动效与品牌原色还原 */
:deep(.social-share-icon:hover) {
  transform: scale(1.18) !important;
  box-shadow: 0 4px 12px currentColor !important;
  color: #fff !important;
}

:deep(.icon-weibo) {
  color: #ff763b !important;
  border-color: #ff763b !important;
  background: rgba(255, 118, 59, 0.08) !important;
}
:deep(.icon-weibo:hover) {
  background: #ff763b !important;
}

:deep(.icon-qq) {
  color: #56b6e7 !important;
  border-color: #56b6e7 !important;
  background: rgba(86, 182, 231, 0.08) !important;
}
:deep(.icon-qq:hover) {
  background: #56b6e7 !important;
}

:deep(.icon-wechat) {
  color: #7bc549 !important;
  border-color: #7bc549 !important;
  background: rgba(123, 197, 73, 0.08) !important;
}
:deep(.icon-wechat:hover) {
  background: #7bc549 !important;
}

:deep(.icon-tencent) {
  color: #56b6e7 !important;
  border-color: #56b6e7 !important;
  background: rgba(86, 182, 231, 0.08) !important;
}
:deep(.icon-tencent:hover) {
  background: #56b6e7 !important;
}

:deep(.icon-douban) {
  color: #33b045 !important;
  border-color: #33b045 !important;
  background: rgba(51, 176, 69, 0.08) !important;
}
:deep(.icon-douban:hover) {
  background: #33b045 !important;
}

:deep(.icon-qzone) {
  color: #fdbe3d !important;
  border-color: #fdbe3d !important;
  background: rgba(253, 190, 61, 0.08) !important;
}
:deep(.icon-qzone:hover) {
  background: #fdbe3d !important;
}

:deep(.icon-linkedin) {
  color: #0077b5 !important;
  border-color: #0077b5 !important;
  background: rgba(0, 119, 181, 0.08) !important;
}
:deep(.icon-linkedin:hover) {
  background: #0077b5 !important;
}

:deep(.icon-diandian) {
  color: #307dca !important;
  border-color: #307dca !important;
  background: rgba(48, 125, 202, 0.08) !important;
}
:deep(.icon-diandian:hover) {
  background: #307dca !important;
}

:deep(.icon-facebook) {
  color: #44619d !important;
  border-color: #44619d !important;
  background: rgba(68, 97, 157, 0.08) !important;
}
:deep(.icon-facebook:hover) {
  background: #44619d !important;
}

:deep(.icon-twitter) {
  color: #55acee !important;
  border-color: #55acee !important;
  background: rgba(85, 172, 238, 0.08) !important;
}
:deep(.icon-twitter:hover) {
  background: #55acee !important;
}

:deep(.icon-google) {
  color: #db4437 !important;
  border-color: #db4437 !important;
  background: rgba(219, 68, 55, 0.08) !important;
}
:deep(.icon-google:hover) {
  background: #db4437 !important;
}
</style>