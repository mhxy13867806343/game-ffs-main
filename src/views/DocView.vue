<template>
  <div class="min-h-screen flex flex-col bg-[#0b0e14] text-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col">
      <!-- 页面顶栏 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1c2438]">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              单机策划全案
            </span>
            <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              离线游玩·无需联网
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-white">
            《裂空之羽》单机关卡与数值设计文档 (v1.3)
          </h1>
          <p class="text-xs text-gray-400 mt-1">
            单机 2D 横版卷轴飞行射击 + 角色养成 · 全 8 章 48 关 · 七色彩虹主线 · 支持本地双人
          </p>
        </div>

        <div class="flex items-center gap-2">
          <!-- 移动端目录按钮 -->
          <n-button
            class="lg:hidden"
            size="small"
            quaternary
            @click="showMobileCatalog = true"
          >
            📑 章节大纲
          </n-button>

          <a
            href="/docs/liekong_zhiyu_v1.3.md"
            download="关卡设计文档_裂空之羽_v1.3.md"
            class="text-decoration-none"
          >
            <n-button type="primary" ghost size="small">
              ⬇ 下载完整 MD 文档
            </n-button>
          </a>
        </div>
      </div>

      <!-- 主体双栏布局 -->
      <div class="flex-1 flex gap-8 mt-6">
        <!-- 桌面端左侧固定大纲目录 -->
        <aside class="hidden lg:block w-72 shrink-0">
          <div class="sticky top-24 bg-[#121824] border border-[#1e273a] rounded-xl p-4 max-h-[calc(100vh-140px)] overflow-y-auto">
            <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2 flex items-center justify-between">
              <span>大纲目录</span>
              <span class="text-[10px] text-gray-500">快速定位</span>
            </div>
            <nav class="flex flex-col gap-1 text-xs">
              <button
                v-for="item in catalogItems"
                :key="item.id"
                class="text-left px-2.5 py-1.5 rounded transition-all text-gray-300 hover:text-white hover:bg-white/5 truncate border-none bg-transparent cursor-pointer"
                :class="activeHeading === item.id ? 'text-blue-400 bg-blue-500/10 font-bold' : ''"
                @click="scrollToSection(item.id)"
              >
                {{ item.title }}
              </button>
            </nav>
          </div>
        </aside>

        <!-- 右侧 Markdown 内容展示区 -->
        <main class="flex-1 min-w-0 bg-[#121824] border border-[#1e273a] rounded-2xl p-6 sm:p-10 shadow-lg">
          <div v-if="loading" class="py-20 text-center text-gray-400 text-sm">
            <div class="text-2xl mb-2 animate-spin">⏳</div>
            正在加载单机游戏设计文档...
          </div>

          <div
            v-else
            class="doc-content prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed"
            v-html="renderedHtml"
          ></div>
        </main>
      </div>
    </div>

    <!-- 移动端目录抽屉 -->
    <n-drawer v-model:show="showMobileCatalog" :width="280" placement="left">
      <n-drawer-content title="章节大纲" closable class="bg-[#0f1522] text-gray-200">
        <nav class="flex flex-col gap-1.5 text-xs py-2">
          <button
            v-for="item in catalogItems"
            :key="item.id"
            class="text-left px-3 py-2 rounded text-gray-300 hover:bg-white/5 truncate border-none bg-transparent cursor-pointer"
            @click="scrollToSection(item.id); showMobileCatalog = false"
          >
            {{ item.title }}
          </button>
        </nav>
      </n-drawer-content>
    </n-drawer>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import AppFooter from '@/components/AppFooter.vue'

const loading = ref(true)
const renderedHtml = ref('')
const showMobileCatalog = ref(false)
const activeHeading = ref('')

const catalogItems = ref([
  { id: '0-总览', title: '0. 总览与设计理念' },
  { id: '01-世界观简介', title: '0.1 世界观（云垣大陆与七虹）' },
  { id: '02-核心玩法', title: '0.2 核心横版射击玩法' },
  { id: '第-1-章', title: '第 1 章：🟥 赤霞港·空贼与烈焰朝霞' },
  { id: '第-2-章', title: '第 2 章：🟧 橙焰熔炉·火山兵工厂' },
  { id: '第-3-章', title: '第 3 章：🟨 金雷云原·雷暴与琥珀沙海' },
  { id: '第-4-章', title: '第 4 章：🟩 翠雾森屿·浮空森林' },
  { id: '第-5-章', title: '第 5 章：🩵 青霜冰穹·冰晶与极光' },
  { id: '第-6-章', title: '第 6 章：🔵 蔚蓝沉城·云下神族古城' },
  { id: '第-7-章', title: '第 7 章：🟪 紫渊深层·魔族本土' },
  { id: '第-8-章', title: '第 8 章：⬜ 虹上之天·星穹神座最终章' }
])

async function fetchDoc() {
  try {
    loading.value = true
    const res = await fetch('/docs/liekong_zhiyu_v1.3.md')
    if (res.ok) {
      const text = await res.text()
      // 配置 marked 生成 id 锚点
      renderedHtml.value = await marked.parse(text)
    } else {
      renderedHtml.value = '<p class="text-rose-400">未能加载文档内容，请确认 public/docs/liekong_zhiyu_v1.3.md 是否存在。</p>'
    }
  } catch (err) {
    console.error(err)
    renderedHtml.value = '<p class="text-rose-400">读取文档时出错。</p>'
  } finally {
    loading.value = false
  }
}

function scrollToSection(id: string) {
  activeHeading.value = id
  // 查找文档内匹配的标题
  const headings = document.querySelectorAll('.doc-content h1, .doc-content h2, .doc-content h3')
  for (const h of Array.from(headings)) {
    const text = h.textContent?.trim() || ''
    if (text.includes(id.replace(/-/g, ' ')) || text.includes(id.split('-')[0])) {
      h.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
  }
}

onMounted(() => {
  fetchDoc()
})
</script>

<style>
/* Markdown 样式定制美化 */
.doc-content h1 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #1e293b;
}

.doc-content h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #60a5fa;
  margin-top: 1.8rem;
  margin-bottom: 0.75rem;
}

.doc-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #f3f4f6;
  margin-top: 1.4rem;
  margin-bottom: 0.5rem;
}

.doc-content p {
  line-height: 1.75;
  margin-bottom: 1rem;
  color: #d1d5db;
}

.doc-content blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin: 1.25rem 0;
  color: #9ca3af;
  background: rgba(59, 130, 246, 0.08);
  padding: 0.75rem 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.doc-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.875rem;
}

.doc-content th,
.doc-content td {
  border: 1px solid #232d3f;
  padding: 0.6rem 0.75rem;
  text-align: left;
}

.doc-content th {
  background-color: #1a2232;
  color: #f3f4f6;
  font-weight: 600;
}

.doc-content tr:nth-child(even) {
  background-color: #0e1420;
}

.doc-content ul,
.doc-content ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.doc-content li {
  margin-bottom: 0.35rem;
}

.doc-content code {
  background: #1e273a;
  color: #38bdf8;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85em;
}
</style>
