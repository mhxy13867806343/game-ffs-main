<template>
  <div class="whitepaper-detail-page p-3 sm:p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/docs">
          <n-button type="info" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回白皮书索引
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-cyan-300">技术白皮书独立阅览室</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-amber-300 font-bold">
          VOL.{{ String(doc?.volume || 0).padStart(2, '0') }} {{ doc?.title?.split('(')[0]?.trim() || docCode }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <n-button size="small" round secondary type="warning" @click="copyMarkdown">
          <template #icon><span>📋</span></template>
          复制全文 Markdown
        </n-button>
        <n-button size="small" round secondary type="primary" @click="downloadMarkdown">
          <template #icon><span>💾</span></template>
          导出 .md 文件
        </n-button>
      </div>
    </div>

    <!-- 未找到白皮书 -->
    <div v-if="!doc" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到指定白皮书卷册</h2>
      <p class="text-sm text-slate-300 mb-4">白皮书编号【{{ docCode }}】在当前典籍库中不存在。</p>
      <router-link to="/vble/docs">
        <n-button type="primary" round>返回白皮书全景目录</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 主卷册名片头图卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/70 to-slate-900 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.18)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-3xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                VOL.{{ String(doc.volume).padStart(2, '0') }} 典藏卷
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700">
                分类: {{ doc.category }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                CODE: {{ doc.code }}
              </span>
            </div>

            <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ doc.title }}</span>
            </h1>

            <p class="text-sm sm:text-base text-cyan-200/90 leading-relaxed border-l-2 border-cyan-400 pl-3 py-0.5">
              {{ doc.summary }}
            </p>

            <div class="flex flex-wrap items-center gap-2 pt-1">
              <span class="text-xs text-slate-400 font-bold">核心模块:</span>
              <span
                v-for="feat in doc.keyFeatures"
                :key="feat"
                class="px-2 py-0.5 rounded text-[11px] bg-slate-950 text-cyan-300 border border-cyan-500/30 font-mono"
              >
                {{ feat }}
              </span>
            </div>
          </div>

          <!-- 右侧统计数据 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[200px]">
            <div>
              <div class="text-xs text-slate-400">规范字数体量</div>
              <div class="text-2xl font-mono font-black text-cyan-400 mt-0.5">{{ wordCount }} 字</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">预估研读耗时</div>
              <div class="text-sm font-mono text-amber-300 font-bold mt-0.5">约 {{ readingTimeMinutes }} 分钟</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">实机引擎规范对齐</div>
              <div class="text-xs text-emerald-400 font-bold mt-0.5">Godot 4.6 LTS Verified</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 24 卷快捷翻阅导航卡片 -->
      <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-md">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>📚</span> 全域 24 卷核心白皮书快速检索切卷
          </span>
          <span class="text-[10px] text-cyan-400 font-mono">{{ whitepapersList.length }} 卷完整收录</span>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <router-link
            v-for="w in whitepapersList"
            :key="w.code"
            :to="'/vble/docs/' + w.code"
            class="px-2.5 py-1 rounded text-xs transition-all font-mono"
            :class="w.code === doc.code
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
              : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'"
          >
            VOL.{{ String(w.volume).padStart(2, '0') }}
          </router-link>
        </div>
      </div>

      <!-- Markdown 正文渲染视窗 -->
      <div class="p-6 sm:p-10 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-xl min-h-[500px]">
        <!-- 加载中状态 -->
        <div v-if="loadingContent" class="py-24 text-center space-y-3">
          <n-spin size="large" />
          <p class="text-sm text-cyan-300 font-mono">正在检索与解析白皮书 Markdown 全文...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="docError" class="p-8 text-center bg-red-950/20 border border-red-500/30 rounded-xl space-y-2">
          <div class="text-2xl text-red-400">⚠️</div>
          <h3 class="text-base font-bold text-white">白皮书读取受阻</h3>
          <p class="text-xs text-red-300">{{ docError }}</p>
          <n-button size="small" type="primary" secondary @click="fetchMarkdownContent">重新尝试加载</n-button>
        </div>

        <!-- 渲染正文 -->
        <div v-else class="whitepaper-article-content text-slate-200 leading-relaxed space-y-6">
          <div v-html="renderedMarkdown" class="markdown-body"></div>
        </div>

        <!-- 底部翻卷导航 -->
        <div class="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <router-link v-if="prevDoc" :to="'/vble/docs/' + prevDoc.code">
              <n-button round secondary type="info" size="medium">
                <template #icon><span>←</span></template>
                上一卷: VOL.{{ String(prevDoc.volume).padStart(2, '0') }} {{ prevDoc.title.split('(')[0].trim() }}
              </n-button>
            </router-link>
          </div>
          <div>
            <router-link v-if="nextDoc" :to="'/vble/docs/' + nextDoc.code">
              <n-button round secondary type="primary" size="medium">
                下一卷: VOL.{{ String(nextDoc.volume).padStart(2, '0') }} {{ nextDoc.title.split('(')[0].trim() }}
                <template #icon><span>→</span></template>
              </n-button>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { marked } from 'marked'
