<template>
  <div class="search-page p-3 sm:p-4 max-w-7xl mx-auto space-y-6 sm:space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Omni Database Search Engine</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-cyan mb-2">全域数据库索引与跨维度检索</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        支持对魔物首领、地下城、神兵装备、召唤兽契约、载具、支线与编年史的全字段模糊即时搜索
      </p>
    </div>

    <!-- 搜索输入框 -->
    <div class="max-w-2xl mx-auto">
      <n-input
        v-model:value="keyword"
        :input-props="{ 'aria-label': '全域数据库搜索' }"
        placeholder="输入任意怪物名、技能名、地宫名、装备名或关键词..."
        size="large"
        round
        clearable
        class="shadow-lg"
      >
        <template #prefix>🔍</template>
      </n-input>
    </div>

    <!-- 检索统计与分类指示 -->
    <div v-if="keyword.trim()" class="text-center text-xs text-gray-400">
      找到 <strong class="text-cyan-400 text-sm">{{ searchResults.length }}</strong> 条匹配全景词条
    </div>

    <!-- 搜索结果列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="res in searchResults"
        :key="res.key"
        hoverable
        role="button"
        tabindex="0"
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl cursor-pointer hover:border-cyan-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        @click="openItem(res)"
        @keydown.enter.self.prevent="openItem(res)"
        @keydown.space.self.prevent="openItem(res)"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-gray-200">{{ res.name }}</span>
            <n-tag size="tiny" :type="res.tagType">{{ res.categoryName }}</n-tag>
          </div>
        </template>

        <div class="space-y-2 text-xs">
          <p class="text-gray-300 line-clamp-2">{{ res.desc }}</p>
          <div v-if="res.extra" class="text-amber-400/90 font-mono text-[11px] truncate">
            {{ res.extra }}
          </div>
        </div>
      </n-card>
    </div>

    <div v-if="keyword.trim() && searchResults.length === 0" class="text-center py-16 text-gray-500 text-sm">
      未找到包含 “{{ keyword }}” 的相关档案，请尝试更换关键词
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'

const route = useRoute()
const gameStore = useGameStore()
const keyword = ref((route.query.q as string) || '')

watch(
  () => route.query.q,
  val => {
    if (typeof val === 'string') {
      keyword.value = val
    } else if (val == null) {
      keyword.value = ''
    }
  }
)

const searchResults = computed(() => {
  const q = keyword.value.toLowerCase().trim()
  if (!q) return []

  const results: any[] = []
  const db = gameStore.db

  // 1. Monsters
  ;(db.monsters || []).forEach((m: any) => {
    const text = (m.name + (m.rankText || '') + (m.location || '') + (m.skills?.join(' ') || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `monster-${m.id}`,
        name: m.name,
        categoryName: '魔物首领',
        tagType: 'error',
        desc: `等级 Lv.${m.level} · HP ${m.hp} · 弱点: ${m.weakness || '无'}`,
        extra: `技能: ${(m.skills || []).join('、')}`,
        raw: m
      })
    }
  })

  // 2. Maps/Dungeons
  ;(db.maps || []).forEach((map: any) => {
    const text = (map.name + (map.desc || '') + (map.boss || '') + (map.tier || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `map-${map.id}`,
        name: map.name,
        categoryName: '秘境地城',
        tagType: 'success',
        desc: map.desc,
        extra: `层级: ${map.tier || '未收录'} · 首领: ${map.boss || '未收录'}`,
        raw: map
      })
    }
  })

  // 3. Equipment
  ;(db.equipment || []).forEach((eq: any) => {
    const text = (eq.name + (eq.job || '') + (eq.type || '') + (eq.effect || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `eq-${eq.id}`,
        name: eq.name,
        categoryName: '神兵装备',
        tagType: 'warning',
        desc: eq.effect,
        extra: `${eq.type} · ${eq.stats}`,
        raw: eq
      })
    }
  })

  // 4. Summons
  ;(db.summons || []).forEach((s: any) => {
    const text = (s.name + (s.skill_name || '') + (s.skill_desc || '') + (s.lore || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `summon-${s.id}`,
        name: s.name,
        categoryName: '幻兽契约',
        tagType: 'info',
        desc: s.skill_desc,
        extra: `${s.skill_name} (${s.cost})`,
        raw: s
      })
    }
  })

  // 5. Vehicles
  ;(db.vehicles || []).forEach((v: any) => {
    const text = (v.name + (v.type || '') + (v.capability || '') + (v.desc || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `vehicle-${v.id}`,
        name: v.name,
        categoryName: '全域载具',
        tagType: 'default',
        desc: v.capability,
        extra: `速度: ${v.speed}`,
        raw: v
      })
    }
  })

  // 6. Sidequests
  ;(db.sidequests || []).forEach((sq: any) => {
    // 支线目录沿用卡片字段，兼容旧命名并保留独立条目身份。
    const name = sq.title || sq.name || ''
    const desc = sq.desc || sq.description || ''
    const reward = sq.reward || sq.rewards || ''
    const text = [sq.id, name, sq.aliases?.join(' '), sq.region || sq.location, sq.trigger, reward, desc, sq.status, sq.validation].filter(Boolean).join(' ').toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `quest-${sq.id}`,
        name,
        categoryName: '史诗支线',
        tagType: 'warning',
        desc,
        extra: `奖励: ${reward}`,
        raw: sq
      })
    }
  })

  return results
})

const openItem = (item: any) => {
  if (item.raw) {
    gameStore.openDetail(item.raw)
  }
}
</script>
