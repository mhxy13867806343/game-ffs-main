<template>
  <div class="gallery-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Visual Showcase & Asset Gallery</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">实机画廊：大世界原画、战斗实机与魔导特效</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        精选回合制战斗实机、地下迷宫探索、城邦商业店铺、法术粒子特效等游戏视觉资产
      </p>
    </div>

    <!-- 类别切换 -->
    <div class="flex flex-wrap gap-2 justify-center">
      <n-button
        v-for="cat in categories"
        :key="cat.id"
        size="small"
        :type="selectedCategory === cat.id ? 'primary' : 'default'"
        :aria-pressed="selectedCategory === cat.id"
        secondary
        @click="selectedCategory = cat.id"
      >
        {{ cat.name }}
      </n-button>
    </div>

    <!-- 画廊网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <n-card
        v-for="item in filteredGallery"
        :key="item.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl overflow-hidden group"
      >
        <template #cover>
          <div class="overflow-hidden h-48 bg-slate-950 flex items-center justify-center">
            <img
              :src="item.src"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </template>

        <div class="space-y-2 pt-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-gray-200 group-hover:text-cyan-300 transition-colors">{{ item.title }}</span>
            <n-tag size="tiny" type="info">{{ item.categoryName }}</n-tag>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">{{ item.desc }}</p>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { galleryList } from '../config/galleryConfig'

const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: '全部视觉资产' },
  { id: 'battle', name: '战斗场景' },
  { id: 'map', name: '大地图与地貌' },
  { id: 'ui', name: '界面UI与商店' },
  { id: 'vfx', name: '粒子与法术特效' }
]

const filteredGallery = computed(() => {
  if (selectedCategory.value === 'all') return galleryList
  return galleryList.filter(g => g.category === selectedCategory.value)
})
</script>