import { whitepapersList, type WhitepaperDoc } from '../config/docsConfig'

const route = useRoute()
const message = useMessage()

const docCode = computed(() => (route.params.code as string) || '01_WORLD_BIBLE')

const doc = computed<WhitepaperDoc | null>(() => {
  return whitepapersList.find(w => w.code === docCode.value) || null
})

const currentIndex = computed(() => {
  return whitepapersList.findIndex(w => w.code === docCode.value)
})

const prevDoc = computed<WhitepaperDoc | null>(() => {
  if (currentIndex.value > 0) {
    return whitepapersList[currentIndex.value - 1]
  }
  return null
})

const nextDoc = computed<WhitepaperDoc | null>(() => {
  if (currentIndex.value >= 0 && currentIndex.value < whitepapersList.length - 1) {
    return whitepapersList[currentIndex.value + 1]
  }
  return null
})

const rawMarkdownContent = ref('')
const loadingContent = ref(false)
const docError = ref('')

const renderedMarkdown = computed(() => {
  if (!rawMarkdownContent.value) return ''
  return marked.parse(rawMarkdownContent.value) as string
})

const wordCount = computed(() => {
  return rawMarkdownContent.value.length || 0
})

const readingTimeMinutes = computed(() => {
  return Math.max(1, Math.ceil(wordCount.value / 400))
})

const fetchMarkdownContent = async () => {
  if (!doc.value) return
  loadingContent.value = true
  docError.value = ''
  rawMarkdownContent.value = ''

  try {
    const res = await fetch(`./vble-docs/${doc.value.code}.md`)
    if (!res.ok) {
      throw new Error(`加载白皮书失败 (HTTP ${res.status})`)
    }
    rawMarkdownContent.value = await res.text()
  } catch (err: any) {
    docError.value = err?.message || '读取白皮书文件异常，请检查网络或重试。'
  } finally {
    loadingContent.value = false
  }
}

const copyMarkdown = async () => {
  if (!rawMarkdownContent.value) return
  try {
    await navigator.clipboard.writeText(rawMarkdownContent.value)
    message.success('已复制白皮书 Markdown 全文到剪贴板！')
  } catch {
    message.error('复制失败，请手动选择复制')
  }
}

const downloadMarkdown = () => {
  if (!rawMarkdownContent.value || !doc.value) return
  const blob = new Blob([rawMarkdownContent.value], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${doc.value.code}.md`
  a.click()
  URL.revokeObjectURL(url)
  message.success(`已导出 ${doc.value.code}.md 文件！`)
}

watch(docCode, () => {
  fetchMarkdownContent()
})

onMounted(() => {
  fetchMarkdownContent()
})
</script>

<style scoped>
:deep(.markdown-body) {
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.8;
}

:deep(.markdown-body h1) {
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 800;
  border-bottom: 2px solid rgba(6, 182, 212, 0.4);
  padding-bottom: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(.markdown-body h2) {
  color: #38bdf8;
  font-size: 1.4rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(56, 189, 248, 0.2);
  padding-bottom: 0.4rem;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}

:deep(.markdown-body h3) {
  color: #fde047;
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

:deep(.markdown-body p) {
  margin-bottom: 1rem;
  color: #cbd5e1;
}

:deep(.markdown-body code) {
  background-color: #0b1120;
  color: #67e8f9;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.85em;
  border: 1px solid rgba(6, 182, 212, 0.2);
}

:deep(.markdown-body pre) {
  background-color: #020617;
  border: 1px solid #1e293b;
  border-radius: 0.75rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.25rem 0;
}

:deep(.markdown-body pre code) {
  background-color: transparent;
  padding: 0;
  border: none;
  color: #93c5fd;
  font-size: 0.85rem;
}

:deep(.markdown-body ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  color: #cbd5e1;
}

:deep(.markdown-body ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  color: #cbd5e1;
}

:deep(.markdown-body blockquote) {
  border-left: 3px solid #f59e0b;
  padding-left: 1rem;
  color: #fde68a;
  background-color: rgba(245, 158, 11, 0.05);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 1rem 0;
  border-radius: 0 0.5rem 0.5rem 0;
}

:deep(.markdown-body table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.85rem;
}

:deep(.markdown-body th) {
  background-color: #0f172a;
  color: #38bdf8;
  border: 1px solid #334155;
  padding: 0.6rem 0.8rem;
  font-weight: 700;
}

:deep(.markdown-body td) {
  border: 1px solid #1e293b;
  padding: 0.5rem 0.8rem;
  color: #cbd5e1;
}

:deep(.markdown-body tr:nth-child(even)) {
  background-color: rgba(15, 23, 42, 0.4);
}
</style>
