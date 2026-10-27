<template>
  <div class="boss-tactics-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="error" size="small" round class="mb-2">Epic Boss Phase Mechanics & Raid Guide</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-amber mb-2">首领攻坚全鉴：多阶段机制与终焉破阵法</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        收录序章风之神殿翼手龙、卡尔纳克炉火液态火焰、吉尔伽美什六战与大桥死斗、深渊双神欧米茄与神龙全灭解法
      </p>
    </div>

    <!-- 难度分层筛选 -->
    <div class="boss-tier-filter flex flex-wrap gap-2 justify-center" role="group" aria-label="首领难度分级">
      <n-button
        v-for="tier in tiers"
        :key="tier.id"
        size="small"
        :type="activeTier === tier.id ? 'primary' : 'default'"
        :aria-pressed="activeTier === tier.id"
        secondary
        @click="activeTier = tier.id"
      >
        {{ tier.name }}
      </n-button>
    </div>

    <!-- 首领卡片网格 (v-for 循环自配置文件) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <n-card
        v-for="boss in filteredBosses"
        :key="boss.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-lg font-bold text-red-400 mr-2">{{ boss.name }}</span>
              <span class="text-xs text-gray-400">「{{ boss.title }}」</span>
            </div>
            <n-tag size="small" :type="boss.tier.includes('T4') ? 'error' : boss.tier.includes('T3') ? 'warning' : 'info'">
              {{ boss.tier }}
            </n-tag>
          </div>
        </template>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center text-xs text-gray-400 bg-slate-900/60 p-2 rounded">
            <span>📍 驻留战场: <strong class="text-gray-200">{{ boss.location }}</strong></span>
            <span>❤️ 总生命力: <strong class="text-amber-400">{{ boss.hp }}</strong></span>
          </div>

          <div class="text-xs">
            <span class="text-purple-400 font-bold">🎯 弱点与破绽: </span>
            <span class="text-cyan-300">{{ boss.weakness }}</span>
          </div>

          <div class="p-3 bg-red-950/20 border border-red-900/30 rounded">
            <div class="text-xs text-red-400 font-semibold mb-1">⚠️ 核心转阶段机制与杀招:</div>
            <div class="text-xs text-gray-300 leading-relaxed">{{ boss.keyGimmick }}</div>
          </div>

          <div class="p-3 bg-blue-950/20 border border-blue-900/30 rounded">
            <div class="text-xs text-cyan-400 font-semibold mb-1">🛡️ 推荐战术构筑与破阵方案:</div>
            <div class="text-xs text-gray-300 leading-relaxed">{{ boss.strategy }}</div>
          </div>

          <div class="text-xs text-yellow-300/90 pt-1 border-t border-slate-800">
            🎁 击破掉落/偷取: <strong class="text-white">{{ boss.rewards }}</strong>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { bossTacticsList } from '../config/bossTactics'

const activeTier = ref('all')

const tiers = [
  { id: 'all', name: `全部首领 (${bossTacticsList.length}大核心)` },
  { id: 'bounty', name: '王城高阶悬赏 (Bounty)' },
  { id: 'T1', name: '第一世界试炼 (T1)' },
  { id: 'T2', name: '第二世界崩解 (T2)' },
  { id: 'T3', name: '第三世界融合 (T3)' },
  { id: 'T4', name: '虚空深渊与隐藏超神 (T4)' }
]

const filteredBosses = computed(() => {
  if (activeTier.value === 'all') return bossTacticsList
  if (activeTier.value === 'bounty') return bossTacticsList.filter(b => b.tier.includes('悬赏') || b.id.startsWith('bounty-'))
  return bossTacticsList.filter(b => b.tier.includes(activeTier.value))
})
</script>

<style scoped>
.boss-tier-filter :deep(button:focus-visible) {
  outline: 2px solid #67e8f9;
  outline-offset: 3px;
}
</style>
