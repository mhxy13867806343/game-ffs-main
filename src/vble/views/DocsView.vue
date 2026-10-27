<template>
  <div class="docs-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">16 Volumes Technical Whitepapers</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">十六卷核心架构白皮书与全景设计文库</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        系统归纳叙事圣经、地貌拓扑、首领攻坚、职业成长、宏观经济、载具矩阵、底层架构等 16 部核心白皮书
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

    <!-- 白皮书网格清单 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <n-card
        v-for="doc in filteredDocs"
        :key="doc.code"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl transition-all hover:border-cyan-500/50"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 font-mono font-bold">
                VOL.{{ String(doc.volume).padStart(2, '0') }}
              </span>
              <span class="text-base font-bold text-gray-200">{{ doc.title }}</span>
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
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { whitepapersList } from '../config/docsConfig'

const selectedCategory = ref('全部类别')
const searchKeyword = ref('')

const categories = [
  '全部类别',
  '叙事架构',
  '空间关卡',
  '首领战斗',
  '角色成长',
  '装备数值',
  '大世界探索',
  '隐藏探索',
  '系统底层',
  '终焉深渊',
  '编年全史',
  '导师秘传'
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
</script>

<style scoped>
.docs-category-button:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 3px;
}
</style>
