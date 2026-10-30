<template>
  <div class="content-container py-8">
    <!-- Top Meta Bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1f2b42]">
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <span class="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
            DOC v1.3 ORIGINAL SPEC
          </span>
          <span class="text-xs text-gray-400">单机 2D 横版卷轴飞行射击 · 完整策划设计书</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-white">
          《裂空之羽》关卡与数值策划文档
        </h1>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <!-- Search filter with match count -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="检索文档关键词 (如: 擦弹, 赤鳍巨鲸, 掉落)..."
            class="bg-[#101726] border border-[#22314a] focus:border-amber-400 text-white placeholder-gray-500 text-xs px-3.5 py-2 pr-20 rounded-xl outline-none w-64 transition-colors"
          />
          <span
            v-if="searchQuery.trim()"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded"
            :class="matchCount > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-400'"
          >
            {{ matchCount }} 处
          </span>
        </div>

        <!-- 字号排版切换 -->
        <div class="flex items-center bg-[#101726] border border-[#22314a] rounded-xl p-1 gap-1 text-xs">
          <button
            type="button"
            class="px-2 py-1 rounded-lg text-xs transition-colors"
            :class="fontSizeLevel === 'small' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
            @click="fontSizeLevel = 'small'"
            title="紧凑排版"
          >
            A-
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-lg text-xs transition-colors"
            :class="fontSizeLevel === 'normal' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
            @click="fontSizeLevel = 'normal'"
            title="标准排版"
          >
            A
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-lg text-xs transition-colors"
            :class="fontSizeLevel === 'large' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'"
            @click="fontSizeLevel = 'large'"
            title="放大排版"
          >
            A+
          </button>
        </div>

        <!-- 复制 Markdown 全文 -->
        <button
          type="button"
          class="px-3 py-2 rounded-xl bg-[#141e30] hover:bg-[#1e2d48] border border-[#263753] text-gray-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          @click="copyMarkdown"
        >
          <span>📋</span>
          <span>{{ copied ? '已复制！' : '复制全文' }}</span>
        </button>

        <!-- Download raw md button -->
        <a
          href="./md/关卡设计文档_裂空之羽_v1.3.md"
          download="关卡设计文档_裂空之羽_v1.3.md"
          class="px-3.5 py-2 rounded-xl bg-[#141e30] hover:bg-[#1e2d48] border border-[#263753] text-gray-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>📥</span>
          <span>下载原始 .md</span>
        </a>
      </div>
    </div>

    <!-- 社交一键全平台分享横幅 -->
    <SocialShareBar mode="banner" />

    <!-- Layout: Sidebar TOC + Main Markdown Content -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <!-- Sticky Sidebar TOC -->
      <aside class="hidden lg:block lg:col-span-1 sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto p-4 rounded-2xl bg-[#0b101c] border border-[#1b273e] text-xs">
        <div class="font-bold text-amber-400 mb-3 flex items-center gap-1.5">
          <span>📑</span>
          <span>文档目录索引 (快速定位)</span>
        </div>
        <div class="space-y-1">
          <a
            v-for="item in tocList"
            :key="item.id"
            :href="`#${item.id}`"
            class="block py-1 px-2 rounded hover:bg-white/5 transition-colors truncate"
            :class="{
              'text-amber-300 font-bold': item.level === 1,
              'text-cyan-300 pl-4': item.level === 2,
              'text-gray-400 pl-6 text-[11px]': item.level === 3
            }"
          >
            {{ item.title }}
          </a>
        </div>
      </aside>

      <!-- Main Document Viewer -->
      <main class="lg:col-span-3 p-6 sm:p-10 rounded-2xl bg-[#0b101c] border border-[#1b273e] shadow-xl">
        <div v-if="loading" class="py-20 text-center text-gray-400">
          <div class="text-3xl mb-3 animate-spin">⏳</div>
          <div>正在解析全本策划文档 (2688 行)...</div>
        </div>

        <div
          v-else
          class="markdown-body transition-all"
          :class="{
            'text-[0.88rem] leading-[1.65]': fontSizeLevel === 'small',
            'text-[0.95rem] leading-[1.8]': fontSizeLevel === 'normal',
            'text-[1.08rem] leading-[1.95]': fontSizeLevel === 'large'
          }"
          v-html="renderedHtml"
        ></div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import SocialShareBar from '@/components/SocialShareBar.vue'
import rawDoc from '../data/关卡设计文档_裂空之羽_v1.3.md?raw'

interface TocItem {
  id: string
  title: string
  level: number
}

const loading = ref(true)
const docMarkdown = ref('')
const searchQuery = ref('')
const fontSizeLevel = ref<'small' | 'normal' | 'large'>('normal')
const copied = ref(false)
const tocList = ref<TocItem[]>([])

const matchCount = computed(() => {
  if (!searchQuery.value.trim() || !docMarkdown.value) return 0
  const q = searchQuery.value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const reg = new RegExp(q, 'gi')
  const matches = docMarkdown.value.match(reg)
  return matches ? matches.length : 0
})

const copyMarkdown = async () => {
  if (!docMarkdown.value) return
  try {
    await navigator.clipboard.writeText(docMarkdown.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy', err)
  }
}

onMounted(() => {
  docMarkdown.value = rawDoc

  // Parse Headers for TOC
  const lines = rawDoc.split('\n')
  const tocs: TocItem[] = []
  lines.forEach((line: string) => {
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const title = match[2].trim()
      // Generate url-safe id
      const id = title
        .toLowerCase()
        .replace(/[\s\.\·\/\(\)\,\#]+/g, '-')
        .replace(/^-+|-+$/g, '')
      tocs.push({ id, title, level })
    }
  })
  tocList.value = tocs
  loading.value = false
})

const renderedHtml = computed(() => {
  if (!docMarkdown.value) return ''

  // Configure marked custom renderer to assign IDs to headers for TOC anchor jump
  const renderer = new marked.Renderer()
  renderer.heading = ({ text, depth }: { text: string, depth: number }) => {
    const cleanText = text.replace(/<[^>]+>/g, '')
    const id = cleanText
      .toLowerCase()
      .replace(/[\s\.\·\/\(\)\,\#]+/g, '-')
      .replace(/^-+|-+$/g, '')
    return `<h${depth} id="${id}">${text}</h${depth}>`
  }

  marked.setOptions({ renderer, gfm: true, breaks: true })
  let html = marked.parse(docMarkdown.value) as string

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(?![^<]*>)(${q})`, 'gi')
    html = html.replace(regex, '<mark class="bg-amber-400 text-slate-950 px-1 py-0.5 rounded font-bold shadow-sm">$1</mark>')
  }

  return html
})
</script>
