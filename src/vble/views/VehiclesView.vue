<template>
  <div class="vehicles-page p-4 max-w-7xl mx-auto">
    <!-- 头部横幅 -->
    <div class="text-center mb-8">
      <n-tag type="warning" size="small" round class="mb-2">Matrix Exploration Vehicles</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-amber mb-2">多维载具矩阵与大世界探索法则</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        从黄色平原走兽、黑陆行鸟林间破空，到跨海蒸汽机船、潜水艇深渊下潜，乃至突破卡门线飞向红月的月之巨鲸
      </p>
    </div>

    <!-- 探索维度概览 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" role="group" aria-label="载具分类">
      <button
        v-for="cat in vehicleCategories"
        :key="cat.id"
        type="button"
        class="vehicle-category-button cyber-card text-left cursor-pointer transition-all hover:scale-102"
        :aria-pressed="activeCategory === cat.id"
        :class="{ 'border-cyan-400! shadow-[0_0_15px_rgba(0,243,255,0.2)]': activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >
        <span class="block text-2xl mb-1">{{ cat.icon }}</span>
        <span class="block text-base font-bold text-gray-200">{{ cat.name }}</span>
        <span class="block text-xs text-gray-400 mt-1">{{ cat.desc }}</span>
      </button>
    </div>

    <!-- 载具列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <n-card
        v-for="veh in filteredVehicles"
        :key="veh.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-cyan-300">{{ veh.name }}</span>
            <n-tag size="small" :type="getTypeTag(veh.type)">{{ veh.type }}</n-tag>
          </div>
        </template>

        <div class="space-y-3 text-sm">
          <div class="flex items-center text-amber-300 font-medium">
            <span class="mr-2">⚡ 巡航极速:</span>
            <n-tag size="tiny" type="warning">{{ veh.speed }}</n-tag>
          </div>

          <div class="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div class="text-xs text-gray-400 mb-1 font-semibold">【通航特权与边界限制】</div>
            <div class="text-gray-300 text-xs leading-relaxed">{{ veh.capability }}</div>
          </div>

          <p class="text-gray-400 text-xs leading-relaxed">{{ veh.desc }}</p>

          <div v-if="veh.lore" class="text-xs text-purple-300/80 italic border-l-2 border-purple-500/50 pl-2">
            "{{ veh.lore }}"
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const activeCategory = ref('all')

const vehicleCategories = [
  { id: 'all', name: '全部载具', icon: '🚀', desc: '全维度 10 大探索坐骑与飞空艇' },
  { id: 'land', name: '陆地走禽', icon: '🐥', desc: '黄/白/黑/胖陆行鸟族群' },
  { id: 'sea', name: '海洋潜渊', icon: '⚓', desc: '龙首帆船、火力船、深海潜水艇' },
  { id: 'sky', name: '苍穹星际', icon: '🛸', desc: '飞空艇、黑隼号、月之巨鲸' }
]

const vehicles = computed(() => gameStore.db.vehicles || [])

const filteredVehicles = computed(() => {
  if (activeCategory.value === 'all') return vehicles.value
  return vehicles.value.filter((v: any) => {
    const t = (v.type || '') + (v.name || '')
    if (activeCategory.value === 'land') return t.includes('陆行') || t.includes('步')
    if (activeCategory.value === 'sea') return t.includes('船') || t.includes('潜水')
    if (activeCategory.value === 'sky') return t.includes('飞空') || t.includes('月之') || t.includes('隼')
    return true
  })
})

const getTypeTag = (type: string) => {
  if (type.includes('神兽') || type.includes('圣光')) return 'success'
  if (type.includes('飞行') || type.includes('宇宙')) return 'warning'
  if (type.includes('海') || type.includes('潜')) return 'info'
  return 'default'
}
</script>

<style scoped>
.vehicle-category-button {
  transition-property: color, background-color, border-color, box-shadow, transform;
}

.vehicle-category-button:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 2px;
}
</style>
