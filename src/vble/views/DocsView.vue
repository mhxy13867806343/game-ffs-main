<template>
  <div class="docs-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">16 Volumes Technical Whitepapers</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">十六卷核心架构白皮书与全景设计文库</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        系统归纳叙事圣经、地貌拓扑、首领攻坚、职业成长、宏观经济、载具矩阵、底层架构等 16 部核心白皮书，点击任一卡片可阅读全本正文规范
      </p>
    </div>

    <!-- 检索与分类过滤 -->
    <div class="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
      <div class="flex flex-wrap gap-2" role="group" aria-label="白皮书分类">
        <n-button
          v-for="cat in categories"
          :key="cat"
          class="docs-category-button"
          :aria-pressed="selectedCategory === cat"
          size="small"
          :type="selectedCategory === cat ? 'primary' : 'default'"
          secondary
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </n-button>
      </div>

      <n-input
        v-model:value="searchKeyword"
        :input-props="{ 'aria-label': '搜索白皮书标题、机制关键词' }"
        placeholder="搜索白皮书标题、机制关键词..."
        size="small"
        clearable
        style="width: 260px;"
      >
        <template #prefix>🔍</template>
      </n-input>
    </div>

    <!-- 社交一键全平台分享横幅 -->
    <SocialShareBar mode="banner" />

    <!-- 白皮书网格清单 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <n-card
        v-for="doc in filteredDocs"
        :key="doc.code"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl transition-all hover:border-cyan-500/50 cursor-pointer group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
        @click="openDocReader(doc)"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 font-mono font-bold">
                VOL.{{ String(doc.volume).padStart(2, '0') }}
              </span>
              <span class="text-base font-bold text-gray-200 group-hover:text-cyan-300 transition-colors">{{ doc.title }}</span>
            </div>
            <n-tag size="tiny" type="info">{{ doc.category }}</n-tag>
          </div>
        </template>

        <div class="space-y-3 text-sm">
          <p class="text-gray-400 text-xs leading-relaxed">{{ doc.summary }}</p>

          <div class="p-3 bg-slate-900/80 rounded border border-slate-800">
            <div class="text-xs text-amber-300 font-semibold mb-2">🔑 关键设计模块与规范:</div>
            <div class="flex flex-wrap gap-1.5">
              <n-tag
                v-for="feat in doc.keyFeatures"
                :key="feat"
                size="tiny"
                type="default"
              >
                {{ feat }}
              </n-tag>
            </div>
          </div>

          <!-- 点击阅读提示 -->
          <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span class="text-xs text-cyan-400 group-hover:underline flex items-center gap-1 font-semibold">
              <span>📖 阅读全卷规范与设计正文</span> <span>&rarr;</span>
            </span>
            <span class="text-[11px] text-gray-500">
              VOL.{{ String(doc.volume).padStart(2, '0') }} 完整本
            </span>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 全本白皮书阅读抽屉 (Drawer) -->
    <n-drawer
      v-model:show="isDrawerOpen"
      width="min(95vw, 1050px)"
      placement="right"
    >
      <n-drawer-content
        :native-scrollbar="false"
        class="bg-[#0b101d] text-gray-200"
      >
        <template #header>
          <div class="flex items-center justify-between w-full pr-4">
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 font-mono font-bold">
                VOL.{{ String(activeDoc?.volume || 0).padStart(2, '0') }}
              </span>
              <span class="font-bold text-base sm:text-lg text-white">
                {{ activeDoc?.title }}
              </span>
            </div>
          </div>
        </template>

        <div v-if="loadingContent" class="py-24 text-center text-gray-400">
          <div class="text-3xl mb-3 animate-spin">⏳</div>
          <div>正在加载白皮书正文规范...</div>
        </div>

        <div v-else-if="docError" class="py-16 text-center text-red-400">
          <div class="text-2xl mb-2">⚠️</div>
          <div>{{ docError }}</div>
        </div>

        <div v-else class="space-y-6 py-2">
          <!-- 顶部工具条：分类标签 + 下载按钮 -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-gray-400">分类：</span>
              <n-tag size="tiny" type="info">{{ activeDoc?.category }}</n-tag>
            </div>

            <div class="flex items-center gap-2">
              <a
                v-if="activeDoc"
                :href="`./vble-docs/${activeDoc.code}.md`"
                :download="`${activeDoc.code}.md`"
                class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors no-underline"
              >
                <span>📥</span>
                <span>下载原始规范 .md</span>
              </a>
            </div>
          </div>

          <!-- 正文 Markdown 解析区 -->
          <article
            class="markdown-body p-2"
            v-html="renderedMarkdown"
          ></article>
        </div>

        <template #footer>
          <div class="flex justify-between items-center w-full">
            <span class="text-xs text-gray-500 font-mono">
              Godot 2D Turn-Based Engine Whitepapers · vble spec
            </span>
            <n-button size="small" secondary @click="isDrawerOpen = false">
              关闭阅读
            </n-button>
          </div>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'
import SocialShareBar from '@/components/SocialShareBar.vue'
import { whitepapersList, type WhitepaperDoc } from '../config/docsConfig'

const selectedCategory = ref('全部类别')
const searchKeyword = ref('')

const isDrawerOpen = ref(false)
const activeDoc = ref<WhitepaperDoc | null>(null)
const loadingContent = ref(false)
const docError = ref('')
const rawMarkdownContent = ref('')

const renderedMarkdown = computed(() => {
  if (!rawMarkdownContent.value) return ''
  return marked.parse(rawMarkdownContent.value)
})

const categories = [
  '全部类别',
  '叙事架构',
  '空间关卡',
  '首领战斗',
  '首领生态',
  '深渊剧情',
  '生态世界',
  '角色成长',
  '装备数值',
  '大世界探索',
  '隐藏探索',
  '系统底层',
  '终焉深渊',
  '编年全史',
  '战斗数值',
  '战斗交互',
  '导师秘传',
  '魔法学院',
  '忍术流派',
  '神装锻造'
]

const filteredDocs = computed(() => {
  return whitepapersList.filter(doc => {
    const matchCat = selectedCategory.value === '全部类别' || doc.category === selectedCategory.value
    const matchSearch =
      !searchKeyword.value.trim() ||
      doc.title.toLowerCase().includes(searchKeyword.value.toLowerCase().trim()) ||
      doc.summary.toLowerCase().includes(searchKeyword.value.toLowerCase().trim()) ||
      doc.keyFeatures.some(f => f.toLowerCase().includes(searchKeyword.value.toLowerCase().trim()))
    return matchCat && matchSearch
  })
})

async function openDocReader(doc: WhitepaperDoc) {
  activeDoc.value = doc
  isDrawerOpen.value = true
  loadingContent.value = true
  docError.value = ''
  rawMarkdownContent.value = ''

  try {
    const res = await fetch(`./vble-docs/${doc.code}.md`)
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
</script>

<style scoped>
.docs-category-button:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 3px;
}
</style>
