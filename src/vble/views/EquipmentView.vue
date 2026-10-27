<template>
  <div class="equipment-page p-3 sm:p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="warning" size="small" round class="mb-2">Legendary Weapons & Ragnarok Relics</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-amber mb-2">神兵矩阵：终焉诸神之黄昏与十二救世圣器</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm">
        收录由次元神龙守护的至高超越神兵【诸神之黄昏 (Ragnarok)】、49层深渊绝品【诸神之黄昏·改】、封印之城十二圣器与拔刀正宗
      </p>
    </div>

    <!-- 焦点巨献：至高超越神兵「诸神之黄昏 (Ragnarok)」专属展示展台 -->
    <div class="ragnarok-spotlight p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/50 to-slate-900 border-2 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)] relative overflow-hidden">
      <div class="absolute -right-8 -top-8 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div class="lg:col-span-8 space-y-3">
          <div class="flex flex-wrap items-center gap-2">
            <n-tag size="small" type="error" round strong>至高超越神兵 (SSR+)</n-tag>
            <span class="text-xs text-amber-400 font-mono tracking-wider">SUPREME WEAPON OF THE VOID</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white text-glow-amber">
            诸神之黄昏 (Ragnarok) · 终焉巨剑
          </h2>
          <div class="text-xs text-cyan-300 font-semibold">
            ⚔️ 面板攻击: 攻击力 +180 · 全属性 +10 · 暴击率 +30% · 破防 50%
          </div>
          <p class="text-xs text-gray-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <strong>【神兵机制】:</strong> 历代最终幻想最强象征圣剑。普通攻击必定破除敌方 50% 物理护甲，平砍 20% 概率呼唤【圣光核爆 (Flare)】全场湮灭，对龙族与恶魔造成 300% 灭绝特攻。击破次元之隙隐藏深渊首领【神龙 (Shinryu)】方可开启宝箱解封。
          </p>
          <div class="flex flex-wrap items-center gap-3 text-xs pt-1">
            <span class="text-amber-400 font-bold">📍 唯一获取地:</span>
            <span class="text-gray-200">次元之隙 隐藏深渊宝箱 (神龙守护) / 纳哈特专属始源试炼</span>
            <span class="text-purple-400 ml-2">纳哈特专属进化:【终焉诸神之黄昏·改 (攻+200)】</span>
          </div>
        </div>

        <div class="lg:col-span-4 p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center space-y-2">
          <div class="text-3xl">🗡️</div>
          <div class="text-sm font-bold text-amber-300">终焉诸神系列神装</div>
          <p class="text-[11px] text-gray-400">
            包含诸神之黄昏 (圣剑)、诸神之杖 (法系1.5倍穿甲)、诸神之铠 (全属性吸收免控)
          </p>
          <n-button size="small" type="warning" secondary @click="selectedCategory = 'ragnarok'">
            筛选诸神系列装备
          </n-button>
        </div>
      </div>
    </div>

    <!-- 过滤器与搜索栏 -->
    <div class="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
      <div class="flex flex-wrap gap-1.5" role="group" aria-label="神兵分类">
        <n-button
          v-for="cat in categories"
          :key="cat.id"
          size="small"
          :type="selectedCategory === cat.id ? 'primary' : 'default'"
          secondary
          class="equipment-category-button"
          :aria-pressed="selectedCategory === cat.id"
          @click="selectedCategory = cat.id"
        >
          {{ cat.name }}
        </n-button>
      </div>

      <n-input
        v-model:value="searchQuery"
        :input-props="{ 'aria-label': '搜索神兵名称、特权或来源' }"
        placeholder="搜索神兵名称、特权或来源..."
        size="small"
        clearable
        style="width: 220px;"
      >
        <template #prefix>🔍</template>
      </n-input>
    </div>

    <!-- 武器卡片网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <n-card
        v-for="eq in filteredEquipment"
        :key="eq.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl transition-all hover:border-amber-400/50"
        :class="{ 'border-amber-500/60! shadow-[0_0_20px_rgba(245,158,11,0.2)] bg-gradient-to-b from-[#181a2e] to-[#121626]': eq.name.includes('诸神') }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 overflow-hidden">
              <span v-if="eq.name.includes('诸神')" class="text-amber-400 text-sm">👑</span>
              <span class="text-base font-bold text-amber-300 truncate">{{ eq.name }}</span>
            </div>
            <n-tag size="tiny" :type="eq.name.includes('诸神') ? 'error' : 'warning'">{{ eq.type }}</n-tag>
          </div>
        </template>

        <div class="space-y-3 text-xs">
          <div class="flex justify-between items-center text-gray-300">
            <span>装配权限: <strong class="text-cyan-300">{{ eq.job }}</strong></span>
          </div>

          <div class="p-2.5 bg-slate-900/80 rounded border border-slate-800 space-y-1">
            <div class="text-red-400 font-bold">⚔️ 属性面板: {{ eq.stats }}</div>
            <div class="text-yellow-300/90 leading-relaxed">⚡ 神器特权: {{ eq.effect }}</div>
          </div>

          <div class="text-gray-400 leading-tight">
            📍 契约来源: <span class="text-gray-200">{{ eq.origin }}</span>
          </div>

          <div class="text-purple-300 text-[11px] font-semibold">
            🌟 认证等级: {{ eq.rarity }}
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const equipment = computed(() => gameStore.db.equipment || [])
const selectedCategory = ref('all')
const searchQuery = ref('')

const categories = [
  { id: 'all', name: '全部神兵' },
  { id: 'ragnarok', name: '诸神之黄昏系列 (超越SSR)' },
  { id: 'blade', name: '剑斧太刀类' },
  { id: 'spear', name: '神枪重兵类' },
  { id: 'staff', name: '法杖圣袍类' }
]

const filteredEquipment = computed(() => {
  return equipment.value.filter((eq: any) => {
    // 类别过滤
    if (selectedCategory.value === 'ragnarok' && !eq.name.includes('诸神')) return false
    if (selectedCategory.value === 'blade' && !(eq.type.includes('剑') || eq.type.includes('刀') || eq.type.includes('斧'))) return false
    if (selectedCategory.value === 'spear' && !(eq.type.includes('枪') || eq.type.includes('弓') || eq.type.includes('盾'))) return false
    if (selectedCategory.value === 'staff' && !(eq.type.includes('杖') || eq.type.includes('袍') || eq.type.includes('琴') || eq.type.includes('饰品'))) return false

    // 搜索过滤
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const match = (eq.name + eq.type + eq.job + eq.effect + eq.origin).toLowerCase().includes(q)
      if (!match) return false
    }

    return true
  })
})
</script>

<style scoped>
.equipment-category-button:focus-visible {
  outline: 2px solid #67e8f9;
  outline-offset: 2px;
}
</style>
